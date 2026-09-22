import { useMemo, useState } from 'react';
import { VedicChart } from '@/features/chart/components/VedicChart';
import { buildChartHouses, buildVargaHouses } from '@/features/chart/lib/adapters';
import { VARGA_INFO, VARGA_ORDER } from '../lib/varga-info';
import { cn } from '@/lib/utils';

interface DivisionalChartsSectionProps {
  kundli: Record<string, any>;
}

export function DivisionalChartsSection({ kundli }: DivisionalChartsSectionProps) {
  const [activeVarga, setActiveVarga] = useState<string>('d9');

  const availableVargas = useMemo(() => {
    const present = Object.keys(kundli.vargas ?? {});
    return VARGA_ORDER.filter((v) => v === 'd1' || present.includes(v));
  }, [kundli]);

  const abbrResolver = useMemo(
    () => (planet: string) => {
      if (planet === 'Ascendant') return 'Asc';
      return planet.slice(0, 2);
    },
    []
  );

  const activeHouses = useMemo(() => {
    if (activeVarga === 'd1') {
      return buildChartHouses(kundli, { resolveAbbr: abbrResolver });
    }
    return buildVargaHouses(kundli, activeVarga, { resolveAbbr: abbrResolver });
  }, [activeVarga, kundli, abbrResolver]);

  const info = VARGA_INFO[activeVarga];

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
        The Vedic system divides the zodiac into twenty progressively finer charts. Each reveals a different layer of the native — from the body (D1) to the deepest karma (D60). Click any chart to explore it.
      </p>

      {/* ─── Visual grid of all vargas ─────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {availableVargas.map((code) => {
          const v = VARGA_INFO[code];
          if (!v) return null;
          const isActive = activeVarga === code;
          return (
            <button
              key={code}
              type="button"
              onClick={() => setActiveVarga(code)}
              className={cn(
                'group relative rounded-xl border p-3 text-left transition-all duration-150',
                isActive
                  ? 'border-primary/60 bg-primary/[0.08] shadow-md'
                  : 'border-border/60 bg-card hover:border-primary/40 hover:bg-primary/[0.03]'
              )}
            >
              {/* Code */}
              <div className="flex items-baseline justify-between mb-1">
                <span
                  className={cn(
                    'text-lg font-bold leading-none',
                    isActive ? 'text-primary' : 'text-foreground/80'
                  )}
                  style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
                >
                  {v.code}
                </span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </div>

              {/* Name */}
              <p className="text-xs font-semibold text-foreground leading-tight">
                {v.name}
              </p>

              {/* Purpose */}
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5 leading-tight">
                {v.purpose}
              </p>
            </button>
          );
        })}
      </div>

      {/* ─── Selected varga detail ─────────────────────────── */}
      {info && (
        <div className="rounded-2xl border bg-card overflow-hidden">
          {/* Header strip */}
          <div className="px-6 py-5 border-b bg-gradient-to-r from-primary/[0.04] to-transparent">
            <div className="flex items-baseline justify-between gap-4 flex-wrap">
              <div>
                <h3
                  className="text-2xl font-bold leading-tight"
                  style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
                >
                  {info.code} · {info.name}
                </h3>
                <p className="text-xs uppercase tracking-[0.25em] text-primary/70 font-medium mt-1">
                  {info.sanskrit} · {info.purpose}
                </p>
              </div>
              <p className="text-xs text-muted-foreground">{info.division}</p>
            </div>
          </div>

          {/* Body — chart + interpretation side by side */}
          <div className="grid grid-cols-1 md:grid-cols-[360px_1fr] gap-6 p-6">
            {/* Chart */}
            <div className="flex justify-center md:justify-start">
              <VedicChart
                key={activeVarga}
                size={340}
                houses={activeHouses}
                defaultStyle="north"
                hideToggle
              />
            </div>

            {/* Interpretation */}
            <div className="space-y-5 max-w-xl">
              <p className="text-sm leading-relaxed text-foreground/85">
                {info.summary}
              </p>

              <div className="space-y-2 pt-2 border-t">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                  Use this chart for
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
                  {info.useCases.map((u) => (
                    <li key={u} className="flex items-start gap-2">
                      <span className="text-primary mt-1 shrink-0">•</span>
                      <span className="text-foreground/85">{u}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
