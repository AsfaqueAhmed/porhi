import 'package:get/get.dart';

import '../features/splash/presentation/splash/binding/splash_binding.dart';
import '../features/splash/presentation/splash/view/splash_view.dart';
import 'app_routes.dart';

class AppPages {
  static final routes = [
    GetPage(
      name: AppRoutes.splash,
      page: () => const SplashView(),
      binding: SplashBinding(),
    ),
  ];
}
