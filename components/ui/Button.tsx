'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  href?: string;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function Button({
  variant = 'primary',
  href,
  children,
  onClick,
  className = ''
}: ButtonProps) {
  const baseStyles = 'px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 inline-block';

  const variantStyles = {
    primary: 'bg-hbf-charcoal text-hbf-white hover:bg-hbf-charcoal-light',
    secondary: 'border-2 border-hbf-charcoal text-hbf-charcoal hover:bg-hbf-charcoal hover:text-hbf-white',
  };

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        className={combinedStyles}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={combinedStyles}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}
