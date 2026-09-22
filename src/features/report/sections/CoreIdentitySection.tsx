import { useTranslation } from 'react-i18next';
import { GlyphBadge } from '../primitives/GlyphBadge';
import { PLANET_GLYPHS, RASHI_GLYPHS, RASHI_LORDS } from '../lib/glyphs';
import {
  RASHI_INTERPRETATIONS,
  NAKSHATRA_INTERPRETATIONS,
} from '../lib/interpretations';

interface CoreIdentitySectionProps {
  kundli: Record<string, any>;
}

function formatDegree(deg?: number, min?: number, sec?: number): string {
  const d = deg ?? 0;
  const m = min ?? 0;
  const s = sec ?? 0;
  return `${d}° ${String(m).padStart(2, '0')}′ ${String(s).padStart(2, '0')}″`;
}

export function CoreIdentitySection({ kundli }: CoreIdentitySectionProps) {
  const { t } = useTranslation();

  const asc = kundli.ascendant ?? {};
  const moon = kundli.planets?.Moon ?? {};
  const sun = kundli.planets?.Sun ?? {};

  const cards = [
    {
      key: 'lagna',
      title: t('coreIdentity.lagna', { defaultValue: 'Lagna' }),
      subtitle: t('coreIdentity.lagnaSub', { defaultValue: 'The mask you wear to the world' }),
      planet: asc,
      planetKey: 'Ascendant',
      showNakshatraLord: true,
    },
    {
      key: 'chandra',
      title: t('coreIdentity.chandra', { defaultValue: 'Chandra (Moon)' }),
      subtitle: t('coreIdentity.chandraSub', { defaultValue: 'The mind and inner world' }),
      planet: moon,
      planetKey: 'Moon',
      showNakshatraLord: true,
    },
    {
      key: 'surya',
      title: t('coreIdentity.surya', { defaultValue: 'Surya (Sun)' }),
      subtitle: t('coreIdentity.suryaSub', { defaultValue: 'The soul and father principle' }),
      planet: sun,
      planetKey: 'Sun',
      showNakshatraLord: true,
    },
  ];

  return (
    <div className="space-y-4">
      {cards.map((card) => {
        const p = card.planet;
        const rashiName = p.rashiName ?? '—';
        const rashiGlyph = RASHI_GLYPHS[rashiName] ?? '·';
        const rashiLord = RASHI_LORDS[rashiName] ?? '—';
        const nakshatra = p.nakshatra ?? '—';
        const nakshatraLord = p.nakshatraLord ?? '—';
        const interpretation =
          RASHI_INTERPRETATIONS[rashiName] ?? '';
        const nakshatraInterp =
          NAKSHATRA_INTERPRETATIONS[nakshatra] ?? '';

        return (
          <article
            key={card.key}
            className="rounded-xl border bg-card p-5 space-y-4"
          >
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                  {card.title}
                </p>
                <p className="text-xs text-muted-foreground italic mt-0.5">
                  {card.subtitle}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <GlyphBadge
                  glyph={rashiGlyph}
                  planet={card.planetKey as any}
                  size={36}
                  highlight={card.key === 'lagna'}
                  title={rashiName}
                />
                <span className="text-base font-semibold">{rashiName}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2 text-xs">
              <Field
                label={t('coreIdentity.position', { defaultValue: 'Position' })}
                value={formatDegree(p.degree, p.minute, p.second)}
                mono
              />
              <Field
                label={t('coreIdentity.nakshatra', { defaultValue: 'Nakshatra' })}
                value={`${nakshatra} ${p.pada ?? ''}`}
              />
              <Field
                label={t('coreIdentity.rashiLord', { defaultValue: 'Rashi Lord' })}
                value={rashiLord}
                glyph={PLANET_GLYPHS[rashiLord]}
              />
              {card.showNakshatraLord && (
                <Field
                  label={t('coreIdentity.nakshatraLord', { defaultValue: 'Nakshatra Lord' })}
                  value={nakshatraLord}
                  glyph={PLANET_GLYPHS[nakshatraLord]}
                />
              )}
            </div>

            {interpretation && (
              <div className="pt-3 border-t border-border/50 space-y-2">
                <p className="text-xs leading-relaxed text-foreground/90">
                  <span className="font-semibold text-primary">{rashiName}: </span>
                  {interpretation}
                </p>
                {nakshatraInterp && (
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    <span className="font-semibold text-foreground/80">{nakshatra}: </span>
                    {nakshatraInterp}
                  </p>
                )}
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}

function Field({
  label,
  value,
  mono,
  glyph,
}: {
  label: string;
  value: string;
  mono?: boolean;
  glyph?: string;
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className={`mt-0.5 flex items-center gap-1.5 ${mono ? 'font-mono' : ''}`}>
        {glyph && <span className="text-sm opacity-70">{glyph}</span>}
        <span className="font-medium">{value}</span>
      </p>
    </div>
  );
}
