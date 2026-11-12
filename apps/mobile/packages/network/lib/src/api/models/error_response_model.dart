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
  int? statusCode;
  String? code;

  ErrorResponse({
    required super.message,
    required super.data,
    this.responseData,
    this.cancelReason,
    this.statusCode,
    this.code,
  });

  factory ErrorResponse.byErrorType({
    required ApiResponseErrorType errorType,
    int? statusCode,
    String? code,
  }) {
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
      statusCode: statusCode,
      code: code,
    );
  }

  factory ErrorResponse.fromApiResponse(
    Map<String, dynamic> json, {
    int? statusCode,
  }) {
    return ErrorResponse(
      message: extractMessage(json),
      data: ApiResponseErrorType.response,
      responseData: json,
      statusCode: statusCode,
    );
  }

  static String? extractMessage(dynamic payload) {
    if (payload is! Map) return null;
    final raw = payload['message'];
    if (raw is String) {
      final trimmed = raw.trim();
      return trimmed.isEmpty ? null : trimmed;
    }
    if (raw is List) {
      final parts = raw
          .map((e) => e?.toString().trim() ?? '')
          .where((s) => s.isNotEmpty)
          .toList();
      return parts.isEmpty ? null : parts.join(', ');
    }
    return null;
  }
}
