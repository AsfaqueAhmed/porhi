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
    final defaultStyle = Common.isInitiated() ? Common.appButtonStyle : null;
    final resolvedHeight = defaultStyle?.buttonHeight ?? 48.0;
    final resolvedBg = bgColor ?? defaultStyle?.bgColor ?? const Color(0xFF007B63);
    final resolvedRadius = borderRadius ?? defaultStyle?.borderRadius ?? 14.0;
    final resolvedBorderColor = borderColor ?? defaultStyle?.borderColor;
    final resolvedShadow = boxShadow ?? defaultStyle?.boxShadow;
    final baseTextStyle = style ??
        defaultStyle?.textStyle ??
        const TextStyle(fontSize: 15, fontWeight: FontWeight.w700);
    final resolvedTextStyle = textColor != null
        ? baseTextStyle.copyWith(color: textColor)
        : baseTextStyle;

    return GestureDetector(
      behavior: HitTestBehavior.opaque,
      onTap: onTap,
      child: Container(
        height: resolvedHeight,
        padding: const EdgeInsets.symmetric(horizontal: 14),
        decoration: BoxDecoration(
          color: resolvedBg,
          borderRadius: BorderRadius.circular(resolvedRadius),
          border: resolvedBorderColor != null
              ? Border.all(color: resolvedBorderColor)
              : null,
          boxShadow: resolvedShadow,
        ),
        child: Center(
          child: FittedBox(
            fit: BoxFit.scaleDown,
            child: Text(
              title,
              maxLines: 1,
              style: resolvedTextStyle,
            ),
          ),
        ),
      ),
    );
  }
}
