import 'package:common/common.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// Persistent app-preference storage backed by [SharedPreferences] implementing
/// the [BaseStorageService] contract.
class PreferencesStorageService extends BaseStorageService {
  static const String languageKey = 'porhi_language';
  static const String lastSyncAtKey = 'porhi_last_sync_at';
  static const String activeSubjectIdKey = 'porhi_active_subject_id';
  static const String studyRemindersEnabledKey =
      'porhi_study_reminders_enabled';

  SharedPreferences? _prefs;
  Future<SharedPreferences>? _prefsFuture;
  final Map<String, String> _memoryFallback = <String, String>{};

  PreferencesStorageService({this._prefs});

  Future<SharedPreferences> _ensurePrefs() {
    final existing = _prefs;
    if (existing != null) {
      return Future<SharedPreferences>.value(existing);
    }
    final future = _prefsFuture ??= SharedPreferences.getInstance().then((
      instance,
    ) {
      _prefs = instance;
      return instance;
    });
    return future.catchError((Object error) {
      if (identical(_prefsFuture, future)) {
        _prefsFuture = null;
      }
      throw error;
    });
  }

  Future<void> init() async {
    await _ensurePrefs();
  }

  @override
  String? read(String key) {
    final prefs = _prefs;
    if (prefs != null && prefs.containsKey(key)) {
      final raw = prefs.get(key);
      if (raw == null) return _memoryFallback[key];
      if (raw is String) return raw;
      if (raw is bool || raw is int || raw is double) return raw.toString();
      if (raw is List<String>) return raw.join(',');
      return raw.toString();
    }
    return _memoryFallback[key];
  }

  @override
  Future<String> write(String key, String value) async {
    final prefs = await _ensurePrefs();
    final ok = await prefs.setString(key, value);
    if (ok) {
      _memoryFallback[key] = value;
    }
    return value;
  }

  @override
  Future<bool> remove(String key) async {
    final prefs = await _ensurePrefs();
    final existedInPrefs = prefs.containsKey(key);
    final removed = await prefs.remove(key);
    final hadInMemory = _memoryFallback.remove(key) != null;
    return (removed && existedInPrefs) || hadInMemory;
  }

  String getLanguage({String fallback = 'bn'}) {
    final code = read(languageKey);
    if (code == null || code.trim().isEmpty) return fallback;
    return code.trim();
  }

  Future<void> setLanguage(String languageCode) async {
    await write(languageKey, languageCode.trim());
  }

  DateTime? getLastSyncAt() {
    final raw = read(lastSyncAtKey);
    if (raw == null || raw.isEmpty) return null;
    return DateTime.tryParse(raw);
  }

  Future<void> setLastSyncAt(DateTime timestamp) async {
    await write(lastSyncAtKey, timestamp.toUtc().toIso8601String());
  }

  bool getBool(String key, {bool defaultValue = false}) {
    final prefs = _prefs;
    if (prefs != null && prefs.containsKey(key)) {
      final raw = prefs.get(key);
      if (raw is bool) return raw;
      if (raw is int) return raw != 0;
      if (raw is String) {
        final normalized = raw.trim().toLowerCase();
        if (normalized == 'true' || normalized == '1') return true;
        if (normalized == 'false' || normalized == '0') return false;
      }
    }
    final fallback = _memoryFallback[key]?.trim().toLowerCase();
    if (fallback == 'true' || fallback == '1') return true;
    if (fallback == 'false' || fallback == '0') return false;
    return defaultValue;
  }

  Future<bool> setBool(String key, bool value) async {
    final prefs = await _ensurePrefs();
    final ok = await prefs.setBool(key, value);
    if (ok) {
      _memoryFallback[key] = value.toString();
    }
    return ok;
  }

  int? getInt(String key) {
    final prefs = _prefs;
    if (prefs != null && prefs.containsKey(key)) {
      final raw = prefs.get(key);
      if (raw is int) return raw;
      if (raw is double) return raw.toInt();
      if (raw is bool) return raw ? 1 : 0;
      if (raw is String) return int.tryParse(raw.trim());
    }
    final fallback = _memoryFallback[key];
    return fallback == null ? null : int.tryParse(fallback.trim());
  }

  Future<bool> setInt(String key, int value) async {
    final prefs = await _ensurePrefs();
    final ok = await prefs.setInt(key, value);
    if (ok) {
      _memoryFallback[key] = value.toString();
    }
    return ok;
  }

  Future<bool> clear() async {
    final prefs = await _ensurePrefs();
    final ok = await prefs.clear();
    if (ok) {
      _memoryFallback.clear();
    }
    return ok;
  }
}
