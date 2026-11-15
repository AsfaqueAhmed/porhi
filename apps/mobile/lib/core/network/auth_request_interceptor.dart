import 'package:dio/dio.dart';
import 'package:porhi/app/env.dart';
import 'package:porhi/core/storage/secure_storage_service.dart';

/// Injects `baseUrl` for relative paths and `Authorization: Bearer <token>`
/// per request, compensating for [ApiClientImpl] resetting `_dio.options.headers`.
class AuthRequestInterceptor extends Interceptor {
  final EnvConfig _envConfig;
  final SecureStorageService _secureStorage;

  AuthRequestInterceptor({
    required this._envConfig,
    required this._secureStorage,
  });

  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) {
    if (!_isAbsoluteUrl(options.path) && options.baseUrl.isEmpty) {
      final base = _envConfig.normalizedApiBaseUrl;
      options.baseUrl = base;
      final baseUri = Uri.tryParse(base);
      if (baseUri != null && baseUri.path.isNotEmpty && baseUri.path != '/') {
        final basePath = baseUri.path.endsWith('/')
            ? baseUri.path.substring(0, baseUri.path.length - 1)
            : baseUri.path;
        if (!options.path.startsWith('$basePath/') && options.path != basePath) {
          final normalizedSubPath = options.path.startsWith('/')
              ? options.path.substring(1)
              : options.path;
          options.path = '$basePath/$normalizedSubPath';
          if (baseUri.origin.isNotEmpty && baseUri.origin != 'null') {
            options.baseUrl = baseUri.origin;
          }
        }
      }
    }

    final trimmedPath = options.path.trim();
    final isAuthExchange =
        trimmedPath.endsWith('/auth/firebase') ||
        trimmedPath.endsWith('/auth/guest') ||
        trimmedPath.endsWith('/auth/config');
    if (options.extra['_skipAuth'] != true && !isAuthExchange) {
      final isRetryWithFreshHeader =
          options.extra['_retriedAfterRefresh'] == true &&
              (options.headers['Authorization']?.toString().isNotEmpty ??
                  false);

      if (!isRetryWithFreshHeader) {
        final token = _secureStorage.accessToken;
        if (token != null && token.isNotEmpty) {
          options.headers['Authorization'] = 'Bearer $token';
        } else {
          options.headers.remove('Authorization');
        }
      }
    }

    handler.next(options);
  }

  static bool _isAbsoluteUrl(String path) {
    final lower = path.trim().toLowerCase();
    return lower.startsWith('http://') || lower.startsWith('https://');
  }
}
