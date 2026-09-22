import { DateTime } from 'luxon';
import {
  getGocharAnalysis as lib_getGocharAnalysis,
  getPlanetGochar as lib_getPlanetGochar,
  checkSadeSati as lib_checkSadeSati,
  checkDhaiya as lib_checkDhaiya,
  getChandrashtama as lib_getChandrashtama,
  getTarabalam as lib_getTarabalam,
  getDishaShoola as lib_getDishaShoola,
  isDirectionSafe as lib_isDirectionSafe,
} from '@prisri/jyotish';
import type { Kundli } from '@prisri/jyotish';
import type { BirthData } from '@/domain/astrology/birth-data';
import type {
  GocharAnalysis,
  GocharPlanet,
  ChandrashtamaResult,
  TarabalamResult,
  DishaShoolaResult,
} from '@/domain/astrology/gochar';

export class GocharError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GocharError';
  }
}

/**
 * Build the natal Moon longitude (0-360°) from a Kundli object.
 * Falls back gracefully if the shape is unexpected.
 */
function natalMoonLongitude(kundli: Record<string, any>): number {
  const moon = kundli?.planets?.Moon;
  if (!moon) return 0;
  if (typeof moon.longitude === 'number') return moon.longitude;
  // Reconstruct from rashi (1-12) + degree + minute + second
  const rashi = (moon.rashi ?? 1) - 1;
  const deg = moon.degree ?? 0;
  const min = (moon.minute ?? 0) / 60;
  const sec = (moon.second ?? 0) / 3600;
  return rashi * 30 + deg + min + sec;
}

/**
 * Normalize the library's Gochar analysis into our domain shape.
 * The library returns a complex object with many fields; we pick
 * what we need and coerce to consistent types.
 */
function normalizeGochar(raw: any): GocharAnalysis {
  if (!raw) throw new GocharError('Gochar analysis returned no data.');

  const planets: Record<string, GocharPlanet> = {};
  for (const [name, p] of Object.entries(raw.planets ?? {})) {
    const pp = p as any;
    planets[name] = {
      planet: name,
      rashi: pp.rashi ?? 0,
      rashiName: pp.rashiName ?? '',
      degree: pp.degree,
      minute: pp.minute,
      houseFromMoon: pp.houseFromMoon ?? 0,
      houseFromLagna: pp.houseFromLagna ?? 0,
      netStatus: pp.netStatus ?? 'neutral',
      hasVedha: Boolean(pp.hasVedha),
      vedhaPlanet: pp.vedhaPlanet ?? null,
      vedhaExempted: Boolean(pp.vedhaExempted),
      prediction: pp.prediction ?? '',
    };
  }

  return {
    overallVerdict: raw.overallVerdict ?? '',
    overallFavorablePercentage: Number(raw.overallFavorablePercentage ?? 0),
    planets,
    specialTransits: {
      sadeSati: {
        status: raw.specialTransits?.sadeSati?.status ?? 'inactive',
        phase: raw.specialTransits?.sadeSati?.phase ?? null,
        startDate: raw.specialTransits?.sadeSati?.startDate ?? null,
        endDate: raw.specialTransits?.sadeSati?.endDate ?? null,
        description: raw.specialTransits?.sadeSati?.description ?? '',
      },
      dhaiya: raw.specialTransits?.dhaiya
        ? {
            status: raw.specialTransits.dhaiya.status ?? 'inactive',
            type: raw.specialTransits.dhaiya.type ?? null,
            description: raw.specialTransits.dhaiya.description ?? '',
          }
        : undefined,
      guruGochar: {
        rashiName: raw.specialTransits?.guruGochar?.rashiName,
        houseFromMoon: raw.specialTransits?.guruGochar?.houseFromMoon,
        blessingSummary: raw.specialTransits?.guruGochar?.blessingSummary ?? '',
        isExalted: Boolean(raw.specialTransits?.guruGochar?.isExalted),
        isDebilitated: Boolean(raw.specialTransits?.guruGochar?.isDebilitated),
      },
    },
    lifeAreas: {
      career:        normalizeLifeArea(raw.lifeAreas?.career),
      wealth:        normalizeLifeArea(raw.lifeAreas?.wealth),
      health:        normalizeLifeArea(raw.lifeAreas?.health),
      relationships: normalizeLifeArea(raw.lifeAreas?.relationships),
      education:     raw.lifeAreas?.education  ? normalizeLifeArea(raw.lifeAreas.education)  : undefined,
      family:        raw.lifeAreas?.family     ? normalizeLifeArea(raw.lifeAreas.family)     : undefined,
      spiritual:     raw.lifeAreas?.spiritual  ? normalizeLifeArea(raw.lifeAreas.spiritual)  : undefined,
    },
    calculatedAt: raw.calculatedAt ?? new Date().toISOString(),
  };
}

function normalizeLifeArea(raw: any): { rating: string; score?: number; summary: string } {
  if (!raw) return { rating: 'neutral', summary: '' };
  return {
    rating: raw.rating ?? 'neutral',
    score: typeof raw.score === 'number' ? raw.score : undefined,
    summary: raw.summary ?? '',
  };
}

// ─────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────

export const gocharAdapter = {
  /**
   * Run comprehensive Gochar analysis for a Kundli at a given date.
   * Defaults to "now".
   */
  analyze(kundli: Record<string, any>, at: Date = new Date()): GocharAnalysis {
    try {
      const raw = lib_getGocharAnalysis(kundli as unknown as Kundli, at);
      return normalizeGochar(raw);
    } catch (e) {
      throw new GocharError((e as Error).message ?? 'Gochar analysis failed.');
    }
  },

  /**
   * Single-planet transit lookup.
   */
  planet(name: string, kundli: Record<string, any>, at: Date = new Date()): GocharPlanet | null {
    try {
      const raw = lib_getPlanetGochar(name, kundli as unknown as Kundli, at) as any;
      if (!raw) return null;
      return {
        planet: name,
        rashi: raw.rashi ?? 0,
        rashiName: raw.rashiName ?? '',
        degree: raw.degree,
        minute: raw.minute,
        houseFromMoon: raw.houseFromMoon ?? 0,
        houseFromLagna: raw.houseFromLagna ?? 0,
        netStatus: raw.netStatus ?? 'neutral',
        hasVedha: Boolean(raw.hasVedha),
        vedhaPlanet: raw.vedhaPlanet ?? null,
        vedhaExempted: Boolean(raw.vedhaExempted),
        prediction: raw.prediction ?? '',
      };
    } catch {
      return null;
    }
  },

  /** Sade Sati from Moon longitude and Saturn longitude (both 0-360). */
  sadeSati(moonLon: number, saturnLon: number) {
    try {
      return lib_checkSadeSati(moonLon, saturnLon) as any;
    } catch {
      return { status: 'inactive', phase: null } as any;
    }
  },

  /** Dhaiya (Kantaka / Ashtama Shani) from Moon and Saturn longitudes. */
  dhaiya(moonLon: number, saturnLon: number) {
    try {
      return lib_checkDhaiya(moonLon, saturnLon) as any;
    } catch {
      return { status: 'inactive', type: null } as any;
    }
  },

  /**
   * Chandrashtama: is the current Moon transiting the 8th sign from
   * the natal Moon?
   * @param natalMoonRashi 0-based (0 = Aries)
   * @param currentMoonRashi 0-based
   */
  chandrashtama(natalMoonRashi: number, currentMoonRashi: number): ChandrashtamaResult {
    try {
      const raw = lib_getChandrashtama(natalMoonRashi, currentMoonRashi) as any;
      return {
        isActive: Boolean(raw?.isActive),
        description: raw?.description ?? '',
        moonRashiName: raw?.moonRashiName,
        natalMoonRashiName: raw?.natalMoonRashiName,
      };
    } catch {
      return { isActive: false };
    }
  },

  /**
   * Tarabalam: birth nakshatra vs. current Moon nakshatra.
   * Both are 0-based (0 = Ashwini).
   */
  tarabalam(birthNakshatra: number, currentNakshatra: number): TarabalamResult {
    try {
      const raw = lib_getTarabalam(birthNakshatra, currentNakshatra) as any;
      return {
        taraName: raw?.taraName ?? '',
        taraNumber: raw?.taraNumber,
        isAuspicious: Boolean(raw?.isAuspicious),
        description: raw?.description ?? '',
      };
    } catch {
      return { taraName: '', isAuspicious: false, description: '' };
    }
  },

  /** Disha Shoola — the direction to avoid for the given weekday (0=Sun). */
  dishaShoola(varaNumber: number): DishaShoolaResult {
    try {
      const raw = lib_getDishaShoola(varaNumber) as any;
      return {
        varaName: raw?.varaName ?? '',
        varaNumber: raw?.varaNumber ?? varaNumber,
        inauspiciousDirection: raw?.inauspiciousDirection ?? '',
      };
    } catch {
      return { varaName: '', varaNumber, inauspiciousDirection: '' };
    }
  },

  /** Is a given direction safe for travel on a given weekday? */
  isDirectionSafe(direction: string, varaNumber: number): boolean {
    try {
      return Boolean(lib_isDirectionSafe(direction, varaNumber));
    } catch {
      return true;
    }
  },

  // ─── Convenience: full analysis from BirthData + Kundli ────

  /**
   * Run everything from a profile + its already-computed Kundli.
   * Used by the GocharView component.
   */
  fullAnalysis(
    profile: BirthData,
    kundli: Record<string, any>,
    at: Date = new Date()
  ) {
    const analysis = this.analyze(kundli, at);

    const moonLon = natalMoonLongitude(kundli);
    const saturn = kundli?.planets?.Saturn;
    const saturnLon = saturn
      ? (saturn.rashi ? (saturn.rashi - 1) * 30 : 0) + (saturn.degree ?? 0)
      : 0;

    const sadeSati = this.sadeSati(moonLon, saturnLon);
    const dhaiya = this.dhaiya(moonLon, saturnLon);

    // Current Moon rashi & nakshatra via the already-computed analysis
    const transitingMoon = analysis.planets.Moon;
    const natalMoonRashi0 = (kundli?.planets?.Moon?.rashi ?? 1) - 1;
    const currentMoonRashi0 = (transitingMoon?.rashi ?? 1) - 1;

    const chandrashtama = this.chandrashtama(natalMoonRashi0, currentMoonRashi0);

    const birthNakshatra0 = (kundli?.planets?.Moon?.nakshatraIndex ?? 0);
    const currentNakshatra0 = (transitingMoon as any)?.nakshatraIndex ?? 0;
    const tarabalam = this.tarabalam(birthNakshatra0, currentNakshatra0);

    // Vara from the current date in the birth tz
    const nowLocal = DateTime.fromJSDate(at).setZone(profile.place.timezone);
    const varaNumber = nowLocal.weekday % 7; // Luxon: 1=Mon..7=Sun -> 0=Sun..6=Sat
    const dishaShoola = this.dishaShoola(varaNumber);

    return {
      analysis,
      sadeSati,
      dhaiya,
      chandrashtama,
      tarabalam,
      dishaShoola,
    };
  },
};

export type GocharAdapter = typeof gocharAdapter;