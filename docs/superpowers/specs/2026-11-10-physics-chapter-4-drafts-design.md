# Technical Design Specification: SSC Physics Chapter 4 (কাজ, ক্ষমতা ও শক্তি / Work, Power and Energy) Drafts Enhancement

- **Date:** 2026-11-10
- **Status:** Proposed
- **Author:** Antigravity Engineering Agent
- **Target Files:** `drafts/physics-chapter-4/index.html`, `drafts/physics-chapter-4/section-01.html` through `section-08.html`

---

## 1. Intent & Context

The poRi platform maintains high-fidelity interactive HTML study drafts in `drafts/` for SSC Physics students following the NCTB 2026 curriculum.
- **Chapter 1** (*ভৌত রাশি ও পরিমাপ*), **Chapter 2** (*গতি*), and recently **Chapter 3** (*বল / Force*) feature comprehensive, beautifully styled, pedagogically rigorous HTML chapters with KaTeX mathematical formulas, clear typography, structured learning goals, terminology grids, highlight boxes, real-world analogies, mnemonics, worked numerical problems, interactive check questions, and embedded simulation labs.
- **Chapter 4** (*কাজ, ক্ষমতা ও শক্তি / Work, Power and Energy*) currently exists as a bare, minified draft (~2 KB per file) lacking KaTeX math formatting, deep explanations, structured pedagogical cards, mnemonics, and worked mathematical derivations.

The goal of this project is to enhance all 8 sections and the index hub of Chapter 4 to match the quality, pedagogical richness, and interactive simulation capabilities of Chapter 3.

---

## 2. Goals, Non-Goals & Anti-Goals

### 2.1 Goals
1. **Full Pedagogical Elevation:** Upgrade all 8 sections (`section-01.html` through `section-08.html`) with deep, clear Bengali explanations adhering to NCTB SSC Physics Chapter 4 curriculum.
2. **Mathematical Precision with KaTeX:** Integrate KaTeX CDN and auto-render configs across all sections for crystal-clear formulas ($W = Fs \cos\theta$, $E_k = \frac{1}{2}mv^2$, $E_p = mgh$, $E = mc^2$, $P = \frac{W}{t}$, $\eta = \frac{P_{\text{out}}}{P_{\text{in}}} \times 100\%$, etc.).
3. **Structured Content Pattern:** Every section strictly includes:
   - Breadcrumb & Topbar navigation (`অধ্যায় ৪ / ৪.x`)
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
4. **Interactive Simulation Labs:**
   - **Section 4.4:** Embedded *Conservation of Mechanical Energy Simulation Lab* with interactive height/velocity controls and real-time SVG bar charts ($E_k, E_p, E_{\text{total}}$).
   - **Section 4.8:** Embedded *Electric Motor & Pump Efficiency Simulation Lab* with real-time parameter tuning (water mass, height, time, input electric power) calculating output work, thermal losses, and percentage efficiency ($\eta$).
5. **Enhanced Chapter Hub (`index.html`):** Polish the index with an emerald/teal theme (`#0f766e`, `#0d9488`, `#2dd4bf`), 4 statistics cards, structured 8-card roadmap grid with English subtitles, and link to original scanned 29-page textbook source.

### 2.2 Non-Goals
- Updating backend Prisma database seed files or API endpoints (Approach 2 selected: Drafts + Visual Simulation Labs).
- Altering the original 29-page scanned textbook file (`chapter-source.html`).
- Modifying shared CSS variables in `styles.css` unless required for component fidelity.

### 2.3 Anti-Goals
- Shallow or truncated content (avoiding 1-paragraph summaries).
- English-only text or unparsed raw LaTeX strings.
- Inconsistent section navigation or broken relative links.

---

## 3. Approaches Considered

1. **Approach 1 (Core Pedagogical Elevation - Standard Chapter 3 Format):** Upgrade all 8 sections + `index.html` with KaTeX, learning goals, derivations, terminology grids, highlight boxes, worked examples, and self-checks, without interactive SVG labs.
2. **Approach 2 (Core Elevation + Interactive Visual Simulation Labs - Selected by User):** Full pedagogical elevation plus embedding interactive simulation labs in Section 4.4 (Mechanical Energy Conservation Lab) and Section 4.8 (Pump Efficiency Lab).
3. **Approach 3 (Drafts + Backend Prisma Seed & Question Bank):** Update drafts plus create backend database seeds and curriculum items.

**Selection Rationale:** The user specifically selected **Approach 2** to achieve the exact rich, interactive experience that made Chapter 3 stand out.

---

## 4. Detailed Section Curriculum Specifications

### Section 4.1: কাজ (Work)
- **Topics:** পদার্থবিজ্ঞানে কাজের বৈজ্ঞানিক সংজ্ঞা, বল ও সরণের গুণফল, বল ও সরণের মধ্যবর্তী কোণ ($W = Fs \cos\theta$), ধনাত্মক কাজ ($\theta = 0^\circ$ বা বলের দিকে সরণ), ঋণাত্মক কাজ ($\theta = 180^\circ$ বা বলের বিপরীত দিকে সরণ), শূন্য কাজ ($\theta = 90^\circ$ বা সরণ না হলে)। অভিকর্ষ বলের পক্ষে ও বিপক্ষে কাজ ($W = mgh$)।
- **Key Formulas:** $W = Fs \cos\theta$, $W = mgh$
- **Units & Dimensions:** একক জুল ($\text{J} = \text{N}\cdot\text{m} = \text{kg}\cdot\text{m}^2/\text{s}^2$), মাত্রা $[ML^2T^{-2}]$। ১ জুল কাজের সংজ্ঞা।
- **Real-Life Examples:** মাথায় বোঝা নিয়ে অনুভূমিক রাস্তায় হাঁটা (অভিকর্ষের কাজ শূন্য), খাড়া সিঁড়ি বেয়ে ছাদে ওঠা, ভারী দেয়াল ঠেলার নিষ্ফল প্রচেষ্টা।
- **Worked Problem:** $50\text{ kg}$ ভরের একজন ব্যক্তি $20\text{ cm}$ উঁচু ৩০টি সিঁড়ি ১০ সেকেন্ডে উঠলে তার সম্পন্ন কাজ কত? ($W = mgh = 50 \times 9.8 \times (30 \times 0.20) = 2940\text{ J}$)।
- **Memory Aid:** "বলের দিকে সরণ হলে ধনাত্মক কাজ জানি, বিপরীত হলে ঋণাত্মক, লম্বে শূন্য মানি!"

### Section 4.2: শক্তি ও শক্তির বিভিন্ন রূপ (Energy and Forms of Energy)
- **Topics:** শক্তির সংজ্ঞা (কাজ করার সামর্থ্য), কাজ ও শক্তির অবিচ্ছেদ্য সম্পর্ক ($W = \Delta E$), শক্তির একক ও মাত্রা (জুল ও $[ML^2T^{-2}]$), শক্তির প্রধান রূপসমূহ: যান্ত্রিক শক্তি, তাপ শক্তি, আলোক শক্তি, শব্দ শক্তি, বিদ্যুৎ শক্তি, রাসায়নিক শক্তি, নিউক্লীয় বা পারমাণবিক শক্তি, সৌর শক্তি।
- **Key Insight:** শক্তি সৃষ্টি বা ধ্বংস করা যায় না, কেবল রূপান্তর ঘটে। প্রাথমিক বা মূল শক্তির প্রধান উৎস হলো সূর্য।
- **Real-Life Examples:** খাদ্য থেকে পেশিশক্তি, ব্যাটারির রাসায়নিক শক্তি থেকে বৈদ্যুতিক বাতি প্রজ্বলন, উদ্ভিদের সালোকসংশ্লেষণে সৌরশক্তি রূপান্তর।
- **Worked Problem:** একটি যন্ত্র $2400\text{ J}$ কাজ সম্পন্ন করলে শক্তি স্থানান্তরের পরিমাণ এবং মাত্রা সমীকরণ বিশ্লেষণ।
- **Memory Aid:** "কাজের সামর্থ্যই শক্তি ভাই, কাজের আর শক্তির একক একই পাই!"

### Section 4.3: গতিশক্তি ও বিভবশক্তি (Kinetic and Potential Energy)
- **Topics:** যান্ত্রিক শক্তির দুটি মৌলিক রূপ: গতিশক্তি ($E_k$) এবং বিভবশক্তি ($E_p$)।
- **Mathematical Derivations:**
  - গতিশক্তি: $W = Fs = (ma)s = m \left(\frac{v^2 - u^2}{2}\right) \implies E_k = \frac{1}{2}mv^2$
  - ভরবেগ ও গতিশক্তির সম্পর্ক: $E_k = \frac{p^2}{2m}$
  - অভিকর্ষীয় বিভবশক্তি: $W = Fh = mgh \implies E_p = mgh$
  - স্থিতিস্থাপক বিভবশক্তি: $E_p = \frac{1}{2}kx^2$ (স্প্রিং ধ্রুবক $k$ ও সংকোচন/প্রসারণ $x$)।
- **Real-Life Examples:** চলন্ত ট্রেনের বিপুল গতিশক্তি, বাঁধের জমা পানির বিভবশক্তি, তীর ছোঁড়ার আগে ধনুকের ছিলা টানার স্থিতিস্থাপক বিভবশক্তি।
- **Worked Problem:** $1200\text{ kg}$ ভরের একটি গাড়ি $72\text{ km/h}$ ($20\text{ m/s}$) বেগে চললে তার গতিশক্তি কত? বেগ দ্বিগুণ করা হলে গতিশক্তি কত গুণ বৃদ্ধি পাবে? ($2.4 \times 10^5\text{ J}$, ৪ গুণ)।
- **Memory Aid:** "গতির কারণে গতিশক্তি $\frac{1}{2}mv^2$ তার নাম, উচ্চতায় উঠলে বিভবশক্তি $mgh$ তার কাম!"

### Section 4.4: শক্তির নিত্যতা ও রূপান্তর (Conservation and Transformation of Energy)
- **Topics:** শক্তির সংরক্ষণশীলতা বা নিত্যতা নীতি, যান্ত্রিক শক্তির নিত্যতা ($E = E_k + E_p = \text{constant}$)।
- **Mathematical Proof (Freely Falling Body):**
  - সর্বোচ্চ উচ্চতা $h$-এ: $v=0 \implies E_k = 0$, $E_p = mgh \implies E_A = mgh$
  - $x$ দূরত্ব নিচে নেমে আসার পর ($h-x$ উচ্চতায়): $v^2 = 2gx \implies E_k = mgx$, $E_p = mg(h-x) \implies E_B = mgh$
  - ভূমি স্পর্শ করার পূর্ব মুহূর্তে: $v^2 = 2gh \implies E_k = mgh$, $E_p = 0 \implies E_C = mgh$
  - সর্বত্র মোট শক্তি সংরক্ষিত।
- **Embedded Interactive Simulation Lab:**
  - *Conservation of Mechanical Energy Simulator*: Dynamic height & velocity sliders, real-time SVG bar chart rendering $E_p, E_k, E_{\text{total}}$, live falling object animation, and instant verification that $E_{\text{total}}$ remains strictly constant.
- **Worked Problem:** $3\text{ kg}$ ভরের একটি বস্তুকে $60\text{ m}$ উঁচু স্থান থেকে ফেলে দিলে ভূমি থেকে কত উচ্চতায় এর গতিশক্তি বিভবশক্তির দ্বিগুণ হবে? ($h' = 20\text{ m}$)।
- **Memory Aid:** "শক্তির সৃষ্টি নাই, ধ্বংসও নাই, রূপান্তরেই বিশ্ব চলে জানবে সবাই; নিচে নামলে বিভব কমে গতি পায় ঠাঁই, মোট যোগফল সর্বদাই সমান ভাই!"

### Section 4.5: শক্তির উৎস ও পরিবেশের ওপর প্রভাব (Energy Sources and Environmental Impact)
- **Topics:** অনবায়নযোগ্য শক্তি (কয়লা, খনিজ তেল, প্রাকৃতিক গ্যাস, ইউরেনিয়াম) বনাম নবায়নযোগ্য শক্তি (জলবিদ্যুৎ, সৌরশক্তি, বায়ুশক্তি, বায়োমাস, ভূতাপীয় শক্তি, সামুদ্রিক শক্তি)।
- **Environmental Impact:** জীবাশ্ম জ্বালানি পোড়ানো ও গ্রিনহাউস গ্যাস ($CO_2, CH_4$), বৈশ্বিক উষ্ণায়ন ও জলবায়ু পরিবর্তন, এসিড বৃষ্টি ($SO_2, NO_x$), পারমাণবিক বর্জ্যের ঝুঁকি, টেকসই উন্নয়ন ও সবুজ প্রযুক্তি।
- **Real-Life Examples:** কাপ্তাই জলবিদ্যুৎ কেন্দ্র, রুফটপ সোলার প্যানেল, বায়ুকল (Wind Turbine)।
- **Worked Problem:** একটি তাপবিদ্যুৎ কেন্দ্র প্রতিদিন ৫০০ টন কয়লা পুড়িয়ে কত জুল শক্তি পায় এবং শক্তির রূপান্তর দক্ষতা আলোচনা।
- **Memory Aid:** "কয়লা-তেল-গ্যাস একদিন ফুরাবে নিশ্চয়, সূর্য-বাতাস-জলে বিশ্ব রবে অপচয়হীন অক্ষয়!"

### Section 4.6: ভর ও শক্তির সম্পর্ক (Mass–Energy Equivalence)
- **Topics:** আইনস্টাইনের ভর-শক্তি সমতা সূত্র ($E = mc^2$), আলোর দ্রুতি $c \approx 3 \times 10^8\text{ m/s}$।
- **Nuclear Phenomena:** ভর ত্রুটি ($\Delta m$), নিউক্লীয় ফিশন (ভারী নিউক্লিয়াস ভেঙে হালকা হওয়া যেমন ইউরেনিয়াম-২৩৫), নিউক্লীয় ফিউশন (হালকা নিউক্লিয়াস একত্রিত হওয়া যেমন সূর্যের হাইড্রোজেন থেকে হিলিয়াম)।
- **Significance:** $1\text{ kg}$ ভর সম্পূর্ণ শক্তিতে রূপান্তরিত হলে $9 \times 10^{16}\text{ J}$ শক্তি নির্গত হয়, যা লক্ষ লক্ষ টন কয়লার চেয়েও শক্তিশালী। রূপপুর পারমাণবিক বিদ্যুৎ কেন্দ্রের বৈজ্ঞানিক ভিত্তি।
- **Worked Problem:** $1\text{ g} = 10^{-3}\text{ kg}$ ভর সম্পূর্ণ শক্তিতে রূপান্তরিত হলে কত জুল শক্তি নির্গত হবে? ($9 \times 10^{13}\text{ J}$)।
- **Memory Aid:** "$E = mc^2$ আলোর বেগে ভরের রূপান্তর, ক্ষুদ্র এক কণিকায় লুকিয়ে অগাধ শক্তির অন্তর!"

### Section 4.7: ক্ষমতা (Power)
- **Topics:** ক্ষমতার বৈজ্ঞানিক সংজ্ঞা ($P = \frac{W}{t} = \frac{\Delta E}{t}$), বল ও সুষম বেগের সাথে সম্পর্ক ($P = \vec{F} \cdot \vec{v}$)।
- **Units & Dimensions:** ওয়াট ($\text{W} = \text{J/s}$), কিলোওয়াট ($\text{kW}$), মেগাওয়াট ($\text{MW}$), অশ্বক্ষমতা ($1\text{ HP} = 746\text{ W}$), মাত্রা $[ML^2T^{-3}]$।
- **Electrical Energy Units:** কিলোওয়াট-ঘণ্টা ($\text{kWh}$ / Unit), $1\text{ kWh} = 3.6 \times 10^6\text{ J}$। বিদ্যুৎ বিলের সাধারণ হিসাব।
- **Worked Problem:** একটি বৈদ্যুতিক পাম্প প্রতি মিনিটে $1500\text{ kg}$ পানি $20\text{ m}$ উঁচুতে তুলতে পারে। পাম্পটির কার্যকর ক্ষমতা কত কিলোওয়াট ও কত অশ্বক্ষমতা (HP)? ($P = \frac{mgh}{t} = \frac{1500 \times 9.8 \times 20}{60} = 4900\text{ W} = 4.9\text{ kW} \approx 6.57\text{ HP}$)।
- **Memory Aid:** "সময়ের অনুপাতে কাজের হার ক্ষমতা ভাই, ওয়াট এককে শক্তির প্রবাহের হিসাব পাই!"

### Section 4.8: কর্মদক্ষতা (Efficiency)
- **Topics:** কর্মদক্ষতার বৈজ্ঞানিক সংজ্ঞা, লভ্য কার্যকর শক্তি/ক্ষমতা ও মোট প্রদত্ত শক্তি/ক্ষমতার শতকরা অনুপাত ($\eta = \frac{E_{\text{out}}}{E_{\text{in}}} \times 100\% = \frac{P_{\text{out}}}{P_{\text{in}}} \times 100\%$), শক্তির অপচয় (Loss = Input - Output), ইঞ্জিন বা মোটরের কর্মদক্ষতা কেন ১০০% হতে পারে না (ঘর্ষণ, তাপীয় অপচয়, শব্দ)।
- **Embedded Interactive Simulation Lab:**
  - *Electric Motor & Pump Efficiency Lab*: Interactive inputs for Input Electrical Power ($P_{\text{in}}$ in kW/HP), Water Mass ($m$), Height ($h$), and Time ($t$). Real-time visual calculations of Output Power ($P_{\text{out}}$), Power Loss ($P_{\text{loss}}$), and an animated circular gauge displaying Efficiency ($\eta\%$) with dynamic efficiency status (Excellent, Average, Poor).
- **Worked Problem:** একটি $3\text{ kW}$ বৈদ্যুতিক মোটরের কর্মদক্ষতা $70\%$। মোটরটি দিয়ে $10\text{ m}$ উচ্চতায় ৫ মিনিটে কত লিটার পানি তোলা সম্ভব? ($m \approx 6428.57\text{ kg} \approx 6429\text{ L}$)।
- **Memory Aid:** "যা দিলে আর যা পেলে তার শতকরার ফল, কর্মদক্ষতা বলে ভাই ইঞ্জিনের আসল বল!"

### Chapter Hub: `index.html`
- Responsive layout with Emerald/Teal energy hero palette (`#0f766e`, `#0d9488`, `#2dd4bf`).
- 4 Stat Boxes:
  1. **৮টি** বিষয়ভিত্তিক পূর্ণাঙ্গ পাঠ
  2. **২টি** লাইভ ইন্টারঅ্যাক্টিভ সিমুলেশন ল্যাব
  3. **২৫+** গাণিতিক সমাধান ও উদাহরণ
  4. **১০০%** এনসিটিবি ২০২৬ পাঠ্যক্রম
- 8 Structured Roadmap Cards with number pills, Bengali titles, English subtitles, rich descriptive bullet summaries, and right chevron.
- Source Card linking to `chapter-source.html`.
- Clean semantic HTML matching `styles.css`.

---

## 5. Verification Plan

1. **File Integrity:** Inspect each generated HTML file to ensure all KaTeX scripts and simulation JS are present and uncorrupted.
2. **Syntax & Link Validation:** Verify all inter-page links (`index.html` $\leftrightarrow$ `section-01.html` $\dots$ `section-08.html` $\leftrightarrow$ `chapter-source.html`) are functional.
3. **Typography & Styling:** Confirm compatibility with `styles.css` classes (`.hero`, `.badge`, `.grid`, `.term`, `.highlight-box`, `.worked`, `.problem`, `.solution`, `.note`, `.memory`, `.check`, `.nav`).
4. **Interactive Simulations Verification:** Ensure SVG rendering, sliders, calculation logic, and responsive layouts function without console errors.
5. **Content Richness & Completeness:** Verify that each section contains comprehensive theory, math formulas, worked examples, mnemonics, and interactive checks.
