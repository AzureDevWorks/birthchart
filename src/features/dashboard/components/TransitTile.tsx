import { CloudSun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { TileShell } from './TileShell';
import type { GocharAnalysis } from '@/infrastructure/astrology/gochar.adapter';

interface TransitTileProps {
  gochar: GocharAnalysis;
}

interface Affliction {
  key: string;
  label: string;
  detail: string | null;
  tone: 'warning' | 'danger';
}

export function TransitTile({ gochar }: TransitTileProps) {
  const { t } = useTranslation();

  const { sadeSati, dhaiya, chandrashtama } = gochar.specialTransits;
  const pct = gochar.overallFavorablePercentage;

  const active: Affliction[] = [];
  if (sadeSati.status) {
    active.push({
      key: 'sadeSati',
      label: t('dashboard.sadeSati', { defaultValue: 'Sade Sati' }),
      detail: sadeSati.phaseName ?? null,
      tone: 'warning',
    });
  }
  if (dhaiya.status) {
    active.push({
      key: 'dhaiya',
      label: t('dashboard.dhaiya', { defaultValue: 'Dhaiya' }),
      detail: dhaiya.typeName?.replace(/\s*\([^)]*\)\s*$/, '') ?? null,
      tone: dhaiya.type === 'Eighth' ? 'danger' : 'warning',
    });
  }
  if (chandrashtama.isActive) {
    active.push({
      key: 'chandrashtama',
      label: t('dashboard.chandrashtama', { defaultValue: 'Chandrashtama' }),
      detail: null,
      tone: 'danger',
    });
  }

  const band = pct >= 60 ? 'good' : pct >= 40 ? 'mixed' : 'caution';
  const bandColor =
    band === 'good'
      ? 'hsl(150 45% 42%)'
      : band === 'mixed'
        ? 'hsl(38 60% 48%)'
        : 'hsl(6 60% 44%)';
  const bandLabel =
    band === 'good' ? 'Favorable' : band === 'mixed' ? 'Mixed' : 'Caution';

  return (
    <TileShell
      icon={<CloudSun size={13} />}
      eyebrow={t('dashboard.transitTitle', { defaultValue: "Today's Sky" })}
      href="/gochar"
    >
      <div className="space-y-4">
        {/* Affliction chips */}
        {active.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {active.map((a) => (
              <span
                key={a.key}
                className={
                  'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium border ' +
                  (a.tone === 'danger'
                    ? 'bg-red-500/[0.08] text-red-700 dark:text-red-400 border-red-500/25'
                    : 'bg-amber-500/[0.08] text-amber-700 dark:text-amber-400 border-amber-500/25')
                }
              >
                <span
                  className={
                    'w-1.5 h-1.5 rounded-full ' +
                    (a.tone === 'danger' ? 'bg-red-500' : 'bg-amber-500')
                  }
                />
                {a.label}
                {a.detail && (
                  <span className="opacity-70">· {a.detail}</span>
                )}
              </span>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-[12px] text-emerald-700 dark:text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            <span>
              {t('dashboard.noAfflictions', {
                defaultValue: 'No Saturn or Chandra afflictions today.',
              })}
            </span>
          </div>
        )}

        {/* Favorable score */}
        <div className="space-y-1.5">
          <div className="flex items-baseline justify-between">
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
              {t('dashboard.favorable', { defaultValue: 'Favorable' })}
            </span>
            <span
              className="text-lg font-bold leading-none tabular-nums"
              style={{
                fontFamily: "'Crimson Pro', 'Cormorant Garamond', Georgia, serif",
                color: bandColor,
              }}
            >
              {pct}%
            </span>
          </div>
          <div className="h-1.5 bg-muted/60 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.max(0, Math.min(100, pct))}%`, background: bandColor }}
            />
          </div>
          <p
            className="text-[10px] uppercase tracking-[0.2em] font-semibold text-right"
            style={{ color: bandColor }}
          >
            {bandLabel}
          </p>
        </div>
      </div>
    </TileShell>
  );
}