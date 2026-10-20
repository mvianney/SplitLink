// The SplitLink mark: a coin split in two by a lightning bolt (⚡).
// Shared by the 2D logo, the button icon and the 3D hero coins so they always match.
// Coordinates are on a unit circle (radius 1, centre 0,0) with y pointing up.

export type Pt = readonly [number, number];

// Bolt outline. The tips sit just outside the circle so the bolt cuts the coin
// all the way through. Point-symmetric, so both halves are the same shape.
const TOP: Pt = [0.27, 1.22];
const LEFT_CORNER: Pt = [-0.43, -0.11];
const LOWER_NOTCH: Pt = [0.03, -0.11];
const BOTTOM: Pt = [-0.27, -1.22];
const RIGHT_CORNER: Pt = [0.43, 0.11];
const UPPER_NOTCH: Pt = [-0.03, 0.11];

// Left edge of the bolt (top to bottom) bounds the left half; right edge bounds the right half.
const LEFT_EDGE: Pt[] = [TOP, LEFT_CORNER, LOWER_NOTCH, BOTTOM];
const RIGHT_EDGE: Pt[] = [TOP, UPPER_NOTCH, RIGHT_CORNER, BOTTOM];

/** Parameters t in [0, 1] where segment p→q crosses the unit circle, in order. */
function circleHits(p: Pt, q: Pt): number[] {
  const dx = q[0] - p[0];
  const dy = q[1] - p[1];
  const a = dx * dx + dy * dy;
  const b = 2 * (p[0] * dx + p[1] * dy);
  const c = p[0] * p[0] + p[1] * p[1] - 1;
  const disc = b * b - 4 * a * c;
  if (disc < 0) return [];
  const s = Math.sqrt(disc);
  return [(-b - s) / (2 * a), (-b + s) / (2 * a)]
    .filter((t) => t >= 0 && t <= 1)
    .sort((x, y) => x - y);
}

/** The part of an edge polyline that lies inside the circle, from where it enters to where it leaves. */
function insidePart(edge: Pt[]): Pt[] {
  const out: Pt[] = [];
  let inside = false;
  for (let i = 0; i < edge.length - 1; i++) {
    const p = edge[i];
    const q = edge[i + 1];
    for (const t of circleHits(p, q)) {
      out.push([p[0] + t * (q[0] - p[0]), p[1] + t * (q[1] - p[1])]);
      inside = !inside;
    }
    if (inside && i + 1 < edge.length - 1) out.push(q);
  }
  return out;
}

/** Points along the circle from angle a0 to a1 (exclusive), clockwise or counter-clockwise. */
function arc(a0: number, a1: number, clockwise: boolean, stepsPerRadian: number): Pt[] {
  let end = a1;
  if (clockwise) while (end > a0) end -= Math.PI * 2;
  else while (end < a0) end += Math.PI * 2;
  const n = Math.max(2, Math.ceil(Math.abs(end - a0) * stepsPerRadian));
  const pts: Pt[] = [];
  for (let k = 1; k < n; k++) {
    const a = a0 + ((end - a0) * k) / n;
    pts.push([Math.cos(a), Math.sin(a)]);
  }
  return pts;
}

const angle = (p: Pt) => Math.atan2(p[1], p[0]);

/**
 * Closed outline of one half of the coin (first point not repeated).
 * The bolt edge comes first, then the rim arc back round to the start.
 */
export function halfOutline(side: "left" | "right", stepsPerRadian = 16): Pt[] {
  const edge = insidePart(side === "left" ? LEFT_EDGE : RIGHT_EDGE);
  const start = edge[0];
  const end = edge[edge.length - 1];
  // Left half closes round the left side (clockwise), right half round the right side.
  return [...edge, ...arc(angle(end), angle(start), side === "left", stepsPerRadian)];
}

/** SVG path for one half, mapped into a square viewBox of the given size. */
export function halfPath(side: "left" | "right", box: number, inset = 0): string {
  const c = box / 2;
  const r = c - inset;
  const pts = halfOutline(side);
  return (
    pts
      .map(([x, y], i) => `${i ? "L" : "M"}${(c + x * r).toFixed(2)} ${(c - y * r).toFixed(2)}`)
      .join(" ") + " Z"
  );
}

/** Direction (unit vector, y up) that pushes the right half away from the bolt; the left half goes the other way. */
export const SPLIT_DIR: Pt = (() => {
  const dx = BOTTOM[0] - TOP[0];
  const dy = BOTTOM[1] - TOP[1];
  const len = Math.hypot(dx, dy);
  // Perpendicular to the bolt's overall direction, pointing right.
  return [-dy / len, dx / len];
})();
