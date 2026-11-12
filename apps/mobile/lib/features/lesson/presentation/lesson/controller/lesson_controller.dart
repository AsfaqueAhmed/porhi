import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:network/network.dart' show ApiResponseErrorType, ErrorResponse;
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/features/auth/domain/usecases/auth_usecases.dart';
import 'package:porhi/features/curriculum/domain/entities/curriculum_entities.dart';
import 'package:porhi/features/curriculum/domain/usecases/curriculum_usecases.dart';
import 'package:porhi/features/dashboard/domain/usecases/student_usecases.dart';
import 'package:porhi/features/lesson/domain/entities/lesson_entities.dart';
import 'package:porhi/features/lesson/domain/usecases/lesson_usecases.dart';

class LessonController extends GetxController {
  final GetLessonByTopicUseCase _getLessonByTopicUseCase;
  final GetCachedLessonByTopicUseCase _getCachedLessonByTopicUseCase;
  final GetTopicQuickQuestionsUseCase _getTopicQuickQuestionsUseCase;
  final GetCachedTopicQuickQuestionsUseCase _getCachedTopicQuickQuestionsUseCase;
  final SubmitQuickCheckAttemptUseCase _submitQuickCheckAttemptUseCase;
  final CompleteLessonUseCase _completeLessonUseCase;
  final GetLocalLessonNoteUseCase _getLocalLessonNoteUseCase;
  final SaveLocalLessonNoteUseCase _saveLocalLessonNoteUseCase;
  final GetLocalTopicStateOverlayUseCase? _getLocalTopicStateOverlayUseCase;
  final ToggleBookmarkUseCase _toggleBookmarkUseCase;
  final PatchCachedBookmarkUseCase _patchCachedBookmarkUseCase;
  final SaveNoteUseCase _saveNoteUseCase;
  final SubmitFeedbackUseCase _submitFeedbackUseCase;
  final GetCachedOverviewUseCase _getCachedOverviewUseCase;
  final GetChaptersUseCase _getChaptersUseCase;
  final GetCachedChaptersUseCase _getCachedChaptersUseCase;
  final GetOfflineChapterPackUseCase _getOfflineChapterPackUseCase;
  final GetCachedUserUseCase _getCachedUserUseCase;
  final GetLanguageUseCase _getLanguageUseCase;
  final GetActiveSubjectIdUseCase _getActiveSubjectIdUseCase;

  LessonController({
    required this._getLessonByTopicUseCase,
    required this._getCachedLessonByTopicUseCase,
    required this._getTopicQuickQuestionsUseCase,
    required this._getCachedTopicQuickQuestionsUseCase,
    required this._submitQuickCheckAttemptUseCase,
    required this._completeLessonUseCase,
    required this._getLocalLessonNoteUseCase,
    required this._saveLocalLessonNoteUseCase,
    this._getLocalTopicStateOverlayUseCase,
    required this._toggleBookmarkUseCase,
    required this._patchCachedBookmarkUseCase,
    required this._saveNoteUseCase,
    required this._submitFeedbackUseCase,
    required this._getCachedOverviewUseCase,
    required this._getChaptersUseCase,
    required this._getCachedChaptersUseCase,
    required this._getOfflineChapterPackUseCase,
    required this._getCachedUserUseCase,
    required this._getLanguageUseCase,
    required this._getActiveSubjectIdUseCase,
  });

  final ScrollController scrollController = ScrollController();

  final Rx<AppLanguage> language = AppLanguage.bn.obs;
  final RxString topicId = ''.obs;
  final RxString subjectId = ''.obs;
  final RxString chapterId = ''.obs;
  final RxString chapterTitle = ''.obs;

  final Rxn<LessonDetailEntity> lesson = Rxn<LessonDetailEntity>();
  final RxBool isLoading = false.obs;
  final RxBool isOfflineMode = false.obs;
  final RxnString errorMessage = RxnString();
  final RxnString statusMessage = RxnString();
  final RxBool isStatusError = false.obs;

  final RxBool isCompleted = false.obs;
  final RxBool isBookmarked = false.obs;
  final RxString savedNote = ''.obs;
  final RxnBool feedbackChoice = RxnBool();

  final RxBool isCompleting = false.obs;
  final RxBool isTogglingBookmark = false.obs;
  final RxBool isSavingNote = false.obs;
  final RxBool isSubmittingFeedback = false.obs;
  final RxBool isSubmittingQuickCheck = false.obs;

  final RxList<QuickCheckQuestionEntity> quickQuestions =
      <QuickCheckQuestionEntity>[].obs;
  final RxInt currentQuestionIndex = 0.obs;
  final RxnString selectedOptionId = RxnString();
  final Rxn<QuickCheckSubmitResultEntity> quickCheckResult =
      Rxn<QuickCheckSubmitResultEntity>();

  final RxList<LessonSiblingTopicEntity> _siblingTopics =
      <LessonSiblingTopicEntity>[].obs;
  final Rxn<LessonSiblingTopicEntity> prevTopic =
      Rxn<LessonSiblingTopicEntity>();
  final Rxn<LessonSiblingTopicEntity> nextTopic =
      Rxn<LessonSiblingTopicEntity>();
  final RxInt topicPosition = 0.obs;
  final RxInt totalTopicsInChapter = 0.obs;

  DateTime _openedAt = DateTime.now();
  int _loadGeneration = 0;

  QuickCheckQuestionEntity? get currentQuickQuestion {
    if (quickQuestions.isEmpty) return null;
    final idx = currentQuestionIndex.value;
    if (idx < 0 || idx >= quickQuestions.length) return quickQuestions.first;
    return quickQuestions[idx];
  }

  @override
  void onInit() {
    super.onInit();
    language.value = AppLanguage.fromCode(_getLanguageUseCase());
    _applyInitialRouteArgs();
    final initialTopicId = _resolveInitialTopicId();
    topicId.value = initialTopicId;
    loadTopic(initialTopicId);
  }

  void _applyInitialRouteArgs() {
    final user = _getCachedUserUseCase();
    subjectId.value = _getActiveSubjectIdUseCase(user?.selectedClass);

    final args = Get.arguments;
    if (args is LessonRouteArgs) {
      if (args.subjectId != null && args.subjectId!.trim().isNotEmpty) {
        subjectId.value = args.subjectId!.trim();
      }
      if (args.chapterId != null && args.chapterId!.trim().isNotEmpty) {
        chapterId.value = args.chapterId!.trim();
      }
      if (args.chapterTitle != null && args.chapterTitle!.trim().isNotEmpty) {
        chapterTitle.value = args.chapterTitle!.trim();
      }
      if (args.siblingTopics.isNotEmpty) {
        _siblingTopics.assignAll(args.siblingTopics);
      }
    }
  }

  String _resolveInitialTopicId() {
    final param = Get.parameters['topicId']?.trim();
    if (param != null && param.isNotEmpty) {
      return Uri.decodeComponent(param);
    }
    final args = Get.arguments;
    if (args is String && args.trim().isNotEmpty) {
      return args.trim();
    }
    return 'top_motion_eq';
  }

  Future<void> switchToTopic(String nextTopicId) async {
    final trimmed = nextTopicId.trim();
    if (trimmed.isEmpty || trimmed == topicId.value) return;
    topicId.value = trimmed;
    final expectedGeneration = _loadGeneration + 1;
    if (scrollController.hasClients) {
      scrollController.jumpTo(0);
    }
    await loadTopic(trimmed);
    if (!isClosed &&
        _loadGeneration == expectedGeneration &&
        scrollController.hasClients) {
      scrollController.jumpTo(0);
    }
  }

  Future<void> loadTopic([String? targetTopicId]) async {
    final activeTopicId = (targetTopicId ?? topicId.value).trim();
    if (activeTopicId.isEmpty) return;

    final generation = ++_loadGeneration;
    _openedAt = DateTime.now();

    lesson.value = null;
    isLoading.value = true;
    isOfflineMode.value = false;
    errorMessage.value = null;
    statusMessage.value = null;
    isStatusError.value = false;
    feedbackChoice.value = null;
    quickQuestions.clear();
    currentQuestionIndex.value = 0;
    selectedOptionId.value = null;
    quickCheckResult.value = null;
    isCompleted.value = false;
    isBookmarked.value = false;
    savedNote.value = '';
    isCompleting.value = false;
    isTogglingBookmark.value = false;
    isSavingNote.value = false;
    isSubmittingFeedback.value = false;
    isSubmittingQuickCheck.value = false;
    _updateAdjacentTopics(activeTopicId);

    try {
      final cachedLessonFuture = _getCachedLessonByTopicUseCase(activeTopicId);
      final localNoteFuture = _getLocalLessonNoteUseCase(activeTopicId);

      final cachedLesson = await cachedLessonFuture;
      if (isClosed || generation != _loadGeneration) return;

      if (cachedLesson != null) {
        lesson.value = cachedLesson;
        isOfflineMode.value = cachedLesson.isFromCache;
        isCompleted.value = cachedLesson.isCompleted;
        _syncHierarchyFromLesson(cachedLesson);
      } else {
        lesson.value = null;
      }

      await _hydrateStudentState(
        topicId: activeTopicId,
        localNoteFuture: localNoteFuture,
        generation: generation,
      );
      if (isClosed || generation != _loadGeneration) return;

      final remoteRes = await _getLessonByTopicUseCase(activeTopicId);
      if (isClosed || generation != _loadGeneration) return;

      LessonDetailEntity? loadedLesson = lesson.value;
      remoteRes.fold(
        (err) {
          if (lesson.value == null) {
            errorMessage.value = _resolveErrorMessage(
              err,
              fallbackBn: 'পাঠের বিষয়বস্তু লোড করা যায়নি। আবার চেষ্টা করুন।',
              fallbackEn: 'Could not load lesson content. Please try again.',
            );
          } else {
            isOfflineMode.value = true;
          }
        },
        (fetched) {
          loadedLesson = fetched;
          lesson.value = fetched;
          isOfflineMode.value = fetched.isFromCache;
          if (fetched.isCompleted) {
            isCompleted.value = true;
          }
          _syncHierarchyFromLesson(fetched);
        },
      );

      if (loadedLesson == null) return;

      final resolvedChapterId = chapterId.value.isNotEmpty
          ? chapterId.value
          : loadedLesson!.chapterId;

      await Future.wait<void>(<Future<void>>[
        _loadQuickCheckQuestions(
          chapterId: resolvedChapterId,
          topicId: activeTopicId,
          generation: generation,
        ),
        _loadSiblingTopicsIfNeeded(
          subjectId: subjectId.value,
          chapterId: resolvedChapterId,
          topicId: activeTopicId,
          generation: generation,
        ),
      ]);
    } finally {
      if (!isClosed && generation == _loadGeneration) {
        isLoading.value = false;
      }
    }
  }

  void _syncHierarchyFromLesson(LessonDetailEntity entity) {
    if (entity.chapterId.isNotEmpty) {
      chapterId.value = entity.chapterId;
    }
    if (entity.chapterTitle.isNotEmpty) {
      chapterTitle.value = entity.chapterTitle;
    }
    if (entity.subjectId.isNotEmpty) {
      subjectId.value = entity.subjectId;
    }
  }

  Future<void> _hydrateStudentState({
    required String topicId,
    required Future<String?> localNoteFuture,
    required int generation,
  }) async {
    final activeSubject = subjectId.value;
    final overview = await _getCachedOverviewUseCase(subjectId: activeSubject);
    if (isClosed || generation != _loadGeneration) return;

    if (overview != null) {
      if (overview.completedTopicIds.contains(topicId)) {
        isCompleted.value = true;
      }
      isBookmarked.value = overview.bookmarks.any(
        (b) => b.id == topicId && b.type == 'topic',
      );
      final overviewNote = overview.lessonNotes[topicId];
      if (overviewNote != null && overviewNote.isNotEmpty) {
        savedNote.value = overviewNote;
      }
    } else if (_getLocalTopicStateOverlayUseCase != null &&
        activeSubject.isNotEmpty) {
      final overlay = await _getLocalTopicStateOverlayUseCase(activeSubject);
      if (isClosed || generation != _loadGeneration) return;
      if (overlay != null) {
        if (overlay.completedTopicIds.contains(topicId)) {
          isCompleted.value = true;
        }
        if (overlay.bookmarkedTopicIds.contains(topicId)) {
          isBookmarked.value = true;
        }
        final overlayNote = overlay.lessonNotes[topicId];
        if (overlayNote != null && overlayNote.isNotEmpty) {
          savedNote.value = overlayNote;
        }
      }
    }

    final localNote = await localNoteFuture;
    if (isClosed || generation != _loadGeneration) return;
    if (localNote != null) {
      savedNote.value = localNote;
    }
  }

  Future<void> _loadQuickCheckQuestions({
    required String chapterId,
    required String topicId,
    required int generation,
  }) async {
    final cached = await _getCachedTopicQuickQuestionsUseCase(
      chapterId: chapterId,
      topicId: topicId,
    );
    if (isClosed || generation != _loadGeneration) return;
    if (cached.isNotEmpty) {
      quickQuestions.assignAll(cached);
    }

    final res = await _getTopicQuickQuestionsUseCase(
      chapterId: chapterId,
      topicId: topicId,
    );
    if (isClosed || generation != _loadGeneration) return;

    res.fold(
      (_) {
        // Keep cached questions if available; Quick Check section hides if empty.
      },
      (items) {
        if (items.isNotEmpty) {
          quickQuestions.assignAll(items);
        }
      },
    );
  }

  Future<void> _loadSiblingTopicsIfNeeded({
    required String subjectId,
    required String chapterId,
    required String topicId,
    required int generation,
  }) async {
    if (_siblingTopics.any((t) => t.id == topicId)) {
      _updateAdjacentTopics(topicId);
      return;
    }

    if (subjectId.isNotEmpty) {
      final cachedChapters = await _getCachedChaptersUseCase(subjectId);
      if (isClosed || generation != _loadGeneration) return;
      if (_applyChapterSiblings(cachedChapters, chapterId, topicId)) {
        return;
      }
    }

    if (chapterId.isNotEmpty) {
      final pack = await _getOfflineChapterPackUseCase(chapterId);
      if (isClosed || generation != _loadGeneration) return;
      if (pack != null && pack.topics.isNotEmpty) {
        _setSiblingTopics(pack.topics, topicId);
        return;
      }
    }

    if (subjectId.isNotEmpty) {
      final chaptersRes = await _getChaptersUseCase(subjectId);
      if (isClosed || generation != _loadGeneration) return;
      chaptersRes.fold(
        (_) {},
        (chapters) => _applyChapterSiblings(chapters, chapterId, topicId),
      );
    }
  }

  bool _applyChapterSiblings(
    List<ChapterEntity> chapters,
    String targetChapterId,
    String targetTopicId,
  ) {
    for (final chapter in chapters) {
      final matchesChapter =
          targetChapterId.isNotEmpty && chapter.id == targetChapterId;
      final containsTopic = chapter.topics.any((t) => t.id == targetTopicId);
      if (matchesChapter || containsTopic) {
        if (chapter.topics.isNotEmpty) {
          if (chapterTitle.value.isEmpty) {
            chapterTitle.value = chapter.titleBangla;
          }
          _setSiblingTopics(chapter.topics, targetTopicId);
          return true;
        }
      }
    }
    return false;
  }

  void _setSiblingTopics(List<TopicEntity> topics, String currentTopicId) {
    final sorted = List<TopicEntity>.from(topics)
      ..sort((a, b) => a.orderIndex.compareTo(b.orderIndex));
    _siblingTopics.assignAll(
      sorted.map(
        (t) => LessonSiblingTopicEntity(
          id: t.id,
          chapterId: t.chapterId,
          orderIndex: t.orderIndex,
          titleBangla: t.titleBangla,
          hasInteractiveLab: t.isInteractiveLab,
        ),
      ),
    );
    _updateAdjacentTopics(currentTopicId);
  }

  void _updateAdjacentTopics(String currentTopicId) {
    if (_siblingTopics.isEmpty) {
      prevTopic.value = null;
      nextTopic.value = null;
      topicPosition.value = 0;
      totalTopicsInChapter.value = 0;
      return;
    }

    final idx = _siblingTopics.indexWhere((t) => t.id == currentTopicId);
    if (idx < 0) {
      prevTopic.value = null;
      nextTopic.value = null;
      topicPosition.value = 0;
      totalTopicsInChapter.value = _siblingTopics.length;
      return;
    }

    totalTopicsInChapter.value = _siblingTopics.length;
    topicPosition.value = idx + 1;
    prevTopic.value = idx > 0 ? _siblingTopics[idx - 1] : null;
    nextTopic.value =
        idx < _siblingTopics.length - 1 ? _siblingTopics[idx + 1] : null;
  }

  Future<void> completeLesson() async {
    if (isCompleting.value || isCompleted.value) return;
    final currentLesson = lesson.value;
    final activeTopicId = topicId.value;
    if (activeTopicId.isEmpty) return;

    final generation = _loadGeneration;
    isCompleting.value = true;
    statusMessage.value = null;
    isStatusError.value = false;

    try {
      final elapsed =
          DateTime.now().difference(_openedAt).inSeconds.clamp(1, 36000);
      final resolvedChapterId = chapterId.value.isNotEmpty
          ? chapterId.value
          : (currentLesson?.chapterId ?? '');
      final resolvedSubjectId = subjectId.value.isNotEmpty
          ? subjectId.value
          : (currentLesson?.subjectId ?? '');

      final result = await _completeLessonUseCase(
        topicId: activeTopicId,
        lessonId: currentLesson?.id,
        chapterId: resolvedChapterId.isNotEmpty ? resolvedChapterId : null,
        subjectId: resolvedSubjectId.isNotEmpty ? resolvedSubjectId : null,
        timeSpentSeconds: elapsed,
      );
      if (isClosed || generation != _loadGeneration) return;

      result.fold(
        (err) {
          isStatusError.value = true;
          statusMessage.value = _resolveErrorMessage(
            err,
            fallbackBn: 'পাঠ সম্পন্ন হিসেবে সংরক্ষণ করা যায়নি।',
            fallbackEn: 'Could not mark lesson as complete.',
          );
        },
        (outcome) {
          isCompleted.value = true;
          if (currentLesson != null) {
            lesson.value = currentLesson.copyWith(isCompleted: true);
          }
          isStatusError.value = false;
          statusMessage.value = outcome.isQueuedOffline
              ? AppStrings.tr(
                  'অফলাইনে সম্পন্ন চিহ্নিত হয়েছে — ইন্টারনেটে সংযুক্ত হলে সিঙ্ক হবে।',
                  'Marked complete offline — will sync when online.',
                  language.value,
                )
              : AppStrings.tr(
                  'অভিনন্দন! পাঠটি সম্পন্ন হিসেবে সংরক্ষিত হয়েছে।',
                  'Great! Lesson marked as completed.',
                  language.value,
                );
        },
      );
    } finally {
      if (!isClosed && generation == _loadGeneration) {
        isCompleting.value = false;
      }
    }
  }

  Future<void> toggleBookmark() async {
    if (isTogglingBookmark.value) return;
    final currentLesson = lesson.value;
    final activeTopicId = topicId.value;
    if (activeTopicId.isEmpty) return;

    final generation = _loadGeneration;
    isTogglingBookmark.value = true;
    statusMessage.value = null;
    isStatusError.value = false;

    try {
      final title = currentLesson?.titleBangla ?? activeTopicId;
      final subtitle = chapterTitle.value.isNotEmpty
          ? chapterTitle.value
          : currentLesson?.chapterTitle;
      final href = '/lesson/$activeTopicId';

      final result = await _toggleBookmarkUseCase(
        itemId: activeTopicId,
        itemType: 'topic',
        titleBangla: title,
        subtitleBangla: subtitle,
        href: href,
      );
      if (isClosed || generation != _loadGeneration) return;

      await result.fold(
        (err) async {
          isStatusError.value = true;
          statusMessage.value = _resolveErrorMessage(
            err,
            fallbackBn: 'বুকমার্ক আপডেট করা যায়নি।',
            fallbackEn: 'Could not update bookmark.',
          );
        },
        (bookmarked) async {
          isBookmarked.value = bookmarked;
          isStatusError.value = false;
          statusMessage.value = bookmarked
              ? AppStrings.tr(
                  'টপিকটি বুকমার্কে সংরক্ষণ করা হয়েছে।',
                  'Topic saved to bookmarks.',
                  language.value,
                )
              : AppStrings.tr(
                  'টপিকটি বুকমার্ক থেকে সরানো হয়েছে।',
                  'Topic removed from bookmarks.',
                  language.value,
                );
          await _patchCachedBookmarkUseCase(
            subjectId: subjectId.value,
            itemId: activeTopicId,
            itemType: 'topic',
            titleBangla: title,
            subtitleBangla: subtitle,
            href: href,
            bookmarked: bookmarked,
          );
        },
      );
    } finally {
      if (!isClosed && generation == _loadGeneration) {
        isTogglingBookmark.value = false;
      }
    }
  }

  Future<String?> saveNote(String rawContent) async {
    if (isSavingNote.value) return null;
    final activeTopicId = topicId.value;
    if (activeTopicId.isEmpty) return null;

    final generation = _loadGeneration;
    isSavingNote.value = true;

    try {
      final result = await _saveNoteUseCase(
        topicId: activeTopicId,
        content: rawContent,
      );
      if (isClosed || generation != _loadGeneration) return null;

      String? errorText;
      await result.fold(
        (err) async {
          if (err.data == ApiResponseErrorType.noInternet ||
              err.data == ApiResponseErrorType.slowOrNoInternet) {
            await _saveLocalLessonNoteUseCase(
              topicId: activeTopicId,
              content: rawContent,
              subjectId: subjectId.value,
            );
            if (isClosed || generation != _loadGeneration) return;
            savedNote.value = rawContent;
            isStatusError.value = false;
            statusMessage.value = AppStrings.tr(
              'নোটটি ডিভাইসে অফলাইনে সংরক্ষিত হয়েছে।',
              'Note saved locally on device.',
              language.value,
            );
          } else {
            errorText = _resolveErrorMessage(
              err,
              fallbackBn: 'নোট সংরক্ষণ করা যায়নি। আবার চেষ্টা করো।',
              fallbackEn: 'Could not save note. Please try again.',
            );
          }
        },
        (saved) async {
          await _saveLocalLessonNoteUseCase(
            topicId: activeTopicId,
            content: saved,
            subjectId: subjectId.value,
          );
          if (isClosed || generation != _loadGeneration) return;
          savedNote.value = saved;
          isStatusError.value = false;
          statusMessage.value = saved.trim().isEmpty
              ? AppStrings.tr('নোট মুছে ফেলা হয়েছে।', 'Note cleared.', language.value)
              : AppStrings.tr(
                  'ব্যক্তিগত নোট সংরক্ষিত হয়েছে।',
                  'Personal note saved.',
                  language.value,
                );
        },
      );
      return errorText;
    } finally {
      if (!isClosed && generation == _loadGeneration) {
        isSavingNote.value = false;
      }
    }
  }

  Future<void> submitExplanationFeedback(bool helpful) async {
    if (isSubmittingFeedback.value) return;
    final currentLesson = lesson.value;
    if (currentLesson == null || currentLesson.id.isEmpty) return;

    final generation = _loadGeneration;
    isSubmittingFeedback.value = true;
    feedbackChoice.value = helpful;

    try {
      final result = await _submitFeedbackUseCase(
        contentType: 'LESSON',
        contentId: currentLesson.id,
        helpful: helpful,
      );
      if (isClosed || generation != _loadGeneration) return;

      result.fold(
        (err) {
          isStatusError.value = true;
          statusMessage.value = _resolveErrorMessage(
            err,
            fallbackBn: 'মতামত পাঠানো যায়নি।',
            fallbackEn: 'Could not send feedback.',
          );
        },
        (_) {
          isStatusError.value = false;
          statusMessage.value = AppStrings.tr(
            'তোমার মতামতের জন্য ধন্যবাদ!',
            'Thanks for your feedback!',
            language.value,
          );
        },
      );
    } finally {
      if (!isClosed && generation == _loadGeneration) {
        isSubmittingFeedback.value = false;
      }
    }
  }

  Future<void> submitQuickCheckAnswer(String optionId) async {
    if (isSubmittingQuickCheck.value || quickCheckResult.value != null) return;
    final question = currentQuickQuestion;
    if (question == null) return;

    final generation = _loadGeneration;
    selectedOptionId.value = optionId;
    isSubmittingQuickCheck.value = true;

    try {
      final result = await _submitQuickCheckAttemptUseCase(
        question: question,
        selectedOptionId: optionId,
      );
      if (isClosed || generation != _loadGeneration) return;

      result.fold(
        (err) {
          selectedOptionId.value = null;
          isStatusError.value = true;
          if (err.code == 'OFFLINE_NO_ANSWER_KEY') {
            statusMessage.value = AppStrings.tr(
              'অফলাইনে উত্তর যাচাইয়ের জন্য ইন্টারনেট সংযোগ চালু করো অথবা অধ্যায়ের অফলাইন প্যাক ডাউনলোড করো।',
              'Connect to internet or download this chapter for offline practice checking.',
              language.value,
            );
          } else {
            statusMessage.value = _resolveErrorMessage(
              err,
              fallbackBn: 'উত্তর যাচাই করা যায়নি। আবার চেষ্টা করো।',
              fallbackEn: 'Could not submit answer. Please try again.',
            );
          }
        },
        (outcome) {
          quickCheckResult.value = outcome;
        },
      );
    } finally {
      if (!isClosed && generation == _loadGeneration) {
        isSubmittingQuickCheck.value = false;
      }
    }
  }

  void nextQuickQuestion() {
    if (quickQuestions.length <= 1) return;
    currentQuestionIndex.value =
        (currentQuestionIndex.value + 1) % quickQuestions.length;
    selectedOptionId.value = null;
    quickCheckResult.value = null;
  }

  String _resolveErrorMessage(
    ErrorResponse err, {
    required String fallbackBn,
    required String fallbackEn,
  }) {
    final msg = err.message?.trim();
    if (msg != null && msg.isNotEmpty) {
      return msg;
    }
    return AppStrings.tr(fallbackBn, fallbackEn, language.value);
  }

  @override
  void onClose() {
    scrollController.dispose();
    super.onClose();
  }
}
