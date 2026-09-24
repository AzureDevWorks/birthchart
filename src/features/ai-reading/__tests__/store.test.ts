import { describe, it, expect } from 'vitest';
import { hashProfile, makeReadingKey, readingId } from '../store';
import type { BirthData } from '@/domain/astrology/birth-data';

function makeProfile(overrides: Partial<BirthData> = {}): BirthData {
  const basePlace = {
    id: 'osm:1234',
    label: 'New Delhi, India',
    shortLabel: 'New Delhi',
    lat: 28.6139,
    lon: 77.209,
    timezone: 'Asia/Kolkata',
    countryCode: 'in',
    admin1: 'Delhi',
    placeType: 'city' as const,
  };
  return {
    id: 'test-1',
    profileName: 'Test User',
    localDate: '1998-05-21',
    localTime: '06:30:00',
    place: basePlace,
    createdAt: '2026-01-01T00:00:00.000Z',
    ...overrides,
  };
}

// ─── hashProfile ─────────────────────────────────────────────────────

describe('hashProfile', () => {
  it('is deterministic across calls', () => {
    const p = makeProfile();
    expect(hashProfile(p)).toBe(hashProfile(p));
  });

  it('returns a non-empty base-36 string', () => {
    const h = hashProfile(makeProfile());
    expect(typeof h).toBe('string');
    expect(h.length).toBeGreaterThan(0);
    expect(h).toMatch(/^[0-9a-z]+$/);
  });

  it('changes when the name changes', () => {
    expect(hashProfile(makeProfile())).not.toBe(
      hashProfile(makeProfile({ profileName: 'Other User' }))
    );
  });

  it('changes when the date changes', () => {
    expect(hashProfile(makeProfile())).not.toBe(
      hashProfile(makeProfile({ localDate: '1999-01-01' }))
    );
  });

  it('changes when the coordinates change at the 4th decimal', () => {
    const a = hashProfile(makeProfile());
    const b = hashProfile(
      makeProfile({
        place: { ...makeProfile().place, lat: 28.614 },
      })
    );
    expect(a).not.toBe(b);
  });

  it('changes when the timezone changes', () => {
    const a = hashProfile(makeProfile());
    const b = hashProfile(
      makeProfile({
        place: { ...makeProfile().place, timezone: 'Asia/Kathmandu' },
      })
    );
    expect(a).not.toBe(b);
  });

  it('ignores the profile id', () => {
    expect(hashProfile(makeProfile({ id: 'x' }))).toBe(
      hashProfile(makeProfile({ id: 'y' }))
    );
  });

  it('ignores createdAt', () => {
    expect(hashProfile(makeProfile({ createdAt: '2026-01-01T00:00:00Z' }))).toBe(
      hashProfile(makeProfile({ createdAt: '2027-06-15T12:00:00Z' }))
    );
  });
});

// ─── makeReadingKey ──────────────────────────────────────────────────

describe('makeReadingKey (deprecated shim)', () => {
  it('returns the same identity as readingId', () => {
    const p = makeProfile();
    const viaKey = makeReadingKey(p, 'career', '3.0.0', 'analytical', 'English', 2500);
    const viaId = readingId(hashProfile(p), 'career');
    expect(viaKey).toBe(viaId);
  });

  it('is stable across calls', () => {
    const p = makeProfile();
    expect(makeReadingKey(p, 'career')).toBe(makeReadingKey(p, 'career'));
  });

  it('differs per category', () => {
    const p = makeProfile();
    expect(makeReadingKey(p, 'career')).not.toBe(makeReadingKey(p, 'marriage'));
  });
});
