import { DateTime } from 'luxon';
import { Observer, getPanchangamDetails } from '@prisri/jyotish';
import type { BirthData } from '@/domain/astrology/birth-data';
import type { Place } from '@/domain/geo/place';

// ─── Public types ───────────────────────────────────────────

export interface PanchangPeriod {
  start: DateTime;
  end: DateTime;
}

export interface PanchangLimb {
  /** 1-based index in the classical sequence. */
  index?: number;
  name: string;
}

export interface PanchangNakshatra extends PanchangLimb {
  lord: string;
  pada: number | null;
}

export interface ChoghadiyaSegment {
  name: string;
  start: DateTime;
  end: DateTime;
  /** 'good' | 'neutral' | 'bad' — as classified by the library. */
  rating: 'good' | 'neutral' | 'bad';
}

export interface ChoghadiyaTable {
  day: ChoghadiyaSegment[];
  night: ChoghadiyaSegment[];
}

export interface GowriSegment {
  name: string;
  start: DateTime;
  end: DateTime;
  rating: 'good' | 'neutral' | 'bad';
}

export interface GowriTable {
  day: GowriSegment[];
  night: GowriSegment[];
}

export interface RashiRef {
  index: number;
  name: string;
}

export interface SamvatInfo {
  vikram: number;
  shaka: number;
  samvatsara: string;
}

export interface PanchangData {
  // ─── The instant ────────────────────────────────────────
  /** The moment this Panchang describes, in the observer's tz. */
  instant: DateTime;

  // ─── Five limbs ─────────────────────────────────────────
  tithi: PanchangLimb;
  paksha: string;
  nakshatra: PanchangNakshatra;
  yoga: PanchangLimb;
  karana: PanchangLimb;
  vara: PanchangLimb;

  // ─── Solar & lunar ──────────────────────────────────────
  sunrise: DateTime | null;
  sunset: DateTime | null;
  moonrise: DateTime | null;
  moonset: DateTime | null;

  // ─── Auspicious windows ─────────────────────────────────
  abhijitMuhurta: PanchangPeriod | null;
  brahmaMuhurta: PanchangPeriod | null;
  govardhanMuhurta: PanchangPeriod | null;
  amritKalam: PanchangPeriod[];

  // ─── Inauspicious windows ───────────────────────────────
  rahuKalam: PanchangPeriod | null;
  yamagandaKalam: PanchangPeriod | null;
  gulikaKalam: PanchangPeriod | null;
  durMuhurta: PanchangPeriod[];
  varjyam: PanchangPeriod[];

  // ─── Time tables ────────────────────────────────────────
  choghadiya: ChoghadiyaTable;
  gowri: GowriTable;
  currentHoraLord: string | null;

  // ─── Vedic calendar ─────────────────────────────────────
  masa: { index: number; name: string; isAdhika: boolean } | null;
  ritu: string;
  ayana: { index: number; name: string };
  samvat: SamvatInfo | null;

  // ─── Rashi ──────────────────────────────────────────────
  moonRashi: RashiRef | null;
  sunRashi: RashiRef | null;

  // ─── Festivals ──────────────────────────────────────────
  festivals: string[];
}

export class PanchangError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PanchangError';
  }
}

// ─── Internal helpers ───────────────────────────────────────

/**
 * The library returns timestamps as ISO strings (UTC, with Z suffix)
 * OR occasionally as Date objects, depending on the field.
 * Normalize both to a Luxon DateTime in the observer's IANA zone.
 */
function toZoned(v: unknown, zone: string): DateTime | null {
  if (v === null || v === undefined) return null;
  let dt: DateTime | null = null;
  if (typeof v === 'string') {
    dt = DateTime.fromISO(v, { zone: 'utc' });
  } else if (v instanceof Date) {
    dt = DateTime.fromJSDate(v, { zone: 'utc' });
  }
  if (!dt || !dt.isValid) return null;
  return dt.setZone(zone);
}

/**
 * Many of the library's muhurta/kalam fields are returned as
 * { start, end } with ISO strings — but a few use flat
 * <name>Start/<name>End fields. This handles both.
 */
function toPeriod(
  raw: { start?: unknown; end?: unknown } | null | undefined,
  zone: string
): PanchangPeriod | null {
  if (!raw) return null;
  const start = toZoned(raw.start, zone);
  const end = toZoned(raw.end, zone);
  if (!start || !end) return null;
  return { start, end };
}

function toPeriodFromFlat(
  start: unknown,
  end: unknown,
  zone: string
): PanchangPeriod | null {
  const s = toZoned(start, zone);
  const e = toZoned(end, zone);
  if (!s || !e) return null;
  return { start: s, end: e };
}

function toPeriodArray(raw: unknown, zone: string): PanchangPeriod[] {
  if (!Array.isArray(raw)) return [];
  const out: PanchangPeriod[] = [];
  for (const item of raw) {
    const p = toPeriod(item as { start?: unknown; end?: unknown }, zone);
    if (p) out.push(p);
  }
  return out;
}

function toChoghadiya(raw: any, zone: string): ChoghadiyaTable {
  const map = (arr: any[]): ChoghadiyaSegment[] =>
    (arr ?? []).flatMap((s) => {
      const start = toZoned(s?.startTime, zone);
      const end = toZoned(s?.endTime, zone);
      if (!start || !end) return [];
      const rating: ChoghadiyaSegment['rating'] =
        s?.rating === 'good' || s?.rating === 'bad' ? s.rating : 'neutral';
      return [{ name: String(s?.name ?? '\u2014'), start, end, rating }];
    });
  return { day: map(raw?.day ?? []), night: map(raw?.night ?? []) };
}

function toGowri(raw: any, zone: string): GowriTable {
  const map = (arr: any[]): GowriSegment[] =>
    (arr ?? []).flatMap((s) => {
      const start = toZoned(s?.startTime, zone);
      const end = toZoned(s?.endTime, zone);
      if (!start || !end) return [];
      const rating: GowriSegment['rating'] =
        s?.rating === 'good' || s?.rating === 'bad' ? s.rating : 'neutral';
      return [{ name: String(s?.name ?? '\u2014'), start, end, rating }];
    });
  return { day: map(raw?.day ?? []), night: map(raw?.night ?? []) };
}

function toRashiRef(raw: any): RashiRef | null {
  if (!raw || typeof raw !== 'object') return null;
  return {
    index: Number(raw.index ?? 0),
    name: String(raw.name ?? '\u2014'),
  };
}

function toFestivals(raw: any): string[] {
  if (!Array.isArray(raw)) return [];
  return raw.map((f) => {
    if (typeof f === 'string') return f;
    return String(f?.name ?? f?.title ?? '\u2014');
  });
}

// ─── Core calculation ───────────────────────────────────────

function calculatePanchang(
  instant: DateTime,
  place: Pick<Place, 'lat' | 'lon' | 'timezone'>
): PanchangData {
  if (!instant.isValid) {
    throw new PanchangError(
      `Invalid instant: ${instant.invalidReason ?? 'unknown'}`
    );
  }

  const observer = new Observer(place.lat, place.lon, 0);
  const raw = getPanchangamDetails(instant.toJSDate(), observer) as any;
  const zone = place.timezone;

  if (!raw) {
    throw new PanchangError('Panchang calculation returned no data.');
  }

  return {
    instant: instant.setZone(zone),

    // Five limbs
    tithi: { index: raw.tithi, name: raw.tithiName ?? '\u2014' },
    paksha: raw.paksha ?? '\u2014',
    nakshatra: {
      index: raw.nakshatra,
      name: raw.nakshatraName ?? '\u2014',
      lord: raw.nakshatraLord ?? '\u2014',
      pada: typeof raw.nakshatraPada === 'number' ? raw.nakshatraPada : null,
    },
    yoga: { index: raw.yoga, name: raw.yogaName ?? '\u2014' },
    karana: { name: raw.karana ?? '\u2014' },
    vara: { index: raw.vara, name: raw.varaName ?? '\u2014' },

    // Solar & lunar
    sunrise: toZoned(raw.sunrise, zone),
    sunset: toZoned(raw.sunset, zone),
    moonrise: toZoned(raw.moonrise, zone),
    moonset: toZoned(raw.moonset, zone),

    // Auspicious
    abhijitMuhurta: toPeriod(raw.abhijitMuhurta, zone),
    brahmaMuhurta: toPeriod(raw.brahmaMuhurta, zone),
    govardhanMuhurta: toPeriod(raw.govardhanMuhurta, zone),
    amritKalam: toPeriodArray(raw.amritKalam, zone),

    // Inauspicious
    rahuKalam: toPeriodFromFlat(raw.rahuKalamStart, raw.rahuKalamEnd, zone),
    yamagandaKalam: toPeriod(raw.yamagandaKalam, zone),
    gulikaKalam: toPeriod(raw.gulikaKalam, zone),
    durMuhurta: toPeriodArray(raw.durMuhurta, zone),
    varjyam: toPeriodArray(raw.varjyam, zone),

    // Time tables
    choghadiya: toChoghadiya(raw.choghadiya, zone),
    gowri: toGowri(raw.gowri, zone),
    currentHoraLord:
      typeof raw.currentHora === 'string' ? raw.currentHora : null,

    // Vedic calendar
    masa: raw.masa
      ? {
          index: Number(raw.masa.index ?? 0),
          name: String(raw.masa.name ?? '\u2014'),
          isAdhika: Boolean(raw.masa.isAdhika),
        }
      : null,
    ritu: raw.ritu ?? '\u2014',
    ayana: {
      index: Number(raw.ayana ?? 0),
      name: raw.ayanaName ?? '\u2014',
    },
    samvat: raw.samvat
      ? {
          vikram: Number(raw.samvat.vikram ?? 0),
          shaka: Number(raw.samvat.shaka ?? 0),
          samvatsara: String(raw.samvat.samvatsara ?? '\u2014'),
        }
      : null,

    // Rashi
    moonRashi: toRashiRef(raw.moonRashi),
    sunRashi: toRashiRef(raw.sunRashi),

    // Festivals
    festivals: toFestivals(raw.festivals),
  };
}

// ─── Public wrappers ────────────────────────────────────────

/**
 * Panchang at the exact moment of birth.
 * Uses Luxon + the birth place's IANA zone — never `new Date(str)`.
 */
export function calculateBirthPanchang(profile: BirthData): PanchangData {
  const dt = DateTime.fromISO(
    `${profile.localDate}T${profile.localTime}`,
    { zone: profile.place.timezone }
  );
  if (!dt.isValid) {
    throw new PanchangError(
      `Invalid birth datetime: ${dt.invalidReason ?? 'unknown'}`
    );
  }
  return calculatePanchang(dt, profile.place);
}

/**
 * Today's Panchang at a given place.
 */
export function calculateNowPanchang(
  place: Pick<Place, 'lat' | 'lon' | 'timezone'>
): PanchangData {
  return calculatePanchang(DateTime.now().setZone(place.timezone), place);
}