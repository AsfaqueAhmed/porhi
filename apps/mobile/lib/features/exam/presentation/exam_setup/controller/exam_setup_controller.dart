import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/core/i18n/bangla_digits.dart';
import 'package:porhi/features/auth/domain/usecases/auth_usecases.dart';
import 'package:porhi/features/curriculum/domain/entities/curriculum_entities.dart';
import 'package:porhi/features/curriculum/domain/usecases/curriculum_usecases.dart';
import 'package:porhi/features/dashboard/domain/usecases/student_usecases.dart';
import 'package:porhi/features/exam/domain/entities/exam_entities.dart';
import 'package:porhi/features/exam/domain/usecases/exam_usecases.dart';
import 'package:porhi/routes/app_routes.dart';

class ExamSetupController extends GetxController {
  static const List<int> presetQuestionLimits = <int>[10, 20, 25, 50];
  static const List<int> presetDurationMinutes = <int>[10, 15, 25];
  static const List<double> presetNegativeRatios = <double>[0.0, 0.25, 0.5];

  final StartExamUseCase _startExamUseCase;
  final GetLatestExamDraftUseCase _getLatestExamDraftUseCase;
  final DeleteExamDraftUseCase _deleteExamDraftUseCase;
  final ResumeExamSessionUseCase _resumeExamSessionUseCase;
  final GetCachedChaptersUseCase _getCachedChaptersUseCase;
  final GetCachedSubjectsUseCase _getCachedSubjectsUseCase;
  final GetCachedUserUseCase _getCachedUserUseCase;
  final GetActiveSubjectIdUseCase _getActiveSubjectIdUseCase;
  final GetLanguageUseCase _getLanguageUseCase;

  ExamSetupController({
    required this._startExamUseCase,
    required this._getLatestExamDraftUseCase,
    required this._deleteExamDraftUseCase,
    required this._resumeExamSessionUseCase,
    required this._getCachedChaptersUseCase,
    required this._getCachedSubjectsUseCase,
    required this._getCachedUserUseCase,
    required this._getActiveSubjectIdUseCase,
    required this._getLanguageUseCase,
  });

  final ScrollController scrollController = ScrollController();
  final TextEditingController customMinutesController =
      TextEditingController(text: '15');

  final Rx<AppLanguage> language = AppLanguage.bn.obs;
  final RxString subjectId = ''.obs;
  final RxString subjectTitle = ''.obs;
  final RxString chapterId = ''.obs;
  final RxString chapterTitle = ''.obs;
  final Rx<ExamTestType> testType = ExamTestType.chapterTest.obs;
  final RxString selectedTopicId = ''.obs;
  final RxList<TopicEntity> chapterTopics = <TopicEntity>[].obs;

  final RxInt questionLimit = 10.obs;
  final RxInt durationSeconds = 600.obs;
  final RxBool isCustomDuration = false.obs;
  final RxDouble negativeRatio = 0.25.obs;

  final Rxn<ExamDraftEntity> pendingDraft = Rxn<ExamDraftEntity>();
  final RxBool isStarting = false.obs;
  final RxBool isResuming = false.obs;
  final RxBool isDiscarding = false.obs;
  final RxnString errorMessage = RxnString();
  bool _isNavigatingToRehearsal = false;

  bool get isBusy =>
      isStarting.value || isResuming.value || isDiscarding.value;

  Future<void> openMultiSubjectRehearsal() async {
    if (isBusy || _isNavigatingToRehearsal) return;
    _isNavigatingToRehearsal = true;
    try {
      await Get.toNamed(AppRoutes.examRehearsal);
    } finally {
      _isNavigatingToRehearsal = false;
    }
  }

  bool get isSubjectMode => testType.value == ExamTestType.subjectTest;

  String get displayTitle {
    final lang = language.value;
    if (isSubjectMode) {
      if (subjectTitle.value.isNotEmpty) {
        return '${subjectTitle.value} — ${AppStrings.tr('বিষয়ভিত্তিক মডেল টেস্ট', 'Subject Model Test', lang)}';
      }
      return AppStrings.tr('বিষয়ভিত্তিক মডেল টেস্ট', 'Subject Model Test', lang);
    }
    if (chapterTitle.value.isNotEmpty) {
      return chapterTitle.value;
    }
    return AppStrings.tr('মডেল টেস্ট সেটআপ', 'Model Test Setup', lang);
  }

  String _tryDecodeUriComponent(String raw) {
    try {
      return Uri.decodeComponent(raw);
    } on ArgumentError {
      return raw;
    }
  }

  @override
  void onInit() {
    super.onInit();
    language.value = AppLanguage.fromCode(_getLanguageUseCase());
    _applyInitialRouteContext();
    _loadMetadataAndDraft();
  }

  void _applyInitialRouteContext() {
    final user = _getCachedUserUseCase();
    final fallbackSubjectId = _getActiveSubjectIdUseCase(user?.selectedClass);

    final rawArgs = Get.arguments;
    final ExamSetupRouteArgs? args;
    if (rawArgs is ExamSetupRouteArgs) {
      args = rawArgs;
    } else if (rawArgs is Map) {
      final rawType = rawArgs['testType']?.toString();
      args = ExamSetupRouteArgs(
        subjectId: rawArgs['subjectId']?.toString(),
        chapterId: rawArgs['chapterId']?.toString(),
        chapterTitle: rawArgs['chapterTitle']?.toString(),
        topicId: rawArgs['topicId']?.toString(),
        testType: rawType != null && rawType.trim().isNotEmpty
            ? ExamTestType.fromApiValue(rawType)
            : null,
      );
    } else {
      args = null;
    }

    if (args?.subjectId != null && args!.subjectId!.trim().isNotEmpty) {
      subjectId.value = args.subjectId!.trim();
    } else {
      subjectId.value = fallbackSubjectId;
    }

    if (args?.chapterTitle != null && args!.chapterTitle!.trim().isNotEmpty) {
      chapterTitle.value = args.chapterTitle!.trim();
    }

    final rawParam = Get.parameters['chapterId']?.trim();
    final decodedParam =
        rawParam != null && rawParam.isNotEmpty ? _tryDecodeUriComponent(rawParam) : '';

    if (decodedParam.startsWith('subject_')) {
      final extractedSubject = decodedParam.substring('subject_'.length).trim();
      if (extractedSubject.isNotEmpty) {
        subjectId.value = extractedSubject;
      }
      chapterId.value = '';
      testType.value = ExamTestType.subjectTest;
      questionLimit.value = 25;
      durationSeconds.value = 25 * 60;
    } else if (decodedParam.isNotEmpty) {
      chapterId.value = decodedParam;
      testType.value = args?.testType ?? ExamTestType.chapterTest;
      questionLimit.value = 10;
      durationSeconds.value = 10 * 60;
    } else if (args?.chapterId != null && args!.chapterId!.trim().isNotEmpty) {
      chapterId.value = args.chapterId!.trim();
      testType.value = args.testType ?? ExamTestType.chapterTest;
    } else if (args?.testType != null) {
      testType.value = args!.testType!;
      if (args.testType == ExamTestType.subjectTest) {
        questionLimit.value = 25;
        durationSeconds.value = 25 * 60;
      }
    }

    final rawTopic = Get.parameters['topicId']?.trim() ?? args?.topicId?.trim();
    if (rawTopic != null && rawTopic.isNotEmpty) {
      selectedTopicId.value = _tryDecodeUriComponent(rawTopic);
      if (testType.value == ExamTestType.chapterTest) {
        testType.value = ExamTestType.topicTest;
      }
    }

    final rawType = Get.parameters['testType']?.trim();
    if (rawType != null && rawType.isNotEmpty) {
      testType.value = ExamTestType.fromApiValue(rawType);
      if (testType.value == ExamTestType.subjectTest) {
        chapterId.value = '';
        questionLimit.value = 25;
        durationSeconds.value = 25 * 60;
      }
    }

    if (chapterId.value.isEmpty &&
        args?.testType == null &&
        (rawType == null || rawType.isEmpty)) {
      testType.value = ExamTestType.subjectTest;
      questionLimit.value = 25;
      durationSeconds.value = 25 * 60;
    }
  }

  Future<void> _loadMetadataAndDraft() async {
    try {
      final subjects = await _getCachedSubjectsUseCase();
      if (isClosed) return;
      for (final s in subjects) {
        if (s.id == subjectId.value) {
          subjectTitle.value = s.nameBangla;
          break;
        }
      }

      if (subjectId.value.isNotEmpty) {
        final chapters = await _getCachedChaptersUseCase(subjectId.value);
        if (isClosed) return;
        for (final ch in chapters) {
          if (ch.id == chapterId.value) {
            if (chapterTitle.value.isEmpty) {
              chapterTitle.value = ch.titleBangla;
            }
            chapterTopics.assignAll(ch.topics);
            if (selectedTopicId.value.isEmpty && ch.topics.isNotEmpty) {
              selectedTopicId.value = ch.topics.first.id;
            }
            break;
          }
        }
      }

      final draft = await _getLatestExamDraftUseCase();
      if (isClosed) return;
      pendingDraft.value = draft;
    } catch (_) {
      // Metadata & draft checks are best-effort; ignore cache errors.
    }
  }

  void selectTestType(ExamTestType nextType) {
    if (testType.value == nextType) return;
    errorMessage.value = null;
    testType.value = nextType;
    if (nextType == ExamTestType.topicTest &&
        selectedTopicId.value.isEmpty &&
        chapterTopics.isNotEmpty) {
      selectedTopicId.value = chapterTopics.first.id;
    }
    if (nextType == ExamTestType.subjectTest && questionLimit.value < 25) {
      questionLimit.value = 25;
      if (!isCustomDuration.value) {
        durationSeconds.value = 25 * 60;
      }
    }
  }

  void selectTopic(String topicId) {
    selectedTopicId.value = topicId;
  }

  void selectQuestionLimit(int limit) {
    questionLimit.value = limit;
    if (!isCustomDuration.value) {
      durationSeconds.value = (limit.clamp(1, 90)) * 60;
    }
  }

  void selectPresetDurationMinutes(int minutes) {
    isCustomDuration.value = false;
    durationSeconds.value = minutes * 60;
    errorMessage.value = null;
  }

  void enableCustomDuration() {
    isCustomDuration.value = true;
    errorMessage.value = null;
  }

  void selectNegativeRatio(double ratio) {
    negativeRatio.value = ratio;
  }

  int? _resolveEffectiveDurationSeconds() {
    if (!isCustomDuration.value) {
      return durationSeconds.value;
    }
    final normalized = toAsciiDigits(customMinutesController.text.trim());
    final parsedMinutes = int.tryParse(normalized);
    if (parsedMinutes == null) return null;
    return parsedMinutes * 60;
  }

  Future<void> startExam() async {
    if (isBusy) return;

    final lang = language.value;
    final effectiveDuration = _resolveEffectiveDurationSeconds();
    if (effectiveDuration == null ||
        effectiveDuration < StartExamUseCase.minDurationSeconds ||
        effectiveDuration > StartExamUseCase.maxDurationSeconds) {
      errorMessage.value = AppStrings.tr(
        'পরীক্ষার সময় ১ থেকে ১২০ মিনিটের মধ্যে হতে হবে।',
        'Duration must be between 1 and 120 minutes.',
        lang,
      );
      return;
    }

    isStarting.value = true;
    errorMessage.value = null;

    try {
      final res = await _startExamUseCase(
        testType: testType.value,
        subjectId: subjectId.value,
        chapterId: isSubjectMode ? null : chapterId.value,
        topicId:
            testType.value == ExamTestType.topicTest ? selectedTopicId.value : null,
        questionLimit: questionLimit.value,
        negativeRatio: negativeRatio.value,
        durationSeconds: effectiveDuration,
      );
      if (isClosed) return;

      res.fold(
        (err) {
          errorMessage.value = resolveExamErrorMessage(
            err.message,
            AppStrings.tr(
              'পরীক্ষা শুরু করা যায়নি। আবার চেষ্টা করো।',
              'Could not start exam. Please try again.',
              lang,
            ),
          );
        },
        (session) {
          Get.offNamed(
            AppRoutes.examRunner,
            arguments: ExamRunnerArgs(
              session: session,
              title: displayTitle,
            ),
          );
        },
      );
    } finally {
      if (!isClosed) {
        isStarting.value = false;
      }
    }
  }

  Future<void> resumeDraft() async {
    if (isBusy) return;
    final draft = pendingDraft.value;
    if (draft == null) return;

    final lang = language.value;
    isResuming.value = true;
    errorMessage.value = null;

    try {
      final res = await _resumeExamSessionUseCase(draft);
      if (isClosed) return;

      res.fold(
        (err) {
          errorMessage.value = resolveExamErrorMessage(
            err.message,
            AppStrings.tr(
              'অসমাপ্ত পরীক্ষা পুনরায় চালু করা যায়নি।',
              'Could not resume unfinished exam.',
              lang,
            ),
          );
        },
        (resumeData) {
          if (resumeData.isCompleted && resumeData.completedResult != null) {
            final result = resumeData.completedResult!;
            Get.offNamed(
              AppRoutes.examResultForSession(result.sessionId),
              arguments: ExamResultArgs(
                preloadedResult: result,
                title: displayTitle,
              ),
            );
            return;
          }

          if (resumeData.session != null) {
            Get.offNamed(
              AppRoutes.examRunner,
              arguments: ExamRunnerArgs(
                session: resumeData.session!,
                title: displayTitle,
                initialAnswers: resumeData.answers,
                initialFlaggedIds: resumeData.flaggedQuestionIds,
                initialRemainingSeconds: resumeData.remainingSeconds,
                initialIndex: resumeData.currentIndex,
                isResumed: true,
              ),
            );
          }
        },
      );
    } finally {
      if (!isClosed) {
        isResuming.value = false;
      }
    }
  }

  Future<void> discardDraft() async {
    if (isBusy) return;
    final draft = pendingDraft.value;
    if (draft == null) return;
    isDiscarding.value = true;
    errorMessage.value = null;
    try {
      await _deleteExamDraftUseCase(draft.sessionId);
      if (isClosed) return;
      pendingDraft.value = null;
    } finally {
      if (!isClosed) {
        isDiscarding.value = false;
      }
    }
  }

  @override
  void onClose() {
    scrollController.dispose();
    customMinutesController.dispose();
    super.onClose();
  }
}
