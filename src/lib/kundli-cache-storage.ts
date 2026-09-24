/**
 * Persistent cache for computed kundlis - STORAGE ONLY.
 *
 * This file deliberately has zero imports from
 * `@/infrastructure/astrology/*`. It only knows how to read and write
 * localStorage entries keyed by a birth-data signature.
 *
 * Any feature that needs the *computed* kundli imports from
 * `kundli-cache.ts` instead - which delegates storage to this module
 * and adds the compute path.
 */
import type { BirthData } from '@/domain/astrology/birth-data';

const STORAGE_PREFIX = 'kundaliyatra-kundli:';
const STORAGE_VERSION = 1;
const MAX_AGE_DAYS = 90;

interface StoredKundli {
  _v: number;
  signature: string;
  profileName: string;
  savedAt: string;
  kundli: any;
}

export function kundliSignature(p: BirthData): string {
  return [
    p.localDate,
    p.localTime,
    p.place.lat.toFixed(4),
    p.place.lon.toFixed(4),
    p.place.timezone,
  ].join('|');
}

export function storageKey(signature: string): string {
  return STORAGE_PREFIX + signature;
}

export function readStored(signature: string): any | null {
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

export function writeStored(profile: BirthData, signature: string, kundli: any): void {
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
    return;
  }
  try {
    localStorage.setItem(storageKey(signature), json);
  } catch (e) {
    if ((e as Error)?.name === 'QuotaExceededError') {
      pruneOlder(MAX_AGE_DAYS / 4);
      try {
        localStorage.setItem(storageKey(signature), json);
      } catch {
        /* give up - memory cache still works */
      }
    }
  }
}

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
  } catch { /* localStorage unavailable */ }
  return removed;
}

export function removeStoredKundli(profile: BirthData): void {
  const sig = kundliSignature(profile);
  try { localStorage.removeItem(storageKey(sig)); } catch { /* ignore */ }
}

export function clearStoredKundlis(): void {
  try {
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key && key.startsWith(STORAGE_PREFIX)) localStorage.removeItem(key);
    }
  } catch { /* ignore */ }
}

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

export function getStoredKundliJson(profile: BirthData): any | null {
  return readStored(kundliSignature(profile));
}
