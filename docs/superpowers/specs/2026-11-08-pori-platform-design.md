# Specification: poRi — Bengali Learning App for SSC and HSC Students
**Date:** 2026-11-08  
**Product plan:** Consolidated Product Plan v0.2  
**Status:** Product scope and primary stack selected; detailed implementation decisions remain  
**Initial scope:** Reviewed SSC Class 9–10 Physics (পদার্থবিজ্ঞান), Bangla medium  
**Platform strategy:** Next.js 15 mobile-responsive Web PWA + NestJS API first; Flutter Android app follows in Phase 2

---

## 0. Current Product Direction (Authoritative)

This section reconciles this platform design with **Consolidated Product Plan v0.2**. It is the source of truth for launch scope. The detailed broad-platform concepts below remain a future-state vision and must not be read as MVP commitments when they conflict with this section.

### Product goal and principles

Help SSC and HSC students understand lessons in clear Bengali, remember what they learn, and practise question types for their subject and syllabus year. The app should help them decide what to study next, check understanding, practise recall and application, and identify what to review before exams.

- Bengali is the default teaching language; show important textbook and English terms where useful.
- Version curriculum and exam rules by education system or board, class, group, subject, paper, and syllabus year.
- Launch with one reviewed pilot subject. Show the wider catalog with clear **Ready** and **Coming soon** states.
- Offer guest exploration and phone OTP sign-in for progress backup and sync.
- Explain the evidence behind progress indicators; do not present them as an exam-result prediction.

### Initial student journey and navigation

Persistent destinations: **Home** (continue, due revision, next action), **Subjects** (catalog and chapters), and **Progress** (topics needing work and activity). Keep the current class and subject visible. Changing subject from a lesson or test returns to that subject’s chapter list so context does not silently change.

Core loop: **Choose subject → choose chapter/topic → learn → practise → review mistakes → return later.**

### Release scope

| Release | Included |
|---|---|
| **MVP** | One reviewed pilot subject; data-backed catalog; guest start and OTP sync; Bengali lessons; quick practice and explanations; bookmarks, short notes, title/topic search; saved mistakes, weak-topic report, chapter tests, topic-level progress; report-content-error flow; content review workflow; shared event tracking. |
| **v1.1** | Subject model tests; test history and score trends; spaced revision schedule; study planner and reminders; downloadable lessons and offline test-taking with later sync. |
| **v1.2** | Multi-subject exam rehearsals; verified previous board questions; parent/teacher progress view; audio lessons; teacher review of written answers if demand warrants it. |
| **Later vision** | Admission and job exam catalogs; AI tutor and handwritten-answer evaluation; duels, advanced game modes, subscriptions and payment integrations. These are not launch requirements. |

### Learning content and practice

Each lesson contains a learning goal, simple explanation, important terms, worked example, short memory aid or summary, quick practice, and a way to save or revisit difficult content. Explanations should support both correct and incorrect answers.

Content is organized as **education system/board → level → class and syllabus year → group → subject → paper → chapter → topic**. A subject card shows its name, paper, class/year, chapter count, readiness state, and (when available) student progress.

Question content is tagged with subject, paper, chapter, topic, question type, difficulty, board/year where applicable, source and verification status, answer, explanation, and marking guide. Editors use **draft → review → publish → correction** with version history; a syllabus update must not silently alter the historical content version.

### Exam and test rules

- Build tests from a **subject-and-year exam blueprint** specifying question types, marks, duration, question counts, and answer rules. Do not assume every paper has the same MCQ/CQ combination.
- MVP supports chapter and topic/weak-area tests. Subject model tests follow in v1.1; multi-subject rehearsals and previous board questions follow in v1.2.
- Test runner requirements: countdown, question navigator, review flag, autosave, resume after app closure, and auto-submit where the blueprint requires it.
- Grade MCQs automatically. For written/CQ answers, provide a model answer and point-by-point marking guide for student self-assessment; defer AI or teacher grading.
- Results show score, section results, time per question, correct/wrong/skipped answers, explanations, and links to relevant lessons. Send missed questions to revision.
- Apply negative marking only when specified by that test’s blueprint; allow a student-set penalty only for custom practice.
- Treat a full model exam as separately timed subject papers. Label questions **official** only when the source is verified and retain source/year metadata.

### Progress, offline, and event data

Track topic state (not started, learning, review needed, consistent), chapter coverage/accuracy/study time/last studied, subject syllabus coverage and score trend, and overall study days/activity/time/readiness. Do not infer mastery from one answer. Rank weak topics using recent attempt evidence. Explain readiness signals by coverage and/or recent tests.

Allow guest use, then preserve progress when the student signs in by phone OTP. Start offline support with downloadable lessons; add offline tests and result sync in v1.1. Save test answers locally while the test is in progress.

Use one event stream for lesson opens/completions, question attempts, test starts/submissions, time spent, bookmarks, and revision. Progress views and success measures use this shared data. Track first-lesson completion, return within a week, lesson-to-practice completion, retry improvement, revision use, test completion/resume, content-error correction time, and Bengali explanation feedback.

### Screens by release

**MVP:** Welcome/setup; Home; subject catalog; subject page; chapter/topic page; lesson; quick practice; chapter/topic test setup and runner; results; revision and weak topics; progress; search/bookmarks/notes; account/settings; content correction report; protected content-review workspace for editors/reviewers.

**v1.1:** Subject model test, test history, study planner, reminders, and downloads.

**v1.2 or later:** Multi-subject exam rehearsal, parent/teacher view, audio lessons, and written-answer review features.

### Decisions resolved for MVP

1. **Pilot Level & Subject:** SSC Class 9–10 Physics (পদার্থবিজ্ঞান), Bangla Medium, aligned to the applicable SSC 2026 syllabus and 2026 class 9–10 textbooks.
2. **Curriculum Scope:** General curriculum, Bangla medium first.
3. **Curriculum and Question Sources:** Use NCTB textbooks, the SSC 2026 syllabus, and its question structure as curriculum/assessment references. The approved source set for a future board-question archive is Dhaka, Rajshahi, and Chattogram Board papers from 2020–2024; the archive itself is v1.2. Record the exact board, year, and source for each item, and add other boards only after verification.
4. **Client & Mobile Strategy:** Next.js 15 PWA first (mobile-first UI, accessible on Android phones and PCs), followed by Flutter native app in Phase 2 consuming the same NestJS API.
5. **Backend Stack:** NestJS + Prisma ORM + PostgreSQL + Redis.

NCTB references for the SSC pilot: [2026 SSC revised syllabus, question types, marks distribution, and class 9–10 subject structure](https://nctb.gov.bd/pages/notices/6922e919dbfbab28ce0abfac) and [2026 class 9–10 textbook list](https://nctb.gov.bd/pages/static-pages/695b99afc4774958d7b70612). Verify the applicable board and exam-year materials before publishing each content item.

---

## 1. Long-term Vision and Reference App Parity

The sections below record the earlier broad-platform vision. Use them as a candidate roadmap and architecture reference; where they conflict with Section 0, Section 0 controls launch scope. The selected launch client is the Next.js 15 Web PWA; Flutter Android follows in Phase 2. AI grading, live duels, advanced gamification, payments, and admission/job catalogs are deferred.

The original broad vision describes a comprehensive exam preparation, practice, and AI-assisted learning platform informed by **Oddhoyon AI** (`com.oddhoyon.ai`) and **Chorcha** (`com.chorcha.ai`). This matrix is inspiration and a candidate roadmap, not a claim that the reference apps or their feature sets have been independently validated.

### Full Reference App Coverage Matrix

| Feature Module | Oddhoyon AI Parity | Chorcha Parity | poRi Implementation & Enhancement |
| :--- | :---: | :---: | :--- |
| **Curriculum & Levels** | Class 6–8, SSC, HSC, Admission | SSC, HSC, Admission, BCS, Govt Jobs | Class 6–8, SSC, HSC (Science/Arts/Commerce), Admission (BUET/Medical/DU/GST), and BCS/Jobs. |
| **MCQ Practice Engine** | Chapter-wise, instant feedback | 1M+ database, topic-wise | LaTeX/KaTeX math formula rendering, instant grading, bookmarking, and problem reporting. |
| **Comprehensive Explanation System** | Basic textbook explanation | AI explanation | **6-Layer Explanation System** for every question + Chapter Concept Blueprints. |
| **Creative Question (CQ / সৃজনশীল)** | ক, খ, গ, ঘ format practice | CQ bank | Chapter-wise CQ with model answers, grading rubrics, and AI answer evaluation. |
| **Timed Model Tests** | Timed tests, negative marking | Live national mock tests | Customizable tests (subject, timer, 0.25/0.50 negative marking, auto-submit, rank percentiles). |
| **Question Bank Archives** | Board exams by year, admission by unit | Past papers | Filter by Board & Year (2015–2025), University & Unit (BUET, Medical, DU A/B/C/D, RU, etc.). |
| **Bangla AI Tutor / Doubt Solver** | Text + Photo question ask | AI question generator | RAG-powered Bangla AI tutor with textbook grounding, formula OCR, and voice input. |
| **AI Handwritten CQ Evaluation** | 4-page photo upload | Not available | Multi-page OCR + Vision evaluation grading ক (1m), খ (2m), গ (3m), ঘ (4m) with rubric feedback. |
| **1v1 Multiplayer Duels** | Real-time quiz battle | Quick practice | WebSocket-based real-time 1v1 battles with friend matchmaking and Elo rating. |
| **Gamified Learning Modes** | Daily Challenge, Survival, Ghost Hunt | Leaderboards, Point tokens | Daily Challenge, Survival (3 lives), Ghost Hunt (finding erroneous questions), XP, and 8 Rank Tiers. |
| **Daily Streaks & Retention** | Streak calendar, freeze | Streaks, points | GitHub-style activity heatmaps, streak repair/freezes, and milestone trophies. |
| **Smart Revision Queue** | Wrong answers resurface | Review bank | Leitner-style spaced repetition queue: wrong answers re-appear until answered correctly twice. |
| **Offline Support** | Download chapter packs | Limited caching | Next.js PWA Service Worker + IndexedDB for offline chapter packs and offline test taking. |
| **Monetization & Billing** | Free, Lite, Plus, Pro (bKash/Nagad) | Subscriptions + Paid mocks | Free tier + affordable monthly/annual passes with bKash, Nagad, Cards, and Promo/Redeem codes. |

---

## 2. The Comprehensive Explanation System Architecture

A core deficiency of existing platforms is shallow, one-line explanations. `poRi` introduces an educational **Multi-Layer Explanation System** integrated into every chapter, section, and question:

### 2.1 Future Chapter & Section-Level Knowledge Layer

This is a candidate content expansion beyond the MVP lesson structure in Section 0. Pilot lessons need reviewed Bengali explanations, examples, terms, and quick practice; they do not require every item below.
For every Subject $\rightarrow$ Chapter $\rightarrow$ Section:
1. **Chapter Concept Blueprint (অধ্যায় পরিচিতি ও ফর্মুলা শীট):**
   - High-yield summary notes covering all NCTB learning outcomes.
   - Formula sheet with variable definitions and units (e.g. Newton's laws, Thermodynamics, Calculus).
   - Chapter Weightage Analysis (how frequently questions appear in Board vs. BUET/Medical exams).
2. **Topic Concept Cards (টপিক ধারণা):**
   - Visual flashcards explaining theoretical concepts before the student starts answering questions.

### 2.2 Candidate Question-Level 6-Layer Explanation Architecture (Later)

This is an optional future format. For MVP, provide an accurate, reviewed Bengali explanation appropriate to the question; do not require all six layers or an AI follow-up.

```
┌────────────────────────────────────────────────────────────────────────┐
│  Layer 1: Direct Answer Key                                            │
│  - Correct Option: (গ) 9.8 m/s²                                        │
├────────────────────────────────────────────────────────────────────────┤
│  Layer 2: Core Concept / মূল তত্ত্ব ও সূত্র                             │
│  - Identifies the underlying law or formula (e.g., F = G*(m1*m2)/r²). │
├────────────────────────────────────────────────────────────────────────┤
│  Layer 3: Step-by-Step Derivation / গাণিতিক সমাধান                     │
│  - Step 1: Given variables listed with units.                          │
│  - Step 2: Formula substitution with LaTeX typesetting.                │
│  - Step 3: Final calculated result with unit verification.             │
├────────────────────────────────────────────────────────────────────────┤
│  Layer 4: Distractor Analysis / ভুল অপশনগুলোর পর্যালোচনা              │
│  - Explains why Option (ক), (খ), and (ঘ) are wrong.                    │
│  - Highlights the specific trap or common arithmetic mistake.          │
├────────────────────────────────────────────────────────────────────────┤
│  Layer 5: Textbook Citation / পাঠ্যবইয়ের রেফারেন্স                    │
│  - Cite a verified edition, chapter, and page when available.        │
├────────────────────────────────────────────────────────────────────────┤
│  Layer 6: Pro-Tip & Shortcut / শর্টকাট টেকনিক ও সতর্কতা                 │
│  - 30-second trick for admission tests without calculator.             │
│  - Interactive Button: [AI-কে আরো বিস্তারিত জিজ্ঞাসা করো]            │
└────────────────────────────────────────────────────────────────────────┘
```

### 2.3 Example CQ Rubric (Only When the Selected Blueprint Uses This Format)

Use the marking scheme published for the selected subject and exam year. The breakdown below is illustrative; it is not a universal SSC/HSC rubric.
For written questions:
* **ক (জ্ঞানমূলক - 1 Mark):** Exact factual textbook definition.
* **খ (অনুধাবনমূলক - 2 Marks):** Explanation of the concept (1 mark for fact + 1 mark for explanation).
* **গ (প্রয়োগমূলক - 3 Marks):** Mathematical/Contextual application (Formula 1m + Calculation 1m + Result 1m).
* **ঘ (উচ্চতর দক্ষতামূলক - 4 Marks):** Critical thinking and comparative analysis (Hypothesis 1m + Proof 2m + Decision 1m).
* **Later AI evaluation option:** If approved after the pilot, students may submit up to 4 photos for Vision-assisted feedback against a reviewed, subject/year-specific marking guide. Do not assume one fixed NCTB rubric applies to every paper.

---

## 3. Selected First-Phase Architecture (Next.js 15 PWA + NestJS)

The first phase uses a mobile-responsive Next.js 15 PWA with the NestJS API, PostgreSQL, and Redis. The later Flutter Android app will consume the same versioned API. Define and document API contracts so both clients can share curriculum, content, test, account, and progress behavior.

```
                            ┌────────────────────────────────────────┐
                            │   Next.js 15 Mobile-Responsive PWA     │
                            │   - App Router, Tailwind CSS, Zustand  │
                            │   - KaTeX Math & Chemical Formula Engine│
                            │   - v1.1 Offline Storage (IndexedDB)   │
                            └───────────────────┬────────────────────┘
                                                │ HTTPS (MVP) / WebSocket (later duels)
                                                ▼
                            ┌────────────────────────────────────────┐
                            │            NestJS API Gateway          │
                            │   - Global Guards & Validation Pipe   │
                            │   - Passport JWT & Role-Based Access   │
                            │   - Swagger OpenAPI Documentation      │
                            └───────┬────────────────────────┬───────┘
                                    │                        │
       ┌────────────────────────────┼────────────────────────┼────────────────────────────┐
       ▼                            ▼                        ▼                            ▼
┌──────────────┐             ┌──────────────┐         ┌──────────────┐             ┌──────────────┐
│ Curriculum & │             │ Practice &   │         │ Later: Duel  │             │ Later: AI    │
│ Question Mod │             │ Exam Engine  │         │ Gateway (WS) │             │ Tutor Worker │
└──────┬───────┘             └──────┬───────┘         └──────┬───────┘             └──────┬───────┘
       │                            │                        │                            │
       └────────────────────────────┼────────────────────────┴────────────────────────────┘
                                    ▼
       ┌─────────────────────────────────────────────────────────────────────────────────┐
       │ Persistence & Caching Layer                                                     │
       │ - PostgreSQL: Relational Curriculum, Questions, Explanations, Users, Exams     │
       │ - Redis: cache; later job queues, leaderboards, and matchmaking state           │
       │ - Object storage: question diagrams and later student uploads                  │
       └─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Candidate NestJS Backend Modules

For MVP, prioritize authentication/guest migration, curriculum, reviewed content and questions, chapter/topic practice, tests, progress/events, and error reporting. Provide a protected editor workflow for draft, review, publish, correction, and version history; student clients serve published content only. The AI, duel, advanced gamification, and payment modules below are later candidates, not MVP commitments.

1. **`CurriculumModule`**:
   - Manages versioned curriculum: `EducationSystem/Board` $\rightarrow$ `Level` $\rightarrow$ `Class + SyllabusYear` $\rightarrow$ `Group` $\rightarrow$ `Subject` $\rightarrow$ `Paper` $\rightarrow$ `Chapter` $\rightarrow$ `Topic`.
   - Admission and job categories are later roadmap scope.
2. **`QuestionModule`**:
   - Stores typed question content (MCQ, CQ, or another blueprint-defined type), answers, explanations, difficulty, source, and verification status.
   - Tags each item with its curriculum version and, when applicable, board and exam year; the v1.2 board archive is not required for MVP launch.
3. **`ExamModule`**:
   - MVP chapter/topic tests follow applicable content rules; subject model tests are v1.1.
   - Applies question mix, duration, marks, and negative marking from the selected subject/year blueprint. Custom-practice penalties are student-configurable.
   - Saves answers and resumes interrupted attempts; generates question-by-question results.
4. **`DuelGateway` (WebSockets)**:
   - Matchmaking queue for real-time 1v1 student battles.
   - Synchronous 5-round question pushes with 15-second timers.
5. **`RevisionModule`**:
   - Saves incorrect answers to the MVP review list.
   - Adds scheduled spaced-repetition intervals in v1.1 after pilot validation.
6. **`GamificationModule`**:
   - Tracks daily streaks, XP points, and rank tiers:
     1. *Nobagot (নবাগত)*
     2. *Onushiloni (অনুশীলনী)*
     3. *Giyan-shadhok (জ্ঞানসাধক)*
     4. *Odrishyobir (অদৃশ্যবীর)*
     5. *Medhabi (মেধাবী)*
     6. *Shera (সেরা)*
     7. *Mohabir (মহাবীর)*
     8. *Kingbadanti (কিংবদন্তি / Legend)*
7. **`AITutorModule` (BullMQ + Gemini API)**:
   - RAG pipeline querying NCTB textbook corpus.
   - Vision pipeline: multi-page handwritten image pre-processing $\rightarrow$ rubric grading.
8. **`PaymentModule`** (later):
   - Candidate integration with bKash, Nagad, and SSLCommerz.
9. **`ContentAdminModule` (MVP)**:
   - Enforces editor/reviewer roles and the draft → review → publish → correction workflow.
   - Maintains content version history, source metadata, and an audit trail for reviewer decisions and corrections.

---

## 5. First-Phase Web Client (Next.js 15 PWA)

This is the first-phase client architecture. Keep MVP routes focused on the Section 0 student flows; the items explicitly marked later are roadmap routes. Flutter Android is planned for Phase 2 against the same NestJS API.

* **App Router Structure:**
  * `app/(marketing)`: Landing page and FAQ; pricing is deferred until monetization is approved.
  * `app/(auth)`: Guest entry and phone OTP; add other sign-in methods only if approved.
  * `app/dashboard`: Home with continue learning, due review, and next action; advanced streaks/ranks are later.
  * `app/curriculum/[program]/[subject]`: Chapter list with content readiness and completion progress.
  * `app/practice/[chapterId]`: Question practice with reviewed explanations; six-layer explanations are a later option.
  * `app/revision` and `app/progress`: MVP saved mistakes, weak topics, and topic/chapter progress.
  * `app/exam/chapter-test`: MVP chapter/topic test runner with question navigation, autosave, resume, and results.
  * `app/exam/model-test`: v1.1 subject model-test flow, driven by a subject/year blueprint.
  * `app/exam/result/[examId]`: Results with section breakdown, timing, missed questions, and lesson links.
  * `app/account` and `app/content-report`: MVP sync/settings and report-content-error flows.
  * `app/admin/content`: MVP protected draft/review/publish/correction workspace for authorized editors and reviewers.
  * `app/ai/tutor` and `app/duels`: Later roadmap features.
* **Math & Formula Engine:** Client-side KaTeX rendering with automatic delimiters (`$...$` and `$$...$$`) supporting both Latin and Bengali numerals.
* **Offline Service Worker (v1.1):** Caches downloadable lessons and, later in v1.1, selected test content in IndexedDB for offline completion and sync.

---

## 6. Monorepo Directory Organization

```
poRi/
├── apps/
│   ├── web/                    # Next.js 15 mobile-responsive PWA (Phase 1)
│   │   ├── src/
│   │   │   ├── app/            # App Router pages
│   │   │   ├── components/     # UI Component library (Tailwind, Radix)
│   │   │   ├── hooks/          # Custom hooks (useTimer, useAudio, usePWA)
│   │   │   ├── lib/            # KaTeX parser, API client
│   │   │   └── store/          # Zustand state stores
│   │   └── public/             # Icons, PWA manifest, offline assets
│   ├── mobile/                 # Flutter Android app (Phase 2; separate Flutter workspace)
│   └── api/                    # NestJS Backend API
│       ├── src/
│       │   ├── modules/        # Auth, Curriculum, ContentAdmin, Content, Question, Practice, Progress
│       │   ├── common/         # Guards, interceptors, filters
│       │   ├── database/       # Prisma schema & migrations
│       │   └── main.ts         # Server bootstrap
├── packages/
│   ├── shared/                 # Shared TypeScript interfaces/DTOs for web and API
│   ├── api-contract/           # Versioned OpenAPI contract for clients, including Flutter/Dart
│   ├── tsconfig/               # Shared TypeScript configurations
│   └── eslint-config/          # Shared linting configs
├── package.json
└── pnpm-workspace.yaml
```
