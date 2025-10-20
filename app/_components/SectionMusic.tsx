'use client';

import { motion } from 'framer-motion';
import Heading from '@/components/ui/Heading';
import CustomAudioPlayer from '@/components/features/CustomAudioPlayer';

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
          <p className="text-lg text-hbf-charcoal-light max-w-3xl mx-auto">
            이것은 단순한 리마스터가 아닌, 모든 악기와 목소리를 새롭게 녹음하고
            재해석한 &apos;2025년의 앨범&apos;입니다.
          </p>
        </motion.div>

        <div className="space-y-12">
          {/* Track 1: 사막 */}
          <CustomAudioPlayer
            src="/audio/desert.mp3"
            title="사막 (Desert)"
            producersNote="20대 특유의 날카로운 에너지를 현재의 깊이로 담아내려 했습니다. 원곡의 거친 질감은 살리되, 더욱 견고하고 입체적인 사운드를 구현했습니다."
          />

          {/* Track 2: Em */}
          <CustomAudioPlayer
            src="/audio/em.mp3"
            title="Em"
            producersNote="원곡의 몽환적인 분위기를 극대화하는 데 중점을 두었습니다. 아날로그 신디사이저와 공간계 이펙터를 적극적으로 활용해, 듣는 이를 감싸는 듯한 사운드 스케이프를 완성했습니다."
          />
        </div>

        <motion.div
          className="text-center mt-16 text-sm text-hbf-charcoal-light"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p>전곡 듣기는 각 음원 스트리밍 플랫폼에서 10월 28일 공개됩니다.</p>
        </motion.div>
      </div>
    </section>
  );
}
