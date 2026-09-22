import type { Kundli, KundliConfig } from '@prisri/jyotish';
import type { BirthData } from './birth-data';

export interface ChalitPlanet {
  name: string;
  longitude: number;
  degree: number;
  minute: number;
  second: number;
  rashi: number;
  rashiName: string;
  rashiHouse: number;
  house: number;
  shifted: number;
  housePosition: number;
  housePositionDegree: number;
  housePositionMinute: number;
  percentage: number;
  isRetrograde: boolean;
  isCombust: boolean;
}

export interface ChalitCusp {
  houseNumber: number;
  startLongitude: number;
  endLongitude: number;
  rashi: number;
  rashiName: string;
}

export interface ChalitChartData {
  system: string;
  planets: ChalitPlanet[];
  housesCusps: ChalitCusp[];
}

// The library's PanchangamDetails shape (from types.d.ts)
export interface PanchangamTime {
  start?: Date | string;
  end?: Date | string;
  name?: string;
}

export interface PanchangamData {
  tithi?: { name: string; number?: number; index?: number };
  paksha?: string;
  vara?: { name: string; number?: number };
  nakshatra?: { name: string; number?: number };
  nakshatraPada?: number;
  yoga?: { name: string; number?: number };
  karana?: { name: string; number?: number };
  sunrise?: Date | string;
  sunset?: Date | string;
  rahuKalam?: PanchangamTime;
  abhijitMuhurta?: PanchangamTime;
  brahmaMuhurta?: PanchangamTime;
  currentHora?: { lord: string };
}

export type ChalitMethod = 'sripati' | 'equal_house';

export interface JyotishPort {
  calculate(data: BirthData, config?: KundliConfig): Kundli;
  getChalit(kundli: Kundli, method: ChalitMethod): ChalitChartData;
  getPanchangam(date: Date, lat: number, lon: number): PanchangamData;
}
