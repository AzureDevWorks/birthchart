import {
  getGocharAnalysis as lib_getGocharAnalysis,
  getPlanetGochar as lib_getPlanetGochar,
  checkSadeSati as lib_checkSadeSati,
  checkDhaiya as lib_checkDhaiya,
  getChandrashtama as lib_getChandrashtama,
  getTarabalam as lib_getTarabalam,
  getDishaShoola as lib_getDishaShoola,
} from '@prisri/jyotish';
import type { Kundli } from '@prisri/jyotish';

// ─────────────────────────────────────────────────────────────
// Types — mirror the library's real return shape (discovered by
// dumping a live kundli).
// ─────────────────────────────────────────────────────────────

export type GocharNetStatus = 'Favorable' | 'Unfavorable' | 'Obstructed';

export interface GocharPlanet {
  planet: string;
  longitude: number;
  rashi: number;
  rashiName: string;
  degree: number;
  minute: number;
  nakshatra: string;
  nakshatraLord: string;
  pada: number;
  isRetrograde: boolean;
  houseFromMoon: number;
  houseFromLagna: number;
  isFavorableFromMoon: boolean;
  hasVedha: boolean;
  vedhaCausedBy?: string;
  netStatus: GocharNetStatus;
  prediction: string;
  savBindusInHouse: number;
}

export interface GocharSadeSati {
  status: boolean;
  phase?: number;
  phaseName?: string;
  description: string;
  saturnRashi: number;
  moonRashi: number;
}

export interface GocharDhaiya {
  status: boolean;
  type?: 'Fourth' | 'Eighth';
  typeName?: string;
  description: string;
  saturnRashi: number;
  moonRashi: number;
}

export interface GocharGuruGochar {
  houseFromMoon: number;
  status: string;
  blessingSummary: string;
  aspectHousesFromMoon: number[];
}

export interface GocharChandrashtama {
  isActive: boolean;
  birthRashi: number;
  birthRashiName: string;
  chandrashtamaRashi: number;
  chandrashtamaRashiName: string;
  currentMoonRashi: number;
  currentMoonRashiName: string;
}

export interface GocharRahuKetuAxis {
  rahuHouseFromMoon: number;
  ketuHouseFromMoon: number;
  karmicImpact: string;
}

export interface GocharSpecialTransits {
  sadeSati: GocharSadeSati;
  dhaiya: GocharDhaiya;
  chandrashtama: GocharChandrashtama;
  guruGochar: GocharGuruGochar;
  rahuKetuAxis: GocharRahuKetuAxis;
}

export interface GocharLifeArea {
  rating: string;
  summary: string;
}

export interface GocharAnalysis {
  transitDate: string;
  natalMoonRashi: number;
  natalMoonRashiName: string;
  natalLagnaRashi: number;
  natalLagnaRashiName: string;
  overallFavorablePercentage: number;
  overallVerdict: string;
  planets: Record<string, GocharPlanet>;
  specialTransits: GocharSpecialTransits;
  lifeAreas: {
    career: GocharLifeArea;
    wealth: GocharLifeArea;
    relationships: GocharLifeArea;
    health: GocharLifeArea;
  };
  actionableAdvice: string[];
  formattedSummary: string;
}

export interface ChandrashtamaResult {
  isActive: boolean;
  birthRashi: number;
  birthRashiName: string;
  chandrashtamaRashi: number;
  chandrashtamaRashiName: string;
  currentMoonRashi: number;
  currentMoonRashiName: string;
}

export interface TarabalamResult {
  birthNakshatra: number;
  birthNakshatraName: string;
  currentNakshatra: number;
  currentNakshatraName: string;
  taraNumber: number;
  taraName: string;
  isAuspicious: boolean;
  description: string;
}

export interface DishaShoolaResult {
  vara: number;
  varaName: string;
  inauspiciousDirection: string;
  safeDirections: string[];
  remedy: string;
  description: string;
}

export interface SadeSatiResult {
  status: boolean;
  phase?: number;
  phaseName?: string;
  description: string;
  saturnRashi: number;
  moonRashi: number;
}

export interface DhaiyaResult {
  status: boolean;
  type?: 'Fourth' | 'Eighth';
  typeName?: string;
  description: string;
  saturnRashi: number;
  moonRashi: number;
}

export class GocharError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GocharError';
  }
}

// ─────────────────────────────────────────────────────────────
// Adapter
// ─────────────────────────────────────────────────────────────

export const gocharAdapter = {
  /** Full transit analysis at a given date. */
  analyze(kundli: Record<string, any>, at: Date = new Date()): GocharAnalysis {
    let raw: any;
    try {
      raw = lib_getGocharAnalysis(kundli as unknown as Kundli, at);
    } catch (e) {
      throw new GocharError((e as Error).message ?? 'Gochar analysis failed.');
    }
    if (!raw) throw new GocharError('Gochar returned no data.');

    const planets: Record<string, GocharPlanet> = {};
    for (const [name, p] of Object.entries(raw.planets ?? {})) {
      const pp = p as any;
      planets[name] = {
        planet: pp.planet ?? name,
        longitude: pp.longitude ?? 0,
        rashi: pp.rashi ?? 0,
        rashiName: pp.rashiName ?? '—',
        degree: pp.degree ?? 0,
        minute: pp.minute ?? 0,
        nakshatra: pp.nakshatra ?? '—',
        nakshatraLord: pp.nakshatraLord ?? '—',
        pada: pp.pada ?? 0,
        isRetrograde: Boolean(pp.isRetrograde),
        houseFromMoon: pp.houseFromMoon ?? 0,
        houseFromLagna: pp.houseFromLagna ?? 0,
        isFavorableFromMoon: Boolean(pp.isFavorableFromMoon),
        hasVedha: Boolean(pp.hasVedha),
        vedhaCausedBy: pp.vedhaCausedBy ?? undefined,
        netStatus: pp.netStatus ?? 'Unfavorable',
        prediction: pp.prediction ?? '',
        savBindusInHouse: pp.savBindusInHouse ?? 0,
      };
    }

    const st = raw.specialTransits ?? {};

    return {
      transitDate: raw.transitDate
        ? new Date(raw.transitDate).toISOString()
        : new Date().toISOString(),
      natalMoonRashi: raw.natalMoonRashi ?? 0,
      natalMoonRashiName: raw.natalMoonRashiName ?? '—',
      natalLagnaRashi: raw.natalLagnaRashi ?? 0,
      natalLagnaRashiName: raw.natalLagnaRashiName ?? '—',
      overallFavorablePercentage: raw.overallFavorablePercentage ?? 0,
      overallVerdict: raw.overallVerdict ?? '—',
      planets,
      specialTransits: {
        sadeSati: {
          status: Boolean(st.sadeSati?.status),
          phase: st.sadeSati?.phase,
          phaseName: st.sadeSati?.phaseName,
          description: st.sadeSati?.description ?? '',
          saturnRashi: st.sadeSati?.saturnRashi ?? 0,
          moonRashi: st.sadeSati?.moonRashi ?? 0,
        },
        dhaiya: {
          status: Boolean(st.dhaiya?.status),
          type: st.dhaiya?.type,
          typeName: st.dhaiya?.typeName,
          description: st.dhaiya?.description ?? '',
          saturnRashi: st.dhaiya?.saturnRashi ?? 0,
          moonRashi: st.dhaiya?.moonRashi ?? 0,
        },
        chandrashtama: {
          isActive: Boolean(st.chandrashtama?.isActive),
          birthRashi: st.chandrashtama?.birthRashi ?? 0,
          birthRashiName: st.chandrashtama?.birthRashiName ?? '—',
          chandrashtamaRashi: st.chandrashtama?.chandrashtamaRashi ?? 0,
          chandrashtamaRashiName: st.chandrashtama?.chandrashtamaRashiName ?? '—',
          currentMoonRashi: st.chandrashtama?.currentMoonRashi ?? 0,
          currentMoonRashiName: st.chandrashtama?.currentMoonRashiName ?? '—',
        },
        guruGochar: {
          houseFromMoon: st.guruGochar?.houseFromMoon ?? 0,
          status: st.guruGochar?.status ?? '—',
          blessingSummary: st.guruGochar?.blessingSummary ?? '',
          aspectHousesFromMoon: st.guruGochar?.aspectHousesFromMoon ?? [],
        },
        rahuKetuAxis: {
          rahuHouseFromMoon: st.rahuKetuAxis?.rahuHouseFromMoon ?? 0,
          ketuHouseFromMoon: st.rahuKetuAxis?.ketuHouseFromMoon ?? 0,
          karmicImpact: st.rahuKetuAxis?.karmicImpact ?? '',
        },
      },
      lifeAreas: {
        career:        { rating: raw.lifeAreas?.career?.rating ?? '—',        summary: raw.lifeAreas?.career?.summary ?? '' },
        wealth:        { rating: raw.lifeAreas?.wealth?.rating ?? '—',        summary: raw.lifeAreas?.wealth?.summary ?? '' },
        relationships: { rating: raw.lifeAreas?.relationships?.rating ?? '—', summary: raw.lifeAreas?.relationships?.summary ?? '' },
        health:        { rating: raw.lifeAreas?.health?.rating ?? '—',        summary: raw.lifeAreas?.health?.summary ?? '' },
      },
      actionableAdvice: raw.actionableAdvice ?? [],
      formattedSummary: raw.formattedSummary ?? '',
    };
  },

  planet(name: string, kundli: Record<string, any>, at: Date = new Date()): GocharPlanet | null {
    try {
      const raw = lib_getPlanetGochar(name, kundli as unknown as Kundli, at) as any;
      if (!raw) return null;
      return {
        planet: raw.planet ?? name,
        longitude: raw.longitude ?? 0,
        rashi: raw.rashi ?? 0,
        rashiName: raw.rashiName ?? '—',
        degree: raw.degree ?? 0,
        minute: raw.minute ?? 0,
        nakshatra: raw.nakshatra ?? '—',
        nakshatraLord: raw.nakshatraLord ?? '—',
        pada: raw.pada ?? 0,
        isRetrograde: Boolean(raw.isRetrograde),
        houseFromMoon: raw.houseFromMoon ?? 0,
        houseFromLagna: raw.houseFromLagna ?? 0,
        isFavorableFromMoon: Boolean(raw.isFavorableFromMoon),
        hasVedha: Boolean(raw.hasVedha),
        vedhaCausedBy: raw.vedhaCausedBy ?? undefined,
        netStatus: raw.netStatus ?? 'Unfavorable',
        prediction: raw.prediction ?? '',
        savBindusInHouse: raw.savBindusInHouse ?? 0,
      };
    } catch {
      return null;
    }
  },

  sadeSati(moonLon: number, saturnLon: number): SadeSatiResult {
    try {
      const raw = lib_checkSadeSati(moonLon, saturnLon) as any;
      return {
        status: Boolean(raw?.status),
        phase: raw?.phase,
        phaseName: raw?.phaseName,
        description: raw?.description ?? '',
        saturnRashi: raw?.saturnRashi ?? 0,
        moonRashi: raw?.moonRashi ?? 0,
      };
    } catch {
      return { status: false, description: '', saturnRashi: 0, moonRashi: 0 };
    }
  },

  dhaiya(moonLon: number, saturnLon: number): DhaiyaResult {
    try {
      const raw = lib_checkDhaiya(moonLon, saturnLon) as any;
      return {
        status: Boolean(raw?.status),
        type: raw?.type,
        typeName: raw?.typeName,
        description: raw?.description ?? '',
        saturnRashi: raw?.saturnRashi ?? 0,
        moonRashi: raw?.moonRashi ?? 0,
      };
    } catch {
      return { status: false, description: '', saturnRashi: 0, moonRashi: 0 };
    }
  },

  chandrashtama(natalMoonRashi: number, currentMoonRashi: number): ChandrashtamaResult {
    try {
      const raw = lib_getChandrashtama(natalMoonRashi, currentMoonRashi) as any;
      return {
        isActive: Boolean(raw?.isActive),
        birthRashi: raw?.birthRashi ?? 0,
        birthRashiName: raw?.birthRashiName ?? '—',
        chandrashtamaRashi: raw?.chandrashtamaRashi ?? 0,
        chandrashtamaRashiName: raw?.chandrashtamaRashiName ?? '—',
        currentMoonRashi: raw?.currentMoonRashi ?? 0,
        currentMoonRashiName: raw?.currentMoonRashiName ?? '—',
      };
    } catch {
      return {
        isActive: false,
        birthRashi: 0, birthRashiName: '—',
        chandrashtamaRashi: 0, chandrashtamaRashiName: '—',
        currentMoonRashi: 0, currentMoonRashiName: '—',
      };
    }
  },

  tarabalam(birthNakshatra: number, currentNakshatra: number): TarabalamResult {
    try {
      const raw = lib_getTarabalam(birthNakshatra, currentNakshatra) as any;
      return {
        birthNakshatra: raw?.birthNakshatra ?? 0,
        birthNakshatraName: raw?.birthNakshatraName ?? '—',
        currentNakshatra: raw?.currentNakshatra ?? 0,
        currentNakshatraName: raw?.currentNakshatraName ?? '—',
        taraNumber: raw?.taraNumber ?? 0,
        taraName: raw?.taraName ?? '—',
        isAuspicious: Boolean(raw?.isAuspicious),
        description: raw?.description ?? '',
      };
    } catch {
      return {
        birthNakshatra: 0, birthNakshatraName: '—',
        currentNakshatra: 0, currentNakshatraName: '—',
        taraNumber: 0, taraName: '—', isAuspicious: false, description: '',
      };
    }
  },

  dishaShoola(vara: number): DishaShoolaResult {
    try {
      const raw = lib_getDishaShoola(vara) as any;
      return {
        vara: raw?.vara ?? vara,
        varaName: raw?.varaName ?? '—',
        inauspiciousDirection: raw?.inauspiciousDirection ?? '—',
        safeDirections: raw?.safeDirections ?? [],
        remedy: raw?.remedy ?? '',
        description: raw?.description ?? '',
      };
    } catch {
      return {
        vara, varaName: '—', inauspiciousDirection: '—',
        safeDirections: [], remedy: '', description: '',
      };
    }
  },

  /**
   * Convenience — extract the natal Moon & Saturn longitudes directly
   * from a Kundli, then run Sade Sati / Dhaiya checks.
   */
  natalShaniSummary(kundli: Record<string, any>) {
    const moonLon = (kundli?.planets?.Moon?.longitude as number) ?? 0;
    const saturnLon = (kundli?.planets?.Saturn?.longitude as number) ?? 0;
    return {
      sadeSati: this.sadeSati(moonLon, saturnLon),
      dhaiya: this.dhaiya(moonLon, saturnLon),
    };
  },
};

export type GocharAdapter = typeof gocharAdapter;