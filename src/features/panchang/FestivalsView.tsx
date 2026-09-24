import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { OrnamentalDivider } from '@/features/report/primitives/OrnamentalDivider';
import {
  festivalsAdapter,
  FestivalsError,
  type Festival,
} from '@/infrastructure/astrology/festivals.adapter';
import { IconPin, IconSearch } from '@/components/icons';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { MANUSCRIPT as C, MANUSCRIPT_ALPHA as CA } from '@/features/report/lib/manuscript-colors';
import type { Place } from '@/domain/geo/place';
import { useUserLocation } from '@/lib/use-user-location';

// Auto-detected on load — see src/lib/user-location.ts
// Reactive current location.

type Filter = 'all' | 'festival' | 'ekadashi' | 'sankranti' | 'vrat';

export function FestivalsView() {  const userLocation = useUserLocation();

  const { t, i18n } = useTranslation();
  const place: Place = userLocation;

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
      const map = festivalsAdapter.getForMonth(
        place,
        target.getFullYear(),
        target.getMonth(),
        lang
      );
      return {
        data: { map, year: target.getFullYear(), month: target.getMonth() },
        error: null as string | null,
      };
    } catch (e) {
      return {
        data: null,
        error:
          e instanceof FestivalsError
            ? e.message
            : t('festivals.failed', { defaultValue: 'Could not load festivals.' }),
      };
    }
  }, [place, monthOffset, lang, t]);

  if (error || !data) {
    return (
      <div className="container max-w-3xl mx-auto px-4 py-12">
        <div
          className="text-sm rounded-lg px-3 py-2"
          style={{
            color: C.vermilion,
            background: CA.vermilion(0.06),
            border: `1px solid ${CA.vermilion(0.3)}`,
          }}
        >
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

  const flat: Array<{ date: string; fest: Festival }> = [];
  Object.entries(map).forEach(([date, list]) => {
    list.forEach((f) => flat.push({ date, fest: f }));
  });

  const filtered = flat.filter(({ fest }) => {
    if (filter !== 'all' && fest.type !== filter) return false;
    if (query && !fest.name.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const stats = {
    total: flat.length,
    ekadashis: flat.filter((x) => x.fest.type === 'ekadashi').length,
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 md:py-12 space-y-4">
      {/* Header */}
      <div className="text-center space-y-2 py-6">
        <p
          className="text-[10px] uppercase tracking-[0.4em] font-semibold"
          style={{ color: C.gold, fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          {t('festivals.eyebrow', { defaultValue: 'Vedic Calendar' })}
        </p>
        <h1
          className="font-bold tracking-tight"
          style={{
            fontFamily: "'Cormorant Garamond', 'Crimson Pro', Georgia, serif",
            fontSize: 'clamp(2rem, 4.5vw, 3rem)',
            lineHeight: 1.1,
            color: C.brown,
          }}
        >
          {t('festivals.title', { defaultValue: 'Festivals & Ekadashis' })}
        </h1>
        <p
          className="text-sm flex items-center justify-center gap-1.5"
          style={{ color: C.brownSoft }}
        >
          <IconPin size={11} style={{ color: C.gold }} />
          {place.shortLabel}
          <span className="opacity-40 mx-1">·</span>
          <span className="font-mono">{place.timezone}</span>
        </p>
      </div>

      <OrnamentalDivider />

      {/* Month navigation */}
      <div className="flex items-center justify-between gap-3 max-w-3xl mx-auto">
        <button
          type="button"
          onClick={() => setMonthOffset((v) => v - 1)}
          className="text-sm transition-colors px-3 py-1.5 rounded-md"
          style={{
            color: C.gold,
            border: `1px solid ${CA.gold(0.3)}`,
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          ← {t('festivals.prev', { defaultValue: 'Prev' })}
        </button>
        <div className="text-center">
          <p
            className="text-xl font-bold"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: C.brown }}
          >
            {monthLabel}
          </p>
          <p
            className="text-[10px] uppercase tracking-wider"
            style={{ color: C.brownSoft, fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            {stats.total} {t('festivals.events', { defaultValue: 'events' })} ·{' '}
            {stats.ekadashis} {t('festivals.ekadashis', { defaultValue: 'Ekadashis' })}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setMonthOffset((v) => v + 1)}
          className="text-sm transition-colors px-3 py-1.5 rounded-md"
          style={{
            color: C.gold,
            border: `1px solid ${CA.gold(0.3)}`,
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          {t('festivals.next', { defaultValue: 'Next' })} →
        </button>
      </div>

      {/* Filters + search */}
      <div className="max-w-3xl mx-auto space-y-3">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {(['all', 'festival', 'ekadashi', 'sankranti', 'vrat'] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                'text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-md font-semibold transition-colors'
              )}
              style={{
                border: `1px solid ${filter === f ? CA.gold(0.6) : CA.goldSoft(0.3)}`,
                background: filter === f ? CA.gold(0.1) : 'transparent',
                color: filter === f ? C.gold : C.brownSoft,
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              {t(`festivals.filters.${f}`, { defaultValue: f })}
            </button>
          ))}
        </div>

        <div className="relative max-w-md mx-auto">
          <IconSearch
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: C.brownSoft }}
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

      <OrnamentalDivider />

      {/* List */}
      {filtered.length === 0 ? (
        <div
          className="max-w-2xl mx-auto text-center py-12 text-sm rounded-lg"
          style={{ color: C.brownSoft, border: `1px dashed ${CA.goldSoft(0.4)}` }}
        >
          {t('festivals.noResults', {
            defaultValue: 'No festivals match your filters this month.',
          })}
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

  const typeKey = (() => {
    if (festival.type === 'ekadashi') return 'primary';
    if (festival.type === 'sankranti') return 'amber';
    if (festival.type === 'vrat') return 'purple';
    return 'emerald';
  })();

  const palette = {
    primary: { border: CA.gold(0.4),              bg: CA.gold(0.04),                  accent: C.gold },
    amber:   { border: 'hsl(38 55% 48% / 0.4)',   bg: 'hsl(38 55% 48% / 0.04)',       accent: 'hsl(38 55% 38%)' },
    purple:  { border: 'hsl(262 38% 54% / 0.4)',  bg: 'hsl(262 38% 54% / 0.04)',      accent: 'hsl(262 38% 44%)' },
    emerald: { border: 'hsl(150 45% 42% / 0.4)',  bg: 'hsl(150 45% 42% / 0.04)',      accent: 'hsl(150 45% 32%)' },
  }[typeKey];

  return (
    <div
      className="rounded-xl p-4 flex items-center gap-4"
      style={{ border: `1px solid ${palette.border}`, background: palette.bg }}
    >
      <div className="flex flex-col items-center justify-center min-w-[52px] shrink-0">
        <p
          className="text-2xl font-bold leading-none"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: C.brown }}
        >
          {day}
        </p>
        <p
          className="text-[10px] uppercase tracking-wider mt-1"
          style={{ color: C.brownSoft, fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          {month}
        </p>
        <p className="text-[9px]" style={{ color: C.brownSoft }}>
          {weekday}
        </p>
      </div>
      <div className="flex-1 min-w-0">
        <p
          className="text-base font-semibold leading-tight"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: C.brown }}
        >
          {festival.name}
        </p>
        {festival.description && (
          <p
            className="text-xs mt-1 leading-relaxed"
            style={{ color: C.brownSoft, fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {festival.description}
          </p>
        )}
        {festival.associatedTithi && (
          <p
            className="text-[10px] mt-1 font-mono"
            style={{ color: C.brownSoft }}
          >
            {festival.associatedTithi}
            {festival.associatedMasa && ` · ${festival.associatedMasa}`}
          </p>
        )}
      </div>
      <span
        className="text-[9px] uppercase tracking-wider px-2 py-1 rounded font-bold shrink-0"
        style={{ background: palette.bg, color: palette.accent, border: `1px solid ${palette.border}` }}
      >
        {festival.type}
      </span>
    </div>
  );
}