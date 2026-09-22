import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { IconPin } from '@/components/icons';
import { PLANET_GLYPHS, RASHI_GLYPHS } from '@/features/report/lib/glyphs';
import type { BirthData } from '@/domain/astrology/birth-data';
import {
  calculateBirthPanchang,
  PanchangError,
} from '@/infrastructure/astrology/panchang.adapter';
import { PanchangStrip } from '@/features/panchang/components/PanchangStrip';

interface HeroProps {
  profile: BirthData;
  kundli: Record<string, any>;
  onReset: () => void;
}

function formatLongDate(isoDate: string): string {
  const [y, m, d] = isoDate.split('-').map(Number);
  const localDate = new Date(y, m - 1, d, 12, 0, 0);
  return localDate.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
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

export function Hero({ profile, kundli }: HeroProps) {
  const { t } = useTranslation();

  const asc = kundli.ascendant ?? {};
  const moon = kundli.planets?.Moon ?? {};
  const sun = kundli.planets?.Sun ?? {};
  const dasha = kundli.dasha?.currentMahadasha;
  const antar = kundli.dasha?.currentAntar;
  const birthNak = kundli.dasha?.birthNakshatra ?? moon.nakshatra;
  const sav = kundli.ashtakavarga?.sav;
  const strongest = sav?.strongestHouse;
  const strongestData = sav?.houseStrengths?.find((h: any) => h.house === strongest);

  const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

  const identitySigns = [
    {
      key: 'chandra',
      label: t('hero.chandraRashi', { defaultValue: 'Chandra Rashi' }),
      sublabel: t('hero.chandraSub', { defaultValue: 'Moon Sign · Mind' }),
      rashi: moon.rashiName ?? '—',
      glyph: RASHI_GLYPHS[moon.rashiName] ?? '·',
      nakshatra: moon.nakshatra,
      pada: moon.pada,
      degree: formatDegree(moon.degree, moon.minute),
      isPrimary: true,
    },
    {
      key: 'surya',
      label: t('hero.suryaRashi', { defaultValue: 'Surya Rashi' }),
      sublabel: t('hero.suryaSub', { defaultValue: 'Sun Sign · Soul' }),
      rashi: sun.rashiName ?? '—',
      glyph: RASHI_GLYPHS[sun.rashiName] ?? '·',
      nakshatra: sun.nakshatra,
      pada: sun.pada,
      degree: formatDegree(sun.degree, sun.minute),
    },
    {
      key: 'lagna',
      label: t('hero.lagnaRashi', { defaultValue: 'Lagna' }),
      sublabel: t('hero.lagnaSub', { defaultValue: 'Ascendant · Body' }),
      rashi: asc.rashiName ?? '—',
      glyph: RASHI_GLYPHS[asc.rashiName] ?? '·',
      nakshatra: asc.nakshatra,
      pada: asc.pada,
      degree: formatDegree(asc.degree, asc.minute),
    },
  ];

  const secondary = [
    {
      label: t('hero.dasha', { defaultValue: 'Current Mahadasha' }),
      glyph: dasha ? PLANET_GLYPHS[dasha.planet] ?? '·' : '·',
      value: dasha?.planet ?? '—',
      sub: dasha ? `${dasha.progressPercent?.toFixed(1)}% complete` : '',
    },
    {
      label: t('hero.nakshatra', { defaultValue: 'Birth Nakshatra' }),
      glyph: '✦',
      value: birthNak ?? '—',
      sub: moon.pada ? `Pada ${moon.pada}` : '',
    },
    {
      label: t('hero.strongest', { defaultValue: 'Strongest House' }),
      glyph: '★',
      value: strongest ? `House ${ROMAN[strongest - 1]}` : '—',
      sub: strongestData ? `${strongestData.bindus} bindus` : '',
    },
    {
      label: t('hero.antar', { defaultValue: 'Current Antar' }),
      glyph: antar ? PLANET_GLYPHS[antar.planet] ?? '·' : '·',
      value: antar?.planet ?? '—',
      sub: antar ? 'Antardasha' : '',
    },
  ];

  return (
    <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-card">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, hsl(42 60% 98%) 0%, hsl(42 55% 97%) 55%, hsl(38 50% 96%) 100%)',
        }}
      />

      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, hsl(38 90% 60% / 0.12) 0%, transparent 55%)',
        }}
      />

      <div className="relative px-6 pt-12 pb-10 md:pt-14 md:pb-12 space-y-8">
        <div className="flex flex-col items-center gap-5">
          <div
            className="relative rounded-full overflow-hidden"
            style={{
              width: 'clamp(100px, 14vw, 130px)',
              height: 'clamp(100px, 14vw, 130px)',
              border: '2px solid hsl(38 85% 55%)',
              background: 'hsl(42 55% 97%)',
              boxShadow:
                '0 0 0 6px hsl(38 90% 60% / 0.14), 0 0 60px hsl(38 90% 60% / 0.35), 0 8px 24px hsl(30 40% 20% / 0.12)',
            }}
          >
            <img
              src="/ganesh.png"
              alt="Ganesh"
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>

          <p
            className="text-primary text-center"
            style={{
              fontFamily: "'Noto Serif Devanagari', 'Crimson Pro', Georgia, serif",
              fontSize: 'clamp(1.25rem, 2vw, 1.6rem)',
              fontWeight: 600,
              letterSpacing: '0.05em',
              lineHeight: 1.3,
            }}
          >
            ॐ श्री गणेशाय नमः
          </p>

          <div
            className="h-px"
            style={{
              width: 'clamp(140px, 20vw, 220px)',
              background:
                'linear-gradient(to right, transparent, hsl(32 85% 55% / 0.5), transparent)',
            }}
          />
        </div>

        <div className="text-center space-y-3">
          <h1
            className="text-foreground"
            style={{
              fontFamily: "'Crimson Pro', Georgia, serif",
              fontSize: 'clamp(2.25rem, 5.5vw, 3.75rem)',
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            {profile.profileName}
          </h1>
          <p className="text-[11px] uppercase tracking-[0.4em] text-primary font-medium">
            {t('hero.reading', { defaultValue: 'A Vedic Reading' })}
          </p>
        </div>

        <div className="text-center space-y-1.5 text-sm text-muted-foreground">
          <p>
            {formatLongDate(profile.localDate)}
            <span className="mx-2 opacity-40">·</span>
            {formatTime12h(profile.localTime)}
          </p>
          <p className="flex items-center justify-center gap-1.5 text-xs">
            <IconPin size={11} className="text-primary/70" />
            {profile.place.shortLabel}
            <span className="opacity-40 mx-1">·</span>
            <span className="font-mono">{profile.place.timezone}</span>
          </p>
        </div>

        <div className="max-w-3xl mx-auto pt-4">
          <p className="text-center text-[10px] uppercase tracking-[0.35em] text-primary font-semibold mb-4">
            {t('hero.yourRashi', { defaultValue: 'Your Rashi' })}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {identitySigns.map((s) => (
              <div
                key={s.key}
                className={`rounded-2xl border p-5 text-center space-y-2 transition-shadow ${
                  s.isPrimary
                    ? 'border-primary/50 bg-primary/[0.06] shadow-md'
                    : 'border-border/60 bg-background/70'
                }`}
              >
                <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                  {s.label}
                </p>
                <p className="text-[10px] text-muted-foreground italic">{s.sublabel}</p>

                <div className="flex items-center justify-center gap-2 pt-1">
                  <span
                    className="text-3xl leading-none"
                    style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
                  >
                    {s.glyph}
                  </span>
                  <p
                    className={`text-2xl font-bold leading-tight ${
                      s.isPrimary ? 'text-primary' : 'text-foreground'
                    }`}
                    style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
                  >
                    {s.rashi}
                  </p>
                </div>

                <p className="text-xs text-muted-foreground font-mono pt-1">
                  {s.degree}
                </p>
                {s.nakshatra && (
                  <p className="text-[11px] text-muted-foreground">
                    {s.nakshatra}
                    {s.pada ? ` · Pada ${s.pada}` : ''}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-2 pt-2">
          {secondary.map((m) => (
            <div
              key={m.label}
              className="rounded-xl border border-border/60 bg-background/60 backdrop-blur-sm px-4 py-3 space-y-1.5"
            >
              <div className="flex items-center gap-1.5">
                <span
                  className="text-base leading-none"
                  style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
                >
                  {m.glyph}
                </span>
                <p className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground font-semibold">
                  {m.label}
                </p>
              </div>
              <p
                className="text-base font-bold leading-tight text-foreground"
                style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
              >
                {m.value}
              </p>
              {m.sub && (
                <p className="text-[10px] text-muted-foreground font-mono leading-tight">
                  {m.sub}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}