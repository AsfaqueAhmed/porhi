# SSC Physics Chapter 8 Topic Separation Implementation Plan

> **For agentic workers:** Execute tasks sequentially or cleanly in batches, verifying HTML integrity, Prisma seed idempotency, and TypeScript/test suites after edits.

**Goal:** Separate SSC Physics Chapter 8 (`অষ্টম অধ্যায়: আলোর প্রতিফলন`) from 4 merged topics (`8.1–8.2`, `8.3–8.4`, `8.5–8.6`, `8.7–8.8`) into 8 individual textbook topics (`8.1` through `8.8`) across digital drafts, Prisma seeds, 80 verified questions, and frontend curriculum metadata.

**Architecture:**
- Split existing `drafts/physics-chapter-8/section-01..04.html` into `section-01..08.html` + updated `index.html` while keeping `chapter-source.html` and `assets/` untouched.
- Expand `apps/api/prisma/seed-chapter-8.ts` to upsert `top_ssc_physics_ch8_1..8` and `les_ssc_physics_ch8_1..8`.
- Re-map all 80 questions in `seed-chapter-8-questions.ts`, `batch2.ts`, and `batch3.ts` to their exact granular topic `top_ssc_physics_ch8_1..8`.
- Update `chap_ssc_physics_ch8.topics` in `apps/web/src/lib/curriculum-data.ts`.

---

### Task 1: Split Chapter 8 Draft HTML Files (`section-01.html`–`section-08.html` & `index.html`)

**Files:**
- Inspect/Read: `drafts/physics-chapter-8/section-01.html`, `section-02.html`, `section-03.html`, `section-04.html`, `styles.css`
- Modify/Create:
  - `drafts/physics-chapter-8/section-01.html` (`৮.১ আলোর প্রকৃতি ও তড়িৎচুম্বকীয় বর্ণালি`)
  - `drafts/physics-chapter-8/section-02.html` (`৮.২ আলোর প্রতিফলন, প্রতিফলনের সূত্র ও ধরন` + inline reflection lab)
  - `drafts/physics-chapter-8/section-03.html` (`৮.৩ দর্পণ, প্রতিবিম্ব ও সমতল দর্পণ`)
  - `drafts/physics-chapter-8/section-04.html` (`৮.৪ গোলীয় দর্পণের পরিচিতি ও জ্যামিতি`)
  - `drafts/physics-chapter-8/section-05.html` (`৮.৫ প্রতিবিম্ব অঙ্কন ও উত্তল দর্পণ`)
  - `drafts/physics-chapter-8/section-06.html` (`৮.৬ অবতল দর্পণ (৬ অবস্থান) ও দর্পণের সমীকরণ` + inline spherical mirror ray lab)
  - `drafts/physics-chapter-8/section-07.html` (`৮.৭ রৈখিক বিবর্ধন`)
  - `drafts/physics-chapter-8/section-08.html` (`৮.৮ সমতল, উত্তল ও অবতল দর্পণের ব্যবহার`)
  - `drafts/physics-chapter-8/index.html` (8 topic roadmap cards)

**Verification:**
- Confirm all 8 files render clean HTML with `index.html` + `section-0X.html` `prev`/`next` navigation links (`01 -> 02 -> ... -> 08`), KaTeX scripts, and valid asset/image paths.

---

### Task 2: Update `apps/web/src/lib/curriculum-data.ts`

**Files:**
- Modify: `apps/web/src/lib/curriculum-data.ts` (`chap_ssc_physics_ch8.topics`)

**Changes:**
- Replace the 4 merged topic entries with 8 topic entries (`orderIndex: 1..8`, `id: 'top_ssc_physics_ch8_1'` through `'top_ssc_physics_ch8_8'`).
- Confirm `findTopicHierarchy` resolves all 8 IDs to `chap_ssc_physics_ch8`.

---

### Task 3: Update `apps/api/prisma/seed-chapter-8.ts`

**Files:**
- Modify: `apps/api/prisma/seed-chapter-8.ts`

**Changes:**
- Upsert 8 topics (`top_ssc_physics_ch8_1..8`) and 8 lessons (`les_ssc_physics_ch8_1..8`) with focused `contentMarkdown` per section.
- Preserve `interactiveWidgetUrl`:
  - `les_ssc_physics_ch8_2`: `'/uploads/interactive/reflection-law-lab.html'`
  - `les_ssc_physics_ch8_6`: `'/uploads/interactive/spherical-mirror-ray-lab.html'`
- Keep `chapter8Questions` upsert loop intact.

---

### Task 4: Re-Map All 80 Verified Questions to Granular Topics (`top_ssc_physics_ch8_1..8`)

**Files:**
- Modify:
  - `apps/api/prisma/seed-chapter-8-questions.ts`
  - `apps/api/prisma/seed-chapter-8-questions-batch2.ts`
  - `apps/api/prisma/seed-chapter-8-questions-batch3.ts`

**Changes:**
- Inspect every question's stem, formula, options, and explanation across all 3 files.
- Re-assign each question's `topicId` strictly to its matching section in `top_ssc_physics_ch8_1..8` (`8.1` EM spectrum/light nature, `8.2` laws/types of reflection, `8.3` plane mirror & real/virtual images, `8.4` spherical mirror geometry & $f = R/2$, `8.5` ray diagram rules & convex mirrors, `8.6` concave mirrors & mirror equation $1/u+1/v=1/f$, `8.7` magnification $m$, `8.8` uses of plane/convex/concave mirrors).
- Keep all 80 question `id`s and question content intact (unless a clarifying fix is needed) so no questions are lost (`count === 80`).

---

### Task 5: Live Verification & Full Regression Suite

**Commands:**
1. Inspect draft HTML structure and links across `drafts/physics-chapter-8/index.html` and `section-01..08.html`.
2. Run question distribution & ID uniqueness check via `tsx` / `node`.
3. Run `pnpm --filter api exec tsx prisma/seed-chapter-8.ts` and verify PostgreSQL topic/lesson/question counts for Chapter 8 (`8` topics, `8` lessons, `80` questions).
4. Run `pnpm --filter api exec tsc --noEmit` and `pnpm --filter web exec tsc --noEmit`.
5. Run `pnpm --filter api test` and `pnpm --filter web test`.
