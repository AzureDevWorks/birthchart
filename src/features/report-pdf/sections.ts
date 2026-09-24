export type SectionId =
  | 'cover' | 'toc' | 'anchors' | 'd1' | 'planetary' | 'houses'
  | 'fourCharts' | 'dasha' | 'ashtakavarga' | 'aspects'
  | 'specialLagnas' | 'specialCharts' | 'vargas' | 'chalit'
  | 'panchang' | 'gochar' | 'predictions' | 'jaimini'
  | 'remedies' | 'lalKitab' | 'festivals' | 'dailyRashi' | 'kp' | 'kpAnalysis'
  | 'nakshatra' | 'readings';

export type SectionGroup =
  | 'Opening' | 'The Chart' | 'Refinements' | 'Timing'
  | 'Strength' | 'Interaction' | 'Predictions' | 'Personal';

export interface SectionDef {
  id: SectionId;
  group: SectionGroup;
  label: string;
  numeral: string;
  tocLabel: string;
}

export const SECTION_GROUPS: SectionGroup[] = [
  'Opening', 'The Chart', 'Refinements', 'Timing',
  'Strength', 'Interaction', 'Predictions', 'Personal',
];

export const SECTIONS: SectionDef[] = [
  { id: 'cover', group: 'Opening', numeral: '', label: 'Cover', tocLabel: 'Cover' },
  { id: 'toc', group: 'Opening', numeral: '', label: 'Contents', tocLabel: 'Contents' },
  { id: 'anchors', group: 'Opening', numeral: 'I', label: 'The Three Anchors', tocLabel: 'The Three Anchors' },
  { id: 'd1', group: 'The Chart', numeral: 'II', label: 'Rashi Chart (D1)', tocLabel: 'Rashi Chart' },
  { id: 'planetary', group: 'The Chart', numeral: 'III', label: 'Planetary Positions', tocLabel: 'Planetary Positions' },
  { id: 'houses', group: 'The Chart', numeral: 'IV', label: 'The Twelve Bhavas', tocLabel: 'The Twelve Bhavas' },
  { id: 'fourCharts', group: 'The Chart', numeral: 'V', label: 'The Four Charts', tocLabel: 'The Four Charts' },
  { id: 'vargas', group: 'The Chart', numeral: 'VI', label: 'Divisional Charts', tocLabel: 'Divisional Charts' },
  { id: 'specialCharts', group: 'The Chart', numeral: 'VII', label: 'Special Charts', tocLabel: 'Special Charts' },
  { id: 'chalit', group: 'Refinements', numeral: 'VIII', label: 'Bhava Chalit', tocLabel: 'Bhava Chalit' },
  { id: 'dasha', group: 'Timing', numeral: 'IX', label: 'Vimshottari Dasha', tocLabel: 'Vimshottari Dasha' },
  { id: 'panchang', group: 'Timing', numeral: 'X', label: 'Panchang', tocLabel: 'Panchang' },
  { id: 'gochar', group: 'Timing', numeral: 'XI', label: 'Current Transits', tocLabel: 'Current Transits' },
  { id: 'festivals', group: 'Timing', numeral: 'XII', label: 'Festivals', tocLabel: 'Festivals' },
  { id: 'ashtakavarga', group: 'Strength', numeral: 'XIII', label: 'Ashtakavarga', tocLabel: 'Ashtakavarga' },
  { id: 'aspects', group: 'Interaction', numeral: 'XIV', label: 'Planetary Aspects', tocLabel: 'Planetary Aspects' },
  { id: 'specialLagnas', group: 'Interaction', numeral: 'XV', label: 'Special Lagnas', tocLabel: 'Special Lagnas' },
  { id: 'jaimini', group: 'Predictions', numeral: 'XVI', label: 'Jaimini Karakas', tocLabel: 'Jaimini Karakas' },
  { id: 'predictions', group: 'Predictions', numeral: 'XVII', label: 'Life Predictions', tocLabel: 'Life Predictions' },
  { id: 'remedies', group: 'Predictions', numeral: 'XVIII', label: 'Remedies', tocLabel: 'Remedies' },
  { id: 'lalKitab', group: 'Predictions', numeral: 'XIX', label: 'Lal Kitab', tocLabel: 'Lal Kitab' },
  { id: 'nakshatra', group: 'Predictions', numeral: 'XX', label: 'Nakshatra', tocLabel: 'Nakshatra' },
  { id: 'kp', group: 'Interaction', numeral: 'XVbis', label: 'KP Chart', tocLabel: 'KP Chart' },
  { id: 'kpAnalysis', group: 'Predictions', numeral: 'XVIIbis', label: 'KP Analysis', tocLabel: 'KP Analysis' },
  { id: 'dailyRashi', group: 'Personal', numeral: 'XXI', label: 'Daily Rashi', tocLabel: 'Daily Rashi' },
  { id: 'readings', group: 'Personal', numeral: 'XXII', label: 'AI Readings', tocLabel: 'AI Readings' },
];