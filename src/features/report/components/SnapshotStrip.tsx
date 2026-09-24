import { useTranslation } from 'react-i18next';
import { SnapshotTile } from './SnapshotTile';

function formatDegreeShort(deg?: number, min?: number): string {
  const d = deg ?? 0;
  const m = min ?? 0;
  return `${d}\u00B0${String(m).padStart(2, '0')}\u2032`;
}

interface SnapshotStripProps {
  kundli: Record<string, any>;
}

export function SnapshotStrip({ kundli }: SnapshotStripProps) {
  const { t } = useTranslation();

  const asc = kundli.ascendant ?? {};
  const moon = kundli.planets?.Moon ?? {};
  const dasha = kundli.dasha?.currentMahadasha;
  const antar = kundli.dasha?.currentAntar;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      <SnapshotTile
        label={t('report.snapshot.lagna', { defaultValue: 'Lagna' })}
        value={asc.rashiName ?? '-'}
        subtitle={`${formatDegreeShort(asc.degree, asc.minute)}  ${asc.nakshatra ?? ''} ${asc.pada ?? ''}`}
        accent
      />
      <SnapshotTile
        label={t('report.snapshot.chandra', { defaultValue: 'Chandra' })}
        value={moon.rashiName ?? '-'}
        subtitle={`${formatDegreeShort(moon.degree, moon.minute)}  ${moon.nakshatra ?? ''} ${moon.pada ?? ''}`}
      />
      <SnapshotTile
        label={t('report.snapshot.nakshatra', { defaultValue: 'Nakshatra' })}
        value={asc.nakshatra ?? '-'}
        subtitle={
          asc.nakshatraLord
            ? `Pada ${asc.pada ?? 1}  Lord: ${asc.nakshatraLord}`
            : undefined
        }
      />
      {dasha ? (
        <SnapshotTile
          label={t('report.snapshot.currentDasha', { defaultValue: 'Current Dasha' })}
          value={String(dasha.planet ?? '-')}
          subtitle={antar ? `Antar: ${antar.planet}` : undefined}
          progress={dasha.progressPercent}
        />
      ) : (
        <SnapshotTile
          label={t('report.snapshot.currentDasha', { defaultValue: 'Current Dasha' })}
          value="-"
        />
      )}
    </div>
  );
}
