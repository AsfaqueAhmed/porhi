import 'dart:async';

import 'package:flutter/material.dart';
import 'package:just_audio/just_audio.dart';
import 'package:porhi/app/env.dart';
import 'package:porhi/core/content/media_url_resolver.dart';
import 'package:porhi/core/theme/porhi_theme.dart';

/// Abstraction over audio playback so widgets stay decoupled from platform channels in tests.
abstract class LessonAudioBackend {
  Stream<Duration> get positionStream;
  Stream<Duration?> get durationStream;
  Stream<bool> get playingStream;

  Future<Duration?> setUrl(String url);
  Future<void> play();
  Future<void> pause();
  Future<void> seek(Duration position);
  Future<void> setSpeed(double speed);
  Future<void> dispose();
}

/// Default `just_audio` implementation of [LessonAudioBackend].
class JustAudioLessonBackend implements LessonAudioBackend {
  final AudioPlayer _player;

  JustAudioLessonBackend({AudioPlayer? player})
      : _player = player ?? AudioPlayer();

  @override
  Stream<Duration> get positionStream => _player.positionStream;

  @override
  Stream<Duration?> get durationStream => _player.durationStream;

  @override
  Stream<bool> get playingStream => _player.playingStream;

  @override
  Future<Duration?> setUrl(String url) => _player.setUrl(url);

  @override
  Future<void> play() => _player.play();

  @override
  Future<void> pause() => _player.pause();

  @override
  Future<void> seek(Duration position) => _player.seek(position);

  @override
  Future<void> setSpeed(double speed) => _player.setSpeed(speed);

  @override
  Future<void> dispose() => _player.dispose();
}

/// Inline audio player card mirroring poRi web's `AudioCard`.
class AudioPlayerTile extends StatefulWidget {
  final String src;
  final String title;
  final EnvConfig? envConfig;
  final LessonAudioBackend Function()? backendFactory;

  const AudioPlayerTile({
    super.key,
    required this.src,
    this.title = '',
    this.envConfig,
    this.backendFactory,
  });

  @override
  State<AudioPlayerTile> createState() => _AudioPlayerTileState();
}

class _AudioPlayerTileState extends State<AudioPlayerTile> {
  LessonAudioBackend? _backend;
  StreamSubscription<Duration>? _posSub;
  StreamSubscription<Duration?>? _durSub;
  StreamSubscription<bool>? _playSub;

  Duration _position = Duration.zero;
  Duration _duration = Duration.zero;
  bool _isPlaying = false;
  bool _hasError = false;
  bool _disposed = false;

  @override
  void initState() {
    super.initState();
    _initBackend();
  }

  @override
  void didUpdateWidget(covariant AudioPlayerTile oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.src != widget.src) {
      unawaited(_loadCurrentSource());
    }
  }

  void _initBackend() {
    final backend = (widget.backendFactory ?? JustAudioLessonBackend.new)();
    _backend = backend;

    _posSub = backend.positionStream.listen((pos) {
      if (!mounted || _disposed) return;
      setState(() => _position = pos);
    });
    _durSub = backend.durationStream.listen((dur) {
      if (!mounted || _disposed || dur == null) return;
      setState(() => _duration = dur);
    });
    _playSub = backend.playingStream.listen((playing) {
      if (!mounted || _disposed) return;
      setState(() => _isPlaying = playing);
    });

    unawaited(_loadCurrentSource());
  }

  Future<void> _loadCurrentSource() async {
    final resolved = resolvePorhiMediaUrl(widget.src, envConfig: widget.envConfig);
    if (resolved.isEmpty || _backend == null) return;

    try {
      final loadedDuration = await _backend!.setUrl(resolved);
      if (!mounted || _disposed) return;
      setState(() {
        _hasError = false;
        if (loadedDuration != null) {
          _duration = loadedDuration;
        }
      });
    } catch (_) {
      if (!mounted || _disposed) return;
      setState(() {
        _hasError = true;
        _isPlaying = false;
      });
    }
  }

  Future<void> _togglePlay() async {
    final backend = _backend;
    if (backend == null) return;
    try {
      if (_isPlaying) {
        await backend.pause();
      } else {
        await backend.play();
      }
    } catch (_) {
      if (!mounted || _disposed) return;
      setState(() {
        _hasError = true;
        _isPlaying = false;
      });
    }
  }

  Future<void> _restart() async {
    final backend = _backend;
    if (backend == null) return;
    try {
      await backend.seek(Duration.zero);
      if (!mounted || _disposed) return;
      setState(() => _position = Duration.zero);
      await backend.play();
    } catch (_) {
      if (!mounted || _disposed) return;
      setState(() => _hasError = true);
    }
  }

  Future<void> _seekToMs(double ms) async {
    final backend = _backend;
    if (backend == null) return;
    final target = Duration(milliseconds: ms.round());
    setState(() => _position = target);
    try {
      await backend.seek(target);
    } catch (_) {
      // Ignore seek error on unready source
    }
  }

  @override
  void dispose() {
    _disposed = true;
    unawaited(_posSub?.cancel());
    unawaited(_durSub?.cancel());
    unawaited(_playSub?.cancel());
    final backend = _backend;
    _backend = null;
    if (backend != null) {
      unawaited(backend.dispose());
    }
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final displayTitle =
        widget.title.trim().isNotEmpty ? widget.title.trim() : 'অডিও সাউন্ড ক্লিপ';
    final maxMs =
        _duration.inMilliseconds > 0 ? _duration.inMilliseconds.toDouble() : 1.0;
    final currentMs = _position.inMilliseconds.toDouble().clamp(0.0, maxMs);

    return Container(
      margin: const EdgeInsets.symmetric(vertical: 10),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [PorhiTheme.indigo50, Colors.white, Color(0xFFF0F9FF)],
        ),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFFC7D2FE)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                width: 28,
                height: 28,
                decoration: BoxDecoration(
                  color: PorhiTheme.indigo600,
                  borderRadius: BorderRadius.circular(8),
                ),
                child: const Icon(
                  Icons.volume_up_rounded,
                  size: 16,
                  color: Colors.white,
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: Text(
                  displayTitle,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.w700,
                    color: PorhiTheme.slate900,
                  ),
                ),
              ),
              const SizedBox(width: 8),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                decoration: BoxDecoration(
                  color: PorhiTheme.indigo50,
                  borderRadius: BorderRadius.circular(6),
                ),
                child: Text(
                  '${formatMediaDuration(_position)} / ${formatMediaDuration(_duration)}',
                  style: const TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w700,
                    color: PorhiTheme.indigo700,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),
          Row(
            children: [
              IconButton.filled(
                onPressed: _togglePlay,
                tooltip: _isPlaying ? 'থামান' : 'শুনুন',
                style: IconButton.styleFrom(
                  backgroundColor: PorhiTheme.indigo600,
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
                icon: Icon(
                  _isPlaying ? Icons.pause_rounded : Icons.play_arrow_rounded,
                ),
              ),
              const SizedBox(width: 4),
              IconButton(
                onPressed: _restart,
                tooltip: 'পুনরায় শুরু',
                color: PorhiTheme.slate600,
                icon: const Icon(Icons.replay_rounded, size: 20),
              ),
              Expanded(
                child: Slider(
                  min: 0,
                  max: maxMs,
                  value: currentMs,
                  activeColor: PorhiTheme.indigo600,
                  inactiveColor: PorhiTheme.slate200,
                  onChanged: _duration.inMilliseconds > 0 ? _seekToMs : null,
                ),
              ),
            ],
          ),
          if (_hasError)
            const Padding(
              padding: EdgeInsets.only(top: 4),
              child: Text(
                'অডিও লোড করা যায়নি',
                style: TextStyle(
                  fontSize: 11,
                  color: PorhiTheme.rose600,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
        ],
      ),
    );
  }
}
