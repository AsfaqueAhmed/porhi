import 'dart:async';
import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';

enum PorhiColorTheme {
  evergreen,
  indigo,
  blue,
  teal,
  orange,
  red,
  golden,
  monochrome,
}

class AppThemeController extends GetxController {
  static const String _storageKey = 'porhi_color_theme';

  final Rx<PorhiColorTheme> selected = PorhiColorTheme.evergreen.obs;
  final RxBool isThemePickerOpen = false.obs;

  @override
  void onInit() {
    super.onInit();
    unawaited(_restore());
  }

  Future<void> _restore() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final stored = prefs.getString(_storageKey);
      selected.value = PorhiColorTheme.values.firstWhere(
        (theme) => theme.name == stored,
        orElse: () => PorhiColorTheme.evergreen,
      );
    } catch (_) {
      selected.value = PorhiColorTheme.evergreen;
    }
  }

  Future<void> select(PorhiColorTheme theme) async {
    selected.value = theme;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_storageKey, theme.name);
  }

  ColorFilter? get colorFilter => isThemePickerOpen.value
      ? null
      : switch (selected.value) {
          PorhiColorTheme.evergreen => null,
          PorhiColorTheme.indigo => ColorFilter.matrix(_hueRotation(118)),
          PorhiColorTheme.blue => ColorFilter.matrix(_hueRotation(52)),
          PorhiColorTheme.teal => ColorFilter.matrix(_hueRotation(18)),
          PorhiColorTheme.orange => ColorFilter.matrix(_hueRotation(225)),
          PorhiColorTheme.red => ColorFilter.matrix(_hueRotation(190)),
          PorhiColorTheme.golden => ColorFilter.matrix(_hueRotation(240)),
          PorhiColorTheme.monochrome => const ColorFilter.matrix(<double>[
            0.2126,
            0.7152,
            0.0722,
            0,
            0,
            0.2126,
            0.7152,
            0.0722,
            0,
            0,
            0.2126,
            0.7152,
            0.0722,
            0,
            0,
            0,
            0,
            0,
            1,
            0,
          ]),
        };

  static List<double> _hueRotation(double degrees) {
    final radians = degrees * math.pi / 180;
    final cosValue = math.cos(radians);
    final sinValue = math.sin(radians);
    return <double>[
      0.213 + cosValue * 0.787 - sinValue * 0.213,
      0.715 - cosValue * 0.715 - sinValue * 0.715,
      0.072 - cosValue * 0.072 + sinValue * 0.928,
      0,
      0,
      0.213 - cosValue * 0.213 + sinValue * 0.143,
      0.715 + cosValue * 0.285 + sinValue * 0.140,
      0.072 - cosValue * 0.072 - sinValue * 0.283,
      0,
      0,
      0.213 - cosValue * 0.213 - sinValue * 0.787,
      0.715 - cosValue * 0.715 + sinValue * 0.715,
      0.072 + cosValue * 0.928 + sinValue * 0.072,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
    ];
  }
}
