import 'dart:async';
import 'dart:convert';

import 'package:common/common.dart';
import 'package:drift/native.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:network/network.dart';
import 'package:porhi/core/database/app_database.dart';
import 'package:porhi/core/sync/offline_sync_service.dart';

void main() {
  late AppDatabase db;

  setUp(() {
    db = AppDatabase(NativeDatabase.memory());
  });

  tearDown(() async {
    await db.close();
  });

  group('ActiveExamDrafts', () {
    test(
      'ActiveExamDrafts persists and restores answers, flags, and remainingSeconds',
      () async {
        final startedAt = DateTime.utc(2026, 11, 12, 9, 0);
        await db.upsertExamDraft(
          sessionId: 'exam-session-1',
          subjectId: 'phy-ssc',
          chapterId: 'phy-ch-1',
          testType: 'CHAPTER_TEST',
          questionIds: const ['q1', 'q2', 'q3'],
          answers: const {'q1': 'opt-b', 'q3': 'opt-a'},
          flaggedQuestionIds: const ['q2'],
          remainingSeconds: 425,
          totalDurationSeconds: 600,
          currentIndex: 1,
          startedAt: startedAt,
        );

        final restored = await db.getExamDraft('exam-session-1');
        expect(restored, isNotNull);
        expect(restored!.subjectId, 'phy-ssc');
        expect(restored.chapterId, 'phy-ch-1');
        expect(restored.testType, 'CHAPTER_TEST');
        expect(
          jsonDecode(restored.questionIdsJson),
          equals(['q1', 'q2', 'q3']),
        );
        expect(
          jsonDecode(restored.answersJson),
          equals({'q1': 'opt-b', 'q3': 'opt-a'}),
        );
        expect(jsonDecode(restored.flaggedQuestionIdsJson), equals(['q2']));
        expect(restored.remainingSeconds, 425);
        expect(restored.totalDurationSeconds, 600);
        expect(restored.currentIndex, 1);

        // Update remaining time and answer after resuming
        await db.upsertExamDraft(
          sessionId: 'exam-session-1',
          subjectId: 'phy-ssc',
          chapterId: 'phy-ch-1',
          testType: 'CHAPTER_TEST',
          questionIds: const ['q1', 'q2', 'q3'],
          answers: const {'q1': 'opt-b', 'q2': 'opt-d', 'q3': 'opt-a'},
          flaggedQuestionIds: const [],
          remainingSeconds: 310,
          totalDurationSeconds: 600,
          currentIndex: 2,
          startedAt: startedAt,
        );

        final latest = await db.getLatestExamDraft();
        expect(latest, isNotNull);
        expect(latest!.remainingSeconds, 310);
        expect(latest.currentIndex, 2);
        expect(
          jsonDecode(latest.answersJson),
          equals({'q1': 'opt-b', 'q2': 'opt-d', 'q3': 'opt-a'}),
        );
        expect(jsonDecode(latest.flaggedQuestionIdsJson), isEmpty);
      },
    );
  });

  group('OfflineSyncService', () {
    test(
      'flushPendingQueue delegates batched sync payload and clears queue rows on Right()',
      () async {
        OfflineSyncPayload? capturedPayload;
        final service = OfflineSyncService(
          database: db,
          syncHandler: (payload) async {
            capturedPayload = payload;
            return const Right(null);
          },
        );
        await service.init();

        await service.enqueueLessonComplete(
          offlineEventId: 'evt-lesson-1',
          topicId: 'topic-1',
          chapterId: 'ch-1',
          subjectId: 'sub-1',
          completedAt: DateTime.utc(2026, 11, 12, 10, 0),
        );
        await service.enqueuePracticeAttempt(
          offlineEventId: 'evt-practice-1',
          questionId: 'q-1',
          topicId: 'topic-1',
          isCorrect: true,
          selectedOptionId: 'opt-1',
          attemptedAt: DateTime.utc(2026, 11, 12, 10, 5),
        );
        await service.enqueueExamSubmission(
          offlineSessionId: 'sess-exam-1',
          subjectId: 'sub-1',
          chapterId: 'ch-1',
          testType: 'CHAPTER_TEST',
          durationSeconds: 180,
          answers: const [
            OfflineExamAnswerItem(questionId: 'q-1', selectedOptionId: 'opt-1'),
            OfflineExamAnswerItem(questionId: 'q-2', selectedOptionId: null),
          ],
          submittedAt: DateTime.utc(2026, 11, 12, 10, 10),
        );

        expect(service.pendingCount.value, 3);

        final result = await service.flushPendingQueue();
        expect(result.isRight(), isTrue);
        expect(result.getOrElse(() => -1), 3);

        expect(capturedPayload, isNotNull);
        expect(capturedPayload!.lessonCompletes, hasLength(1));
        expect(
          capturedPayload!.lessonCompletes.first.offlineEventId,
          'evt-lesson-1',
        );
        expect(capturedPayload!.practiceAttempts, hasLength(1));
        expect(capturedPayload!.practiceAttempts.first.isCorrect, isTrue);
        expect(capturedPayload!.examSubmissions, hasLength(1));
        expect(
          capturedPayload!.examSubmissions.first.offlineSessionId,
          'sess-exam-1',
        );
        expect(capturedPayload!.examSubmissions.first.answers, hasLength(2));

        // Payload matches backend SyncOfflineDto JSON contract
        final json = capturedPayload!.toJson();
        expect(json['lessonCompletes'], hasLength(1));
        expect(json['practiceAttempts'], hasLength(1));
        expect(json['examSubmissions'], hasLength(1));

        expect(service.pendingCount.value, 0);
        expect(await db.getPendingSyncItems(), isEmpty);

        service.onClose();
      },
    );

    test(
      'flushPendingQueue preserves queue rows and increments retryCount on Left(ErrorResponse)',
      () async {
        final service = OfflineSyncService(
          database: db,
          syncHandler: (_) async => Left(
            ErrorResponse.byErrorType(errorType: ApiResponseErrorType.noInternet),
          ),
        );
        await service.init();

        await service.enqueueLessonComplete(
          offlineEventId: 'evt-lesson-fail',
          topicId: 'topic-9',
        );
        await service.enqueuePracticeAttempt(
          offlineEventId: 'evt-practice-fail',
          questionId: 'q-9',
          isCorrect: false,
        );

        expect(service.pendingCount.value, 2);

        final result = await service.flushPendingQueue();
        expect(result.isLeft(), isTrue);
        expect(service.pendingCount.value, 2);

        final rows = await db.getPendingSyncItems();
        expect(rows, hasLength(2));
        expect(rows.every((r) => r.retryCount == 1), isTrue);
        expect(
          rows.every((r) => r.lastError == 'Please connect to internet'),
          isTrue,
        );
        expect(rows.every((r) => r.lastAttemptAt != null), isTrue);

        // Second failure increments retryCount again
        await service.flushPendingQueue();
        final rowsAfterRetry = await db.getPendingSyncItems();
        expect(rowsAfterRetry.every((r) => r.retryCount == 2), isTrue);

        service.onClose();
      },
    );

    test(
      'flushPendingQueue preserves items enqueued while flush is in flight',
      () async {
        final gate = Completer<Either<ErrorResponse, void>>();
        var callCount = 0;

        final service = OfflineSyncService(
          database: db,
          syncHandler: (_) async {
            callCount++;
            if (callCount == 1) {
              return gate.future;
            }
            return const Right(null);
          },
        );
        await service.init();

        await service.enqueueLessonComplete(
          offlineEventId: 'evt-before',
          topicId: 'topic-1',
        );

        final flushFuture = service.flushPendingQueue();
        // Allow snapshot query to run before completing network gate
        await Future<void>.delayed(const Duration(milliseconds: 20));

        await service.enqueueLessonComplete(
          offlineEventId: 'evt-during',
          topicId: 'topic-2',
        );

        gate.complete(const Right(null));
        final firstResult = await flushFuture;
        expect(firstResult.getOrElse(() => -1), 1);

        final remaining = await db.getPendingSyncItems();
        expect(remaining, hasLength(1));
        expect(remaining.first.eventId, 'evt-during');
        expect(service.pendingCount.value, 1);

        service.onClose();
      },
    );

    test(
      'flushPendingQueue returns Right(0) without calling handler when queue is empty',
      () async {
        var called = false;
        final service = OfflineSyncService(
          database: db,
          syncHandler: (_) async {
            called = true;
            return const Right(null);
          },
        );
        await service.init();

        final result = await service.flushPendingQueue();
        expect(result.isRight(), isTrue);
        expect(result.getOrElse(() => -1), 0);
        expect(called, isFalse);

        service.onClose();
      },
    );

    test(
      'concurrent flushPendingQueue calls share one in-flight handler invocation',
      () async {
        final gate = Completer<Either<ErrorResponse, void>>();
        var handlerCalls = 0;

        final service = OfflineSyncService(
          database: db,
          syncHandler: (_) {
            handlerCalls++;
            return gate.future;
          },
        );
        await service.init();
        await service.enqueueLessonComplete(
          offlineEventId: 'evt-concurrent',
          topicId: 'topic-1',
        );

        final first = service.flushPendingQueue();
        final second = service.flushPendingQueue();

        gate.complete(const Right(null));
        final results = await Future.wait([first, second]);

        expect(handlerCalls, 1);
        expect(results[0].getOrElse(() => -1), 1);
        expect(results[1].getOrElse(() => -1), 1);

        service.onClose();
      },
    );

    test(
      'flushPendingQueue catches unexpected handler exceptions and preserves queue rows',
      () async {
        final service = OfflineSyncService(
          database: db,
          syncHandler: (_) async => throw StateError('unexpected failure'),
        );
        await service.init();
        await service.enqueuePracticeAttempt(
          offlineEventId: 'evt-throw',
          questionId: 'q-1',
          isCorrect: true,
        );

        final result = await service.flushPendingQueue();
        expect(result.isLeft(), isTrue);
        expect(service.pendingCount.value, 1);

        final rows = await db.getPendingSyncItems();
        expect(rows, hasLength(1));
        expect(rows.first.retryCount, 1);
        expect(rows.first.lastError, contains('unexpected failure'));

        service.onClose();
      },
    );

    test(
      'flushPendingQueue returns Left without deleting rows when syncHandler is unset, and succeeds once set',
      () async {
        final service = OfflineSyncService(database: db);
        await service.init();
        await service.enqueueLessonComplete(
          offlineEventId: 'evt-late-wire',
          topicId: 'topic-7',
        );

        final missingHandlerResult = await service.flushPendingQueue();
        expect(missingHandlerResult.isLeft(), isTrue);
        expect(service.pendingCount.value, 1);

        service.setSyncHandler((_) async => const Right(null));
        final wiredResult = await service.flushPendingQueue();
        expect(wiredResult.getOrElse(() => -1), 1);
        expect(service.pendingCount.value, 0);

        service.onClose();
      },
    );

    test(
      'quarantines malformed JSON and unknown eventType rows without blocking valid rows',
      () async {
        OfflineSyncPayload? captured;
        final service = OfflineSyncService(
          database: db,
          syncHandler: (payload) async {
            captured = payload;
            return const Right(null);
          },
        );
        await service.init();

        await db.enqueueSyncItem(
          eventId: 'bad-json',
          eventType: OfflineSyncService.typeLessonComplete,
          payloadJson: '{corrupt-json',
        );
        await db.enqueueSyncItem(
          eventId: 'unknown-type',
          eventType: 'future_event_type',
          payloadJson: '{"foo":"bar"}',
        );
        await service.enqueueLessonComplete(
          offlineEventId: 'good-lesson',
          topicId: 'topic-ok',
        );

        final result = await service.flushPendingQueue();
        expect(result.isRight(), isTrue);
        expect(result.getOrElse(() => -1), 1);
        expect(captured?.lessonCompletes, hasLength(1));
        expect(captured?.lessonCompletes.first.offlineEventId, 'good-lesson');

        final remaining = await db.getPendingSyncItems();
        expect(remaining.map((r) => r.eventId).toList(), [
          'bad-json',
          'unknown-type',
        ]);
        expect(remaining.every((r) => r.retryCount == 1), isTrue);
        expect(remaining.every((r) => r.lastError != null), isTrue);
        expect(service.pendingCount.value, 2);

        // Invalid-only flush returns Left without invoking syncHandler
        var handlerInvoked = false;
        service.setSyncHandler((_) async {
          handlerInvoked = true;
          return const Right(null);
        });
        final invalidOnlyResult = await service.flushPendingQueue();
        expect(invalidOnlyResult.isLeft(), isTrue);
        expect(handlerInvoked, isFalse);

        service.onClose();
      },
    );

    test(
      'flushes SyncQueue in bounded batches of maxBatchSize and stops cleanly on batch failure',
      () async {
        final batchSizes = <int>[];
        var batchNumber = 0;
        final service = OfflineSyncService(
          database: db,
          syncHandler: (payload) async {
            batchNumber++;
            batchSizes.add(payload.lessonCompletes.length);
            if (batchNumber == 2) {
              return Left(
                ErrorResponse.byErrorType(
                  errorType: ApiResponseErrorType.serverError,
                ),
              );
            }
            return const Right(null);
          },
        );
        await service.init();

        for (var i = 0; i < 125; i++) {
          await service.enqueueLessonComplete(topicId: 'topic-$i');
        }

        // Verify unique generated event IDs
        final allBefore = await db.getPendingSyncItems();
        expect(allBefore.map((e) => e.eventId).toSet(), hasLength(125));

        final result = await service.flushPendingQueue();
        expect(result.isLeft(), isTrue);
        expect(batchSizes, [100, 25]);

        // First 100 deleted; remaining 25 preserved with retryCount == 1
        final remaining = await db.getPendingSyncItems();
        expect(remaining, hasLength(25));
        expect(remaining.every((r) => r.retryCount == 1), isTrue);
        expect(service.pendingCount.value, 25);

        service.onClose();
      },
    );

    test('clamps negative exam durationSeconds to zero', () async {
      OfflineSyncPayload? captured;
      final service = OfflineSyncService(
        database: db,
        syncHandler: (payload) async {
          captured = payload;
          return const Right(null);
        },
      );
      await service.init();

      await service.enqueueExamSubmission(
        offlineSessionId: 'exam-neg-duration',
        subjectId: 'sub-1',
        durationSeconds: -42,
        answers: const [
          OfflineExamAnswerItem(questionId: 'q1', selectedOptionId: 'a'),
        ],
      );

      final result = await service.flushPendingQueue();
      expect(result.isRight(), isTrue);
      expect(captured?.examSubmissions.first.durationSeconds, 0);
      expect(
        captured?.toJson()['examSubmissions'][0]['durationSeconds'],
        0,
      );

      service.onClose();
    });
  });
}
