# Color Themes Expansion Design

## Intent & The Why
Expand the mobile app's personalization options so students can choose from a broader palette of color themes (Blue, Teal, Orange, Red, Golden) in addition to Evergreen, Indigo, and Monochrome.

## Goals, Non-Goals, Anti-Goals
- **Goals**:
  - Add `blue`, `teal`, `orange`, `red`, and `golden` to `PorhiColorTheme`.
  - Provide accurate hue-rotation matrices for consistent full-app theme coloring.
  - Display gradient preview chips and bilingual labels (English/Bengali) in the theme picker bottom sheet.
  - Persist chosen theme across app launches via `SharedPreferences`.
- **Non-Goals**:
  - Rewriting custom widgets to accept raw dynamic color palettes.
  - Web app theme sync (mobile app setting only for now).
- **Anti-Goals**:
  - Distorting monochrome or evergreen baseline styling.

## Approaches Considered
1. **Hue Rotation & Color Matrix Filter (Selected)**:
   - Uses the existing `ColorFiltered` root wrapper in `PorhiApp` driven by `AppThemeController`.
   - *Pros*: Instantly transforms all custom cards, gradients, banners, and illustrations cohesively without touching hundreds of individual UI widgets.
   - *Cons*: Slight saturation shift depending on rotation angle.
2. **Multiple Distinct `ThemeData` Palettes**:
   - Defining complete `ThemeData` instances for all 8 themes.
   - *Pros*: Fine-grained per-token control.
   - *Cons*: Requires refactoring numerous widgets with hardcoded PorhiTheme constants; high risk of visual inconsistency across screens.
   - *Verdict*: Approach 1 is already established and architected for this app.

## Implementation Details
- **Enum**: `PorhiColorTheme { evergreen, indigo, blue, teal, orange, red, golden, monochrome }`
- **Hue Rotations**:
  - `evergreen`: null (0°)
  - `indigo`: 118°
  - `blue`: 52°
  - `teal`: 18°
  - `orange`: 225°
  - `red`: 190°
  - `golden`: 240°
  - `monochrome`: grayscale matrix
- **UI Swatches & Labels**:
  - Gradient preview swatches in `account_view.dart`'s `_ColorThemeOption`.
  - Localized labels in Bengali and English (নীল/Blue, টিল/Teal, কমলা/Orange, লাল/Red, সোনালী/Golden).
- **Tests**:
  - Unit test in `apps/mobile/test/core/theme_controller_test.dart` verifying all themes, storage persistence, and filter generation.
