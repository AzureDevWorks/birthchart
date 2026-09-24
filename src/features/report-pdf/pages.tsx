import { Page, View, Text, Image } from '@react-pdf/renderer';
import type { BirthData } from '@/domain/astrology/birth-data';
import {
  buildChartHouses,
  buildVargaHouses,
  buildReferenceChartHouses,
} from '@/features/chart/lib/adapters';
import { PdfChart } from './PdfChart';
import { styles as s, C, F } from './styles';
import type { SectionDef } from './sections';

// â”€â”€ Special characters â€” always via {CONST}, never literal text â”€â”€
const DOT    = '\u00b7'; // Â·
const EMDASH = '\u2014'; // â€”
const RETRO  = '\u211e'; // â„ž
const DAGGER = '\u2020'; // â€ 
const MIDOT  = '\u00b7';

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Helpers
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const ABBR: Record<string, string> = {
  Ascendant: 'Asc', Sun: 'Su', Moon: 'Mo', Mars: 'Ma', Mercury: 'Me',
  Jupiter: 'Ju', Venus: 'Ve', Saturn: 'Sa', Rahu: 'Ra', Ketu: 'Ke',
};
const resolveAbbr = (p: string) => ABBR[p] ?? p.slice(0, 2);

const ROMAN = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'];
const RASHI_NAMES = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
const RASHI_LORDS: Record<string, string> = {
  Aries: 'Mars', Taurus: 'Venus', Gemini: 'Mercury', Cancer: 'Moon',
  Leo: 'Sun', Virgo: 'Mercury', Libra: 'Venus', Scorpio: 'Mars',
  Sagittarius: 'Jupiter', Capricorn: 'Saturn', Aquarius: 'Saturn', Pisces: 'Jupiter',
};

function safeStr(x: unknown, fb = '\u2014'): string {
  if (x === null || x === undefined || x === '') return fb;
  return String(x);
}
function fmtDeg(d?: number, m?: number): string {
  return `${d ?? 0}\u00b0 ${String(m ?? 0).padStart(2, '0')}\u2032`;
}
function fmtDate(iso?: string): string {
  if (!iso) return '\u2014';
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}
function fmtLongDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  const dt = new Date(y, m - 1, d, 12);
  return dt.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
}
function fmtTime(t: string): string {
  const [h, m] = t.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return `${String(h12).padStart(2, '0')}:${String(m ?? 0).padStart(2, '0')} ${suffix}`;
}
function stripMd(text: string): string {
  return text
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/^\s*[-*+]\s+/gm, DOT + ' ')
    .replace(/^\s*\d+\.\s+/gm, '')
    .replace(/^\s*>\s?/gm, '')
    .replace(/^\s*(?:[-*_]\s*){3,}$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Header / footer / section opener
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function PageHeader({ name, title }: { name: string; title: string }) {
  return (
    <View fixed style={s.header}>
      <Text style={s.headerLeft}>{name}</Text>
      <Text style={s.headerRight}>{title}</Text>
    </View>
  );
}
function PageFooter() {
  return (
    <View fixed style={s.footer}>
      <Text style={s.footerLeft}>KUNDALIYATRA</Text>
      <Text
        style={s.footerRight}
        render={({ pageNumber, totalPages }) =>
          `Page ${pageNumber} of ${totalPages}`
        }
      />
    </View>
  );
}
function SectionOpener({
  eyebrow, title, hint, numeral,
  minPresenceAhead = 320,
}: {
  eyebrow?: string; title: string; hint?: string; numeral?: string;
  minPresenceAhead?: number;
}) {
  return (
    <View style={s.sectionOpener} wrap={false} minPresenceAhead={minPresenceAhead}>
      {numeral ? <Text style={s.openerNumeral}>{numeral}</Text> : null}
      {eyebrow ? <Text style={s.openerEyebrow}>{eyebrow}</Text> : null}
      <Text style={s.openerTitle}>{title}</Text>
      {hint ? <Text style={s.openerHint}>{hint}</Text> : null}
      <View style={s.openerRule} />
    </View>
  );
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// COVER
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

export function CoverPage({ profile }: { profile: BirthData }) {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const ganeshUrl = origin ? `${origin}/ganesh.png` : null;
  const generatedAt = new Date();

  return (
    <Page size="A4" style={s.coverPage}>
      <View style={s.coverFrameOuter}>
        <View style={s.coverFrameMiddle}>
          <View style={s.coverFrameInner}>
            <View style={s.center}>
              <View style={s.coverGaneshWrap}>
                {ganeshUrl ? <Image src={ganeshUrl} style={s.coverGanesh} /> : null}
              </View>
              <Text style={s.coverMantra}>Om Sri Ganesaya Namah</Text>
              <Text style={s.coverTitleSmall}>JANMA KUNDALI</Text>
            </View>

            <View style={s.center}>
              <Text style={s.coverName}>{profile.profileName}</Text>
              <Text style={s.coverNameSub}>A VEDIC READING</Text>
              <View style={s.coverRule} />
              <Text style={s.coverLine}>{fmtLongDate(profile.localDate)}</Text>
              <Text style={s.coverLine}>{fmtTime(profile.localTime)}</Text>
              <View style={{ height: 14 }} />
              <Text style={s.coverLine}>{profile.place.label}</Text>
              <Text style={s.coverLineMono}>{profile.place.timezone}</Text>
            </View>

            <View style={s.center}>
              <View style={s.coverRule} />
              <Text style={s.coverFooterLabel}>
                GENERATED {generatedAt.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Page>
  );
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// TOC
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

export interface TocEntry {
  numeral: string;
  label: string;
  page: number;
}

export function TocPage({ entries }: { entries: TocEntry[] }) {
  return (
    <Page size="A4" style={s.tocPage}>
      <Text style={s.tocEyebrow}>CONTENTS</Text>
      <Text style={s.tocTitle}>The Reading</Text>
      <View style={s.tocRule} />
      {entries.map((e, i) => (
        <View key={i} style={s.tocRow} wrap={false}>
          <Text style={s.tocNumeral}>{e.numeral}</Text>
          <Text style={s.tocLabel}>{e.label}</Text>
          <Text style={s.tocDots}>......................</Text>
          <Text style={s.tocPageNum}>{String(e.page).padStart(2, '0')}</Text>
        </View>
      ))}
    </Page>
  );
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// ANCHORS
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

function AnchorCard({ role, sub, data }: { role: string; sub: string; data: any }) {
  return (
    <View style={s.anchorCard}>
      <Text style={s.anchorRole}>{role}</Text>
      <Text style={s.anchorSub}>{sub}</Text>
      <Text style={s.anchorRashi}>{safeStr(data?.rashiName)}</Text>
      <Text style={s.anchorDegree}>{fmtDeg(data?.degree, data?.minute)}</Text>
      <View style={s.anchorRule} />
      <Text style={s.anchorField}>
        <Text style={s.anchorFieldLabel}>Nakshatra: </Text>
        {safeStr(data?.nakshatra)}
        {data?.pada ? ` ${DOT} Pada ${data.pada}` : ''}
      </Text>
      <Text style={s.anchorField}>
        <Text style={s.anchorFieldLabel}>Nakshatra Lord: </Text>
        {safeStr(data?.nakshatraLord)}
      </Text>
      <Text style={s.anchorField}>
        <Text style={s.anchorFieldLabel}>Rashi Lord: </Text>
        {RASHI_LORDS[data?.rashiName] ?? '\u2014'}
      </Text>
    </View>
  );
}

export function AnchorsPage({
  profile, kundli, def, ayanamsa, houseSystem,
}: {
  profile: BirthData; kundli: Record<string, any>;
  def: SectionDef; ayanamsa: string; houseSystem: string;
}) {
  const asc = kundli.ascendant ?? {};
  const moon = kundli.planets?.Moon ?? {};
  const sun = kundli.planets?.Sun ?? {};

  return (
    <Page size="A4" style={s.page}>
      <PageHeader name={profile.profileName} title="THE THREE ANCHORS" />
      <SectionOpener
        numeral={def.numeral}
        eyebrow="Who You Are"
        title={def.label}
        hint="The three pillars of a Vedic chart: Lagna (body), Chandra (mind), and Surya (soul)."
        minPresenceAhead={380}
      />
      <View style={s.anchorRow} wrap={false}>
        <AnchorCard role="Lagna" sub={'The Body ' + DOT + ' Ascendant'} data={asc} />
        <AnchorCard role="Chandra" sub={'The Mind ' + DOT + ' Moon'} data={moon} />
        <AnchorCard role="Surya" sub={'The Soul ' + DOT + ' Sun'} data={sun} />
      </View>
      <View style={s.cardSoft} wrap={false}>
        <Text style={s.h3}>Calculation Framework</Text>
        <View style={s.row}>
          <View style={{ flex: 1 }}>
            <Text style={s.muted}>Ayanamsa</Text>
            <Text style={s.body}>{ayanamsa}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.muted}>House System</Text>
            <Text style={s.body}>{houseSystem}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.muted}>Zodiac</Text>
            <Text style={s.body}>Sidereal</Text>
          </View>
        </View>
      </View>
      <PageFooter />
    </Page>
  );
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// D1 CHART
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

export function D1ChartPage({
  profile, kundli, def,
}: { profile: BirthData; kundli: Record<string, any>; def: SectionDef }) {
  const houses = buildChartHouses(kundli, { resolveAbbr });
  const asc = kundli.ascendant ?? {};

  return (
    <Page size="A4" style={s.page}>
      <PageHeader name={profile.profileName} title="RASHI CHART" />
      <SectionOpener
        numeral={def.numeral}
        eyebrow="The Birth Chart"
        title={def.label}
        hint="The body, personality, and life path. Every other chart is a lens on top of this one."
        minPresenceAhead={420}
      />
      <View style={s.chartFull} wrap={false}>
        <PdfChart size={360} style="north" houses={houses} />
      </View>
      <View style={[s.card, s.mt8]} wrap={false}>
        <View style={s.row}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={s.h3}>Lagna</Text>
            <Text style={s.bodyLg}>{safeStr(asc.rashiName)}</Text>
            <Text style={s.mono}>{fmtDeg(asc.degree, asc.minute)}</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={s.h3}>Chandra</Text>
            <Text style={s.bodyLg}>{safeStr(kundli.planets?.Moon?.rashiName)}</Text>
            <Text style={s.mono}>{fmtDeg(kundli.planets?.Moon?.degree, kundli.planets?.Moon?.minute)}</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={s.h3}>Surya</Text>
            <Text style={s.bodyLg}>{safeStr(kundli.planets?.Sun?.rashiName)}</Text>
            <Text style={s.mono}>{fmtDeg(kundli.planets?.Sun?.degree, kundli.planets?.Sun?.minute)}</Text>
          </View>
        </View>
      </View>
      <Text style={s.muted}>
        {'North Indian layout ' + DOT + ' house 1 at the top centre ' + DOT + ' ' + RETRO + ' marks retrograde.'}
      </Text>
      <PageFooter />
    </Page>
  );
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// PLANETARY POSITIONS
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

const PLANET_ORDER = ['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn','Rahu','Ketu'];

export function PlanetaryPage({
  profile, kundli, def,
}: { profile: BirthData; kundli: Record<string, any>; def: SectionDef }) {
  const planets = kundli.planets ?? {};
  const houses = kundli.houses ?? [];
  const houseOf = (n: string) => {
    for (const h of houses) if (h.planets?.includes(n)) return h.number;
    return null;
  };

  return (
    <Page size="A4" style={s.page}>
      <PageHeader name={profile.profileName} title="PLANETARY POSITIONS" />
      <SectionOpener
        numeral={def.numeral}
        eyebrow="The Nine Grahas"
        title={def.label}
        hint="Sign, degree, house, nakshatra, and dignity of each planet at the moment of birth."
      />
      <View style={s.table} wrap={false}>
        <View style={s.tr}>
          <Text style={[s.th, { flex: 1.4 }]}>Planet</Text>
          <Text style={[s.th, { flex: 1.4 }]}>Sign</Text>
          <Text style={[s.th, { flex: 1.2 }]}>Degree</Text>
          <Text style={[s.th, { flex: 0.5, textAlign: 'center' }]}>H</Text>
          <Text style={[s.th, { flex: 1.7 }]}>Nakshatra</Text>
          <Text style={[s.th, { flex: 1.2 }]}>Dignity</Text>
        </View>
        {PLANET_ORDER.map((name, idx) => {
          const p = planets[name];
          if (!p) return null;
          const isLast = idx === PLANET_ORDER.length - 1;
          const dig = p.dignity ?? 'neutral';
          const digColor =
            dig === 'exalted' || dig === 'moolatrikona' || dig === 'own' ? C.good
            : dig === 'debilitated' || dig === 'enemy' ? C.bad
            : C.inkSoft;
          return (
            <View key={name}
              style={[isLast ? s.trLast : s.tr, idx % 2 === 1 ? s.trAlt : {}]}>
              <Text style={[s.tdLabel, { flex: 1.4 }]}>
                {name}{p.isRetrograde ? ' ' + RETRO : ''}{p.isCombust ? ' ' + DAGGER : ''}
              </Text>
              <Text style={[s.td, { flex: 1.4 }]}>{safeStr(p.rashiName)}</Text>
              <Text style={[s.tdMono, { flex: 1.2 }]}>{fmtDeg(p.degree, p.minute)}</Text>
              <Text style={[s.tdMono, { flex: 0.5, textAlign: 'center' }]}>{houseOf(name) ?? '\u2014'}</Text>
              <Text style={[s.td, { flex: 1.7 }]}>
                {safeStr(p.nakshatra)}{p.pada ? ` ${DOT} ${p.pada}` : ''}
              </Text>
              <Text style={[s.td, { flex: 1.2, color: digColor }]}>{dig}</Text>
            </View>
          );
        })}
      </View>
      <Text style={s.muted}>{RETRO + ' retrograde ' + DOT + ' ' + DAGGER + ' combust'}</Text>
      <PageFooter />
    </Page>
  );
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// HOUSES
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

export function HousesPage({
  profile, kundli, def,
}: { profile: BirthData; kundli: Record<string, any>; def: SectionDef }) {
  const houses = kundli.houses ?? [];

  return (
    <Page size="A4" style={s.page}>
      <PageHeader name={profile.profileName} title="THE TWELVE BHAVAS" />
      <SectionOpener
        numeral={def.numeral}
        eyebrow="Where Life Happens"
        title={def.label}
        hint="Each bhava governs a domain of life. Sign, lord, and occupants."
      />
      <View style={s.table} wrap={false}>
        <View style={s.tr}>
          <Text style={[s.th, { flex: 0.5, textAlign: 'center' }]}>#</Text>
          <Text style={[s.th, { flex: 1.6 }]}>Sign</Text>
          <Text style={[s.th, { flex: 1.3 }]}>Lord</Text>
          <Text style={[s.th, { flex: 3.2 }]}>Occupants</Text>
        </View>
        {houses.map((h: any, idx: number) => {
          const rashi = RASHI_NAMES[(h.rashi ?? 1) - 1] ?? '\u2014';
          const lord = RASHI_LORDS[rashi] ?? '\u2014';
          const occ: string[] = h.planets ?? [];
          const isLast = idx === houses.length - 1;
          const isEmpty = occ.length === 0;
          return (
            <View key={h.number}
              style={[isLast ? s.trLast : s.tr, idx % 2 === 1 ? s.trAlt : {}]}>
              <Text style={[s.tdMono, { flex: 0.5, textAlign: 'center' }]}>{ROMAN[h.number - 1]}</Text>
              <Text style={[s.td, { flex: 1.6 }]}>{rashi}</Text>
              <Text style={[s.td, { flex: 1.3 }]}>{lord}</Text>
              <Text style={[
                s.td,
                { flex: 3.2 },
                isEmpty ? { color: C.inkMuted, fontFamily: F.SI } : {},
              ]}>
                {isEmpty ? 'Empty' : occ.join(' ' + DOT + ' ')}
              </Text>
            </View>
          );
        })}
      </View>
      <PageFooter />
    </Page>
  );
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// FOUR CHARTS  â€” 2Ã—2 grid, will not wrap to a second page
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

function ChartCell({
  title, sub, houses,
}: { title: string; sub: string; houses: any[] }) {
  return (
    <View style={s.chartCell}>
      <Text style={s.chartCellTitle}>{title}</Text>
      <PdfChart size={190} style="north" houses={houses} />
      <Text style={s.chartCellSub}>{sub}</Text>
    </View>
  );
}

export function FourChartsPage({
  profile, kundli, def,
}: { profile: BirthData; kundli: Record<string, any>; def: SectionDef }) {
  const d1 = buildChartHouses(kundli, { resolveAbbr });
  const d9 = buildVargaHouses(kundli, 'd9', { resolveAbbr });
  const chandra = buildReferenceChartHouses(kundli, 'chandra', { resolveAbbr });
  const surya = buildReferenceChartHouses(kundli, 'surya', { resolveAbbr });

  const cLagna = kundli.chandraKundli?.ascendant?.rashiName ?? kundli.planets?.Moon?.rashiName ?? '\u2014';
  const sLagna = kundli.suryaKundli?.ascendant?.rashiName ?? kundli.planets?.Sun?.rashiName ?? '\u2014';

  return (
    <Page size="A4" style={s.page}>
      <PageHeader name={profile.profileName} title="THE FOUR CHARTS" />
      <SectionOpener
        numeral={def.numeral}
        eyebrow="Form, Essence, Reference"
        title={def.label}
        hint="D1 shows the body, D9 shows the soul, and the reference lenses give the Moon and Sun vantage points."
      />
      <View style={s.chartGrid} wrap={false}>
        <View style={s.chartRow}>
          <ChartCell
            title={'D1 ' + DOT + ' RASHI'}
            sub={'Lagna ' + safeStr(kundli.ascendant?.rashiName)}
            houses={d1}
          />
          <ChartCell
            title={'D9 ' + DOT + ' NAVAMSHA'}
            sub={'Lagna ' + safeStr(kundli.vargas?.d9?.ascendant?.rashiName)}
            houses={d9}
          />
        </View>
        <View style={s.chartRow}>
          <ChartCell
            title="CHANDRA"
            sub={'Lagna ' + cLagna}
            houses={chandra}
          />
          <ChartCell
            title="SURYA"
            sub={'Lagna ' + sLagna}
            houses={surya}
          />
        </View>
      </View>
      <PageFooter />
    </Page>
  );
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// DASHA  â€” compact hero + full timeline on one page
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

export function DashaPage({
  profile, kundli, def,
}: { profile: BirthData; kundli: Record<string, any>; def: SectionDef }) {
  const d = kundli.dasha ?? {};
  const mds = d.mahadashas ?? [];
  const cur = d.currentMahadasha;
  const antar = d.currentAntar;

  return (
    <Page size="A4" style={s.page}>
      <PageHeader name={profile.profileName} title="VIMSHOTTARI DASHA" />
      <SectionOpener
        numeral={def.numeral}
        eyebrow="The Unfolding"
        title={def.label}
        hint="The cycle of planetary periods through which a life unfolds."
        minPresenceAhead={380}
      />

      {cur && (
        <View style={s.dashaHero} wrap={false}>
          <Text style={s.dashaEyebrow}>CURRENTLY IN</Text>
          <Text style={s.dashaPlanet}>{cur.planet + ' Mahadasha'}</Text>
          <Text style={s.dashaDates}>
            {fmtDate(cur.startTime) + ' ' + EMDASH + ' ' + fmtDate(cur.endTime)}
          </Text>
          {typeof cur.progressPercent === 'number' && (
            <View style={{ alignItems: 'center' }}>
              <View style={s.dashaBarOuter}>
                <View style={[s.dashaBarInner, { width: `${Math.min(100, cur.progressPercent)}%` }]} />
              </View>
              <Text style={s.dashaPct}>{cur.progressPercent.toFixed(1) + '% COMPLETE'}</Text>
            </View>
          )}
        </View>
      )}

      {antar && (
        <View style={s.dashaInlineRow} wrap={false}>
          <View style={{ flex: 1 }}>
            <Text style={s.dashaSubLabel}>ANTARDASHA</Text>
            <Text style={s.dashaSubValue}>{antar.planet}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.dashaSubLabel}>FROM</Text>
            <Text style={s.dashaSubDates}>{fmtDate(antar.startTime)}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.dashaSubLabel}>TO</Text>
            <Text style={s.dashaSubDates}>{fmtDate(antar.endTime)}</Text>
          </View>
        </View>
      )}

      <Text style={[s.h3, s.mt16]} minPresenceAhead={260}>The Whole Life</Text>
      <View style={s.table} wrap={false}>
        <View style={s.tr}>
          <Text style={[s.th, { flex: 1.6 }]}>Planet</Text>
          <Text style={[s.th, { flex: 1.6 }]}>From</Text>
          <Text style={[s.th, { flex: 1.6 }]}>To</Text>
          <Text style={[s.th, { flex: 0.8, textAlign: 'right' }]}>Yrs</Text>
        </View>
        {mds.map((md: any, idx: number) => {
          const isCur = cur && md.planet === cur.planet && md.startTime === cur.startTime;
          const isLast = idx === mds.length - 1;
          const yrs = md.startTime && md.endTime
            ? String(new Date(md.endTime).getFullYear() - new Date(md.startTime).getFullYear())
            : '\u2014';
          return (
            <View key={md.planet + md.startTime}
              style={[isLast ? s.trLast : s.tr, idx % 2 === 1 ? s.trAlt : {}]}>
              <Text style={[s.td, { flex: 1.6 },
                isCur ? { fontFamily: F.SB, color: C.vermilion } : {}]}>
                {md.planet + (isCur ? ' ' + MIDOT + ' now' : '')}
              </Text>
              <Text style={[s.tdMono, { flex: 1.6 }]}>{fmtDate(md.startTime)}</Text>
              <Text style={[s.tdMono, { flex: 1.6 }]}>{fmtDate(md.endTime)}</Text>
              <Text style={[s.tdMono, { flex: 0.8, textAlign: 'right' }]}>{yrs}</Text>
            </View>
          );
        })}
      </View>
      <PageFooter />
    </Page>
  );
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// ASHTAKAVARGA
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

function binduColor(b: number): { bg: string; fg: string } {
  if (b >= 7) return { bg: '#3F6B4D', fg: '#FFFFFF' };
  if (b >= 5) return { bg: '#A8C9AE', fg: '#1F1409' };
  if (b === 4) return { bg: '#F6EFDD', fg: '#1F1409' };
  if (b >= 2) return { bg: '#F0DDB2', fg: '#1F1409' };
  return { bg: '#E5B5AE', fg: '#4A1A14' };
}

export function AshtakavargaPage({
  profile, kundli, def,
}: { profile: BirthData; kundli: Record<string, any>; def: SectionDef }) {
  const av = kundli.ashtakavarga;
  const sav = av?.sav;

  if (!sav?.houseStrengths?.length) {
    return (
      <Page size="A4" style={s.page}>
        <PageHeader name={profile.profileName} title="ASHTAKAVARGA" />
        <SectionOpener numeral={def.numeral} eyebrow="Strength" title={def.label} />
        <Text style={s.muted}>Ashtakavarga data not available for this chart.</Text>
        <PageFooter />
      </Page>
    );
  }

  return (
    <Page size="A4" style={s.page}>
      <PageHeader name={profile.profileName} title="ASHTAKAVARGA" />
      <SectionOpener
        numeral={def.numeral}
        eyebrow="Strength Grid"
        title={def.label}
        hint="Benefic support each house receives, measured in bindus."
      />
      <View style={[s.row, s.gap12, s.mb20]} wrap={false}>
        <View style={[s.card, { flex: 1, alignItems: 'center' }]}>
          <Text style={s.h3}>Total</Text>
          <Text style={[s.bodyLg, { fontFamily: F.SB, fontSize: 18 }]}>{sav.totalBindus ?? '\u2014'}</Text>
        </View>
        <View style={[s.card, { flex: 1, alignItems: 'center' }]}>
          <Text style={s.h3}>Strongest</Text>
          <Text style={[s.bodyLg, { fontFamily: F.SB, fontSize: 18, color: C.good }]}>
            {'House ' + ROMAN[(sav.strongestHouse ?? 1) - 1]}
          </Text>
        </View>
        <View style={[s.card, { flex: 1, alignItems: 'center' }]}>
          <Text style={s.h3}>Weakest</Text>
          <Text style={[s.bodyLg, { fontFamily: F.SB, fontSize: 18, color: C.bad }]}>
            {'House ' + ROMAN[(sav.weakestHouse ?? 1) - 1]}
          </Text>
        </View>
        <View style={[s.card, { flex: 1, alignItems: 'center' }]}>
          <Text style={s.h3}>Average</Text>
          <Text style={[s.bodyLg, { fontFamily: F.SB, fontSize: 18 }]}>
            {typeof sav.averageBindus === 'number' ? sav.averageBindus.toFixed(1) : '\u2014'}
          </Text>
        </View>
      </View>
      <Text style={s.h3} minPresenceAhead={220}>Bindus by House</Text>
      <View style={s.binduGrid} wrap={false}>
        {sav.houseStrengths.map((h: any) => {
          const col = binduColor(h.bindus);
          return (
            <View key={h.house}
              style={[s.binduCell, { backgroundColor: col.bg, borderColor: col.bg }]}>
              <Text style={[s.binduHouse, { color: col.fg, opacity: 0.7 }]}>
                {'H' + ROMAN[h.house - 1]}
              </Text>
              <Text style={[s.binduNumber, { color: col.fg }]}>{h.bindus}</Text>
              <Text style={[s.binduStrength, { color: col.fg, opacity: 0.85 }]}>
                {safeStr(h.strength)}
              </Text>
            </View>
          );
        })}
      </View>
      <View style={[s.cardSoft, s.mt12]} wrap={false}>
        <Text style={s.h3}>Reading the Grid</Text>
        <Text style={s.body}>
          {'Each planet casts bindus (support points) into every house. Green cells indicate well-supported houses \u2014 the areas where the chart gives naturally. Red cells are areas that ask for conscious effort. The strongest and weakest houses are marked above; they are the poles of the chart.'}
        </Text>
      </View>
      <PageFooter />
    </Page>
  );
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// ASPECTS  â€” aspects table + mutual aspects as a table
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

export function AspectsPage({
  profile, kundli, def,
}: { profile: BirthData; kundli: Record<string, any>; def: SectionDef }) {
  const dr = kundli.drishti ?? {};
  const pa = dr.planetAspects ?? {};
  const mutual = dr.mutualAspects ?? [];

  return (
    <Page size="A4" style={s.page}>
      <PageHeader name={profile.profileName} title="PLANETARY ASPECTS" />
      <SectionOpener
        numeral={def.numeral}
        eyebrow="Graha Drishti"
        title={def.label}
        hint="Which planets look at which houses. The glance of a planet shapes what happens there."
      />
      <View style={s.table} wrap={false}>
        <View style={s.tr}>
          <Text style={[s.th, { flex: 1.5 }]}>Planet</Text>
          <Text style={[s.th, { flex: 4 }]}>Aspects Houses</Text>
          <Text style={[s.th, { flex: 3 }]}>Aspects Planets</Text>
        </View>
        {PLANET_ORDER.map((name, idx) => {
          const a = pa[name];
          if (!a) return null;
          const houses = (a.aspectedHouses ?? []).map((h: any) => 'H' + h.house).join(' ' + DOT + ' ') || '\u2014';
          const planets = (a.aspectedPlanets ?? []).map((p: any) => p.planet).join(', ') || '\u2014';
          const isLast = idx === PLANET_ORDER.length - 1;
          return (
            <View key={name}
              style={[isLast ? s.trLast : s.tr, idx % 2 === 1 ? s.trAlt : {}]}>
              <Text style={[s.tdLabel, { flex: 1.5 }]}>{name}</Text>
              <Text style={[s.td, { flex: 4 }]}>{houses}</Text>
              <Text style={[s.td, { flex: 3, color: C.inkSoft }]}>{planets}</Text>
            </View>
          );
        })}
      </View>

      {mutual.length > 0 && (
        <>
          <Text style={[s.h3, s.mt16]} minPresenceAhead={200}>Mutual Aspects</Text>
          <View style={s.table} wrap={false}>
            <View style={s.tr}>
              <Text style={[s.th, { flex: 1.4 }]}>Planet</Text>
              <Text style={[s.th, { flex: 1.4 }]}>Sees</Text>
              <Text style={[s.th, { flex: 1.6 }]}>Type</Text>
              <Text style={[s.th, { flex: 1.6 }]}>Returns</Text>
            </View>
            {mutual.slice(0, 10).map((m: any, idx: number) => {
              const isLast = idx === Math.min(mutual.length, 10) - 1;
              return (
                <View key={idx}
                  style={[isLast ? s.trLast : s.tr, idx % 2 === 1 ? s.trAlt : {}]}>
                  <Text style={[s.tdLabel, { flex: 1.4 }]}>{safeStr(m.planet1)}</Text>
                  <Text style={[s.td, { flex: 1.4 }]}>{safeStr(m.planet2)}</Text>
                  <Text style={[s.td, { flex: 1.6 }]}>{safeStr(m.planet1AspectOnPlanet2)}</Text>
                  <Text style={[s.td, { flex: 1.6 }]}>{safeStr(m.planet2AspectOnPlanet1)}</Text>
                </View>
              );
            })}
          </View>
        </>
      )}
      <PageFooter />
    </Page>
  );
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// SPECIAL LAGNAS  â€” 6 lagnas + 4 primary arudhas (fits one page)
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

const SPECIALS = [
  { key: 'ghatikaLagna', code: 'GL', name: 'Ghatika Lagna', purpose: 'Power & Authority' },
  { key: 'horaLagna', code: 'HL', name: 'Hora Lagna', purpose: 'Wealth' },
  { key: 'bhavaLagna', code: 'BL', name: 'Bhava Lagna', purpose: 'Vitality' },
  { key: 'shreeLagna', code: 'SL', name: 'Shree Lagna', purpose: 'Fortune' },
  { key: 'induLagna', code: 'IL', name: 'Indu Lagna', purpose: 'Dhana Yoga' },
  { key: 'pranapadaLagna', code: 'PP', name: 'Pranapada', purpose: 'Rectification' },
];

const PRIMARY_ARUDHAS = ['A1', 'A7', 'A10', 'A12'];

export function SpecialLagnasPage({
  profile, kundli, def,
}: { profile: BirthData; kundli: Record<string, any>; def: SectionDef }) {
  const sl = kundli.specialLagnas ?? {};
  const ap = kundli.arudhaPadas?.all ?? [];
  const primary = ap.filter((p: any) => PRIMARY_ARUDHAS.includes(p.code));

  return (
    <Page size="A4" style={s.page}>
      <PageHeader name={profile.profileName} title="SPECIAL LAGNAS" />
      <SectionOpener
        numeral={def.numeral}
        eyebrow="The Hidden Lagnas"
        title={def.label}
        hint="Six subtle ascendants that reveal where specific areas of life shine."
      />

      <View style={[s.rowWrap, { justifyContent: 'space-between' }]} wrap={false}>
        {SPECIALS.map(({ key, code, name, purpose }) => {
          const v = sl[key];
          if (!v) return null;
          return (
            <View key={key} style={[s.cardSoft, { width: '48%', marginBottom: 10 }]}>
              <View style={[s.row, s.between, { alignItems: 'flex-start', marginBottom: 6 }]}>
                <View>
                  <Text style={s.h3}>{name}</Text>
                  <Text style={s.muted}>{purpose}</Text>
                </View>
                <Text style={[s.mono, { color: C.goldDeep, fontFamily: F.MB }]}>{code}</Text>
              </View>
              <Text style={[s.bodyLg, { fontFamily: F.SB, marginBottom: 3 }]}>
                {safeStr(v.rashiName)}
              </Text>
              <Text style={s.mono}>
                {fmtDeg(v.degree, v.minute) + (v.nakshatra ? ' ' + DOT + ' ' + v.nakshatra : '')}
              </Text>
              {typeof v.totalKalas === 'number' ? (
                <Text style={[s.mono, s.mt4]}>{'Kalas: ' + v.totalKalas}</Text>
              ) : null}
            </View>
          );
        })}
      </View>

      {primary.length > 0 && (
        <>
          <Text style={[s.h3, s.mt12]} minPresenceAhead={180}>Primary Arudha Padas</Text>
          <View style={s.table} wrap={false}>
            <View style={s.tr}>
              <Text style={[s.th, { flex: 0.8 }]}>Code</Text>
              <Text style={[s.th, { flex: 3 }]}>Name</Text>
              <Text style={[s.th, { flex: 2 }]}>Rashi</Text>
              <Text style={[s.th, { flex: 1.4 }]}>Lord</Text>
            </View>
            {primary.map((p: any, idx: number) => {
              const isLast = idx === primary.length - 1;
              return (
                <View key={p.code}
                  style={[isLast ? s.trLast : s.tr, idx % 2 === 1 ? s.trAlt : {}]}>
                  <Text style={[s.tdMono, { flex: 0.8, color: C.goldDeep, fontFamily: F.MB }]}>{p.code}</Text>
                  <Text style={[s.td, { flex: 3 }]}>{safeStr(p.name?.split(' - ')[0])}</Text>
                  <Text style={[s.td, { flex: 2 }]}>{safeStr(p.rashiName)}</Text>
                  <Text style={[s.td, { flex: 1.4 }]}>{safeStr(p.lord)}</Text>
                </View>
              );
            })}
          </View>
        </>
      )}
      <PageFooter />
    </Page>
  );
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// NAKSHATRA
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

export function NakshatraPage({
  profile, kundli, def,
}: { profile: BirthData; kundli: Record<string, any>; def: SectionDef }) {
  const moon = kundli.planets?.Moon ?? {};
  const asc = kundli.ascendant ?? {};
  const sun = kundli.planets?.Sun ?? {};

  return (
    <Page size="A4" style={s.page}>
      <PageHeader name={profile.profileName} title="NAKSHATRA" />
      <SectionOpener
        numeral={def.numeral}
        eyebrow="The Birth Star"
        title={def.label}
        hint={'The lunar mansion the Moon occupied at birth \u2014 the spiritual signature of the soul.'}
      />
      <View style={s.cardAccent} wrap={false}>
        <Text style={s.h3}>Chandra Nakshatra</Text>
        <Text style={[s.h1, { marginBottom: 6 }]}>{safeStr(moon.nakshatra)}</Text>
        <View style={[s.row, s.gap20]}>
          <View>
            <Text style={s.h3}>Pada</Text>
            <Text style={s.bodyLg}>{moon.pada ?? '\u2014'}</Text>
          </View>
          <View>
            <Text style={s.h3}>Lord</Text>
            <Text style={s.bodyLg}>{safeStr(moon.nakshatraLord)}</Text>
          </View>
          <View>
            <Text style={s.h3}>Degree</Text>
            <Text style={s.bodyLg}>{fmtDeg(moon.degree, moon.minute)}</Text>
          </View>
          <View>
            <Text style={s.h3}>Rashi</Text>
            <Text style={s.bodyLg}>{safeStr(moon.rashiName)}</Text>
          </View>
        </View>
      </View>
      <Text style={[s.h3, s.mt16]} minPresenceAhead={200}>The Three Lights</Text>
      <View style={s.table} wrap={false}>
        <View style={s.tr}>
          <Text style={[s.th, { flex: 1.4 }]}>Anchor</Text>
          <Text style={[s.th, { flex: 1.6 }]}>Rashi</Text>
          <Text style={[s.th, { flex: 2 }]}>Nakshatra</Text>
          <Text style={[s.th, { flex: 0.7, textAlign: 'center' }]}>Pada</Text>
          <Text style={[s.th, { flex: 1.4 }]}>Lord</Text>
        </View>
        {[
          { label: 'Lagna', data: asc },
          { label: 'Chandra', data: moon },
          { label: 'Surya', data: sun },
        ].map((r, idx, arr) => {
          const isLast = idx === arr.length - 1;
          return (
            <View key={r.label}
              style={[isLast ? s.trLast : s.tr, idx % 2 === 1 ? s.trAlt : {}]}>
              <Text style={[s.tdLabel, { flex: 1.4 }]}>{r.label}</Text>
              <Text style={[s.td, { flex: 1.6 }]}>{safeStr(r.data.rashiName)}</Text>
              <Text style={[s.td, { flex: 2 }]}>{safeStr(r.data.nakshatra)}</Text>
              <Text style={[s.tdMono, { flex: 0.7, textAlign: 'center' }]}>{r.data.pada ?? '\u2014'}</Text>
              <Text style={[s.td, { flex: 1.4 }]}>{safeStr(r.data.nakshatraLord)}</Text>
            </View>
          );
        })}
      </View>
      <PageFooter />
    </Page>
  );
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// READING  â€” the only page allowed to flow across pages
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

export interface ReadingEntry {
  categoryTitle: string;
  sanskrit?: string;
  text: string;
  wordCount: number;
  generatedAt: string;
  providerId?: string;
  modelId?: string;
}

export function ReadingPage({
  profile, reading, def,
}: { profile: BirthData; reading: ReadingEntry; def: SectionDef }) {
  const clean = stripMd(reading.text);
  const paragraphs = clean.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);

  return (
    <Page size="A4" style={s.page} wrap>
      <PageHeader name={profile.profileName} title={reading.categoryTitle.toUpperCase().slice(0, 32)} />
      <SectionOpener
        numeral={def.numeral}
        eyebrow={reading.sanskrit ?? 'Reading'}
        title={reading.categoryTitle}
      />
      <View style={s.readingMeta} wrap={false}>
        <Text style={s.readingMetaItem}>{reading.wordCount + ' WORDS'}</Text>
        <Text style={s.readingMetaItem}>
          {new Date(reading.generatedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}
        </Text>
        {reading.providerId ? (
          <Text style={s.readingMetaItem}>
            {(reading.providerId + (reading.modelId ? ' / ' + reading.modelId : '')).toUpperCase()}
          </Text>
        ) : null}
      </View>
      {paragraphs.map((para, i) => (
        <Text key={i} style={i === 0 ? s.readingFirst : s.readingBody}>
          {para}
        </Text>
      ))}
      <PageFooter />
    </Page>
  );
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// COLOPHON
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

export function ColophonPage({ profile }: { profile: BirthData }) {
  const generatedAt = new Date();
  return (
    <Page size="A4" style={s.colophonPage}>
      <Text style={s.colophonMain}>Iti</Text>
      <Text style={s.colophonSub}>Thus concludes this Vedic reading.</Text>
      <View style={s.colophonRule} />
      <Text style={s.colophonSub}>
        {'Composed for ' + profile.profileName + ', from the heavens at the moment of birth.'}
      </Text>
      <View style={s.colophonRule} />
      <Text style={s.colophonMeta}>
        {'KUNDALIYATRA\n' +
          'Generated ' + generatedAt.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) +
          '\n\n' +
          'For guidance, not certainty.\nFor direction, not fate.'}
      </Text>
    </Page>
  );
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// CHALIT
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

export function ChalitPage({
  profile, kundli, def,
}: { profile: BirthData; kundli: Record<string, any>; def: SectionDef }) {
  const chalit = kundli.chalit ?? {};
  const planets = chalit.planets ?? [];
  const shifted = planets.filter((p: any) => p.shifted !== 0);

  return (
    <Page size="A4" style={s.page}>
      <PageHeader name={profile.profileName} title="BHAVA CHALIT" />
      <SectionOpener
        numeral={def.numeral}
        eyebrow="Where Planets Actually Sit"
        title={def.label}
        hint="The Rashi chart places planets by whole sign; the Chalit chart places them by actual house boundaries."
      />
      <View style={s.chartFull} wrap={false}>
        <PdfChart size={340} style="north" houses={
          planets.map((p: any) => ({
            number: p.house,
            rashi: p.rashiName,
            planets: [{ planet: p.name, abbr: resolveAbbr(p.name), degree: p.degree ?? 0, isRetrograde: !!p.isRetrograde, isCombust: !!p.isCombust }],
          }))
        } />
      </View>
      <Text style={[s.h3, s.mt12]}>Planetary Shifts</Text>
      <View style={s.table} wrap={false}>
        <View style={s.tr}>
          <Text style={[s.th, { flex: 2 }]}>Planet</Text>
          <Text style={[s.th, { flex: 2 }]}>Rashi House</Text>
          <Text style={[s.th, { flex: 2 }]}>Chalit House</Text>
          <Text style={[s.th, { flex: 1.4 }]}>Shift</Text>
        </View>
        {planets.slice(0, 12).map((p: any, idx: number) => {
          const isLast = idx === Math.min(planets.length, 12) - 1;
          const shifted = p.shifted !== 0;
          return (
            <View key={p.name} style={[isLast ? s.trLast : s.tr, idx % 2 === 1 ? s.trAlt : {}]}>
              <Text style={[s.tdLabel, { flex: 2 }]}>{p.name}</Text>
              <Text style={[s.tdMono, { flex: 2, textAlign: 'center' }]}>{ROMAN[(p.rashiHouse ?? 1) - 1]}</Text>
              <Text style={[s.tdMono, { flex: 2, textAlign: 'center' }]}>{ROMAN[(p.house ?? 1) - 1]}</Text>
              <Text style={[s.td, { flex: 1.4, color: shifted ? C.vermilion : C.inkMuted }]}>
                {shifted ? (p.shifted > 0 ? 'Forward' : 'Back') : '\u2014'}
              </Text>
            </View>
          );
        })}
      </View>
      {shifted.length === 0 && (
        <Text style={s.muted}>No planets shift between the Rashi and Chalit charts.</Text>
      )}
      <PageFooter />
    </Page>
  );
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// VARGAS SHOWCASE
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

const VARGA_CODES = ['d9', 'd10', 'd16', 'd24', 'd30', 'd60'];
const VARGA_NAMES: Record<string, string> = {
  d9: 'Navamsha', d10: 'Dashamsha', d16: 'Shodashamsha',
  d24: 'Siddhamsha', d30: 'Trimshamsha', d60: 'Shashtiamsha',
};
const VARGA_PURPOSE: Record<string, string> = {
  d9: `Marriage ${DOT} Dharma`, d10: 'Career', d16: 'Vehicles',
  d24: 'Education', d30: 'Misfortunes', d60: 'Karma',
};

export function VargasPage({
  profile, kundli, def,
}: { profile: BirthData; kundli: Record<string, any>; def: SectionDef }) {

  return (
    <Page size="A4" style={s.page}>
      <PageHeader name={profile.profileName} title="DIVISIONAL CHARTS" />
      <SectionOpener
        numeral={def.numeral}
        eyebrow="The Varga System"
        title={def.label}
        hint="Six key divisional charts â€” from the soul (D9) to the deepest karma (D60)."
      />
      <View style={s.chartGrid} wrap={false}>
        <View style={s.chartRow}>
          {VARGA_CODES.slice(0, 2).map((code) => {
            const houses = buildVargaHouses(kundli, code, { resolveAbbr });
            return (
              <View key={code} style={s.chartCell}>
                <Text style={s.chartCellTitle}>{code.toUpperCase()} Â· {VARGA_NAMES[code]}</Text>
                <PdfChart size={175} style="north" houses={houses} />
                <Text style={s.chartCellSub}>{VARGA_PURPOSE[code]}</Text>
              </View>
            );
          })}
        </View>
        <View style={s.chartRow}>
          {VARGA_CODES.slice(2, 4).map((code) => {
            const houses = buildVargaHouses(kundli, code, { resolveAbbr });
            return (
              <View key={code} style={s.chartCell}>
                <Text style={s.chartCellTitle}>{code.toUpperCase()} Â· {VARGA_NAMES[code]}</Text>
                <PdfChart size={175} style="north" houses={houses} />
                <Text style={s.chartCellSub}>{VARGA_PURPOSE[code]}</Text>
              </View>
            );
          })}
        </View>
        <View style={s.chartRow}>
          {VARGA_CODES.slice(4, 6).map((code) => {
            const houses = buildVargaHouses(kundli, code, { resolveAbbr });
            return (
              <View key={code} style={s.chartCell}>
                <Text style={s.chartCellTitle}>{code.toUpperCase()} Â· {VARGA_NAMES[code]}</Text>
                <PdfChart size={175} style="north" houses={houses} />
                <Text style={s.chartCellSub}>{VARGA_PURPOSE[code]}</Text>
              </View>
            );
          })}
        </View>
      </View>
      <PageFooter />
    </Page>
  );
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// SPECIAL CHARTS â€” GL / HL / BL / IL
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

export function SpecialChartsPage({
  profile, kundli, def,
}: { profile: BirthData; kundli: Record<string, any>; def: SectionDef }) {
  // These are the special lagna derived charts. If not present in the
  // kundli object, fall back to a "not available" grid.
  const derived = (kundli as any).specialCharts ?? null;

  const cells = [
    { title: 'GHATIKA', sub: 'Power & Authority', chart: derived?.ghatika },
    { title: 'HORA', sub: 'Wealth', chart: derived?.hora },
    { title: 'BHAVA', sub: 'Vitality', chart: derived?.bhava },
    { title: 'INDU', sub: 'Dhana Yoga', chart: derived?.indu },
  ];

  return (
    <Page size="A4" style={s.page}>
      <PageHeader name={profile.profileName} title="SPECIAL CHARTS" />
      <SectionOpener
        numeral={def.numeral}
        eyebrow="Derived Lagnas"
        title={def.label}
        hint="Four special ascendants, each treated as House 1."
      />
      <View style={s.chartGrid} wrap={false}>
        <View style={s.chartRow}>
          {cells.slice(0, 2).map((c) => (
            <View key={c.title} style={s.chartCell}>
              <Text style={s.chartCellTitle}>{c.title}</Text>
              {c.chart ? (
                <PdfChart size={200} style="north" houses={c.chart} />
              ) : (
                <View style={{ width: 200, height: 200, borderWidth: 0.5, borderColor: C.borderSoft, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={s.muted}>Not available</Text>
                </View>
              )}
              <Text style={s.chartCellSub}>{c.sub}</Text>
            </View>
          ))}
        </View>
        <View style={s.chartRow}>
          {cells.slice(2, 4).map((c) => (
            <View key={c.title} style={s.chartCell}>
              <Text style={s.chartCellTitle}>{c.title}</Text>
              {c.chart ? (
                <PdfChart size={200} style="north" houses={c.chart} />
              ) : (
                <View style={{ width: 200, height: 200, borderWidth: 0.5, borderColor: C.borderSoft, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={s.muted}>Not available</Text>
                </View>
              )}
              <Text style={s.chartCellSub}>{c.sub}</Text>
            </View>
          ))}
        </View>
      </View>
      <PageFooter />
    </Page>
  );
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// PANCHANG (birth + now combined)
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

export function PanchangPage({
  profile, kundli, def,
}: { profile: BirthData; kundli: Record<string, any>; def: SectionDef }) {
  const moon = kundli.planets?.Moon ?? {};
  const asc = kundli.ascendant ?? {};

  return (
    <Page size="A4" style={s.page}>
      <PageHeader name={profile.profileName} title="PANCHANG" />
      <SectionOpener
        numeral={def.numeral}
        eyebrow="The Five Limbs"
        title={def.label}
        hint="Tithi, nakshatra, yoga, karana, and vara at the moment of birth."
      />
      <View style={s.cardAccent} wrap={false}>
        <Text style={s.h3}>Chandra Nakshatra at Birth</Text>
        <Text style={[s.h1, { marginBottom: 6 }]}>{safeStr(moon.nakshatra)}</Text>
        <View style={[s.row, s.gap20]}>
          <View>
            <Text style={s.h3}>Pada</Text>
            <Text style={s.bodyLg}>{moon.pada ?? '\u2014'}</Text>
          </View>
          <View>
            <Text style={s.h3}>Lord</Text>
            <Text style={s.bodyLg}>{safeStr(moon.nakshatraLord)}</Text>
          </View>
          <View>
            <Text style={s.h3}>Rashi</Text>
            <Text style={s.bodyLg}>{safeStr(moon.rashiName)}</Text>
          </View>
          <View>
            <Text style={s.h3}>Lagna</Text>
            <Text style={s.bodyLg}>{safeStr(asc.rashiName)}</Text>
          </View>
        </View>
      </View>
      <Text style={[s.h3, s.mt16]}>The Three Lights</Text>
      <View style={s.table} wrap={false}>
        <View style={s.tr}>
          <Text style={[s.th, { flex: 1.4 }]}>Anchor</Text>
          <Text style={[s.th, { flex: 1.6 }]}>Rashi</Text>
          <Text style={[s.th, { flex: 2 }]}>Nakshatra</Text>
          <Text style={[s.th, { flex: 0.7, textAlign: 'center' }]}>Pada</Text>
        </View>
        {[
          { label: 'Lagna', data: asc },
          { label: 'Chandra', data: moon },
          { label: 'Surya', data: kundli.planets?.Sun ?? {} },
        ].map((r, idx, arr) => {
          const isLast = idx === arr.length - 1;
          return (
            <View key={r.label} style={[isLast ? s.trLast : s.tr, idx % 2 === 1 ? s.trAlt : {}]}>
              <Text style={[s.tdLabel, { flex: 1.4 }]}>{r.label}</Text>
              <Text style={[s.td, { flex: 1.6 }]}>{safeStr(r.data.rashiName)}</Text>
              <Text style={[s.td, { flex: 2 }]}>{safeStr(r.data.nakshatra)}</Text>
              <Text style={[s.tdMono, { flex: 0.7, textAlign: 'center' }]}>{r.data.pada ?? '\u2014'}</Text>
            </View>
          );
        })}
      </View>
      <PageFooter />
    </Page>
  );
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// GOCHAR (current transits)
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

export function GocharPage({
  profile, kundli, def,
}: { profile: BirthData; kundli: Record<string, any>; def: SectionDef }) {
  // Transits would require a live call to gocharAdapter; for the PDF we
  // present the natal anchor and a note. The full analysis lives in the
  // JSON export.
  return (
    <Page size="A4" style={s.page}>
      <PageHeader name={profile.profileName} title="CURRENT TRANSITS" />
      <SectionOpener
        numeral={def.numeral}
        eyebrow="Gochar"
        title={def.label}
        hint="The sky right now, relative to the natal Moon."
      />
      <View style={s.cardSoft} wrap={false}>
        <Text style={s.h3}>Natal Moon</Text>
        <Text style={s.bodyLg}>
          {safeStr(kundli.planets?.Moon?.rashiName)} \u00b7 {safeStr(kundli.planets?.Moon?.nakshatra)}
        </Text>
        <Text style={s.muted}>
          Live transit analysis is not embedded in this report. The full
          Gochar data â€” Sade Sati, Dhaiya, house-from-Moon positions â€”
          is available in the JSON export.
        </Text>
      </View>
      <PageFooter />
    </Page>
  );
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// PREDICTIONS (career + wealth + marriage summary)
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

export function PredictionsPage({
  profile, kundli, def,
}: { profile: BirthData; kundli: Record<string, any>; def: SectionDef }) {
  const tenth = kundli.houses?.find((h: any) => h.number === 10) ?? {};
  const second = kundli.houses?.find((h: any) => h.number === 2) ?? {};
  const seventh = kundli.houses?.find((h: any) => h.number === 7) ?? {};
  const tenthLord = RASHI_LORDS[RASHI_NAMES[(tenth.rashi ?? 1) - 1]] ?? '\u2014';
  const secondLord = RASHI_LORDS[RASHI_NAMES[(second.rashi ?? 1) - 1]] ?? '\u2014';
  const seventhLord = RASHI_LORDS[RASHI_NAMES[(seventh.rashi ?? 1) - 1]] ?? '\u2014';
  const planets = kundli.planets ?? {};
  const strongPlanet = PLANET_ORDER.reduce((best, name) => {
    const p = planets[name];
    if (!p) return best;
    const score = (['exalted', 'moolatrikona', 'own'].includes(p.dignity) ? 3 : p.dignity === 'debilitated' ? -2 : 0);
    return !best || score > best.score ? { name, score, dignity: p.dignity } : best;
  }, null as { name: string; score: number; dignity: string } | null);

  return (
    <Page size="A4" style={s.page}>
      <PageHeader name={profile.profileName} title="LIFE PREDICTIONS" />
      <SectionOpener
        numeral={def.numeral}
        eyebrow="The Three Domains"
        title={def.label}
        hint="Career, wealth, and marriage â€” the three pillars of worldly life."
      />

      <View style={[s.card, s.mb12]} wrap={false}>
        <Text style={s.h3}>Career Â· The 10th House</Text>
        <Text style={s.body}>10th house in <Text style={{ fontFamily: F.SB }}>{RASHI_NAMES[(tenth.rashi ?? 1) - 1]}</Text>, ruled by <Text style={{ fontFamily: F.SB }}>{tenthLord}</Text>.</Text>
        <Text style={s.body}>
          {tenth.planets?.length > 0
            ? `Occupied by ${tenth.planets.join(', ')} â€” a strong signature for professional visibility.`
            : 'Empty â€” the lord\u2019s placement carries the full weight of career direction.'}
        </Text>
      </View>

      <View style={[s.card, s.mb12]} wrap={false}>
        <Text style={s.h3}>Wealth Â· The 2nd House</Text>
        <Text style={s.body}>2nd house in <Text style={{ fontFamily: F.SB }}>{RASHI_NAMES[(second.rashi ?? 1) - 1]}</Text>, ruled by <Text style={{ fontFamily: F.SB }}>{secondLord}</Text>.</Text>
        <Text style={s.body}>
          {second.planets?.length > 0
            ? `Occupied by ${second.planets.join(', ')} â€” resources gather around these significations.`
            : 'Empty â€” the 2nd lord\u2019s condition is the primary indicator for savings and speech.'}
        </Text>
      </View>

      <View style={[s.card, s.mb12]} wrap={false}>
        <Text style={s.h3}>Marriage Â· The 7th House</Text>
        <Text style={s.body}>7th house in <Text style={{ fontFamily: F.SB }}>{RASHI_NAMES[(seventh.rashi ?? 1) - 1]}</Text>, ruled by <Text style={{ fontFamily: F.SB }}>{seventhLord}</Text>.</Text>
        <Text style={s.body}>
          {seventh.planets?.length > 0
            ? `Occupied by ${seventh.planets.join(', ')} â€” partnership receives direct planetary influence.`
            : 'Empty â€” 7th lord placement and Venus\u2019s condition shape the marital landscape.'}
        </Text>
      </View>

      {strongPlanet && (
        <View style={s.cardSoft} wrap={false}>
          <Text style={s.h3}>Chart Highlight</Text>
          <Text style={s.body}>
            <Text style={{ fontFamily: F.SB }}>{strongPlanet.name}</Text>
            {' '}is the strongest planet by dignity ({strongPlanet.dignity}).
          </Text>
        </View>
      )}

      <PageFooter />
    </Page>
  );
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// JAIMINI KARAKAS
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

export function JaiminiPage({
  profile, kundli, def,
}: { profile: BirthData; kundli: Record<string, any>; def: SectionDef }) {
  const planets = kundli.planets ?? {};
  const order = PLANET_ORDER.filter((n) => n !== 'Rahu' && n !== 'Ketu');
  const withDeg = order
    .map((name) => ({ name, deg: (planets[name]?.degree ?? 0) + (planets[name]?.minute ?? 0) / 60 }))
    .sort((a, b) => b.deg - a.deg);
  const roles = ['AK', 'AmK', 'BK', 'MK', 'PK', 'GK', 'DK'];
  const roleNames: Record<string, string> = {
    AK: 'Atmakaraka Â· Soul', AmK: 'Amatyakaraka Â· Career',
    BK: 'Bhratrikaraka Â· Siblings', MK: 'Matrikaraka Â· Mother',
    PK: 'Putrakaraka Â· Children', GK: 'Gnatikaraka Â· Obstacles',
    DK: 'Darakaraka Â· Spouse',
  };

  return (
    <Page size="A4" style={s.page}>
      <PageHeader name={profile.profileName} title="JAIMINI KARAKAS" />
      <SectionOpener
        numeral={def.numeral}
        eyebrow="The Seven Soul-Significators"
        title={def.label}
        hint="Chara Karakas rank the planets by degree to reveal which carries each life theme."
      />
      <View style={s.table} wrap={false}>
        <View style={s.tr}>
          <Text style={[s.th, { flex: 0.8 }]}>Role</Text>
          <Text style={[s.th, { flex: 1.4 }]}>Planet</Text>
          <Text style={[s.th, { flex: 1.4 }]}>Degree</Text>
          <Text style={[s.th, { flex: 3 }]}>Signification</Text>
        </View>
        {withDeg.map((p, idx) => {
          const isLast = idx === withDeg.length - 1;
          return (
            <View key={p.name} style={[isLast ? s.trLast : s.tr, idx % 2 === 1 ? s.trAlt : {}]}>
              <Text style={[s.tdMono, { flex: 0.8, color: C.goldDeep, fontFamily: F.MB }]}>{roles[idx]}</Text>
              <Text style={[s.tdLabel, { flex: 1.4 }]}>{p.name}</Text>
              <Text style={[s.tdMono, { flex: 1.4 }]}>{p.deg.toFixed(2)}Â°</Text>
              <Text style={[s.td, { flex: 3 }]}>{roleNames[roles[idx]]}</Text>
            </View>
          );
        })}
      </View>
      <PageFooter />
    </Page>
  );
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// REMEDIES
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

export function RemediesPage({
  profile, kundli, def,
}: { profile: BirthData; kundli: Record<string, any>; def: SectionDef }) {
  const planets = kundli.planets ?? {};
  // Weak planets: debilitated, combust, or enemy dignity
  const weak = PLANET_ORDER.filter((name) => {
    const p = planets[name];
    if (!p) return false;
    return p.dignity === 'debilitated' || p.dignity === 'enemy' || p.isCombust;
  }).slice(0, 3);

  const MANTRA: Record<string, string> = {
    Sun: 'Om Suryaya Namaha', Moon: 'Om Somaya Namaha', Mars: 'Om Mangalaya Namaha',
    Mercury: 'Om Budhaya Namaha', Jupiter: 'Om Gurave Namaha', Venus: 'Om Shukraya Namaha',
    Saturn: 'Om Shanicharaya Namaha', Rahu: 'Om Rahave Namaha', Ketu: 'Om Ketave Namaha',
  };
  const DAY: Record<string, string> = {
    Sun: 'Sunday', Moon: 'Monday', Mars: 'Tuesday', Mercury: 'Wednesday',
    Jupiter: 'Thursday', Venus: 'Friday', Saturn: 'Saturday', Rahu: 'Saturday', Ketu: 'Tuesday',
  };
  const DAAN: Record<string, string> = {
    Sun: 'wheat, jaggery, copper', Moon: 'rice, milk, silver', Mars: 'red lentils, copper',
    Mercury: 'green moong, green cloth', Jupiter: 'turmeric, yellow cloth, ghee',
    Venus: 'white sweets, rice, silver', Saturn: 'black sesame, mustard oil, iron',
    Rahu: 'black gram, blue cloth', Ketu: 'multi-coloured cloth, sesame',
  };

  return (
    <Page size="A4" style={s.page}>
      <PageHeader name={profile.profileName} title="REMEDIES" />
      <SectionOpener
        numeral={def.numeral}
        eyebrow="UpÄya"
        title={def.label}
        hint="Traditional practices for the planets that ask for support."
      />
      {weak.length === 0 ? (
        <View style={s.cardSoft} wrap={false}>
          <Text style={s.body}>
            No planets are debilitated, combust, or in enemy dignity in this chart.
            No specific remedies are called for by the classical rules.
          </Text>
        </View>
      ) : (
        weak.map((name) => {
          const p = planets[name] ?? {};
          return (
            <View key={name} style={[s.card, s.mb12]} wrap={false}>
              <Text style={s.h3}>{name} Â· {p.dignity ?? 'afflicted'}</Text>
              <Text style={s.body}>
                <Text style={{ fontFamily: F.SB }}>Mantra: </Text>
                {MANTRA[name] ?? '\u2014'} \u00b7 108 repetitions daily
              </Text>
              <Text style={s.body}>
                <Text style={{ fontFamily: F.SB }}>Day: </Text>
                {DAY[name] ?? '\u2014'}
              </Text>
              <Text style={s.body}>
                <Text style={{ fontFamily: F.SB }}>Daan: </Text>
                Donate {DAAN[name] ?? 'items associated with this graha'} on the day above.
              </Text>
            </View>
          );
        })
      )}
      <PageFooter />
    </Page>
  );
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// LAL KITAB (light)
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

export function LalKitabPage({
  profile, kundli, def,
}: { profile: BirthData; kundli: Record<string, any>; def: SectionDef }) {
  const planets = kundli.planets ?? {};
  // Kismat Ka Grah in Lal Kitab = the planet with the strongest placement
  const kismat = PLANET_ORDER.find((name) => planets[name]?.dignity === 'exalted')
    ?? PLANET_ORDER.find((name) => ['own', 'moolatrikona'].includes(planets[name]?.dignity))
    ?? 'Saturn';

  return (
    <Page size="A4" style={s.page}>
      <PageHeader name={profile.profileName} title="LAL KITAB" />
      <SectionOpener
        numeral={def.numeral}
        eyebrow="The Red Book"
        title={def.label}
        hint="Teva classification and Kismat Ka Grah â€” the planet of fortune in this chart."
      />
      <View style={s.cardAccent} wrap={false}>
        <Text style={s.h3}>Kismat Ka Grah Â· Planet of Fortune</Text>
        <Text style={[s.h1, { marginBottom: 4 }]}>{kismat}</Text>
        <Text style={s.muted}>
          The strongest planet by dignity in the chart. In Lal Kitab, this planet
          governs the native\u2019s fortune and is the natural focus of remedial practice.
        </Text>
      </View>
      <View style={s.cardSoft} wrap={false}>
        <Text style={s.h3}>Planetary Dignities</Text>
        {PLANET_ORDER.slice(0, 7).map((name) => {
          const p = planets[name] ?? {};
          return (
            <Text key={name} style={s.body}>
              <Text style={{ fontFamily: F.SB }}>{name}: </Text>
              {p.dignity ?? 'neutral'} in {p.rashiName ?? '\u2014'}
            </Text>
          );
        })}
      </View>
      <PageFooter />
    </Page>
  );
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// FESTIVALS (simple placeholder)
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

export function FestivalsPage({
  profile, def,
}: { profile: BirthData; def: SectionDef }) {
  return (
    <Page size="A4" style={s.page}>
      <PageHeader name={profile.profileName} title="FESTIVALS" />
      <SectionOpener
        numeral={def.numeral}
        eyebrow="The Vedic Month"
        title={def.label}
        hint="Festival and vrat dates are computed from tithi + masa at the observer\u2019s location."
      />
      <View style={s.cardSoft} wrap={false}>
        <Text style={s.body}>
          Festival computation requires the observer\u2019s current location.
          The month\u2019s festival map is available in the JSON export; it is
          not embedded here because it depends on location and date.
        </Text>
      </View>
      <PageFooter />
    </Page>
  );
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// DAILY RASHI
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

export interface DailyRashiEntry {
  date: string;
  headline?: string;
  action?: string;
  avoid?: string;
  text: string;
}

export function DailyRashiPage({
  profile, entries, def,
}: { profile: BirthData; entries: DailyRashiEntry[]; def: SectionDef }) {
  return (
    <Page size="A4" style={s.page}>
      <PageHeader name={profile.profileName} title="DAILY RASHI" />
      <SectionOpener
        numeral={def.numeral}
        eyebrow="The Recent Days"
        title={def.label}
        hint="The most recent daily rashi entries â€” headline, action, and avoid."
      />
      {entries.map((e) => (
        <View key={e.date} style={[s.card, s.mb12]} wrap={false}>
          <Text style={s.h3}>{e.date}</Text>
          {e.headline && (
            <Text style={s.bodyLg}>{e.headline}</Text>
          )}
          {e.action && (
            <Text style={s.body}>
              <Text style={{ fontFamily: F.SB, color: C.good }}>Action: </Text>
              {e.action}
            </Text>
          )}
          {e.avoid && (
            <Text style={s.body}>
              <Text style={{ fontFamily: F.SB, color: C.bad }}>Avoid: </Text>
              {e.avoid}
            </Text>
          )}
          {!e.headline && (
            <Text style={s.body}>{e.text}</Text>
          )}
        </View>
      ))}
      <PageFooter />
    </Page>
  );
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// KP CHART â€” Placidus cusps + ruling planets
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

export function KpPage({
  profile, kundli, def,
}: { profile: BirthData; kundli: Record<string, any>; def: SectionDef }) {
  const kp = kundli.kp ?? {};
  const cusps = kp.cusps ?? [];
  const rp = kp.rulingPlanets ?? {};

  return (
    <Page size="A4" style={s.page}>
      <PageHeader name={profile.profileName} title="KP CHART" />
      <SectionOpener
        numeral={def.numeral}
        eyebrow="Krishnamurti Paddhati"
        title={def.label}
        hint="Placidus house cusps with their 4-fold lords â€” Sign, Star, Sub, and Sub-sub."
      />

      {/* Ruling planets strip */}
      {(rp.rulingPlanetsList || rp.lagnaSignLord || rp.moonSignLord) && (
        <View style={[s.cardSoft, s.mb16]} wrap={false}>
          <Text style={s.h3}>Ruling Planets</Text>
          <View style={s.row}>
            {rp.lagnaSignLord && (
              <View style={{ flex: 1 }}>
                <Text style={s.muted}>Lagna Sign Lord</Text>
                <Text style={s.bodyLg}>{rp.lagnaSignLord}</Text>
              </View>
            )}
            {rp.moonSignLord && (
              <View style={{ flex: 1 }}>
                <Text style={s.muted}>Moon Sign Lord</Text>
                <Text style={s.bodyLg}>{rp.moonSignLord}</Text>
              </View>
            )}
            {rp.dayLord && (
              <View style={{ flex: 1 }}>
                <Text style={s.muted}>Day Lord</Text>
                <Text style={s.bodyLg}>{rp.dayLord}</Text>
              </View>
            )}
            {rp.starLord && (
              <View style={{ flex: 1 }}>
                <Text style={s.muted}>Star Lord</Text>
                <Text style={s.bodyLg}>{rp.starLord}</Text>
              </View>
            )}
          </View>
        </View>
      )}

      <Text style={s.h3}>House Cusps</Text>
      <View style={s.table} wrap={false}>
        <View style={s.tr}>
          <Text style={[s.th, { flex: 0.5, textAlign: 'center' }]}>#</Text>
          <Text style={[s.th, { flex: 1.4 }]}>Rashi</Text>
          <Text style={[s.th, { flex: 1.8 }]}>Nakshatra</Text>
          <Text style={[s.th, { flex: 1.5 }]}>Star Lord</Text>
          <Text style={[s.th, { flex: 1.5 }]}>Sub Lord</Text>
          <Text style={[s.th, { flex: 1.5 }]}>Sub-Sub</Text>
        </View>
        {cusps.map((c: any, idx: number) => {
          const isLast = idx === cusps.length - 1;
          return (
            <View key={c.houseNumber} style={[isLast ? s.trLast : s.tr, idx % 2 === 1 ? s.trAlt : {}]}>
              <Text style={[s.tdMono, { flex: 0.5, textAlign: 'center' }]}>{ROMAN[(c.houseNumber ?? 1) - 1]}</Text>
              <Text style={[s.td, { flex: 1.4 }]}>{safeStr(c.rashiName)}</Text>
              <Text style={[s.td, { flex: 1.8, color: C.inkSoft }]}>{safeStr(c.nakshatraName)}</Text>
              <Text style={[s.tdLabel, { flex: 1.5 }]}>{safeStr(c.starLord)}</Text>
              <Text style={[s.tdLabel, { flex: 1.5, color: C.vermilion }]}>{safeStr(c.subLord)}</Text>
              <Text style={[s.td, { flex: 1.5, color: C.inkSoft }]}>{safeStr(c.subSubLord)}</Text>
            </View>
          );
        })}
      </View>

      <Text style={s.muted}>
        The Sub Lord is the ultimate deciding agent in KP astrology.
      </Text>

      <PageFooter />
    </Page>
  );
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// KP ANALYSIS â€” career / marriage / wealth cusp verdicts
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

export function KpAnalysisPage({
  profile, kundli, def,
}: { profile: BirthData; kundli: Record<string, any>; def: SectionDef }) {
  // kpAnalysis lives at kundli.kpAnalysis or kundli.kp.analysis â€” try both.
  const analysis = (kundli as any).kpAnalysis ?? {};
  const career = analysis.careerCusp10 ?? {};
  const marriage = analysis.marriageCusp7 ?? {};
  const wealth = analysis.wealthCusps ?? {};

  return (
    <Page size="A4" style={s.page}>
      <PageHeader name={profile.profileName} title="KP ANALYSIS" />
      <SectionOpener
        numeral={def.numeral}
        eyebrow="Cuspal Sub-Lords"
        title={def.label}
        hint="KP reads the cusp of a house first, then its sub-lord, then its significators."
      />

      <View style={[s.card, s.mb4]} wrap={false}>
        <Text style={s.h3}>10th Cusp Â· Career</Text>
        <View style={[s.row, s.gap20, s.mb8]}>
          <View>
            <Text style={s.muted}>Sub Lord</Text>
            <Text style={s.bodyLg}>{safeStr(career.subLord)}</Text>
          </View>
          <View>
            <Text style={s.muted}>Star Lord</Text>
            <Text style={s.bodyLg}>{safeStr(career.starLord)}</Text>
          </View>
        </View>
        {career.significationVerdict ? (
          <Text style={s.body}>{career.significationVerdict}</Text>
        ) : (
          <Text style={s.muted}>Cusp analysis not available in this chart.</Text>
        )}
      </View>

      <View style={[s.card, s.mb4]} wrap={false}>
        <Text style={s.h3}>7th Cusp Â· Marriage</Text>
        <View style={[s.row, s.gap20, s.mb8]}>
          <View>
            <Text style={s.muted}>Sub Lord</Text>
            <Text style={s.bodyLg}>{safeStr(marriage.subLord)}</Text>
          </View>
          <View>
            <Text style={s.muted}>Star Lord</Text>
            <Text style={s.bodyLg}>{safeStr(marriage.starLord)}</Text>
          </View>
        </View>
        {marriage.marriagePromise && (
          <Text style={s.body}>{marriage.marriagePromise}</Text>
        )}
        {marriage.typeIndication && (
          <Text style={s.muted}>{marriage.typeIndication}</Text>
        )}
      </View>

      <View style={[s.card, s.mb4]} wrap={false}>
        <Text style={s.h3}>2nd & 11th Cusps Â· Wealth</Text>
        <View style={[s.row, s.gap20, s.mb8]}>
          <View>
            <Text style={s.muted}>2nd Sub Lord</Text>
            <Text style={s.bodyLg}>{safeStr(wealth.cusp2SubLord)}</Text>
          </View>
          <View>
            <Text style={s.muted}>11th Sub Lord</Text>
            <Text style={s.bodyLg}>{safeStr(wealth.cusp11SubLord)}</Text>
          </View>
        </View>
        {wealth.financialSignification && (
          <Text style={s.body}>{wealth.financialSignification}</Text>
        )}
      </View>

      <PageFooter />
    </Page>
  );
}