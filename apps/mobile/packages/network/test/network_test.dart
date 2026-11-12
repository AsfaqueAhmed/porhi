import 'dart:convert';
import 'dart:typed_data';

import 'package:dio/dio.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:network/network.dart';

class _TestAdapter implements HttpClientAdapter {
  final Future<ResponseBody> Function(RequestOptions options) onFetch;

  _TestAdapter(this.onFetch);

  @override
  void close({bool force = false}) {}

  @override
  Future<ResponseBody> fetch(
    RequestOptions options,
    Stream<Uint8List>? requestStream,
    Future<void>? cancelFuture,
  ) {
    return onFetch(options);
  }
}

void main() {
  test('ErrorResponse.byErrorType creates a typed error response', () {
    final response = ErrorResponse.byErrorType(
      errorType: ApiResponseErrorType.noInternet,
    );
    expect(response.data, ApiResponseErrorType.noInternet);
    expect(response.message, 'Please connect to internet');
  });

  test(
    'ErrorInterceptor preserves NestJS 403/409 string and array messages with statusCode',
    () async {
      final dio = Dio();
      dio.interceptors.add(ErrorInterceptor());

      dio.httpClientAdapter = _TestAdapter((_) async {
        return ResponseBody.fromString(
          jsonEncode(<String, dynamic>{
            'statusCode': 403,
            'message': 'Staff accounts must log in via the admin portal',
          }),
          403,
          headers: <String, List<String>>{
            Headers.contentTypeHeader: <String>[Headers.jsonContentType],
          },
        );
      });

      final forbiddenRes = await dio.post<dynamic>('https://example.test/auth');
      expect(forbiddenRes.data, isA<ErrorResponse>());
      final forbiddenErr = forbiddenRes.data as ErrorResponse;
      expect(forbiddenErr.statusCode, 403);
      expect(
        forbiddenErr.message,
        'Staff accounts must log in via the admin portal',
      );

      dio.httpClientAdapter = _TestAdapter((_) async {
        return ResponseBody.fromString(
          jsonEncode(<String, dynamic>{
            'statusCode': 409,
            'message': <String>[
              'Phone number already linked',
              'Use another account',
            ],
          }),
          409,
          headers: <String, List<String>>{
            Headers.contentTypeHeader: <String>[Headers.jsonContentType],
          },
        );
      });

      final conflictRes = await dio.post<dynamic>('https://example.test/auth');
      expect(conflictRes.data, isA<ErrorResponse>());
      final conflictErr = conflictRes.data as ErrorResponse;
      expect(conflictErr.statusCode, 409);
      expect(
        conflictErr.message,
        'Phone number already linked, Use another account',
      );
    },
  );

  test(
    'TokenRefreshInterceptor awaits async onRefreshFailed before resolving ErrorInterceptor',
    () async {
      final dio = Dio();
      dio.httpClientAdapter = _TestAdapter((_) async {
        return ResponseBody.fromString(
          jsonEncode(<String, dynamic>{'message': 'Unauthorized'}),
          401,
          headers: <String, List<String>>{
            Headers.contentTypeHeader: <String>[Headers.jsonContentType],
          },
        );
      });

      var cleanupCompleted = false;
      final refreshInterceptor = TokenRefreshInterceptor(
        onRefreshToken: () async => null,
        onRefreshFailed: () async {
          await Future<void>.delayed(const Duration(milliseconds: 25));
          cleanupCompleted = true;
        },
      )..attachDio(dio);

      dio.interceptors.addAll(<Interceptor>[
        refreshInterceptor,
        ErrorInterceptor(),
      ]);

      final res = await dio.get<dynamic>('https://example.test/me');
      expect(cleanupCompleted, isTrue);
      expect(res.data, isA<ErrorResponse>());
      expect((res.data as ErrorResponse).statusCode, 401);
    },
  );
}
