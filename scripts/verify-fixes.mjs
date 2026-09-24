#!/usr/bin/env node
// Read-only verification of the 16 fixes. Exit 1 on any failure.
// Usage: node scripts/verify-fixes.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

let pass = 0, fail = 0, warn = 0;

const c = {
  pass: s => `\x1b[32m${s}\x1b[0m`,
  fail: s => `\x1b[31m${s}\x1b[0m`,
  warn: s => `\x1b[33m${s}\x1b[0m`,
  head: s => `\x1b[36m${s}\x1b[0m`,
};

function read(rel) {
  const fp = path.join(ROOT, rel);
  if (!fs.existsSync(fp)) return null;
  return fs.readFileSync(fp, 'utf8');
}

function has(label, file, pattern) {
  const c1 = read(file);
  if (c1 === null) { console.log(`  ${c.fail('[MISSING FILE]')} ${file}`); fail++; return; }
  if (c1.includes(pattern)) { console.log(`  ${c.pass('[PASS]')} ${label}`); pass++; }
  else { console.log(`  ${c.fail('[FAIL]')} ${label}`); fail++; }
}

function hasNot(label, file, pattern) {
  const c1 = read(file);
  if (c1 === null) { console.log(`  ${c.fail('[MISSING FILE]')} ${file}`); fail++; return; }
  if (!c1.includes(pattern)) { console.log(`  ${c.pass('[PASS]')} ${label}`); pass++; }
  else { console.log(`  ${c.fail('[FAIL]')} ${label}`); fail++; }
}

function hasRegex(label, file, regex) {
  const c1 = read(file);
  if (c1 === null) { console.log(`  ${c.fail('[MISSING FILE]')} ${file}`); fail++; return; }
  if (regex.test(c1)) { console.log(`  ${c.pass('[PASS]')} ${label}`); pass++; }
  else { console.log(`  ${c.fail('[FAIL]')} ${label}`); fail++; }
}

function fileExists(label, file) {
  if (fs.existsSync(path.join(ROOT, file))) { console.log(`  ${c.pass('[PASS]')} ${label}`); pass++; }
  else { console.log(`  ${c.fail('[FAIL]')} ${label} — missing`); fail++; }
}
function fileAbsent(label, file) {
  if (!fs.existsSync(path.join(ROOT, file))) { console.log(`  ${c.pass('[PASS]')} ${label}`); pass++; }
  else { console.log(`  ${c.fail('[FAIL]')} ${label} — still present`); fail++; }
}

console.log(`\n${c.head('Verifying fixes at: ' + ROOT)}\n`);

console.log(c.head('FIX 1 — Public backup leak'));
{
  const dir = path.join(ROOT, 'public/readings');
  const leaks = fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => /^kundaliyatra-backup-.*\.json$/.test(f)) : [];
  if (leaks.length === 0) { console.log(`  ${c.pass('[PASS]')} no leaked backup`); pass++; }
  else { console.log(`  ${c.fail('[FAIL]')} leaked backup still in public/readings/`); fail++; }
  has('gitignore has backups/', '.gitignore', 'backups/');
}

console.log('\n' + c.head('FIX 2 — Lazy routes'));
has('uses lazy()', 'src/App.tsx', 'lazy(() =>');
has('uses Suspense', 'src/App.tsx', 'Suspense');
hasNot('no eager Dashboard import', 'src/App.tsx', "import { DashboardView } from");

console.log('\n' + c.head('FIX 3 — Session-only API keys'));
has('partialize present', 'src/features/ai-settings/store.ts', 'partialize');
has('sessionStorage used', 'src/features/ai-settings/store.ts', 'sessionStorage');

console.log('\n' + c.head('FIX 4 — Kundli cache routing'));
for (const f of [
  'src/features/overview/OverviewView.tsx',
  'src/features/ai-reading/ReadingArticleView.tsx',
  'src/features/gochar/GocharView.tsx',
  'src/features/predictions/PredictionsView.tsx',
  'src/infrastructure/astrology/matching.adapter.ts',
]) has(`${f} uses getCachedKundli`, f, 'getCachedKundli');
has('birth store invalidates', 'src/features/birth-profile/store.ts', 'removeStoredKundli');

console.log('\n' + c.head('FIX 5 — System/User split'));
has('GenerateOptions.system', 'src/features/ai-settings/providers.ts', 'system?: string');
has('GenerateOptions.signal', 'src/features/ai-settings/providers.ts', 'signal?: AbortSignal');
has('Anthropic system field', 'src/features/ai-settings/providers.ts', 'system: system ?? undefined');
has('Gemini systemInstruction', 'src/features/ai-settings/providers.ts', 'systemInstruction');
has('prompt.ts ComposedPrompt', 'src/features/ai-reading/prompt.ts', 'ComposedPrompt');
has('prompt.ts return shape', 'src/features/ai-reading/prompt.ts', 'return { system: SYSTEM_PROMPT, user: body }');

console.log('\n' + c.head('FIX 6 — i18n language detection'));
hasNot('no forced lng', 'src/i18n/index.ts', "lng: 'en'");

console.log('\n' + c.head('FIX 7 — Hero palette'));
has('Hero uses CSS vars', 'src/features/report/components/Hero.tsx', 'hsl(var(--manuscript-gold))');

console.log('\n' + c.head('FIX 8 — Ashtakavarga narrative'));
hasNot('no hardcoded 1/6/10', 'src/features/report/sections/AshtakavargaSection.tsx', 'The first, sixth, and tenth');
hasNot('no hardcoded 12th', 'src/features/report/sections/AshtakavargaSection.tsx', 'The twelfth house stands alone');

console.log('\n' + c.head('FIX 10 — SnapshotStrip'));
hasRegex('degree escapes present', 'src/features/report/components/SnapshotStrip.tsx', /\\u00B0|\\u00b0/);

console.log('\n' + c.head('FIX 11 — Clipboard safety'));
{
  const c1 = read('src/features/ai-reading/ReadingArticleView.tsx');
  if (c1 && /try\s*\{[\s\S]{0,300}navigator\.clipboard/.test(c1)) {
    console.log(`  ${c.pass('[PASS]')} clipboard wrapped in try/catch`); pass++;
  } else {
    console.log(`  ${c.warn('[WARN]')} clipboard try/catch not detected`); warn++;
  }
}

console.log('\n' + c.head('FIX 12 — Daily Rashi abort'));
has('AbortController used', 'src/features/dashboard/hooks/useDailyRashi.ts', 'AbortController');
has('signal wired', 'src/features/dashboard/hooks/useDailyRashi.ts', 'signal: ctrl.signal');
hasNot('old Promise.race removed', 'src/features/dashboard/hooks/useDailyRashi.ts', '_legacyRace');

console.log('\n' + c.head('FIX 13 — useChartHouses'));
fileExists('useChartHouses.ts exists', 'src/features/chart/lib/useChartHouses.ts');
has('uses WeakMap', 'src/features/chart/lib/useChartHouses.ts', 'WeakMap');
has('DivisionalChartsSection uses hook', 'src/features/report/sections/DivisionalChartsSection.tsx', 'useChartHouses(kundli, activeVarga)');

console.log('\n' + c.head('FIX 14 — useLibraryForProfile memo'));
has('useMemo imported', 'src/features/ai-reading/store.ts', "import { useMemo } from 'react'");
has('useMemo used', 'src/features/ai-reading/store.ts', 'return useMemo(');

console.log('\n' + c.head('FIX 15 — Cleanup'));
fileAbsent('tailwind.config.js.bak', 'tailwind.config.js.bak');
fileAbsent('.fix-backup', '.fix-backup');
hasNot('no Google Fonts CDN', 'index.html', 'fonts.googleapis.com/css2');
has('index.html preloads', 'index.html', 'rel="preload"');
{
  const pkg = read('package.json');
  if (pkg && !pkg.includes('@expo-google-fonts')) { console.log(`  ${c.pass('[PASS]')} no expo-google-fonts`); pass++; }
  else { console.log(`  ${c.fail('[FAIL]')} expo-google-fonts still in package.json`); fail++; }
  if (pkg && !pkg.includes('"d3-shape"')) { console.log(`  ${c.pass('[PASS]')} no d3-shape`); pass++; }
  else { console.log(`  ${c.fail('[FAIL]')} d3-shape still in package.json`); fail++; }
}

console.log('\n' + c.head('FIX 16 — Port KundliRecord'));
has('port.ts exports KundliRecord', 'src/domain/astrology/port.ts', 'export type KundliRecord');
hasNot('OverviewView no longer imports library Kundli', 'src/features/overview/OverviewView.tsx', "import type { Kundli } from '@prisri/jyotish'");
has('OverviewView uses KundliRecord', 'src/features/overview/OverviewView.tsx', 'KundliRecord');

console.log('\n' + '='.repeat(50));
if (fail === 0) {
  console.log(c.pass(`  ALL CHECKS PASSED  (${pass} pass, ${warn} warn)`));
  process.exit(0);
} else {
  console.log(c.fail(`  FAILURES: ${fail}  (pass=${pass} warn=${warn})`));
  process.exit(1);
}
