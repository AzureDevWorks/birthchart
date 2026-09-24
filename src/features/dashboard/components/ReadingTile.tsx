import { BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { TileShell } from './TileShell';
import { CATEGORY_MAP, CATEGORIES } from '@/features/ai-reading/categories';

interface ReadingTileProps {
  count: number;
  suggestedId: string | null;
}

export function ReadingTile({ count, suggestedId }: ReadingTileProps) {
  const { t } = useTranslation();

  const total = CATEGORIES.length;
  const pct = total > 0 ? (count / total) * 100 : 0;
  const suggested = suggestedId
    ? CATEGORY_MAP[suggestedId as keyof typeof CATEGORY_MAP]
    : null;

  return (
    <TileShell
      icon={<BookOpen size={13} />}
      eyebrow={t('dashboard.readingsTitle', { defaultValue: 'Reading Studio' })}
      href="/reading"
    >
      <div className="space-y-4">
        <div className="flex items-baseline gap-2">
          <span
            className="text-4xl font-bold leading-none tabular-nums"
            style={{
              fontFamily: "'Crimson Pro', 'Cormorant Garamond', Georgia, serif",
            }}
          >
            {count}
          </span>
          <span className="text-lg text-muted-foreground/70">/ {total}</span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground ml-auto font-semibold">
            {t('dashboard.composed', { defaultValue: 'composed' })}
          </span>
        </div>

        <div className="h-1.5 bg-muted/60 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, pct)}%` }}
          />
        </div>

        <p
          className="text-[11px] leading-relaxed text-muted-foreground pt-2 border-t"
          style={{ borderColor: 'hsl(38 55% 48% / 0.15)' }}
        >
          {suggested ? (
            <>
              {t('dashboard.nextSuggested', { defaultValue: 'Suggested next:' })}{' '}
              <strong className="text-foreground/85 font-medium">
                {suggested.title}
              </strong>
            </>
          ) : (
            <span>
              {t('dashboard.allDone', {
                defaultValue: 'All ten readings composed.',
              })}
            </span>
          )}
        </p>
      </div>
    </TileShell>
  );
}