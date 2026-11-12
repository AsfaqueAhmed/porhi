# Design Spec: porhi Flutter Student Mobile App (User-Only)

**Date:** 2026-11-12  
**Status:** Ready for User Approval (Builder-Checked)  
**Scope:** Full student-facing **porhi** Flutter mobile app (`apps/mobile`, **Android-first**, iOS-compatible codebase without App Store Sign-in-with-Apple / deletion scope in this milestone) + Firebase Authentication bridge (`POST /auth/firebase`) in `apps/api`

---

## 1. Intent and Why

The platform already has a NestJS + Prisma backend (`apps/api`) and a Next.js web application (`apps/web`) covering the complete student learning loop through Phase 2: 5 curriculum tracks (`CLASS_6_8`, `SSC`, `HSC`, `ADMISSION`, `BCS`), rich Bengali/English lessons with KaTeX math, audio lessons, 27 interactive HTML physics simulations, MCQ practice with 6-layer explanations, Creative Question (CQ) self-assessment rubrics, chapter/subject model tests, multi-paper exam rehearsals, verified board question archive, 7-day study planner, offline chapter packs, bookmarks/notes, content reporting, and parent/teacher share links.

This project brings the **entire student-facing experience** to a native **porhi** Flutter mobile client (`apps/mobile`, package `porhi`, Android application ID `com.porhi.app`) while:
- **Branding the mobile client as `porhi` everywhere** (display name, Dart package `porhi`, `com.porhi.app`), while keeping existing monorepo directories (`apps/api`, `apps/web`, `apps/mobile`) and JS package scopes intact so existing web/API code and tests remain unbroken.
- **Replacing guest/in-memory OTP login on mobile with Firebase Authentication (Google Sign-In + Phone OTP) upfront** — no guest mode on mobile.
- **Targeting Android first** for this milestone (keeping Flutter code clean and cross-platform iOS-compatible, while deferring Apple App Store-specific requirements such as Sign in with Apple and in-app account deletion).
- **Excluding all admin/editor/reviewer features** (`/admin/*`) so the mobile binary is strictly for students ("user-only").
- **Delivering native mobile ergonomics**: fast scrolling, reliable offline SQLite storage for downloaded chapters and exam autosave/resume, background-capable lesson audio + TTS fallback, and native local notifications for study planner reminders.

---

## 2. Goals, Non-Goals, and Anti-Goals

### Goals
- **Upfront Firebase Auth (Google + Phone OTP):** Authenticate students via Firebase Auth on mobile, exchange the Firebase ID token for a porhi JWT at `POST /auth/firebase`, and support profile completion (`fullName`, `selectedClass` / default program) for newly registered users.
- **100% Student Feature Parity:** Implement every student workflow currently available in `apps/web` and `apps/api`:
  1. Login & Profile Onboarding (Google Sign-In, Phone OTP, Account/Profile edit, Logout)
  2. Home Command-Center Dashboard (dynamic streak, 7-day activity strip, syllabus progress, continue learning card, due mistake revision queue, today's study plan, quick shortcuts)
  3. Subjects Catalog & Program Tracks (`ALL`, `CLASS_6_8`, `SSC`, `HSC`, `ADMISSION`, `BCS`), keyword search, Ready vs Coming Soon states
  4. Curriculum Index (chapters, topics, mastery status icons, interactive lab badges, chapter progress bars, topic search/filter pills, bookmark toggle, offline chapter pack download/refresh/remove)
  5. Connected Lesson Reader (Markdown + KaTeX math, inline `<audio>`, `<video>`, `![img]` lightbox, `LessonAudioPlayer` + device TTS fallback, sandboxed HTML interactive lab WebView with fullscreen & offline cache, important terms, worked example, memory aid, quick practice MCQ, personal scratchpad note, bookmark toggle, mark complete, prev/next topic cards, chapter topic switcher, content error report modal)
  6. Smart MCQ Practice & CQ Self-Assessment (topic or chapter scope, difficulty filter, mistake-retry mode, instant grading, 6-layer explanation accordion, CQ ক/খ/গ/ঘ model answer & rubric self-check, session summary with retry-mistakes flow)
  7. Timed Exams & Multi-Paper Rehearsal (Chapter Test, Topic Test, Weak-Area Test, Full Subject Model Test with configurable negative marking, countdown timer, question navigator palette, review flag, autosave & crash/close resume, percentile result view; Multi-Paper Rehearsal presets & custom builder, paper stepper, intermission screen, combined multi-paper analytics)
  8. Verified Board Question Archive (10 canonical boards, year chips `2020–2025` & `2024+`, program/subject/type/verified filters, debounced keyword search, interactive solve + 6-layer explanation / CQ rubric)
  9. Study Planner & Local Device Reminders (Today/Week agenda, custom task CRUD, smart 7-day auto-generator, local scheduled notifications via `flutter_local_notifications`)
  10. Progress Analytics, Bookmarks, Content Reports & Guardian Share Links (KPIs, exam history filter + score trend chart, weak topics, bookmarks hub, submitted content reports, create/copy/share/revoke Parent & Teacher read-only links)
  11. Offline Chapter Packs & Sync Queue (SQLite/Drift storage for downloaded lessons, questions, HTML simulations, and audio; offline lesson reading, practice, and timed chapter tests; automatic/manual flush via `POST /student/sync-offline`)
  12. Bilingual UI (`bn` / `en`) with Bangla numerals (`০–৯`) and Account/Settings.

### Non-Goals
- **No Admin/Editor/Reviewer UI:** Content creation, review queues, media upload admin, and report moderation stay exclusively on `apps/web` (`/admin/*`).
- **No Guest Mode on Mobile:** Students must sign in with Google or Phone OTP before entering the app (`POST /auth/guest` is not exposed in the Flutter UI).
- **No Public Apple App Store Submission Scope in This Milestone:** Since this milestone is **Android-first**, Apple App Store-mandated flows (Sign in with Apple alongside Google Sign-In, and in-app account deletion `DELETE /auth/account`) are deferred. Standard Flutter UI/packages remain iOS-compatible.
- **No Deferred Roadmap Modules:** Do not build AI handwritten OCR grading, RAG AI tutor chat, real-time 1v1 WebSocket duels, or bKash/Nagad billing.
- **No Breaking Changes to Web/Admin Auth:** Existing `POST /auth/guest`, `POST /auth/request-otp`, `POST /auth/verify-otp`, `POST /auth/admin/login`, `JwtAuthGuard`, and `OptionalJwtAuthGuard` continue working for `apps/web` and existing API test suites.

### Anti-Goals
- Never display static/mocked progress percentages or placeholder exam histories—all metrics reflect live API + synced local activity.
- Never allow a WebView-only wrapper of the Next.js site; core navigation, math/lessons, practice, exams, planner, and progress are native Flutter UI.
- Never let a Firebase token expiry break an offline exam or lose queued offline activity.

---

## 3. Constraints

- **Monorepo Compatibility:** The Flutter app lives at `apps/mobile/` (Dart package name `porhi`, Android application ID `com.porhi.app`). Because `pnpm-workspace.yaml` uses `'apps/*'`, `apps/mobile` must not break `pnpm -r build`, `pnpm -r test`, or `pnpm -r lint` (avoid adding a conflicting JS `package.json` inside `apps/mobile`).
- **Flutter Toolchain & Platform Target:** Target Flutter `3.44.8`+ (stable), Dart null-safety, **Android-first** (while keeping Flutter code clean and cross-platform for later iOS builds).
- **Relative Media & Simulation URLs:** Backend responses return relative paths such as `/uploads/interactive/...html`, `/uploads/...`, or `/audio/lesson-intro.wav`. Mobile must resolve relative URLs against `API_BASE_URL` cleanly (and fall back to bundled/cached assets when offline).
- **Guardian Share Web Origin (Our Call):** `StudentService.formatShareLink` returns relative `sharePath` (`/guardian/<shareCode>`), while in production (`docker-compose.prod.yml`) the API is mounted under `/api` and Next.js serves `/guardian/[shareCode]` at the root web origin. Mobile will configure `WEB_BASE_URL` in `apps/mobile/lib/app/env.dart` (overridable via `--dart-define=WEB_BASE_URL=...`, defaulting by stripping trailing `/api` from `API_BASE_URL` in production or `http://localhost:3000` in dev) rather than altering the backend share-link contract.
- **Offline Pack Completeness:** Existing `CurriculumService.getOfflineChapterPack` in `apps/api/src/modules/curriculum/curriculum.service.ts` must map `cqRubric` and `boardSource` on `Question` records accurately (currently it reads `q.modelAnswer` / `q.rubric`, whereas Prisma's `Question` model stores `cqRubric` and `boardSource`) so offline CQ/board questions work seamlessly.
- **Firebase Provisioning:** Live Google Sign-In and Phone OTP require Firebase project config (`google-services.json`, SHA-1/SHA-256 for `com.porhi.app`, and backend `FIREBASE_SERVICE_ACCOUNT` or ADC env vars). All auth services must sit behind clean repository abstractions so unit/widget/API tests run deterministically without live Firebase network calls.

---

## 4. Approaches Considered

1. **Approach 1 (Selected): Monorepo `apps/mobile` + Native-First Flutter + Backend Token-Exchange (`POST /auth/firebase`)**
   - Feature-first Flutter app (`flutter_riverpod`, `go_router`, `dio`, `drift`, `flutter_math_fork`, `just_audio`, `flutter_tts`, `flutter_local_notifications`, `webview_flutter` for HTML labs only) exchanging Firebase ID tokens for porhi JWTs at `POST /auth/firebase`.
   - *Why chosen:* Preserves all existing NestJS guards and web/admin auth flows untouched, delivers fast native UX and low memory usage on budget Android phones, keeps API/docs unified in one repo, and isolates porhi JWT lifetime from 1-hour Firebase ID token expiries during offline sessions.
2. **Approach 2: Monorepo `apps/mobile` + WebView-Backed Content Renderer + Backend Token-Exchange**
   - Same architecture except all lesson explanations, tables, media tags, and 6-layer explanations render inside an embedded HTML/KaTeX WebView template.
   - *Why rejected:* Introduces WebView initialization lag and high RAM overhead when swiping rapidly across MCQ practice and exam questions.
3. **Approach 3: Direct Firebase Token Verification in NestJS Guards + Separate Mobile Repo**
   - Standalone Flutter repo; replaces/dual-wires `JwtStrategy` in `apps/api` to verify Firebase ID tokens on every request without issuing a porhi JWT.
   - *Why rejected:* Touches shared auth guards used by web/admin, complicates offline token persistence, and splits the mobile app away from monorepo specs and API definitions.

---

## 5. Architecture & Technical Design

### 5.1 Monorepo & Flutter Project Structure (`apps/mobile/`)

```text
apps/mobile/                         # Dart package: porhi | Android ID: com.porhi.app
├── pubspec.yaml                     # name: porhi
├── android/                         # applicationId "com.porhi.app", app label "porhi"
├── ios/                             # Flutter standard iOS runner (deferred App Store release)
├── assets/
│   ├── audio/lesson-intro.wav       # Bundled fallback matching pilot web audio
│   └── fonts/                       # Noto Sans Bengali / Hind Siliguri + Inter
├── lib/
│   ├── main.dart
│   ├── app/
│   │   ├── app.dart                 # MaterialApp.router, theme, localization (title: 'porhi')
│   │   ├── router.dart              # go_router with auth guard & 4-tab shell
│   │   └── env.dart                 # API_BASE_URL & WEB_BASE_URL flavor config
│   ├── core/
│   │   ├── network/                 # Dio client, JWT + Firebase refresh interceptor
│   │   ├── storage/                 # flutter_secure_storage + SharedPreferences
│   │   ├── database/                # Drift (SQLite) schema, DAOs, migrations
│   │   ├── sync/                    # Connectivity listener & OfflineSyncService
│   │   ├── notifications/           # flutter_local_notifications + timezone scheduler
│   │   ├── i18n/                    # bn/en strings + Bangla digit formatter
│   │   ├── theme/                   # Indigo/Emerald/Slate Material 3 theme
│   │   └── widgets/
│   │       ├── rich_content/        # Tag tokenizer (<audio>, <video>, ![img]), Markdown + KaTeX
│   │       ├── interactive_lab/     # webview_flutter simulation card + fullscreen + cache
│   │       ├── lesson_audio_player.dart # just_audio + flutter_tts fallback
│   │       └── streak_pill.dart
│   └── features/
│       ├── auth/                    # Firebase Google + Phone OTP, onboarding, Account
│       ├── dashboard/               # Home command center + Quick Search modal
│       ├── curriculum/              # Subjects (5 tracks), Chapters, Topics, Offline download
│       ├── lesson/                  # Lesson reader, terms, worked example, quick practice, notes
│       ├── practice/                # Smart MCQ runner, 6-layer explanation, CQ self-assess
│       ├── exam/                    # Chapter/Topic/Weak/Subject Model Test + Result + Percentile
│       ├── rehearsal/               # Multi-Subject Exam Rehearsal builder, intermission, report
│       ├── board_archive/           # Canonical board/year parser, filters, interactive solve
│       ├── planner/                 # 7-day study planner, auto-generate, local reminders
│       ├── progress/                # Analytics, score trend chart, bookmarks, guardian links
│       └── content_report/          # Report error sheet & My Reports list
└── test/
```

---

### 5.2 Backend Additions (`apps/api`)

Keep all existing auth flows (`guest`, `request-otp`, `verify-otp`, `admin/login`) working untouched, and make these targeted additions:

1. **Prisma `User` Schema Extension (`apps/api/prisma/schema.prisma`):**
   - Add `firebaseUid String? @unique` and `email String? @unique` to `User`.
   - Keep `guestId`, `phoneNumber`, `passwordHash`, `role`, `selectedClass`, `fullName` unchanged.

2. **Firebase Admin Token-Exchange Endpoint (`POST /auth/firebase`):**
   - Add `firebase-admin` dependency to `apps/api` and a thin `FirebaseVerifierService` (initialized from `FIREBASE_SERVICE_ACCOUNT_JSON` or `FIREBASE_PROJECT_ID` / ADC; injectable/mockable in tests).
   - `POST /auth/firebase` accepts `{ idToken: string; fullName?: string; selectedClass?: string }`:
     1. Verifies `idToken` via `firebase-admin` -> extracts `uid`, `phone_number`, `email`, `name`, `firebase.sign_in_provider`.
     2. Normalizes `phone_number` (using existing `normalizeBangladeshPhone` when Bangladeshi `+880`/`01...`, or E.164 fallback for international test numbers).
     3. Looks up `User` by `firebaseUid`, else by `phoneNumber`, else by `email`:
        - If matched user has `role !== Role.STUDENT || Boolean(user.passwordHash)`, throw `ForbiddenException` (staff accounts cannot log into student Firebase auth).
        - If matched by phone/email without `firebaseUid`, attach `firebaseUid` (and `email` if missing) to that existing student account so prior web progress carries over automatically.
        - If no match, create a new `STUDENT` user (`firebaseUid`, `phoneNumber`, `email`, `fullName` from DTO or Firebase `name`, `selectedClass` defaulting to `"SSC"`).
     4. Signs and returns porhi's standard JWT `{ accessToken, isNewUser, user: { id, firebaseUid, phoneNumber, email, fullName, role, selectedClass } }`.

3. **Profile Track Expansion (`UpdateProfileDto` & `AuthService.updateProfile` — Our Call):**
   - Currently `apps/api/src/modules/auth/dto/update-profile.dto.ts` and `AuthService.updateProfile` restrict `selectedClass` to `'SSC' | 'HSC'`. Expand both (and `POST /auth/firebase`) to accept all 5 student tracks: `'CLASS_6_8' | 'SSC' | 'HSC' | 'ADMISSION' | 'BCS'` (keeping `'SSC'` as default). This is 100% backward-compatible with existing `apps/web` `/account` (`SSC | HSC`) and existing unit tests (which only assert rejection of `'INVALID'`), while allowing mobile onboarding and `/account` to persist any of the 5 tracks.

4. **Offline Pack & Static Asset Parity Fixes (`apps/api`):**
   - Update `CurriculumService.getOfflineChapterPack` to include `cqRubric: q.cqRubric ?? null` and `boardSource: q.boardSource ?? null` (alongside `options`, `explanation`, `difficulty`) so offline CQ and board-tagged questions render identically to online mode.
   - Ensure `/uploads/interactive/*.html` and lesson audio files are reachable by mobile over HTTP (already served by `MediaPublicController` at `/uploads/*`; ensure pilot `lesson-intro.wav` is also served cleanly or bundled in `apps/mobile/assets/audio/` as fallback).

---

### 5.3 Mobile Auth & Session Lifecycle

- **No Guest Mode:** App launch checks `FirebaseAuth.instance.currentUser` and persisted JWT in `flutter_secure_storage`.
  - If unauthenticated -> navigate to `/login`.
- **Login Screen (`/login`):**
  - Clean bilingual header with **porhi** branding and two primary sign-in methods:
    1. **Continue with Google** (`google_sign_in` -> `FirebaseAuth.signInWithCredential`).
    2. **Continue with Phone OTP** (Bangladesh `+880` prefilled with international code selector -> `verifyPhoneNumber` -> 6-digit OTP PIN screen with resend cooldown & auto-retrieval on Android).
  - After Firebase succeeds -> call `POST /auth/firebase` -> store porhi JWT in `flutter_secure_storage`.
  - **Profile Onboarding Gate:** If `isNewUser == true` or `user.fullName` is empty, show a quick 1-step onboarding sheet/screen (`আপনার নাম` + `Class/Program` selector: `CLASS_6_8`, `SSC`, `HSC`, `ADMISSION`, `BCS`) calling `PATCH /auth/profile` before entering Home.
- **Silent Token Refresh:**
  - `Dio` auth interceptor attaches `Authorization: Bearer <poriJwt>`.
  - On HTTP `401`, if `FirebaseAuth.instance.currentUser != null`, refresh Firebase ID token (`getIdToken(true)`), re-exchange at `POST /auth/firebase`, save new porhi JWT, and retry the failed request once; if Firebase session is gone/revoked, sign out and route to `/login`.
- **Logout:** Signs out of both `GoogleSignIn`, `FirebaseAuth`, and clears `flutter_secure_storage` (optionally keeping downloaded offline packs or offering clear-cache in Settings).

---

### 5.4 Navigation & Screen Map (`go_router`)

- **Bottom `NavigationBar` (4 primary tabs via `StatefulShellRoute`):**
  1. **হোম (`Home`)** -> `/home`: Streak & 7-day activity strip, active subject pill + switcher, "Continue Where You Left Off" card, Due Mistake Revision queue, Today's Study Plan card, Quick Hub (Board Archive, Multi-Paper Rehearsal, Bookmarks).
  2. **বিষয়সমূহ (`Subjects`)** -> `/subjects`: Program filter chips (`সকল`, `ষষ্ঠ–অষ্টম`, `SSC`, `HSC`, `ভর্তি প্রস্তুতি`, `BCS`), search input, Ready vs Coming Soon subject cards with live chapter/topic/question counts and mastery progress.
  3. **রুটিন (`Planner`)** -> `/planner`: Today / 7-Day agenda, custom task creator modal, `"স্মার্ট ৭-দিনের রুটিন তৈরি করো"` auto-generator, reminder time picker + device notification toggle, direct launch into target lesson/practice/test.
  4. **অগ্রগতি (`Progress`)** -> `/progress`: Study KPIs, exam history filter + score trend line chart, weak topics diagnostic list, Bookmarks tab/sheet, My Content Reports link, Parent/Teacher Guardian Share Link generator & revoker.
- **Global Top App Bar Actions (on shell tabs):**
  - Active Subject chip, Quick Search (`⌘` / Search modal across chapters & topics), Bookmarks drawer/page, Live Streak badge, and Account/Settings avatar (`/account`).
- **Push Stack Routes (outside bottom bar for focused study):**
  - `/curriculum/:subjectId` — Chapter accordion, topic search & filter pills (`সব`, `ল্যাব`, `অসম্পন্ন`, `বুকমার্ক`), mastery icons, bookmark toggle, offline chapter pack download button.
  - `/lesson/:topicId` — Connected Lesson Reader (sticky reading progress bar, chapter topic drawer, `LessonAudioPlayer` + TTS, interactive HTML lab card/fullscreen, rich Markdown + KaTeX + media, terms, worked example, memory aid, personal quick note, quick practice MCQ, prev/next topic, mark complete, report error).
  - `/practice/:chapterId` — Smart MCQ & CQ Practice Runner (`topicId`, `difficulty`, `mode=mistakes`, `type=MCQ|CQ`), 6-layer explanation accordion, CQ ক/খ/গ/ঘ model answer & self-assessment, completion summary.
  - `/exam/setup` & `/exam/runner` — Chapter, Topic, Weak-Area, and Full Subject Model Test setup + countdown runner + question palette + review flag + autosave/resume + `/exam/result/:sessionId` (with percentile & topic breakdown).
  - `/exam/rehearsal` — Multi-Subject Exam Rehearsal (preset & custom 2–5 paper builder, paper stepper, per-paper countdown, intermission screen, combined multi-paper report).
  - `/board-archive` — Verified Board Question Archive (canonical board & year chips, program/subject/type/verified filters, keyword search, interactive solve + 6-layer explanation / CQ rubric).
  - `/account` — Profile editor (`fullName`, `selectedClass`), language toggle (`বাংলা` / `English`), notification permissions, offline storage manager, sign out.

---

### 5.5 Rich Content, Math, Audio & Interactive Simulations

1. **Rich Content Parser (`core/widgets/rich_content/`):**
   - Port the exact token/block semantics of `apps/web/src/components/content/rich-content-renderer.tsx`:
     - Extract inline `<audio src="..." title="...">`, `<video src="..." title="...">`, and `![alt](url)` tags in order.
     - Parse Markdown blocks: headings (`#`–`###`), callout/blockquotes, bullet/numbered lists, Markdown tables, display math (`$$...$$`), and inline paragraphs containing `$...$` LaTeX.
     - Render math via `flutter_math_fork` (with clean horizontal scroll on wide equations and graceful plain-text fallback if malformed).
     - Render images via `cached_network_image` with pinch-to-zoom lightbox; render `<video>` tags via `video_player` + `chewie`; render `<audio>` tags via inline `just_audio` mini-player.
2. **Lesson Audio Player + TTS (`lesson_audio_player.dart`):**
   - When `lesson.audioUrl` is non-null: `just_audio` player with Play/Pause, seek bar, elapsed/duration timer, and speed selector (`0.75x`, `1.0x`, `1.25x`, `1.5x`). Checks local offline cache first, then streams/downloads from resolved `API_BASE_URL` (falling back to bundled `assets/audio/lesson-intro.wav` if configured for pilot lessons).
   - Always offers **ভয়েস পাঠ (Text-to-Speech)** mode via `flutter_tts` (`bn-BD` / `en-US`) reading the lesson goal, explanation (stripped of LaTeX markup), and memory aid cleanly with dispose cleanup.
3. **Interactive HTML Simulations (`interactive_lab/`):**
   - When `lesson.interactiveWidgetUrl` is present, render a dark-slate lab header card (`ল্যাব সিমুলেশন`, title, reload button, fullscreen button) embedding `webview_flutter`.
   - Opening fullscreen launches a dedicated landscape-friendly route/dialog with safe JavaScript enabled inside the WebView.
   - When a chapter is downloaded for offline use, fetch and save the HTML simulation file locally in app documents storage so `webview_flutter` loads `loadFile(...)` offline.

---

### 5.6 Offline Storage, Exam Autosave & Sync Engine (`Drift`)

- **Local SQLite (`Drift`) Tables:**
  - `downloaded_chapters`: `chapterId`, `subjectId`, `titleBangla`, `versionHash`, `downloadedAt`, `topicsJson`, `localSizeBytes`.
  - `cached_lessons`: `lessonId`, `topicId`, `chapterId`, `payloadJson`, `localLabPath`, `localAudioPath`.
  - `cached_questions`: `questionId`, `topicId`, `chapterId`, `type`, `difficulty`, `payloadJson`.
  - `active_exam_drafts`: `sessionId` (or local UUID for offline exams), `mode` (`ONLINE` | `OFFLINE`), `testType`, `subjectId`, `chapterId`, `questionsJson`, `answersJson`, `flaggedIdsJson`, `remainingSeconds`, `startedAt`, `updatedAt`.
  - `sync_queue`: `id`, `kind` (`LESSON_COMPLETE` | `PRACTICE_ATTEMPT` | `EXAM_SUBMISSION`), `payloadJson`, `createdAt`, `retryCount`, `lastError`.
  - `local_student_cache`: cached `/student/overview`, bookmarks, and personal topic notes for instant cold-start rendering.
- **Offline Behavior:**
  - Online: actions call live API directly and update local cache; `ExamRunner` persists answers to `active_exam_drafts` on every selection and sends `PUT /exam/heartbeat/:sessionId` periodically.
  - Offline: `/lesson/:topicId`, `/practice/:chapterId`, and `/exam/runner` (chapter test) automatically read from `Drift`, grade MCQs locally using cached `options` + `explanation`, save completions/attempts/exam results into `sync_queue`, and update local dashboard/mastery counters immediately.
  - Reconnect / Manual Sync: `connectivity_plus` triggers `POST /student/sync-offline` with queued `{ lessonCompletes, practiceAttempts, examSubmissions }`, clearing synced rows and refreshing `/student/overview`.

---

### 5.7 Local Notifications & Study Planner

- Use `flutter_local_notifications` + `timezone` (`Asia/Dhaka` / device local timezone).
- Whenever tasks are fetched from `GET /planner`, created (`POST /planner` / `POST /planner/auto-generate`), updated (`PATCH /planner/:id`), or deleted (`DELETE /planner/:id`):
  - Schedule exact/inexact local notifications for incomplete tasks matching `scheduledDate >= today` and having `reminderTime` (`HH:mm`).
  - Cancel notifications when tasks are marked `completed: true` or deleted.
  - Tapping a notification deep-links via `go_router` to `/planner` (or directly to the task's topic/chapter if attached).

---

### 5.8 Testing Strategy

- **Backend (`apps/api`):** Unit and e2e tests (`vitest`) for `POST /auth/firebase` (valid Google/Phone ID tokens, existing phone/email account linking, staff role rejection, invalid token rejection, profile defaults) and `getOfflineChapterPack` (`cqRubric` & `boardSource` inclusion) using a mocked `FirebaseVerifierService`.
- **Flutter (`apps/mobile`):**
  - **Unit tests:** Rich content & LaTeX tokenizer, canonical board source parser (`parseBoardSource` ported from `@pori/shared`), Bangla numeral formatter, offline MCQ/exam grading, and Drift `sync_queue` + `OfflineSyncService`.
  - **Widget tests:** Login flow (Google & Phone OTP screens with mocked `AuthRepository`), Lesson Reader (sections, bookmark, note, quick practice), Practice Runner (difficulty filter, 6-layer explanation accordion, CQ rubric), Exam Runner (timer, question palette, review flag, resume), Board Archive filters, and Planner agenda.

---

## 6. What's Left to the Builder

- Select exact pub package versions in `apps/mobile/pubspec.yaml` compatible with Flutter `3.44.8` and Android build targets (Kotlin/Gradle settings, plus clean iOS project scaffolding).
- Design the visual layout, component spacing, animations, and typography pairings within **porhi**'s existing indigo/emerald/slate + Bengali-first design language.
- Structure internal Riverpod providers, Drift table definitions/generated code, and DTO JSON serialization models (`json_serializable` / `freezed` or manual `fromJson`/`toJson`).
- Decide local media cache eviction thresholds and HTTP retry backoff timings.
- Document Firebase Console setup steps (`google-services.json`, SHA-1/SHA-256 for `com.porhi.app`, Play Integrity for Phone Auth, and `FIREBASE_SERVICE_ACCOUNT_JSON`) in `apps/mobile/README.md` / `.env.example`.
