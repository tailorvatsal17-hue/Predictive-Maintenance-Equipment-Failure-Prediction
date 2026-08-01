import { CheckCircle2, Database, Filter, Scaling, AlertTriangle, Sparkles, Trash2 } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { useDocumentTitle } from '@/hooks/useInViewOnce';
import { profile } from '@/data/profile';

const steps = [
  { id: 1, icon: Database, title: 'Load & Column Naming', desc: 'Read three space-separated .txt files and assign meaningful column names (Unit_Number, Time_Cycles, Op_Settings, Sensor_1…21, RUL).' },
  { id: 2, icon: CheckCircle2, title: 'Missing-Value Audit', desc: '0% missing in both training and test sets — NASA C-MAPSS is a clean release.' },
  { id: 3, icon: Filter, title: 'Duplicate Detection', desc: '0 duplicate rows. Engines and cycles are unique identifiers.' },
  { id: 4, icon: Sparkles, title: 'Constant Column Detection', desc: 'Six sensors (Sensor_1, 5, 10, 16, 18, 19) carry zero variance. Kept — they preserve column shape for downstream tools.' },
  { id: 5, icon: AlertTriangle, title: 'Outlier Detection', desc: 'IQR, Z-score, and Modified-Z (MAD) all run on every sensor. Decision: retain all outliers — they represent real degradation phases.' },
  { id: 6, icon: Trash2, title: 'Column Removal', desc: 'Unit_Number, Time_Cycles, and 3 Op_Settings dropped before scaling. Kept the 21 sensor columns.' },
  { id: 7, icon: Scaling, title: 'Robust Scaling', desc: 'RobustScaler (median/IQR) instead of StandardScaler — resistant to outliers and yields zero-mean unit-IQR features.' },
];

export default function Preprocessing() {
  useDocumentTitle('Preprocessing — ' + profile.shortName);
  return (
    <div className="section">
      <SectionHeading
        eyebrow="Phase 1"
        title="Cleaning & Preprocessing"
        subtitle="Every transformation is auditable. The raw .txt files become a single scaled numeric matrix ready for feature engineering."
      />

      <div className="relative">
        <div className="absolute left-7 top-0 bottom-0 w-px bg-gradient-to-b from-brand-500/50 via-accent-400/30 to-transparent hidden sm:block" aria-hidden />
        <ol className="space-y-4">
          {steps.map((s, i) => (
            <li key={s.id} className="relative">
              <div className="flex items-start gap-4">
                <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
                  <s.icon className="h-6 w-6 text-brand-500" />
                  <span className="absolute -top-2 -right-2 grid h-6 w-6 place-items-center rounded-full gradient-bg text-[11px] font-bold text-white">
                    {i + 1}
                  </span>
                </span>
                <Card hover className="flex-1">
                  <h3 className="font-semibold text-lg">{s.title}</h3>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{s.desc}</p>
                </Card>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <h3 className="font-semibold text-lg">Input</h3>
          <ul className="mt-3 text-sm text-slate-600 dark:text-slate-400 space-y-1 list-disc pl-5">
            <li>train_FD001.txt — 20,631 rows × 26 cols</li>
            <li>test_FD001.txt — 13,096 rows × 26 cols</li>
            <li>RUL_FD001.txt — 100 rows × 1 col (test ground truth)</li>
          </ul>
        </Card>
        <Card>
          <h3 className="font-semibold text-lg">Output</h3>
          <ul className="mt-3 text-sm text-slate-600 dark:text-slate-400 space-y-1 list-disc pl-5">
            <li>train_FD001_scaled.csv · test_FD001_scaled.csv (21 sensors)</li>
            <li>train_FD001_reference.csv · test_FD001_reference.csv</li>
            <li>robust_scaler.pkl · preprocessing_metadata.json</li>
          </ul>
          <Badge tone="success" className="mt-4">Ready for feature engineering</Badge>
        </Card>
      </div>
    </div>
  );
}
