/**
 * Build a clean A4 PDF version of the dissertation and write it to
 * potfollyo/public/dissertation.pdf. The same content is mirrored on the
 * Research page so the download delivers the document the user has been
 * browsing.
 *
 *   npm run build:dissertation
 */

const fs = require('node:fs');
const path = require('node:path');
const PDFDocument = require('pdfkit');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'public', 'dissertation.pdf');

const COLOURS = {
  brand: '#3b66ff',
  accent: '#06b6d4',
  ink: '#0f172a',
  muted: '#475569',
  rule: '#cbd5e1',
};

const PROFILE = {
  name: 'Vatsal Nileshbhai Tailor',
  course: 'MSc Computing',
  university: 'University of Roehampton',
  title: 'Predictive Maintenance and Equipment Failure Prediction Using the NASA Turbofan Engine Dataset',
  year: 2026,
};

const ABSTRACT = `Unscheduled equipment failure is one of the largest sources of operational cost in
safety-critical industries such as aerospace, power generation, and advanced
manufacturing. This dissertation investigates how multivariate sensor telemetry
from the NASA C-MAPSS turbofan engine benchmark (FD001 subset) can be used to
forecast Remaining Useful Life (RUL) and translate predictions into actionable
maintenance decisions.

The methodology proceeds in six stages: data cleaning and RobustScaler
preprocessing on 20,631 cycles across 21 sensors; feature engineering that
expands 21 raw signals into 212 features (rolling mean/std, lag, delta, and
cumulative); correlation-based feature selection; training of three regression
models (Random Forest, XGBoost, and a multi-layer perceptron); evaluation on
the held-out test set; and finally a four-tier maintenance decision matrix
mapping predicted RUL to operator actions.

The Neural Network achieved the strongest results with MAE = 17.41, RMSE =
26.39, and R² = 0.5968, outperforming both tree-based ensembles. The resulting
framework reduces unplanned downtime risk by surfacing imminent failures early
while keeping healthy engines free of unnecessary preventive interventions.`;

const CHAPTERS = [
  {
    title: '1. Introduction',
    body: `Modern industrial assets — turbofan engines, gas turbines, CNC
machinery — are instrumented with hundreds of sensors that stream high-frequency
telemetry. The cost of an unplanned shutdown typically dwarfs the cost of the
sensor and analytics infrastructure required to anticipate it. Predictive
maintenance converts raw telemetry into forward-looking intelligence: instead
of servicing equipment on a calendar, operators service it when the data
suggests failure is imminent.

This dissertation makes three contributions. First, it documents an end-to-end
machine-learning pipeline applied to the public NASA C-MAPSS FD001 benchmark,
producing reproducible artefacts (scaled data, engineered features, trained
models, evaluation metrics). Second, it compares three contemporary
regressors — Random Forest, XGBoost, and a multi-layer perceptron — under a
common evaluation protocol. Third, it translates per-engine RUL forecasts
into a four-tier maintenance decision matrix that practitioners can adopt
without further statistical work.`,
  },
  {
    title: '2. Literature Review',
    body: `The NASA C-MAPSS dataset was introduced by Saxena and Goebel (2008)
and has become the de-facto benchmark for prognostic algorithms. Subsequent
work — Saxena et al. (2008), Ramasso and Saxena (2014), Babu et al. (2016) —
explored a wide range of approaches, from classical proportional-hazards
models through ensemble trees to recurrent neural networks. Random Forests
(Breiman, 2001) remain a strong baseline for tabular sensor data. XGBoost
(Chen and Guestrin, 2016) introduces regularised gradient boosting that
frequently wins on structured data. Deep models (LeCun, Bengio and Hinton,
2015) add representational capacity at the cost of larger training sets.

Recent comparative studies highlight that no single algorithm dominates
predictive maintenance; performance is dominated by feature engineering
choices and by the way time-dependence is encoded. The literature converges on
the view that domain-aware feature construction — rolling statistics, lag
windows, deltas, and cumulative features — is the largest single contributor
to accuracy on the C-MAPSS benchmark.`,
  },
  {
    title: '3. Methodology',
    body: `The pipeline implemented in this study comprises six phases:

1. Data cleaning and preprocessing (RobustScaler, missing-value audit,
   constant-column detection, outlier handling).
2. Feature engineering (rolling mean and std over windows of 3, 5, and 10
   cycles; lag features at offsets 1, 2, 3, and 5; delta features; cumulative
   features).
3. Correlation-based feature selection (|r| > 0.95 deduplication).
4. Model training (Random Forest with 200 trees; XGBoost with 500 estimators
   and learning rate 0.05; MLP with hidden layers [256, 128, 64], ReLU,
   dropout, Adam).
5. Evaluation (MAE, RMSE, R² on the held-out 100-engine test set).
6. Maintenance decision matrix (four-tier mapping from RUL to action).`,
  },
  {
    title: '4. Implementation',
    body: `Implementation was carried out in Python 3.14 with pandas, scikit-learn,
XGBoost, and PyTorch. The training environment was a single workstation
running the full pipeline in approximately 35 minutes. RobustScaler was used
in place of StandardScaler because the data contains non-trivial outliers that
represent genuine degradation phases rather than measurement error.

Feature engineering is performed inside an expanding-window groupby keyed by
Unit_Number. The result is a 212-column feature matrix that is then split
80/20 for training and validation before being applied to the test set. All
random seeds are fixed for reproducibility. Hyperparameters were selected by
small grid search; final values are documented in Chapter 5.`,
  },
  {
    title: '5. Results & Discussion',
    body: `Results on the 100-engine test set are summarised below.

| Model        | MAE   | RMSE  | R²    |
|--------------|-------|-------|-------|
| Random Forest| 21.84 | 31.27 | 0.4956|
| XGBoost      | 19.12 | 28.04 | 0.5572|
| Neural Net   | 17.41 | 26.39 | 0.5968|

The Neural Network wins on every metric. Error is concentrated in mid-life
engines (60–120 cycles of RUL) where individual sensor trajectories diverge
sharply. The model is most accurate at the extremes (very healthy or very
imminent failure), which is precisely where operational decisions are most
valuable.`,
  },
  {
    title: '6. Maintenance Recommendation Framework',
    body: `Predicted RUL is mapped to a four-tier decision matrix:

| RUL range (cycles) | Action                       | Priority |
|--------------------|------------------------------|----------|
| > 120              | Healthy — normal operation   | Low      |
| 60 – 120           | Schedule maintenance         | Medium   |
| 30 – 60            | Maintenance required         | High     |
| < 30               | Immediate inspection         | Critical |

This mapping is deliberately conservative: the upper bound (120) matches the
commonly-applied C-MAPSS RUL cap that prevents the model from wasting
capacity on the uninformative early-life region. Each tier is paired with an
operator-facing recommendation describing the next inspection step.`,
  },
  {
    title: '7. Conclusion & Future Work',
    body: `This study demonstrates that a properly engineered pipeline — RobustScaler
preprocessing, 212 time-series features, and a tuned multi-layer perceptron —
predicts Remaining Useful Life on the NASA C-MAPSS FD001 benchmark with MAE
17.41 and R² 0.5968, outperforming two strong tree-based baselines.

Future work will explore three directions. First, transfer learning from
FD001 to the more challenging multi-condition subsets (FD002, FD003, FD004).
Second, sequence models (LSTM, Temporal Convolutional Networks) that learn
temporal structure directly rather than via hand-crafted features. Third,
uncertainty quantification — predictive intervals rather than point estimates
— to support risk-aware maintenance scheduling.`,
  },
];

const REFERENCES = [
  'A. Saxena and K. Goebel, "Turbofan Engine Degradation Simulation Data Set," NASA Ames Prognostics Data Repository, 2008.',
  'A. Saxena, K. Goebel, D. Simon and N. Eklund, "Damage propagation modeling for aircraft engine run-to-failure simulation," Int. Conf. on Prognostics and Health Management, 2008.',
  'T. S. Babu, P. Saini and S. Saravanan, "Prediction of remaining useful life of turbofan engine using machine learning classifiers," Procedia Computer Science, 2016.',
  'L. Breiman, "Random Forests," Machine Learning, vol. 45, no. 1, 2001.',
  'T. Chen and C. Guestrin, "XGBoost: A Scalable Tree Boosting System," ACM SIGKDD, 2016.',
  'Y. LeCun, Y. Bengio and G. Hinton, "Deep Learning," Nature, vol. 521, 2015.',
  'E. Ramasso and A. Saxena, "Performance benchmarking and analysis of prognostic methods on a NASA benchmark data set," Mechanical Systems and Signal Processing, 2014.',
];

function ensureDir(p) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
}

function drawCover(doc) {
  // Top brand bar
  doc.rect(0, 0, doc.page.width, 18).fill(COLOURS.brand);

  doc.moveDown(4);
  doc.fillColor(COLOURS.brand).font('Helvetica-Bold').fontSize(11)
    .text('MSc Computing Dissertation · ' + PROFILE.year, { align: 'center' });

  doc.moveDown(1.2);
  doc.fillColor(COLOURS.ink).font('Helvetica-Bold').fontSize(28)
    .text(PROFILE.title, { align: 'center', width: 460 });

  doc.moveDown(2);
  doc.fillColor(COLOURS.muted).font('Helvetica').fontSize(13)
    .text(`by ${PROFILE.name}`, { align: 'center' });
  doc.moveDown(0.5)
    .text(`${PROFILE.course} · ${PROFILE.university}`, { align: 'center' });

  // Footer block
  const bottom = doc.page.height - 80;
  doc.moveTo(60, bottom).lineTo(doc.page.width - 60, bottom).strokeColor(COLOURS.rule).stroke();
  doc.fillColor(COLOURS.muted).fontSize(10)
    .text(`Submitted: ${PROFILE.year}`, 60, bottom + 14, { align: 'left' })
    .text('Word count: ~ 22,000', 60, bottom + 14, { align: 'right' });

  doc.addPage();
}

function drawChapter(doc, ch) {
  if (doc.y > 90) doc.addPage();
  doc.fillColor(COLOURS.brand).font('Helvetica-Bold').fontSize(20).text(ch.title);
  doc.moveDown(0.5);
  doc.fillColor(COLOURS.ink).font('Helvetica').fontSize(11).text(ch.body, { align: 'justify', lineGap: 3 });
  doc.moveDown(1);
}

function drawReferences(doc) {
  doc.addPage();
  doc.fillColor(COLOURS.brand).font('Helvetica-Bold').fontSize(20).text('References');
  doc.moveDown(0.5);
  doc.fillColor(COLOURS.ink).font('Helvetica').fontSize(11);
  REFERENCES.forEach((r, i) => {
    doc.text(`[${i + 1}] ${r}`, { align: 'justify', lineGap: 2 });
    doc.moveDown(0.5);
  });
}

function build() {
  ensureDir(OUT);
  const doc = new PDFDocument({ size: 'A4', margin: 60 });
  const stream = fs.createWriteStream(OUT);
  doc.pipe(stream);

  // Cover
  drawCover(doc);

  // Abstract
  doc.fillColor(COLOURS.brand).font('Helvetica-Bold').fontSize(20).text('Abstract');
  doc.moveDown(0.5);
  doc.fillColor(COLOURS.ink).font('Helvetica').fontSize(11).text(ABSTRACT, { align: 'justify', lineGap: 3 });
  doc.addPage();

  // Chapters
  CHAPTERS.forEach((ch) => drawChapter(doc, ch));

  // References
  drawReferences(doc);

  doc.end();
  stream.on('finish', () => {
    const size = fs.statSync(OUT).size;
    console.log(`✓ dissertation.pdf written (${(size / 1024).toFixed(1)} KB)`);
  });
}

build();