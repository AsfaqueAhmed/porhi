import 'dart:async';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/core/storage/preferences_storage_service.dart';
import 'package:porhi/features/auth/domain/entities/auth_user_entity.dart';
import 'package:porhi/features/auth/domain/usecases/auth_usecases.dart';
import 'package:porhi/routes/app_routes.dart';

class LoginController extends GetxController {
  static const int resendCooldownSeconds = 60;

  final SignInWithGoogleUseCase _signInWithGoogleUseCase;
  final RequestPhoneOtpUseCase _requestPhoneOtpUseCase;
  final VerifyPhoneOtpUseCase _verifyPhoneOtpUseCase;
  final PreferencesStorageService _preferencesStorage;

  LoginController({
    required this._signInWithGoogleUseCase,
    required this._requestPhoneOtpUseCase,
    required this._verifyPhoneOtpUseCase,
    required this._preferencesStorage,
  });

  final TextEditingController phoneController = TextEditingController();
  final TextEditingController otpController = TextEditingController();

  final RxBool isGoogleLoading = false.obs;
  final RxBool isOtpLoading = false.obs;
  final RxBool otpSent = false.obs;
  final RxInt resendSecondsRemaining = 0.obs;
  final RxnString errorMessage = RxnString();
  final Rx<AppLanguage> language = AppLanguage.bn.obs;

  String? _verificationId;
  int? _resendToken;
  Timer? _resendTimer;

  bool get isBusy => isGoogleLoading.value || isOtpLoading.value;

  @override
  void onInit() {
    super.onInit();
    language.value = AppLanguage.fromCode(_preferencesStorage.getLanguage());
  }

  Future<void> toggleLanguage() async {
    final next =
        language.value == AppLanguage.bn ? AppLanguage.en : AppLanguage.bn;
    language.value = next;
    await _preferencesStorage.setLanguage(next.code);
  }

  Future<void> signInWithGoogle() async {
    if (isBusy) return;
    errorMessage.value = null;
    isGoogleLoading.value = true;
    try {
      final result = await _signInWithGoogleUseCase();
      result.fold(
        (err) {
          errorMessage.value = err.message ??
              AppStrings.tr(
                'Google লগইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।',
                'Google sign-in failed. Please try again.',
                language.value,
              );
        },
        _handleAuthenticatedSession,
      );
    } finally {
      isGoogleLoading.value = false;
    }
  }

  Future<void> requestPhoneOtp({bool isResend = false}) async {
    if (isBusy) return;
    if (isResend && resendSecondsRemaining.value > 0) return;

    errorMessage.value = null;
    isOtpLoading.value = true;
    try {
      final result = await _requestPhoneOtpUseCase(
        phoneController.text,
        forceResendingToken: isResend ? _resendToken : null,
      );
      result.fold(
        (err) {
          errorMessage.value = err.message ??
              AppStrings.tr(
                'OTP পাঠানো যায়নি। নম্বরটি যাচাই করুন।',
                'Could not send OTP. Check your phone number.',
                language.value,
              );
        },
        (otpResult) {
          switch (otpResult) {
            case PhoneOtpCodeSent(:final verificationId, :final resendToken):
              _verificationId = verificationId;
              _resendToken = resendToken;
              otpSent.value = true;
              otpController.clear();
              _startResendCooldown();
            case PhoneOtpAutoVerified(:final session):
              _handleAuthenticatedSession(session);
          }
        },
      );
    } finally {
      isOtpLoading.value = false;
    }
  }

  Future<void> verifyOtp() async {
    if (isBusy) return;
    errorMessage.value = null;
    isOtpLoading.value = true;
    try {
      final result = await _verifyPhoneOtpUseCase(
        verificationId: _verificationId ?? '',
        smsCode: otpController.text,
      );
      result.fold(
        (err) {
          errorMessage.value = err.message ??
              AppStrings.tr(
                'OTP কোডটি সঠিক নয় বা মেয়াদ শেষ হয়েছে।',
                'Invalid or expired OTP code.',
                language.value,
              );
        },
        _handleAuthenticatedSession,
      );
    } finally {
      isOtpLoading.value = false;
    }
  }

  void editPhoneNumber() {
    _resendTimer?.cancel();
    resendSecondsRemaining.value = 0;
    otpSent.value = false;
    _verificationId = null;
    otpController.clear();
    errorMessage.value = null;
  }

  void _startResendCooldown() {
    _resendTimer?.cancel();
    resendSecondsRemaining.value = resendCooldownSeconds;
    _resendTimer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (resendSecondsRemaining.value <= 1) {
        resendSecondsRemaining.value = 0;
        timer.cancel();
      } else {
        resendSecondsRemaining.value -= 1;
      }
    });
  }

  void _handleAuthenticatedSession(AuthSessionEntity session) {
    _resendTimer?.cancel();
    _resendTimer = null;
    resendSecondsRemaining.value = 0;
    if (session.isNewUser || session.user.needsOnboarding) {
      Get.offAllNamed(AppRoutes.onboarding);
    } else {
      Get.offAllNamed(AppRoutes.home);
    }
  }

  @override
  void onClose() {
    _resendTimer?.cancel();
    phoneController.dispose();
    otpController.dispose();
    super.onClose();
  }
}
