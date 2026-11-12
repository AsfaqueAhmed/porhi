import 'package:dio/dio.dart' show Interceptor;
import 'package:flutter/foundation.dart';
import 'package:get/get.dart';
import 'package:network/network.dart';
import 'package:porhi/app/env.dart';
import 'package:porhi/core/database/app_database.dart';
import 'package:porhi/core/network/auth_request_interceptor.dart';
import 'package:porhi/core/network/auth_session_coordinator.dart';
import 'package:porhi/core/network/offline_sync_api_handler.dart';
import 'package:porhi/core/storage/preferences_storage_service.dart';
import 'package:porhi/core/storage/secure_storage_service.dart';
import 'package:porhi/core/sync/offline_sync_service.dart';
import 'package:porhi/features/auth/data/datasources/auth_remote_datasource.dart';
import 'package:porhi/features/auth/data/datasources/firebase_auth_gateway.dart';
import 'package:porhi/features/auth/data/repositories/auth_repository_impl.dart';
import 'package:porhi/features/auth/domain/repositories/auth_repository.dart';
import 'package:porhi/features/auth/domain/usecases/auth_usecases.dart';
import 'package:porhi/routes/app_routes.dart';

class InitialBinding extends Bindings {
  final EnvConfig? _envConfigOverride;
  final AppDatabase? _databaseOverride;
  final SecureStorageService? _secureStorageOverride;
  final PreferencesStorageService? _preferencesStorageOverride;
  final FirebaseAuthGateway? _firebaseGatewayOverride;
  final bool _initNetwork;

  InitialBinding({
    EnvConfig? envConfig,
    AppDatabase? database,
    SecureStorageService? secureStorage,
    PreferencesStorageService? preferencesStorage,
    FirebaseAuthGateway? firebaseGateway,
    this._initNetwork = true,
  })  : _envConfigOverride = envConfig,
        _databaseOverride = database,
        _secureStorageOverride = secureStorage,
        _preferencesStorageOverride = preferencesStorage,
        _firebaseGatewayOverride = firebaseGateway;

  @override
  void dependencies() {
    final envConfig = _putIfAbsent<EnvConfig>(
      () => _envConfigOverride ?? const EnvConfig(),
      permanent: true,
    );
    final preferencesStorage = _putIfAbsent<PreferencesStorageService>(
      () => _preferencesStorageOverride ?? PreferencesStorageService(),
      permanent: true,
    );
    final secureStorage = _putIfAbsent<SecureStorageService>(
      () => _secureStorageOverride ?? SecureStorageService(),
      permanent: true,
    );
    final database = _putIfAbsent<AppDatabase>(
      () => _databaseOverride ?? AppDatabase(),
      permanent: true,
    );
    final offlineSyncService = _putIfAbsent<OfflineSyncService>(
      () => OfflineSyncService(database: database),
      permanent: true,
    );
    _putIfAbsent<FirebaseAuthGateway>(
      () => _firebaseGatewayOverride ?? FirebaseAuthGatewayImpl(),
      permanent: true,
    );

    final coordinator = _putIfAbsent<AuthSessionCoordinator>(
      () => AuthSessionCoordinator(
        onRefreshSession: () async {
          final result = await Get.find<RefreshBackendSessionUseCase>()();
          return result.fold((_) => null, (token) => token);
        },
        onSessionExpired: () async {
          await Get.find<SignOutUseCase>()();
          if (Get.key.currentState != null &&
              Get.currentRoute != AppRoutes.login) {
            Get.offAllNamed(AppRoutes.login);
          }
        },
      ),
      permanent: true,
    );

    if (_initNetwork) {
      NetworkInitializer.initialize(
        interceptors: <Interceptor>[
          AuthRequestInterceptor(
            envConfig: envConfig,
            secureStorage: secureStorage,
          ),
          TokenRefreshInterceptor(
            onRefreshToken: coordinator.refreshToken,
            onRefreshFailed: coordinator.handleRefreshFailure,
          ),
          ErrorInterceptor(),
          if (kDebugMode) LogInterceptor(),
        ],
      );

      final syncHandler = OfflineSyncApiHandler();
      offlineSyncService.setSyncHandler(syncHandler.syncOffline);
    }

    if (!Get.isRegistered<AuthRemoteDataSource>()) {
      Get.lazyPut<AuthRemoteDataSource>(
        () => AuthRemoteDataSourceImpl(),
        fenix: true,
      );
    }
    if (!Get.isRegistered<AuthRepository>()) {
      Get.lazyPut<AuthRepository>(
        () => AuthRepositoryImpl(
          firebaseGateway: Get.find<FirebaseAuthGateway>(),
          remoteDataSource: Get.find<AuthRemoteDataSource>(),
          secureStorage: secureStorage,
          preferencesStorage: preferencesStorage,
        ),
        fenix: true,
      );
    }

    _lazyPutIfAbsent<SignInWithGoogleUseCase>(
      () => SignInWithGoogleUseCase(Get.find<AuthRepository>()),
    );
    _lazyPutIfAbsent<RequestPhoneOtpUseCase>(
      () => RequestPhoneOtpUseCase(Get.find<AuthRepository>()),
    );
    _lazyPutIfAbsent<VerifyPhoneOtpUseCase>(
      () => VerifyPhoneOtpUseCase(Get.find<AuthRepository>()),
    );
    _lazyPutIfAbsent<RefreshBackendSessionUseCase>(
      () => RefreshBackendSessionUseCase(Get.find<AuthRepository>()),
    );
    _lazyPutIfAbsent<GetMeUseCase>(
      () => GetMeUseCase(Get.find<AuthRepository>()),
    );
    _lazyPutIfAbsent<UpdateProfileUseCase>(
      () => UpdateProfileUseCase(Get.find<AuthRepository>()),
    );
    _lazyPutIfAbsent<SignOutUseCase>(
      () => SignOutUseCase(Get.find<AuthRepository>()),
    );
  }

  T _putIfAbsent<T>(T Function() builder, {bool permanent = false}) {
    if (Get.isRegistered<T>()) {
      return Get.find<T>();
    }
    return Get.put<T>(builder(), permanent: permanent);
  }

  void _lazyPutIfAbsent<T>(T Function() builder) {
    if (!Get.isRegistered<T>()) {
      Get.lazyPut<T>(builder, fenix: true);
    }
  }
}
