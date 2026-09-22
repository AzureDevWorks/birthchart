import {
  matchKundli as lib_matchKundli,
  checkMangalDosha as lib_checkMangalDosha,
} from '@prisri/jyotish';
import type { Kundli } from '@prisri/jyotish';
import type { BirthData } from '@/domain/astrology/birth-data';
import { prisriJyotish } from './prisri-jyotish.adapter';

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

export interface KootaScore {
  name: string;
  score: number;
  maxScore: number;
  boy: string;
  girl: string;
  description: string;
  area: string;
}

export interface MangalDoshaDetail {
  hasDosha: boolean;
  isHigh: boolean;
  description: string;
}

export interface MatchingResult {
  totalScore: number;
  maxScore: number;                  // 36
  kootas: KootaScore[];
  dosha: {
    boy: MangalDoshaDetail;
    girl: MangalDoshaDetail;
  };
  verdict: string;
}

export class MatchingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MatchingError';
  }
}

// ─────────────────────────────────────────────────────────────
// Adapter
// ─────────────────────────────────────────────────────────────

export const matchingAdapter = {
  /**
   * Compute Guna Milan + Mangal Dosha for two birth data records.
   * Internally computes both kundlis and delegates to the library.
   */
  compare(a: BirthData, b: BirthData): MatchingResult {
    try {
      const kundliA = prisriJyotish.calculate(a) as unknown as Kundli;
      const kundliB = prisriJyotish.calculate(b) as unknown as Kundli;
      return this.compareKundlis(kundliA, kundliB);
    } catch (e) {
      throw new MatchingError(
        (e as Error).message ?? 'Matching failed.'
      );
    }
  },

  /**
   * Direct kundli comparison — useful if the kundlis already exist.
   */
  compareKundlis(kundliA: Kundli, kundliB: Kundli): MatchingResult {
    let raw: any;
    try {
      raw = lib_matchKundli(kundliA, kundliB);
    } catch (e) {
      throw new MatchingError((e as Error).message ?? 'matchKundli failed.');
    }

    if (!raw || !raw.ashtakoot) {
      throw new MatchingError('Matching returned no ashtakoot data.');
    }

    const kootas: KootaScore[] = (raw.ashtakoot.kootas ?? []).map((k: any) => ({
      name: String(k.name ?? ''),
      score: Number(k.score ?? 0),
      maxScore: Number(k.maxScore ?? 0),
      boy: String(k.boy ?? ''),
      girl: String(k.girl ?? ''),
      description: String(k.description ?? ''),
      area: String(k.area ?? ''),
    }));

    const doshaBoy: MangalDoshaDetail = {
      hasDosha: Boolean(raw.dosha?.boy?.hasDosha),
      isHigh: Boolean(raw.dosha?.boy?.isHigh),
      description: String(raw.dosha?.boy?.description ?? ''),
    };

    const doshaGirl: MangalDoshaDetail = {
      hasDosha: Boolean(raw.dosha?.girl?.hasDosha),
      isHigh: Boolean(raw.dosha?.girl?.isHigh),
      description: String(raw.dosha?.girl?.description ?? ''),
    };

    return {
      totalScore: Number(raw.ashtakoot.totalScore ?? 0),
      maxScore: 36,
      kootas,
      dosha: { boy: doshaBoy, girl: doshaGirl },
      verdict: String(raw.verdict ?? ''),
    };
  },

  /**
   * Standalone Mangal Dosha check for a single chart.
   */
  mangalDosha(kundli: Kundli): MangalDoshaDetail {
    try {
      const raw = lib_checkMangalDosha(kundli) as any;
      return {
        hasDosha: Boolean(raw?.hasDosha),
        isHigh: Boolean(raw?.isHigh),
        description: String(raw?.description ?? ''),
      };
    } catch {
      return { hasDosha: false, isHigh: false, description: 'Not available' };
    }
  },
};

export type MatchingAdapter = typeof matchingAdapter;