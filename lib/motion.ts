/**
 * Motion design tokens — the single source for every entrance/transition on the site.
 * One easing, three durations, one travel distance, one viewport trigger.
 */
import type { Transition, Variants } from 'framer-motion';

/** Expo-out: fast start, long gentle settle. Used for every entrance. */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const DURATION = {
  fast: 0.35,
  base: 0.7,
  slow: 1.1,
} as const;

/** Vertical travel for entrances (px). Kept small so nothing "flies". */
export const RISE = 24;

/** Delay between siblings in a staggered group (s). */
export const STAGGER = 0.08;

/** Reveal once, when the element is 12% into the viewport. */
export const VIEWPORT = { once: true, amount: 0.12 } as const;

export const revealTransition = (delay = 0): Transition => ({ duration: DURATION.base, ease: EASE_OUT, delay });

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: RISE },
  show: { opacity: 1, y: 0, transition: revealTransition() },
};

export const staggerContainer = (stagger = STAGGER, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});
