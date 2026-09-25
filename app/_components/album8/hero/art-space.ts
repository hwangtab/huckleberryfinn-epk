// art-space.ts — single source of truth for image<->screen mapping (pure, SSR-safe)
export type Cam = { x: number; y: number; z: number }; // art-space centre (0..1, y down), zoom >= 1

export const ANCHORS = {
  moon: { x: 0.128, y: 0.113, r: 0.043 },
  eyes: { x: 0.44, y: 0.3 },
  chair: { x: 0.89, y: 0.6 },
  door: { x0: 0.835, y0: 0.245, x1: 0.965, y1: 0.65 },
} as const;

/** Art edge length in CSS px: object-fit: cover for a square image, times zoom. */
export const artSize = (W: number, H: number, z: number) => Math.max(W, H) * z;

/** Keep the art covering the viewport for any aspect ratio / zoom. */
export function clampCam(c: Cam, W: number, H: number): Cam {
  const z = Math.max(1, c.z), S = artSize(W, H, z);
  const hx = W / (2 * S), hy = H / (2 * S);
  return { z, x: Math.min(1 - hx, Math.max(hx, c.x)), y: Math.min(1 - hy, Math.max(hy, c.y)) };
}

export function artToScreen(u: number, v: number, c: Cam, W: number, H: number) {
  const S = artSize(W, H, c.z);
  return { x: W / 2 + (u - c.x) * S, y: H / 2 + (v - c.y) * S };
}

/** SVG <g transform> for paths authored in a 0..1000 art viewBox. */
export function svgTransform(c: Cam, W: number, H: number) {
  const S = artSize(W, H, c.z);
  return `translate(${W / 2 - c.x * S} ${H / 2 - c.y * S}) scale(${S / 1000})`;
}

/** Thread, traced over the 1000x1000 cover (refine in Figma if needed). */
export const THREAD_D =
  'M 80 350 C 200 337, 330 306, 470 299 C 560 295, 620 336, 705 393 C 790 430, 890 422, 945 386 C 970 369, 988 353, 1000 346';
