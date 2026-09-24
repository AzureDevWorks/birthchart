/**
 * Text utilities for the Daily Rashi tile.
 *
 * v2 additions:
 *  - parseDailyRashiJson() - extract { headline, action, avoid } from
 *    whatever the model returned, tolerating markdown fences and stray
 *    prose around the JSON object.
 *
 * v1 functions are kept for the fallback path.
 */

export interface ParsedDailyRashi {
  headline: string;
  action: string;
  avoid: string;
}

function stripInline(s: string): string {
  return s
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Extracts the three structured fields from a model response.
 * Returns null if nothing parseable is found.
 */
export function parseDailyRashiJson(raw: string): ParsedDailyRashi | null {
  if (!raw) return null;

  let candidate = raw.trim();

  // Strip markdown fences if present: ```json ... ``` or ``` ... ```
  const fence = candidate.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence) candidate = fence[1].trim();

  // Find the outermost JSON object.
  const first = candidate.indexOf('{');
  const last = candidate.lastIndexOf('}');
  if (first < 0 || last <= first) return null;
  candidate = candidate.slice(first, last + 1);

  let parsed: any;
  try {
    parsed = JSON.parse(candidate);
  } catch {
    return null;
  }

  if (!parsed || typeof parsed !== 'object') return null;

  const headline =
    typeof parsed.headline === 'string' ? stripInline(parsed.headline) : '';
  const action =
    typeof parsed['action'] === 'string'
      ? stripInline(parsed['action'])
      : typeof parsed['do'] === 'string'
        ? stripInline(parsed['do'])
        : '';
  const avoid =
    typeof parsed['avoid'] === 'string' ? stripInline(parsed['avoid']) : '';

  if (!headline && !action && !avoid) return null;

  return { headline, action, avoid };
}

/**
 * Strips markdown from a single paragraph of prose. Idempotent.
 * Retained for rendering v1 records and for the fallback path.
 */
export function cleanDailyRashiText(input: string): string {
  let text = input;

  text = text.replace(/`([^`]+)`/g, '$1');
  text = text.replace(/\*\*([^*]+)\*\*/g, '$1');
  text = text.replace(/__([^_]+)__/g, '$1');
  text = text.replace(/\*([^*]+)\*/g, '$1');
  text = text.replace(/(^|\s)_([^_]+)_(\s|$)/g, '$1$2$3');
  text = text.replace(/^\s*#{1,6}\s+/gm, '');
  text = text.replace(/^\s*[-*+]\s+/gm, '');
  text = text.replace(/^\s*\d+\.\s+/gm, '');
  text = text.replace(/^\s*(?:[-*_]\s*){3,}$/gm, '');
  text = text.replace(/^\s*>\s?/gm, '');
  text = text.replace(/\n{3,}/g, '\n\n');

  return text.trim();
}

/**
 * Devanagari name for each English rashi.
 */
export const RASHI_DEVANAGARI: Record<string, string> = {
  Aries:       '\u092E\u0947\u0937',
  Taurus:      '\u0935\u0943\u0937\u092D',
  Gemini:      '\u092E\u093F\u0925\u0941\u0928',
  Cancer:      '\u0915\u0930\u094D\u0915',
  Leo:         '\u0938\u093F\u0902\u0939',
  Virgo:       '\u0915\u0928\u094D\u092F\u093E',
  Libra:       '\u0924\u0941\u0932\u093E',
  Scorpio:     '\u0935\u0943\u0936\u094D\u091A\u093F\u0915',
  Sagittarius: '\u0927\u0928\u0941',
  Capricorn:   '\u092E\u0915\u0930',
  Aquarius:    '\u0915\u0941\u092E\u094D\u092D',
  Pisces:      '\u092E\u0940\u0928',
};

export function rashiDevanagari(name: string | undefined | null): string | null {
  if (!name) return null;
  return RASHI_DEVANAGARI[name] ?? null;
}