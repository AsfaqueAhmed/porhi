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
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: <Widget>[
              Align(
                alignment: Alignment.centerRight,
                child: Obx(() {
                  final lang = controller.language.value;
                  return OutlinedButton.icon(
                    onPressed: controller.toggleLanguage,
                    icon: const Icon(Icons.translate_rounded, size: 18),
                    label: Text(lang == AppLanguage.bn ? 'EN' : 'বাংলা'),
                  );
                }),
              ),
              const SizedBox(height: 16),
              Center(
                child: Container(
                  width: 72,
                  height: 72,
                  decoration: BoxDecoration(
                    color: PorhiTheme.indigo50,
                    borderRadius: BorderRadius.circular(20),
                  ),
                  alignment: Alignment.center,
                  child: const Text(
                    'পড়ি',
                    style: TextStyle(
                      fontSize: 28,
                      fontWeight: FontWeight.w800,
                      color: PorhiTheme.indigo600,
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 16),
              Obx(() {
                final lang = controller.language.value;
                return Column(
                  children: <Widget>[
                    Text(
                      AppStrings.appName(lang),
                      textAlign: TextAlign.center,
                      style: const TextStyle(
                        fontSize: 26,
                        fontWeight: FontWeight.w800,
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
                        fontSize: 14,
                        color: PorhiTheme.slate600,
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
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: PorhiTheme.rose600.withValues(alpha: 0.08),
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(
                      color: PorhiTheme.rose600.withValues(alpha: 0.3),
                    ),
                  ),
                  child: Text(
                    err,
                    style: const TextStyle(
                      color: PorhiTheme.rose600,
                      fontSize: 13,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                );
              }),
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(18),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: <Widget>[
                      Obx(() {
                        final lang = controller.language.value;
                        final loading = controller.isGoogleLoading.value;
                        return OutlinedButton.icon(
                          key: const Key('google_signin_button'),
                          style: OutlinedButton.styleFrom(
                            minimumSize: const Size(0, 50),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(12),
                            ),
                            side: const BorderSide(color: PorhiTheme.slate200),
                          ),
                          onPressed: controller.isBusy
                              ? null
                              : controller.signInWithGoogle,
                          icon: loading
                              ? const SizedBox(
                                  width: 18,
                                  height: 18,
                                  child: CircularProgressIndicator(
                                    strokeWidth: 2,
                                  ),
                                )
                              : const Icon(
                                  Icons.g_mobiledata_rounded,
                                  size: 28,
                                  color: PorhiTheme.indigo600,
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
                      const SizedBox(height: 18),
                      Obx(() {
                        final lang = controller.language.value;
                        return Row(
                          children: <Widget>[
                            const Expanded(child: Divider()),
                            Padding(
                              padding: const EdgeInsets.symmetric(
                                horizontal: 12,
                              ),
                              child: Text(
                                AppStrings.tr('অথবা', 'OR', lang),
                                style: const TextStyle(
                                  fontSize: 12,
                                  fontWeight: FontWeight.w600,
                                  color: PorhiTheme.slate400,
                                ),
                              ),
                            ),
                            const Expanded(child: Divider()),
                          ],
                        );
                      }),
                      const SizedBox(height: 18),
                      PhoneOtpSection(controller: controller),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
