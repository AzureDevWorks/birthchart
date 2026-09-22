import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';
import { useTranslation } from 'react-i18next';

/**
 * Print button. Triggers the browser's native print dialog.
 * Users can then "Save as PDF" or send to a physical printer.
 *
 * Hidden on print itself (via `no-print` class).
 */
export function PrintButton() {
  const { t } = useTranslation();

  const handlePrint = () => {
    // Small delay to allow any state to flush before printing
    setTimeout(() => window.print(), 50);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handlePrint}
      className="gap-1.5 no-print"
      title={t('app.print', { defaultValue: 'Print / Save as PDF' })}
    >
      <Printer size={14} />
      <span className="hidden sm:inline text-xs">
        {t('app.print', { defaultValue: 'Print' })}
      </span>
    </Button>
  );
}
