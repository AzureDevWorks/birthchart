import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IconSun, IconMoon, IconCheck } from '@/components/icons';
import { useTranslation } from 'react-i18next';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <IconSun size={18} className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <IconMoon size={18} className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {(['light', 'dark', 'system'] as const).map((mode) => (
          <DropdownMenuItem key={mode} onClick={() => setTheme(mode)} className="gap-2">
            <IconCheck size={14} className={theme === mode ? 'opacity-100' : 'opacity-0'} />
            <span>{t(`settings.${mode}`)}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
