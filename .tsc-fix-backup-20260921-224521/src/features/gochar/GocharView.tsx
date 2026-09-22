import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Section } from '@/features/report/primitives/Section';
import { OrnamentalDivider } from '@/features/report/primitives/OrnamentalDivider';
import { useActiveProfile } from '@/features/birth-profile/store';
import { prisriJyotish, BirthDataError } from '@/infrastructure/astrology/prisri-jyotish.adapter';
import { gocharAdapter, GocharError } from '@/infrastructure/astrology/gochar.adapter';
import { PLANET_GLYPHS, RASHI_GLYPHS } from '@/features/report/lib/glyphs';
import type { GocharAnalysis, GocharPlanet } from '@/domain/astrology/gochar';

const PLANET_ORDER = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'];

export function GocharView() {
  const { t } = useTranslation();
  const profile = useActiveProfile();

  const result = useMemo(() => {
    if (!profile) return { data: null, error: null as string | null };
    try {
      const kundli = prisriJyotish.calculate(profile);
      const data = gocharAdapter.fullAnalysis(
        profile,
        kundli as unknown as Record<string, any>
      );
      return { data, error: null };
    } catch (e) {
      const msg =
        e instanceof BirthDataError || e instanceof GocharError
          ? (e as Error).message
          : t('gochar.failed', { defaultValue: 'Transit analysis failed.' });
      return { data: null, error: msg };
    }
  }, [profile, t]);

  if (!profile) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-20 text-center space-y-3">
        <p className="text-[10px] uppercase tracking-[0.4em] text-primary font-semibold">
          {t('gochar.eyebrow', { defaultValue: 'Vedic Transits' })}
        </p>
        <h1
          className="font-bold"
          style={{
            fontFamily: "'Crimson Pro', Georgia, serif",
            fontSize: 'clamp(2rem, 4.5vw, 3rem)',
          }}
        >
          {t('gochar.title', { defaultValue: 'Gochar' })}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t('gochar.noProfile', {
            defaultValue: 'Enter your birth details first to see transit analysis.',
          })}
        </p>
      </div>
    );
  }

  if (result.error || !result.data) {
    return (
      <div className="container max-w-3xl mx-auto px-4 py-12">
        <div className="text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-lg px-3 py-2">
          {result.error ?? t('gochar.failed', { defaultValue: 'Transit analysis failed.' })}
        </div>
      </div>
    );
  }

  const { analysis, sadeSati, dhaiya, chandrashtama, tarabalam, dishaShoola } = result.data;

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 md:py-12 space-y-4">
      {/* Header */}
      <div className="text-center space-y-2 py-6">
        <p className="text-[10px] uppercase tracking-[0.4em] text-primary font-semibold">
          {t('gochar.eyebrow', { defaultValue: 'Vedic Transits' })}
        </p>
        <h1
          className="font-bold tracking-tight"
          style={{
            fontFamily: "'Crimson Pro', Georgia, serif",
            fontSize: 'clamp(2rem, 4.5vw, 3rem)',
            lineHeight: 1.1,
          }}
        >
          {t('gochar.title', { defaultValue: 'Gochar' })}
        </h1>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          {t('gochar.subtitle', {
            defaultValue:
              'The planets as they move through the sky right now, measured from your birth Moon.',
          })}
        </p>
      </div>

      {/* Overall verdict */}
      <OrnamentalDivider />
      <Section
        eyebrow={t('gochar.overallVerdict', { defaultValue: 'Overall Verdict' })}
        title={analysis.overallVerdict || '—'}
      >
        <div className="rounded-2xl border border-primary/30 bg-primary/[0.04] p-6 text-center space-y-3">
          <p
            className="text-4xl font-bold text-primary"
            style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
          >
            {Math.round(analysis.overallFavorablePercentage)}%
          </p>
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            {t('gochar.favorable', { defaultValue: 'favorable' })}
          </p>
          <p className="text-xs text-muted-foreground font-mono">
            {t('gochar.calculatedAt', { defaultValue: 'Calculated' })}:{' '}
            {new Date(analysis.calculatedAt).toLocaleString()}
          </p>
        </div>
      </Section>

      {/* Special transits — Sade Sati, Dhaiya, Guru Gochar */}
      <OrnamentalDivider />
      <Section
        eyebrow="Shani & Guru"
        title="Special Transits"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatusCard
            label={t('gochar.sadeSatiTitle', { defaultValue: 'Sade Sati' })}
            active={sadeSati.status === 'active'}
            activeLabel={t('gochar.active', { defaultValue: 'Active' })}
            inactiveLabel={t('gochar.inactive', { defaultValue: 'Not active' })}
            details={[
              sadeSati.phase && `${t('gochar.phase', { defaultValue: 'Phase' })}: ${sadeSati.phase}`,
              sadeSati.description,
            ].filter(Boolean) as string[]}
          />

          {dhaiya && (
            <StatusCard
              label={t('gochar.dhaiyaTitle', { defaultValue: 'Dhaiya' })}
              active={dhaiya.status === 'active'}
              activeLabel={t('gochar.active', { defaultValue: 'Active' })}
              inactiveLabel={t('gochar.inactive', { defaultValue: 'Not active' })}
              details={[
                dhaiya.type && `${t('gochar.type', { defaultValue: 'Type' })}: ${dhaiya.type}`,
                dhaiya.description,
              ].filter(Boolean) as string[]}
            />
          )}

          <StatusCard
            label={t('gochar.guruGocharTitle', { defaultValue: 'Guru Gochar' })}
            active
            activeLabel=""
            inactiveLabel=""
            neutral
            details={[
              analysis.specialTransits.guruGochar.rashiName &&
                `${PLANET_GLYPHS.Jupiter} ${analysis.specialTransits.guruGochar.rashiName}` +
                  (analysis.specialTransits.guruGochar.houseFromMoon
                    ? ` · H${analysis.specialTransits.guruGochar.houseFromMoon} ${t('gochar.houseFromMoon', { defaultValue: 'from Moon' })}`
                    : ''),
              analysis.specialTransits.guruGochar.blessingSummary,
            ].filter(Boolean) as string[]}
          />
        </div>
      </Section>

      {/* Chandrashtama / Tarabalam / Disha Shoola */}
      <OrnamentalDivider />
      <Section eyebrow="Daily" title="Today's Indicators">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <IndicatorCard
            label={t('gochar.chandrashtamaTitle', { defaultValue: 'Chandrashtama' })}
            value={chandrashtama.isActive ? t('gochar.active', { defaultValue: 'Active' }) : t('gochar.inactive', { defaultValue: 'Not active' })}
            tone={chandrashtama.isActive ? 'negative' : 'positive'}
            description={chandrashtama.description}
          />
          <IndicatorCard
            label={t('gochar.tarabalamTitle', { defaultValue: 'Tarabalam' })}
            value={tarabalam.taraName || '—'}
            tone={tarabalam.isAuspicious ? 'positive' : 'negative'}
            description={tarabalam.description}
          />
          <IndicatorCard
            label={t('gochar.dishaShoolaTitle', { defaultValue: 'Disha Shoola' })}
            value={dishaShoola.inauspiciousDirection || '—'}
            tone="neutral"
            description={`${t('gochar.avoidDirection', { defaultValue: 'Avoid traveling' })} ${dishaShoola.inauspiciousDirection} · ${dishaShoola.varaName}`}
          />
        </div>
      </Section>

      {/* Planet-by-planet grid */}
      <OrnamentalDivider />
      <Section
        eyebrow="Navagraha"
        title={t('gochar.planetsTitle', { defaultValue: 'Planetary Transits' })}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PLANET_ORDER.map((name) => {
            const p = analysis.planets[name];
            if (!p) return null;
            return <PlanetTransitCard key={name} planet={p} />;
          })}
        </div>
      </Section>

      {/* Life areas */}
      <OrnamentalDivider />
      <Section
        eyebrow="Life Areas"
        title={t('gochar.lifeAreasTitle', { defaultValue: 'Life Area Impact' })}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {(['career', 'wealth', 'health', 'relationships', 'education', 'family', 'spiritual'] as const).map((key) => {
            const area = analysis.lifeAreas[key];
            if (!area) return null;
            return (
              <LifeAreaCard
                key={key}
                label={t(`gochar.${key}`, { defaultValue: key })}
                rating={area.rating}
                summary={area.summary}
              />
            );
          })}
        </div>
      </Section>
    </div>
  );
}

// ─── Local components ────────────────────────────────────────

function StatusCard({
  label,
  active,
  activeLabel,
  inactiveLabel,
  details,
  neutral,
}: {
  label: string;
  active: boolean;
  activeLabel: string;
  inactiveLabel: string;
  details: string[];
  neutral?: boolean;
}) {
  const border = neutral
    ? 'border-primary/30'
    : active
      ? 'border-amber-500/40'
      : 'border-emerald-500/30';
  const bg = neutral
    ? 'bg-primary/[0.04]'
    : active
      ? 'bg-amber-500/[0.04]'
      : 'bg-emerald-500/[0.03]';
  const accent = neutral
    ? 'text-primary'
    : active
      ? 'text-amber-700 dark:text-amber-400'
      : 'text-emerald-700 dark:text-emerald-400';

  return (
    <div className={`rounded-2xl border ${border} ${bg} p-5 space-y-2`}>
      <p className={`text-[10px] uppercase tracking-[0.2em] font-semibold ${accent}`}>
        {label}
      </p>
      {!neutral && (
        <p
          className="text-lg font-bold leading-tight"
          style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
        >
          {active ? activeLabel : inactiveLabel}
        </p>
      )}
      {details.map((d, i) => (
        <p key={i} className="text-xs text-muted-foreground leading-relaxed">
          {d}
        </p>
      ))}
    </div>
  );
}

function IndicatorCard({
  label,
  value,
  tone,
  description,
}: {
  label: string;
  value: string;
  tone: 'positive' | 'negative' | 'neutral';
  description?: string;
}) {
  const border =
    tone === 'positive'
      ? 'border-emerald-500/30'
      : tone === 'negative'
        ? 'border-red-500/30'
        : 'border-border/60';
  const accent =
    tone === 'positive'
      ? 'text-emerald-700 dark:text-emerald-400'
      : tone === 'negative'
        ? 'text-red-700 dark:text-red-400'
        : 'text-foreground';

  return (
    <div className={`rounded-2xl border ${border} bg-card p-5 space-y-2`}>
      <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
        {label}
      </p>
      <p
        className={`text-lg font-bold leading-tight ${accent}`}
        style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
      >
        {value}
      </p>
      {description && (
        <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
      )}
    </div>
  );
}

function PlanetTransitCard({ planet }: { planet: GocharPlanet }) {
  const favorable = planet.netStatus === 'favorable';
  const unfavorable = planet.netStatus === 'unfavorable';
  const border = favorable
    ? 'border-emerald-500/40'
    : unfavorable
      ? 'border-red-500/40'
      : 'border-border';

  return (
    <article className={`rounded-xl border-2 ${border} bg-card p-4 space-y-2`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            className="text-2xl leading-none"
            style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
          >
            {PLANET_GLYPHS[planet.planet] ?? '·'}
          </span>
          <div>
            <p className="text-sm font-bold leading-tight">{planet.planet}</p>
            <p className="text-[10px] text-muted-foreground font-mono">
              H{planet.houseFromMoon} from Moon
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-baseline gap-2">
        <span
          className="text-xl leading-none"
          style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
        >
          {RASHI_GLYPHS[planet.rashiName] ?? '·'}
        </span>
        <span className="text-sm font-semibold">{planet.rashiName}</span>
        {planet.degree !== undefined && (
          <span className="text-xs font-mono text-muted-foreground">
            {planet.degree.toFixed(2)}°
          </span>
        )}
      </div>

      {planet.hasVedha && (
        <p className="text-[10px] uppercase tracking-wider text-amber-700 dark:text-amber-400 font-semibold pt-1 border-t border-border/40">
          Vedha{planet.vedhaPlanet ? `: ${planet.vedhaPlanet}` : ''}
          {planet.vedhaExempted ? ' (exempted)' : ''}
        </p>
      )}

      {planet.prediction && (
        <p className="text-xs text-muted-foreground leading-relaxed pt-1 border-t border-border/40">
          {planet.prediction}
        </p>
      )}
    </article>
  );
}

function LifeAreaCard({
  label,
  rating,
  summary,
}: {
  label: string;
  rating: string;
  summary: string;
}) {
  const tone =
    rating === 'excellent' || rating === 'good'
      ? 'border-emerald-500/30 bg-emerald-500/[0.03]'
      : rating === 'challenging' || rating === 'difficult'
        ? 'border-red-500/30 bg-red-500/[0.03]'
        : 'border-border/60 bg-card';
  const accent =
    rating === 'excellent' || rating === 'good'
      ? 'text-emerald-700 dark:text-emerald-400'
      : rating === 'challenging' || rating === 'difficult'
        ? 'text-red-700 dark:text-red-400'
        : 'text-foreground';

  return (
    <div className={`rounded-xl border ${tone} p-4 space-y-1.5`}>
      <div className="flex items-baseline justify-between">
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
          {label}
        </p>
        <span className={`text-[10px] font-semibold uppercase tracking-wider ${accent}`}>
          {rating}
        </span>
      </div>
      {summary && (
        <p className="text-xs text-muted-foreground leading-relaxed">{summary}</p>
      )}
    </div>
  );
}