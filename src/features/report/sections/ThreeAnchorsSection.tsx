import { useTranslation } from 'react-i18next';
import { RashiImage } from '../components/RashiImage';
import { PLANET_GLYPHS, RASHI_LORDS } from '../lib/glyphs';
import {
  RASHI_INTERPRETATIONS,
  NAKSHATRA_INTERPRETATIONS,
  ANCHOR_NARRATIVES,
} from '../lib/interpretations';

interface ThreeAnchorsSectionProps {
  kundli: Record<string, any>;
}

function formatDegree(deg?: number, min?: number, sec?: number): string {
  const d = deg ?? 0;
  const m = min ?? 0;
  const s = sec ?? 0;
  return `${d}° ${String(m).padStart(2, '0')}′ ${String(s).padStart(2, '0')}″`;
}

export function ThreeAnchorsSection({ kundli }: ThreeAnchorsSectionProps) {
  const { t } = useTranslation();

  const anchors = [
    {
      key: 'lagna',
      role: t('anchors.body', { defaultValue: 'The Body' }),
      title: t('anchors.lagna', { defaultValue: 'Lagna (Ascendant)' }),
      data: kundli.ascendant ?? {},
      planetKey: 'Ascendant' as const,
      narrativeKey: 'Lagna',
      borderColor: '#C9A961',
      bg: 'from-[#C9A961]/[0.05]',
    },
    {
      key: 'chandra',
      role: t('anchors.mind', { defaultValue: 'The Mind' }),
      title: t('anchors.chandra', { defaultValue: 'Chandra (Moon)' }),
      data: kundli.planets?.Moon ?? {},
      planetKey: 'Moon' as const,
      narrativeKey: 'Chandra',
      borderColor: '#B8C5D6',
      bg: 'from-[#B8C5D6]/[0.06]',
    },
    {
      key: 'surya',
      role: t('anchors.soul', { defaultValue: 'The Soul' }),
      title: t('anchors.surya', { defaultValue: 'Surya (Sun)' }),
      data: kundli.planets?.Sun ?? {},
      planetKey: 'Sun' as const,
      narrativeKey: 'Surya',
      borderColor: '#E63946',
      bg: 'from-[#E63946]/[0.05]',
    },
  ];

  return (
    <div className="space-y-5">
      {anchors.map((anchor) => {
        const p = anchor.data;
        const rashiName = p.rashiName ?? '—';
        const nakshatra = p.nakshatra ?? '—';
        const rashiLord = RASHI_LORDS[rashiName] ?? '—';
        const narrative = ANCHOR_NARRATIVES[anchor.narrativeKey]?.[rashiName] ?? '';
        const rashiInterp = RASHI_INTERPRETATIONS[rashiName] ?? '';
        const nakshatraInterp = NAKSHATRA_INTERPRETATIONS[nakshatra] ?? '';

        return (
          <article
            key={anchor.key}
            className={`rounded-2xl border bg-gradient-to-br ${anchor.bg} to-transparent p-6 md:p-8 space-y-5`}
            style={{ borderColor: `${anchor.borderColor}40` }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p
                  className="text-[10px] uppercase tracking-[0.3em] font-semibold"
                  style={{ color: anchor.borderColor }}
                >
                  ◇ {anchor.role}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{anchor.title}</p>
              </div>
              <RashiImage
                rashi={rashiName}
                size={44}
                borderColor={`${anchor.borderColor}55`}
                bgColor={`${anchor.borderColor}12`}
                title={rashiName}
              />
            </div>

            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <p
                className="font-bold leading-none"
                style={{
                  fontFamily: "'Crimson Pro', Georgia, serif",
                  fontSize: '2rem',
                }}
              >
                {rashiName}
              </p>
              <p className="text-sm text-muted-foreground font-mono">
                {formatDegree(p.degree, p.minute, p.second)}
              </p>
              <p className="text-sm text-muted-foreground">
                · {nakshatra} {p.pada ?? ''}
              </p>
            </div>

            {narrative && (
              <p className="text-base md:text-[17px] leading-[1.75] text-foreground/90">
                {narrative}
              </p>
            )}

            {(rashiInterp || nakshatraInterp) && (
              <div className="space-y-2 pt-3 border-t" style={{ borderColor: `${anchor.borderColor}20` }}>
                {rashiInterp && (
                  <p className="text-sm leading-relaxed text-foreground/80">
                    <span className="font-semibold" style={{ color: anchor.borderColor }}>
                      {rashiName}:{' '}
                    </span>
                    {rashiInterp}
                  </p>
                )}
                {nakshatraInterp && (
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    <span className="font-semibold text-foreground/70">
                      {nakshatra}:{' '}
                    </span>
                    {nakshatraInterp}
                  </p>
                )}
              </div>
            )}

            <div className="flex flex-wrap gap-x-6 gap-y-1 pt-3 border-t text-xs text-muted-foreground" style={{ borderColor: `${anchor.borderColor}20` }}>
              <span>
                {t('anchors.rashiLord', { defaultValue: 'Rashi lord' })}:{' '}
                <strong className="text-foreground">
                  {PLANET_GLYPHS[rashiLord]} {rashiLord}
                </strong>
              </span>
              <span>
                {t('anchors.nakshatraLord', { defaultValue: 'Nakshatra lord' })}:{' '}
                <strong className="text-foreground">
                  {PLANET_GLYPHS[p.nakshatraLord] ?? ''} {p.nakshatraLord ?? '—'}
                </strong>
              </span>
            </div>
          </article>
        );
      })}
    </div>
  );
}