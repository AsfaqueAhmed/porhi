# Technical Design Specification: SSC Physics Chapter 6 (বস্তুর ওপর তাপের প্রভাব / Effect of Heat on Matter) Full Elevation

- **Date:** 2026-11-11
- **Status:** Proposed
- **Author:** Antigravity Engineering Agent
- **Target Files:**
  - Drafts: `drafts/physics-chapter-6/index.html`, `drafts/physics-chapter-6/section-01.html` through `section-07.html`
  - Simulations: `apps/api/prisma/sample-simulations/thermal-expansion-lab.html`, `apps/api/prisma/sample-simulations/calorimetry-lab.html`
  - Backend Seeds: `apps/api/prisma/seed-chapter-6.ts`, `apps/api/prisma/seed-chapter-6-questions.ts`, `apps/api/prisma/seed-chapter-6-questions-batch2.ts`
  - Database Seed Root: `apps/api/prisma/seed.ts`
  - Frontend Curriculum: `apps/web/src/lib/curriculum-data.ts`

---

## 1. Intent & Context

Following the pattern established for Chapter 1 (*ভৌত রাশি ও পরিমাপ*), Chapter 2 (*গতি*), Chapter 3 (*বল*), and Chapter 4 (*কাজ, ক্ষমতা ও শক্তি*), Chapter 6 (*বস্তুর ওপর তাপের প্রভাব / Effect of Heat on Matter*) needs a complete pedagogical and data elevation.

Currently, `drafts/physics-chapter-6/` contains unformatted minified stub files (~4 KB each) lacking KaTeX formulas, structured components (goals, terminology grids, highlight boxes, worked mathematical problems, mnemonics, self-check quizzes), and simulation laboratories. Additionally, no Prisma database seeds exist for Chapter 6 topics, lessons, or board exam question banks.

---

## 2. Goals, Non-Goals & Anti-Goals

### 2.1 Goals
1. **Comprehensive Study Drafts (`drafts/physics-chapter-6/`):**
   - Upgrade all 7 sections (`section-01.html` to `section-07.html`) with rich Bengali content, KaTeX mathematical typesetting, learning goals (`.goal`), term grids (`.grid > .term`), highlight callouts (`.highlight-box`), real-world examples (`.note`), mnemonics (`.memory`), step-by-step worked mathematical problems (`.worked > .problem + .solution`), and interactive expandable self-check quizzes (`details.check`).
   - Polish `index.html` with an orange/amber thermal theme (`#ea580c`, `#c2410c`, `#f97316`), stats cards, and 7-card curriculum roadmap.
2. **Interactive Simulation Laboratories:**
   - **Lab 1 (Thermal Expansion Lab in Section 6.3 & `sample-simulations/thermal-expansion-lab.html`):** Interactive rod expansion laboratory with material selector (Copper $\alpha=17\times 10^{-6}\text{ K}^{-1}$, Iron $\alpha=12\times 10^{-6}\text{ K}^{-1}$, Brass $\alpha=19\times 10^{-6}\text{ K}^{-1}$, Aluminum $\alpha=23\times 10^{-6}\text{ K}^{-1}$), initial length $L_1$ and $\Delta T$ sliders, live SVG visual rod expansion and micrometer readout.
   - **Lab 2 (Calorimetry & Thermal Equilibrium Lab in Section 6.6 & `sample-simulations/calorimetry-lab.html`):** Principle of calorimetry simulation ($Q_{\text{lost}} = Q_{\text{gained}}$) with mass, initial temperature, and specific heat controls for substance 1 and water, dynamic equilibrium temperature ($T_f$) calculation and real-time SVG temperature mixing graph.
3. **Backend Prisma Curriculum Seed (`apps/api/prisma/seed-chapter-6.ts`):**
   - Upsert 7 topics (`top_ssc_physics_ch6_1` through `top_ssc_physics_ch6_7`) and 7 corresponding lessons with full pedagogical data, learning goals, markdown/HTML explanations with LaTeX formulas, important terms, worked examples, memory aids, and interactive widget URLs.
4. **Comprehensive Board Question Bank (50+ Questions across 2 batches):**
   - `seed-chapter-6-questions.ts` (Batch 1: 25+ MCQs and CQs covering Sections 6.1–6.4).
   - `seed-chapter-6-questions-batch2.ts` (Batch 2: 25+ MCQs and CQs covering Sections 6.5–6.7).
   - Questions include authentic SSC Board references (Dhaka, Rajshahi, Chittagong, Dinajpur, etc.), 4-part Creative Question rubrics (Ka, Kha, Ga, Gha), and detailed distractor analysis.
5. **Full System Integration:**
   - Register `seedChapter6` in `apps/api/prisma/seed.ts`.
   - Register Chapter 6 in `apps/web/src/lib/curriculum-data.ts` (`DEFAULT_CHAPTERS` and `findTopicHierarchy`).

### 2.2 Non-Goals
- Modifying earlier chapters (Chapters 1–5).
- Altering original scanned textbook pages in `chapter-source.html`.

---

## 3. Curriculum Structure & Scientific Content (Sections 6.1 – 6.7)

### 6.1 তাপ ও তাপমাত্রা (Heat and Temperature)
- **Concepts:** তাপ ও তাপমাত্রার পার্থক্য, তাপ এক প্রকার শক্তি, তাপমাত্রা কণার গড় গতিশক্তির পরিমাপ, অভ্যন্তরীণ শক্তি, তাপীয় সাম্যাবস্থা (Thermal Equilibrium), তাপপ্রবাহের দিক (উচ্চ তাপমাত্রা থেকে নিম্ন তাপমাত্রা, অভ্যন্তরীণ শক্তির পরিমাণের ওপর নির্ভর করে না)।
- **Formulas & Units:** তাপের একক জুল ($\text{J}$), ক্যালরি ($1\text{ cal} \approx 4.2\text{ J}$), তাপমাত্রার SI একক কেলভিন ($\text{K}$)।
- **Worked Problem:** একটি পাত্রে $20^\circ\text{C}$-এর $1\text{ kg}$ পানি এবং অন্য পাত্রে $80^\circ\text{C}$-এর $100\text{ g}$ পানি রাখা আছে। কোন পাত্রে মোট অভ্যন্তরীণ শক্তি বেশি এবং কোন পাত্র থেকে কোন পাত্রে তাপ প্রবাহিত হবে?
- **Memory Aid:** "তাপ হলো শক্তির আধার, তাপমাত্রা তার লেভেল—তাপমাত্রা ঠিক করে তাপ কার দিকে দেবে বেল!"

### 6.2 তাপমাত্রিক ধর্ম ও তাপমাত্রার স্কেল (Thermometric Properties and Scales)
- **Concepts:** তাপমাত্রিক পদার্থ ও তাপমাত্রিক ধর্ম (পারদের আয়তন প্রসারণ, গ্যাসের চাপ, রোধ থার্মোমিটারের রোধ, থার্মোকাপলের তড়িচ্চালক শক্তি)।
- **Scales & Relations:** সেলসিয়াস, ফারেনহাইট ও কেলভিন স্কেল। নিম্ন স্থিরবিন্দু (বরফবিন্দু) ও ঊর্ধ্ব স্থিরবিন্দু (বাষ্পবিন্দু)।
- **Key Formula:** $\frac{C}{5} = \frac{F-32}{9} = \frac{K-273.15}{5}$ অথবা $\frac{\theta - \theta_i}{\theta_s - \theta_i} = \text{ধ্রুবক}$।
- **Worked Problem:** কোন তাপমাত্রায় সেলসিয়াস ও ফারেনহাইট স্কেলে একই পাঠ দেখাবে? ($-40^\circ$)। মানুষের দেহের স্বাভাবিক তাপমাত্রা $98.4^\circ\text{F}$ সেলসিয়াসে কত? ($36.89^\circ\text{C}$)।

### 6.3 পদার্থের তাপীয় প্রসারণ (Thermal Expansion of Matter)
- **Concepts:** কঠিন, তরল ও গ্যাসের প্রসারণ। কঠিনের দৈর্ঘ্য ($\alpha$), ক্ষেত্রফল ($\beta$), ও আয়তন ($\gamma$) প্রসারণ সহগ। তরলের প্রকৃত ও আপাত প্রসারণ ($\gamma_r = \gamma_a + \gamma_g$)। পানির ব্যতিক্রমী প্রসারণ ($4^\circ\text{C}$-এ সর্বোচ্চ ঘনত্ব $1000\text{ kg/m}^3$) ও জলজ প্রাণীর বেঁচে থাকা।
- **Key Formulas:**
  - $\Delta L = L_1 \alpha \Delta T \implies L_2 = L_1(1 + \alpha \Delta T)$
  - $\Delta A = A_1 \beta \Delta T \implies A_2 = A_1(1 + \beta \Delta T)$
  - $\Delta V = V_1 \gamma \Delta T \implies V_2 = V_1(1 + \gamma \Delta T)$
  - সম্পর্ক: $\beta \approx 2\alpha$, $\gamma \approx 3\alpha$, অর্থাৎ $\frac{\alpha}{1} = \frac{\beta}{2} = \frac{\gamma}{3}$।
- **Simulation Lab:** Rod thermal expansion laboratory with material selector, temperature variation, and real-time micrometer readout.
- **Worked Problem:** $20^\circ\text{C}$ তাপমাত্রায় একটি তামার তারের দৈর্ঘ্য $10\text{ m}$। $70^\circ\text{C}$ তাপমাত্রায় তারটির দৈর্ঘ্য বৃদ্ধি কত? ($\alpha = 16.7 \times 10^{-6}\text{ K}^{-1}$)।

### 6.4 অবস্থার পরিবর্তন, সুপ্ততাপ ও বাষ্পীভবন (Change of State, Latent Heat & Evaporation)
- **Concepts:** পদার্থের তিন অবস্থা ও অবস্থার রূপান্তর (গলন, স্ফুটন, বাষ্পীভবন, ঘনীভবন, কঠিনীভবন)। সুপ্ততাপের ধারণা (তাপমাত্রা স্থির রেখে অবস্থার পরিবর্তন)। গলনের সুপ্ততাপ ($L_f$) ও বাষ্পীভবনের সুপ্ততাপ ($L_v$)। বাষ্পায়নের নিয়ামকসমূহ (পৃষ্ঠের ক্ষেত্রফল, তাপমাত্রা, আর্দ্রতা, বায়ুপ্রবাহ, চাপ, তরলের প্রকৃতি)। বাষ্পীভবনে শীতলীকরণ (মাটির কলসির পানি ঠান্ডা থাকা, ঘেমে গেলে ফ্যানের নিচে স্বস্তি)।
- **Key Formulas:** $Q = mL_f$, $Q = mL_v$ ($L_f = 3.36 \times 10^5\text{ J/kg}$, $L_v = 2.26 \times 10^6\text{ J/kg}$)।
- **Worked Problem:** $0^\circ\text{C}$-এর $2\text{ kg}$ বরফকে $0^\circ\text{C}$-এর পানিতে পরিণত করতে এবং অতঃপর $100^\circ\text{C}$-এর বাষ্পে পরিণত করতে প্রয়োজনীয় মোট তাপের হিসাব।

### 6.5 আপেক্ষিক তাপ ও তাপধারণক্ষমতা (Specific Heat and Heat Capacity)
- **Concepts:** তাপধারণক্ষমতা ($C$) ও আপেক্ষিক তাপ ($s$)। পানির উচ্চ আপেক্ষিক তাপ ($4200\text{ J/(kg}\cdot\text{K)}$) এবং বাস্তব প্রয়োগ (গাড়ির ইঞ্জিনের কুল্যান্ট, সেঁক দেওয়ার হট ওয়াটার ব্যাগ, সামুদ্রিক জলবায়ুর মৃদুভাব)।
- **Key Formulas:** $C = \frac{Q}{\Delta T}$, $s = \frac{Q}{m\Delta T} \implies Q = ms\Delta T$। সম্পর্ক: $C = ms$।
- **Worked Problem:** $2\text{ kg}$ পানির তাপমাত্রা $25^\circ\text{C}$ থেকে $85^\circ\text{C}$-এ বৃদ্ধি করতে কী পরিমাণ তাপের প্রয়োজন? ($Q = 504000\text{ J}$)।

### 6.6 ক্যালরিমিতির মূলনীতি (Principles of Calorimetry)
- **Concepts:** ক্যালরিমিতির মূলনীতি: তাপীয় সাম্যাবস্থায় বর্জিত তাপ = গৃহীত তাপ ($Q_{\text{lost}} = Q_{\text{gained}}$)। বিচ্ছিন্ন ব্যবস্থার শর্ত ও তাপের অপচয় রোধ। পানির সমতুল্য ($W = mc$)।
- **Key Formula:** $m_1 s_1 (T_1 - T_f) = m_2 s_2 (T_f - T_2)$।
- **Simulation Lab:** Interactive Calorimetry Lab with adjustable hot and cold masses, temperatures, specific heats, live heat transfer balance, and mixture final temperature computation.
- **Worked Problem:** $80^\circ\text{C}$ তাপমাত্রার $500\text{ g}$ গরম পানিতে $20^\circ\text{C}$ তাপমাত্রার $300\text{ g}$ ঠান্ডা পানি মেশালে মিশ্রণের চূড়ান্ত তাপমাত্রা কত হবে?

### 6.7 গলনাঙ্ক ও স্ফুটনাঙ্কের ওপর চাপের প্রভাব (Effect of Pressure on Melting and Boiling Points)
- **Concepts:** গলনাঙ্কের ওপর চাপের প্রভাব: যেসব পদার্থ গললে আয়তন কমে (যেমন বরফ), চাপ বাড়ালে তাদের গলনাঙ্ক কমে। পুনঃশিলীভবন (Regelation) ও বরফে স্কেটিং করার কারণ। যেসব পদার্থ গললে আয়তন বাড়ে (যেমন মোম), চাপ বাড়ালে গলনাঙ্ক বাড়ে। স্ফুটনাঙ্কের ওপর চাপের প্রভাব: চাপ বাড়ালে স্ফুটনাঙ্ক বাড়ে, চাপ কমালে কমে। প্রেসার কুকারের কার্যপদ্ধতি (উচ্চ চাপে পানির স্ফুটনাঙ্ক $120^\circ\text{C}$ পর্যন্ত ওঠে, দ্রুত রান্না হয়)। পাহাড়ে কম চাপে পানি আগেই ফোটে ($<100^\circ\text{C}$), ডাল সেদ্ধ হতে দেরি হয়।
- **Worked Problem:** প্রেসার কুকারে চাপ কীভাবে রান্নার সময় কমায় এবং এভারেস্টের চূড়ায় ডিম সেদ্ধ করতে সমস্যা কেন হয় তার বৈজ্ঞানিক ব্যাখ্যা।

---

## 4. Verification Plan

1. **Static Analysis & Link Integrity:**
   - Node.js validation script verifying HTML tags, KaTeX script tags, formula syntax, and relative link targets across `drafts/physics-chapter-6/`.
2. **Interactive Simulation Verification:**
   - Verify slider events, SVG coordinate transformations, and edge cases in `thermal-expansion-lab.html` and `calorimetry-lab.html`.
3. **Database & Type Verification:**
   - Typecheck seeds using TypeScript compiler (`pnpm --filter api exec tsc --noEmit`).
   - Validate question counts (50+ questions with verified answers, explanations, and rubrics).
