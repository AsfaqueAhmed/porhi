# poRi Phase 2 Design Spec

**Branch:** `feat/phase-2` (branched from `feat/v1.1` at `a63e9c0`)
**Date:** 2026-11-12
**Scope:**
1. **Verified Board Question Archive** — search/filter verified board papers (Dhaka, Rajshahi, Chattogram, Cumilla, Jashore, Sylhet, Dinajpur, Barishal, Mymensingh, All Boards) by Board & Year (`2020–2024+`), subject, type, and keyword.
2. **Multi-Subject Exam Rehearsal** — separately timed multi-paper exam flows (Paper 1 -> Intermission -> Paper 2 -> ... -> Combined Multi-Paper Analytics).
3. **Expanded Tracks & Features** — `Class 6–8`, `HSC`, `University Admission`, and `BCS` curriculum tracks, **Audio Lessons** (`Lesson.audioUrl` + `LessonAudioPlayer` + Web Speech narration fallback), and **Parent/Teacher Progress Views** via revocable read-only share links (`/guardian/[shareCode]`).

> **Hard Auth Constraint:** `apps/api/src/modules/auth/*` must remain completely untouched so the user's future auth replacement remains conflict-free. Parent/Teacher views are implemented cleanly via student-generated revocable `GuardianShareLink` tokens rather than changing auth guards or login flows.

---

## Architecture Overview

```
@pori/shared
  ├── utils/board-parser.ts      (Canonical board key + year parser, program track metadata)
  └── types/                     (ProgramType, BoardArchiveDTOs, MultiExamRehearsalDTOs, GuardianShareDTOs)
          │
          ▼
apps/api (NestJS + Prisma/PostgreSQL)
  ├── schema.prisma              (+ Subject.program, Lesson.audioUrl/audioDurationSeconds, MultiExamRehearsal, GuardianShareLink)
  ├── prisma/seed-phase2.ts      (Idempotent seeds: 2020 & 2024–2025 boards, Class 6–8 / HSC / Admission / BCS tracks, audio lessons)
  ├── modules/board-archive/     (GET /board-archive/filters, GET /board-archive/questions)
  ├── modules/exam/              (+ POST /exam/rehearsal/start, GET /history, GET /:id, POST /:id/paper/:idx/start|submit)
  ├── modules/curriculum/        (+ program filter in getSubjects, audio fields in offline packs)
  ├── modules/content-admin/     (+ audioUrl & audioDurationSeconds in lesson DTO/service)
  ├── modules/student/           (+ POST/GET/DELETE /student/share-links)
  └── modules/guardian/          (Public GET /guardian/report/:shareCode reusing StudentService metrics)
          │
          ▼
apps/web (Next.js App Router + Tailwind + Zustand)
  ├── /board-archive             (Verified Board Archive filter, interactive MCQ check + 6-layer explanation + CQ rubric)
  ├── /exam/rehearsal            (Preset/Custom Multi-Paper Builder, per-paper timers, intermission, combined report)
  ├── /subjects                  (Track filter tabs: ALL | CLASS_6_8 | SSC | HSC | ADMISSION | BCS)
  ├── /lesson/[topicId]          (LessonAudioPlayer: HTML5 <audio> playback rate + Web Speech synthesis fallback)
  ├── /progress                  (Parent/Teacher share-link generator & revoker card)
  └── /guardian/[shareCode]      (Read-only Parent vs Teacher lens progress report)
```

---

## 1. Track A: Verified Board Question Archive

### 1.1 Canonical Board Normalizer (`@pori/shared`)
Existing seed files contain varied `boardSource` spellings (`"Chattogram Board"`, `"Chittagong Board"`, `"চট্টগ্রাম বোর্ড"`, `"Comilla"`, `"Cumilla"`, `"Barisal"`, `"Barishal"`, `"Jessore"`, `"Jashore"`, Bangla digits `২০২৩` vs `2023`).
- `parseBoardSource(raw?: string | null)` extracts:
  - `boardKey`: `'DHAKA' | 'RAJSHAHI' | 'CHATTOGRAM' | 'CUMILLA' | 'JASHORE' | 'SYLHET' | 'DINAJPUR' | 'BARISHAL' | 'MYMENSINGH' | 'ALL_BOARDS' | 'OTHER'`
  - `boardLabelBangla` & `boardLabelEnglish`
  - `year`: numeric year (e.g. `2020..2025`) or `null`
  - `isVerifiedBoard`: `boolean` (true when a canonical Bangladesh education board tag + valid year/published context is matched)
- Both `BoardArchiveService` and `/board-archive` share `parseBoardSource` and `BOARD_METADATA` so backend filtering and frontend display never drift.

### 1.2 Backend API (`BoardArchiveModule`)
- **`GET /board-archive/filters`**: Returns available boards (canonical keys, Bangla/English labels, question counts), available years sorted descending (`2025`, `2024`, `2023`, `2022`, `2021`, `2020`, ...), programs, and subjects having board questions.
- **`GET /board-archive/questions`**: Query params:
  - `board` (canonical key like `DHAKA`, `RAJSHAHI`, `CHATTOGRAM`, or `ALL`)
  - `year` (`2020`, `2021`, `2022`, `2023`, `2024`, `2025`, or `2024+` matching `>= 2024`)
  - `program` (`CLASS_6_8` | `SSC` | `HSC` | `ADMISSION` | `BCS`)
  - `subjectId`, `chapterId`, `type` (`MCQ` | `CQ`), `verifiedOnly` (default `true`), `search`, `page`, `limit`.
  - Returns normalized `boardKey`, `boardLabelBangla`, `year`, `isVerifiedBoard`, chapter/subject metadata, options, `correctOption`, `explanation` (6-layer JSON), and `cqRubric` (when CQ).

### 1.3 Frontend (`/board-archive`)
- Board chip selector (ঢাকা, রাজশাহী, চট্টগ্রাম, কুমিল্লা, যশোর, সিলেট, দিনাজপুর, বরিশাল, ময়মনসিংহ, সমন্বিত বোর্ড).
- Year chip selector (`সকল বছর`, `২০২৪+`, `২০২৫`, `২০২৪`, `২০২৩`, `২০২২`, `২০২১`, `২০২০`).
- Subject/Track dropdown, Question Type (`সব` / `MCQ` / `CQ`), Verified-only badge toggle, and debounced keyword search.
- Interactive solve card: students test answers immediately on MCQ cards, toggle the 6-layer explanation or CQ marking rubric, bookmark questions, or jump directly into `/practice/[topicId]` or `/exam/subject/[subjectId]`.

---

## 2. Track B: Multi-Subject Exam Rehearsal

### 2.1 Database Model (`MultiExamRehearsal`)
Stores multi-paper coordination metadata while reusing `ExamSession` for each paper's actual timed execution, scoring, mistake capture, and XP:
```prisma
model MultiExamRehearsal {
  id                String    @id @default(uuid())
  userId            String
  user              User      @relation(fields: [userId], references: [id])
  titleBangla       String
  program           String    @default("SSC")
  papers            Json      // Array of RehearsalPaperEntry
  currentPaperIndex Int       @default(0)
  status            String    @default("IN_PROGRESS") // IN_PROGRESS | INTERMISSION | COMPLETED
  totalScore        Float?
  totalMarks        Int       @default(0)
  startedAt         DateTime  @default(now())
  submittedAt       DateTime?

  @@index([userId, startedAt])
}
```
Each entry inside `papers` JSON holds:
- `paperIndex` (`0..N-1`), `subjectId`, `subjectCode`, `subjectNameBangla`, `labelBangla` (e.g. `"পত্র ১: পদার্থবিজ্ঞান"`), `durationMinutes`, `questionCount`, `status` (`PENDING` | `ACTIVE` | `SUBMITTED`), `sessionId`, `score`, `totalMarks`, `correctCount`, `wrongCount`, `unansweredCount`, `timeSpentSeconds`, `startedAt`, `submittedAt`.

### 2.2 Backend Endpoints (`ExamModule` Extension)
Guarded by `JwtAuthGuard` (matching existing `/exam/*` endpoints):
- `POST /exam/rehearsal/start`: Validates 2–5 paper configs (`{ subjectId, labelBangla?, questionCount, durationMinutes }`), creates `MultiExamRehearsal`, automatically starts Paper 0 by calling `ExamService.startExam` (`testType: 'REHEARSAL_PAPER'`), and returns `{ rehearsal, activeSession }`.
- `GET /exam/rehearsal/history`: Lists recent `MultiExamRehearsal` records for the current user.
- `GET /exam/rehearsal/:id`: Loads full rehearsal state + resumes active paper session questions (without leaking answer keys until submitted) if a paper is currently `ACTIVE`.
- `POST /exam/rehearsal/:id/paper/:paperIndex/submit`: Grades active paper's `ExamSession` via `ExamService.submitExam`, updates `papers[paperIndex]` stats, advances `currentPaperIndex`, sets `status` to `'INTERMISSION'` if more papers remain or `'COMPLETED'` (with aggregated `totalScore`, `totalMarks`) when finished.
- `POST /exam/rehearsal/:id/paper/:paperIndex/start`: Starts the next queued paper (`paperIndex === rehearsal.currentPaperIndex`) from `'INTERMISSION'` -> `'IN_PROGRESS'` with a brand-new `ExamSession` countdown timer.

### 2.3 Frontend (`/exam/rehearsal`)
- **Setup View:** One-click presets (SSC বিজ্ঞান ডাবল পেপার, HSC পদার্থ ১ম ও ২য় পত্র, বিশ্ববিদ্যালয় ভর্তি মক, BCS প্রিলি মিনি মক) + Custom Multi-Paper Builder (pick 2–4 subjects, customize minutes & question count per paper).
- **Active Paper View:** Paper Stepper indicator (`পত্র ১ ✓ → পত্র ২ ⏱ → পত্র ৩`), independent paper countdown timer (`MM:SS`), MCQ option selector, question palette, auto-submit on timeout.
- **Intermission Screen:** Displays completed paper summary score, short rest cue, and explicit `"পরবর্তী পত্র শুরু করুন"` action so the next paper's timer starts fresh only when ready.
- **Combined Multi-Paper Analytics:** Total score across all papers, per-paper accuracy & time breakdown, weak chapter aggregation, and link to individual paper solutions (`/exam/result/[sessionId]`).

---

## 3. Track C: Expanded Tracks, Audio Lessons & Parent/Teacher Views

### 3.1 Expanded Education Tracks
- **Prisma `Subject.program`**: String field defaulting to `"SSC"` with `@@index([program, isReady])`. Values align with `ProgramType`: `CLASS_6_8`, `SSC`, `HSC`, `ADMISSION`, `BCS`.
- **Seed Data (`seed-phase2.ts`)**: Idempotently seeds starter ready subjects, chapters, topics, published 6-layer explanations + audio metadata, and verified MCQs/CQs across:
  - `CLASS_6_8`: `class8_science` (অষ্টম শ্রেণির বিজ্ঞান)
  - `SSC`: `ssc_chemistry` (SSC রসায়ন) + 2020 & 2025 board backfill for SSC Physics
  - `HSC`: `hsc_physics_1` (HSC পদার্থবিজ্ঞান ১ম পত্র)
  - `ADMISSION`: `admission_ka_physics` (ঢাবি/বুয়েট 'ক' ইউনিট পদার্থবিজ্ঞান প্রস্তুতি)
  - `BCS`: `bcs_preliminary` (BCS প্রিলিমিনারি বিজ্ঞান ও সাধারণ জ্ঞান)
- **Curriculum API & Web `/subjects`**: `GET /curriculum/subjects?program=...` filters optionally by program. `/subjects` presents 6 track tabs (`সকল`, `ষষ্ঠ–অষ্টম`, `SSC`, `HSC`, `ভর্তি প্রস্তুতি`, `BCS`), integrates with `curriculum-data.ts` offline fallbacks, and preserves active subject state cleanly.

### 3.2 Audio Lessons
- **Schema:** `Lesson.audioUrl String?` and `Lesson.audioDurationSeconds Int?`.
- **Static Pilot Audio:** Valid PCM WAV audio track placed at `apps/web/public/audio/lesson-intro.wav` and attached to pilot published lessons across tracks (including Class 6–8, SSC Physics Ch1, HSC, Admission, BCS) so `/lesson/[topicId]` plays real audio offline/online without 404 errors.
- **Component (`LessonAudioPlayer`):** Placed prominently above the structured explanation on `/lesson/[topicId]`:
  - Renders interactive HTML5 `<audio>` controls (Play/Pause, seek bar, elapsed/duration timer, `0.75x / 1x / 1.25x / 1.5x` speed selector) when `lesson.audioUrl` is present.
  - Also includes a clean **ভয়েস পাঠ (Text-to-Speech)** mode using browser `window.speechSynthesis` (selecting `bn-BD` / `bn` / `en-US` voice cleanly with safe feature detection and cleanup on unmount) so *every* lesson can be listened to hands-free even before studio recordings exist.

### 3.3 Parent & Teacher Progress Views
- **Schema (`GuardianShareLink`):**
  ```prisma
  model GuardianShareLink {
    id             String    @id @default(uuid())
    userId         String
    user           User      @relation(fields: [userId], references: [id])
    shareCode      String    @unique
    audience       String    @default("PARENT") // PARENT | TEACHER
    recipientLabel String?
    isActive       Boolean   @default(true)
    createdAt      DateTime  @default(now())
    revokedAt      DateTime?
    lastViewedAt   DateTime?

    @@index([userId, isActive])
  }
  ```
- **API Endpoints:**
  - `StudentController` (uses existing `OptionalJwtAuthGuard` — no auth module modifications):
    - `POST /student/share-links`: creates a share link (`audience: 'PARENT' | 'TEACHER'`, optional `recipientLabel`) and returns `shareCode` + URL `/guardian/${shareCode}`.
    - `GET /student/share-links`: lists active & revoked links for the current student.
    - `DELETE /student/share-links/:id`: revokes a share link (`isActive: false`, `revokedAt: now`).
  - `GuardianController` (`@Controller('guardian')`, public read-only):
    - `GET /guardian/report/:shareCode`: validates `isActive` share link, touches `lastViewedAt`, delegates to `StudentService` helpers to build a clean read-only progress snapshot containing student display name/program, `audience` (`PARENT` vs `TEACHER`), consistency metrics (streak, weekly study minutes, completed lessons), topic/chapter mastery summary, weak areas, and recent exam/rehearsal trend scores (never exposing phone numbers, passwords, or private notes).
- **UI (`/progress` & `/guardian/[shareCode]`):**
  - `/progress` includes a **"অভিভাবক / শিক্ষক রিপোর্ট লিংক"** card to create a Parent or Teacher link, copy the URL one-click, open preview, or revoke access immediately.
  - `/guardian/[shareCode]` renders tailored read-only analytics with interactive **অভিভাবক ভিউ** (consistency, study habit health, actionable support tips) vs **শিক্ষক ভিউ** (topic mastery bars, weak topic diagnostics, exam & board accuracy trends).
