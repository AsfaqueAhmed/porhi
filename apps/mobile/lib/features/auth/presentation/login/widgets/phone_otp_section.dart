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
      final isLoading = controller.isOtpLoading.value;
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
          const SizedBox(height: 10),
          TextField(
            key: const Key('phone_input_field'),
            controller: controller.phoneController,
            enabled: !otpSent && !isLoading,
            keyboardType: TextInputType.phone,
            decoration: InputDecoration(
              labelText: AppStrings.tr(
                'মোবাইল নম্বর (01XXXXXXXXX)',
                'Mobile number (01XXXXXXXXX)',
                lang,
              ),
              prefixIcon: const Icon(Icons.phone_android_rounded),
              hintText: '01712345678',
            ),
          ),
          if (otpSent) ...<Widget>[
            const SizedBox(height: 12),
            TextField(
              key: const Key('otp_input_field'),
              controller: controller.otpController,
              enabled: !isLoading,
              keyboardType: TextInputType.number,
              maxLength: 6,
              decoration: InputDecoration(
                labelText: AppStrings.tr(
                  '৬ সংখ্যার OTP কোড',
                  '6-digit OTP code',
                  lang,
                ),
                prefixIcon: const Icon(Icons.lock_outline_rounded),
                counterText: '',
              ),
            ),
            const SizedBox(height: 8),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: <Widget>[
                TextButton(
                  onPressed: isLoading ? null : controller.editPhoneNumber,
                  child: Text(
                    AppStrings.tr('নম্বর পরিবর্তন', 'Change number', lang),
                  ),
                ),
                TextButton(
                  key: const Key('resend_otp_button'),
                  onPressed: (isLoading || remaining > 0)
                      ? null
                      : () => controller.requestPhoneOtp(isResend: true),
                  child: Text(
                    remaining > 0
                        ? AppStrings.tr(
                            'আবার পাঠান (${AppStrings.formatNumber(remaining, lang)}s)',
                            'Resend in ${remaining}s',
                            lang,
                          )
                        : AppStrings.tr('পুনরায় OTP পাঠান', 'Resend OTP', lang),
                  ),
                ),
              ],
            ),
          ],
          const SizedBox(height: 12),
          ElevatedButton(
            key: Key(otpSent ? 'verify_otp_button' : 'send_otp_button'),
            onPressed: isLoading
                ? null
                : (otpSent ? controller.verifyOtp : controller.requestPhoneOtp),
            child: isLoading
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
                  ),
          ),
        ],
      );
    });
  }
}
