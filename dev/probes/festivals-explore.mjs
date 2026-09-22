import * as j from '@prisri/jyotish';

// ─── 1. Which festival/calendar functions exist? ─────────────
console.log('Festival/calendar-related exports:');
const candidates = Object.keys(j).filter((k) =>
  /festival|ekadashi|vrat|parva|masa|tithi|calendar/i.test(k)
);
for (const n of candidates) {
  console.log(`  ${n.padEnd(35)} ${typeof j[n]}`);
}

// ─── 2. Inspect the function's source signature ──────────────
if (typeof j.getFestivals === 'function') {
  console.log('\n--- getFestivals.toString() first 400 chars ---');
  console.log(String(j.getFestivals).slice(0, 400));
}

// ─── 3. Build an Observer ────────────────────────────────────
const observer = new j.Observer(25.872, 82.685, 0);  // from the sample code
console.log('\nObserver created:', observer.constructor.name);

// ─── 4. Try several call signatures for getFestivals ─────────
const date = new Date('2026-11-08');

const attempts = [
  ['getFestivals(date)',                    () => j.getFestivals(date)],
  ['getFestivals(date, observer)',          () => j.getFestivals(date, observer)],
  ['getFestivals(observer, date)',          () => j.getFestivals(observer, date)],
  ['getFestivals({ date, observer })',      () => j.getFestivals({ date, observer })],
  ['getFestivals(date, { observer })',      () => j.getFestivals(date, { observer })],
  ['getFestivals(date, observer, true)',    () => j.getFestivals(date, observer, true)],
];

function describeType(v) {
  if (v === null) return 'null';
  if (v === undefined) return 'undefined';
  if (Array.isArray(v)) return `Array(${v.length})`;
  if (v instanceof Date) return `Date(${v.toISOString()})`;
  return typeof v;
}

function dump(label, obj, depth = 0, maxDepth = 4) {
  const pad = '  '.repeat(depth);
  console.log(`${pad}${label} (${describeType(obj)})`);
  if (obj === null || obj === undefined) return;
  if (depth >= maxDepth) { console.log(`${pad}  ...`); return; }
  if (obj instanceof Date) return;
  if (Array.isArray(obj)) {
    if (obj.length === 0) return;
    console.log(`${pad}  [0]:`);
    dump('item', obj[0], depth + 2, maxDepth);
    return;
  }
  if (typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj)) {
      const t = describeType(v);
      if (t === 'object' || t.startsWith('Array')) {
        dump(k, v, depth + 1, maxDepth);
      } else {
        const preview = typeof v === 'string' && v.length > 80
          ? v.slice(0, 80) + '...'
          : JSON.stringify(v);
        console.log(`${pad}  ${k}: ${t} = ${preview}`);
      }
    }
  }
}

for (const [label, fn] of attempts) {
  console.log('\n══════════════════════════════════════════════════');
  console.log(`Trying: ${label}`);
  console.log('══════════════════════════════════════════════════');
  try {
    const result = fn();
    if (Array.isArray(result)) {
      console.log(`SUCCESS — Array(${result.length})`);
      if (result.length > 0) dump('firstFestival', result[0], 0, 3);
    } else {
      console.log('SUCCESS (non-array):', describeType(result));
      dump('result', result, 0, 3);
    }
  } catch (e) {
    console.log(`FAILED: ${e.message}`);
  }
}

// ─── 5. getEkadashiName — sweep the masas ────────────────────
if (typeof j.getEkadashiName === 'function') {
  console.log('\n══════════════════════════════════════════════════');
  console.log('getEkadashiName(tithi, masaIndex) — try both 0-based and 1-based masa');
  console.log('══════════════════════════════════════════════════');
  for (let masa = 0; masa <= 12; masa++) {
    try {
      const shukla = j.getEkadashiName(11, masa);
      const krishna = j.getEkadashiName(26, masa);
      console.log(`  masa ${String(masa).padStart(2)}: Shukla="${shukla}" Krishna="${krishna}"`);
    } catch (e) {
      console.log(`  masa ${String(masa).padStart(2)}: ERROR ${e.message}`);
    }
  }
}

// ─── 6. Full export list ─────────────────────────────────────
console.log('\n══════════════════════════════════════════════════');
console.log('All @prisri/jyotish exports:');
console.log('══════════════════════════════════════════════════');
const all = Object.keys(j).sort();
for (const n of all) {
  console.log(`  ${n.padEnd(45)} ${typeof j[n]}`);
}

console.log('\nDONE');