// scripts/finish-daily-reading.mjs
//
// Finishes the daily-reading feature:
//   1. Fixes DailyReadingView.tsx (unused import, missing styles props)
//   2. Deletes the obsolete separate store
//   3. Wires daily-reading into the /reading grid
//   4. Wires the click-through route

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), 'utf8');
}
function write(rel, content) {
  fs.writeFileSync(path.join(ROOT, rel), content, 'utf8');
  console.log('  wrote', rel);
}
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
function remove(rel) {
  const full = path.join(ROOT, rel);
  if (fs.existsSync(full)) {
    fs.rmSync(full, { recursive: true, force: true });
    console.log('  deleted', rel);
  }
}

console.log('\nFinishing daily-reading feature...\n');

// ═══════════════════════════════════════════════════════════════
// 1. Fix DailyReadingView.tsx
// ═══════════════════════════════════════════════════════════════
patch('src/features/ai-reading/DailyReadingView.tsx', (src) => {
  // Remove unused `Sun,` import line
  src = src.replace(/^\s*Sun,\s*\n/m, '');

  // Add styles={styles} back to <Block ... />
  src = src.replace(/<Block\b([^>/]*?)\s*\/>/g, (m, attrs) => {
    if (attrs.includes('styles=')) return m;
    return `<Block${attrs.replace(/\s+$/, '')} styles={styles} />`;
  });

  // Add styles={styles} back to <MiniBlock ... />
  src = src.replace(/<MiniBlock\b([^>/]*?)\s*\/>/g, (m, attrs) => {
    if (attrs.includes('styles=')) return m;
    return `<MiniBlock${attrs.replace(/\s+$/, '')} styles={styles} />`;
  });

  // Add styles={styles} back to <Divider />
  src = src.replace(/<Divider\s*\/>/g, '<Divider styles={styles} />');

  // Make sure ListBlock does NOT have styles prop (it doesn't use it)
  src = src.replace(/<ListBlock\b([^>/]*?)\s*styles=\{styles\}\s*\/>/g,
    (m, attrs) => `<ListBlock${attrs.replace(/\s+$/, '')} />`);

  return src;
});

// ═══════════════════════════════════════════════════════════════
// 2. Delete the obsolete separate store (if it exists)
// ═══════════════════════════════════════════════════════════════
remove('src/features/ai-reading/lib/daily-reading-store.ts');
// If the lib/ folder is now empty, remove it
try {
  const libDir = path.join(ROOT, 'src/features/ai-reading/lib');
  if (fs.existsSync(libDir) && fs.readdirSync(libDir).length === 0) {
    fs.rmdirSync(libDir);
    console.log('  removed empty folder src/features/ai-reading/lib');
  }
} catch { /* ignore */ }

// ═══════════════════════════════════════════════════════════════
// 3. Wire daily-reading into the /reading grid
// ═══════════════════════════════════════════════════════════════
patch('src/features/ai-reading/AiReadingView.tsx', (src) => {
  const before = src;
  // Match the filter that only allows 'article'
  src = src.replace(
    /listSituations\(\)\.filter\(\s*\(x\)\s*=>\s*x\.situation\.kind\s*===\s*['"]article['"]\s*\)/,
    "listSituations().filter(\n      (x) => x.situation.kind === 'article' || x.situation.id === 'daily-reading'\n    )"
  );
  if (src === before) {
    console.log('  WARNING: filter pattern not found in AiReadingView.tsx');
    console.log('           You will need to edit this file manually.');
  }
  return src;
});

// ═══════════════════════════════════════════════════════════════
// 4. Wire the click-through route
// ═══════════════════════════════════════════════════════════════
patch('src/features/ai-reading/ReadingArticleView.tsx', (src) => {
  // Add the import if missing
  if (!src.includes("from './DailyReadingView'")) {
    src = src.replace(
      /^(import .*from ['"]\.\/components\/ArticleTOC['"];?.*)$/m,
      "$1\nimport { DailyReadingView } from './DailyReadingView';"
    );
  }

  // Add the branch if missing, right after the profile line
  if (!src.includes("categoryId === 'daily-reading'")) {
    src = src.replace(
      /(const profile = useActiveProfile\(\);)/,
      `$1\n\n  // Structured situations get their own view.\n  if (categoryId === 'daily-reading') {\n    return <DailyReadingView />;\n  }`
    );
  }

  return src;
});

console.log('\nDone.\n');
console.log('Next:');
console.log('  npm run build');
console.log('  npm run dev   and open http://localhost:5173/reading');
console.log('  you should see 11 cards; clicking the last one opens the daily view');
console.log('');
console.log('Then commit:');
console.log('  git add -A');
console.log('  git commit -m "finish daily-reading: card in grid, full view wired"');
console.log('');
