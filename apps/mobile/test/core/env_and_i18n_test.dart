import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:porhi/app/env.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/core/i18n/bangla_digits.dart';
import 'package:porhi/core/theme/porhi_theme.dart';
import 'package:porhi/routes/app_pages.dart';
import 'package:porhi/routes/app_routes.dart';

void main() {
  group('EnvConfig', () {
    test(
      'guardianShareUrl strips trailing /api from apiBaseUrl when webBaseUrl unset',
      () {
        const env = EnvConfig(
          apiBaseUrl: 'https://165-99-219-120.sslip.io/api',
        );
        expect(
          env.guardianShareUrl('/guardian/abc123'),
          'https://165-99-219-120.sslip.io/guardian/abc123',
        );
      },
    );

    test(
      'guardianShareUrl strips trailing /api/ with slash when webBaseUrl unset',
      () {
        const env = EnvConfig(
          apiBaseUrl: 'https://165-99-219-120.sslip.io/api/',
        );
        expect(
          env.guardianShareUrl('guardian/abc123'),
          'https://165-99-219-120.sslip.io/guardian/abc123',
        );
      },
    );

    test('guardianShareUrl prefers explicit webBaseUrl when provided', () {
      const env = EnvConfig(
        apiBaseUrl: 'http://10.0.2.2:3001/api',
        webBaseUrl: 'http://10.0.2.2:3000/',
      );
      expect(
        env.guardianShareUrl('/guardian/xyz789'),
        'http://10.0.2.2:3000/guardian/xyz789',
      );
    });

    test('resolveMediaUrl joins relative /uploads path to apiBaseUrl', () {
      const env = EnvConfig(apiBaseUrl: 'http://10.0.2.2:3001');
      expect(
        env.resolveMediaUrl('/uploads/interactive/motion.html'),
        'http://10.0.2.2:3001/uploads/interactive/motion.html',
      );
    });

    test('resolveMediaUrl normalizes trailing slash and preserves full URLs', () {
      const env = EnvConfig(apiBaseUrl: 'http://10.0.2.2:3001/');
      expect(
        env.resolveMediaUrl('audio/lesson-intro.wav'),
        'http://10.0.2.2:3001/audio/lesson-intro.wav',
      );
      expect(
        env.resolveMediaUrl('https://cdn.porhi.app/img.png'),
        'https://cdn.porhi.app/img.png',
      );
    });
  });

  group('bangla_digits & AppStrings', () {
    test('toBanglaDigits converts ASCII digits cleanly', () {
      expect(toBanglaDigits('2026-11-12 (85%)'), '২০২৬-১১-১২ (৮৫%)');
      expect(toBanglaDigits(409), '৪০৯');
    });

    test('AppStrings switches between Bangla and English cleanly', () {
      expect(AppStrings.appName(AppLanguage.bn), 'পড়ি');
      expect(AppStrings.appName(AppLanguage.en), 'porhi');
      expect(AppStrings.tr('হোম', 'Home', AppLanguage.bn), 'হোম');
      expect(AppStrings.tr('হোম', 'Home', AppLanguage.en), 'Home');
      expect(AppStrings.formatNumber(125, AppLanguage.bn), '১২৫');
      expect(AppStrings.formatNumber(125, AppLanguage.en), '125');
    });
  });

  group('PorhiTheme & Routes', () {
    test('PorhiTheme exposes brand colors and Common styles', () {
      expect(PorhiTheme.light.colorScheme.primary, PorhiTheme.indigo600);
      expect(PorhiTheme.light.scaffoldBackgroundColor, PorhiTheme.slate50);
      expect(PorhiTheme.primaryButtonStyle.bgColor, PorhiTheme.indigo600);
      expect(PorhiTheme.confirmationDialogStyle.bgColor, Colors.white);
    });

    test('AppRoutes and AppPages expose initial splash route', () {
      expect(AppRoutes.splash, '/splash');
      expect(
        AppPages.routes.any((page) => page.name == AppRoutes.splash),
        isTrue,
      );
    });
  });
}
