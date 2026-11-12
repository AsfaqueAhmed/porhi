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

String _asString(Object? raw, {String fallback = ''}) {
  if (raw == null) return fallback;
  if (raw is String) return raw;
  return raw.toString();
}

String? _asNullableString(Object? raw) {
  if (raw == null) return null;
  if (raw is String) return raw;
  return raw.toString();
}

bool _asBool(Object? raw, {bool fallback = false}) {
  if (raw is bool) return raw;
  if (raw is num) return raw != 0;
  if (raw is String) {
    final normalized = raw.trim().toLowerCase();
    if (normalized == 'true' || normalized == '1') return true;
    if (normalized == 'false' || normalized == '0') return false;
  }
  return fallback;
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
      subjectId: _asString(json['subjectId'], fallback: 'sub_ssc_physics'),
      curriculumTotals: _asMap(json['curriculumTotals']),
      completedTopicIds: completedRaw
          .map((e) => _asString(e))
          .where((e) => e.isNotEmpty)
          .toList(),
      lastStudiedTopic: json['lastStudiedTopic'] is Map
          ? _asMap(json['lastStudiedTopic'])
          : null,
      practiceStats: _asMap(json['practiceStats']),
      streakDays: _asInt(json['streakDays']),
      studyDates: studyDatesRaw
          .map((e) => _asString(e))
          .where((e) => e.isNotEmpty)
          .toList(),
      dueMistakes: _asList(json['dueMistakes']).map(_asMap).toList(),
      weakTopics: _asList(json['weakTopics']).map(_asMap).toList(),
      recentExams: _asList(json['recentExams']).map(_asMap).toList(),
      bookmarks: _asList(json['bookmarks']).map(_asMap).toList(),
      lessonNotes: notesRaw.map(
        (key, value) => MapEntry<String, String>(key, _asString(value)),
      ),
      message: _asNullableString(json['message']),
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
              topicId: _asString(lastTopic['topicId']),
              topicTitle: _asString(lastTopic['topicTitle']),
              chapterId: _asString(lastTopic['chapterId']),
              chapterTitle: _asString(lastTopic['chapterTitle']),
              timestamp: _asString(lastTopic['timestamp']),
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
              id: _asString(m['id']),
              questionId: _asString(m['questionId']),
              attemptCount: _asInt(m['attemptCount'], fallback: 1),
              updatedAt: _asString(m['updatedAt']),
              topicId: _asString(m['topicId']),
              topicTitle: _asString(m['topicTitle']),
              chapterId: _asString(m['chapterId']),
              chapterTitle: _asString(m['chapterTitle']),
              stem: _asString(m['stem']),
              correctOptionText: _asString(m['correctOptionText']),
              conceptNote: _asString(m['conceptNote']),
            ),
          )
          .toList(),
      weakTopics: weakTopics
          .map(
            (w) => WeakTopicEntity(
              topicId: _asString(w['topicId']),
              topicTitle: _asString(w['topicTitle']),
              chapterId: _asString(w['chapterId']),
              chapterTitle: _asString(w['chapterTitle']),
              accuracy: _asInt(w['accuracy']),
              mistakeCount: _asInt(w['mistakeCount']),
            ),
          )
          .toList(),
      recentExams: recentExams
          .map(
            (e) => RecentExamEntity(
              sessionId: _asString(e['sessionId']),
              chapterId: _asNullableString(e['chapterId']),
              subjectId: _asString(e['subjectId'], fallback: subjectId),
              score: _asDouble(e['score']),
              totalQuestions: _asInt(e['totalQuestions']),
              durationSeconds: _asInt(e['durationSeconds']),
              completedAt: _asNullableString(e['completedAt']),
            ),
          )
          .toList(),
      bookmarks: bookmarks
          .map(
            (b) => StudentBookmarkEntity(
              id: _asString(b['id']),
              type: _asString(b['type'], fallback: 'topic'),
              titleBangla: _asString(b['titleBangla']),
              subtitleBangla: _asNullableString(b['subtitleBangla']),
              href: _asString(b['href']),
              createdAt: _asString(b['createdAt']),
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
      message: _asNullableString(json['message']),
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
              id: _asString(t['id']),
              titleBangla: _asString(t['titleBangla']),
              scheduledDate: _asString(t['scheduledDate']),
              reminderTime: _asNullableString(t['reminderTime']),
              targetType: _asString(t['targetType'], fallback: 'CUSTOM'),
              subjectId: _asNullableString(t['subjectId']),
              chapterId: _asNullableString(t['chapterId']),
              topicId: _asNullableString(t['topicId']),
              completed: _asBool(t['completed']),
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
    if (json['items'] is List) {
      return QuickSearchCatalogModel(
        items: _asList(json['items']).map(_asMap).toList(),
        message: _asNullableString(json['message']),
      );
    }

    final rawChapters = _asList(json['json'] ?? json['chapters']);
    final flattened = <Map<String, dynamic>>[];

    for (final rawChapter in rawChapters) {
      final ch = _asMap(rawChapter);
      final chapterId = _asString(ch['id']);
      final chapterTitle = _asString(ch['titleBangla']);
      final subjectId = _asString(ch['subjectId'], fallback: fallbackSubjectId);
      final topics = _asList(ch['topics']);

      for (final rawTopic in topics) {
        final top = _asMap(rawTopic);
        final topicId = _asString(top['id']);
        if (topicId.isEmpty) continue;
        flattened.add(<String, dynamic>{
          'topicId': topicId,
          'topicTitle': _asString(top['titleBangla']),
          'chapterId': chapterId,
          'chapterTitle': chapterTitle,
          'subjectId': subjectId,
          'hasInteractiveLab': _asBool(top['hasInteractiveLab']),
          'lessonCount': _asInt(top['lessonCount']),
          'questionCount': _asInt(top['questionCount']),
        });
      }
    }

    return QuickSearchCatalogModel(
      items: flattened,
      message: _asNullableString(json['message']),
    );
  }

  @override
  Map<String, dynamic> toJson() => <String, dynamic>{'items': items};

  List<QuickSearchTopicEntity> toEntities() {
    return items
        .map(
          (item) => QuickSearchTopicEntity(
            topicId: _asString(item['topicId']),
            topicTitle: _asString(item['topicTitle']),
            chapterId: _asString(item['chapterId']),
            chapterTitle: _asString(item['chapterTitle']),
            subjectId: _asString(
              item['subjectId'],
              fallback: 'sub_ssc_physics',
            ),
            hasInteractiveLab: _asBool(item['hasInteractiveLab']),
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
      id: _asString(json['id']),
      shareCode: _asString(json['shareCode']),
      audience: _asString(json['audience'], fallback: 'PARENT'),
      recipientLabel: _asNullableString(json['recipientLabel']),
      isActive: _asBool(json['isActive']),
      sharePath: _asString(json['sharePath']),
      createdAt: _asString(json['createdAt']),
      revokedAt: _asNullableString(json['revokedAt']),
      lastViewedAt: _asNullableString(json['lastViewedAt']),
      message: _asNullableString(json['message']),
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
      message: _asNullableString(json['message']),
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
      bookmarked: _asBool(json['bookmarked']),
      message: _asNullableString(json['message']),
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
      success: _asBool(json['success'], fallback: true),
      topicId: _asString(json['topicId']),
      content: _asString(json['content']),
      message: _asNullableString(json['message']),
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
      success: _asBool(json['success'], fallback: true),
      message: _asNullableString(json['message']),
    );
  }

  @override
  Map<String, dynamic> toJson() => <String, dynamic>{'success': success};
}
