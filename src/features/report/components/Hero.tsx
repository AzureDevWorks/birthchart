import { useTranslation } from 'react-i18next';
import type { BirthData } from '@/domain/astrology/birth-data';
import { MANUSCRIPT as C, MANUSCRIPT_ALPHA as CA } from '../lib/manuscript-colors';

interface HeroProps {
  profile: BirthData;
  kundli: Record<string, any>;
  onReset: () => void;
}

// ─── Manuscript palette ─────────────────────────────────────


// ─── Formatting ─────────────────────────────────────────────

function formatDate(isoDate: string, lang: 'en' | 'hi' | 'ne'): string {
  const [y, m, d] = isoDate.split('-').map(Number);
  const dt = new Date(y, m - 1, d, 12, 0, 0);
  const locale = { en: 'en-GB', hi: 'hi-IN', ne: 'ne-NP' }[lang];
  return dt.toLocaleDateString(locale, { day: '2-digit', month: 'long', year: 'numeric' });
}

function formatTime12h(time24: string): string {
  const [h, m] = time24.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return `${String(h12).padStart(2, '0')}:${String(m ?? 0).padStart(2, '0')} ${suffix}`;
}

function formatDegree(deg?: number, min?: number): string {
  const d = deg ?? 0;
  const m = min ?? 0;
  return `${d}° ${String(m).padStart(2, '0')}′`;
}

// ─── Devanagari lookups ─────────────────────────────────────

const RASHI_DEVANAGARI: Record<string, string> = {
  Aries: 'मेष', Taurus: 'वृष', Gemini: 'मिथुन', Cancer: 'कर्क',
  Leo: 'सिंह', Virgo: 'कन्या', Libra: 'तुला', Scorpio: 'वृश्चिक',
  Sagittarius: 'धनु', Capricorn: 'मकर', Aquarius: 'कुम्भ', Pisces: 'मीन',
};

// ─── Rashi symbol — fine-line SVG medallions ────────────────
// Each is a 24x24 viewBox; drawn as hairline strokes.
// Represents the traditional Vedic iconography for that rashi.

function RashiSymbol({ rashi, size = 26 }: { rashi: string; size?: number }) {
  const stroke = C.gold;
  const sw = 1;

  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke,
    strokeWidth: sw,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  switch (rashi) {
    case 'Aries':  // Ram's horns
      return (
        <svg {...common}>
          <path d="M 12 20 L 12 10" />
          <path d="M 12 10 C 8 10, 4 8, 4 4 C 5 3, 7 4, 8 6 C 10 9, 11 10, 12 10" />
          <path d="M 12 10 C 16 10, 20 8, 20 4 C 19 3, 17 4, 16 6 C 14 9, 13 10, 12 10" />
        </svg>
      );
    case 'Taurus':  // Bull's head
      return (
        <svg {...common}>
          <circle cx="12" cy="14" r="4" />
          <path d="M 8 12 C 6 8, 4 8, 4 4 C 5 4, 6 5, 6 7" />
          <path d="M 16 12 C 18 8, 20 8, 20 4 C 19 4, 18 5, 18 7" />
        </svg>
      );
    case 'Gemini':  // Twin pillars
      return (
        <svg {...common}>
          <path d="M 9 4 L 9 20" />
          <path d="M 15 4 L 15 20" />
          <path d="M 6 4 L 12 4" />
          <path d="M 12 4 L 18 4" />
          <path d="M 6 20 L 12 20" />
          <path d="M 12 20 L 18 20" />
        </svg>
      );
    case 'Cancer':  // Crab claws (two facing brackets)
      return (
        <svg {...common}>
          <path d="M 10 8 C 6 8, 4 10, 5 14 C 6 16, 8 16, 9 15" />
          <path d="M 14 8 C 18 8, 20 10, 19 14 C 18 16, 16 16, 15 15" />
          <path d="M 10 8 L 12 11" />
          <path d="M 14 8 L 12 11" />
        </svg>
      );
    case 'Leo':  // Sun disc with mane
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="4" />
          <path d="M 12 4 L 12 6" />
          <path d="M 12 18 L 12 20" />
          <path d="M 4 12 L 6 12" />
          <path d="M 18 12 L 20 12" />
          <path d="M 6.5 6.5 L 8 8" />
          <path d="M 16 16 L 17.5 17.5" />
          <path d="M 17.5 6.5 L 16 8" />
          <path d="M 8 16 L 6.5 17.5" />
        </svg>
      );
    case 'Virgo':  // Maiden with sheaf
      return (
        <svg {...common}>
          <circle cx="9" cy="7" r="3" />
          <path d="M 6 14 C 6 20, 10 20, 10 14 L 10 10" />
          <path d="M 14 10 L 14 20" />
          <path d="M 14 13 L 17 11" />
          <path d="M 14 16 L 17 14" />
        </svg>
      );
    case 'Libra':  // Balance scales
      return (
        <svg {...common}>
          <path d="M 12 4 L 12 20" />
          <path d="M 4 8 L 20 8" />
          <path d="M 6 8 L 4 14 L 8 14 Z" />
          <path d="M 18 8 L 16 14 L 20 14 Z" />
          <path d="M 6 20 L 18 20" />
        </svg>
      );
    case 'Scorpio':  // Scorpion / serpent
      return (
        <svg {...common}>
          <path d="M 5 12 C 5 8, 9 6, 13 7 C 17 8, 18 12, 16 15 C 15 17, 13 17, 13 15" />
          <path d="M 5 12 L 3 14" />
          <path d="M 5 12 L 6 15" />
          <path d="M 12 15 L 12 19" />
          <path d="M 10 19 L 14 19" />
        </svg>
      );
    case 'Sagittarius':  // Archer's bow & arrow
      return (
        <svg {...common}>
          <path d="M 5 5 C 12 5, 19 12, 19 19" />
          <path d="M 5 19 L 19 5" />
          <path d="M 15 5 L 19 5 L 19 9" />
        </svg>
      );
    case 'Capricorn':  // Crocodile / mountain goat
      return (
        <svg {...common}>
          <path d="M 5 12 C 5 6, 10 5, 12 9 C 14 5, 19 6, 19 12" />
          <path d="M 5 12 L 5 18 L 8 18" />
          <path d="M 19 12 L 19 18 L 16 18" />
          <circle cx="12" cy="9" r="0.6" fill={stroke} />
        </svg>
      );
    case 'Aquarius':  // Water pot
      return (
        <svg {...common}>
          <path d="M 6 8 L 18 8 L 17 19 L 7 19 Z" />
          <path d="M 5 6 L 19 6" />
          <path d="M 9 3 L 15 3" />
          <path d="M 8 12 L 16 12" />
          <path d="M 9 15 L 15 15" />
        </svg>
      );
    case 'Pisces':  // Two fish
      return (
        <svg {...common}>
          <path d="M 4 9 C 8 6, 14 6, 18 9" />
          <path d="M 4 9 L 4 12 L 7 10.5 Z" />
          <path d="M 6 15 C 10 18, 14 18, 18 15" />
          <path d="M 18 15 L 18 12 L 15 13.5 Z" />
        </svg>
      );
    default:
      return null;
  }
}

// ─── Titles ─────────────────────────────────────────────────

const TITLES = {
  en: { devanagari: 'जन्म कुण्डली', latin: 'JANMA KUNDALI', mantraDev: 'श्री गणेशाय नमः', mantraIast: 'Śrī Gaṇeśāya Namaḥ' },
  hi: { devanagari: 'जन्म कुण्डली', latin: 'JANMA KUNDALI', mantraDev: 'श्री गणेशाय नमः', mantraIast: 'Śrī Gaṇeśāya Namaḥ' },
  ne: { devanagari: 'जन्म कुण्डली', latin: 'JANMA KUNDALI', mantraDev: 'श्री गणेशाय नमः', mantraIast: 'Śrī Gaṇeśāya Namaḥ' },
} as const;

// ─── The Hero ───────────────────────────────────────────────

export function Hero({ profile, kundli }: HeroProps) {
  const { i18n } = useTranslation();

  const lang = (i18n.resolvedLanguage === 'ne'
    ? 'ne'
    : i18n.resolvedLanguage === 'hi'
      ? 'hi'
      : 'en') as 'en' | 'hi' | 'ne';

  const isDevanagari = lang !== 'en';
  const T = TITLES[lang];

  const asc = kundli.ascendant ?? {};
  const moon = kundli.planets?.Moon ?? {};
  const sun = kundli.planets?.Sun ?? {};

  const lagnaName = asc.rashiName ?? '—';
  const chandraName = moon.rashiName ?? '—';
  const suryaName = sun.rashiName ?? '—';

  const lagnaDev = RASHI_DEVANAGARI[lagnaName] ?? lagnaName;
  const chandraDev = RASHI_DEVANAGARI[chandraName] ?? chandraName;
  const suryaDev = RASHI_DEVANAGARI[suryaName] ?? suryaName;

  const nameLines = (() => {
    const parts = profile.profileName.trim().split(/\s+/);
    if (parts.length === 1) return [parts[0]];
    return [parts[0], parts.slice(1).join(' ')];
  })();

  const isSingleLineName = nameLines.length === 1;

  return (
    <section
      className="relative overflow-hidden rounded-3xl"
      style={{
        border: `1px solid ${CA.goldSoft(0.28)}`,
        background: `linear-gradient(180deg, ${C.ivory} 0%, ${C.ivoryDeep} 100%)`,
      }}
    >
      {/* Faint yantra */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 30%, ${CA.gold(0.10)} 0%, transparent 55%)`,
        }}
      />

      <div className="relative px-6 py-14 md:py-20 flex flex-col items-center">

        {/* ═══ 1. GANESHA ═══ */}
        <div
          className="rounded-full overflow-hidden"
          style={{
            width: 'clamp(48px, 5vw, 64px)',
            height: 'clamp(48px, 5vw, 64px)',
            border: `1px solid ${CA.gold(0.35)}`,
            boxShadow: `0 0 0 4px ${C.ivoryDeep}, 0 0 0 5px ${CA.gold(0.14)}`,
          }}
        >
          <img
            src="/ganesh.png"
            alt="Lord Ganesha"
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>

        {/* ═══ 2. INVOCATION ═══ */}
        <div className="text-center mt-6 space-y-1.5">
          <p
            className="leading-none"
            style={{
              fontFamily: "'Noto Serif Devanagari', serif",
              fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
              color: C.vermilion,
              fontWeight: 500,
              letterSpacing: '0.02em',
            }}
          >
            {T.mantraDev}
          </p>
          <p
            className="leading-none italic"
            style={{
              fontFamily: "'Cormorant Garamond', 'Crimson Pro', Georgia, serif",
              fontSize: 'clamp(0.62rem, 0.85vw, 0.7rem)',
              color: C.gold,
              opacity: 0.7,
              letterSpacing: '0.12em',
              fontWeight: 500,
            }}
          >
            {T.mantraIast}
          </p>
        </div>

        {/* ═══ 3. CHART IDENTITY ═══ */}
        <div className="text-center mt-12 space-y-1">
          <p
            className="leading-none"
            style={{
              fontFamily: "'Tiro Devanagari Sanskrit', 'Noto Serif Devanagari', serif",
              fontSize: 'clamp(1.35rem, 2vw, 1.65rem)',
              color: C.brown,
              fontWeight: 500,
              letterSpacing: '0.03em',
            }}
          >
            {T.devanagari}
          </p>
          <p
            className="leading-none"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '10px',
              color: C.gold,
              letterSpacing: '0.42em',
              fontWeight: 600,
              textTransform: 'uppercase',
            }}
          >
            {T.latin}
          </p>
        </div>

        {/* ═══ 4. THE NAME ═══ */}
        <div className="text-center mt-10 space-y-1.5">
          {nameLines.map((line, i) => (
            <p
              key={i}
              className="leading-none"
              style={{
                fontFamily: isDevanagari
                  ? "'Tiro Devanagari Sanskrit', 'Noto Serif Devanagari', serif"
                  : "'Cormorant Garamond', 'Crimson Pro', Georgia, serif",
                fontSize: isSingleLineName
                  ? 'clamp(2.35rem, 4.4vw, 3.25rem)'
                  : 'clamp(2rem, 3.8vw, 2.85rem)',
                color: C.brown,
                fontWeight: 600,
                letterSpacing: isDevanagari
                  ? '0.12em'
                  : isSingleLineName
                    ? '0.22em'
                    : '0.16em',
                textTransform: isDevanagari ? 'none' : 'uppercase',
              }}
            >
              {line}
            </p>
          ))}
        </div>

        {/* ═══ 5. BIRTH LEDGER ═══ */}
        <div className="text-center mt-8 space-y-1.5">
          <p
            className="leading-none"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '13px',
              color: C.brown,
            }}
          >
            <span>{formatDate(profile.localDate, lang)}</span>
            <span className="mx-2.5" style={{ color: C.gold, opacity: 0.7 }}>·</span>
            <span className="font-mono tabular-nums">{formatTime12h(profile.localTime)}</span>
          </p>
          <p
            className="leading-none"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '12px',
              color: C.brownSoft,
            }}
          >
            {profile.place.shortLabel}
          </p>
        </div>

        {/* ═══ 6. RASHI TRIO — Lagna · Chandra · Surya ═══ */}
        <div className="mt-12 flex items-start justify-center gap-6 md:gap-10 flex-wrap">
          <RashiMedallion
            rashiName={lagnaName}
            rashiDev={lagnaDev}
            label={isDevanagari ? 'लग्न' : 'Lagna'}
            sublabel={isDevanagari ? 'तनु' : 'Body'}
            degree={formatDegree(asc.degree, asc.minute)}
            isDevanagari={isDevanagari}
            primary
          />
          <RashiMedallion
            rashiName={chandraName}
            rashiDev={chandraDev}
            label={isDevanagari ? 'चन्द्र' : 'Chandra'}
            sublabel={isDevanagari ? 'मन' : 'Mind'}
            degree={formatDegree(moon.degree, moon.minute)}
            isDevanagari={isDevanagari}
          />
          <RashiMedallion
            rashiName={suryaName}
            rashiDev={suryaDev}
            label={isDevanagari ? 'सूर्य' : 'Surya'}
            sublabel={isDevanagari ? 'आत्मा' : 'Soul'}
            degree={formatDegree(sun.degree, sun.minute)}
            isDevanagari={isDevanagari}
          />
        </div>

        {/* ═══ 7. SACRED DIVIDER ═══ */}
        <div
          className="flex items-center justify-center my-10 select-none"
          style={{ width: 'clamp(200px, 26vw, 280px)' }}
          aria-hidden="true"
        >
          <span
            className="h-px flex-1"
            style={{
              background: `linear-gradient(to right, transparent, ${CA.gold(0.35)}, transparent)`,
            }}
          />
          <span className="mx-3" style={{ fontSize: '9px', color: C.gold, lineHeight: 1, opacity: 0.9 }}>
            ✦
          </span>
          <span
            className="h-px flex-1"
            style={{
              background: `linear-gradient(to left, transparent, ${CA.gold(0.35)}, transparent)`,
            }}
          />
        </div>

        {/* ═══ 8. CALCULATION STRIP ═══ */}
        <div className="text-center flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
          {['Sidereal', 'Lahiri', 'Whole Sign'].map((label, i, arr) => (
            <span key={label} className="flex items-center gap-4">
              <span
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '10px',
                  color: C.brownSoft,
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                }}
              >
                {label}
              </span>
              {i < arr.length - 1 && (
                <span aria-hidden="true" style={{ fontSize: '8px', color: C.gold, opacity: 0.6 }}>
                  ·
                </span>
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Rashi Medallion ────────────────────────────────────────

function RashiMedallion({
  rashiName,
  rashiDev,
  label,
  sublabel,
  degree,
  isDevanagari,
  primary,
}: {
  rashiName: string;
  rashiDev: string;
  label: string;
  sublabel: string;
  degree: string;
  isDevanagari: boolean;
  primary?: boolean;
}) {
  return (
    <div className="flex flex-col items-center" style={{ minWidth: '92px' }}>
      {/* Medallion — circular seal with the rashi symbol */}
      <div
        className="rounded-full flex items-center justify-center"
        style={{
          width: 'clamp(56px, 6.5vw, 72px)',
          height: 'clamp(56px, 6.5vw, 72px)',
          border: `1px solid ${primary ? CA.gold(0.55) : CA.gold(0.35)}`,
          background: primary
            ? `radial-gradient(circle at 50% 40%, ${C.ivory}, ${C.ivoryDeep})`
            : C.ivory,
          boxShadow: primary
            ? `0 0 0 4px ${C.ivoryDeep}, 0 0 0 5px ${CA.gold(0.14)}, inset 0 0 12px ${CA.gold(0.10)}`
            : `inset 0 0 8px ${C.gold}12`,
        }}
      >
        <RashiSymbol rashi={rashiName} size={30} />
      </div>

      {/* The rashi name — Devanagari + Latin */}
      <div className="text-center mt-4 space-y-0.5">
        <p
          className="leading-none"
          style={{
            fontFamily: "'Tiro Devanagari Sanskrit', 'Noto Serif Devanagari', serif",
            fontSize: '15px',
            color: C.brown,
            fontWeight: 500,
            letterSpacing: '0.02em',
          }}
        >
          {rashiDev}
        </p>
        <p
          className="leading-none"
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '9px',
            color: C.gold,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          {rashiName}
        </p>
      </div>

      {/* The label — Lagna / Chandra / Surya */}
      <div className="text-center mt-3 space-y-0.5">
        <p
          style={{
            fontFamily: isDevanagari
              ? "'Noto Serif Devanagari', serif"
              : "'Cormorant Garamond', 'Crimson Pro', Georgia, serif",
            fontSize: '12px',
            color: C.brownSoft,
            fontWeight: 500,
            letterSpacing: isDevanagari ? '0.02em' : '0.1em',
          }}
        >
          {label} · <span style={{ opacity: 0.7 }}>{sublabel}</span>
        </p>
        <p
          style={{
            fontFamily: 'ui-monospace, monospace',
            fontSize: '9px',
            color: C.brownSoft,
            opacity: 0.65,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {degree}
        </p>
      </div>
    </div>
  );
}