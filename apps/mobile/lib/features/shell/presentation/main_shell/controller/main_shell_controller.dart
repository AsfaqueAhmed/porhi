import 'dart:async';

import 'package:get/get.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/features/auth/domain/entities/auth_user_entity.dart';
import 'package:porhi/features/auth/domain/usecases/auth_usecases.dart';
import 'package:porhi/features/dashboard/domain/usecases/student_usecases.dart';

/// Coordinates the 4-tab shell index, language state, and pending offline sync badge.
class MainShellController extends GetxController {
  final GetLanguageUseCase _getLanguageUseCase;
  final GetCachedUserUseCase _getCachedUserUseCase;
  final GetPendingSyncCountUseCase _getPendingSyncCountUseCase;
  final WatchPendingSyncCountUseCase _watchPendingSyncCountUseCase;

  MainShellController({
    required this._getLanguageUseCase,
    required this._getCachedUserUseCase,
    required this._getPendingSyncCountUseCase,
    required this._watchPendingSyncCountUseCase,
  });

  final RxInt currentIndex = 0.obs;
  final Rx<AppLanguage> language = AppLanguage.bn.obs;
  final RxInt pendingSyncCount = 0.obs;
  final Rxn<AuthUserEntity> currentUser = Rxn<AuthUserEntity>();

  StreamSubscription<int>? _syncCountSubscription;

  @override
  void onInit() {
    super.onInit();
    refreshPreferences();
    pendingSyncCount.value = _getPendingSyncCountUseCase();
    _syncCountSubscription = _watchPendingSyncCountUseCase().listen((count) {
      if (!isClosed) {
        pendingSyncCount.value = count;
      }
    });
  }

  void selectTab(int index) {
    final clamped = index.clamp(0, 3);
    if (currentIndex.value != clamped) {
      currentIndex.value = clamped;
    }
  }

  void refreshPreferences() {
    language.value = AppLanguage.fromCode(_getLanguageUseCase());
    currentUser.value = _getCachedUserUseCase();
  }

  @override
  void onClose() {
    _syncCountSubscription?.cancel();
    _syncCountSubscription = null;
    super.onClose();
  }
}
