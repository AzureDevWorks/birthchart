import type { Place } from './place';

export type PlaceSearchResult = Omit<Place, 'timezone'>;

export interface GeocoderPort {
  search(query: string, signal: AbortSignal): Promise<PlaceSearchResult[]>;
}
