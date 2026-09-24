/**
 * Tracks the user's current location — where they are right now,
 * as opposed to where they were born.
 *
 * Used by time-sensitive tabs: Panchang, Festivals, Gochar.
 *
 * Priority of sources (highest to lowest):
 *   1. user-set    — user explicitly picked a city; NEVER auto-overwritten
 *   2. geolocation — precise GPS coords (future)
 *   3. tz-detect   — inferred from browser timezone; refreshed each boot
 *   4. fallback    — UTC/Greenwich if nothing else works
 */

import type { Place } from '@/domain/geo/place';
import {
  UTC_FALLBACK,
  findCityForTimezone,
  type TimezoneCityEntry,
} from './timezone-cities';

export type LocationSource = 'user-set' | 'geolocation' | 'tz-detect' | 'fallback';

export interface UserLocation extends Place {
  source: LocationSource;
  updatedAt: string;
}

const STORAGE_KEY = 'kundaliyatra-current-location';

// ─────────────────────────────────────────────────────────────────────
// Reactive subscription layer
// Components call subscribeUserLocation() to be notified when the
// location changes — whether from the same tab or a different one.
// ─────────────────────────────────────────────────────────────────────

const listeners = new Set<() => void>();

function notify(): void {
  for (const fn of listeners) {
    try {
      fn();
    } catch {
      // listener threw; ignore and continue
    }
  }
}

/** Subscribe to location changes. Returns an unsubscribe fn. */
export function subscribeUserLocation(fn: () => void): () => void {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

// Cross-tab sync: when another tab writes the key, notify this tab.
if (typeof window !== 'undefined' && window.addEventListener) {
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) notify();
  });
}

// ─── Helpers ────────────────────────────────────────────────

function tzEntryToPlace(entry: TimezoneCityEntry): Place {
  return {
    id: entry.id,
    label: entry.label,
    shortLabel: entry.shortLabel,
    lat: entry.lat,
    lon: entry.lon,
    timezone: entry.tz,
    countryCode: entry.countryCode,
    admin1: entry.admin1,
    placeType: entry.placeType,
  };
}

function getBrowserTimezone(): string | null {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || null;
  } catch {
    return null;
  }
}

// ─── Detection ──────────────────────────────────────────────

/**
 * Detects location from the browser's IANA timezone.
 * Falls back to UTC/Greenwich if the timezone isn't in our table.
 */
export function detectFromTimezone(): UserLocation {
  const tz = getBrowserTimezone();

  if (tz) {
    const entry = findCityForTimezone(tz);
    if (entry) {
      return {
        ...tzEntryToPlace(entry),
        source: 'tz-detect',
        updatedAt: new Date().toISOString(),
      };
    }
  }

  return {
    ...tzEntryToPlace(UTC_FALLBACK),
    source: 'fallback',
    updatedAt: new Date().toISOString(),
  };
}

// ─── Storage ────────────────────────────────────────────────

function readFromStorage(): UserLocation | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as UserLocation;
    if (
      !parsed ||
      typeof parsed.lat !== 'number' ||
      typeof parsed.timezone !== 'string' ||
      typeof parsed.id !== 'string'
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function writeToStorage(loc: UserLocation): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(loc));
  } catch {
    // localStorage might be disabled (private mode) — silently ignore
  }
}

// ─── Public API ─────────────────────────────────────────────

/**
 * Returns the user's current location.
 *
 * On each call:
 *   - If a user-set location exists, returns it (never overwritten).
 *   - If an auto-detected location exists and its timezone still matches
 *     the browser's timezone, returns it.
 *   - Otherwise re-detects from timezone and caches the result.
 */
export function getUserLocation(): UserLocation {
  const stored = readFromStorage();

  // 1. User-set locations are always returned as-is
  if (stored && stored.source === 'user-set') {
    return stored;
  }

  // 2. Check if the stored auto-detected location still matches the browser
  const browserTz = getBrowserTimezone();
  if (stored && stored.source === 'tz-detect' && stored.timezone === browserTz) {
    return stored;
  }

  // 3. Otherwise re-detect
  const detected = detectFromTimezone();
  writeToStorage(detected);
  return detected;
}

/**
 * Explicitly set the user's current location. Marks it as user-set
 * so it will never be auto-overwritten.
 */
export function setUserLocation(place: Place): UserLocation {
  const loc: UserLocation = {
    ...place,
    source: 'user-set',
    updatedAt: new Date().toISOString(),
  };
  writeToStorage(loc);
  return loc;
}

/**
 * Clear the user's current location. Next call to getUserLocation()
 * will re-detect from timezone.
 */
export function clearUserLocation(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

/**
 * Force a re-detection from timezone, ignoring any cached user-set
 * preference. Used by the "Reset to detected" button in the pill.
 */
export function resetToDetected(): UserLocation {
  const detected = detectFromTimezone();
  writeToStorage(detected);
  return detected;
}