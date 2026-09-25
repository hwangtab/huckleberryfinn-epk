'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface CountdownProps {
  target: string; // ISO string with timezone
  label: string;
  doneLabel?: string;
  compact?: boolean;
  className?: string;
}

interface Remaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
}

function getRemaining(target: string): Remaining {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  const total = Math.floor(diff / 1000);
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
    done: false,
  };
}

function Digit({ value }: { value: string }) {
  return (
    <span className="relative inline-block h-[1em] w-[0.62em] overflow-hidden align-baseline">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={value}
          className="absolute inset-0 flex items-center justify-center tabular-nums"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Unit({ value, unit, compact }: { value: number; unit: string; compact?: boolean }) {
  const text = String(value).padStart(2, '0');
  return (
    <div className="flex items-baseline gap-1">
      <span
        className={`font-serif-latin text-cream leading-none ${compact ? 'text-2xl md:text-3xl' : 'text-4xl md:text-6xl'}`}
      >
        <Digit value={text[0]} />
        <Digit value={text[1]} />
      </span>
      <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-cream/50">{unit}</span>
    </div>
  );
}

export default function Countdown({ target, label, doneLabel = '공개되었습니다', compact = false, className = '' }: CountdownProps) {
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    setRemaining(getRemaining(target));
    const id = setInterval(() => setRemaining(getRemaining(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <div className={`flex flex-col gap-2 ${className}`} role="timer" aria-live="off" aria-label={label}>
      <span className="text-[11px] md:text-xs font-semibold tracking-[0.28em] uppercase text-bulb/90">{label}</span>
      {remaining === null ? (
        <span className={`font-serif-latin text-cream/40 ${compact ? 'text-2xl' : 'text-4xl md:text-6xl'}`}>
          -- : -- : --
        </span>
      ) : remaining.done ? (
        <span className={`font-serif-kr text-bulb ${compact ? 'text-xl md:text-2xl' : 'text-3xl md:text-5xl'}`}>
          {doneLabel}
        </span>
      ) : (
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 md:gap-x-6">
          <Unit value={remaining.days} unit="days" compact={compact} />
          <Unit value={remaining.hours} unit="hrs" compact={compact} />
          <Unit value={remaining.minutes} unit="min" compact={compact} />
          <Unit value={remaining.seconds} unit="sec" compact={compact} />
        </div>
      )}
    </div>
  );
}
