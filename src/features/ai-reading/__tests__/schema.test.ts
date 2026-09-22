import { describe, it, expect } from 'vitest';
import {
  distributeWords,
  buildTemplate,
  renderTemplate,
  validateArticle,
  formatValidation,
  SCHEMA_VERSION,
} from '../schema';
import type { ReadingCategory, SectionSpec } from '../categories';

// ─── Fixtures ────────────────────────────────────────────────────────

const proseSections: SectionSpec[] = [
  { title: 'Section One', guide: 'Guide one.' },
  { title: 'Section Two', guide: 'Guide two.' },
  { title: 'Section Three', guide: 'Guide three.' },
];

function makeCategory(overrides: Partial<ReadingCategory> = {}): ReadingCategory {
  return {
    id: 'full-life',
    title: 'Test Reading',
    icon: 'Sparkles',
    voice: 'Write clearly.',
    sanskrit: 'परीक्षा',
    tagline: 'A test tagline',
    description: 'A test description',
    accent: 'amber',
    estimatedWords: 1000,
    estimatedMinutes: 5,
    sections: proseSections,
    defaults: { tone: 'traditional', language: 'English', length: 1000 },
    ...overrides,
  };
}

function buildArticle(titles: string[], body = 'word '.repeat(400)): string {
  return titles
    .map((t, i) => `## ${String(i + 1).padStart(2, '0')}. ${t}\n\n${body}`)
    .join('\n\n');
}

// ─── distributeWords ─────────────────────────────────────────────────

describe('distributeWords', () => {
  it('splits evenly among non-blessing sections', () => {
    const result = distributeWords(proseSections, 900);
    expect(result).toHaveLength(3);
    expect(result[0]).toBe(300);
    expect(result[1]).toBe(300);
    expect(result[2]).toBe(300);
  });

  it('gives blessing sections a fixed budget', () => {
    const sections: SectionSpec[] = [
      { title: 'A', guide: '' },
      { title: 'B', guide: '' },
      { title: 'Blessing', guide: '', render: 'blessing' },
    ];
    const result = distributeWords(sections, 820);
    expect(result[0]).toBe(400);
    expect(result[1]).toBe(400);
    expect(result[2]).toBe(20);
  });

  it('honours explicit wordTarget as a weight', () => {
    const sections: SectionSpec[] = [
      { title: 'Short', guide: '', wordTarget: 1 },
      { title: 'Long',  guide: '', wordTarget: 3 },
    ];
    const result = distributeWords(sections, 400);
    expect(result[0]).toBe(100);
    expect(result[1]).toBe(300);
  });

  it('enforces a 40-word minimum per section', () => {
    const sections: SectionSpec[] = Array.from({ length: 5 }, (_, i) => ({
      title: `S${i}`,
      guide: '',
    }));
    const result = distributeWords(sections, 50);
    for (const w of result) {
      expect(w).toBeGreaterThanOrEqual(40);
    }
  });
});

// ─── buildTemplate ───────────────────────────────────────────────────

describe('buildTemplate', () => {
  it('produces a version string carrying the id and schema version', () => {
    const t = buildTemplate(makeCategory());
    expect(t.version).toContain('full-life');
    expect(t.version).toContain(SCHEMA_VERSION);
  });

  it('carries the target word count', () => {
    const t = buildTemplate(
      makeCategory({
        defaults: { tone: 'traditional', language: 'English', length: 2000 },
      })
    );
    expect(t.totalWords).toBe(2000);
  });

  it('attaches a wordTarget to every section', () => {
    const t = buildTemplate(makeCategory());
    expect(t.sections).toHaveLength(3);
    for (const s of t.sections) {
      expect(typeof s.wordTarget).toBe('number');
      expect(s.wordTarget).toBeGreaterThan(0);
    }
  });
});

// ─── renderTemplate ──────────────────────────────────────────────────

describe('renderTemplate', () => {
  it('opens with the ARTICLE TEMPLATE directive', () => {
    const out = renderTemplate(buildTemplate(makeCategory()));
    expect(out).toMatch(/ARTICLE TEMPLATE/);
  });

  it('mentions every section title', () => {
    const t = buildTemplate(makeCategory());
    const out = renderTemplate(t);
    for (const s of t.sections) {
      expect(out).toContain(s.title);
    }
  });

  it('numbers sections 01, 02, ...', () => {
    const out = renderTemplate(buildTemplate(makeCategory()));
    expect(out).toContain('## 01. Section One');
    expect(out).toContain('## 02. Section Two');
    expect(out).toContain('## 03. Section Three');
  });

  it('closes with the total word target', () => {
    const t = buildTemplate(
      makeCategory({
        defaults: { tone: 'traditional', language: 'English', length: 1234 },
      })
    );
    expect(renderTemplate(t)).toContain('~1234 words');
  });
});

// ─── validateArticle ─────────────────────────────────────────────────

describe('validateArticle', () => {
  it('passes when sections match, in order', () => {
    const t = buildTemplate(makeCategory());
    const text = buildArticle(['Section One', 'Section Two', 'Section Three']);
    const r = validateArticle(text, t);
    expect(r.ok).toBe(true);
    expect(r.issues).toHaveLength(0);
  });

  it('flags a missing section', () => {
    const t = buildTemplate(makeCategory());
    const text = buildArticle(['Section One', 'Section Two']);
    const r = validateArticle(text, t);
    expect(r.ok).toBe(false);
    expect(
      r.issues.some((i) => i.kind === 'missing' && i.section === 'Section Three')
    ).toBe(true);
  });

  it('flags an extra section', () => {
    const t = buildTemplate(makeCategory());
    const text = buildArticle([
      'Section One',
      'Section Two',
      'Section Three',
      'Bonus',
    ]);
    const r = validateArticle(text, t);
    expect(r.ok).toBe(false);
    expect(r.issues.some((i) => i.kind === 'extra' && i.section === 'Bonus')).toBe(
      true
    );
  });

  it('flags reordered sections', () => {
    const t = buildTemplate(makeCategory());
    const text = buildArticle(['Section Two', 'Section One', 'Section Three']);
    const r = validateArticle(text, t);
    expect(r.ok).toBe(false);
    expect(r.issues.some((i) => i.kind === 'reordered')).toBe(true);
  });

  it('flags an empty section body', () => {
    const t = buildTemplate(makeCategory());
    const text =
      '## 01. Section One\n\nHello.\n\n' +
      '## 02. Section Two\n\n' + 'word '.repeat(400) + '\n\n' +
      '## 03. Section Three\n\n' + 'word '.repeat(400);
    const r = validateArticle(text, t);
    expect(r.ok).toBe(false);
    expect(
      r.issues.some((i) => i.kind === 'empty' && i.section === 'Section One')
    ).toBe(true);
  });

  it('does NOT flag a short blessing as empty', () => {
    const sections: SectionSpec[] = [
      { title: 'Main', guide: '' },
      { title: 'Closing Blessing', guide: '', render: 'blessing' },
    ];
    const cat = makeCategory({
      sections,
      defaults: { tone: 'traditional', language: 'English', length: 500 },
    });
    const t = buildTemplate(cat);
    const text =
      '## 01. Main\n\n' + 'word '.repeat(400) + '\n\n' +
      '## 02. Closing Blessing\n\nॐ शान्तिः शान्तिः शान्तिः।';
    const r = validateArticle(text, t);
    expect(
      r.issues.some(
        (i) => i.kind === 'empty' && i.section === 'Closing Blessing'
      )
    ).toBe(false);
  });

  it('records word-count drift as a note, not an issue', () => {
    const t = buildTemplate(
      makeCategory({
        defaults: { tone: 'traditional', language: 'English', length: 3000 },
      })
    );
    const text = buildArticle(
      ['Section One', 'Section Two', 'Section Three'],
      'short '.repeat(30)
    );
    const r = validateArticle(text, t);
    expect(r.notes.some((n) => n.kind === 'short')).toBe(true);
    expect(
      r.issues.filter((i) => (i as { kind: string }).kind === 'short')
    ).toHaveLength(0);
  });

  it('normalizes titles for comparison (case + whitespace)', () => {
    const t = buildTemplate(makeCategory());
    const text =
      '## 01. section one\n\n' + 'x '.repeat(400) + '\n\n' +
      '## 02. SECTION TWO\n\n' + 'x '.repeat(400) + '\n\n' +
      '## 03. Section  Three\n\n' + 'x '.repeat(400);
    const r = validateArticle(text, t);
    expect(r.issues.filter((i) => i.kind === 'missing')).toHaveLength(0);
  });
});

// ─── formatValidation ────────────────────────────────────────────────

describe('formatValidation', () => {
  it('returns a success string when ok and no notes', () => {
    const t = buildTemplate(makeCategory());
    const text = buildArticle(['Section One', 'Section Two', 'Section Three']);
    const r = validateArticle(text, t);
    expect(formatValidation(r)).toMatch(/All sections present/);
  });

  it('mentions the failing section name', () => {
    const t = buildTemplate(makeCategory());
    const text = buildArticle(['Section One', 'Section Two']);
    const r = validateArticle(text, t);
    const out = formatValidation(r);
    expect(out).toContain('missing');
    expect(out).toContain('Section Three');
  });
});