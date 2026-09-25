import { useMemo } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DateTime } from 'luxon';
import {
  ArrowLeft,
  RefreshCw,
  Loader2,
  MapPin,
  Sunrise as SunriseIcon,
  Sunset as SunsetIcon,
  Sparkles,
} from 'lucide-react';
import { useActiveProfile } from '@/features/birth-profile/store';
import { useUserLocation } from '@/lib/use-user-location';
import { listSituations } from '@/ai/core';
import { useDailyReading } from './hooks/useDailyReading';
import { resolveAccent } from './accents';
import varaTable from '@/ai/data/vara.json';
import { OrnamentalDivider } from '@/features/report/primitives/OrnamentalDivider';
import type { BirthData } from '@/domain/astrology/birth-data';

export function DailyReadingView() {
  const profile = useActiveProfile();
  if (!profile) return <Navigate to="/chart" replace />;
  return <DailyReadingBody profile={profile} />;
}

function DailyReadingBody({ profile }: { profile: BirthData }) {
  const location = useUserLocation();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const language = i18n.resolvedLanguage === 'hi' ? 'hi' : i18n.resolvedLanguage === 'ne' ? 'ne' : 'en';

  const situation = useMemo(() => {
    const found = listSituations().find((x) => x.situation.id === 'daily-reading');
    return found?.situation ?? null;
  }, []);

  const styles = resolveAccent(situation?.meta?.accent);

  const reading = useDailyReading(profile, location, language);
  const { state, record, payload, error, regenerate, panchang } = reading;

  const now = DateTime.now().setZone(location.timezone);
  const vara = (varaTable as Record<string, any>)[String(now.weekday % 7)] ?? null;

  return (
    <div className="min-h-screen" style={{ background: styles.articleBg }}>
      {/* ─── Header bar ─── */}
      <div
        className="no-print sticky top-0 z-40 border-b backdrop-blur"
        style={{
          background: 'hsl(var(--background) / 0.85)',
          borderColor: styles.borderSoft,
        }}
      >
        <div className="container mx-auto max-w-4xl px-4 h-12 flex items-center gap-3">
          <button
            onClick={() => navigate('/reading')}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft size={13} /> Studio
          </button>
          <div className="w-px h-4 mx-1 opacity-30" style={{ background: styles.accent }} />
          <span
            className="text-[10px] uppercase tracking-[0.2em] font-semibold truncate"
            style={{ color: styles.accent }}
          >
            {situation?.label ?? "Today's Reading"}
          </span>
          <div className="flex-1" />
          {record && (
            <button
              onClick={regenerate}
              className="p-1.5 text-muted-foreground hover:text-foreground"
              title="Regenerate"
            >
              <RefreshCw size={13} />
            </button>
          )}
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12 space-y-6">

        {/* ═══════════════ FACTS — instant, no AI ═══════════════ */}
        <header
          className="relative rounded-3xl overflow-hidden border"
          style={{
            borderColor: styles.border,
            background: 'linear-gradient(180deg, hsl(42 60% 99%) 0%, hsl(40 55% 96%) 100%)',
          }}
        >
          <div className="px-6 md:px-10 py-8 space-y-6">
            {/* Weekday + date */}
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-primary" />
                  <p
                    className="text-[11px] uppercase tracking-[0.35em] font-semibold"
                    style={{ color: styles.accent }}
                  >
                    {now.toFormat('cccc')}
                  </p>
                  {vara && (
                    <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
                      · {vara.name} · {vara.planet}
                    </span>
                  )}
                </div>
                <p
                  className="text-3xl md:text-4xl font-bold leading-tight text-foreground"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {now.toFormat('dd LLLL yyyy')}
                </p>
                {vara && (
                  <p
                    className="text-base italic pt-1"
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      color: '#6B4F35',
                    }}
                  >
                    {vara.theme}
                  </p>
                )}
              </div>

              <div className="text-right space-y-1">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1 justify-end">
                  <MapPin size={10} /> {location.shortLabel}
                </p>
                {panchang?.sunrise && panchang?.sunset && (
                  <div className="flex items-center gap-3 text-[12px] font-mono text-foreground/80">
                    <span className="flex items-center gap-1">
                      <SunriseIcon size={11} /> {panchang.sunrise.toFormat('HH:mm')}
                    </span>
                    <span className="flex items-center gap-1">
                      <SunsetIcon size={11} /> {panchang.sunset.toFormat('HH:mm')}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Panchang strip */}
            {panchang && (
              <div
                className="pt-5 border-t flex flex-wrap gap-x-6 gap-y-3"
                style={{ borderColor: styles.borderSoft }}
              >
                <Fact label="Tithi"      value={`${panchang.tithi.name} · ${panchang.paksha}`} />
                <Fact label="Nakshatra"  value={panchang.nakshatra.name} />
                <Fact label="Yoga"       value={panchang.yoga.name} />
                <Fact label="Karana"     value={panchang.karana.name} />
                {panchang.vara && <Fact label="Vara" value={panchang.vara.name} />}
              </div>
            )}
          </div>
        </header>

        {/* ═══════════════ GUIDANCE — AI-generated ═══════════════ */}
        {state === 'unavailable' ? (
          <div
            className="rounded-2xl border p-8 text-center space-y-2"
            style={{ borderColor: styles.borderSoft }}
          >
            <p className="text-sm font-medium">No AI provider configured.</p>
            <p className="text-xs text-muted-foreground">
              Add an API key in AI Settings to generate today's reading.
            </p>
            <button
              onClick={() => navigate('/ai-settings')}
              className="text-xs underline text-primary mt-2"
            >
              Go to AI Settings
            </button>
          </div>
        ) : state === 'generating' || (!payload && state !== 'error') ? (
          <div
            className="rounded-2xl border p-12 flex items-center justify-center gap-3 text-sm text-muted-foreground"
            style={{ borderColor: styles.borderSoft }}
          >
            <Loader2 size={16} className="animate-spin" />
            Composing today's reading…
          </div>
        ) : state === 'error' ? (
          <div
            className="rounded-2xl border p-6 space-y-3"
            style={{
              borderColor: 'hsl(6 60% 38% / 0.35)',
              background: 'hsl(6 60% 38% / 0.04)',
            }}
          >
            <p className="text-sm font-medium" style={{ color: 'hsl(6 60% 38%)' }}>
              Could not compose today's reading.
            </p>
            <p className="text-xs text-muted-foreground font-mono">{error}</p>
            <button
              onClick={regenerate}
              className="text-xs underline text-primary"
            >
              Try again
            </button>
          </div>
        ) : payload ? (
          <>
            <OrnamentalDivider />

            <article
              className="rounded-3xl border overflow-hidden"
              style={{ borderColor: styles.border, background: 'white' }}
            >
              <div className="px-6 md:px-10 py-10 space-y-8">

                {/* Narrative blocks */}
                <Block label="What today holds" body={payload.vara_note} styles={styles} />
                <Block label="The Panchang"      body={payload.panchang_note} styles={styles} />
                <Block label="Your Dasha"        body={payload.dasha_note} styles={styles} />
                {payload.transit_note && (
                  <Block label="The Sky" body={payload.transit_note} styles={styles} />
                )}

                {/* Wear / Eat / Avoid eating */}
                <Divider styles={styles} />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <MiniBlock label="Wear"         body={payload.wear} styles={styles} />
                  <MiniBlock label="Eat"          body={payload.eat} styles={styles} />
                  <MiniBlock label="Avoid Eating" body={payload.avoid_eating} styles={styles} />
                </div>

                {/* Do / Avoid */}
                <Divider styles={styles} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ListBlock label="Do"    items={payload.do}    tone="positive" />
                  <ListBlock label="Avoid" items={payload.avoid} tone="negative" />
                </div>

                {/* Mantra */}
                {payload.mantra && (
                  <>
                    <Divider styles={styles} />
                    <div className="text-center space-y-2">
                      <p
                        className="text-[10px] uppercase tracking-[0.35em] font-semibold"
                        style={{ color: styles.accent }}
                      >
                        Mantra
                      </p>
                      <p
                        className="text-lg md:text-xl"
                        style={{
                          fontFamily: "'Tiro Devanagari Sanskrit', 'Noto Serif Devanagari', serif",
                          color: '#2E1F14',
                        }}
                      >
                        {payload.mantra}
                      </p>
                    </div>
                  </>
                )}

                {/* Summary */}
                {payload.summary && (
                  <>
                    <Divider styles={styles} />
                    <p
                      className="text-center text-lg md:text-xl leading-relaxed"
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontStyle: 'italic',
                        color: '#6B4F35',
                      }}
                    >
                      {payload.summary}
                    </p>
                  </>
                )}
              </div>

              {/* Footer */}
              <div
                className="px-6 md:px-10 py-4 border-t flex items-center justify-between gap-3 text-[10px]"
                style={{ borderColor: styles.borderSoft }}
              >
                <span className="text-muted-foreground font-mono truncate">
                  {record?.providerId}
                  {record?.modelId && ` · ${record.modelId}`}
                </span>
                <button
                  onClick={regenerate}
                  className="uppercase tracking-wider inline-flex items-center gap-1.5 text-primary/75 hover:text-primary"
                >
                  <RefreshCw size={10} /> Regenerate
                </button>
              </div>
            </article>
          </>
        ) : null}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────
// Small subcomponents
// ────────────────────────────────────────────────────────────────────────

type Styles = ReturnType<typeof resolveAccent>;

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <span className="flex items-baseline gap-2">
      <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold">
        {label}
      </span>
      <span className="text-foreground/90 font-medium text-[13px]">{value}</span>
    </span>
  );
}

function Block({ label, body, styles }: { label: string; body: string; styles: Styles }) {
  if (!body) return null;
  return (
    <div className="space-y-2">
      <p
        className="text-[10px] uppercase tracking-[0.3em] font-semibold"
        style={{ color: styles.accent }}
      >
        {label}
      </p>
      <p
        className="text-[16px] leading-[1.75] text-foreground/90"
        style={{ fontFamily: "'Cormorant Garamond', 'Crimson Pro', Georgia, serif" }}
      >
        {body}
      </p>
    </div>
  );
}

function MiniBlock({ label, body, styles }: { label: string; body: string; styles: Styles }) {
  if (!body) return null;
  return (
    <div className="space-y-1.5">
      <p
        className="text-[10px] uppercase tracking-[0.25em] font-semibold"
        style={{ color: styles.accent }}
      >
        {label}
      </p>
      <p className="text-[13.5px] leading-[1.65] text-foreground/85">{body}</p>
    </div>
  );
}

function ListBlock({
  label,
  items,
  tone,
}: {
  label: string;
  items: string[];
  tone: 'positive' | 'negative';
}) {
  if (items.length === 0) return null;
  const color = tone === 'positive' ? 'hsl(150 45% 32%)' : 'hsl(6 60% 38%)';
  const symbol = tone === 'positive' ? '✦' : '⚠';
  return (
    <div className="space-y-3">
      <p
        className="text-[10px] uppercase tracking-[0.25em] font-semibold"
        style={{ color }}
      >
        {label}
      </p>
      <ul className="space-y-2">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-2.5 text-[14px] leading-[1.6] text-foreground/85">
            <span style={{ color }} className="shrink-0 mt-0.5">{symbol}</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Divider({ styles }: { styles: Styles }) {
  return (
    <div className="flex items-center justify-center gap-3" aria-hidden="true">
      <span
        className="h-px flex-1"
        style={{
          background: `linear-gradient(to right, transparent, ${styles.ornament}55, transparent)`,
        }}
      />
      <span style={{ fontSize: '10px', color: styles.ornament, opacity: 0.7 }}>✦</span>
      <span
        className="h-px flex-1"
        style={{
          background: `linear-gradient(to left, transparent, ${styles.ornament}55, transparent)`,
        }}
      />
    </div>
  );
}
