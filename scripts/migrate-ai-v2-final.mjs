// scripts/migrate-ai-v2-final.mjs
//
// Final step of the ai-v2 migration.
//   - rewires ReadingArticleView, AiReadingView, dashboard tile, PDF export
//   - decouples accents.ts and store.ts from the legacy categories
//   - deletes prompt.ts, schema.ts, chart-payload.ts, categories/
//
// Node handles UTF-8 natively. Safe to re-run.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

function write(relPath, lines) {
  const full = path.join(ROOT, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  const content = Array.isArray(lines) ? lines.join('\n') + '\n' : lines;
  fs.writeFileSync(full, content, 'utf8');
  console.log('  wrote', relPath);
}

function remove(relPath) {
  const full = path.join(ROOT, relPath);
  if (fs.existsSync(full)) {
    fs.rmSync(full, { recursive: true, force: true });
    console.log('  deleted', relPath);
  }
}

console.log('\nMigrating to ai-v2 (final)...\n');

// ═══════════════════════════════════════════════════════════════
// 1. src/features/ai-reading/accents.ts — decouple from categories
// ═══════════════════════════════════════════════════════════════
write('src/features/ai-reading/accents.ts', [
  "export type AccentName =",
  "  | 'amber' | 'rose' | 'violet' | 'emerald' | 'sky' | 'slate'",
  "  | 'crimson' | 'indigo' | 'teal' | 'sunset';",
  "",
  "export interface AccentStyle {",
  "  accent: string;",
  "  border: string;",
  "  borderSoft: string;",
  "  hairline: string;",
  "  cardBg: string;",
  "  articleBg: string;",
  "  ornament: string;",
  "}",
  "",
  "export const ACCENT_STYLES: Record<AccentName, AccentStyle> = {",
  "  amber:   { accent: 'hsl(38 55% 42%)',   border: 'hsl(38 55% 42% / 0.25)',   borderSoft: 'hsl(38 55% 42% / 0.12)',   hairline: 'linear-gradient(90deg, hsl(38 65% 55%), hsl(38 55% 42%))',   cardBg: 'linear-gradient(180deg, hsl(38 55% 98%), hsl(38 45% 96%))',   articleBg: 'linear-gradient(180deg, #FBF6EA 0%, #F5EEDF 100%)', ornament: 'hsl(38 55% 48%)' },",
  "  rose:    { accent: 'hsl(346 65% 45%)',  border: 'hsl(346 65% 45% / 0.25)',  borderSoft: 'hsl(346 65% 45% / 0.12)',  hairline: 'linear-gradient(90deg, hsl(346 70% 62%), hsl(346 65% 45%))',  cardBg: 'linear-gradient(180deg, hsl(346 60% 98%), hsl(346 45% 96%))',  articleBg: 'linear-gradient(180deg, #FDF5F6 0%, #F9E9EC 100%)', ornament: 'hsl(346 65% 50%)' },",
  "  violet:  { accent: 'hsl(262 55% 50%)',  border: 'hsl(262 55% 50% / 0.25)',  borderSoft: 'hsl(262 55% 50% / 0.12)',  hairline: 'linear-gradient(90deg, hsl(262 60% 66%), hsl(262 55% 50%))',  cardBg: 'linear-gradient(180deg, hsl(262 50% 98%), hsl(262 40% 96%))',  articleBg: 'linear-gradient(180deg, #F7F5FD 0%, #EEEAF9 100%)', ornament: 'hsl(262 55% 54%)' },",
  "  emerald: { accent: 'hsl(150 50% 34%)',  border: 'hsl(150 50% 34% / 0.25)',  borderSoft: 'hsl(150 50% 34% / 0.12)',  hairline: 'linear-gradient(90deg, hsl(150 50% 50%), hsl(150 50% 34%))',  cardBg: 'linear-gradient(180deg, hsl(150 40% 98%), hsl(150 30% 96%))',  articleBg: 'linear-gradient(180deg, #F1FAF5 0%, #E4F3EA 100%)', ornament: 'hsl(150 50% 40%)' },",
  "  sky:     { accent: 'hsl(200 70% 40%)',  border: 'hsl(200 70% 40% / 0.25)',  borderSoft: 'hsl(200 70% 40% / 0.12)',  hairline: 'linear-gradient(90deg, hsl(200 75% 55%), hsl(200 70% 40%))',  cardBg: 'linear-gradient(180deg, hsl(200 55% 98%), hsl(200 40% 96%))',  articleBg: 'linear-gradient(180deg, #F2F8FC 0%, #E5F0F8 100%)', ornament: 'hsl(200 70% 46%)' },",
  "  slate:   { accent: 'hsl(215 25% 34%)',  border: 'hsl(215 25% 34% / 0.25)',  borderSoft: 'hsl(215 25% 34% / 0.12)',  hairline: 'linear-gradient(90deg, hsl(215 25% 55%), hsl(215 25% 34%))',  cardBg: 'linear-gradient(180deg, hsl(215 20% 98%), hsl(215 15% 96%))',  articleBg: 'linear-gradient(180deg, #F4F6F9 0%, #E8ECF1 100%)', ornament: 'hsl(215 25% 40%)' },",
  "  crimson: { accent: 'hsl(6 60% 40%)',    border: 'hsl(6 60% 40% / 0.25)',    borderSoft: 'hsl(6 60% 40% / 0.12)',    hairline: 'linear-gradient(90deg, hsl(6 65% 58%), hsl(6 60% 40%))',    cardBg: 'linear-gradient(180deg, hsl(6 55% 98%), hsl(6 40% 96%))',    articleBg: 'linear-gradient(180deg, #FCF4F2 0%, #F7E7E4 100%)', ornament: 'hsl(6 60% 42%)' },",
  "  indigo:  { accent: 'hsl(245 55% 48%)',  border: 'hsl(245 55% 48% / 0.25)',  borderSoft: 'hsl(245 55% 48% / 0.12)',  hairline: 'linear-gradient(90deg, hsl(245 60% 62%), hsl(245 55% 48%))',  cardBg: 'linear-gradient(180deg, hsl(245 50% 98%), hsl(245 40% 96%))',  articleBg: 'linear-gradient(180deg, #F3F4FC 0%, #E8EAF7 100%)', ornament: 'hsl(245 55% 52%)' },",
  "  teal:    { accent: 'hsl(180 55% 32%)',  border: 'hsl(180 55% 32% / 0.25)',  borderSoft: 'hsl(180 55% 32% / 0.12)',  hairline: 'linear-gradient(90deg, hsl(180 55% 48%), hsl(180 55% 32%))',  cardBg: 'linear-gradient(180deg, hsl(180 40% 98%), hsl(180 30% 96%))',  articleBg: 'linear-gradient(180deg, #F0F9F8 0%, #E1F1EF 100%)', ornament: 'hsl(180 55% 38%)' },",
  "  sunset:  { accent: 'hsl(20 75% 45%)',   border: 'hsl(20 75% 45% / 0.25)',   borderSoft: 'hsl(20 75% 45% / 0.12)',   hairline: 'linear-gradient(90deg, hsl(20 80% 60%), hsl(20 75% 45%))',   cardBg: 'linear-gradient(180deg, hsl(20 70% 98%), hsl(20 55% 96%))',   articleBg: 'linear-gradient(180deg, #FDF6F0 0%, #F9EBE0 100%)', ornament: 'hsl(20 75% 50%)' },",
  "};",
  "",
  "export function resolveAccent(name: string | undefined): AccentStyle {",
  "  const key = (name ?? 'amber') as AccentName;",
  "  return ACCENT_STYLES[key] ?? ACCENT_STYLES.amber;",
  "}",
  ""
]);

// ═══════════════════════════════════════════════════════════════
// 2. src/features/ai-reading/store.ts — decouple from categories
// ═══════════════════════════════════════════════════════════════
// Patch the import line — the only coupling to categories.
{
  const p = path.join(ROOT, 'src/features/ai-reading/store.ts');
  let src = fs.readFileSync(p, 'utf8');
  src = src.replace(
    /import type \{[^}]*\} from '\.\/categories';/,
    "import type {\n  ReadingCategoryId,\n  ReadingLanguage,\n  ReadingTone,\n} from './types';"
  );
  fs.writeFileSync(p, src, 'utf8');
  console.log('  patched src/features/ai-reading/store.ts');
}

// ═══════════════════════════════════════════════════════════════
// 3. src/features/ai-reading/types.ts — new home for the shared types
// ═══════════════════════════════════════════════════════════════
write('src/features/ai-reading/types.ts', [
  "/**",
  " * Shared types for the reading library. These used to live in",
  " * categories/_types.ts. After the ai-v2 migration, they live here",
  " * so the store is not coupled to the legacy category definitions.",
  " */",
  "",
  "export type ReadingCategoryId = string;",
  "export type ReadingTone = 'traditional' | 'analytical' | 'practical' | 'devotional';",
  "export type ReadingLanguage = 'English' | 'Hindi' | 'Nepali' | 'en' | 'hi' | 'ne';",
  ""
]);

// ═══════════════════════════════════════════════════════════════
// 4. src/features/ai-reading/ReadingArticleView.tsx — full rewrite
// ═══════════════════════════════════════════════════════════════
write('src/features/ai-reading/ReadingArticleView.tsx', [
  "import { useEffect, useMemo, useState } from 'react';",
  "import { Link, useNavigate, useParams } from 'react-router-dom';",
  "import { DateTime } from 'luxon';",
  "import { ArrowLeft, Printer, Copy, RefreshCw, Loader2, BookOpen, Eye } from 'lucide-react';",
  "import { toast } from 'sonner';",
  "",
  "import { useActiveProfile } from '@/features/birth-profile/store';",
  "import { getCachedKundli } from '@/lib/kundli-cache';",
  "import { resolve, compose, select } from '@/ai/core';",
  "import { execute } from '@/ai/runtime';",
  "import { gocharAdapter } from '@/infrastructure/astrology/gochar.adapter';",
  "import { useReadingStore, makeReadingKey, hashProfile } from './store';",
  "import { ACCENT_STYLES, resolveAccent } from './accents';",
  "import { parseArticle, countWords, readingMinutes } from './markdown';",
  "import { ArticleBody } from './components/ArticleBody';",
  "import { ArticleTOC } from './components/ArticleTOC';",
  "import { OrnamentalDivider } from '@/features/report/primitives/OrnamentalDivider';",
  "import {",
  "  Dialog,",
  "  DialogContent,",
  "  DialogHeader,",
  "  DialogTitle,",
  "  DialogDescription,",
  "  DialogFooter,",
  "} from '@/components/ui/dialog';",
  "",
  "export function ReadingArticleView() {",
  "  const { categoryId } = useParams<{ categoryId: string }>();",
  "  const navigate = useNavigate();",
  "  const profile = useActiveProfile();",
  "",
  "  const resolved = useMemo(() => {",
  "    if (!categoryId) return null;",
  "    try { return resolve(categoryId); } catch { return null; }",
  "  }, [categoryId]);",
  "",
  "  const records = useReadingStore((s) => s.records);",
  "  const saveRecord = useReadingStore((s) => s.save);",
  "  const [generating, setGenerating] = useState(false);",
  "  const [showPrompt, setShowPrompt] = useState(false);",
  "",
  "  const kundli = useMemo(() => (profile ? getCachedKundli(profile) : null), [profile]);",
  "",
  "  const situation = resolved?.situation ?? null;",
  "  const pack = resolved?.pack ?? null;",
  "",
  "  const gocharData = useMemo(() => {",
  "    if (!kundli || !situation) return null;",
  "    const blocks = situation.data.blocks;",
  "    if (!blocks.includes('gochar') && !blocks.includes('sade-sati')) return null;",
  "    try { return gocharAdapter.analyze(kundli, new Date()); } catch { return null; }",
  "  }, [kundli, situation]);",
  "",
  "  const composedPrompt = useMemo(() => {",
  "    if (!kundli || !situation || !pack) return null;",
  "    try {",
  "      const data = select(situation.data, { kundli, gochar: gocharData });",
  "      return compose({ pack, situation, data, language: 'en' });",
  "    } catch { return null; }",
  "  }, [kundli, situation, pack, gocharData]);",
  "",
  "  const promptStats = useMemo(() => {",
  "    if (!composedPrompt) return null;",
  "    const chars = composedPrompt.system.length + composedPrompt.user.length;",
  "    return { chars, tokens: Math.ceil(chars / 4) };",
  "  }, [composedPrompt]);",
  "",
  "  const cacheKey = useMemo(() => {",
  "    if (!profile || !situation) return '';",
  "    return makeReadingKey(profile, situation.id);",
  "  }, [profile, situation]);",
  "",
  "  const record = cacheKey ? records[cacheKey] : null;",
  "",
  "  const handleGenerate = async () => {",
  "    if (!profile || !situation || !kundli) return;",
  "    setGenerating(true);",
  "    try {",
  "      const res = await execute({",
  "        situationId: situation.id,",
  "        language: (situation.defaults?.language as any) ?? 'en',",
  "        sources: { kundli, gochar: gocharData },",
  "        extras: {",
  "          tone: situation.defaults?.tone ?? 'traditional',",
  "          numberOfWord: situation.defaults?.length ?? 2500,",
  "          language: 'English',",
  "        },",
  "      });",
  "",
  "      if (!res.ok || !res.text) {",
  "        toast.error(res.error ?? 'Generation failed.');",
  "        return;",
  "      }",
  "",
  "      const wordCount = countWords(res.text);",
  "      saveRecord({",
  "        key: cacheKey,",
  "        categoryId: situation.id,",
  "        profileHash: hashProfile(profile),",
  "        profileName: profile.profileName,",
  "        text: res.text,",
  "        providerId: res.providerId ?? '',",
  "        modelId: res.modelId ?? '',",
  "        tone: (situation.defaults?.tone as any) ?? 'traditional',",
  "        language: (situation.defaults?.language as any) ?? 'en',",
  "        length: situation.defaults?.length ?? 2500,",
  "        promptVersion: pack?.version ?? '1.0.0',",
  "        generatedAt: new Date().toISOString(),",
  "        wordCount,",
  "      });",
  "      toast.success('Reading composed.');",
  "    } finally {",
  "      setGenerating(false);",
  "    }",
  "  };",
  "",
  "  const handleCopy = async () => {",
  "    if (!record) return;",
  "    try {",
  "      await navigator.clipboard.writeText(record.text);",
  "      toast.success('Copied.');",
  "    } catch { toast.error('Clipboard unavailable.'); }",
  "  };",
  "  const handlePrint = () => setTimeout(() => window.print(), 60);",
  "",
  "  const handleCopyPrompt = async () => {",
  "    if (!composedPrompt) return;",
  "    const combined = `### SYSTEM\\n\\n${composedPrompt.system}\\n\\n### USER\\n\\n${composedPrompt.user}`;",
  "    try {",
  "      await navigator.clipboard.writeText(combined);",
  "      toast.success('Prompt copied.');",
  "    } catch { toast.error('Clipboard unavailable.'); }",
  "  };",
  "",
  "  if (!profile || !kundli || !situation || !pack) {",
  "    return (",
  "      <div className=\"container max-w-2xl mx-auto px-4 py-24 text-center space-y-4\">",
  "        <p className=\"text-sm text-muted-foreground\">Reading not found.</p>",
  "        <Link to=\"/reading\" className=\"text-primary hover:underline text-sm\">",
  "          \u2190 Back to studio",
  "        </Link>",
  "      </div>",
  "    );",
  "  }",
  "",
  "  const styles = resolveAccent(situation.meta?.accent);",
  "  const parsed = record ? parseArticle(record.text) : null;",
  "",
  "  const signature = [",
  "    kundli?.ascendant?.rashiName && `${kundli.ascendant.rashiName} Lagna`,",
  "    kundli?.planets?.Moon?.rashiName && `${kundli.planets.Moon.rashiName} Chandra`,",
  "    kundli?.planets?.Sun?.rashiName && `${kundli.planets.Sun.rashiName} Surya`,",
  "  ].filter(Boolean).join(' \u00b7 ');",
  "",
  "  return (",
  "    <div className=\"min-h-screen\" style={{ background: styles.articleBg }}>",
  "      <div className=\"no-print sticky top-0 z-40 border-b\" style={{ borderColor: styles.borderSoft, background: 'hsl(var(--background) / 0.85)' }}>",
  "        <div className=\"container mx-auto max-w-5xl px-4 h-12 flex items-center gap-3\">",
  "          <button onClick={() => navigate('/reading')} className=\"flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground\">",
  "            <ArrowLeft size={13} /> Studio",
  "          </button>",
  "          <div className=\"w-px h-4 mx-1 opacity-30\" style={{ background: styles.accent }} />",
  "          <span className=\"text-[10px] uppercase tracking-[0.2em] font-semibold truncate\" style={{ color: styles.accent }}>",
  "            {situation.label ?? situation.id}",
  "          </span>",
  "          <div className=\"flex-1\" />",
  "          <button onClick={() => setShowPrompt(true)} className=\"p-1.5 text-muted-foreground hover:text-foreground\" title=\"Preview prompt\">",
  "            <Eye size={13} />",
  "          </button>",
  "          {record && (",
  "            <>",
  "              <button onClick={handleCopy} className=\"p-1.5 text-muted-foreground hover:text-foreground\" title=\"Copy\"><Copy size={13} /></button>",
  "              <button onClick={handlePrint} className=\"p-1.5 text-muted-foreground hover:text-foreground\" title=\"Print\"><Printer size={13} /></button>",
  "            </>",
  "          )}",
  "        </div>",
  "      </div>",
  "",
  "      <div className=\"container mx-auto max-w-5xl px-4 py-10\">",
  "        {!record ? (",
  "          <div className=\"max-w-xl mx-auto text-center space-y-8 py-16\">",
  "            <div className=\"space-y-4\">",
  "              {situation.meta?.sanskrit && (",
  "                <p className=\"text-[10px] uppercase tracking-[0.4em] font-semibold\" style={{ color: styles.accent }}>",
  "                  {situation.meta.sanskrit}",
  "                </p>",
  "              )}",
  "              <h1 style={{ fontFamily: \"'Cormorant Garamond', Georgia, serif\", fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 600 }}>",
  "                {situation.label}",
  "              </h1>",
  "              {situation.meta?.description && (",
  "                <p className=\"text-sm text-muted-foreground leading-relaxed\">{situation.meta.description}</p>",
  "              )}",
  "            </div>",
  "            <div className=\"flex items-center justify-center gap-3 flex-wrap\">",
  "              <button onClick={handleGenerate} disabled={generating} className=\"inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium\" style={{ background: styles.accent, color: 'white' }}>",
  "                {generating ? <><Loader2 size={14} className=\"animate-spin\" /> Composing\u2026</> : <><BookOpen size={14} /> Compose</>}",
  "              </button>",
  "              <button onClick={() => setShowPrompt(true)} className=\"inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium border-2\" style={{ borderColor: styles.border, color: styles.accent }}>",
  "                <Eye size={14} /> View prompt",
  "              </button>",
  "            </div>",
  "          </div>",
  "        ) : (",
  "          <article className=\"relative rounded-3xl border overflow-hidden\" style={{ borderColor: styles.border, background: 'white' }}>",
  "            <header className=\"px-6 md:px-12 pt-12 pb-10 text-center space-y-6 border-b\" style={{ borderColor: styles.borderSoft }}>",
  "              {situation.meta?.sanskrit && (",
  "                <p style={{ fontFamily: \"'Noto Serif Devanagari', serif\", fontSize: '13px', color: styles.accent }}>",
  "                  {situation.meta.sanskrit}",
  "                </p>",
  "              )}",
  "              <h1 style={{ fontFamily: \"'Cormorant Garamond', Georgia, serif\", fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 600, color: '#2E1F14' }}>",
  "                {record.profileName}",
  "              </h1>",
  "              <p style={{ fontFamily: \"'Cormorant Garamond', Georgia, serif\", fontSize: '14px', color: '#6B4F35', fontStyle: 'italic' }}>",
  "                {signature}",
  "              </p>",
  "              <div className=\"flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.2em]\" style={{ color: '#8B7659' }}>",
  "                <span>{record.wordCount.toLocaleString()} words</span>",
  "                <span className=\"opacity-40\">\u00b7</span>",
  "                <span>{readingMinutes(record.wordCount)} min</span>",
  "              </div>",
  "              <OrnamentalDivider />",
  "            </header>",
  "            <div className=\"px-6 md:px-12 py-14 md:py-20\">",
  "              <div className=\"mx-auto\" style={{ maxWidth: '68ch' }}>",
  "                <ArticleBody sections={parsed!.sections} ornament={styles.ornament} fontScale={1} />",
  "              </div>",
  "            </div>",
  "            <footer className=\"px-6 md:px-12 pt-14 pb-16 border-t\" style={{ borderColor: styles.borderSoft }}>",
  "              <div className=\"max-w-md mx-auto text-center space-y-4\">",
  "                <p style={{ fontFamily: \"'Cormorant Garamond', Georgia, serif\", fontSize: '15px', fontStyle: 'italic', color: '#6B4F35' }}>",
  "                  Composed for {record.profileName},",
  "                  <br />",
  "                  from the heavens at the moment of birth.",
  "                </p>",
  "                <p style={{ fontFamily: \"'Cormorant Garamond', Georgia, serif\", fontSize: '12px', color: '#A89072' }}>",
  "                  {record.providerId}{record.modelId && ` \u00b7 ${record.modelId}`}",
  "                </p>",
  "                <p style={{ fontFamily: \"'Cormorant Garamond', Georgia, serif\", fontSize: '12px', color: '#A89072' }}>",
  "                  Prompt pack v{record.promptVersion}",
  "                </p>",
  "              </div>",
  "            </footer>",
  "            <div className=\"no-print sticky bottom-4 mx-auto w-fit mb-6 flex items-center gap-2 rounded-full border bg-white/85 backdrop-blur px-3 py-2 shadow-lg\">",
  "              <button onClick={handleGenerate} disabled={generating} className=\"px-2 py-1 text-xs inline-flex items-center gap-1.5\">",
  "                {generating ? <Loader2 size={12} className=\"animate-spin\" /> : <RefreshCw size={12} />} Regenerate",
  "              </button>",
  "            </div>",
  "            <ArticleTOC sections={parsed!.sections} accent={styles.accent} />",
  "          </article>",
  "        )}",
  "      </div>",
  "",
  "      <Dialog open={showPrompt} onOpenChange={setShowPrompt}>",
  "        <DialogContent className=\"max-w-4xl max-h-[88vh] flex flex-col\">",
  "          <DialogHeader>",
  "            <DialogTitle>Prompt preview</DialogTitle>",
  "            <DialogDescription>Layered prompt that will be sent to the AI. Nothing is truncated.</DialogDescription>",
  "          </DialogHeader>",
  "          {promptStats && (",
  "            <div className=\"text-[11px] flex gap-4\" style={{ color: '#8B7659' }}>",
  "              <span>{promptStats.chars.toLocaleString()} chars</span>",
  "              <span>~{promptStats.tokens.toLocaleString()} tokens</span>",
  "              <span>Pack {pack.id}@{pack.version}</span>",
  "            </div>",
  "          )}",
  "          <div className=\"flex-1 min-h-0 overflow-auto rounded-lg border p-4 space-y-4\">",
  "            {composedPrompt ? (",
  "              <>",
  "                {Object.entries(composedPrompt.layers).map(([name, text]) => (",
  "                  <div key={name}>",
  "                    <p className=\"text-[10px] uppercase tracking-[0.2em] font-bold mb-1\" style={{ color: styles.accent }}>{name}</p>",
  "                    <pre className=\"whitespace-pre-wrap break-words text-[11px] leading-[1.6] font-mono\">{text}</pre>",
  "                  </div>",
  "                ))}",
  "              </>",
  "            ) : (",
  "              <p className=\"text-sm text-muted-foreground\">Prompt not ready.</p>",
  "            )}",
  "          </div>",
  "          <DialogFooter className=\"gap-2\">",
  "            <button onClick={handleCopyPrompt} disabled={!composedPrompt} className=\"inline-flex items-center gap-1.5 px-4 py-2 rounded-md border text-xs\">",
  "              <Copy size={12} /> Copy prompt",
  "            </button>",
  "            <button onClick={() => setShowPrompt(false)} className=\"inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs\" style={{ background: styles.accent, color: 'white' }}>",
  "              Close",
  "            </button>",
  "          </DialogFooter>",
  "        </DialogContent>",
  "      </Dialog>",
  "    </div>",
  "  );",
  "}",
  ""
]);

// ═══════════════════════════════════════════════════════════════
// 5. src/features/ai-reading/AiReadingView.tsx — uses situations
// ═══════════════════════════════════════════════════════════════
write('src/features/ai-reading/AiReadingView.tsx', [
  "import { useMemo } from 'react';",
  "import { Link, useNavigate } from 'react-router-dom';",
  "import { Sparkles, BookOpen, Clock, Check, type LucideIcon } from 'lucide-react';",
  "import * as Icons from 'lucide-react';",
  "import { useActiveProfile } from '@/features/birth-profile/store';",
  "import { listSituations } from '@/ai/core';",
  "import { useLibraryForProfile } from './store';",
  "import { resolveAccent } from './accents';",
  "",
  "export function AiReadingView() {",
  "  const profile = useActiveProfile();",
  "  const library = useLibraryForProfile(profile);",
  "  const navigate = useNavigate();",
  "",
  "  const items = useMemo(",
  "    () => listSituations().filter((x) => x.situation.kind === 'article'),",
  "    []",
  "  );",
  "",
  "  if (!profile) {",
  "    return (",
  "      <div className=\"container mx-auto max-w-2xl px-4 py-24 text-center space-y-4\">",
  "        <Sparkles className=\"mx-auto opacity-40\" size={32} />",
  "        <h1 className=\"text-2xl font-bold\">Enter your birth details first</h1>",
  "        <Link to=\"/chart\" className=\"inline-flex items-center gap-2 text-sm text-primary hover:underline\">",
  "          <BookOpen size={14} /> Go to Chart",
  "        </Link>",
  "      </div>",
  "    );",
  "  }",
  "",
  "  const generated = Object.keys(library).length;",
  "",
  "  return (",
  "    <div className=\"container mx-auto max-w-5xl px-4 py-8 md:py-12 space-y-10\">",
  "      <header className=\"text-center space-y-4 py-8\">",
  "        <p className=\"text-[10px] uppercase tracking-[0.4em] text-primary font-semibold\">Reading Studio</p>",
  "        <h1 style={{ fontFamily: \"'Cormorant Garamond', Georgia, serif\", fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700 }}>",
  "          Readings for {profile.profileName}",
  "        </h1>",
  "        <p className=\"text-sm text-muted-foreground max-w-2xl mx-auto\">",
  "          Each reading is composed from your computed chart using a layered prompt pack. Once generated, it stays in your library.",
  "        </p>",
  "        {generated > 0 && (",
  "          <p className=\"text-xs text-muted-foreground\">{generated} of {items.length} generated</p>",
  "        )}",
  "      </header>",
  "",
  "      <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4\">",
  "        {items.map(({ situation, pack }) => {",
  "          const record = library[situation.id];",
  "          const styles = resolveAccent(situation.meta?.accent);",
  "          const iconName = situation.meta?.icon ?? 'Sparkles';",
  "          const IconCmp = ((Icons as unknown) as Record<string, LucideIcon>)[iconName] ?? Sparkles;",
  "          return (",
  "            <button",
  "              key={situation.id}",
  "              onClick={() => navigate(`/reading/${situation.id}`)}",
  "              className=\"group relative text-left rounded-2xl overflow-hidden border transition-all hover:shadow-lg\"",
  "              style={{ borderColor: styles.border, background: styles.cardBg }}",
  "            >",
  "              <div className=\"p-5 space-y-3\">",
  "                <div className=\"flex items-start justify-between gap-3\">",
  "                  <div className=\"min-w-0\">",
  "                    <div className=\"flex items-center gap-1.5 mb-1\">",
  "                      <IconCmp size={12} style={{ color: styles.accent }} />",
  "                      {situation.meta?.sanskrit && (",
  "                        <p className=\"text-[10px] uppercase tracking-[0.25em] font-semibold\" style={{ color: styles.accent }}>",
  "                          {situation.meta.sanskrit}",
  "                        </p>",
  "                      )}",
  "                    </div>",
  "                    <h3 className=\"font-bold text-foreground\" style={{ fontFamily: \"'Cormorant Garamond', Georgia, serif\", fontSize: '1.25rem' }}>",
  "                      {situation.label}",
  "                    </h3>",
  "                  </div>",
  "                  {record && (",
  "                    <span className=\"shrink-0 w-6 h-6 rounded-full flex items-center justify-center\" style={{ background: styles.accent, color: 'white' }}>",
  "                      <Check size={13} strokeWidth={3} />",
  "                    </span>",
  "                  )}",
  "                </div>",
  "                {situation.meta?.tagline && (",
  "                  <p className=\"text-xs text-muted-foreground leading-relaxed min-h-[3rem]\">{situation.meta.tagline}</p>",
  "                )}",
  "                <div className=\"flex items-center justify-between gap-2 pt-3 border-t\" style={{ borderColor: styles.borderSoft }}>",
  "                  <span className=\"flex items-center gap-1.5 text-[10px] uppercase text-muted-foreground\">",
  "                    <Clock size={11} /> ~{situation.meta?.estimatedMinutes ?? 10} min",
  "                  </span>",
  "                  <span className=\"text-[10px] text-muted-foreground font-mono\">",
  "                    pack v{pack.version}",
  "                  </span>",
  "                </div>",
  "              </div>",
  "            </button>",
  "          );",
  "        })}",
  "      </div>",
  "    </div>",
  "  );",
  "}",
  ""
]);

// ═══════════════════════════════════════════════════════════════
// 6. src/features/dashboard/components/ReadingTile.tsx — uses situations
// ═══════════════════════════════════════════════════════════════
write('src/features/dashboard/components/ReadingTile.tsx', [
  "import { BookOpen } from 'lucide-react';",
  "import { useTranslation } from 'react-i18next';",
  "import { TileShell } from './TileShell';",
  "import { listSituations } from '@/ai/core';",
  "",
  "interface ReadingTileProps {",
  "  count: number;",
  "  suggestedId: string | null;",
  "}",
  "",
  "export function ReadingTile({ count, suggestedId }: ReadingTileProps) {",
  "  const { t } = useTranslation();",
  "  const items = listSituations().filter((x) => x.situation.kind === 'article');",
  "  const total = items.length;",
  "  const pct = total > 0 ? (count / total) * 100 : 0;",
  "  const suggested = suggestedId",
  "    ? items.find((x) => x.situation.id === suggestedId)?.situation ?? null",
  "    : null;",
  "",
  "  return (",
  "    <TileShell",
  "      icon={<BookOpen size={13} />}",
  "      eyebrow={t('dashboard.readingsTitle', { defaultValue: 'Reading Studio' })}",
  "      href=\"/reading\"",
  "    >",
  "      <div className=\"space-y-4\">",
  "        <div className=\"flex items-baseline gap-2\">",
  "          <span className=\"text-4xl font-bold tabular-nums\" style={{ fontFamily: \"'Crimson Pro', Georgia, serif\" }}>",
  "            {count}",
  "          </span>",
  "          <span className=\"text-lg text-muted-foreground/70\">/ {total}</span>",
  "          <span className=\"text-[10px] uppercase tracking-[0.2em] text-muted-foreground ml-auto font-semibold\">",
  "            {t('dashboard.composed', { defaultValue: 'composed' })}",
  "          </span>",
  "        </div>",
  "        <div className=\"h-1.5 bg-muted/60 rounded-full overflow-hidden\">",
  "          <div className=\"h-full bg-primary rounded-full\" style={{ width: `${Math.min(100, pct)}%` }} />",
  "        </div>",
  "        <p className=\"text-[11px] text-muted-foreground pt-2 border-t\">",
  "          {suggested ? (",
  "            <>Next: <strong className=\"text-foreground/85\">{suggested.label ?? suggested.id}</strong></>",
  "          ) : (",
  "            'All readings composed.'",
  "          )}",
  "        </p>",
  "      </div>",
  "    </TileShell>",
  "  );",
  "}",
  ""
]);

// ═══════════════════════════════════════════════════════════════
// 7. src/features/dashboard/hooks/useDashboardData.ts — uses situations
// ═══════════════════════════════════════════════════════════════
{
  const p = path.join(ROOT, 'src/features/dashboard/hooks/useDashboardData.ts');
  let src = fs.readFileSync(p, 'utf8');
  src = src.replace(
    /import \{ CATEGORIES \} from '@\/features\/ai-reading\/categories';/,
    "import { listSituations } from '@/ai/core';"
  );
  src = src.replace(
    /const next = CATEGORIES\.find\(\(c\) => !generatedIds\.has\(c\.id\)\);/,
    "const next = listSituations().map((x) => x.situation).find((s) => !generatedIds.has(s.id));"
  );
  fs.writeFileSync(p, src, 'utf8');
  console.log('  patched src/features/dashboard/hooks/useDashboardData.ts');
}

// ═══════════════════════════════════════════════════════════════
// 8. src/features/report-pdf/index.tsx — uses pack map
// ═══════════════════════════════════════════════════════════════
{
  const p = path.join(ROOT, 'src/features/report-pdf/index.tsx');
  let src = fs.readFileSync(p, 'utf8');
  src = src.replace(
    /import \{ CATEGORY_MAP \} from '@\/features\/ai-reading\/categories';/,
    "import { listSituations } from '@/ai/core';"
  );
  // Replace the two uses of CATEGORY_MAP with a dynamic lookup
  src = src.replace(
    /const meta = \(CATEGORY_MAP as Record<string, \{ title\?: string; sanskrit\?: string \}>\)\[categoryId\];/,
    "const meta = (() => {\n    const found = listSituations().find((x) => x.situation.id === categoryId)?.situation;\n    return found ? { title: found.label, sanskrit: found.meta?.sanskrit } : undefined;\n  })();"
  );
  src = src.replace(
    /const order = Object\.keys\(CATEGORY_MAP\);/,
    "const order = listSituations().map((x) => x.situation.id);"
  );
  src = src.replace(
    /const ai = order\.findIndex\(\(k\) => \(CATEGORY_MAP as any\)\[k\]\.title === a\.categoryTitle\);/,
    "const ai = order.findIndex((k) => {\n    const found = listSituations().find((x) => x.situation.id === k)?.situation;\n    return found?.label === a.categoryTitle;\n  });"
  );
  src = src.replace(
    /const bi = order\.findIndex\(\(k\) => \(CATEGORY_MAP as any\)\[k\]\.title === b\.categoryTitle\);/,
    "const bi = order.findIndex((k) => {\n    const found = listSituations().find((x) => x.situation.id === k)?.situation;\n    return found?.label === b.categoryTitle;\n  });"
  );
  fs.writeFileSync(p, src, 'utf8');
  console.log('  patched src/features/report-pdf/index.tsx');
}

// ═══════════════════════════════════════════════════════════════
// 9. Delete the legacy pipeline
// ═══════════════════════════════════════════════════════════════
remove('src/features/ai-reading/prompt.ts');
remove('src/features/ai-reading/schema.ts');
remove('src/features/ai-reading/chart-payload.ts');
remove('src/features/ai-reading/__tests__/schema.test.ts');
remove('src/features/ai-reading/categories');

console.log('\nDone.\n');
console.log('Next:');
console.log('  npm run build');
console.log('  npm run dev    and check /reading  +  /reading/career  +  the dashboard');
console.log('  if green and pages work:');
console.log('    git add -A');
console.log('    git commit -m "complete ai-v2 migration; delete legacy pipeline"');
console.log('');
