import 'package:flutter/foundation.dart';
import 'package:network/app/routes/app_pages.dart';
import 'package:network/src/api/models/api_log.dart';

class CurlController extends ChangeNotifier {
  CurlController._();

  static final CurlController instance = CurlController._();

  String currentRoute = '';

  bool get showCurlWidget => (!currentRoute.contains(NetworkRoutes.CURL) &&
      !currentRoute.contains(NetworkRoutes.CURL_DETAILS));

  final List<ApiLog> _logs = [];

  List<ApiLog> get logs => List.unmodifiable(_logs);

  void addLog(ApiLog log) {
    _logs.insert(0, log);
    notifyListeners();
  }

  void updateLog(String id, ApiLog updated) {
    final index = _logs.indexWhere((log) => log.id == id);
    if (index != -1) {
      _logs[index] = updated;
      notifyListeners();
    }
  }

  void clearLogs() {
    _logs.clear();
    notifyListeners();
  }
}
