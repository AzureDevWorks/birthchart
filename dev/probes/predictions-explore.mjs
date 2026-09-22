import {
  getKundli, Observer,
  getCareerPrediction,
  getWealthPrediction,
  getMarriagePrediction,
  getRemedies,
  getChalitAnalysis,
  getKpAnalysis,
  getLalKitabAnalysis,
  getJaiminiKarakas,
  getComprehensiveReport,
} from '@prisri/jyotish';

const kundli = getKundli(
  new Date('2004-02-20T07:15:00+05:30'),
  new Observer(25.872, 82.685, 0)
);

function describeType(v) {
  if (v === null) return 'null';
  if (v === undefined) return 'undefined';
  if (Array.isArray(v)) return `Array(${v.length})`;
  if (v instanceof Date) return `Date(${v.toISOString()})`;
  return typeof v;
}

function dump(label, obj, depth = 0, maxDepth = 5) {
  const pad = '  '.repeat(depth);
  console.log(`${pad}${label} (${describeType(obj)})`);
  if (obj === null || obj === undefined) return;
  if (depth >= maxDepth) {
    console.log(`${pad}  ...`);
    return;
  }
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

const sections = [
  ['1. getCareerPrediction',    () => getCareerPrediction(kundli)],
  ['2. getWealthPrediction',    () => getWealthPrediction(kundli)],
  ['3. getMarriagePrediction',  () => getMarriagePrediction(kundli)],
  ['4. getJaiminiKarakas',      () => getJaiminiKarakas(kundli)],
  ['5. getChalitAnalysis',      () => getChalitAnalysis(kundli)],
  ['6. getKpAnalysis',          () => getKpAnalysis(kundli)],
  ['7. getLalKitabAnalysis',    () => getLalKitabAnalysis(kundli)],
  ['8. getRemedies',            () => getRemedies(kundli)],
];

for (const [label, fn] of sections) {
  console.log('\n══════════════════════════════════════════════════');
  console.log(label);
  console.log('══════════════════════════════════════════════════');
  try {
    const result = fn();
    dump('result', result, 0, 5);
  } catch (e) {
    console.log('ERROR:', e.message);
  }
}

// Comprehensive report
console.log('\n══════════════════════════════════════════════════');
console.log('9. getComprehensiveReport');
console.log('══════════════════════════════════════════════════');
try {
  const report = getComprehensiveReport(kundli);
  console.log('Top-level keys:', Object.keys(report));
  for (const [k, v] of Object.entries(report)) {
    const t = Array.isArray(v) ? `Array(${v.length})` : typeof v;
    console.log(`  ${k}: ${t}`);
  }
  if (report.formattedMarkdown) {
    console.log('\nformattedMarkdown preview (first 500 chars):');
    console.log(report.formattedMarkdown.slice(0, 500));
  }
} catch (e) {
  console.log('ERROR:', e.message);
}

console.log('\n══════════════════════════════════════════════════');
console.log('DONE');
console.log('══════════════════════════════════════════════════');