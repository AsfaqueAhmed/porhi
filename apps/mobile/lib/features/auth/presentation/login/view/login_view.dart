import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/core/theme/porhi_theme.dart';
import 'package:porhi/features/auth/presentation/login/controller/login_controller.dart';
import 'package:porhi/features/auth/presentation/login/widgets/phone_otp_section.dart';

class LoginView extends GetView<LoginController> {
  const LoginView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: PorhiTheme.canvas,
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 20),
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 440),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: <Widget>[
                  Align(
                    alignment: Alignment.centerRight,
                    child: Obx(() {
                      final lang = controller.language.value;
                      return OutlinedButton.icon(
                        style: OutlinedButton.styleFrom(
                          minimumSize: const Size(0, 36),
                          padding: const EdgeInsets.symmetric(
                            horizontal: 14,
                            vertical: 6,
                          ),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(999),
                          ),
                          side: const BorderSide(color: PorhiTheme.slate200),
                          backgroundColor: Colors.white,
                        ),
                        onPressed: controller.toggleLanguage,
                        icon: const Icon(
                          Icons.translate_rounded,
                          size: 16,
                          color: PorhiTheme.indigo600,
                        ),
                        label: Text(
                          lang == AppLanguage.bn ? 'English' : 'বাংলা',
                          style: const TextStyle(
                            fontSize: 13,
                            fontWeight: FontWeight.w600,
                            color: PorhiTheme.slate700,
                          ),
                        ),
                      );
                    }),
                  ),
                  const SizedBox(height: 12),
                  Center(
                    child: Container(
                      width: 80,
                      height: 80,
                      decoration: BoxDecoration(
                        gradient: PorhiTheme.brandGradient,
                        borderRadius: BorderRadius.circular(24),
                        boxShadow: PorhiTheme.brandShadow,
                      ),
                      alignment: Alignment.center,
                      child: const Text(
                        'পড়ি',
                        style: TextStyle(
                          fontSize: 34,
                          fontWeight: FontWeight.w900,
                          color: Colors.white,
                          letterSpacing: -0.5,
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 18),
                  Obx(() {
                    final lang = controller.language.value;
                    return Column(
                      children: <Widget>[
                        Text(
                          AppStrings.appName(lang),
                          textAlign: TextAlign.center,
                          style: const TextStyle(
                            fontSize: 28,
                            fontWeight: FontWeight.w900,
                            letterSpacing: -0.5,
                            color: PorhiTheme.slate900,
                          ),
                        ),
                        const SizedBox(height: 6),
                        Text(
                          AppStrings.tr(
                            'আপনার পড়াশোনা চালিয়ে যেতে লগইন করুন',
                            'Sign in to continue your learning journey',
                            lang,
                          ),
                          textAlign: TextAlign.center,
                          style: const TextStyle(
                            fontSize: 14.5,
                            color: PorhiTheme.slate600,
                            height: 1.4,
                          ),
                        ),
                      ],
                    );
                  }),
                  const SizedBox(height: 24),
                  Obx(() {
                    final err = controller.errorMessage.value;
                    if (err == null || err.isEmpty) {
                      return const SizedBox.shrink();
                    }
                    return Container(
                      margin: const EdgeInsets.only(bottom: 16),
                      padding: const EdgeInsets.symmetric(
                        horizontal: 14,
                        vertical: 12,
                      ),
                      decoration: BoxDecoration(
                        color: PorhiTheme.rose50,
                        borderRadius: BorderRadius.circular(14),
                        border: Border.all(
                          color: PorhiTheme.rose600.withValues(alpha: 0.25),
                        ),
                      ),
                      child: Row(
                        children: <Widget>[
                          const Icon(
                            Icons.error_outline_rounded,
                            size: 18,
                            color: PorhiTheme.rose600,
                          ),
                          const SizedBox(width: 10),
                          Expanded(
                            child: Text(
                              err,
                              style: const TextStyle(
                                color: PorhiTheme.rose600,
                                fontSize: 13,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ),
                        ],
                      ),
                    );
                  }),
                  Container(
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(20),
                      border: Border.all(color: const Color(0xFFE8ECF4)),
                      boxShadow: PorhiTheme.cardShadow,
                    ),
                    padding: const EdgeInsets.all(22),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: <Widget>[
                        Obx(() {
                          final lang = controller.language.value;
                          final loading = controller.isGoogleLoading.value;
                          return OutlinedButton.icon(
                            key: const Key('google_signin_button'),
                            style: OutlinedButton.styleFrom(
                              minimumSize: const Size(0, 52),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(14),
                              ),
                              side: const BorderSide(
                                color: PorhiTheme.slate200,
                                width: 1.2,
                              ),
                              backgroundColor: Colors.white,
                            ),
                            onPressed: controller.isBusy
                                ? null
                                : controller.signInWithGoogle,
                            icon: loading
                                ? const SizedBox(
                                    width: 20,
                                    height: 20,
                                    child: CircularProgressIndicator(
                                      strokeWidth: 2,
                                    ),
                                  )
                                : Container(
                                    padding: const EdgeInsets.all(3),
                                    decoration: BoxDecoration(
                                      color: PorhiTheme.indigo50,
                                      borderRadius: BorderRadius.circular(8),
                                    ),
                                    child: const Icon(
                                      Icons.g_mobiledata_rounded,
                                      size: 26,
                                      color: PorhiTheme.indigo600,
                                    ),
                                  ),
                            label: Text(
                              AppStrings.tr(
                                'Google দিয়ে চালিয়ে যান',
                                'Continue with Google',
                                lang,
                              ),
                              style: const TextStyle(
                                fontSize: 15,
                                fontWeight: FontWeight.w700,
                                color: PorhiTheme.slate900,
                              ),
                            ),
                          );
                        }),
                        const SizedBox(height: 20),
                        Obx(() {
                          final lang = controller.language.value;
                          return Row(
                            children: <Widget>[
                              const Expanded(child: Divider()),
                              Padding(
                                padding: const EdgeInsets.symmetric(
                                  horizontal: 14,
                                ),
                                child: Container(
                                  padding: const EdgeInsets.symmetric(
                                    horizontal: 10,
                                    vertical: 3,
                                  ),
                                  decoration: BoxDecoration(
                                    color: PorhiTheme.slate100,
                                    borderRadius: BorderRadius.circular(999),
                                  ),
                                  child: Text(
                                    AppStrings.tr('অথবা', 'OR', lang),
                                    style: const TextStyle(
                                      fontSize: 11,
                                      fontWeight: FontWeight.w700,
                                      color: PorhiTheme.slate500,
                                    ),
                                  ),
                                ),
                              ),
                              const Expanded(child: Divider()),
                            ],
                          );
                        }),
                        const SizedBox(height: 20),
                        PhoneOtpSection(controller: controller),
                        Obx(() {
                          if (!controller.isGuestLoginEnabled.value) {
                            return const SizedBox.shrink();
                          }
                          final lang = controller.language.value;
                          final loading = controller.isGuestLoading.value;
                          return Column(
                            crossAxisAlignment: CrossAxisAlignment.stretch,
                            children: <Widget>[
                              const SizedBox(height: 20),
                              Row(
                                children: <Widget>[
                                  const Expanded(child: Divider()),
                                  Padding(
                                    padding: const EdgeInsets.symmetric(
                                      horizontal: 14,
                                    ),
                                    child: Container(
                                      padding: const EdgeInsets.symmetric(
                                        horizontal: 10,
                                        vertical: 3,
                                      ),
                                      decoration: BoxDecoration(
                                        color: PorhiTheme.slate100,
                                        borderRadius:
                                            BorderRadius.circular(999),
                                      ),
                                      child: Text(
                                        AppStrings.tr('অথবা', 'OR', lang),
                                        style: const TextStyle(
                                          fontSize: 11,
                                          fontWeight: FontWeight.w700,
                                          color: PorhiTheme.slate500,
                                        ),
                                      ),
                                    ),
                                  ),
                                  const Expanded(child: Divider()),
                                ],
                              ),
                              const SizedBox(height: 20),
                              OutlinedButton.icon(
                                key: const Key('guest_signin_button'),
                                style: OutlinedButton.styleFrom(
                                  minimumSize: const Size(0, 52),
                                  backgroundColor: PorhiTheme.indigo50,
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(14),
                                  ),
                                  side: const BorderSide(
                                    color: PorhiTheme.indigo600,
                                    width: 1.2,
                                  ),
                                ),
                                onPressed: controller.isBusy
                                    ? null
                                    : controller.signInAsGuest,
                                icon: loading
                                    ? const SizedBox(
                                        width: 20,
                                        height: 20,
                                        child: CircularProgressIndicator(
                                          strokeWidth: 2,
                                        ),
                                      )
                                    : const Icon(
                                        Icons.bolt_rounded,
                                        size: 22,
                                        color: PorhiTheme.indigo600,
                                      ),
                                label: Text(
                                  AppStrings.tr(
                                    'গেস্ট হিসেবে শুরু করুন',
                                    'Continue as Guest',
                                    lang,
                                  ),
                                  style: const TextStyle(
                                    fontSize: 15,
                                    fontWeight: FontWeight.w700,
                                    color: PorhiTheme.indigo600,
                                  ),
                                ),
                              ),
                            ],
                          );
                        }),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
