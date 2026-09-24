/**
 * Types for the AI reading feature.
 *
 * A ReadingCategory is a bundle of: identity (id, title, icon, image),
 * behaviour (voice, promptVersion, requiresTransits), presentation
 * (accent, estimatedWords), and content (sections).
 *
 * The `sections` array is the template. It is consumed at three stages:
 *   1. Prompt building  (schema.ts renders it as a block)
 *   2. Validation       (schema.ts checks the AI's response against it)
 *   3. Article display  (markdown.ts parses the response; ArticleBody renders)
 */

export type ReadingCategoryId =
  | 'full-life'
  | 'career'
  | 'marriage'
  | 'wealth'
  | 'health'
  | 'spiritual'
  | 'children'
  | 'remedies'
  | 'karmic'
  | 'transit';

export type ReadingTone =
  | 'traditional'
  | 'analytical'
  | 'practical'
  | 'devotional';

export type ReadingLanguage = 'English' | 'Hindi' | 'Nepali';

export type Accent =
  | 'amber'
  | 'rose'
  | 'violet'
  | 'emerald'
  | 'sky'
  | 'slate'
  | 'crimson'
  | 'indigo'
  | 'teal'
  | 'sunset';

export interface SectionSpec {
  /** Section title — must match the AI's response heading verbatim. */
  title: string;

  /** One-to-three sentences telling the AI what to write. */
  guide: string;

  /** Rendering mode. Default: prose. Blessing is centered italic vermilion. */
  render?: 'prose' | 'verse' | 'blessing';

  /**
   * Optional word budget. When omitted, this section receives an equal
   * share of the remaining budget (after blessing sections).
   */
  wordTarget?: number;
}

export interface ReadingCategory {
  id: ReadingCategoryId;
  title: string;

  /** lucide-react icon name — resolved to a component in AiReadingView. */
  icon: string;

  /**
   * Cover image URL. Convention: /readings/<id>.jpg
   * If missing or 404, the UI falls back to an icon medallion.
   */
  image?: string;

  /**
   * When true, the pipeline computes today's transits at the birth
   * location and passes them as a second payload to the prompt.
   */
  requiresTransits?: boolean;

  /** The reading's distinctive voice — injected verbatim into the prompt. */
  voice: string;

  /**
   * Optional per-category prompt version. When set, it overrides the
   * global PROMPT_VERSION for this category's cache key.
   * Use this to iterate on one reading without invalidating the others.
   */
  promptVersion?: string;

  /** Devanagari title shown on the studio card and article header. */
  sanskrit: string;

  /** One-line summary shown on the studio card. */
  tagline: string;

  /** Two-to-three sentence focus description sent to the AI. */
  description: string;

  accent: Accent;

  /** Target total word count shown on the studio card. */
  estimatedWords: number;

  /** Display-only estimate for reading time. */
  estimatedMinutes: number;

  /** The template. */
  sections: SectionSpec[];

  defaults: {
    tone: ReadingTone;
    language: ReadingLanguage;
    length: number;
  };
}