import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:network/network.dart' show ErrorResponse;
import 'package:porhi/app/env.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/features/auth/domain/usecases/auth_usecases.dart';
import 'package:porhi/features/curriculum/domain/usecases/curriculum_usecases.dart';
import 'package:porhi/features/dashboard/domain/usecases/student_usecases.dart';
import 'package:porhi/features/practice/domain/entities/practice_entities.dart';
import 'package:porhi/features/practice/domain/usecases/practice_usecases.dart';

class PracticeController extends GetxController {
  final GetChapterPracticeQuestionsUseCase _getChapterPracticeQuestionsUseCase;
  final GetCachedChapterPracticeQuestionsUseCase
      _getCachedChapterPracticeQuestionsUseCase;
  final SubmitPracticeAnswerUseCase _submitPracticeAnswerUseCase;
  final SubmitCqSelfAssessUseCase _submitCqSelfAssessUseCase;
  final ToggleBookmarkUseCase _toggleBookmarkUseCase;
  final PatchCachedBookmarkUseCase _patchCachedBookmarkUseCase;
  final GetCachedOverviewUseCase _getCachedOverviewUseCase;
  final GetCachedChaptersUseCase _getCachedChaptersUseCase;
  final GetCachedUserUseCase _getCachedUserUseCase;
  final GetLanguageUseCase _getLanguageUseCase;
  final GetActiveSubjectIdUseCase _getActiveSubjectIdUseCase;
  final EnvConfig? envConfig;

  PracticeController({
    required this._getChapterPracticeQuestionsUseCase,
    required this._getCachedChapterPracticeQuestionsUseCase,
    required this._submitPracticeAnswerUseCase,
    required this._submitCqSelfAssessUseCase,
    required this._toggleBookmarkUseCase,
    required this._patchCachedBookmarkUseCase,
    required this._getCachedOverviewUseCase,
    required this._getCachedChaptersUseCase,
    required this._getCachedUserUseCase,
    required this._getLanguageUseCase,
    required this._getActiveSubjectIdUseCase,
    this.envConfig,
  });

  final ScrollController scrollController = ScrollController();

  final Rx<AppLanguage> language = AppLanguage.bn.obs;
  final RxString chapterId = ''.obs;
  final RxString chapterTitle = ''.obs;
  final RxString subjectId = ''.obs;
  final RxnString topicIdFilter = RxnString();
  final RxString questionTypeMode = 'MCQ'.obs;
  final RxString difficultyFilter = 'ALL'.obs;
  final RxString practiceMode = 'ALL'.obs;

  final RxList<PracticeQuestionEntity> questions =
      <PracticeQuestionEntity>[].obs;
  final RxInt currentIndex = 0.obs;
  final RxBool isLoading = false.obs;
  final RxBool isOfflineMode = false.obs;
  final RxnString errorMessage = RxnString();
  final RxnString statusMessage = RxnString();
  final RxBool isStatusError = false.obs;

  final RxMap<String, String> selectedOptions = <String, String>{}.obs;
  final RxMap<String, PracticeSubmitResultEntity> submitResults =
      <String, PracticeSubmitResultEntity>{}.obs;
  final RxnString submittingQuestionId = RxnString();

  final RxMap<String, CqSelfAssessResultEntity> cqSubmittedResults =
      <String, CqSelfAssessResultEntity>{}.obs;
  final RxnString submittingCqQuestionId = RxnString();

  final RxSet<String> bookmarkedQuestionIds = <String>{}.obs;
  final RxnString togglingBookmarkQuestionId = RxnString();

  final Map<String, PracticeQuestionEntity> _sessionWrongQuestions =
      <String, PracticeQuestionEntity>{};
  int _loadGeneration = 0;

  PracticeQuestionEntity? get currentQuestion {
    if (questions.isEmpty) return null;
    final idx = currentIndex.value.clamp(0, questions.length - 1);
    return questions[idx];
  }

  int get safeIndex {
    if (questions.isEmpty) return 0;
    return currentIndex.value.clamp(0, questions.length - 1);
  }

  int get answeredCount {
    var count = 0;
    for (final q in questions) {
      if (submitResults.containsKey(q.id)) count++;
    }
    return count;
  }

  int get correctCount {
    var count = 0;
    for (final q in questions) {
      if (submitResults[q.id]?.isCorrect == true) count++;
    }
    return count;
  }

  int get wrongCount => answeredCount - correctCount;

  int get accuracyPercent =>
      answeredCount > 0 ? ((correctCount / answeredCount) * 100).round() : 0;

  bool get isSessionCompleted =>
      questionTypeMode.value == 'MCQ' &&
      questions.isNotEmpty &&
      answeredCount == questions.length;

  int get assessedCqCount {
    var count = 0;
    for (final q in questions) {
      if (cqSubmittedResults.containsKey(q.id)) count++;
    }
    return count;
  }

  @override
  void onInit() {
    super.onInit();
    language.value = AppLanguage.fromCode(_getLanguageUseCase());
    _applyInitialRouteContext();
    loadQuestions();
  }

  void _applyInitialRouteContext() {
    final user = _getCachedUserUseCase();
    subjectId.value = _getActiveSubjectIdUseCase(user?.selectedClass);

    final rawChapter = Get.parameters['chapterId']?.trim();
    if (rawChapter != null && rawChapter.isNotEmpty) {
      chapterId.value = Uri.decodeComponent(rawChapter);
    }

    final rawTopic = Get.parameters['topicId']?.trim();
    if (rawTopic != null && rawTopic.isNotEmpty) {
      topicIdFilter.value = Uri.decodeComponent(rawTopic);
    }

    final rawDiff = Get.parameters['difficulty']?.trim().toUpperCase();
    if (rawDiff != null &&
        const <String>{'ALL', 'EASY', 'MEDIUM', 'HARD'}.contains(rawDiff)) {
      difficultyFilter.value = rawDiff;
    }

    final rawMode = Get.parameters['mode']?.trim().toLowerCase();
    if (rawMode == 'mistakes') {
      practiceMode.value = 'MISTAKES';
    }

    final rawType = Get.parameters['type']?.trim().toUpperCase();
    if (rawType == 'CQ_CREATIVE') {
      questionTypeMode.value = 'CQ_CREATIVE';
    } else if (rawType == 'MCQ') {
      questionTypeMode.value = 'MCQ';
    }

    final args = Get.arguments;
    if (args is PracticeRouteArgs) {
      if (args.chapterTitle != null && args.chapterTitle!.trim().isNotEmpty) {
        chapterTitle.value = args.chapterTitle!.trim();
      }
      if (args.subjectId != null && args.subjectId!.trim().isNotEmpty) {
        subjectId.value = args.subjectId!.trim();
      }
      if (args.topicId != null && args.topicId!.trim().isNotEmpty) {
        topicIdFilter.value = args.topicId!.trim();
      }
      if (args.difficulty != null &&
          const <String>{'ALL', 'EASY', 'MEDIUM', 'HARD'}
              .contains(args.difficulty!.trim().toUpperCase())) {
        difficultyFilter.value = args.difficulty!.trim().toUpperCase();
      }
      if (args.mode?.trim().toLowerCase() == 'mistakes') {
        practiceMode.value = 'MISTAKES';
      }
      if (args.type?.trim().toUpperCase() == 'CQ_CREATIVE') {
        questionTypeMode.value = 'CQ_CREATIVE';
      }
    } else if (args is String && args.trim().isNotEmpty && chapterId.isEmpty) {
      chapterId.value = args.trim();
    }

    if (chapterId.value.isEmpty) {
      chapterId.value = 'chap_ssc_physics_ch2';
    }
  }

  Future<void> loadQuestions() async {
    final activeChapterId = chapterId.value.trim();
    if (activeChapterId.isEmpty) return;

    final generation = ++_loadGeneration;
    isLoading.value = true;
    isOfflineMode.value = false;
    errorMessage.value = null;
    statusMessage.value = null;
    isStatusError.value = false;
    currentIndex.value = 0;
    submittingQuestionId.value = null;
    submittingCqQuestionId.value = null;

    try {
      await _hydrateMetadataAndBookmarks(
        chapterId: activeChapterId,
        generation: generation,
      );
      if (isClosed || generation != _loadGeneration) return;

      final difficultyParam = difficultyFilter.value == 'ALL'
          ? null
          : difficultyFilter.value;
      final modeParam =
          practiceMode.value == 'MISTAKES' ? 'mistakes' : null;
      final typeParam = questionTypeMode.value;

      final res = await _getChapterPracticeQuestionsUseCase(
        chapterId: activeChapterId,
        topicId: topicIdFilter.value,
        difficulty: difficultyParam,
        mode: modeParam,
        type: typeParam,
      );
      if (isClosed || generation != _loadGeneration) return;

      res.fold(
        (err) {
          if (practiceMode.value == 'MISTAKES' &&
              _sessionWrongQuestions.isNotEmpty &&
              typeParam == 'MCQ') {
            final filteredWrong = _sessionWrongQuestions.values.where((q) {
              if (difficultyParam != null &&
                  q.difficulty.toUpperCase() != difficultyParam) {
                return false;
              }
              return true;
            }).toList();
            questions.assignAll(filteredWrong);
            isOfflineMode.value = true;
          } else {
            questions.clear();
            errorMessage.value = _resolveErrorMessage(
              err,
              fallbackBn: 'প্রশ্ন লোড করা যায়নি। আবার চেষ্টা করুন।',
              fallbackEn: 'Could not load questions. Please try again.',
            );
          }
        },
        (fetched) {
          questions.assignAll(fetched);
          isOfflineMode.value = fetched.any((q) => q.isFromCache);
        },
      );
    } finally {
      if (!isClosed && generation == _loadGeneration) {
        isLoading.value = false;
      }
    }
  }

  Future<void> _hydrateMetadataAndBookmarks({
    required String chapterId,
    required int generation,
  }) async {
    final activeSubject = subjectId.value.trim();
    if (activeSubject.isEmpty) return;

    final overview = await _getCachedOverviewUseCase(subjectId: activeSubject);
    if (isClosed || generation != _loadGeneration) return;

    if (overview != null) {
      bookmarkedQuestionIds.assignAll(
        overview.bookmarks
            .where((b) => b.type == 'question')
            .map((b) => b.id),
      );
    }

    if (chapterTitle.value.isEmpty) {
      final cachedChapters = await _getCachedChaptersUseCase(activeSubject);
      if (isClosed || generation != _loadGeneration) return;
      for (final ch in cachedChapters) {
        if (ch.id == chapterId && ch.titleBangla.isNotEmpty) {
          chapterTitle.value = ch.titleBangla;
          break;
        }
      }
    }
  }

  Future<void> setQuestionTypeMode(String mode) async {
    final normalized = mode.trim().toUpperCase();
    if (normalized != 'MCQ' && normalized != 'CQ_CREATIVE') return;
    if (questionTypeMode.value == normalized) return;
    questionTypeMode.value = normalized;
    if (normalized == 'CQ_CREATIVE') {
      practiceMode.value = 'ALL';
    }
    await loadQuestions();
  }

  Future<void> setDifficultyFilter(String difficulty) async {
    final normalized = difficulty.trim().toUpperCase();
    if (!const <String>{'ALL', 'EASY', 'MEDIUM', 'HARD'}
        .contains(normalized)) {
      return;
    }
    if (difficultyFilter.value == normalized) return;
    difficultyFilter.value = normalized;
    await loadQuestions();
  }

  Future<void> toggleMistakesMode() async {
    if (questionTypeMode.value != 'MCQ') return;
    practiceMode.value =
        practiceMode.value == 'MISTAKES' ? 'ALL' : 'MISTAKES';
    await loadQuestions();
  }

  Future<void> clearFiltersAndReload() async {
    difficultyFilter.value = 'ALL';
    practiceMode.value = 'ALL';
    await loadQuestions();
  }

  Future<void> submitMcqOption(String optionId) async {
    final q = currentQuestion;
    if (q == null || q.isCreative) return;
    if (submittingQuestionId.value != null) return;
    if (submitResults.containsKey(q.id)) return;

    final generation = _loadGeneration;
    submittingQuestionId.value = q.id;
    selectedOptions[q.id] = optionId;
    statusMessage.value = null;
    isStatusError.value = false;

    try {
      final res = await _submitPracticeAnswerUseCase(
        questionId: q.id,
        selectedOptionId: optionId,
        chapterId: chapterId.value,
        topicId: q.topicId,
        question: q,
      );
      if (isClosed || generation != _loadGeneration) return;

      res.fold(
        (err) {
          selectedOptions.remove(q.id);
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
              fallbackBn: 'উত্তর জমা দেওয়া যায়নি। আবার চেষ্টা করো।',
              fallbackEn: 'Could not submit answer. Please try again.',
            );
          }
        },
        (outcome) {
          submitResults[q.id] = outcome;
          if (outcome.isQueuedOffline) {
            isOfflineMode.value = true;
          }

          final updatedOptions = outcome.correctOptionId == null
              ? q.options
              : q.options
                  .map(
                    (opt) => opt.copyWith(
                      isCorrect: opt.id == outcome.correctOptionId,
                    ),
                  )
                  .toList();
          final updatedQ = q.copyWith(
            options: updatedOptions,
            explanation: outcome.explanation ?? q.explanation,
          );
          final idx = questions.indexWhere((item) => item.id == q.id);
          if (idx >= 0) {
            questions[idx] = updatedQ;
          }

          if (!outcome.isCorrect) {
            _sessionWrongQuestions[updatedQ.id] = updatedQ;
          } else {
            _sessionWrongQuestions.remove(updatedQ.id);
          }
        },
      );
    } finally {
      if (!isClosed && generation == _loadGeneration) {
        submittingQuestionId.value = null;
      }
    }
  }

  Future<void> submitCqSelfAssess(CqSelfScoresEntity scores) async {
    final q = currentQuestion;
    if (q == null) return;
    if (submittingCqQuestionId.value != null) return;

    final generation = _loadGeneration;
    submittingCqQuestionId.value = q.id;
    statusMessage.value = null;
    isStatusError.value = false;

    try {
      final res = await _submitCqSelfAssessUseCase(
        questionId: q.id,
        selfScores: scores,
        topicId: q.topicId,
      );
      if (isClosed || generation != _loadGeneration) return;

      res.fold(
        (err) {
          isStatusError.value = true;
          statusMessage.value = _resolveErrorMessage(
            err,
            fallbackBn: 'স্ব-মূল্যায়ন সংরক্ষণ করা যায়নি।',
            fallbackEn: 'Could not save self-assessment.',
          );
        },
        (outcome) {
          cqSubmittedResults[q.id] = outcome;
          if (outcome.isQueuedOffline) {
            isOfflineMode.value = true;
          }
          isStatusError.value = false;
          statusMessage.value = outcome.isQueuedOffline
              ? AppStrings.tr(
                  'অফলাইনে স্ব-মূল্যায়ন সংরক্ষিত হয়েছে — অনলাইনে সিঙ্ক হবে।',
                  'Self-assessment saved offline — will sync when online.',
                  language.value,
                )
              : AppStrings.tr(
                  'স্ব-মূল্যায়ন সফলভাবে সংরক্ষিত হয়েছে।',
                  'Self-assessment saved successfully.',
                  language.value,
                );
        },
      );
    } finally {
      if (!isClosed && generation == _loadGeneration) {
        submittingCqQuestionId.value = null;
      }
    }
  }

  Future<void> toggleQuestionBookmark() async {
    final q = currentQuestion;
    if (q == null || togglingBookmarkQuestionId.value != null) return;

    final generation = _loadGeneration;
    togglingBookmarkQuestionId.value = q.id;
    statusMessage.value = null;
    isStatusError.value = false;

    try {
      final title =
          q.stem.length > 80 ? q.stem.substring(0, 80) : q.stem;
      final subtitle = chapterTitle.value.isNotEmpty
          ? chapterTitle.value
          : AppStrings.tr('অনুশীলন প্রশ্ন', 'Practice Question', language.value);
      final topicParam = topicIdFilter.value;
      final href = topicParam != null && topicParam.isNotEmpty
          ? '/practice/${chapterId.value}?topicId=$topicParam'
          : '/practice/${chapterId.value}';

      final result = await _toggleBookmarkUseCase(
        itemId: q.id,
        itemType: 'question',
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
          if (bookmarked) {
            bookmarkedQuestionIds.add(q.id);
          } else {
            bookmarkedQuestionIds.remove(q.id);
          }
          isStatusError.value = false;
          statusMessage.value = bookmarked
              ? AppStrings.tr(
                  'প্রশ্নটি বুকমার্কে সংরক্ষণ করা হয়েছে।',
                  'Question bookmarked.',
                  language.value,
                )
              : AppStrings.tr(
                  'প্রশ্নটি বুকমার্ক থেকে সরানো হয়েছে।',
                  'Question removed from bookmarks.',
                  language.value,
                );
          if (subjectId.value.trim().isNotEmpty) {
            await _patchCachedBookmarkUseCase(
              subjectId: subjectId.value,
              itemId: q.id,
              itemType: 'question',
              titleBangla: title,
              subtitleBangla: subtitle,
              href: href,
              bookmarked: bookmarked,
            );
          }
        },
      );
    } finally {
      if (!isClosed && generation == _loadGeneration) {
        togglingBookmarkQuestionId.value = null;
      }
    }
  }

  void nextQuestion() {
    if (questions.isEmpty) return;
    if (safeIndex < questions.length - 1) {
      currentIndex.value = safeIndex + 1;
      _scrollToTop();
    }
  }

  void previousQuestion() {
    if (questions.isEmpty) return;
    if (safeIndex > 0) {
      currentIndex.value = safeIndex - 1;
      _scrollToTop();
    }
  }

  void retrySessionMistakes() {
    final wrongQuestions = questions
        .where((q) => submitResults[q.id]?.isCorrect == false)
        .toList();
    if (wrongQuestions.isEmpty) return;

    for (final q in wrongQuestions) {
      selectedOptions.remove(q.id);
      submitResults.remove(q.id);
    }
    practiceMode.value = 'MISTAKES';
    questions.assignAll(wrongQuestions);
    currentIndex.value = 0;
    statusMessage.value = null;
    _scrollToTop();
  }

  Future<void> restartSession() async {
    for (final q in questions) {
      selectedOptions.remove(q.id);
      submitResults.remove(q.id);
      cqSubmittedResults.remove(q.id);
    }
    currentIndex.value = 0;
    statusMessage.value = null;
    if (practiceMode.value == 'MISTAKES') {
      practiceMode.value = 'ALL';
      await loadQuestions();
    } else {
      _scrollToTop();
    }
  }

  Future<List<PracticeQuestionEntity>> loadCachedFallbackPreview() {
    return _getCachedChapterPracticeQuestionsUseCase(
      chapterId: chapterId.value,
      topicId: topicIdFilter.value,
      difficulty:
          difficultyFilter.value == 'ALL' ? null : difficultyFilter.value,
      type: questionTypeMode.value,
    );
  }

  void _scrollToTop() {
    if (scrollController.hasClients) {
      scrollController.jumpTo(0);
    }
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
