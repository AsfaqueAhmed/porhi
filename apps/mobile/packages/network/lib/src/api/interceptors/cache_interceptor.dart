import 'package:dio/dio.dart';
import 'package:network/src/services/storage_service.dart';

class _CacheEntry {
  final dynamic data;
  final DateTime createdAt;

  _CacheEntry(this.data, this.createdAt);

  bool isExpired(Duration ttl) {
    return DateTime.now().difference(createdAt) > ttl;
  }
}

///Interceptor to cache incoming responses in key-value pair
///and return it if needed
class CacheInterceptor extends Interceptor {
  //variable to store cached responses against their path
  final Map<String, _CacheEntry> _cached = {};
  static const Duration defaultCacheTTL = Duration(minutes: 5);

  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) {
    //check if caching is enabled for this path and if there is a cache
    bool useCache = options.extra['useCache'] == true &&
        _cached[options.uri.toString()] != null;

    if (useCache) {
      final entry = _cached[options.uri.toString()]!;
      final ttl = options.extra['cacheTTL'] as Duration? ?? defaultCacheTTL;

      if (entry.isExpired(ttl)) {
        // Cache expired, continue with request
        handler.next(options);
      } else {
        //resolve the request if cache is enabled and has a valid cached response
        handler.resolve(Response(
          requestOptions: options,
          data: entry.data,
          statusCode: 200,
        ));
      }
    } else {
      //Otherwise transfer the request to next step
      handler.next(options);
    }
  }

  @override
  void onResponse(Response response, ResponseInterceptorHandler handler) {
    //check if caching is enabled for this path , response is a valid one and it's a get request
    bool useCache = response.requestOptions.extra['useCache'] == true &&
        response.statusCode == 200;

    if (useCache) {
      //if caching needed add it to _cache variable to use next time
      _cached[response.requestOptions.uri.toString()] =
          _CacheEntry(response.data, DateTime.now());
    }

    //check if local permanent caching is enabled for this path , response is a valid one and it's a get request
    bool useStoredCache =
        response.requestOptions.extra['useStoredCache'] == true &&
            response.statusCode == 200;

    if (useStoredCache) {
      //if caching needed add store it in db
      StorageService()
          .saveResponse(response.data, response.requestOptions.uri.toString());
    }

    //continue the process
    super.onResponse(response, handler);
  }
}
