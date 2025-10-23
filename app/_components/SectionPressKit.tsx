'use client';

import { motion } from 'framer-motion';
import Heading from '@/components/ui/Heading';
import Button from '@/components/ui/Button';
import PressKitDownloader from '@/components/features/PressKitDownloader';

const pressKitItems = [
  {
    title: '보도자료 (Press Release)',
    type: 'PDF, DOCX',
    href: '/presskit/presskit.zip',
  },
  {
    title: '고해상도 프로필 사진 (Photos)',
    type: '12 Files, 300dpi, .JPG',
    href: '/presskit/presskit.zip',
  },
  {
    title: '앨범 아트워크 (Album Artwork)',
    type: '.PNG, .JPG',
    href: '/presskit/presskit.zip',
  },
  {
    title: '공식 로고 (Official Logo)',
    type: '.AI, .PNG',
    href: '/presskit/presskit.zip',
  },
];

export default function SectionPressKit() {
  return (
    <section className="bg-hbf-white py-16 md:py-24 px-6">
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
          <Button href="/presskit/presskit.zip" variant="primary">
            모든 자료 한번에 받기 (.ZIP)
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
