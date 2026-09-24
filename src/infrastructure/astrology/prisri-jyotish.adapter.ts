import { DateTime } from 'luxon';
import {
  getKundli,
  Observer,
  getChalitChart,
  getPanchangamDetails,
  getGhatikaChart,
  getHoraLagnaChart,
  getBhavaLagnaChart,
  getInduLagnaChart,
} from '@prisri/jyotish';
import type { Kundli, KundliConfig } from '@prisri/jyotish';
import type { BirthData } from '@/domain/astrology/birth-data';
import type { JyotishPort, ChalitChartData, ChalitMethod, PanchangamData } from '@/domain/astrology/port';

const DEFAULT_CONFIG: KundliConfig = {
  ayanamsa: 'lahiri',
  houseSystem: 'whole_sign',
  includeChalit: true,
  includeKp: true,
  includeSpecialLagnas: true,
  includeArudhas: true,
  includeReferenceCharts: true,
};

export class BirthDataError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BirthDataError';
  }
}

export const prisriJyotish: JyotishPort = {
  calculate(data, config = DEFAULT_CONFIG): Kundli {
    const dt = DateTime.fromISO(`${data.localDate}T${data.localTime}`, {
      zone: data.place.timezone,
    });

    if (!dt.isValid) {
      throw new BirthDataError(`Invalid birth datetime: ${dt.invalidReason ?? 'unknown'}`);
    }

    const observer = new Observer(data.place.lat, data.place.lon, 0);
    return getKundli(dt.toJSDate(), observer, config);
  },

  getChalit(kundli: Kundli, method: ChalitMethod): ChalitChartData {
    return (getChalitChart as any)(kundli, method) as ChalitChartData;
  },

  getPanchangam(date: Date, lat: number, lon: number): PanchangamData {
    const observer = new Observer(lat, lon, 0);
    return (getPanchangamDetails as any)(date, observer) as PanchangamData;
  },
};

export function previewBirthInstant(data: BirthData): {
  iso: string;
  utc: string;
  offset: string;
} {
  const dt = DateTime.fromISO(`${data.localDate}T${data.localTime}`, {
    zone: data.place.timezone,
  });
  if (!dt.isValid) throw new BirthDataError(`Invalid: ${dt.invalidReason}`);
  return {
    iso: dt.toISO() ?? '',
    utc: dt.toUTC().toISO() ?? '',
    offset: dt.toFormat('ZZ'),
  };
}

// ─────────────────────────────────────────────────────────────────────
// Special (derived) charts
// Each of these treats a specific special lagna as House 1 and re-places
// every planet accordingly. Computed on-demand — cheap, but not part of
// the default Kundli payload, so they are not touched until asked for.
// ─────────────────────────────────────────────────────────────────────

export interface SpecialChartsBundle {
  ghatika: any | null;
  hora:    any | null;
  bhava:   any | null;
  indu:    any | null;
}

function safeChart<T>(fn: () => T): T | null {
  try {
    const out = fn();
    return out ?? null;
  } catch {
    return null;
  }
}

export function getSpecialCharts(kundli: Kundli): SpecialChartsBundle {
  return {
    ghatika: safeChart(() => getGhatikaChart(kundli)),
    hora:    safeChart(() => getHoraLagnaChart(kundli)),
    bhava:   safeChart(() => getBhavaLagnaChart(kundli)),
    indu:    safeChart(() => getInduLagnaChart(kundli)),
  };
}