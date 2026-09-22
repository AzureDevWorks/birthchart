import { useEffect, useState } from 'react';
import type { GeocoderPort, PlaceSearchResult } from '@/domain/geo/port';

export type PlaceSearchState =
  | { status: 'idle'; results: PlaceSearchResult[] }
  | { status: 'loading'; results: PlaceSearchResult[] }
  | { status: 'success'; results: PlaceSearchResult[] }
  | { status: 'empty'; results: PlaceSearchResult[] }
  | { status: 'error'; results: PlaceSearchResult[]; error: string };

const IDLE: PlaceSearchState = { status: 'idle', results: [] };

export function usePlaceSearch(
  geocoder: GeocoderPort,
  query: string,
  options: { debounceMs?: number; minChars?: number } = {}
): PlaceSearchState {
  const { debounceMs = 300, minChars = 2 } = options;
  const [state, setState] = useState<PlaceSearchState>(IDLE);

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < minChars) {
      setState(IDLE);
      return;
    }

    const ctrl = new AbortController();
    const timer = setTimeout(async () => {
      setState((s) => ({ status: 'loading', results: s.results }));
      try {
        const results = await geocoder.search(trimmed, ctrl.signal);
        if (ctrl.signal.aborted) return;
        setState({
          status: results.length === 0 ? 'empty' : 'success',
          results,
        });
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
        setState({
          status: 'error',
          results: [],
          error: (err as Error).message ?? 'Search failed',
        });
      }
    }, debounceMs);

    return () => {
      clearTimeout(timer);
      ctrl.abort();
    };
  }, [query, geocoder, debounceMs, minChars]);

  return state;
}
