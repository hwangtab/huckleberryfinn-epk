'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause, FaInfoCircle } from 'react-icons/fa';

interface CustomAudioPlayerProps {
  src: string;
  title: string;
  producersNote: string;
}

export default function CustomAudioPlayer({
  src,
  title,
  producersNote,
}: CustomAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showNote, setShowNote] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

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
      setDuration(audio.duration);
    };

    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    audio.currentTime = percentage * audio.duration;
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      className="bg-hbf-white border-2 border-hbf-charcoal/10 rounded-lg p-6 max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <audio ref={audioRef} src={src} preload="metadata" />

      <div className="flex items-center gap-4 mb-4">
        <motion.button
          onClick={togglePlay}
          className="w-16 h-16 bg-hbf-yellow rounded-full flex items-center justify-center text-hbf-charcoal hover:bg-hbf-yellow-light transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isPlaying ? '일시정지' : '재생'}
        >
          {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
        </motion.button>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xl font-bold text-hbf-charcoal">{title}</h4>
            <button
              onClick={() => setShowNote(!showNote)}
              className="text-hbf-charcoal-light hover:text-hbf-yellow transition-colors"
              aria-label="프로듀서 노트 보기"
            >
              <FaInfoCircle size={20} />
            </button>
          </div>

          {/* Progress Bar */}
          <div
            className="relative h-2 bg-hbf-charcoal/10 rounded-full cursor-pointer group"
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

      {/* Producer's Note */}
      <AnimatePresence>
        {showNote && (
          <motion.div
            className="mt-4 p-4 bg-hbf-yellow/10 border-l-4 border-hbf-yellow rounded"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm font-semibold text-hbf-charcoal mb-2">
              Producer&apos;s Note
            </p>
            <p className="text-sm text-hbf-charcoal-light leading-relaxed">
              {producersNote}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Visual Feedback when Playing */}
      {isPlaying && (
        <motion.div
          className="mt-4 flex justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
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
    </motion.div>
  );
}
