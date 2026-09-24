import { Document } from '@react-pdf/renderer';
import type { BirthData } from '@/domain/astrology/birth-data';
import type { ReadingEntry } from './pages';
import {
  CoverPage, TocPage, AnchorsPage, D1ChartPage, PlanetaryPage,
  HousesPage, FourChartsPage, DashaPage, AshtakavargaPage,
  AspectsPage, SpecialLagnasPage, NakshatraPage, ReadingPage,
  ColophonPage, type TocEntry,
  ChalitPage, VargasPage, SpecialChartsPage, PanchangPage,
  GocharPage, PredictionsPage, JaiminiPage, RemediesPage,
  LalKitabPage, FestivalsPage, DailyRashiPage, KpPage, KpAnalysisPage,
} from './pages';
import { SECTIONS, type SectionId } from './sections';

export interface DailyRashiEntry {
  date: string;
  headline?: string;
  action?: string;
  avoid?: string;
  text: string;
}

export interface KundliReportProps {
  profile: BirthData;
  kundli: Record<string, any>;
  sections: Set<SectionId>;
  readings: ReadingEntry[];
  dailyRashi: DailyRashiEntry[];
  ayanamsa: string;
  houseSystem: string;
}

export function KundliReport({
  profile, kundli, sections, readings, dailyRashi, ayanamsa, houseSystem,
}: KundliReportProps) {
  const def = (id: SectionId) => SECTIONS.find((x) => x.id === id)!;

  // Build the TOC from the ordered section list
  const toc: TocEntry[] = [];
  let pageCursor = 1;
  const orderedIds: SectionId[] = [
    'cover', 'toc', 'anchors', 'd1', 'planetary', 'houses', 'fourCharts',
    'vargas', 'specialCharts', 'chalit', 'dasha', 'panchang', 'gochar',
    'festivals', 'ashtakavarga', 'aspects', 'specialLagnas', 'jaimini',
    'predictions', 'kp', 'kpAnalysis', 'remedies', 'lalKitab', 'nakshatra', 'dailyRashi', 'readings',
  ];

  for (const id of orderedIds) {
    if (!sections.has(id)) continue;
    if (id === 'cover') { pageCursor += 1; continue; }
    if (id === 'toc') {
      toc.push({ numeral: '', label: 'Contents', page: pageCursor });
      pageCursor += 1;
      continue;
    }
    if (id === 'readings') {
      if (readings.length > 0) {
        toc.push({ numeral: def(id).numeral, label: def(id).tocLabel, page: pageCursor });
      }
      continue;
    }
    if (id === 'dailyRashi') {
      if (dailyRashi.length > 0) {
        toc.push({ numeral: def(id).numeral, label: def(id).tocLabel, page: pageCursor });
        pageCursor += 1;
      }
      continue;
    }
    toc.push({ numeral: def(id).numeral, label: def(id).tocLabel, page: pageCursor });
    pageCursor += 1;
  }

  return (
    <Document
      title={`Janma Kundali \u2014 ${profile.profileName}`}
      author="KundaliYatra"
      subject="Vedic Astrology Reading"
      creator="KundaliYatra"
      producer="@react-pdf/renderer"
    >
      {sections.has('cover') && <CoverPage profile={profile} />}
      {sections.has('toc') && <TocPage entries={toc} />}
      {sections.has('anchors') && (
        <AnchorsPage profile={profile} kundli={kundli} def={def('anchors')} ayanamsa={ayanamsa} houseSystem={houseSystem} />
      )}
      {sections.has('d1') && <D1ChartPage profile={profile} kundli={kundli} def={def('d1')} />}
      {sections.has('planetary') && <PlanetaryPage profile={profile} kundli={kundli} def={def('planetary')} />}
      {sections.has('houses') && <HousesPage profile={profile} kundli={kundli} def={def('houses')} />}
      {sections.has('fourCharts') && <FourChartsPage profile={profile} kundli={kundli} def={def('fourCharts')} />}
      {sections.has('vargas') && <VargasPage profile={profile} kundli={kundli} def={def('vargas')} />}
      {sections.has('specialCharts') && <SpecialChartsPage profile={profile} kundli={kundli} def={def('specialCharts')} />}
      {sections.has('chalit') && <ChalitPage profile={profile} kundli={kundli} def={def('chalit')} />}
      {sections.has('dasha') && <DashaPage profile={profile} kundli={kundli} def={def('dasha')} />}
      {sections.has('panchang') && <PanchangPage profile={profile} kundli={kundli} def={def('panchang')} />}
      {sections.has('gochar') && <GocharPage profile={profile} kundli={kundli} def={def('gochar')} />}
      {sections.has('festivals') && <FestivalsPage profile={profile} def={def('festivals')} />}
      {sections.has('ashtakavarga') && <AshtakavargaPage profile={profile} kundli={kundli} def={def('ashtakavarga')} />}
      {sections.has('aspects') && <AspectsPage profile={profile} kundli={kundli} def={def('aspects')} />}
      {sections.has('kp') && <KpPage profile={profile} kundli={kundli} def={def('kp')} />}
      {sections.has('specialLagnas') && <SpecialLagnasPage profile={profile} kundli={kundli} def={def('specialLagnas')} />}
      {sections.has('jaimini') && <JaiminiPage profile={profile} kundli={kundli} def={def('jaimini')} />}
      {sections.has('predictions') && <PredictionsPage profile={profile} kundli={kundli} def={def('predictions')} />}
      {sections.has('kpAnalysis') && <KpAnalysisPage profile={profile} kundli={kundli} def={def('kpAnalysis')} />}
      {sections.has('remedies') && <RemediesPage profile={profile} kundli={kundli} def={def('remedies')} />}
      {sections.has('lalKitab') && <LalKitabPage profile={profile} kundli={kundli} def={def('lalKitab')} />}
      {sections.has('nakshatra') && <NakshatraPage profile={profile} kundli={kundli} def={def('nakshatra')} />}
      {sections.has('dailyRashi') && dailyRashi.length > 0 && (
        <DailyRashiPage profile={profile} entries={dailyRashi} def={def('dailyRashi')} />
      )}
      {sections.has('readings') && readings.map((r, i) => (
        <ReadingPage key={i} profile={profile} reading={r} def={def('readings')} />
      ))}
      <ColophonPage profile={profile} />
    </Document>
  );
}