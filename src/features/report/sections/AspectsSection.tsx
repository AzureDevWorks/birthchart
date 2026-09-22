import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { PLANET_GLYPHS } from '../lib/glyphs';
import {
  ASPECT_RULES,
  ASPECT_TYPE_MEANING,
} from '../lib/aspect-info';

interface AspectsSectionProps {
  kundli: Record<string, any>;
}

const PLANET_ORDER = [
  'Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter',
  'Venus', 'Saturn', 'Rahu', 'Ketu',
];

export function AspectsSection({ kundli }: AspectsSectionProps) {
  const { t } = useTranslation();
  const dr = kundli.drishti ?? {};
  const planetAspects = dr.planetAspects ?? {};
  const mutual = dr.mutualAspects ?? [];

  // Build a matrix: planet -> set of houses it aspects
  const aspectMatrix = useMemo(() => {
    const matrix: Record<string, Set<number>> = {};
    for (const planet of PLANET_ORDER) {
      const a = planetAspects[planet];
      matrix[planet] = new Set(
        (a?.aspectedHouses ?? []).map((h: any) => h.house)
      );
    }
    return matrix;
  }, [planetAspects]);

  if (Object.keys(planetAspects).length === 0 && mutual.length === 0) {
    return (
      <div className="p-6 text-center text-muted-foreground text-sm border border-dashed rounded-lg">
        {t('aspects.noData', { defaultValue: 'Aspect data is not available for this chart.' })}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* ══════════════════════════════════════════════════════ */}
      {/*  INTRODUCTION                                        */}
      {/* ══════════════════════════════════════════════════════ */}
      <div className="rounded-2xl border bg-card p-6 md:p-8 space-y-4">
        <div>
          <h3
            className="text-xl font-bold leading-tight"
            style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
          >
            {t('aspects.whatIsTitle', { defaultValue: 'What is Graha Drishti?' })}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed max-w-3xl">
            {t('aspects.whatIsBody', {
              defaultValue:
                'In Vedic astrology, every planet casts its glance — its drishti — on other houses of the chart. This is not mere influence; it is the planet\'s way of reaching out, examining, and modifying whatever it sees. Aspect is one of the most powerful tools for understanding how a chart actually functions. A planet is not only defined by where it sits, but by what it looks at.',
            })}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          <div className="rounded-lg border border-border/60 bg-background/50 p-3">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
              {t('aspects.ruleLabel', { defaultValue: 'Rule' })}
            </p>
            <p className="text-sm text-foreground/85 leading-snug">
              Every planet has a <strong>7th-house aspect</strong> — the full opposite house.
            </p>
          </div>
          <div className="rounded-lg border border-border/60 bg-background/50 p-3">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
              {t('aspects.special', { defaultValue: 'Special' })}
            </p>
            <p className="text-sm text-foreground/85 leading-snug">
              <strong>Mars</strong>, <strong>Jupiter</strong>, and <strong>Saturn</strong> have extra aspects. Rahu and Ketu mirror Jupiter.
            </p>
          </div>
          <div className="rounded-lg border border-border/60 bg-background/50 p-3">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
              {t('aspects.strength', { defaultValue: 'Strength' })}
            </p>
            <p className="text-sm text-foreground/85 leading-snug">
              <strong>7th</strong> is the strongest. <strong>3rd/10th</strong> are the mildest. Grahas aspect the exact degree of a point.
            </p>
          </div>
          <div className="rounded-lg border border-border/60 bg-background/50 p-3">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
              {t('aspects.why', { defaultValue: 'Why it matters' })}
            </p>
            <p className="text-sm text-foreground/85 leading-snug">
              Aspects tell you <strong>who is watching whom</strong> — and that interaction shapes what actually happens.
            </p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════ */}
      {/*  THE ASPECT RULES TABLE                              */}
      {/* ══════════════════════════════════════════════════════ */}
      <div className="rounded-2xl border bg-card overflow-hidden">
        <div className="px-6 py-4 border-b bg-gradient-to-r from-primary/[0.04] to-transparent">
          <h3
            className="text-base font-bold leading-tight"
            style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
          >
            {t('aspects.rulesTitle', { defaultValue: 'Classical Aspect Rules' })}
          </h3>
          <p className="text-[11px] text-muted-foreground mt-1">
            {t('aspects.rulesHint', {
              defaultValue: 'Every planet has aspects. Some have special ones.',
            })}
          </p>
        </div>

        <div className="divide-y">
          {ASPECT_RULES.map((rule) => {
            const hasSpecial = rule.houses.length > 1;
            return (
              <div
                key={rule.planet}
                className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-6 py-3"
              >
                {/* Planet */}
                <div className="flex items-center gap-2 min-w-[110px]">
                  <span
                    className="text-xl leading-none"
                    style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
                  >
                    {PLANET_GLYPHS[rule.planet] ?? '·'}
                  </span>
                  <strong className="text-sm">{rule.planet}</strong>
                </div>

                {/* Aspect houses */}
                <div className="flex flex-wrap gap-1.5">
                  {rule.houses.map((h) => (
                    <span
                      key={h}
                      className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded font-mono ${
                        hasSpecial
                          ? 'bg-primary/10 text-primary'
                          : 'bg-muted/60 text-muted-foreground'
                      }`}
                    >
                      {h}
                      {h === 1 ? 'st' : h === 2 ? 'nd' : h === 3 ? 'rd' : 'th'}
                    </span>
                  ))}
                </div>

                {/* Meaning */}
                <p className="text-xs text-muted-foreground hidden md:block max-w-[200px] text-right">
                  {rule.meaning}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════ */}
      {/*  ASPECT MATRIX — visual overview                     */}
      {/* ══════════════════════════════════════════════════════ */}
      <div className="rounded-2xl border bg-card overflow-hidden">
        <div className="px-6 py-4 border-b bg-gradient-to-r from-primary/[0.04] to-transparent">
          <h3
            className="text-base font-bold leading-tight"
            style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
          >
            {t('aspects.matrixTitle', { defaultValue: 'Aspect Matrix' })}
          </h3>
          <p className="text-[11px] text-muted-foreground mt-1">
            {t('aspects.matrixHint', {
              defaultValue:
                'Which planets aspect which houses in this chart. Dots mark active aspects.',
            })}
          </p>
        </div>

        <div className="p-6 overflow-x-auto">
          <div className="inline-block min-w-full">
            {/* Header row — houses */}
            <div className="grid" style={{ gridTemplateColumns: '110px repeat(12, minmax(34px, 1fr))' }}>
              <div />
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((h) => (
                <div
                  key={h}
                  className="text-center text-[10px] font-mono text-muted-foreground pb-2"
                >
                  H{h}
                </div>
              ))}
            </div>

            {/* Data rows */}
            {PLANET_ORDER.map((planet) => {
              const a = planetAspects[planet];
              if (!a) return null;
              const houses = aspectMatrix[planet];

              return (
                <div
                  key={planet}
                  className="grid items-center"
                  style={{ gridTemplateColumns: '110px repeat(12, minmax(34px, 1fr))' }}
                >
                  {/* Planet label */}
                  <div className="flex items-center gap-2 py-1.5">
                    <span
                      className="text-base leading-none"
                      style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
                    >
                      {PLANET_GLYPHS[planet] ?? '·'}
                    </span>
                    <span className="text-xs font-medium">{planet}</span>
                  </div>

                  {/* Aspect cells */}
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((h) => {
                    const isAspected = houses.has(h);
                    return (
                      <div
                        key={h}
                        className="flex items-center justify-center py-1.5"
                      >
                        {isAspected ? (
                          <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                        ) : (
                          <span className="w-1 h-1 rounded-full bg-muted-foreground/15" />
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}

            {/* Legend */}
            <div className="flex items-center gap-4 pt-3 mt-3 border-t text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                Aspect active
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                No aspect
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════ */}
      {/*  MUTUAL ASPECTS — most significant pairs             */}
      {/* ══════════════════════════════════════════════════════ */}
      {mutual.length > 0 && (
        <div className="rounded-2xl border bg-card overflow-hidden">
          <div className="px-6 py-4 border-b bg-gradient-to-r from-primary/[0.04] to-transparent">
            <h3
              className="text-base font-bold leading-tight"
              style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
            >
              {t('aspects.mutualTitle', { defaultValue: 'Mutual Aspects' })}
            </h3>
            <p className="text-[11px] text-muted-foreground mt-1">
              {t('aspects.mutualHint', {
                defaultValue:
                  'The most significant connections — two planets looking at each other.',
              })}
            </p>
          </div>

          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {mutual.map((m: any, i: number) => (
              <div
                key={i}
                className="rounded-xl border border-primary/30 bg-primary/[0.04] p-4 space-y-2"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xl leading-none"
                      style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
                    >
                      {PLANET_GLYPHS[m.planet1] ?? '·'}
                    </span>
                    <strong className="text-sm">{m.planet1}</strong>
                  </div>
                  <span className="text-primary text-lg">↔</span>
                  <div className="flex items-center gap-2">
                    <strong className="text-sm">{m.planet2}</strong>
                    <span
                      className="text-xl leading-none"
                      style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
                    >
                      {PLANET_GLYPHS[m.planet2] ?? '·'}
                    </span>
                  </div>
                </div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground text-center">
                  {m.planet1AspectOnPlanet2} ↔ {m.planet2AspectOnPlanet1}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════ */}
      {/*  PER-PLANET DETAIL CARDS                             */}
      {/* ══════════════════════════════════════════════════════ */}
      <div className="space-y-4">
        <div>
          <h3
            className="text-base font-bold leading-tight"
            style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
          >
            {t('aspects.detailTitle', { defaultValue: 'Planet-by-Planet' })}
          </h3>
          <p className="text-[11px] text-muted-foreground mt-1">
            {t('aspects.detailHint', {
              defaultValue: 'What each planet looks at, and what it means.',
            })}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {PLANET_ORDER.map((planet) => {
            const a = planetAspects[planet];
            if (!a) return null;
            const houses = a.aspectedHouses ?? [];
            const planets = a.aspectedPlanets ?? [];
            if (houses.length === 0 && planets.length === 0) return null;

            return (
              <div
                key={planet}
                className="rounded-xl border bg-card p-4 space-y-3"
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-2xl leading-none"
                      style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
                    >
                      {PLANET_GLYPHS[planet] ?? '·'}
                    </span>
                    <div>
                      <p className="text-sm font-bold leading-tight">{planet}</p>
                      <p className="text-[10px] text-muted-foreground">
                        House {a.sourceHouse}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Houses aspected */}
                {houses.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                      Aspects houses
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {houses.map((h: any, i: number) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono px-2 py-1 rounded bg-primary/10 text-primary"
                          title={ASPECT_TYPE_MEANING[h.type]}
                        >
                          H{h.house}
                          <span className="opacity-60 ml-1">({h.type})</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Planets aspected */}
                {planets.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                      Aspects planets
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {planets.map((p: any, i: number) => (
                        <span
                          key={i}
                          className="text-[10px] px-2 py-1 rounded bg-muted/60 text-foreground/85"
                        >
                          {PLANET_GLYPHS[p.planet] ?? ''} {p.planet}
                          <span className="opacity-60 ml-1">({p.type})</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
