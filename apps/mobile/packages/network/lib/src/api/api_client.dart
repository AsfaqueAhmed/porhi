import 'dart:io';

import 'package:dio/dio.dart';

enum RequestType { raw, formData, text }

abstract class ApiClient {
  ///add new [interceptor] to the client
  void addInterceptor<T extends Interceptor>(T interceptor);

  ///remove [interceptor] from the client
  void removeInterceptor<T extends Interceptor>(T interceptor);

  /// call [get] method to make GET request on the server
  ///
  /// - [path] : path of the api end point
  /// - [queryParameters] : query Parameters that are used in making api calls
  /// - [options] : options for making the api requests
  /// - [onReceiveProgress] : function to track receive progress. This function receive two parameter [count] and [total] byte
  Future<dynamic> get({
    required String path,
    Map<String, dynamic>? queryParameters,
    Map<String, dynamic>? data,
    Options? options,
    Function(int count, int total)? onReceiveProgress,
    CancelToken? cancelToken,
  });

  /// call [post] method to make POST request on the server
  ///
  /// - [path] : path of the api end point
  /// - [data] : Map data to post to path
  /// - [queryParameters] : query Parameters that are used in making api calls
  /// - [options] : options for making the api requests
  /// - [onReceiveProgress] : function to track receive progress. This function receive two parameter [count] and [total] byte
  /// - [onSendProgress] : function to track send progress. This function receive two parameter [count] and [total] byte
  Future<dynamic> post({
    required String path,
    required Object? data,
    RequestType requestType,
    Map<String, dynamic>? queryParameters,
    Options? options,
    Function(int count, int total)? onReceiveProgress,
    Function(int count, int total)? onSendProgress,
    Map<String, String>? headers,
    CancelToken? cancelToken,
  });

  /// call [streamedPost] method to make POST request on the server
  ///
  /// - [path] : path of the api end point
  /// - [data] : Map data to post to path
  /// - [queryParameters] : query Parameters that are used in making api calls
  /// - [options] : options for making the api requests
  /// - [onReceiveProgress] : function to track receive progress. This function receive two parameter [count] and [total] byte
  /// - [onSendProgress] : function to track send progress. This function receive two parameter [count] and [total] byte
  Future<Stream<String>?> streamedPost({
    required String path,
    required Object? data,
    Map<String, dynamic>? queryParameters,
    Function(int count, int total)? onReceiveProgress,
    Function(int count, int total)? onSendProgress,
    Map<String, String>? headers,
    CancelToken? cancelToken,
  });

  /// call [put] method to make PUT request on the server
  ///
  /// - [path] : path of the api end point
  /// - [data] : Map data to post to path
  /// - [queryParameters] : query Parameters that are used in making api calls
  /// - [options] : options for making the api requests
  /// - [onReceiveProgress] : function to track receive progress. This function receive two parameter [count] and [total] byte
  /// - [onSendProgress] : function to track send progress. This function receive two parameter [count] and [total] byte
  /// -
  Future<dynamic> put({
    required String path,
    dynamic data,
    RequestType requestType,
    Map<String, dynamic>? queryParameters,
    Options? options,
    Function(int count, int total)? onReceiveProgress,
    Function(int count, int total)? onSendProgress,
    Map<String, String>? headers,
    CancelToken? cancelToken,
  });

  /// call [patch] method to make PATCH request on the server
  ///
  /// - [path] : path of the api end point
  /// - [data] : Map data to post to path
  /// - [queryParameters] : query Parameters that are used in making api calls
  /// - [options] : options for making the api requests
  /// - [onReceiveProgress] : function to track receive progress. This function receive two parameter [count] and [total] byte
  /// - [onSendProgress] : function to track send progress. This function receive two parameter [count] and [total] byte
  Future<dynamic> patch({
    required String path,
    required Object? data,
    RequestType requestType,
    Map<String, dynamic>? queryParameters,
    Options? options,
    Function(int count, int total)? onReceiveProgress,
    Function(int count, int total)? onSendProgress,
    Map<String, String>? headers,
    CancelToken? cancelToken,
  });

  /// call [delete] method to make DELETE request on the server
  ///
  /// - [path] : path of the api end point
  /// - [queryParameters] : query Parameters that are used in making api calls
  /// - [options] : options for making the api requests
  Future<dynamic> delete({
    required String path,
    Map<String, dynamic>? queryParameters,
    Map<String, dynamic>? data,
    Options? options,
    CancelToken? cancelToken,
  });

  /// call [upload] method to make POST request on the server
  ///
  /// - [path] : path of the api end point
  /// - [queryParameters] : query Parameters that are used in making api calls
  /// - [options] : options for making the api requests
  /// - [onReceiveProgress] : function to track receive progress. This function receive two parameter [count] and [total] byte
  /// - [onSendProgress] : function to track send progress. This function receive two parameter [count] and [total] byte
  Future<dynamic> upload({
    required String path,
    required File file,
    required String fileKey,
    Map<String, dynamic>? queryParameters,
    Options? options,
    Function(int count, int total)? onReceiveProgress,
    Function(int count, int total)? onSendProgress,
    CancelToken? cancelToken,
  });

  Future<dynamic> fetch({
    required RequestOptions requestOptions,
  });
}
