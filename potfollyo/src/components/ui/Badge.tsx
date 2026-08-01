import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  tone?: 'brand' | 'success' | 'warning' | 'danger' | 'neutral';
  className?: string;
}

const tones: Record<NonNullable<BadgeProps['tone']>, string> = {
  brand: 'bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 border-brand-200/60 dark:border-brand-800/60',
  success: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200/60 dark:border-emerald-800/60',
  warning: 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200/60 dark:border-amber-800/60',
  danger: 'bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 border-rose-200/60 dark:border-rose-800/60',
  neutral: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700',
};

export default function Badge({ children, tone = 'brand', className = '' }: BadgeProps) {
  return <span className={`badge ${tones[tone]} ${className}`}>{children}</span>;
}
