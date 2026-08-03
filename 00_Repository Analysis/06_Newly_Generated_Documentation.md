# 06 — Newly Generated Documentation

This document lists every file that was **added** by the repository
analysis itself. Nothing here alters the existing seven-phase pipeline
or its outputs; the new files live exclusively inside
`00_Repository Analysis/`.

## 1. Documentation Index

| File | Type | Purpose |
|---|---|---|
| `00_README.md` | Markdown | Project index for the analysis folder. |
| `01_Repository_Analysis_Report.md` | Markdown | Phase-by-phase technical walkthrough. |
| `02_Missing_Items_Report.md` | Markdown | Gap analysis vs. submission requirements. |
| `03_Folder_Structure.md` | Markdown | Tree + per-folder explanation. |
| `04_Project_Architecture.md` | Markdown | Pipeline diagram and data flow. |
| `05_Existing_Files_Reused.md` | Markdown | Inventory of reused CSVs/PNGs/MDs. |
| `06_Newly_Generated_Documentation.md` | Markdown | This document. |
| `07_Dissertation_Improvement_Recommendations.md` | Markdown | Actionable dissertation-level improvements. |
| `08_Research_Quality_Recommendations.md` | Markdown | Research-methodology improvements. |
| `09_Publication_Quality_Recommendations.md` | Markdown | Writing/figure/table polish. |
| `10_Final_Submission_Checklist.md` | Markdown | Pre-submission checklist. |
| `build_dissertation.py` | Python | Builds the dissertation `.docx`. |
| `Predictive_Maintenance_and_Equipment_Failure_Prediction_Using_the_NASA_Turbofan_Engine_Dataset_Dissertation.docx` | Word | The dissertation artefact. |

## 2. What was NOT created

To keep the analysis transparent, the following items were deliberately
**not** generated:

* No new machine-learning model files.
* No new CSV / PNG outputs from re-running phases.
* No new git commits (the repository history is unchanged).
* No additional references outside the standard predictive-maintenance
  and machine-learning literature listed in
  `01_Repository_Analysis_Report.md`.

## 3. Reuse Boundaries

All numbers, figures and tables in the new documentation come from
the existing CSVs / PNGs / JSONs / Markdown documents listed in
`05_Existing_Files_Reused.md`. If a future reader finds a number
that does not match the source file, the source file is the
authoritative reference.

## 4. Build Reproducibility

The dissertation `.docx` is produced by `build_dissertation.py`. The
script has no external dependencies beyond `python-docx`. Re-running
it on any machine with Python 3 and `python-docx` installed will
regenerate the same `.docx` from the same chapter strings.