'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Heading from '@/components/ui/Heading';

export default function SectionNarrative() {
  const sectionRef = useRef<HTMLElement>(null);

  // 스크롤 진행률 측정
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // 스크롤 30%~70% 구간에서 0에서 1로 변환 (흑백 → 컬러)
  const colorOpacity = useTransform(scrollYProgress, [0.3, 0.7], [0, 1]);

  return (
    <section ref={sectionRef} className="bg-hbf-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image Section - 스크롤 기반 이미지 전환 */}
          <motion.div
            className="relative aspect-[4/5] rounded-lg overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            {/* 흑백 이미지 (베이스) */}
            <div className="absolute inset-0">
              <Image
                src="/images/2th_album/20001허클베리핀03.jpg"
                alt="Huckleberryfinn 흑백 사진"
                fill
                className="object-cover grayscale"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>

            {/* 컬러 이미지 (오버레이 - 스크롤에 따라 나타남) */}
            <motion.div
              className="absolute inset-0"
              style={{ opacity: colorOpacity }}
            >
              <Image
                src="/images/2th_album/20001허클베리핀03.jpg"
                alt="Huckleberryfinn 컬러 사진"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
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
                이번 재녹음은 단순한 추억의 재현이 아닙니다.
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
