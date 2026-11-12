import 'package:network/src/api/models/base_response.dart';

enum ApiResponseErrorType {
  response,
  noInternet,
  slowOrNoInternet,
  serverError,
}

class ErrorResponse extends BaseResponseModel<ApiResponseErrorType> {
  dynamic responseData;
  String? cancelReason;

  ErrorResponse({
    required super.message,
    required super.data,
    this.responseData,
    this.cancelReason,
  });

  factory ErrorResponse.byErrorType({required ApiResponseErrorType errorType}) {
    String message;
    switch (errorType) {
      case ApiResponseErrorType.response:
        message = "Invalid response from server";
        break;
      case ApiResponseErrorType.serverError:
        message = "Couldn't process the request";
        break;
      case ApiResponseErrorType.slowOrNoInternet:
        message = "Please check your internet connection";
        break;
      case ApiResponseErrorType.noInternet:
        message = "Please connect to internet";
        break;
    }
    return ErrorResponse(
      message: message,
      data: errorType,
    );
  }

  factory ErrorResponse.fromApiResponse(Map<String, dynamic> json) {
    return ErrorResponse(
      message: json["message"],
      data: ApiResponseErrorType.response,
      responseData: json,
    );
  }
}
