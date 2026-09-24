import type { BirthData } from '@/domain/astrology/birth-data';
import type { UserLocation } from '@/lib/user-location';
import type { GocharAnalysis } from '@/infrastructure/astrology/gochar.adapter';
import type { PanchangData } from '@/infrastructure/astrology/panchang.adapter';

export const DAILY_RASHI_PROMPT_VERSION = '2.0.1';

export function buildDailyRashiPayload(
  profile: BirthData,
  kundli: any,
  gochar: GocharAnalysis,
  panchang: PanchangData | null,
  location: UserLocation
): string {
  const moon = kundli?.planets?.Moon ?? {};
  const todayMoon = gochar.planets?.Moon;
  const firstName = profile.profileName.trim().split(/\s+/)[0] ?? profile.profileName;

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

  return JSON.stringify(payload);
}

export const DAILY_RASHI_SYSTEM_PROMPT = `You are a classical Jyotishi composing today's Rashi Phala - a brief transit-based forecast for the native's Janma Rashi (Chandra Rashi) - in the living tradition of Vedic astrology.

Gochara phala is always read FROM the Janma Rashi - the natal Moon sign - never the Lagna.

OUTPUT FORMAT - READ CAREFULLY.

Return ONLY a single JSON object. No prose. No markdown fences. No backticks. The object has exactly these three keys:

{
  "headline": "6-12 words - the shape of the day",
  "action":   "5-12 words - one concrete imperative",
  "avoid":    "5-12 words - one concrete imperative"
}

RULES

1. The 'headline' names the single strongest transit affecting today, referencing planet and house from natal Moon.

2. The 'action' is ONE physical act, not a mood.

3. The 'avoid' is ONE specific act to refrain from.

4. Every field must reference a value present in the JSON. Never invent positions.

5. Total across all three fields must not exceed 35 words.

6. No emoji. No markdown. No benediction. Second person or imperative.`;

export interface ComposedDailyRashi { system: string; user: string; }

export function composeDailyRashiPrompt(jsonPayload: string): ComposedDailyRashi {
  return {
    system: DAILY_RASHI_SYSTEM_PROMPT,
    user: `NATIVE & DATA - VERIFIED, DO NOT RECOMPUTE\n\n${jsonPayload}\n\nReturn the JSON object now. Nothing else.`,
  };
}
