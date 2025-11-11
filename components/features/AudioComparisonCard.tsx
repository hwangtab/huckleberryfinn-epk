'use client';

import { useEffect, useRef, useState, MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { FaPause, FaPlay } from 'react-icons/fa';
import type { AudioComparisonTrack, AudioComparisonVariant } from '@/app/data/audioComparisons';
import { useAudioPlayer } from '@/app/contexts/AudioPlayerContext';

interface AudioComparisonCardProps {
  track: AudioComparisonTrack;
  index: number;
}

export default function AudioComparisonCard({ track, index }: AudioComparisonCardProps) {
  return (
    <motion.article
      className="bg-hbf-white/5 backdrop-blur rounded-3xl border border-hbf-white/10 p-6 sm:p-8"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      <header className="mb-6 space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-hbf-yellow/80">Comparison {String(index + 1).padStart(2, '0')}</p>
        <h3 className="text-2xl sm:text-3xl font-bold text-hbf-white">
          {track.title}
        </h3>
      </header>

      <div className="space-y-4">
        {track.variants.map(variant => (
          <AudioComparisonVariantPlayer key={variant.id} variant={variant} />
        ))}
      </div>
    </motion.article>
  );
}

interface AudioComparisonVariantPlayerProps {
  variant: AudioComparisonVariant;
}

function AudioComparisonVariantPlayer({ variant }: AudioComparisonVariantPlayerProps) {
  const { playingSrc, setPlayingSrc } = useAudioPlayer();
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressContainerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const isPlaying = playingSrc === variant.audioSrc;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      if (!audio.duration) return;
      setProgress((audio.currentTime / audio.duration) * 100);
      setCurrentTime(audio.currentTime);
    };

    const updateDuration = () => {
      if (!Number.isNaN(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      setPlayingSrc(null);
      setProgress(0);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('loadeddata', updateDuration);
    audio.addEventListener('durationchange', updateDuration);
    audio.addEventListener('ended', handleEnded);

    updateDuration();

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('loadeddata', updateDuration);
      audio.removeEventListener('durationchange', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [setPlayingSrc]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((err) => console.error('Audio play failed', err));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  const handleToggle = () => {
    if (isPlaying) {
      setPlayingSrc(null);
    } else {
      setPlayingSrc(variant.audioSrc);
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
    audio.currentTime = percentage * audio.duration;
  };

  const formatTime = (time: number) => {
    if (!time || Number.isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const containerClasses =
    variant.accent === 'remaster'
      ? 'bg-gradient-to-br from-hbf-yellow-light via-hbf-yellow to-hbf-yellow/80 text-hbf-charcoal'
      : 'bg-hbf-white text-hbf-charcoal';

  const progressBg = variant.accent === 'remaster' ? 'bg-hbf-charcoal/20' : 'bg-hbf-charcoal/10';
  const progressFill = variant.accent === 'remaster' ? 'bg-hbf-charcoal' : 'bg-hbf-yellow';

  return (
    <div className={`rounded-2xl p-5 shadow-[0_15px_45px_-25px_rgba(0,0,0,0.6)] ${containerClasses}`}>
      <audio ref={audioRef} src={variant.audioSrc} preload="metadata" />
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="px-3 py-1 text-xs font-bold rounded-full bg-black/10 uppercase tracking-wide">
          {variant.yearLabel}
        </span>
        <p className="text-sm font-semibold tracking-tight">{variant.versionLabel}</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
        <motion.button
          type="button"
          onClick={handleToggle}
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${variant.accent === 'remaster' ? 'bg-hbf-charcoal text-hbf-yellow' : 'bg-hbf-yellow text-hbf-charcoal'}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isPlaying ? '일시정지' : '재생'}
        >
          {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} className="ml-0.5" />}
        </motion.button>

        <div className="flex-1 min-w-0">
          <div
            ref={progressContainerRef}
            className={`w-full h-2 rounded-full cursor-pointer ${progressBg}`}
            onClick={handleProgressClick}
          >
            <div className={`h-full rounded-full ${progressFill}`} style={{ width: `${progress}%` }} />
          </div>
          <div className="flex justify-between text-xs font-semibold mt-2 opacity-70">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
