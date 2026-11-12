import 'package:common/common.dart';
import 'package:flutter/material.dart';

/// porhi visual theme matching the poRi web indigo-emerald-slate palette.
class PorhiTheme {
  // Brand & surface palette (mirrors apps/web Tailwind indigo / emerald / slate)
  static const Color indigo600 = Color(0xFF4F46E5);
  static const Color indigo700 = Color(0xFF4338CA);
  static const Color indigo50 = Color(0xFFEEF2FF);
  static const Color emerald600 = Color(0xFF059669);
  static const Color emerald50 = Color(0xFFECFDF5);
  static const Color slate900 = Color(0xFF0F172A);
  static const Color slate700 = Color(0xFF334155);
  static const Color slate600 = Color(0xFF475569);
  static const Color slate400 = Color(0xFF94A3B8);
  static const Color slate200 = Color(0xFFE2E8F0);
  static const Color slate100 = Color(0xFFF1F5F9);
  static const Color slate50 = Color(0xFFF8FAFC);
  static const Color rose600 = Color(0xFFE11D48);

  static AppButtonStyle get primaryButtonStyle => AppButtonStyle(
        textColor: Colors.white,
        textStyle: const TextStyle(
          fontSize: 15,
          fontWeight: FontWeight.w700,
          color: Colors.white,
        ),
        bgColor: indigo600,
        borderRadius: 12,
        buttonHeight: 50,
      );

  static AppButtonStyle get secondaryButtonStyle => AppButtonStyle(
        textColor: slate900,
        textStyle: const TextStyle(
          fontSize: 15,
          fontWeight: FontWeight.w600,
          color: slate900,
        ),
        bgColor: slate100,
        borderColor: slate200,
        borderRadius: 12,
        buttonHeight: 48,
      );

  static ConfirmationDialogStyle get confirmationDialogStyle =>
      ConfirmationDialogStyle(
        bgColor: Colors.white,
        dialogBorderRadius: 16,
        iconSize: 40,
        titleStyle: const TextStyle(
          fontSize: 18,
          fontWeight: FontWeight.w700,
          color: slate900,
        ),
        contentStyle: const TextStyle(
          fontSize: 14,
          height: 1.5,
          color: slate600,
        ),
        rightButtonStyle: primaryButtonStyle,
        leftButtonStyle: secondaryButtonStyle,
      );

  /// Initializes the vendored `common` package with porhi's button and dialog styles.
  static Future<void> initCommon({
    bool enableLogger = false,
    GlobalKey<NavigatorState>? navigatorKey,
  }) async {
    await Common.init(
      enableLogger: enableLogger,
      primaryButtonStyle: primaryButtonStyle,
      appConfirmationDialogStyle: confirmationDialogStyle,
      navigatorKey: navigatorKey,
    );
  }

  static ThemeData get light {
    const colorScheme = ColorScheme.light(
      primary: indigo600,
      onPrimary: Colors.white,
      primaryContainer: indigo50,
      onPrimaryContainer: indigo700,
      secondary: emerald600,
      onSecondary: Colors.white,
      secondaryContainer: emerald50,
      onSecondaryContainer: emerald600,
      surface: Colors.white,
      onSurface: slate900,
      error: rose600,
      onError: Colors.white,
      outline: slate200,
    );

    return ThemeData(
      useMaterial3: true,
      colorScheme: colorScheme,
      scaffoldBackgroundColor: slate50,
      appBarTheme: const AppBarTheme(
        backgroundColor: Colors.white,
        foregroundColor: slate900,
        elevation: 0,
        scrolledUnderElevation: 0.5,
        centerTitle: false,
        titleTextStyle: TextStyle(
          fontSize: 18,
          fontWeight: FontWeight.w700,
          color: slate900,
        ),
      ),
      cardTheme: CardThemeData(
        color: Colors.white,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
          side: const BorderSide(color: slate200),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: Colors.white,
        contentPadding: const EdgeInsets.symmetric(
          horizontal: 14,
          vertical: 12,
        ),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: slate200),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: slate200),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: indigo600, width: 1.5),
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: indigo600,
          foregroundColor: Colors.white,
          minimumSize: const Size(0, 48),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          textStyle: const TextStyle(
            fontSize: 15,
            fontWeight: FontWeight.w700,
          ),
        ),
      ),
      dividerTheme: const DividerThemeData(
        color: slate200,
        thickness: 1,
      ),
    );
  }
}
