// scripts/cache-per-language.mjs
// Gives each language its own daily-reading cache slot.
// Switching language no longer regenerates if that language is cached.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

function patch(rel, fn) {
  const full = path.join(ROOT, rel);
  const before = fs.readFileSync(full, 'utf8');
  const after = fn(before);
  if (before === after) {
    console.log('  (no change)', rel);
    return;
  }
  fs.writeFileSync(full, after, 'utf8');
  console.log('  patched', rel);
}

console.log('\nMaking daily-reading cache per language...\n');

// ═══════════════════════════════════════════════════════════════
// 1. Store — honor the explicit `key` when provided
// ═══════════════════════════════════════════════════════════════
patch('src/features/ai-reading/store.ts', (src) => {
  const oldSave = `      save: (incoming) =>
        set((s) => {
          const id = readingId(incoming.profileHash, incoming.categoryId);
          const existing = s.records[id];

          const history = existing
            ? [toVersion(existing), ...(existing.history ?? [])].slice(
                0,
                MAX_HISTORY
              )
            : [];

          // Strip the legacy \`key\` field — identity is (profileHash, categoryId).
          const { key: _key, ...rest } = incoming as Omit<
            ReadingRecord,
            'history'
          > & { key?: string };

          return {
            records: {
              ...s.records,
              [id]: { ...rest, history } as ReadingRecord,
            },
          };
        }),`;

  const newSave = `      save: (incoming) =>
        set((s) => {
          const { key, ...rest } = incoming as Omit<
            ReadingRecord,
            'history'
          > & { key?: string };
          const id = key ?? readingId(incoming.profileHash, incoming.categoryId);
          const existing = s.records[id];

          const history = existing
            ? [toVersion(existing), ...(existing.history ?? [])].slice(
                0,
                MAX_HISTORY
              )
            : [];

          return {
            records: {
              ...s.records,
              [id]: { ...rest, history } as ReadingRecord,
            },
          };
        }),`;

  if (!src.includes(oldSave)) {
    console.log('  WARNING: save() pattern not matched in store.ts');
    return src;
  }
  return src.replace(oldSave, newSave);
});

// ═══════════════════════════════════════════════════════════════
// 2. Hook — per-language storage key; drop language from version
// ═══════════════════════════════════════════════════════════════
patch('src/features/ai-reading/hooks/useDailyReading.ts', (src) => {
  // 2a — replace id derivation
  src = src.replace(
    `  const profileHash = useMemo(() => hashProfile(profile), [profile]);
  const id = readingId(profileHash, CATEGORY_ID);`,
    `  const profileHash = useMemo(() => hashProfile(profile), [profile]);
  // Each language gets its own cache slot. Switching back and forth
  // between languages is free — no regeneration until the date rolls.
  const storageKey = \`\${CATEGORY_ID}@\${language}\`;
  const id = readingId(profileHash, storageKey);`
  );

  // 2b — version no longer carries language
  src = src.replace(
    `const promptVersion = \`\${BASE_PROMPT_VERSION}|\${dateISO}|\${language}\`;`,
    `const promptVersion = \`\${BASE_PROMPT_VERSION}|\${dateISO}\`;`
  );

  // 2c — pass explicit key to save()
  src = src.replace(
    `        save({
          profileHash,`,
    `        save({
          key: id,
          profileHash,`
  );

  // 2d — remove() must target this language's slot
  src = src.replace(
    `    useReadingStore.getState().remove(profileHash, CATEGORY_ID);`,
    `    useReadingStore.getState().remove(profileHash, storageKey);`
  );

  return src;
});

console.log('\nDone.\n');
console.log('Next:');
console.log('  1. npm run build');
console.log('  2. Open the app, press F12, Application -> Local Storage ->');
console.log('     delete "kundaliyatra-reading-library", then reload.');
console.log('  3. Switch languages back and forth. Only the first switch to');
console.log('     each language generates; switches after that are instant.');
console.log('');
