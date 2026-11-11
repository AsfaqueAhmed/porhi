# SSC Physics Chapter 10 Topic Separation Implementation Plan

**Goal:** Refactor SSC Physics Chapter 10 (`দশম অধ্যায়: স্থির বিদ্যুৎ`) from 4 grouped topics (`10.1–10.3`, `10.4–10.5`, `10.6–10.7`, `10.8`) into 8 individual textbook topics (`10.1` through `10.8`) aligned with `drafts/physics-chapter-10/section-01..08.html`.

---

### Task 1: Update `apps/web/src/lib/curriculum-data.ts`
- Replace `chap_ssc_physics_ch10.topics` (4 grouped entries) with 8 individual topic entries (`top_ssc_physics_ch10_1..8`, `orderIndex: 1..8`).

### Task 2: Update `apps/api/prisma/seed-chapter-10.ts`
- Expand `seedChapter10` to upsert all 8 topics (`top_ssc_physics_ch10_1..8`) and 8 lessons (`les_ssc_physics_ch10_1..8`).
- Normalize `interactiveWidgetUrl: lessonData.interactiveWidgetUrl ?? null` inside `upsertTopicAndLesson`.
- Attach `/uploads/interactive/coulomb-electrostatics-lab.html` to `les_ssc_physics_ch10_4` and `/uploads/interactive/potential-capacitor-lab.html` to `les_ssc_physics_ch10_7`.

### Task 3: Re-Map All 80 Verified Questions in `seed-chapter-10-questions*.ts`
- Re-assign every `q_10_01`..`q_10_80` to its exact topic `top_ssc_physics_ch10_1..8` across:
  - `apps/api/prisma/seed-chapter-10-questions.ts`
  - `apps/api/prisma/seed-chapter-10-questions-batch2.ts`
  - `apps/api/prisma/seed-chapter-10-questions-batch3.ts`

### Task 4: Live Verification & Test Suite
- Verify all 80 question IDs & distribution (`tsx` check).
- Run `pnpm --filter api exec tsx prisma/seed-chapter-10.ts` and inspect PostgreSQL rows (`8` topics, `8` lessons, `80` questions).
- Run `tsc --noEmit` (`api` & `web`) and `vitest` (`api` & `web`).
