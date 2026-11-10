# SSC Physics Chapter 5 (পদার্থের অবস্থা ও চাপ / States of Matter and Pressure) Drafts Enhancement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevate all 6 sections and the index hub in `drafts/physics-chapter-5/` to match the pedagogical rigor, KaTeX mathematical precision, and interactive simulation capabilities of Chapter 3 and Chapter 4, including two embedded simulation labs (Hydraulic Press & Buoyancy Lab and Hooke's Law & Stress-Strain Lab).

**Architecture:** Each section is authored as an accessible, clean, responsive HTML5 document styled with `styles.css` and KaTeX CDN. Sections 5.3 and 5.5 include embedded interactive SVG/HTML simulation laboratories with dynamic sliders, real-time math calculations, and visual animations. A Node.js validator script in scratch ensures no structural, mathematical, or relational regression occurs across all 6 sections.

**Tech Stack:** HTML5, CSS3, KaTeX CDN (`katex@0.16.8`), SVG, JavaScript (Vanilla ES6 for simulations), Node.js validation test script.

**Spec:** `docs/superpowers/specs/2026-11-10-physics-chapter-5-drafts-design.md`

## Global Constraints

- Must import and initialize KaTeX identically to Chapters 1, 2, 3, and 4 with `$$...$$` (display) and `$...$` (inline) delimiters.
- Every section must contain: Topbar crumb, Section badge, Bilingual title (`<h1 class="title">...<small>...</small></h1>`), 🎯 শিখনফল (`section.goal`), Terminology grid (`.grid > .term`), Highlight box (`.highlight-box`), Real-life example (`.note`), Mnemonic memory aid (`.memory`), Worked problem with step-by-step solution (`.worked > .problem + .solution`), Interactive check quiz (`details.check`), Navigation bar (`.nav`), and Footer linking to `chapter-source.html`.
- Section 5.3 must contain an interactive *Hydraulic Press & Buoyancy Simulation Lab* (sliders for input force $F_1$, piston area ratio, liquid density, object immersion depth; dynamic SVG fluid and piston displacement; live readout of $F_2$, stroke distances $l_1, l_2$, work done, and buoyant force $F_b$).
- Section 5.5 must contain an interactive *Hooke's Law Spring & Wire Stress-Strain Simulation Lab* (load slider, spring constant $k$, wire dimensions $L, r$, material presets; dynamic SVG spring and wire deformation; live readout of stress, strain, and elongation $\Delta L$).
- All relative links (`index.html`, `section-01.html` through `section-06.html`, `chapter-source.html`, `styles.css`) must resolve cleanly without 404s.
- `index.html` must follow the Chapter 5 emerald/teal theme (`#0f766e`, `#0d9488`, `#2dd4bf`), 4 stats cards, and 6 detailed roadmap cards with simulation badges.

## Review Focus

1. **Unrendered or broken LaTeX expressions:** Ensure all mathematical notation is valid KaTeX syntax without unbalanced dollar signs or escaping issues.
2. **Missing pedagogical components:** Ensure no section omits required components (worked problems, mnemonics, terms, goals, highlight boxes).
3. **Broken navigation targets:** Ensure Previous / Next buttons point to the correct adjacent sections (`section-01` has index as previous; `section-06` has index as next).
4. **Interactive simulation state handling:** Ensure sliders and numeric controls in Section 5.3 and 5.5 handle edge values smoothly without NaN or broken SVG renders.
5. **Encoding & Bengali typography:** Ensure UTF-8 formatting and correct Bengali terminology conforming to NCTB 2026 standards.

---

### Task 1: Setup Validation Test Harness for Chapter 5 Drafts

**Files:**
- Create: `/Users/asfaque/.gemini/antigravity/brain/f25d8112-5ff5-431d-9921-e44befbc72a0/scratch/validate-ch5-drafts.js`

**Interfaces:**
- Produces: Command-line exit code 0 if all 6 section files + `index.html` pass validation rules; exit code 1 with specific errors otherwise.

- [ ] **Step 1: Write the validation test harness**
  Implement `validate-ch5-drafts.js` checking:
  - File existence for `index.html` and `section-01.html` through `section-06.html`.
  - Presence of KaTeX CSS and JS in all 6 sections.
  - Presence of `<section class="goal">`, `.grid`, `.term`, `.highlight-box`, `.worked`, `.problem`, `.solution`, `.note`, `.memory`, `details.check`, `.nav`, and footer.
  - Presence of simulation labs in Section 5.3 (`.lab`) and Section 5.5 (`.lab`).
  - Balanced display math `$$` and inline `$` delimiters.
  - Relative link targets exist on disk.

- [ ] **Step 2: Run the validator to verify current failures on un-enhanced Chapter 5 files**
  Run: `node /Users/asfaque/.gemini/antigravity/brain/f25d8112-5ff5-431d-9921-e44befbc72a0/scratch/validate-ch5-drafts.js`
  Expected: FAIL on current un-enhanced files (missing KaTeX, mnemonics, etc.).

- [ ] **Step 3: Verify script correctly fails and logs missing components**

---

### Task 2: Enhance Section 5.1 (চাপ / Pressure)

**Files:**
- Modify: `drafts/physics-chapter-5/section-01.html` (৫.১ চাপ / Pressure)

**Interfaces:**
- Consumes: NCTB 2026 Chapter 5 curriculum specifications for Pressure.
- Produces: Enhanced HTML draft for 5.1 conforming to all structural and pedagogical constraints.

- [ ] **Step 1: Write enhanced `section-01.html`**
  - KaTeX header integration with auto-render.
  - Crumb: `অধ্যায় ৫ / ৫.১`, Badge: `এনসিটিবি পাঠ্যবই ৫.১`, Title: `চাপ <small>(Pressure)</small>`.
  - 🎯 শিখনফল: চাপের ভৌত ও গাণিতিক সংজ্ঞা, ক্ষেত্রফল ও বলের প্রভাব, দৈনন্দিন জীবনে চাপের উপযোগিতা।
  - 📚 গভীর বৈজ্ঞানিক ব্যাখ্যা: $P = \frac{F}{A}$, একক প্যাসকেল ($\text{Pa} = \text{N/m}^2$), মাত্রা $[ML^{-1}T^{-2}]$, স্কেলার রাশি।
  - 🗂️ টার্ম গ্রিড: চাপ (Pressure), প্যাসকেল (Pascal), ক্ষেত্রফলের প্রভাব (Area effect), লম্ব বল (Normal Force)।
  - 💡 হাইলাইট বক্স: $P = \frac{F}{A}$ ও ১ প্যাসকেলের সংজ্ঞা।
  - 🚌 বাস্তব জীবনের আকর্ষণীয় উদাহরণ: পেরেকের সূঁচালো মাথা কাঠের ভেতর প্রবেশ, ধারালো ছুরি দিয়ে দ্রুত ফল বা সবজি কাটা, তুষার বা কাদায় চওড়া জুতো বা স্কি পরা, ভারী ট্রাকের একাধিক জোড়া চাকা।
  - 🧠 মনে রাখার ছন্দ: "ক্ষেত্রফল কমলে ভাই বাড়ে দারুণ চাপ, পেরেকের তীক্ষ্ণ মুখে কমে পথের ধাপ!"
  - 📝 পাঠ্যবইয়ের স্ট্যান্ডার্ড গাণিতিক সমস্যা ও সমাধান: $60\text{ kg}$ ভরের ব্যক্তির দুই পায়ের জুতোর মোট ক্ষেত্রফল $0.03\text{ m}^2$ হলে মেঝেতে প্রযুক্ত চাপ নির্ণয়; এক পায়ে দাঁড়ালে চাপ কত হবে? ($g = 9.8\text{ m/s}^2$).
  - ❓ ইন্টারঅ্যাক্টিভ সেলফ-চেক: সূঁচালো হিল জুতো পরা ব্যক্তির চাপ ভারী হাতির পায়ের চাপের চেয়ে বেশি হতে পারে কি?
  - 🧭 নেভিগেশন: `index.html` $\leftarrow$ $\rightarrow$ `section-02.html`.
  - 📄 ফুটার: `chapter-source.html`.

- [ ] **Step 2: Validate Section 5.1**
  Run: `node /Users/asfaque/.gemini/antigravity/brain/f25d8112-5ff5-431d-9921-e44befbc72a0/scratch/validate-ch5-drafts.js --only=1`
  Expected: PASS for section 1.

---

### Task 3: Enhance Section 5.2 (ঘনত্ব / Density)

**Files:**
- Modify: `drafts/physics-chapter-5/section-02.html` (৫.২ ঘনত্ব / Density)

**Interfaces:**
- Consumes: NCTB 2026 Chapter 5 curriculum specifications for Density.
- Produces: Enhanced HTML draft for 5.2 conforming to all structural and pedagogical constraints.

- [ ] **Step 1: Write enhanced `section-02.html`**
  - KaTeX header integration.
  - Crumb: `অধ্যায় ৫ / ৫.২`, Badge: `এনসিটিবি পাঠ্যবই ৫.২`, Title: `ঘনত্ব <small>(Density)</small>`.
  - 🎯 শিখনফল: ঘনত্বের সংজ্ঞা, একক রূপান্তর, তাপমাত্রার প্রভাব, ৪°C-এ পানির ব্যতিক্রমী আচরণ, ভাসা ও ডোবার শর্তাবলি।
  - 📚 গভীর বৈজ্ঞানিক বিশ্লেষণ: $\rho = \frac{m}{V}$, একক $\text{kg/m}^3$ ও $\text{g/cm}^3$ ($1\text{ g/cm}^3 = 1000\text{ kg/m}^3$), মাত্রা $[ML^{-3}]$।
  - বিভিন্ন পদার্থের আদর্শ ঘনত্ব সারণি: কর্ক, কাঠ, বরফ ($920\text{ kg/m}^3$), বিশুদ্ধ পানি ($1000\text{ kg/m}^3$), মানবদেহ ($1060\text{ kg/m}^3$), সমুদ্রের পানি ($1025\text{ kg/m}^3$), লোহা ($7800\text{ kg/m}^3$), পারদ ($13600\text{ kg/m}^3$), সোনা ($19300\text{ kg/m}^3$)।
  - 🗂️ টার্ম গ্রিড: ঘনত্ব ($\rho$), আয়তন ($V$), গড় ঘনত্ব, ৪°C-এ পানির ব্যতিক্রমী প্রসারণ।
  - 💡 হাইলাইট বক্স: ভাসা ও ডোবার ৩টি শর্ত ($\rho_b < \rho_l \implies$ ভাসে, $\rho_b = \rho_l \implies$ সম্পূর্ণ নিমজ্জিত হয়ে ভাসে, $\rho_b > \rho_l \implies$ ডুবে যায়)।
  - 🚌 বাস্তব জীবনের আকর্ষণীয় উদাহরণ: পানিতে বরফের ভাসা, সাগরের লবণাক্ত পানিতে সাঁতার কাটা সহজ হওয়া, ডিম পচে গেলে ভেসে ওঠা, মৃত সাগরে (Dead Sea) মানুষ না ডোবা।
  - 🧠 মনে রাখার ছন্দ: "ভরকে দিয়ে আয়তন ভাগ, ঘনত্ব মেলে চটপট ডাক; ঘনত্ব কম হলে তরলে ভাসে, বেশি হলে তলায় খসে!"
  - 📝 পাঠ্যবইয়ের স্ট্যান্ডার্ড গাণিতিক সমস্যা: $0.2\text{ m} \times 0.1\text{ m} \times 0.05\text{ m}$ আয়তনের একটি ধাতব খণ্ডের ভর $7.8\text{ kg}$। ঘনত্ব কত এবং পারদে ভাসবে কিনা?
  - ❓ ইন্টারঅ্যাক্টিভ সেলফ-চেক: বরফ গলে পানিতে পরিণত হলে মোট আয়তন কমে কেন?
  - 🧭 নেভিগেশন: `section-01.html` $\leftarrow$ $\rightarrow$ `section-03.html`.
  - 📄 ফুটার: `chapter-source.html`.

- [ ] **Step 2: Validate Section 5.2**
  Run: `node /Users/asfaque/.gemini/antigravity/brain/f25d8112-5ff5-431d-9921-e44befbc72a0/scratch/validate-ch5-drafts.js --only=2`
  Expected: PASS for section 2.

---

### Task 4: Enhance Section 5.3 with Hydraulic Press & Buoyancy Simulation Lab

**Files:**
- Modify: `drafts/physics-chapter-5/section-03.html` (৫.৩ তরলে চাপ, প্যাসকেলের সূত্র ও প্লবতা / Pressure in Liquids, Pascal’s Law and Buoyancy)

**Interfaces:**
- Consumes: Mathematical derivations for $P = h\rho g$, Pascal's Law $\frac{F_1}{A_1} = \frac{F_2}{A_2}$, and Archimedes' Principle $F_b = V\rho g$.
- Produces: Enhanced HTML draft 5.3 with embedded interactive SVG simulation lab.

- [ ] **Step 1: Write enhanced `section-03.html`**
  - KaTeX header integration.
  - Crumb: `অধ্যায় ৫ / ৫.৩`, Badge: `এনসিটিবি পাঠ্যবই ৫.৩`, Title: `তরলে চাপ, প্যাসকেলের সূত্র ও প্লবতা <small>(Pressure in Liquids, Pascal’s Law and Buoyancy)</small>`.
  - 🎯 শিখনফল: গভীরতায় তরলের চাপ প্রতিপাদন ($P = h\rho g$), প্যাসকেলের সূত্রের বলবৃদ্ধিকরণ ও কাজের সংরক্ষণ, আর্কিমিডিসের নীতি ও প্লবতার গাণিতিক বিশ্লেষণ।
  - 📚 গভীর বৈজ্ঞানিক বিশ্লেষণ ও গাণিতিক প্রতিপাদন:
    - তরলের অভ্যন্তরে কোনো বিন্দুতে চাপ: $P = \frac{F}{A} = \frac{Ah\rho g}{A} = h\rho g$।
    - প্যাসকেলের সূত্র ও হাইড্রোলিক প্রেস: $\frac{F_1}{A_1} = \frac{F_2}{A_2} \implies F_2 = F_1 \left(\frac{A_2}{A_1}\right) = F_1 \left(\frac{r_2}{r_1}\right)^2$। শক্তি সংরক্ষণ $W_1 = W_2 \implies F_1 l_1 = F_2 l_2$।
    - আর্কিমিডিসের নীতি ও প্লবতা: $F_b = F_2 - F_1 = A h_2 \rho g - A h_1 \rho g = Ah\rho g = V\rho g$।
  - 🗂️ টার্ম গ্রিড: তরল চাপ ($h\rho g$), বলবৃদ্ধিকরণ নীতি, প্লবতা ($F_b$), আপাত ওজন হ্রাস।
  - 💡 হাইলাইট বক্স: প্যাসকেলের সূত্র এবং আর্কিমিডিসের নীতি।
  - 🔬 **ইন্টারেক্টিভ সিমুলেশন ল্যাব: হাইড্রোলিক প্রেস ও প্লবতা সিমুলেটর**
    - Sliders: ছোট পিস্টনে বল $F_1$ ($10-500\text{ N}$), পিস্টন ব্যাসার্ধের অনুপাত $r_2/r_1$ ($1-5$), তরলের ঘনত্ব $\rho$ (পানি $1000$, কেরোসিন $800$, গ্লিসারিন $1260$, পারদ $13600$), নিমজ্জিত আয়তন $V$ ($0.001-0.01\text{ m}^3$).
    - Dynamic SVG graphics illustrating dual pistons, fluid level displacement, and submerged cylinder.
    - Real-time live calculations: Output force $F_2$, stroke distances ($l_1, l_2$), output work, and buoyant force $F_b$.
  - 🚌 বাস্তব জীবনের আকর্ষণীয় উদাহরণ: হাইড্রোলিক ব্রেক, হাইড্রোলিক ক্রেন, বিশাল লোহার জাহাজের ভাসা, ডুবোজাহাজের ব্যাল্লাস্ট ট্যাংক।
  - 🧠 মনে রাখার ছন্দ: "গভীরতা বাড়লে $h\rho g$ চাপ, প্যাসকেলের জাদুতে বল বাড়ে ধাপ; আর্কিমিডিসের নীতিতে অপসারিত তরলের ওজন, প্লবতা বলের সমান হয় প্রমাণ সারাক্ষণ!"
  - 📝 পাঠ্যবইয়ের স্ট্যান্ডার্ড ২টি গাণিতিক সমস্যা:
    1. পিস্টনের ব্যাসার্ধের অনুপাত $1:5$ হলে $100\text{ N}$ বলের জন্য বড় পিস্টনের বল ও সরণ নির্ণয়।
    2. $0.002\text{ m}^3$ আয়তনের বস্তুর পানিতে নিমজ্জিত অবস্থায় আপাত ওজন নির্ণয়।
  - ❓ ইন্টারঅ্যাক্টিভ সেলফ-চেক: লোহার পেরেক পানিতে ডুবে গেলেও লোহার তৈরি জাহাজ কেন ভাসে?
  - 🧭 নেভিগেশন: `section-02.html` $\leftarrow$ $\rightarrow$ `section-04.html`.
  - 📄 ফুটার: `chapter-source.html`.

- [ ] **Step 2: Validate Section 5.3**
  Run: `node /Users/asfaque/.gemini/antigravity/brain/f25d8112-5ff5-431d-9921-e44befbc72a0/scratch/validate-ch5-drafts.js --only=3`
  Expected: PASS for section 3.

---

### Task 5: Enhance Section 5.4 (বায়ুচাপ, ব্যারোমিটার ও আবহাওয়া)

**Files:**
- Modify: `drafts/physics-chapter-5/section-04.html` (৫.৪ বায়ুচাপ, ব্যারোমিটার ও আবহাওয়া / Air Pressure, Barometer and Weather)

**Interfaces:**
- Consumes: Atmospheric pressure, Torricelli's experiment, barometer weather forecasting, altitude effect.
- Produces: Enhanced HTML draft 5.4.

- [ ] **Step 1: Write enhanced `section-04.html`**
  - KaTeX header integration.
  - Crumb: `অধ্যায় ৫ / ৫.৪`, Badge: `এনসিটিবি পাঠ্যবই ৫.৪`, Title: `বায়ুচাপ, ব্যারোমিটার ও আবহাওয়া <small>(Air Pressure, Barometer and Weather)</small>`.
  - 🎯 শিখনফল: বায়ুমণ্ডলীয় চাপের উৎস, প্রমাণ বায়ুচাপের মান, টরিসেলির পরীক্ষা ও শূন্যস্থান, ব্যারোমিটারের সাহায্যে আবহাওয়ার পূর্বাভাস, উচ্চতার সাথে চাপের পরিবর্তন।
  - 📚 গভীর বৈজ্ঞানিক বিশ্লেষণ: প্রমাণ বায়ুচাপ ($1\text{ atm} = 76\text{ cm Hg} = 0.76 \times 13600 \times 9.8 = 101325\text{ Pa}$), টরিসেলির পরীক্ষা ও টরিসেলির শূন্যস্থান।
  - ব্যারোমিটার ও আবহাওয়ার পূর্বাভাস সারণি:
    - পারদস্তম্ভের উচ্চতা ধীরে ধীরে কমলে $\rightarrow$ আর্দ্রতা বৃদ্ধি, বৃষ্টির সম্ভাবনা।
    - পারদস্তম্ভের উচ্চতা দ্রুত কমলে $\rightarrow$ স্থানীয় নিম্নচাপ, ঝড় বা সাইক্লোনের পূর্বাভাস।
    - পারদস্তম্ভের উচ্চতা ধীরে ধীরে বাড়লে $\rightarrow$ আবহাওয়া শুষ্ক ও পরিষ্কার হওয়ার লক্ষণ।
  - 🗂️ টার্ম গ্রিড: প্রমাণ বায়ুচাপ, টরিসেলির শূন্যস্থান, ব্যারোমিটার, নিম্নচাপ অঞ্চল।
  - 💡 হাইলাইট বক্স: টরিসেলির পরীক্ষার সমীকরণ $P_{\text{atm}} = h\rho_{\text{Hg}} g$।
  - 🚌 বাস্তব জীবনের আকর্ষণীয় উদাহরণ: স্ট্র দিয়ে পানীয় গ্রহণ, পর্বতারোহীদের শ্বাসকষ্ট ও নাক দিয়ে রক্তক্ষরণ, বিমানের কেবিন প্রেশারাইজেশন, চিপসের প্যাকেট পাহাড়ে ফুলে যাওয়া।
  - 🧠 মনে রাখার ছন্দ: "৭৬ সেমি পারদস্তম্ভে সমুদ্রের বায়ুচাপ, টরিসেলির নলে নামে ঝড়-বৃষ্টির মাপ; দ্রুত কমলে ব্যারোমিটার ডাকবে তবে ঝড়, উচ্চতায় উঠলে চাপ কমে যায় স্বত্বর!"
  - 📝 পাঠ্যবইয়ের স্ট্যান্ডার্ড গাণিতিক সমস্যা: সমুদ্রপৃষ্ঠে ব্যারোমিটারের পাঠ $76\text{ cm}$ এবং পাহাড়ে $64\text{ cm}$ হলে ওই পাহাড়ে বায়ুচাপ হ্রাস কত?
  - ❓ ইন্টারঅ্যাক্টিভ সেলফ-চেক: ব্যারোমিটারে পারদের বদলে পানি ব্যবহার করলে কাচনলের দৈর্ঘ্য কমপক্ষে কত মিটার হতে হতো?
  - 🧭 নেভিগেশন: `section-03.html` $\leftarrow$ $\rightarrow$ `section-05.html`.
  - 📄 ফুটার: `chapter-source.html`.

- [ ] **Step 2: Validate Section 5.4**
  Run: `node /Users/asfaque/.gemini/antigravity/brain/f25d8112-5ff5-431d-9921-e44befbc72a0/scratch/validate-ch5-drafts.js --only=4`
  Expected: PASS for section 4.

---

### Task 6: Enhance Section 5.5 with Hooke's Law Spring & Stress-Strain Simulation Lab

**Files:**
- Modify: `drafts/physics-chapter-5/section-05.html` (৫.৫ স্থিতিস্থাপকতা ও হুকের সূত্র / Elasticity and Hooke’s Law)

**Interfaces:**
- Consumes: Elasticity principles, strain, stress, Hooke's Law, Young's modulus, spring constant.
- Produces: Enhanced HTML draft 5.5 with embedded interactive SVG simulation lab.

- [ ] **Step 1: Write enhanced `section-05.html`**
  - KaTeX header integration.
  - Crumb: `অধ্যায় ৫ / ৫.৫`, Badge: `এনসিটিবি পাঠ্যবই ৫.৫`, Title: `স্থিতিস্থাপকতা ও হুকের সূত্র <small>(Elasticity and Hooke’s Law)</small>`.
  - 🎯 শিখনফল: স্থিতিস্থাপকতা, স্থিতিস্থাপক সীমা, বিকৃতি ও পীড়নের সম্পর্ক, হুকের সূত্র এবং ইয়ংয়ের গুণাঙ্ক ($Y$) ও স্প্রিং ধ্রুবক ($k$) প্রয়োগ।
  - 📚 গভীর বৈজ্ঞানিক বিশ্লেষণ ও গাণিতিক প্রতিপাদন:
    - বিকৃতি: $\text{Strain} = \frac{\Delta L}{L}$ (একক ও মাত্রাহীন)।
    - পীড়ন: $\text{Stress} = \frac{F}{A}$ (একক $\text{N/m}^2$ বা $\text{Pa}$, মাত্রা $[ML^{-1}T^{-2}]$)।
    - হুকের সূত্র: $\text{পীড়ন} \propto \text{বিকৃতি} \implies \frac{\text{পীড়ন}}{\text{বিকৃতি}} = \text{ধ্রুবক} = Y$।
    - ইয়ংয়ের গুণাঙ্ক: $Y = \frac{F/A}{\Delta L/L} = \frac{FL}{A\Delta L} = \frac{FL}{\pi r^2 \Delta L}$।
    - স্প্রিং বল: $F = kx$।
  - বিভিন্ন ধাতুর ইয়ংয়ের গুণাঙ্ক সারণি: ইস্পাত ($2\times 10^{11}\text{ Pa}$), তামা ($1.1\times 10^{11}\text{ Pa}$), অ্যালুমিনিয়াম ($7\times 10^{10}\text{ Pa}$), কাচ ($6.5\times 10^{10}\text{ Pa}$)।
  - 🗂️ টার্ম গ্রিড: স্থিতিস্থাপক সীমা (Elastic Limit), বিকৃতি (Strain), পীড়ন (Stress), ইয়ংয়ের গুণাঙ্ক ($Y$), স্প্রিং ধ্রুবক ($k$)।
  - 💡 হাইলাইট বক্স: হুকের সূত্র ও ইয়ং গুণাঙ্কের সূত্র।
  - 🔬 **ইন্টারেক্টিভ সিমুলেশন ল্যাব: হুকের সূত্র ও তারের প্রসারণ ল্যাব**
    - Sliders: ঝুলন্ত ভর/বল $F$ ($0-100\text{ N}$), স্প্রিং ধ্রুবক $k$ ($20-200\text{ N/m}$), তারের দৈর্ঘ্য $L$ ($1-5\text{ m}$), ব্যাসার্ধ $r$ ($0.5-2\text{ mm}$), ধাতু নির্বাচন বোতাম (ইস্পাত, তামা, অ্যালুমিনিয়াম)।
    - Dynamic SVG graphics illustrating spring elongation and wire deformation with weight attachment.
    - Live readout: পীড়ন (Stress $\text{N/m}^2$), বিকৃতি (Strain), প্রসারণ ($\Delta L\text{ mm}$), এবং স্প্রিং প্রসারণ ($x\text{ cm}$)।
  - 🚌 বাস্তব জীবনের আকর্ষণীয় উদাহরণ: সেতুর গার্ডার ও রেললাইনে ইস্পাত ব্যবহার, গাড়ির শক অ্যাবজরবার স্প্রিং, ধনুকের জ্যা ও গুলতির স্থিতিস্থাপকতা।
  - 🧠 মনে রাখার ছন্দ: "সীমার ভেতর পীড়ন বাড়ে বিকৃতির সাথে সাথে, হুকের সূত্রে $Y$ থাকে বিজ্ঞানীর হাতে; বল সরালে আগের রূপ স্থিতিস্থাপক ভাই, সীমার বাইরে গেলে তারে স্থায়ী টান পাই!"
  - 📝 পাঠ্যবইয়ের স্ট্যান্ডার্ড ২টি গাণিতিক সমস্যা:
    1. $2\text{ m}$ দীর্ঘ এবং $1\text{ mm}^2$ প্রস্থচ্ছেদের ইস্পাতের তারে $10\text{ kg}$ ভর ঝুলালে প্রসারণ $\Delta L$ নির্ণয় ($Y = 2\times 10^{11}\text{ Pa}$)।
    2. একটি স্প্রিংয়ে $50\text{ N}$ বল প্রয়োগে $2.5\text{ cm}$ প্রসারিত হলে স্প্রিং ধ্রুবক $k$ নির্ণয়।
  - ❓ ইন্টারঅ্যাক্টিভ সেলফ-চেক: লোহা ও রবারের মধ্যে কোনটি বেশি স্থিতিস্থাপক এবং পদার্থবিজ্ঞানের সংজ্ঞানুযায়ী এর কারণ কী?
  - 🧭 নেভিগেশন: `section-04.html` $\leftarrow$ $\rightarrow$ `section-06.html`.
  - 📄 ফুটার: `chapter-source.html`.

- [ ] **Step 2: Validate Section 5.5**
  Run: `node /Users/asfaque/.gemini/antigravity/brain/f25d8112-5ff5-431d-9921-e44befbc72a0/scratch/validate-ch5-drafts.js --only=5`
  Expected: PASS for section 5.

---

### Task 7: Enhance Section 5.6 (পদার্থের তিন অবস্থা, আণবিক গতিতত্ত্ব ও প্লাজমা)

**Files:**
- Modify: `drafts/physics-chapter-5/section-06.html` (৫.৬ পদার্থের তিন অবস্থা, আণবিক গতিতত্ত্ব ও প্লাজমা / States of Matter, Molecular Kinetic Theory and Plasma)

**Interfaces:**
- Consumes: States of matter, kinetic molecular theory, microscopic explanation of pressure, plasma properties.
- Produces: Enhanced HTML draft 5.6.

- [ ] **Step 1: Write enhanced `section-06.html`**
  - KaTeX header integration.
  - Crumb: `অধ্যায় ৫ / ৫.৬`, Badge: `এনসিটিবি পাঠ্যবই ৫.৬`, Title: `পদার্থের তিন অবস্থা, আণবিক গতিতত্ত্ব ও প্লাজমা <small>(States of Matter, Molecular Kinetic Theory and Plasma)</small>`.
  - 🎯 শিখনফল: কঠিন, তরল ও গ্যাসের আণবিক বৈশিষ্ট্য, আণবিক গতিতত্ত্বের স্বীকার্য, গ্যাসের চাপ ও তাপমাত্রার সম্পর্ক ($P \propto T$), প্লাজমা অবস্থার বৈশিষ্ট্য ও মহাবিশ্বে এর প্রাচুর্য।
  - 📚 গভীর বৈজ্ঞানিক বিশ্লেষণ:
    - পদার্থের ৩ অবস্থার তুলনামূলক বিশ্লেষণ (আন্তঃআণবিক আকর্ষণ ও দূরত্ব, সুনির্দিষ্ট আকার ও আয়তন, সংকোচনশীলতা)।
    - আণবিক গতিতত্ত্ব: অবিরাম বিশৃঙ্খল গতি, স্থিতিস্থাপক সংঘর্ষ, গতিশক্তি ও তাপমাত্রার সমানুপাতিক সম্পর্ক ($E_k \propto T$)।
    - পাত্রের দেয়ালে কণার সংঘর্ষের ফলে গ্যাসের চাপের গাণিতিক ব্যাখ্যা।
    - পদার্থের চতুর্থ অবস্থা: প্লাজমা (আয়নিত গ্যাস, চার্জ নিরপেক্ষতা, তড়িৎ ও চৌম্বক ক্ষেত্রের প্রভাব, মহাবিশ্বের ৯৯% পদার্থের অবস্থা, সূর্য, বজ্রপাত, নিয়ন আলো, ফিউশন রিঅ্যাক্টর)।
  - 🗂️ টার্ম গ্রিড: আণবিক গতিতত্ত্ব, আন্তঃআণবিক বল, প্লাজমা (Plasma), আয়নিত গ্যাস।
  - 💡 হাইলাইট বক্স: গ্যাসের চাপ ও তাপমাত্রার গতিতাত্ত্বিক সম্পর্ক ($P \propto T$) এবং প্লাজমা অবস্থার সংজ্ঞা।
  - 🚌 বাস্তব জীবনের আকর্ষণীয় উদাহরণ: রোদে রাখা সাইকেল বা গাড়ির টায়ার ফেটে যাওয়া, প্রেসার কুকারের কার্যপ্রণালী, নিয়ন বাতি ও প্লাজমা প্রদর্শন, বিদ্যুৎ চমক।
  - 🧠 মনে রাখার ছন্দ: "কঠিনে বন্ধন দৃঢ়, তরলে শিথিল কায়া; গ্যাসে মুক্ত ছোটাছুটি, প্লাজমা হলো সূর্যের মায়া!"
  - 📝 পাঠ্যবইয়ের স্ট্যান্ডার্ড গাণিতিক সমস্যা: স্থির আয়তনের সিলিন্ডারে গ্যাসের তাপমাত্রা $27^\circ\text{C}$ ($300\text{ K}$) থেকে বৃদ্ধি করে $127^\circ\text{C}$ ($400\text{ K}$) করা হলে চাপের শতকরা পরিবর্তন নির্ণয়।
  - ❓ ইন্টারঅ্যাক্টিভ সেলফ-চেক: মহাবিশ্বের প্রায় ৯৯% পদার্থ প্লাজমা হলেও স্বাভাবিক অবস্থায় পৃথিবীতে আমরা প্লাজমা সচরাচর দেখতে পাই না কেন?
  - 🧭 নেভিগেশন: `section-05.html` $\leftarrow$ $\rightarrow$ `index.html`.
  - 📄 ফুটার: `chapter-source.html`.

- [ ] **Step 2: Validate Section 5.6**
  Run: `node /Users/asfaque/.gemini/antigravity/brain/f25d8112-5ff5-431d-9921-e44befbc72a0/scratch/validate-ch5-drafts.js --only=6`
  Expected: PASS for section 6.

---

### Task 8: Enhance Chapter Hub (`index.html`) & Run End-to-End Chapter 5 Verification

**Files:**
- Modify: `drafts/physics-chapter-5/index.html` (অধ্যায় ৫ মূল সূচিপত্র / Chapter 5 Hub)

**Interfaces:**
- Consumes: Enhanced sections 5.1 through 5.6, styles, stats, roadmap data.
- Produces: High-polish Chapter Hub index page and complete passing suite.

- [ ] **Step 1: Write enhanced `index.html`**
  - KaTeX header integration.
  - Emerald/Teal hero section with title, subtitle, and action buttons (`প্রথম পাঠ শুরু করো →`, `মূল বইয়ের ৩২ পৃষ্ঠা ↗`).
  - 4 Statistics cards:
    - **৬টি** গভীর বিষয়ভিত্তিক পাঠ
    - **১৫+** গাণিতিক সমস্যা ও সমাধান
    - **২টি** লাইভ সিমুলেশন ল্যাব
    - **১০০%** এনসিটিবি ২০২৬ পাঠ্যক্রম মান
  - 6 Structured Roadmap Cards matching the exact titles, numbers, English subtitles, bullet summaries, simulation badges on 5.3 & 5.5, and chevrons.
  - Scanned source textbook card linking to `chapter-source.html`.
  - Topbar and footer links matching the chapter theme.

- [ ] **Step 2: Run complete End-to-End Validator across Chapter 5**
  Run: `node /Users/asfaque/.gemini/antigravity/brain/f25d8112-5ff5-431d-9921-e44befbc72a0/scratch/validate-ch5-drafts.js`
  Expected: All 6 sections and index pass all pedagogical, mathematical, and link checks with 0 errors.

- [ ] **Step 3: Manual sanity check of relative links and HTML formatting**
  Verify clean relative paths:
  - `styles.css` loads properly.
  - Section-to-section navigation works seamlessly (`section-01` $\leftrightarrow$ `section-02` $\dots$ `section-06` $\leftrightarrow$ `index.html`).
  - `chapter-source.html` opens cleanly.
