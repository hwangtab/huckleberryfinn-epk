'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi';

interface LightboxProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export default function Lightbox({ src, alt, width, height, onClose, onPrev, onNext }: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowLeft' && onPrev) {
        onPrev();
      } else if (event.key === 'ArrowRight' && onNext) {
        onNext();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (typeof window === 'undefined') {
    return null;
  }

  const ratio = width && height ? width / height : null;
  const ratioValue = ratio ? Number(ratio.toFixed(4)) : null;
  const frameStyle = ratioValue
    ? {
        width: `min(90vw, calc(90vh * ${ratioValue}))`,
        height: `min(90vh, calc(90vw / ${ratioValue}))`,
      }
    : {
        width: '90vw',
        height: '90vh',
      };

  return createPortal(
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      <motion.div
        className="relative flex justify-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-10 right-6 text-hbf-white hover:text-hbf-yellow transition-colors duration-150"
          aria-label="이미지 닫기"
        >
          <HiX size={28} />
        </button>
        <div className="relative" style={frameStyle}>
          <div className="absolute inset-y-0 left-2 lg:-left-12 flex items-center z-10">
            {onPrev && (
              <button
                type="button"
                onClick={onPrev}
                className="text-hbf-white hover:text-hbf-yellow transition bg-black/30 lg:bg-transparent rounded-full p-2 lg:p-0 backdrop-blur-sm"
                aria-label="이전 이미지"
              >
                <HiChevronLeft size={28} />
              </button>
            )}
          </div>
          <div className="absolute inset-y-0 right-2 lg:-right-12 flex items-center z-10">
            {onNext && (
              <button
                type="button"
                onClick={onNext}
                className="text-hbf-white hover:text-hbf-yellow transition bg-black/30 lg:bg-transparent rounded-full p-2 lg:p-0 backdrop-blur-sm"
                aria-label="다음 이미지"
              >
                <HiChevronRight size={28} />
              </button>
            )}
          </div>
          <div className="relative rounded-xl overflow-hidden shadow-2xl border border-hbf-white/20 bg-black w-full h-full">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      </motion.div>
    </div>,
    document.body
  );
}
