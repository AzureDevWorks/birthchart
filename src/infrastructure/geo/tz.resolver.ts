import tzlookup from 'tz-lookup';
import { isValidTimezone } from '@/domain/geo/place';

export interface TzResolution {
  timezone: string;
  fallbackUsed: boolean;
}

export function resolveTimezone(lat: number, lon: number): TzResolution {
  try {
    const tz = tzlookup(lat, lon);
    if (isValidTimezone(tz)) return { timezone: tz, fallbackUsed: false };
  } catch {
    // fall through
  }
  return { timezone: 'UTC', fallbackUsed: true };
}
