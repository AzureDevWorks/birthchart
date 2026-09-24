import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import {
  Check, Eye, EyeOff, ExternalLink, Loader2, Trash2,
  ArrowUp, ArrowDown, Star, Pin, ChevronDown, ChevronRight, Shield, Circle,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Section } from '@/features/report/primitives/Section';
import { OrnamentalDivider } from '@/features/report/primitives/OrnamentalDivider';
import { cn } from '@/lib/utils';
import { PROVIDERS, generateWithProvider, type AiProvider } from './providers';
import { useAiSettings, useProviderConfig, useProviderOrder } from './store';

// ─────────────────────────────────────────────────────────────
// Provider categories
// ─────────────────────────────────────────────────────────────
const CATEGORY_LABELS: Record<string, { title: string; hint: string }> = {
  free:   { title: 'Free Tier',  hint: 'Providers with a generous free tier — start here.' },
  cheap:  { title: 'Low Cost',   hint: 'Pay-per-use providers with low rates.' },
  direct: { title: 'Direct API', hint: 'Direct access to Anthropic / OpenAI. No free tier.' },
};

export function AiSettingsView() {
  const { t } = useTranslation();
  const order = useProviderOrder();
  const clearAll = useAiSettings((s) => s.clearAll);
  const providers = useAiSettings((s) => s.providers);

  const configuredCount = Object.values(providers).filter((p) => p.apiKey).length;
  const poolCount = order.filter((id) => providers[id]?.apiKey).length;

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8 md:py-12 space-y-6">
      <div className="space-y-3">
        <p className="text-[10px] uppercase tracking-[0.4em] text-primary font-semibold">
          {t('aiSettings.eyebrow', { defaultValue: 'Configuration' })}
        </p>
        <h1
          className="font-bold tracking-tight"
          style={{
            fontFamily: "'Cormorant Garamond', 'Crimson Pro', Georgia, serif",
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            lineHeight: 1.1,
          }}
        >
          {t('aiSettings.title', { defaultValue: 'AI Settings' })}
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          {t('aiSettings.subtitle', {
            defaultValue:
              'Connect one or many providers. The first in your pool is tried first; the rest are automatic fallbacks if it fails. Keys stay in your browser — never sent to our servers.',
          })}
        </p>
      </div>

      <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
        <span className="flex items-center gap-1.5">
          <Circle size={6} fill="currentColor" className={configuredCount > 0 ? 'text-emerald-500' : 'text-muted-foreground/40'} />
          {configuredCount === 0
            ? t('aiSettings.noKeys', { defaultValue: 'No keys configured' })
            : `${configuredCount} key${configuredCount === 1 ? '' : 's'} saved`}
        </span>
        <span className="opacity-30">·</span>
        <span className="flex items-center gap-1.5">
          <Star size={10} className={poolCount > 0 ? 'text-primary' : 'text-muted-foreground/40'} />
          {poolCount === 0 ? 'Pool empty' : `${poolCount} in fallback pool`}
        </span>
      </div>

      {poolCount > 0 && (
        <>
          <OrnamentalDivider />
          <Section
            eyebrow={t('aiSettings.poolEyebrow', { defaultValue: 'Fallback Order' })}
            title={t('aiSettings.poolTitle', { defaultValue: 'AI Provider Pool' })}
            hint={t('aiSettings.poolHint', {
              defaultValue: 'The first provider is tried first. On failure, the next is tried, then the next.',
            })}
          >
            <PoolPanel />
          </Section>
        </>
      )}

      <OrnamentalDivider />

      <Section
        eyebrow={t('aiSettings.providersEyebrow', { defaultValue: 'Providers' })}
        title={t('aiSettings.providersTitle', { defaultValue: 'All Providers' })}
        hint={t('aiSettings.providersHint', {
          defaultValue: 'Save keys for as many as you like. Toggle "In pool" to include a provider in the fallback chain.',
        })}
      >
        <div className="space-y-8">
          {(['free', 'cheap', 'direct'] as const).map((category) => {
            const categoryProviders = PROVIDERS.filter((p) => p.category === category);
            if (categoryProviders.length === 0) return null;
            const meta = CATEGORY_LABELS[category];
            return (
              <div key={category} className="space-y-3">
                <div className="space-y-0.5">
                  <p
                    className="text-[10px] uppercase tracking-[0.3em] font-semibold text-primary/70"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                  >
                    {meta.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{meta.hint}</p>
                </div>
                <div className="space-y-3">
                  {categoryProviders.map((provider) => (
                    <ProviderRow key={provider.id} provider={provider} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {poolCount > 0 && (
        <>
          <OrnamentalDivider />
          <div className="rounded-xl border border-destructive/30 bg-destructive/[0.03] p-4 flex items-center justify-between gap-4 flex-wrap">
            <div className="space-y-0.5">
              <p className="text-sm font-semibold">
                {t('aiSettings.clearAll', { defaultValue: 'Clear all AI settings' })}
              </p>
              <p className="text-xs text-muted-foreground">
                {t('aiSettings.clearAllHint', {
                  defaultValue: 'Removes all API keys and pool ordering from this browser.',
                })}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => { clearAll(); toast.success('All AI settings cleared.'); }}
              className="gap-1.5 text-destructive hover:text-destructive"
            >
              <Trash2 size={12} />
              {t('aiSettings.clearAllButton', { defaultValue: 'Clear All' })}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Pool Panel
// ─────────────────────────────────────────────────────────────
function PoolPanel() {
  const { t } = useTranslation();
  const order = useProviderOrder();
  const providers = useAiSettings((s) => s.providers);
  const moveUp = useAiSettings((s) => s.moveUp);
  const moveDown = useAiSettings((s) => s.moveDown);
  const toggleInPool = useAiSettings((s) => s.toggleInPool);

  const activeOrder = order.filter((id) => providers[id]?.apiKey);

  return (
    <div className="rounded-xl border bg-card overflow-hidden">
      {activeOrder.map((id, i) => {
        const provider = PROVIDERS.find((p) => p.id === id);
        if (!provider) return null;
        const isPrimary = i === 0;
        const isFirst = i === 0;
        const isLast = i === activeOrder.length - 1;

        return (
          <div key={id} className={cn('flex items-center gap-3 px-4 py-3', i > 0 && 'border-t')}>
            <span className={cn(
              'shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold',
              isPrimary ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            )}>
              {isPrimary ? <Star size={11} /> : i + 1}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{provider.name}</p>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {isPrimary
                  ? t('aiSettings.poolPrimary', { defaultValue: 'Primary' })
                  : t('aiSettings.poolFallback', { defaultValue: 'Fallback {{n}}', n: i })}
              </p>
            </div>
            <div className="flex items-center gap-0.5 shrink-0">
              <button type="button" onClick={() => moveUp(id)} disabled={isFirst}
                className={cn('p-1.5 rounded transition-colors', isFirst ? 'text-muted-foreground/20 cursor-not-allowed' : 'text-muted-foreground hover:text-foreground hover:bg-accent')}
                aria-label="Move up"><ArrowUp size={13} /></button>
              <button type="button" onClick={() => moveDown(id)} disabled={isLast}
                className={cn('p-1.5 rounded transition-colors', isLast ? 'text-muted-foreground/20 cursor-not-allowed' : 'text-muted-foreground hover:text-foreground hover:bg-accent')}
                aria-label="Move down"><ArrowDown size={13} /></button>
              <button type="button" onClick={() => toggleInPool(id)}
                className="p-1.5 rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors ml-1"
                aria-label="Remove from pool" title="Remove from pool"><Trash2 size={12} /></button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Provider Row
// ─────────────────────────────────────────────────────────────
type TestStatus = 'untested' | 'testing' | 'ok' | 'error';

function ProviderRow({ provider }: { provider: AiProvider }) {
  const { t } = useTranslation();
  const config = useProviderConfig(provider.id);
  const order = useProviderOrder();
  const setApiKey = useAiSettings((s) => s.setApiKey);
  const setPreferredModel = useAiSettings((s) => s.setPreferredModel);
  const toggleInPool = useAiSettings((s) => s.toggleInPool);
  const clearProvider = useAiSettings((s) => s.clearProvider);

  const [showKey, setShowKey] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState<TestStatus>('untested');
  const [testError, setTestError] = useState<string | null>(null);

  const hasKey = Boolean(config.apiKey);
  const inPool = order.includes(provider.id);
  const position = order.indexOf(provider.id);
  const selectedModel = config.preferredModel ?? provider.models[0]?.id ?? '';

  const handleTest = async () => {
    if (!selectedModel) { toast.error('Pick a model first.'); return; }
    setStatus('testing'); setTestError(null);
    const res = await generateWithProvider(provider.id, {
      prompt: 'Reply with a single word: OK', modelId: selectedModel, apiKey: config.apiKey,
    });
    if (res.ok) { setStatus('ok'); toast.success(`${provider.name}: connected.`); }
    else { setStatus('error'); setTestError(res.error ?? 'Unknown error'); toast.error(`${provider.name}: ${res.error ?? 'failed'}`); }
  };

  const statusDot =
    status === 'ok' ? 'bg-emerald-500'
    : status === 'error' ? 'bg-red-500'
    : status === 'testing' ? 'bg-amber-500 animate-pulse'
    : hasKey ? 'bg-amber-400'
    : 'bg-muted-foreground/30';

  return (
    <div className={cn('rounded-xl border bg-card transition-colors', inPool && hasKey && 'border-primary/50 bg-primary/[0.02]')}>
      <div className="flex items-center gap-3 px-4 py-3">
        <span className={cn('shrink-0 w-2 h-2 rounded-full', statusDot)} aria-hidden="true" />
        <button type="button" onClick={() => setExpanded((v) => !v)} className="flex-1 min-w-0 text-left group">
          <div className="flex items-baseline gap-2 flex-wrap">
            <h3 className="font-bold leading-tight group-hover:text-primary transition-colors"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.05rem' }}>
              {provider.name}
            </h3>
            {inPool && hasKey && (
              <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-primary/10 text-primary font-bold inline-flex items-center gap-1">
                <Pin size={8} /> {position === 0 ? 'Primary' : `#${position + 1}`}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5 truncate">{provider.description}</p>
        </button>
        <button type="button" role="switch" aria-checked={inPool} onClick={() => toggleInPool(provider.id)}
          className={cn('relative inline-flex shrink-0 h-5 w-9 rounded-full transition-colors', inPool ? 'bg-primary' : 'bg-muted')}
          title={inPool ? 'In pool — click to remove' : 'Not in pool — click to add'}>
          <span className={cn('absolute top-0.5 h-4 w-4 rounded-full bg-background shadow-sm transition-transform', inPool ? 'translate-x-[18px]' : 'translate-x-0.5')} />
        </button>
        <button type="button" onClick={() => setExpanded((v) => !v)}
          className="shrink-0 p-1 text-muted-foreground hover:text-foreground transition-colors"
          aria-label={expanded ? 'Collapse' : 'Expand'}>
          {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>

      {expanded && (
        <div className="px-4 pb-4 pt-1 space-y-4 border-t">
          <div className="space-y-2 pt-3">
            <div className="flex items-center justify-between">
              <Label htmlFor={`key-${provider.id}`} className="text-xs">
                {t('aiSettings.apiKey', { defaultValue: 'API Key' })}
              </Label>
              <a href={provider.docsUrl} target="_blank" rel="noopener noreferrer"
                className="text-[11px] text-primary hover:underline inline-flex items-center gap-1">
                {t('aiSettings.getKey', { defaultValue: 'Get a key' })} <ExternalLink size={10} />
              </a>
            </div>
            <div className="relative">
              <Input id={`key-${provider.id}`} type={showKey ? 'text' : 'password'} value={config.apiKey}
                onChange={(e) => { setApiKey(provider.id, e.target.value); setStatus('untested'); }}
                placeholder={provider.keyHint ?? 'Paste your key…'} autoComplete="off" spellCheck={false}
                className="pr-10 font-mono text-xs" />
              <button type="button" onClick={() => setShowKey((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showKey ? 'Hide key' : 'Show key'}>
                {showKey ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`model-${provider.id}`} className="text-xs">
              {t('aiSettings.model', { defaultValue: 'Model' })}
            </Label>
            <select id={`model-${provider.id}`} value={selectedModel}
              onChange={(e) => setPreferredModel(provider.id, e.target.value)}
              className="w-full h-9 px-3 rounded-md border border-input bg-background text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              {provider.models.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}{m.tier ? ` · ${m.tier}` : ''}{m.note ? ` — ${m.note}` : ''}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 flex-wrap pt-1">
            <Button variant="outline" size="sm" onClick={handleTest} disabled={!hasKey || status === 'testing'} className="gap-1.5">
              {status === 'testing' ? <Loader2 size={12} className="animate-spin" />
                : status === 'ok' ? <Check size={12} className="text-emerald-500" />
                : <Shield size={12} />}
              {status === 'ok' ? 'Verified' : t('aiSettings.testConnection', { defaultValue: 'Test' })}
            </Button>
            {hasKey && (
              <Button variant="ghost" size="sm"
                onClick={() => { clearProvider(provider.id); setStatus('untested'); setTestError(null); toast.success(`${provider.name} cleared.`); }}
                className="gap-1.5 text-destructive hover:text-destructive ml-auto">
                <Trash2 size={12} /> {t('aiSettings.clear', { defaultValue: 'Clear' })}
              </Button>
            )}
          </div>

          {testError && (
            <div className="rounded-lg px-3 py-2 text-xs border border-red-500/30 bg-red-500/[0.04] text-red-700 dark:text-red-400 leading-relaxed">
              {testError}
            </div>
          )}
        </div>
      )}
    </div>
  );
}