#!/usr/bin/env node
// Patches the 5 remaining gaps after fix-all.mjs.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
const BACKUP = path.join(ROOT, `.fix-gaps-backup-${stamp}`);

const log = (lvl, msg) => console.log(`  [${lvl}] ${msg}`);

function read(rel) {
  const fp = path.join(ROOT, rel);
  return fs.existsSync(fp) ? fs.readFileSync(fp, 'utf8') : null;
}
function backup(rel) {
  const fp = path.join(ROOT, rel);
  if (!fs.existsSync(fp)) return;
  const dst = path.join(BACKUP, rel);
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.copyFileSync(fp, dst);
}
function write(rel, content) {
  backup(rel);
  fs.writeFileSync(path.join(ROOT, rel), content, 'utf8');
  log('OK', `wrote ${rel}`);
}

let failed = 0;

// =====================================================================
// GAP 1 — Anthropic: move system out of messages, into top-level field
// =====================================================================
console.log('\nGAP 1 — Anthropic system field');
{
  const rel = 'src/features/ai-settings/providers.ts';
  let content = read(rel);
  if (!content) { log('FAIL', `${rel} missing`); failed++; }
  else if (content.includes('system: system ?? undefined')) {
    log('SKIP', 'already patched');
  } else {
    // Anthropic is the only provider with `max_tokens: 4096,`
    const pattern = /max_tokens: 4096,\s*\n\s*messages: \[\.\.\.\(system[\s\S]*?\],\s*\{ role: 'user' as const, content: prompt \}\],/;
    if (!pattern.test(content)) {
      log('FAIL', 'pattern not found — inspect Anthropic block manually');
      failed++;
    } else {
      content = content.replace(
        pattern,
        "max_tokens: 4096,\n        system: system ?? undefined,\n        messages: [{ role: 'user', content: prompt }],"
      );
      write(rel, content);
    }
  }
}

// =====================================================================
// GAP 2 — prompt.ts: return { system, user }
// =====================================================================
console.log('\nGAP 2 — prompt.ts return shape');
{
  const rel = 'src/features/ai-reading/prompt.ts';
  let content = read(rel);
  if (!content) { log('FAIL', `${rel} missing`); failed++; }
  else if (content.includes('return { system: SYSTEM_PROMPT, user: body }')) {
    log('SKIP', 'already patched');
  } else {
    // Match `return \`${SYSTEM_PROMPT}...\`;\n}` — non-greedy, up to the first
    // closing-backtick-semicolon that ends a statement at line start.
    const re = /return `\$\{SYSTEM_PROMPT\}[\s\S]*?`;\s*\n\}/;
    if (!re.test(content)) {
      log('FAIL', 'return block not found — inspect prompt.ts tail manually');
      failed++;
    } else {
      content = content.replace(re, 'return { system: SYSTEM_PROMPT, user: body };\n}');
      write(rel, content);
    }
  }
}

// =====================================================================
// GAP 3 — AshtakavargaSection: strip backslash before backticks
// =====================================================================
console.log('\nGAP 3 — AshtakavargaSection escape fix');
{
  const rel = 'src/features/report/sections/AshtakavargaSection.tsx';
  let content = read(rel);
  if (!content) { log('FAIL', `${rel} missing`); failed++; }
  else if (!content.includes('\\`House')) {
    log('SKIP', 'no escaped backticks');
  } else {
    // Only the two injected lines have `\`House ... \``. Strip those.
    content = content.replace(/\\`(House[^\\]*?)\\`/g, '`$1`');
    // Also collapse the double `}}` at end of each to a single `}` + backtick + `}}`
    // (already correct in replacement; nothing else to do)
    if (content.includes('\\`House')) {
      log('FAIL', 'some escaped backticks still present');
      failed++;
    } else {
      write(rel, content);
    }
  }
}

// =====================================================================
// GAP 4 — DivisionalChartsSection uses useChartHouses
// =====================================================================
console.log('\nGAP 4 — DivisionalChartsSection hook');
{
  const rel = 'src/features/report/sections/DivisionalChartsSection.tsx';
  let content = read(rel);
  if (!content) { log('FAIL', `${rel} missing`); failed++; }
  else if (content.includes('useChartHouses(kundli, activeVarga)')) {
    log('SKIP', 'already using hook');
  } else {
    // 1. Remove the (possibly orphaned) abbrResolver block.
    content = content.replace(
      /  const abbrResolver = useMemo\([\s\S]*?\n  \);\n\n?/,
      ''
    );

    // 2. Replace the activeHouses useMemo block with the hook call.
    //    Ends with `  }, [activeVarga, kundli, abbrResolver]);` — `},` not `),`.
    const blockRe = /  const activeHouses = useMemo\(\(\) => \{[\s\S]*?\n  \}, \[activeVarga, kundli, abbrResolver\]\);/;
    if (!blockRe.test(content)) {
      log('FAIL', 'activeHouses block not matched — inspect manually');
      failed++;
    } else {
      content = content.replace(
        blockRe,
        '  const activeHouses = useChartHouses(kundli, activeVarga);'
      );
      write(rel, content);
    }
  }
}

// =====================================================================
// GAP 5 — store.test.ts: replace makeReadingKey describe block
// =====================================================================
console.log('\nGAP 5 — store.test.ts makeReadingKey');
{
  const rel = 'src/features/ai-reading/__tests__/store.test.ts';
  let content = read(rel);
  if (!content) { log('FAIL', `${rel} missing`); failed++; }
  else if (content.includes("describe('makeReadingKey (deprecated shim)'")) {
    log('SKIP', 'already patched');
  } else {
    const replacement = `describe('makeReadingKey (deprecated shim)', () => {
  it('returns the same identity as readingId', () => {
    const p = makeProfile();
    const viaKey = makeReadingKey(p, 'career', '3.0.0', 'analytical', 'English', 2500);
    const viaId = readingId(hashProfile(p), 'career');
    expect(viaKey).toBe(viaId);
  });

  it('is stable across calls', () => {
    const p = makeProfile();
    expect(makeReadingKey(p, 'career')).toBe(makeReadingKey(p, 'career'));
  });

  it('differs per category', () => {
    const p = makeProfile();
    expect(makeReadingKey(p, 'career')).not.toBe(makeReadingKey(p, 'marriage'));
  });
});
`;

    // Match either the raw describe block, or a comment-line + describe block.
    const re = /(?:\/\/[^\n]*\n)*describe\('makeReadingKey'[\s\S]*?\n\}\);\n/;
    if (!re.test(content)) {
      log('FAIL', 'describe block not found');
      failed++;
    } else {
      content = content.replace(re, replacement);

      // Ensure readingId is imported
      if (!content.includes('readingId')) {
        content = content.replace(
          "import { hashProfile, makeReadingKey } from '../store';",
          "import { hashProfile, makeReadingKey, readingId } from '../store';"
        );
      }
      write(rel, content);
    }
  }
}

console.log('\n' + '='.repeat(50));
console.log(`  ${failed === 0 ? 'All gaps patched.' : `${failed} gap(s) failed — fix manually.`}`);
console.log(`  Backups: ${BACKUP}`);
console.log('='.repeat(50) + '\n');
process.exit(failed > 0 ? 1 : 0);
