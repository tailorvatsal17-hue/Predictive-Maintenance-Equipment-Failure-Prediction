# 03 — Folder Structure

This document lists every folder and file in the project, with a short
explanation for each. The tree was taken directly from the repository
on 2026-07-31.

## 1. Top-Level Layout

```
data_cleaning/
├── .git/                                  Git internals
├── .gitattributes                         Registers *.joblib as Git LFS
├── .gitignore                             Excludes caches, pickles, PNGs, metadata JSONs
├── 00_Repository Analysis/                New: analysis & dissertation documentation
├── 01_Data Cleaning & Preprocessing/      Phase 1
├── 02_Feature Engineering/                Phase 2
├── 03_Model Training/                     Phase 3
├── 04_RUL Prediction/                     Phase 4
├── 05_Performance Evaluation/             Phase 5
├── 06_Feature Importance Analysis/        Phase 6
└── 07_Maintenance Recommendation/         Phase 7
```

There is no `CMAPSSData/` folder; the raw `.txt` files are expected
locally and the scripts fall back gracefully.

## 2. `00_Repository Analysis/` (new)

| File | Purpose |
|---|---|
| `00_README.md` | Index of this folder. |
| `01_Repository_Analysis_Report.md` | Phase-by-phase technical walkthrough. |
| `02_Missing_Items_Report.md` | Gap analysis vs. submission requirements. |
| `03_Folder_Structure.md` | This document. |
| `04_Project_Architecture.md` | Pipeline diagram and data flow. |
| `05_Existing_Files_Reused.md` | Inventory of reused CSVs/PNGs/MDs. |
| `06_Newly_Generated_Documentation.md` | Index of newly added files. |
| `07_Dissertation_Improvement_Recommendations.md` | Actionable dissertation improvements. |
| `08_Research_Quality_Recommendations.md` | Research-methodology improvements. |
| `09_Publication_Quality_Recommendations.md` | Writing/figure polish. |
| `10_Final_Submission_Checklist.md` | Pre-submission checklist. |
| `build_dissertation.py` | Generates the dissertation `.docx`. |
| `*.docx` | Final dissertation artefact. |

## 3. `01_Data Cleaning & Preprocessing/`

### Scripts
| File | Purpose |
|---|---|
| `run_all_preprocessing.py` | Master driver — calls the six numbered scripts in order. |
| `01_data_loading_and_exploration.py` | Loads the three `.txt` files, assigns column names, prints shapes. |
| `02_data_types_and_missing_values.py` | Validates types and confirms 0% missing values. |
| `03_duplicates_and_constant_columns.py` | Confirms 0 duplicates; flags `Op_Setting_1/2/3` as constant. |
| `04_descriptive_statistics_and_distributions.py` | Mean / median / std / skewness / kurtosis + distribution PNGs. |
| `05_outlier_detection_and_analysis.py` | Per-sensor IQR-based outlier counts and PNG. |
| `06_final_scaling_and_preprocessing.py` | Removes 5 columns, fits `RobustScaler`, saves scaled CSVs. |
| `step5_6_status.txt` | Status log produced by the driver (re-run note). |

### Data outputs
| File | Purpose |
|---|---|
| `train_FD001_loaded.csv`, `test_FD001_loaded.csv`, `rul_FD001_loaded.csv` | Loaded raw data with named columns. |
| `train_FD001_scaled.csv`, `test_FD001_scaled.csv` | Final scaled 21-sensor matrices. |
| `train_FD001_reference.csv`, `test_FD001_reference.csv` | Identifier + time kept for downstream phases. |
| `RUL_FD001_reference.csv` | Ground-truth RUL values. |
| `train_reference.csv`, `test_reference.csv`, `rul_reference.csv` | Earlier reference copies. |
| `robust_scaler.pkl` | Fitted `RobustScaler` object. |
| `preprocessing_metadata.json` | Decisions log (removed/kept columns, scaler method). |

### Statistics CSVs
* `descriptive_statistics.csv`
* `training_descriptive_stats.csv`
* `training_additional_stats.csv`
* `variance_analysis_train.csv`
* `variance_analysis_test.csv`
* `outlier_analysis_train.csv`
* `outlier_analysis_test.csv`

### Visualisations
* `visualizations/sensor_distributions.png`
* `visualizations/sensor_distributions_histogram.png`
* `visualizations/sensor_boxplots.png`
* `visualizations/sensor_density_plots.png`
* `visualizations/rul_distribution.png`
* `visualizations/sensor_trajectories_engine1.png`
* `visualizations/outlier_detection.png`
* `visualizations/before_after_scaling.png`

## 4. `02_Feature Engineering/`

| File | Purpose |
|---|---|
| `run_all_feature_engineering.py` | Master driver. |
| `01_feature_engineering_rul_creation.py` | Reverses `Time_Cycles` to produce per-cycle RUL. |
| `02_feature_engineering_timeseries.py` | Rolling mean/std, lag, delta, cumulative-delta features. |
| `03_feature_engineering_selection.py` | Pearson correlation filter (`|r| > 0.95`). |
| `04_feature_engineering_validation.py` | Final validation of the engineered matrix. |
| `train_FD001_with_rul.csv` | Post-RUL-creation intermediate. |
| `train_FD001_with_timeseries_features.csv` | Post-timeseries intermediate. |
| `train_FD001_engineered_final.csv` | Post-selection intermediate. |
| `train_FD001_engineered.csv` | Final training matrix (20631 × 215). |
| `test_FD001_engineered.csv` | Final test matrix (13096 × 215). |
| `feature_importance_statistical.csv` | Correlation of each feature with RUL. |
| `ENGINEERED_FEATURES_LIST.txt` | Plain-text feature list. |
| `README_FEATURE_ENGINEERING.md` | Narrative documentation of the feature engineering phase. |
| `FEATURE_ENGINEERING_VALIDATION.md` | Validation report. |

## 5. `03_Model Training/`

| File | Purpose |
|---|---|
| `run_model_training.py` | Trains RF, XGBoost and NN; saves joblib artefacts. |
| `models/random_forest_rul.joblib` | Trained RF (large, stored via Git LFS). |
| `models/xgboost_rul.joblib` | Trained XGBoost. |
| `models/neural_network_rul.joblib` | Trained MLP. |
| `models/training_metadata.json` | 212 feature names + target column. |

## 6. `04_RUL Prediction/`

| File | Purpose |
|---|---|
| `run_rul_prediction.py` | Loads each model, predicts last-cycle RUL per engine. |
| `random_forest_predictions.csv` | 100 × 3 predictions. |
| `xgboost_predictions.csv` | 100 × 3 predictions. |
| `neural_network_predictions.csv` | 100 × 3 predictions. |

## 7. `05_Performance Evaluation/`

| File | Purpose |
|---|---|
| `run_performance_evaluation.py` | Computes MAE/MSE/RMSE/R²; saves CSV and PNGs. |
| `performance_evaluation/performance_metrics_summary.csv` | MAE/MSE/RMSE/R² per model. |
| `performance_evaluation/performance_evaluation_summary.md` | Narrative summary. |
| `performance_evaluation/actual_vs_predicted_rul.png` | Scatter plot. |
| `performance_evaluation/prediction_error_distribution.png` | Residual density per model. |
| `performance_evaluation/residual_plot.png` | Residual vs actual. |
| `performance_evaluation/metric_comparison.png` | Bar comparison. |

## 8. `06_Feature Importance Analysis/`

| File | Purpose |
|---|---|
| `run_feature_importance_analysis.py` | Computes importances for RF/XGB and SHAP for NN. |
| `feature_importance_analysis/random_forest_feature_importance.csv` | All 212 features, normalised. |
| `feature_importance_analysis/xgboost_feature_importance.csv` | Same, for XGBoost. |
| `feature_importance_analysis/neural_network_shap_importance.csv` | Mean-abs SHAP per feature. |
| `feature_importance_analysis/combined_feature_importance_comparison.csv` | Top-20 union of features. |
| `feature_importance_analysis/sensor_level_importance_comparison.csv` | Aggregated per base sensor. |
| `feature_importance_analysis/random_forest_feature_importance_bar.png` | Bar plot. |
| `feature_importance_analysis/xgboost_feature_importance_bar.png` | Bar plot. |
| `feature_importance_analysis/neural_network_shap_summary.png` | SHAP summary plot. |
| `feature_importance_analysis/combined_feature_importance_comparison.png` | Multi-model comparison plot. |
| `feature_importance_analysis/sensor_level_importance_comparison.png` | Sensor-level ranking plot. |
| `feature_importance_analysis/feature_importance_summary.md` | Narrative summary. |

## 9. `07_Maintenance Recommendation/`

| File | Purpose |
|---|---|
| `run_maintenance_recommendation.py` | Loads NN predictions; applies four-bin decision rule. |
| `maintenance_recommendations.csv` | 100 × N per-engine table. |
| `maintenance_summary.csv` | Fleet-level counts per bucket. |
| `health_status_distribution.png` | Bar chart. |
| `rul_distribution.png` | Histogram coloured by bucket. |
| `maintenance_priority_pie.png` | Pie chart. |
| `engine_health_dashboard.png` | Colour-coded dashboard. |
| `maintenance_workflow.png` | Pipeline workflow diagram. |
| `maintenance_recommendation_summary.md` | Narrative summary. |

## 10. Generated-by-Build Files (excluded from source control)

These appear in working copies but are listed by `.gitignore`:

* `__pycache__/`
* `*.pkl`, `*.joblib` (when regenerated, although `.gitattributes`
  still tracks the canonical copies via LFS)
* `*.png` / `*.jpg` / `*.jpeg` (ignored by `.gitignore` but kept on
  disk for use by the dissertation)