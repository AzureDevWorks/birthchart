import { DateTime } from 'luxon';
import { getKundli, Observer, getChalitChart, getPanchangamDetails } from '@prisri/jyotish';
import type { Kundli, KundliConfig } from '@prisri/jyotish';
import type { BirthData } from '@/domain/astrology/birth-data';
import type { JyotishPort } from '@/domain/astrology/port';

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
    // Build the exact instant the library expects.
    // Example: localDate="1995-05-15", localTime="14:30", tz="Asia/Kolkata"
    //   ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ dt.toJSDate() = new Date('1995-05-15T14:30:00+05:30')
    const dt = DateTime.fromISO(`${data.localDate}T${data.localTime}`, {
      zone: data.place.timezone,
    });

    if (!dt.isValid) {
      throw new BirthDataError(`Invalid birth datetime: ${dt.invalidReason ?? 'unknown'}`);
    }

    const observer = new Observer(data.place.lat, data.place.lon, 0);
    return getKundli(dt.toJSDate(), observer, config);
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
