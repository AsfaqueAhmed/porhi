# SSC Physics Chapter 6 (বস্তুর ওপর তাপের প্রভাব / Effect of Heat on Matter) Full Elevation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fully elevate SSC Physics Chapter 6 to match the depth, KaTeX mathematical precision, interactive simulation labs, backend Prisma curriculum data, and 50+ question board bank established in Chapters 1 and 2.

**Architecture:**
1. **Curriculum Drafts (`drafts/physics-chapter-6/`):** 7 enhanced HTML5 learning units with KaTeX CDN, learning goals, term grids, formula callouts, worked problems, mnemonics, and self-check accordions.
2. **Interactive Simulation Labs:** Two standalone labs in `apps/api/prisma/sample-simulations/` and embedded into Sections 6.3 (Thermal Expansion) and 6.6 (Calorimetry Principle).
3. **Backend Prisma Curriculum & Question Bank (`apps/api/prisma/`):** 7 topics and lessons in `seed-chapter-6.ts`, 50+ board questions across `seed-chapter-6-questions.ts` and `seed-chapter-6-questions-batch2.ts`, wired into `seed.ts`.
4. **Frontend Curriculum Hierarchy:** Register Chapter 6 in `apps/web/src/lib/curriculum-data.ts`.
5. **Quality Gate:** Automated validator script in scratch verifying structural elements, KaTeX syntax, relative links, and TypeScript compilation.

**Tech Stack:** HTML5, CSS3, KaTeX CDN (`katex@0.16.8`), SVG, JavaScript (Vanilla ES6 for interactive labs), TypeScript, Prisma ORM, Node.js validation harness.

**Spec:** `docs/superpowers/specs/2026-11-11-physics-chapter-6-design.md`

---

### Task 1: Setup Validation Harness for Chapter 6 Drafts & Seeds

**Files:**
- Create: `/Users/asfaque/.gemini/antigravity/brain/8ebe4d0d-8ac3-4b79-90b3-736fc3d4f352/scratch/validate-ch6-elevation.js`

- [ ] **Step 1: Write the validation harness script**
  Check:
  - File existence for `index.html` and `section-01.html` through `section-07.html`.
  - KaTeX stylesheet and JS CDN tags in all 7 section files.
  - Required pedagogical tags: `<section class="goal">`, `.grid`, `.term`, `.highlight-box`, `.worked`, `.problem`, `.solution`, `.note`, `.memory`, `details.check`, `.nav`, footer linking to `chapter-source.html`.
  - Balanced `$$` math delimiters.
  - Presence of embedded interactive labs in Section 6.3 and Section 6.6.
  - File existence of `sample-simulations/thermal-expansion-lab.html` and `sample-simulations/calorimetry-lab.html`.
  - Verification of Prisma seed files: `seed-chapter-6.ts`, `seed-chapter-6-questions.ts`, `seed-chapter-6-questions-batch2.ts`, and question count >= 50.

- [ ] **Step 2: Run validator to establish baseline failure**
  Run: `node /Users/asfaque/.gemini/antigravity/brain/8ebe4d0d-8ac3-4b79-90b3-736fc3d4f352/scratch/validate-ch6-elevation.js`
  Expected: FAIL on current un-enhanced files.

---

### Task 2: Enhance Chapter 6 Index Hub (`index.html`)

**Files:**
- Modify: `drafts/physics-chapter-6/index.html`

- [ ] **Step 1: Write enhanced `index.html`**
  - Warm thermal gradient hero (`#9a3412`, `#ea580c`, `#fb923c`).
  - 4 statistics cards (7টি বিষয়ভিত্তিক পাঠ, ২৭ মূল PDF স্ক্যান পৃষ্ঠা, ১৭টি অধ্যায়ের শিখনফল, ২টি ইন্টারঅ্যাক্টিভ ল্যাব).
  - 7 structured roadmap cards with bilingual titles, English subtitles, learning outcomes, and navigation badges.
  - Direct links to original textbook scan `chapter-source.html`.

- [ ] **Step 2: Verify `index.html` structure**
  Check links and visual layout.

---

### Task 3: Enhance Section 6.1 (তাপ ও তাপমাত্রা / Heat and Temperature)

**Files:**
- Modify: `drafts/physics-chapter-6/section-01.html`

- [ ] **Step 1: Write enhanced `section-01.html`**
  - KaTeX header & scripts (`katex@0.16.8`).
  - Goal: তাপ ও তাপমাত্রার পার্থক্য, অভ্যন্তরীণ শক্তি, তাপপ্রবাহের দিক ও তাপীয় সাম্যাবস্থা ব্যাখ্যা।
  - Deep content: কণার তাপীয় গতিশক্তি, অভ্যন্তরীণ শক্তি vs তাপমাত্রা, ১ ক্যালরি ও ১ জুলের সম্পর্ক ($1\text{ cal} \approx 4.184\text{ J}$ বা $4.2\text{ J}$)।
  - Terminology grid: তাপ (Heat), তাপমাত্রা (Temperature), অভ্যন্তরীণ শক্তি (Internal Energy), তাপীয় সাম্যাবস্থা (Thermal Equilibrium).
  - Highlight box: তাপপ্রবাহ তাপমাত্রার পার্থক্যের ওপর নির্ভর করে, অভ্যন্তরীণ শক্তির পরিমাণের ওপর নয়।
  - Real-world example: প্রশান্ত মহাসাগরের বরফশীতল পানির মোট অভ্যন্তরীণ শক্তি এক কাপ ফুটন্ত চা অপেক্ষা অনেক বেশি হলেও চা থেকে সাগরে তাপ প্রবাহিত হবে।
  - Worked Problem: $20^\circ\text{C}$ তাপমাত্রার $2\text{ kg}$ পানি বনাম $80^\circ\text{C}$ তাপমাত্রার $200\text{ g}$ পানি সম্পর্কিত তুলনামূলক বিশ্লেষণ।
  - Mnemonic, self-check quiz, navigation (`index.html` $\leftarrow$ $\rightarrow$ `section-02.html`).

- [ ] **Step 2: Validate Section 6.1**
  Run validator for section 1.

---

### Task 4: Enhance Section 6.2 (তাপমাত্রিক ধর্ম ও তাপমাত্রার স্কেল / Thermometric Properties and Scales)

**Files:**
- Modify: `drafts/physics-chapter-6/section-02.html`

- [ ] **Step 1: Write enhanced `section-02.html`**
  - KaTeX header & scripts.
  - Thermometric substances & properties: তরলের আয়তন (পারদ, অ্যালকোহল), গ্যাসের চাপ ও আয়তন, রোধ (প্লাটিনাম রোধ থার্মোমিটার), তড়িচ্চালক বল (থার্মোকাপল/তাপযুগল)।
  - Scales: Celsius, Fahrenheit, Kelvin, fixed points (বরফবিন্দু / Ice point $\theta_i$, বাষ্পবিন্দু / Steam point $\theta_s$).
  - Fundamental formula: $\frac{\theta - \theta_i}{\theta_s - \theta_i} = \frac{C - 0}{100 - 0} = \frac{F - 32}{212 - 32} = \frac{K - 273.15}{373.15 - 273.15} \implies \frac{C}{5} = \frac{F-32}{9} = \frac{K-273}{5}$.
  - Interactive temperature converter widget (Celsius $\leftrightarrow$ Fahrenheit $\leftrightarrow$ Kelvin).
  - Terminology grid, Highlight box, Memory aid.
  - Worked problems:
    1. কোন তাপমাত্রায় সেলসিয়াস ও ফারেনহাইট স্কেলের পাঠ একই হয়? ($-40^\circ$).
    2. মানবদেহের তাপমাত্রা $104^\circ\text{F}$ সেলসিয়াস স্কেলে কত? ($40^\circ\text{C}$).
    3. ত্রুটিপূর্ণ থার্মোমিটারের পাঠ সংক্রান্ত সমস্যা ($\theta_i = 5^\circ\text{C}, \theta_s = 95^\circ\text{C}$).
  - Self-check quiz, navigation (`section-01.html` $\leftarrow$ $\rightarrow$ `section-03.html`).

- [ ] **Step 2: Validate Section 6.2**
  Run validator for section 2.

---

### Task 5: Build Thermal Expansion Lab & Enhance Section 6.3 (পদার্থের তাপীয় প্রসারণ)

**Files:**
- Create: `apps/api/prisma/sample-simulations/thermal-expansion-lab.html`
- Modify: `drafts/physics-chapter-6/section-03.html`

- [ ] **Step 1: Build interactive Thermal Expansion Lab (`thermal-expansion-lab.html`)**
  - Standalone responsive HTML/SVG laboratory.
  - Material selector: তামা/Copper ($\alpha = 16.7 \times 10^{-6}\text{ K}^{-1}$), লোহা/Iron ($\alpha = 12 \times 10^{-6}\text{ K}^{-1}$), পিতল/Brass ($\alpha = 19 \times 10^{-6}\text{ K}^{-1}$), অ্যালুমিনিয়াম/Aluminum ($\alpha = 23 \times 10^{-6}\text{ K}^{-1}$), সীসা/Lead ($\alpha = 29 \times 10^{-6}\text{ K}^{-1}$).
  - Controls: Initial length slider ($L_1 = 1\text{ m}$ to $20\text{ m}$), Temperature change slider ($\Delta T = 0^\circ\text{C}$ to $200^\circ\text{C}$).
  - Real-time animated SVG expanding metal rod, flame heat source indicator, dial gauge showing expansion $\Delta L$ in millimeters, and step-by-step formula breakdown ($\Delta L = L_1 \alpha \Delta T$).

- [ ] **Step 2: Write enhanced `section-03.html`**
  - Linear, areal, and volumetric thermal expansion derivations:
    - $\Delta L = L_1 \alpha \Delta T \implies L_2 = L_1(1 + \alpha \Delta T)$
    - $\Delta A = A_1 \beta \Delta T \implies A_2 = A_1(1 + \beta \Delta T)$
    - $\Delta V = V_1 \gamma \Delta T \implies V_2 = V_1(1 + \gamma \Delta T)$
  - Mathematical proof that $\beta \approx 2\alpha$ and $\gamma \approx 3\alpha \implies \frac{\alpha}{1} = \frac{\beta}{2} = \frac{\gamma}{3}$.
  - Expansion in liquids: Real expansion ($\gamma_r$) vs Apparent expansion ($\gamma_a$): $\gamma_r = \gamma_a + \gamma_g$ (পাত্রের প্রসারণ).
  - Anomalous expansion of water (পানির ব্যতিক্রমী প্রসারণ): $0^\circ\text{C}$ থেকে $4^\circ\text{C}$ পর্যন্ত উত্তপ্ত করলে আয়তন হ্রাস ও ঘনত্ব সর্বোচ্চ ($1000\text{ kg/m}^3$), শীতপ্রধান দেশে হ্রদের পানির নিচে মাছ ও জলজ প্রাণীর বেঁচে থাকা.
  - Embed the interactive Thermal Expansion Lab into the document.
  - Worked problems: রেললাইনের দুটি পাতের সংযোগস্থলে ফাঁকা রাখার হিসাব, লোহার রডের দৈর্ঘ্য ও ক্ষেত্রফল বৃদ্ধি.
  - Mnemonic, self-check quiz, navigation (`section-02.html` $\leftarrow$ $\rightarrow$ `section-04.html`).

- [ ] **Step 3: Validate Section 6.3 and Lab**
  Run validator for section 3.

---

### Task 6: Enhance Section 6.4 (অবস্থার পরিবর্তন, সুপ্ততাপ ও বাষ্পীভবন / Change of State, Latent Heat & Evaporation)

**Files:**
- Modify: `drafts/physics-chapter-6/section-04.html`

- [ ] **Step 1: Write enhanced `section-04.html`**
  - KaTeX header & scripts.
  - Phase changes: গলন (Melting), স্ফুটন (Boiling), বাষ্পীভবন (Evaporation), ঘনীভবন (Condensation), কঠিনীভবন (Freezing).
  - Latent heat (সুপ্ততাপ): সুপ্ততাপের বৈজ্ঞানিক কারণ (আন্তঃআণবিক বন্ধন ভাঙতে ব্যয়িত শক্তি, কণার গতিশক্তি বাড়ে না ফলে তাপমাত্রা স্থির থাকে).
  - Formulas: $Q = mL_f$ (গলনের সুপ্ততাপ, বরফের জন্য $3.36 \times 10^5\text{ J/kg}$), $Q = mL_v$ (বাষ্পীভবনের সুপ্ততাপ, পানির জন্য $2.26 \times 10^6\text{ J/kg}$).
  - Heating curve of ice to steam graph and multi-stage heat calculation ($Q_{\text{total}} = Q_1 + Q_2 + Q_3 + Q_4 + Q_5$).
  - Evaporation factors: পৃষ্ঠের ক্ষেত্রফল, তাপমাত্রা, আর্দ্রতা, বায়ুপ্রবাহ, চাপ, তরলের প্রকৃতি।
  - Cooling by evaporation: মাটির কলসির পানি ঠান্ডা হওয়া, স্পিরিট বা অ্যালকোহল হাতে দিলে ঠান্ডা লাগা, কুকুরের জিভ বের করে হাঁপানো.
  - Worked problem: $-10^\circ\text{C}$-এর $1\text{ kg}$ বরফকে $100^\circ\text{C}$-এর বাষ্পে রূপান্তর করতে মোট প্রয়োজনীয় তাপ ($3.03 \times 10^6\text{ J}$).
  - Mnemonic, self-check quiz, navigation (`section-03.html` $\leftarrow$ $\rightarrow$ `section-05.html`).

- [ ] **Step 2: Validate Section 6.4**
  Run validator for section 4.

---

### Task 7: Enhance Section 6.5 (আপেক্ষিক তাপ ও তাপধারণক্ষমতা / Specific Heat and Heat Capacity)

**Files:**
- Modify: `drafts/physics-chapter-6/section-05.html`

- [ ] **Step 1: Write enhanced `section-05.html`**
  - KaTeX header & scripts.
  - Heat capacity: $C = \frac{Q}{\Delta T}$ ($\text{J/K}$).
  - Specific heat: $s = \frac{Q}{m \Delta T} \implies Q = ms\Delta T$ ($\text{J/(kg}\cdot\text{K)}$).
  - Relationship: $C = ms$.
  - Specific heat table of common substances (পানি $4200$, বরফ $2100$, জলীয় বাষ্প $2000$, সীসা $130$, তামা $400$, লোহা $460$).
  - Exceptional specific heat of water and environmental consequences: সমুদ্র উপকূলবর্তী এলাকার সমভাবাপন্ন আবহাওয়া, গাড়ির রেডিয়েটরে পানি ব্যবহারের কারণ, চিকিৎসায় সেঁক দেওয়ার কাজে পানির বোতল.
  - Worked problems: $5\text{ kg}$ পানির তাপমাত্রা $20^\circ\text{C}$ থেকে $80^\circ\text{C}$-এ তুলতে প্রয়োজনীয় তাপ, তামার পাত্রের তাপধারণক্ষমতা.
  - Mnemonic, self-check quiz, navigation (`section-04.html` $\leftarrow$ $\rightarrow$ `section-06.html`).

- [ ] **Step 2: Validate Section 6.5**
  Run validator for section 5.

---

### Task 8: Build Calorimetry Equilibrium Lab & Enhance Section 6.6 (ক্যালরিমিতির মূলনীতি)

**Files:**
- Create: `apps/api/prisma/sample-simulations/calorimetry-lab.html`
- Modify: `drafts/physics-chapter-6/section-06.html`

- [ ] **Step 1: Build interactive Calorimetry Principle Lab (`calorimetry-lab.html`)**
  - Standalone responsive HTML/SVG laboratory.
  - System: Calorimeter with liquid water and hot metal specimen.
  - Controls: Metal selector (Copper $s=400$, Iron $s=460$, Lead $s=130$, Aluminum $s=900$), metal mass $m_1$, metal initial temp $T_1$ ($50^\circ\text{C}$ to $100^\circ\text{C}$), water mass $m_2$, water initial temp $T_2$ ($5^\circ\text{C}$ to $30^\circ\text{C}$).
  - Interactive "Mix & Equilibrate" simulation with live SVG temperature progression curves reaching final equilibrium temperature $T_f$:
    $$T_f = \frac{m_1 s_1 T_1 + m_2 s_2 T_2}{m_1 s_1 + m_2 s_2}$$
  - Live heat balance cards: $Q_{\text{lost}} = m_1 s_1 (T_1 - T_f)$ and $Q_{\text{gained}} = m_2 s_2 (T_f - T_2)$ displaying exact matching Joules.

- [ ] **Step 2: Write enhanced `section-06.html`**
  - Calorimetry principle: বিচ্ছিন্ন ব্যবস্থায় বর্জিত তাপ = গৃহীত তাপ ($Q_{\text{lost}} = Q_{\text{gained}}$).
  - Assumptions & heat loss prevention (ইনসুলেটেড ক্যালরিমিটার, পরিচলন ও বিকিরণ হ্রাস).
  - Water equivalent (পানির সমতুল্য $W = mc$).
  - Derivation of final mixture temperature for 2 and 3 components.
  - Advanced case: Ice added to warm water (checking whether all ice melts, phase change check).
  - Embed the interactive Calorimetry Principle Lab into the document.
  - Worked problems:
    1. $90^\circ\text{C}$ তাপমাত্রার $100\text{ g}$ তামার টুকরা $20^\circ\text{C}$ তাপমাত্রার $200\text{ g}$ পানিতে ছেড়ে দিলে চূড়ান্ত তাপমাত্রা নির্ণয়.
    2. $50^\circ\text{C}$ তাপমাত্রার $400\text{ g}$ পানিতে $0^\circ\text{C}$ তাপমাত্রার $50\text{ g}$ বরফ মেশালে বরফ সম্পূর্ণ গলবে কি না এবং চূড়ান্ত তাপমাত্রা কত হবে?
  - Mnemonic, self-check quiz, navigation (`section-05.html` $\leftarrow$ $\rightarrow$ `section-07.html`).

- [ ] **Step 3: Validate Section 6.6 and Lab**
  Run validator for section 6.

---

### Task 9: Enhance Section 6.7 (গলনাঙ্ক ও স্ফুটনাঙ্কের ওপর চাপের প্রভাব / Effect of Pressure on Melting and Boiling Points)

**Files:**
- Modify: `drafts/physics-chapter-6/section-07.html`

- [ ] **Step 1: Write enhanced `section-07.html`**
  - KaTeX header & scripts.
  - Effect of pressure on melting point:
    - যেসব পদার্থ গললে আয়তন কমে (যেমন বরফ/পানি, ঢালাই লোহা, অ্যান্টিমনি): চাপ বাড়ালে গলনাঙ্ক কমে ($0^\circ\text{C}$-এর নিচে নামে).
    - যেসব পদার্থ গললে আয়তন বাড়ে (যেমন মোম, তামা, রজন): চাপ বাড়ালে গলনাঙ্ক বাড়ে.
  - Regelation (পুনঃশিলীভবন): চাপ প্রয়োগে বরফ গলে যাওয়া এবং চাপ অপসরণে পুনরায় জমে যাওয়া; তার দিয়ে বরফ কাটার পরীক্ষণ, বরফে স্কেটিং ও বরফের বল তৈরি.
  - Effect of pressure on boiling point: চাপ বাড়ালে তরলের স্ফুটনাঙ্ক বৃদ্ধি পায়, চাপ কমালে স্ফুটনাঙ্ক হ্রাস পায়.
  - Real-world applications:
    - প্রেসার কুকার (Pressure Cooker): আবদ্ধ পাত্রে বাষ্প জমে ভেতরের চাপ প্রায় ২ বায়ুমণ্ডলীয় চাপে পৌঁছায়, ফলে পানির স্ফুটনাঙ্ক বেড়ে প্রায় $120^\circ\text{C}-125^\circ\text{C}$ হয় এবং খাবার দ্রুত সেদ্ধ হয়.
    - এভারেস্ট বা পাহাড়ি অঞ্চল: কম বায়ুমণ্ডলীয় চাপের কারণে পানি $70^\circ\text{C}-80^\circ\text{C}$-এই ফুটতে শুরু করে, ফলে খোলা পাত্রে খাবার সেদ্ধ হতে অনেক বেশি সময় লাগে বা সেদ্ধ হয় না.
  - Worked problem: প্রেসার কুকারের কার্যপদ্ধতির গাণিতিক ও বৈজ্ঞানিক বিশ্লেষণ.
  - Mnemonic, self-check quiz, navigation (`section-06.html` $\leftarrow$ `index.html`).

- [ ] **Step 2: Validate Section 6.7**
  Run validator for section 7.

---

### Task 10: Create Backend Prisma Seeds for Chapter 6 & Wire Root Seed

**Files:**
- Create: `apps/api/prisma/seed-chapter-6.ts`
- Create: `apps/api/prisma/seed-chapter-6-questions.ts`
- Create: `apps/api/prisma/seed-chapter-6-questions-batch2.ts`
- Modify: `apps/api/prisma/seed.ts`

- [ ] **Step 1: Author `seed-chapter-6.ts`**
  - Upsert chapter `chap_ssc_physics_ch6` ('ষষ্ঠ অধ্যায়: বস্তুর ওপর তাপের প্রভাব (Effect of Heat on Matter)').
  - Upsert 7 topics (`top_ssc_physics_ch6_1` through `top_ssc_physics_ch6_7`).
  - Upsert 7 lessons (`les_ssc_physics_ch6_1` through `les_ssc_physics_ch6_7`) with full HTML content, learning goals, important terms, worked examples, memory aids, and interactive widget URLs (`/uploads/interactive/thermal-expansion-lab.html`, `/uploads/interactive/calorimetry-lab.html`).
  - Import questions from question modules and upsert them.

- [ ] **Step 2: Author `seed-chapter-6-questions.ts` (Batch 1: Sections 6.1–6.4)**
  - 26 questions (authentic MCQs + Creative CQs with 4-part rubrics ka, kha, ga, gha).
  - Board questions: Dhaka Board, Rajshahi Board, Dinajpur Board, Chittagong Board.
  - Full explanations with LaTeX math, core concept, step derivation, and distractor analysis.

- [ ] **Step 3: Author `seed-chapter-6-questions-batch2.ts` (Batch 2: Sections 6.5–6.7)**
  - 26 questions (authentic MCQs + Creative CQs with 4-part rubrics ka, kha, ga, gha).
  - Specific heat, calorimetry, thermal equilibrium, phase change mixing, pressure effects.
  - Full explanations with LaTeX math and board sources.

- [ ] **Step 4: Wire `seedChapter6` in `apps/api/prisma/seed.ts`**
  - Import `seedChapter6` and invoke in `seed(prisma)` function alongside chapters 1, 2, 3, and 4.

---

### Task 11: Register Chapter 6 in Frontend Curriculum Data

**Files:**
- Modify: `apps/web/src/lib/curriculum-data.ts`

- [ ] **Step 1: Add Chapter 6 to `DEFAULT_CHAPTERS`**
  - Add `chap_ssc_physics_ch6` with all 7 topics.
- [ ] **Step 2: Update `findTopicHierarchy` resolver**
  - Add matching for Chapter 6 topics (`ch6`, `heat`, `tap`, `calorimetry`, `expansion`, etc.).

---

### Task 12: End-to-End Validation & Verification

- [ ] **Step 1: Run Chapter 6 validation script**
  Run: `node /Users/asfaque/.gemini/antigravity/brain/8ebe4d0d-8ac3-4b79-90b3-736fc3d4f352/scratch/validate-ch6-elevation.js`
  Expected: All checks PASS (0 failures, 52+ questions verified).

- [ ] **Step 2: Run TypeScript compiler check on `apps/api`**
  Run: `pnpm --filter api exec tsc --noEmit`
  Expected: Clean compilation with 0 errors.

- [ ] **Step 3: Run web tests**
  Run: `pnpm --filter web test`
  Expected: Existing tests pass without regression.
