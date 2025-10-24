'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Heading from '@/components/ui/Heading';
import Button from '@/components/ui/Button';

export default function SectionConcert() {
  return (
    <section className="bg-hbf-charcoal text-hbf-white py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          {/* Poster Image */}
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative aspect-[9/16] max-w-md mx-auto">
              <Image
                src="/images/yellowconcert/포스터.webp"
                alt="Yellow Concert 21 포스터"
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="w-full md:w-1/2 space-y-6 max-w-2xl"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Heading level="h2" className="text-hbf-yellow mb-6">
              21번째의 노란 약속,
              <br />
              Yellow Concert
            </Heading>

            <p className="text-lg text-hbf-white/90 leading-relaxed break-words">
              2004년부터 이어진 허클베리핀의 단독 브랜드 공연 &apos;옐로우 콘서트&apos;.
              <br />
              스물한 번째의 무대는 새롭게 태어난 2집 &apos;나를 닮은 사내&apos;의 첫 라이브와 함께합니다.
              <br />
              과거와 현재가 공존하는 특별한 밤, 10년 만에 다시 찾는 대구 클럽 헤비와 서울 롤링홀에서 오랜 팬들과의 뜨거운 만남을 기다립니다.
            </p>

            <div className="space-y-4 pt-6">
              <div className="border-l-4 border-hbf-yellow pl-6">
                <p className="text-xl font-bold mb-2">대구 공연</p>
                <p className="text-hbf-white/80">2025. 11. 01 (Sat) @ Club Heavy</p>
              </div>

              <div className="border-l-4 border-hbf-yellow pl-6">
                <p className="text-xl font-bold mb-2">서울 공연</p>
                <p className="text-hbf-white/80">
                  2025. 12. 13 (Sat) @ Rolling Hall
                </p>
              </div>
            </div>

            <div className="pt-8">
              <Button variant="secondary" href="https://booking.naver.com/booking/5/bizes/1491878" className="border-hbf-yellow text-hbf-yellow hover:bg-hbf-yellow hover:text-hbf-charcoal">
                예매하기
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
