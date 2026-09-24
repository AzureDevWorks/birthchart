import {
  Svg, Path, G, Text as SvgText,
} from '@react-pdf/renderer';
import {
  getHousePolygon,
  getHouseCentroid,
  pointsToPath,
  getOuterSquarePath,
  getDiamondPath,
  getDiagonalPaths,
} from '@/features/chart/lib/geometry';
import type { ChartHouse, ChartStyle } from '@/features/chart/types';

const COL = {
  frame: '#C9A961',
  border: '#A88947',
  inner: '#D9B86A',
  canvas: '#FCF8EF',
  ink: '#1F1409',
  inkMuted: '#8B7659',
  ascendant: '#8A2B22',
};

interface Props {
  size: number;
  style: ChartStyle;
  houses: ChartHouse[];
}

export function PdfChart({ size, style, houses }: Props) {
  const padding = 8;
  const innerSize = size - padding * 2;

  const outerPath = getOuterSquarePath(innerSize);
  const diamondPath = style === 'north' ? getDiamondPath(innerSize) : null;
  const diagonals = style === 'north' ? getDiagonalPaths(innerSize) : [];

  const cells: Array<{ house: number; path: string; center: { x: number; y: number }; data: ChartHouse | null }> = [];
  for (let h = 1; h <= 12; h++) {
    const pts = getHousePolygon(h, style);
    if (pts.length === 0) continue;
    cells.push({
      house: h,
      path: pointsToPath(pts, innerSize),
      center: getHouseCentroid(h, style),
      data: houses.find((hh) => hh.number === h) ?? null,
    });
  }

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Frame */}
      <Path
        d={`M ${padding} ${padding} L ${padding + innerSize} ${padding} L ${padding + innerSize} ${padding + innerSize} L ${padding} ${padding + innerSize} Z`}
        fill={COL.canvas} stroke={COL.frame} strokeWidth={2.5}
      />
      <Path
        d={`M ${padding + 5} ${padding + 5} L ${padding + innerSize - 5} ${padding + 5} L ${padding + innerSize - 5} ${padding + innerSize - 5} L ${padding + 5} ${padding + innerSize - 5} Z`}
        fill="none" stroke={COL.inner} strokeWidth={0.4}
      />

      <G transform={`translate(${padding}, ${padding})`}>
        <Path d={outerPath} fill="none" stroke={COL.border} strokeWidth={1.2} />
        {diagonals.map((d, i) => (
          <Path key={`d-${i}`} d={d} fill="none" stroke={COL.inner} strokeWidth={0.7} />
        ))}
        {diamondPath && (
          <Path d={diamondPath} fill="none" stroke={COL.inner} strokeWidth={0.7} />
        )}
        {style === 'north' &&
          cells.map(({ house, path }) => (
            <Path key={`o-${house}`} d={path} fill="none" stroke={COL.inner} strokeWidth={0.7} />
          ))}
        {style === 'south' && (
          <G>
            {[1, 2, 3].map((i) => (
              <Path
                key={`v-${i}`}
                d={`M ${(i * innerSize) / 4} 0 L ${(i * innerSize) / 4} ${innerSize}`}
                stroke={COL.inner} strokeWidth={0.7}
              />
            ))}
            {[1, 2, 3].map((i) => (
              <Path
                key={`h-${i}`}
                d={`M 0 ${(i * innerSize) / 4} L ${innerSize} ${(i * innerSize) / 4}`}
                stroke={COL.inner} strokeWidth={0.7}
              />
            ))}
          </G>
        )}

        {cells.map(({ house, center, data }) => {
          const cx = center.x * innerSize;
          const cy = center.y * innerSize;
          const planets = data?.planets ?? [];
          const n = planets.length;
          const fs = n === 0 ? 0 : n === 1 ? 11 : n === 2 ? 9.5 : n <= 4 ? 8 : 6.5;
          const lineH = fs + 3;
          const cols = n <= 2 ? 1 : n <= 4 ? 2 : 3;
          const rows = Math.ceil(n / cols) || 0;
          const colGap = fs + 10;
          const totalW = (cols - 1) * colGap;
          const totalH = rows * lineH;
          const startX = cx - totalW / 2;
          const startY = cy - totalH / 2 + lineH / 2 - (n > 0 ? 2 : 0);
          const numberY = cy - (n > 0 ? totalH / 2 + 9 : 0);

          return (
            <G key={`c-${house}`}>
              <SvgText
                x={cx} y={numberY} textAnchor="middle"
                fill={COL.inkMuted}
                style={{ fontSize: 7, fontFamily: 'Helvetica' }}
              >
                {String(house)}
              </SvgText>
              {planets.map((p, i) => {
                const col = i % cols;
                const row = Math.floor(i / cols);
                const x = startX + col * colGap;
                const y = startY + row * lineH;
                return (
                  <SvgText
                    key={`${p.planet}-${i}`} x={x} y={y} textAnchor="middle"
                    fill={p.isAscendant ? COL.ascendant : COL.ink}
                    style={{
                      fontSize: fs,
                      fontFamily: p.isAscendant ? 'Helvetica-Bold' : 'Helvetica',
                    }}
                  >
                    {p.abbr}
                    {p.isRetrograde ? '\u211e' : ''}
                  </SvgText>
                );
              })}
            </G>
          );
        })}
      </G>
    </Svg>
  );
}
