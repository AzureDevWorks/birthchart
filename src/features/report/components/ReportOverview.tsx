import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Hero } from './Hero';
import { Section } from '../primitives/Section';
import { OrnamentalDivider } from '../primitives/OrnamentalDivider';
import { ChartCard } from './ChartCard';
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
import { AspectsSection } from '../sections/AspectsSection';
import { ChalitSection } from '../sections/ChalitSection';
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
    '—';
  const suryaLagna =
    kundli.suryaKundli?.ascendant?.rashiName ??
    kundli.planets?.Sun?.rashiName ??
    '—';

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 md:py-12 space-y-4">
      {/* I. Hero */}
      <Hero profile={profile} kundli={kundli} onReset={onReset} />

      {/* II. The Four Charts */}
      <OrnamentalDivider />
      <Section
        eyebrow="The Charts"
        title="Form, Essence, and Reference"
        hint="Four charts form the classical working set. D1 shows the body. D9 shows the soul. Chandra and Surya reveal the mind and vitality from the Moon's and Sun's vantage points."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartCard
            code="D1"
            name="Rashi"
            subtitle="Body · Personality · Life path"
            lagna={kundli.ascendant?.rashiName ?? '—'}
            lagnaDegree={
              kundli.ascendant
                ? `${kundli.ascendant.degree ?? 0}° ${String(kundli.ascendant.minute ?? 0).padStart(2, '0')}′`
                : undefined
            }
            useFor={[
              'Physical body and health',
              'Life direction and identity',
              'Planetary positions',
            ]}
            houses={d1Houses}
            showToggle
            size={300}
          />
          <ChartCard
            code="D9"
            name="Navamsha"
            subtitle="Soul · Marriage · Inner strength"
            lagna={kundli.vargas?.d9?.ascendant?.rashiName ?? '—'}
            useFor={[
              'Marriage quality',
              'Soul purpose and dharma',
              'Inner strength of planets',
            ]}
            houses={d9Houses}
            size={300}
          />
          <ChartCard
            code="Chandra"
            name="Kundli"
            subtitle="Moon Chart · Mind · Psychology"
            lagna={chandraLagna}
            lagnaDegree={
              kundli.planets?.Moon
                ? `${kundli.planets.Moon.degree ?? 0}° ${String(kundli.planets.Moon.minute ?? 0).padStart(2, '0')}′`
                : undefined
            }
            useFor={[
              'Psychological perspective',
              'Mental peace and emotions',
              'Primary chart for transits',
            ]}
            houses={chandraHouses}
            size={300}
          />
          <ChartCard
            code="Surya"
            name="Kundli"
            subtitle="Sun Chart · Soul · Vitality"
            lagna={suryaLagna}
            lagnaDegree={
              kundli.planets?.Sun
                ? `${kundli.planets.Sun.degree ?? 0}° ${String(kundli.planets.Sun.minute ?? 0).padStart(2, '0')}′`
                : undefined
            }
            useFor={[
              'Soul vitality and health',
              'Executive authority',
              'Father and government',
            ]}
            houses={suryaHouses}
            size={300}
          />
        </div>
      </Section>

      {/* III. The Three Anchors */}
      <OrnamentalDivider />
      <Section
        eyebrow="Who You Are"
        title="Body, Mind, Soul"
        hint="Three pillars define a person: the body (Lagna), the mind (Chandra), and the soul (Surya)."
      >
        <ThreeAnchorsSection kundli={kundli} />
      </Section>

      {/* IV. The Planetary Map */}
      <OrnamentalDivider />
      <Section
        eyebrow="The Nine Grahas"
        title="The Planetary Map"
        hint="The nine planets as they stood at your birth."
      >
        <PlanetaryMapSection kundli={kundli} />
      </Section>

      {/* V. The House Map */}
      <OrnamentalDivider />
      <Section
        eyebrow="The Twelve Bhavas"
        title="The House Map"
        hint="Where the planets sit. House categories: amber = angles, green = fortune, red = tests."
      >
        <HouseMapSection kundli={kundli} />
      </Section>

      {/* VI. The Unfolding */}
      <OrnamentalDivider />
      <Section
        eyebrow="Vimshottari Dasha"
        title="The Unfolding"
        hint="Your life, as told by the Vimshottari cycle of planetary periods."
      >
        <UnfoldingSection kundli={kundli} />
      </Section>

      {/* VII. The Vital Signs */}
      <OrnamentalDivider />
      <Section
        eyebrow="Chart Strength"
        title="The Vital Signs"
        hint="Where your chart stands firm, where it asks for care, and how the world perceives you."
      >
        <VitalSignsSection kundli={kundli} />
      </Section>

      {/* VIII. The Aspects */}
      <OrnamentalDivider />
      <Section
        eyebrow="Graha Drishti"
        title="Planetary Aspects"
        hint="Every planet casts its glance on other houses. These interactions reveal who is watching whom — and shape what actually happens."
      >
        <AspectsSection kundli={kundli} />
      </Section>

      {/* IX. Bhava Chalit */}
      <OrnamentalDivider />
      <Section
        eyebrow="Bhava Chalit"
        title="Where Planets Actually Sit"
        hint="The Rashi chart places planets by whole sign. The Chalit chart places them by actual house boundaries — revealing shifts that change the reading."
      >
        <ChalitSection kundli={kundli} />
      </Section>

      {/* X. The Divisional Charts */}
      <OrnamentalDivider />
      <Section
        eyebrow="All D Charts"
        title="The Divisional Charts"
        hint="Twenty charts, one for each layer of the Vedic system — from the body (D1) to the deepest karma (D60)."
      >
        <DivisionalChartsSection kundli={kundli} />
      </Section>

      {/* Print-only footer */}
      <div className="print-footer hidden">
        KundaliYatra · A Vedic Reading
      </div>
    </div>
  );
}
