# 05 — Existing Files Reused

This document lists every file from the seven existing phase folders
that the dissertation (or the related documentation in
`00_Repository Analysis/`) reuses. Nothing here is invented or
re-created; the file paths and shapes are taken directly from the
repository.

## 1. Source Data (Phase 1)

| Source file | Used for |
|---|---|
| `01_Data Cleaning & Preprocessing/preprocessing_metadata.json` | The "decisions table" in Chapter 3. |
| `01_Data Cleaning & Preprocessing/descriptive_statistics.csv` | Descriptive statistics callouts in Chapter 3. |
| `01_Data Cleaning & Preprocessing/training_descriptive_stats.csv` | Backup descriptive-statistics source. |
| `01_Data Cleaning & Preprocessing/variance_analysis_train.csv` | Justification for keeping the 21 sensors. |
| `01_Data Cleaning & Preprocessing/outlier_analysis_train.csv` | Justification for choosing `RobustScaler`. |

## 2. Visualisations (Phase 1)

| Source PNG | Used for |
|---|---|
| `visualizations/sensor_distributions.png` | Chapter 3 — sensor distributions. |
| `visualizations/sensor_distributions_histogram.png` | Chapter 3 — backup histogram. |
| `visualizations/sensor_boxplots.png` | Chapter 3 — outlier context. |
| `visualizations/sensor_density_plots.png` | Chapter 3 — distribution shapes. |
| `visualizations/rul_distribution.png` | Chapter 3 — RUL target distribution. |
| `visualizations/sensor_trajectories_engine1.png` | Chapter 3 — degradation example. |
| `visualizations/outlier_detection.png` | Chapter 3 — outlier analysis figure. |
| `visualizations/before_after_scaling.png` | Chapter 3 — scaling effect figure. |

## 3. Feature Engineering (Phase 2)

| Source file | Used for |
|---|---|
| `02_Feature Engineering/README_FEATURE_ENGINEERING.md` | Source narrative for the feature engineering section. |
| `02_Feature Engineering/FEATURE_ENGINEERING_VALIDATION.md` | Validation evidence for the engineered matrix. |
| `02_Feature Engineering/feature_importance_statistical.csv` | Cross-check on SHAP / tree importances. |
| `02_Feature Engineering/ENGINEERED_FEATURES_LIST.txt` | Feature composition table. |

## 4. Model Training (Phase 3)

| Source file | Used for |
|---|---|
| `03_Model Training/run_model_training.py` | Hyperparameter table and per-model "Why suitable" narrative. |
| `03_Model Training/models/training_metadata.json` | The 212 feature names referenced in Chapter 4. |

## 5. RUL Prediction (Phase 4)

| Source file | Used for |
|---|---|
| `04_RUL Prediction/run_rul_prediction.py` | Narrative on the prediction pipeline. |
| `04_RUL Prediction/random_forest_predictions.csv` | Source of the RF prediction column. |
| `04_RUL Prediction/xgboost_predictions.csv` | Source of the XGBoost prediction column. |
| `04_RUL Prediction/neural_network_predictions.csv` | Source of the NN prediction column (used downstream). |

## 6. Performance Evaluation (Phase 5)

| Source file | Used for |
|---|---|
| `05_Performance Evaluation/performance_evaluation/performance_metrics_summary.csv` | Chapter 4 — results table (MAE/MSE/RMSE/R²). |
| `05_Performance Evaluation/performance_evaluation/actual_vs_predicted_rul.png` | Chapter 4 — Figure 4.x. |
| `05_Performance Evaluation/performance_evaluation/prediction_error_distribution.png` | Chapter 4 — Figure 4.x. |
| `05_Performance Evaluation/performance_evaluation/residual_plot.png` | Chapter 4 — Figure 4.x. |
| `05_Performance Evaluation/performance_evaluation/metric_comparison.png` | Chapter 4 — Figure 4.x. |
| `05_Performance Evaluation/performance_evaluation/performance_evaluation_summary.md` | Source narrative for results discussion. |

## 7. Feature Importance (Phase 6)

| Source file | Used for |
|---|---|
| `06_Feature Importance Analysis/feature_importance_analysis/random_forest_feature_importance.csv` | RF importance ranking. |
| `06_Feature Importance Analysis/feature_importance_analysis/xgboost_feature_importance.csv` | XGBoost importance ranking. |
| `06_Feature Importance Analysis/feature_importance_analysis/neural_network_shap_importance.csv` | NN SHAP ranking. |
| `06_Feature Importance Analysis/feature_importance_analysis/combined_feature_importance_comparison.csv` | Cross-model top-20 table. |
| `06_Feature Importance Analysis/feature_importance_analysis/sensor_level_importance_comparison.csv` | Sensor-level aggregated table. |
| `06_Feature Importance Analysis/feature_importance_analysis/random_forest_feature_importance_bar.png` | RF importance figure. |
| `06_Feature Importance Analysis/feature_importance_analysis/xgboost_feature_importance_bar.png` | XGBoost importance figure. |
| `06_Feature Importance Analysis/feature_importance_analysis/neural_network_shap_summary.png` | SHAP summary figure. |
| `06_Feature Importance Analysis/feature_importance_analysis/combined_feature_importance_comparison.png` | Cross-model comparison figure. |
| `06_Feature Importance Analysis/feature_importance_analysis/sensor_level_importance_comparison.png` | Sensor-level ranking figure. |
| `06_Feature Importance Analysis/feature_importance_analysis/feature_importance_summary.md` | Source narrative for the importance section. |

## 8. Maintenance Recommendation (Phase 7)

| Source file | Used for |
|---|---|
| `07_Maintenance Recommendation/run_maintenance_recommendation.py` | Decision-rule narrative in Chapter 5. |
| `07_Maintenance Recommendation/maintenance_recommendations.csv` | Per-engine recommendation table. |
| `07_Maintenance Recommendation/maintenance_summary.csv` | Fleet-level summary table. |
| `07_Maintenance Recommendation/health_status_distribution.png` | Chapter 5 — bar chart. |
| `07_Maintenance Recommendation/rul_distribution.png` | Chapter 5 — histogram. |
| `07_Maintenance Recommendation/maintenance_priority_pie.png` | Chapter 5 — pie chart. |
| `07_Maintenance Recommendation/engine_health_dashboard.png` | Chapter 5 — engine-level dashboard. |
| `07_Maintenance Recommendation/maintenance_workflow.png` | Chapter 5 — workflow diagram. |
| `07_Maintenance Recommendation/maintenance_recommendation_summary.md` | Source narrative for Chapter 5. |

## 9. Per-Phase Status Logs

| Source file | Used for |
|---|---|
| `01_Data Cleaning & Preprocessing/step5_6_status.txt` | Internal cross-reference (driver log). |