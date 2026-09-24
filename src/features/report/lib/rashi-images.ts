/**
 * Rashi images - English rashi name  static asset URL.
 *
 * Files live in public/Rashis/ with Sanskrit transliterated filenames.
 * Vite serves public/ at the web root, so the URL is /Rashis/<name>.jpeg
 */

export const RASHI_IMAGES: Record<string, string> = {
  Aries:       '/Rashis/mesha.jpeg',
  Taurus:      '/Rashis/vrishabha.jpeg',
  Gemini:      '/Rashis/mithuna.jpeg',
  Cancer:      '/Rashis/karka.jpeg',
  Leo:         '/Rashis/simha.jpeg',
  Virgo:       '/Rashis/kanya.jpeg',
  Libra:       '/Rashis/tula.jpeg',
  Scorpio:     '/Rashis/vrishchika.jpeg',
  Sagittarius: '/Rashis/dhanu.jpeg',
  Capricorn:   '/Rashis/makara.jpeg',
  Aquarius:    '/Rashis/kumbha.jpeg',
  Pisces:      '/Rashis/meena.jpeg',
};

/** Returns the URL for a rashi, or null if unknown. */
export function rashiImageUrl(rashiName: string | undefined | null): string | null {
  if (!rashiName) return null;
  return RASHI_IMAGES[rashiName] ?? null;
}

/** True if we have an image for this rashi. */
export function hasRashiImage(rashiName: string | undefined | null): boolean {
  return Boolean(rashiImageUrl(rashiName));
}