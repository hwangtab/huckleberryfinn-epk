'use client';

import { motion } from 'framer-motion';
import Heading from '@/components/ui/Heading';
import CustomAudioPlayer from '@/components/features/CustomAudioPlayer';
import { tracks } from '@/app/data/tracks';

export default function SectionMusic() {
  return (
    <section className="bg-gradient-to-b from-hbf-white to-hbf-yellow/20 py-16 md:py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <Heading level="h2" className="text-hbf-charcoal mb-4">
            다시, 숨 쉬는 노래들
          </Heading>
          <p className="text-lg text-hbf-charcoal-light max-w-3xl mx-auto mb-4">
            이것은 단순한 리마스터가 아닌, 모든 악기와 목소리를 새롭게 녹음하고 재해석한 &apos;2025년의 앨범&apos;입니다.
          </p>
          <p className="text-sm text-hbf-charcoal-light">
            전곡 (Total 11 Tracks)
          </p>
        </motion.div>

        <div className="space-y-8">
          {tracks.map((track, index) => (
            <CustomAudioPlayer
              key={track.number}
              src={track.src}
              title={`${track.number}. ${track.title}${track.titleEn ? ` (${track.titleEn})` : ''}`}
              producersNote={track.producersNote || ''}
            />
          ))}
        </div>

        <motion.div
          className="text-center mt-16 space-y-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-sm text-hbf-charcoal-light">
            💿 전곡 듣기는 각 음원 스트리밍 플랫폼에서 10월 28일 공개됩니다.
          </p>
          <div className="flex justify-center gap-4 text-xs text-hbf-charcoal-light">
            <span>Melon</span>
            <span>•</span>
            <span>Spotify</span>
            <span>•</span>
            <span>Apple Music</span>
            <span>•</span>
            <span>YouTube Music</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
