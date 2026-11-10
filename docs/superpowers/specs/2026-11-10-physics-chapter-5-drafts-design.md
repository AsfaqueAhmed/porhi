# Technical Design Specification: SSC Physics Chapter 5 (পদার্থের অবস্থা ও চাপ / States of Matter and Pressure) Drafts Enhancement

- **Date:** 2026-11-10
- **Status:** Proposed
- **Author:** Antigravity Engineering Agent
- **Target Files:** `drafts/physics-chapter-5/index.html`, `drafts/physics-chapter-5/section-01.html` through `section-06.html`

---

## 1. Intent & Context

The poRi platform maintains high-fidelity interactive HTML study drafts in `drafts/` for SSC Physics students following the NCTB 2026 curriculum.
- **Chapter 1** (*ভৌত রাশি ও পরিমাপ*), **Chapter 2** (*গতি*), **Chapter 3** (*বল / Force*), and **Chapter 4** (*কাজ, ক্ষমতা ও শক্তি*) feature comprehensive, beautifully styled, pedagogically rigorous HTML chapters with KaTeX mathematical formulas, clear typography, structured learning goals, terminology grids, highlight boxes, real-world analogies, mnemonics, worked numerical problems, interactive self-checks, and embedded simulation labs.
- **Chapter 5** (*পদার্থের অবস্থা ও চাপ / States of Matter and Pressure*) currently exists as a bare, minified draft (~3–5 KB per file) lacking KaTeX math formatting, deep explanations, structured pedagogical cards, mnemonics, standard worked mathematical derivations, and visual simulation labs.

The goal of this project is to enhance all 6 sections and the index hub of Chapter 5 to match the pedagogical richness, mathematical rigor, and interactive simulation capabilities established in Chapter 3 and Chapter 4 (Approach 2).

---

## 2. Goals, Non-Goals & Anti-Goals

### 2.1 Goals
1. **Full Pedagogical Elevation:** Upgrade all 6 sections (`section-01.html` through `section-06.html`) with deep, clear Bengali explanations adhering to NCTB SSC Physics Chapter 5 curriculum.
2. **Mathematical Precision with KaTeX:** Integrate KaTeX CDN and auto-render configs across all sections for crystal-clear formulas ($P = \frac{F}{A}$, $\rho = \frac{m}{V}$, $P = h\rho g$, $F_b = V\rho g$, $\frac{F_1}{A_1} = \frac{F_2}{A_2}$, $Y = \frac{FL}{A\Delta L}$, $F = kx$, etc.).
3. **Structured Content Pattern:** Every section strictly includes:
   - Breadcrumb & Topbar navigation (`অধ্যায় ৫ / ৫.x`)
   - Section Badge & Bilingual Title (`বাংলা শিরোনাম <small>(English Subtitle)</small>`)
   - 🎯 **শিখনফল (Learning Goals)**
   - 📚 **মূল বিষয়বস্তু ও বৈজ্ঞানিক বিশ্লেষণ (Deep Explanations & Formula Derivations)**
   - 🗂️ **টার্ম গ্রিড (Key Terminology Cards: `.grid` > `.term`)**
   - 💡 **হাইলাইট বক্স (`.highlight-box`)**
   - 🚌 **বাস্তব জীবনের আকর্ষণীয় উদাহরণ (`.note`)**
   - 🧠 **মনে রাখার কৌশল / নেমোনিক (`.memory`)**
   - 📝 **পাঠ্যবইয়ের স্ট্যান্ডার্ড গাণিতিক সমস্যা ও সমাধান (`.worked` > `.problem` + `.solution`)**
   - ❓ **ইন্টারেক্টিভ আত্মযাচাই (`<details class="check"><summary>...</summary><p>...</p></details>`)**
   - 🧭 **পূর্ববর্তী/পরবর্তী নেভিগেশন বোতাম (`.nav`)**
   - 📄 **ফুটার লিংক (`chapter-source.html`)**
4. **Interactive Simulation Labs (Approach 2):**
   - **Section 5.3:** Embedded *Hydraulic Press & Buoyancy Simulation Lab* with real-time sliders for input force $F_1$, piston area ratio $A_2/A_1$, liquid density $\rho$, and object immersion depth, rendering dynamic SVG piston displacement and buoyant force readout.
   - **Section 5.5:** Embedded *Hooke's Law Spring & Wire Stress-Strain Simulation Lab* with real-time load sliders, wire dimensions ($L, r$), spring constant $k$, and Young's Modulus $Y$, dynamically drawing spring deformation and computing stress, strain, and elongation ($\Delta L$).
5. **Enhanced Chapter Hub (`index.html`):** Polish the index with an emerald/teal theme (`#0f766e`, `#0d9488`, `#2dd4bf`), 4 statistics cards, structured 6-card roadmap grid with English subtitles, simulation badges, and link to original scanned 32-page textbook source.

### 2.2 Non-Goals
- Updating backend Prisma database seed files or API endpoints (Approach 2 selected: Drafts + Visual Simulation Labs).
- Altering the original 32-page scanned textbook file (`chapter-source.html`).
- Modifying shared CSS variables in `styles.css` unless required for component fidelity.

### 2.3 Anti-Goals
- Shallow or truncated content (avoiding 1-paragraph summaries).
- English-only text or unparsed raw LaTeX strings.
- Inconsistent section navigation or broken relative links.

---

## 3. Approaches Considered

1. **Approach 1 (Core Pedagogical Elevation - Standard Chapter 3 Format):** Upgrade all 6 sections + `index.html` with KaTeX, learning goals, derivations, terminology grids, highlight boxes, worked examples, and self-checks, without interactive SVG labs.
2. **Approach 2 (Core Elevation + Interactive Visual Simulation Labs - Selected by User):** Full pedagogical elevation plus embedding interactive simulation labs in Section 5.3 (Hydraulic Press & Buoyancy Lab) and Section 5.5 (Hooke's Law & Stress-Strain Lab).
3. **Approach 3 (Drafts + Backend Prisma Seed & Question Bank):** Update drafts plus create backend database seeds and curriculum items.

**Selection Rationale:** The user specifically selected **Approach 2** to achieve the exact rich, interactive experience that elevated earlier chapters.

---

## 4. Detailed Section Curriculum Specifications

### Section 5.1: চাপ (Pressure)
- **Topics:** প্রতি একক ক্ষেত্রফলে লম্বভাবে প্রযুক্ত বলের সংজ্ঞা, ক্ষেত্রফল ও বলের পরিবর্তনের সাথে চাপের সম্পর্ক, চাপের একক (প্যাসকেল, $\text{Pa} = \text{N/m}^2$) ও মাত্রা ($[ML^{-1}T^{-2}]$), স্কেলার রাশি হিসেবে চাপ।
- **Key Formulas:** $P = \frac{F}{A}$
- **Real-Life Examples:** পেরেকের সূঁচালো মাথা কাঠের ভেতর সহজে প্রবেশ করা, ধারালো ছুরি দিয়ে দ্রুত ফল বা সবজি কাটা, তুষার বা কাদার ওপর চওড়া জুতো বা তক্তা পরে হাঁটা, ভারী ট্রাকের পেছনের চাকার প্রস্থ ও একাধিক জোড়া চাকা ব্যবহার।
- **Worked Problem:** $60\text{ kg}$ ভরের একজন ব্যক্তির দুই পায়ের জুতার মোট ক্ষেত্রফল $0.03\text{ m}^2$ হলে মেঝেতে প্রযুক্ত চাপ কত? এক পায়ে দাঁড়ালে চাপ কত হবে? ($g = 9.8\text{ m/s}^2$)
- **Memory Aid:** "ক্ষেত্রফল কমলে ভাই বাড়ে দারুণ চাপ, পেরেকের তীক্ষ্ণ মুখে কমে পথের ধাপ!"
- **Self-Check:** সূঁচালো হিল জুতো পরা ব্যক্তির চাপ ভারী হাতির পায়ের চাপের চেয়ে বেশি হতে পারে কি? ব্যাখ্যা করো।

### Section 5.2: ঘনত্ব (Density)
- **Topics:** একক আয়তনে পদার্থের ভরের সংজ্ঞা, ঘনত্বের একক ($\text{kg/m}^3$ ও $\text{g/cm}^3$) ও রূপান্তর ($1\text{ g/cm}^3 = 1000\text{ kg/m}^3$), তাপমাত্রার সাথে ঘনত্বের সম্পর্ক ও ৪°C-এ পানির ব্যতিক্রমী ঘনত্ব ($1000\text{ kg/m}^3$), বিভিন্ন পদার্থের ঘনত্বের আদর্শ তালিকা (কর্ক, কাঠ, বরফ, পানি, গ্লিসারিন, লোহা, পারদ, সোনা), ভাসা ও ডোবার শর্তাবলি।
- **Key Formulas:** $\rho = \frac{m}{V}$
- **Real-Life Examples:** পানিতে বরফের ভাসা (বরফের ঘনত্ব $920\text{ kg/m}^3$), সমুদ্রের লবণাক্ত পানিতে সাঁতার কাটা সহজ হওয়া, ডিম পচে গেলে পানিতে ভেসে ওঠার কারণ, মৃত সাগরে (Dead Sea) মানুষের না ডোবা।
- **Worked Problem:** $0.2\text{ m} \times 0.1\text{ m} \times 0.05\text{ m}$ আয়তনের একটি ধাতব খণ্ডের ভর $7.8\text{ kg}$। খণ্ডটির ঘনত্ব কত? এটি পারদে ($\rho = 13600\text{ kg/m}^3$) ভাসবে কি?
- **Memory Aid:** "ভরকে দিয়ে আয়তন ভাগ, ঘনত্ব মেলে চটপট ডাক; ঘনত্ব কম হলে তরলে ভাসে, বেশি হলে তলায় খসে!"
- **Self-Check:** বরফ গলে পানিতে পরিণত হলে তার আয়তন বাড়ে নাকি কমে এবং কেন?

### Section 5.3: তরলে চাপ, প্যাসকেলের সূত্র ও প্লবতা (Pressure in Liquids, Pascal’s Law and Buoyancy)
- **Topics:**
  - তরলের অভ্যন্তরে কোনো বিন্দুতে চাপ ও তার প্রতিপাদন ($P = h\rho g$), তরল চাপের বৈশিষ্ট্য (গভীরতার প্রভাব, একই গভীরতায় সবদিকে সমান চাপ, পাত্রের আকারের ওপর নিরপেক্ষতা)।
  - প্যাসকেলের সূত্র (Pascal's Principle) ও বলবৃদ্ধিকরণ নীতি (Hydraulic Press): আবদ্ধ তরলে বাহ্যিক চাপ চারদিকে অবিকৃতভাবে সঞ্চালিত হওয়া, $\frac{F_1}{A_1} = \frac{F_2}{A_2} \implies F_2 = F_1 \left(\frac{A_2}{A_1}\right) = F_1 \left(\frac{r_2}{r_1}\right)^2$, কাজের সংরক্ষণ নীতি ($W_1 = W_2 \implies F_1 l_1 = F_2 l_2$)।
  - আর্কিমিডিসের নীতি (Archimedes' Principle) ও প্লবতা (Buoyant Force $F_b$): প্লবতার গাণিতিক প্রতিপাদন ($F_b = F_2 - F_1 = V\rho g$), নিমজ্জিত বস্তুর আপাত ওজন হ্রাস, ভাসা-ডোবার তিনটি অবস্থা।
- **Interactive Simulation Lab:**
  - *Hydraulic Press & Buoyancy Simulation Lab:*
  - Interactive sliders: ছোট পিস্টনে বল $F_1$ ($10-500\text{ N}$), পিস্টন ব্যাসার্ধের অনুপাত $r_2/r_1$ ($1-5$), তরলের ঘনত্ব $\rho$ ($800-13600\text{ kg/m}^3$), নিমজ্জিত বস্তুর আয়তন।
  - SVG visual animation showing pistons with displacement and fluid movement, real-time calculations of $F_2$, stroke distances $l_1, l_2$, work done, and buoyant force $F_b$.
- **Worked Problem:** একটি জলবাহী প্রেসের ছোট ও বড় পিস্টনের ব্যাসের অনুপাত $1:5$। ছোট পিস্টনে $200\text{ N}$ বল প্রয়োগ করা হলে বড় পিস্টনে কত বল পাওয়া যাবে? ছোট পিস্টন $10\text{ cm}$ নিচে নামলে বড় পিস্টন কতটুকু উপরে উঠবে?
- **Memory Aid:** "গভীরতা বাড়লে $h\rho g$ চাপ, প্যাসকেলের জাদুতে বল বাড়ে ধাপ; আর্কিমিডিসের নীতিতে অপসারিত তরলের ওজন, প্লবতা বলের সমান হয় প্রমাণ সারাক্ষণ!"
- **Self-Check:** একটি লোহার টুকরা পানিতে ডুবে গেলেও বিশাল লোহার জাহাজ পানিতে ভাসে কেন?

### Section 5.4: বায়ুচাপ, ব্যারোমিটার ও আবহাওয়া (Air Pressure, Barometer and Weather)
- **Topics:** বায়ুমণ্ডলীয় চাপের উৎপত্তি ও সংজ্ঞা, প্রমাণ বায়ুমণ্ডলীয় চাপ ($1\text{ atm} = 76\text{ cm Hg} = 101325\text{ Pa}$), টরিসেলির পরীক্ষা ও টরিসেলির শূন্যস্থান (Torricelli's Vacuum), ব্যারোমিটারের গঠন ও কার্যপ্রণালী, উচ্চতার সাথে বায়ুচাপের হ্রাস ও কারণ, ব্যারোমিটারের পাঠ দেখে আবহাওয়ার পূর্বাভাস (ধীরে কমলে বৃষ্টি, দ্রুত কমলে ঝড়/সাইক্লোন, ধীরে বাড়লে পরিষ্কার আকাশ)।
- **Key Formulas:** $P = h\rho_{\text{Hg}} g$
- **Real-Life Examples:** স্ট্র দিয়ে কোল্ড ড্রিঙ্কস খাওয়া, কালবৈশাখী ঝড়ের পূর্বে হঠাৎ ব্যারোমিটারের পারদ পতন, পর্বতারোহীদের শ্বাসকষ্ট ও নাক দিয়ে রক্তক্ষরণ, বিমানযাত্রীদের কেবিন প্রেসারাইজেশন।
- **Worked Problem:** সমুদ্রপৃষ্ঠে পারদ ব্যারোমিটারের পাঠ $76\text{ cm}$ এবং একটি পাহাড়ে পাঠ $65\text{ cm}$ হলে ওই পাহাড়ে বায়ুর চাপ কত হ্রাস পেয়েছে? ($\rho_{\text{Hg}} = 13600\text{ kg/m}^3, g = 9.8\text{ m/s}^2$)
- **Memory Aid:** "৭৬ সেমি পারদস্তম্ভে সমুদ্রের বায়ুচাপ, টরিসেলির নলে নামে ঝড়-বৃষ্টির মাপ; দ্রুত কমলে ব্যারোমিটার ডাকবে তবে ঝড়, উচ্চতায় উঠলে চাপ কমে যায় স্বত্বর!"
- **Self-Check:** ব্যারোমিটারে পারদের পরিবর্তে পানি ব্যবহার করলে কাচনলটির দৈর্ঘ্য কত হতে হতো?

### Section 5.5: স্থিতিস্থাপকতা ও হুকের সূত্র (Elasticity and Hooke’s Law)
- **Topics:** স্থিতিস্থাপকতার সংজ্ঞা, স্থিতিস্থাপক সীমা, অসহ বল ও পূর্ণ স্থিতিস্থাপক বস্তু, বিকৃতি ($\text{Strain} = \frac{\Delta L}{L}$, একক ও মাত্রাহীন), পীড়ন ($\text{Stress} = \frac{F}{A}$, একক $\text{Pa}$, মাত্রা $[ML^{-1}T^{-2}]$), হুকের সূত্র ($\text{Stress} \propto \text{Strain}$), ইয়ংয়ের গুণাঙ্ক ($Y = \frac{FL}{A\Delta L}$), স্প্রিং বল ও স্প্রিং ধ্রুবক ($F = kx$)।
- **Interactive Simulation Lab:**
  - *Hooke's Law Spring & Wire Stress-Strain Simulation Lab:*
  - Interactive sliders: বল বা ভর $F$ ($0-100\text{ N}$), স্প্রিং ধ্রুবক $k$ ($20-200\text{ N/m}$), তারের দৈর্ঘ্য $L$ ($1-5\text{ m}$), প্রস্থচ্ছেদের ব্যাসার্ধ $r$ ($0.5-2\text{ mm}$), উপাদান নির্বাচন (ইস্পাত $Y = 2\times 10^{11}\text{ Pa}$, তামা $Y = 1.1\times 10^{11}\text{ Pa}$, অ্যালুমিনিয়াম $Y = 7\times 10^{10}\text{ Pa}$)।
  - Visual dynamic SVG spring stretching and wire elongation, live graph/bar readout of Stress, Strain, and $\Delta L$.
- **Worked Problem:** $2\text{ m}$ দীর্ঘ এবং $1\text{ mm}^2$ প্রস্থচ্ছেদের ক্ষেত্রফলবিশিষ্ট একটি ইস্পাতের তারে $10\text{ kg}$ ভর ঝুলালে তারটির প্রসারণ কত হবে? ($Y = 2 \times 10^{11}\text{ Pa}, g = 9.8\text{ m/s}^2$)
- **Memory Aid:** "সীমার ভেতর পীড়ন বাড়ে বিকৃতির সাথে সাথে, হুকের সূত্রে $Y$ থাকে বিজ্ঞানীর হাতে; বল সরালে আগের রূপ স্থিতিস্থাপক ভাই, সীমার বাইরে গেলে তারে স্থায়ী টান পাই!"
- **Self-Check:** লোহা ও রবারের মধ্যে কোনটি বেশি স্থিতিস্থাপক এবং পদার্থবিজ্ঞানের সংজ্ঞানুযায়ী এর কারণ কী?

### Section 5.6: পদার্থের তিন অবস্থা, আণবিক গতিতত্ত্ব ও প্লাজমা (States of Matter, Molecular Kinetic Theory and Plasma)
- **Topics:**
  - পদার্থের ৩টি রূপ: কঠিন, তরল ও গ্যাস (আকৃতি, আয়তন, সংকোচনশীলতা ও আন্তঃআণবিক দূরত্বের তুলনা)।
  - আণবিক গতিতত্ত্ব (Kinetic Theory of Matter): কণার গঠন, অবিরাম বিশৃঙ্খল গতি, আন্তঃআণবিক আকর্ষণ বল, গতিশক্তি ও তাপমাত্রার সম্পর্ক ($E_k \propto T$)।
  - আণবিক গতিতত্ত্ব দিয়ে চাপের ব্যাখ্যা: পাত্রের দেয়ালে কণার অবিরাম স্থিতিস্থাপক সংঘর্ষ ও ভরবেগের পরিবর্তনজনিত বলের প্রভাব, তাপমাত্রা বৃদ্ধির সাথে চাপের বৃদ্ধি।
  - পদার্থের চতুর্থ অবস্থা: প্লাজমা (Plasma): আয়নিত গ্যাসীয় অবস্থা, ধনাত্মক আয়ন ও মুক্ত ইলেকট্রনের সহাবস্থান, তড়িৎ পরিবাহিতা, চৌম্বক ক্ষেত্রের প্রভাব, মহাবিশ্বে প্লাজমার উপস্থিতি (সূর্য, নক্ষত্র, বজ্রপাত, নিয়ন বাতি, ফিউশন রিঅ্যাক্টর)।
- **Comparative Table:** কঠিন, তরল, গ্যাস ও প্লাজমা অবস্থার তুলনামূলক বিশ্লেষণ।
- **Worked Problem:** স্থির আয়তনের একটি পাত্রে রাখা গ্যাসের তাপমাত্রা $27^\circ\text{C}$ ($300\text{ K}$) থেকে বৃদ্ধি করে $127^\circ\text{C}$ ($400\text{ K}$) করা হলে এর অভ্যন্তরীণ চাপের পরিবর্তন গাণিতিকভাবে ব্যাখ্যা করো ($P \propto T$)।
- **Memory Aid:** "কঠিনে বন্ধন দৃঢ়, তরলে শিথিল কায়া; গ্যাসে মুক্ত ছোটাছুটি, প্লাজমা হলো সূর্যের মায়া!"
- **Self-Check:** মহাবিশ্বের প্রায় ৯৯% পদার্থ প্লাজমা অবস্থায় থাকলেও আমাদের দৈনন্দিন পরিবেশে এটি সচরাচর দেখা যায় না কেন?

---

## 5. Chapter Hub: `drafts/physics-chapter-5/index.html`

- Responsive layout with custom Emerald/Teal hero palette (`#0f766e`, `#0d9488`, `#2dd4bf`).
- 4 Stat Boxes:
  1. **৬টি** গভীর বিষয়ভিত্তিক পাঠ
  2. **১৫+** গাণিতিক সমস্যা ও নিখুঁত সমাধান
  3. **২টি** লাইভ ইন্টারেক্টিভ সিমুলেশন ল্যাব
  4. **১০০%** এনসিটিবি ২০২৬ পাঠ্যক্রম মান
- 6 Structured Roadmap Cards with number pills, Bengali titles, English subtitles, descriptive bullet summaries, simulation badges for 5.3 & 5.5, and right chevron.
- Source Card linking to `chapter-source.html`.
- Clean semantic HTML matching `styles.css`.

---

## 6. Verification & Quality Gates

1. **File Integrity:** Inspect each generated HTML file to ensure all KaTeX scripts are present and uncorrupted.
2. **Interactive Simulation Verification:** Validate that JS logic and SVG graphics work seamlessly in Section 5.3 and Section 5.5 without console errors.
3. **Syntax & Link Validation:** Verify all inter-page links (`index.html` $\leftrightarrow$ `section-01.html` $\dots$ `section-06.html` $\leftrightarrow$ `chapter-source.html`) are functional.
4. **Typography & Styling:** Confirm compatibility with `styles.css` classes (`.hero`, `.badge`, `.grid`, `.term`, `.highlight-box`, `.worked`, `.problem`, `.solution`, `.note`, `.memory`, `.check`, `.lab`, `.nav`).
5. **Curriculum Completeness:** Ensure full coverage of the NCTB 2026 textbook topics for Chapter 5.
