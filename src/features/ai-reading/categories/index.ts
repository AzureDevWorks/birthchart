/**
 * Registry — the public surface of the categories module.
 *
 * All existing imports of the form:
 *   import { CATEGORIES } from './categories';
 *   import { getCategory } from '@/features/ai-reading/categories';
 * continue to work unchanged, because this file re-exports the
 * same names from the old monolithic categories.ts.
 */

export type {
  ReadingCategoryId,
  ReadingTone,
  ReadingLanguage,
  Accent,
  SectionSpec,
  ReadingCategory,
} from './_types';

export { BLESSING } from './_shared';

import type { ReadingCategory, ReadingCategoryId } from './_types';
import { fullLife } from './full-life';
import { career } from './career';
import { marriage } from './marriage';
import { wealth } from './wealth';
import { health } from './health';
import { spiritual } from './spiritual';
import { children } from './children';
import { remedies } from './remedies';
import { karmic } from './karmic';
import { transit } from './transit';

export const CATEGORIES: ReadingCategory[] = [
  fullLife,
  career,
  marriage,
  wealth,
  health,
  spiritual,
  children,
  remedies,
  karmic,
  transit,
];

export const CATEGORY_MAP: Record<ReadingCategoryId, ReadingCategory> =
  Object.fromEntries(CATEGORIES.map((c) => [c.id, c])) as Record<
    ReadingCategoryId,
    ReadingCategory
  >;

export function getCategory(id: ReadingCategoryId): ReadingCategory {
  const c = CATEGORY_MAP[id];
  if (!c) throw new Error(`Unknown reading category: ${id}`);
  return c;
}