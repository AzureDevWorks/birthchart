import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Printer, Copy, RefreshCw, Loader2, BookOpen, Eye } from 'lucide-react';
import { toast } from 'sonner';

import { useActiveProfile } from '@/features/birth-profile/store';
import { getCachedKundli } from '@/lib/kundli-cache';
import { resolve, compose, select } from '@/ai/core';
import { execute } from '@/ai/runtime';
import { gocharAdapter } from '@/infrastructure/astrology/gochar.adapter';
import { useReadingStore, makeReadingKey, hashProfile } from './store';
import { resolveAccent } from './accents';
import { parseArticle, countWords, readingMinutes } from './markdown';
import { ArticleBody } from './components/ArticleBody';
import { ArticleTOC } from './components/ArticleTOC';
import { DailyReadingView } from './DailyReadingView';
import { OrnamentalDivider } from '@/features/report/primitives/OrnamentalDivider';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

export function ReadingArticleView() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const profile = useActiveProfile();

  // Structured situations get their own view.
  if (categoryId === 'daily-reading') {
    return <DailyReadingView />;
  }

  const resolved = useMemo(() => {
    if (!categoryId) return null;
    try { return resolve(categoryId); } catch { return null; }
  }, [categoryId]);

  const records = useReadingStore((s) => s.records);
  const saveRecord = useReadingStore((s) => s.save);
  const [generating, setGenerating] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  const kundli = useMemo(() => (profile ? getCachedKundli(profile) : null), [profile]);

  const situation = resolved?.situation ?? null;
  const pack = resolved?.pack ?? null;

  const gocharData = useMemo(() => {
    if (!kundli || !situation) return null;
    const blocks = situation.data.blocks;
    if (!blocks.includes('gochar') && !blocks.includes('sade-sati')) return null;
    try { return gocharAdapter.analyze(kundli, new Date()); } catch { return null; }
  }, [kundli, situation]);

  const composedPrompt = useMemo(() => {
    if (!kundli || !situation || !pack) return null;
    try {
      const data = select(situation.data, { kundli, gochar: gocharData });
      return compose({ pack, situation, data, language: 'en' });
    } catch { return null; }
  }, [kundli, situation, pack, gocharData]);

  const promptStats = useMemo(() => {
    if (!composedPrompt) return null;
    const chars = composedPrompt.system.length + composedPrompt.user.length;
    return { chars, tokens: Math.ceil(chars / 4) };
  }, [composedPrompt]);

  const cacheKey = useMemo(() => {
    if (!profile || !situation) return '';
    return makeReadingKey(profile, situation.id);
  }, [profile, situation]);

  const record = cacheKey ? records[cacheKey] : null;

  const handleGenerate = async () => {
    if (!profile || !situation || !kundli) return;
    setGenerating(true);
    try {
      const res = await execute({
        situationId: situation.id,
        language: (situation.defaults?.language as any) ?? 'en',
        sources: { kundli, gochar: gocharData },
        extras: {
          tone: situation.defaults?.tone ?? 'traditional',
          numberOfWord: situation.defaults?.length ?? 2500,
          language: 'English',
        },
      });

      if (!res.ok || !res.text) {
        toast.error(res.error ?? 'Generation failed.');
        return;
      }

      const wordCount = countWords(res.text);
      saveRecord({
        key: cacheKey,
        categoryId: situation.id,
        profileHash: hashProfile(profile),
        profileName: profile.profileName,
        text: res.text,
        providerId: res.providerId ?? '',
        modelId: res.modelId ?? '',
        tone: (situation.defaults?.tone as any) ?? 'traditional',
        language: (situation.defaults?.language as any) ?? 'en',
        length: situation.defaults?.length ?? 2500,
        promptVersion: pack?.version ?? '1.0.0',
        generatedAt: new Date().toISOString(),
        wordCount,
      });
      toast.success('Reading composed.');
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = async () => {
    if (!record) return;
    try {
      await navigator.clipboard.writeText(record.text);
      toast.success('Copied.');
    } catch { toast.error('Clipboard unavailable.'); }
  };
  const handlePrint = () => setTimeout(() => window.print(), 60);

  const handleCopyPrompt = async () => {
    if (!composedPrompt) return;
    const combined = `### SYSTEM\n\n${composedPrompt.system}\n\n### USER\n\n${composedPrompt.user}`;
    try {
      await navigator.clipboard.writeText(combined);
      toast.success('Prompt copied.');
    } catch { toast.error('Clipboard unavailable.'); }
  };

  if (!profile || !kundli || !situation || !pack) {
    return (
      <div className="container max-w-2xl mx-auto px-4 py-24 text-center space-y-4">
        <p className="text-sm text-muted-foreground">Reading not found.</p>
        <Link to="/reading" className="text-primary hover:underline text-sm">
          ← Back to studio
        </Link>
      </div>
    );
  }

  const styles = resolveAccent(situation.meta?.accent);
  const parsed = record ? parseArticle(record.text) : null;

  const signature = [
    kundli?.ascendant?.rashiName && `${kundli.ascendant.rashiName} Lagna`,
    kundli?.planets?.Moon?.rashiName && `${kundli.planets.Moon.rashiName} Chandra`,
    kundli?.planets?.Sun?.rashiName && `${kundli.planets.Sun.rashiName} Surya`,
  ].filter(Boolean).join(' · ');

  return (
    <div className="min-h-screen" style={{ background: styles.articleBg }}>
      <div className="no-print sticky top-0 z-40 border-b" style={{ borderColor: styles.borderSoft, background: 'hsl(var(--background) / 0.85)' }}>
        <div className="container mx-auto max-w-5xl px-4 h-12 flex items-center gap-3">
          <button onClick={() => navigate('/reading')} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft size={13} /> Studio
          </button>
          <div className="w-px h-4 mx-1 opacity-30" style={{ background: styles.accent }} />
          <span className="text-[10px] uppercase tracking-[0.2em] font-semibold truncate" style={{ color: styles.accent }}>
            {situation.label ?? situation.id}
          </span>
          <div className="flex-1" />
          <button onClick={() => setShowPrompt(true)} className="p-1.5 text-muted-foreground hover:text-foreground" title="Preview prompt">
            <Eye size={13} />
          </button>
          {record && (
            <>
              <button onClick={handleCopy} className="p-1.5 text-muted-foreground hover:text-foreground" title="Copy"><Copy size={13} /></button>
              <button onClick={handlePrint} className="p-1.5 text-muted-foreground hover:text-foreground" title="Print"><Printer size={13} /></button>
            </>
          )}
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-10">
        {!record ? (
          <div className="max-w-xl mx-auto text-center space-y-8 py-16">
            <div className="space-y-4">
              {situation.meta?.sanskrit && (
                <p className="text-[10px] uppercase tracking-[0.4em] font-semibold" style={{ color: styles.accent }}>
                  {situation.meta.sanskrit}
                </p>
              )}
              <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 600 }}>
                {situation.label}
              </h1>
              {situation.meta?.description && (
                <p className="text-sm text-muted-foreground leading-relaxed">{situation.meta.description}</p>
              )}
            </div>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <button onClick={handleGenerate} disabled={generating} className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium" style={{ background: styles.accent, color: 'white' }}>
                {generating ? <><Loader2 size={14} className="animate-spin" /> Composing…</> : <><BookOpen size={14} /> Compose</>}
              </button>
              <button onClick={() => setShowPrompt(true)} className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium border-2" style={{ borderColor: styles.border, color: styles.accent }}>
                <Eye size={14} /> View prompt
              </button>
            </div>
          </div>
        ) : (
          <article className="relative rounded-3xl border overflow-hidden" style={{ borderColor: styles.border, background: 'white' }}>
            <header className="px-6 md:px-12 pt-12 pb-10 text-center space-y-6 border-b" style={{ borderColor: styles.borderSoft }}>
              {situation.meta?.sanskrit && (
                <p style={{ fontFamily: "'Noto Serif Devanagari', serif", fontSize: '13px', color: styles.accent }}>
                  {situation.meta.sanskrit}
                </p>
              )}
              <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 600, color: '#2E1F14' }}>
                {record.profileName}
              </h1>
              <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '14px', color: '#6B4F35', fontStyle: 'italic' }}>
                {signature}
              </p>
              <div className="flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.2em]" style={{ color: '#8B7659' }}>
                <span>{record.wordCount.toLocaleString()} words</span>
                <span className="opacity-40">·</span>
                <span>{readingMinutes(record.wordCount)} min</span>
              </div>
              <OrnamentalDivider />
            </header>
            <div className="px-6 md:px-12 py-14 md:py-20">
              <div className="mx-auto" style={{ maxWidth: '68ch' }}>
                <ArticleBody sections={parsed!.sections} ornament={styles.ornament} fontScale={1} />
              </div>
            </div>
            <footer className="px-6 md:px-12 pt-14 pb-16 border-t" style={{ borderColor: styles.borderSoft }}>
              <div className="max-w-md mx-auto text-center space-y-4">
                <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '15px', fontStyle: 'italic', color: '#6B4F35' }}>
                  Composed for {record.profileName},
                  <br />
                  from the heavens at the moment of birth.
                </p>
                <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '12px', color: '#A89072' }}>
                  {record.providerId}{record.modelId && ` · ${record.modelId}`}
                </p>
                <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '12px', color: '#A89072' }}>
                  Prompt pack v{record.promptVersion}
                </p>
              </div>
            </footer>
            <div className="no-print sticky bottom-4 mx-auto w-fit mb-6 flex items-center gap-2 rounded-full border bg-white/85 backdrop-blur px-3 py-2 shadow-lg">
              <button onClick={handleGenerate} disabled={generating} className="px-2 py-1 text-xs inline-flex items-center gap-1.5">
                {generating ? <Loader2 size={12} className="animate-spin" /> : <RefreshCw size={12} />} Regenerate
              </button>
            </div>
            <ArticleTOC sections={parsed!.sections} accent={styles.accent} />
          </article>
        )}
      </div>

      <Dialog open={showPrompt} onOpenChange={setShowPrompt}>
        <DialogContent className="max-w-4xl max-h-[88vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Prompt preview</DialogTitle>
            <DialogDescription>Layered prompt that will be sent to the AI. Nothing is truncated.</DialogDescription>
          </DialogHeader>
          {promptStats && (
            <div className="text-[11px] flex gap-4" style={{ color: '#8B7659' }}>
              <span>{promptStats.chars.toLocaleString()} chars</span>
              <span>~{promptStats.tokens.toLocaleString()} tokens</span>
              <span>Pack {pack.id}@{pack.version}</span>
            </div>
          )}
          <div className="flex-1 min-h-0 overflow-auto rounded-lg border p-4 space-y-4">
            {composedPrompt ? (
              <>
                {Object.entries(composedPrompt.layers).map(([name, text]) => (
                  <div key={name}>
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold mb-1" style={{ color: styles.accent }}>{name}</p>
                    <pre className="whitespace-pre-wrap break-words text-[11px] leading-[1.6] font-mono">{text}</pre>
                  </div>
                ))}
              </>
            ) : (
              <p className="text-sm text-muted-foreground">Prompt not ready.</p>
            )}
          </div>
          <DialogFooter className="gap-2">
            <button onClick={handleCopyPrompt} disabled={!composedPrompt} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md border text-xs">
              <Copy size={12} /> Copy prompt
            </button>
            <button onClick={() => setShowPrompt(false)} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs" style={{ background: styles.accent, color: 'white' }}>
              Close
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

