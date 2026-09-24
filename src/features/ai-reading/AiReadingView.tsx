import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Sparkles,
  BookOpen,
  Clock,
  Check,
  Briefcase,
  Heart,
  Coins,
  Activity,
  Flame,
  Baby,
  Leaf,
  Orbit,
  Compass,
  type LucideIcon,
} from 'lucide-react';
import { useActiveProfile } from '@/features/birth-profile/store';
import { CATEGORIES } from './categories';
import { useLibraryForProfile } from './store';
import { ACCENT_STYLES } from './accents';
import { cn } from '@/lib/utils';

const ICON_MAP: Record<string, LucideIcon> = {
  Sparkles,
  Briefcase,
  Heart,
  Coins,
  Activity,
  Flame,
  Baby,
  Leaf,
  Orbit,
  Compass,
};

function ReadingCover({
  src,
  fallback,
  accent,
  border,
}: {
  src?: string;
  fallback: React.ReactNode;
  accent: string;
  border: string;
}) {
  const [errored, setErrored] = React.useState(false);
  const showImage = Boolean(src) && !errored;

  return (
    <div
      className="relative w-full overflow-hidden rounded-t-2xl"
      style={{
        aspectRatio: '16 / 9',
        background: 'linear-gradient(180deg, hsl(30 30% 96%), hsl(30 25% 92%))',
        borderBottom: `1px solid ${border}`,
      }}
    >
      {showImage ? (
        <img
  src={src}
  alt=""
  loading="lazy"
  draggable={false}
  onError={() => setErrored(true)}
  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
/>
      ) : (
        <div
          className="w-full h-full flex items-center justify-center"
          style={{
            background: `radial-gradient(circle at 50% 60%, ${accent}22, transparent 65%), linear-gradient(180deg, hsl(30 30% 97%), hsl(30 25% 93%))`,
          }}
        >
          <span
            className="flex items-center justify-center rounded-full"
            style={{
              width: 56,
              height: 56,
              background: `${accent}18`,
              border: `1px solid ${accent}45`,
              color: accent,
            }}
          >
            {fallback}
          </span>
        </div>
      )}

      {/* subtle veil so the accent bar always reads */}
      <div
        className="absolute inset-x-0 top-0 h-[3px]"
        style={{ background: `linear-gradient(90deg, ${accent}, ${accent}aa)` }}
      />
    </div>
  );
}
export function AiReadingView() {
  const { t } = useTranslation();
  const profile = useActiveProfile();
  const library = useLibraryForProfile(profile);
  const navigate = useNavigate();

  if (!profile) {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-24 text-center space-y-4">
        <Sparkles className="mx-auto opacity-40" size={32} />
        <h1
          className="text-2xl font-bold"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {t('reading.needProfile', { defaultValue: 'Enter your birth details first' })}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t('reading.needProfileHint', {
            defaultValue: 'The reading studio composes from your computed chart.',
          })}
        </p>
        <Link
          to="/chart"
          className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
        >
          <BookOpen size={14} /> Go to Chart
        </Link>
      </div>
    );
  }

  const generated = Object.keys(library).length;

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 md:py-12 space-y-10">
      <header className="text-center space-y-4 py-8">
        <p className="text-[10px] uppercase tracking-[0.4em] text-primary font-semibold">
          {t('reading.studio', { defaultValue: 'Reading Studio' })}
        </p>
        <h1
          className="font-bold tracking-tight"
          style={{
            fontFamily: "'Cormorant Garamond', 'Crimson Pro', Georgia, serif",
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            lineHeight: 1.1,
          }}
        >
          {t('reading.headline', {
            defaultValue: 'Nine readings for {{name}}',
            name: profile.profileName,
          })}
        </h1>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {t('reading.intro', {
            defaultValue:
              'Each is a distinct lens on your chart — composed from your computed data, in the classical Jyotish voice. Once generated, each reading is kept in your library and never re-written.',
          })}
        </p>
        {generated > 0 && (
          <p className="text-xs text-muted-foreground pt-2">
            {t('reading.progress', {
              defaultValue: '{{done}} of {{total}} generated',
              done: generated,
              total: CATEGORIES.length,
            })}
          </p>
        )}
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {CATEGORIES.map((cat) => {
          const record = library[cat.id];
          const styles = ACCENT_STYLES[cat.accent];
          const IconComponent = ICON_MAP[cat.icon] ?? Sparkles;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => navigate(`/reading/${cat.id}`)}
              className={cn(
                'group relative text-left rounded-2xl overflow-hidden border transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
              )}
              style={{ borderColor: styles.border, background: styles.cardBg }}
            >
              <ReadingCover
                src={cat.image}
                accent={styles.accent}
                border={styles.borderSoft}
                fallback={<IconComponent size={24} />}
              />
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <IconComponent
                        size={12}
                        style={{ color: styles.accent }}
                        aria-hidden="true"
                      />
                      <p
                        className="text-[10px] uppercase tracking-[0.25em] font-semibold"
                        style={{ color: styles.accent }}
                      >
                        {cat.sanskrit}
                      </p>
                    </div>
                    <h3
                      className="font-bold leading-tight text-foreground"
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: '1.25rem',
                      }}
                    >
                      {cat.title}
                    </h3>
                  </div>
                  {record && (
                    <span
                      className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ background: styles.accent, color: 'white' }}
                    >
                      <Check size={13} strokeWidth={3} />
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed min-h-[3rem]">
                  {cat.tagline}
                </p>
                <div
                  className="flex items-center justify-between gap-2 pt-3 border-t"
                  style={{ borderColor: styles.borderSoft }}
                >
                  <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                    <Clock size={11} /> ~{cat.estimatedMinutes} min
                  </span>
                  {record ? (
                    <span className="text-[10px] text-muted-foreground">
                      {record.wordCount.toLocaleString()} words
                    </span>
                  ) : (
                    <span
                      className="text-[10px] uppercase tracking-wider font-semibold transition-transform group-hover:translate-x-0.5"
                      style={{ color: styles.accent }}
                    >
                      {t('reading.generate', { defaultValue: 'Generate' })} →
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
