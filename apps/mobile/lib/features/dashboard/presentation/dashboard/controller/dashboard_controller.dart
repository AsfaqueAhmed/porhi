import 'dart:async';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:network/network.dart' show ApiResponseErrorType, ErrorResponse;
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/features/auth/domain/entities/auth_user_entity.dart';
import 'package:porhi/features/auth/domain/usecases/auth_usecases.dart';
import 'package:porhi/features/dashboard/domain/entities/student_overview_entity.dart';
import 'package:porhi/features/dashboard/domain/usecases/student_usecases.dart';
import 'package:porhi/features/lesson/domain/usecases/lesson_usecases.dart';

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
  final GetLocalTopicStateOverlayUseCase? _getLocalTopicStateOverlayUseCase;

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
    this._getLocalTopicStateOverlayUseCase,
  });

  final TextEditingController searchQueryController = TextEditingController();
  final Set<String> _overlayCompletedTopicIds = <String>{};

  final Rxn<StudentOverviewEntity> overview = Rxn<StudentOverviewEntity>();
  final Rxn<PlannerOverviewEntity> plannerSummary =
      Rxn<PlannerOverviewEntity>();
  final Rxn<AuthUserEntity> user = Rxn<AuthUserEntity>();
  final Rx<AppLanguage> language = AppLanguage.bn.obs;
  final RxString activeSubjectId = 'sub_ssc_physics'.obs;

  final RxBool isLoading = false.obs;
  final RxBool isSyncing = false.obs;
  final RxBool isOfflineCache = false.obs;
  final RxBool isSyncError = false.obs;
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
  String? _loadedOverviewSubjectId;
  String? _loadedSearchSubjectId;
  int _loadGeneration = 0;
  int _searchGeneration = 0;

  @override
  void onInit() {
    super.onInit();
    _applyPreferencesFromStorage();
    pendingSyncCount.value = _getPendingSyncCountUseCase();
    _syncCountSubscription = _watchPendingSyncCountUseCase().listen((count) {
      if (!isClosed) {
        pendingSyncCount.value = count;
      }
    });
    loadDashboard();
  }

  /// Syncs cached user/language/subject preferences; returns `true` if the
  /// active subject changed so callers or tests can observe reloads.
  Future<void> refreshLanguageAndUser() async {
    final subjectChanged = _applyPreferencesFromStorage();
    if (subjectChanged) {
      _resetSubjectScopedState();
      await loadDashboard();
    } else {
      if (overview.value != null) {
        final cachedOverview =
            await _getCachedOverviewUseCase(subjectId: activeSubjectId.value);
        if (isClosed) return;
        if (cachedOverview != null &&
            cachedOverview.subjectId == activeSubjectId.value) {
          overview.value = cachedOverview;
        }
      }
      await _refreshOverlayAndSyncSearch();
      await refreshPlannerSummary();
    }
  }

  /// Reloads the planner summary card from local cache immediately and then
  /// best-effort refreshes from the backend so edits in the Planner tab
  /// appear on Home right away.
  Future<void> refreshPlannerSummary({bool refreshRemote = true}) async {
    final cachedPlanner = await _getCachedPlannerSummaryUseCase();
    if (isClosed) return;
    if (cachedPlanner != null) {
      plannerSummary.value = cachedPlanner;
    }
    if (!refreshRemote) return;
    final plannerResult = await _getPlannerSummaryUseCase();
    if (isClosed) return;
    plannerResult.fold(
      (_) {},
      (summary) {
        plannerSummary.value = summary;
      },
    );
  }

  bool _isOpeningLesson = false;

  Future<void> runLessonNavigation(Future<void> Function() action) async {
    if (_isOpeningLesson) return;
    _isOpeningLesson = true;
    try {
      await action();
    } finally {
      _isOpeningLesson = false;
    }
  }

  bool _applyPreferencesFromStorage() {
    language.value = AppLanguage.fromCode(_getLanguageUseCase());
    final cachedUser = _getCachedUserUseCase();
    user.value = cachedUser;
    final nextSubjectId = _getActiveSubjectIdUseCase(cachedUser?.selectedClass);
    final previousSubjectId = activeSubjectId.value;
    activeSubjectId.value = nextSubjectId;

    return nextSubjectId != previousSubjectId ||
        (_loadedOverviewSubjectId != null &&
            _loadedOverviewSubjectId != nextSubjectId) ||
        (overview.value != null && overview.value!.subjectId != nextSubjectId);
  }

  void _resetSubjectScopedState() {
    overview.value = null;
    isOfflineCache.value = false;
    errorMessage.value = null;
    _loadedOverviewSubjectId = null;
    _loadedSearchSubjectId = null;
    _overlayCompletedTopicIds.clear();
    searchCatalog.clear();
    filteredSearchResults.clear();
    searchErrorMessage.value = null;
  }

  String _resolveErrorMessage(
    ErrorResponse err, {
    required String fallbackBn,
    required String fallbackEn,
  }) {
    final message = err.message?.trim();
    if (message != null && message.isNotEmpty) {
      return message;
    }
    return AppStrings.tr(fallbackBn, fallbackEn, language.value);
  }

  Future<void> _refreshOverlayAndSyncSearch({
    List<String>? overviewCompletedIds,
  }) async {
    final targetSubject = activeSubjectId.value;
    if (_getLocalTopicStateOverlayUseCase != null && targetSubject.isNotEmpty) {
      final overlay = await _getLocalTopicStateOverlayUseCase(targetSubject);
      if (isClosed || targetSubject != activeSubjectId.value) return;
      _overlayCompletedTopicIds
        ..clear()
        ..addAll(overlay?.completedTopicIds ?? const <String>[]);
    } else {
      _overlayCompletedTopicIds.clear();
    }

    final merged = <String>{
      ...?(overviewCompletedIds ?? overview.value?.completedTopicIds),
      ..._overlayCompletedTopicIds,
    }.toList();
    _syncSearchCatalogCompletion(merged);
  }

  void _syncSearchCatalogCompletion(List<String> completedTopicIds) {
    if (searchCatalog.isEmpty) return;
    final completedSet = completedTopicIds.toSet();
    var changed = false;
    final updated = searchCatalog.map((item) {
      final completed = completedSet.contains(item.topicId);
      if (completed != item.isCompleted) {
        changed = true;
        return item.copyWith(isCompleted: completed);
      }
      return item;
    }).toList();
    if (changed) {
      searchCatalog.assignAll(updated);
      _applySearchFilter(searchQueryController.text);
    }
  }

  Future<void> loadDashboard() async {
    final generation = ++_loadGeneration;
    final subjectId = activeSubjectId.value;

    if ((_loadedOverviewSubjectId != null &&
            _loadedOverviewSubjectId != subjectId) ||
        (overview.value != null && overview.value!.subjectId != subjectId)) {
      overview.value = null;
      isOfflineCache.value = false;
      _loadedOverviewSubjectId = null;
    }

    isLoading.value = true;
    errorMessage.value = null;

    try {
      // Show cached dashboard & planner immediately for instant offline UX.
      final cachedOverview =
          await _getCachedOverviewUseCase(subjectId: subjectId);
      if (isClosed || generation != _loadGeneration) return;
      if (cachedOverview != null && overview.value == null) {
        overview.value = cachedOverview;
        isOfflineCache.value = true;
        _loadedOverviewSubjectId = subjectId;
      }
      await _refreshOverlayAndSyncSearch();
      if (isClosed || generation != _loadGeneration) return;

      final cachedPlanner = await _getCachedPlannerSummaryUseCase();
      if (isClosed || generation != _loadGeneration) return;
      if (cachedPlanner != null && plannerSummary.value == null) {
        plannerSummary.value = cachedPlanner;
      }

      final overviewFuture = _getOverviewUseCase(subjectId: subjectId);
      final plannerFuture = _getPlannerSummaryUseCase();

      final overviewResult = await overviewFuture;
      if (isClosed || generation != _loadGeneration) return;
      overviewResult.fold(
        (err) {
          if (overview.value == null) {
            errorMessage.value = _resolveErrorMessage(
              err,
              fallbackBn: 'ড্যাশবোর্ড তথ্য লোড করা যায়নি। আবার চেষ্টা করুন।',
              fallbackEn: 'Could not load dashboard data. Please try again.',
            );
          }
        },
        (entity) {
          overview.value = entity;
          isOfflineCache.value = entity.isFromCache;
          _loadedOverviewSubjectId = subjectId;
        },
      );
      await _refreshOverlayAndSyncSearch();
      if (isClosed || generation != _loadGeneration) return;

      final plannerResult = await plannerFuture;
      if (isClosed || generation != _loadGeneration) return;
      plannerResult.fold(
        (_) {},
        (summary) {
          plannerSummary.value = summary;
        },
      );
    } finally {
      if (!isClosed && generation == _loadGeneration) {
        isLoading.value = false;
      }
    }
  }

  Future<void> syncNow() async {
    if (isSyncing.value) return;
    isSyncing.value = true;
    isSyncError.value = false;
    syncMessage.value = null;

    var shouldReloadDashboard = false;
    try {
      final result = await _flushOfflineSyncUseCase();
      if (isClosed) return;
      result.fold(
        (err) {
          isSyncError.value = true;
          syncMessage.value = _resolveErrorMessage(
            err,
            fallbackBn: 'অফলাইন তথ্য সিঙ্ক করা যায়নি।',
            fallbackEn: 'Could not sync offline data.',
          );
          final isConnectivityFailure =
              err.data == ApiResponseErrorType.noInternet ||
                  err.data == ApiResponseErrorType.slowOrNoInternet;
          shouldReloadDashboard = !isConnectivityFailure;
        },
        (syncedCount) {
          isSyncError.value = false;
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
          shouldReloadDashboard = true;
        },
      );
      if (shouldReloadDashboard) {
        await loadDashboard();
      }
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
    final generation = ++_searchGeneration;
    final subjectId = activeSubjectId.value;

    if (_loadedSearchSubjectId != null && _loadedSearchSubjectId != subjectId) {
      searchCatalog.clear();
      filteredSearchResults.clear();
      _loadedSearchSubjectId = null;
    }

    isLoadingSearch.value = true;
    searchErrorMessage.value = null;

    try {
      if (searchCatalog.isEmpty) {
        final cached =
            await _getCachedQuickSearchCatalogUseCase(subjectId: subjectId);
        if (isClosed || generation != _searchGeneration) return;
        if (cached.isNotEmpty) {
          searchCatalog.assignAll(cached);
          _loadedSearchSubjectId = subjectId;
          await _refreshOverlayAndSyncSearch();
          if (isClosed || generation != _searchGeneration) return;
          _applySearchFilter(searchQueryController.text);
        }
      }

      final result = await _getQuickSearchCatalogUseCase(subjectId: subjectId);
      if (isClosed || generation != _searchGeneration) return;
      result.fold(
        (err) {
          if (searchCatalog.isEmpty) {
            searchErrorMessage.value = _resolveErrorMessage(
              err,
              fallbackBn: 'টপিক তালিকা লোড করা যায়নি। আবার চেষ্টা করুন।',
              fallbackEn: 'Could not load topic catalog. Please try again.',
            );
          }
        },
        (items) {
          searchCatalog.assignAll(items);
          _loadedSearchSubjectId = subjectId;
          _applySearchFilter(searchQueryController.text);
        },
      );
      if (searchCatalog.isNotEmpty) {
        await _refreshOverlayAndSyncSearch();
      }
    } finally {
      if (!isClosed && generation == _searchGeneration) {
        isLoadingSearch.value = false;
      }
    }
  }

  void onSearchQueryChanged(String query) {
    _applySearchFilter(query);
  }

  void clearSearchQuery() {
    if (searchQueryController.text.isNotEmpty) {
      searchQueryController.clear();
    }
    _applySearchFilter('');
  }

  void _applySearchFilter(String query) {
    final completedIds = <String>{
      ...?overview.value?.completedTopicIds,
      ..._overlayCompletedTopicIds,
    };
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
