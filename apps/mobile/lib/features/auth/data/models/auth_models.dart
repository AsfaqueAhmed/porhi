import 'package:network/network.dart';
import 'package:porhi/features/auth/domain/entities/auth_user_entity.dart';

/// DTO matching `apps/api`'s user payload from `/auth/firebase`, `/auth/guest`,
/// `/auth/me`, and `/auth/profile`.
class AuthUserModel extends BaseResponseModel<AuthUserModel> {
  final String id;
  final String? guestId;
  final String? firebaseUid;
  final String? phoneNumber;
  final String? email;
  final String? fullName;
  final String role;
  final String selectedClass;
  final bool isGuest;

  AuthUserModel({
    required this.id,
    this.guestId,
    this.firebaseUid,
    this.phoneNumber,
    this.email,
    this.fullName,
    this.role = 'STUDENT',
    this.selectedClass = 'SSC',
    this.isGuest = false,
    super.message,
  }) {
    data = this;
  }

  factory AuthUserModel.fromJson(Map<String, dynamic> json) {
    final payload = json['user'] is Map
        ? Map<String, dynamic>.from(json['user'] as Map)
        : json;

    final guestId = payload['guestId'] as String?;
    final phoneNumber = payload['phoneNumber'] as String?;
    final explicitIsGuest = payload['isGuest'] as bool?;
    final resolvedIsGuest = explicitIsGuest ??
        (guestId != null &&
            guestId.trim().isNotEmpty &&
            (phoneNumber == null || phoneNumber.trim().isEmpty));

    return AuthUserModel(
      id: (payload['id'] ?? '').toString(),
      guestId: guestId,
      firebaseUid: payload['firebaseUid'] as String?,
      phoneNumber: phoneNumber,
      email: payload['email'] as String?,
      fullName: payload['fullName'] as String?,
      role: (payload['role'] ?? 'STUDENT').toString(),
      selectedClass: (payload['selectedClass'] ?? 'SSC').toString(),
      isGuest: resolvedIsGuest,
      message: json['message'] as String?,
    );
  }

  @override
  Map<String, dynamic> toJson() => <String, dynamic>{
        'id': id,
        'guestId': guestId,
        'firebaseUid': firebaseUid,
        'phoneNumber': phoneNumber,
        'email': email,
        'fullName': fullName,
        'role': role,
        'selectedClass': selectedClass,
        'isGuest': isGuest,
      };

  AuthUserEntity toEntity({
    String? boardName,
    int? dailyStudyGoalMinutes,
  }) {
    return AuthUserEntity(
      id: id,
      guestId: guestId,
      firebaseUid: firebaseUid,
      phoneNumber: phoneNumber,
      email: email,
      fullName: fullName,
      role: role,
      selectedClass: StudentTrack.fromApiValue(selectedClass),
      isGuest: isGuest,
      boardName: boardName,
      dailyStudyGoalMinutes: dailyStudyGoalMinutes,
    );
  }
}

/// DTO matching `apps/api`'s `FirebaseAuthResult` from `POST /auth/firebase`.
class AuthLoginResponseModel extends BaseResponseModel<AuthLoginResponseModel> {
  final String accessToken;
  final bool isNewUser;
  final AuthUserModel user;

  AuthLoginResponseModel({
    required this.accessToken,
    required this.isNewUser,
    required this.user,
    super.message,
  }) {
    data = this;
  }

  factory AuthLoginResponseModel.fromJson(Map<String, dynamic> json) {
    final rawUser = json['user'];
    final userMap = rawUser is Map
        ? Map<String, dynamic>.from(rawUser)
        : <String, dynamic>{};

    return AuthLoginResponseModel(
      accessToken: (json['accessToken'] ?? '').toString(),
      isNewUser: json['isNewUser'] as bool? ?? false,
      user: AuthUserModel.fromJson(userMap),
      message: json['message'] as String?,
    );
  }

  @override
  Map<String, dynamic> toJson() => <String, dynamic>{
        'accessToken': accessToken,
        'isNewUser': isNewUser,
        'user': user.toJson(),
      };
}

/// DTO matching `apps/api`'s `AuthConfigResult` from `GET /auth/config`.
class AuthConfigModel extends BaseResponseModel<AuthConfigModel> {
  final bool guestLoginEnabled;

  AuthConfigModel({
    required this.guestLoginEnabled,
    super.message,
  }) {
    data = this;
  }

  factory AuthConfigModel.fromJson(Map<String, dynamic> json) {
    return AuthConfigModel(
      guestLoginEnabled: json['guestLoginEnabled'] as bool? ?? true,
      message: json['message'] as String?,
    );
  }

  @override
  Map<String, dynamic> toJson() => <String, dynamic>{
        'guestLoginEnabled': guestLoginEnabled,
      };

  AuthConfigEntity toEntity() => AuthConfigEntity(
        guestLoginEnabled: guestLoginEnabled,
      );
}
