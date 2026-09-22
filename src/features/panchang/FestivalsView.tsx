import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { OrnamentalDivider } from '@/features/report/primitives/OrnamentalDivider';
import { useActiveProfile } from '@/features/birth-profile/store';
import { festivalsAdapter, FestivalsError, type Festival } from '@/infrastructure/astrology/festivals.adapter';
import { IconPin, IconSearch } from '@/components/icons';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import type { Place } from '@/domain/geo/place';

// Fallback place when no profile exists
const DEFAULT_PLACE: Place = {
  id: 'default:kathmandu',
  label: 'Kathmandu, Nepal',
  shortLabel: 'Kathmandu',
  lat: 27.7172,
  lon: 85.324,
  timezone: 'Asia/Kathmandu',
  countryCode: 'np',
  admin1: 'Bagmati',
  placeType: 'city',
};

type Filter = 'all' | 'festival' | 'ekadashi' | 'sankranti' | 'vrat';

export function FestivalsView() {
  const { t, i18n } = useTranslation();
  const profile = useActiveProfile();
  const place: Place = profile?.place ?? DEFAULT_PLACE;

  const lang = (i18n.resolvedLanguage === 'ne'
    ? 'ne'
    : i18n.resolvedLanguage === 'hi'
      ? 'hi'
      : 'en') as 'en' | 'hi' | 'ne';

  const [monthOffset, setMonthOffset] = useState(0);
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');

  const { data, error } = useMemo(() => {
    const base = new Date();
    const target = new Date(base.getFullYear(), base.getMonth() + monthOffset, 1, 12, 0, 0);
    try {
      const map = festivalsAdapter.getForMonth(place, target.getFullYear(), target.getMonth(), lang);
      return { data: { map, year: target.getFullYear(), month: target.getMonth() }, error: null as string | null };
    } catch (e) {
      return {
        data: null,
        error:
          e instanceof FestivalsError ? e.message : t('festivals.failed', { defaultValue: 'Could not load festivals.' }),
      };
    }
  }, [place, monthOffset, lang, t]);

  if (error || !data) {
    return (
      <div className="container max-w-3xl mx-auto px-4 py-12">
        <div className="text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-lg px-3 py-2">
          {error ?? 'Could not load festivals.'}
        </div>
      </div>
    );
  }

  const { map, year, month } = data;
  const monthLabel = new Date(year, month, 1).toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric',
  });

  // Flatten for filtering / search
  const flat: Array<{ date: string; fest: Festival }> = [];
  Object.entries(map).forEach(([date, list]) => {
    list.forEach((f) => flat.push({ date, fest: f }));
  });

  const filtered = flat.filter(({ fest }) => {
    if (filter !== 'all' && fest.type !== filter) return false;
    if (query && !fest.name.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  // Stats
  const stats = {
    total: flat.length,
    ekadashis: flat.filter((x) => x.fest.type === 'ekadashi').length,
    majorFestivals: flat.filter((x) => x.fest.type === 'festival').length,
    sankrantis: flat.filter((x) => x.fest.type === 'sankranti').length,
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 md:py-12 space-y-4">
      {/* Header */}
      <div className="text-center space-y-2 py-6">
        <p className="text-[10px] uppercase tracking-[0.4em] text-primary font-semibold">
          {t('festivals.eyebrow', { defaultValue: 'Vedic Calendar' })}
        </p>
        <h1
          className="font-bold tracking-tight"
          style={{
            fontFamily: "'Crimson Pro', Georgia, serif",
            fontSize: 'clamp(2rem, 4.5vw, 3rem)',
            lineHeight: 1.1,
          }}
        >
          {t('festivals.title', { defaultValue: 'Festivals & Ekadashis' })}
        </h1>
        <p className="text-sm text-muted-foreground flex items-center justify-center gap-1.5">
          <IconPin size={11} className="text-primary/70" />
          {place.shortLabel}
          <span className="opacity-40 mx-1">·</span>
          <span className="font-mono">{place.timezone}</span>
        </p>
      </div>

      {/* Month navigation */}
      <OrnamentalDivider />
      <div className="flex items-center justify-between gap-3 max-w-3xl mx-auto">
        <button
          type="button"
          onClick={() => setMonthOffset((v) => v - 1)}
          className="text-sm text-primary hover:text-primary/80 transition-colors px-3 py-1.5 rounded-md border border-primary/30 hover:bg-primary/[0.05]"
        >
          ← {t('festivals.prev', { defaultValue: 'Prev' })}
        </button>
        <div className="text-center">
          <p
            className="text-xl font-bold"
            style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
          >
            {monthLabel}
          </p>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
            {stats.total} {t('festivals.events', { defaultValue: 'events' })} ·{' '}
            {stats.ekadashis} {t('festivals.ekadashis', { defaultValue: 'Ekadashis' })}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setMonthOffset((v) => v + 1)}
          className="text-sm text-primary hover:text-primary/80 transition-colors px-3 py-1.5 rounded-md border border-primary/30 hover:bg-primary/[0.05]"
        >
          {t('festivals.next', { defaultValue: 'Next' })} →
        </button>
      </div>

      {/* Filter strip + search */}
      <div className="max-w-3xl mx-auto space-y-3">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {(['all', 'festival', 'ekadashi', 'sankranti', 'vrat'] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                'text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-md border transition-colors font-semibold',
                filter === f
                  ? 'border-primary/60 bg-primary/10 text-primary'
                  : 'border-border/60 text-muted-foreground hover:border-primary/30'
              )}
            >
              {t(`festivals.filters.${f}`, { defaultValue: f })}
            </button>
          ))}
        </div>

        <div className="relative max-w-md mx-auto">
          <IconSearch
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('festivals.searchPlaceholder', { defaultValue: 'Search festivals...' })}
            className="pl-9 h-9 text-sm"
          />
        </div>
      </div>

      {/* List */}
      <OrnamentalDivider />
      {filtered.length === 0 ? (
        <div className="max-w-2xl mx-auto text-center py-12 text-sm text-muted-foreground border border-dashed rounded-lg">
          {t('festivals.noResults', { defaultValue: 'No festivals match your filters this month.' })}
        </div>
      ) : (
        <div className="max-w-3xl mx-auto space-y-2">
          {filtered.map(({ date, fest }, idx) => (
            <FestivalRow key={`${date}-${fest.key}-${idx}`} date={date} festival={fest} />
          ))}
        </div>
      )}
    </div>
  );
}

function FestivalRow({ date, festival }: { date: string; festival: Festival }) {
  const d = new Date(date + 'T12:00:00');
  const day = d.getDate();
  const month = d.toLocaleDateString('en-GB', { month: 'short' });
  const weekday = d.toLocaleDateString('en-GB', { weekday: 'short' });

  const tone =
    festival.type === 'ekadashi'
      ? 'border-primary/40 bg-primary/[0.04]'
      : festival.type === 'sankranti'
        ? 'border-amber-500/40 bg-amber-500/[0.04]'
        : festival.type === 'vrat'
          ? 'border-purple-500/40 bg-purple-500/[0.04]'
          : 'border-emerald-500/40 bg-emerald-500/[0.04]';

  const badge =
    festival.type === 'ekadashi'
      ? 'bg-primary/10 text-primary'
      : festival.type === 'sankranti'
        ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400'
        : festival.type === 'vrat'
          ? 'bg-purple-500/10 text-purple-700 dark:text-purple-400'
          : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400';

  return (
    <div className={cn('rounded-xl border p-4 flex items-center gap-4', tone)}>
      <div className="flex flex-col items-center justify-center min-w-[52px] shrink-0">
        <p
          className="text-2xl font-bold leading-none"
          style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
        >
          {day}
        </p>
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
          {month}
        </p>
        <p className="text-[9px] text-muted-foreground/70">{weekday}</p>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-base font-semibold leading-tight">{festival.name}</p>
        {festival.description && (
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            {festival.description}
          </p>
        )}
        {festival.associatedTithi && (
          <p className="text-[10px] text-muted-foreground mt-1 font-mono">
            Tithi: {festival.associatedTithi}
          </p>
        )}
      </div>
      <span
        className={cn(
          'text-[9px] uppercase tracking-wider px-2 py-1 rounded font-bold shrink-0',
          badge
        )}
      >
        {festival.type}
      </span>
    </div>
  );
}