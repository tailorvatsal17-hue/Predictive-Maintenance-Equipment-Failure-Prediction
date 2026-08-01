import { Wrench, AlertTriangle, CheckCircle2, Clock, ShieldAlert } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { useDocumentTitle } from '@/hooks/useInViewOnce';
import { maintenanceBuckets } from '@/data/project';
import { profile } from '@/data/profile';

const icons = [CheckCircle2, Clock, Wrench, ShieldAlert];

export default function Maintenance() {
  useDocumentTitle('Maintenance — ' + profile.shortName);
  return (
    <div className="section">
      <SectionHeading
        eyebrow="Phase 6"
        title="Maintenance Recommendation Framework"
        subtitle="Predicted RUL is mapped to a four-tier decision matrix. Engineers see a clear action — not just a number."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {maintenanceBuckets.map((b, idx) => {
          const Icon = icons[idx];
          return (
            <Card key={b.id} hover className="h-full relative overflow-hidden">
              <div
                className="absolute inset-x-0 top-0 h-1"
                style={{ backgroundColor: b.color }}
                aria-hidden
              />
              <span
                className="grid h-12 w-12 place-items-center rounded-xl text-white"
                style={{ backgroundColor: b.color }}
              >
                <Icon className="h-6 w-6" />
              </span>
              <Badge tone={b.priority === 'low' ? 'success' : b.priority === 'medium' ? 'warning' : b.priority === 'high' ? 'warning' : 'danger'} className="mt-4">
                {b.priority.toUpperCase()} PRIORITY
              </Badge>
              <h3 className="mt-3 font-semibold text-lg">{b.label}</h3>
              <p className="mt-1 text-xs font-mono text-slate-500">{b.range}</p>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">{b.recommendation}</p>
            </Card>
          );
        })}
      </div>

      <SectionHeading eyebrow="Decision flow" title="How a prediction becomes an action" className="mt-16" />
      <Card>
        <ol className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { step: '1', title: 'Collect', desc: 'Latest sensor stream from the engine.' },
            { step: '2', title: 'Engineer', desc: 'Apply the 212-feature pipeline in real-time.' },
            { step: '3', title: 'Predict', desc: 'Feed features into the trained regressors.' },
            { step: '4', title: 'Act', desc: 'Bucket the predicted RUL and dispatch the action.' },
          ].map((s) => (
            <li key={s.step} className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-slate-50/50 dark:bg-slate-900/40">
              <span className="text-3xl font-bold gradient-text">{s.step}</span>
              <p className="mt-2 font-semibold">{s.title}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">{s.desc}</p>
            </li>
          ))}
        </ol>
      </Card>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          <h3 className="mt-3 font-semibold">Why thresholds matter</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Standard 120-cycle cap on RUL is widely used in C-MAPSS benchmarks because engines show
            little degradation in early life. Predicting RUL beyond this point adds little value for
            scheduling.
          </p>
        </Card>
        <Card>
          <Wrench className="h-5 w-5 text-brand-500" />
          <h3 className="mt-3 font-semibold">Operator dashboard</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Engineers see a colour-coded status per engine. Drill-down reveals per-sensor contributions
            and confidence intervals from the model ensemble.
          </p>
        </Card>
        <Card>
          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
          <h3 className="mt-3 font-semibold">Outcome targets</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Reduce unplanned downtime by 30%, extend mean-time-between-overhaul by 15%, and cut
            maintenance cost by 20% through better planning.
          </p>
        </Card>
      </div>
    </div>
  );
}
