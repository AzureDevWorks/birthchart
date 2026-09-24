/**
 * Manuscript palette - ivory paper + brown ink, with gold and
 * vermilion that respond to the user's palette choice.
 *
 * Paper (ivory) and ink (brown) stay constant across palettes.
 * Gold and vermilion shift with `data-palette` on <html>.
 *
 * CSS variables are defined in src/styles/globals.css.
 * The PaletteProvider sets document.documentElement.dataset.palette.
 */

export const MANUSCRIPT = {
  ivory:      'hsl(var(--manuscript-ivory))',
  ivoryDeep:  'hsl(var(--manuscript-ivory-deep))',
  brown:      'hsl(var(--manuscript-brown))',
  brownSoft:  'hsl(var(--manuscript-brown-soft))',
  gold:       'hsl(var(--manuscript-gold))',
  goldSoft:   'hsl(var(--manuscript-gold-soft))',
  vermilion:  'hsl(var(--manuscript-vermilion))',
} as const;

/**
 * Alpha-aware helpers. Usage: MANUSCRIPT_ALPHA.gold(0.35)
 * These build on the same CSS variables so they also shift with palette.
 */
export const MANUSCRIPT_ALPHA = {
  gold:      (a: number) => `hsl(var(--manuscript-gold) / ${a})`,
  goldSoft:  (a: number) => `hsl(var(--manuscript-gold-soft) / ${a})`,
  vermilion: (a: number) => `hsl(var(--manuscript-vermilion) / ${a})`,
  brown:     (a: number) => `hsl(var(--manuscript-brown) / ${a})`,
  ivoryDeep: (a: number) => `hsl(var(--manuscript-ivory-deep) / ${a})`,
  ivory:     (a: number) => `hsl(var(--manuscript-ivory) / ${a})`,
} as const;