/**
 * Knowledge base for Vedic aspects (Graha Drishti).
 * Classical Parashari rules for planetary aspects.
 */

export interface AspectRule {
  planet: string;
  rule: string;
  houses: number[];
  meaning: string;
}

export const ASPECT_RULES: AspectRule[] = [
  {
    planet: 'Sun',
    rule: '7th aspect',
    houses: [7],
    meaning: 'Full aspect — sees the opposite house',
  },
  {
    planet: 'Moon',
    rule: '7th aspect',
    houses: [7],
    meaning: 'Full aspect — sees the opposite house',
  },
  {
    planet: 'Mars',
    rule: '4th, 7th, 8th aspect',
    houses: [4, 7, 8],
    meaning: 'Full aspect — Mars sees the 4th, 7th, and 8th houses',
  },
  {
    planet: 'Mercury',
    rule: '7th aspect',
    houses: [7],
    meaning: 'Full aspect — sees the opposite house',
  },
  {
    planet: 'Jupiter',
    rule: '5th, 7th, 9th aspect',
    houses: [5, 7, 9],
    meaning: 'Full aspect — Jupiter sees the 5th, 7th, and 9th houses',
  },
  {
    planet: 'Venus',
    rule: '7th aspect',
    houses: [7],
    meaning: 'Full aspect — sees the opposite house',
  },
  {
    planet: 'Saturn',
    rule: '3rd, 7th, 10th aspect',
    houses: [3, 7, 10],
    meaning: 'Full aspect — Saturn sees the 3rd, 7th, and 10th houses',
  },
  {
    planet: 'Rahu',
    rule: '5th, 7th, 9th aspect',
    houses: [5, 7, 9],
    meaning: 'Full aspect — Rahu sees the 5th, 7th, and 9th houses',
  },
  {
    planet: 'Ketu',
    rule: '5th, 7th, 9th aspect',
    houses: [5, 7, 9],
    meaning: 'Full aspect — Ketu sees the 5th, 7th, and 9th houses',
  },
];

export const ASPECT_TYPE_LABEL: Record<string, string> = {
  '3rd': '3rd house',
  '4th': '4th house',
  '5th': '5th house',
  '7th': '7th house',
  '8th': '8th house',
  '9th': '9th house',
  '10th': '10th house',
};

export const ASPECT_TYPE_MEANING: Record<string, string> = {
  '3rd': 'Effort, courage, siblings',
  '4th': 'Home, mother, heart',
  '5th': 'Intelligence, children, fortune',
  '7th': 'Partnership, marriage, public',
  '8th': 'Transformation, depth, longevity',
  '9th': 'Fortune, dharma, teacher',
  '10th': 'Career, action, status',
};
