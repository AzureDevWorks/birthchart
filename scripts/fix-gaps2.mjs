#!/usr/bin/env node
// Patches the final 3 gaps after fix-gaps.mjs.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
const BACKUP = path.join(ROOT, `.fix-gaps2-backup-${stamp}`);

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

let failed = 0;

// ==========================================================================
// GAP 1 (retry) — Anthropic system field
// ==========================================================================
console.log('\nGAP 1 — Anthropic system field');
{
  const rel = 'src/features/ai-settings/providers.ts';
  let content = read(rel);
  if (!content) { log('FAIL', `${rel} missing`); failed++; }
  else if (content.includes('system: system ?? undefined')) {
    log('SKIP', 'already patched');
  } else {
    // Match the openai-compat spread shape that fix-all left in Anthropic's
    // body. The messages line now looks like:
    //   messages: [...(system ? [{ role: 'system' as const, content: system }] : []), { role: 'user' as const, content: prompt }],
    const re = /(max_tokens: 4096,)\n(\s*)(messages: \[\.\.\.\(system[^\n]*)/;
    if (!re.test(content)) {
      log('FAIL', 'body not found — inspect Anthropic block in providers.ts');
      failed++;
    } else {
      content = content.replace(
        re,
        '$1\n$2system: system ?? undefined,\n$2$3'
      );
      write(rel, content);
    }
  }
}

// ==========================================================================
// GAP 3 (retry) — AshtakavargaSection: collapse `}}` back to `}`
// ==========================================================================
console.log('\nGAP 3 — AshtakavargaSection double-brace');
{
  const rel = 'src/features/report/sections/AshtakavargaSection.tsx';
  let content = read(rel);
  if (!content) { log('FAIL', `${rel} missing`); failed++; }
  else if (!content.includes('.`}}')) {
    log('SKIP', 'no double-brace present');
  } else {
    const before = content;
    content = content
      .split('domain.`}}').join('domain.`}')
      .split('work.`}}').join('work.`}');
    if (content === before) {
      log('SKIP', 'no double-brace matched');
    } else {
      write(rel, content);
    }
  }
}

// ==========================================================================
// GAP 5 (retry) — store.test.ts makeReadingKey block
// ==========================================================================
console.log('\nGAP 5 — store.test.ts makeReadingKey');
{
  const rel = 'src/features/ai-reading/__tests__/store.test.ts';
  let content = read(rel);
  if (!content) { log('FAIL', `${rel} missing`); failed++; }
  else if (content.includes("describe('makeReadingKey (deprecated shim)'")) {
    log('SKIP', 'already patched');
  } else {
    // Simple non-greedy match: from `describe('makeReadingKey'` to the next
    // `\n});\n` at column 0. Inner blocks end in `  });` (indented) so they
    // won't be caught.
    const re = /describe\('makeReadingKey'[\s\S]*?\n\}\);\n/;
    if (!re.test(content)) {
      log('FAIL', 'describe block not found');
      failed++;
    } else {
      const replacement = [
        "describe('makeReadingKey (deprecated shim)', () => {",
        "  it('returns the same identity as readingId', () => {",
        "    const p = makeProfile();",
        "    const viaKey = makeReadingKey(p, 'career', '3.0.0', 'analytical', 'English', 2500);",
        "    const viaId = readingId(hashProfile(p), 'career');",
        "    expect(viaKey).toBe(viaId);",
        "  });",
        "",
        "  it('is stable across calls', () => {",
        "    const p = makeProfile();",
        "    expect(makeReadingKey(p, 'career')).toBe(makeReadingKey(p, 'career'));",
        "  });",
        "",
        "  it('differs per category', () => {",
        "    const p = makeProfile();",
        "    expect(makeReadingKey(p, 'career')).not.toBe(makeReadingKey(p, 'marriage'));",
        "  });",
        "});",
        ""
      ].join('\n');

      content = content.replace(re, replacement);

      if (!/\breadingId\b/.test(content.split("from '../store'")[0])) {
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
console.log(`  ${failed === 0 ? 'All gaps patched.' : `${failed} gap(s) failed — inspect manually.`}`);
console.log(`  Backups: ${BACKUP}`);
console.log('='.repeat(50) + '\n');
process.exit(failed > 0 ? 1 : 0);
