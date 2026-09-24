import { useMemo, useState } from 'react';
import { SpecialPointsSection } from './SpecialPointsSection';
import { VedicChart } from '@/features/chart/components/VedicChart';
import { buildSpecialChartHouses } from '@/features/chart/lib/adapters';
import { getSpecialCharts } from '@/infrastructure/astrology/prisri-jyotish.adapter';
import { cn } from '@/lib/utils';
import type { ChartHouse } from '@/features/chart/types';

type SpecialKey = 'gl' | 'hl' | 'bl' | 'il';

interface TabDef {
  key: SpecialKey;
  code: string;
  name: string;
  purpose: string;
  blurb: string;
  chartField: 'ghatika' | 'hora' | 'bhava' | 'indu';
}

const TABS: TabDef[] = [
  {
    key: 'gl',
    code: 'GL',
    name: 'Ghatika Lagna',
    purpose: 'Power & Authority',
    blurb:
      'Traverses one sign every 24 minutes (1 Ghati). The classical chart for executive authority — rank, position, and political standing. When strong, the native holds office; when afflicted, authority slips away.',
    chartField: 'ghatika',
  },
  {
    key: 'hl',
    code: 'HL',
    name: 'Hora Lagna',
    purpose: 'Wealth & Fortune',
    blurb:
      'Traverses one sign every 60 minutes (2.5 Ghatis). The premier lagna for financial riches — liquid cash, income flow, and wealth preservation. Where the Ghatika shows status, the Hora shows money.',
    chartField: 'hora',
  },
  {
    key: 'bl',
    code: 'BL',
    name: 'Bhava Lagna',
    purpose: 'Vitality & Body',
    blurb:
      'Traverses one sign every 120 minutes (5 Ghatis). The chart of the physical foundation — health, stamina, embodied life, and the material support the body draws from.',
    chartField: 'bhava',
  },
  {
    key: 'il',
    code: 'IL',
    name: 'Indu Lagna',
    purpose: 'Dhana Yoga',
    blurb:
      'Calculated from the rays (Kalas) of the 9th lords from Lagna and Moon, projected from the Moon. The classical Parashari test for wealth potential — it shows what the chart is designed to attract.',
    chartField: 'indu',
  },
];

interface SpecialLagnasSectionProps {
  kundli: Record<string, any>;
}

export function SpecialLagnasSection({ kundli }: SpecialLagnasSectionProps) {
  const [active, setActive] = useState<SpecialKey>('gl');

  const charts = useMemo(
    () => getSpecialCharts(kundli as any),
    [kundli]
  );

  const abbrResolver = useMemo(
    () => (planet: string) => (planet === 'Ascendant' ? 'Asc' : planet.slice(0, 2)),
    []
  );

  const housesByKey = useMemo<Record<SpecialKey, ChartHouse[]>>(
    () => ({
      gl: charts.ghatika
        ? buildSpecialChartHouses(charts.ghatika, { resolveAbbr: abbrResolver })
        : [],
      hl: charts.hora
        ? buildSpecialChartHouses(charts.hora, { resolveAbbr: abbrResolver })
        : [],
      bl: charts.bhava
        ? buildSpecialChartHouses(charts.bhava, { resolveAbbr: abbrResolver })
        : [],
      il: charts.indu
        ? buildSpecialChartHouses(charts.indu, { resolveAbbr: abbrResolver })
        : [],
    }),
    [charts, abbrResolver]
  );

  const activeTab = TABS.find((t) => t.key === active)!;
  const activeHouses = housesByKey[active];
  const hasChart = activeHouses.length > 0;
  const activeChartData = charts[activeTab.chartField];

  return (
    <div className="space-y-10">
      {/* ─── Part 1: the six special lagnas ───────────────────── */}
      <SpecialPointsSection kundli={kundli} />

      {/* ─── Part 2: the four derived charts ─────────────────── */}
      <div className="space-y-5">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-primary/70 font-semibold mb-1">
            Derived Charts
          </p>
          <h3
            className="text-lg font-bold tracking-tight"
            style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
          >
            The Special Charts
          </h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl leading-relaxed">
            Four lagnas, each anchored as House 1. These are the classical
            Parashari derivations — they show what the D1 chart alone cannot.
          </p>
        </div>

        {/* Tab strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {TABS.map((tab) => {
            const isActive = active === tab.key;
            const tabHouses = housesByKey[tab.key];
            const unavailable = tabHouses.length === 0;
            return (
              <button
                key={tab.key}
                type="button"
                disabled={unavailable}
                onClick={() => setActive(tab.key)}
                className={cn(
                  'relative rounded-xl border p-3 text-left transition-all duration-150',
                  unavailable
                    ? 'opacity-40 cursor-not-allowed border-border/60 bg-card'
                    : isActive
                      ? 'border-primary/60 bg-primary/[0.08] shadow-md'
                      : 'border-border/60 bg-card hover:border-primary/40 hover:bg-primary/[0.03]'
                )}
              >
                <div className="flex items-baseline justify-between mb-1">
                  <span
                    className={cn(
                      'text-lg font-bold leading-none',
                      isActive ? 'text-primary' : 'text-foreground/80'
                    )}
                    style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
                  >
                    {tab.code}
                  </span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  )}
                </div>
                <p className="text-xs font-semibold text-foreground leading-tight">
                  {tab.name}
                </p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5 leading-tight">
                  {tab.purpose}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active chart panel */}
        <div className="rounded-2xl border bg-card overflow-hidden">
          <div className="px-6 py-5 border-b bg-gradient-to-r from-primary/[0.04] to-transparent">
            <div className="flex items-baseline justify-between gap-4 flex-wrap">
              <div>
                <h4
                  className="text-xl font-bold leading-tight"
                  style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
                >
                  {activeTab.code} · {activeTab.name}
                </h4>
                <p className="text-[11px] uppercase tracking-[0.25em] text-primary/70 font-medium mt-1">
                  {activeTab.purpose}
                </p>
              </div>
              {hasChart && activeChartData?.ascendant && (
                <div className="text-right shrink-0">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Lagna
                  </p>
                  <p
                    className="text-sm font-semibold"
                    style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
                  >
                    {activeChartData.ascendant.rashiName ?? '—'}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[360px_1fr] gap-6 p-6">
            {/* Chart */}
            <div className="flex justify-center md:justify-start">
              {hasChart ? (
                <VedicChart
                  key={active}
                  size={340}
                  houses={activeHouses}
                  defaultStyle="north"
                  hideToggle
                />
              ) : (
                <div className="w-full aspect-square rounded-xl border border-dashed border-border flex items-center justify-center text-sm text-muted-foreground">
                  Chart unavailable
                </div>
              )}
            </div>

            {/* Interpretation */}
            <div className="space-y-5 max-w-xl">
              <p className="text-sm leading-relaxed text-foreground/85">
                {activeTab.blurb}
              </p>

              {hasChart && (
                <div className="pt-4 border-t space-y-3">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                    Planetary distribution
                  </p>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-xs">
                    {activeHouses
                      .filter((h) => h.planets.length > 0)
                      .map((h) => (
                        <div
                          key={h.number}
                          className="flex items-baseline justify-between gap-2"
                        >
                          <span className="text-muted-foreground">
                            House {h.number}
                          </span>
                          <span className="font-mono font-medium text-right">
                            {h.planets.map((p) => p.abbr).join(' · ')}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}