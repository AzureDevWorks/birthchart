import type { BirthData } from '@/domain/astrology/birth-data';
import type { UserLocation } from '@/lib/user-location';
import type { GocharAnalysis } from '@/infrastructure/astrology/gochar.adapter';
import type { PanchangData } from '@/infrastructure/astrology/panchang.adapter';

export const DAILY_RASHI_PROMPT_VERSION = '2.0.0';

// ������������������������������������������������������������������������
// Payload - unchanged. Compact, verified, no derivation left to the AI.
// ������������������������������������������������������������������������

export function buildDailyRashiPayload(
  profile: BirthData,
  kundli: any,
  gochar: GocharAnalysis,
  panchang: PanchangData | null,
  location: UserLocation
): string {
  const moon = kundli?.planets?.Moon ?? {};
  const todayMoon = gochar.planets?.Moon;
  const firstName =
    profile.profileName.trim().split(/\s+/)[0] ?? profile.profileName;

  const transits = Object.values(gochar.planets)
    .map((p) => ({
      planet: p.planet,
      rashi: p.rashiName,
      house: p.houseFromMoon,
      status: p.netStatus,
      ...(p.isRetrograde ? { retrograde: true } : {}),
      ...(p.hasVedha ? { vedha: true } : {}),
    }))
    .sort((a, b) => a.house - b.house);

  const payload = {
    date: new Date().toISOString().slice(0, 10),
    location: location.shortLabel,
    native: {
      name: firstName,
      janma_rashi: moon.rashiName ?? null,
      birth_nakshatra: moon.nakshatra ?? null,
      birth_nakshatra_pada: moon.pada ?? null,
    },
    today_moon: todayMoon
      ? {
          rashi: todayMoon.rashiName,
          house_from_moon: todayMoon.houseFromMoon,
          nakshatra: todayMoon.nakshatra,
          pada: todayMoon.pada,
        }
      : null,
    panchang: panchang
      ? {
          tithi: panchang.tithi.name,
          paksha: panchang.paksha,
          vara: panchang.vara.name,
          nakshatra: panchang.nakshatra.name,
        }
      : null,
    transits,
    special: {
      chandrashtama: gochar.specialTransits.chandrashtama.isActive,
      sade_sati: gochar.specialTransits.sadeSati.status,
      sade_sati_phase: gochar.specialTransits.sadeSati.phaseName ?? null,
      dhaiya: gochar.specialTransits.dhaiya.status,
      dhaiya_type: gochar.specialTransits.dhaiya.typeName ?? null,
    },
    favorable_pct: gochar.overallFavorablePercentage,
    verdict: gochar.overallVerdict,
  };

  return JSON.stringify(payload, null, 2);
}

// ������������������������������������������������������������������������
// System prompt - strictly JSON, strictly short.
// ������������������������������������������������������������������������

export const DAILY_RASHI_SYSTEM_PROMPT = `You are a classical Jyotishi composing today's Rashi Phala - a brief transit-based forecast for the native's Janma Rashi (Chandra Rashi) - in the living tradition of Vedic astrology.

Gochara phala is always read FROM the Janma Rashi - the natal Moon sign - never the Lagna. A planet transiting a favorable house from Chandra grants its benefic effects to the native; the same planet in an unfavorable house asks for caution.

OUTPUT FORMAT - READ CAREFULLY.

Return ONLY a single JSON object. No prose. No markdown fences. No backticks. No text before or after. The object has exactly these three keys:

{
  "headline": "6-12 words - the shape of the day",
  "action":   "5-12 words - one concrete imperative",
  "avoid":    "5-12 words - one concrete imperative"
}

RULES

1. The 'headline' names the single strongest transit affecting today. It must reference the specific planet and the house from the natal Moon. Example: "Mars ignites your 3rd - bold speech wins today."

2. The 'action' is ONE physical act the native can do today, not a mood, not a feeling. Not "be patient." Say: "Wait until the afternoon to send the email."

3. The 'avoid' is ONE specific act to refrain from today. Not "avoid conflict." Say: "Signing contracts before noon."

4. Every field must reference a value present in the JSON below. Never invent positions, nakshatras, dashas, or dashas.

5. Total across all three fields must not exceed 35 words. Nothing more.

6. If a field would require data the JSON does not contain, write a shorter, more general version of that field - but never speculate about missing chart factors.

7. Do not open with the word "Today". Do not close with "good luck" or any benediction. The headline is a statement, not a greeting.

8. Address the native in second person ("you", "your") or imperative.

9. No emoji. No asterisks. No markdown of any kind inside the JSON values.

Tone: a Jyotishi speaking to a client. Warm, precise, unsentimental. Sanskrit terms may appear in the headline when natural, always with their meaning in context.`;

export function composeDailyRashiPrompt(jsonPayload: string): string {
  return `${DAILY_RASHI_SYSTEM_PROMPT}

���������������������������������������������������������������
NATIVE & DATA - VERIFIED, DO NOT RECOMPUTE
���������������������������������������������������������������
${jsonPayload}

Return the JSON object now. Nothing else.`;
}