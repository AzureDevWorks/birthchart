import { VedicChart } from '@/features/chart/components/VedicChart';
import { useChartStyleStore } from '@/features/chart/lib/useChartStyle';
import type { ChartHouse } from '@/features/chart/types';
import { MANUSCRIPT as C, MANUSCRIPT_ALPHA as CA } from '../lib/manuscript-colors';

// ─── Manuscript palette ─────────────────────────────────────


// ─── Primary Chart Card ─────────────────────────────────────
// Used for D1 Rashi and D9 Navamsha — the foundational pair.

interface PrimaryChartCardProps {
  code: string;              // "D1", "D9"
  name: string;              // "Rashi", "Navamsha"
  devanagari?: string;       // "राशि", "नवांश"
  subtitle: string;          // "Body · Personality · Life Path"
  intro: string;             // 2-sentence introduction
  lagna: string;
  lagnaDegree?: string;
  useFor: string[];
  houses: ChartHouse[];
  chartSize?: number;
  accent?: boolean;          // D1 gets this — a mark of being the root chart
}

export function PrimaryChartCard({
  code,
  name,
  devanagari,
  subtitle,
  intro,
  lagna,
  lagnaDegree,
  useFor,
  houses,
  chartSize = 320,
  accent = false,
}: PrimaryChartCardProps) {
  const style = useChartStyleStore((s) => s.style);

  return (
    <article
      className="rounded-2xl flex flex-col overflow-hidden"
      style={{
        border: `1px solid ${CA.goldSoft(0.35)}`,
        background: `linear-gradient(180deg, ${C.ivory} 0%, ${C.ivoryDeep} 100%)`,
      }}
    >
      {/* ─── Header ─── */}
      <div
        className="px-6 py-5"
        style={{ borderBottom: `1px solid ${CA.goldSoft(0.28)}` }}
      >
        <div className="flex items-baseline justify-between gap-3">
          <p
            className="leading-none"
            style={{
              fontFamily: "'Cormorant Garamond', 'Crimson Pro', Georgia, serif",
              fontSize: '26px',
              fontWeight: 700,
              color: accent ? C.vermilion : C.brown,
              letterSpacing: '0.08em',
            }}
          >
            {code}
          </p>
          {devanagari && (
            <p
              className="leading-none"
              style={{
                fontFamily: "'Tiro Devanagari Sanskrit', 'Noto Serif Devanagari', serif",
                fontSize: '14px',
                color: C.gold,
                letterSpacing: '0.03em',
                opacity: 0.8,
              }}
            >
              {devanagari}
            </p>
          )}
        </div>
        <p
          className="leading-tight mt-1"
          style={{
            fontFamily: "'Cormorant Garamond', 'Crimson Pro', Georgia, serif",
            fontSize: '20px',
            fontWeight: 600,
            color: C.brown,
            letterSpacing: '0.02em',
          }}
        >
          {name}
        </p>
        <p
          className="mt-2"
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '10px',
            color: C.gold,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* ─── Chart ─── */}
      <div className="flex justify-center py-6 px-4">
        <VedicChart
          size={chartSize}
          houses={houses}
          style={style}
          hideToggle
        />
      </div>

      {/* ─── Lagna line ─── */}
      <div
        className="px-6 py-3 flex items-baseline justify-between gap-3"
        style={{ borderTop: `1px solid ${CA.goldSoft(0.20)}` }}
      >
        <span
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '10px',
            color: C.brownSoft,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          Lagna
        </span>
        <span className="flex items-baseline gap-2">
          <strong
            style={{
              fontFamily: "'Cormorant Garamond', 'Crimson Pro', Georgia, serif",
              fontSize: '17px',
              fontWeight: 600,
              color: C.brown,
              letterSpacing: '0.02em',
            }}
          >
            {lagna}
          </strong>
          {lagnaDegree && (
            <span
              style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: '11px',
                color: C.brownSoft,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {lagnaDegree}
            </span>
          )}
        </span>
      </div>

      {/* ─── Intro + Use for ─── */}
      <div
        className="px-6 pt-5 pb-6 space-y-4 mt-auto"
        style={{ borderTop: `1px solid ${CA.goldSoft(0.20)}` }}
      >
        <p
          className="leading-relaxed"
          style={{
            fontFamily: "'Cormorant Garamond', 'Crimson Pro', Georgia, serif",
            fontSize: '15px',
            color: C.brownSoft,
            fontStyle: 'italic',
          }}
        >
          {intro}
        </p>

        <div className="space-y-1.5">
          <p
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '9px',
              color: C.gold,
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            Use for
          </p>
          <ul className="space-y-1">
            {useFor.map((u) => (
              <li key={u} className="flex items-start gap-2">
                <span style={{ color: C.gold, fontSize: '10px', marginTop: 3, lineHeight: 1 }}>
                  ◆
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: '13px',
                    color: C.brown,
                    lineHeight: 1.5,
                  }}
                >
                  {u}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

// ─── Reference Chart Card ───────────────────────────────────
// Used for Chandra and Surya Kundlis — the lens views.

interface ReferenceChartCardProps {
  name: string;              // "Chandra Kundli", "Surya Kundli"
  devanagari?: string;       // "चन्द्र कुण्डली"
  subtitle: string;          // "Moon Chart · Mind"
  lagna: string;
  lagnaDegree?: string;
  tags: string[];            // ["Transits", "Mind", "Psychology"]
  houses: ChartHouse[];
  chartSize?: number;
}

export function ReferenceChartCard({
  name,
  devanagari,
  subtitle,
  lagna,
  lagnaDegree,
  tags,
  houses,
  chartSize = 260,
}: ReferenceChartCardProps) {
  const style = useChartStyleStore((s) => s.style);

  return (
    <article
      className="rounded-2xl flex flex-col overflow-hidden"
      style={{
        border: `1px solid ${CA.goldSoft(0.20)}`,
        background: C.ivory,
      }}
    >
      {/* ─── Header ─── */}
      <div className="px-5 py-4" style={{ borderBottom: `1px solid ${CA.goldSoft(0.20)}` }}>
        <div className="flex items-baseline justify-between gap-3">
          <p
            className="leading-tight"
            style={{
              fontFamily: "'Cormorant Garamond', 'Crimson Pro', Georgia, serif",
              fontSize: '18px',
              fontWeight: 600,
              color: C.brown,
              letterSpacing: '0.02em',
            }}
          >
            {name}
          </p>
          {devanagari && (
            <p
              className="leading-none"
              style={{
                fontFamily: "'Tiro Devanagari Sanskrit', 'Noto Serif Devanagari', serif",
                fontSize: '12px',
                color: C.gold,
                opacity: 0.75,
              }}
            >
              {devanagari}
            </p>
          )}
        </div>
        <p
          className="mt-1"
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '9px',
            color: C.gold,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* ─── Chart ─── */}
      <div className="flex justify-center py-4 px-4">
        <VedicChart
          size={chartSize}
          houses={houses}
          style={style}
          hideToggle
        />
      </div>

      {/* ─── Footer ─── */}
      <div
        className="px-5 py-3 space-y-2.5 mt-auto"
        style={{ borderTop: `1px solid ${CA.goldSoft(0.20)}` }}
      >
        <div className="flex items-baseline justify-between gap-3">
          <span
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '9px',
              color: C.brownSoft,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            Lagna
          </span>
          <span className="flex items-baseline gap-2">
            <strong
              style={{
                fontFamily: "'Cormorant Garamond', 'Crimson Pro', Georgia, serif",
                fontSize: '15px',
                fontWeight: 600,
                color: C.brown,
              }}
            >
              {lagna}
            </strong>
            {lagnaDegree && (
              <span
                style={{
                  fontFamily: 'ui-monospace, monospace',
                  fontSize: '10px',
                  color: C.brownSoft,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {lagnaDegree}
              </span>
            )}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '10px',
                color: C.gold,
                letterSpacing: '0.08em',
                padding: '3px 8px',
                border: `1px solid ${CA.gold(0.28)}`,
                borderRadius: '4px',
                fontWeight: 500,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}