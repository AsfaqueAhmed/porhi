# Design Specification: poRi Admin Enterprise UI & Workflow Architecture

**Date:** 2026-11-08  
**Status:** Approved by User  
**Target Applications:** `apps/web` (Next.js 15 PWA frontend) and `apps/api` (NestJS backend)

---

## 1. Executive Summary & Goals

### 1.1 Problem Statement
The current poRi Admin UI was initially assembled as a single monolithic page (`/admin/content`) with client-side tab switching. While all backend operations (Subjects, Chapters, Topics, Questions, Model Tests, and Reviews) exist and are fully functional, the user experience does not meet modern enterprise EdTech SaaS benchmarks (such as Linear, Stripe, Coursera Studio, and Retool):
- Lack of persistent, high-density navigation;
- Inability to deep-link or use browser back/forward buttons across admin sub-modules;
- Cluttered modal popups instead of contextual slide-over flyout sheets;
- Lack of real-time split-screen student simulation when authoring complex 6-layer KaTeX questions;
- Absence of a cohesive enterprise design system (breadcrumbs, command shortcuts, sticky toolbars).

### 1.2 Objective
Transform the poRi Admin Portal into a world-class, enterprise-grade EdTech Content Management System (CMS) and Learning Management System (LMS) with:
1. **Modular Route Architecture:** Dedicated Next.js pages with a shared persistent enterprise layout (`/admin`, `/admin/curriculum`, `/admin/questions`, `/admin/model-tests`, `/admin/reviews`).
2. **Contextual Slide-Over Sheets:** Right-anchored flyout drawers for adding and editing Subjects, Chapters, and Topics without losing curriculum tree focus.
3. **Split-Screen Authoring Studio:** Left pane for KaTeX math and 6-layer MCQ/Lesson inputs; right pane for an interactive live student mobile simulator.
4. **Cohesive Design System:** Persistent foldable sidebar, dynamic breadcrumbs, live API health indicators, and unsaved changes protection.

---

## 2. Information Architecture & Routing

### 2.1 Directory Structure (`apps/web/src/app/admin/`)
```text
apps/web/src/app/admin/
├── layout.tsx                # Shared enterprise shell: Sidebar, Topbar, Breadcrumbs, Shortcuts
├── page.tsx                  # /admin -> Overview & Syllabus Analytics Dashboard (KPIs, Gauges)
├── curriculum/
│   └── page.tsx              # /admin/curriculum -> Subject > Chapter > Topic Tree Explorer
├── questions/
│   └── page.tsx              # /admin/questions -> Split-Screen 6-layer Authoring & Student Simulator
├── model-tests/
│   └── page.tsx              # /admin/model-tests -> Timed Chapter & Full Model Test Configurator
└── reviews/
    └── page.tsx              # /admin/reviews -> Editorial Audit Console & Student Reviewer Sandbox
```

### 2.2 Navigation Map & Deep-Link Query Parameters
| Route | Purpose | Key Query Parameters |
|---|---|---|
| `/admin` | High-level metrics, completion gauges, quick actions | None |
| `/admin/curriculum` | 3-tier expandable curriculum tree with slide-over drawers | `?subjectId=<id>&chapterId=<id>` |
| `/admin/questions` | 6-layer question & lesson authoring + live preview | `?topicId=<id>&subjectId=<id>&type=mcq\|lesson` |
| `/admin/model-tests` | Timed test builder, negative marks, pass marks | `?subjectId=<id>&chapterId=<id>` |
| `/admin/reviews` | Review queue, student simulator, audit timeline | `?reviewId=<id>` |

---

## 3. UI Component Architecture & Design System

### 3.1 Persistent Enterprise Layout (`AdminLayout`)
* **Collapsible Left Sidebar (`AdminSidebar.tsx`):**
  * Brand Header: poRi EdTech Admin badge with version `v0.2.0` and live database connection pulse.
  * Role Tag: "Super Admin" / "Curriculum Lead".
  * Navigation Items with active path highlighting (`bg-indigo-50 text-indigo-700 font-semibold border-r-2 border-indigo-600`):
    * 📊 ড্যাশবোর্ড (`/admin`)
    * 📚 কারিকুলাম ট্রাফি (`/admin/curriculum`)
    * ✍️ প্রশ্ন ও লেসন স্টুডিও (`/admin/questions`)
    * 🏆 মডেল টেস্ট ম্যানেজার (`/admin/model-tests`)
    * 🛡️ রিভিউ ও অডিট কনসোল (`/admin/reviews`)
  * Bottom Dock: Switch to Student Learning App (`/dashboard`) with external link icon, collapse sidebar toggle button.
* **Top Navigation Bar (`AdminTopbar.tsx`):**
  * Dynamic Breadcrumbs reflecting current route and active entity (e.g., `Admin / কারিকুলাম / পদার্থবিজ্ঞান / অধ্যায় ২: গতি`).
  * Global Search Trigger (`⌘K` shortcut trigger with search dialog).
  * System API Status: Real-time badge indicating backend connectivity to `http://localhost:3001`.
  * Quick Action: "+ নতুন আইটেম" dropdown menu.

### 3.2 Slide-Over Flyout Drawer (`AdminDrawer.tsx`)
* Right-anchored sheet with backdrop blur and smooth slide-in transition (`translate-x-0`).
* Configurable title, subtitle, footer with "বাতিল" (Cancel) and "সংরক্ষণ করুন" (Save) buttons with loading spinners.
* Used for:
  * Creating & editing Subjects (`AddSubjectDrawer`)
  * Creating & editing Chapters under a Subject (`AddChapterDrawer`)
  * Creating & editing Topics under a Chapter (`AddTopicDrawer`)
* Preserves underlying curriculum tree view, preventing context switching disorientation.

### 3.3 Split-Screen Authoring Studio (`/admin/questions`)
* **Left Pane (60% width on desktop, 100% on mobile):**
  * Subject, Chapter, Topic cascading pickers (auto-filled if launched via `?topicId=...`).
  * Formula Toolbar (`MathToolbar.tsx`) with quick chips for exponents (`x²`), fractions (`\frac{a}{b}`), roots (`\sqrt{}`), Greek letters (`\alpha, \beta, \Delta`), vectors (`\vec{v}`), and units.
  * Question stem textarea with KaTeX syntax support.
  * 4 Option input rows (A, B, C, D) with radio selector for correct answer.
  * 6-Layer Multi-Layer Explanation Accordions:
    1. কোর সঠিক উত্তর ব্যাখ্যা
    2. অপশনভিত্তিক ভুল উত্তর (Distractor) বিশ্লেষণ
    3. ধাপভিত্তিক গাণিতিক সমাধান
    4. NCTB পাঠ্যবই রেফারেন্স (বই, অধ্যায়, পৃষ্ঠা, প্যারা)
    5. ভর্তি ও বোর্ড পরীক্ষার প্রো-টিপ শর্টকাট
* **Right Pane (40% width, sticky desktop layout):**
  * **Live Student Simulator:** Displays an interactive mobile device frame showing:
    * Real-time KaTeX rendered question stem.
    * Clickable options with instant feedback styling.
    * Expandable explanation accordions mimicking the student PWA interface (`/practice/[chapterId]`).
    * NCTB book badge and hint toggle.

### 3.4 Model Test Configurator (`/admin/model-tests`)
* Subject and chapter selector with quick summary cards.
* Exam blueprint configuration:
  * Duration slider/input (10 to 60 minutes).
  * Question count (10 to 50 questions).
  * Negative marking options: `0` (None), `-0.25` (Standard SSC/HSC), `-0.50` (Medical/Varsity).
  * Pass mark threshold percentage (e.g., 40% or 60%).
* Direct action to launch live student exam session in a new tab (`/exam/[chapterId]`).

### 3.5 Editorial Review Console (`/admin/reviews`)
* Pending submissions list with author info, subject/topic badges, and submission timestamp.
* Split view comparison:
  * Original text vs Proposed edits.
  * Student Simulation view for live testing before approval.
* Audit trail timeline showing reviewer actions, approval stamps, or rejection reasons with actionable feedback.

---

## 4. API & Data Flow

### 4.1 Backend Endpoints (`apps/api`)
* `GET /curriculum/subjects` — Fetch subjects with chapter counts and readiness.
* `GET /curriculum/subjects/:subjectId/chapters` — Fetch chapters with topics.
* `POST /admin/content/subjects` — Create subject.
* `POST /admin/content/subjects/:id/toggle-ready` — Toggle syllabus visibility.
* `POST /admin/content/chapters` — Create chapter under subject.
* `POST /admin/content/topics` — Create topic under chapter.
* `GET /admin/content/topics/:topicId/content` — Fetch questions & lessons for topic.
* `POST /admin/content/submit` — Submit question/lesson for editorial review.
* `POST /admin/content/reviews/:id/decision` — Approve or request changes.

### 4.2 Client State & Routing Synchronization
* `useSearchParams` hook used across `/admin/curriculum` and `/admin/questions` to ensure selected filters and entities are bookmarkable and survive page reloads.
* Optimistic UI updates on drawer submissions with automatic cache invalidation.

---

## 5. Error Handling & Quality Guarantees

1. **Unsaved Form Data Guard:**
   - Detect dirty form state in Authoring Studio; prompt user if attempting to navigate away before saving.
2. **Field-Level Validation:**
   - Real-time feedback for required fields, minimum options, and valid LaTeX syntax.
3. **TypeScript Strictness:**
   - Zero `any` types; all API responses typed via shared DTO interfaces from `@pori/shared`.
4. **Test Suite Requirements:**
   - Dedicated unit tests for `AdminLayout`, `AdminSidebar`, `AdminDrawer`, `AdminBreadcrumbs`.
   - Next.js build verification (`pnpm -r build`) with zero type errors.

---

## 6. Implementation Phasing

1. **Phase 1: Shell & Layout Foundation**
   - Create `apps/web/src/components/admin/layout/AdminSidebar.tsx`
   - Create `apps/web/src/components/admin/layout/AdminTopbar.tsx`
   - Create `apps/web/src/components/admin/layout/AdminDrawer.tsx`
   - Create `apps/web/src/app/admin/layout.tsx`
2. **Phase 2: Modular Page Construction**
   - Refactor Overview to `apps/web/src/app/admin/page.tsx`
   - Refactor Curriculum to `apps/web/src/app/admin/curriculum/page.tsx` with Slide-over drawers
   - Refactor Questions to `apps/web/src/app/admin/questions/page.tsx` with Split-Screen simulator
   - Refactor Model Tests to `apps/web/src/app/admin/model-tests/page.tsx`
   - Refactor Reviews to `apps/web/src/app/admin/reviews/page.tsx`
3. **Phase 3: Verification & Integration**
   - Add unit tests for admin layout and drawer components.
   - Run full monorepo test suite and production build.
   - Verify live servers at `http://localhost:3000/admin`.
