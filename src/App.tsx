import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { DashboardView } from '@/features/dashboard/DashboardView';
import { ProfilesView } from '@/features/profiles/ProfilesView';
import { OverviewView } from '@/features/overview/OverviewView';
import { PanchangView } from '@/features/panchang/PanchangView';
import { GocharView } from '@/features/gochar/GocharView';
import { PredictionsView } from '@/features/predictions/PredictionsView';
import { MatchingView } from '@/features/matching/MatchingView';
import { AiSettingsView } from '@/features/ai-settings/AiSettingsView';
import { AiReadingView } from '@/features/ai-reading/AiReadingView';
import { ReadingArticleView } from '@/features/ai-reading/ReadingArticleView';
import { ExportView } from '@/features/export/ExportView';
import { Toaster } from '@/components/ui/sonner';
import { IconSparkle } from '@/components/icons';
import { useTranslation } from 'react-i18next';
import { AppHeaderTabs } from '@/components/app-header-tabs';
import { MobileBottomNav } from '@/components/mobile-bottom-nav';
import { UserMenu } from '@/components/user-menu';
import { ErrorBoundary } from '@/components/error-boundary';

/**
 * All routes, wrapped in an ErrorBoundary keyed by pathname.
 * A render error inside any route keeps the header / nav mounted and
 * shows a polite fallback; navigating to a different tab clears it.
 */
function MainRoutes() {
  const location = useLocation();
  return (
    <ErrorBoundary key={location.pathname}>
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
    </ErrorBoundary>
  );
}

export default function App() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
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

      {/* Main */}
      <main className="pb-20 md:pb-0">
        <MainRoutes />
      </main>

      {/* Mobile bottom nav */}
      <MobileBottomNav />

      <Toaster richColors position="top-center" />
    </div>
  );
}