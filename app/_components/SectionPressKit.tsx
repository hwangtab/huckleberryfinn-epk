'use client';

import { motion } from 'framer-motion';
import Heading from '@/components/ui/Heading';
import Button from '@/components/ui/Button';
import { contactInfo } from '@/app/data/contact';

export default function SectionPressKit() {
  const streamingPlatforms = [
    {
      name: 'YouTube Music',
      description: '티저와 비교 플레이리스트로 리마스터의 방향성을 미리 확인하세요.',
      url: 'https://music.youtube.com/',
    },
    {
      name: 'Spotify',
      description: '전곡 스트리밍 · 10월 28일 정식 오픈 알림 설정 가능',
      url: 'https://open.spotify.com/',
    },
    {
      name: 'Apple Music',
      description: 'Dolby Atmos 버전과 하이라이트 클립 제공 예정',
      url: 'https://music.apple.com/',
    },
    {
      name: 'Melon',
      description: '국내 팬들을 위한 사전 저장 페이지',
      url: 'https://www.melon.com/',
    },
  ];

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
            스트리밍 플랫폼에서 공개 범위 내 자료만 연결하고, 고해상도 파일은 개별적으로 전달합니다.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {streamingPlatforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              className="p-6 border border-hbf-charcoal/10 rounded-2xl bg-hbf-white shadow-[0_20px_35px_-35px_rgba(0,0,0,0.8)] flex flex-col space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h3 className="text-xl font-semibold text-hbf-charcoal">{platform.name}</h3>
              <p className="text-sm text-hbf-charcoal-light flex-1">
                {platform.description}
              </p>
              <Button href={platform.url} variant="secondary" className="w-full text-base">
                바로가기
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 p-8 rounded-3xl bg-hbf-charcoal text-hbf-white space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.4em] text-hbf-yellow">Press Only</p>
            <h3 className="text-2xl font-bold">고해상도 자료 요청</h3>
            <p className="text-sm text-hbf-white/80 leading-relaxed">
              보도자료, 고해상도 이미지, 음원 파일은 요청 시 암호화된 링크로 전달됩니다.
              언론/프로모터 분들은 아래 연락처로 필요 항목을 알려주세요.
            </p>
          </div>

          <div className="space-y-2 text-sm text-hbf-white">
            <p className="font-semibold">{contactInfo.label} · {contactInfo.contact}</p>
            <p>
              Email: <a href={`mailto:${contactInfo.email}`} className="underline decoration-hbf-yellow/60 decoration-2 underline-offset-4">{contactInfo.email}</a>
            </p>
            <p>
              Phone: <a href={`tel:${contactInfo.phone}`} className="underline decoration-hbf-yellow/60 decoration-2 underline-offset-4">{contactInfo.phone}</a>
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button href={`mailto:${contactInfo.email}`} variant="primary" className="flex-1 min-w-[180px] text-base">
              프레스 액세스 요청
            </Button>
            <Button href={contactInfo.instagram} variant="secondary" className="flex-1 min-w-[180px] text-base">
              Instagram DM
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
