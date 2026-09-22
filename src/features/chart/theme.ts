export const CHART_THEME = {
  // --- Frame ---
  frameStroke: 'hsl(38 85% 52%)',
  frameStrokeWidth: 5,
  frameCornerRadius: 0,
  frameInnerGlow: 'hsl(38 90% 65% / 0.35)',

  // --- Canvas background ---
  canvasBg: 'hsl(42 55% 97%)',
  canvasBgDark: 'hsl(30 25% 14%)',

  // --- Chart lines (deep gold) ---
  borderStroke: 'hsl(38 75% 42%)',
  borderStrokeWidth: 1.75,
  innerStroke: 'hsl(38 65% 55%)',
  innerStrokeWidth: 1.25,

  // --- House fills ---
  houseBackground: 'hsl(42 55% 97%)',
  houseHoverBackground: 'hsl(38 80% 88%)',
  houseSelectedBackground: 'hsl(32 95% 85%)',

  // --- House numbers ---
  houseNumberColor: 'hsl(30 45% 38%)',
  houseNumberSize: 11,
  houseNumberFont: "'Noto Serif Devanagari', ui-monospace, monospace",
  houseNumberWeight: 500,

  // --- Planet glyphs ---
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

  // --- Center medallion (Ganesh) ---
  medallionRadius: 0.14,
  medallionInnerRadius: 0.135,
  ganeshImagePath: '/ganesh.png',
  ganeshImageOpacity: 0.85,
  ganeshImageInset: 0.06,

  medallionShadowColor: 'hsl(30 60% 35%)',
  medallionShadowOpacity: 0.35,
  medallionShadowWidth: 3,

  medallionHighlightColor: 'hsl(45 95% 88%)',
  medallionHighlightWidth: 1.5,

  medallionDropShadow: true,
  medallionDropShadowOpacity: 0.15,

  // --- Sunburst (disabled) ---
  sunburstRayCount: 0,
  sunburstColor: 'hsl(38 90% 60%)',
  sunburstOpacity: 0,
  sunburstRadius: 0,
  sunburstRayLength: 0,

  // --- Layout ---
  padding: 8,
  houseNumberOffset: { x: 0, y: -6 },
  planetLineHeight: 14,
} as const;

export type ChartTheme = typeof CHART_THEME;