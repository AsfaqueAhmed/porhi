library common;

import 'package:flutter/material.dart';

import 'common.dart';

export 'package:common/src/dialog/confirmation_dialog.dart';
export 'package:common/src/extension/date_time_extension.dart';
export 'package:common/src/extension/num_extension.dart';
export 'package:common/src/extension/string_extension.dart';
export 'package:common/src/extension/time_of_day_extension.dart';
export 'package:common/src/logger/logger.dart';
export 'package:common/src/models/app_button_style.dart';
export 'package:common/src/models/confirmation_dialog_style.dart';
export 'package:common/src/service/base_storage_service.dart';
export 'package:common/src/toaster/custom_toast.dart';
export 'package:common/src/util/index.dart';
export 'package:common/src/widget/app_button.dart';

class Common {
  static Common? _instance;
  static late bool loggerEnabled;
  static AppButtonStyle? _appButtonStyle;
  static ConfirmationDialogStyle? _confirmationDialogStyle;
  static GlobalKey<NavigatorState>? _navigatorKey;

  Common get instance {
    if (_instance == null) {
      throw Exception('Common sdk not initialized yet');
    }
    return _instance!;
  }

  static init({
    required bool enableLogger,
    String? storageBucket,
    AppButtonStyle? primaryButtonStyle,
    ConfirmationDialogStyle? appConfirmationDialogStyle,
    GlobalKey<NavigatorState>? navigatorKey,
  }) async{
    _instance ??= Common._(enableLogger: enableLogger);
    await BaseStorageService.init(storageBucket);
    _appButtonStyle = primaryButtonStyle;
    _confirmationDialogStyle = appConfirmationDialogStyle;
    _navigatorKey = navigatorKey;
  }

  Common._({required bool enableLogger}) {
    loggerEnabled = enableLogger;
  }

  static bool isInitiated() {
    return _instance != null;
  }

  static AppButtonStyle get appButtonStyle {
    if (_appButtonStyle == null) {
      throw Exception('App button style must be initialized');
    }
    return _appButtonStyle!;
  }

  static ConfirmationDialogStyle get confirmationDialogStyle {
    if (_confirmationDialogStyle == null) {
      throw Exception('Confirmation dialog style must be initialized');
    }
    return _confirmationDialogStyle!;
  }

  static GlobalKey<NavigatorState> get navigatorKey {
    if (_navigatorKey == null) {
      throw Exception('Navigator key is not initialized');
    }
    return _navigatorKey!;
  }
}
