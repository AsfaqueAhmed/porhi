# Technical Design Specification: SSC Physics Chapter 7 (তরঙ্গ ও শব্দ / Waves and Sound) Full Elevation

- **Date:** 2026-11-11
- **Status:** Approved (User opted for direct Chapter 6–style elevation)
- **Author:** Antigravity Engineering Agent
- **Target Files:**
  - Drafts: `drafts/physics-chapter-7/index.html`, `drafts/physics-chapter-7/section-01.html` through `section-03.html`
  - Simulations: `apps/api/prisma/sample-simulations/shm-pendulum-lab.html`, `apps/api/prisma/sample-simulations/sound-wave-simulator.html` (existing), `apps/api/prisma/sample-simulations/echo-sound-speed-lab.html`
  - Backend Seeds: `apps/api/prisma/seed-chapter-7.ts`, `apps/api/prisma/seed-chapter-7-questions.ts`, `apps/api/prisma/seed-chapter-7-questions-batch2.ts`, `apps/api/prisma/seed-chapter-7-questions-batch3.ts`
  - Database Seed Root: `apps/api/prisma/seed.ts`
  - Frontend Curriculum: `apps/web/src/lib/curriculum-data.ts`

---

## 1. Intent & Context

Following the elevation pattern established for Chapters 1–6, Chapter 7 (*তরঙ্গ ও শব্দ / Waves and Sound*) requires a complete pedagogical, interactive, and data-layer upgrade.

Currently, `drafts/physics-chapter-7/` contains minified baseline HTML stubs (`index.html`, `section-01.html`–`section-03.html`) without KaTeX mathematical typesetting, structured study components (`.highlight-box`, `.memory`, `.worked`, multi-problem derivations), or SHM/echo simulation labs. Additionally, no Prisma curriculum seeds (`seed-chapter-7*.ts`) or `curriculum-data.ts` entries exist for Chapter 7.

---

## 2. Goals, Non-Goals & Anti-Goals

### 2.1 Goals
1. **Comprehensive Study Drafts (`drafts/physics-chapter-7/`):**
   - Upgrade `index.html` with an indigo/violet acoustic-wave theme matching `styles.css`, 4 statistics cards, and 3 rich roadmap cards with direct anchors to all 8 subsections (`#sub-7-2-1`–`#sub-7-2-3`, `#sub-7-3-1`–`#sub-7-3-5`) and `chapter-source.html`.
   - Upgrade `section-01.html` through `section-03.html` with KaTeX `0.16.8` CDN & auto-render, structured `.goal`, `.grid > .term`, `.highlight-box`, `.note`, `.memory`, `.worked > .problem + .solution`, `details.check`, and inline interactive SVG labs.
2. **Interactive Simulation Laboratories (`apps/api/prisma/sample-simulations/`):**
   - **Lab 1 (`shm-pendulum-lab.html`):** Interactive Simple Harmonic Motion lab supporting Simple Pendulum ($T = 2\pi\sqrt{\ell/g}$) and Spring-Mass ($T = 2\pi\sqrt{m/k}$) modes with animated SVG motion, real-time $T, f, \omega$ calculations, and presets (Earth, Moon, Second Pendulum).
   - **Lab 2 (`sound-wave-simulator.html`):** Existing interactive wave & audio frequency simulator wired to Section 7.2 (`v = f\lambda`).
   - **Lab 3 (`echo-sound-speed-lab.html`):** Interactive Echo & Sound Speed lab supporting medium selection (Air, Water, Iron), temperature control ($v_\theta \approx v_0 + 0.6\theta$ and $v \propto \sqrt{T}$), obstacle distance slider, animated sound wave pulse & echo reflection, and $t \ge 0.1\text{ s}$ audibility check.
3. **Backend Prisma Curriculum Seed (`apps/api/prisma/seed-chapter-7.ts`):**
   - Upsert `chap_ssc_physics_ch7` (`সপ্তম অধ্যায়: তরঙ্গ ও শব্দ (Waves and Sound)`, `orderIndex: 7`), 3 topics (`top_ssc_physics_ch7_1` through `top_ssc_physics_ch7_3`), and 3 published lessons (`les_ssc_physics_ch7_1` through `les_ssc_physics_ch7_3`) with `interactiveWidgetUrl`s, KaTeX explanations, terms, worked examples, and mnemonics.
4. **Comprehensive Board Question Bank (78 Questions across 3 batches):**
   - `seed-chapter-7-questions.ts` (Batch 1: 26 MCQs & CQs covering 7.1 & 7.2).
   - `seed-chapter-7-questions-batch2.ts` (Batch 2: 26 MCQs & CQs covering 7.2 & 7.3).
   - `seed-chapter-7-questions-batch3.ts` (Batch 3: 26 Board-level analytical MCQs & CQs covering 7.1–7.3).
   - Authentic SSC Board attributions, 4-part CQ rubrics (`ka`, `kha`, `ga`, `gha`), and per-option distractor analyses.
5. **Full System Integration:**
   - Register `seedChapter7` in `apps/api/prisma/seed.ts`.
   - Register Chapter 7 and its heuristic fallback in `apps/web/src/lib/curriculum-data.ts`.

### 2.2 Non-Goals
- Modifying earlier chapters (Chapters 1–6) or Chapters 8–9.
- Modifying `chapter-source.html` scanned textbook pages.

---

## 3. Curriculum Structure (Sections 7.1 – 7.3)

- **7.1 সরল স্পন্দন গতি (Simple Harmonic Motion):** পর্যায়বৃত্ত ও স্পন্দন গতি, সাম্যাবস্থা, পুনঃস্থাপন বল ($F = -kx$), বিস্তার ($A$), পর্যায়কাল ($T$), কম্পাঙ্ক ($f = 1/T$), দশা, স্প্রিং-ভর ($T = 2\pi\sqrt{m/k}$) ও সরল দোলক ($T = 2\pi\sqrt{\ell/g}$), সেকেন্ড দোলক ($T = 2\text{ s}$)।
- **7.2 তরঙ্গ (Waves):**
  - 7.2.1 তরঙ্গের বৈশিষ্ট্য (শক্তি সঞ্চালন, প্রতিফলন, প্রতিসরণ, উপরিপাতন, $I \propto A^2$, যান্ত্রিক বনাম তড়িৎচুম্বকীয়)।
  - 7.2.2 তরঙ্গের প্রকারভেদ (অনুপ্রস্থ ও অনুদৈর্ঘ্য তরঙ্গের গঠন, চূড়া/খাঁজ বনাম সংকোচন/প্রসারণ, তুলনা)।
  - 7.2.3 তরঙ্গ-সংশ্লিষ্ট রাশি ($\lambda, f, T, A, v$ এবং $v = f\lambda = \lambda/T$)।
- **7.3 শব্দ তরঙ্গ (Sound Wave):**
  - মাধ্যমের প্রয়োজনীয়তা, শ্রাব্যতার পাল্লা ($20\text{ Hz}$–$20,000\text{ Hz}$), ইনফ্রাসাউন্ড ও আল্ট্রাসাউন্ড।
  - 7.3.1 প্রতিধ্বনি ($d = \frac{vt}{2}$, $0.1\text{ s}$ স্থায়িত্বকাল, ন্যূনতম দূরত্ব)।
  - 7.3.2 শব্দের বেগের পার্থক্য (কঠিন/তরল/বায়ু, $v \propto \sqrt{T} \implies \frac{v_1}{v_2} = \sqrt{\frac{T_1}{T_2}}$, $v_\theta \approx 330 + 0.6\theta$, আর্দ্রতা ও ঘনত্ব)।
  - 7.3.3 শব্দের ব্যবহার (আল্ট্রাসনোগ্রাফি, ক্লিনার, ভূকম্পীয় জরিপ, SONAR, বাদুড় ও ডলফিন)।
  - 7.3.4 সুরযুক্ত শব্দ (প্রাবল্য, তীক্ষ্ণতা, গুণ/জাতি, তার/বায়ু/আঘাত বাদ্যযন্ত্র)।
  - 7.3.5 শব্দদূষণ (ডেসিবেল dB মাত্রা, স্বাস্থ্যঝুঁকি ও প্রতিকার)।

---

## 4. Verification Plan

1. Node.js validator script verifying all Chapter 7 drafts, KaTeX CDN scripts, balanced math delimiters, pedagogical sections, relative links, simulation files, and question bank invariants ($\ge 75$ unique questions, valid answers, complete CQ rubrics).
2. TypeScript compilation checks for API (`pnpm --filter api exec tsc --noEmit`) and Web (`pnpm --filter web exec tsc --noEmit`).
