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
  });
}
