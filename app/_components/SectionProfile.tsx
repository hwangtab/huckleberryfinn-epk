'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Heading from '@/components/ui/Heading';
import { members } from '@/app/data/members';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

export default function SectionProfile() {
  return (
    <section className="bg-hbf-charcoal py-16 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Band Photo */}
        <motion.div
          className="mb-16 rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/images/profile/허클베리핀 3.webp"
            alt="Huckleberryfinn band photo"
            width={1200}
            height={675}
            className="w-full h-auto object-cover aspect-video"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 100%"
          />
        </motion.div>

        {/* Band Title and Description */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex justify-center mb-4">
            <Image
              src="/images/logo/white_logo.png"
              alt="Huckleberryfinn"
              width={300}
              height={80}
              className="h-auto"
            />
          </div>
          <p className="text-lg text-hbf-white leading-relaxed max-w-2xl mx-auto">
            한국 인디 1세대 밴드, 허클베리핀.
            <br />
            1997년부터 지금까지 서정적 록 사운드로 독보적인 음악 세계를 만들어왔습니다.
          </p>
        </motion.div>

        {/* Members Grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {members.map((member) => (
            <motion.div
              key={member.name}
              className="text-center"
              variants={itemVariants}
            >
              {/* Profile Image */}
              <motion.div
                className="mb-6 flex justify-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-hbf-yellow">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="160px"
                  />
                </div>
              </motion.div>

              {/* Member Info */}
              <h3 className="text-2xl font-bold text-hbf-white mb-2">
                {member.name}
              </h3>
              <p className="text-hbf-yellow font-semibold">
                {member.role}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
