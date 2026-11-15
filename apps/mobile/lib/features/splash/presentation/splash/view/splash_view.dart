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
              Image.asset(
                'assets/branding/porhi-logo.png',
                width: 88,
                height: 88,
              ),
              const SizedBox(height: 16),
              Row(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.baseline,
                textBaseline: TextBaseline.alphabetic,
                children: [
                  Text(
                    AppStrings.appName(AppLanguage.bn),
                    style: const TextStyle(
                      fontSize: 26,
                      fontWeight: FontWeight.w800,
                      color: PorhiTheme.indigo900,
                    ),
                  ),
                  const SizedBox(width: 8),
                  Text(
                    AppStrings.appName(AppLanguage.en),
                    style: const TextStyle(
                      fontSize: 22,
                      fontWeight: FontWeight.w700,
                      color: PorhiTheme.slate600,
                    ),
                  ),
                ],
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
