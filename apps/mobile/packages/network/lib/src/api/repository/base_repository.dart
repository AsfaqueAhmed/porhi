import 'dart:convert';
import 'dart:io';

import 'package:common/common.dart' as common;
import 'package:common/common.dart';
import 'package:dio/dio.dart';
import 'package:network/network.dart';
import 'package:network/src/api/models/base_wrapper_model.dart';
import 'package:network/src/services/storage_service.dart';

abstract class BaseRepository {
  //Api client for making api calls
  final ApiClient apiClient = NetworkInitializer.instance.apiClient;

  final Map<String, CancelToken> activeRequests =
      NetworkInitializer.instance.activeRequests;

  ///make POST request to provided [path] with given [data].
  ///provide a [responseCompiler] to get return on the expected data type [T] or [ErrorResponse]
  Future<Either<ErrorResponse, T>> post<T extends BaseResponseModel>({
    required String path,
    Object? data,
    RequestType requestType = RequestType.raw,
    required T Function(Map<String, dynamic> json) responseCompiler,
    Map<String, String>? headers,
    Map<String, dynamic>? queryParameters,
    String? requestId,
  }) async {
    final cancelToken = CancelToken();
    if (requestId != null) activeRequests[requestId] = cancelToken;

    try {
      var response = await apiClient.post(
        path: path,
        data: data,
        requestType: requestType,
        queryParameters: queryParameters,
        headers: headers,
        cancelToken: cancelToken,
      );

      return _compileResponse<T>(response, responseCompiler);
    } catch (e) {
      printError(e);
      return Left(
          ErrorResponse.byErrorType(errorType: ApiResponseErrorType.response));
    }
  }

  ///make POST request to provided [path] with given [data].
  Future<Stream<Map<String, dynamic>?>?>
      postStream<T extends BaseResponseModel>({
    required String path,
    Object? data,
    Map<String, dynamic>? queryParameters,
    Map<String, String>? headers,
    String? requestId,
  }) async {
    final cancelToken = CancelToken();
    if (requestId != null) activeRequests[requestId] = cancelToken;

    try {
      final response = await apiClient.streamedPost(
        path: path,
        data: data,
        queryParameters: queryParameters,
        cancelToken: cancelToken,
        headers: {
          "Accept": "text/event-stream",
          "Cache-Control": "no-cache",
          if (headers != null) ...headers,
        },
      );

      return response?.map((data) {
        try {
          return (jsonDecode(data.split("data:").last) as Map<String, dynamic>);
        } on Exception {
          return null;
        }
      });
    } catch (e) {
      printError(e);
      return null;
    }
  }

  ///make GET request to provided [path] with given [queryParameters].
  ///provide a [responseCompiler] to get return on the expected data type [T] or [ErrorResponse]
  ///set [cache] to true if you want to use caching
  Future<Either<ErrorResponse, T>> get<T extends BaseResponseModel>({
    required String path,
    Map<String, String>? queryParameters,
    Map<String, String>? data,
    required T Function(Map<String, dynamic> json) responseCompiler,
    bool cache = false,
    Function(T?)? storedDataObtain,
    Map<String, String>? headers,
    String? requestId,
    Function(int, int)? progress,
  }) async {
    final cancelToken = CancelToken();
    if (requestId != null) activeRequests[requestId] = cancelToken;

    try {
      if (storedDataObtain != null) {
        storedDataObtain(
          StorageService().getStoredResponse(path, responseCompiler),
        );
      }
      var response = await apiClient.get(
        path: path,
        queryParameters: queryParameters,
        data: data,
        //provide caching info in extra on Options
        options: Options(extra: {
          "useCache": cache,
          "useStoredCache": storedDataObtain != null
        }, headers: headers),
        cancelToken: cancelToken,
        onReceiveProgress: progress,
      );
      return _compileResponse<T>(response, responseCompiler);
    } catch (e, s) {
      printError(e, s);
      return Left(
          ErrorResponse.byErrorType(errorType: ApiResponseErrorType.response));
    }
  }

  ///make PUT request to provided [path] with given [data].
  ///provide a [responseCompiler] to get return on the expected data type [T] or [ErrorResponse]
  Future<Either<ErrorResponse, T>> put<T extends BaseResponseModel>({
    required String path,
    dynamic data,
    RequestType requestType = RequestType.raw,
    Map<String, dynamic>? queryParameters,
    Map<String, String>? headers,
    required T Function(Map<String, dynamic> json) responseCompiler,
    String? requestId,
  }) async {
    final cancelToken = CancelToken();
    if (requestId != null) activeRequests[requestId] = cancelToken;

    try {
      var response = await apiClient.put(
        path: path,
        data: data,
        requestType: requestType,
        queryParameters: queryParameters,
        headers: headers,
        cancelToken: cancelToken,
      );

      return _compileResponse<T>(response, responseCompiler);
    } catch (e) {
      printError(e);
      return Left(
          ErrorResponse.byErrorType(errorType: ApiResponseErrorType.response));
    }
  }

  Future<Either<ErrorResponse, T>> patch<T extends BaseResponseModel>({
    required String path,
    Object? data,
    Map<String, dynamic>? queryParameters,
    required T Function(Map<String, dynamic> json) responseCompiler,
    Map<String, String>? headers,
    String? requestId,
    RequestType requestType = RequestType.raw,
  }) async {
    final cancelToken = CancelToken();
    if (requestId != null) activeRequests[requestId] = cancelToken;

    try {
      final response = await apiClient.patch(
        path: path,
        data: data,
        requestType: requestType,
        queryParameters: queryParameters,
        headers: headers,
        cancelToken: cancelToken,
      );

      return _compileResponse<T>(response, responseCompiler);
    } catch (e) {
      printError(e);
      return Left(
          ErrorResponse.byErrorType(errorType: ApiResponseErrorType.response));
    }
  }

  ///make DELETE request to provided [path] with given [queryParameters].
  ///provide a [responseCompiler] to get return on the expected data type [T] or [ErrorResponse]
  Future<Either<ErrorResponse, T>> delete<T extends BaseResponseModel>({
    required String path,
    Map<String, dynamic>? queryParameters,
    Map<String, dynamic>? data,
    required T Function(Map<String, dynamic> json) responseCompiler,
    String? requestId,
  }) async {
    final cancelToken = CancelToken();
    if (requestId != null) activeRequests[requestId] = cancelToken;

    try {
      var response = await apiClient.delete(
        path: path,
        queryParameters: queryParameters,
        data: data,
        cancelToken: cancelToken,
      );

      return _compileResponse<T>(response, responseCompiler);
    } catch (e, s) {
      printError(e, s);
      return Left(
        ErrorResponse.byErrorType(errorType: ApiResponseErrorType.response),
      );
    }
  }

  ///make UPLOAD file request to provided [path] with given [queryParameters].
  ///provide a [responseCompiler] to get return on the expected data type [T] or [ErrorResponse]
  Future<Either<ErrorResponse, T>> upload<T extends BaseResponseModel>({
    required String path,
    required File file,
    required String fileKey,
    Map<String, dynamic>? queryParameters,
    Map<String, dynamic>? data,
    required T Function(Map<String, dynamic> json) responseCompiler,
    String? requestId,
  }) async {
    final cancelToken = CancelToken();
    if (requestId != null) activeRequests[requestId] = cancelToken;

    try {
      var response = await apiClient.upload(
        path: path,
        queryParameters: queryParameters,
        cancelToken: cancelToken,
        file: file,
        fileKey: fileKey,
      );

      return _compileResponse<T>(response, responseCompiler);
    } catch (e, s) {
      printError(e, s);
      return Left(
        ErrorResponse.byErrorType(errorType: ApiResponseErrorType.response),
      );
    }
  }

  //print error if there is any
  void printError(Object e, [StackTrace? s]) {
    common.logInfo("======Data Format Error====");
    common.logError(e);
    if (s != null) common.logError(s);
    common.logInfo("======End====");
  }

  Either<ErrorResponse, T> _compileResponse<T extends BaseResponseModel>(
      response, Function(Map<String, dynamic> json) responseCompiler) {
    if (response is ErrorResponse) {
      return Left(response);
    } else if (response is Map<String, dynamic>) {
      return Right(responseCompiler(response));
    } else if (response != null) {
      if (response is String && common.Utility.isJson(response)) {
        return Right(responseCompiler(jsonDecode(response)));
      } else {
        final baseWrapperModel = BaseWrapperModel(response);
        return Right(responseCompiler(baseWrapperModel.data));
      }
    } else {
      return Left(
        ErrorResponse.byErrorType(
          errorType: ApiResponseErrorType.noInternet,
        ),
      );
    }
  }

  /// Cancel an API request by requestId
  void cancelRequest(String requestId) {
    final cancelToken = activeRequests[requestId];
    if (cancelToken != null && !cancelToken.isCancelled) {
      cancelToken.cancel();
      activeRequests.remove(requestId);
    }
  }
}
