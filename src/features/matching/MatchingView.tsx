import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { OrnamentalDivider } from '@/features/report/primitives/OrnamentalDivider';
import { Section } from '@/features/report/primitives/Section';
import { BirthDateField } from '@/features/birth-profile/components/BirthDateField';
import { PlaceCombobox } from '@/features/birth-profile/components/PlaceCombobox';
import { PlacePreview } from '@/features/birth-profile/components/PlacePreview';
import {
  matchingAdapter,
  MatchingError,
  type MatchingResult,
  type KootaScore,
  type MangalDoshaDetail,
} from '@/infrastructure/astrology/matching.adapter';
import { MANUSCRIPT as C, MANUSCRIPT_ALPHA as CA } from '@/features/report/lib/manuscript-colors';
import type { BirthData } from '@/domain/astrology/birth-data';
import type { Place } from '@/domain/geo/place';

// ─────────────────────────────────────────────────────────────
// Local types & helpers
// ─────────────────────────────────────────────────────────────

interface Draft {
  name: string;
  date: string;
  time: string;
  place: Place | null;
}

const EMPTY: Draft = { name: '', date: '', time: '', place: null };

function isDraftValid(d: Draft): boolean {
  return (
    d.name.trim().length > 0 &&
    d.date.length > 0 &&
    d.time.length > 0 &&
    d.place !== null
  );
}

function draftToBirthData(d: Draft, id: string): BirthData {
  return {
    id,
    profileName: d.name.trim(),
    localDate: d.date,
    localTime: d.time,
    place: d.place as Place,
    createdAt: new Date().toISOString(),
  };
}

// ─── Score bands ────────────────────────────────────────────

type BandKey =
  | 'uttam'
  | 'uttamMadhyam'
  | 'madhyam'
  | 'samanya'
  | 'adhamMadhyam'
  | 'adham'
  | 'atiAdham';

interface Band {
  key: BandKey;
  label: string;
  sanskrit: string;
  min: number;
  max: number;
  accent: 'positive' | 'caution' | 'negative';
  plainTerms: string;
}

const BANDS: Band[] = [
  {
    key: 'uttam', label: 'Blessed Match', sanskrit: 'उत्तम', min: 32, max: 36,
    accent: 'positive',
    plainTerms:
      'The score falls in the rarest band. The two charts agree on almost every dimension the tradition checks — temperament, physical pull, dharma, offspring. This is a match the shastras call blessed. Nothing in the classical literature asks for extra caution here. Proceed with full confidence.',
  },
  {
    key: 'uttamMadhyam', label: 'Excellent Match', sanskrit: 'उत्तम मध्यम', min: 28, max: 31,
    accent: 'positive',
    plainTerms:
      'A very strong score. Seven or eight kootas align. The tradition treats this as highly favorable — marriages with this reading tend to have both emotional stability and material support. Whatever small weakness appears is compensated by the overall strength. Recommended without hesitation.',
  },
  {
    key: 'madhyam', label: 'Good Match', sanskrit: 'मध्यम', min: 24, max: 27,
    accent: 'positive',
    plainTerms:
      'A solid match with a caveat. Most kootas align well, but one or two may fall short — usually Gana, Bhakoot, or Nadi, since those carry the most weight. The tradition says: proceed, but pay attention to the flagged koota. In most cases a small remediation (a specific japa, a fast, or a ritual on a particular tithi) restores balance. A consultation with an astrologer is advised, not required.',
  },
  {
    key: 'samanya', label: 'Average Match', sanskrit: 'सामान्य', min: 18, max: 23,
    accent: 'caution',
    plainTerms:
      'The score is above the acceptance line, but the harmony is not automatic. The two charts work together, but they will need conscious effort in some areas — usually temperament, communication, or long-term goals. The classical texts advise deeper analysis: check the Navamsha (D9) of both charts, examine the 7th house of each, and confirm that the current dashas support union. If those are favorable, marriage can be recommended with awareness.',
  },
  {
    key: 'adhamMadhyam', label: 'Below Average', sanskrit: 'अधम मध्यम', min: 13, max: 17,
    accent: 'caution',
    plainTerms:
      'The score falls below the classical comfort line. Several kootas are weak, and the tradition treats this as a signal to pause. This does not mean the marriage is doomed — but it does mean the couple would enter the union carrying structural friction. A serious consultation is essential. Look for strong compensating factors before proceeding: a powerful Jupiter in either chart, favorable 7th-house dashas, or an exceptionally strong Navamsha. Without those, most traditions advise against.',
  },
  {
    key: 'adham', label: 'Poor Match', sanskrit: 'अधम', min: 7, max: 12,
    accent: 'negative',
    plainTerms:
      'The score is well below the acceptance threshold. Most of the eight kootas are weak, and the tradition consistently advises against proceeding on this basis alone. Where marriages at this band do happen, the classical texts note that both partners must be unusually mature and willing to work through sustained difficulty. Consult an experienced Jyotishi before making any decision.',
  },
  {
    key: 'atiAdham', label: 'Very Poor Match', sanskrit: 'अति अधम', min: 0, max: 6,
    accent: 'negative',
    plainTerms:
      'The score falls in the lowest band. This is exceptionally rare. Classical texts strongly discourage marriage on the basis of this reading, unless the charts show extraordinarily strong compensating factors — which should be confirmed by a qualified Jyotishi, not by software alone. If you are considering this match, seek a full in-person consultation before proceeding.',
  },
];

function bandFor(score: number): Band {
  return BANDS.find((b) => score >= b.min && score <= b.max) ?? BANDS[BANDS.length - 1];
}

// ─────────────────────────────────────────────────────────────
// The view
// ─────────────────────────────────────────────────────────────

export function MatchingView() {
  const { t } = useTranslation();
  const [draftA, setDraftA] = useState<Draft>(EMPTY);
  const [draftB, setDraftB] = useState<Draft>(EMPTY);
  const [result, setResult] = useState<MatchingResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ready = isDraftValid(draftA) && isDraftValid(draftB);

  const handleMatch = () => {
    if (!ready) return;
    setBusy(true);
    setError(null);
    try {
      const a = draftToBirthData(draftA, 'person-a');
      const b = draftToBirthData(draftB, 'person-b');
      const res = matchingAdapter.compare(a, b);
      setResult(res);
      setTimeout(() => {
        document.getElementById('matching-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (e) {
      const msg = e instanceof MatchingError ? e.message : t('matching.failed', { defaultValue: 'Matching failed.' });
      setError(msg);
      toast.error(msg);
    } finally {
      setBusy(false);
    }
  };

  const handleReset = () => {
    setDraftA(EMPTY);
    setDraftB(EMPTY);
    setResult(null);
    setError(null);
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 md:py-12 space-y-6">

      {/* Header */}
      <div className="text-center space-y-3 py-6">
        <p
          className="text-[10px] uppercase tracking-[0.4em] font-semibold"
          style={{ color: C.gold, fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          {t('matching.eyebrow', { defaultValue: 'Vedic Compatibility' })}
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
          {t('matching.title', { defaultValue: 'Kundli Matching' })}
        </h1>
        <p
          className="text-sm max-w-xl mx-auto leading-relaxed"
          style={{ color: C.brownSoft, fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '15px' }}
        >
          {t('matching.subtitle', {
            defaultValue:
              'Two charts. One question: do they meet as they should? The classical Ashtakoota Guna Milan weighs eight qualities of the Moon and rising signs.',
          })}
        </p>
      </div>

      <OrnamentalDivider />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PersonForm
          label={t('matching.personA', { defaultValue: 'Person A' })}
          draft={draftA}
          onChange={setDraftA}
        />
        <PersonForm
          label={t('matching.personB', { defaultValue: 'Person B' })}
          draft={draftB}
          onChange={setDraftB}
        />
      </div>

      <div className="flex justify-center gap-3 pt-2">
        <Button onClick={handleMatch} disabled={!ready || busy} size="lg" className="px-8">
          {busy ? t('matching.calculating', { defaultValue: 'Calculating…' }) : t('matching.calculate', { defaultValue: 'Match' })}
        </Button>
        {result && (
          <Button variant="outline" onClick={handleReset} size="lg">
            {t('matching.reset', { defaultValue: 'Reset' })}
          </Button>
        )}
      </div>

      {error && (
        <div
          className="rounded-lg border px-4 py-3 text-sm"
          style={{
            borderColor: 'hsl(6 60% 38% / 0.35)',
            background: 'hsl(6 60% 38% / 0.05)',
            color: C.vermilion,
          }}
        >
          {error}
        </div>
      )}

      {result && (
        <div id="matching-results" className="pt-8 space-y-6">
          <ScoreHeader result={result} />

          <OrnamentalDivider />

          <Section
            eyebrow={t('matching.kootasEyebrow', { defaultValue: 'The Eight Kootas' })}
            title={t('matching.kootasTitle', { defaultValue: 'Guna Milan Breakdown' })}
          >
            <KootaHighlights kootas={result.kootas} />
            <div className="pt-4">
              <KootaGrid kootas={result.kootas} />
            </div>
          </Section>

          <OrnamentalDivider />

          <Section
            eyebrow={t('matching.doshaEyebrow', { defaultValue: 'Mangal Dosha' })}
            title={t('matching.doshaTitle', { defaultValue: 'Mars Check' })}
            hint={t('matching.doshaHint', {
              defaultValue:
                'Mangal Dosha is a classical caution for Mars in the 1st, 2nd, 4th, 7th, 8th, or 12th house. Modern practice weighs cancellations carefully.',
            })}
          >
            <DoshaGrid
              doshaA={result.dosha.boy}
              doshaB={result.dosha.girl}
              nameA={draftA.name}
              nameB={draftB.name}
            />
          </Section>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Person form
// ─────────────────────────────────────────────────────────────

function PersonForm({
  label,
  draft,
  onChange,
}: {
  label: string;
  draft: Draft;
  onChange: (d: Draft) => void;
}) {
  const { t } = useTranslation();

  return (
    <div
      className="rounded-2xl p-6 space-y-4"
      style={{ background: C.ivory, border: `1px solid ${CA.goldSoft(0.4)}` }}
    >
      <p
        className="text-[10px] uppercase tracking-[0.3em] font-semibold"
        style={{ color: C.gold, fontFamily: "'Inter', system-ui, sans-serif" }}
      >
        {label}
      </p>

      <div className="space-y-2">
        <Label htmlFor={`name-${label}`} className="text-xs">
          {t('matching.name', { defaultValue: 'Name' })}
        </Label>
        <Input
          id={`name-${label}`}
          value={draft.name}
          onChange={(e) => onChange({ ...draft, name: e.target.value })}
          placeholder={t('matching.namePlaceholder', { defaultValue: 'Full name' })}
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label className="text-xs">{t('matching.date', { defaultValue: 'Birth Date' })}</Label>
          <BirthDateField
            value={draft.date}
            onChange={(iso) => onChange({ ...draft, date: iso })}
            minYear={1900}
            maxYear={new Date().getFullYear()}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`time-${label}`} className="text-xs">
            {t('matching.time', { defaultValue: 'Birth Time' })}
          </Label>
          <Input
            id={`time-${label}`}
            type="time"
            step="1"
            value={draft.time}
            onChange={(e) => onChange({ ...draft, time: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-xs">{t('matching.place', { defaultValue: 'Birth Place' })}</Label>
        {draft.place ? (
          <PlacePreview
            place={draft.place}
            localDate={draft.date}
            localTime={draft.time}
            onChange={() => onChange({ ...draft, place: null })}
          />
        ) : (
          <PlaceCombobox value={null} onChange={(p) => onChange({ ...draft, place: p })} />
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Score header — the big number + band + plain-terms reading
// ─────────────────────────────────────────────────────────────

function ScoreHeader({ result }: { result: MatchingResult }) {
  const { t } = useTranslation();
  const band = bandFor(result.totalScore);
  const pct = result.totalScore / result.maxScore;

  const accentColor =
    band.accent === 'positive' ? 'hsl(150 45% 32%)'
    : band.accent === 'caution' ? C.vermilion
    : 'hsl(6 60% 38%)';

  const borderColor =
    band.accent === 'positive' ? 'hsl(150 45% 42% / 0.35)'
    : band.accent === 'caution' ? 'hsl(38 55% 48% / 0.4)'
    : 'hsl(6 60% 38% / 0.35)';

  const bgColor =
    band.accent === 'positive' ? 'hsl(150 45% 42% / 0.04)'
    : band.accent === 'caution' ? 'hsl(38 55% 48% / 0.04)'
    : 'hsl(6 60% 38% / 0.04)';

  // Verdict split — headline + detail
  const [headline, ...rest] = result.verdict.split(/[-,]\s+/);
  const detail = rest.join(', ');

  return (
    <div className="space-y-6 pt-4">
      {/* Big number */}
      <div className="text-center space-y-3">
        <p
          className="text-[10px] uppercase tracking-[0.4em] font-semibold"
          style={{ color: C.gold, fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          {t('matching.scoreEyebrow', { defaultValue: 'Guna Milan Score' })}
        </p>
        <div className="flex items-baseline justify-center gap-3">
          <p
            className="leading-none font-bold"
            style={{
              fontFamily: "'Cormorant Garamond', 'Crimson Pro', Georgia, serif",
              fontSize: 'clamp(3.5rem, 8vw, 5.5rem)',
              color: C.brown,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {result.totalScore}
          </p>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              color: C.brownSoft,
            }}
          >
            / {result.maxScore}
          </p>
        </div>

        <div className="max-w-md mx-auto h-2 rounded-full overflow-hidden" style={{ background: CA.goldSoft(0.25) }}>
          <div
            className="h-full transition-all"
            style={{ width: `${Math.min(100, Math.max(0, pct * 100))}%`, background: accentColor }}
          />
        </div>

        <div className="space-y-1 pt-2">
          <p
            className="font-bold"
            style={{
              fontFamily: "'Cormorant Garamond', 'Crimson Pro', Georgia, serif",
              fontSize: 'clamp(1.15rem, 2vw, 1.4rem)',
              color: C.brown,
            }}
          >
            {headline}
          </p>
          {detail && (
            <p
              className="text-sm italic"
              style={{ color: C.brownSoft, fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {detail}
            </p>
          )}
        </div>
      </div>

      {/* Band label */}
      <div className="text-center pt-2">
        <div
          className="inline-block rounded-full px-5 py-2"
          style={{ border: `1px solid ${borderColor}`, background: bgColor }}
        >
          <span
            style={{
              fontFamily: "'Cormorant Garamond', 'Crimson Pro', Georgia, serif",
              fontSize: '15px',
              fontWeight: 600,
              color: accentColor,
              marginRight: '8px',
            }}
          >
            {band.label}
          </span>
          <span
            style={{
              fontFamily: "'Tiro Devanagari Sanskrit', 'Noto Serif Devanagari', serif",
              fontSize: '13px',
              color: C.brownSoft,
            }}
          >
            {band.sanskrit}
          </span>
        </div>
      </div>

      {/* Plain-terms reading */}
      <div
        className="rounded-2xl p-6 md:p-8"
        style={{ background: C.ivory, border: `1px solid ${CA.goldSoft(0.4)}` }}
      >
        <p
          className="text-[10px] uppercase tracking-[0.3em] font-semibold mb-3"
          style={{ color: C.gold, fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          {t('matching.plainTermsEyebrow', { defaultValue: 'In plain terms' })}
        </p>
        <p
          className="leading-relaxed"
          style={{
            fontFamily: "'Cormorant Garamond', 'Crimson Pro', Georgia, serif",
            fontSize: '16px',
            color: C.brown,
          }}
        >
          {band.plainTerms}
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Koota highlights — strongest + weakest at a glance
// ─────────────────────────────────────────────────────────────

function KootaHighlights({ kootas }: { kootas: KootaScore[] }) {
  const perfect = kootas.filter((k) => k.score === k.maxScore);
  const imperfect = kootas.filter((k) => k.score < k.maxScore);

  // Best: if all perfect, say so. Else list perfects.
  const bestText =
    perfect.length === kootas.length
      ? 'All eight kootas perfect'
      : perfect.length > 0
        ? perfect.map((k) => `${k.name} (${k.score}/${k.maxScore})`).join(' · ')
        : '—';

  // Worst: sort ascending, list the weak ones.
  const sortedWeak = [...imperfect].sort((a, b) => a.score / a.maxScore - b.score / b.maxScore);
  const worstText =
    sortedWeak.length === 0
      ? 'None'
      : sortedWeak.map((k) => `${k.name} (${k.score}/${k.maxScore})`).join(' · ');

  return (
    <div
      className="rounded-2xl p-5 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-5"
      style={{ background: C.ivory, border: `1px solid ${CA.goldSoft(0.35)}` }}
    >
      <div>
        <p
          className="text-[10px] uppercase tracking-[0.28em] font-semibold mb-2"
          style={{ color: 'hsl(150 45% 32%)', fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          ★ Strongest
        </p>
        <p
          className="leading-relaxed"
          style={{
            fontFamily: "'Cormorant Garamond', 'Crimson Pro', Georgia, serif",
            fontSize: '15px',
            color: C.brown,
          }}
        >
          {bestText}
        </p>
      </div>
      <div>
        <p
          className="text-[10px] uppercase tracking-[0.28em] font-semibold mb-2"
          style={{ color: 'hsl(6 60% 38%)', fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          ⚠ Needs attention
        </p>
        <p
          className="leading-relaxed"
          style={{
            fontFamily: "'Cormorant Garamond', 'Crimson Pro', Georgia, serif",
            fontSize: '15px',
            color: C.brown,
          }}
        >
          {worstText}
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Koota grid
// ─────────────────────────────────────────────────────────────

// Kootas where the "Boy · Girl" value line is meaningful to the user
const MEANINGFUL_VALUES = new Set(['Varna', 'Vashya', 'Tara', 'Yoni', 'Gana']);

function KootaGrid({ kootas }: { kootas: KootaScore[] }) {
  return (
    <div className="space-y-3">
      {kootas.map((k) => {
        const pct = k.maxScore > 0 ? k.score / k.maxScore : 0;
        const mark = pct >= 0.99 ? '✓' : pct >= 0.5 ? '◐' : '✗';

        const barColor =
          pct >= 0.99 ? 'hsl(150 45% 42%)'
          : pct >= 0.5 ? 'hsl(38 55% 48%)'
          : 'hsl(6 60% 48%)';

        const showValues = MEANINGFUL_VALUES.has(k.name) && (k.boy || k.girl);

        return (
          <div
            key={k.name}
            className="rounded-lg p-4"
            style={{ background: C.ivory, border: `1px solid ${CA.goldSoft(0.3)}` }}
          >
            <div className="flex items-baseline justify-between gap-3 mb-2">
              <div className="flex items-baseline gap-3">
                <span
                  className="font-bold"
                  style={{
                    fontFamily: "'Cormorant Garamond', 'Crimson Pro', Georgia, serif",
                    fontSize: '16px',
                    color: C.brown,
                    minWidth: '115px',
                  }}
                >
                  {k.name}
                </span>
                <span
                  className="text-[10px] uppercase tracking-wider hidden md:inline"
                  style={{ color: C.brownSoft, fontFamily: "'Inter', system-ui, sans-serif" }}
                >
                  {k.area}
                </span>
              </div>
              <div className="flex items-baseline gap-3">
                <span
                  style={{
                    fontFamily: 'ui-monospace, monospace',
                    fontSize: '13px',
                    color: C.brown,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {k.score}/{k.maxScore}
                </span>
                <span
                  style={{
                    fontSize: '14px',
                    color: barColor,
                    fontWeight: 700,
                    width: '14px',
                    textAlign: 'center',
                  }}
                >
                  {mark}
                </span>
              </div>
            </div>

            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: CA.goldSoft(0.2) }}>
              <div className="h-full" style={{ width: `${pct * 100}%`, background: barColor }} />
            </div>

            {showValues && (
              <p className="text-[11px] mt-2 font-mono" style={{ color: C.brownSoft }}>
                {k.boy} · {k.girl}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Dosha grid
// ─────────────────────────────────────────────────────────────

function DoshaGrid({
  doshaA,
  doshaB,
  nameA,
  nameB,
}: {
  doshaA: MangalDoshaDetail;
  doshaB: MangalDoshaDetail;
  nameA: string;
  nameB: string;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <DoshaCard name={nameA || 'Person A'} dosha={doshaA} />
      <DoshaCard name={nameB || 'Person B'} dosha={doshaB} />
    </div>
  );
}

function DoshaCard({ name, dosha }: { name: string; dosha: MangalDoshaDetail }) {
  const isCancelled = /cancell?ed/i.test(dosha.description);

  const tone: 'positive' | 'caution' | 'negative' | 'cancelled' =
    !dosha.hasDosha ? 'positive'
    : isCancelled ? 'cancelled'
    : dosha.isHigh ? 'negative'
    : 'caution';

  const palette = {
    positive: {
      border: 'hsl(150 45% 42% / 0.4)',
      bg: 'hsl(150 45% 42% / 0.04)',
      accent: 'hsl(150 45% 32%)',
      icon: '✓',
      label: 'Not present',
    },
    cancelled: {
      border: 'hsl(215 32% 44% / 0.35)',
      bg: 'hsl(215 32% 44% / 0.04)',
      accent: 'hsl(215 32% 34%)',
      icon: '⊘',
      label: 'Present · Cancelled',
    },
    caution: {
      border: 'hsl(38 55% 48% / 0.4)',
      bg: 'hsl(38 55% 48% / 0.04)',
      accent: 'hsl(38 55% 38%)',
      icon: '◐',
      label: 'Present',
    },
    negative: {
      border: 'hsl(6 60% 38% / 0.4)',
      bg: 'hsl(6 60% 38% / 0.04)',
      accent: 'hsl(6 60% 38%)',
      icon: '⚠',
      label: 'Present · High',
    },
  }[tone];

  return (
    <div
      className="rounded-xl p-5 space-y-2"
      style={{ border: `1px solid ${palette.border}`, background: palette.bg }}
    >
      <div className="flex items-baseline justify-between">
        <p
          className="font-bold"
          style={{
            fontFamily: "'Cormorant Garamond', 'Crimson Pro', Georgia, serif",
            fontSize: '17px',
            color: C.brown,
          }}
        >
          {name}
        </p>
        <span style={{ fontSize: '18px', color: palette.accent }}>
          {palette.icon}
        </span>
      </div>
      <p
        className="text-[10px] uppercase tracking-wider font-semibold"
        style={{ color: palette.accent, fontFamily: "'Inter', system-ui, sans-serif" }}
      >
        {palette.label}
      </p>
      <p
        className="text-sm leading-relaxed pt-1"
        style={{ color: C.brown, fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '14px' }}
      >
        {dosha.description}
      </p>
    </div>
  );
}