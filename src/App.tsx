import { OverviewView } from '@/features/overview/OverviewView';
import { LanguageSwitcher } from '@/components/language-switcher';
import { ThemeToggle } from '@/components/theme-toggle';
import { PaletteSwitcher } from '@/components/palette-switcher';
import { PrintButton } from '@/components/print-button';
import { ChangeBirthDetailsButton } from '@/components/change-birth-details-button';
import { Toaster } from '@/components/ui/sonner';
import { IconSparkle } from '@/components/icons';
import { useTranslation } from 'react-i18next';
import { useActiveProfile } from '@/features/birth-profile/store';

export default function App() {
  const { t } = useTranslation();
  const profile = useActiveProfile();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 no-print">
        <div className="container flex items-center justify-between h-14">
          <div className="flex items-center gap-2 font-display font-semibold text-lg">
            <IconSparkle size={20} className="text-primary" />
            {t('app.name')}
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
        <OverviewView />
      </main>

      <Toaster richColors position="top-center" />
    </div>
  );
}