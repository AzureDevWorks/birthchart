/**
 * Persistent cache for computed kundlis.
 *
 * Two layers:
 *  - In-memory Map with a 5-minute TTL for the current session.
 *  - localStorage under `kundaliyatra-kundli:<signature>`, one key per
 *    birth profile, so kundlis survive reloads without recomputing.
 *
 * The signature is derived from the birth data only - not the profile
 * name - so renaming a profile does not orphan its kundli.
 */
import type { BirthData } from '@/domain/astrology/birth-data';
import { prisriJyotish } from '@/infrastructure/astrology/prisri-jyotish.adapter';

const TTL_MS = 5 * 60 * 1000;
const STORAGE_PREFIX = 'kundaliyatra-kundli:';
const STORAGE_VERSION = 1;
const MAX_AGE_DAYS = 90;

interface MemoryEntry {
  kundli: any;
  at: number;
}

interface StoredKundli {
  _v: number;
  signature: string;
  profileName: string;
  savedAt: string;
  kundli: any;
}

const memory = new Map<string, MemoryEntry>();

// ------------------------------------------------------------------------
// Signature
// ------------------------------------------------------------------------

export function kundliSignature(p: BirthData): string {
  return [
    p.localDate,
    p.localTime,
    p.place.lat.toFixed(4),
    p.place.lon.toFixed(4),
    p.place.timezone,
  ].join('|');
}

function storageKey(signature: string): string {
  return STORAGE_PREFIX + signature;
}

// ------------------------------------------------------------------------
// localStorage layer
// ------------------------------------------------------------------------

function readStored(signature: string): any | null {
  try {
    const raw = localStorage.getItem(storageKey(signature));
    if (!raw) return null;
    const parsed: StoredKundli = JSON.parse(raw);
    if (parsed._v !== STORAGE_VERSION) return null;
    return parsed.kundli ?? null;
  } catch {
    return null;
  }
}

function writeStored(profile: BirthData, signature: string, kundli: any): void {
  let json: string;
  try {
    json = JSON.stringify({
      _v: STORAGE_VERSION,
      signature,
      profileName: profile.profileName,
      savedAt: new Date().toISOString(),
      kundli,
    } satisfies StoredKundli);
  } catch {
    // Kundli is not serializable - keep it in memory only.
    return;
  }

  try {
    localStorage.setItem(storageKey(signature), json);
  } catch (e) {
    if ((e as Error)?.name === 'QuotaExceededError') {
      // Prune the oldest quarter, then retry once.
      pruneOlder(MAX_AGE_DAYS / 4);
      try {
        localStorage.setItem(storageKey(signature), json);
      } catch {
        // give up - memory cache still works for this session
      }
    }
  }
}

// ------------------------------------------------------------------------
// Pruning / management
// ------------------------------------------------------------------------

/** Delete stored kundlis older than `days`. Returns how many were removed. */
export function pruneOlder(days: number): number {
  const cutoff = Date.now() - days * 86_400_000;
  let removed = 0;
  try {
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (!key || !key.startsWith(STORAGE_PREFIX)) continue;
      try {
        const entry = JSON.parse(localStorage.getItem(key) ?? '');
        const ts = new Date(entry?.savedAt ?? 0).getTime();
        if (!Number.isFinite(ts) || ts < cutoff) {
          localStorage.removeItem(key);
          removed++;
        }
      } catch {
        localStorage.removeItem(key);
        removed++;
      }
    }
  } catch {
    // localStorage unavailable
  }
  return removed;
}

/** Remove a single profile's stored kundli. */
export function removeStoredKundli(profile: BirthData): void {
  const sig = kundliSignature(profile);
  try { localStorage.removeItem(storageKey(sig)); } catch { /* ignore */ }
  memory.delete(sig);
}

/** Wipe every stored kundli. */
export function clearStoredKundlis(): void {
  try {
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key && key.startsWith(STORAGE_PREFIX)) localStorage.removeItem(key);
    }
  } catch { /* ignore */ }
  memory.clear();
}

/** List all stored kundlis with metadata. Useful for a future manage UI. */
export function listStoredKundlis(): Array<{
  signature: string;
  profileName: string;
  savedAt: string;
  bytes: number;
}> {
  const out: Array<{
    signature: string;
    profileName: string;
    savedAt: string;
    bytes: number;
  }> = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key || !key.startsWith(STORAGE_PREFIX)) continue;
      const raw = localStorage.getItem(key) ?? '';
      try {
        const parsed = JSON.parse(raw);
        out.push({
          signature: parsed.signature ?? key.slice(STORAGE_PREFIX.length),
          profileName: parsed.profileName ?? '-',
          savedAt: parsed.savedAt ?? '',
          bytes: raw.length,
        });
      } catch { /* skip corrupt */ }
    }
  } catch { /* ignore */ }
  return out.sort((a, b) => b.savedAt.localeCompare(a.savedAt));
}

// ------------------------------------------------------------------------
// Public API
// ------------------------------------------------------------------------

/**
 * Returns the computed kundli for a profile.
 * Resolution order: memory -> localStorage -> compute + persist.
 */
export function getCachedKundli(profile: BirthData): any | null {
  const sig = kundliSignature(profile);

  // 1. Memory
  const hit = memory.get(sig);
  if (hit && Date.now() - hit.at < TTL_MS) return hit.kundli;

  // 2. localStorage
  const stored = readStored(sig);
  if (stored) {
    memory.set(sig, { kundli: stored, at: Date.now() });
    return stored;
  }

  // 3. Compute and persist
  try {
    const kundli = prisriJyotish.calculate(profile);
    memory.set(sig, { kundli, at: Date.now() });
    writeStored(profile, sig, kundli);
    return kundli;
  } catch {
    return null;
  }
}

/**
 * Persist an already-computed kundli. Useful when the caller has just
 * run prisriJyotish.calculate() directly and wants it cached.
 */
export function persistKundli(profile: BirthData, kundli: any): void {
  const sig = kundliSignature(profile);
  memory.set(sig, { kundli, at: Date.now() });
  writeStored(profile, sig, kundli);
}

/**
 * Force a fresh computation and overwrite whatever is stored.
 */
export function recomputeKundli(profile: BirthData): any | null {
  try {
    const kundli = prisriJyotish.calculate(profile);
    persistKundli(profile, kundli);
    return kundli;
  } catch {
    return null;
  }
}

/** Clear the in-memory cache only. */
export function clearKundliCache(): void {
  memory.clear();
}

/**
 * Return the raw stored kundli for a profile, without recomputing.
 * Returns null if nothing is stored.
 */
export function getStoredKundliJson(profile: BirthData): any | null {
  return readStored(kundliSignature(profile));
}

// Boot-time hygiene: drop kundlis older than MAX_AGE_DAYS on first import.
try { pruneOlder(MAX_AGE_DAYS); } catch { /* ignore */ }