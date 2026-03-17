'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import Lightbox from '@/components/ui/Lightbox';
import Button from '@/components/ui/Button';
import { fundingInfo } from '@/app/data/funding';

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.5,
    }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

const albumVariant: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut'
    }
  }
};

export default function SectionIntro() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <section className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
      {/* Blurred background */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/2th_album/album_art.webp"
          alt="나를 닮은 사내 앨범 아트 배경"
          fill
          className="object-cover blur-2xl scale-110"
          priority
          sizes="100vw"
          quality={60}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center px-6 py-12">
        {/* Album art card */}
        <motion.div
          className="mb-8 sm:mb-12 md:mb-16"
          variants={albumVariant}
          initial="hidden"
          animate="show"
        >
          <button
            type="button"
            onClick={() => setIsLightboxOpen(true)}
            className="block rounded-lg overflow-hidden shadow-2xl focus:outline-none focus:ring-2 focus:ring-hbf-yellow/60 focus:ring-offset-2 focus:ring-offset-black/50 cursor-zoom-in"
            aria-label="앨범 커버 확대"
          >
            <Image
              src="/images/2th_album/album_art.webp"
              alt="나를 닮은 사내 앨범 아트"
              width={300}
              height={300}
              className="w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-88 lg:h-88 xl:w-112 xl:h-112 object-cover"
              quality={85}
            />
          </button>
        </motion.div>

        {/* Text content */}
        <motion.div
          className="text-center max-w-2xl"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.p
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-hbf-white mb-4 sm:mb-6 font-watermelon"
            variants={item}
          >
            24년의 노래가, LP로 돌아옵니다.
          </motion.p>

          <motion.p
            className="text-base sm:text-lg md:text-2xl lg:text-3xl text-hbf-white/90 mb-8 sm:mb-12 font-watermelon"
            variants={item}
          >
            14년 만의 단독 콘서트 &apos;봄의 피로&apos;와 함께.
          </motion.p>

          <motion.div
            className="mb-6 sm:mb-8"
            variants={item}
          >
            <Image
              src="/images/logo/white_logo.png"
              alt="Huckleberryfinn"
              width={1104}
              height={264}
              className="w-56 sm:w-72 md:w-96 lg:w-[28rem] h-auto object-contain mx-auto"
              quality={90}
            />
          </motion.div>

          <motion.p
            className="text-sm sm:text-base md:text-lg lg:text-xl text-hbf-yellow font-watermelon font-semibold mb-6 sm:mb-8"
            variants={item}
          >
            500매 한정 LP | 텀블벅 펀딩 진행 중
          </motion.p>

          <motion.div variants={item}>
            <Button
              variant="primary"
              href={fundingInfo.tumblbugUrl}
              className="bg-hbf-yellow text-hbf-charcoal hover:bg-hbf-yellow-light border-0"
            >
              텀블벅에서 후원하기
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
      >
        <div className="w-6 h-10 border-2 border-hbf-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-hbf-white rounded-full mt-2"></div>
        </div>
      </motion.div>

      {isLightboxOpen && (
        <Lightbox
          src="/images/2th_album/album_art.webp"
          alt="나를 닮은 사내 앨범 아트"
          width={1500}
          height={1500}
          onClose={() => setIsLightboxOpen(false)}
        />
      )}
    </section>
  );
}
