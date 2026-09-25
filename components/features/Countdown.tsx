'use client';

import { useEffect, useRef, useState } from 'react';
import { useMotionPrefs } from '@/lib/motionPrefs';

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

/**
 * A changed digit remounts (key) and plays a one-shot CSS roll-in (.countdown-digit in globals.css):
 * compositor-only, no JS per frame, and the previous digit is replaced immediately so digits can
 * never pile up. With ambient motion off (reduced / paused) the digit simply swaps.
 */
function Digit({ value, animate }: { value: string; animate: boolean }) {
  return (
    <span className="relative inline-block h-[1em] w-[0.62em] overflow-hidden align-baseline">
      <span key={value} className={`absolute inset-0 flex items-center justify-center tabular-nums ${animate ? 'countdown-digit' : ''}`}>
        {value}
      </span>
    </span>
  );
}

function Unit({ value, unit, compact, animate }: { value: number; unit: string; compact?: boolean; animate: boolean }) {
  const text = String(value).padStart(2, '0');
  return (
    <div className="flex items-baseline gap-1">
      <span className={`font-serif-latin leading-none text-cream ${compact ? 'text-2xl md:text-3xl' : 'text-4xl md:text-6xl'}`}>
        <Digit value={text[0]} animate={animate} />
        <Digit value={text[1]} animate={animate} />
      </span>
      <span className="text-[10px] uppercase tracking-[0.2em] text-cream/60 md:text-xs">{unit}</span>
    </div>
  );
}

export default function Countdown({ target, label, doneLabel = '공개되었습니다', compact = false, className = '' }: CountdownProps) {
  const [remaining, setRemaining] = useState<Remaining | null>(null);
  const [onScreen, setOnScreen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { ambient } = useMotionPrefs();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Tick every second only while visible; off-screen it is refreshed once on re-entry.
  useEffect(() => {
    setRemaining(getRemaining(target));
    if (!onScreen) return;
    const id = setInterval(() => setRemaining(getRemaining(target)), 1000);
    return () => clearInterval(id);
  }, [target, onScreen]);

  const done = remaining?.done ?? false;

  return (
    <div ref={ref} className={`flex flex-col gap-2 ${className}`} role="timer" aria-live="off" aria-label={done ? doneLabel : label}>
      {!done && (
        <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-bulb/90 md:text-xs">{label}</span>
      )}
      {remaining === null ? (
        <span aria-hidden="true" className={`font-serif-latin text-cream/40 ${compact ? 'text-2xl md:text-3xl' : 'text-4xl md:text-6xl'}`}>
          -- · -- · -- · --
        </span>
      ) : done ? (
        <span className={`font-serif-kr font-bold text-bulb ${compact ? 'text-xl md:text-2xl' : 'text-3xl md:text-5xl'}`}>
          {doneLabel}
        </span>
      ) : (
        <div className="flex flex-nowrap items-baseline gap-x-3 sm:gap-x-5 md:gap-x-6" aria-hidden="true">
          <Unit value={remaining.days} unit="days" compact={compact} animate={ambient} />
          <Unit value={remaining.hours} unit="hrs" compact={compact} animate={ambient} />
          <Unit value={remaining.minutes} unit="min" compact={compact} animate={ambient} />
          <Unit value={remaining.seconds} unit="sec" compact={compact} animate={ambient} />
        </div>
      )}
    </div>
  );
}
