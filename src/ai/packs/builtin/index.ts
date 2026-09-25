/**
 * Registers every built-in pack.
 *
 * To add a pack: drop the JSON file in this directory and add one line
 * to the imports + array below. No other file needs to change.
 */
import type { PromptPack } from '../../core/types';

import fullLife from './full-life.json';
import career from './career.json';
import marriage from './marriage.json';
import wealth from './wealth.json';
import health from './health.json';
import spiritual from './spiritual.json';
import children from './children.json';
import remedies from './remedies.json';
import karmic from './karmic.json';
import transit from './transit.json';
import dailyRashi from './daily-rashi.json';
import dailyReading from './daily-reading.json';

export const BUILTIN_PACKS: PromptPack[] = [
  fullLife as unknown as PromptPack,
  career as unknown as PromptPack,
  marriage as unknown as PromptPack,
  wealth as unknown as PromptPack,
  health as unknown as PromptPack,
  spiritual as unknown as PromptPack,
  children as unknown as PromptPack,
  remedies as unknown as PromptPack,
  karmic as unknown as PromptPack,
  transit as unknown as PromptPack,
  dailyRashi as unknown as PromptPack,
  dailyReading as unknown as PromptPack,
];

export const BUILTIN_PACK_MAP: Record<string, PromptPack> =
  Object.fromEntries(BUILTIN_PACKS.map((p) => [p.id, p]));
