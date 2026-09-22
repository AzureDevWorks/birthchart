import { useMemo, useId } from 'react';
import {
  getHousePolygon,
  getHouseCentroid,
  getOuterSquarePath,
  getDiamondPath,
  getDiagonalPaths,
  getSouthInnerCells,
  pointsToPath,
  type Point,
} from '../lib/geometry';
import { CHART_THEME } from '../theme';
import type { ChartStyle, ChartHouse, ChartPlanetPlacement } from '../types';

interface BaseChartProps {
  style: ChartStyle;
  size: number;
  houses?: ChartHouse[];
  lang?: 'en' | 'hi' | 'ne';
}

export function BaseChart({ style, size, houses, lang = 'en' }: BaseChartProps) {
  const padding = CHART_THEME.padding;
  const innerSize = size - padding * 2;
  const uid = useId().replace(/:/g, '');

  const outerPath = useMemo(() => getOuterSquarePath(innerSize), [innerSize]);
  const diamondPath = useMemo(
    () => (style === 'north' ? getDiamondPath(innerSize) : null),
    [style, innerSize]
  );
  const diagonals = useMemo(
    () => (style === 'north' ? getDiagonalPaths(innerSize) : []),
    [style, innerSize]
  );

  const houseShapes = useMemo(() => {
    const result: Array<{
      house: number;
      path: string;
      center: Point;
      data: ChartHouse | null;
    }> = [];
    for (let h = 1; h <= 12; h++) {
      const pts = getHousePolygon(h, style);
      if (pts.length === 0) continue;
      const data = houses?.find((hh) => hh.number === h) ?? null;
      result.push({
        house: h,
        path: pointsToPath(pts, innerSize),
        center: getHouseCentroid(h, style),
        data,
      });
    }
    return result;
  }, [style, innerSize, houses]);

  const southInner = useMemo(
    () => (style === 'south' ? getSouthInnerCells(innerSize) : []),
    [style, innerSize]
  );

  const centerX = innerSize / 2;
  const centerY = innerSize / 2;
  const medallionOuter = CHART_THEME.medallionRadius * innerSize;
  const medallionInner = CHART_THEME.medallionInnerRadius * innerSize;
  const imageInset = CHART_THEME.ganeshImageInset * innerSize;
  const imageSize = medallionInner * 2 - imageInset * 2;
  const maskRadius = medallionOuter + 4;

  const houseNumDisplay = (n: number) =>
    lang === 'ne' || lang === 'hi'
      ? String(n).replace(/\d/g, (d) => '\u0966\u0967\u0968\u0969\u096A\u096B\u096C\u096D\u096E\u096F'[Number(d)])
      : String(n);

  const frameGradId = `sacred-frame-${uid}`;
  const ganeshClipId = `ganesh-clip-${uid}`;
  const centerMaskId = `center-mask-${uid}`;
  const innerShadowId = `medallion-inner-shadow-${uid}`;
  const dropShadowFilterId = `medallion-drop-shadow-${uid}`;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={style === 'north' ? 'North Indian chart' : 'South Indian chart'}
      style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
    >
      <defs>
        <linearGradient id={frameGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(38 90% 62%)" />
          <stop offset="50%" stopColor="hsl(38 85% 52%)" />
          <stop offset="100%" stopColor="hsl(32 90% 48%)" />
        </linearGradient>

        <clipPath id={ganeshClipId}>
          <circle cx={centerX} cy={centerY} r={medallionInner - 1} />
        </clipPath>

        <mask id={centerMaskId}>
          <rect x={0} y={0} width={innerSize} height={innerSize} fill="white" />
          <circle cx={centerX} cy={centerY} r={maskRadius} fill="black" />
        </mask>

        <radialGradient id={innerShadowId}>
          <stop offset="0%" stopColor={CHART_THEME.medallionShadowColor} stopOpacity="0" />
          <stop offset="70%" stopColor={CHART_THEME.medallionShadowColor} stopOpacity="0" />
          <stop offset="95%" stopColor={CHART_THEME.medallionShadowColor} stopOpacity={CHART_THEME.medallionShadowOpacity} />
          <stop offset="100%" stopColor={CHART_THEME.medallionShadowColor} stopOpacity={CHART_THEME.medallionShadowOpacity + 0.15} />
        </radialGradient>

        {CHART_THEME.medallionDropShadow && (
          <filter id={dropShadowFilterId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="0" dy="2" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope={CHART_THEME.medallionDropShadowOpacity} />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        )}
      </defs>

      <rect
        x={padding}
        y={padding}
        width={innerSize}
        height={innerSize}
        rx={CHART_THEME.frameCornerRadius ?? 0}
        ry={CHART_THEME.frameCornerRadius ?? 0}
        fill={CHART_THEME.canvasBg}
        stroke={`url(#${frameGradId})`}
        strokeWidth={CHART_THEME.frameStrokeWidth}
      />
      <rect
        x={padding + 4}
        y={padding + 4}
        width={innerSize - 8}
        height={innerSize - 8}
        rx={Math.max(0, (CHART_THEME.frameCornerRadius ?? 0) - 4)}
        ry={Math.max(0, (CHART_THEME.frameCornerRadius ?? 0) - 4)}
        fill="none"
        stroke={CHART_THEME.frameInnerGlow}
        strokeWidth={1}
      />

      <g transform={`translate(${padding}, ${padding})`}>
        {/* House backgrounds */}
        {houseShapes.map(({ house, path }) => (
          <path key={`bg-${house}`} d={path} fill={CHART_THEME.houseBackground} />
        ))}

        {southInner.map((cell, i) => (
          <rect
            key={`inner-${i}`}
            x={cell.x}
            y={cell.y}
            width={cell.width}
            height={cell.height}
            fill="none"
            stroke={CHART_THEME.innerStroke}
            strokeWidth={CHART_THEME.innerStrokeWidth}
            opacity={0.4}
          />
        ))}

        {/* Medallion */}
        {CHART_THEME.medallionDropShadow && (
          <circle
            cx={centerX}
            cy={centerY}
            r={medallionOuter}
            fill={CHART_THEME.canvasBg}
            filter={`url(#${dropShadowFilterId})`}
          />
        )}
        <circle cx={centerX} cy={centerY} r={medallionInner} fill={CHART_THEME.canvasBg} />
        <circle cx={centerX} cy={centerY} r={medallionInner} fill={`url(#${innerShadowId})`} pointerEvents="none" />
        <g clipPath={`url(#${ganeshClipId})`} opacity={CHART_THEME.ganeshImageOpacity}>
          <image
            href={CHART_THEME.ganeshImagePath}
            x={centerX - imageSize / 2}
            y={centerY - imageSize / 2}
            width={imageSize}
            height={imageSize}
            preserveAspectRatio="xMidYMid meet"
          />
        </g>
        <circle
          cx={centerX}
          cy={centerY}
          r={medallionInner - 1}
          fill="none"
          stroke={CHART_THEME.medallionHighlightColor}
          strokeWidth={CHART_THEME.medallionHighlightWidth}
          opacity={0.6}
          pointerEvents="none"
        />
        <circle cx={centerX} cy={centerY} r={medallionOuter} fill="none" stroke={`url(#${frameGradId})`} strokeWidth={1.75} />

        {/* Chart structure (masked) */}
        <g mask={`url(#${centerMaskId})`}>
          <path d={outerPath} fill="none" stroke={CHART_THEME.borderStroke} strokeWidth={CHART_THEME.borderStrokeWidth} />
          {diagonals.map((d, i) => (
            <path key={`diag-${i}`} d={d} fill="none" stroke={CHART_THEME.innerStroke} strokeWidth={CHART_THEME.innerStrokeWidth} />
          ))}
          {diamondPath && (
            <path d={diamondPath} fill="none" stroke={CHART_THEME.innerStroke} strokeWidth={CHART_THEME.innerStrokeWidth} />
          )}
          {style === 'north' &&
            houseShapes.map(({ house, path }) => (
              <path
                key={`outline-${house}`}
                d={path}
                fill="none"
                stroke={CHART_THEME.innerStroke}
                strokeWidth={CHART_THEME.innerStrokeWidth}
              />
            ))}
          {style === 'south' && (
            <>
              {[1, 2, 3].map((i) => (
                <line
                  key={`vline-${i}`}
                  x1={(i * innerSize) / 4}
                  y1={0}
                  x2={(i * innerSize) / 4}
                  y2={innerSize}
                  stroke={CHART_THEME.innerStroke}
                  strokeWidth={CHART_THEME.innerStrokeWidth}
                />
              ))}
              {[1, 2, 3].map((i) => (
                <line
                  key={`hline-${i}`}
                  x1={0}
                  y1={(i * innerSize) / 4}
                  x2={innerSize}
                  y2={(i * innerSize) / 4}
                  stroke={CHART_THEME.innerStroke}
                  strokeWidth={CHART_THEME.innerStrokeWidth}
                />
              ))}
            </>
          )}
        </g>

        {/* Planets + house numbers (masked) */}
        <g mask={`url(#${centerMaskId})`}>
          {houseShapes.map(({ house, center, data }) => (
            <HouseContents
              key={`contents-${house}`}
              house={house}
              center={center}
              size={innerSize}
              planets={data?.planets ?? []}
              numDisplay={houseNumDisplay(house)}
            />
          ))}
        </g>
      </g>
    </svg>
  );
}

/**
 * Render house contents — planets stack compactly, adapt to count.
 * Planets group in rows of up to 3, columns adjust.
 */
function HouseContents({
  center,
  size,
  planets,
  numDisplay,
}: {
  house: number;
  center: Point;
  size: number;
  planets: ChartPlanetPlacement[];
  numDisplay: string;
}) {
  const cx = center.x * size;
  const cy = center.y * size;
  const n = planets.length;

  // Adaptive sizing
  const fontSize = n === 0 ? 0 : n === 1 ? 13 : n === 2 ? 11 : n <= 4 ? 9 : 8;
  const degFontSize = Math.max(7, fontSize - 3);
  const lineHeight = fontSize + 3;
  const colGap = fontSize + 8;

  // Grid layout: max 2 columns, rows as needed
  const cols = n <= 2 ? 1 : n <= 4 ? 2 : 3;
  const rows = Math.ceil(n / cols) || 0;
  const totalWidth = (cols - 1) * colGap;
  const totalHeight = rows * lineHeight;

  const startX = cx - totalWidth / 2;
  const startY = cy - totalHeight / 2 + lineHeight / 2 - (n > 0 ? 4 : 0);

  return (
    <g>
      {/* House number — above the planets */}
      <text
        x={cx}
        y={cy - (n > 0 ? totalHeight / 2 + 10 : 0)}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={10}
        fontFamily={CHART_THEME.houseNumberFont}
        fontWeight={CHART_THEME.houseNumberWeight}
        fill={CHART_THEME.houseNumberColor}
        opacity={0.55}
        style={{ userSelect: 'none', pointerEvents: 'none' }}
      >
        {numDisplay}
      </text>

      {/* Planets grid */}
      {planets.map((p, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = startX + col * colGap;
        const y = startY + row * lineHeight;

        const color = p.isAscendant ? CHART_THEME.ascendantColor : CHART_THEME.planetColor;
        const weight = p.isAscendant ? 700 : 600;

        return (
          <text
            key={`${p.planet}-${i}`}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={fontSize}
            fontFamily={CHART_THEME.planetFont}
            fontWeight={weight}
            fill={color}
            style={{ userSelect: 'none', pointerEvents: 'none' }}
          >
            {p.abbr}
            {p.isRetrograde && (
              <tspan fontSize={degFontSize} fill={CHART_THEME.retrogradeColor} dx={0.5} dy={-2}>R</tspan>
            )}
          </text>
        );
      })}
    </g>
  );
}
