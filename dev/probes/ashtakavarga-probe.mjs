import { getKundli, getAshtakavarga, Observer } from '@prisri/jyotish';

const kundli = getKundli(
  new Date('1995-05-15T14:30:00+05:45'),
  new Observer(27.7172, 85.324, 0)
);

const av = kundli.ashtakavarga || getAshtakavarga(kundli);

console.log('=== SAV shape ===');
console.log('SAV keys:', Object.keys(av.sav));
console.log('houseStrengths[0]:', JSON.stringify(av.sav.houseStrengths[0]));
console.log('totalBindus:', av.sav.totalBindus);
console.log('strongestHouse:', av.sav.strongestHouse);
console.log('weakestHouse:', av.sav.weakestHouse);
console.log('averageBindus:', av.sav.averageBindus);

console.log('\n=== BAV shape ===');
console.log('BAV keys:', Object.keys(av.bav));
const jup = av.bav.Jupiter;
console.log('Jupiter BAV keys:', Object.keys(jup));
console.log('Jupiter totalBindus:', jup.totalBindus);
console.log('Jupiter byRashi:', JSON.stringify(jup.byRashi));
console.log('Jupiter byHouse:', JSON.stringify(jup.byHouse));

console.log('\n=== All planet BAV totals ===');
for (const p of ['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn']) {
  const b = av.bav[p];
  console.log('  ' + p + ': total=' + b.totalBindus);
  console.log('     byHouse=' + JSON.stringify(b.byHouse));
}

console.log('\n=== Full SAV houseStrengths ===');
av.sav.houseStrengths.forEach((hs) => {
  console.log('  H' + hs.house + ': ' + hs.bindus + ' bindus (' + hs.strength + ', ' + hs.category + ')');
});