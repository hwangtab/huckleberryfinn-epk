'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Heading from '@/components/ui/Heading';
import AudioComparisonCard from '@/components/features/AudioComparisonCard';
import { audioComparisonTracks } from '@/app/data/audioComparisons';

export default function SectionAudioComparison() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(max-width: 640px)');
    const handleChange = () => setIsMobile(mq.matches);
    handleChange();
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  return (
    <section id="comparison" className="bg-hbf-charcoal py-20 md:py-28 px-6 scroll-mt-16 md:scroll-mt-20">
      <div className="max-w-6xl mx-auto space-y-12">
        <motion.div
          className="text-center max-w-3xl mx-auto space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <Heading level="h2" className="text-hbf-white">
            2001 vs 2025, 귀로 확인하세요
          </Heading>
          <p className="text-base md:text-lg text-hbf-white/80 leading-relaxed">
            당시 장비로는 살릴 수 없던 주파수 대역과 공간감을 24년 만에 다시 조각했습니다.
            15초의 동일 구간을 골라 두 버전을 번갈아 감상할 수 있도록 준비했습니다.
          </p>
          <p className="text-xs uppercase tracking-[0.3em] text-hbf-yellow/80">
            Headphones Recommended · 동일 구간 AB Test
          </p>
        </motion.div>

        <div className="space-y-6 md:space-y-10">
          {audioComparisonTracks.map((track, index) => (
            <AudioComparisonCard key={track.id} track={track} index={index} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </section>
  );
}
