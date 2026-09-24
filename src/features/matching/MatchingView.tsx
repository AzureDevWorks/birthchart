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
} from '@/infrastructure/astrology/matching.adapter';
import { MANUSCRIPT as C, MANUSCRIPT_ALPHA as CA } from '@/features/report/lib/manuscript-colors';
import {
  KOOTA_INFO,
  verdictForKoota,
  MANGLIK_HOUSE_NAMES,
  KNOWLEDGE_BASE,
  type KootaInfo,
  type KootaVerdict,
} from './lib/matching-lib';
import type { BirthData } from '@/domain/astrology/birth-data';
import type { Place } from '@/domain/geo/place';

// ═══════════════════════════════════════════════════════════════
// Types & helpers
// ═══════════════════════════════════════════════════════════════

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

// ─── Score bands ───

interface Band {
  label: string;
  sanskrit: string;
  tone: 'excellent' | 'good' | 'average' | 'below' | 'poor';
  plain: string;
}

function bandFor(score: number): Band {
  if (score >= 32) return { label: 'Blessed Match', sanskrit: 'उत्तम', tone: 'excellent', plain: 'The rarest band. The two charts agree on almost every dimension. Proceed with confidence.' };
  if (score >= 28) return { label: 'Excellent Match', sanskrit: 'उत्तम मध्यम', tone: 'excellent', plain: 'A very strong score. Seven or eight kootas align. Recommended without hesitation.' };
  if (score >= 24) return { label: 'Good Match', sanskrit: 'मध्यम', tone: 'good', plain: 'A solid match with a caveat. One or two kootas may fall short. Consultation advised, not required.' };
  if (score >= 18) return { label: 'Average Match', sanskrit: 'सामान्य', tone: 'average', plain: 'Above the acceptance line, but harmony is not automatic. Deeper analysis (D9, 7th house, dashas) needed.' };
  if (score >= 13) return { label: 'Below Average', sanskrit: 'अधम मध्यम', tone: 'below', plain: 'Below the classical comfort line. A serious consultation is essential.' };
  if (score >= 7) return { label: 'Poor Match', sanskrit: 'अधम', tone: 'poor', plain: 'Well below the acceptance threshold. The tradition consistently advises against.' };
  return { label: 'Very Poor Match', sanskrit: 'अति अधम', tone: 'poor', plain: 'The lowest band. Classical texts strongly discourage.' };
}

// ═══════════════════════════════════════════════════════════════
// Main component
// ═══════════════════════════════════════════════════════════════

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
          className="text-sm max-w-2xl mx-auto leading-relaxed"
          style={{ color: C.brownSoft, fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '15px' }}
        >
          {t('matching.subtitle', {
            defaultValue:
              'The classical Ashtakoota Guna Milan — eight qualities of the Moon sign and birth nakshatra — read alongside Mangal Dosha, the classical caution regarding Mars.',
          })}
        </p>
      </div>

      {/* Two-person entry */}
      <OrnamentalDivider />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PersonForm label={t('matching.personA', { defaultValue: 'Person A' })} draft={draftA} onChange={setDraftA} />
        <PersonForm label={t('matching.personB', { defaultValue: 'Person B' })} draft={draftB} onChange={setDraftB} />
      </div>

      <div className="flex justify-center gap-3 pt-2">
        <Button onClick={handleMatch} disabled={!ready || busy} size="lg" className="px-8">
          {busy ? t('matching.calculating', { defaultValue: 'Calculating…' }) : t('matching.calculate', { defaultValue: 'Match' })}
        </Button>
        {result && <Button variant="outline" onClick={handleReset} size="lg">{t('matching.reset', { defaultValue: 'Reset' })}</Button>}
      </div>

      {error && (
        <div
          className="rounded-lg border px-4 py-3 text-sm"
          style={{ borderColor: CA.vermilion(0.35), background: CA.vermilion(0.05), color: C.vermilion }}
        >
          {error}
        </div>
      )}

      {/* Results */}
      {result && (
        <div id="matching-results" className="pt-8 space-y-6">
          <ScoreHeader result={result} />

          <OrnamentalDivider />

          {/* Eight kootas */}
          <Section
            eyebrow={t('matching.kootasEyebrow', { defaultValue: 'The Eight Kootas' })}
            title={t('matching.kootasTitle', { defaultValue: 'Guna Milan Breakdown' })}
          >
            <KootaHighlights kootas={result.kootas} />
            <div className="pt-5 space-y-3">
              {result.kootas.map((k) => (
                <KootaCard key={k.name} koota={k} />
              ))}
            </div>
          </Section>

          <OrnamentalDivider />

          {/* Mangal Dosha — redesigned */}
          <Section
            eyebrow={t('matching.doshaEyebrow', { defaultValue: 'Mangal Dosha' })}
            title={t('matching.doshaTitle', { defaultValue: 'Mars Check' })}
            hint={t('matching.doshaHint', {
              defaultValue:
                'Mangal Dosha (Kuja Dosha) is a classical caution — Mars in one of the marriage-sensitive houses. The tradition is subtler than most apps admit: severity depends on the house, the chart system, and roughly thirty cancellation rules.',
            })}
          >
            <MangalExplainer />
            <div className="pt-5 space-y-4">
              <MangalPersonCard name={draftA.name || 'Person A'} dosha={result.dosha.boy} />
              <MangalPersonCard name={draftB.name || 'Person B'} dosha={result.dosha.girl} />
            </div>
            <MangalJointVerdict doshaA={result.dosha.boy} doshaB={result.dosha.girl} />
          </Section>

          <OrnamentalDivider />

          {/* Knowledge base */}
          <KnowledgePanel />
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Person form (unchanged)
// ═══════════════════════════════════════════════════════════════

function PersonForm({ label, draft, onChange }: { label: string; draft: Draft; onChange: (d: Draft) => void }) {
  const { t } = useTranslation();
  return (
    <div className="rounded-2xl p-6 space-y-4" style={{ background: C.ivory, border: `1px solid ${CA.goldSoft(0.4)}` }}>
      <p className="text-[10px] uppercase tracking-[0.3em] font-semibold" style={{ color: C.gold, fontFamily: "'Inter', system-ui, sans-serif" }}>
        {label}
      </p>

      <div className="space-y-2">
        <Label htmlFor={`name-${label}`} className="text-xs">{t('matching.name', { defaultValue: 'Name' })}</Label>
        <Input
          id={`name-${label}`}
          value={draft.name}
          onChange={(e) => onChange({ ...draft, name: e.target.value })}
          placeholder={t('matching.namePlaceholder', { defaultValue: 'Full name' })}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs">{t('matching.date', { defaultValue: 'Birth Date' })}</Label>
        <BirthDateField value={draft.date} onChange={(iso) => onChange({ ...draft, date: iso })} minYear={1900} maxYear={new Date().getFullYear()} />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`time-${label}`} className="text-xs">{t('matching.time', { defaultValue: 'Birth Time' })}</Label>
        <Input id={`time-${label}`} type="time" step="1" value={draft.time} onChange={(e) => onChange({ ...draft, time: e.target.value })} />
      </div>

      <div className="space-y-2">
        <Label className="text-xs">{t('matching.place', { defaultValue: 'Birth Place' })}</Label>
        {draft.place ? (
          <PlacePreview place={draft.place} localDate={draft.date} localTime={draft.time} onChange={() => onChange({ ...draft, place: null })} />
        ) : (
          <PlaceCombobox value={null} onChange={(p) => onChange({ ...draft, place: p })} />
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Score header
// ═══════════════════════════════════════════════════════════════

function ScoreHeader({ result }: { result: MatchingResult }) {
  const { t } = useTranslation();
  const band = bandFor(result.totalScore);
  const pct = result.totalScore / result.maxScore;

  const accentColor =
    band.tone === 'excellent' ? 'hsl(150 45% 32%)'
    : band.tone === 'good' ? C.gold
    : band.tone === 'average' ? C.vermilion
    : 'hsl(6 60% 38%)';

  const borderColor =
    band.tone === 'excellent' ? 'hsl(150 45% 42% / 0.35)'
    : band.tone === 'good' ? CA.gold(0.4)
    : band.tone === 'average' ? CA.vermilion(0.35)
    : 'hsl(6 60% 38% / 0.35)';

  const bgColor =
    band.tone === 'excellent' ? 'hsl(150 45% 42% / 0.04)'
    : band.tone === 'good' ? CA.gold(0.04)
    : band.tone === 'average' ? CA.vermilion(0.04)
    : 'hsl(6 60% 38% / 0.04)';

  // Library verdict — split headline from detail
  const [headline, ...rest] = result.verdict.split(/[-,]\s+/);
  const detail = rest.join(', ');

  // Detect koota doshas
  const nadiDosha = result.kootas.find((k) => k.name === 'Nadi' && k.score === 0);
  const bhakootDosha = result.kootas.find((k) => k.name === 'Bhakoot' && k.score === 0);
  const yoniHostile = result.kootas.find((k) => k.name === 'Yoni' && k.score === 0);
  const varnaMismatch = result.kootas.find((k) => k.name === 'Varna' && k.score === 0);
  const ganaMismatch = result.kootas.find((k) => k.name === 'Gana' && k.score === 0);

  const doshas = [
    nadiDosha && { key: 'nadi', label: 'Nadi Dosha', text: 'Nadi Koot is at zero — the heaviest of the eight factors, governing health and progeny. Classical tradition considers a match inauspicious when Nadi is unfavourable, even at 28+ points.' },
    bhakootDosha && { key: 'bhakoot', label: 'Bhakoot Dosha', text: 'Bhakoot Koot is at zero, affecting family and emotional prosperity. Classical texts advise serious consultation when this fails.' },
    ganaMismatch && { key: 'gana', label: 'Gana Mismatch', text: 'The two temperaments lie at opposite ends of the Gana scale — Deva and Rakshasa, or Rakshasa and Deva. Friction in daily life is likely; conscious practice is required.' },
    yoniHostile && { key: 'yoni', label: 'Yoni Hostility', text: 'The two nakshatra animals are classical enemies. This affects physical and intimate compatibility; it is considered a real but remediable signal.' },
    varnaMismatch && { key: 'varna', label: 'Varna Mismatch', text: "The bride's Varna is higher than the groom's. The tradition views this as an ego/hierarchy imbalance in the union." },
  ].filter(Boolean) as { key: string; label: string; text: string }[];

  return (
    <div className="space-y-6 pt-4">
      {/* Score ring */}
      <div className="text-center space-y-3">
        <p className="text-[10px] uppercase tracking-[0.4em] font-semibold" style={{ color: C.gold, fontFamily: "'Inter', system-ui, sans-serif" }}>
          {t('matching.scoreEyebrow', { defaultValue: 'Guna Milan Score' })}
        </p>
        <div className="flex items-baseline justify-center gap-3">
          <p className="leading-none font-bold" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(3.5rem, 8vw, 5.5rem)', color: C.brown, fontVariantNumeric: 'tabular-nums' }}>
            {result.totalScore}
          </p>
          <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: C.brownSoft }}>
            / {result.maxScore}
          </p>
        </div>

        <div className="max-w-md mx-auto h-2 rounded-full overflow-hidden" style={{ background: CA.goldSoft(0.25) }}>
          <div className="h-full transition-all" style={{ width: `${Math.min(100, Math.max(0, pct * 100))}%`, background: accentColor }} />
        </div>

        <div className="space-y-1 pt-2">
          <p className="font-bold" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.15rem, 2vw, 1.4rem)', color: C.brown }}>
            {headline}
          </p>
          {detail && (
            <p className="text-sm italic" style={{ color: C.brownSoft, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
              {detail}
            </p>
          )}
        </div>
      </div>

      {/* Band pill */}
      <div className="text-center pt-1">
        <div className="inline-block rounded-full px-5 py-2" style={{ border: `1px solid ${borderColor}`, background: bgColor }}>
          <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '15px', fontWeight: 600, color: accentColor, marginRight: '8px' }}>
            {band.label}
          </span>
          <span style={{ fontFamily: "'Tiro Devanagari Sanskrit', 'Noto Serif Devanagari', serif", fontSize: '13px', color: C.brownSoft }}>
            {band.sanskrit}
          </span>
        </div>
      </div>

      {/* Dosha detection banners */}
      {doshas.length > 0 && (
        <div className="space-y-2.5 max-w-3xl mx-auto">
          {doshas.map((d) => (
            <div
              key={d.key}
              className="rounded-xl border p-4 flex items-start gap-3"
              style={{ borderColor: CA.vermilion(0.3), background: CA.vermilion(0.04) }}
            >
              <span style={{ fontSize: '18px', color: C.vermilion, lineHeight: 1, marginTop: 2 }}>⚠</span>
              <div className="space-y-1">
                <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, color: C.vermilion }}>
                  {d.label}
                </p>
                <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '15px', color: C.brown, lineHeight: 1.5 }}>
                  {d.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Plain-terms reading */}
      <div className="rounded-2xl p-6 md:p-8 max-w-3xl mx-auto" style={{ background: C.ivory, border: `1px solid ${CA.goldSoft(0.4)}` }}>
        <p className="text-[10px] uppercase tracking-[0.3em] font-semibold mb-3" style={{ color: C.gold, fontFamily: "'Inter', system-ui, sans-serif" }}>
          {t('matching.plainTermsEyebrow', { defaultValue: 'In plain terms' })}
        </p>
        <p className="leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '16px', color: C.brown }}>
          {band.plain}
        </p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Koota highlights
// ═══════════════════════════════════════════════════════════════

function KootaHighlights({ kootas }: { kootas: KootaScore[] }) {
  const perfect = kootas.filter((k) => k.score >= k.maxScore);
  const imperfect = kootas.filter((k) => k.score < k.maxScore);

  const bestText = perfect.length === kootas.length
    ? 'All eight kootas at full marks'
    : perfect.length > 0
      ? perfect.map((k) => `${k.name} (${k.score}/${k.maxScore})`).join(' · ')
      : '—';

  const sortedWeak = [...imperfect].sort((a, b) => (a.score / a.maxScore) - (b.score / b.maxScore));
  const worstText = sortedWeak.length === 0
    ? 'None — every koota is at full marks'
    : sortedWeak.map((k) => `${k.name} (${k.score}/${k.maxScore})`).join(' · ');

  return (
    <div className="rounded-2xl p-5 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-5" style={{ background: C.ivory, border: `1px solid ${CA.goldSoft(0.35)}` }}>
      <div>
        <p className="text-[10px] uppercase tracking-[0.28em] font-semibold mb-2" style={{ color: 'hsl(150 45% 32%)', fontFamily: "'Inter', system-ui, sans-serif" }}>
          ★ Strongest
        </p>
        <p className="leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '15px', color: C.brown }}>
          {bestText}
        </p>
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-[0.28em] font-semibold mb-2" style={{ color: C.vermilion, fontFamily: "'Inter', system-ui, sans-serif" }}>
          ⚠ Needs attention
        </p>
        <p className="leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '15px', color: C.brown }}>
          {worstText}
        </p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Koota card — with learn panel
// ═══════════════════════════════════════════════════════════════

function KootaCard({ koota }: { koota: KootaScore }) {
  const [showLearn, setShowLearn] = useState(false);
  const pct = koota.maxScore > 0 ? koota.score / koota.maxScore : 0;
  const verdict: KootaVerdict = verdictForKoota(koota.score, koota.maxScore);
  const info: KootaInfo | undefined = KOOTA_INFO[koota.name];

  const tone = verdict.tone;
  const accentColor = tone === 'positive' ? 'hsl(150 45% 42%)' : tone === 'neutral' ? C.gold : 'hsl(6 60% 48%)';
  const borderColor = tone === 'positive' ? 'hsl(150 45% 42% / 0.4)' : tone === 'neutral' ? CA.gold(0.4) : CA.vermilion(0.4);

  const showValues = Boolean(koota.boy || koota.girl) && koota.boy !== koota.girl;

  return (
    <div className="rounded-xl" style={{ background: C.ivory, border: `1px solid ${borderColor}` }}>
      <div className="p-5 space-y-3">
        {/* Header row */}
        <div className="flex items-baseline justify-between gap-3 flex-wrap">
          <div className="flex items-baseline gap-3 flex-wrap">
            <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '18px', fontWeight: 700, color: C.brown, minWidth: '120px' }}>
              {koota.name}
            </span>
            {info && (
              <span style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: C.brownSoft }}>
                {info.area}
              </span>
            )}
          </div>
          <div className="flex items-baseline gap-3">
            <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '14px', color: C.brown, fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>
              {koota.score}/{koota.maxScore}
            </span>
            <span
              className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded font-bold"
              style={{ color: accentColor, border: `1px solid ${borderColor}`, fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              {verdict.label}
            </span>
          </div>
        </div>

        {/* Score bar */}
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: CA.goldSoft(0.2) }}>
          <div className="h-full" style={{ width: `${pct * 100}%`, background: accentColor }} />
        </div>

        {/* Values */}
        {showValues && (
          <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '12px', color: C.brownSoft }}>
            <span style={{ opacity: 0.7 }}>Boy:</span> <strong style={{ color: C.brown }}>{koota.boy}</strong>
            <span className="mx-2" style={{ opacity: 0.4 }}>·</span>
            <span style={{ opacity: 0.7 }}>Girl:</span> <strong style={{ color: C.brown }}>{koota.girl}</strong>
          </p>
        )}

        {/* Learn toggle */}
        {info && (
          <button
            type="button"
            onClick={() => setShowLearn((v) => !v)}
            className="text-[10px] uppercase tracking-[0.2em] font-semibold transition-colors"
            style={{ color: C.gold, fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            {showLearn ? '▴ Hide' : '▾ What this means'}
          </button>
        )}
      </div>

      {/* Learn panel */}
      {showLearn && info && (
        <div
          className="px-5 py-4 space-y-3"
          style={{ borderTop: `1px solid ${CA.goldSoft(0.3)}`, background: CA.ivoryDeep(0.4) }}
        >
          <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '14px', color: C.brown, lineHeight: 1.6 }}>
            {info.rule}
          </p>
          <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '10px', color: C.brownSoft }}>
            <span style={{ opacity: 0.7 }}>Weight:</span> {info.weight === 'heavy' ? 'Heavy (traditional priority)' : info.weight === 'medium' ? 'Medium' : 'Light'}
            <span className="mx-2">·</span>
            <span style={{ opacity: 0.7 }}>Maximum:</span> {info.maxScore} {info.maxScore === 1 ? 'point' : 'points'}
          </p>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Mangal Dosha — Explainer
// ═══════════════════════════════════════════════════════════════

function MangalExplainer() {
  return (
    <div className="rounded-2xl p-6 md:p-7 space-y-4 max-w-3xl mx-auto" style={{ background: C.ivory, border: `1px solid ${CA.goldSoft(0.4)}` }}>
      <p className="text-[10px] uppercase tracking-[0.3em] font-semibold" style={{ color: C.gold, fontFamily: "'Inter', system-ui, sans-serif" }}>
        What this means
      </p>
      <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '16px', color: C.brown, lineHeight: 1.65 }}>
        Mangal Dosha fires when Mars occupies one of six houses — counted from the Lagna in the Rashi chart: <strong>I, II, IV, VII, VIII, XII</strong>. These correspond to the body, the family, the home, the marriage, transformation, and the bed. The dosha is considered stronger when Mars is also undignified and unaffected by Jupiter or the Moon. It is largely neutralised when Mars is in its own sign or exalted, aspected by Jupiter, or matched by a similarly placed Mars in the partner's chart.
      </p>
      <div className="flex flex-wrap gap-2 pt-2">
        {MANGLIK_HOUSES_SORTED.map((h) => (
          <span key={h} className="text-[11px] font-mono px-2.5 py-1 rounded" style={{ border: `1px solid ${CA.goldSoft(0.4)}`, color: C.brown }}>
            {h} · {MANGLIK_HOUSE_NAMES[h]}
          </span>
        ))}
      </div>
      <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '14px', color: C.brownSoft, fontStyle: 'italic', lineHeight: 1.6 }}>
        Of the roughly thirty classical cancellation rules, a serious reading weighs the most commonly cited: Mars in own sign, Mars exalted, Mars in moolatrikona, Mars conjunct or aspected by Jupiter, and the partner also being Manglik — in which case the two doshas cancel one another.
      </p>
    </div>
  );
}

const MANGLIK_HOUSES_SORTED = [1, 2, 4, 7, 8, 12];

// ═══════════════════════════════════════════════════════════════
// Mangal Dosha — Person card
// ═══════════════════════════════════════════════════════════════

function MangalPersonCard({ name, dosha }: { name: string; dosha: any }) {
  // Accept either the new classical shape or the legacy library shape.
  const hasRashi = Boolean(dosha.rashiHasDosha ?? dosha.hasDosha);
  const isCancelled = Boolean(dosha.isCancelled);
  const chalitVariant = Boolean(dosha.chalitHasDosha && !hasRashi);
  const marsHouse = dosha.rashiMarsHouse ?? dosha.marsHouse ?? 0;
  const marsDignity = dosha.marsDignity ?? 'neutral';
  const marsRashi = dosha.marsRashiName ?? '—';
  const cancellationReason = dosha.cancellationReason;

  // Determine the display state
  let icon = '✓';
  let tone: 'positive' | 'cancelled' | 'mild' | 'warning' | 'negative' = 'positive';
  let headline = 'Not Manglik';
  let sub = `Mars in House ${marsHouse} · ${marsRashi} · ${marsDignity}`;

  if (hasRashi && !isCancelled) {
    icon = marsHouse === 7 ? '⚠' : '◐';
    tone = marsHouse === 7 ? 'negative' : 'warning';
    headline = marsHouse === 7 ? 'Manglik · Significant' : 'Manglik';
  } else if (hasRashi && isCancelled) {
    icon = '⊘';
    tone = 'cancelled';
    headline = 'Present · Cancelled';
  } else if (chalitVariant) {
    icon = '◐';
    tone = 'mild';
    headline = 'Not Manglik · Rashi';
    sub = `${sub} · Chalit variant: House ${dosha.chalitMarsHouse}`;
  }

  const palette = {
    positive:   { border: 'hsl(150 45% 42% / 0.4)',  bg: 'hsl(150 45% 42% / 0.04)',  accent: 'hsl(150 45% 32%)' },
    cancelled:  { border: 'hsl(215 32% 44% / 0.4)',  bg: 'hsl(215 32% 44% / 0.04)',  accent: 'hsl(215 32% 34%)' },
    mild:       { border: CA.gold(0.4),              bg: CA.gold(0.04),              accent: 'hsl(38 55% 38%)' },
    warning:    { border: CA.vermilion(0.35),        bg: CA.vermilion(0.04),         accent: C.vermilion },
    negative:   { border: 'hsl(6 60% 38% / 0.45)',   bg: 'hsl(6 60% 38% / 0.05)',    accent: 'hsl(6 60% 38%)' },
  }[tone];

  return (
    <div className="rounded-2xl p-6 space-y-3 max-w-3xl mx-auto" style={{ border: `1px solid ${palette.border}`, background: palette.bg }}>
      {/* Name + icon */}
      <div className="flex items-baseline justify-between gap-3">
        <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '18px', fontWeight: 700, color: C.brown }}>
          {name}
        </p>
        <span style={{ fontSize: '20px', color: palette.accent, lineHeight: 1 }}>
          {icon}
        </span>
      </div>

      {/* Headline */}
      <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, color: palette.accent }}>
        {headline}
      </p>

      {/* Sub-line */}
      <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '15px', color: C.brown }}>
        {sub}
      </p>

      {/* Cancellation note */}
      {cancellationReason && (
        <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '14px', color: C.brownSoft, fontStyle: 'italic' }}>
          Cancellation: {cancellationReason}
        </p>
      )}

      {/* Chalit variant detail */}
      {chalitVariant && dosha.chalitDescription && (
        <div className="pt-2 border-t" style={{ borderColor: CA.goldSoft(0.3) }}>
          <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, color: C.gold, marginBottom: 4 }}>
            Chalit variant
          </p>
          <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '14px', color: C.brownSoft, lineHeight: 1.55 }}>
            {dosha.chalitDescription}
          </p>
        </div>
      )}

      {/* Library legacy description (only if no classical data) */}
      {!dosha.rashiHasDosha && dosha.description && (
        <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '13px', color: C.brownSoft, fontStyle: 'italic' }}>
          {dosha.description}
        </p>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Mangal Dosha — Joint verdict
// ═══════════════════════════════════════════════════════════════

function MangalJointVerdict({ doshaA, doshaB }: { doshaA: any; doshaB: any }) {
  const aManglik = Boolean(doshaA.rashiHasDosha ?? doshaA.hasDosha) && !doshaA.isCancelled;
  const bManglik = Boolean(doshaB.rashiHasDosha ?? doshaB.hasDosha) && !doshaB.isCancelled;

  let title = 'Both charts clear';
  let body = 'Neither native carries classical Mangal Dosha. No remedy is strictly required. If the couple wishes to be traditional, a simple Ganesha or Hanuman puja before the wedding is customary and well-regarded.';

  if (aManglik && bManglik) {
    title = 'Both Manglik — traditional cancellation';
    body = "Both charts carry classical Mangal Dosha. The classical texts consider this a mutual cancellation — the two Marses absorb each other's heat. This is considered auspicious, not alarming.";
  } else if (aManglik || bManglik) {
    title = 'One partner carries the dosha';
    body = "One chart carries classical Mangal Dosha; the other is clear. Classical remedies apply: Kumbh Vivah (symbolic marriage to a pot before the wedding), Hanuman Chalisa on Tuesdays, and Maha Mrityunjaya japa. In many traditions, the union proceeds with these remedies and careful attention to the 7th house in the Manglik partner's chart.";
  } else if (doshaA.chalitHasDosha || doshaB.chalitHasDosha) {
    title = 'Both clear in Rashi · Chalit variant only';
    body = 'Neither chart shows classical (Rashi-based) Mangal Dosha. One or both charts carry a mild Chalit-based variant. Most traditions weigh this lightly.';
  }

  return (
    <div className="rounded-2xl p-6 md:p-7 max-w-3xl mx-auto space-y-3" style={{ background: C.ivory, border: `1px solid ${CA.goldSoft(0.4)}` }}>
      <p className="text-[10px] uppercase tracking-[0.3em] font-semibold" style={{ color: C.gold, fontFamily: "'Inter', system-ui, sans-serif" }}>
        The joint reading
      </p>
      <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '18px', fontWeight: 700, color: C.brown }}>
        {title}
      </p>
      <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '15px', color: C.brown, lineHeight: 1.65 }}>
        {body}
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Knowledge Base
// ═══════════════════════════════════════════════════════════════

function KnowledgePanel() {
  const [open, setOpen] = useState(false);
  const entries = [
    KNOWLEDGE_BASE.gunaMilan,
    KNOWLEDGE_BASE.scoreInterpretation,
    KNOWLEDGE_BASE.doshas,
    KNOWLEDGE_BASE.methodology,
  ];

  return (
    <div className="rounded-2xl" style={{ background: C.ivory, border: `1px solid ${CA.goldSoft(0.4)}` }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full px-6 py-4 flex items-center justify-between gap-3 text-left"
      >
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] font-semibold" style={{ color: C.gold, fontFamily: "'Inter', system-ui, sans-serif" }}>
            Knowledge Base
          </p>
          <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '18px', fontWeight: 700, color: C.brown, marginTop: 4 }}>
            About this analysis
          </p>
        </div>
        <span style={{ color: C.brownSoft, fontSize: '18px' }}>{open ? '▴' : '▾'}</span>
      </button>
      {open && (
        <div className="px-6 py-4 space-y-5 border-t" style={{ borderColor: CA.goldSoft(0.3) }}>
          {entries.map((e) => (
            <div key={e.title} className="space-y-1.5">
              <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, color: C.gold }}>
                {e.title}
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '15px', color: C.brown, lineHeight: 1.65 }}>
                {e.body}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}