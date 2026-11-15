# Interactive Lab Light UI Overhaul — Design

**Date:** 2026-11-15  
**Branch:** `feat/interactive-lab-ui-overhaul`  
**Scope:** Simulation HTML assets (`apps/api/prisma/sample-simulations/[a-z]*.html` + synced copies in `apps/api/uploads/interactive/`) and their Flutter (`apps/mobile`) & Web (`apps/web`) wrapper chrome.

## Goals

1. **Light-themed Simulation HTML & Chrome**
   - Unify all 24 named simulations on a crisp light palette (`#f8fafc` viewport, `#ffffff` cards/controls, `#f8fbff` / `#f1f5f9` simulation stage canvases, `#1e293b` primary ink, `#4f46e5` indigo accent).
   - Remove dark `#0f172a` / `#1e293b` outer containers and `#0f172a` canvas/SVG backgrounds across both `.app`+`.layout` and `.container` simulation families while preserving high-contrast `#ffffff` labels inside dark/colored simulation objects.
   - Update `InteractiveLabCard` (`apps/mobile`), `_openLessonLab` (`apps/mobile`), and `InteractiveSimulationRunner` (`apps/web`) from `slate-900`/`slate-800` dark chrome to matching light surfaces (`Colors.white` / `bg-white`, `slate-50` canvas container, indigo badge pill) while keeping all existing test tooltips and accessibility labels intact.

2. **Easy, Touch-Friendly Controls & Consistency**
   - Replace dark skeuomorphic sliders (`#232732`, `22x10px` thumbs) with clean light tracks and `24px` circular indigo thumbs.
   - Mount uniform `−` and `+` stepper buttons around every `<input type="range">` via an upgraded `PORI UNIFIED RANGE SYNC` script so learners on touchscreens can make fine step adjustments without fighting slider dragging.
   - Ensure consistent header badges (`.eyebrow`), control styling, and telemetry cards across all 24 named simulations.
   - Standardize mobile responsive rules (`<=820px` and `<=640px`), including stage-first vertical ordering on narrow viewports so the interactive visualization stays visible above controls.

3. **Simulation Quality & Offline Math**
   - Upgrade `vernier-caliper.html` from its minimal placeholder to the full NCTB Textbook Vernier Caliper Simulator (zoomed vernier scale view, fine step controls `-1 mm`, `-0.1 mm`, `+0.1 mm`, `+1 mm`, NCTB Fig 1.06 & practice presets, and interactive quiz mode) in the unified light theme.
   - Replace all raw `$...$` LaTeX strings across the 15 affected simulations with pure offline semantic HTML (`<i>`, `<sub>`, `<sup>`) and Unicode physics symbols (`θ`, `Δ`, `η`, `λ`, `≥`, `×`, `°`).
