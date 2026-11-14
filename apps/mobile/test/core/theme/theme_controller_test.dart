import 'package:flutter_test/flutter_test.dart';
import 'package:get/get.dart';
import 'package:porhi/core/theme/app_theme_controller.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  setUp(() {
    Get.reset();
  });

  group('PorhiColorTheme', () {
    test('contains all expected 8 theme variants', () {
      expect(PorhiColorTheme.values, containsAll([
        PorhiColorTheme.evergreen,
        PorhiColorTheme.indigo,
        PorhiColorTheme.blue,
        PorhiColorTheme.teal,
        PorhiColorTheme.orange,
        PorhiColorTheme.red,
        PorhiColorTheme.golden,
        PorhiColorTheme.monochrome,
      ]));
      expect(PorhiColorTheme.values.length, 8);
    });
  });

  group('AppThemeController', () {
    test('initializes with evergreen theme and null colorFilter', () async {
      SharedPreferences.setMockInitialValues({});
      final controller = AppThemeController();
      controller.onInit();
      // Allow async _restore to complete
      await Future<void>.delayed(const Duration(milliseconds: 10));

      expect(controller.selected.value, PorhiColorTheme.evergreen);
      expect(controller.colorFilter, isNull);
    });

    test('select persists theme and updates reactive value', () async {
      SharedPreferences.setMockInitialValues({});
      final controller = AppThemeController();
      controller.onInit();
      await Future<void>.delayed(const Duration(milliseconds: 10));

      for (final theme in PorhiColorTheme.values) {
        await controller.select(theme);
        expect(controller.selected.value, theme);

        final prefs = await SharedPreferences.getInstance();
        expect(prefs.getString('porhi_color_theme'), theme.name);

        if (theme == PorhiColorTheme.evergreen) {
          expect(controller.colorFilter, isNull);
        } else {
          expect(controller.colorFilter, isNotNull);
        }
      }
    });

    test('restores stored theme from SharedPreferences', () async {
      SharedPreferences.setMockInitialValues({
        'porhi_color_theme': 'golden',
      });
      final controller = AppThemeController();
      controller.onInit();
      await Future<void>.delayed(const Duration(milliseconds: 10));

      expect(controller.selected.value, PorhiColorTheme.golden);
      expect(controller.colorFilter, isNotNull);
    });

    test('falls back to evergreen when stored theme is invalid', () async {
      SharedPreferences.setMockInitialValues({
        'porhi_color_theme': 'unknown_theme_xyz',
      });
      final controller = AppThemeController();
      controller.onInit();
      await Future<void>.delayed(const Duration(milliseconds: 10));

      expect(controller.selected.value, PorhiColorTheme.evergreen);
      expect(controller.colorFilter, isNull);
    });

    test('colorFilter is null while theme picker is open', () async {
      SharedPreferences.setMockInitialValues({});
      final controller = AppThemeController();
      controller.onInit();
      await controller.select(PorhiColorTheme.blue);
      expect(controller.colorFilter, isNotNull);

      controller.isThemePickerOpen.value = true;
      expect(controller.colorFilter, isNull);

      controller.isThemePickerOpen.value = false;
      expect(controller.colorFilter, isNotNull);
    });
  });
}
