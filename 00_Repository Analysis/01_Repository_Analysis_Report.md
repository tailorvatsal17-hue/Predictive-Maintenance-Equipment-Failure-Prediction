# 01 — Repository Analysis Report

## 1. Project Overview

| Item | Value |
|---|---|
| Project title | Predictive Maintenance and Equipment Failure Prediction Using the NASA Turbofan Engine Dataset |
| Author | Vatsal Nileshbhai Tailor |
| Student ID | A00067312 |
| Institution | University of Roehampton |
| Programme | MSc Computing |
| Primary dataset | NASA CMAPSS Turbofan Engine Degradation (subset FD001) |
| Implementation phases | 7 |
| Implementation language | Python 3.x |
| Output artefacts | 4 trained models, 25+ CSV files, 25+ PNG figures, 6 summary Markdowns, 2 metadata JSONs |
| Final pipeline completion date | July 2026 |

The repository is a working pipeline that takes the raw NASA `.txt`
files (FD001 subset only) through to a rule-based maintenance
recommendation per engine. Every script lives inside its own numbered
phase folder and uses `pathlib.Path` for cross-platform path resolution.

## 2. Pipeline at a Glance

```
NASA .txt  →  Phase 1  →  Phase 2  →  Phase 3  →  Phase 4  →  Phase 5  →  Phase 6  →  Phase 7
   raw         cleaning     features     train        predict     evaluate     SHAP          recommend
```

Each phase has:

* an executable driver (`run_<phase>.py`) using dynamic paths;
* numbered sub-scripts (`01_…`, `02_…`) that document each step in
  detail;
* CSV / PNG / JSON / Markdown outputs scoped to the phase folder.

## 3. Phase 1 — Data Cleaning & Preprocessing

**Folder:** `01_Data Cleaning & Preprocessing/`
**Driver:** `run_all_preprocessing.py` (calls six numbered scripts)

### Inputs

* `train_FD001.txt` (raw training trajectories)
* `test_FD001.txt` (raw test trajectories)
* `RUL_FD001.txt` (ground-truth RUL for the test fleet)

These three files are expected in `CMAPSSData/` at the project root,
falling back to the phase folder if absent.

### Steps performed

1. Load three files; assign 26 meaningful column names
   (`Unit_Number`, `Time_Cycles`, three `Op_Setting_*`, `Sensor_1`…
   `Sensor_21`).
2. Verify data types and missing values (none).
3. Identify duplicates (none) and constant columns
   (`Op_Setting_1/2/3` — zero variance in FD001).
4. Compute descriptive statistics, variance analysis, and outlier
   analysis.
5. Visualise sensor distributions, box plots, density plots, time
   trajectories and the RUL distribution.
6. Remove identifier and constant columns; apply `RobustScaler` to
   the 21 retained sensors and save the scaler object for downstream
   use.

### Outputs

| File | Description |
|---|---|
| `train_FD001_scaled.csv` | Scaled training sensors (20631 × 21) |
| `test_FD001_scaled.csv` | Scaled test sensors (13096 × 21) |
| `train_FD001_reference.csv` | `Unit_Number` + `Time_Cycles` for the training fleet |
| `test_FD001_reference.csv` | Same for the test fleet |
| `RUL_FD001_reference.csv` | Ground-truth RUL values |
| `robust_scaler.pkl` | Fitted scaler object |
| `preprocessing_metadata.json` | Decisions log |
| `descriptive_statistics.csv`, `training_descriptive_stats.csv`, `training_additional_stats.csv`, `variance_analysis_train.csv`, `variance_analysis_test.csv`, `outlier_analysis_train.csv`, `outlier_analysis_test.csv` | Statistical summaries |
| `visualizations/sensor_distributions.png`, `sensor_distributions_histogram.png`, `sensor_boxplots.png`, `sensor_density_plots.png`, `rul_distribution.png`, `sensor_trajectories_engine1.png`, `outlier_detection.png`, `before_after_scaling.png` | Diagnostic figures |

### Recorded decisions

`preprocessing_metadata.json` lists the 5 columns removed
(`Unit_Number`, `Time_Cycles`, `Op_Setting_1/2/3`) and the 21 columns
kept (all sensors). Scaling method: `RobustScaler`.

## 4. Phase 2 — Feature Engineering

**Folder:** `02_Feature Engineering/`
**Driver:** `run_all_feature_engineering.py`

### Steps performed

1. **`01_feature_engineering_rul_creation.py`** — compute RUL target
   for training rows by reversing `Time_Cycles` per engine.
2. **`02_feature_engineering_timeseries.py`** — create rolling-mean
   and rolling-standard-deviation features for windows 3, 5 and 10;
   lag features for windows 1, 2, 3 and 5; per-cycle delta
   (cycle-to-cycle difference); and cumulative-delta features.
3. **`03_feature_engineering_selection.py`** — apply Pearson
   correlation filter at `|r| > 0.95` to remove redundant engineered
   columns.
4. **`04_feature_engineering_validation.py`** — validate the
   engineered matrix (no missing values, no infinities, consistent
   columns across training and test).

### Outputs

| File | Description |
|---|---|
| `train_FD001_with_rul.csv` | Pre-engineering training matrix with RUL column |
| `train_FD001_with_timeseries_features.csv` | Post-timeseries, pre-selection matrix |
| `train_FD001_engineered_final.csv` | Post-selection intermediate |
| `train_FD001_engineered.csv` | Final engineered training matrix (20631 × 215) |
| `test_FD001_engineered.csv` | Final engineered test matrix (13096 × 215) |
| `feature_importance_statistical.csv` | Statistical correlation of each feature with RUL |
| `ENGINEERED_FEATURES_LIST.txt` | List of all engineered columns |
| `README_FEATURE_ENGINEERING.md` | Narrative documentation |
| `FEATURE_ENGINEERING_VALIDATION.md` | Validation report |

### Feature composition (recorded in `FEATURE_ENGINEERING_VALIDATION.md`)

| Feature Type | Count |
|---|---|
| Original Sensors | 18 |
| Rolling Mean | 26 |
| Rolling Std | 63 |
| Lag Features | 76 |
| Delta Features | 21 |
| Cumulative Degradation | 8 |
| **Total used for training** | **212** |

(The 21 retained sensors minus three dropped by correlation filter at
the original-sensor level yields the 18 raw sensor columns.)

## 5. Phase 3 — Model Training

**Folder:** `03_Model Training/`
**Driver:** `run_model_training.py`

### Models trained

| Model | Library | Key hyperparameters |
|---|---|---|
| Random Forest | scikit-learn `RandomForestRegressor` | `n_estimators=300`, `max_depth=None`, `n_jobs=-1`, `random_state=42` |
| XGBoost | xgboost `XGBRegressor` | `n_estimators=500`, `max_depth=6`, `learning_rate=0.05`, `subsample=0.8`, `colsample_bytree=0.8`, `objective="reg:squarederror"` |
| Neural Network | scikit-learn `MLPRegressor` | `hidden_layer_sizes=(128, 64, 32)`, `activation="relu"`, `solver="adam"`, `alpha=1e-4`, `batch_size=256`, `learning_rate_init=1e-3`, `max_iter=100`, `random_state=42` |

### Outputs

| File | Description |
|---|---|
| `models/random_forest_rul.joblib` | Trained RF (large file stored via Git LFS — see `.gitattributes`) |
| `models/xgboost_rul.joblib` | Trained XGBoost |
| `models/neural_network_rul.joblib` | Trained MLP |
| `models/training_metadata.json` | 212 feature column names, target column (`RUL`), random state, training file path |

## 6. Phase 4 — RUL Prediction

**Folder:** `04_RUL Prediction/`
**Driver:** `run_rul_prediction.py`

### Steps performed

1. Load each saved model from `03_Model Training/models/`.
2. Load `test_FD001_engineered.csv` and `training_metadata.json`.
3. For every test engine, select the **last observed cycle** (per
   `Unit_Number`).
4. Predict RUL with each model and write one CSV per model
   (`<model>_predictions.csv`) containing columns
   `Unit_Number`, `Time_Cycles`, `Predicted_RUL`.

### Outputs

| File | Shape |
|---|---|
| `random_forest_predictions.csv` | 100 rows × 3 columns |
| `xgboost_predictions.csv` | 100 rows × 3 columns |
| `neural_network_predictions.csv` | 100 rows × 3 columns |

The validation block in the driver asserts exactly one row per engine
and no duplicate / non-finite predictions.

## 7. Phase 5 — Performance Evaluation

**Folder:** `05_Performance Evaluation/`
**Driver:** `run_performance_evaluation.py`

### Steps performed

1. Load the three prediction files and align rows to
   `RUL_FD001_reference.csv` by `Unit_Number` (asserting 1…100).
2. Compute **MAE**, **MSE**, **RMSE** and **R²** per model.
3. Write summary CSV, four PNG figures and a Markdown summary.

### Recorded results (`performance_metrics_summary.csv`)

| Model | MAE | RMSE | R² |
|---|---|---|---|
| Neural Network | 17.4117 | 26.3870 | **0.5968** |
| XGBoost | 19.5924 | 26.6438 | 0.5889 |
| Random Forest | 20.0495 | 26.9726 | 0.5787 |

### Outputs

| File | Description |
|---|---|
| `performance_evaluation/performance_metrics_summary.csv` | MAE/MSE/RMSE/R² table |
| `performance_evaluation/actual_vs_predicted_rul.png` | Scatter plot |
| `performance_evaluation/prediction_error_distribution.png` | Residual density per model |
| `performance_evaluation/residual_plot.png` | Residual vs actual |
| `performance_evaluation/metric_comparison.png` | Bar comparison |
| `performance_evaluation/performance_evaluation_summary.md` | Narrative summary |

## 8. Phase 6 — Feature Importance Analysis

**Folder:** `06_Feature Importance Analysis/`
**Driver:** `run_feature_importance_analysis.py`

### Steps performed

1. Load the three trained models from Phase 3.
2. **Random Forest** — `feature_importances_` from the tree ensemble,
   normalised.
3. **XGBoost** — `feature_importances_` (gain-based), normalised.
4. **Neural Network** — `shap.Explainer` with a background of 50 rows
   and an evaluation sample of 200 rows. Mean absolute SHAP values are
   the importance measure.
5. **Cross-model comparison** — Top-20 union of features across the
   three models, normalised, and aggregated by base sensor family.

### Top features (`combined_feature_importance_comparison.csv`)

The combined top-20 emphasises cumulative-delta and rolling-mean
features. The four features consistently at the top are:

1. `Sensor_9_cumulative_delta`
2. `Sensor_4_rolling_mean_5`
3. `Sensor_3_rolling_mean_10`
4. `Sensor_6_cumulative_delta`

### Sensor-level ranking (`sensor_level_importance_comparison.csv`)

| Sensor | Average aggregated importance |
|---|---|
| Sensor_9 | Highest |
| Sensor_6 | 2nd |
| Sensor_3 | 3rd |
| Sensor_13 | 4th |
| Sensor_12 | 5th |
| Sensor_11 | 6th |
| Sensor_4 | 7th |
| Sensor_8 | 8th |
| Sensor_17 | 9th |
| Sensor_21 | 10th |

### Outputs

* `feature_importance_analysis/random_forest_feature_importance.csv`
* `feature_importance_analysis/xgboost_feature_importance.csv`
* `feature_importance_analysis/neural_network_shap_importance.csv`
* `feature_importance_analysis/combined_feature_importance_comparison.csv`
* `feature_importance_analysis/sensor_level_importance_comparison.csv`
* `feature_importance_analysis/random_forest_feature_importance_bar.png`
* `feature_importance_analysis/xgboost_feature_importance_bar.png`
* `feature_importance_analysis/neural_network_shap_summary.png`
* `feature_importance_analysis/combined_feature_importance_comparison.png`
* `feature_importance_analysis/sensor_level_importance_comparison.png`
* `feature_importance_analysis/feature_importance_summary.md`

## 9. Phase 7 — Maintenance Recommendation

**Folder:** `07_Maintenance Recommendation/`
**Driver:** `run_maintenance_recommendation.py`

### Decision rule

| Predicted RUL (cycles) | Health Status | Recommended Action |
|---|---|---|
| > 120 | Healthy | Continue normal operation |
| 61 – 120 | Schedule Maintenance | Schedule preventive maintenance |
| 31 – 60 | Maintenance Required Soon | Plan maintenance |
| ≤ 30 | Immediate Inspection Required | Inspect immediately |

### Steps performed

1. Load Neural Network predictions from Phase 4 (this model is the
   best-performing on the held-out test set).
2. Apply the four-bin rule above to every engine.
3. Persist the per-engine recommendation table and a fleet-level
   summary.
4. Render a bar chart of health status, a histogram of predicted RUL
   coloured by category, a priority pie chart, an engine-by-engine
   colour-coded dashboard and a pipeline workflow diagram.

### Recorded outcomes (`maintenance_summary.csv`)

| Bucket | Count |
|---|---|
| Healthy | 24 |
| Schedule Maintenance | 42 |
| Maintenance Required Soon | 15 |
| Immediate Inspection Required | 19 |
| **Total** | **100** |

Average predicted RUL across the fleet: **81.88 cycles**
(lowest 2.67, highest 202.03).

### Outputs

| File | Description |
|---|---|
| `maintenance_recommendations.csv` | Per-engine table (100 rows × multiple columns) |
| `maintenance_summary.csv` | Fleet-level counts |
| `health_status_distribution.png` | Bar chart of bucket counts |
| `rul_distribution.png` | Histogram of predicted RUL coloured by bucket |
| `maintenance_priority_pie.png` | Pie of bucket counts |
| `engine_health_dashboard.png` | Colour-coded dashboard |
| `maintenance_workflow.png` | Pipeline workflow diagram |
| `maintenance_recommendation_summary.md` | Narrative summary |

## 10. Cross-Cutting Engineering Notes

* **Path resolution.** Every script uses
  `SCRIPT_DIR = Path(__file__).resolve().parent` and
  `PROJECT_DIR = SCRIPT_DIR.parent`, then navigates to sibling phase
  folders. There are no hard-coded user paths.
* **Git LFS.** `.gitattributes` registers `*.joblib filter=lfs
  diff=lfs merge=lfs -text`, so the four model artefacts are tracked
  via LFS rather than stored directly in the git tree.
* **`.gitignore`** excludes `__pycache__/`, compiled Python,
  `*.pkl`, `*.joblib`, `*.png`/jpg, the metadata JSONs and the
  `FOLDER_STRUCTURE_MAP.txt` placeholder.
* **CMAPSS source data.** No `CMAPSSData/` folder is shipped; the
  drivers fall back to the phase folder if the source `.txt` files
  are dropped in next to the relevant script.

## 11. Strengths

1. The pipeline is fully reproduced by re-running the seven drivers
   in order; no manual steps remain.
2. The decision rules for the recommendation engine are explicit and
   documented in `maintenance_recommendation_summary.md`.
3. Feature importance is reported for all three models and aggregated
   into a sensor-level view, allowing cross-model triangulation.
4. All paths are dynamic; the project is portable across machines.

## 12. Limitations Observed

1. Only FD001 is exercised; FD002–FD004 (multi-operating-condition
   sub-datasets) are not addressed.
2. The neural network is a feed-forward MLP; sequence models
   (LSTM/GRU/Transformer) are referenced as future work but not
   implemented.
3. Recommendation thresholds are static. Cost-optimised decision
   boundaries are referenced as future work.
4. No uncertainty quantification accompanies the RUL point estimates.