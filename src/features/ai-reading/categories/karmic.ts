import type { ReadingCategory } from './_types';
import { BLESSING } from './_shared';

export const karmic: ReadingCategory = {
  id: 'karmic',
  title: 'Karmic Reading',
  icon: 'Orbit',
  image: '/readings/karmic.jpg',
  requiresTransits: true,
  voice:
    'Write as a scholar of the deep. This is the reading of past lives and the wheel. Speak of debts carried across time, of patterns recognized at last, of release. The tone is solemn — not frightening, but grave. The reader is here because they suspect something older is at work in their life. Confirm it, and show them what to do.',
  sanskrit: 'कर्म पठन',
  tagline: 'The nodal axis, past-life patterns, and liberation',
  description:
    'Rahu and Ketu, the 8th and 12th houses, and the Atmakaraka — what you carry from before, and what you are here to release.',
  accent: 'slate',
  estimatedWords: 2000,
  estimatedMinutes: 10,
  defaults: { tone: 'devotional', language: 'English', length: 2500 },
  sections: [
    {
      title: 'The Chart Signature',
      guide:
        'Lagna, Chandra, Surya in one line. Then the karmic axis of the chart — Rahu, Ketu, Saturn, the 8th, and the 12th — as a single arrow pointing somewhere.',
    },
    {
      title: 'The Nodal Axis — Rahu and Ketu',
      guide:
        'Rahu and Ketu by house, rashi, nakshatra. Rahu is what is being drawn toward; Ketu is what is being released. Name both, in those terms.',
    },
    {
      title: 'The 8th House — Transformation',
      guide:
        'The 8th lord and planets in the 8th. Say what the soul must transform in this life, and how the chart supports the transformation.',
    },
    {
      title: 'The 12th House — Release',
      guide:
        'The 12th lord and planets in the 12th. Say what must be let go of, even if it is beloved.',
    },
    {
      title: 'The Atmakaraka',
      guide:
        'The Atmakaraka by planet, sign, house. The soul planet. What did it come here to learn, and what does it demand from this life?',
    },
    {
      title: 'Past-Life Signature',
      guide:
        'Synthesize Rahu, Ketu, Saturn, and the D9 into one interpretation of the karmic pattern. Say it as a story, not as a list.',
    },
    {
      title: 'Vedic Remedies for Karma',
      guide:
        'Remedies for Rahu, Ketu, and the Atmakaraka. Mantras, daan, daily practices. Prescribe lightly — the karma will do its own work.',
    },
    BLESSING,
  ],
};