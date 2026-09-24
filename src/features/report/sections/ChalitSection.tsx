import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { VedicChart } from '@/features/chart/components/VedicChart';
import { buildChalitChartHouses } from '@/features/chart/lib/adapters';
import { prisriJyotish } from '@/infrastructure/astrology/prisri-jyotish.adapter';
import { PLANET_GLYPHS, RASHI_GLYPHS } from '../lib/glyphs';
import { cn } from '@/lib/utils';
import type { ChalitChartData } from '@/domain/astrology/port';

interface ChalitSectionProps {
  kundli: Record<string, any>;
}

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

const HOUSE_NAMES: Record<number, string> = {
  1: 'Self', 2: 'Wealth', 3: 'Siblings', 4: 'Home',
  5: 'Children', 6: 'Enemies', 7: 'Marriage', 8: 'Transformation',
  9: 'Fortune', 10: 'Career', 11: 'Gains', 12: 'Loss',
};

export function ChalitSection({ kundli }: ChalitSectionProps) {
  const { t } = useTranslation();
  const [showCusps, setShowCusps] = useState(false);

  const chalit: ChalitChartData | null = useMemo(() => {
    try {
      return prisriJyotish.getChalit(kundli as any, 'sripati');
    } catch {
      return (kundli.chalit as ChalitChartData) ?? null;
    }
  }, [kundli]);

  const abbrResolver = useMemo(
    () => (planet: string) => {
      if (planet === 'Ascendant') return 'Asc';
      return planet.slice(0, 2);
    },
    []
  );

  const chalitHouses = useMemo(() => {
    if (!chalit) return [];
    return buildChalitChartHouses(chalit, abbrResolver);
  }, [chalit, abbrResolver]);

  if (!chalit || !chalit.planets) {
    return (
      <div className="p-6 text-center text-muted-foreground text-sm border border-dashed rounded-lg">
        {t('chalit.noData', { defaultValue: 'Chalit data is not available for this chart.' })}
      </div>
    );
  }

  const planets = chalit.planets ?? [];
  const cusps = chalit.housesCusps ?? [];
  const shiftedPlanets = planets.filter((p: any) => p.shifted !== 0);

  return (
    <div className="space-y-8">
      {/* ══════════════════════════════════════════════════════ */}
      {/*  INTRODUCTION                                        */}
      {/* ══════════════════════════════════════════════════════ */}
      <div className="rounded-2xl border bg-card p-6 md:p-8 space-y-3">
        <h3
          className="text-xl font-bold leading-tight"
          style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
        >
          {t('chalit.whatIsTitle', { defaultValue: 'What is Bhava Chalit?' })}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
          {t('chalit.whatIsBody', {
            defaultValue:
              'The Rashi (D1) chart places planets by whole sign — every planet in Pisces sits in the Pisces house, regardless of degree. The Chalit chart refines this: it divides the zodiac into actual Bhava boundaries based on the Ascendant\'s exact degree, and re-places every planet in the house it truly occupies. When a planet shifts from its Rashi house to a different Chalit house, its influence moves with it. This is why two Jyotishis can read the same chart and reach different conclusions — one is reading D1, the other Chalit.',
          })}
        </p>
        <p className="text-xs text-muted-foreground italic">
          {t('chalit.methodNote', {
            defaultValue:
              'This chart uses the Sripati method — the classical Parashari system used across North India and Nepal.',
          })}
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════ */}
      {/*  CHART + SHIFTS side by side                         */}
      {/* ══════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
        {/* ─── The Chalit chart ────────────────────────────── */}
        <div className="rounded-2xl border bg-card overflow-hidden">
          <div className="px-6 py-4 border-b bg-gradient-to-r from-primary/[0.04] to-transparent">
            <h3
              className="text-base font-bold leading-tight"
              style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
            >
              {t('chalit.chartTitle', { defaultValue: 'Chalit Chart' })}
            </h3>
            <p className="text-[11px] text-muted-foreground mt-1">
              {t('chalit.chartHint', {
                defaultValue: 'Planets in their actual Bhava boundaries (Sripati method).',
              })}
            </p>
          </div>

          <div className="p-6 flex justify-center">
            <VedicChart
              key="chalit-sripati"
              size={380}
              houses={chalitHouses}
              defaultStyle="north"
              hideToggle
            />
          </div>
        </div>

        {/* ─── House Shifts ────────────────────────────────── */}
        <div className="rounded-2xl border bg-card overflow-hidden">
          <div className="px-6 py-4 border-b bg-gradient-to-r from-primary/[0.04] to-transparent">
            <h3
              className="text-base font-bold leading-tight"
              style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
            >
              {t('chalit.shiftsTitle', { defaultValue: 'House Shifts' })}
            </h3>
            <p className="text-[11px] text-muted-foreground mt-1">
              {t('chalit.shiftsHint', {
                defaultValue: 'Planets whose Chalit house differs from their Rashi house.',
              })}
            </p>
          </div>

          <div className="p-4 space-y-3">
            {shiftedPlanets.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">
                {t('chalit.noShifts', {
                  defaultValue:
                    'No planets shift between Rashi and Chalit. Every planet sits in its expected house.',
                })}
              </p>
            ) : (
              shiftedPlanets.map((p: any) => {
                const direction = p.shifted > 0 ? 'forward' : 'backward';
                return (
                  <div
                    key={p.name}
                    className="rounded-xl border border-amber-500/30 bg-amber-500/[0.05] p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="text-2xl leading-none"
                          style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
                        >
                          {PLANET_GLYPHS[p.name] ?? '·'}
                        </span>
                        <div>
                          <p className="text-sm font-bold leading-tight">{p.name}</p>
                          <p className="text-[10px] text-muted-foreground">{p.rashiName}</p>
                        </div>
                      </div>
                      <span className="text-[10px] uppercase tracking-wider text-amber-700 dark:text-amber-400 font-semibold">
                        {direction}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 pt-2 border-t border-amber-500/20">
                      <div className="flex-1 text-center">
                        <p className="text-[9px] uppercase tracking-wider text-muted-foreground">
                          D1
                        </p>
                        <p className="text-lg font-bold">{ROMAN[p.rashiHouse - 1]}</p>
                        <p className="text-[10px] text-muted-foreground">
                          {HOUSE_NAMES[p.rashiHouse]}
                        </p>
                      </div>
                      <span className="text-xl text-amber-600 dark:text-amber-400">→</span>
                      <div className="flex-1 text-center">
                        <p className="text-[9px] uppercase tracking-wider text-muted-foreground">
                          Chalit
                        </p>
                        <p className="text-lg font-bold text-amber-700 dark:text-amber-400">
                          {ROMAN[p.house - 1]}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          {HOUSE_NAMES[p.house]}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════ */}
      {/*  PLANETARY PLACEMENT TABLE                          */}
      {/* ══════════════════════════════════════════════════════ */}
      <div className="rounded-2xl border bg-card overflow-hidden">
        <div className="px-6 py-4 border-b bg-gradient-to-r from-primary/[0.04] to-transparent">
          <h3
            className="text-base font-bold leading-tight"
            style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
          >
            {t('chalit.tableTitle', { defaultValue: 'Planetary Placement' })}
          </h3>
          <p className="text-[11px] text-muted-foreground mt-1">
            {t('chalit.tableHint', {
              defaultValue:
                'Every planet, its Rashi house, its Chalit house, and how far into the Chalit house it sits.',
            })}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-muted-foreground">
                <th className="text-left px-6 py-3 font-medium text-[10px] uppercase tracking-wider">
                  {t('chalit.colPlanet', { defaultValue: 'Planet' })}
                </th>
                <th className="text-left px-4 py-3 font-medium text-[10px] uppercase tracking-wider">
                  {t('chalit.colSign', { defaultValue: 'Sign' })}
                </th>
                <th className="text-center px-4 py-3 font-medium text-[10px] uppercase tracking-wider">
                  {t('chalit.colRashiHouse', { defaultValue: 'Rashi House' })}
                </th>
                <th className="text-center px-4 py-3 font-medium text-[10px] uppercase tracking-wider">
                  {t('chalit.colChalitHouse', { defaultValue: 'Chalit House' })}
                </th>
                <th className="text-center px-4 py-3 font-medium text-[10px] uppercase tracking-wider">
                  {t('chalit.colPosition', { defaultValue: 'Position' })}
                </th>
                <th className="text-right px-6 py-3 font-medium text-[10px] uppercase tracking-wider">
                  {t('chalit.colStatus', { defaultValue: 'Status' })}
                </th>
              </tr>
            </thead>
            <tbody>
              {planets.map((p: any) => {
                const shifted = p.shifted !== 0;
                return (
                  <tr
                    key={p.name}
                    className="border-b last:border-none hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="text-lg leading-none"
                          style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
                        >
                          {PLANET_GLYPHS[p.name] ?? '·'}
                        </span>
                        <span className="font-medium">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="text-base leading-none"
                          style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
                        >
                          {RASHI_GLYPHS[p.rashiName] ?? '·'}
                        </span>
                        <span>{p.rashiName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center font-mono">{ROMAN[p.rashiHouse - 1]}</td>
                    <td
                      className={cn(
                        'px-4 py-3 text-center font-mono font-semibold',
                        shifted && 'text-amber-700 dark:text-amber-400'
                      )}
                    >
                      {ROMAN[p.house - 1]}
                    </td>
                    <td className="px-4 py-3 text-center font-mono text-xs text-muted-foreground">
                      {p.housePositionDegree}° {String(p.housePositionMinute ?? 0).padStart(2, '0')}′
                    </td>
                    <td className="px-6 py-3 text-right">
                      {shifted ? (
                        <span className="text-[10px] uppercase tracking-wider text-amber-700 dark:text-amber-400 font-semibold">
                          {p.shifted > 0 ? 'Forward' : 'Backward'}
                        </span>
                      ) : (
                        <span className="text-[10px] text-muted-foreground">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════ */}
      {/*  HOUSE CUSPS — collapsible                           */}
      {/* ══════════════════════════════════════════════════════ */}
      {cusps.length > 0 && (
        <div className="rounded-2xl border bg-card overflow-hidden">
          <button
            type="button"
            onClick={() => setShowCusps((v) => !v)}
            className="w-full px-6 py-4 border-b bg-gradient-to-r from-primary/[0.04] to-transparent flex items-center justify-between gap-3 hover:bg-primary/[0.06] transition-colors text-left"
          >
            <div>
              <h3
                className="text-base font-bold leading-tight"
                style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
              >
                {t('chalit.cuspsTitle', { defaultValue: 'House Cusps' })}
              </h3>
              <p className="text-[11px] text-muted-foreground mt-1">
                {t('chalit.cuspsHint', {
                  defaultValue:
                    'The exact start and end degrees of each Bhava boundary. Useful when a planet sits near a cusp.',
                })}
              </p>
            </div>
            <span className="text-muted-foreground text-sm shrink-0">
              {showCusps ? '▴' : '▾'}
            </span>
          </button>

          {showCusps && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-muted-foreground">
                    <th className="text-left px-6 py-3 font-medium text-[10px] uppercase tracking-wider">
                      {t('chalit.cuspHouse', { defaultValue: 'House' })}
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-[10px] uppercase tracking-wider">
                      {t('chalit.cuspSign', { defaultValue: 'Sign' })}
                    </th>
                    <th className="text-right px-4 py-3 font-medium text-[10px] uppercase tracking-wider">
                      {t('chalit.cuspStart', { defaultValue: 'Start' })}
                    </th>
                    <th className="text-right px-4 py-3 font-medium text-[10px] uppercase tracking-wider">
                      {t('chalit.cuspEnd', { defaultValue: 'End' })}
                    </th>
                    <th className="text-right px-6 py-3 font-medium text-[10px] uppercase tracking-wider">
                      {t('chalit.cuspSpan', { defaultValue: 'Span' })}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cusps.map((c: any, idx: number) => {
                    const houseNum = c.houseNumber ?? idx + 1;
                    const span =
                      ((c.endLongitude ?? 0) - (c.startLongitude ?? 0) + 360) % 360;
                    return (
                      <tr
                        key={houseNum}
                        className="border-b last:border-none hover:bg-muted/30 transition-colors"
                      >
                        <td className="px-6 py-3">
                          <span className="font-mono text-sm">{ROMAN[houseNum - 1]}</span>
                          <span className="text-xs text-muted-foreground ml-2">
                            {HOUSE_NAMES[houseNum]}
                          </span>
                        </td>
                        <td className="px-4 py-3">{c.rashiName ?? '—'}</td>
                        <td className="px-4 py-3 text-right font-mono text-xs">
                          {(c.startLongitude ?? 0).toFixed(2)}°
                        </td>
                        <td className="px-4 py-3 text-right font-mono text-xs">
                          {(c.endLongitude ?? 0).toFixed(2)}°
                        </td>
                        <td className="px-6 py-3 text-right font-mono text-xs">
                          {span.toFixed(2)}°
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
