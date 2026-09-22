import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

export type PanchangSubView = 'today' | 'festivals';

interface PanchangSubTabsProps {
  view: PanchangSubView;
  onChange: (v: PanchangSubView) => void;
}

export function PanchangSubTabs({ view, onChange }: PanchangSubTabsProps) {
  const { t } = useTranslation();

  const tabs: Array<{ key: PanchangSubView; label: string }> = [
    { key: 'today',     label: t('panchang.subTabs.today',     { defaultValue: 'Today' }) },
    { key: 'festivals', label: t('panchang.subTabs.festivals', { defaultValue: 'Festivals' }) },
  ];

  return (
    <div className="flex justify-center mb-6 no-print">
      <div className="inline-flex items-center gap-0.5 p-0.5 rounded-lg border bg-muted/40">
        {tabs.map((tab) => (
          <Button
            key={tab.key}
            variant="ghost"
            size="sm"
            onClick={() => onChange(tab.key)}
            className={cn(
              'h-8 px-4 text-xs transition-colors rounded-md',
              view === tab.key
                ? 'bg-background text-foreground shadow-sm hover:bg-background'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {tab.label}
          </Button>
        ))}
      </div>
    </div>
  );
}