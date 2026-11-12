import 'package:dio/dio.dart';
import 'package:network/app/modules/curl/controllers/curl_controller.dart';
import 'package:network/src/api/api_client_impl.dart';
import 'package:network/src/api/api_client.dart';
import 'package:network/src/services/network_service.dart';

enum NetworkInterceptors { cache, log, error }

class NetworkInitializer {
  static NetworkInitializer? _instance;
  final List<Interceptor> _interceptors;
  late ApiClient apiClient;
  late NetworkService _networkService;

  final Map<String, CancelToken> activeRequests = {};

  NetworkService get networkService => _networkService;

  static NetworkInitializer get instance {
    if (_instance == null) {
      throw Exception("Network package not initialized.");
    }
    return _instance!;
  }

  NetworkInitializer._(
    this._interceptors,
    bool hasBadCertificateIssue, {
    Duration? connectTimeout,
    Duration? receiveTimeout,
  }) {
    apiClient = ApiClientImpl(
      hasBadCertificateIssue: hasBadCertificateIssue,
      connectTimeout: connectTimeout ?? const Duration(seconds: 30),
      receiveTimeout: receiveTimeout ?? const Duration(seconds: 30),
    );

    for (final interceptor in _interceptors) {
      apiClient.addInterceptor(interceptor);
    }
    _networkService = NetworkService();
  }

  static initialize({
    required List<Interceptor> interceptors,
    bool hasBadCertificateIssue = false,
    Duration? connectTimeout,
    Duration? receiveTimeout,
  }) {
    _instance ??= NetworkInitializer._(
      interceptors,
      hasBadCertificateIssue,
      connectTimeout: connectTimeout,
      receiveTimeout: receiveTimeout,
    );
  }

  static setCurrentRoute(String route) {
    CurlController.instance.currentRoute = route;
  }

  static ApiClient get getApiClient => _instance!.apiClient;

  Future<bool> get hasNetwork => _networkService.hasNetwork();
}
