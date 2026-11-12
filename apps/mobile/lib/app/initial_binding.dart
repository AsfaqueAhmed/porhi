import 'dart:async';

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
import 'package:porhi/features/curriculum/data/datasources/curriculum_local_datasource.dart';
import 'package:porhi/features/curriculum/data/datasources/curriculum_remote_datasource.dart';
import 'package:porhi/features/curriculum/data/repositories/curriculum_repository_impl.dart';
import 'package:porhi/features/curriculum/domain/repositories/curriculum_repository.dart';
import 'package:porhi/features/curriculum/domain/usecases/curriculum_usecases.dart';
import 'package:porhi/features/content_report/data/datasources/content_report_remote_datasource.dart';
import 'package:porhi/features/content_report/data/repositories/content_report_repository_impl.dart';
import 'package:porhi/features/content_report/domain/repositories/content_report_repository.dart';
import 'package:porhi/features/content_report/domain/usecases/content_report_usecases.dart';
import 'package:porhi/features/dashboard/data/datasources/student_local_datasource.dart';
import 'package:porhi/features/dashboard/data/datasources/student_remote_datasource.dart';
import 'package:porhi/features/dashboard/data/repositories/student_repository_impl.dart';
import 'package:porhi/features/dashboard/domain/repositories/student_repository.dart';
import 'package:porhi/features/dashboard/domain/usecases/student_usecases.dart';
import 'package:porhi/features/lesson/data/datasources/lesson_local_datasource.dart';
import 'package:porhi/features/lesson/data/datasources/lesson_remote_datasource.dart';
import 'package:porhi/features/lesson/data/repositories/lesson_repository_impl.dart';
import 'package:porhi/features/lesson/domain/repositories/lesson_repository.dart';
import 'package:porhi/features/lesson/domain/usecases/lesson_usecases.dart';
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
    unawaited(offlineSyncService.init());
    _putIfAbsent<FirebaseAuthGateway>(
      () => _firebaseGatewayOverride ?? FirebaseAuthGatewayImpl(),
      permanent: true,
    );

    final coordinator = _putIfAbsent<AuthSessionCoordinator>(
      () => AuthSessionCoordinator(
        onRefreshSessionResult: () async {
          final result = await Get.find<RefreshBackendSessionUseCase>()();
          return result.fold(
            (err) => (
              token: null,
              isTerminalFailure: isTerminalAuthError(err),
            ),
            (token) => (token: token, isTerminalFailure: false),
          );
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
            onRefreshFailed: coordinator.handleRefreshFailureIfTerminal,
            shouldAttemptRefresh: (options) =>
                !options.path.trim().endsWith('/auth/firebase'),
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
          database: database,
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
    _lazyPutIfAbsent<GetCachedUserUseCase>(
      () => GetCachedUserUseCase(Get.find<AuthRepository>()),
    );
    _lazyPutIfAbsent<GetLanguageUseCase>(
      () => GetLanguageUseCase(Get.find<AuthRepository>()),
    );
    _lazyPutIfAbsent<SetLanguageUseCase>(
      () => SetLanguageUseCase(Get.find<AuthRepository>()),
    );
    _lazyPutIfAbsent<ClearOfflineDataUseCase>(
      () => ClearOfflineDataUseCase(Get.find<AuthRepository>()),
    );

    _lazyPutIfAbsent<StudentRemoteDataSource>(
      () => StudentRemoteDataSourceImpl(),
    );
    _lazyPutIfAbsent<StudentLocalDataSource>(
      () => StudentLocalDataSourceImpl(
        database: database,
        preferencesStorage: preferencesStorage,
      ),
    );
    _lazyPutIfAbsent<StudentRepository>(
      () => StudentRepositoryImpl(
        remoteDataSource: Get.find<StudentRemoteDataSource>(),
        localDataSource: Get.find<StudentLocalDataSource>(),
        offlineSyncService: offlineSyncService,
      ),
    );
    _lazyPutIfAbsent<GetOverviewUseCase>(
      () => GetOverviewUseCase(Get.find<StudentRepository>()),
    );
    _lazyPutIfAbsent<GetCachedOverviewUseCase>(
      () => GetCachedOverviewUseCase(Get.find<StudentRepository>()),
    );
    _lazyPutIfAbsent<GetPlannerSummaryUseCase>(
      () => GetPlannerSummaryUseCase(Get.find<StudentRepository>()),
    );
    _lazyPutIfAbsent<GetCachedPlannerSummaryUseCase>(
      () => GetCachedPlannerSummaryUseCase(Get.find<StudentRepository>()),
    );
    _lazyPutIfAbsent<GetQuickSearchCatalogUseCase>(
      () => GetQuickSearchCatalogUseCase(Get.find<StudentRepository>()),
    );
    _lazyPutIfAbsent<GetCachedQuickSearchCatalogUseCase>(
      () => GetCachedQuickSearchCatalogUseCase(Get.find<StudentRepository>()),
    );
    _lazyPutIfAbsent<FilterQuickSearchTopicsUseCase>(
      () => const FilterQuickSearchTopicsUseCase(),
    );
    _lazyPutIfAbsent<MarkLessonCompleteUseCase>(
      () => MarkLessonCompleteUseCase(Get.find<StudentRepository>()),
    );
    _lazyPutIfAbsent<ToggleBookmarkUseCase>(
      () => ToggleBookmarkUseCase(Get.find<StudentRepository>()),
    );
    _lazyPutIfAbsent<PatchCachedBookmarkUseCase>(
      () => PatchCachedBookmarkUseCase(Get.find<StudentRepository>()),
    );
    _lazyPutIfAbsent<SaveNoteUseCase>(
      () => SaveNoteUseCase(Get.find<StudentRepository>()),
    );
    _lazyPutIfAbsent<SubmitFeedbackUseCase>(
      () => SubmitFeedbackUseCase(Get.find<StudentRepository>()),
    );
    _lazyPutIfAbsent<CreateShareLinkUseCase>(
      () => CreateShareLinkUseCase(Get.find<StudentRepository>()),
    );
    _lazyPutIfAbsent<ListShareLinksUseCase>(
      () => ListShareLinksUseCase(Get.find<StudentRepository>()),
    );
    _lazyPutIfAbsent<RevokeShareLinkUseCase>(
      () => RevokeShareLinkUseCase(Get.find<StudentRepository>()),
    );
    _lazyPutIfAbsent<FlushOfflineSyncUseCase>(
      () => FlushOfflineSyncUseCase(Get.find<StudentRepository>()),
    );
    _lazyPutIfAbsent<GetPendingSyncCountUseCase>(
      () => GetPendingSyncCountUseCase(Get.find<StudentRepository>()),
    );
    _lazyPutIfAbsent<WatchPendingSyncCountUseCase>(
      () => WatchPendingSyncCountUseCase(Get.find<StudentRepository>()),
    );
    _lazyPutIfAbsent<GetActiveSubjectIdUseCase>(
      () => GetActiveSubjectIdUseCase(Get.find<StudentRepository>()),
    );
    _lazyPutIfAbsent<SetActiveSubjectIdUseCase>(
      () => SetActiveSubjectIdUseCase(Get.find<StudentRepository>()),
    );

    _lazyPutIfAbsent<CurriculumRemoteDataSource>(
      () => CurriculumRemoteDataSourceImpl(),
    );
    _lazyPutIfAbsent<CurriculumLocalDataSource>(
      () => CurriculumLocalDataSourceImpl(
        database: database,
        preferencesStorage: preferencesStorage,
      ),
    );
    _lazyPutIfAbsent<CurriculumRepository>(
      () => CurriculumRepositoryImpl(
        remoteDataSource: Get.find<CurriculumRemoteDataSource>(),
        localDataSource: Get.find<CurriculumLocalDataSource>(),
      ),
    );
    _lazyPutIfAbsent<GetSubjectsUseCase>(
      () => GetSubjectsUseCase(Get.find<CurriculumRepository>()),
    );
    _lazyPutIfAbsent<GetCachedSubjectsUseCase>(
      () => GetCachedSubjectsUseCase(Get.find<CurriculumRepository>()),
    );
    _lazyPutIfAbsent<FilterSubjectsUseCase>(
      () => const FilterSubjectsUseCase(),
    );
    _lazyPutIfAbsent<GetChaptersUseCase>(
      () => GetChaptersUseCase(Get.find<CurriculumRepository>()),
    );
    _lazyPutIfAbsent<GetCachedChaptersUseCase>(
      () => GetCachedChaptersUseCase(Get.find<CurriculumRepository>()),
    );
    _lazyPutIfAbsent<FilterChaptersUseCase>(
      () => const FilterChaptersUseCase(),
    );
    _lazyPutIfAbsent<DownloadChapterPackUseCase>(
      () => DownloadChapterPackUseCase(Get.find<CurriculumRepository>()),
    );
    _lazyPutIfAbsent<RemoveChapterPackUseCase>(
      () => RemoveChapterPackUseCase(Get.find<CurriculumRepository>()),
    );
    _lazyPutIfAbsent<IsChapterDownloadedUseCase>(
      () => IsChapterDownloadedUseCase(Get.find<CurriculumRepository>()),
    );
    _lazyPutIfAbsent<GetDownloadedChaptersUseCase>(
      () => GetDownloadedChaptersUseCase(Get.find<CurriculumRepository>()),
    );
    _lazyPutIfAbsent<GetOfflineChapterPackUseCase>(
      () => GetOfflineChapterPackUseCase(Get.find<CurriculumRepository>()),
    );
    _lazyPutIfAbsent<GetActiveCurriculumSubjectUseCase>(
      () => GetActiveCurriculumSubjectUseCase(Get.find<CurriculumRepository>()),
    );
    _lazyPutIfAbsent<SetActiveCurriculumSubjectUseCase>(
      () => SetActiveCurriculumSubjectUseCase(Get.find<CurriculumRepository>()),
    );

    _lazyPutIfAbsent<LessonRemoteDataSource>(
      () => LessonRemoteDataSourceImpl(),
    );
    _lazyPutIfAbsent<LessonLocalDataSource>(
      () => LessonLocalDataSourceImpl(database: database),
    );
    _lazyPutIfAbsent<LessonRepository>(
      () => LessonRepositoryImpl(
        remoteDataSource: Get.find<LessonRemoteDataSource>(),
        localDataSource: Get.find<LessonLocalDataSource>(),
        offlineSyncService: offlineSyncService,
      ),
    );
    _lazyPutIfAbsent<GetLessonByTopicUseCase>(
      () => GetLessonByTopicUseCase(Get.find<LessonRepository>()),
    );
    _lazyPutIfAbsent<GetCachedLessonByTopicUseCase>(
      () => GetCachedLessonByTopicUseCase(Get.find<LessonRepository>()),
    );
    _lazyPutIfAbsent<GetTopicQuickQuestionsUseCase>(
      () => GetTopicQuickQuestionsUseCase(Get.find<LessonRepository>()),
    );
    _lazyPutIfAbsent<GetCachedTopicQuickQuestionsUseCase>(
      () => GetCachedTopicQuickQuestionsUseCase(Get.find<LessonRepository>()),
    );
    _lazyPutIfAbsent<SubmitQuickCheckAttemptUseCase>(
      () => SubmitQuickCheckAttemptUseCase(Get.find<LessonRepository>()),
    );
    _lazyPutIfAbsent<CompleteLessonUseCase>(
      () => CompleteLessonUseCase(Get.find<LessonRepository>()),
    );
    _lazyPutIfAbsent<GetLocalLessonNoteUseCase>(
      () => GetLocalLessonNoteUseCase(Get.find<LessonRepository>()),
    );
    _lazyPutIfAbsent<SaveLocalLessonNoteUseCase>(
      () => SaveLocalLessonNoteUseCase(Get.find<LessonRepository>()),
    );
    _lazyPutIfAbsent<GetLocalTopicStateOverlayUseCase>(
      () => GetLocalTopicStateOverlayUseCase(Get.find<LessonRepository>()),
    );

    _lazyPutIfAbsent<ContentReportRemoteDataSource>(
      () => ContentReportRemoteDataSourceImpl(),
    );
    _lazyPutIfAbsent<ContentReportRepository>(
      () => ContentReportRepositoryImpl(
        remoteDataSource: Get.find<ContentReportRemoteDataSource>(),
      ),
    );
    _lazyPutIfAbsent<SubmitContentReportUseCase>(
      () => SubmitContentReportUseCase(Get.find<ContentReportRepository>()),
    );
    _lazyPutIfAbsent<ListMyContentReportsUseCase>(
      () => ListMyContentReportsUseCase(Get.find<ContentReportRepository>()),
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

  static const Set<String> _terminalAuthCodes = <String>{
    'unauthenticated',
    'user-disabled',
    'user-token-expired',
    'invalid-user-token',
  };

  static bool isTerminalAuthError(ErrorResponse err) {
    if (err.data == ApiResponseErrorType.noInternet ||
        err.data == ApiResponseErrorType.slowOrNoInternet ||
        err.data == ApiResponseErrorType.serverError) {
      return false;
    }
    if (err.statusCode == 401 || err.statusCode == 403) {
      return true;
    }
    final code = err.code?.trim().toLowerCase();
    return code != null && _terminalAuthCodes.contains(code);
  }
}
