import type { ReadingCategory } from './_types';
import { BLESSING } from './_shared';

export const wealth: ReadingCategory = {
  id: 'wealth',
  title: 'Wealth & Fortune',
  icon: 'Coins',
  image: '/readings/wealth.jpg',
  requiresTransits: true,
  voice:
    'Write as a steward of resources. Material, grounded, economic. Money is a tool and you are helping the reader hold it well. Name sources, name leaks, name timing. When the chart says caution, be direct. When it says abundance, do not whisper it.',
  sanskrit: 'धन एवं भाग्य',
  tagline: 'Money, assets, and the flow of prosperity',
  description:
    'The 2nd and 11th houses, the 9th house of fortune, and every Dhana yoga in the chart.',
  accent: 'emerald',
  estimatedWords: 1800,
  estimatedMinutes: 9,
  defaults: { tone: 'analytical', language: 'English', length: 2500 },
  sections: [
    {
      title: 'The Chart Signature',
      guide:
        'Lagna, Chandra, Surya in one line. Then the immediate wealth signature — is this a chart that accumulates, cycles, or gives away?',
    },
    {
      title: 'The 2nd and 11th Lords',
      guide:
        'The 2nd lord (savings, family wealth) and the 11th lord (gains, networks) by house, rashi, dignity. Say where money comes from and where it goes.',
    },
    {
      title: 'The 9th House — Source of Grace',
      guide:
        'The 9th lord and any planets in the 9th. The 9th is the house of unearned fortune. Name the kind of luck this chart is designed to receive.',
    },
    {
      title: 'Dhana Yogas',
      guide:
        'Every combination in the chart that builds wealth. Name each yoga, describe its strength, and say what kind of money it produces.',
    },
    {
      title: 'Strength of the Wealth Houses',
      guide:
        'SAV bindus for houses 2, 9, 11. Compare them. Say which of the three is the strongest channel and which needs care.',
    },
    {
      title: 'Timing of Financial Change',
      guide:
        'Cite the dashas by planet and date. Name the next major financial turning point — abundance or contraction — with its date.',
    },
    {
      title: 'Vedic Remedies for Wealth',
      guide:
        'Specific remedies for the 2nd and 11th lords. Item, day, count, direction. Remedies that cost nothing are better than those that cost money.',
    },
    BLESSING,
  ],
};