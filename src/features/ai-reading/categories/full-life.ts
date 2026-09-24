import type { ReadingCategory } from './_types';
import { BLESSING } from './_shared';

export const fullLife: ReadingCategory = {
  id: 'full-life',
  title: 'Full Life Reading',
  icon: 'Sparkles',
  image: '/readings/full-life.jpg',
  requiresTransits: true,
  voice:
    'Write as the biographer of a soul. Sweep across decades — childhood, adulthood, the long middle, the elder years — as one continuous life. Do not present sections as disconnected diagnoses; weave them into a single unfolding story. Speak of chapters and seasons. The reader should feel they are reading the shape of their own life, not a chart.',
  sanskrit: 'पूर्ण जीवन पठन',
  tagline: 'The complete chart — all nine bhavas interwoven',
  description:
    'The master reading. Covers the three anchors, career, marriage, wealth, health, spirituality, and remedies in one continuous document.',
  accent: 'amber',
  estimatedWords: 3500,
  estimatedMinutes: 18,
  defaults: { tone: 'traditional', language: 'English', length: 4000 },
  sections: [
    {
      title: 'The Three Anchors',
      guide:
        'Open by naming the Lagna, Chandra, and Surya — rashi, nakshatra, pada, lord. State the one-line signature of the whole chart. Then step back and say what this triple means as a life orientation.',
    },
    {
      title: 'The Mind and the Heart',
      guide:
        'The Moon by house, nakshatra, dignity. The 4th house lord. Every planet in the 4th. Describe the emotional interior as a physical place the reader has always lived inside.',
    },
    {
      title: 'Career and Vocation',
      guide:
        'The 10th lord and where it went. Planets in the 10th. The D10 signature. The Amatyakaraka. Name three concrete fields. Cite the next two career-defining dashas by date.',
    },
    {
      title: 'Marriage and Partnership',
      guide:
        'The 7th lord, Venus, Jupiter, and the Darakaraka. The Navamsha. Describe the kind of partner the chart is built to meet, and when the door opens.',
    },
    {
      title: 'Wealth and Fortune',
      guide:
        'The 2nd and 11th lords. SAV bindus for houses 2, 9, 11. Any Dhana yoga. Distinguish money earned from money inherited. Cite the wealth windows.',
    },
    {
      title: 'Health and Vitality',
      guide:
        'Lagna strength. The 6th and 8th lords. Malefics in 1/6/8. SAV for houses 1, 6, 8. Name the parts of the body most likely to need attention across decades.',
    },
    {
      title: 'The Spiritual Axis',
      guide:
        'The 9th and 12th houses. Ketu. The Atmakaraka. Where the life turns inward, and what it turns toward.',
    },
    {
      title: 'Vedic Remedies',
      guide:
        'The three weakest houses by SAV. The most afflicted planets. Give exact prescriptions: item, day of week, count, direction. Nothing vague.',
    },
    BLESSING,
  ],
};