# SSC Physics Chapter 3 (বল / Force) Drafts Enhancement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevate all 10 sections and the index hub in `drafts/physics-chapter-3/` to the rigorous pedagogical and aesthetic standards of Chapters 1 and 2, featuring complete KaTeX mathematical formatting, learning objectives, terminology grids, highlight boxes, real-world examples, mnemonics, worked numerical solutions, interactive self-check quizzes, and clean navigation.

**Architecture:** Each section is authored as an accessible, clean, responsive HTML5 document styled with `styles.css` and KaTeX. Content strictly mirrors NCTB SSC Physics 2026 syllabus guidelines for Chapter 3: Force. A Node.js validator script in scratch ensures no structural, mathematical, or relational regression occurs across all 10 sections.

**Tech Stack:** HTML5, CSS3, KaTeX CDN (`katex@0.16.8`), Node.js validation test script.

**Spec:** `docs/superpowers/specs/2026-11-10-physics-chapter-3-drafts-design.md`

## Global Constraints

- Must import and initialize KaTeX identically to Chapters 1 and 2 with `$$...$$` (display) and `$...$` (inline) delimiters.
- Every section must contain: Topbar crumb, Section badge, Bilingual title (`<h1 class="title">...<small>...</small></h1>`), 🎯 শিখনফল (`section.goal`), Terminology grid (`.grid > .term`), Highlight box (`.highlight-box`), Real-life example (`.note`), Mnemonic memory aid (`.memory`), Worked problem with step-by-step solution (`.worked > .problem + .solution`), Interactive check quiz (`details.check`), Navigation bar (`.nav`), and Footer linking to `chapter-source.html`.
- All relative links (`index.html`, `section-01.html` through `section-10.html`, `chapter-source.html`, `styles.css`) must resolve cleanly without 404s.
- `index.html` must follow the Chapter 3 emerald/teal theme (`#0f766e`, `#0d9488`, `#2dd4bf`), 4 stats cards, and 10 detailed roadmap cards.

## Review Focus

1. **Unrendered or broken LaTeX expressions:** Ensure all mathematical notation is valid KaTeX syntax without unbalanced dollar signs or escaping issues.
2. **Missing pedagogical components:** Ensure no section omits required components (worked problems, mnemonics, terms, goals).
3. **Broken navigation targets:** Ensure Previous / Next buttons point to the correct adjacent sections (`section-01` has index as previous; `section-10` has index as next).
4. **Encoding & Bengali typography:** Ensure UTF-8 formatting and correct Bengali terminology conforming to NCTB 2026 standards.
5. **Responsive mobile view:** Ensure table wrapping (`.table-wrap`) and grid responsiveness work seamlessly on mobile viewports.

---

### Task 1: Setup Validation Test Harness for Drafts

**Files:**
- Create: `<appDataDir>/brain/c4f1beb6-5ac4-4a93-a2c5-b70555acb8a4/scratch/validate-ch3-drafts.js`

**Interfaces:**
- Produces: Command-line exit code 0 if all 10 section files + `index.html` pass validation rules; exit code 1 with specific errors otherwise.

- [ ] **Step 1: Write the validation test harness**
  Implement `validate-ch3-drafts.js` checking:
  - File existence for `index.html` and `section-01.html` through `section-10.html`
  - Presence of KaTeX CSS and JS in all 10 sections
  - Presence of `<section class="goal">`, `.grid`, `.term`, `.highlight-box`, `.worked`, `.problem`, `.solution`, `.note`, `.memory`, `details.check`, `.nav`, and footer
  - Relative link targets exist on disk

- [ ] **Step 2: Run the validator to verify current failures on un-enhanced files**
  Run: `node /Users/asfaque/.gemini/antigravity/brain/c4f1beb6-5ac4-4a93-a2c5-b70555acb8a4/scratch/validate-ch3-drafts.js`
  Expected: FAIL on current un-enhanced files (missing KaTeX, mnemonics, etc.)

- [ ] **Step 3: Commit verification harness**
  Verify script is ready in scratch directory.

---

### Task 2: Enhance Sections 3.1 & 3.2

**Files:**
- Modify: `drafts/physics-chapter-3/section-01.html` (৩.১ জড়তা ও বলের ধারণা)
- Modify: `drafts/physics-chapter-3/section-02.html` (৩.২ মৌলিক বলের প্রকৃতি)

**Interfaces:**
- Consumes: NCTB 2026 syllabus & `chapter-source.html` content for 3.1 and 3.2.
- Produces: Enhanced HTML drafts conforming to all structural constraints.

- [ ] **Step 1: Write enhanced `section-01.html`**
  - Inertia of rest and inertia of motion with daily examples (bus braking/accelerating, carpet dusting, falling fruit from tree).
  - Newton's 1st law, inertial reference frame, mass as measure of inertia.
  - Worked example calculating equilibrium force on a mass.
  - Mnemonic, self-check quiz, navigation (`index.html` $\leftarrow$ $\rightarrow$ `section-02.html`).

- [ ] **Step 2: Write enhanced `section-02.html`**
  - 4 Fundamental forces: Gravitational, Electromagnetic, Weak Nuclear, Strong Nuclear.
  - KaTeX comparison table: relative strength ($1, 10^{36}, 10^{25}, 10^{38}$), range, exchange bosons.
  - Contact forces as electromagnetic manifestations.
  - Worked ratio comparison, mnemonic, self-check quiz, navigation (`section-01.html` $\leftarrow$ $\rightarrow$ `section-03.html`).

- [ ] **Step 3: Verify sections 3.1 & 3.2 with validator**
  Run: `node .../validate-ch3-drafts.js --only=1,2`
  Expected: PASS for sections 1 and 2.

---

### Task 3: Enhance Sections 3.3 & 3.4

**Files:**
- Modify: `drafts/physics-chapter-3/section-03.html` (৩.৩ সাম্য ও অসাম্য বল)
- Modify: `drafts/physics-chapter-3/section-04.html` (৩.৪ বেগের ওপর বলের প্রভাব)

**Interfaces:**
- Consumes: Resultant force vectors, equilibrium conditions, acceleration and centripetal motion.
- Produces: Enhanced HTML drafts 3.3 and 3.4.

- [ ] **Step 1: Write enhanced `section-03.html`**
  - Resultant force $\vec{F}_{\text{net}} = \sum \vec{F}$, balanced forces ($\sum \vec{F} = 0$), unbalanced forces ($\sum \vec{F} \neq 0$).
  - Real-world examples: Tug-of-war, book on table, aircraft in cruise.
  - Worked problem on multi-directional forces on an object.
  - Mnemonic, interactive check, navigation (`section-02.html` $\leftarrow$ $\rightarrow$ `section-04.html`).

- [ ] **Step 2: Write enhanced `section-04.html`**
  - Effect of force on speed (acceleration $a>0$, deceleration $a<0$).
  - Effect of perpendicular force on direction (circular motion, centripetal force $F_c = \frac{mv^2}{r}$).
  - Real-world examples: whirling a stone, planet orbits, batting a cricket ball.
  - Worked numerical problem calculating centripetal force and tension.
  - Mnemonic, interactive check, navigation (`section-03.html` $\leftarrow$ $\rightarrow$ `section-05.html`).

- [ ] **Step 3: Verify sections 3.3 & 3.4 with validator**
  Run: `node .../validate-ch3-drafts.js --only=3,4`
  Expected: PASS for sections 3 and 4.

---

### Task 4: Enhance Sections 3.5 & 3.6

**Files:**
- Modify: `drafts/physics-chapter-3/section-05.html` (৩.৫ নিউটনের দ্বিতীয় সূত্র ও বল পরিমাপ)
- Modify: `drafts/physics-chapter-3/section-06.html` (৩.৬ ক্রিয়া-প্রতিক্রিয়া: নিউটনের তৃতীয় সূত্র)

**Interfaces:**
- Consumes: Momentum, $F = ma$ derivation, impulse, Newton's 3rd law action-reaction pairs.
- Produces: Enhanced HTML drafts 3.5 and 3.6.

- [ ] **Step 1: Write enhanced `section-05.html`**
  - Linear momentum $p = mv$, rate of change of momentum, full mathematical derivation of $F = ma$.
  - Definition of $1\text{ N}$, impulse of force $J = F\Delta t = \Delta p$.
  - Real-life examples: cricketer cushioning a catch, airbag cushioning.
  - Worked problem: vehicle braking force and stopping deceleration.
  - Mnemonic, interactive check, navigation (`section-04.html` $\leftarrow$ $\rightarrow$ `section-06.html`).

- [ ] **Step 2: Write enhanced `section-06.html`**
  - Newton's 3rd law $\vec{F}_{AB} = -\vec{F}_{BA}$.
  - Crucial distinction: action and reaction act on two *different* bodies, so they never cancel each other.
  - Applications: walking on ground, swimming, boat jumping, rocket propulsion.
  - Worked problem: recoil of rifle ($V = -\frac{m}{M}v$).
  - Mnemonic, interactive check, navigation (`section-05.html` $\leftarrow$ $\rightarrow$ `section-07.html`).

- [ ] **Step 3: Verify sections 3.5 & 3.6 with validator**
  Run: `node .../validate-ch3-drafts.js --only=5,6`
  Expected: PASS for sections 5 and 6.

---

### Task 5: Enhance Sections 3.7 & 3.8

**Files:**
- Modify: `drafts/physics-chapter-3/section-07.html` (৩.৭ নিরাপদ ভ্রমণে বল ও গতি)
- Modify: `drafts/physics-chapter-3/section-08.html` (৩.৮ ভরবেগ সংরক্ষণ ও সংঘর্ষ)

**Interfaces:**
- Consumes: Road safety physics, stopping distance, conservation of momentum, collisions.
- Produces: Enhanced HTML drafts 3.7 and 3.8.

- [ ] **Step 1: Write enhanced `section-07.html`**
  - Physics of road safety: stopping distance = reaction distance + braking distance ($d_b = \frac{v^2}{2a}$).
  - Why doubling speed quadruples braking distance ($E_k \propto v^2$).
  - Seatbelts, crumple zones, airbags ($\Delta t \uparrow \implies F \downarrow$).
  - Worked problem: vehicle total stopping distance with driver reaction time.
  - Mnemonic, interactive check, navigation (`section-06.html` $\leftarrow$ $\rightarrow$ `section-08.html`).

- [ ] **Step 2: Write enhanced `section-08.html`**
  - Principle of conservation of linear momentum: $m_1 u_1 + m_2 u_2 = m_1 v_1 + m_2 v_2$.
  - Elastic vs inelastic collisions, combined velocity after locking ($V = \frac{m_1 u_1 + m_2 u_2}{m_1 + m_2}$).
  - Worked problem: collision between two moving cars sticking together.
  - Mnemonic, interactive check, navigation (`section-07.html` $\leftarrow$ $\rightarrow$ `section-09.html`).

- [ ] **Step 3: Verify sections 3.7 & 3.8 with validator**
  Run: `node .../validate-ch3-drafts.js --only=7,8`
  Expected: PASS for sections 7 and 8.

---

### Task 6: Enhance Sections 3.9 & 3.10

**Files:**
- Modify: `drafts/physics-chapter-3/section-09.html` (৩.৯ ঘর্ষণ বলের ধরন ও বৈশিষ্ট্য)
- Modify: `drafts/physics-chapter-3/section-10.html` (৩.১০ ঘর্ষণ, গতি ও ব্যবহার)

**Interfaces:**
- Consumes: Types of friction, coefficients of friction, normal reaction, friction management.
- Produces: Enhanced HTML drafts 3.9 and 3.10.

- [ ] **Step 1: Write enhanced `section-09.html`**
  - 4 types of friction: Static ($f_s \le \mu_s R$), Kinetic ($f_k = \mu_k R$), Rolling ($f_r$), Fluid ($f_f$).
  - Microscopic cause (interlocking asperities & cold welding).
  - Comparison: $f_s > f_k \gg f_r$ (scientific reason behind the invention of the wheel).
  - Worked problem: minimum force to overcome static friction vs kinetic friction.
  - Mnemonic, interactive check, navigation (`section-08.html` $\leftarrow$ $\rightarrow$ `section-10.html`).

- [ ] **Step 2: Write enhanced `section-10.html`**
  - Friction as a necessary evil (প্রয়োজনীয় উপদ্রব).
  - Benefits (walking, gripping, writing, vehicle braking) vs hazards (wear & tear, heat dissipation, fuel waste).
  - Methods to reduce friction (lubrication, ball bearings, streamlining).
  - Methods to increase friction (tire treads, spike shoes, grooving).
  - Worked problem: energy loss due to friction and mechanical efficiency.
  - Mnemonic, interactive check, navigation (`section-09.html` $\leftarrow$ $\rightarrow$ `index.html`).

- [ ] **Step 3: Verify sections 3.9 & 3.10 with validator**
  Run: `node .../validate-ch3-drafts.js --only=9,10`
  Expected: PASS for sections 9 and 10.

---

### Task 7: Enhance Chapter Hub (`index.html`)

**Files:**
- Modify: `drafts/physics-chapter-3/index.html`

**Interfaces:**
- Consumes: Metadata and link references for all 10 sections + `chapter-source.html`.
- Produces: Beautifully styled, responsive Chapter 3 home hub.

- [ ] **Step 1: Write enhanced `index.html`**
  - Styled Hero section with emerald/teal gradient (`#0f766e` to `#0d9488`).
  - 4 stats cards: ১০টি বিষয়ভিত্তিক পাঠ, ৩০+ গাণিতিক সমাধান ও উদাহরণ, ৪টি মৌলিক বল ও নিউটনের সূত্র, ১০০% এনসিটিবি ২০২৬ সিলেবাস।
  - 10 structured roadmap cards with route number, Bengali title, English subtitle, rich 3-bullet description, right chevron.
  - Source card linking to `chapter-source.html`.
  - PoRi branding footer.

- [ ] **Step 2: Verify `index.html` with validator**
  Run: `node .../validate-ch3-drafts.js --only=index`
  Expected: PASS for index.

---

### Task 8: Full Chapter Verification & Review

**Files:**
- All files in `drafts/physics-chapter-3/`

- [ ] **Step 1: Run full automated validator on all 11 files**
  Run: `node /Users/asfaque/.gemini/antigravity/brain/c4f1beb6-5ac4-4a93-a2c5-b70555acb8a4/scratch/validate-ch3-drafts.js`
  Expected: All 11 files PASS with zero errors.

- [ ] **Step 2: Inspect KaTeX rendering and markup consistency**
  Verify that mathematical expressions contain no unmatched tags and comply with browser rendering.

- [ ] **Step 3: Git status & summary**
  Review git diff/status and prepare completion summary.
