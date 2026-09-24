import type { ReadingCategory } from './_types';
import { BLESSING } from './_shared';

export const health: ReadingCategory = {
  id: 'health',
  title: 'Health & Vitality',
  icon: 'Activity',
  image: '/readings/health.jpg',
  requiresTransits: true,
  voice:
    'Write as a physician who reads charts. Sober, calm, attentive to the body. Do not alarm, do not dismiss. Point at patterns the body has carried for years and describe how they can be softened. This reading should feel like a careful conversation with a doctor who has all the time in the world.',
  sanskrit: 'स्वास्थ्य एवं ओज',
  tagline: 'Body, longevity, and the sixth house',
  description:
    'The Lagna strength, the 6th house of disease, the 8th house of longevity, and the Ashtakavarga of the vital houses.',
  accent: 'teal',
  estimatedWords: 1600,
  estimatedMinutes: 8,
  defaults: { tone: 'practical', language: 'English', length: 2500 },
  sections: [
    {
      title: 'The Chart Signature',
      guide:
        'Lagna, Chandra, Surya in one line. Then the body type the Lagna describes — its natural strengths, its natural weaknesses.',
    },
    {
      title: 'The Lagna and its Strength',
      guide:
        'The Lagna and every planet in the 1st. Aspects on the Lagna. Say what the body carries easily and what it has to work for.',
    },
    {
      title: 'The 6th House — Sources of Imbalance',
      guide:
        'The 6th lord and every planet in the 6th. Name the specific kinds of imbalance this chart is prone to — not the disease, but the pattern that precedes it.',
    },
    {
      title: 'The 8th House — Longevity',
      guide:
        'The 8th lord and planets in the 8th. The 8th is the house of longevity, not of death. Say what supports a long life and what strains it.',
    },
    {
      title: 'Vital Houses in Ashtakavarga',
      guide:
        'SAV bindus for houses 1, 6, 8. Compare. Name which of the three gives the body its ground and which asks for care.',
    },
    {
      title: 'Vedic Remedies for Health',
      guide:
        'Specific remedies for the weak houses. Item, day, count, direction. Favour remedies the reader can do at home, without buying anything.',
    },
    BLESSING,
  ],
};