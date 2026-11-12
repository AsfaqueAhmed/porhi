import 'package:dio/dio.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:network/src/api/api_client_impl.dart';
import 'package:network/src/api/interceptors/dio_aware.dart';

class _RecordingInterceptor extends Interceptor implements DioAware {
  Dio? attachedDio;

  @override
  void attachDio(Dio dio) => attachedDio = dio;
}

class _PlainInterceptor extends Interceptor {}

void main() {
  group('ApiClientImpl.addInterceptor', () {
    test('attaches its Dio instance to DioAware interceptors automatically',
        () {
      final client = ApiClientImpl();
      final interceptor = _RecordingInterceptor();

      client.addInterceptor(interceptor);

      expect(interceptor.attachedDio, isNotNull);
    });

    test('leaves interceptors that are not DioAware untouched', () {
      final client = ApiClientImpl();
      final interceptor = _PlainInterceptor();

      // Should not throw when the interceptor doesn't implement DioAware.
      expect(() => client.addInterceptor(interceptor), returnsNormally);
    });
  });
}
