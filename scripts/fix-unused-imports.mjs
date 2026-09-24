// scripts/fix-unused-imports.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const file = path.join(ROOT, 'src/features/ai-reading/ReadingArticleView.tsx');
let src = fs.readFileSync(file, 'utf8');

// 1. useEffect → useMemo, useState
src = src.replace(
  "import { useEffect, useMemo, useState } from 'react';",
  "import { useMemo, useState } from 'react';"
);

// 2. Remove the luxon DateTime import line
src = src.replace(
  "import { DateTime } from 'luxon';\n",
  ""
);

// 3. ACCENT_STYLES → resolveAccent only
src = src.replace(
  "import { ACCENT_STYLES, resolveAccent } from './accents';",
  "import { resolveAccent } from './accents';"
);

fs.writeFileSync(file, src, 'utf8');
console.log('patched src/features/ai-reading/ReadingArticleView.tsx');
