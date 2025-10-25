'use client';

import { motion } from 'framer-motion';
import Heading from '@/components/ui/Heading';
import Button from '@/components/ui/Button';
import PressKitDownloader from '@/components/features/PressKitDownloader';
import { pressKitItems } from '@/app/data/presskit';

export default function SectionPressKit() {
  return (
    <section id="presskit" className="bg-hbf-white py-16 md:py-24 px-6 scroll-mt-16 md:scroll-mt-20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <Heading level="h2" className="text-hbf-charcoal mb-4">
            미디어 & 프레스킷
          </Heading>
          <p className="text-lg text-hbf-charcoal-light">
            허클베리핀의 새 프로젝트에 대한 모든 공식 자료를 제공합니다.
          </p>
        </motion.div>

        <PressKitDownloader items={pressKitItems} />

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Button href="https://drive.google.com/drive/folders/1OcARASSeww-g_SBYr0ywBcxchKGi8eYF?usp=sharing" variant="primary">
            Google Drive에서 전체 자료 보기
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
