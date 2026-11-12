import 'package:common/common.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// Persistent app-preference storage backed by [SharedPreferences] implementing
/// the [BaseStorageService] contract.
class PreferencesStorageService extends BaseStorageService {
  static const String languageKey = 'porhi_language';
  static const String lastSyncAtKey = 'porhi_last_sync_at';
  static const String activeSubjectIdKey = 'porhi_active_subject_id';

  SharedPreferences? _prefs;
  final Map<String, String> _memoryFallback = <String, String>{};

  PreferencesStorageService({this._prefs});

  Future<SharedPreferences> _ensurePrefs() async {
    return _prefs ??= await SharedPreferences.getInstance();
  }

  Future<void> init() async {
    await _ensurePrefs();
  }

  @override
  String? read(String key) {
    final prefs = _prefs;
    if (prefs != null) {
      return prefs.getString(key) ?? _memoryFallback[key];
    }
    return _memoryFallback[key];
  }

  @override
  Future<String> write(String key, String value) async {
    _memoryFallback[key] = value;
    final prefs = await _ensurePrefs();
    await prefs.setString(key, value);
    return value;
  }

  @override
  Future<bool> remove(String key) async {
    final hadInMemory = _memoryFallback.remove(key) != null;
    final prefs = await _ensurePrefs();
    final existedInPrefs = prefs.containsKey(key);
    final removed = await prefs.remove(key);
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
      return prefs.getBool(key) ?? defaultValue;
    }
    final raw = _memoryFallback[key];
    if (raw == 'true') return true;
    if (raw == 'false') return false;
    return defaultValue;
  }

  Future<bool> setBool(String key, bool value) async {
    _memoryFallback[key] = value.toString();
    final prefs = await _ensurePrefs();
    return prefs.setBool(key, value);
  }

  int? getInt(String key) {
    final prefs = _prefs;
    if (prefs != null && prefs.containsKey(key)) {
      return prefs.getInt(key);
    }
    final raw = _memoryFallback[key];
    return raw == null ? null : int.tryParse(raw);
  }

  Future<bool> setInt(String key, int value) async {
    _memoryFallback[key] = value.toString();
    final prefs = await _ensurePrefs();
    return prefs.setInt(key, value);
  }

  Future<bool> clear() async {
    _memoryFallback.clear();
    final prefs = await _ensurePrefs();
    return prefs.clear();
  }
}
