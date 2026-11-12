import 'dart:async';

import 'package:dio/dio.dart';

import 'dio_aware.dart';

class TokenRefreshInterceptor extends Interceptor implements DioAware {
  final Future<String?> Function() onRefreshToken;

  final void Function(String token)? onTokenRefreshed;

  final FutureOr<void> Function()? onRefreshFailed;

  final Set<int> unauthorizedStatusCodes;

  final String authHeaderKey;

  final String Function(String token) authHeaderBuilder;

  final bool Function(RequestOptions options)? shouldAttemptRefresh;

  TokenRefreshInterceptor({
    required this.onRefreshToken,
    this.onTokenRefreshed,
    this.onRefreshFailed,
    this.unauthorizedStatusCodes = const {401},
    this.authHeaderKey = 'Authorization',
    this.authHeaderBuilder = _defaultAuthHeaderBuilder,
    this.shouldAttemptRefresh,
  });

  static String _defaultAuthHeaderBuilder(String token) => 'Bearer $token';


  Dio? _dio;

  @override
  void attachDio(Dio dio) => _dio = dio;

  Completer<String?>? _refreshing;

  @override
  void onError(DioException err, ErrorInterceptorHandler handler) async {
    final dio = _dio;
    final statusCode = err.response?.statusCode;
    final alreadyRetried =
        err.requestOptions.extra['_retriedAfterRefresh'] == true;

    if (dio == null ||
        statusCode == null ||
        alreadyRetried ||
        !unauthorizedStatusCodes.contains(statusCode) ||
        (shouldAttemptRefresh != null &&
            !shouldAttemptRefresh!(err.requestOptions))) {
      handler.next(err);
      return;
    }

    try {
      final token = await _refreshToken();
      if (token == null) {
        await onRefreshFailed?.call();
        handler.next(err);
        return;
      }

      final authHeader = authHeaderBuilder(token);
      dio.options.headers[authHeaderKey] = authHeader;

      final options = err.requestOptions;
      options.extra['_retriedAfterRefresh'] = true;
      options.headers[authHeaderKey] = authHeader;

      final response = await dio.fetch(options);
      handler.resolve(response);
    } catch (e) {
      if (e is DioException) {
        handler.next(e);
      } else {
        handler.next(DioException(
          requestOptions: err.requestOptions,
          error: e,
          type: DioExceptionType.unknown,
        ));
      }
    }
  }

  Future<String?> _refreshToken() {
    final inProgress = _refreshing;
    if (inProgress != null) return inProgress.future;

    final completer = Completer<String?>();
    _refreshing = completer;

    onRefreshToken().then((token) {
      if (token != null) onTokenRefreshed?.call(token);
      completer.complete(token);
    }).catchError((e) {
      completer.complete(null);
    }).whenComplete(() {
      _refreshing = null;
    });

    return completer.future;
  }
}
