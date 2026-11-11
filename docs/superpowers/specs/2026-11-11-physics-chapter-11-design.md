# SSC Physics Chapter 11 Elevation Design Specification
**Date:** 2026-11-11
**Chapter:** Chapter 11 — চল বিদ্যুৎ (Current Electricity)
**Topic IDs:** `top_ssc_physics_ch11_1` through `top_ssc_physics_ch11_4`
**Chapter ID:** `chap_ssc_physics_ch11`

## 1. Objectives & Scope
Elevate Chapter 11 (`চল বিদ্যুৎ`) to the benchmark established across Chapters 6–10:
1. **Digital Textbook Drafts (`drafts/physics-chapter-11/`):**
   - Preserve existing `styles.css` rules (skeuomorphic slider + `.lab-iframe-card`) and append `.stats`, `.stat`, `.check ol`, and `.visual` responsive figure styles.
   - Upgrade `index.html` and `section-01.html` through `section-06.html` with KaTeX `0.16.8`, pedagogical callout blocks (`.goal`, `.grid > .term`, `.highlight-box`, `.table-wrap`, `.worked > .problem + .solution`, `.note`, `.memory`, `details.check`), clean Bengali without OCR glitches, and 4 inline interactive SVG labs (`section-01`, `section-02`, `section-03`, `section-04`).
   - Preserve `chapter-source.html` (31 PDF pages) strictly untouched.
2. **Two Standalone Unified Simulations (`apps/api/prisma/sample-simulations/` & `apps/api/uploads/interactive/`):**
   - `ohms-law-circuit-lab.html`: Series & Parallel DC Circuit + Ohm's Law Simulator ($V$, $R_1$, $R_2$, $R_{\text{eq}}$, $I$, branch currents/voltages, $P$, $V$-$I$ curve, resistance clamp $R_i \ge 1\,\Omega$, `PORI UNIFIED SIMULATOR THEME` + `PORI UNIFIED RANGE SYNC`).
   - `electric-power-billing-lab.html`: Electric Power, Monthly kWh Billing & High-Voltage System Loss Simulator ($P = VI$, $\text{kWh} = P_{\text{kW}} \cdot t$, $P_{\text{loss}} = I^2 R_{\text{line}}$, transmission voltage comparison, `PORI UNIFIED SIMULATOR THEME` + `PORI UNIFIED RANGE SYNC`).
3. **Curriculum Seed & 80-Question Bank (`apps/api/prisma/`):**
   - `seed-chapter-11.ts` + `seed-chapter-11-questions.ts`, `batch2.ts`, `batch3.ts` totaling 80 verified questions (68 MCQs + 12 `CQ_CREATIVE`).
4. **Platform Integration:**
   - Wire `seedChapter11(prisma)` in `apps/api/prisma/seed.ts`.
   - Register `chap_ssc_physics_ch11` and `findTopicHierarchy` fallback in `apps/web/src/lib/curriculum-data.ts`.

## 2. Curriculum Topic Mapping
| Order | Topic ID | Title (Bangla + English) | Textbook Sections | Interactive Simulation |
| :--- | :--- | :--- | :--- | :--- |
| 1 | `top_ssc_physics_ch11_1` | ১১.১–১১.২.২ তড়িৎ প্রবাহ, ওহমের সূত্র ও আপেক্ষিক রোধ (Current, Ohm's Law & Resistivity) | 11.1, 11.2.1, 11.2.2 | Inline Current & Ohm Labs |
| 2 | `top_ssc_physics_ch11_2` | ১১.২.৩ শ্রেণি ও সমান্তরাল বর্তনী বিশ্লেষণ (Series & Parallel Circuit Lab) | 11.2.3 | `ohms-law-circuit-lab.html` |
| 3 | `top_ssc_physics_ch11_3` | ১১.৩–১১.৪ তড়িৎ ক্ষমতা, বিদ্যুৎ বিল ও সিস্টেম লস (Electric Power, Billing & Supply Lab) | 11.3, 11.4.1, 11.4.2 | `electric-power-billing-lab.html` |
| 4 | `top_ssc_physics_ch11_4` | ১১.৫–১১.৬ বিদ্যুতের নিরাপদ ব্যবহার ও বাসাবাড়ির বর্তনী (Safety & Household Circuit) | 11.5, 11.6 | — |
