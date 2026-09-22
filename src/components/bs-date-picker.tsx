import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  NEPALI_MONTHS,
  NEPALI_MONTHS_EN,
  BS_MIN_YEAR,
  BS_MAX_YEAR,
  daysInBsMonth,
  toDevanagari,
  toGregorianISO,
  type BSDate,
} from '@/infrastructure/calendar/nepali-date';

interface Props {
  value: BSDate | null;
  onChange: (isoGregorian: string) => void;
  /** Show Devanagari numerals + Nepali month names */
  nepaliScript?: boolean;
}

const FALLBACK: BSDate = { year: 2048, month: 2, day: 15 };

export function BSDatePicker({ value, onChange, nepaliScript = true }: Props) {
  const { i18n } = useTranslation();
  const isNepali = nepaliScript || (i18n.resolvedLanguage ?? 'en') === 'ne';

  const current = value ?? FALLBACK;

  const monthNames = isNepali ? NEPALI_MONTHS : NEPALI_MONTHS_EN;

  const maxDay = useMemo(
    () => daysInBsMonth(current.year, current.month),
    [current.year, current.month]
  );

  // Clamp day if month/year changed
  useEffect(() => {
    if (current.day > maxDay) {
      const next = { ...current, day: maxDay };
      const iso = toGregorianISO(next);
      if (iso) onChange(iso);
    }
  }, [maxDay, current, onChange]);

  const emit = (patch: Partial<BSDate>) => {
    const next: BSDate = { ...current, ...patch };
    // Clamp day if month shrinks
    const dim = daysInBsMonth(next.year, next.month);
    if (next.day > dim) next.day = dim;
    const iso = toGregorianISO(next);
    if (iso) onChange(iso);
  };

  const years = useMemo(() => {
    const arr: number[] = [];
    for (let y = BS_MAX_YEAR; y >= BS_MIN_YEAR; y--) arr.push(y);
    return arr;
  }, []);

  const days = useMemo(() => {
    const arr: number[] = [];
    for (let d = 1; d <= maxDay; d++) arr.push(d);
    return arr;
  }, [maxDay]);

  const fmt = (n: number) => (isNepali ? toDevanagari(n) : String(n));

  return (
    <div className="grid grid-cols-3 gap-2">
      <Select
        value={String(current.year)}
        onValueChange={(v) => emit({ year: Number(v) })}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="max-h-72">
          {years.map((y) => (
            <SelectItem key={y} value={String(y)}>
              {fmt(y)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={String(current.month)}
        onValueChange={(v) => emit({ month: Number(v) })}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {monthNames.map((name, idx) => (
            <SelectItem key={idx} value={String(idx)}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={String(current.day)}
        onValueChange={(v) => emit({ day: Number(v) })}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="max-h-72">
          {days.map((d) => (
            <SelectItem key={d} value={String(d)}>
              {fmt(d)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
