import { describe, it, expect } from 'vitest';
import {
  parseInline,
  parseArticle,
  countWords,
  readingMinutes,
} from '../markdown';

// ─── parseInline ─────────────────────────────────────────────────────

describe('parseInline', () => {
  it('returns a single text token for plain text', () => {
    const t = parseInline('hello world');
    expect(t).toEqual([{ type: 'text', content: 'hello world' }]);
  });

  it('parses **bold**', () => {
    const t = parseInline('a **bold** b');
    expect(t).toHaveLength(3);
    expect(t[1]).toEqual({ type: 'bold', content: 'bold' });
  });

  it('parses *italic*', () => {
    const t = parseInline('a *italic* b');
    expect(t).toHaveLength(3);
    expect(t[1]).toEqual({ type: 'italic', content: 'italic' });
  });

  it('parses `code`', () => {
    const t = parseInline('a `code` b');
    expect(t).toHaveLength(3);
    expect(t[1]).toEqual({ type: 'code', content: 'code' });
  });

  it('handles mixed inline markup', () => {
    const t = parseInline('p **b** *i* `c` e');
    const types = t.map((x) => x.type);
    expect(types).toEqual([
      'text',
      'bold',
      'text',
      'italic',
      'text',
      'code',
      'text',
    ]);
  });
});

// ─── parseArticle ────────────────────────────────────────────────────

describe('parseArticle', () => {
  it('parses a single section', () => {
    const { sections } = parseArticle('## 01. Intro\n\nHello world.');
    expect(sections).toHaveLength(1);
    expect(sections[0].title).toBe('Intro');
    expect(sections[0].slug).toBe('intro');
  });

  it('parses multiple sections in order', () => {
    const text = '## 01. First\n\nBody A.\n\n## 02. Second\n\nBody B.';
    const { sections } = parseArticle(text);
    expect(sections).toHaveLength(2);
    expect(sections[0].title).toBe('First');
    expect(sections[1].title).toBe('Second');
  });

  it('marks blessing sections (English)', () => {
    const { sections } = parseArticle('## 09. Closing Blessing\n\nॐ.');
    expect(sections[0].isBlessing).toBe(true);
  });

  it('marks blessing sections (Devanagari)', () => {
    const { sections } = parseArticle('## 09. आशीर्वाद\n\nॐ.');
    expect(sections[0].isBlessing).toBe(true);
  });

  it('strips the leading numbering from the title', () => {
    const { sections } = parseArticle('## 03. Career and Vocation\n\nBody.');
    expect(sections[0].title).toBe('Career and Vocation');
  });

  it('converts *** into a rule block', () => {
    const { sections } = parseArticle('## 01. S\n\nBefore.\n\n***\n\nAfter.');
    expect(sections[0].blocks.map((b) => b.type)).toContain('rule');
  });

  it('converts --- into a rule block', () => {
    const { sections } = parseArticle('## 01. S\n\nBefore.\n\n---\n\nAfter.');
    expect(sections[0].blocks.map((b) => b.type)).toContain('rule');
  });

  it('parses bulleted lists', () => {
    const { sections } = parseArticle('## 01. S\n\n- one\n- two\n- three');
    const list = sections[0].blocks.find((b) => b.type === 'list');
    expect(list).toBeDefined();
    expect(list!.ordered).toBe(false);
    expect(list!.items).toEqual(['one', 'two', 'three']);
  });

  it('parses numbered lists', () => {
    const { sections } = parseArticle('## 01. S\n\n1. one\n2. two\n3. three');
    const list = sections[0].blocks.find((b) => b.type === 'list');
    expect(list!.ordered).toBe(true);
    expect(list!.items).toEqual(['one', 'two', 'three']);
  });

  it('detects Devanagari-heavy paragraphs as shloka', () => {
    const { sections } = parseArticle(
      '## 01. S\n\nॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्।'
    );
    expect(sections[0].blocks[0].type).toBe('shloka');
  });

  it('keeps English paragraphs as paragraphs', () => {
    const { sections } = parseArticle(
      '## 01. S\n\nThe Moon sits in Scorpio and the Sun in Taurus.'
    );
    expect(sections[0].blocks[0].type).toBe('paragraph');
  });

  it('falls back to a Reading section when input has no heading', () => {
    const { sections } = parseArticle('Just some text with no heading.');
    expect(sections).toHaveLength(1);
    expect(sections[0].title).toBe('Reading');
  });

  it('collapses whitespace inside paragraphs', () => {
    const { sections } = parseArticle('## 01. S\n\nMultiple    spaces   here.');
    expect(sections[0].blocks[0].text).toBe('Multiple spaces here.');
  });
});

// ─── countWords ──────────────────────────────────────────────────────

describe('countWords', () => {
  it('counts whitespace-separated tokens', () => {
    expect(countWords('one two three')).toBe(3);
  });

  it('handles extra whitespace', () => {
    expect(countWords('  one   two  ')).toBe(2);
  });

  it('returns 0 for empty string', () => {
    expect(countWords('')).toBe(0);
    expect(countWords('   ')).toBe(0);
  });
});

// ─── readingMinutes ──────────────────────────────────────────────────

describe('readingMinutes', () => {
  it('rounds to nearest minute at 200 wpm', () => {
    expect(readingMinutes(200)).toBe(1);
    expect(readingMinutes(1000)).toBe(5);
    expect(readingMinutes(400)).toBe(2);
  });

  it('returns at least 1 minute for tiny counts', () => {
    expect(readingMinutes(10)).toBe(1);
    expect(readingMinutes(0)).toBe(1);
  });
});