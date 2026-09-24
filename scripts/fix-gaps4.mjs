#!/usr/bin/env node
// Final patch: replace store.test.ts makeReadingKey block via brace counting.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
const BACKUP = path.join(ROOT, `.fix-gaps4-backup-${stamp}`);

const log = (lvl, msg) => console.log(`  [${lvl}] ${msg}`);
const rel = 'src/features/ai-reading/__tests__/store.test.ts';
const fp = path.join(ROOT, rel);

if (!fs.existsSync(fp)) { log('FAIL', `${rel} not found`); process.exit(1); }

const raw = fs.readFileSync(fp, 'utf8');
const eol = raw.includes('\r\n') && (raw.match(/\r\n/g) || []).length > (raw.match(/(?<!\r)\n/g) || []).length ? '\r\n' : '\n';
const text = raw.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

console.log(`\nTarget: ${rel}`);
console.log(`  Line endings: ${eol === '\r\n' ? 'CRLF' : 'LF'}`);

if (text.includes("describe('makeReadingKey (deprecated shim)'")) {
  log('SKIP', 'already patched');
  process.exit(0);
}

const anchor = "describe('makeReadingKey'";
const start = text.indexOf(anchor);
if (start < 0) { log('FAIL', "anchor `describe('makeReadingKey'` not found"); process.exit(1); }

// Walk forward from `start`, tracking brace depth. Skip string literals
// (single, double, backtick), line comments, and block comments.
let i = start;
let depth = 0;
let opened = false;
let end = -1;
let mode = 'code';

while (i < text.length) {
  const c = text[i];
  const c1 = text[i + 1];

  if (mode === 'line-comment') {
    if (c === '\n') mode = 'code';
    i++; continue;
  }
  if (mode === 'block-comment') {
    if (c === '*' && c1 === '/') { mode = 'code'; i += 2; continue; }
    i++; continue;
  }
  if (mode === 'sq') {
    if (c === '\\') { i += 2; continue; }
    if (c === "'") { mode = 'code'; i++; continue; }
    i++; continue;
  }
  if (mode === 'dq') {
    if (c === '\\') { i += 2; continue; }
    if (c === '"') { mode = 'code'; i++; continue; }
    i++; continue;
  }
  if (mode === 'bt') {
    if (c === '\\') { i += 2; continue; }
    if (c === '`') { mode = 'code'; i++; continue; }
    i++; continue;
  }

  // mode === 'code'
  if (c === '/' && c1 === '/') { mode = 'line-comment'; i += 2; continue; }
  if (c === '/' && c1 === '*') { mode = 'block-comment'; i += 2; continue; }
  if (c === "'") { mode = 'sq'; i++; continue; }
  if (c === '"') { mode = 'dq'; i++; continue; }
  if (c === '`') { mode = 'bt'; i++; continue; }

  if (c === '{') { depth++; opened = true; i++; continue; }
  if (c === '}') {
    depth--;
    if (opened && depth === 0) {
      // Extend through the rest of the line.
      let j = i + 1;
      while (j < text.length && text[j] !== '\n') j++;
      end = (j < text.length) ? j + 1 : j;
      break;
    }
    i++; continue;
  }

  i++;
}

if (end < 0) {
  log('FAIL', 'could not find closing brace of describe block');
  process.exit(1);
}

const blockLen = end - start;
const startLine = text.slice(0, start).split('\n').length;
const endLine = text.slice(0, end).split('\n').length;
console.log(`  Block found: ${blockLen} chars (lines ${startLine}-${endLine})`);

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

let next = text.slice(0, start) + replacement + text.slice(end);

// Ensure readingId is imported from '../store'
if (!/\breadingId\b/.test(next.split("from '../store'")[0] || '')) {
  const importRe = /import\s*\{([^}]*)\}\s*from\s*'\.\.\/store';/;
  if (importRe.test(next)) {
    next = next.replace(importRe, (m, names) => {
      const parts = names.split(',').map(s => s.trim()).filter(Boolean);
      if (!parts.includes('readingId')) parts.push('readingId');
      return `import { ${parts.join(', ')} } from '../store';`;
    });
    console.log("  Import updated to include readingId");
  } else {
    console.log("  WARNING: could not find the '../store' import - check manually");
  }
}

// Backup + write (restore original EOL)
fs.mkdirSync(path.dirname(path.join(BACKUP, rel)), { recursive: true });
fs.copyFileSync(fp, path.join(BACKUP, rel));

const out = eol === '\r\n' ? next.replace(/\n/g, '\r\n') : next;
fs.writeFileSync(fp, out, 'utf8');

log('OK', `wrote ${rel}`);
console.log(`\n  Backups: ${BACKUP}\n`);
