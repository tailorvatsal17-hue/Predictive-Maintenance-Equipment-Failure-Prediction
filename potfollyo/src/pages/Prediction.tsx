import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, AlertTriangle, Gauge as GaugeIcon } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { useDocumentTitle } from '@/hooks/useInViewOnce';
import { samplePredictions } from '@/data/dataset';
import { modelResults, maintenanceBuckets } from '@/data/project';
import { getMaintenanceBucket } from '@/lib/format';
import { profile } from '@/data/profile';

export default function Prediction() {
  useDocumentTitle('RUL Prediction — ' + profile.shortName);
  const engineIds = samplePredictions.map((p) => p.engine);
  const [engineId, setEngineId] = useState<number>(engineIds[0]);
  const row = useMemo(() => samplePredictions.find((p) => p.engine === engineId)!, [engineId]);

  const nnPrediction = row.nn;
  const bucket = getMaintenanceBucket(nnPrediction);

  return (
    <div className="section">
      <SectionHeading
        eyebrow="Interactive"
        title="RUL Prediction Dashboard"
        subtitle="Pick a test engine and see how each of the three regressors forecasts Remaining Useful Life against ground truth."
      />

      <Card className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <div className="flex-1">
            <label htmlFor="engine-select" className="block text-xs font-semibold tracking-widest uppercase text-slate-500 mb-2">
              Test Engine
            </label>
            <select
              id="engine-select"
              value={engineId}
              onChange={(e) => setEngineId(Number(e.target.value))}
              className="w-full sm:w-64 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm font-medium focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30"
            >
              {engineIds.map((id) => (
                <option key={id} value={id}>Engine #{id}</option>
              ))}
            </select>
          </div>
          <div className="flex-1 grid grid-cols-3 gap-3">
            {modelResults.map((m) => {
              const value = (row as any)[m.id] as number;
              return (
                <div key={m.id} className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3 text-center">
                  <p className="text-xs text-slate-500">{m.name}</p>
                  <p className="text-xl font-bold" style={{ color: m.color }}>{value}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">cycles remaining</p>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="relative overflow-hidden">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <GaugeIcon className="h-5 w-5 text-brand-500" /> Predicted RUL — Neural Network
          </h3>
          <GaugeChart value={nnPrediction} max={200} color={modelResults[2].color} />
          <div className="mt-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500">Actual RUL</p>
              <p className="text-2xl font-bold">{row.actual}</p>
            </div>
            <Badge tone={bucket.id === 'healthy' ? 'success' : bucket.id === 'schedule' ? 'warning' : bucket.id === 'required' ? 'warning' : 'danger'}>
              {bucket.label}
            </Badge>
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Activity className="h-5 w-5 text-brand-500" /> Model Comparison
          </h3>
          <div className="mt-4 space-y-3">
            <BarRow label="Random Forest" value={row.rf} actual={row.actual} color={modelResults[0].color} />
            <BarRow label="XGBoost" value={row.xgb} actual={row.actual} color={modelResults[1].color} />
            <BarRow label="Neural Network" value={row.nn} actual={row.actual} color={modelResults[2].color} />
          </div>

          <div className="mt-6">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
              Error vs ground truth
            </h4>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 text-xs">
                  <th className="py-2">Model</th>
                  <th className="py-2">Predicted</th>
                  <th className="py-2">Actual</th>
                  <th className="py-2">|Error|</th>
                </tr>
              </thead>
              <tbody>
                {modelResults.map((m) => {
                  const v = (row as any)[m.id] as number;
                  return (
                    <tr key={m.id} className="border-t border-slate-100 dark:border-slate-800">
                      <td className="py-2 font-medium" style={{ color: m.color }}>{m.name}</td>
                      <td className="py-2">{v}</td>
                      <td className="py-2">{row.actual}</td>
                      <td className="py-2 font-mono">{Math.abs(v - row.actual).toFixed(1)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <SectionHeading eyebrow="Decision" title="Maintenance recommendation" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {maintenanceBuckets.map((b, idx) => (
          <motion.div
            key={b.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
          >
            <Card hover className="h-full">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: b.color }} />
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">{b.range}</span>
              </div>
              <h3 className="mt-2 font-semibold">{b.label}</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{b.recommendation}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function BarRow({ label, value, actual, color }: { label: string; value: number; actual: number; color: string }) {
  const pct = Math.min(100, (value / 200) * 100);
  const actualPct = Math.min(100, (actual / 200) * 100);
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="font-mono">{value}</span>
      </div>
      <div className="mt-1 relative h-3 rounded-full bg-slate-100 dark:bg-slate-800">
        <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${pct}%`, background: color }} />
        <div
          className="absolute -top-1 h-5 w-0.5 bg-slate-700 dark:bg-slate-200"
          style={{ left: `${actualPct}%` }}
          title={`Actual ${actual}`}
        />
      </div>
    </div>
  );
}

function GaugeChart({ value, max, color }: { value: number; max: number; color: string }) {
  const radius = 70;
  const cx = 110;
  const cy = 90;
  const startAngle = -200;
  const endAngle = 20;
  const sweep = endAngle - startAngle;
  const angle = startAngle + (value / max) * sweep;

  const polar = (angleDeg: number, r = radius) => {
    const a = (angleDeg * Math.PI) / 180;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  };

  const arcPath = describeArc(cx, cy, radius, startAngle, endAngle);

  return (
    <svg viewBox="0 0 220 170" className="w-full h-56 mt-2" preserveAspectRatio="xMidYMid meet">
      <path d={arcPath} stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeWidth={14} fill="none" strokeLinecap="round" />
      <motion.path
        d={arcPath}
        stroke={color}
        strokeWidth={14}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={420}
        initial={{ strokeDashoffset: 420 }}
        animate={{ strokeDashoffset: 420 - (value / max) * 420 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      />
      <line x1={cx} y1={cy} x2={polar(angle, radius - 18).x} y2={polar(angle, radius - 18).y} stroke={color} strokeWidth={3} strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={5} fill={color} />
      <text
        x={cx}
        y={cy + 30}
        textAnchor="middle"
        fontSize={32}
        fontWeight={700}
        fill="currentColor"
        dominantBaseline="middle"
      >
        {value}
      </text>
      <text
        x={cx}
        y={cy + 54}
        textAnchor="middle"
        fontSize={11}
        fill="currentColor"
        opacity={0.6}
        dominantBaseline="middle"
      >
        cycles remaining
      </text>
    </svg>
  );
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const a = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
}
