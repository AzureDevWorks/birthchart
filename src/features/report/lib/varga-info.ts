/**
 * Knowledge base for all 20 divisional charts (Vargas).
 * Each entry describes what the chart reveals and how it's used.
 */
export interface VargaInfo {
  code: string;
  name: string;
  sanskrit: string;
  division: string;
  purpose: string;
  summary: string;
  useCases: string[];
}

export const VARGA_INFO: Record<string, VargaInfo> = {
  d1: {
    code: 'D1',
    name: 'Rashi',
    sanskrit: '\u0930\u093E\u0936\u093F',
    division: '1 division',
    purpose: 'The Body',
    summary:
      'The Rashi chart is the foundation of all Vedic astrology. Each sign is one house, showing the soul in physical form - the body, personality, and the life you walk in. Every other divisional chart is a lens on top of this base.',
    useCases: [
      'Overall life direction',
      'Physical body and health',
      'Personal identity and mask',
      'Basic planetary strength',
    ],
  },
  d2: {
    code: 'D2',
    name: 'Hora',
    sanskrit: '\u0939\u094B\u0930\u093E',
    division: '2 divisions of 15�',
    purpose: 'Wealth',
    summary:
      'The Hora splits each sign into two halves - one ruled by the Sun, one by the Moon. It reveals the source and nature of wealth in a chart: whether it comes through self-effort (Sun) or through inheritance, care, and connection (Moon).',
    useCases: [
      'Source of wealth',
      'Financial patterns',
      'Sustenance and prosperity',
      'Savings and assets',
    ],
  },
  d3: {
    code: 'D3',
    name: 'Drekkana',
    sanskrit: '\u0926\u094D\u0930\u0947\u0915\u094D\u0915\u093E\u0923',
    division: '3 divisions of 10�',
    purpose: 'Siblings',
    summary:
      'The Drekkana shows siblings, co-borns, and short journeys. It also reveals communication and immediate community - the people you grow up alongside.',
    useCases: [
      'Siblings and cousins',
      'Neighborhood and locality',
      'Courage and initiative',
      'Short-distance travel',
    ],
  },
  d4: {
    code: 'D4',
    name: 'Chaturthamsa',
    sanskrit: '\u091A\u0924\u0941\u0930\u094D\u0925\u093E\u0902\u0936',
    division: '4 divisions of 7�30?',
    purpose: 'Property',
    summary:
      'The Chaturthamsa reveals landed property, homes, and fixed assets. It shows what you own and where you settle - the physical and emotional foundations of life.',
    useCases: [
      'Real estate',
      'Home and land',
      'Vehicles',
      'Domestic happiness',
    ],
  },
  d5: {
    code: 'D5',
    name: 'Panchamsa',
    sanskrit: '\u092A\u091E\u094D\u091A\u092E\u093E\u0902\u0936',
    division: '5 divisions of 6�',
    purpose: 'Fame',
    summary:
      'The Panchamsa reveals fame, authority, and the capacity for influence. It is used in classical Jyotish to determine whether a native attains renown.',
    useCases: [
      'Public reputation',
      'Political or social power',
      'Recognition and honours',
    ],
  },
  d6: {
    code: 'D6',
    name: 'Shashthamsa',
    sanskrit: '\u0937\u0937\u094D\u0920\u093E\u0902\u0936',
    division: '6 divisions of 5�',
    purpose: 'Health',
    summary:
      'The Shashthamsa is the health chart. It reveals physical vitality, disease proneness, and the specific areas of the body that need care.',
    useCases: [
      'Physical health',
      'Disease diagnosis',
      'Vitality and recovery',
    ],
  },
  d7: {
    code: 'D7',
    name: 'Saptamsa',
    sanskrit: '\u0938\u092A\u094D\u0924\u093E\u0902\u0936',
    division: '7 divisions of 4�17?',
    purpose: 'Children',
    summary:
      'The Saptamsa is the primary chart for progeny - whether children come, their nature, and the native\'s relationship with them.',
    useCases: [
      'Children and fertility',
      'Lineage and descendants',
      'Creative legacy',
    ],
  },
  d8: {
    code: 'D8',
    name: 'Ashtamsa',
    sanskrit: '\u0905\u0937\u094D\u091F\u093E\u0902\u0936',
    division: '8 divisions of 3�45?',
    purpose: 'Sudden Events',
    summary:
      'The Ashtamsa reveals sudden events - accidents, scandals, litigation, and unexpected changes. A difficult but important chart for timing crises.',
    useCases: [
      'Sudden gains or losses',
      'Accidents and injuries',
      'Litigation and disputes',
    ],
  },
  d9: {
    code: 'D9',
    name: 'Navamsha',
    sanskrit: '\u0928\u0935\u093E\u0902\u0936',
    division: '9 divisions of 3�20?',
    purpose: 'Marriage & Dharma',
    summary:
      'The Navamsha is the most important divisional chart after the D1. It divides each sign into nine parts, revealing the soul\'s deeper purpose, the quality of marriage, and the true inner strength of every planet. A planet in the same sign in D1 and D9 is "Vargottama" - exceptionally strong.',
    useCases: [
      'Marriage and partnership',
      'Soul purpose and dharma',
      'Inner strength of planets',
      'Late-life direction',
    ],
  },
  d10: {
    code: 'D10',
    name: 'Dashamsha',
    sanskrit: '\u0926\u0936\u093E\u0902\u0936',
    division: '10 divisions of 3�',
    purpose: 'Career',
    summary:
      'The Dashamsha is the career chart. It reveals profession, public role, professional achievements, and how the native is seen in the outer world.',
    useCases: [
      'Career and profession',
      'Public standing',
      'Professional reputation',
      'Nature of work',
    ],
  },
  d11: {
    code: 'D11',
    name: 'Rudramsa',
    sanskrit: '\u0930\u0941\u0926\u094D\u0930\u093E\u0902\u0936',
    division: '11 divisions of 2�43?',
    purpose: 'Gains',
    summary:
      'The Rudramsa (or Ekadashamsha) reveals gains, income, and the fulfilment of desires. A rarer chart, studied for its insight into what the native truly gains in life.',
    useCases: [
      'Income streams',
      'Fulfilment of desires',
      'Rewards and benefits',
    ],
  },
  d12: {
    code: 'D12',
    name: 'Dwadashamsha',
    sanskrit: '\u0926\u094D\u0935\u093E\u0926\u0936\u093E\u0902\u0936',
    division: '12 divisions of 2�30?',
    purpose: 'Parents',
    summary:
      'The Dwadashamsha reveals the native\'s parents - their nature, influence, and the karmic inheritance from them.',
    useCases: [
      'Father and mother',
      'Ancestral karma',
      'Family lineage',
    ],
  },
  d16: {
    code: 'D16',
    name: 'Shodashamsha',
    sanskrit: '\u0937\u094B\u0921\u0936\u093E\u0902\u0936',
    division: '16 divisions of 1�52?',
    purpose: 'Vehicles',
    summary:
      'The Shodashamsha reveals vehicles, conveyances, and general comforts. It also shows the source of happiness and pleasure in life.',
    useCases: [
      'Vehicles and transport',
      'Comforts and pleasures',
      'Luxury and enjoyment',
    ],
  },
  d20: {
    code: 'D20',
    name: 'Vimshamsha',
    sanskrit: '\u0935\u093F\u0902\u0936\u093E\u0902\u0936',
    division: '20 divisions of 1�30?',
    purpose: 'Spirituality',
    summary:
      'The Vimshamsha is the spiritual chart. It reveals the native\'s path of devotion, meditation, and connection to the divine. An essential chart for those on the inner journey.',
    useCases: [
      'Spiritual practice',
      'Devotion and meditation',
      'Relationship to the divine',
      'Moksha (liberation)',
    ],
  },
  d24: {
    code: 'D24',
    name: 'Siddhamsha',
    sanskrit: '\u0938\u093F\u0926\u094D\u0927\u093E\u0902\u0936',
    division: '24 divisions of 1�15?',
    purpose: 'Education',
    summary:
      'The Siddhamsha (or Chaturvimshamsha) is the education chart. It reveals learning capacity, academic success, and the specific fields of knowledge the native excels in.',
    useCases: [
      'Education and learning',
      'Academic success',
      'Fields of expertise',
      'Intellectual gifts',
    ],
  },
  d27: {
    code: 'D27',
    name: 'Bhamsha',
    sanskrit: '\u092D\u093E\u0902\u0936',
    division: '27 divisions of 1�07?',
    purpose: 'Strengths',
    summary:
      'The Bhamsha (or Saptavimshamsha) reveals the native\'s general strengths, weaknesses, and stamina. It is used to check the overall vitality of the chart.',
    useCases: [
      'Strengths and weaknesses',
      'Stamina and endurance',
      'Overall vitality',
    ],
  },
  d30: {
    code: 'D30',
    name: 'Trimshamsha',
    sanskrit: '\u0924\u094D\u0930\u093F\u0902\u0936\u093E\u0902\u0936',
    division: '30 divisions of 1�',
    purpose: 'Misfortunes',
    summary:
      'The Trimshamsha reveals misfortunes, evils, and the specific karmic challenges in life. A challenging but diagnostic chart.',
    useCases: [
      'Challenges and obstacles',
      'Karmic debts',
      'Sources of suffering',
    ],
  },
  d40: {
    code: 'D40',
    name: 'Khavedamsha',
    sanskrit: '\u0916\u0935\u0947\u0926\u093E\u0902\u0936',
    division: '40 divisions of 45?',
    purpose: 'Maternal',
    summary:
      'The Khavedamsha reveals the influences of the mother\'s lineage and maternal karma.',
    useCases: [
      'Maternal legacy',
      'Mother\'s influence',
      'Inherited traits',
    ],
  },
  d45: {
    code: 'D45',
    name: 'Akshavedamsha',
    sanskrit: '\u0905\u0915\u094D\u0937\u0935\u0947\u0926\u093E\u0902\u0936',
    division: '45 divisions of 40?',
    purpose: 'Paternal',
    summary:
      'The Akshavedamsha reveals the influences of the father\'s lineage and paternal karma.',
    useCases: [
      'Paternal legacy',
      'Father\'s influence',
      'Ancestral strengths',
    ],
  },
  d60: {
    code: 'D60',
    name: 'Shashtiamsha',
    sanskrit: '\u0937\u0937\u094D\u091F\u094D\u092F\u0902\u0936',
    division: '60 divisions of 30?',
    purpose: 'Karma',
    summary:
      'The Shashtiamsha is the most subtle divisional chart. It reveals the finest details of the native\'s karma - the specific past-life impressions that shape this life. Considered by many to be the most important chart after D1 and D9.',
    useCases: [
      'Past-life karma',
      'Deepest life tendencies',
      'Subtle destiny patterns',
    ],
  },
};

export const VARGA_ORDER = [
  'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9', 'd10',
  'd11', 'd12', 'd16', 'd20', 'd24', 'd27', 'd30', 'd40', 'd45', 'd60',
];
