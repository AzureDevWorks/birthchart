import { useMemo, useState } from 'react';
import { Section } from '@/features/report/primitives/Section';
import { OrnamentalDivider } from '@/features/report/primitives/OrnamentalDivider';
import { useActiveProfile } from '@/features/birth-profile/store';
import { BirthDataError } from '@/infrastructure/astrology/prisri-jyotish.adapter';
import { getCachedKundli } from '@/lib/kundli-cache';
import {
  gocharAdapter,
  GocharError,
  type GocharPlanet,
} from '@/infrastructure/astrology/gochar.adapter';
import { PLANET_GLYPHS, RASHI_GLYPHS } from '@/features/report/lib/glyphs';

const PLANET_ORDER = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'];

// ─────────────────────────────────────────────────────────────
// Knowledge base — what each planet's transit means.
// Short, educational, shown in a collapsible panel on each card.
// ─────────────────────────────────────────────────────────────

interface PlanetInfo {
  nature: 'Benefic' | 'Malefic' | 'Neutral' | 'Node';
  whatItGoverns: string;
  transitEffect: string;
  favorableHouses: string;
  avoidWhen: string;
}

const PLANET_INFO: Record<string, PlanetInfo> = {
  Sun: {
    nature: 'Malefic',
    whatItGoverns: 'Soul, ego, vitality, father, authority, government, career status.',
    transitEffect:
      'The Sun illuminates whatever house it enters — it brings matters of that house into sharp focus, tests your confidence there, and often forces decisions related to authority.',
    favorableHouses: '3, 6, 10, 11 from Moon are considered strong.',
    avoidWhen: '1, 4, 7, 8, 12 — can bring ego clashes and vitality dips.',
  },
  Moon: {
    nature: 'Benefic',
    whatItGoverns: 'Mind, emotions, mother, comfort, habits, daily mental state.',
    transitEffect:
      'The Moon moves fast — roughly one sign every 2.5 days — so its transit is more about your daily mood than long-term fate. It sets the emotional weather.',
    favorableHouses: '1, 3, 6, 7, 10, 11 from Moon are comfortable.',
    avoidWhen: '8th from Moon — this is Chandrashtama; the mind is unusually sensitive.',
  },
  Mars: {
    nature: 'Malefic',
    whatItGoverns: 'Courage, energy, brothers, property, aggression, surgical/technical skill.',
    transitEffect:
      'Mars brings heat, urgency, and the potential for conflict. It accelerates action in the house it occupies — sometimes productively, sometimes through friction.',
    favorableHouses: '3, 6, 11 from Moon channel Mars well.',
    avoidWhen: '1, 4, 7, 8, 12 — accidents, arguments, and property disputes are more likely.',
  },
  Mercury: {
    nature: 'Neutral',
    whatItGoverns: 'Intellect, speech, commerce, writing, siblings, short journeys, learning.',
    transitEffect:
      'Mercury governs how you think and communicate. Its transit colors business dealings, negotiations, and study. Retrograde periods are especially noted for miscommunication.',
    favorableHouses: '2, 4, 5, 6, 10, 11 from Moon sharpen the mind.',
    avoidWhen: 'Retrograde periods — review, don\'t launch.',
  },
  Jupiter: {
    nature: 'Benefic',
    whatItGoverns: 'Wisdom, dharma, teachers, children, wealth, expansion, blessings.',
    transitEffect:
      'Jupiter expands whatever it touches. Its transit is one of the most important for year-level fortune — where it sits, growth, grace, and opportunity flow.',
    favorableHouses: '2, 5, 7, 9, 11 from Moon are especially auspicious.',
    avoidWhen: '3, 6, 8, 12 — the expansion goes into losses or obstacles.',
  },
  Venus: {
    nature: 'Benefic',
    whatItGoverns: 'Love, beauty, marriage, luxury, art, vehicles, comfort, values.',
    transitEffect:
      'Venus brings pleasure, relationships, and aesthetic ease. Its transit softens life and enhances the house it occupies — unless afflicted by Vedha or malefic aspects.',
    favorableHouses: '1, 2, 3, 4, 5, 8, 9, 11, 12 from Moon are supportive.',
    avoidWhen: '6 — pleasure turns into indulgence or expense.',
  },
  Saturn: {
    nature: 'Malefic',
    whatItGoverns: 'Discipline, karma, longevity, labor, delays, service, elders, structure.',
    transitEffect:
      'Saturn teaches through time and patience. Its transits are the longest and most consequential. Sade Sati (over the natal Moon) and Dhaiya (4th/8th from Moon) are the classic long-arc events.',
    favorableHouses: '3, 6, 11 from Moon reward Saturn\'s discipline.',
    avoidWhen: '1, 2, 4, 7, 8, 12 — delays and testing.',
  },
  Rahu: {
    nature: 'Node',
    whatItGoverns: 'Desire, ambition, illusion, foreign things, unconventional paths, obsession.',
    transitEffect:
      'Rahu amplifies hunger. Whatever house it touches becomes a source of intense craving and often of unexpected gains — but the gain rarely satisfies.',
    favorableHouses: '3, 6, 10, 11 from Moon can bring material success.',
    avoidWhen: '1, 4, 7, 8, 12 — fear, confusion, or fixation increases.',
  },
  Ketu: {
    nature: 'Node',
    whatItGoverns: 'Detachment, moksha, past-life karma, sudden losses, spiritual insight.',
    transitEffect:
      'Ketu dissolves. It strips meaning from whatever it touches and pushes you inward. Where Rahu craves, Ketu renounces.',
    favorableHouses: '3, 6, 11 from Moon can grant liberation from burdens.',
    avoidWhen: '1, 4, 7, 8, 12 — disorientation or unexpected detachment.',
  },
};

// "How to read this card" legend shown above the grid
const LEGEND_ITEMS = [
  { label: 'Favorable', tone: 'emerald', desc: 'The transit supports the house it occupies.' },
  { label: 'Unfavorable', tone: 'red', desc: 'The transit creates friction or drag.' },
  { label: 'Obstructed', tone: 'amber', desc: 'Favorable result blocked by Vedha (another planet\'s obstruction).' },
];

// ─────────────────────────────────────────────────────────────
export function GocharView() {
  const profile = useActiveProfile();

  const result = useMemo(() => {
    if (!profile) return { data: null, error: null as string | null };
    try {
      const kundli = getCachedKundli(profile) as unknown as Record<string, any>;
      if (!kundli) throw new BirthDataError('Chart calculation failed.');
      const analysis = gocharAdapter.analyze(kundli, new Date());

      const natalMoonLon = (kundli?.planets?.Moon?.longitude as number) ?? 0;
      const natalSaturnLon = (kundli?.planets?.Saturn?.longitude as number) ?? 0;
      const sadeSatiDirect = gocharAdapter.sadeSati(natalMoonLon, natalSaturnLon);
      const dhaiyaDirect = gocharAdapter.dhaiya(natalMoonLon, natalSaturnLon);

      const saturn = gocharAdapter.planet('Saturn', kundli);
      const jupiter = gocharAdapter.planet('Jupiter', kundli);

      const natalNak = (kundli?.planets?.Moon?.nakshatra as any)?.number ?? 0;
      const currentNak = (analysis.planets.Moon as any)?.nakshatra as any;
      const currentNakIdx = currentNak?.number ?? 0;
      const tarabalam = gocharAdapter.tarabalam(natalNak, currentNakIdx);

      const nowVara = new Date().getDay();
      const dishaShoola = gocharAdapter.dishaShoola(nowVara);

      const chandrashtama = gocharAdapter.chandrashtama(
        analysis.natalMoonRashi,
        analysis.planets.Moon?.rashi ?? 0
      );

      return {
        data: { analysis, sadeSatiDirect, dhaiyaDirect, saturn, jupiter, tarabalam, dishaShoola, chandrashtama },
        error: null,
      };
    } catch (e) {
      const msg =
        e instanceof BirthDataError || e instanceof GocharError
          ? (e as Error).message
          : 'Transit analysis failed.';
      return { data: null, error: msg };
    }
  }, [profile]);

  if (!profile) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-20 text-center space-y-3">
        <p className="text-[10px] uppercase tracking-[0.4em] text-primary font-semibold">Vedic Transits</p>
        <h1 className="font-bold" style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}>
          Gochar
        </h1>
        <p className="text-sm text-muted-foreground">Enter your birth details on the Chart tab first.</p>
      </div>
    );
  }

  if (result.error || !result.data) {
    return (
      <div className="container max-w-3xl mx-auto px-4 py-12">
        <div className="text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-lg px-3 py-2">
          {result.error ?? 'Transit analysis failed.'}
        </div>
      </div>
    );
  }

  const { analysis, sadeSatiDirect, dhaiyaDirect, saturn, jupiter, tarabalam, dishaShoola, chandrashtama } = result.data;
  const { specialTransits: st, planets, lifeAreas, actionableAdvice } = analysis;

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12 space-y-4">

      {/* 1. HEADER */}
      <div className="text-center space-y-2 py-6">
        <p className="text-[10px] uppercase tracking-[0.4em] text-primary font-semibold">Vedic Transits</p>
        <h1 className="font-bold tracking-tight" style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontSize: 'clamp(2rem, 4.5vw, 3rem)', lineHeight: 1.1 }}>
          Gochar
        </h1>
        <p className="text-sm text-muted-foreground">
          {profile.profileName}
          <span className="mx-2 opacity-40">·</span>
          {new Date(analysis.transitDate).toLocaleString('en-GB', { dateStyle: 'full', timeStyle: 'short' })}
        </p>
      </div>

      {/* 2. NATAL REFERENCE */}
      <OrnamentalDivider />
      <Section eyebrow="Reference" title="Your Natal Anchors">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <DataTile label="Natal Moon Rashi" value={analysis.natalMoonRashiName} glyph={RASHI_GLYPHS[analysis.natalMoonRashiName]} mono={`#${analysis.natalMoonRashi}`} />
          <DataTile label="Natal Lagna Rashi" value={analysis.natalLagnaRashiName} glyph={RASHI_GLYPHS[analysis.natalLagnaRashiName]} mono={`#${analysis.natalLagnaRashi}`} />
          <DataTile label="Transit Date" value={new Date(analysis.transitDate).toLocaleDateString('en-GB')} mono={new Date(analysis.transitDate).toISOString().slice(11, 19) + ' UTC'} />
          <DataTile label="Ayanamsa" value="Lahiri" mono="Chitrapaksha" />
        </div>
      </Section>

      {/* 3. OVERALL VERDICT */}
      <OrnamentalDivider />
      <Section eyebrow="Verdict" title="The Overall Picture">
        <div className="rounded-2xl border border-primary/30 bg-primary/[0.04] p-6 md:p-8 space-y-4">
          <div className="flex items-baseline justify-center gap-4 flex-wrap">
            <p className="text-5xl md:text-6xl font-bold text-primary" style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>
              {analysis.overallFavorablePercentage}%
            </p>
            <div className="text-left">
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Favorable</p>
              <p className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>
                {analysis.overallVerdict}
              </p>
            </div>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden max-w-lg mx-auto">
            <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${Math.min(100, Math.max(0, analysis.overallFavorablePercentage))}%` }} />
          </div>
          <p className="text-center text-xs text-muted-foreground max-w-xl mx-auto leading-relaxed pt-2">
            This percentage is the weighted average of all nine transiting planets, accounting for
            their house position from your natal Moon and any Vedha (obstruction) that weakens a
            favorable result.
          </p>
        </div>
      </Section>

      {/* 4. SADE SATI + DHAIYA */}
      <OrnamentalDivider />
      <Section
        eyebrow="Shani"
        title="Sade Sati & Dhaiya"
        hint="The two long-arc Saturn periods. Sade Sati is 7.5 years when Saturn crosses the 12th, 1st, and 2nd signs from your natal Moon. Dhaiya is a 2.5-year period when Saturn sits in the 4th (Kantaka) or 8th (Ashtama) sign from your Moon."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`rounded-2xl border ${st.sadeSati.status ? 'border-amber-500/40 bg-amber-500/[0.05]' : 'border-emerald-500/30 bg-emerald-500/[0.03]'} p-6 space-y-3`}>
            <div className="flex items-baseline justify-between">
              <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-muted-foreground">Sade Sati</p>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${st.sadeSati.status ? 'text-amber-700 dark:text-amber-400' : 'text-emerald-700 dark:text-emerald-400'}`}>
                {st.sadeSati.status ? 'Active' : 'Inactive'}
              </span>
            </div>
            {st.sadeSati.status && (
              <>
                <p className="text-lg font-bold" style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>{st.sadeSati.phaseName ?? '—'}</p>
                <p className="text-[11px] font-mono text-muted-foreground">Phase {st.sadeSati.phase} of 3</p>
              </>
            )}
            <p className="text-sm text-foreground/85 leading-relaxed">{st.sadeSati.description}</p>
            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-border/40 text-xs">
              <Row label="Saturn Rashi" value={`#${st.sadeSati.saturnRashi}`} />
              <Row label="Moon Rashi" value={`#${st.sadeSati.moonRashi}`} />
            </div>
            <div className="pt-3 border-t border-border/40 space-y-1.5">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Direct check (natal longitudes)</p>
              <Row label="Status" value={String(sadeSatiDirect.status)} mono />
              <Row label="Phase" value={sadeSatiDirect.phase ? `${sadeSatiDirect.phase} (${sadeSatiDirect.phaseName})` : '—'} mono />
            </div>
          </div>

          <div className={`rounded-2xl border ${st.dhaiya.status ? 'border-amber-500/40 bg-amber-500/[0.05]' : 'border-emerald-500/30 bg-emerald-500/[0.03]'} p-6 space-y-3`}>
            <div className="flex items-baseline justify-between">
              <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-muted-foreground">Dhaiya</p>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${st.dhaiya.status ? 'text-amber-700 dark:text-amber-400' : 'text-emerald-700 dark:text-emerald-400'}`}>
                {st.dhaiya.status ? 'Active' : 'Inactive'}
              </span>
            </div>
            {st.dhaiya.status && (
              <>
                <p className="text-lg font-bold" style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>{st.dhaiya.typeName ?? '—'}</p>
                <p className="text-[11px] font-mono text-muted-foreground">Type: {st.dhaiya.type}</p>
              </>
            )}
            <p className="text-sm text-foreground/85 leading-relaxed">{st.dhaiya.description}</p>
            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-border/40 text-xs">
              <Row label="Saturn Rashi" value={`#${st.dhaiya.saturnRashi}`} />
              <Row label="Moon Rashi" value={`#${st.dhaiya.moonRashi}`} />
            </div>
            <div className="pt-3 border-t border-border/40 space-y-1.5">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Direct check (natal longitudes)</p>
              <Row label="Status" value={String(dhaiyaDirect.status)} mono />
              <Row label="Type" value={dhaiyaDirect.type ? `${dhaiyaDirect.type} — ${dhaiyaDirect.typeName}` : '—'} mono />
            </div>
          </div>
        </div>
      </Section>

      {/* 5. GURU GOCHAR + RAHU-KETU */}
      <OrnamentalDivider />
      <Section
        eyebrow="Benefic & Karmic"
        title="Guru Gochar & Nodal Axis"
        hint="Jupiter's transit is the year's great benefic — where it sits, grace and opportunity expand. The Rahu–Ketu axis marks the karmic lesson of the current cycle."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.04] p-6 space-y-3">
            <div className="flex items-baseline justify-between">
              <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400 font-semibold">Guru Gochar</p>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">{st.guruGochar.status}</span>
            </div>
            <p className="text-sm leading-relaxed text-foreground/85">{st.guruGochar.blessingSummary}</p>
            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-emerald-500/20 text-xs">
              <Row label="House from Moon" value={String(st.guruGochar.houseFromMoon)} mono />
              <Row label="Aspects Houses" value={st.guruGochar.aspectHousesFromMoon.join(', ') || '—'} mono />
            </div>
          </div>

          <div className="rounded-2xl border border-purple-500/30 bg-purple-500/[0.04] p-6 space-y-3">
            <p className="text-[10px] uppercase tracking-[0.2em] text-purple-700 dark:text-purple-400 font-semibold">Rahu–Ketu Axis</p>
            <div className="flex items-baseline gap-6">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Rahu</p>
                <p className="text-2xl font-bold" style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>☊ H{st.rahuKetuAxis.rahuHouseFromMoon}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Ketu</p>
                <p className="text-2xl font-bold" style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>☋ H{st.rahuKetuAxis.ketuHouseFromMoon}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-foreground/85 pt-3 border-t border-purple-500/20">{st.rahuKetuAxis.karmicImpact}</p>
          </div>
        </div>
      </Section>

      {/* 6. CHANDRASHTAMA */}
      <OrnamentalDivider />
      <Section
        eyebrow="Chandra"
        title="Chandrashtama"
        hint="Chandrashtama occurs when the transiting Moon passes through the 8th sign from your natal Moon. Traditionally it is a window of low mental energy — avoid major decisions, contracts, and confrontations."
      >
        <div className={`rounded-2xl border p-6 space-y-3 ${chandrashtama.isActive ? 'border-red-500/40 bg-red-500/[0.05]' : 'border-border/60 bg-card'}`}>
          <div className="flex items-baseline justify-between">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">Status</p>
            <span className={`text-[10px] font-bold uppercase tracking-wider ${chandrashtama.isActive ? 'text-red-700 dark:text-red-400' : 'text-muted-foreground'}`}>
              {chandrashtama.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
            <Row label="Birth Rashi" value={`${chandrashtama.birthRashiName} (#${chandrashtama.birthRashi})`} />
            <Row label="Chandrashtama Rashi (8th)" value={`${chandrashtama.chandrashtamaRashiName} (#${chandrashtama.chandrashtamaRashi})`} />
            <Row label="Current Moon Rashi" value={`${chandrashtama.currentMoonRashiName} (#${chandrashtama.currentMoonRashi})`} />
            <Row label="Is the 8th sign active?" value={chandrashtama.isActive ? 'Yes' : 'No'} />
          </div>
        </div>
      </Section>

      {/* 7. TODAY'S INDICATORS */}
      <OrnamentalDivider />
      <Section
        eyebrow="Today"
        title="Tarabalam & Disha Shoola"
        hint="Tarabalam measures the auspiciousness of the current nakshatra relative to your birth nakshatra — the classical Vedic good-day/bad-day check. Disha Shoola marks the direction to avoid traveling on today's weekday."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`rounded-2xl border p-6 space-y-3 ${tarabalam.isAuspicious ? 'border-emerald-500/30 bg-emerald-500/[0.04]' : 'border-red-500/30 bg-red-500/[0.04]'}`}>
            <div className="flex items-baseline justify-between">
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">Tarabalam</p>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${tarabalam.isAuspicious ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400'}`}>
                {tarabalam.isAuspicious ? 'Auspicious' : 'Inauspicious'}
              </span>
            </div>
            <p className="text-2xl font-bold" style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>{tarabalam.taraName}</p>
            <p className="text-xs text-muted-foreground">{tarabalam.description}</p>
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border/40 text-xs">
              <Row label="Birth Nakshatra" value={tarabalam.birthNakshatraName} mono />
              <Row label="Current Nakshatra" value={tarabalam.currentNakshatraName} mono />
              <Row label="Tara #" value={String(tarabalam.taraNumber)} mono />
            </div>
          </div>

          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/[0.04] p-6 space-y-3">
            <p className="text-[10px] uppercase tracking-[0.2em] text-amber-700 dark:text-amber-400 font-semibold">Disha Shoola</p>
            <p className="text-2xl font-bold text-amber-700 dark:text-amber-400" style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>
              {dishaShoola.varaName} → Avoid {dishaShoola.inauspiciousDirection}
            </p>
            <p className="text-xs text-muted-foreground">{dishaShoola.description}</p>
            <div className="pt-3 border-t border-amber-500/20 space-y-1.5 text-xs">
              <Row label="Safe Directions" value={dishaShoola.safeDirections.join(', ')} mono />
              <Row label="Remedy" value={dishaShoola.remedy} />
            </div>
          </div>
        </div>
      </Section>

      {/* 8. LEGEND + NINE GRAHAS FULL GRID */}
      <OrnamentalDivider />
      <Section
        eyebrow="Navagraha"
        title="Planetary Transits — Full Detail"
        hint="Each card shows where the planet currently sits, its position from your natal Moon, and how that transit lands. Tap 'About this transit' for a quick primer on how to read that planet's movements."
      >
        {/* Legend */}
        <div className="rounded-2xl border bg-muted/20 p-4 mb-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-3">
            How to read each card
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {LEGEND_ITEMS.map((item) => (
              <div key={item.label} className="flex items-start gap-2.5">
                <span className={`mt-0.5 w-3 h-3 rounded-full shrink-0 ${
                  item.tone === 'emerald' ? 'bg-emerald-500'
                  : item.tone === 'red' ? 'bg-red-500'
                  : 'bg-amber-500'
                }`} />
                <div>
                  <p className="text-xs font-semibold text-foreground leading-tight">{item.label}</p>
                  <p className="text-[11px] text-muted-foreground leading-snug mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed mt-3 pt-3 border-t">
            <strong className="text-foreground/80">House from Moon</strong> — the sign distance between the transiting
            planet and your natal Moon. Classical Vedic astrology judges transits primarily from the Moon, not the Ascendant.
            {' '}
            <strong className="text-foreground/80">SAV bindus</strong> — the Ashtakavarga score for the house the planet
            occupies; higher bindus mean the house is stronger for that planet.
          </p>
        </div>

        <div className="space-y-4">
          {PLANET_ORDER.map((name) => {
            const p = planets[name];
            if (!p) return null;
            return <PlanetDetailCard key={name} planet={p} info={PLANET_INFO[name]} />;
          })}
        </div>
      </Section>

      {/* 9. SINGLE-PLANET DRILL-DOWN */}
      {(saturn || jupiter) && (
        <>
          <OrnamentalDivider />
          <Section
            eyebrow="Drill-Down"
            title="getPlanetGochar() Lookup"
            hint="A per-planet API call. Useful when you want to inspect one graha's transit without computing the full analysis."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {saturn && (
                <div className="rounded-2xl border border-slate-500/30 bg-slate-500/[0.03] p-5 space-y-3">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">Saturn</p>
                  <p className="text-sm"><strong>Status:</strong> {saturn.netStatus}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{saturn.prediction}</p>
                </div>
              )}
              {jupiter && (
                <div className="rounded-2xl border border-amber-500/30 bg-amber-500/[0.03] p-5 space-y-3">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">Jupiter</p>
                  <p className="text-sm"><strong>Status:</strong> {jupiter.netStatus}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{jupiter.prediction}</p>
                </div>
              )}
            </div>
          </Section>
        </>
      )}

      {/* 10. LIFE AREAS */}
      <OrnamentalDivider />
      <Section
        eyebrow="Impact"
        title="Life Areas"
        hint="A rolled-up verdict across the four domains classical Jyotish watches most closely. Ratings are aggregates of the individual planetary transits that rule each area."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {(['career', 'wealth', 'relationships', 'health'] as const).map((key) => {
            const area = lifeAreas[key];
            const label = { career: 'Career', wealth: 'Wealth', relationships: 'Relationships', health: 'Health' }[key];
            return (
              <div key={key} className="rounded-2xl border bg-card p-5 space-y-2">
                <div className="flex items-baseline justify-between">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">{label}</p>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">{area.rating}</span>
                </div>
                <p className="text-sm text-foreground/85 leading-relaxed">{area.summary}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* 11. ACTIONABLE ADVICE */}
      {actionableAdvice.length > 0 && (
        <>
          <OrnamentalDivider />
          <Section
            eyebrow="Guidance"
            title="Actionable Advice"
            hint="Concrete suggestions drawn from the strongest signals in the current transit."
          >
            <ul className="space-y-2">
              {actionableAdvice.map((a, i) => (
                <li key={i} className="flex items-start gap-2 text-sm leading-relaxed">
                  <span className="text-primary mt-0.5 shrink-0">◆</span>
                  <span className="text-foreground/90">{a}</span>
                </li>
              ))}
            </ul>
          </Section>
        </>
      )}

    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Local components
// ─────────────────────────────────────────────────────────────

function DataTile({ label, value, glyph, mono }: { label: string; value: string; glyph?: string; mono?: string }) {
  return (
    <div className="rounded-xl border bg-card p-4 space-y-1">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{label}</p>
      <div className="flex items-baseline gap-2">
        {glyph && <span className="text-xl leading-none" style={{ fontFamily: "'Noto Serif Devanagari', serif" }}>{glyph}</span>}
        <span className="text-base font-bold" style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>{value}</span>
      </div>
      {mono && <p className="text-[10px] font-mono text-muted-foreground">{mono}</p>}
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-2">
      <span className="text-muted-foreground">{label}</span>
      <span className={`text-right ${mono ? 'font-mono text-xs' : ''} font-medium`}>{value}</span>
    </div>
  );
}

function PlanetDetailCard({ planet, info }: { planet: GocharPlanet; info?: PlanetInfo }) {
  const [showInfo, setShowInfo] = useState(false);

  const isFav = planet.netStatus === 'Favorable';
  const isUnfav = planet.netStatus === 'Unfavorable';

  const border = isFav ? 'border-emerald-500/40' : isUnfav ? 'border-red-500/40' : 'border-amber-500/40';
  const badge = isFav
    ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
    : isUnfav
      ? 'bg-red-500/10 text-red-700 dark:text-red-400'
      : 'bg-amber-500/10 text-amber-700 dark:text-amber-400';

  return (
    <article className={`rounded-2xl border-2 ${border} bg-card overflow-hidden`}>
      {/* Header strip */}
      <div className="px-6 py-4 border-b bg-gradient-to-r from-primary/[0.04] to-transparent flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <span className="text-3xl leading-none" style={{ fontFamily: "'Noto Serif Devanagari', serif" }}>
            {PLANET_GLYPHS[planet.planet] ?? '·'}
          </span>
          <div>
            <p className="text-lg font-bold leading-tight" style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>
              {planet.planet}
              {info && (
                <span className="ml-2 text-[10px] uppercase tracking-wider text-muted-foreground font-normal font-sans">
                  {info.nature}
                </span>
              )}
            </p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
              House {planet.houseFromMoon} from Moon · House {planet.houseFromLagna} from Lagna
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {planet.isRetrograde && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">Retrograde</span>
          )}
          <span className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded font-bold ${badge}`}>
            {planet.netStatus}
          </span>
        </div>
      </div>

      {/* About toggle */}
      {info && (
        <div className="border-b bg-muted/20">
          <button
            type="button"
            onClick={() => setShowInfo((v) => !v)}
            className="w-full px-6 py-2.5 flex items-center justify-between gap-3 text-left hover:bg-muted/40 transition-colors"
          >
            <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-primary/80">
              About this transit
            </span>
            <span className="text-muted-foreground text-xs">{showInfo ? '▴' : '▾'}</span>
          </button>
          {showInfo && (
            <div className="px-6 py-4 space-y-3 text-[12px] leading-relaxed border-t bg-background/60">
              <InfoRow label="What it governs" text={info.whatItGoverns} />
              <InfoRow label="How the transit works" text={info.transitEffect} />
              <InfoRow label="Favorable houses" text={info.favorableHouses} />
              <InfoRow label="Avoid when" text={info.avoidWhen} />
            </div>
          )}
        </div>
      )}

      {/* Body */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">Position</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl leading-none" style={{ fontFamily: "'Noto Serif Devanagari', serif" }}>
                {RASHI_GLYPHS[planet.rashiName] ?? '·'}
              </span>
              <span className="text-xl font-bold" style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>{planet.rashiName}</span>
              <span className="text-xs font-mono text-muted-foreground">#{planet.rashi}</span>
            </div>
            <p className="text-xs font-mono text-muted-foreground mt-1">
              {planet.degree}° {String(planet.minute).padStart(2, '0')}′ · Longitude {planet.longitude.toFixed(4)}°
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <Row label="Nakshatra" value={planet.nakshatra} />
            <Row label="Pada" value={String(planet.pada)} mono />
            <Row label="Nakshatra Lord" value={planet.nakshatraLord} />
            <Row label="Retrograde" value={planet.isRetrograde ? 'Yes' : 'No'} />
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <Row label="House from Moon" value={String(planet.houseFromMoon)} mono />
            <Row label="House from Lagna" value={String(planet.houseFromLagna)} mono />
            <Row label="Favorable from Moon" value={planet.isFavorableFromMoon ? 'Yes' : 'No'} />
            <Row label="SAV Bindus" value={String(planet.savBindusInHouse)} mono />
          </div>

          <div className="pt-3 border-t border-border/40 space-y-1.5">
            <Row label="Has Vedha" value={planet.hasVedha ? 'Yes' : 'No'} />
            {planet.hasVedha && planet.vedhaCausedBy && (
              <p className="text-[11px] text-amber-800 dark:text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded px-2 py-1.5 leading-snug">
                {planet.vedhaCausedBy}
              </p>
            )}
          </div>

          {planet.prediction && (
            <div className="pt-3 border-t border-border/40">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Prediction</p>
              <p className="text-xs text-foreground/85 leading-relaxed">{planet.prediction}</p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function InfoRow({ label, text }: { label: string; text: string }) {
  return (
    <div className="grid grid-cols-[100px_1fr] gap-3 items-baseline">
      <span className="text-[10px] uppercase tracking-wider text-primary/70 font-semibold">{label}</span>
      <span className="text-foreground/80">{text}</span>
    </div>
  );
}