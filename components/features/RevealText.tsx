'use client';

import { CSSProperties, Fragment, useEffect, useRef } from 'react';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useMotionPrefs } from '@/lib/motionPrefs';

interface RevealTextProps {
  text: string;
  className?: string;
}

/**
 * Word-by-word scroll-linked reveal.
 *
 * One scroll value per paragraph is written to a CSS variable (--p); every word derives its own
 * opacity/offset from --p and its index in CSS (see .reveal-word in globals.css). That is one
 * style write per frame instead of two animated values per word, and no per-word compositor
 * layers. Words are separated by real spaces, so wrapping and copy/paste behave like normal text.
 * Under "reduce motion" the paragraph is simply shown in full.
 */
export default function RevealText({ text, className = '' }: RevealTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollFx } = useMotionPrefs();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.45'] });
  const words = text.split(' ');

  // --p is owned by this effect/listener only (never by the style prop), so re-renders can't reset it.
  useEffect(() => {
    ref.current?.style.setProperty('--p', scrollFx ? scrollYProgress.get().toFixed(4) : '1');
  }, [scrollFx, scrollYProgress]);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (scrollFx) ref.current?.style.setProperty('--p', v.toFixed(4));
  });

  return (
    <p
      ref={ref}
      className={`${scrollFx ? 'reveal-text' : ''} ${className}`}
      style={{ '--n': words.length } as CSSProperties}
    >
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="reveal-word" style={{ '--i': i } as CSSProperties}>
            {word}
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </p>
  );
}
