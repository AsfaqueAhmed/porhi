import 'package:flutter/material.dart';

abstract class SnackBarViewer {
  static final key = GlobalKey<ScaffoldMessengerState>();

  static ScaffoldFeatureController<SnackBar, SnackBarClosedReason>?
      showSnackBar(SnackBar snackBar) {
    if(key.currentState==null){
      throw Exception("SnackBar key never used");
    }
    close();
    return key.currentState?.showSnackBar(snackBar);
  }

  static void close() => key.currentState?.clearSnackBars();
}
