import 'dart:convert';

import 'package:porhi/core/database/app_database.dart';
import 'package:porhi/features/lesson/data/models/lesson_models.dart';
import 'package:porhi/features/lesson/domain/entities/lesson_entities.dart';

abstract class LessonLocalDataSource {
  Future<LessonDetailEntity?> getCachedLessonByTopic(String topicId);

  Future<bool> cacheLesson(LessonDetailModel model);

  Future<List<QuickCheckQuestionEntity>> getCachedQuestionsByTopic({
    required String chapterId,
    required String topicId,
  });

  Future<void> markCachedLessonCompleted({
    required String topicId,
    String? subjectId,
  });

  Future<String?> getLocalLessonNote(String topicId);

  Future<void> saveLocalLessonNote({
    required String topicId,
    required String content,
    String? subjectId,
  });

  Future<LocalTopicStateOverlayEntity?> getLocalTopicStateOverlay(
    String subjectId,
  );
}

class LessonLocalDataSourceImpl implements LessonLocalDataSource {
  static const String _noteCachePrefix = 'lesson_note_';
  static const String _overviewCachePrefix = 'student_overview_';
  static const String _localDeltaCachePrefix = 'local_lesson_state_';

  final AppDatabase _database;

  LessonLocalDataSourceImpl({required this._database});

  @override
  Future<LessonDetailEntity?> getCachedLessonByTopic(String topicId) async {
    final row = await _database.getCachedLessonByTopic(topicId);
    if (row == null || row.payloadJson.trim().isEmpty) return null;
    try {
      final decoded = jsonDecode(row.payloadJson);
      if (decoded is Map) {
        final model = LessonDetailModel.fromJson(
          Map<String, dynamic>.from(decoded),
          fallbackTopicId: row.topicId,
          fallbackChapterId: row.chapterId,
          fallbackSubjectId: row.subjectId ?? '',
        );
        return model.toEntity(
          isFromCache: true,
          isCompleted: row.isCompleted,
        );
      }
    } catch (_) {
      // Ignore malformed cached lesson JSON.
    }
    return null;
  }

  @override
  Future<bool> cacheLesson(LessonDetailModel model) async {
    final existing = await _database.getCachedLessonByTopic(model.topicId);
    final wasCompleted = existing?.isCompleted ?? false;
    final chapterId = model.chapterId.isNotEmpty
        ? model.chapterId
        : (existing?.chapterId ?? '');
    if (model.id.trim().isEmpty || model.topicId.trim().isEmpty) {
      return wasCompleted;
    }

    await _database.upsertCachedLessons(<CachedLessonInput>[
      CachedLessonInput(
        id: model.id,
        topicId: model.topicId,
        chapterId: chapterId,
        subjectId: model.subjectId.isNotEmpty
            ? model.subjectId
            : existing?.subjectId,
        titleBangla: model.titleBangla,
        payloadJson: jsonEncode(model.toJson()),
        isCompleted: wasCompleted,
        updatedAt: DateTime.now().toUtc(),
      ),
    ]);
    return wasCompleted;
  }

  @override
  Future<List<QuickCheckQuestionEntity>> getCachedQuestionsByTopic({
    required String chapterId,
    required String topicId,
  }) async {
    final rows = chapterId.trim().isNotEmpty
        ? await _database.getCachedQuestionsByChapter(chapterId)
        : await _database.getCachedQuestionsByTopic(topicId);

    final result = <QuickCheckQuestionEntity>[];
    for (final row in rows) {
      if (row.topicId != topicId) continue;
      final type = row.questionType.trim().toUpperCase();
      if (type.isNotEmpty && type != 'MCQ') continue;
      try {
        final decoded = jsonDecode(row.payloadJson);
        if (decoded is Map) {
          final model = LessonQuestionModel.fromJson(
            Map<String, dynamic>.from(decoded),
          );
          if (model.id.isNotEmpty) {
            result.add(model.toEntity());
          }
        }
      } catch (_) {
        // Skip malformed cached question JSON.
      }
    }
    return result;
  }

  @override
  Future<void> markCachedLessonCompleted({
    required String topicId,
    String? subjectId,
  }) async {
    await _database.markCachedLessonCompleted(topicId);
    if (subjectId == null || subjectId.trim().isEmpty) return;
    final trimmedSubject = subjectId.trim();
    final patchedOverview = await _patchOverviewCache(
      subjectId: trimmedSubject,
      patch: (map) {
        final raw = map['completedTopicIds'];
        final list = raw is List
            ? raw.map((e) => e.toString()).where((s) => s.isNotEmpty).toList()
            : <String>[];
        if (!list.contains(topicId)) {
          list.add(topicId);
          map['completedTopicIds'] = list;
        }
      },
    );
    if (!patchedOverview) {
      await _patchLocalDeltaCache(
        subjectId: trimmedSubject,
        patch: (map) {
          final raw = map['completedTopicIds'];
          final list = raw is List
              ? raw.map((e) => e.toString()).where((s) => s.isNotEmpty).toList()
              : <String>[];
          if (!list.contains(topicId)) {
            list.add(topicId);
            map['completedTopicIds'] = list;
          }
        },
      );
    }
  }

  @override
  Future<String?> getLocalLessonNote(String topicId) async {
    final row = await _database.getStudentCache('$_noteCachePrefix$topicId');
    if (row == null) return null;
    try {
      final decoded = jsonDecode(row.payloadJson);
      if (decoded is Map && decoded['content'] is String) {
        return decoded['content'] as String;
      }
    } catch (_) {
      return row.payloadJson;
    }
    return null;
  }

  @override
  Future<void> saveLocalLessonNote({
    required String topicId,
    required String content,
    String? subjectId,
  }) async {
    await _database.putStudentCache(
      '$_noteCachePrefix$topicId',
      jsonEncode(<String, dynamic>{
        'topicId': topicId,
        'content': content,
        'updatedAt': DateTime.now().toUtc().toIso8601String(),
      }),
    );

    if (subjectId == null || subjectId.trim().isEmpty) return;
    final trimmedSubject = subjectId.trim();
    final patchedOverview = await _patchOverviewCache(
      subjectId: trimmedSubject,
      patch: (map) {
        final rawNotes = map['lessonNotes'];
        final notes = rawNotes is Map
            ? Map<String, dynamic>.from(rawNotes)
            : <String, dynamic>{};
        if (content.trim().isEmpty) {
          notes.remove(topicId);
        } else {
          notes[topicId] = content;
        }
        map['lessonNotes'] = notes;
      },
    );
    if (!patchedOverview) {
      await _patchLocalDeltaCache(
        subjectId: trimmedSubject,
        patch: (map) {
          final rawNotes = map['lessonNotes'];
          final notes = rawNotes is Map
              ? Map<String, dynamic>.from(rawNotes)
              : <String, dynamic>{};
          if (content.trim().isEmpty) {
            notes.remove(topicId);
          } else {
            notes[topicId] = content;
          }
          map['lessonNotes'] = notes;
        },
      );
    }
  }

  @override
  Future<LocalTopicStateOverlayEntity?> getLocalTopicStateOverlay(
    String subjectId,
  ) async {
    final trimmed = subjectId.trim();
    if (trimmed.isEmpty) return null;
    final row = await _database.getStudentCache('$_localDeltaCachePrefix$trimmed');
    if (row == null || row.payloadJson.trim().isEmpty) return null;
    try {
      final decoded = jsonDecode(row.payloadJson);
      if (decoded is! Map) return null;
      final map = Map<String, dynamic>.from(decoded);
      final completed = (map['completedTopicIds'] is List)
          ? (map['completedTopicIds'] as List)
              .map((e) => e.toString())
              .where((s) => s.isNotEmpty)
              .toList()
          : const <String>[];
      final bookmarked = (map['bookmarkedTopicIds'] is List)
          ? (map['bookmarkedTopicIds'] as List)
              .map((e) => e.toString())
              .where((s) => s.isNotEmpty)
              .toList()
          : const <String>[];
      final notes = <String, String>{};
      if (map['lessonNotes'] is Map) {
        for (final entry in (map['lessonNotes'] as Map).entries) {
          notes[entry.key.toString()] = entry.value?.toString() ?? '';
        }
      }
      return LocalTopicStateOverlayEntity(
        completedTopicIds: completed,
        bookmarkedTopicIds: bookmarked,
        lessonNotes: notes,
      );
    } catch (_) {
      return null;
    }
  }

  Future<bool> _patchOverviewCache({
    required String subjectId,
    required void Function(Map<String, dynamic> map) patch,
  }) async {
    final key = '$_overviewCachePrefix$subjectId';
    final row = await _database.getStudentCache(key);
    if (row == null || row.payloadJson.trim().isEmpty) return false;
    try {
      final decoded = jsonDecode(row.payloadJson);
      if (decoded is! Map) return false;
      final map = Map<String, dynamic>.from(decoded);
      patch(map);
      await _database.putStudentCache(key, jsonEncode(map));
      return true;
    } catch (_) {
      return false;
    }
  }

  Future<void> _patchLocalDeltaCache({
    required String subjectId,
    required void Function(Map<String, dynamic> map) patch,
  }) async {
    final key = '$_localDeltaCachePrefix$subjectId';
    final row = await _database.getStudentCache(key);
    var map = <String, dynamic>{};
    if (row != null && row.payloadJson.trim().isNotEmpty) {
      try {
        final decoded = jsonDecode(row.payloadJson);
        if (decoded is Map) {
          map = Map<String, dynamic>.from(decoded);
        }
      } catch (_) {
        map = <String, dynamic>{};
      }
    }
    patch(map);
    await _database.putStudentCache(key, jsonEncode(map));
  }
}
