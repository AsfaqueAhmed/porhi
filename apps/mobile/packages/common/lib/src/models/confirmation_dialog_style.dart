import 'package:common/common.dart';
import 'package:flutter/material.dart';

class ConfirmationDialogStyle {
  Color bgColor;
  double dialogBorderRadius;
  double iconSize;
  TextStyle titleStyle;
  TextStyle contentStyle;
  AppButtonStyle rightButtonStyle;
  AppButtonStyle leftButtonStyle;

  ConfirmationDialogStyle({
    required this.bgColor,
    required this.dialogBorderRadius,
    required this.iconSize,
    required this.titleStyle,
    required this.contentStyle,
    required this.rightButtonStyle,
    required this.leftButtonStyle,
  });
}
