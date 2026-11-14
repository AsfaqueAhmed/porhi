import 'package:common/common.dart';
import 'package:flutter/material.dart';

/// porhi visual theme matching the poRi web indigo-emerald-slate palette.
class PorhiTheme {
  // Brand & surface palette (mirrors apps/web Tailwind indigo / emerald / slate)
  static const Color indigo600 = Color(0xFF4F46E5);
  static const Color indigo700 = Color(0xFF4338CA);
  static const Color indigo800 = Color(0xFF3730A3);
  static const Color indigo900 = Color(0xFF312E81);
  static const Color indigo50 = Color(0xFFEEF2FF);
  static const Color indigo100 = Color(0xFFE0E7FF);

  static const Color emerald600 = Color(0xFF059669);
  static const Color emerald500 = Color(0xFF10B981);
  static const Color emerald50 = Color(0xFFECFDF5);
  static const Color emerald100 = Color(0xFFD1FAE5);

  static const Color amber500 = Color(0xFFF59E0B);
  static const Color amber600 = Color(0xFFD97706);
  static const Color amber50 = Color(0xFFFFFBEB);
  static const Color amber100 = Color(0xFFFEF3C7);

  static const Color violet600 = Color(0xFF7C3AED);
  static const Color violet500 = Color(0xFF8B5CF6);
  static const Color violet50 = Color(0xFFF5F3FF);

  static const Color sky600 = Color(0xFF0284C7);
  static const Color sky500 = Color(0xFF0EA5E9);
  static const Color sky50 = Color(0xFFF0F9FF);

  static const Color slate900 = Color(0xFF0F172A);
  static const Color slate800 = Color(0xFF1E293B);
  static const Color slate700 = Color(0xFF334155);
  static const Color slate600 = Color(0xFF475569);
  static const Color slate500 = Color(0xFF64748B);
  static const Color slate400 = Color(0xFF94A3B8);
  static const Color slate300 = Color(0xFFCBD5E1);
  static const Color slate200 = Color(0xFFE2E8F0);
  static const Color slate100 = Color(0xFFF1F5F9);
  static const Color slate50 = Color(0xFFF8FAFC);
  static const Color rose600 = Color(0xFFE11D48);
  static const Color rose500 = Color(0xFFF43F5E);
  static const Color rose50 = Color(0xFFFFF1F2);

  // Modern soft shadows for depth & visual hierarchy
  static List<BoxShadow> get subtleShadow => const <BoxShadow>[
        BoxShadow(
          color: Color(0x080F172A),
          blurRadius: 10,
          offset: Offset(0, 3),
        ),
      ];

  static List<BoxShadow> get cardShadow => const <BoxShadow>[
        BoxShadow(
          color: Color(0x0C0F172A),
          blurRadius: 16,
          offset: Offset(0, 4),
        ),
      ];

  static List<BoxShadow> get elevatedShadow => const <BoxShadow>[
        BoxShadow(
          color: Color(0x140F172A),
          blurRadius: 24,
          offset: Offset(0, 8),
        ),
      ];

  static List<BoxShadow> get brandShadow => const <BoxShadow>[
        BoxShadow(
          color: Color(0x334F46E5),
          blurRadius: 18,
          offset: Offset(0, 6),
        ),
      ];

  // Modern gradient presets
  static const LinearGradient heroGradient = LinearGradient(
    colors: <Color>[Color(0xFF4338CA), Color(0xFF312E81)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static const LinearGradient brandGradient = LinearGradient(
    colors: <Color>[Color(0xFF6366F1), Color(0xFF4F46E5)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static const LinearGradient emeraldGradient = LinearGradient(
    colors: <Color>[Color(0xFF10B981), Color(0xFF059669)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static const LinearGradient amberGradient = LinearGradient(
    colors: <Color>[Color(0xFFFBBF24), Color(0xFFD97706)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

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
        margin: EdgeInsets.zero,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(18),
          side: const BorderSide(color: slate200, width: 1),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: Colors.white,
        contentPadding: const EdgeInsets.symmetric(
          horizontal: 16,
          vertical: 14,
        ),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: const BorderSide(color: slate200),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: const BorderSide(color: slate200),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: const BorderSide(color: indigo600, width: 1.6),
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: indigo600,
          foregroundColor: Colors.white,
          minimumSize: const Size(0, 50),
          elevation: 0,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(14),
          ),
          textStyle: const TextStyle(
            fontSize: 15,
            fontWeight: FontWeight.w700,
          ),
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: slate900,
          minimumSize: const Size(0, 50),
          side: const BorderSide(color: slate200, width: 1.2),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(14),
          ),
          textStyle: const TextStyle(
            fontSize: 15,
            fontWeight: FontWeight.w600,
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
