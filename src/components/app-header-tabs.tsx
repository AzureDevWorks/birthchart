import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

export type AppView = 'chart' | 'panchang';

interface AppHeaderTabsProps {
  view: AppView;
  onChange: (view: AppView) => void;
}

export function AppHeaderTabs({ view, onChange }: AppHeaderTabsProps) {
  const { t } = useTranslation();

  const tabs: Array<{ key: AppView; label: string }> = [
    { key: 'chart', label: t('nav.chart', { defaultValue: 'Chart' }) },
    { key: 'panchang', label: t('nav.panchang', { defaultValue: 'Panchang' }) },
  ];

  return (
    <div className="flex items-center gap-0.5 p-0.5 rounded-lg border bg-muted/40 no-print">
      {tabs.map((tab) => (
        <Button
          key={tab.key}
          variant="ghost"
          size="sm"
          onClick={() => onChange(tab.key)}
          className={cn(
            'h-7 px-3 text-xs transition-colors rounded-md',
            view === tab.key
              ? 'bg-background text-foreground shadow-sm hover:bg-background'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
}
