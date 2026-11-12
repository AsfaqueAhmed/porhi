import 'package:common/common.dart';
import 'package:flutter/material.dart';

enum ConfirmationDialogResponse { yes, no }

class ConfirmationDialog extends StatelessWidget {
  final bool hideButtons;
  final Color bgColor;
  final Color? textColor;

  final double iconSize;
  final String? dialogIconName;

  final String? title;
  final String? message;

  final String? rightButtonTitle;
  final String? leftButtonTitle;
  final VoidCallback? onRightButtonTap;
  final VoidCallback? onLeftButtonTap;

  final AppButtonStyle leftButtonStyle;
  final AppButtonStyle rightButtonStyle;

  const ConfirmationDialog._({
    this.hideButtons = false,
    required this.bgColor,
    required this.iconSize,
    this.dialogIconName,
    this.title,
    this.message,
    required this.rightButtonTitle,
    required this.leftButtonTitle,
    this.onRightButtonTap,
    this.onLeftButtonTap,
    this.textColor,
    required this.leftButtonStyle,
    required this.rightButtonStyle,
  });

  static Future<ConfirmationDialogResponse> show({
    double? iconSize,
    String? dialogIconName,
    String? title,
    String? message,
    String? rightButtonTitle,
    String? leftButtonTitle,
    VoidCallback? onRightButtonTap,
    VoidCallback? onLeftButtonTap,
    bool canDismiss = true,
    bool hideButtons = false,
    bool fullScreenDialog = false,
    Color? bgColor,
    Color? textColor,
    Color? barrierColor,
    Color? backgroundColor,
    AppButtonStyle? leftButtonStyle,
    AppButtonStyle? rightButtonStyle,
  }) async {
    final ctx = Common.navigatorKey.currentState?.overlay?.context;
    if (ctx == null) return ConfirmationDialogResponse.no;

    return await showDialog<ConfirmationDialogResponse>(
          context: ctx,
          barrierColor: (fullScreenDialog && barrierColor != null)
              ? barrierColor
              : Colors.black26,
          barrierDismissible: canDismiss,
          // ignore: deprecated_member_use
          builder: (context) => WillPopScope(
            onWillPop: () async => canDismiss,
            child: ConfirmationDialog._(
              iconSize: iconSize ?? Common.confirmationDialogStyle.iconSize,
              dialogIconName: dialogIconName,
              message: message,
              rightButtonTitle: rightButtonTitle,
              leftButtonTitle: leftButtonTitle,
              title: title,
              onRightButtonTap: onRightButtonTap,
              bgColor: bgColor ?? Common.confirmationDialogStyle.bgColor,
              textColor: textColor,
              onLeftButtonTap: onLeftButtonTap,
              hideButtons: hideButtons,
              leftButtonStyle: leftButtonStyle ??
                  Common.confirmationDialogStyle.leftButtonStyle,
              rightButtonStyle: rightButtonStyle ??
                  Common.confirmationDialogStyle.rightButtonStyle,
            ),
          ),
        ) ??
        ConfirmationDialogResponse.no;
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      contentPadding: const EdgeInsets.symmetric(
        vertical: 20,
        horizontal: 16,
      ),
      surfaceTintColor: bgColor,
      backgroundColor: bgColor,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.all(
          Radius.circular(8),
        ),
      ),
      content: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (dialogIconName != null)
            SizedBox(
              width: iconSize,
              height: iconSize,
              child: Image.asset(
                dialogIconName!,
                height: double.infinity,
                width: double.infinity,
                fit: BoxFit.cover,
              ),
            ),
          if (dialogIconName != null) const SizedBox(height: 20),
          if (title != null)
            Container(
              alignment: Alignment.center,
              child: Text(
                title!,
                textAlign: TextAlign.center,
                style: Common.confirmationDialogStyle.titleStyle.copyWith(
                  color: textColor,
                ),
              ),
            ),
          if (message != null)
            Container(
              alignment: Alignment.center,
              padding: const EdgeInsets.symmetric(vertical: 10),
              child: Text(
                message!,
                textAlign: TextAlign.center,
                style: Common.confirmationDialogStyle.contentStyle.copyWith(
                  color: textColor,
                ),
              ),
            ),
          const SizedBox(height: 16),
          if (!hideButtons)
            Row(
              children: [
                if (leftButtonTitle != null)
                  Expanded(
                    child: AppButton(
                      title: leftButtonTitle!,
                      textColor: leftButtonStyle.textColor,
                      style: leftButtonStyle.textStyle,
                      bgColor: leftButtonStyle.bgColor,
                      borderColor: leftButtonStyle.borderColor,
                      borderRadius: leftButtonStyle.borderRadius,
                      boxShadow: leftButtonStyle.boxShadow,
                      onTap: onLeftButtonTap ??
                          () => Navigator.of(context).pop(
                                ConfirmationDialogResponse.no,
                              ),
                    ),
                  ),
                if (rightButtonTitle != null && leftButtonTitle != null)
                  const SizedBox(width: 16),
                if (rightButtonTitle != null)
                  Expanded(
                    child: AppButton(
                      title: rightButtonTitle!,
                      textColor: rightButtonStyle.textColor,
                      style: rightButtonStyle.textStyle,
                      bgColor: rightButtonStyle.bgColor,
                      borderColor: rightButtonStyle.borderColor,
                      borderRadius: rightButtonStyle.borderRadius,
                      boxShadow: rightButtonStyle.boxShadow,
                      onTap: onRightButtonTap ??
                          () => Navigator.of(context).pop(
                                ConfirmationDialogResponse.yes,
                              ),
                    ),
                  ),
              ],
            )
        ],
      ),
    );
  }
}
