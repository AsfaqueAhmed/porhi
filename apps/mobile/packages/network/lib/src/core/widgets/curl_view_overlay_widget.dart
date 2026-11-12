import 'package:flutter/material.dart';
import 'package:network/app/modules/curl/controllers/curl_controller.dart';
import 'package:network/app/modules/curl/views/curl_view.dart';

class CurlViewWrapper extends StatelessWidget {
  final Widget child;
  final bool show;

  /// The app's root navigator key (e.g. GetX's `Get.key`, or whatever key
  /// is passed to `MaterialApp.navigatorKey`). Required to actually open
  /// [CurlView]: this wrapper sits inside `MaterialApp.builder`, where
  /// `child` is the app's Navigator but this widget's own context is an
  /// *ancestor* of it, not a descendant -- so `Navigator.of(context)` from
  /// here (or from anything built as a sibling of `child`, like the
  /// overlay button) can never find it. Pushing through the key's
  /// `currentState` instead sidesteps context lookup entirely.
  final GlobalKey<NavigatorState>? navigatorKey;

  const CurlViewWrapper({
    super.key,
    required this.child,
    this.show = false,
    this.navigatorKey,
  });

  @override
  Widget build(BuildContext context) {
    final curlController = CurlController.instance;
    return show
        ? Stack(
            children: [
              child,
              AnimatedBuilder(
                animation: curlController,
                builder: (_, __) {
                  bool showCurlWidget = curlController.showCurlWidget;
                  if (showCurlWidget) {
                    return CurlViewOverlayWidget(navigatorKey: navigatorKey);
                  }
                  // Must stay Positioned, not a plain SizedBox: swapping a
                  // Positioned child for a non-Positioned one at the same
                  // Stack slot leaves the RenderObject's Stack parentData in
                  // an inconsistent state, which trips a Flutter framework
                  // assertion ('!semantics.parentDataDirty') during the next
                  // semantics flush.
                  return const Positioned(
                    top: 100,
                    right: 0,
                    child: SizedBox.shrink(),
                  );
                },
              ),
            ],
          )
        : child;
  }
}

class CurlViewOverlayWidget extends StatelessWidget {
  const CurlViewOverlayWidget({super.key, this.navigatorKey});

  final GlobalKey<NavigatorState>? navigatorKey;

  @override
  Widget build(BuildContext context) {
    return Positioned(
      top: 100,
      right: 0,
      child: GestureDetector(
        onTap: () {
          final route = MaterialPageRoute(builder: (_) => const CurlView());
          final navigatorState = navigatorKey?.currentState;
          if (navigatorState != null) {
            navigatorState.push(route);
          } else {
            // Only correct if this widget happens to be placed somewhere
            // that already has a Navigator ancestor -- not true for the
            // default MaterialApp.builder placement above.
            Navigator.of(context).push(route);
          }
        },
        child: Container(
          color: Colors.grey.withValues(alpha: 0.5),
          width: 15,
          height: 100,
          child: const FittedBox(
            child: Icon(
              Icons.keyboard_arrow_left,
              size: 20,
              color: Colors.black,
            ),
          ),
        ),
      ),
    );
  }
}
