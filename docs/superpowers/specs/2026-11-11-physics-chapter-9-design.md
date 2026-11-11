# Technical Design Specification: SSC Physics Chapter 9 (আলোর প্রতিসরণ / Refraction of Light) Full Elevation

- **Date:** 2026-11-11
- **Status:** Approved (User requested next chapter elevation)
- **Author:** Antigravity Engineering Agent
- **Target Files:**
  - Drafts: `drafts/physics-chapter-9/styles.css`, `drafts/physics-chapter-9/index.html`, `drafts/physics-chapter-9/section-01.html` through `section-04.html`
  - Simulations: `apps/api/prisma/sample-simulations/refraction-snell-tir-lab.html`, `apps/api/prisma/sample-simulations/lens-ray-optics-lab.html`
  - Backend Seeds: `apps/api/prisma/seed-chapter-9.ts`, `apps/api/prisma/seed-chapter-9-questions.ts`, `apps/api/prisma/seed-chapter-9-questions-batch2.ts`, `apps/api/prisma/seed-chapter-9-questions-batch3.ts`
  - Database Seed Root: `apps/api/prisma/seed.ts`
  - Frontend Curriculum: `apps/web/src/lib/curriculum-data.ts`

---

## 1. Intent & Context

Following the elevation completed for Chapters 1–8, Chapter 9 (*আলোর প্রতিসরণ / Refraction of Light*, 29 NCTB textbook pages) requires full upgrade across interactive study drafts, standalone physics simulators, Prisma curriculum seeds, board-style question banks, and frontend curriculum navigation.

Currently, `drafts/physics-chapter-9/` contains minified baseline HTML files (`index.html`, `section-01.html`–`section-04.html`) without KaTeX rendering or interactive labs, and `section-04.html` contains corrupted non-Bengali Sinhala characters (`ඎතික/ઙ?...`). Additionally, no Prisma seeds (`seed-chapter-9*.ts`) or `curriculum-data.ts` entries exist for Chapter 9.

---

## 2. Goals & Non-Goals

### 2.1 Goals
1. **Elevated Study Drafts (`drafts/physics-chapter-9/`):**
   - Preserve the sky/cyan refraction theme while upgrading `index.html` and `section-01.html`–`section-04.html` with KaTeX `0.16.8`, `.goal`, `.grid > .term`, `.highlight-box`, `.table-wrap`, `.worked > .problem + .solution`, `.note`, `.memory`, `details.check`, `.nav`, `.footer`, and inline SVG interactive labs in `section-01.html` (Snell's Law + TIR) and `section-03.html` (Thin Lens Ray Diagram).
   - Replace the corrupted text in `section-04.html` with accurate Bengali physics pedagogy solving NCTB creative question scenarios (`-2 D` myopia lens), sign conventions, and rapid identification of lenses.
2. **Standalone Simulation Laboratories (`apps/api/prisma/sample-simulations/`):**
   - **Lab 1 (`refraction-snell-tir-lab.html`):** Snell's law ($n_1 \sin i = n_2 \sin r$), optical media presets (Air, Water $1.33$, Crown Glass $1.50$, Diamond $2.42$, Optical Fiber core $1.62$), critical angle $\theta_c$, and live Total Internal Reflection transition when $n_1 > n_2$ and $i > \theta_c$.
   - **Lab 2 (`lens-ray-optics-lab.html`):** Convex/Concave thin lens ray diagram simulator ($f$, $u$, $h_o$, $P = 1/f$ in Dioptres), presets for all 6 convex lens cases + concave lens, virtual ray extensions, and safe $u = f$ infinity guard.
3. **Prisma Curriculum & 80-Question Bank:**
   - `seed-chapter-9.ts` upserting `chap_ssc_physics_ch9`, 4 topics (`top_ssc_physics_ch9_1..4`), and 4 lessons (`les_ssc_physics_ch9_1..4`), linked to the two standalone interactive labs.
   - 80 verified questions (68 MCQs + 12 `CQ_CREATIVE`) split across `seed-chapter-9-questions.ts`, `batch2.ts`, and `batch3.ts`.
4. **App Wiring:**
   - Register `seedChapter9` in `apps/api/prisma/seed.ts` and add `chap_ssc_physics_ch9` + `findTopicHierarchy` fallback in `apps/web/src/lib/curriculum-data.ts`.

### 2.2 Non-Goals
- Modifying Chapters 1–8 or altering `drafts/physics-chapter-9/chapter-source.html` and `drafts/physics-chapter-9/assets/`.

---

## 3. Curriculum Breakdown (Sections 9.1 – 9.4)

1. **৯.১ আলোর প্রতিসরণ ও স্নেলের সূত্র (`top_ssc_physics_ch9_1` / `section-01.html`):** প্রতিসরণের নিয়ম, আলোকীয় ঘনত্ব বনাম ভর-ঘনত্ব, পরম ও আপেক্ষিক প্রতিসরণাঙ্ক ($n = c/v$), স্নেলের সূত্র ($n_1 \sin i = n_2 \sin r$), সমান্তরাল কাচের ফলকে পার্শ্বীয় সরণ, আপাত ও প্রকৃত গভীরতা।
2. **৯.২ পূর্ণ অভ্যন্তরীণ প্রতিফলন ও সংকট কোণ (`top_ssc_physics_ch9_2` / `section-02.html`):** সংকট কোণ ($\sin \theta_c = n_2/n_1$), পূর্ণ অভ্যন্তরীণ প্রতিফলনের শর্তাবলি, হীরকের ঔজ্জ্বল্য, মরীচিকা, অপটিক্যাল ফাইবার ও এন্ডোস্কোপি।
3. **৯.৩ লেন্স, রশ্মিচিত্র ও ক্ষমতা (`top_ssc_physics_ch9_3` / `section-03.html`):** উত্তল ও অবতল লেন্স, আলোককেন্দ্র $O$, প্রধান ফোকাস $F$, ৩টি আদর্শ রশ্মি, উত্তল লেন্সের ৬ অবস্থান ও অবতল লেন্সের প্রতিবিম্ব, লেন্সের সমীকরণ, বিবর্ধন ও লেন্সের ক্ষমতা ($P = 1/f$, ডাইঅপ্টার)।
4. **৯.৪ চশমার প্রয়োগ ও গাণিতিক অনুশীলন (`top_ssc_physics_ch9_4` / `section-04.html`):** মায়োপিয়া ($-D$) ও হাইপারমেট্রোপিয়ার ($+D$) গাণিতিক সমস্যা (পাঠ্যবইয়ের শিউলির `-2 D` সমস্যা), স্পর্শ ছাড়াই লেন্স শনাক্তকরণ এবং অধ্যায়ের পূর্ণাঙ্গ ফর্মুলা ও বহুনির্বাচনি-সৃজনশীল প্রস্তুতি।
