import 'dart:convert';

import 'package:porhi/core/database/app_database.dart';
import 'package:porhi/features/exam/data/models/exam_models.dart';
import 'package:porhi/features/exam/domain/entities/exam_entities.dart';

abstract class ExamLocalDataSource {
  Future<void> saveExamDraft(ExamDraftEntity draft);

  Future<ExamDraftEntity?> getExamDraft(String sessionId);

  Future<ExamDraftEntity?> getLatestExamDraft();

  Future<void> deleteExamDraft(String sessionId);

  Future<List<ExamQuestionEntity>> getOfflineQuestionPool({
    required ExamTestType testType,
    required String subjectId,
    String? chapterId,
    String? topicId,
  });

  Future<Map<String, ExamQuestionEntity>> getCachedQuestionsByIds(
    List<String> questionIds,
  );

  Future<void> saveOfflineResult(ExamResultEntity result);

  Future<ExamResultEntity?> getOfflineResult(String sessionId);

  Future<void> saveOfflineSessionMeta(
    String sessionId, {
    required double negativeRatio,
  });

  Future<double?> getOfflineSessionNegativeRatio(String sessionId);

  Future<void> deleteOfflineSessionMeta(String sessionId);
}

class ExamLocalDataSourceImpl implements ExamLocalDataSource {
  static const String offlineResultKeyPrefix = 'offline_exam_result_';
  static const String offlineMetaKeyPrefix = 'offline_exam_meta_';

  final AppDatabase _database;

  ExamLocalDataSourceImpl({required this._database});

  @override
  Future<void> saveExamDraft(ExamDraftEntity draft) {
    return _database.upsertExamDraft(
      sessionId: draft.sessionId,
      subjectId: draft.subjectId,
      chapterId: draft.chapterId,
      testType: draft.testType.apiValue,
      questionIds: draft.questionIds,
      answers: draft.answers,
      flaggedQuestionIds: draft.flaggedQuestionIds,
      remainingSeconds: draft.remainingSeconds,
      totalDurationSeconds: draft.totalDurationSeconds,
      currentIndex: draft.currentIndex,
      startedAt: draft.startedAt,
      updatedAt: draft.updatedAt,
    );
  }

  @override
  Future<ExamDraftEntity?> getExamDraft(String sessionId) async {
    final row = await _database.getExamDraft(sessionId);
    return row == null ? null : _mapDraftRow(row);
  }

  @override
  Future<ExamDraftEntity?> getLatestExamDraft() async {
    final row = await _database.getLatestExamDraft();
    return row == null ? null : _mapDraftRow(row);
  }

  @override
  Future<void> deleteExamDraft(String sessionId) {
    return _database.deleteExamDraft(sessionId);
  }

  ExamDraftEntity _mapDraftRow(ActiveExamDraft row) {
    var questionIds = <String>[];
    try {
      final decoded = jsonDecode(row.questionIdsJson);
      if (decoded is List) {
        questionIds = decoded
            .map((e) => e.toString())
            .where((e) => e.isNotEmpty)
            .toList();
      }
    } catch (_) {
      questionIds = <String>[];
    }

    var answers = <String, String?>{};
    try {
      final decoded = jsonDecode(row.answersJson);
      if (decoded is Map) {
        decoded.forEach((key, value) {
          final k = key.toString();
          if (k.isNotEmpty) {
            answers[k] = value?.toString();
          }
        });
      }
    } catch (_) {
      answers = <String, String?>{};
    }

    var flaggedIds = <String>[];
    try {
      final decoded = jsonDecode(row.flaggedQuestionIdsJson);
      if (decoded is List) {
        flaggedIds = decoded
            .map((e) => e.toString())
            .where((e) => e.isNotEmpty)
            .toList();
      }
    } catch (_) {
      flaggedIds = <String>[];
    }

    return ExamDraftEntity(
      sessionId: row.sessionId,
      subjectId: row.subjectId,
      chapterId: row.chapterId,
      testType: ExamTestType.fromApiValue(row.testType),
      questionIds: questionIds,
      answers: answers,
      flaggedQuestionIds: flaggedIds,
      remainingSeconds: row.remainingSeconds,
      totalDurationSeconds: row.totalDurationSeconds,
      currentIndex: row.currentIndex,
      startedAt: row.startedAt,
      updatedAt: row.updatedAt,
    );
  }

  @override
  Future<List<ExamQuestionEntity>> getOfflineQuestionPool({
    required ExamTestType testType,
    required String subjectId,
    String? chapterId,
    String? topicId,
  }) async {
    List<CachedQuestion> rows;
    if (testType == ExamTestType.subjectTest) {
      rows = await _database.getCachedQuestionsBySubject(subjectId);
    } else if (chapterId != null && chapterId.trim().isNotEmpty) {
      rows = await _database.getCachedQuestionsByChapter(chapterId.trim());
    } else if (topicId != null && topicId.trim().isNotEmpty) {
      rows = await _database.getCachedQuestionsByTopic(topicId.trim());
    } else {
      rows = await _database.getCachedQuestionsBySubject(subjectId);
    }

    final trimmedTopic = topicId?.trim();
    final filterByTopic = testType == ExamTestType.topicTest &&
        trimmedTopic != null &&
        trimmedTopic.isNotEmpty;

    final result = <ExamQuestionEntity>[];
    for (final row in rows) {
      final rowType = row.questionType.trim().toUpperCase();
      if (rowType.isNotEmpty && rowType != 'MCQ') {
        continue;
      }

      final entity = _decodeQuestion(row);
      if (entity == null) continue;

      if (filterByTopic && entity.topicId != trimmedTopic && row.topicId != trimmedTopic) {
        continue;
      }

      if (entity.options.isEmpty) continue;
      result.add(entity);
    }
    return result;
  }

  @override
  Future<Map<String, ExamQuestionEntity>> getCachedQuestionsByIds(
    List<String> questionIds,
  ) async {
    final rows = await _database.getCachedQuestionsByIds(questionIds);
    final map = <String, ExamQuestionEntity>{};
    for (final row in rows) {
      final decoded = _decodeQuestion(row);
      if (decoded != null) {
        map[decoded.id] = decoded;
      }
    }
    return map;
  }

  ExamQuestionEntity? _decodeQuestion(CachedQuestion row) {
    if (row.payloadJson.trim().isEmpty) return null;
    try {
      final decoded = jsonDecode(row.payloadJson);
      if (decoded is Map) {
        final model = ExamQuestionModel.fromJson(
          Map<String, dynamic>.from(decoded),
        );
        if (model.type.trim().isNotEmpty &&
            model.type.trim().toUpperCase() != 'MCQ') {
          return null;
        }
        if (model.id.isNotEmpty) {
          return model.toEntity(isFromCache: true);
        }
      }
    } catch (_) {
      // Skip malformed cached question JSON.
    }
    return null;
  }

  @override
  Future<void> saveOfflineResult(ExamResultEntity result) {
    return _database.putStudentCache(
      '$offlineResultKeyPrefix${result.sessionId}',
      encodeExamResultJson(result),
    );
  }

  @override
  Future<ExamResultEntity?> getOfflineResult(String sessionId) async {
    final row =
        await _database.getStudentCache('$offlineResultKeyPrefix$sessionId');
    if (row == null || row.payloadJson.trim().isEmpty) return null;
    try {
      final decoded = jsonDecode(row.payloadJson);
      if (decoded is Map) {
        return ExamSessionDetailModel.fromJson(
          Map<String, dynamic>.from(decoded),
        ).toResultEntity();
      }
    } catch (_) {
      // Ignore malformed cached result JSON.
    }
    return null;
  }

  @override
  Future<void> saveOfflineSessionMeta(
    String sessionId, {
    required double negativeRatio,
  }) {
    return _database.putStudentCache(
      '$offlineMetaKeyPrefix$sessionId',
      jsonEncode(<String, dynamic>{'negativeRatio': negativeRatio}),
    );
  }

  @override
  Future<double?> getOfflineSessionNegativeRatio(String sessionId) async {
    final row =
        await _database.getStudentCache('$offlineMetaKeyPrefix$sessionId');
    if (row == null || row.payloadJson.trim().isEmpty) return null;
    try {
      final decoded = jsonDecode(row.payloadJson);
      if (decoded is Map && decoded['negativeRatio'] is num) {
        return (decoded['negativeRatio'] as num).toDouble();
      }
    } catch (_) {
      // Ignore malformed metadata JSON.
    }
    return null;
  }

  @override
  Future<void> deleteOfflineSessionMeta(String sessionId) {
    return _database.deleteStudentCache('$offlineMetaKeyPrefix$sessionId');
  }
}
