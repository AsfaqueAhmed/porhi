# Technical Design Specification: SSC Physics Chapter 3 (বল / Force) Drafts Enhancement

- **Date:** 2026-11-10
- **Status:** Proposed
- **Author:** Antigravity Engineering Agent
- **Target Files:** `drafts/physics-chapter-3/index.html`, `drafts/physics-chapter-3/section-01.html` through `section-10.html`

---

## 1. Intent & Context

The poRi platform maintains high-fidelity interactive HTML study drafts in `drafts/` for SSC Physics students following the NCTB 2026 curriculum.
- **Chapter 1** (*ভৌত রাশি ও পরিমাপ*) and **Chapter 2** (*গতি*) feature comprehensive, beautifully styled, pedagogically rigorous HTML chapters with KaTeX mathematical formulas, clear typography, structured learning goals, terminology grids, highlight boxes, real-world analogies, mnemonics, worked numerical problems, and interactive check questions.
- **Chapter 3** (*বল / Force*) currently exists as a bare, minified draft lacking KaTeX math formatting, deep explanations, structured pedagogical cards, mnemonics, and worked mathematical derivations.

The goal of this project is to enhance all 10 sections and the index hub of Chapter 3 to match the quality, pedagogical richness, and design consistency of Chapters 1 and 2.

---

## 2. Goals, Non-Goals & Anti-Goals

### 2.1 Goals
1. **Full Pedagogical Elevation:** Upgrade all 10 sections (`section-01.html` through `section-10.html`) with deep, clear Bengali explanations adhering to NCTB SSC Physics Chapter 3 curriculum.
2. **Mathematical Precision with KaTeX:** Integrate KaTeX CDN and auto-render configs across all sections for crystal-clear formulas ($F = ma$, $p = mv$, $m_1 u_1 + m_2 u_2 = m_1 v_1 + m_2 v_2$, $f_k = \mu_k R$, $J = F\Delta t$, etc.).
3. **Structured Content Pattern:** Every section strictly includes:
   - Breadcrumb & Topbar navigation (`অধ্যায় ৩ / ৩.x`)
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
4. **Enhanced Chapter Hub (`index.html`):** Polish the index with an emerald/teal hero theme (`#0f766e`), 3-4 statistics cards, structured 10-card roadmap grid with English subtitles, and link to original scanned textbook source.

### 2.2 Non-Goals
- Updating backend Prisma database seed files or API endpoints (Approach B selected: Drafts Only).
- Altering the original 36-page scanned textbook file (`chapter-source.html`).
- Modifying shared CSS variables in `styles.css` unless required for component fidelity.

### 2.3 Anti-Goals
- Shallow or truncated content (avoiding 1-paragraph summaries).
- English-only text or unparsed raw LaTeX strings.
- Inconsistent section navigation or broken relative links.

---

## 3. Approaches Considered

1. **Approach A (Drafts + Backend Seeds + Frontend Curriculum):** Update HTML drafts, create Prisma `seed-chapter-3.ts` and two batches of questions (~56 questions), and wire into `curriculum-data.ts`.
2. **Approach B (Drafts Only - Selected by User):** Focus exclusively on crafting and perfecting all 10 section HTML drafts and `index.html` in `drafts/physics-chapter-3/`.
3. **Approach C (Database Seeds Only):** Update backend database seeds while leaving static drafts as-is.

**Selection Rationale:** The user specifically selected **Approach B** to dedicate full focus on enhancing the HTML draft content and learning experience.

---

## 4. Detailed Section Curriculum Specifications

### Section 3.1: জড়তা ও বলের ধারণা (Inertia and the Concept of Force)
- **Topics:** জড়তা (স্থিতিজড়তা ও গতিজড়তা), বলের সংজ্ঞা ও বৈশিষ্ট্য, নিউটনের প্রথম গতিসূত্র, বলের একক (Newton) ও মাত্রা ($[MLT^{-2}]$), ভর জড়তার পরিমাপক।
- **Key Formulas:** $\sum \vec{F} = 0 \implies \vec{v} = \text{constant}$
- **Real-Life Examples:** বাস হঠাৎ চললে যাত্রীদের পেছনে হেলে পড়া, চলন্ত বাস হঠাৎ থামলে সামনে ঝুঁকে পড়া, গাছের ডাল নাড়ালে আম বা পাতা নিচে খসে পড়া, চলন্ত গাড়ি থেকে নামার কৌশল।
- **Worked Example:** একটি ১০ কেজি ওজনের স্থির ব্লকের ওপর বলের সাম্যাবস্থা বিশ্লেষণ।
- **Memory Aid:** "স্থিতির মায়ায় শরীর পিছু হটে, গতির টানে সামনে আছাড় ঘটে!"

### Section 3.2: মৌলিক বলের প্রকৃতি (Fundamental Forces)
- **Topics:** প্রকৃতির চারটি মৌলিক বল—মহাকর্ষ বল (Gravitational Force), তাড়িতচৌম্বক বল (Electromagnetic Force), দুর্বল নিউক্লীয় বল (Weak Nuclear Force), সবল নিউক্লীয় বল (Strong Nuclear Force)।
- **Comparative Table:** নাম, আপেক্ষিক তীব্রতা ($1, 10^{36}, 10^{25}, 10^{38}$), পাল্লা (অসীম বনাম $10^{-18}\text{ m}$ ও $10^{-15}\text{ m}$), বিনিময় কণা (গ্র্যাভিটন, ফোটন, $W^\pm, Z^0$ বোসন, গ্লুয়ন)।
- **Key Insight:** স্পর্শ বল (ঘর্ষণ, স্প্রিং বল, সাধারণ প্রতিক্রিয়া) মূলত পরমাণুর মধ্যকার তাড়িতচৌম্বক বলের বহিঃপ্রকাশ।
- **Worked Problem:** সূর্য ও পৃথিবীর মধ্যে মহাকর্ষীয় বল এবং প্রোটন-ইলেকট্রনের মধ্যকার বলের তীব্রতার অনুপাত তুলনা।
- **Memory Aid:** "মহা-দুর্বল-তাড়িত-সবল: দূরত্বের বাউন্ডারি ও শক্তির খেলা!"

### Section 3.3: সাম্য ও অসাম্য বল (Balanced and Unbalanced Forces)
- **Topics:** লব্ধি বল (Resultant Force), সাম্য বল (Balanced Forces, $\sum F = 0$), অসাম্য বল (Unbalanced Forces, $\sum F \neq 0$), জড়তার সাথে সম্পর্ক।
- **Real-Life Examples:** রশি টানাটানি খেলা (Tug-of-war), দেয়ালে ঝুলানো দেয়ালঘড়ি, উড়ন্ত বিমানের ওপর চারটি বল (Lift, Weight, Thrust, Drag) এর সাম্যাবস্থা।
- **Worked Problem:** একটি ব্লকের ওপর বিপরীত দিকে $35\text{ N}$ এবং $20\text{ N}$ বল এবং সমকোণে $12\text{ N}$ বল প্রযুক্ত হলে লব্ধি বল ও গতির দিক নির্ণয়।
- **Memory Aid:** "লব্ধি যদি শূন্য হয়, গতির কোনো রূপান্তর নয়; অসাম্য বল এলে ভাই, ত্বরণ ছাড়া গতি নাই!"

### Section 3.4: বেগের ওপর বলের প্রভাব (How Force Changes Velocity)
- **Topics:** বলের প্রয়োগে বেগের মানের পরিবর্তন (ত্বরণ/মন্দন), বেগের দিকের পরিবর্তন (বৃত্তাকার গতি ও কেন্দ্রমুখী বল $F_c = \frac{mv^2}{r}$), ত্বরণ ও বলের দিক সম্পর্ক।
- **Real-Life Examples:** ক্রিকেট বলে ব্যাটের আঘাত, সুতায় বাঁধা পাথর ঘোরানো, উপগ্রহের কক্ষপথ পরিক্রমণ।
- **Worked Problem:** $0.5\text{ kg}$ ভরের পাথরকে $2\text{ m}$ দীর্ঘ সুতায় বেঁধে $4\text{ m/s}$ সমদ্রুতিতে ঘুরালে সুতার টান নির্ণয়।
- **Memory Aid:** "গতির দিকে দিলে বল বাড়বে গতি অবিচল; লম্বভাবে দিলে বল দিক বদলাবে অবিরল!"

### Section 3.5: নিউটনের দ্বিতীয় সূত্র ও বল পরিমাপ (Newton’s Second Law)
- **Topics:** ভরবেগ ($p = mv$), ভরবেগের পরিবর্তনের হার, নিউটনের দ্বিতীয় সূত্রের গাণিতিক প্রতিপাদন ($F = ma$), $1\text{ N}$ এর সংজ্ঞা, বলের ঘাত ও ভরবেগের পরিবর্তন ($J = F \Delta t = \Delta p$)।
- **Derivation:** $F \propto \frac{mv - mu}{t} \implies F = k \cdot m\left(\frac{v-u}{t}\right) \implies F = ma$ (SI এককে $k=1$)।
- **Real-Life Examples:** ক্যাচ ধরার সময় ফিল্ডারের হাত পেছনে টানা (সময় $\Delta t$ বাড়িয়ে আঘাতের বল $F$ কমানো), ফুটবল কিক করা।
- **Worked Problem:** $1200\text{ kg}$ ভরের একটি গাড়ি $72\text{ km/h}$ বেগে চলার সময় ব্রেক চেপে $5\text{ s}$-এ থামানো হলো। প্রযুক্ত মন্দনকারী বল নির্ণয়।
- **Memory Aid:** "$F = ma$ নিউটনের প্রাণ, ভরবেগের হারে মেলে বলের প্রমাণ!"

### Section 3.6: ক্রিয়া-প্রতিক্রিয়া: নিউটনের তৃতীয় সূত্র (Action and Reaction)
- **Topics:** নিউটনের তৃতীয় সূত্র ($\vec{F}_{AB} = -\vec{F}_{BA}$), ক্রিয়া ও প্রতিক্রিয়া কখনোই একই বস্তুর ওপর প্রযুক্ত হয় না (তাই এরা পরস্পরকে বাতিল বা নিঃশেষ করে না), হাঁটা, সাঁতার কাটা, নৌকা থেকে লাফ দেওয়া, রকেট উৎক্ষেপণ।
- **Real-Life Examples:** মাটিতে হাঁটার সময় পেছনের দিকে মাটিতে ধাক্কা দেওয়া ও মাটির প্রতিক্রিয়া বল, বন্দুক থেকে গুলি ছুড়লে বন্দুকের পশ্চাৎবেগ ($V = -\frac{m}{M}v$)।
- **Worked Problem:** $5\text{ kg}$ ভরের একটি বন্দুক থেকে $10\text{ g}$ ভরের একটি গুলি $400\text{ m/s}$ বেগে বের হলে বন্দুকটির পশ্চাৎ বেগ কত হবে?
- **Memory Aid:** "যেমন কর্ম তেমন ফল, সমান ও বিপরীত প্রতিক্রিয়া বল; কিন্তু মনে রেখো ভিন্ন দুই কায়ায়, কখনো যেন এক ভাবা না যায়!"

### Section 3.7: নিরাপদ ভ্রমণে বল ও গতি (Forces in Safe Travel)
- **Topics:** যানবাহনের গতি ও জড়তা, থামার দূরত্ব (Stopping Distance = Reaction Distance + Braking Distance), সিটবেল্ট ও এয়ারব্যাগের কার্যপদ্ধতি (Impact time বৃদ্ধি ও বল হ্রাস), টায়ারের ঘর্ষণ ও গ্রিপ, গাড়ির গতি বৃদ্ধির সাথে গতিশক্তি বৃদ্ধির সম্পর্ক ($E_k \propto v^2$)।
- **Safety Calculations:** বেগ দ্বিগুণ হলে ব্রেকিং দূরত্ব ৪ গুণ বৃদ্ধি পায়!
- **Real-Life Examples:** সিটবেল্ট না বাঁধলে উইন্ডশিল্ডে ধাক্কা খাওয়ার কারণ, ভেজা রাস্তায় স্কিড করার পদার্থবিজ্ঞান।
- **Worked Problem:** একজন চালকের প্রতিক্রিয়া সময় $0.7\text{ s}$ এবং ব্রেকিং মন্দন $5\text{ m/s}^2$ হলে $54\text{ km/h}$ বেগে চলা গাড়ির মোট থামার দূরত্ব কত?
- **Memory Aid:** "বেগ বাড়ে যদি দ্বিগুণ হারে, ব্রেকিং দূরত্ব চারগুণ বাড়ে; সিটবেল্টে ভরসা রাখো, নিরাপদ গতিতে বাঁচো!"

### Section 3.8: ভরবেগ সংরক্ষণ ও সংঘর্ষ (Conservation of Momentum and Collisions)
- **Topics:** রৈখিক ভরবেগের সংরক্ষণ সূত্র ($m_1 u_1 + m_2 u_2 = m_1 v_1 + m_2 v_2$), বহিস্থ লব্ধি বলের অনুপস্থিতিতে ভরবেগের নিত্যতা, স্থিতিস্থাপক (Elastic) ও অস্থিতিস্থাপক (Inelastic) সংঘর্ষ, মিলিত বেগ ($V = \frac{m_1 u_1 + m_2 u_2}{m_1 + m_2}$)।
- **Real-Life Examples:** বিলিয়ার্ড বলের সংঘর্ষ, দুটি ট্রেনের বা গাড়ির মুখোমুখি সংঘর্ষ ও মিলিত হয়ে চলা, রকেট প্রপালশন।
- **Worked Problem:** $800\text{ kg}$ ভরের একটি গাড়ি $20\text{ m/s}$ বেগে গিয়ে একটি স্থির $1200\text{ kg}$ ভরের পিকআপ ভ্যানকে ধাক্কা দিয়ে আটকে একসাথে চলতে লাগল। মিলিত বেগ কত?
- **Memory Aid:** "বাইরে থেকে না এলে বল, সংরক্ষিত ভরবেগের ফল; শুরুর যোগ আর শেষের যোগ, সমান রবে নেই বিয়োগ!"

### Section 3.9: ঘর্ষণ বলের ধরন ও বৈশিষ্ট্য (Types and Nature of Friction)
- **Topics:** ঘর্ষণ বলের সংজ্ঞা, আণুবীক্ষণিক কারণ (তলগুলোর খাঁজ ও কোল্ড ওয়েল্ডিং), চারটি প্রকারভেদ: স্থিতি ঘর্ষণ ($f_s$), গতীয় বা পিছলানো ঘর্ষণ ($f_k$), আবর্ত বা গড়ানো ঘর্ষণ ($f_r$), প্রবাহী ঘর্ষণ ($f_f$), ঘর্ষণ গুণাঙ্ক ($\mu$) ও অভিলম্ব প্রতিক্রিয়া ($R = mg$)।
- **Comparative Intensity:** $f_s > f_k > f_r$ (গড়ানো ঘর্ষণ পিছলানো ঘর্ষণের তুলনায় বহু গুণ কম—চাকা আবিষ্কারের রহস্য!)।
- **Worked Problem:** $20\text{ kg}$ ভরের একটি কাঠের বাক্স মেঝের ওপর স্থির আছে। স্থিতি ঘর্ষণ গুণাঙ্ক $\mu_s = 0.4$ এবং গতীয় ঘর্ষণ গুণাঙ্ক $\mu_k = 0.3$ হলে বাক্সটিকে গতিশীল করতে প্রয়োজনীয় নূন্যতম বল এবং গতিশীল রাখার বল কত?
- **Memory Aid:** "স্থিতি বড়, পিছলানো মাঝারি, চাকার আবর্তে ঘর্ষণ পারি!"

### Section 3.10: ঘর্ষণ, গতি ও ব্যবহার (Friction: Effects and Uses)
- **Topics:** ঘর্ষণ একটি প্রয়োজনীয় উপদ্রব (Friction is a necessary evil), ঘর্ষণের উপযোগিতা (হাঁটা, লেখা, চাকার ঘূর্ণন, ব্রেক করা), অপকারিতা (তাপ উৎপন্ন হওয়া, যন্ত্রাংশের ক্ষয়, জ্বালানির অপচয়), ঘর্ষণ কমানোর উপায় (পিচ্ছিলকারক তেল/গ্রিজ, বল বিয়ারিং, স্ট্রিমলাইনিং), ঘর্ষণ বাড়ানোর উপায় (টায়ারে খাঁজকাটা, জুতার তলায় গ্রিপ, ব্রেক প্যাড)।
- **Real-Life Examples:** গাড়ির অ্যারোডাইনামিক বডি ডিজাইন, সাইকেলের বল-বিয়ারিং, শীতকালে হাত ঘষে গরম করা।
- **Worked Problem:** যন্ত্রাংশে ঘর্ষণের কারণে মোট প্রদত্ত $500\text{ J}$ শক্তির $75\text{ J}$ তাপে রূপান্তরিত হলে কর্মদক্ষতা ($\eta$) নির্ণয়।
- **Memory Aid:** "না থাকলে ঘর্ষণ পেতাম না গতি, বেশি হলে ঘর্ষণ শক্তির ক্ষতি; তেল আর বিয়ারিংয়ে করো সমাধান, নিয়ন্ত্রণে ঘর্ষণ আনে আরাম!"

### Chapter Hub: `index.html`
- Responsive layout with custom Emerald/Teal hero palette (`#0f766e`, `#0d9488`, `#2dd4bf`).
- 4 Stat Boxes:
  1. **১০টি** বিষয়ভিত্তিক পাঠ
  2. **২০+** গাণিতিক সমাধান ও উদাহরণ
  3. **৪টি** মৌলিক বল ও নিউটনের ৩টি সূত্র
  4. **১০০%** এনসিটিবি ২০২৬ পাঠ্যক্রম
- 10 Structured Roadmap Cards with number pills, Bengali titles, English subtitles, descriptive bullet summaries, and right chevron.
- Source Card linking to `chapter-source.html`.
- Clean semantic HTML matching `styles.css`.

---

## 5. Verification Plan

1. **File Integrity:** Inspect each generated HTML file to ensure all KaTeX scripts are present and uncorrupted.
2. **Syntax & Link Validation:** Verify all inter-page links (`index.html` $\leftrightarrow$ `section-01.html` $\dots$ `section-10.html` $\leftrightarrow$ `chapter-source.html`) are functional.
3. **Typography & Styling:** Confirm compatibility with `styles.css` classes (`.hero`, `.badge`, `.grid`, `.term`, `.highlight-box`, `.worked`, `.problem`, `.solution`, `.note`, `.memory`, `.check`, `.nav`).
4. **Content Richness & Completeness:** Verify that each section contains comprehensive theory, math formulas, worked examples, and interactive checks.
