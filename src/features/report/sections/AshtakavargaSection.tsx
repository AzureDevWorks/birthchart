import { useTranslation } from 'react-i18next';
import { PLANET_GLYPHS } from '../lib/glyphs';
import { MANUSCRIPT as C, MANUSCRIPT_ALPHA as CA } from '../lib/manuscript-colors';

// ─── Manuscript palette ─────────────────────────────────────


// ─── Types ─────────────────────────────────────────────────

interface HouseStrength {
  house: number;
  rashi: number;
  bindus: number;
  strength: string;
  category: 'beneficial' | 'neutral' | 'challenging' | string;
}

interface BAV {
  planet: string;
  totalBindus: number;
  byRashi: number[];
  byHouse: number[];
}

interface AshtakavargaSectionProps {
  kundli: Record<string, any>;
}

// ─── Cell color scale — bindus → tint ───────────────────────
// 0-1 = deep red, 2-3 = soft amber, 4 = ivory, 5-6 = soft green, 7-8 = deep emerald

function cellStyle(bindus: number): { bg: string; fg: string; border?: string } {
  if (bindus >= 7) return { bg: 'hsl(150 45% 42%)', fg: '#fff' };
  if (bindus >= 5) return { bg: 'hsl(150 30% 72%)', fg: 'hsl(150 45% 15%)' };
  if (bindus === 4) return { bg: 'hsl(42 45% 90%)', fg: C.brown };
  if (bindus >= 2) return { bg: 'hsl(38 60% 82%)', fg: 'hsl(25 55% 22%)' };
  return { bg: 'hsl(6 55% 78%)', fg: 'hsl(6 60% 25%)' };
}

// ─── Component ──────────────────────────────────────────────

export function AshtakavargaSection({ kundli }: AshtakavargaSectionProps) {
  const { t } = useTranslation();

  const av = kundli.ashtakavarga;
  if (!av?.sav?.houseStrengths?.length) {
    return (
      <div className="p-6 text-center text-muted-foreground text-sm border border-dashed rounded-lg">
        {t('ashtakavarga.noData', { defaultValue: 'Ashtakavarga data not available for this chart.' })}
      </div>
    );
  }

  const sav = av.sav;
  const bav = av.bav ?? {};

  const planetOrder = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
  const roman = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'];
  const HOUSE_NAMES = ['Self','Wealth','Siblings','Home','Children','Enemies','Marriage','Transform','Fortune','Career','Gains','Loss'];

  // ─── SAV column totals by house (from houseStrengths) ────
  const savByHouse: number[] = Array(12).fill(0);
  sav.houseStrengths.forEach((hs: HouseStrength) => {
    savByHouse[hs.house - 1] = hs.bindus;
  });

  const strongest = sav.strongestHouse;
  const weakest = sav.weakestHouse;
  const strongestBindus = sav.houseStrengths.find((h: any) => h.house === strongest)?.bindus ?? 0;
  const weakestBindus = sav.houseStrengths.find((h: any) => h.house === weakest)?.bindus ?? 0;

  // ─── Per-planet summary ratings ──────────────────────────
  // Each planet's totalBindus out of ~56 theoretical max
  const planetRating = (total: number, planet: string): { label: string; tone: string } => {
    // Saturn's standard max is lower (39); Sun/Moon/Mars/Merc/Jup/Ven are higher (48-56)
    const baseline = planet === 'Saturn' ? 39 : 48;
    const ratio = total / baseline;
    if (ratio >= 1.1) return { label: t('ashtakavarga.ratingExceptional', { defaultValue: 'Exceptional' }), tone: 'text-emerald-700 dark:text-emerald-400' };
    if (ratio >= 0.95) return { label: t('ashtakavarga.ratingStrong', { defaultValue: 'Strong' }), tone: 'text-emerald-700 dark:text-emerald-400' };
    if (ratio >= 0.8) return { label: t('ashtakavarga.ratingAverage', { defaultValue: 'Average' }), tone: 'text-amber-700 dark:text-amber-400' };
    if (ratio >= 0.65) return { label: t('ashtakavarga.ratingWeak', { defaultValue: 'Weak' }), tone: 'text-red-700 dark:text-red-400' };
    return { label: t('ashtakavarga.ratingVeryWeak', { defaultValue: 'Very Weak' }), tone: 'text-red-700 dark:text-red-400' };
  };

  return (
    <div className="space-y-6">

      {/* ═══ 1. Per-planet summary tiles ═══ */}
      <div>
        <p
          className="text-[10px] uppercase tracking-[0.25em] font-semibold mb-3"
          style={{ color: C.gold }}
        >
          {t('ashtakavarga.planetTotals', { defaultValue: 'Planetary Bindu Totals' })}
        </p>
        <div className="grid grid-cols-3 md:grid-cols-7 gap-2">
          {planetOrder.map((p) => {
            const b = bav[p] as BAV | undefined;
            if (!b) return null;
            const r = planetRating(b.totalBindus, p);
            return (
              <div
                key={p}
                className="rounded-lg p-3 text-center space-y-1"
                style={{
                  background: C.ivory,
                  border: `1px solid ${CA.goldSoft(0.35)}`,
                }}
              >
                <p
                  className="leading-none"
                  style={{
                    fontFamily: "'Noto Serif Devanagari', serif",
                    fontSize: '18px',
                    color: C.gold,
                  }}
                >
                  {PLANET_GLYPHS[p] ?? '·'}
                </p>
                <p
                  className="leading-none pt-1"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: '9px',
                    color: C.brownSoft,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                  }}
                >
                  {p}
                </p>
                <p
                  className="leading-none pt-2"
                  style={{
                    fontFamily: "'Cormorant Garamond', 'Crimson Pro', Georgia, serif",
                    fontSize: '20px',
                    fontWeight: 700,
                    color: C.brown,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {b.totalBindus}
                </p>
                <p className={`text-[9px] uppercase tracking-wider font-semibold ${r.tone}`}>
                  {r.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ═══ 2. The Bindu Grid ═══ */}
      <div>
        <p
          className="text-[10px] uppercase tracking-[0.25em] font-semibold mb-3"
          style={{ color: C.gold }}
        >
          {t('ashtakavarga.gridTitle', { defaultValue: 'The Bindu Grid — 7 × 12' })}
        </p>

        <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${CA.goldSoft(0.35)}` }}>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse" style={{ minWidth: '720px' }}>
              <thead>
                <tr>
                  <th
                    className="sticky left-0 z-10 text-left px-3 py-2.5"
                    style={{
                      background: C.ivoryDeep,
                      borderBottom: `1px solid ${CA.goldSoft(0.55)}`,
                      width: '96px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontSize: '9px',
                        color: C.brownSoft,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                      }}
                    >
                      {t('ashtakavarga.planet', { defaultValue: 'Planet' })}
                    </span>
                  </th>
                  {[1,2,3,4,5,6,7,8,9,10,11,12].map((h) => (
                    <th
                      key={h}
                      className="px-1 py-2.5 text-center"
                      style={{
                        background: C.ivoryDeep,
                        borderBottom: `1px solid ${CA.goldSoft(0.55)}`,
                        borderLeft: `1px solid ${CA.goldSoft(0.20)}`,
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "'Inter', system-ui, sans-serif",
                          fontSize: '9px',
                          color: C.brownSoft,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          fontWeight: 600,
                        }}
                      >
                        {roman[h - 1]}
                      </div>
                      <div
                        style={{
                          fontFamily: "'Cormorant Garamond', 'Crimson Pro', Georgia, serif",
                          fontSize: '10px',
                          color: C.gold,
                          marginTop: '1px',
                        }}
                      >
                        {HOUSE_NAMES[h - 1]}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* BAV rows */}
                {planetOrder.map((p) => {
                  const b = bav[p] as BAV | undefined;
                  if (!b) return null;
                  return (
                    <tr key={p}>
                      <td
                        className="sticky left-0 z-10 px-3 py-2"
                        style={{
                          background: C.ivory,
                          borderBottom: `1px solid ${CA.goldSoft(0.14)}`,
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            style={{
                              fontFamily: "'Noto Serif Devanagari', serif",
                              fontSize: '15px',
                              color: C.gold,
                              lineHeight: 1,
                            }}
                          >
                            {PLANET_GLYPHS[p] ?? '·'}
                          </span>
                          <span
                            style={{
                              fontFamily: "'Cormorant Garamond', 'Crimson Pro', Georgia, serif",
                              fontSize: '13px',
                              color: C.brown,
                              fontWeight: 600,
                            }}
                          >
                            {p}
                          </span>
                        </div>
                      </td>
                      {b.byHouse.map((bindus, i) => {
                        const s = cellStyle(bindus);
                        return (
                          <td
                            key={i}
                            className="text-center"
                            style={{
                              background: s.bg,
                              color: s.fg,
                              borderBottom: `1px solid ${CA.ivoryDeep(0.20)}`,
                              borderLeft: `1px solid ${CA.ivoryDeep(0.35)}`,
                              padding: '8px 4px',
                              fontFamily: 'ui-monospace, monospace',
                              fontSize: '13px',
                              fontWeight: 700,
                              fontVariantNumeric: 'tabular-nums',
                            }}
                          >
                            {bindus}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}

                {/* SAV total row */}
                <tr>
                  <td
                    className="sticky left-0 z-10 px-3 py-2.5"
                    style={{
                      background: C.ivoryDeep,
                      borderTop: `2px solid ${CA.gold(0.55)}`,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Cormorant Garamond', 'Crimson Pro', Georgia, serif",
                        fontSize: '14px',
                        color: C.brown,
                        fontWeight: 700,
                        letterSpacing: '0.05em',
                      }}
                    >
                      SAV
                    </span>
                  </td>
                  {savByHouse.map((bindus, i) => {
                    const h = i + 1;
                    const isStrongest = h === strongest;
                    const isWeakest = h === weakest;
                    return (
                      <td
                        key={i}
                        className="text-center"
                        style={{
                          background: C.ivoryDeep,
                          borderTop: `2px solid ${CA.gold(0.55)}`,
                          borderLeft: `1px solid ${CA.goldSoft(0.20)}`,
                          padding: '8px 4px',
                          fontFamily: 'ui-monospace, monospace',
                          fontSize: '13px',
                          fontWeight: 700,
                          fontVariantNumeric: 'tabular-nums',
                          color: isStrongest ? 'hsl(150 45% 25%)' : isWeakest ? 'hsl(6 60% 35%)' : C.brown,
                          position: 'relative',
                        }}
                      >
                        {bindus}
                        {(isStrongest || isWeakest) && (
                          <span
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: '50%',
                              transform: 'translateX(-50%)',
                              fontSize: '8px',
                              color: isStrongest ? 'hsl(150 45% 35%)' : 'hsl(6 60% 40%)',
                            }}
                          >
                            {isStrongest ? '★' : '⚠'}
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-4 mt-2">
          {[
            { label: t('ashtakavarga.veryStrong', { defaultValue: 'Very Strong (7-8)' }), color: 'hsl(150 45% 42%)' },
            { label: t('ashtakavarga.strong',     { defaultValue: 'Strong (5-6)' }),      color: 'hsl(150 30% 72%)' },
            { label: t('ashtakavarga.average',    { defaultValue: 'Average (4)' }),       color: 'hsl(42 45% 90%)', border: true },
            { label: t('ashtakavarga.weak',       { defaultValue: 'Weak (2-3)' }),        color: 'hsl(38 60% 82%)' },
            { label: t('ashtakavarga.veryWeak',   { defaultValue: 'Very Weak (0-1)' }),   color: 'hsl(6 55% 78%)' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <span
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 3,
                  background: item.color,
                  border: item.border ? `1px solid ${C.goldSoft}` : 'none',
                  display: 'inline-block',
                }}
              />
              <span
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '10px',
                  color: C.brownSoft,
                }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ 3. Reading guide ═══ */}
      <div
        className="rounded-2xl p-6 md:p-8 space-y-4"
        style={{ background: C.ivory, border: `1px solid ${CA.goldSoft(0.35)}` }}
      >
        <div>
          <p
            className="text-[10px] uppercase tracking-[0.3em] font-semibold"
            style={{ color: C.gold, fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            {t('ashtakavarga.readingTitle', { defaultValue: 'How to read the grid' })}
          </p>
          <p
            className="mt-3 leading-relaxed"
            style={{
              fontFamily: "'Cormorant Garamond', 'Crimson Pro', Georgia, serif",
              fontSize: '15px',
              color: C.brown,
            }}
          >
            {t('ashtakavarga.readingBody', {
              defaultValue:
                "Each planet contributes bindus to each house — its willingness to support that house's affairs. Read a column top-to-bottom: when several planets agree, the house gives materially. When they disagree, effort is required. The SAV row is the sum.",
            })}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4" style={{ borderTop: `1px solid ${CA.goldSoft(0.28)}` }}>
          <div>
            <p
              className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-2"
              style={{ color: 'hsl(150 45% 35%)', fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              ★ {t('ashtakavarga.strongestHouses', { defaultValue: 'Strongest Houses' })}
            </p>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', 'Crimson Pro', Georgia, serif",
                fontSize: '15px',
                color: C.brown,
                lineHeight: 1.55,
              }}
            >
              {`House ${roman[strongest - 1]} (${HOUSE_NAMES[strongest - 1]}) receives ${strongestBindus} bindus — the greatest support the chart gives to a single domain.`}
            </p>
          </div>
          <div>
            <p
              className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-2"
              style={{ color: 'hsl(6 60% 38%)', fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              ⚠ {t('ashtakavarga.weakestHouses', { defaultValue: 'Weakest Houses' })}
            </p>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', 'Crimson Pro', Georgia, serif",
                fontSize: '15px',
                color: C.brown,
                lineHeight: 1.55,
              }}
            >
              {`House ${roman[weakest - 1]} (${HOUSE_NAMES[weakest - 1]}) stands at ${weakestBindus} bindus — the area that asks for conscious effort and steady work.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}