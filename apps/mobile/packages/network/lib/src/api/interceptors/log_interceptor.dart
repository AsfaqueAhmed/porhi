import 'package:dio/dio.dart';
import 'package:common/common.dart';

///Interceptor to log api request, response and error
class LogInterceptor extends Interceptor {
  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) {
    //log outgoing requests
    logInfo("=======Request=========");
    //log method and end point
    logInfo("${options.method}=>${options.uri}");
    //log header
    logInfo("Header=>${options.headers}");
    //log request data is available
    if (options.data != null) logInfo(options.data);
    logInfo("=======End=========");
    super.onRequest(options, handler);
  }

  @override
  void onResponse(Response response, ResponseInterceptorHandler handler) {
    //log incoming response
    logInfo("=======Response=========");
    //log method and end point
    logInfo(
        "${response.requestOptions.method}=>${response.requestOptions.uri}");
    //log response data is available
    if (response.data != null) logInfo(response.data);
    logInfo("=======End=========");
    super.onResponse(response, handler);
  }

  @override
  void onError(DioException err, ErrorInterceptorHandler handler) {
    logError("=======Error=========");
    //log method and end point
    logError("${err.requestOptions.method}=>${err.requestOptions.uri}");
    //log stacktrace
    logError(err.message);
    logError(err.stackTrace);
    logError(err.requestOptions.headers);
    //log error response data is available
    if (err.response?.data != null) logError(err.response?.data);
    logError("=======End=========");
    super.onError(err, handler);
  }
}
