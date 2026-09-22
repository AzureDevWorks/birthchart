export interface Place {
  id: string;
  label: string;
  shortLabel: string;
  lat: number;
  lon: number;
  timezone: string;
  countryCode?: string;
  admin1?: string;
  placeType: 'city' | 'town' | 'village' | 'unknown';
}

export function isValidLatitude(lat: number): boolean {
  return Number.isFinite(lat) && lat >= -90 && lat <= 90;
}

export function isValidLongitude(lon: number): boolean {
  return Number.isFinite(lon) && lon >= -180 && lon <= 180;
}

export function isValidTimezone(tz: string): boolean {
  try {
    Intl.DateTimeFormat(undefined, { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}

export function isPlaceValid(place: unknown): place is Place {
  if (!place || typeof place !== 'object') return false;
  const p = place as Place;
  return (
    isValidLatitude(p.lat) &&
    isValidLongitude(p.lon) &&
    isValidTimezone(p.timezone) &&
    typeof p.label === 'string' &&
    p.label.trim().length > 0
  );
}
