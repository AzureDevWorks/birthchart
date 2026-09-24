import { Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { TileShell } from './TileShell';
import { PLANET_GLYPHS } from '@/features/report/lib/glyphs';

interface ChapterTileProps {
  kundli: any;
}

function fmtYear(iso?: string): string {
  if (!iso) return '—';
  return new Date(iso).getFullYear().toString();
}

export function ChapterTile({ kundli }: ChapterTileProps) {
  const { t } = useTranslation();
  const md = kundli.dasha?.currentMahadasha;
  const antar = kundli.dasha?.currentAntar;

  if (!md) return null;

  const progress =
    typeof md.progressPercent === 'number' ? md.progressPercent : 0;

  return (
    <TileShell
      icon={<Clock size={13} />}
      eyebrow={t('dashboard.chapterTitle', { defaultValue: 'Current Chapter' })}
      href="/chart"
    >
      <div className="space-y-4">
        <div className="flex items-baseline gap-3">
          <span
            className="text-3xl leading-none shrink-0"
            style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
          >
            {PLANET_GLYPHS[md.planet] ?? '·'}
          </span>
          <div className="min-w-0">
            <p
              className="text-lg font-bold leading-tight text-foreground truncate"
              style={{
                fontFamily: "'Crimson Pro', 'Cormorant Garamond', Georgia, serif",
              }}
            >
              {md.planet}{' '}
              <span className="text-muted-foreground font-normal">
                {t('dasha.mahadasha', { defaultValue: 'Mahadasha' })}
              </span>
            </p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono">
              {t('dashboard.until', { defaultValue: 'until' })}{' '}
              {fmtYear(md.endTime)}
            </p>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="h-1.5 bg-muted/60 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, progress)}%` }}
            />
          </div>
          <p className="text-[10px] text-muted-foreground text-right font-mono tabular-nums">
            {progress.toFixed(1)}%
          </p>
        </div>

        {antar && (
          <div
            className="pt-3 border-t text-[11px] text-muted-foreground"
            style={{ borderColor: 'hsl(38 55% 48% / 0.15)' }}
          >
            <span className="opacity-75">
              {t('dasha.antardasha', { defaultValue: 'Antardasha' })}
            </span>
            <span className="mx-2 opacity-40">·</span>
            <strong className="text-foreground/85 font-medium">
              {PLANET_GLYPHS[antar.planet] ?? ''} {antar.planet}
            </strong>
            {antar.endTime && (
              <span className="opacity-60 font-mono">
                {' '}
                → {fmtYear(antar.endTime)}
              </span>
            )}
          </div>
        )}
      </div>
    </TileShell>
  );
}