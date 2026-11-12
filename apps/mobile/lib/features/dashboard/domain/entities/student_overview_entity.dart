import 'package:equatable/equatable.dart';
import 'package:porhi/features/auth/domain/entities/auth_user_entity.dart';

class CurriculumTotalsEntity extends Equatable {
  final int totalChapters;
  final int totalTopics;
  final int totalPublishedLessons;
  final int totalPublishedQuestions;

  const CurriculumTotalsEntity({
    this.totalChapters = 0,
    this.totalTopics = 0,
    this.totalPublishedLessons = 0,
    this.totalPublishedQuestions = 0,
  });

  @override
  List<Object?> get props => <Object?>[
        totalChapters,
        totalTopics,
        totalPublishedLessons,
        totalPublishedQuestions,
      ];
}

class LastStudiedTopicEntity extends Equatable {
  final String topicId;
  final String topicTitle;
  final String chapterId;
  final String chapterTitle;
  final String timestamp;

  const LastStudiedTopicEntity({
    required this.topicId,
    required this.topicTitle,
    required this.chapterId,
    required this.chapterTitle,
    required this.timestamp,
  });

  @override
  List<Object?> get props => <Object?>[
        topicId,
        topicTitle,
        chapterId,
        chapterTitle,
        timestamp,
      ];
}

class TopicMasteryEntity extends Equatable {
  final int attempts;
  final int correct;
  final int accuracy;

  const TopicMasteryEntity({
    this.attempts = 0,
    this.correct = 0,
    this.accuracy = 0,
  });

  @override
  List<Object?> get props => <Object?>[attempts, correct, accuracy];
}

class PracticeStatsEntity extends Equatable {
  final int totalAttempts;
  final int correctAttempts;
  final int accuracyPercent;
  final Map<String, TopicMasteryEntity> topicMastery;

  const PracticeStatsEntity({
    this.totalAttempts = 0,
    this.correctAttempts = 0,
    this.accuracyPercent = 0,
    this.topicMastery = const <String, TopicMasteryEntity>{},
  });

  @override
  List<Object?> get props => <Object?>[
        totalAttempts,
        correctAttempts,
        accuracyPercent,
        topicMastery,
      ];
}

class DueMistakeEntity extends Equatable {
  final String id;
  final String questionId;
  final int attemptCount;
  final String updatedAt;
  final String topicId;
  final String topicTitle;
  final String chapterId;
  final String chapterTitle;
  final String stem;
  final String correctOptionText;
  final String conceptNote;

  const DueMistakeEntity({
    required this.id,
    required this.questionId,
    this.attemptCount = 1,
    required this.updatedAt,
    required this.topicId,
    required this.topicTitle,
    required this.chapterId,
    required this.chapterTitle,
    required this.stem,
    this.correctOptionText = '',
    this.conceptNote = '',
  });

  @override
  List<Object?> get props => <Object?>[
        id,
        questionId,
        attemptCount,
        updatedAt,
        topicId,
        topicTitle,
        chapterId,
        chapterTitle,
        stem,
        correctOptionText,
        conceptNote,
      ];
}

class WeakTopicEntity extends Equatable {
  final String topicId;
  final String topicTitle;
  final String chapterId;
  final String chapterTitle;
  final int accuracy;
  final int mistakeCount;

  const WeakTopicEntity({
    required this.topicId,
    required this.topicTitle,
    required this.chapterId,
    required this.chapterTitle,
    this.accuracy = 0,
    this.mistakeCount = 0,
  });

  @override
  List<Object?> get props => <Object?>[
        topicId,
        topicTitle,
        chapterId,
        chapterTitle,
        accuracy,
        mistakeCount,
      ];
}

class RecentExamEntity extends Equatable {
  final String sessionId;
  final String? chapterId;
  final String subjectId;
  final double score;
  final int totalQuestions;
  final int durationSeconds;
  final String? completedAt;

  const RecentExamEntity({
    required this.sessionId,
    this.chapterId,
    required this.subjectId,
    this.score = 0,
    this.totalQuestions = 0,
    this.durationSeconds = 0,
    this.completedAt,
  });

  @override
  List<Object?> get props => <Object?>[
        sessionId,
        chapterId,
        subjectId,
        score,
        totalQuestions,
        durationSeconds,
        completedAt,
      ];
}

class StudentBookmarkEntity extends Equatable {
  final String id;
  final String type;
  final String titleBangla;
  final String? subtitleBangla;
  final String href;
  final String createdAt;

  const StudentBookmarkEntity({
    required this.id,
    required this.type,
    required this.titleBangla,
    this.subtitleBangla,
    required this.href,
    required this.createdAt,
  });

  @override
  List<Object?> get props => <Object?>[
        id,
        type,
        titleBangla,
        subtitleBangla,
        href,
        createdAt,
      ];
}

class StudentOverviewEntity extends Equatable {
  final String subjectId;
  final CurriculumTotalsEntity curriculumTotals;
  final List<String> completedTopicIds;
  final LastStudiedTopicEntity? lastStudiedTopic;
  final PracticeStatsEntity practiceStats;
  final int streakDays;
  final List<String> studyDates;
  final List<DueMistakeEntity> dueMistakes;
  final List<WeakTopicEntity> weakTopics;
  final List<RecentExamEntity> recentExams;
  final List<StudentBookmarkEntity> bookmarks;
  final Map<String, String> lessonNotes;
  final bool isFromCache;

  const StudentOverviewEntity({
    required this.subjectId,
    this.curriculumTotals = const CurriculumTotalsEntity(),
    this.completedTopicIds = const <String>[],
    this.lastStudiedTopic,
    this.practiceStats = const PracticeStatsEntity(),
    this.streakDays = 0,
    this.studyDates = const <String>[],
    this.dueMistakes = const <DueMistakeEntity>[],
    this.weakTopics = const <WeakTopicEntity>[],
    this.recentExams = const <RecentExamEntity>[],
    this.bookmarks = const <StudentBookmarkEntity>[],
    this.lessonNotes = const <String, String>{},
    this.isFromCache = false,
  });

  int get syllabusProgressPercent {
    if (curriculumTotals.totalTopics <= 0) return 0;
    final pct = ((completedTopicIds.length / curriculumTotals.totalTopics) * 100)
        .round();
    return pct.clamp(0, 100);
  }

  StudentOverviewEntity copyWith({
    bool? isFromCache,
  }) {
    return StudentOverviewEntity(
      subjectId: subjectId,
      curriculumTotals: curriculumTotals,
      completedTopicIds: completedTopicIds,
      lastStudiedTopic: lastStudiedTopic,
      practiceStats: practiceStats,
      streakDays: streakDays,
      studyDates: studyDates,
      dueMistakes: dueMistakes,
      weakTopics: weakTopics,
      recentExams: recentExams,
      bookmarks: bookmarks,
      lessonNotes: lessonNotes,
      isFromCache: isFromCache ?? this.isFromCache,
    );
  }

  static String defaultSubjectIdForTrack(StudentTrack? track) {
    switch (track) {
      case StudentTrack.class6to8:
        return 'sub_class8_science';
      case StudentTrack.hsc:
        return 'sub_hsc_physics_1';
      case StudentTrack.admission:
        return 'sub_admission_physics';
      case StudentTrack.bcs:
        return 'sub_bcs_preliminary';
      case StudentTrack.ssc:
      case null:
        return 'sub_ssc_physics';
    }
  }

  @override
  List<Object?> get props => <Object?>[
        subjectId,
        curriculumTotals,
        completedTopicIds,
        lastStudiedTopic,
        practiceStats,
        streakDays,
        studyDates,
        dueMistakes,
        weakTopics,
        recentExams,
        bookmarks,
        lessonNotes,
        isFromCache,
      ];
}

class PlannerTaskSummaryEntity extends Equatable {
  final String id;
  final String titleBangla;
  final String scheduledDate;
  final String? reminderTime;
  final String targetType;
  final String? subjectId;
  final String? chapterId;
  final String? topicId;
  final bool completed;

  const PlannerTaskSummaryEntity({
    required this.id,
    required this.titleBangla,
    required this.scheduledDate,
    this.reminderTime,
    this.targetType = 'CUSTOM',
    this.subjectId,
    this.chapterId,
    this.topicId,
    this.completed = false,
  });

  @override
  List<Object?> get props => <Object?>[
        id,
        titleBangla,
        scheduledDate,
        reminderTime,
        targetType,
        subjectId,
        chapterId,
        topicId,
        completed,
      ];
}

class PlannerOverviewEntity extends Equatable {
  final List<PlannerTaskSummaryEntity> tasks;
  final int todayDueCount;
  final bool isFromCache;

  const PlannerOverviewEntity({
    this.tasks = const <PlannerTaskSummaryEntity>[],
    this.todayDueCount = 0,
    this.isFromCache = false,
  });

  PlannerTaskSummaryEntity? get nextPendingTask {
    for (final task in tasks) {
      if (!task.completed) return task;
    }
    return null;
  }

  PlannerOverviewEntity copyWith({bool? isFromCache}) {
    return PlannerOverviewEntity(
      tasks: tasks,
      todayDueCount: todayDueCount,
      isFromCache: isFromCache ?? this.isFromCache,
    );
  }

  @override
  List<Object?> get props => <Object?>[tasks, todayDueCount, isFromCache];
}

class QuickSearchTopicEntity extends Equatable {
  final String topicId;
  final String topicTitle;
  final String chapterId;
  final String chapterTitle;
  final String subjectId;
  final bool hasInteractiveLab;
  final bool isCompleted;
  final int lessonCount;
  final int questionCount;

  const QuickSearchTopicEntity({
    required this.topicId,
    required this.topicTitle,
    required this.chapterId,
    required this.chapterTitle,
    required this.subjectId,
    this.hasInteractiveLab = false,
    this.isCompleted = false,
    this.lessonCount = 0,
    this.questionCount = 0,
  });

  QuickSearchTopicEntity copyWith({bool? isCompleted}) {
    return QuickSearchTopicEntity(
      topicId: topicId,
      topicTitle: topicTitle,
      chapterId: chapterId,
      chapterTitle: chapterTitle,
      subjectId: subjectId,
      hasInteractiveLab: hasInteractiveLab,
      isCompleted: isCompleted ?? this.isCompleted,
      lessonCount: lessonCount,
      questionCount: questionCount,
    );
  }

  @override
  List<Object?> get props => <Object?>[
        topicId,
        topicTitle,
        chapterId,
        chapterTitle,
        subjectId,
        hasInteractiveLab,
        isCompleted,
        lessonCount,
        questionCount,
      ];
}

class GuardianShareLinkEntity extends Equatable {
  final String id;
  final String shareCode;
  final String audience;
  final String? recipientLabel;
  final bool isActive;
  final String sharePath;
  final String createdAt;
  final String? revokedAt;
  final String? lastViewedAt;

  const GuardianShareLinkEntity({
    required this.id,
    required this.shareCode,
    required this.audience,
    this.recipientLabel,
    required this.isActive,
    required this.sharePath,
    required this.createdAt,
    this.revokedAt,
    this.lastViewedAt,
  });

  @override
  List<Object?> get props => <Object?>[
        id,
        shareCode,
        audience,
        recipientLabel,
        isActive,
        sharePath,
        createdAt,
        revokedAt,
        lastViewedAt,
      ];
}
