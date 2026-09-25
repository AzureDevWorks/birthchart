import { asset } from '@/lib/assets';

/**
 * Rashi images - English rashi name  static asset URL.
 *
 * Files live in public/Rashis/ with Sanskrit transliterated filenames.
 * Vite serves public/ at the web root, so the URL is /Rashis/<name>.jpeg
 */

export const RASHI_IMAGES: Record<string, string> = {
  Aries:       asset('Rashis/mesha.jpeg'),
  Taurus:      asset('Rashis/vrishabha.jpeg'),
  Gemini:      asset('Rashis/mithuna.jpeg'),
  Cancer:      asset('Rashis/karka.jpeg'),
  Leo:         asset('Rashis/simha.jpeg'),
  Virgo:       asset('Rashis/kanya.jpeg'),
  Libra:       asset('Rashis/tula.jpeg'),
  Scorpio:     asset('Rashis/vrishchika.jpeg'),
  Sagittarius: asset('Rashis/dhanu.jpeg'),
  Capricorn:   asset('Rashis/makara.jpeg'),
  Aquarius:    asset('Rashis/kumbha.jpeg'),
  Pisces:      asset('Rashis/meena.jpeg'),
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