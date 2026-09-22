import { useTranslation } from 'react-i18next';
import { GlyphBadge } from '../primitives/GlyphBadge';
import { AttributeBadge } from '../primitives/AttributeBadge';
import { PLANET_GLYPHS, RASHI_GLYPHS, RASHI_LORDS } from '../lib/glyphs';

interface GrahaSectionProps {
  kundli: Record<string, any>;
}

const PLANET_ORDER = [
  'Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter',
  'Venus', 'Saturn', 'Rahu', 'Ketu',
];

const DIGNITY_TONE: Record<string, 'positive' | 'warning' | 'negative' | 'neutral'> = {
  exalted: 'positive',
  moolatrikona: 'positive',
  own: 'positive',
  friendly: 'positive',
  neutral: 'neutral',
  enemy: 'warning',
  debilitated: 'negative',
};

function formatDegree(deg?: number, min?: number, sec?: number): string {
  const d = deg ?? 0;
  const m = min ?? 0;
  const s = sec ?? 0;
  return `${d}° ${String(m).padStart(2, '0')}′ ${String(s).padStart(2, '0')}″`;
}

function houseOf(name: string, houses: any[]): number | null {
  for (const h of houses ?? []) {
    if (h.planets?.includes(name)) return h.number;
  }
  return null;
}

export function GrahaSection({ kundli }: GrahaSectionProps) {
  const { t } = useTranslation();
  const planets = kundli.planets ?? {};
  const houses = kundli.houses ?? [];

  return (
    <div className="space-y-3">
      {PLANET_ORDER.map((name) => {
        const p = planets[name];
        if (!p) return null;
        const house = houseOf(name, houses);
        const rashiGlyph = RASHI_GLYPHS[p.rashiName] ?? '·';
        const rashiLord = RASHI_LORDS[p.rashiName] ?? '—';

        return (
          <article
            key={name}
            className="rounded-xl border bg-card p-5 space-y-3"
          >
            {/* Header row */}
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3">
                <GlyphBadge
                  glyph={PLANET_GLYPHS[name] ?? '·'}
                  planet={name as any}
                  size={36}
                  filled
                  title={name}
                />
                <div>
                  <p className="text-base font-bold leading-tight">{name}</p>
                  <p className="text-xs text-muted-foreground">
                    {t('graha.house', { defaultValue: 'House' })} {house ?? '—'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                {p.dignity && (
                  <AttributeBadge tone={DIGNITY_TONE[p.dignity] ?? 'neutral'}>
                    {p.dignity}
                  </AttributeBadge>
                )}
                {p.isRetrograde && <AttributeBadge tone="warning">Retrograde</AttributeBadge>}
                {p.isCombust && <AttributeBadge tone="negative">Combust</AttributeBadge>}
                {p.isVargottama && <AttributeBadge tone="positive">Vargottama</AttributeBadge>}
              </div>
            </div>

            {/* Position grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2 text-xs">
              <Field
                label={t('graha.sign', { defaultValue: 'Sign' })}
                value={p.rashiName ?? '—'}
                glyph={rashiGlyph}
                accent
              />
              <Field
                label={t('graha.position', { defaultValue: 'Position' })}
                value={formatDegree(p.degree, p.minute, p.second)}
                mono
              />
              <Field
                label={t('graha.nakshatra', { defaultValue: 'Nakshatra' })}
                value={`${p.nakshatra ?? '—'} ${p.pada ?? ''}`}
              />
              <Field
                label={t('graha.rashiLord', { defaultValue: 'Rashi Lord' })}
                value={rashiLord}
                glyph={PLANET_GLYPHS[rashiLord]}
              />
            </div>

            {/* Secondary row */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 text-[11px] text-muted-foreground">
              <span>
                {t('graha.nakshatraLord', { defaultValue: 'Nakshatra Lord' })}:{' '}
                <strong className="text-foreground">
                  {PLANET_GLYPHS[p.nakshatraLord] ?? ''} {p.nakshatraLord ?? '—'}
                </strong>
              </span>
              {typeof p.speed === 'number' && (
                <span>
                  {t('graha.speed', { defaultValue: 'Speed' })}:{' '}
                  <strong className="text-foreground font-mono">
                    {p.speed.toFixed(4)}°/day
                  </strong>
                </span>
              )}
              {p.longitude !== undefined && (
                <span>
                  {t('graha.longitude', { defaultValue: 'Longitude' })}:{' '}
                  <strong className="text-foreground font-mono">
                    {p.longitude.toFixed(4)}°
                  </strong>
                </span>
              )}
            </div>
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
  accent,
}: {
  label: string;
  value: string;
  mono?: boolean;
  glyph?: string;
  accent?: boolean;
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className={`mt-0.5 flex items-center gap-1.5 ${mono ? 'font-mono' : ''}`}>
        {glyph && <span className="text-sm opacity-70">{glyph}</span>}
        <span className={`font-medium ${accent ? 'text-primary' : ''}`}>{value}</span>
      </p>
    </div>
  );
}
