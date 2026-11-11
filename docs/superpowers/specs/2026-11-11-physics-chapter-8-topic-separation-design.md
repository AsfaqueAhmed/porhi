# SSC Physics Chapter 8 — 1-to-1 Topic Separation Design

**Date:** 2026-11-11  
**Chapter:** `chap_ssc_physics_ch8` — অষ্টম অধ্যায়: আলোর প্রতিফলন (Reflection of Light)  
**Status:** Approved by user

---

## 1. Problem Statement

Unlike SSC Physics Chapters 1–6 (each defining 6–10 separate topics mapped 1:1 to textbook subsections), Chapter 8 originally merged its 8 textbook sections (`8.1`–`8.8`) into 4 paired topics (`8.1–8.2`, `8.3–8.4`, `8.5–8.6`, `8.7–8.8`) across:
- `drafts/physics-chapter-8/` (`index.html`, `section-01.html`–`section-04.html`)
- `apps/api/prisma/seed-chapter-8.ts` (`top_ssc_physics_ch8_1..4`, `les_ssc_physics_ch8_1..4`)
- `apps/api/prisma/seed-chapter-8-questions.ts`, `seed-chapter-8-questions-batch2.ts`, `seed-chapter-8-questions-batch3.ts` (80 questions mapped to `ch8_1..4`)
- `apps/web/src/lib/curriculum-data.ts` (`chap_ssc_physics_ch8.topics`)

---

## 2. Target 8-Topic Architecture (`8.1`–`8.8`)

| Order | Topic ID | Lesson ID | Textbook Section & Title | Draft File | Interactive Lab |
|---|---|---|---|---|---|
| 1 | `top_ssc_physics_ch8_1` | `les_ssc_physics_ch8_1` | `৮.১ আলোর প্রকৃতি ও তড়িৎচুম্বকীয় বর্ণালি` | `section-01.html` | — |
| 2 | `top_ssc_physics_ch8_2` | `les_ssc_physics_ch8_2` | `৮.২ আলোর প্রতিফলন, সূত্র ও ধরন` | `section-02.html` | `/uploads/interactive/reflection-law-lab.html` |
| 3 | `top_ssc_physics_ch8_3` | `les_ssc_physics_ch8_3` | `৮.৩ দর্পণ, প্রতিবিম্ব ও সমতল দর্পণ` | `section-03.html` | — |
| 4 | `top_ssc_physics_ch8_4` | `les_ssc_physics_ch8_4` | `৮.৪ গোলীয় দর্পণের পরিচিতি ও জ্যামিতি` | `section-04.html` | — |
| 5 | `top_ssc_physics_ch8_5` | `les_ssc_physics_ch8_5` | `৮.৫ প্রতিবিম্ব অঙ্কন ও উত্তল দর্পণ` | `section-05.html` | — |
| 6 | `top_ssc_physics_ch8_6` | `les_ssc_physics_ch8_6` | `৮.৬ অবতল দর্পণ ও দর্পণের সমীকরণ` | `section-06.html` | `/uploads/interactive/spherical-mirror-ray-lab.html` |
| 7 | `top_ssc_physics_ch8_7` | `les_ssc_physics_ch8_7` | `৮.৭ রৈখিক বিবর্ধন` | `section-07.html` | — |
| 8 | `top_ssc_physics_ch8_8` | `les_ssc_physics_ch8_8` | `৮.৮ সমতল, উত্তল ও অবতল দর্পণের ব্যবহার` | `section-08.html` | — |

---

## 3. Scope & Preservation Rules

1. **Preserve untouched:**
   - `drafts/physics-chapter-8/chapter-source.html`
   - `drafts/physics-chapter-8/assets/` (all 31 images; keep valid relative paths and SVG diagrams)
   - `apps/web/public/uploads/interactive/reflection-law-lab.html` and `spherical-mirror-ray-lab.html`
2. **Draft HTMLs (`drafts/physics-chapter-8/section-01..08.html` + `index.html`):**
   - Split content cleanly so each `section-0X.html` focuses strictly on its single textbook topic, with aligned `শিখনফল`, worked math examples, inline quizzes/memory aids, and clean `prev`/`next`/index navigation links.
   - Preserve the inline interactive reflection lab in `section-02.html` and inline spherical mirror ray lab in `section-06.html`.
   - Keep `styles.css` supporting all classes used across `section-01..08.html` (normalize styling or retain full CSS coverage so no section loses styles).
   - Update `index.html` with 8 topic roadmap cards (`৮.১`–`৮.৮`) matching the actual split.
3. **Database Seeding (`apps/api/prisma/seed-chapter-8.ts` & question files):**
   - Upsert all 8 topics (`top_ssc_physics_ch8_1..8`) and 8 lessons (`les_ssc_physics_ch8_1..8`) with crisp topic-specific `contentMarkdown` and formulas.
   - Re-audit all 80 verified questions across `seed-chapter-8-questions.ts`, `batch2.ts`, and `batch3.ts`, assigning each question's `topicId` to the exact corresponding `top_ssc_physics_ch8_1..8` without losing or dropping any question (`total = 80`).
   - Add a post-seed check or validation script ensuring all 8 topics exist, each has questions, total questions = 80, and every `topicId` belongs to `top_ssc_physics_ch8_1..8`.
4. **Frontend Curriculum (`apps/web/src/lib/curriculum-data.ts`):**
   - Replace the 4 merged topic entries under `chap_ssc_physics_ch8.topics` with the 8 separate entries (`orderIndex: 1..8`).
   - Verify `findTopicHierarchy` matches `top_ssc_physics_ch8_1..8` cleanly.

---

## 4. Verification Plan

1. Validate all 8 draft HTML files + `index.html` (no broken links/images/anchors, KaTeX script/styles intact, clean prev/next chain `01 -> 02 -> ... -> 08`).
2. Verify 80 unique question IDs across `seed-chapter-8-questions*.ts`, balanced across `top_ssc_physics_ch8_1..8`, zero orphan/legacy topic IDs.
3. Run `pnpm --filter api exec tsx prisma/seed-chapter-8.ts` against local PostgreSQL and verify DB row counts (`8` topics, `8` lessons, `80` questions).
4. Run `pnpm --filter api exec tsc --noEmit`, `pnpm --filter web exec tsc --noEmit`, `pnpm --filter api test`, and `pnpm --filter web test`.
