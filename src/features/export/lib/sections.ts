import type { UserLocation } from '@/lib/user-location';

export type SectionId =
  | 'kundli'
  | 'specialLagnas'
  | 'specialCharts'
  | 'referenceCharts'
  | 'vargas'
  | 'arudhaPadas'
  | 'drishti'
  | 'ashtakavarga'
  | 'chalit'
  | 'kp'
  | 'panchangBirth'
  | 'panchangNow'
  | 'gochar'
  | 'festivals'
  | 'career'
  | 'wealth'
  | 'marriage'
  | 'jaimini'
  | 'chalitAnalysis'
  | 'kpAnalysis'
  | 'lalKitab'
  | 'remedies'
  | 'comprehensive'
  | 'dailyRashi'
  | 'readings';

export type SectionGroup =
  | 'Chart'
  | 'Refinements'
  | 'Time'
  | 'Predictions'
  | 'Personal';

/**
 * pdf: 'page'      -> becomes its own page(s) in the PDF report
 * pdf: 'feeds'     -> contributes to another page (tick the parent too)
 * pdf: 'json-only' -> no PDF representation; JSON export only
 */
export type PdfMode = 'page' | 'feeds' | 'json-only';

export interface SectionDef {
  id: SectionId;
  group: SectionGroup;
  label: string;
  description: string;
  size: 'small' | 'medium' | 'large' | 'huge';
  pdf: PdfMode;
  /** Optional: which section this feeds, if pdf='feeds'. */
  feedsInto?: string;
  requires?: 'location' | 'readings' | 'dailyRashi' | 'active-profile';
}

export const SECTION_GROUPS: SectionGroup[] = [
  'Chart',
  'Refinements',
  'Time',
  'Predictions',
  'Personal',
];

export const SECTIONS: SectionDef[] = [
  // ── Chart ────────────────────────────────────────────────
  { id: 'kundli', group: 'Chart', label: 'Janam Kundli (D1)', description: 'Ascendant, planets, dignities, 12 houses, Vimshottari Dasha, Graha Drishti. Produces the core report pages.', size: 'large', pdf: 'page' },
  { id: 'specialLagnas', group: 'Chart', label: 'Special Lagnas', description: 'Ghatika, Hora, Bhava, Shree, Indu, Pranapada. One page.', size: 'small', pdf: 'page' },
  { id: 'specialCharts', group: 'Chart', label: 'Special Charts', description: 'Full charts with GL / HL / BL / IL each as House 1. One 2×2 grid page.', size: 'medium', pdf: 'page' },
  { id: 'referenceCharts', group: 'Chart', label: 'Chandra & Surya Kundli', description: 'Moon-centred and Sun-centred charts. Included in the Four Charts page.', size: 'medium', pdf: 'feeds', feedsInto: 'kundli' },
  { id: 'vargas', group: 'Chart', label: 'Divisional Charts (D2-D60)', description: 'Showcase of D9, D10, D16, D24, D30, D60 with brief purpose notes.', size: 'huge', pdf: 'page' },

  // ── Refinements ──────────────────────────────────────────
  { id: 'arudhaPadas', group: 'Refinements', label: 'Arudha Padas (A1-A12)', description: 'Jaimini padas. Primary 4 shown on the Special Lagnas page.', size: 'small', pdf: 'feeds', feedsInto: 'specialLagnas' },
  { id: 'drishti', group: 'Refinements', label: 'Graha Drishti (Aspects)', description: 'Parashari aspects matrix + mutual aspects. One page.', size: 'small', pdf: 'page' },
  { id: 'ashtakavarga', group: 'Refinements', label: 'Ashtakavarga (BAV + SAV)', description: 'Per-house bindu grid, colour-coded. One page.', size: 'medium', pdf: 'page' },
  { id: 'chalit', group: 'Refinements', label: 'Bhava Chalit', description: 'Sripati house chart + planetary shift table. One page.', size: 'small', pdf: 'page' },
  { id: 'kp', group: 'Refinements', label: 'KP Chart', description: 'Placidus cusps, four-fold rulers, ruling planets. One page.', size: 'medium', pdf: 'page' },

  // ── Time ─────────────────────────────────────────────────
  { id: 'panchangBirth', group: 'Time', label: 'Panchang at birth', description: 'Tithi, nakshatra, yoga, karana, vara at birth. Combined onto the Panchang page.', size: 'small', pdf: 'page' },
  { id: 'panchangNow', group: 'Time', label: 'Panchang now', description: "Today's panchang at current location. Combined onto the Panchang page.", size: 'small', pdf: 'feeds', feedsInto: 'panchangBirth', requires: 'location' },
  { id: 'gochar', group: 'Time', label: 'Gochar (live transits)', description: 'Current transits, Sade Sati, Dhaiya, life-area impact. One page.', size: 'medium', pdf: 'page' },
  { id: 'festivals', group: 'Time', label: 'Festivals (this month)', description: "Tithi-based festival map for the current month. One page.", size: 'medium', pdf: 'page', requires: 'location' },

  // ── Predictions ──────────────────────────────────────────
  { id: 'career', group: 'Predictions', label: 'Career prediction', description: 'Job vs business, 10th lord, AmK, KP insight. Part of the Predictions page.', size: 'small', pdf: 'page' },
  { id: 'wealth', group: 'Predictions', label: 'Wealth prediction', description: 'Dhana yogas, Vipreet Raja yogas, 2nd/11th lord. Part of the Predictions page.', size: 'small', pdf: 'feeds', feedsInto: 'career' },
  { id: 'marriage', group: 'Predictions', label: 'Marriage prediction', description: 'Marriage type, DK, 7th lord, age gap. Part of the Predictions page.', size: 'small', pdf: 'feeds', feedsInto: 'career' },
  { id: 'jaimini', group: 'Predictions', label: 'Jaimini Chara Karakas', description: 'AK, AmK, BK, MK, PK, GK, DK — the seven soul-significators. One page.', size: 'small', pdf: 'page' },
  { id: 'chalitAnalysis', group: 'Predictions', label: 'Chalit analysis', description: 'Interpretive Chalit summary. Contributes to the Chalit page.', size: 'small', pdf: 'feeds', feedsInto: 'chalit' },
  { id: 'kpAnalysis', group: 'Predictions', label: 'KP analysis', description: 'Cusp sub-lord verdicts for career, marriage, wealth. One page.', size: 'small', pdf: 'page' },
  { id: 'lalKitab', group: 'Predictions', label: 'Lal Kitab', description: 'Teva classification, Kismat Ka Grah, karmic debts, totke. One page.', size: 'small', pdf: 'page' },
  { id: 'remedies', group: 'Predictions', label: 'Remedies', description: 'Practical remedies, mantras, lifestyle habits. One page.', size: 'small', pdf: 'page' },
  { id: 'comprehensive', group: 'Predictions', label: 'Comprehensive report', description: 'JSON only — its contents overlap the career, wealth, marriage, and remedies pages.', size: 'large', pdf: 'json-only' },

  // ── Personal ─────────────────────────────────────────────
  { id: 'dailyRashi', group: 'Personal', label: 'Daily Rashi records', description: 'Saved daily rashi entries. Latest 7 shown on one page.', size: 'small', pdf: 'page', requires: 'dailyRashi' },
  { id: 'readings', group: 'Personal', label: 'Reading library', description: 'All AI readings for this profile. One page per reading.', size: 'huge', pdf: 'page', requires: 'readings' },
];

export const PRESETS: Record<string, SectionId[]> = {
  Basic: ['kundli', 'ashtakavarga', 'career'],
  Standard: ['kundli', 'specialLagnas', 'vargas', 'drishti', 'ashtakavarga', 'chalit', 'panchangBirth', 'gochar', 'career', 'jaimini', 'remedies'],
  Everything: SECTIONS.filter((s) => s.pdf !== 'json-only').map((s) => s.id),
};

const SIZE_BYTES: Record<SectionDef['size'], number> = {
  small: 2000, medium: 20000, large: 150000, huge: 500000,
};

export function estimateBytes(selected: Set<SectionId>): number {
  let total = 0;
  for (const def of SECTIONS) {
    if (selected.has(def.id)) total += SIZE_BYTES[def.size];
  }
  return total;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1024 / 1024).toFixed(2) + ' MB';
}

export type Ayanamsa = 'lahiri' | 'kp' | 'raman';
export type HouseSystem = 'whole_sign' | 'equal_house' | 'sripati' | 'placidus';

export interface ExportOptions {
  ayanamsa: Ayanamsa;
  houseSystem: HouseSystem;
}

export const DEFAULT_EXPORT_OPTIONS: ExportOptions = {
  ayanamsa: 'lahiri',
  houseSystem: 'whole_sign',
};

export const AYANAMSA_OPTIONS = [
  { value: 'lahiri' as const, label: 'Lahiri', hint: 'Chitrapaksha — the standard Vedic ayanamsa' },
  { value: 'kp' as const, label: 'KP', hint: 'Krishnamurti Paddhati ayanamsa' },
  { value: 'raman' as const, label: 'Raman', hint: 'B.V. Raman ayanamsa' },
];

export const HOUSE_SYSTEM_OPTIONS = [
  { value: 'whole_sign' as const, label: 'Whole Sign', hint: 'Classical Vedic — each rashi is one bhava' },
  { value: 'equal_house' as const, label: 'Equal House', hint: '30 degrees from the exact Lagna degree' },
  { value: 'sripati' as const, label: 'Sripati', hint: 'Porphyry-style — the classical Chalit system' },
  { value: 'placidus' as const, label: 'Placidus', hint: 'Semi-arc division — used in KP astrology' },
];

export interface Availability {
  hasProfile: boolean;
  location: UserLocation | null;
  matchesSavedProfile: boolean;
  hasReadings: boolean;
  hasDailyRashi: boolean;
}

export function isSectionAvailable(
  def: SectionDef,
  avail: Availability
): { ok: boolean; reason?: string } {
  if (!avail.hasProfile) return { ok: false, reason: 'Enter birth data' };
  if (def.requires === 'location' && !avail.location) {
    return { ok: false, reason: 'Requires a current location' };
  }
  if (def.requires === 'readings') {
    if (!avail.matchesSavedProfile) return { ok: false, reason: 'Only for a saved profile' };
    if (!avail.hasReadings) return { ok: false, reason: 'No readings saved yet' };
  }
  if (def.requires === 'dailyRashi') {
    if (!avail.matchesSavedProfile) return { ok: false, reason: 'Only for a saved profile' };
    if (!avail.hasDailyRashi) return { ok: false, reason: 'No daily rashi records yet' };
  }
  return { ok: true };
}