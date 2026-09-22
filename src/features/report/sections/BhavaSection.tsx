import { useTranslation } from 'react-i18next';
import { RASHI_GLYPHS, RASHI_LORDS, PLANET_GLYPHS, HOUSE_NAMES_EN } from '../lib/glyphs';

interface BhavaSectionProps {
  kundli: Record<string, any>;
}

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

const HOUSE_CATEGORY: Record<number, 'kendra' | 'trikona' | 'dusthana' | 'neutral'> = {
  1: 'kendra', 2: 'neutral', 3: 'neutral', 4: 'kendra',
  5: 'trikona', 6: 'dusthana', 7: 'kendra', 8: 'dusthana',
  9: 'trikona', 10: 'kendra', 11: 'neutral', 12: 'dusthana',
};

const CATEGORY_BG: Record<string, string> = {
  kendra: 'bg-amber-500/[0.04] border-amber-500/20',
  trikona: 'bg-emerald-500/[0.04] border-emerald-500/20',
  dusthana: 'bg-red-500/[0.04] border-red-500/20',
  neutral: 'bg-card',
};

export function BhavaSection({ kundli }: BhavaSectionProps) {
  const { t } = useTranslation();
  const houses = kundli.houses ?? [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {houses.map((h: any) => {
        const rashiName = rashiNameFromNumber(h.rashi);
        const rashiGlyph = RASHI_GLYPHS[rashiName] ?? '·';
        const rashiLord = RASHI_LORDS[rashiName] ?? '—';
        const category = HOUSE_CATEGORY[h.number] ?? 'neutral';

        return (
          <article
            key={h.number}
            className={`rounded-lg border p-4 space-y-2 ${CATEGORY_BG[category]}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p
                  className="text-lg font-bold leading-none"
                  style={{ fontFamily: 'Crimson Pro, Georgia, serif' }}
                >
                  {ROMAN[h.number - 1]}
                </p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
                  {t(`houseNames.${h.number}`, { defaultValue: HOUSE_NAMES_EN[h.number] })}
                </p>
              </div>
              <span className="text-2xl opacity-60">{rashiGlyph}</span>
            </div>

            <div className="space-y-1 pt-2 border-t border-border/40">
              <p className="text-xs">
                <strong className="text-primary">{rashiName}</strong>
              </p>
              <p className="text-[11px] text-muted-foreground">
                {t('bhava.lord', { defaultValue: 'Lord' })}:{' '}
                <strong className="text-foreground">
                  {PLANET_GLYPHS[rashiLord]} {rashiLord}
                </strong>
              </p>
            </div>

            <div className="pt-2 border-t border-border/40 min-h-[3rem]">
              {h.planets?.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {h.planets.map((p: string) => (
                    <span
                      key={p}
                      className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary"
                    >
                      {PLANET_GLYPHS[p] ?? ''} {p}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-[10px] text-muted-foreground italic">
                  {t('bhava.empty', { defaultValue: 'Empty' })}
                </p>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}

const RASHI_NAMES = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];

function rashiNameFromNumber(n: number | undefined): string {
  if (!n || n < 1 || n > 12) return '—';
  return RASHI_NAMES[n - 1];
}
