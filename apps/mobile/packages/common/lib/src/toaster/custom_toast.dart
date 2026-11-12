import 'dart:async';

import 'package:common/common.dart';
import 'package:flutter/material.dart';
// Removed GetX dependency; using ValueNotifier instead

typedef ToastBuilder = Widget Function(int id, String message);

class CustomToast {
  static final Map<int, String> _overlayMessageList = {};
  static final Map<int, ToastBuilder?> _overlayToastBuilderList = {};
  static final Map<int, Duration> _overlayToastDurationList = {};
  static final ValueNotifier<List<int>> showingOverlayIds = ValueNotifier([]);
  static final showingOverlayKeys = <GlobalKey<_ItemWrapperState>>[];
  static OverlayEntry? overlayEntry;
  static Duration? enterExitDuration;

  // Add an item to the list
  static void _addItem(
      int id, String data, ToastBuilder? builder, Duration visibleDuration) {
    _overlayMessageList.putIfAbsent(id, () => data);
    _overlayToastBuilderList.putIfAbsent(id, () => builder);
    _overlayToastDurationList.putIfAbsent(id, () => visibleDuration);
    if (showingOverlayIds.value.length < 3) {
      _showItem(id, data);
    }
  }

  static void _showItem(int id, String data) {
    final si = List<int>.from(showingOverlayIds.value);
    si.add(id);
    showingOverlayKeys.add(GlobalKey(debugLabel: id.toString()));
    showingOverlayIds.value = si;
    Future.delayed(_overlayToastDurationList[id]!, () {
      int index = showingOverlayIds.value.indexOf(id);
      if (index >= 0) showingOverlayKeys[index].currentState?.hide();
    });
  }

  // Remove an item from the list
  static void hide(int id) {
    int index = showingOverlayIds.value.indexOf(id);
    if (index >= 0) {
      showingOverlayKeys[index].currentState?.hide();
    }
  }

  static void _hide(int id) {
    if (_overlayMessageList[id] != null) {
      final v = List<int>.from(showingOverlayIds.value);
      final index = v.indexOf(id);
      if (index >= 0) {
        v.removeAt(index);
        showingOverlayKeys.removeAt(index);
      }
      _overlayMessageList.remove(id);
      _overlayToastBuilderList.remove(id);
      _overlayToastDurationList.remove(id);
      showingOverlayIds.value = v;
      if (_overlayMessageList.length >= 3) {
        final t = _overlayMessageList.keys.toList()[2];
        _showItem(t, _overlayMessageList[t]!);
      }
      if (_overlayMessageList.isEmpty) {
        overlayEntry?.remove();
        overlayEntry = null;
      }
    }
  }

  // Show a toast message
  static int show({
    required String message,
    ToastBuilder? builder,
    Duration visibleDuration = const Duration(milliseconds: 5000),
  }) {
    var id = DateTime.now().microsecondsSinceEpoch;
    if (_overlayMessageList.containsKey(id)) {
      id += 10;
    }
    _addItem(id, message, builder, visibleDuration);
    if (overlayEntry != null) return id;
    final overlay = Common.navigatorKey.currentState?.overlay;
    if (overlay == null) return id;

    // Create a new OverlayEntry for the toast
    overlayEntry = OverlayEntry(
      builder: (context) => ValueListenableBuilder<List<int>>(
        valueListenable: showingOverlayIds,
        builder: (context, ids, _) {
          return Padding(
            padding: const EdgeInsets.only(top: kToolbarHeight),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: List.generate(ids.length, (index) {
                int id = ids[index];
                return ItemWrapper(
                  key: showingOverlayKeys[index],
                  item: _overlayToastBuilderList[id] == null
                      ? Card(
                          margin: const EdgeInsets.symmetric(
                              vertical: 5.0, horizontal: 10.0),
                          child: ListTile(
                            title: Text(_overlayMessageList[id]!),
                            trailing: IconButton(
                              icon: const Icon(Icons.delete, color: Colors.red),
                              onPressed: () => _hide(id),
                            ),
                          ),
                        )
                      : _overlayToastBuilderList[id]!(
                          id, _overlayMessageList[id]!),
                  onClose: () => _hide(id),
                );
              }),
            ),
          );
        },
      ),
    );

    // Insert the new overlay entry into the overlay
    overlay.insert(overlayEntry!);
    return id;
  }
}

class ItemWrapper extends StatefulWidget {
  final Widget item;
  final Function() onClose;

  const ItemWrapper({super.key, required this.item, required this.onClose});

  @override
  State<ItemWrapper> createState() => _ItemWrapperState();
}

class _ItemWrapperState extends State<ItemWrapper> {
  double state = 0.0;

  @override
  void initState() {
    Future.delayed(const Duration(milliseconds: 100), show);
    super.initState();
  }

  FutureOr<Null> show() {
    set(1);
  }

  void set(double v) {
    setState(() {
      state = v;
    });
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedAlign(
      alignment: Alignment.topLeft,
      duration:
          CustomToast.enterExitDuration ?? const Duration(milliseconds: 300),
      widthFactor: state,
      heightFactor: state,
      child: AnimatedOpacity(
          opacity: state,
          duration: CustomToast.enterExitDuration ??
              const Duration(milliseconds: 300),
          child: widget.item),
    );
  }

  void hide() {
    set(0);
    Future.delayed(
        CustomToast.enterExitDuration ?? const Duration(milliseconds: 300), () {
      widget.onClose();
    });
  }
}
