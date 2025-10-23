'use client';

import { motion } from 'framer-motion';
import Heading from '@/components/ui/Heading';
import Button from '@/components/ui/Button';

export default function SectionFuture() {
  return (
    <section className="bg-hbf-white py-16 md:py-24 px-6">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <Heading level="h2" className="text-hbf-charcoal mb-8">
          청년 허클베리핀,
          <br />
          현재의 청년에게
        </Heading>

        <div className="space-y-6 text-lg text-hbf-charcoal-light leading-relaxed mb-12">
          <p>
            저희 역시 모든 것이 불확실했던 시절이 있었습니다.
            <br />
            그때의 저희처럼, 지금도 자신만의 음악을 위해 고군분투하고 있을 신진 뮤지션들과 연대하고자 합니다.
          </p>

          <p>
            이것은 심사나 경쟁이 아닌, 동료 뮤지션으로서 함께 무대를 만들고, 저희가 겪어온 경험과 노하우를 나누는 약속입니다.
            <br />
            허클베리핀의 다음 챕터를 함께 열어갈 아티스트를 기다립니다.
          </p>
        </div>

        {/* Benefits */}
        <motion.div
          className="bg-hbf-yellow/10 border-2 border-hbf-yellow rounded-lg p-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-hbf-charcoal mb-6 font-headline">
            프로젝트 혜택
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-4xl mb-2">🎵</div>
              <p className="font-bold text-hbf-charcoal">
                허클베리핀 멤버 직접 프로듀싱
              </p>
              <p className="text-sm text-hbf-charcoal-light">
                싱글 앨범 제작 지원
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-4xl mb-2">🎸</div>
              <p className="font-bold text-hbf-charcoal">
                옐로우 콘서트 오프닝 무대
              </p>
              <p className="text-sm text-hbf-charcoal-light">
                21회 공연 오프닝 기회
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-4xl mb-2">🎹</div>
              <p className="font-bold text-hbf-charcoal">
                작업실 투어 & 멘토링
              </p>
              <p className="text-sm text-hbf-charcoal-light">
                실질적인 노하우 공유
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Button href="mailto:shalabel@naver.com">
            프로젝트 참여하기
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
