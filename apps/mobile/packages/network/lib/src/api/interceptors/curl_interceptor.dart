import 'dart:convert';
import 'dart:io';
import 'package:common/common.dart';
import 'package:dio/dio.dart'
    show
        FormData,
        Interceptor,
        RequestInterceptorHandler,
        RequestOptions,
        Response,
        ResponseInterceptorHandler,
        DioException,
        ErrorInterceptorHandler;
import 'package:network/app/modules/curl/controllers/curl_controller.dart';
import 'package:network/src/api/models/api_log.dart';
import 'package:uuid/uuid.dart';

class CurlGeneratorInterceptor extends Interceptor {
  final bool includeHeaders;
  final int maxBodyLength;
  final List<String> maskedHeaders;

  CurlGeneratorInterceptor({
    this.includeHeaders = true,
    this.maxBodyLength = 10000,
    this.maskedHeaders = const [],
  });

  final curlController = CurlController.instance;

  @override
  void onRequest(
    RequestOptions options,
    RequestInterceptorHandler handler,
  ) async {
    final curl = await _generateCurl(options);
    final id = const Uuid().v4();
    final log = ApiLog(
      id: id,
      method: options.method,
      url: options.uri.toString(),
      requestData: options.data,
      requestHeaders: Map<String, dynamic>.from(options.headers),
      startTime: DateTime.now(),
      curl: curl,
    );

    curlController.addLog(log);

    // Store ID in extra for tracking
    options.extra['logId'] = id;
    super.onRequest(options, handler);
  }

  @override
  void onResponse(Response response, ResponseInterceptorHandler handler) async {
    try {
      final curl = await _generateCurl(response.requestOptions);

      final id = response.requestOptions.extra['logId'];
      final index = curlController.logs.indexWhere((log) => log.id == id);
      if (index != -1) {
        final log = curlController.logs[index];
        curlController.updateLog(
          id,
          ApiLog(
            id: log.id,
            method: log.method,
            url: log.url,
            requestData: log.requestData,
            requestHeaders: log.requestHeaders,
            startTime: log.startTime,
            endTime: DateTime.now(),
            statusCode: response.statusCode,
            responseData: response.data,
            responseHeaders: Map<String, dynamic>.from(response.headers.map),
            isLoading: false,
            curl: curl,
          ),
        );
      }
    } catch (e, st) {
      // don't block request on logging error
      logError('Failed to generate curl: $e\n$st');
    }
    super.onResponse(response, handler);
  }

  @override
  void onError(DioException err, ErrorInterceptorHandler handler) async {
    try {
      final curl = await _generateCurl(err.requestOptions);
      final id = err.requestOptions.extra['logId'];
      final index = curlController.logs.indexWhere((log) => log.id == id);
      if (index != -1) {
        final log = curlController.logs[index];
        curlController.updateLog(
          id,
          ApiLog(
            id: log.id,
            method: log.method,
            url: log.url,
            requestData: log.requestData,
            requestHeaders: log.requestHeaders,
            startTime: log.startTime,
            endTime: DateTime.now(),
            statusCode: err.response?.statusCode,
            responseData: err.response?.data ?? err.message,
            responseHeaders: err.response?.headers.map,
            isLoading: false,
            curl: curl,
          ),
        );
      }
    } catch (e, st) {
      // don't block request on logging error
      logError('Failed to generate curl: $e\n$st');
    }
    super.onError(err, handler);
  }

  Future<String> _generateCurl(RequestOptions options) async {
    final buffer = StringBuffer();

    buffer.write('curl');

    // method (only write if not GET)
    final method = (options.method).toUpperCase();
    if (method != 'GET') {
      buffer.write(' -X $method');
    }

    // headers
    if (includeHeaders && options.headers.isNotEmpty) {
      options.headers.forEach((k, v) {
        final key = k.toString();
        final val = _headerValueToString(v);
        final displayVal = maskedHeaders
                .map((h) => h.toLowerCase())
                .contains(key.toLowerCase())
            ? '*****'
            : val;
        buffer.write(' -H ${_escapeShell("$key: $displayVal")}');
      });
    }

    // handle body
    final data = options.data;
    if (data != null) {
      // FormData (multipart / form fields)
      if (data is FormData) {
        // For multipart, use --form for each entry
        for (final entry in data.fields) {
          final name = entry.key;
          final value = entry.value;
          buffer.write(' --form ${_escapeShell("$name=$value")}');
        }
        // Files in FormData: represent as @/path or <binary>
        for (final file in data.files) {
          final name = file.key;
          final fileValue = file.value;
          final filename = fileValue.filename ?? 'file';
          // If we can locate a path (File), include @path, else mark as filename
          final pathOrPlaceholder =
              (fileValue is File) ? (fileValue as File).path : '<$filename>';
          buffer.write(' --form ${_escapeShell("$name=@$pathOrPlaceholder")}');
        }
      } else if (data is Map || data is List) {
        // JSON-like -- send as JSON
        final jsonString = jsonEncode(data);
        final short = _shorten(jsonString);
        buffer.write(' -d ${_escapeShell(short)}');
        // Add header if not present
        if (!options.headers.keys
            .map((k) => k.toLowerCase())
            .contains('content-type')) {
          buffer.write(' -H "Content-Type: application/json"');
        }
      } else if (data is String) {
        // Plain string body
        final short = _shorten(data);
        buffer.write(' -d ${_escapeShell(short)}');
      } else if (data is List<int>) {
        // raw bytes
        buffer.write(
          ' --data-binary ${_escapeShell('<binary data: ${data.length} bytes>')}',
        );
      } else {
        // Fallback: attempt to toString() safely
        final txt = _shorten(data.toString());
        buffer.write(' -d ${_escapeShell(txt)}');
      }
    }

    // URL with query params (Dio stores them in options.queryParameters)
    String url = options.uri.toString();
    // If queryParameters not encoded in uri, append them
    if ((options.queryParameters).isNotEmpty) {
      final qp = Uri(
        queryParameters: options.queryParameters.map(
          (k, v) => MapEntry(k.toString(), v.toString()),
        ),
      );
      final query = qp.query;
      url = url.split('?').first + (query.isNotEmpty ? '?$query' : '');
    }

    buffer.write(' ${_escapeShell(url)}');

    return buffer.toString();
  }

  String _headerValueToString(dynamic v) {
    if (v == null) return '';
    if (v is List) return v.join(', ');
    return v.toString();
  }

  String _escapeShell(String s) {
    // Uses single quotes around string and escapes any existing single quotes
    // e.g. abc'd -> 'abc'\''d'
    if (s.isEmpty) return "''";
    final escaped = s.replaceAll("'", r"'\''");
    return "'$escaped'";
  }

  String _shorten(String s) {
    if (s.length <= maxBodyLength) return s;
    return '${s.substring(0, maxBodyLength)}...<truncated>';
  }
}
