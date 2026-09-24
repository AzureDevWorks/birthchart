import { CalendarDays, Sunrise, Sunset } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { TileShell, TileRow } from './TileShell';
import type { PanchangData } from '@/infrastructure/astrology/panchang.adapter';
import type { UserLocation } from '@/lib/user-location';

interface PanchangTileProps {
  panchang: PanchangData;
  place: UserLocation;
}

function fmtTime(dt: { toFormat: (f: string) => string } | null): string {
  if (!dt) return '—';
  try {
    return dt.toFormat('HH:mm');
  } catch {
    return '—';
  }
}

export function PanchangTile({ panchang, place }: PanchangTileProps) {
  const { t } = useTranslation();

  return (
    <TileShell
      icon={<CalendarDays size={13} />}
      eyebrow={t('dashboard.panchangTitle', { defaultValue: "Today's Panchang" })}
      href="/panchang"
      trailing={
        <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono truncate max-w-[100px]">
          {place.shortLabel}
        </span>
      }
    >
      <div className="space-y-3">
        <div className="space-y-2">
          <TileRow
            label={t('panchang.limbs.tithi', { defaultValue: 'Tithi' })}
            value={
              <>
                {panchang.tithi.name}
                <span className="text-muted-foreground/70 ml-1.5">
                  · {panchang.paksha}
                </span>
              </>
            }
          />
          <TileRow
            label={t('panchang.limbs.nakshatra', { defaultValue: 'Nakshatra' })}
            value={
              <>
                {panchang.nakshatra.name}
                {panchang.nakshatra.pada && (
                  <span className="text-muted-foreground/70 ml-1.5">
                    · Pada {panchang.nakshatra.pada}
                  </span>
                )}
              </>
            }
          />
        </div>

        <div
          className="grid grid-cols-2 gap-2 pt-3 border-t"
          style={{ borderColor: 'hsl(38 55% 48% / 0.15)' }}
        >
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Sunrise size={11} className="text-primary/70 shrink-0" />
            <span className="font-mono tabular-nums">
              {fmtTime(panchang.sunrise)}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground justify-end">
            <Sunset size={11} className="text-primary/70 shrink-0" />
            <span className="font-mono tabular-nums">
              {fmtTime(panchang.sunset)}
            </span>
          </div>
        </div>

        {panchang.rahuKalam && (
          <div
            className="pt-2.5 border-t flex items-center justify-between gap-3 text-[11px]"
            style={{ borderColor: 'hsl(38 55% 48% / 0.15)' }}
          >
            <span className="text-red-700 dark:text-red-400 font-medium">
              {t('panchang.rahuKalam', { defaultValue: 'Rahu Kalam' })}
            </span>
            <span className="font-mono tabular-nums text-red-700 dark:text-red-400">
              {fmtTime(panchang.rahuKalam.start)}–{fmtTime(panchang.rahuKalam.end)}
            </span>
          </div>
        )}
      </div>
    </TileShell>
  );
}