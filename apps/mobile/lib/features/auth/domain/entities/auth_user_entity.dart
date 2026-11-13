import 'package:equatable/equatable.dart';

/// Five curriculum tracks supported by the porhi backend (`User.selectedClass`).
enum StudentTrack {
  class6to8('CLASS_6_8', 'জুনিয়র (ষষ্ঠ–অষ্টম)', 'Junior (Class 6–8)'),
  ssc('SSC', 'এসএসসি (SSC)', 'SSC'),
  hsc('HSC', 'এইচএসসি (HSC)', 'HSC'),
  admission('ADMISSION', 'ভর্তি প্রস্তুতি', 'Admission'),
  bcs('BCS', 'বিসিএস (BCS)', 'BCS');

  final String apiValue;
  final String labelBn;
  final String labelEn;

  const StudentTrack(this.apiValue, this.labelBn, this.labelEn);

  /// Parses a backend track string (`CLASS_6_8`, `SSC`, `HSC`, `ADMISSION`, `BCS`).
  static StudentTrack fromApiValue(String? value) {
    final normalized = value?.trim().toUpperCase();
    if (normalized == 'JUNIOR') {
      return StudentTrack.class6to8;
    }
    for (final track in StudentTrack.values) {
      if (track.apiValue == normalized) {
        return track;
      }
    }
    return StudentTrack.ssc;
  }

  static bool isValidApiValue(String? value) {
    final normalized = value?.trim().toUpperCase();
    return StudentTrack.values.any((t) => t.apiValue == normalized);
  }
}

/// Domain representation of an authenticated student profile.
class AuthUserEntity extends Equatable {
  final String id;
  final String? guestId;
  final String? firebaseUid;
  final String? phoneNumber;
  final String? email;
  final String? fullName;
  final String role;
  final StudentTrack selectedClass;
  final bool isGuest;
  final String? boardName;
  final int? dailyStudyGoalMinutes;

  const AuthUserEntity({
    required this.id,
    this.guestId,
    this.firebaseUid,
    this.phoneNumber,
    this.email,
    this.fullName,
    this.role = 'STUDENT',
    this.selectedClass = StudentTrack.ssc,
    this.isGuest = false,
    this.boardName,
    this.dailyStudyGoalMinutes,
  });

  bool get needsOnboarding =>
      !isGuest && (fullName == null || fullName!.trim().isEmpty);

  AuthUserEntity copyWith({
    String? id,
    String? guestId,
    String? firebaseUid,
    String? phoneNumber,
    String? email,
    String? fullName,
    String? role,
    StudentTrack? selectedClass,
    bool? isGuest,
    String? boardName,
    int? dailyStudyGoalMinutes,
  }) {
    return AuthUserEntity(
      id: id ?? this.id,
      guestId: guestId ?? this.guestId,
      firebaseUid: firebaseUid ?? this.firebaseUid,
      phoneNumber: phoneNumber ?? this.phoneNumber,
      email: email ?? this.email,
      fullName: fullName ?? this.fullName,
      role: role ?? this.role,
      selectedClass: selectedClass ?? this.selectedClass,
      isGuest: isGuest ?? this.isGuest,
      boardName: boardName ?? this.boardName,
      dailyStudyGoalMinutes:
          dailyStudyGoalMinutes ?? this.dailyStudyGoalMinutes,
    );
  }

  @override
  List<Object?> get props => <Object?>[
        id,
        guestId,
        firebaseUid,
        phoneNumber,
        email,
        fullName,
        role,
        selectedClass,
        isGuest,
        boardName,
        dailyStudyGoalMinutes,
      ];
}

/// Public authentication configuration returned by `GET /auth/config`.
class AuthConfigEntity extends Equatable {
  final bool guestLoginEnabled;

  const AuthConfigEntity({
    required this.guestLoginEnabled,
  });

  @override
  List<Object?> get props => <Object?>[guestLoginEnabled];
}

/// Authenticated backend session returned by `POST /auth/firebase`.
class AuthSessionEntity extends Equatable {
  final String accessToken;
  final bool isNewUser;
  final AuthUserEntity user;

  const AuthSessionEntity({
    required this.accessToken,
    required this.isNewUser,
    required this.user,
  });

  @override
  List<Object?> get props => <Object?>[accessToken, isNewUser, user];
}

/// Result of initiating Firebase phone OTP verification.
sealed class PhoneOtpResult extends Equatable {
  const PhoneOtpResult();
}

/// OTP SMS was sent; user must enter the 6-digit code with [verificationId].
final class PhoneOtpCodeSent extends PhoneOtpResult {
  final String verificationId;
  final int? resendToken;

  const PhoneOtpCodeSent({
    required this.verificationId,
    this.resendToken,
  });

  @override
  List<Object?> get props => <Object?>[verificationId, resendToken];
}

/// Android auto-retrieval verified the phone number immediately without manual OTP entry.
final class PhoneOtpAutoVerified extends PhoneOtpResult {
  final AuthSessionEntity session;

  const PhoneOtpAutoVerified(this.session);

  @override
  List<Object?> get props => <Object?>[session];
}
