/**
 * Resolves a situation id to a (pack, situation) pair.
 *
 * Built-in packs ship in the bundle. User packs are registered at
 * runtime (from a Zustand store that persists to localStorage).
 * User packs with the same id shadow built-in packs, so a user can
 * fork and activate without editing source.
 */
import type { PromptPack, SituationDef } from './types';
import { BUILTIN_PACKS } from '../packs/builtin';

const userPacks = new Map<string, PromptPack>();
const disabled = new Set<string>();

export function registerUserPack(pack: PromptPack): void {
  userPacks.set(pack.id, pack);
}

export function unregisterUserPack(id: string): void {
  userPacks.delete(id);
}

export function disablePack(id: string): void {
  disabled.add(id);
}

export function enablePack(id: string): void {
  disabled.delete(id);
}

export function listPacks(): PromptPack[] {
  const byId = new Map<string, PromptPack>();
  for (const p of BUILTIN_PACKS) byId.set(p.id, p);
  for (const p of userPacks.values()) byId.set(p.id, p);
  return Array.from(byId.values()).filter((p) => !disabled.has(p.id));
}

export interface Resolved {
  pack: PromptPack;
  situation: SituationDef;
}

export function resolve(situationId: string): Resolved {
  for (const pack of listPacks()) {
    const s = pack.situations.find((x) => x.id === situationId);
    if (s) return { pack, situation: s };
  }
  throw new Error(
    `No active pack provides situation "${situationId}". ` +
      `Available: ${listPacks()
        .flatMap((p) => p.situations.map((s) => s.id))
        .join(', ')}`
  );
}

export function listSituations(): Array<{
  situation: SituationDef;
  pack: PromptPack;
}> {
  const out: Array<{ situation: SituationDef; pack: PromptPack }> = [];
  for (const pack of listPacks()) {
    for (const s of pack.situations) out.push({ situation: s, pack });
  }
  return out;
}