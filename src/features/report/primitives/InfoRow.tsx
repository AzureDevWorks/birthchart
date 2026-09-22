interface InfoRowProps {
  label: string;
  value: string;
  accent?: boolean;
  mono?: boolean;
  className?: string;
}

export function InfoRow({
  label,
  value,
  accent = false,
  mono = false,
  className,
}: InfoRowProps) {
  return (
    <p className={`flex justify-between gap-3 ${className ?? ''}`}>
      <span className="text-muted-foreground">{label}</span>
      <strong
        className={`${accent ? 'text-primary' : ''} ${mono ? 'font-mono text-xs' : ''} text-right`}
      >
        {value}
      </strong>
    </p>
  );
}
