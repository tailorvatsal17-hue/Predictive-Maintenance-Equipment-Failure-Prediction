"""
=====================================================================================
MAINTENANCE RECOMMENDATION & CONCLUSION
=====================================================================================

MSc Computing Dissertation
Project: Predictive Maintenance and Equipment Failure Prediction
         Using the NASA Turbofan Engine Dataset (FD001)

PHASE 7 (FINAL) — Maintenance Recommendation
-------------------------------------------------------------------------------------
This script consumes the predicted Remaining Useful Life (RUL) values produced by
Phase 4 (RUL Prediction) and translates them into actionable maintenance
recommendations.

It does NOT retrain or modify any previous phase. It is a pure post-processing
stage that produces:
  * a per-engine recommendation table
  * a fleet-level maintenance summary
  * professional visualisations
  * a dissertation-ready Markdown summary
  * a workflow diagram

All outputs are saved inside the project's
``07_Maintenance Recommendation/`` folder using dynamic paths so the script
runs on any computer.
=====================================================================================
"""

from __future__ import annotations

# ----------------------------------------------------------------------------
# Imports
# ----------------------------------------------------------------------------
import sys
import warnings
from pathlib import Path

import numpy as np
import pandas as pd
import matplotlib

matplotlib.use("Agg")  # non-interactive backend — safe for headless runs
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch

warnings.filterwarnings("ignore")

# ----------------------------------------------------------------------------
# Dynamic project paths — work on any computer
# ----------------------------------------------------------------------------
SCRIPT_DIR = Path(__file__).resolve().parent          # this phase folder
PROJECT_DIR = SCRIPT_DIR.parent                       # data_cleaning root
PHASE4_DIR = PROJECT_DIR / "04_RUL Prediction"        # predictions live there
PHASE5_DIR = PROJECT_DIR / "05_Performance Evaluation"

# Output folder for this phase is the phase folder itself.
OUTPUT_DIR = SCRIPT_DIR
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# ----------------------------------------------------------------------------
# Maintenance decision rules
# ----------------------------------------------------------------------------
# These thresholds are documented in the dissertation and are easy to tune
# later if business rules change. They follow the standard
# Remaining Useful Life binning used in predictive-maintenance research.
HEALTHY_MAX = 120.0          # RUL > 120   -> Healthy
SCHEDULE_MAX = 60.0          # 61–120      -> Schedule Maintenance
REQUIRED_MAX = 30.0          # 31–60       -> Maintenance Required Soon
# RUL <= 30                   -> Immediate Inspection Required

HEALTH_THRESHOLDS = [
    (HEALTHY_MAX, "Healthy", "Continue normal operation",
     "Low", "Engine operates within healthy parameters; continue routine monitoring."),
    (SCHEDULE_MAX, "Schedule Maintenance", "Schedule preventive maintenance",
     "Medium", "Plan maintenance in the upcoming maintenance window to prevent escalation."),
    (REQUIRED_MAX, "Maintenance Required Soon", "Plan maintenance",
     "High", "Schedule maintenance promptly to avoid imminent failure risk."),
    (-np.inf, "Immediate Inspection Required", "Inspect immediately",
     "Critical", "RUL is critically low; immediate inspection is required to prevent failure."),
]

# Priority colours used across every visualisation for a consistent look.
PRIORITY_COLOURS = {
    "Healthy": "#2ca02c",                       # green
    "Schedule Maintenance": "#ffd700",          # amber / yellow
    "Maintenance Required Soon": "#ff7f0e",     # orange
    "Immediate Inspection Required": "#d62728", # red
}


# ----------------------------------------------------------------------------
# Helper functions
# ----------------------------------------------------------------------------
def classify_rul(rul: float) -> dict:
    """Return the maintenance classification for a single RUL value.

    The function selects the *first* matching rule from HEALTH_THRESHOLDS,
    which is ordered from most-restrictive (high RUL) to least-restrictive.
    """
    for upper_bound, status, action, priority, explanation in HEALTH_THRESHOLDS:
        if rul > upper_bound:
            return {
                "Health_Status": status,
                "Recommended_Action": action,
                "Priority": priority,
                "Explanation": explanation,
            }
    # Defensive fallback (cannot occur given the -inf final rule).
    return {
        "Health_Status": "Unknown",
        "Recommended_Action": "Manual review",
        "Priority": "Unknown",
        "Explanation": "Rule set did not match the RUL value.",
    }


def load_predictions(pred_file: Path) -> pd.DataFrame:
    """Load a prediction CSV and verify it contains the expected columns."""
    if not pred_file.exists():
        raise FileNotFoundError(
            f"Prediction file not found: {pred_file}\n"
            "Make sure Phase 4 (RUL Prediction) has been executed."
        )
    df = pd.read_csv(pred_file)
    required = {"Unit_Number", "Predicted_RUL"}
    missing = required - set(df.columns)
    if missing:
        raise ValueError(
            f"Prediction file {pred_file.name} is missing columns: {sorted(missing)}"
        )
    return df


# ----------------------------------------------------------------------------
# Step 1 — Load predictions
# ----------------------------------------------------------------------------
print("=" * 80)
print("STEP 1: LOADING PREDICTIONS")
print("=" * 80)

# The dissertation established the Neural Network as the most accurate model,
# so we use its predictions as the primary recommendation source. We also load
# the other models for reference and so they appear in the documentation.
NN_PRED_FILE = PHASE4_DIR / "neural_network_predictions.csv"
RF_PRED_FILE = PHASE4_DIR / "random_forest_predictions.csv"
XGB_PRED_FILE = PHASE4_DIR / "xgboost_predictions.csv"

try:
    nn_df = load_predictions(NN_PRED_FILE)
    rf_df = load_predictions(RF_PRED_FILE)
    xgb_df = load_predictions(XGB_PRED_FILE)
except FileNotFoundError as e:
    print(f"[ERROR] {e}")
    sys.exit(1)

print(f"[OK] Loaded Neural Network predictions: {nn_df.shape}")
print(f"[OK] Loaded Random Forest predictions: {rf_df.shape}")
print(f"[OK] Loaded XGBoost predictions:        {xgb_df.shape}")
print()
print("Sample (Neural Network) — first 5 rows:")
print(nn_df.head().to_string(index=False))
print()

# ----------------------------------------------------------------------------
# Step 2 — Apply maintenance decision rules
# ----------------------------------------------------------------------------
print("=" * 80)
print("STEP 2: APPLYING MAINTENANCE DECISION RULES")
print("=" * 80)
print("Decision rules (Predicted RUL in cycles):")
print("  > 120              -> Healthy")
print("  61 – 120           -> Schedule Maintenance")
print("  31 – 60            -> Maintenance Required Soon")
print("  <= 30              -> Immediate Inspection Required")
print()

# Build the primary recommendation table from the NN predictions
rec_df = nn_df[["Unit_Number", "Predicted_RUL"]].copy()
classifications = rec_df["Predicted_RUL"].apply(classify_rul).apply(pd.Series)
rec_df = pd.concat([rec_df, classifications], axis=1)

# Reorder columns to match the dissertation table
rec_df = rec_df[[
    "Unit_Number",
    "Predicted_RUL",
    "Health_Status",
    "Recommended_Action",
    "Priority",
    "Explanation",
]]
rec_df["Predicted_RUL"] = rec_df["Predicted_RUL"].round(2)

print(f"[OK] Classified {len(rec_df)} engines")
print()
print("Sample recommendations — first 5 engines:")
print(rec_df.head().to_string(index=False))
print()

# ----------------------------------------------------------------------------
# Step 3 — Save the per-engine recommendation table
# ----------------------------------------------------------------------------
print("=" * 80)
print("STEP 3: SAVING MAINTENANCE RECOMMENDATION TABLE")
print("=" * 80)

REC_TABLE_FILE = OUTPUT_DIR / "maintenance_recommendations.csv"
rec_df.to_csv(REC_TABLE_FILE, index=False)
print(f"[OK] Saved: {REC_TABLE_FILE}")
print(f"     Rows : {len(rec_df)}")
print(f"     Size : {REC_TABLE_FILE.stat().st_size / 1024:.2f} KB")
print()

# ----------------------------------------------------------------------------
# Step 4 — Fleet-level summary statistics
# ----------------------------------------------------------------------------
print("=" * 80)
print("STEP 4: COMPUTING FLEET-LEVEL SUMMARY STATISTICS")
print("=" * 80)

status_counts = rec_df["Health_Status"].value_counts().to_dict()
# Make sure every status appears in the summary, even if zero
for _, status, _, _, _ in HEALTH_THRESHOLDS:
    status_counts.setdefault(status, 0)

priority_counts = rec_df["Priority"].value_counts().to_dict()

summary_records = [
    ("Total engines", len(rec_df)),
    ("Healthy engines", status_counts["Healthy"]),
    ("Schedule Maintenance engines", status_counts["Schedule Maintenance"]),
    ("Maintenance Required engines", status_counts["Maintenance Required Soon"]),
    ("Immediate Inspection engines", status_counts["Immediate Inspection Required"]),
    ("Average predicted RUL (cycles)", round(rec_df["Predicted_RUL"].mean(), 2)),
    ("Highest predicted RUL (cycles)", round(rec_df["Predicted_RUL"].max(), 2)),
    ("Lowest predicted RUL (cycles)", round(rec_df["Predicted_RUL"].min(), 2)),
    ("Standard deviation of predicted RUL (cycles)",
     round(rec_df["Predicted_RUL"].std(), 2)),
    ("Median predicted RUL (cycles)", round(rec_df["Predicted_RUL"].median(), 2)),
]
summary_df = pd.DataFrame(summary_records, columns=["Metric", "Value"])

SUMMARY_FILE = OUTPUT_DIR / "maintenance_summary.csv"
summary_df.to_csv(SUMMARY_FILE, index=False)
print(f"[OK] Saved: {SUMMARY_FILE}")
print()
print("Summary table:")
print(summary_df.to_string(index=False))
print()

# ----------------------------------------------------------------------------
# Step 5 — Visualisations
# ----------------------------------------------------------------------------
print("=" * 80)
print("STEP 5: GENERATING VISUALISATIONS")
print("=" * 80)

# Common plotting style
plt.rcParams.update({
    "figure.facecolor": "white",
    "axes.facecolor": "white",
    "axes.edgecolor": "#444444",
    "axes.labelcolor": "#222222",
    "xtick.color": "#222222",
    "ytick.color": "#222222",
    "axes.titleweight": "bold",
    "font.size": 11,
})

status_order = [
    "Healthy",
    "Schedule Maintenance",
    "Maintenance Required Soon",
    "Immediate Inspection Required",
]

# ------------------------------------------------------------------
# 5.1 — Health Status Distribution (bar chart)
# ------------------------------------------------------------------
status_series = rec_df["Health_Status"].value_counts().reindex(status_order, fill_value=0)
colours = [PRIORITY_COLOURS[s] for s in status_series.index]

fig, ax = plt.subplots(figsize=(10, 6))
bars = ax.bar(status_series.index, status_series.values, color=colours,
              edgecolor="black", linewidth=0.6)
ax.set_title("Engine Health Status Distribution", fontsize=14)
ax.set_xlabel("Health Status")
ax.set_ylabel("Number of Engines")
ax.grid(True, alpha=0.3, axis="y")
ax.tick_params(axis="x", labelrotation=15)
for bar, value in zip(bars, status_series.values):
    ax.text(bar.get_x() + bar.get_width() / 2,
            bar.get_height() + max(status_series.values) * 0.01,
            f"{int(value)}",
            ha="center", va="bottom", fontsize=11, fontweight="bold")
fig.tight_layout()
HEALTH_BAR_FILE = OUTPUT_DIR / "health_status_distribution.png"
fig.savefig(HEALTH_BAR_FILE, dpi=300, bbox_inches="tight")
plt.close(fig)
print(f"[OK] Saved: {HEALTH_BAR_FILE.name}")

# ------------------------------------------------------------------
# 5.2 — RUL Distribution by Category (stacked histogram)
# ------------------------------------------------------------------
fig, ax = plt.subplots(figsize=(11, 6))
for status in status_order:
    subset = rec_df.loc[rec_df["Health_Status"] == status, "Predicted_RUL"]
    if subset.empty:
        continue
    ax.hist(subset, bins=12, alpha=0.85,
            label=status, color=PRIORITY_COLOURS[status],
            edgecolor="black", linewidth=0.6)

ax.set_title("Predicted RUL Distribution by Health Category", fontsize=14)
ax.set_xlabel("Predicted RUL (cycles)")
ax.set_ylabel("Number of Engines")
ax.axvline(HEALTHY_MAX, color=PRIORITY_COLOURS["Healthy"],
           linestyle="--", linewidth=1.5, label="Healthy / Schedule boundary")
ax.axvline(SCHEDULE_MAX, color=PRIORITY_COLOURS["Schedule Maintenance"],
           linestyle="--", linewidth=1.5, label="Schedule / Required boundary")
ax.axvline(REQUIRED_MAX, color=PRIORITY_COLOURS["Maintenance Required Soon"],
           linestyle="--", linewidth=1.5, label="Required / Immediate boundary")
ax.legend(loc="upper right", fontsize=9)
ax.grid(True, alpha=0.3, axis="y")
fig.tight_layout()
RUL_HIST_FILE = OUTPUT_DIR / "rul_distribution.png"
fig.savefig(RUL_HIST_FILE, dpi=300, bbox_inches="tight")
plt.close(fig)
print(f"[OK] Saved: {RUL_HIST_FILE.name}")

# ------------------------------------------------------------------
# 5.3 — Maintenance Priority Pie Chart
# ------------------------------------------------------------------
priority_order = ["Low", "Medium", "High", "Critical"]
priority_colours_map = {
    "Low": PRIORITY_COLOURS["Healthy"],
    "Medium": PRIORITY_COLOURS["Schedule Maintenance"],
    "High": PRIORITY_COLOURS["Maintenance Required Soon"],
    "Critical": PRIORITY_COLOURS["Immediate Inspection Required"],
}
priority_series = rec_df["Priority"].value_counts().reindex(priority_order, fill_value=0)

fig, ax = plt.subplots(figsize=(8, 8))
wedges, _texts, autotexts = ax.pie(
    priority_series.values,
    labels=priority_series.index,
    colors=[priority_colours_map[p] for p in priority_series.index],
    autopct="%1.1f%%",
    startangle=90,
    wedgeprops={"edgecolor": "white", "linewidth": 1.5},
    textprops={"fontsize": 12, "fontweight": "bold"},
)
for at in autotexts:
    at.set_color("white")
    at.set_fontsize(11)
ax.set_title("Maintenance Priority Distribution", fontsize=14)
fig.tight_layout()
PRIORITY_PIE_FILE = OUTPUT_DIR / "maintenance_priority_pie.png"
fig.savefig(PRIORITY_PIE_FILE, dpi=300, bbox_inches="tight")
plt.close(fig)
print(f"[OK] Saved: {PRIORITY_PIE_FILE.name}")

# ------------------------------------------------------------------
# 5.4 — Engine Health Dashboard (colour-coded status per engine)
# ------------------------------------------------------------------
dashboard_df = rec_df.sort_values("Unit_Number").reset_index(drop=True)

fig, ax = plt.subplots(figsize=(14, 6))
status_to_colour = PRIORITY_COLOURS
bar_colours = [status_to_colour[s] for s in dashboard_df["Health_Status"]]
ax.bar(dashboard_df["Unit_Number"].astype(str), dashboard_df["Predicted_RUL"],
       color=bar_colours, edgecolor="black", linewidth=0.4)
ax.set_title("Engine Health Dashboard — Predicted RUL by Engine",
             fontsize=14)
ax.set_xlabel("Engine Unit Number")
ax.set_ylabel("Predicted RUL (cycles)")
ax.axhline(HEALTHY_MAX, color=PRIORITY_COLOURS["Healthy"],
           linestyle="--", linewidth=1, alpha=0.7)
ax.axhline(SCHEDULE_MAX, color=PRIORITY_COLOURS["Schedule Maintenance"],
           linestyle="--", linewidth=1, alpha=0.7)
ax.axhline(REQUIRED_MAX, color=PRIORITY_COLOURS["Maintenance Required Soon"],
           linestyle="--", linewidth=1, alpha=0.7)
ax.grid(True, alpha=0.3, axis="y")
# legend
from matplotlib.patches import Patch
legend_handles = [
    Patch(facecolor=PRIORITY_COLOURS["Healthy"],
          edgecolor="black", label="Healthy"),
    Patch(facecolor=PRIORITY_COLOURS["Schedule Maintenance"],
          edgecolor="black", label="Schedule Maintenance"),
    Patch(facecolor=PRIORITY_COLOURS["Maintenance Required Soon"],
          edgecolor="black", label="Maintenance Required Soon"),
    Patch(facecolor=PRIORITY_COLOURS["Immediate Inspection Required"],
          edgecolor="black", label="Immediate Inspection Required"),
]
ax.legend(handles=legend_handles, loc="upper right", fontsize=9,
          title="Health Status", framealpha=0.95)
# Rotate x-tick labels only when there are many engines
if len(dashboard_df) > 30:
    ax.set_xticks(np.arange(0, len(dashboard_df), 5))
    ax.set_xticklabels(dashboard_df["Unit_Number"].iloc[::5].astype(str),
                       rotation=0)
fig.tight_layout()
DASHBOARD_FILE = OUTPUT_DIR / "engine_health_dashboard.png"
fig.savefig(DASHBOARD_FILE, dpi=300, bbox_inches="tight")
plt.close(fig)
print(f"[OK] Saved: {DASHBOARD_FILE.name}")

# ------------------------------------------------------------------
# 5.5 — Workflow Diagram
# ------------------------------------------------------------------
fig, ax = plt.subplots(figsize=(13, 4.5))
ax.set_xlim(0, 100)
ax.set_ylim(0, 50)
ax.axis("off")
ax.set_title("Maintenance Recommendation Workflow",
             fontsize=15, fontweight="bold", pad=20)

boxes = [
    (5, 20, "Predicted RUL\n(Phase 4 — NN model)", "#cce5ff"),
    (24, 20, "Decision Rules\n(RUL thresholds)", "#fff2cc"),
    (43, 20, "Health\nClassification", "#d5e8d4"),
    (62, 20, "Maintenance\nRecommendation", "#ffe6cc"),
    (81, 20, "Maintenance\nPlanning", "#f8cecc"),
]
for x, y, label, colour in boxes:
    box = FancyBboxPatch(
        (x, y), 14, 14,
        boxstyle="round,pad=0.5,rounding_size=1.2",
        linewidth=1.4, edgecolor="#222222",
        facecolor=colour,
    )
    ax.add_patch(box)
    ax.text(x + 7, y + 7, label, ha="center", va="center",
            fontsize=11, fontweight="bold")

# Arrows between the boxes
for i in range(len(boxes) - 1):
    x_start = boxes[i][0] + 14
    x_end = boxes[i + 1][0]
    arrow = FancyArrowPatch(
        (x_start, 27), (x_end, 27),
        arrowstyle="-|>", mutation_scale=18,
        color="#222222", linewidth=1.5,
    )
    ax.add_patch(arrow)

WORKFLOW_FILE = OUTPUT_DIR / "maintenance_workflow.png"
fig.savefig(WORKFLOW_FILE, dpi=300, bbox_inches="tight")
plt.close(fig)
print(f"[OK] Saved: {WORKFLOW_FILE.name}")

print()

# ----------------------------------------------------------------------------
# Step 6 — Dissertation-ready Markdown summary
# ----------------------------------------------------------------------------
print("=" * 80)
print("STEP 6: WRITING DISSERTATION-READY SUMMARY")
print("=" * 80)

# Reference model performance if Phase 5 metrics exist
perf_note = ""
PERF_METRICS_FILE = PHASE5_DIR / "performance_evaluation" / "performance_metrics_summary.csv"
if PERF_METRICS_FILE.exists():
    try:
        metrics_df = pd.read_csv(PERF_METRICS_FILE)
        nn_row = metrics_df[metrics_df["Model"] == "Neural Network"]
        if not nn_row.empty:
            mae = float(nn_row["MAE"].iloc[0])
            rmse = float(nn_row["RMSE"].iloc[0])
            r2 = float(nn_row["R2"].iloc[0])
            perf_note = (
                f"On the held-out test set, the Neural Network achieved an MAE of "
                f"{mae:.2f} cycles, an RMSE of {rmse:.2f} cycles and an R² of "
                f"{r2:.3f}. It is therefore the most reliable estimator of RUL "
                f"in this project and was chosen as the recommendation source."
            )
    except Exception:
        perf_note = ""

summary_md = OUTPUT_DIR / "maintenance_recommendation_summary.md"

# Markdown body
md_lines = [
    "# Maintenance Recommendation Summary",
    "",
    "**Project Title:** Predictive Maintenance and Equipment Failure Prediction Using the NASA Turbofan Engine Dataset  ",
    "**Phase:** 7 — Maintenance Recommendation (final phase)  ",
    "**Primary Recommendation Source:** Neural Network (best-performing model in Phase 5 evaluation)",
    "",
    "## 1. Purpose of Predictive Maintenance",
    "",
    "Predictive maintenance aims to anticipate equipment failures before they occur, "
    "so that interventions can be scheduled when they are most cost-effective and "
    "least disruptive. By translating Remaining Useful Life (RUL) predictions into "
    "concrete maintenance actions, organisations can avoid unplanned downtime, "
    "extend asset life, and improve safety.",
    "",
    "## 2. How Recommendations Were Generated",
    "",
    "1. The trained Neural Network model (Phase 3) was used to predict RUL on the "
    "   test fleet (Phase 4).",
    "2. Each engine's predicted RUL was classified using the rule table below.",
    "3. A recommendation, priority and explanation were assigned to every engine.",
    "4. The fleet was visualised and summarised for downstream decision-making.",
    "",
    "| Predicted RUL (cycles) | Health Status                    | Recommended Action            |",
    "|------------------------|----------------------------------|-------------------------------|",
    "| > 120                  | Healthy                          | Continue normal operation     |",
    "| 61 – 120               | Schedule Maintenance             | Schedule preventive maintenance|",
    "| 31 – 60                | Maintenance Required Soon        | Plan maintenance              |",
    "| ≤ 30                   | Immediate Inspection Required    | Inspect immediately           |",
    "",
    "## 3. Why the Neural Network Was Used",
    "",
    "Three regression models were trained in Phase 3 (Random Forest, XGBoost, "
    "Neural Network) and evaluated in Phase 5. The Neural Network produced the "
    "lowest MAE and RMSE and the highest R² on the test set, and is therefore the "
    "most accurate source of RUL estimates.",
    "",
]
if perf_note:
    md_lines += [perf_note, ""]

md_lines += [
    "## 4. Fleet-Level Outcomes",
    "",
    f"- **Total engines evaluated:** {len(rec_df)}",
    f"- **Healthy:** {status_counts['Healthy']}",
    f"- **Schedule Maintenance:** {status_counts['Schedule Maintenance']}",
    f"- **Maintenance Required Soon:** {status_counts['Maintenance Required Soon']}",
    f"- **Immediate Inspection Required:** {status_counts['Immediate Inspection Required']}",
    f"- **Average predicted RUL:** {rec_df['Predicted_RUL'].mean():.2f} cycles",
    f"- **Lowest predicted RUL:** {rec_df['Predicted_RUL'].min():.2f} cycles",
    f"- **Highest predicted RUL:** {rec_df['Predicted_RUL'].max():.2f} cycles",
    "",
    "## 5. Benefits to Maintenance Engineers",
    "",
    "- Replaces calendar-based maintenance with condition-based scheduling.",
    "- Highlights the engines that need immediate attention.",
    "- Provides a clear, auditable reason for every maintenance decision.",
    "- Helps prioritise parts, labour and hangar slots.",
    "",
    "## 6. Benefits to Airlines",
    "",
    "- Reduces in-flight disruptions caused by unscheduled engine events.",
    "- Lowers the cost of unscheduled removals and AOG (Aircraft-on-Ground) events.",
    "- Improves fleet availability and on-time performance.",
    "- Supports evidence-based conversations with regulators and OEMs.",
    "",
    "## 7. Benefits to Industry",
    "",
    "- Demonstrates a reproducible ML pipeline that can be applied to other "
    "  turbofan fleets (FD002–FD004) and to non-aerospace rotating equipment.",
    "- Provides a template for integrating ML-driven RUL into existing Computer "
    "  Maintenance Management Systems (CMMS).",
    "- Encourages data-driven maintenance culture across the organisation.",
    "",
    "## 8. Business Impact",
    "",
    "By prioritising maintenance only on engines that genuinely need it, the "
    "operator avoids the two failure modes of a poor maintenance strategy: "
    "over-maintenance (cost, downtime) and under-maintenance (failure, safety "
    "risk). The rule-based classifier makes the model's output easy to defend "
    "in operational reviews and regulatory audits.",
    "",
    "## 9. Future Improvements",
    "",
    "- Train on multiple CMAPSS sub-datasets (FD002–FD004) to generalise across "
    "  operating conditions.",
    "- Use sequence models (LSTM, GRU, Transformer) to ingest raw cycle streams "
    "  directly.",
    "- Replace static RUL thresholds with cost-optimised decision boundaries.",
    "- Integrate the recommendation engine with a live CMMS via REST APIs.",
    "- Add uncertainty quantification (e.g. quantile regression, Bayesian NNs) "
    "  to flag low-confidence predictions for human review.",
    "",
    "## 10. Output Artefacts",
    "",
    "- `maintenance_recommendations.csv` — per-engine recommendation table.",
    "- `maintenance_summary.csv` — fleet-level summary statistics.",
    "- `health_status_distribution.png` — bar chart of engine status counts.",
    "- `rul_distribution.png` — histogram of RUL values coloured by category.",
    "- `maintenance_priority_pie.png` — pie chart of priority distribution.",
    "- `engine_health_dashboard.png` — colour-coded dashboard of all engines.",
    "- `maintenance_workflow.png` — pipeline workflow diagram.",
    "- `maintenance_recommendation_summary.md` — this document.",
    "",
    "## 11. Pipeline Completion",
    "",
    "Raw NASA Dataset → Data Cleaning & Preprocessing → Feature Engineering → "
    "Model Training → RUL Prediction → Performance Evaluation → Feature "
    "Importance Analysis → **Maintenance Recommendation** ✓",
    "",
    "**MSc Project Successfully Completed.**",
    "",
]

summary_md.write_text("\n".join(md_lines), encoding="utf-8")
print(f"[OK] Saved: {summary_md.name}")
print()

# ----------------------------------------------------------------------------
# Final verification block
# ----------------------------------------------------------------------------
print("=" * 80)
print("MAINTENANCE RECOMMENDATION COMPLETED SUCCESSFULLY")
print("=" * 80)
print()
print(f"Total Engines: {len(rec_df)}")
print(f"Healthy: {status_counts['Healthy']}")
print(f"Schedule Maintenance: {status_counts['Schedule Maintenance']}")
print(f"Maintenance Required: {status_counts['Maintenance Required Soon']}")
print(f"Immediate Inspection: {status_counts['Immediate Inspection Required']}")
print()
print("Output Files Generated:")
for f in [
    "maintenance_recommendations.csv",
    "maintenance_summary.csv",
    "maintenance_recommendation_summary.md",
    "health_status_distribution.png",
    "rul_distribution.png",
    "maintenance_priority_pie.png",
    "engine_health_dashboard.png",
    "maintenance_workflow.png",
]:
    marker = "[OK]" if (OUTPUT_DIR / f).exists() else "[--]"
    print(f"  {marker} {f}")
print()
print("Project Pipeline Completed Successfully")
print()
print("Raw NASA Dataset")
print("        |")
print("        v")
print("Data Cleaning & Preprocessing")
print("        |")
print("        v")
print("Feature Engineering")
print("        |")
print("        v")
print("Model Training")
print("        |")
print("        v")
print("RUL Prediction")
print("        |")
print("        v")
print("Performance Evaluation")
print("        |")
print("        v")
print("Feature Importance Analysis")
print("        |")
print("        v")
print("Maintenance Recommendation")
print()
print("MSc Project Successfully Completed")
print("=" * 80)