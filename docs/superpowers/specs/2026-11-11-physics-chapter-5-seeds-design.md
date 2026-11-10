# Technical Design Specification: SSC Physics Chapter 5 Database Curriculum & Question Bank (70+ Questions)

- **Date:** 2026-11-11
- **Status:** Proposed
- **Author:** Antigravity Engineering Agent
- **Target Files:**
  - `apps/api/prisma/sample-simulations/hydraulic-press-buoyancy-lab.html`
  - `apps/api/prisma/sample-simulations/hookes-law-elasticity-lab.html`
  - `apps/api/prisma/seed-chapter-5.ts`
  - `apps/api/prisma/seed-chapter-5-questions.ts`
  - `apps/api/prisma/seed-chapter-5-questions-batch2.ts`
  - `apps/api/prisma/seed-chapter-5-questions-batch3.ts`
  - `apps/api/prisma/seed.ts`
  - `apps/web/src/lib/curriculum-data.ts`

---

## 1. Intent & Context

The poRi platform maintains a comprehensive SSC Physics curriculum with database seeds and a high-yield question bank for Class 9–10 students following the NCTB 2026 syllabus.
Chapters 1, 2, 3, 4, and 6 already have full database seeds in `apps/api/prisma/` including:
- Rich lesson content with KaTeX formulas, learning goals, markdown explanations, term grids, worked examples, and memory aids.
- Embedded standalone interactive simulation laboratories in `apps/api/prisma/sample-simulations/` copied to `uploads/interactive/` and wired via `interactiveWidgetUrl`.
- 70+ board-standard questions per chapter (MCQs and CQs) with full explanations, step-by-step derivations, distractor analyses, textbook citations, and 4-part marking rubrics (ক [১], খ [২], গ [৩], ঘ [৪]).

Chapter 5 (*পদার্থের অবস্থা ও চাপ / States of Matter and Pressure*) currently has HTML drafts in `drafts/physics-chapter-5/`, but completely lacks database seeds, question bank entries in Prisma, standalone simulation files, and curriculum registration in the frontend (`curriculum-data.ts`).

The goal of this project is to follow the exact architectural and pedagogical patterns of Chapter 1 and Chapter 2 to build:
1. Two standalone simulation laboratories in `apps/api/prisma/sample-simulations/`.
2. `seed-chapter-5.ts` with 6 detailed lessons (linking simulations via `interactiveWidgetUrl`).
3. 3 question batches (`seed-chapter-5-questions.ts`, `batch2.ts`, `batch3.ts`) containing **72+ questions** (54+ MCQs and 18+ CQs).
4. Seamless integration into `seed.ts` and `curriculum-data.ts`.

---

## 2. Goals, Non-Goals & Anti-Goals

### 2.1 Goals
1. **Interactive Simulation Laboratories:**
   - `apps/api/prisma/sample-simulations/hydraulic-press-buoyancy-lab.html`: Standalone responsive HTML5/SVG simulation of the Hydraulic Press and Archimedes Buoyancy tank with live parameter controls ($F_1$, $r_2/r_1$, $\rho$, $V$) and real-time readouts.
   - `apps/api/prisma/sample-simulations/hookes-law-elasticity-lab.html`: Standalone responsive HTML5/SVG simulation of Hooke's Law spring deformation and wire tensile elongation with material presets (Steel, Copper, Aluminum) and live micro-strain readouts.
2. **Curriculum Seed (`seed-chapter-5.ts`):**
   - Create chapter: `chap_ssc_physics_ch5` (titleBangla: 'পঞ্চম অধ্যায়: পদার্থের অবস্থা ও চাপ (States of Matter and Pressure)', orderIndex: 5).
   - Create 6 topics and corresponding lessons:
     - `top_ssc_physics_ch5_1`: ৫.১ চাপ (Pressure)
     - `top_ssc_physics_ch5_2`: ৫.২ ঘনত্ব (Density)
     - `top_ssc_physics_ch5_3`: ৫.৩ তরলে চাপ, প্যাসকেলের সূত্র ও প্লবতা (Pressure in Liquids, Pascal’s Law and Buoyancy) -> `interactiveWidgetUrl: '/uploads/interactive/hydraulic-press-buoyancy-lab.html'`
     - `top_ssc_physics_ch5_4`: ৫.৪ বায়ুচাপ, ব্যারোমিটার ও আবহাওয়া (Air Pressure, Barometer and Weather)
     - `top_ssc_physics_ch5_5`: ৫.৫ স্থিতিস্থাপকতা ও হুকের সূত্র (Elasticity and Hooke’s Law) -> `interactiveWidgetUrl: '/uploads/interactive/hookes-law-elasticity-lab.html'`
     - `top_ssc_physics_ch5_6`: ৫.৬ পদার্থের তিন অবস্থা, আণবিক গতিতত্ত্ব ও প্লাজমা (States of Matter, Molecular Kinetic Theory and Plasma)
   - Each lesson includes: `titleBangla`, `learningGoal`, `explanation` (rich markdown with KaTeX math), `importantTerms` (3–5 terms with definitions), `workedExample` (problem + stepByStepSolution), `memoryAid`, and status `PUBLISHED`.
3. **72+ Question Bank (Across 3 Batches):**
   - **Batch 1 (`seed-chapter-5-questions.ts`):** 24 questions (18 MCQs + 6 CQs) covering Topics 5.1 and 5.2.
   - **Batch 2 (`seed-chapter-5-questions-batch2.ts`):** 24 questions (18 MCQs + 6 CQs) covering Topics 5.3 and 5.4.
   - **Batch 3 (`seed-chapter-5-questions-batch3.ts`):** 24 questions (18 MCQs + 6 CQs) covering Topics 5.5 and 5.6.
   - Total = **72 questions** (54 MCQs + 18 CQs).
   - Every MCQ strictly adheres to the standard `QuestionData` interface:
     - `options`: 4 options with exact boolean `isCorrect`.
     - `explanation`: `directAnswer`, `coreConcept`, `stepDerivation` (with KaTeX), `distractorAnalysis` (explanation for why each wrong option is incorrect), `textbookCitation` (bookTitle, chapterName, pageNumber), `proTipShortcut`.
   - Every CQ strictly includes:
     - Realistic board-standard stem/stimulus.
     - `cqRubric`:
       - `ka`: { mark: 1, criteria: 'জ্ঞানমূলক (১ নম্বর)...' }
       - `kha`: { mark: 2, criteria: 'অনুধাবনমূলক (২ নম্বর)...' }
       - `ga`: { mark: 3, criteria: 'প্রয়োগমূলক (৩ নম্বর)...' }
       - `gha`: { mark: 4, criteria: 'উচ্চতর দক্ষতামূলক (৪ নম্বর)...' }
4. **Database & App Wiring:**
   - Call `await seedChapter5(prisma)` in `apps/api/prisma/seed.ts` (and copy simulations to `uploads/interactive/`).
   - Add Chapter 5 curriculum structure to `apps/web/src/lib/curriculum-data.ts`.
   - Ensure `npm run build` or typescript checks pass cleanly across `apps/api` and `apps/web`.

### 2.2 Non-Goals
- Modifying previously validated Chapter 1, 2, 3, 4, 6 seed files.
- Changing database schema (`schema.prisma`) since the existing schema already supports `Question`, `Topic`, `Lesson`, and `Chapter`.

### 2.3 Anti-Goals
- Truncated or placeholder questions (no "lorem ipsum", no missing distractor analyses).
- Broken or unbalanced LaTeX strings in explanation/stem fields.
- Non-unique question IDs.

---

## 3. Detailed Question Distribution (72 Questions Total)

| Batch | Covered Topics | MCQs (18 each) | CQs (6 each) | Total Questions |
|---|---|---|---|---|
| **Batch 1** | 5.1 চাপ (Pressure) & 5.2 ঘনত্ব (Density) | 9 MCQs (5.1) + 9 MCQs (5.2) | 3 CQs (5.1) + 3 CQs (5.2) | 24 Questions |
| **Batch 2** | 5.3 তরলে চাপ, প্যাসকেলের সূত্র ও প্লবতা & 5.4 বায়ুচাপ ও ব্যারোমিটার | 9 MCQs (5.3) + 9 MCQs (5.4) | 3 CQs (5.3) + 3 CQs (5.4) | 24 Questions |
| **Batch 3** | 5.5 স্থিতিস্থাপকতা ও হুকের সূত্র & 5.6 পদার্থের অবস্থা ও প্লাজমা | 9 MCQs (5.5) + 9 MCQs (5.6) | 3 CQs (5.5) + 3 CQs (5.6) | 24 Questions |
| **Total** | **All 6 Topics of Chapter 5** | **54 MCQs** | **18 CQs** | **72 Questions** |

---

## 4. Verification Plan

1. **Type Checking:** Run `npx tsc --noEmit` in `apps/api` and `apps/web` to confirm valid TypeScript syntax and imports.
2. **Seed Validation:** Execute `npx tsx apps/api/prisma/seed-chapter-5.ts` (with offline fallback safety) to verify that all 72 questions and 6 topics/lessons pass data schema validation.
3. **Question Count & Integrity Test:** Write an automated test script in scratch asserting:
   - Exactly 72 questions exported.
   - All question IDs are unique and prefixed properly (`q_ch5_...`).
   - Every MCQ has 4 options with exactly 1 correct answer.
   - Every CQ has a complete 4-part rubric (ka, kha, ga, gha).
   - Every question has an explanation and valid topicId.
   - Simulation HTML files exist in `apps/api/prisma/sample-simulations/`.
