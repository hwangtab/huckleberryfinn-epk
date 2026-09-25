'use client';

import { useRef } from 'react';
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';

interface RevealTextProps {
  text: string;
  className?: string;
}

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const y = useTransform(progress, range, [6, 0]);
  return (
    <motion.span style={{ opacity, y }} className="inline-block mr-[0.28em] will-change-transform">
      {word}
    </motion.span>
  );
}

/**
 * Word-by-word scroll-linked reveal (Apple-style). Each word brightens
 * as the paragraph travels through the middle of the viewport.
 */
export default function RevealText({ text, className = '' }: RevealTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.45'] });
  const words = text.split(' ');

  return (
    <p ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return <Word key={`${word}-${i}`} word={word} progress={scrollYProgress} range={[start, end]} />;
      })}
    </p>
  );
}
