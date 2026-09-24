import { useMemo, useState } from 'react';
import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';
import { Section } from '@/features/report/primitives/Section';
import { OrnamentalDivider } from '@/features/report/primitives/OrnamentalDivider';
import { PlaceCombobox } from '@/features/birth-profile/components/PlaceCombobox';
import {
  calculateNowPanchang,
  PanchangError,
  type PanchangData,
  type PanchangPeriod,
} from '@/infrastructure/astrology/panchang.adapter';
import {
  IconSun,
  IconMoon,
  IconPin,
} from '@/components/icons';
import type { Place } from '@/domain/geo/place';
import { useUserLocation } from '@/lib/use-user-location';

// ─── Fallback place when there's no active profile ──────────
// Auto-detected on load — see src/lib/user-location.ts
// Reactive current location — falls back to auto-detect.

export function DailyPanchangContent() {  const userLocation = useUserLocation();

  const { t } = useTranslation();
  const [override, setOverride] = useState<Place | null>(null);
  const [changing, setChanging] = useState(false);

  const place: Place = override ?? userLocation;

  const { panchang, error } = useMemo(() => {
    try {
      return {
        panchang: calculateNowPanchang(place),
        error: null as string | null,
      };
    } catch (e) {
      return {
        panchang: null as PanchangData | null,
        error:
          e instanceof PanchangError
            ? e.message
            : t('panchang.failed', { defaultValue: 'Panchang calculation failed.' }),
      };
    }
  }, [place, t]);

  if (error || !panchang) {
    return (
      <div className="container max-w-3xl mx-auto px-4 py-12">
        <div className="text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-lg px-3 py-2">
          {error ?? t('panchang.failed', { defaultValue: 'Panchang calculation failed.' })}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 md:py-12 space-y-4">
      {/* ─── Header ──────────────────────────────────────── */}
      <div className="text-center space-y-3 py-6">
        <p className="text-[10px] uppercase tracking-[0.4em] text-primary font-semibold">
          {t('panchang.eyebrow', { defaultValue: 'Vedic Calendar' })}
        </p>
        <h1
          className="font-bold tracking-tight"
          style={{
            fontFamily: "'Crimson Pro', Georgia, serif",
            fontSize: 'clamp(2rem, 4.5vw, 3rem)',
            lineHeight: 1.1,
          }}
        >
          {t('panchang.title', { defaultValue: 'Daily Panchang' })}
        </h1>
        <p className="text-sm text-muted-foreground">
          {panchang.instant.toFormat('cccc, dd LLLL yyyy')}
        </p>
        <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <IconPin size={11} className="text-primary/70" />
          {place.shortLabel}
          <span className="opacity-40 mx-1">{'\u00b7'}</span>
          <span className="font-mono">{place.timezone}</span>
        </div>
        {!changing && (
          <button
            type="button"
            onClick={() => setChanging(true)}
            className="text-[11px] uppercase tracking-wider text-primary/70 hover:text-primary underline-offset-4 hover:underline no-print"
          >
            {t('common.change', { defaultValue: 'Change location' })}
          </button>
        )}
      </div>

      {changing && (
        <div className="max-w-lg mx-auto space-y-3">
          <PlaceCombobox
            value={null}
            onChange={(p) => {
              if (p) setOverride(p);
              setChanging(false);
            }}
          />
          {override && (
            <button
              type="button"
              onClick={() => {
                setOverride(null);
                setChanging(false);
              }}
              className="text-[11px] text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
            >
              {t('panchang.resetToProfile', {
                defaultValue: 'Reset to profile location',
              })}
            </button>
          )}
        </div>
      )}

      {/* ─── Vedic calendar line ─────────────────────────── */}
      <CalendarMetadataLine panchang={panchang} />

      {/* ─── Sun & Moon ──────────────────────────────────── */}
      <OrnamentalDivider />
      <Section
        eyebrow={t('panchang.sunEyebrow', { defaultValue: 'Sun & Moon' })}
        title={t('panchang.sunTitle', { defaultValue: 'Rise & Set' })}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <TimeTile
            icon={<IconSun size={16} />}
            label={t('panchang.sunrise', { defaultValue: 'Sunrise' })}
            dt={panchang.sunrise}
          />
          <TimeTile
            icon={<IconMoon size={16} />}
            label={t('panchang.sunset', { defaultValue: 'Sunset' })}
            dt={panchang.sunset}
          />
          <TimeTile
            icon={<IconMoon size={16} />}
            label={t('panchang.moonrise', { defaultValue: 'Moonrise' })}
            dt={panchang.moonrise}
          />
          <TimeTile
            icon={<IconMoon size={16} />}
            label={t('panchang.moonset', { defaultValue: 'Moonset' })}
            dt={panchang.moonset}
          />
        </div>
      </Section>

      {/* ─── Five limbs ──────────────────────────────────── */}
      <OrnamentalDivider />
      <Section
        eyebrow={t('panchang.limbsEyebrow', { defaultValue: 'The Five Limbs' })}
        title={t('panchang.limbsTitle', { defaultValue: 'Panchangam' })}
        hint={t('panchang.limbsHint', {
          defaultValue:
            'Tithi, Nakshatra, Yoga, Karana, and Vara — the five limbs of the Vedic day.',
        })}
      >
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <LimbTile
            label={t('panchang.limbs.tithi', { defaultValue: 'Tithi' })}
            value={panchang.tithi.name}
            sub={panchang.paksha}
          />
          <LimbTile
            label={t('panchang.limbs.nakshatra', { defaultValue: 'Nakshatra' })}
            value={panchang.nakshatra.name}
            sub={
              panchang.nakshatra.pada
                ? `Pada ${panchang.nakshatra.pada} \u00b7 ${panchang.nakshatra.lord}`
                : panchang.nakshatra.lord
            }
          />
          <LimbTile
            label={t('panchang.limbs.yoga', { defaultValue: 'Yoga' })}
            value={panchang.yoga.name}
          />
          <LimbTile
            label={t('panchang.limbs.karana', { defaultValue: 'Karana' })}
            value={panchang.karana.name}
          />
          <LimbTile
            label={t('panchang.limbs.vara', { defaultValue: 'Vara' })}
            value={panchang.vara.name}
          />
        </div>
      </Section>

      {/* ─── Auspicious windows ──────────────────────────── */}
      <OrnamentalDivider />
      <Section
        eyebrow={t('panchang.auspiciousEyebrow', { defaultValue: 'Shubha' })}
        title={t('panchang.auspiciousTitle', { defaultValue: 'Auspicious Windows' })}
        hint={t('panchang.auspiciousHint', {
          defaultValue:
            'Brahma Muhurta for pre-dawn practice, Abhijit for midday beginnings, Amrit Kalam for anything sacred.',
        })}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <PeriodTile
            tone="positive"
            label={t('panchang.brahmaMuhurta', { defaultValue: 'Brahma Muhurta' })}
            period={panchang.brahmaMuhurta}
            hint={t('panchang.brahmaHint', { defaultValue: 'Pre-dawn \u00b7 practice' })}
          />
          <PeriodTile
            tone="positive"
            label={t('panchang.abhijitMuhurta', { defaultValue: 'Abhijit Muhurta' })}
            period={panchang.abhijitMuhurta}
            hint={t('panchang.abhijitHint', { defaultValue: 'Midday \u00b7 beginnings' })}
          />
          {panchang.amritKalam.length > 0 && (
            <PeriodTile
              tone="positive"
              label={t('panchang.amritKalam', { defaultValue: 'Amrit Kalam' })}
              period={panchang.amritKalam[0]}
              hint={t('panchang.amritHint', { defaultValue: 'Nectar \u00b7 sacred acts' })}
            />
          )}
        </div>
      </Section>

      {/* ─── Inauspicious windows ────────────────────────── */}
      <OrnamentalDivider />
      <Section
        eyebrow={t('panchang.inauspiciousEyebrow', { defaultValue: 'Ashubha' })}
        title={t('panchang.inauspiciousTitle', { defaultValue: 'Windows to Avoid' })}
        hint={t('panchang.inauspiciousHint', {
          defaultValue:
            'Rahu Kalam, Yamaganda, and Gulika — the three daily inauspicious periods.',
        })}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <PeriodTile
            tone="negative"
            label={t('panchang.rahuKalam', { defaultValue: 'Rahu Kalam' })}
            period={panchang.rahuKalam}
            hint={t('panchang.rahuHint', { defaultValue: 'Avoid new ventures' })}
          />
          <PeriodTile
            tone="negative"
            label={t('panchang.yamaganda', { defaultValue: 'Yamaganda' })}
            period={panchang.yamagandaKalam}
            hint={t('panchang.yamagandaHint', { defaultValue: 'Avoid travel' })}
          />
          <PeriodTile
            tone="negative"
            label={t('panchang.gulika', { defaultValue: 'Gulika Kalam' })}
            period={panchang.gulikaKalam}
            hint={t('panchang.gulikaHint', { defaultValue: 'Avoid auspicious acts' })}
          />
        </div>
      </Section>

      {/* ─── Choghadiya ──────────────────────────────────── */}
      {(panchang.choghadiya.day.length > 0 ||
        panchang.choghadiya.night.length > 0) && (
        <>
          <OrnamentalDivider />
          <Section
            eyebrow={t('panchang.choghadiyaEyebrow', { defaultValue: 'Choghadiya' })}
            title={t('panchang.choghadiyaTitle', { defaultValue: 'Day & Night Windows' })}
            hint={t('panchang.choghadiyaHint', {
              defaultValue:
                'Eight segments each of day and night. Green is auspicious, red is to be avoided.',
            })}
          >
            <ChoghadiyaColumns panchang={panchang} />
          </Section>
        </>
      )}

      {/* ─── Hora ────────────────────────────────────────── */}
      {panchang.currentHoraLord && (
        <>
          <OrnamentalDivider />
          <Section
            eyebrow={t('panchang.horaEyebrow', { defaultValue: 'Hora' })}
            title={t('panchang.horaTitle', { defaultValue: 'Current Planetary Hour' })}
          >
            <div className="rounded-2xl border border-primary/30 bg-primary/[0.04] p-6 text-center space-y-2">
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary/70 font-semibold">
                {t('panchang.now', { defaultValue: 'Now' })}
              </p>
              <p
                className="text-3xl font-bold text-primary"
                style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
              >
                {panchang.currentHoraLord}
              </p>
            </div>
          </Section>
        </>
      )}

      {/* ─── Festivals ───────────────────────────────────── */}
      {panchang.festivals.length > 0 && (
        <>
          <OrnamentalDivider />
          <Section
            eyebrow={t('panchang.festivalsEyebrow', { defaultValue: 'Parva' })}
            title={t('panchang.festivalsTitle', { defaultValue: 'Festivals Today' })}
          >
            <ul className="space-y-1.5">
              {panchang.festivals.map((f, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm"
                >
                  <span className="text-primary mt-0.5 shrink-0">{'\u2726'}</span>
                  <span className="text-foreground/85">{f}</span>
                </li>
              ))}
            </ul>
          </Section>
        </>
      )}
    </div>
  );
}

// ─── Local components ───────────────────────────────────────

function CalendarMetadataLine({ panchang }: { panchang: PanchangData }) {
  const items: string[] = [];
  if (panchang.masa) items.push(panchang.masa.name);
  items.push(panchang.paksha);
  items.push(panchang.ritu);
  items.push(panchang.ayana.name);

  return (
    <p className="text-center text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
      {items.join(' \u00b7 ')}
    </p>
  );
}

function TimeTile({
  icon,
  label,
  dt,
}: {
  icon: React.ReactNode;
  label: string;
  dt: DateTime | null;
}) {
  return (
    <div className="rounded-2xl border bg-card p-4 text-center space-y-1.5">
      <div className="flex items-center justify-center gap-1.5 text-primary">
        {icon}
        <p className="text-[10px] uppercase tracking-[0.25em] font-semibold">
          {label}
        </p>
      </div>
      <p
        className="text-xl font-bold font-mono"
        style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
      >
        {dt ? dt.toFormat('HH:mm') : '\u2014'}
      </p>
      <p className="text-[10px] text-muted-foreground font-mono">
        {dt ? dt.toFormat('HH:mm:ss') : ''}
      </p>
    </div>
  );
}

function LimbTile({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-2xl border bg-card p-4 space-y-1">
      <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
        {label}
      </p>
      <p
        className="text-base font-bold leading-tight"
        style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
      >
        {value}
      </p>
      {sub && <p className="text-[11px] text-muted-foreground">{sub}</p>}
    </div>
  );
}

function PeriodTile({
  tone,
  label,
  period,
  hint,
}: {
  tone: 'positive' | 'negative';
  label: string;
  period: PanchangPeriod | null;
  hint: string;
}) {
  const border =
    tone === 'positive' ? 'border-emerald-500/30' : 'border-red-500/30';
  const bg =
    tone === 'positive' ? 'bg-emerald-500/[0.04]' : 'bg-red-500/[0.04]';
  const accent =
    tone === 'positive'
      ? 'text-emerald-700 dark:text-emerald-400'
      : 'text-red-700 dark:text-red-400';

  return (
    <div className={`rounded-2xl border ${border} ${bg} p-5 space-y-2`}>
      <p
        className={`text-[10px] uppercase tracking-[0.2em] font-semibold ${accent}`}
      >
        {label}
      </p>
      <p className="text-lg font-bold leading-tight font-mono">
        {period
          ? `${period.start.toFormat('HH:mm')}\u2013${period.end.toFormat('HH:mm')}`
          : '\u2014'}
      </p>
      <p className="text-[11px] text-muted-foreground">{hint}</p>
    </div>
  );
}

function ChoghadiyaColumns({ panchang }: { panchang: PanchangData }) {
  const { t } = useTranslation();
  const now = DateTime.now().setZone(panchang.instant.zone);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ChoghadiyaColumn
        title={t('panchang.dayChoghadiya', { defaultValue: 'Day Choghadiya' })}
        segments={panchang.choghadiya.day}
        now={now}
      />
      <ChoghadiyaColumn
        title={t('panchang.nightChoghadiya', { defaultValue: 'Night Choghadiya' })}
        segments={panchang.choghadiya.night}
        now={now}
      />
    </div>
  );
}

function ChoghadiyaColumn({
  title,
  segments,
  now,
}: {
  title: string;
  segments: PanchangData['choghadiya']['day'];
  now: DateTime;
}) {
  return (
    <div className="rounded-2xl border bg-card overflow-hidden">
      <div className="px-5 py-3 border-b bg-gradient-to-r from-primary/[0.04] to-transparent">
        <p
          className="text-sm font-bold"
          style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
        >
          {title}
        </p>
      </div>
      <div className="divide-y">
        {segments.map((s, i) => {
          const isNow = now >= s.start && now < s.end;
          const dotColor =
            s.rating === 'good'
              ? 'bg-emerald-500'
              : s.rating === 'bad'
                ? 'bg-red-500'
                : 'bg-amber-500';
          return (
            <div
              key={i}
              className={`grid grid-cols-[auto_1fr_auto] items-center gap-3 px-5 py-2 text-xs ${
                isNow ? 'bg-primary/[0.06]' : ''
              }`}
            >
              <span className={`w-2 h-2 rounded-full shrink-0 ${dotColor}`} />
              <p className="font-semibold text-foreground leading-tight">
                {s.name}
                {isNow && (
                  <span className="ml-2 text-[9px] uppercase tracking-wider text-primary">
                    {'\u00b7 now'}
                  </span>
                )}
              </p>
              <p className="font-mono text-[10px] text-muted-foreground shrink-0">
                {s.start.toFormat('HH:mm')}
                {'\u2013'}
                {s.end.toFormat('HH:mm')}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}