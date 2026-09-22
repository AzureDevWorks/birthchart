import type { ReactNode } from 'react';

interface SectionProps {
  eyebrow?: string;
  title: string;
  hint?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Section({
  eyebrow,
  title,
  hint,
  action,
  children,
  className,
}: SectionProps) {
  return (
    <section className={`space-y-5 ${className ?? ''}`}>
      <header className="space-y-2">
        {eyebrow && (
          <p
            className="text-[10px] uppercase tracking-[0.3em] text-primary/70 font-semibold"
            style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
          >
            {eyebrow}
          </p>
        )}
        <div className="flex items-baseline justify-between gap-3 flex-wrap">
          <h2
            className="font-bold tracking-tight"
            style={{
              fontFamily: "'Crimson Pro', 'Noto Serif Devanagari', Georgia, serif",
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              lineHeight: 1.15,
            }}
          >
            {title}
          </h2>
          {action}
        </div>
        {hint && (
          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
            {hint}
          </p>
        )}
      </header>

      <div>{children}</div>
    </section>
  );
}
