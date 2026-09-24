#!/usr/bin/env node
// Fixes the last remaining gap: store.test.ts makeReadingKey block.
// Handles CRLF/LF transparently and prints diagnostic context on failure.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
const BACKUP = path.join(ROOT, `.fix-gaps3-backup-${stamp}`);

const log = (lvl, msg) => console.log(`  [${lvl}] ${msg}`);

const readRaw = rel => {
  const fp = path.join(ROOT, rel);
  return fs.existsSync(fp) ? fs.readFileSync(fp, 'utf8') : null;
};

const readLF = rel => {
  const raw = readRaw(rel);
  return raw === null ? null : raw.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
};

const detectEOL = raw => {
  if (raw === null) return '\n';
  const crlf = (raw.match(/\r\n/g) || []).length;
  const lfTotal = (raw.match(/\n/g) || []).length;
  const lfOnly = lfTotal - crlf;
  return crlf > lfOnly ? '\r\n' : '\n';
};

const backup = rel => {
  const fp = path.join(ROOT, rel);
  if (!fs.existsSync(fp)) return;
  const dst = path.join(BACKUP, rel);
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.copyFileSync(fp, dst);
};

const writeLF = (rel, contentLF, eol) => {
  backup(rel);
  const out = eol === '\r\n' ? contentLF.replace(/\n/g, '\r\n') : contentLF;
  fs.writeFileSync(path.join(ROOT, rel), out, 'utf8');
  log('OK', `wrote ${rel} (${eol === '\r\n' ? 'CRLF preserved' : 'LF'})`);
};

const rel = 'src/features/ai-reading/__tests__/store.test.ts';
const raw = readRaw(rel);

console.log(`\nTarget: ${rel}`);

if (raw === null) {
  log('FAIL', `${rel} not found`);
  process.exit(1);
}

const eol = detectEOL(raw);
const eolLabel = eol === '\r\n' ? 'CRLF' : 'LF';
console.log(`  Line endings: ${eolLabel}`);

if (raw.includes("describe('makeReadingKey (deprecated shim)'")) {
  log('SKIP', 'already patched');
  process.exit(0);
}

if (!raw.includes("describe('makeReadingKey'")) {
  log('FAIL', "no `describe('makeReadingKey'` found — file may already be different");
  process.exit(1);
}

// Work on normalized content.
const contentLF = readLF(rel);

// Non-greedy from `describe('makeReadingKey'` to the next line that is
// exactly `});` (i.e. `}` at column 0, then `);`).
const re = /describe\('makeReadingKey'[\s\S]*?\n\}\);\n/;

if (!re.test(contentLF)) {
  log('FAIL', 'regex did not match even after LF normalization');
  // Print diagnostic: find the region and show the raw bytes.
  const idx = contentLF.indexOf("describe('makeReadingKey'");
  if (idx < 0) {
    console.log('  -> could not even locate the describe call');
  } else {
    const snippet = contentLF.slice(idx, idx + 400);
    console.log('  ---- context ----');
    console.log(snippet.split('\n').map(l => '  | ' + l).join('\n'));
    console.log('  ---- end ----');
  }
  process.exit(1);
}

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

let next = contentLF.replace(re, replacement);

// Ensure `readingId` is imported from '../store'.
const importLine = "import { hashProfile, makeReadingKey } from '../store';";
if (next.includes(importLine)) {
  next = next.replace(importLine, "import { hashProfile, makeReadingKey, readingId } from '../store';");
} else if (!/\breadingId\b/.test(next.split("from '../store'")[0] || '')) {
  // Fallback: rewrite the import line more loosely.
  next = next.replace(
    /import\s*\{([^}]*)\}\s*from\s*'\.\.\/store';/,
    (m, names) => {
      const parts = names.split(',').map(s => s.trim()).filter(Boolean);
      if (!parts.includes('readingId')) parts.push('readingId');
      return `import { ${parts.join(', ')} } from '../store';`;
    }
  );
}

writeLF(rel, next, eol);

console.log('\n' + '='.repeat(50));
console.log('  Done.');
console.log(`  Backups: ${BACKUP}`);
console.log('='.repeat(50) + '\n');
