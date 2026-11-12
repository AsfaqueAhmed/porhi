import 'dart:async';
import 'dart:math';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:porhi/app/env.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/core/i18n/bangla_digits.dart';
import 'package:porhi/features/auth/domain/usecases/auth_usecases.dart';
import 'package:porhi/features/curriculum/domain/entities/curriculum_entities.dart';
import 'package:porhi/features/curriculum/domain/usecases/curriculum_usecases.dart';
import 'package:porhi/features/exam/domain/entities/exam_entities.dart';
import 'package:porhi/features/rehearsal/domain/entities/rehearsal_entities.dart';
import 'package:porhi/features/rehearsal/domain/usecases/rehearsal_usecases.dart';

class RehearsalPaperDraft {
  final int localId;
  final String subjectId;
  final String labelBangla;
  final int questionCount;
  final int durationMinutes;
  final bool hasValidQuestionCount;
  final bool hasValidDuration;

  const RehearsalPaperDraft({
    required this.localId,
    required this.subjectId,
    required this.labelBangla,
    this.questionCount = 5,
    this.durationMinutes = 10,
    this.hasValidQuestionCount = true,
    this.hasValidDuration = true,
  });

  RehearsalPaperDraft copyWith({
    String? subjectId,
    String? labelBangla,
    int? questionCount,
    int? durationMinutes,
    bool? hasValidQuestionCount,
    bool? hasValidDuration,
  }) {
    return RehearsalPaperDraft(
      localId: localId,
      subjectId: subjectId ?? this.subjectId,
      labelBangla: labelBangla ?? this.labelBangla,
      questionCount: questionCount ?? this.questionCount,
      durationMinutes: durationMinutes ?? this.durationMinutes,
      hasValidQuestionCount:
          hasValidQuestionCount ?? this.hasValidQuestionCount,
      hasValidDuration: hasValidDuration ?? this.hasValidDuration,
    );
  }
}

class RehearsalPresetSpec {
  final List<String> keywords;
  final int questionCount;
  final int durationMinutes;

  const RehearsalPresetSpec({
    required this.keywords,
    required this.questionCount,
    required this.durationMinutes,
  });
}

class RehearsalPresetTemplate {
  final String id;
  final String titleBangla;
  final String titleEnglish;
  final String subtitleBangla;
  final String subtitleEnglish;
  final String? preferredProgram;
  final double negativeRatio;
  final List<RehearsalPresetSpec> specs;

  const RehearsalPresetTemplate({
    required this.id,
    required this.titleBangla,
    required this.titleEnglish,
    required this.subtitleBangla,
    required this.subtitleEnglish,
    this.preferredProgram,
    required this.negativeRatio,
    required this.specs,
  });
}

class RehearsalController extends GetxController {
  static const List<double> presetNegativeRatios = <double>[0.0, 0.25, 0.5];

  static const List<RehearsalPresetTemplate> presetTemplates =
      <RehearsalPresetTemplate>[
    RehearsalPresetTemplate(
      id: 'ssc_science_double',
      titleBangla: 'SSC বিজ্ঞান ডাবল পেপার',
      titleEnglish: 'SSC Science Double Paper',
      subtitleBangla: '২ পত্র • ২০ প্রশ্ন • ২০ মি.',
      subtitleEnglish: '2 papers • 20 Qs • 20 min',
      preferredProgram: 'SSC',
      negativeRatio: 0.25,
      specs: <RehearsalPresetSpec>[
        RehearsalPresetSpec(
          keywords: <String>['phy', 'পদার্থ'],
          questionCount: 20,
          durationMinutes: 20,
        ),
        RehearsalPresetSpec(
          keywords: <String>['chem', 'রসায়ন'],
          questionCount: 20,
          durationMinutes: 20,
        ),
      ],
    ),
    RehearsalPresetTemplate(
      id: 'hsc_triple_mock',
      titleBangla: 'HSC ৩-পত্র মডেল টেস্ট',
      titleEnglish: 'HSC Triple Mock',
      subtitleBangla: '৩ পত্র • ২৫ প্রশ্ন • ২৫ মি.',
      subtitleEnglish: '3 papers • 25 Qs • 25 min',
      preferredProgram: 'HSC',
      negativeRatio: 0.25,
      specs: <RehearsalPresetSpec>[
        RehearsalPresetSpec(
          keywords: <String>['phy', 'পদার্থ'],
          questionCount: 25,
          durationMinutes: 25,
        ),
        RehearsalPresetSpec(
          keywords: <String>['chem', 'রসায়ন'],
          questionCount: 25,
          durationMinutes: 25,
        ),
        RehearsalPresetSpec(
          keywords: <String>['math', 'গণিত'],
          questionCount: 25,
          durationMinutes: 25,
        ),
      ],
    ),
    RehearsalPresetTemplate(
      id: 'admission_sprint',
      titleBangla: 'অ্যাডমিশন স্প্রিন্ট',
      titleEnglish: 'Admission Sprint',
      subtitleBangla: '৩ পত্র • -০.৫০ নেগেটিভ',
      subtitleEnglish: '3 papers • -0.50 negative',
      preferredProgram: 'ADMISSION',
      negativeRatio: 0.5,
      specs: <RehearsalPresetSpec>[
        RehearsalPresetSpec(
          keywords: <String>['phy', 'পদার্থ'],
          questionCount: 15,
          durationMinutes: 10,
        ),
        RehearsalPresetSpec(
          keywords: <String>['chem', 'রসায়ন'],
          questionCount: 15,
          durationMinutes: 10,
        ),
        RehearsalPresetSpec(
          keywords: <String>['bio', 'math', 'জীব', 'গণিত'],
          questionCount: 15,
          durationMinutes: 10,
        ),
      ],
    ),
  ];

  final StartRehearsalUseCase _startRehearsalUseCase;
  final GetRehearsalHistoryUseCase _getRehearsalHistoryUseCase;
  final GetRehearsalUseCase _getRehearsalUseCase;
  final StartRehearsalPaperUseCase _startRehearsalPaperUseCase;
  final SubmitRehearsalPaperUseCase _submitRehearsalPaperUseCase;
  final GetSubjectsUseCase _getSubjectsUseCase;
  final GetCachedSubjectsUseCase _getCachedSubjectsUseCase;
  final GetLanguageUseCase _getLanguageUseCase;
  final EnvConfig? envConfig;

  RehearsalController({
    required this._startRehearsalUseCase,
    required this._getRehearsalHistoryUseCase,
    required this._getRehearsalUseCase,
    required this._startRehearsalPaperUseCase,
    required this._submitRehearsalPaperUseCase,
    required this._getSubjectsUseCase,
    required this._getCachedSubjectsUseCase,
    required this._getLanguageUseCase,
    this.envConfig,
  });

  final TextEditingController titleController =
      TextEditingController(text: 'বহু-পত্র মডেল টেস্ট রিহার্সাল');
  final ScrollController scrollController = ScrollController();

  final Rx<AppLanguage> language = AppLanguage.bn.obs;
  final RxList<SubjectEntity> subjects = <SubjectEntity>[].obs;
  final RxList<MultiExamRehearsalEntity> history =
      <MultiExamRehearsalEntity>[].obs;
  final RxList<RehearsalPaperDraft> papers = <RehearsalPaperDraft>[].obs;
  final RxDouble negativeRatio = 0.25.obs;

  final Rxn<MultiExamRehearsalEntity> rehearsal =
      Rxn<MultiExamRehearsalEntity>();
  final Rxn<ExamSessionStartEntity> activeSession =
      Rxn<ExamSessionStartEntity>();
  final Rxn<ExamResultEntity> lastPaperResult = Rxn<ExamResultEntity>();

  final RxInt currentQuestionIndex = 0.obs;
  final RxInt remainingSeconds = 0.obs;
  final RxMap<String, String?> answers = <String, String?>{}.obs;

  final RxBool isLoading = false.obs;
  final RxBool isStarting = false.obs;
  final RxBool isSubmitting = false.obs;
  final RxnString errorMessage = RxnString();

  final Map<String, int> _questionTimeSpent = <String, int>{};
  Timer? _countdownTimer;
  int _nextPaperLocalId = 1;
  int _loadGeneration = 0;
  int _sessionGeneration = 0;
  bool _hasSubmittedPaper = false;

  bool get hasActiveTimer => _countdownTimer?.isActive == true;

  bool get isBusy =>
      isLoading.value || isStarting.value || isSubmitting.value;

  List<ExamQuestionEntity> get activeQuestions =>
      activeSession.value?.questions ?? const <ExamQuestionEntity>[];

  int get safeQuestionIndex {
    final total = activeQuestions.length;
    if (total == 0) return 0;
    return currentQuestionIndex.value.clamp(0, total - 1);
  }

  ExamQuestionEntity? get currentQuestion {
    final qs = activeQuestions;
    if (qs.isEmpty) return null;
    return qs[safeQuestionIndex];
  }

  RehearsalPaperStateEntity? get activePaper {
    final current = rehearsal.value;
    if (current == null) return null;
    return current.currentPaper;
  }

  int get answeredCount {
    var count = 0;
    for (final q in activeQuestions) {
      final ans = answers[q.id];
      if (ans != null && ans.isNotEmpty) count++;
    }
    return count;
  }

  String formattedRemainingTime(AppLanguage lang) {
    final safe = max(0, remainingSeconds.value);
    final mins = (safe ~/ 60).toString().padLeft(2, '0');
    final secs = (safe % 60).toString().padLeft(2, '0');
    return AppStrings.formatNumber('$mins:$secs', lang);
  }

  @override
  void onInit() {
    super.onInit();
    language.value = AppLanguage.fromCode(_getLanguageUseCase());
    unawaited(loadInitialData());
  }

  Future<void> loadInitialData() async {
    final generation = ++_loadGeneration;
    isLoading.value = true;
    errorMessage.value = null;

    try {
      final cachedSubjects = await _getCachedSubjectsUseCase();
      if (isClosed || generation != _loadGeneration) return;
      if (cachedSubjects.isNotEmpty && subjects.isEmpty) {
        _applySubjects(cachedSubjects);
      }

      final results = await Future.wait<dynamic>(<Future<dynamic>>[
        _getSubjectsUseCase(),
        _getRehearsalHistoryUseCase(),
      ]);
      if (isClosed || generation != _loadGeneration) return;

      final subjectsRes = results[0];
      final historyRes = results[1];

      subjectsRes.fold(
        (err) {
          if (subjects.isEmpty) {
            errorMessage.value = _nonBlankError(
              err.message,
              AppStrings.tr(
                'বিষয় তালিকা লোড করা যায়নি।',
                'Could not load subjects.',
                language.value,
              ),
            );
          }
        },
        (List<SubjectEntity> loaded) {
          final ready = loaded.where((s) => s.isReady).toList();
          _applySubjects(ready.isNotEmpty ? ready : loaded);
        },
      );

      historyRes.fold(
        (_) {},
        (List<MultiExamRehearsalEntity> items) {
          history.assignAll(items);
        },
      );
    } finally {
      if (!isClosed && generation == _loadGeneration) {
        isLoading.value = false;
      }
    }
  }

  void _applySubjects(List<SubjectEntity> list) {
    subjects.assignAll(list);
    if (papers.isEmpty && list.isNotEmpty) {
      final first = list[0];
      final second = list.length > 1 ? list[1] : list[0];
      papers.assignAll(<RehearsalPaperDraft>[
        RehearsalPaperDraft(
          localId: _nextPaperLocalId++,
          subjectId: first.id,
          labelBangla: 'পত্র ১: ${first.nameBangla}',
          questionCount: 5,
          durationMinutes: 10,
        ),
        RehearsalPaperDraft(
          localId: _nextPaperLocalId++,
          subjectId: second.id,
          labelBangla: 'পত্র ২: ${second.nameBangla}',
          questionCount: 5,
          durationMinutes: 10,
        ),
      ]);
    }
  }

  String _nonBlankError(String? raw, String fallback) {
    final trimmed = raw?.trim() ?? '';
    return trimmed.isNotEmpty ? trimmed : fallback;
  }

  void applyPreset(String presetId) {
    final preset = presetTemplates.firstWhereOrNull((p) => p.id == presetId);
    if (preset == null || subjects.isEmpty) return;

    final preferred = preset.preferredProgram;
    final programMatches = preferred == null
        ? const <SubjectEntity>[]
        : subjects
            .where((s) => s.program.apiValue.toUpperCase() == preferred)
            .toList();
    final pool = programMatches.isNotEmpty ? programMatches : subjects.toList();

    final usedIds = <String>{};
    final built = <RehearsalPaperDraft>[];

    for (var i = 0; i < preset.specs.length; i++) {
      final spec = preset.specs[i];
      SubjectEntity? matched = pool.firstWhereOrNull((s) {
        if (usedIds.contains(s.id)) return false;
        final haystack = '${s.code} ${s.nameBangla}'.toLowerCase();
        return spec.keywords.any((kw) => haystack.contains(kw.toLowerCase()));
      });
      matched ??= subjects.firstWhereOrNull((s) {
        if (usedIds.contains(s.id)) return false;
        final haystack = '${s.code} ${s.nameBangla}'.toLowerCase();
        return spec.keywords.any((kw) => haystack.contains(kw.toLowerCase()));
      });
      matched ??= pool.firstWhereOrNull((s) => !usedIds.contains(s.id));
      matched ??= subjects.firstWhereOrNull((s) => !usedIds.contains(s.id));
      matched ??= pool[i % pool.length];

      usedIds.add(matched.id);
      built.add(
        RehearsalPaperDraft(
          localId: _nextPaperLocalId++,
          subjectId: matched.id,
          labelBangla: 'পত্র ${i + 1}: ${matched.nameBangla}',
          questionCount: spec.questionCount.clamp(
            StartRehearsalUseCase.minQuestionCount,
            StartRehearsalUseCase.maxQuestionCount,
          ),
          durationMinutes: spec.durationMinutes.clamp(
            StartRehearsalUseCase.minDurationMinutes,
            StartRehearsalUseCase.maxDurationMinutes,
          ),
        ),
      );
    }

    titleController.text =
        language.value == AppLanguage.en ? preset.titleEnglish : preset.titleBangla;
    negativeRatio.value = preset.negativeRatio;
    papers.assignAll(built);
    errorMessage.value = null;
  }

  void selectNegativeRatio(double ratio) {
    negativeRatio.value = ratio;
  }

  void addPaper() {
    if (papers.length >= StartRehearsalUseCase.maxPapers || subjects.isEmpty) {
      return;
    }
    final nextIdx = papers.length;
    final sub = subjects[nextIdx % subjects.length];
    papers.add(
      RehearsalPaperDraft(
        localId: _nextPaperLocalId++,
        subjectId: sub.id,
        labelBangla: 'পত্র ${nextIdx + 1}: ${sub.nameBangla}',
        questionCount: 5,
        durationMinutes: 10,
      ),
    );
  }

  void removePaper(int index) {
    if (papers.length <= StartRehearsalUseCase.minPapers) return;
    if (index < 0 || index >= papers.length) return;
    papers.removeAt(index);
    _relabelPapers();
  }

  void updatePaperSubject(int index, String subjectId) {
    if (index < 0 || index >= papers.length) return;
    final found = subjects.firstWhereOrNull((s) => s.id == subjectId);
    final name = found?.nameBangla ?? '';
    papers[index] = papers[index].copyWith(
      subjectId: subjectId,
      labelBangla: name.isNotEmpty ? 'পত্র ${index + 1}: $name' : null,
    );
  }

  void updatePaperQuestionCount(int index, Object raw) {
    if (index < 0 || index >= papers.length) return;
    final parsed = _parsePositiveBanglaOrAsciiInt(raw);
    if (parsed == null ||
        parsed < StartRehearsalUseCase.minQuestionCount ||
        parsed > StartRehearsalUseCase.maxQuestionCount) {
      papers[index] = papers[index].copyWith(hasValidQuestionCount: false);
      return;
    }
    papers[index] = papers[index].copyWith(
      questionCount: parsed,
      hasValidQuestionCount: true,
    );
  }

  void updatePaperDurationMinutes(int index, Object raw) {
    if (index < 0 || index >= papers.length) return;
    final parsed = _parsePositiveBanglaOrAsciiInt(raw);
    if (parsed == null ||
        parsed < StartRehearsalUseCase.minDurationMinutes ||
        parsed > StartRehearsalUseCase.maxDurationMinutes) {
      papers[index] = papers[index].copyWith(hasValidDuration: false);
      return;
    }
    papers[index] = papers[index].copyWith(
      durationMinutes: parsed,
      hasValidDuration: true,
    );
  }

  int? _parsePositiveBanglaOrAsciiInt(Object raw) {
    if (raw is int) return raw;
    final normalized = toAsciiDigits(raw.toString()).trim();
    if (normalized.isEmpty) return null;
    return int.tryParse(normalized);
  }

  void _relabelPapers() {
    for (var i = 0; i < papers.length; i++) {
      final sub = subjects.firstWhereOrNull((s) => s.id == papers[i].subjectId);
      if (sub != null) {
        papers[i] = papers[i].copyWith(
          labelBangla: 'পত্র ${i + 1}: ${sub.nameBangla}',
        );
      }
    }
  }

  Future<void> startRehearsal() async {
    if (isStarting.value || isSubmitting.value) return;

    final lang = language.value;
    final title = titleController.text.trim();
    if (title.isEmpty) {
      errorMessage.value = AppStrings.tr(
        'রিহার্সালের শিরোনাম লিখুন।',
        'Please enter a rehearsal title.',
        lang,
      );
      return;
    }

    if (papers.length < StartRehearsalUseCase.minPapers ||
        papers.length > StartRehearsalUseCase.maxPapers) {
      errorMessage.value = AppStrings.tr(
        'কমপক্ষে ২টি এবং সর্বোচ্চ ৫টি পত্র নির্বাচন করুন।',
        'Select between 2 and 5 papers.',
        lang,
      );
      return;
    }

    if (papers.any((p) => !p.hasValidQuestionCount || !p.hasValidDuration)) {
      errorMessage.value = AppStrings.tr(
        'প্রতিটি পত্রের প্রশ্ন সংখ্যা (১-৫০) এবং সময়সীমা (১-১২০ মি.) সঠিকভাবে দিন।',
        'Enter valid question counts (1-50) and durations (1-120 min) for every paper.',
        lang,
      );
      return;
    }

    final generation = ++_sessionGeneration;
    isStarting.value = true;
    errorMessage.value = null;

    try {
      final firstSubject =
          subjects.firstWhereOrNull((s) => s.id == papers.first.subjectId);
      final res = await _startRehearsalUseCase(
        titleBangla: title,
        program: firstSubject?.program.apiValue,
        negativeRatio: negativeRatio.value,
        papers: papers
            .map(
              (p) => RehearsalPaperInputEntity(
                subjectId: p.subjectId,
                labelBangla: p.labelBangla,
                questionCount: p.questionCount,
                durationMinutes: p.durationMinutes,
              ),
            )
            .toList(),
      );
      if (isClosed || generation != _sessionGeneration) return;

      res.fold(
        (err) {
          errorMessage.value = _nonBlankError(
            err.message,
            AppStrings.tr(
              'রিহার্সাল শুরু করা যায়নি।',
              'Could not start rehearsal.',
              lang,
            ),
          );
        },
        (envelope) => _applyEnvelope(envelope, generation),
      );
    } finally {
      if (!isClosed && generation == _sessionGeneration) {
        isStarting.value = false;
      }
    }
  }

  Future<void> resumeOrViewRehearsal(String rehearsalId) async {
    if (isStarting.value || isSubmitting.value) return;

    final generation = ++_sessionGeneration;
    isStarting.value = true;
    errorMessage.value = null;

    try {
      final res = await _getRehearsalUseCase(rehearsalId);
      if (isClosed || generation != _sessionGeneration) return;

      res.fold(
        (err) {
          errorMessage.value = _nonBlankError(
            err.message,
            AppStrings.tr(
              'রিহার্সাল লোড করা যায়নি।',
              'Could not load rehearsal.',
              language.value,
            ),
          );
        },
        (envelope) => _applyEnvelope(envelope, generation),
      );
    } finally {
      if (!isClosed && generation == _sessionGeneration) {
        isStarting.value = false;
      }
    }
  }

  void _applyEnvelope(
    RehearsalSessionEnvelopeEntity envelope,
    int generation,
  ) {
    _cancelTimer();
    _hasSubmittedPaper = false;
    _questionTimeSpent.clear();
    answers.clear();
    currentQuestionIndex.value = 0;
    lastPaperResult.value = null;

    rehearsal.value = envelope.rehearsal;
    activeSession.value = envelope.activeSession;

    if (envelope.rehearsal.status == MultiRehearsalStatus.inProgress &&
        envelope.activeSession != null) {
      remainingSeconds.value = max(0, envelope.activeSession!.durationSeconds);
      _startTimer(generation);
    } else {
      remainingSeconds.value = 0;
    }

    if (scrollController.hasClients) {
      scrollController.jumpTo(0);
    }
  }

  void _startTimer(int generation) {
    _cancelTimer();
    if (remainingSeconds.value <= 0) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (!isClosed && generation == _sessionGeneration) {
          unawaited(submitActivePaper(isAutoSubmit: true));
        }
      });
      return;
    }
    _countdownTimer = Timer.periodic(
      const Duration(seconds: 1),
      (timer) => _onTick(timer, generation),
    );
  }

  void _onTick(Timer timer, int generation) {
    if (isClosed ||
        generation != _sessionGeneration ||
        _hasSubmittedPaper ||
        rehearsal.value?.status != MultiRehearsalStatus.inProgress) {
      timer.cancel();
      if (identical(_countdownTimer, timer)) {
        _countdownTimer = null;
      }
      return;
    }

    final q = currentQuestion;
    if (q != null) {
      _questionTimeSpent[q.id] = (_questionTimeSpent[q.id] ?? 0) + 1;
    }

    final nextRemaining = max(0, remainingSeconds.value - 1);
    remainingSeconds.value = nextRemaining;

    if (nextRemaining <= 0) {
      timer.cancel();
      if (identical(_countdownTimer, timer)) {
        _countdownTimer = null;
      }
      unawaited(submitActivePaper(isAutoSubmit: true));
    }
  }

  void _cancelTimer() {
    _countdownTimer?.cancel();
    _countdownTimer = null;
  }

  void selectOption(String questionId, String optionId) {
    if (_hasSubmittedPaper || isSubmitting.value) return;
    answers[questionId] = optionId;
  }

  void clearSelection(String questionId) {
    if (_hasSubmittedPaper || isSubmitting.value) return;
    answers.remove(questionId);
  }

  void goToQuestion(int index) {
    final qs = activeQuestions;
    if (qs.isEmpty) return;
    final clamped = index.clamp(0, qs.length - 1);
    if (clamped == currentQuestionIndex.value) return;
    currentQuestionIndex.value = clamped;
    if (scrollController.hasClients) {
      scrollController.jumpTo(0);
    }
  }

  void nextQuestion() => goToQuestion(safeQuestionIndex + 1);

  void previousQuestion() => goToQuestion(safeQuestionIndex - 1);

  Future<void> submitActivePaper({bool isAutoSubmit = false}) async {
    if (_hasSubmittedPaper || isSubmitting.value) return;
    final currentRehearsal = rehearsal.value;
    final session = activeSession.value;
    if (currentRehearsal == null || session == null) return;

    final generation = _sessionGeneration;
    _hasSubmittedPaper = true;
    isSubmitting.value = true;
    errorMessage.value = null;
    _cancelTimer();

    final payload = session.questions
        .map(
          (q) => ExamAnswerInputEntity(
            questionId: q.id,
            selectedOptionId: answers[q.id],
            timeSpent: _questionTimeSpent[q.id] ?? 0,
          ),
        )
        .toList();

    try {
      final res = await _submitRehearsalPaperUseCase(
        rehearsalId: currentRehearsal.id,
        paperIndex: currentRehearsal.currentPaperIndex,
        answers: payload,
      );
      if (isClosed || generation != _sessionGeneration) return;

      res.fold(
        (err) {
          _hasSubmittedPaper = false;
          errorMessage.value = _nonBlankError(
            err.message,
            AppStrings.tr(
              'পত্র জমা দেওয়া যায়নি। আবার চেষ্টা করো।',
              'Could not submit paper. Please try again.',
              language.value,
            ),
          );
          if (remainingSeconds.value > 0 && _countdownTimer == null) {
            _startTimer(generation);
          }
        },
        (submitResult) {
          rehearsal.value = submitResult.rehearsal;
          lastPaperResult.value = submitResult.paperResult;
          activeSession.value = null;
          answers.clear();
          _questionTimeSpent.clear();
          currentQuestionIndex.value = 0;
          remainingSeconds.value = 0;
          if (scrollController.hasClients) {
            scrollController.jumpTo(0);
          }
          if (submitResult.rehearsal.status == MultiRehearsalStatus.completed) {
            unawaited(_refreshHistoryQuietly());
          }
        },
      );
    } catch (e) {
      if (!isClosed && generation == _sessionGeneration) {
        _hasSubmittedPaper = false;
        errorMessage.value = AppStrings.tr(
          'পত্র জমা দেওয়া যায়নি। আবার চেষ্টা করো।',
          'Could not submit paper. Please try again.',
          language.value,
        );
      }
    } finally {
      if (!isClosed && generation == _sessionGeneration) {
        isSubmitting.value = false;
      }
    }
  }

  Future<void> startNextPaper() async {
    if (isStarting.value || isSubmitting.value) return;
    final currentRehearsal = rehearsal.value;
    if (currentRehearsal == null) return;

    final generation = ++_sessionGeneration;
    isStarting.value = true;
    errorMessage.value = null;

    try {
      final res = await _startRehearsalPaperUseCase(
        rehearsalId: currentRehearsal.id,
        paperIndex: currentRehearsal.currentPaperIndex,
      );
      if (isClosed || generation != _sessionGeneration) return;

      res.fold(
        (err) {
          errorMessage.value = _nonBlankError(
            err.message,
            AppStrings.tr(
              'পরবর্তী পত্র শুরু করা যায়নি।',
              'Could not start next paper.',
              language.value,
            ),
          );
        },
        (envelope) => _applyEnvelope(envelope, generation),
      );
    } finally {
      if (!isClosed && generation == _sessionGeneration) {
        isStarting.value = false;
      }
    }
  }

  Future<void> _refreshHistoryQuietly() async {
    final res = await _getRehearsalHistoryUseCase();
    if (isClosed) return;
    res.fold((_) {}, (items) => history.assignAll(items));
  }

  void resetToSetup() {
    _sessionGeneration++;
    _cancelTimer();
    _hasSubmittedPaper = false;
    isStarting.value = false;
    isSubmitting.value = false;
    _questionTimeSpent.clear();
    rehearsal.value = null;
    activeSession.value = null;
    lastPaperResult.value = null;
    answers.clear();
    currentQuestionIndex.value = 0;
    remainingSeconds.value = 0;
    errorMessage.value = null;
    unawaited(_refreshHistoryQuietly());
  }

  @override
  void onClose() {
    _sessionGeneration++;
    _loadGeneration++;
    _cancelTimer();
    titleController.dispose();
    scrollController.dispose();
    super.onClose();
  }
}
