import 'dart:async';

import 'package:flutter/material.dart';
import 'package:path/path.dart' as p;
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

bool _looksLikeDevicePath(String rawUrl) {
  return rawUrl.startsWith('/data/') ||
      rawUrl.startsWith('/storage/') ||
      rawUrl.startsWith('/var/') ||
      rawUrl.startsWith('/Users/') ||
      rawUrl.startsWith('/tmp/');
}

bool _hasExplicitScheme(String value) {
  final colonIdx = value.indexOf(':');
  if (colonIdx <= 0) return false;
  final prefix = value.substring(0, colonIdx);
  return RegExp(r'^[a-zA-Z][a-zA-Z0-9+.-]*$').hasMatch(prefix);
}

/// Resolves an interactive lab URL, local offline HTML path, or inline HTML snippet.
/// Rejects dangerous schemes (`javascript:`, `intent:`, `data:`, `blob:`, etc.).
ResolvedLabSource resolveInteractiveLabSource({
  String? widgetUrl,
  String? htmlContent,
  EnvConfig? envConfig,
  bool forceLocalFile = false,
  bool allowLocalFile = true,
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

  if (rawUrl.toLowerCase().startsWith('file://')) {
    if (!allowLocalFile) {
      return const ResolvedLabSource(source: '', isLocalFile: false, isHtml: false);
    }
    final localPath = tryParseLocalFilePath(rawUrl);
    if (localPath == null) {
      return const ResolvedLabSource(source: '', isLocalFile: false, isHtml: false);
    }
    return ResolvedLabSource(
      source: localPath,
      isLocalFile: true,
      isHtml: false,
    );
  }

  if (_hasExplicitScheme(rawUrl) || rawUrl.startsWith('//')) {
    final webUri = tryParseAllowedWebUri(rawUrl);
    if (webUri == null) {
      return const ResolvedLabSource(source: '', isLocalFile: false, isHtml: false);
    }
    return ResolvedLabSource(
      source: webUri.toString(),
      isLocalFile: false,
      isHtml: false,
    );
  }

  if (allowLocalFile && (forceLocalFile || _looksLikeDevicePath(rawUrl))) {
    return ResolvedLabSource(
      source: rawUrl,
      isLocalFile: true,
      isHtml: false,
    );
  }

  final resolved = resolvePorhiMediaUrl(rawUrl, envConfig: envConfig);
  final webUri = tryParseAllowedWebUri(resolved);
  if (webUri == null) {
    return const ResolvedLabSource(source: '', isLocalFile: false, isHtml: false);
  }

  return ResolvedLabSource(
    source: webUri.toString(),
    isLocalFile: false,
    isHtml: false,
  );
}

/// Navigation guard for [InteractiveLabWebView].
/// Blocks `javascript:`, `intent:`, `data:`, unexpected `file://`, and cross-origin redirects.
NavigationDecision decideInteractiveLabNavigation(
  String url, {
  Uri? initialUri,
  String? initialLocalFilePath,
  required bool isLocalFile,
  required bool isHtml,
}) {
  final trimmed = url.trim();
  if (trimmed == 'about:blank') {
    return NavigationDecision.navigate;
  }

  if (isHtml) {
    return NavigationDecision.prevent;
  }

  final uri = Uri.tryParse(trimmed);
  if (uri == null) {
    return NavigationDecision.prevent;
  }
  final scheme = uri.scheme.toLowerCase();

  if (isLocalFile) {
    if (scheme != 'file' || initialLocalFilePath == null) {
      return NavigationDecision.prevent;
    }
    final targetPath = tryParseLocalFilePath(trimmed);
    if (targetPath == null) {
      return NavigationDecision.prevent;
    }
    final normalizedRoot = p.normalize(p.dirname(initialLocalFilePath));
    final normalizedTarget = p.normalize(targetPath);
    if (normalizedTarget == normalizedRoot ||
        p.isWithin(normalizedRoot, normalizedTarget)) {
      return NavigationDecision.navigate;
    }
    return NavigationDecision.prevent;
  }

  if ((scheme != 'http' && scheme != 'https') || initialUri == null) {
    return NavigationDecision.prevent;
  }

  if (uri.scheme.toLowerCase() == initialUri.scheme.toLowerCase() &&
      uri.host.toLowerCase() == initialUri.host.toLowerCase() &&
      uri.port == initialUri.port) {
    return NavigationDecision.navigate;
  }

  return NavigationDecision.prevent;
}

/// Sandboxed HTML5 interactive lab runner with reload, offline `loadFile`, and fullscreen mode.
class InteractiveLabWebView extends StatefulWidget {
  final String? widgetUrl;
  final String? htmlContent;
  final String title;
  final double height;
  final bool forceLocalFile;
  final bool allowLocalFile;
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
    this.allowLocalFile = true,
    this.envConfig,
    this.webViewBuilder,
    this.onReloadCallback,
  });

  @override
  State<InteractiveLabWebView> createState() => _InteractiveLabWebViewState();
}

class _InteractiveLabWebViewState extends State<InteractiveLabWebView> {
  WebViewController? _controller;
  final ValueNotifier<int> _reloadTickNotifier = ValueNotifier<int>(0);
  final ValueNotifier<bool> _isLoadingNotifier = ValueNotifier<bool>(false);
  bool _isFullscreenOpen = false;
  bool _disposed = false;

  ResolvedLabSource get _resolved => resolveInteractiveLabSource(
        widgetUrl: widget.widgetUrl,
        htmlContent: widget.htmlContent,
        envConfig: widget.envConfig,
        forceLocalFile: widget.forceLocalFile,
        allowLocalFile: widget.allowLocalFile,
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
        oldWidget.forceLocalFile != widget.forceLocalFile ||
        oldWidget.allowLocalFile != widget.allowLocalFile) {
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
          onNavigationRequest: (request) {
            final current = _resolved;
            return decideInteractiveLabNavigation(
              request.url,
              initialUri: !current.isLocalFile && !current.isHtml
                  ? Uri.tryParse(current.source)
                  : null,
              initialLocalFilePath: current.isLocalFile ? current.source : null,
              isLocalFile: current.isLocalFile,
              isHtml: current.isHtml,
            );
          },
          onPageStarted: (_) {
            if (!mounted || _disposed) return;
            _isLoadingNotifier.value = true;
          },
          onPageFinished: (_) {
            if (!mounted || _disposed) return;
            _isLoadingNotifier.value = false;
          },
          onWebResourceError: (_) {
            if (!mounted || _disposed) return;
            _isLoadingNotifier.value = false;
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
    _isLoadingNotifier.value = true;
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
      _isLoadingNotifier.value = false;
    }
  }

  void _reload() {
    widget.onReloadCallback?.call();
    _reloadTickNotifier.value = _reloadTickNotifier.value + 1;
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
    return ListenableBuilder(
      listenable: Listenable.merge([_reloadTickNotifier, _isLoadingNotifier]),
      builder: (context, _) {
        if (widget.webViewBuilder != null) {
          return KeyedSubtree(
            key: ValueKey('lab-${_reloadTickNotifier.value}'),
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
            if (_isLoadingNotifier.value)
              const Positioned(
                top: 0,
                left: 0,
                right: 0,
                child: LinearProgressIndicator(minHeight: 2),
              ),
          ],
        );
      },
    );
  }

  @override
  void dispose() {
    _disposed = true;
    final controller = _controller;
    _controller = null;
    if (controller != null) {
      try {
        unawaited(controller.loadRequest(Uri.parse('about:blank')));
      } catch (_) {}
    }
    _reloadTickNotifier.dispose();
    _isLoadingNotifier.dispose();
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
    super.allowLocalFile = true,
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
