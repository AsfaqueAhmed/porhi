import 'package:dio/dio.dart';
import 'package:network/src/api/models/error_response_model.dart';

///Interceptor to convent incoming error responses in valid dta abd response
class ErrorInterceptor extends Interceptor {
  @override
  void onError(DioException err, ErrorInterceptorHandler handler) async {
    ApiResponseErrorType errorType;
    String? cancelReason;

    //Handle the errors
    switch (err.type) {
      case DioExceptionType.connectionTimeout:
        errorType = ApiResponseErrorType.slowOrNoInternet;
        break;
      case DioExceptionType.sendTimeout:
      case DioExceptionType.receiveTimeout:
        errorType = ApiResponseErrorType.slowOrNoInternet;
        break;
      case DioExceptionType.connectionError:
      case DioExceptionType.unknown:
        errorType = ApiResponseErrorType.noInternet;
        break;
      case DioExceptionType.badCertificate:
      case DioExceptionType.badResponse:
        final statusCode = err.response?.statusCode ?? 0;
        if (statusCode >= 500) {
          errorType = ApiResponseErrorType.serverError;
        } else if (statusCode >= 400) {
          errorType = ApiResponseErrorType.response;
        } else if (statusCode == 0) {
          // No status code means response was null
          errorType = ApiResponseErrorType.noInternet;
        } else {
          errorType = ApiResponseErrorType.response;
        }
        break;
      case DioExceptionType.cancel:
        errorType = ApiResponseErrorType.serverError;
        cancelReason = err.message ?? 'Request cancelled';
        break;
      // ignore: unreachable_switch_default
      default:
        // Newer dio versions add DioExceptionType members over time (e.g.
        // transformTimeout); fall back to a generic response error rather
        // than making this switch's compilability depend on the exact dio
        // version resolved by each consuming app.
        errorType = ApiResponseErrorType.response;
        break;
    }

    final rawData = err.response?.data;
    final statusCode = err.response?.statusCode;
    final backendMessage = ErrorResponse.extractMessage(rawData);
    final fallback = ErrorResponse.byErrorType(errorType: errorType);

    final errorResponse = ErrorResponse(
      message: backendMessage ?? fallback.message,
      data: errorType,
      responseData: rawData,
      cancelReason: cancelReason,
      statusCode: (statusCode != null && statusCode > 0) ? statusCode : null,
    );

    handler.resolve(
      Response(
        statusCode: 200,
        requestOptions: err.requestOptions,
        data: errorResponse,
      ),
    );
  }
}
