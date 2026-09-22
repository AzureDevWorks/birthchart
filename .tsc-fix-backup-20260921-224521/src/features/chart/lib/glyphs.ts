import type { PlanetKey } from '../primitives/GlyphBadge';

// ─── English abbreviations ─────────────────────────────────
export const PLANET_GLYPHS_EN: Record<string, string> = {
  Sun: 'Su', Moon: 'Mo', Mars: 'Ma', Mercury: 'Me',
  Jupiter: 'Ju', Venus: 'Ve', Saturn: 'Sa',
  Rahu: 'Ra', Ketu: 'Ke', Ascendant: 'Asc',
};

// ─── Devanagari abbreviations (traditional) ────────────────
export const PLANET_GLYPHS_DEVANAGARI: Record<string, string> = {
  Sun: 'सू',
  Moon: 'चं',
  Mars: 'मं',
  Mercury: 'बु',
  Jupiter: 'बृं',
  Venus: 'शु',
  Saturn: 'श',
  Rahu: 'रा',
  Ketu: 'के',
  Ascendant: 'ल',
};

// Keep the default (English) for backward compatibility
export const PLANET_GLYPHS = PLANET_GLYPHS_EN;

/**
 * Get the correct abbreviation for a planet in a given language.
 */
export function getPlanetAbbr(planet: string, lang: 'en' | 'hi' | 'ne'): string {
  if (lang === 'hi' || lang === 'ne') {
    return PLANET_GLYPHS_DEVANAGARI[planet] ?? PLANET_GLYPHS_EN[planet] ?? planet.slice(0, 2);
  }
  return PLANET_GLYPHS_EN[planet] ?? planet.slice(0, 2);
}

// ─── Rashi glyphs (unchanged) ──────────────────────────────
export const RASHI_GLYPHS: Record<string, string> = {
  Aries: '♈', Taurus: '♉', Gemini: '♊', Cancer: '♋',
  Leo: '♌', Virgo: '♍', Libra: '♎', Scorpio: '♏',
  Sagittarius: '♐', Capricorn: '♑', Aquarius: '♒', Pisces: '♓',
};

// ─── Rashi lords (unchanged) ───────────────────────────────
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

export const PLANET_TO_KEY: Record<string, PlanetKey> = {
  Sun: 'Sun', Moon: 'Moon', Mars: 'Mars', Mercury: 'Mercury',
  Jupiter: 'Jupiter', Venus: 'Venus', Saturn: 'Saturn',
  Rahu: 'Rahu', Ketu: 'Ketu', Ascendant: 'Ascendant',
};
