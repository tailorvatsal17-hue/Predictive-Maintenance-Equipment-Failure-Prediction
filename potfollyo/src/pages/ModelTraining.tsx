import { Trees, Zap, Brain } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import { useDocumentTitle } from '@/hooks/useInViewOnce';
import { modelResults } from '@/data/project';
import { profile } from '@/data/profile';

const iconMap = { rf: Trees, xgb: Zap, nn: Brain };

export default function ModelTraining() {
  useDocumentTitle('Model Training — ' + profile.shortName);
  return (
    <div className="section">
      <SectionHeading
        eyebrow="Phase 3"
        title="Three regressors, one benchmark"
        subtitle="Each model is trained on the engineered training set. We compare them on the held-out test set with MAE, RMSE, and R²."
      />
      <div className="space-y-6">
        {modelResults.map((m, idx) => {
          const Icon = iconMap[m.id as keyof typeof iconMap];
          return (
            <Card key={m.id} hover className="relative overflow-hidden">
              <div
                className="absolute inset-x-0 top-0 h-1"
                style={{ background: `linear-gradient(90deg, ${m.color}, ${m.color}80)` }}
                aria-hidden
              />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-3">
                    <span
                      className="grid h-11 w-11 place-items-center rounded-xl text-white"
                      style={{ backgroundColor: m.color }}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h2 className="font-semibold text-xl">{m.name}</h2>
                      <p className="text-xs text-slate-500 font-mono">{m.algorithm}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">{m.description}</p>

                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                        Advantages
                      </h3>
                      <ul className="mt-2 text-sm text-slate-600 dark:text-slate-400 list-disc pl-5 space-y-1">
                        {m.advantages.map((a) => <li key={a}>{a}</li>)}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-widest text-rose-600 dark:text-rose-400">
                        Limitations
                      </h3>
                      <ul className="mt-2 text-sm text-slate-600 dark:text-slate-400 list-disc pl-5 space-y-1">
                        {m.limitations.map((l) => <li key={l}>{l}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3">
                      <p className="text-xs text-slate-500">MAE</p>
                      <p className="text-lg font-semibold">{m.mae}</p>
                    </div>
                    <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3">
                      <p className="text-xs text-slate-500">RMSE</p>
                      <p className="text-lg font-semibold">{m.rmse}</p>
                    </div>
                    <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3">
                      <p className="text-xs text-slate-500">R²</p>
                      <p className="text-lg font-semibold">{m.r2}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
                      Hyperparameters
                    </h3>
                    <dl className="text-sm divide-y divide-slate-100 dark:divide-slate-800">
                      {m.hyperparameters.map((hp) => (
                        <div key={hp.label} className="flex justify-between py-1.5">
                          <dt className="text-slate-500">{hp.label}</dt>
                          <dd className="font-mono text-slate-700 dark:text-slate-300">{hp.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <p className="text-xs text-slate-500">
                    Training time · <span className="font-medium text-slate-700 dark:text-slate-300">{m.trainingTime}</span>
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
