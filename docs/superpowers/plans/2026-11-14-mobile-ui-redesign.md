# Mobile UI Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Overhaul the Flutter mobile app (`apps/mobile`) user interface into a modern, professional, world-class educational experience (matching high standards like Duolingo, Khan Academy, and Brilliant), while keeping 100% test pass rate and pushing to Git after each milestone.

**Architecture:** 
- Upgrade `PorhiTheme` with rich design tokens: subtle multi-layer shadows, rounded geometric typography, glassmorphism/gradient accents, card elevations, and tactile feedback.
- Refactor screens across 5 distinct milestones:
  1. Design System Tokens & Auth Screens (`LoginView`, `OnboardingView`).
  2. Main Shell & Dashboard (`MainShellView`, `DashboardView`, `DashboardBannerCard`, `QuickSearchSheet`).
  3. Curriculum Exploration (`SubjectsView`, `ChapterIndexView`).
  4. Interactive Learning & Testing (`LessonView`, `PracticeView`, `ExamRunnerView`, `ExamResultView`).
  5. Personal Growth & Utility (`PlannerView`, `ProgressView`, `BoardArchiveView`, `AccountView`).
- Maintain all existing test widget `Key`s and controller contracts so all 14 test suites in `apps/mobile/test` continue passing.

**Tech Stack:** Flutter 3, Material 3, GetX, fl_chart, flutter_math_fork, cached_network_image, cupertino_icons.

**Spec:** Complete visual overhaul requested by user: "more professional and refactor all the screens as per needed and give a best user facing ui. you can also search for other apps for reference. and as i am going to sleep i hope you will take best decissiona and give be best ui. also please create new branch and push after each milestone is reached".

## Global Constraints
- Branch: `feat/mobile-ui-redesign`
- Commit & push to `origin feat/mobile-ui-redesign` after each completed milestone.
- All Flutter tests in `apps/mobile/test` must pass after each milestone (`flutter test`).
- Zero Flutter analyze errors (`dart analyze lib`).
- Preserve all existing Widget `Key`s, accessibility semantics, and bilingual (Bengali/English) string support.

---

### Milestone 1: Design System Foundation & Authentication Screens

**Files:**
- Modify: `apps/mobile/lib/core/theme/porhi_theme.dart`
- Modify: `apps/mobile/lib/features/auth/presentation/login/view/login_view.dart`
- Modify: `apps/mobile/lib/features/auth/presentation/login/widgets/phone_otp_section.dart`
- Modify: `apps/mobile/lib/features/auth/presentation/onboarding/view/onboarding_view.dart`
- Test: `apps/mobile/test/features/auth/auth_flow_test.dart`

- [ ] **Step 1: Elevate `PorhiTheme` design tokens**
  - Add soft shadows (`subtleShadow`, `cardShadow`, `elevatedShadow`, `glowShadow`).
  - Add gradient presets (`heroGradient`, `accentGradient`, `emeraldGradient`, `amberGradient`, `roseGradient`).
  - Refine `cardTheme`, `inputDecorationTheme`, `elevatedButtonTheme`, `outlinedButtonTheme`, `chipTheme` with modern radii (16–20px) and clean border styling.

- [ ] **Step 2: Redesign `LoginView` & `PhoneOtpSection`**
  - Replace basic indigo box with a modern app badge (subtle gradient, soft drop shadow, crisp Bengali typography).
  - Add warm welcoming hero header with balanced spacing.
  - Redesign Google login button with sleek elevated card feel and official icon badge.
  - Redesign Phone OTP input with styled prefix icon, smooth verification pin field, and elegant timer badge.
  - Redesign "Continue as Guest" CTA with a lightning bolt badge, soft indigo tint, and highlighted border.
  - Verify all keys (`google_signin_button`, `phone_input_field`, `send_otp_button`, `otp_input_field`, `resend_otp_button`, `guest_signin_button`) are preserved.

- [ ] **Step 3: Redesign `OnboardingView`**
  - Modernize track selection cards with vibrant icons, subtitle descriptors, checkmark badges, and active gradient borders.
  - Enhance Education Board picker and Daily Study Goal slider/chips with tactile feedback.

- [ ] **Step 4: Verify Milestone 1 tests & analyze**
  - Run: `cd apps/mobile && flutter test test/features/auth/auth_flow_test.dart && dart analyze lib/features/auth`
  - Expected: PASS

- [ ] **Step 5: Commit and push Milestone 1**
  - Run: `git add . && git commit -m "feat(ui): overhaul design system tokens, login, and onboarding screens" && git push origin feat/mobile-ui-redesign`

---

### Milestone 2: Main Shell & Dashboard Screen Overhaul

**Files:**
- Modify: `apps/mobile/lib/features/shell/presentation/main_shell/view/main_shell_view.dart`
- Modify: `apps/mobile/lib/features/dashboard/presentation/dashboard/view/dashboard_view.dart`
- Modify: `apps/mobile/lib/features/dashboard/presentation/dashboard/widgets/dashboard_banner_card.dart`
- Modify: `apps/mobile/lib/features/dashboard/presentation/shared/quick_search_sheet.dart`
- Test: `apps/mobile/test/features/dashboard/dashboard_test.dart`

- [ ] **Step 1: Redesign `MainShellView` Bottom Navigation**
  - Implement a modern, elevated bottom navigation bar with rounded top corners, subtle shadow, active pill indicator, and crisp icons.

- [ ] **Step 2: Redesign `DashboardBannerCard` & Header**
  - Upgrade hero banner to a deep indigo gradient with glassmorphism stats overlay.
  - Streak flame badge with glowing amber pill and 7-day activity circles showing completed days with checkmarks.
  - Syllabus progress indicator with animated smooth rounded progress bar.

- [ ] **Step 3: Redesign Dashboard Feed Cards**
  - `_ContinueLearningCard`: Clean card with play action icon, chapter badge, topic title, and primary action button.
  - `_RevisionDueCard`: Warm amber card with clock icon, clear mistake count, and "Start Revision" button.
  - `_PlannerAndHubCard`: Quick actions grid with rounded colored icon boxes (MCQ Practice, Model Tests, Planner, Archive, Bookmarks).

- [ ] **Step 4: Verify Milestone 2 tests & analyze**
  - Run: `cd apps/mobile && flutter test test/features/dashboard/dashboard_test.dart && dart analyze lib/features/dashboard lib/features/shell`
  - Expected: PASS

- [ ] **Step 5: Commit and push Milestone 2**
  - Run: `git add . && git commit -m "feat(ui): redesign main navigation shell and dashboard feed" && git push origin feat/mobile-ui-redesign`

---

### Milestone 3: Curriculum Exploration Screens Overhaul

**Files:**
- Modify: `apps/mobile/lib/features/curriculum/presentation/subjects/view/subjects_view.dart`
- Modify: `apps/mobile/lib/features/curriculum/presentation/curriculum/view/chapter_index_view.dart`
- Test: `apps/mobile/test/features/curriculum/curriculum_test.dart`

- [ ] **Step 1: Redesign `SubjectsView`**
  - Modern subject cards with subject category icons, progress bar, chapter/topic count pills, and offline availability badges.
  - Clean track switcher header and empty/offline state presentations.

- [ ] **Step 2: Redesign `ChapterIndexView`**
  - Chapter overview card with download all button, progress ring, and bilingual title.
  - Topic list items with timeline-style sequence indicators (১.১, ১.২...), completion checkmarks, estimated duration, and quick-launch buttons.

- [ ] **Step 3: Verify Milestone 3 tests & analyze**
  - Run: `cd apps/mobile && flutter test test/features/curriculum/curriculum_test.dart && dart analyze lib/features/curriculum`
  - Expected: PASS

- [ ] **Step 4: Commit and push Milestone 3**
  - Run: `git add . && git commit -m "feat(ui): redesign subjects directory and chapter index views" && git push origin feat/mobile-ui-redesign`

---

### Milestone 4: Interactive Lesson & Practice Engine Screens Overhaul

**Files:**
- Modify: `apps/mobile/lib/features/lesson/presentation/lesson/view/lesson_view.dart`
- Modify: `apps/mobile/lib/features/practice/presentation/practice/view/practice_view.dart`
- Modify: `apps/mobile/lib/features/exam/presentation/exam_runner/view/exam_runner_view.dart`
- Modify: `apps/mobile/lib/features/exam/presentation/exam_result/view/exam_result_view.dart`
- Test: `apps/mobile/test/features/lesson/lesson_test.dart`
- Test: `apps/mobile/test/features/practice/practice_test.dart`
- Test: `apps/mobile/test/features/exam/exam_test.dart`

- [ ] **Step 1: Redesign `LessonView`**
  - Sticky top header with scroll progress and audio player bar.
  - Redesigned 6-layer content cards: Concept, Visuals, Interactive Lab, Real-world examples, Formula callouts, and Practice checkpoint.
  - Enhanced math display with framed KaTeX formulas and high-contrast callouts.

- [ ] **Step 2: Redesign `PracticeView` & `ExamRunnerView`**
  - Modern timer bar with color shifts (Green -> Amber -> Red).
  - Refined question card with large readable text, math formula container, and bookmark/flag actions.
  - Option selector cards with circular A/B/C/D badges, smooth selection feedback, and animated correct/incorrect state reveals.
  - Detailed explanation sheet with clear concept breakdown.

- [ ] **Step 3: Redesign `ExamResultView`**
  - Trophy/score hero card with percentage ring and pass/fail badge.
  - Stat cards: accuracy, time spent, correct vs incorrect breakdown.
  - Question review list with filter chips (All, Incorrect, Unattempted).

- [ ] **Step 4: Verify Milestone 4 tests & analyze**
  - Run: `cd apps/mobile && flutter test test/features/lesson/lesson_test.dart test/features/practice/practice_test.dart test/features/exam/exam_test.dart`
  - Expected: PASS

- [ ] **Step 5: Commit and push Milestone 4**
  - Run: `git add . && git commit -m "feat(ui): overhaul lesson reader, practice, and exam runner screens" && git push origin feat/mobile-ui-redesign`

---

### Milestone 5: Personal Growth, Utilities & Full System Verification

**Files:**
- Modify: `apps/mobile/lib/features/planner/presentation/planner/view/planner_view.dart`
- Modify: `apps/mobile/lib/features/progress/presentation/progress/view/progress_view.dart`
- Modify: `apps/mobile/lib/features/board_archive/presentation/board_archive/view/board_archive_view.dart`
- Modify: `apps/mobile/lib/features/rehearsal/presentation/rehearsal/view/rehearsal_view.dart`
- Modify: `apps/mobile/lib/features/auth/presentation/account/view/account_view.dart`
- Test: `apps/mobile/test/features/planner_and_progress_test.dart`
- Test: `apps/mobile/test/features/rehearsal_and_board_test.dart`

- [ ] **Step 1: Redesign `PlannerView`**
  - Modern weekly study schedule cards with completion toggles, reminder badges, and task creation bottom sheet.

- [ ] **Step 2: Redesign `ProgressView`**
  - Interactive charts (`fl_chart`): smooth line chart for accuracy trends, chapter mastery bars, study time distribution.
  - Guardian report share card with QR code badge and one-tap share button.

- [ ] **Step 3: Redesign `BoardArchiveView` & `RehearsalView`**
  - Board archive filter chips (Board name, Year, Subject) and search bar.
  - Model test rehearsal cards with timed exam simulator controls.

- [ ] **Step 4: Redesign `AccountView`**
  - Profile card with avatar, name, track badge, and guest upgrade alert card (if guest).
  - Modern settings grouped sections (Curriculum Track, Study Goal, Language, Offline Cache, Account Security, Logout).

- [ ] **Step 5: Full test suite verification & emulator hot-restart**
  - Run all flutter tests: `cd apps/mobile && flutter test`
  - Hot restart the app on `emulator-5554` and capture a screenshot.
  - Commit and push Milestone 5.
