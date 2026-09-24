import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { buildChartHouses, buildVargaHouses } from './adapters';
import type { ChartHouse } from '../types';

const d1Cache = new WeakMap<object, ChartHouse[]>();

export function useChartHouses(
  kundli: Record<string, any> | null,
  vargaCode: string
): ChartHouse[] {
  const { t, i18n } = useTranslation();

  const abbrResolver = useMemo(
    () => (planet: string) => {
      if (planet === 'Ascendant') return t('chart.planetAbbr.ascendant', { defaultValue: 'Asc' });
      return t(`chart.planetAbbr.${planet.toLowerCase()}`, { defaultValue: planet.slice(0, 2) });
    },
    [t, i18n.resolvedLanguage]
  );

  return useMemo(() => {
    if (!kundli) return [];
    if (vargaCode === 'd1') {
      const cached = d1Cache.get(kundli);
      if (cached) return cached;
      const built = buildChartHouses(kundli, { resolveAbbr: abbrResolver });
      d1Cache.set(kundli, built);
      return built;
    }
    return buildVargaHouses(kundli, vargaCode, { resolveAbbr: abbrResolver });
  }, [kundli, vargaCode, abbrResolver]);
}
