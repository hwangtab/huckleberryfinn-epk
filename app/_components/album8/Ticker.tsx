'use client';

import { FaPause, FaPlay } from 'react-icons/fa';
import { setMotionPaused, useMotionPrefs } from '@/lib/motionPrefs';
import { useNow } from '@/lib/useNow';
import { isFundingOpen, isMelancholiaOut, isReleased } from '@/lib/timeline';

function tickerItems(now: number): string[] {
  const released = isReleased(now);
  return [
    released ? '정규 8집 〈모두가 아는 이야기〉 Out now' : '정규 8집 〈모두가 아는 이야기〉',
    ...(released ? [] : ['2026. 10. 23 (금) 12:00 KST 발매']),
    isMelancholiaOut(now) ? '2nd Single 〈멜랑콜리아〉 Out now' : '2nd Single 〈멜랑콜리아〉 09. 29 (화) 12:00 KST',
    '1st Single 〈박쥐〉 Out now',
    '22nd Yellow Concert — Seoul 10. 31 · Busan 12. 05',
    ...(isFundingOpen(now) ? ['텀블벅 펀딩 진행 중 ~ 10. 11'] : []),
  ];
}

export default function Ticker() {
  const { paused } = useMotionPrefs();
  const items = tickerItems(useNow());
  const row = [...items, ...items];

  return (
    <div role="region" aria-label="주요 일정" className="relative z-10 overflow-hidden border-y border-cream/10 bg-ink-2 py-3 text-cream">
      <ul className="sr-only">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div
        className="motion-loop animate-marquee flex w-max whitespace-nowrap"
        aria-hidden="true"
      >
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-6 px-6 text-xs font-medium uppercase tracking-[0.18em] md:text-sm">
            <span className={i % 2 === 0 ? 'text-cream/90' : 'text-cream/75'}>{item}</span>
            <span className="text-bulb">✦</span>
          </span>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setMotionPaused(!paused)}
        aria-pressed={paused}
        aria-label={paused ? '애니메이션 재생' : '애니메이션 일시정지'}
        className="absolute right-0 top-0 flex h-full w-11 items-center justify-center bg-ink-2 text-cream/75 shadow-[-12px_0_16px_var(--color-ink-2)] hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-bulb motion-reduce:hidden"
      >
        {paused ? <FaPlay size={10} /> : <FaPause size={10} />}
      </button>
    </div>
  );
}
