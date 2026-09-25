'use client';

import { RefObject, useEffect, useRef } from 'react';
import { MotionValue, useAnimationFrame } from 'framer-motion';
import { THREAD_D, type Cam } from './art-space';

/** Same curve as THREAD_D, reversed so the draw-in runs from the right edge (where it exits the painting) to the left. */
export const THREAD_D_REV =
  'M 1000 346 C 988 353, 970 369, 945 386 C 890 422, 790 430, 705 393 C 620 336, 560 295, 470 299 C 330 306, 200 337, 80 350';

const N = 150;
const BEAD_FROM_X = 440; // over the covered eyes
const TAU = Math.PI * 2;
const LOOP = 3.87; // 8 beats at 124 BPM (〈멜랑콜리아〉)

type Pt = { x: number; y: number };
type Pluck = { x: number; amp: number; t0: number };

interface HeroThreadProps {
  cam: MotionValue<Cam>;
  size: MotionValue<{ W: number; H: number }>;
  progress: MotionValue<number>;
  stageRef: RefObject<HTMLDivElement | null>;
  /** idle undulation + bead (off for reduced motion / paused) */
  live: boolean;
  /** cursor can pluck the thread (fine pointers only) */
  interactive: boolean;
  active: RefObject<boolean>;
}

/**
 * The red thread from the painting, as a live SVG line living in the painting's
 * own 0..1000 coordinate space (it is rendered inside the camera-transformed art box,
 * so it always sits exactly on the painted thread).
 */
export default function HeroThread({ cam, size, progress, stageRef, live, interactive, active }: HeroThreadProps) {
  const baseRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<SVGPathElement>(null);
  const coreRef = useRef<SVGPathElement>(null);
  const beadRef = useRef<SVGGElement>(null);
  const pts = useRef<Pt[]>([]);
  const lastYs = useRef<number[]>([]);
  const plucks = useRef<Pluck[]>([]);
  const ptr = useRef({ side: 0, ay: 0, has: false });

  // Sample the authored curve once.
  useEffect(() => {
    const path = baseRef.current;
    if (!path) return;
    const L = path.getTotalLength();
    const out: Pt[] = [];
    for (let i = 0; i < N; i++) {
      const q = path.getPointAtLength((L * i) / (N - 1));
      out.push({ x: q.x, y: q.y });
    }
    pts.current = out;
    lastYs.current = out.map((q) => q.y);
  }, []);

  const baseY = (x: number) => {
    const p = pts.current;
    if (p.length === 0) return 0;
    if (x <= p[0].x) return p[0].y;
    if (x >= p[p.length - 1].x) return p[p.length - 1].y;
    let lo = 0;
    let hi = p.length - 1;
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1;
      if (p[mid].x < x) lo = mid;
      else hi = mid;
    }
    const t = (x - p[lo].x) / (p[hi].x - p[lo].x || 1);
    return p[lo].y + (p[hi].y - p[lo].y) * t;
  };

  // Pluck: crossing the thread with the cursor sets it vibrating.
  useEffect(() => {
    if (!interactive || !live) return;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
      const stage = stageRef.current;
      if (!stage || !active.current) return;
      const r = stage.getBoundingClientRect();
      const { W, H } = size.get();
      const c = cam.get();
      const S = Math.max(W, H) * c.z;
      const ax = (c.x + (e.clientX - r.left - W / 2) / S) * 1000;
      const ay = (c.y + (e.clientY - r.top - H / 2) / S) * 1000;
      const s = ptr.current;
      if (ax < 80 || ax > 1000 || ay < 0 || ay > 1000) {
        s.has = false;
        return;
      }
      const side = Math.sign(ay - baseY(ax));
      if (s.has && side !== 0 && side !== s.side) {
        const amp = Math.min(26, Math.max(7, Math.abs(ay - s.ay) * 1.4)) * side;
        plucks.current = [...plucks.current.slice(-3), { x: ax, amp, t0: performance.now() }];
      }
      s.side = side || s.side;
      s.ay = ay;
      s.has = true;
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interactive, live]);

  useAnimationFrame((t) => {
    const p = pts.current;
    if (!active.current || p.length === 0) return;

    // Ambient sway + plucks only while motion is live; the bead below is scroll-driven and always follows.
    if (live) {
      const now = performance.now();
      const time = t / 1000;
      plucks.current = plucks.current.filter((k) => now - k.t0 < 2600);
      const ks = plucks.current;
      const ys = new Array<number>(N);
      let d = '';
      for (let j = 0; j < N; j++) {
        const i = N - 1 - j; // reversed: right → left
        const { x, y } = p[i];
        const pin = Math.min(1, Math.max(0, (x - 80) / 220));
        let off = 3.2 * Math.sin((time * TAU) / LOOP + x * 0.011) * pin;
        for (const k of ks) {
          const dt = (now - k.t0) / 1000;
          const dx = (x - k.x) / 120;
          off += k.amp * Math.exp(-dt * 2.4) * Math.sin(dt * 26) * Math.exp(-dx * dx) * pin;
        }
        ys[i] = y + off;
        d += `${j === 0 ? 'M' : 'L'}${x.toFixed(1)} ${ys[i].toFixed(1)}`;
      }
      glowRef.current?.setAttribute('d', d);
      coreRef.current?.setAttribute('d', d);
      lastYs.current = ys;
    }
    const ys = lastYs.current;

    // A warm bead travels the thread from the eyes to the edge during the pan beat.
    const bead = beadRef.current;
    if (bead) {
      const prog = progress.get();
      const tt = Math.min(1, Math.max(0, (prog - 0.36) / 0.3));
      const visible = prog > 0.36 && prog < 0.66;
      let i0 = 0;
      while (i0 < N - 1 && p[i0].x < BEAD_FROM_X) i0++;
      const fi = i0 + (N - 1 - i0) * tt;
      const a = Math.floor(fi);
      const b = Math.min(N - 1, a + 1);
      const f = fi - a;
      const bx = p[a].x + (p[b].x - p[a].x) * f;
      const by = ys[a] + (ys[b] - ys[a]) * f;
      bead.setAttribute('transform', `translate(${bx.toFixed(1)} ${by.toFixed(1)})`);
      bead.style.opacity = visible ? String(Math.sin(Math.PI * tt)) : '0';
    }
  });

  return (
    <svg
      viewBox="0 0 1000 1000"
      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      aria-hidden="true"
      focusable="false"
    >
      <path ref={baseRef} d={THREAD_D} fill="none" stroke="none" />
      <path
        ref={glowRef}
        d={THREAD_D_REV}
        pathLength={1}
        className="hero-thread-draw"
        fill="none"
        stroke="var(--color-thread)"
        strokeOpacity={0.28}
        strokeWidth={10}
        strokeLinecap="round"
      />
      <path
        ref={coreRef}
        d={THREAD_D_REV}
        pathLength={1}
        className="hero-thread-draw"
        fill="none"
        stroke="var(--color-thread)"
        strokeWidth={2.6}
        strokeLinecap="round"
      />
      <g ref={beadRef} style={{ opacity: 0 }}>
        <circle r={16} fill="var(--color-bulb)" opacity={0.35} />
        <circle r={5} fill="var(--color-bulb-hot)" />
      </g>
    </svg>
  );
}
