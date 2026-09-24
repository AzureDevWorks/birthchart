/**
 * Core types for the AI plugin system.
 *
 * A PromptPack is a JSON document that describes how to ask the AI for
 * a specific kind of output. It composes six layers (safety, domain,
 * language, situation, data, format) into one prompt. Situations inside
 * a pack declare what data they need and how the output should look.
 *
 * Nothing in this file imports from React or from the app. It is pure
 * data description. That is what makes packs portable and forkable.
 */

export type Language = 'en' | 'hi' | 'ne';

export type SituationKind = 'article' | 'structured' | 'prose' | 'qa';

export type DataBlockId =
  | 'core-anchors'
  | 'planets'
  | 'houses'
  | 'dasha'
  | 'ashtakavarga'
  | 'special-lagnas'
  | 'arudha-padas'
  | 'aspects'
  | 'chalit'
  | 'gochar'
  | 'panchang'
  | 'sade-sati';

export interface SituationMeta {
  icon?: string;
  image?: string;
  accent?: string;
  sanskrit?: string;
  tagline?: string;
  description?: string;
  estimatedWords?: number;
  estimatedMinutes?: number;
}

export interface DataRequirement {
  blocks: DataBlockId[];
  format?: 'json' | 'markdown' | 'prose';
}

export interface SectionSpec {
  title: string;
  guide: string;
  wordTarget?: number;
  render?: 'prose' | 'verse' | 'blessing';
}

export interface SituationDef {
  id: string;
  kind: SituationKind;
  label?: string;
  meta?: SituationMeta;
  data: DataRequirement;
  situation: string;
  format?: string;
  sections?: SectionSpec[];
  outputSchema?: string;
}

export interface ChangelogEntry {
  version: string;
  date: string;
  notes: string;
}

export interface PromptPack {
  id: string;
  version: string;
  label: string;
  author: string;
  changelog: ChangelogEntry[];
  safety: string;
  domain: string;
  languages: Record<Language, string>;
  situations: SituationDef[];
}

export interface ComposedPrompt {
  system: string;
  user: string;
  layers: {
    safety: string;
    domain: string;
    language: string;
    situation: string;
    data: string;
    format: string;
  };
  meta: {
    packId: string;
    packVersion: string;
    situationId: string;
    language: Language;
  };
}