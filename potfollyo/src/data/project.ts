// Numbers mirror the actual MSc project outputs (NASA C-MAPSS FD001).
// MAE 17.41 / RMSE 26.39 / R² 0.5968 for the Neural Network (best model).

export const datasetStats = {
  trainingEngines: 100,
  testEngines: 100,
  trainingCycles: 20631,
  sensors: 21,
  operatingSettings: 3,
  rulColumns: 1,
  minRUL: 0,
  maxRUL: 362,
  meanRUL: 113.06,
  medianRUL: 124,
  trainingFile: 'train_FD001.txt',
  testFile: 'test_FD001.txt',
  rulFile: 'RUL_FD001.txt',
} as const;

export const projectMetrics = {
  totalSamples: 20631,
  finalFeatures: 212,
  rawFeatures: 21,
  modelsTrained: 3,
  bestModel: 'Neural Network',
  bestMAE: 17.41,
  bestRMSE: 26.39,
  bestR2: 0.5968,
  pipelinePhases: 6,
} as const;

export interface ModelResult {
  id: string;
  name: string;
  description: string;
  algorithm: string;
  advantages: string[];
  limitations: string[];
  hyperparameters: { label: string; value: string }[];
  trainingTime: string;
  mae: number;
  rmse: number;
  r2: number;
  color: string;
}

export const modelResults: ModelResult[] = [
  {
    id: 'rf',
    name: 'Random Forest',
    description:
      'Ensemble of 200 decision trees that averages predictions to reduce variance and overfitting. Well-suited for tabular sensor data with mixed scales.',
    algorithm: 'Bagging ensemble of decision-tree regressors',
    advantages: [
      'Robust to outliers and noisy sensor data',
      'Captures non-linear degradation patterns',
      'Provides built-in feature importance',
    ],
    limitations: [
      'Large model footprint (~50 MB)',
      'Slower inference than linear models',
    ],
    hyperparameters: [
      { label: 'n_estimators', value: '200' },
      { label: 'max_depth', value: 'None' },
      { label: 'min_samples_leaf', value: '2' },
      { label: 'max_features', value: 'sqrt' },
    ],
    trainingTime: '~ 12 min',
    mae: 21.84,
    rmse: 31.27,
    r2: 0.4956,
    color: '#22c55e',
  },
  {
    id: 'xgb',
    name: 'XGBoost',
    description:
      'Gradient-boosted trees with regularised objective. Sequential weak learners minimise a residual loss, typically outperforming single models.',
    algorithm: 'Gradient boosting with L1 + L2 regularisation',
    advantages: [
      'State-of-the-art on tabular regression',
      'Strong generalisation on small datasets',
      'Built-in handling of missing values',
    ],
    limitations: [
      'Requires careful hyper-parameter tuning',
      'Less interpretable than a single tree',
    ],
    hyperparameters: [
      { label: 'n_estimators', value: '500' },
      { label: 'learning_rate', value: '0.05' },
      { label: 'max_depth', value: '8' },
      { label: 'subsample', value: '0.8' },
    ],
    trainingTime: '~ 7 min',
    mae: 19.12,
    rmse: 28.04,
    r2: 0.5572,
    color: '#f97316',
  },
  {
    id: 'nn',
    name: 'Neural Network',
    description:
      'Multi-layer perceptron with batch normalisation and dropout. Captures complex sensor interactions across the engineered feature space.',
    algorithm: 'MLP with BatchNorm + Dropout (PyTorch)',
    advantages: [
      'Learns non-linear feature interactions',
      'Best overall accuracy on this task',
      'Scales to additional sensors',
    ],
    limitations: [
      'Requires more compute for training',
      'Less interpretable than tree models',
    ],
    hyperparameters: [
      { label: 'Hidden layers', value: '[256, 128, 64]' },
      { label: 'Activation', value: 'ReLU' },
      { label: 'Optimizer', value: 'Adam (lr=1e-3)' },
      { label: 'Epochs', value: '120' },
    ],
    trainingTime: '~ 18 min',
    mae: 17.41,
    rmse: 26.39,
    r2: 0.5968,
    color: '#3b66ff',
  },
];

export interface MaintenanceBucket {
  id: string;
  label: string;
  range: string;
  min: number;
  max: number;
  color: string;
  recommendation: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export const maintenanceBuckets: MaintenanceBucket[] = [
  {
    id: 'healthy',
    label: 'Healthy',
    range: '> 120 cycles',
    min: 120,
    max: Infinity,
    color: '#10b981',
    priority: 'low',
    recommendation:
      'Continue normal operation. Schedule routine inspection at the next planned maintenance window.',
  },
  {
    id: 'schedule',
    label: 'Schedule Maintenance',
    range: '60 – 120 cycles',
    min: 60,
    max: 120,
    color: '#f59e0b',
    priority: 'medium',
    recommendation:
      'Plan a maintenance intervention within the next service window. Order replacement parts in advance.',
  },
  {
    id: 'required',
    label: 'Maintenance Required',
    range: '30 – 60 cycles',
    min: 30,
    max: 60,
    color: '#f97316',
    priority: 'high',
    recommendation:
      'Schedule maintenance at the earliest opportunity. Increase sensor monitoring frequency.',
  },
  {
    id: 'immediate',
    label: 'Immediate Inspection',
    range: '< 30 cycles',
    min: 0,
    max: 30,
    color: '#ef4444',
    priority: 'critical',
    recommendation:
      'Critical — schedule immediate inspection. Reduce operational load until the engine is serviced.',
  },
];

export const pipelineSteps = [
  { id: 1, title: 'Raw Dataset', description: 'NASA C-MAPSS FD001: 100 engines × 20,631 cycles', icon: 'database' },
  { id: 2, title: 'Cleaning & Preprocessing', description: 'RobustScaler + outlier handling', icon: 'sparkles' },
  { id: 3, title: 'Feature Engineering', description: 'Rolling, lag, delta, cumulative features', icon: 'cog' },
  { id: 4, title: 'Feature Selection', description: 'Correlation + importance filtering', icon: 'filter' },
  { id: 5, title: 'Model Training', description: 'Random Forest · XGBoost · Neural Network', icon: 'brain' },
  { id: 6, title: 'RUL Prediction', description: 'Remaining Useful Life forecast', icon: 'activity' },
];

export const techStack = [
  'Python 3.14',
  'pandas · NumPy',
  'scikit-learn',
  'XGBoost',
  'PyTorch',
  'Matplotlib · Seaborn',
  'React 19',
  'Vite · TypeScript',
  'Tailwind CSS',
  'Framer Motion',
  'Recharts · Plotly',
] as const;
