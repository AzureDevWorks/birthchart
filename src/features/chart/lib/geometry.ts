export interface Point {
  x: number;
  y: number;
}

export type ChartStyle = 'north' | 'south';

// ─── North Indian chart vertices ────────────────────────────
const TL: Point = { x: 0,   y: 0 };
const T:  Point = { x: 0.5, y: 0 };
const TR: Point = { x: 1,   y: 0 };
const R:  Point = { x: 1,   y: 0.5 };
const BR: Point = { x: 1,   y: 1 };
const B:  Point = { x: 0.5, y: 1 };
const BL: Point = { x: 0,   y: 1 };
const L:  Point = { x: 0,   y: 0.5 };
const C:  Point = { x: 0.5, y: 0.5 };

const D1: Point = { x: 0.25, y: 0.25 };
const D2: Point = { x: 0.75, y: 0.25 };
const D3: Point = { x: 0.75, y: 0.75 };
const D4: Point = { x: 0.25, y: 0.75 };

export const NORTH_HOUSE_POLYGONS: Record<number, Point[]> = {
  1:  [T, D2, C, D1],
  2:  [TL, T, D1],
  3:  [TL, D1, L],
  4:  [L, D1, C],
  5:  [L, C, D4],
  6:  [BL, L, D4],
  7:  [BL, D4, B],
  8:  [B, D4, C, D3],
  9:  [B, D3, BR],
  10: [BR, D3, R],
  11: [R, D3, C],
  12: [R, C, D2],
};

export const SOUTH_HOUSE_GRID: Record<number, { row: number; col: number }> = {
  1:  { row: 0, col: 0 },
  2:  { row: 0, col: 1 },
  3:  { row: 0, col: 2 },
  4:  { row: 0, col: 3 },
  5:  { row: 1, col: 3 },
  6:  { row: 2, col: 3 },
  7:  { row: 3, col: 3 },
  8:  { row: 3, col: 2 },
  9:  { row: 3, col: 1 },
  10: { row: 3, col: 0 },
  11: { row: 2, col: 0 },
  12: { row: 1, col: 0 },
};

// ─── Path generation ────────────────────────────────────────
export function pointsToPath(points: Point[], size: number): string {
  if (points.length === 0) return '';
  const cmds = points.map(
    (p, i) => `${i === 0 ? 'M' : 'L'} ${(p.x * size).toFixed(2)} ${(p.y * size).toFixed(2)}`
  );
  return cmds.join(' ') + ' Z';
}

export function centroid(points: Point[]): Point {
  const n = points.length;
  if (n === 0) return { x: 0.5, y: 0.5 };
  const sum = points.reduce(
    (acc, p) => ({ x: acc.x + p.x, y: acc.y + p.y }),
    { x: 0, y: 0 }
  );
  return { x: sum.x / n, y: sum.y / n };
}

/** Visual incenter for triangles — better text placement */
export function visualCenter(points: Point[]): Point {
  if (points.length === 3) {
    const [a, b, c] = points;
    const la = Math.hypot(b.x - c.x, b.y - c.y);
    const lb = Math.hypot(a.x - c.x, a.y - c.y);
    const lc = Math.hypot(a.x - b.x, a.y - b.y);
    const sum = la + lb + lc;
    if (sum === 0) return { x: 0.5, y: 0.5 };
    return {
      x: (la * a.x + lb * b.x + lc * c.x) / sum,
      y: (la * a.y + lb * b.y + lc * c.y) / sum,
    };
  }
  return centroid(points);
}

export function getHousePolygon(house: number, style: ChartStyle): Point[] {
  if (style === 'north') {
    return NORTH_HOUSE_POLYGONS[house] ?? [];
  }
  const g = SOUTH_HOUSE_GRID[house];
  if (!g) return [];
  const cell = 1 / 4;
  const x0 = g.col * cell;
  const y0 = g.row * cell;
  return [
    { x: x0,           y: y0 },
    { x: x0 + cell,    y: y0 },
    { x: x0 + cell,    y: y0 + cell },
    { x: x0,           y: y0 + cell },
  ];
}

export function getHouseCentroid(house: number, style: ChartStyle): Point {
  return visualCenter(getHousePolygon(house, style));
}

export function getOuterSquarePath(size: number): string {
  return `M 0 0 L ${size} 0 L ${size} ${size} L 0 ${size} Z`;
}

export function getDiamondPath(size: number): string {
  return `M ${size / 2} 0 L ${size} ${size / 2} L ${size / 2} ${size} L 0 ${size / 2} Z`;
}

export function getDiagonalPaths(size: number): string[] {
  return [
    `M 0 0 L ${size} ${size}`,
    `M ${size} 0 L 0 ${size}`,
  ];
}

export function getSouthInnerCells(size: number) {
  const cell = size / 4;
  return [
    { x: cell,     y: cell,     width: cell, height: cell },
    { x: 2 * cell, y: cell,     width: cell, height: cell },
    { x: cell,     y: 2 * cell, width: cell, height: cell },
    { x: 2 * cell, y: 2 * cell, width: cell, height: cell },
  ];
}

/**
 * Generate sunburst rays emanating from the center.
 * Returns an array of {x1, y1, x2, y2} line coordinates.
 */
export function getSunburstRays(
  size: number,
  centerX: number,
  centerY: number,
  innerRadius: number,
  outerRadius: number,
  rayCount: number
): Array<{ x1: number; y1: number; x2: number; y2: number }> {
  const rays = [];
  for (let i = 0; i < rayCount; i++) {
    const angle = (i / rayCount) * 2 * Math.PI;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    rays.push({
      x1: centerX + cos * innerRadius * size,
      y1: centerY + sin * innerRadius * size,
      x2: centerX + cos * outerRadius * size,
      y2: centerY + sin * outerRadius * size,
    });
  }
  return rays;
}
