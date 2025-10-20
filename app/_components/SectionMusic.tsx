'use client';

import { motion } from 'framer-motion';
import Heading from '@/components/ui/Heading';
import CustomAudioPlayer from '@/components/features/CustomAudioPlayer';

const tracks = [
  {
    number: 1,
    title: '사막',
    titleEn: 'Desert',
    src: '/audio/01-사막.mp3',
    producersNote: '20대 특유의 날카로운 에너지를 현재의 깊이로 담아내려 했습니다. 원곡의 거친 질감은 살리되, 더욱 견고하고 입체적인 사운드를 구현했습니다.',
  },
  {
    number: 2,
    title: 'Somebody To Love',
    src: '/audio/02-somebody-to-love.mp3',
  },
  {
    number: 3,
    title: 'A',
    src: '/audio/03-a.mp3',
  },
  {
    number: 4,
    title: '길들여진 개',
    src: '/audio/04-길들여진개.mp3',
  },
  {
    number: 5,
    title: '훌라',
    src: '/audio/05-훌라.mp3',
  },
  {
    number: 6,
    title: 'Shaker',
    src: '/audio/06-shaker.mp3',
  },
  {
    number: 7,
    title: 'Em',
    src: '/audio/07-em.mp3',
    producersNote: '원곡의 몽환적인 분위기를 극대화하는 데 중점을 두었습니다. 아날로그 신디사이저와 공간계 이펙터를 적극적으로 활용해, 듣는 이를 감싸는 듯한 사운드 스케이프를 완성했습니다.',
  },
  {
    number: 8,
    title: 'Oz',
    src: '/audio/08-oz.mp3',
  },
  {
    number: 9,
    title: '길을 걷다',
    src: '/audio/09-길을걷다.mp3',
  },
  {
    number: 10,
    title: '고양이',
    src: '/audio/10-고양이.mp3',
  },
  {
    number: 11,
    title: 'Silver',
    src: '/audio/11-silver.mp3',
  },
];

export default function SectionMusic() {
  return (
    <section className="bg-gradient-to-b from-hbf-white to-hbf-yellow/20 py-24 px-6">
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
            이것은 단순한 리마스터가 아닌, 모든 악기와 목소리를 새롭게 녹음하고
            재해석한 &apos;2025년의 앨범&apos;입니다.
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
