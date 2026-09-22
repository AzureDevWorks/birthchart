export const CHART_THEME = {
  // â”€â”€â”€ Frame â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  frameStroke: 'hsl(38 85% 52%)',
  frameStrokeWidth: 5,
  frameCornerRadius: 0,
  frameInnerGlow: 'hsl(38 90% 65% / 0.35)',

  // â”€â”€â”€ Canvas background â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  canvasBg: 'hsl(42 55% 97%)',
  canvasBgDark: 'hsl(30 25% 14%)',

  // â”€â”€â”€ Chart lines (deep gold) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  borderStroke: 'hsl(38 75% 42%)',
  borderStrokeWidth: 1.75,
  innerStroke: 'hsl(38 65% 55%)',
  innerStrokeWidth: 1.25,

  // â”€â”€â”€ House fills â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  houseBackground: 'hsl(42 55% 97%)',
  houseHoverBackground: 'hsl(38 80% 88%)',
  houseSelectedBackground: 'hsl(32 95% 85%)',

  // â”€â”€â”€ House numbers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  houseNumberColor: 'hsl(30 45% 38%)',
  houseNumberSize: 11,
  houseNumberFont: "'Noto Serif Devanagari', ui-monospace, monospace",
  houseNumberWeight: 500,

  // â”€â”€â”€ Planet glyphs â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  planetColor: 'hsl(25 55% 22%)',
  planetSize: 13,
  planetFont: "'Noto Serif Devanagari', 'Noto Sans Devanagari', sans-serif",
  planetWeight: 600,

  planetDegreeColor: 'hsl(30 35% 45%)',
  planetDegreeSize: 9,
  planetDegreeFont: 'ui-monospace, monospace',

  retrogradeColor: 'hsl(355 70% 48%)',
  combustColor: 'hsl(28 90% 45%)',

  ascendantColor: 'hsl(32 95% 40%)',
  ascendantWeight: 700,

  // â”€â”€â”€ Center medallion (Ganesh) â€” INSET look â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  medallionRadius: 0.14,          // outer ring
  medallionInnerRadius: 0.135,    // inner cream fill
  ganeshImagePath: '/ganesh.png',
  ganeshImageOpacity: 0.85,       // slight fade = printed feel
  ganeshImageInset: 0.06,         // padding between image and medallion edge

  // Inner shadow ring â€” creates the "pressed into paper" feel
  medallionShadowColor: 'hsl(30 60% 35%)',
  medallionShadowOpacity: 0.35,
  medallionShadowWidth: 3,        // px stroke that fades inward

  // Outer highlight ring
  medallionHighlightColor: 'hsl(45 95% 88%)',
  medallionHighlightWidth: 1.5,

  // Soft drop shadow cast by the medallion
  medallionDropShadow: true,
  medallionDropShadowOpacity: 0.15,

  // â”€â”€â”€ No sunburst (removes the "floating" feel) â”€â”€â”€â”€â”€â”€â”€â”€
  sunburstRayCount: 0,
  sunburstColor: 'hsl(38 90% 60%)',
  sunburstOpacity: 0,
  sunburstRadius: 0,
  sunburstRayLength: 0,

  // â”€â”€â”€ Layout â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  padding: 8,
  houseNumberOffset: { x: 0, y: -6 },
  planetLineHeight: 14,
} as const;

export type ChartTheme = typeof CHART_THEME;
