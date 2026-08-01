import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeading({ eyebrow, title, subtitle, align = 'left', className = '' }: SectionHeadingProps) {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left';
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col ${alignment} max-w-3xl mb-12 ${className}`}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-brand-600 dark:text-brand-400 mb-3">
          <span className="h-px w-6 bg-brand-500" /> {eyebrow}
        </span>
      )}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </motion.div>
  );
}
