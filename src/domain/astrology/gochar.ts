/**
 * Types for Vedic Gochar (planetary transit) analysis.
 * These mirror the shape returned by @prisri/jyotish but are
 * decoupled so the domain layer never imports the library directly.
 */

export type GocharNetStatus = 'favorable' | 'unfavorable' | 'neutral' | string;
export type GocharRating = 'excellent' | 'good' | 'neutral' | 'challenging' | 'difficult' | string;

export interface GocharPlanet {
  planet: string;
  rashi: number;
  rashiName: string;
  degree?: number;
  minute?: number;
  houseFromMoon: number;
  houseFromLagna: number;
  netStatus: GocharNetStatus;
  hasVedha: boolean;
  vedhaPlanet?: string | null;
  vedhaExempted?: boolean;
  prediction?: string;
}

export interface GocharSadeSati {
  status: 'active' | 'inactive' | 'approaching' | string;
  phase?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  description?: string;
}

export interface GocharDhaiya {
  status: 'active' | 'inactive' | string;
  type?: 'Fourth' | 'Eighth' | string | null;
  description?: string;
}

export interface GocharGuruTransit {
  rashiName?: string;
  houseFromMoon?: number;
  blessingSummary?: string;
  isExalted?: boolean;
  isDebilitated?: boolean;
}

export interface GocharSpecialTransits {
  sadeSati: GocharSadeSati;
  dhaiya?: GocharDhaiya;
  guruGochar: GocharGuruTransit;
}

export interface GocharLifeArea {
  rating: GocharRating;
  score?: number;
  summary: string;
}

export interface GocharLifeAreas {
  career: GocharLifeArea;
  wealth: GocharLifeArea;
  health: GocharLifeArea;
  relationships: GocharLifeArea;
  education?: GocharLifeArea;
  family?: GocharLifeArea;
  spiritual?: GocharLifeArea;
  [key: string]: GocharLifeArea | undefined;
}

export interface GocharAnalysis {
  overallVerdict: string;
  overallFavorablePercentage: number;
  planets: Record<string, GocharPlanet>;
  specialTransits: GocharSpecialTransits;
  lifeAreas: GocharLifeAreas;
  calculatedAt: string;
}

export interface ChandrashtamaResult {
  isActive: boolean;
  description?: string;
  moonRashiName?: string;
  natalMoonRashiName?: string;
}

export interface TarabalamResult {
  taraName: string;
  taraNumber?: number;
  isAuspicious: boolean;
  description: string;
}

export interface DishaShoolaResult {
  varaName: string;
  varaNumber: number;
  inauspiciousDirection: string;
}