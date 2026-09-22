import NepaliDate from 'nepali-date-converter';

export const NEPALI_MONTHS = [
  'बैशाख', 'जेठ', 'असार', 'साउन', 'भदौ', 'असोज',
  'कात्तिक', 'मंसिर', 'पुष', 'माघ', 'फाल्गुन', 'चैत',
] as const;

export const NEPALI_MONTHS_EN = [
  'Baishakh', 'Jestha', 'Ashadh', 'Shrawan', 'Bhadra', 'Ashwin',
  'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra',
] as const;

const DEVANAGARI_DIGITS = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];

export function toDevanagari(num: number | string): string {
  return String(num).replace(/\d/g, (d) => DEVANAGARI_DIGITS[Number(d)]);
}

export function toArabicNumerals(str: string): string {
  return str.replace(/[०-९]/g, (d) => String(DEVANAGARI_DIGITS.indexOf(d)));
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
    // Use local getters, not toISOString(), to avoid UTC shifts
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
    // Construct in local time to avoid UTC offsets
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
    // Try days 32 down to 29 until valid
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

export function formatBS(bs: BSDate, options: { devanagari?: boolean; monthNames?: readonly string[] } = {}): string {
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
