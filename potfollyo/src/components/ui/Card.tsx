import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  hover?: boolean;
  glass?: boolean;
  className?: string;
  id?: string;
}

export function Card({ children, hover = false, glass = false, className = '', id }: CardProps) {
  const base = glass ? 'glass-card' : 'rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/70 shadow-soft';
  return (
    <motion.div
      whileHover={hover ? { y: -4, boxShadow: '0 18px 40px -12px rgba(59,102,255,0.25)' } : undefined}
      transition={{ type: 'spring', stiffness: 240, damping: 22 }}
      className={`${base} p-6 ${className}`}
      id={id}
    >
      {children}
    </motion.div>
  );
}

export default Card;
