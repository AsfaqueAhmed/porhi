import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_tts/flutter_tts.dart';
import 'package:porhi/app/env.dart';
import 'package:porhi/core/content/media_url_resolver.dart';
import 'package:porhi/core/content/rich_content_parser.dart';
import 'package:porhi/core/theme/porhi_theme.dart';
import 'package:porhi/core/widgets/rich_content/audio_player_tile.dart';

/// Abstraction over TTS speech synthesis for offline/unit testing.
abstract class LessonTtsBackend {
  void setCompletionHandler(void Function() handler);
  Future<void> setLanguage(String language);
  Future<void> setSpeechRate(double rate);
  Future<void> speak(String text);
  Future<void> stop();
}

/// Default `flutter_tts` implementation of [LessonTtsBackend].
class FlutterTtsLessonBackend implements LessonTtsBackend {
  final FlutterTts _tts;

  FlutterTtsLessonBackend({FlutterTts? tts}) : _tts = tts ?? FlutterTts();

  @override
  void setCompletionHandler(void Function() handler) {
    _tts.setCompletionHandler(handler);
    _tts.setCancelHandler(handler);
    _tts.setErrorHandler((_) => handler());
  }

  @override
  Future<void> setLanguage(String language) => _tts.setLanguage(language);

  @override
  Future<void> setSpeechRate(double rate) {
    // flutter_tts expects 0.0..1.0 where 0.5 corresponds to 1.0x normal speed.
    final normalized = (rate * 0.5).clamp(0.1, 1.0);
    return _tts.setSpeechRate(normalized);
  }

  @override
  Future<void> speak(String text) => _tts.speak(text);

  @override
  Future<void> stop() => _tts.stop();
}

/// Lesson audio + bilingual TTS (`bn-BD` / `en-US`) player mirroring web `LessonAudioPlayer`.
class LessonAudioPlayer extends StatefulWidget {
  static const List<double> speedOptions = [0.75, 1.0, 1.25, 1.5];

  final String? audioUrl;
  final int? audioDurationSeconds;
  final String title;
  final String narrationText;
  final String? languageCode;
  final EnvConfig? envConfig;
  final LessonAudioBackend Function()? audioBackendFactory;
  final LessonTtsBackend Function()? ttsBackendFactory;

  const LessonAudioPlayer({
    super.key,
    this.audioUrl,
    this.audioDurationSeconds,
    required this.title,
    required this.narrationText,
    this.languageCode,
    this.envConfig,
    this.audioBackendFactory,
    this.ttsBackendFactory,
  });

  @override
  State<LessonAudioPlayer> createState() => _LessonAudioPlayerState();
}

class _LessonAudioPlayerState extends State<LessonAudioPlayer> {
  LessonAudioBackend? _audioBackend;
  LessonTtsBackend? _ttsBackend;

  StreamSubscription<Duration>? _posSub;
  StreamSubscription<Duration?>? _durSub;
  StreamSubscription<bool>? _playSub;

  bool _isPlayingAudio = false;
  bool _isSpeaking = false;
  double _playbackRate = 1.0;
  Duration _position = Duration.zero;
  Duration _duration = Duration.zero;
  bool _disposed = false;
  int _loadGeneration = 0;

  bool get _hasAudioUrl =>
      widget.audioUrl != null && widget.audioUrl!.trim().isNotEmpty;

  String get _cleanNarration {
    final cleaned = stripMarkdownForSpeech(
      '${widget.title}. ${widget.narrationText}',
    );
    if (cleaned.length <= 1800) return cleaned;
    return cleaned.substring(0, 1800);
  }

  String get _effectiveTtsLanguage {
    final explicit = widget.languageCode?.trim().toLowerCase();
    if (explicit == 'en' || explicit == 'en-us') return 'en-US';
    if (explicit == 'bn' || explicit == 'bn-bd') return 'bn-BD';
    // Auto-detect Bangla Unicode block (\u0980-\u09FF).
    final hasBangla = RegExp(r'[\u0980-\u09FF]').hasMatch(_cleanNarration);
    return hasBangla ? 'bn-BD' : 'en-US';
  }

  @override
  void initState() {
    super.initState();
    _duration = Duration(seconds: widget.audioDurationSeconds ?? 0);
    _initTts();
    if (_hasAudioUrl) {
      _initAudio();
    }
  }

  @override
  void didUpdateWidget(covariant LessonAudioPlayer oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.audioDurationSeconds != widget.audioDurationSeconds &&
        widget.audioDurationSeconds != null) {
      _duration = Duration(seconds: widget.audioDurationSeconds!);
    }
    if (oldWidget.audioUrl != widget.audioUrl) {
      _loadGeneration++;
      unawaited(_audioBackend?.pause());
      setState(() {
        _isPlayingAudio = false;
        _position = Duration.zero;
        _duration = Duration(seconds: widget.audioDurationSeconds ?? 0);
      });
      if (_hasAudioUrl) {
        if (_audioBackend == null) {
          _initAudio();
        } else {
          unawaited(_loadAudioSource());
        }
      }
    }
  }

  void _initTts() {
    final tts = (widget.ttsBackendFactory ?? FlutterTtsLessonBackend.new)();
    _ttsBackend = tts;
    tts.setCompletionHandler(() {
      if (!mounted || _disposed) return;
      setState(() => _isSpeaking = false);
    });
  }

  void _initAudio() {
    final audio = (widget.audioBackendFactory ?? JustAudioLessonBackend.new)();
    _audioBackend = audio;

    _posSub = audio.positionStream.listen((pos) {
      if (!mounted || _disposed) return;
      setState(() => _position = pos);
    });
    _durSub = audio.durationStream.listen((dur) {
      if (!mounted || _disposed || dur == null) return;
      setState(() => _duration = dur);
    });
    _playSub = audio.playingStream.listen((playing) {
      if (!mounted || _disposed) return;
      setState(() => _isPlayingAudio = playing);
    });

    unawaited(_loadAudioSource());
  }

  Future<void> _loadAudioSource() async {
    final gen = ++_loadGeneration;
    final raw = widget.audioUrl;
    if (raw == null || raw.trim().isEmpty || _audioBackend == null) return;
    final resolved = resolvePorhiMediaUrl(raw, envConfig: widget.envConfig);
    try {
      final loaded = await _audioBackend!.setUrl(resolved);
      if (!mounted || _disposed || gen != _loadGeneration) return;
      if (loaded != null && loaded > Duration.zero) {
        setState(() => _duration = loaded);
      }
    } catch (_) {
      if (!mounted || _disposed || gen != _loadGeneration) return;
      setState(() => _isPlayingAudio = false);
    }
  }

  Future<void> _setSpeed(double rate) async {
    setState(() => _playbackRate = rate);
    try {
      await _audioBackend?.setSpeed(rate);
    } catch (_) {
      // Ignore speed change error on unready player
    }
    if (_isSpeaking) {
      try {
        await _ttsBackend?.setSpeechRate(rate);
      } catch (_) {}
    }
  }

  Future<void> _toggleAudioFile() async {
    final audio = _audioBackend;
    if (audio == null) return;
    try {
      if (_isPlayingAudio) {
        await audio.pause();
        if (!mounted || _disposed) return;
        setState(() => _isPlayingAudio = false);
      } else {
        await audio.setSpeed(_playbackRate);
        await audio.play();
        if (!mounted || _disposed) return;
        setState(() => _isPlayingAudio = true);
      }
    } catch (_) {
      if (!mounted || _disposed) return;
      setState(() => _isPlayingAudio = false);
    }
  }

  Future<void> _toggleVoiceNarration() async {
    final tts = _ttsBackend;
    if (tts == null) return;

    if (_isSpeaking) {
      try {
        await tts.stop();
      } catch (_) {}
      if (!mounted || _disposed) return;
      setState(() => _isSpeaking = false);
      return;
    }

    try {
      await tts.stop();
      await tts.setLanguage(_effectiveTtsLanguage);
      await tts.setSpeechRate(_playbackRate);
      if (!mounted || _disposed) return;
      setState(() => _isSpeaking = true);
      final textToSpeak =
          _cleanNarration.isNotEmpty ? _cleanNarration : widget.title;
      await tts.speak(textToSpeak);
    } catch (_) {
      if (!mounted || _disposed) return;
      setState(() => _isSpeaking = false);
    }
  }

  Future<void> _seekToSeconds(double sec) async {
    final target = Duration(seconds: sec.round());
    setState(() => _position = target);
    try {
      await _audioBackend?.seek(target);
    } catch (_) {}
  }

  @override
  void dispose() {
    _disposed = true;
    unawaited(_posSub?.cancel());
    unawaited(_durSub?.cancel());
    unawaited(_playSub?.cancel());
    final audio = _audioBackend;
    _audioBackend = null;
    if (audio != null) {
      unawaited(audio.dispose());
    }
    final tts = _ttsBackend;
    _ttsBackend = null;
    if (tts != null) {
      unawaited(tts.stop());
    }
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final maxSec =
        _duration.inSeconds > 0 ? _duration.inSeconds.toDouble() : 1.0;
    final curSec = _position.inSeconds.toDouble().clamp(0.0, maxSec);

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
                width: 36,
                height: 36,
                decoration: BoxDecoration(
                  color: PorhiTheme.indigo600,
                  borderRadius: BorderRadius.circular(10),
                ),
                child: const Icon(
                  Icons.headphones_rounded,
                  size: 18,
                  color: Colors.white,
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'অডিও লেসন ও ভয়েস পাঠ',
                      style: TextStyle(
                        fontSize: 13,
                        fontWeight: FontWeight.w700,
                        color: PorhiTheme.slate900,
                      ),
                    ),
                    Text(
                      _hasAudioUrl
                          ? 'রেকর্ডেড অডিও ক্লিপ অথবা ভয়েস রিডার চালু করে শুনুন'
                          : 'ভয়েস রিডার দিয়ে পাঠের সারাংশ শুনুন',
                      style: const TextStyle(
                        fontSize: 11,
                        color: PorhiTheme.slate600,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),
          Wrap(
            spacing: 6,
            runSpacing: 6,
            children: LessonAudioPlayer.speedOptions.map((rate) {
              final selected = _playbackRate == rate;
              final label = rate == 1.0 ? '1x' : '${rate}x';
              return InkWell(
                onTap: () => unawaited(_setSpeed(rate)),
                borderRadius: BorderRadius.circular(8),
                child: Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 10,
                    vertical: 5,
                  ),
                  decoration: BoxDecoration(
                    color: selected ? PorhiTheme.indigo600 : Colors.white,
                    borderRadius: BorderRadius.circular(8),
                    border: Border.all(
                      color:
                          selected ? PorhiTheme.indigo600 : PorhiTheme.slate200,
                    ),
                  ),
                  child: Text(
                    label,
                    style: TextStyle(
                      fontSize: 11,
                      fontWeight: FontWeight.w700,
                      color: selected ? Colors.white : PorhiTheme.slate700,
                    ),
                  ),
                ),
              );
            }).toList(),
          ),
          const SizedBox(height: 12),
          if (_hasAudioUrl) ...[
            Row(
              children: [
                FilledButton.icon(
                  onPressed: _toggleAudioFile,
                  style: FilledButton.styleFrom(
                    backgroundColor: PorhiTheme.indigo600,
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(
                      horizontal: 12,
                      vertical: 8,
                    ),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                  icon: Icon(
                    _isPlayingAudio
                        ? Icons.pause_rounded
                        : Icons.play_arrow_rounded,
                    size: 18,
                  ),
                  label: Text(
                    _isPlayingAudio ? 'বিরতি' : 'অডিও চালাও',
                    style: const TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                Text(
                  formatMediaClock(_position),
                  style: const TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w600,
                    color: PorhiTheme.slate600,
                  ),
                ),
                Expanded(
                  child: Slider(
                    min: 0,
                    max: maxSec,
                    value: curSec,
                    activeColor: PorhiTheme.indigo600,
                    inactiveColor: PorhiTheme.slate200,
                    onChanged: _duration.inSeconds > 0 ? _seekToSeconds : null,
                  ),
                ),
                Text(
                  formatMediaClock(_duration),
                  style: const TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w600,
                    color: PorhiTheme.slate600,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
          ],
          OutlinedButton.icon(
            onPressed: _toggleVoiceNarration,
            style: OutlinedButton.styleFrom(
              backgroundColor:
                  _isSpeaking ? const Color(0xFFFFFBEB) : Colors.white,
              foregroundColor:
                  _isSpeaking ? const Color(0xFF92400E) : PorhiTheme.slate700,
              side: BorderSide(
                color: _isSpeaking
                    ? const Color(0xFFFBBF24)
                    : PorhiTheme.slate200,
              ),
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
            ),
            icon: Icon(
              _isSpeaking ? Icons.volume_off_rounded : Icons.volume_up_rounded,
              size: 16,
            ),
            label: Text(
              _isSpeaking ? 'ভয়েস থামাও' : 'ভয়েস পাঠ শুরু',
              style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w700),
            ),
          ),
        ],
      ),
    );
  }
}
