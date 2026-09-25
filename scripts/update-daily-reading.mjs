// scripts/update-daily-reading.mjs
//
// Applies the voice + markdown-strip fixes to daily-reading.
// Safe to re-run.

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

console.log('\nUpdating daily-reading...\n');

// ═══════════════════════════════════════════════════════════════
// 1. Hook — add stripMd and wrap parsed string fields
// ═══════════════════════════════════════════════════════════════
patch('src/features/ai-reading/hooks/useDailyReading.ts', (src) => {
  // ── Add stripMd before parsePayload if missing ────────────────
  if (!src.includes('function stripMd')) {
    src = src.replace(
      'function parsePayload(raw: string): DailyReadingPayload | null {',
      [
        'function stripMd(s: string): string {',
        '  return s',
        "    .replace(/\\*\\*([^*]+)\\*\\*/g, '$1')",
        "    .replace(/\\*([^*]+)\\*/g, '$1')",
        "    .replace(/`([^`]+)`/g, '$1')",
        "    .replace(/^\\s*[-*+]\\s+/gm, '')",
        "    .replace(/\\s+/g, ' ')",
        "    .trim();",
        '}',
        '',
        'function parsePayload(raw: string): DailyReadingPayload | null {',
      ].join('\n')
    );
  }

  // ── Wrap every String(p.xxx ?? '') with stripMd ───────────────
  const stringFields = [
    'vara_note', 'panchang_note', 'dasha_note', 'transit_note',
    'wear', 'eat', 'avoid_eating', 'mantra', 'summary',
  ];
  for (const f of stringFields) {
    const re = new RegExp(
      `${f}:\\s*String\\(p\\.${f}\\s*\\?\\?\\s*''\\)`,
      'g'
    );
    src = src.replace(re, `${f}: stripMd(String(p.${f} ?? ''))`);
  }

  // ── Wrap array items with stripMd ─────────────────────────────
  for (const f of ['do', 'avoid']) {
    const re = new RegExp(
      `${f}:\\s*Array\\.isArray\\(p\\.${f}\\)\\s*\\?\\s*p\\.${f}\\.map\\(String\\)\\s*:\\s*\\[\\]`,
      'g'
    );
    src = src.replace(
      re,
      `${f}: Array.isArray(p.${f}) ? p.${f}.map((x: unknown) => stripMd(String(x))) : []`
    );
  }

  // ── Same wrapping in readPayload (for old records) ────────────
  for (const f of stringFields) {
    const re = new RegExp(
      `${f}:\\s*String\\(p\\.${f}\\s*\\?\\?\\s*''\\)`,
      'g'
    );
    src = src.replace(re, `${f}: stripMd(String(p.${f} ?? ''))`);
  }
  for (const f of ['do', 'avoid']) {
    const re = new RegExp(
      `${f}:\\s*Array\\.isArray\\(p\\.${f}\\)\\s*\\?\\s*p\\.${f}\\.map\\(String\\)\\s*:\\s*\\[\\]`,
      'g'
    );
    src = src.replace(
      re,
      `${f}: Array.isArray(p.${f}) ? p.${f}.map((x: unknown) => stripMd(String(x))) : []`
    );
  }

  return src;
});

// ═══════════════════════════════════════════════════════════════
// 2. Pack — bump version, add changelog entry, replace situation
// ═══════════════════════════════════════════════════════════════
patch('src/ai/packs/builtin/daily-reading.json', (src) => {
  const pack = JSON.parse(src);

  pack.version = '1.1.0';

  if (!pack.changelog.some((c) => c.version === '1.1.0')) {
    pack.changelog.push({
      version: '1.1.0',
      date: new Date().toISOString().slice(0, 10),
      notes: 'Warmer voice. Strip markdown from output. Shorter fields.',
    });
  }

  const situation = pack.situations[0];
  situation.situation = [
    "You are writing today's personal guidance for one reader, as a warm Jyotishi would speak to them directly. Not a report. Not a checklist. A short, human note that could be read aloud.",
    '',
    'VOICE — follow exactly:',
    "- Second person. 'You' and 'your.' Never 'the native' or 'one.'",
    "- Plain, warm sentences. No corporate phrasing: no 'leverage', 'optimize', 'prioritize', 'foster', 'amplify', 'harness', 'align'. No 'in decision-making'.",
    '- Do not echo facts back. The reader can already see the tithi, nakshatra, and dasha above. Interpret them — say what they mean for today.',
    '- Each field: 1-2 short sentences. Not 3-4. Not 5.',
    '- No bold, italics, asterisks, backticks, or bullet symbols anywhere. Plain text only.',
    '- No parenthetical Sanskrit translations. Weave the meaning into the sentence if you must.',
    '- Never tell the reader to consult an astrologer. Never recommend rituals they cannot do at home.',
    '',
    'Return ONLY a single JSON object with exactly these twelve fields, no prose, no fences, no backticks:',
    '',
    '{',
    '  "vara_note": "1-2 sentences on what today\'s weekday ruler means for the reader, spoken directly.",',
    '  "panchang_note": "1-2 sentences interpreting today\'s tithi, nakshatra, and yoga — not listing them.",',
    '  "dasha_note": "1-2 sentences on the current Mahadasha and Antardasha, and what they ask of the reader.",',
    '  "transit_note": "1 short sentence on the single most important active transit.",',
    '  "wear": "1 short sentence. A colour or two, and why.",',
    '  "eat": "1 short sentence. What to favour, and why.",',
    '  "avoid_eating": "1 short sentence. What to skip, and why.",',
    '  "do": ["three short imperatives, each under 15 words, each a physical act not a mood"],',
    '  "avoid": ["three short imperatives, each under 15 words"],',
    '  "mantra": "One mantra in plain text, then a repetition count and the time of day. No asterisks, no quotes around the mantra.",',
    '  "color": "a single colour name in lowercase",',
    '  "summary": "One short plain line capturing the shape of the day."',
    '}',
    '',
    'Rules:',
    '1. Every field must be filled.',
    '2. Every claim must trace back to a value in DATA.',
    '3. No markdown. No bold. No asterisks. No bullet symbols. No backticks.',
    '4. Total across all fields: 150-250 words.',
    '5. If a field would repeat something from an earlier field, say less, not more.',
  ].join('\n');

  return JSON.stringify(pack, null, 2) + '\n';
});

console.log('\nDone.\n');
console.log('Next:');
console.log('  npm run build');
console.log('  npm run dev');
console.log('');
console.log('To force regeneration of today\'s cached reading, open the');
console.log('browser devtools (F12) -> Application -> Local Storage ->');
console.log('http://localhost:5173 -> delete "kundaliyatra-reading-library"');
console.log('then reload /reading/daily-reading.');
console.log('');
