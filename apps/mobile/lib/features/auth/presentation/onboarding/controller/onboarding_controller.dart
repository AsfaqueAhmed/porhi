import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/features/auth/domain/entities/auth_user_entity.dart';
import 'package:porhi/features/auth/domain/usecases/auth_usecases.dart';
import 'package:porhi/routes/app_routes.dart';

class OnboardingController extends GetxController {
  final UpdateProfileUseCase _updateProfileUseCase;
  final GetCachedUserUseCase _getCachedUserUseCase;
  final GetLanguageUseCase _getLanguageUseCase;
  final SetLanguageUseCase _setLanguageUseCase;

  OnboardingController({
    required this._updateProfileUseCase,
    required this._getCachedUserUseCase,
    required this._getLanguageUseCase,
    required this._setLanguageUseCase,
  });

  final GlobalKey<FormState> formKey = GlobalKey<FormState>();
  final TextEditingController nameController = TextEditingController();
  final TextEditingController boardController = TextEditingController();

  final Rx<StudentTrack> selectedTrack = StudentTrack.ssc.obs;
  final RxInt dailyStudyGoalMinutes = 30.obs;
  final Rx<AppLanguage> language = AppLanguage.bn.obs;
  final RxBool isSubmitting = false.obs;
  final RxnString errorMessage = RxnString();

  @override
  void onInit() {
    super.onInit();
    language.value = AppLanguage.fromCode(_getLanguageUseCase());
    final cached = _getCachedUserUseCase();
    if (cached != null) {
      if (cached.fullName != null && cached.fullName!.trim().isNotEmpty) {
        nameController.text = cached.fullName!;
      }
      selectedTrack.value = cached.selectedClass;
      if (cached.boardName != null && cached.boardName!.trim().isNotEmpty) {
        boardController.text = cached.boardName!;
      }
      if (cached.dailyStudyGoalMinutes != null) {
        dailyStudyGoalMinutes.value = cached.dailyStudyGoalMinutes!;
      }
    }
  }

  void selectTrack(StudentTrack track) {
    selectedTrack.value = track;
  }

  void selectDailyGoal(int minutes) {
    dailyStudyGoalMinutes.value = minutes;
  }

  Future<void> setLanguage(AppLanguage next) async {
    language.value = next;
    await _setLanguageUseCase(next.code);
  }

  String? validateFullName(String? value) {
    final trimmed = value?.trim() ?? '';
    if (trimmed.isEmpty) {
      return AppStrings.tr(
        'আপনার পূর্ণ নাম লিখুন',
        'Please enter your full name',
        language.value,
      );
    }
    if (trimmed.length > 80) {
      return AppStrings.tr(
        'নাম সর্বোচ্চ ৮০ অক্ষরের মধ্যে হতে হবে',
        'Name must be 80 characters or fewer',
        language.value,
      );
    }
    return null;
  }

  Future<void> submit() async {
    if (isSubmitting.value) return;
    if (!(formKey.currentState?.validate() ?? false)) return;

    errorMessage.value = null;
    isSubmitting.value = true;
    try {
      await _setLanguageUseCase(language.value.code);
      final board = boardController.text.trim();
      final result = await _updateProfileUseCase(
        UpdateProfileParams(
          fullName: nameController.text.trim(),
          selectedClass: selectedTrack.value,
          boardName: board.isEmpty ? null : board,
          dailyStudyGoalMinutes: dailyStudyGoalMinutes.value,
        ),
      );

      result.fold(
        (err) {
          errorMessage.value = err.message ??
              AppStrings.tr(
                'প্রোফাইল সংরক্ষণ করা যায়নি। আবার চেষ্টা করুন।',
                'Could not save profile. Please try again.',
                language.value,
              );
        },
        (_) {
          Get.offAllNamed(AppRoutes.home);
        },
      );
    } finally {
      isSubmitting.value = false;
    }
  }

  @override
  void onClose() {
    nameController.dispose();
    boardController.dispose();
    super.onClose();
  }
}
