import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IconPalette, IconCheck } from '@/components/icons';
import { usePalette, type PaletteName } from './palette-provider';
import { useTranslation } from 'react-i18next';

const PALETTES: { value: PaletteName; swatch: string }[] = [
  { value: 'amber', swatch: 'hsl(32 95% 44%)' },
  { value: 'violet', swatch: 'hsl(262 83% 58%)' },
  { value: 'green', swatch: 'hsl(142 76% 36%)' },
  { value: 'rose', swatch: 'hsl(346 77% 50%)' },
  { value: 'slate', swatch: 'hsl(215 25% 27%)' },
];

export function PaletteSwitcher() {
  const { palette, setPalette } = usePalette();
  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" title={t('settings.palette')}>
          <IconPalette size={18} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {PALETTES.map((p) => (
          <DropdownMenuItem
            key={p.value}
            onClick={() => setPalette(p.value)}
            className="gap-2"
          >
            <IconCheck size={14} className={palette === p.value ? 'opacity-100' : 'opacity-0'} />
            <span className="w-4 h-4 rounded-full border" style={{ backgroundColor: p.swatch }} />
            <span className="capitalize">{p.value}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
