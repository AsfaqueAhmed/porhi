import 'package:drift/native.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:porhi/core/database/app_database.dart';

void main() {
  late AppDatabase db;

  setUp(() {
    db = AppDatabase(NativeDatabase.memory());
  });

  tearDown(() async {
    await db.close();
  });

  group('AppDatabase offline curriculum & student cache', () {
    test(
      'stores and removes DownloadedChapters along with CachedLessons and CachedQuestions',
      () async {
        final now = DateTime.utc(2026, 11, 12, 12, 0);
        await db.upsertDownloadedChapter(
          id: 'ch-1',
          subjectId: 'sub-math',
          titleBangla: 'বাস্তব সংখ্যা',
          titleEnglish: 'Real Numbers',
          version: 2,
          lessonCount: 1,
          questionCount: 1,
          sizeBytes: 4096,
          downloadedAt: now,
        );

        await db.upsertCachedLessons([
          CachedLessonInput(
            id: 'lesson-1',
            topicId: 'topic-1',
            chapterId: 'ch-1',
            subjectId: 'sub-math',
            titleBangla: 'মূলদ সংখ্যা',
            payloadJson: '{"sections":[]}',
            isCompleted: true,
            updatedAt: now,
          ),
        ]);

        await db.upsertCachedQuestions([
          CachedQuestionInput(
            id: 'q-1',
            topicId: 'topic-1',
            chapterId: 'ch-1',
            subjectId: 'sub-math',
            questionType: 'MCQ',
            difficulty: 'MEDIUM',
            payloadJson: '{"stem":"2+2=?"}',
            updatedAt: now,
          ),
        ]);

        final chapters = await db.getDownloadedChapters();
        expect(chapters, hasLength(1));
        expect(chapters.first.titleBangla, 'বাস্তব সংখ্যা');
        expect(chapters.first.version, 2);

        final lessons = await db.getCachedLessonsByChapter('ch-1');
        expect(lessons, hasLength(1));
        expect(lessons.first.isCompleted, isTrue);

        final questions = await db.getCachedQuestionsByChapter('ch-1');
        expect(questions, hasLength(1));
        expect(questions.first.questionType, 'MCQ');

        await db.deleteDownloadedChapter('ch-1');

        expect(await db.getDownloadedChapters(), isEmpty);
        expect(await db.getCachedLessonsByChapter('ch-1'), isEmpty);
        expect(await db.getCachedQuestionsByChapter('ch-1'), isEmpty);
      },
    );

    test('LocalStudentCache upserts and retrieves JSON payloads', () async {
      await db.putStudentCache('overview', '{"xp":120}');
      expect((await db.getStudentCache('overview'))?.payloadJson, '{"xp":120}');

      await db.putStudentCache('overview', '{"xp":150}');
      expect((await db.getStudentCache('overview'))?.payloadJson, '{"xp":150}');

      await db.deleteStudentCache('overview');
      expect(await db.getStudentCache('overview'), isNull);
    });

    test('SyncQueue deduplicates identical eventId on enqueue', () async {
      await db.enqueueSyncItem(
        eventId: 'same-event-id',
        eventType: 'lesson_complete',
        payloadJson: '{"topicId":"t1"}',
      );
      await db.enqueueSyncItem(
        eventId: 'same-event-id',
        eventType: 'lesson_complete',
        payloadJson: '{"topicId":"t1"}',
      );

      final items = await db.getPendingSyncItems();
      expect(items, hasLength(1));
      expect(await db.getPendingSyncCount(), 1);
    });

    test('getDownloadedChapter, getCachedLessonByTopic, deleteExamDraft, and clearAllOfflineData work cleanly', () async {
      final now = DateTime.utc(2026, 11, 12, 13, 0);
      await db.upsertDownloadedChapter(
        id: 'ch-clear',
        subjectId: 'sub-phy',
        titleBangla: 'গতি',
        downloadedAt: now,
      );
      await db.upsertCachedLessons([
        CachedLessonInput(
          id: 'l-clear',
          topicId: 'topic-clear',
          chapterId: 'ch-clear',
          titleBangla: 'বেগ',
          payloadJson: '{}',
          updatedAt: now,
        ),
      ]);
      await db.upsertExamDraft(
        sessionId: 'draft-clear',
        subjectId: 'sub-phy',
        questionIds: const ['q1'],
        answers: const {'q1': 'a'},
        flaggedQuestionIds: const [],
        remainingSeconds: 60,
        totalDurationSeconds: 120,
      );
      await db.putStudentCache('overview', '{}');
      await db.enqueueSyncItem(
        eventId: 'evt-clear',
        eventType: 'lesson_complete',
        payloadJson: '{}',
      );

      expect((await db.getDownloadedChapter('ch-clear'))?.titleBangla, 'গতি');
      expect((await db.getCachedLessonByTopic('topic-clear'))?.id, 'l-clear');
      expect(await db.deleteExamDraft('draft-clear'), 1);
      expect(await db.getExamDraft('draft-clear'), isNull);

      await db.clearAllOfflineData();
      expect(await db.getDownloadedChapters(), isEmpty);
      expect(await db.getCachedLessonsByChapter('ch-clear'), isEmpty);
      expect(await db.getStudentCache('overview'), isNull);
      expect(await db.getPendingSyncItems(), isEmpty);
    });

    test('upsertExamDraft preserves original startedAt when omitted on update', () async {
      final originalStart = DateTime.utc(2026, 11, 12, 8, 0);
      await db.upsertExamDraft(
        sessionId: 'draft-preserve',
        subjectId: 'sub-math',
        questionIds: const ['q1', 'q2'],
        answers: const {'q1': 'opt-a'},
        flaggedQuestionIds: const ['q2'],
        remainingSeconds: 500,
        totalDurationSeconds: 600,
        startedAt: originalStart,
        updatedAt: originalStart,
      );

      final laterUpdate = DateTime.utc(2026, 11, 12, 8, 5);
      await db.upsertExamDraft(
        sessionId: 'draft-preserve',
        subjectId: 'sub-math',
        questionIds: const ['q1', 'q2'],
        answers: const {'q1': 'opt-a', 'q2': 'opt-b'},
        flaggedQuestionIds: const [],
        remainingSeconds: 200,
        totalDurationSeconds: 600,
        currentIndex: 1,
        updatedAt: laterUpdate,
      );

      final draft = await db.getExamDraft('draft-preserve');
      expect(draft, isNotNull);
      expect(draft!.startedAt.toUtc(), originalStart);
      expect(draft.updatedAt.toUtc(), laterUpdate);
      expect(draft.remainingSeconds, 200);
      expect(draft.currentIndex, 1);
    });

    test('getCachedLessonByTopic handles multiple lessons per topic safely', () async {
      final older = DateTime.utc(2026, 11, 12, 7, 0);
      final newer = DateTime.utc(2026, 11, 12, 9, 0);
      await db.upsertCachedLessons([
        CachedLessonInput(
          id: 'lesson-old',
          topicId: 'shared-topic',
          chapterId: 'ch-1',
          titleBangla: 'পুরাতন পাঠ',
          payloadJson: '{"v":1}',
          updatedAt: older,
        ),
        CachedLessonInput(
          id: 'lesson-new',
          topicId: 'shared-topic',
          chapterId: 'ch-1',
          titleBangla: 'নতুন পাঠ',
          payloadJson: '{"v":2}',
          updatedAt: newer,
        ),
      ]);

      final latest = await db.getCachedLessonByTopic('shared-topic');
      expect(latest?.id, 'lesson-new');

      final allForTopic = await db.getCachedLessonsByTopic('shared-topic');
      expect(allForTopic.map((e) => e.id).toList(), ['lesson-new', 'lesson-old']);
    });

    test('chunked SyncQueue operations handle > 500 IDs and empty lists safely', () async {
      await db.upsertCachedLessons(const []);
      await db.upsertCachedQuestions(const []);
      expect(await db.deleteSyncItemsByIds(const []), 0);
      await db.markSyncRetryFailed(const []);

      for (var i = 0; i < 600; i++) {
        await db.enqueueSyncItem(
          eventId: 'bulk-evt-$i',
          eventType: 'lesson_complete',
          payloadJson: '{"offlineEventId":"bulk-evt-$i","topicId":"t1"}',
        );
      }

      final rows = await db.getPendingSyncItems();
      expect(rows, hasLength(600));

      final ids = rows.map((r) => r.id).toList();
      await db.markSyncRetryFailed(ids, errorMessage: 'chunked error');
      final updatedRows = await db.getPendingSyncItems();
      expect(updatedRows.every((r) => r.retryCount == 1), isTrue);
      expect(updatedRows.every((r) => r.lastError == 'chunked error'), isTrue);

      final deleted = await db.deleteSyncItemsByIds(ids);
      expect(deleted, 600);
      expect(await db.getPendingSyncCount(), 0);
    });
  });
}
