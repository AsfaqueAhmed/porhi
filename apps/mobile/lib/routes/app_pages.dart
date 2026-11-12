import 'package:get/get.dart';
import 'package:porhi/features/auth/presentation/account/binding/account_binding.dart';
import 'package:porhi/features/auth/presentation/account/view/account_view.dart';
import 'package:porhi/features/auth/presentation/login/binding/login_binding.dart';
import 'package:porhi/features/auth/presentation/login/view/login_view.dart';
import 'package:porhi/features/auth/presentation/onboarding/binding/onboarding_binding.dart';
import 'package:porhi/features/auth/presentation/onboarding/view/onboarding_view.dart';
import 'package:porhi/features/dashboard/presentation/dashboard/binding/dashboard_binding.dart';
import 'package:porhi/features/dashboard/presentation/shared/quick_search_sheet.dart';
import 'package:porhi/features/shell/presentation/main_shell/binding/main_shell_binding.dart';
import 'package:porhi/features/shell/presentation/main_shell/view/main_shell_view.dart';

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
      page: () => const MainShellView(),
      binding: MainShellBinding(),
    ),
    GetPage(
      name: AppRoutes.search,
      page: () => const QuickSearchPage(),
      binding: QuickSearchBinding(),
    ),
  ];
}
