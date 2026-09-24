import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshCw, Sparkles } from 'lucide-react';
import { DateTime } from 'luxon';
import { rashiImageUrl } from '@/features/report/lib/rashi-images';
import { RASHI_GLYPHS } from '@/features/report/lib/glyphs';
import { cleanDailyRashiText, rashiDevanagari } from '../lib/daily-rashi-text';
import type { UseDailyRashiResult } from '../hooks/useDailyRashi';

export interface DailyRashiTileProps {
  rashi: UseDailyRashiResult;
  chandraNakshatra?: string | null;
  chandraPada?: number | null;
}

export function DailyRashiTile({
  rashi,
  chandraNakshatra,
  chandraPada,
}: DailyRashiTileProps) {
  const { t } = useTranslation();
  const { state, record, regenerate } = rashi;

  if (!record) return null;
  if (state === 'error' || state === 'unavailable') return null;

  const devanagari = rashiDevanagari(record.chandraRashi);
  const generatedAt = DateTime.fromISO(record.generatedAt).toRelative({
    style: 'short',
  });

  const hasStructured = Boolean(record.headline || record.action || record.avoid);
  const prose = hasStructured ? '' : cleanDailyRashiText(record.text);

  return (
    <article
      className="relative rounded-2xl border overflow-hidden"
      style={{
        borderColor: 'hsl(38 60% 78% / 0.55)',
        background:
          'linear-gradient(180deg, hsl(42 60% 98%) 0%, hsl(40 55% 96%) 100%)',
      }}
    >
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, hsl(38 85% 60% / 0.12) 0%, transparent 70%)',
        }}
      />

      {/* Header */}
      <div
        className="relative px-6 py-3.5 flex items-center justify-between gap-3 border-b"
        style={{ borderColor: 'hsl(38 55% 48% / 0.22)' }}
      >
        <div className="flex items-center gap-2 min-w-0">
          <Sparkles size={13} className="text-primary shrink-0" />
          <h3
            className="text-[10px] uppercase tracking-[0.3em] font-semibold text-primary/85"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            {t('dashboard.dailyRashi.title', { defaultValue: "Today's Rashi" })}
          </h3>
        </div>
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono shrink-0">
          {DateTime.fromISO(record.generatedAt).toFormat('dd LLL yyyy')}
        </p>
      </div>

      {/* Identity block */}
      <div className="relative px-6 pt-5 pb-4">
        <div className="flex items-center gap-4">
          <RashiMedallion rashi={record.chandraRashi} />

          <div className="flex-1 min-w-0 space-y-0.5">
            {devanagari && (
              <p
                className="text-[22px] leading-none font-medium text-foreground"
                style={{
                  fontFamily:
                    "'Tiro Devanagari Sanskrit', 'Noto Serif Devanagari', serif",
                  letterSpacing: '0.02em',
                }}
              >
                {devanagari}
              </p>
            )}
            <p
              className="text-base font-bold leading-tight text-foreground"
              style={{
                fontFamily:
                  "'Crimson Pro', 'Cormorant Garamond', Georgia, serif",
                letterSpacing: '0.01em',
              }}
            >
              {record.chandraRashi}
            </p>
            <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-semibold pt-0.5">
              {t('dashboard.dailyRashi.janmaRashi', { defaultValue: 'Janma Rashi' })}
              {chandraNakshatra && (
                <>
                  <span className="opacity-40 mx-1.5">·</span>
                  <span className="normal-case tracking-normal font-medium text-foreground/70">
                    {chandraNakshatra}
                    {chandraPada ? ` · Pada ${chandraPada}` : ''}
                  </span>
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Ornament */}
      <div className="px-6 flex items-center gap-3" aria-hidden="true">
        <span
          className="h-px flex-1"
          style={{
            background:
              'linear-gradient(to right, transparent, hsl(38 55% 48% / 0.35), transparent)',
          }}
        />
        <span style={{ fontSize: '9px', color: 'hsl(38 55% 48%)', opacity: 0.8 }}>
          ✦
        </span>
        <span
          className="h-px flex-1"
          style={{
            background:
              'linear-gradient(to left, transparent, hsl(38 55% 48% / 0.35), transparent)',
          }}
        />
      </div>

      {/* Body */}
      <div className="relative px-6 pt-5 pb-5">
        {hasStructured ? (
          <div className="space-y-4">
            {record.headline && (
              <p
                className="text-[17px] leading-[1.5] font-medium text-foreground/90"
                style={{
                  fontFamily:
                    "'Cormorant Garamond', 'Crimson Pro', Georgia, serif",
                  letterSpacing: '0.005em',
                }}
              >
                {record.headline}
              </p>
            )}

            <div className="space-y-2.5">
              {record.action && <PunchRow tone="action" text={record.action} />}
              {record.avoid && <PunchRow tone="avoid" text={record.avoid} />}
            </div>
          </div>
        ) : (
          <p
            className="text-[15px] leading-[1.8] text-foreground/90"
            style={{
              fontFamily:
                "'Cormorant Garamond', 'Crimson Pro', Georgia, serif",
              letterSpacing: '0.005em',
            }}
          >
            {prose}
          </p>
        )}
      </div>

      {/* Footer */}
      <div
        className="relative px-6 py-3 flex items-center justify-between gap-3 border-t"
        style={{ borderColor: 'hsl(38 55% 48% / 0.18)' }}
      >
        <p className="text-[10px] text-muted-foreground font-mono truncate">
          {record.providerId}
          {record.modelId && ` · ${record.modelId}`}
          {generatedAt && ` · ${generatedAt}`}
        </p>
        <button
          type="button"
          onClick={regenerate}
          className="text-[10px] uppercase tracking-wider text-primary/75 hover:text-primary transition-colors inline-flex items-center gap-1.5 shrink-0"
          title={t('common.regenerate', { defaultValue: 'Regenerate' })}
        >
          <RefreshCw size={10} />
          {t('common.regenerate', { defaultValue: 'Regenerate' })}
        </button>
      </div>
    </article>
  );
}

// ────────────────────────────────────────────────────────────────────────

function PunchRow({ tone, text }: { tone: 'action' | 'avoid'; text: string }) {
  const color =
    tone === 'action' ? 'hsl(150 45% 32%)' : 'hsl(6 60% 38%)';
  const symbol = tone === 'action' ? '✦' : '⚠';
  const label = tone === 'action' ? 'Action' : 'Avoid';

  return (
    <div className="flex items-start gap-3">
      <span
        className="shrink-0 mt-[2px] text-[12px] leading-none"
        style={{ color }}
        aria-hidden="true"
      >
        {symbol}
      </span>
      <div className="min-w-0 flex-1 flex items-baseline gap-2.5 flex-wrap">
        <span
          className="shrink-0 text-[9px] uppercase tracking-[0.2em] font-bold"
          style={{ color, fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          {label}
        </span>
        <span
          className="text-[14px] leading-[1.55] text-foreground/85"
          style={{
            fontFamily:
              "'Cormorant Garamond', 'Crimson Pro', Georgia, serif",
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
}

function RashiMedallion({ rashi }: { rashi: string }) {
  const [failed, setFailed] = useState(false);
  const url = rashiImageUrl(rashi);
  const showImage = Boolean(url) && !failed;

  return (
    <div
      className="relative shrink-0"
      style={{
        width: 64,
        height: 64,
        borderRadius: '9999px',
        background: 'hsl(42 55% 97%)',
        border: '1.5px solid hsl(38 55% 48% / 0.5)',
        boxShadow:
          '0 0 0 3px hsl(42 60% 98%), 0 0 0 4px hsl(38 55% 48% / 0.22), 0 3px 12px hsl(30 40% 20% / 0.07)',
        overflow: 'hidden',
      }}
    >
      {showImage ? (
        <img
          src={url!}
          alt={rashi}
          draggable={false}
          onError={() => setFailed(true)}
          className="w-full h-full object-cover"
        />
      ) : (
        <div
          className="w-full h-full flex items-center justify-center"
          style={{
            fontFamily: "'Noto Serif Devanagari', serif",
            fontSize: 26,
            lineHeight: 1,
            color: 'hsl(30 45% 38%)',
          }}
        >
          {RASHI_GLYPHS[rashi] ?? '·'}
        </div>
      )}
    </div>
  );
}