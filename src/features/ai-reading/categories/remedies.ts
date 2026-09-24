import type { ReadingCategory } from './_types';
import { BLESSING } from './_shared';

export const remedies: ReadingCategory = {
  id: 'remedies',
  title: 'Vedic Remedies',
  icon: 'Leaf',
  image: '/readings/remedies.jpg',
  requiresTransits: true,
  voice:
    'Write as a vaidya handing over a prescription. Exact. Item, day, count, direction. No poetry where a specific act is required. Every remedy must be something the reader can begin doing tomorrow morning — nothing abstract, nothing requiring a priest, nothing that requires spending money the reader may not have.',
  sanskrit: 'वैदिक उपाय',
  tagline: 'Mantras, daan, and Lal Kitab totke',
  description:
    'A pragmatic remedy reading. The weakest houses, the most afflicted planets, and exact prescriptions — mantras with japa count, daan with day, totke with act.',
  accent: 'crimson',
  estimatedWords: 2000,
  estimatedMinutes: 10,
  defaults: { tone: 'practical', language: 'English', length: 2500 },
  sections: [
    {
      title: 'The Chart Signature',
      guide:
        'Brief. Lagna, Chandra, Surya, one line only. This section is not the reading; it is the header.',
    },
    {
      title: 'The Weakest Houses',
      guide:
        'The bottom three houses by SAV bindus. For each, name the house, the number of bindus, and one sentence on the life-area it governs.',
    },
    {
      title: 'The Afflicted Planets',
      guide:
        'Every planet that is debilitated, combust, retrograde, or weak by BAV. Name each planet and its specific affliction. This is the list you will prescribe for.',
    },
    {
      title: 'Lal Kitab Totke',
      guide:
        'Lal Kitab remedies for each afflicted planet and house. Exact item, exact day, exact act. No substitutions offered.',
    },
    {
      title: 'Mantras and Japa',
      guide:
        'For each afflicted planet: one mantra, one japa count per day, one recommended time of day. Include the transliteration for readers who do not read Devanagari.',
    },
    {
      title: 'Daan, Fasting, and Ritual',
      guide:
        'Specific daan items. Specific fast days. Specific ritual acts. Item + day + direction. If a remedy has a caution, state it.',
    },
    BLESSING,
  ],
};