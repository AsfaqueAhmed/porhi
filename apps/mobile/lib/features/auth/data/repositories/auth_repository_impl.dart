import 'dart:math';

import 'package:common/common.dart';
import 'package:network/network.dart';
import 'package:porhi/core/database/app_database.dart';
import 'package:porhi/core/storage/preferences_storage_service.dart';
import 'package:porhi/core/storage/secure_storage_service.dart';
import 'package:porhi/features/auth/data/datasources/auth_remote_datasource.dart';
import 'package:porhi/features/auth/data/datasources/firebase_auth_gateway.dart';
import 'package:porhi/features/auth/data/models/auth_models.dart';
import 'package:porhi/features/auth/domain/entities/auth_user_entity.dart';
import 'package:porhi/features/auth/domain/repositories/auth_repository.dart';

class AuthRepositoryImpl implements AuthRepository {
  static const String boardNameKey = 'porhi_board_name';
  static const String dailyStudyGoalMinutesKey = 'porhi_daily_goal_minutes';
  static const String guestIdKey = 'porhi_guest_id';

  final FirebaseAuthGateway _firebaseGateway;
  final AuthRemoteDataSource _remoteDataSource;
  final SecureStorageService _secureStorage;
  final PreferencesStorageService _preferencesStorage;
  final AppDatabase? _database;
  final Future<void> Function()? _onSignOutCleanup;

  AuthRepositoryImpl({
    required this._firebaseGateway,
    required this._remoteDataSource,
    required this._secureStorage,
    required this._preferencesStorage,
    this._database,
    this._onSignOutCleanup,
  });

  @override
  Future<Either<ErrorResponse, AuthConfigEntity>> getAuthConfig() async {
    final result = await _remoteDataSource.getAuthConfig();
    return result.fold(
      (err) => Left<ErrorResponse, AuthConfigEntity>(err),
      (model) => Right<ErrorResponse, AuthConfigEntity>(model.toEntity()),
    );
  }

  @override
  Future<Either<ErrorResponse, AuthSessionEntity>> signInAsGuest() async {
    try {
      final cachedUser = getCachedUser();
      final existingGuestId =
          _preferencesStorage.read(guestIdKey)?.trim() ??
          cachedUser?.guestId?.trim();
      final guestId =
          (existingGuestId != null && existingGuestId.isNotEmpty)
              ? existingGuestId
              : _generateGuestId();

      await _preferencesStorage.write(guestIdKey, guestId);

      final response = await _remoteDataSource.guestLogin(guestId: guestId);
      return response.fold(
        (err) async {
          final isForbidden =
              err.statusCode == 403 ||
              (err.message?.toLowerCase().contains('disabled') ?? false);
          if (isForbidden) {
            return Left<ErrorResponse, AuthSessionEntity>(err);
          }
          // Offline / unreachable backend fallback so guest mode works offline.
          final fallbackModel = AuthUserModel(
            id: guestId,
            guestId: guestId,
            isGuest: true,
            fullName: 'অতিথি শিক্ষার্থী',
            role: 'STUDENT',
            selectedClass: 'HSC',
          );
          final fallbackToken = 'offline_$guestId';
          await _secureStorage.saveTokens(accessToken: fallbackToken);
          await _secureStorage.saveUserMap(fallbackModel.toJson());
          return Right<ErrorResponse, AuthSessionEntity>(
            AuthSessionEntity(
              accessToken: fallbackToken,
              isNewUser: false,
              user: _hydrateLocalFields(fallbackModel),
            ),
          );
        },
        (loginModel) async {
          if (loginModel.accessToken.trim().isEmpty) {
            return Left<ErrorResponse, AuthSessionEntity>(
              ErrorResponse(
                message: 'Empty access token returned from server.',
                data: ApiResponseErrorType.response,
              ),
            );
          }
          final resolvedGuestId = loginModel.user.guestId?.trim().isNotEmpty == true
              ? loginModel.user.guestId!.trim()
              : guestId;
          await _preferencesStorage.write(guestIdKey, resolvedGuestId);

          final userJson = loginModel.user.toJson()
            ..['guestId'] = resolvedGuestId
            ..['isGuest'] = true;
          final hydratedModel = AuthUserModel.fromJson(userJson);

          await _secureStorage.saveTokens(accessToken: loginModel.accessToken);
          await _secureStorage.saveUserMap(hydratedModel.toJson());
          return Right<ErrorResponse, AuthSessionEntity>(
            AuthSessionEntity(
              accessToken: loginModel.accessToken,
              isNewUser: false,
              user: _hydrateLocalFields(hydratedModel),
            ),
          );
        },
      );
    } catch (e) {
      return Left<ErrorResponse, AuthSessionEntity>(
        ErrorResponse(
          message: e.toString(),
          data: ApiResponseErrorType.response,
        ),
      );
    }
  }

  static String _generateGuestId() {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    final rand = Random();
    final suffix = List<String>.generate(
      10,
      (_) => chars[rand.nextInt(chars.length)],
    ).join();
    return 'guest_$suffix';
  }

  @override
  Future<Either<ErrorResponse, AuthSessionEntity>> signInWithGoogle() async {
    try {
      final idToken = await _firebaseGateway.signInWithGoogleAndGetIdToken();
      return _exchangeFirebaseIdToken(idToken);
    } on FirebaseAuthGatewayException catch (e) {
      return Left<ErrorResponse, AuthSessionEntity>(_mapGatewayException(e));
    } catch (e) {
      return Left<ErrorResponse, AuthSessionEntity>(
        ErrorResponse(
          message: e.toString(),
          data: ApiResponseErrorType.response,
        ),
      );
    }
  }

  @override
  Future<Either<ErrorResponse, PhoneOtpResult>> requestPhoneOtp(
    String phoneNumber, {
    int? forceResendingToken,
  }) async {
    try {
      final result = await _firebaseGateway.verifyPhoneNumber(
        phoneNumber: phoneNumber,
        forceResendingToken: forceResendingToken,
      );

      switch (result) {
        case FirebasePhoneOtpCodeSent(:final verificationId, :final resendToken):
          return Right<ErrorResponse, PhoneOtpResult>(
            PhoneOtpCodeSent(
              verificationId: verificationId,
              resendToken: resendToken,
            ),
          );
        case FirebasePhoneOtpAutoVerified(:final idToken):
          final sessionResult = await _exchangeFirebaseIdToken(idToken);
          return sessionResult.fold(
            (err) => Left<ErrorResponse, PhoneOtpResult>(err),
            (session) => Right<ErrorResponse, PhoneOtpResult>(
              PhoneOtpAutoVerified(session),
            ),
          );
      }
    } on FirebaseAuthGatewayException catch (e) {
      return Left<ErrorResponse, PhoneOtpResult>(_mapGatewayException(e));
    } catch (e) {
      return Left<ErrorResponse, PhoneOtpResult>(
        ErrorResponse(
          message: e.toString(),
          data: ApiResponseErrorType.response,
        ),
      );
    }
  }

  @override
  Future<Either<ErrorResponse, AuthSessionEntity>> verifyPhoneOtp(
    String verificationId,
    String smsCode,
  ) async {
    try {
      final idToken = await _firebaseGateway.confirmPhoneOtpAndGetIdToken(
        verificationId: verificationId,
        smsCode: smsCode,
      );
      return _exchangeFirebaseIdToken(idToken);
    } on FirebaseAuthGatewayException catch (e) {
      return Left<ErrorResponse, AuthSessionEntity>(_mapGatewayException(e));
    } catch (e) {
      return Left<ErrorResponse, AuthSessionEntity>(
        ErrorResponse(
          message: e.toString(),
          data: ApiResponseErrorType.response,
        ),
      );
    }
  }

  @override
  Future<Either<ErrorResponse, String>> refreshBackendSession() async {
    try {
      final cached = getCachedUser();
      final storedGuestId =
          cached?.guestId?.trim() ??
          _preferencesStorage.read(guestIdKey)?.trim();
      if ((cached?.isGuest ?? false) &&
          storedGuestId != null &&
          storedGuestId.isNotEmpty) {
        final guestResult = await signInAsGuest();
        return guestResult.fold(
          (err) => Left<ErrorResponse, String>(err),
          (session) => Right<ErrorResponse, String>(session.accessToken),
        );
      }

      final idToken = await _firebaseGateway.getCurrentIdToken(
        forceRefresh: true,
      );
      if (idToken == null || idToken.isEmpty) {
        return Left<ErrorResponse, String>(
          ErrorResponse(
            message: 'Firebase session expired. Please log in again.',
            data: ApiResponseErrorType.response,
            code: 'unauthenticated',
          ),
        );
      }

      final sessionResult = await _exchangeFirebaseIdToken(idToken);
      return sessionResult.fold(
        (err) => Left<ErrorResponse, String>(err),
        (session) => Right<ErrorResponse, String>(session.accessToken),
      );
    } on FirebaseAuthGatewayException catch (e) {
      return Left<ErrorResponse, String>(_mapGatewayException(e));
    } catch (e) {
      return Left<ErrorResponse, String>(
        ErrorResponse(
          message: e.toString(),
          data: ApiResponseErrorType.response,
        ),
      );
    }
  }

  @override
  Future<Either<ErrorResponse, AuthUserEntity>> getMe() async {
    final result = await _remoteDataSource.getMe();
    return result.fold(
      (err) => Left<ErrorResponse, AuthUserEntity>(err),
      (model) async {
        await _secureStorage.saveUserMap(model.toJson());
        return Right<ErrorResponse, AuthUserEntity>(_hydrateLocalFields(model));
      },
    );
  }

  @override
  Future<Either<ErrorResponse, AuthUserEntity>> updateProfile({
    String? fullName,
    StudentTrack? selectedClass,
    String? boardName,
    int? dailyStudyGoalMinutes,
  }) async {
    final result = await _remoteDataSource.updateProfile(
      fullName: fullName,
      selectedClass: selectedClass?.apiValue,
    );

    return result.fold(
      (err) => Left<ErrorResponse, AuthUserEntity>(err),
      (model) async {
        final trimmedBoard = boardName?.trim();
        if (trimmedBoard == null || trimmedBoard.isEmpty) {
          await _preferencesStorage.remove(boardNameKey);
        } else {
          await _preferencesStorage.write(boardNameKey, trimmedBoard);
        }
        if (dailyStudyGoalMinutes != null) {
          await _preferencesStorage.setInt(
            dailyStudyGoalMinutesKey,
            dailyStudyGoalMinutes,
          );
        }
        await _secureStorage.saveUserMap(model.toJson());
        return Right<ErrorResponse, AuthUserEntity>(_hydrateLocalFields(model));
      },
    );
  }

  @override
  Future<Either<ErrorResponse, void>> signOut() async {
    try {
      await _firebaseGateway.signOut();
    } catch (_) {
      // Best-effort remote sign-out; local cleanup must always proceed.
    } finally {
      await _runBestEffort(_secureStorage.clearSession);
      await _runBestEffort(() => _preferencesStorage.remove(guestIdKey));
      await _runBestEffort(() => _preferencesStorage.remove(boardNameKey));
      await _runBestEffort(
        () => _preferencesStorage.remove(dailyStudyGoalMinutesKey),
      );
      await _runBestEffort(
        () => _preferencesStorage.remove(PreferencesStorageService.lastSyncAtKey),
      );
      await _runBestEffort(
        () => _preferencesStorage.remove(
          PreferencesStorageService.activeSubjectIdKey,
        ),
      );
      await _runBestEffort(
        () => _preferencesStorage.remove(
          PreferencesStorageService.studyRemindersEnabledKey,
        ),
      );
      final cleanup = _onSignOutCleanup;
      if (cleanup != null) {
        await _runBestEffort(cleanup);
      }
      final db = _database;
      if (db != null) {
        await _runBestEffort(db.clearUserOfflineData);
      }
    }
    return const Right<ErrorResponse, void>(null);
  }

  Future<void> _runBestEffort(Future<Object?> Function() action) async {
    try {
      await action();
    } catch (_) {
      // Ignore individual cleanup errors so remaining steps still execute.
    }
  }

  ErrorResponse _mapGatewayException(FirebaseAuthGatewayException e) {
    final code = e.code?.toLowerCase();
    final isNetwork =
        code == 'network-request-failed' || code == 'network_error';
    return ErrorResponse(
      message: e.message,
      data: isNetwork
          ? ApiResponseErrorType.noInternet
          : ApiResponseErrorType.response,
      code: e.code,
    );
  }

  @override
  AuthUserEntity? getCachedUser() {
    final cached = _secureStorage.getCachedUserMap();
    if (cached == null) return null;
    final model = AuthUserModel.fromJson(cached);
    if (model.id.isEmpty) return null;
    return _hydrateLocalFields(model);
  }

  @override
  bool hasStoredSession() {
    final token = _secureStorage.accessToken;
    return token != null && token.trim().isNotEmpty;
  }

  @override
  String getLanguage() => _preferencesStorage.getLanguage();

  @override
  Future<void> setLanguage(String languageCode) =>
      _preferencesStorage.setLanguage(languageCode);

  @override
  Future<void> clearOfflineData() async {
    await _database?.clearAllOfflineData();
  }

  Future<Either<ErrorResponse, AuthSessionEntity>> _exchangeFirebaseIdToken(
    String idToken,
  ) async {
    final cached = getCachedUser();
    final storedGuestId =
        _preferencesStorage.read(guestIdKey)?.trim() ??
        cached?.guestId?.trim();
    final activeGuestId =
        (storedGuestId != null && storedGuestId.isNotEmpty)
            ? storedGuestId
            : null;

    final response = await _remoteDataSource.firebaseLogin(
      idToken: idToken,
      guestId: activeGuestId,
    );
    return response.fold(
      (err) => Left<ErrorResponse, AuthSessionEntity>(err),
      (loginModel) async {
        if (loginModel.accessToken.trim().isEmpty) {
          return Left<ErrorResponse, AuthSessionEntity>(
            ErrorResponse(
              message: 'Empty access token returned from server.',
              data: ApiResponseErrorType.response,
            ),
          );
        }
        if (activeGuestId != null) {
          await _preferencesStorage.remove(guestIdKey);
        }
        await _secureStorage.saveTokens(accessToken: loginModel.accessToken);
        await _secureStorage.saveUserMap(loginModel.user.toJson());
        return Right<ErrorResponse, AuthSessionEntity>(
          AuthSessionEntity(
            accessToken: loginModel.accessToken,
            isNewUser: loginModel.isNewUser,
            user: _hydrateLocalFields(loginModel.user),
          ),
        );
      },
    );
  }

  AuthUserEntity _hydrateLocalFields(AuthUserModel model) {
    final storedBoard = _preferencesStorage.read(boardNameKey);
    final storedGoal = _preferencesStorage.getInt(dailyStudyGoalMinutesKey);
    return model.toEntity(
      boardName: (storedBoard != null && storedBoard.trim().isNotEmpty)
          ? storedBoard.trim()
          : null,
      dailyStudyGoalMinutes: storedGoal,
    );
  }
}
