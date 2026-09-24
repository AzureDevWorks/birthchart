import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import {
  IconHome,
  IconLayoutGrid,
  IconCalendarDays,
  IconOrbit,
  IconSparkle,
  IconUsers,
} from '@/components/icons';

const TABS = [
  { key: 'home',        path: '/',            Icon: IconHome },
  { key: 'chart',       path: '/chart',       Icon: IconLayoutGrid },
  { key: 'panchang',    path: '/panchang',    Icon: IconCalendarDays },
  { key: 'gochar',      path: '/gochar',      Icon: IconOrbit },
  { key: 'predictions', path: '/predictions', Icon: IconSparkle },
  { key: 'matching',    path: '/matching',    Icon: IconUsers },
] as const;

/**
 * Mobile-only bottom navigation bar.
 * Fixed to the bottom of the viewport. Honors iOS safe-area insets.
 * Hidden at md and above.
 */
export function MobileBottomNav() {
  const { t } = useTranslation();

  return (
    <nav
      className={cn(
        'md:hidden fixed bottom-0 left-0 right-0 z-40 no-print',
        'border-t bg-background/95 backdrop-blur',
        'supports-[backdrop-filter]:bg-background/80'
      )}
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      aria-label="Primary navigation"
    >
      <div className="flex items-stretch">
        {TABS.map(({ key, path, Icon }) => (
          <NavLink
            key={key}
            to={path}
            className={({ isActive }) =>
              cn(
                'relative flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5',
                'transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-primary rounded-full"
                  />
                )}
                <Icon size={18} strokeWidth={isActive ? 2.2 : 1.7} />
                <span className="text-[8px] uppercase tracking-[0.05em] font-semibold leading-tight">
                  {t(`nav.${key}`, { defaultValue: key })}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}