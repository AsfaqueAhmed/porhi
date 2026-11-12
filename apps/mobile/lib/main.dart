import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:porhi/app/app.dart';
import 'package:porhi/app/initial_binding.dart';
import 'package:porhi/core/storage/preferences_storage_service.dart';
import 'package:porhi/core/storage/secure_storage_service.dart';
import 'package:porhi/core/theme/porhi_theme.dart';
import 'package:porhi/features/auth/data/datasources/firebase_auth_gateway.dart';
import 'package:porhi/routes/app_routes.dart';

export 'package:porhi/app/app.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await PorhiTheme.initCommon(
    enableLogger: kDebugMode,
    navigatorKey: Get.key,
  );
  await FirebaseAuthGatewayImpl.safeInitializeFirebase();

  final preferencesStorage = PreferencesStorageService();
  await preferencesStorage.init();

  final secureStorage = SecureStorageService();
  await secureStorage.init();

  final hasSession =
      secureStorage.accessToken != null &&
      secureStorage.accessToken!.trim().isNotEmpty;
  final cachedUser = secureStorage.getCachedUserMap();
  final needsOnboarding =
      cachedUser != null &&
      (cachedUser['fullName']?.toString().trim().isEmpty ?? true);

  final initialRoute = !hasSession
      ? AppRoutes.login
      : (needsOnboarding ? AppRoutes.onboarding : AppRoutes.home);

  runApp(
    PorhiApp(
      initialRoute: initialRoute,
      initialBinding: InitialBinding(
        secureStorage: secureStorage,
        preferencesStorage: preferencesStorage,
      ),
    ),
  );
}
