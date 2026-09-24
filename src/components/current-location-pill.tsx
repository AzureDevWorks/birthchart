import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconPin, IconChevronsUpDown } from '@/components/icons';
import { PlaceCombobox } from '@/features/birth-profile/components/PlaceCombobox';
import {
  getUserLocation,
  setUserLocation,
  type UserLocation,
} from '@/lib/user-location';
import { MANUSCRIPT as C, MANUSCRIPT_ALPHA as CA } from '@/features/report/lib/manuscript-colors';
import type { Place } from '@/domain/geo/place';

interface CurrentLocationPillProps {
  /** Optional: called after the location is changed */
  onChange?: (loc: UserLocation) => void;
}

/**
 * Small pill showing the current location used by the tab.
 * Click "Change" to open the PlaceCombobox and override.
 */
export function CurrentLocationPill({ onChange }: CurrentLocationPillProps) {
  const { t } = useTranslation();
  const [loc, setLoc] = useState<UserLocation>(() => getUserLocation());
  const [open, setOpen] = useState(false);

  const handleSelect = (place: Place | null) => {
    if (!place) return;
    const updated = setUserLocation(place);
    setLoc(updated);
    setOpen(false);
    onChange?.(updated);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full"
        style={{
          border: `1px solid ${CA.goldSoft(0.4)}`,
          background: C.ivory,
        }}
      >
        <IconPin size={12} style={{ color: C.gold }} />
        <span
          className="text-xs"
          style={{ color: C.brown, fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          {loc.shortLabel}
        </span>
        <span className="opacity-40 text-xs" style={{ color: C.brownSoft }}>·</span>
        <span
          className="text-[10px] font-mono"
          style={{ color: C.brownSoft }}
        >
          {loc.timezone}
        </span>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="ml-1 text-[10px] uppercase tracking-wider font-semibold transition-colors"
          style={{ color: C.gold }}
          onMouseEnter={(e) => (e.currentTarget.style.color = C.vermilion)}
          onMouseLeave={(e) => (e.currentTarget.style.color = C.gold)}
        >
          {open ? t('common.close', { defaultValue: 'Close' }) : t('common.change', { defaultValue: 'Change' })}
        </button>
        {!open && <IconChevronsUpDown size={11} style={{ color: C.brownSoft }} />}
      </div>

      {open && (
        <div className="w-full max-w-md pt-2">
          <PlaceCombobox value={null} onChange={handleSelect} />
        </div>
      )}
    </div>
  );
}