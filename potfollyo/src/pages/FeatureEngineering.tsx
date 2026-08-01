import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Layers, History, Activity, Sigma, Filter } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import StatCounter from '@/components/ui/StatCounter';
import { useDocumentTitle } from '@/hooks/useInViewOnce';
import { profile } from '@/data/profile';

const operations = [
  { icon: TrendingUp, title: 'Rolling Mean', desc: '3 / 5 / 10-cycle moving averages capture local trend in each sensor.', window: '3, 5, 10' },
  { icon: Activity, title: 'Rolling Std', desc: 'Same windows for rolling standard deviation — flags instability.', window: '3, 5, 10' },
  { icon: History, title: 'Lag Features', desc: 't-1, t-2, t-3, t-5 sensor values — the past 5 cycles of context.', window: '1, 2, 3, 5' },
  { icon: Sigma, title: 'Delta', desc: 'Cycle-to-cycle change — how much a sensor moved in one step.', window: 'diff t-1' },
  { icon: Layers, title: 'Cumulative', desc: 'Running totals — captures long-term drift in operating conditions.', window: 'cumsum' },
];

const pipelineStages = [
  { label: 'Raw', count: 21, color: '#94a3b8' },
  { label: 'Rolling', count: 126, color: '#3b66ff' },
  { label: 'Lag', count: 84, color: '#22d3ee' },
  { label: 'Delta', count: 21, color: '#f59e0b' },
  { label: 'Cumulative', count: 21, color: '#10b981' },
  { label: 'Final', count: 212, color: '#ec4899' },
];

export default function FeatureEngineering() {
  useDocumentTitle('Feature Engineering — ' + profile.shortName);
  return (
    <div className="section">
      <SectionHeading
        eyebrow="Phase 2"
        title="From 21 sensors to 212 engineered features"
        subtitle="Raw instantaneous readings become temporal trajectories. The model sees trends, lags, and cumulative drift — not just single-cycle snapshots."
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
        <StatCounter value={21} label="Raw sensors" />
        <StatCounter value={212} label="Engineered features" />
        <StatCounter value={5} label="Operation families" />
        <StatCounter value={9.1} decimals={1} suffix="×" label="Expansion factor" />
      </div>

      <SectionHeading eyebrow="Pipeline" title="Feature construction stages" />
      <Card className="overflow-x-auto">
        <div className="flex items-end gap-3 min-w-[640px] py-6 px-2">
          {pipelineStages.map((stage, i) => (
            <div key={stage.label} className="flex items-end gap-3 flex-1">
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                whileInView={{ height: 60 + (stage.count / 212) * 100, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 rounded-t-lg flex flex-col items-center justify-end text-white text-xs font-semibold pb-2"
                style={{ background: `linear-gradient(180deg, ${stage.color}, ${stage.color}aa)` }}
              >
                <span className="text-lg font-bold">{stage.count}</span>
                <span>{stage.label}</span>
              </motion.div>
              {i < pipelineStages.length - 1 && (
                <ArrowRight className="h-4 w-4 text-slate-400 shrink-0 mb-6" />
              )}
            </div>
          ))}
        </div>
      </Card>

      <SectionHeading eyebrow="Operations" title="What each family of features does" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {operations.map((op, idx) => (
          <motion.div
            key={op.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
          >
            <Card hover className="h-full">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400">
                <op.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-semibold text-lg">{op.title}</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{op.desc}</p>
              <p className="mt-3 text-xs font-mono text-slate-500">window: {op.window}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <SectionHeading eyebrow="Selection" title="From 212 to a stable feature subset" />
      <Card>
        <div className="flex items-start gap-3">
          <Filter className="h-5 w-5 text-brand-500 mt-0.5" />
          <div>
            <h3 className="font-semibold text-lg">Correlation-based pruning</h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Pairs of features with |r| &gt; 0.95 are deduplicated. Combined with model-driven
              importance (Random Forest, XGBoost, NN), this yields a stable subset used during training.
              The full 212-feature set is preserved for model training; importance-based filtering is
              applied per-model.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
