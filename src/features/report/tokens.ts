/**
 * Report design tokens.
 * Centralized so the whole report can be re-themed from one place.
 */

export const REPORT_TOKENS = {
  // Layout
  pageMaxWidth: '900px',
  sectionPadding: 'py-10',
  sectionGap: 'space-y-8',

  // Card
  cardPadding: 'p-6',
  cardRadius: 'rounded-xl',
  cardBg: 'bg-card',
  cardBorder: 'border',
  cardShadow: 'shadow-sm',

  // Colors
  accentGold: '#C9A961',
  accentSaffron: 'hsl(var(--primary))',
  inkMuted: 'hsl(var(--muted-foreground))',
  inkPrimary: 'hsl(var(--foreground))',
  paperCream: 'hsl(var(--card))',

  // Typography
  h1: 'text-3xl md:text-4xl font-bold tracking-tight',
  h2: 'text-2xl font-bold tracking-tight',
  h3: 'text-sm font-semibold uppercase tracking-wider',
  body: 'text-sm leading-relaxed',
  dataLabel: 'text-[10px] uppercase tracking-wider text-muted-foreground',
  dataValue: 'text-sm font-semibold',
  mono: 'font-mono text-xs',

  // Planet colors (traditional)
  planetColors: {
    Sun: '#E63946',
    Moon: '#B8C5D6',
    Mars: '#D62828',
    Mercury: '#2A9D8F',
    Jupiter: '#D4A017',
    Venus: '#E8A87C',
    Saturn: '#264653',
    Rahu: '#6A4C93',
    Ketu: '#8D99AE',
    Ascendant: '#C9A961',
  } as const,

  // House categories
  houseCategories: {
    1: 'kendra',
    2: 'neutral',
    3: 'neutral',
    4: 'kendra',
    5: 'trikona',
    6: 'dusthana',
    7: 'kendra',
    8: 'dusthana',
    9: 'trikona',
    10: 'kendra',
    11: 'neutral',
    12: 'dusthana',
  } as const,
} as const;

export type ReportTokens = typeof REPORT_TOKENS;
