import 'package:network/network.dart';
import 'package:porhi/features/auth/domain/entities/auth_user_entity.dart';
import 'package:porhi/features/curriculum/domain/entities/curriculum_entities.dart';

String _asString(dynamic value, {String fallback = ''}) {
  if (value is String) return value;
  if (value == null) return fallback;
  return value.toString();
}

String? _asNullableString(dynamic value) {
  if (value == null) return null;
  final text = value is String ? value : value.toString();
  return text.trim().isEmpty ? null : text;
}

int _asInt(dynamic value, {int fallback = 0}) {
  if (value is int) return value;
  if (value is num) return value.toInt();
  if (value is String) return int.tryParse(value.trim()) ?? fallback;
  return fallback;
}

int? _asNullableInt(dynamic value) {
  if (value == null) return null;
  if (value is int) return value;
  if (value is num) return value.toInt();
  if (value is String) return int.tryParse(value.trim());
  return null;
}

bool _asBool(dynamic value, {bool fallback = false}) {
  if (value is bool) return value;
  if (value is num) return value != 0;
  if (value is String) {
    final normalized = value.trim().toLowerCase();
    if (normalized == 'true' || normalized == '1') return true;
    if (normalized == 'false' || normalized == '0') return false;
  }
  return fallback;
}

List<dynamic> _asList(dynamic value) {
  if (value is List<dynamic>) return value;
  if (value is List) return List<dynamic>.from(value);
  return const <dynamic>[];
}

Map<String, dynamic> _asMap(dynamic value) {
  if (value is Map<String, dynamic>) return value;
  if (value is Map) return Map<String, dynamic>.from(value);
  return <String, dynamic>{};
}

Map<String, dynamic>? _asNullableMap(dynamic value) {
  if (value == null) return null;
  if (value is Map<String, dynamic>) return value;
  if (value is Map) return Map<String, dynamic>.from(value);
  return null;
}

StudentTrack _resolveProgramTrack(String? rawProgram, String? classLevel) {
  final programNormalized = rawProgram?.trim().toUpperCase();
  if (programNormalized != null && programNormalized.isNotEmpty) {
    return StudentTrack.fromApiValue(programNormalized);
  }
  final level = classLevel?.trim().toUpperCase();
  switch (level) {
    case 'CLASS_11_12':
    case 'HSC':
      return StudentTrack.hsc;
    case 'CLASS_6_8':
    case 'JUNIOR':
      return StudentTrack.class6to8;
    case 'ADMISSION':
      return StudentTrack.admission;
    case 'BCS':
      return StudentTrack.bcs;
    default:
      return StudentTrack.ssc;
  }
}

class SubjectModel {
  final String id;
  final String code;
  final String nameBangla;
  final String classLevel;
  final String program;
  final int syllabusYear;
  final bool isReady;
  final int chapterCount;
  final int topicCount;
  final int publishedLessonCount;
  final int publishedQuestionCount;

  const SubjectModel({
    required this.id,
    required this.code,
    required this.nameBangla,
    this.classLevel = 'CLASS_9_10',
    this.program = 'SSC',
    this.syllabusYear = 2026,
    this.isReady = true,
    this.chapterCount = 0,
    this.topicCount = 0,
    this.publishedLessonCount = 0,
    this.publishedQuestionCount = 0,
  });

  factory SubjectModel.fromJson(Map<String, dynamic> json) {
    final classLevel = _asString(json['classLevel'], fallback: 'CLASS_9_10');
    final resolvedTrack = _resolveProgramTrack(
      _asNullableString(json['program']),
      classLevel,
    );
    final countMap = _asMap(json['_count']);
    return SubjectModel(
      id: _asString(json['id']),
      code: _asString(json['code']),
      nameBangla: _asString(json['nameBangla']),
      classLevel: classLevel,
      program: resolvedTrack.apiValue,
      syllabusYear: _asInt(json['syllabusYear'], fallback: 2026),
      isReady: _asBool(json['isReady'], fallback: true),
      chapterCount: _asInt(
        json['chapterCount'] ?? countMap['chapters'],
      ),
      topicCount: _asInt(json['topicCount']),
      publishedLessonCount: _asInt(json['publishedLessonCount']),
      publishedQuestionCount: _asInt(json['publishedQuestionCount']),
    );
  }

  Map<String, dynamic> toJson() => <String, dynamic>{
        'id': id,
        'code': code,
        'nameBangla': nameBangla,
        'classLevel': classLevel,
        'program': program,
        'syllabusYear': syllabusYear,
        'isReady': isReady,
        'chapterCount': chapterCount,
        'topicCount': topicCount,
        'publishedLessonCount': publishedLessonCount,
        'publishedQuestionCount': publishedQuestionCount,
      };

  SubjectEntity toEntity({bool isFromCache = false}) {
    return SubjectEntity(
      id: id,
      code: code,
      nameBangla: nameBangla,
      classLevel: classLevel,
      program: _resolveProgramTrack(program, classLevel),
      syllabusYear: syllabusYear,
      isReady: isReady,
      chapterCount: chapterCount,
      topicCount: topicCount,
      publishedLessonCount: publishedLessonCount,
      publishedQuestionCount: publishedQuestionCount,
      isFromCache: isFromCache,
    );
  }
}

class SubjectListModel extends BaseResponseModel<SubjectListModel> {
  final List<SubjectModel> subjects;

  SubjectListModel({required this.subjects, super.message}) {
    data = this;
  }

  factory SubjectListModel.fromJson(Map<String, dynamic> json) {
    final rawList = _asList(
      json['json'] ?? json['subjects'] ?? json['items'],
    );
    return SubjectListModel(
      subjects: rawList
          .map((e) => SubjectModel.fromJson(_asMap(e)))
          .where((s) => s.id.isNotEmpty)
          .toList(),
      message: _asNullableString(json['message']),
    );
  }

  @override
  Map<String, dynamic> toJson() => <String, dynamic>{
        'subjects': subjects.map((s) => s.toJson()).toList(),
      };

  List<SubjectEntity> toEntities({bool isFromCache = false}) {
    return subjects.map((s) => s.toEntity(isFromCache: isFromCache)).toList();
  }
}

class TopicModel {
  final String id;
  final String chapterId;
  final int orderIndex;
  final String titleBangla;
  final int lessonCount;
  final bool hasInteractiveLab;
  final int questionCount;
  final int cqCount;

  const TopicModel({
    required this.id,
    this.chapterId = '',
    this.orderIndex = 0,
    required this.titleBangla,
    this.lessonCount = 0,
    this.hasInteractiveLab = false,
    this.questionCount = 0,
    this.cqCount = 0,
  });

  factory TopicModel.fromJson(
    Map<String, dynamic> json, {
    String fallbackChapterId = '',
  }) {
    return TopicModel(
      id: _asString(json['id']),
      chapterId: _asString(json['chapterId'], fallback: fallbackChapterId),
      orderIndex: _asInt(json['orderIndex']),
      titleBangla: _asString(json['titleBangla']),
      lessonCount: _asInt(json['lessonCount']),
      hasInteractiveLab: _asBool(json['hasInteractiveLab']),
      questionCount: _asInt(json['questionCount']),
      cqCount: _asInt(json['cqCount']),
    );
  }

  Map<String, dynamic> toJson() => <String, dynamic>{
        'id': id,
        'chapterId': chapterId,
        'orderIndex': orderIndex,
        'titleBangla': titleBangla,
        'lessonCount': lessonCount,
        'hasInteractiveLab': hasInteractiveLab,
        'questionCount': questionCount,
        'cqCount': cqCount,
      };

  TopicEntity toEntity() {
    return TopicEntity(
      id: id,
      chapterId: chapterId,
      orderIndex: orderIndex,
      titleBangla: titleBangla,
      lessonCount: lessonCount,
      hasInteractiveLab: hasInteractiveLab,
      questionCount: questionCount,
      cqCount: cqCount,
    );
  }
}

class ChapterModel {
  final String id;
  final String subjectId;
  final int orderIndex;
  final String titleBangla;
  final List<TopicModel> topics;

  const ChapterModel({
    required this.id,
    required this.subjectId,
    this.orderIndex = 0,
    required this.titleBangla,
    this.topics = const <TopicModel>[],
  });

  factory ChapterModel.fromJson(
    Map<String, dynamic> json, {
    String fallbackSubjectId = '',
  }) {
    final id = _asString(json['id']);
    return ChapterModel(
      id: id,
      subjectId: _asString(json['subjectId'], fallback: fallbackSubjectId),
      orderIndex: _asInt(json['orderIndex']),
      titleBangla: _asString(json['titleBangla']),
      topics: _asList(json['topics'])
          .map((t) => TopicModel.fromJson(_asMap(t), fallbackChapterId: id))
          .where((t) => t.id.isNotEmpty)
          .toList(),
    );
  }

  Map<String, dynamic> toJson() => <String, dynamic>{
        'id': id,
        'subjectId': subjectId,
        'orderIndex': orderIndex,
        'titleBangla': titleBangla,
        'topics': topics.map((t) => t.toJson()).toList(),
      };

  ChapterEntity toEntity() {
    return ChapterEntity(
      id: id,
      subjectId: subjectId,
      orderIndex: orderIndex,
      titleBangla: titleBangla,
      topics: topics.map((t) => t.toEntity()).toList(),
    );
  }
}

class ChapterListModel extends BaseResponseModel<ChapterListModel> {
  final List<ChapterModel> chapters;

  ChapterListModel({required this.chapters, super.message}) {
    data = this;
  }

  factory ChapterListModel.fromJson(
    Map<String, dynamic> json, {
    String fallbackSubjectId = '',
  }) {
    final rawList = _asList(
      json['json'] ?? json['chapters'] ?? json['items'],
    );
    return ChapterListModel(
      chapters: rawList
          .map(
            (e) => ChapterModel.fromJson(
              _asMap(e),
              fallbackSubjectId: fallbackSubjectId,
            ),
          )
          .where((c) => c.id.isNotEmpty)
          .toList(),
      message: _asNullableString(json['message']),
    );
  }

  @override
  Map<String, dynamic> toJson() => <String, dynamic>{
        'chapters': chapters.map((c) => c.toJson()).toList(),
      };

  List<ChapterEntity> toEntities() {
    return chapters.map((c) => c.toEntity()).toList();
  }
}

class OfflineLessonModel {
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

  const OfflineLessonModel({
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

  factory OfflineLessonModel.fromJson(Map<String, dynamic> json) {
    return OfflineLessonModel(
      id: _asString(json['id']),
      topicId: _asString(json['topicId']),
      titleBangla: _asString(json['titleBangla']),
      learningGoal: _asString(json['learningGoal']),
      explanation: _asString(json['explanation']),
      importantTerms: _asList(json['importantTerms']).map(_asMap).toList(),
      workedExample: _asNullableMap(json['workedExample']),
      memoryAid: _asNullableString(json['memoryAid']),
      interactiveWidgetUrl: _asNullableString(json['interactiveWidgetUrl']),
      audioUrl: _asNullableString(json['audioUrl']),
      audioDurationSeconds: _asNullableInt(json['audioDurationSeconds']),
      version: _asInt(json['version'], fallback: 1),
    );
  }

  Map<String, dynamic> toJson() => <String, dynamic>{
        'id': id,
        'topicId': topicId,
        'titleBangla': titleBangla,
        'learningGoal': learningGoal,
        'explanation': explanation,
        'importantTerms': importantTerms,
        'workedExample': workedExample,
        'memoryAid': memoryAid,
        'interactiveWidgetUrl': interactiveWidgetUrl,
        'audioUrl': audioUrl,
        'audioDurationSeconds': audioDurationSeconds,
        'version': version,
      };

  OfflineLessonEntity toEntity() {
    return OfflineLessonEntity(
      id: id,
      topicId: topicId,
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
    );
  }
}

class OfflineQuestionModel {
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

  const OfflineQuestionModel({
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

  factory OfflineQuestionModel.fromJson(Map<String, dynamic> json) {
    final rawOptions = json['options'];
    final rawRubric = json['rubric'];
    return OfflineQuestionModel(
      id: _asString(json['id']),
      topicId: _asString(json['topicId']),
      type: _asString(json['type'], fallback: 'MCQ'),
      stem: _asString(json['stem']),
      options: rawOptions is List ? rawOptions.map(_asMap).toList() : null,
      modelAnswer: _asNullableString(json['modelAnswer']),
      rubric: rawRubric is List ? List<dynamic>.from(rawRubric) : null,
      cqRubric: _asNullableMap(json['cqRubric']),
      boardSource: _asNullableString(json['boardSource']),
      explanation: _asNullableMap(json['explanation']),
      difficulty: _asString(json['difficulty'], fallback: 'MEDIUM'),
      version: _asInt(json['version'], fallback: 1),
    );
  }

  Map<String, dynamic> toJson() => <String, dynamic>{
        'id': id,
        'topicId': topicId,
        'type': type,
        'stem': stem,
        'options': options,
        'modelAnswer': modelAnswer,
        'rubric': rubric,
        'cqRubric': cqRubric,
        'boardSource': boardSource,
        'explanation': explanation,
        'difficulty': difficulty,
        'version': version,
      };

  OfflineQuestionEntity toEntity() {
    return OfflineQuestionEntity(
      id: id,
      topicId: topicId,
      type: type,
      stem: stem,
      options: options,
      modelAnswer: modelAnswer,
      rubric: rubric,
      cqRubric: cqRubric,
      boardSource: boardSource,
      explanation: explanation,
      difficulty: difficulty,
      version: version,
    );
  }
}

class OfflineChapterPackModel
    extends BaseResponseModel<OfflineChapterPackModel> {
  final String chapterId;
  final String subjectId;
  final String titleBangla;
  final String versionHash;
  final String downloadedAt;
  final List<TopicModel> topics;
  final List<OfflineLessonModel> lessons;
  final List<OfflineQuestionModel> questions;

  OfflineChapterPackModel({
    required this.chapterId,
    required this.subjectId,
    required this.titleBangla,
    this.versionHash = 'v1',
    required this.downloadedAt,
    this.topics = const <TopicModel>[],
    this.lessons = const <OfflineLessonModel>[],
    this.questions = const <OfflineQuestionModel>[],
    super.message,
  }) {
    data = this;
  }

  factory OfflineChapterPackModel.fromJson(Map<String, dynamic> json) {
    final chapterId = _asString(json['chapterId']);
    return OfflineChapterPackModel(
      chapterId: chapterId,
      subjectId: _asString(json['subjectId']),
      titleBangla: _asString(json['titleBangla']),
      versionHash: _asString(json['versionHash'], fallback: 'v1'),
      downloadedAt: _asString(
        json['downloadedAt'],
        fallback: DateTime.now().toUtc().toIso8601String(),
      ),
      topics: _asList(json['topics'])
          .map(
            (t) => TopicModel.fromJson(_asMap(t), fallbackChapterId: chapterId),
          )
          .where((t) => t.id.isNotEmpty)
          .toList(),
      lessons: _asList(json['lessons'])
          .map((l) => OfflineLessonModel.fromJson(_asMap(l)))
          .where((l) => l.id.isNotEmpty)
          .toList(),
      questions: _asList(json['questions'])
          .map((q) => OfflineQuestionModel.fromJson(_asMap(q)))
          .where((q) => q.id.isNotEmpty)
          .toList(),
      message: _asNullableString(json['message']),
    );
  }

  @override
  Map<String, dynamic> toJson() => <String, dynamic>{
        'chapterId': chapterId,
        'subjectId': subjectId,
        'titleBangla': titleBangla,
        'versionHash': versionHash,
        'downloadedAt': downloadedAt,
        'topics': topics.map((t) => t.toJson()).toList(),
        'lessons': lessons.map((l) => l.toJson()).toList(),
        'questions': questions.map((q) => q.toJson()).toList(),
      };

  OfflineChapterPackEntity toEntity({int sizeBytes = 0}) {
    return OfflineChapterPackEntity(
      chapterId: chapterId,
      subjectId: subjectId,
      titleBangla: titleBangla,
      versionHash: versionHash,
      downloadedAt:
          DateTime.tryParse(downloadedAt)?.toUtc() ?? DateTime.now().toUtc(),
      topics: topics.map((t) => t.toEntity()).toList(),
      lessons: lessons.map((l) => l.toEntity()).toList(),
      questions: questions.map((q) => q.toEntity()).toList(),
      sizeBytes: sizeBytes,
    );
  }
}
