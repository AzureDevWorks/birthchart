import type { BirthData } from '@/domain/astrology/birth-data';
import { useReadingStore, hashProfile } from '@/features/ai-reading/store';
import { listSituations } from '@/ai/core';
import { useDailyRashiStore } from '@/features/dashboard/lib/daily-rashi-store';
import type { SectionId } from './sections';
import type { ReadingEntry } from './pages';

export interface GeneratePdfOptions {
  sections: Set<SectionId>;
  ayanamsa?: string;
  houseSystem?: string;
  dailyRashiEntries?: Array<{ date: string; headline?: string; action?: string; avoid?: string; text: string }>;
}

export interface PdfResult {
  bytes: number;
  filename: string;
}

function safeName(name: string): string {
  return name.replace(/[^a-z0-9]+/gi, '_').replace(/^_+|_+$/g, '');
}

function collectReadings(profile: BirthData): ReadingEntry[] {
  const hash = hashProfile(profile);
  const records = useReadingStore.getState().records;
  const out: ReadingEntry[] = [];

  for (const rec of Object.values(records)) {
    if ((rec as { profileHash?: string }).profileHash !== hash) continue;
    const categoryId = (rec as { categoryId?: string }).categoryId;
    if (!categoryId) continue;
    const meta = (() => {
    const found = listSituations().find((x) => x.situation.id === categoryId)?.situation;
    return found ? { title: found.label, sanskrit: found.meta?.sanskrit } : undefined;
  })();
    out.push({
      categoryTitle: meta?.title ?? categoryId,
      sanskrit: meta?.sanskrit,
      text: (rec as { text?: string }).text ?? '',
      wordCount: (rec as { wordCount?: number }).wordCount ?? 0,
      generatedAt: (rec as { generatedAt?: string }).generatedAt ?? new Date().toISOString(),
      providerId: (rec as { providerId?: string }).providerId,
      modelId: (rec as { modelId?: string }).modelId,
    });
  }

  const order = listSituations().map((x) => x.situation.id);
  out.sort((a, b) => {
    const ai = order.findIndex((k) => {
    const found = listSituations().find((x) => x.situation.id === k)?.situation;
    return found?.label === a.categoryTitle;
  });
    const bi = order.findIndex((k) => {
    const found = listSituations().find((x) => x.situation.id === k)?.situation;
    return found?.label === b.categoryTitle;
  });
    return ai - bi;
  });
  return out;
}

function collectDailyRashi(profile: BirthData): Array<{ date: string; headline?: string; action?: string; avoid?: string; text: string }> {
  const hash = hashProfile(profile);
  const records = useDailyRashiStore.getState().records;
  const out: Array<{ date: string; headline?: string; action?: string; avoid?: string; text: string }> = [];

  for (const rec of Object.values(records)) {
    if ((rec as { profileHash?: string }).profileHash !== hash) continue;
    out.push({
      date: (rec as { date?: string }).date ?? '',
      headline: (rec as { headline?: string }).headline,
      action: (rec as { action?: string }).action,
      avoid: (rec as { avoid?: string }).avoid,
      text: (rec as { text?: string }).text ?? '',
    });
  }
  out.sort((a, b) => b.date.localeCompare(a.date));
  return out.slice(0, 7);
}

export async function generateKundliPdf(
  profile: BirthData,
  kundli: Record<string, any>,
  options: GeneratePdfOptions
): Promise<PdfResult> {
  const [{ pdf }, { KundliReport }] = await Promise.all([
    import('@react-pdf/renderer'),
    import('./KundliReport'),
  ]);

  const readings = options.sections.has('readings') ? collectReadings(profile) : [];
  const dailyRashi = options.sections.has('dailyRashi') ? collectDailyRashi(profile) : [];

  const doc = (
    <KundliReport
      profile={profile}
      kundli={kundli}
      sections={options.sections}
      readings={readings}
      dailyRashi={dailyRashi}
      ayanamsa={options.ayanamsa ?? 'lahiri'}
      houseSystem={options.houseSystem ?? 'whole_sign'}
    />
  );

  const blob = await pdf(doc as any).toBlob();

  const filename =
    safeName(profile.profileName) + '_Kundali_' +
    new Date().toISOString().slice(0, 10) + '.pdf';

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  return { bytes: blob.size, filename };
}

export function countReadings(profile: BirthData): number {
  return collectReadings(profile).length;
}

// ────────────────────────────────────────────────────────────────────────
// Section mapping: every export section either produces a page, feeds a
// page, or is honestly labeled JSON-only in the UI. No silent drops.
// ────────────────────────────────────────────────────────────────────────

export function mapExportSectionsToReport(
  selected: Set<string>
): Set<SectionId> {
  const out = new Set<SectionId>();

  // Always
  out.add('cover');

  // Kundli feeds the core chart pages
  if (selected.has('kundli')) {
    out.add('anchors');
    out.add('d1');
    out.add('planetary');
    out.add('houses');
    out.add('fourCharts');
    out.add('dasha');
  }

  // Reference charts and arudha padas feed existing pages — nothing new
  // to add; their parent page fires anyway if kundli / specialLagnas is on.

  // Direct pages
  if (selected.has('specialLagnas') || selected.has('arudhaPadas')) out.add('specialLagnas');
  if (selected.has('specialCharts')) out.add('specialCharts');
  if (selected.has('vargas')) out.add('vargas');
  if (selected.has('chalit') || selected.has('chalitAnalysis')) out.add('chalit');
  if (selected.has('drishti')) out.add('aspects');
  if (selected.has('ashtakavarga')) out.add('ashtakavarga');
  if (selected.has('kp')) out.add('kp');

  // Time pages
  if (selected.has('panchangBirth') || selected.has('panchangNow')) out.add('panchang');
  if (selected.has('gochar')) out.add('gochar');
  if (selected.has('festivals')) out.add('festivals');

  // Predictions
  if (selected.has('career') || selected.has('wealth') || selected.has('marriage')) out.add('predictions');
  if (selected.has('jaimini')) out.add('jaimini');
  if (selected.has('kpAnalysis')) out.add('kpAnalysis');
  if (selected.has('remedies')) out.add('remedies');
  if (selected.has('lalKitab')) out.add('lalKitab');

  // Nakshatra reads off the Moon — include if kundli is on
  if (selected.has('kundli')) out.add('nakshatra');

  // Personal
  if (selected.has('dailyRashi')) out.add('dailyRashi');
  if (selected.has('readings')) out.add('readings');

  // TOC if we have more than cover
  if (out.size > 1) out.add('toc');

  return out;
}

export type { SectionId } from './sections';
export type { ReadingEntry } from './pages';