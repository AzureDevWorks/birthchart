import type { Place } from '../geo/place';

export type ProfileRelation =
  | 'self'
  | 'family'
  | 'friend'
  | 'client'
  | 'other';

export interface BirthData {
  id: string;
  profileName: string;
  localDate: string;
  localTime: string;
  place: Place;
  createdAt: string;
  /** Relationship of this person to the master profile. */
  relation?: ProfileRelation;
  /** Optional free-form notes. */
  notes?: string;
}

export const RELATION_LABELS: Record<ProfileRelation, string> = {
  self: 'Self',
  family: 'Family',
  friend: 'Friend',
  client: 'Client',
  other: 'Other',
};