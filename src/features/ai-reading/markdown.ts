export interface InlineToken {
  type: 'text' | 'bold' | 'italic' | 'code';
  content: string;
}

export interface ArticleBlock {
  type: 'paragraph' | 'list' | 'rule' | 'shloka';
  text?: string;
  items?: string[];
  ordered?: boolean;
}

export interface ArticleSection {
  title: string;
  slug: string;
  blocks: ArticleBlock[];
  isBlessing: boolean;
}

const HEADING_RE = /^##\s+(?:\d{1,2}\.\s*)?(.+)$/;
const RULE_RE = /^\s*(?:\*{3,}|-{3,}|_{3,})\s*$/;
const ULIST_RE = /^\s*[-*+]\s+(.+)$/;
const OLIST_RE = /^\s*\d+[.)]\s+(.+)$/;
const DEVANAGARI_RE = /[\u0900-\u097F]/;

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 60);
}

/** Parse inline markdown: **bold**, *italic*, `code`. */
export function parseInline(text: string): InlineToken[] {
  const tokens: InlineToken[] = [];
  const re = /(\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`)/g;
  let last = 0;
  let m: RegExpExecArray | null;

  while ((m = re.exec(text)) !== null) {
    if (m.index > last) tokens.push({ type: 'text', content: text.slice(last, m.index) });
    if (m[2] !== undefined) tokens.push({ type: 'bold', content: m[2] });
    else if (m[3] !== undefined) tokens.push({ type: 'italic', content: m[3] });
    else if (m[4] !== undefined) tokens.push({ type: 'code', content: m[4] });
    last = m.index + m[0].length;
  }
  if (last < text.length) tokens.push({ type: 'text', content: text.slice(last) });
  return tokens;
}

export function parseArticle(text: string): { sections: ArticleSection[] } {
  const lines = text.split(/\r?\n/);
  const sections: ArticleSection[] = [];
  let current: ArticleSection | null = null;
  let buffer: string[] = [];

  const flushBlocks = () => {
    if (!current) return;
    const blocks: ArticleBlock[] = [];
    let para: string[] = [];
    let listItems: string[] = [];
    let listOrdered = false;

    const flushPara = () => {
      if (!para.length) return;
      const joined = para.join(' ').replace(/\s+/g, ' ').trim();
      para = [];
      if (!joined) return;
      const devCount = (joined.match(new RegExp(DEVANAGARI_RE, 'g')) || []).length;
      const isDev = devCount > 0 && devCount / joined.length > 0.35;
      blocks.push({ type: isDev ? 'shloka' : 'paragraph', text: joined });
    };

    const flushList = () => {
      if (!listItems.length) return;
      blocks.push({ type: 'list', items: listItems, ordered: listOrdered });
      listItems = [];
    };

    for (const raw of buffer) {
      const line = raw.trim();
      if (!line) { flushPara(); flushList(); continue; }

      if (RULE_RE.test(line)) {
        flushPara(); flushList();
        blocks.push({ type: 'rule' });
        continue;
      }
      const ul = line.match(ULIST_RE);
      if (ul) {
        flushPara();
        if (listOrdered && listItems.length) flushList();
        listOrdered = false;
        listItems.push(ul[1]);
        continue;
      }
      const ol = line.match(OLIST_RE);
      if (ol) {
        flushPara();
        if (!listOrdered && listItems.length) flushList();
        listOrdered = true;
        listItems.push(ol[1]);
        continue;
      }
      flushList();
      para.push(line);
    }

    flushPara();
    flushList();

    current.blocks = blocks;
    sections.push(current);
    buffer = [];
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    const m = line.match(HEADING_RE);
    if (m) {
      flushBlocks();
      const title = m[1].trim();
      current = {
        title,
        slug: slugify(title),
        blocks: [],
        isBlessing: /blessing|आशीर्वाद|āśīrvāda/i.test(title),
      };
      continue;
    }
    if (!current && !line.trim()) continue;
    buffer.push(line);
  }
  flushBlocks();

  if (sections.length === 0) {
    sections.push({
      title: 'Reading',
      slug: 'reading',
      blocks: [{ type: 'paragraph', text }],
      isBlessing: false,
    });
  }

  return { sections };
}

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function readingMinutes(words: number): number {
  return Math.max(1, Math.round(words / 200));
}