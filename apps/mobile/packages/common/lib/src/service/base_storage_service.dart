abstract class BaseStorageService {
  static final Map<String, String> _storage = {};

  static Future<void> init(String? bucket) async {
    _storage.clear();
  }

  Future<String> write(
    String key,
    String value,
  ) async {
    _storage[key] = value;
    return value;
  }

  String? read(String key) {
    return _storage[key];
  }

  Future<bool> remove(String key) async {
    return _storage.remove(key) != null;
  }
}
