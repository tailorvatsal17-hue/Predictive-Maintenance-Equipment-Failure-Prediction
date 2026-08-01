// Subset of the C-MAPSS FD001 sensors. Values are illustrative averages drawn
// from the descriptive statistics of the training set.

export interface SensorStat {
  id: string;
  name: string;
  mean: number;
  std: number;
  min: number;
  max: number;
  unit: string;
  trend: 'rising' | 'falling' | 'stable';
}

export const sensors: SensorStat[] = [
  { id: 's2', name: 'Sensor 2', mean: 641.0, std: 4.95, min: 627, max: 645, unit: '°R', trend: 'stable' },
  { id: 's3', name: 'Sensor 3', mean: 1589.0, std: 8.0, min: 1570, max: 1611, unit: '°R', trend: 'stable' },
  { id: 's4', name: 'Sensor 4', mean: 1397.0, std: 9.0, min: 1357, max: 1432, unit: 'psia', trend: 'rising' },
  { id: 's7', name: 'Sensor 7', mean: 554.0, std: 5.0, min: 545, max: 559, unit: 'psia', trend: 'stable' },
  { id: 's8', name: 'Sensor 8', mean: 2388.0, std: 14.0, min: 2358, max: 2455, unit: '°R', trend: 'rising' },
  { id: 's9', name: 'Sensor 9', mean: 9062.0, std: 22.0, min: 9020, max: 9244, unit: 'psia', trend: 'stable' },
  { id: 's11', name: 'Sensor 11', mean: 47.5, std: 0.18, min: 46.85, max: 48.53, unit: 'psia', trend: 'falling' },
  { id: 's12', name: 'Sensor 12', mean: 521.0, std: 3.4, min: 514, max: 539, unit: 'rpm', trend: 'stable' },
  { id: 's13', name: 'Sensor 13', mean: 2388.0, std: 14.0, min: 2358, max: 2455, unit: '°R', trend: 'rising' },
  { id: 's14', name: 'Sensor 14', mean: 8138.0, std: 26.0, min: 8095, max: 8284, unit: 'psia', trend: 'stable' },
  { id: 's15', name: 'Sensor 15', mean: 8.45, std: 0.04, min: 8.31, max: 8.62, unit: 'psia', trend: 'stable' },
  { id: 's17', name: 'Sensor 17', mean: 392.0, std: 1.95, min: 388, max: 400, unit: 'psia', trend: 'falling' },
  { id: 's20', name: 'Sensor 20', mean: 38.0, std: 0.18, min: 37.5, max: 39.0, unit: 'psia', trend: 'stable' },
  { id: 's21', name: 'Sensor 21', mean: 22.0, std: 0.18, min: 21.6, max: 23.1, unit: 'psia', trend: 'falling' },
];

export const opSettings = [
  { id: 'op1', label: 'Op Setting 1', value: 'Sea level', description: 'Constant at 0.0007 across the dataset — low altitude cruise condition.' },
  { id: 'op2', label: 'Op Setting 2', value: 'Sea level', description: 'Constant at 0.0000 — single operating condition in FD001.' },
  { id: 'op3', label: 'Op Setting 3', value: '100.0', description: 'Constant 100.0 — fixed throttle setting.' },
];

export const rulHistogram = [
  { bucket: '0–25', count: 14 },
  { bucket: '26–50', count: 17 },
  { bucket: '51–75', count: 9 },
  { bucket: '76–100', count: 17 },
  { bucket: '101–125', count: 18 },
  { bucket: '126–150', count: 12 },
  { bucket: '151–175', count: 8 },
  { bucket: '176–200', count: 5 },
];

// Top features by Random Forest importance (illustrative ranking from project).
export const topFeaturesRF = [
  { feature: 'Sensor_11_rolling_mean_5', importance: 0.082 },
  { feature: 'Sensor_4_rolling_std_10', importance: 0.071 },
  { feature: 'Sensor_11_lag_3', importance: 0.064 },
  { feature: 'Sensor_14_delta', importance: 0.058 },
  { feature: 'Sensor_12_rolling_mean_5', importance: 0.052 },
  { feature: 'Sensor_7_rolling_std_3', importance: 0.047 },
  { feature: 'Sensor_15_cumulative', importance: 0.043 },
  { feature: 'Sensor_17_delta', importance: 0.039 },
  { feature: 'Sensor_9_rolling_mean_10', importance: 0.037 },
  { feature: 'Sensor_11_rolling_std_3', importance: 0.034 },
];

export const topFeaturesXGB = [
  { feature: 'Sensor_4_rolling_mean_10', importance: 0.094 },
  { feature: 'Sensor_11_rolling_mean_5', importance: 0.087 },
  { feature: 'Sensor_14_delta', importance: 0.079 },
  { feature: 'Sensor_8_rolling_std_5', importance: 0.062 },
  { feature: 'Sensor_21_delta', importance: 0.054 },
  { feature: 'Sensor_11_lag_5', importance: 0.048 },
  { feature: 'Sensor_12_cumulative', importance: 0.045 },
  { feature: 'Sensor_9_rolling_mean_10', importance: 0.041 },
  { feature: 'Sensor_3_lag_3', importance: 0.038 },
  { feature: 'Sensor_17_rolling_std_3', importance: 0.033 },
];

export const topFeaturesNN = [
  { feature: 'Sensor_4_rolling_std_10', importance: 0.078 },
  { feature: 'Sensor_11_rolling_mean_5', importance: 0.072 },
  { feature: 'Sensor_14_delta', importance: 0.066 },
  { feature: 'Sensor_8_rolling_mean_5', importance: 0.058 },
  { feature: 'Sensor_12_lag_5', importance: 0.052 },
  { feature: 'Sensor_15_cumulative', importance: 0.048 },
  { feature: 'Sensor_7_rolling_std_3', importance: 0.043 },
  { feature: 'Sensor_17_delta', importance: 0.039 },
  { feature: 'Sensor_9_rolling_mean_10', importance: 0.036 },
  { feature: 'Sensor_21_rolling_mean_3', importance: 0.033 },
];

// Illustrative predictions for engines 1..10 — would be replaced by project output.
export const samplePredictions = [
  { engine: 1, actual: 112, rf: 108, xgb: 121, nn: 115 },
  { engine: 2, actual: 98, rf: 102, xgb: 95, nn: 100 },
  { engine: 3, actual: 145, rf: 140, xgb: 148, nn: 142 },
  { engine: 4, actual: 75, rf: 88, xgb: 78, nn: 82 },
  { engine: 5, actual: 132, rf: 128, xgb: 130, nn: 134 },
  { engine: 6, actual: 58, rf: 70, xgb: 62, nn: 64 },
  { engine: 7, actual: 162, rf: 158, xgb: 165, nn: 160 },
  { engine: 8, actual: 88, rf: 92, xgb: 84, nn: 90 },
  { engine: 9, actual: 121, rf: 118, xgb: 124, nn: 119 },
  { engine: 10, actual: 47, rf: 60, xgb: 52, nn: 50 },
];

// Predicted vs Actual scatter points (subset).
export const scatterPredVsActual = [
  { actual: 30, predicted: 32, model: 'RF' },
  { actual: 55, predicted: 58, model: 'RF' },
  { actual: 80, predicted: 78, model: 'RF' },
  { actual: 105, predicted: 110, model: 'RF' },
  { actual: 130, predicted: 125, model: 'RF' },
  { actual: 155, predicted: 160, model: 'RF' },
  { actual: 30, predicted: 31, model: 'XGB' },
  { actual: 55, predicted: 56, model: 'XGB' },
  { actual: 80, predicted: 78, model: 'XGB' },
  { actual: 105, predicted: 108, model: 'XGB' },
  { actual: 130, predicted: 128, model: 'XGB' },
  { actual: 155, predicted: 158, model: 'XGB' },
  { actual: 30, predicted: 31, model: 'NN' },
  { actual: 55, predicted: 55, model: 'NN' },
  { actual: 80, predicted: 79, model: 'NN' },
  { actual: 105, predicted: 107, model: 'NN' },
  { actual: 130, predicted: 129, model: 'NN' },
  { actual: 155, predicted: 156, model: 'NN' },
];

// Residual distribution buckets (MAE ±)
export const residuals = [
  { bin: '-30', rf: 2, xgb: 1, nn: 1 },
  { bin: '-20', rf: 4, xgb: 2, nn: 2 },
  { bin: '-10', rf: 9, xgb: 6, nn: 5 },
  { bin: '0', rf: 18, xgb: 22, nn: 26 },
  { bin: '+10', rf: 10, xgb: 12, nn: 14 },
  { bin: '+20', rf: 5, xgb: 6, nn: 4 },
  { bin: '+30', rf: 2, xgb: 1, nn: 1 },
];

export const radarMetrics = [
  { metric: 'MAE', RF: 0.6, XGB: 0.75, NN: 0.9 },
  { metric: 'RMSE', RF: 0.55, XGB: 0.78, NN: 0.92 },
  { metric: 'R²', RF: 0.6, XGB: 0.78, NN: 0.88 },
  { metric: 'Speed', RF: 0.65, XGB: 0.85, NN: 0.5 },
  { metric: 'Interpretability', RF: 0.85, XGB: 0.7, NN: 0.45 },
  { metric: 'Robustness', RF: 0.8, XGB: 0.85, NN: 0.78 },
];

// Correlation heatmap rows/columns — selected sensors.
export const correlationSensors = [
  'Sensor_2', 'Sensor_3', 'Sensor_4', 'Sensor_7', 'Sensor_8',
  'Sensor_9', 'Sensor_11', 'Sensor_12', 'Sensor_14', 'Sensor_15',
  'Sensor_17', 'Sensor_20', 'Sensor_21',
];

// Correlation values are illustrative; not from raw data.
export const correlationMatrix: number[][] = [
  [1.00, 0.62, 0.41, -0.55, 0.32, 0.18, -0.74, 0.22, 0.51, 0.05, -0.61, 0.41, -0.48],
  [0.62, 1.00, 0.58, -0.39, 0.46, 0.27, -0.55, 0.31, 0.62, 0.11, -0.49, 0.39, -0.34],
  [0.41, 0.58, 1.00, -0.18, 0.84, 0.40, -0.32, 0.55, 0.81, 0.24, -0.21, 0.62, -0.18],
  [-0.55, -0.39, -0.18, 1.00, -0.10, -0.30, 0.68, -0.05, -0.22, -0.08, 0.84, -0.15, 0.59],
  [0.32, 0.46, 0.84, -0.10, 1.00, 0.55, -0.21, 0.62, 0.78, 0.32, -0.12, 0.71, -0.10],
  [0.18, 0.27, 0.40, -0.30, 0.55, 1.00, -0.08, 0.74, 0.42, 0.41, -0.22, 0.58, -0.04],
  [-0.74, -0.55, -0.32, 0.68, -0.21, -0.08, 1.00, -0.15, -0.41, -0.05, 0.81, -0.31, 0.62],
  [0.22, 0.31, 0.55, -0.05, 0.62, 0.74, -0.15, 1.00, 0.58, 0.46, -0.18, 0.78, -0.08],
  [0.51, 0.62, 0.81, -0.22, 0.78, 0.42, -0.41, 0.58, 1.00, 0.34, -0.28, 0.66, -0.21],
  [0.05, 0.11, 0.24, -0.08, 0.32, 0.41, -0.05, 0.46, 0.34, 1.00, -0.08, 0.38, -0.02],
  [-0.61, -0.49, -0.21, 0.84, -0.12, -0.22, 0.81, -0.18, -0.28, -0.08, 1.00, -0.18, 0.78],
  [0.41, 0.39, 0.62, -0.15, 0.71, 0.58, -0.31, 0.78, 0.66, 0.38, -0.18, 1.00, -0.10],
  [-0.48, -0.34, -0.18, 0.59, -0.10, -0.04, 0.62, -0.08, -0.21, -0.02, 0.78, -0.10, 1.00],
];
