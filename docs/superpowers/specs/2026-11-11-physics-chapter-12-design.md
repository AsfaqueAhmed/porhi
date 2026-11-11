# SSC Physics Chapter 12 Elevation Design Specification
**Date:** 2026-11-11
**Chapter:** Chapter 12 — বিদ্যুতের চৌম্বক ক্রিয়া (Magnetic Effects of Current)
**Topic IDs:** `top_ssc_physics_ch12_1` through `top_ssc_physics_ch12_4`
**Chapter ID:** `chap_ssc_physics_ch12`

## 1. Objectives & Scope
Elevate Chapter 12 (`বিদ্যুতের চৌম্বক ক্রিয়া`) to the benchmark established across Chapters 6–11:
1. **Digital Textbook Drafts (`drafts/physics-chapter-12/`):**
   - Preserve existing `styles.css` rules (skeuomorphic slider + `.lab-iframe-card`) and append `.stats`, `.stat`, `.check ol`, and `.visual` responsive figure styles.
   - Upgrade `index.html` and `section-01.html` through `section-03.html` with KaTeX `0.16.8`, pedagogical callout blocks (`.goal`, `.grid > .term`, `.highlight-box`, `.table-wrap`, `.worked > .problem + .solution`, `.note`, `.memory`, `details.check`), clean Bengali without OCR glitches (fixing `সমমերু` -> `সমমেরু` and checking all non-Bengali/Latin/math Unicode ranges), and inline interactive SVG labs in `section-01.html`, `section-02.html`, and `section-03.html`.
   - Preserve `chapter-source.html` (17 PDF pages, `3184767` bytes) strictly untouched.
2. **Two Standalone Unified Simulations (`apps/api/prisma/sample-simulations/` & `apps/api/uploads/interactive/`):**
   - `electromagnet-motor-lab.html`: Solenoid & Electromagnet + Fleming's Left-Hand Rule & DC Motor Simulator (mode toggle between Electromagnet/Solenoid & DC Motor; turns $N$, current $I$, core type, magnetic field polarity, commutator half-turn toggle, live force direction & torque/strength readout, `PORI UNIFIED SIMULATOR THEME` + `PORI UNIFIED RANGE SYNC`).
   - `induction-transformer-lab.html`: Electromagnetic Induction & Ideal Transformer Simulator (mode toggle between Moving-Magnet Galvanometer & Step-Up/Step-Down Transformer; primary voltage $V_p$, primary turns $N_p$, secondary turns $N_s$, load resistance $R_L$, AC vs steady DC comparison warning, live $V_s$, $I_p$, $I_s$, $P$ readout, `PORI UNIFIED SIMULATOR THEME` + `PORI UNIFIED RANGE SYNC`).
3. **Curriculum Seed & 80-Question Bank (`apps/api/prisma/`):**
   - `seed-chapter-12.ts` + `seed-chapter-12-questions.ts` (27), `batch2.ts` (27), `batch3.ts` (26) totaling 80 verified questions (68 MCQs + 12 `CQ_CREATIVE`).
4. **Platform Integration:**
   - Wire `seedChapter12(prisma)` in `apps/api/prisma/seed.ts`.
   - Register `chap_ssc_physics_ch12` and `findTopicHierarchy` fallback in `apps/web/src/lib/curriculum-data.ts`.

## 2. Curriculum Topic Mapping
| Order | Topic ID | Title (Bangla + English) | Textbook Sections | Interactive Simulation |
| :--- | :--- | :--- | :--- | :--- |
| 1 | `top_ssc_physics_ch12_1` | ১২.১ চুম্বক, চৌম্বক ক্ষেত্র ও বলরেখা (Magnet, Field & Field Lines) | 12.1 | Inline Magnet Pole & Field-Line Lab |
| 2 | `top_ssc_physics_ch12_2` | ১২.২.১–১২.২.২ সলিনয়েড ও তড়িৎচুম্বক (Solenoid & Electromagnet) | 12.2, 12.2.1, 12.2.2 | Inline Solenoid Lab + `electromagnet-motor-lab.html` |
| 3 | `top_ssc_physics_ch12_3` | ১২.২.৩–১২.২.৪ বিদ্যুৎবাহী তারে বল ও DC মোটর (Magnetic Force & DC Motor Lab) | 12.2.3, 12.2.4 | `electromagnet-motor-lab.html` |
| 4 | `top_ssc_physics_ch12_4` | ১২.৩ তড়িৎচৌম্বকীয় আবেশ, জেনারেটর ও ট্রান্সফরমার (Induction, Generator & Transformer Lab) | 12.3, 12.3.1, 12.3.2 | `induction-transformer-lab.html` |
