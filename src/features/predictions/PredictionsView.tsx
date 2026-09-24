import { useMemo } from 'react';
import { useActiveProfile } from '@/features/birth-profile/store';
import { BirthDataError } from '@/infrastructure/astrology/prisri-jyotish.adapter';
import { getCachedKundli } from '@/lib/kundli-cache';
import {
  predictionsAdapter,
  PredictionsError,
  type CareerPrediction,
  type WealthPrediction,
  type MarriagePrediction,
  type JaiminiKarakas,
  type ChalitAnalysis,
  type KpAnalysis,
  type LalKitabAnalysis,
  type Remedies,
} from '@/infrastructure/astrology/predictions.adapter';
import { AccordionSection } from '@/components/accordion-section';
import {
  KeyValueRow,
  ChipList,
  BulletList,
  SubHeading,
  InsightBlock,
  StatTile,
  ScoreBar,
  RatingBadge,
} from './components';
import { PLANET_GLYPHS } from '@/features/report/lib/glyphs';

export function PredictionsView() {
  const profile = useActiveProfile();

  const result = useMemo(() => {
    if (!profile) return { data: null, error: null as string | null };
    try {
      const kundli = getCachedKundli(profile) as unknown as Record<string, any>;
      if (!kundli) throw new BirthDataError('Chart calculation failed.');
      return {
        data: {
          career: predictionsAdapter.career(kundli),
          wealth: predictionsAdapter.wealth(kundli),
          marriage: predictionsAdapter.marriage(kundli),
          jaimini: predictionsAdapter.jaimini(kundli),
          chalit: predictionsAdapter.chalit(kundli),
          kp: predictionsAdapter.kp(kundli),
          lalKitab: predictionsAdapter.lalKitab(kundli),
          remedies: predictionsAdapter.remedies(kundli),
        },
        error: null,
      };
    } catch (e) {
      const msg =
        e instanceof BirthDataError || e instanceof PredictionsError
          ? (e as Error).message
          : 'Predictions calculation failed.';
      return { data: null, error: msg };
    }
  }, [profile]);

  if (!profile) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-20 text-center space-y-3">
        <p className="text-[10px] uppercase tracking-[0.4em] text-primary font-semibold">
          Multi-System Analysis
        </p>
        <h1 className="font-bold" style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}>
          Life Predictions
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your birth details on the Chart tab first.
        </p>
      </div>
    );
  }

  if (result.error || !result.data) {
    return (
      <div className="container max-w-3xl mx-auto px-4 py-12">
        <div className="text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-lg px-3 py-2">
          {result.error ?? 'Predictions calculation failed.'}
        </div>
      </div>
    );
  }

  const { career, wealth, marriage, jaimini, chalit, kp, lalKitab, remedies } = result.data;

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 md:py-12 space-y-4">

      {/* ═══ HEADER ═══ */}
      <div className="text-center space-y-2 py-6">
        <p className="text-[10px] uppercase tracking-[0.4em] text-primary font-semibold">
          Multi-System Analysis
        </p>
        <h1 className="font-bold tracking-tight" style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontSize: 'clamp(2rem, 4.5vw, 3rem)', lineHeight: 1.1 }}>
          Life Predictions
        </h1>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          {profile.profileName}
          <span className="mx-2 opacity-40">·</span>
          Parashari · Jaimini · Chalit · KP · Lal Kitab
        </p>
      </div>

      {/* ═══ 1. CAREER ═══ */}
      <AccordionSection
        eyebrow="Section I"
        title="Career & Profession"
        badge="Career"
        accent="blue"
        subtitle={career.recommendation}
        defaultOpen
      >
        <CareerBlock data={career} />
      </AccordionSection>

      {/* ═══ 2. WEALTH ═══ */}
      <AccordionSection
        eyebrow="Section II"
        title="Wealth & Finance"
        badge="Wealth"
        accent="emerald"
        subtitle={`${wealth.wealthRating} — Income potential ${wealth.incomePotential}/100`}
      >
        <WealthBlock data={wealth} />
      </AccordionSection>

      {/* ═══ 3. MARRIAGE ═══ */}
      <AccordionSection
        eyebrow="Section III"
        title="Marriage & Partnership"
        badge="Marriage"
        accent="red"
        subtitle={`${marriage.maritalHarmonyRating} — Favorable age ${marriage.favorableAgeRange}`}
      >
        <MarriageBlock data={marriage} />
      </AccordionSection>

      {/* ═══ 4. JAIMINI KARAKAS ═══ */}
      <AccordionSection
        eyebrow="Section IV"
        title="Jaimini Chara Karakas"
        badge="Jaimini"
        accent="purple"
        subtitle="The seven soul-significators: Atmakaraka (self), Amatyakaraka (career), Darakaraka (spouse), and more."
      >
        <JaiminiBlock data={jaimini} />
      </AccordionSection>

      {/* ═══ 5. CHALIT ═══ */}
      <AccordionSection
        eyebrow="Section V"
        title="Bhava Chalit Analysis"
        badge="Chalit"
        accent="amber"
        subtitle={
          chalit.shiftedPlanets.length > 0
            ? `${chalit.shiftedPlanets.length} planet(s) shifted between Rashi and Chalit.`
            : 'No planets shifted between Rashi and Chalit.'
        }
      >
        <ChalitBlock data={chalit} />
      </AccordionSection>

      {/* ═══ 6. KP ═══ */}
      <AccordionSection
        eyebrow="Section VI"
        title="KP System — Cusp Sub-Lords"
        badge="KP"
        accent="primary"
        subtitle="Krishnamurti Paddhati: cuspal sub-lord analysis for pinpoint event timing."
      >
        <KpBlock data={kp} />
      </AccordionSection>

      {/* ═══ 7. LAL KITAB ═══ */}
      <AccordionSection
        eyebrow="Section VII"
        title="Lal Kitab — Teva & Totke"
        badge="Lal Kitab"
        accent="amber"
        subtitle={`${lalKitab.tevaType} — Kismat Ka Grah: ${lalKitab.kismatKaGrah.planet} in House ${lalKitab.kismatKaGrah.house}`}
      >
        <LalKitabBlock data={lalKitab} />
      </AccordionSection>

      {/* ═══ 8. REMEDIES ═══ */}
      <AccordionSection
        eyebrow="Section VIII"
        title="Remedies & Guidance"
        badge="Upay"
        accent="emerald"
        subtitle={`${remedies.remedyList.length} practical remedies, ${remedies.mantras.length} mantras, ${remedies.lifestyleHabits.length} lifestyle habits.`}
      >
        <RemediesBlock data={remedies} />
      </AccordionSection>

    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Section blocks
// ─────────────────────────────────────────────────────────────

function CareerBlock({ data }: { data: CareerPrediction }) {
  return (
    <>
      {/* Overview */}
      <div className="rounded-2xl border border-primary/30 bg-primary/[0.04] p-5 space-y-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-semibold">Recommendation</p>
          <p className="text-2xl font-bold mt-1" style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>
            {data.recommendation}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <ScoreBar label="Job Suitability" value={data.jobScore} />
          <ScoreBar label="Business Suitability" value={data.businessScore} />
        </div>
        <div className="pt-3 border-t border-primary/20">
          <KeyValueRow label="Leadership Capacity" value={data.leadershipCapacity} />
        </div>
      </div>

      {/* 10th House */}
      <div>
        <SubHeading>10th House — Career Foundation</SubHeading>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <StatTile label="10th House Rashi" value={data.tenthHouseDetails.rashi} />
          <StatTile label="Rashi Lord" value={data.tenthHouseDetails.rashiLord} />
          <StatTile label="Lord's House" value={data.tenthHouseDetails.lordPlacementHouse} />
          <StatTile label="SAV Bindus" value={data.tenthHouseDetails.savBindus} accent />
          <StatTile
            label="Planets in 10th"
            value={data.tenthHouseDetails.planetsIn10th.join(', ') || '—'}
          />
        </div>
      </div>

      {/* Traits & Fields */}
      {data.dominantTraits.length > 0 && (
        <div>
          <SubHeading>Dominant Traits</SubHeading>
          <ChipList items={data.dominantTraits} tone="primary" />
        </div>
      )}

      {data.suitableFields.length > 0 && (
        <div>
          <SubHeading>Suitable Fields</SubHeading>
          <ChipList items={data.suitableFields} tone="positive" />
        </div>
      )}

      {/* Lord placement narrative */}
      {data.tenthLordPlacementResult && (
        <InsightBlock label="10th Lord Placement" text={data.tenthLordPlacementResult} />
      )}

      {/* Cross-system insights */}
      <div>
        <SubHeading>Cross-System Insights</SubHeading>
        <div className="space-y-3">
          {data.amatyakarakaInsight && (
            <InsightBlock label="Jaimini · Amatyakaraka" text={data.amatyakarakaInsight} tone="purple" />
          )}
          {data.chalitInsight && (
            <InsightBlock label="Chalit" text={data.chalitInsight} tone="amber" />
          )}
          {data.kpInsight && (
            <InsightBlock label="KP Astrology" text={data.kpInsight} />
          )}
          {data.lalKitabInsight && (
            <InsightBlock label="Lal Kitab" text={data.lalKitabInsight} tone="emerald" />
          )}
        </div>
      </div>

      {/* Yoga */}
      {data.panchaMahapurushaYoga && (
        <InsightBlock
          label="Pancha Mahapurusha Yoga"
          text={data.panchaMahapurushaYoga}
          tone="emerald"
        />
      )}

      {/* Strategic Advice */}
      {data.strategicAdvice.length > 0 && (
        <div>
          <SubHeading>Strategic Advice</SubHeading>
          <BulletList items={data.strategicAdvice} />
        </div>
      )}
    </>
  );
}

function WealthBlock({ data }: { data: WealthPrediction }) {
  return (
    <>
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.04] p-5 space-y-4">
        <div className="flex items-baseline justify-between gap-4 flex-wrap">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400 font-semibold">Wealth Rating</p>
            <p className="text-2xl font-bold mt-1" style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>
              {data.wealthRating}
            </p>
          </div>
          <RatingBadge rating={`Savings · ${data.savingCapacity}`} />
        </div>
        <ScoreBar label="Income Potential" value={data.incomePotential} />
      </div>

      {/* SAV Metrics */}
      <div>
        <SubHeading>Ashtakavarga Metrics</SubHeading>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatTile label="11th House (Gains)" value={data.savMetrics.incomeHouse11Bindus} accent />
          <StatTile label="12th House (Loss)" value={data.savMetrics.expenditureHouse12Bindus} />
          <StatTile label="2nd House (Wealth)" value={data.savMetrics.wealthHouse2Bindus} />
          <StatTile label="Surplus Ratio" value={data.savMetrics.surplusRatio} />
        </div>
      </div>

      {/* Dhana Yogas */}
      {data.dhanaYogas.length > 0 && (
        <div>
          <SubHeading>Dhana Yogas ({data.dhanaYogas.length})</SubHeading>
          <div className="space-y-3">
            {data.dhanaYogas.map((y, i) => (
              <div key={i} className="rounded-xl border bg-card p-4 space-y-2">
                <div className="flex items-baseline justify-between gap-3 flex-wrap">
                  <p className="text-sm font-bold">{y.name}</p>
                  <RatingBadge rating={y.strength} size="sm" />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{y.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Vipreet Raja Yogas */}
      {data.vipreetRajYogas.length > 0 && (
        <div>
          <SubHeading>Vipreet Raja Yogas</SubHeading>
          <BulletList items={data.vipreetRajYogas} />
        </div>
      )}

      {/* Lord placements */}
      {data.secondLordPlacementResult && (
        <InsightBlock label="2nd Lord Placement" text={data.secondLordPlacementResult} tone="emerald" />
      )}
      {data.eleventhLordPlacementResult && (
        <InsightBlock label="11th Lord Placement" text={data.eleventhLordPlacementResult} tone="emerald" />
      )}

      {/* Sources & Cautions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.bestWealthSources.length > 0 && (
          <div>
            <SubHeading>Best Wealth Sources</SubHeading>
            <BulletList items={data.bestWealthSources} tone="positive" icon="✓" />
          </div>
        )}
        {data.financialCautions.length > 0 && (
          <div>
            <SubHeading>Financial Cautions</SubHeading>
            <BulletList items={data.financialCautions} tone="warning" icon="⚠" />
          </div>
        )}
      </div>

      {/* Cross-system insights */}
      <div>
        <SubHeading>Cross-System Insights</SubHeading>
        <div className="space-y-3">
          {data.chalitInsight && <InsightBlock label="Chalit" text={data.chalitInsight} tone="amber" />}
          {data.kpInsight && <InsightBlock label="KP Astrology" text={data.kpInsight} />}
          {data.lalKitabInsight && <InsightBlock label="Lal Kitab" text={data.lalKitabInsight} tone="emerald" />}
        </div>
      </div>
    </>
  );
}

function MarriageBlock({ data }: { data: MarriagePrediction }) {
  return (
    <>
      {/* Overview */}
      <div className="rounded-2xl border border-red-500/30 bg-red-500/[0.04] p-5 space-y-4">
        <div className="flex items-baseline justify-between gap-4 flex-wrap">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-red-700 dark:text-red-400 font-semibold">Marital Harmony</p>
            <p className="text-2xl font-bold mt-1" style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>
              {data.maritalHarmonyRating}
            </p>
          </div>
          <RatingBadge rating={data.favorableAgeRange} />
        </div>
        <div className="flex flex-wrap gap-2 pt-3 border-t border-red-500/20">
          {data.predictedTimingYears.map((y) => (
            <span key={y} className="text-xs px-2.5 py-1 rounded-md bg-red-500/10 text-red-700 dark:text-red-400 font-mono font-semibold">
              {y}
            </span>
          ))}
        </div>
        {data.dashaSupportExplanation && (
          <p className="text-xs text-muted-foreground leading-relaxed pt-2 border-t border-red-500/20">
            {data.dashaSupportExplanation}
          </p>
        )}
      </div>

      {/* Marriage Type */}
      <div>
        <SubHeading>Marriage Type</SubHeading>
        <div className="rounded-xl border bg-card p-5 space-y-4">
          <p className="text-lg font-bold" style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>
            {data.marriageType.recommendation}
          </p>
          <div className="grid grid-cols-2 gap-4">
            <ScoreBar label="Love Marriage Score" value={data.marriageType.loveScore} />
            <ScoreBar label="Arranged Score" value={data.marriageType.arrangedScore} />
          </div>
          <div className="pt-3 border-t border-border/40 space-y-2">
            <KeyValueRow label="Intercaste Likely" value={data.marriageType.isIntercasteLikely ? 'Yes' : 'No'} />
            <KeyValueRow label="Intercaste Probability" value={`${data.marriageType.intercasteProbability}%`} mono />
          </div>
          {data.marriageType.keyIndicators.length > 0 && (
            <div className="pt-3 border-t border-border/40">
              <SubHeading>Key Indicators</SubHeading>
              <ChipList items={data.marriageType.keyIndicators} />
            </div>
          )}
        </div>
      </div>

      {/* Mangal Dosha */}
      <div>
        <SubHeading>Mangal Dosha</SubHeading>
        <div className={`rounded-xl border p-4 ${data.mangalDosha.hasDosha && !data.mangalDosha.isCancelled ? 'border-red-500/40 bg-red-500/[0.05]' : 'border-emerald-500/30 bg-emerald-500/[0.03]'}`}>
          <div className="flex items-baseline justify-between gap-3 mb-2">
            <p className="text-sm font-semibold">
              {data.mangalDosha.hasDosha ? 'Present' : 'Not Present'}
              {data.mangalDosha.hasDosha && data.mangalDosha.isCancelled && ' · Cancelled'}
            </p>
            <RatingBadge
              rating={
                !data.mangalDosha.hasDosha ? 'Clear' : data.mangalDosha.isCancelled ? 'Cancelled' : 'Active'
              }
              size="sm"
            />
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">{data.mangalDosha.description}</p>
        </div>
      </div>

      {/* Partner Characteristics */}
      <div>
        <SubHeading>Partner Characteristics</SubHeading>
        <div className="rounded-xl border bg-card p-5 space-y-4">
          <p className="text-sm text-foreground/85 leading-relaxed">{data.partnerCharacteristics.nature}</p>
          {data.partnerCharacteristics.dominantTraits.length > 0 && (
            <div>
              <SubHeading>Dominant Traits</SubHeading>
              <ChipList items={data.partnerCharacteristics.dominantTraits} tone="primary" />
            </div>
          )}
          <div className="pt-3 border-t border-border/40">
            <KeyValueRow label="Direction / Background" value={data.partnerCharacteristics.directionOrBackground} />
          </div>
        </div>
      </div>

      {/* Spouse Age Difference */}
      <div>
        <SubHeading>Spouse Age Difference</SubHeading>
        <div className="rounded-xl border bg-card p-5 space-y-4">
          <div className="flex items-baseline justify-between gap-4 flex-wrap">
            <p className="text-xl font-bold" style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>
              {data.spouseAgeDifference.relativeAge}
            </p>
            <RatingBadge rating={`${data.spouseAgeDifference.minGapYears}–${data.spouseAgeDifference.maxGapYears} yrs`} />
          </div>
          <p className="text-sm text-foreground/85 leading-relaxed">{data.spouseAgeDifference.estimatedDifferenceYears}</p>
          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border/40">
            <KeyValueRow label="Partner Older" value={data.spouseAgeDifference.partnerIsOlder ? 'Yes' : 'No'} />
            <KeyValueRow label="Maturity Level" value={data.spouseAgeDifference.maturityLevel} />
            <KeyValueRow label="Unconventional Gap" value={data.spouseAgeDifference.unconventionalGapLikely ? 'Yes' : 'No'} />
          </div>
          {data.spouseAgeDifference.reason && (
            <p className="text-xs text-muted-foreground leading-relaxed pt-3 border-t border-border/40 italic">
              {data.spouseAgeDifference.reason}
            </p>
          )}
          <div className="pt-3 border-t border-border/40 space-y-2">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Gender Perspective</p>
            <p className="text-xs text-foreground/80 leading-relaxed">
              <strong>Male Native:</strong> {data.spouseAgeDifference.genderPerspective.ifMaleNative}
            </p>
            <p className="text-xs text-foreground/80 leading-relaxed">
              <strong>Female Native:</strong> {data.spouseAgeDifference.genderPerspective.ifFemaleNative}
            </p>
          </div>
        </div>
      </div>

      {/* Lord placement + DK */}
      {data.seventhLordPlacementResult && (
        <InsightBlock label="7th Lord Placement" text={data.seventhLordPlacementResult} />
      )}
      {data.darakarakaInsight && (
        <InsightBlock label="Jaimini · Darakaraka" text={data.darakarakaInsight} tone="purple" />
      )}

      {/* Cross-system insights */}
      <div>
        <SubHeading>Cross-System Insights</SubHeading>
        <div className="space-y-3">
          {data.chalitInsight && <InsightBlock label="Chalit" text={data.chalitInsight} tone="amber" />}
          {data.kpInsight && <InsightBlock label="KP Astrology" text={data.kpInsight} />}
          {data.lalKitabInsight && <InsightBlock label="Lal Kitab" text={data.lalKitabInsight} tone="emerald" />}
        </div>
      </div>

      {/* Advice */}
      {data.relationshipAdvice.length > 0 && (
        <div>
          <SubHeading>Relationship Advice</SubHeading>
          <BulletList items={data.relationshipAdvice} tone="primary" />
        </div>
      )}
    </>
  );
}

function JaiminiBlock({ data }: { data: JaiminiKarakas }) {
  const order = [
    ['atmakaraka', data.atmakaraka],
    ['amatyakaraka', data.amatyakaraka],
    ['bhratrikaraka', data.bhratrikaraka],
    ['matrikaraka', data.matrikaraka],
    ['putrakaraka', data.putrakaraka],
    ['gnatikaraka', data.gnatikaraka],
    ['darakaraka', data.darakaraka],
  ] as const;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {order.map(([key, k]) => (
        <article key={key} className="rounded-xl border bg-card p-5 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl leading-none" style={{ fontFamily: "'Noto Serif Devanagari', serif" }}>
                {PLANET_GLYPHS[k.planet] ?? '·'}
              </span>
              <div>
                <p className="text-base font-bold leading-tight">{k.planet}</p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {k.rashiName} · House {k.house}
                </p>
              </div>
            </div>
            <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-purple-500/10 text-purple-700 dark:text-purple-400 font-semibold shrink-0">
              {key.slice(0, 4).toUpperCase()}
            </span>
          </div>
          <p className="text-[11px] font-mono text-muted-foreground">{k.formattedDegree}</p>
          <div className="pt-2 border-t border-border/40 space-y-1">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{k.role}</p>
            <p className="text-xs text-foreground/85 leading-relaxed">{k.signification}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function ChalitBlock({ data }: { data: ChalitAnalysis }) {
  return (
    <>
      {/* Shifted planets */}
      <div>
        <SubHeading>Planetary Shifts (D1 → Chalit)</SubHeading>
        {data.shiftedPlanets.length === 0 ? (
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/[0.03] p-4 text-sm text-foreground/85">
            No planets shifted. Every graha sits in the same house in both charts.
          </div>
        ) : (
          <div className="space-y-3">
            {data.shiftedPlanets.map((p) => (
              <div key={p.planet} className="rounded-xl border border-amber-500/30 bg-amber-500/[0.04] p-5 space-y-3">
                <div className="flex items-baseline justify-between gap-3 flex-wrap">
                  <p className="text-base font-bold">{p.planet}</p>
                  <span className="text-[10px] uppercase tracking-wider text-amber-700 dark:text-amber-400 font-semibold">
                    {p.shiftDirection}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm font-mono">
                  <span>D1 H{p.d1House}</span>
                  <span className="text-amber-600 dark:text-amber-400">→</span>
                  <span>Chalit H{p.chalitBhava}</span>
                </div>
                <p className="text-xs text-foreground/85 leading-relaxed pt-2 border-t border-amber-500/20">
                  {p.impact}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actual occupants */}
      <div>
        <SubHeading>Actual House Occupants (Chalit)</SubHeading>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((h) => {
            const occupants = data.actualHouseOccupants[h] ?? [];
            return (
              <div key={h} className="rounded-lg border bg-card p-3 space-y-1">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                  House {h}
                </p>
                {occupants.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {occupants.map((o) => (
                      <span key={o} className="text-xs px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium">
                        {o}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground italic">Empty</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Key insights */}
      {data.keyBhavaInsights.length > 0 && (
        <div>
          <SubHeading>Key Bhava Insights</SubHeading>
          <BulletList items={data.keyBhavaInsights} tone="warning" icon="◆" />
        </div>
      )}
    </>
  );
}

function KpBlock({ data }: { data: KpAnalysis }) {
  return (
    <>
      {/* Career */}
      <div>
        <SubHeading>Career Cusp (10th)</SubHeading>
        <div className="rounded-xl border bg-card p-5 space-y-3">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-sm"><strong>Sub-Lord:</strong> {data.careerCusp10.subLord}</span>
            <span className="text-xs text-muted-foreground">Star: {data.careerCusp10.starLord}</span>
          </div>
          <p className="text-xs text-foreground/85 leading-relaxed pt-2 border-t border-border/40">
            {data.careerCusp10.significationVerdict}
          </p>
        </div>
      </div>

      {/* Marriage */}
      <div>
        <SubHeading>Marriage Cusp (7th)</SubHeading>
        <div className="rounded-xl border bg-card p-5 space-y-3">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-sm"><strong>Sub-Lord:</strong> {data.marriageCusp7.subLord}</span>
            <span className="text-xs text-muted-foreground">Star: {data.marriageCusp7.starLord}</span>
          </div>
          <p className="text-xs text-foreground/85 leading-relaxed pt-2 border-t border-border/40">
            {data.marriageCusp7.marriagePromise}
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed pt-2 border-t border-border/40 italic">
            {data.marriageCusp7.typeIndication}
          </p>
        </div>
      </div>

      {/* Wealth */}
      <div>
        <SubHeading>Wealth Cusps (2nd & 11th)</SubHeading>
        <div className="rounded-xl border bg-card p-5 space-y-3">
          <div className="flex flex-wrap gap-4 text-sm">
            <span><strong>Cusp 2 Sub-Lord:</strong> {data.wealthCusps.cusp2SubLord}</span>
            <span><strong>Cusp 11 Sub-Lord:</strong> {data.wealthCusps.cusp11SubLord}</span>
          </div>
          <p className="text-xs text-foreground/85 leading-relaxed pt-2 border-t border-border/40">
            {data.wealthCusps.financialSignification}
          </p>
        </div>
      </div>

      {/* All 12 cusps */}
      <div>
        <SubHeading>All 12 Cusp Sub-Lords</SubHeading>
        <div className="rounded-xl border bg-card overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b text-muted-foreground">
                <th className="text-left px-4 py-2.5 font-semibold uppercase tracking-wider text-[10px]">Cusp</th>
                <th className="text-left px-4 py-2.5 font-semibold uppercase tracking-wider text-[10px]">Sub-Lord</th>
                <th className="text-left px-4 py-2.5 font-semibold uppercase tracking-wider text-[10px]">Star Lord</th>
              </tr>
            </thead>
            <tbody>
              {data.cuspSubLords.map((c) => (
                <tr key={c.cuspNumber} className="border-b last:border-none hover:bg-muted/20">
                  <td className="px-4 py-2 font-mono font-semibold">Cusp {c.cuspNumber}</td>
                  <td className="px-4 py-2">{c.subLord}</td>
                  <td className="px-4 py-2 text-muted-foreground">{c.starLord}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function LalKitabBlock({ data }: { data: LalKitabAnalysis }) {
  return (
    <>
      {/* Teva + Kismat */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/[0.04] p-5 space-y-2">
          <p className="text-[10px] uppercase tracking-[0.2em] text-amber-700 dark:text-amber-400 font-semibold">Teva Type</p>
          <p className="text-xl font-bold" style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>
            {data.tevaType}
          </p>
        </div>
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.04] p-5 space-y-2">
          <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400 font-semibold">Kismat Ka Grah</p>
          <p className="text-xl font-bold" style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>
            {data.kismatKaGrah.planet} in House {data.kismatKaGrah.house}
          </p>
          <p className="text-xs text-foreground/80 leading-relaxed">{data.kismatKaGrah.role}</p>
        </div>
      </div>

      {/* Sleeping / Awakened */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <SubHeading>Sleeping Houses ({data.sleepingHouses.length})</SubHeading>
          <div className="flex flex-wrap gap-1.5">
            {data.sleepingHouses.map((h) => (
              <span key={h} className="text-xs font-mono px-2.5 py-1 rounded bg-muted/60 text-muted-foreground font-semibold">
                H{h}
              </span>
            ))}
          </div>
        </div>
        <div>
          <SubHeading>Awakened Houses ({data.awakenedHouses.length})</SubHeading>
          <div className="flex flex-wrap gap-1.5">
            {data.awakenedHouses.map((h) => (
              <span key={h} className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-semibold">
                H{h}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Special Yogas */}
      {data.specialYogas.length > 0 && (
        <div>
          <SubHeading>Special Yogas ({data.specialYogas.length})</SubHeading>
          <div className="space-y-3">
            {data.specialYogas.map((y, i) => (
              <div key={i} className="rounded-xl border bg-card p-4 space-y-2">
                <div className="flex items-baseline justify-between gap-3 flex-wrap">
                  <p className="text-sm font-bold">{y.name}</p>
                  <span className="text-xs font-mono text-muted-foreground">House {y.house}</span>
                </div>
                {y.planets.length > 0 && <ChipList items={y.planets} tone="warning" />}
                <p className="text-xs text-foreground/85 leading-relaxed pt-2 border-t border-border/40">
                  {y.effect}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Karmic Debts */}
      {data.karmicDebts.length > 0 && (
        <div>
          <SubHeading>Karmic Debts ({data.karmicDebts.length})</SubHeading>
          <div className="space-y-3">
            {data.karmicDebts.map((d, i) => (
              <div
                key={i}
                className={`rounded-xl border p-4 space-y-2 ${
                  d.isAfflicted
                    ? 'border-red-500/30 bg-red-500/[0.04]'
                    : 'border-emerald-500/30 bg-emerald-500/[0.03]'
                }`}
              >
                <div className="flex items-baseline justify-between gap-3 flex-wrap">
                  <p className="text-sm font-bold">{d.debtType}</p>
                  <RatingBadge rating={d.isAfflicted ? 'Afflicted' : 'Clear'} size="sm" />
                </div>
                <p className="text-xs text-foreground/85 leading-relaxed">{d.description}</p>
                {d.remedy && (
                  <p className="text-xs text-muted-foreground leading-relaxed pt-2 border-t border-border/40">
                    <strong className="text-foreground/70">Remedy:</strong> {d.remedy}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lal Kitab Remedies */}
      {data.lalKitabRemedies.length > 0 && (
        <div>
          <SubHeading>Lal Kitab Totke ({data.lalKitabRemedies.length})</SubHeading>
          <div className="space-y-3">
            {data.lalKitabRemedies.map((r, i) => (
              <div key={i} className="rounded-xl border border-amber-500/30 bg-amber-500/[0.04] p-4 space-y-2">
                <p className="text-[10px] uppercase tracking-wider text-amber-700 dark:text-amber-400 font-semibold">
                  {r.area}
                </p>
                <p className="text-sm text-foreground/85 leading-relaxed">{r.remedy}</p>
                {r.caution && (
                  <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed pt-2 border-t border-amber-500/20">
                    <strong>Caution:</strong> {r.caution}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function RemediesBlock({ data }: { data: Remedies }) {
  return (
    <>
      {/* Weak Houses */}
      {data.weakHousesIdentified.length > 0 && (
        <div>
          <SubHeading>Weak Houses Identified ({data.weakHousesIdentified.length})</SubHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.weakHousesIdentified.map((h) => (
              <div key={h.house} className="rounded-xl border border-amber-500/30 bg-amber-500/[0.03] p-4 space-y-2">
                <div className="flex items-baseline justify-between">
                  <p className="text-sm font-bold">House {h.house}</p>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {h.rashi} · {h.bindus} bindus
                  </span>
                </div>
                <p className="text-xs text-foreground/80 leading-relaxed">{h.impact}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Practical Remedies */}
      {data.remedyList.length > 0 && (
        <div>
          <SubHeading>Practical Remedies ({data.remedyList.length})</SubHeading>
          <div className="space-y-3">
            {data.remedyList.map((r, i) => (
              <div key={i} className="rounded-xl border bg-card p-4 space-y-2">
                <div className="flex items-baseline justify-between gap-3 flex-wrap">
                  <p className="text-sm font-bold">{r.title}</p>
                  <span className="text-[10px] uppercase tracking-wider text-primary font-semibold">
                    {r.remedyType}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  {r.area} · House {r.house}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed italic">{r.reason}</p>
                <p className="text-xs text-foreground/85 leading-relaxed pt-2 border-t border-border/40">
                  {r.instructions}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mantras */}
      {data.mantras.length > 0 && (
        <div>
          <SubHeading>Mantras ({data.mantras.length})</SubHeading>
          <div className="space-y-3">
            {data.mantras.map((m, i) => (
              <div key={i} className="rounded-xl border border-purple-500/30 bg-purple-500/[0.03] p-4 space-y-2">
                <div className="flex items-baseline justify-between gap-3 flex-wrap">
                  <p className="text-sm font-bold">{m.deity}</p>
                  <span className="text-[10px] text-muted-foreground font-mono">{m.count}</span>
                </div>
                <p
                  className="text-base leading-relaxed text-foreground/90 pt-2 border-t border-purple-500/20"
                  style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
                >
                  {m.mantra}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">{m.benefit}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dos & Don'ts */}
      {data.practicalDoAndDonts.map((d, i) => (
        <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <SubHeading>Do</SubHeading>
            <BulletList items={d.dos} tone="positive" icon="✓" />
          </div>
          <div>
            <SubHeading>Don't</SubHeading>
            <BulletList items={d.donts} tone="red" icon="✗" />
          </div>
        </div>
      ))}

      {/* Lifestyle */}
      {data.lifestyleHabits.length > 0 && (
        <div>
          <SubHeading>Lifestyle Habits</SubHeading>
          <BulletList items={data.lifestyleHabits} />
        </div>
      )}

      {/* Lal Kitab Remedies (also here) */}
      {data.lalKitabRemedies.length > 0 && (
        <div>
          <SubHeading>Lal Kitab Remedies ({data.lalKitabRemedies.length})</SubHeading>
          <div className="space-y-3">
            {data.lalKitabRemedies.map((r, i) => (
              <div key={i} className="rounded-xl border border-amber-500/30 bg-amber-500/[0.04] p-4 space-y-2">
                <p className="text-[10px] uppercase tracking-wider text-amber-700 dark:text-amber-400 font-semibold">
                  {r.area}
                </p>
                <p className="text-sm text-foreground/85 leading-relaxed">{r.remedy}</p>
                {r.caution && (
                  <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed pt-2 border-t border-amber-500/20">
                    <strong>Caution:</strong> {r.caution}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}