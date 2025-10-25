'use client';

import { motion, Variants } from 'framer-motion';
import Heading from '@/components/ui/Heading';
import { producerNotes } from '@/app/data/producerNotes';

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

export default function SectionProducerNote() {
  return (
    <section className="bg-hbf-white py-16 md:py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <Heading level="h2" className="text-hbf-charcoal mb-4">
            Producer&apos;s Note
          </Heading>
          <p className="text-lg text-hbf-charcoal-light">
            24년 만의 재녹음, 그 여정의 기록
          </p>
        </motion.div>

        {/* Producer Notes */}
        <motion.div
          className="space-y-12"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {producerNotes.map((note, index) => (
            <motion.article
              key={note.author}
              variants={item}
              className={`p-6 md:p-8 border-l-4 rounded-r-lg ${
                index === 0
                  ? 'border-hbf-yellow bg-hbf-yellow/5'
                  : 'border-hbf-charcoal bg-hbf-charcoal/5'
              }`}
            >
              {/* Author Header */}
              <header className="mb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-hbf-charcoal mb-2">
                  {note.author}
                </h3>
                <p className="text-sm text-hbf-charcoal-light">
                  {note.role}
                </p>
              </header>

              {/* Content */}
              <div className="space-y-4">
                {note.content.map((paragraph, pIndex) => (
                  <p
                    key={pIndex}
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
