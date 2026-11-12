import 'dart:async';
import 'dart:io';
import 'package:connectivity_plus/connectivity_plus.dart';

class NetworkService {
  late final StreamSubscription<List<ConnectivityResult>> _subscription;
  final StreamController<bool> isConnected = StreamController<bool>();
  bool hasInternet = true;

  NetworkService() {
    _subscription =
        Connectivity().onConnectivityChanged.listen(_updateConnectionStatus);
  }

  void dispose() {
    _subscription.cancel();
  }

  Future<void> _updateConnectionStatus(List<ConnectivityResult> results) async {
    hasInternet = results.contains(ConnectivityResult.mobile) ||
        results.contains(ConnectivityResult.wifi) ||
        results.contains(ConnectivityResult.ethernet);
    isConnected.add(hasInternet);
  }

  Future<bool> hasNetwork() async {
    try {
      final result = await InternetAddress.lookup('example.com');
      return result.isNotEmpty && result[0].rawAddress.isNotEmpty;
    } on SocketException catch (_) {
      return false;
    }
  }
}
