import { GlyphBadge } from '../primitives/GlyphBadge';
import { PLANET_GLYPHS } from '../lib/glyphs';

interface UnfoldingSectionProps {
  kundli: Record<string, any>;
}

function fmtDateShort(iso?: string): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

export function UnfoldingSection({ kundli }: UnfoldingSectionProps) {
  const dasha = kundli.dasha ?? {};
  const mahadashas = dasha.mahadashas ?? [];
  const current = dasha.currentMahadasha;
  const antar = dasha.currentAntar;
  const pratyantar = dasha.currentPratyantar;

  const lifeStart = mahadashas[0]?.startTime ? new Date(mahadashas[0].startTime).getTime() : Date.now();
  const lifeEnd = mahadashas[mahadashas.length - 1]?.endTime
    ? new Date(mahadashas[mahadashas.length - 1].endTime).getTime()
    : Date.now() + 1000;
  const lifeSpan = Math.max(1, lifeEnd - lifeStart);
  const startYear = new Date(lifeStart).getFullYear();
  const endYear = new Date(lifeEnd).getFullYear();

  return (
    <div className="space-y-8">
      {/* Current period hero */}
      {current && (
        <article className="rounded-2xl border-2 border-primary/30 bg-gradient-to-b from-primary/[0.05] to-transparent p-6 md:p-8 space-y-5 text-center">
          <div className="flex justify-center">
            <GlyphBadge
              glyph={PLANET_GLYPHS[current.planet] ?? '·'}
              planet={current.planet}
              size={56}
              filled
            />
          </div>
          <div>
            <p
              className="font-bold leading-tight"
              style={{
                fontFamily: "'Crimson Pro', Georgia, serif",
                fontSize: '2rem',
              }}
            >
              {current.planet} {('Mahadasha')}
            </p>
            <p className="text-xs font-mono text-muted-foreground mt-1">
              {fmtDateShort(current.startTime)} → {fmtDateShort(current.endTime)}
            </p>
          </div>

          {typeof current.progressPercent === 'number' && (
            <div className="max-w-md mx-auto space-y-1.5">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${current.progressPercent}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">{current.progressPercent.toFixed(1)}%</strong> complete
              </p>
            </div>
          )}

          <p className="text-base leading-relaxed max-w-xl mx-auto text-foreground/85">
            {current.planet} rules the planet of action, courage, and drive. This chapter is where you forge your will.
          </p>

          {(antar || pratyantar) && (
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 pt-4 border-t border-primary/20 text-sm">
              {antar && (
                <span>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground block">
                    Antardasha
                  </span>
                  <strong>{PLANET_GLYPHS[antar.planet]} {antar.planet}</strong>
                  <span className="text-xs text-muted-foreground ml-2 font-mono">
                    until {fmtDateShort(antar.endTime)}
                  </span>
                </span>
              )}
              {pratyantar && (
                <span>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground block">
                    Pratyantar
                  </span>
                  <strong>{PLANET_GLYPHS[pratyantar.planet]} {pratyantar.planet}</strong>
                  <span className="text-xs text-muted-foreground ml-2 font-mono">
                    until {fmtDateShort(pratyantar.endTime)}
                  </span>
                </span>
              )}
            </div>
          )}
        </article>
      )}

      {/* Timeline */}
      <div className="space-y-4">
        <p className="text-center text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-medium">
          The Whole Life, at a Glance
        </p>

        {/* Year axis */}
        <div className="flex justify-between text-[10px] font-mono text-muted-foreground px-1">
          <span>{startYear}</span>
          <span className="text-primary font-semibold">NOW</span>
          <span>{endYear}</span>
        </div>

        {/* Bars */}
        <div className="space-y-1.5">
          {mahadashas.map((md: any) => {
            const s = new Date(md.startTime).getTime();
            const e = new Date(md.endTime).getTime();
            const leftPct = ((s - lifeStart) / lifeSpan) * 100;
            const widthPct = ((e - s) / lifeSpan) * 100;
            const isCurrent = current && md.planet === current.planet && md.startTime === current.startTime;

            return (
              <div key={md.planet + md.startTime} className="flex items-center gap-3 text-xs">
                <div className="w-20 shrink-0 flex items-center gap-1.5">
                  <span className="text-base">{PLANET_GLYPHS[md.planet]}</span>
                  <span className="font-medium">{md.planet}</span>
                </div>
                <div className="flex-1 h-6 bg-muted/30 rounded relative overflow-hidden">
                  <div
                    className={`absolute h-full rounded flex items-center justify-center ${
                      isCurrent ? 'bg-primary' : 'bg-foreground/20'
                    }`}
                    style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                  >
                    {isCurrent && (
                      <span className="text-[10px] font-bold text-primary-foreground tracking-wider">
                        ▶ NOW
                      </span>
                    )}
                  </div>
                </div>
                <div className="w-24 shrink-0 text-right font-mono text-[10px] text-muted-foreground">
                  {new Date(md.startTime).getFullYear()}–{new Date(md.endTime).getFullYear()}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
