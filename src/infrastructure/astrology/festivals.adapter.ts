import {
  Observer,
  getSunrise,
  getMasa,
  getPaksha,
  getTithiAtSunrise,
  getFestivals as lib_getFestivals,
  getLocalizedFestivalName,
  MULTI_DAY_FESTIVALS,
  SOLAR_FESTIVALS,
  SANKRANTI_NAMES,
} from '@prisri/jyotish';
import type { Place } from '@/domain/geo/place';

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

export type FestivalLang = 'en' | 'hi' | 'ne';

export interface Festival {
  /** Stable identifier — the festival's canonical name. */
  key: string;
  /** Localized display name (via the library's i18n). */
  name: string;
  /** Category badge for filtering. */
  type: 'festival' | 'ekadashi' | 'sankranti' | 'vrat' | 'other';
  /** Optional description text from the library. */
  description?: string;
  /** Optional extra fields the library may return. */
  isMultiDay?: boolean;
  isSolar?: boolean;
  associatedTithi?: string;
  associatedMasa?: string;
}

export interface DayFestivals {
  /** The date being queried (local midnight in the place's tz). */
  date: string;
  /** All festivals that occur on this date. */
  festivals: Festival[];
}

export class FestivalsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FestivalsError';
  }
}

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

/**
 * Classify a festival by its canonical name.
 * The library doesn't expose a category, so we infer it.
 */
function classifyFestival(rawName: string): Festival['type'] {
  const n = rawName.toLowerCase();
  if (n.includes('ekadashi')) return 'ekadashi';
  if (n.includes('sankranti')) return 'sankranti';
  if (n.includes('vrat') || n.includes('vrata')) return 'vrat';
  return 'festival';
}

/**
 * Some festival names come back from the library as plain English strings.
 * We try to translate via `getLocalizedFestivalName`, but fall back to
 * the raw name if the function is a no-op for that key.
 */
function translateName(rawName: string, lang: FestivalLang): string {
  try {
    const translated = (getLocalizedFestivalName as any)(rawName, lang);
    return typeof translated === 'string' && translated.length > 0 ? translated : rawName;
  } catch {
    return rawName;
  }
}

// ─────────────────────────────────────────────────────────────
// Adapter
// ─────────────────────────────────────────────────────────────

export const festivalsAdapter = {
  /**
   * Compute the Udaya Tithi context (sunrise, masa, paksha, tithi)
   * needed by getFestivals. Returns everything so callers can reuse it.
   */
  getDailyContext(place: Pick<Place, 'lat' | 'lon' | 'timezone'>, date: Date) {
    const observer = new Observer(place.lat, place.lon, 0);
    const sunrise = (getSunrise as any)(date, observer) as Date;
    const masa = (getMasa as any)(date, observer) as any;
    const tithiAtSunrise = (getTithiAtSunrise as any)(date, sunrise, observer) as any;
    const tithiNum = typeof tithiAtSunrise === 'number' ? tithiAtSunrise : tithiAtSunrise?.number ?? 1;
    const paksha = (getPaksha as any)(tithiNum) as string;
    return { observer, sunrise, masa, paksha, tithiAtSunrise };
  },

  /**
   * Fetch festivals for a single date at a single location.
   */
  getForDate(
    place: Pick<Place, 'lat' | 'lon' | 'timezone'>,
    date: Date,
    lang: FestivalLang = 'en',
  ): Festival[] {
    try {
      const ctx = this.getDailyContext(place, date);
      const raw = (lib_getFestivals as any)({
        date,
        observer: ctx.observer,
        sunrise: ctx.sunrise,
        masa: ctx.masa,
        paksha: ctx.paksha,
      });

      if (!Array.isArray(raw)) return [];

      return raw.map((f: any) => {
        const key = String(f.name ?? f.key ?? '');
        const display = translateName(key, lang);
        return {
          key,
          name: display,
          type: classifyFestival(key),
          description: f.description ? String(f.description) : undefined,
          isMultiDay: Boolean(f.isMultiDay ?? (MULTI_DAY_FESTIVALS as any)?.[key]),
          isSolar: Boolean(f.isSolar ?? (SOLAR_FESTIVALS as any)?.[key]),
          associatedTithi: f.tithi ? String(f.tithi) : undefined,
          associatedMasa: f.masa ? String(f.masa) : undefined,
        };
      });
    } catch (e) {
      throw new FestivalsError(
        `Festival lookup failed for ${date.toISOString()}: ${(e as Error).message}`
      );
    }
  },

  /**
   * Fetch festivals for every day in a calendar month.
   * Returns a map keyed by ISO date string (YYYY-MM-DD).
   */
  getForMonth(
    place: Pick<Place, 'lat' | 'lon' | 'timezone'>,
    year: number,
    monthIndex: number, // 0-based (0 = January)
    lang: FestivalLang = 'en',
  ): Record<string, Festival[]> {
    const result: Record<string, Festival[]> = {};
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, monthIndex, day, 12, 0, 0); // noon local — safest
      try {
        const list = this.getForDate(place, date, lang);
        if (list.length > 0) {
          const iso = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          result[iso] = list;
        }
      } catch {
        // Skip days that error (e.g. no sunrise at high latitudes in winter)
      }
    }

    return result;
  },

  /**
   * Fetch a flat list of all festivals across a date range.
   * Useful for a "next 30 days" strip.
   */
  getForRange(
    place: Pick<Place, 'lat' | 'lon' | 'timezone'>,
    startDate: Date,
    days: number,
    lang: FestivalLang = 'en',
  ): DayFestivals[] {
    const out: DayFestivals[] = [];
    for (let i = 0; i < days; i++) {
      const d = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i, 12, 0, 0);
      try {
        const list = this.getForDate(place, d, lang);
        if (list.length > 0) {
          const iso = d.toISOString().slice(0, 10);
          out.push({ date: iso, festivals: list });
        }
      } catch {
        // skip
      }
    }
    return out;
  },

  /**
   * Static tables exposed for reference / UI hints.
   */
  staticTables: {
    multiDay: MULTI_DAY_FESTIVALS,
    solar: SOLAR_FESTIVALS,
    sankrantiNames: SANKRANTI_NAMES,
  },
};

export type FestivalsAdapter = typeof festivalsAdapter;