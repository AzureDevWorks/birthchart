import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

export type AppView = 'home' | 'chart' | 'panchang' | 'gochar' | 'predictions' | 'matching';

interface TabDef {
  key: AppView;
  path: string;
}

export const HEADER_TABS: TabDef[] = [
  { key: 'chart',       path: '/chart' },
  { key: 'panchang',    path: '/panchang' },
  { key: 'gochar',      path: '/gochar' },
  { key: 'predictions', path: '/predictions' },
  { key: 'matching',    path: '/matching' },
];

/**
 * Desktop header tabs — inline navigation.
 * Hidden below the md breakpoint; mobile uses MobileBottomNav instead.
 */
export function AppHeaderTabs() {
  const { t } = useTranslation();

  return (
    <nav className="hidden md:flex items-center gap-0.5 no-print">
      {HEADER_TABS.map((tab) => (
        <NavLink
          key={tab.key}
          to={tab.path}
          className={({ isActive }) =>
            cn(
              'relative h-14 px-3 text-xs font-medium whitespace-nowrap',
              'inline-flex items-center justify-center transition-colors',
              'after:absolute after:bottom-0 after:left-2 after:right-2 after:h-[2px]',
              'after:transition-all after:duration-200',
              isActive
                ? 'text-foreground after:bg-primary'
                : 'text-muted-foreground hover:text-foreground after:bg-transparent'
            )
          }
        >
          {t(`nav.${tab.key}`, { defaultValue: tab.key })}
        </NavLink>
      ))}
    </nav>
  );
}