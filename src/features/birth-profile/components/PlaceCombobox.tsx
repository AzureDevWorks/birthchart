import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { IconCheck, IconChevronsUpDown, IconLoader } from '@/components/icons';
import { cn } from '@/lib/utils';
import { usePlaceSearch } from '../hooks/usePlaceSearch';
import { photonGeocoder } from '@/infrastructure/geo/photon.geocoder';
import { resolveTimezone } from '@/infrastructure/geo/tz.resolver';
import type { Place } from '@/domain/geo/place';
import type { PlaceSearchResult } from '@/domain/geo/port';

interface Props {
  value: Place | null;
  onChange: (place: Place | null) => void;
}

export function PlaceCombobox({ value, onChange }: Props) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const search = usePlaceSearch(photonGeocoder, query);

  const handleSelect = (r: PlaceSearchResult) => {
    const { timezone } = resolveTimezone(r.lat, r.lon);
    onChange({ ...r, timezone });
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-normal"
        >
          {value ? (
            <span className="truncate">{value.shortLabel}</span>
          ) : (
            <span className="text-muted-foreground">{t('birth.cityPlaceholder')}</span>
          )}
          <IconChevronsUpDown size={16} className="ml-2 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={t('birth.cityPlaceholder')}
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            {search.status === 'loading' && (
              <div className="flex items-center gap-2 px-3 py-6 text-sm text-muted-foreground">
                <IconLoader size={14} className="animate-spin" />
                {t('common.searching')}
              </div>
            )}
            {search.status === 'empty' && (
              <CommandEmpty>{t('common.noResults', { query: query.trim() })}</CommandEmpty>
            )}
            {search.status === 'error' && (
              <CommandEmpty>{t('common.searchFailed')}</CommandEmpty>
            )}
            {search.status === 'success' && (
              <CommandGroup heading="Cities">
                {search.results.map((r) => (
                  <CommandItem
                    key={r.id}
                    value={r.id}
                    onSelect={() => handleSelect(r)}
                    className="gap-2"
                  >
                    <IconCheck
                      size={14}
                      className={cn(value?.id === r.id ? 'opacity-100' : 'opacity-0')}
                    />
                    <div className="flex flex-col">
                      <span className="text-sm">{r.shortLabel}</span>
                      <span className="text-xs text-muted-foreground">{r.label}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
