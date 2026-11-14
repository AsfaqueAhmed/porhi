import 'dart:async';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/features/auth/domain/entities/auth_user_entity.dart';
import 'package:porhi/features/auth/domain/usecases/auth_usecases.dart';
import 'package:porhi/routes/app_routes.dart';

class LoginController extends GetxController {
  static const int resendCooldownSeconds = 60;

  final SignInWithGoogleUseCase _signInWithGoogleUseCase;
  final RequestPhoneOtpUseCase _requestPhoneOtpUseCase;
  final VerifyPhoneOtpUseCase _verifyPhoneOtpUseCase;
  final GetLanguageUseCase _getLanguageUseCase;
  final SetLanguageUseCase _setLanguageUseCase;
  final GetAuthConfigUseCase? _getAuthConfigUseCase;
  final SignInAsGuestUseCase? _signInAsGuestUseCase;

  LoginController({
    required this._signInWithGoogleUseCase,
    required this._requestPhoneOtpUseCase,
    required this._verifyPhoneOtpUseCase,
    required this._getLanguageUseCase,
    required this._setLanguageUseCase,
    this._getAuthConfigUseCase,
    this._signInAsGuestUseCase,
    bool? initialGuestLoginEnabled,
  }) {
    isGuestLoginEnabled.value =
        initialGuestLoginEnabled ?? (_getAuthConfigUseCase != null);
  }

  final TextEditingController phoneController = TextEditingController();
  final TextEditingController otpController = TextEditingController();

  final RxBool isGoogleLoading = false.obs;
  final RxBool isOtpLoading = false.obs;
  final RxBool isGuestLoading = false.obs;
  final RxBool isGuestLoginEnabled = false.obs;
  final RxBool otpSent = false.obs;
  final RxInt resendSecondsRemaining = 0.obs;
  final RxnString errorMessage = RxnString();
  final Rx<AppLanguage> language = AppLanguage.bn.obs;

  String? _verificationId;
  int? _resendToken;
  Timer? _resendTimer;

  bool get isBusy =>
      isGoogleLoading.value || isOtpLoading.value || isGuestLoading.value;

  @override
  void onInit() {
    super.onInit();
    language.value = AppLanguage.fromCode(_getLanguageUseCase());
    unawaited(loadAuthConfig());
  }

  Future<void> loadAuthConfig() async {
    final getConfig = _getAuthConfigUseCase;
    if (getConfig == null) return;
    final result = await getConfig();
    if (isClosed) return;
    result.fold(
      (_) {},
      (config) {
        isGuestLoginEnabled.value = config.guestLoginEnabled;
      },
    );
  }

  Future<void> signInAsGuest() async {
    if (isBusy) return;
    final guestUseCase = _signInAsGuestUseCase;
    if (guestUseCase == null) return;

    errorMessage.value = null;
    isGuestLoading.value = true;
    try {
      final result = await guestUseCase();
      if (isClosed) return;
      result.fold(
        (err) {
          if (err.statusCode == 403) {
            isGuestLoginEnabled.value = false;
          }
          errorMessage.value = err.message ??
              AppStrings.tr(
                'গেস্ট লগইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।',
                'Guest sign-in failed. Please try again.',
                language.value,
              );
        },
        _handleAuthenticatedSession,
      );
    } finally {
      if (!isClosed) {
        isGuestLoading.value = false;
      }
    }
  }

  Future<void> toggleLanguage() async {
    final next =
        language.value == AppLanguage.bn ? AppLanguage.en : AppLanguage.bn;
    language.value = next;
    await _setLanguageUseCase(next.code);
    if (isClosed) return;
  }

  Future<void> signInWithGoogle() async {
    if (isBusy) return;
    errorMessage.value = null;
    isGoogleLoading.value = true;
    try {
      final result = await _signInWithGoogleUseCase();
      if (isClosed) return;
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
      if (!isClosed) {
        isGoogleLoading.value = false;
      }
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
      if (isClosed) return;
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
      if (!isClosed) {
        isOtpLoading.value = false;
      }
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
      if (isClosed) return;
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
      if (!isClosed) {
        isOtpLoading.value = false;
      }
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
    if (!session.user.isGuest &&
        (session.isNewUser || session.user.needsOnboarding)) {
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
