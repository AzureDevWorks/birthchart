import { useEffect, useState } from 'react';
import { List, X } from 'lucide-react';
import type { ArticleSection } from '../markdown';
import { cn } from '@/lib/utils';

interface ArticleTOCProps {
  sections: ArticleSection[];
  accent: string;
}

export function ArticleTOC({ sections, accent }: ArticleTOCProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(sections[0]?.slug ?? '');
  const [fabVisible, setFabVisible] = useState(false);

  // ─── Scroll-spy: track the section currently in view ────────────
  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.slug))
      .filter(Boolean) as HTMLElement[];
    if (els.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-120px 0px -60% 0px', threshold: [0, 0.25, 0.6, 1] }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [sections]);

  // ─── Show FAB only after scrolling past the article header ──────
  useEffect(() => {
    const onScroll = () => {
      setFabVisible(window.scrollY > 360);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ─── Close on ESC ───────────────────────────────────────────────
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // ─── Lock body scroll while drawer is open ──────────────────────
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const activeIndex = Math.max(
    0,
    sections.findIndex((s) => s.slug === active)
  );
  const total = sections.length;

  const handleSelect = (slug: string) => {
    setActive(slug);
    setOpen(false);
    // Small delay so the drawer closes before the scroll begins —
    // prevents a visual jump on mobile where the drawer covers content.
    window.setTimeout(() => {
      const el = document.getElementById(slug);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
  };

  return (
    <>
      {/* ═════════ FLOATING CONTENTS BUTTON ═════════ */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open contents"
        className={cn(
          'no-print fixed z-40 flex items-center gap-2 rounded-full border pl-3 pr-4 py-2',
          'transition-all duration-300',
          'hover:-translate-y-0.5 hover:shadow-lg',
          fabVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-3 pointer-events-none'
        )}
        style={{
          right: 20,
          bottom: 20,
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(8px)',
          borderColor: `${accent}55`,
          color: accent,
          boxShadow: '0 2px 12px hsl(30 25% 20% / 0.10)',
        }}
      >
        <List size={14} />
        <span
          className="font-mono tabular-nums"
          style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.02em' }}
        >
          {String(activeIndex + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
        </span>
      </button>

      {/* ═════════ BACKDROP ═════════ */}
      <div
        aria-hidden={!open}
        onClick={() => setOpen(false)}
        className={cn(
          'no-print fixed inset-0 z-50 transition-opacity duration-300',
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        style={{ background: 'hsl(30 25% 20% / 0.35)' }}
      />

      {/* ═════════ DRAWER ═════════ */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Contents"
        className={cn(
          'no-print fixed top-0 right-0 h-full z-50 flex flex-col',
          'transition-transform duration-300 ease-out',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
        style={{
          width: '100%',
          maxWidth: '380px',
          background: 'linear-gradient(180deg, #FBF6EA 0%, #F5EEDF 100%)',
          boxShadow: '-8px 0 40px hsl(30 25% 20% / 0.18)',
        }}
      >
        {/* Header */}
        <div
          className="shrink-0 px-6 py-5 flex items-center justify-between gap-3 border-b"
          style={{ borderColor: `${accent}22` }}
        >
          <div>
            <p
              className="text-[10px] uppercase tracking-[0.35em] font-semibold"
              style={{ color: accent }}
            >
              Contents
            </p>
            <p
              className="text-lg font-semibold leading-tight mt-1"
              style={{
                fontFamily: "'Cormorant Garamond', 'Crimson Pro', Georgia, serif",
                color: '#2E1F14',
              }}
            >
              {total} sections
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            style={{
              border: `1px solid ${accent}30`,
              color: accent,
            }}
          >
            <X size={15} />
          </button>
        </div>

        {/* List */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-0.5">
            {sections.map((s, i) => {
              const isActive = s.slug === active;
              const num = String(i + 1).padStart(2, '0');
              return (
                <li key={s.slug}>
                  <button
                    type="button"
                    onClick={() => handleSelect(s.slug)}
                    className={cn(
                      'w-full text-left rounded-lg px-3 py-2.5 flex items-baseline gap-3 transition-colors',
                      isActive
                        ? 'bg-white/70'
                        : 'hover:bg-white/40'
                    )}
                    style={{
                      borderLeft: isActive
                        ? `2px solid ${accent}`
                        : '2px solid transparent',
                    }}
                  >
                    <span
                      className="shrink-0 font-mono tabular-nums"
                      style={{
                        fontSize: '10px',
                        fontWeight: 600,
                        color: isActive ? accent : '#A89072',
                        paddingTop: '2px',
                      }}
                    >
                      {num}
                    </span>
                    <span
                      className="flex-1 leading-snug"
                      style={{
                        fontFamily:
                          "'Cormorant Garamond', 'Crimson Pro', Georgia, serif",
                        fontSize: '16px',
                        fontWeight: isActive ? 600 : 500,
                        color: isActive ? '#2E1F14' : '#5A4430',
                      }}
                    >
                      {s.title}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer accent */}
        <div
          className="shrink-0 px-6 py-3 border-t text-center"
          style={{ borderColor: `${accent}22` }}
        >
          <p
            className="text-[10px] uppercase tracking-[0.3em] font-semibold"
            style={{ color: `${accent}AA` }}
          >
            ✦
          </p>
        </div>
      </aside>
    </>
  );
}