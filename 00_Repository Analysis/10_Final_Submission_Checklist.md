# 10 — Final Submission Checklist

Run through this list before submitting the dissertation to the
University of Roehampton submission portal.

## 1. Document

* [ ] Cover page complete (title, author, student ID, programme,
  institution, supervisor, date).
* [ ] Declaration of originality signed and dated.
* [ ] Acknowledgements included.
* [ ] Abstract present, single paragraph, ~250 words.
* [ ] Table of Contents generated (right-click → Update Field).
* [ ] List of Tables generated and consistent with body numbering.
* [ ] List of Figures generated and consistent with body numbering.
* [ ] List of Abbreviations included (CMAPSS, RUL, RF, XGB, NN,
  SHAP, FD001, MAE, MSE, RMSE, R², MLP, IQR, MSE).
* [ ] Chapter 1 (Introduction) — research questions stated.
* [ ] Chapter 2 (Literature Review) — research gap paragraph
  present.
* [ ] Chapter 3 (Methodology) — decisions table for preprocessing,
  feature composition table.
* [ ] Chapter 4 (Implementation & Results) — three-model results
  table, four performance figures, importance tables and figures.
* [ ] Chapter 5 (Maintenance Recommendation & Conclusion) —
  decision-rule table, fleet summary, dashboard figure, future
  work, limitations.
* [ ] References list in IEEE style; every `[n]` in body appears
  in the list.
* [ ] Appendices A (folder structure), B (run instructions),
  C (CSV excerpts), D (PNG figures).

## 2. Page Setup

* [ ] A4 paper size.
* [ ] Margins 2.54 cm.
* [ ] Times New Roman 12 pt body.
* [ ] 1.5 line spacing.
* [ ] Justified text.
* [ ] Page numbers on every page from the abstract onwards.

## 3. Figures & Tables

* [ ] Every figure has a caption and a body reference.
* [ ] Every table has a caption and a body reference.
* [ ] Figures are at 300 dpi or vector format.
* [ ] No figure or table is referenced in the body but missing.

## 4. Cross-References

* [ ] Every `[n]` citation in the body has a matching reference.
* [ ] Every reference is cited at least once in the body.
* [ ] Figure numbers (Figure 3.1, Figure 4.1, …) are sequential.
* [ ] Table numbers (Table 3.1, Table 4.1, …) are sequential.

## 5. Numerical Accuracy

* [ ] MAE 17.4117 for Neural Network.
* [ ] RMSE 26.3870 for Neural Network.
* [ ] R² 0.5968 for Neural Network.
* [ ] XGBoost MAE 19.5924, RMSE 26.6438, R² 0.5889.
* [ ] Random Forest MAE 20.0495, RMSE 26.9726, R² 0.5787.
* [ ] Bucket counts: 24 Healthy, 42 Schedule, 15 Required Soon, 19
  Immediate Inspection.
* [ ] Average predicted RUL 81.88 cycles.
* [ ] Top features `Sensor_9_cumulative_delta`,
  `Sensor_4_rolling_mean_5`, `Sensor_3_rolling_mean_10`,
  `Sensor_6_cumulative_delta`.

## 6. Reproducibility

* [ ] The seven drivers in numerical order reproduce every artefact.
* [ ] `requirements.txt` (or equivalent) pins library versions.
* [ ] No hard-coded user paths exist in any of the 16 scripts.

## 7. Submission Portal

* [ ] `.docx` uploaded.
* [ ] `.pdf` exported from the final `.docx` uploaded (if required).
* [ ] Filename matches the portal specification.
* [ ] Cover sheet / supervisor sign-off (handled outside this
  document).

## 8. Backup

* [ ] Local copy of the final `.docx` archived.
* [ ] Repository tagged with the submission version.
* [ ] Git LFS objects pushed (`*.joblib` artefacts).
* [ ] `00_Repository Analysis/` folder committed.