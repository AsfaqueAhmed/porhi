import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:network/network.dart' show ErrorResponse;
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/features/auth/domain/usecases/auth_usecases.dart';
import 'package:porhi/features/curriculum/domain/entities/curriculum_entities.dart';
import 'package:porhi/features/curriculum/domain/usecases/curriculum_usecases.dart';
import 'package:porhi/features/dashboard/domain/usecases/student_usecases.dart';
import 'package:porhi/features/lesson/domain/usecases/lesson_usecases.dart';

class ChapterIndexController extends GetxController {
  final GetChaptersUseCase _getChaptersUseCase;
  final GetCachedChaptersUseCase _getCachedChaptersUseCase;
  final FilterChaptersUseCase _filterChaptersUseCase;
  final DownloadChapterPackUseCase _downloadChapterPackUseCase;
  final RemoveChapterPackUseCase _removeChapterPackUseCase;
  final GetDownloadedChaptersUseCase _getDownloadedChaptersUseCase;
  final GetOfflineChapterPackUseCase _getOfflineChapterPackUseCase;
  final GetActiveCurriculumSubjectUseCase _getActiveSubjectUseCase;
  final GetCachedOverviewUseCase _getCachedOverviewUseCase;
  final GetLocalTopicStateOverlayUseCase? _getLocalTopicStateOverlayUseCase;
  final ToggleBookmarkUseCase _toggleBookmarkUseCase;
  final PatchCachedBookmarkUseCase _patchCachedBookmarkUseCase;
  final GetCachedUserUseCase _getCachedUserUseCase;
  final GetLanguageUseCase _getLanguageUseCase;

  ChapterIndexController({
    required this._getChaptersUseCase,
    required this._getCachedChaptersUseCase,
    required this._filterChaptersUseCase,
    required this._downloadChapterPackUseCase,
    required this._removeChapterPackUseCase,
    required this._getDownloadedChaptersUseCase,
    required this._getOfflineChapterPackUseCase,
    required this._getActiveSubjectUseCase,
    required this._getCachedOverviewUseCase,
    this._getLocalTopicStateOverlayUseCase,
    required this._toggleBookmarkUseCase,
    required this._patchCachedBookmarkUseCase,
    required this._getCachedUserUseCase,
    required this._getLanguageUseCase,
  });

  final TextEditingController searchController = TextEditingController();

  final Rx<AppLanguage> language = AppLanguage.bn.obs;
  final RxString subjectId = 'sub_ssc_physics'.obs;
  final Rx<TopicFilterMode> filterMode = TopicFilterMode.all.obs;
  final RxString searchQuery = ''.obs;

  final RxList<ChapterEntity> allChapters = <ChapterEntity>[].obs;
  final RxList<ChapterEntity> filteredChapters = <ChapterEntity>[].obs;
  final RxSet<String> collapsedChapterIds = <String>{}.obs;
  final RxSet<String> completedTopicIds = <String>{}.obs;
  final RxSet<String> bookmarkedTopicIds = <String>{}.obs;
  final RxMap<String, DownloadedChapterEntity> downloadedChaptersMap =
      <String, DownloadedChapterEntity>{}.obs;
  final RxSet<String> downloadingChapterIds = <String>{}.obs;
  final RxSet<String> togglingBookmarkIds = <String>{}.obs;

  final RxBool isLoading = false.obs;
  final RxBool isOfflineMode = false.obs;
  final RxnString errorMessage = RxnString();
  final RxnString packStatusMessage = RxnString();
  final RxBool isPackStatusError = false.obs;

  int _loadGeneration = 0;
  bool _isNavigating = false;

  /// Guards route navigation (lessons, practice, exams, board archive)
  /// against rapid double-taps pushing duplicate routes.
  Future<void> runGuardedNavigation(Future<void> Function() action) async {
    if (_isNavigating) return;
    _isNavigating = true;
    try {
      await action();
    } finally {
      _isNavigating = false;
    }
  }

  Future<void> runLessonNavigation(Future<void> Function() action) {
    return runGuardedNavigation(action);
  }

  @override
  void onInit() {
    super.onInit();
    language.value = AppLanguage.fromCode(_getLanguageUseCase());
    subjectId.value = _resolveSubjectId();
    loadChapters();
  }

  String _resolveSubjectId() {
    final paramId = Get.parameters['subjectId']?.trim();
    if (paramId != null && paramId.isNotEmpty) {
      return Uri.decodeComponent(paramId);
    }
    final arg = Get.arguments;
    if (arg is String && arg.trim().isNotEmpty) {
      return arg.trim();
    }
    final user = _getCachedUserUseCase();
    return _getActiveSubjectUseCase(user?.selectedClass);
  }

  Future<void> loadChapters() async {
    final generation = ++_loadGeneration;
    final activeId = subjectId.value;
    isLoading.value = true;
    errorMessage.value = null;

    try {
      final downloadedFuture =
          _getDownloadedChaptersUseCase(subjectId: activeId);
      final overviewFuture = _getCachedOverviewUseCase(subjectId: activeId);
      final cachedChapters = await _getCachedChaptersUseCase(activeId);
      if (isClosed || generation != _loadGeneration) return;

      if (cachedChapters.isNotEmpty && allChapters.isEmpty) {
        allChapters.assignAll(cachedChapters);
        isOfflineMode.value = true;
        _applyFilters();
      }

      final downloaded = await downloadedFuture;
      if (isClosed || generation != _loadGeneration) return;
      _setDownloadedChapters(downloaded);

      final cachedOverview = await overviewFuture;
      if (isClosed || generation != _loadGeneration) return;
      if (cachedOverview != null) {
        completedTopicIds.assignAll(cachedOverview.completedTopicIds);
        bookmarkedTopicIds.assignAll(
          cachedOverview.bookmarks
              .where((b) => b.type == 'topic')
              .map((b) => b.id),
        );
        _applyFilters();
      } else if (_getLocalTopicStateOverlayUseCase != null) {
        final overlay = await _getLocalTopicStateOverlayUseCase(activeId);
        if (isClosed || generation != _loadGeneration) return;
        if (overlay != null) {
          completedTopicIds.assignAll(overlay.completedTopicIds);
          bookmarkedTopicIds.assignAll(overlay.bookmarkedTopicIds);
          _applyFilters();
        }
      }

      final result = await _getChaptersUseCase(activeId);
      if (isClosed || generation != _loadGeneration) return;

      result.fold(
        (err) {
          if (allChapters.isEmpty) {
            errorMessage.value = _resolveErrorMessage(
              err,
              fallbackBn: 'অধ্যায়ের তালিকা লোড করা যায়নি। আবার চেষ্টা করুন।',
              fallbackEn: 'Could not load chapters. Please try again.',
            );
          } else {
            isOfflineMode.value = true;
          }
        },
        (chapters) {
          isOfflineMode.value = false;
          allChapters.assignAll(chapters);
          _applyFilters();
        },
      );
    } finally {
      if (!isClosed && generation == _loadGeneration) {
        isLoading.value = false;
      }
    }
  }

  void _setDownloadedChapters(List<DownloadedChapterEntity> items) {
    downloadedChaptersMap.assignAll(<String, DownloadedChapterEntity>{
      for (final item in items) item.chapterId: item,
    });
  }

  void selectFilterMode(TopicFilterMode mode) {
    if (filterMode.value != mode) {
      filterMode.value = mode;
      _applyFilters();
    }
  }

  void onSearchQueryChanged(String value) {
    searchQuery.value = value;
    _applyFilters();
  }

  void clearSearchQuery() {
    if (searchController.text.isNotEmpty) {
      searchController.clear();
    }
    if (searchQuery.value.isNotEmpty) {
      searchQuery.value = '';
      _applyFilters();
    }
  }

  void toggleChapterExpanded(String chapterId) {
    if (collapsedChapterIds.contains(chapterId)) {
      collapsedChapterIds.remove(chapterId);
    } else {
      collapsedChapterIds.add(chapterId);
    }
  }

  bool get allCollapsed =>
      allChapters.isNotEmpty &&
      collapsedChapterIds.length >= allChapters.length;

  void toggleExpandCollapseAll() {
    if (allCollapsed) {
      collapsedChapterIds.clear();
    } else {
      collapsedChapterIds.assignAll(allChapters.map((c) => c.id));
    }
  }

  int get totalTopics =>
      allChapters.fold<int>(0, (sum, ch) => sum + ch.topics.length);

  int get completedTopicsCount => allChapters.fold<int>(
        0,
        (sum, ch) =>
            sum +
            ch.topics.where((t) => completedTopicIds.contains(t.id)).length,
      );

  int get overallProgressPercent {
    final total = totalTopics;
    if (total <= 0) return 0;
    return ((completedTopicsCount / total) * 100).round().clamp(0, 100);
  }

  bool isChapterDownloaded(String chapterId) =>
      downloadedChaptersMap.containsKey(chapterId);

  bool isChapterDownloading(String chapterId) =>
      downloadingChapterIds.contains(chapterId);

  Future<void> toggleOfflinePack(ChapterEntity chapter) async {
    if (downloadingChapterIds.contains(chapter.id)) return;

    packStatusMessage.value = null;
    isPackStatusError.value = false;
    downloadingChapterIds.add(chapter.id);

    try {
      if (isChapterDownloaded(chapter.id)) {
        await _removeChapterPackUseCase(chapter.id);
        if (isClosed) return;
        downloadedChaptersMap.remove(chapter.id);
        isPackStatusError.value = false;
        packStatusMessage.value = AppStrings.tr(
          '"${chapter.titleBangla}" অফলাইন প্যাক মুছে ফেলা হয়েছে।',
          'Removed offline pack for "${chapter.titleBangla}".',
          language.value,
        );
        return;
      }

      final result = await _downloadChapterPackUseCase(
        chapter.id,
        orderIndex: chapter.orderIndex,
      );
      if (isClosed) return;

      result.fold(
        (err) {
          isPackStatusError.value = true;
          packStatusMessage.value = _resolveErrorMessage(
            err,
            fallbackBn: 'অফলাইন প্যাক ডাউনলোড করা যায়নি।',
            fallbackEn: 'Could not download offline chapter pack.',
          );
        },
        (pack) {
          downloadedChaptersMap[chapter.id] = DownloadedChapterEntity(
            chapterId: pack.chapterId,
            subjectId: pack.subjectId,
            orderIndex: chapter.orderIndex,
            titleBangla: pack.titleBangla,
            versionHash: pack.versionHash,
            lessonCount: pack.lessons.length,
            questionCount: pack.questions.length,
            sizeBytes: pack.sizeBytes,
            downloadedAt: pack.downloadedAt,
            topics: pack.topics,
          );
          isPackStatusError.value = false;
          packStatusMessage.value = AppStrings.tr(
            '"${chapter.titleBangla}" অফলাইন সংরক্ষণ সম্পন্ন।',
            'Saved "${chapter.titleBangla}" for offline use.',
            language.value,
          );
        },
      );
    } catch (_) {
      if (!isClosed) {
        isPackStatusError.value = true;
        packStatusMessage.value = AppStrings.tr(
          'অফলাইন স্টোরেজ আপডেট করা যায়নি। আবার চেষ্টা করুন।',
          'Could not update offline storage. Please try again.',
          language.value,
        );
      }
    } finally {
      if (!isClosed) {
        downloadingChapterIds.remove(chapter.id);
      }
    }
  }

  Future<OfflineChapterPackEntity?> loadOfflinePack(String chapterId) {
    return _getOfflineChapterPackUseCase(chapterId);
  }

  Future<void> toggleTopicBookmark(
    ChapterEntity chapter,
    TopicEntity topic,
  ) async {
    if (togglingBookmarkIds.contains(topic.id)) return;
    togglingBookmarkIds.add(topic.id);
    packStatusMessage.value = null;
    isPackStatusError.value = false;

    try {
      final href = '/lesson/${topic.id}';
      final result = await _toggleBookmarkUseCase(
        itemId: topic.id,
        itemType: 'topic',
        titleBangla: topic.titleBangla,
        subtitleBangla: chapter.titleBangla,
        href: href,
      );
      if (isClosed) return;
      await result.fold(
        (err) async {
          isPackStatusError.value = true;
          packStatusMessage.value = _resolveErrorMessage(
            err,
            fallbackBn: 'বুকমার্ক আপডেট করা যায়নি।',
            fallbackEn: 'Could not update bookmark.',
          );
        },
        (bookmarked) async {
          if (bookmarked) {
            bookmarkedTopicIds.add(topic.id);
          } else {
            bookmarkedTopicIds.remove(topic.id);
          }
          _applyFilters();
          await _patchCachedBookmarkUseCase(
            subjectId: subjectId.value,
            itemId: topic.id,
            itemType: 'topic',
            titleBangla: topic.titleBangla,
            subtitleBangla: chapter.titleBangla,
            href: href,
            bookmarked: bookmarked,
          );
        },
      );
    } catch (_) {
      if (!isClosed) {
        isPackStatusError.value = true;
        packStatusMessage.value = AppStrings.tr(
          'বুকমার্ক আপডেট করা যায়নি।',
          'Could not update bookmark.',
          language.value,
        );
      }
    } finally {
      if (!isClosed) {
        togglingBookmarkIds.remove(topic.id);
      }
    }
  }

  Future<void> refreshOverviewStateFromCache() async {
    final activeId = subjectId.value;
    if (activeId.isEmpty) return;

    final cachedOverview = await _getCachedOverviewUseCase(subjectId: activeId);
    if (isClosed) return;
    if (cachedOverview != null) {
      completedTopicIds.assignAll(cachedOverview.completedTopicIds);
      bookmarkedTopicIds.assignAll(
        cachedOverview.bookmarks
            .where((b) => b.type == 'topic')
            .map((b) => b.id),
      );
      _applyFilters();
      return;
    }

    if (_getLocalTopicStateOverlayUseCase != null) {
      final overlay = await _getLocalTopicStateOverlayUseCase(activeId);
      if (isClosed) return;
      if (overlay != null) {
        completedTopicIds.assignAll(overlay.completedTopicIds);
        bookmarkedTopicIds.assignAll(overlay.bookmarkedTopicIds);
        _applyFilters();
      }
    }
  }

  void _applyFilters() {
    final filtered = _filterChaptersUseCase(
      chapters: allChapters,
      query: searchQuery.value,
      filterMode: filterMode.value,
      completedTopicIds: completedTopicIds.toSet(),
      bookmarkedTopicIds: bookmarkedTopicIds.toSet(),
    );
    filteredChapters.assignAll(filtered);
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

  @override
  void onClose() {
    searchController.dispose();
    super.onClose();
  }
}
