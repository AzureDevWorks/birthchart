import { useEffect, useState } from 'react';
import {
  getUserLocation,
  subscribeUserLocation,
  type UserLocation,
} from './user-location';

/**
 * Reactive current location. Components using this hook re-render
 * whenever the location changes — from this tab, another tab, or
 * from a call to setUserLocation / resetToDetected / clearUserLocation.
 */
export function useUserLocation(): UserLocation {
  const [loc, setLoc] = useState<UserLocation>(() => getUserLocation());

  useEffect(() => {
    // Re-sync in case the location changed between the initial render
    // and the subscription being attached.
    setLoc(getUserLocation());
    return subscribeUserLocation(() => setLoc(getUserLocation()));
  }, []);

  return loc;
}