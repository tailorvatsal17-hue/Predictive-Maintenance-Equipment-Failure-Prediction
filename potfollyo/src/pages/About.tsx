import { Lightbulb, Target, Wrench, Building2, Rocket } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import { useDocumentTitle } from '@/hooks/useInViewOnce';
import { objectives } from '@/data/research';
import { profile } from '@/data/profile';

export default function About() {
  useDocumentTitle('About the Project — ' + profile.shortName);
  return (
    <div className="section">
      <SectionHeading
        eyebrow="Background"
        title="Why predict engine failure?"
        subtitle="Reactive maintenance is expensive. Predictive maintenance prevents unplanned downtime, reduces maintenance cost, and extends asset life."
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
        <Card>
          <Lightbulb className="h-6 w-6 text-brand-500" />
          <h3 className="mt-4 font-semibold text-lg">Motivation</h3>
          <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm">
            A single unscheduled engine failure in commercial aviation costs operators millions of dollars in
            direct repair, grounded aircraft, and disrupted schedules. Even in industrial turbo-machinery,
            unplanned downtime accounts for the largest share of lifecycle cost. Predictive maintenance
            addresses this by anticipating failure from sensor telemetry.
          </p>
        </Card>
        <Card>
          <Target className="h-6 w-6 text-brand-500" />
          <h3 className="mt-4 font-semibold text-lg">Problem Statement</h3>
          <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm">
            Can multivariate sensor streams from a turbofan engine be used to forecast Remaining Useful Life
            (RUL) accurately enough to drive maintenance scheduling? This study benchmarks three regressors —
            Random Forest, XGBoost, and a multi-layer perceptron — against the NASA C-MAPSS FD001 benchmark.
          </p>
        </Card>
        <Card>
          <Building2 className="h-6 w-6 text-brand-500" />
          <h3 className="mt-4 font-semibold text-lg">Industrial Applications</h3>
          <ul className="mt-2 text-slate-600 dark:text-slate-400 text-sm space-y-1 list-disc pl-5">
            <li>Aerospace engine health monitoring</li>
            <li>Power-generation turbine maintenance</li>
            <li>Manufacturing rotating-equipment reliability</li>
            <li>Marine propulsion systems</li>
          </ul>
        </Card>
        <Card>
          <Rocket className="h-6 w-6 text-brand-500" />
          <h3 className="mt-4 font-semibold text-lg">Expected Impact</h3>
          <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm">
            A reliable RUL estimator enables condition-based maintenance: schedule inspections only when
            indicated, optimise spare-parts inventory, and avoid both catastrophic failure and wasteful
            preventive replacement.
          </p>
        </Card>
      </div>

      <SectionHeading
        eyebrow="Objectives"
        title="What this dissertation sets out to do"
      />
      <ol className="space-y-3 max-w-3xl">
        {objectives.map((o, i) => (
          <li key={i}>
            <Card hover className="flex items-start gap-4">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full gradient-bg text-white font-semibold">
                {i + 1}
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300">{o}</p>
            </Card>
          </li>
        ))}
      </ol>
    </div>
  );
}
