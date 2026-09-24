/**
 * Resolves a DataRequirement against the live sources (kundli, gochar,
 * panchang, profile) and returns only the blocks the situation asked for.
 *
 * This is why prompts stop being bloated: a situation that only cares
 * about Saturn's transit no longer receives the whole kundli.
 */
import type { DataBlockId, DataRequirement } from './types';

export interface SelectorSources {
  kundli: Record<string, any> | null;
  gochar?: Record<string, any> | null;
  panchang?: Record<string, any> | null;
  profile?: Record<string, any> | null;
}

export function select(
  req: DataRequirement,
  sources: SelectorSources
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const block of req.blocks) {
    const v = extractBlock(block, sources);
    if (v !== undefined && v !== null) out[block] = v;
  }
  return out;
}

function extractBlock(
  block: DataBlockId,
  s: SelectorSources
): unknown {
  const k = s.kundli;
  switch (block) {
    case 'core-anchors':
      if (!k) return undefined;
      return {
        lagna: k.ascendant ?? null,
        chandra: k.planets?.Moon ?? null,
        surya: k.planets?.Sun ?? null,
      };
    case 'planets':
      return k?.planets;
    case 'houses':
      return k?.houses;
    case 'dasha':
      return k?.dasha;
    case 'ashtakavarga':
      return k?.ashtakavarga;
    case 'special-lagnas':
      return k?.specialLagnas;
    case 'arudha-padas':
      return k?.arudhaPadas;
    case 'aspects':
      return k?.drishti;
    case 'chalit':
      return k?.chalit;
    case 'gochar':
      return s.gochar ?? null;
    case 'panchang':
      return s.panchang ?? null;
    case 'sade-sati':
      return s.gochar?.specialTransits?.sadeSati ?? null;
    default:
      return undefined;
  }
}