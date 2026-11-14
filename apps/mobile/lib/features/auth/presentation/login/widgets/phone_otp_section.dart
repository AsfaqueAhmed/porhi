import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/core/theme/porhi_theme.dart';
import 'package:porhi/features/auth/presentation/login/controller/login_controller.dart';

class PhoneOtpSection extends StatelessWidget {
  final LoginController controller;

  const PhoneOtpSection({super.key, required this.controller});

  @override
  Widget build(BuildContext context) {
    return Obx(() {
      final lang = controller.language.value;
      final otpSent = controller.otpSent.value;
      final isOtpLoading = controller.isOtpLoading.value;
      final isBusy = controller.isBusy;
      final remaining = controller.resendSecondsRemaining.value;

      return Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: <Widget>[
          Text(
            AppStrings.tr(
              'ফোন নম্বর দিয়ে লগইন করুন',
              'Sign in with Phone OTP',
              lang,
            ),
            style: const TextStyle(
              fontSize: 15,
              fontWeight: FontWeight.w700,
              color: PorhiTheme.slate900,
            ),
          ),
          const SizedBox(height: 12),
          TextField(
            key: const Key('phone_input_field'),
            controller: controller.phoneController,
            enabled: !otpSent && !isBusy,
            keyboardType: TextInputType.phone,
            decoration: InputDecoration(
              labelText: AppStrings.tr(
                'মোবাইল নম্বর (01XXXXXXXXX)',
                'Mobile number (01XXXXXXXXX)',
                lang,
              ),
              prefixIcon: const Icon(
                Icons.phone_iphone_rounded,
                color: PorhiTheme.indigo600,
              ),
              hintText: '01712345678',
            ),
          ),
          if (otpSent) ...<Widget>[
            const SizedBox(height: 14),
            TextField(
              key: const Key('otp_input_field'),
              controller: controller.otpController,
              enabled: !isBusy,
              keyboardType: TextInputType.number,
              maxLength: 6,
              style: const TextStyle(
                fontSize: 18,
                letterSpacing: 4,
                fontWeight: FontWeight.w700,
              ),
              decoration: InputDecoration(
                labelText: AppStrings.tr(
                  '৬ সংখ্যার OTP কোড',
                  '6-digit OTP code',
                  lang,
                ),
                prefixIcon: const Icon(
                  Icons.shield_outlined,
                  color: PorhiTheme.indigo600,
                ),
                counterText: '',
              ),
            ),
            const SizedBox(height: 6),
            Wrap(
              alignment: WrapAlignment.spaceBetween,
              crossAxisAlignment: WrapCrossAlignment.center,
              spacing: 8,
              runSpacing: 4,
              children: <Widget>[
                TextButton(
                  onPressed: isBusy ? null : controller.editPhoneNumber,
                  style: TextButton.styleFrom(
                    padding: const EdgeInsets.symmetric(horizontal: 8),
                    minimumSize: const Size(0, 36),
                    tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                  ),
                  child: Text(
                    AppStrings.tr('নম্বর পরিবর্তন', 'Change number', lang),
                    style: const TextStyle(
                      fontSize: 13,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
                TextButton(
                  key: const Key('resend_otp_button'),
                  onPressed: (isBusy || remaining > 0)
                      ? null
                      : () => controller.requestPhoneOtp(isResend: true),
                  style: TextButton.styleFrom(
                    padding: const EdgeInsets.symmetric(horizontal: 8),
                    minimumSize: const Size(0, 36),
                    tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                  ),
                  child: Text(
                    remaining > 0
                        ? AppStrings.tr(
                            'আবার পাঠান (${AppStrings.formatNumber(remaining, lang)}s)',
                            'Resend in ${remaining}s',
                            lang,
                          )
                        : AppStrings.tr('পুনরায় OTP পাঠান', 'Resend OTP', lang),
                    style: TextStyle(
                      fontSize: 13,
                      fontWeight: FontWeight.w700,
                      color: remaining > 0
                          ? PorhiTheme.slate400
                          : PorhiTheme.indigo600,
                    ),
                  ),
                ),
              ],
            ),
          ],
          const SizedBox(height: 14),
          ElevatedButton(
            key: Key(otpSent ? 'verify_otp_button' : 'send_otp_button'),
            style: ElevatedButton.styleFrom(
              minimumSize: const Size(0, 52),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(14),
              ),
            ),
            onPressed: isBusy
                ? null
                : (otpSent ? controller.verifyOtp : controller.requestPhoneOtp),
            child: isOtpLoading
                ? const SizedBox(
                    width: 20,
                    height: 20,
                    child: CircularProgressIndicator(
                      strokeWidth: 2,
                      color: Colors.white,
                    ),
                  )
                : Text(
                    otpSent
                        ? AppStrings.tr('OTP যাচাই করুন', 'Verify OTP', lang)
                        : AppStrings.tr('OTP পাঠান', 'Send OTP', lang),
                    style: const TextStyle(
                      fontSize: 15,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
          ),
        ],
      );
    });
  }
}
