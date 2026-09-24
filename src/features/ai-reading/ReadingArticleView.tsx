import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { DateTime } from 'luxon';
import {
  ArrowLeft,
  Printer,
  Copy,
  RefreshCw,
  Loader2,
  BookOpen,
  Type,
  Minus,
  Plus,
  Eye,
} from 'lucide-react';
import { toast } from 'sonner';

import { useActiveProfile } from '@/features/birth-profile/store';
import { prisriJyotish } from '@/infrastructure/astrology/prisri-jyotish.adapter';
import { getCategory, CATEGORY_MAP } from './categories';
import type { ReadingCategoryId } from './categories';
import { useReadingStore, makeReadingKey, hashProfile } from './store';
import { buildChartPayload, buildGocharPayload } from './chart-payload';
import { composeReadingPrompt, PROMPT_VERSION } from './prompt';
import { ACCENT_STYLES } from './accents';
import { parseArticle, countWords, readingMinutes } from './markdown';
import { buildTemplate, validateArticle, formatValidation } from './schema';
import {
  generateWithFallback,
  type FallbackResult,
} from '@/features/ai-settings/providers';
import { getAiSettingsSnapshot } from '@/features/ai-settings/store';
import { ArticleBody } from './components/ArticleBody';
import { ArticleTOC } from './components/ArticleTOC';
import { OrnamentalDivider } from '@/features/report/primitives/OrnamentalDivider';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

const FONT_KEY = 'kundaliyatra-reading-font-scale';

export function ReadingArticleView() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const profile = useActiveProfile();

  const category = useMemo(() => {
    if (!categoryId || !(categoryId in CATEGORY_MAP)) return null;
    try {
      return getCategory(categoryId as ReadingCategoryId);
    } catch {
      return null;
    }
  }, [categoryId]);

  const records = useReadingStore((s) => s.records);
  const saveRecord = useReadingStore((s) => s.save);
  const [generating, setGenerating] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  const [fontScale, setFontScale] = useState<number>(() => {
    const v = typeof window !== 'undefined' ? localStorage.getItem(FONT_KEY) : null;
    return v ? Number(v) : 1;
  });
  useEffect(() => {
    localStorage.setItem(FONT_KEY, String(fontScale));
  }, [fontScale]);

  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? Math.min(1, el.scrollTop / max) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const kundli = useMemo(() => {
    if (!profile) return null;
    try {
      return prisriJyotish.calculate(profile) as any;
    } catch {
      return null;
    }
  }, [profile]);

  const payload = useMemo(() => {
    if (!kundli) return null;
    return buildChartPayload(kundli);
  }, [kundli]);

  const gocharPayload = useMemo(() => {
    if (!kundli || !category?.requiresTransits) return undefined;
    try {
      return buildGocharPayload(kundli);
    } catch {
      return undefined;
    }
  }, [kundli, category]);

  const composedPrompt = useMemo(() => {
    if (!payload || !category) return null;
    try {
      return composeReadingPrompt(category, payload, gocharPayload);
    } catch {
      return null;
    }
  }, [payload, category, gocharPayload]);

  const promptStats = useMemo(() => {
    if (!composedPrompt) return null;
    const chars = composedPrompt.length;
    return {
      chars,
      tokens: Math.ceil(chars / 4),
      hasTransits: Boolean(gocharPayload),
    };
  }, [composedPrompt, gocharPayload]);

  const primaryProvider = useMemo(() => {
    if (!showPrompt) return null;
    try {
      const snap = getAiSettingsSnapshot();
      const id = snap.providerOrder.find((p) => snap.providers[p]?.apiKey);
      if (!id) return null;
      return { id, model: snap.providers[id]?.preferredModel ?? '' };
    } catch {
      return null;
    }
  }, [showPrompt]);

  const cacheKey = useMemo(() => {
    if (!profile || !category) return '';
    // Per-category version (when set) overrides the global PROMPT_VERSION.
    // This lets a single reading iterate without invalidating others.
    const version = category.promptVersion ?? PROMPT_VERSION;
    return makeReadingKey(
      profile,
      category.id,
      version,
      category.defaults.tone,
      category.defaults.language,
      category.defaults.length
    );
  }, [profile, category]);

  const record = cacheKey ? records[cacheKey] : null;

  const handleGenerate = async () => {
    if (!profile || !payload || !category || !composedPrompt) return;
    setGenerating(true);
    try {
      const snapshot = getAiSettingsSnapshot();
      const template = buildTemplate(category);

      let currentPrompt = composedPrompt;
      let res: FallbackResult | null = null;
      let validation: ReturnType<typeof validateArticle> | null = null;
      let retried = false;

      const MAX_ATTEMPTS = 2;

      for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
        res = await generateWithFallback({
          prompt: currentPrompt,
          order: snapshot.providerOrder,
          configs: snapshot.providers,
          extras: {
            tone: category.defaults.tone,
            numberOfWord: category.defaults.length,
            language: category.defaults.language,
          },
        });

        if (!res.ok || !res.text) break;

        validation = validateArticle(res.text, template);

        const hasStructural = validation.issues.some(
          (i) =>
            i.kind === 'missing' || i.kind === 'extra' || i.kind === 'reordered'
        );

        if (!hasStructural) break;
        if (attempt === MAX_ATTEMPTS - 1) break;

        const missing = validation.issues
          .filter((i) => i.kind === 'missing')
          .map((i) => i.section)
          .filter((s): s is string => Boolean(s));
        const extra = validation.issues
          .filter((i) => i.kind === 'extra')
          .map((i) => i.section)
          .filter((s): s is string => Boolean(s));
        const reordered = validation.issues.some((i) => i.kind === 'reordered');

        let suffix = '\n\n---\n\nRETRY NOTE: Your previous response had structural problems.\n';
        if (missing.length) suffix += `- Missing sections: ${missing.join(', ')}\n`;
        if (extra.length) suffix += `- Extra sections not in the template: ${extra.join(', ')}\n`;
        if (reordered) suffix += '- Sections were emitted in the wrong order.\n';
        suffix +=
          '\nRegenerate the entire article with all sections present, no extra sections, and in the exact order specified.';

        currentPrompt = composedPrompt + suffix;
        retried = true;
      }

      if (!res || !res.ok || !res.text) {
        toast.error(res?.error ?? 'Generation failed.');
        return;
      }

      const wordCount = countWords(res.text);
      saveRecord({
        key: cacheKey,
        categoryId: category.id,
        profileHash: hashProfile(profile),
        profileName: profile.profileName,
        text: res.text,
        providerId: res.providerId,
        modelId: snapshot.providers[res.providerId]?.preferredModel ?? '',
        tone: category.defaults.tone,
        language: category.defaults.language,
        length: category.defaults.length,
        promptVersion: PROMPT_VERSION,
        generatedAt: new Date().toISOString(),
        wordCount,
      });

      const attempts = res.attempts ?? [];
      const failed = attempts.slice(0, -1).map((a) => a.providerId);
      const fallbackLine =
        failed.length > 0
          ? `Fallback: ${failed.join(', ')} failed → ${res.providerId} answered.`
          : '';

      if (!validation || validation.ok) {
        const parts: string[] = [];
        if (retried) parts.push('Retry succeeded after structural drift.');
        if (fallbackLine) parts.push(fallbackLine);
        toast.success('Reading composed.', {
          description: parts.length ? parts.join(' ') : undefined,
        });
      } else {
        console.warn('[article-schema] validation issues:', validation);
        const issueLine = formatValidation(validation);
        toast.warning(`Composed with ${validation.issues.length} issue(s)`, {
          description: [fallbackLine, issueLine].filter(Boolean).join('\n'),
          duration: 10000,
        });
      }
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = async () => {
    if (record) {
      await navigator.clipboard.writeText(record.text);
      toast.success('Copied.');
    }
  };
  const handlePrint = () => setTimeout(() => window.print(), 60);

  const handleCopyPrompt = async () => {
    if (!composedPrompt) return;
    await navigator.clipboard.writeText(composedPrompt);
    toast.success('Prompt copied to clipboard.');
  };

  if (!profile || !kundli || !payload || !category) {
    return (
      <div className="container max-w-2xl mx-auto px-4 py-24 text-center space-y-4">
        <p className="text-sm text-muted-foreground">Reading not found.</p>
        <Link to="/reading" className="text-primary hover:underline text-sm">
          ← Back to studio
        </Link>
      </div>
    );
  }

  const styles = ACCENT_STYLES[category.accent];
  const parsed = record ? parseArticle(record.text) : null;

  const signature = [
    kundli?.ascendant?.rashiName && `${kundli.ascendant.rashiName} Lagna`,
    kundli?.planets?.Moon?.rashiName && `${kundli.planets.Moon.rashiName} Chandra`,
    kundli?.planets?.Sun?.rashiName && `${kundli.planets.Sun.rashiName} Surya`,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <div className="min-h-screen" style={{ background: styles.articleBg }}>
      <div
        className="no-print fixed top-0 left-0 right-0 h-[2px] z-50 origin-left"
        style={{
          background: styles.accent,
          transform: `scaleX(${progress})`,
          transition: 'transform 80ms linear',
        }}
      />

      <div
        className="no-print sticky top-0 z-40 border-b backdrop-blur"
        style={{
          background: 'hsl(var(--background) / 0.85)',
          borderColor: styles.borderSoft,
        }}
      >
        <div className="container mx-auto max-w-5xl px-4 h-12 flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/reading')}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={13} /> Studio
          </button>
          <div
            className="w-px h-4 mx-1 opacity-30"
            style={{ background: styles.accent }}
          />
          <span
            className="text-[10px] uppercase tracking-[0.2em] font-semibold truncate"
            style={{ color: styles.accent }}
          >
            {category.title}
          </span>
          <div className="flex-1" />
          <button
            type="button"
            onClick={() => setShowPrompt(true)}
            className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
            title="Preview the prompt"
            aria-label="Preview prompt"
          >
            <Eye size={13} />
          </button>
          <div
            className="hidden md:flex items-center gap-0.5 rounded-full border px-1"
            style={{ borderColor: styles.borderSoft }}
          >
            <button
              type="button"
              onClick={() => setFontScale(Math.max(0.85, fontScale - 0.1))}
              className="p-1.5 text-muted-foreground hover:text-foreground"
              aria-label="Smaller text"
            >
              <Minus size={12} />
            </button>
            <Type size={12} className="text-muted-foreground" />
            <button
              type="button"
              onClick={() => setFontScale(Math.min(1.35, fontScale + 0.1))}
              className="p-1.5 text-muted-foreground hover:text-foreground"
              aria-label="Larger text"
            >
              <Plus size={12} />
            </button>
          </div>
          {record && (
            <>
              <button
                type="button"
                onClick={handleCopy}
                className="p-1.5 text-muted-foreground hover:text-foreground"
                title="Copy reading"
              >
                <Copy size={13} />
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="p-1.5 text-muted-foreground hover:text-foreground"
                title="Print / PDF"
              >
                <Printer size={13} />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-10 lg:py-14">
        {!record ? (
          <div className="max-w-xl mx-auto text-center space-y-8 py-16">
            <div className="space-y-4">
              <p
                className="text-[10px] uppercase tracking-[0.4em] font-semibold"
                style={{ color: styles.accent }}
              >
                {category.sanskrit}
              </p>
              <h1
                style={{
                  fontFamily: "'Cormorant Garamond', 'Crimson Pro', Georgia, serif",
                  fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                  fontWeight: 600,
                  lineHeight: 1.15,
                }}
              >
                {category.title}
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
                {category.description}
              </p>
            </div>
            <OrnamentalDivider />
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={generating || !composedPrompt}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
                  style={{ background: styles.accent, color: 'white' }}
                >
                  {generating ? (
                    <>
                      <Loader2 size={14} className="animate-spin" /> Composing…
                    </>
                  ) : (
                    <>
                      <BookOpen size={14} /> Compose this reading
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowPrompt(true)}
                  disabled={!composedPrompt}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium border-2 transition-all hover:scale-[1.02] disabled:opacity-40 disabled:hover:scale-100"
                  style={{
                    borderColor: styles.border,
                    color: styles.accent,
                    background: 'transparent',
                  }}
                >
                  <Eye size={14} /> View prompt
                </button>
              </div>
              <p className="text-[11px] text-muted-foreground">
                ~{category.estimatedWords.toLocaleString()} words ·{' '}
                {category.estimatedMinutes} min read
              </p>
            </div>
          </div>
        ) : (
          <article
            className="relative rounded-3xl border overflow-hidden"
            style={{
              borderColor: styles.border,
              background: 'white',
              boxShadow:
                '0 1px 2px hsl(30 25% 20% / 0.04), 0 8px 40px hsl(30 25% 20% / 0.06)',
            }}
          >
            <header
              className="px-6 md:px-12 lg:px-16 pt-12 md:pt-16 pb-10 text-center space-y-6 border-b"
              style={{ borderColor: styles.borderSoft }}
            >
              <div className="flex justify-center">
                <div
                  className="rounded-full overflow-hidden"
                  style={{
                    width: 'clamp(56px, 6vw, 72px)',
                    height: 'clamp(56px, 6vw, 72px)',
                    border: `1px solid ${styles.ornament}80`,
                    boxShadow: `0 0 0 4px ${styles.articleBg}, 0 0 0 5px ${styles.ornament}33`,
                  }}
                >
                  <img
                    src="/ganesh.png"
                    alt="Ganesh"
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </div>
              </div>

              <p
                style={{
                  fontFamily: "'Noto Serif Devanagari', serif",
                  fontSize: '13px',
                  color: styles.accent,
                  letterSpacing: '0.08em',
                }}
              >
                {category.sanskrit}
              </p>

              <div className="space-y-2">
                <p
                  className="text-[10px] uppercase tracking-[0.4em] font-semibold"
                  style={{ color: styles.ornament }}
                >
                  {category.title}
                </p>
                <h1
                  style={{
                    fontFamily:
                      "'Cormorant Garamond', 'Crimson Pro', Georgia, serif",
                    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                    fontWeight: 600,
                    color: '#2E1F14',
                    lineHeight: 1.15,
                    letterSpacing: '0.01em',
                  }}
                >
                  {record.profileName}
                </h1>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: '14px',
                    color: '#6B4F35',
                    fontStyle: 'italic',
                  }}
                >
                  {signature}
                </p>
              </div>

              <div
                className="flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.2em] font-medium"
                style={{ color: '#8B7659' }}
              >
                <span>
                  <BookOpen size={10} className="inline mr-1" />
                  {record.wordCount.toLocaleString()} words
                </span>
                <span className="opacity-40">·</span>
                <span>{readingMinutes(record.wordCount)} min</span>
                <span className="opacity-40">·</span>
                <span>
                  {new Date(record.generatedAt).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>

              <OrnamentalDivider />
            </header>

            <div className="px-6 md:px-12 lg:px-16 py-14 md:py-20">
              <div className="mx-auto" style={{ maxWidth: '68ch' }}>
                <ArticleBody
                  sections={parsed!.sections}
                  ornament={styles.ornament}
                  fontScale={fontScale}
                />
              </div>
            </div>

            <footer
              className="relative px-6 md:px-12 lg:px-16 pt-14 pb-16 border-t"
              style={{ borderColor: styles.borderSoft }}
            >
              <div className="max-w-md mx-auto">
                <div className="flex justify-center mb-8">
                  <div
                    className="relative flex items-center justify-center rounded-full"
                    style={{
                      width: 84,
                      height: 84,
                      border: `1px solid ${styles.ornament}55`,
                      background:
                        'radial-gradient(circle at 50% 40%, hsl(42 55% 98%), hsl(38 45% 96%))',
                      boxShadow: `inset 0 0 0 5px #FFFFFF, inset 0 0 0 6px ${styles.ornament}25`,
                    }}
                    role="img"
                    aria-label="Iti — thus ends"
                  >
                    <span
                      style={{
                        fontFamily:
                          "'Tiro Devanagari Sanskrit', 'Noto Serif Devanagari', serif",
                        fontSize: 26,
                        color: styles.accent,
                        opacity: 0.88,
                        lineHeight: 1,
                        paddingTop: 6,
                      }}
                    >
                      इति
                    </span>
                  </div>
                </div>

                <div
                  className="flex items-center gap-3 mb-7"
                  aria-hidden="true"
                >
                  <span
                    className="h-px flex-1"
                    style={{
                      background: `linear-gradient(to right, transparent, ${styles.ornament}66)`,
                    }}
                  />
                  <span
                    style={{
                      color: styles.ornament,
                      fontSize: 9,
                      lineHeight: 1,
                      opacity: 0.85,
                    }}
                  >
                    ✦
                  </span>
                  <span
                    className="h-px flex-1"
                    style={{
                      background: `linear-gradient(to left, transparent, ${styles.ornament}66)`,
                    }}
                  />
                </div>

                <div className="text-center space-y-3">
                  <p
                    className="text-[10px] uppercase tracking-[0.5em] font-medium"
                    style={{ color: styles.ornament }}
                  >
                    Iti · Thus Ends
                  </p>
                  <h3
                    style={{
                      fontFamily:
                        "'Cormorant Garamond', 'Crimson Pro', Georgia, serif",
                      fontSize: '1.7rem',
                      fontWeight: 500,
                      color: '#2E1F14',
                      lineHeight: 1.2,
                      letterSpacing: '0.01em',
                    }}
                  >
                    {category.title}
                  </h3>
                </div>

                <p
                  className="text-center mt-6"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: '15px',
                    fontStyle: 'italic',
                    color: '#6B4F35',
                    lineHeight: 1.75,
                  }}
                >
                  Composed for {record.profileName},
                  <br />
                  from the heavens at the moment of birth.
                </p>

                <div
                  className="mt-12 pt-6 border-t space-y-2.5 max-w-xs mx-auto"
                  style={{ borderColor: `${styles.ornament}22` }}
                >
                  <ColophonRow
                    label="Tradition"
                    value="Vedic · Lahiri · Whole Sign"
                  />
                  <ColophonRow
                    label="Penned by"
                    value={
                      record.modelId
                        ? `${record.providerId} · ${record.modelId}`
                        : record.providerId
                    }
                  />
                  <ColophonRow
                    label="On"
                    value={fmtColophonDate(record.generatedAt)}
                    mono
                  />
                  <ColophonRow
                    label="Prompt"
                    value={`v${record.promptVersion}`}
                    mono
                  />
                </div>

                <div className="mt-12 text-center space-y-4">
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: '14px',
                      color: '#8B7659',
                      fontStyle: 'italic',
                      lineHeight: 1.85,
                    }}
                  >
                    For guidance, not certainty.
                    <br />
                    For direction, not fate.
                  </p>
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: '12px',
                      color: '#A89072',
                      lineHeight: 1.7,
                    }}
                  >
                    In matters of consequence,
                    <br />
                    consult a qualified Jyotishi.
                  </p>
                </div>

                <div
                  className="mt-14 flex items-center justify-center gap-3"
                  aria-hidden="true"
                >
                  <span
                    className="h-px"
                    style={{ width: 32, background: `${styles.ornament}44` }}
                  />
                  <span
                    className="text-[9px] uppercase tracking-[0.55em] font-medium"
                    style={{ color: `${styles.ornament}AA` }}
                  >
                    KundaliYatra
                  </span>
                  <span
                    className="h-px"
                    style={{ width: 32, background: `${styles.ornament}44` }}
                  />
                </div>
              </div>
            </footer>

            <div
              className="no-print sticky bottom-4 mx-auto w-fit mb-6 flex items-center gap-2 rounded-full border bg-white/85 backdrop-blur px-3 py-2 shadow-lg"
              style={{ borderColor: styles.border }}
            >
              <button
                type="button"
                onClick={handleCopy}
                className="px-2 py-1 text-xs inline-flex items-center gap-1.5 hover:bg-muted/40 rounded"
              >
                <Copy size={12} /> Copy
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="px-2 py-1 text-xs inline-flex items-center gap-1.5 hover:bg-muted/40 rounded"
              >
                <Printer size={12} /> Print
              </button>
              <button
                type="button"
                onClick={() => setShowPrompt(true)}
                className="px-2 py-1 text-xs inline-flex items-center gap-1.5 hover:bg-muted/40 rounded"
              >
                <Eye size={12} /> Prompt
              </button>
              <button
                type="button"
                onClick={handleGenerate}
                disabled={generating || !composedPrompt}
                className="px-2 py-1 text-xs inline-flex items-center gap-1.5 hover:bg-muted/40 rounded disabled:opacity-50"
              >
                {generating ? (
                  <Loader2 size={12} className="animate-spin" />
                ) : (
                  <RefreshCw size={12} />
                )}{' '}
                Regenerate
              </button>
            </div>

            <ArticleTOC
              sections={parsed!.sections}
              accent={styles.accent}
            />
          </article>
        )}
      </div>

      <Dialog open={showPrompt} onOpenChange={setShowPrompt}>
        <DialogContent
          className="max-w-4xl max-h-[88vh] flex flex-col"
          style={{ borderColor: styles.border, background: '#FFFFFF' }}
        >
          <DialogHeader className="text-left">
            <DialogTitle
              style={{
                fontFamily:
                  "'Cormorant Garamond', 'Crimson Pro', Georgia, serif",
                fontSize: '1.5rem',
                color: '#2E1F14',
                letterSpacing: '0.01em',
              }}
            >
              Prompt preview
            </DialogTitle>
            <DialogDescription style={{ color: '#6B4F35' }}>
              Exactly what will be sent to the AI provider on the next{' '}
              <em>Compose</em>. Nothing is truncated.
            </DialogDescription>
          </DialogHeader>

          <div
            className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] pt-1 pb-2"
            style={{
              color: '#8B7659',
              borderBottom: `1px solid ${styles.borderSoft}`,
            }}
          >
            {promptStats ? (
              <>
                <span>
                  <strong style={{ color: '#2E1F14' }}>
                    {promptStats.chars.toLocaleString()}
                  </strong>{' '}
                  chars
                </span>
                <span style={{ opacity: 0.4 }}>·</span>
                <span>
                  ~
                  <strong style={{ color: '#2E1F14' }}>
                    {promptStats.tokens.toLocaleString()}
                  </strong>{' '}
                  tokens
                </span>
                <span style={{ opacity: 0.4 }}>·</span>
                <span>
                  {promptStats.hasTransits ? (
                    <span style={{ color: styles.accent, fontWeight: 600 }}>
                      ● Gochar included
                    </span>
                  ) : (
                    <span style={{ opacity: 0.6 }}>○ No transits</span>
                  )}
                </span>
                {primaryProvider && (
                  <>
                    <span style={{ opacity: 0.4 }}>·</span>
                    <span>
                      Sending via{' '}
                      <strong style={{ color: '#2E1F14' }}>
                        {primaryProvider.id}
                      </strong>
                      {primaryProvider.model && (
                        <span style={{ opacity: 0.6 }}>
                          {' '}
                          · {primaryProvider.model}
                        </span>
                      )}
                    </span>
                  </>
                )}
              </>
            ) : (
              <span>Prompt not ready — enter birth details first.</span>
            )}
          </div>

          <div
            className="flex-1 min-h-0 overflow-auto rounded-lg border p-4"
            style={{
              background: 'rgba(139, 118, 89, 0.04)',
              borderColor: styles.borderSoft,
            }}
          >
            <pre
              className="whitespace-pre-wrap break-words text-[11px] leading-[1.65]"
              style={{
                fontFamily:
                  'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
                color: '#2E1F14',
              }}
            >
              {composedPrompt ??
                'Prompt not ready — the chart must be computed before the prompt can be shown.'}
            </pre>
          </div>

          <DialogFooter className="gap-2 sm:gap-2">
            <button
              type="button"
              onClick={handleCopyPrompt}
              disabled={!composedPrompt}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-md border text-xs font-medium transition-colors hover:bg-muted/40 disabled:opacity-40"
              style={{ borderColor: styles.borderSoft, color: '#2E1F14' }}
            >
              <Copy size={12} /> Copy prompt
            </button>
            <button
              type="button"
              onClick={() => setShowPrompt(false)}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-md text-xs font-medium transition-colors"
              style={{ background: styles.accent, color: 'white' }}
            >
              Close
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   Colophon helpers — used only by the article footer.
   ───────────────────────────────────────────────────────────────────── */

function fmtColophonDate(iso: string): string {
  try {
    const dt = DateTime.fromISO(iso);
    if (!dt.isValid) return iso;
    return dt.toFormat('dd LLLL yyyy, HH:mm');
  } catch {
    return iso;
  }
}

function ColophonRow({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3 text-[10px]">
      <span
        className="uppercase tracking-[0.2em] font-medium shrink-0"
        style={{
          color: '#A89072',
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
      >
        {label}
      </span>
      <span
        className={mono ? 'font-mono text-right' : 'text-right'}
        style={{
          fontFamily: mono
            ? 'ui-monospace, monospace'
            : "'Cormorant Garamond', Georgia, serif",
          fontSize: mono ? '10px' : '13px',
          color: '#5A4430',
          lineHeight: 1.4,
        }}
      >
        {value}
      </span>
    </div>
  );
}