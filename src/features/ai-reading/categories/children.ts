import type { ReadingCategory } from './_types';
import { BLESSING } from './_shared';

export const children: ReadingCategory = {
  id: 'children',
  title: 'Children & Progeny',
  icon: 'Baby',
  image: '/readings/children.jpg',
  requiresTransits: false,
  voice:
    'Write as a family elder. Warm, protective, generous. Speak of lineage, of what is passed down, of what is hoped for. Do not be clinical about progeny — be human about it. The reader is here because this matters to them personally, and the tone should honour that.',
  sanskrit: 'सन्तान एवं वंश',
  tagline: 'The fifth house and the promise of lineage',
  description:
    'The 5th house, Jupiter as Putrakaraka, and the Saptamsa (D7) — the chart of children and creative legacy.',
  accent: 'sky',
  estimatedWords: 1600,
  estimatedMinutes: 8,
  defaults: { tone: 'traditional', language: 'English', length: 2500 },
  sections: [
    {
      title: 'The Chart Signature',
      guide:
        'Lagna, Chandra, Surya in one line. Then the 5th house — rashi, lord, occupants. Say what this house promises, plainly.',
    },
    {
      title: 'The 5th House',
      guide:
        'The 5th lord and every planet in the 5th. The 5th is the house of children and creative lineage. Read them as the same thing, because they are.',
    },
    {
      title: 'Jupiter — The Putrakaraka',
      guide:
        'Jupiter by house, dignity, aspects, and the Putrakaraka in Jaimini. These two signatures together tell the story of progeny.',
    },
    {
      title: 'The Saptamsa (D7)',
      guide:
        'The D7 read against the D1. What does the finer chart add? Name the specific qualities of the promised children.',
    },
    {
      title: 'Timing of Children',
      guide:
        'Cite the dashas by planet and date. Give the reader the strongest windows. If the chart advises patience, say so with warmth.',
    },
    {
      title: 'Vedic Remedies for Progeny',
      guide:
        'Specific remedies for the 5th lord and Jupiter. Item, day, count, direction. Include a practice both partners can share.',
    },
    BLESSING,
  ],
};