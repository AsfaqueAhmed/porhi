import 'package:common/common.dart';
import 'package:equatable/equatable.dart';
import 'package:network/network.dart';
import 'package:porhi/core/i18n/bangla_digits.dart';
import 'package:porhi/features/auth/domain/entities/auth_user_entity.dart';
import 'package:porhi/features/auth/domain/repositories/auth_repository.dart';

class GetAuthConfigUseCase {
  final AuthRepository _repository;

  const GetAuthConfigUseCase(this._repository);

  Future<Either<ErrorResponse, AuthConfigEntity>> call() {
    return _repository.getAuthConfig();
  }
}

class SignInAsGuestUseCase {
  final AuthRepository _repository;

  const SignInAsGuestUseCase(this._repository);

  Future<Either<ErrorResponse, AuthSessionEntity>> call() {
    return _repository.signInAsGuest();
  }
}

class SignInWithGoogleUseCase {
  final AuthRepository _repository;

  const SignInWithGoogleUseCase(this._repository);

  Future<Either<ErrorResponse, AuthSessionEntity>> call() {
    return _repository.signInWithGoogle();
  }
}

class RequestPhoneOtpUseCase {
  final AuthRepository _repository;

  const RequestPhoneOtpUseCase(this._repository);

  Future<Either<ErrorResponse, PhoneOtpResult>> call(
    String rawPhone, {
    int? forceResendingToken,
  }) async {
    final normalized = normalizeBangladeshPhone(rawPhone);
    if (normalized == null) {
      return Left<ErrorResponse, PhoneOtpResult>(
        ErrorResponse(
          message: 'Enter a valid Bangladesh phone number (01XXXXXXXXX)',
          data: ApiResponseErrorType.response,
        ),
      );
    }
    return _repository.requestPhoneOtp(
      normalized,
      forceResendingToken: forceResendingToken,
    );
  }

  /// Normalizes local (`01XXXXXXXXX`) or E.164 (`+8801XXXXXXXXX`) BD mobile numbers.
  static String? normalizeBangladeshPhone(String input) {
    final ascii = toAsciiDigits(input);
    final stripped = ascii.replaceAll(RegExp(r'[\s\-\(\)]'), '').trim();
    if (stripped.isEmpty) return null;

    var candidate = stripped;
    if (candidate.startsWith('880') && !candidate.startsWith('+')) {
      candidate = '+$candidate';
    } else if (candidate.startsWith('01') && candidate.length == 11) {
      candidate = '+88$candidate';
    } else if (candidate.startsWith('1') && candidate.length == 10) {
      candidate = '+880$candidate';
    }

    final validBdE164 = RegExp(r'^\+8801[3-9]\d{8}$');
    if (!validBdE164.hasMatch(candidate)) {
      return null;
    }
    return candidate;
  }
}

class VerifyPhoneOtpUseCase {
  final AuthRepository _repository;

  const VerifyPhoneOtpUseCase(this._repository);

  Future<Either<ErrorResponse, AuthSessionEntity>> call({
    required String verificationId,
    required String smsCode,
  }) async {
    final trimmedId = verificationId.trim();
    final trimmedCode = toAsciiDigits(smsCode).trim();
    if (trimmedId.isEmpty) {
      return Left<ErrorResponse, AuthSessionEntity>(
        ErrorResponse(
          message: 'Verification session expired. Request a new OTP.',
          data: ApiResponseErrorType.response,
        ),
      );
    }
    if (!RegExp(r'^\d{6}$').hasMatch(trimmedCode)) {
      return Left<ErrorResponse, AuthSessionEntity>(
        ErrorResponse(
          message: 'Enter the 6-digit OTP code.',
          data: ApiResponseErrorType.response,
        ),
      );
    }
    return _repository.verifyPhoneOtp(trimmedId, trimmedCode);
  }
}

class RefreshBackendSessionUseCase {
  final AuthRepository _repository;

  const RefreshBackendSessionUseCase(this._repository);

  Future<Either<ErrorResponse, String>> call() {
    return _repository.refreshBackendSession();
  }
}

class GetMeUseCase {
  final AuthRepository _repository;

  const GetMeUseCase(this._repository);

  Future<Either<ErrorResponse, AuthUserEntity>> call() {
    return _repository.getMe();
  }
}

class UpdateProfileParams extends Equatable {
  final String? fullName;
  final StudentTrack? selectedClass;
  final String? boardName;
  final int? dailyStudyGoalMinutes;

  const UpdateProfileParams({
    this.fullName,
    this.selectedClass,
    this.boardName,
    this.dailyStudyGoalMinutes,
  });

  @override
  List<Object?> get props => <Object?>[
        fullName,
        selectedClass,
        boardName,
        dailyStudyGoalMinutes,
      ];
}

class UpdateProfileUseCase {
  final AuthRepository _repository;

  const UpdateProfileUseCase(this._repository);

  Future<Either<ErrorResponse, AuthUserEntity>> call(
    UpdateProfileParams params,
  ) async {
    String? sanitizedName;
    if (params.fullName != null) {
      sanitizedName = params.fullName!.trim();
      if (sanitizedName.isEmpty) {
        return Left<ErrorResponse, AuthUserEntity>(
          ErrorResponse(
            message: 'Full name cannot be empty',
            data: ApiResponseErrorType.response,
          ),
        );
      }
      if (sanitizedName.length > 80) {
        return Left<ErrorResponse, AuthUserEntity>(
          ErrorResponse(
            message: 'Full name must be 80 characters or fewer',
            data: ApiResponseErrorType.response,
          ),
        );
      }
    }

    if (params.dailyStudyGoalMinutes != null &&
        (params.dailyStudyGoalMinutes! < 5 ||
            params.dailyStudyGoalMinutes! > 720)) {
      return Left<ErrorResponse, AuthUserEntity>(
        ErrorResponse(
          message: 'Daily study goal must be between 5 and 720 minutes',
          data: ApiResponseErrorType.response,
        ),
      );
    }

    final sanitizedBoard = params.boardName?.trim();

    return _repository.updateProfile(
      fullName: sanitizedName,
      selectedClass: params.selectedClass,
      boardName:
          (sanitizedBoard != null && sanitizedBoard.isEmpty) ? null : sanitizedBoard,
      dailyStudyGoalMinutes: params.dailyStudyGoalMinutes,
    );
  }
}

class SignOutUseCase {
  final AuthRepository _repository;

  const SignOutUseCase(this._repository);

  Future<Either<ErrorResponse, void>> call() {
    return _repository.signOut();
  }
}

class GetCachedUserUseCase {
  final AuthRepository _repository;

  const GetCachedUserUseCase(this._repository);

  AuthUserEntity? call() {
    return _repository.getCachedUser();
  }
}

class GetLanguageUseCase {
  final AuthRepository _repository;

  const GetLanguageUseCase(this._repository);

  String call() {
    return _repository.getLanguage();
  }
}

class SetLanguageUseCase {
  final AuthRepository _repository;

  const SetLanguageUseCase(this._repository);

  Future<void> call(String languageCode) {
    return _repository.setLanguage(languageCode);
  }
}

class ClearOfflineDataUseCase {
  final AuthRepository _repository;

  const ClearOfflineDataUseCase(this._repository);

  Future<void> call() {
    return _repository.clearOfflineData();
  }
}
