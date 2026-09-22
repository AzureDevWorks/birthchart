import type { ReactNode } from 'react';

// ─────────────────────────────────────────────────────────────
// Reusable display primitives for the Predictions page
// ─────────────────────────────────────────────────────────────

export function KeyValueRow({
  label,
  value,
  mono,
}: {
  label: string;
  value: ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3 py-1 border-b border-border/30 last:border-none">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className={`text-right text-sm ${mono ? 'font-mono text-xs' : ''} font-medium`}>
        {value}
      </span>
    </div>
  );
}

export function ChipList({
  items,
  tone = 'neutral',
}: {
  items: string[];
  tone?: 'neutral' | 'positive' | 'warning' | 'primary';
}) {
  const cls =
    tone === 'positive'
      ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
      : tone === 'warning'
        ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400'
        : tone === 'primary'
          ? 'bg-primary/10 text-primary'
          : 'bg-muted/60 text-muted-foreground';
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((it) => (
        <span
          key={it}
          className={`text-[11px] px-2.5 py-1 rounded-md font-medium ${cls}`}
        >
          {it}
        </span>
      ))}
    </div>
  );
}

export function BulletList({
  items,
  icon = '◆',
  tone = 'primary',
}: {
  items: string[];
  icon?: string;
  tone?: 'primary' | 'positive' | 'warning' | 'red';
}) {
  const cls =
    tone === 'positive'
      ? 'text-emerald-600 dark:text-emerald-400'
      : tone === 'warning'
        ? 'text-amber-600 dark:text-amber-400'
        : tone === 'red'
          ? 'text-red-600 dark:text-red-400'
          : 'text-primary';
  return (
    <ul className="space-y-1.5">
      {items.map((it, i) => (
        <li key={i} className="flex items-start gap-2 text-sm leading-relaxed">
          <span className={`${cls} mt-0.5 shrink-0`}>{icon}</span>
          <span className="text-foreground/85">{it}</span>
        </li>
      ))}
    </ul>
  );
}

export function SubHeading({ children }: { children: ReactNode }) {
  return (
    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-2.5">
      {children}
    </p>
  );
}

export function InsightBlock({
  label,
  text,
  tone = 'primary',
}: {
  label: string;
  text: string;
  tone?: 'primary' | 'emerald' | 'purple' | 'amber';
}) {
  const border =
    tone === 'emerald'
      ? 'border-emerald-500/30 bg-emerald-500/[0.04]'
      : tone === 'purple'
        ? 'border-purple-500/30 bg-purple-500/[0.04]'
        : tone === 'amber'
          ? 'border-amber-500/30 bg-amber-500/[0.04]'
          : 'border-primary/30 bg-primary/[0.04]';
  const accent =
    tone === 'emerald'
      ? 'text-emerald-700 dark:text-emerald-400'
      : tone === 'purple'
        ? 'text-purple-700 dark:text-purple-400'
        : tone === 'amber'
          ? 'text-amber-700 dark:text-amber-400'
          : 'text-primary';

  return (
    <div className={`rounded-xl border ${border} p-4 space-y-1.5`}>
      <p className={`text-[10px] uppercase tracking-[0.2em] font-semibold ${accent}`}>
        {label}
      </p>
      <p className="text-sm leading-relaxed text-foreground/85">{text}</p>
    </div>
  );
}

export function StatTile({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: ReactNode;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-xl border bg-card p-4 space-y-1">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
        {label}
      </p>
      <p
        className={`text-lg font-bold leading-tight ${accent ? 'text-primary' : 'text-foreground'}`}
        style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
      >
        {value}
      </p>
      {sub && <p className="text-[10px] text-muted-foreground font-mono">{sub}</p>}
    </div>
  );
}

export function ScoreBar({
  label,
  value,
  max = 100,
}: {
  label: string;
  value: number;
  max?: number;
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className="space-y-1">
      <div className="flex items-baseline justify-between text-xs">
        <span className="text-muted-foreground font-medium">{label}</span>
        <span className="font-mono font-semibold">{value}</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function RatingBadge({
  rating,
  size = 'md',
}: {
  rating: string;
  size?: 'sm' | 'md';
}) {
  const lower = rating.toLowerCase();
  const tone =
    lower.includes('exceptional') || lower.includes('strong') || lower.includes('high')
      ? 'positive'
      : lower.includes('caution') ||
          lower.includes('needs') ||
          lower.includes('challenging') ||
          lower.includes('low')
        ? 'warning'
        : 'neutral';
  const cls =
    tone === 'positive'
      ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30'
      : tone === 'warning'
        ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30'
        : 'bg-muted/60 text-muted-foreground border-border';
  return (
    <span
      className={`inline-flex items-center rounded-md border font-semibold uppercase tracking-wider ${cls} ${
        size === 'sm' ? 'text-[9px] px-2 py-0.5' : 'text-[10px] px-2.5 py-1'
      }`}
    >
      {rating}
    </span>
  );
}