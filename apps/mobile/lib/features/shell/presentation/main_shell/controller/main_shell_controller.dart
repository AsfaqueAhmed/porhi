import 'dart:async';

import 'package:get/get.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/features/auth/domain/entities/auth_user_entity.dart';
import 'package:porhi/features/auth/domain/usecases/auth_usecases.dart';
import 'package:porhi/features/dashboard/domain/usecases/student_usecases.dart';

typedef ShellRefreshHook = Future<void> Function();

/// Coordinates the 4-tab shell index, language state, pending offline sync badge,
/// and cross-tab preference/subject refreshes without coupling to tab controllers.
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
  final Map<int, ShellRefreshHook> _tabAccountRefreshers =
      <int, ShellRefreshHook>{};
  final Map<int, ShellRefreshHook> _tabActivatedRefreshers =
      <int, ShellRefreshHook>{};
  final Set<int> _dirtyTabs = <int>{};

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

  void registerTabHooks({
    required int index,
    ShellRefreshHook? onAccountReturn,
    ShellRefreshHook? onTabActivated,
  }) {
    if (onAccountReturn != null) {
      _tabAccountRefreshers[index] = onAccountReturn;
    }
    if (onTabActivated != null) {
      _tabActivatedRefreshers[index] = onTabActivated;
    }
  }

  void markTabDirty(int index, {bool refreshIfRegistered = false}) {
    _dirtyTabs.add(index);
    if (refreshIfRegistered || currentIndex.value == index) {
      final hook =
          _tabActivatedRefreshers[index] ?? _tabAccountRefreshers[index];
      if (hook != null) {
        _dirtyTabs.remove(index);
        unawaited(hook());
      }
    }
  }

  void selectTab(int index) {
    final clamped = index.clamp(0, 3);
    final changed = currentIndex.value != clamped;
    if (changed) {
      currentIndex.value = clamped;
    }
    refreshPreferences();
    final wasDirty = _dirtyTabs.remove(clamped);
    if (changed || wasDirty) {
      final hook = _tabActivatedRefreshers[clamped];
      if (hook != null) {
        unawaited(hook());
      }
    }
  }

  void refreshPreferences() {
    language.value = AppLanguage.fromCode(_getLanguageUseCase());
    currentUser.value = _getCachedUserUseCase();
  }

  Future<void> refreshAfterAccountReturn() async {
    refreshPreferences();
    final hooks = _tabAccountRefreshers.values.toList();
    for (final hook in hooks) {
      if (isClosed) return;
      await hook();
    }
    _dirtyTabs.clear();
  }

  @override
  void onClose() {
    _syncCountSubscription?.cancel();
    _syncCountSubscription = null;
    super.onClose();
  }
}
