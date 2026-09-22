import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useBirthStore } from '@/features/birth-profile/store';

/**
 * Nav-bar button to reset the active profile and return to the birth form.
 * Only visible when a profile is loaded.
 */
export function ChangeBirthDetailsButton() {
  const { t } = useTranslation();
  const clearAll = useBirthStore((s) => s.clearAll);

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={clearAll}
      className="gap-1.5 no-print"
      title={t('hero.change', { defaultValue: 'Change Birth Details' })}
    >
      <RotateCcw size={14} />
      <span className="hidden sm:inline text-xs">
        {t('hero.change', { defaultValue: 'Change' })}
      </span>
    </Button>
  );
}
