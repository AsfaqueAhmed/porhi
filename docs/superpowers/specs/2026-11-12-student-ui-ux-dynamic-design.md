# Student Section UI/UX Improvisation & Dynamic Data Architecture — Design Spec

**Date:** 2026-11-12  
**Scope:** End-to-end student-facing user experience (`apps/web` & `apps/api`) — Dynamic Student Analytics API, Local-First Learning Store Sync, Peer EdTech Feature Parity (Chorcha, Shikho, Khan Academy, Brilliant), and Responsive Student UI/UX Polish.

---

## 1. Intent, Goals, Non-Goals & Constraints

### 1.1 Intent & The Why
The student section of **পড়ি (poRi)** currently mixes partially wired pages (`Subjects`, `Curriculum`, `Lesson`, `Practice`, `Exam`) with completely static mockup pages (`Dashboard`, `Progress`), and lacks the connected study loop and visual polish found in leading EdTech platforms (**Chorcha**, **Shikho**, **Khan Academy**, **Brilliant**). Students need:
1. **100% Dynamic Data:** Every metric, recommendation, revision item, chapter progress bar, topic mastery badge, streak counter, and exam history item must reflect real database records and live user activity—working seamlessly for both authenticated/guest-token API sessions and local/offline guest fallback.
2. **Peer EdTech Feature Parity:** Mastery tiers per topic, interactive lab indicators, global topic/chapter quick search, bookmarks & saved notes, lesson reading progress + prev/next topic navigation, customizable practice filters (difficulty, mistake-retry mode, keyboard shortcuts, session summary), and exam blueprint setup + topic-wise post-exam breakdown.
3. **User-Friendly UI/UX:** Cohesive typography, clear visual hierarchy, responsive mobile/desktop ergonomics, and instant micro-feedback without breaking any existing test contracts.

### 1.2 Goals
- Replace all hardcoded student metrics, links, and placeholder arrays in `/dashboard`, `/progress`, `/subjects`, `/curriculum/[subjectId]`, `/lesson/[topicId]`, `/practice/[chapterId]`, and `/exam/[chapterId]` with live API + store data.
- Add backend student progress & curriculum enrichment endpoints in `apps/api` and automatic mistake resolution in `PracticeService.submitPractice`.
- Implement a persistent client-side learning activity & bookmark store (`useLearningStore` / enhanced `useUserStore`) that syncs with the backend API and provides instant dynamic state even when the API is unreachable or the student is in local guest mode.
- Upgrade the UI/UX across all student screens and `PersistentNav` with best-in-class EdTech patterns.

### 1.3 Non-Goals & Anti-Goals
- **Non-Goals:** Multiplayer real-time WebSocket 1v1 duels, AI handwritten OCR grading, and bKash/Nagad payment billing (deferred to v1.2+ per platform spec).
- **Anti-Goals:**
  - Never break existing student or admin Vitest/Jest test suites (`navigation.test.tsx`, `practice-runner.test.tsx`, `student-lesson-page.test.tsx`, `shimmer-loading.test.tsx`).
  - Never show fake/fabricated static numbers (e.g., hardcoded `65%`, `78%`, `18/20`) as student progress when a user has 0 activity; instead, show real computed metrics (starting at `0%` with an encouraging empty/starter state and real curriculum counts, updating immediately as they read lessons, solve MCQs, and take exams).
  - Never require mandatory phone login to experience dynamic progress tracking—guest users must see their real progress too.

### 1.4 Constraints
- Preserve all existing Bengali copy hooks required by existing tests (`বর্তমান বিষয়:`, `হোম`, `বিষয়সমূহ`, `অগ্রগতি`, `← অধ্যায় সূচিতে ফেরত যান`, `MCQ অনুশীলন শুরু করো`, `পাঠের শিখন যাচাই • MCQ অনুশীলন`, `এই টপিকের জন্য বর্তমানে কোনো MCQ প্রশ্ন পাওয়া যায়নি`, `সম্পূর্ণ অধ্যায় অনুশীলন করো`).
- Maintain full bilingual support (`bn` / `en`) via `useLanguageStore` (`tr` and `toBanglaDigits`).
- Ensure mobile-first responsiveness (`320px` to `1440px+`) with accessible keyboard and touch targets.

---

## 2. Approaches Considered

1. **Approach A — Hybrid Backend Analytics API + Local-First Learning Store Sync (Selected):**
   - Enrich the NestJS backend (`CurriculumService`, `PracticeService`, and a new `StudentProgressModule` at `/student/overview`) to aggregate `EventLog`, `RevisionMistake`, `ExamSession`, and published `Lesson`/`Question` counts per topic/chapter.
   - Pair it with a persistent Zustand learning store on the frontend that records lesson opens/completions, practice attempts, resolved mistakes, exam results, bookmarks, and daily study dates locally, merging server data with local state.
   - *Why chosen:* Guarantees 100% dynamic, reactive data across all screens whether connected to PostgreSQL or running in local guest fallback mode.
2. **Approach B — Pure Backend-Only Analytics:**
   - Compute progress strictly on the server.
   - *Why rejected:* Leaves offline/local-fallback guest sessions with blank or broken dashboards when the API isn't reachable.
3. **Approach C — Pure Client-Side LocalStorage Tracking:**
   - Track progress only in the browser without backend endpoints.
   - *Why rejected:* Ignores existing Prisma `EventLog`, `RevisionMistake`, and `ExamSession` tables and fails to sync across devices for logged-in users.

---

## 3. Backend Architecture & API Changes (`apps/api`)

### 3.1 Enriched Curriculum Endpoints (`CurriculumService`)
1. **`GET /curriculum/subjects`:**
   - In addition to `chapterCount`, include `topicCount`, `publishedLessonCount`, and `publishedQuestionCount` per subject (computed via Prisma nested `_count` / query) so `/subjects` cards display real chapter, lesson, and MCQ counts.
2. **`GET /curriculum/subjects/:subjectId/chapters`:**
   - Include per-topic metadata in each returned `topic`:
     - `lessonCount`: count of `PUBLISHED` lessons for this topic
     - `hasInteractiveLab`: boolean (`true` if any `PUBLISHED` lesson for this topic has a non-empty `interactiveWidgetUrl`)
     - `questionCount`: count of `PUBLISHED` `MCQ` questions for this topic
     - `cqCount`: count of `PUBLISHED` `CQ_CREATIVE` questions for this topic
   - Also allow looking up by `subject.code` (e.g., `ssc_physics`) if `subjectId` is passed as `sub_ssc_physics` or `sub-ssc-phy` (using a clean alias lookup helper so default frontend subject IDs resolve seamlessly against seeded DB subjects).

### 3.2 Mistake Resolution & Mistake Practice (`PracticeService` & `PracticeController`)
1. **Auto-Resolve Mistakes on Correct Retry (`PracticeService.submitPractice`):**
   - When `userId` is present and `isCorrect === true`, check if an unresolved `RevisionMistake` exists for `{ userId, questionId }`. If so, update it (`resolved: true`, `attemptCount: { increment: 1 }`).
2. **Topic & Chapter Fallback Resolution (`PracticeService.getChapterQuestions`):**
   - Support `mode=mistakes` query parameter (`GET /practice/chapter/:chapterId/questions?topicId=...&difficulty=...&mode=mistakes`):
     - Optional `difficulty` filter (`EASY` | `MEDIUM` | `HARD`).
     - When `mode=mistakes` and `userId` is authenticated, filter to unresolved `RevisionMistake` questions for that chapter/subject.

### 3.3 New Student Progress & Dashboard Endpoints (`StudentController` / `StudentService`)
Create `apps/api/src/modules/student/` (`StudentModule`, `StudentController`, `StudentService`) mounted at `/student` using `@UseGuards(OptionalJwtAuthGuard)`:

1. **`GET /student/overview?subjectId=...`**
   - Works with or without a logged-in user:
     - **Curriculum Totals (for requested `subjectId`):** `totalChapters`, `totalTopics`, `totalPublishedLessons`, `totalPublishedQuestions`.
     - **User-Specific Activity (when `req.user?.id` is present):**
       - `completedTopicIds`: distinct `topicId`s from `EventLog` where `eventType IN ('LESSON_OPEN', 'LESSON_COMPLETE')`.
       - `lastStudiedTopic`: most recent `LESSON_OPEN` / `LESSON_COMPLETE` event's topic + chapter details (`topicId`, `topicTitle`, `chapterId`, `chapterTitle`, `timestamp`), or the first topic of Chapter 1 if none yet.
       - `practiceStats`: total attempts, correct attempts, average accuracy `%`, and per-topic accuracy map `{ [topicId]: { attempts, correct, accuracy } }` aggregated from `EventLog` (`PRACTICE_ATTEMPT`) and `ExamSession` answers.
       - `streakDays` & `activeDaysLast7`: computed from distinct calendar dates in `EventLog` + `ExamSession`.
       - `dueMistakes`: unresolved `RevisionMistake` rows for the user (including `question` stem, options, `explanation`, `topic.id`, `topic.titleBangla`, `topic.chapter.id`, `topic.chapter.titleBangla`, `attemptCount`, `updatedAt`), ordered by `updatedAt DESC`, limit 20.
       - `weakTopics`: topics where user accuracy `< 60%` or unresolved mistakes `>= 1`, ranked by mistake count and lowest accuracy, including `{ topicId, topicTitle, chapterId, chapterTitle, accuracy, mistakeCount }`.
       - `recentExams`: last 10 `ExamSession` rows (`id`, `chapterId`, `subjectId`, `score`, `totalQuestions`, `durationSeconds`, `completedAt`, `status`).
2. **`POST /student/lesson-complete`** (`@UseGuards(OptionalJwtAuthGuard)`)
   - Body: `{ topicId: string; lessonId?: string; timeSpentSeconds?: number }`.
   - If `req.user?.id` is present, logs `EventLog` with `eventType: 'LESSON_COMPLETE'`. Returns `{ success: true, topicId }`.
3. **`POST /student/mistakes/:questionId/resolve`** (`@UseGuards(OptionalJwtAuthGuard)`)
   - Marks `RevisionMistake` for `{ userId, questionId }` as `resolved: true` if authenticated.

---

## 4. Frontend Dynamic State & Sync Architecture (`apps/web`)

### 4.1 Enhanced `useUserStore` & Activity Tracking (`apps/web/src/store/user-store.ts`)
Extend `useUserStore` (keeping existing state keys `guestId`, `token`, `user`, `activeSubject`, `streakDays` 100% backwards-compatible for existing tests) with rich client-side learning state:
- `completedTopics: Record<string, { topicId: string; chapterId: string; completedAt: string }>`
- `lastVisitedTopic: { topicId: string; topicTitle: string; chapterId: string; chapterTitle: string; subjectId: string; visitedAt: string } | null`
- `topicMastery: Record<string, { attempts: number; correct: number; lastPracticedAt: string }>`
- `savedMistakes: Record<string, { questionId: string; topicId: string; chapterId: string; chapterName: string; topicTitle: string; stem: string; yourAnswer: string; correctAnswer: string; conceptNote: string; attemptCount: number; resolved: boolean; updatedAt: string }>`
- `examHistory: Array<{ sessionId: string; chapterId: string; chapterTitle: string; subjectId: string; score: number; totalQuestions: number; correctCount: number; wrongCount: number; skippedCount: number; completedAt: string }>`
- `bookmarks: Array<{ id: string; type: 'LESSON' | 'QUESTION'; topicId: string; chapterId: string; title: string; subtitle?: string; createdAt: string }>`
- `lessonNotes: Record<string, string>` (quick student personal scratchpad note per `topicId`)
- `studyDates: string[]` (array of `YYYY-MM-DD` dates when the student read a lesson, answered a question, or finished an exam, used to dynamically compute `streakDays` and the 7-day activity strip).

**Actions (Builder's Call):**
- `recordLessonVisit(meta)` — updates `lastVisitedTopic` and records today in `studyDates`.
- `markTopicCompleted(topicId, chapterId)` — marks topic completed locally and fires `POST /student/lesson-complete` in background.
- `recordPracticeAttempt({ question, selectedOptionText, correctOptionText, isCorrect, chapterId, chapterName, topicTitle })` — updates `topicMastery[topicId]`, adds/increments `savedMistakes[question.id]` on wrong answer, or marks `savedMistakes[question.id].resolved = true` on correct answer, and records today in `studyDates`.
- `recordExamCompletion(summary)` — prepends to `examHistory`, updates `studyDates`.
- `toggleBookmark(item)` — adds/removes lesson or question bookmark.
- `saveLessonNote(topicId, note)` — persists personal note for that topic.
- `hydrateFromServerOverview(overview)` — merges backend `/student/overview` data with local store state so neither server nor local progress is lost.

### 4.2 Enriched Local Curriculum Fallback (`apps/web/src/lib/curriculum-data.ts`)
Enhance `DEFAULT_CHAPTERS` topics with accurate default metadata (`hasInteractiveLab`, `lessonCount: 1`, `questionCount`) matching the 12 SSC Physics chapters so that even if the backend API is offline during a test or local preview, chapter/topic counts and interactive lab badges (`Lab`) are dynamically computed from the curriculum tree.

---

## 5. Screen-by-Screen UI/UX & Feature Design (`apps/web`)

### 5.1 Persistent Navigation & Quick Search (`PersistentNav`)
- **Preserve Existing Test Contracts:** Keep the active subject indicator text (`বর্তমান বিষয়: ...`), the 3 main links (`হোম` -> `/dashboard`, `বিষয়সমূহ` -> `/subjects`, `অগ্রগতি` -> `/progress`), and `<LanguageToggle />`.
- **New EdTech UX Additions:**
  1. **Quick Search Trigger (`⌘K` / Search Button):** Opens a lightweight modal/command palette searching across all Chapters and Topics in the active subject (with instant filter by title or chapter number, showing `⚡ Lab` badges and jumping directly to `/lesson/[topicId]` or `/practice/[chapterId]`).
  2. **Saved Bookmarks Drawer/Popover:** Shows count badge of bookmarked lessons & questions for one-click revisit.
  3. **Live Streak Pill in Navbar:** Displays current dynamic `streakDays` with flame icon next to navigation links.

### 5.2 Landing / Welcome Screen (`/`)
- Keep frictionless **Guest Start** and **Phone OTP Login** flow.
- **Dynamic Live Platform Stats Strip:** Show real curriculum stats (e.g. `১২টি অধ্যায় • ৮০+ ইন্টারেক্টিভ টপিক • ৬-স্তরের MCQ বিশ্লেষণ • সরাসরি ল্যাব সিমুলেশন`).
- **Interactive Preview Showcase:** Add a preview tab/card showing how poRi's **Interactive Physics Lab + 6-Layer MCQ Breakdown + Spaced Repetition** works, and if the user already has an active session/progress in `useUserStore`, offer a prominent **"পড়া চালিয়ে যাও (Continue to Dashboard)"** button alongside Guest/OTP login.

### 5.3 Student Command-Center Dashboard (`/dashboard`)
Replace all static hardcoded cards with live data from `GET /student/overview` + `useUserStore`:
1. **Hero Welcome & 7-Day Streak Strip:**
   - Displays active subject badge, dynamic `streakDays` counter, and a **7-Day Activity Strip** (Sat–Fri pills lighting up days the student studied, inspired by Chorcha/Duolingo/Khan Academy).
   - Shows overall **Syllabus Mastery Ring / Progress Bar** (`X / Y টপিক সম্পন্ন • Z%`).
2. **Primary "Continue Where You Left Off" Card (Dynamic):**
   - Driven by `lastVisitedTopic` (or the next uncompleted topic in the curriculum if starting fresh, defaulting sensibly to `top_ssc_physics_ch1_1` or the user's active chapter).
   - Displays Chapter badge, Topic title, Mastery badge (`চলমান` / `নতুন পাঠ`), and CTAs:
     - **পড়া চালিয়ে যান (Continue Learning)** -> `/lesson/${topicId}`
     - **সরাসরি MCQ প্র্যাকটিস (Direct MCQ Practice)** -> `/practice/${chapterId}?topicId=${topicId}`
3. **Spaced Repetition / Mistake Revision Queue (Dynamic):**
   - Lists unresolved mistakes from `savedMistakes` / `dueMistakes`.
   - If unresolved mistakes exist: shows topic groups with mistake counts and direct **"রিভিউ শুরু →"** links (`/practice/${chapterId}?topicId=${topicId}&mode=mistakes`).
   - If 0 unresolved mistakes exist: shows a celebratory "সকল ভুল সংশোধিত! (All caught up!)" state with one-click quick practice recommendations for weak or unpracticed chapters.
4. **Bookmarked Items & Quick Study Hub:**
   - Quick access to saved bookmarks, Curriculum Index, Chapter Model Test, Progress Analytics, and Subject Switcher.

### 5.4 Subject Catalog (`/subjects`)
- Enrich subject cards with dynamic metrics from `GET /curriculum/subjects` (or computed fallback):
  - **Chapter count** (`১২টি অধ্যায়`), **Topic count** (`৮০+ টপিক`), and **Student Mastery Progress bar** on ready subjects.
  - Search input + Program filter tabs (`সকল বিষয়`, `SSC`, `HSC`).
  - Clear `প্রস্তুত (Ready)` vs `শীঘ্রই আসছে (Coming Soon)` states.

### 5.5 Curriculum & Mastery Index (`/curriculum/[subjectId]`)
Upgrade the chapter/topic accordion with **Khan Academy / Brilliant style mastery & content signals**:
1. **Search & Filter Bar:**
   - Instant search input to filter chapters/topics by name or number.
   - Filter pills: `সব টপিক (All)`, `⚡ ইন্টারেক্টিভ ল্যাব (With Lab)`, `অসম্পন্ন (Incomplete)`, `বুকমার্ক করা (Bookmarked)`.
2. **Chapter Header Progress Bar:**
   - Each chapter card header shows how many topics in that chapter the student has completed (`৩/৭ সম্পন্ন`) with a mini progress bar, alongside `MCQ প্র্যাকটিস` and `মডেল টেস্ট` buttons.
3. **Topic Row Mastery & Content Badges:**
   - Each topic row displays:
     - **Mastery Status Icon:** `✓ সম্পন্ন` (emerald check if lesson completed & practiced >=70%), `⏳ চলমান` (indigo dot if visited/attempted), `⚠️ রিভিশন প্রয়োজন` (amber/rose if accuracy <60%), or default play icon.
     - **Interactive Simulation Pill:** `⚡ ল্যাব` badge if the topic has an interactive simulation (`hasInteractiveLab` or `Lab` in topic metadata).
     - **Bookmark Toggle Button** right on the row.

### 5.6 Connected Lesson Reader (`/lesson/[topicId]`)
Preserve all existing elements and test selectors while adding a rich, distraction-free study experience:
1. **Top Reading Progress Bar & Breadcrumb Bar:**
   - Thin sticky reading progress indicator at the top of the viewport.
   - Breadcrumb (`বিষয় > অধ্যায় > টপিক`) + **"অধ্যায়ের সকল টপিক" (Chapter Topics Drawer/Dropdown)** so students can jump to any sibling topic in the same chapter with 1 click.
2. **Interactive Actions Toolbar:**
   - **বুকমার্ক করুন (Bookmark Lesson)** toggle button (`useUserStore.toggleBookmark`).
   - **পাঠ সম্পন্ন চিহ্নিত করুন (Mark Lesson Complete)** button (`useUserStore.markTopicCompleted` — auto-triggered or one-click toggled with emerald `✓ পাঠ সম্পন্ন` state).
   - **আমার সংক্ষিপ্ত নোট (My Quick Note):** Collapsible personal scratchpad saved per topic in `useUserStore.lessonNotes[topicId]`.
3. **Section Jump Pills:**
   - Quick anchor pills to jump to `শিখনফল`, `ইন্টারেক্টিভ ল্যাব` (when present), `মূল বিষয়বস্তু`, `পারিভাষিক শব্দ`, `উদাহরণ`, `মনে রাখার কৌশল`, and `কুইক প্র্যাকটিস`.
4. **Automatic Activity Recording:**
   - Opening the lesson records `recordLessonVisit`; answering the Quick Practice MCQ records `recordPracticeAttempt`.
5. **Previous / Next Topic Navigation Cards + Footer CTAs:**
   - Above or alongside the existing footer (`← অধ্যায় সূচিতে ফেরত যান` and `MCQ অনুশীলন শুরু করো`), display **পূর্ববর্তী টপিক (Previous Topic)** and **পরবর্তী টপিক (Next Topic)** cards resolved dynamically from the chapter's topic list.

### 5.7 Smart MCQ Practice Runner (`/practice/[chapterId]`)
Preserve all existing test contracts (`১ / ১`, `এই টপিকের জন্য বর্তমানে কোনো MCQ প্রশ্ন পাওয়া যায়নি`, `সম্পূর্ণ অধ্যায় অনুশীলন করো`, 6-layer explanation accordion) and add Chorcha-style practice ergonomics:
1. **Practice Filter & Mode Bar:**
   - Difficulty filter pills (`সব`, `সহজ (Easy)`, `মধ্যম (Medium)`, `কঠিন (Hard)`).
   - Mistake-only toggle (`শুধু ভুল হওয়া প্রশ্ন` when mistakes exist in this chapter/topic).
   - Progress bar across the top of the question card.
2. **Question Card Enhancements:**
   - Difficulty badge (`সহজ` / `মধ্যম` / `কঠিন`) + Board/Verification badge (`boardSource` if present).
   - **Bookmark Question** button on the card header.
   - **Keyboard Shortcuts:** Keys `1`–`4` (or `A`–`D`) select options when unanswered; `ArrowRight` / `ArrowLeft` navigate between questions; subtle keyboard hint badge on desktop.
3. **Live Store Recording:**
   - Selecting an option invokes `recordPracticeAttempt` in `useUserStore` in addition to `POST /practice/submit`, updating topic mastery and mistake notebooks in real time.
4. **Practice Session Summary Banner / Modal on Completion:**
   - When the student answers all questions in the set (or clicks `অনুশীলন সম্পন্ন`), show a rich **Practice Summary Card** with Accuracy `%`, Correct / Wrong breakdown, Option to **"ভুল প্রশ্নগুলো আবার অনুশীলন করো (Retry Missed Questions)"**, or continue to the Chapter Model Test / Curriculum.

### 5.8 Chapter Model Test Runner & Result Analytics (`/exam/[chapterId]`)
1. **Active Exam Runner Improvements:**
   - Resolve `chapterTitle` dynamically from `findTopicHierarchy` / curriculum data and display it in the exam header.
   - Support keyboard navigation (`1–4` to pick option, `F` to flag, `ArrowLeft`/`ArrowRight` for prev/next).
   - Add a confirmation prompt or clean warning badge if the user clicks `পরীক্ষা সাবমিট করো` while questions remain unanswered (with one-click confirm or direct submit).
2. **Result Sheet Improvements:**
   - Record completed exam in `useUserStore.recordExamCompletion` and record wrong answers into `savedMistakes`.
   - Show **Net Score (with Negative Marking breakdown)**, **Accuracy %**, **Time Spent**, and a **Topic-wise Performance Breakdown** showing which topics in the chapter were strong vs. weak.
   - Add a **"ভুল হওয়া প্রশ্নগুলো প্র্যাকটিস করো (Practice Missed Questions)"** button alongside `পুনরায় পরীক্ষা দাও` and `অগ্রগতি ড্যাশবোর্ড দেখুন`.

### 5.9 Personal Progress & Weakness Report (`/progress`)
Replace all static arrays with live computed analytics from `GET /student/overview` + `useUserStore`:
1. **Dynamic Metric Cards:**
   - **সিলেবাস কভারেজ (Syllabus Coverage):** Real `completedTopics / totalTopics` percentage and counts (`Xটির মধ্যে Yটি টপিক সম্পন্ন`).
   - **গড় নির্ভুলতা (Average Accuracy):** Real accuracy `%` across all practice & exam attempts (`মোট Xটি প্রশ্নের মধ্যে Yটি সঠিক`).
   - **মডেল টেস্ট ও স্ট্রিক (Exams & Streak):** Total completed exam sessions, latest exam score, and active study streak.
2. **Chapter-by-Chapter Mastery Matrix (Khan Academy Style):**
   - Visual list/grid of chapters in the active subject showing topic completion bars, chapter accuracy badge, and quick action links (`অনুশীলন` / `মডেল টেস্ট`).
3. **Dynamic Weak Topics Report:**
   - Lists topics where accuracy `< 60%` or unresolved mistakes exist, with live accuracy `%`, mistake count, `লেসন পড়ো` link, and `অনুশীলন করো` link. (Falls back to recommended next topics if the user has no weak topics yet).
4. **Interactive Mistake Notebook (ভুল প্রশ্নের নোটবুক):**
   - Renders real saved mistakes from `savedMistakes` / backend `dueMistakes`, with filter tabs (`অমীমাংসিত ভুল (Unresolved)` vs `সংশোধিত (Resolved)`), full KaTeX stem, wrong vs. correct answer comparison, concept note, and a **"✓ বুঝতে পেরেছি (Mark Resolved)"** button + **"আবার চেষ্টা করো (Retry)"** link.
5. **Recent Exam History Table/Cards:**
   - Shows recent `ExamSession` results with date, chapter name, score, and retake link.

---

## 6. What's Left to the Builder (Implementation Calls)
- Exact Tailwind color tokens (sticking to the project's established `indigo-600`, `emerald-600`, `amber-500`, `rose-600`, `slate-900` palette).
- Internal helper decomposition for merging server `/student/overview` payload with `useUserStore` persisted state.
- Keeping initial default seed state in `useUserStore` backward-compatible so existing unit tests that inspect `useUserStore.getState()` pass without modification.
