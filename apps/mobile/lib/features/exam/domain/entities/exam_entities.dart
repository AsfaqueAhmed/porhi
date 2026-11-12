import 'package:equatable/equatable.dart';
import 'package:porhi/features/practice/domain/entities/practice_entities.dart';

/// Exam test modes matching backend `StartExamDto.testType`.
enum ExamTestType {
  chapterTest('CHAPTER_TEST'),
  topicTest('TOPIC_TEST'),
  weakArea('WEAK_AREA'),
  subjectTest('SUBJECT_TEST');

  final String apiValue;

  const ExamTestType(this.apiValue);

  static ExamTestType fromApiValue(String? raw) {
    final normalized = raw?.trim().toUpperCase();
    for (final value in ExamTestType.values) {
      if (value.apiValue == normalized) return value;
    }
    return ExamTestType.chapterTest;
  }
}

class ExamOptionEntity extends Equatable {
  final String id;
  final String text;
  final bool? isCorrect;

  const ExamOptionEntity({
    required this.id,
    required this.text,
    this.isCorrect,
  });

  ExamOptionEntity copyWith({
    String? id,
    String? text,
    bool? isCorrect,
  }) {
    return ExamOptionEntity(
      id: id ?? this.id,
      text: text ?? this.text,
      isCorrect: isCorrect ?? this.isCorrect,
    );
  }

  @override
  List<Object?> get props => <Object?>[id, text, isCorrect];
}

class ExamQuestionEntity extends Equatable {
  final String id;
  final String topicId;
  final String stem;
  final List<ExamOptionEntity> options;
  final ExplanationLayersEntity? explanation;
  final String difficulty;
  final String? boardSource;
  final bool isFromCache;

  const ExamQuestionEntity({
    required this.id,
    this.topicId = '',
    required this.stem,
    this.options = const <ExamOptionEntity>[],
    this.explanation,
    this.difficulty = 'MEDIUM',
    this.boardSource,
    this.isFromCache = false,
  });

  ExamQuestionEntity copyWith({
    List<ExamOptionEntity>? options,
    ExplanationLayersEntity? explanation,
    String? boardSource,
    bool? isFromCache,
  }) {
    return ExamQuestionEntity(
      id: id,
      topicId: topicId,
      stem: stem,
      options: options ?? this.options,
      explanation: explanation ?? this.explanation,
      difficulty: difficulty,
      boardSource: boardSource ?? this.boardSource,
      isFromCache: isFromCache ?? this.isFromCache,
    );
  }

  @override
  List<Object?> get props => <Object?>[
        id,
        topicId,
        stem,
        options,
        explanation,
        difficulty,
        boardSource,
        isFromCache,
      ];
}

class ExamSessionStartEntity extends Equatable {
  final String sessionId;
  final ExamTestType testType;
  final String subjectId;
  final String? chapterId;
  final int totalQuestions;
  final int durationSeconds;
  final double negativeRatio;
  final List<ExamQuestionEntity> questions;
  final bool isOfflineSession;
  final DateTime? startedAt;

  const ExamSessionStartEntity({
    required this.sessionId,
    required this.testType,
    required this.subjectId,
    this.chapterId,
    required this.totalQuestions,
    required this.durationSeconds,
    required this.negativeRatio,
    required this.questions,
    this.isOfflineSession = false,
    this.startedAt,
  });

  @override
  List<Object?> get props => <Object?>[
        sessionId,
        testType,
        subjectId,
        chapterId,
        totalQuestions,
        durationSeconds,
        negativeRatio,
        questions,
        isOfflineSession,
        startedAt,
      ];
}

class ExamAnswerInputEntity extends Equatable {
  final String questionId;
  final String? selectedOptionId;
  final int timeSpent;

  const ExamAnswerInputEntity({
    required this.questionId,
    this.selectedOptionId,
    this.timeSpent = 0,
  });

  @override
  List<Object?> get props => <Object?>[questionId, selectedOptionId, timeSpent];
}

class ExamDraftEntity extends Equatable {
  final String sessionId;
  final String subjectId;
  final String? chapterId;
  final ExamTestType testType;
  final List<String> questionIds;
  final Map<String, String?> answers;
  final List<String> flaggedQuestionIds;
  final int remainingSeconds;
  final int totalDurationSeconds;
  final int currentIndex;
  final DateTime? startedAt;
  final DateTime? updatedAt;

  const ExamDraftEntity({
    required this.sessionId,
    required this.subjectId,
    this.chapterId,
    required this.testType,
    required this.questionIds,
    required this.answers,
    required this.flaggedQuestionIds,
    required this.remainingSeconds,
    required this.totalDurationSeconds,
    this.currentIndex = 0,
    this.startedAt,
    this.updatedAt,
  });

  @override
  List<Object?> get props => <Object?>[
        sessionId,
        subjectId,
        chapterId,
        testType,
        questionIds,
        answers,
        flaggedQuestionIds,
        remainingSeconds,
        totalDurationSeconds,
        currentIndex,
        startedAt,
        updatedAt,
      ];
}

class ExamReviewedAnswerEntity extends Equatable {
  final String questionId;
  final String? topicId;
  final String stem;
  final List<ExamOptionEntity> options;
  final String? selectedOptionId;
  final String? correctOptionId;
  final bool isCorrect;
  final ExplanationLayersEntity? explanation;
  final int timeSpent;

  const ExamReviewedAnswerEntity({
    required this.questionId,
    this.topicId,
    required this.stem,
    this.options = const <ExamOptionEntity>[],
    this.selectedOptionId,
    this.correctOptionId,
    required this.isCorrect,
    this.explanation,
    this.timeSpent = 0,
  });

  @override
  List<Object?> get props => <Object?>[
        questionId,
        topicId,
        stem,
        options,
        selectedOptionId,
        correctOptionId,
        isCorrect,
        explanation,
        timeSpent,
      ];
}

class ExamResultEntity extends Equatable {
  final String sessionId;
  final String status;
  final ExamTestType testType;
  final String subjectId;
  final String? chapterId;
  final double score;
  final int totalQuestions;
  final int correctCount;
  final int wrongCount;
  final int skippedCount;
  final int durationSeconds;
  final double negativeRatio;
  final double negativeDeduction;
  final int? percentile;
  final DateTime? startedAt;
  final DateTime? completedAt;
  final List<ExamReviewedAnswerEntity> answersWithExplanation;
  final bool isQueuedOffline;
  final bool isPendingServerGrading;

  const ExamResultEntity({
    required this.sessionId,
    this.status = 'COMPLETED',
    required this.testType,
    required this.subjectId,
    this.chapterId,
    required this.score,
    required this.totalQuestions,
    required this.correctCount,
    required this.wrongCount,
    required this.skippedCount,
    required this.durationSeconds,
    required this.negativeRatio,
    required this.negativeDeduction,
    this.percentile,
    this.startedAt,
    this.completedAt,
    this.answersWithExplanation = const <ExamReviewedAnswerEntity>[],
    this.isQueuedOffline = false,
    this.isPendingServerGrading = false,
  });

  int get accuracyPercent {
    if (totalQuestions <= 0) return 0;
    return ((correctCount / totalQuestions) * 100).round().clamp(0, 100);
  }

  @override
  List<Object?> get props => <Object?>[
        sessionId,
        status,
        testType,
        subjectId,
        chapterId,
        score,
        totalQuestions,
        correctCount,
        wrongCount,
        skippedCount,
        durationSeconds,
        negativeRatio,
        negativeDeduction,
        percentile,
        startedAt,
        completedAt,
        answersWithExplanation,
        isQueuedOffline,
        isPendingServerGrading,
      ];
}

class ExamResumeDataEntity extends Equatable {
  final ExamSessionStartEntity? session;
  final ExamResultEntity? completedResult;
  final Map<String, String?> answers;
  final List<String> flaggedQuestionIds;
  final int remainingSeconds;
  final int currentIndex;

  const ExamResumeDataEntity({
    this.session,
    this.completedResult,
    this.answers = const <String, String?>{},
    this.flaggedQuestionIds = const <String>[],
    this.remainingSeconds = 0,
    this.currentIndex = 0,
  });

  bool get isCompleted => completedResult != null;

  @override
  List<Object?> get props => <Object?>[
        session,
        completedResult,
        answers,
        flaggedQuestionIds,
        remainingSeconds,
        currentIndex,
      ];
}

class ExamSetupRouteArgs extends Equatable {
  final String? subjectId;
  final String? chapterId;
  final String? chapterTitle;
  final String? topicId;
  final ExamTestType? testType;

  const ExamSetupRouteArgs({
    this.subjectId,
    this.chapterId,
    this.chapterTitle,
    this.topicId,
    this.testType,
  });

  @override
  List<Object?> get props => <Object?>[
        subjectId,
        chapterId,
        chapterTitle,
        topicId,
        testType,
      ];
}

class ExamRunnerArgs extends Equatable {
  final ExamSessionStartEntity session;
  final String? title;
  final Map<String, String?> initialAnswers;
  final List<String> initialFlaggedIds;
  final int? initialRemainingSeconds;
  final int initialIndex;
  final bool isResumed;

  const ExamRunnerArgs({
    required this.session,
    this.title,
    this.initialAnswers = const <String, String?>{},
    this.initialFlaggedIds = const <String>[],
    this.initialRemainingSeconds,
    this.initialIndex = 0,
    this.isResumed = false,
  });

  @override
  List<Object?> get props => <Object?>[
        session,
        title,
        initialAnswers,
        initialFlaggedIds,
        initialRemainingSeconds,
        initialIndex,
        isResumed,
      ];
}

class ExamResultArgs extends Equatable {
  final ExamResultEntity? preloadedResult;
  final String? title;

  const ExamResultArgs({
    this.preloadedResult,
    this.title,
  });

  @override
  List<Object?> get props => <Object?>[preloadedResult, title];
}
