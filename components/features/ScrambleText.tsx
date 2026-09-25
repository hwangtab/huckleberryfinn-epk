'use client';

import { useEffect, useRef, useState } from 'react';
import { useMotionPrefs } from '@/lib/motionPrefs';

// Full-width Hangul syllables only, so the scrambled text never changes width (no jitter).
const GLYPHS = '가나다라마바사아자차카타파하거너더러머버서어저처커터퍼허';

interface ScrambleTextProps {
  text: string;
  /** keep scrambling (for undisclosed track titles) */
  loop?: boolean;
  intervalMs?: number;
  className?: string;
}

/**
 * Cycles random Hangul glyphs in place of each character.
 * - The real text is kept as screen-reader / copy text; the scramble is decorative and unselectable.
 * - Stops while off-screen, when motion is paused site-wide, and under prefers-reduced-motion.
 */
export default function ScrambleText({ text, loop = false, intervalMs = 90, className = '' }: ScrambleTextProps) {
  const [display, setDisplay] = useState(text);
  const [onScreen, setOnScreen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const { ambient } = useMotionPrefs();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!ambient || !onScreen) {
      setDisplay(text);
      return;
    }

    let frame = 0;
    const id = setInterval(() => {
      frame += 1;
      const next = text
        .split('')
        .map((ch, i) => {
          if (ch === ' ') return ' ';
          if (!loop && i < frame / 2) return ch;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join('');
      setDisplay(next);
      if (!loop && frame / 2 >= text.length) {
        clearInterval(id);
        setDisplay(text);
      }
    }, intervalMs);

    return () => clearInterval(id);
  }, [text, loop, intervalMs, ambient, onScreen]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="select-none">
        {display}
      </span>
    </span>
  );
}
