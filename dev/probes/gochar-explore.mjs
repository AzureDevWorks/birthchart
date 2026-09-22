import {
  getKundli,
  Observer,
  getGocharAnalysis,
  getPlanetGochar,
  checkSadeSati,
  checkDhaiya,
  getChandrashtama,
  getTarabalam,
  getDishaShoola,
  isDirectionSafe,
} from '@prisri/jyotish';

// ─── Sample birth data ──────────────────────────────────────
const birthDate = new Date('1995-05-15T14:30:00+05:45');  // 1995-05-15 14:30 Asia/Kathmandu
const observer = new Observer(27.7172, 85.324, 0);        // Kathmandu

const kundli = getKundli(birthDate, observer, {
  ayanamsa: 'lahiri',
  houseSystem: 'whole_sign',
  includeChalit: true,
  includeKp: true,
  includeSpecialLagnas: true,
  includeArudhas: true,
  includeReferenceCharts: true,
});

// ─── Deep dump helper ──────────────────────────────────────
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
  if (depth >= maxDepth) {
    console.log(`${pad}  ...`);
    return;
  }
  if (obj instanceof Date) return;
  if (Array.isArray(obj)) {
    if (obj.length === 0) return;
    // Show first item's shape
    console.log(`${pad}  [0]:`);
    dump(`${pad}  `, obj[0], depth + 2, maxDepth);
    return;
  }
  if (typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj)) {
      const t = describeType(v);
      if (t === 'object' || t.startsWith('Array')) {
        dump(k, v, depth + 1, maxDepth);
      } else {
        const preview = typeof v === 'string' && v.length > 60
          ? v.slice(0, 60) + '...'
          : JSON.stringify(v);
        console.log(`${pad}  ${k}: ${t} = ${preview}`);
      }
    }
  }
}

// ─── 1. Full Gochar analysis ────────────────────────────────
console.log('\n══════════════════════════════════════════════════════');
console.log('1. getGocharAnalysis(kundli, new Date())');
console.log('══════════════════════════════════════════════════════');
const gochar = getGocharAnalysis(kundli, new Date());
dump('gochar', gochar, 0, 5);

// ─── 2. Single planet transit ───────────────────────────────
console.log('\n══════════════════════════════════════════════════════');
console.log('2. getPlanetGochar("Saturn", kundli)');
console.log('══════════════════════════════════════════════════════');
const saturn = getPlanetGochar('Saturn', kundli);
dump('saturnTransit', saturn, 0, 4);

console.log('\n══════════════════════════════════════════════════════');
console.log('2b. getPlanetGochar("Jupiter", kundli)');
console.log('══════════════════════════════════════════════════════');
const jupiter = getPlanetGochar('Jupiter', kundli);
dump('jupiterTransit', jupiter, 0, 4);

// ─── 3. Sade Sati ───────────────────────────────────────────
console.log('\n══════════════════════════════════════════════════════');
console.log('3. checkSadeSati(moonLon, saturnLon)');
console.log('══════════════════════════════════════════════════════');
// Moon at 120.5° (Leo), Saturn at 330.2° (Pisces) — Saturn 5 signs from Moon
const ss1 = checkSadeSati(120.5, 330.2);
dump('sadeSatiCase1', ss1, 0, 3);
// Saturn in the same sign as Moon
const ss2 = checkSadeSati(120.5, 125.0);
dump('sadeSatiCase2', ss2, 0, 3);

// ─── 4. Dhaiya ──────────────────────────────────────────────
console.log('\n══════════════════════════════════════════════════════');
console.log('4. checkDhaiya(moonLon, saturnLon)');
console.log('══════════════════════════════════════════════════════');
const d1 = checkDhaiya(120.5, 210.5);   // Saturn in 4th from Moon
dump('dhaiya4th', d1, 0, 3);
const d2 = checkDhaiya(120.5, 330.5);   // Saturn in 8th from Moon
dump('dhaiya8th', d2, 0, 3);

// ─── 5. Chandrashtama ───────────────────────────────────────
console.log('\n══════════════════════════════════════════════════════');
console.log('5. getChandrashtama(natalMoonRashi, currentMoonRashi)');
console.log('══════════════════════════════════════════════════════');
const c1 = getChandrashtama(0, 7);   // Aries native, Moon in Scorpio
dump('chandrashtamaActive', c1, 0, 3);
const c2 = getChandrashtama(0, 0);   // Aries native, Moon in Aries
dump('chandrashtamaInactive', c2, 0, 3);

// ─── 6. Tarabalam ───────────────────────────────────────────
console.log('\n══════════════════════════════════════════════════════');
console.log('6. getTarabalam(birthNak, currentNak)');
console.log('══════════════════════════════════════════════════════');
const t1 = getTarabalam(0, 1);
dump('tarabalam1', t1, 0, 3);
const t2 = getTarabalam(0, 4);
dump('tarabalam2', t2, 0, 3);

// ─── 7. Disha Shoola ────────────────────────────────────────
console.log('\n══════════════════════════════════════════════════════');
console.log('7. getDishaShoola(varaNumber) — 0=Sun .. 6=Sat');
console.log('══════════════════════════════════════════════════════');
for (let i = 0; i <= 6; i++) {
  const s = getDishaShoola(i);
  console.log(`  vara ${i}:`, JSON.stringify(s));
}

// ─── 8. isDirectionSafe ─────────────────────────────────────
console.log('\n══════════════════════════════════════════════════════');
console.log('8. isDirectionSafe(direction, varaNumber)');
console.log('══════════════════════════════════════════════════════');
console.log('  North, Sunday  :', isDirectionSafe('North', 0));
console.log('  East,  Sunday  :', isDirectionSafe('East', 0));
console.log('  South, Sunday  :', isDirectionSafe('South', 0));

// ─── 9. The Kundli's Moon/Saturn for cross-check ────────────
console.log('\n══════════════════════════════════════════════════════');
console.log('9. Kundli natal Moon & Saturn (for reference)');
console.log('══════════════════════════════════════════════════════');
console.log('  Moon:', JSON.stringify(kundli.planets?.Moon, null, 2));
console.log('  Saturn:', JSON.stringify(kundli.planets?.Saturn, null, 2));

console.log('\n══════════════════════════════════════════════════════');
console.log('DONE');
console.log('══════════════════════════════════════════════════════');