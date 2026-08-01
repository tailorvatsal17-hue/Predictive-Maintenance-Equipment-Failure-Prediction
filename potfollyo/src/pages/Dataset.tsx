import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import StatCounter from '@/components/ui/StatCounter';
import { datasetStats } from '@/data/project';
import { opSettings, sensors, rulHistogram, correlationMatrix, correlationSensors } from '@/data/dataset';
import { useChartTheme } from '@/hooks/useChartTheme';
import { useDocumentTitle } from '@/hooks/useInViewOnce';
import { profile } from '@/data/profile';

export default function Dataset() {
  useDocumentTitle('NASA Dataset — ' + profile.shortName);
  const t = useChartTheme();
  const heatmapCols = correlationSensors.length;
  const cellSize = 28;
  return (
    <div className="section">
      <SectionHeading
        eyebrow="Dataset"
        title="NASA C-MAPSS FD001"
        subtitle="A public benchmark for turbofan engine degradation. Run-to-failure trajectories from 100 training engines plus 100 partial-trajectory test engines."
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
        <StatCounter value={datasetStats.trainingEngines} label="Training engines" />
        <StatCounter value={datasetStats.testEngines} label="Test engines" />
        <StatCounter value={datasetStats.trainingCycles} label="Total cycles" />
        <StatCounter value={datasetStats.sensors} label="Sensors per engine" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        <Card>
          <h3 className="font-semibold text-lg">Training set</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Engines run to failure under a single operating condition. Each row contains 26 columns: unit
            number, time cycle, 3 operational settings, and 21 sensor readings.
          </p>
          <p className="mt-3 text-xs text-slate-500 font-mono">{datasetStats.trainingFile}</p>
        </Card>
        <Card>
          <h3 className="font-semibold text-lg">Test set</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Engines truncated before failure. Ground-truth Remaining Useful Life is supplied separately
            for evaluation.
          </p>
          <p className="mt-3 text-xs text-slate-500 font-mono">{datasetStats.testFile}</p>
        </Card>
        <Card>
          <h3 className="font-semibold text-lg">Ground-truth RUL</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            One RUL value per test engine — the cycles remaining after the final recorded time step.
          </p>
          <p className="mt-3 text-xs text-slate-500 font-mono">{datasetStats.rulFile}</p>
        </Card>
      </div>

      <SectionHeading eyebrow="Distribution" title="RUL ground-truth distribution" />
      <Card className="mb-12">
        <div className="h-72">
          <ResponsiveContainer>
            <BarChart data={rulHistogram}>
              <CartesianGrid strokeDasharray="3 3" stroke={t.gridStroke} />
              <XAxis dataKey="bucket" stroke={t.axisColor} fontSize={12} />
              <YAxis stroke={t.axisColor} fontSize={12} />
              <Tooltip contentStyle={{ background: t.tooltipBg, border: `1px solid ${t.tooltipBorder}`, color: t.textColor }} />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {rulHistogram.map((_, i) => (
                  <Cell key={i} fill={`hsl(${220 + i * 8}, 90%, 60%)`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-slate-500 mt-3">
          RUL range: {datasetStats.minRUL}–{datasetStats.maxRUL} cycles · mean {datasetStats.meanRUL} · median {datasetStats.medianRUL}
        </p>
      </Card>

      <SectionHeading eyebrow="Operating conditions" title="Single-condition subset FD001" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        {opSettings.map((op) => (
          <Card key={op.id}>
            <p className="text-xs font-semibold tracking-widest uppercase text-slate-500">{op.label}</p>
            <p className="mt-2 text-2xl font-display font-bold gradient-text">{op.value}</p>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">{op.description}</p>
          </Card>
        ))}
      </div>

      <SectionHeading eyebrow="Sensors" title="Representative sensor statistics" />
      <Card className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b border-slate-200 dark:border-slate-800">
              <th className="py-2 pr-4">Sensor</th>
              <th className="py-2 pr-4">Mean</th>
              <th className="py-2 pr-4">Std</th>
              <th className="py-2 pr-4">Min</th>
              <th className="py-2 pr-4">Max</th>
              <th className="py-2 pr-4">Unit</th>
              <th className="py-2">Trend</th>
            </tr>
          </thead>
          <tbody>
            {sensors.map((s) => (
              <tr key={s.id} className="border-b border-slate-100 dark:border-slate-800/60">
                <td className="py-2 pr-4 font-medium">{s.name}</td>
                <td className="py-2 pr-4">{s.mean.toFixed(1)}</td>
                <td className="py-2 pr-4">{s.std.toFixed(2)}</td>
                <td className="py-2 pr-4">{s.min}</td>
                <td className="py-2 pr-4">{s.max}</td>
                <td className="py-2 pr-4 text-slate-500">{s.unit}</td>
                <td className="py-2">
                  <span
                    className={`badge ${
                      s.trend === 'rising'
                        ? 'bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 border-rose-200/60'
                        : s.trend === 'falling'
                          ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200/60'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {s.trend}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <SectionHeading eyebrow="Correlation" title="Sensor correlation heatmap" className="mt-16" />
      <Card className="overflow-x-auto">
        <div className="min-w-[760px]">
          <svg
            viewBox={`0 0 ${heatmapCols * (cellSize + 4) + 80} ${heatmapCols * (cellSize + 4) + 80}`}
            className="w-full"
            role="img"
            aria-label="Correlation heatmap"
          >
            <g transform="translate(80, 0)">
              {correlationMatrix.map((row, i) =>
                row.map((value, j) => {
                  const intensity = Math.abs(value);
                  const fill =
                    value >= 0
                      ? `rgba(59, 102, 255, ${0.15 + intensity * 0.7})`
                      : `rgba(239, 68, 68, ${0.15 + intensity * 0.7})`;
                  return (
                    <g key={`${i}-${j}`} transform={`translate(${j * (cellSize + 4)}, ${i * (cellSize + 4)})`}>
                      <rect width={cellSize} height={cellSize} rx={4} fill={fill} />
                      <text x={cellSize / 2} y={cellSize / 2 + 4} textAnchor="middle" fontSize={10} fill={t.textColor}>
                        {value.toFixed(2)}
                      </text>
                    </g>
                  );
                }),
              )}
              {correlationSensors.map((label, j) => (
                <text
                  key={`xt-${j}`}
                  x={j * (cellSize + 4) + cellSize / 2}
                  y={heatmapCols * (cellSize + 4) + 16}
                  textAnchor="middle"
                  fontSize={10}
                  fill={t.axisColor}
                  transform={`rotate(-45, ${j * (cellSize + 4) + cellSize / 2}, ${heatmapCols * (cellSize + 4) + 16})`}
                >
                  {label}
                </text>
              ))}
              {correlationSensors.map((label, i) => (
                <text
                  key={`yt-${i}`}
                  x={-8}
                  y={i * (cellSize + 4) + cellSize / 2 + 4}
                  textAnchor="end"
                  fontSize={10}
                  fill={t.axisColor}
                >
                  {label}
                </text>
              ))}
            </g>
          </svg>
        </div>
        <p className="text-xs text-slate-500 mt-3">
          Blue = positive correlation · Red = negative · Opacity scales with magnitude.
        </p>
      </Card>
    </div>
  );
}
