export function OrnamentalDivider({ className }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center gap-3 my-10 select-none ${className ?? ''}`}
      aria-hidden="true"
    >
      <span
        className="h-px flex-1 max-w-[200px]"
        style={{
          background: 'linear-gradient(to right, transparent, hsl(var(--primary) / 0.3), transparent)',
        }}
      />
      <span
        className="text-primary/50"
        style={{ fontSize: '11px', lineHeight: 1 }}
      >
        ?
      </span>
      <span
        className="h-px flex-1 max-w-[200px]"
        style={{
          background: 'linear-gradient(to right, transparent, hsl(var(--primary) / 0.3), transparent)',
        }}
      />
    </div>
  );
}
