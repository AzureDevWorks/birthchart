import { Button } from '@/components/ui/button';
import { useChartStyleStore } from '../lib/useChartStyle';
import type { ChartStyle } from '../types';

interface ChartStyleToggleProps {
  value?: ChartStyle;
  onChange?: (style: ChartStyle) => void;
}

export function ChartStyleToggle({ value, onChange }: ChartStyleToggleProps) {
  const { style, setStyle } = useChartStyleStore();
  const current = value ?? style;

  const handleChange = (next: ChartStyle) => {
    if (onChange) onChange(next);
    setStyle(next);
  };

  return (
    <div className="flex items-center gap-0.5 p-0.5 rounded-md border bg-muted/40 w-fit no-print">
      <Button
        type="button"
        variant={current === 'north' ? 'default' : 'ghost'}
        size="sm"
        className="h-6 px-2 text-[11px]"
        onClick={() => handleChange('north')}
      >
        N
      </Button>
      <Button
        type="button"
        variant={current === 'south' ? 'default' : 'ghost'}
        size="sm"
        className="h-6 px-2 text-[11px]"
        onClick={() => handleChange('south')}
      >
        S
      </Button>
    </div>
  );
}
