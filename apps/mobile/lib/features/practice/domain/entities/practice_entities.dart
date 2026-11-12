import 'package:equatable/equatable.dart';

class TextbookCitationEntity extends Equatable {
  final String bookTitle;
  final String chapterName;
  final int? pageNumber;

  const TextbookCitationEntity({
    this.bookTitle = '',
    this.chapterName = '',
    this.pageNumber,
  });

  bool get isEmpty =>
      bookTitle.trim().isEmpty &&
      chapterName.trim().isEmpty &&
      pageNumber == null;

  @override
  List<Object?> get props => <Object?>[bookTitle, chapterName, pageNumber];
}

class ExplanationLayersEntity extends Equatable {
  final String directAnswer;
  final String coreConcept;
  final String stepDerivation;
  final Map<String, String> distractorAnalysis;
  final TextbookCitationEntity? textbookCitation;
  final String proTipShortcut;

  const ExplanationLayersEntity({
    this.directAnswer = '',
    this.coreConcept = '',
    this.stepDerivation = '',
    this.distractorAnalysis = const <String, String>{},
    this.textbookCitation,
    this.proTipShortcut = '',
  });

  bool get hasAnyContent =>
      directAnswer.trim().isNotEmpty ||
      coreConcept.trim().isNotEmpty ||
      stepDerivation.trim().isNotEmpty ||
      distractorAnalysis.isNotEmpty ||
      (textbookCitation != null && !textbookCitation!.isEmpty) ||
      proTipShortcut.trim().isNotEmpty;

  @override
  List<Object?> get props => <Object?>[
        directAnswer,
        coreConcept,
        stepDerivation,
        distractorAnalysis,
        textbookCitation,
        proTipShortcut,
      ];
}

class PracticeOptionEntity extends Equatable {
  final String id;
  final String text;
  final bool? isCorrect;

  const PracticeOptionEntity({
    required this.id,
    required this.text,
    this.isCorrect,
  });

  PracticeOptionEntity copyWith({
    String? id,
    String? text,
    bool? isCorrect,
  }) {
    return PracticeOptionEntity(
      id: id ?? this.id,
      text: text ?? this.text,
      isCorrect: isCorrect ?? this.isCorrect,
    );
  }

  @override
  List<Object?> get props => <Object?>[id, text, isCorrect];
}

class CqRubricPartEntity extends Equatable {
  final int? mark;
  final String criteria;

  const CqRubricPartEntity({
    this.mark,
    this.criteria = '',
  });

  bool get isEmpty => criteria.trim().isEmpty;

  @override
  List<Object?> get props => <Object?>[mark, criteria];
}

class CqRubricEntity extends Equatable {
  final CqRubricPartEntity? ka;
  final CqRubricPartEntity? kha;
  final CqRubricPartEntity? ga;
  final CqRubricPartEntity? gha;

  const CqRubricEntity({
    this.ka,
    this.kha,
    this.ga,
    this.gha,
  });

  bool get isEmpty =>
      (ka == null || ka!.isEmpty) &&
      (kha == null || kha!.isEmpty) &&
      (ga == null || ga!.isEmpty) &&
      (gha == null || gha!.isEmpty);

  @override
  List<Object?> get props => <Object?>[ka, kha, ga, gha];
}

class PracticeQuestionEntity extends Equatable {
  final String id;
  final String topicId;
  final String type;
  final String stem;
  final List<PracticeOptionEntity> options;
  final ExplanationLayersEntity? explanation;
  final CqRubricEntity? cqRubric;
  final String difficulty;
  final String? boardSource;
  final bool isVerified;
  final int version;
  final bool isFromCache;

  const PracticeQuestionEntity({
    required this.id,
    this.topicId = '',
    this.type = 'MCQ',
    required this.stem,
    this.options = const <PracticeOptionEntity>[],
    this.explanation,
    this.cqRubric,
    this.difficulty = 'MEDIUM',
    this.boardSource,
    this.isVerified = false,
    this.version = 1,
    this.isFromCache = false,
  });

  bool get isCreative => type.trim().toUpperCase() == 'CQ_CREATIVE';

  PracticeQuestionEntity copyWith({
    List<PracticeOptionEntity>? options,
    ExplanationLayersEntity? explanation,
    CqRubricEntity? cqRubric,
    String? boardSource,
    bool? isFromCache,
  }) {
    return PracticeQuestionEntity(
      id: id,
      topicId: topicId,
      type: type,
      stem: stem,
      options: options ?? this.options,
      explanation: explanation ?? this.explanation,
      cqRubric: cqRubric ?? this.cqRubric,
      difficulty: difficulty,
      boardSource: boardSource ?? this.boardSource,
      isVerified: isVerified,
      version: version,
      isFromCache: isFromCache ?? this.isFromCache,
    );
  }

  @override
  List<Object?> get props => <Object?>[
        id,
        topicId,
        type,
        stem,
        options,
        explanation,
        cqRubric,
        difficulty,
        boardSource,
        isVerified,
        version,
        isFromCache,
      ];
}

class CqSelfScoresEntity extends Equatable {
  static const int maxKa = 1;
  static const int maxKha = 2;
  static const int maxGa = 3;
  static const int maxGha = 4;
  static const int maxTotalScore = 10;

  final int ka;
  final int kha;
  final int ga;
  final int gha;

  const CqSelfScoresEntity({
    this.ka = 1,
    this.kha = 2,
    this.ga = 3,
    this.gha = 4,
  });

  int get totalScore => ka + kha + ga + gha;

  bool get isValid =>
      ka >= 0 &&
      ka <= maxKa &&
      kha >= 0 &&
      kha <= maxKha &&
      ga >= 0 &&
      ga <= maxGa &&
      gha >= 0 &&
      gha <= maxGha;

  CqSelfScoresEntity copyWith({
    int? ka,
    int? kha,
    int? ga,
    int? gha,
  }) {
    return CqSelfScoresEntity(
      ka: ka ?? this.ka,
      kha: kha ?? this.kha,
      ga: ga ?? this.ga,
      gha: gha ?? this.gha,
    );
  }

  @override
  List<Object?> get props => <Object?>[ka, kha, ga, gha];
}

class PracticeSubmitResultEntity extends Equatable {
  final bool isCorrect;
  final String? correctOptionId;
  final ExplanationLayersEntity? explanation;
  final bool isQueuedOffline;

  const PracticeSubmitResultEntity({
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

class CqSelfAssessResultEntity extends Equatable {
  final bool success;
  final String questionId;
  final CqSelfScoresEntity selfScores;
  final int totalScore;
  final int maxScore;
  final bool isQueuedOffline;

  const CqSelfAssessResultEntity({
    this.success = true,
    required this.questionId,
    required this.selfScores,
    required this.totalScore,
    this.maxScore = CqSelfScoresEntity.maxTotalScore,
    this.isQueuedOffline = false,
  });

  @override
  List<Object?> get props => <Object?>[
        success,
        questionId,
        selfScores,
        totalScore,
        maxScore,
        isQueuedOffline,
      ];
}

class PracticeRouteArgs extends Equatable {
  final String? chapterTitle;
  final String? subjectId;
  final String? topicId;
  final String? difficulty;
  final String? mode;
  final String? type;

  const PracticeRouteArgs({
    this.chapterTitle,
    this.subjectId,
    this.topicId,
    this.difficulty,
    this.mode,
    this.type,
  });

  @override
  List<Object?> get props => <Object?>[
        chapterTitle,
        subjectId,
        topicId,
        difficulty,
        mode,
        type,
      ];
}
