import 'dart:async';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/features/auth/domain/entities/auth_user_entity.dart';
import 'package:porhi/features/auth/domain/usecases/auth_usecases.dart';
import 'package:porhi/features/dashboard/domain/entities/student_overview_entity.dart';
import 'package:porhi/features/dashboard/domain/usecases/student_usecases.dart';

class ActivityDayEntry {
  final String isoDate;
  final String labelBn;
  final String labelEn;
  final bool active;
  final bool isToday;

  const ActivityDayEntry({
    required this.isoDate,
    required this.labelBn,
    required this.labelEn,
    required this.active,
    required this.isToday,
  });
}

class DashboardController extends GetxController {
  final GetOverviewUseCase _getOverviewUseCase;
  final GetCachedOverviewUseCase _getCachedOverviewUseCase;
  final GetPlannerSummaryUseCase _getPlannerSummaryUseCase;
  final GetCachedPlannerSummaryUseCase _getCachedPlannerSummaryUseCase;
  final GetQuickSearchCatalogUseCase _getQuickSearchCatalogUseCase;
  final GetCachedQuickSearchCatalogUseCase _getCachedQuickSearchCatalogUseCase;
  final FilterQuickSearchTopicsUseCase _filterQuickSearchTopicsUseCase;
  final FlushOfflineSyncUseCase _flushOfflineSyncUseCase;
  final GetPendingSyncCountUseCase _getPendingSyncCountUseCase;
  final WatchPendingSyncCountUseCase _watchPendingSyncCountUseCase;
  final GetCachedUserUseCase _getCachedUserUseCase;
  final GetLanguageUseCase _getLanguageUseCase;
  final GetActiveSubjectIdUseCase _getActiveSubjectIdUseCase;

  DashboardController({
    required this._getOverviewUseCase,
    required this._getCachedOverviewUseCase,
    required this._getPlannerSummaryUseCase,
    required this._getCachedPlannerSummaryUseCase,
    required this._getQuickSearchCatalogUseCase,
    required this._getCachedQuickSearchCatalogUseCase,
    required this._filterQuickSearchTopicsUseCase,
    required this._flushOfflineSyncUseCase,
    required this._getPendingSyncCountUseCase,
    required this._watchPendingSyncCountUseCase,
    required this._getCachedUserUseCase,
    required this._getLanguageUseCase,
    required this._getActiveSubjectIdUseCase,
  });

  final TextEditingController searchQueryController = TextEditingController();

  final Rxn<StudentOverviewEntity> overview = Rxn<StudentOverviewEntity>();
  final Rxn<PlannerOverviewEntity> plannerSummary =
      Rxn<PlannerOverviewEntity>();
  final Rxn<AuthUserEntity> user = Rxn<AuthUserEntity>();
  final Rx<AppLanguage> language = AppLanguage.bn.obs;
  final RxString activeSubjectId = 'sub_ssc_physics'.obs;

  final RxBool isLoading = false.obs;
  final RxBool isSyncing = false.obs;
  final RxBool isOfflineCache = false.obs;
  final RxInt pendingSyncCount = 0.obs;
  final RxnString errorMessage = RxnString();
  final RxnString syncMessage = RxnString();

  final RxList<QuickSearchTopicEntity> searchCatalog =
      <QuickSearchTopicEntity>[].obs;
  final RxList<QuickSearchTopicEntity> filteredSearchResults =
      <QuickSearchTopicEntity>[].obs;
  final RxBool isLoadingSearch = false.obs;
  final RxnString searchErrorMessage = RxnString();

  StreamSubscription<int>? _syncCountSubscription;

  @override
  void onInit() {
    super.onInit();
    refreshLanguageAndUser();
    pendingSyncCount.value = _getPendingSyncCountUseCase();
    _syncCountSubscription = _watchPendingSyncCountUseCase().listen((count) {
      if (!isClosed) {
        pendingSyncCount.value = count;
      }
    });
    loadDashboard();
  }

  void refreshLanguageAndUser() {
    language.value = AppLanguage.fromCode(_getLanguageUseCase());
    final cachedUser = _getCachedUserUseCase();
    user.value = cachedUser;
    activeSubjectId.value = _getActiveSubjectIdUseCase(cachedUser?.selectedClass);
  }

  Future<void> loadDashboard() async {
    isLoading.value = true;
    errorMessage.value = null;
    final subjectId = activeSubjectId.value;

    try {
      // Show cached dashboard & planner immediately for instant offline UX.
      final cachedOverview =
          await _getCachedOverviewUseCase(subjectId: subjectId);
      if (isClosed) return;
      if (cachedOverview != null && overview.value == null) {
        overview.value = cachedOverview;
        isOfflineCache.value = true;
      }

      final cachedPlanner = await _getCachedPlannerSummaryUseCase();
      if (isClosed) return;
      if (cachedPlanner != null && plannerSummary.value == null) {
        plannerSummary.value = cachedPlanner;
      }

      final overviewFuture = _getOverviewUseCase(subjectId: subjectId);
      final plannerFuture = _getPlannerSummaryUseCase();

      final overviewResult = await overviewFuture;
      if (isClosed) return;
      overviewResult.fold(
        (err) {
          if (overview.value == null) {
            errorMessage.value = err.message;
          }
        },
        (entity) {
          overview.value = entity;
          isOfflineCache.value = entity.isFromCache;
        },
      );

      final plannerResult = await plannerFuture;
      if (isClosed) return;
      plannerResult.fold(
        (_) {},
        (summary) {
          plannerSummary.value = summary;
        },
      );
    } finally {
      if (!isClosed) {
        isLoading.value = false;
      }
    }
  }

  Future<void> syncNow() async {
    if (isSyncing.value) return;
    isSyncing.value = true;
    syncMessage.value = null;

    try {
      final result = await _flushOfflineSyncUseCase();
      if (isClosed) return;
      result.fold(
        (err) {
          syncMessage.value = err.message;
        },
        (syncedCount) {
          final lang = language.value;
          syncMessage.value = syncedCount > 0
              ? AppStrings.tr(
                  '${AppStrings.formatNumber(syncedCount, lang)}টি অফলাইন তথ্য সিঙ্ক হয়েছে',
                  'Synced $syncedCount offline items',
                  lang,
                )
              : AppStrings.tr(
                  'সব তথ্য হালনাগাদ আছে',
                  'Everything is up to date',
                  lang,
                );
        },
      );
      await loadDashboard();
    } finally {
      if (!isClosed) {
        isSyncing.value = false;
      }
    }
  }

  Future<void> refreshAndSync() async {
    if (pendingSyncCount.value > 0) {
      await syncNow();
    } else {
      await loadDashboard();
    }
  }

  Future<void> loadQuickSearchCatalog() async {
    isLoadingSearch.value = true;
    searchErrorMessage.value = null;
    final subjectId = activeSubjectId.value;

    try {
      if (searchCatalog.isEmpty) {
        final cached =
            await _getCachedQuickSearchCatalogUseCase(subjectId: subjectId);
        if (isClosed) return;
        if (cached.isNotEmpty) {
          searchCatalog.assignAll(cached);
          _applySearchFilter(searchQueryController.text);
        }
      }

      final result = await _getQuickSearchCatalogUseCase(subjectId: subjectId);
      if (isClosed) return;
      result.fold(
        (err) {
          if (searchCatalog.isEmpty) {
            searchErrorMessage.value = err.message;
          }
        },
        (items) {
          searchCatalog.assignAll(items);
          _applySearchFilter(searchQueryController.text);
        },
      );
    } finally {
      if (!isClosed) {
        isLoadingSearch.value = false;
      }
    }
  }

  void onSearchQueryChanged(String query) {
    _applySearchFilter(query);
  }

  void clearSearchQuery() {
    searchQueryController.clear();
    _applySearchFilter('');
  }

  void _applySearchFilter(String query) {
    final completedIds =
        overview.value?.completedTopicIds.toSet() ?? const <String>{};
    final filtered = _filterQuickSearchTopicsUseCase(
      items: searchCatalog,
      query: query,
      completedTopicIds: completedIds,
    );
    filteredSearchResults.assignAll(filtered);
  }

  List<ActivityDayEntry> buildLast7Days({DateTime? now}) {
    const bnDayNames = <String>[
      'রবি',
      'সোম',
      'মঙ্গল',
      'বুধ',
      'বৃহঃ',
      'শুক্র',
      'শনি',
    ];
    const enDayNames = <String>[
      'Sun',
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat',
    ];

    final anchor = (now ?? DateTime.now()).toUtc();
    final studyDates = overview.value?.studyDates.toSet() ?? const <String>{};
    final result = <ActivityDayEntry>[];

    for (var i = 6; i >= 0; i--) {
      final d = anchor.subtract(Duration(days: i));
      final iso = d.toIso8601String().substring(0, 10);
      final weekdayIndex = d.weekday % 7;
      result.add(
        ActivityDayEntry(
          isoDate: iso,
          labelBn: bnDayNames[weekdayIndex],
          labelEn: enDayNames[weekdayIndex],
          active: studyDates.contains(iso),
          isToday: i == 0,
        ),
      );
    }
    return result;
  }

  @override
  void onClose() {
    _syncCountSubscription?.cancel();
    _syncCountSubscription = null;
    searchQueryController.dispose();
    super.onClose();
  }
}
