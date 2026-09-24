/**
 * Builds the AI prompt payloads as JSON strings.
 *
 * v2.2 — Gochar payload now uses the library's pre-computed transit
 * analysis (house-from-Moon, Sade Sati, Dhaiya, Vedha, life areas)
 * instead of raw current positions. The AI no longer has to derive
 * transit houses itself — it cites them.
 */
import { gocharAdapter } from '@/infrastructure/astrology/gochar.adapter';

/** Return type of buildChartPayload — a JSON string. */
export type ChartPayload = string;

// ─────────────────────────────────────────────────────────────────────
// Natal chart payload
// ─────────────────────────────────────────────────────────────────────

export function buildChartPayload(kundli: any): string {
  const payload = {
    framework:
      'Vedic Astrology (Sidereal Zodiac, Lahiri Ayanamsa, Whole Sign Houses)',
    core_anchors: {
      lagna: {
        rashi: kundli.ascendant?.rashiName,
        degree: kundli.ascendant?.degree,
        nakshatra: kundli.ascendant?.nakshatra,
        pada: kundli.ascendant?.pada,
      },
      moon: {
        rashi: kundli.planets?.Moon?.rashiName,
        degree: kundli.planets?.Moon?.degree,
        nakshatra: kundli.planets?.Moon?.nakshatra,
        pada: kundli.planets?.Moon?.pada,
      },
      sun: {
        rashi: kundli.planets?.Sun?.rashiName,
        degree: kundli.planets?.Sun?.degree,
        nakshatra: kundli.planets?.Sun?.nakshatra,
      },
    },
    planetary_positions: Object.entries(kundli.planets || {}).map(
      ([name, data]: [string, any]) => ({
        planet: name,
        rashi: data.rashiName,
        house: data.house,
        nakshatra: data.nakshatra,
        is_retrograde: !!data.isRetrograde,
        is_combust: !!data.isCombust,
        dignity: data.dignity || 'Neutral',
      })
    ),
    active_dasha_timeline: {
      current_mahadasha: kundli.dasha?.currentMahadasha?.planet,
      current_antardasha: kundli.dasha?.currentAntar?.planet,
      current_pratyantar: kundli.dasha?.currentPratyantar?.planet,
      mahadasha_percent_complete:
        kundli.dasha?.currentMahadasha?.progressPercent?.toFixed(1),
    },
    key_aspects: (kundli.drishti?.mutualAspects || []).map(
      (m: any) => `${m.planet1} mutually aspects ${m.planet2}`
    ),
    ashtakavarga_strength: {
      strongest_houses: kundli.ashtakavarga?.sav?.strongestHouse
        ? [kundli.ashtakavarga.sav.strongestHouse]
        : [],
    },
  };

  return JSON.stringify(payload, null, 2);
}

// ─────────────────────────────────────────────────────────────────────
// Gochar payload — enriched with the library's pre-computed transit math
// ─────────────────────────────────────────────────────────────────────

export function buildGocharPayload(natalKundli: any): string {
  const a = gocharAdapter.analyze(natalKundli, new Date());

  const payload = {
    transit_reference: `Transits on ${a.transitDate.slice(0, 10)} relative to Natal Moon in ${a.natalMoonRashiName}`,
    natal_moon_rashi: a.natalMoonRashiName,
    natal_lagna_rashi: a.natalLagnaRashiName,
    overall_verdict: a.overallVerdict,
    overall_favorable_percentage: a.overallFavorablePercentage,

    current_planets: Object.entries(a.planets).map(([name, p]) => ({
      planet: name,
      rashi: p.rashiName,
      degree: p.degree,
      nakshatra: p.nakshatra,
      pada: p.pada,
      house_from_moon: p.houseFromMoon,
      house_from_lagna: p.houseFromLagna,
      is_retrograde: p.isRetrograde,
      has_vedha: p.hasVedha,
      vedha_caused_by: p.vedhaCausedBy ?? null,
      net_status: p.netStatus,
      sav_bindus_in_house: p.savBindusInHouse,
      prediction: p.prediction,
    })),

    special_transits: {
      sade_sati: a.specialTransits.sadeSati,
      dhaiya: a.specialTransits.dhaiya,
      chandrashtama: a.specialTransits.chandrashtama,
      guru_gochar: a.specialTransits.guruGochar,
      rahu_ketu_axis: a.specialTransits.rahuKetuAxis,
    },

    life_areas: a.lifeAreas,
    actionable_advice: a.actionableAdvice,
  };

  return JSON.stringify(payload, null, 2);
}