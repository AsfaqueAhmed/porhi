import 'package:get/get.dart';
import 'package:porhi/app/env.dart';

/// Resolves relative media/simulation paths using an explicit [EnvConfig],
/// the registered GetX [EnvConfig] instance, or default [EnvConfig].
String resolvePorhiMediaUrl(String rawUrl, {EnvConfig? envConfig}) {
  final effectiveEnv = envConfig ??
      (Get.isRegistered<EnvConfig>() ? Get.find<EnvConfig>() : const EnvConfig());
  return effectiveEnv.resolveMediaUrl(rawUrl);
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
