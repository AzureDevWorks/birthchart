import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface DailyRashiRecord {
  key: string;              // profileHash|YYYY-MM-DD
  date: string;             // YYYY-MM-DD in the user's timezone
  chandraRashi: string;
  profileHash: string;
  profileName: string;

  // Structured (v2). Optional so v1 records still load.
  headline?: string;
  action?: string;
  avoid?: string;

  // Raw text — always kept as a fallback.
  text: string;

  providerId: string;
  modelId: string;
  generatedAt: string;
  wordCount: number;
  promptVersion: string;
}

interface State {
  records: Record<string, DailyRashiRecord>;
  save: (r: DailyRashiRecord) => void;
  remove: (key: string) => void;
  clearAll: () => void;
}

const STORE_VERSION = 2;
const MAX_AGE_DAYS = 30;
const MAX_RECORDS = 90;

function prune(
  records: Record<string, DailyRashiRecord>
): Record<string, DailyRashiRecord> {
  const cutoff = Date.now() - MAX_AGE_DAYS * 86_400_000;
  const kept = Object.fromEntries(
    Object.entries(records).filter(([, rec]) => {
      const t = new Date(rec.generatedAt).getTime();
      return Number.isFinite(t) && t >= cutoff;
    })
  );
  const entries = Object.entries(kept);
  if (entries.length > MAX_RECORDS) {
    entries.sort(
      (a, b) =>
        new Date(b[1].generatedAt).getTime() -
        new Date(a[1].generatedAt).getTime()
    );
    return Object.fromEntries(entries.slice(0, MAX_RECORDS));
  }
  return kept;
}

export const useDailyRashiStore = create<State>()(
  persist(
    (set) => ({
      records: {},
      save: (r) =>
        set((s) => ({ records: prune({ ...s.records, [r.key]: r }) })),
      remove: (key) =>
        set((s) => {
          const next = { ...s.records };
          delete next[key];
          return { records: next };
        }),
      clearAll: () => set({ records: {} }),
    }),
    {
      name: 'kundaliyatra-daily-rashi',
      version: STORE_VERSION,
    }
  )
);

export function makeDailyRashiKey(profileHash: string, dateISO: string): string {
  return `${profileHash}|${dateISO}`;
}