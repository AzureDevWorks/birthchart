import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, BookOpen, Clock, Check, type LucideIcon } from 'lucide-react';
import * as Icons from 'lucide-react';
import { useActiveProfile } from '@/features/birth-profile/store';
import { listSituations } from '@/ai/core';
import { useLibraryForProfile } from './store';
import { resolveAccent } from './accents';

export function AiReadingView() {
  const profile = useActiveProfile();
  const library = useLibraryForProfile(profile);
  const navigate = useNavigate();

  const items = useMemo(
    () => listSituations().filter(
      (x) => x.situation.kind === 'article' || x.situation.id === 'daily-reading'
    ),
    []
  );

  if (!profile) {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-24 text-center space-y-4">
        <Sparkles className="mx-auto opacity-40" size={32} />
        <h1 className="text-2xl font-bold">Enter your birth details first</h1>
        <Link to="/chart" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
          <BookOpen size={14} /> Go to Chart
        </Link>
      </div>
    );
  }

  const generated = Object.keys(library).length;

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 md:py-12 space-y-10">
      <header className="text-center space-y-4 py-8">
        <p className="text-[10px] uppercase tracking-[0.4em] text-primary font-semibold">Reading Studio</p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700 }}>
          Readings for {profile.profileName}
        </h1>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          Each reading is composed from your computed chart using a layered prompt pack. Once generated, it stays in your library.
        </p>
        {generated > 0 && (
          <p className="text-xs text-muted-foreground">{generated} of {items.length} generated</p>
        )}
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(({ situation, pack }) => {
          const record = library[situation.id];
          const styles = resolveAccent(situation.meta?.accent);
          const iconName = situation.meta?.icon ?? 'Sparkles';
          const IconCmp = ((Icons as unknown) as Record<string, LucideIcon>)[iconName] ?? Sparkles;
          return (
            <button
              key={situation.id}
              onClick={() => navigate(`/reading/${situation.id}`)}
              className="group relative text-left rounded-2xl overflow-hidden border transition-all hover:shadow-lg"
              style={{ borderColor: styles.border, background: styles.cardBg }}
            >
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <IconCmp size={12} style={{ color: styles.accent }} />
                      {situation.meta?.sanskrit && (
                        <p className="text-[10px] uppercase tracking-[0.25em] font-semibold" style={{ color: styles.accent }}>
                          {situation.meta.sanskrit}
                        </p>
                      )}
                    </div>
                    <h3 className="font-bold text-foreground" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.25rem' }}>
                      {situation.label}
                    </h3>
                  </div>
                  {record && (
                    <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: styles.accent, color: 'white' }}>
                      <Check size={13} strokeWidth={3} />
                    </span>
                  )}
                </div>
                {situation.meta?.tagline && (
                  <p className="text-xs text-muted-foreground leading-relaxed min-h-[3rem]">{situation.meta.tagline}</p>
                )}
                <div className="flex items-center justify-between gap-2 pt-3 border-t" style={{ borderColor: styles.borderSoft }}>
                  <span className="flex items-center gap-1.5 text-[10px] uppercase text-muted-foreground">
                    <Clock size={11} /> ~{situation.meta?.estimatedMinutes ?? 10} min
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    pack v{pack.version}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

