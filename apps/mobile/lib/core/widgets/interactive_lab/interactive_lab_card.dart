import 'dart:async';

import 'package:flutter/material.dart';
import 'package:porhi/app/env.dart';
import 'package:porhi/core/content/media_url_resolver.dart';
import 'package:porhi/core/theme/porhi_theme.dart';
import 'package:webview_flutter/webview_flutter.dart';

typedef InteractiveWebViewBuilder = Widget Function(
  BuildContext context,
  String source, {
  required bool isLocalFile,
  required bool isHtml,
});

class ResolvedLabSource {
  final String source;
  final bool isLocalFile;
  final bool isHtml;

  const ResolvedLabSource({
    required this.source,
    required this.isLocalFile,
    required this.isHtml,
  });

  bool get isEmpty => source.trim().isEmpty;
}

/// Resolves an interactive lab URL, local offline HTML path, or inline HTML snippet.
ResolvedLabSource resolveInteractiveLabSource({
  String? widgetUrl,
  String? htmlContent,
  EnvConfig? envConfig,
  bool forceLocalFile = false,
}) {
  final rawHtml = htmlContent?.trim() ?? '';
  if (rawHtml.isNotEmpty) {
    return ResolvedLabSource(
      source: rawHtml,
      isLocalFile: false,
      isHtml: true,
    );
  }

  final rawUrl = widgetUrl?.trim() ?? '';
  if (rawUrl.isEmpty) {
    return const ResolvedLabSource(
      source: '',
      isLocalFile: false,
      isHtml: false,
    );
  }

  if (rawUrl.startsWith('file://')) {
    return ResolvedLabSource(
      source: Uri.parse(rawUrl).toFilePath(),
      isLocalFile: true,
      isHtml: false,
    );
  }

  final looksLikeDevicePath = forceLocalFile ||
      rawUrl.startsWith('/data/') ||
      rawUrl.startsWith('/storage/') ||
      rawUrl.startsWith('/var/') ||
      rawUrl.startsWith('/Users/') ||
      rawUrl.startsWith('/tmp/');

  if (looksLikeDevicePath) {
    return ResolvedLabSource(
      source: rawUrl,
      isLocalFile: true,
      isHtml: false,
    );
  }

  return ResolvedLabSource(
    source: resolvePorhiMediaUrl(rawUrl, envConfig: envConfig),
    isLocalFile: false,
    isHtml: false,
  );
}

/// Sandboxed HTML5 interactive lab runner with reload, offline `loadFile`, and fullscreen mode.
class InteractiveLabWebView extends StatefulWidget {
  final String? widgetUrl;
  final String? htmlContent;
  final String title;
  final double height;
  final bool forceLocalFile;
  final EnvConfig? envConfig;
  final InteractiveWebViewBuilder? webViewBuilder;
  final VoidCallback? onReloadCallback;

  const InteractiveLabWebView({
    super.key,
    this.widgetUrl,
    this.htmlContent,
    this.title = 'ইন্টারেক্টিভ ল্যাব সিমুলেশন',
    this.height = 360,
    this.forceLocalFile = false,
    this.envConfig,
    this.webViewBuilder,
    this.onReloadCallback,
  });

  @override
  State<InteractiveLabWebView> createState() => _InteractiveLabWebViewState();
}

class _InteractiveLabWebViewState extends State<InteractiveLabWebView> {
  WebViewController? _controller;
  int _reloadTick = 0;
  bool _isLoading = false;
  bool _isFullscreenOpen = false;
  bool _disposed = false;

  ResolvedLabSource get _resolved => resolveInteractiveLabSource(
        widgetUrl: widget.widgetUrl,
        htmlContent: widget.htmlContent,
        envConfig: widget.envConfig,
        forceLocalFile: widget.forceLocalFile,
      );

  @override
  void initState() {
    super.initState();
    if (widget.webViewBuilder == null && !_resolved.isEmpty) {
      _initWebViewController();
    }
  }

  @override
  void didUpdateWidget(covariant InteractiveLabWebView oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.widgetUrl != widget.widgetUrl ||
        oldWidget.htmlContent != widget.htmlContent ||
        oldWidget.forceLocalFile != widget.forceLocalFile) {
      if (widget.webViewBuilder == null && !_resolved.isEmpty) {
        if (_controller == null) {
          _initWebViewController();
        } else {
          unawaited(_loadIntoController(_controller!, _resolved));
        }
      }
    }
  }

  void _initWebViewController() {
    final controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(PorhiTheme.slate50)
      ..setNavigationDelegate(
        NavigationDelegate(
          onPageStarted: (_) {
            if (!mounted || _disposed) return;
            setState(() => _isLoading = true);
          },
          onPageFinished: (_) {
            if (!mounted || _disposed) return;
            setState(() => _isLoading = false);
          },
          onWebResourceError: (_) {
            if (!mounted || _disposed) return;
            setState(() => _isLoading = false);
          },
        ),
      );
    _controller = controller;
    unawaited(_loadIntoController(controller, _resolved));
  }

  Future<void> _loadIntoController(
    WebViewController controller,
    ResolvedLabSource resolved,
  ) async {
    if (!mounted || _disposed || resolved.isEmpty) return;
    setState(() => _isLoading = true);
    try {
      if (resolved.isHtml) {
        await controller.loadHtmlString(resolved.source);
      } else if (resolved.isLocalFile) {
        await controller.loadFile(resolved.source);
      } else {
        await controller.loadRequest(Uri.parse(resolved.source));
      }
    } catch (_) {
      if (!mounted || _disposed) return;
      setState(() => _isLoading = false);
    }
  }

  void _reload() {
    widget.onReloadCallback?.call();
    setState(() => _reloadTick++);
    if (_controller != null) {
      unawaited(_loadIntoController(_controller!, _resolved));
    }
  }

  Future<void> _openFullscreen(BuildContext context) async {
    if (_isFullscreenOpen) return;
    setState(() => _isFullscreenOpen = true);
    try {
      await showDialog<void>(
        context: context,
        barrierDismissible: true,
        builder: (dialogContext) {
          return Dialog.fullscreen(
            backgroundColor: PorhiTheme.slate900,
            child: SafeArea(
              child: Column(
                children: [
                  _LabTopBar(
                    title: widget.title,
                    isFullscreen: true,
                    onReload: _reload,
                    onToggleFullscreen: () => Navigator.of(dialogContext).pop(),
                  ),
                  Expanded(
                    child: _buildWebViewContent(dialogContext, _resolved),
                  ),
                ],
              ),
            ),
          );
        },
      );
    } finally {
      if (mounted && !_disposed) {
        setState(() => _isFullscreenOpen = false);
      }
    }
  }

  Widget _buildWebViewContent(BuildContext context, ResolvedLabSource resolved) {
    if (widget.webViewBuilder != null) {
      return KeyedSubtree(
        key: ValueKey('lab-$_reloadTick'),
        child: widget.webViewBuilder!(
          context,
          resolved.source,
          isLocalFile: resolved.isLocalFile,
          isHtml: resolved.isHtml,
        ),
      );
    }

    if (_controller == null) {
      return const SizedBox.shrink();
    }

    return Stack(
      children: [
        WebViewWidget(controller: _controller!),
        if (_isLoading)
          const Positioned(
            top: 0,
            left: 0,
            right: 0,
            child: LinearProgressIndicator(minHeight: 2),
          ),
      ],
    );
  }

  @override
  void dispose() {
    _disposed = true;
    _controller = null;
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final resolved = _resolved;
    if (resolved.isEmpty) return const SizedBox.shrink();

    return Container(
      margin: const EdgeInsets.symmetric(vertical: 14),
      decoration: BoxDecoration(
        color: PorhiTheme.slate900,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFFC7D2FE)),
      ),
      clipBehavior: Clip.antiAlias,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          _LabTopBar(
            title: widget.title,
            isFullscreen: false,
            onReload: _reload,
            onToggleFullscreen: () => unawaited(_openFullscreen(context)),
          ),
          Container(
            height: widget.height,
            color: PorhiTheme.slate50,
            child: _isFullscreenOpen
                ? const Center(
                    child: Text(
                      'সিমুলেশন পূর্ণস্ক্রীনে খোলা আছে',
                      style: TextStyle(
                        fontSize: 12,
                        color: PorhiTheme.slate600,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  )
                : _buildWebViewContent(context, resolved),
          ),
        ],
      ),
    );
  }
}

/// Alias/card matching the plan's `InteractiveLabCard` interface.
class InteractiveLabCard extends InteractiveLabWebView {
  const InteractiveLabCard({
    super.key,
    super.widgetUrl,
    super.htmlContent,
    super.title = 'ইন্টারেক্টিভ ল্যাব সিমুলেশন',
    super.height = 360,
    super.forceLocalFile = false,
    super.envConfig,
    super.webViewBuilder,
    super.onReloadCallback,
  });
}

class _LabTopBar extends StatelessWidget {
  final String title;
  final bool isFullscreen;
  final VoidCallback onReload;
  final VoidCallback onToggleFullscreen;

  const _LabTopBar({
    required this.title,
    required this.isFullscreen,
    required this.onReload,
    required this.onToggleFullscreen,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: const BoxDecoration(
        color: Color(0xFF1E293B),
        border: Border(bottom: BorderSide(color: PorhiTheme.slate700)),
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 3),
            decoration: BoxDecoration(
              color: const Color(0x33F59E0B),
              borderRadius: BorderRadius.circular(6),
              border: Border.all(color: const Color(0x4DF59E0B)),
            ),
            child: const Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(Icons.bolt_rounded, size: 13, color: Color(0xFFFBBF24)),
                SizedBox(width: 3),
                Text(
                  'ল্যাব সিমুলেশন',
                  style: TextStyle(
                    fontSize: 10,
                    fontWeight: FontWeight.w700,
                    color: Color(0xFFFCD34D),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(width: 8),
          Expanded(
            child: Text(
              title,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: const TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.w700,
                color: PorhiTheme.slate200,
              ),
            ),
          ),
          IconButton(
            onPressed: onReload,
            tooltip: 'পুনরায় শুরু',
            icon: const Icon(
              Icons.refresh_rounded,
              size: 18,
              color: PorhiTheme.slate400,
            ),
          ),
          IconButton(
            onPressed: onToggleFullscreen,
            tooltip: isFullscreen ? 'পূর্ণস্ক্রীন বন্ধ' : 'পূর্ণস্ক্রীন',
            icon: Icon(
              isFullscreen
                  ? Icons.fullscreen_exit_rounded
                  : Icons.fullscreen_rounded,
              size: 20,
              color: PorhiTheme.slate400,
            ),
          ),
        ],
      ),
    );
  }
}
