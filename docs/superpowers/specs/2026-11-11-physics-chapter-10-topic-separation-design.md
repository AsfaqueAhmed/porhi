# SSC Physics Chapter 10 — 1-to-1 Topic Separation Design

**Date:** 2026-11-11  
**Chapter:** `chap_ssc_physics_ch10` — দশম অধ্যায়: স্থির বিদ্যুৎ (Static Electricity)  
**Status:** Approved by user

---

## 1. Problem Statement

`drafts/physics-chapter-10/` already separates Chapter 10 into 8 individual textbook sections (`section-01.html`–`section-08.html`, covering `10.1`–`10.8`). However, the Prisma seed (`apps/api/prisma/seed-chapter-10.ts`), 80-question bank (`seed-chapter-10-questions*.ts`), and frontend curriculum (`apps/web/src/lib/curriculum-data.ts`) currently merge those 8 sections into 4 grouped topics (`10.1–10.3`, `10.4–10.5`, `10.6–10.7`, `10.8`).

---

## 2. Target 8-Topic Architecture (`10.1`–`10.8`)

| Order | Topic ID | Lesson ID | Title | Draft Section | Interactive Lab |
|---|---|---|---|---|---|
| 1 | `top_ssc_physics_ch10_1` | `les_ssc_physics_ch10_1` | `১০.১ আধান বা চার্জ` | `section-01.html` | — |
| 2 | `top_ssc_physics_ch10_2` | `les_ssc_physics_ch10_2` | `১০.২ ঘর্ষণে স্থির বিদ্যুৎ তৈরি` | `section-02.html` | — |
| 3 | `top_ssc_physics_ch10_3` | `les_ssc_physics_ch10_3` | `১০.৩ বৈদ্যুতিক আবেশ ও ইলেকট্রোস্কোপ` | `section-03.html` | — |
| 4 | `top_ssc_physics_ch10_4` | `les_ssc_physics_ch10_4` | `১০.৪ বৈদ্যুতিক বল ও কুলম্বের সূত্র` | `section-04.html` | `/uploads/interactive/coulomb-electrostatics-lab.html` |
| 5 | `top_ssc_physics_ch10_5` | `les_ssc_physics_ch10_5` | `১০.৫ তড়িৎ ক্ষেত্র ও বলরেখা` | `section-05.html` | — |
| 6 | `top_ssc_physics_ch10_6` | `les_ssc_physics_ch10_6` | `১০.৬ তড়িৎ বিভব ও বিভব পার্থক্য` | `section-06.html` | — |
| 7 | `top_ssc_physics_ch10_7` | `les_ssc_physics_ch10_7` | `১০.৭ ধারক ও সঞ্চিত শক্তি` | `section-07.html` | `/uploads/interactive/potential-capacitor-lab.html` |
| 8 | `top_ssc_physics_ch10_8` | `les_ssc_physics_ch10_8` | `১০.৮ স্থির বিদ্যুতের ব্যবহার ও নিরাপত্তা` | `section-08.html` | — |

---

## 3. Scope & Preservation Rules

1. **Preserve untouched:**
   - `drafts/physics-chapter-10/` (`index.html`, `section-01..08.html`, `chapter-source.html` — already aligned 1:1 to `10.1–10.8`).
   - `apps/web/public/uploads/interactive/coulomb-electrostatics-lab.html` and `potential-capacitor-lab.html`.
2. **Prisma Seed (`apps/api/prisma/seed-chapter-10.ts`):**
   - Expand `seedChapter10` to upsert all 8 topics (`top_ssc_physics_ch10_1..8`) and 8 lessons (`les_ssc_physics_ch10_1..8`), explicitly setting `interactiveWidgetUrl: lessonData.interactiveWidgetUrl ?? null` so stale widget URLs on `les_ssc_physics_ch10_2` and `les_ssc_physics_ch10_3` are cleared when moving to `les_ssc_physics_ch10_4` and `les_ssc_physics_ch10_7`.
3. **80-Question Bank (`seed-chapter-10-questions.ts`, `batch2.ts`, `batch3.ts`):**
   - Re-assign every `topicId` strictly to its matching topic in `top_ssc_physics_ch10_1..8` without losing or dropping any question (`total = 80`).
4. **Frontend Curriculum (`apps/web/src/lib/curriculum-data.ts`):**
   - Update `chap_ssc_physics_ch10.topics` to the 8 granular topics (`orderIndex: 1..8`).

---

## 4. Verification Plan

1. Validate all 9 draft HTML files in `drafts/physics-chapter-10/` (already verified clean).
2. Validate 80 unique question IDs across `top_ssc_physics_ch10_1..8`.
3. Run `pnpm --filter api exec tsx prisma/seed-chapter-10.ts` against local PostgreSQL and query live DB counts (`8` topics, `8` lessons, `80` questions).
4. Run `pnpm --filter api exec tsc --noEmit`, `pnpm --filter web exec tsc --noEmit`, `pnpm --filter api test`, and `pnpm --filter web test`.
