import {
  getCareerPrediction as lib_career,
  getWealthPrediction as lib_wealth,
  getMarriagePrediction as lib_marriage,
  getRemedies as lib_remedies,
  getChalitAnalysis as lib_chalit,
  getKpAnalysis as lib_kp,
  getLalKitabAnalysis as lib_lalKitab,
  getJaiminiKarakas as lib_jaimini,
  getComprehensiveReport as lib_comprehensive,
} from '@prisri/jyotish';
import type { Kundli } from '@prisri/jyotish';

// ─────────────────────────────────────────────────────────────
// Types — mirror the library's real return shapes.
// ─────────────────────────────────────────────────────────────

export interface TenthHouseDetails {
  rashi: string;
  rashiLord: string;
  lordPlacementHouse: number;
  planetsIn10th: string[];
  savBindus: number;
}

export interface CareerPrediction {
  recommendation: string;
  jobScore: number;
  businessScore: number;
  dominantTraits: string[];
  suitableFields: string[];
  tenthHouseDetails: TenthHouseDetails;
  leadershipCapacity: string;
  strategicAdvice: string[];
  tenthLordPlacementResult: string;
  amatyakarakaInsight: string;
  panchaMahapurushaYoga?: string;
  chalitInsight: string;
  kpInsight: string;
  lalKitabInsight: string;
}

export interface SavMetrics {
  incomeHouse11Bindus: number;
  expenditureHouse12Bindus: number;
  wealthHouse2Bindus: number;
  surplusRatio: number;
}

export interface DhanaYoga {
  name: string;
  description: string;
  strength: string;
}

export interface WealthPrediction {
  wealthRating: string;
  incomePotential: number;
  savingCapacity: string;
  savMetrics: SavMetrics;
  dhanaYogas: DhanaYoga[];
  vipreetRajYogas: string[];
  secondLordPlacementResult: string;
  eleventhLordPlacementResult: string;
  bestWealthSources: string[];
  financialCautions: string[];
  chalitInsight: string;
  kpInsight: string;
  lalKitabInsight: string;
}

export interface PartnerCharacteristics {
  nature: string;
  dominantTraits: string[];
  directionOrBackground: string;
}

export interface MarriageType {
  recommendation: string;
  loveScore: number;
  arrangedScore: number;
  isIntercasteLikely: boolean;
  intercasteProbability: number;
  keyIndicators: string[];
}

export interface MangalDosha {
  hasDosha: boolean;
  isCancelled: boolean;
  description: string;
}

export interface SpouseAgeDifference {
  relativeAge: string;
  estimatedDifferenceYears: string;
  minGapYears: number;
  maxGapYears: number;
  partnerIsOlder: boolean;
  maturityLevel: string;
  unconventionalGapLikely: boolean;
  reason: string;
  genderPerspective: {
    ifMaleNative: string;
    ifFemaleNative: string;
  };
}

export interface MarriagePrediction {
  maritalHarmonyRating: string;
  favorableAgeRange: string;
  predictedTimingYears: number[];
  currentDashaFavorableForMarriage: boolean;
  dashaSupportExplanation: string;
  partnerCharacteristics: PartnerCharacteristics;
  marriageType: MarriageType;
  mangalDosha: MangalDosha;
  spouseAgeDifference: SpouseAgeDifference;
  relationshipAdvice: string[];
  seventhLordPlacementResult: string;
  darakarakaInsight: string;
  chalitInsight: string;
  kpInsight: string;
  lalKitabInsight: string;
}

export interface JaiminiKaraka {
  planet: string;
  degreeInSign: number;
  formattedDegree: string;
  rashiName: string;
  house: number;
  role: string;
  signification: string;
}

export interface JaiminiKarakas {
  atmakaraka: JaiminiKaraka;
  amatyakaraka: JaiminiKaraka;
  bhratrikaraka: JaiminiKaraka;
  matrikaraka: JaiminiKaraka;
  putrakaraka: JaiminiKaraka;
  gnatikaraka: JaiminiKaraka;
  darakaraka: JaiminiKaraka;
}

export interface ShiftedPlanet {
  planet: string;
  d1House: number;
  chalitBhava: number;
  shiftDirection: string;
  impact: string;
}

export interface ChalitAnalysis {
  shiftedPlanets: ShiftedPlanet[];
  actualHouseOccupants: Record<number, string[]>;
  keyBhavaInsights: string[];
}

export interface CuspSubLord {
  cuspNumber: number;
  subLord: string;
  starLord: string;
}

export interface KpAnalysis {
  cuspSubLords: CuspSubLord[];
  careerCusp10: {
    subLord: string;
    starLord: string;
    significationVerdict: string;
  };
  marriageCusp7: {
    subLord: string;
    starLord: string;
    marriagePromise: string;
    typeIndication: string;
  };
  wealthCusps: {
    cusp2SubLord: string;
    cusp11SubLord: string;
    financialSignification: string;
  };
}

export interface KismatKaGrah {
  planet: string;
  house: number;
  role: string;
}

export interface LalKitabSpecialYoga {
  name: string;
  planets: string[];
  house: number;
  effect: string;
}

export interface KarmicDebt {
  debtType: string;
  isAfflicted: boolean;
  description: string;
  remedy: string;
}

export interface LalKitabRemedy {
  area: string;
  remedy: string;
  caution: string;
}

export interface LalKitabAnalysis {
  tevaType: string;
  kismatKaGrah: KismatKaGrah;
  sleepingHouses: number[];
  awakenedHouses: number[];
  specialYogas: LalKitabSpecialYoga[];
  karmicDebts: KarmicDebt[];
  lalKitabRemedies: LalKitabRemedy[];
}

export interface WeakHouse {
  house: number;
  rashi: string;
  bindus: number;
  impact: string;
}

export interface DoAndDont {
  dos: string[];
  donts: string[];
}

export interface Mantra {
  deity: string;
  mantra: string;
  count: string;
  benefit: string;
}

export interface RemedyItem {
  area: string;
  house: number;
  reason: string;
  remedyType: string;
  title: string;
  instructions: string;
}

export interface Remedies {
  weakHousesIdentified: WeakHouse[];
  practicalDoAndDonts: DoAndDont[];
  mantras: Mantra[];
  lifestyleHabits: string[];
  remedyList: RemedyItem[];
  lalKitabRemedies: LalKitabRemedy[];
}

export interface ComprehensiveReport {
  summary: string;
  career: CareerPrediction;
  wealth: WealthPrediction;
  marriage: MarriagePrediction;
  remedies: Remedies;
  chalitAnalysis: ChalitAnalysis;
  kpAnalysis: KpAnalysis;
  lalKitabAnalysis: LalKitabAnalysis;
  jaiminiKarakas: JaiminiKarakas;
  formattedMarkdown: string;
}

export class PredictionsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PredictionsError';
  }
}

// ─────────────────────────────────────────────────────────────
// Adapter
// ─────────────────────────────────────────────────────────────

export const predictionsAdapter = {
  career(k: Record<string, any>): CareerPrediction {
    try {
      return lib_career(k as unknown as Kundli) as CareerPrediction;
    } catch (e) {
      throw new PredictionsError((e as Error).message ?? 'Career prediction failed.');
    }
  },

  wealth(k: Record<string, any>): WealthPrediction {
    try {
      return lib_wealth(k as unknown as Kundli) as WealthPrediction;
    } catch (e) {
      throw new PredictionsError((e as Error).message ?? 'Wealth prediction failed.');
    }
  },

  marriage(k: Record<string, any>): MarriagePrediction {
    try {
      return lib_marriage(k as unknown as Kundli) as MarriagePrediction;
    } catch (e) {
      throw new PredictionsError((e as Error).message ?? 'Marriage prediction failed.');
    }
  },

  jaimini(k: Record<string, any>): JaiminiKarakas {
    try {
      return lib_jaimini(k as unknown as Kundli) as JaiminiKarakas;
    } catch (e) {
      throw new PredictionsError((e as Error).message ?? 'Jaimini analysis failed.');
    }
  },

  chalit(k: Record<string, any>): ChalitAnalysis {
    try {
      return lib_chalit(k as unknown as Kundli) as ChalitAnalysis;
    } catch (e) {
      throw new PredictionsError((e as Error).message ?? 'Chalit analysis failed.');
    }
  },

  kp(k: Record<string, any>): KpAnalysis {
    try {
      return lib_kp(k as unknown as Kundli) as KpAnalysis;
    } catch (e) {
      throw new PredictionsError((e as Error).message ?? 'KP analysis failed.');
    }
  },

  lalKitab(k: Record<string, any>): LalKitabAnalysis {
    try {
      return lib_lalKitab(k as unknown as Kundli) as LalKitabAnalysis;
    } catch (e) {
      throw new PredictionsError((e as Error).message ?? 'Lal Kitab analysis failed.');
    }
  },

  remedies(k: Record<string, any>): Remedies {
    try {
      return lib_remedies(k as unknown as Kundli) as Remedies;
    } catch (e) {
      throw new PredictionsError((e as Error).message ?? 'Remedies calculation failed.');
    }
  },

  comprehensive(k: Record<string, any>): ComprehensiveReport {
    try {
      return lib_comprehensive(k as unknown as Kundli) as ComprehensiveReport;
    } catch (e) {
      throw new PredictionsError((e as Error).message ?? 'Comprehensive report failed.');
    }
  },
};

export type PredictionsAdapter = typeof predictionsAdapter;