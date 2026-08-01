# 08 — Research Quality Recommendations

These recommendations go beyond presentation polish and target the
research methodology itself. They require either additional experiments
or additional documentation around the methodology.

## 1. Generalisation

* **Repeat the experiment on FD002, FD003, FD004.** The current
  pipeline is exercised only on FD001, which has constant operating
  conditions. FD002 and FD004 add six operating conditions; FD003
  adds a single fault mode. Running the same pipeline on these
  subsets would strengthen the claim that the approach generalises.
* The current pipeline already removes `Op_Setting_1/2/3`. For
  FD002/FD004 these columns would have to be re-introduced as
  features, so the architecture is *almost* ready.

## 2. Baseline Comparison

* Add a **naïve persistence baseline** that predicts
  `RUL = constant` (e.g. the mean RUL on the training set) and a
  **linear regression baseline** that uses only the scaled sensor
  matrix. The MAE / RMSE / R² of these baselines would contextualise
  the current results.

## 3. Sequence Models

* Add **LSTM**, **GRU** and a small **Transformer** that consume the
  raw cycle stream per engine (rather than the engineered
  flat-features matrix). The current SHAP analysis can still
  accompany the tree models, and a separate attention-heatmap
  analysis can accompany the Transformer.
* Report the same metrics (MAE, RMSE, R²) on the same test fleet so
  the comparison is apples-to-apples.

## 4. Hyperparameter Search

* The three models were trained with **hand-picked** hyperparameters.
  Document a small grid search (or a Bayesian search) that
  justifies the chosen values. If a grid search is too expensive for
  the dissertation timeline, at least document the alternatives that
  were considered and the reason for the final choice.

## 5. Threshold Optimisation

* The decision rule in `07_Maintenance Recommendation/run_maintenance_recommendation.py`
  uses static thresholds (≤30 / 31–60 / 61–120 / >120). These were
  chosen for clarity rather than cost optimisation. A small
  optimisation against a synthetic cost model (cost of
  missed-failure vs. cost of false alarm) would let the dissertation
  defend the rule on economic grounds.

## 6. Uncertainty Quantification

* Add **quantile regression** (e.g. LightGBM quantile regressor) or
  **conformal prediction** so that every prediction has a confidence
  interval. This is particularly important for predictive
  maintenance, where over-confident predictions can be dangerous.

## 7. Cross-Validation

* The current pipeline uses a single train / test split defined by
  the CMAPSS authors. Add **engine-grouped k-fold cross-validation**
  on the training set, report the mean and standard deviation of the
  metrics across folds, and discuss the variance.

## 8. Data Leakage Audit

* The engineered features include rolling statistics and lag
  features. For the **last observed cycle**, lag-1, lag-2 etc. are
  valid (the cycles exist). Document this in the methodology so the
  reader is not left wondering whether there is leakage.

## 9. Reproducibility

* Add a **`requirements.txt`** (or `pyproject.toml`) pinning the
  Python version and the libraries (`pandas`, `numpy`, `scikit-learn`,
  `xgboost`, `shap`, `matplotlib`, `seaborn`, `joblib`).
* Add a **seed file** that sets `numpy.random.seed(42)` and the
  Python hash seed so runs are bit-identical.

## 10. Statistical Tests

* If new comparisons are added, use **paired statistical tests**
  (e.g. Diebold–Mariano, or a Wilcoxon signed-rank on per-engine
  absolute errors) to confirm that one model is significantly better
  than another, rather than relying on the small absolute difference
  in MAE.