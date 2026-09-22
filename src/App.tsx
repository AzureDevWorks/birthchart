import { Routes, Route, Navigate } from 'react-router-dom';
import { OverviewView } from '@/features/overview/OverviewView';
import { PanchangView } from '@/features/panchang/PanchangView';
import { GocharView } from '@/features/gochar/GocharView';
import { PredictionsView } from '@/features/predictions/PredictionsView';
import { MatchingView } from '@/features/matching/MatchingView';
import { LanguageSwitcher } from '@/components/language-switcher';
import { ThemeToggle } from '@/components/theme-toggle';
import { PaletteSwitcher } from '@/components/palette-switcher';
import { PrintButton } from '@/components/print-button';
import { ChangeBirthDetailsButton } from '@/components/change-birth-details-button';
import { Toaster } from '@/components/ui/sonner';
import { IconSparkle } from '@/components/icons';
import { useTranslation } from 'react-i18next';
import { useActiveProfile } from '@/features/birth-profile/store';
import { AppHeaderTabs } from '@/components/app-header-tabs';

export default function App() {
  const { t } = useTranslation();
  const profile = useActiveProfile();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 no-print">
        <div className="container flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 font-display font-semibold text-lg">
              <IconSparkle size={20} className="text-primary" />
              {t('app.name')}
            </div>
            <AppHeaderTabs />
          </div>
          <div className="flex items-center gap-1">
            {profile && (
              <>
                <ChangeBirthDetailsButton />
                <PrintButton />
                <div className="w-px h-5 bg-border mx-1" />
              </>
            )}
            <LanguageSwitcher />
            <PaletteSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/chart" replace />} />
          <Route path="/chart" element={<OverviewView />} />
          <Route path="/panchang" element={<PanchangView />} />
          <Route path="/panchang/:sub" element={<PanchangView />} />
          <Route path="/gochar" element={<GocharView />} />
          <Route path="/predictions" element={<PredictionsView />} />
          <Route path="/matching" element={<MatchingView />} />
          <Route path="*" element={<Navigate to="/chart" replace />} />
        </Routes>
      </main>

      <Toaster richColors position="top-center" />
    </div>
  );
}