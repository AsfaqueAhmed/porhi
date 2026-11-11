# SSC Physics Chapter 10 Elevation Design Specification
**Date:** 2026-11-11
**Chapter:** Chapter 10 — স্থির বিদ্যুৎ (Static Electricity)
**Topic IDs:** `top_ssc_physics_ch10_1` through `top_ssc_physics_ch10_4`
**Chapter ID:** `chap_ssc_physics_ch10`

## 1. Objectives & Scope
Elevate Chapter 10 (`স্থির বিদ্যুৎ`) to the benchmark quality established in Chapters 6–9:
1. **Rich Digital Textbook (`drafts/physics-chapter-10/`):**
   - Enhance `styles.css` (preserving the skeuomorphic slider & dark-iframe lab card styles, adding `.stats`, `.stat`, and `.check ol` styling).
   - Upgrade `index.html` and `section-01.html` through `section-08.html` with KaTeX `0.16.8` auto-render math (`$...$`, `$$...$$`), structured pedagogical components (`.goal`, `.grid > .term`, `.highlight-box`, `.table-wrap`, `.worked > .problem + .solution`, `.note`, `.memory`, `details.check`), zero OCR artifacts, and interactive inline HTML/SVG labs.
   - Leave `chapter-source.html` untouched as archival PDF scan reference.
2. **Two Standalone Unified Interactive Simulators (`apps/api/prisma/sample-simulations/` & `apps/api/uploads/interactive/`):**
   - `coulomb-electrostatics-lab.html`: Interactive Coulomb Force & Electric Field Simulator ($F = k\frac{|q_1 q_2|}{\kappa r^2}$, $E = k\frac{|Q|}{\kappa r^2}$), distance guard ($r \ge 10\text{ cm}$), sign toggles, dielectric medium selector, inverse-square curve, and `PORI UNIFIED RANGE SYNC`.
   - `potential-capacitor-lab.html`: Interactive Electric Potential & Parallel-Plate Capacitor Lab ($C = \kappa\varepsilon_0 A/d$, $Q = CV$, $E = V/d$, $U = \frac{1}{2}CV^2$), separation guard ($d \ge 1\text{ mm}$), dielectric insertion toggle, plate-charge visualization, and `PORI UNIFIED RANGE SYNC`.
3. **Database Seeding & Question Bank (`apps/api/prisma/`):**
   - `seed-chapter-10.ts`: Upserts `chap_ssc_physics_ch10`, 4 topics (`top_ssc_physics_ch10_1..4`), and 4 lessons (`les_ssc_physics_ch10_1..4`) with rich Markdown + LaTeX + `interactiveUrl` links on lessons 2 and 3.
   - Three verified question bank batches (`seed-chapter-10-questions.ts`, `batch2.ts`, `batch3.ts`) totaling 80 unique questions (~68 MCQs + 12 `CQ_CREATIVE` across Easy/Medium/Hard and SSC Board styles).
4. **Platform Integration (`seed.ts` & `curriculum-data.ts`):**
   - Wire `seedChapter10(prisma)` into `apps/api/prisma/seed.ts`.
   - Register `chap_ssc_physics_ch10` and `findTopicHierarchy` keyword fallbacks in `apps/web/src/lib/curriculum-data.ts`.

## 2. Curriculum Topic Mapping
| Order | Topic ID | Title (Bangla + English) | Textbook Sections | Interactive Simulation |
| :--- | :--- | :--- | :--- | :--- |
| 1 | `top_ssc_physics_ch10_1` | ১০.১–১০.৩ আধান, ঘর্ষণ, বৈদ্যুতিক আবেশ ও ইলেকট্রোস্কোপ (Charge, Friction, Induction & Electroscope) | 10.1, 10.2, 10.3, 10.3.1 | Inline SVG Electroscope Lab (`section-03.html`) |
| 2 | `top_ssc_physics_ch10_2` | ১০.৪–১০.৫ বৈদ্যুতিক বল, কুলম্বের সূত্র ও তড়িৎ ক্ষেত্র (Coulomb's Law & Electric Field) | 10.4, 10.5 | `coulomb-electrostatics-lab.html` |
| 3 | `top_ssc_physics_ch10_3` | ১০.৬–১০.৭ তড়িৎ বিভব, বিভব পার্থক্য ও ধারক (Electric Potential & Capacitor) | 10.6, 10.6.1, 10.7 | `potential-capacitor-lab.html` |
| 4 | `top_ssc_physics_ch10_4` | ১০.৮ স্থির বিদ্যুতের ব্যবহার, বজ্রপাত ও নিরাপত্তা (Uses of Static Electricity & Lightning Safety) | 10.8.1–10.8.6 | — |
