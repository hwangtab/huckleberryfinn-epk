'use client';

import { useRef } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { FaChevronLeft, FaChevronRight, FaExternalLinkAlt } from 'react-icons/fa';
import SectionLabel from '@/components/ui/SectionLabel';
import { funding } from '@/app/data/album8';
import { useNow } from '@/lib/useNow';
import { isFundingOpen } from '@/lib/timeline';

const won = (n: number) => `${n.toLocaleString('ko-KR')}원`;
const dot = (iso: string) => iso.replace(/-/g, '. ');

export default function SectionFunding() {
  const railRef = useRef<HTMLUListElement>(null);
  const fundingOpen = isFundingOpen(useNow());

  const scrollBy = (dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: dir * Math.min(rail.clientWidth * 0.8, 640), behavior: 'smooth' });
  };

  return (
    <section id="funding" aria-labelledby="funding-title" className="relative overflow-hidden bg-ink py-24 text-cream scroll-mt-16 md:py-36 md:scroll-mt-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[60vh] w-[80vw] -translate-x-1/2 rounded-full bg-cobalt/20 blur-[140px]"
      />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionLabel
            id="funding-title"
            eyebrow={fundingOpen ? 'Crowdfunding · Tumblbug' : 'Crowdfunding · Tumblbug (종료)'}
            title={
              <>
                이 앨범의 크레딧에
                <br />
                <span className="text-bulb">당신의 이름</span>을 남깁니다
              </>
            }
            description={funding.creditNote}
          />
          <Reveal as="dl" delay={0.1} className="grid shrink-0 grid-cols-3 gap-6 border-l border-cream/10 pl-6 lg:pl-10">
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.25em] text-bulb/80">Period</dt>
              <dd className="mt-1 font-serif-latin text-lg text-cream md:text-xl">
                {dot(funding.startDate).slice(6)} – {dot(funding.endDate).slice(6)}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.25em] text-bulb/80">Goal</dt>
              <dd className="mt-1 font-serif-latin text-lg text-cream md:text-xl">{won(funding.goal)}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.25em] text-bulb/80">Ship</dt>
              <dd className="mt-1 font-serif-latin text-lg text-cream md:text-xl">{dot(funding.deliveryStart).slice(6)} ~</dd>
            </div>
          </Reveal>
        </div>

        {/* Reward rail */}
        <Reveal className="relative mt-14">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.3em] text-cream/60">Rewards · {funding.rewards.length}</p>
            <div className="hidden gap-2 md:flex">
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition-colors hover:border-bulb hover:text-bulb focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bulb"
                aria-label="이전 리워드"
              >
                <FaChevronLeft size={12} />
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition-colors hover:border-bulb hover:text-bulb focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bulb"
                aria-label="다음 리워드"
              >
                <FaChevronRight size={12} />
              </button>
            </div>
          </div>

          <ul
            ref={railRef}
            tabIndex={0}
            aria-label="리워드 목록 (가로로 스크롤)"
            className="snap-rail -mx-6 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-bulb md:-mx-10 md:scroll-px-10 md:px-10"
          >
            {funding.rewards.map((r) => (
              <li
                key={r.id}
                className={`relative flex w-[78vw] shrink-0 snap-start flex-col rounded-2xl border p-6 sm:w-[340px] ${
                  r.recommended
                    ? 'border-bulb/60 bg-gradient-to-b from-bulb/15 to-transparent'
                    : 'border-cream/10 bg-cream/[0.03] hover:border-cream/25'
                } transition-colors`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-serif-latin text-lg italic text-cream/60">No. {String(r.id).padStart(2, '0')}</span>
                  <div className="flex gap-2">
                    {r.recommended && (
                      <span className="rounded-full bg-bulb px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.15em] text-ink">
                        추천
                      </span>
                    )}
                    {r.discount && (
                      <span className="rounded-full border border-teal/50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.15em] text-teal">
                        {r.discount} off
                      </span>
                    )}
                  </div>
                </div>
                <h3 className="font-serif-kr text-xl font-bold leading-snug text-cream">{r.name}</h3>
                <ul className="mt-4 flex-1 space-y-1.5">
                  {r.includes.map((inc) => (
                    <li key={inc} className="flex gap-2 text-sm leading-relaxed text-cream/70">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-bulb/70" aria-hidden="true" />
                      {inc}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 font-serif-latin text-3xl text-bulb">
                  {won(r.price)}
                  <span className="ml-1 text-base text-cream/60">+</span>
                </p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal
          className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          {fundingOpen ? (
            <a
              href={funding.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-bulb px-8 py-4 text-base font-semibold text-ink transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bulb focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              텀블벅에서 후원하기
              <FaExternalLinkAlt size={12} aria-hidden="true" />
            </a>
          ) : (
            <a
              href={funding.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-base font-semibold text-cream ring-1 ring-cream/40 transition-colors hover:bg-cream hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bulb"
            >
              펀딩 종료 · 텀블벅 페이지 보기
              <FaExternalLinkAlt size={12} aria-hidden="true" />
            </a>
          )}
          <p className="text-xs leading-relaxed text-cream/70">
            펀딩 마감 {dot(funding.endDate)} · 결제 {dot(funding.paymentDate)} (목표 금액 달성 시) · 예상 배송 시작 {dot(funding.deliveryStart)} (제작 일정에 따라 변동 가능)
          </p>
        </Reveal>
      </div>
    </section>
  );
}
