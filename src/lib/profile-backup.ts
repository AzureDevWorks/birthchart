/**
 * Per-profile backup.
 *
 * Bundles one birth profile together with every reading and daily-rashi
 * record that belongs to it. Importing restores all three at once.
 *
 * This is intentionally separate from the app-wide backup/export. The
 * app-wide export lives on the /export page. This file handles only the
 * "give me my readings back" round trip, one profile at a time.
 */
import type { BirthData } from '@/domain/astrology/birth-data';
import { hashProfile } from '@/features/ai-reading/store';

const APP = 'kundaliyatra-profile';
const VERSION = 1;

const KEYS = {
  birth: 'kundaliyatra-store',
  readings: 'kundaliyatra-reading-library',
  dailyRashi: 'kundaliyatra-daily-rashi',
} as const;

export interface ProfileBundle {
  _app: typeof APP;
  _version: number;
  _exportedAt: string;
  profile: BirthData;
  readings: Record<string, any>;
  dailyRashi: Record<string, any>;
}

interface StoreEnvelope<T = unknown> {
  state?: T;
  version?: number;
}

interface BirthState {
  profiles: Record<string, BirthData>;
  activeProfileId: string | null;
  masterProfileId: string | null;
}

interface ReadingsState {
  records: Record<string, any>;
}

interface DailyRashiState {
  records: Record<string, any>;
}

// ────────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────────

function safeParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function readEnvelope<T>(key: string): StoreEnvelope<T> | null {
  return safeParse<StoreEnvelope<T>>(localStorage.getItem(key));
}

function safeFileName(name: string): string {
  return name.replace(/[^a-z0-9]+/gi, '-').toLowerCase();
}

function isoStamp(): string {
  return new Date().toISOString().slice(0, 10);
}

// ────────────────────────────────────────────────────────────────────────
// Export
// ────────────────────────────────────────────────────────────────────────

/**
 * Build the bundle for one profile. Throws if the profile id is unknown.
 */
export function buildProfileBundle(profileId: string): ProfileBundle {
  const birth = readEnvelope<BirthState>(KEYS.birth)?.state;
  const profile = birth?.profiles?.[profileId];
  if (!profile) {
    throw new Error('Profile not found in local storage.');
  }

  const hash = hashProfile(profile);

  const allReadings = readEnvelope<ReadingsState>(KEYS.readings)?.state?.records ?? {};
  const readings: Record<string, any> = {};
  for (const [key, rec] of Object.entries(allReadings)) {
    if ((rec as { profileHash?: string })?.profileHash === hash) {
      readings[key] = rec;
    }
  }

  const allDaily = readEnvelope<DailyRashiState>(KEYS.dailyRashi)?.state?.records ?? {};
  const dailyRashi: Record<string, any> = {};
  for (const [key, rec] of Object.entries(allDaily)) {
    if ((rec as { profileHash?: string })?.profileHash === hash) {
      dailyRashi[key] = rec;
    }
  }

  return {
    _app: APP,
    _version: VERSION,
    _exportedAt: new Date().toISOString(),
    profile,
    readings,
    dailyRashi,
  };
}

/**
 * Trigger a browser download of one profile's bundle.
 * Returns the byte count and filename so the caller can toast it.
 */
export function exportProfileBundle(profileId: string): {
  bytes: number;
  filename: string;
  readingCount: number;
  dailyRashiCount: number;
} {
  const bundle = buildProfileBundle(profileId);
  const json = JSON.stringify(bundle, null, 2);

  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;

  const base = safeFileName(bundle.profile.profileName || 'profile');
  const filename = `kundaliyatra-${base}-readings-${isoStamp()}.json`;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  return {
    bytes: json.length,
    filename,
    readingCount: Object.keys(bundle.readings).length,
    dailyRashiCount: Object.keys(bundle.dailyRashi).length,
  };
}

// ────────────────────────────────────────────────────────────────────────
// Import
// ────────────────────────────────────────────────────────────────────────

export interface ProfileImportStats {
  profile: 'added' | 'merged' | 'unchanged';
  readings: { added: number; merged: number; skipped: number };
  dailyRashi: { added: number; merged: number; skipped: number };
}

function isProfileBundle(x: unknown): x is ProfileBundle {
  if (!x || typeof x !== 'object') return false;
  const b = x as { _app?: string; profile?: unknown };
  return b._app === APP && Boolean(b.profile);
}

/**
 * Merge one profile bundle into local storage.
 *
 * - Profile: replaced in place if it already exists (matched by id),
 *   added otherwise. The active profile id is not touched.
 * - Readings: merged by cache key. For each key, the record with the
 *   newer generatedAt wins. Existing records that are not in the file
 *   are kept.
 * - Daily rashi: same rule.
 *
 * API keys are never involved.
 */
export async function importProfileBundle(file: File): Promise<ProfileImportStats> {
  const text = await file.text();
  let bundle: unknown;
  try {
    bundle = JSON.parse(text);
  } catch {
    throw new Error('That file is not valid JSON.');
  }
  if (!isProfileBundle(bundle)) {
    throw new Error('Not a KundaliYatra profile file.');
  }

  const stats: ProfileImportStats = {
    profile: 'unchanged',
    readings: { added: 0, merged: 0, skipped: 0 },
    dailyRashi: { added: 0, merged: 0, skipped: 0 },
  };

  // ── Profile ───────────────────────────────────────────
  const birthEnv = readEnvelope<BirthState>(KEYS.birth);
  const birthState: BirthState = {
    profiles: { ...(birthEnv?.state?.profiles ?? {}) },
    activeProfileId: birthEnv?.state?.activeProfileId ?? null,
    masterProfileId: birthEnv?.state?.masterProfileId ?? null,
  };

  const incoming = bundle.profile;
  if (incoming?.id) {
    const existing = birthState.profiles[incoming.id];
    if (!existing) {
      birthState.profiles[incoming.id] = incoming;
      stats.profile = 'added';
    } else {
      const existingAt = new Date(existing.createdAt ?? 0).getTime();
      const incomingAt = new Date(incoming.createdAt ?? 0).getTime();
      if (incomingAt > existingAt) {
        birthState.profiles[incoming.id] = { ...existing, ...incoming };
        stats.profile = 'merged';
      }
    }

    // Seed masterProfileId if the store had none
    if (!birthState.masterProfileId) {
      birthState.masterProfileId = incoming.id;
    }
    if (!birthState.activeProfileId) {
      birthState.activeProfileId = incoming.id;
    }
  }

  localStorage.setItem(
    KEYS.birth,
    JSON.stringify({ state: birthState, version: 2 })
  );

  // ── Readings ──────────────────────────────────────────
  const readingEnv = readEnvelope<ReadingsState>(KEYS.readings);
  const mergedReadings: Record<string, any> = {
    ...(readingEnv?.state?.records ?? {}),
  };

  for (const [key, incomingRec] of Object.entries(bundle.readings ?? {})) {
    const existing = mergedReadings[key] as
      | { generatedAt?: string }
      | undefined;
    if (!existing) {
      mergedReadings[key] = incomingRec;
      stats.readings.added++;
      continue;
    }
    const existingAt = new Date(existing.generatedAt ?? 0).getTime();
    const incomingAt = new Date(
      (incomingRec as { generatedAt?: string })?.generatedAt ?? 0
    ).getTime();
    if (incomingAt > existingAt) {
      mergedReadings[key] = incomingRec;
      stats.readings.merged++;
    } else {
      stats.readings.skipped++;
    }
  }

  localStorage.setItem(
    KEYS.readings,
    JSON.stringify({ state: { records: mergedReadings }, version: 4 })
  );

  // ── Daily Rashi ───────────────────────────────────────
  const drEnv = readEnvelope<DailyRashiState>(KEYS.dailyRashi);
  const mergedDr: Record<string, any> = {
    ...(drEnv?.state?.records ?? {}),
  };

  for (const [key, incomingRec] of Object.entries(bundle.dailyRashi ?? {})) {
    const existing = mergedDr[key] as { generatedAt?: string } | undefined;
    if (!existing) {
      mergedDr[key] = incomingRec;
      stats.dailyRashi.added++;
      continue;
    }
    const existingAt = new Date(existing.generatedAt ?? 0).getTime();
    const incomingAt = new Date(
      (incomingRec as { generatedAt?: string })?.generatedAt ?? 0
    ).getTime();
    if (incomingAt > existingAt) {
      mergedDr[key] = incomingRec;
      stats.dailyRashi.merged++;
    } else {
      stats.dailyRashi.skipped++;
    }
  }

  localStorage.setItem(
    KEYS.dailyRashi,
    JSON.stringify({ state: { records: mergedDr }, version: 2 })
  );

  return stats;
}