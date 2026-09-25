'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useMotionPrefs } from '@/lib/motionPrefs';

const SPRING = { stiffness: 120, damping: 24, mass: 0.6 };

/**
 * A warm "light-bulb" glow that follows the mouse across the page.
 * - Fine pointers only; hidden while motion is reduced or paused.
 * - Fades out over the hero, which has its own cursor effect (WebGL shader + thread pluck),
 *   so the two never stack.
 */
export default function CursorGlow() {
  const { pointerFx } = useMotionPrefs();
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const sx = useSpring(x, SPRING);
  const sy = useSpring(y, SPRING);
  const opacity = useSpring(0, { stiffness: 90, damping: 20 });

  useEffect(() => {
    if (!pointerFx) {
      opacity.set(0);
      return;
    }
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
      x.set(e.clientX);
      y.set(e.clientY);
      const overHero = (e.target as Element | null)?.closest?.('#top') != null;
      opacity.set(overHero ? 0 : 1);
    };
    const leave = () => opacity.set(0);
    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', leave);
    };
  }, [pointerFx, x, y, opacity]);

  if (!pointerFx) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[5] h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen"
      style={{
        x: sx,
        y: sy,
        opacity,
        background:
          'radial-gradient(circle, rgba(245,197,106,0.16) 0%, rgba(245,197,106,0.06) 30%, rgba(74,168,180,0.03) 55%, transparent 70%)',
      }}
    />
  );
}
