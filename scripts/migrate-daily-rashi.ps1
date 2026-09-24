# scripts/migrate-daily-rashi.ps1
# Rewires useDailyRashi to the ai-v2 runtime and deletes the legacy
# daily-rashi-prompt.ts. Also adds signal support to execute.ts.
# Safe to re-run (idempotent overwrite).

$ErrorActionPreference = 'Stop'

function Write-Utf8 {
    param([string]$Path, [string]$Content)
    $dir = Split-Path -Parent $Path
    if ($dir -and -not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }
    $abs = Join-Path (Get-Location) $Path
    $enc = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($abs, $Content, $enc)
    Write-Host "  wrote $Path" -ForegroundColor Green
}

Write-Host "`nMigrating daily-rashi to ai-v2...`n" -ForegroundColor Cyan

# ══════════════════════════════════════════════════════════════
# 1. Patch execute.ts to accept an AbortSignal
# ══════════════════════════════════════════════════════════════
$executeTs = @'
/**
 * Orchestrates one AI call.
 *
 *   1. resolve situation -> (pack, situation)
 *   2. select data       -> only the blocks the situation asked for
 *   3. compose prompt    -> the six layers
 *   4. call the AI       -> through the existing fallback chain
 *   5. return everything -> prompt, text, provenance
 *
 * The composed prompt is returned so callers can store it alongside
 * the output. That is how a reading stays reproducible even after the
 * pack is edited.
 */
import type { Language } from '../core/types';
import { compose } from '../core/composer';
import { resolve } from '../core/registry';
import { select, type SelectorSources } from '../core/selector';
import {
  generateWithFallback,
  type FallbackResult,
} from '@/features/ai-settings/providers';
import { getAiSettingsSnapshot } from '@/features/ai-settings/store';

export interface ExecuteOptions {
  situationId: string;
  language?: Language;
  sources: SelectorSources;
  extras?: Record<string, unknown>;
  signal?: AbortSignal;
}

export interface ExecutionResult {
  ok: boolean;
  text?: string;
  error?: string;
  attempts?: FallbackResult['attempts'];
  composed: ReturnType<typeof compose>;
  providerId?: string;
  modelId?: string;
}

export async function execute(
  opts: ExecuteOptions
): Promise<ExecutionResult> {
  const { pack, situation } = resolve(opts.situationId);
  const language = opts.language ?? 'en';

  const data = select(situation.data, opts.sources);
  const composed = compose({ pack, situation, data, language });

  const snapshot = getAiSettingsSnapshot();
  const res = await generateWithFallback({
    system: composed.system,
    prompt: composed.user,
    order: snapshot.providerOrder,
    configs: snapshot.providers,
    extras: opts.extras as any,
    signal: opts.signal,
  });

  const modelId = res.providerId
    ? snapshot.providers[res.providerId]?.preferredModel
    : undefined;

  return {
    ok: res.ok,
    text: res.text,
    error: res.error,
    attempts: res.attempts,
    composed,
    providerId: res.providerId,
    modelId,
  };
}
'@
Write-Utf8 'src/ai/runtime/execute.ts' $executeTs

# ══════════════════════════════════════════════════════════════
# 2. Rewrite useDailyRashi.ts to use the runtime
# ══════════════════════════════════════════════════════════════
$useDailyRashiTs = @'
import { useEffect, useRef, useState } from 'react';
import { DateTime } from 'luxon';
import type { BirthData } from '@/domain/astrology/birth-data';
import type { UserLocation } from '@/lib/user-location';
import {
  gocharAdapter,
  type GocharAnalysis,
} from '@/infrastructure/astrology/gochar.adapter';
import type { PanchangData } from '@/infrastructure/astrology/panchang.adapter';
import { hashProfile } from '@/features/ai-reading/store';
import { getAiSettingsSnapshot } from '@/features/ai-settings/store';
import { countWords } from '@/features/ai-reading/markdown';
import { execute } from '@/ai/runtime';
import {
  useDailyRashiStore,
  makeDailyRashiKey,
  type DailyRashiRecord,
} from '../lib/daily-rashi-store';
import { parseDailyRashiJson } from '../lib/daily-rashi-text';

export type DailyRashiState =
  | 'idle'
  | 'generating'
  | 'ready'
  | 'error'
  | 'unavailable';

export interface UseDailyRashiResult {
  state: DailyRashiState;
  record: DailyRashiRecord | null;
  error: string | null;
  regenerate: () => void;
}

const DEBUG = false;

function log(...args: unknown[]) {
  if (DEBUG) {
    // eslint-disable-next-line no-console
    console.log('[daily-rashi]', ...args);
  }
}

const SITUATION_ID = 'daily-rashi';
const PACK_VERSION = '1.0.0';
const DAILY_RASHI_PROMPT_VERSION = `kundaliyatra.${SITUATION_ID}@${PACK_VERSION}`;

const inFlight = new Set<string>();

export function useDailyRashi(
  profile: BirthData,
  kundli: any | null,
  gochar: GocharAnalysis | null,
  panchang: PanchangData | null,
  location: UserLocation
): UseDailyRashiResult {
  const kundliRef = useRef(kundli);
  kundliRef.current = kundli;
  const gocharRef = useRef(gochar);
  gocharRef.current = gochar;
  const panchangRef = useRef(panchang);
  panchangRef.current = panchang;
  const locationRef = useRef(location);
  locationRef.current = location;
  const profileRef = useRef(profile);
  profileRef.current = profile;

  const dateISO =
    DateTime.now().setZone(location.timezone).toISODate() ??
    new Date().toISOString().slice(0, 10);
  const profileHash = hashProfile(profile);
  const cacheKey = makeDailyRashiKey(profileHash, dateISO);

  const record = useDailyRashiStore((s) => s.records[cacheKey]) ?? null;
  const save = useDailyRashiStore((s) => s.save);

  const [state, setState] = useState<DailyRashiState>(record ? 'ready' : 'idle');
  const [error, setError] = useState<string | null>(null);
  const [regenTick, setRegenTick] = useState(0);

  useEffect(() => {
    const fresh = useDailyRashiStore.getState().records[cacheKey];
    if (fresh && fresh.promptVersion === DAILY_RASHI_PROMPT_VERSION) {
      log('cache hit', cacheKey);
      setState('ready');
      setError(null);
      return;
    }
    if (fresh) {
      log('stale cache (v' + fresh.promptVersion + ') — regenerating');
    }

    if (inFlight.has(cacheKey)) {
      log('already in flight', cacheKey);
      setState('generating');
      return;
    }

    const snapshot = getAiSettingsSnapshot();
    const configured = snapshot.providerOrder.filter(
      (id) => snapshot.providers[id]?.apiKey
    );
    if (configured.length === 0) {
      log('no provider configured');
      setState('unavailable');
      return;
    }

    const k = kundliRef.current;
    if (!k) {
      log('no kundli — waiting');
      return;
    }

    log('starting generation', {
      cacheKey,
      providers: configured,
      chandraRashi: k?.planets?.Moon?.rashiName,
    });

    inFlight.add(cacheKey);
    setState('generating');
    setError(null);

    (async () => {
      const t0 = performance.now();
      try {
        const g = gocharRef.current ?? gocharAdapter.analyze(k, new Date());
        const p = panchangRef.current;
        const loc = locationRef.current;

        const ctrl = new AbortController();
        const timeoutId = setTimeout(() => ctrl.abort(), 45_000);

        const res = await execute({
          situationId: SITUATION_ID,
          language: 'en',
          sources: {
            kundli: k,
            gochar: g,
            panchang: p,
            profile: profileRef.current,
          },
          extras: {
            tone: 'traditional',
            numberOfWord: 120,
            language: 'English',
            location: loc.shortLabel,
          },
          signal: ctrl.signal,
        }).finally(() => clearTimeout(timeoutId));

        const elapsed = Math.round(performance.now() - t0);

        if (!res.ok || !res.text) {
          log('generation failed', { elapsed, error: res.error });
          throw new Error(res.error ?? 'Generation failed');
        }

        const raw = res.text.trim();
        const structured = parseDailyRashiJson(raw);

        const text = raw.replace(/^["']|["']$/g, '');
        const moon = k?.planets?.Moon ?? {};

        const flatText = structured
          ? [structured.headline, structured.action, structured.avoid]
              .filter(Boolean)
              .join(' ')
          : text;
        const wordCount = countWords(flatText);

        log('generation success', {
          elapsed,
          providerId: res.providerId,
          structured: Boolean(structured),
          wordCount,
        });

        save({
          key: cacheKey,
          date: dateISO,
          chandraRashi: moon.rashiName ?? 'Unknown',
          profileHash,
          profileName: profileRef.current.profileName,
          headline: structured?.headline,
          action: structured?.action,
          avoid: structured?.avoid,
          text: flatText,
          providerId: res.providerId ?? '',
          modelId: res.modelId ?? '',
          generatedAt: new Date().toISOString(),
          wordCount,
          promptVersion: DAILY_RASHI_PROMPT_VERSION,
        });
        setState('ready');
      } catch (e) {
        const msg = (e as Error).message;
        log('error', msg);
        setError(msg);
        setState('error');
      } finally {
        inFlight.delete(cacheKey);
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cacheKey, regenTick]);

  const regenerate = () => {
    log('regenerate requested');
    useDailyRashiStore.getState().remove(cacheKey);
    inFlight.delete(cacheKey);
    setRegenTick((n) => n + 1);
  };

  return { state, record, error, regenerate };
}
'@
Write-Utf8 'src/features/dashboard/hooks/useDailyRashi.ts' $useDailyRashiTs

# ══════════════════════════════════════════════════════════════
# 3. Delete the legacy prompt module
# ══════════════════════════════════════════════════════════════
$legacy = 'src/features/dashboard/lib/daily-rashi-prompt.ts'
if (Test-Path $legacy) {
    Remove-Item $legacy -Force
    Write-Host "  deleted $legacy" -ForegroundColor Yellow
} else {
    Write-Host "  $legacy already gone" -ForegroundColor DarkGray
}

Write-Host "`nDone." -ForegroundColor Cyan
Write-Host ""
Write-Host "Next:" -ForegroundColor Yellow
Write-Host "  1. npm run build"
Write-Host "  2. npm run dev   and open http://localhost:5173/"
Write-Host "     the daily rashi tile must still appear"
Write-Host "  3. If both pass, commit:"
Write-Host "     git add -A"
Write-Host "     git commit -m 'migrate daily-rashi to ai-v2 runtime'"
Write-Host ""
