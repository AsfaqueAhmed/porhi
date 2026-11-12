import 'package:network/network.dart';
import 'package:porhi/features/auth/domain/entities/auth_user_entity.dart';

/// DTO matching `apps/api`'s user payload from `/auth/firebase`, `/auth/me`,
/// and `/auth/profile`.
class AuthUserModel extends BaseResponseModel<AuthUserModel> {
  final String id;
  final String? firebaseUid;
  final String? phoneNumber;
  final String? email;
  final String? fullName;
  final String role;
  final String selectedClass;
  final bool isGuest;

  AuthUserModel({
    required this.id,
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

    return AuthUserModel(
      id: (payload['id'] ?? '').toString(),
      firebaseUid: payload['firebaseUid'] as String?,
      phoneNumber: payload['phoneNumber'] as String?,
      email: payload['email'] as String?,
      fullName: payload['fullName'] as String?,
      role: (payload['role'] ?? 'STUDENT').toString(),
      selectedClass: (payload['selectedClass'] ?? 'SSC').toString(),
      isGuest: payload['isGuest'] as bool? ?? false,
      message: json['message'] as String?,
    );
  }

  @override
  Map<String, dynamic> toJson() => <String, dynamic>{
        'id': id,
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
      firebaseUid: firebaseUid,
      phoneNumber: phoneNumber,
      email: email,
      fullName: fullName,
      role: role,
      selectedClass: StudentTrack.fromApiValue(selectedClass),
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
