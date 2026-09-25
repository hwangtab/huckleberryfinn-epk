'use client';

import { useEffect, useState } from 'react';

const GLYPHS = '가나다라마바사아자차카타파하ㅁㅇㅅㄹㄷㄱㅂ·—?!';

interface ScrambleTextProps {
  text: string;
  /** keep scrambling forever (for undisclosed track titles) */
  loop?: boolean;
  intervalMs?: number;
  className?: string;
}

/**
 * Cycles random Hangul glyphs in place of each character.
 * With `loop`, it never settles — used for the not-yet-announced tracks.
 */
export default function ScrambleText({ text, loop = false, intervalMs = 90, className = '' }: ScrambleTextProps) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
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
  }, [text, loop, intervalMs]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}
