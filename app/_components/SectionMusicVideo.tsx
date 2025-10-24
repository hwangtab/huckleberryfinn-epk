'use client';

import { motion, Variants } from 'framer-motion';
import Heading from '@/components/ui/Heading';
import { musicVideos } from '@/app/data/musicVideos';

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
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

export default function SectionMusicVideo() {
  // Filter out videos without videoId
  const availableVideos = musicVideos.filter(video => video.videoId !== null);

  // If no videos are available, don't render the section
  if (availableVideos.length === 0) {
    return null;
  }

  return (
    <section className="bg-hbf-charcoal text-hbf-white py-16 md:py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <Heading level="h2" className="text-hbf-white mb-4">
            Music Video
          </Heading>
        </motion.div>

        {/* Videos Container */}
        <motion.div
          className="space-y-12 md:space-y-16"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {availableVideos.map((video) => (
            <motion.div
              key={video.title}
              variants={item}
              className="flex flex-col gap-4"
            >
              {/* Video Title */}
              <h3 className="text-2xl md:text-3xl font-watermelon text-hbf-yellow">
                {video.title}
              </h3>

              {/* YouTube Embed */}
              <div className="w-full aspect-video rounded-lg overflow-hidden shadow-2xl bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${video.videoId}?rel=0`}
                  title={`${video.title} Official Music Video`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
