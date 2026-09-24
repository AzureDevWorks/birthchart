#!/usr/bin/env node
// Fixes the 8 remaining TS errors from the fix-all pass.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
const BACKUP = path.join(ROOT, `.fix-gaps5-backup-${stamp}`);

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
  fs.writeFileSync(path.join(ROOT, rel), content, 'utf8');
  log('OK', `wrote ${rel}`);
};

let failCount = 0;

// ==========================================================================
// Fix 1 — ReadingArticleView.tsx:887 — render composedPrompt as a string
// ==========================================================================
console.log('\n=== Fix 1: ReadingArticleView prompt preview ===');
{
  const rel = 'src/features/ai-reading/ReadingArticleView.tsx';
  const src = read(rel);
  if (!src) { log('FAIL', `${rel} not found`); failCount++; }
  else {
    // Match `{composedPrompt ??` ... `'Prompt not ready ...'}` — em-dash safe.
    const re = /\{composedPrompt\s*\?\?\s*\n\s*'Prompt not ready[^']*'\s*\}/;
    if (!re.test(src)) {
      log('SKIP', 'pattern not found (may already be patched)');
    } else {
      const replacement = [
        "{composedPrompt",
        "                ? `### SYSTEM\\n\\n${composedPrompt.system}\\n\\n### USER\\n\\n${composedPrompt.user}`",
        "                : 'Prompt not ready \\u2014 the chart must be computed before the prompt can be shown.'}"
      ].join('\n');
      write(rel, src.replace(re, replacement));
    }
  }
}

// ==========================================================================
// Fix 2 — ai-settings/store.ts:124 — annotate migrate's persisted param
// ==========================================================================
console.log('\n=== Fix 2: ai-settings/store.ts migrate signature ===');
{
  const rel = 'src/features/ai-settings/store.ts';
  const src = read(rel);
  if (!src) { log('FAIL', `${rel} not found`); failCount++; }
  else if (/migrate:\s*\(persisted:\s*any/.test(src)) {
    log('SKIP', 'already annotated');
  } else if (!src.includes('migrate: (persisted, fromVersion) =>')) {
    log('SKIP', 'migrate signature not matching — inspect manually');
  } else {
    write(rel, src.split('migrate: (persisted, fromVersion) =>')
      .join('migrate: (persisted: any, fromVersion: number) =>'));
  }
}

// ==========================================================================
// Fix 3 — useDailyRashi.ts:146 — import FallbackResult
// ==========================================================================
console.log('\n=== Fix 3: useDailyRashi FallbackResult import ===');
{
  const rel = 'src/features/dashboard/hooks/useDailyRashi.ts';
  const src = read(rel);
  if (!src) { log('FAIL', `${rel} not found`); failCount++; }
  else if (src.includes('type FallbackResult')) {
    log('SKIP', 'already imported');
  } else if (!src.includes("import { generateWithFallback } from '@/features/ai-settings/providers';")) {
    log('SKIP', 'unexpected import shape — inspect manually');
  } else {
    write(rel, src.replace(
      "import { generateWithFallback } from '@/features/ai-settings/providers';",
      "import { generateWithFallback, type FallbackResult } from '@/features/ai-settings/providers';"
    ));
  }
}

// ==========================================================================
// Fix 4 — OverviewView.tsx:5 — remove unused prisriJyotish import
// ==========================================================================
console.log('\n=== Fix 4: OverviewView unused import ===');
{
  const rel = 'src/features/overview/OverviewView.tsx';
  const src = read(rel);
  if (!src) { log('FAIL', `${rel} not found`); failCount++; }
  else if (!/import\s*\{\s*\n\s*prisriJyotish,\s*\n\s*BirthDataError,?\s*\n\s*\}\s*from\s*'@\/infrastructure\/astrology\/prisri-jyotish\.adapter';/.test(src)) {
    if (src.includes("import { BirthDataError } from '@/infrastructure/astrology/prisri-jyotish.adapter';")) {
      log('SKIP', 'already normalized');
    } else {
      log('SKIP', 'import shape not matched — inspect manually');
    }
  } else {
    write(rel, src.replace(
      /import\s*\{\s*\n\s*prisriJyotish,\s*\n\s*BirthDataError,?\s*\n\s*\}\s*from\s*'@\/infrastructure\/astrology\/prisri-jyotish\.adapter';/,
      "import { BirthDataError } from '@/infrastructure/astrology/prisri-jyotish.adapter';"
    ));
  }
}

// ==========================================================================
// Fix 5/6/7/8 — AshtakavargaSection.tsx
//   - houseStrengths -> sav.houseStrengths
//   - ROMAN -> roman
// ==========================================================================
console.log('\n=== Fix 5-8: AshtakavargaSection ===');
{
  const rel = 'src/features/report/sections/AshtakavargaSection.tsx';
  const src = read(rel);
  if (!src) { log('FAIL', `${rel} not found`); failCount++; }
  else {
    let next = src;
    let changed = false;

    // 5/6: unqualified houseStrengths in the two new lines
    if (next.includes('const strongestBindus = houseStrengths.find(')) {
      next = next.replace(
        'const strongestBindus = houseStrengths.find(',
        'const strongestBindus = sav.houseStrengths.find('
      );
      changed = true;
    }
    if (next.includes('const weakestBindus = houseStrengths.find(')) {
      next = next.replace(
        'const weakestBindus = houseStrengths.find(',
        'const weakestBindus = sav.houseStrengths.find('
      );
      changed = true;
    }

    // 7/8: ROMAN -> roman inside the two new template-literal lines.
    // Only touch identifiers we wrote, not any pre-existing `ROMAN` usage.
    if (next.includes('${ROMAN[strongest - 1]}')) {
      next = next.replace(/\$\{ROMAN\[strongest - 1\]\}/g, '${roman[strongest - 1]}');
      changed = true;
    }
    if (next.includes('${ROMAN[weakest - 1]}')) {
      next = next.replace(/\$\{ROMAN\[weakest - 1\]\}/g, '${roman[weakest - 1]}');
      changed = true;
    }
    if (next.includes('${HOUSE_NAMES[strongest - 1]}') && next.includes('${HOUSE_NAMES[weakest - 1]}')) {
      // HOUSE_NAMES already matches; nothing to do
    }

    if (changed) {
      write(rel, next);
    } else {
      log('SKIP', 'no matching patterns — check manually');
    }
  }
}

console.log('\n' + '='.repeat(50));
console.log(failCount === 0 ? '  All mechanical fixes applied.' : `  ${failCount} file(s) failed.`);
console.log(`  Backups: ${BACKUP}`);
console.log('='.repeat(50) + '\n');
process.exit(failCount > 0 ? 1 : 0);
