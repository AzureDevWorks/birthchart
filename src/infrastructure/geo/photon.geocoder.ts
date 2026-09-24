import type { GeocoderPort, PlaceSearchResult } from '@/domain/geo/port';

interface PhotonFeature {
  properties: {
    osm_id: number;
    osm_type?: string;
    name?: string;
    city?: string;
    district?: string;
    state?: string;
    country?: string;
    countrycode?: string;
    type?: string;
  };
  geometry: {
    coordinates: [number, number];
  };
}

const ALLOWED = new Set(['city', 'town', 'village', 'municipality', 'district']);

function buildLabel(p: PhotonFeature['properties']): string {
  return [p.name ?? p.city, p.state, p.country].filter(Boolean).join(', ');
}

function buildShortLabel(p: PhotonFeature['properties']): string {
  const primary = p.name ?? p.city ?? p.district ?? 'Unknown';
  return p.state ? `${primary}, ${p.state}` : primary;
}

export const photonGeocoder: GeocoderPort = {
  async search(query, signal) {
    const url =
      'https://photon.komoot.io/api/?' +
      new URLSearchParams({ q: query, limit: '8', lang: 'en' }).toString();

    const res = await fetch(url, { signal });
    if (!res.ok) throw new Error(`Geocoder failed: ${res.status}`);

    const data: { features: PhotonFeature[] } = await res.json();

    return data.features
      .filter((f) => ALLOWED.has(f.properties.type ?? ''))
      .map<PlaceSearchResult>((f) => ({
        id: `osm:${(f.properties.osm_type ?? 'N')[0]}${f.properties.osm_id}`,
        label: buildLabel(f.properties),
        shortLabel: buildShortLabel(f.properties),
        lat: f.geometry.coordinates[1],
        lon: f.geometry.coordinates[0],
        countryCode: f.properties.countrycode,
        admin1: f.properties.state,
        placeType:
          f.properties.type === 'city' ||
          f.properties.type === 'town' ||
          f.properties.type === 'village'
            ? (f.properties.type as 'city' | 'town' | 'village')
            : 'unknown',
      }));
  },
};
