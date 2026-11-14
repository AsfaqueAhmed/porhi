# Color Themes Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand the mobile app's color theme selector with 5 additional themes (Blue, Teal, Orange, Red, Golden) while preserving Evergreen, Indigo, and Monochrome.

**Architecture:** Color themes are represented as variants of the `PorhiColorTheme` enum. A GetX `AppThemeController` manages current selection, persists to `SharedPreferences`, and produces a `ColorFilter` via hue-rotation matrices applied at the root of `PorhiApp`. The user selects themes from a bottom sheet in `AccountView` which displays two-tone swatch previews and localized labels in English and Bengali.

**Tech Stack:** Flutter, Dart, GetX, SharedPreferences.

**Spec:** `docs/superpowers/specs/2026-11-14-color-themes-design.md`

## Global Constraints
- Target platform: Flutter mobile (`apps/mobile`).
- State management: GetX (`AppThemeController` extending `GetxController`).
- SharedPreferences key: `porhi_color_theme`.
- Localization: Bilingual support (English and Bengali) for all labels.
- Baseline palette: Evergreen is default with null filter.

## Review Focus
- Unrecognized or corrupt stored theme key in SharedPreferences falls back cleanly to `PorhiColorTheme.evergreen`.
- Opening theme picker temporarily disables the active color filter so theme preview swatches show true colors.
- Color matrix degree calculations for all non-evergreen/non-monochrome themes return valid 4x5 matrices with alpha diagonal 1.0.
- Theme switching updates reactive `AppThemeController.selected` observable immediately without app restart.
- Swatches and labels in `AccountView` render correctly for all 8 themes in both English and Bengali.

---

### Task 1: Extend `PorhiColorTheme` and `AppThemeController`

**Files:**
- Modify: `apps/mobile/lib/core/theme/app_theme_controller.dart`
- Create: `apps/mobile/test/core/theme/theme_controller_test.dart`

**Interfaces:**
- Consumes: `SharedPreferences`, `GetxController`, `PorhiColorTheme`
- Produces: `PorhiColorTheme { evergreen, indigo, blue, teal, orange, red, golden, monochrome }`, `AppThemeController.colorFilter`, `AppThemeController.select(PorhiColorTheme)`

- [ ] **Step 1: Write the failing unit tests for theme controller**

Create `apps/mobile/test/core/theme/theme_controller_test.dart` asserting:
1. All 8 enum values exist: `evergreen`, `indigo`, `blue`, `teal`, `orange`, `red`, `golden`, `monochrome`.
2. Initial default theme is `evergreen` and its `colorFilter` is `null`.
3. Selecting each theme (`blue`, `teal`, `orange`, `red`, `golden`, `indigo`, `monochrome`) returns a non-null `ColorFilter` (except `evergreen`).
4. Persistence stores and restores each theme value cleanly in `SharedPreferences`.
5. Fallback logic returns `evergreen` if stored value is invalid.

- [ ] **Step 2: Run test to verify it fails**

Run: `cd apps/mobile && flutter test test/core/theme/theme_controller_test.dart`
Expected: FAIL with compilation error that `blue`, `teal`, `orange`, `red`, `golden` are not elements of `PorhiColorTheme`.

- [ ] **Step 3: Implement new themes in `AppThemeController`**

In `apps/mobile/lib/core/theme/app_theme_controller.dart`:
1. Update `enum PorhiColorTheme { evergreen, indigo, blue, teal, orange, red, golden, monochrome }`.
2. Update `colorFilter` switch expression:
   - `PorhiColorTheme.evergreen => null`
   - `PorhiColorTheme.indigo => ColorFilter.matrix(_hueRotation(118))`
   - `PorhiColorTheme.blue => ColorFilter.matrix(_hueRotation(52))`
   - `PorhiColorTheme.teal => ColorFilter.matrix(_hueRotation(18))`
   - `PorhiColorTheme.orange => ColorFilter.matrix(_hueRotation(225))`
   - `PorhiColorTheme.red => ColorFilter.matrix(_hueRotation(190))`
   - `PorhiColorTheme.golden => ColorFilter.matrix(_hueRotation(240))`
   - `PorhiColorTheme.monochrome => const ColorFilter.matrix(...)`

- [ ] **Step 4: Run test to verify it passes**

Run: `cd apps/mobile && flutter test test/core/theme/theme_controller_test.dart`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add apps/mobile/lib/core/theme/app_theme_controller.dart apps/mobile/test/core/theme/theme_controller_test.dart
git commit -m "feat(theme): add blue, teal, orange, red, and golden themes to controller"
```

---

### Task 2: Update `AccountView` theme picker swatches and localization

**Files:**
- Modify: `apps/mobile/lib/features/auth/presentation/account/view/account_view.dart:523-579`
- Create: `apps/mobile/test/features/auth/theme_picker_test.dart`

**Interfaces:**
- Consumes: `PorhiColorTheme`, `AppThemeController`, `AppStrings`, `AppLanguage`
- Produces: UI widgets `_ColorThemeOption` and `_themeLabel` covering all 8 `PorhiColorTheme` options.

- [ ] **Step 1: Write the failing widget test**

Create `apps/mobile/test/features/auth/theme_picker_test.dart`:
1. Renders `_ColorThemeOption` for all 8 `PorhiColorTheme` options in Bengali (`AppLanguage.bn`) and English (`AppLanguage.en`).
2. Asserts proper localized labels:
   - Bengali: 'চিরসবুজ', 'ইন্ডিগো', 'নীল', 'টিল', 'কমলা', 'লাল', 'সোনালী', 'সাদা-কালো'
   - English: 'Evergreen', 'Indigo', 'Blue', 'Teal', 'Orange', 'Red', 'Golden', 'Black & white'
3. Asserts each key `Key('color_theme_${theme.name}')` is present in the widget tree.

- [ ] **Step 2: Run test to verify it fails**

Run: `cd apps/mobile && flutter test test/features/auth/theme_picker_test.dart`
Expected: FAIL because `account_view.dart` switch statement does not cover `blue`, `teal`, `orange`, `red`, `golden`.

- [ ] **Step 3: Update `account_view.dart` with swatches and localized labels**

In `apps/mobile/lib/features/auth/presentation/account/view/account_view.dart`:
1. Update `_ColorThemeOption.build` swatch colors:
   - `PorhiColorTheme.evergreen => const [Color(0xFF176B58), Color(0xFFD8EF83)]`
   - `PorhiColorTheme.indigo => const [Color(0xFF4338CA), Color(0xFFC7D2FE)]`
   - `PorhiColorTheme.blue => const [Color(0xFF1D4ED8), Color(0xFF93C5FD)]`
   - `PorhiColorTheme.teal => const [Color(0xFF0F766E), Color(0xFF99F6E4)]`
   - `PorhiColorTheme.orange => const [Color(0xFFC2410C), Color(0xFFFED7AA)]`
   - `PorhiColorTheme.red => const [Color(0xFFB91C1C), Color(0xFFFECACA)]`
   - `PorhiColorTheme.golden => const [Color(0xFFB45309), Color(0xFFFDE68A)]`
   - `PorhiColorTheme.monochrome => const [Color(0xFF171717), Color(0xFFE5E5E5)]`
2. Update `_themeLabel` function:
   - `PorhiColorTheme.evergreen => AppStrings.tr('চিরসবুজ', 'Evergreen', language)`
   - `PorhiColorTheme.indigo => AppStrings.tr('ইন্ডিগো', 'Indigo', language)`
   - `PorhiColorTheme.blue => AppStrings.tr('নীল', 'Blue', language)`
   - `PorhiColorTheme.teal => AppStrings.tr('টিল', 'Teal', language)`
   - `PorhiColorTheme.orange => AppStrings.tr('কমলা', 'Orange', language)`
   - `PorhiColorTheme.red => AppStrings.tr('লাল', 'Red', language)`
   - `PorhiColorTheme.golden => AppStrings.tr('সোনালী', 'Golden', language)`
   - `PorhiColorTheme.monochrome => AppStrings.tr('সাদা-কালো', 'Black & white', language)`

- [ ] **Step 4: Run test to verify it passes**

Run: `cd apps/mobile && flutter test test/features/auth/theme_picker_test.dart`
Expected: PASS

- [ ] **Step 5: Run full mobile test suite to ensure no regressions**

Run: `cd apps/mobile && flutter test`
Expected: All tests pass.

- [ ] **Step 6: Commit**

```bash
git add apps/mobile/lib/features/auth/presentation/account/view/account_view.dart apps/mobile/test/features/auth/theme_picker_test.dart
git commit -m "feat(ui): add swatches and bilingual labels for expanded themes"
```
