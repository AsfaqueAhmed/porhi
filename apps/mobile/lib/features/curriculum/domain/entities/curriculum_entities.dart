import 'package:equatable/equatable.dart';
import 'package:porhi/features/auth/domain/entities/auth_user_entity.dart';

/// Filter pills for the Chapter & Topic Syllabus index.
enum TopicFilterMode {
  all,
  lab,
  incomplete,
  bookmarked,
}

/// Domain entity representing a subject in the 5-track porhi catalog.
class SubjectEntity extends Equatable {
  final String id;
  final String code;
  final String nameBangla;
  final String classLevel;
  final StudentTrack program;
  final int syllabusYear;
  final bool isReady;
  final int chapterCount;
  final int topicCount;
  final int publishedLessonCount;
  final int publishedQuestionCount;
  final bool isFromCache;

  const SubjectEntity({
    required this.id,
    required this.code,
    required this.nameBangla,
    this.classLevel = 'CLASS_9_10',
    this.program = StudentTrack.ssc,
    this.syllabusYear = 2026,
    this.isReady = true,
    this.chapterCount = 0,
    this.topicCount = 0,
    this.publishedLessonCount = 0,
    this.publishedQuestionCount = 0,
    this.isFromCache = false,
  });

  SubjectEntity copyWith({
    String? id,
    String? code,
    String? nameBangla,
    String? classLevel,
    StudentTrack? program,
    int? syllabusYear,
    bool? isReady,
    int? chapterCount,
    int? topicCount,
    int? publishedLessonCount,
    int? publishedQuestionCount,
    bool? isFromCache,
  }) {
    return SubjectEntity(
      id: id ?? this.id,
      code: code ?? this.code,
      nameBangla: nameBangla ?? this.nameBangla,
      classLevel: classLevel ?? this.classLevel,
      program: program ?? this.program,
      syllabusYear: syllabusYear ?? this.syllabusYear,
      isReady: isReady ?? this.isReady,
      chapterCount: chapterCount ?? this.chapterCount,
      topicCount: topicCount ?? this.topicCount,
      publishedLessonCount: publishedLessonCount ?? this.publishedLessonCount,
      publishedQuestionCount:
          publishedQuestionCount ?? this.publishedQuestionCount,
      isFromCache: isFromCache ?? this.isFromCache,
    );
  }

  @override
  List<Object?> get props => <Object?>[
        id,
        code,
        nameBangla,
        classLevel,
        program,
        syllabusYear,
        isReady,
        chapterCount,
        topicCount,
        publishedLessonCount,
        publishedQuestionCount,
        isFromCache,
      ];
}

/// Domain entity representing a topic inside a curriculum chapter.
class TopicEntity extends Equatable {
  final String id;
  final String chapterId;
  final int orderIndex;
  final String titleBangla;
  final int lessonCount;
  final bool hasInteractiveLab;
  final int questionCount;
  final int cqCount;

  const TopicEntity({
    required this.id,
    required this.chapterId,
    this.orderIndex = 0,
    required this.titleBangla,
    this.lessonCount = 0,
    this.hasInteractiveLab = false,
    this.questionCount = 0,
    this.cqCount = 0,
  });

  bool get isInteractiveLab =>
      hasInteractiveLab || titleBangla.toLowerCase().contains('lab');

  @override
  List<Object?> get props => <Object?>[
        id,
        chapterId,
        orderIndex,
        titleBangla,
        lessonCount,
        hasInteractiveLab,
        questionCount,
        cqCount,
      ];
}

/// Domain entity representing a curriculum chapter and its ordered topics.
class ChapterEntity extends Equatable {
  final String id;
  final String subjectId;
  final int orderIndex;
  final String titleBangla;
  final List<TopicEntity> topics;

  const ChapterEntity({
    required this.id,
    required this.subjectId,
    this.orderIndex = 0,
    required this.titleBangla,
    this.topics = const <TopicEntity>[],
  });

  ChapterEntity copyWith({
    String? id,
    String? subjectId,
    int? orderIndex,
    String? titleBangla,
    List<TopicEntity>? topics,
  }) {
    return ChapterEntity(
      id: id ?? this.id,
      subjectId: subjectId ?? this.subjectId,
      orderIndex: orderIndex ?? this.orderIndex,
      titleBangla: titleBangla ?? this.titleBangla,
      topics: topics ?? this.topics,
    );
  }

  @override
  List<Object?> get props => <Object?>[
        id,
        subjectId,
        orderIndex,
        titleBangla,
        topics,
      ];
}

/// Metadata for a chapter pack saved locally for offline study.
class DownloadedChapterEntity extends Equatable {
  final String chapterId;
  final String subjectId;
  final int orderIndex;
  final String titleBangla;
  final String? titleEnglish;
  final int version;
  final String versionHash;
  final int lessonCount;
  final int questionCount;
  final int sizeBytes;
  final DateTime downloadedAt;
  final List<TopicEntity> topics;

  const DownloadedChapterEntity({
    required this.chapterId,
    required this.subjectId,
    this.orderIndex = 0,
    required this.titleBangla,
    this.titleEnglish,
    this.version = 1,
    this.versionHash = 'v1',
    this.lessonCount = 0,
    this.questionCount = 0,
    this.sizeBytes = 0,
    required this.downloadedAt,
    this.topics = const <TopicEntity>[],
  });

  ChapterEntity toChapterEntity() {
    return ChapterEntity(
      id: chapterId,
      subjectId: subjectId,
      orderIndex: orderIndex,
      titleBangla: titleBangla,
      topics: topics,
    );
  }

  @override
  List<Object?> get props => <Object?>[
        chapterId,
        subjectId,
        orderIndex,
        titleBangla,
        titleEnglish,
        version,
        versionHash,
        lessonCount,
        questionCount,
        sizeBytes,
        downloadedAt,
        topics,
      ];
}

/// Offline lesson payload stored inside a chapter pack.
class OfflineLessonEntity extends Equatable {
  final String id;
  final String topicId;
  final String titleBangla;
  final String learningGoal;
  final String explanation;
  final List<Map<String, dynamic>> importantTerms;
  final Map<String, dynamic>? workedExample;
  final String? memoryAid;
  final String? interactiveWidgetUrl;
  final String? audioUrl;
  final int? audioDurationSeconds;
  final int version;

  const OfflineLessonEntity({
    required this.id,
    required this.topicId,
    required this.titleBangla,
    this.learningGoal = '',
    this.explanation = '',
    this.importantTerms = const <Map<String, dynamic>>[],
    this.workedExample,
    this.memoryAid,
    this.interactiveWidgetUrl,
    this.audioUrl,
    this.audioDurationSeconds,
    this.version = 1,
  });

  @override
  List<Object?> get props => <Object?>[
        id,
        topicId,
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
      ];
}

/// Offline question payload preserving `cqRubric` & `boardSource` intact.
class OfflineQuestionEntity extends Equatable {
  final String id;
  final String topicId;
  final String type;
  final String stem;
  final List<Map<String, dynamic>>? options;
  final String? modelAnswer;
  final List<dynamic>? rubric;
  final Map<String, dynamic>? cqRubric;
  final String? boardSource;
  final Map<String, dynamic>? explanation;
  final String difficulty;
  final int version;

  const OfflineQuestionEntity({
    required this.id,
    required this.topicId,
    this.type = 'MCQ',
    required this.stem,
    this.options,
    this.modelAnswer,
    this.rubric,
    this.cqRubric,
    this.boardSource,
    this.explanation,
    this.difficulty = 'MEDIUM',
    this.version = 1,
  });

  @override
  List<Object?> get props => <Object?>[
        id,
        topicId,
        type,
        stem,
        options,
        modelAnswer,
        rubric,
        cqRubric,
        boardSource,
        explanation,
        difficulty,
        version,
      ];
}

/// Full offline chapter bundle returned by `GET /curriculum/chapter/:id/offline-pack`.
class OfflineChapterPackEntity extends Equatable {
  final String chapterId;
  final String subjectId;
  final String titleBangla;
  final String versionHash;
  final DateTime downloadedAt;
  final List<TopicEntity> topics;
  final List<OfflineLessonEntity> lessons;
  final List<OfflineQuestionEntity> questions;
  final int sizeBytes;

  const OfflineChapterPackEntity({
    required this.chapterId,
    required this.subjectId,
    required this.titleBangla,
    required this.versionHash,
    required this.downloadedAt,
    this.topics = const <TopicEntity>[],
    this.lessons = const <OfflineLessonEntity>[],
    this.questions = const <OfflineQuestionEntity>[],
    this.sizeBytes = 0,
  });

  @override
  List<Object?> get props => <Object?>[
        chapterId,
        subjectId,
        titleBangla,
        versionHash,
        downloadedAt,
        topics,
        lessons,
        questions,
        sizeBytes,
      ];
}
