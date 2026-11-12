import 'package:network/network.dart';
import 'package:porhi/features/dashboard/domain/entities/student_overview_entity.dart';

Map<String, dynamic> _asMap(Object? raw) {
  if (raw is Map<String, dynamic>) return raw;
  if (raw is Map) return Map<String, dynamic>.from(raw);
  return <String, dynamic>{};
}

List<dynamic> _asList(Object? raw) {
  if (raw is List) return raw;
  return const <dynamic>[];
}

int _asInt(Object? raw, {int fallback = 0}) {
  if (raw is int) return raw;
  if (raw is num) return raw.toInt();
  if (raw is String) return int.tryParse(raw.trim()) ?? fallback;
  return fallback;
}

double _asDouble(Object? raw, {double fallback = 0}) {
  if (raw is double) return raw;
  if (raw is num) return raw.toDouble();
  if (raw is String) return double.tryParse(raw.trim()) ?? fallback;
  return fallback;
}

/// DTO matching `apps/api`'s `StudentOverviewResponse` from `GET /student/overview`.
class StudentOverviewModel extends BaseResponseModel<StudentOverviewModel> {
  final String subjectId;
  final Map<String, dynamic> curriculumTotals;
  final List<String> completedTopicIds;
  final Map<String, dynamic>? lastStudiedTopic;
  final Map<String, dynamic> practiceStats;
  final int streakDays;
  final List<String> studyDates;
  final List<Map<String, dynamic>> dueMistakes;
  final List<Map<String, dynamic>> weakTopics;
  final List<Map<String, dynamic>> recentExams;
  final List<Map<String, dynamic>> bookmarks;
  final Map<String, String> lessonNotes;

  StudentOverviewModel({
    required this.subjectId,
    this.curriculumTotals = const <String, dynamic>{},
    this.completedTopicIds = const <String>[],
    this.lastStudiedTopic,
    this.practiceStats = const <String, dynamic>{},
    this.streakDays = 0,
    this.studyDates = const <String>[],
    this.dueMistakes = const <Map<String, dynamic>>[],
    this.weakTopics = const <Map<String, dynamic>>[],
    this.recentExams = const <Map<String, dynamic>>[],
    this.bookmarks = const <Map<String, dynamic>>[],
    this.lessonNotes = const <String, String>{},
    super.message,
  }) {
    data = this;
  }

  factory StudentOverviewModel.fromJson(Map<String, dynamic> json) {
    final completedRaw = _asList(json['completedTopicIds']);
    final studyDatesRaw = _asList(json['studyDates']);
    final notesRaw = _asMap(json['lessonNotes']);

    return StudentOverviewModel(
      subjectId: (json['subjectId'] ?? 'sub_ssc_physics').toString(),
      curriculumTotals: _asMap(json['curriculumTotals']),
      completedTopicIds: completedRaw.map((e) => e.toString()).toList(),
      lastStudiedTopic: json['lastStudiedTopic'] is Map
          ? _asMap(json['lastStudiedTopic'])
          : null,
      practiceStats: _asMap(json['practiceStats']),
      streakDays: _asInt(json['streakDays']),
      studyDates: studyDatesRaw.map((e) => e.toString()).toList(),
      dueMistakes: _asList(json['dueMistakes']).map(_asMap).toList(),
      weakTopics: _asList(json['weakTopics']).map(_asMap).toList(),
      recentExams: _asList(json['recentExams']).map(_asMap).toList(),
      bookmarks: _asList(json['bookmarks']).map(_asMap).toList(),
      lessonNotes: notesRaw.map(
        (key, value) => MapEntry<String, String>(key, (value ?? '').toString()),
      ),
      message: json['message'] as String?,
    );
  }

  @override
  Map<String, dynamic> toJson() => <String, dynamic>{
        'subjectId': subjectId,
        'curriculumTotals': curriculumTotals,
        'completedTopicIds': completedTopicIds,
        'lastStudiedTopic': lastStudiedTopic,
        'practiceStats': practiceStats,
        'streakDays': streakDays,
        'studyDates': studyDates,
        'dueMistakes': dueMistakes,
        'weakTopics': weakTopics,
        'recentExams': recentExams,
        'bookmarks': bookmarks,
        'lessonNotes': lessonNotes,
      };

  StudentOverviewEntity toEntity({bool isFromCache = false}) {
    final masteryRaw = _asMap(practiceStats['topicMastery']);
    final masteryMap = <String, TopicMasteryEntity>{};
    for (final entry in masteryRaw.entries) {
      final item = _asMap(entry.value);
      masteryMap[entry.key] = TopicMasteryEntity(
        attempts: _asInt(item['attempts']),
        correct: _asInt(item['correct']),
        accuracy: _asInt(item['accuracy']),
      );
    }

    final lastTopic = lastStudiedTopic;
    return StudentOverviewEntity(
      subjectId: subjectId,
      curriculumTotals: CurriculumTotalsEntity(
        totalChapters: _asInt(curriculumTotals['totalChapters']),
        totalTopics: _asInt(curriculumTotals['totalTopics']),
        totalPublishedLessons: _asInt(curriculumTotals['totalPublishedLessons']),
        totalPublishedQuestions:
            _asInt(curriculumTotals['totalPublishedQuestions']),
      ),
      completedTopicIds: completedTopicIds,
      lastStudiedTopic: lastTopic == null
          ? null
          : LastStudiedTopicEntity(
              topicId: (lastTopic['topicId'] ?? '').toString(),
              topicTitle: (lastTopic['topicTitle'] ?? '').toString(),
              chapterId: (lastTopic['chapterId'] ?? '').toString(),
              chapterTitle: (lastTopic['chapterTitle'] ?? '').toString(),
              timestamp: (lastTopic['timestamp'] ?? '').toString(),
            ),
      practiceStats: PracticeStatsEntity(
        totalAttempts: _asInt(practiceStats['totalAttempts']),
        correctAttempts: _asInt(practiceStats['correctAttempts']),
        accuracyPercent: _asInt(practiceStats['accuracyPercent']),
        topicMastery: masteryMap,
      ),
      streakDays: streakDays,
      studyDates: studyDates,
      dueMistakes: dueMistakes
          .map(
            (m) => DueMistakeEntity(
              id: (m['id'] ?? '').toString(),
              questionId: (m['questionId'] ?? '').toString(),
              attemptCount: _asInt(m['attemptCount'], fallback: 1),
              updatedAt: (m['updatedAt'] ?? '').toString(),
              topicId: (m['topicId'] ?? '').toString(),
              topicTitle: (m['topicTitle'] ?? '').toString(),
              chapterId: (m['chapterId'] ?? '').toString(),
              chapterTitle: (m['chapterTitle'] ?? '').toString(),
              stem: (m['stem'] ?? '').toString(),
              correctOptionText: (m['correctOptionText'] ?? '').toString(),
              conceptNote: (m['conceptNote'] ?? '').toString(),
            ),
          )
          .toList(),
      weakTopics: weakTopics
          .map(
            (w) => WeakTopicEntity(
              topicId: (w['topicId'] ?? '').toString(),
              topicTitle: (w['topicTitle'] ?? '').toString(),
              chapterId: (w['chapterId'] ?? '').toString(),
              chapterTitle: (w['chapterTitle'] ?? '').toString(),
              accuracy: _asInt(w['accuracy']),
              mistakeCount: _asInt(w['mistakeCount']),
            ),
          )
          .toList(),
      recentExams: recentExams
          .map(
            (e) => RecentExamEntity(
              sessionId: (e['sessionId'] ?? '').toString(),
              chapterId: e['chapterId'] as String?,
              subjectId: (e['subjectId'] ?? subjectId).toString(),
              score: _asDouble(e['score']),
              totalQuestions: _asInt(e['totalQuestions']),
              durationSeconds: _asInt(e['durationSeconds']),
              completedAt: e['completedAt'] as String?,
            ),
          )
          .toList(),
      bookmarks: bookmarks
          .map(
            (b) => StudentBookmarkEntity(
              id: (b['id'] ?? '').toString(),
              type: (b['type'] ?? 'topic').toString(),
              titleBangla: (b['titleBangla'] ?? '').toString(),
              subtitleBangla: b['subtitleBangla'] as String?,
              href: (b['href'] ?? '').toString(),
              createdAt: (b['createdAt'] ?? '').toString(),
            ),
          )
          .toList(),
      lessonNotes: lessonNotes,
      isFromCache: isFromCache,
    );
  }
}

/// DTO matching `GET /planner` response `{ tasks, todayDueCount }`.
class PlannerOverviewModel extends BaseResponseModel<PlannerOverviewModel> {
  final List<Map<String, dynamic>> tasks;
  final int todayDueCount;

  PlannerOverviewModel({
    this.tasks = const <Map<String, dynamic>>[],
    this.todayDueCount = 0,
    super.message,
  }) {
    data = this;
  }

  factory PlannerOverviewModel.fromJson(Map<String, dynamic> json) {
    return PlannerOverviewModel(
      tasks: _asList(json['tasks']).map(_asMap).toList(),
      todayDueCount: _asInt(json['todayDueCount']),
      message: json['message'] as String?,
    );
  }

  @override
  Map<String, dynamic> toJson() => <String, dynamic>{
        'tasks': tasks,
        'todayDueCount': todayDueCount,
      };

  PlannerOverviewEntity toEntity({bool isFromCache = false}) {
    return PlannerOverviewEntity(
      tasks: tasks
          .map(
            (t) => PlannerTaskSummaryEntity(
              id: (t['id'] ?? '').toString(),
              titleBangla: (t['titleBangla'] ?? '').toString(),
              scheduledDate: (t['scheduledDate'] ?? '').toString(),
              reminderTime: t['reminderTime'] as String?,
              targetType: (t['targetType'] ?? 'CUSTOM').toString(),
              subjectId: t['subjectId'] as String?,
              chapterId: t['chapterId'] as String?,
              topicId: t['topicId'] as String?,
              completed: t['completed'] as bool? ?? false,
            ),
          )
          .toList(),
      todayDueCount: todayDueCount,
      isFromCache: isFromCache,
    );
  }
}

/// DTO matching `GET /curriculum/subjects/:id/chapters` list response for Quick Search.
class QuickSearchCatalogModel
    extends BaseResponseModel<QuickSearchCatalogModel> {
  final List<Map<String, dynamic>> items;

  QuickSearchCatalogModel({
    required this.items,
    super.message,
  }) {
    data = this;
  }

  factory QuickSearchCatalogModel.fromJson(
    Map<String, dynamic> json, {
    String fallbackSubjectId = 'sub_ssc_physics',
  }) {
    // Handles both cached normalized payload (`items`) and raw backend array
    // wrapped by BaseWrapperModel (`json`).
    if (json['items'] is List) {
      return QuickSearchCatalogModel(
        items: _asList(json['items']).map(_asMap).toList(),
        message: json['message'] as String?,
      );
    }

    final rawChapters = _asList(json['json'] ?? json['chapters']);
    final flattened = <Map<String, dynamic>>[];

    for (final rawChapter in rawChapters) {
      final ch = _asMap(rawChapter);
      final chapterId = (ch['id'] ?? '').toString();
      final chapterTitle = (ch['titleBangla'] ?? '').toString();
      final subjectId = (ch['subjectId'] ?? fallbackSubjectId).toString();
      final topics = _asList(ch['topics']);

      for (final rawTopic in topics) {
        final top = _asMap(rawTopic);
        final topicId = (top['id'] ?? '').toString();
        if (topicId.isEmpty) continue;
        flattened.add(<String, dynamic>{
          'topicId': topicId,
          'topicTitle': (top['titleBangla'] ?? '').toString(),
          'chapterId': chapterId,
          'chapterTitle': chapterTitle,
          'subjectId': subjectId,
          'hasInteractiveLab': top['hasInteractiveLab'] as bool? ?? false,
          'lessonCount': _asInt(top['lessonCount']),
          'questionCount': _asInt(top['questionCount']),
        });
      }
    }

    return QuickSearchCatalogModel(
      items: flattened,
      message: json['message'] as String?,
    );
  }

  @override
  Map<String, dynamic> toJson() => <String, dynamic>{'items': items};

  List<QuickSearchTopicEntity> toEntities() {
    return items
        .map(
          (item) => QuickSearchTopicEntity(
            topicId: (item['topicId'] ?? '').toString(),
            topicTitle: (item['topicTitle'] ?? '').toString(),
            chapterId: (item['chapterId'] ?? '').toString(),
            chapterTitle: (item['chapterTitle'] ?? '').toString(),
            subjectId: (item['subjectId'] ?? 'sub_ssc_physics').toString(),
            hasInteractiveLab: item['hasInteractiveLab'] as bool? ?? false,
            lessonCount: _asInt(item['lessonCount']),
            questionCount: _asInt(item['questionCount']),
          ),
        )
        .toList();
  }
}

class GuardianShareLinkModel extends BaseResponseModel<GuardianShareLinkModel> {
  final String id;
  final String shareCode;
  final String audience;
  final String? recipientLabel;
  final bool isActive;
  final String sharePath;
  final String createdAt;
  final String? revokedAt;
  final String? lastViewedAt;

  GuardianShareLinkModel({
    required this.id,
    required this.shareCode,
    required this.audience,
    this.recipientLabel,
    required this.isActive,
    required this.sharePath,
    required this.createdAt,
    this.revokedAt,
    this.lastViewedAt,
    super.message,
  }) {
    data = this;
  }

  factory GuardianShareLinkModel.fromJson(Map<String, dynamic> json) {
    return GuardianShareLinkModel(
      id: (json['id'] ?? '').toString(),
      shareCode: (json['shareCode'] ?? '').toString(),
      audience: (json['audience'] ?? 'PARENT').toString(),
      recipientLabel: json['recipientLabel'] as String?,
      isActive: json['isActive'] as bool? ?? false,
      sharePath: (json['sharePath'] ?? '').toString(),
      createdAt: (json['createdAt'] ?? '').toString(),
      revokedAt: json['revokedAt'] as String?,
      lastViewedAt: json['lastViewedAt'] as String?,
      message: json['message'] as String?,
    );
  }

  @override
  Map<String, dynamic> toJson() => <String, dynamic>{
        'id': id,
        'shareCode': shareCode,
        'audience': audience,
        'recipientLabel': recipientLabel,
        'isActive': isActive,
        'sharePath': sharePath,
        'createdAt': createdAt,
        'revokedAt': revokedAt,
        'lastViewedAt': lastViewedAt,
      };

  GuardianShareLinkEntity toEntity() {
    return GuardianShareLinkEntity(
      id: id,
      shareCode: shareCode,
      audience: audience,
      recipientLabel: recipientLabel,
      isActive: isActive,
      sharePath: sharePath,
      createdAt: createdAt,
      revokedAt: revokedAt,
      lastViewedAt: lastViewedAt,
    );
  }
}

class GuardianShareLinkListModel
    extends BaseResponseModel<GuardianShareLinkListModel> {
  final List<GuardianShareLinkModel> links;

  GuardianShareLinkListModel({required this.links, super.message}) {
    data = this;
  }

  factory GuardianShareLinkListModel.fromJson(Map<String, dynamic> json) {
    final raw = _asList(json['json'] ?? json['links']);
    return GuardianShareLinkListModel(
      links: raw
          .map((e) => GuardianShareLinkModel.fromJson(_asMap(e)))
          .toList(),
      message: json['message'] as String?,
    );
  }

  @override
  Map<String, dynamic> toJson() => <String, dynamic>{
        'links': links.map((e) => e.toJson()).toList(),
      };
}

class ToggleBookmarkResponseModel
    extends BaseResponseModel<ToggleBookmarkResponseModel> {
  final bool bookmarked;

  ToggleBookmarkResponseModel({required this.bookmarked, super.message}) {
    data = this;
  }

  factory ToggleBookmarkResponseModel.fromJson(Map<String, dynamic> json) {
    return ToggleBookmarkResponseModel(
      bookmarked: json['bookmarked'] as bool? ?? false,
      message: json['message'] as String?,
    );
  }

  @override
  Map<String, dynamic> toJson() => <String, dynamic>{'bookmarked': bookmarked};
}

class SaveNoteResponseModel extends BaseResponseModel<SaveNoteResponseModel> {
  final bool success;
  final String topicId;
  final String content;

  SaveNoteResponseModel({
    required this.success,
    required this.topicId,
    required this.content,
    super.message,
  }) {
    data = this;
  }

  factory SaveNoteResponseModel.fromJson(Map<String, dynamic> json) {
    return SaveNoteResponseModel(
      success: json['success'] as bool? ?? true,
      topicId: (json['topicId'] ?? '').toString(),
      content: (json['content'] ?? '').toString(),
      message: json['message'] as String?,
    );
  }

  @override
  Map<String, dynamic> toJson() => <String, dynamic>{
        'success': success,
        'topicId': topicId,
        'content': content,
      };
}

class StudentAckModel extends BaseResponseModel<StudentAckModel> {
  final bool success;

  StudentAckModel({this.success = true, super.message}) {
    data = this;
  }

  factory StudentAckModel.fromJson(Map<String, dynamic> json) {
    return StudentAckModel(
      success: json['success'] as bool? ?? true,
      message: json['message'] as String?,
    );
  }

  @override
  Map<String, dynamic> toJson() => <String, dynamic>{'success': success};
}
