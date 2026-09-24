import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'next-themes';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  IconUser,
  IconGlobe,
  IconPalette,
  IconSun,
  IconPin,
  IconClock,
} from '@/components/icons';
import {
  RotateCcw,
  Trash2,
  Sparkles,
  BookOpen,
  Upload,
  MapPin,
  Users,
  Package,
} from 'lucide-react';

import { usePalette, type PaletteName } from './palette-provider';
import { useBirthStore, useActiveProfile } from '@/features/birth-profile/store';

import { SUPPORTED_LANGS, LANG_META, type SupportedLang } from '@/i18n';
import { cn } from '@/lib/utils';
import { importAnyBackup, summarizeImport } from '@/lib/import-any';
import { CurrentLocationDialog } from './current-location-dialog';
import { useUserLocation } from '@/lib/use-user-location';

const PALETTE_OPTIONS: { value: PaletteName; label: string; swatch: string }[] = [
  { value: 'amber',  label: 'Amber',  swatch: 'hsl(32 95% 44%)' },
  { value: 'violet', label: 'Violet', swatch: 'hsl(262 83% 58%)' },
  { value: 'green',  label: 'Green',  swatch: 'hsl(142 76% 36%)' },
  { value: 'rose',   label: 'Rose',   swatch: 'hsl(346 77% 50%)' },
  { value: 'slate',  label: 'Slate',  swatch: 'hsl(215 25% 27%)' },
];

export function UserMenu() {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();
  const { palette, setPalette } = usePalette();
  const profile = useActiveProfile();
  const clearAll = useBirthStore((s) => s.clearAll);
  const navigate = useNavigate();
  const userLocation = useUserLocation();
  const [locationOpen, setLocationOpen] = useState(false);

  const currentLang = (i18n.resolvedLanguage ?? 'en') as SupportedLang;
  const initial = profile?.profileName?.trim().charAt(0).toUpperCase() ?? null;

  const handleChangeBirthDetails = () => {
    clearAll();
    navigate('/chart');
    toast.success(
      t('userMenu.changedBirthDetails', { defaultValue: 'Enter new birth details.' })
    );
  };

  const handleClearProfile = () => {
    clearAll();
    navigate('/chart');
    toast.success(
      t('userMenu.profileCleared', { defaultValue: 'Profile cleared.' })
    );
  };

  const handleImportData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json,.json';
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      try {
        const result = await importAnyBackup(file);
        toast.success('Imported: ' + summarizeImport(result), { duration: 6000 });
        setTimeout(() => window.location.reload(), 1200);
      } catch (e) {
        toast.error((e as Error).message ?? 'Import failed.');
      }
    };
    input.click();
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-9 px-2 gap-2 rounded-full hover:bg-accent no-print"
            title={
              profile?.profileName ??
              t('userMenu.settings', { defaultValue: 'Settings' })
            }
          >
            <span
              className={cn(
                'inline-flex items-center justify-center shrink-0 rounded-full',
                'w-7 h-7 border text-[11px] font-semibold'
              )}
              style={{
                background: 'hsl(var(--primary) / 0.08)',
                borderColor: 'hsl(var(--primary) / 0.35)',
                color: 'hsl(var(--primary))',
                fontFamily: "'Cormorant Garamond', Georgia, serif",
              }}
            >
              {initial ?? <IconUser size={13} />}
            </span>

            {profile && (
              <span className="hidden md:inline text-xs font-medium text-foreground max-w-[100px] truncate">
                {profile.profileName.split(' ')[0]}
              </span>
            )}

            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              className="opacity-50 shrink-0"
              aria-hidden="true"
            >
              <path d="M2 4 L5 7 L8 4" stroke="currentColor" strokeWidth="1.2" fill="none" />
            </svg>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-64">
          {profile && (
            <>
              <div className="px-3 py-3">
                <p
                  className="text-sm font-semibold leading-tight truncate"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {profile.profileName}
                </p>
                <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-1 truncate">
                  <IconPin size={10} className="shrink-0 opacity-60" />
                  <span className="truncate">{profile.place.shortLabel}</span>
                </p>
                <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5 truncate">
                  <IconClock size={9} className="shrink-0 opacity-50" />
                  <span className="font-mono truncate">{profile.place.timezone}</span>
                </p>
              </div>
              <DropdownMenuSeparator />
            </>
          )}

          {profile && (
            <>
              <DropdownMenuItem
                onClick={() => navigate('/reading')}
                className="gap-2.5 text-xs"
              >
                <BookOpen size={14} className="opacity-70" />
                {t('userMenu.yourReading', { defaultValue: 'Your Vedic Reading' })}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigate('/ai-settings')}
                className="gap-2.5 text-xs"
              >
                <Sparkles size={14} className="opacity-70" />
                {t('userMenu.aiSettings', { defaultValue: 'AI Settings' })}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}

          {profile && (
            <DropdownMenuItem
              onClick={handleChangeBirthDetails}
              className="gap-2.5 text-xs"
            >
              <RotateCcw size={14} className="opacity-70" />
              {t('userMenu.changeBirth', { defaultValue: 'Change Birth Details' })}
            </DropdownMenuItem>
          )}

          <DropdownMenuItem
            onClick={() => setLocationOpen(true)}
            className="gap-2.5 text-xs"
          >
            <MapPin size={14} className="opacity-70" />
            <span className="flex-1">
              {t('userMenu.currentLocation', { defaultValue: 'Current Location' })}
            </span>
            <span className="text-[10px] text-muted-foreground truncate max-w-[80px]">
              {userLocation.shortLabel}
            </span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => navigate('/profiles')}
            className="gap-2.5 text-xs"
          >
            <Users size={14} className="opacity-70" />
            {t('userMenu.manageProfiles', { defaultValue: 'Manage Profiles' })}
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => navigate('/export')}
            className="gap-2.5 text-xs"
          >
            <Package size={14} className="opacity-70" />
            {t('userMenu.exportChart', { defaultValue: 'Export & Report' })}
          </DropdownMenuItem>

          <DropdownMenuItem onClick={handleImportData} className="gap-2.5 text-xs">
            <Upload size={14} className="opacity-70" />
            {t('userMenu.importData', { defaultValue: 'Import' })}
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="gap-2.5 text-xs">
              <IconGlobe size={14} className="opacity-70" />
              <span className="flex-1">
                {t('settings.language', { defaultValue: 'Language' })}
              </span>
              <span className="text-[10px] text-muted-foreground mr-1">
                {LANG_META[currentLang]?.native}
              </span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="w-48">
              <DropdownMenuRadioGroup
                value={currentLang}
                onValueChange={(v) => i18n.changeLanguage(v as SupportedLang)}
              >
                {SUPPORTED_LANGS.map((lng) => (
                  <DropdownMenuRadioItem key={lng} value={lng} className="gap-2 text-xs">
                    {LANG_META[lng].native}
                    <span className="ml-auto text-[10px] text-muted-foreground">
                      {LANG_META[lng].label}
                    </span>
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="gap-2.5 text-xs">
              <IconPalette size={14} className="opacity-70" />
              <span className="flex-1">
                {t('settings.palette', { defaultValue: 'Color Palette' })}
              </span>
              <span className="text-[10px] text-muted-foreground capitalize mr-1">
                {palette}
              </span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="w-48">
              <DropdownMenuRadioGroup
                value={palette}
                onValueChange={(v) => setPalette(v as PaletteName)}
              >
                {PALETTE_OPTIONS.map((p) => (
                  <DropdownMenuRadioItem
                    key={p.value}
                    value={p.value}
                    className="gap-2 text-xs"
                  >
                    <span
                      className="w-3 h-3 rounded-full border shrink-0"
                      style={{ background: p.swatch }}
                    />
                    <span className="capitalize">{p.label}</span>
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="gap-2.5 text-xs">
              <IconSun size={14} className="opacity-70" />
              <span className="flex-1">
                {t('settings.theme', { defaultValue: 'Theme' })}
              </span>
              <span className="text-[10px] text-muted-foreground capitalize mr-1">
                {theme ?? 'system'}
              </span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="w-40">
              <DropdownMenuRadioGroup
                value={theme ?? 'system'}
                onValueChange={setTheme}
              >
                {(['light', 'dark', 'system'] as const).map((mode) => (
                  <DropdownMenuRadioItem
                    key={mode}
                    value={mode}
                    className="gap-2 text-xs capitalize"
                  >
                    {t('settings.' + mode, { defaultValue: mode })}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          {profile && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleClearProfile}
                className="gap-2.5 text-xs text-destructive focus:text-destructive"
              >
                <Trash2 size={14} className="opacity-80" />
                {t('userMenu.clearProfile', { defaultValue: 'Clear Profile' })}
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <CurrentLocationDialog
        open={locationOpen}
        onOpenChange={setLocationOpen}
      />
    </>
  );
}