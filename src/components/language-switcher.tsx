import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IconGlobe, IconCheck } from '@/components/icons';
import { SUPPORTED_LANGS, LANG_META, type SupportedLang } from '@/i18n';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = (i18n.resolvedLanguage ?? 'en') as SupportedLang;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <IconGlobe size={16} />
          <span className="hidden sm:inline">{LANG_META[current]?.native ?? 'English'}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {SUPPORTED_LANGS.map((lng) => (
          <DropdownMenuItem
            key={lng}
            onClick={() => i18n.changeLanguage(lng)}
            className="gap-2"
          >
            <IconCheck size={14} className={current === lng ? 'opacity-100' : 'opacity-0'} />
            <span>{LANG_META[lng].native}</span>
            <span className="ml-auto text-xs text-muted-foreground">{LANG_META[lng].label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
