export interface SnapshotTileProps {
  label: string;
  value: string;
  subtitle?: string;
  progress?: number;
  accent?: boolean;
  className?: string;
}

export function SnapshotTile({
  label,
  value,
  subtitle,
  progress,
  accent = false,
  className,
}: SnapshotTileProps) {
  return (
    <div
      className={`flex flex-col gap-1 p-3 rounded-lg border bg-card/50 ${className ?? ''}`}
    >
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
        {label}
      </p>
      <p
        className={`font-semibold leading-tight ${accent ? 'text-primary' : 'text-foreground'}`}
        style={{ fontSize: '1rem' }}
      >
        {value}
      </p>
      {subtitle && (
        <p className="text-[11px] text-muted-foreground leading-tight">{subtitle}</p>
      )}
      {progress !== undefined && (
        <div className="mt-1 space-y-0.5">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
          <p className="text-[10px] text-muted-foreground text-right font-mono">
            {progress.toFixed(1)}%
          </p>
        </div>
      )}
    </div>
  );
}
