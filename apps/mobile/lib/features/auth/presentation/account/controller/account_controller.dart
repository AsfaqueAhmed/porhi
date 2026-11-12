import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/features/auth/domain/entities/auth_user_entity.dart';
import 'package:porhi/features/auth/domain/usecases/auth_usecases.dart';
import 'package:porhi/routes/app_routes.dart';

class AccountController extends GetxController {
  final GetMeUseCase _getMeUseCase;
  final UpdateProfileUseCase _updateProfileUseCase;
  final SignOutUseCase _signOutUseCase;
  final GetCachedUserUseCase _getCachedUserUseCase;
  final GetLanguageUseCase _getLanguageUseCase;
  final SetLanguageUseCase _setLanguageUseCase;
  final ClearOfflineDataUseCase _clearOfflineDataUseCase;

  AccountController({
    required this._getMeUseCase,
    required this._updateProfileUseCase,
    required this._signOutUseCase,
    required this._getCachedUserUseCase,
    required this._getLanguageUseCase,
    required this._setLanguageUseCase,
    required this._clearOfflineDataUseCase,
  });

  final GlobalKey<FormState> formKey = GlobalKey<FormState>();
  final TextEditingController nameController = TextEditingController();
  final TextEditingController boardController = TextEditingController();

  final Rxn<AuthUserEntity> user = Rxn<AuthUserEntity>();
  final Rx<StudentTrack> selectedTrack = StudentTrack.ssc.obs;
  final RxInt dailyStudyGoalMinutes = 30.obs;
  final Rx<AppLanguage> language = AppLanguage.bn.obs;

  final RxBool isLoading = false.obs;
  final RxBool isSaving = false.obs;
  final RxBool isClearingCache = false.obs;
  final RxBool isLoggingOut = false.obs;
  final RxnString statusMessage = RxnString();
  final RxnString errorMessage = RxnString();

  @override
  void onInit() {
    super.onInit();
    language.value = AppLanguage.fromCode(_getLanguageUseCase());
    final cached = _getCachedUserUseCase();
    if (cached != null) {
      _applyUser(cached);
    }
    loadProfile();
  }

  void _applyUser(AuthUserEntity entity) {
    user.value = entity;
    nameController.text = entity.fullName ?? '';
    selectedTrack.value = entity.selectedClass;
    boardController.text = entity.boardName ?? '';
    if (entity.dailyStudyGoalMinutes != null) {
      dailyStudyGoalMinutes.value = entity.dailyStudyGoalMinutes!;
    }
  }

  Future<void> loadProfile() async {
    isLoading.value = true;
    try {
      final result = await _getMeUseCase();
      result.fold(
        (err) {
          if (user.value == null) {
            errorMessage.value = err.message;
          }
        },
        _applyUser,
      );
    } finally {
      isLoading.value = false;
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

  Future<void> saveProfile() async {
    if (isSaving.value) return;
    if (!(formKey.currentState?.validate() ?? false)) return;

    errorMessage.value = null;
    statusMessage.value = null;
    isSaving.value = true;
    try {
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
                'প্রোফাইল আপডেট করা যায়নি।',
                'Could not update profile.',
                language.value,
              );
        },
        (updated) {
          _applyUser(updated);
          statusMessage.value = AppStrings.tr(
            'প্রোফাইল সংরক্ষিত হয়েছে।',
            'Profile saved.',
            language.value,
          );
        },
      );
    } finally {
      isSaving.value = false;
    }
  }

  Future<void> clearOfflineCache() async {
    if (isClearingCache.value) return;
    errorMessage.value = null;
    statusMessage.value = null;
    isClearingCache.value = true;
    try {
      await _clearOfflineDataUseCase();
      statusMessage.value = AppStrings.tr(
        'অফলাইন ক্যাশ মুছে ফেলা হয়েছে।',
        'Offline cache cleared.',
        language.value,
      );
    } catch (e) {
      errorMessage.value = e.toString();
    } finally {
      isClearingCache.value = false;
    }
  }

  Future<void> logout() async {
    if (isLoggingOut.value) return;
    isLoggingOut.value = true;
    try {
      await _signOutUseCase();
      Get.offAllNamed(AppRoutes.login);
    } finally {
      isLoggingOut.value = false;
    }
  }

  @override
  void onClose() {
    nameController.dispose();
    boardController.dispose();
    super.onClose();
  }
}
