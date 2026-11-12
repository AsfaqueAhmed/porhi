import 'package:get/get.dart';
import 'package:porhi/app/env.dart';

/// Resolves relative media/simulation paths using an explicit [EnvConfig],
/// the registered GetX [EnvConfig] instance, or default [EnvConfig].
String resolvePorhiMediaUrl(String rawUrl, {EnvConfig? envConfig}) {
  final effectiveEnv = envConfig ??
      (Get.isRegistered<EnvConfig>() ? Get.find<EnvConfig>() : const EnvConfig());
  return effectiveEnv.resolveMediaUrl(rawUrl);
}

/// Safely parses a hostless `file://` URI into a local filesystem path.
/// Returns `null` on non-file URIs, hostful `file://localhost/...` URIs,
/// or malformed percent-encoding.
String? tryParseLocalFilePath(String url) {
  final trimmed = url.trim();
  if (!trimmed.toLowerCase().startsWith('file://')) return null;
  try {
    final uri = Uri.tryParse(trimmed);
    if (uri == null || uri.scheme.toLowerCase() != 'file') return null;
    if (uri.host.isNotEmpty) return null;
    final path = uri.toFilePath();
    return path.isEmpty ? null : path;
  } catch (_) {
    return null;
  }
}

/// Validates and normalizes an external/media HTTP(S) URI.
/// Rejects dangerous schemes (`javascript:`, `intent:`, `data:`, `file:`, etc.)
/// and URIs without a valid host.
Uri? tryParseAllowedWebUri(String url) {
  var trimmed = url.trim();
  if (trimmed.isEmpty) return null;
  if (trimmed.startsWith('//')) {
    trimmed = 'https:$trimmed';
  }
  final uri = Uri.tryParse(trimmed);
  if (uri == null) return null;
  final scheme = uri.scheme.toLowerCase();
  if (scheme != 'http' && scheme != 'https') return null;
  if (uri.host.trim().isEmpty) return null;
  return uri;
}

/// Formats seconds or a [Duration] into `m:ss` (matching web `formatTime`).
String formatMediaDuration(Duration duration) {
  final totalSeconds = duration.inSeconds;
  if (totalSeconds <= 0) return '0:00';
  final mins = totalSeconds ~/ 60;
  final secs = totalSeconds % 60;
  return '$mins:${secs < 10 ? '0' : ''}$secs';
}

/// Formats seconds or a [Duration] into zero-padded `mm:ss` (matching web `formatClock`).
String formatMediaClock(Duration duration) {
  final safe = duration.inSeconds < 0 ? 0 : duration.inSeconds;
  final mins = safe ~/ 60;
  final secs = safe % 60;
  return '${mins.toString().padLeft(2, '0')}:${secs.toString().padLeft(2, '0')}';
}
