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

  bool _isApplyingUser = false;
  bool _isNameDirty = false;
  bool _isBoardDirty = false;
  bool _isTrackDirty = false;
  bool _isGoalDirty = false;

  @override
  void onInit() {
    super.onInit();
    nameController.addListener(_onNameChanged);
    boardController.addListener(_onBoardChanged);
    language.value = AppLanguage.fromCode(_getLanguageUseCase());
    final cached = _getCachedUserUseCase();
    if (cached != null) {
      _applyUser(cached);
    }
    loadProfile();
  }

  void _onNameChanged() {
    if (!_isApplyingUser) {
      _isNameDirty = true;
    }
  }

  void _onBoardChanged() {
    if (!_isApplyingUser) {
      _isBoardDirty = true;
    }
  }

  void _applyUser(AuthUserEntity entity, {bool respectDirty = false}) {
    user.value = entity;
    _isApplyingUser = true;
    try {
      if (!respectDirty || !_isNameDirty) {
        nameController.text = entity.fullName ?? '';
        _isNameDirty = false;
      }
      if (!respectDirty || !_isBoardDirty) {
        boardController.text = entity.boardName ?? '';
        _isBoardDirty = false;
      }
    } finally {
      _isApplyingUser = false;
    }
    if (!respectDirty || !_isTrackDirty) {
      selectedTrack.value = entity.selectedClass;
      _isTrackDirty = false;
    }
    if ((!respectDirty || !_isGoalDirty) &&
        entity.dailyStudyGoalMinutes != null) {
      dailyStudyGoalMinutes.value = entity.dailyStudyGoalMinutes!;
      _isGoalDirty = false;
    }
  }

  Future<void> loadProfile() async {
    isLoading.value = true;
    try {
      final result = await _getMeUseCase();
      if (isClosed) return;
      result.fold(
        (err) {
          if (user.value == null) {
            errorMessage.value = err.message;
          }
        },
        (entity) => _applyUser(entity, respectDirty: true),
      );
    } finally {
      if (!isClosed) {
        isLoading.value = false;
      }
    }
  }

  void selectTrack(StudentTrack track) {
    _isTrackDirty = true;
    selectedTrack.value = track;
  }

  void selectDailyGoal(int minutes) {
    _isGoalDirty = true;
    dailyStudyGoalMinutes.value = minutes;
  }

  Future<void> setLanguage(AppLanguage next) async {
    language.value = next;
    await _setLanguageUseCase(next.code);
    if (isClosed) return;
  }

  String? validateFullName(String? value) {
    final trimmed = value?.trim() ?? '';
    if (trimmed.isEmpty) {
      return AppStrings.tr(
        'পূর্ণ নাম লিখুন',
        'Full name is required',
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
      if (isClosed) return;
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
          _isNameDirty = false;
          _isBoardDirty = false;
          _isTrackDirty = false;
          _isGoalDirty = false;
          _applyUser(updated);
          statusMessage.value = AppStrings.tr(
            'প্রোফাইল সংরক্ষিত হয়েছে।',
            'Profile saved.',
            language.value,
          );
        },
      );
    } finally {
      if (!isClosed) {
        isSaving.value = false;
      }
    }
  }

  Future<void> clearOfflineCache() async {
    if (isClearingCache.value) return;
    errorMessage.value = null;
    statusMessage.value = null;
    isClearingCache.value = true;
    try {
      await _clearOfflineDataUseCase();
      if (isClosed) return;
      statusMessage.value = AppStrings.tr(
        'অফলাইন ক্যাশ মুছে ফেলা হয়েছে।',
        'Offline cache cleared.',
        language.value,
      );
    } catch (e) {
      if (!isClosed) {
        errorMessage.value = e.toString();
      }
    } finally {
      if (!isClosed) {
        isClearingCache.value = false;
      }
    }
  }

  Future<void> logout() async {
    if (isLoggingOut.value) return;
    isLoggingOut.value = true;
    try {
      await _signOutUseCase();
    } catch (_) {
      // Always redirect to login even if sign-out throws unexpectedly.
    } finally {
      if (!isClosed) {
        isLoggingOut.value = false;
      }
      Get.offAllNamed(AppRoutes.login);
    }
  }

  @override
  void onClose() {
    nameController.removeListener(_onNameChanged);
    boardController.removeListener(_onBoardChanged);
    nameController.dispose();
    boardController.dispose();
    super.onClose();
  }
}
