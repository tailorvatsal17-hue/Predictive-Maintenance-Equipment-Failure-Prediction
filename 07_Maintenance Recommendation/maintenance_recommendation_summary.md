# Maintenance Recommendation Summary

**Project Title:** Predictive Maintenance and Equipment Failure Prediction Using the NASA Turbofan Engine Dataset  
**Phase:** 7 — Maintenance Recommendation (final phase)  
**Primary Recommendation Source:** Neural Network (best-performing model in Phase 5 evaluation)

## 1. Purpose of Predictive Maintenance

Predictive maintenance aims to anticipate equipment failures before they occur, so that interventions can be scheduled when they are most cost-effective and least disruptive. By translating Remaining Useful Life (RUL) predictions into concrete maintenance actions, organisations can avoid unplanned downtime, extend asset life, and improve safety.

## 2. How Recommendations Were Generated

1. The trained Neural Network model (Phase 3) was used to predict RUL on the    test fleet (Phase 4).
2. Each engine's predicted RUL was classified using the rule table below.
3. A recommendation, priority and explanation were assigned to every engine.
4. The fleet was visualised and summarised for downstream decision-making.

| Predicted RUL (cycles) | Health Status                    | Recommended Action            |
|------------------------|----------------------------------|-------------------------------|
| > 120                  | Healthy                          | Continue normal operation     |
| 61 – 120               | Schedule Maintenance             | Schedule preventive maintenance|
| 31 – 60                | Maintenance Required Soon        | Plan maintenance              |
| ≤ 30                   | Immediate Inspection Required    | Inspect immediately           |

## 3. Why the Neural Network Was Used

Three regression models were trained in Phase 3 (Random Forest, XGBoost, Neural Network) and evaluated in Phase 5. The Neural Network produced the lowest MAE and RMSE and the highest R² on the test set, and is therefore the most accurate source of RUL estimates.

On the held-out test set, the Neural Network achieved an MAE of 17.41 cycles, an RMSE of 26.39 cycles and an R² of 0.597. It is therefore the most reliable estimator of RUL in this project and was chosen as the recommendation source.

## 4. Fleet-Level Outcomes

- **Total engines evaluated:** 100
- **Healthy:** 24
- **Schedule Maintenance:** 42
- **Maintenance Required Soon:** 15
- **Immediate Inspection Required:** 19
- **Average predicted RUL:** 81.88 cycles
- **Lowest predicted RUL:** 2.67 cycles
- **Highest predicted RUL:** 202.03 cycles

## 5. Benefits to Maintenance Engineers

- Replaces calendar-based maintenance with condition-based scheduling.
- Highlights the engines that need immediate attention.
- Provides a clear, auditable reason for every maintenance decision.
- Helps prioritise parts, labour and hangar slots.

## 6. Benefits to Airlines

- Reduces in-flight disruptions caused by unscheduled engine events.
- Lowers the cost of unscheduled removals and AOG (Aircraft-on-Ground) events.
- Improves fleet availability and on-time performance.
- Supports evidence-based conversations with regulators and OEMs.

## 7. Benefits to Industry

- Demonstrates a reproducible ML pipeline that can be applied to other   turbofan fleets (FD002–FD004) and to non-aerospace rotating equipment.
- Provides a template for integrating ML-driven RUL into existing Computer   Maintenance Management Systems (CMMS).
- Encourages data-driven maintenance culture across the organisation.

## 8. Business Impact

By prioritising maintenance only on engines that genuinely need it, the operator avoids the two failure modes of a poor maintenance strategy: over-maintenance (cost, downtime) and under-maintenance (failure, safety risk). The rule-based classifier makes the model's output easy to defend in operational reviews and regulatory audits.

## 9. Future Improvements

- Train on multiple CMAPSS sub-datasets (FD002–FD004) to generalise across   operating conditions.
- Use sequence models (LSTM, GRU, Transformer) to ingest raw cycle streams   directly.
- Replace static RUL thresholds with cost-optimised decision boundaries.
- Integrate the recommendation engine with a live CMMS via REST APIs.
- Add uncertainty quantification (e.g. quantile regression, Bayesian NNs)   to flag low-confidence predictions for human review.

## 10. Output Artefacts

- `maintenance_recommendations.csv` — per-engine recommendation table.
- `maintenance_summary.csv` — fleet-level summary statistics.
- `health_status_distribution.png` — bar chart of engine status counts.
- `rul_distribution.png` — histogram of RUL values coloured by category.
- `maintenance_priority_pie.png` — pie chart of priority distribution.
- `engine_health_dashboard.png` — colour-coded dashboard of all engines.
- `maintenance_workflow.png` — pipeline workflow diagram.
- `maintenance_recommendation_summary.md` — this document.

## 11. Pipeline Completion

Raw NASA Dataset → Data Cleaning & Preprocessing → Feature Engineering → Model Training → RUL Prediction → Performance Evaluation → Feature Importance Analysis → **Maintenance Recommendation** ✓

**MSc Project Successfully Completed.**
