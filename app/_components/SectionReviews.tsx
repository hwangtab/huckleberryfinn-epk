'use client';

import { motion, Variants } from 'framer-motion';
import Heading from '@/components/ui/Heading';
import { reviews } from '@/app/data/reviews';

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.2,
    }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

export default function SectionReviews() {
  return (
    <section id="reviews" className="bg-hbf-charcoal/5 py-16 md:py-24 px-6 scroll-mt-16 md:scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <Heading level="h2" className="text-hbf-charcoal mb-4">
            Artist Endorsements
          </Heading>
          <p className="text-lg text-hbf-charcoal-light">
            동료 음악인과 평론가가 건네는 재녹음 추천사
          </p>
        </motion.div>

        <motion.div
          className="grid gap-8 md:gap-10"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
        >
          {reviews.map((review) => (
            <motion.article
              key={review.author}
              variants={item}
              className="bg-white/80 backdrop-blur-sm border border-hbf-bluegray/20 rounded-2xl p-6 md:p-8 shadow-sm"
            >
              <header className="mb-6">
                <h3 className="text-xl md:text-2xl font-semibold text-hbf-charcoal">
                  {review.author}
                </h3>
                <p className="text-sm md:text-base text-hbf-charcoal-light">
                  {review.role}
                </p>
              </header>

              <div className="space-y-4">
                {review.content.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-base leading-relaxed text-hbf-charcoal-light"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
