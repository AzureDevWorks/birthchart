import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { IconSparkle, IconLoader } from '@/components/icons';
import { useTranslation } from 'react-i18next';
import { AppHeaderTabs } from '@/components/app-header-tabs';
import { MobileBottomNav } from '@/components/mobile-bottom-nav';
import { UserMenu } from '@/components/user-menu';
import { ErrorBoundary } from '@/components/error-boundary';

const DashboardView      = lazy(() => import('@/features/dashboard/DashboardView').then(m => ({ default: m.DashboardView })));
const ProfilesView       = lazy(() => import('@/features/profiles/ProfilesView').then(m => ({ default: m.ProfilesView })));
const OverviewView       = lazy(() => import('@/features/overview/OverviewView').then(m => ({ default: m.OverviewView })));
const PanchangView       = lazy(() => import('@/features/panchang/PanchangView').then(m => ({ default: m.PanchangView })));
const GocharView         = lazy(() => import('@/features/gochar/GocharView').then(m => ({ default: m.GocharView })));
const PredictionsView    = lazy(() => import('@/features/predictions/PredictionsView').then(m => ({ default: m.PredictionsView })));
const MatchingView       = lazy(() => import('@/features/matching/MatchingView').then(m => ({ default: m.MatchingView })));
const AiSettingsView     = lazy(() => import('@/features/ai-settings/AiSettingsView').then(m => ({ default: m.AiSettingsView })));
const AiReadingView      = lazy(() => import('@/features/ai-reading/AiReadingView').then(m => ({ default: m.AiReadingView })));
const ReadingArticleView = lazy(() => import('@/features/ai-reading/ReadingArticleView').then(m => ({ default: m.ReadingArticleView })));
const ExportView         = lazy(() => import('@/features/export/ExportView').then(m => ({ default: m.ExportView })));

function RouteFallback() {
  const { t } = useTranslation();
  return (
    <div className="min-h-[60vh] flex items-center justify-center gap-2 text-sm text-muted-foreground">
      <IconLoader size={14} className="animate-spin" />
      {t('common.loading', { defaultValue: 'Loading...' })}
    </div>
  );
}

function MainRoutes() {
  const location = useLocation();
  return (
    <ErrorBoundary key={location.pathname}>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<DashboardView />} />
          <Route path="/chart" element={<OverviewView />} />
          <Route path="/profiles" element={<ProfilesView />} />
          <Route path="/export" element={<ExportView />} />
          <Route path="/panchang" element={<PanchangView />} />
          <Route path="/panchang/:sub" element={<PanchangView />} />
          <Route path="/gochar" element={<GocharView />} />
          <Route path="/predictions" element={<PredictionsView />} />
          <Route path="/matching" element={<MatchingView />} />
          <Route path="/ai-settings" element={<AiSettingsView />} />
          <Route path="/reading" element={<AiReadingView />} />
          <Route path="/reading/:categoryId" element={<ReadingArticleView />} />
          <Route path="*" element={<Navigate to="/chart" replace />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default function App() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 no-print">
        <div className="container h-14 flex items-center gap-3">
          <Link
            to="/"
            aria-label={t('nav.home', { defaultValue: 'Home' })}
            className="flex items-center gap-2 font-display font-semibold text-lg shrink-0 rounded-md px-1.5 -mx-1.5 py-1 transition-colors hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 no-underline text-foreground"
          >
            <IconSparkle size={20} className="text-primary" />
            <span className="hidden sm:inline">{t('app.name')}</span>
          </Link>
          <div className="hidden md:block w-px h-6 bg-border shrink-0" aria-hidden="true" />
          <AppHeaderTabs />
          <div className="flex-1" />
          <UserMenu />
        </div>
      </header>
      <main className="pb-20 md:pb-0">
        <MainRoutes />
      </main>
      <MobileBottomNav />
      <Toaster richColors position="top-center" />
    </div>
  );
}
