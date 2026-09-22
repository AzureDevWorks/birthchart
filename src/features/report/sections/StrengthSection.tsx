import { useTranslation } from 'react-i18next';

interface StrengthSectionProps {
  kundli: Record<string, any>;
}

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

const CATEGORY_COLOR: Record<string, string> = {
  beneficial: 'bg-emerald-500',
  neutral: 'bg-amber-500',
  challenging: 'bg-red-500',
};

export function StrengthSection({ kundli }: StrengthSectionProps) {
  const { t } = useTranslation();
  const sav = kundli.ashtakavarga?.sav;
  if (!sav?.houseStrengths?.length) {
    return (
      <div className="p-6 text-center text-muted-foreground text-sm border border-dashed rounded-lg">
        {t('strength.noData', { defaultValue: 'Ashtakavarga data not available.' })}
      </div>
    );
  }

  const maxBindus = Math.max(...sav.houseStrengths.map((h: any) => h.bindus));

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <SummaryTile label={t('strength.total', { defaultValue: 'Total Bindus' })} value={sav.totalBindus} />
        <SummaryTile label={t('strength.average', { defaultValue: 'Average' })} value={sav.averageBindus?.toFixed(2) ?? '—'} />
        <SummaryTile label={t('strength.strongest', { defaultValue: 'Strongest' })} value={`House ${ROMAN[sav.strongestHouse - 1]}`} accent />
        <SummaryTile label={t('strength.weakest', { defaultValue: 'Weakest' })} value={`House ${ROMAN[sav.weakestHouse - 1]}`} />
      </div>

      {/* Bar chart */}
      <div className="space-y-1.5">
        {sav.houseStrengths.map((h: any) => {
          const pct = (h.bindus / maxBindus) * 100;
          return (
            <div key={h.house} className="flex items-center gap-3 text-xs">
              <div className="w-10 text-right font-mono text-muted-foreground">
                {ROMAN[h.house - 1]}
              </div>
              <div className="flex-1 h-5 bg-muted/40 rounded overflow-hidden relative">
                <div
                  className={`h-full ${CATEGORY_COLOR[h.category] ?? 'bg-primary'}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="w-12 text-right font-mono font-semibold">{h.bindus}</div>
              <div className="w-24 text-[10px] uppercase tracking-wider text-muted-foreground">
                {h.strength}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SummaryTile({ label, value, accent }: { label: string; value: any; accent?: boolean }) {
  return (
    <div className="p-3 rounded-lg border bg-card/50">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className={`text-lg font-bold mt-1 ${accent ? 'text-primary' : ''}`}>{value}</p>
    </div>
  );
}
