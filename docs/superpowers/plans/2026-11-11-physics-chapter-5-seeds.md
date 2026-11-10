# SSC Physics Chapter 5 Database Curriculum & Question Bank (72 Questions) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Author and integrate the full database curriculum seed and a 72-question bank (54 MCQs + 18 CQs with rubrics) for SSC Physics Chapter 5 (*পদার্থের অবস্থা ও চাপ / States of Matter and Pressure*) following the exact patterns of Chapter 1 and Chapter 2.

**Architecture:** Standalone HTML5/SVG simulation labs are placed in `apps/api/prisma/sample-simulations/`. Questions are partitioned into three 24-question batch files (`seed-chapter-5-questions.ts`, `batch2.ts`, `batch3.ts`) satisfying the `QuestionData` TypeScript interface. The main chapter seed (`seed-chapter-5.ts`) creates the chapter, 6 topics, and 6 rich lessons with KaTeX formulas, term cards, worked examples, and simulation links. Everything is wired into `apps/api/prisma/seed.ts` and `apps/web/src/lib/curriculum-data.ts`. A Node.js test harness in scratch validates question counts, schemas, and math formatting.

**Tech Stack:** TypeScript, Prisma ORM, PostgreSQL schema, KaTeX notation, HTML5/SVG (Vanilla JS simulations), Node.js test validator.

**Spec:** `docs/superpowers/specs/2026-11-11-physics-chapter-5-seeds-design.md`

## Global Constraints

- Every question must adhere to the `QuestionData` interface defined in `apps/api/prisma/seed-chapter-1-questions.ts`.
- Every MCQ must have exactly 4 options with exactly 1 `isCorrect: true`, plus `explanation` containing `directAnswer`, `coreConcept`, `stepDerivation` (with KaTeX), `distractorAnalysis` (for all 3 incorrect options), `textbookCitation`, and `proTipShortcut`.
- Every CQ must have a realistic stem, type `'CQ_CREATIVE'`, and `cqRubric` with all 4 parts: `ka` (1 mark), `kha` (2 marks), `ga` (3 marks), `gha` (4 marks).
- Total questions across the 3 batches must be at least 72 (54 MCQs + 18 CQs), evenly divided across the 6 topics (9 MCQs and 3 CQs per topic).
- Lesson explanations in `seed-chapter-5.ts` must use rich markdown with KaTeX mathematics, terms, and worked examples matching Chapter 1 & 2 standards.
- Standalone simulation files in `sample-simulations/` must be self-contained HTML files (CSS + SVG + Vanilla JS) without external build dependencies.
- `seed.ts` must copy the new simulations to `apps/api/uploads/interactive/` and execute `await seedChapter5(prisma)`.
- `apps/web/src/lib/curriculum-data.ts` must export Chapter 5 and all 6 topics under `sscPhysicsChapters`.
- All TypeScript checks (`tsc --noEmit`) must pass without errors.

## Review Focus

1. **Missing or incomplete question rubrics/distractors:** Ensure no question omits `distractorAnalysis` or 4-part `cqRubric`.
2. **Broken or unbalanced LaTeX math delimiters:** Ensure all `$`, `$$`, and backslashes in template literals are properly escaped (e.g., `\\frac`, `\\rho`, `\\Delta`).
3. **Question ID collisions or invalid topicIds:** Ensure all question IDs follow `q_ch5_<topicNum>_<mcq/cq>_<index>` and match topic IDs (`top_ssc_physics_ch5_1` through `ch5_6`).
4. **Offline database resilience:** Ensure `seed-chapter-5.ts` catches connection errors gracefully when database server is not running during build/test.
5. **Topic navigation consistency:** Ensure `curriculum-data.ts` hierarchy contains all 6 topics with correct orderIndex values.

---

### Task 1: Setup Question Bank & Seed Validation Test Harness

**Files:**
- Create: `/Users/asfaque/.gemini/antigravity/brain/f25d8112-5ff5-431d-9921-e44befbc72a0/scratch/validate-ch5-seeds.js`

**Interfaces:**
- Produces: Command-line exit code 0 if all Chapter 5 seed files exist and pass question schema, count, and typing rules; exit code 1 with specific diagnostic errors otherwise.

- [ ] **Step 1: Write `validate-ch5-seeds.js`**
  Implement test checks for:
  - Existence of `hydraulic-press-buoyancy-lab.html` and `hookes-law-elasticity-lab.html` in `apps/api/prisma/sample-simulations/`.
  - Existence of `seed-chapter-5.ts`, `seed-chapter-5-questions.ts`, `batch2.ts`, and `batch3.ts`.
  - Export of `chapter5Questions` array with length >= 72.
  - Exactly 54+ MCQs and 18+ CQs.
  - Distribution: exactly 9+ MCQs and 3+ CQs for each of the 6 topics (`top_ssc_physics_ch5_1` to `top_ssc_physics_ch5_6`).
  - Validation of MCQ fields: 4 options, exactly 1 correct, distractorAnalysis for all distractors, coreConcept, stepDerivation.
  - Validation of CQ fields: stem, null options, cqRubric with ka, kha, ga, gha criteria and marks (1, 2, 3, 4).
  - Balanced math delimiters in questions ($ and $$).
  - Verification of `seedChapter5` in `apps/api/prisma/seed.ts`.
  - Verification of Chapter 5 in `apps/web/src/lib/curriculum-data.ts`.

- [ ] **Step 2: Run validator to verify initial expected failures**
  Run: `node /Users/asfaque/.gemini/antigravity/brain/f25d8112-5ff5-431d-9921-e44befbc72a0/scratch/validate-ch5-seeds.js`
  Expected: FAIL (files missing).

---

### Task 2: Create Standalone Interactive Simulation Laboratories

**Files:**
- Create: `apps/api/prisma/sample-simulations/hydraulic-press-buoyancy-lab.html`
- Create: `apps/api/prisma/sample-simulations/hookes-law-elasticity-lab.html`

**Interfaces:**
- Consumes: SVG simulation architectures from Section 5.3 and Section 5.5 drafts.
- Produces: Standalone responsive HTML5 simulation files with interactive controls and real-time SVG updates.

- [ ] **Step 1: Create `hydraulic-press-buoyancy-lab.html`**
  - Standalone HTML document with embedded CSS, SVG visualizer, control sliders ($F_1$, $r_2/r_1$, $\rho$, $V$), and live calculation cards ($F_2$, stroke distances, mechanical advantage, buoyant force).
  - Presets for Water, Kerosene, Glycerin, and Mercury.
  - Responsive styling matching other sample simulations (e.g. `mechanical-energy-conservation-lab.html`).

- [ ] **Step 2: Create `hookes-law-elasticity-lab.html`**
  - Standalone HTML document with embedded CSS, SVG dual-visualizer (helical spring deformation and tensile wire elongation), material presets (Steel, Copper, Aluminum), and live parameter sliders ($F$, $k$, $L$, $r$).
  - Live calculations: Stress, Strain, Wire Elongation ($\Delta L$), Spring Displacement ($x$), Potential Energy ($E_p$).

- [ ] **Step 3: Verify simulation files exist and render properly**
  Run: `node -e "['hydraulic-press-buoyancy-lab.html', 'hookes-law-elasticity-lab.html'].forEach(f => { if (!require('fs').existsSync('apps/api/prisma/sample-simulations/' + f)) process.exit(1); })"`
  Expected: PASS.

---

### Task 3: Author Chapter 5 Batch 1 Questions (Topics 5.1 & 5.2)

**Files:**
- Create: `apps/api/prisma/seed-chapter-5-questions.ts`

**Interfaces:**
- Produces: `QuestionData` interface and `batch1Questions` containing 24 questions (18 MCQs + 6 CQs) covering Topic 5.1 (`top_ssc_physics_ch5_1`) and Topic 5.2 (`top_ssc_physics_ch5_2`).

- [ ] **Step 1: Write `seed-chapter-5-questions.ts`**
  - Define and export `QuestionData` interface (matching Chapter 1 and Chapter 2).
  - Author 9 MCQs for 5.1 (*চাপ / Pressure*):
    - Definition of pressure ($P = F/A$), SI units ($\text{Pa} = \text{N/m}^2$), dimension $[ML^{-1}T^{-2}]$, scalar property, effect of area change, nail/knife sharpening physics, high-heel vs elephant pressure comparison, tractor wide tires, and atmospheric pressure conversion.
  - Author 3 CQs for 5.1 (*চাপ*):
    - Stimulus 1: Person standing on two feet vs one foot on a mattress / mud.
    - Stimulus 2: Wooden block with 3 different dimensions placed on a table.
    - Stimulus 3: Heavy truck wheel configuration and road damage analysis.
  - Author 9 MCQs for 5.2 (*ঘনত্ব / Density*):
    - Definition of density ($\rho = m/V$), SI unit ($\text{kg/m}^3$), unit conversion ($1\text{ g/cm}^3 = 1000\text{ kg/m}^3$), density of water at 4°C ($1000\text{ kg/m}^3$), anomalous expansion of water, floating condition ($\rho_b < \rho_l$), density of ice vs water, Dead Sea floating, and iron ship vs nail density.
  - Author 3 CQs for 5.2 (*ঘনত্ব*):
    - Stimulus 1: Rectangular metal block placed in water and mercury.
    - Stimulus 2: Floating ice cube in a freshwater glass and salt-water glass.
    - Stimulus 3: Pure liquid identification via density and mass-volume graph.
  - Combine and export: `export const chapter5Questions: QuestionData[] = [...batch1Questions, ...chapter5Batch2Questions, ...chapter5Batch3Questions];`.

- [ ] **Step 2: Validate Batch 1 syntax**
  Run: `npx tsx -e "import { chapter5Questions } from './apps/api/prisma/seed-chapter-5-questions'; console.log('Batch 1 loaded:', chapter5Questions.length);"`
  (Note: will test after Batch 2 & 3 stubs are in place, or export `batch1Questions` directly).

---

### Task 4: Author Chapter 5 Batch 2 Questions (Topics 5.3 & 5.4)

**Files:**
- Create: `apps/api/prisma/seed-chapter-5-questions-batch2.ts`

**Interfaces:**
- Produces: `chapter5Batch2Questions` containing 24 questions (18 MCQs + 6 CQs) covering Topic 5.3 (`top_ssc_physics_ch5_3`) and Topic 5.4 (`top_ssc_physics_ch5_4`).

- [ ] **Step 1: Write `seed-chapter-5-questions-batch2.ts`**
  - Author 9 MCQs for 5.3 (*তরলে চাপ, প্যাসকেলের সূত্র ও প্লবতা*):
    - Liquid pressure derivation ($P = h\rho g$), hydrostatic paradox, Pascal's principle, hydraulic press force multiplication ($F_2 = F_1(A_2/A_1)$), energy conservation ($F_1 l_1 = F_2 l_2$), Archimedes' principle ($F_b = V\rho g$), apparent weight loss, submerged volume ratio, and submarine diving.
  - Author 3 CQs for 5.3 (*তরলে চাপ ও প্লবতা*):
    - Stimulus 1: Hydraulic car lift with dual pistons ($r_1 = 5\text{ cm}, r_2 = 50\text{ cm}$).
    - Stimulus 2: Cylinder immersed in liquid with pressure at top and bottom surfaces ($h_1, h_2$).
    - Stimulus 3: Solid sphere floating with 2/3 volume submerged in liquid A and submerged in liquid B.
  - Author 9 MCQs for 5.4 (*বায়ুচাপ, ব্যারোমিটার ও আবহাওয়া*):
    - Standard atmospheric pressure ($101325\text{ Pa} = 76\text{ cm Hg}$), Torricelli's experiment and vacuum, weather forecasting rules (gradual drop, sudden cyclone drop, gradual rise), altitude pressure decrease, human internal pressure balance, water barometer height ($10.34\text{ m}$), and airplane cabin pressure.
  - Author 3 CQs for 5.4 (*বায়ুচাপ ও ব্যারোমিটার*):
    - Stimulus 1: Barometer reading at sea level ($76\text{ cm}$) vs mountain peak ($62\text{ cm}$).
    - Stimulus 2: Torricelli tube experiment with mercury vs water comparison.
    - Stimulus 3: Sudden drop in local barometer reading before a tropical cyclone.

- [ ] **Step 2: Validate Batch 2 syntax**

---

### Task 5: Author Chapter 5 Batch 3 Questions (Topics 5.5 & 5.6)

**Files:**
- Create: `apps/api/prisma/seed-chapter-5-questions-batch3.ts`

**Interfaces:**
- Produces: `chapter5Batch3Questions` containing 24 questions (18 MCQs + 6 CQs) covering Topic 5.5 (`top_ssc_physics_ch5_5`) and Topic 5.6 (`top_ssc_physics_ch5_6`).

- [ ] **Step 1: Write `seed-chapter-5-questions-batch3.ts`**
  - Author 9 MCQs for 5.5 (*স্থিতিস্থাপকতা ও হুকের সূত্র*):
    - Definition of elasticity and elastic limit, Strain formula and dimensionless nature, Stress definition ($F/A$) and SI unit ($\text{Pa}$), Hooke's law statement, Young's modulus ($Y = \frac{FL}{A\Delta L}$), steel vs rubber elasticity comparison, spring constant ($F = kx$), spring energy ($E_p = \frac{1}{2}kx^2$), and breaking stress.
  - Author 3 CQs for 5.5 (*স্থিতিস্থাপকতা ও হুকের সূত্র*):
    - Stimulus 1: Two wires of identical length (Steel and Copper) under same tensile load.
    - Stimulus 2: Helical spring loaded with different masses and force-extension graph.
    - Stimulus 3: Construction girder selection and safety factor analysis based on Young's modulus.
  - Author 9 MCQs for 5.6 (*পদার্থের তিন অবস্থা, আণবিক গতিতত্ত্ব ও প্লাজমা*):
    - Characteristics of solid, liquid, gas, kinetic molecular theory postulates, molecular explanation of gas pressure, Gay-Lussac's pressure-temperature law ($P \propto T$), plasma definition (ionized gas), properties of plasma (electrically conductive, magnetic confinement), solar and stellar plasma abundance (99% of universe), and Tokamak reactors.
  - Author 3 CQs for 5.6 (*পদার্থের অবস্থা ও প্লাজমা*):
    - Stimulus 1: Gas enclosed in a rigid cylinder heated from $27^\circ\text{C}$ to $127^\circ\text{C}$.
    - Stimulus 2: Microscopic particle arrangement comparison of solid, liquid, gas, and plasma.
    - Stimulus 3: Natural lightning and northern lights (aurora) vs neon lighting and fusion energy.

- [ ] **Step 2: Validate Batch 3 syntax**

---

### Task 6: Author Chapter 5 Curriculum & Lessons Seed

**Files:**
- Create: `apps/api/prisma/seed-chapter-5.ts`

**Interfaces:**
- Consumes: `chapter5Questions` from `seed-chapter-5-questions.ts`.
- Produces: `seedChapter5(prisma: PrismaClient)` function that creates `chap_ssc_physics_ch5`, 6 topics, 6 lessons with interactive simulation links, and upserts all 72 questions.

- [ ] **Step 1: Write `seed-chapter-5.ts`**
  - Helper `upsertTopicAndLesson(...)` matching Chapter 1 and Chapter 2.
  - Upsert chapter: `chap_ssc_physics_ch5` (orderIndex: 5, subjectId: `sub_ssc_physics`).
  - Upsert Topic 5.1 & Lesson 5.1: `top_ssc_physics_ch5_1` / `les_ssc_physics_ch5_1` (*৫.১ চাপ*).
  - Upsert Topic 5.2 & Lesson 5.2: `top_ssc_physics_ch5_2` / `les_ssc_physics_ch5_2` (*৫.২ ঘনত্ব*).
  - Upsert Topic 5.3 & Lesson 5.3: `top_ssc_physics_ch5_3` / `les_ssc_physics_ch5_3` (*৫.৩ তরলে চাপ, প্যাসকেলের সূত্র ও প্লবতা*) with `interactiveWidgetUrl: '/uploads/interactive/hydraulic-press-buoyancy-lab.html'`.
  - Upsert Topic 5.4 & Lesson 5.4: `top_ssc_physics_ch5_4` / `les_ssc_physics_ch5_4` (*৫.৪ বায়ুচাপ, ব্যারোমিটার ও আবহাওয়া*).
  - Upsert Topic 5.5 & Lesson 5.5: `top_ssc_physics_ch5_5` / `les_ssc_physics_ch5_5` (*৫.৫ স্থিতিস্থাপকতা ও হুকের সূত্র*) with `interactiveWidgetUrl: '/uploads/interactive/hookes-law-elasticity-lab.html'`.
  - Upsert Topic 5.6 & Lesson 5.6: `top_ssc_physics_ch5_6` / `les_ssc_physics_ch5_6` (*৫.৬ পদার্থের তিন অবস্থা, আণবিক গতিতত্ত্ব ও প্লাজমা*).
  - Loop through `chapter5Questions` and upsert each question.
  - Include standalone execution block `if (require.main === module ...)` with offline database resilience.

- [ ] **Step 2: Validate `seed-chapter-5.ts` execution**
  Run: `npx tsx apps/api/prisma/seed-chapter-5.ts`
  Expected: Success logging or clean offline validation warning.

---

### Task 7: Integrate into Seed Orchestrator & Web Curriculum Data, and Verify End-to-End

**Files:**
- Modify: `apps/api/prisma/seed.ts`
- Modify: `apps/web/src/lib/curriculum-data.ts`

**Interfaces:**
- Consumes: `seedChapter5` and Chapter 5 topic definitions.
- Produces: Integrated platform build and passing validation suite.

- [ ] **Step 1: Update `apps/api/prisma/seed.ts`**
  - Import `seedChapter5` from `./seed-chapter-5`.
  - In `seed(prisma)`: ensure `hydraulic-press-buoyancy-lab.html` and `hookes-law-elasticity-lab.html` are copied from `sample-simulations/` to `uploads/interactive/`.
  - Call `await seedChapter5(prisma);`.

- [ ] **Step 2: Update `apps/web/src/lib/curriculum-data.ts`**
  - Add Chapter 5 (`chap_ssc_physics_ch5`) to `sscPhysicsChapters`:
    - Order index: 5
    - Title: 'পঞ্চম অধ্যায়: পদার্থের অবস্থা ও চাপ (States of Matter and Pressure)'
    - 6 Topics: `top_ssc_physics_ch5_1` to `top_ssc_physics_ch5_6`.
  - Update `sampleSimulations` map or metadata if applicable.

- [ ] **Step 3: Run Validation Suite and Typecheck**
  - Run: `node /Users/asfaque/.gemini/antigravity/brain/f25d8112-5ff5-431d-9921-e44befbc72a0/scratch/validate-ch5-seeds.js`
    Expected: PASS with 72 questions, 0 schema errors.
  - Run: `npx tsc --noEmit -p apps/api/tsconfig.json`
    Expected: 0 errors.
  - Run: `npx tsc --noEmit -p apps/web/tsconfig.json`
    Expected: 0 errors.
