import { getKundli, matchKundli, checkMangalDosha, Observer } from '@prisri/jyotish';

const boyKundli = getKundli(
  new Date('1994-06-12T06:30:00+05:30'),
  new Observer(28.6139, 77.2090, 0)
);
const girlKundli = getKundli(
  new Date('1996-08-25T11:15:00+05:30'),
  new Observer(26.8467, 80.9462, 0)
);

function describeType(v) {
  if (v === null) return 'null';
  if (v === undefined) return 'undefined';
  if (Array.isArray(v)) return 'Array(' + v.length + ')';
  if (v instanceof Date) return 'Date(' + v.toISOString() + ')';
  return typeof v;
}

function dump(label, obj, depth = 0, maxDepth = 5) {
  const pad = '  '.repeat(depth);
  console.log(pad + label + ' (' + describeType(obj) + ')');
  if (obj === null || obj === undefined) return;
  if (depth >= maxDepth) { console.log(pad + '  ...'); return; }
  if (obj instanceof Date) return;
  if (Array.isArray(obj)) {
    if (obj.length === 0) return;
    console.log(pad + '  [0]:');
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
        console.log(pad + '  ' + k + ': ' + t + ' = ' + preview);
      }
    }
  }
}

console.log('\n══════════════════════════════════════════');
console.log('matchKundli(boy, girl)');
console.log('══════════════════════════════════════════');
const match = matchKundli(boyKundli, girlKundli);
dump('match', match, 0, 5);

console.log('\n══════════════════════════════════════════');
console.log('checkMangalDosha(boy)');
console.log('══════════════════════════════════════════');
const boyDosha = checkMangalDosha(boyKundli);
dump('boyDosha', boyDosha, 0, 5);

console.log('\n══════════════════════════════════════════');
console.log('checkMangalDosha(girl)');
console.log('══════════════════════════════════════════');
const girlDosha = checkMangalDosha(girlKundli);
dump('girlDosha', girlDosha, 0, 5);

console.log('\n══════════════════════════════════════════');
console.log('matchKundli with same-person (sanity check)');
console.log('══════════════════════════════════════════');
const selfMatch = matchKundli(boyKundli, boyKundli);
console.log('Total score with self:', selfMatch.totalScore);
console.log('Verdict:', selfMatch.verdict);