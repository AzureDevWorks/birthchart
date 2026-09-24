import type { ReadingCategory } from './_types';
import { BLESSING } from './_shared';

export const marriage: ReadingCategory = {
  id: 'marriage',
  title: 'Marriage & Relationships',
  icon: 'Heart',
  image: '/readings/marriage.jpg',
  requiresTransits: true,
  voice:
    'Write with tenderness. This is intimate ground. Speak of the heart, of long evenings, of what it means to share a life with another person. Do not reduce the union to mechanics — feel the emotional truth inside the chart. Some sentences should be quiet enough to be read aloud.',
  sanskrit: 'विवाह एवं सम्बन्ध',
  tagline: 'Partnership, love, and the seventh house',
  description:
    'The 7th house, Venus and Jupiter, the Darakaraka, and the Navamsha. What marriage promises, and when it comes.',
  accent: 'rose',
  estimatedWords: 1800,
  estimatedMinutes: 9,
  defaults: { tone: 'traditional', language: 'English', length: 2500 },
  sections: [
    {
      title: 'The Chart Signature',
      guide:
        'Lagna, Chandra, Surya in one line. Then the 7th house — rashi, lord, occupants. What does this house say the reader is looking for?',
    },
    {
      title: 'The 7th Lord — Where Partnership Lives',
      guide:
        'The 7th lord by house, rashi, nakshatra. The house it sits in is the field where the marriage will actually be lived.',
    },
    {
      title: 'Venus and Jupiter',
      guide:
        'Venus — the body of love. Jupiter — the soul of partnership. Their dignity, aspects, and the houses they watch over. Read them together, not apart.',
    },
    {
      title: 'The Darakaraka',
      guide:
        'The Darakaraka by planet, sign, house. This is the Jaimini portrait of the spouse. Describe them as a person, not as a chart element.',
    },
    {
      title: 'The Navamsha (D9)',
      guide:
        'Read the D9 against the D1. Does the marriage deepen or strain the surface reading? Name what it says about the inner truth of partnership.',
    },
    {
      title: 'Timing of Marriage',
      guide:
        'Cite the dashas by planet and date. Give the reader the strongest window for union, and name what the union will feel like at its beginning.',
    },
    {
      title: 'Vedic Remedies for Marriage',
      guide:
        'Specific remedies for the 7th lord and Venus. Item, day, count, direction. Keep the tone appropriate — this is not a prescription, it is a kindness.',
    },
    BLESSING,
  ],
};