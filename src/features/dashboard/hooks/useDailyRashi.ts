import { useEffect, useRef, useState } from 'react';
import { DateTime } from 'luxon';
import type { BirthData } from '@/domain/astrology/birth-data';
import type { UserLocation } from '@/lib/user-location';
import { gocharAdapter, type GocharAnalysis } from '@/infrastructure/astrology/gochar.adapter';
import type { PanchangData } from '@/infrastructure/astrology/panchang.adapter';
import { hashProfile } from '@/features/ai-reading/store';
import { generateWithFallback, type FallbackResult } from '@/features/ai-settings/providers';
import { getAiSettingsSnapshot } from '@/features/ai-settings/store';
import { countWords } from '@/features/ai-reading/markdown';
import {
  useDailyRashiStore,
  makeDailyRashiKey,
  type DailyRashiRecord,
} from '../lib/daily-rashi-store';
import {
  buildDailyRashiPayload,
  composeDailyRashiPrompt,
  DAILY_RASHI_PROMPT_VERSION,
} from '../lib/daily-rashi-prompt';
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

/**
 * Module-level set of in-flight keys. Survives component remounts so
 * Strict Mode's mount -> unmount -> remount cycle does not cancel a
 * generation that is already running.
 */
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
    // ── Cache hit: only if fresh (current prompt version) ────
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

        const payload = buildDailyRashiPayload(
          profileRef.current,
          k,
          g,
          p,
          loc
        );
        const { system: sysPrompt, user: userPrompt } = composeDailyRashiPrompt(payload);
        const ctrl = new AbortController();
        const timeoutId = setTimeout(() => ctrl.abort(), 45_000);
        let res: FallbackResult;
        try {
          res = await generateWithFallback({
            system: sysPrompt,
            prompt: userPrompt,
            signal: ctrl.signal,
            order: snapshot.providerOrder,
            configs: snapshot.providers,
            extras: { tone: 'traditional', numberOfWord: 120, language: 'English' },
          });
        } finally {
          clearTimeout(timeoutId);
        }

                const elapsed = Math.round(performance.now() - t0);

        if (!res.ok || !res.text) {
          log('generation failed', { elapsed, error: res.error });
          throw new Error(res.error ?? 'Generation failed');
        }

        const raw = res.text.trim();
        const structured = parseDailyRashiJson(raw);

        // Strip stray wrapping quotes if the model returned a bare string.
        const text = raw.replace(/^["']|["']$/g, '');
        const moon = k?.planets?.Moon ?? {};

        // word count reflects whatever the model actually produced.
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
          providerId: res.providerId,
          modelId: snapshot.providers[res.providerId]?.preferredModel ?? '',
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