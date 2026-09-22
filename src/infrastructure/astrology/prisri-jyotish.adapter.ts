import { DateTime } from 'luxon';
import { getKundli, Observer, getChalitChart, getPanchangamDetails } from '@prisri/jyotish';
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