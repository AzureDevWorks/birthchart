import { DateTime } from 'luxon';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { IconPin, IconClock } from '@/components/icons';
import { useTranslation } from 'react-i18next';
import type { Place } from '@/domain/geo/place';

interface Props {
  place: Place;
  localDate: string;
  localTime: string;
  onChange: () => void;
}

function fmtLat(lat: number) {
  return `${Math.abs(lat).toFixed(4)}° ${lat >= 0 ? 'N' : 'S'}`;
}
function fmtLon(lon: number) {
  return `${Math.abs(lon).toFixed(4)}° ${lon >= 0 ? 'E' : 'W'}`;
}

export function PlacePreview({ place, localDate, localTime, onChange }: Props) {
  const { t } = useTranslation();

  let interpreted = '—';
  let utcLine = '';
  let offset = '';

  if (localDate && localTime) {
    const dt = DateTime.fromISO(`${localDate}T${localTime}`, { zone: place.timezone });
    if (dt.isValid) {
      interpreted = dt.toFormat('dd LLL yyyy, hh:mm:ss a');
      utcLine = dt.toUTC().toFormat("dd LLL yyyy, HH:mm:ss 'UTC'");
      offset = dt.toFormat('ZZ');
    } else {
      interpreted = `⚠ ${dt.invalidReason ?? 'Invalid'}`;
    }
  }

  return (
    <Card className="border-primary/30 bg-primary/5">
      <CardContent className="pt-6 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-sm font-semibold">
              <IconPin size={14} />
              {place.label}
            </div>
            <div className="text-xs text-muted-foreground font-mono">
              {fmtLat(place.lat)}, {fmtLon(place.lon)}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
              <IconClock size={12} />
              {place.timezone} (UTC{offset})
            </div>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={onChange}>
            {t('common.change')}
          </Button>
        </div>

        {localDate && localTime && (
          <div className="pt-3 border-t border-primary/20 space-y-0.5">
            <div className="text-xs">
              <span className="text-muted-foreground">
                {t('birth.interpretedAs')}:
              </span>{' '}
              <span className="font-medium">{interpreted}</span>
            </div>
            {utcLine && (
              <div className="text-xs text-muted-foreground font-mono">
                = {utcLine}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
