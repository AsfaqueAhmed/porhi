# Interactive Lab Light UI Overhaul — Implementation Plan

1. **Vernier Caliper Upgrade**
   - Recover the full NCTB Vernier Caliper implementation from `git show f004c72:drafts/physics-chapter-1/section-06.html`.
   - Build a standalone light-themed `apps/api/prisma/sample-simulations/vernier-caliper.html` using the unified light `.app`/`.layout` structure, stage-first mobile layout, `−`/`+` steppers + quick step buttons, interactive presets, quiz mode, and offline HTML math.

2. **Unified Light Theme, Steppers, Mobile Layout & Math across All 24 Simulations**
   - Inspect canvas/SVG drawing routines and dark-surface elements across the remaining 23 named simulations (`apps/api/prisma/sample-simulations/[a-z]*.html`).
   - Apply a consistent CSS + JS transformation:
     - Unified light CSS theme, light `.stage` / `.canvas-wrap`, light slider track + `24px` thumb, and `.pori-stepper-row` / `.pori-step-btn` styles.
     - Light stage canvas/SVG backdrop & ink colors without reducing contrast on `#ffffff` labels inside colored shapes.
     - Mobile `@media (max-width: 820px)` stage-first ordering and `@media (max-width: 640px)` single-column controls / 2x2 telemetry grids.
     - Consistent `.eyebrow` header pill and `−` / `+` stepper wrapping around every range slider.
     - Replace every raw `$...$` LaTeX occurrence across all 15 affected files with offline semantic HTML math.
   - Validate all extracted inline `<script>` blocks with `node --check` and confirm zero raw `$...$` LaTeX matches remain.

3. **Sync Simulation Assets to Live API Uploads**
   - Copy `apps/api/prisma/sample-simulations/[a-z]*.html` into `apps/api/uploads/interactive/` and verify zero diff.

4. **Update Flutter & Web Light Chrome**
   - Update `apps/mobile/lib/core/widgets/interactive_lab/interactive_lab_card.dart` and `apps/mobile/lib/features/lesson/presentation/lesson/view/lesson_view.dart` to light surface colors while preserving all widget test tooltips and copy.
   - Update `apps/web/src/components/content/interactive-simulation-runner.tsx` to light surface colors while preserving all `aria-label` and `title` attributes.

5. **Verification & Runtime Check**
   - Run `flutter test test/core/rich_content_test.dart` and `dart analyze lib/core/widgets/interactive_lab lib/features/lesson` in `apps/mobile`.
   - Run `pnpm --filter @pori/web test interactive-simulation-runner.test.tsx`.
   - Commit changes on `feat/interactive-lab-ui-overhaul` and hot-restart the Flutter app on `emulator-5554`.
