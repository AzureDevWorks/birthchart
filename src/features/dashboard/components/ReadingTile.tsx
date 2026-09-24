import { BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { TileShell } from './TileShell';
import { listSituations } from '@/ai/core';

interface ReadingTileProps {
  count: number;
  suggestedId: string | null;
}

export function ReadingTile({ count, suggestedId }: ReadingTileProps) {
  const { t } = useTranslation();
  const items = listSituations().filter((x) => x.situation.kind === 'article');
  const total = items.length;
  const pct = total > 0 ? (count / total) * 100 : 0;
  const suggested = suggestedId
    ? items.find((x) => x.situation.id === suggestedId)?.situation ?? null
    : null;

  return (
    <TileShell
      icon={<BookOpen size={13} />}
      eyebrow={t('dashboard.readingsTitle', { defaultValue: 'Reading Studio' })}
      href="/reading"
    >
      <div className="space-y-4">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold tabular-nums" style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}>
            {count}
          </span>
          <span className="text-lg text-muted-foreground/70">/ {total}</span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground ml-auto font-semibold">
            {t('dashboard.composed', { defaultValue: 'composed' })}
          </span>
        </div>
        <div className="h-1.5 bg-muted/60 rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full" style={{ width: `${Math.min(100, pct)}%` }} />
        </div>
        <p className="text-[11px] text-muted-foreground pt-2 border-t">
          {suggested ? (
            <>Next: <strong className="text-foreground/85">{suggested.label ?? suggested.id}</strong></>
          ) : (
            'All readings composed.'
          )}
        </p>
      </div>
    </TileShell>
  );
}

