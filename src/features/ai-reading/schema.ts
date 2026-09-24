/**
 * Article schema — the contract between a ReadingCategory and the AI.
 *
 *   buildTemplate()   → produces an ArticleTemplate from a category
 *   renderTemplate()  → renders the template as a verbatim prompt block
 *   validateArticle() → checks a generated article against its template
 *   formatValidation()→ one-line human summary of a ValidationResult
 *
 * Bump SCHEMA_VERSION when the shape of the prompt block changes.
 */
import { parseArticle, countWords } from './markdown';
import type { ReadingCategory, SectionSpec } from './categories';

export const SCHEMA_VERSION = '1.1.0';

const BLESSING_WORDS = 20;
const EMPTY_THRESHOLD = 10;

/** Advisory band for total word count. Outside this range → a note, never a fail. */
const WORD_COUNT_LOW = 0.5;
const WORD_COUNT_HIGH = 1.75;

export interface ArticleTemplate {
  version: string;
  sections: (SectionSpec & { wordTarget: number })[];
  totalWords: number;
}

export interface ValidationIssue {
  kind: 'missing' | 'extra' | 'reordered' | 'empty';
  section?: string;
  detail: string;
}

export interface ValidationNote {
  kind: 'short' | 'long';
  detail: string;
}

export interface ValidationResult {
  ok: boolean;
  issues: ValidationIssue[];
  notes: ValidationNote[];
  expectedTitles: string[];
  foundTitles: string[];
  totalWords: number;
  targetWords: number;
  wordsPerSection: number[];
}

// ─────────────────────────────────────────────────────────────────────
// Word distribution
// ─────────────────────────────────────────────────────────────────────

export function distributeWords(
  sections: SectionSpec[],
  totalWords: number
): number[] {
  const blessingCount = sections.filter((s) => s.render === 'blessing').length;
  const fixedBudget = blessingCount * BLESSING_WORDS;
  const remaining = Math.max(100, totalWords - fixedBudget);

  const weights = sections.map((s) =>
    s.render === 'blessing' ? 0 : s.wordTarget ?? 1
  );
  const totalWeight = weights.reduce((a, b) => a + b, 0) || 1;

  return sections.map((s, i) => {
    if (s.render === 'blessing') return BLESSING_WORDS;
    return Math.max(40, Math.round((weights[i] / totalWeight) * remaining));
  });
}

// ─────────────────────────────────────────────────────────────────────
// Template builder
// ─────────────────────────────────────────────────────────────────────

export function buildTemplate(category: ReadingCategory): ArticleTemplate {
  const totalWords = category.defaults.length;
  const targets = distributeWords(category.sections, totalWords);
  return {
    version: `${category.id}@${totalWords}@${SCHEMA_VERSION}`,
    sections: category.sections.map((s, i) => ({ ...s, wordTarget: targets[i] })),
    totalWords,
  };
}

// ─────────────────────────────────────────────────────────────────────
// Template renderer
// ─────────────────────────────────────────────────────────────────────

export function renderTemplate(template: ArticleTemplate): string {
  const n = template.sections.length;
  const header = [
    'ARTICLE TEMPLATE — follow exactly.',
    '',
    `Produce exactly ${n} sections in this order. Each section MUST begin with`,
    'a heading line in this exact format:',
    '',
    '    ## NN. Title',
    '',
    'Where NN is the two-digit number shown below, and Title is the section',
    'title shown below, verbatim. Do not merge, skip, reorder, or rename',
    'sections. Do not add any section not listed. Do not add a preamble or',
    'a closing note. Begin directly with "## 01. ".',
    '',
    'Section allocation:',
    '',
  ].join('\n');

  const body = template.sections
    .map((s, i) => {
      const num = String(i + 1).padStart(2, '0');
      const words =
        s.render === 'blessing' ? 'one sentence' : `~${s.wordTarget} words`;
      return `## ${num}. ${s.title}\n    ${words}. ${s.guide}`;
    })
    .join('\n\n');

  const footer = `\n\nTotal: ~${template.totalWords} words across all sections.`;

  return header + body + footer;
}

// ─────────────────────────────────────────────────────────────────────
// Validator
// ─────────────────────────────────────────────────────────────────────

function normalize(s: string): string {
  return s.toLowerCase().replace(/\s+/g, ' ').trim();
}

function sectionWordCount(section: {
  blocks: Array<{ text?: string; items?: string[] }>;
}): number {
  let total = 0;
  for (const b of section.blocks) {
    if (b.text) total += countWords(b.text);
    if (b.items) total += b.items.reduce((a, item) => a + countWords(item), 0);
  }
  return total;
}

export function validateArticle(
  text: string,
  template: ArticleTemplate
): ValidationResult {
  const parsed = parseArticle(text).sections;
  const foundTitles = parsed.map((s) => s.title);
  const expectedTitles = template.sections.map((s) => s.title);

  const foundSet = new Set(foundTitles.map(normalize));
  const expectedSet = new Set(expectedTitles.map(normalize));

  const issues: ValidationIssue[] = [];
  const notes: ValidationNote[] = [];

  // 1. Missing sections
  for (const t of expectedTitles) {
    if (!foundSet.has(normalize(t))) {
      issues.push({
        kind: 'missing',
        section: t,
        detail: `Section "${t}" was expected but not found in the output.`,
      });
    }
  }

  // 2. Extra sections
  for (const t of foundTitles) {
    if (!expectedSet.has(normalize(t))) {
      issues.push({
        kind: 'extra',
        section: t,
        detail: `Unexpected section "${t}" appeared in the output.`,
      });
    }
  }

  // 3. Order — only over the intersection
  const foundFiltered = foundTitles
    .map(normalize)
    .filter((t) => expectedSet.has(t));
  const expectedFiltered = expectedTitles
    .map(normalize)
    .filter((t) => foundSet.has(t));
  if (foundFiltered.length === expectedFiltered.length) {
    for (let i = 0; i < foundFiltered.length; i++) {
      if (foundFiltered[i] !== expectedFiltered[i]) {
        issues.push({
          kind: 'reordered',
          detail: `Section order differs at position ${i + 1} (expected "${
            expectedTitles[i]
          }", found "${foundTitles[i]}").`,
        });
        break;
      }
    }
  }

  // 4. Empty sections — aligned by title, blessing-exempt
  for (const spec of template.sections) {
    if (spec.render === 'blessing') continue;
    const found = parsed.find((p) => normalize(p.title) === normalize(spec.title));
    if (!found) continue; // already reported as 'missing'
    const words = sectionWordCount(found);
    if (words < EMPTY_THRESHOLD) {
      issues.push({
        kind: 'empty',
        section: spec.title,
        detail: `Section "${spec.title}" has only ${words} word(s).`,
      });
    }
  }

  // 5. Word count — advisory note, never a failure
  const totalWords = countWords(text);
  const targetWords = template.totalWords;
  const ratio = targetWords > 0 ? totalWords / targetWords : 1;
  if (ratio < WORD_COUNT_LOW) {
    notes.push({
      kind: 'short',
      detail: `${totalWords} words vs ~${targetWords} target (${Math.round(
        ratio * 100
      )}%). Shorter than intended — regenerate if you want it expanded.`,
    });
  } else if (ratio > WORD_COUNT_HIGH) {
    notes.push({
      kind: 'long',
      detail: `${totalWords} words vs ~${targetWords} target (${Math.round(
        ratio * 100
      )}%). Longer than intended.`,
    });
  }

  return {
    ok: issues.length === 0,
    issues,
    notes,
    expectedTitles,
    foundTitles,
    totalWords,
    targetWords,
    wordsPerSection: parsed.map(sectionWordCount),
  };
}

// ─────────────────────────────────────────────────────────────────────
// Human-readable summary
// ─────────────────────────────────────────────────────────────────────

export function formatValidation(v: ValidationResult, max = 2): string {
  if (v.ok && v.notes.length === 0) {
    return 'All sections present, order correct.';
  }
  const parts: string[] = [];
  const shown = v.issues.slice(0, max).map((i) => {
    if (i.section) return `${i.kind} · ${i.section}`;
    return `${i.kind} · ${i.detail}`;
  });
  parts.push(...shown);
  const extra = v.issues.length > max ? ` (+${v.issues.length - max} more)` : '';
  if (extra) parts.push(extra);
  if (v.notes.length > 0) parts.push(v.notes[0].detail);
  return parts.join('  ·  ');
}