import 'dart:async';
import 'dart:math';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:porhi/app/env.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/features/auth/domain/usecases/auth_usecases.dart';
import 'package:porhi/features/exam/domain/entities/exam_entities.dart';
import 'package:porhi/features/exam/domain/usecases/exam_usecases.dart';
import 'package:porhi/routes/app_routes.dart';

class ExamRunnerController extends GetxController {
  final HeartbeatExamUseCase _heartbeatExamUseCase;
  final SubmitExamUseCase _submitExamUseCase;
  final SaveExamDraftUseCase _saveExamDraftUseCase;
  final DeleteExamDraftUseCase _deleteExamDraftUseCase;
  final GetLanguageUseCase _getLanguageUseCase;
  final ExamRunnerArgs? initialArgs;
  final EnvConfig? envConfig;

  ExamRunnerController({
    required this._heartbeatExamUseCase,
    required this._submitExamUseCase,
    required this._saveExamDraftUseCase,
    required this._deleteExamDraftUseCase,
    required this._getLanguageUseCase,
    this.initialArgs,
    this.envConfig,
  });

  final ScrollController scrollController = ScrollController();

  final Rx<AppLanguage> language = AppLanguage.bn.obs;
  final Rxn<ExamSessionStartEntity> session = Rxn<ExamSessionStartEntity>();
  final RxString examTitle = ''.obs;
  final RxList<ExamQuestionEntity> questions = <ExamQuestionEntity>[].obs;
  final RxInt currentIndex = 0.obs;
  final RxInt remainingSeconds = 0.obs;
  final RxMap<String, String?> answers = <String, String?>{}.obs;
  final RxSet<String> flaggedQuestionIds = <String>{}.obs;

  final RxBool isSubmitting = false.obs;
  final RxBool isHeartbeatInFlight = false.obs;
  final RxBool isResumedSession = false.obs;
  final RxnString errorMessage = RxnString();

  final Map<String, int> _questionTimeSpent = <String, int>{};
  Timer? _countdownTimer;
  int _tickCounter = 0;
  bool _hasSubmitted = false;
  bool _initialized = false;

  bool get hasActiveTimer => _countdownTimer?.isActive == true;

  ExamQuestionEntity? get currentQuestion {
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
      final ans = answers[q.id];
      if (ans != null && ans.isNotEmpty) count++;
    }
    return count;
  }

  int get unansweredCount => max(0, questions.length - answeredCount);

  String formattedRemainingTime(AppLanguage lang) {
    final safe = max(0, remainingSeconds.value);
    final mins = (safe ~/ 60).toString().padLeft(2, '0');
    final secs = (safe % 60).toString().padLeft(2, '0');
    return AppStrings.formatNumber('$mins:$secs', lang);
  }

  @override
  void onInit() {
    super.onInit();
    if (_initialized) return;
    _initialized = true;

    language.value = AppLanguage.fromCode(_getLanguageUseCase());
    final args = initialArgs ??
        (Get.arguments is ExamRunnerArgs
            ? Get.arguments as ExamRunnerArgs
            : null);

    if (args == null || args.session.questions.isEmpty) {
      errorMessage.value = AppStrings.tr(
        'পরীক্ষার সেশন পাওয়া যায়নি।',
        'Exam session not found.',
        language.value,
      );
      return;
    }

    session.value = args.session;
    examTitle.value = args.title?.trim().isNotEmpty == true
        ? args.title!.trim()
        : AppStrings.tr('মডেল টেস্ট', 'Model Test', language.value);
    questions.assignAll(List<ExamQuestionEntity>.from(args.session.questions));
    answers.value = Map<String, String?>.from(args.initialAnswers);
    flaggedQuestionIds.assignAll(List<String>.from(args.initialFlaggedIds));
    isResumedSession.value = args.isResumed;
    currentIndex.value =
        args.initialIndex.clamp(0, max(0, args.session.questions.length - 1));

    final startRemaining =
        args.initialRemainingSeconds ?? args.session.durationSeconds;
    remainingSeconds.value = max(0, startRemaining);

    if (remainingSeconds.value <= 0) {
      unawaited(submitExam(isAutoSubmit: true));
      return;
    }

    unawaited(autosaveDraft());
    _countdownTimer = Timer.periodic(const Duration(seconds: 1), _onTick);
  }

  void _onTick(Timer timer) {
    if (isClosed || _hasSubmitted) {
      timer.cancel();
      _countdownTimer = null;
      return;
    }

    final activeQ = currentQuestion;
    if (activeQ != null) {
      _questionTimeSpent[activeQ.id] =
          (_questionTimeSpent[activeQ.id] ?? 0) + 1;
    }

    final nextRemaining = max(0, remainingSeconds.value - 1);
    remainingSeconds.value = nextRemaining;
    _tickCounter++;

    if (nextRemaining <= 0) {
      timer.cancel();
      _countdownTimer = null;
      unawaited(submitExam(isAutoSubmit: true));
      return;
    }

    if (_tickCounter % 5 == 0) {
      unawaited(autosaveDraft());
    }
    if (_tickCounter % 15 == 0) {
      unawaited(sendHeartbeat());
    }
  }

  void selectOption(String questionId, String optionId) {
    if (_hasSubmitted || isSubmitting.value) return;
    answers[questionId] = optionId;
    unawaited(autosaveDraft());
  }

  void clearSelection(String questionId) {
    if (_hasSubmitted || isSubmitting.value) return;
    answers.remove(questionId);
    unawaited(autosaveDraft());
  }

  void toggleFlag(String questionId) {
    if (_hasSubmitted) return;
    if (flaggedQuestionIds.contains(questionId)) {
      flaggedQuestionIds.remove(questionId);
    } else {
      flaggedQuestionIds.add(questionId);
    }
    unawaited(autosaveDraft());
  }

  void goToQuestion(int index) {
    if (questions.isEmpty) return;
    final clamped = index.clamp(0, questions.length - 1);
    if (clamped == currentIndex.value) return;
    currentIndex.value = clamped;
    if (scrollController.hasClients) {
      scrollController.jumpTo(0);
    }
    unawaited(autosaveDraft());
  }

  void nextQuestion() => goToQuestion(safeIndex + 1);

  void previousQuestion() => goToQuestion(safeIndex - 1);

  Future<void> autosaveDraft() async {
    final activeSession = session.value;
    if (activeSession == null || isClosed || _hasSubmitted) return;

    await _saveExamDraftUseCase(
      ExamDraftEntity(
        sessionId: activeSession.sessionId,
        subjectId: activeSession.subjectId,
        chapterId: activeSession.chapterId,
        testType: activeSession.testType,
        questionIds: questions.map((q) => q.id).toList(),
        answers: Map<String, String?>.from(answers),
        flaggedQuestionIds: flaggedQuestionIds.toList(),
        remainingSeconds: remainingSeconds.value,
        totalDurationSeconds: activeSession.durationSeconds,
        currentIndex: safeIndex,
        startedAt: activeSession.startedAt,
        updatedAt: DateTime.now().toUtc(),
      ),
    );
  }

  List<ExamAnswerInputEntity> _buildAnswerInputs() {
    return questions
        .map(
          (q) => ExamAnswerInputEntity(
            questionId: q.id,
            selectedOptionId: answers[q.id],
            timeSpent: _questionTimeSpent[q.id] ?? 0,
          ),
        )
        .toList();
  }

  Future<void> sendHeartbeat() async {
    final activeSession = session.value;
    if (activeSession == null ||
        activeSession.isOfflineSession ||
        isClosed ||
        _hasSubmitted ||
        isHeartbeatInFlight.value) {
      return;
    }
    isHeartbeatInFlight.value = true;
    try {
      await _heartbeatExamUseCase(
        sessionId: activeSession.sessionId,
        answers: _buildAnswerInputs(),
      );
    } finally {
      if (!isClosed) {
        isHeartbeatInFlight.value = false;
      }
    }
  }

  Future<void> submitExam({bool isAutoSubmit = false}) async {
    if (_hasSubmitted || isSubmitting.value) return;
    final activeSession = session.value;
    if (activeSession == null) return;

    _hasSubmitted = true;
    isSubmitting.value = true;
    errorMessage.value = null;
    _countdownTimer?.cancel();
    _countdownTimer = null;

    final lang = language.value;
    try {
      final res = await _submitExamUseCase(
        sessionId: activeSession.sessionId,
        answers: _buildAnswerInputs(),
        subjectId: activeSession.subjectId,
        chapterId: activeSession.chapterId,
        testType: activeSession.testType,
        durationSeconds: activeSession.durationSeconds,
        negativeRatio: activeSession.negativeRatio,
        isOfflineSession: activeSession.isOfflineSession,
        questions: questions.toList(),
      );
      if (isClosed) return;

      res.fold(
        (err) {
          if (!isAutoSubmit) {
            _hasSubmitted = false;
          }
          errorMessage.value = err.message ??
              AppStrings.tr(
                'উত্তরপত্র জমা দেওয়া যায়নি। আবার চেষ্টা করো।',
                'Could not submit exam. Please try again.',
                lang,
              );
        },
        (result) {
          if (Get.key.currentState != null) {
            Get.offNamed(
              AppRoutes.examResultForSession(result.sessionId),
              arguments: ExamResultArgs(
                preloadedResult: result,
                title: examTitle.value,
              ),
            );
          }
        },
      );
    } finally {
      if (!isClosed) {
        isSubmitting.value = false;
      }
    }
  }

  Future<void> saveAndExit() async {
    await autosaveDraft();
    if (!isClosed && Get.key.currentState != null) {
      Get.back<void>();
    }
  }

  Future<void> discardAndExit() async {
    final activeSession = session.value;
    _hasSubmitted = true;
    _countdownTimer?.cancel();
    _countdownTimer = null;
    if (activeSession != null) {
      await _deleteExamDraftUseCase(activeSession.sessionId);
    }
    if (!isClosed && Get.key.currentState != null) {
      Get.back<void>();
    }
  }

  @override
  void onClose() {
    _countdownTimer?.cancel();
    _countdownTimer = null;
    scrollController.dispose();
    super.onClose();
  }
}
