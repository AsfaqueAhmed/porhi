import 'package:get/get.dart';
import 'package:porhi/features/auth/presentation/account/binding/account_binding.dart';
import 'package:porhi/features/auth/presentation/account/view/account_view.dart';
import 'package:porhi/features/auth/presentation/login/binding/login_binding.dart';
import 'package:porhi/features/auth/presentation/login/view/login_view.dart';
import 'package:porhi/features/auth/presentation/onboarding/binding/onboarding_binding.dart';
import 'package:porhi/features/auth/presentation/onboarding/view/onboarding_view.dart';
import 'package:porhi/features/curriculum/presentation/curriculum/binding/curriculum_binding.dart';
import 'package:porhi/features/curriculum/presentation/curriculum/view/chapter_index_view.dart';
import 'package:porhi/features/curriculum/presentation/subjects/binding/subjects_binding.dart';
import 'package:porhi/features/curriculum/presentation/subjects/view/subjects_view.dart';
import 'package:porhi/features/dashboard/domain/entities/student_overview_entity.dart';
import 'package:porhi/features/dashboard/presentation/dashboard/binding/dashboard_binding.dart';
import 'package:porhi/features/dashboard/presentation/shared/quick_search_sheet.dart';
import 'package:porhi/features/lesson/presentation/lesson/binding/lesson_binding.dart';
import 'package:porhi/features/lesson/presentation/lesson/view/lesson_view.dart';
import 'package:porhi/features/practice/presentation/practice/binding/practice_binding.dart';
import 'package:porhi/features/practice/presentation/practice/view/practice_view.dart';
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
    GetPage<QuickSearchTopicEntity?>(
      name: AppRoutes.search,
      page: () => const QuickSearchPage(),
      binding: QuickSearchBinding(),
    ),
    GetPage(
      name: AppRoutes.subjects,
      page: () => const SubjectsView(),
      binding: SubjectsBinding(),
    ),
    GetPage(
      name: AppRoutes.chapters,
      page: () => const ChapterIndexView(),
      binding: CurriculumBinding(),
    ),
    GetPage(
      name: AppRoutes.lesson,
      page: () => const LessonView(),
      binding: LessonBinding(),
    ),
    GetPage(
      name: AppRoutes.practice,
      page: () => const PracticeView(),
      binding: PracticeBinding(),
    ),
  ];
}
