import { useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AccordionSectionProps {
  /** Small uppercase label above the title */
  eyebrow?: string;
  /** Main section title (always visible) */
  title: string;
  /** Optional one-line subtitle shown when collapsed */
  subtitle?: string;
  /** Optional badge text (e.g. "Career", "Wealth") */
  badge?: string;
  /** Optional accent color for the badge */
  accent?: 'emerald' | 'amber' | 'red' | 'purple' | 'blue' | 'primary';
  /** Whether the section starts expanded */
  defaultOpen?: boolean;
  /** Content to render when expanded */
  children: ReactNode;
}

const ACCENT_BADGE: Record<string, string> = {
  emerald: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
  amber:   'bg-amber-500/10 text-amber-700 dark:text-amber-400',
  red:     'bg-red-500/10 text-red-700 dark:text-red-400',
  purple:  'bg-purple-500/10 text-purple-700 dark:text-purple-400',
  blue:    'bg-blue-500/10 text-blue-700 dark:text-blue-400',
  primary: 'bg-primary/10 text-primary',
};

export function AccordionSection({
  eyebrow,
  title,
  subtitle,
  badge,
  accent = 'primary',
  defaultOpen = false,
  children,
}: AccordionSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-2xl border bg-card overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full px-6 py-5 flex items-start justify-between gap-4 text-left hover:bg-muted/20 transition-colors"
      >
        <div className="flex-1 min-w-0">
          {eyebrow && (
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary/70 font-semibold mb-1">
              {eyebrow}
            </p>
          )}
          <div className="flex items-center gap-3 flex-wrap">
            <h3
              className="font-bold leading-tight"
              style={{
                fontFamily: "'Crimson Pro', Georgia, serif",
                fontSize: '1.35rem',
              }}
            >
              {title}
            </h3>
            {badge && (
              <span
                className={cn(
                  'text-[9px] uppercase tracking-wider px-2 py-0.5 rounded font-semibold',
                  ACCENT_BADGE[accent]
                )}
              >
                {badge}
              </span>
            )}
          </div>
          {subtitle && !open && (
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed max-w-3xl">
              {subtitle}
            </p>
          )}
        </div>
        <span className="text-muted-foreground text-lg shrink-0 mt-1">
          {open ? '▴' : '▾'}
        </span>
      </button>
      {open && (
        <div className="px-6 py-6 border-t space-y-6">
          {children}
        </div>
      )}
    </div>
  );
}