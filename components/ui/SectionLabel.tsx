'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionLabelProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  className?: string;
}

/**
 * Eyebrow + serif headline used at the top of every 8th-album section.
 */
export default function SectionLabel({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'dark',
  className = '',
}: SectionLabelProps) {
  const alignment = align === 'center' ? 'text-center items-center' : 'text-left items-start';
  const titleColor = tone === 'dark' ? 'text-cream' : 'text-ink';
  const descColor = tone === 'dark' ? 'text-cream/60' : 'text-ink/60';

  return (
    <motion.div
      className={`flex flex-col gap-4 ${alignment} ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <span className="inline-flex items-center gap-3 text-[11px] md:text-xs font-semibold tracking-[0.32em] uppercase text-bulb">
        <span className="h-px w-8 bg-bulb/70" aria-hidden="true" />
        {eyebrow}
      </span>
      <h2 className={`font-serif-kr font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.15] ${titleColor}`}>
        {title}
      </h2>
      {description && (
        <p className={`max-w-2xl text-base md:text-lg leading-relaxed ${descColor}`}>{description}</p>
      )}
    </motion.div>
  );
}
