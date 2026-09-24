import { useMemo } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { BirthData } from '@/domain/astrology/birth-data';
import type {
  ReadingCategoryId,
  ReadingLanguage,
  ReadingTone,
} from './categories';

// ────────────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────────────

/** A past version of a reading. Older versions live here; newest is on
 *  the ReadingRecord directly. */
export interface ReadingVersion {
  versionId: string;
  promptVersion: string;
  tone: ReadingTone;
  language: ReadingLanguage;
  length: number;
  providerId: string;
  modelId: string;
  text: string;
  wordCount: number;
  generatedAt: string;
}

/** One reading, identified by (profileHash, categoryId). Regenerating
 *  replaces the current version and pushes the old one into `history`. */
export interface ReadingRecord {
  // Identity
  profileHash: string;
  profileName?: string;
  categoryId: ReadingCategoryId;

  // Provenance of the current version
  promptVersion: string;
  tone: ReadingTone;
  language: ReadingLanguage;
  length: number;
  providerId: string;
  modelId: string;

  // Current content
  text: string;
  wordCount: number;
  generatedAt: string;

  // Older versions, newest first
  history: ReadingVersion[];
}

/** Legacy shim — kept so old code compiles during the transition. */
export interface ReadingResult {
  key: string;
  text: string;
  providerId: string;
  modelId: string;
  options: {
    focus: string;
    tone: ReadingTone;
    language: ReadingLanguage;
    numberOfWord: number;
    numberOfSection: number;
  };
  promptVersion: string | number;
  generatedAt: string;
}

export type ReadingStatus = 'none' | 'stale' | 'ready';

// ────────────────────────────────────────────────────────────────────────
// Identity
// ────────────────────────────────────────────────────────────────────────

export function hashProfile(profile: BirthData): string {
  const s = [
    profile.profileName,
    profile.localDate,
    profile.localTime,
    profile.place.lat.toFixed(4),
    profile.place.lon.toFixed(4),
    profile.place.timezone,
  ].join('|');
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h) ^ s.charCodeAt(i);
  return (h >>> 0).toString(36);
}

export function readingId(
  profileHash: string,
  categoryId: ReadingCategoryId
): string {
  return profileHash + '|' + categoryId;
}

// ────────────────────────────────────────────────────────────────────────
// Public read API
// ────────────────────────────────────────────────────────────────────────

export function getReading(
  records: Record<string, ReadingRecord>,
  profileHash: string,
  categoryId: ReadingCategoryId
): ReadingRecord | null {
  return records[readingId(profileHash, categoryId)] ?? null;
}

export function getReadingStatus(
  record: ReadingRecord | null,
  currentPromptVersion: string | number
): ReadingStatus {
  if (!record) return 'none';
  return String(record.promptVersion) === String(currentPromptVersion)
    ? 'ready'
    : 'stale';
}

// ────────────────────────────────────────────────────────────────────────
// Store
// ────────────────────────────────────────────────────────────────────────

interface ReadingStore {
  records: Record<string, ReadingRecord>;
  /** Save a new current version. Pushes the previous one into history.
   *  Accepts an optional `key` for back-compat with callers that still
   *  pass the old composite cache key — it is ignored. */
  save: (
    incoming: Omit<ReadingRecord, 'history'> & { key?: string }
  ) => void;
  remove: (profileHash: string, categoryId: ReadingCategoryId) => void;
  clearForProfile: (profileHash: string) => void;
  clearAll: () => void;
}

const STORE_VERSION = 5;
const MAX_HISTORY = 3;

function makeVersionId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return 'v_' + Date.now() + '_' + Math.random().toString(36).slice(2, 10);
}

function toVersion(r: ReadingRecord): ReadingVersion {
  return {
    versionId: makeVersionId(),
    promptVersion: r.promptVersion,
    tone: r.tone,
    language: r.language,
    length: r.length,
    providerId: r.providerId,
    modelId: r.modelId,
    text: r.text,
    wordCount: r.wordCount,
    generatedAt: r.generatedAt,
  };
}

export const useReadingStore = create<ReadingStore>()(
  persist(
    (set) => ({
      records: {},

      save: (incoming) =>
        set((s) => {
          const id = readingId(incoming.profileHash, incoming.categoryId);
          const existing = s.records[id];

          const history = existing
            ? [toVersion(existing), ...(existing.history ?? [])].slice(
                0,
                MAX_HISTORY
              )
            : [];

          // Strip the legacy `key` field — identity is (profileHash, categoryId).
          const { key: _key, ...rest } = incoming as Omit<
            ReadingRecord,
            'history'
          > & { key?: string };

          return {
            records: {
              ...s.records,
              [id]: { ...rest, history } as ReadingRecord,
            },
          };
        }),

      remove: (profileHash, categoryId) =>
        set((s) => {
          const next = { ...s.records };
          delete next[readingId(profileHash, categoryId)];
          return { records: next };
        }),

      clearForProfile: (profileHash) =>
        set((s) => ({
          records: Object.fromEntries(
            Object.entries(s.records).filter(
              ([, r]) => r.profileHash !== profileHash
            )
          ),
        })),

      clearAll: () => set({ records: {} }),
    }),
    {
      name: 'kundaliyatra-reading-library',
      version: STORE_VERSION,
      migrate: migrateToV5,
    }
  )
);

// ────────────────────────────────────────────────────────────────────────
// Migration v4 → v5
//
// v4 kept one record per (profile, category, promptVersion, tone,
// language, length). That meant changing PROMPT_VERSION silently
// orphaned every prior reading. v5 keeps one record per
// (profile, category) and stores older versions in `history`.
//
// This collapses each group. Nothing is lost.
// ────────────────────────────────────────────────────────────────────────

function migrateToV5(persisted: any, fromVersion: number) {
  if (fromVersion >= 5) return persisted;

  const old = (persisted?.records ?? {}) as Record<string, any>;

  // Defensive: if it already has the v5 shape, don't touch it.
  const firstVal = Object.values(old)[0] as any;
  if (
    firstVal &&
    typeof firstVal === 'object' &&
    'history' in firstVal &&
    !('key' in firstVal)
  ) {
    return persisted;
  }

  const grouped: Record<string, any[]> = {};
  for (const rec of Object.values(old)) {
    if (!rec?.profileHash || !rec?.categoryId) continue;
    const id = readingId(rec.profileHash, rec.categoryId);
    (grouped[id] ??= []).push(rec);
  }

  const next: Record<string, ReadingRecord> = {};

  for (const [id, list] of Object.entries(grouped)) {
    list.sort(
      (a, b) =>
        new Date(b.generatedAt ?? 0).getTime() -
        new Date(a.generatedAt ?? 0).getTime()
    );
    const [current, ...older] = list;

    next[id] = {
      profileHash: current.profileHash,
      profileName: current.profileName,
      categoryId: current.categoryId,
      promptVersion: String(current.promptVersion ?? '0'),
      tone: current.tone,
      language: current.language,
      length: current.length ?? 0,
      providerId: current.providerId ?? '',
      modelId: current.modelId ?? '',
      text: current.text ?? '',
      wordCount: current.wordCount ?? 0,
      generatedAt: current.generatedAt ?? new Date().toISOString(),
      history: older.slice(0, MAX_HISTORY).map((r) => ({
        versionId: makeVersionId(),
        promptVersion: String(r.promptVersion ?? '0'),
        tone: r.tone,
        language: r.language,
        length: r.length ?? 0,
        providerId: r.providerId ?? '',
        modelId: r.modelId ?? '',
        text: r.text ?? '',
        wordCount: r.wordCount ?? 0,
        generatedAt: r.generatedAt ?? new Date().toISOString(),
      })),
    };
  }

  const before = Object.keys(old).length;
  const after = Object.keys(next).length;
  if (typeof console !== 'undefined') {
    console.log(
      '[reading-store] migrated ' + before + ' records into ' + after + ' identities'
    );
  }

  return { records: next };
}

// ────────────────────────────────────────────────────────────────────────
// Selectors
// ────────────────────────────────────────────────────────────────────────

/** Map of categoryId → newest ReadingRecord for the profile. Used by the
 *  studio grid and the dashboard reading tile. */
export function useLibraryForProfile(
  profile: BirthData | null
): Record<string, ReadingRecord> {
  const records = useReadingStore((s) => s.records);
  const hash = profile ? hashProfile(profile) : null;

  return useMemo(() => {
    if (!hash) return {};
    const out: Record<string, ReadingRecord> = {};
    for (const r of Object.values(records)) {
      if (r.profileHash !== hash) continue;
      const existing = out[r.categoryId];
      if (!existing || r.generatedAt > existing.generatedAt) {
        out[r.categoryId] = r;
      }
    }
    return out;
  }, [records, hash]);
}

// ────────────────────────────────────────────────────────────────────────
// Back-compat shim for the old composite cache key.
//
// Under the new model, identity is just (profileHash, categoryId). This
// returns exactly that, so every existing caller keeps working. The
// extra arguments (version, tone, language, length) are ignored.
// ────────────────────────────────────────────────────────────────────────

/** @deprecated Use readingId() directly. */
export function makeReadingKey(
  profile: BirthData,
  categoryId: ReadingCategoryId,
  _promptVersion?: string | number,
  _tone?: ReadingTone,
  _language?: ReadingLanguage,
  _length?: number
): string {
  return readingId(hashProfile(profile), categoryId);
}

// ────────────────────────────────────────────────────────────────────────
// Backup / restore — unchanged
// ────────────────────────────────────────────────────────────────────────

const BIRTH_STORE_KEY = 'kundaliyatra-store';
const READING_LIBRARY_KEY = 'kundaliyatra-reading-library';
const BACKUP_MAGIC = 'kundaliyatra-backup';

interface BackupBundle {
  _app: typeof BACKUP_MAGIC;
  _version: 1;
  _exportedAt: string;
  birthStore: unknown | null;
  readingLibrary: unknown | null;
}

function safeParse(raw: string | null): unknown | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function exportLibrary(): void {
  const bundle: BackupBundle = {
    _app: BACKUP_MAGIC,
    _version: 1,
    _exportedAt: new Date().toISOString(),
    birthStore: safeParse(localStorage.getItem(BIRTH_STORE_KEY)),
    readingLibrary: safeParse(localStorage.getItem(READING_LIBRARY_KEY)),
  };

  const blob = new Blob([JSON.stringify(bundle, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const stamp = new Date().toISOString().slice(0, 10);
  a.download = 'kundaliyatra-backup-' + stamp + '.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export interface ImportResult {
  profiles: number;
  readings: number;
}

export async function importLibrary(file: File): Promise<ImportResult> {
  const text = await file.text();
  let bundle: BackupBundle;
  try {
    bundle = JSON.parse(text);
  } catch {
    throw new Error('That file is not valid JSON.');
  }
  if (bundle._app !== BACKUP_MAGIC) {
    throw new Error('Not a KundaliYatra backup file.');
  }

  let profiles = 0;
  let readings = 0;

  if (bundle.birthStore) {
    const incoming = bundle.birthStore as {
      state?: { profiles?: Record<string, { createdAt?: string }> };
    };
    const incomingProfiles = incoming?.state?.profiles ?? {};
    const current = safeParse(localStorage.getItem(BIRTH_STORE_KEY)) as
      | { state?: { profiles?: Record<string, unknown> }; version?: number }
      | null;
    const currentProfiles = current?.state?.profiles ?? {};

    const merged = { ...currentProfiles };
    for (const [id, p] of Object.entries(incomingProfiles)) {
      const existing = merged[id] as { createdAt?: string } | undefined;
      const incomingAt = p?.createdAt ? new Date(p.createdAt).getTime() : 0;
      const existingAt = existing?.createdAt
        ? new Date(existing.createdAt).getTime()
        : 0;
      if (!existing || incomingAt > existingAt) {
        merged[id] = p;
        profiles++;
      }
    }

    const next = {
      ...(current ?? {}),
      state: { ...(current?.state ?? {}), profiles: merged },
      version: current?.version ?? 1,
    };
    localStorage.setItem(BIRTH_STORE_KEY, JSON.stringify(next));
  }

  if (bundle.readingLibrary) {
    const incoming = bundle.readingLibrary as {
      state?: { records?: Record<string, { generatedAt?: string }> };
    };
    const incomingRecords = incoming?.state?.records ?? {};
    const current = safeParse(localStorage.getItem(READING_LIBRARY_KEY)) as
      | { state?: { records?: Record<string, unknown> }; version?: number }
      | null;
    const currentRecords = current?.state?.records ?? {};

    const merged = { ...currentRecords };
    for (const [key, r] of Object.entries(incomingRecords)) {
      const existing = merged[key] as { generatedAt?: string } | undefined;
      const incomingAt = r?.generatedAt ? new Date(r.generatedAt).getTime() : 0;
      const existingAt = existing?.generatedAt
        ? new Date(existing.generatedAt).getTime()
        : 0;
      if (!existing || incomingAt > existingAt) {
        merged[key] = r;
        readings++;
      }
    }

    const next = {
      ...(current ?? {}),
      state: { ...(current?.state ?? {}), records: merged },
      version: current?.version ?? STORE_VERSION,
    };
    localStorage.setItem(READING_LIBRARY_KEY, JSON.stringify(next));
  }

  return { profiles, readings };
}