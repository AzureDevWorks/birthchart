import { GlyphBadge } from '../primitives/GlyphBadge';
import { RashiImage } from '../components/RashiImage';
import { PLANET_GLYPHS, RASHI_LORDS } from '../lib/glyphs';

interface PlanetaryMapSectionProps {
  kundli: Record<string, any>;
}

const PLANET_ORDER = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'];

function houseOf(name: string, houses: any[]): number | null {
  for (const h of houses ?? []) {
    if (h.planets?.includes(name)) return h.number;
  }
  return null;
}

const DIGNITY_BORDER: Record<string, string> = {
  exalted: 'border-emerald-500/40',
  moolatrikona: 'border-emerald-500/40',
  own: 'border-emerald-500/40',
  friendly: 'border-emerald-500/30',
  neutral: 'border-border',
  enemy: 'border-amber-500/30',
  debilitated: 'border-red-500/40',
};

export function PlanetaryMapSection({ kundli }: PlanetaryMapSectionProps) {
  const planets = kundli.planets ?? {};
  const houses = kundli.houses ?? [];

  // Highlights
  const highlights: { label: string; value: string; tone: 'positive' | 'negative' | 'neutral' }[] = [];

  const strongest = PLANET_ORDER.find((p) => planets[p]?.dignity === 'exalted');
  if (strongest) {
    highlights.push({ label: 'Strongest', value: `${strongest} (exalted)`, tone: 'positive' });
  }
  const debil = PLANET_ORDER.find((p) => planets[p]?.dignity === 'debilitated');
  if (debil) {
    highlights.push({ label: 'Needs support', value: `${debil} (debilitated)`, tone: 'negative' });
  }
  const vargottama = PLANET_ORDER.filter((p) => planets[p]?.isVargottama);
  if (vargottama.length > 0) {
    highlights.push({ label: 'Vargottama', value: vargottama.join(', '), tone: 'positive' });
  }
  const retrogrades = PLANET_ORDER.filter((p) => planets[p]?.isRetrograde);
  if (retrogrades.length > 0) {
    highlights.push({ label: 'Retrograde', value: retrogrades.join(', '), tone: 'neutral' });
  }

  return (
    <div className="space-y-6">
      {/* 3x3 grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {PLANET_ORDER.map((name) => {
          const p = planets[name];
          if (!p) return null;
          const house = houseOf(name, houses);
          const rashiName = p.rashiName ?? '—';
          const borderClass = DIGNITY_BORDER[p.dignity] ?? 'border-border';
          const rashiLord = RASHI_LORDS[rashiName] ?? '—';

          return (
            <article
              key={name}
              className={`rounded-xl border-2 ${borderClass} bg-card p-4 space-y-3`}
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GlyphBadge
                    glyph={PLANET_GLYPHS[name] ?? '·'}
                    planet={name as any}
                    size={28}
                    filled
                  />
                  <span className="font-bold text-sm">{name}</span>
                </div>
                <div className="flex items-center gap-1">
                  {p.isRetrograde && (
                    <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400">ʳ</span>
                  )}
                  <span className="text-[10px] text-muted-foreground font-mono">
                    H{house ?? '—'}
                  </span>
                </div>
              </div>

              {/* Sign + degree */}
              <div className="space-y-0.5">
                <p className="text-lg font-semibold leading-tight flex items-center gap-2">
                  <RashiImage rashi={rashiName} size={26} title={rashiName} />
                  {rashiName}
                </p>
                <p className="text-xs font-mono text-muted-foreground">
                  {p.degree ?? 0}° {String(p.minute ?? 0).padStart(2, '0')}′ {String(p.second ?? 0).padStart(2, '0')}″
                </p>
              </div>

              {/* Nakshatra */}
              <p className="text-xs text-muted-foreground">
                {p.nakshatra ?? '—'} {p.pada ? `· ${p.pada}` : ''}
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-1 pt-1">
                {p.dignity && p.dignity !== 'neutral' && (
                  <span
                    className={`text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded ${
                      p.dignity === 'exalted' || p.dignity === 'moolatrikona' || p.dignity === 'own'
                        ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                        : p.dignity === 'debilitated'
                          ? 'bg-red-500/10 text-red-700 dark:text-red-400'
                          : 'bg-muted/60 text-muted-foreground'
                    }`}
                  >
                    {p.dignity}
                  </span>
                )}
                {p.isCombust && (
                  <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-700 dark:text-orange-400">
                    combust
                  </span>
                )}
                {p.isVargottama && (
                  <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-700 dark:text-purple-400">
                    vargottama
                  </span>
                )}
              </div>

              {/* Rashi lord */}
              <p className="text-[10px] text-muted-foreground pt-1 border-t border-border/40">
                {PLANET_GLYPHS[rashiLord]} {rashiLord}
              </p>
            </article>
          );
        })}
      </div>

      {/* Highlights strip */}
      {highlights.length > 0 && (
        <div className="rounded-xl border bg-muted/20 p-4 flex flex-wrap gap-x-6 gap-y-2 text-xs">
          {highlights.map((h, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="text-muted-foreground">{h.label}:</span>
              <strong
                className={
                  h.tone === 'positive'
                    ? 'text-emerald-700 dark:text-emerald-400'
                    : h.tone === 'negative'
                      ? 'text-red-700 dark:text-red-400'
                      : 'text-foreground'
                }
              >
                {h.value}
              </strong>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
