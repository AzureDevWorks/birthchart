import { asset } from '@/lib/assets';
import { Font } from '@react-pdf/renderer';

let registered = false;

/**
 * Registers the same self-hosted TTFs used by the web app.
 * Call this once, before rendering any PDF.
 */
export function registerPdfFonts() {
  if (registered) return;
  registered = true;

  Font.register({
    family: 'NotoSerifDevanagari',
    fonts: [
      { src: asset('fonts/NotoSerifDevanagari-Regular.ttf'), fontWeight: 'normal' },
      { src: asset('fonts/NotoSerifDevanagari-Bold.ttf'),    fontWeight: 'bold'   },
    ],
  });

  Font.register({
    family: 'NotoSansDevanagari',
    fonts: [
      { src: asset('fonts/NotoSansDevanagari-Regular.ttf'), fontWeight: 'normal' },
      { src: asset('fonts/NotoSansDevanagari-Bold.ttf'),    fontWeight: 'bold'   },
    ],
  });

  Font.register({
    family: 'TiroDevanagari',
    fonts: [
      { src: asset('fonts/TiroDevanagariSanskrit-Regular.ttf'), fontWeight: 'normal' },
      { src: asset('fonts/TiroDevanagariSanskrit-Italic.ttf'),  fontWeight: 'normal', fontStyle: 'italic' },
    ],
  });

  Font.register({
    family: 'Inter',
    fonts: [
      { src: asset('fonts/Inter-Regular.ttf'), fontWeight: 'normal' },
      { src: asset('fonts/Inter-Bold.ttf'),    fontWeight: 'bold'   },
    ],
  });

  // Prevent react-pdf from breaking Devanagari conjuncts
  Font.registerHyphenationCallback((word) => [word]);
}