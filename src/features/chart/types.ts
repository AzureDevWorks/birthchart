export type ChartStyle = 'north' | 'south';

export interface ChartHouse {
  number: number;
  rashi: string;
  planets: ChartPlanetPlacement[];
}

export interface ChartPlanetPlacement {
  planet: string;
  /** Abbreviation to display — resolved by caller based on language */
  abbr: string;
  degree: number;
  isRetrograde: boolean;
  isCombust: boolean;
  isAscendant?: boolean;
}

export interface VedicChartProps {
  style: ChartStyle;
  houses: ChartHouse[];
  size?: number;
  onPlanetClick?: (planet: string, house: number) => void;
  onHouseClick?: (house: number) => void;
  selectedPlanet?: string | null;
  ariaLabel?: string;
  className?: string;
  /** Language code — determines Devanagari vs English abbreviations */
  lang?: 'en' | 'hi' | 'ne';
}
