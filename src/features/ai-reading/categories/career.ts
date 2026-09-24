import type { ReadingCategory } from './_types';

import { BLESSING } from './_shared';

export const career: ReadingCategory = {
  id: 'career',

  title: 'Career & Dharma',

  icon: 'Briefcase',

  image: '/readings/career.jpg',

  requiresTransits: true,

  voice:
    'Write as a seasoned Jyotisha counselor advising a person about work, vocation, responsibility, and public life. Be clear, grounded, practical, and specific without pretending that astrology determines one inevitable profession or outcome. Move from chart evidence to traditional interpretation to practical implications. Distinguish natal potential from timing. When evidence is strong, speak clearly. When evidence is mixed or incomplete, acknowledge the qualification. Never manufacture certainty, dates, professions, qualifications, or career events.',

  sanskrit: 'कर्म एवं धर्म',

  tagline: 'Vocation, profession, achievement, and the path of meaningful work',

  description:
    'A holistic career reading that brings together the Lagna, 10th house and lord, Sun and Saturn, Mercury, the 6th and 11th houses, D10, Amatyakaraka, relevant yogas, planetary strength, Vimshottari Dasha, and current Gochar to understand how work, responsibility, livelihood, recognition, and dharma unfold.',

  accent: 'indigo',

  estimatedWords: 2200,

  estimatedMinutes: 11,

  defaults: {
    tone: 'analytical',
    language: 'English',
    length: 2500,
  },

  sections: [
    {
      title: 'The Career Signature',

      guide:
        'Begin with the career foundation of the chart. State Lagna, Chandra, and Surya briefly, then establish the 10th house, its lord, occupants, and major supporting influences. Explain how identity, temperament, purpose, and public responsibility connect to professional life. Do not interpret the 10th house in isolation. Establish the central career pattern before discussing individual planets.',

      wordTarget: 280,
    },

    {
      title: 'Dharma, Purpose & Work',

      guide:
        'Examine the relationship between the 9th and 10th houses, their lords, the Sun, Jupiter, and other supplied dharma indicators. Explain the distinction between simply earning a living and work that expresses responsibility, purpose, knowledge, service, leadership, or contribution. Identify the strongest themes supported by the supplied chart evidence. Do not claim that one predetermined vocation is compulsory.',

      wordTarget: 300,
    },

    {
      title: 'The 10th House & Its Lord',

      guide:
        'Give the central classical career analysis: 10th house sign, 10th lord, house placement, sign, nakshatra, dignity, conjunctions, aspects, and relevant strength indicators when supplied. Explain what kind of work, responsibility, authority, visibility, and professional environment these combinations traditionally support. Cross-reference the 10th lord with the Lagna, Sun, Saturn, and relevant houses rather than treating one placement as decisive.',

      wordTarget: 350,
    },

    {
      title: 'Work, Skills & Professional Strengths',

      guide:
        'Synthesize the planets and houses relevant to practical work: Mercury for analysis, communication and technical/intellectual activity; Saturn for discipline, endurance, structure and responsibility; Sun for authority, leadership and visibility; Mars for initiative and execution; Jupiter for knowledge, counsel and teaching; Venus for aesthetics, relationships and value creation. Only use these significations when supported by the supplied chart and reference material. Identify several concrete professional strengths or work modes rather than reducing the reading to personality adjectives.',

      wordTarget: 300,
    },

    {
      title: 'The Working Environment',

      guide:
        'Use the 6th, 10th, and 11th houses and their lords, along with relevant planets, to describe the environments in which the native may function most naturally: employment, service, administration, technical work, independent work, leadership, consulting, research, institutions, entrepreneurship, public-facing roles, or collaborative networks. Distinguish the type of work from the industry. Where the evidence supports several possibilities, present the strongest themes rather than forcing a single occupation.',

      wordTarget: 280,
    },

    {
      title: 'Dashamsha & Amatyakaraka',

      guide:
        'If D10 and Amatyakaraka data are supplied, interpret them as refinement layers rather than replacements for the D1. Compare D10 themes with the natal 10th house and lord. Explain where D1 and D10 reinforce one another and where they introduce a different professional dimension. Interpret the Amatyakaraka within the supplied Jaimini framework. If either D10 or Amatyakaraka data is unavailable, explicitly omit that analysis rather than calculating or inventing it.',

      wordTarget: 320,
    },

    {
      title: 'Career Strengths, Obstacles & Growth',

      guide:
        'Synthesize supportive and challenging factors affecting professional development. Consider planetary dignity, relevant yogas, aspects, combustion or retrogression when supplied, house strength, Ashtakavarga where relevant, and afflictions. Identify the strongest professional advantages and the most important recurring obstacle or growth requirement. Do not use fear-based language. Explain how a difficult combination can be worked with rather than presenting it as an unavoidable failure.',

      wordTarget: 300,
    },

    {
      title: 'Dasha & Career Timing',

      guide:
        'Use the supplied Vimshottari Dasha timeline to identify career periods that are actually supported by the available timing data. Give particular attention to the active Mahadasha and Antardasha and explain why their planets matter for career. Distinguish long-term natal promise from period activation. If upcoming dates are supplied, identify meaningful windows without inventing dates. Do not declare a single guaranteed career event or claim that one period must produce a specific outcome.',

      wordTarget: 320,
    },

    {
      title: 'Current Gochar — Career Now',

      guide:
        'Use the supplied current transit data as an activation layer over the natal career picture. Evaluate Saturn, Jupiter, Rahu, Ketu, and other supplied transits in relation to the natal Moon and Lagna exactly as provided. Integrate the active Dasha rather than treating transits independently. Explain the current professional climate, areas requiring patience or initiative, and practical decisions that are supported by the supplied evidence. Do not recompute supplied transit classifications, Sade Sati, Dhaiya, house-from-Moon positions, or other precomputed values.',

      wordTarget: 300,
    },

    {
      title: 'Career Direction',

      guide:
        "Bring the entire reading together. Identify three to five strongest career themes or professional directions supported by the combined evidence. For each, explain the astrological reasoning briefly and translate it into a practical implication. Distinguish between a professional field, a role, a work environment, and a skill. Do not present one occupation as destiny. End with a concise set of practical priorities for the reader's professional life.",

      wordTarget: 300,
    },

    {
      title: 'Vedic Remedies for Career',

      guide:
        'Provide only remedies supported by the supplied Jyotisha reference material and relevant chart evidence. Prioritize simple, non-destructive practices such as appropriate mantra, prayer, disciplined practice, seva, daana, or devotional observance when genuinely supported. Never invent a mantra, japa count, ritual direction, gemstone recommendation, fasting requirement, or Lal Kitab remedy. Do not present a remedy as guaranteed to change employment, income, promotion, or destiny. If no sufficiently grounded remedy is available, say so and provide a simple practice-oriented alternative.',

      wordTarget: 220,
    },

    BLESSING,
  ],
};
