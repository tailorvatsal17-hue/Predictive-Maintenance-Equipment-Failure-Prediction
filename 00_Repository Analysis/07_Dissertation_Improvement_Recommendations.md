# 07 — Dissertation Improvement Recommendations

These are concrete, actionable improvements that raise the quality of
the dissertation text itself. Each item is traceable back to an
existing artefact in the repository.

## 1. Structure & Voice

* **Use consistent tense.** Past tense for what was done, present tense
  for the current state of the system.
* **One voice per chapter.** Lift every chapter narrative from the
  per-phase Markdowns into a single coherent document so that the
  "we" / "the project" voice is uniform across Chapters 3–5.
* **Reuse the section headings** that already exist in the per-phase
  Markdown ("Why this step is necessary", "Why suitable") as the
  *inspiration* for in-body paragraphs but rewrite them in a more
  academic register.

## 2. Chapter 1 — Introduction

* Anchor the introduction in **two or three concrete consequences**
  of poor maintenance (in-flight disruption, AOG cost, safety) so the
  reader immediately understands the practical relevance.
* State the **three research questions** explicitly and refer to them
  again in Chapter 4 and Chapter 5 conclusions.
* Make sure the scope statement names **FD001** explicitly.

## 3. Chapter 2 — Literature Review

* Group the cited work into **clear sub-sections**: predictive
  maintenance evolution; RUL estimation methods; ML methods for
  time-series degradation; feature engineering for RUL; explainability
  in industrial ML.
* For each cited work, summarise **the contribution** in one sentence
  and **the limitation** in one sentence — this gives the reader a
  route into the methodology chapter.
* Close with a **research-gap paragraph** that directly motivates the
  pipeline implemented in this project.

## 4. Chapter 3 — Methodology

* Use the `preprocessing_metadata.json` file to build a small table
  of removed columns and reasons.
* Use the feature composition numbers (212 total: 18 raw + 26 rolling
  mean + 63 rolling std + 76 lag + 21 delta + 8 cumulative) as a
  table.
* Justify **why** `RobustScaler` was preferred over `StandardScaler`
  using the outlier analysis as evidence.
* State the evaluation metrics and their formulae.

## 5. Chapter 4 — Implementation & Results

* Open with a one-paragraph **training environment** note (Python
  version, library versions, hardware if relevant).
* Present the three models in a **parallel format**: hyperparameters
  table → commentary → results.
* Use the **performance_metrics_summary.csv** numbers verbatim:
  NN MAE 17.4117, RMSE 26.3870, R² 0.5968; XGB MAE 19.5924, RMSE
  26.6438, R² 0.5889; RF MAE 20.0495, RMSE 26.9726, R² 0.5787.
* Embed the four PNG figures from Phase 5 with **figure captions** that
  explain what the reader should take from them.
* For feature importance, present the **top four** features
  (`Sensor_9_cumulative_delta`, `Sensor_4_rolling_mean_5`,
  `Sensor_3_rolling_mean_10`, `Sensor_6_cumulative_delta`) and then
  the **top-10 sensor-level** ranking.

## 6. Chapter 5 — Maintenance Recommendation & Conclusion

* Restate the decision rule as a small table.
* Reproduce the bucket counts (24 / 42 / 15 / 19) and the average
  predicted RUL (81.88 cycles).
* Walk through **two or three concrete engine cases** drawn from
  `maintenance_recommendations.csv`.
* Use the dashboard PNG as a single fleet-level visualisation.
* Close with **limitations**, **future work**, and a **reflection**
  paragraph.

## 7. References

* Format **all** in-text citations as `[n]` and the bibliography in
  IEEE style. Do not use author–date style in the body.
* The reference list in the dissertation `.docx` mirrors the list in
  `01_Repository_Analysis_Report.md` § IEEE References.

## 8. Appendices

* Appendix A — folder-structure map (lifted from
  `03_Folder_Structure.md`).
* Appendix B — phase-by-phase run instructions (lifted from each
  driver's docstring).
* Appendix C — short CSV excerpts of the engineered feature list, the
  metrics summary, and the recommendation table.
* Appendix D — selected PNG figures (those most cited in the body).

## 9. Presentation Polish

* Add a **cover page** with the project title, author name, student
  ID, supervisor (if known), programme, institution and submission
  date.
* Add a **declaration of originality** confirming the work is the
  author's own.
* Add **acknowledgements** (template: supervisor, family,
  peers).
* Include a **list of tables** and a **list of figures** with their
  full captions.
* Include a **list of abbreviations** (CMAPSS, RUL, RF, XGB, NN,
  SHAP, FD001, MAE, MSE, RMSE, R², MLP, IQR).
* Keep the **page-number footer** on every page from the abstract
  onwards.

## 10. Things That Should NOT Be Added

* No invented metrics.
* No invented figures.
* No invented references.
* No new model runs.