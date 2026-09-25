'use client';

import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, revealTransition, RISE, staggerContainer, STAGGER, VIEWPORT } from '@/lib/motion';

/**
 * The only entrance animations on the site. Every section uses these, so timing, easing,
 * distance and trigger point are identical everywhere.
 *
 * - <Reveal>        one element rises + fades in when it enters the viewport
 * - <RevealGroup>   a container whose <RevealItem> children enter one after another
 *
 * Only opacity and a small vertical translate are animated (compositor-only, no layout).
 * Under "reduce motion", MotionConfig makes the translate instant; the fade remains.
 */

type Tag = 'div' | 'section' | 'ul' | 'ol' | 'li' | 'p' | 'article' | 'header' | 'dl';

const tags = {
  div: motion.div,
  section: motion.section,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  p: motion.p,
  article: motion.article,
  header: motion.header,
  dl: motion.dl,
} satisfies Record<Tag, ElementType>;

type BaseProps = {
  as?: Tag;
  className?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<'div'>, 'className' | 'children' | 'onAnimationStart' | 'onDrag' | 'onDragStart' | 'onDragEnd' | 'style'>;

export function Reveal({ as = 'div', delay = 0, className, children, ...rest }: BaseProps & { delay?: number }) {
  const Comp = tags[as] as typeof motion.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: RISE }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={revealTransition(delay)}
      {...rest}
    >
      {children}
    </Comp>
  );
}

export function RevealGroup({
  as = 'div',
  stagger = STAGGER,
  delay = 0,
  className,
  children,
  ...rest
}: BaseProps & { stagger?: number; delay?: number }) {
  const Comp = tags[as] as typeof motion.div;
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={staggerContainer(stagger, delay)}
      {...rest}
    >
      {children}
    </Comp>
  );
}

export function RevealItem({ as = 'div', className, children, ...rest }: BaseProps) {
  const Comp = tags[as] as typeof motion.div;
  return (
    <Comp className={className} variants={fadeUp} {...rest}>
      {children}
    </Comp>
  );
}
