'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Heading from '@/components/ui/Heading';
import Button from '@/components/ui/Button';
import { fundingInfo } from '@/app/data/funding';

export default function SectionConcert() {
  const { concert, tumblbugUrl } = fundingInfo;

  return (
    <section id="concert" className="bg-hbf-charcoal text-hbf-white py-16 md:py-24 px-6 scroll-mt-16 md:scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          {/* Poster Image */}
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative aspect-[9/16] max-w-md mx-auto">
              <Image
                src="/images/concert/poster-spring.jpeg"
                alt="봄의 피로 콘서트 포스터"
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
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Heading level="h2" className="text-hbf-yellow mb-6">
              14년 만에 돌아온
              <br />
              {concert.name}
            </Heading>

            <p className="text-lg text-hbf-white/90 leading-relaxed break-words">
              2012년 이후 처음 선보이는 허클베리핀의 단독 콘서트.
              <br />
              어쿠스틱 곡을 중심으로, 봄날의 나른함과 피로함을 함께 위로하는 밤입니다.
              <br />
              재녹음된 2집 &apos;나를 닮은 사내&apos;의 노래들을 라이브로 만나보세요.
            </p>

            <div className="space-y-4 pt-6">
              <div className="border-l-4 border-hbf-yellow pl-6 space-y-2">
                <p className="text-xl font-bold">{concert.name}</p>
                <p className="text-hbf-white/80">{concert.date}</p>
                <p className="text-hbf-white/80">{concert.venue}</p>
                <p className="text-hbf-white/60 text-sm">{concert.address}</p>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <p className="text-hbf-white/50 text-sm line-through">
                정가 {concert.originalPrice.toLocaleString('ko-KR')}원
              </p>
              <p className="text-hbf-yellow text-xl font-bold">
                텀블벅 {concert.discountPrice.toLocaleString('ko-KR')}원
                <span className="text-sm font-normal text-hbf-white/60 ml-2">(20% 할인)</span>
              </p>
            </div>

            <p className="text-hbf-white/50 text-sm">
              * 공연 영상 촬영 진행 예정. 비동의 시 마스크 착용 부탁드립니다.
            </p>

            <div className="pt-4">
              <Button
                variant="secondary"
                href={tumblbugUrl}
                className="border-hbf-yellow text-hbf-yellow hover:bg-hbf-yellow hover:text-hbf-charcoal"
              >
                텀블벅에서 티켓 후원하기
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
