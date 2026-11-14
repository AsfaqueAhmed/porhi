import 'package:common/common.dart';
import 'package:flutter/material.dart';

/// porhi's warm study-room palette: deep evergreen, paper, and citrus.
class PorhiTheme {
  // Keep legacy token names to avoid touching learning widgets and contracts.
  // Shared selected-state colors sampled from the curriculum picker.
  static const Color selectedSurface = Color(0xFFE5F1EC);
  static const Color selectedBorder = Color(0xFF007B63);
  static const Color selectedForeground = Color(0xFF00624F);
  static const Color navigationSurface = Color(0xFF2E7162);

  // Keep legacy token names while all screens move to the same mint selection.
  static const Color indigo600 = selectedBorder;
  static const Color indigo700 = selectedForeground;
  static const Color indigo800 = Color(0xFF10483B);
  static const Color indigo900 = Color(0xFF0B392F);
  static const Color indigo50 = selectedSurface;
  static const Color indigo100 = Color(0xFFD5E8DB);

  static const Color emerald600 = Color(0xFF059669);
  static const Color emerald500 = Color(0xFF10B981);
  static const Color emerald50 = Color(0xFFECFDF5);
  static const Color emerald100 = Color(0xFFD1FAE5);

  static const Color amber500 = Color(0xFFF59E0B);
  static const Color amber600 = Color(0xFFD97706);
  static const Color amber50 = Color(0xFFFFFBEB);
  static const Color amber100 = Color(0xFFFEF3C7);

  static const Color violet600 = Color(0xFF8A5B35);
  static const Color violet500 = Color(0xFFB87549);
  static const Color violet50 = Color(0xFFF7EEE4);

  static const Color sky600 = Color(0xFF0284C7);
  static const Color sky500 = Color(0xFF0EA5E9);
  static const Color sky50 = Color(0xFFF0F9FF);

  static const Color slate900 = Color(0xFF18241F);
  static const Color slate800 = Color(0xFF293832);
  static const Color slate700 = Color(0xFF405047);
  static const Color slate600 = Color(0xFF5F6D63);
  static const Color slate500 = Color(0xFF778279);
  static const Color slate400 = Color(0xFF9AA39A);
  static const Color slate300 = Color(0xFFC2C9C0);
  static const Color slate200 = Color(0xFFE0E4DB);
  static const Color slate100 = Color(0xFFEEF0E9);
  static const Color slate50 = Color(0xFFF7F7F1);
  static const Color canvas = Color(0xFFF4F2E8);
  static const Color rose600 = Color(0xFFE11D48);
  static const Color rose500 = Color(0xFFF43F5E);
  static const Color rose50 = Color(0xFFFFF1F2);
  static const Color citrus = Color(0xFFD8EF83);
  static const Color terracotta = Color(0xFFD97855);

  // Modern soft shadows for depth & visual hierarchy
  static List<BoxShadow> get subtleShadow => const <BoxShadow>[
    BoxShadow(color: Color(0x080F172A), blurRadius: 10, offset: Offset(0, 3)),
  ];

  static List<BoxShadow> get cardShadow => const <BoxShadow>[
    BoxShadow(color: Color(0x0C0F172A), blurRadius: 16, offset: Offset(0, 4)),
  ];

  static List<BoxShadow> get elevatedShadow => const <BoxShadow>[
    BoxShadow(color: Color(0x140F172A), blurRadius: 24, offset: Offset(0, 8)),
  ];

  static List<BoxShadow> get brandShadow => const <BoxShadow>[
    BoxShadow(color: Color(0x33176B58), blurRadius: 18, offset: Offset(0, 6)),
  ];

  static List<BoxShadow> get glowShadow => const <BoxShadow>[
    BoxShadow(
      color: Color(0x26176B58),
      blurRadius: 28,
      spreadRadius: -4,
      offset: Offset(0, 10),
    ),
  ];

  // Modern gradient presets
  static const LinearGradient heroGradient = LinearGradient(
    colors: <Color>[Color(0xFF1F725D), Color(0xFF103F35)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static const LinearGradient brandGradient = LinearGradient(
    colors: <Color>[Color(0xFF2D8C70), Color(0xFF176B58)],
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

  static const LinearGradient roseGradient = LinearGradient(
    colors: <Color>[Color(0xFFFB7185), Color(0xFFE11D48)],
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
    borderRadius: 16,
    buttonHeight: 50,
  );

  static AppButtonStyle get secondaryButtonStyle => AppButtonStyle(
    textColor: slate900,
    textStyle: const TextStyle(
      fontSize: 15,
      fontWeight: FontWeight.w600,
      color: slate900,
    ),
    bgColor: slate50,
    borderColor: slate200,
    borderRadius: 12,
    buttonHeight: 48,
  );

  static ConfirmationDialogStyle get confirmationDialogStyle =>
      ConfirmationDialogStyle(
        bgColor: Colors.white,
        dialogBorderRadius: 22,
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
      scaffoldBackgroundColor: canvas,
      visualDensity: VisualDensity.standard,
      textTheme: const TextTheme(
        headlineSmall: TextStyle(
          fontSize: 24,
          height: 1.2,
          fontWeight: FontWeight.w800,
          letterSpacing: -0.5,
          color: slate900,
        ),
        titleLarge: TextStyle(
          fontSize: 19,
          height: 1.25,
          fontWeight: FontWeight.w700,
          letterSpacing: -0.25,
          color: slate900,
        ),
        titleMedium: TextStyle(
          fontSize: 15,
          height: 1.3,
          fontWeight: FontWeight.w700,
          color: slate900,
        ),
        bodyLarge: TextStyle(fontSize: 15, height: 1.5, color: slate700),
        bodyMedium: TextStyle(fontSize: 13.5, height: 1.45, color: slate600),
        labelLarge: TextStyle(fontSize: 14, fontWeight: FontWeight.w700),
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: canvas,
        foregroundColor: slate900,
        elevation: 0,
        scrolledUnderElevation: 0,
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
          borderRadius: BorderRadius.circular(24),
          side: const BorderSide(color: Color(0xFFE5E5D9), width: 1),
        ),
      ),
      navigationBarTheme: NavigationBarThemeData(
        height: 72,
        backgroundColor: Colors.white,
        elevation: 0,
        indicatorColor: indigo50,
        indicatorShape: const StadiumBorder(),
        labelBehavior: NavigationDestinationLabelBehavior.alwaysShow,
        iconTheme: WidgetStateProperty.resolveWith<IconThemeData>((states) {
          final selected = states.contains(WidgetState.selected);
          return IconThemeData(
            size: 22,
            color: selected ? indigo600 : slate500,
          );
        }),
        labelTextStyle: WidgetStateProperty.resolveWith<TextStyle>((states) {
          final selected = states.contains(WidgetState.selected);
          return TextStyle(
            fontSize: 11,
            fontWeight: selected ? FontWeight.w700 : FontWeight.w500,
            color: selected ? indigo700 : slate500,
          );
        }),
      ),
      chipTheme: ChipThemeData(
        backgroundColor: Colors.white,
        selectedColor: indigo50,
        side: const BorderSide(color: slate200),
        shape: const StadiumBorder(),
        labelStyle: const TextStyle(
          fontSize: 12,
          fontWeight: FontWeight.w600,
          color: slate700,
        ),
        secondaryLabelStyle: const TextStyle(
          fontSize: 12,
          fontWeight: FontWeight.w700,
          color: indigo700,
        ),
        padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 2),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: slate50,
        contentPadding: const EdgeInsets.symmetric(
          horizontal: 16,
          vertical: 14,
        ),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: const BorderSide(color: slate200),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: const BorderSide(color: slate200),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
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
            borderRadius: BorderRadius.circular(16),
          ),
          textStyle: const TextStyle(fontSize: 15, fontWeight: FontWeight.w700),
        ),
      ),
      filledButtonTheme: FilledButtonThemeData(
        style: FilledButton.styleFrom(
          backgroundColor: indigo600,
          foregroundColor: Colors.white,
          minimumSize: const Size(0, 50),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
          textStyle: const TextStyle(fontSize: 15, fontWeight: FontWeight.w700),
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
          textStyle: const TextStyle(fontSize: 15, fontWeight: FontWeight.w600),
        ),
      ),
      dividerTheme: const DividerThemeData(color: slate200, thickness: 1),
    );
  }
}
