# Project Map & Full Summary

**Project:** Predictive Maintenance and Equipment Failure Prediction Using the NASA Turbofan Engine Dataset
**Author:** Vatsal Nileshbhai Tailor — MSc Computing, University of Roehampton (2026)
**Repository root:** `C:/Users/Vatsal/OneDrive/Desktop/msc project`
**Generated:** 2026-08-04

---

## 1. Project Overview

This is an MSc Computing dissertation project that builds an end-to-end, reproducible, data-driven predictive-maintenance pipeline for aircraft turbofan engines using the **NASA C-MAPSS FD001** benchmark dataset. The pipeline:

1. Cleans and scales raw multivariate sensor time-series.
2. Engineers 212 features (rolling, lag, delta, cumulative) from 21 raw sensors.
3. Trains three regression models — **Random Forest**, **XGBoost**, **Neural Network (MLPRegressor)** — to predict **Remaining Useful Life (RUL)**.
4. Generates per-engine RUL predictions on a held-out test fleet.
5. Evaluates performance with MAE / RMSE / R².
6. Produces model-level and sensor-level feature-importance analysis (tree importance + SHAP).
7. Translates predictions into a four-bin maintenance recommendation plan.

**Tech stack:** Python 3.14, scikit-learn, XGBoost, SHAP, matplotlib, python-docx. All scripts are deterministic (`random_state = 42`) and use portable `pathlib` paths so the whole pipeline runs end-to-end from a clean checkout.

The repo also contains a **React/Vite/TypeScript portfolio website** (`potfollyo/`) that documents and visualises the dissertation interactively, plus the **dissertation document** (`Dissertation_compressed_10k.docx`, ~10k words).

### Key results (FD001, 100-engine test set)

| Model | MAE (cycles) | RMSE (cycles) | R² |
|---|---|---|---|
| **Neural Network** (best) | **17.41** | **26.39** | **0.597** |
| XGBoost | 19.59 | 26.64 | 0.589 |
| Random Forest | 20.05 | 26.97 | 0.579 |

**Top features:** `Sensor_9_cumulative_delta`, `Sensor_4_rolling_mean_5`, `Sensor_3_rolling_mean_10`, `Sensor_6_cumulative_delta`. Dominant sensors: 3, 4, 6, 9, 11, 12, 13, 17, 21.

**Maintenance recommendation (four-bin fleet plan):** 24 Healthy · 42 Schedule Maintenance · 15 Maintenance Required Soon · 19 Immediate Inspection Required.

---

## 2. Top-Level Folder Map

```
msc project/
├── .git/                              # Git repository
├── .gitattributes                     # *.joblib tracked via Git LFS
├── .gitignore                         # ignores pkl/joblib, PNGs, temp Word files, helper scripts
├── CMAPSSData/                        # NASA C-MAPSS raw dataset (FD001–FD004) + reference PDF
├── 01_Data Cleaning & Preprocessing/ # Stage 1 — cleaning, scaling, EDA
├── 02_Feature Engineering/            # Stage 2 — 212 engineered features
├── 03_Model Training/                 # Stage 3 — RF / XGBoost / NN models
├── 04_RUL Prediction/                 # Stage 4 — per-engine RUL predictions
├── 05_Performance Evaluation/         # Stage 5 — MAE/RMSE/R² + plots
├── 06_Feature Importance Analysis/    # Stage 6 — tree + SHAP importance
├── 07_Maintenance Recommendation/     # Stage 7 — 4-bin maintenance plan
├── potfollyo/                         # React/Vite/TypeScript portfolio website
├── Dissertation_compressed_10k.docx   # Final dissertation (~10k words)
├── Dissertation_compressed_10k.docx.bak
└── Manufacturing_Anomaly_Detection_Proposal_updated2.pdf  # original project proposal
```

---

## 3. Detailed Folder Map

### `CMAPSSData/` — Raw source data
```
CMAPSSData/
├── readme.txt                         # dataset description (FD001–FD004 schema)
├── Damage Propagation Modeling.pdf    # original PHM08 reference paper (Saxena et al.)
├── train_FD001.txt ... train_FD004.txt   # run-to-failure training trajectories
├── test_FD001.txt  ... test_FD004.txt    # test trajectories (truncated before failure)
└── RUL_FD001.txt   ... RUL_FD004.txt     # ground-truth RUL for test set
```
Each row = one engine cycle, 26 space-separated columns: `unit_number, cycle, op_setting_1..3, sensor_1..21`. **Only FD001** is consumed by the pipeline (100 train engines run-to-failure, 100 test engines, single operating condition, single HPC-degradation fault mode).

### `01_Data Cleaning & Preprocessing/` — Stage 1
```
01_Data Cleaning & Preprocessing/
├── 01_data_loading_and_exploration.py      # load 3 raw FD001 .txt, assign column names
├── 02_data_types_and_missing_values.py     # dtype + missing-value checks
├── 03_duplicates_and_constant_columns.py   # detect dup rows + constant/low-variance cols
├── 04_descriptive_statistics_and_distributions.py
├── 05_outlier_detection_and_analysis.py     # IQR / z-score outlier detection
├── 06_final_scaling_and_preprocessing.py   # drop uninformative cols, RobustScaler, save
├── run_all_preprocessing.py                # orchestrator (steps 1–14)
├── loaded/          # raw CSVs with column names (train/test/rul_FD001_loaded.csv)
├── statistics/      # descriptive, variance, outlier analysis CSVs + step5_6_status.txt
├── visualizations/  # PNGs: distributions, boxplots, density, outliers, RUL dist, scaling
├── shared/          # train_FD001_scaled.csv, test_FD001_scaled.csv (+ reference CSVs)
└── metadata/        # preprocessing_metadata.json, robust_scaler.pkl
```
**Inputs:** `CMAPSSData/*.txt` (FD001) · **Outputs:** scaled train/test CSVs in `shared/`, scaler pickle, stats, EDA plots.

### `02_Feature Engineering/` — Stage 2
```
02_Feature Engineering/
├── 01_feature_engineering_rul_creation.py     # RUL = max_cycle − current_cycle per engine
├── 02_feature_engineering_timeseries.py      # rolling mean/std, lag, delta, cumulative
├── 03_feature_engineering_selection.py       # Pearson/Spearman corr filter (|r|>0.95)
├── 04_feature_engineering_validation.py      # apply features to test set, verify alignment
├── run_all_feature_engineering.py            # orchestrator
├── intermediate/  # with_rul, with_timeseries_features, engineered_final CSVs
├── reports/       # ENGINEERED_FEATURES_LIST.txt (212 features), validation + README .md
└── shared/        # train_FD001_engineered.csv, test_FD001_engineered.csv  (212 features)
```
**Inputs:** Stage 1 `shared/*_scaled.csv` · **Outputs:** engineered 212-feature train/test CSVs in `shared/`.

### `03_Model Training/` — Stage 3
```
03_Model Training/
├── run_model_training.py     # train RF, XGBoost, MLPRegressor on engineered set
└── models/
    ├── random_forest_rul.joblib   (~478 MB, Git LFS)
    ├── xgboost_rul.joblib
    ├── neural_network_rul.joblib
    └── training_metadata.json    # n_samples=20631, n_features=212, full column list
```
**Inputs:** Stage 2 `shared/train_FD001_engineered.csv` (target = `RUL`) · **Outputs:** three `.joblib` models + metadata.

### `04_RUL Prediction/` — Stage 4
```
04_RUL Prediction/
├── run_rul_prediction.py
└── predictions/
    ├── random_forest_predictions.csv
    ├── xgboost_predictions.csv
    └── neural_network_predictions.csv
```
**Inputs:** Stage 3 models + Stage 2 test set · **Outputs:** per-model RUL prediction CSVs (last observed cycle per engine).

### `05_Performance Evaluation/` — Stage 5
```
05_Performance Evaluation/
├── run_performance_evaluation.py
└── performance_evaluation/
    ├── performance_metrics_summary.csv
    ├── performance_evaluation_summary.md
    ├── actual_vs_predicted_rul.png
    ├── prediction_error_distribution.png
    ├── residual_plot.png
    └── metric_comparison.png
```
**Inputs:** Stage 4 predictions + ground-truth `RUL_FD001.txt` · **Outputs:** MAE/MSE/RMSE/R² metrics + evaluation plots.

### `06_Feature Importance Analysis/` — Stage 6
```
06_Feature Importance Analysis/
├── run_feature_importance_analysis.py
└── feature_importance_analysis/
    ├── random_forest_feature_importance.csv / .png
    ├── xgboost_feature_importance.csv / .png
    ├── neural_network_shap_importance.csv / neural_network_shap_summary.png
    ├── combined_feature_importance_comparison.csv / .png
    ├── sensor_level_importance_comparison.csv / .png
    └── feature_importance_summary.md
```
**Inputs:** Stage 3 models + Stage 2 engineered train set · **Outputs:** per-model top-20 rankings, SHAP summary, combined + sensor-level comparisons.

### `07_Maintenance Recommendation/` — Stage 7
```
07_Maintenance Recommendation/
├── run_maintenance_recommendation.py
├── maintenance_recommendations.csv     # per-engine recommendation table
├── maintenance_summary.csv             # fleet-level aggregate
├── maintenance_recommendation_summary.md
├── engine_health_dashboard.png
├── health_status_distribution.png
├── maintenance_priority_pie.png
├── maintenance_workflow.png
├── rul_distribution.png
└── msc project.lnk                     # Windows shortcut (not pipeline output)
```
**Inputs:** Stage 4 predictions · **Outputs:** four-bin maintenance plan, dashboards, workflow diagram, narrative summary.

### `potfollyo/` — Portfolio website
```
potfollyo/
├── package.json            # vatsal-tailor-msc-portfolio — React 19 + Vite 6 + TS 5.7
├── public/
├── scripts/build-dissertation-pdf.cjs   # generates dissertation PDF via pdfkit
├── dist/                  # build output
├── node_modules/
└── src/
    ├── App.tsx            # router + layout shell + page-transition wrapper
    ├── main.tsx           # entry
    ├── pages/             # 13 pages: Home, About, Dataset, Preprocessing,
    │                      #   FeatureEngineering, ModelTraining, Prediction,
    │                      #   Evaluation, FeatureImportance, Maintenance,
    │                      #   Research, Contact, NotFound
    ├── components/layout/  # Navbar, Footer, ScrollProgress
    ├── components/ui/      # AnimatedSection, Badge, Card, SectionHeading, StatCounter
    ├── context/            # ThemeContext (dark/light)
    ├── hooks/              # useChartTheme, useInViewOnce
    ├── lib/                # format.ts
    ├── data/               # profile, navigation, research, dataset, project (typed content)
    └── styles/             # globals.css (Tailwind + custom utilities)
```
**Stack:** React 19 · Vite 6 · TypeScript 5.7 · react-router-dom 7 · Tailwind CSS 3.4 · Framer Motion 11 · Recharts 2.15 · lucide-react · react-countup.

**Scripts:** `dev` (vite), `build` (vite build), `preview`, `lint` (tsc --noEmit), `build:dissertation` (PDF via pdfkit).

The site is a single-page app with 12 routes (lazy-loaded except Home) wrapping the dissertation into an interactive narrative — data → preprocessing → features → models → predictions → evaluation → feature importance → maintenance recommendations → academic references — plus an About/Contact presence. All content is data-driven via `src/data/*.ts`; theming adapts Recharts colours to dark/light mode.

---

## 4. End-to-End Pipeline Flow

```
Raw CMAPSS .txt
   │
   ▼  Stage 1 — Data Cleaning & Preprocessing
   │   (drop constants, RobustScaler on 21 sensors)
   ▼  shared/train_FD001_scaled.csv, test_FD001_scaled.csv
   │
   ▼  Stage 2 — Feature Engineering
   │   (212 features: rolling mean/std, lag, delta, cumulative; |r|>0.95 filter)
   ▼  shared/train_FD001_engineered.csv, test_FD001_engineered.csv
   │
   ▼  Stage 3 — Model Training
   │   (Random Forest, XGBoost, MLPRegressor; random_state=42)
   ▼  models/*.joblib + training_metadata.json
   │
   ▼  Stage 4 — RUL Prediction
   │   (predict last-cycle RUL per test engine)
   ▼  predictions/*.csv
   │
   ├──────────────────────┬──────────────────────┐
   ▼                      ▼                      ▼
Stage 5                Stage 6                Stage 7
Performance Eval      Feature Importance    Maintenance Recs
MAE/RMSE/R²          tree + SHAP           4-bin fleet plan
+ plots              + sensor-level         + dashboards
```

---

## 5. Dissertation Structure (`Dissertation_compressed_10k.docx`)

- Declaration · Acknowledgements · Abstract · ToC · List of Tables/Figures/Abbreviations
- **Chapter 1 — Introduction** (background, problem, aim & objectives, research questions, significance & scope, structure)
- **Chapter 2 — Literature Review** (maintenance philosophies, RUL methods, ML for time-series, feature engineering, explainability, CMAPSS dataset, research gap, technology review)
- **Chapter 3 — Methodology** (dataset description, cleaning decisions, scaling, feature engineering, model selection, evaluation metrics, explainability plan)
- **Chapter 4 — Implementation and Results** (training environment, RF/XGBoost/NN, RUL prediction, performance evaluation, feature importance, discussion)
- **Chapter 5 — Maintenance Recommendation and Conclusion** (recommendation rule, fleet outcomes, operational implications, limitations, future work, conclusion)
- References
- **Appendix A** Folder Structure Map · **Appendix B** Run Instructions · **Appendix C** Selected CSV Excerpts · **Appendix D** Selected PNG Figures

The dissertation addresses 7 objectives and 3 research questions from the project proposal, recommends the Neural Network as the best of the three compared models, and is fully reproducible from the GitHub repository.

---

## 6. How to Run

Each stage has a `run_all_*.py` / `run_*.py` orchestrator that uses portable `pathlib` paths. Run stages in order:

```bash
python "01_Data Cleaning & Preprocessing/run_all_preprocessing.py"
python "02_Feature Engineering/run_all_feature_engineering.py"
python "03_Model Training/run_model_training.py"
python "04_RUL Prediction/run_rul_prediction.py"
python "05_Performance Evaluation/run_performance_evaluation.py"
python "06_Feature Importance Analysis/run_feature_importance_analysis.py"
python "07_Maintenance Recommendation/run_maintenance_recommendation.py"
```

Portfolio website:

```bash
cd potfollyo
npm install
npm run dev        # local dev server
npm run build      # production build
```

---

## 7. Notes

- Large model artifacts (`*.joblib`) are tracked via **Git LFS** (see `.gitattributes`).
- PNG figures, `*.pkl`/`*.joblib` working copies, temp Word files (`~$*.docx`, `*.docx.bak`), and one-off helper scripts are gitignored (see `.gitignore`) — they are regenerated by the pipeline.
- A `00_Repository Analysis/` folder was previously tracked but has since been deleted (visible in git status as staged deletions); this document replaces that analysis.