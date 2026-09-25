import { useEffect, useMemo, useRef, useState } from 'react';
import { DateTime } from 'luxon';
import type { BirthData } from '@/domain/astrology/birth-data';
import type { UserLocation } from '@/lib/user-location';
import { getCachedKundli } from '@/lib/kundli-cache';
import {
  gocharAdapter,
  type GocharAnalysis,
} from '@/infrastructure/astrology/gochar.adapter';
import {
  calculateNowPanchang,
  type PanchangData,
} from '@/infrastructure/astrology/panchang.adapter';
import { getAiSettingsSnapshot } from '@/features/ai-settings/store';
import { countWords } from '@/features/ai-reading/markdown';
import { execute } from '@/ai/runtime';
import {
  useReadingStore,
  hashProfile,
  readingId,
  type ReadingRecord,
} from '../store';

// ────────────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────────────

/**
 * The twelve fields the AI returns for a daily reading.
 * Mirrors the shape declared in daily-reading.json.
 */
export interface DailyReadingPayload {
  vara_note: string;
  panchang_note: string;
  dasha_note: string;
  transit_note: string;
  wear: string;
  eat: string;
  avoid_eating: string;
  do: string[];
  avoid: string[];
  mantra: string;
  color: string;
  summary: string;
}

export type DailyReadingState =
  | 'idle'
  | 'generating'
  | 'ready'
  | 'error'
  | 'unavailable';

export interface UseDailyReadingResult {
  state: DailyReadingState;
  /** The raw store record. Exposes providerId, modelId, generatedAt. */
  record: ReadingRecord | null;
  /** Typed payload pulled from record.payload. null if not yet generated. */
  payload: DailyReadingPayload | null;
  error: string | null;
  regenerate: () => void;
  /** Panchang at the current location. Facts for the UI — never AI-generated. */
  panchang: PanchangData | null;
  /** Gochar analysis. Exposed so the component can show transit details. */
  gochar: GocharAnalysis | null;
}

// ────────────────────────────────────────────────────────────────────────
// Constants
// ────────────────────────────────────────────────────────────────────────

const CATEGORY_ID = 'daily-reading';
const PACK_VERSION = '1.0.0';
const BASE_PROMPT_VERSION = `kundaliyatra.${CATEGORY_ID}@${PACK_VERSION}`;

/**
 * Module-level set of in-flight cache keys. Survives component remounts
 * so React Strict Mode's mount → unmount → remount cycle does not
 * cancel a generation that is already running.
 */
const inFlight = new Set<string>();

// ────────────────────────────────────────────────────────────────────────
// Payload parsing
// ────────────────────────────────────────────────────────────────────────

function stripMd(s: string): string {
  return s
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function parsePayload(raw: string): DailyReadingPayload | null {
  if (!raw) return null;
  let candidate = raw.trim();

  // Strip markdown fences if present.
  const fence = candidate.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence) candidate = fence[1].trim();

  // Find the outermost JSON object.
  const first = candidate.indexOf('{');
  const last = candidate.lastIndexOf('}');
  if (first < 0 || last <= first) return null;
  candidate = candidate.slice(first, last + 1);

  try {
    const p = JSON.parse(candidate);
    return {
      vara_note: stripMd(String(p.vara_note ?? '')),
      panchang_note: stripMd(String(p.panchang_note ?? '')),
      dasha_note: stripMd(String(p.dasha_note ?? '')),
      transit_note: stripMd(String(p.transit_note ?? '')),
      wear: stripMd(String(p.wear ?? '')),
      eat: stripMd(String(p.eat ?? '')),
      avoid_eating: stripMd(String(p.avoid_eating ?? '')),
      do: Array.isArray(p.do) ? p.do.map((x: unknown) => stripMd(String(x))) : [],
      avoid: Array.isArray(p.avoid) ? p.avoid.map((x: unknown) => stripMd(String(x))) : [],
      mantra: stripMd(String(p.mantra ?? '')),
      color: String(p.color ?? ''),
      summary: stripMd(String(p.summary ?? '')),
    };
  } catch {
    return null;
  }
}

/**
 * Casts the loosely-typed `payload?: Record<string, unknown>` field on
 * the store record into the concrete DailyReadingPayload shape.
 */
function readPayload(record: ReadingRecord | null): DailyReadingPayload | null {
  if (!record?.payload) return null;
  const p = record.payload;
  return {
    vara_note: stripMd(String(p.vara_note ?? '')),
    panchang_note: stripMd(String(p.panchang_note ?? '')),
    dasha_note: stripMd(String(p.dasha_note ?? '')),
    transit_note: stripMd(String(p.transit_note ?? '')),
    wear: stripMd(String(p.wear ?? '')),
    eat: stripMd(String(p.eat ?? '')),
    avoid_eating: stripMd(String(p.avoid_eating ?? '')),
    do: Array.isArray(p.do) ? p.do.map((x: unknown) => stripMd(String(x))) : [],
    avoid: Array.isArray(p.avoid) ? p.avoid.map((x: unknown) => stripMd(String(x))) : [],
    mantra: stripMd(String(p.mantra ?? '')),
    color: String(p.color ?? ''),
    summary: stripMd(String(p.summary ?? '')),
  };
}

// ────────────────────────────────────────────────────────────────────────
// The hook
// ────────────────────────────────────────────────────────────────────────

export function useDailyReading(
  profile: BirthData,
  location: UserLocation,
  language: string = 'en'
): UseDailyReadingResult {
  // ── Today's date in the user's location timezone ─────────────────────
  const dateISO = useMemo(
    () =>
      DateTime.now().setZone(location.timezone).toISODate() ??
      new Date().toISOString().slice(0, 10),
    [location.timezone]
  );

  // Version string includes the date. Tomorrow it becomes different,
  // the existing record is treated as stale, and the reading regenerates.
  const promptVersion = `${BASE_PROMPT_VERSION}|${dateISO}`;

  const profileHash = useMemo(() => hashProfile(profile), [profile]);
  // Each language gets its own cache slot. Switching back and forth
  // between languages is free — no regeneration until the date rolls.
  const storageKey = `${CATEGORY_ID}@${language}`;
  const id = readingId(profileHash, storageKey);

  // ── Facts computed locally (never AI) ────────────────────────────────
  const panchang = useMemo<PanchangData | null>(() => {
    try {
      return calculateNowPanchang(location);
    } catch {
      return null;
    }
  }, [location]);

  const gochar = useMemo<GocharAnalysis | null>(() => {
    const k = getCachedKundli(profile);
    if (!k) return null;
    try {
      return gocharAdapter.analyze(k, new Date());
    } catch {
      return null;
    }
  }, [profile, dateISO]);

  // ── The store record for today ───────────────────────────────────────
  const record = useReadingStore((s) => s.records[id]) ?? null;
  const save = useReadingStore((s) => s.save);

  const payload = useMemo(() => readPayload(record), [record]);

  // ── State machine ────────────────────────────────────────────────────
  const [state, setState] = useState<DailyReadingState>(
    record ? 'ready' : 'idle'
  );
  const [error, setError] = useState<string | null>(null);
  const [regenTick, setRegenTick] = useState(0);

  // Refs so the effect doesn't re-fire when these objects get new identity.
  const profileRef = useRef(profile);
  profileRef.current = profile;
  const locationRef = useRef(location);
  locationRef.current = location;

  useEffect(() => {
    // ── Cache hit ──────────────────────────────────────────────────────
    const fresh = useReadingStore.getState().records[id];
    if (fresh && fresh.promptVersion === promptVersion) {
      setState('ready');
      setError(null);
      return;
    }

    if (inFlight.has(id)) {
      setState('generating');
      return;
    }

    // ── Need a provider ────────────────────────────────────────────────
    const snapshot = getAiSettingsSnapshot();
    const configured = snapshot.providerOrder.filter(
      (pid) => snapshot.providers[pid]?.apiKey
    );
    if (configured.length === 0) {
      setState('unavailable');
      return;
    }

    // ── Need a kundli ──────────────────────────────────────────────────
    const k = getCachedKundli(profileRef.current);
    if (!k) return;

    // ── Generate ───────────────────────────────────────────────────────
    inFlight.add(id);
    setState('generating');
    setError(null);

    (async () => {
      try {
        const g = gocharAdapter.analyze(k, new Date());
        const p = calculateNowPanchang(locationRef.current);

        const ctrl = new AbortController();
        const timeoutId = setTimeout(() => ctrl.abort(), 60_000);

        const res = await execute({
          situationId: CATEGORY_ID,
          language: language as 'en' | 'hi' | 'ne',
          sources: {
            kundli: k,
            gochar: g,
            panchang: p,
            profile: profileRef.current,
          },
          extras: {
            tone: 'traditional',
            numberOfWord: 300,
            language,
          },
          signal: ctrl.signal,
        }).finally(() => clearTimeout(timeoutId));

        if (!res.ok || !res.text) {
          throw new Error(res.error ?? 'Generation failed');
        }

        const parsed = parsePayload(res.text);
        if (!parsed) {
          throw new Error('Model returned malformed JSON.');
        }

        const flat = [
          parsed.vara_note,
          parsed.panchang_note,
          parsed.dasha_note,
          parsed.transit_note,
          parsed.wear,
          parsed.eat,
          parsed.avoid_eating,
          parsed.summary,
          parsed.do.join(' '),
          parsed.avoid.join(' '),
        ].join(' ');

        save({
          key: id,
          profileHash,
          profileName: profileRef.current.profileName,
          categoryId: CATEGORY_ID,
          promptVersion,
          tone: 'traditional',
          language: language as 'English' | 'Hindi' | 'Nepali',
          length: 300,
          providerId: res.providerId ?? '',
          modelId: res.modelId ?? '',
          text: '',                     // structured — content is in payload
          payload: parsed as unknown as Record<string, unknown>,
          wordCount: countWords(flat),
          generatedAt: new Date().toISOString(),
        });

        setState('ready');
      } catch (e) {
        setError((e as Error).message);
        setState('error');
      } finally {
        inFlight.delete(id);
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, promptVersion, regenTick]);

  const regenerate = () => {
    useReadingStore.getState().remove(profileHash, storageKey);
    inFlight.delete(id);
    setRegenTick((n) => n + 1);
  };

  return {
    state,
    record,
    payload,
    error,
    regenerate,
    panchang,
    gochar,
  };
}
