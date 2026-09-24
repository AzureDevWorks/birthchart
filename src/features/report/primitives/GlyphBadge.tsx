import { REPORT_TOKENS } from '../tokens';

export type PlanetKey = keyof typeof REPORT_TOKENS.planetColors;

interface GlyphBadgeProps {
  /** Unicode glyph: ☉ ☽ ♂ ☿ ♃ ♀ ♄ ☊ ☋ */
  glyph: string;
  /** Which planet's traditional color to use */
  planet?: PlanetKey;
  /** Size in px */
  size?: number;
  /** Show colored background */
  filled?: boolean;
  /** Highlight with gold ring (for Ascendant, Lagna, etc.) */
  highlight?: boolean;
  className?: string;
  title?: string;
}

/**
 * A circular badge displaying a Unicode astrological glyph
 * in its traditional Jyotish color.
 */
export function GlyphBadge({
  glyph,
  planet = 'Ascendant',
  size = 32,
  filled = false,
  highlight = false,
  className,
  title,
}: GlyphBadgeProps) {
  const color = REPORT_TOKENS.planetColors[planet] ?? '#666';

  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 rounded-full ${className ?? ''}`}
      style={{
        width: size,
        height: size,
        color: filled ? '#fff' : color,
        background: filled ? color : `${color}18`,
        border: highlight ? `1.5px solid ${REPORT_TOKENS.accentGold}` : 'none',
        boxShadow: highlight
          ? `0 0 0 3px ${REPORT_TOKENS.accentGold}22`
          : undefined,
        fontSize: size * 0.55,
        lineHeight: 1,
        fontFamily: 'Noto Sans Symbols 2, system-ui, sans-serif',
      }}
      title={title}
      aria-label={title}
      role={title ? 'img' : undefined}
    >
      {glyph}
    </span>
  );
}
