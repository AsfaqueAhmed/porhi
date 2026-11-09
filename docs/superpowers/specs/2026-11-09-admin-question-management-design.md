# Design Specification: Admin Question Bank List, Separate Add Screen & Edit Flow

**Date:** 2026-11-09  
**Status:** Approved Design — Pending User Review of Spec Document  
**Target Applications:** `apps/api` (NestJS 11 + Prisma) and `apps/web` (Next.js 15 App Router)  
**Prerequisites:** Admin Authentication & Route Authorization (`main` at `85cbd01`)

---

## 1. Problem Statement & Goals

Currently, `/admin/questions` renders [`AuthoringStudio`](file:///Users/technonext/Desktop/poRi/apps/web/src/components/admin/authoring-studio.tsx) directly as an inline create-only form:
1. Admins and editors have **no way to browse, search, filter, inspect, edit, or archive existing questions** stored in PostgreSQL.
2. Adding a question happens on the root `/admin/questions` screen rather than a dedicated creation route.
3. [`AuthoringStudio`](file:///Users/technonext/Desktop/poRi/apps/web/src/components/admin/authoring-studio.tsx) initializes with hardcoded Physics sample defaults, assumes hardcoded distractor keys (`opt_1..opt_4` instead of seeded IDs like `opt_q1_b`), and lacks `CQ_CREATIVE` authoring/editing inputs even though creative questions exist in the database.

### Objectives
- Make `/admin/questions` a dedicated **Question Bank Directory** (`QuestionBankManager`) displaying existing `MCQ` and `CQ_CREATIVE` questions with hierarchy filtering, search, status counts, pagination, edit links, and safe archiving.
- Separate authoring onto `/admin/questions/new` (keeping `MCQ`, `CQ_CREATIVE`, and `?type=lesson` Lesson authoring available without cluttering the list).
- Add a dedicated edit screen at `/admin/questions/[id]/edit` backed by new REST endpoints (`GET /admin/content/questions`, `GET /admin/content/questions/:id`, `PATCH /admin/content/questions/:id`, `POST /admin/content/questions/:id/archive`).
- Enforce editorial workflow safety: editing `PUBLISHED` questions moves them back to `REVIEW` (`isVerified: false`) by default while allowing `ADMIN` to explicitly keep `PUBLISHED` live (`preservePublished: true`), and archiving replaces destructive deletion so `RevisionMistake` and `ExamSession` history remain intact.

---

## 2. Backend Design (`apps/api/src/modules/content-admin/`)

All routes below reside under [`ContentAdminController`](file:///Users/technonext/Desktop/poRi/apps/api/src/modules/content-admin/content-admin.controller.ts) and use `@UseGuards(JwtAuthGuard, RolesGuard)`.

### 2.1 `GET /admin/content/questions`
- **Allowed Roles:** `Role.EDITOR`, `Role.REVIEWER`, `Role.ADMIN`
- **Query DTO (`ListQuestionsQueryDto`):**
  - `subjectId?: string` — filters via `topic.chapter.subjectId`
  - `chapterId?: string` — filters via `topic.chapterId`
  - `topicId?: string` — filters via `question.topicId`
  - `type?: 'MCQ' | 'CQ_CREATIVE'`
  - `status?: ContentStatus` (`DRAFT | REVIEW | CORRECTION | PUBLISHED | ARCHIVED`)
  - `search?: string` — trimmed case-insensitive match across `stem` and `boardSource`
  - `includeArchived?: string` (`'true' | 'false'`, default `'false'`); ignored/enabled automatically when `status === 'ARCHIVED'`
  - `page?: string` (parsed integer `>= 1`, default `1`)
  - `limit?: string` (parsed integer `1..100`, default `20`)
- **Service Behavior ([`ContentAdminService.listQuestions`](file:///Users/technonext/Desktop/poRi/apps/api/src/modules/content-admin/content-admin.service.ts)):**
  - Builds base hierarchy/type/search filter (`baseWhere`), then applies `status` (or `{ not: ContentStatus.ARCHIVED }` unless `includeArchived === 'true'`).
  - Queries matching rows ordered by `updatedAt DESC`, `createdAt DESC`, joined with:
    ```ts
    topic: {
      select: {
        id: true,
        titleBangla: true,
        chapter: {
          select: {
            id: true,
            titleBangla: true,
            subject: {
              select: { id: true, code: true, nameBangla: true },
            },
          },
        },
      },
    }
    ```
  - Computes `statusCounts` across `baseWhere` grouped by `status` (`ALL` = non-archived sum, plus `DRAFT`, `REVIEW`, `CORRECTION`, `PUBLISHED`, `ARCHIVED`).
  - Returns `{ items, total, page, limit, totalPages, statusCounts }`.

### 2.2 `GET /admin/content/questions/:id`
- **Allowed Roles:** `Role.EDITOR`, `Role.REVIEWER`, `Role.ADMIN`
- Returns full `Question` row with `topic -> chapter -> subject` hierarchy identifiers for pre-filling `/admin/questions/[id]/edit`.
- Throws `404 NotFoundException` when missing.

### 2.3 `PATCH /admin/content/questions/:id`
- **Allowed Roles:** `Role.EDITOR`, `Role.ADMIN`
- **DTO (`UpdateQuestionAdminDto`):**
  - `topicId?: string`
  - `type?: 'MCQ' | 'CQ_CREATIVE'`
  - `stem?: string`
  - `options?: QuestionOptionDto[] | null`
  - `explanation?: ExplanationDto`
  - `cqRubric?: Record<string, { mark?: number; criteria?: string }> | null`
  - `difficulty?: 'EASY' | 'MEDIUM' | 'HARD'`
  - `boardSource?: string | null`
  - `preservePublished?: boolean`
  - `submitForReview?: boolean`
- **Validation & Editorial Rules ([`ContentAdminService.updateQuestion`](file:///Users/technonext/Desktop/poRi/apps/api/src/modules/content-admin/content-admin.service.ts)):**
  1. Look up existing `Question` (`404` if not found). Reject direct editing if `existing.status === ContentStatus.ARCHIVED` (`400 BadRequestException`).
  2. Merge incoming updates onto existing question fields and run extracted shared validation helpers (`validateQuestionPayload`):
     - Non-empty `topicId`, `stem`, valid `type` (`MCQ | CQ_CREATIVE`) and `difficulty` (`EASY | MEDIUM | HARD`), and non-empty `explanation.directAnswer` & `explanation.coreConcept`.
     - If effective `type === 'MCQ'`: require `options` array with `>= 2` valid `{ id, text, isCorrect }` items and **exactly one** `isCorrect: true`.
     - If effective `type === 'CQ_CREATIVE'`: clear `options` (`null` or omit), and if `cqRubric` is provided ensure at least one rubric part (`ka`, `kha`, `ga`, `gha`) has non-empty `criteria` string and non-negative numeric `mark`.
     - Verify `topicId` exists in `prisma.topic` (`404` if switched to non-existent topic).
  3. Determine next editorial status:
     - If `dto.preservePublished === true` and `actorRole !== Role.ADMIN`: throw `403 ForbiddenException('Only Admin can keep a question published during edit')`.
     - If `existing.status === ContentStatus.PUBLISHED`:
       - When `dto.preservePublished === true` and `actorRole === Role.ADMIN`: retain `status: ContentStatus.PUBLISHED` and `isVerified: true`.
       - Otherwise: transition to `status: ContentStatus.REVIEW` and `isVerified: false`.
     - If `existing.status` is `DRAFT`, `REVIEW`, or `CORRECTION`:
       - When `dto.submitForReview === true`: set `status: ContentStatus.REVIEW`.
       - Otherwise: preserve `existing.status`.
  4. Persist changes and increment `version` (`{ increment: 1 }`), returning updated record with `topic -> chapter -> subject` hierarchy.

### 2.4 `POST /admin/content/questions/:id/archive`
- **Allowed Roles:** `Role.EDITOR`, `Role.ADMIN`
- Throws `404 NotFoundException` if missing.
- Throws `403 ForbiddenException('Only Admin can archive published questions')` if `existing.status === ContentStatus.PUBLISHED` and `actorRole !== Role.ADMIN`.
- Updates `{ status: ContentStatus.ARCHIVED, isVerified: false }` without cascading-deleting `RevisionMistake` or breaking `ExamSession` references.

---

## 3. Frontend Architecture (`apps/web/src/`)

All admin API calls (`GET /curriculum/*` and `/admin/content/*`) pass `{ scope: 'admin' }` (or rely on `/admin/*` default admin scoping) via [`apiClient`](file:///Users/technonext/Desktop/poRi/apps/web/src/lib/api-client.ts).

### 3.1 Route Map
| Route | Page Component | Purpose |
|---|---|---|
| `/admin/questions` | [`AdminQuestionsPage`](file:///Users/technonext/Desktop/poRi/apps/web/src/app/admin/questions/page.tsx) | Question Bank List (`QuestionBankManager`) |
| `/admin/questions/new` | `AdminNewQuestionPage` | Dedicated Add Screen (`AuthoringStudio` `mode="create"`, supports `MCQ`, `CQ_CREATIVE`, and `?type=lesson`) |
| `/admin/questions/[id]/edit` | `AdminEditQuestionPage` | Dedicated Edit Screen (loads `GET /admin/content/questions/:id`, renders `AuthoringStudio` `mode="edit"`) |

### 3.2 Question Bank List (`apps/web/src/components/admin/question-bank-manager.tsx`)
- **Header & CTAs:** Title `প্রশ্ন ব্যাংক ও তালিকা`, live count/status summary pills (`সর্বমোট`, `Published`, `Review`, `Draft`, `Correction`), secondary `+ নতুন লেসন যোগ` (`/admin/questions/new?type=lesson`), and primary `+ নতুন প্রশ্ন যোগ করুন` (`/admin/questions/new`, appending filtered `subjectId` / `topicId` if active).
- **Filter Toolbar:** Cascading `বিষয়` -> `অধ্যায়` -> `টপিক` dropdowns, `ধরন` (`সব / MCQ / CQ`), `অবস্থা` (`সক্রিয় সব / Published / Review / Draft / Correction / Archived`), debounced `search` input, and Reset Filters control.
- **Directory Table:**
  - **প্রশ্ন ও উৎস:** KaTeX-rendered snippet ([`LatexRenderer`](file:///Users/technonext/Desktop/poRi/apps/web/src/components/math/latex-renderer.tsx)) + `boardSource` pill.
  - **অবস্থান:** `Subject > Chapter > Topic`.
  - **ধরন ও মান:** `MCQ` / `সৃজনশীল (CQ)` badge + `EASY` / `MEDIUM` / `HARD` difficulty.
  - **অবস্থা ও ভার্সন:** Colored status badge + `v<version>`.
  - **কার্যক্রম:**
    - `সম্পাদনা` (`Link` to `/admin/questions/${q.id}/edit`) for non-archived rows (`ADMIN` & `EDITOR`).
    - `আর্কাইভ` button opening an inline React confirmation modal (`POST /admin/content/questions/:id/archive`); hidden on `ARCHIVED` rows, hidden for `REVIEWER`, and hidden on `PUBLISHED` rows for non-`ADMIN`.
- **Feedback & States:** Loading skeleton rows, clear empty state CTA, pagination bar (`আগের পাতা` / `পরের পাতা`), and `role="alert"` Bengali error banner for `401`/`403`/`500` API errors.

### 3.3 Dedicated Add & Edit Screens + `AuthoringStudio` Refactor
- **`AuthoringStudio` Props (`apps/web/src/components/admin/authoring-studio.tsx`):**
  ```ts
  interface AuthoringStudioProps {
    mode?: 'create' | 'edit';
    initialQuestion?: EditableQuestionRecord;
    initialTopicId?: string;
    initialSubjectId?: string;
    initialContentType?: 'MCQ' | 'LESSON' | 'CQ';
    onContentCreated?: () => void;
    onQuestionUpdated?: (updated: EditableQuestionRecord) => void;
  }
  ```
- **Create Mode Defaults & Compatibility:**
  - `/admin/questions/new` mounts `AuthoringStudio` with `mode="create"`, displaying a `← প্রশ্ন তালিকায় ফিরুন` link to `/admin/questions` and switching cleanly among `৬-স্তরের MCQ`, `সৃজনশীল (CQ)`, and `পাঠ্য লেসন (Lesson)`.
  - Preserves existing Bengali headings/buttons expected by existing UI tests while using clean blank fields for `new` authoring (with an optional `"নমুনা ভরুন"` button to insert an example formula template on demand).
- **Edit Mode Hydration:**
  - `/admin/questions/[id]/edit` fetches `GET /admin/content/questions/:id` and handles loading, `404` (`প্রশ্নটি পাওয়া যায়নি`), and `401`/`403` alerts.
  - Locks `contentType` to the question's `type` (`MCQ` or `CQ_CREATIVE`) and hides the `Lesson` tab.
  - Initializes `subjectId`, `chapterId`, and `topicId` directly from `initialQuestion.topic.chapter.subject.id`, `initialQuestion.topic.chapter.id`, and `initialQuestion.topicId` while guarding initial mount fetches so existing `topicId` is not clobbered before chapters load.
  - Maps `distractorAnalysis` as a dynamic `Record<string, string>` keyed by each option's real `id` (e.g., `opt_q1_b` on seeded questions as well as `opt_1..opt_4` on authored questions), preserving every distractor explanation on load and submit.
  - Shows a banner when editing a `PUBLISHED` question explaining that saving moves it to `REVIEW`, plus an `ADMIN`-only checkbox `"সরাসরি প্রকাশিত রাখুন (Keep Published)"` (`preservePublished: true`).
  - Supports submitting `PATCH /admin/content/questions/:id` with success banner + `"তালিকায় ফিরুন"` navigation option.
- **`CQ_CREATIVE` Editor & Preview:**
  - Form inputs for `stem` (with [`MathToolbar`](file:///Users/technonext/Desktop/poRi/apps/web/src/components/admin/math-toolbar.tsx)), `difficulty`, `boardSource`, structured rubric sections (`ক — জ্ঞানমূলক`, `খ — অনুধাবনমূলক`, `গ — প্রয়োগমূলক`, `ঘ — উচ্চতর দক্ষতা` with `mark` and `criteria`), `directAnswer`, `coreConcept`, `stepDerivation`, NCTB textbook citation, and `proTip`.
  - Updates [`StudentSimulatorFrame`](file:///Users/technonext/Desktop/poRi/apps/web/src/components/admin/student-simulator-frame.tsx) to preview `CQ_CREATIVE` stems and `ক/খ/গ/ঘ` rubric solutions alongside `MCQ` previews.

### 3.4 Navigation Updates
- [`AdminTopbar`](file:///Users/technonext/Desktop/poRi/apps/web/src/components/admin/layout/AdminTopbar.tsx):
  - Quick CTA `+ নতুন কনটেন্ট` routes to `/admin/questions/new`.
  - Breadcrumbs append `/admin/questions/new` (`নতুন যোগ`) and `/admin/questions/[id]/edit` (`প্রশ্ন সম্পাদনা`).
- [`AdminCurriculumPage`](file:///Users/technonext/Desktop/poRi/apps/web/src/app/admin/curriculum/page.tsx):
  - Topic-level `onNavigateToAuthoring` links route to `/admin/questions/new?topicId=...&subjectId=...&type=...`.
- [`AdminSidebar`](file:///Users/technonext/Desktop/poRi/apps/web/src/components/admin/layout/AdminSidebar.tsx):
  - Keeps active state across `/admin/questions`, `/admin/questions/new`, and `/admin/questions/[id]/edit` and updates label to `প্রশ্ন ব্যাংক ও স্টুডিও`.

---

## 4. Verification & Testing Scope

1. **Backend Unit & HTTP E2E Tests (`apps/api`):**
   - `listQuestions`: hierarchy/type/status/search filters, default exclusion of `ARCHIVED`, `includeArchived=true`, pagination math, `statusCounts`.
   - `getQuestionById`: returns hierarchy + `404` on unknown ID.
   - `updateQuestion`: validation on MCQ (`>= 2` options, `1` correct) & `CQ_CREATIVE` (`cqRubric`), topic existence check, `version` increment, `PUBLISHED -> REVIEW` transition, `ADMIN`-only `preservePublished` (`403` for `EDITOR`), and `400` on `ARCHIVED` edit.
   - `archiveQuestion`: marks `ARCHIVED` (`isVerified: false`), blocks `EDITOR` archiving `PUBLISHED` (`403`), allows `ADMIN`.
   - Controller/E2E RBAC matrix (`REVIEWER` blocked from `PATCH`/`archive`, `EDITOR` blocked from `preservePublished` & `PUBLISHED` archive, `401` without JWT).
2. **Frontend Component & Route Tests (`apps/web`):**
   - `QuestionBankManager`: renders fetched questions, filters (`Subject`/`Chapter`/`Topic`/`Type`/`Status`), search, inline archive confirmation dialog, role-based action visibility, and `403`/`500` error alerts.
   - Separate `/admin/questions/new` & `AdminEditQuestionPage`: verifies `GET /admin/content/questions/:id` hydration, dynamic `opt_q1_b` distractor preservation, `CQ_CREATIVE` rubric editing, `Admin`-only `preservePublished` checkbox visibility & payload, and navigation links (`AdminTopbar`, `AdminCurriculumPage`).
3. **Full Workspace & Live Verification:**
   - `pnpm -r test`, `pnpm -r lint`, `pnpm -r build`, and live verification against Postgres (`01737740010` / `Asfaque@321`) listing, creating, editing, and archiving via `/admin/questions`.
