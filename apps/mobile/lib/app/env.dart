/// Environment configuration resolved from `--dart-define` values with
/// sensible Android-emulator defaults for local development.
class EnvConfig {
  static const String defaultApiBaseUrl = String.fromEnvironment(
    'API_BASE_URL',
    defaultValue: 'http://10.0.2.2:3001',
  );

  static const String defaultWebBaseUrl = String.fromEnvironment(
    'WEB_BASE_URL',
  );

  final String apiBaseUrl;
  final String webBaseUrl;

  const EnvConfig({
    this.apiBaseUrl = defaultApiBaseUrl,
    this.webBaseUrl = defaultWebBaseUrl,
  });

  /// Normalized API base URL without trailing slashes.
  String get normalizedApiBaseUrl => _stripTrailingSlashes(apiBaseUrl.trim());

  /// Normalized web base URL used for Guardian share links.
  ///
  /// Uses [webBaseUrl] when non-empty; otherwise derives from [apiBaseUrl]
  /// with any trailing `/api` segment stripped so production web links never
  /// resolve under `/api/guardian/...`.
  String get effectiveWebBaseUrl {
    final explicit = _stripTrailingSlashes(webBaseUrl.trim());
    if (explicit.isNotEmpty) {
      return explicit;
    }

    var base = normalizedApiBaseUrl;
    if (base.isEmpty) {
      return 'http://localhost:3000';
    }
    if (base.toLowerCase().endsWith('/api')) {
      base = base.substring(0, base.length - 4);
      base = _stripTrailingSlashes(base);
    }
    return base.isEmpty ? 'http://localhost:3000' : base;
  }

  /// Resolves relative `/uploads/...` or `/audio/...` paths against [apiBaseUrl].
  String resolveMediaUrl(String path) {
    final trimmed = path.trim();
    if (trimmed.isEmpty) return '';
    if (_isAbsoluteUrl(trimmed)) return trimmed;

    final base = normalizedApiBaseUrl;
    final cleanPath = trimmed.startsWith('/') ? trimmed : '/$trimmed';
    return '$base$cleanPath';
  }

  /// Builds a Guardian share URL against [effectiveWebBaseUrl].
  String guardianShareUrl(String sharePath) {
    final trimmed = sharePath.trim();
    if (trimmed.isEmpty) return effectiveWebBaseUrl;
    if (_isAbsoluteUrl(trimmed)) return trimmed;

    final cleanPath = trimmed.startsWith('/') ? trimmed : '/$trimmed';
    return '$effectiveWebBaseUrl$cleanPath';
  }

  static bool _isAbsoluteUrl(String value) {
    final lower = value.toLowerCase();
    return lower.startsWith('http://') ||
        lower.startsWith('https://') ||
        lower.startsWith('data:') ||
        lower.startsWith('file://');
  }

  static String _stripTrailingSlashes(String value) {
    var result = value;
    while (result.endsWith('/')) {
      result = result.substring(0, result.length - 1);
    }
    return result;
  }
}
