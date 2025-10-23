'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Heading from '@/components/ui/Heading';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { narrativeImages } from '@/app/data/narrativeImages';

export default function SectionNarrative() {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 자동 전환 기능 (3초마다)
  useEffect(() => {
    const startAutoplay = () => {
      autoplayTimerRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % narrativeImages.length);
      }, 3000);
    };

    startAutoplay();

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, []);

  // 네비게이션 핸들러
  const handlePrev = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + narrativeImages.length) % narrativeImages.length
    );
    // 타이머 리셋
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
    }
    autoplayTimerRef.current = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % narrativeImages.length);
    }, 3000);
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % narrativeImages.length);
    // 타이머 리셋
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
    }
    autoplayTimerRef.current = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % narrativeImages.length);
    }, 3000);
  };

  return (
    <section ref={sectionRef} className="bg-hbf-white py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Image Section - 자동 전환 슬라이더 */}
          <motion.div
            className="relative aspect-[4/5] rounded-lg overflow-hidden group"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            {/* 이미지 슬라이더 */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={narrativeImages[currentImageIndex]}
                  alt={`Huckleberryfinn past photo ${currentImageIndex + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
              </motion.div>
            </AnimatePresence>

            {/* 좌 네비게이션 버튼 */}
            <motion.button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-hbf-charcoal/30 text-hbf-white flex items-center justify-center opacity-0 hover:bg-hbf-charcoal/50 transition-all group-hover:opacity-100"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="이전 사진"
            >
              <FaChevronLeft size={20} />
            </motion.button>

            {/* 우 네비게이션 버튼 */}
            <motion.button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-hbf-charcoal/30 text-hbf-white flex items-center justify-center opacity-0 hover:bg-hbf-charcoal/50 transition-all group-hover:opacity-100"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="다음 사진"
            >
              <FaChevronRight size={20} />
            </motion.button>
          </motion.div>

          {/* Text Content */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Heading level="h2" className="text-hbf-charcoal mb-6">
              과거의 아쉬움,
              <br />
              현재의 목소리로 답하다
            </Heading>

            <motion.blockquote
              className="border-l-4 border-hbf-yellow pl-6 space-y-4 text-hbf-charcoal-light leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p>
                &quot;2집 &apos;나를 닮은 사내&apos;는 오랜 시간 &apos;아픈 손가락&apos;이었습니다.
                <br />
                당시 저희가 가진 역량과 회사의 촉박한 일정 속에서, 노래들이 가진 본연의 가능성을 온전히 피워내지 못했다는 죄책감이 늘 마음 한편에 있었습니다.
                <br />
                평단의 좋은 평가와는 별개로, 아티스트 스스로의 아쉬움은 선명했습니다.&quot;
              </p>

              <p>
                이번 재녹음은 과거로 돌아가려는 시도가 아닙니다.
                <br />
                24년의 세월을 지나 비로소 우리가 들려주고 싶었던 사운드와 편곡으로, 그 노래들에게 마땅히 주었어야 할 완전한 생명을 불어넣는 과정입니다.
                <br />
                이것은 과거에 대한 저희의 대답이자, 이 노래들을 사랑해주신 모든 분들께 드리는 저희의 진심입니다.&quot;
              </p>

              <footer className="text-hbf-charcoal font-semibold mt-4">
                - 이기용 (Huckleberryfinn)
              </footer>
            </motion.blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
