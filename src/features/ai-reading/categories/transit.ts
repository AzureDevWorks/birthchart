import type { ReadingCategory } from './_types';
import { BLESSING } from './_shared';

export const transit: ReadingCategory = {
  id: 'transit',
  title: 'Current Transit',
  icon: 'Compass',
  image: '/readings/transit.jpg',
  requiresTransits: true,
  voice:
    'Write as a weather forecaster of the sky. Immediate, tactical, seasonal. This is not a lifetime map — it is the shape of the next six to eighteen months. Cite what is happening NOW, when it peaks, when it clears. Use a strong sense of "this month" and "the coming season." The reader should close the reading knowing exactly what to lean into next week and what to postpone until spring.',
  sanskrit: 'गोचर फल',
  tagline: 'The sky right now, and what it asks of you',
  description:
    "A seasonal reading. Saturn's long shadow, Jupiter's blessing, the Rahu–Ketu axis, and how the current Vimshottari Dasha meets the moving sky. What to lean into, what to postpone.",
  accent: 'sunset',
  estimatedWords: 2000,
  estimatedMinutes: 10,
  defaults: { tone: 'practical', language: 'English', length: 2500 },
  sections: [
    {
      title: 'The Sky Right Now',
      guide:
        'Open with the transit date and the overall verdict. State the natal Moon rashi the entire reading is measured from, and the favorable percentage. One paragraph. Set the scene.',
    },
    {
      title: "Saturn's Long Shadow",
      guide:
        "Sade Sati status and phase, and Dhaiya type if active. Cite Saturn's current rashi and its house from the natal Moon. Say when this clears, and what it is teaching while it stands.",
    },
    {
      title: "Jupiter's Blessing",
      guide:
        "Guru Gochar — Jupiter's current rashi and house from the natal Moon. The houses it aspects. Where grace is arriving, and in what form.",
    },
    {
      title: 'The Rahu–Ketu Axis',
      guide:
        'The current Rahu and Ketu houses from the natal Moon. The karmic weather of this season. What is being pulled toward and what is being released, right now.',
    },
    {
      title: 'The Dasha Meets the Sky',
      guide:
        'Read the current Mahadasha and Antardasha against the transits. The dasha decides which transits actually fire. Name the one or two planets whose combination is defining this season.',
    },
    {
      title: 'The Next Six to Eighteen Months',
      guide:
        'A brief seasonal timeline. Name what peaks and when. Name what clears and when. Give the reader two or three dated turning points.',
    },
    {
      title: 'What to Lean Into Now',
      guide:
        'The actionable advice. Three to five concrete moves the reader can make this month — aligned with the sky, not against it. Each one a physical act, not a mood.',
    },
    {
      title: 'What to Postpone',
      guide:
        'Three to five things the sky is asking the reader to delay. Be specific — a decision, a launch, a conversation, a move. Say when it becomes favorable again.',
    },
    BLESSING,
  ],
};