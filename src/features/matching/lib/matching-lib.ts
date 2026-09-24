/**
 * Classical interpretation data for Guna Milan + Mangal Dosha.
 * All commentary is drawn from classical texts and current Jyotishi
 * practice (B.V. Raman, Muhurta Chintamani, Drik Panchang convention).
 */

// �������������������������������������������������������������
// 1. THE EIGHT KOOTAS
// �������������������������������������������������������������

export interface KootaInfo {
  key: string;
  name: string;
  nameHi: string;
  nameNe: string;
  maxScore: number;
  area: string;
  weight: 'heavy' | 'medium' | 'light';
  rule: string;
  ruleHi: string;
  ruleNe: string;
}

export const KOOTA_INFO: Record<string, KootaInfo> = {
  Varna: {
    key: 'Varna',
    name: 'Varna',
    nameHi: '????',
    nameNe: '????',
    maxScore: 1,
    area: 'Work � Spiritual Alignment',
    weight: 'light',
    rule:
      "Measures the spiritual and ego development of the two natives, based on their Janma Rashi. The four varnas are Brahmin, Kshatriya, Vaishya, and Shudra. Traditionally, the groom's varna should equal or exceed the bride's. Same-varna matches are harmonious; the bride being of higher varna is treated as inauspicious.",
    ruleHi:
      '???? ???? ?? ???? ?? ????? ?? ?????????? ? ???-????? ?? ???? ??? ???? - ????????, ????????, ?????, ?????? ?? ?? ???? ??? ?? ???? ?? ???? ???? ????',
    ruleNe:
      '???? ?????? ?????? ??? ????? ?????????? ? ???-??????? ????? ??? ???? - ????????, ????????, ?????, ?????? ???? ???? ??? ????? ???? ?? ???? ???? ????',
  },
  Vashya: {
    key: 'Vashya',
    name: 'Vashya',
    nameHi: '????',
    nameNe: '????',
    maxScore: 2,
    area: 'Mutual Attraction � Influence',
    weight: 'medium',
    rule:
      'Vashya measures the magnetic control one partner can exert over the other. Each Moon sign belongs to one of five groups: Chatushpada (quadruped), Manava (human), Jalachara (water-born), Vanachara (wild), Keeta (insect). Same-group matches are ideal; certain pairs (like Chatushpada and Vanachara) are considered poor.',
    ruleHi:
      '???? ??-????? ?? ???????? ?????? ?? ???? ?????? ???? ???? ?????? ??? - ???????, ????, ????, ????, ????',
    ruleNe:
      '???? ??-??????? ???????? ???????? ????? ?????? ???? ???? ?????? - ???????, ????, ????, ????, ????',
  },
  Tara: {
    key: 'Tara',
    name: 'Tara',
    nameHi: '????',
    nameNe: '????',
    maxScore: 3,
    area: 'Destiny � Well-being',
    weight: 'medium',
    rule:
      "Tara (also called Tarabalam) compares the birth nakshatras. It counts the distance from one native's nakshatra to the other and divides by 9 to derive one of the 9 Taras (Janma, Sampat, Vipat, Kshema, Pratyari, Sadhaka, Vadha, Mitra, Parama Mitra). Favorable Taras indicate mutual support and well-being.",
    ruleHi:
      '???? ???? ????????? ?? ????? ??? ?? ?? ??????? ?? ????? ?? ?? ???? ?? ? ?? ??????? ?? ?? ?????? ??? ?? ?? ?????? ???? ???',
    ruleNe:
      '???? ???? ???????????? ?????? ???? ??????????? ??????????? ??????? ? ?? ??? ??? ?? ???????????? ?? ??????????',
  },
  Yoni: {
    key: 'Yoni',
    name: 'Yoni',
    nameHi: '????',
    nameNe: '????',
    maxScore: 4,
    area: 'Physical � Intimate Compatibility',
    weight: 'medium',
    rule:
      'Yoni measures physical and sexual compatibility. Each nakshatra is assigned one of 14 animals (Ashwa, Gaja, Mesha, Sarpa, etc.), each with a gender. Same-animal matches are ideal. Certain animals are sworn enemies (Rat and Cat, Lion and Elephant, etc.) - these produce the poorest scores.',
    ruleHi:
      '???? ??????? ? ??? ???????? ?? ???? ???????? ??????? ?? ?? ????? ??? ?? ?? ????? ??? ???',
    ruleNe:
      '???? ??????? ? ??? ?????????? ????? ???????? ?????????? ?? ??????????? ?? ??????? ??',
  },
  'Graha Maitri': {
    key: 'Graha Maitri',
    name: 'Graha Maitri',
    nameHi: '???? ??????',
    nameNe: '???? ??????',
    maxScore: 5,
    area: 'Mental � Intellectual Friendship',
    weight: 'heavy',
    rule:
      "Graha Maitri examines the friendship between the ruling planets of the two Moon signs. If the two Rashi lords are friends (or one is the other's friend), the minds work in harmony. This is the mental and intellectual layer of the union.",
    ruleHi:
      '???? ?????? ????? ?????? ??????? ?? ?????? ?????? ?? ?????? ?????? ???',
    ruleNe:
      '???? ?????? ??? ?????? ?????? ?????? ????????? ?????? ???????',
  },
  Gana: {
    key: 'Gana',
    name: 'Gana',
    nameHi: '??',
    nameNe: '??',
    maxScore: 6,
    area: 'Temperament � Behavioral Compatibility',
    weight: 'heavy',
    rule:
      'Gana classifies each nakshatra into one of three temperaments: Deva (divine, gentle), Manushya (human, mixed), Rakshasa (fierce, aggressive). Same-gana matches are ideal. Deva-Rakshasa is the most difficult combination - day and night temperaments.',
    ruleHi:
      '?? ???????? ??????? ?? ??? ???????? ??? ?????? ?? - ???, ??????, ???????',
    ruleNe:
      '???? ???????? ?????????? ??? ???????? ?????? - ???, ??????, ???????',
  },
  Bhakoot: {
    key: 'Bhakoot',
    name: 'Bhakoot',
    nameHi: '????',
    nameNe: '????',
    maxScore: 7,
    area: 'Emotional � Family Prosperity',
    weight: 'heavy',
    rule:
      'Bhakoot compares the two Moon signs. Certain sign-distances are considered inauspicious: 6-8 (Shadashtaka), 2-12 (Dwirdwadasha), and 5-9 (Navama-Panchama) in some traditions. Auspicious distances produce full marks; the inauspicious ones produce zero.',
    ruleHi:
      '???? ????? ?????? ??????? ?? ????? ??? ?-?, ?-??, ? ?-? ??????? ???? ???? ???? ????',
    ruleNe:
      '???? ??? ?????? ????????? ?????? ?-?, ?-??, ? ?-? ??????? ???? ????????',
  },
  Nadi: {
    key: 'Nadi',
    name: 'Nadi',
    nameHi: '?????',
    nameNe: '????',
    maxScore: 8,
    area: 'Health � Genetics � Offspring',
    weight: 'heavy',
    rule:
      "Nadi is the heaviest koota - 8 points. It reflects Ayurvedic constitution (Vata, Pitta, Kapha) as carried by the Moon's nakshatra. Couples of the same Nadi share too similar a constitution; tradition considers this harmful for progeny. Different Nadis produce full marks.",
    ruleHi:
      '????? ???? ???? ??? ?? - ? ???? ?? ?????????? ??????? (???, ?????, ??) ?? ??????? ???',
    ruleNe:
      '???? ???????? ???? ??? ?? - ? ???? ???? ?????????? ??????? (???, ?????, ??) ????????',
  },
};

// �������������������������������������������������������������
// 2. VERDICT LABELS PER KOOTA
// �������������������������������������������������������������

export interface KootaVerdict {
  label: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Bad';
  tone: 'positive' | 'neutral' | 'negative';
}

export function verdictForKoota(score: number, max: number): KootaVerdict {
  if (max === 0) return { label: 'Average', tone: 'neutral' };
  const pct = score / max;
  if (pct >= 1) return { label: 'Excellent', tone: 'positive' };
  if (pct >= 0.75) return { label: 'Good', tone: 'positive' };
  if (pct >= 0.4) return { label: 'Average', tone: 'neutral' };
  if (pct > 0) return { label: 'Poor', tone: 'negative' };
  return { label: 'Bad', tone: 'negative' };
}

// �������������������������������������������������������������
// 3. MANANGAL DOSHA - CLASSICAL RULES
// �������������������������������������������������������������

export const MANGLIK_HOUSES = [1, 2, 4, 7, 8, 12];

export const MANGLIK_HOUSE_NAMES: Record<number, string> = {
  1: 'The Body (Lagna)',
  2: 'The Family',
  4: 'The Home',
  7: 'The Marriage',
  8: 'Transformation',
  12: 'The Bed',
};

export interface MangalDoshaResult {
  // Rashi (whole-sign) reading - the classical view
  rashiHasDosha: boolean;
  rashiMarsHouse: number;
  rashiDescription: string;

  // Chalit (Sripati) variant
  chalitHasDosha: boolean;
  chalitMarsHouse: number;
  chalitShifted: boolean;
  chalitAspectsMarriageHouse: boolean;
  chalitDescription: string;

  // Mars condition
  marsDignity: string;
  marsRashiName: string;

  // Cancellation
  isCancelled: boolean;
  cancellationReason?: string;

  // Severity
  severity: 'none' | 'low' | 'mild' | 'moderate' | 'high';
}

/**
 * Compute classical Mangal Dosha from the Rashi chart.
 * Detects cancellation by dignity. Reports Chalit variant separately.
 */
export function computeMangalDosha(kundli: any, chalit: any): MangalDoshaResult {
  // ��� 1. Rashi chart: which house is Mars in? ���
  let rashiMarsHouse = 0;
  for (const h of kundli?.houses ?? []) {
    if (h.planets?.includes('Mars')) { rashiMarsHouse = h.number; break; }
  }
  const rashiHasDosha = MANGLIK_HOUSES.includes(rashiMarsHouse);

  // ��� 2. Chalit chart ���
  const chalitMars = (chalit?.planets ?? []).find?.((p: any) => p.name === 'Mars');
  const chalitMarsHouse = chalitMars?.house ?? rashiMarsHouse;
  const chalitShifted = Boolean(chalitMars?.shifted);
  const chalitHasDosha = MANGLIK_HOUSES.includes(chalitMarsHouse);

  // Does Mars aspect H7 from Chalit position?
  // 7th aspect from any house X is (X + 6) mod 12.
  // Special: for Mars (aspecting 4th, 7th, 8th houses from itself):
  //   House X casts aspects on (X+3) % 12, (X+6) % 12, (X+7) % 12
  const chalitAspectsMarriageHouse = [
    ((chalitMarsHouse + 3 - 1) % 12) + 1,
    ((chalitMarsHouse + 6 - 1) % 12) + 1,
    ((chalitMarsHouse + 7 - 1) % 12) + 1,
  ].includes(7);

  // ��� 3. Mars dignity ���
  const mars = kundli?.planets?.Mars ?? {};
  const marsDignity = mars.dignity ?? 'neutral';
  const marsRashiName = mars.rashiName ?? '-';

  // ��� 4. Cancellation by dignity ���
  let isCancelled = false;
  let cancellationReason: string | undefined;
  if (['own', 'exalted', 'moolatrikona'].includes(marsDignity)) {
    isCancelled = true;
    cancellationReason = `Mars is ${marsDignity} in ${marsRashiName}`;
  }

  // ��� 5. Severity ���
  let severity: MangalDoshaResult['severity'] = 'none';
  if (rashiHasDosha && !isCancelled) {
    severity = rashiMarsHouse === 7 ? 'high' : 'moderate';
  } else if (rashiHasDosha && isCancelled) {
    severity = 'low';
  } else if (chalitHasDosha) {
    severity = 'mild';
  }

  // ��� 6. Descriptions ���
  const rashiDescription = rashiHasDosha
    ? `Mars in House ${rashiMarsHouse} - a Mangal house${isCancelled ? ` - cancelled (${cancellationReason})` : ''}.`
    : `Mars in House ${rashiMarsHouse} - not a Mangal house. Not present.`;

  const chalitDescription = chalitShifted
    ? `Mars shifts from House ${rashiMarsHouse} (Rashi) to House ${chalitMarsHouse} (Chalit)${chalitHasDosha ? ' - a Mangal house' : ''}${chalitAspectsMarriageHouse ? ', aspects H7 (marriage)' : ''}.`
    : `No shift between charts. Mars remains in House ${chalitMarsHouse}.`;

  return {
    rashiHasDosha,
    rashiMarsHouse,
    rashiDescription,
    chalitHasDosha,
    chalitMarsHouse,
    chalitShifted,
    chalitAspectsMarriageHouse,
    chalitDescription,
    marsDignity,
    marsRashiName,
    isCancelled,
    cancellationReason,
    severity,
  };
}

/**
 * Given two people's Mangal Dosha results, produce a joint verdict.
 */
export function jointMangalVerdict(
  a: MangalDoshaResult,
  b: MangalDoshaResult
): {
  key: 'both-clear' | 'one-manglik' | 'both-manglik' | 'chalit-only';
  title: string;
  body: string;
} {
  const aManglik = a.rashiHasDosha && !a.isCancelled;
  const bManglik = b.rashiHasDosha && !b.isCancelled;

  if (!aManglik && !bManglik) {
    // Both clear - but one may have a Chalit variant
    if (a.chalitHasDosha || b.chalitHasDosha) {
      return {
        key: 'chalit-only',
        title: 'Both clear in Rashi � Chalit variant only',
        body:
          'Neither chart shows classical (Rashi-based) Mangal Dosha. One or both charts carry a mild Chalit-based variant - Mars shifts into a Mangal house in the Sripati house system. Most traditions weigh this lightly; a Jyotishi would look at the 7th house and Navamsha for confirmation before treating it as significant.',
      };
    }
    return {
      key: 'both-clear',
      title: 'Both charts clear',
      body:
        'Neither native carries classical Mangal Dosha. No remedy is strictly required. If the couple wishes to be traditional, a simple Ganesha or Hanuman puja before the wedding is customary and well-regarded.',
    };
  }

  if (aManglik && bManglik) {
    return {
      key: 'both-manglik',
      title: 'Both Manglik - traditional cancellation',
      body:
        "Both charts carry classical Mangal Dosha. The classical texts consider this a mutual cancellation - the two Marses absorb each other's heat. This is considered auspicious, not alarming. Many families prefer this configuration because the union is balanced.",
    };
  }

  // One is Manglik
  return {
    key: 'one-manglik',
    title: 'One partner carries the dosha',
    body:
      "One chart carries classical Mangal Dosha; the other is clear. Classical remedies apply: Kumbh Vivah (symbolic marriage to a pot before the wedding), Hanuman Chalisa on Tuesdays, and Maha Mrityunjaya japa. In many traditions, the union proceeds with these remedies and careful attention to the 7th house in the Manglik partner's chart.",
  };
}

// �������������������������������������������������������������
// 4. KNOWLEDGE BASE - general explanatory content
// �������������������������������������������������������������

export const KNOWLEDGE_BASE = {
  gunaMilan: {
    title: 'What is Guna Milan?',
    body:
      `Guna Milan (also Ashtakoota Guna Milan) is the classical Vedic system for compatibility. It compares eight qualities of the two natives' Moon signs and birth nakshatras, assigning each a score. The eight kootas total 36 points. The score alone does not decide the marriage - the tradition weighs which kootas carry the most weight, and whether any of the three "heavy" kootas (Graha Maitri, Gana, Bhakoot, Nadi) has failed.`,
  },
  scoreInterpretation: {
    title: 'Reading the score',
    body:
      'With Bhakoot and Nadi both favorable: 31-36 is excellent, 21-30 very good, 17-20 average, and 0-16 inauspicious. If Bhakoot is unfavourable, no score can be "excellent" - 26-29 is very good at best, 21-25 average, and 0-20 inauspicious. If Nadi is unfavourable, classical tradition considers the match inauspicious even at 28 points.',
  },
  doshas: {
    title: 'Koota doshas',
    body:
      'Several kootas carry a "dosha" name when they fail: Nadi Dosha (progeny), Bhakoot Dosha (family prosperity), and Yoni hostility (physical compatibility). Each has its own remedy tradition, and each is weighed differently depending on which other kootas failed.',
  },
  methodology: {
    title: 'Calculation methodology',
    body:
      'The Moon sign and birth nakshatra of both natives are computed using Lahiri ayanamsa (Sidereal, whole-sign houses) from the birth date, time, and place. Koota comparisons follow the Drik Panchang convention. The Mangal Dosha analysis weighs both the classical Rashi (whole-sign) chart and the Sripati (Chalit) house system.',
  },
};