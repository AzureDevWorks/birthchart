/**
 * Utility functions for traditional Nepali patrika formatting.
 */

const DEVANAGARI_DIGITS = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];

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

/** Time "08:45" → "०८:४५" */
export function devanagariTime(time24: string): string {
  return devanagariDigits(time24);
}

/**
 * Convert a Gregorian date to a formal Nepali date string.
 * Example: 1983-03-26 → "२६ मार्च १९८३"
 */
export function devanagariDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  const monthNames = [
    'जनवरी', 'फेब्रुअरी', 'मार्च', 'अप्रिल', 'मे', 'जुन',
    'जुलाई', 'अगस्ट', 'सेप्टेम्बर', 'अक्टोबर', 'नोभेम्बर', 'डिसेम्बर',
  ];
  return `${toDevanagari(d)} ${monthNames[m - 1]} ${toDevanagari(y)}`;
}

/** Convert B.S. year to Nepali: 2040 → २०४० */
export function devanagariYear(year: number): string {
  return toDevanagari(year);
}

/** "08:45" → "प्रातः ८:४५" or "सायं ६:३०" */
export function devanagariTimeOfDay(time24: string): string {
  const [h, m] = time24.split(':').map(Number);
  const suffix = h < 12 ? 'प्रातः' : h < 16 ? 'दिउँसो' : h < 20 ? 'सायं' : 'रात्रि';
  const h12 = h % 12 || 12;
  return `${suffix} ${toDevanagari(h12)}:${toDevanagari(String(m ?? 0).padStart(2, '0'))}`;
}
