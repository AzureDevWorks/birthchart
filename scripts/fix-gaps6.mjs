#!/usr/bin/env node
// Split kundli-cache into storage-only + compute modules,
// so birth-profile/store doesn't pull @prisri/jyotish into the entry chunk.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
const BACKUP = path.join(ROOT, `.fix-gaps6-backup-${stamp}`);

const log = (lvl, msg) => console.log(`  [${lvl}] ${msg}`);
const read = rel => {
  const fp = path.join(ROOT, rel);
  return fs.existsSync(fp) ? fs.readFileSync(fp, 'utf8') : null;
};
const backup = rel => {
  const fp = path.join(ROOT, rel);
  if (!fs.existsSync(fp)) return;
  const dst = path.join(BACKUP, rel);
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.copyFileSync(fp, dst);
};
const write = (rel, content) => {
  backup(rel);
  fs.mkdirSync(path.dirname(path.join(ROOT, rel)), { recursive: true });
  fs.writeFileSync(path.join(ROOT, rel), content, 'utf8');
  log('OK', `wrote ${rel}`);
};

// ==========================================================================
// 1. Create the storage-only module
// ==========================================================================
console.log('\n=== Step 1: create kundli-cache-storage.ts ===');

const storageModule = [
  "/**",
  " * Persistent cache for computed kundlis - STORAGE ONLY.",
  " *",
  " * This file deliberately has zero imports from",
  " * `@/infrastructure/astrology/*`. It only knows how to read and write",
  " * localStorage entries keyed by a birth-data signature.",
  " *",
  " * Any feature that needs the *computed* kundli imports from",
  " * `kundli-cache.ts` instead - which delegates storage to this module",
  " * and adds the compute path.",
  " */",
  "import type { BirthData } from '@/domain/astrology/birth-data';",
  "",
  "const STORAGE_PREFIX = 'kundaliyatra-kundli:';",
  "const STORAGE_VERSION = 1;",
  "const MAX_AGE_DAYS = 90;",
  "",
  "interface StoredKundli {",
  "  _v: number;",
  "  signature: string;",
  "  profileName: string;",
  "  savedAt: string;",
  "  kundli: any;",
  "}",
  "",
  "export function kundliSignature(p: BirthData): string {",
  "  return [",
  "    p.localDate,",
  "    p.localTime,",
  "    p.place.lat.toFixed(4),",
  "    p.place.lon.toFixed(4),",
  "    p.place.timezone,",
  "  ].join('|');",
  "}",
  "",
  "export function storageKey(signature: string): string {",
  "  return STORAGE_PREFIX + signature;",
  "}",
  "",
  "export function readStored(signature: string): any | null {",
  "  try {",
  "    const raw = localStorage.getItem(storageKey(signature));",
  "    if (!raw) return null;",
  "    const parsed: StoredKundli = JSON.parse(raw);",
  "    if (parsed._v !== STORAGE_VERSION) return null;",
  "    return parsed.kundli ?? null;",
  "  } catch {",
  "    return null;",
  "  }",
  "}",
  "",
  "export function writeStored(profile: BirthData, signature: string, kundli: any): void {",
  "  let json: string;",
  "  try {",
  "    json = JSON.stringify({",
  "      _v: STORAGE_VERSION,",
  "      signature,",
  "      profileName: profile.profileName,",
  "      savedAt: new Date().toISOString(),",
  "      kundli,",
  "    } satisfies StoredKundli);",
  "  } catch {",
  "    return;",
  "  }",
  "  try {",
  "    localStorage.setItem(storageKey(signature), json);",
  "  } catch (e) {",
  "    if ((e as Error)?.name === 'QuotaExceededError') {",
  "      pruneOlder(MAX_AGE_DAYS / 4);",
  "      try {",
  "        localStorage.setItem(storageKey(signature), json);",
  "      } catch {",
  "        /* give up - memory cache still works */",
  "      }",
  "    }",
  "  }",
  "}",
  "",
  "export function pruneOlder(days: number): number {",
  "  const cutoff = Date.now() - days * 86_400_000;",
  "  let removed = 0;",
  "  try {",
  "    for (let i = localStorage.length - 1; i >= 0; i--) {",
  "      const key = localStorage.key(i);",
  "      if (!key || !key.startsWith(STORAGE_PREFIX)) continue;",
  "      try {",
  "        const entry = JSON.parse(localStorage.getItem(key) ?? '');",
  "        const ts = new Date(entry?.savedAt ?? 0).getTime();",
  "        if (!Number.isFinite(ts) || ts < cutoff) {",
  "          localStorage.removeItem(key);",
  "          removed++;",
  "        }",
  "      } catch {",
  "        localStorage.removeItem(key);",
  "        removed++;",
  "      }",
  "    }",
  "  } catch { /* localStorage unavailable */ }",
  "  return removed;",
  "}",
  "",
  "export function removeStoredKundli(profile: BirthData): void {",
  "  const sig = kundliSignature(profile);",
  "  try { localStorage.removeItem(storageKey(sig)); } catch { /* ignore */ }",
  "}",
  "",
  "export function clearStoredKundlis(): void {",
  "  try {",
  "    for (let i = localStorage.length - 1; i >= 0; i--) {",
  "      const key = localStorage.key(i);",
  "      if (key && key.startsWith(STORAGE_PREFIX)) localStorage.removeItem(key);",
  "    }",
  "  } catch { /* ignore */ }",
  "}",
  "",
  "export function listStoredKundlis(): Array<{",
  "  signature: string;",
  "  profileName: string;",
  "  savedAt: string;",
  "  bytes: number;",
  "}> {",
  "  const out: Array<{",
  "    signature: string;",
  "    profileName: string;",
  "    savedAt: string;",
  "    bytes: number;",
  "  }> = [];",
  "  try {",
  "    for (let i = 0; i < localStorage.length; i++) {",
  "      const key = localStorage.key(i);",
  "      if (!key || !key.startsWith(STORAGE_PREFIX)) continue;",
  "      const raw = localStorage.getItem(key) ?? '';",
  "      try {",
  "        const parsed = JSON.parse(raw);",
  "        out.push({",
  "          signature: parsed.signature ?? key.slice(STORAGE_PREFIX.length),",
  "          profileName: parsed.profileName ?? '-',",
  "          savedAt: parsed.savedAt ?? '',",
  "          bytes: raw.length,",
  "        });",
  "      } catch { /* skip corrupt */ }",
  "    }",
  "  } catch { /* ignore */ }",
  "  return out.sort((a, b) => b.savedAt.localeCompare(a.savedAt));",
  "}",
  "",
  "export function getStoredKundliJson(profile: BirthData): any | null {",
  "  return readStored(kundliSignature(profile));",
  "}",
  ""
].join('\n');

write('src/lib/kundli-cache-storage.ts', storageModule);

// ==========================================================================
// 2. Rewrite kundli-cache.ts to delegate storage + add compute
// ==========================================================================
console.log('\n=== Step 2: rewrite kundli-cache.ts ===');

const cacheModule = [
  "/**",
  " * Persistent cache for computed kundlis - COMPUTE LAYER.",
  " *",
  " * This module wraps the storage layer (kundli-cache-storage.ts) with",
  " * the actual compute path via @prisri/jyotish. Features that need the",
  " * computed kundli import from here.",
  " *",
  " * If you only need to invalidate or inspect cache entries, import from",
  " * `kundli-cache-storage.ts` directly - it has no library dependency,",
  " * so it does not pull @prisri/jyotish into the bundle.",
  " */",
  "import type { BirthData } from '@/domain/astrology/birth-data';",
  "import { prisriJyotish } from '@/infrastructure/astrology/prisri-jyotish.adapter';",
  "import {",
  "  kundliSignature,",
  "  readStored,",
  "  writeStored,",
  "  removeStoredKundli,",
  "  clearStoredKundlis,",
  "  pruneOlder,",
  "  listStoredKundlis,",
  "  getStoredKundliJson,",
  "} from './kundli-cache-storage';",
  "",
  "// Re-export the pure helpers so existing callers of kundli-cache keep",
  "// working. New code should prefer importing from kundli-cache-storage.",
  "export {",
  "  kundliSignature,",
  "  removeStoredKundli,",
  "  clearStoredKundlis,",
  "  pruneOlder,",
  "  listStoredKundlis,",
  "  getStoredKundliJson,",
  "};",
  "",
  "const TTL_MS = 5 * 60 * 1000;",
  "const MAX_AGE_DAYS = 90;",
  "",
  "interface MemoryEntry { kundli: any; at: number; }",
  "const memory = new Map<string, MemoryEntry>();",
  "",
  "export function getCachedKundli(profile: BirthData): any | null {",
  "  const sig = kundliSignature(profile);",
  "",
  "  // 1. Memory",
  "  const hit = memory.get(sig);",
  "  if (hit && Date.now() - hit.at < TTL_MS) return hit.kundli;",
  "",
  "  // 2. localStorage",
  "  const stored = readStored(sig);",
  "  if (stored) {",
  "    memory.set(sig, { kundli: stored, at: Date.now() });",
  "    return stored;",
  "  }",
  "",
  "  // 3. Compute and persist",
  "  try {",
  "    const kundli = prisriJyotish.calculate(profile);",
  "    memory.set(sig, { kundli, at: Date.now() });",
  "    writeStored(profile, sig, kundli);",
  "    return kundli;",
  "  } catch {",
  "    return null;",
  "  }",
  "}",
  "",
  "export function persistKundli(profile: BirthData, kundli: any): void {",
  "  const sig = kundliSignature(profile);",
  "  memory.set(sig, { kundli, at: Date.now() });",
  "  writeStored(profile, sig, kundli);",
  "}",
  "",
  "export function recomputeKundli(profile: BirthData): any | null {",
  "  try {",
  "    const kundli = prisriJyotish.calculate(profile);",
  "    persistKundli(profile, kundli);",
  "    return kundli;",
  "  } catch {",
  "    return null;",
  "  }",
  "}",
  "",
  "export function clearKundliCache(): void {",
  "  memory.clear();",
  "}",
  "",
  "// Boot-time hygiene",
  "try { pruneOlder(MAX_AGE_DAYS); } catch { /* ignore */ }",
  ""
].join('\n');

write('src/lib/kundli-cache.ts', cacheModule);

// ==========================================================================
// 3. Switch birth-profile/store.ts to the storage-only module
// ==========================================================================
console.log('\n=== Step 3: point birth-profile/store at storage-only ===');

{
  const rel = 'src/features/birth-profile/store.ts';
  const src = read(rel);
  if (!src) { log('FAIL', `${rel} not found`); }
  else if (src.includes("from '@/lib/kundli-cache-storage'")) {
    log('SKIP', 'already pointed at storage-only');
  } else if (!src.includes("from '@/lib/kundli-cache'")) {
    log('SKIP', 'no import from kundli-cache to switch');
  } else {
    write(rel, src.replace(
      "import { removeStoredKundli } from '@/lib/kundli-cache';",
      "import { removeStoredKundli } from '@/lib/kundli-cache-storage';"
    ));
  }
}

// ==========================================================================
// 4. Verify no other storage-only consumer regressed
// ==========================================================================
console.log('\n=== Step 4: re-export check ===');
{
  const src = read('src/lib/kundli-cache.ts');
  if (src && src.includes('export {') && src.includes('removeStoredKundli')) {
    log('OK', 'kundli-cache re-exports pure helpers');
  } else {
    log('FAIL', 'kundli-cache re-export missing');
  }
}

console.log('\n' + '='.repeat(50));
console.log(`  Backups: ${BACKUP}`);
console.log('='.repeat(50) + '\n');
console.log('Next:');
console.log('  npm run build');
console.log('  — watch the size of index-*.js; it should shrink dramatically.');
console.log('');
