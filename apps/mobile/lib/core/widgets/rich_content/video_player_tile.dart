import 'dart:async';
import 'dart:io';

import 'package:chewie/chewie.dart';
import 'package:flutter/material.dart';
import 'package:porhi/app/env.dart';
import 'package:porhi/core/content/media_url_resolver.dart';
import 'package:porhi/core/theme/porhi_theme.dart';
import 'package:video_player/video_player.dart';
import 'package:webview_flutter/webview_flutter.dart';

typedef VideoPlayerWidgetBuilder = Widget Function(
  BuildContext context,
  String resolvedUrl,
  void Function(VoidCallback disposeCallback) onRegisterDispose,
);

typedef YoutubeWidgetBuilder = Widget Function(
  BuildContext context,
  String videoId,
  String title,
);

/// Inline 16:9 video player card mirroring web `VideoCard` (`video_player` + `chewie`).
class VideoPlayerTile extends StatefulWidget {
  final String src;
  final String title;
  final EnvConfig? envConfig;
  final VideoPlayerWidgetBuilder? playerBuilder;

  const VideoPlayerTile({
    super.key,
    required this.src,
    this.title = '',
    this.envConfig,
    this.playerBuilder,
  });

  @override
  State<VideoPlayerTile> createState() => _VideoPlayerTileState();
}

class _VideoPlayerTileState extends State<VideoPlayerTile> {
  VideoPlayerController? _videoController;
  ChewieController? _chewieController;
  VoidCallback? _customDispose;

  bool _isLoading = true;
  bool _hasError = false;
  bool _disposed = false;

  String get _resolvedUrl =>
      resolvePorhiMediaUrl(widget.src, envConfig: widget.envConfig);

  @override
  void initState() {
    super.initState();
    if (widget.playerBuilder == null) {
      unawaited(_initializeNativePlayer());
    } else {
      _isLoading = false;
    }
  }

  @override
  void didUpdateWidget(covariant VideoPlayerTile oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.src != widget.src) {
      _disposeControllers();
      if (widget.playerBuilder == null) {
        setState(() {
          _isLoading = true;
          _hasError = false;
        });
        unawaited(_initializeNativePlayer());
      }
    }
  }

  Future<void> _initializeNativePlayer() async {
    final url = _resolvedUrl;
    if (url.isEmpty) {
      if (!mounted || _disposed) return;
      setState(() {
        _isLoading = false;
        _hasError = true;
      });
      return;
    }

    VideoPlayerController? controller;
    try {
      controller = url.startsWith('file://')
          ? VideoPlayerController.file(File(Uri.parse(url).toFilePath()))
          : VideoPlayerController.networkUrl(Uri.parse(url));

      await controller.initialize();
      if (!mounted || _disposed) {
        await controller.dispose();
        return;
      }

      final chewie = ChewieController(
        videoPlayerController: controller,
        autoPlay: false,
        looping: false,
        allowFullScreen: true,
        aspectRatio: controller.value.aspectRatio > 0
            ? controller.value.aspectRatio
            : 16 / 9,
      );

      setState(() {
        _videoController = controller;
        _chewieController = chewie;
        _isLoading = false;
        _hasError = false;
      });
    } catch (_) {
      await controller?.dispose();
      if (!mounted || _disposed) return;
      setState(() {
        _isLoading = false;
        _hasError = true;
      });
    }
  }

  void _disposeControllers() {
    _customDispose?.call();
    _customDispose = null;
    final chewie = _chewieController;
    final video = _videoController;
    _chewieController = null;
    _videoController = null;
    chewie?.dispose();
    if (video != null) {
      unawaited(video.dispose());
    }
  }

  @override
  void dispose() {
    _disposed = true;
    _disposeControllers();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final resolved = _resolvedUrl;
    if (resolved.isEmpty) return const SizedBox.shrink();

    return Container(
      margin: const EdgeInsets.symmetric(vertical: 12),
      decoration: BoxDecoration(
        color: PorhiTheme.slate900,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: PorhiTheme.slate200),
      ),
      clipBehavior: Clip.antiAlias,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          if (widget.title.trim().isNotEmpty)
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
              decoration: const BoxDecoration(
                color: Color(0xFF1E293B),
                border: Border(bottom: BorderSide(color: PorhiTheme.slate700)),
              ),
              child: Row(
                children: [
                  const Icon(
                    Icons.movie_outlined,
                    size: 16,
                    color: Color(0xFF818CF8),
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      widget.title.trim(),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w700,
                        color: PorhiTheme.slate200,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          AspectRatio(
            aspectRatio: 16 / 9,
            child: ColoredBox(
              color: Colors.black,
              child: _buildPlayerBody(context, resolved),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPlayerBody(BuildContext context, String resolved) {
    if (widget.playerBuilder != null) {
      return widget.playerBuilder!(
        context,
        resolved,
        (disposeCb) => _customDispose = disposeCb,
      );
    }

    if (_isLoading) {
      return const Center(
        child: CircularProgressIndicator(color: Colors.white70),
      );
    }

    if (_hasError || _chewieController == null) {
      return const Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(Icons.videocam_off_outlined, color: Colors.white54, size: 32),
            SizedBox(height: 6),
            Text(
              'ভিডিও চালু করা যায়নি',
              style: TextStyle(color: Colors.white70, fontSize: 12),
            ),
          ],
        ),
      );
    }

    return Chewie(controller: _chewieController!);
  }
}

/// YouTube video card rendered for `[YOUTUBE: ...]` markers.
class YoutubeVideoTile extends StatefulWidget {
  final String videoId;
  final String title;
  final YoutubeWidgetBuilder? youtubeBuilder;

  const YoutubeVideoTile({
    super.key,
    required this.videoId,
    this.title = '',
    this.youtubeBuilder,
  });

  @override
  State<YoutubeVideoTile> createState() => _YoutubeVideoTileState();
}

class _YoutubeVideoTileState extends State<YoutubeVideoTile> {
  bool _showEmbed = false;
  WebViewController? _controller;

  void _openEmbed() {
    if (widget.videoId.isEmpty) return;
    final embedUri = Uri.parse(
      'https://www.youtube-nocookie.com/embed/${widget.videoId}?autoplay=1',
    );
    _controller ??= WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..loadRequest(embedUri);
    setState(() => _showEmbed = true);
  }

  @override
  Widget build(BuildContext context) {
    if (widget.youtubeBuilder != null) {
      return widget.youtubeBuilder!(context, widget.videoId, widget.title);
    }
    if (widget.videoId.isEmpty) return const SizedBox.shrink();

    final displayTitle = widget.title.trim().isNotEmpty
        ? widget.title.trim()
        : 'ইউটিউব ভিডিও লেকচার';

    return Container(
      margin: const EdgeInsets.symmetric(vertical: 12),
      decoration: BoxDecoration(
        color: PorhiTheme.slate900,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: PorhiTheme.slate200),
      ),
      clipBehavior: Clip.antiAlias,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
            color: const Color(0xFF1E293B),
            child: Row(
              children: [
                const Icon(
                  Icons.play_circle_fill_rounded,
                  size: 18,
                  color: Color(0xFFF43F5E),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    displayTitle,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w700,
                      color: PorhiTheme.slate200,
                    ),
                  ),
                ),
              ],
            ),
          ),
          AspectRatio(
            aspectRatio: 16 / 9,
            child: _showEmbed && _controller != null
                ? WebViewWidget(controller: _controller!)
                : InkWell(
                    onTap: _openEmbed,
                    child: Container(
                      color: Colors.black87,
                      alignment: Alignment.center,
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Container(
                            width: 56,
                            height: 56,
                            decoration: const BoxDecoration(
                              color: Color(0xFFE11D48),
                              shape: BoxShape.circle,
                            ),
                            child: const Icon(
                              Icons.play_arrow_rounded,
                              color: Colors.white,
                              size: 32,
                            ),
                          ),
                          const SizedBox(height: 8),
                          Text(
                            'ভিডিও চালাতে ট্যাপ করুন (${widget.videoId})',
                            style: const TextStyle(
                              color: Colors.white70,
                              fontSize: 12,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
          ),
        ],
      ),
    );
  }
}
