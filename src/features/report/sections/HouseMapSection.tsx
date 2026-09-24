import { RASHI_GLYPHS, RASHI_LORDS, PLANET_GLYPHS } from '../lib/glyphs';
import { HOUSE_NAMES_EN } from '../lib/glyphs';

interface HouseMapSectionProps {
  kundli: Record<string, any>;
}

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

const CATEGORY_COLOR: Record<string, string> = {
  kendra: 'border-l-amber-500/60',
  trikona: 'border-l-emerald-500/60',
  dusthana: 'border-l-red-500/50',
  neutral: 'border-l-border',
};

const RASHI_NAMES = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];

const HOUSE_CAT: Record<number, string> = {
  1: 'kendra', 2: 'neutral', 3: 'neutral', 4: 'kendra',
  5: 'trikona', 6: 'dusthana', 7: 'kendra', 8: 'dusthana',
  9: 'trikona', 10: 'kendra', 11: 'neutral', 12: 'dusthana',
};

export function HouseMapSection({ kundli }: HouseMapSectionProps) {
  const houses = kundli.houses ?? [];
  const sav = kundli.ashtakavarga?.sav?.houseStrengths ?? [];

  const strongest = sav.length > 0 ? sav.reduce((a: any, b: any) => (a.bindus > b.bindus ? a : b)) : null;
  const weakest = sav.length > 0 ? sav.reduce((a: any, b: any) => (a.bindus < b.bindus ? a : b)) : null;

  return (
    <div className="space-y-5">
      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {houses.map((h: any) => {
          const rashi = RASHI_NAMES[(h.rashi ?? 1) - 1];
          const glyph = RASHI_GLYPHS[rashi] ?? '·';
          const lord = RASHI_LORDS[rashi] ?? '—';
          const cat = HOUSE_CAT[h.number] ?? 'neutral';

          return (
            <div
              key={h.number}
              className={`rounded-lg border border-l-2 bg-card p-3 space-y-2 ${CATEGORY_COLOR[cat]}`}
            >
              {/* Header */}
              <div className="flex items-baseline justify-between gap-2">
                <span
                  className="text-base font-bold text-muted-foreground"
                  style={{ fontFamily: 'Crimson Pro, Georgia, serif' }}
                >
                  {ROMAN[h.number - 1]}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground">
                  {HOUSE_NAMES_EN[h.number]}
                </span>
              </div>

              {/* Rashi */}
              <div className="flex items-center gap-1.5 text-sm">
                <span className="text-base opacity-70">{glyph}</span>
                <span className="font-semibold">{rashi}</span>
              </div>

              {/* Lord */}
              <p className="text-[10px] text-muted-foreground">
                {PLANET_GLYPHS[lord]} {lord}
              </p>

              {/* Planets or empty */}
              {h.planets?.length > 0 ? (
                <div className="flex flex-wrap gap-1 pt-1 border-t border-border/40">
                  {h.planets.map((p: string) => (
                    <span
                      key={p}
                      className="text-[10px] font-medium text-primary"
                      title={p}
                    >
                      {PLANET_GLYPHS[p] ?? p.slice(0, 2)}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="pt-1 border-t border-border/40 text-[10px] text-muted-foreground/60">
                  ·
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Highlights */}
      {(strongest || weakest) && (
        <div className="rounded-xl border bg-muted/20 p-4 space-y-2 text-sm">
          {strongest && (
            <p>
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold">★ Strongest —</span>{' '}
              <strong>House {ROMAN[strongest.house - 1]}</strong> ({HOUSE_NAMES_EN[strongest.house]}) ·{' '}
              <span className="font-mono">{strongest.bindus}</span> bindus — {strongest.strength.toLowerCase()}.
            </p>
          )}
          {weakest && (
            <p>
              <span className="text-red-700 dark:text-red-400 font-semibold">⚠ Weakest —</span>{' '}
              <strong>House {ROMAN[weakest.house - 1]}</strong> ({HOUSE_NAMES_EN[weakest.house]}) ·{' '}
              <span className="font-mono">{weakest.bindus}</span> bindus — {weakest.strength.toLowerCase()}.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
