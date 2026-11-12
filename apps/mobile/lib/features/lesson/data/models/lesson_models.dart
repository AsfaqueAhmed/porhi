import 'package:network/network.dart';
import 'package:porhi/features/lesson/domain/entities/lesson_entities.dart';

String _asString(Object? raw, {String fallback = ''}) {
  if (raw == null) return fallback;
  if (raw is String) return raw;
  return raw.toString();
}

String? _asNullableString(Object? raw) {
  if (raw == null) return null;
  final str = raw is String ? raw : raw.toString();
  return str.trim().isEmpty ? null : str;
}

int _asInt(Object? raw, {int fallback = 0}) {
  if (raw is int) return raw;
  if (raw is num) return raw.toInt();
  if (raw is String) return int.tryParse(raw.trim()) ?? fallback;
  return fallback;
}

int? _asNullableInt(Object? raw) {
  if (raw == null) return null;
  if (raw is int) return raw;
  if (raw is num) return raw.toInt();
  if (raw is String) return int.tryParse(raw.trim());
  return null;
}

bool? _asNullableBool(Object? raw) {
  if (raw == null) return null;
  if (raw is bool) return raw;
  if (raw is num) return raw != 0;
  if (raw is String) {
    final normalized = raw.trim().toLowerCase();
    if (normalized == 'true' || normalized == '1') return true;
    if (normalized == 'false' || normalized == '0') return false;
  }
  return null;
}

bool _asBool(Object? raw, {bool fallback = false}) {
  return _asNullableBool(raw) ?? fallback;
}

List<dynamic> _asList(Object? raw) {
  if (raw is List<dynamic>) return raw;
  if (raw is List) return List<dynamic>.from(raw);
  return const <dynamic>[];
}

Map<String, dynamic> _asMap(Object? raw) {
  if (raw is Map<String, dynamic>) return raw;
  if (raw is Map) return Map<String, dynamic>.from(raw);
  return <String, dynamic>{};
}

Map<String, dynamic>? _asNullableMap(Object? raw) {
  if (raw == null) return null;
  if (raw is Map<String, dynamic>) return raw;
  if (raw is Map) return Map<String, dynamic>.from(raw);
  return null;
}

class LessonDetailModel extends BaseResponseModel<LessonDetailModel> {
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
  final List<Map<String, dynamic>> importantTerms;
  final Map<String, dynamic>? workedExample;
  final String? memoryAid;
  final String? interactiveWidgetUrl;
  final String? audioUrl;
  final int? audioDurationSeconds;
  final int version;

  LessonDetailModel({
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
    this.importantTerms = const <Map<String, dynamic>>[],
    this.workedExample,
    this.memoryAid,
    this.interactiveWidgetUrl,
    this.audioUrl,
    this.audioDurationSeconds,
    this.version = 1,
    super.message,
  }) {
    data = this;
  }

  factory LessonDetailModel.fromJson(
    Map<String, dynamic> json, {
    String fallbackTopicId = '',
    String fallbackChapterId = '',
    String fallbackSubjectId = '',
  }) {
    final source = json['json'] is Map ? _asMap(json['json']) : json;
    final topic = _asMap(source['topic']);
    final chapter = _asMap(topic['chapter']);
    final subject = _asMap(chapter['subject']);

    return LessonDetailModel(
      id: _asString(source['id']),
      topicId: _asString(source['topicId'], fallback: fallbackTopicId),
      topicTitle: _asString(topic['titleBangla']),
      chapterId: _asString(
        chapter['id'] ?? source['chapterId'],
        fallback: fallbackChapterId,
      ),
      chapterTitle: _asString(chapter['titleBangla']),
      subjectId: _asString(
        subject['id'] ?? source['subjectId'],
        fallback: fallbackSubjectId,
      ),
      subjectTitle: _asString(subject['nameBangla']),
      titleBangla: _asString(source['titleBangla']),
      learningGoal: _asString(source['learningGoal']),
      explanation: _asString(source['explanation']),
      importantTerms: _asList(source['importantTerms']).map(_asMap).toList(),
      workedExample: _asNullableMap(source['workedExample']),
      memoryAid: _asNullableString(source['memoryAid']),
      interactiveWidgetUrl: _asNullableString(source['interactiveWidgetUrl']),
      audioUrl: _asNullableString(source['audioUrl']),
      audioDurationSeconds: _asNullableInt(source['audioDurationSeconds']),
      version: _asInt(source['version'], fallback: 1),
      message: _asNullableString(json['message']),
    );
  }

  @override
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
        if (chapterId.isNotEmpty || subjectId.isNotEmpty)
          'topic': <String, dynamic>{
            'id': topicId,
            'titleBangla': topicTitle.isNotEmpty ? topicTitle : titleBangla,
            'chapter': <String, dynamic>{
              'id': chapterId,
              'titleBangla': chapterTitle,
              'subject': <String, dynamic>{
                'id': subjectId,
                'nameBangla': subjectTitle,
              },
            },
          },
      };

  LessonDetailEntity toEntity({
    bool isFromCache = false,
    bool isCompleted = false,
  }) {
    final terms = importantTerms
        .map(
          (item) => ImportantTermEntity(
            termBangla: _asString(item['termBangla']),
            termEnglish: _asString(item['termEnglish']),
            definition: _asString(item['definition']),
          ),
        )
        .where(
          (t) =>
              t.termBangla.trim().isNotEmpty || t.definition.trim().isNotEmpty,
        )
        .toList();

    WorkedExampleEntity? example;
    if (workedExample != null) {
      final prob = _asString(workedExample!['problem']);
      final sol = _asString(workedExample!['stepByStepSolution']);
      if (prob.trim().isNotEmpty || sol.trim().isNotEmpty) {
        example = WorkedExampleEntity(
          problem: prob,
          stepByStepSolution: sol,
        );
      }
    }

    return LessonDetailEntity(
      id: id,
      topicId: topicId,
      topicTitle: topicTitle.isNotEmpty ? topicTitle : titleBangla,
      chapterId: chapterId,
      chapterTitle: chapterTitle,
      subjectId: subjectId,
      subjectTitle: subjectTitle,
      titleBangla: titleBangla,
      learningGoal: learningGoal,
      explanation: explanation,
      importantTerms: terms,
      workedExample: example,
      memoryAid: memoryAid,
      interactiveWidgetUrl: interactiveWidgetUrl,
      audioUrl: audioUrl,
      audioDurationSeconds: audioDurationSeconds,
      version: version,
      isFromCache: isFromCache,
      isCompleted: isCompleted,
    );
  }
}

class LessonQuestionModel {
  final String id;
  final String topicId;
  final String type;
  final String stem;
  final List<Map<String, dynamic>> options;
  final Map<String, dynamic>? explanation;
  final String difficulty;
  final String? boardSource;

  const LessonQuestionModel({
    required this.id,
    required this.topicId,
    this.type = 'MCQ',
    required this.stem,
    this.options = const <Map<String, dynamic>>[],
    this.explanation,
    this.difficulty = 'MEDIUM',
    this.boardSource,
  });

  factory LessonQuestionModel.fromJson(Map<String, dynamic> json) {
    return LessonQuestionModel(
      id: _asString(json['id']),
      topicId: _asString(json['topicId']),
      type: _asString(json['type'], fallback: 'MCQ'),
      stem: _asString(json['stem']),
      options: _asList(json['options']).map(_asMap).toList(),
      explanation: _asNullableMap(json['explanation']),
      difficulty: _asString(json['difficulty'], fallback: 'MEDIUM'),
      boardSource: _asNullableString(json['boardSource']),
    );
  }

  QuickCheckQuestionEntity toEntity() {
    return QuickCheckQuestionEntity(
      id: id,
      topicId: topicId,
      type: type,
      stem: stem,
      options: options
          .map(
            (opt) => QuickCheckOptionEntity(
              id: _asString(opt['id']),
              text: _asString(opt['text']),
              isCorrect: _asNullableBool(opt['isCorrect']),
            ),
          )
          .where((o) => o.id.isNotEmpty)
          .toList(),
      explanation: explanation,
      difficulty: difficulty,
      boardSource: boardSource,
    );
  }
}

class QuickCheckQuestionListModel
    extends BaseResponseModel<QuickCheckQuestionListModel> {
  final List<LessonQuestionModel> questions;

  QuickCheckQuestionListModel({required this.questions, super.message}) {
    data = this;
  }

  factory QuickCheckQuestionListModel.fromJson(Map<String, dynamic> json) {
    final rawList = _asList(
      json['json'] ?? json['questions'] ?? json['items'],
    );
    return QuickCheckQuestionListModel(
      questions: rawList
          .map((e) => LessonQuestionModel.fromJson(_asMap(e)))
          .where((q) => q.id.isNotEmpty)
          .toList(),
      message: _asNullableString(json['message']),
    );
  }

  @override
  Map<String, dynamic> toJson() => <String, dynamic>{
        'questions': questions
            .map(
              (q) => <String, dynamic>{
                'id': q.id,
                'topicId': q.topicId,
                'type': q.type,
                'stem': q.stem,
                'options': q.options,
                if (q.explanation != null) 'explanation': q.explanation,
                'difficulty': q.difficulty,
                if (q.boardSource != null) 'boardSource': q.boardSource,
              },
            )
            .toList(),
      };
}

class QuickCheckSubmitResponseModel
    extends BaseResponseModel<QuickCheckSubmitResponseModel> {
  final bool isCorrect;
  final String? correctOptionId;
  final Map<String, dynamic>? explanation;

  QuickCheckSubmitResponseModel({
    required this.isCorrect,
    this.correctOptionId,
    this.explanation,
    super.message,
  }) {
    data = this;
  }

  factory QuickCheckSubmitResponseModel.fromJson(Map<String, dynamic> json) {
    final source = json['json'] is Map ? _asMap(json['json']) : json;
    return QuickCheckSubmitResponseModel(
      isCorrect: _asBool(source['isCorrect']),
      correctOptionId: _asNullableString(source['correctOptionId']),
      explanation: _asNullableMap(source['explanation']),
      message: _asNullableString(json['message']),
    );
  }

  @override
  Map<String, dynamic> toJson() => <String, dynamic>{
        'isCorrect': isCorrect,
        if (correctOptionId != null) 'correctOptionId': correctOptionId,
        if (explanation != null) 'explanation': explanation,
      };
}

class LessonAckModel extends BaseResponseModel<LessonAckModel> {
  final bool success;
  final String topicId;

  LessonAckModel({
    this.success = true,
    this.topicId = '',
    super.message,
  }) {
    data = this;
  }

  factory LessonAckModel.fromJson(Map<String, dynamic> json) {
    final source = json['json'] is Map ? _asMap(json['json']) : json;
    return LessonAckModel(
      success: _asBool(source['success'], fallback: true),
      topicId: _asString(source['topicId']),
      message: _asNullableString(json['message']),
    );
  }

  @override
  Map<String, dynamic> toJson() => <String, dynamic>{
        'success': success,
        'topicId': topicId,
      };
}
