import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/core/theme/porhi_theme.dart';

import '../controller/splash_controller.dart';

class SplashView extends GetView<SplashController> {
  const SplashView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                width: 72,
                height: 72,
                decoration: BoxDecoration(
                  color: PorhiTheme.indigo50,
                  borderRadius: BorderRadius.circular(20),
                ),
                alignment: Alignment.center,
                child: const Text(
                  'পড়ি',
                  style: TextStyle(
                    fontSize: 28,
                    fontWeight: FontWeight.w800,
                    color: PorhiTheme.indigo600,
                  ),
                ),
              ),
              const SizedBox(height: 16),
              Text(
                AppStrings.appName(AppLanguage.en),
                style: const TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.w800,
                  color: PorhiTheme.slate900,
                ),
              ),
              const SizedBox(height: 6),
              Text(
                AppStrings.t('app.tagline', AppLanguage.bn),
                textAlign: TextAlign.center,
                style: const TextStyle(
                  fontSize: 14,
                  color: PorhiTheme.slate600,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
