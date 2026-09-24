import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TileShellProps {
  icon: ReactNode;
  eyebrow: string;
  trailing?: ReactNode;
  href?: string;
  children: ReactNode;
  className?: string;
  /** Reduces the body padding — useful for compact tiles. */
  compact?: boolean;
}

const BORDER = 'hsl(38 55% 48% / 0.22)';
const BORDER_SOFT = 'hsl(38 55% 48% / 0.18)';
const BG = 'linear-gradient(180deg, hsl(42 55% 98%) 0%, hsl(38 45% 96%) 100%)';

/**
 * The shared shell that gives every dashboard tile a unified look:
 * warm cream gradient, soft gold border, one header row with an
 * icon + uppercase eyebrow, and a body. Renders as a Link when href
 * is given, otherwise as a plain article.
 */
export function TileShell({
  icon,
  eyebrow,
  trailing,
  href,
  children,
  className,
  compact = false,
}: TileShellProps) {
  const inner = (
    <>
      <div
        className="relative px-5 py-3 flex items-center gap-2.5 border-b"
        style={{ borderColor: BORDER_SOFT }}
      >
        <span className="text-primary/85 shrink-0 flex items-center">
          {icon}
        </span>
        <h3
          className="text-[10px] uppercase tracking-[0.25em] font-semibold text-primary/85 truncate"
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          {eyebrow}
        </h3>
        <div className="flex-1" />
        {trailing ?? (href && (
          <ArrowRight
            size={13}
            className="text-primary/40 shrink-0 transition-all duration-200 group-hover:text-primary group-hover:translate-x-0.5"
          />
        ))}
      </div>
      <div className={compact ? 'px-5 py-3.5' : 'px-5 py-4'}>
        {children}
      </div>
    </>
  );

  const shared = cn(
    'group relative rounded-2xl border overflow-hidden',
    'transition-all duration-200',
    href && 'hover:border-primary/40 hover:shadow-md hover:-translate-y-px',
    className
  );

  const style: React.CSSProperties = {
    borderColor: BORDER,
    background: BG,
  };

  if (href) {
    return (
      <Link to={href} className={shared} style={style}>
        {inner}
      </Link>
    );
  }
  return (
    <article className={shared} style={style}>
      {inner}
    </article>
  );
}

/* ─── Small shared row helper used inside tiles ─────────────────── */

export function TileRow({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3 text-[12px]">
      <span className="text-muted-foreground">{label}</span>
      <span
        className={cn(
          'text-right font-medium text-foreground/90',
          mono && 'font-mono tabular-nums text-[11px]'
        )}
      >
        {value}
      </span>
    </div>
  );
}