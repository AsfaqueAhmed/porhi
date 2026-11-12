import 'dart:convert';

import 'package:network/network.dart';
import 'package:porhi/features/exam/domain/entities/exam_entities.dart';
import 'package:porhi/features/practice/data/models/practice_models.dart';

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

double _asDouble(Object? raw, {double fallback = 0.0}) {
  if (raw is double) return raw;
  if (raw is num) return raw.toDouble();
  if (raw is String) return double.tryParse(raw.trim()) ?? fallback;
  return fallback;
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

DateTime? _asDateTime(Object? raw) {
  if (raw == null) return null;
  if (raw is DateTime) return raw;
  if (raw is String && raw.trim().isNotEmpty) {
    return DateTime.tryParse(raw.trim());
  }
  return null;
}

class ExamQuestionModel {
  final String id;
  final String topicId;
  final String type;
  final String stem;
  final List<Map<String, dynamic>> options;
  final ExplanationLayersModel? explanation;
  final String difficulty;
  final String? boardSource;

  const ExamQuestionModel({
    required this.id,
    this.topicId = '',
    this.type = 'MCQ',
    required this.stem,
    this.options = const <Map<String, dynamic>>[],
    this.explanation,
    this.difficulty = 'MEDIUM',
    this.boardSource,
  });

  factory ExamQuestionModel.fromJson(Map<String, dynamic> json) {
    return ExamQuestionModel(
      id: _asString(json['id']),
      topicId: _asString(json['topicId']),
      type: _asString(json['type'], fallback: 'MCQ'),
      stem: _asString(json['stem']),
      options: _asList(json['options']).map(_asMap).toList(),
      explanation: ExplanationLayersModel.fromDynamic(json['explanation']),
      difficulty: _asString(json['difficulty'], fallback: 'MEDIUM'),
      boardSource: _asNullableString(json['boardSource']),
    );
  }

  ExamQuestionEntity toEntity({bool isFromCache = false}) {
    return ExamQuestionEntity(
      id: id,
      topicId: topicId,
      stem: stem,
      options: options
          .map(
            (opt) => ExamOptionEntity(
              id: _asString(opt['id']),
              text: _asString(opt['text']),
              isCorrect: _asNullableBool(opt['isCorrect']),
            ),
          )
          .where((o) => o.id.isNotEmpty)
          .toList(),
      explanation: explanation?.toEntity(),
      difficulty: difficulty,
      boardSource: boardSource,
      isFromCache: isFromCache,
    );
  }

  Map<String, dynamic> toJson() => <String, dynamic>{
        'id': id,
        'topicId': topicId,
        'type': type,
        'stem': stem,
        'options': options,
        if (explanation != null) 'explanation': explanation!.toJson(),
        'difficulty': difficulty,
        if (boardSource != null) 'boardSource': boardSource,
      };
}

class ExamSessionStartModel extends BaseResponseModel<ExamSessionStartModel> {
  final String sessionId;
  final int totalQuestions;
  final int durationSeconds;
  final double negativeRatio;
  final List<ExamQuestionModel> questions;

  ExamSessionStartModel({
    required this.sessionId,
    required this.totalQuestions,
    required this.durationSeconds,
    required this.negativeRatio,
    required this.questions,
    super.message,
  }) {
    data = this;
  }

  factory ExamSessionStartModel.fromJson(Map<String, dynamic> json) {
    final source = json['json'] is Map ? _asMap(json['json']) : json;
    final rawQuestions = _asList(source['questions']);
    final questions = rawQuestions
        .map((e) => ExamQuestionModel.fromJson(_asMap(e)))
        .where((q) => q.id.isNotEmpty)
        .toList();

    return ExamSessionStartModel(
      sessionId: _asString(source['sessionId']),
      totalQuestions: _asInt(
        source['totalQuestions'],
        fallback: questions.length,
      ),
      durationSeconds: _asInt(source['durationSeconds'], fallback: 600),
      negativeRatio: _asDouble(source['negativeRatio'], fallback: 0.25),
      questions: questions,
      message: _asNullableString(json['message']),
    );
  }

  ExamSessionStartEntity toEntity({
    required ExamTestType testType,
    required String subjectId,
    String? chapterId,
    bool isOfflineSession = false,
  }) {
    return ExamSessionStartEntity(
      sessionId: sessionId,
      testType: testType,
      subjectId: subjectId,
      chapterId: chapterId,
      totalQuestions: totalQuestions,
      durationSeconds: durationSeconds,
      negativeRatio: negativeRatio,
      questions: questions.map((q) => q.toEntity()).toList(),
      isOfflineSession: isOfflineSession,
      startedAt: DateTime.now().toUtc(),
    );
  }

  @override
  Map<String, dynamic> toJson() => <String, dynamic>{
        'sessionId': sessionId,
        'totalQuestions': totalQuestions,
        'durationSeconds': durationSeconds,
        'negativeRatio': negativeRatio,
        'questions': questions.map((q) => q.toJson()).toList(),
      };
}

class ExamHeartbeatResponseModel
    extends BaseResponseModel<ExamHeartbeatResponseModel> {
  final bool success;
  final String sessionId;

  ExamHeartbeatResponseModel({
    this.success = true,
    required this.sessionId,
    super.message,
  }) {
    data = this;
  }

  factory ExamHeartbeatResponseModel.fromJson(Map<String, dynamic> json) {
    final source = json['json'] is Map ? _asMap(json['json']) : json;
    return ExamHeartbeatResponseModel(
      success: _asBool(source['success'], fallback: true),
      sessionId: _asString(source['sessionId']),
      message: _asNullableString(json['message']),
    );
  }

  @override
  Map<String, dynamic> toJson() => <String, dynamic>{
        'success': success,
        'sessionId': sessionId,
      };
}

class ExamReviewedAnswerModel {
  final String questionId;
  final String? topicId;
  final String stem;
  final List<Map<String, dynamic>> options;
  final String? selectedOptionId;
  final String? correctOptionId;
  final bool isCorrect;
  final ExplanationLayersModel? explanation;
  final int timeSpent;

  const ExamReviewedAnswerModel({
    required this.questionId,
    this.topicId,
    required this.stem,
    this.options = const <Map<String, dynamic>>[],
    this.selectedOptionId,
    this.correctOptionId,
    required this.isCorrect,
    this.explanation,
    this.timeSpent = 0,
  });

  factory ExamReviewedAnswerModel.fromJson(Map<String, dynamic> json) {
    return ExamReviewedAnswerModel(
      questionId: _asString(json['questionId']),
      topicId: _asNullableString(json['topicId']),
      stem: _asString(json['stem']),
      options: _asList(json['options']).map(_asMap).toList(),
      selectedOptionId: _asNullableString(json['selectedOptionId']),
      correctOptionId: _asNullableString(json['correctOptionId']),
      isCorrect: _asBool(json['isCorrect']),
      explanation: ExplanationLayersModel.fromDynamic(json['explanation']),
      timeSpent: _asInt(json['timeSpent']),
    );
  }

  factory ExamReviewedAnswerModel.fromEntity(ExamReviewedAnswerEntity entity) {
    return ExamReviewedAnswerModel(
      questionId: entity.questionId,
      topicId: entity.topicId,
      stem: entity.stem,
      options: entity.options
          .map(
            (o) => <String, dynamic>{
              'id': o.id,
              'text': o.text,
              if (o.isCorrect != null) 'isCorrect': o.isCorrect,
            },
          )
          .toList(),
      selectedOptionId: entity.selectedOptionId,
      correctOptionId: entity.correctOptionId,
      isCorrect: entity.isCorrect,
      explanation: entity.explanation == null
          ? null
          : ExplanationLayersModel(
              directAnswer: entity.explanation!.directAnswer,
              coreConcept: entity.explanation!.coreConcept,
              stepDerivation: entity.explanation!.stepDerivation,
              distractorAnalysis: entity.explanation!.distractorAnalysis,
              textbookCitation: entity.explanation!.textbookCitation,
              proTipShortcut: entity.explanation!.proTipShortcut,
            ),
      timeSpent: entity.timeSpent,
    );
  }

  ExamReviewedAnswerEntity toEntity() {
    return ExamReviewedAnswerEntity(
      questionId: questionId,
      topicId: topicId,
      stem: stem,
      options: options
          .map(
            (o) => ExamOptionEntity(
              id: _asString(o['id']),
              text: _asString(o['text']),
              isCorrect: _asNullableBool(o['isCorrect']),
            ),
          )
          .where((o) => o.id.isNotEmpty)
          .toList(),
      selectedOptionId: selectedOptionId,
      correctOptionId: correctOptionId,
      isCorrect: isCorrect,
      explanation: explanation?.toEntity(),
      timeSpent: timeSpent,
    );
  }

  Map<String, dynamic> toJson() => <String, dynamic>{
        'questionId': questionId,
        if (topicId != null) 'topicId': topicId,
        'stem': stem,
        'options': options,
        'selectedOptionId': selectedOptionId,
        if (correctOptionId != null) 'correctOptionId': correctOptionId,
        'isCorrect': isCorrect,
        if (explanation != null) 'explanation': explanation!.toJson(),
        'timeSpent': timeSpent,
      };
}

class ExamSubmitResponseModel
    extends BaseResponseModel<ExamSubmitResponseModel> {
  final double score;
  final int totalQuestions;
  final int correctCount;
  final int wrongCount;
  final int skippedCount;
  final int durationSeconds;
  final double negativeRatio;
  final double negativeDeduction;
  final int? percentile;
  final List<ExamReviewedAnswerModel> answersWithExplanation;

  ExamSubmitResponseModel({
    required this.score,
    required this.totalQuestions,
    required this.correctCount,
    required this.wrongCount,
    required this.skippedCount,
    required this.durationSeconds,
    required this.negativeRatio,
    required this.negativeDeduction,
    this.percentile,
    required this.answersWithExplanation,
    super.message,
  }) {
    data = this;
  }

  factory ExamSubmitResponseModel.fromJson(Map<String, dynamic> json) {
    final source = json['json'] is Map ? _asMap(json['json']) : json;
    final reviewed = _asList(source['answersWithExplanation'])
        .map((e) => ExamReviewedAnswerModel.fromJson(_asMap(e)))
        .where((a) => a.questionId.isNotEmpty)
        .toList();

    return ExamSubmitResponseModel(
      score: _asDouble(source['score']),
      totalQuestions: _asInt(
        source['totalQuestions'],
        fallback: reviewed.length,
      ),
      correctCount: _asInt(source['correctCount']),
      wrongCount: _asInt(source['wrongCount']),
      skippedCount: _asInt(source['skippedCount']),
      durationSeconds: _asInt(source['durationSeconds'], fallback: 600),
      negativeRatio: _asDouble(source['negativeRatio'], fallback: 0.25),
      negativeDeduction: _asDouble(source['negativeDeduction']),
      percentile: _asNullableInt(source['percentile']),
      answersWithExplanation: reviewed,
      message: _asNullableString(json['message']),
    );
  }

  ExamResultEntity toResultEntity({
    required String sessionId,
    required ExamTestType testType,
    required String subjectId,
    String? chapterId,
  }) {
    return ExamResultEntity(
      sessionId: sessionId,
      status: 'COMPLETED',
      testType: testType,
      subjectId: subjectId,
      chapterId: chapterId,
      score: score,
      totalQuestions: totalQuestions,
      correctCount: correctCount,
      wrongCount: wrongCount,
      skippedCount: skippedCount,
      durationSeconds: durationSeconds,
      negativeRatio: negativeRatio,
      negativeDeduction: negativeDeduction,
      percentile: percentile,
      completedAt: DateTime.now().toUtc(),
      answersWithExplanation:
          answersWithExplanation.map((a) => a.toEntity()).toList(),
      isQueuedOffline: false,
    );
  }

  @override
  Map<String, dynamic> toJson() => <String, dynamic>{
        'score': score,
        'totalQuestions': totalQuestions,
        'correctCount': correctCount,
        'wrongCount': wrongCount,
        'skippedCount': skippedCount,
        'durationSeconds': durationSeconds,
        'negativeRatio': negativeRatio,
        'negativeDeduction': negativeDeduction,
        if (percentile != null) 'percentile': percentile,
        'answersWithExplanation':
            answersWithExplanation.map((a) => a.toJson()).toList(),
      };
}

class ExamSessionDetailModel extends BaseResponseModel<ExamSessionDetailModel> {
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
  final List<ExamQuestionModel> questions;
  final Map<String, String?> inProgressAnswers;
  final List<ExamReviewedAnswerModel> answersWithExplanation;
  final bool isQueuedOffline;

  ExamSessionDetailModel({
    required this.sessionId,
    required this.status,
    required this.testType,
    required this.subjectId,
    this.chapterId,
    this.score = 0.0,
    required this.totalQuestions,
    this.correctCount = 0,
    this.wrongCount = 0,
    this.skippedCount = 0,
    this.durationSeconds = 600,
    this.negativeRatio = 0.25,
    this.negativeDeduction = 0.0,
    this.percentile,
    this.startedAt,
    this.completedAt,
    this.questions = const <ExamQuestionModel>[],
    this.inProgressAnswers = const <String, String?>{},
    this.answersWithExplanation = const <ExamReviewedAnswerModel>[],
    this.isQueuedOffline = false,
    super.message,
  }) {
    data = this;
  }

  factory ExamSessionDetailModel.fromJson(Map<String, dynamic> json) {
    final source = json['json'] is Map ? _asMap(json['json']) : json;
    final status =
        _asString(source['status'], fallback: 'COMPLETED').toUpperCase();

    final rawAnswers = source['answers'];
    final inProgressMap = <String, String?>{};
    if (rawAnswers is List) {
      for (final item in rawAnswers) {
        final m = _asMap(item);
        final qId = _asString(m['questionId']);
        if (qId.isNotEmpty) {
          inProgressMap[qId] = _asNullableString(m['selectedOptionId']);
        }
      }
    } else if (rawAnswers is Map) {
      rawAnswers.forEach((key, value) {
        final qId = _asString(key);
        if (qId.isNotEmpty) {
          inProgressMap[qId] = _asNullableString(value);
        }
      });
    }

    final questions = _asList(source['questions'])
        .map((e) => ExamQuestionModel.fromJson(_asMap(e)))
        .where((q) => q.id.isNotEmpty)
        .toList();

    final reviewed = _asList(source['answersWithExplanation'])
        .map((e) => ExamReviewedAnswerModel.fromJson(_asMap(e)))
        .where((a) => a.questionId.isNotEmpty)
        .toList();

    return ExamSessionDetailModel(
      sessionId: _asString(source['sessionId']),
      status: status,
      testType: ExamTestType.fromApiValue(_asNullableString(source['testType'])),
      subjectId: _asString(source['subjectId']),
      chapterId: _asNullableString(source['chapterId']),
      score: _asDouble(source['score']),
      totalQuestions: _asInt(
        source['totalQuestions'],
        fallback: reviewed.isNotEmpty ? reviewed.length : questions.length,
      ),
      correctCount: _asInt(source['correctCount']),
      wrongCount: _asInt(source['wrongCount']),
      skippedCount: _asInt(source['skippedCount']),
      durationSeconds: _asInt(source['durationSeconds'], fallback: 600),
      negativeRatio: _asDouble(source['negativeRatio'], fallback: 0.25),
      negativeDeduction: _asDouble(source['negativeDeduction']),
      percentile: _asNullableInt(source['percentile']),
      startedAt: _asDateTime(source['startedAt']),
      completedAt: _asDateTime(source['completedAt']),
      questions: questions,
      inProgressAnswers: inProgressMap,
      answersWithExplanation: reviewed,
      isQueuedOffline: _asBool(source['isQueuedOffline']),
      message: _asNullableString(json['message']),
    );
  }

  factory ExamSessionDetailModel.fromResultEntity(ExamResultEntity entity) {
    return ExamSessionDetailModel(
      sessionId: entity.sessionId,
      status: entity.status,
      testType: entity.testType,
      subjectId: entity.subjectId,
      chapterId: entity.chapterId,
      score: entity.score,
      totalQuestions: entity.totalQuestions,
      correctCount: entity.correctCount,
      wrongCount: entity.wrongCount,
      skippedCount: entity.skippedCount,
      durationSeconds: entity.durationSeconds,
      negativeRatio: entity.negativeRatio,
      negativeDeduction: entity.negativeDeduction,
      percentile: entity.percentile,
      startedAt: entity.startedAt,
      completedAt: entity.completedAt,
      answersWithExplanation: entity.answersWithExplanation
          .map(ExamReviewedAnswerModel.fromEntity)
          .toList(),
      isQueuedOffline: entity.isQueuedOffline,
    );
  }

  ExamSessionStartEntity toInProgressStartEntity() {
    return ExamSessionStartEntity(
      sessionId: sessionId,
      testType: testType,
      subjectId: subjectId,
      chapterId: chapterId,
      totalQuestions: totalQuestions,
      durationSeconds: durationSeconds,
      negativeRatio: negativeRatio,
      questions: questions.map((q) => q.toEntity()).toList(),
      isOfflineSession: false,
      startedAt: startedAt,
    );
  }

  ExamResultEntity toResultEntity() {
    return ExamResultEntity(
      sessionId: sessionId,
      status: status,
      testType: testType,
      subjectId: subjectId,
      chapterId: chapterId,
      score: score,
      totalQuestions: totalQuestions,
      correctCount: correctCount,
      wrongCount: wrongCount,
      skippedCount: skippedCount,
      durationSeconds: durationSeconds,
      negativeRatio: negativeRatio,
      negativeDeduction: negativeDeduction,
      percentile: percentile,
      startedAt: startedAt,
      completedAt: completedAt,
      answersWithExplanation:
          answersWithExplanation.map((a) => a.toEntity()).toList(),
      isQueuedOffline: isQueuedOffline,
    );
  }

  @override
  Map<String, dynamic> toJson() => <String, dynamic>{
        'sessionId': sessionId,
        'status': status,
        'testType': testType.apiValue,
        'subjectId': subjectId,
        if (chapterId != null) 'chapterId': chapterId,
        'score': score,
        'totalQuestions': totalQuestions,
        'correctCount': correctCount,
        'wrongCount': wrongCount,
        'skippedCount': skippedCount,
        'durationSeconds': durationSeconds,
        'negativeRatio': negativeRatio,
        'negativeDeduction': negativeDeduction,
        if (percentile != null) 'percentile': percentile,
        if (startedAt != null) 'startedAt': startedAt!.toIso8601String(),
        if (completedAt != null) 'completedAt': completedAt!.toIso8601String(),
        'answersWithExplanation':
            answersWithExplanation.map((a) => a.toJson()).toList(),
        'isQueuedOffline': isQueuedOffline,
      };
}

String encodeExamResultJson(ExamResultEntity entity) =>
    jsonEncode(ExamSessionDetailModel.fromResultEntity(entity).toJson());
