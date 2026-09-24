import type { BirthData } from '@/domain/astrology/birth-data';
import type { UserLocation } from '@/lib/user-location';
import {
  prisriJyotish,
  getSpecialCharts,
} from '@/infrastructure/astrology/prisri-jyotish.adapter';
import { gocharAdapter } from '@/infrastructure/astrology/gochar.adapter';
import { predictionsAdapter } from '@/infrastructure/astrology/predictions.adapter';
import {
  calculateBirthPanchang,
  calculateNowPanchang,
} from '@/infrastructure/astrology/panchang.adapter';
import { festivalsAdapter } from '@/infrastructure/astrology/festivals.adapter';
import { hashProfile, useReadingStore } from '@/features/ai-reading/store';
import { useDailyRashiStore } from '@/features/dashboard/lib/daily-rashi-store';
import type { SectionId, ExportOptions } from './sections';

export interface ExportError {
  section: SectionId;
  message: string;
}

export interface ExportBundle {
  _app: 'kundaliyatra-export';
  _version: 1;
  _exportedAt: string;
  _meta: {
    profileName: string;
    profileId: string;
    locationShort: string | null;
    locationTimezone: string | null;
    config: {
      ayanamsa: string;
      houseSystem: string;
      chalitMethod: string;
    };
    sections: SectionId[];
    errors: ExportError[];
  };
  profile: BirthData;
  location: UserLocation | null;
  sections: Partial<Record<SectionId, unknown>>;
}

function safe<T>(
  errors: ExportError[],
  section: SectionId,
  fn: () => T
): T | null {
  try {
    const value = fn();
    return (value ?? null) as T | null;
  } catch (e) {
    errors.push({
      section,
      message: (e as Error)?.message ?? String(e),
    });
    return null;
  }
}

export function buildExportBundle(
  profile: BirthData,
  location: UserLocation | null,
  selected: Set<SectionId>,
  options: ExportOptions
): ExportBundle {
  const errors: ExportError[] = [];
  const sections: Partial<Record<SectionId, unknown>> = {};

  // Always compute fresh. No cache lookup.
  const kundli = prisriJyotish.calculate(profile, {
    ayanamsa: options.ayanamsa,
    houseSystem: options.houseSystem,
    includeChalit: true,
    includeKp: true,
    includeSpecialLagnas: true,
    includeArudhas: true,
    includeReferenceCharts: true,
  });
  const k: any = kundli;
  const now = new Date();

  // The chalit method follows the user's house-system choice when it maps
  // to a chalit method; otherwise we default to the classical Sripati.
  const chalitMethod: 'sripati' | 'equal_house' =
    options.houseSystem === 'equal_house' ? 'equal_house' : 'sripati';

  // Chart
  if (selected.has('kundli')) {
    sections.kundli = k;
  }
  if (selected.has('specialLagnas')) {
    sections.specialLagnas = safe(errors, 'specialLagnas', () => k.specialLagnas);
  }
  if (selected.has('specialCharts')) {
    sections.specialCharts = safe(errors, 'specialCharts', () => getSpecialCharts(k));
  }
  if (selected.has('referenceCharts')) {
    sections.referenceCharts = safe(errors, 'referenceCharts', () => ({
      chandraKundli: k.chandraKundli ?? null,
      suryaKundli: k.suryaKundli ?? null,
    }));
  }
  if (selected.has('vargas')) {
    sections.vargas = safe(errors, 'vargas', () => k.vargas);
  }

  // Refinements
  if (selected.has('arudhaPadas')) {
    sections.arudhaPadas = safe(errors, 'arudhaPadas', () => k.arudhaPadas);
  }
  if (selected.has('drishti')) {
    sections.drishti = safe(errors, 'drishti', () => k.drishti);
  }
  if (selected.has('ashtakavarga')) {
    sections.ashtakavarga = safe(errors, 'ashtakavarga', () => k.ashtakavarga);
  }
  if (selected.has('chalit')) {
    sections.chalit = safe(errors, 'chalit', () =>
      prisriJyotish.getChalit(k, chalitMethod)
    );
  }
  if (selected.has('kp')) {
    sections.kp = safe(errors, 'kp', () => k.kp);
  }

  // Time
  if (selected.has('panchangBirth')) {
    sections.panchangBirth = safe(errors, 'panchangBirth', () =>
      calculateBirthPanchang(profile)
    );
  }
  if (selected.has('panchangNow') && location) {
    sections.panchangNow = safe(errors, 'panchangNow', () =>
      calculateNowPanchang(location)
    );
  }
  if (selected.has('gochar')) {
    sections.gochar = safe(errors, 'gochar', () => gocharAdapter.analyze(k, now));
  }
  if (selected.has('festivals') && location) {
    sections.festivals = safe(errors, 'festivals', () =>
      festivalsAdapter.getForMonth(location, now.getFullYear(), now.getMonth(), 'en')
    );
  }

  // Predictions
  if (selected.has('career')) {
    sections.career = safe(errors, 'career', () => predictionsAdapter.career(k));
  }
  if (selected.has('wealth')) {
    sections.wealth = safe(errors, 'wealth', () => predictionsAdapter.wealth(k));
  }
  if (selected.has('marriage')) {
    sections.marriage = safe(errors, 'marriage', () => predictionsAdapter.marriage(k));
  }
  if (selected.has('jaimini')) {
    sections.jaimini = safe(errors, 'jaimini', () => predictionsAdapter.jaimini(k));
  }
  if (selected.has('chalitAnalysis')) {
    sections.chalitAnalysis = safe(errors, 'chalitAnalysis', () =>
      predictionsAdapter.chalit(k)
    );
  }
  if (selected.has('kpAnalysis')) {
    sections.kpAnalysis = safe(errors, 'kpAnalysis', () => predictionsAdapter.kp(k));
  }
  if (selected.has('lalKitab')) {
    sections.lalKitab = safe(errors, 'lalKitab', () => predictionsAdapter.lalKitab(k));
  }
  if (selected.has('remedies')) {
    sections.remedies = safe(errors, 'remedies', () => predictionsAdapter.remedies(k));
  }
  if (selected.has('comprehensive')) {
    sections.comprehensive = safe(errors, 'comprehensive', () =>
      predictionsAdapter.comprehensive(k)
    );
  }

  // Personal — matched by profile hash. If the entered birth data does not
  // match any saved profile, these will be empty objects.
  if (selected.has('readings')) {
    sections.readings = safe(errors, 'readings', () => {
      const hash = hashProfile(profile);
      const all = useReadingStore.getState().records;
      const out: Record<string, unknown> = {};
      for (const [id, rec] of Object.entries(all)) {
        if (rec.profileHash === hash) out[id] = rec;
      }
      return out;
    });
  }
  if (selected.has('dailyRashi')) {
    sections.dailyRashi = safe(errors, 'dailyRashi', () => {
      const hash = hashProfile(profile);
      const all = useDailyRashiStore.getState().records;
      const out: Record<string, unknown> = {};
      for (const [id, rec] of Object.entries(all)) {
        if (rec.profileHash === hash) out[id] = rec;
      }
      return out;
    });
  }

  return {
    _app: 'kundaliyatra-export',
    _version: 1,
    _exportedAt: new Date().toISOString(),
    _meta: {
      profileName: profile.profileName,
      profileId: profile.id,
      locationShort: location?.shortLabel ?? null,
      locationTimezone: location?.timezone ?? null,
      config: {
        ayanamsa: options.ayanamsa,
        houseSystem: options.houseSystem,
        chalitMethod,
      },
      sections: Array.from(selected),
      errors,
    },
    profile,
    location,
    sections,
  };
}

export interface DownloadResult {
  bytes: number;
  errors: number;
  filename: string;
}

export function downloadExportBundle(
  profile: BirthData,
  location: UserLocation | null,
  selected: Set<SectionId>,
  options: ExportOptions
): DownloadResult {
  const bundle = buildExportBundle(profile, location, selected, options);
  const json = JSON.stringify(bundle, null, 2);

  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;

  const stamp = new Date().toISOString().slice(0, 10);
  const safeName = profile.profileName
    .replace(/[^a-z0-9]+/gi, '-')
    .toLowerCase();
  const filename =
    'kundaliyatra-export-' + safeName + '-' +
    options.ayanamsa + '-' + options.houseSystem + '-' +
    stamp + '.json';

  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  return {
    bytes: json.length,
    errors: bundle._meta.errors.length,
    filename,
  };
}