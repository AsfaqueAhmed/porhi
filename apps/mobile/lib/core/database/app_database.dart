import 'dart:convert';
import 'dart:io';

import 'package:drift/drift.dart';
import 'package:drift/native.dart';
import 'package:path/path.dart' as p;
import 'package:path_provider/path_provider.dart';

part 'app_database.g.dart';

/// Metadata for chapters downloaded for offline reading and practice.
class DownloadedChapters extends Table {
  TextColumn get id => text()();
  TextColumn get subjectId => text()();
  TextColumn get titleBangla => text()();
  TextColumn get titleEnglish => text().nullable()();
  IntColumn get version => integer().withDefault(const Constant(1))();
  IntColumn get lessonCount => integer().withDefault(const Constant(0))();
  IntColumn get questionCount => integer().withDefault(const Constant(0))();
  IntColumn get sizeBytes => integer().withDefault(const Constant(0))();
  DateTimeColumn get downloadedAt => dateTime()();
  TextColumn get metadataJson => text().nullable()();

  @override
  Set<Column<Object>> get primaryKey => {id};
}

/// Cached lesson payloads belonging to downloaded chapters or recent reads.
class CachedLessons extends Table {
  TextColumn get id => text()();
  TextColumn get topicId => text()();
  TextColumn get chapterId => text()();
  TextColumn get subjectId => text().nullable()();
  TextColumn get titleBangla => text()();
  TextColumn get titleEnglish => text().nullable()();
  TextColumn get payloadJson => text()();
  BoolColumn get isCompleted => boolean().withDefault(const Constant(false))();
  DateTimeColumn get updatedAt => dateTime()();

  @override
  Set<Column<Object>> get primaryKey => {id};
}

/// Cached MCQ/CQ question payloads for offline practice and mock exams.
class CachedQuestions extends Table {
  TextColumn get id => text()();
  TextColumn get topicId => text().nullable()();
  TextColumn get chapterId => text()();
  TextColumn get subjectId => text().nullable()();
  TextColumn get questionType => text()();
  TextColumn get difficulty => text().nullable()();
  TextColumn get payloadJson => text()();
  DateTimeColumn get updatedAt => dateTime()();

  @override
  Set<Column<Object>> get primaryKey => {id};
}

/// Persisted in-progress exam drafts so timer, answers, and flags survive app kill.
class ActiveExamDrafts extends Table {
  TextColumn get sessionId => text()();
  TextColumn get subjectId => text()();
  TextColumn get chapterId => text().nullable()();
  TextColumn get testType =>
      text().withDefault(const Constant('CHAPTER_TEST'))();
  TextColumn get questionIdsJson => text()();
  TextColumn get answersJson => text().withDefault(const Constant('{}'))();
  TextColumn get flaggedQuestionIdsJson =>
      text().withDefault(const Constant('[]'))();
  IntColumn get remainingSeconds => integer()();
  IntColumn get totalDurationSeconds => integer()();
  IntColumn get currentIndex => integer().withDefault(const Constant(0))();
  DateTimeColumn get startedAt => dateTime()();
  DateTimeColumn get updatedAt => dateTime()();

  @override
  Set<Column<Object>> get primaryKey => {sessionId};
}

/// Durable queue of offline student activities pending server synchronization.
class SyncQueue extends Table {
  IntColumn get id => integer().autoIncrement()();
  TextColumn get eventId => text().unique()();
  TextColumn get eventType => text()();
  TextColumn get payloadJson => text()();
  IntColumn get retryCount => integer().withDefault(const Constant(0))();
  TextColumn get lastError => text().nullable()();
  DateTimeColumn get createdAt => dateTime()();
  DateTimeColumn get lastAttemptAt => dateTime().nullable()();
}

/// Generic JSON cache for student overview, bookmarks, mistakes, and planner state.
class LocalStudentCache extends Table {
  TextColumn get cacheKey => text()();
  TextColumn get payloadJson => text()();
  DateTimeColumn get updatedAt => dateTime()();

  @override
  Set<Column<Object>> get primaryKey => {cacheKey};
}

/// Input model for batch inserting/updating [CachedLessons].
class CachedLessonInput {
  final String id;
  final String topicId;
  final String chapterId;
  final String? subjectId;
  final String titleBangla;
  final String? titleEnglish;
  final String payloadJson;
  final bool isCompleted;
  final DateTime updatedAt;

  const CachedLessonInput({
    required this.id,
    required this.topicId,
    required this.chapterId,
    this.subjectId,
    required this.titleBangla,
    this.titleEnglish,
    required this.payloadJson,
    this.isCompleted = false,
    required this.updatedAt,
  });
}

/// Input model for batch inserting/updating [CachedQuestions].
class CachedQuestionInput {
  final String id;
  final String? topicId;
  final String chapterId;
  final String? subjectId;
  final String questionType;
  final String? difficulty;
  final String payloadJson;
  final DateTime updatedAt;

  const CachedQuestionInput({
    required this.id,
    this.topicId,
    required this.chapterId,
    this.subjectId,
    required this.questionType,
    this.difficulty,
    required this.payloadJson,
    required this.updatedAt,
  });
}

LazyDatabase _openConnection() {
  return LazyDatabase(() async {
    final dir = await getApplicationDocumentsDirectory();
    final file = File(p.join(dir.path, 'porhi_offline.sqlite'));
    return NativeDatabase.createInBackground(file);
  });
}

@DriftDatabase(
  tables: [
    DownloadedChapters,
    CachedLessons,
    CachedQuestions,
    ActiveExamDrafts,
    SyncQueue,
    LocalStudentCache,
  ],
)
class AppDatabase extends _$AppDatabase {
  static const int _maxSqlVariableChunkSize = 500;

  AppDatabase([QueryExecutor? executor]) : super(executor ?? _openConnection());

  @override
  int get schemaVersion => 1;

  // ---------------------------------------------------------------------------
  // DownloadedChapters, CachedLessons & CachedQuestions
  // ---------------------------------------------------------------------------

  Future<void> upsertDownloadedChapter({
    required String id,
    required String subjectId,
    required String titleBangla,
    String? titleEnglish,
    int version = 1,
    int lessonCount = 0,
    int questionCount = 0,
    int sizeBytes = 0,
    DateTime? downloadedAt,
    String? metadataJson,
  }) {
    return into(downloadedChapters).insertOnConflictUpdate(
      DownloadedChaptersCompanion.insert(
        id: id,
        subjectId: subjectId,
        titleBangla: titleBangla,
        titleEnglish: Value(titleEnglish),
        version: Value(version),
        lessonCount: Value(lessonCount),
        questionCount: Value(questionCount),
        sizeBytes: Value(sizeBytes),
        downloadedAt: downloadedAt ?? DateTime.now().toUtc(),
        metadataJson: Value(metadataJson),
      ),
    );
  }

  Future<List<DownloadedChapter>> getDownloadedChapters({String? subjectId}) {
    final query = select(downloadedChapters);
    if (subjectId != null) {
      query.where((t) => t.subjectId.equals(subjectId));
    }
    query.orderBy([(t) => OrderingTerm.desc(t.downloadedAt)]);
    return query.get();
  }

  Future<DownloadedChapter?> getDownloadedChapter(String chapterId) {
    return (select(downloadedChapters)..where((t) => t.id.equals(chapterId)))
        .getSingleOrNull();
  }

  Future<void> deleteDownloadedChapter(String chapterId) {
    return transaction(() async {
      await (delete(cachedLessons)..where((t) => t.chapterId.equals(chapterId)))
          .go();
      await (delete(cachedQuestions)
            ..where((t) => t.chapterId.equals(chapterId)))
          .go();
      await (delete(downloadedChapters)..where((t) => t.id.equals(chapterId)))
          .go();
    });
  }

  /// Atomically replaces cached lessons/questions for [chapterId] and saves
  /// the downloaded chapter metadata, lessons, and questions in one transaction,
  /// preserving prior [CachedLessons.isCompleted] flags across re-downloads.
  Future<void> saveOfflineChapterPack({
    required String chapterId,
    required String subjectId,
    required String titleBangla,
    String? titleEnglish,
    int version = 1,
    int lessonCount = 0,
    int questionCount = 0,
    int sizeBytes = 0,
    DateTime? downloadedAt,
    String? metadataJson,
    required List<CachedLessonInput> lessons,
    required List<CachedQuestionInput> questions,
  }) {
    return transaction(() async {
      final existingLessons = await (select(cachedLessons)
            ..where((t) => t.chapterId.equals(chapterId)))
          .get();
      final completedLessonIds = <String>{
        for (final row in existingLessons)
          if (row.isCompleted) row.id,
      };
      final completedTopicIds = <String>{
        for (final row in existingLessons)
          if (row.isCompleted) row.topicId,
      };

      await (delete(cachedLessons)..where((t) => t.chapterId.equals(chapterId)))
          .go();
      await (delete(cachedQuestions)
            ..where((t) => t.chapterId.equals(chapterId)))
          .go();
      await upsertDownloadedChapter(
        id: chapterId,
        subjectId: subjectId,
        titleBangla: titleBangla,
        titleEnglish: titleEnglish,
        version: version,
        lessonCount: lessonCount,
        questionCount: questionCount,
        sizeBytes: sizeBytes,
        downloadedAt: downloadedAt,
        metadataJson: metadataJson,
      );

      final mergedLessons = lessons
          .map(
            (lesson) => (lesson.isCompleted ||
                    completedLessonIds.contains(lesson.id) ||
                    completedTopicIds.contains(lesson.topicId))
                ? CachedLessonInput(
                    id: lesson.id,
                    topicId: lesson.topicId,
                    chapterId: lesson.chapterId,
                    subjectId: lesson.subjectId,
                    titleBangla: lesson.titleBangla,
                    titleEnglish: lesson.titleEnglish,
                    payloadJson: lesson.payloadJson,
                    isCompleted: true,
                    updatedAt: lesson.updatedAt,
                  )
                : lesson,
          )
          .toList();

      await upsertCachedLessons(mergedLessons);
      await upsertCachedQuestions(questions);
    });
  }

  Future<void> upsertCachedLessons(List<CachedLessonInput> items) {
    if (items.isEmpty) return Future.value();
    return batch((b) {
      b.insertAllOnConflictUpdate(
        cachedLessons,
        items
            .map(
              (item) => CachedLessonsCompanion.insert(
                id: item.id,
                topicId: item.topicId,
                chapterId: item.chapterId,
                subjectId: Value(item.subjectId),
                titleBangla: item.titleBangla,
                titleEnglish: Value(item.titleEnglish),
                payloadJson: item.payloadJson,
                isCompleted: Value(item.isCompleted),
                updatedAt: item.updatedAt,
              ),
            )
            .toList(),
      );
    });
  }

  Future<List<CachedLesson>> getCachedLessonsByChapter(String chapterId) {
    return (select(cachedLessons)
          ..where((t) => t.chapterId.equals(chapterId)))
        .get();
  }

  Future<CachedLesson?> getCachedLessonByTopic(String topicId) {
    return (select(cachedLessons)
          ..where((t) => t.topicId.equals(topicId))
          ..orderBy([(t) => OrderingTerm.desc(t.updatedAt)])
          ..limit(1))
        .getSingleOrNull();
  }

  Future<List<CachedLesson>> getCachedLessonsByTopic(String topicId) {
    return (select(cachedLessons)
          ..where((t) => t.topicId.equals(topicId))
          ..orderBy([(t) => OrderingTerm.desc(t.updatedAt)]))
        .get();
  }

  Future<int> markCachedLessonCompleted(String topicId) {
    return (update(cachedLessons)..where((t) => t.topicId.equals(topicId)))
        .write(const CachedLessonsCompanion(isCompleted: Value(true)));
  }

  Future<void> upsertCachedQuestions(List<CachedQuestionInput> items) {
    if (items.isEmpty) return Future.value();
    return batch((b) {
      b.insertAllOnConflictUpdate(
        cachedQuestions,
        items
            .map(
              (item) => CachedQuestionsCompanion.insert(
                id: item.id,
                topicId: Value(item.topicId),
                chapterId: item.chapterId,
                subjectId: Value(item.subjectId),
                questionType: item.questionType,
                difficulty: Value(item.difficulty),
                payloadJson: item.payloadJson,
                updatedAt: item.updatedAt,
              ),
            )
            .toList(),
      );
    });
  }

  Future<List<CachedQuestion>> getCachedQuestionsByChapter(String chapterId) {
    return (select(cachedQuestions)
          ..where((t) => t.chapterId.equals(chapterId)))
        .get();
  }

  Future<List<CachedQuestion>> getCachedQuestionsByTopic(String topicId) {
    return (select(cachedQuestions)..where((t) => t.topicId.equals(topicId)))
        .get();
  }

  Future<CachedQuestion?> getCachedQuestionById(String questionId) {
    return (select(cachedQuestions)..where((t) => t.id.equals(questionId)))
        .getSingleOrNull();
  }

  // ---------------------------------------------------------------------------
  // ActiveExamDrafts
  // ---------------------------------------------------------------------------

  Future<void> upsertExamDraft({
    required String sessionId,
    required String subjectId,
    String? chapterId,
    String testType = 'CHAPTER_TEST',
    required List<String> questionIds,
    required Map<String, String?> answers,
    required List<String> flaggedQuestionIds,
    required int remainingSeconds,
    required int totalDurationSeconds,
    int currentIndex = 0,
    DateTime? startedAt,
    DateTime? updatedAt,
  }) {
    final now = updatedAt ?? DateTime.now().toUtc();
    final encodedQuestionIds = jsonEncode(questionIds);
    final encodedAnswers = jsonEncode(answers);
    final encodedFlags = jsonEncode(flaggedQuestionIds);

    return into(activeExamDrafts).insert(
      ActiveExamDraftsCompanion.insert(
        sessionId: sessionId,
        subjectId: subjectId,
        chapterId: Value(chapterId),
        testType: Value(testType),
        questionIdsJson: encodedQuestionIds,
        answersJson: Value(encodedAnswers),
        flaggedQuestionIdsJson: Value(encodedFlags),
        remainingSeconds: remainingSeconds,
        totalDurationSeconds: totalDurationSeconds,
        currentIndex: Value(currentIndex),
        startedAt: startedAt ?? now,
        updatedAt: now,
      ),
      onConflict: DoUpdate(
        (_) => ActiveExamDraftsCompanion(
          subjectId: Value(subjectId),
          chapterId: Value(chapterId),
          testType: Value(testType),
          questionIdsJson: Value(encodedQuestionIds),
          answersJson: Value(encodedAnswers),
          flaggedQuestionIdsJson: Value(encodedFlags),
          remainingSeconds: Value(remainingSeconds),
          totalDurationSeconds: Value(totalDurationSeconds),
          currentIndex: Value(currentIndex),
          startedAt:
              startedAt != null ? Value(startedAt) : const Value.absent(),
          updatedAt: Value(now),
        ),
      ),
    );
  }

  Future<ActiveExamDraft?> getExamDraft(String sessionId) {
    return (select(activeExamDrafts)
          ..where((t) => t.sessionId.equals(sessionId)))
        .getSingleOrNull();
  }

  Future<ActiveExamDraft?> getLatestExamDraft() {
    return (select(activeExamDrafts)
          ..orderBy([(t) => OrderingTerm.desc(t.updatedAt)])
          ..limit(1))
        .getSingleOrNull();
  }

  Future<int> deleteExamDraft(String sessionId) {
    return (delete(activeExamDrafts)
          ..where((t) => t.sessionId.equals(sessionId)))
        .go();
  }

  // ---------------------------------------------------------------------------
  // SyncQueue
  // ---------------------------------------------------------------------------

  Future<void> enqueueSyncItem({
    required String eventId,
    required String eventType,
    required String payloadJson,
    DateTime? createdAt,
  }) {
    return into(syncQueue).insert(
      SyncQueueCompanion.insert(
        eventId: eventId,
        eventType: eventType,
        payloadJson: payloadJson,
        createdAt: createdAt ?? DateTime.now().toUtc(),
      ),
      mode: InsertMode.insertOrIgnore,
    );
  }

  Future<List<SyncQueueData>> getPendingSyncItems() {
    return (select(syncQueue)..orderBy([(t) => OrderingTerm.asc(t.id)])).get();
  }

  Future<int> getPendingSyncCount() async {
    final countExp = syncQueue.id.count();
    final query = selectOnly(syncQueue)..addColumns([countExp]);
    final row = await query.getSingle();
    return row.read(countExp) ?? 0;
  }

  Stream<int> watchPendingSyncCount() {
    final countExp = syncQueue.id.count();
    final query = selectOnly(syncQueue)..addColumns([countExp]);
    return query.watchSingle().map((row) => row.read(countExp) ?? 0);
  }

  Future<int> deleteSyncItemsByIds(List<int> ids) {
    if (ids.isEmpty) return Future.value(0);
    return transaction(() async {
      var deletedCount = 0;
      for (var i = 0; i < ids.length; i += _maxSqlVariableChunkSize) {
        final end = (i + _maxSqlVariableChunkSize).clamp(0, ids.length);
        final chunk = ids.sublist(i, end);
        deletedCount += await (delete(syncQueue)
              ..where((t) => t.id.isIn(chunk)))
            .go();
      }
      return deletedCount;
    });
  }

  Future<void> markSyncRetryFailed(
    List<int> ids, {
    String? errorMessage,
    DateTime? attemptedAt,
  }) {
    if (ids.isEmpty) return Future.value();
    final now = attemptedAt ?? DateTime.now().toUtc();
    return transaction(() async {
      for (var i = 0; i < ids.length; i += _maxSqlVariableChunkSize) {
        final end = (i + _maxSqlVariableChunkSize).clamp(0, ids.length);
        final chunk = ids.sublist(i, end);
        await (update(syncQueue)..where((t) => t.id.isIn(chunk))).write(
          SyncQueueCompanion.custom(
            retryCount: syncQueue.retryCount + const Constant(1),
            lastError: Variable<String>(errorMessage),
            lastAttemptAt: Variable<DateTime>(now),
          ),
        );
      }
    });
  }

  // ---------------------------------------------------------------------------
  // LocalStudentCache
  // ---------------------------------------------------------------------------

  Future<void> putStudentCache(
    String cacheKey,
    String payloadJson, {
    DateTime? updatedAt,
  }) {
    return into(localStudentCache).insertOnConflictUpdate(
      LocalStudentCacheCompanion.insert(
        cacheKey: cacheKey,
        payloadJson: payloadJson,
        updatedAt: updatedAt ?? DateTime.now().toUtc(),
      ),
    );
  }

  Future<LocalStudentCacheData?> getStudentCache(String cacheKey) {
    return (select(localStudentCache)
          ..where((t) => t.cacheKey.equals(cacheKey)))
        .getSingleOrNull();
  }

  Future<int> deleteStudentCache(String cacheKey) {
    return (delete(localStudentCache)
          ..where((t) => t.cacheKey.equals(cacheKey)))
        .go();
  }

  /// Clears user-scoped offline state (sync queue, active exam drafts, and
  /// student cache) while preserving device-wide downloaded curriculum content.
  Future<void> clearUserOfflineData() {
    return transaction(() async {
      await delete(activeExamDrafts).go();
      await delete(syncQueue).go();
      await delete(localStudentCache).go();
    });
  }

  Future<void> clearAllOfflineData() {
    return transaction(() async {
      await delete(downloadedChapters).go();
      await delete(cachedLessons).go();
      await delete(cachedQuestions).go();
      await delete(activeExamDrafts).go();
      await delete(syncQueue).go();
      await delete(localStudentCache).go();
    });
  }
}
