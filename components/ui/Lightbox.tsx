'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { lockScroll } from '@/lib/scrollLock';
import { DURATION, EASE_OUT } from '@/lib/motion';

interface LightboxProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

/**
 * Accessible image dialog: locks page scroll, moves focus inside, traps Tab,
 * closes on Esc / backdrop, and returns focus to the element that opened it.
 */
export default function Lightbox({ src, alt, width, height, onClose, onPrev, onNext }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const handlers = useRef({ onClose, onPrev, onNext });
  handlers.current = { onClose, onPrev, onNext };

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const unlock = lockScroll();
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      const h = handlers.current;
      if (event.key === 'Escape') {
        event.preventDefault();
        h.onClose();
      } else if (event.key === 'ArrowLeft' && h.onPrev) {
        h.onPrev();
      } else if (event.key === 'ArrowRight' && h.onNext) {
        h.onNext();
      } else if (event.key === 'Tab') {
        const nodes = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('button') ?? []);
        if (nodes.length === 0) return;
        const idx = nodes.indexOf(document.activeElement as HTMLElement);
        if (event.shiftKey && idx <= 0) {
          event.preventDefault();
          nodes[nodes.length - 1].focus();
        } else if (!event.shiftKey && (idx === -1 || idx === nodes.length - 1)) {
          event.preventDefault();
          nodes[0].focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);

    return () => {
      document.removeEventListener('keydown', onKey);
      unlock();
      if (opener && document.contains(opener)) opener.focus();
    };
  }, []);

  if (typeof window === 'undefined') return null;

  const ratio = width && height ? width / height : null;
  const ratioValue = ratio ? Number(ratio.toFixed(4)) : null;
  const frameStyle = ratioValue
    ? {
        width: `min(90vw, calc(84svh * ${ratioValue}))`,
        height: `min(84svh, calc(90vw / ${ratioValue}))`,
      }
    : { width: '90vw', height: '84svh' };

  const imageProps = width && height ? { width, height } : { fill: true as const };

  return createPortal(
    <div
      ref={dialogRef}
      className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden bg-black/85 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`${alt} 크게 보기`}
      onClick={() => handlers.current.onClose()}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handlers.current.onClose();
        }}
        className="fixed right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-hbf-white transition-colors hover:text-bulb focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bulb md:right-6 md:top-6"
        aria-label="닫기"
      >
        <HiX size={26} />
      </button>
      <motion.div
        className="relative flex justify-center"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: DURATION.fast, ease: EASE_OUT }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative" style={frameStyle}>
          {onPrev && (
            <div className="absolute inset-y-0 left-2 z-10 flex items-center lg:-left-14">
              <button
                type="button"
                onClick={onPrev}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-hbf-white transition hover:text-bulb focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bulb"
                aria-label="이전 이미지"
              >
                <HiChevronLeft size={28} />
              </button>
            </div>
          )}
          {onNext && (
            <div className="absolute inset-y-0 right-2 z-10 flex items-center lg:-right-14">
              <button
                type="button"
                onClick={onNext}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-hbf-white transition hover:text-bulb focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bulb"
                aria-label="다음 이미지"
              >
                <HiChevronRight size={28} />
              </button>
            </div>
          )}
          <div className="relative h-full w-full overflow-hidden rounded-xl border border-hbf-white/20 bg-black shadow-2xl">
            <Image src={src} alt={alt} {...imageProps} className="h-full w-full object-contain" sizes="(max-width: 768px) 90vw, 70vw" />
          </div>
        </div>
      </motion.div>
    </div>,
    document.body
  );
}
