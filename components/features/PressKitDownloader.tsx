'use client';

import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

interface PressKitItem {
  title: string;
  type: string;
  href: string;
}

interface PressKitDownloaderProps {
  items: PressKitItem[];
}

export default function PressKitDownloader({ items }: PressKitDownloaderProps) {
  return (
    <div className="space-y-4 mb-8">
      {items.map((item, index) => (
        <motion.a
          key={index}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-4 p-6 bg-hbf-white border-2 border-hbf-charcoal/10 rounded-lg hover:border-hbf-yellow/30 hover:bg-hbf-yellow/5 transition-all duration-300 no-underline cursor-pointer"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <FaCheckCircle className="text-2xl text-hbf-yellow flex-shrink-0 mt-1" />
          <div>
            <h4 className="text-lg font-bold text-hbf-charcoal mb-1">
              {item.title}
            </h4>
            <p className="text-sm text-hbf-charcoal-light">{item.type}</p>
          </div>
        </motion.a>
      ))}
    </div>
  );
}
