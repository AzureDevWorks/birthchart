/**
 * Utility functions for traditional Nepali patrika formatting.
 */

const DEVANAGARI_DIGITS = [
  '\u0966','\u0967','\u0968','\u0969','\u096A',
  '\u096B','\u096C','\u096D','\u096E','\u096F',
];

/** Convert any number or numeric string to Devanagari numerals. */
export function toDevanagari(input: number | string): string {
  return String(input).replace(/\d/g, (d) => DEVANAGARI_DIGITS[Number(d)]);
}

/** Convert only digits in a mixed string, preserving Latin letters, symbols. */
export function devanagariDigits(input: string): string {
  return input.replace(/\d/g, (d) => DEVANAGARI_DIGITS[Number(d)]);
}

/** Format a number with Western thousand separators, then convert. */
export function devanagariNumber(n: number): string {
  return toDevanagari(n.toLocaleString('en-IN'));
}

/** Time "08:45" -> Devanagari digits. */
export function devanagariTime(time24: string): string {
  return devanagariDigits(time24);
}

/**
 * Convert a Gregorian date to a formal Nepali date string.
 * Example: 1983-03-26 -> "२६ मार्च १९८३"
 */
export function devanagariDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  const monthNames = [
    '\u091C\u0928\u0935\u0930\u0940',
    '\u092B\u0947\u092C\u094D\u0930\u0941\u0905\u0930\u0940',
    '\u092E\u093E\u0930\u094D\u091A',
    '\u0905\u092A\u094D\u0930\u093F\u0932',
    '\u092E\u0947',
    '\u091C\u0941\u0928',
    '\u091C\u0941\u0932\u093E\u0908',
    '\u0905\u0917\u0938\u094D\u091F',
    '\u0938\u0947\u092A\u094D\u091F\u0947\u092E\u094D\u092C\u0930',
    '\u0905\u0915\u094D\u091F\u094B\u092C\u0930',
    '\u0928\u094B\u092D\u0947\u092E\u094D\u092C\u0930',
    '\u0921\u093F\u0938\u0947\u092E\u094D\u092C\u0930',
  ];
  return `${toDevanagari(d)} ${monthNames[m - 1]} ${toDevanagari(y)}`;
}

/** Convert B.S. year to Nepali: 2040 -> २०४० */
export function devanagariYear(year: number): string {
  return toDevanagari(year);
}

/** Time-of-day with Nepali greeting. */
export function devanagariTimeOfDay(time24: string): string {
  const [h, m] = time24.split(':').map(Number);
  const suffix =
    h < 12 ? '\u092A\u094D\u0930\u093E\u0924\u0903' :
    h < 16 ? '\u0926\u093F\u0909\u0901\u0938\u094B' :
    h < 20 ? '\u0938\u093E\u092F\u0902' :
             '\u0930\u093E\u0924\u094D\u0930\u093F';
  const h12 = h % 12 || 12;
  return `${suffix} ${toDevanagari(h12)}:${toDevanagari(String(m ?? 0).padStart(2, '0'))}`;
}