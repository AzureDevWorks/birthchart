import { useTranslation } from 'react-i18next';
import type { PanchangData } from '@/infrastructure/astrology/panchang.adapter';

interface PanchangStripProps {
  panchang: PanchangData;
}

export function PanchangStrip({ panchang }: PanchangStripProps) {
  const { t } = useTranslation();

  const items: Array<{ label: string; value: string }> = [
    {
      label: t('panchang.limbs.tithi', { defaultValue: 'Tithi' }),
      value: panchang.tithi.name,
    },
    {
      label: t('panchang.limbs.nakshatra', { defaultValue: 'Nakshatra' }),
      value: panchang.nakshatra.name,
    },
    {
      label: t('panchang.limbs.yoga', { defaultValue: 'Yoga' }),
      value: panchang.yoga.name,
    },
    {
      label: t('panchang.limbs.karana', { defaultValue: 'Karana' }),
      value: panchang.karana.name,
    },
    {
      label: t('panchang.limbs.vara', { defaultValue: 'Vara' }),
      value: panchang.vara.name,
    },
  ];

  return (
    <div className="flex flex-wrap items-baseline justify-center gap-x-5 gap-y-2 text-xs">
      {items.map((it, i) => (
        <span key={it.label} className="flex items-baseline gap-1.5">
          {i > 0 && (
            <span className="text-primary/30 select-none" aria-hidden="true">
              {'\u00b7'}
            </span>
          )}
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
            {it.label}
          </span>
          <span className="text-foreground/90 font-medium">{it.value}</span>
        </span>
      ))}
    </div>
  );
}