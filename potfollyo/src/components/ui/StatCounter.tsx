import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

interface StatCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  label: string;
}

export default function StatCounter({ value, suffix, prefix, decimals = 0, duration = 2.2, label }: StatCounterProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  return (
    <div ref={ref} className="flex flex-col">
      <span className="text-3xl sm:text-4xl font-bold font-display tracking-tight gradient-text">
        {inView ? (
          <CountUp end={value} duration={duration} decimals={decimals} prefix={prefix} suffix={suffix} />
        ) : (
          `${prefix ?? ''}0${suffix ?? ''}`
        )}
      </span>
      <span className="mt-1 text-sm text-slate-600 dark:text-slate-400">{label}</span>
    </div>
  );
}
