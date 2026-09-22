import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RASHI_GLYPHS } from '../lib/glyphs';

interface VitalSignsSectionProps {
  kundli: Record<string, any>;
}

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

const HOUSE_NAMES: Record<number, string> = {
  1: 'Self', 2: 'Wealth', 3: 'Siblings', 4: 'Home',
  5: 'Children', 6: 'Enemies', 7: 'Marriage', 8: 'Transformation',
  9: 'Fortune', 10: 'Career', 11: 'Gains', 12: 'Loss',
};

const CATEGORY_COLOR: Record<string, string> = {
  beneficial: 'bg-emerald-500',
  neutral: 'bg-amber-500',
  challenging: 'bg-red-500',
};

const SPECIAL_LAGNAS = [
  { key: 'ghatikaLagna', code: 'GL', name: 'Ghatika Lagna', purpose: 'Power & Authority' },
  { key: 'horaLagna', code: 'HL', name: 'Hora Lagna', purpose: 'Wealth' },
  { key: 'bhavaLagna', code: 'BL', name: 'Bhava Lagna', purpose: 'Vitality' },
  { key: 'shreeLagna', code: 'SL', name: 'Shree Lagna', purpose: 'Fortune' },
  { key: 'induLagna', code: 'IL', name: 'Indu Lagna', purpose: 'Dhana Yoga' },
  { key: 'pranapadaLagna', code: 'PP', name: 'Pranapada', purpose: 'Rectification' },
];

const PRIMARY_ARUDHAS = ['A1', 'A7', 'A10', 'A12'];

export function VitalSignsSection({ kundli }: VitalSignsSectionProps) {
  const { t } = useTranslation();
  const [showAllArudhas, setShowAllArudhas] = useState(false);

  const sav = kundli.ashtakavarga?.sav;
  const houseStrengths = sav?.houseStrengths ?? [];
  const sl = kundli.specialLagnas ?? {};
  const ap = kundli.arudhaPadas?.all ?? [];

  const strongest = houseStrengths.find((h: any) => h.house === sav?.strongestHouse);
  const weakest = houseStrengths.find((h: any) => h.house === sav?.weakestHouse);
  const maxBindus = houseStrengths.length > 0
    ? Math.max(...houseStrengths.map((h: any) => h.bindus))
    : 40;

  const arudhasToShow = showAllArudhas
    ? ap
    : ap.filter((p: any) => PRIMARY_ARUDHAS.includes(p.code));

  return (
    <div className="space-y-8">
      {/* ══════════════════════════════════════════════════════ */}
      {/*  STRENGTH BY HOUSE                                    */}
      {/* ══════════════════════════════════════════════════════ */}
      {houseStrengths.length > 0 && (
        <div className="rounded-2xl border bg-card overflow-hidden">
          {/* Header strip */}
          <div className="px-6 py-5 border-b bg-gradient-to-r from-primary/[0.04] to-transparent">
            <div className="flex items-baseline justify-between gap-4 flex-wrap">
              <div>
                <h3
                  className="text-lg font-bold leading-tight"
                  style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
                >
                  {t('vital.strengthTitle', { defaultValue: 'Strength by House' })}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 max-w-xl leading-relaxed">
                  {t('vital.strengthHint', {
                    defaultValue:
                      'Ashtakavarga measures how much benefic support each house receives from the planets. Higher bindus mean stronger flow in that domain.',
                  })}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {t('vital.total', { defaultValue: 'Total' })}
                </p>
                <p
                  className="text-2xl font-bold text-primary"
                  style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
                >
                  {sav.totalBindus}
                </p>
              </div>
            </div>
          </div>

          {/* Extremes — Strongest / Weakest */}
          {(strongest || weakest) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 border-b">
              {strongest && (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/[0.05] p-5 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400 font-semibold">
                      ★ {t('vital.strongest', { defaultValue: 'Strongest' })}
                    </p>
                    <p className="text-xs text-emerald-700 dark:text-emerald-400 font-mono">
                      {strongest.bindus} bindus
                    </p>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span
                      className="text-lg font-bold text-emerald-700 dark:text-emerald-400"
                      style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
                    >
                      House {ROMAN[strongest.house - 1]}
                    </span>
                    <span className="text-sm text-foreground/70">
                      {HOUSE_NAMES[strongest.house]}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/85">
                    {t('vital.strongestDesc', {
                      defaultValue:
                        "Your chart's greatest asset. This house receives exceptional support — expect good fortune and ease in this domain of life.",
                    })}
                  </p>
                </div>
              )}

              {weakest && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/[0.05] p-5 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-red-700 dark:text-red-400 font-semibold">
                      ⚠ {t('vital.weakest', { defaultValue: 'Weakest' })}
                    </p>
                    <p className="text-xs text-red-700 dark:text-red-400 font-mono">
                      {weakest.bindus} bindus
                    </p>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span
                      className="text-lg font-bold text-red-700 dark:text-red-400"
                      style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
                    >
                      House {ROMAN[weakest.house - 1]}
                    </span>
                    <span className="text-sm text-foreground/70">
                      {HOUSE_NAMES[weakest.house]}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/85">
                    {t('vital.weakestDesc', {
                      defaultValue:
                        'This area needs conscious effort. Not a weakness of fate, but a place to work with awareness and patience.',
                    })}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* All 12 houses bar chart */}
          <div className="p-6 space-y-3">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-3">
              {t('vital.allHouses', { defaultValue: 'All Twelve Houses' })}
            </p>

            <div className="space-y-1.5">
              {houseStrengths.map((h: any) => {
                const pct = (h.bindus / maxBindus) * 100;
                const isStrongest = h.house === sav.strongestHouse;
                const isWeakest = h.house === sav.weakestHouse;

                return (
                  <div key={h.house} className="flex items-center gap-3 text-xs">
                    {/* Roman numeral */}
                    <span className="w-9 text-right font-mono text-[11px] text-muted-foreground shrink-0">
                      {ROMAN[h.house - 1]}
                    </span>

                    {/* House name */}
                    <span className="w-24 text-[11px] text-muted-foreground shrink-0 truncate">
                      {HOUSE_NAMES[h.house]}
                    </span>

                    {/* Bar */}
                    <div className="flex-1 h-5 bg-muted/40 rounded overflow-hidden relative">
                      <div
                        className={`h-full ${CATEGORY_COLOR[h.category] ?? 'bg-primary'} transition-all rounded`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>

                    {/* Bindus */}
                    <span
                      className={`w-8 text-right font-mono font-semibold shrink-0 ${
                        isStrongest
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : isWeakest
                            ? 'text-red-600 dark:text-red-400'
                            : ''
                      }`}
                    >
                      {h.bindus}
                    </span>

                    {/* Category */}
                    <span className="w-20 text-[10px] uppercase tracking-wider text-muted-foreground shrink-0">
                      {h.strength}
                      {isStrongest && ' ★'}
                      {isWeakest && ' ⚠'}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Footer stats */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-4 mt-3 border-t text-xs text-muted-foreground">
              <span>
                {t('vital.average', { defaultValue: 'Average' })}:{' '}
                <strong className="text-foreground">{sav.averageBindus?.toFixed(2)}</strong>
              </span>
              <span>
                {t('vital.total', { defaultValue: 'Total' })}:{' '}
                <strong className="text-foreground">{sav.totalBindus}</strong>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════ */}
      {/*  SPECIAL LAGNAS + ARUDHA PADAS                       */}
      {/* ══════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ─── Special Lagnas ──────────────────────────────── */}
        {Object.keys(sl).length > 0 && (
          <div className="rounded-2xl border bg-card overflow-hidden">
            <div className="px-6 py-4 border-b bg-gradient-to-r from-primary/[0.04] to-transparent">
              <h3
                className="text-base font-bold leading-tight"
                style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
              >
                {t('vital.specialLagnas', { defaultValue: 'Special Lagnas' })}
              </h3>
              <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                {t('vital.specialLagnasHint', {
                  defaultValue:
                    'Six subtle ascendants reveal where specific areas of life shine.',
                })}
              </p>
            </div>

            <div className="p-4 space-y-2">
              {SPECIAL_LAGNAS.map(({ key, code, name, purpose }) => {
                const s = sl[key];
                if (!s) return null;

                return (
                  <div
                    key={key}
                    className="flex items-center gap-3 p-3 rounded-lg border border-border/60 bg-background/50 hover:bg-muted/40 transition-colors"
                  >
                    {/* Code */}
                    <span className="text-[10px] font-mono font-bold text-primary bg-primary/10 rounded px-2 py-1 shrink-0 w-9 text-center">
                      {code}
                    </span>

                    {/* Name + purpose */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground leading-tight truncate">
                        {name}
                      </p>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        {purpose}
                      </p>
                    </div>

                    {/* Rashi */}
                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className="text-xl leading-none"
                        style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
                      >
                        {s.rashiName ? RASHI_GLYPHS[s.rashiName] : '·'}
                      </span>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-foreground leading-tight">
                          {s.rashiName ?? '—'}
                        </p>
                        {s.degree !== undefined && (
                          <p className="text-[10px] font-mono text-muted-foreground">
                            {s.degree}° {String(s.minute ?? 0).padStart(2, '0')}′
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ─── Arudha Padas ────────────────────────────────── */}
        {ap.length > 0 && (
          <div className="rounded-2xl border bg-card overflow-hidden">
            <div className="px-6 py-4 border-b bg-gradient-to-r from-primary/[0.04] to-transparent">
              <h3
                className="text-base font-bold leading-tight"
                style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
              >
                {t('vital.arudhas', { defaultValue: 'Arudha Padas' })}
              </h3>
              <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                {t('vital.arudhasHint', {
                  defaultValue: 'How the world sees you — the outer image of each house.',
                })}
              </p>
            </div>

            <div className="p-4 space-y-2">
              {arudhasToShow.map((p: any) => (
                <div
                  key={p.code}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border/60 bg-background/50 hover:bg-muted/40 transition-colors"
                >
                  {/* Code */}
                  <span className="text-[10px] font-mono font-bold text-primary bg-primary/10 rounded px-2 py-1 shrink-0 w-10 text-center">
                    {p.code}
                  </span>

                  {/* Name */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground leading-tight truncate">
                      {p.name?.split(' - ')[0] ?? p.name}
                    </p>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      House {p.houseNumber}
                    </p>
                  </div>

                  {/* Rashi */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className="text-xl leading-none"
                      style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
                    >
                      {RASHI_GLYPHS[p.rashiName] ?? '·'}
                    </span>
                    <p className="text-sm font-semibold text-foreground">
                      {p.rashiName}
                    </p>
                  </div>
                </div>
              ))}

              {/* Expand button */}
              {ap.length > PRIMARY_ARUDHAS.length && (
                <button
                  type="button"
                  onClick={() => setShowAllArudhas((v) => !v)}
                  className="w-full text-center text-[11px] uppercase tracking-wider text-primary/70 hover:text-primary py-2 transition-colors no-print"
                >
                  {showAllArudhas
                    ? t('vital.showLess', { defaultValue: '▴ Show less' })
                    : t('vital.showAll', { defaultValue: `▾ Show all ${ap.length} arudha padas` })}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
