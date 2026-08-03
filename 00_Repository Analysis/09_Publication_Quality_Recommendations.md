# 09 — Publication Quality Recommendations

These recommendations focus on the visual and textual polish of the
dissertation document, the figures and the tables.

## 1. Page Setup

* A4 (210 × 297 mm).
* Margins: 2.54 cm (1 inch) on every side, or as specified by the
  handbook.
* Body font: **Times New Roman 12 pt**.
* Line spacing: **1.5**.
* Justified text.
* Page numbers in the footer from the abstract onwards.

## 2. Heading Hierarchy

* Heading 1 — Chapter title.
* Heading 2 — Section within a chapter.
* Heading 3 — Sub-section.
* Use the Word "Heading 1/2/3" styles so the TOC field can populate.

## 3. Tables

* Every table gets a **caption** above it, numbered sequentially
  (Table 3.1, Table 4.1, etc.).
* Tables should be **cited in the text** before they appear (or at
  least in the surrounding paragraph).
* Keep tables **simple** — avoid merged cells where possible, and
  use `pandas.to_markdown` output as the starting point for the
  contents.

## 4. Figures

* Every figure gets a **caption** below it, numbered sequentially
  (Figure 3.1, Figure 4.1, etc.).
* Reference every figure from the body text at least once.
* Maintain a **consistent aspect ratio** for figures within a
  chapter (or use a small palette: 6 × 4 in, 8 × 5 in, 10 × 6 in).
* Use **vector formats** (`.pdf` or `.svg`) where possible, and
  `.png` at 300 dpi as the fallback (the existing PNGs are already
  saved at 300 dpi).

## 5. References

* Use IEEE format. Example:

  ```
  [1]  A. Saxena and K. Goebel, "Turbofan Engine Degradation
       Simulation Data Set," NASA Ames Prognostics Data Repository,
       2008.
  ```

* Number references in the order they first appear in the body.
* Every `[n]` in the body must appear in the references list; every
  references-list entry must be cited at least once in the body.

## 6. Language

* Avoid first-person plural where possible; prefer **third-person
  passive** or **impersonal** constructions ("The model was trained
  on…").
* Avoid informal contractions ("don't", "it's") in the body; they
  are fine in the abstract and acknowledgements.
* Use British English consistently (organisation, behaviour,
  modelling).
* Avoid filler phrases ("It is important to note that…").

## 7. Cross-Referencing

* Use Word's cross-reference field (Insert → Cross-reference) so
  that figure and table numbers update automatically when the
  document is rebuilt.
* The TOC field also needs to be updated after editing; instruct the
  user to press **Ctrl+A → F9** before submitting.

## 8. Cover Page

* Title (large, bold, centred).
* "A dissertation submitted in partial fulfilment of the
  requirements for the degree of MSc Computing".
* Author, student ID, programme, institution, supervisor (if known),
  date.

## 9. Declarations & Acknowledgements

* A short paragraph confirming the work is original.
* A one-paragraph acknowledgement of the supervisor, family and
  peers.

## 10. Final QA

* Open the `.docx` and use Word's spell-checker and grammar-checker.
* Check that every page has a page number from the abstract
  onwards.
* Check that the references list and the in-body `[n]` markers
  agree.
* Export a final PDF and confirm the embedded fonts render
  correctly.