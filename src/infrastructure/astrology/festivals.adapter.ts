import {
  Observer,
  getSunrise,
  getTithiAtSunrise,
  getMasa,
  getPaksha,
  getKundli,
  findSankrantisInRange,
  SOLAR_FESTIVALS,
  MULTI_DAY_FESTIVALS,
} from '@prisri/jyotish';
import type { Place } from '@/domain/geo/place';
import {
  matchFestivalRules,
  isEkadashiTithi,
  isPurnima,
  isAmavasya,
  MASA_NAMES,
  type FestivalRule,
  type FestivalCategory,
} from '@/features/panchang/lib/festival-rules';

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

export type FestivalLang = 'en' | 'hi' | 'ne';

export interface Festival {
  key: string;
  name: string;
  type: FestivalCategory | 'sankranti' | 'purnima' | 'amavasya';
  description?: string;
  associatedTithi?: string;
  associatedMasa?: string;
  isMultiDay?: boolean;
  isSolar?: boolean;
}

export class FestivalsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FestivalsError';
  }
}

// ─────────────────────────────────────────────────────────────
// Per-day context computation
// ─────────────────────────────────────────────────────────────

interface DayContext {
  sunrise: Date;
  masaName: string;
  masaIndex: number;
  tithiIndex: number;
  paksha: 'Shukla' | 'Krishna';
}

function computeDayContext(
  observer: InstanceType<typeof Observer>,
  date: Date
): DayContext | null {
  try {
    const sunrise = getSunrise(date, observer);
    if (!sunrise) return null;

    const kundli: any = getKundli(sunrise, observer);
    const sunLon = kundli?.planets?.Sun?.longitude;
    const moonLon = kundli?.planets?.Moon?.longitude;
    if (typeof sunLon !== 'number' || typeof moonLon !== 'number') return null;

    const masa: any = getMasa(sunLon, moonLon, sunrise);
    if (!masa) return null;

    const tithi: any = getTithiAtSunrise(date, sunrise, observer);
    if (typeof tithi !== 'number') return null;

    const pakshaRaw = getPaksha(tithi);
    const paksha: 'Shukla' | 'Krishna' =
      typeof pakshaRaw === 'string' && pakshaRaw.toLowerCase().includes('krishna')
        ? 'Krishna'
        : 'Shukla';

    return {
      sunrise,
      masaName: String(masa.name ?? ''),
      masaIndex: Number(masa.index ?? 0),
      tithiIndex: tithi,
      paksha,
    };
  } catch {
    return null;
  }
}

// ─────────────────────────────────────────────────────────────
// Tithi name lookup (0-indexed)
// ─────────────────────────────────────────────────────────────

const TITHI_NAMES = [
  'Pratipada','Dwitiya','Tritiya','Chaturthi','Panchami',
  'Shashthi','Saptami','Ashtami','Navami','Dashami',
  'Ekadashi','Dwadashi','Trayodashi','Chaturdashi','Purnima',
  'Pratipada','Dwitiya','Tritiya','Chaturthi','Panchami',
  'Shashthi','Saptami','Ashtami','Navami','Dashami',
  'Ekadashi','Dwadashi','Trayodashi','Chaturdashi','Amavasya',
] as const;

function tithiLabel(tithiIndex: number, paksha: 'Shukla' | 'Krishna'): string {
  const name = TITHI_NAMES[tithiIndex] ?? '—';
  return `${paksha} ${name}`;
}

// ─────────────────────────────────────────────────────────────
// Rule → Festival conversion
// ─────────────────────────────────────────────────────────────

function ruleToFestival(rule: FestivalRule, lang: FestivalLang): Festival {
  const name =
    lang === 'hi' ? rule.nameHi
    : lang === 'ne' ? rule.nameNe
    : rule.nameEn;
  return {
    key: rule.key,
    name,
    type: rule.category,
    description: rule.descriptionEn,
  };
}

// ─────────────────────────────────────────────────────────────
// Sankranti lookup (per year)
// ─────────────────────────────────────────────────────────────

const sankrantiCache = new Map<string, any[]>();

function getSankrantisForYear(year: number, observer: InstanceType<typeof Observer>) {
  const cacheKey = `${year}-${observer.latitude.toFixed(2)}-${observer.longitude.toFixed(2)}`;
  if (sankrantiCache.has(cacheKey)) return sankrantiCache.get(cacheKey)!;
  try {
    const start = new Date(year, 0, 1, 0, 0, 0);
    const end = new Date(year, 11, 31, 23, 59, 59);
    const list = findSankrantisInRange(start, end, observer as any) as any[];
    sankrantiCache.set(cacheKey, list);
    return list;
  } catch {
    sankrantiCache.set(cacheKey, []);
    return [];
  }
}

function findSankrantiOnDate(
  date: Date,
  observer: InstanceType<typeof Observer>
): { name: string; rashiName: string } | null {
  const sankrantis = getSankrantisForYear(date.getFullYear(), observer);
  for (const s of sankrantis) {
    const exact = new Date(s.exactTime);
    // Same day?
    if (
      exact.getFullYear() === date.getFullYear() &&
      exact.getMonth() === date.getMonth() &&
      exact.getDate() === date.getDate()
    ) {
      return { name: String(s.name ?? 'Sankranti'), rashiName: String(s.rashiName ?? '') };
    }
  }
  return null;
}

// ─────────────────────────────────────────────────────────────
// Multi-day festival check
// ─────────────────────────────────────────────────────────────

function matchMultiDay(ctx: DayContext): Festival[] {
  const out: Festival[] = [];
  for (const [key, cfg] of Object.entries(MULTI_DAY_FESTIVALS as any)) {
    const f: any = cfg;
    if (f.masaIndex !== ctx.masaIndex) continue;
    if (ctx.paksha !== 'Shukla') continue;
    if (ctx.tithiIndex < f.startTithi || ctx.tithiIndex > f.endTithi) continue;

    const dayNum = ctx.tithiIndex - f.startTithi + 1;
    const dayName = f.dailyNames?.[dayNum - 1] ?? f.name;
    out.push({
      key,
      name: String(dayName),
      type: 'festival',
      description: String(f.description ?? ''),
      isMultiDay: true,
    });
  }
  return out;
}

// ─────────────────────────────────────────────────────────────
// Solar festival check
// ─────────────────────────────────────────────────────────────

function matchSolarFestivals(ctx: DayContext): Festival[] {
  const out: Festival[] = [];
  const entries = (SOLAR_FESTIVALS as any)[String(ctx.masaIndex)];
  if (!Array.isArray(entries)) return out;
  for (const f of entries) {
    out.push({
      key: `solar-${f.name}`,
      name: String(f.name),
      type: 'festival',
      description: String(f.description ?? ''),
      isSolar: true,
    });
  }
  return out;
}

// ─────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────

export const festivalsAdapter = {
  /**
   * Compute all festivals for a single date at a location.
   */
  getForDate(
    place: Pick<Place, 'lat' | 'lon' | 'timezone'>,
    date: Date,
    lang: FestivalLang = 'en'
  ): Festival[] {
    const observer = new Observer(place.lat, place.lon, 0);
    const ctx = computeDayContext(observer, date);
    if (!ctx) return [];

    const festivals: Festival[] = [];

    // 1. Tithi-based rules
    const rules = matchFestivalRules(ctx.masaName, ctx.paksha, ctx.tithiIndex);
    for (const r of rules) {
      const f = ruleToFestival(r, lang);
      f.associatedTithi = tithiLabel(ctx.tithiIndex, ctx.paksha);
      f.associatedMasa = ctx.masaName;
      festivals.push(f);
    }

    // 2. Multi-day festivals (Navratri, Ganesh Utsav, etc.)
    for (const f of matchMultiDay(ctx)) {
      f.associatedTithi = tithiLabel(ctx.tithiIndex, ctx.paksha);
      f.associatedMasa = ctx.masaName;
      // Avoid duplicating if a rule already produced the same key
      if (!festivals.some((x) => x.key === f.key)) {
        festivals.push(f);
      }
    }

    // 3. Sankranti
    const sank = findSankrantiOnDate(date, observer);
    if (sank) {
      festivals.push({
        key: `sankranti-${sank.rashiName}`,
        name: sank.name,
        type: 'sankranti',
        associatedMasa: ctx.masaName,
      });
    }

    // 4. Generic Ekadashi fallback (when no named rule matches)
    if (
      isEkadashiTithi(ctx.tithiIndex) &&
      !festivals.some((f) => f.type === 'ekadashi')
    ) {
      festivals.push({
        key: 'generic-ekadashi',
        name: lang === 'hi' ? 'एकादशी व्रत' : lang === 'ne' ? 'एकादशी व्रत' : 'Ekadashi Vrat',
        type: 'ekadashi',
        associatedTithi: tithiLabel(ctx.tithiIndex, ctx.paksha),
        associatedMasa: ctx.masaName,
      });
    }

    // 5. Generic Purnima / Amavasya fallback
    if (isPurnima(ctx.tithiIndex) && !festivals.some((f) => f.type === 'purnima')) {
      festivals.push({
        key: 'generic-purnima',
        name: lang === 'hi' ? 'पूर्णिमा' : lang === 'ne' ? 'पूर्णिमा' : 'Purnima',
        type: 'purnima',
        associatedTithi: tithiLabel(ctx.tithiIndex, ctx.paksha),
        associatedMasa: ctx.masaName,
      });
    }
    if (isAmavasya(ctx.tithiIndex) && !festivals.some((f) => f.type === 'amavasya')) {
      festivals.push({
        key: 'generic-amavasya',
        name: lang === 'hi' ? 'अमावस्या' : lang === 'ne' ? 'औंसी' : 'Amavasya',
        type: 'amavasya',
        associatedTithi: tithiLabel(ctx.tithiIndex, ctx.paksha),
        associatedMasa: ctx.masaName,
      });
    }

    // 6. Solar festivals (attached to their masa's solar entry)
    for (const f of matchSolarFestivals(ctx)) {
      if (!festivals.some((x) => x.key === f.key)) {
        festivals.push(f);
      }
    }

    // Deduplicate by key
    const seen = new Set<string>();
    return festivals.filter((f) => {
      if (seen.has(f.key)) return false;
      seen.add(f.key);
      return true;
    });
  },

  /**
   * Compute festivals for a full month.
   * Returns a map of ISO date → Festival[].
   */
  getForMonth(
    place: Pick<Place, 'lat' | 'lon' | 'timezone'>,
    year: number,
    monthIndex: number,
    lang: FestivalLang = 'en'
  ): Record<string, Festival[]> {
    const out: Record<string, Festival[]> = {};
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const d = new Date(year, monthIndex, day, 6, 0, 0); // 6 AM local — around sunrise
      try {
        const list = this.getForDate(place, d, lang);
        if (list.length > 0) {
          const iso = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          out[iso] = list;
        }
      } catch {
        // skip days that error
      }
    }

    return out;
  },

  staticTables: {
    masaNames: MASA_NAMES,
  },
};

export type FestivalsAdapter = typeof festivalsAdapter;