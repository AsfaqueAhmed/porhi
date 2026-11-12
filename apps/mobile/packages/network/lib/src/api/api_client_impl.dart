import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'dart:typed_data';

import 'package:common/common.dart';
import 'package:dio/dio.dart';
import 'package:dio/io.dart';
import 'package:network/network.dart';

class ApiClientImpl extends ApiClient {
  final List<Interceptor> _interceptors = [];
  final Duration connectTimeout;
  final Duration receiveTimeout;

  late final Dio _dio;

  ApiClientImpl({
    bool hasBadCertificateIssue = false,
    this.connectTimeout = const Duration(seconds: 30),
    this.receiveTimeout = const Duration(seconds: 30),
  }) {
    _dio = Dio(BaseOptions(
      connectTimeout: connectTimeout,
      receiveTimeout: receiveTimeout,
    ));

    if (hasBadCertificateIssue) {
      // ignore: deprecated_member_use
      (_dio.httpClientAdapter as DefaultHttpClientAdapter).onHttpClientCreate =
          (client) {
        client.badCertificateCallback =
            (X509Certificate cert, String host, int port) => true;
        return client;
      };

      (_dio.httpClientAdapter as IOHttpClientAdapter).validateCertificate =
          _validateCCertificate;
    }
  }

  ///add new [interceptor] to the client
  @override
  void addInterceptor<T extends Interceptor>(T interceptor) {
    //let the developer know if it already added
    if (_interceptors.contains(interceptor)) {
      logInfo("Can't add this interceptor as it's already added.");
    }
    //add interceptor if it's not added previously
    else {
      _interceptors.add(interceptor);
      _dio.interceptors.add(interceptor);
      //give the interceptor a reference to this client's Dio instance if it
      //needs one (e.g. TokenRefreshInterceptor/RetryInterceptor use it to
      //retry the original request) — otherwise it silently no-ops.
      if (interceptor is DioAware) {
        (interceptor as DioAware).attachDio(_dio);
      }
    }
  }

  ///remove [interceptor] from the client
  @override
  void removeInterceptor<T extends Interceptor>(T interceptor) {
    //remove the interceptor if it already exists
    if (_interceptors.contains(interceptor)) {
      _interceptors.remove(interceptor);
      _dio.interceptors.remove(interceptor);
    }
    //let the developer know if it not added previously
    else {
      logInfo("Can't removed this interceptor as it's not added.");
    }
  }

  @override
  Future<dynamic> get({
    required String path,
    Map<String, dynamic>? queryParameters,
    Map<String, dynamic>? data,
    Options? options,
    Function(int count, int total)? onReceiveProgress,
    CancelToken? cancelToken,
  }) async {
    try {
      if (_hasConnection()) {
        _dio.options.headers = _regularHeader;

        Response response = await _dio.get(
          path,
          queryParameters: queryParameters,
          options: options,
          data: data,
          onReceiveProgress: onReceiveProgress,
          cancelToken: cancelToken,
        );
        return response.data;
      }
      return _noConnectionError();
    } catch (error, stack) {
      return _unexpectedError(error, stack);
    }
  }

  @override
  Future<dynamic> post({
    required String path,
    required Object? data,
    RequestType requestType = RequestType.raw,
    Map<String, dynamic>? queryParameters,
    Options? options,
    Function(int count, int total)? onReceiveProgress,
    Function(int count, int total)? onSendProgress,
    Map<String, String>? headers,
    CancelToken? cancelToken,
  }) async {
    try {
      if (_hasConnection()) {
        if (headers != null) {
          _dio.options.headers = {
            ...(_dio.options.headers),
            ...headers,
          };
        }
        if (requestType == RequestType.raw) {
          _dio.options.headers = _regularHeader;
        } else if (requestType == RequestType.text) {
          _dio.options.headers = _textHeader;
        } else {
          _dio.options.headers = _multipartFileHeader;
        }

        Response response = await _dio.post(
          path,
          data: requestType == RequestType.text
              ? jsonEncode(data)
              : requestType == RequestType.raw
                  ? data
                  : FormData.fromMap(data as Map<String, dynamic>),
          queryParameters: queryParameters,
          options: options,
          onReceiveProgress: onReceiveProgress,
          onSendProgress: onSendProgress,
          cancelToken: cancelToken,
        );

        return response.data;
      }
      return _noConnectionError();
    } catch (error, stack) {
      return _unexpectedError(error, stack);
    }
  }

  @override
  Future<dynamic> put({
    required String path,
    dynamic data,
    RequestType requestType = RequestType.raw,
    Map<String, dynamic>? queryParameters,
    Options? options,
    Function(int count, int total)? onReceiveProgress,
    Function(int count, int total)? onSendProgress,
    Map<String, String>? headers,
    CancelToken? cancelToken,
  }) async {
    try {
      if (_hasConnection()) {
        if (headers != null) {
          _dio.options.headers = {
            ...(_dio.options.headers),
            ...headers,
          };
        }
        if (requestType == RequestType.raw) {
          _dio.options.headers = _regularHeader;
        } else if (requestType == RequestType.text) {
          _dio.options.headers = _textHeader;
        } else {
          _dio.options.headers = _multipartFileHeader;
        }

        Response response = await _dio.put(
          path,
          data: requestType == RequestType.text
              ? jsonEncode(data)
              : requestType == RequestType.raw
                  ? data
                  : FormData.fromMap(data as Map<String, dynamic>),
          queryParameters: queryParameters,
          options: options,
          onReceiveProgress: onReceiveProgress,
          onSendProgress: onSendProgress,
          cancelToken: cancelToken,
        );
        return response.data;
      }
      return _noConnectionError();
    } catch (error, stack) {
      return _unexpectedError(error, stack);
    }
  }

  @override
  Future<dynamic> patch({
    required String path,
    required Object? data,
    RequestType requestType = RequestType.raw,
    Map<String, dynamic>? queryParameters,
    Options? options,
    Function(int count, int total)? onReceiveProgress,
    Function(int count, int total)? onSendProgress,
    Map<String, String>? headers,
    CancelToken? cancelToken,
  }) async {
    try {
      if (_hasConnection()) {
        if (headers != null) {
          _dio.options.headers = {
            ...(_dio.options.headers),
            ...headers,
          };
        }
        if (requestType == RequestType.raw) {
          _dio.options.headers = _regularHeader;
        } else if (requestType == RequestType.text) {
          _dio.options.headers = _textHeader;
        } else {
          _dio.options.headers = _multipartFileHeader;
        }

        Response response = await _dio.patch(
          path,
          data: requestType == RequestType.text
              ? jsonEncode(data)
              : requestType == RequestType.raw
                  ? data
                  : FormData.fromMap(data as Map<String, dynamic>),
          queryParameters: queryParameters,
          options: options,
          onReceiveProgress: onReceiveProgress,
          onSendProgress: onSendProgress,
          cancelToken: cancelToken,
        );
        return response.data;
      }
      return _noConnectionError();
    } catch (error, stack) {
      return _unexpectedError(error, stack);
    }
  }

  @override
  Future<dynamic> delete({
    required String path,
    Map<String, dynamic>? queryParameters,
    Map<String, dynamic>? data,
    Options? options,
    CancelToken? cancelToken,
  }) async {
    try {
      if (_hasConnection()) {
        _dio.options.headers = _regularHeader;

        Response response = await _dio.delete(
          path,
          queryParameters: queryParameters,
          data: data,
          options: options,
          cancelToken: cancelToken,
        );
        return response.data;
      }
      return _noConnectionError();
    } catch (error, stack) {
      return _unexpectedError(error, stack);
    }
  }

  @override
  Future<dynamic> upload({
    required String path,
    required File file,
    required String fileKey,
    Map<String, dynamic>? queryParameters,
    Options? options,
    Function(int count, int total)? onReceiveProgress,
    Function(int count, int total)? onSendProgress,
    CancelToken? cancelToken,
  }) async {
    try {
      if (_hasConnection()) {
        _dio.options.headers = _multipartFileHeader;

        Response response = await _dio.post(
          path,
          data: FormData.fromMap({
            fileKey: await MultipartFile.fromFile(file.path),
          }),
          queryParameters: queryParameters,
          options: options,
          onReceiveProgress: onReceiveProgress,
          onSendProgress: onSendProgress,
          cancelToken: cancelToken,
        );
        return response.data;
      }
      return _noConnectionError();
    } catch (error, stack) {
      return _unexpectedError(error, stack);
    }
  }

  void _printError(Object error, StackTrace stack) {
    logError("=====Exception====");
    logError(error);
    logError(stack);
    logError("=====End====");
  }

  /// Every failure path (offline, or an unexpected local exception) returns
  /// a typed [ErrorResponse] instead of a bare `null`, so callers going
  /// straight through [ApiClient] (not [BaseRepository]) can't confuse a
  /// genuinely empty/null successful response with a failure.
  ErrorResponse _noConnectionError() =>
      ErrorResponse.byErrorType(errorType: ApiResponseErrorType.noInternet);

  ErrorResponse _unexpectedError(Object error, StackTrace stack) {
    _printError(error, stack);
    return ErrorResponse.byErrorType(errorType: ApiResponseErrorType.response);
  }

  Map<String, dynamic> get _regularHeader => {
        ...(_dio.options.headers),
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json',
      };

  Map<String, dynamic> get _textHeader => {
        ...(_dio.options.headers),
        'Content-Type': 'text/plain; charset=UTF-8',
        'Accept': 'application/json',
      };

  Map<String, dynamic> get _multipartFileHeader => {
        ...(_dio.options.headers),
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
      };

  request(String path,
      {required data,
      required Map<String, dynamic> queryParameters,
      required Options options}) {
    return _dio.request<dynamic>(
      path,
      data: data,
      queryParameters: queryParameters,
      options: options,
    );
  }

  bool _hasConnection() {
    return (NetworkInitializer.instance.networkService.hasInternet);
  }

  bool _validateCCertificate(
      X509Certificate? certificate, String host, int port) {
    return true;
  }

  @override
  Future<Stream<String>?> streamedPost(
      {required String path,
      required Object? data,
      Map<String, dynamic>? queryParameters,
      Options? options,
      Function(int count, int total)? onReceiveProgress,
      Function(int count, int total)? onSendProgress,
      Map<String, String>? headers,
      CancelToken? cancelToken}) async {
    try {
      if (_hasConnection()) {
        if (headers != null) {
          _dio.options.headers = {
            ...(_dio.options.headers),
            ...headers,
          };
        }

        Response response = await _dio.post(path,
            data: data,
            queryParameters: queryParameters,
            onReceiveProgress: onReceiveProgress,
            onSendProgress: onSendProgress,
            cancelToken: cancelToken,
            options: Options(
              responseType: ResponseType.stream,
              headers: _dio.options.headers,
              // SSE streams stay open for minutes; disable receive timeout so
              // Dio doesn't close the connection between sparse chunks.
              receiveTimeout: Duration.zero,
            ));

        StreamTransformer<Uint8List, List<int>> unit8Transformer =
            StreamTransformer.fromHandlers(
          handleData: (data, sink) {
            try {
              sink.add(List<int>.from(data));
            } catch (e) {
              logError("sink error: ${e.toString()}");
            }
          },
        );

        if (response.data is ErrorResponse) return null;

        return response.data.stream
            .transform(unit8Transformer)
            .transform(const Utf8Decoder())
            .transform(const LineSplitter());
      }
    } catch (error, stack) {
      _printError(error, stack);
      return null;
    }
    return null;
  }

  @override
  Future<dynamic> fetch({required RequestOptions requestOptions}) async {
    try {
      if (_hasConnection()) {
        Response response = await _dio.fetch(requestOptions);
        return response.data;
      }
      return _noConnectionError();
    } catch (error, stack) {
      return _unexpectedError(error, stack);
    }
  }
}
