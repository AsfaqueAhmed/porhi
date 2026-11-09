# Admin Navigation Submenus, "See Details" Sidebars & Lessons Under Curriculum — Design Spec

**Date:** 2026-11-09  
**Branch:** `feat/admin-question-management` (extending commits `e64c57c..4b99ce3` before branch integration)  
**Scope:** Admin sidebar navigation restructure (`MCQ` / `CQ` submenus under `/admin/questions`; `Hierarchy` / `Lessons` submenus under `/admin/curriculum`), right-hand slide-over "See Details" sidebars (`AdminDrawer`) for Questions and Lessons, and full Lesson CRUD (`List`, `Detail`, `Create`, `Edit`, `Archive`) under `/admin/curriculum`.

---

## 1. Goals & Domain Boundaries

1. **Question Submenus & Focus (`/admin/questions/*`):**
   - Keep `/admin/questions` as **All Questions** (`MCQ` + `CQ_CREATIVE`).
   - Add **2 sidebar submenus** underneath Questions:
     - **MCQ প্রশ্ন** (`/admin/questions/mcq`)
     - **সৃজনশীল (CQ)** (`/admin/questions/cq`)
   - Add a **"বিস্তারিত দেখুন" (See Details)** right slide-over sidebar (`AdminDrawer`) for MCQ and CQ questions across `/admin/questions`, `/admin/questions/mcq`, and `/admin/questions/cq`.
   - Keep `/admin/questions/new` and `/admin/questions/[id]/edit` strictly focused on **Questions (`MCQ` and `CQ`)**. Remove Lesson authoring and `+ নতুন লেসন যোগ` triggers from Question pages (redirecting legacy `/admin/questions/new?type=lesson` URLs cleanly to `/admin/curriculum/lessons/new`).

2. **Curriculum Ownership (`/admin/curriculum/*`):**
   - Consolidate **Subjects, Chapters, Topics, and Lessons** cleanly under Curriculum.
   - Give Curriculum **2 sidebar submenus**:
     - **বিষয়, অধ্যায় ও টপিক** (`/admin/curriculum`) — Subjects table, Chapters tree, and Topics management.
     - **পাঠ্য লেসনসমূহ (Lessons)** (`/admin/curriculum/lessons`) — Full Lesson Bank directory with cascading Subject/Chapter/Topic filters, status filter, search, pagination, **"বিস্তারিত দেখুন" (See Details)** drawer, Add (`/admin/curriculum/lessons/new`), Edit (`/admin/curriculum/lessons/[id]/edit`), and Soft-Archive.

3. **Non-Negotiable System Invariants:**
   - Never hard-delete `Question` or `Lesson` rows; soft-archive using `ContentStatus.ARCHIVED`.
   - Maintain RBAC: `EDITOR` / `REVIEWER` / `ADMIN` may list & inspect details; only `EDITOR` & `ADMIN` may create, edit, or archive `DRAFT`/`REVIEW`/`CORRECTION` items; only `ADMIN` may archive `PUBLISHED` items or use `preservePublished: true`.
   - Guard `ARCHIVED` Lessons and Questions against editing (`PATCH` -> `400`) and direct reviewing (`POST /admin/content/review` -> `400`).
   - All admin API requests from web clients use `{ scope: 'admin' }`.

---

## 2. Sidebar & Route Architecture (`apps/web`)

### 2.1 Sidebar Group Structure (`AdminSidebar`)

Update [`AdminSidebar`](file:///Users/technonext/Desktop/poRi/apps/web/src/components/admin/layout/AdminSidebar.tsx) to support collapsible navigation groups with child submenu links:

1. **ড্যাশবোর্ড ওভারভিউ** -> `/admin`
2. **কারিকুলাম ও পাঠ (Curriculum Group)** — Parent href `/admin/curriculum`, expanded automatically when `pathname.startsWith('/admin/curriculum')` (and toggleable by user when not collapsed):
   - Submenu 1: **বিষয়, অধ্যায় ও টপিক** -> `/admin/curriculum` (active on exact `/admin/curriculum` or `/admin/curriculum/`)
   - Submenu 2: **পাঠ্য লেসন (Lessons)** -> `/admin/curriculum/lessons` (active on `/admin/curriculum/lessons*`)
3. **প্রশ্ন ব্যাংক ও স্টুডিও (Questions Group)** — Parent href `/admin/questions` (All Questions), expanded automatically when `pathname.startsWith('/admin/questions')` (and toggleable by user when not collapsed):
   - Parent active state highlights when on `/admin/questions*`.
   - Submenu 1: **MCQ প্রশ্ন** -> `/admin/questions/mcq` (active on `/admin/questions/mcq*`)
   - Submenu 2: **সৃজনশীল (CQ)** -> `/admin/questions/cq` (active on `/admin/questions/cq*`)
4. **মডেল টেস্ট ম্যানেজার** -> `/admin/model-tests`
5. **রিভিউ ও অডিট কনসোল** -> `/admin/reviews`

When `isCollapsed === true`, hide expanded child lists so collapsed icon rail stays clean, with tooltips preserving accessibility (`title` / `aria-label`). Ensure all sidebar links call `onCloseMobile` on click on mobile viewports or preserve Next `<Link>` navigation.

### 2.2 Route Map & Breadcrumbs (`AdminTopbar`)

| Route | Component | Purpose |
|---|---|---|
| `/admin/questions` | `QuestionBankManager` (`fixedType` omitted) | All questions directory (`MCQ` + `CQ_CREATIVE`) + Details drawer |
| `/admin/questions/mcq` | `QuestionBankManager` (`fixedType="MCQ"`) | MCQ-only filtered list, CTA -> `/admin/questions/new?type=mcq` + Details drawer |
| `/admin/questions/cq` | `QuestionBankManager` (`fixedType="CQ_CREATIVE"`) | CQ-only filtered list, CTA -> `/admin/questions/new?type=cq` + Details drawer |
| `/admin/questions/new` | `AuthoringStudio` (`mode="create"`, Question-only) | Create `MCQ` or `CQ` (if `?type=lesson`, redirects to `/admin/curriculum/lessons/new` preserving `topicId`/`subjectId`) |
| `/admin/questions/[id]/edit` | `AuthoringStudio` (`mode="edit"`, Question-only) | Edit `MCQ` or `CQ` |
| `/admin/curriculum` | `CurriculumManager` | Subjects, Chapters & Topics tree; Topic CTAs: `+ প্রশ্ন যোগ` -> `/admin/questions/new?...`, `+ পাঠ্য লেসন যোগ` -> `/admin/curriculum/lessons/new?...`, `লেসন দেখুন` -> `/admin/curriculum/lessons?topicId=...&subjectId=...` |
| `/admin/curriculum/lessons` | `LessonBankManager` | Paginated Lessons list + Subject/Chapter/Topic/Status/Search filters + Details drawer + Archive |
| `/admin/curriculum/lessons/new` | `LessonAuthoringStudio` (`mode="create"`) | Create Lesson under selected Subject > Chapter > Topic |
| `/admin/curriculum/lessons/[id]/edit` | `LessonAuthoringStudio` (`mode="edit"`) | Edit Lesson with version increment & editorial status banners |

Update [`AdminTopbar`](file:///Users/technonext/Desktop/poRi/apps/web/src/components/admin/layout/AdminTopbar.tsx) breadcrumbs:
- `/admin/curriculum` -> `অ্যাডমিন > কারিকুলাম`
- `/admin/curriculum/lessons` -> `অ্যাডমিন > কারিকুলাম > পাঠ্য লেসন`
- `/admin/curriculum/lessons/new` -> `অ্যাডমিন > কারিকুলাম > পাঠ্য লেসন > নতুন যোগ`
- `/admin/curriculum/lessons/[id]/edit` -> `অ্যাডমিন > কারিকুলাম > পাঠ্য লেসন > লেসন সম্পাদনা`
- `/admin/questions/mcq` -> `অ্যাডমিন > প্রশ্ন ব্যাংক > MCQ`
- `/admin/questions/cq` -> `অ্যাডমিন > প্রশ্ন ব্যাংক > সৃজনশীল (CQ)`

Update [`AdminTopbar`](file:///Users/technonext/Desktop/poRi/apps/web/src/components/admin/layout/AdminTopbar.tsx) and [`AdminOverviewPage`](file:///Users/technonext/Desktop/poRi/apps/web/src/app/admin/page.tsx) quick links so Lesson actions/copy point to `/admin/curriculum/lessons` instead of treating Questions as the home for Lessons.

---

## 3. Question List Extensions & "See Details" Sidebar (`apps/web`)

### 3.1 `QuestionBankManager` (`fixedType` Support)
Add optional props to [`QuestionBankManagerProps`](file:///Users/technonext/Desktop/poRi/apps/web/src/components/admin/question-bank-manager.tsx#L38-L40):
- `fixedType?: 'MCQ' | 'CQ_CREATIVE'`
- When `fixedType` is provided:
  - Always query `type={fixedType}` regardless of local filter state.
  - Lock/hide the Type filter `<select>` (show a clear header badge like `শুধুমাত্র MCQ প্রশ্ন` or `শুধুমাত্র সৃজনশীল (CQ) প্রশ্ন` + adjusted title).
  - Pre-seed `+ নতুন প্রশ্ন যোগ` CTA href with `type=mcq` or `type=cq` alongside active `subjectId` / `topicId`.
  - Remove the `+ নতুন লেসন যোগ` CTA button from `QuestionBankManager` (`newLessonHref` no longer belongs under `/admin/questions`).
  - Keep page clamping, search debouncing, stale-request sequence guards, `ARCHIVED` hiding by default, and error formatting intact.

### 3.2 `QuestionDetailDrawer` ("বিস্তারিত দেখুন" Sidebar)
Create `apps/web/src/components/admin/questions/QuestionDetailDrawer.tsx` built on [`AdminDrawer`](file:///Users/technonext/Desktop/poRi/apps/web/src/components/admin/layout/AdminDrawer.tsx) (`widthClass="max-w-xl"`):
- **Trigger:** Each row in `QuestionBankManager` includes a **"বিস্তারিত দেখুন"** button (`aria-label` including question details context) alongside `সম্পাদনা` and `আর্কাইভ`; clicking **"বিস্তারিত দেখুন"** or clicking the stem preview button opens `QuestionDetailDrawer` cleanly without intercepting Edit/Archive actions.
- **Rendered Sections:**
  1. **Metadata Header Cards:** ID (`font-mono`), Type badge (`MCQ` / `সৃজনশীল (CQ)`), Status badge, Version (`vN`), ` যাচাইকৃত / অযাচাইকৃত`, Difficulty (`EASY`/`MEDIUM`/`HARD`), `boardSource` badge, and Hierarchy path (`বিষয় > অধ্যায় > টপিক`).
  2. **Question Stem:** Full un-truncated text rendered with [`LatexRenderer`](file:///Users/technonext/Desktop/poRi/apps/web/src/components/math/latex-renderer.tsx).
  3. **MCQ Options (when `type === 'MCQ'`):** Ordered list (`ক`, `খ`, `গ`, `ঘ`, ...) highlighting `isCorrect: true` in emerald (`সঠিক উত্তর`) and displaying each option's mapped note from `explanation.distractorAnalysis[opt.id]` directly alongside/under that option (plus `explanation.distractorNotes` if present as string).
  4. **CQ Rubric (when `type === 'CQ_CREATIVE'`):** Total mark summary badge + card for each present part (`ka`, `kha`, `ga`, `gha`) with Bengali cognitive title, individual mark, and KaTeX-rendered criteria.
  5. **6-Layer Explanation & Citation:**
     - সরাসরি উত্তর (`directAnswer`)
     - মূল ধারণা (`coreConcept`)
     - ধাপওয়ারী সমাধান (`stepDerivation`, rendered with `LatexRenderer`)
     - ডিস্ট্র্যাক্টর বিশ্লেষণ / সাধারণ নোট (`distractorAnalysis` / `distractorNotes` if unmapped)
     - NCTB পাঠ্যবই রেফারেন্স (`bookTitle`, `chapterName`, `pageNumber`)
     - প্রো-টিপ / শর্টকাট (`proTipShortcut`)
     - Created / Updated timestamps (`bn-BD` or ISO fallback).
  6. **Footer Actions:**
     - `সম্পাদনা করুন` link -> `/admin/questions/${question.id}/edit` (shown when `canEdit && question.status !== 'ARCHIVED'`)
     - `আর্কাইভ করুন` button -> opens archive confirmation modal (shown when `canEdit && question.status !== 'ARCHIVED' && (question.status !== 'PUBLISHED' || isAdmin)`)
     - `বন্ধ করুন` button.
- Note: When a question currently open in `QuestionDetailDrawer` is archived from the confirmation modal, close the drawer (or update `detailItem`) cleanly after refresh.

---

## 4. Lesson Backend Contracts (`packages/shared` & `apps/api`)

### 4.1 Prisma Schema (`apps/api/prisma/schema.prisma`)
Add indexes to `model Lesson` matching `model Question`:
```prisma
  @@index([topicId, status])
  @@index([status, updatedAt])
```
Keep student safety in [`LessonService.getLessonByTopic`](file:///Users/technonext/Desktop/poRi/apps/api/src/modules/lesson/lesson.service.ts#L46-L52): when `isEditor` falls back from missing `PUBLISHED` lesson to any latest lesson, exclude `ContentStatus.ARCHIVED` (`where: { topicId, status: { not: ContentStatus.ARCHIVED } }`) so archived lessons are never accidentally served in lesson preview. Also ensure [`ContentAdminService.getTopicContent`](file:///Users/technonext/Desktop/poRi/apps/api/src/modules/content-admin/content-admin.service.ts#L484-L499) excludes `ARCHIVED` items (`where: { topicId, status: { not: ContentStatus.ARCHIVED } }`).

### 4.2 Shared Types (`packages/shared/src/types/content.ts`)
Export from `@pori/shared`:
```ts
export interface LessonTermItem {
  termBangla: string;
  termEnglish?: string;
  definition?: string;
}

export interface LessonWorkedExample {
  problem?: string;
  stepByStepSolution?: string;
}

export interface AdminLessonItem {
  id: string;
  topicId: string;
  titleBangla: string;
  learningGoal: string;
  explanation: string;
  importantTerms: LessonTermItem[];
  workedExample?: LessonWorkedExample | null;
  memoryAid?: string | null;
  status: ContentStatus;
  version: number;
  createdAt: string;
  updatedAt: string;
  topic?: QuestionTopicHierarchy;
}

export interface LessonStatusCounts {
  ALL: number;
  DRAFT: number;
  REVIEW: number;
  CORRECTION: number;
  PUBLISHED: number;
  ARCHIVED: number;
}

export interface ListLessonsResponse {
  items: AdminLessonItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  statusCounts: LessonStatusCounts;
}
```
Add Vitest contract assertions in `packages/shared/tests/types.test.ts` and rebuild `@pori/shared` before `@pori/api` / `@pori/web`.

### 4.3 DTOs, Service Modularity & Endpoints (`apps/api/src/modules/content-admin/`)
To keep files cohesive and preserve compatibility with existing unit tests (`ContentAdminService.createLesson` / Question tests):
- Extract pure validation, query-building, and transactional helpers into focused modules (`admin-content-query.util.ts`, `question-payload.validator.ts`, `lesson-payload.validator.ts`, `content-admin-lessons.helpers.ts`).
- Register [`ContentAdminLessonsService`](file:///Users/technonext/Desktop/poRi/apps/api/src/modules/content-admin/content-admin-lessons.service.ts) in `ContentAdminModule` (taking only `PrismaService`) and inject it into `ContentAdminController` for Lesson endpoints (`createLesson`, `listLessons`, `getLessonById`, `updateLesson`, `archiveLesson`), while `ContentAdminService.createLesson` calls the same pure `lesson` helper so existing `new ContentAdminService(mockPrisma)` unit tests continue passing with unchanged constructor arity.

New DTOs:
- `ListLessonsQueryDto`: optional strings `subjectId`, `chapterId`, `topicId`, `status` (`@IsEnum(ContentStatus)`), `includeArchived` (`@IsIn(['true', 'false'])`), `search`, `page`, `limit`.
- `UpdateLessonAdminDto`: optional `topicId`, `titleBangla`, `learningGoal`, `explanation`, `importantTerms` (`@IsOptional() @IsArray()`), `workedExample` (`@ValidateIf((_, v) => v !== null) @IsOptional() @IsObject()`), `memoryAid` (`@ValidateIf((_, v) => v !== null) @IsOptional() @IsString()`), `preservePublished` (`@IsOptional() @IsBoolean()`), `submitForReview` (`@IsOptional() @IsBoolean()`).

New Controller Routes on `ContentAdminController` (`/admin/content`):
1. `GET /admin/content/lessons` — `@Roles(Role.EDITOR, Role.REVIEWER, Role.ADMIN)`
   - Filters `subjectId`, `chapterId`, `topicId`, `status`, `includeArchived`, `search` (`titleBangla` or `learningGoal` case-insensitive `contains`).
   - Excludes `ContentStatus.ARCHIVED` unless `status === ContentStatus.ARCHIVED` or `includeArchived === 'true'`.
   - Validates `page`/`limit` integer strings, clamps limit `[1..100]`, caps `page` to prevent 32-bit signed `skip` overflow (reusing the exact helper pattern from `listQuestions`).
   - Returns `{ items, total, page, limit, totalPages, statusCounts }` ordered by `[{ updatedAt: 'desc' }, { createdAt: 'desc' }]` with `QUESTION_HIERARCHY_INCLUDE` (`topic > chapter > subject`).
2. `GET /admin/content/lessons/:id` — `@Roles(Role.EDITOR, Role.REVIEWER, Role.ADMIN)`
   - Returns single lesson with `QUESTION_HIERARCHY_INCLUDE`, or `404 NotFoundException`.
3. `PATCH /admin/content/lessons/:id` — `@Roles(Role.EDITOR, Role.ADMIN)`
   - Runtime type checks for `importantTerms`, `workedExample`, `memoryAid`, booleans.
   - `404` if missing; `400` if `existing.status === ContentStatus.ARCHIVED`; `403` if `dto.preservePublished === true && actorRole !== Role.ADMIN`.
   - Merges partial fields with `existing`, validates complete lesson payload (`topicId`, non-empty `titleBangla`, `learningGoal`, `explanation`, non-empty `importantTerms` with non-empty `termBangla`), verifies `topicId` exists (`404` if missing).
   - Trims optional strings; normalizes whitespace-only `memoryAid` or empty `workedExample` (`!problem.trim() && !stepByStepSolution.trim()`) to `null` / `Prisma.DbNull`.
   - Status transition rules (identical to `updateQuestion`):
     - `PUBLISHED`: stays `PUBLISHED` ONLY if `preservePublished === true && actorRole === ADMIN`; otherwise transitions to `REVIEW`.
     - `DRAFT` / `REVIEW` / `CORRECTION`: transitions to `REVIEW` if `submitForReview === true`, else preserves existing status.
   - Always increments `version: { increment: 1 }`.
4. `POST /admin/content/lessons/:id/archive` — `@HttpCode(HttpStatus.OK)`, `@Roles(Role.EDITOR, Role.ADMIN)`
   - `404` if missing; `403` if `existing.status === ContentStatus.PUBLISHED && actorRole !== Role.ADMIN`.
   - Sets `status: ContentStatus.ARCHIVED` (idempotent if already `ARCHIVED`; never hard-deletes).

---

## 5. Curriculum Lessons Bank, Detail Drawer & Studio UI (`apps/web`)

### 5.1 `LessonBankManager` & `LessonDetailDrawer` (`/admin/curriculum/lessons`)
Create:
- `apps/web/src/components/admin/lessons/LessonBankManager.tsx`
- `apps/web/src/components/admin/lessons/LessonDetailDrawer.tsx`

Capabilities mirroring `QuestionBankManager` + `QuestionDetailDrawer`:
- Accepts optional `initialSubjectId?: string` and `initialTopicId?: string` from query params (`/admin/curriculum/lessons?topicId=...&subjectId=...`) so links from Curriculum Topics pre-filter directly.
- Header with title **পাঠ্য লেসন ব্যাংক**, status summary pills (`সকল`, `প্রকাশিত`, `রিভিউ`, `সংশোধন`, `খসড়া`, `আর্কাইভকৃত`), filter reset button, and `+ নতুন লেসন যোগ` CTA linking to `/admin/curriculum/lessons/new` (carrying active `subjectId` & `topicId` when set; hidden for `REVIEWER`).
- Cascading **Subject -> Chapter -> Topic**, **Status**, and debounced **Search** (`titleBangla` / `learningGoal`) filters + pagination + out-of-range `page` clamping after archive.
- Table columns: Lesson Title & Learning Goal preview (KaTeX), Curriculum Location (`Subject > Chapter > Topic`), Important Terms count badge, Status & Version (`vN`), Actions (`বিস্তারিত দেখুন`, RBAC-gated `সম্পাদনা` -> `/admin/curriculum/lessons/[id]/edit`, RBAC-gated `আর্কাইভ`).
- Inline archive confirmation dialog (Escape closes when idle) calling `POST /admin/content/lessons/:id/archive` with `{ scope: 'admin' }`.
- **`LessonDetailDrawer` (`AdminDrawer`, `widthClass="max-w-xl"`):**
  - Renders Hierarchy & Status/Version badges, `titleBangla`, `learningGoal`, full KaTeX Markdown `explanation`, `importantTerms` list (`termBangla`, `termEnglish`, `definition`), `workedExample` (`problem` + `stepByStepSolution` with `LatexRenderer`), `memoryAid`, timestamps, and footer Edit/Archive quick actions.

### 5.2 `LessonAuthoringStudio` (`/admin/curriculum/lessons/new` & `/admin/curriculum/lessons/[id]/edit`)
Create `apps/web/src/components/admin/lessons/LessonAuthoringStudio.tsx` reusing:
- [`TopicHierarchySelector`](file:///Users/technonext/Desktop/poRi/apps/web/src/components/admin/authoring/TopicHierarchySelector.tsx) (same edit-mode partial-chapter preservation & subject-switch clear behavior!).
- [`LessonAuthoringForm`](file:///Users/technonext/Desktop/poRi/apps/web/src/components/admin/authoring/LessonAuthoringForm.tsx) (add `mode`, `isArchived`, `submitLabel` / edit-mode submit button text `পরিবর্তন সংরক্ষণ করুন`, and disable save when `ARCHIVED`).
- [`EditorialStatusBanners`](file:///Users/technonext/Desktop/poRi/apps/web/src/components/admin/authoring/EditorialStatusBanners.tsx) (generalized return link `backHref="/admin/curriculum/lessons"`, `backLabel="লেসন তালিকায় ফিরুন"`, `ARCHIVED` read-only banner, `PUBLISHED` `Keep Published` toggle for `ADMIN`, `Submit for Review` toggle on `DRAFT`/`CORRECTION`).
- Includes `নমুনা লেসন ভরুন` helper button in **create** mode (starting clean/blank by default, hidden in edit mode).
- Validates non-empty trimmed `titleBangla`, `learningGoal`, `lessonExplanation`, and at least one valid `termBangla` before submitting `POST /admin/content/lessons` or `PATCH /admin/content/lessons/:id` (`{ scope: 'admin' }`).

### 5.3 Question-Only Cleanup & Curriculum Integration
- In [`CurriculumManager`](file:///Users/technonext/Desktop/poRi/apps/web/src/components/admin/curriculum-manager.tsx):
  - Keep Subject/Chapter/Topic tree creation/management.
  - Topic actions become:
    - `+ প্রশ্ন যোগ (MCQ/CQ)` -> `/admin/questions/new?topicId=...&subjectId=...&type=mcq`
    - `লেসন দেখুন` -> `/admin/curriculum/lessons?topicId=...&subjectId=...`
    - `+ পাঠ্য লেসন যোগ` -> `/admin/curriculum/lessons/new?topicId=...&subjectId=...`
  - Keep existing `onNavigateToAuthoring` / `onNavigateToLessons` callback compatibility on [`AdminCurriculumPage`](file:///Users/technonext/Desktop/poRi/apps/web/src/app/admin/curriculum/page.tsx).
- In [`AuthoringStudio`](file:///Users/technonext/Desktop/poRi/apps/web/src/components/admin/authoring-studio.tsx):
  - Restrict `contentType` cleanly to `'MCQ' | 'CQ'` (remove `LESSON` toggle tab, `lessonForm` state, and `/admin/content/lessons` submission).
  - In `apps/web/src/app/admin/questions/new/page.tsx`: if `?type=lesson` is passed (legacy bookmark), redirect immediately to `/admin/curriculum/lessons/new` preserving `topicId` and `subjectId` query parameters.

---

## 6. Verification Plan (TDD)

1. **`@pori/shared`:** Unit tests for `AdminLessonItem`, `ListLessonsResponse`, `LessonStatusCounts`, `ContentStatus.ARCHIVED` in lesson status contracts.
2. **`@pori/api` (Unit + E2E):**
   - `ContentAdminService` unit tests & `content-admin.e2e.spec.ts` RBAC + HTTP tests for `GET /admin/content/lessons`, `GET /admin/content/lessons/:id`, `PATCH /admin/content/lessons/:id`, `POST /admin/content/lessons/:id/archive` (including `ARCHIVED` edit & review rejection, `EDITOR` cannot archive/preserve `PUBLISHED`, `ADMIN` preservePublished, `PUBLISHED -> REVIEW`, `version` increment, `topicId` existence check, `getTopicContent`/`LessonService` archived exclusion).
3. **`@pori/web` (Vitest + Testing Library):**
   - `admin-layout.test.tsx`: Sidebar 2 Question submenus (`MCQ`, `CQ`), 2 Curriculum submenus (`বিষয়, অধ্যায় ও টপিক`, `পাঠ্য লেসন`), active state highlighting across `/admin/questions/mcq`, `/admin/questions/cq`, `/admin/curriculum`, `/admin/curriculum/lessons*`, collapsed sidebar behavior, and updated Topbar breadcrumbs.
   - `admin-question-bank.test.tsx`: `QuestionBankManager` with `fixedType="MCQ"` / `fixedType="CQ_CREATIVE"`, removal of lesson add link, and **`QuestionDetailDrawer` ("বিস্তারিত দেখুন")** opening/rendering MCQ options + distractor notes, CQ `ক/খ/গ/ঘ` rubric, 6-layer explanation, and Edit/Archive footer actions across `/admin/questions`, `/admin/questions/mcq`, `/admin/questions/cq`.
   - `admin-lesson-bank.test.tsx` & `admin-lessons-studio.test.tsx`: Full `LessonBankManager` (`AdminLessonsPage`) filtering/pagination/archive + `LessonDetailDrawer` ("বিস্তারিত দেখুন"), `AdminNewLessonPage` (`/admin/curriculum/lessons/new`), and `AdminEditLessonPage` (`/admin/curriculum/lessons/[id]/edit`) hydration, `PUBLISHED`/`ADMIN`/`EDITOR`/`ARCHIVED` guards, 404/403/401 error states.
   - `admin-curriculum-drawer.test.tsx` & `admin-questions-studio.test.tsx`: Topic `+ পাঠ্য লেসন যোগ` -> `/admin/curriculum/lessons/new`, `লেসন দেখুন` -> `/admin/curriculum/lessons`, `/admin/questions/new` Question-only tabs & `?type=lesson` redirect.
4. **Live Smoke Test (`pori_db` + API + Next.js):** Push Prisma schema (`Lesson` indexes), verify all new Web routes return HTTP `200`, and verify Lesson CRUD + Question list/details/archive against live PostgreSQL.
