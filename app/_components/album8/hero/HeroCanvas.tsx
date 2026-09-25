'use client';
// hero/HeroCanvas.tsx — loaded with next/dynamic({ ssr: false })
import { useEffect, useRef } from 'react';
import { useAnimationFrame, type MotionValue } from 'framer-motion';
import { createCoverRenderer, type CoverRenderer } from './gl/renderer';
import type { Cam } from './art-space';

type Props = {
  src: string;
  cam: MotionValue<Cam>;              // already clamped (clampCam)
  finePointer: boolean;
  active: React.RefObject<boolean>;   // section on screen && tab visible
  frozen: React.RefObject<boolean>;   // user paused ambient motion: keep rendering the camera, stop the clock
  onReady: () => void;                // crossfade canvas in over the <Image>
  onLost: () => void;                 // context lost: show the <Image>, keep the canvas mounted for restore
  onFail: () => void;                 // WebGL unavailable: unmount the canvas
};

export default function HeroCanvas({ src, cam, finePointer, active, frozen, onReady, onLost, onFail }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const r = useRef<CoverRenderer | null>(null);
  const p = useRef({ x: -1e4, y: -1e4, tx: -1e4, ty: -1e4, vx: 0, vy: 0, force: 0 });
  const clock = useRef({ last: 0, t: 0 });
  const readyAt = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let alive = true;
    const renderer = createCoverRenderer(canvas, src, {
      maxDpr: finePointer ? 1.5 : 1.25,
      onLost: () => alive && onLost(),
      onRestored: () => alive && onReady(),
    });
    if (!renderer) { onFail(); return; }
    r.current = renderer;
    renderer.ready
      .then(() => {
        if (!alive) return; // unmounted or disposed before the texture decoded
        readyAt.current = performance.now();
        if (!renderer.isLost()) onReady(); // if lost, webglcontextrestored will call onReady
      })
      .catch(() => alive && onFail());

    const ro = new ResizeObserver(([e]) => renderer.setSize(e.contentRect.width, e.contentRect.height));
    ro.observe(canvas);

    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
      const rect = canvas.getBoundingClientRect();
      p.current.tx = e.clientX - rect.left;
      p.current.ty = e.clientY - rect.top;
    };
    if (finePointer) window.addEventListener('pointermove', move, { passive: true });

    return () => {
      alive = false;
      ro.disconnect();
      window.removeEventListener('pointermove', move);
      renderer.dispose();
      r.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, finePointer]);

  useAnimationFrame((time) => {
    const renderer = r.current;
    const k = clock.current;
    const dt = k.last ? Math.min(100, time - k.last) : 0;
    k.last = time;
    if (!renderer || !active.current || !readyAt.current) return;
    if (!frozen.current) k.t += dt;
    const s = p.current;
    if (s.x < -1e3) { s.x = s.tx; s.y = s.ty; }       // first sample: no jump
    const nx = s.x + (s.tx - s.x) * 0.18, ny = s.y + (s.ty - s.y) * 0.18;
    s.vx = s.vx * 0.8 + (nx - s.x) * 0.2;
    s.vy = s.vy * 0.8 + (ny - s.y) * 0.2;
    s.x = nx; s.y = ny;
    s.force = Math.min(1, s.force * 0.96 + Math.hypot(s.vx, s.vy) * 0.015);
    const fx = Math.min(1, (performance.now() - readyAt.current) / 1400); // effects ramp in after crossfade
    const c = cam.get();
    renderer.render({
      time: k.t / 1000,
      camX: c.x, camY: c.y, zoom: c.z,
      mouseX: s.x, mouseY: s.y, velX: s.vx, velY: s.vy,
      force: finePointer ? s.force : 0,
      fx,
      ambient: finePointer ? 0.25 : 1,
    });
  });

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
