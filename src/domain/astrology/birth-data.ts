import type { Place } from '../geo/place';

export interface BirthData {
  id: string;
  profileName: string;
  localDate: string;
  localTime: string;
  place: Place;
  createdAt: string;
}
