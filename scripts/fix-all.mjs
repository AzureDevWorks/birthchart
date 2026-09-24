#!/usr/bin/env node
// Applies 16 remediation fixes. Backs up every modified file first.
// Usage:
//   node scripts/fix-all.mjs            # apply
//   node scripts/fix-all.mjs --whatif   # dry run
//   node scripts/fix-all.mjs --skip-npm # skip npm uninstall step

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

if (!fs.existsSync(path.join(ROOT, 'package.json')) || !fs.existsSync(path.join(ROOT, 'src'))) {
  console.error('ERROR: run from project root (package.json + src/ must exist).');
  process.exit(1);
}

const WHATIF = process.argv.includes('--whatif');
const SKIP_NPM = process.argv.includes('--skip-npm');
const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
const BACKUP_DIR = path.join(ROOT, `.fix-backup-${stamp}`);

let okCount = 0, skipCount = 0, failCount = 0;

const color = {
  ok: s => `\x1b[32m${s}\x1b[0m`,
  skip: s => `\x1b[90m${s}\x1b[0m`,
  fail: s => `\x1b[31m${s}\x1b[0m`,
  info: s => `\x1b[36m${s}\x1b[0m`,
};
const log = (level, msg) => console.log(`  ${color[level](`[${level.toUpperCase()}]`)} ${msg}`);
const p = rel => path.join(ROOT, rel);

function read(rel) {
  const fp = p(rel);
  if (!fs.existsSync(fp)) return null;
  return fs.readFileSync(fp, 'utf8').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
}

function write(rel, content) {
  if (WHATIF) { log('info', `[WHATIF] write ${rel}`); okCount++; return; }
  fs.mkdirSync(path.dirname(p(rel)), { recursive: true });
  fs.writeFileSync(p(rel), content, 'utf8');
  log('ok', `wrote ${rel}`);
  okCount++;
}

function backup(rel) {
  if (WHATIF) return;
  const fp = p(rel);
  if (!fs.existsSync(fp)) return;
  const dst = path.join(BACKUP_DIR, rel);
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.copyFileSync(fp, dst);
}

function edit(rel, find, replace, label) {
  const content = read(rel);
  if (content === null) { log('fail', `${rel} — file not found`); failCount++; return; }
  if (!content.includes(find)) { log('skip', `${label || rel} — pattern not found`); skipCount++; return; }
  backup(rel);
  write(rel, content.split(find).join(replace));
}

function replaceWhole(rel, content, label) {
  backup(rel);
  write(rel, content);
  if (label) log('info', `    (${label})`);
}

function deleteFile(rel) {
  const fp = p(rel);
  if (!fs.existsSync(fp)) return;
  if (WHATIF) { log('info', `[WHATIF] delete ${rel}`); okCount++; return; }
  const stat = fs.statSync(fp);
  if (stat.isDirectory()) fs.rmSync(fp, { recursive: true, force: true });
  else fs.unlinkSync(fp);
  log('ok', `deleted ${rel}`);
  okCount++;
}

console.log(`\nRoot:    ${ROOT}`);
console.log(`Backup:  ${BACKUP_DIR}`);
console.log(`Mode:    ${WHATIF ? 'WHATIF' : 'APPLY'}\n`);

// ===========================================================================
// FIX 1 — move leaked backup + update .gitignore
// ===========================================================================
console.log('\n=== FIX 1: move leaked backup + gitignore ===');
{
  const readingsDir = p('public/readings');
  if (fs.existsSync(readingsDir)) {
    const leaks = fs.readdirSync(readingsDir).filter(f => /^kundaliyatra-backup-.*\.json$/.test(f));
    if (leaks.length > 0) {
      fs.mkdirSync(p('backups'), { recursive: true });
      for (const f of leaks) {
        const src = path.join(readingsDir, f);
        const dst = p(`backups/${f}`);
        if (WHATIF) log('info', `[WHATIF] move ${f} -> backups/`);
        else { fs.renameSync(src, dst); log('ok', `moved public/readings/${f} -> backups/${f}`); okCount++; }
      }
    } else { log('skip', 'no leaked backup json'); skipCount++; }
  } else { log('skip', 'public/readings/ missing'); skipCount++; }

  const giPath = p('.gitignore');
  const block = `
# --- KundaliYatra: private user data + generated artifacts ---
backups/
public/readings/*.json
AI-CONTEXT-SCAN.md
srcscanresult.md
ai-context.md
.fix-backup/
*.bak
*.bak-*
tailwind.config.js.bak
`;
  const existing = fs.existsSync(giPath) ? fs.readFileSync(giPath, 'utf8') : '';
  if (existing.includes('kundaliyatra-backup') || existing.includes('backups/')) {
    log('skip', '.gitignore already updated');
    skipCount++;
  } else {
    if (!WHATIF) fs.appendFileSync(giPath, block, 'utf8');
    log('ok', '.gitignore updated');
    okCount++;
  }
}

// ===========================================================================
// FIX 2 — lazy-load routes in src/App.tsx
// ===========================================================================
console.log('\n=== FIX 2: lazy routes ===');
{
  const newApp = [
    "import { lazy, Suspense } from 'react';",
    "import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';",
    "import { Toaster } from '@/components/ui/sonner';",
    "import { IconSparkle, IconLoader } from '@/components/icons';",
    "import { useTranslation } from 'react-i18next';",
    "import { AppHeaderTabs } from '@/components/app-header-tabs';",
    "import { MobileBottomNav } from '@/components/mobile-bottom-nav';",
    "import { UserMenu } from '@/components/user-menu';",
    "import { ErrorBoundary } from '@/components/error-boundary';",
    "",
    "const DashboardView      = lazy(() => import('@/features/dashboard/DashboardView').then(m => ({ default: m.DashboardView })));",
    "const ProfilesView       = lazy(() => import('@/features/profiles/ProfilesView').then(m => ({ default: m.ProfilesView })));",
    "const OverviewView       = lazy(() => import('@/features/overview/OverviewView').then(m => ({ default: m.OverviewView })));",
    "const PanchangView       = lazy(() => import('@/features/panchang/PanchangView').then(m => ({ default: m.PanchangView })));",
    "const GocharView         = lazy(() => import('@/features/gochar/GocharView').then(m => ({ default: m.GocharView })));",
    "const PredictionsView    = lazy(() => import('@/features/predictions/PredictionsView').then(m => ({ default: m.PredictionsView })));",
    "const MatchingView       = lazy(() => import('@/features/matching/MatchingView').then(m => ({ default: m.MatchingView })));",
    "const AiSettingsView     = lazy(() => import('@/features/ai-settings/AiSettingsView').then(m => ({ default: m.AiSettingsView })));",
    "const AiReadingView      = lazy(() => import('@/features/ai-reading/AiReadingView').then(m => ({ default: m.AiReadingView })));",
    "const ReadingArticleView = lazy(() => import('@/features/ai-reading/ReadingArticleView').then(m => ({ default: m.ReadingArticleView })));",
    "const ExportView         = lazy(() => import('@/features/export/ExportView').then(m => ({ default: m.ExportView })));",
    "",
    "function RouteFallback() {",
    "  const { t } = useTranslation();",
    "  return (",
    "    <div className=\"min-h-[60vh] flex items-center justify-center gap-2 text-sm text-muted-foreground\">",
    "      <IconLoader size={14} className=\"animate-spin\" />",
    "      {t('common.loading', { defaultValue: 'Loading...' })}",
    "    </div>",
    "  );",
    "}",
    "",
    "function MainRoutes() {",
    "  const location = useLocation();",
    "  return (",
    "    <ErrorBoundary key={location.pathname}>",
    "      <Suspense fallback={<RouteFallback />}>",
    "        <Routes>",
    "          <Route path=\"/\" element={<DashboardView />} />",
    "          <Route path=\"/chart\" element={<OverviewView />} />",
    "          <Route path=\"/profiles\" element={<ProfilesView />} />",
    "          <Route path=\"/export\" element={<ExportView />} />",
    "          <Route path=\"/panchang\" element={<PanchangView />} />",
    "          <Route path=\"/panchang/:sub\" element={<PanchangView />} />",
    "          <Route path=\"/gochar\" element={<GocharView />} />",
    "          <Route path=\"/predictions\" element={<PredictionsView />} />",
    "          <Route path=\"/matching\" element={<MatchingView />} />",
    "          <Route path=\"/ai-settings\" element={<AiSettingsView />} />",
    "          <Route path=\"/reading\" element={<AiReadingView />} />",
    "          <Route path=\"/reading/:categoryId\" element={<ReadingArticleView />} />",
    "          <Route path=\"*\" element={<Navigate to=\"/chart\" replace />} />",
    "        </Routes>",
    "      </Suspense>",
    "    </ErrorBoundary>",
    "  );",
    "}",
    "",
    "export default function App() {",
    "  const { t } = useTranslation();",
    "  return (",
    "    <div className=\"min-h-screen bg-background text-foreground\">",
    "      <header className=\"sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 no-print\">",
    "        <div className=\"container h-14 flex items-center gap-3\">",
    "          <Link",
    "            to=\"/\"",
    "            aria-label={t('nav.home', { defaultValue: 'Home' })}",
    "            className=\"flex items-center gap-2 font-display font-semibold text-lg shrink-0 rounded-md px-1.5 -mx-1.5 py-1 transition-colors hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 no-underline text-foreground\"",
    "          >",
    "            <IconSparkle size={20} className=\"text-primary\" />",
    "            <span className=\"hidden sm:inline\">{t('app.name')}</span>",
    "          </Link>",
    "          <div className=\"hidden md:block w-px h-6 bg-border shrink-0\" aria-hidden=\"true\" />",
    "          <AppHeaderTabs />",
    "          <div className=\"flex-1\" />",
    "          <UserMenu />",
    "        </div>",
    "      </header>",
    "      <main className=\"pb-20 md:pb-0\">",
    "        <MainRoutes />",
    "      </main>",
    "      <MobileBottomNav />",
    "      <Toaster richColors position=\"top-center\" />",
    "    </div>",
    "  );",
    "}",
    ""
  ].join('\n');
  replaceWhole('src/App.tsx', newApp, 'lazy-loaded routes');
}

// ===========================================================================
// FIX 3 — session-only API keys in ai-settings/store.ts
// ===========================================================================
console.log('\n=== FIX 3: session-only API keys ===');
{
  const newStore = [
    "import { create } from 'zustand';",
    "import { persist } from 'zustand/middleware';",
    "",
    "export interface ProviderConfig {",
    "  apiKey: string;",
    "  preferredModel?: string;",
    "}",
    "",
    "export interface AiSettingsState {",
    "  providers: Record<string, ProviderConfig>;",
    "  providerOrder: string[];",
    "",
    "  setApiKey: (providerId: string, key: string) => void;",
    "  setPreferredModel: (providerId: string, modelId: string) => void;",
    "  toggleInPool: (providerId: string) => void;",
    "  moveUp: (providerId: string) => void;",
    "  moveDown: (providerId: string) => void;",
    "  setAsPrimary: (providerId: string) => void;",
    "  clearProvider: (providerId: string) => void;",
    "  clearAll: () => void;",
    "}",
    "",
    "const STORE_VERSION = 5;",
    "const EMPTY_CONFIG: ProviderConfig = Object.freeze({ apiKey: '' });",
    "const SESSION_PREFIX = 'kundaliyatra-ai-key:';",
    "",
    "function safeSessionGet(key: string): string | null {",
    "  try { return sessionStorage.getItem(key); } catch { return null; }",
    "}",
    "function safeSessionSet(key: string, value: string): void {",
    "  try {",
    "    if (value) sessionStorage.setItem(key, value);",
    "    else sessionStorage.removeItem(key);",
    "  } catch { /* private mode */ }",
    "}",
    "",
    "export const useAiSettings = create<AiSettingsState>()(",
    "  persist(",
    "    (set) => ({",
    "      providers: {},",
    "      providerOrder: [],",
    "",
    "      setApiKey: (providerId, key) =>",
    "        set((s) => {",
    "          safeSessionSet(SESSION_PREFIX + providerId, key);",
    "          return {",
    "            providers: {",
    "              ...s.providers,",
    "              [providerId]: {",
    "                ...(s.providers[providerId] ?? { apiKey: '' }),",
    "                apiKey: key,",
    "              },",
    "            },",
    "          };",
    "        }),",
    "",
    "      setPreferredModel: (providerId, modelId) =>",
    "        set((s) => ({",
    "          providers: {",
    "            ...s.providers,",
    "            [providerId]: {",
    "              ...(s.providers[providerId] ?? { apiKey: '' }),",
    "              preferredModel: modelId,",
    "            },",
    "          },",
    "        })),",
    "",
    "      toggleInPool: (providerId) =>",
    "        set((s) => {",
    "          const inPool = s.providerOrder.includes(providerId);",
    "          return inPool",
    "            ? { providerOrder: s.providerOrder.filter((id) => id !== providerId) }",
    "            : { providerOrder: [...s.providerOrder, providerId] };",
    "        }),",
    "",
    "      moveUp: (providerId) =>",
    "        set((s) => {",
    "          const idx = s.providerOrder.indexOf(providerId);",
    "          if (idx <= 0) return s;",
    "          const next = [...s.providerOrder];",
    "          [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];",
    "          return { providerOrder: next };",
    "        }),",
    "",
    "      moveDown: (providerId) =>",
    "        set((s) => {",
    "          const idx = s.providerOrder.indexOf(providerId);",
    "          if (idx < 0 || idx >= s.providerOrder.length - 1) return s;",
    "          const next = [...s.providerOrder];",
    "          [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];",
    "          return { providerOrder: next };",
    "        }),",
    "",
    "      setAsPrimary: (providerId) =>",
    "        set((s) => {",
    "          if (!s.providerOrder.includes(providerId)) {",
    "            return { providerOrder: [providerId, ...s.providerOrder] };",
    "          }",
    "          return { providerOrder: [providerId, ...s.providerOrder.filter((id) => id !== providerId)] };",
    "        }),",
    "",
    "      clearProvider: (providerId) =>",
    "        set((s) => {",
    "          safeSessionSet(SESSION_PREFIX + providerId, '');",
    "          const next = { ...s.providers };",
    "          delete next[providerId];",
    "          return { providers: next, providerOrder: s.providerOrder.filter((id) => id !== providerId) };",
    "        }),",
    "",
    "      clearAll: () => {",
    "        try {",
    "          for (let i = sessionStorage.length - 1; i >= 0; i--) {",
    "            const k = sessionStorage.key(i);",
    "            if (k && k.startsWith(SESSION_PREFIX)) sessionStorage.removeItem(k);",
    "          }",
    "        } catch { /* ignore */ }",
    "        set({ providers: {}, providerOrder: [] });",
    "      },",
    "    }),",
    "    {",
    "      name: 'kundaliyatra-ai-settings',",
    "      version: STORE_VERSION,",
    "      migrate: (persisted, fromVersion) => {",
    "        let state = { ...persisted };",
    "        if (fromVersion < 2) {",
    "          const oldActive = state?.activeProviderId ?? null;",
    "          state = { providers: state?.providers ?? {}, providerOrder: oldActive ? [oldActive] : [] };",
    "        }",
    "        delete state.readingDefaults;",
    "        if (state?.providers) {",
    "          for (const id of Object.keys(state.providers)) {",
    "            if (state.providers[id]?.apiKey) state.providers[id].apiKey = '';",
    "          }",
    "        }",
    "        return state;",
    "      },",
    "      partialize: (s) => ({",
    "        providerOrder: s.providerOrder,",
    "        providers: Object.fromEntries(",
    "          Object.entries(s.providers).map(([id, cfg]) => [",
    "            id,",
    "            { apiKey: '', preferredModel: cfg.preferredModel },",
    "          ])",
    "        ),",
    "      }),",
    "      onRehydrateStorage: () => (state) => {",
    "        if (!state) return;",
    "        for (const id of Object.keys(state.providers)) {",
    "          const k = safeSessionGet(SESSION_PREFIX + id);",
    "          if (k) state.providers[id] = { ...state.providers[id], apiKey: k };",
    "        }",
    "      },",
    "    }",
    "  )",
    ");",
    "",
    "export function useProviderConfig(providerId: string): ProviderConfig {",
    "  return useAiSettings((s) => s.providers[providerId] ?? EMPTY_CONFIG);",
    "}",
    "",
    "export const useProviderOrder = (): string[] => useAiSettings((s) => s.providerOrder);",
    "",
    "export function getAiSettingsSnapshot() {",
    "  const s = useAiSettings.getState();",
    "  return { providers: s.providers, providerOrder: s.providerOrder };",
    "}",
    ""
  ].join('\n');
  replaceWhole('src/features/ai-settings/store.ts', newStore, 'session-only keys');
}

// ===========================================================================
// FIX 4 — route kundli computation through cache
// ===========================================================================
console.log('\n=== FIX 4: kundli cache routing ===');
{
  edit('src/domain/astrology/port.ts',
    'import type { Kundli, KundliConfig } from \'@prisri/jyotish\';',
    "// Opaque Kundli type. The library's real shape stays in infrastructure/.\nexport type KundliRecord = Record<string, any>;\n\nimport type { Kundli, KundliConfig } from '@prisri/jyotish';",
    'port.ts: add KundliRecord');

  edit('src/features/overview/OverviewView.tsx',
    "import type { Kundli } from '@prisri/jyotish';",
    "import type { KundliRecord } from '@/domain/astrology/port';",
    'OverviewView: swap Kundli type');

  edit('src/features/overview/OverviewView.tsx',
    "import { useActiveProfile, useBirthStore } from '../birth-profile/store';",
    "import { useActiveProfile, useBirthStore } from '../birth-profile/store';\nimport { getCachedKundli } from '@/lib/kundli-cache';",
    'OverviewView: import getCachedKundli');

  edit('src/features/overview/OverviewView.tsx',
    "      return { kundli: prisriJyotish.calculate(profile), error: null as string | null };",
    "      const k = getCachedKundli(profile);\n      if (!k) throw new Error('Chart calculation failed.');\n      return { kundli: k as KundliRecord, error: null as string | null };",
    'OverviewView: use cache');

  edit('src/features/overview/OverviewView.tsx',
    "        kundli: null as Kundli | null,",
    "        kundli: null as KundliRecord | null,",
    'OverviewView: null type');

  edit('src/features/ai-reading/ReadingArticleView.tsx',
    "import { prisriJyotish } from '@/infrastructure/astrology/prisri-jyotish.adapter';",
    "import { getCachedKundli } from '@/lib/kundli-cache';",
    'ReadingArticleView: swap adapter for cache');

  edit('src/features/ai-reading/ReadingArticleView.tsx',
    "  const kundli = useMemo(() => {\n    if (!profile) return null;\n    try {\n      return prisriJyotish.calculate(profile) as any;\n    } catch {\n      return null;\n    }\n  }, [profile]);",
    "  const kundli = useMemo(() => (profile ? getCachedKundli(profile) : null), [profile]);",
    'ReadingArticleView: use cache');

  edit('src/features/gochar/GocharView.tsx',
    "import { prisriJyotish, BirthDataError } from '@/infrastructure/astrology/prisri-jyotish.adapter';",
    "import { BirthDataError } from '@/infrastructure/astrology/prisri-jyotish.adapter';\nimport { getCachedKundli } from '@/lib/kundli-cache';",
    'GocharView: import cache');

  edit('src/features/gochar/GocharView.tsx',
    "      const kundli = prisriJyotish.calculate(profile) as unknown as Record<string, any>;",
    "      const kundli = getCachedKundli(profile) as unknown as Record<string, any>;\n      if (!kundli) throw new BirthDataError('Chart calculation failed.');",
    'GocharView: use cache');

  edit('src/features/predictions/PredictionsView.tsx',
    "import { prisriJyotish, BirthDataError } from '@/infrastructure/astrology/prisri-jyotish.adapter';",
    "import { BirthDataError } from '@/infrastructure/astrology/prisri-jyotish.adapter';\nimport { getCachedKundli } from '@/lib/kundli-cache';",
    'PredictionsView: import cache');

  edit('src/features/predictions/PredictionsView.tsx',
    "      const kundli = prisriJyotish.calculate(profile) as unknown as Record<string, any>;",
    "      const kundli = getCachedKundli(profile) as unknown as Record<string, any>;\n      if (!kundli) throw new BirthDataError('Chart calculation failed.');",
    'PredictionsView: use cache');

  edit('src/infrastructure/astrology/matching.adapter.ts',
    "import { prisriJyotish } from './prisri-jyotish.adapter';",
    "import { getCachedKundli } from '@/lib/kundli-cache';",
    'matching.adapter: import cache');

  edit('src/infrastructure/astrology/matching.adapter.ts',
    "      const kundliA = prisriJyotish.calculate(a) as unknown as Kundli;\n      const kundliB = prisriJyotish.calculate(b) as unknown as Kundli;\n      return this.compareKundlis(kundliA, kundliB);",
    "      const kundliA = getCachedKundli(a) as unknown as Kundli;\n      const kundliB = getCachedKundli(b) as unknown as Kundli;\n      if (!kundliA || !kundliB) throw new MatchingError('Chart calculation failed.');\n      return this.compareKundlis(kundliA, kundliB);",
    'matching.adapter: use cache');

  edit('src/features/birth-profile/store.ts',
    "import type { BirthData, ProfileRelation } from '@/domain/astrology/birth-data';",
    "import type { BirthData, ProfileRelation } from '@/domain/astrology/birth-data';\nimport { removeStoredKundli } from '@/lib/kundli-cache';",
    'birth store: import removeStoredKundli');

  edit('src/features/birth-profile/store.ts',
    "      updateProfile: (id, patch) =>\n        set((s) => {\n          const existing = s.profiles[id];\n          if (!existing) return s;\n          return {\n            profiles: {\n              ...s.profiles,\n              [id]: { ...existing, ...patch, id: existing.id },\n            },\n          };\n        }),",
    "      updateProfile: (id, patch) =>\n        set((s) => {\n          const existing = s.profiles[id];\n          if (!existing) return s;\n          const birthChanged =\n            (patch.localDate !== undefined && patch.localDate !== existing.localDate) ||\n            (patch.localTime !== undefined && patch.localTime !== existing.localTime) ||\n            (patch.place !== undefined && patch.place.id !== existing.place.id);\n          if (birthChanged) { try { removeStoredKundli(existing); } catch { /* noop */ } }\n          return {\n            profiles: {\n              ...s.profiles,\n              [id]: { ...existing, ...patch, id: existing.id },\n            },\n          };\n        }),",
    'birth store: invalidate cache');
}

// ===========================================================================
// FIX 5 — system/user split in providers.ts
// ===========================================================================
console.log('\n=== FIX 5: providers.ts system + signal ===');
{
  // Extend GenerateOptions
  edit('src/features/ai-settings/providers.ts',
    "export interface GenerateOptions {\n  prompt: string;\n  modelId: string;\n  apiKey: string;\n  extras?: {",
    "export interface GenerateOptions {\n  prompt: string;\n  system?: string;\n  modelId: string;\n  apiKey: string;\n  signal?: AbortSignal;\n  extras?: {",
    'providers.ts: GenerateOptions shape');

  // Destructure system in every buildRequest
  edit('src/features/ai-settings/providers.ts',
    "buildRequest: ({ prompt, modelId, apiKey }) => ({",
    "buildRequest: ({ prompt, system, modelId, apiKey }) => ({",
    'providers.ts: destructure system (all providers use this shape)');

  // OpenAI-compatible: prepend system message
  const openaiCalls = [
    "        messages: [{ role: 'user', content: prompt }],\n      }),\n    },\n  }),\n  parseResponse: (j) => j?.choices?.[0]?.message?.content ?? '',\n};\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// 3. Mistral AI"
  ];
  // We'll just do a global text replace of the exact block used by all openai-compat providers.
  // Note: this edit may match multiple times (Groq, Mistral, OpenRouter, DeepSeek, OpenAI).
  {
    const fp = 'src/features/ai-settings/providers.ts';
    const content = read(fp);
    if (content === null) { log('fail', `${fp} missing`); failCount++; }
    else if (!content.includes("messages: [{ role: 'user', content: prompt }],")) {
      log('skip', 'providers.ts: openai-compat messages already patched');
      skipCount++;
    } else {
      backup(fp);
      const next = content.split("messages: [{ role: 'user', content: prompt }],")
        .join("messages: [...(system ? [{ role: 'system' as const, content: system }] : []), { role: 'user' as const, content: prompt }],");
      write(fp, next);
    }
  }

  // Anthropic: add system: field
  edit('src/features/ai-settings/providers.ts',
    "        model: modelId,\n        max_tokens: 4096,\n        messages: [{ role: 'user', content: prompt }],\n      }),",
    "        model: modelId,\n        max_tokens: 4096,\n        system: system ?? undefined,\n        messages: [{ role: 'user', content: prompt }],\n      }),",
    'providers.ts: Anthropic system field');

  // Gemini: systemInstruction
  edit('src/features/ai-settings/providers.ts',
    "body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),",
    "body: JSON.stringify({ systemInstruction: system ? { parts: [{ text: system }] } : undefined, contents: [{ parts: [{ text: prompt }] }] }),",
    'providers.ts: Gemini systemInstruction');

  // generateWithProvider: pass signal, catch AbortError
  edit('src/features/ai-settings/providers.ts',
    "    const { url, init } = provider.buildRequest(opts);\n    const res = await fetch(url, init);",
    "    const { url, init } = provider.buildRequest(opts);\n    const res = await fetch(url, { ...init, signal: opts.signal });",
    'providers.ts: pass signal to fetch');

  edit('src/features/ai-settings/providers.ts',
    "  } catch (e) {\n    return { ok: false, error: (e as Error).message, providerId };\n  }\n}",
    "  } catch (e) {\n    const err = e as Error;\n    if (err.name === 'AbortError') return { ok: false, error: 'Generation cancelled.', providerId };\n    return { ok: false, error: err.message, providerId };\n  }\n}",
    'providers.ts: AbortError handling');

  // FallbackOptions
  edit('src/features/ai-settings/providers.ts',
    "export interface FallbackOptions {\n  prompt: string;\n  extras?: GenerateOptions['extras'];",
    "export interface FallbackOptions {\n  prompt: string;\n  system?: string;\n  signal?: AbortSignal;\n  extras?: GenerateOptions['extras'];",
    'providers.ts: FallbackOptions shape');

  // Fallback loop: abort check + pass system/signal
  edit('src/features/ai-settings/providers.ts',
    "  for (const providerId of opts.order) {\n    const config = opts.configs[providerId];\n    if (!config?.apiKey) continue;",
    "  for (const providerId of opts.order) {\n    if (opts.signal?.aborted) {\n      return { ok: false, error: 'Cancelled.', providerId: '', attempts };\n    }\n    const config = opts.configs[providerId];\n    if (!config?.apiKey) continue;",
    'providers.ts: abort check');

  edit('src/features/ai-settings/providers.ts',
    "    const res = await generateWithProvider(providerId, {\n      prompt: opts.prompt,\n      modelId,\n      apiKey: config.apiKey,\n      extras: opts.extras,\n    });",
    "    const res = await generateWithProvider(providerId, {\n      prompt: opts.prompt,\n      system: opts.system,\n      signal: opts.signal,\n      modelId,\n      apiKey: config.apiKey,\n      extras: opts.extras,\n    });",
    'providers.ts: pass system/signal to provider');
}

// ===========================================================================
// FIX 5b — prompt.ts returns { system, user }
// ===========================================================================
console.log('\n=== FIX 5b: prompt.ts shape ===');
{
  edit('src/features/ai-reading/prompt.ts',
    "export function composeReadingPrompt(\n  category: ReadingCategory,",
    "export interface ComposedPrompt { system: string; user: string; }\n\nexport function composeReadingPrompt(\n  category: ReadingCategory,",
    'prompt.ts: add ComposedPrompt interface');

  edit('src/features/ai-reading/prompt.ts',
    "  referenceMaterial?: string\n): string {",
    "  referenceMaterial?: string\n): ComposedPrompt {",
    'prompt.ts: return type');

  // The final return uses backticks in the source. Match on the distinctive tail.
  edit('src/features/ai-reading/prompt.ts',
    "  return `${SYSTEM_PROMPT}\n\n\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n${body}\n`;\n}",
    "  return { system: SYSTEM_PROMPT, user: body };\n}",
    'prompt.ts: return { system, user }');
}

// ===========================================================================
// FIX 5c + 12 — daily-rashi-prompt.ts whole file
// ===========================================================================
console.log('\n=== FIX 5c: daily-rashi-prompt.ts ===');
{
  const tsContent = [
    "import type { BirthData } from '@/domain/astrology/birth-data';",
    "import type { UserLocation } from '@/lib/user-location';",
    "import type { GocharAnalysis } from '@/infrastructure/astrology/gochar.adapter';",
    "import type { PanchangData } from '@/infrastructure/astrology/panchang.adapter';",
    "",
    "export const DAILY_RASHI_PROMPT_VERSION = '2.0.1';",
    "",
    "export function buildDailyRashiPayload(",
    "  profile: BirthData,",
    "  kundli: any,",
    "  gochar: GocharAnalysis,",
    "  panchang: PanchangData | null,",
    "  location: UserLocation",
    "): string {",
    "  const moon = kundli?.planets?.Moon ?? {};",
    "  const todayMoon = gochar.planets?.Moon;",
    "  const firstName = profile.profileName.trim().split(/\\s+/)[0] ?? profile.profileName;",
    "",
    "  const transits = Object.values(gochar.planets)",
    "    .map((p) => ({",
    "      planet: p.planet,",
    "      rashi: p.rashiName,",
    "      house: p.houseFromMoon,",
    "      status: p.netStatus,",
    "      ...(p.isRetrograde ? { retrograde: true } : {}),",
    "      ...(p.hasVedha ? { vedha: true } : {}),",
    "    }))",
    "    .sort((a, b) => a.house - b.house);",
    "",
    "  const payload = {",
    "    date: new Date().toISOString().slice(0, 10),",
    "    location: location.shortLabel,",
    "    native: {",
    "      name: firstName,",
    "      janma_rashi: moon.rashiName ?? null,",
    "      birth_nakshatra: moon.nakshatra ?? null,",
    "      birth_nakshatra_pada: moon.pada ?? null,",
    "    },",
    "    today_moon: todayMoon",
    "      ? {",
    "          rashi: todayMoon.rashiName,",
    "          house_from_moon: todayMoon.houseFromMoon,",
    "          nakshatra: todayMoon.nakshatra,",
    "          pada: todayMoon.pada,",
    "        }",
    "      : null,",
    "    panchang: panchang",
    "      ? {",
    "          tithi: panchang.tithi.name,",
    "          paksha: panchang.paksha,",
    "          vara: panchang.vara.name,",
    "          nakshatra: panchang.nakshatra.name,",
    "        }",
    "      : null,",
    "    transits,",
    "    special: {",
    "      chandrashtama: gochar.specialTransits.chandrashtama.isActive,",
    "      sade_sati: gochar.specialTransits.sadeSati.status,",
    "      sade_sati_phase: gochar.specialTransits.sadeSati.phaseName ?? null,",
    "      dhaiya: gochar.specialTransits.dhaiya.status,",
    "      dhaiya_type: gochar.specialTransits.dhaiya.typeName ?? null,",
    "    },",
    "    favorable_pct: gochar.overallFavorablePercentage,",
    "    verdict: gochar.overallVerdict,",
    "  };",
    "",
    "  return JSON.stringify(payload);",
    "}",
    "",
    "export const DAILY_RASHI_SYSTEM_PROMPT = `You are a classical Jyotishi composing today's Rashi Phala - a brief transit-based forecast for the native's Janma Rashi (Chandra Rashi) - in the living tradition of Vedic astrology.",
    "",
    "Gochara phala is always read FROM the Janma Rashi - the natal Moon sign - never the Lagna.",
    "",
    "OUTPUT FORMAT - READ CAREFULLY.",
    "",
    "Return ONLY a single JSON object. No prose. No markdown fences. No backticks. The object has exactly these three keys:",
    "",
    "{",
    "  \"headline\": \"6-12 words - the shape of the day\",",
    "  \"action\":   \"5-12 words - one concrete imperative\",",
    "  \"avoid\":    \"5-12 words - one concrete imperative\"",
    "}",
    "",
    "RULES",
    "",
    "1. The 'headline' names the single strongest transit affecting today, referencing planet and house from natal Moon.",
    "",
    "2. The 'action' is ONE physical act, not a mood.",
    "",
    "3. The 'avoid' is ONE specific act to refrain from.",
    "",
    "4. Every field must reference a value present in the JSON. Never invent positions.",
    "",
    "5. Total across all three fields must not exceed 35 words.",
    "",
    "6. No emoji. No markdown. No benediction. Second person or imperative.`;",
    "",
    "export interface ComposedDailyRashi { system: string; user: string; }",
    "",
    "export function composeDailyRashiPrompt(jsonPayload: string): ComposedDailyRashi {",
    "  return {",
    "    system: DAILY_RASHI_SYSTEM_PROMPT,",
    "    user: `NATIVE & DATA - VERIFIED, DO NOT RECOMPUTE\\n\\n${jsonPayload}\\n\\nReturn the JSON object now. Nothing else.`,",
    "  };",
    "}",
    ""
  ].join('\n');
  replaceWhole('src/features/dashboard/lib/daily-rashi-prompt.ts', tsContent, 'ComposedDailyRashi return');
}

// ===========================================================================
// FIX 6 — i18n: remove lng: 'en'
// ===========================================================================
console.log('\n=== FIX 6: i18n language detection ===');
{
  const fp = 'src/i18n/index.ts';
  const content = read(fp);
  if (content === null) { log('fail', `${fp} missing`); failCount++; }
  else if (!content.includes("lng: 'en',")) { log('skip', 'i18n already patched'); skipCount++; }
  else {
    backup(fp);
    const next = content
      .split("    lng: 'en',\n").join('')
      .split("  lng: 'en',\n").join('')
      .split("lng: 'en',\n").join('');
    write(fp, next);
  }
}

// ===========================================================================
// FIX 7 — Hero.tsx palette
// ===========================================================================
console.log('\n=== FIX 7: Hero.tsx palette ===');
{
  const fp = 'src/features/report/components/Hero.tsx';
  const content = read(fp);
  if (content === null) { log('fail', `${fp} missing`); failCount++; }
  else if (content.includes('hsl(var(--manuscript-gold))')) {
    log('skip', 'Hero already palette-aware'); skipCount++;
  } else {
    backup(fp);
    let next = content;
    // Replace the C object
    next = next.replace(
      /const C = \{[\s\S]*?\};/,
      [
        "import { MANUSCRIPT_ALPHA as CA } from '../lib/manuscript-colors';",
        "",
        "const C = {",
        "  ivory:      'hsl(var(--manuscript-ivory))',",
        "  ivoryDeep:  'hsl(var(--manuscript-ivory-deep))',",
        "  brown:      'hsl(var(--manuscript-brown))',",
        "  brownSoft:  'hsl(var(--manuscript-brown-soft))',",
        "  vermilion:  'hsl(var(--manuscript-vermilion))',",
        "  gold:       'hsl(var(--manuscript-gold))',",
        "  goldSoft:   'hsl(var(--manuscript-gold-soft))',",
        "};"
      ].join('\n')
    );
    // Convert hex-alpha suffixes
    const alphaMap = {
      '${C.gold}18': '${CA.gold(0.09)}',
      '${C.gold}22': '${CA.gold(0.13)}',
      '${C.gold}33': '${CA.gold(0.20)}',
      '${C.gold}44': '${CA.gold(0.27)}',
      '${C.gold}55': '${CA.gold(0.33)}',
      '${C.gold}66': '${CA.gold(0.40)}',
      '${C.gold}88': '${CA.gold(0.53)}',
      '${C.goldSoft}44': '${CA.goldSoft(0.27)}',
      '${C.goldSoft}55': '${CA.goldSoft(0.33)}',
    };
    for (const [k, v] of Object.entries(alphaMap)) next = next.split(k).join(v);
    write(fp, next);
  }
}

// ===========================================================================
// FIX 8 — Ashtakavarga narrative from chart
// ===========================================================================
console.log('\n=== FIX 8: Ashtakavarga narrative ===');
{
  edit('src/features/report/sections/AshtakavargaSection.tsx',
    "  const strongest = sav.strongestHouse;\n  const weakest = sav.weakestHouse;",
    "  const strongest = sav.strongestHouse;\n  const weakest = sav.weakestHouse;\n  const strongestBindus = houseStrengths.find((h: any) => h.house === strongest)?.bindus ?? 0;\n  const weakestBindus = houseStrengths.find((h: any) => h.house === weakest)?.bindus ?? 0;",
    'Ashtakavarga: bindus vars');
  // Best-effort: replace the two hardcoded defaultValues.
  const fp = 'src/features/report/sections/AshtakavargaSection.tsx';
  const content = read(fp);
  if (content && content.includes('The first, sixth, and tenth houses')) {
    backup(fp);
    let next = content
      .replace(
        /\{t\('ashtakavarga\.strongestLine'[\s\S]*?\}\)/,
        "{\\`House ${ROMAN[strongest - 1]} (${HOUSE_NAMES[strongest - 1]}) receives ${strongestBindus} bindus — the greatest support the chart gives to a single domain.\\`}"
      )
      .replace(
        /\{t\('ashtakavarga\.weakestLine'[\s\S]*?\}\)/,
        "{\\`House ${ROMAN[weakest - 1]} (${HOUSE_NAMES[weakest - 1]}) stands at ${weakestBindus} bindus — the area that asks for conscious effort and steady work.\\`}"
      );
    write(fp, next);
  } else { log('skip', 'Ashtakavarga narrative already dynamic'); skipCount++; }
}

// ===========================================================================
// FIX 10 — SnapshotStrip mojibake
// ===========================================================================
console.log('\n=== FIX 10: SnapshotStrip mojibake ===');
{
  const fp = 'src/features/report/components/SnapshotStrip.tsx';
  const content = read(fp);
  if (content === null) { log('fail', `${fp} missing`); failCount++; }
  else {
    // Match the corrupt return line regardless of exact source bytes.
    const lineRegex = /return\s+`\$\{d\}[\s\S]{1,4}\$\{String\(m\)\.padStart\(2,\s*'0'\)\}[\s\S]{1,4}`;/;
    if (lineRegex.test(content)) {
      backup(fp);
      const next = content.replace(lineRegex, "return `${d}\\u00B0${String(m).padStart(2, '0')}\\u2032`;");
      write(fp, next);
    } else if (content.includes('\\u00B0')) {
      log('skip', 'SnapshotStrip already fixed'); skipCount++;
    } else {
      log('skip', 'SnapshotStrip pattern not matched — check manually');
      skipCount++;
    }
  }
}

// ===========================================================================
// FIX 11 — clipboard safety
// ===========================================================================
console.log('\n=== FIX 11: clipboard safety ===');
{
  edit('src/features/ai-reading/ReadingArticleView.tsx',
    "  const handleCopy = async () => {\n    if (record) {\n      await navigator.clipboard.writeText(record.text);\n      toast.success('Copied.');\n    }\n  };",
    "  const handleCopy = async () => {\n    if (!record) return;\n    try {\n      await navigator.clipboard.writeText(record.text);\n      toast.success('Copied.');\n    } catch {\n      toast.error('Clipboard unavailable.');\n    }\n  };",
    'ReadingArticleView: safe copy');
}

// ===========================================================================
// FIX 13 — useChartHouses.ts + DivisionalChartsSection.tsx
// ===========================================================================
console.log('\n=== FIX 13: useChartHouses ===');
{
  const hook = [
    "import { useMemo } from 'react';",
    "import { useTranslation } from 'react-i18next';",
    "import { buildChartHouses, buildVargaHouses } from './adapters';",
    "import type { ChartHouse } from '../types';",
    "",
    "const d1Cache = new WeakMap<object, ChartHouse[]>();",
    "",
    "export function useChartHouses(",
    "  kundli: Record<string, any> | null,",
    "  vargaCode: string",
    "): ChartHouse[] {",
    "  const { t, i18n } = useTranslation();",
    "",
    "  const abbrResolver = useMemo(",
    "    () => (planet: string) => {",
    "      if (planet === 'Ascendant') return t('chart.planetAbbr.ascendant', { defaultValue: 'Asc' });",
    "      return t(`chart.planetAbbr.${planet.toLowerCase()}`, { defaultValue: planet.slice(0, 2) });",
    "    },",
    "    [t, i18n.resolvedLanguage]",
    "  );",
    "",
    "  return useMemo(() => {",
    "    if (!kundli) return [];",
    "    if (vargaCode === 'd1') {",
    "      const cached = d1Cache.get(kundli);",
    "      if (cached) return cached;",
    "      const built = buildChartHouses(kundli, { resolveAbbr: abbrResolver });",
    "      d1Cache.set(kundli, built);",
    "      return built;",
    "    }",
    "    return buildVargaHouses(kundli, vargaCode, { resolveAbbr: abbrResolver });",
    "  }, [kundli, vargaCode, abbrResolver]);",
    "}",
    ""
  ].join('\n');
  replaceWhole('src/features/chart/lib/useChartHouses.ts', hook, 'new file');

  edit('src/features/report/sections/DivisionalChartsSection.tsx',
    "import { buildChartHouses, buildVargaHouses } from '@/features/chart/lib/adapters';",
    "import { useChartHouses } from '@/features/chart/lib/useChartHouses';",
    'DivisionalChartsSection: swap import');

  // The block replacement — can be multi-line and different across versions.
  const fp = 'src/features/report/sections/DivisionalChartsSection.tsx';
  const content = read(fp);
  if (content && content.includes('const abbrResolver = useMemo(') && content.includes('const activeHouses = useMemo(')) {
    backup(fp);
    const next = content
      .replace(/  const abbrResolver = useMemo\([\s\S]*?\n  \);\n/, '')
      .replace(/  const activeHouses = useMemo\([\s\S]*?\n  \), \[activeVarga, kundli, abbrResolver\]\);\n/, "  const activeHouses = useChartHouses(kundli, activeVarga);\n")
      .replace(/  const activeHouses = useMemo\([\s\S]*?\n  \), \[activeVarga, kundli, abbrResolver\]\);\n/, "  const activeHouses = useChartHouses(kundli, activeVarga);\n");
    write(fp, next);
  } else if (content && content.includes('useChartHouses(kundli, activeVarga)')) {
    log('skip', 'DivisionalChartsSection already uses hook'); skipCount++;
  } else {
    log('fail', 'DivisionalChartsSection — could not locate block; patch manually'); failCount++;
  }
}

// ===========================================================================
// FIX 14 — memoize useLibraryForProfile
// ===========================================================================
console.log('\n=== FIX 14: useLibraryForProfile ===');
{
  edit('src/features/ai-reading/store.ts',
    "import { create } from 'zustand';",
    "import { useMemo } from 'react';\nimport { create } from 'zustand';",
    'ai-reading store: import useMemo');

  edit('src/features/ai-reading/store.ts',
    "  const records = useReadingStore((s) => s.records);\n  if (!profile) return {};\n  const hash = hashProfile(profile);\n\n  const out: Record<string, ReadingRecord> = {};\n  for (const r of Object.values(records)) {\n    if (r.profileHash !== hash) continue;\n    const existing = out[r.categoryId];\n    if (!existing || new Date(r.generatedAt) > new Date(existing.generatedAt)) {\n      out[r.categoryId] = r;\n    }\n  }\n  return out;\n}",
    "  const records = useReadingStore((s) => s.records);\n  const hash = profile ? hashProfile(profile) : null;\n\n  return useMemo(() => {\n    if (!hash) return {};\n    const out: Record<string, ReadingRecord> = {};\n    for (const r of Object.values(records)) {\n      if (r.profileHash !== hash) continue;\n      const existing = out[r.categoryId];\n      if (!existing || r.generatedAt > existing.generatedAt) {\n        out[r.categoryId] = r;\n      }\n    }\n    return out;\n  }, [records, hash]);\n}",
    'ai-reading store: memoize library');
}

// ===========================================================================
// FIX 15 — cleanup
// ===========================================================================
console.log('\n=== FIX 15: cleanup ===');
{
  deleteFile('tailwind.config.js.bak');
  deleteFile('.fix-backup');

  // index.html — swap Google Fonts CDN for preloads
  const fp = 'index.html';
  const content = read(fp);
  if (content === null) { log('fail', `${fp} missing`); failCount++; }
  else if (!content.includes('fonts.googleapis.com')) {
    log('skip', 'index.html already clean'); skipCount++;
  } else {
    backup(fp);
    const next = content.replace(
      /<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com" \/>[\s\S]*?<link\s+href="https:\/\/fonts\.googleapis\.com\/css2[^"]*"\s+rel="stylesheet"\s*\/>/,
      [
        '<link rel="preload" href="/fonts/Inter-Regular.ttf" as="font" type="font/ttf" crossorigin />',
        '    <link rel="preload" href="/fonts/CrimsonPro-Regular.ttf" as="font" type="font/ttf" crossorigin />',
        '    <link rel="preload" href="/fonts/NotoSerifDevanagari-Regular.ttf" as="font" type="font/ttf" crossorigin />'
      ].join('\n    ')
    );
    write(fp, next);
  }

  // npm uninstall
  if (SKIP_NPM) { log('skip', 'npm uninstall skipped (--skip-npm)'); skipCount++; }
  else if (WHATIF) { log('info', '[WHATIF] npm uninstall @expo-google-fonts/* d3-shape'); }
  else {
    try {
      execSync(
        'npm uninstall @expo-google-fonts/crimson-pro @expo-google-fonts/inter @expo-google-fonts/noto-sans-devanagari @expo-google-fonts/noto-serif-devanagari @expo-google-fonts/tiro-devanagari-sanskrit d3-shape @types/d3-shape',
        { cwd: ROOT, stdio: 'pipe' }
      );
      log('ok', 'npm uninstall — removed 7 packages');
      okCount++;
    } catch (e) {
      log('fail', `npm uninstall failed: ${e.message}`);
      failCount++;
    }
  }
}

// ===========================================================================
// FIX 16 — OverviewView uses KundliRecord (already patched in FIX 4)
// ===========================================================================

// ===========================================================================
// FIX 5f — consumer updates for { system, user } shape
// ===========================================================================
console.log('\n=== FIX 5f: consumers of { system, user } ===');
{
  // ReadingArticleView: composedPrompt is now an object
  edit('src/features/ai-reading/ReadingArticleView.tsx',
    "      let currentPrompt = composedPrompt;",
    "      let currentPrompt = { system: composedPrompt.system, user: composedPrompt.user };",
    'ReadingArticleView: currentPrompt shape');

  edit('src/features/ai-reading/ReadingArticleView.tsx',
    "        res = await generateWithFallback({\n          prompt: currentPrompt,\n          order: snapshot.providerOrder,\n          configs: snapshot.providers,",
    "        res = await generateWithFallback({\n          system: currentPrompt.system,\n          prompt: currentPrompt.user,\n          order: snapshot.providerOrder,\n          configs: snapshot.providers,",
    'ReadingArticleView: pass system');

  edit('src/features/ai-reading/ReadingArticleView.tsx',
    "        currentPrompt = composedPrompt + suffix;",
    "        currentPrompt = { system: composedPrompt.system, user: composedPrompt.user + suffix };",
    'ReadingArticleView: retry shape');

  edit('src/features/ai-reading/ReadingArticleView.tsx',
    "    const chars = composedPrompt.length;",
    "    const chars = composedPrompt.system.length + composedPrompt.user.length;",
    'ReadingArticleView: prompt stats');

  edit('src/features/ai-reading/ReadingArticleView.tsx',
    "  const handleCopyPrompt = async () => {\n    if (!composedPrompt) return;\n    await navigator.clipboard.writeText(composedPrompt);\n    toast.success('Prompt copied to clipboard.');\n  };",
    "  const handleCopyPrompt = async () => {\n    if (!composedPrompt) return;\n    const combined = `### SYSTEM\\n\\n${composedPrompt.system}\\n\\n### USER\\n\\n${composedPrompt.user}`;\n    try {\n      await navigator.clipboard.writeText(combined);\n      toast.success('Prompt copied to clipboard.');\n    } catch {\n      toast.error('Clipboard unavailable.');\n    }\n  };",
    'ReadingArticleView: copy prompt');

  // useDailyRashi: direct call with { system, user } + AbortController
  edit('src/features/dashboard/hooks/useDailyRashi.ts',
    "        const prompt = composeDailyRashiPrompt(payload);\n\n        const res = await Promise.race([",
    "        const { system: sysPrompt, user: userPrompt } = composeDailyRashiPrompt(payload);\n        const ctrl = new AbortController();\n        const timeoutId = setTimeout(() => ctrl.abort(), 45_000);\n        let res: FallbackResult;\n        try {\n          res = await generateWithFallback({\n            system: sysPrompt,\n            prompt: userPrompt,\n            signal: ctrl.signal,\n            order: snapshot.providerOrder,\n            configs: snapshot.providers,\n            extras: { tone: 'traditional', numberOfWord: 120, language: 'English' },\n          });\n        } finally {\n          clearTimeout(timeoutId);\n        }\n\n        const _legacyRace = await Promise.race([",
    'useDailyRashi: head (may need manual cleanup)');

  // Remove the old race tail — locate the "resolve({ ok: false, error: 'Timed out" block and delete through its close.
  {
    const fp = 'src/features/dashboard/hooks/useDailyRashi.ts';
    let content = read(fp);
    if (content && content.includes("const _legacyRace = await Promise.race([")) {
      backup(fp);
      // Remove from `const _legacyRace = await Promise.race([` through the following `]);\n\n`
      content = content.replace(/const _legacyRace = await Promise\.race\(\[[\s\S]*?\n\s*\]\);\n\n/, '');
      // Ensure FallbackResult is imported
      if (!content.includes('FallbackResult')) {
        content = content.replace(
          "import { generateWithFallback } from '@/features/ai-settings/providers';",
          "import { generateWithFallback, type FallbackResult } from '@/features/ai-settings/providers';"
        );
      }
      write(fp, content);
    } else if (content && content.includes('AbortController')) {
      log('skip', 'useDailyRashi already abort-aware'); skipCount++;
    } else {
      log('skip', 'useDailyRashi — check manually');
      skipCount++;
    }
  }
}

// ===========================================================================
// Summary
// ===========================================================================
console.log('\n' + '='.repeat(50));
console.log(`  Applied : ${okCount}`);
console.log(`  Skipped : ${skipCount}`);
console.log(`  Failed  : ${failCount}`);
console.log(`  Backups : ${BACKUP_DIR}`);
console.log('='.repeat(50) + '\n');
console.log('Next: node scripts/verify-fixes.mjs');
process.exit(failCount > 0 ? 1 : 0);
