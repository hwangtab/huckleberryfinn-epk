'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { motion, useMotionValue, useMotionTemplate, useSpring, useTransform } from 'framer-motion';
import { useMotionPrefs } from '@/lib/motionPrefs';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
}

const SPRING = { stiffness: 180, damping: 22, mass: 0.6 };

/**
 * 3D perspective tilt that follows a mouse/trackpad pointer, with an optional moving glare.
 * - Only for precise hovering pointers, and only while motion is allowed (not reduced / paused).
 *   On touch, a tap or a scroll gesture never leaves the card tilted.
 * - The card's rect is measured once on pointer-enter (no layout reads per move).
 * - Returns to rest on leave, on click (e.g. opening a lightbox) and when motion gets disabled.
 */
export default function TiltCard({ children, className = '', maxTilt = 10, glare = true }: TiltCardProps) {
  const { pointerFx } = useMotionPrefs();
  const rect = useRef<DOMRect | null>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(py, [0, 1], [maxTilt, -maxTilt]), SPRING);
  const rotateY = useSpring(useTransform(px, [0, 1], [-maxTilt, maxTilt]), SPRING);
  const gx = useTransform(px, (v) => `${v * 100}%`);
  const gy = useTransform(py, (v) => `${v * 100}%`);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.28), rgba(255,255,255,0) 55%)`;
  const glareOpacity = useSpring(0, SPRING);

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
    glareOpacity.set(0);
    rect.current = null;
  };

  // Motion switched off (reduced / paused / pointer changed): settle back to rest.
  useEffect(() => {
    if (!pointerFx) reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pointerFx]);

  const handlers = pointerFx
    ? {
        onPointerEnter: (e: React.PointerEvent<HTMLDivElement>) => {
          if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
          rect.current = e.currentTarget.getBoundingClientRect();
          glareOpacity.set(1);
        },
        onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => {
          const r = rect.current;
          if (!r) return;
          px.set(Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)));
          py.set(Math.min(1, Math.max(0, (e.clientY - r.top) / r.height)));
        },
        onPointerLeave: reset,
        onClickCapture: reset,
      }
    : {};

  return (
    <div style={{ perspective: 1200 }} className={className}>
      <motion.div {...handlers} style={{ rotateX, rotateY }} className="relative h-full w-full">
        {children}
        {glare && pointerFx && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-soft-light"
            style={{ background: glareBg, opacity: glareOpacity }}
          />
        )}
      </motion.div>
    </div>
  );
}
