/**
 * Persistent cache for computed kundlis - COMPUTE LAYER.
 *
 * This module wraps the storage layer (kundli-cache-storage.ts) with
 * the actual compute path via @prisri/jyotish. Features that need the
 * computed kundli import from here.
 *
 * If you only need to invalidate or inspect cache entries, import from
 * `kundli-cache-storage.ts` directly - it has no library dependency,
 * so it does not pull @prisri/jyotish into the bundle.
 */
import type { BirthData } from '@/domain/astrology/birth-data';
import { prisriJyotish } from '@/infrastructure/astrology/prisri-jyotish.adapter';
import {
  kundliSignature,
  readStored,
  writeStored,
  removeStoredKundli,
  clearStoredKundlis,
  pruneOlder,
  listStoredKundlis,
  getStoredKundliJson,
} from './kundli-cache-storage';

// Re-export the pure helpers so existing callers of kundli-cache keep
// working. New code should prefer importing from kundli-cache-storage.
export {
  kundliSignature,
  removeStoredKundli,
  clearStoredKundlis,
  pruneOlder,
  listStoredKundlis,
  getStoredKundliJson,
};

const TTL_MS = 5 * 60 * 1000;
const MAX_AGE_DAYS = 90;

interface MemoryEntry { kundli: any; at: number; }
const memory = new Map<string, MemoryEntry>();

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

export function persistKundli(profile: BirthData, kundli: any): void {
  const sig = kundliSignature(profile);
  memory.set(sig, { kundli, at: Date.now() });
  writeStored(profile, sig, kundli);
}

export function recomputeKundli(profile: BirthData): any | null {
  try {
    const kundli = prisriJyotish.calculate(profile);
    persistKundli(profile, kundli);
    return kundli;
  } catch {
    return null;
  }
}

export function clearKundliCache(): void {
  memory.clear();
}

// Boot-time hygiene
try { pruneOlder(MAX_AGE_DAYS); } catch { /* ignore */ }
