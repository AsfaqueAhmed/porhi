# SSC Physics Chapter 11 Elevation Implementation Plan

**Goal:** Elevate Chapter 11 (`চল বিদ্যুৎ`) across HTML textbook drafts, two standalone unified simulators, Prisma seed + 80 verified questions, root seed wiring, frontend curriculum metadata, and full runtime/TypeScript/database verification.

### Task 1: Enhance `drafts/physics-chapter-11/` CSS, Index, and Sections (`section-01.html`–`section-06.html`)
- Update `styles.css` with `.stats`, `.stat`, `.check ol`, and `.visual` rules.
- Upgrade `index.html` and `section-01.html`–`section-06.html` with KaTeX `0.16.8`, pedagogical callout blocks, worked board examples, and inline HTML SVG labs on `section-01`, `section-02`, `section-03`, and `section-04`.
- Leave `chapter-source.html` completely untouched.

### Task 2: Build 2 Standalone Unified Simulations
- `apps/api/prisma/sample-simulations/ohms-law-circuit-lab.html`
- `apps/api/prisma/sample-simulations/electric-power-billing-lab.html`
- Copy both into `apps/api/uploads/interactive/`.

### Task 3: Create Question Bank (3 Batches, 80 Questions) & `seed-chapter-11.ts`
- `seed-chapter-11-questions.ts`, `seed-chapter-11-questions-batch2.ts`, `seed-chapter-11-questions-batch3.ts` (68 MCQs + 12 `CQ_CREATIVE`)
- `seed-chapter-11.ts` with `chap_ssc_physics_ch11`, 4 topics, 4 lessons (`interactiveWidgetUrl` on lessons 2 and 3), and all 80 upserts.

### Task 4: Wire Root Seed & Frontend Curriculum Data
- Register `seedChapter11(prisma)` in `apps/api/prisma/seed.ts`.
- Add `chap_ssc_physics_ch11` and `findTopicHierarchy` fallback in `apps/web/src/lib/curriculum-data.ts`.

### Task 5: End-to-End Verification
- Run static HTML/KaTeX/simulation validator (`validate-ch11.js`), runtime question validator (`validate-ch11-questions.ts`), `api` and `web` `tsc --noEmit`, and live seed `pnpm --filter api exec tsx prisma/seed-chapter-11.ts`.
