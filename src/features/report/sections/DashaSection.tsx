import { useTranslation } from 'react-i18next';
import { GlyphBadge } from '../primitives/GlyphBadge';
import { PLANET_GLYPHS } from '../lib/glyphs';

interface DashaSectionProps {
  kundli: Record<string, any>;
}

function fmtDate(iso?: string): string {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

export function DashaSection({ kundli }: DashaSectionProps) {
  const { t } = useTranslation();
  const dasha = kundli.dasha ?? {};
  const mahadashas = dasha.mahadashas ?? [];
  const current = dasha.currentMahadasha;
  const antar = dasha.currentAntar;
  const pratyantar = dasha.currentPratyantar;

  const now = Date.now();
  const lifeStart = mahadashas[0]?.startTime
    ? new Date(mahadashas[0].startTime).getTime()
    : now;
  const lifeEnd = mahadashas[mahadashas.length - 1]?.endTime
    ? new Date(mahadashas[mahadashas.length - 1].endTime).getTime()
    : now + 365 * 24 * 60 * 60 * 1000;
  const lifeSpan = Math.max(1, lifeEnd - lifeStart);

  return (
    <div className="space-y-6">
      {/* Current period */}
      {current && (
        <article className="rounded-xl border-2 border-primary/30 bg-primary/5 p-6 space-y-3">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
            {t('dasha.currentlyIn', { defaultValue: 'Currently in' })}
          </p>
          <div className="flex items-center gap-4">
            <GlyphBadge
              glyph={PLANET_GLYPHS[current.planet] ?? '·'}
              planet={current.planet}
              size={48}
              filled
            />
            <div>
              <p className="text-xl font-bold leading-tight">
                {current.planet} {t('dasha.mahadasha', { defaultValue: 'Mahadasha' })}
              </p>
              <p className="text-sm text-muted-foreground font-mono">
                {fmtDate(current.startTime)} → {fmtDate(current.endTime)}
              </p>
            </div>
          </div>
          {typeof current.progressPercent === 'number' && (
            <div className="space-y-1">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${Math.min(100, current.progressPercent)}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground text-right font-mono">
                {current.progressPercent.toFixed(1)}% {t('dasha.complete', { defaultValue: 'complete' })}
              </p>
            </div>
          )}

          {/* Sub-periods */}
          <div className="pt-3 border-t border-primary/20 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {antar && (
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {t('dasha.antardasha', { defaultValue: 'Antardasha' })}
                </p>
                <p className="font-semibold mt-0.5">
                  {PLANET_GLYPHS[antar.planet]} {antar.planet}
                </p>
                <p className="text-muted-foreground font-mono text-[11px]">
                  {fmtDate(antar.startTime)} → {fmtDate(antar.endTime)}
                </p>
              </div>
            )}
            {pratyantar && (
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {t('dasha.pratyantar', { defaultValue: 'Pratyantar' })}
                </p>
                <p className="font-semibold mt-0.5">
                  {PLANET_GLYPHS[pratyantar.planet]} {pratyantar.planet}
                </p>
                <p className="text-muted-foreground font-mono text-[11px]">
                  {fmtDate(pratyantar.startTime)} → {fmtDate(pratyantar.endTime)}
                </p>
              </div>
            )}
          </div>
        </article>
      )}

      {/* Life timeline */}
      <div>
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-3">
          {t('dasha.timeline', { defaultValue: 'Life Timeline' })}
        </p>
        <div className="space-y-1.5">
          {mahadashas.map((md: any) => {
            const start = new Date(md.startTime).getTime();
            const end = new Date(md.endTime).getTime();
            const leftPct = ((start - lifeStart) / lifeSpan) * 100;
            const widthPct = ((end - start) / lifeSpan) * 100;
            const isCurrent = current && md.planet === current.planet && md.startTime === current.startTime;

            return (
              <div key={md.planet + md.startTime} className="flex items-center gap-2 text-xs">
                <div className="w-24 shrink-0 font-medium">
                  {PLANET_GLYPHS[md.planet]} {md.planet}
                </div>
                <div className="flex-1 h-5 bg-muted/40 rounded relative overflow-hidden">
                  <div
                    className={`absolute h-full rounded ${isCurrent ? 'bg-primary' : 'bg-foreground/25'}`}
                    style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                  />
                  {isCurrent && (
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-primary-foreground">
                      NOW
                    </span>
                  )}
                </div>
                <div className="w-28 shrink-0 text-right font-mono text-[10px] text-muted-foreground">
                  {new Date(md.startTime).getFullYear()} → {new Date(md.endTime).getFullYear()}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
