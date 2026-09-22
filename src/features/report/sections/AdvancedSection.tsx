import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface AdvancedSectionProps {
  kundli: Record<string, any>;
}

export function AdvancedSection({ kundli }: AdvancedSectionProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const vargaKeys = Object.keys(kundli.vargas ?? {}).filter((k) => k !== 'd1');
  const kpCusps = kundli.kp?.cusps ?? [];
  const chalitPlanets = kundli.chalit?.planets ?? [];

  return (
    <div className="border rounded-xl bg-card overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/40 transition-colors"
      >
        <span className="text-sm font-semibold">
          {open
            ? t('advanced.hide', { defaultValue: 'Hide advanced analysis' })
            : t('advanced.show', { defaultValue: 'Show advanced analysis' })}
        </span>
        <span className="text-muted-foreground">{open ? '▴' : '▾'}</span>
      </button>

      {open && (
        <div className="p-4 space-y-6 border-t">
          {/* Vargas */}
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-2">
              {t('advanced.vargas', { defaultValue: 'Divisional Charts' })} ({vargaKeys.length})
            </p>
            <div className="flex flex-wrap gap-1.5">
              {vargaKeys.map((k) => (
                <span
                  key={k}
                  className="inline-flex items-center px-2 py-1 rounded text-[10px] font-mono uppercase bg-muted/60 text-muted-foreground"
                >
                  {k}
                </span>
              ))}
            </div>
          </div>

          {/* KP cusps */}
          {kpCusps.length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-2">
                {t('advanced.kp', { defaultValue: 'KP House Cusps' })}
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-muted-foreground border-b">
                      <th className="text-left py-1.5 font-medium">H</th>
                      <th className="text-left py-1.5 font-medium">Rashi</th>
                      <th className="text-left py-1.5 font-medium">Nakshatra</th>
                      <th className="text-left py-1.5 font-medium">Sub Lord</th>
                      <th className="text-left py-1.5 font-medium">Sub-Sub</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kpCusps.map((c: any) => (
                      <tr key={c.houseNumber} className="border-b last:border-none">
                        <td className="py-1.5 font-mono">{c.houseNumber}</td>
                        <td className="py-1.5">{c.rashiName}</td>
                        <td className="py-1.5 text-muted-foreground">{c.nakshatraName}</td>
                        <td className="py-1.5 font-medium">{c.subLord}</td>
                        <td className="py-1.5 text-muted-foreground">{c.subSubLord}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Chalit */}
          {chalitPlanets.length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-2">
                {t('advanced.chalit', { defaultValue: 'Bhava Chalit' })}
              </p>
              <div className="space-y-1">
                {chalitPlanets.map((p: any) => (
                  <div
                    key={p.name}
                    className="flex items-center justify-between text-xs py-1 border-b last:border-none"
                  >
                    <span className="font-medium">{p.name}</span>
                    <span className="text-muted-foreground">
                      Rashi H{p.rashiHouse} → Chalit H{p.house}
                      {p.shifted !== 0 && (
                        <span className="ml-2 text-amber-600 dark:text-amber-400">
                          {p.shifted > 0 ? 'shifted forward' : 'shifted back'}
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
