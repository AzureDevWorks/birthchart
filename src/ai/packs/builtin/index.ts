/**
 * Registers every built-in pack.
 *
 * To add a pack: drop the JSON file in this directory and add one line
 * to the array below. No other file needs to change.
 */
import type { PromptPack } from '../../core/types';

import career from './career.json';
import dailyRashi from './daily-rashi.json';

export const BUILTIN_PACKS: PromptPack[] = [
  career as unknown as PromptPack,
  dailyRashi as unknown as PromptPack,
];

export const BUILTIN_PACK_MAP: Record<string, PromptPack> =
  Object.fromEntries(BUILTIN_PACKS.map((p) => [p.id, p]));