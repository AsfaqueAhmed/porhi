import 'package:common/common.dart';
import 'package:network/network.dart';
import 'package:porhi/features/auth/data/models/auth_models.dart';

abstract class AuthRemoteDataSource {
  Future<Either<ErrorResponse, AuthLoginResponseModel>> firebaseLogin({
    required String idToken,
    String? fullName,
    String? selectedClass,
  });

  Future<Either<ErrorResponse, AuthUserModel>> getMe();

  Future<Either<ErrorResponse, AuthUserModel>> updateProfile({
    String? fullName,
    String? selectedClass,
  });
}

class AuthRemoteDataSourceImpl extends BaseRepository
    implements AuthRemoteDataSource {
  @override
  Future<Either<ErrorResponse, AuthLoginResponseModel>> firebaseLogin({
    required String idToken,
    String? fullName,
    String? selectedClass,
  }) {
    final body = <String, dynamic>{
      'idToken': idToken,
      'fullName': ?fullName,
      'selectedClass': ?selectedClass,
    };

    return post<AuthLoginResponseModel>(
      path: '/auth/firebase',
      data: body,
      responseCompiler: AuthLoginResponseModel.fromJson,
    );
  }

  @override
  Future<Either<ErrorResponse, AuthUserModel>> getMe() {
    return get<AuthUserModel>(
      path: '/auth/me',
      responseCompiler: AuthUserModel.fromJson,
    );
  }

  @override
  Future<Either<ErrorResponse, AuthUserModel>> updateProfile({
    String? fullName,
    String? selectedClass,
  }) {
    final body = <String, dynamic>{
      'fullName': ?fullName,
      'selectedClass': ?selectedClass,
    };

    return patch<AuthUserModel>(
      path: '/auth/profile',
      data: body,
      responseCompiler: AuthUserModel.fromJson,
    );
  }
}
