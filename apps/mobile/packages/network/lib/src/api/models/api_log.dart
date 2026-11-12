class ApiLog {
  final String id;
  final String method;
  final String url;
  final dynamic requestData;
  final Map<String, dynamic> requestHeaders;
  final DateTime startTime;
  DateTime? endTime;
  final int? statusCode;
  final dynamic responseData;
  final Map<String, dynamic>? responseHeaders;
  bool isLoading;
  final String curl;

  ApiLog({
    required this.id,
    required this.method,
    required this.url,
    this.requestData,
    required this.requestHeaders,
    required this.startTime,
    this.endTime,
    this.statusCode,
    this.responseData,
    this.responseHeaders,
    this.isLoading = true,
    required this.curl,
  });
}
