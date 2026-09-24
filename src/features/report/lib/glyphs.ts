import type { PlanetKey } from '../primitives/GlyphBadge';

export const PLANET_GLYPHS: Record<string, string> = {
  Sun:       '\u2609',  // ?
  Moon:      '\u263D',  // ?
  Mars:      '\u2642',  // 
  Mercury:   '\u263F',  // ?
  Jupiter:   '\u2643',  // ?
  Venus:     '\u2640',  // 
  Saturn:    '\u2644',  // ?
  Rahu:      '\u260A',  // ?
  Ketu:      '\u260B',  // ?
  Ascendant: '\u0932',  // ?
};

export const RASHI_GLYPHS: Record<string, string> = {
  Aries:       '\u2648',
  Taurus:      '\u2649',
  Gemini:      '\u264A',
  Cancer:      '\u264B',
  Leo:         '\u264C',
  Virgo:       '\u264D',
  Libra:       '\u264E',
  Scorpio:     '\u264F',
  Sagittarius: '\u2650',
  Capricorn:   '\u2651',
  Aquarius:    '\u2652',
  Pisces:      '\u2653',
};

export const PLANET_TO_KEY: Record<string, PlanetKey> = {
  Sun: 'Sun', Moon: 'Moon', Mars: 'Mars', Mercury: 'Mercury',
  Jupiter: 'Jupiter', Venus: 'Venus', Saturn: 'Saturn',
  Rahu: 'Rahu', Ketu: 'Ketu', Ascendant: 'Ascendant',
};

export const RASHI_LORDS: Record<string, string> = {
  Aries: 'Mars', Taurus: 'Venus', Gemini: 'Mercury', Cancer: 'Moon',
  Leo: 'Sun', Virgo: 'Mercury', Libra: 'Venus', Scorpio: 'Mars',
  Sagittarius: 'Jupiter', Capricorn: 'Saturn', Aquarius: 'Saturn', Pisces: 'Jupiter',
};

export const HOUSE_NAMES_EN: Record<number, string> = {
  1: 'Self', 2: 'Wealth', 3: 'Siblings', 4: 'Home',
  5: 'Children', 6: 'Enemies', 7: 'Marriage', 8: 'Death',
  9: 'Fortune', 10: 'Career', 11: 'Gains', 12: 'Loss',
};