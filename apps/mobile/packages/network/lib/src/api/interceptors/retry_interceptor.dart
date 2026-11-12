import 'dart:math';

import 'package:dio/dio.dart';

import 'dio_aware.dart';

class RetryInterceptor extends Interceptor implements DioAware {
  final int maxRetries;
  final Duration initialDelay;
  final double backoffFactor;
  final Set<int> retryableStatusCodes;

  RetryInterceptor({
    this.maxRetries = 3,
    this.initialDelay = const Duration(milliseconds: 500),
    this.backoffFactor = 2.0,
    this.retryableStatusCodes = const {408, 429, 500, 501, 502, 503, 504},
  });

  Dio? _dio;

  @override
  void attachDio(Dio dio) => _dio = dio;

  @override
  void onError(DioException err, ErrorInterceptorHandler handler) async {
    final dio = _dio;
    final retryCount = _getRetryCount(err.requestOptions);

    if (dio == null || !_isRetryable(err, retryCount)) {
      handler.next(err);
      return;
    }

    try {
      final delay = _calculateBackoffDelay(retryCount);
      await Future.delayed(delay);

      _incrementRetryCount(err.requestOptions);

      final response = await dio.fetch(err.requestOptions);
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

  bool _isRetryable(DioException err, int retryCount) {
    if (retryCount >= maxRetries) {
      return false;
    }

    switch (err.type) {
      case DioExceptionType.connectionTimeout:
      case DioExceptionType.sendTimeout:
      case DioExceptionType.receiveTimeout:
      case DioExceptionType.connectionError:
        return true;
      case DioExceptionType.badResponse:
        final statusCode = err.response?.statusCode ?? 0;
        return retryableStatusCodes.contains(statusCode);
      case DioExceptionType.unknown:
        return true;
      default:
        return false;
    }
  }

  Duration _calculateBackoffDelay(int retryCount) {
    final exponentialDelay =
        initialDelay.inMilliseconds * pow(backoffFactor, retryCount);
    return Duration(milliseconds: exponentialDelay.toInt());
  }

  int _getRetryCount(RequestOptions options) {
    return (options.extra['_retry_count'] as int?) ?? 0;
  }

  void _incrementRetryCount(RequestOptions options) {
    options.extra['_retry_count'] = _getRetryCount(options) + 1;
  }
}
