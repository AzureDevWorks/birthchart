# scripts/install-ai-v2-core.ps1
# Installs the new AI plugin architecture. Does not delete anything.
# Safe to re-run.

$ErrorActionPreference = 'Stop'

# ─── UTF-8 no-BOM writer ─────────────────────────────────────
function Write-Utf8 {
    param([string]$Path, [string]$Content)
    $dir = Split-Path -Parent $Path
    if ($dir -and -not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }
    $enc = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText((Resolve-Path -LiteralPath (Split-Path -Parent $Path)).Path + '\' + (Split-Path -Leaf $Path), $Content, $enc)
    Write-Host "  wrote $Path" -ForegroundColor Green
}

# ─── Guard: working tree must be clean ───────────────────────
$status = git status --porcelain
if ($status) {
    Write-Host "Working tree is not clean. Commit or stash first." -ForegroundColor Red
    Write-Host $status
    exit 1
}

Write-Host "`nInstalling AI v2 core...`n" -ForegroundColor Cyan

# ══════════════════════════════════════════════════════════════
# src/ai/core/types.ts
# ══════════════════════════════════════════════════════════════
$typesTs = @'
/**
 * Core types for the AI plugin system.
 *
 * A PromptPack is a JSON document that describes how to ask the AI for
 * a specific kind of output. It composes six layers (safety, domain,
 * language, situation, data, format) into one prompt. Situations inside
 * a pack declare what data they need and how the output should look.
 *
 * Nothing in this file imports from React or from the app. It is pure
 * data description. That is what makes packs portable and forkable.
 */

export type Language = 'en' | 'hi' | 'ne';

export type SituationKind = 'article' | 'structured' | 'prose' | 'qa';

export type DataBlockId =
  | 'core-anchors'
  | 'planets'
  | 'houses'
  | 'dasha'
  | 'ashtakavarga'
  | 'special-lagnas'
  | 'arudha-padas'
  | 'aspects'
  | 'chalit'
  | 'gochar'
  | 'panchang'
  | 'sade-sati';

export interface SituationMeta {
  icon?: string;
  image?: string;
  accent?: string;
  sanskrit?: string;
  tagline?: string;
  description?: string;
  estimatedWords?: number;
  estimatedMinutes?: number;
}

export interface DataRequirement {
  blocks: DataBlockId[];
  format?: 'json' | 'markdown' | 'prose';
}

export interface SectionSpec {
  title: string;
  guide: string;
  wordTarget?: number;
  render?: 'prose' | 'verse' | 'blessing';
}

export interface SituationDef {
  id: string;
  kind: SituationKind;
  label?: string;
  meta?: SituationMeta;
  data: DataRequirement;
  situation: string;
  format?: string;
  sections?: SectionSpec[];
  outputSchema?: string;
}

export interface ChangelogEntry {
  version: string;
  date: string;
  notes: string;
}

export interface PromptPack {
  id: string;
  version: string;
  label: string;
  author: string;
  changelog: ChangelogEntry[];
  safety: string;
  domain: string;
  languages: Record<Language, string>;
  situations: SituationDef[];
}

export interface ComposedPrompt {
  system: string;
  user: string;
  layers: {
    safety: string;
    domain: string;
    language: string;
    situation: string;
    data: string;
    format: string;
  };
  meta: {
    packId: string;
    packVersion: string;
    situationId: string;
    language: Language;
  };
}
'@
Write-Utf8 'src/ai/core/types.ts' $typesTs

# ══════════════════════════════════════════════════════════════
# src/ai/core/composer.ts
# ══════════════════════════════════════════════════════════════
$composerTs = @'
/**
 * Composes a prompt from a pack, a situation, data, and a language.
 *
 * Layer order (system):  safety → domain
 * Layer order (user):    situation → format → language → data
 *
 * The layers are returned separately so the UI can show them side by
 * side and so provenance can store exactly what was sent.
 */
import type {
  ComposedPrompt,
  Language,
  PromptPack,
  SituationDef,
} from './types';

export interface ComposeOptions {
  pack: PromptPack;
  situation: SituationDef;
  data: unknown;
  language: Language;
}

const RULE = '─'.repeat(60);

export function compose(opts: ComposeOptions): ComposedPrompt {
  const { pack, situation, data, language } = opts;

  const languageLine =
    pack.languages[language] ?? pack.languages.en ?? 'Write in English.';
  const dataBlock =
    typeof data === 'string' ? data : JSON.stringify(data, null, 2);
  const situationBlock = (situation.situation ?? '').trim();
  const formatBlock = (situation.format ?? '').trim();

  const system = [pack.safety, pack.domain]
    .filter((s) => s && s.trim())
    .join('\n\n' + RULE + '\n\n');

  const userParts: string[] = [];
  userParts.push(`SITUATION\n${RULE}\n${situationBlock}`);
  if (formatBlock) {
    userParts.push(`FORMAT\n${RULE}\n${formatBlock}`);
  }
  userParts.push(`LANGUAGE\n${RULE}\n${languageLine}`);
  userParts.push(`DATA\n${RULE}\n<data>\n${dataBlock}\n</data>`);
  const user = userParts.join('\n\n');

  return {
    system,
    user,
    layers: {
      safety: pack.safety,
      domain: pack.domain,
      language: languageLine,
      situation: situationBlock,
      data: dataBlock,
      format: formatBlock,
    },
    meta: {
      packId: pack.id,
      packVersion: pack.version,
      situationId: situation.id,
      language,
    },
  };
}
'@
Write-Utf8 'src/ai/core/composer.ts' $composerTs

# ══════════════════════════════════════════════════════════════
# src/ai/core/selector.ts
# ══════════════════════════════════════════════════════════════
$selectorTs = @'
/**
 * Resolves a DataRequirement against the live sources (kundli, gochar,
 * panchang, profile) and returns only the blocks the situation asked for.
 *
 * This is why prompts stop being bloated: a situation that only cares
 * about Saturn's transit no longer receives the whole kundli.
 */
import type { DataBlockId, DataRequirement } from './types';

export interface SelectorSources {
  kundli: Record<string, any> | null;
  gochar?: Record<string, any> | null;
  panchang?: Record<string, any> | null;
  profile?: Record<string, any> | null;
}

export function select(
  req: DataRequirement,
  sources: SelectorSources
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const block of req.blocks) {
    const v = extractBlock(block, sources);
    if (v !== undefined && v !== null) out[block] = v;
  }
  return out;
}

function extractBlock(
  block: DataBlockId,
  s: SelectorSources
): unknown {
  const k = s.kundli;
  switch (block) {
    case 'core-anchors':
      if (!k) return undefined;
      return {
        lagna: k.ascendant ?? null,
        chandra: k.planets?.Moon ?? null,
        surya: k.planets?.Sun ?? null,
      };
    case 'planets':
      return k?.planets;
    case 'houses':
      return k?.houses;
    case 'dasha':
      return k?.dasha;
    case 'ashtakavarga':
      return k?.ashtakavarga;
    case 'special-lagnas':
      return k?.specialLagnas;
    case 'arudha-padas':
      return k?.arudhaPadas;
    case 'aspects':
      return k?.drishti;
    case 'chalit':
      return k?.chalit;
    case 'gochar':
      return s.gochar ?? null;
    case 'panchang':
      return s.panchang ?? null;
    case 'sade-sati':
      return s.gochar?.specialTransits?.sadeSati ?? null;
    default:
      return undefined;
  }
}
'@
Write-Utf8 'src/ai/core/selector.ts' $selectorTs

# ══════════════════════════════════════════════════════════════
# src/ai/core/registry.ts
# ══════════════════════════════════════════════════════════════
$registryTs = @'
/**
 * Resolves a situation id to a (pack, situation) pair.
 *
 * Built-in packs ship in the bundle. User packs are registered at
 * runtime (from a Zustand store that persists to localStorage).
 * User packs with the same id shadow built-in packs, so a user can
 * fork and activate without editing source.
 */
import type { PromptPack, SituationDef } from './types';
import { BUILTIN_PACKS } from '../packs/builtin';

const userPacks = new Map<string, PromptPack>();
const disabled = new Set<string>();

export function registerUserPack(pack: PromptPack): void {
  userPacks.set(pack.id, pack);
}

export function unregisterUserPack(id: string): void {
  userPacks.delete(id);
}

export function disablePack(id: string): void {
  disabled.add(id);
}

export function enablePack(id: string): void {
  disabled.delete(id);
}

export function listPacks(): PromptPack[] {
  const byId = new Map<string, PromptPack>();
  for (const p of BUILTIN_PACKS) byId.set(p.id, p);
  for (const p of userPacks.values()) byId.set(p.id, p);
  return Array.from(byId.values()).filter((p) => !disabled.has(p.id));
}

export interface Resolved {
  pack: PromptPack;
  situation: SituationDef;
}

export function resolve(situationId: string): Resolved {
  for (const pack of listPacks()) {
    const s = pack.situations.find((x) => x.id === situationId);
    if (s) return { pack, situation: s };
  }
  throw new Error(
    `No active pack provides situation "${situationId}". ` +
      `Available: ${listPacks()
        .flatMap((p) => p.situations.map((s) => s.id))
        .join(', ')}`
  );
}

export function listSituations(): Array<{
  situation: SituationDef;
  pack: PromptPack;
}> {
  const out: Array<{ situation: SituationDef; pack: PromptPack }> = [];
  for (const pack of listPacks()) {
    for (const s of pack.situations) out.push({ situation: s, pack });
  }
  return out;
}
'@
Write-Utf8 'src/ai/core/registry.ts' $registryTs

# ══════════════════════════════════════════════════════════════
# src/ai/core/index.ts
# ══════════════════════════════════════════════════════════════
$coreIndexTs = @'
export * from './types';
export { compose } from './composer';
export type { ComposeOptions } from './composer';
export { select } from './selector';
export type { SelectorSources } from './selector';
export {
  resolve,
  listPacks,
  listSituations,
  registerUserPack,
  unregisterUserPack,
  disablePack,
  enablePack,
} from './registry';
export type { Resolved } from './registry';
'@
Write-Utf8 'src/ai/core/index.ts' $coreIndexTs

# ══════════════════════════════════════════════════════════════
# src/ai/runtime/execute.ts
# ══════════════════════════════════════════════════════════════
$executeTs = @'
/**
 * Orchestrates one AI call.
 *
 *   1. resolve situation -> (pack, situation)
 *   2. select data       -> only the blocks the situation asked for
 *   3. compose prompt    -> the six layers
 *   4. call the AI       -> through the existing fallback chain
 *   5. return everything -> prompt, text, provenance
 *
 * The composed prompt is returned so callers can store it alongside
 * the output. That is how a reading stays reproducible even after the
 * pack is edited.
 */
import type { Language } from '../core/types';
import { compose } from '../core/composer';
import { resolve } from '../core/registry';
import { select, type SelectorSources } from '../core/selector';
import {
  generateWithFallback,
  type FallbackResult,
} from '@/features/ai-settings/providers';
import { getAiSettingsSnapshot } from '@/features/ai-settings/store';

export interface ExecuteOptions {
  situationId: string;
  language?: Language;
  sources: SelectorSources;
  extras?: Record<string, unknown>;
}

export interface ExecutionResult {
  ok: boolean;
  text?: string;
  error?: string;
  attempts?: FallbackResult['attempts'];
  composed: ReturnType<typeof compose>;
  providerId?: string;
  modelId?: string;
}

export async function execute(
  opts: ExecuteOptions
): Promise<ExecutionResult> {
  const { pack, situation } = resolve(opts.situationId);
  const language = opts.language ?? 'en';

  const data = select(situation.data, opts.sources);
  const composed = compose({ pack, situation, data, language });

  const snapshot = getAiSettingsSnapshot();
  const res = await generateWithFallback({
    system: composed.system,
    prompt: composed.user,
    order: snapshot.providerOrder,
    configs: snapshot.providers,
    extras: opts.extras as any,
  });

  const modelId = res.providerId
    ? snapshot.providers[res.providerId]?.preferredModel
    : undefined;

  return {
    ok: res.ok,
    text: res.text,
    error: res.error,
    attempts: res.attempts,
    composed,
    providerId: res.providerId,
    modelId,
  };
}
'@
Write-Utf8 'src/ai/runtime/execute.ts' $executeTs

# ══════════════════════════════════════════════════════════════
# src/ai/runtime/index.ts
# ══════════════════════════════════════════════════════════════
$runtimeIndexTs = @'
export { execute } from './execute';
export type { ExecuteOptions, ExecutionResult } from './execute';
'@
Write-Utf8 'src/ai/runtime/index.ts' $runtimeIndexTs

# ══════════════════════════════════════════════════════════════
# src/ai/packs/builtin/index.ts
# ══════════════════════════════════════════════════════════════
$packsIndexTs = @'
/**
 * Registers every built-in pack.
 *
 * To add a pack: drop the JSON file in this directory and add one line
 * to the array below. No other file needs to change.
 */
import type { PromptPack } from '../../core/types';

import career from './career.json';
import dailyRashi from './daily-rashi.json';

export const BUILTIN_PACKS: PromptPack[] = [
  career as unknown as PromptPack,
  dailyRashi as unknown as PromptPack,
];

export const BUILTIN_PACK_MAP: Record<string, PromptPack> =
  Object.fromEntries(BUILTIN_PACKS.map((p) => [p.id, p]));
'@
Write-Utf8 'src/ai/packs/builtin/index.ts' $packsIndexTs

# ══════════════════════════════════════════════════════════════
# src/ai/packs/builtin/daily-rashi.json
# ══════════════════════════════════════════════════════════════
$dailyRashiJson = @'
{
  "id": "kundaliyatra.daily-rashi",
  "version": "1.0.0",
  "label": "Daily Rashi",
  "author": "builtin",
  "changelog": [
    {
      "version": "1.0.0",
      "date": "2026-09-24",
      "notes": "Initial extraction from the legacy daily-rashi-prompt.ts."
    }
  ],
  "safety": "Never invent planetary positions, house placements, dasha dates, or tithi names. Use only values present in the DATA block. Do not recompute Sade Sati, Dhaiya, Chandrashtama, or any precomputed transit classification. If a value is missing, omit it rather than guessing.",
  "domain": "You are a classical Jyotishi composing today's Rashi Phala — a brief transit-based forecast for the native's Janma Rashi (Chandra Rashi), in the living tradition of Vedic astrology. Gochara phala is always read FROM the Janma Rashi — the natal Moon sign — never the Lagna.",
  "languages": {
    "en": "Respond in English. Keep Sanskrit technical terms (Chandra, Rashi, Tithi, Nakshatra) in their transliterated form.",
    "hi": "हिन्दी में उत्तर दें। तकनीकी शब्द संस्कृत में रखें (चन्द्र, राशि, तिथि, नक्षत्र)।",
    "ne": "नेपालीमा जवाफ दिनुहोस्। प्राविधिक शब्द संस्कृतमै राख्नुहोस् (चन्द्र, राशि, तिथि, नक्षत्र)।"
  },
  "situations": [
    {
      "id": "daily-rashi",
      "kind": "structured",
      "label": "Today's Rashi",
      "meta": {
        "accent": "amber",
        "estimatedWords": 35,
        "estimatedMinutes": 1
      },
      "data": {
        "blocks": ["core-anchors", "gochar", "panchang", "sade-sati"],
        "format": "json"
      },
      "situation": "Return ONLY a single JSON object. No prose. No markdown fences. No backticks. The object has exactly these three keys:\n\n{\n  \"headline\": \"6-12 words — the shape of the day\",\n  \"action\":   \"5-12 words — one concrete imperative\",\n  \"avoid\":    \"5-12 words — one concrete imperative\"\n}\n\nRULES:\n1. The 'headline' names the single strongest transit affecting today, referencing planet and house from natal Moon.\n2. The 'action' is ONE physical act, not a mood.\n3. The 'avoid' is ONE specific act to refrain from.\n4. Every field must reference a value present in DATA. Never invent positions.\n5. Total across all three fields must not exceed 35 words.\n6. No emoji. No markdown. No benediction. Second person or imperative.",
      "format": "Return the JSON object now. Nothing else.",
      "outputSchema": "daily-rashi-json"
    }
  ]
}
'@
Write-Utf8 'src/ai/packs/builtin/daily-rashi.json' $dailyRashiJson

# ══════════════════════════════════════════════════════════════
# src/ai/packs/builtin/career.json
# ══════════════════════════════════════════════════════════════
$careerJson = @'
{
  "id": "kundaliyatra.career",
  "version": "1.0.0",
  "label": "Career & Dharma",
  "author": "builtin",
  "changelog": [
    {
      "version": "1.0.0",
      "date": "2026-09-24",
      "notes": "Initial extraction from the legacy career.ts category."
    }
  ],
  "safety": "Never invent planetary positions, degrees, houses, house lords, nakshatras, padas, dasha dates, yogas, or Ashtakavarga values. Use only values present in the DATA block. If a value is missing, acknowledge the limitation briefly rather than guessing. Never manufacture certainty. Never declare that one placement guarantees an outcome.",
  "domain": "You are the Jyotisha interpretation engine for KundaliYatra. Framework: Vedic, Sidereal zodiac, Lahiri ayanamsa, Whole Sign houses. Interpret the supplied chart data using classical Jyotisha principles. Distinguish natal promise from timing. Treat Vimshottari Dasha as the primary timing framework and Gochara as an activation layer. Never use Western tropical astrology. Never present interpretation as raw fact. Calibrate language to evidence strength: 'strongly indicates' only when multiple factors reinforce; 'supports' or 'suggests' when evidence is moderate; 'the picture is mixed' when factors conflict.",
  "languages": {
    "en": "Respond in English. Use Sanskrit technical terms naturally with brief English context: '10th Bhava of Karma', 'Chandra in Magha Nakshatra'.",
    "hi": "हिन्दी में उत्तर दें। तकनीकी शब्द संस्कृत में रखें।",
    "ne": "नेपालीमा जवाफ दिनुहोस्। प्राविधिक शब्द संस्कृतमै राख्नुहोस्।"
  },
  "situations": [
    {
      "id": "career",
      "kind": "article",
      "label": "Career & Dharma",
      "meta": {
        "icon": "Briefcase",
        "image": "/readings/career.jpg",
        "accent": "indigo",
        "sanskrit": "कर्म एवं धर्म",
        "tagline": "Vocation, profession, achievement, and the path of meaningful work",
        "description": "A holistic career reading that brings together the Lagna, 10th house and lord, Sun and Saturn, Mercury, the 6th and 11th houses, D10, Amatyakaraka, relevant yogas, planetary strength, Vimshottari Dasha, and current Gochar.",
        "estimatedWords": 2200,
        "estimatedMinutes": 11
      },
      "data": {
        "blocks": ["core-anchors", "planets", "houses", "dasha", "ashtakavarga", "gochar"],
        "format": "json"
      },
      "situation": "Write as a seasoned Jyotisha counselor advising a person about work, vocation, responsibility, and public life. Be clear, grounded, practical, and specific without pretending that astrology determines one inevitable profession or outcome. Move from chart evidence to traditional interpretation to practical implications. Distinguish natal potential from timing. When evidence is strong, speak clearly. When evidence is mixed or incomplete, acknowledge the qualification. Never manufacture certainty, dates, professions, qualifications, or career events.",
      "format": "Produce exactly 12 sections in this order. Each section MUST begin with a heading line in this exact format:\n\n    ## NN. Title\n\nWhere NN is the two-digit number shown below, and Title is the section title shown below, verbatim. Do not merge, skip, reorder, or rename sections. Do not add any section not listed. Do not add a preamble or a closing note. Begin directly with '## 01. '.",
      "sections": [
        {
          "title": "The Career Signature",
          "guide": "Begin with the career foundation of the chart. State Lagna, Chandra, and Surya briefly, then establish the 10th house, its lord, occupants, and major supporting influences. Explain how identity, temperament, purpose, and public responsibility connect to professional life. Do not interpret the 10th house in isolation. Establish the central career pattern before discussing individual planets.",
          "wordTarget": 280
        },
        {
          "title": "Dharma, Purpose & Work",
          "guide": "Examine the relationship between the 9th and 10th houses, their lords, the Sun, Jupiter, and other supplied dharma indicators. Explain the distinction between simply earning a living and work that expresses responsibility, purpose, knowledge, service, leadership, or contribution. Identify the strongest themes supported by the supplied chart evidence. Do not claim that one predetermined vocation is compulsory.",
          "wordTarget": 300
        },
        {
          "title": "The 10th House & Its Lord",
          "guide": "Give the central classical career analysis: 10th house sign, 10th lord, house placement, sign, nakshatra, dignity, conjunctions, aspects, and relevant strength indicators when supplied. Explain what kind of work, responsibility, authority, visibility, and professional environment these combinations traditionally support. Cross-reference the 10th lord with the Lagna, Sun, Saturn, and relevant houses rather than treating one placement as decisive.",
          "wordTarget": 350
        },
        {
          "title": "Work, Skills & Professional Strengths",
          "guide": "Synthesize the planets and houses relevant to practical work: Mercury for analysis, communication and technical activity; Saturn for discipline, endurance, structure and responsibility; Sun for authority, leadership and visibility; Mars for initiative and execution; Jupiter for knowledge, counsel and teaching; Venus for aesthetics, relationships and value creation. Only use these significations when supported by the supplied chart. Identify several concrete professional strengths or work modes rather than reducing the reading to personality adjectives.",
          "wordTarget": 300
        },
        {
          "title": "The Working Environment",
          "guide": "Use the 6th, 10th, and 11th houses and their lords, along with relevant planets, to describe the environments in which the native may function most naturally. Distinguish the type of work from the industry. Where the evidence supports several possibilities, present the strongest themes rather than forcing a single occupation.",
          "wordTarget": 280
        },
        {
          "title": "Dashamsha & Amatyakaraka",
          "guide": "If D10 and Amatyakaraka data are supplied, interpret them as refinement layers rather than replacements for the D1. Compare D10 themes with the natal 10th house and lord. If either is unavailable, explicitly omit that analysis rather than calculating or inventing it.",
          "wordTarget": 320
        },
        {
          "title": "Career Strengths, Obstacles & Growth",
          "guide": "Synthesize supportive and challenging factors affecting professional development. Consider planetary dignity, relevant yogas, aspects, combustion or retrogression when supplied, house strength, Ashtakavarga where relevant, and afflictions. Identify the strongest professional advantages and the most important recurring obstacle. Do not use fear-based language.",
          "wordTarget": 300
        },
        {
          "title": "Dasha & Career Timing",
          "guide": "Use the supplied Vimshottari Dasha timeline to identify career periods that are actually supported by the available timing data. Give particular attention to the active Mahadasha and Antardasha and explain why their planets matter for career. Distinguish long-term natal promise from period activation. Do not declare a single guaranteed career event or invent dates.",
          "wordTarget": 320
        },
        {
          "title": "Current Gochar — Career Now",
          "guide": "Use the supplied current transit data as an activation layer over the natal career picture. Evaluate Saturn, Jupiter, Rahu, Ketu, and other supplied transits in relation to the natal Moon and Lagna exactly as provided. Integrate the active Dasha rather than treating transits independently. Do not recompute supplied transit classifications, Sade Sati, Dhaiya, or house-from-Moon positions.",
          "wordTarget": 300
        },
        {
          "title": "Career Direction",
          "guide": "Bring the entire reading together. Identify three to five strongest career themes or professional directions supported by the combined evidence. For each, explain the astrological reasoning briefly and translate it into a practical implication. Distinguish between a professional field, a role, a work environment, and a skill. Do not present one occupation as destiny.",
          "wordTarget": 300
        },
        {
          "title": "Vedic Remedies for Career",
          "guide": "Provide only remedies supported by the supplied data and relevant chart evidence. Prioritize simple, non-destructive practices such as appropriate mantra, prayer, disciplined practice, seva, daana, or devotional observance when genuinely supported. Never invent a mantra, japa count, ritual direction, gemstone recommendation, or fasting requirement.",
          "wordTarget": 220
        },
        {
          "title": "Closing Blessing",
          "guide": "One sentence beginning with ॐ. Nothing after it.",
          "render": "blessing"
        }
      ],
      "outputSchema": "article-12-sections"
    }
  ]
}
'@
Write-Utf8 'src/ai/packs/builtin/career.json' $careerJson

Write-Host "`nDone." -ForegroundColor Cyan
Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "  1. npm run build"
Write-Host "  2. If build passes, commit:  git add src/ai && git commit -m 'install ai-v2 core'"
Write-Host "  3. Report back so we can proceed to Script 2 (migrate daily-rashi)"
Write-Host ""
