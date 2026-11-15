import 'package:common/common.dart';
import 'package:flutter/material.dart';

enum ConfirmationDialogResponse { yes, no }

class ConfirmationDialog extends StatelessWidget {
  final bool hideButtons;
  final Color? bgColor;
  final Color? textColor;

  final double? iconSize;
  final String? dialogIconName;
  final IconData? icon;
  final Color? iconColor;
  final Color? iconBackgroundColor;

  final String? title;
  final String? message;
  final Widget? contentWidget;

  final String? rightButtonTitle;
  final String? leftButtonTitle;
  final String? middleButtonTitle;
  final Key? rightButtonKey;
  final Key? leftButtonKey;
  final Key? middleButtonKey;
  final VoidCallback? onRightButtonTap;
  final VoidCallback? onLeftButtonTap;
  final VoidCallback? onMiddleButtonTap;
  final Object? rightButtonResult;
  final Object? leftButtonResult;
  final Object? middleButtonResult;

  final AppButtonStyle? leftButtonStyle;
  final AppButtonStyle? middleButtonStyle;
  final AppButtonStyle? rightButtonStyle;

  const ConfirmationDialog({
    super.key,
    this.hideButtons = false,
    this.bgColor,
    this.iconSize,
    this.dialogIconName,
    this.icon,
    this.iconColor,
    this.iconBackgroundColor,
    this.title,
    this.message,
    this.contentWidget,
    this.rightButtonTitle,
    this.leftButtonTitle,
    this.middleButtonTitle,
    this.rightButtonKey,
    this.leftButtonKey,
    this.middleButtonKey,
    this.onRightButtonTap,
    this.onLeftButtonTap,
    this.onMiddleButtonTap,
    this.rightButtonResult,
    this.leftButtonResult,
    this.middleButtonResult,
    this.textColor,
    this.leftButtonStyle,
    this.middleButtonStyle,
    this.rightButtonStyle,
  });

  static Future<T?> show<T>({
    BuildContext? context,
    double? iconSize,
    String? dialogIconName,
    IconData? icon,
    Color? iconColor,
    Color? iconBackgroundColor,
    String? title,
    String? message,
    Widget? contentWidget,
    String? rightButtonTitle,
    String? leftButtonTitle,
    String? middleButtonTitle,
    Key? rightButtonKey,
    Key? leftButtonKey,
    Key? middleButtonKey,
    VoidCallback? onRightButtonTap,
    VoidCallback? onLeftButtonTap,
    VoidCallback? onMiddleButtonTap,
    T? rightButtonResult,
    T? leftButtonResult,
    T? middleButtonResult,
    bool canDismiss = true,
    bool hideButtons = false,
    bool fullScreenDialog = false,
    Color? bgColor,
    Color? textColor,
    Color? barrierColor,
    AppButtonStyle? leftButtonStyle,
    AppButtonStyle? middleButtonStyle,
    AppButtonStyle? rightButtonStyle,
  }) async {
    final ctx = context ?? Common.maybeNavigatorKey?.currentState?.overlay?.context;
    if (ctx == null) return null;

    return showDialog<T>(
      context: ctx,
      barrierColor: barrierColor ??
          (fullScreenDialog ? Colors.black38 : const Color(0x660F172A)),
      barrierDismissible: canDismiss,
      builder: (_) => PopScope(
        canPop: canDismiss,
        child: ConfirmationDialog(
          iconSize: iconSize,
          dialogIconName: dialogIconName,
          icon: icon,
          iconColor: iconColor,
          iconBackgroundColor: iconBackgroundColor,
          message: message,
          contentWidget: contentWidget,
          rightButtonTitle: rightButtonTitle,
          leftButtonTitle: leftButtonTitle,
          middleButtonTitle: middleButtonTitle,
          rightButtonKey: rightButtonKey,
          leftButtonKey: leftButtonKey,
          middleButtonKey: middleButtonKey,
          title: title,
          onRightButtonTap: onRightButtonTap,
          onLeftButtonTap: onLeftButtonTap,
          onMiddleButtonTap: onMiddleButtonTap,
          rightButtonResult: rightButtonResult,
          leftButtonResult: leftButtonResult,
          middleButtonResult: middleButtonResult,
          bgColor: bgColor,
          textColor: textColor,
          hideButtons: hideButtons,
          leftButtonStyle: leftButtonStyle,
          middleButtonStyle: middleButtonStyle,
          rightButtonStyle: rightButtonStyle,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final dialogStyle =
        Common.isInitiated() ? Common.confirmationDialogStyle : null;
    final resolvedBg = bgColor ?? dialogStyle?.bgColor ?? Colors.white;
    final resolvedRadius = dialogStyle?.dialogBorderRadius ?? 22.0;
    final resolvedIconSize = iconSize ?? dialogStyle?.iconSize ?? 40.0;
    final resolvedTitleStyle = (dialogStyle?.titleStyle ??
            const TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w700,
              color: Color(0xFF18241F),
            ))
        .copyWith(color: textColor);
    final resolvedContentStyle = (dialogStyle?.contentStyle ??
            const TextStyle(
              fontSize: 14,
              height: 1.5,
              color: Color(0xFF5F6D63),
            ))
        .copyWith(color: textColor);

    final resolvedLeftStyle = leftButtonStyle ??
        dialogStyle?.leftButtonStyle ??
        AppButtonStyle(
          textColor: const Color(0xFF18241F),
          textStyle: const TextStyle(
            fontSize: 15,
            fontWeight: FontWeight.w600,
            color: Color(0xFF18241F),
          ),
          bgColor: const Color(0xFFF7F7F1),
          borderColor: const Color(0xFFE0E4DB),
          borderRadius: 12,
          buttonHeight: 48,
        );
    final resolvedRightStyle = rightButtonStyle ??
        dialogStyle?.rightButtonStyle ??
        AppButtonStyle(
          textColor: Colors.white,
          textStyle: const TextStyle(
            fontSize: 15,
            fontWeight: FontWeight.w700,
            color: Colors.white,
          ),
          bgColor: const Color(0xFF007B63),
          borderRadius: 16,
          buttonHeight: 48,
        );
    final resolvedMiddleStyle = middleButtonStyle ?? resolvedLeftStyle;

    return AlertDialog(
      insetPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 24),
      contentPadding: const EdgeInsets.fromLTRB(22, 22, 22, 20),
      surfaceTintColor: resolvedBg,
      backgroundColor: resolvedBg,
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(resolvedRadius),
        side: const BorderSide(color: Color(0xFFE5E5D9)),
      ),
      content: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 380),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            if (dialogIconName != null) ...[
              Center(
                child: SizedBox(
                  width: resolvedIconSize,
                  height: resolvedIconSize,
                  child: Image.asset(
                    dialogIconName!,
                    fit: BoxFit.contain,
                  ),
                ),
              ),
              const SizedBox(height: 16),
            ] else if (icon != null) ...[
              Center(
                child: Container(
                  width: 52,
                  height: 52,
                  decoration: BoxDecoration(
                    color: iconBackgroundColor ?? const Color(0xFFE5F1EC),
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: Icon(
                    icon,
                    size: 26,
                    color: iconColor ?? const Color(0xFF007B63),
                  ),
                ),
              ),
              const SizedBox(height: 14),
            ],
            if (title != null)
              Text(
                title!,
                textAlign: TextAlign.center,
                style: resolvedTitleStyle,
              ),
            if (message != null) ...[
              SizedBox(height: title != null ? 8 : 0),
              Text(
                message!,
                textAlign: TextAlign.center,
                style: resolvedContentStyle,
              ),
            ],
            if (contentWidget != null) ...[
              SizedBox(height: (title != null || message != null) ? 14 : 0),
              contentWidget!,
            ],
            if (!hideButtons &&
                (leftButtonTitle != null ||
                    middleButtonTitle != null ||
                    rightButtonTitle != null)) ...[
              const SizedBox(height: 20),
              if (middleButtonTitle != null)
                Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    if (rightButtonTitle != null)
                      AppButton(
                        key: rightButtonKey,
                        title: rightButtonTitle!,
                        textColor: resolvedRightStyle.textColor,
                        style: resolvedRightStyle.textStyle,
                        bgColor: resolvedRightStyle.bgColor,
                        borderColor: resolvedRightStyle.borderColor,
                        borderRadius: resolvedRightStyle.borderRadius,
                        boxShadow: resolvedRightStyle.boxShadow,
                        onTap: onRightButtonTap ??
                            () => Navigator.of(context).pop(
                                  rightButtonResult ??
                                      ConfirmationDialogResponse.yes,
                                ),
                      ),
                    if (rightButtonTitle != null) const SizedBox(height: 10),
                    AppButton(
                      key: middleButtonKey,
                      title: middleButtonTitle!,
                      textColor: resolvedMiddleStyle.textColor,
                      style: resolvedMiddleStyle.textStyle,
                      bgColor: resolvedMiddleStyle.bgColor,
                      borderColor: resolvedMiddleStyle.borderColor,
                      borderRadius: resolvedMiddleStyle.borderRadius,
                      boxShadow: resolvedMiddleStyle.boxShadow,
                      onTap: onMiddleButtonTap ??
                          () => Navigator.of(context).pop(middleButtonResult),
                    ),
                    if (leftButtonTitle != null) const SizedBox(height: 10),
                    if (leftButtonTitle != null)
                      AppButton(
                        key: leftButtonKey,
                        title: leftButtonTitle!,
                        textColor: resolvedLeftStyle.textColor,
                        style: resolvedLeftStyle.textStyle,
                        bgColor: resolvedLeftStyle.bgColor,
                        borderColor: resolvedLeftStyle.borderColor,
                        borderRadius: resolvedLeftStyle.borderRadius,
                        boxShadow: resolvedLeftStyle.boxShadow,
                        onTap: onLeftButtonTap ??
                            () => Navigator.of(context).pop(
                                  leftButtonResult ??
                                      ConfirmationDialogResponse.no,
                                ),
                      ),
                  ],
                )
              else
                Row(
                  children: [
                    if (leftButtonTitle != null)
                      Expanded(
                        child: AppButton(
                          key: leftButtonKey,
                          title: leftButtonTitle!,
                          textColor: resolvedLeftStyle.textColor,
                          style: resolvedLeftStyle.textStyle,
                          bgColor: resolvedLeftStyle.bgColor,
                          borderColor: resolvedLeftStyle.borderColor,
                          borderRadius: resolvedLeftStyle.borderRadius,
                          boxShadow: resolvedLeftStyle.boxShadow,
                          onTap: onLeftButtonTap ??
                              () => Navigator.of(context).pop(
                                    leftButtonResult ??
                                        ConfirmationDialogResponse.no,
                                  ),
                        ),
                      ),
                    if (rightButtonTitle != null && leftButtonTitle != null)
                      const SizedBox(width: 12),
                    if (rightButtonTitle != null)
                      Expanded(
                        child: AppButton(
                          key: rightButtonKey,
                          title: rightButtonTitle!,
                          textColor: resolvedRightStyle.textColor,
                          style: resolvedRightStyle.textStyle,
                          bgColor: resolvedRightStyle.bgColor,
                          borderColor: resolvedRightStyle.borderColor,
                          borderRadius: resolvedRightStyle.borderRadius,
                          boxShadow: resolvedRightStyle.boxShadow,
                          onTap: onRightButtonTap ??
                              () => Navigator.of(context).pop(
                                    rightButtonResult ??
                                        ConfirmationDialogResponse.yes,
                                  ),
                        ),
                      ),
                  ],
                ),
            ],
          ],
        ),
      ),
    );
  }
}
