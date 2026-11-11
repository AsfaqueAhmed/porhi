# Technical Design Specification: SSC Physics Chapter 8 (আলোর প্রতিফলন / Reflection of Light) Full Elevation

- **Date:** 2026-11-11
- **Status:** Approved (User requested next chapter elevation)
- **Author:** Antigravity Engineering Agent
- **Target Files:**
  - Drafts: `drafts/physics-chapter-8/styles.css`, `drafts/physics-chapter-8/index.html`, `drafts/physics-chapter-8/section-01.html` through `section-04.html`
  - Simulations: `apps/api/prisma/sample-simulations/reflection-law-lab.html`, `apps/api/prisma/sample-simulations/spherical-mirror-ray-lab.html`
  - Backend Seeds: `apps/api/prisma/seed-chapter-8.ts`, `apps/api/prisma/seed-chapter-8-questions.ts`, `apps/api/prisma/seed-chapter-8-questions-batch2.ts`, `apps/api/prisma/seed-chapter-8-questions-batch3.ts`
  - Database Seed Root: `apps/api/prisma/seed.ts`
  - Frontend Curriculum: `apps/web/src/lib/curriculum-data.ts`

---

## 1. Intent & Context

Following the elevation pattern completed for Chapters 1–7, Chapter 8 (*আলোর প্রতিফলন / Reflection of Light*) requires a complete pedagogical, interactive, and data-layer upgrade.

Currently, `drafts/physics-chapter-8/` contains minified baseline HTML stubs (`index.html`, `section-01.html`–`section-04.html`) lacking KaTeX formulas, structured pedagogical components (`.memory`, `.lab`, worked multi-step optics derivations, complete ray-diagram image-formation tables), and interactive optics simulation labs. Additionally, no Prisma curriculum seeds (`seed-chapter-8*.ts`) or `curriculum-data.ts` entries exist for Chapter 8.

---

## 2. Goals, Non-Goals & Anti-Goals

### 2.1 Goals
1. **Comprehensive Study Drafts (`drafts/physics-chapter-8/`):**
   - Upgrade `styles.css` with `.memory`, `.lab`, `.preset-row`, `.calc-breakdown`, `.table-wrap`, and skeuomorphic range slider styles while preserving the optical-blue color system.
   - Upgrade `index.html` with KaTeX `0.16.8`, 4 statistics cards, 4 structured roadmap cards covering 8.1–8.8, and direct links to `chapter-source.html` (31 PDF pages).
   - Upgrade `section-01.html` through `section-04.html` with KaTeX `0.16.8`, `.goal`, `.grid > .term`, `.highlight-box`, `.note`, `.memory`, `.worked > .problem + .solution`, `details.check`, and inline interactive SVG optics labs in `section-01.html` and `section-03.html`.
2. **Interactive Simulation Laboratories (`apps/api/prisma/sample-simulations/`):**
   - **Lab 1 (`reflection-law-lab.html`):** Interactive Law of Reflection & Surface Type lab ($\theta_i = \theta_r$, smooth regular vs. rough diffused reflection, glancing angle, mirror rotation $2\theta$ check).
   - **Lab 2 (`spherical-mirror-ray-lab.html`):** Interactive Concave & Convex Spherical Mirror Ray Diagram lab ($f = R/2$, $\frac{1}{u} + \frac{1}{v} = \frac{1}{f}$, $m = -\frac{v}{u}$) with real-time SVG principal rays, image formation, and presets for all 6 concave cases + convex case.
3. **Backend Prisma Curriculum Seed (`apps/api/prisma/seed-chapter-8.ts`):**
   - Upsert `chap_ssc_physics_ch8` (`অষ্টম অধ্যায়: আলোর প্রতিফলন (Reflection of Light)`, `orderIndex: 8`), 4 topics (`top_ssc_physics_ch8_1` through `top_ssc_physics_ch8_4`), and 4 published lessons (`les_ssc_physics_ch8_1` through `les_ssc_physics_ch8_4`) with `interactiveWidgetUrl`s on Topics 8.1 and 8.3.
4. **Comprehensive Board Question Bank (80 Questions across 3 batches):**
   - `seed-chapter-8-questions.ts` (Batch 1: 26 MCQs & CQs for 8.1–8.4).
   - `seed-chapter-8-questions-batch2.ts` (Batch 2: 26 MCQs & CQs for 8.5–8.8).
   - `seed-chapter-8-questions-batch3.ts` (Batch 3: 28 analytical/board MCQs & CQs across 8.1–8.8).
5. **Full System Integration:**
   - Register `seedChapter8` in `apps/api/prisma/seed.ts`.
   - Register `chap_ssc_physics_ch8` and its heuristic fallback in `apps/web/src/lib/curriculum-data.ts`.

### 2.2 Non-Goals
- Modifying Chapters 1–7 or Chapter 9.
- Altering `chapter-source.html` or `drafts/physics-chapter-8/assets/`.

---

## 3. Curriculum Structure (Sections 8.1 – 8.8 across 4 Lessons)

- **8.1–8.2 আলোর প্রকৃতি ও প্রতিফলন (`section-01.html` / `top_ssc_physics_ch8_1`):** তড়িৎচুম্বকীয় তরঙ্গ ও দৃশ্যমান বর্ণালি ($400\text{–}700\text{ nm}$), প্রতিফলন/প্রতিসরণ/শোষণ, প্রতিফলনের সূত্র ($\theta_i = \theta_r$), নিয়মিত ও ব্যাপ্ত প্রতিফলন।
- **8.3–8.4 দর্পণ ও প্রতিবিম্ব, গোলীয় দর্পণের পরিচিতি (`section-02.html` / `top_ssc_physics_ch8_2`):** বাস্তব ও অবাস্তব প্রতিবিম্ব, সমতল দর্পণে প্রতিবিম্ব ও পার্শ্বীয় পরিবর্তন, ন্যূনতম দর্পণ দৈর্ঘ্য ($H/2$), দর্পণের ঘূর্ণন ($2\theta$), গোলীয় দর্পণের $P, C, F, R, f = R/2$।
- **8.5–8.6 উত্তল ও অবতল দর্পণ (`section-03.html` / `top_ssc_physics_ch8_3`):** উত্তল ও অবতল দর্পণে প্রধান রশ্মি অঙ্কন, অবতল দর্পণের ৬ অবস্থানে প্রতিবিম্বের অবস্থান-আকার-প্রকৃতি, দর্পণ সমীকরণ $\frac{1}{u} + \frac{1}{v} = \frac{1}{f}$ ও চিহ্ন-রীতি।
- **8.7–8.8 বিবর্ধন ও দর্পণের ব্যবহার (`section-04.html` / `top_ssc_physics_ch8_4`):** বিবর্ধন ($m = \frac{h_i}{h_o} = -\frac{v}{u}$), সমতল/উত্তল/অবতল দর্পণের ব্যবহার ও পাহাড়ি রাস্তার বাঁকের নিরাপত্তা দর্পণ।

---

## 4. Verification Plan

1. Node.js validator script verifying all Chapter 8 drafts, KaTeX CDN tags, balanced math delimiters, pedagogical sections, relative links, simulation files, and question bank invariants (80 unique questions, 4 options per MCQ with 1 correct, complete `cqRubric` for CQs).
2. TypeScript compilation checks (`pnpm --filter api exec tsc --noEmit` and `pnpm --filter web exec tsc --noEmit`) plus `tsx` runtime import check.
