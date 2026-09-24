import type { ChartHouse, ChartPlanetPlacement } from '../types';

const MAIN_PLANETS = [
  'Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter',
  'Venus', 'Saturn', 'Rahu', 'Ketu',
];

const RASHI_NAMES = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];

interface RawPlanet {
  rashi?: number;
  rashiName?: string;
  degree?: number;
  minute?: number;
  isRetrograde?: boolean;
  isCombust?: boolean;
}

interface RawVarga {
  ascendant?: { rashi?: number; rashiName?: string };
  planets?: Record<string, RawPlanet>;
  houses?: Array<{
    number: number;
    rashi?: number;
    planets?: string[];
  }>;
}

interface RawKundli {
  ascendant?: { rashiName?: string; degree?: number };
  planets?: Record<string, RawPlanet>;
  houses?: Array<{
    number: number;
    rashi?: number;
    planets?: string[];
  }>;
  vargas?: Record<string, RawVarga>;
}

interface BuildOptions {
  resolveAbbr: (planet: string) => string;
}

function rashiLabel(num: number | undefined, name: string | undefined): string {
  if (name) return name;
  if (num && num >= 1 && num <= 12) return RASHI_NAMES[num - 1];
  return '';
}

/**
 * Convert library houses into our ChartHouse[].
 * Works for both the main chart (from kundli.houses/planets)
 * and any varga (from kundli.vargas.dN.houses/planets).
 */
function buildFromHouses(
  houses: RawVarga['houses'] = [],
  planets: Record<string, RawPlanet> = {},
  ascendant: { rashi?: number; rashiName?: string; degree?: number } | undefined,
  options: BuildOptions
): ChartHouse[] {
  const planetsByHouse: Record<number, string[]> = {};
  for (const h of houses) {
    planetsByHouse[h.number] = h.planets ?? [];
  }

  return houses.map((h) => {
    const housePlanets: ChartPlanetPlacement[] = [];

    // Ascendant marker in House 1
    if (h.number === 1 && ascendant) {
      housePlanets.push({
        planet: 'Ascendant',
        abbr: options.resolveAbbr('Ascendant'),
        degree: Math.floor(ascendant.degree ?? 0),
        isRetrograde: false,
        isCombust: false,
        isAscendant: true,
      });
    }

    // Planets in this house
    for (const planetName of planetsByHouse[h.number] ?? []) {
      if (!MAIN_PLANETS.includes(planetName)) continue;
      const p = planets[planetName];
      if (!p) continue;
      housePlanets.push({
        planet: planetName,
        abbr: options.resolveAbbr(planetName),
        degree: Math.floor(p.degree ?? 0),
        isRetrograde: !!p.isRetrograde,
        isCombust: !!p.isCombust,
        isAscendant: false,
      });
    }

    return {
      number: h.number,
      rashi: rashiLabel(h.rashi, undefined),
      planets: housePlanets,
    };
  });
}

/**
 * Build chart houses for the D1 (main) chart.
 */
export function buildChartHouses(
  kundli: RawKundli,
  options: BuildOptions
): ChartHouse[] {
  return buildFromHouses(
    kundli.houses,
    kundli.planets,
    kundli.ascendant,
    options
  );
}

/**
 * Build chart houses for a specific varga (d9, d10, etc.).
 * Uses the simple { rashi, rashiName } shape from kundli.vargas.dN.
 */
export function buildVargaHouses(
  kundli: RawKundli,
  vargaCode: string,
  options: BuildOptions
): ChartHouse[] {
  const varga = kundli.vargas?.[vargaCode];
  if (!varga) return [];

  // If the varga has full houses[] (like d1), use them directly
  if (varga.houses && varga.houses.length > 0) {
    return buildFromHouses(
      varga.houses,
      varga.planets,
      varga.ascendant,
      options
    );
  }

  // Otherwise, construct houses from the simplified varga
  // (each planet has only rashi/rashiName; we group by rashi to assign houses)
  const ascRashi = varga.ascendant?.rashi ?? 1;

  const planetSigns: Record<string, number> = {};
  for (const [name, p] of Object.entries(varga.planets ?? {})) {
    if (MAIN_PLANETS.includes(name) && p.rashi) {
      planetSigns[name] = p.rashi;
    }
  }

  // Compute house for each planet: house = ((rashi - ascRashi + 12) % 12) + 1
  const planetsByHouse: Record<number, string[]> = {};
  for (let h = 1; h <= 12; h++) planetsByHouse[h] = [];

  for (const [name, rashi] of Object.entries(planetSigns)) {
    const house = ((rashi - ascRashi + 12) % 12) + 1;
    planetsByHouse[house].push(name);
  }

  // Build houses
  const result: ChartHouse[] = [];
  for (let h = 1; h <= 12; h++) {
    const houseRashi = ((ascRashi + h - 2) % 12) + 1;
    const housePlanets: ChartPlanetPlacement[] = [];

    if (h === 1 && varga.ascendant) {
      housePlanets.push({
        planet: 'Ascendant',
        abbr: options.resolveAbbr('Ascendant'),
        degree: 0,
        isRetrograde: false,
        isCombust: false,
        isAscendant: true,
      });
    }

    for (const planetName of planetsByHouse[h]) {
      const p = varga.planets?.[planetName];
      if (!p) continue;
      housePlanets.push({
        planet: planetName,
        abbr: options.resolveAbbr(planetName),
        degree: Math.floor(p.degree ?? 0),
        isRetrograde: !!p.isRetrograde,
        isCombust: !!p.isCombust,
        isAscendant: false,
      });
    }

    result.push({
      number: h,
      rashi: rashiLabel(houseRashi, undefined),
      planets: housePlanets,
    });
  }

  return result;
}

/**
 * Build chart houses for a reference chart (Chandra Kundli or Surya Kundli).
 * These come from kundli.chandraKundli / kundli.suryaKundli, which have
 * the same shape as varga charts.
 */
export function buildReferenceChartHouses(
  kundli: RawKundli,
  type: 'chandra' | 'surya',
  options: BuildOptions
): ChartHouse[] {
  const ref =
    type === 'chandra'
      ? (kundli as any).chandraKundli
      : (kundli as any).suryaKundli;

  if (!ref) return [];

  // Reference charts use the same shape as vargas: { ascendant, planets, houses }
  if (ref.houses && ref.houses.length > 0) {
    return buildFromHouses(ref.houses, ref.planets, ref.ascendant, options);
  }

  // Fallback: build from planets' rashi values
  const ascRashi = ref.ascendant?.rashi ?? 1;
  const planetSigns: Record<string, number> = {};
  for (const [name, p] of Object.entries(ref.planets ?? {})) {
    if (MAIN_PLANETS.includes(name) && (p as any).rashi) {
      planetSigns[name] = (p as any).rashi;
    }
  }

  const planetsByHouse: Record<number, string[]> = {};
  for (let h = 1; h <= 12; h++) planetsByHouse[h] = [];
  for (const [name, rashi] of Object.entries(planetSigns)) {
    const house = ((rashi - ascRashi + 12) % 12) + 1;
    planetsByHouse[house].push(name);
  }

  const result: ChartHouse[] = [];
  for (let h = 1; h <= 12; h++) {
    const houseRashi = ((ascRashi + h - 2) % 12) + 1;
    const housePlanets: ChartPlanetPlacement[] = [];

    if (h === 1 && ref.ascendant) {
      housePlanets.push({
        planet: 'Ascendant',
        abbr: options.resolveAbbr('Ascendant'),
        degree: 0,
        isRetrograde: false,
        isCombust: false,
        isAscendant: true,
      });
    }

    for (const planetName of planetsByHouse[h]) {
      const p = ref.planets?.[planetName];
      if (!p) continue;
      housePlanets.push({
        planet: planetName,
        abbr: options.resolveAbbr(planetName),
        degree: Math.floor((p as any).degree ?? 0),
        isRetrograde: !!(p as any).isRetrograde,
        isCombust: !!(p as any).isCombust,
        isAscendant: false,
      });
    }

    result.push({
      number: h,
      rashi: rashiLabel(houseRashi, undefined),
      planets: housePlanets,
    });
  }

  return result;
}

/**
 * Build ChartHouse[] for the Chalit chart.
 * Takes a Chalit result (from JyotishPort.getChalit) and produces
 * houses with planets placed by Chalit house number.
 */
export function buildChalitChartHouses(
  chalit: {
    planets: Array<{
      name: string;
      rashiHouse: number;
      house: number;
      degree: number;
      isRetrograde?: boolean;
      isCombust?: boolean;
    }>;
    housesCusps?: Array<{
      houseNumber: number;
      rashi: number;
      rashiName: string;
    }>;
  },
  resolveAbbr: (planet: string) => string
): ChartHouse[] {
  const RASHI_NAMES = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
  ];

  // Group planets by Chalit house
  const planetsByHouse: Record<number, Array<{
    name: string;
    degree: number;
    isRetrograde: boolean;
    isCombust: boolean;
    isAscendant: boolean;
  }>> = {};

  for (let h = 1; h <= 12; h++) planetsByHouse[h] = [];

  for (const p of chalit.planets ?? []) {
    if (!planetsByHouse[p.house]) planetsByHouse[p.house] = [];
    planetsByHouse[p.house].push({
      name: p.name,
      degree: Math.floor(p.degree ?? 0),
      isRetrograde: !!p.isRetrograde,
      isCombust: !!p.isCombust,
      isAscendant: false,
    });
  }

  // Build houses — each house gets the rashi of its cusp (if provided),
  // else derive from the house number assuming whole-sign from Lagna.
  const result: ChartHouse[] = [];
  for (let h = 1; h <= 12; h++) {
    const cusp = chalit.housesCusps?.find((c) => c.houseNumber === h);
    const rashiNum = cusp?.rashi ?? h;
    const rashiName = cusp?.rashiName ?? RASHI_NAMES[(rashiNum - 1 + 12) % 12];

    const housePlanets: ChartPlanetPlacement[] = [];

    // Ascendant marker
    if (h === 1) {
      housePlanets.push({
        planet: 'Ascendant',
        abbr: resolveAbbr('Ascendant'),
        degree: 0,
        isRetrograde: false,
        isCombust: false,
        isAscendant: true,
      });
    }

    for (const p of planetsByHouse[h] ?? []) {
      housePlanets.push({
        planet: p.name,
        abbr: resolveAbbr(p.name),
        degree: p.degree,
        isRetrograde: p.isRetrograde,
        isCombust: p.isCombust,
        isAscendant: false,
      });
    }

    result.push({
      number: h,
      rashi: rashiName,
      planets: housePlanets,
    });
  }

  return result;
}

/**
 * Build ChartHouse[] for any of the special (derived) charts:
 * Ghatika, Hora, Bhava, or Indu Lagna. These have the same shape as
 * a varga — { ascendant, planets, houses } — so the logic mirrors
 * buildFromHouses with a fallback for charts that omit `houses[]`.
 */
export function buildSpecialChartHouses(
  chart: any,
  options: BuildOptions
): ChartHouse[] {
  if (!chart) return [];

  // Preferred path — the library gives us full houses[]
  if (Array.isArray(chart.houses) && chart.houses.length > 0) {
    return buildFromHouses(
      chart.houses,
      chart.planets ?? {},
      chart.ascendant,
      options
    );
  }

  // Fallback — synthesize houses from each planet's rashi
  const ascRashi: number =
    typeof chart?.ascendant?.rashi === 'number' ? chart.ascendant.rashi : 1;

  const planetsByHouse: Record<number, string[]> = {};
  for (let h = 1; h <= 12; h++) planetsByHouse[h] = [];

  for (const [name, p] of Object.entries(chart.planets ?? {})) {
    if (!MAIN_PLANETS.includes(name)) continue;
    const rashi = (p as any)?.rashi;
    if (typeof rashi !== 'number') continue;
    const house = ((rashi - ascRashi + 12) % 12) + 1;
    planetsByHouse[house].push(name);
  }

  const result: ChartHouse[] = [];
  for (let h = 1; h <= 12; h++) {
    const houseRashi = ((ascRashi + h - 2) % 12) + 1;
    const housePlanets: ChartPlanetPlacement[] = [];

    if (h === 1 && chart.ascendant) {
      housePlanets.push({
        planet: 'Ascendant',
        abbr: options.resolveAbbr('Ascendant'),
        degree: 0,
        isRetrograde: false,
        isCombust: false,
        isAscendant: true,
      });
    }

    for (const name of planetsByHouse[h]) {
      const p = chart.planets?.[name];
      if (!p) continue;
      housePlanets.push({
        planet: name,
        abbr: options.resolveAbbr(name),
        degree: Math.floor(p.degree ?? 0),
        isRetrograde: !!p.isRetrograde,
        isCombust: !!p.isCombust,
        isAscendant: false,
      });
    }

    result.push({
      number: h,
      rashi: rashiLabel(houseRashi, undefined),
      planets: housePlanets,
    });
  }

  return result;
}