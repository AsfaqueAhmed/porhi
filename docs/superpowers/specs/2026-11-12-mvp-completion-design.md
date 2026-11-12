# Design Spec: poRi MVP Completion (Account/OTP Sync, Content Error Reports, Exam Setup/Resume, CQ Self-Assessment & Unified Events)

**Date:** 2026-11-12  
**Branch:** `feat/mvp-completion`  
**Status:** Approved to execute on feature branch (non-breaking MVP completion)  
**Parent Spec:** [2026-11-08-pori-platform-design.md](./2026-11-08-pori-platform-design.md) (Section 0 & Section 5)

---

## 1. Intent, Goals & Constraints

### Intent
Close the remaining launch-critical gaps from Section 0 and Section 5 of the platform design specification so a student can seamlessly explore as a guest, back up and sync all progress (lessons, mistakes, exams, bookmarks, notes) via phone OTP on `/account`, configure and resume interrupted chapter/topic/weak-area tests with negative marking and full lesson-linked results, self-assess published Creative Questions (`CQ_CREATIVE`), and report content errors or give Bengali explanation feedback that editors/reviewers can triage in Admin.

### Non-Goals (Deferred to v1.1 / v1.2 / Later)
- Multi-subject exam rehearsals, v1.1 subject model tests, spaced-repetition scheduling algorithms, IndexedDB offline lesson/test downloading, audio lessons, AI handwritten grading, multiplayer duels, and bKash/Nagad payments.

### Backward-Compatibility & Anti-Regression Constraints
- **Zero breakage of existing routes, APIs, or tests:**
  - `GET /practice/chapter/:chapterId/questions` without a `type` query param continues to return `MCQ` questions only (with `explanation` and `isCorrect` stripped).
  - `POST /exam/start` with `{ testType, subjectId, chapterId }` continues to accept and execute identically when optional setup fields (`questionLimit`, `mode`) are omitted.
  - `GET /student/overview` keeps every existing top-level field unchanged; any new sync fields (`bookmarks`, `lessonNotes`) are optional so existing consumers and unit-test mocks stay valid.
  - `PersistentNav` retains the three core destinations (`হোম`, `বিষয়সমূহ`, `অগ্রগতি`) and active subject banner.
  - `LessonPage` retains `← অধ্যায় সূচিতে ফেরত যান` and `MCQ অনুশীলন শুরু করো` links and `/practice/submit` behavior.

---

## 2. Approaches Considered

1. **Client-only localStorage shims** — Fast, but bookmarks, notes, content reports, and interrupted exam sessions would never persist across devices or reach editors/reviewers. Rejected because MVP requires guest-to-OTP sync and editor triage.
2. **Additive Schema + Optional-Param Backend Extensions + Modular Student/Admin Pages (Selected)** — Extends `schema.prisma` with `ContentReport`, `StudentBookmark`, and `StudentNote`; adds backward-compatible optional query/DTO fields on `PracticeModule` and `ExamModule`; adds `/account`, `/content-report`, `/exam/result/[sessionId]`, and `/admin/reports`; and fixes `guestId` preservation + auto-guest bootstrap on the client. Preserves 100% of existing API contracts and tests.

---

## 3. Component Design

### Track A: Account, Settings, Profile & Cross-Device OTP Sync
- **Prisma (`schema.prisma`):** Add `StudentBookmark` (`userId`, `itemId`, `itemType`, `titleBangla`, `subtitleBangla`, `href`, `@@unique([userId, itemId, itemType])`) and `StudentNote` (`userId`, `topicId`, `content`, `@@unique([userId, topicId])`).
- **Auth (`apps/api/src/modules/auth`):**
  - Add `PATCH /auth/profile` (guarded by `JwtAuthGuard`) allowing authenticated guests/students to update `fullName` and `selectedClass` (`SSC` | `HSC`).
  - Extend `AuthService.verifyOtp` guest migration transaction to also merge `StudentBookmark` and `StudentNote` from `guestUser` into `existingUserWithPhone` without overwriting existing phone user notes/bookmarks.
  - Fix `apps/web/src/app/page.tsx`: persist `setGuestId(res.user?.guestId || generatedGuestId)` when `POST /auth/guest` succeeds.
  - Add `ensureGuestSession()` utility in `apps/web/src/lib/guest-session.ts` so direct visits to protected endpoints (such as `POST /exam/start`) automatically establish a real guest JWT + `guestId` if missing.
- **Student Sync (`apps/api/src/modules/student`):**
  - Add `POST /student/bookmarks/toggle`, `PUT /student/notes/:topicId`, and `POST /student/feedback` (Bengali explanation helpfulness logged in `EventLog`).
  - Include optional `bookmarks` and `lessonNotes` in `StudentOverviewResponse` (using optional-chaining guards for Prisma test mocks).
- **Web (`/account` + `PersistentNav`):**
  - New `apps/web/src/app/account/page.tsx`: displays Guest vs Phone-Verified status, Phone OTP backup/sync form (`guestId` passed to `/auth/verify-otp` followed by `/student/overview` hydration), `fullName` & `selectedClass` settings editor, bookmarks & personal notes drawer/list, link to `/content-report`, and logout action.
  - Add compact account/sync icon link (`/account`) in `PersistentNav` utility area without changing the three core nav items.

### Track B: Content Error Reporting, Bengali Feedback & Admin Triage
- **Prisma (`schema.prisma`):** Add `ReportStatus` (`OPEN`, `IN_REVIEW`, `RESOLVED`, `DISMISSED`) and `ContentReport` (`id`, `userId?`, `contentType`, `contentId`, `topicId?`, `category`, `description`, `status`, `resolutionNote?`, `resolvedById?`, `resolvedAt?`, `createdAt`, `updatedAt`).
- **Backend:**
  - `ContentReportModule` (`apps/api/src/modules/content-report`):
    - `POST /content-reports` (`OptionalJwtAuthGuard`): creates report, logs `CONTENT_ERROR_REPORTED` in `EventLog` if `userId` present.
    - `GET /content-reports/mine` (`OptionalJwtAuthGuard`): returns current user's submitted reports.
  - `ContentAdminController`:
    - `GET /admin/content/reports` (`@Roles(Role.EDITOR, Role.REVIEWER, Role.ADMIN)`): lists reports with status filter and computes open count + average resolution time (hours) from `createdAt` -> `resolvedAt`.
    - `PATCH /admin/content/reports/:id` (`@Roles(Role.EDITOR, Role.REVIEWER, Role.ADMIN)`): resolves/dismisses/marks `IN_REVIEW` with `resolutionNote`, sets `resolvedAt`/`resolvedById`, and optionally moves the referenced `Lesson` or `Question` to `ContentStatus.CORRECTION`.
- **Web:**
  - Reusable `ReportContentModal` (`apps/web/src/components/student/report-content-modal.tsx`) used on `/lesson/[topicId]`, `/practice/[chapterId]`, and `/exam/[chapterId]` results (also persists local history for offline fallback).
  - Inline Bengali explanation helpfulness control (`"ব্যাখ্যাটি কি সহজবোধ্য ছিল?"` 👍 / 👎) on `/lesson/[topicId]` and `/practice/[chapterId]` calling `POST /student/feedback`.
  - Dedicated `/content-report` page (`apps/web/src/app/content-report/page.tsx`) for submitting and tracking error reports.
  - Admin `/admin/reports` page (`apps/web/src/app/admin/reports/page.tsx`) + `AdminSidebar` item & `AdminTopbar` breadcrumb.

### Track C: Exam Setup, Local Autosave/Resume & Full Result Breakdown
- **Backend (`apps/api/src/modules/exam`):**
  - Extend `StartExamDto` with optional `questionLimit?: number` and `mode?: 'ALL' | 'WEAK_AREA'`. When omitted, `ExamService.startExam` executes the exact existing query. When `mode === 'WEAK_AREA'` or `questionLimit` is set, prioritize/filter unresolved mistake questions for that `userId` (falling back cleanly to chapter questions if none) and slice to `questionLimit`.
  - Include `topicId` and `options` text map in `submitExam` / `getSession` completed results while keeping all existing fields intact.
- **Web (`apps/web/src/app/exam/[chapterId]/page.tsx` + `/exam/result/[sessionId]/page.tsx`):**
  - Add Setup Step before launching `POST /exam/start`: Test Type (`CHAPTER_TEST` | `TOPIC_TEST` | `WEAK_AREA` using `TOPIC_TEST` or `CHAPTER_TEST` + `mode`), Topic selector, Question count (`5`, `10`, `20`, `সবগুলো`), Duration, and Negative Marking (`0`, `0.25`, `0.50` — defaulting to blueprint `0.25`).
  - Save active session metadata + answers + flags + per-question `timeSpent` to `localStorage` (`pori_active_exam_<chapterId>`); detect and offer **Resume Active Exam** via `GET /exam/session/:sessionId` with remaining timer calculated from `startedAt` and `durationSeconds` (auto-submitting if expired or resuming seamlessly).
  - Ensure `ensureGuestSession()` runs before `POST /exam/start` if user has no token.
  - Track active seconds spent per question in `timeSpentMap` and include in heartbeat + submit payloads.
  - Result Sheet: display net score with negative deduction (`negativeDeduction`), per-question time spent, direct `"পাঠ দেখো"` link to `/lesson/${q.topicId}`, and `"ভুল রিপোর্ট করো"` action.
  - Add `/exam/result/[sessionId]/page.tsx` to inspect any completed exam from `/progress` or `/dashboard`.

### Track D: Creative Question (`CQ_CREATIVE`) Self-Assessment & Unified Events
- **Backend (`apps/api/src/modules/practice`):**
  - Extend `PracticeService.getChapterQuestions` with optional `type?: 'MCQ' | 'CQ_CREATIVE' | 'ALL'` (default `'MCQ'`, keeping existing behavior untouched). When returning `CQ_CREATIVE` items, expose `cqRubric`, `explanation`, `boardSource`, `isVerified` for self-assessment.
  - Add `POST /practice/cq-self-assess` (`OptionalJwtAuthGuard`) accepting `{ questionId, selfScores: { ka, kha, ga, gha }, totalScore, maxScore }`: logs `CQ_SELF_ASSESS` in `EventLog` and records/resolves `RevisionMistake` if authenticated (< 50% marks unresolved, >= 70% marks resolved).
- **Web (`apps/web/src/app/practice/[chapterId]/page.tsx` & `/lesson/[topicId]/page.tsx`):**
  - Add question type toggle (`MCQ` | `সৃজনশীল (CQ)`) on `/practice/[chapterId]` (defaulting to `MCQ`). Render `CQ_CREATIVE` stems, optional student scratchpad, reveal toggle for `cqRubric` (`ক`, `খ`, `গ`, `ঘ`) + model `stepDerivation`, and self-score selector saving via `POST /practice/cq-self-assess`.
  - Track active reading seconds in `/lesson/[topicId]` and send `timeSpentSeconds` in `POST /student/lesson-complete`.
