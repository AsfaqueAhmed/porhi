import 'dart:async';
import 'dart:convert';

import 'package:common/common.dart';
import 'package:flutter/services.dart';
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
  final Map<String, Future<void>> _pendingByKey = <String, Future<void>>{};
  final Map<String, int> _keyVersions = <String, int>{};

  SecureStorageService({FlutterSecureStorage? secureStorage})
      : _secureStorage = secureStorage ?? const FlutterSecureStorage();

  Future<T> _runSerialized<T>(String key, Future<T> Function() action) {
    final previous = _pendingByKey[key] ?? Future<void>.value();
    final completer = Completer<void>();
    _pendingByKey[key] = completer.future;

    return previous.then((_) => action()).whenComplete(() {
      if (identical(_pendingByKey[key], completer.future)) {
        _pendingByKey.remove(key);
      }
      completer.complete();
    });
  }

  /// Loads managed session keys from platform secure storage into memory.
  ///
  /// Recovers gracefully from [PlatformException] (e.g. Android Keystore
  /// `BAD_DECRYPT`) by clearing unreadable entries without clobbering any
  /// concurrent writes made after [init] began.
  Future<void> init() async {
    for (final key in _managedKeys) {
      if ((_keyVersions[key] ?? 0) != 0) {
        continue;
      }
      await _runSerialized<void>(key, () async {
        final startVersion = _keyVersions[key] ?? 0;
        if (startVersion != 0) {
          return;
        }
        String? value;
        var corrupted = false;
        try {
          value = await _secureStorage.read(key: key);
        } on PlatformException {
          corrupted = true;
          try {
            await _secureStorage.delete(key: key);
          } on PlatformException {
            // Ignore secondary keystore failure during cleanup.
          }
        }

        // Do not overwrite cache if a concurrent write/remove updated this key.
        if ((_keyVersions[key] ?? 0) != startVersion) {
          return;
        }
        if (corrupted || value == null) {
          _cache.remove(key);
        } else {
          _cache[key] = value;
        }
      });
    }
  }

  @override
  String? read(String key) => _cache[key];

  /// Reads [key] from the in-memory cache or falls back to platform storage.
  Future<String?> readSecure(String key) {
    if (_cache.containsKey(key)) {
      return Future<String?>.value(_cache[key]);
    }
    return _runSerialized<String?>(key, () async {
      if (_cache.containsKey(key)) {
        return _cache[key];
      }
      final startVersion = _keyVersions[key] ?? 0;
      String? value;
      try {
        value = await _secureStorage.read(key: key);
      } on PlatformException {
        try {
          await _secureStorage.delete(key: key);
        } on PlatformException {
          // Ignore secondary keystore failure during cleanup.
        }
        if ((_keyVersions[key] ?? 0) == startVersion) {
          _cache.remove(key);
        }
        return null;
      }
      if ((_keyVersions[key] ?? 0) == startVersion) {
        if (value != null) {
          _cache[key] = value;
        } else {
          _cache.remove(key);
        }
      }
      return value;
    });
  }

  @override
  Future<String> write(String key, String value) {
    _keyVersions[key] = (_keyVersions[key] ?? 0) + 1;
    return _runSerialized<String>(key, () async {
      await _secureStorage.write(key: key, value: value);
      _cache[key] = value;
      return value;
    });
  }

  @override
  Future<bool> remove(String key) {
    _keyVersions[key] = (_keyVersions[key] ?? 0) + 1;
    return _runSerialized<bool>(key, () async {
      var existed = _cache.containsKey(key);
      if (!existed) {
        try {
          existed = (await _secureStorage.read(key: key)) != null;
        } on PlatformException {
          existed = false;
        }
      }
      await _secureStorage.delete(key: key);
      _cache.remove(key);
      return existed;
    });
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
