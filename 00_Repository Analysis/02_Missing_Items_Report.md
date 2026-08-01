# 02 — Missing Items Report

This report compares what the repository already contains against the
artefacts a typical University-of-Roehampton MSc Computing dissertation
submission is expected to include. Gaps are flagged so the author knows
what additional documentation needs to be written before submission.

## 1. Code & Data — Status

| Item | Present? | Evidence |
|---|---|---|
| Raw source data files | **Missing in repo** (expected) | Drivers fall back gracefully; no `CMAPSSData/` folder exists |
| Cleaned CSV | ✅ | `01_Data Cleaning & Preprocessing/train_FD001_scaled.csv`, `test_FD001_scaled.csv` |
| Engineered CSV | ✅ | `02_Feature Engineering/train_FD001_engineered.csv`, `test_FD001_engineered.csv` |
| Trained models | ✅ | `03_Model Training/models/*.joblib` |
| Prediction CSVs | ✅ | `04_RUL Prediction/*_predictions.csv` |
| Performance metrics | ✅ | `05_Performance Evaluation/performance_evaluation/performance_metrics_summary.csv` |
| Feature importance | ✅ | `06_Feature Importance Analysis/feature_importance_analysis/*.csv` |
| Recommendation tables | ✅ | `07_Maintenance Recommendation/maintenance_*.csv` |

The seven-phase implementation is therefore complete. The gaps below
are documentation, not pipeline gaps.

## 2. Dissertation Documentation — Status

| Item | Present before this analysis? | Where it now lives |
|---|---|---|
| Title page | ❌ | Generated inside the `.docx` |
| Declaration of originality | ❌ | Generated inside the `.docx` |
| Acknowledgements | ❌ | Generated inside the `.docx` |
| Abstract | ❌ | Generated inside the `.docx` |
| Table of Contents (auto) | ❌ | Generated as TOC field in the `.docx` |
| List of Tables / Figures / Abbreviations | ❌ | Generated inside the `.docx` |
| Chapter 1 — Introduction | ❌ | Generated inside the `.docx` |
| Chapter 2 — Literature Review | ❌ | Generated inside the `.docx` |
| Chapter 3 — Methodology | ❌ | Generated inside the `.docx` |
| Chapter 4 — Implementation & Results | ❌ | Generated inside the `.docx` |
| Chapter 5 — Maintenance Recommendation & Conclusion | ❌ | Generated inside the `.docx` |
| References (IEEE) | ❌ | Generated inside the `.docx` |
| Appendix A — Folder Structure Map | ❌ | Generated inside the `.docx` |
| Appendix B — Run Instructions | ❌ | Generated inside the `.docx` |
| Appendix C — Selected CSV excerpts | ❌ | Generated inside the `.docx` |
| Appendix D — Selected PNG figures | ❌ | Generated inside the `.docx` |
| Repository analysis documentation | ❌ | The 10 Markdown files in `00_Repository Analysis/` |
| Submission checklist | ❌ | `00_Repository Analysis/10_Final_Submission_Checklist.md` |

## 3. Research-Quality Gaps

These gaps cannot be filled by writing alone; they would require new
experiments and are listed in
`08_Research_Quality_Recommendations.md`:

* No experiments on FD002–FD004 (multi-operating-condition subsets).
* No sequence-model comparison (LSTM/GRU/Transformer).
* No cost-optimised thresholds; the current thresholds are static.
* No uncertainty quantification (quantile regression, Bayesian NN,
  conformal prediction).
* No baseline comparison against naïve persistence or linear
  regression.

## 4. Publication-Quality Gaps

These gaps are about presentation rather than research:

* No formal list of figures with captions.
* No formal list of tables with captions.
* No formal glossary / list of abbreviations.
* All chapter narratives must be lifted from the existing
  per-phase Markdowns into one coherent document with consistent
  voice and tense.
* Figures and tables need to be referenced inline by number
  (Figure 3.1, Table 4.1, etc.).

## 5. Submission-Packaging Gaps

* No consolidated Turnitin-ready `.pdf`; the `.docx` is generated
  but a final PDF export (with embedded fonts and exact page
  numbers) is still required.
* No cover sheet / submission form (handled by the university
  submission portal, not by the candidate).
* No supervisor sign-off page (handled by the supervisor).

## 6. Items the Repository Already Provides

To make the gap analysis concrete, here is what is *already in the
repository* and reusable without any new runs:

* 25+ CSV tables of engineered features, predictions, metrics and
  importance values.
* 25+ PNG figures covering distributions, scaling, predictions,
  residuals, importance and recommendation dashboards.
* 4 trained `joblib` models (Random Forest, XGBoost, MLP).
* 2 metadata JSONs (preprocessing and training).
* 6 narrative Markdowns (one per major phase) and 4 step-by-step
  phase Markdowns.
* `.gitattributes` for LFS, `.gitignore` for hygiene.

## 7. Recommended Closing Actions

1. Re-export the dissertation to PDF once the `.docx` is finalised.
2. Reconcile every figure and table number with the corresponding
   body reference.
3. Verify the References list against the in-body `[n]` citations.
4. Run the supplied `build_dissertation.py` end-to-end to confirm
   reproducibility.