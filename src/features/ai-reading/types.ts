/**
 * Shared types for the reading library. These used to live in
 * categories/_types.ts. After the ai-v2 migration, they live here
 * so the store is not coupled to the legacy category definitions.
 */

export type ReadingCategoryId = string;
export type ReadingTone = 'traditional' | 'analytical' | 'practical' | 'devotional';
export type ReadingLanguage = 'English' | 'Hindi' | 'Nepali' | 'en' | 'hi' | 'ne';

