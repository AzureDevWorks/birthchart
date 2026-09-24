import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { BirthData } from '@/domain/astrology/birth-data';
import { rashiImageUrl } from '../lib/rashi-images';
import {
  fromGregorianISO,
  NEPALI_MONTHS,
  NEPALI_MONTHS_EN,
  toDevanagari,
} from '@/infrastructure/calendar/nepali-date';

interface HeroProps {
  profile: BirthData;
  kundli: Record<string, any>;
  onReset: () => void;
}

// --- Manuscript palette ---------------------------------------------------

import { MANUSCRIPT_ALPHA as CA } from '../lib/manuscript-colors';

const C = {
  ivory:      'hsl(var(--manuscript-ivory))',
  ivoryDeep:  'hsl(var(--manuscript-ivory-deep))',
  brown:      'hsl(var(--manuscript-brown))',
  brownSoft:  'hsl(var(--manuscript-brown-soft))',
  vermilion:  'hsl(var(--manuscript-vermilion))',
  gold:       'hsl(var(--manuscript-gold))',
  goldSoft:   'hsl(var(--manuscript-gold-soft))',
};

// --- Formatting -----------------------------------------------------------

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
  return `${d}\u00B0 ${String(m).padStart(2, '0')}\u2032`;
}

// --- BS date formatting ---------------------------------------------------

interface BSDisplay {
  devanagari: string;
  latin:      string;
}

function computeBSDisplay(isoDate: string): BSDisplay | null {
  const bs = fromGregorianISO(isoDate);
  if (!bs) return null;
  const monthHi = NEPALI_MONTHS[bs.month] ?? '';
  const monthEn = NEPALI_MONTHS_EN[bs.month] ?? '';
  return {
    devanagari: `${monthHi} ${toDevanagari(bs.day)}, ${toDevanagari(bs.year)}`,
    latin: `${monthEn} ${bs.day}, ${bs.year}`,
  };
}

// --- Devanagari lookups ---------------------------------------------------

const RASHI_DEVANAGARI: Record<string, string> = {
  Aries:       '\u092E\u0947\u0937',
  Taurus:      '\u0935\u0943\u0937\u092D',
  Gemini:      '\u092E\u093F\u0925\u0941\u0928',
  Cancer:      '\u0915\u0930\u094D\u0915',
  Leo:         '\u0938\u093F\u0902\u0939',
  Virgo:       '\u0915\u0928\u094D\u092F\u093E',
  Libra:       '\u0924\u0941\u0932\u093E',
  Scorpio:     '\u0935\u0943\u0936\u094D\u091A\u093F\u0915',
  Sagittarius: '\u0927\u0928\u0941',
  Capricorn:   '\u092E\u0915\u0930',
  Aquarius:    '\u0915\u0941\u092E\u094D\u092D',
  Pisces:      '\u092E\u0940\u0928',
};

// --- Rashi symbol - fine-line SVG medallions ------------------------------

function RashiSymbol({ rashi, size = 26 }: { rashi: string; size?: number }) {
  const stroke = C.gold;
  const common = {
    width: size, height: size, viewBox: '0 0 24 24',
    fill: 'none', stroke, strokeWidth: 1,
    strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
  };
  switch (rashi) {
    case 'Aries': return (<svg {...common}><path d="M 12 20 L 12 10" /><path d="M 12 10 C 8 10, 4 8, 4 4 C 5 3, 7 4, 8 6 C 10 9, 11 10, 12 10" /><path d="M 12 10 C 16 10, 20 8, 20 4 C 19 3, 17 4, 16 6 C 14 9, 13 10, 12 10" /></svg>);
    case 'Taurus': return (<svg {...common}><circle cx="12" cy="14" r="4" /><path d="M 8 12 C 6 8, 4 8, 4 4 C 5 4, 6 5, 6 7" /><path d="M 16 12 C 18 8, 20 8, 20 4 C 19 4, 18 5, 18 7" /></svg>);
    case 'Gemini': return (<svg {...common}><path d="M 9 4 L 9 20" /><path d="M 15 4 L 15 20" /><path d="M 6 4 L 12 4" /><path d="M 12 4 L 18 4" /><path d="M 6 20 L 12 20" /><path d="M 12 20 L 18 20" /></svg>);
    case 'Cancer': return (<svg {...common}><path d="M 10 8 C 6 8, 4 10, 5 14 C 6 16, 8 16, 9 15" /><path d="M 14 8 C 18 8, 20 10, 19 14 C 18 16, 16 16, 15 15" /><path d="M 10 8 L 12 11" /><path d="M 14 8 L 12 11" /></svg>);
    case 'Leo': return (<svg {...common}><circle cx="12" cy="12" r="4" /><path d="M 12 4 L 12 6" /><path d="M 12 18 L 12 20" /><path d="M 4 12 L 6 12" /><path d="M 18 12 L 20 12" /><path d="M 6.5 6.5 L 8 8" /><path d="M 16 16 L 17.5 17.5" /><path d="M 17.5 6.5 L 16 8" /><path d="M 8 16 L 6.5 17.5" /></svg>);
    case 'Virgo': return (<svg {...common}><circle cx="9" cy="7" r="3" /><path d="M 6 14 C 6 20, 10 20, 10 14 L 10 10" /><path d="M 14 10 L 14 20" /><path d="M 14 13 L 17 11" /><path d="M 14 16 L 17 14" /></svg>);
    case 'Libra': return (<svg {...common}><path d="M 12 4 L 12 20" /><path d="M 4 8 L 20 8" /><path d="M 6 8 L 4 14 L 8 14 Z" /><path d="M 18 8 L 16 14 L 20 14 Z" /><path d="M 6 20 L 18 20" /></svg>);
    case 'Scorpio': return (<svg {...common}><path d="M 5 12 C 5 8, 9 6, 13 7 C 17 8, 18 12, 16 15 C 15 17, 13 17, 13 15" /><path d="M 5 12 L 3 14" /><path d="M 5 12 L 6 15" /><path d="M 12 15 L 12 19" /><path d="M 10 19 L 14 19" /></svg>);
    case 'Sagittarius': return (<svg {...common}><path d="M 5 5 C 12 5, 19 12, 19 19" /><path d="M 5 19 L 19 5" /><path d="M 15 5 L 19 5 L 19 9" /></svg>);
    case 'Capricorn': return (<svg {...common}><path d="M 5 12 C 5 6, 10 5, 12 9 C 14 5, 19 6, 19 12" /><path d="M 5 12 L 5 18 L 8 18" /><path d="M 19 12 L 19 18 L 16 18" /><circle cx="12" cy="9" r="0.6" fill={stroke} /></svg>);
    case 'Aquarius': return (<svg {...common}><path d="M 6 8 L 18 8 L 17 19 L 7 19 Z" /><path d="M 5 6 L 19 6" /><path d="M 9 3 L 15 3" /><path d="M 8 12 L 16 12" /><path d="M 9 15 L 15 15" /></svg>);
    case 'Pisces': return (<svg {...common}><path d="M 4 9 C 8 6, 14 6, 18 9" /><path d="M 4 9 L 4 12 L 7 10.5 Z" /><path d="M 6 15 C 10 18, 14 18, 18 15" /><path d="M 18 15 L 18 12 L 15 13.5 Z" /></svg>);
    default: return null;
  }
}

// --- Titles ---------------------------------------------------------------

const TITLES = {
  en: {
    devanagari: '\u091C\u0928\u094D\u092E \u0915\u0941\u0923\u094D\u0921\u0932\u0940',
    latin: 'JANMA KUNDALI',
    mantraDev: '\u0950 \u0917\u0923\u0947\u0936\u093E\u092F \u0928\u092E\u0903',
    mantraIast: '\u015Ar\u012B Ga\u1E47e\u015B\u0101ya Nama\u1E25',
  },
  hi: {
    devanagari: '\u091C\u0928\u094D\u092E \u0915\u0941\u0923\u094D\u0921\u0932\u0940',
    latin: 'JANMA KUNDALI',
    mantraDev: '\u0950 \u0917\u0923\u0947\u0936\u093E\u092F \u0928\u092E\u0903',
    mantraIast: '\u015Ar\u012B Ga\u1E47e\u015B\u0101ya Nama\u1E25',
  },
  ne: {
    devanagari: '\u091C\u0928\u094D\u092E \u0915\u0941\u0923\u094D\u0921\u0932\u0940',
    latin: 'JANMA KUNDALI',
    mantraDev: '\u0950 \u0917\u0923\u0947\u0936\u093E\u092F \u0928\u092E\u0903',
    mantraIast: '\u015Ar\u012B Ga\u1E47e\u015B\u0101ya Nama\u1E25',
  },
} as const;

// --- The Hero -------------------------------------------------------------

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

  const lagnaName = asc.rashiName ?? '-';
  const chandraName = moon.rashiName ?? '-';
  const suryaName = sun.rashiName ?? '-';

  const lagnaDev = RASHI_DEVANAGARI[lagnaName] ?? lagnaName;
  const chandraDev = RASHI_DEVANAGARI[chandraName] ?? chandraName;
  const suryaDev = RASHI_DEVANAGARI[suryaName] ?? suryaName;

  const nameLines = (() => {
    const parts = profile.profileName.trim().split(/\s+/);
    if (parts.length === 1) return [parts[0]];
    return [parts[0], parts.slice(1).join(' ')];
  })();

  const isSingleLineName = nameLines.length === 1;
  const bsDisplay = computeBSDisplay(profile.localDate);

  return (
    <section
      className="relative overflow-hidden rounded-3xl"
      style={{
        border: `1px solid ${CA.goldSoft(0.27)}`,
        background: `linear-gradient(180deg, ${C.ivory} 0%, ${C.ivoryDeep} 100%)`,
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none select-none"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 30%, ${CA.gold(0.09)} 0%, transparent 55%)`,
        }}
      />

      <div className="relative px-6 py-14 md:py-20 flex flex-col items-center">

        {/* GANESHA */}
        <div
          className="rounded-full overflow-hidden"
          style={{
            width: 'clamp(48px, 5vw, 64px)',
            height: 'clamp(48px, 5vw, 64px)',
            border: `1px solid ${CA.gold(0.33)}`,
            boxShadow: `0 0 0 4px ${C.ivoryDeep}, 0 0 0 5px ${CA.gold(0.13)}`,
          }}
        >
          <img src="/ganesh.png" alt="Lord Ganesha" className="w-full h-full object-cover" draggable={false} />
        </div>

        {/* INVOCATION */}
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

        {/* TITLE */}
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

        {/* NAME */}
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
                letterSpacing: isDevanagari ? '0.12em' : isSingleLineName ? '0.22em' : '0.16em',
                textTransform: isDevanagari ? 'none' : 'uppercase',
              }}
            >
              {line}
            </p>
          ))}
        </div>

        {/* BIRTH LEDGER */}
        <div className="text-center mt-8 space-y-2">
          <p
            className="leading-none"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '13px',
              color: C.brown,
            }}
          >
            <span>{formatDate(profile.localDate, lang)}</span>
            <span className="mx-2.5" style={{ color: C.gold, opacity: 0.7 }}>{'\u00B7'}</span>
            <span className="font-mono tabular-nums">{formatTime12h(profile.localTime)}</span>
          </p>

          {bsDisplay && (
            <p
              className="leading-none"
              style={{
                fontFamily: "'Noto Serif Devanagari', serif",
                fontSize: '12px',
                color: C.gold,
                letterSpacing: '0.02em',
                opacity: 0.85,
              }}
            >
              {bsDisplay.devanagari}
              <span className="mx-2" style={{ opacity: 0.5 }}>{'\u00B7'}</span>
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: '11px',
                  letterSpacing: '0.06em',
                }}
              >
                {bsDisplay.latin}
              </span>
            </p>
          )}

          <p
            className="leading-none pt-1"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '12px',
              color: C.brownSoft,
            }}
          >
            {profile.place.shortLabel}
          </p>
        </div>

        {/* RASHI TRIO */}
        <div className="mt-12 flex items-start justify-center gap-6 md:gap-10 flex-wrap">
          <RashiMedallion
            rashiName={lagnaName} rashiDev={lagnaDev}
            label={isDevanagari ? '\u0932\u0917\u094D\u0928' : 'Lagna'}
            sublabel={isDevanagari ? '\u0924\u0928' : 'Body'}
            degree={formatDegree(asc.degree, asc.minute)}
            isDevanagari={isDevanagari} primary
          />
          <RashiMedallion
            rashiName={chandraName} rashiDev={chandraDev}
            label={isDevanagari ? '\u091A\u0928\u094D\u0926\u094D\u0930' : 'Chandra'}
            sublabel={isDevanagari ? '\u092E\u0928' : 'Mind'}
            degree={formatDegree(moon.degree, moon.minute)}
            isDevanagari={isDevanagari}
          />
          <RashiMedallion
            rashiName={suryaName} rashiDev={suryaDev}
            label={isDevanagari ? '\u0938\u0942\u0930\u094D\u092F' : 'Surya'}
            sublabel={isDevanagari ? '\u0906\u0924\u094D\u092E\u093E' : 'Soul'}
            degree={formatDegree(sun.degree, sun.minute)}
            isDevanagari={isDevanagari}
          />
        </div>

        {/* DIVIDER */}
        <div
          className="flex items-center justify-center my-10 select-none"
          style={{ width: 'clamp(200px, 26vw, 280px)' }}
          aria-hidden="true"
        >
          <span
            className="h-px flex-1"
            style={{ background: `linear-gradient(to right, transparent, ${CA.gold(0.33)}, transparent)` }}
          />
          <span className="mx-3" style={{ fontSize: '9px', color: C.gold, lineHeight: 1, opacity: 0.9 }}>{'\u2726'}</span>
          <span
            className="h-px flex-1"
            style={{ background: `linear-gradient(to left, transparent, ${CA.gold(0.33)}, transparent)` }}
          />
        </div>

        {/* CALCULATION STRIP */}
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
                <span aria-hidden="true" style={{ fontSize: '8px', color: C.gold, opacity: 0.6 }}>{'\u00B7'}</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Rashi Medallion ------------------------------------------------------

function RashiImageFill({ rashiName, fallbackSize }: { rashiName: string; fallbackSize: number }) {
  const [failed, setFailed] = useState(false);
  const url = rashiImageUrl(rashiName);
  if (!url || failed) {
    return <RashiSymbol rashi={rashiName} size={fallbackSize} />;
  }
  return (
    <img
      src={url}
      alt={rashiName}
      onError={() => setFailed(true)}
      className="w-full h-full object-cover"
      draggable={false}
    />
  );
}

function RashiMedallion({
  rashiName, rashiDev, label, sublabel, degree, isDevanagari, primary,
}: {
  rashiName: string; rashiDev: string; label: string; sublabel: string;
  degree: string; isDevanagari: boolean; primary?: boolean;
}) {
  return (
    <div className="flex flex-col items-center" style={{ minWidth: '92px' }}>
      <div
        className="rounded-full flex items-center justify-center"
        style={{
          width: 'clamp(56px, 6.5vw, 72px)',
          height: 'clamp(56px, 6.5vw, 72px)',
          border: `1px solid ${primary ? C.gold + '88' : C.gold + '55'}`,
          background: primary
            ? `radial-gradient(circle at 50% 40%, ${C.ivory}, ${C.ivoryDeep})`
            : C.ivory,
          boxShadow: primary
            ? `0 0 0 4px ${C.ivoryDeep}, 0 0 0 5px ${CA.gold(0.13)}, inset 0 0 12px ${CA.gold(0.09)}`
            : `inset 0 0 8px ${C.gold}12`,
        }}
      >
        <RashiImageFill rashiName={rashiName} fallbackSize={30} />
      </div>

      <div className="text-center mt-4 space-y-0.5">
        <p
          className="leading-none"
          style={{
            fontFamily: "'Tiro Devanagari Sanskrit', 'Noto Serif Devanagari', serif",
            fontSize: '15px', color: C.brown, fontWeight: 500, letterSpacing: '0.02em',
          }}
        >
          {rashiDev}
        </p>
        <p
          className="leading-none"
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '9px', color: C.gold,
            letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 600,
          }}
        >
          {rashiName}
        </p>
      </div>

      <div className="text-center mt-3 space-y-0.5">
        <p
          style={{
            fontFamily: isDevanagari
              ? "'Noto Serif Devanagari', serif"
              : "'Cormorant Garamond', 'Crimson Pro', Georgia, serif",
            fontSize: '12px', color: C.brownSoft, fontWeight: 500,
            letterSpacing: isDevanagari ? '0.02em' : '0.1em',
          }}
        >
          {label} {'\u00B7'} <span style={{ opacity: 0.7 }}>{sublabel}</span>
        </p>
        <p
          style={{
            fontFamily: 'ui-monospace, monospace',
            fontSize: '9px', color: C.brownSoft, opacity: 0.65,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {degree}
        </p>
      </div>
    </div>
  );
}
