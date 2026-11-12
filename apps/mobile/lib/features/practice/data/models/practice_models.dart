import 'dart:convert';

import 'package:network/network.dart';
import 'package:porhi/features/practice/domain/entities/practice_entities.dart';

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
  if (raw is String) {
    final trimmed = raw.trim();
    if (trimmed.startsWith('{')) {
      try {
        final decoded = jsonDecode(trimmed);
        if (decoded is Map) {
          return Map<String, dynamic>.from(decoded);
        }
      } catch (_) {
        return null;
      }
    }
  }
  return null;
}

class ExplanationLayersModel {
  final String directAnswer;
  final String coreConcept;
  final String stepDerivation;
  final Map<String, String> distractorAnalysis;
  final TextbookCitationEntity? textbookCitation;
  final String proTipShortcut;

  const ExplanationLayersModel({
    this.directAnswer = '',
    this.coreConcept = '',
    this.stepDerivation = '',
    this.distractorAnalysis = const <String, String>{},
    this.textbookCitation,
    this.proTipShortcut = '',
  });

  static ExplanationLayersModel? fromDynamic(Object? raw) {
    if (raw == null) return null;
    final map = _asNullableMap(raw);
    if (map == null) {
      final text = _asString(raw).trim();
      if (text.isEmpty) return null;
      return ExplanationLayersModel(directAnswer: text);
    }

    final rawDistractors = _asNullableMap(map['distractorAnalysis']);
    final distractors = <String, String>{};
    if (rawDistractors != null) {
      for (final entry in rawDistractors.entries) {
        final key = entry.key.trim();
        final value = _asString(entry.value).trim();
        if (key.isNotEmpty && value.isNotEmpty) {
          distractors[key] = value;
        }
      }
    }

    TextbookCitationEntity? citation;
    final rawCitation = _asNullableMap(map['textbookCitation']);
    if (rawCitation != null) {
      final parsedCitation = TextbookCitationEntity(
        bookTitle: _asString(rawCitation['bookTitle']).trim(),
        chapterName: _asString(rawCitation['chapterName']).trim(),
        pageNumber: _asNullableInt(rawCitation['pageNumber']),
      );
      if (!parsedCitation.isEmpty) {
        citation = parsedCitation;
      }
    }

    final model = ExplanationLayersModel(
      directAnswer: _asString(map['directAnswer']),
      coreConcept: _asString(map['coreConcept']),
      stepDerivation: _asString(map['stepDerivation']),
      distractorAnalysis: distractors,
      textbookCitation: citation,
      proTipShortcut: _asString(map['proTipShortcut']),
    );
    return model.toEntity().hasAnyContent ? model : null;
  }

  ExplanationLayersEntity toEntity() {
    return ExplanationLayersEntity(
      directAnswer: directAnswer,
      coreConcept: coreConcept,
      stepDerivation: stepDerivation,
      distractorAnalysis: distractorAnalysis,
      textbookCitation: textbookCitation,
      proTipShortcut: proTipShortcut,
    );
  }

  Map<String, dynamic> toJson() => <String, dynamic>{
        if (directAnswer.isNotEmpty) 'directAnswer': directAnswer,
        if (coreConcept.isNotEmpty) 'coreConcept': coreConcept,
        if (stepDerivation.isNotEmpty) 'stepDerivation': stepDerivation,
        if (distractorAnalysis.isNotEmpty)
          'distractorAnalysis': distractorAnalysis,
        if (textbookCitation != null && !textbookCitation!.isEmpty)
          'textbookCitation': <String, dynamic>{
            'bookTitle': textbookCitation!.bookTitle,
            'chapterName': textbookCitation!.chapterName,
            if (textbookCitation!.pageNumber != null)
              'pageNumber': textbookCitation!.pageNumber,
          },
        if (proTipShortcut.isNotEmpty) 'proTipShortcut': proTipShortcut,
      };
}

class CqRubricModel {
  final CqRubricPartEntity? ka;
  final CqRubricPartEntity? kha;
  final CqRubricPartEntity? ga;
  final CqRubricPartEntity? gha;

  const CqRubricModel({
    this.ka,
    this.kha,
    this.ga,
    this.gha,
  });

  static CqRubricPartEntity? _parsePart(Object? raw, {int? defaultMark}) {
    if (raw == null) return null;
    if (raw is String) {
      final trimmed = raw.trim();
      if (trimmed.isEmpty) return null;
      return CqRubricPartEntity(mark: defaultMark, criteria: trimmed);
    }
    final map = _asNullableMap(raw);
    if (map == null) return null;
    final criteria = _asString(
      map['criteria'] ?? map['text'] ?? map['description'] ?? map['answer'],
    ).trim();
    if (criteria.isEmpty) return null;
    return CqRubricPartEntity(
      mark: _asNullableInt(map['mark']) ?? defaultMark,
      criteria: criteria,
    );
  }

  static CqRubricModel? fromDynamic(Object? raw) {
    if (raw == null) return null;
    final map = _asNullableMap(raw);
    if (map == null) {
      final rawText = _asString(raw).trim();
      if (rawText.isEmpty) return null;
      return CqRubricModel(
        ka: CqRubricPartEntity(criteria: rawText),
      );
    }

    final model = CqRubricModel(
      ka: _parsePart(map['ka'], defaultMark: 1),
      kha: _parsePart(map['kha'], defaultMark: 2),
      ga: _parsePart(map['ga'], defaultMark: 3),
      gha: _parsePart(map['gha'], defaultMark: 4),
    );
    return model.toEntity().isEmpty ? null : model;
  }

  CqRubricEntity toEntity() {
    return CqRubricEntity(
      ka: ka,
      kha: kha,
      ga: ga,
      gha: gha,
    );
  }

  Map<String, dynamic> toJson() {
    Map<String, dynamic>? partJson(CqRubricPartEntity? part) {
      if (part == null || part.isEmpty) return null;
      return <String, dynamic>{
        if (part.mark != null) 'mark': part.mark,
        'criteria': part.criteria,
      };
    }

    return <String, dynamic>{
      if (partJson(ka) != null) 'ka': partJson(ka),
      if (partJson(kha) != null) 'kha': partJson(kha),
      if (partJson(ga) != null) 'ga': partJson(ga),
      if (partJson(gha) != null) 'gha': partJson(gha),
    };
  }
}

class PracticeQuestionModel {
  final String id;
  final String topicId;
  final String type;
  final String stem;
  final List<Map<String, dynamic>> options;
  final ExplanationLayersModel? explanation;
  final CqRubricModel? cqRubric;
  final String difficulty;
  final String? boardSource;
  final bool isVerified;
  final int version;

  const PracticeQuestionModel({
    required this.id,
    this.topicId = '',
    this.type = 'MCQ',
    required this.stem,
    this.options = const <Map<String, dynamic>>[],
    this.explanation,
    this.cqRubric,
    this.difficulty = 'MEDIUM',
    this.boardSource,
    this.isVerified = false,
    this.version = 1,
  });

  factory PracticeQuestionModel.fromJson(Map<String, dynamic> json) {
    final rawExplanation = json['explanation'];
    var parsedExplanation = ExplanationLayersModel.fromDynamic(rawExplanation);
    final modelAnswer = _asNullableString(json['modelAnswer']);
    if (parsedExplanation == null && modelAnswer != null) {
      parsedExplanation = ExplanationLayersModel(directAnswer: modelAnswer);
    }

    return PracticeQuestionModel(
      id: _asString(json['id']),
      topicId: _asString(json['topicId']),
      type: _asString(json['type'], fallback: 'MCQ'),
      stem: _asString(json['stem']),
      options: _asList(json['options']).map(_asMap).toList(),
      explanation: parsedExplanation,
      cqRubric: CqRubricModel.fromDynamic(json['cqRubric']),
      difficulty: _asString(json['difficulty'], fallback: 'MEDIUM'),
      boardSource: _asNullableString(json['boardSource']),
      isVerified: _asBool(json['isVerified']),
      version: _asInt(json['version'], fallback: 1),
    );
  }

  PracticeQuestionEntity toEntity({bool isFromCache = false}) {
    return PracticeQuestionEntity(
      id: id,
      topicId: topicId,
      type: type,
      stem: stem,
      options: options
          .map(
            (opt) => PracticeOptionEntity(
              id: _asString(opt['id']),
              text: _asString(opt['text']),
              isCorrect: _asNullableBool(opt['isCorrect']),
            ),
          )
          .where((o) => o.id.isNotEmpty)
          .toList(),
      explanation: explanation?.toEntity(),
      cqRubric: cqRubric?.toEntity(),
      difficulty: difficulty,
      boardSource: boardSource,
      isVerified: isVerified,
      version: version,
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
        if (cqRubric != null) 'cqRubric': cqRubric!.toJson(),
        'difficulty': difficulty,
        if (boardSource != null) 'boardSource': boardSource,
        'isVerified': isVerified,
        'version': version,
      };
}

class PracticeQuestionListModel
    extends BaseResponseModel<PracticeQuestionListModel> {
  final List<PracticeQuestionModel> questions;

  PracticeQuestionListModel({required this.questions, super.message}) {
    data = this;
  }

  factory PracticeQuestionListModel.fromJson(Map<String, dynamic> json) {
    final rawList = _asList(
      json['json'] ?? json['questions'] ?? json['items'],
    );
    return PracticeQuestionListModel(
      questions: rawList
          .map((e) => PracticeQuestionModel.fromJson(_asMap(e)))
          .where((q) => q.id.isNotEmpty)
          .toList(),
      message: _asNullableString(json['message']),
    );
  }

  @override
  Map<String, dynamic> toJson() => <String, dynamic>{
        'questions': questions.map((q) => q.toJson()).toList(),
      };
}

class PracticeSubmitResponseModel
    extends BaseResponseModel<PracticeSubmitResponseModel> {
  final bool isCorrect;
  final String? correctOptionId;
  final ExplanationLayersModel? explanation;

  PracticeSubmitResponseModel({
    required this.isCorrect,
    this.correctOptionId,
    this.explanation,
    super.message,
  }) {
    data = this;
  }

  factory PracticeSubmitResponseModel.fromJson(Map<String, dynamic> json) {
    final source = json['json'] is Map ? _asMap(json['json']) : json;
    return PracticeSubmitResponseModel(
      isCorrect: _asBool(source['isCorrect']),
      correctOptionId: _asNullableString(source['correctOptionId']),
      explanation: ExplanationLayersModel.fromDynamic(source['explanation']),
      message: _asNullableString(json['message']),
    );
  }

  @override
  Map<String, dynamic> toJson() => <String, dynamic>{
        'isCorrect': isCorrect,
        if (correctOptionId != null) 'correctOptionId': correctOptionId,
        if (explanation != null) 'explanation': explanation!.toJson(),
      };
}

class CqSelfAssessResponseModel
    extends BaseResponseModel<CqSelfAssessResponseModel> {
  final bool success;
  final String questionId;
  final CqSelfScoresEntity selfScores;
  final int totalScore;
  final int maxScore;

  CqSelfAssessResponseModel({
    this.success = true,
    required this.questionId,
    required this.selfScores,
    required this.totalScore,
    this.maxScore = CqSelfScoresEntity.maxTotalScore,
    super.message,
  }) {
    data = this;
  }

  factory CqSelfAssessResponseModel.fromJson(Map<String, dynamic> json) {
    final source = json['json'] is Map ? _asMap(json['json']) : json;
    final rawScores = _asMap(source['selfScores']);
    final scores = CqSelfScoresEntity(
      ka: _asInt(rawScores['ka'], fallback: 0),
      kha: _asInt(rawScores['kha'], fallback: 0),
      ga: _asInt(rawScores['ga'], fallback: 0),
      gha: _asInt(rawScores['gha'], fallback: 0),
    );
    return CqSelfAssessResponseModel(
      success: _asBool(source['success'], fallback: true),
      questionId: _asString(source['questionId']),
      selfScores: scores,
      totalScore: _asInt(source['totalScore'], fallback: scores.totalScore),
      maxScore: _asInt(
        source['maxScore'],
        fallback: CqSelfScoresEntity.maxTotalScore,
      ),
      message: _asNullableString(json['message']),
    );
  }

  @override
  Map<String, dynamic> toJson() => <String, dynamic>{
        'success': success,
        'questionId': questionId,
        'selfScores': <String, int>{
          'ka': selfScores.ka,
          'kha': selfScores.kha,
          'ga': selfScores.ga,
          'gha': selfScores.gha,
        },
        'totalScore': totalScore,
        'maxScore': maxScore,
      };
}
