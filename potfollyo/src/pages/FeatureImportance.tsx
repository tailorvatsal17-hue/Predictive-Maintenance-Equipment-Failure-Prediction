import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from 'recharts';
import { useState } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import { useDocumentTitle } from '@/hooks/useInViewOnce';
import { useChartTheme } from '@/hooks/useChartTheme';
import { topFeaturesRF, topFeaturesXGB, topFeaturesNN } from '@/data/dataset';
import { profile } from '@/data/profile';

const tabs = [
  { id: 'rf', label: 'Random Forest', color: '#22c55e', data: topFeaturesRF },
  { id: 'xgb', label: 'XGBoost', color: '#f97316', data: topFeaturesXGB },
  { id: 'nn', label: 'Neural Network', color: '#3b66ff', data: topFeaturesNN },
] as const;

export default function FeatureImportance() {
  useDocumentTitle('Feature Importance — ' + profile.shortName);
  const t = useChartTheme();
  const [active, setActive] = useState<(typeof tabs)[number]['id']>('nn');
  const current = tabs.find((tab) => tab.id === active)!;
  const data = [...current.data].sort((a, b) => a.importance - b.importance);

  return (
    <div className="section">
      <SectionHeading
        eyebrow="Phase 6"
        title="Top features that drive RUL prediction"
        subtitle="Different models value different signals. Sensor 11 (physical fan speed) and rolling statistics dominate every ranking."
      />

      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActive(tab.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
              active === tab.id
                ? 'bg-brand-500 text-white border-brand-500'
                : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            style={active === tab.id ? { backgroundColor: tab.color, borderColor: tab.color } : {}}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <Card>
        <div className="h-[480px]">
          <ResponsiveContainer>
            <BarChart data={data} layout="vertical" margin={{ top: 12, right: 32, left: 8, bottom: 12 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={t.gridStroke} horizontal={false} />
              <XAxis type="number" stroke={t.axisColor} fontSize={12} domain={[0, 0.1]} />
              <YAxis type="category" dataKey="feature" stroke={t.axisColor} fontSize={11} width={170} />
              <Tooltip
                contentStyle={{ background: t.tooltipBg, border: `1px solid ${t.tooltipBorder}`, color: t.textColor }}
                formatter={(v: number) => [v.toFixed(3), 'Importance']}
              />
              <Bar dataKey="importance" radius={[0, 6, 6, 0]}>
                {data.map((_, i) => (
                  <Cell key={i} fill={current.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <SectionHeading eyebrow="Cross-model" title="Consensus features" className="mt-12" />
      <Card className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-widest text-slate-500 border-b border-slate-200 dark:border-slate-800">
              <th className="py-3 pr-4">Feature</th>
              <th className="py-3 pr-4">RF</th>
              <th className="py-3 pr-4">XGB</th>
              <th className="py-3">NN</th>
            </tr>
          </thead>
          <tbody>
            {topFeaturesRF.map((rf, i) => (
              <tr key={rf.feature} className="border-b border-slate-100 dark:border-slate-800/60">
                <td className="py-2 pr-4 font-medium">{rf.feature}</td>
                <td className="py-2 pr-4 font-mono">{rf.importance.toFixed(3)}</td>
                <td className="py-2 pr-4 font-mono">{topFeaturesXGB[i]?.importance.toFixed(3) ?? '—'}</td>
                <td className="py-2 font-mono">{topFeaturesNN[i]?.importance.toFixed(3) ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
