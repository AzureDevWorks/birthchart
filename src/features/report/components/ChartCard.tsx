import { VedicChart } from '@/features/chart/components/VedicChart';
import { ChartStyleToggle } from '@/features/chart/components/ChartStyleToggle';
import { useChartStyleStore } from '@/features/chart/lib/useChartStyle';
import { useTranslation } from 'react-i18next';
import type { ChartHouse } from '@/features/chart/types';

interface ChartCardProps {
  code: string;
  name: string;
  subtitle: string;
  lagna: string;
  lagnaDegree?: string;
  useFor: string[];
  houses: ChartHouse[];
  showToggle?: boolean;
  size?: number;
}

export function ChartCard({
  code,
  name,
  subtitle,
  lagna,
  lagnaDegree,
  useFor,
  houses,
  showToggle = false,
  size = 320,
}: ChartCardProps) {
  const { i18n } = useTranslation();
  const style = useChartStyleStore((s) => s.style);
  const setStyle = useChartStyleStore((s) => s.setStyle);

  const lang = (i18n.resolvedLanguage === 'ne'
    ? 'ne'
    : i18n.resolvedLanguage === 'hi'
      ? 'hi'
      : 'en') as 'en' | 'hi' | 'ne';

  return (
    <article className="rounded-2xl border bg-card overflow-hidden flex flex-col">
      {/* Header */}
      <div className="px-5 py-4 border-b bg-gradient-to-r from-primary/[0.04] to-transparent">
        <div className="flex items-baseline justify-between gap-3 flex-wrap">
          <div>
            <h3
              className="text-lg font-bold leading-tight"
              style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
            >
              {code} · {name}
            </h3>
            <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
              {subtitle}
            </p>
          </div>
          {showToggle && (
            <div className="shrink-0">
              <ChartStyleToggle value={style} onChange={setStyle} />
            </div>
          )}
        </div>
      </div>

      {/* Chart — pass style explicitly */}
      <div className="flex justify-center py-5 px-4">
        <VedicChart
          size={size}
          houses={houses}
          style={style}
          hideToggle
          lang={lang}
        />
      </div>

      {/* Footer */}
      <div className="px-5 py-4 border-t space-y-3 mt-auto">
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
            Lagna
          </span>
          <span className="flex items-baseline gap-2">
            <strong
              className="text-sm font-semibold text-primary"
              style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
            >
              {lagna}
            </strong>
            {lagnaDegree && (
              <span className="text-[10px] font-mono text-muted-foreground">
                {lagnaDegree}
              </span>
            )}
          </span>
        </div>

        <div className="space-y-1.5 pt-3 border-t border-border/50">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
            Use for
          </p>
          <ul className="space-y-1">
            {useFor.map((u) => (
              <li key={u} className="flex items-start gap-2 text-xs leading-relaxed">
                <span className="text-primary mt-0.5 shrink-0">•</span>
                <span className="text-foreground/85">{u}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
