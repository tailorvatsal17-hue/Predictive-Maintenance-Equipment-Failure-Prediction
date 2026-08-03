# Repository Analysis — Project Index

This folder contains the systematic analysis of the dissertation project
**"Predictive Maintenance and Equipment Failure Prediction Using the NASA
Turbofan Engine Dataset"** by Vatsal Nileshbhai Tailor (Student ID
A00067312, University of Roehampton).

The implementation across seven phases was complete before this analysis
began; this documentation reuses every existing artefact and adds no new
machine-learning output.

## Documents

| File | Purpose |
|---|---|
| `01_Repository_Analysis_Report.md` | Full technical walkthrough of the seven-phase pipeline. |
| `02_Missing_Items_Report.md` | Gap analysis between current artefacts and a typical dissertation submission. |
| `03_Folder_Structure.md` | Tree of every folder and file in the project, with explanations. |
| `04_Project_Architecture.md` | End-to-end pipeline diagram and data-flow narrative. |
| `05_Existing_Files_Reused.md` | Inventory of CSVs, PNGs and Markdown reused in the dissertation. |
| `06_Newly_Generated_Documentation.md` | Index of every file created during this analysis. |
| `07_Dissertation_Improvement_Recommendations.md` | Actionable dissertation-level improvements. |
| `08_Research_Quality_Recommendations.md` | Research-methodology improvements. |
| `09_Publication_Quality_Recommendations.md` | Writing, figure and table polish suggestions. |
| `10_Final_Submission_Checklist.md` | Step-by-step pre-submission checklist. |
| `build_dissertation.py` | Generates the dissertation `.docx` from the prepared content. |
| `Predictive_Maintenance_and_Equipment_Failure_Prediction_Using_the_NASA_Turbofan_Engine_Dataset_Dissertation.docx` | The final dissertation artefact. |

## How to rebuild the dissertation

```bash
cd "C:\Users\Vatsal\OneDrive\Desktop\msc project\data_cleaning\00_Repository Analysis"
python build_dissertation.py
```

The script depends only on `python-docx`. The output is written next to
the script.

## Conventions

* Every number cited in the documents was lifted directly from a CSV,
  PNG, JSON or Markdown in the existing seven-phase folders.
* No figure, table, dataset, model metric, reference or commit has been
  invented.
* All citations are real, publicly verifiable predictive-maintenance or
  machine-learning sources, formatted in IEEE style.