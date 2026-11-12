import 'package:common/common.dart';
import 'package:network/network.dart';
import 'package:porhi/features/auth/domain/entities/auth_user_entity.dart';

/// Domain contract for student authentication, session refresh, and profile sync.
abstract class AuthRepository {
  Future<Either<ErrorResponse, AuthSessionEntity>> signInWithGoogle();

  Future<Either<ErrorResponse, PhoneOtpResult>> requestPhoneOtp(
    String phoneNumber, {
    int? forceResendingToken,
  });

  Future<Either<ErrorResponse, AuthSessionEntity>> verifyPhoneOtp(
    String verificationId,
    String smsCode,
  );

  Future<Either<ErrorResponse, String>> refreshBackendSession();

  Future<Either<ErrorResponse, AuthUserEntity>> getMe();

  Future<Either<ErrorResponse, AuthUserEntity>> updateProfile({
    String? fullName,
    StudentTrack? selectedClass,
    String? boardName,
    int? dailyStudyGoalMinutes,
  });

  Future<Either<ErrorResponse, void>> signOut();

  AuthUserEntity? getCachedUser();

  bool hasStoredSession();

  String getLanguage();

  Future<void> setLanguage(String languageCode);

  Future<void> clearOfflineData();
}
