# Student Section UI/UX Improvisation & Dynamic Data Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all static student-facing mock data with a hybrid Backend Analytics API (`apps/api`) and reactive Local-First Learning Store (`apps/web`), while upgrading all 8 student screens and navigation with peer EdTech features (Chorcha, Shikho, Khan Academy, Brilliant).

**Architecture:** Enrich `CurriculumService` and `PracticeService` in NestJS and add a new `StudentModule` (`/student/overview`, `/student/lesson-complete`, `/student/mistakes/:questionId/resolve`) backed by `PrismaService` (`EventLog`, `RevisionMistake`, `ExamSession`). On the Next.js 15 frontend, extend `useUserStore` to persist and sync topic completion, practice mastery, saved mistakes, exam history, bookmarks, personal notes, and study dates, and connect all student pages to this live store + API.

**Tech Stack:** Next.js 15 (App Router, React 18), Zustand (`persist`), Tailwind CSS, Lucide React, KaTeX, NestJS 10, Prisma ORM, Vitest & React Testing Library.

**Spec:** `docs/superpowers/specs/2026-11-12-student-ui-ux-dynamic-design.md`

## Global Constraints

- Preserve all existing Bengali copy hooks required by existing tests: `বর্তমান বিষয়:`, `বিষয় নির্বাচন করুন`, `হোম`, `বিষয়সমূহ`, `অগ্রগতি`, `← অধ্যায় সূচিতে ফেরত যান`, `MCQ অনুশীলন শুরু করো`, `পাঠের শিখন যাচাই • MCQ অনুশীলন`, `এই টপিকের জন্য বর্তমানে কোনো MCQ প্রশ্ন পাওয়া যায়নি`, `সম্পূর্ণ অধ্যায় অনুশীলন করো`.
- Never show fabricated static percentages (`65%`, `78%`, `18/20`) when a student has 0 activity; compute real metrics dynamically from `useUserStore` + `/student/overview`.
- Maintain full bilingual support (`bn` / `en`) via `useLanguageStore` (`tr` and `toBanglaDigits`).
- Never break existing student or admin Vitest/Jest test suites (`navigation.test.tsx`, `practice-runner.test.tsx`, `student-lesson-page.test.tsx`, `shimmer-loading.test.tsx`).

## Review Focus

1. **Subject ID alias mismatch between frontend defaults and seeded DB:** Frontend uses `sub_ssc_physics` or `sub-ssc-phy` while DB may store `code: 'ssc_physics'` or a UUID; `CurriculumService.getChaptersBySubject` and `StudentService.getOverview` must resolve by `id` OR `code` alias so chapter/overview fetches never 404 on default subject IDs.
2. **Mistake resolution lifecycle:** Answering a previously missed question correctly in `PracticeService.submitPractice` (or locally in `useUserStore.recordPracticeAttempt`) must flip `resolved: true` instead of leaving the question stuck in the due-mistakes queue forever.
3. **Fresh guest user zero-activity state:** When a brand-new guest lands on `/dashboard` or `/progress` with zero `EventLog` or `useUserStore` history, division-by-zero (`0 / 0`) must never produce `NaN%`, and the "Continue Learning" card must point to a real curriculum topic (`top_ssc_physics_ch1_1`) rather than a dead link.
4. **Difficulty & mistake filter state in Practice Runner:** Filtering questions by difficulty (`EASY` / `MEDIUM` / `HARD`) or `mistakes` when `currentIndex` was on a higher index must clamp/reset `currentIndex` to `0` so `questions[currentIndex]` is never `undefined`.
5. **Keyboard shortcut collision with inputs:** Pressing `1`–`4` or `ArrowLeft`/`ArrowRight` inside a `<textarea>` or `<input>` (such as the Lesson Note scratchpad or Quick Search input) must not trigger option selection or question navigation.

---

### Task 1: Backend Curriculum Enrichment & Mistake Auto-Resolution (`apps/api`)

**Files:**
- Modify: `apps/api/src/modules/curriculum/curriculum.service.ts`
- Modify: `apps/api/src/modules/curriculum/curriculum.service.spec.ts`
- Modify: `apps/api/src/modules/practice/practice.controller.ts`
- Modify: `apps/api/src/modules/practice/practice.service.ts`
- Modify: `apps/api/src/modules/practice/practice.service.spec.ts`

**Interfaces:**
- Produces:
  - `CurriculumService.resolveSubject(subjectIdOrCode: string)` -> resolves subject by `id`, `code`, or normalized alias (`sub_ssc_physics` / `sub-ssc-phy` -> `ssc_physics`).
  - `GET /curriculum/subjects` -> returns `chapterCount`, `topicCount`, `publishedLessonCount`, `publishedQuestionCount` on each subject.
  - `GET /curriculum/subjects/:subjectId/chapters` -> returns chapters with `topics` enriched with `{ lessonCount: number, hasInteractiveLab: boolean, questionCount: number, cqCount: number }`.
  - `GET /practice/chapter/:chapterId/questions?topicId=...&difficulty=...&mode=mistakes` -> filters by optional `difficulty` (`EASY` | `MEDIUM` | `HARD`) and optional `mode === 'mistakes'` (when `userId` is present).
  - `PracticeService.submitPractice(dto, userId)` -> when `userId` is present and `isCorrect === true`, calls `prisma.revisionMistake.updateMany({ where: { userId, questionId: dto.questionId, resolved: false }, data: { resolved: true, attemptCount: { increment: 1 } } })`.

- [ ] **Step 1: Write failing unit tests in `curriculum.service.spec.ts` and `practice.service.spec.ts`**

Add tests in `apps/api/src/modules/curriculum/curriculum.service.spec.ts` asserting:
- `getSubjects()` returns `chapterCount`, `topicCount`, `publishedLessonCount`, and `publishedQuestionCount`.
- `getChaptersBySubject('sub-ssc-phy')` resolves via alias/code fallback when `findUnique({ where: { id } })` returns `null`, and maps each topic to include `lessonCount`, `hasInteractiveLab`, `questionCount`, and `cqCount`.

Add tests in `apps/api/src/modules/practice/practice.service.spec.ts` asserting:
- `submitPractice()` with `isCorrect === true` and authenticated `userId` calls `prisma.revisionMistake.updateMany` with `resolved: true`.
- `getChapterQuestions(chapterId, topicId, difficulty, mode, userId)` filters by `difficulty: 'HARD'` when passed, and filters by unresolved `mistakes: { some: { userId, resolved: false } }` when `mode === 'mistakes'` and `userId` is provided.

- [ ] **Step 2: Run the API unit tests to verify they fail**

Run: `pnpm --filter @pori/api test src/modules/curriculum/curriculum.service.spec.ts src/modules/practice/practice.service.spec.ts`
Expected: FAIL on missing enriched topic counts, alias lookup, and mistake resolution.

- [ ] **Step 3: Implement `CurriculumService` and `PracticeService` enhancements**

In `apps/api/src/modules/curriculum/curriculum.service.ts`:
- Add helper `resolveSubject(subjectIdOrCode: string)` checking `prisma.subject.findUnique({ where: { id } })`, then fallback `prisma.subject.findFirst({ where: { OR: [{ code: subjectIdOrCode }, { code: normalizedCode }] } })` where `sub_ssc_physics` / `sub-ssc-phy` maps to `ssc_physics` and `sub-ssc-chem` maps to `ssc_chemistry`.
- In `getSubjects(classLevel?)`, include chapters with topics/lessons/questions counts (or safe optional chaining when mocked in existing unit tests) and return `chapterCount`, `topicCount`, `publishedLessonCount`, `publishedQuestionCount`.
- In `getChaptersBySubject(subjectId)`, include `lessons: { where: { status: 'PUBLISHED' }, select: { id: true, interactiveWidgetUrl: true } }` and `questions: { where: { status: 'PUBLISHED' }, select: { id: true, type: true } }` under `topics`, mapping each topic to add `lessonCount`, `hasInteractiveLab`, `questionCount` (`MCQ` count), and `cqCount` (`CQ_CREATIVE` count) while omitting raw `lessons`/`questions` arrays.

In `apps/api/src/modules/practice/practice.controller.ts` & `practice.service.ts`:
- Add `@UseGuards(OptionalJwtAuthGuard)` to `getChapterQuestions`, accepting `@Query('difficulty') difficulty?: string`, `@Query('mode') mode?: string`, and `@Req() req?: { user?: any }`.
- In `PracticeService.getChapterQuestions(chapterId, topicId?, difficulty?, mode?, userId?)`, apply `where.difficulty = difficulty.toUpperCase()` if `difficulty` is in `['EASY', 'MEDIUM', 'HARD']`, and if `mode === 'mistakes' && userId`, apply `where.mistakes = { some: { userId, resolved: false } }`.
- In `PracticeService.submitPractice(dto, userId?)`, when `userId && isCorrect`, call `await this.prisma.revisionMistake.updateMany?.({ where: { userId, questionId: dto.questionId, resolved: false }, data: { resolved: true, attemptCount: { increment: 1 } } })`.

- [ ] **Step 4: Run the API unit tests to verify they pass**

Run: `pnpm --filter @pori/api test src/modules/curriculum/curriculum.service.spec.ts src/modules/practice/practice.service.spec.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add apps/api/src/modules/curriculum/ apps/api/src/modules/practice/
git commit -m "feat(api): enrich curriculum metadata and auto-resolve practice mistakes"
```

---

### Task 2: Backend Student Overview & Progress Module (`apps/api`)

**Files:**
- Create: `apps/api/src/modules/student/student.service.ts`
- Create: `apps/api/src/modules/student/student.controller.ts`
- Create: `apps/api/src/modules/student/student.module.ts`
- Create: `apps/api/src/modules/student/student.service.spec.ts`
- Modify: `apps/api/src/app.module.ts`

**Interfaces:**
- Produces:
  - `GET /student/overview?subjectId=...` -> returns:
    ```ts
    export interface StudentOverviewResponse {
      subjectId: string;
      curriculumTotals: {
        totalChapters: number;
        totalTopics: number;
        totalPublishedLessons: number;
        totalPublishedQuestions: number;
      };
      completedTopicIds: string[];
      lastStudiedTopic: {
        topicId: string;
        topicTitle: string;
        chapterId: string;
        chapterTitle: string;
        timestamp: string;
      } | null;
      practiceStats: {
        totalAttempts: number;
        correctAttempts: number;
        accuracyPercent: number;
        topicMastery: Record<string, { attempts: number; correct: number; accuracy: number }>;
      };
      streakDays: number;
      studyDates: string[];
      dueMistakes: Array<{
        id: string;
        questionId: string;
        attemptCount: number;
        updatedAt: string;
        topicId: string;
        topicTitle: string;
        chapterId: string;
        chapterTitle: string;
        stem: string;
        correctOptionText: string;
        conceptNote: string;
      }>;
      weakTopics: Array<{
        topicId: string;
        topicTitle: string;
        chapterId: string;
        chapterTitle: string;
        accuracy: number;
        mistakeCount: number;
      }>;
      recentExams: Array<{
        sessionId: string;
        chapterId: string | null;
        subjectId: string;
        score: number;
        totalQuestions: number;
        durationSeconds: number;
        completedAt: string | null;
      }>;
    }
    ```
  - `POST /student/lesson-complete` -> body `{ topicId: string; lessonId?: string; timeSpentSeconds?: number }`, logs `LESSON_COMPLETE` in `EventLog` when `req.user?.id` is present, returns `{ success: true, topicId }`.
  - `POST /student/mistakes/:questionId/resolve` -> marks `RevisionMistake` resolved for `{ userId, questionId }`, returns `{ success: true, questionId }`.

- [ ] **Step 1: Write failing unit tests in `apps/api/src/modules/student/student.service.spec.ts`**

Write unit tests covering:
- `getOverview('sub_ssc_physics', undefined)` (guest without userId): returns `curriculumTotals`, empty user arrays, `accuracyPercent: 0` (never `NaN`), and `streakDays: 0`.
- `getOverview('sub_ssc_physics', 'user-1')`: aggregates `LESSON_OPEN`/`LESSON_COMPLETE` events into `completedTopicIds` and `lastStudiedTopic`, computes `practiceStats` and `weakTopics` (`accuracy < 60` or unresolved mistakes), formats `dueMistakes` from `revisionMistake.findMany`, and calculates consecutive `streakDays` from `EventLog` + `ExamSession` dates.
- `markLessonComplete('user-1', { topicId: 'top_ssc_physics_ch1_1' })`: creates `EventLog` with `eventType: 'LESSON_COMPLETE'`.
- `resolveMistake('user-1', 'q-1')`: calls `revisionMistake.updateMany` with `resolved: true`.

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm --filter @pori/api test src/modules/student/student.service.spec.ts`
Expected: FAIL with module not found.

- [ ] **Step 3: Implement `StudentService`, `StudentController`, `StudentModule`, and register in `AppModule`**

Implement `apps/api/src/modules/student/student.service.ts`, `student.controller.ts` (protected with `@UseGuards(OptionalJwtAuthGuard)`), and `student.module.ts`, then add `StudentModule` to `imports` in `apps/api/src/app.module.ts`.

- [ ] **Step 4: Run all API tests to verify they pass**

Run: `pnpm --filter @pori/api test`
Expected: PASS across all API test suites.

- [ ] **Step 5: Commit**

```bash
git add apps/api/src/modules/student/ apps/api/src/app.module.ts
git commit -m "feat(api): add student overview, lesson completion, and mistake resolution endpoints"
```

---

### Task 3: Frontend Learning Store, Enriched Curriculum Data & Navigation Search/Bookmarks (`apps/web`)

**Files:**
- Modify: `apps/web/src/lib/curriculum-data.ts`
- Modify: `apps/web/src/store/user-store.ts`
- Modify: `apps/web/src/components/navigation/persistent-nav.tsx`
- Modify: `apps/web/tests/navigation.test.tsx`

**Interfaces:**
- Produces in `apps/web/src/lib/curriculum-data.ts`:
  - `TopicItem` extended with optional `lessonCount?: number`, `hasInteractiveLab?: boolean`, `questionCount?: number`, `cqCount?: number`.
  - `findAdjacentTopics(topicId: string, customChapters?: ChapterItem[]): { prevTopic: (TopicItem & { chapterTitle: string }) | null; nextTopic: (TopicItem & { chapterTitle: string }) | null; currentChapter: ChapterItem | null; topicIndex: number; totalInChapter: number }`.
- Produces in `apps/web/src/store/user-store.ts`:
  - State fields: `completedTopics`, `lastVisitedTopic`, `topicMastery`, `savedMistakes`, `examHistory`, `bookmarks`, `lessonNotes`, `studyDates`.
  - Actions: `recordLessonVisit`, `markTopicCompleted`, `recordPracticeAttempt`, `recordExamCompletion`, `resolveMistake`, `toggleBookmark`, `saveLessonNote`, `hydrateFromServerOverview`.

- [ ] **Step 1: Write failing tests in `apps/web/tests/navigation.test.tsx`**

Extend `apps/web/tests/navigation.test.tsx` to assert:
- All existing 4 `PersistentNav` tests still pass.
- Clicking the quick search trigger button (`দ্রুত অনুসন্ধান` / `Search`) opens the chapter & topic search dialog, filters topics by query (e.g., `ভৌত রাশি` or `ল্যাব`), and displays matching topic links (`/lesson/top_ssc_physics_ch1_1`).
- `useUserStore` actions (`markTopicCompleted`, `recordPracticeAttempt`, `resolveMistake`, `toggleBookmark`, `saveLessonNote`) update state accurately, resolve previously recorded mistakes when answered correctly, and never produce `NaN`.

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm --filter @pori/web test tests/navigation.test.tsx`
Expected: FAIL on missing search modal and missing store methods.

- [ ] **Step 3: Implement `curriculum-data.ts`, `user-store.ts`, and `persistent-nav.tsx`**

1. In `apps/web/src/lib/curriculum-data.ts`:
   - Add `hasInteractiveLab`, `lessonCount: 1`, and `questionCount: 5` metadata to `DEFAULT_CHAPTERS` topics (setting `hasInteractiveLab: true` on topics that have interactive labs, and providing `findAdjacentTopics(topicId, customChapters)`).
2. In `apps/web/src/store/user-store.ts`:
   - Add the new learning state properties and actions while keeping default `activeSubject` and `streakDays: 3` intact so existing tests remain 100% compatible.
3. In `apps/web/src/components/navigation/persistent-nav.tsx`:
   - Add the Quick Search button (`দ্রুত অনুসন্ধান`) + modal (supporting `⌘K` / `Ctrl+K` and `Escape` to close, searching `DEFAULT_CHAPTERS` topics and chapters with `⚡ ল্যাব` badges), a Bookmarks popover/drawer button showing bookmarked items count, and a compact streak badge—preserving all existing links and text (`বর্তমান বিষয়: ...`).

- [ ] **Step 4: Run the test to verify it passes**

Run: `pnpm --filter @pori/web test tests/navigation.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add apps/web/src/lib/curriculum-data.ts apps/web/src/store/user-store.ts apps/web/src/components/navigation/persistent-nav.tsx apps/web/tests/navigation.test.tsx
git commit -m "feat(web): add reactive learning store, topic adjacency helper, and nav quick search"
```

---

### Task 4: Dynamic Landing, Subjects & Curriculum Mastery Index (`apps/web`)

**Files:**
- Modify: `apps/web/src/app/page.tsx`
- Modify: `apps/web/src/app/subjects/page.tsx`
- Modify: `apps/web/src/app/curriculum/[subjectId]/page.tsx`
- Create: `apps/web/tests/student-catalog-curriculum.test.tsx`

**Interfaces:**
- Consumes: `useUserStore` (`completedTopics`, `topicMastery`, `bookmarks`, `toggleBookmark`, `lastVisitedTopic`), `DEFAULT_CHAPTERS` from `apps/web/src/lib/curriculum-data.ts`.
- Produces: Dynamic Landing page (`/`), Subject Catalog (`/subjects`), and Curriculum Mastery Index (`/curriculum/[subjectId]`).

- [ ] **Step 1: Write failing tests in `apps/web/tests/student-catalog-curriculum.test.tsx`**

Write tests asserting:
- `SubjectsPage` renders dynamic chapter/topic counts on ready subjects, supports searching subjects by name (`পদার্থবিজ্ঞান`), and shows the student's completion percentage when `completedTopics` has entries.
- `CurriculumPage` renders chapter completion progress (`১/৭ সম্পন্ন`), shows `⚡ ল্যাব` badges on interactive lab topics, shows `✓ সম্পন্ন` mastery badge on completed topics, filters topics via search input and filter pills (`⚡ ইন্টারেক্টিভ ল্যাব`, `অসম্পন্ন`, `বুকমার্ক করা`), and toggles topic bookmarks.

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm --filter @pori/web test tests/student-catalog-curriculum.test.tsx`
Expected: FAIL on missing search/filter controls, mastery badges, and chapter progress indicators.

- [ ] **Step 3: Implement `page.tsx`, `subjects/page.tsx`, and `curriculum/[subjectId]/page.tsx`**

1. In `apps/web/src/app/page.tsx`:
   - Display dynamic curriculum counts derived from `DEFAULT_CHAPTERS` (`১২টি অধ্যায়`, total topics, interactive labs), add a "পড়া চালিয়ে যাও (ড্যাশবোর্ড)" shortcut when `user` or `lastVisitedTopic` exists, and polish the value cards.
2. In `apps/web/src/app/subjects/page.tsx`:
   - Add a search input alongside the `ALL` / `SSC` / `HSC` filter tabs, show chapter & topic counts on each subject card, and render a live mastery progress bar for ready subjects based on `completedTopics`.
3. In `apps/web/src/app/curriculum/[subjectId]/page.tsx`:
   - Add search input + filter pills (`সব টপিক`, `⚡ ইন্টারেক্টিভ ল্যাব`, `অসম্পন্ন`, `বুকমার্ক করা`).
   - Show overall subject completion progress bar in the header and per-chapter completion badge (`X/Y সম্পন্ন`) + progress bar in each chapter header.
   - On each topic row, render mastery badge (`✓ সম্পন্ন`, `⏳ চলমান`, `⚠️ রিভিশন প্রয়োজন`), `⚡ ল্যাব` badge when `topic.hasInteractiveLab || topic.titleBangla.includes('Lab')`, MCQ count pill when available, and a bookmark toggle button (`e.stopPropagation(); e.preventDefault()`).

- [ ] **Step 4: Run the test to verify it passes**

Run: `pnpm --filter @pori/web test tests/student-catalog-curriculum.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add apps/web/src/app/page.tsx apps/web/src/app/subjects/page.tsx apps/web/src/app/curriculum/\[subjectId\]/page.tsx apps/web/tests/student-catalog-curriculum.test.tsx
git commit -m "feat(web): upgrade landing, subjects catalog, and curriculum mastery index"
```

---

### Task 5: Connected Lesson Reader, Smart Practice Runner & Exam Analytics (`apps/web`)

**Files:**
- Modify: `apps/web/src/app/lesson/[topicId]/page.tsx`
- Modify: `apps/web/src/app/practice/[chapterId]/page.tsx`
- Modify: `apps/web/src/app/exam/[chapterId]/page.tsx`
- Modify: `apps/web/tests/student-lesson-page.test.tsx`
- Modify: `apps/web/tests/practice-runner.test.tsx`

**Interfaces:**
- Consumes: `useUserStore` (`recordLessonVisit`, `markTopicCompleted`, `recordPracticeAttempt`, `recordExamCompletion`, `toggleBookmark`, `saveLessonNote`, `completedTopics`, `bookmarks`, `lessonNotes`, `savedMistakes`), `findTopicHierarchy` & `findAdjacentTopics` from `apps/web/src/lib/curriculum-data.ts`.

- [ ] **Step 1: Write failing tests in `student-lesson-page.test.tsx` and `practice-runner.test.tsx`**

In `apps/web/tests/student-lesson-page.test.tsx`, add tests asserting:
- Opening a lesson records `lastVisitedTopic` in `useUserStore` and renders **পূর্ববর্তী টপিক** / **পরবর্তী টপিক** navigation links from `findAdjacentTopics`, plus the **পাঠ সম্পন্ন করুন** (`Mark Complete`), **বুকমার্ক** (`Bookmark`), and **আমার নোট** (`My Note`) controls.
- Clicking **পাঠ সম্পন্ন করুন** marks the topic completed in `useUserStore` (`✓ পাঠ সম্পন্ন`).

In `apps/web/tests/practice-runner.test.tsx`, add tests asserting:
- Filtering by difficulty (`সহজ`, `মধ্যম`, `কঠিন`) filters the displayed question list and resets `currentIndex` to `0` without crashing when starting from a higher index.
- Answering a question records the attempt in `useUserStore` (`topicMastery` and `savedMistakes` on wrong answer).
- Completing the final question renders the Practice Session Summary card with accuracy `%` and a retry-mistakes button when wrong answers exist.

- [ ] **Step 2: Run the tests to verify they fail**

Run: `pnpm --filter @pori/web test tests/student-lesson-page.test.tsx tests/practice-runner.test.tsx`
Expected: FAIL on missing lesson completion/adjacent topic controls and practice difficulty filter/summary card.

- [ ] **Step 3: Implement `lesson/[topicId]/page.tsx`, `practice/[chapterId]/page.tsx`, and `exam/[chapterId]/page.tsx`**

1. In `apps/web/src/app/lesson/[topicId]/page.tsx`:
   - Call `recordLessonVisit` when lesson loads.
   - Add sticky reading progress bar, breadcrumb + chapter topics switcher dropdown/drawer, action bar with **পাঠ সম্পন্ন করুন / ✓ পাঠ সম্পন্ন**, **বুকমার্ক**, and collapsible **আমার নোট** scratchpad (`saveLessonNote`), section jump pills, `recordPracticeAttempt` on Quick Practice answer, and **পূর্ববর্তী টপিক / পরবর্তী টপিক** cards above the existing bottom CTA bar.
2. In `apps/web/src/app/practice/[chapterId]/page.tsx`:
   - Add Difficulty filter pills (`সব`, `সহজ`, `মধ্যম`, `কঠিন`) and Mistake filter pill (`ভুল প্রশ্ন রিভিউ`) that safely reset `currentIndex` to `0`.
   - Add question difficulty badge, bookmark button, keyboard shortcuts (`1`–`4`, `ArrowLeft`, `ArrowRight`, ignoring events when `['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)`), `recordPracticeAttempt` call on answer selection, and an interactive **অনুশীলন সারসংক্ষেপ (Practice Summary)** card when all questions in the active filter are answered (with **ভুল প্রশ্নগুলো আবার অনুশীলন করো** button).
3. In `apps/web/src/app/exam/[chapterId]/page.tsx`:
   - Display resolved chapter title in the exam header, support keyboard navigation (`1`–`4`, `F`, `ArrowLeft`/`ArrowRight`), call `recordExamCompletion` and `recordPracticeAttempt` for missed questions upon exam submission, and render a **টপিকভিত্তিক ফলাফল বিশ্লেষণ (Topic-wise Performance Breakdown)** + **ভুল হওয়া প্রশ্নগুলো প্র্যাকটিস করো** button on the Result Sheet.

- [ ] **Step 4: Run the tests to verify they pass**

Run: `pnpm --filter @pori/web test tests/student-lesson-page.test.tsx tests/practice-runner.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add apps/web/src/app/lesson/\[topicId\]/page.tsx apps/web/src/app/practice/\[chapterId\]/page.tsx apps/web/src/app/exam/\[chapterId\]/page.tsx apps/web/tests/student-lesson-page.test.tsx apps/web/tests/practice-runner.test.tsx
git commit -m "feat(web): add connected lesson reader, smart practice filters, and exam breakdown"
```

---

### Task 6: Dynamic Student Command-Center Dashboard & Personal Progress Report (`apps/web`)

**Files:**
- Modify: `apps/web/src/app/dashboard/page.tsx`
- Modify: `apps/web/src/app/progress/page.tsx`
- Create: `apps/web/tests/student-dashboard-progress.test.tsx`

**Interfaces:**
- Consumes: `GET /student/overview?subjectId=...` via `apiClient.get`, `useUserStore` (`hydrateFromServerOverview`, `completedTopics`, `lastVisitedTopic`, `topicMastery`, `savedMistakes`, `resolveMistake`, `examHistory`, `bookmarks`, `streakDays`, `studyDates`), and `DEFAULT_CHAPTERS` from `apps/web/src/lib/curriculum-data.ts`.

- [ ] **Step 1: Write failing tests in `apps/web/tests/student-dashboard-progress.test.tsx`**

Write tests asserting:
- `DashboardPage` with fresh store state (0 activity) never shows `NaN%`, links the primary "Continue Learning" CTA to the first real curriculum topic (`/lesson/top_ssc_physics_ch1_1`) or `lastVisitedTopic` when present, and displays real unresolved mistakes from `useUserStore.savedMistakes` in the Spaced Repetition card with working review links.
- `DashboardPage` hydrates from `GET /student/overview` when the API returns server progress data.
- `ProgressPage` computes real syllabus coverage (`completedTopics` / total curriculum topics) and real average accuracy from `topicMastery` instead of hardcoded `65%` / `78%`.
- `ProgressPage` renders the Chapter Mastery Matrix, dynamic Weak Topics Report, Recent Exam History, and Mistake Notebook where clicking `✓ বুঝতে পেরেছি` calls `resolveMistake` and moves the mistake to the resolved tab.

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm --filter @pori/web test tests/student-dashboard-progress.test.tsx`
Expected: FAIL because `DashboardPage` and `ProgressPage` currently render hardcoded static strings.

- [ ] **Step 3: Implement `dashboard/page.tsx` and `progress/page.tsx`**

1. In `apps/web/src/app/dashboard/page.tsx`:
   - Fetch `/student/overview?subjectId=${activeSubject?.id || 'sub_ssc_physics'}` on mount and call `hydrateFromServerOverview(res)` when available; also fetch chapters or use `DEFAULT_CHAPTERS` to know the full topic list.
   - Render Hero Welcome banner with dynamic `streakDays`, **7-Day Activity Strip**, and overall Syllabus Completion bar (`completedCount / totalTopics`).
   - Render dynamic **পরবর্তী প্রস্তাবিত পাঠ / পড়া চালিয়ে যান** card pointing to `lastVisitedTopic` (if present) or the first uncompleted topic in the curriculum (`top_ssc_physics_ch1_1`), with direct lesson & topic practice links.
   - Render dynamic **রিভিশন প্রয়োজন (স্পেসড রিপিটেশন)** card driven by unresolved `savedMistakes` grouped by topic/chapter (or a clean "সকল ভুল সংশোধিত!" card with recommended practice topics when 0 mistakes exist).
   - Render **বুকমার্ক ও কুইক স্টাডি হাব** with saved bookmarks and dynamic links to the active subject's curriculum, chapter exam, progress report, and subject switcher.
2. In `apps/web/src/app/progress/page.tsx`:
   - Fetch `/student/overview` and merge with `useUserStore`.
   - Compute real **সিলেবাস কভারেজ**, **গড় নির্ভুলতা (Accuracy)**, and **অনুশীলন ও মডেল টেস্ট** cards from `completedTopics`, `topicMastery`, and `examHistory` (showing `০%` cleanly when 0 attempts exist).
   - Render **অধ্যায়ভিত্তিক দক্ষতা ম্যাট্রিক্স (Chapter Mastery Matrix)** showing each chapter's completed topics, accuracy %, and quick Practice / Exam buttons.
   - Render dynamic **দুর্বল টপিক রিপোর্ট** (topics with accuracy `< 60%` or unresolved mistakes, or starter topic recommendations if no weak topics yet).
   - Render interactive **ভুল প্রশ্নের নোটবুক (Mistake Notebook)** with `অমীমাংসিত ভুল` / `সংশোধিত` filter tabs, `✓ বুঝতে পেরেছি` resolve button, and **সাম্প্রতিক মডেল টেস্ট হিস্ট্রি (Recent Exam History)**.

- [ ] **Step 4: Run the full web and API test suites to verify everything passes**

Run: `pnpm --filter @pori/web test && pnpm --filter @pori/api test`
Expected: PASS across all test suites in both `@pori/web` and `@pori/api`.

- [ ] **Step 5: Commit**

```bash
git add apps/web/src/app/dashboard/page.tsx apps/web/src/app/progress/page.tsx apps/web/tests/student-dashboard-progress.test.tsx
git commit -m "feat(web): make student dashboard and progress analytics 100% dynamic"
```
