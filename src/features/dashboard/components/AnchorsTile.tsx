import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { TileShell } from './TileShell';
import { rashiImageUrl } from '@/features/report/lib/rashi-images';
import { RASHI_GLYPHS } from '@/features/report/lib/glyphs';

interface AnchorsTileProps {
  kundli: any;
}

export function AnchorsTile({ kundli }: AnchorsTileProps) {
  const { t } = useTranslation();

  const items = [
    {
      key: 'lagna',
      rashi: kundli.ascendant?.rashiName ?? '—',
      nakshatra: kundli.ascendant?.nakshatra,
      degree: kundli.ascendant?.degree,
      label: t('hero.lagnaRashi', { defaultValue: 'Lagna' }),
      role: t('hero.lagnaSub', { defaultValue: 'Ascendant · Body' }),
    },
    {
      key: 'chandra',
      rashi: kundli.planets?.Moon?.rashiName ?? '—',
      nakshatra: kundli.planets?.Moon?.nakshatra,
      degree: kundli.planets?.Moon?.degree,
      label: t('hero.chandraRashi', { defaultValue: 'Chandra' }),
      role: t('hero.chandraSub', { defaultValue: 'Moon · Mind' }),
    },
    {
      key: 'surya',
      rashi: kundli.planets?.Sun?.rashiName ?? '—',
      nakshatra: kundli.planets?.Sun?.nakshatra,
      degree: kundli.planets?.Sun?.degree,
      label: t('hero.suryaRashi', { defaultValue: 'Surya' }),
      role: t('hero.suryaSub', { defaultValue: 'Sun · Soul' }),
    },
  ];

  return (
    <TileShell
      icon={<Sparkles size={13} />}
      eyebrow={t('dashboard.anchorsTitle', { defaultValue: 'Your Anchors' })}
      href="/chart"
    >
      <div className="grid grid-cols-3 divide-x" style={{ borderColor: 'hsl(38 55% 48% / 0.15)' }}>
        {items.map((item) => (
          <div key={item.key} className="flex flex-col items-center text-center px-2 first:pl-0 last:pr-0">
            <RashiMedallionSmall rashi={item.rashi} />
            <p
              className="mt-3 text-lg font-bold leading-none text-foreground"
              style={{ fontFamily: "'Crimson Pro', 'Cormorant Garamond', Georgia, serif" }}
            >
              {item.rashi}
            </p>
            <p className="mt-1.5 text-[9px] uppercase tracking-[0.2em] text-primary/75 font-semibold">
              {item.label}
            </p>
            {item.nakshatra && (
              <p className="mt-1 text-[10px] text-muted-foreground leading-tight">
                {item.nakshatra}
                {typeof item.degree === 'number' && ` · ${item.degree}°`}
              </p>
            )}
          </div>
        ))}
      </div>
    </TileShell>
  );
}

function RashiMedallionSmall({ rashi }: { rashi: string }) {
  const [failed, setFailed] = useState(false);
  const url = rashiImageUrl(rashi);
  const showImage = Boolean(url) && !failed;

  return (
    <span
      className="relative inline-flex shrink-0 overflow-hidden rounded-full"
      style={{
        width: 56,
        height: 56,
        background: 'hsl(42 55% 97%)',
        border: '1.5px solid hsl(38 55% 48% / 0.4)',
        boxShadow:
          '0 0 0 3px hsl(42 55% 98%), 0 0 0 4px hsl(38 55% 48% / 0.18)',
      }}
    >
      {showImage ? (
        <img
          src={url!}
          alt={rashi}
          draggable={false}
          onError={() => setFailed(true)}
          className="w-full h-full object-cover"
        />
      ) : (
        <span
          className="w-full h-full flex items-center justify-center"
          style={{
            fontFamily: "'Noto Serif Devanagari', serif",
            fontSize: 24,
            color: 'hsl(30 45% 38%)',
          }}
        >
          {RASHI_GLYPHS[rashi] ?? '·'}
        </span>
      )}
    </span>
  );
}