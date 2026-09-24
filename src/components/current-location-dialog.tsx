import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, RotateCcw, Clock, Info } from 'lucide-react';
import { toast } from 'sonner';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PlaceCombobox } from '@/features/birth-profile/components/PlaceCombobox';
import {
  getUserLocation,
  setUserLocation,
  resetToDetected,
  type UserLocation,
  type LocationSource,
} from '@/lib/user-location';
import type { Place } from '@/domain/geo/place';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SOURCE_LABEL: Record<LocationSource, string> = {
  'user-set': 'Set by you',
  'geolocation': 'From device GPS',
  'tz-detect': 'Detected from your timezone',
  'fallback': 'Default (Greenwich)',
};

export function CurrentLocationDialog({ open, onOpenChange }: Props) {
  const { t } = useTranslation();
  const [loc, setLoc] = useState<UserLocation>(() => getUserLocation());

  const handleSelect = (place: Place | null) => {
    if (!place) return;
    const updated = setUserLocation(place);
    setLoc(updated);
    toast.success(`Current location set to ${updated.shortLabel}.`);
  };

  const handleReset = () => {
    const detected = resetToDetected();
    setLoc(detected);
    toast.success(`Reverted to ${detected.shortLabel} (auto-detected).`);
  };

  const isUserSet = loc.source === 'user-set';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.4rem' }}
          >
            {t('location.title', { defaultValue: 'Current Location' })}
          </DialogTitle>
          <DialogDescription>
            {t('location.subtitle', {
              defaultValue:
                'Used for today\u2019s panchang, festivals, and any other time-sensitive reading. Your birth chart keeps using your birth place.',
            })}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 pt-2">
          {/* Current location card */}
          <div className="rounded-xl border bg-muted/20 p-4 space-y-3">
            <div className="flex items-start gap-3">
              <span className="shrink-0 mt-0.5 w-9 h-9 rounded-full bg-primary/10 border border-primary/25 flex items-center justify-center">
                <MapPin size={15} className="text-primary" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-tight truncate">
                  {loc.shortLabel}
                </p>
                <p className="text-[11px] text-muted-foreground font-mono truncate">
                  {loc.timezone}
                </p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span
                    className={
                      'inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium border ' +
                      (isUserSet
                        ? 'bg-emerald-500/[0.08] text-emerald-700 dark:text-emerald-400 border-emerald-500/25'
                        : 'bg-muted/60 text-muted-foreground border-border')
                    }
                  >
                    {SOURCE_LABEL[loc.source]}
                  </span>
                </div>
              </div>
            </div>

            {!isUserSet && (
              <p className="text-[11px] text-muted-foreground leading-relaxed pt-3 border-t border-border/40 flex items-start gap-1.5">
                <Info size={11} className="mt-0.5 shrink-0 opacity-60" />
                <span>
                  {t('location.autoDetectedHint', {
                    defaultValue:
                      'We detected this from your browser timezone. Change it below if you are somewhere else.',
                  })}
                </span>
              </p>
            )}
          </div>

          {/* Change location */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-foreground">
              {t('location.change', { defaultValue: 'Change location' })}
            </label>
            <PlaceCombobox value={null} onChange={handleSelect} />
          </div>

          {/* Reset option */}
          {isUserSet && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="gap-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              <RotateCcw size={12} />
              {t('location.resetToDetected', {
                defaultValue: 'Reset to auto-detected',
              })}
            </Button>
          )}

          {/* Info */}
          <div className="rounded-lg border border-border/60 bg-muted/20 p-3 text-[11px] leading-relaxed text-muted-foreground flex items-start gap-2">
            <Clock size={12} className="mt-0.5 shrink-0 opacity-60" />
            <span>
              {t('location.info', {
                defaultValue:
                  'Sunrise, sunset, muhurtas, and the Vedic calendar all depend on the observer\u2019s location. Your natal chart and dashas never change.',
              })}
            </span>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
            {t('common.close', { defaultValue: 'Close' })}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}