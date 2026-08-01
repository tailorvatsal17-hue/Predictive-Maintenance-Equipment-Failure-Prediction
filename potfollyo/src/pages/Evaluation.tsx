import {
  Bar, BarChart, CartesianGrid, Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis,
  Radar, RadarChart, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis, Cell,
} from 'recharts';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import StatCounter from '@/components/ui/StatCounter';
import { useDocumentTitle } from '@/hooks/useInViewOnce';
import { useChartTheme } from '@/hooks/useChartTheme';
import { modelResults, projectMetrics } from '@/data/project';
import { scatterPredVsActual, residuals, radarMetrics } from '@/data/dataset';
import { profile } from '@/data/profile';

const scatterColors: Record<string, string> = { RF: '#22c55e', XGB: '#f97316', NN: '#3b66ff' };

export default function Evaluation() {
  useDocumentTitle('Performance Evaluation — ' + profile.shortName);
  const t = useChartTheme();

  const best = modelResults.find((m) => m.id === 'nn')!;

  return (
    <div className="section">
      <SectionHeading
        eyebrow="Phase 5"
        title="Performance Evaluation"
        subtitle={`The Neural Network wins on every metric. Best R² = ${projectMetrics.bestR2}.`}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
        <StatCounter value={best.mae} decimals={2} label="Best MAE" />
        <StatCounter value={best.rmse} decimals={2} label="Best RMSE" />
        <StatCounter value={best.r2} decimals={3} label="Best R²" />
        <StatCounter value={100} label="Engines evaluated" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-semibold text-lg">MAE / RMSE / R² comparison</h3>
          <div className="h-72 mt-4">
            <ResponsiveContainer>
              <BarChart
                data={modelResults.map((m) => ({ name: m.name, MAE: m.mae, RMSE: m.rmse, R2: m.r2 }))}
                barCategoryGap="22%"
              >
                <CartesianGrid strokeDasharray="3 3" stroke={t.gridStroke} />
                <XAxis dataKey="name" stroke={t.axisColor} fontSize={12} />
                <YAxis stroke={t.axisColor} fontSize={12} />
                <Tooltip contentStyle={{ background: t.tooltipBg, border: `1px solid ${t.tooltipBorder}`, color: t.textColor }} />
                <Legend />
                <Bar dataKey="MAE" fill="#3b66ff" radius={[6, 6, 0, 0]} />
                <Bar dataKey="RMSE" fill="#22d3ee" radius={[6, 6, 0, 0]} />
                <Bar dataKey="R2" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold text-lg">Multi-metric radar</h3>
          <div className="h-72 mt-4">
            <ResponsiveContainer>
              <RadarChart data={radarMetrics}>
                <PolarGrid stroke={t.gridStroke} />
                <PolarAngleAxis dataKey="metric" tick={{ fill: t.axisColor, fontSize: 11 }} />
                <PolarRadiusAxis stroke={t.gridStroke} tick={{ fill: t.axisColor, fontSize: 10 }} angle={30} />
                <Radar name="RF" dataKey="RF" stroke="#22c55e" fill="#22c55e" fillOpacity={0.25} />
                <Radar name="XGB" dataKey="XGB" stroke="#f97316" fill="#f97316" fillOpacity={0.25} />
                <Radar name="NN" dataKey="NN" stroke="#3b66ff" fill="#3b66ff" fillOpacity={0.25} />
                <Legend />
                <Tooltip contentStyle={{ background: t.tooltipBg, border: `1px solid ${t.tooltipBorder}`, color: t.textColor }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold text-lg">Predicted vs Actual</h3>
          <div className="h-72 mt-4">
            <ResponsiveContainer>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke={t.gridStroke} />
                <XAxis type="number" dataKey="actual" name="Actual" stroke={t.axisColor} fontSize={12} domain={[0, 200]} label={{ value: 'Actual RUL', position: 'insideBottom', offset: -5, fill: t.axisColor }} />
                <YAxis type="number" dataKey="predicted" name="Predicted" stroke={t.axisColor} fontSize={12} domain={[0, 200]} label={{ value: 'Predicted RUL', angle: -90, position: 'insideLeft', fill: t.axisColor }} />
                <ZAxis range={[60, 60]} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ background: t.tooltipBg, border: `1px solid ${t.tooltipBorder}`, color: t.textColor }} />
                {['RF', 'XGB', 'NN'].map((model) => (
                  <Scatter key={model} name={model} data={scatterPredVsActual.filter((s) => s.model === model)} fill={scatterColors[model]} />
                ))}
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold text-lg">Residual distribution</h3>
          <div className="h-72 mt-4">
            <ResponsiveContainer>
              <BarChart data={residuals}>
                <CartesianGrid strokeDasharray="3 3" stroke={t.gridStroke} />
                <XAxis dataKey="bin" stroke={t.axisColor} fontSize={12} label={{ value: 'Residual', position: 'insideBottom', offset: -5, fill: t.axisColor }} />
                <YAxis stroke={t.axisColor} fontSize={12} />
                <Tooltip contentStyle={{ background: t.tooltipBg, border: `1px solid ${t.tooltipBorder}`, color: t.textColor }} />
                <Legend />
                <Bar dataKey="rf" name="RF" fill="#22c55e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="xgb" name="XGB" fill="#f97316" radius={[4, 4, 0, 0]} />
                <Bar dataKey="nn" name="NN" fill="#3b66ff" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <SectionHeading eyebrow="Summary" title="One-glance verdict" className="mt-16" />
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modelResults.map((m) => (
            <div key={m.id} className="text-center">
              <p className="text-sm text-slate-500">{m.name}</p>
              <p className="mt-1 text-4xl font-bold" style={{ color: m.color }}>
                {(m.r2 * 100).toFixed(1)}<span className="text-base text-slate-500">% R²</span>
              </p>
              <p className="mt-1 text-xs text-slate-500">MAE {m.mae} · RMSE {m.rmse}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
