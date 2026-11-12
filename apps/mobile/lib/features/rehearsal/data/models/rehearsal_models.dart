import 'package:network/network.dart';
import 'package:porhi/features/exam/data/models/exam_models.dart';
import 'package:porhi/features/exam/domain/entities/exam_entities.dart';
import 'package:porhi/features/rehearsal/domain/entities/rehearsal_entities.dart';

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

double? _asNullableDouble(Object? raw) {
  if (raw == null) return null;
  if (raw is double) return raw;
  if (raw is num) return raw.toDouble();
  if (raw is String) return double.tryParse(raw.trim());
  return null;
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

class RehearsalPaperStateModel {
  final int paperIndex;
  final String subjectId;
  final String subjectCode;
  final String subjectNameBangla;
  final String labelBangla;
  final int questionCount;
  final int durationMinutes;
  final RehearsalPaperStatus status;
  final String? sessionId;
  final double? score;
  final int? totalMarks;
  final int? correctCount;
  final int? wrongCount;
  final int? unansweredCount;
  final int? timeSpentSeconds;
  final DateTime? startedAt;
  final DateTime? submittedAt;

  const RehearsalPaperStateModel({
    required this.paperIndex,
    required this.subjectId,
    this.subjectCode = '',
    this.subjectNameBangla = '',
    required this.labelBangla,
    required this.questionCount,
    required this.durationMinutes,
    required this.status,
    this.sessionId,
    this.score,
    this.totalMarks,
    this.correctCount,
    this.wrongCount,
    this.unansweredCount,
    this.timeSpentSeconds,
    this.startedAt,
    this.submittedAt,
  });

  factory RehearsalPaperStateModel.fromJson(Map<String, dynamic> json) {
    return RehearsalPaperStateModel(
      paperIndex: _asInt(json['paperIndex']),
      subjectId: _asString(json['subjectId']),
      subjectCode: _asString(json['subjectCode']),
      subjectNameBangla: _asString(json['subjectNameBangla']),
      labelBangla: _asString(json['labelBangla']),
      questionCount: _asInt(json['questionCount'], fallback: 5),
      durationMinutes: _asInt(json['durationMinutes'], fallback: 10),
      status: RehearsalPaperStatus.fromApiValue(
        _asNullableString(json['status']),
      ),
      sessionId: _asNullableString(json['sessionId']),
      score: _asNullableDouble(json['score']),
      totalMarks: _asNullableInt(json['totalMarks']),
      correctCount: _asNullableInt(json['correctCount']),
      wrongCount: _asNullableInt(json['wrongCount']),
      unansweredCount: _asNullableInt(json['unansweredCount']),
      timeSpentSeconds: _asNullableInt(json['timeSpentSeconds']),
      startedAt: _asDateTime(json['startedAt']),
      submittedAt: _asDateTime(json['submittedAt']),
    );
  }

  RehearsalPaperStateEntity toEntity() {
    return RehearsalPaperStateEntity(
      paperIndex: paperIndex,
      subjectId: subjectId,
      subjectCode: subjectCode,
      subjectNameBangla: subjectNameBangla,
      labelBangla: labelBangla,
      questionCount: questionCount,
      durationMinutes: durationMinutes,
      status: status,
      sessionId: sessionId,
      score: score,
      totalMarks: totalMarks,
      correctCount: correctCount,
      wrongCount: wrongCount,
      unansweredCount: unansweredCount,
      timeSpentSeconds: timeSpentSeconds,
      startedAt: startedAt,
      submittedAt: submittedAt,
    );
  }
}

class MultiExamRehearsalModel {
  final String id;
  final String titleBangla;
  final String program;
  final int currentPaperIndex;
  final MultiRehearsalStatus status;
  final double? totalScore;
  final int totalMarks;
  final DateTime? startedAt;
  final DateTime? submittedAt;
  final List<RehearsalPaperStateModel> papers;

  const MultiExamRehearsalModel({
    required this.id,
    required this.titleBangla,
    this.program = 'SSC',
    required this.currentPaperIndex,
    required this.status,
    this.totalScore,
    required this.totalMarks,
    this.startedAt,
    this.submittedAt,
    this.papers = const <RehearsalPaperStateModel>[],
  });

  factory MultiExamRehearsalModel.fromJson(Map<String, dynamic> json) {
    final source = json['json'] is Map ? _asMap(json['json']) : json;
    return MultiExamRehearsalModel(
      id: _asString(source['id']),
      titleBangla: _asString(source['titleBangla']),
      program: _asString(source['program'], fallback: 'SSC'),
      currentPaperIndex: _asInt(source['currentPaperIndex']),
      status: MultiRehearsalStatus.fromApiValue(
        _asNullableString(source['status']),
      ),
      totalScore: _asNullableDouble(source['totalScore']),
      totalMarks: _asInt(source['totalMarks']),
      startedAt: _asDateTime(source['startedAt']),
      submittedAt: _asDateTime(source['submittedAt']),
      papers: _asList(source['papers'])
          .map((e) => RehearsalPaperStateModel.fromJson(_asMap(e)))
          .toList(),
    );
  }

  MultiExamRehearsalEntity toEntity() {
    return MultiExamRehearsalEntity(
      id: id,
      titleBangla: titleBangla,
      program: program,
      currentPaperIndex: currentPaperIndex,
      status: status,
      totalScore: totalScore,
      totalMarks: totalMarks,
      startedAt: startedAt,
      submittedAt: submittedAt,
      papers: papers.map((p) => p.toEntity()).toList(),
    );
  }
}

class MultiExamRehearsalListModel
    extends BaseResponseModel<MultiExamRehearsalListModel> {
  final List<MultiExamRehearsalModel> items;

  MultiExamRehearsalListModel({
    required this.items,
    super.message,
  }) {
    data = this;
  }

  factory MultiExamRehearsalListModel.fromJson(Map<String, dynamic> json) {
    final rawList = _asList(
      json['json'] ?? json['items'] ?? json['rehearsals'],
    );
    return MultiExamRehearsalListModel(
      items: rawList
          .map((e) => MultiExamRehearsalModel.fromJson(_asMap(e)))
          .where((r) => r.id.isNotEmpty)
          .toList(),
      message: _asNullableString(json['message']),
    );
  }

  List<MultiExamRehearsalEntity> toEntities() {
    return items.map((e) => e.toEntity()).toList();
  }

  @override
  Map<String, dynamic> toJson() => <String, dynamic>{
        'count': items.length,
      };
}

class RehearsalSessionEnvelopeModel
    extends BaseResponseModel<RehearsalSessionEnvelopeModel> {
  final MultiExamRehearsalModel rehearsal;
  final ExamSessionStartModel? activeSession;

  RehearsalSessionEnvelopeModel({
    required this.rehearsal,
    this.activeSession,
    super.message,
  }) {
    data = this;
  }

  factory RehearsalSessionEnvelopeModel.fromJson(Map<String, dynamic> json) {
    final source = json['json'] is Map ? _asMap(json['json']) : json;
    final rehearsal =
        MultiExamRehearsalModel.fromJson(_asMap(source['rehearsal']));
    final rawActiveSession = source['activeSession'];
    ExamSessionStartModel? activeSession;
    if (rawActiveSession is Map) {
      final parsedSession = ExamSessionStartModel.fromJson(
        Map<String, dynamic>.from(rawActiveSession),
      );
      if (parsedSession.sessionId.isNotEmpty) {
        activeSession = parsedSession;
      }
    }
    return RehearsalSessionEnvelopeModel(
      rehearsal: rehearsal,
      activeSession: activeSession,
      message: _asNullableString(json['message']),
    );
  }

  RehearsalSessionEnvelopeEntity toEntity() {
    final rehearsalEntity = rehearsal.toEntity();
    final currentSubjectId = rehearsalEntity.currentPaper?.subjectId ?? '';
    return RehearsalSessionEnvelopeEntity(
      rehearsal: rehearsalEntity,
      activeSession: activeSession?.toEntity(
        testType: ExamTestType.subjectTest,
        subjectId: currentSubjectId,
      ),
    );
  }

  @override
  Map<String, dynamic> toJson() => <String, dynamic>{
        'rehearsalId': rehearsal.id,
        if (activeSession != null) 'activeSession': activeSession!.toJson(),
      };
}

class RehearsalPaperSubmitResultModel
    extends BaseResponseModel<RehearsalPaperSubmitResultModel> {
  final MultiExamRehearsalModel rehearsal;
  final ExamSubmitResponseModel paperResult;

  RehearsalPaperSubmitResultModel({
    required this.rehearsal,
    required this.paperResult,
    super.message,
  }) {
    data = this;
  }

  factory RehearsalPaperSubmitResultModel.fromJson(Map<String, dynamic> json) {
    final source = json['json'] is Map ? _asMap(json['json']) : json;
    return RehearsalPaperSubmitResultModel(
      rehearsal: MultiExamRehearsalModel.fromJson(_asMap(source['rehearsal'])),
      paperResult:
          ExamSubmitResponseModel.fromJson(_asMap(source['paperResult'])),
      message: _asNullableString(json['message']),
    );
  }

  RehearsalPaperSubmitResultEntity toEntity({required int paperIndex}) {
    final rehearsalEntity = rehearsal.toEntity();
    final submittedPaper =
        (paperIndex >= 0 && paperIndex < rehearsalEntity.papers.length)
            ? rehearsalEntity.papers[paperIndex]
            : rehearsalEntity.lastSubmittedPaper;
    return RehearsalPaperSubmitResultEntity(
      rehearsal: rehearsalEntity,
      paperResult: paperResult.toResultEntity(
        sessionId: submittedPaper?.sessionId ?? '',
        testType: ExamTestType.subjectTest,
        subjectId: submittedPaper?.subjectId ?? '',
      ),
    );
  }

  @override
  Map<String, dynamic> toJson() => <String, dynamic>{
        'rehearsalId': rehearsal.id,
        'paperResult': paperResult.toJson(),
      };
}
