import { ReactNode } from 'react';

interface HeadingProps {
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: ReactNode;
  className?: string;
}

export default function Heading({
  level = 'h2',
  children,
  className = ''
}: HeadingProps) {
  const Tag = level;

  const baseStyles = 'font-bold tracking-tight font-headline';

  const sizeStyles = {
    h1: 'text-4xl md:text-5xl lg:text-6xl',
    h2: 'text-3xl md:text-4xl lg:text-5xl',
    h3: 'text-2xl md:text-3xl lg:text-4xl',
    h4: 'text-lg md:text-2xl lg:text-3xl',
    h5: 'text-base md:text-lg lg:text-xl',
    h6: 'text-sm md:text-base lg:text-lg',
  };

  return (
    <Tag className={`${baseStyles} ${sizeStyles[level]} ${className}`}>
      {children}
    </Tag>
  );
}
