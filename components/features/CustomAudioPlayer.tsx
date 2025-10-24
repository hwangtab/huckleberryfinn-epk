'use client';

import { useState, useRef, useEffect, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause, FaInfoCircle } from 'react-icons/fa';
import { useAudioPlayer } from '@/app/contexts/AudioPlayerContext';

interface CustomAudioPlayerProps {
  src: string;
  title: string;
  lyrics?: string;
}

export default function CustomAudioPlayer({
  src,
  title,
  lyrics,
}: CustomAudioPlayerProps) {
  const { playingSrc, setPlayingSrc } = useAudioPlayer();
  const isPlaying = playingSrc === src;
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressContainerRef = useRef<HTMLDivElement>(null);

  // Auto-expand when playing, auto-close when stopped
  useEffect(() => {
    if (isPlaying && lyrics) {
      setShowDetails(true);
    } else if (!isPlaying) {
      setShowDetails(false);
    }
  }, [isPlaying, lyrics]);

  // Context의 playingSrc 변경에 따라 재생/정지
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(e => console.error('Audio play failed:', e));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
        setCurrentTime(audio.currentTime);
      }
    };

    const updateDuration = () => {
      if (!isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => setPlayingSrc(null);

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [setPlayingSrc]);

  const togglePlay = () => {
    if (isPlaying) {
      setPlayingSrc(null);
    } else {
      setPlayingSrc(src);
    }
  };

  const handleProgressClick = (e: MouseEvent<HTMLDivElement>) => {
    const container = progressContainerRef.current;
    const audio = audioRef.current;
    if (!container || !audio || !audio.duration) return;

    const rect = container.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = clickX / width;
    const newTime = percentage * audio.duration;
    audio.currentTime = newTime;
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || time === 0) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      className="bg-hbf-white border-2 border-hbf-charcoal/10 rounded-lg p-6 max-w-2xl mx-auto cursor-pointer transition-all hover:border-hbf-charcoal/20"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onClick={() => lyrics && setShowDetails(!showDetails)}
    >
      <audio ref={audioRef} src={src} preload="metadata" />

      <div className="flex items-center gap-2 md:gap-4 mb-4">
        <motion.button
          onClick={togglePlay}
          className="w-14 h-14 md:w-16 md:h-16 bg-hbf-yellow rounded-full flex items-center justify-center text-hbf-charcoal hover:bg-hbf-yellow-light transition-colors flex-shrink-0"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isPlaying ? '일시정지' : '재생'}
        >
          {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} className="ml-0.5" />}
        </motion.button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2 gap-2">
            <h4 className="text-sm md:text-base lg:text-lg font-bold text-hbf-charcoal truncate">{title}</h4>
            {lyrics && (
              <span className="text-xs text-hbf-charcoal-light flex-shrink-0">
                {showDetails ? '▼' : '▶'}
              </span>
            )}
          </div>

          {/* Progress Bar */}
          <div
            ref={progressContainerRef}
            className="relative h-3 bg-hbf-charcoal/10 rounded-full cursor-pointer group"
            onClick={handleProgressClick}
          >
            <motion.div
              className="absolute h-full bg-hbf-yellow rounded-full"
              style={{ width: `${progress}%` }}
              initial={{ width: 0 }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-hbf-charcoal rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ left: `calc(${progress}% - 8px)` }}
            />
          </div>

          {/* Time Display */}
          <div className="flex justify-between text-sm text-hbf-charcoal-light mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      {/* Lyrics */}
      <AnimatePresence>
        {showDetails && lyrics && (
          <motion.div
            className="mt-4 p-4 bg-hbf-yellow/5 border-l-4 border-hbf-yellow rounded"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm font-semibold text-hbf-charcoal mb-3">
              가사
            </p>
            <div className="max-h-64 overflow-y-auto text-sm text-hbf-charcoal-light leading-relaxed whitespace-pre-wrap font-watermelon">
              {lyrics}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Visual Feedback Container - Dynamic Height based on Playing State */}
      <div className={`mt-4 flex justify-center items-end gap-2 transition-all duration-200 ${isPlaying ? 'h-12' : 'h-0'}`}>
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              className="flex justify-center items-end gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-hbf-yellow rounded-full"
                  animate={{
                    height: ['20px', '40px', '20px'],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
