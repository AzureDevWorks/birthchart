/**
 * Restore-only backup module.
 *
 * Export lives on the /export page. This file only knows how to read a
 * KundaliYatra backup file and merge it into the current stores.
 *
 * API keys are never imported; only provider order and preferred models.
 */
import type { BirthData } from '@/domain/astrology/birth-data';

const BACKUP_APP = 'kundaliyatra-backup';
const BACKUP_VERSION = 1;

const KEYS = {
  birth: 'kundaliyatra-store',
  readings: 'kundaliyatra-reading-library',
  dailyRashi: 'kundaliyatra-daily-rashi',
  aiSettings: 'kundaliyatra-ai-settings',
} as const;

interface StoreEnvelope<T = unknown> {
  state?: T;
  version?: number;
}

interface BirthState {
  profiles: Record<string, BirthData>;
  activeProfileId: string | null;
  masterProfileId: string | null;
}

interface ReadingState {
  records: Record<string, unknown>;
}

interface DailyRashiState {
  records: Record<string, unknown>;
}

interface AiSettingsState {
  providers: Record<string, { apiKey?: string; preferredModel?: string }>;
  providerOrder: string[];
}

export interface KundaliYatraBackup {
  _app: typeof BACKUP_APP;
  _version: number;
  _exportedAt: string;
  _appVersion?: string;
  profiles: BirthData[];
  activeProfileId: string | null;
  masterProfileId: string | null;
  readings: unknown[];
  dailyRashi: unknown[];
  aiSettings: {
    providerOrder: string[];
    providerModels: Record<string, string>;
  };
}

function safeParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function getEnvelope<T>(key: string): StoreEnvelope<T> | null {
  return safeParse<StoreEnvelope<T>>(localStorage.getItem(key));
}

// ────────────────────────────────────────────────────────────────────────
// Import
// ────────────────────────────────────────────────────────────────────────

export interface ImportStats {
  profiles: { added: number; merged: number };
  readings: { added: number; merged: number };
  dailyRashi: { added: number; merged: number };
  aiSettings: { applied: boolean };
}

function isBackupShape(x: unknown): x is KundaliYatraBackup {
  if (!x || typeof x !== 'object') return false;
  const b = x as { _app?: string };
  return b._app === BACKUP_APP;
}

export async function importBackup(file: File): Promise<ImportStats> {
  const text = await file.text();
  let bundle: unknown;
  try {
    bundle = JSON.parse(text);
  } catch {
    throw new Error('That file is not valid JSON.');
  }
  if (!isBackupShape(bundle)) {
    throw new Error('Not a KundaliYatra backup file.');
  }

  const stats: ImportStats = {
    profiles: { added: 0, merged: 0 },
    readings: { added: 0, merged: 0 },
    dailyRashi: { added: 0, merged: 0 },
    aiSettings: { applied: false },
  };

  // ── Profiles ────────────────────────────────────────────
  const birthEnv = getEnvelope<BirthState>(KEYS.birth);
  const currentProfiles = birthEnv?.state?.profiles ?? {};
  const currentActive = birthEnv?.state?.activeProfileId ?? null;
  const currentMaster = birthEnv?.state?.masterProfileId ?? null;

  const mergedProfiles: Record<string, BirthData> = { ...currentProfiles };

  for (const incoming of bundle.profiles) {
    if (!incoming?.id) continue;
    const existing = mergedProfiles[incoming.id];
    if (!existing) {
      mergedProfiles[incoming.id] = incoming;
      stats.profiles.added++;
      continue;
    }
    const existingAt = new Date(existing.createdAt ?? 0).getTime();
    const incomingAt = new Date(incoming.createdAt ?? 0).getTime();
    if (incomingAt > existingAt) {
      mergedProfiles[incoming.id] = { ...existing, ...incoming };
      stats.profiles.merged++;
    }
  }

  const nextActive = mergedProfiles[currentActive ?? '']
    ? currentActive
    : bundle.activeProfileId && mergedProfiles[bundle.activeProfileId]
      ? bundle.activeProfileId
      : Object.keys(mergedProfiles)[0] ?? null;

  const nextMaster = mergedProfiles[currentMaster ?? '']
    ? currentMaster
    : bundle.masterProfileId && mergedProfiles[bundle.masterProfileId]
      ? bundle.masterProfileId
      : nextActive;

  const nextBirthState: BirthState = {
    profiles: mergedProfiles,
    activeProfileId: nextActive,
    masterProfileId: nextMaster,
  };

  localStorage.setItem(
    KEYS.birth,
    JSON.stringify({ state: nextBirthState, version: 2 })
  );

  // ── Readings ────────────────────────────────────────────
  const readingEnv = getEnvelope<ReadingState>(KEYS.readings);
  const currentReadings = (readingEnv?.state?.records ?? {}) as Record<
    string,
    { generatedAt?: string }
  >;
  const mergedReadings: Record<string, unknown> = { ...currentReadings };

  for (const incoming of bundle.readings as Array<{
    key?: string;
    generatedAt?: string;
  }>) {
    if (!incoming?.key) continue;
    const existing = currentReadings[incoming.key];
    if (!existing) {
      mergedReadings[incoming.key] = incoming;
      stats.readings.added++;
      continue;
    }
    const existingAt = new Date(existing.generatedAt ?? 0).getTime();
    const incomingAt = new Date(incoming.generatedAt ?? 0).getTime();
    if (incomingAt > existingAt) {
      mergedReadings[incoming.key] = incoming;
      stats.readings.merged++;
    }
  }

  localStorage.setItem(
    KEYS.readings,
    JSON.stringify({ state: { records: mergedReadings }, version: 4 })
  );

  // ── Daily Rashi ─────────────────────────────────────────
  const drEnv = getEnvelope<DailyRashiState>(KEYS.dailyRashi);
  const currentDr = (drEnv?.state?.records ?? {}) as Record<
    string,
    { generatedAt?: string }
  >;
  const mergedDr: Record<string, unknown> = { ...currentDr };

  for (const incoming of bundle.dailyRashi as Array<{
    key?: string;
    generatedAt?: string;
  }>) {
    if (!incoming?.key) continue;
    const existing = currentDr[incoming.key];
    if (!existing) {
      mergedDr[incoming.key] = incoming;
      stats.dailyRashi.added++;
      continue;
    }
    const existingAt = new Date(existing.generatedAt ?? 0).getTime();
    const incomingAt = new Date(incoming.generatedAt ?? 0).getTime();
    if (incomingAt > existingAt) {
      mergedDr[incoming.key] = incoming;
      stats.dailyRashi.merged++;
    }
  }

  localStorage.setItem(
    KEYS.dailyRashi,
    JSON.stringify({ state: { records: mergedDr }, version: 1 })
  );

  // ── AI Settings ─────────────────────────────────────────
  const aiEnv = getEnvelope<AiSettingsState>(KEYS.aiSettings);
  const currentAi = aiEnv?.state ?? { providers: {}, providerOrder: [] };

  const mergedProviders: AiSettingsState['providers'] = {
    ...(currentAi.providers ?? {}),
  };
  for (const [id, model] of Object.entries(bundle.aiSettings.providerModels)) {
    const existing = mergedProviders[id] ?? { apiKey: '' };
    mergedProviders[id] = { ...existing, preferredModel: model };
  }

  const orderSet = new Set(currentAi.providerOrder ?? []);
  for (const id of bundle.aiSettings.providerOrder ?? []) orderSet.add(id);

  localStorage.setItem(
    KEYS.aiSettings,
    JSON.stringify({
      state: {
        providers: mergedProviders,
        providerOrder: Array.from(orderSet),
      },
      version: 4,
    })
  );
  stats.aiSettings.applied = true;

  return stats;
}

// Keep the version constant referenced so it's not flagged as unused.
export const BACKUP_VERSION_EXPORT = BACKUP_VERSION;