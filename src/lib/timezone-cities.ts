/**
 * Timezone → nearest major city lookup.
 * Auto-detects the user's current location from their browser's IANA
 * timezone (Intl.DateTimeFormat().resolvedOptions().timeZone).
 *
 * If a user's timezone isn't in this table, we fall back to UTC / Greenwich.
 */

export interface TimezoneCityEntry {
  tz: string;
  id: string;
  label: string;
  shortLabel: string;
  lat: number;
  lon: number;
  countryCode: string;
  admin1: string;
  placeType: 'city';
}

export const TIMEZONE_CITIES: TimezoneCityEntry[] = [
  // ─── Americas ───
  { tz: 'America/New_York',           id: 'tz:new-york',        label: 'New York, United States',    shortLabel: 'New York',    lat: 40.7128,  lon: -74.0060,  countryCode: 'us', admin1: 'New York',        placeType: 'city' },
  { tz: 'America/Chicago',            id: 'tz:chicago',         label: 'Chicago, United States',     shortLabel: 'Chicago',     lat: 41.8781,  lon: -87.6298,  countryCode: 'us', admin1: 'Illinois',        placeType: 'city' },
  { tz: 'America/Denver',             id: 'tz:denver',          label: 'Denver, United States',      shortLabel: 'Denver',      lat: 39.7392,  lon: -104.9903, countryCode: 'us', admin1: 'Colorado',        placeType: 'city' },
  { tz: 'America/Los_Angeles',        id: 'tz:los-angeles',     label: 'Los Angeles, United States', shortLabel: 'Los Angeles', lat: 34.0522,  lon: -118.2437, countryCode: 'us', admin1: 'California',      placeType: 'city' },
  { tz: 'America/Phoenix',            id: 'tz:phoenix',         label: 'Phoenix, United States',     shortLabel: 'Phoenix',     lat: 33.4484,  lon: -112.0740, countryCode: 'us', admin1: 'Arizona',         placeType: 'city' },
  { tz: 'America/Anchorage',          id: 'tz:anchorage',       label: 'Anchorage, United States',   shortLabel: 'Anchorage',   lat: 61.2181,  lon: -149.9003, countryCode: 'us', admin1: 'Alaska',          placeType: 'city' },
  { tz: 'Pacific/Honolulu',           id: 'tz:honolulu',        label: 'Honolulu, United States',    shortLabel: 'Honolulu',    lat: 21.3099,  lon: -157.8581, countryCode: 'us', admin1: 'Hawaii',          placeType: 'city' },
  { tz: 'America/Toronto',            id: 'tz:toronto',         label: 'Toronto, Canada',            shortLabel: 'Toronto',     lat: 43.6532,  lon: -79.3832,  countryCode: 'ca', admin1: 'Ontario',         placeType: 'city' },
  { tz: 'America/Vancouver',          id: 'tz:vancouver',       label: 'Vancouver, Canada',          shortLabel: 'Vancouver',   lat: 49.2827,  lon: -123.1207, countryCode: 'ca', admin1: 'British Columbia', placeType: 'city' },
  { tz: 'America/Mexico_City',        id: 'tz:mexico-city',     label: 'Mexico City, Mexico',        shortLabel: 'Mexico City', lat: 19.4326,  lon: -99.1332,  countryCode: 'mx', admin1: 'CDMX',            placeType: 'city' },
  { tz: 'America/Bogota',             id: 'tz:bogota',          label: 'Bogotá, Colombia',           shortLabel: 'Bogotá',      lat: 4.7110,   lon: -74.0721,  countryCode: 'co', admin1: 'Bogotá D.C.',     placeType: 'city' },
  { tz: 'America/Lima',               id: 'tz:lima',            label: 'Lima, Peru',                 shortLabel: 'Lima',        lat: -12.0464, lon: -77.0428,  countryCode: 'pe', admin1: 'Lima',            placeType: 'city' },
  { tz: 'America/Santiago',           id: 'tz:santiago',        label: 'Santiago, Chile',            shortLabel: 'Santiago',    lat: -33.4489, lon: -70.6693,  countryCode: 'cl', admin1: 'Santiago',        placeType: 'city' },
  { tz: 'America/Argentina/Buenos_Aires', id: 'tz:buenos-aires', label: 'Buenos Aires, Argentina',  shortLabel: 'Buenos Aires', lat: -34.6037, lon: -58.3816, countryCode: 'ar', admin1: 'Buenos Aires',    placeType: 'city' },
  { tz: 'America/Sao_Paulo',          id: 'tz:sao-paulo',       label: 'São Paulo, Brazil',          shortLabel: 'São Paulo',   lat: -23.5505, lon: -46.6333,  countryCode: 'br', admin1: 'São Paulo',       placeType: 'city' },
  { tz: 'America/Caracas',            id: 'tz:caracas',         label: 'Caracas, Venezuela',         shortLabel: 'Caracas',     lat: 10.4806,  lon: -66.9036,  countryCode: 've', admin1: 'Distrito Capital', placeType: 'city' },
  { tz: 'America/Guayaquil',          id: 'tz:guayaquil',       label: 'Guayaquil, Ecuador',         shortLabel: 'Guayaquil',   lat: -2.1894,  lon: -79.8891,  countryCode: 'ec', admin1: 'Guayas',          placeType: 'city' },
  { tz: 'America/Panama',             id: 'tz:panama',          label: 'Panama City, Panama',        shortLabel: 'Panama City', lat: 8.9824,   lon: -79.5199,  countryCode: 'pa', admin1: 'Panamá',          placeType: 'city' },

  // ─── Europe ───
  { tz: 'Europe/London',              id: 'tz:london',          label: 'London, United Kingdom',     shortLabel: 'London',      lat: 51.5074,  lon: -0.1278,   countryCode: 'gb', admin1: 'England',         placeType: 'city' },
  { tz: 'Europe/Dublin',              id: 'tz:dublin',          label: 'Dublin, Ireland',            shortLabel: 'Dublin',      lat: 53.3498,  lon: -6.2603,   countryCode: 'ie', admin1: 'Leinster',        placeType: 'city' },
  { tz: 'Europe/Paris',               id: 'tz:paris',           label: 'Paris, France',              shortLabel: 'Paris',       lat: 48.8566,  lon: 2.3522,    countryCode: 'fr', admin1: 'Île-de-France',   placeType: 'city' },
  { tz: 'Europe/Berlin',              id: 'tz:berlin',          label: 'Berlin, Germany',            shortLabel: 'Berlin',      lat: 52.5200,  lon: 13.4050,   countryCode: 'de', admin1: 'Berlin',          placeType: 'city' },
  { tz: 'Europe/Madrid',              id: 'tz:madrid',          label: 'Madrid, Spain',              shortLabel: 'Madrid',      lat: 40.4168,  lon: -3.7038,   countryCode: 'es', admin1: 'Madrid',          placeType: 'city' },
  { tz: 'Europe/Rome',                id: 'tz:rome',            label: 'Rome, Italy',                shortLabel: 'Rome',        lat: 41.9028,  lon: 12.4964,   countryCode: 'it', admin1: 'Lazio',           placeType: 'city' },
  { tz: 'Europe/Amsterdam',           id: 'tz:amsterdam',       label: 'Amsterdam, Netherlands',     shortLabel: 'Amsterdam',   lat: 52.3676,  lon: 4.9041,    countryCode: 'nl', admin1: 'North Holland',   placeType: 'city' },
  { tz: 'Europe/Brussels',            id: 'tz:brussels',        label: 'Brussels, Belgium',          shortLabel: 'Brussels',    lat: 50.8503,  lon: 4.3517,    countryCode: 'be', admin1: 'Brussels',        placeType: 'city' },
  { tz: 'Europe/Vienna',              id: 'tz:vienna',          label: 'Vienna, Austria',            shortLabel: 'Vienna',      lat: 48.2082,  lon: 16.3738,   countryCode: 'at', admin1: 'Vienna',          placeType: 'city' },
  { tz: 'Europe/Zurich',              id: 'tz:zurich',          label: 'Zurich, Switzerland',        shortLabel: 'Zurich',      lat: 47.3769,  lon: 8.5417,    countryCode: 'ch', admin1: 'Zurich',          placeType: 'city' },
  { tz: 'Europe/Stockholm',           id: 'tz:stockholm',       label: 'Stockholm, Sweden',          shortLabel: 'Stockholm',   lat: 59.3293,  lon: 18.0686,   countryCode: 'se', admin1: 'Stockholm',       placeType: 'city' },
  { tz: 'Europe/Oslo',                id: 'tz:oslo',            label: 'Oslo, Norway',               shortLabel: 'Oslo',        lat: 59.9139,  lon: 10.7522,   countryCode: 'no', admin1: 'Oslo',            placeType: 'city' },
  { tz: 'Europe/Copenhagen',          id: 'tz:copenhagen',      label: 'Copenhagen, Denmark',        shortLabel: 'Copenhagen',  lat: 55.6761,  lon: 12.5683,   countryCode: 'dk', admin1: 'Capital Region',  placeType: 'city' },
  { tz: 'Europe/Helsinki',            id: 'tz:helsinki',        label: 'Helsinki, Finland',          shortLabel: 'Helsinki',    lat: 60.1699,  lon: 24.9384,   countryCode: 'fi', admin1: 'Uusimaa',         placeType: 'city' },
  { tz: 'Europe/Warsaw',              id: 'tz:warsaw',          label: 'Warsaw, Poland',             shortLabel: 'Warsaw',      lat: 52.2297,  lon: 21.0122,   countryCode: 'pl', admin1: 'Masovia',         placeType: 'city' },
  { tz: 'Europe/Prague',              id: 'tz:prague',          label: 'Prague, Czechia',            shortLabel: 'Prague',      lat: 50.0755,  lon: 14.4378,   countryCode: 'cz', admin1: 'Prague',          placeType: 'city' },
  { tz: 'Europe/Budapest',            id: 'tz:budapest',        label: 'Budapest, Hungary',          shortLabel: 'Budapest',    lat: 47.4979,  lon: 19.0402,   countryCode: 'hu', admin1: 'Budapest',        placeType: 'city' },
  { tz: 'Europe/Athens',              id: 'tz:athens',          label: 'Athens, Greece',             shortLabel: 'Athens',      lat: 37.9838,  lon: 23.7275,   countryCode: 'gr', admin1: 'Attica',          placeType: 'city' },
  { tz: 'Europe/Lisbon',              id: 'tz:lisbon',          label: 'Lisbon, Portugal',           shortLabel: 'Lisbon',      lat: 38.7223,  lon: -9.1393,   countryCode: 'pt', admin1: 'Lisbon',          placeType: 'city' },
  { tz: 'Europe/Moscow',              id: 'tz:moscow',          label: 'Moscow, Russia',             shortLabel: 'Moscow',      lat: 55.7558,  lon: 37.6173,   countryCode: 'ru', admin1: 'Moscow',          placeType: 'city' },
  { tz: 'Europe/Kyiv',                id: 'tz:kyiv',            label: 'Kyiv, Ukraine',              shortLabel: 'Kyiv',        lat: 50.4501,  lon: 30.5234,   countryCode: 'ua', admin1: 'Kyiv',            placeType: 'city' },
  { tz: 'Europe/Istanbul',            id: 'tz:istanbul',        label: 'Istanbul, Türkiye',          shortLabel: 'Istanbul',    lat: 41.0082,  lon: 28.9784,   countryCode: 'tr', admin1: 'Istanbul',        placeType: 'city' },

  // ─── South Asia ───
  { tz: 'Asia/Kathmandu',             id: 'tz:kathmandu',       label: 'Kathmandu, Nepal',           shortLabel: 'Kathmandu',   lat: 27.7172,  lon: 85.3240,   countryCode: 'np', admin1: 'Bagmati',         placeType: 'city' },
  { tz: 'Asia/Kolkata',               id: 'tz:new-delhi',       label: 'New Delhi, India',           shortLabel: 'New Delhi',   lat: 28.6139,  lon: 77.2090,   countryCode: 'in', admin1: 'Delhi',           placeType: 'city' },
  { tz: 'Asia/Karachi',               id: 'tz:karachi',         label: 'Karachi, Pakistan',          shortLabel: 'Karachi',     lat: 24.8607,  lon: 67.0011,   countryCode: 'pk', admin1: 'Sindh',           placeType: 'city' },
  { tz: 'Asia/Dhaka',                 id: 'tz:dhaka',           label: 'Dhaka, Bangladesh',          shortLabel: 'Dhaka',       lat: 23.8103,  lon: 90.4125,   countryCode: 'bd', admin1: 'Dhaka',           placeType: 'city' },
  { tz: 'Asia/Colombo',               id: 'tz:colombo',         label: 'Colombo, Sri Lanka',         shortLabel: 'Colombo',     lat: 6.9271,   lon: 79.8612,   countryCode: 'lk', admin1: 'Western',         placeType: 'city' },

  // ─── East & Southeast Asia ───
  { tz: 'Asia/Shanghai',              id: 'tz:shanghai',        label: 'Shanghai, China',            shortLabel: 'Shanghai',    lat: 31.2304,  lon: 121.4737,  countryCode: 'cn', admin1: 'Shanghai',        placeType: 'city' },
  { tz: 'Asia/Hong_Kong',             id: 'tz:hong-kong',       label: 'Hong Kong',                  shortLabel: 'Hong Kong',   lat: 22.3193,  lon: 114.1694,  countryCode: 'hk', admin1: 'Hong Kong',       placeType: 'city' },
  { tz: 'Asia/Taipei',                id: 'tz:taipei',          label: 'Taipei, Taiwan',             shortLabel: 'Taipei',      lat: 25.0330,  lon: 121.5654,  countryCode: 'tw', admin1: 'Taipei',          placeType: 'city' },
  { tz: 'Asia/Tokyo',                 id: 'tz:tokyo',           label: 'Tokyo, Japan',               shortLabel: 'Tokyo',       lat: 35.6762,  lon: 139.6503,  countryCode: 'jp', admin1: 'Tokyo',           placeType: 'city' },
  { tz: 'Asia/Seoul',                 id: 'tz:seoul',           label: 'Seoul, South Korea',         shortLabel: 'Seoul',       lat: 37.5665,  lon: 126.9780,  countryCode: 'kr', admin1: 'Seoul',           placeType: 'city' },
  { tz: 'Asia/Singapore',             id: 'tz:singapore',       label: 'Singapore',                  shortLabel: 'Singapore',   lat: 1.3521,   lon: 103.8198,  countryCode: 'sg', admin1: 'Singapore',       placeType: 'city' },
  { tz: 'Asia/Kuala_Lumpur',          id: 'tz:kuala-lumpur',    label: 'Kuala Lumpur, Malaysia',     shortLabel: 'Kuala Lumpur', lat: 3.1390,  lon: 101.6869,  countryCode: 'my', admin1: 'Kuala Lumpur',    placeType: 'city' },
  { tz: 'Asia/Bangkok',               id: 'tz:bangkok',         label: 'Bangkok, Thailand',          shortLabel: 'Bangkok',     lat: 13.7563,  lon: 100.5018,  countryCode: 'th', admin1: 'Bangkok',         placeType: 'city' },
  { tz: 'Asia/Ho_Chi_Minh',           id: 'tz:ho-chi-minh',     label: 'Ho Chi Minh City, Vietnam',  shortLabel: 'Ho Chi Minh', lat: 10.8231,  lon: 106.6297,  countryCode: 'vn', admin1: 'HCMC',            placeType: 'city' },
  { tz: 'Asia/Jakarta',               id: 'tz:jakarta',         label: 'Jakarta, Indonesia',         shortLabel: 'Jakarta',     lat: -6.2088,  lon: 106.8456,  countryCode: 'id', admin1: 'Jakarta',         placeType: 'city' },
  { tz: 'Asia/Manila',                id: 'tz:manila',          label: 'Manila, Philippines',        shortLabel: 'Manila',      lat: 14.5995,  lon: 120.9842,  countryCode: 'ph', admin1: 'Metro Manila',    placeType: 'city' },

  // ─── Middle East & Central Asia ───
  { tz: 'Asia/Dubai',                 id: 'tz:dubai',           label: 'Dubai, United Arab Emirates', shortLabel: 'Dubai',      lat: 25.2048,  lon: 55.2708,   countryCode: 'ae', admin1: 'Dubai',           placeType: 'city' },
  { tz: 'Asia/Riyadh',                id: 'tz:riyadh',          label: 'Riyadh, Saudi Arabia',       shortLabel: 'Riyadh',      lat: 24.7136,  lon: 46.6753,   countryCode: 'sa', admin1: 'Riyadh',          placeType: 'city' },
  { tz: 'Asia/Tehran',                id: 'tz:tehran',          label: 'Tehran, Iran',               shortLabel: 'Tehran',      lat: 35.6892,  lon: 51.3890,   countryCode: 'ir', admin1: 'Tehran',          placeType: 'city' },
  { tz: 'Asia/Jerusalem',             id: 'tz:jerusalem',       label: 'Jerusalem, Israel',          shortLabel: 'Jerusalem',   lat: 31.7683,  lon: 35.2137,   countryCode: 'il', admin1: 'Jerusalem',       placeType: 'city' },
  { tz: 'Asia/Tashkent',              id: 'tz:tashkent',        label: 'Tashkent, Uzbekistan',       shortLabel: 'Tashkent',    lat: 41.2995,  lon: 69.2401,   countryCode: 'uz', admin1: 'Tashkent',        placeType: 'city' },

  // ─── Africa ───
  { tz: 'Africa/Cairo',               id: 'tz:cairo',           label: 'Cairo, Egypt',               shortLabel: 'Cairo',       lat: 30.0444,  lon: 31.2357,   countryCode: 'eg', admin1: 'Cairo',           placeType: 'city' },
  { tz: 'Africa/Lagos',               id: 'tz:lagos',           label: 'Lagos, Nigeria',             shortLabel: 'Lagos',       lat: 6.5244,   lon: 3.3792,    countryCode: 'ng', admin1: 'Lagos',           placeType: 'city' },
  { tz: 'Africa/Nairobi',             id: 'tz:nairobi',         label: 'Nairobi, Kenya',             shortLabel: 'Nairobi',     lat: -1.2921,  lon: 36.8219,   countryCode: 'ke', admin1: 'Nairobi',         placeType: 'city' },
  { tz: 'Africa/Johannesburg',        id: 'tz:johannesburg',    label: 'Johannesburg, South Africa', shortLabel: 'Johannesburg', lat: -26.2041, lon: 28.0473,  countryCode: 'za', admin1: 'Gauteng',         placeType: 'city' },
  { tz: 'Africa/Casablanca',          id: 'tz:casablanca',      label: 'Casablanca, Morocco',        shortLabel: 'Casablanca',  lat: 33.5731,  lon: -7.5898,   countryCode: 'ma', admin1: 'Casablanca-Settat', placeType: 'city' },
  { tz: 'Africa/Accra',               id: 'tz:accra',           label: 'Accra, Ghana',               shortLabel: 'Accra',       lat: 5.6037,   lon: -0.1870,   countryCode: 'gh', admin1: 'Greater Accra',   placeType: 'city' },
  { tz: 'Africa/Addis_Ababa',         id: 'tz:addis-ababa',     label: 'Addis Ababa, Ethiopia',      shortLabel: 'Addis Ababa', lat: 9.0320,   lon: 38.7469,   countryCode: 'et', admin1: 'Addis Ababa',     placeType: 'city' },

  // ─── Oceania ───
  { tz: 'Australia/Sydney',           id: 'tz:sydney',          label: 'Sydney, Australia',          shortLabel: 'Sydney',      lat: -33.8688, lon: 151.2093,  countryCode: 'au', admin1: 'New South Wales', placeType: 'city' },
  { tz: 'Australia/Melbourne',        id: 'tz:melbourne',       label: 'Melbourne, Australia',       shortLabel: 'Melbourne',   lat: -37.8136, lon: 144.9631,  countryCode: 'au', admin1: 'Victoria',        placeType: 'city' },
  { tz: 'Australia/Brisbane',         id: 'tz:brisbane',        label: 'Brisbane, Australia',        shortLabel: 'Brisbane',    lat: -27.4698, lon: 153.0251,  countryCode: 'au', admin1: 'Queensland',      placeType: 'city' },
  { tz: 'Australia/Perth',            id: 'tz:perth',           label: 'Perth, Australia',           shortLabel: 'Perth',       lat: -31.9505, lon: 115.8605,  countryCode: 'au', admin1: 'Western Australia', placeType: 'city' },
  { tz: 'Pacific/Auckland',           id: 'tz:auckland',        label: 'Auckland, New Zealand',      shortLabel: 'Auckland',    lat: -36.8485, lon: 174.7633,  countryCode: 'nz', admin1: 'Auckland',        placeType: 'city' },
];

export const UTC_FALLBACK: TimezoneCityEntry = {
  tz: 'UTC',
  id: 'tz:utc',
  label: 'Greenwich, United Kingdom',
  shortLabel: 'Greenwich',
  lat: 51.4779,
  lon: -0.0015,
  countryCode: 'gb',
  admin1: 'England',
  placeType: 'city',
};

export function findCityForTimezone(tz: string): TimezoneCityEntry | null {
  return TIMEZONE_CITIES.find((c) => c.tz === tz) ?? null;
}