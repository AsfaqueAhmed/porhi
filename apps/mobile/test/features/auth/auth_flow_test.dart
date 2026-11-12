import 'dart:convert';
import 'dart:typed_data';

import 'package:common/common.dart';
import 'package:dio/dio.dart';
import 'package:drift/native.dart';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:get/get.dart' hide Response;
import 'package:mocktail/mocktail.dart';
import 'package:network/network.dart';
import 'package:porhi/app/env.dart';
import 'package:porhi/app/initial_binding.dart';
import 'package:porhi/core/database/app_database.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/core/network/auth_request_interceptor.dart';
import 'package:porhi/core/network/auth_session_coordinator.dart';
import 'package:porhi/core/storage/preferences_storage_service.dart';
import 'package:porhi/core/storage/secure_storage_service.dart';
import 'package:porhi/core/theme/porhi_theme.dart';
import 'package:porhi/features/auth/data/datasources/auth_remote_datasource.dart';
import 'package:porhi/features/auth/data/datasources/firebase_auth_gateway.dart';
import 'package:porhi/features/auth/data/models/auth_models.dart';
import 'package:porhi/features/auth/data/repositories/auth_repository_impl.dart';
import 'package:porhi/features/auth/domain/entities/auth_user_entity.dart';
import 'package:porhi/features/auth/domain/repositories/auth_repository.dart';
import 'package:porhi/features/auth/domain/usecases/auth_usecases.dart';
import 'package:porhi/features/auth/presentation/account/controller/account_controller.dart';
import 'package:porhi/features/auth/presentation/account/view/account_view.dart';
import 'package:porhi/features/auth/presentation/login/controller/login_controller.dart';
import 'package:porhi/features/auth/presentation/login/view/login_view.dart';
import 'package:porhi/features/auth/presentation/onboarding/controller/onboarding_controller.dart';
import 'package:porhi/features/auth/presentation/onboarding/view/onboarding_view.dart';
import 'package:porhi/routes/app_routes.dart';
import 'package:shared_preferences/shared_preferences.dart';

class _InMemoryFlutterSecureStorage extends Fake
    implements FlutterSecureStorage {
  final Map<String, String> _store = <String, String>{};

  @override
  Future<String?> read({
    required String key,
    AppleOptions? iOptions,
    AndroidOptions? aOptions,
    LinuxOptions? lOptions,
    WebOptions? webOptions,
    MacOsOptions? mOptions,
    WindowsOptions? wOptions,
  }) async => _store[key];

  @override
  Future<void> write({
    required String key,
    required String? value,
    AppleOptions? iOptions,
    AndroidOptions? aOptions,
    LinuxOptions? lOptions,
    WebOptions? webOptions,
    MacOsOptions? mOptions,
    WindowsOptions? wOptions,
  }) async {
    if (value == null) {
      _store.remove(key);
    } else {
      _store[key] = value;
    }
  }

  @override
  Future<void> delete({
    required String key,
    AppleOptions? iOptions,
    AndroidOptions? aOptions,
    LinuxOptions? lOptions,
    WebOptions? webOptions,
    MacOsOptions? mOptions,
    WindowsOptions? wOptions,
  }) async {
    _store.remove(key);
  }
}

class _FakeHttpClientAdapter implements HttpClientAdapter {
  final Future<ResponseBody> Function(RequestOptions options) onFetch;

  _FakeHttpClientAdapter(this.onFetch);

  @override
  void close({bool force = false}) {}

  @override
  Future<ResponseBody> fetch(
    RequestOptions options,
    Stream<Uint8List>? requestStream,
    Future<void>? cancelFuture,
  ) {
    return onFetch(options);
  }
}

class _MockFirebaseAuthGateway extends Mock implements FirebaseAuthGateway {}

class _MockAuthRemoteDataSource extends Mock implements AuthRemoteDataSource {}

class _MockAuthRepository extends Mock implements AuthRepository {}

ResponseBody _jsonResponse(
  Map<String, dynamic> body, {
  int statusCode = 200,
}) {
  return ResponseBody.fromString(
    jsonEncode(body),
    statusCode,
    headers: <String, List<String>>{
      Headers.contentTypeHeader: <String>[Headers.jsonContentType],
    },
  );
}

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  setUpAll(() async {
    registerFallbackValue(StudentTrack.ssc);
    SharedPreferences.setMockInitialValues(<String, Object>{});
    await PorhiTheme.initCommon(enableLogger: false);
  });

  tearDown(() {
    Get.reset();
  });

  group('AuthRequestInterceptor & TokenRefreshInterceptor', () {
    test(
      'preserves baseUrl and Authorization header after ApiClientImpl-style header reset',
      () async {
        final secureStorage = SecureStorageService(
          secureStorage: _InMemoryFlutterSecureStorage(),
        );
        await secureStorage.saveTokens(accessToken: 'jwt-initial-123');

        final dio = Dio();
        RequestOptions? capturedOptions;
        dio.httpClientAdapter = _FakeHttpClientAdapter((options) async {
          capturedOptions = options;
          return _jsonResponse(<String, dynamic>{'ok': true});
        });

        final interceptor = AuthRequestInterceptor(
          envConfig: const EnvConfig(apiBaseUrl: 'https://api.porhi.bd/'),
          secureStorage: secureStorage,
        );
        dio.interceptors.add(interceptor);

        // Simulate ApiClientImpl overwriting _dio.options.headers per request.
        dio.options.headers = <String, dynamic>{
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json',
        };

        await dio.get<dynamic>('/auth/me');

        expect(capturedOptions, isNotNull);
        expect(capturedOptions!.baseUrl, 'https://api.porhi.bd');
        expect(capturedOptions!.uri.toString(), 'https://api.porhi.bd/auth/me');
        expect(
          capturedOptions!.headers['Authorization'],
          'Bearer jwt-initial-123',
        );

        // Removing token clears any lingering Authorization header on next request.
        await secureStorage.clearSession();
        dio.options.headers = <String, dynamic>{
          ...dio.options.headers,
          'Authorization': 'Bearer stale-token',
        };

        await dio.get<dynamic>('/subjects');
        expect(capturedOptions!.headers.containsKey('Authorization'), isFalse);
      },
    );

    test(
      'TokenRefreshInterceptor refreshes on 401 before ErrorInterceptor and retries with fresh token',
      () async {
        final secureStorage = SecureStorageService(
          secureStorage: _InMemoryFlutterSecureStorage(),
        );
        await secureStorage.saveTokens(accessToken: 'expired-jwt');

        var callCount = 0;
        final seenAuthHeaders = <String?>[];
        final dio = Dio();
        dio.httpClientAdapter = _FakeHttpClientAdapter((options) async {
          callCount += 1;
          seenAuthHeaders.add(options.headers['Authorization'] as String?);
          if (callCount == 1) {
            return _jsonResponse(
              <String, dynamic>{'message': 'Unauthorized'},
              statusCode: 401,
            );
          }
          return _jsonResponse(<String, dynamic>{'id': 'stu-1'});
        });

        var refreshCalled = 0;
        var failedCalled = 0;
        final coordinator = AuthSessionCoordinator(
          onRefreshSession: () async {
            refreshCalled += 1;
            await secureStorage.saveTokens(accessToken: 'refreshed-jwt-999');
            return 'refreshed-jwt-999';
          },
          onSessionExpired: () async {
            failedCalled += 1;
          },
        );

        final authInterceptor = AuthRequestInterceptor(
          envConfig: const EnvConfig(apiBaseUrl: 'http://10.0.2.2:3001'),
          secureStorage: secureStorage,
        );
        final refreshInterceptor = TokenRefreshInterceptor(
          onRefreshToken: coordinator.refreshToken,
          onRefreshFailed: coordinator.handleRefreshFailure,
        )..attachDio(dio);
        final errorInterceptor = ErrorInterceptor();

        dio.interceptors.addAll(<Interceptor>[
          authInterceptor,
          refreshInterceptor,
          errorInterceptor,
        ]);

        final response = await dio.get<dynamic>('/auth/me');

        expect(refreshCalled, 1);
        expect(failedCalled, 0);
        expect(callCount, 2);
        expect(seenAuthHeaders, <String?>[
          'Bearer expired-jwt',
          'Bearer refreshed-jwt-999',
        ]);
        expect(response.data, <String, dynamic>{'id': 'stu-1'});
      },
    );

    test(
      'TokenRefreshInterceptor triggers onRefreshFailed when coordinator returns null',
      () async {
        final secureStorage = SecureStorageService(
          secureStorage: _InMemoryFlutterSecureStorage(),
        );
        await secureStorage.saveTokens(accessToken: 'expired-jwt');

        final dio = Dio();
        dio.httpClientAdapter = _FakeHttpClientAdapter((options) async {
          return _jsonResponse(
            <String, dynamic>{'message': 'Unauthorized'},
            statusCode: 401,
          );
        });

        var expiredCalled = 0;
        final coordinator = AuthSessionCoordinator(
          onRefreshSession: () async => null,
          onSessionExpired: () async {
            expiredCalled += 1;
          },
        );

        final refreshInterceptor = TokenRefreshInterceptor(
          onRefreshToken: coordinator.refreshToken,
          onRefreshFailed: coordinator.handleRefreshFailure,
        )..attachDio(dio);

        dio.interceptors.addAll(<Interceptor>[
          AuthRequestInterceptor(
            envConfig: const EnvConfig(apiBaseUrl: 'http://10.0.2.2:3001'),
            secureStorage: secureStorage,
          ),
          refreshInterceptor,
          ErrorInterceptor(),
        ]);

        final response = await dio.get<dynamic>('/auth/me');

        expect(expiredCalled, 1);
        expect(response.data, isA<ErrorResponse>());
      },
    );
  });

  group('AuthRepositoryImpl & Auth UseCases', () {
    late _MockFirebaseAuthGateway mockGateway;
    late _MockAuthRemoteDataSource mockRemote;
    late SecureStorageService secureStorage;
    late PreferencesStorageService prefsStorage;
    late AuthRepositoryImpl repository;

    setUp(() async {
      SharedPreferences.setMockInitialValues(<String, Object>{});
      mockGateway = _MockFirebaseAuthGateway();
      mockRemote = _MockAuthRemoteDataSource();
      secureStorage = SecureStorageService(
        secureStorage: _InMemoryFlutterSecureStorage(),
      );
      prefsStorage = PreferencesStorageService();
      await prefsStorage.init();

      repository = AuthRepositoryImpl(
        firebaseGateway: mockGateway,
        remoteDataSource: mockRemote,
        secureStorage: secureStorage,
        preferencesStorage: prefsStorage,
      );
    });

    test(
      'returns Right(AuthSessionEntity) on Google sign-in + POST /auth/firebase and persists token',
      () async {
        when(() => mockGateway.signInWithGoogleAndGetIdToken()).thenAnswer(
          (_) async => 'firebase-id-token-google',
        );
        when(
          () => mockRemote.firebaseLogin(
            idToken: 'firebase-id-token-google',
            fullName: null,
            selectedClass: null,
          ),
        ).thenAnswer(
          (_) async => Right(
            AuthLoginResponseModel(
              accessToken: 'porhi-jwt-1',
              isNewUser: true,
              user: AuthUserModel(
                id: 'user-1',
                firebaseUid: 'fb-uid-1',
                email: 'rafi@example.com',
                fullName: 'Rafi Ahmed',
                role: 'STUDENT',
                selectedClass: 'SSC',
              ),
            ),
          ),
        );

        final useCase = SignInWithGoogleUseCase(repository);
        final result = await useCase();

        expect(result.isRight(), isTrue);
        final session = (result as Right<ErrorResponse, AuthSessionEntity>).value;
        expect(session.accessToken, 'porhi-jwt-1');
        expect(session.isNewUser, isTrue);
        expect(session.user.selectedClass, StudentTrack.ssc);
        expect(secureStorage.accessToken, 'porhi-jwt-1');
        expect(secureStorage.getCachedUserMap()?['id'], 'user-1');
      },
    );

    test(
      'RequestPhoneOtpUseCase normalizes BD phone number and rejects invalid numbers',
      () async {
        final useCase = RequestPhoneOtpUseCase(repository);

        final invalid = await useCase('12345');
        expect(invalid.isLeft(), isTrue);
        verifyNever(
          () => mockGateway.verifyPhoneNumber(
            phoneNumber: any(named: 'phoneNumber'),
            forceResendingToken: any(named: 'forceResendingToken'),
          ),
        );

        when(
          () => mockGateway.verifyPhoneNumber(
            phoneNumber: '+8801712345678',
            forceResendingToken: null,
          ),
        ).thenAnswer(
          (_) async => const FirebasePhoneOtpCodeSent(
            verificationId: 'verif-1',
            resendToken: 77,
          ),
        );

        final valid = await useCase('01712345678');
        expect(valid.isRight(), isTrue);
        final challenge = valid.fold((_) => null, (r) => r);
        expect(
          challenge,
          const PhoneOtpCodeSent(verificationId: 'verif-1', resendToken: 77),
        );
      },
    );

    test(
      'RefreshBackendSessionUseCase force-refreshes Firebase token and updates stored JWT',
      () async {
        when(
          () => mockGateway.getCurrentIdToken(forceRefresh: true),
        ).thenAnswer((_) async => 'fresh-fb-token');
        when(
          () => mockRemote.firebaseLogin(
            idToken: 'fresh-fb-token',
            fullName: null,
            selectedClass: null,
          ),
        ).thenAnswer(
          (_) async => Right(
            AuthLoginResponseModel(
              accessToken: 'new-porhi-jwt',
              isNewUser: false,
              user: AuthUserModel(
                id: 'user-1',
                role: 'STUDENT',
                selectedClass: 'HSC',
              ),
            ),
          ),
        );

        final useCase = RefreshBackendSessionUseCase(repository);
        final result = await useCase();

        expect(result.isRight(), isTrue);
        expect(result.fold((_) => null, (t) => t), 'new-porhi-jwt');
        expect(secureStorage.accessToken, 'new-porhi-jwt');
      },
    );

    test(
      'UpdateProfileUseCase validates fullName and syncs 5-track selectedClass + local board/goal',
      () async {
        final useCase = UpdateProfileUseCase(repository);

        final blankName = await useCase(
          const UpdateProfileParams(fullName: '   '),
        );
        expect(blankName.isLeft(), isTrue);

        when(
          () => mockRemote.updateProfile(
            fullName: 'Nadia Islam',
            selectedClass: 'CLASS_6_8',
          ),
        ).thenAnswer(
          (_) async => Right(
            AuthUserModel(
              id: 'user-2',
              fullName: 'Nadia Islam',
              role: 'STUDENT',
              selectedClass: 'CLASS_6_8',
            ),
          ),
        );

        final updated = await useCase(
          const UpdateProfileParams(
            fullName: 'Nadia Islam',
            selectedClass: StudentTrack.class6to8,
            boardName: 'Dhaka',
            dailyStudyGoalMinutes: 45,
          ),
        );

        expect(updated.isRight(), isTrue);
        final user = (updated as Right<ErrorResponse, AuthUserEntity>).value;
        expect(user.selectedClass, StudentTrack.class6to8);
        expect(user.boardName, 'Dhaka');
        expect(user.dailyStudyGoalMinutes, 45);
        expect(prefsStorage.read(AuthRepositoryImpl.boardNameKey), 'Dhaka');
        expect(
          prefsStorage.getInt(AuthRepositoryImpl.dailyStudyGoalMinutesKey),
          45,
        );
      },
    );

    test('SignOutUseCase clears Firebase session and secure storage', () async {
      await secureStorage.saveTokens(accessToken: 'jwt-to-clear');
      when(() => mockGateway.signOut()).thenAnswer((_) async {});

      final useCase = SignOutUseCase(repository);
      final result = await useCase();

      expect(result.isRight(), isTrue);
      expect(secureStorage.accessToken, isNull);
      verify(() => mockGateway.signOut()).called(1);
    });
  });

  group('Auth Presentation Views', () {
    late _MockAuthRepository mockRepository;
    late PreferencesStorageService prefsStorage;

    setUp(() async {
      SharedPreferences.setMockInitialValues(<String, Object>{});
      mockRepository = _MockAuthRepository();
      prefsStorage = PreferencesStorageService();
      await prefsStorage.init();
      when(() => mockRepository.getCachedUser()).thenReturn(null);
      when(() => mockRepository.hasStoredSession()).thenReturn(false);
    });

    testWidgets(
      'LoginView displays Google and Phone OTP options with NO Guest sign-in button',
      (tester) async {
        Get.put<LoginController>(
          LoginController(
            signInWithGoogleUseCase: SignInWithGoogleUseCase(mockRepository),
            requestPhoneOtpUseCase: RequestPhoneOtpUseCase(mockRepository),
            verifyPhoneOtpUseCase: VerifyPhoneOtpUseCase(mockRepository),
            preferencesStorage: prefsStorage,
          ),
        );

        await tester.pumpWidget(
          GetMaterialApp(
            theme: PorhiTheme.light,
            home: const LoginView(),
          ),
        );
        await tester.pumpAndSettle();

        expect(find.byKey(const Key('google_signin_button')), findsOneWidget);
        expect(find.byKey(const Key('phone_input_field')), findsOneWidget);
        expect(find.byKey(const Key('send_otp_button')), findsOneWidget);

        // Strictly NO guest mode on mobile.
        expect(find.textContaining('Guest'), findsNothing);
        expect(find.textContaining('অতিথি'), findsNothing);
      },
    );

    testWidgets(
      'LoginView Phone OTP flow sends OTP, shows resend cooldown, and routes new user to /onboarding',
      (tester) async {
        when(
          () => mockRepository.requestPhoneOtp(
            '+8801712345678',
            forceResendingToken: null,
          ),
        ).thenAnswer(
          (_) async => const Right(
            PhoneOtpCodeSent(verificationId: 'verif-abc', resendToken: 11),
          ),
        );
        when(
          () => mockRepository.verifyPhoneOtp('verif-abc', '123456'),
        ).thenAnswer(
          (_) async => const Right(
            AuthSessionEntity(
              accessToken: 'jwt-phone-1',
              isNewUser: true,
              user: AuthUserEntity(
                id: 'stu-phone-1',
                phoneNumber: '+8801712345678',
              ),
            ),
          ),
        );

        var navigatedToOnboarding = false;
        Get.put<LoginController>(
          LoginController(
            signInWithGoogleUseCase: SignInWithGoogleUseCase(mockRepository),
            requestPhoneOtpUseCase: RequestPhoneOtpUseCase(mockRepository),
            verifyPhoneOtpUseCase: VerifyPhoneOtpUseCase(mockRepository),
            preferencesStorage: prefsStorage,
          ),
        );

        await tester.pumpWidget(
          GetMaterialApp(
            theme: PorhiTheme.light,
            initialRoute: AppRoutes.login,
            getPages: <GetPage<dynamic>>[
              GetPage<dynamic>(
                name: AppRoutes.login,
                page: () => const LoginView(),
              ),
              GetPage<dynamic>(
                name: AppRoutes.onboarding,
                page: () {
                  navigatedToOnboarding = true;
                  return const Scaffold(body: Text('Onboarding'));
                },
              ),
            ],
          ),
        );
        await tester.pumpAndSettle();

        await tester.enterText(
          find.byKey(const Key('phone_input_field')),
          '01712345678',
        );
        await tester.ensureVisible(find.byKey(const Key('send_otp_button')));
        await tester.tap(find.byKey(const Key('send_otp_button')));
        await tester.pump();
        await tester.pump(const Duration(milliseconds: 50));

        expect(find.byKey(const Key('otp_input_field')), findsOneWidget);
        expect(find.byKey(const Key('resend_otp_button')), findsOneWidget);
        expect(find.byKey(const Key('verify_otp_button')), findsOneWidget);

        await tester.enterText(
          find.byKey(const Key('otp_input_field')),
          '123456',
        );
        await tester.ensureVisible(find.byKey(const Key('verify_otp_button')));
        await tester.pump();
        await tester.tap(find.byKey(const Key('verify_otp_button')));
        await tester.pumpAndSettle();

        verify(
          () => mockRepository.verifyPhoneOtp('verif-abc', '123456'),
        ).called(1);
        expect(navigatedToOnboarding, isTrue);
      },
    );

    test(
      'InitialBinding registers core services and auth dependencies without live Firebase',
      () async {
        final db = AppDatabase(NativeDatabase.memory());
        addTearDown(db.close);
        final secureStorage = SecureStorageService(
          secureStorage: _InMemoryFlutterSecureStorage(),
        );
        final binding = InitialBinding(
          envConfig: const EnvConfig(apiBaseUrl: 'http://10.0.2.2:3001'),
          database: db,
          secureStorage: secureStorage,
          preferencesStorage: prefsStorage,
          firebaseGateway: _MockFirebaseAuthGateway(),
          initNetwork: false,
        );

        binding.dependencies();

        expect(Get.isRegistered<EnvConfig>(), isTrue);
        expect(Get.isRegistered<SecureStorageService>(), isTrue);
        expect(Get.isRegistered<PreferencesStorageService>(), isTrue);
        expect(Get.isRegistered<AppDatabase>(), isTrue);
        expect(Get.isRegistered<AuthSessionCoordinator>(), isTrue);
        expect(Get.isRegistered<SignInWithGoogleUseCase>(), isTrue);
        expect(Get.isRegistered<UpdateProfileUseCase>(), isTrue);
        expect(Get.isRegistered<SignOutUseCase>(), isTrue);
      },
    );

    testWidgets(
      'OnboardingView validates fullName and submits 5-track selectedClass via UpdateProfileUseCase',
      (tester) async {
        const updatedUser = AuthUserEntity(
          id: 'stu-10',
          fullName: 'Tasnim Akter',
          role: 'STUDENT',
          selectedClass: StudentTrack.bcs,
          boardName: 'Rajshahi',
          dailyStudyGoalMinutes: 60,
        );

        when(
          () => mockRepository.updateProfile(
            fullName: any(named: 'fullName'),
            selectedClass: any(named: 'selectedClass'),
            boardName: any(named: 'boardName'),
            dailyStudyGoalMinutes: any(named: 'dailyStudyGoalMinutes'),
          ),
        ).thenAnswer((_) async => const Right(updatedUser));

        var navigatedToHome = false;
        Get.put<OnboardingController>(
          OnboardingController(
            updateProfileUseCase: UpdateProfileUseCase(mockRepository),
            authRepository: mockRepository,
            preferencesStorage: prefsStorage,
          ),
        );

        await tester.pumpWidget(
          GetMaterialApp(
            theme: PorhiTheme.light,
            initialRoute: AppRoutes.onboarding,
            getPages: <GetPage<dynamic>>[
              GetPage<dynamic>(
                name: AppRoutes.onboarding,
                page: () => const OnboardingView(),
              ),
              GetPage<dynamic>(
                name: AppRoutes.home,
                page: () {
                  navigatedToHome = true;
                  return const Scaffold(body: Text('Home'));
                },
              ),
            ],
          ),
        );
        await tester.pumpAndSettle();

        // Submit with empty name triggers validation error and does not call repo.
        await tester.ensureVisible(
          find.byKey(const Key('onboarding_submit_button')),
        );
        await tester.tap(find.byKey(const Key('onboarding_submit_button')));
        await tester.pumpAndSettle();

        verifyNever(
          () => mockRepository.updateProfile(
            fullName: any(named: 'fullName'),
            selectedClass: any(named: 'selectedClass'),
            boardName: any(named: 'boardName'),
            dailyStudyGoalMinutes: any(named: 'dailyStudyGoalMinutes'),
          ),
        );

        // Verify all 5 tracks exist and select BCS.
        for (final track in StudentTrack.values) {
          expect(
            find.byKey(Key('track_chip_${track.apiValue}')),
            findsOneWidget,
          );
        }

        await tester.enterText(
          find.byKey(const Key('onboarding_name_field')),
          'Tasnim Akter',
        );
        await tester.tap(find.byKey(const Key('track_chip_BCS')));
        await tester.pumpAndSettle();

        await tester.ensureVisible(
          find.byKey(const Key('onboarding_submit_button')),
        );
        await tester.tap(find.byKey(const Key('onboarding_submit_button')));
        await tester.pumpAndSettle();

        verify(
          () => mockRepository.updateProfile(
            fullName: 'Tasnim Akter',
            selectedClass: StudentTrack.bcs,
            boardName: any(named: 'boardName'),
            dailyStudyGoalMinutes: any(named: 'dailyStudyGoalMinutes'),
          ),
        ).called(1);
        expect(navigatedToHome, isTrue);
      },
    );

    testWidgets(
      'AccountView toggles language, clears offline cache, and logs out to /login',
      (tester) async {
        final db = AppDatabase(NativeDatabase.memory());
        addTearDown(db.close);

        await db.upsertDownloadedChapter(
          id: 'ch-1',
          subjectId: 'sub-1',
          titleBangla: 'অধ্যায় ১',
        );

        const cachedUser = AuthUserEntity(
          id: 'stu-9',
          fullName: 'Arif Hasan',
          phoneNumber: '+8801712345678',
          role: 'STUDENT',
          selectedClass: StudentTrack.hsc,
          boardName: 'Dhaka',
          dailyStudyGoalMinutes: 30,
        );
        when(() => mockRepository.getCachedUser()).thenReturn(cachedUser);
        when(() => mockRepository.getMe()).thenAnswer(
          (_) async => const Right(cachedUser),
        );
        when(() => mockRepository.signOut()).thenAnswer(
          (_) async => const Right(null),
        );

        var redirectedToLogin = false;
        Get.put<AccountController>(
          AccountController(
            getMeUseCase: GetMeUseCase(mockRepository),
            updateProfileUseCase: UpdateProfileUseCase(mockRepository),
            signOutUseCase: SignOutUseCase(mockRepository),
            authRepository: mockRepository,
            preferencesStorage: prefsStorage,
            database: db,
          ),
        );

        await tester.pumpWidget(
          GetMaterialApp(
            theme: PorhiTheme.light,
            initialRoute: AppRoutes.account,
            getPages: <GetPage<dynamic>>[
              GetPage<dynamic>(
                name: AppRoutes.account,
                page: () => const AccountView(),
              ),
              GetPage<dynamic>(
                name: AppRoutes.login,
                page: () {
                  redirectedToLogin = true;
                  return const Scaffold(body: Text('Login'));
                },
              ),
            ],
          ),
        );
        await tester.pumpAndSettle();

        expect(find.text('Arif Hasan'), findsAtLeastNWidgets(1));

        // Toggle language to English.
        await tester.ensureVisible(
          find.byKey(const Key('language_toggle_en')),
        );
        await tester.pumpAndSettle();
        await tester.tap(find.byKey(const Key('language_toggle_en')));
        await tester.pumpAndSettle();
        expect(prefsStorage.getLanguage(), AppLanguage.en.code);

        // Clear offline cache.
        await tester.ensureVisible(
          find.byKey(const Key('clear_offline_cache_button')),
        );
        await tester.tap(find.byKey(const Key('clear_offline_cache_button')));
        await tester.pumpAndSettle();
        expect(await db.getDownloadedChapters(), isEmpty);

        // Logout redirects to /login.
        await tester.ensureVisible(find.byKey(const Key('logout_button')));
        await tester.tap(find.byKey(const Key('logout_button')));
        await tester.pumpAndSettle();

        verify(() => mockRepository.signOut()).called(1);
        expect(redirectedToLogin, isTrue);
      },
    );
  });
}
