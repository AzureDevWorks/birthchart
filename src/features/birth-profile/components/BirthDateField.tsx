import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BSDatePicker } from '@/components/bs-date-picker';
import {
  fromGregorianISO,
  formatADFromISO,
  type BSDate,
} from '@/infrastructure/calendar/nepali-date';

type CalendarMode = 'bs' | 'ad';

interface Props {
  value: string; // Gregorian ISO "YYYY-MM-DD"
  onChange: (iso: string) => void;
  minYear?: number;
  maxYear?: number;
}

export function BirthDateField({ value, onChange, minYear, maxYear }: Props) {
  const { t, i18n } = useTranslation();

  // Default to B.S. if UI language is Nepali, else A.D.
  const initialMode: CalendarMode =
    (i18n.resolvedLanguage ?? 'en') === 'ne' ? 'bs' : 'ad';
  const [mode, setMode] = useState<CalendarMode>(initialMode);

  // Derive B.S. from current Gregorian value
  const [bsValue, setBsValue] = useState<BSDate | null>(() =>
    value ? fromGregorianISO(value) : null
  );

  // Keep B.S. state in sync when user switches to B.S. mode
  useEffect(() => {
    if (mode === 'bs' && value) {
      const converted = fromGregorianISO(value);
      if (converted) setBsValue(converted);
    }
  }, [mode, value]);

  const handleBsChange = (iso: string) => {
    const converted = fromGregorianISO(iso);
    setBsValue(converted);
    onChange(iso);
  };

  const handleAdChange = (iso: string) => {
    onChange(iso);
  };

  return (
    <div className="space-y-2">
      {/* Toggle */}
      <div className="flex items-center gap-1 p-0.5 rounded-md border bg-muted/40 w-fit">
        <Button
          type="button"
          variant={mode === 'bs' ? 'default' : 'ghost'}
          size="sm"
          className="h-7 px-2 text-xs"
          onClick={() => setMode('bs')}
        >
          {t('birth.calendarBS')}
        </Button>
        <Button
          type="button"
          variant={mode === 'ad' ? 'default' : 'ghost'}
          size="sm"
          className="h-7 px-2 text-xs"
          onClick={() => setMode('ad')}
        >
          {t('birth.calendarAD')}
        </Button>
      </div>

      {/* Picker */}
      {mode === 'bs' ? (
        <BSDatePicker
          value={bsValue}
          onChange={handleBsChange}
          nepaliScript={(i18n.resolvedLanguage ?? 'en') === 'ne'}
        />
      ) : (
        <Input
          type="date"
          value={value}
          min={minYear ? `${minYear}-01-01` : undefined}
          max={maxYear ? `${maxYear}-12-31` : undefined}
          onChange={(e) => handleAdChange(e.target.value)}
        />
      )}

      {/* Approximate A.D. display */}
      {mode === 'bs' && value && (
        <p className="text-xs text-muted-foreground">
          {t('birth.approximateAD', { ad: formatADFromISO(value) })}
        </p>
      )}
      {mode === 'ad' && value && (
        <p className="text-xs text-muted-foreground">
          {t('birth.approximateBS', {
            bs: (() => {
              const converted = fromGregorianISO(value);
              if (!converted) return '—';
              return `${converted.year} ${converted.month + 1} ${converted.day}`;
            })(),
          })}
        </p>
      )}
    </div>
  );
}
