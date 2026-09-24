import { useTranslation } from 'react-i18next';

interface SpecialPointsSectionProps {
  kundli: Record<string, any>;
}

export function SpecialPointsSection({ kundli }: SpecialPointsSectionProps) {
  const { t } = useTranslation();
  const sl = kundli.specialLagnas ?? {};
  const ap = kundli.arudhaPadas?.all ?? [];

  const SPECIALS = [
    { key: 'ghatikaLagna', label: 'Ghatika Lagna (GL)', hint: 'Power & Authority' },
    { key: 'horaLagna', label: 'Hora Lagna (HL)', hint: 'Wealth' },
    { key: 'bhavaLagna', label: 'Bhava Lagna (BL)', hint: 'Physical Vitality' },
    { key: 'shreeLagna', label: 'Shree Lagna (SL)', hint: 'Fortune' },
    { key: 'induLagna', label: 'Indu Lagna (IL)', hint: 'Dhana Yoga' },
    { key: 'pranapadaLagna', label: 'Pranapada (PP)', hint: 'Time Rectification' },
  ];

  return (
    <div className="space-y-6">
      {/* Special Lagnas */}
      <div>
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-3">
          {t('special.specialLagnas', { defaultValue: 'Special Lagnas' })}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {SPECIALS.map(({ key, label, hint }) => {
            const s = sl[key];
            if (!s) return null;
            return (
              <div key={key} className="p-3 rounded-lg border bg-card space-y-1">
                <p className="text-xs font-semibold text-primary">{label}</p>
                <p className="text-[10px] text-muted-foreground italic">{hint}</p>
                {s.rashiName && (
                  <p className="text-sm pt-1">
                    <strong>{s.rashiName}</strong>{' '}
                    {s.degree !== undefined && (
                      <span className="text-xs font-mono text-muted-foreground">
                        {s.degree}° {String(s.minute ?? 0).padStart(2, '0')}′
                      </span>
                    )}
                  </p>
                )}
                {s.nakshatra && (
                  <p className="text-[11px] text-muted-foreground">
                    {s.nakshatra} {s.pada ? `(Pada ${s.pada})` : ''}
                  </p>
                )}
                {s.totalKalas !== undefined && (
                  <p className="text-[11px] text-muted-foreground">
                    {t('special.kalas', { defaultValue: 'Kalas' })}: {s.totalKalas}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Arudha Padas */}
      {ap.length > 0 && (
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-3">
            {t('special.arudhaPadas', { defaultValue: 'Arudha Padas' })}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {ap.map((p: any) => (
              <div
                key={p.code}
                className="flex items-center justify-between gap-3 p-2.5 rounded-lg border bg-card text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="font-bold text-primary w-8">{p.code}</span>
                  <span className="text-muted-foreground truncate max-w-[16rem]">
                    {p.name?.split(' - ')[0]}
                  </span>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-semibold">{p.rashiName}</p>
                  <p className="text-[10px] text-muted-foreground">
                    H{p.houseNumber} • {p.lord}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
