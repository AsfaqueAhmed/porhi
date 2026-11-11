# SSC Physics Chapter 10 Elevation Implementation Plan

> **For agentic implementation:** Follow steps sequentially and verify every file and database seed at completion.

**Goal:** Elevate Chapter 10 (`স্থির বিদ্যুৎ`) across drafts, standalone interactive simulations, seeded lessons, 80-question verified question bank, root seed registration, and frontend curriculum metadata.

---

### Task 1: Enhance `drafts/physics-chapter-10/` CSS, Index, and Sections (`section-01.html`–`section-08.html`)
- Preserve existing skeuomorphic range slider CSS and `.lab-iframe-card` rules in `styles.css`; append `.stats`, `.stat`, and `.check ol` styles.
- Upgrade `index.html` stats/roadmap cards cleanly (referencing interactive labs and 28 PDF source pages).
- Upgrade `section-01.html`–`section-08.html` with KaTeX `0.16.8` stylesheet + defer script + `renderMathInElement`, structured pedagogical callouts (`.goal`, `.grid > .term`, `.highlight-box`, `.table-wrap`, `.worked`, `.note`, `.memory`, `details.check`), and clean Bangla typography without any corrupted OCR glyphs.
- Enhance interactive inline SVG labs in `section-03.html` (Electroscope & Induction), `section-04.html` (Coulomb Force Lab upgraded to `.lab` + KaTeX + presets + `PORI UNIFIED RANGE SYNC`), `section-05.html` (Electric Field Explorer), and `section-07.html` (Capacitor Charge & Energy Explorer).
- Keep `chapter-source.html` strictly untouched.

### Task 2: Build 2 Standalone Unified Simulations
- `apps/api/prisma/sample-simulations/coulomb-electrostatics-lab.html` (`PORI UNIFIED SIMULATOR THEME` + `PORI UNIFIED RANGE SYNC`, divide-by-zero guard `r >= 10 cm`).
- `apps/api/prisma/sample-simulations/potential-capacitor-lab.html` (`PORI UNIFIED SIMULATOR THEME` + `PORI UNIFIED RANGE SYNC`, divide-by-zero guard `d >= 1 mm`).
- Copy both into `apps/api/uploads/interactive/`.

### Task 3: Create Seed Module & 3 Question Bank Batches (80 Questions)
- `apps/api/prisma/seed-chapter-10-questions.ts` (~27 questions: Topics 1–2 MCQs + initial CQs)
- `apps/api/prisma/seed-chapter-10-questions-batch2.ts` (~27 questions: Topics 2–3 MCQs + CQs)
- `apps/api/prisma/seed-chapter-10-questions-batch3.ts` (~26 questions: Topics 3–4 MCQs + CQs)
- `apps/api/prisma/seed-chapter-10.ts` (upserts `chap_ssc_physics_ch10`, 4 topics, 4 lessons, and all 80 questions cleanly with offline fallback support).

### Task 4: Wire Root Seed & Frontend Curriculum Data
- Register `seedChapter10(prisma)` in `apps/api/prisma/seed.ts`.
- Add `chap_ssc_physics_ch10` and `findTopicHierarchy` fallback in `apps/web/src/lib/curriculum-data.ts`.

### Task 5: End-to-End Verification
- Run `/Users/technonext/.gemini/antigravity/brain/b1487276-21d4-4a33-9276-882b6c44a9b2/scratch/validate-ch10.js` to verify HTML, KaTeX delimiters, zero Sinhala/Burmese OCR artifacts, valid question IDs/options/CQ rubrics, and simulation files.
- Run `pnpm --filter api exec tsc --noEmit` and `pnpm --filter web exec tsc --noEmit`.
- Run runtime validation of combined question arrays via `tsx`.
- Execute `ALLOW_OFFLINE_SEED=true pnpm --filter api exec tsx prisma/seed-chapter-10.ts` against PostgreSQL.
