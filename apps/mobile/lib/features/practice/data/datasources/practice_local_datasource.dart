import 'dart:convert';

import 'package:porhi/core/database/app_database.dart';
import 'package:porhi/features/practice/data/models/practice_models.dart';
import 'package:porhi/features/practice/domain/entities/practice_entities.dart';

abstract class PracticeLocalDataSource {
  Future<List<PracticeQuestionEntity>> getCachedChapterQuestions({
    required String chapterId,
    String? topicId,
    String? difficulty,
    String? type,
  });

  Future<PracticeQuestionEntity?> getCachedQuestionById(String questionId);
}

class PracticeLocalDataSourceImpl implements PracticeLocalDataSource {
  final AppDatabase _database;

  PracticeLocalDataSourceImpl({required this._database});

  @override
  Future<List<PracticeQuestionEntity>> getCachedChapterQuestions({
    required String chapterId,
    String? topicId,
    String? difficulty,
    String? type,
  }) async {
    final trimmedChapter = chapterId.trim();
    final trimmedTopic = topicId?.trim();
    final normalizedDifficulty = difficulty?.trim().toUpperCase();
    final normalizedType = type?.trim().toUpperCase();

    final rows = trimmedChapter.isNotEmpty
        ? await _database.getCachedQuestionsByChapter(trimmedChapter)
        : (trimmedTopic != null && trimmedTopic.isNotEmpty
            ? await _database.getCachedQuestionsByTopic(trimmedTopic)
            : const <CachedQuestion>[]);

    final result = <PracticeQuestionEntity>[];
    for (final row in rows) {
      if (trimmedTopic != null &&
          trimmedTopic.isNotEmpty &&
          row.topicId != trimmedTopic) {
        continue;
      }

      final rowType = row.questionType.trim().toUpperCase();
      if (normalizedType != null &&
          normalizedType.isNotEmpty &&
          normalizedType != 'ALL' &&
          rowType.isNotEmpty &&
          rowType != normalizedType) {
        continue;
      }

      final parsed = _decodeCachedQuestion(row);
      if (parsed == null) continue;

      if (normalizedDifficulty != null &&
          normalizedDifficulty.isNotEmpty &&
          normalizedDifficulty != 'ALL' &&
          parsed.difficulty.trim().toUpperCase() != normalizedDifficulty) {
        continue;
      }

      result.add(parsed);
    }
    return result;
  }

  @override
  Future<PracticeQuestionEntity?> getCachedQuestionById(
    String questionId,
  ) async {
    final trimmed = questionId.trim();
    if (trimmed.isEmpty) return null;
    final row = await _database.getCachedQuestionById(trimmed);
    if (row == null) return null;
    return _decodeCachedQuestion(row);
  }

  PracticeQuestionEntity? _decodeCachedQuestion(CachedQuestion row) {
    if (row.payloadJson.trim().isEmpty) return null;
    try {
      final decoded = jsonDecode(row.payloadJson);
      if (decoded is Map) {
        final model = PracticeQuestionModel.fromJson(
          Map<String, dynamic>.from(decoded),
        );
        if (model.id.isNotEmpty) {
          return model.toEntity(isFromCache: true);
        }
      }
    } catch (_) {
      // Skip malformed cached question JSON.
    }
    return null;
  }
}
