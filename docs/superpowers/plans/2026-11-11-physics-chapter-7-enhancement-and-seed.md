# SSC Physics Chapter 7 (তরঙ্গ ও শব্দ) Enhancement & Database Upload Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enhance the 3 Chapter 7 lessons (`7.1`, `7.2`, `7.3`) and 80-question MCQ/CQ bank to full pedagogical depth, verify draft/web alignment, and upload (seed) Chapter 7 into PostgreSQL.

**Architecture:** Chapter 7 keeps its 3-topic structure (`top_ssc_physics_ch7_1`, `top_ssc_physics_ch7_2`, `top_ssc_physics_ch7_3`), matching the 3 HTML draft sections (`section-01.html`–`section-03.html`) and 3 interactive simulation labs (`shm-pendulum-lab.html`, `sound-wave-simulator.html`, `echo-sound-speed-lab.html`). We upgrade the backend lesson seeds in `seed-chapter-7.ts` to carry the full markdown + KaTeX explanations, comparison tables, terms, and worked examples from the drafts, bring the question bank in `seed-chapter-7-questions*.ts` to an even 80 verified questions (68 MCQs + 12 CQs), and execute the Prisma seed against PostgreSQL.

**Architecture Diagram:**
```mermaid
graph TD
    subgraph "Drafts & Interactive Labs"
        D1[drafts/physics-chapter-7/section-01..03.html]
        L1[shm-pendulum-lab.html]
        L2[sound-wave-simulator.html]
        L3[echo-sound-speed-lab.html]
    end
    subgraph "Backend Seeds & PostgreSQL"
        SC7[apps/api/prisma/seed-chapter-7.ts] --> DB[(PostgreSQL: chap_ssc_physics_ch7)]
        QB[seed-chapter-7-questions*.ts: 68 MCQ + 12 CQ] --> SC7
        SEED[apps/api/prisma/seed.ts] --> SC7
        L1 -.-> SC7
        L2 -.-> SC7
        L3 -.-> SC7
    end
    subgraph "Web Metadata"
        CD[apps/web/src/lib/curriculum-data.ts] --> T[3 Topics: 7.1, 7.2, 7.3]
    end
```

**Tech Stack:** TypeScript, Prisma ORM, PostgreSQL, KaTeX, HTML5/SVG, Next.js (`@pori/web`), NestJS (`@pori/api`).

**Spec:** [2026-11-11-physics-chapter-7-design.md](file:///Users/technonext/Desktop/poRi/docs/superpowers/specs/2026-11-11-physics-chapter-7-design.md)

## Global Constraints
- Keep the exact 3-topic structure (`top_ssc_physics_ch7_1`, `top_ssc_physics_ch7_2`, `top_ssc_physics_ch7_3`) as confirmed by the user.
- Preserve `drafts/physics-chapter-7/chapter-source.html` and all Chapters 1–6 and 8–12 files untouched.
- Every MCQ must have exactly 4 options with 1 `isCorrect: true`, `distractorAnalysis`, and balanced `$` / `$$` KaTeX delimiters; every `CQ_CREATIVE` must include a 4-part `cqRubric` (`ka`, `kha`, `ga`, `gha`).
- Interactive widget URLs must match the existing files in `apps/api/uploads/interactive/` (`/uploads/interactive/shm-pendulum-lab.html`, `/uploads/interactive/sound-wave-simulator.html`, `/uploads/interactive/echo-sound-speed-lab.html`).

## Review Focus
- Unbalanced `$` or `$$` delimiters or unescaped LaTeX backslashes (`\\frac`, `\\pi`, `\\text`, `\\lambda`) inside TypeScript template literals in `seed-chapter-7.ts` and `seed-chapter-7-questions*.ts`.
- Raw `$x=0$` inside SVG `<text>` in `drafts/physics-chapter-7/section-01.html` where KaTeX `auto-render` does not render inside SVG elements.
- Question bank invariants: unique IDs across all 80 questions (68 MCQs + 12 CQs) and valid `topicId` foreign keys matching `top_ssc_physics_ch7_1..3`.
- PostgreSQL persistence: verify `chap_ssc_physics_ch7` actually exists in the live database after running the seed (3 topics, 3 `PUBLISHED` lessons, 68 `MCQ`, 12 `CQ_CREATIVE`).
- TypeScript type safety across both `@pori/api` and `@pori/web`.

---

### Task 1: Fix Draft SVG Label & Enrich `seed-chapter-7.ts` Lesson Content

**Files:**
- Modify: `/Users/technonext/Desktop/poRi/drafts/physics-chapter-7/section-01.html:140-146`
- Modify: `/Users/technonext/Desktop/poRi/apps/api/prisma/seed-chapter-7.ts:73-247`

**Interfaces:**
- Consumes: `chapter7Questions` from `./seed-chapter-7-questions`
- Produces: `seedChapter7(prisma: PrismaClient): Promise<void>` upserting `chap_ssc_physics_ch7`, `top_ssc_physics_ch7_1..3`, `les_ssc_physics_ch7_1..3`, and all Chapter 7 questions.

- [ ] **Step 1: Fix raw KaTeX delimiter in SVG text inside `section-01.html`**

```diff
-            <text x="24" y="34" font-size="13" fill="#475569" font-weight="700">সাম্যাবস্থা ($x=0$)</text>
+            <text x="24" y="34" font-size="13" fill="#475569" font-weight="700">সাম্যাবস্থা (x = 0)</text>
```

- [ ] **Step 2: Expand Lesson 7.1 (`les_ssc_physics_ch7_1`) in `apps/api/prisma/seed-chapter-7.ts`**
Expand `explanation`, `importantTerms` (add `পূর্ণ স্পন্দন` and `দশা`), and `workedExample` (include multi-part pendulum + spring calculation) using full markdown + KaTeX from `section-01.html` (periodic vs oscillatory vs SHM, $F = -kx$, $a \propto -x$, equilibrium vs extreme points, spring-mass $T = 2\pi\sqrt{m/k}$, simple pendulum $T = 2\pi\sqrt{\ell/g}$, mass independence, second pendulum, hill/summer clock behavior).

- [ ] **Step 3: Expand Lesson 7.2 (`les_ssc_physics_ch7_2`) in `apps/api/prisma/seed-chapter-7.ts`**
Expand `explanation` with subsections `৭.২.১` (wave characteristics, mechanical vs EM waves, $I \propto A^2$), `৭.২.২` (markdown comparison table for অনুপ্রস্থ vs অনুদৈর্ঘ্য তরঙ্গ), and `৭.২.৩` (derivation of $v = f\lambda = \lambda/T$ and medium-change frequency invariance $\frac{v_1}{v_2} = \frac{\lambda_1}{\lambda_2}$), plus all 5 `importantTerms` ($\lambda, f, T, A, v$) and multi-step `workedExample`.

- [ ] **Step 4: Expand Lesson 7.3 (`les_ssc_physics_ch7_3`) in `apps/api/prisma/seed-chapter-7.ts`**
Expand `explanation` to cover vacuum bell-jar requirement, audible/infrasound/ultrasound ranges, `৭.৩.১` echo persistence ($0.1\text{ s}$) & $d = vt/2$ ($16.5\text{ m}$ at $0^\circ\text{C}$, $17.25\text{ m}$ at $25^\circ\text{C}$), `৭.৩.২` speed-of-sound table across air/water/iron + temperature formulas ($v \propto \sqrt{T}$, $v_\theta \approx v_0 + 0.6\theta$) & humidity/pressure effects, `৭.৩.৩` ultrasound/SONAR/echolocation uses, `৭.৩.৪` musical sound properties (loudness, pitch, timbre) & instruments, and `৭.৩.৫` decibel scale & noise-pollution remedies, plus expanded `importantTerms` and multi-step `workedExample`.

- [ ] **Step 5: Verify `seed-chapter-7.ts` compiles cleanly**

Run: `pnpm --filter @pori/api exec tsc --noEmit`
Expected: Exit code 0 with zero errors.

---

### Task 2: Complete Chapter 7 Question Bank to 80 Questions (68 MCQs + 12 CQs)

**Files:**
- Modify: `/Users/technonext/Desktop/poRi/apps/api/prisma/seed-chapter-7-questions.ts`

**Interfaces:**
- Consumes: `chapter7Batch2Questions`, `chapter7Batch3Questions`
- Produces: `chapter7Questions: QuestionData[]` (80 items: 68 `MCQ`, 12 `CQ_CREATIVE`)

- [ ] **Step 1: Write and run a validation check confirming current question count is 79**

Run: `cd apps/api && ./node_modules/.bin/tsx -e "import { chapter7Questions } from './prisma/seed-chapter-7-questions'; console.log(chapter7Questions.length);"`
Expected: Prints `79` (15 MCQ + 3 CQ in 7.1, 20 MCQ + 3 CQ in 7.2, 32 MCQ + 6 CQ in 7.3).

- [ ] **Step 2: Add `q_ch7_1_mcq_16` to `batch1Questions` in `apps/api/prisma/seed-chapter-7-questions.ts`**
Add a verified board-style spring-mass SHM MCQ for `top_ssc_physics_ch7_1` with 4 options, 1 `isCorrect: true`, full `stepDerivation`, `distractorAnalysis`, `textbookCitation`, and `proTipShortcut`, bringing Topic 7.1 to 16 MCQs + 3 CQs and total Chapter 7 questions to **80** (68 MCQs + 12 CQs).

- [ ] **Step 3: Validate all 80 Chapter 7 questions**

Run:
```bash
cd apps/api && ./node_modules/.bin/tsx -e "
import { chapter7Questions } from './prisma/seed-chapter-7-questions';
const ids = new Set();
const optIds = new Set();
const allowedTopics = new Set(['top_ssc_physics_ch7_1','top_ssc_physics_ch7_2','top_ssc_physics_ch7_3']);
let mcq = 0, cq = 0;
for (const q of chapter7Questions) {
  if (ids.has(q.id)) throw new Error('Dup q id: ' + q.id);
  ids.add(q.id);
  if (!allowedTopics.has(q.topicId)) throw new Error('Bad topic: ' + q.topicId);
  if (q.type === 'MCQ') {
    mcq++;
    if (!q.options || q.options.length !== 4 || q.options.filter(o=>o.isCorrect).length !== 1) throw new Error('Bad MCQ: ' + q.id);
    for (const o of q.options) {
      if (optIds.has(o.id)) throw new Error('Dup opt id: ' + o.id);
      optIds.add(o.id);
    }
  } else {
    cq++;
    if (!q.cqRubric?.ka || !q.cqRubric?.kha || !q.cqRubric?.ga || !q.cqRubric?.gha) throw new Error('Bad CQ: ' + q.id);
  }
}
console.log({ total: chapter7Questions.length, mcq, cq });
if (chapter7Questions.length !== 80 || mcq !== 68 || cq !== 12) process.exit(1);
"
```
Expected: `{ total: 80, mcq: 68, cq: 12 }` and exit code 0.

---

### Task 3: Seed Chapter 7 into PostgreSQL & Verify End-to-End

**Files:**
- Verify: `/Users/technonext/Desktop/poRi/apps/api/prisma/seed.ts`
- Verify: `/Users/technonext/Desktop/poRi/apps/web/src/lib/curriculum-data.ts`

- [ ] **Step 1: Run `seed-chapter-7.ts` and copy interactive simulations if needed**

Run: `cd apps/api && ./node_modules/.bin/tsx prisma/seed-chapter-7.ts`
Expected: Logs `✓ Seeded` for all 3 topics and `✅ Successfully seeded 80 MCQs and CQs for Chapter 7!`.

- [ ] **Step 2: Verify PostgreSQL live counts for `chap_ssc_physics_ch7`**

Run:
```bash
cd apps/api && node -e "
const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient({ datasources: { db: { url: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/pori?schema=public' } } });
(async () => {
  const ch = await p.chapter.findUnique({
    where: { id: 'chap_ssc_physics_ch7' },
    include: { topics: { orderBy: { orderIndex: 'asc' }, include: { lessons: true } } }
  });
  if (!ch || ch.topics.length !== 3) throw new Error('Missing ch7 or topics');
  for (const t of ch.topics) {
    const mcq = await p.question.count({ where: { topicId: t.id, type: 'MCQ' } });
    const cq = await p.question.count({ where: { topicId: t.id, type: 'CQ_CREATIVE' } });
    console.log(t.id, t.titleBangla, '| lessons:', t.lessons.length, '| explanationLen:', t.lessons[0]?.explanation.length, '| MCQ:', mcq, '| CQ:', cq);
  }
  await p.\$disconnect();
})();
"
```
Expected: 3 topics (`top_ssc_physics_ch7_1`..`3`), 1 published lesson each with rich explanation length, totaling 68 MCQs and 12 CQs (80 questions).

- [ ] **Step 3: Run TypeScript type checks and API/Web verification**

Run:
```bash
pnpm --filter @pori/api exec tsc --noEmit && pnpm --filter @pori/web exec tsc --noEmit
```
Expected: Both exit with code 0.
