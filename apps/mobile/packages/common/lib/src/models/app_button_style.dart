import 'package:flutter/material.dart';

class AppButtonStyle {
  Color textColor;
  TextStyle textStyle;

  Color bgColor;
  Color? borderColor;
  double borderRadius;
  List<BoxShadow>? boxShadow;

  double buttonHeight;

  AppButtonStyle({
    required this.textColor,
    required this.textStyle,
    required this.bgColor,
    this.borderColor,
    this.borderRadius = 0,
    this.boxShadow,
    this.buttonHeight = 52,
  });

  AppButtonStyle copyWith({
    Color? textColor,
    TextStyle? textStyle,
    Color? bgColor,
    Color? borderColor,
    double? borderRadius,
    List<BoxShadow>? boxShadow,
    double? buttonHeight,
  }) {
    return AppButtonStyle(
      textColor: textColor ?? this.textColor,
      textStyle: textStyle ?? this.textStyle,
      bgColor: bgColor ?? this.bgColor,
      borderColor: borderColor ?? this.borderColor,
      borderRadius: borderRadius ?? this.borderRadius,
      boxShadow: boxShadow ?? this.boxShadow,
      buttonHeight: buttonHeight ?? this.buttonHeight,
    );
  }
}
