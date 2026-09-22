import { BaseChart } from './BaseChart';
import { ChartStyleToggle } from './ChartStyleToggle';
import { useChartStyleStore } from '../lib/useChartStyle';
import { useTranslation } from 'react-i18next';
import type { ChartStyle, ChartHouse } from '../types';

interface VedicChartProps {
  size?: number;
  defaultStyle?: ChartStyle;
  style?: ChartStyle;       // ← NEW: explicit style (overrides global)
  houses?: ChartHouse[];
  label?: string;
  caption?: string;
  className?: string;
  hideToggle?: boolean;
  lang?: 'en' | 'hi' | 'ne';
}

export function VedicChart({
  size = 320,
  defaultStyle = 'north',
  style: styleProp,
  houses,
  label,
  caption,
  className,
  hideToggle = false,
  lang,
}: VedicChartProps) {
  const { style: globalStyle, setStyle } = useChartStyleStore();
  const { i18n } = useTranslation();

  const resolvedLang = lang ?? ((i18n.resolvedLanguage === 'ne'
    ? 'ne'
    : i18n.resolvedLanguage === 'hi'
      ? 'hi'
      : 'en') as 'en' | 'hi' | 'ne');

  // Priority: explicit prop > global store > default
  const activeStyle = styleProp ?? globalStyle ?? defaultStyle;

  return (
    <div className={`space-y-2 ${className ?? ''}`}>
      <div className="flex items-center justify-between gap-2 flex-wrap">
        {label && <p className="text-sm font-semibold">{label}</p>}
        {!hideToggle && (
          <ChartStyleToggle value={activeStyle} onChange={setStyle} />
        )}
      </div>

      <div className="flex justify-center">
        <div className="w-full" style={{ maxWidth: `${size}px` }}>
          <BaseChart
            style={activeStyle}
            size={size}
            houses={houses}
            lang={resolvedLang}
          />
        </div>
      </div>

      {caption && (
        <p className="text-xs text-muted-foreground text-center">{caption}</p>
      )}
    </div>
  );
}
