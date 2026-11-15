import 'dart:async';
import 'dart:io' show Platform;

import 'package:common/common.dart';
import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:flutter/material.dart';

typedef ToastBuilder = Widget Function(int id, String message);

enum ToastType { info, success, warning, error }

class _ToastEntryData {
  final int id;
  final String message;
  final ToastType type;
  final String? title;
  final ToastBuilder? builder;
  final Duration visibleDuration;

  const _ToastEntryData({
    required this.id,
    required this.message,
    required this.type,
    this.title,
    this.builder,
    required this.visibleDuration,
  });
}

class CustomToast {
  static final Map<int, _ToastEntryData> _overlayEntries = {};
  static final Map<int, Timer> _timers = {};
  static final ValueNotifier<List<int>> showingOverlayIds = ValueNotifier([]);
  static final List<GlobalKey<_ItemWrapperState>> _showingOverlayKeys = [];
  static OverlayEntry? overlayEntry;
  static Duration? enterExitDuration;

  /// Allows widget tests to opt into auto-dismiss timers when explicitly testing timer removal.
  static bool autoDismissInTests = false;

  static bool get _shouldAutoDismiss =>
      autoDismissInTests ||
      kIsWeb ||
      !Platform.environment.containsKey('FLUTTER_TEST');

  static OverlayState? _resolveOverlay(BuildContext? context) {
    if (context != null) {
      final found = Overlay.maybeOf(context, rootOverlay: true);
      if (found != null) return found;
    }
    return Common.maybeNavigatorKey?.currentState?.overlay;
  }

  static void _resetAllState() {
    for (final timer in _timers.values) {
      timer.cancel();
    }
    _timers.clear();
    _overlayEntries.clear();
    _showingOverlayKeys.clear();
    showingOverlayIds.value = <int>[];
    overlayEntry = null;
  }

  static void _addItem(_ToastEntryData entry) {
    _overlayEntries.putIfAbsent(entry.id, () => entry);
    if (showingOverlayIds.value.length < 3) {
      _showItem(entry);
    }
  }

  static void _showItem(_ToastEntryData entry) {
    final id = entry.id;
    final si = List<int>.from(showingOverlayIds.value);
    if (!si.contains(id)) {
      si.add(id);
      _showingOverlayKeys.add(GlobalKey<_ItemWrapperState>(debugLabel: '$id'));
      showingOverlayIds.value = si;
    }
    _timers.remove(id)?.cancel();
    if (_shouldAutoDismiss && entry.visibleDuration > Duration.zero) {
      _timers[id] = Timer(entry.visibleDuration, () => hide(id));
    }
  }

  static void hide(int id) {
    _timers.remove(id)?.cancel();
    final index = showingOverlayIds.value.indexOf(id);
    if (index >= 0 && index < _showingOverlayKeys.length) {
      final state = _showingOverlayKeys[index].currentState;
      if (state != null) {
        state.hide();
        return;
      }
    }
    _hide(id);
  }

  static void dismissAll() {
    overlayEntry?.remove();
    _resetAllState();
  }

  static void _hide(int id) {
    _timers.remove(id)?.cancel();
    if (!_overlayEntries.containsKey(id)) return;

    final v = List<int>.from(showingOverlayIds.value);
    final index = v.indexOf(id);
    if (index >= 0) {
      v.removeAt(index);
      if (index < _showingOverlayKeys.length) {
        _showingOverlayKeys.removeAt(index);
      }
    }
    _overlayEntries.remove(id);
    showingOverlayIds.value = v;

    if (_overlayEntries.length > v.length) {
      for (final nextEntry in _overlayEntries.values) {
        if (!v.contains(nextEntry.id) && showingOverlayIds.value.length < 3) {
          _showItem(nextEntry);
          break;
        }
      }
    }

    if (_overlayEntries.isEmpty) {
      overlayEntry?.remove();
      overlayEntry = null;
    }
  }

  static int show({
    required String message,
    ToastType type = ToastType.info,
    String? title,
    BuildContext? context,
    ToastBuilder? builder,
    Duration visibleDuration = const Duration(milliseconds: 3500),
  }) {
    var id = DateTime.now().microsecondsSinceEpoch;
    while (_overlayEntries.containsKey(id)) {
      id += 1;
    }

    // Clear stale overlay references if a previous route tree was unmounted.
    if (overlayEntry != null && !overlayEntry!.mounted) {
      _resetAllState();
    }

    final overlay = _resolveOverlay(context);
    if (overlay == null) {
      return id;
    }

    final entry = _ToastEntryData(
      id: id,
      message: message,
      type: type,
      title: title,
      builder: builder,
      visibleDuration: visibleDuration,
    );

    _addItem(entry);
    if (overlayEntry != null) return id;

    overlayEntry = OverlayEntry(
      builder: (ctx) => Positioned(
        top: 0,
        left: 0,
        right: 0,
        child: SafeArea(
          bottom: false,
          child: Align(
            alignment: Alignment.topCenter,
            child: ValueListenableBuilder<List<int>>(
              valueListenable: showingOverlayIds,
              builder: (ctx, ids, _) {
                return Padding(
                  padding: const EdgeInsets.only(top: 8),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: List.generate(ids.length, (index) {
                      final itemId = ids[index];
                      final data = _overlayEntries[itemId];
                      if (data == null) return const SizedBox.shrink();
                      return ItemWrapper(
                        key: _showingOverlayKeys[index],
                        item: data.builder != null
                            ? data.builder!(itemId, data.message)
                            : _DefaultPorhiToastCard(
                                data: data,
                                onDismiss: () => hide(itemId),
                              ),
                        onClose: () => _hide(itemId),
                      );
                    }),
                  ),
                );
              },
            ),
          ),
        ),
      ),
    );

    overlay.insert(overlayEntry!);
    return id;
  }

  static int success(
    String message, {
    String? title,
    BuildContext? context,
    Duration visibleDuration = const Duration(milliseconds: 3500),
  }) =>
      show(
        message: message,
        type: ToastType.success,
        title: title,
        context: context,
        visibleDuration: visibleDuration,
      );

  static int error(
    String message, {
    String? title,
    BuildContext? context,
    Duration visibleDuration = const Duration(milliseconds: 4000),
  }) =>
      show(
        message: message,
        type: ToastType.error,
        title: title,
        context: context,
        visibleDuration: visibleDuration,
      );

  static int warning(
    String message, {
    String? title,
    BuildContext? context,
    Duration visibleDuration = const Duration(milliseconds: 3500),
  }) =>
      show(
        message: message,
        type: ToastType.warning,
        title: title,
        context: context,
        visibleDuration: visibleDuration,
      );

  static int info(
    String message, {
    String? title,
    BuildContext? context,
    Duration visibleDuration = const Duration(milliseconds: 3500),
  }) =>
      show(
        message: message,
        type: ToastType.info,
        title: title,
        context: context,
        visibleDuration: visibleDuration,
      );
}

class _DefaultPorhiToastCard extends StatelessWidget {
  final _ToastEntryData data;
  final VoidCallback onDismiss;

  const _DefaultPorhiToastCard({
    required this.data,
    required this.onDismiss,
  });

  @override
  Widget build(BuildContext context) {
    final (
      Color borderColor,
      Color iconBg,
      Color iconColor,
      IconData iconData,
    ) = switch (data.type) {
      ToastType.success => (
          const Color(0xFFA7F3D0),
          const Color(0xFFECFDF5),
          const Color(0xFF059669),
          Icons.check_circle_rounded,
        ),
      ToastType.error => (
          const Color(0xFFFECDD3),
          const Color(0xFFFFF1F2),
          const Color(0xFFE11D48),
          Icons.error_outline_rounded,
        ),
      ToastType.warning => (
          const Color(0xFFFDE68A),
          const Color(0xFFFFFBEB),
          const Color(0xFFD97706),
          Icons.warning_amber_rounded,
        ),
      ToastType.info => (
          const Color(0xFFB7DFD3),
          const Color(0xFFE5F1EC),
          const Color(0xFF007B63),
          Icons.info_outline_rounded,
        ),
    };

    return Material(
      color: Colors.transparent,
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 440),
        child: Container(
          margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
          padding: const EdgeInsets.fromLTRB(12, 11, 8, 11),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: borderColor, width: 1.2),
            boxShadow: const [
              BoxShadow(
                color: Color(0x140F172A),
                blurRadius: 20,
                offset: Offset(0, 8),
              ),
              BoxShadow(
                color: Color(0x0A0F172A),
                blurRadius: 6,
                offset: Offset(0, 2),
              ),
            ],
          ),
          child: Row(
            children: [
              Container(
                width: 36,
                height: 36,
                decoration: BoxDecoration(
                  color: iconBg,
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Icon(iconData, size: 20, color: iconColor),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    if (data.title != null && data.title!.trim().isNotEmpty) ...[
                      Text(
                        data.title!,
                        style: const TextStyle(
                          fontSize: 13.5,
                          fontWeight: FontWeight.w800,
                          color: Color(0xFF18241F),
                        ),
                      ),
                      const SizedBox(height: 2),
                    ],
                    Text(
                      data.message,
                      style: TextStyle(
                        fontSize: 13.5,
                        fontWeight:
                            data.title != null ? FontWeight.w600 : FontWeight.w700,
                        color: const Color(0xFF18241F),
                        height: 1.35,
                      ),
                    ),
                  ],
                ),
              ),
              IconButton(
                onPressed: onDismiss,
                padding: EdgeInsets.zero,
                constraints: const BoxConstraints(minWidth: 32, minHeight: 32),
                icon: const Icon(
                  Icons.close_rounded,
                  size: 18,
                  color: Color(0xFF5F6D63),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class ItemWrapper extends StatefulWidget {
  final Widget item;
  final VoidCallback onClose;

  const ItemWrapper({super.key, required this.item, required this.onClose});

  @override
  State<ItemWrapper> createState() => _ItemWrapperState();
}

class _ItemWrapperState extends State<ItemWrapper> {
  bool _visible = false;
  bool _closing = false;
  Timer? _hideTimer;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted && !_closing) {
        setState(() => _visible = true);
      }
    });
  }

  @override
  void dispose() {
    _hideTimer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final duration =
        CustomToast.enterExitDuration ?? const Duration(milliseconds: 240);
    return AnimatedSlide(
      offset: _visible ? Offset.zero : const Offset(0, -0.35),
      duration: duration,
      curve: Curves.easeOutCubic,
      child: AnimatedOpacity(
        opacity: _visible ? 1.0 : 0.0,
        duration: duration,
        curve: Curves.easeOutCubic,
        child: widget.item,
      ),
    );
  }

  void hide() {
    if (_closing) return;
    _closing = true;
    if (mounted) {
      setState(() => _visible = false);
    }
    final duration =
        CustomToast.enterExitDuration ?? const Duration(milliseconds: 240);
    _hideTimer?.cancel();
    _hideTimer = Timer(duration, widget.onClose);
  }
}
