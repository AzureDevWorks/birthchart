import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Hero } from './Hero';
import { Section } from '../primitives/Section';
import { OrnamentalDivider } from '../primitives/OrnamentalDivider';
import { PrimaryChartCard, ReferenceChartCard } from './ChartCard';
import { ChartStyleToggle } from '@/features/chart/components/ChartStyleToggle';
import {
  buildChartHouses,
  buildVargaHouses,
  buildReferenceChartHouses,
} from '@/features/chart/lib/adapters';
import { ThreeAnchorsSection } from '../sections/ThreeAnchorsSection';
import { PlanetaryMapSection } from '../sections/PlanetaryMapSection';
import { HouseMapSection } from '../sections/HouseMapSection';
import { UnfoldingSection } from '../sections/UnfoldingSection';
import { VitalSignsSection } from '../sections/VitalSignsSection';
import { AshtakavargaSection } from '../sections/AshtakavargaSection';
import { AspectsSection } from '../sections/AspectsSection';
import { ChalitSection } from '../sections/ChalitSection';
import { SpecialLagnasSection } from '../sections/SpecialLagnasSection';
import { DivisionalChartsSection } from '../sections/DivisionalChartsSection';
import type { BirthData } from '@/domain/astrology/birth-data';

interface ReportOverviewProps {
  profile: BirthData;
  kundli: Record<string, any>;
  onReset: () => void;
}

export function ReportOverview({ profile, kundli, onReset }: ReportOverviewProps) {
  const { t } = useTranslation();

  const abbrResolver = useMemo(
    () => (planet: string) => {
      if (planet === 'Ascendant') return t('chart.planetAbbr.ascendant', { defaultValue: 'Asc' });
      return t(`chart.planetAbbr.${planet.toLowerCase()}`, { defaultValue: planet.slice(0, 2) });
    },
    [t]
  );

  const d1Houses = useMemo(
    () => buildChartHouses(kundli, { resolveAbbr: abbrResolver }),
    [kundli, abbrResolver]
  );
  const d9Houses = useMemo(
    () => buildVargaHouses(kundli, 'd9', { resolveAbbr: abbrResolver }),
    [kundli, abbrResolver]
  );
  const chandraHouses = useMemo(
    () => buildReferenceChartHouses(kundli, 'chandra', { resolveAbbr: abbrResolver }),
    [kundli, abbrResolver]
  );
  const suryaHouses = useMemo(
    () => buildReferenceChartHouses(kundli, 'surya', { resolveAbbr: abbrResolver }),
    [kundli, abbrResolver]
  );

  const chandraLagna =
    kundli.chandraKundli?.ascendant?.rashiName ??
    kundli.planets?.Moon?.rashiName ??
    '-';
  const suryaLagna =
    kundli.suryaKundli?.ascendant?.rashiName ??
    kundli.planets?.Sun?.rashiName ??
    '-';

  const formatDegree = (p: any) => {
    if (!p) return undefined;
    return `${p.degree ?? 0}\u00B0 ${String(p.minute ?? 0).padStart(2, '0')}\u2032`;
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 md:py-12 space-y-4">
      {/* AI Reading CTA - quiet invitation */}
      <Link
        to="/reading"
        className="no-print group block rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/[0.03] to-transparent hover:border-primary/40 hover:from-primary/[0.06] transition-all"
      >
        <div className="flex items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
              style={{
                background: 'hsl(var(--primary) / 0.1)',
                border: '1px solid hsl(var(--primary) / 0.25)',
              }}
            >
              <BookOpen size={15} className="text-primary" />
            </div>
            <div className="min-w-0">
              <p
                className="text-sm font-semibold text-foreground leading-tight truncate group-hover:text-primary transition-colors"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.05rem' }}
              >
                Prepare a full Vedic reading
              </p>
              <p className="text-[11px] text-muted-foreground leading-tight truncate">
                A long-form AI analysis of this chart, in the classical patrika style.
              </p>
            </div>
          </div>
          <span
            className="shrink-0 text-xs text-primary font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all"
          >
            Begin
            <span className="text-base leading-none">{'\u2192'}</span>
          </span>
        </div>
      </Link>

      {/* I. Hero */}
      <Hero profile={profile} kundli={kundli} onReset={onReset} />

      {/* II. The Four Charts */}
      <OrnamentalDivider />
      <Section
        eyebrow={t('sections.chartsEyebrow', { defaultValue: 'The Charts' })}
        title={t('sections.chartsTitle', { defaultValue: 'Form, Essence, and Reference' })}
        hint={t('sections.chartsHint', {
          defaultValue:
            "Four charts form the classical working set. D1 shows the body. D9 shows the soul. Chandra and Surya reveal the mind and vitality from the Moon's and Sun's vantage points.",
        })}
        action={<ChartStyleToggle />}
      >
        <div className="space-y-8">
          {/* Row 1 - The Essence Pair */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PrimaryChartCard
              code="D1"
              name={t('charts.d1.name', { defaultValue: 'Rashi' })}
              devanagari={'\u0930\u093E\u0936\u093F'}
              subtitle={t('charts.d1.subtitle', {
                defaultValue: 'Body \u00B7 Personality \u00B7 Life Path',
              })}
              intro={t('charts.d1.intro', {
                defaultValue:
                  'The rashi of the moment of birth. The foundation of every other reading.',
              })}
              lagna={kundli.ascendant?.rashiName ?? '-'}
              lagnaDegree={formatDegree(kundli.ascendant)}
              useFor={[
                t('charts.d1.use1', { defaultValue: 'Physical body and health' }),
                t('charts.d1.use2', { defaultValue: 'Life direction and identity' }),
                t('charts.d1.use3', { defaultValue: 'Planetary positions' }),
              ]}
              houses={d1Houses}
              chartSize={320}
              accent
            />
            <PrimaryChartCard
              code="D9"
              name={t('charts.d9.name', { defaultValue: 'Navamsha' })}
              devanagari={'\u0928\u0935\u093E\u0902\u0936'}
              subtitle={t('charts.d9.subtitle', {
                defaultValue: 'Soul \u00B7 Marriage \u00B7 Inner Strength',
              })}
              intro={t('charts.d9.intro', {
                defaultValue:
                  'Every planet is examined in its 9th harmonic - the truth beneath the surface.',
              })}
              lagna={kundli.vargas?.d9?.ascendant?.rashiName ?? '-'}
              useFor={[
                t('charts.d9.use1', { defaultValue: 'Marriage quality' }),
                t('charts.d9.use2', { defaultValue: 'Soul purpose and dharma' }),
                t('charts.d9.use3', { defaultValue: 'Inner strength of planets' }),
              ]}
              houses={d9Houses}
              chartSize={320}
            />
          </div>

          {/* Section break */}
          <div className="flex items-center justify-center gap-3 pt-4 pb-2">
            <span
              className="h-px flex-1"
              style={{
                background:
                  'linear-gradient(to right, transparent, hsl(38 40% 62% / 0.5), transparent)',
              }}
            />
            <span className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground font-semibold">
              {t('charts.referenceLenses', { defaultValue: 'Reference Lenses' })}
            </span>
            <span
              className="h-px flex-1"
              style={{
                background:
                  'linear-gradient(to left, transparent, hsl(38 40% 62% / 0.5), transparent)',
              }}
            />
          </div>

          {/* Row 2 - The Reference Pair */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ReferenceChartCard
              name={t('charts.chandra.name', { defaultValue: 'Chandra Kundli' })}
              devanagari={'\u091A\u0928\u094D\u0926\u094D\u0930 \u0915\u0941\u0923\u094D\u0921\u0932\u0940'}
              subtitle={t('charts.chandra.subtitle', { defaultValue: 'Moon Chart \u00B7 Mind' })}
              lagna={chandraLagna}
              lagnaDegree={formatDegree(kundli.planets?.Moon)}
              tags={[
                t('charts.chandra.tag1', { defaultValue: 'Transits' }),
                t('charts.chandra.tag2', { defaultValue: 'Mind' }),
                t('charts.chandra.tag3', { defaultValue: 'Psychology' }),
              ]}
              houses={chandraHouses}
              chartSize={260}
            />
            <ReferenceChartCard
              name={t('charts.surya.name', { defaultValue: 'Surya Kundli' })}
              devanagari={'\u0938\u0942\u0930\u094D\u092F \u0915\u0941\u0923\u094D\u0921\u0932\u0940'}
              subtitle={t('charts.surya.subtitle', { defaultValue: 'Sun Chart \u00B7 Soul' })}
              lagna={suryaLagna}
              lagnaDegree={formatDegree(kundli.planets?.Sun)}
              tags={[
                t('charts.surya.tag1', { defaultValue: 'Vitality' }),
                t('charts.surya.tag2', { defaultValue: 'Authority' }),
                t('charts.surya.tag3', { defaultValue: 'Father' }),
              ]}
              houses={suryaHouses}
              chartSize={260}
            />
          </div>
        </div>
      </Section>

      {/* III. The Three Anchors */}
      <OrnamentalDivider />
      <Section
        eyebrow={t('sections.anchorsEyebrow', { defaultValue: 'Who You Are' })}
        title={t('sections.anchorsTitle', { defaultValue: 'Body, Mind, Soul' })}
        hint={t('sections.anchorsHint', {
          defaultValue:
            'Three pillars define a person: the body (Lagna), the mind (Chandra), and the soul (Surya).',
        })}
      >
        <ThreeAnchorsSection kundli={kundli} />
      </Section>

      {/* IV. The Planetary Map */}
      <OrnamentalDivider />
      <Section
        eyebrow={t('sections.grahaEyebrow', { defaultValue: 'The Nine Grahas' })}
        title={t('sections.grahaTitle', { defaultValue: 'The Planetary Map' })}
        hint={t('sections.grahaHint', {
          defaultValue: 'The nine planets as they stood at your birth.',
        })}
      >
        <PlanetaryMapSection kundli={kundli} />
      </Section>

      {/* V. The House Map */}
      <OrnamentalDivider />
      <Section
        eyebrow={t('sections.bhavaEyebrow', { defaultValue: 'The Twelve Bhavas' })}
        title={t('sections.bhavaTitle', { defaultValue: 'The House Map' })}
        hint={t('sections.bhavaHint', {
          defaultValue:
            'Where the planets sit. House categories: amber = angles, green = fortune, red = tests.',
        })}
      >
        <HouseMapSection kundli={kundli} />
      </Section>

      {/* VI. The Unfolding */}
      <OrnamentalDivider />
      <Section
        eyebrow={t('sections.dashaEyebrow', { defaultValue: 'Vimshottari Dasha' })}
        title={t('sections.dashaTitle', { defaultValue: 'The Unfolding' })}
        hint={t('sections.dashaHint', {
          defaultValue:
            'Your life, as told by the Vimshottari cycle of planetary periods.',
        })}
      >
        <UnfoldingSection kundli={kundli} />
      </Section>

      {/* VII. The Vital Signs */}
      <OrnamentalDivider />
      <Section
        eyebrow={t('sections.vitalEyebrow', { defaultValue: 'Chart Strength' })}
        title={t('sections.vitalTitle', { defaultValue: 'The Vital Signs' })}
        hint={t('sections.vitalHint', {
          defaultValue:
            'Where your chart stands firm, where it asks for care, and how the world perceives you.',
        })}
      >
        <VitalSignsSection kundli={kundli} />
      </Section>

      {/* VIII. The Bindu Grid */}
      <OrnamentalDivider />
      <Section
        eyebrow={t('sections.binduEyebrow', { defaultValue: 'Ashtakavarga' })}
        title={t('sections.binduTitle', { defaultValue: 'The Bindu Grid' })}
        hint={t('sections.binduHint', {
          defaultValue:
            "Every planet votes on every house. This is where the chart agrees with itself - and where it doesn't.",
        })}
      >
        <AshtakavargaSection kundli={kundli} />
      </Section>

      {/* IX. The Aspects */}
      <OrnamentalDivider />
      <Section
        eyebrow={t('sections.aspectsEyebrow', { defaultValue: 'Graha Drishti' })}
        title={t('sections.aspectsTitle', { defaultValue: 'Planetary Aspects' })}
        hint={t('sections.aspectsHint', {
          defaultValue:
            'Every planet casts its glance on other houses. These interactions reveal who is watching whom - and shape what actually happens.',
        })}
      >
        <AspectsSection kundli={kundli} />
      </Section>

      {/* X. Bhava Chalit */}
      <OrnamentalDivider />
      <Section
        eyebrow={t('sections.chalitEyebrow', { defaultValue: 'Bhava Chalit' })}
        title={t('sections.chalitTitle', { defaultValue: 'Where Planets Actually Sit' })}
        hint={t('sections.chalitHint', {
          defaultValue:
            'The Rashi chart places planets by whole sign. The Chalit chart places them by actual house boundaries - revealing shifts that change the reading.',
        })}
      >
        <ChalitSection kundli={kundli} />
      </Section>

      {/* XI. The Hidden Lagnas */}
      <OrnamentalDivider />
      <Section
        eyebrow={t('sections.lagnasEyebrow', { defaultValue: 'The Hidden Lagnas' })}
        title={t('sections.lagnasTitle', { defaultValue: 'Power, Wealth, and Fortune' })}
        hint={t('sections.lagnasHint', {
          defaultValue:
            'Six subtle ascendants and four derived charts - calculated from the exact moment of birth. This is the classical Parashari layer that sits beneath the visible D1.',
        })}
      >
        <SpecialLagnasSection kundli={kundli} />
      </Section>

      {/* XII. The Divisional Charts */}
      <OrnamentalDivider />
      <Section
        eyebrow={t('sections.vargaEyebrow', { defaultValue: 'All D Charts' })}
        title={t('sections.vargaTitle', { defaultValue: 'The Divisional Charts' })}
        hint={t('sections.vargaHint', {
          defaultValue:
            'Twenty charts, one for each layer of the Vedic system - from the body (D1) to the deepest karma (D60).',
        })}
      >
        <DivisionalChartsSection kundli={kundli} />
      </Section>

      {/* Print-only footer */}
      <div className="print-footer hidden">KundaliYatra {'\u00B7'} A Vedic Reading</div>
    </div>
  );
}
