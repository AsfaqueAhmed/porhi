import 'package:dio/dio.dart';

/// Implemented by interceptors that need a reference to the [Dio] instance
/// they're attached to (e.g. to retry a request via `dio.fetch(...)`).
///
/// [ApiClientImpl.addInterceptor] attaches automatically, so callers never
/// need to call [attachDio] themselves.
abstract class DioAware {
  void attachDio(Dio dio);
}
