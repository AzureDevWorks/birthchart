import { useTranslation } from 'react-i18next';
import type { BirthData } from '@/domain/astrology/birth-data';

interface PanchangSectionProps {
  kundli: Record<string, any>;
  profile: BirthData;
}

export function PanchangSection({ kundli, profile }: PanchangSectionProps) {
  const { t } = useTranslation();

  const [y, m, d] = profile.localDate.split('-').map(Number);
  const localDate = new Date(y, m - 1, d, 12, 0, 0);
  const weekday = localDate.toLocaleDateString('en-GB', { weekday: 'long' });

  // Extract from kundli
  const moon = kundli.planets?.Moon ?? {};
  const asc = kundli.ascendant ?? {};

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <Tile
        label={t('panchang.vara', { defaultValue: 'Vara (Weekday)' })}
        value={weekday}
        sub={t('panchang.varaSub', { defaultValue: 'The day lord' })}
      />
      <Tile
        label={t('panchang.nakshatra', { defaultValue: 'Nakshatra' })}
        value={`${moon.nakshatra ?? asc.nakshatra ?? '—'}`}
        sub={`Pada ${moon.pada ?? asc.pada ?? 1} • Lord: ${moon.nakshatraLord ?? asc.nakshatraLord ?? '—'}`}
      />
      <Tile
        label={t('panchang.rashi', { defaultValue: 'Chandra Rashi' })}
        value={moon.rashiName ?? '—'}
        sub={`${moon.degree ?? 0}° ${String(moon.minute ?? 0).padStart(2, '0')}′`}
      />
      <Tile
        label={t('panchang.lagna', { defaultValue: 'Lagna' })}
        value={asc.rashiName ?? '—'}
        sub={`${asc.degree ?? 0}° ${String(asc.minute ?? 0).padStart(2, '0')}′`}
      />
    </div>
  );
}

function Tile({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="p-4 rounded-lg border bg-card">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
        {label}
      </p>
      <p className="text-base font-bold mt-1">{value}</p>
      {sub && <p className="text-[11px] text-muted-foreground mt-0.5">{sub}</p>}
    </div>
  );
}
