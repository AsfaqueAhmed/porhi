# Technical Design Specification: SSC Chemistry Curriculum, Elevated Reaction Labs, Question Banks & Drafts

- **Date:** 2026-11-22
- **Status:** Proposed
- **Author:** Antigravity Engineering Agent
- **Target Curriculum:** NCTB 2026 SSC Chemistry (নবম-দশম শ্রেণি: রসায়ন)
- **Source Material:** [Secondary_-_(B_Version_)_-_Class-9-10_Chemistry_OPT_pdf_15740566487792.pdf](file:///Users/technonext/Desktop/poRi/docs/book/Secondary_-_(B_Version_)_-_Class-9-10_Chemistry_OPT_pdf_15740566487792.pdf) (313 pages, 12 Chapters)
- **Target Directories:**
  - `drafts/chemistry-chapter-1` through `drafts/chemistry-chapter-12`
  - `apps/api/prisma/sample-simulations/` (Elevated Chemical Reaction & Explanation Labs)
  - `apps/api/prisma/` (`seed-chemistry-chapter-*.ts`, `seed.ts`)
  - `apps/web/src/lib/curriculum-data.ts`

---

## 1. Intent & Context

The poRi platform delivers high-fidelity, interactive, and pedagogically rigorous learning content for SSC students in Bangladesh following the NCTB 2026 curriculum.
- **Physics** (Chapters 1–12) and **Biology** (Chapters 1–2) feature rich interactive HTML drafts, KaTeX mathematical and scientific notation, key terminology cards, memory aids, worked numerical/conceptual examples, interactive self-checks, and comprehensive question banks (MCQs with 4-distractor analysis + CQs with standard 4-part NCTB rubrics).
- **Chemistry** currently has its official textbook present in `docs/book/` but lacks interactive chapter drafts, simulation labs, lesson seed data, and question banks.

The user's objective is to build complete, enhanced content, CQs, and MCQs for all chapters of SSC Chemistry, with an explicit emphasis on **elevated chemical reaction and explanation labs** — delivering dynamic visual feedback (color changes, precipitate formation, gas effervescence, temperature shifts, and particle/orbital dynamics) far superior to static diagrams.

---

## 2. Goals, Non-Goals & Anti-Goals

### 2.1 Goals
1. **Full 12-Chapter Coverage:**
   Implement complete curriculum, interactive HTML drafts, database seeds, and question banks for all 12 chapters of SSC Chemistry.
2. **Elevated Chemical Reaction & Explanation Labs:**
   Build 12 flagship interactive HTML5/SVG/Canvas simulation labs (one primary lab per chapter, placed in `apps/api/prisma/sample-simulations/`), embedded directly in each chapter's focal experiment/reaction section. Other sections feature rich `.lab-box` observation cards and chemical mechanism breakdowns. Every simulation lab must include:
   - Realistic laboratory glassware (beakers, test tubes, conical flasks, burners, gas tubes, burettes).
   - Dynamic reaction visuals:
     - Color transitions (e.g. Acid-base indicators: phenolphthalein/litmus, copper sulfate precipitation, halogen colors).
     - Effervescence and gas bubbling ($\text{CO}_2, \text{H}_2, \text{O}_2$) with glowing splint / lime water confirmation.
     - Precipitate formation and gradual settling ($\text{BaSO}_4, \text{AgCl}, \text{Cu(OH)}_2$).
     - Thermal and energetic effects: live thermometer rising/falling for exothermic ($\Delta H < 0$) and endothermic ($\Delta H > 0$) reactions.
     - Atomic/molecular views: live valence electron sharing in covalent bonds and electron transfer in ionic bonds.
   - Stepped interactive controls (Add Reactant, Adjust Heat/Concentration, Play/Pause, Step Forward, Reset).
   - Real-time pedagogical callouts explaining the exact chemical equation, balanced stoichiometry, state symbols $(s, l, g, aq)$, and underlying reaction mechanism.
3. **Structured Interactive HTML Drafts (`drafts/chemistry-chapter-X/`):**
   Every chapter contains:
   - `index.html`: Chapter overview hub with bilingual badges, learning roadmap, statistics cards, and link to original textbook scans.
   - `section-01.html` .. `section-NN.html`: Each section with:
     - Breadcrumb navigation (`রসায়ন / অধ্যায় X / X.y`)
     - Bilingual Title (`বাংলা শিরোনাম <small>(English Subtitle)</small>`)
     - 🎯 **শিখনফল (Learning Goals)**
     - 📚 **মূল বিষয়বস্তু ও বৈজ্ঞানিক বিশ্লেষণ (Deep Explanations & Chemical Equations with KaTeX)**
     - 🗂️ **টার্ম গ্রিড (Key Terminology Cards: `.grid` > `.term`)**
     - 💡 **হাইলাইট বক্স (`.highlight-box`)**
     - 🧪 **ল্যাব ও রাসায়নিক বিক্রিয়া পর্যবেক্ষণ (`.lab-box` / Interactive Simulator Embed)**
     - 🧠 **মনে রাখার কৌশল / নেমোনিক (`.memory`)**
     - 📝 **পাঠ্যবইয়ের স্ট্যান্ডার্ড গাণিতিক সমস্যা ও সমাধান (`.worked` > `.problem` + `.solution`)**
     - ❓ **ইন্টারেক্টিভ আত্মযাচাই (`<details class="check"><summary>...</summary><p>...</p></details>`)**
     - 🧭 **পূর্ববর্তী/পরবর্তী নেভিগেশন লিঙ্ক (`.nav`)**
   - `chapter-source.html`: Scanned textbook viewer displaying all pages of the chapter extracted from the official PDF.
   - `styles.css`: Consistent, accessible theme adhering to poRi design tokens.
4. **Standard Question Bank (72–80 Questions per Chapter):**
   - Partitioned into 3 batch files (`seed-chemistry-chapter-X-questions.ts`, `batch2.ts`, `batch3.ts`).
   - MCQs: 4 options, exactly 1 `isCorrect: true`, detailed `explanation` with `directAnswer`, `coreConcept`, `stepDerivation` (with KaTeX chemical equations), `distractorAnalysis` (all 3 wrong options explained), and `proTipShortcut`.
   - CQs: Type `'CQ_CREATIVE'`, authentic realistic stem, and comprehensive 4-level rubric (`ka` [1 mark], `kha` [2 marks], `ga` [3 marks], `gha` [4 marks]).
5. **Database Seed & Dynamic API Integration:**
   - `apps/api/prisma/seed-chemistry-chapter-X.ts` with lessons, important terms, worked examples, and interactive widget URLs.
   - Registered in `apps/api/prisma/seed.ts` (copying simulations to `apps/api/uploads/interactive/`).
   - Serves dynamically to the Next.js student client via `GET /curriculum/subjects` and `/curriculum/sub_ssc_chemistry`.
   - `isReady: false` is maintained on `sscChemistrySubject` in `seed.ts` during Wave rollouts to ensure E2E test suites remain green, with activation when all 12 chapters are finalized.

### 2.2 Non-Goals
- Modifying existing Physics or Biology database seeds or test suites.
- Using heavy external npm frontend frameworks or WebGL engines inside the simulation files (labs must be self-contained HTML5/SVG/Vanilla JS running in any iframe or webview).

### 2.3 Anti-Goals
- Shallow or superficial content (each section must be thoroughly explained matching NCTB SSC standards).
- Unescaped or broken KaTeX chemical equations (e.g. failing to use `\text{...}`, raw subscript errors, or double backslash escaping in template literals).
- Static or boring reaction labs that fail to provide interactive chemical experimentation.

---

## 3. Approaches Considered

1. **Approach 1 (Chapter 1 Gold Standard First, then Batches):**
   Build Chapter 1 completely, review and approve, then proceed with the remaining 11 chapters in waves.
2. **Approach 2 (Phased Batches in 4 Waves - Selected by User):**
   Structure the 12 chapters into 4 logical pedagogical waves of 3 chapters each:
   - **Wave 1: Chapters 1–3 (Foundations of Chemistry)**
     - Ch 1: রসায়নের ধারণা (Concepts of Chemistry & Laboratory Safety)
     - Ch 2: পদার্থের অবস্থা (States of Matter, Diffusion & Phase Changes)
     - Ch 3: পদার্থের গঠন (Structure of Matter, Isotopes & Electron Configuration)
   - **Wave 2: Chapters 4–6 (Periodic Table, Bonding & Chemical Calculations)**
     - Ch 4: পর্যায় সারণি (Periodic Table & Periodic Properties)
     - Ch 5: রাসায়নিক বন্ধন (Chemical Bonds: Ionic, Covalent & Metallic)
     - Ch 6: মোলের ধারণা ও রাসায়নিক গণনা (Mole Concept, Stoichiometry & Molarity)
   - **Wave 3: Chapters 7–9 (Reactions, Energetics & Acid-Base Equilibrium)**
     - Ch 7: রাসায়নিক বিক্রিয়া (Chemical Reactions, Redox, Balancing & Rate)
     - Ch 8: রসায়ন ও শক্তি (Chemistry & Energy, Electrochemical Cells & Electrolysis)
     - Ch 9: এসিড-ক্ষারক সমতা (Acid-Base Equilibrium, pH, Indicators & Neutralization)
   - **Wave 4: Chapters 10–12 (Applied, Organic & Environmental Chemistry)**
     - Ch 10: খনিজ সম্পদ: ধাতু-অধাতু (Mineral Resources: Metals, Metallurgy & Corrosion)
     - Ch 11: খনিজ সম্পদ: জীবাশ্ম (Mineral Resources: Fossils, Hydrocarbons & Polymers)
     - Ch 12: আমাদের জীবনে রসায়ন (Chemistry in Our Lives, Cleaning Agents & Chemical Hazards)
   Within each wave, run independent subagents for each chapter, verify schemas and builds, and seamlessly integrate.
3. **Approach 3 (All 12 Chapters Concurrently):**
   Dispatching 12 subagents at once. (Dropped due to potential rate limits and context clutter).

---

## 4. Elevated Chemical Reaction & Explanation Labs Architecture

To fulfill the user's specific requirement (*"make the chemical reaction or explanation lab better this time"*), the interactive simulation labs will implement:

1. **Realistic Laboratory Visual Apparatus (HTML5 SVG/Canvas):**
   - Precise vector rendering of laboratory glassware: Bunsen burner with adjustable flame (luminous vs non-luminous blue flame), test tubes, round-bottom flasks, dropping pipettes, thermometers, gas syringes, and U-tubes.
2. **Dynamic Reaction Effects Engine:**
   - **Precipitation Engine:** Particle gravity simulator that renders micro-particles clumping and settling to the bottom of the vessel (e.g. $\text{AgNO}_3(aq) + \text{NaCl}(aq) \rightarrow \text{AgCl}(s)\downarrow + \text{NaNO}_3(aq)$).
   - **Effervescence & Gas Bubbling:** Particle buoyancy system generating rising gas bubbles with adjustable rates based on temperature or concentration (e.g. $\text{Zn}(s) + 2\text{HCl}(aq) \rightarrow \text{ZnCl}_2(aq) + \text{H}_2(g)\uparrow$).
   - **Spectrophotometric & Indicator Color Shifts:** Smooth RGB color interpolation for acid-base titrations (phenolphthalein turning pink at $\text{pH} > 8.2$, methyl orange, universal indicator spectrum) and transition metal complexes.
   - **Thermochemical Feedback:** Integrated Celsius thermometer column that dynamically expands or contracts in response to enthalpy changes ($\Delta H$), with heat exchange aura animation.
   - **Microscopic / Subatomic Orbital View:** Toggleable zoom modal that visualizes Bohr orbits, valence electrons jumping or being shared/transferred during bond formation.
3. **Pedagogical Stepper & Explanation Callouts:**
   - "পূর্বাবস্থা (Initial State)" → "বিক্রিয়া সংঘটন (Reaction Progression)" → "শেষাবস্থা ও পর্যবেক্ষণ (Final Products & Observations)".
   - Bilingual observation notes: "কী ঘটছে (What's happening)", "কেন ঘটছে (Scientific reason)", "রাসায়নিক সমীকরণ (Balanced Equation with states)".
   - Test Yourself mini-challenge inside each simulator.

### Selected Lab Modules by Chapter:
- **Chapter 1:** `lab-safety-hazard-symbols.html` (Interactive hazard symbol identifier & PPE lab protocol).
- **Chapter 2:** `diffusion-states-of-matter-lab.html` ($\text{NH}_3$ and $\text{HCl}$ gas diffusion tube experiment with dynamic $\text{NH}_4\text{Cl}$ white ring formation, plus phase-change heating curve).
- **Chapter 3:** `bohr-atom-electron-config-lab.html` (Interactive atomic structure builder: nucleus protons/neutrons, electron shell filling $2n^2$, and flame test spectral color emissions).
- **Chapter 4:** `periodic-trends-interactive-lab.html` (Interactive Periodic Table with heatmaps for atomic radius, ionization energy, electronegativity, and electron affinity).
- **Chapter 5:** `chemical-bonding-simulator-lab.html` (Ionic electron transfer e.g. $\text{Na} + \text{Cl} \rightarrow \text{NaCl}$, covalent electron sharing e.g. $\text{H}_2\text{O}, \text{CH}_4$, and metallic electron sea).
- **Chapter 6:** `mole-solution-preparation-lab.html` (Molar solution preparation in volumetric flask $M = \frac{W \times 1000}{M \times V}$, dilution calculator, and limiting reactant visualizer).
- **Chapter 7:** `chemical-reactions-redox-lab.html` (Precipitation, displacement, decomposition, redox oxidation numbers tracker, and exothermic/endothermic energy diagram).
- **Chapter 8:** `electrochemical-galvanic-cell-lab.html` (Daniell Cell with $\text{Zn}/\text{Cu}$ electrodes, salt bridge ion flow, voltmeter deflection, and electroplating lab).
- **Chapter 9:** `acid-base-titration-ph-lab.html` (Burette drop-by-drop titration curve, indicator color transitions, and universal pH scale).
- **Chapter 10:** `metal-reactivity-corrosion-lab.html` (Metal displacement reactivity series $\text{K} > \text{Na} > \dots > \text{Au}$ and rusting prevention mechanisms).
- **Chapter 11:** `hydrocarbon-functional-groups-lab.html` (Alkane, alkene, alkyne addition reactions with bromine water de-colorization test, and polymer builder).
- **Chapter 12:** `chemistry-in-daily-life-lab.html` (Saponification soap making reaction, vinegar action on eggshell, and bleaching action).

---

## 5. Wave Execution & Subagent Architecture

### 5.1 Subagent Division & Boundaries
Each chapter is fully independent and self-contained:
- Its own drafts directory (`drafts/chemistry-chapter-X/`)
- Its own simulation file (`apps/api/prisma/sample-simulations/`)
- Its own seed file (`apps/api/prisma/seed-chemistry-chapter-X.ts`)
- Its own 3 question batch files (`apps/api/prisma/seed-chemistry-chapter-X-questions.ts`, `batch2.ts`, `batch3.ts`)
Because file targets are completely isolated per chapter, agents within each wave run concurrently without git conflicts or race conditions.

### 5.2 Verification Gate per Wave:
Before proceeding from Wave $N$ to Wave $N+1$:
1. Run static validation script verifying:
   - All expected draft files exist and HTML is valid.
   - All simulation labs exist and have zero external runtime script dependencies.
   - Question count $\ge 72$ per chapter with 100% adherence to `QuestionData` schema.
   - All LaTeX delimiters are properly balanced.
2. Run TypeScript build verification:
   ```bash
   pnpm --filter @porhi/api build --noEmit || npx tsc --noEmit
   ```
3. Run test suites to ensure no regressions across web and api workspaces.

---

## 6. Approvals & Next Steps

Once this specification is approved, we invoke `superpowers:writing-plans` to produce the concrete task-by-task execution plan for Wave 1 (Chapters 1–3), execute the wave via parallel subagents, verify, and proceed systematically through all 4 waves.
