import type { ReadingCategory } from './_types';
import { BLESSING } from './_shared';

export const spiritual: ReadingCategory = {
  id: 'spiritual',
  title: 'Spiritual Path',
  icon: 'Flame',
  image: '/readings/spiritual.jpg',
  requiresTransits: false,
  voice:
    'Write as a contemplative. Slow, devotional, with long breaths between sentences. Do not hurry. Allow silence to live between paragraphs. This is the reading to be read on the morning of a fast day, or the evening before a pilgrimage. Every paragraph should be able to be read as a prayer.',
  sanskrit: 'आध्यात्मिक मार्ग',
  tagline: 'Dharma, moksha, and the Atmakaraka',
  description:
    'The 9th and 12th houses, Jupiter and Ketu, and the Atmakaraka — the soul planet that reveals your inner direction.',
  accent: 'violet',
  estimatedWords: 1800,
  estimatedMinutes: 9,
  defaults: { tone: 'devotional', language: 'English', length: 2500 },
  sections: [
    {
      title: 'The Chart Signature',
      guide:
        'Lagna, Chandra, Surya in one line. Then name the spiritual axis of the chart — the 9th, 12th, Ketu, Jupiter, and the Atmakaraka — as a single direction.',
    },
    {
      title: 'The 9th House — Dharma',
      guide:
        'The 9th lord and planets in the 9th. What form of dharma is this soul built to walk? Name the teacher, the tradition, the field of study.',
    },
    {
      title: 'The 12th House — Moksha',
      guide:
        'The 12th lord and planets in the 12th. The 12th is the house of release. Say what the soul is being asked to let go of.',
    },
    {
      title: 'Jupiter and Ketu',
      guide:
        'Jupiter as guru, Ketu as liberator. Read them together. Where Jupiter expands, Ketu dissolves — and both are leading to the same place.',
    },
    {
      title: 'The Atmakaraka',
      guide:
        'The Atmakaraka by planet, sign, house. This is the soul planet. Say what it demands, and what it promises in return for obedience.',
    },
    {
      title: 'The Navamsha (D9)',
      guide:
        'Read the D9 as the inner chart of the soul. What does it say that the D1 does not?',
    },
    {
      title: 'Vedic Remedies for Inner Growth',
      guide:
        'Mantras and practices aligned with the Atmakaraka. Give one mantra with a japa count, and one daily practice. Keep it small enough to actually do.',
    },
    BLESSING,
  ],
};