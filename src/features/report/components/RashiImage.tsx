import { useState } from 'react';
import { RASHI_GLYPHS } from '../lib/glyphs';
import { rashiImageUrl } from '../lib/rashi-images';
import { cn } from '@/lib/utils';

export interface RashiImageProps {
  rashi: string;
  /** Width/height in px. */
  size?: number;
  /** 'circle' (default) or 'rounded' (8px radius). */
  shape?: 'circle' | 'rounded' | 'square';
  /** Optional className applied to the wrapper. */
  className?: string;
  /** Border color. */
  borderColor?: string;
  /** Background behind the image (visible on error). */
  bgColor?: string;
  /** Adds a soft gold ring (matches GlyphBadge.highlight). */
  highlight?: boolean;
  /** Tooltip / alt text. Defaults to the rashi name. */
  title?: string;
  /** When true, the image fills its parent. Wrapper size is ignored. */
  fill?: boolean;
}

const DEFAULT_BG = 'hsl(38 40% 92%)';

/**
 * Renders a rashi image with a graceful fallback to the rashi glyph.
 * If the file is missing (404) or the rashi is unknown, the glyph
 * circle shows instead — so the UI never breaks.
 */
export function RashiImage({
  rashi,
  size = 32,
  shape = 'circle',
  className,
  borderColor,
  bgColor = DEFAULT_BG,
  highlight = false,
  title,
  fill = false,
}: RashiImageProps) {
  const [failed, setFailed] = useState(false);
  const url = rashiImageUrl(rashi);
  const radius =
    shape === 'circle' ? '9999px' : shape === 'rounded' ? '8px' : '0px';

  const wrapperStyle: React.CSSProperties = fill
    ? { width: '100%', height: '100%', borderRadius: radius, background: bgColor }
    : {
        width: size,
        height: size,
        borderRadius: radius,
        background: bgColor,
        border: borderColor ? `1px solid ${borderColor}` : undefined,
        boxShadow: highlight
          ? '0 0 0 3px hsl(38 55% 48% / 0.18)'
          : undefined,
      };

  // Fallback: glyph-only circle
  if (!url || failed) {
    return (
      <span
        className={cn(
          'inline-flex items-center justify-center shrink-0 overflow-hidden select-none',
          className
        )}
        style={{
          ...wrapperStyle,
          fontSize: fill ? '1em' : size * 0.5,
          lineHeight: 1,
          fontFamily: "'Noto Serif Devanagari', serif",
          color: 'hsl(30 45% 38%)',
        }}
        title={title ?? rashi}
        aria-label={title ?? rashi}
        role="img"
      >
        {RASHI_GLYPHS[rashi] ?? '·'}
      </span>
    );
  }

  return (
    <span
      className={cn('inline-flex shrink-0 overflow-hidden', className)}
      style={wrapperStyle}
    >
      <img
        src={url}
        alt={title ?? rashi}
        title={title ?? rashi}
        onError={() => setFailed(true)}
        className="w-full h-full object-cover"
        draggable={false}
        loading="lazy"
      />
    </span>
  );
}