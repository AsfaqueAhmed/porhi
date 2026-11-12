import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:porhi/core/theme/porhi_theme.dart';
import 'package:porhi/features/auth/presentation/account/binding/account_binding.dart';
import 'package:porhi/features/auth/presentation/account/view/account_view.dart';
import 'package:porhi/features/auth/presentation/login/binding/login_binding.dart';
import 'package:porhi/features/auth/presentation/login/view/login_view.dart';
import 'package:porhi/features/auth/presentation/onboarding/binding/onboarding_binding.dart';
import 'package:porhi/features/auth/presentation/onboarding/view/onboarding_view.dart';

import '../features/splash/presentation/splash/binding/splash_binding.dart';
import '../features/splash/presentation/splash/view/splash_view.dart';
import 'app_routes.dart';

class AppPages {
  static final routes = <GetPage<dynamic>>[
    GetPage(
      name: AppRoutes.splash,
      page: () => const SplashView(),
      binding: SplashBinding(),
    ),
    GetPage(
      name: AppRoutes.login,
      page: () => const LoginView(),
      binding: LoginBinding(),
    ),
    GetPage(
      name: AppRoutes.onboarding,
      page: () => const OnboardingView(),
      binding: OnboardingBinding(),
    ),
    GetPage(
      name: AppRoutes.account,
      page: () => const AccountView(),
      binding: AccountBinding(),
    ),
    GetPage(
      name: AppRoutes.home,
      page: () => const _TemporaryHomePlaceholderView(),
    ),
  ];
}

/// Minimal authenticated landing placeholder until the Task 6 Home Shell arrives.
class _TemporaryHomePlaceholderView extends StatelessWidget {
  const _TemporaryHomePlaceholderView();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('porhi'),
        actions: <Widget>[
          IconButton(
            tooltip: 'Account',
            icon: const Icon(Icons.person_outline_rounded),
            onPressed: () => Get.toNamed(AppRoutes.account),
          ),
        ],
      ),
      body: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            const Text(
              'পড়ি',
              style: TextStyle(
                fontSize: 32,
                fontWeight: FontWeight.w800,
                color: PorhiTheme.indigo600,
              ),
            ),
            const SizedBox(height: 12),
            ElevatedButton.icon(
              onPressed: () => Get.toNamed(AppRoutes.account),
              icon: const Icon(Icons.manage_accounts_rounded),
              label: const Text('Account & Settings'),
            ),
          ],
        ),
      ),
    );
  }
}
