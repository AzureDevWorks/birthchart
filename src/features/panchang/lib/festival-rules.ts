/**
 * Festival rules - the tithi+masa+paksha  festival mapping.
 *
 * Convention (verified against the library's behavior):
 *   - tithi 0-29, 0-indexed (0 = Shukla Pratipada, 14 = Purnima,
 *     15 = Krishna Pratipada, 29 = Amavasya)
 *   - masa names in the amanta convention
 *   - paksha is 'Shukla' (waxing) or 'Krishna' (waning)
 *
 * Rules that occur on multiple possible tithis (due to the sun's
 * varying rate) can be declared with an array of acceptable tithis.
 */

export type FestivalCategory =
  | 'festival'   // major festival
  | 'ekadashi'   // the 24 named Ekadashi vrats
  | 'jayanti'    // birthday / appearance day
  | 'vrat'       // vrat / fasting day
  | 'purnima'    // full moon observance
  | 'amavasya';  // new moon observance

export interface FestivalRule {
  /** Stable key for i18n lookup */
  key: string;
  /** Masa name - 'Chaitra' | 'Vaishakha' | ... | 'Phalguna' */
  masa: string;
  /** Shukla or Krishna */
  paksha: 'Shukla' | 'Krishna';
  /** 0-indexed tithi (or array of accepted tithis when tithi is variable) */
  tithi: number | number[];
  /** Category tag for filtering */
  category: FestivalCategory;
  /** Display names in three languages */
  nameEn: string;
  nameHi: string;
  nameNe: string;
  /** Optional short description */
  descriptionEn?: string;
}

// �������������������������������������������������������������
// Masa index  name (amanta convention)
// �������������������������������������������������������������

export const MASA_NAMES = [
  'Chaitra', 'Vaishakha', 'Jyeshtha', 'Ashadha',
  'Shravana', 'Bhadrapada', 'Ashwina', 'Kartika',
  'Margashirsha', 'Pausha', 'Magha', 'Phalguna',
] as const;

export type MasaName = (typeof MASA_NAMES)[number];

// �������������������������������������������������������������
// The rules table
// �������������������������������������������������������������

export const FESTIVAL_RULES: FestivalRule[] = [
  // ��� Chaitra (masa 0) ���
  { key: 'gudi-padwa',        masa: 'Chaitra', paksha: 'Shukla', tithi: 0,  category: 'festival', nameEn: 'Gudi Padwa',        nameHi: '????? ??????',      nameNe: '????? ?????' },
  { key: 'ugadi',             masa: 'Chaitra', paksha: 'Shukla', tithi: 0,  category: 'festival', nameEn: 'Ugadi',             nameHi: '?????',             nameNe: '?????' },
  { key: 'chaitra-navratri',  masa: 'Chaitra', paksha: 'Shukla', tithi: [0,1,2,3,4,5,6,7,8], category: 'festival', nameEn: 'Chaitra Navratri', nameHi: '????? ????????', nameNe: '????? ????????' },
  { key: 'ram-navami',        masa: 'Chaitra', paksha: 'Shukla', tithi: 8,  category: 'jayanti',  nameEn: 'Ram Navami',        nameHi: '??? ????',          nameNe: '???????',       descriptionEn: 'Birth of Lord Rama.' },
  { key: 'hanuman-jayanti',   masa: 'Chaitra', paksha: 'Shukla', tithi: 14, category: 'jayanti',  nameEn: 'Hanuman Jayanti',   nameHi: '?????? ?????',     nameNe: '?????? ??????' },

  // ��� Vaishakha (masa 1) ���
  { key: 'akshaya-tritiya',   masa: 'Vaishakha', paksha: 'Shukla', tithi: 2,  category: 'festival', nameEn: 'Akshaya Tritiya',   nameHi: '????? ??????',     nameNe: '????? ??????' },
  { key: 'parashurama-jayanti', masa: 'Vaishakha', paksha: 'Shukla', tithi: 2, category: 'jayanti', nameEn: 'Parashurama Jayanti', nameHi: '??????? ?????', nameNe: '??????? ??????' },
  { key: 'buddha-purnima',    masa: 'Vaishakha', paksha: 'Shukla', tithi: 14, category: 'jayanti',  nameEn: 'Buddha Purnima',    nameHi: '????? ????????',   nameNe: '????? ????????' },

  // ��� Jyeshtha (masa 2) ���
  { key: 'nirjala-ekadashi',  masa: 'Jyeshtha', paksha: 'Shukla', tithi: 10, category: 'ekadashi', nameEn: 'Nirjala Ekadashi',  nameHi: '??????? ??????',   nameNe: '??????? ??????' },
  { key: 'vat-savitri-vrat',  masa: 'Jyeshtha', paksha: 'Shukla', tithi: 14, category: 'vrat',     nameEn: 'Vat Savitri Vrat',  nameHi: '?? ???????? ????', nameNe: '?? ???????? ????' },
  { key: 'ganga-dussehra',    masa: 'Jyeshtha', paksha: 'Shukla', tithi: 9,  category: 'festival', nameEn: 'Ganga Dussehra',    nameHi: '???? ?????',       nameNe: '???? ?????' },

  // ��� Ashadha (masa 3) ���
  { key: 'jagannath-rath-yatra', masa: 'Ashadha', paksha: 'Shukla', tithi: 1, category: 'festival', nameEn: 'Ratha Yatra',       nameHi: '?? ??????',         nameNe: '????????' },
  { key: 'devshayani-ekadashi',  masa: 'Ashadha', paksha: 'Shukla', tithi: 10, category: 'ekadashi', nameEn: 'Devshayani Ekadashi', nameHi: '??????? ??????', nameNe: '??????? ??????' },
  { key: 'guru-purnima',      masa: 'Ashadha', paksha: 'Shukla', tithi: 14, category: 'festival', nameEn: 'Guru Purnima',      nameHi: '???? ????????',    nameNe: '???? ????????' },

  // ��� Shravana (masa 4) ���
  { key: 'nag-panchami',      masa: 'Shravana', paksha: 'Shukla', tithi: 4,  category: 'festival', nameEn: 'Nag Panchami',      nameHi: '??? ?????',         nameNe: '??? ??????' },
  { key: 'raksha-bandhan',    masa: 'Shravana', paksha: 'Shukla', tithi: 14, category: 'festival', nameEn: 'Raksha Bandhan',    nameHi: '????? ????',        nameNe: '??????????' },
  { key: 'krishna-janmashtami', masa: 'Shravana', paksha: 'Krishna', tithi: 22, category: 'jayanti', nameEn: 'Krishna Janmashtami', nameHi: '????? ??????????', nameNe: '????? ??????????', descriptionEn: 'Birth of Lord Krishna.' },

  // ��� Bhadrapada (masa 5) ���
  { key: 'ganesh-chaturthi',  masa: 'Bhadrapada', paksha: 'Shukla', tithi: 3,  category: 'festival', nameEn: 'Ganesh Chaturthi',  nameHi: '???? ???????',      nameNe: '???? ???????' },
  { key: 'hartalika-teej',    masa: 'Bhadrapada', paksha: 'Shukla', tithi: 2,  category: 'vrat',     nameEn: 'Hartalika Teej',    nameHi: '???????? ???',      nameNe: '???????? ???' },
  { key: 'sharad-navratri',   masa: 'Bhadrapada', paksha: 'Shukla', tithi: [0,1,2,3,4,5,6,7,8], category: 'festival', nameEn: 'Navaratri', nameHi: '????????', nameNe: '????????' },
  { key: 'durga-ashtami',     masa: 'Bhadrapada', paksha: 'Shukla', tithi: 7,  category: 'festival', nameEn: 'Durga Ashtami',     nameHi: '?????? ??????',     nameNe: '?????? ??????' },
  { key: 'maha-navami',       masa: 'Bhadrapada', paksha: 'Shukla', tithi: 8,  category: 'festival', nameEn: 'Maha Navami',       nameHi: '??? ????',          nameNe: '??? ????' },
  { key: 'vijayadashami',     masa: 'Bhadrapada', paksha: 'Shukla', tithi: 9,  category: 'festival', nameEn: 'Vijayadashami',     nameHi: '?????????',         nameNe: '?????????',    descriptionEn: 'Victory of good over evil - Dussehra.' },
  { key: 'anant-chaturdashi', masa: 'Bhadrapada', paksha: 'Shukla', tithi: 13, category: 'vrat',     nameEn: 'Anant Chaturdashi', nameHi: '???? ????????',    nameNe: '????? ????????' },

  // ��� Ashwina (masa 6) ���
  { key: 'sharad-purnima',    masa: 'Ashwina', paksha: 'Shukla', tithi: 14, category: 'purnima',  nameEn: 'Sharad Purnima',    nameHi: '??? ????????',     nameNe: '??? ????????' },
  { key: 'karwa-chauth',      masa: 'Ashwina', paksha: 'Krishna', tithi: 18, category: 'vrat',     nameEn: 'Karwa Chauth',      nameHi: '???? ???',          nameNe: '???? ???' },
  { key: 'ahoi-ashtami',      masa: 'Ashwina', paksha: 'Krishna', tithi: 22, category: 'vrat',     nameEn: 'Ahoi Ashtami',      nameHi: '???? ??????',       nameNe: '???? ??????' },
  { key: 'dhanteras',         masa: 'Ashwina', paksha: 'Krishna', tithi: 27, category: 'festival', nameEn: 'Dhanteras',         nameHi: '??????',            nameNe: '??????' },
  { key: 'naraka-chaturdashi', masa: 'Ashwina', paksha: 'Krishna', tithi: 28, category: 'festival', nameEn: 'Naraka Chaturdashi', nameHi: '??? ????????',     nameNe: '??? ????????' },
  { key: 'diwali',            masa: 'Ashwina', paksha: 'Krishna', tithi: 29, category: 'festival', nameEn: 'Diwali',            nameHi: '???????',           nameNe: '???????',      descriptionEn: 'Festival of lights.' },

  // ��� Kartika (masa 7) ���
  { key: 'govardhan-puja',    masa: 'Kartika', paksha: 'Shukla', tithi: 0,  category: 'festival', nameEn: 'Govardhan Puja',    nameHi: '??????? ????',      nameNe: '??????? ????' },
  { key: 'bhai-dooj',         masa: 'Kartika', paksha: 'Shukla', tithi: 1,  category: 'festival', nameEn: 'Bhai Dooj',         nameHi: '??? ???',           nameNe: '???????' },
  { key: 'chhath-puja',       masa: 'Kartika', paksha: 'Shukla', tithi: 5,  category: 'festival', nameEn: 'Chhath Puja',       nameHi: '?? ????',            nameNe: '?? ????' },
  { key: 'devutthana-ekadashi', masa: 'Kartika', paksha: 'Shukla', tithi: 10, category: 'ekadashi', nameEn: 'Devutthana Ekadashi', nameHi: '??????? ??????', nameNe: '??????? ??????' },
  { key: 'tulsi-vivah',       masa: 'Kartika', paksha: 'Shukla', tithi: 11, category: 'festival', nameEn: 'Tulsi Vivah',       nameHi: '????? ?????',       nameNe: '????? ?????' },
  { key: 'karthigai-deepam',  masa: 'Kartika', paksha: 'Shukla', tithi: 14, category: 'festival', nameEn: 'Karthigai Deepam',  nameHi: '???????? ????',     nameNe: '??????? ????' },

  // ��� Margashirsha (masa 8) ���
  { key: 'gita-jayanti',      masa: 'Margashirsha', paksha: 'Shukla', tithi: 10, category: 'jayanti', nameEn: 'Gita Jayanti',      nameHi: '???? ?????',        nameNe: '???? ??????' },
  { key: 'mokshada-ekadashi', masa: 'Margashirsha', paksha: 'Shukla', tithi: 10, category: 'ekadashi', nameEn: 'Mokshada Ekadashi', nameHi: '??????? ??????',   nameNe: '??????? ??????' },

  // ��� Pausha (masa 9) ���
  { key: 'pausha-putrada-ekadashi', masa: 'Pausha', paksha: 'Shukla', tithi: 10, category: 'ekadashi', nameEn: 'Pausha Putrada Ekadashi', nameHi: '??? ??????? ??????', nameNe: '??? ??????? ??????' },
  { key: 'saphala-ekadashi',  masa: 'Pausha', paksha: 'Krishna', tithi: 25, category: 'ekadashi', nameEn: 'Saphala Ekadashi',  nameHi: '???? ??????',       nameNe: '???? ??????' },

  // ��� Magha (masa 10) ���
  { key: 'shattila-ekadashi', masa: 'Magha', paksha: 'Krishna', tithi: 25, category: 'ekadashi', nameEn: 'Shattila Ekadashi', nameHi: '?????? ??????',     nameNe: '?????? ??????' },
  { key: 'maha-shivaratri',   masa: 'Magha', paksha: 'Krishna', tithi: 28, category: 'festival', nameEn: 'Maha Shivaratri',   nameHi: '????????????',      nameNe: '????????????', descriptionEn: 'The great night of Lord Shiva.' },

  // ��� Phalguna (masa 11) ���
  { key: 'vasant-panchami',   masa: 'Phalguna', paksha: 'Shukla', tithi: 4,  category: 'festival', nameEn: 'Vasant Panchami',   nameHi: '???? ?????',        nameNe: '????? ??????' },
  { key: 'holika-dahan',      masa: 'Phalguna', paksha: 'Shukla', tithi: 14, category: 'festival', nameEn: 'Holika Dahan',      nameHi: '?????? ???',        nameNe: '?????? ???' },
  { key: 'holi',              masa: 'Phalguna', paksha: 'Krishna', tithi: 15, category: 'festival', nameEn: 'Holi',              nameHi: '????',              nameNe: '????',        descriptionEn: 'Festival of colors.' },
  { key: 'vijaya-ekadashi',   masa: 'Phalguna', paksha: 'Krishna', tithi: 25, category: 'ekadashi', nameEn: 'Vijaya Ekadashi',   nameHi: '????? ??????',      nameNe: '????? ??????' },
  { key: 'amalaki-ekadashi',  masa: 'Phalguna', paksha: 'Shukla', tithi: 10, category: 'ekadashi', nameEn: 'Amalaki Ekadashi',  nameHi: '????? ??????',      nameNe: '????? ??????' },
];

// �������������������������������������������������������������
// Lookups
// �������������������������������������������������������������

/**
 * Look up all rules that match a given (masa, paksha, tithiIndex) tuple.
 */
export function matchFestivalRules(
  masa: string,
  paksha: 'Shukla' | 'Krishna',
  tithiIndex: number
): FestivalRule[] {
  return FESTIVAL_RULES.filter((r) => {
    if (r.masa !== masa) return false;
    if (r.paksha !== paksha) return false;
    if (Array.isArray(r.tithi)) return r.tithi.includes(tithiIndex);
    return r.tithi === tithiIndex;
  });
}

/**
 * Every Ekadashi falls on tithi 10 (Shukla) or tithi 25 (Krishna).
 * If no named rule matches, we still want to show a generic
 * "Ekadashi Vrat" entry.
 */
export function isEkadashiTithi(tithiIndex: number): boolean {
  return tithiIndex === 10 || tithiIndex === 25;
}

/**
 * Every Purnima falls on tithi 14 (Shukla).
 * Amavasya falls on tithi 29 (Krishna).
 */
export function isPurnima(tithiIndex: number): boolean {
  return tithiIndex === 14;
}
export function isAmavasya(tithiIndex: number): boolean {
  return tithiIndex === 29;
}