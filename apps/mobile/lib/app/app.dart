import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/core/theme/porhi_theme.dart';
import 'package:porhi/routes/app_pages.dart';
import 'package:porhi/routes/app_routes.dart';

class PorhiApp extends StatelessWidget {
  final String initialRoute;
  final Bindings? initialBinding;

  const PorhiApp({
    super.key,
    this.initialRoute = AppRoutes.splash,
    this.initialBinding,
  });

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      title: AppStrings.appName(AppLanguage.en),
      theme: PorhiTheme.light,
      initialRoute: initialRoute,
      initialBinding: initialBinding,
      getPages: AppPages.routes,
      debugShowCheckedModeBanner: false,
    );
  }
}
