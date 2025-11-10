'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Heading from '@/components/ui/Heading';
import { galleryMoments } from '@/app/data/galleryImages';

export default function SectionGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const total = galleryMoments.length;
  const currentMoment = galleryMoments[activeIndex];
  const scrollToIndex = (index: number) => {
    const target = slideRefs.current[index];
    if (target) {
      target.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
      setActiveIndex(index);
    }
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  useEffect(() => {
    const container = mobileContainerRef.current;
    if (!container || typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            if (!Number.isNaN(index)) {
              setActiveIndex(index);
            }
          }
        });
      },
      {
        root: container,
        threshold: 0.6,
      }
    );

    slideRefs.current.forEach((slide) => slide && observer.observe(slide));

    return () => {
      slideRefs.current.forEach((slide) => slide && observer.unobserve(slide));
      observer.disconnect();
    };
  }, []);

  return (
    <section id="gallery" className="bg-hbf-white py-16 md:py-24 px-6 scroll-mt-16 md:scroll-mt-20">
      <div className="max-w-6xl mx-auto space-y-12">
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <Heading level="h2" className="text-hbf-charcoal">
            과거와 현재를 잇는 아카이브
          </Heading>
          <p className="text-base text-hbf-charcoal-light max-w-3xl mx-auto leading-relaxed">
            2000년대 초반의 작업실과 2025년 리마스터링 현장을 한 자리에서 넘겨보세요. 모바일에서는 초대장처럼 스와이프하고, 데스크톱에서는 큰 이미지와
            썸네일을 통해 한눈에 비교할 수 있습니다.
          </p>
        </motion.div>

        {/* Mobile / Tablet slider */}
        <div className="md:hidden space-y-6">
          <div
            ref={mobileContainerRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {galleryMoments.map((moment, index) => (
              <div
                key={moment.id}
                ref={(el) => {
                  slideRefs.current[index] = el;
                }}
                data-index={index}
                className="snap-center shrink-0 w-[85vw] bg-hbf-white border border-hbf-charcoal/10 rounded-3xl overflow-hidden shadow-[0_20px_35px_-30px_rgba(0,0,0,0.8)]"
              >
                <div className="relative h-96">
                  <Image
                    src={moment.src}
                    alt={moment.title}
                    fill
                    className="object-cover"
                    sizes="85vw"
                    priority={index === 0}
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-black/60 text-hbf-white tracking-wide">
                    {moment.year}
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <p className="text-xs uppercase tracking-[0.2em] text-hbf-charcoal-light">{moment.location}</p>
                  <h3 className="text-xl font-bold text-hbf-charcoal">{moment.title}</h3>
                  <p className="text-sm text-hbf-charcoal-light leading-relaxed">{moment.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2">
            {galleryMoments.map((moment, index) => (
              <button
                key={moment.id}
                type="button"
                className={`w-2.5 h-2.5 rounded-full transition-all ${activeIndex === index ? 'bg-hbf-charcoal w-6' : 'bg-hbf-charcoal/30'}`}
                aria-label={`갤러리 ${index + 1}번 보기`}
                aria-pressed={activeIndex === index}
                onClick={() => scrollToIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden md:grid md:grid-cols-5 gap-10 items-start">
          <div className="md:col-span-3 relative aspect-[4/5] rounded-[32px] overflow-hidden bg-hbf-charcoal/5">
            <Image
              src={currentMoment.src}
              alt={currentMoment.title}
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 60vw, 720px"
              priority
            />
            <div className="absolute top-6 left-6 space-y-2 text-hbf-white drop-shadow">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/50 text-xs font-semibold uppercase tracking-[0.2em]">
                {currentMoment.phase === 'past' ? 'PAST ERA' : 'PRESENT ERA'}
              </span>
              <div>
                <p className="text-sm text-hbf-white/80">{currentMoment.location}</p>
                <p className="text-4xl font-bold">{currentMoment.year}</p>
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-hbf-white space-y-1">
              <h3 className="text-2xl font-semibold">{currentMoment.title}</h3>
              <p className="text-sm text-hbf-white/80 leading-relaxed">{currentMoment.description}</p>
            </div>
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-hbf-white/80 text-hbf-charcoal flex items-center justify-center shadow-lg hover:bg-hbf-white"
              aria-label="이전 사진"
            >
              <FaChevronLeft />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-hbf-white/80 text-hbf-charcoal flex items-center justify-center shadow-lg hover:bg-hbf-white"
              aria-label="다음 사진"
            >
              <FaChevronRight />
            </button>
          </div>

          <div className="md:col-span-2 space-y-8">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.4em] text-hbf-charcoal-light">Timeline</p>
              <div className="flex items-center gap-4">
                <span className={`text-sm font-semibold ${currentMoment.phase === 'past' ? 'text-hbf-charcoal' : 'text-hbf-charcoal/40'}`}>2001</span>
                <div className="flex-1 h-px bg-hbf-charcoal/10 relative">
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-hbf-yellow"
                    style={{ left: `${(activeIndex / (total - 1)) * 100}%` }}
                  />
                </div>
                <span className={`text-sm font-semibold ${currentMoment.phase === 'present' ? 'text-hbf-charcoal' : 'text-hbf-charcoal/40'}`}>2025</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {galleryMoments.map((moment, index) => (
                <button
                  key={moment.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`relative aspect-[4/3] rounded-2xl overflow-hidden border transition-all ${
                    activeIndex === index ? 'border-hbf-yellow shadow-lg' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                  aria-label={`${moment.year} ${moment.title}`}
                >
                  <Image
                    src={moment.src}
                    alt={moment.title}
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-3 text-left">
                    <p className="text-xs text-hbf-white/70">{moment.year}</p>
                    <p className="text-sm font-semibold text-hbf-white">{moment.title}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
