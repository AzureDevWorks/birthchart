import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

export type AppView = 'chart' | 'panchang' | 'gochar' | 'predictions' | 'matching';

interface TabDef {
  key: AppView;
  path: string;
}

const TABS: TabDef[] = [
  { key: 'chart',       path: '/chart' },
  { key: 'panchang',    path: '/panchang' },
  { key: 'gochar',      path: '/gochar' },
  { key: 'predictions', path: '/predictions' },
  { key: 'matching',    path: '/matching' },
];

export function AppHeaderTabs() {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-0.5 p-0.5 rounded-lg border bg-muted/40 no-print overflow-x-auto max-w-full">
      {TABS.map((tab) => (
        <NavLink
          key={tab.key}
          to={tab.path}
          className={({ isActive }) =>
            cn(
              'inline-flex items-center justify-center h-7 px-3 text-xs rounded-md transition-colors whitespace-nowrap',
              isActive
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )
          }
        >
          {t(`nav.${tab.key}`, { defaultValue: tab.key })}
        </NavLink>
      ))}
    </div>
  );
}