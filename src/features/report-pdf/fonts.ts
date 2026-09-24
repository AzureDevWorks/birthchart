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
      { src: '/fonts/NotoSerifDevanagari-Regular.ttf', fontWeight: 'normal' },
      { src: '/fonts/NotoSerifDevanagari-Bold.ttf',    fontWeight: 'bold'   },
    ],
  });

  Font.register({
    family: 'NotoSansDevanagari',
    fonts: [
      { src: '/fonts/NotoSansDevanagari-Regular.ttf', fontWeight: 'normal' },
      { src: '/fonts/NotoSansDevanagari-Bold.ttf',    fontWeight: 'bold'   },
    ],
  });

  Font.register({
    family: 'TiroDevanagari',
    fonts: [
      { src: '/fonts/TiroDevanagariSanskrit-Regular.ttf', fontWeight: 'normal' },
      { src: '/fonts/TiroDevanagariSanskrit-Italic.ttf',  fontWeight: 'normal', fontStyle: 'italic' },
    ],
  });

  Font.register({
    family: 'Inter',
    fonts: [
      { src: '/fonts/Inter-Regular.ttf', fontWeight: 'normal' },
      { src: '/fonts/Inter-Bold.ttf',    fontWeight: 'bold'   },
    ],
  });

  // Prevent react-pdf from breaking Devanagari conjuncts
  Font.registerHyphenationCallback((word) => [word]);
}