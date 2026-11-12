import 'dart:convert';

import 'package:common/common.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

/// Secure key-value storage backed by [FlutterSecureStorage] with an in-memory
/// read-through cache so synchronous [BaseStorageService.read] stays fast and
/// deterministic for auth interceptors.
class SecureStorageService extends BaseStorageService {
  static const String accessTokenKey = 'porhi_access_token';
  static const String refreshTokenKey = 'porhi_refresh_token';
  static const String cachedUserKey = 'porhi_cached_user';

  static const List<String> _managedKeys = <String>[
    accessTokenKey,
    refreshTokenKey,
    cachedUserKey,
  ];

  final FlutterSecureStorage _secureStorage;
  final Map<String, String> _cache = <String, String>{};

  SecureStorageService({FlutterSecureStorage? secureStorage})
      : _secureStorage = secureStorage ?? const FlutterSecureStorage();

  /// Loads managed session keys from platform secure storage into memory.
  Future<void> init() async {
    for (final key in _managedKeys) {
      final value = await _secureStorage.read(key: key);
      if (value != null) {
        _cache[key] = value;
      } else {
        _cache.remove(key);
      }
    }
  }

  @override
  String? read(String key) => _cache[key];

  /// Reads [key] from the in-memory cache or falls back to platform storage.
  Future<String?> readSecure(String key) async {
    if (_cache.containsKey(key)) {
      return _cache[key];
    }
    final value = await _secureStorage.read(key: key);
    if (value != null) {
      _cache[key] = value;
    }
    return value;
  }

  @override
  Future<String> write(String key, String value) async {
    _cache[key] = value;
    await _secureStorage.write(key: key, value: value);
    return value;
  }

  @override
  Future<bool> remove(String key) async {
    final existed = _cache.remove(key) != null;
    await _secureStorage.delete(key: key);
    return existed;
  }

  String? get accessToken => read(accessTokenKey);

  String? get refreshToken => read(refreshTokenKey);

  Future<void> saveTokens({
    required String accessToken,
    String? refreshToken,
  }) async {
    await write(accessTokenKey, accessToken);
    if (refreshToken != null && refreshToken.isNotEmpty) {
      await write(refreshTokenKey, refreshToken);
    }
  }

  Future<void> clearTokens() async {
    await remove(accessTokenKey);
    await remove(refreshTokenKey);
  }

  Future<void> saveUserJson(String userJson) async {
    await write(cachedUserKey, userJson);
  }

  Future<void> saveUserMap(Map<String, dynamic> user) async {
    await write(cachedUserKey, jsonEncode(user));
  }

  String? getCachedUserJson() => read(cachedUserKey);

  Map<String, dynamic>? getCachedUserMap() {
    final raw = read(cachedUserKey);
    if (raw == null || raw.trim().isEmpty) return null;
    try {
      final decoded = jsonDecode(raw);
      if (decoded is Map<String, dynamic>) {
        return decoded;
      }
      if (decoded is Map) {
        return Map<String, dynamic>.from(decoded);
      }
    } catch (_) {
      return null;
    }
    return null;
  }

  Future<void> clearUserCache() async {
    await remove(cachedUserKey);
  }

  Future<void> clearSession() async {
    await clearTokens();
    await clearUserCache();
  }
}
