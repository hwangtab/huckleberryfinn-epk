'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Heading from '@/components/ui/Heading';
import Button from '@/components/ui/Button';
import { fundingInfo } from '@/app/data/funding';

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

function formatPrice(price: number) {
  return price.toLocaleString('ko-KR') + '원';
}

export default function SectionFunding() {
  const { lp, concert, rewards, tumblbugUrl, fundingEndDate } = fundingInfo;

  return (
    <section id="funding" className="bg-hbf-charcoal text-hbf-white py-16 md:py-24 px-6 scroll-mt-16 md:scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-hbf-yellow text-sm font-semibold tracking-widest uppercase mb-3">
            Crowdfunding
          </p>
          <Heading level="h2" className="text-hbf-white mb-4">
            텀블벅 펀딩 진행 중
          </Heading>
          <p className="text-hbf-white/60 text-base md:text-lg">
            펀딩 마감: {fundingEndDate.replace(/-/g, '.')}
          </p>
        </motion.div>

        {/* LP Block */}
        <motion.div
          className="flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-16 md:mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
        >
          {/* Album art */}
          <motion.div
            className="w-full md:w-5/12 flex justify-center"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/images/2th_album/album_art.webp"
                alt="나를 닮은 사내 LP 앨범 아트"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 320px, 384px"
              />
            </div>
          </motion.div>

          {/* LP Info */}
          <motion.div
            className="w-full md:w-7/12 space-y-6"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div>
              <p className="text-hbf-yellow text-xs font-semibold tracking-widest uppercase mb-2">
                500매 한정
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-hbf-white mb-1">
                {lp.title}
              </h3>
              <p className="text-hbf-white/50 text-sm">
                배송 시작: {lp.deliveryStart.replace(/-/g, '.')}부터 순차 배송
              </p>
            </div>

            {/* Tracklist */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-hbf-yellow text-xs font-semibold tracking-wider mb-2">SIDE A</p>
                <ol className="space-y-1">
                  {lp.sideA.map((track, i) => (
                    <li key={track} className="text-hbf-white/80 text-sm">
                      {i + 1}. {track}
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <p className="text-hbf-yellow text-xs font-semibold tracking-wider mb-2">SIDE B</p>
                <ol className="space-y-1">
                  {lp.sideB.map((track, i) => (
                    <li key={track} className="text-hbf-white/80 text-sm">
                      {i + 1}. {track}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Price */}
            <div className="border-l-4 border-hbf-yellow pl-4">
              <p className="text-hbf-white/50 text-sm line-through">{formatPrice(lp.originalPrice)}</p>
              <p className="text-hbf-yellow text-2xl font-bold">
                {formatPrice(lp.discountPrice)}
                <span className="text-sm font-normal text-hbf-white/60 ml-2">텀블벅 10% 할인</span>
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Concert Block */}
        <motion.div
          className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12 mb-16 md:mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
        >
          {/* Poster */}
          <motion.div
            className="w-full md:w-5/12 flex justify-center"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-64 sm:w-72 md:w-80 aspect-[9/16] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/images/concert/poster-spring.jpeg"
                alt="봄의 피로 콘서트 포스터"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 288px, 320px"
              />
            </div>
          </motion.div>

          {/* Concert Info */}
          <motion.div
            className="w-full md:w-7/12 space-y-6"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div>
              <p className="text-hbf-yellow text-xs font-semibold tracking-widest uppercase mb-2">
                단독 콘서트
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-hbf-white mb-1">
                {concert.name}
              </h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-hbf-yellow text-xs font-semibold tracking-wider w-12 pt-0.5 shrink-0">DATE</span>
                <span className="text-hbf-white/80">{concert.date}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-hbf-yellow text-xs font-semibold tracking-wider w-12 pt-0.5 shrink-0">VENUE</span>
                <div>
                  <p className="text-hbf-white/80">{concert.venue}</p>
                  <p className="text-hbf-white/50 text-sm">{concert.address}</p>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="border-l-4 border-hbf-yellow pl-4">
              <p className="text-hbf-white/50 text-sm line-through">{formatPrice(concert.originalPrice)}</p>
              <p className="text-hbf-yellow text-2xl font-bold">
                {formatPrice(concert.discountPrice)}
                <span className="text-sm font-normal text-hbf-white/60 ml-2">텀블벅 20% 할인</span>
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Rewards Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-12 md:mb-16"
        >
          <motion.h3
            variants={item}
            className="text-xl md:text-2xl font-bold text-hbf-white mb-6 md:mb-8 text-center"
          >
            리워드 안내
          </motion.h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rewards.map((reward) => (
              <motion.div
                key={reward.id}
                variants={item}
                className={`relative rounded-xl border p-5 space-y-3 ${
                  reward.soldOut
                    ? 'border-hbf-white/10 bg-hbf-white/5 opacity-50'
                    : 'border-hbf-yellow/30 bg-hbf-white/5 hover:border-hbf-yellow/60 transition-colors duration-300'
                }`}
              >
                {reward.soldOut && (
                  <span className="absolute top-3 right-3 text-xs bg-hbf-white/20 text-hbf-white/70 px-2 py-0.5 rounded-full">
                    품절
                  </span>
                )}
                {reward.discount && (
                  <span className="inline-block text-xs bg-hbf-yellow text-hbf-charcoal font-bold px-2 py-0.5 rounded-full">
                    {reward.discount} 할인
                  </span>
                )}
                <h4 className="text-base font-bold text-hbf-white leading-snug pr-12">
                  {reward.name}
                </h4>
                <ul className="space-y-1">
                  {reward.includes.map((inc) => (
                    <li key={inc} className="text-hbf-white/60 text-sm flex items-start gap-1.5">
                      <span className="text-hbf-yellow mt-1">·</span>
                      {inc}
                    </li>
                  ))}
                </ul>
                <div className="pt-1">
                  {reward.originalPrice && (
                    <p className="text-hbf-white/40 text-xs line-through">{formatPrice(reward.originalPrice)}</p>
                  )}
                  <p className={`text-lg font-bold ${reward.soldOut ? 'text-hbf-white/50' : 'text-hbf-yellow'}`}>
                    {formatPrice(reward.price)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <Button
            variant="primary"
            href={tumblbugUrl}
            className="bg-hbf-yellow text-hbf-charcoal hover:bg-hbf-yellow-light border-0 text-xl px-12 py-5"
          >
            텀블벅에서 후원하기
          </Button>
          <p className="text-hbf-white/40 text-sm mt-4">
            펀딩 마감 {fundingEndDate.replace(/-/g, '.')} · 배송 {lp.deliveryStart.replace(/-/g, '.')}부터 순차 발송
          </p>
        </motion.div>
      </div>
    </section>
  );
}
