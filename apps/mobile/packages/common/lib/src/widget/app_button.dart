import 'package:common/common.dart';
import 'package:flutter/material.dart';

class AppButton extends StatelessWidget {
  final String title;
  final Function() onTap;

  final Color? textColor;
  final TextStyle? style;

  final Color? bgColor;
  final Color? borderColor;
  final double? borderRadius;

  final List<BoxShadow>? boxShadow;

  const AppButton({
    super.key,
    required this.title,
    required this.onTap,
    this.bgColor,
    this.textColor,
    this.style,
    this.borderColor,
    this.borderRadius,
    this.boxShadow,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        height: Common.appButtonStyle.buttonHeight,
        decoration: BoxDecoration(
          color: bgColor ?? Common.appButtonStyle.bgColor,
          borderRadius: BorderRadius.circular(
            borderRadius ?? Common.appButtonStyle.borderRadius,
          ),
          border:
              (borderColor != null || Common.appButtonStyle.borderColor != null)
                  ? Border.all(
                      color: borderColor ??
                          Common.appButtonStyle.borderColor ??
                          Colors.transparent,
                    )
                  : null,
          boxShadow: boxShadow ?? Common.appButtonStyle.boxShadow,
        ),
        child: Center(
          child: FittedBox(
            child: Text(
              title,
              style: style ?? Common.appButtonStyle.textStyle,
            ),
          ),
        ),
      ),
    );
  }
}
