import { useMemo } from 'react';
import type { BirthData } from '@/domain/astrology/birth-data';
import type { UserLocation } from '@/lib/user-location';
import { getCachedKundli } from '@/lib/kundli-cache';
import { gocharAdapter, type GocharAnalysis } from '@/infrastructure/astrology/gochar.adapter';
import { calculateNowPanchang, type PanchangData } from '@/infrastructure/astrology/panchang.adapter';
import { useLibraryForProfile } from '@/features/ai-reading/store';
import { listSituations } from '@/ai/core';

export interface DashboardData {
  kundli: any | null;
  gochar: GocharAnalysis | null;
  panchang: PanchangData | null;
  readingsCount: number;
  suggestedCategoryId: string | null;
  errors: string[];
}

/**
 * @param profile  Birth profile — drives the natal chart.
 * @param location Current location — drives the panchang and greeting.
 */
export function useDashboardData(
  profile: BirthData,
  location: UserLocation
): DashboardData {
  const library = useLibraryForProfile(profile);

  const chart = useMemo(() => {
    const errors: string[] = [];
    const kundli = getCachedKundli(profile);
    if (!kundli) {
      errors.push('chart');
      return { kundli: null, gochar: null, errors };
    }

    let gochar: GocharAnalysis | null = null;
    try {
      gochar = gocharAdapter.analyze(kundli, new Date());
    } catch {
      errors.push('gochar');
    }

    return { kundli, gochar, errors };
  }, [profile]);

  const panchang = useMemo(() => {
    try {
      return calculateNowPanchang(location);
    } catch {
      return null;
    }
  }, [location.id, location.lat, location.lon, location.timezone]);

  const readingsCount = Object.keys(library).length;
  const generatedIds = new Set(Object.keys(library));
  const next = listSituations().map((x) => x.situation).find((s) => !generatedIds.has(s.id));

  return {
    kundli: chart.kundli,
    gochar: chart.gochar,
    panchang,
    readingsCount,
    suggestedCategoryId: next ? next.id : null,
    errors: chart.errors,
  };
}