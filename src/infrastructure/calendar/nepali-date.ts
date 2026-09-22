import NepaliDate from 'nepali-date-converter';

// Baishakh ... Chaitra, in Devanagari.
export const NEPALI_MONTHS = [
  '\u092C\u0948\u0936\u093E\u0916',
  '\u091C\u0947\u0920',
  '\u0905\u0938\u093E\u0930',
  '\u0938\u093E\u0909\u0928',
  '\u092D\u0926\u094C',
  '\u0905\u0938\u094B\u091C',
  '\u0915\u093E\u0924\u094D\u0924\u093F\u0915',
  '\u092E\u0902\u0938\u093F\u0930',
  '\u092A\u0941\u0937',
  '\u092E\u093E\u0918',
  '\u092B\u093E\u0932\u094D\u0917\u0941\u0928',
  '\u091A\u0948\u0924',
] as const;

export const NEPALI_MONTHS_EN = [
  'Baishakh', 'Jestha', 'Ashadh', 'Shrawan', 'Bhadra', 'Ashwin',
  'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra',
] as const;

const DEVANAGARI_DIGITS = [
  '\u0966','\u0967','\u0968','\u0969','\u096A',
  '\u096B','\u096C','\u096D','\u096E','\u096F',
];

export function toDevanagari(num: number | string): string {
  return String(num).replace(/\d/g, (d) => DEVANAGARI_DIGITS[Number(d)]);
}

export function toArabicNumerals(str: string): string {
  return str.replace(/[\u0966-\u096F]/g, (d) => String(DEVANAGARI_DIGITS.indexOf(d)));
}

export const BS_MIN_YEAR = 1975;
export const BS_MAX_YEAR = 2090;

export interface BSDate {
  year: number;
  month: number; // 0-indexed (0 = Baishakh)
  day: number;
}

export function toGregorianISO(bs: BSDate): string | null {
  try {
    const d = new NepaliDate(bs.year, bs.month, bs.day);
    const js = d.toJsDate();
    const yyyy = js.getFullYear();
    const mm = String(js.getMonth() + 1).padStart(2, '0');
    const dd = String(js.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  } catch {
    return null;
  }
}

export function fromGregorianISO(iso: string): BSDate | null {
  try {
    const [y, m, d] = iso.split('-').map(Number);
    if (!y || !m || !d) return null;
    const localDate = new Date(y, m - 1, d);
    const nep = new NepaliDate(localDate);
    return {
      year: nep.getYear(),
      month: nep.getMonth(),
      day: nep.getDate(),
    };
  } catch {
    return null;
  }
}

export function daysInBsMonth(year: number, month: number): number {
  try {
    for (let d = 32; d >= 29; d--) {
      try {
        new NepaliDate(year, month, d);
        return d;
      } catch {
        // keep trying
      }
    }
    return 30;
  } catch {
    return 30;
  }
}

export function formatBS(
  bs: BSDate,
  options: { devanagari?: boolean; monthNames?: readonly string[] } = {}
): string {
  const { devanagari = true, monthNames = NEPALI_MONTHS } = options;
  const yStr = devanagari ? toDevanagari(bs.year) : String(bs.year);
  const dStr = devanagari ? toDevanagari(bs.day) : String(bs.day);
  return `${yStr} ${monthNames[bs.month]} ${dStr}`;
}

export function formatADFromISO(iso: string): string {
  try {
    const [y, m, d] = iso.split('-').map(Number);
    if (!y || !m || !d) return iso;
    const localDate = new Date(y, m - 1, d);
    return localDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}