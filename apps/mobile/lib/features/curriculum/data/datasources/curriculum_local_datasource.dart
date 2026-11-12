import 'dart:convert';

import 'package:porhi/core/database/app_database.dart';
import 'package:porhi/core/storage/preferences_storage_service.dart';
import 'package:porhi/features/curriculum/data/models/curriculum_models.dart';
import 'package:porhi/features/curriculum/domain/entities/curriculum_entities.dart';

abstract class CurriculumLocalDataSource {
  Future<void> cacheSubjects(SubjectListModel model, {String? program});

  Future<SubjectListModel?> getCachedSubjects({String? program});

  Future<void> cacheChapters(String subjectId, ChapterListModel model);

  Future<ChapterListModel?> getCachedChapters(String subjectId);

  Future<int> saveOfflineChapterPack(
    OfflineChapterPackModel pack, {
    int? orderIndex,
  });

  Future<void> removeChapterPack(String chapterId);

  Future<bool> isChapterDownloaded(String chapterId);

  Future<List<DownloadedChapterEntity>> getDownloadedChapters({
    String? subjectId,
  });

  Future<OfflineChapterPackEntity?> getOfflineChapterPack(String chapterId);

  String? getActiveSubjectId();

  Future<void> setActiveSubjectId(String subjectId);
}

class CurriculumLocalDataSourceImpl implements CurriculumLocalDataSource {
  static const String _subjectsPrefix = 'curriculum_subjects_';
  static const String _chaptersPrefix = 'curriculum_chapters_';

  final AppDatabase _database;
  final PreferencesStorageService _preferencesStorage;

  CurriculumLocalDataSourceImpl({
    required this._database,
    required this._preferencesStorage,
  });

  String _subjectsCacheKey(String? program) {
    final suffix =
        program == null || program.trim().isEmpty ? 'ALL' : program.trim();
    return '$_subjectsPrefix$suffix';
  }

  @override
  Future<void> cacheSubjects(SubjectListModel model, {String? program}) async {
    await _database.putStudentCache(
      _subjectsCacheKey(program),
      jsonEncode(model.toJson()),
    );
  }

  @override
  Future<SubjectListModel?> getCachedSubjects({String? program}) async {
    final row = await _database.getStudentCache(_subjectsCacheKey(program));
    if (row == null || row.payloadJson.trim().isEmpty) return null;
    try {
      final decoded = jsonDecode(row.payloadJson);
      if (decoded is Map) {
        return SubjectListModel.fromJson(Map<String, dynamic>.from(decoded));
      }
    } catch (_) {
      // Ignore corrupted local cache JSON.
    }
    return null;
  }

  @override
  Future<void> cacheChapters(String subjectId, ChapterListModel model) async {
    await _database.putStudentCache(
      '$_chaptersPrefix$subjectId',
      jsonEncode(model.toJson()),
    );
  }

  @override
  Future<ChapterListModel?> getCachedChapters(String subjectId) async {
    final row = await _database.getStudentCache('$_chaptersPrefix$subjectId');
    if (row == null || row.payloadJson.trim().isEmpty) return null;
    try {
      final decoded = jsonDecode(row.payloadJson);
      if (decoded is Map) {
        return ChapterListModel.fromJson(
          Map<String, dynamic>.from(decoded),
          fallbackSubjectId: subjectId,
        );
      }
    } catch (_) {
      // Ignore corrupted local cache JSON.
    }
    return null;
  }

  @override
  Future<int> saveOfflineChapterPack(
    OfflineChapterPackModel pack, {
    int? orderIndex,
  }) async {
    final now =
        DateTime.tryParse(pack.downloadedAt)?.toUtc() ?? DateTime.now().toUtc();
    final serializedPack = jsonEncode(pack.toJson());
    final sizeBytes = utf8.encode(serializedPack).length;

    var maxVersion = 1;
    for (final lesson in pack.lessons) {
      if (lesson.version > maxVersion) maxVersion = lesson.version;
    }
    for (final question in pack.questions) {
      if (question.version > maxVersion) maxVersion = question.version;
    }

    final enrichedTopics = pack.topics.map((topic) {
      final topicLessons =
          pack.lessons.where((l) => l.topicId == topic.id).toList();
      final topicQuestions =
          pack.questions.where((q) => q.topicId == topic.id).toList();
      final hasLab = topicLessons.any(
        (l) =>
            l.interactiveWidgetUrl != null &&
            l.interactiveWidgetUrl!.trim().isNotEmpty,
      );
      final mcqCount = topicQuestions
          .where((q) => q.type.trim().isEmpty || q.type == 'MCQ')
          .length;
      final cqCount =
          topicQuestions.where((q) => q.type == 'CQ_CREATIVE').length;

      return TopicModel(
        id: topic.id,
        chapterId: pack.chapterId,
        orderIndex: topic.orderIndex,
        titleBangla: topic.titleBangla,
        lessonCount:
            topicLessons.isNotEmpty ? topicLessons.length : topic.lessonCount,
        hasInteractiveLab: hasLab || topic.hasInteractiveLab,
        questionCount: mcqCount > 0 ? mcqCount : topic.questionCount,
        cqCount: cqCount > 0 ? cqCount : topic.cqCount,
      ).toJson();
    }).toList();

    final metadataJson = jsonEncode(<String, dynamic>{
      'versionHash': pack.versionHash,
      'orderIndex': orderIndex ?? 0,
      'topics': enrichedTopics,
    });

    final lessonInputs = pack.lessons
        .map(
          (lesson) => CachedLessonInput(
            id: lesson.id,
            topicId: lesson.topicId,
            chapterId: pack.chapterId,
            subjectId: pack.subjectId,
            titleBangla: lesson.titleBangla,
            payloadJson: jsonEncode(lesson.toJson()),
            updatedAt: now,
          ),
        )
        .toList();

    final questionInputs = pack.questions
        .map(
          (question) => CachedQuestionInput(
            id: question.id,
            topicId: question.topicId,
            chapterId: pack.chapterId,
            subjectId: pack.subjectId,
            questionType: question.type,
            difficulty: question.difficulty,
            payloadJson: jsonEncode(question.toJson()),
            updatedAt: now,
          ),
        )
        .toList();

    await _database.saveOfflineChapterPack(
      chapterId: pack.chapterId,
      subjectId: pack.subjectId,
      titleBangla: pack.titleBangla,
      version: maxVersion,
      lessonCount: pack.lessons.length,
      questionCount: pack.questions.length,
      sizeBytes: sizeBytes,
      downloadedAt: now,
      metadataJson: metadataJson,
      lessons: lessonInputs,
      questions: questionInputs,
    );

    return sizeBytes;
  }

  @override
  Future<void> removeChapterPack(String chapterId) {
    return _database.deleteDownloadedChapter(chapterId);
  }

  @override
  Future<bool> isChapterDownloaded(String chapterId) async {
    final row = await _database.getDownloadedChapter(chapterId);
    return row != null;
  }

  @override
  Future<List<DownloadedChapterEntity>> getDownloadedChapters({
    String? subjectId,
  }) async {
    final rows = await _database.getDownloadedChapters(subjectId: subjectId);
    return rows.map(_mapDownloadedChapterRow).toList();
  }

  @override
  Future<OfflineChapterPackEntity?> getOfflineChapterPack(
    String chapterId,
  ) async {
    final row = await _database.getDownloadedChapter(chapterId);
    if (row == null) return null;

    final chapterMeta = _mapDownloadedChapterRow(row);
    final lessonRows = await _database.getCachedLessonsByChapter(chapterId);
    final questionRows =
        await _database.getCachedQuestionsByChapter(chapterId);

    final lessons = <OfflineLessonEntity>[];
    for (final lessonRow in lessonRows) {
      try {
        final decoded = jsonDecode(lessonRow.payloadJson);
        if (decoded is Map) {
          lessons.add(
            OfflineLessonModel.fromJson(
              Map<String, dynamic>.from(decoded),
            ).toEntity(),
          );
        }
      } catch (_) {
        // Skip malformed cached lesson row.
      }
    }

    final questions = <OfflineQuestionEntity>[];
    for (final questionRow in questionRows) {
      try {
        final decoded = jsonDecode(questionRow.payloadJson);
        if (decoded is Map) {
          questions.add(
            OfflineQuestionModel.fromJson(
              Map<String, dynamic>.from(decoded),
            ).toEntity(),
          );
        }
      } catch (_) {
        // Skip malformed cached question row.
      }
    }

    return OfflineChapterPackEntity(
      chapterId: row.id,
      subjectId: row.subjectId,
      titleBangla: row.titleBangla,
      versionHash: chapterMeta.versionHash,
      downloadedAt: row.downloadedAt,
      topics: chapterMeta.topics,
      lessons: lessons,
      questions: questions,
      sizeBytes: row.sizeBytes,
    );
  }

  DownloadedChapterEntity _mapDownloadedChapterRow(DownloadedChapter row) {
    var versionHash = 'v${row.version}';
    var orderIndex = 0;
    var topics = const <TopicEntity>[];

    final rawMeta = row.metadataJson;
    if (rawMeta != null && rawMeta.trim().isNotEmpty) {
      try {
        final decoded = jsonDecode(rawMeta);
        if (decoded is Map) {
          final meta = Map<String, dynamic>.from(decoded);
          final rawHash = meta['versionHash'];
          if (rawHash is String && rawHash.trim().isNotEmpty) {
            versionHash = rawHash.trim();
          }
          final rawOrder = meta['orderIndex'];
          if (rawOrder is num) {
            orderIndex = rawOrder.toInt();
          }
          final rawTopics = meta['topics'];
          if (rawTopics is List) {
            topics = rawTopics
                .whereType<Map>()
                .map(
                  (t) => TopicModel.fromJson(
                    Map<String, dynamic>.from(t),
                    fallbackChapterId: row.id,
                  ).toEntity(),
                )
                .toList();
          }
        }
      } catch (_) {
        // Fallback to metadata defaults if JSON is malformed.
      }
    }

    return DownloadedChapterEntity(
      chapterId: row.id,
      subjectId: row.subjectId,
      orderIndex: orderIndex,
      titleBangla: row.titleBangla,
      titleEnglish: row.titleEnglish,
      version: row.version,
      versionHash: versionHash,
      lessonCount: row.lessonCount,
      questionCount: row.questionCount,
      sizeBytes: row.sizeBytes,
      downloadedAt: row.downloadedAt,
      topics: topics,
    );
  }

  @override
  String? getActiveSubjectId() {
    final value = _preferencesStorage.read(
      PreferencesStorageService.activeSubjectIdKey,
    );
    if (value == null || value.trim().isEmpty) return null;
    return value.trim();
  }

  @override
  Future<void> setActiveSubjectId(String subjectId) async {
    await _preferencesStorage.write(
      PreferencesStorageService.activeSubjectIdKey,
      subjectId.trim(),
    );
  }
}
