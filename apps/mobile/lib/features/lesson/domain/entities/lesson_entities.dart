import 'package:equatable/equatable.dart';

class ImportantTermEntity extends Equatable {
  final String termBangla;
  final String termEnglish;
  final String definition;

  const ImportantTermEntity({
    required this.termBangla,
    this.termEnglish = '',
    this.definition = '',
  });

  @override
  List<Object?> get props => <Object?>[termBangla, termEnglish, definition];
}

class WorkedExampleEntity extends Equatable {
  final String problem;
  final String stepByStepSolution;

  const WorkedExampleEntity({
    required this.problem,
    required this.stepByStepSolution,
  });

  @override
  List<Object?> get props => <Object?>[problem, stepByStepSolution];
}

class LessonDetailEntity extends Equatable {
  final String id;
  final String topicId;
  final String topicTitle;
  final String chapterId;
  final String chapterTitle;
  final String subjectId;
  final String subjectTitle;
  final String titleBangla;
  final String learningGoal;
  final String explanation;
  final List<ImportantTermEntity> importantTerms;
  final WorkedExampleEntity? workedExample;
  final String? memoryAid;
  final String? interactiveWidgetUrl;
  final String? audioUrl;
  final int? audioDurationSeconds;
  final int version;
  final bool isFromCache;
  final bool isCompleted;

  const LessonDetailEntity({
    required this.id,
    required this.topicId,
    this.topicTitle = '',
    this.chapterId = '',
    this.chapterTitle = '',
    this.subjectId = '',
    this.subjectTitle = '',
    required this.titleBangla,
    this.learningGoal = '',
    this.explanation = '',
    this.importantTerms = const <ImportantTermEntity>[],
    this.workedExample,
    this.memoryAid,
    this.interactiveWidgetUrl,
    this.audioUrl,
    this.audioDurationSeconds,
    this.version = 1,
    this.isFromCache = false,
    this.isCompleted = false,
  });

  LessonDetailEntity copyWith({
    String? chapterId,
    String? chapterTitle,
    String? subjectId,
    String? subjectTitle,
    bool? isFromCache,
    bool? isCompleted,
  }) {
    return LessonDetailEntity(
      id: id,
      topicId: topicId,
      topicTitle: topicTitle,
      chapterId: chapterId ?? this.chapterId,
      chapterTitle: chapterTitle ?? this.chapterTitle,
      subjectId: subjectId ?? this.subjectId,
      subjectTitle: subjectTitle ?? this.subjectTitle,
      titleBangla: titleBangla,
      learningGoal: learningGoal,
      explanation: explanation,
      importantTerms: importantTerms,
      workedExample: workedExample,
      memoryAid: memoryAid,
      interactiveWidgetUrl: interactiveWidgetUrl,
      audioUrl: audioUrl,
      audioDurationSeconds: audioDurationSeconds,
      version: version,
      isFromCache: isFromCache ?? this.isFromCache,
      isCompleted: isCompleted ?? this.isCompleted,
    );
  }

  @override
  List<Object?> get props => <Object?>[
        id,
        topicId,
        topicTitle,
        chapterId,
        chapterTitle,
        subjectId,
        subjectTitle,
        titleBangla,
        learningGoal,
        explanation,
        importantTerms,
        workedExample,
        memoryAid,
        interactiveWidgetUrl,
        audioUrl,
        audioDurationSeconds,
        version,
        isFromCache,
        isCompleted,
      ];
}

class QuickCheckOptionEntity extends Equatable {
  final String id;
  final String text;
  final bool? isCorrect;

  const QuickCheckOptionEntity({
    required this.id,
    required this.text,
    this.isCorrect,
  });

  @override
  List<Object?> get props => <Object?>[id, text, isCorrect];
}

class QuickCheckQuestionEntity extends Equatable {
  final String id;
  final String topicId;
  final String type;
  final String stem;
  final List<QuickCheckOptionEntity> options;
  final Map<String, dynamic>? explanation;
  final String difficulty;
  final String? boardSource;

  const QuickCheckQuestionEntity({
    required this.id,
    required this.topicId,
    this.type = 'MCQ',
    required this.stem,
    this.options = const <QuickCheckOptionEntity>[],
    this.explanation,
    this.difficulty = 'MEDIUM',
    this.boardSource,
  });

  @override
  List<Object?> get props => <Object?>[
        id,
        topicId,
        type,
        stem,
        options,
        explanation,
        difficulty,
        boardSource,
      ];
}

class QuickCheckSubmitResultEntity extends Equatable {
  final bool isCorrect;
  final String? correctOptionId;
  final Map<String, dynamic>? explanation;
  final bool isQueuedOffline;

  const QuickCheckSubmitResultEntity({
    required this.isCorrect,
    this.correctOptionId,
    this.explanation,
    this.isQueuedOffline = false,
  });

  @override
  List<Object?> get props => <Object?>[
        isCorrect,
        correctOptionId,
        explanation,
        isQueuedOffline,
      ];
}

class LessonCompleteResultEntity extends Equatable {
  final String topicId;
  final bool isQueuedOffline;

  const LessonCompleteResultEntity({
    required this.topicId,
    this.isQueuedOffline = false,
  });

  @override
  List<Object?> get props => <Object?>[topicId, isQueuedOffline];
}

class LessonSiblingTopicEntity extends Equatable {
  final String id;
  final String chapterId;
  final int orderIndex;
  final String titleBangla;
  final bool hasInteractiveLab;

  const LessonSiblingTopicEntity({
    required this.id,
    required this.chapterId,
    this.orderIndex = 0,
    required this.titleBangla,
    this.hasInteractiveLab = false,
  });

  @override
  List<Object?> get props => <Object?>[
        id,
        chapterId,
        orderIndex,
        titleBangla,
        hasInteractiveLab,
      ];
}

/// Optional route arguments passed when opening `/lesson/:topicId` from
/// curriculum, dashboard, or search entry points.
class LessonRouteArgs extends Equatable {
  final String? subjectId;
  final String? chapterId;
  final String? chapterTitle;
  final String? topicTitle;
  final List<LessonSiblingTopicEntity> siblingTopics;

  const LessonRouteArgs({
    this.subjectId,
    this.chapterId,
    this.chapterTitle,
    this.topicTitle,
    this.siblingTopics = const <LessonSiblingTopicEntity>[],
  });

  @override
  List<Object?> get props => <Object?>[
        subjectId,
        chapterId,
        chapterTitle,
        topicTitle,
        siblingTopics,
      ];
}
