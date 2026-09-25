'use client';

import { useState } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';

const items = [
  '정규 8집 〈모두가 아는 이야기〉',
  '2026. 10. 23 FRI 12PM 발매',
  '2nd Single 〈멜랑콜리아〉 09. 29 TUE 12PM',
  '1st Single 〈박쥐〉 Out Now',
  '22th Yellow Concert — Seoul 10. 31 · Busan 12. 05',
  '텀블벅 펀딩 진행 중 ~ 10. 11',
];

export default function Ticker() {
  const [paused, setPaused] = useState(false);
  const row = [...items, ...items];

  return (
    <div className="relative z-10 overflow-hidden border-y border-cream/10 bg-ink-2 py-3 text-cream" aria-label="주요 일정">
      <ul className="sr-only">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div
        className="animate-marquee flex w-max whitespace-nowrap"
        style={{ animationPlayState: paused ? 'paused' : undefined }}
        aria-hidden="true"
      >
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-6 px-6 text-xs font-medium uppercase tracking-[0.18em] md:text-sm">
            <span className={i % 2 === 0 ? 'text-cream/90' : 'text-cream/70'}>{item}</span>
            <span className="text-bulb">✦</span>
          </span>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setPaused((v) => !v)}
        aria-pressed={paused}
        aria-label={paused ? '일정 띠 재생' : '일정 띠 일시정지'}
        className="absolute right-0 top-0 flex h-full w-11 items-center justify-center bg-ink-2 text-cream/70 shadow-[-12px_0_16px_var(--color-ink-2)] hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-bulb motion-reduce:hidden"
      >
        {paused ? <FaPlay size={10} /> : <FaPause size={10} />}
      </button>
    </div>
  );
}
