import 'dart:async';
import 'dart:convert';

import 'package:common/common.dart';
import 'package:drift/native.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:get/get.dart';
import 'package:mocktail/mocktail.dart';
import 'package:network/network.dart';
import 'package:porhi/app/env.dart';
import 'package:porhi/core/database/app_database.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/core/sync/offline_sync_service.dart';
import 'package:porhi/core/theme/porhi_theme.dart';
import 'package:porhi/features/auth/domain/entities/auth_user_entity.dart';
import 'package:porhi/features/auth/domain/repositories/auth_repository.dart';
import 'package:porhi/features/auth/domain/usecases/auth_usecases.dart';
import 'package:porhi/features/content_report/domain/entities/content_report_entity.dart';
import 'package:porhi/features/content_report/domain/repositories/content_report_repository.dart';
import 'package:porhi/features/content_report/domain/usecases/content_report_usecases.dart';
import 'package:porhi/features/content_report/presentation/report_sheet/report_content_sheet.dart';
import 'package:porhi/features/curriculum/domain/entities/curriculum_entities.dart';
import 'package:porhi/features/curriculum/domain/repositories/curriculum_repository.dart';
import 'package:porhi/features/curriculum/domain/usecases/curriculum_usecases.dart';
import 'package:porhi/features/curriculum/presentation/curriculum/binding/curriculum_binding.dart';
import 'package:porhi/features/curriculum/presentation/curriculum/view/chapter_index_view.dart';
import 'package:porhi/features/dashboard/domain/repositories/student_repository.dart';
import 'package:porhi/features/dashboard/domain/usecases/student_usecases.dart';
import 'package:porhi/features/exam/data/datasources/exam_local_datasource.dart';
import 'package:porhi/features/exam/data/datasources/exam_remote_datasource.dart';
import 'package:porhi/features/exam/data/models/exam_models.dart';
import 'package:porhi/features/exam/data/repositories/exam_repository_impl.dart';
import 'package:porhi/features/exam/domain/entities/exam_entities.dart';
import 'package:porhi/features/exam/domain/repositories/exam_repository.dart';
import 'package:porhi/features/exam/domain/usecases/exam_usecases.dart';
import 'package:porhi/features/exam/presentation/exam_result/binding/exam_result_binding.dart';
import 'package:porhi/features/exam/presentation/exam_result/controller/exam_result_controller.dart';
import 'package:porhi/features/exam/presentation/exam_result/view/exam_result_view.dart';
import 'package:porhi/features/exam/presentation/exam_runner/binding/exam_runner_binding.dart';
import 'package:porhi/features/exam/presentation/exam_runner/controller/exam_runner_controller.dart';
import 'package:porhi/features/exam/presentation/exam_runner/view/exam_runner_view.dart';
import 'package:porhi/features/exam/presentation/exam_setup/binding/exam_setup_binding.dart';
import 'package:porhi/features/exam/presentation/exam_setup/controller/exam_setup_controller.dart';
import 'package:porhi/features/exam/presentation/exam_setup/view/exam_setup_view.dart';
import 'package:porhi/features/practice/domain/entities/practice_entities.dart';
import 'package:porhi/routes/app_pages.dart';
import 'package:porhi/routes/app_routes.dart';

class _MockExamRemoteDataSource extends Mock implements ExamRemoteDataSource {}

class _MockExamRepository extends Mock implements ExamRepository {}

class _MockCurriculumRepository extends Mock implements CurriculumRepository {}

class _MockStudentRepository extends Mock implements StudentRepository {}

class _MockAuthRepository extends Mock implements AuthRepository {}

class _MockContentReportRepository extends Mock
    implements ContentReportRepository {}

Map<String, dynamic> _sampleExamQuestionJson({
  String id = 'eq_1',
  String topicId = 'top_motion_1',
  String correctOptId = 'opt_a',
  bool includeAnswerKey = true,
  bool includeExplanation = true,
}) {
  return <String, dynamic>{
    'id': id,
    'topicId': topicId,
    'type': 'MCQ',
    'stem': 'বেগের মাত্রা কোনটি? ($id)',
    'options': <Map<String, dynamic>>[
      <String, dynamic>{
        'id': 'opt_a',
        'text': r'$[LT^{-1}]$',
        if (includeAnswerKey) 'isCorrect': correctOptId == 'opt_a',
      },
      <String, dynamic>{
        'id': 'opt_b',
        'text': r'$[LT^{-2}]$',
        if (includeAnswerKey) 'isCorrect': correctOptId == 'opt_b',
      },
      <String, dynamic>{
        'id': 'opt_c',
        'text': r'$[MLT^{-2}]$',
        if (includeAnswerKey) 'isCorrect': correctOptId == 'opt_c',
      },
      <String, dynamic>{
        'id': 'opt_d',
        'text': r'$[L^2T^{-1}]$',
        if (includeAnswerKey) 'isCorrect': correctOptId == 'opt_d',
      },
    ],
    if (includeExplanation)
      'explanation': <String, dynamic>{
        'directAnswer': 'সঠিক উত্তর (ক) [LT^-1]।',
        'coreConcept': 'বেগ = সরণ / সময়।',
        'stepDerivation': r'$$[v] = \frac{[L]}{[T]} = [LT^{-1}]$$',
        'distractorAnalysis': <String, dynamic>{
          'খ': 'ত্বরণের মাত্রা।',
        },
        'textbookCitation': <String, dynamic>{
          'bookTitle': 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি)',
          'chapterName': 'দ্বিতীয় অধ্যায়: গতি',
          'pageNumber': 42,
        },
        'proTipShortcut': 'সরণকে সময় দিয়ে ভাগ করো।',
      },
    'difficulty': 'MEDIUM',
    'boardSource': 'ঢাকা বোর্ড ২০২৪',
  };
}

List<ExamQuestionEntity> _sampleQuestions({int count = 3}) {
  return List<ExamQuestionEntity>.generate(count, (i) {
    final idx = i + 1;
    return ExamQuestionEntity(
      id: 'eq_$idx',
      topicId: 'top_$idx',
      stem: 'প্রশ্ন $idx: নিচের কোনটি সঠিক?',
      options: const <ExamOptionEntity>[
        ExamOptionEntity(id: 'opt_a', text: 'উত্তর ক', isCorrect: true),
        ExamOptionEntity(id: 'opt_b', text: 'উত্তর খ', isCorrect: false),
        ExamOptionEntity(id: 'opt_c', text: 'উত্তর গ', isCorrect: false),
        ExamOptionEntity(id: 'opt_d', text: 'উত্তর ঘ', isCorrect: false),
      ],
      explanation: ExplanationLayersEntity(
        directAnswer: 'সঠিক উত্তর (ক) প্রশ্ন $idx।',
        coreConcept: 'মূল ধারণা $idx।',
      ),
    );
  });
}

Future<void> _seedCachedQuestions(
  AppDatabase db, {
  required String chapterId,
  required String subjectId,
  required List<Map<String, dynamic>> questions,
}) async {
  final now = DateTime.now().toUtc();
  await db.upsertDownloadedChapter(
    id: chapterId,
    subjectId: subjectId,
    titleBangla: 'অধ্যায় $chapterId',
    questionCount: questions.length,
    downloadedAt: now,
  );
  await db.upsertCachedQuestions(
    questions
        .map(
          (q) => CachedQuestionInput(
            id: q['id'] as String,
            topicId: q['topicId'] as String?,
            chapterId: chapterId,
            subjectId: subjectId,
            questionType: 'MCQ',
            difficulty: q['difficulty'] as String?,
            payloadJson: jsonEncode(q),
            updatedAt: now,
          ),
        )
        .toList(),
  );
}

void main() {
  setUpAll(() {
    registerFallbackValue(ExamTestType.chapterTest);
    registerFallbackValue(
      const ExamDraftEntity(
        sessionId: 'fallback',
        subjectId: 'sub_1',
        testType: ExamTestType.chapterTest,
        questionIds: <String>[],
        answers: <String, String?>{},
        flaggedQuestionIds: <String>[],
        remainingSeconds: 600,
        totalDurationSeconds: 600,
        currentIndex: 0,
      ),
    );
    registerFallbackValue(const <ExamAnswerInputEntity>[]);
    registerFallbackValue(const <ExamQuestionEntity>[]);
    registerFallbackValue(ReportContentType.question);
    registerFallbackValue(ReportCategory.wrongAnswer);
  });

  group('StartExamUseCase validation bounds', () {
    late _MockExamRepository mockRepo;
    late StartExamUseCase useCase;

    setUp(() {
      mockRepo = _MockExamRepository();
      useCase = StartExamUseCase(mockRepo);
      when(
        () => mockRepo.startExam(
          testType: any(named: 'testType'),
          subjectId: any(named: 'subjectId'),
          chapterId: any(named: 'chapterId'),
          topicId: any(named: 'topicId'),
          questionLimit: any(named: 'questionLimit'),
          negativeRatio: any(named: 'negativeRatio'),
          durationSeconds: any(named: 'durationSeconds'),
        ),
      ).thenAnswer(
        (_) async => Right(
          ExamSessionStartEntity(
            sessionId: 'sess_ok',
            testType: ExamTestType.chapterTest,
            subjectId: 'sub_1',
            chapterId: 'chap_1',
            totalQuestions: 3,
            durationSeconds: 600,
            negativeRatio: 0.25,
            questions: _sampleQuestions(),
          ),
        ),
      );
    });

    test('rejects empty subjectId', () async {
      final res = await useCase(
        testType: ExamTestType.chapterTest,
        subjectId: '   ',
        chapterId: 'chap_1',
      );
      expect(res.isLeft(), isTrue);
      verifyNever(
        () => mockRepo.startExam(
          testType: any(named: 'testType'),
          subjectId: any(named: 'subjectId'),
          chapterId: any(named: 'chapterId'),
          topicId: any(named: 'topicId'),
          questionLimit: any(named: 'questionLimit'),
          negativeRatio: any(named: 'negativeRatio'),
          durationSeconds: any(named: 'durationSeconds'),
        ),
      );
    });

    test('rejects missing chapterId unless testType is SUBJECT_TEST', () async {
      final resChapter = await useCase(
        testType: ExamTestType.chapterTest,
        subjectId: 'sub_1',
        chapterId: '',
      );
      expect(resChapter.isLeft(), isTrue);

      final resSubject = await useCase(
        testType: ExamTestType.subjectTest,
        subjectId: 'sub_1',
        chapterId: null,
      );
      expect(resSubject.isRight(), isTrue);
    });

    test('enforces negativeRatio 0..1.0, durationSeconds 60..7200, questionLimit 1..100', () async {
      expect(
        (await useCase(
          testType: ExamTestType.chapterTest,
          subjectId: 'sub_1',
          chapterId: 'chap_1',
          negativeRatio: -0.1,
        ))
            .isLeft(),
        isTrue,
      );
      expect(
        (await useCase(
          testType: ExamTestType.chapterTest,
          subjectId: 'sub_1',
          chapterId: 'chap_1',
          negativeRatio: 1.25,
        ))
            .isLeft(),
        isTrue,
      );
      expect(
        (await useCase(
          testType: ExamTestType.chapterTest,
          subjectId: 'sub_1',
          chapterId: 'chap_1',
          durationSeconds: 59,
        ))
            .isLeft(),
        isTrue,
      );
      expect(
        (await useCase(
          testType: ExamTestType.chapterTest,
          subjectId: 'sub_1',
          chapterId: 'chap_1',
          durationSeconds: 7201,
        ))
            .isLeft(),
        isTrue,
      );
      expect(
        (await useCase(
          testType: ExamTestType.chapterTest,
          subjectId: 'sub_1',
          chapterId: 'chap_1',
          questionLimit: 0,
        ))
            .isLeft(),
        isTrue,
      );
      expect(
        (await useCase(
          testType: ExamTestType.chapterTest,
          subjectId: 'sub_1',
          chapterId: 'chap_1',
          questionLimit: 101,
        ))
            .isLeft(),
        isTrue,
      );

      final valid = await useCase(
        testType: ExamTestType.chapterTest,
        subjectId: 'sub_1',
        chapterId: 'chap_1',
        negativeRatio: 1.0,
        durationSeconds: 7200,
        questionLimit: 100,
      );
      expect(valid.isRight(), isTrue);
    });
  });

  group('ExamModels JSON parsing', () {
    test('ExamSessionStartModel and ExamSessionDetailModel parse server payloads', () {
      final start = ExamSessionStartModel.fromJson(<String, dynamic>{
        'json': <String, dynamic>{
          'sessionId': 'sess_123',
          'totalQuestions': 2,
          'durationSeconds': 600,
          'negativeRatio': 0.25,
          'questions': <Map<String, dynamic>>[
            _sampleExamQuestionJson(id: 'q_1', includeAnswerKey: false),
            _sampleExamQuestionJson(id: 'q_2', includeAnswerKey: false),
          ],
        },
      });
      expect(start.sessionId, 'sess_123');
      expect(start.totalQuestions, 2);
      expect(start.questions.length, 2);
      expect(start.questions.first.options.length, 4);

      final completed = ExamSessionDetailModel.fromJson(<String, dynamic>{
        'sessionId': 'sess_123',
        'status': 'COMPLETED',
        'testType': 'CHAPTER_TEST',
        'subjectId': 'sub_ssc_physics',
        'chapterId': 'chap_ssc_physics_ch2',
        'score': 7.5,
        'totalQuestions': 10,
        'correctCount': 8,
        'wrongCount': 2,
        'skippedCount': 0,
        'durationSeconds': 600,
        'negativeRatio': 0.25,
        'negativeDeduction': 0.5,
        'percentile': 88,
        'answersWithExplanation': <Map<String, dynamic>>[
          <String, dynamic>{
            'questionId': 'q_1',
            'topicId': 'top_1',
            'stem': 'প্রশ্ন ১',
            'options': <Map<String, dynamic>>[
              <String, dynamic>{'id': 'opt_a', 'text': 'ক'},
              <String, dynamic>{'id': 'opt_b', 'text': 'খ'},
            ],
            'selectedOptionId': 'opt_a',
            'correctOptionId': 'opt_a',
            'isCorrect': true,
            'explanation': <String, dynamic>{
              'directAnswer': 'উত্তর ক',
              'coreConcept': 'ব্যাখ্যা',
            },
            'timeSpent': 12,
          },
        ],
      });
      final entity = completed.toResultEntity();
      expect(entity.status, 'COMPLETED');
      expect(entity.score, 7.5);
      expect(entity.negativeDeduction, 0.5);
      expect(entity.percentile, 88);
      expect(entity.answersWithExplanation.single.explanation?.directAnswer, 'উত্তর ক');
    });
  });

  group('ActiveExamDrafts & ExamRepositoryImpl (Online + Offline)', () {
    late AppDatabase db;
    late OfflineSyncService syncService;
    late _MockExamRemoteDataSource remoteDataSource;
    late ExamLocalDataSource localDataSource;
    late ExamRepositoryImpl repository;

    setUp(() async {
      db = AppDatabase(NativeDatabase.memory());
      syncService = OfflineSyncService(database: db);
      await syncService.init();
      remoteDataSource = _MockExamRemoteDataSource();
      localDataSource = ExamLocalDataSourceImpl(database: db);
      repository = ExamRepositoryImpl(
        remoteDataSource: remoteDataSource,
        localDataSource: localDataSource,
        offlineSyncService: syncService,
      );
    });

    tearDown(() async {
      syncService.onClose();
      await db.close();
    });

    test('ActiveExamDrafts upsert, getLatest, resume restoration, and delete on submit', () async {
      await _seedCachedQuestions(
        db,
        chapterId: 'chap_1',
        subjectId: 'sub_1',
        questions: <Map<String, dynamic>>[
          _sampleExamQuestionJson(id: 'q_1'),
          _sampleExamQuestionJson(id: 'q_2'),
          _sampleExamQuestionJson(id: 'q_3'),
        ],
      );

      final draft = ExamDraftEntity(
        sessionId: 'offline_exam_1001',
        subjectId: 'sub_1',
        chapterId: 'chap_1',
        testType: ExamTestType.chapterTest,
        questionIds: const <String>['q_3', 'q_1', 'q_2'],
        answers: const <String, String?>{'q_3': 'opt_a', 'q_1': 'opt_b'},
        flaggedQuestionIds: const <String>['q_2'],
        remainingSeconds: 412,
        totalDurationSeconds: 600,
        currentIndex: 1,
        startedAt: DateTime.utc(2026, 11, 12, 10, 0),
        updatedAt: DateTime.utc(2026, 11, 12, 10, 3),
      );

      await repository.saveExamDraft(draft);
      final fetched = await repository.getLatestExamDraft();
      expect(fetched, isNotNull);
      expect(fetched!.sessionId, 'offline_exam_1001');
      expect(fetched.questionIds, <String>['q_3', 'q_1', 'q_2']);
      expect(fetched.answers, <String, String?>{'q_3': 'opt_a', 'q_1': 'opt_b'});
      expect(fetched.flaggedQuestionIds, <String>['q_2']);
      expect(fetched.remainingSeconds, 412);
      expect(fetched.currentIndex, 1);

      final resumeRes = await repository.getResumeSessionData(fetched);
      final resumed = (resumeRes as Right<ErrorResponse, ExamResumeDataEntity>).value;
      expect(resumed.completedResult, isNull);
      expect(resumed.session!.questions.map((q) => q.id).toList(), <String>[
        'q_3',
        'q_1',
        'q_2',
      ]);
      expect(resumed.remainingSeconds, 412);
      expect(resumed.currentIndex, 1);
      expect(resumed.flaggedQuestionIds, <String>['q_2']);
      expect(resumed.answers['q_3'], 'opt_a');

      final submitRes = await repository.submitExam(
        sessionId: 'offline_exam_1001',
        answers: const <ExamAnswerInputEntity>[
          ExamAnswerInputEntity(questionId: 'q_3', selectedOptionId: 'opt_a', timeSpent: 10),
          ExamAnswerInputEntity(questionId: 'q_1', selectedOptionId: 'opt_b', timeSpent: 15),
          ExamAnswerInputEntity(questionId: 'q_2', selectedOptionId: null, timeSpent: 5),
        ],
        subjectId: 'sub_1',
        chapterId: 'chap_1',
        testType: ExamTestType.chapterTest,
        durationSeconds: 600,
        negativeRatio: 0.25,
        isOfflineSession: true,
        questions: resumed.session!.questions,
      );
      expect(submitRes.isRight(), isTrue);
      expect(await repository.getLatestExamDraft(), isNull);
    });

    test('offline startExam builds session from CachedQuestions for chapter & subject tests', () async {
      await _seedCachedQuestions(
        db,
        chapterId: 'chap_1',
        subjectId: 'sub_phys',
        questions: <Map<String, dynamic>>[
          _sampleExamQuestionJson(id: 'q_c1', topicId: 'top_1'),
          _sampleExamQuestionJson(id: 'q_c2', topicId: 'top_2'),
        ],
      );
      await _seedCachedQuestions(
        db,
        chapterId: 'chap_2',
        subjectId: 'sub_phys',
        questions: <Map<String, dynamic>>[
          _sampleExamQuestionJson(id: 'q_c3', topicId: 'top_3'),
        ],
      );

      when(
        () => remoteDataSource.startExam(
          testType: any(named: 'testType'),
          subjectId: any(named: 'subjectId'),
          chapterId: any(named: 'chapterId'),
          topicId: any(named: 'topicId'),
          questionLimit: any(named: 'questionLimit'),
          negativeRatio: any(named: 'negativeRatio'),
          durationSeconds: any(named: 'durationSeconds'),
        ),
      ).thenAnswer(
        (_) async => Left(
          ErrorResponse(
            message: 'No internet',
            data: ApiResponseErrorType.noInternet,
          ),
        ),
      );

      final topicRes = await repository.startExam(
        testType: ExamTestType.topicTest,
        subjectId: 'sub_phys',
        chapterId: 'chap_1',
        topicId: 'top_2',
        questionLimit: 5,
        negativeRatio: 0.5,
        durationSeconds: 300,
      );
      final topicSession =
          (topicRes as Right<ErrorResponse, ExamSessionStartEntity>).value;
      expect(topicSession.isOfflineSession, isTrue);
      expect(topicSession.sessionId, startsWith('offline_exam_'));
      expect(topicSession.questions.map((q) => q.id).toList(), <String>['q_c2']);

      final subjRes = await repository.startExam(
        testType: ExamTestType.subjectTest,
        subjectId: 'sub_phys',
        questionLimit: 2,
        negativeRatio: 0.25,
        durationSeconds: 600,
      );
      final subjSession =
          (subjRes as Right<ErrorResponse, ExamSessionStartEntity>).value;
      expect(subjSession.isOfflineSession, isTrue);
      expect(subjSession.questions.length, 2);
    });

    test('offline submitExam grades with negativeRatio, clamps >= 0, enqueues SyncQueue, and reloads offline result', () async {
      await _seedCachedQuestions(
        db,
        chapterId: 'chap_1',
        subjectId: 'sub_phys',
        questions: <Map<String, dynamic>>[
          _sampleExamQuestionJson(id: 'q_1', correctOptId: 'opt_a'),
          _sampleExamQuestionJson(id: 'q_2', correctOptId: 'opt_a'),
          _sampleExamQuestionJson(id: 'q_3', correctOptId: 'opt_a'),
          _sampleExamQuestionJson(id: 'q_4', correctOptId: 'opt_a'),
        ],
      );

      final cachedQs = <ExamQuestionEntity>[
        for (var i = 1; i <= 4; i++)
          ExamQuestionEntity(
            id: 'q_$i',
            topicId: 'top_$i',
            stem: 'প্রশ্ন $i',
            options: const <ExamOptionEntity>[
              ExamOptionEntity(id: 'opt_a', text: 'ক', isCorrect: true),
              ExamOptionEntity(id: 'opt_b', text: 'খ', isCorrect: false),
              ExamOptionEntity(id: 'opt_c', text: 'গ', isCorrect: false),
              ExamOptionEntity(id: 'opt_d', text: 'ঘ', isCorrect: false),
            ],
            explanation: ExplanationLayersEntity(
              directAnswer: 'সঠিক উত্তর (ক) $i',
            ),
          ),
      ];
      final res = await repository.submitExam(
        sessionId: 'offline_exam_999',
        answers: const <ExamAnswerInputEntity>[
          ExamAnswerInputEntity(questionId: 'q_1', selectedOptionId: 'opt_a', timeSpent: 12), // correct
          ExamAnswerInputEntity(questionId: 'q_2', selectedOptionId: 'opt_b', timeSpent: 8), // wrong
          ExamAnswerInputEntity(questionId: 'q_3', selectedOptionId: 'opt_c', timeSpent: 9), // wrong
          ExamAnswerInputEntity(questionId: 'q_4', selectedOptionId: null, timeSpent: 4), // skipped
        ],
        subjectId: 'sub_phys',
        chapterId: 'chap_1',
        testType: ExamTestType.chapterTest,
        durationSeconds: 600,
        negativeRatio: 0.25,
        isOfflineSession: true,
        questions: cachedQs,
      );

      final result = (res as Right<ErrorResponse, ExamResultEntity>).value;
      expect(result.isQueuedOffline, isTrue);
      expect(result.correctCount, 1);
      expect(result.wrongCount, 2);
      expect(result.skippedCount, 1);
      expect(result.negativeDeduction, 0.5);
      expect(result.score, 0.5); // 1 - 2*0.25 = 0.5
      expect(result.answersWithExplanation.length, 4);
      expect(
        result.answersWithExplanation.first.explanation?.directAnswer,
        isNotEmpty,
      );

      // Verify SyncQueue entry matches OfflineExamSubmissionDto
      final pending = await db.getPendingSyncItems();
      expect(pending.length, 1);
      expect(pending.single.eventId, 'offline_exam_999');
      expect(pending.single.eventType, OfflineSyncService.typeExamSubmission);

      OfflineSyncPayload? capturedPayload;
      syncService.setSyncHandler((payload) async {
        capturedPayload = payload;
        return const Right(null);
      });
      final flush = await syncService.flushPendingQueue();
      expect(flush.isRight(), isTrue);
      expect(capturedPayload, isNotNull);
      expect(capturedPayload!.examSubmissions.length, 1);
      expect(capturedPayload!.examSubmissions.single.offlineSessionId, 'offline_exam_999');
      expect(capturedPayload!.examSubmissions.single.subjectId, 'sub_phys');
      expect(capturedPayload!.examSubmissions.single.answers.length, 4);

      // Reloading result by sessionId works offline
      final reloaded = await repository.getSession('offline_exam_999');
      final reloadedResult =
          (reloaded as Right<ErrorResponse, ExamResultEntity>).value;
      expect(reloadedResult.score, 0.5);
      expect(reloadedResult.isQueuedOffline, isTrue);

      // Score clamping >= 0 when wrong * negativeRatio > correct
      final clampRes = await repository.submitExam(
        sessionId: 'offline_exam_clamp',
        answers: const <ExamAnswerInputEntity>[
          ExamAnswerInputEntity(questionId: 'q_1', selectedOptionId: 'opt_b'),
          ExamAnswerInputEntity(questionId: 'q_2', selectedOptionId: 'opt_b'),
        ],
        subjectId: 'sub_phys',
        chapterId: 'chap_1',
        testType: ExamTestType.chapterTest,
        durationSeconds: 300,
        negativeRatio: 0.5,
        isOfflineSession: true,
        questions: cachedQs.take(2).toList(),
      );
      final clampedResult =
          (clampRes as Right<ErrorResponse, ExamResultEntity>).value;
      expect(clampedResult.score, 0.0);
    });

    test('online submitExam returns server percentile & deletes draft', () async {
      await repository.saveExamDraft(
        const ExamDraftEntity(
          sessionId: 'sess_online_1',
          subjectId: 'sub_phys',
          chapterId: 'chap_1',
          testType: ExamTestType.chapterTest,
          questionIds: <String>['q_1'],
          answers: <String, String?>{'q_1': 'opt_a'},
          flaggedQuestionIds: <String>[],
          remainingSeconds: 120,
          totalDurationSeconds: 600,
          currentIndex: 0,
        ),
      );

      when(
        () => remoteDataSource.submitExam(
          sessionId: 'sess_online_1',
          answers: any(named: 'answers'),
        ),
      ).thenAnswer(
        (_) async => Right(
          ExamSubmitResponseModel.fromJson(<String, dynamic>{
            'score': 1.0,
            'totalQuestions': 1,
            'correctCount': 1,
            'wrongCount': 0,
            'skippedCount': 0,
            'durationSeconds': 600,
            'negativeRatio': 0.25,
            'negativeDeduction': 0.0,
            'percentile': 94,
            'answersWithExplanation': <Map<String, dynamic>>[
              <String, dynamic>{
                'questionId': 'q_1',
                'stem': 'প্রশ্ন ১',
                'options': <Map<String, dynamic>>[
                  <String, dynamic>{'id': 'opt_a', 'text': 'ক'},
                ],
                'selectedOptionId': 'opt_a',
                'correctOptionId': 'opt_a',
                'isCorrect': true,
                'explanation': <String, dynamic>{
                  'directAnswer': 'উত্তর ক',
                },
                'timeSpent': 7,
              },
            ],
          }),
        ),
      );

      final res = await repository.submitExam(
        sessionId: 'sess_online_1',
        answers: const <ExamAnswerInputEntity>[
          ExamAnswerInputEntity(questionId: 'q_1', selectedOptionId: 'opt_a', timeSpent: 7),
        ],
        subjectId: 'sub_phys',
        chapterId: 'chap_1',
        testType: ExamTestType.chapterTest,
        durationSeconds: 600,
        negativeRatio: 0.25,
        isOfflineSession: false,
      );

      final onlineResult =
          (res as Right<ErrorResponse, ExamResultEntity>).value;
      expect(onlineResult.isQueuedOffline, isFalse);
      expect(onlineResult.percentile, 94);
      expect(await repository.getExamDraft('sess_online_1'), isNull);
    });
  });

  group('ExamRunnerController timer, autosave, auto-submit guard & disposal', () {
    late _MockExamRepository mockRepo;

    setUp(() {
      Get.testMode = true;
      mockRepo = _MockExamRepository();
      when(() => mockRepo.saveExamDraft(any())).thenAnswer((_) async {});
      when(() => mockRepo.deleteExamDraft(any())).thenAnswer((_) async {});
      when(
        () => mockRepo.sendHeartbeat(
          sessionId: any(named: 'sessionId'),
          answers: any(named: 'answers'),
        ),
      ).thenAnswer((_) async => const Right(null));
    });

    tearDown(() {
      Get.reset();
    });

    test('countdown ticks, auto-submits once at zero, prevents duplicate submit, and cancels timer in onClose', () async {
      final submitCompleter = Completer<Either<ErrorResponse, ExamResultEntity>>();
      var submitCallCount = 0;

      when(
        () => mockRepo.submitExam(
          sessionId: any(named: 'sessionId'),
          answers: any(named: 'answers'),
          subjectId: any(named: 'subjectId'),
          chapterId: any(named: 'chapterId'),
          testType: any(named: 'testType'),
          durationSeconds: any(named: 'durationSeconds'),
          negativeRatio: any(named: 'negativeRatio'),
          isOfflineSession: any(named: 'isOfflineSession'),
          questions: any(named: 'questions'),
        ),
      ).thenAnswer((_) {
        submitCallCount++;
        return submitCompleter.future;
      });

      final mockAuth = _MockAuthRepository();
      when(() => mockAuth.getLanguage()).thenReturn('bn');
      final controllerWithLang = ExamRunnerController(
        heartbeatExamUseCase: HeartbeatExamUseCase(mockRepo),
        submitExamUseCase: SubmitExamUseCase(mockRepo),
        saveExamDraftUseCase: SaveExamDraftUseCase(mockRepo),
        deleteExamDraftUseCase: DeleteExamDraftUseCase(mockRepo),
        getLanguageUseCase: GetLanguageUseCase(mockAuth),
        initialArgs: ExamRunnerArgs(
          session: ExamSessionStartEntity(
            sessionId: 'sess_timer',
            testType: ExamTestType.chapterTest,
            subjectId: 'sub_1',
            chapterId: 'chap_1',
            totalQuestions: 2,
            durationSeconds: 2,
            negativeRatio: 0.25,
            questions: _sampleQuestions(count: 2),
          ),
        ),
      );

      controllerWithLang.onInit();
      expect(controllerWithLang.remainingSeconds.value, 2);

      await Future<void>.delayed(const Duration(milliseconds: 2300));
      expect(controllerWithLang.remainingSeconds.value, 0);
      expect(submitCallCount, 1);

      // Calling submitExam manually while in flight must NOT trigger a second submit
      unawaited(controllerWithLang.submitExam());
      expect(submitCallCount, 1);

      submitCompleter.complete(
        const Right(
          ExamResultEntity(
            sessionId: 'sess_timer',
            status: 'COMPLETED',
            testType: ExamTestType.chapterTest,
            subjectId: 'sub_1',
            chapterId: 'chap_1',
            score: 1.0,
            totalQuestions: 2,
            correctCount: 1,
            wrongCount: 0,
            skippedCount: 1,
            durationSeconds: 2,
            negativeRatio: 0.25,
            negativeDeduction: 0.0,
          ),
        ),
      );
      await Future<void>.delayed(const Duration(milliseconds: 50));
      expect(controllerWithLang.isSubmitting.value, isFalse);

      controllerWithLang.onClose();
      expect(controllerWithLang.hasActiveTimer, isFalse);
    });
  });

  group('Exam UI, Routes & Widget Tests', () {
    late _MockExamRepository examRepo;
    late _MockCurriculumRepository curriculumRepo;
    late _MockStudentRepository studentRepo;
    late _MockAuthRepository authRepo;
    late _MockContentReportRepository contentReportRepo;

    setUp(() async {
      Get.reset();
      Get.testMode = true;
      await PorhiTheme.initCommon();

      examRepo = _MockExamRepository();
      curriculumRepo = _MockCurriculumRepository();
      studentRepo = _MockStudentRepository();
      authRepo = _MockAuthRepository();
      contentReportRepo = _MockContentReportRepository();

      when(() => authRepo.getLanguage()).thenReturn('bn');
      when(() => authRepo.getCachedUser()).thenReturn(
        const AuthUserEntity(
          id: 'u_1',
          fullName: 'Student',
          selectedClass: StudentTrack.ssc,
        ),
      );
      when(() => studentRepo.getActiveSubjectId(any())).thenReturn('sub_ssc_physics');
      when(() => curriculumRepo.getCachedSubjects(program: any(named: 'program')))
          .thenAnswer((_) async => const <SubjectEntity>[]);
      when(() => curriculumRepo.getCachedChapters(any())).thenAnswer(
        (_) async => const <ChapterEntity>[
          ChapterEntity(
            id: 'chap_ssc_physics_ch2',
            subjectId: 'sub_ssc_physics',
            orderIndex: 2,
            titleBangla: 'দ্বিতীয় অধ্যায়: গতি',
            topics: <TopicEntity>[
              TopicEntity(
                id: 'top_speed',
                chapterId: 'chap_ssc_physics_ch2',
                orderIndex: 1,
                titleBangla: 'বেগ ও ত্বরণ',
              ),
            ],
          ),
        ],
      );
      when(() => examRepo.getLatestExamDraft()).thenAnswer((_) async => null);
      when(() => examRepo.saveExamDraft(any())).thenAnswer((_) async {});
      when(() => examRepo.deleteExamDraft(any())).thenAnswer((_) async {});
      when(
        () => examRepo.sendHeartbeat(
          sessionId: any(named: 'sessionId'),
          answers: any(named: 'answers'),
        ),
      ).thenAnswer((_) async => const Right(null));
    });

    tearDown(() {
      Get.reset();
    });

    void registerDependencies() {
      Get.put<StartExamUseCase>(StartExamUseCase(examRepo));
      Get.put<HeartbeatExamUseCase>(HeartbeatExamUseCase(examRepo));
      Get.put<SubmitExamUseCase>(SubmitExamUseCase(examRepo));
      Get.put<GetExamSessionUseCase>(GetExamSessionUseCase(examRepo));
      Get.put<SaveExamDraftUseCase>(SaveExamDraftUseCase(examRepo));
      Get.put<GetLatestExamDraftUseCase>(GetLatestExamDraftUseCase(examRepo));
      Get.put<DeleteExamDraftUseCase>(DeleteExamDraftUseCase(examRepo));
      Get.put<ResumeExamSessionUseCase>(ResumeExamSessionUseCase(examRepo));
      Get.put<GetCachedChaptersUseCase>(GetCachedChaptersUseCase(curriculumRepo));
      Get.put<GetCachedSubjectsUseCase>(GetCachedSubjectsUseCase(curriculumRepo));
      Get.put<GetCachedUserUseCase>(GetCachedUserUseCase(authRepo));
      Get.put<GetLanguageUseCase>(GetLanguageUseCase(authRepo));
      Get.put<GetActiveSubjectIdUseCase>(GetActiveSubjectIdUseCase(studentRepo));
      Get.put<SubmitContentReportUseCase>(SubmitContentReportUseCase(contentReportRepo));
      Get.put<EnvConfig>(const EnvConfig());
    }

    test('AppPages registers /exam/setup, /exam/runner, /exam/result/:sessionId before /exam/:chapterId', () {
      final names = AppPages.routes.map((r) => r.name).toList();
      final setupIdx = names.indexOf(AppRoutes.examSetup);
      final runnerIdx = names.indexOf(AppRoutes.examRunner);
      final resultIdx = names.indexOf(AppRoutes.examResult);
      final chapterIdx = names.indexOf(AppRoutes.exam);

      expect(setupIdx, isNonNegative);
      expect(runnerIdx, isNonNegative);
      expect(resultIdx, isNonNegative);
      expect(chapterIdx, isNonNegative);
      expect(setupIdx, lessThan(chapterIdx));
      expect(runnerIdx, lessThan(chapterIdx));
      expect(resultIdx, lessThan(chapterIdx));
    });

    testWidgets('/exam/:chapterId prefills subject_<id> as SUBJECT_TEST and <chapterId> as CHAPTER_TEST', (tester) async {
      registerDependencies();

      await tester.pumpWidget(
        GetMaterialApp(
          theme: PorhiTheme.light,
          initialRoute: AppRoutes.examForChapter('subject_sub_ssc_physics'),
          getPages: AppPages.routes,
        ),
      );
      await tester.pumpAndSettle();

      final setupCtrl = Get.find<ExamSetupController>();
      expect(setupCtrl.testType.value, ExamTestType.subjectTest);
      expect(setupCtrl.subjectId.value, 'sub_ssc_physics');
      expect(setupCtrl.chapterId.value, isEmpty);

      // Navigate to chapter-specific route cleanly and verify CHAPTER_TEST prefill
      await tester.pumpWidget(const SizedBox.shrink());
      await tester.pumpAndSettle();
      Get.delete<ExamSetupController>(force: true);

      await tester.pumpWidget(
        GetMaterialApp(
          key: const Key('chapter_exam_app'),
          theme: PorhiTheme.light,
          initialRoute: AppRoutes.examForChapter('chap_ssc_physics_ch2'),
          getPages: AppPages.routes,
        ),
      );
      await tester.pumpAndSettle();

      final chapterSetupCtrl = Get.find<ExamSetupController>();
      expect(chapterSetupCtrl.testType.value, ExamTestType.chapterTest);
      expect(chapterSetupCtrl.chapterId.value, 'chap_ssc_physics_ch2');
      expect(chapterSetupCtrl.chapterTitle.value, 'দ্বিতীয় অধ্যায়: গতি');
    });

    testWidgets('ExamResultView renders percentile, ExplanationLayersCard, ReportContentSheet, and offline badge with zero 320dp overflow', (tester) async {
      tester.view.physicalSize = const Size(320, 640);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);

      when(() => examRepo.getSession('sess_res_1')).thenAnswer(
        (_) async => const Right(
          ExamResultEntity(
            sessionId: 'sess_res_1',
            status: 'COMPLETED',
            testType: ExamTestType.chapterTest,
            subjectId: 'sub_ssc_physics',
            chapterId: 'chap_ssc_physics_ch2',
            score: 0.75,
            totalQuestions: 2,
            correctCount: 1,
            wrongCount: 1,
            skippedCount: 0,
            durationSeconds: 600,
            negativeRatio: 0.25,
            negativeDeduction: 0.25,
            percentile: 86,
            isQueuedOffline: true,
            answersWithExplanation: <ExamReviewedAnswerEntity>[
              ExamReviewedAnswerEntity(
                questionId: 'eq_1',
                topicId: 'top_speed',
                stem: 'বেগের মাত্রা কোনটি?',
                options: <ExamOptionEntity>[
                  ExamOptionEntity(id: 'opt_a', text: r'$[LT^{-1}]$'),
                  ExamOptionEntity(id: 'opt_b', text: r'$[LT^{-2}]$'),
                ],
                selectedOptionId: 'opt_a',
                correctOptionId: 'opt_a',
                isCorrect: true,
                explanation: ExplanationLayersEntity(
                  directAnswer: 'সঠিক উত্তর (ক) [LT^-1]।',
                  coreConcept: 'বেগ হলো সরণের হার।',
                ),
                timeSpent: 15,
              ),
              ExamReviewedAnswerEntity(
                questionId: 'eq_2',
                topicId: 'top_speed',
                stem: 'ত্বরণের একক কী?',
                options: <ExamOptionEntity>[
                  ExamOptionEntity(id: 'opt_a', text: 'm/s'),
                  ExamOptionEntity(id: 'opt_b', text: 'm/s²'),
                ],
                selectedOptionId: 'opt_a',
                correctOptionId: 'opt_b',
                isCorrect: false,
                explanation: ExplanationLayersEntity(
                  directAnswer: 'সঠিক উত্তর (খ) m/s²।',
                ),
                timeSpent: 12,
              ),
            ],
          ),
        ),
      );

      registerDependencies();

      await tester.pumpWidget(
        MediaQuery(
          data: const MediaQueryData(
            size: Size(320, 640),
            textScaler: TextScaler.linear(1.25),
          ),
          child: GetMaterialApp(
            theme: PorhiTheme.light,
            initialRoute: AppRoutes.examResultForSession('sess_res_1'),
            getPages: AppPages.routes,
          ),
        ),
      );
      await tester.pumpAndSettle();

      expect(tester.takeException(), isNull);
      expect(find.byKey(const Key('exam_percentile_badge')), findsOneWidget);
      expect(find.byKey(const Key('exam_offline_queued_badge')), findsOneWidget);

      // Expand explanation for first reviewed question -> ExplanationLayersCard renders
      await tester.ensureVisible(find.byKey(const Key('exam_toggle_exp_eq_1')));
      await tester.tap(find.byKey(const Key('exam_toggle_exp_eq_1')));
      await tester.pumpAndSettle();

      expect(find.byKey(const Key('explanation_layers_card')), findsOneWidget);
      expect(find.textContaining('বেগ হলো সরণের হার'), findsOneWidget);
      expect(tester.takeException(), isNull);

      // ReportContentSheet opens cleanly
      await tester.ensureVisible(find.byKey(const Key('exam_report_q_eq_1')));
      await tester.tap(find.byKey(const Key('exam_report_q_eq_1')));
      await tester.pumpAndSettle();
      expect(find.byType(ReportContentSheet), findsOneWidget);
    });

    testWidgets('Full setup -> runner -> submit -> result flow & clean controller disposal on pop', (tester) async {
      final qs = _sampleQuestions(count: 2);
      when(
        () => examRepo.startExam(
          testType: any(named: 'testType'),
          subjectId: any(named: 'subjectId'),
          chapterId: any(named: 'chapterId'),
          topicId: any(named: 'topicId'),
          questionLimit: any(named: 'questionLimit'),
          negativeRatio: any(named: 'negativeRatio'),
          durationSeconds: any(named: 'durationSeconds'),
        ),
      ).thenAnswer(
        (_) async => Right(
          ExamSessionStartEntity(
            sessionId: 'sess_flow_1',
            testType: ExamTestType.chapterTest,
            subjectId: 'sub_ssc_physics',
            chapterId: 'chap_ssc_physics_ch2',
            totalQuestions: 2,
            durationSeconds: 600,
            negativeRatio: 0.25,
            questions: qs,
          ),
        ),
      );

      const completedResult = ExamResultEntity(
        sessionId: 'sess_flow_1',
        status: 'COMPLETED',
        testType: ExamTestType.chapterTest,
        subjectId: 'sub_ssc_physics',
        chapterId: 'chap_ssc_physics_ch2',
        score: 1.0,
        totalQuestions: 2,
        correctCount: 1,
        wrongCount: 0,
        skippedCount: 1,
        durationSeconds: 600,
        negativeRatio: 0.25,
        negativeDeduction: 0.0,
        percentile: 91,
        answersWithExplanation: <ExamReviewedAnswerEntity>[
          ExamReviewedAnswerEntity(
            questionId: 'eq_1',
            stem: 'প্রশ্ন 1',
            options: <ExamOptionEntity>[
              ExamOptionEntity(id: 'opt_a', text: 'উত্তর ক'),
            ],
            selectedOptionId: 'opt_a',
            correctOptionId: 'opt_a',
            isCorrect: true,
            explanation: ExplanationLayersEntity(directAnswer: 'সঠিক উত্তর (ক)'),
          ),
          ExamReviewedAnswerEntity(
            questionId: 'eq_2',
            stem: 'প্রশ্ন 2',
            options: <ExamOptionEntity>[
              ExamOptionEntity(id: 'opt_a', text: 'উত্তর ক'),
            ],
            selectedOptionId: null,
            correctOptionId: 'opt_a',
            isCorrect: false,
          ),
        ],
      );

      when(
        () => examRepo.submitExam(
          sessionId: 'sess_flow_1',
          answers: any(named: 'answers'),
          subjectId: any(named: 'subjectId'),
          chapterId: any(named: 'chapterId'),
          testType: any(named: 'testType'),
          durationSeconds: any(named: 'durationSeconds'),
          negativeRatio: any(named: 'negativeRatio'),
          isOfflineSession: false,
          questions: any(named: 'questions'),
        ),
      ).thenAnswer((_) async => const Right(completedResult));

      when(() => examRepo.getSession('sess_flow_1'))
          .thenAnswer((_) async => const Right(completedResult));

      registerDependencies();

      await tester.pumpWidget(
        GetMaterialApp(
          theme: PorhiTheme.light,
          initialRoute: AppRoutes.subjects,
          getPages: <GetPage<dynamic>>[
            GetPage(
              name: AppRoutes.subjects,
              page: () => Scaffold(
                body: Center(
                  child: ElevatedButton(
                    key: const Key('open_exam_btn'),
                    onPressed: () => Get.toNamed(
                      AppRoutes.examForChapter('chap_ssc_physics_ch2'),
                    ),
                    child: const Text('Open Exam'),
                  ),
                ),
              ),
            ),
            GetPage(
              name: AppRoutes.examSetup,
              page: () => const ExamSetupView(),
              binding: ExamSetupBinding(),
            ),
            GetPage(
              name: AppRoutes.examRunner,
              page: () => const ExamRunnerView(),
              binding: ExamRunnerBinding(),
            ),
            GetPage(
              name: AppRoutes.examResult,
              page: () => const ExamResultView(),
              binding: ExamResultBinding(),
            ),
            GetPage(
              name: AppRoutes.exam,
              page: () => const ExamSetupView(),
              binding: ExamSetupBinding(),
            ),
          ],
        ),
      );
      await tester.pumpAndSettle();

      // Open setup
      await tester.tap(find.byKey(const Key('open_exam_btn')));
      await tester.pumpAndSettle();
      expect(Get.isRegistered<ExamSetupController>(), isTrue);

      // Start exam
      await tester.ensureVisible(find.byKey(const Key('exam_start_btn')));
      await tester.tap(find.byKey(const Key('exam_start_btn')));
      await tester.pumpAndSettle();
      expect(Get.isRegistered<ExamRunnerController>(), isTrue);

      // Select option on q1 and flag
      await tester.ensureVisible(find.byKey(const Key('exam_option_opt_a')));
      await tester.tap(find.byKey(const Key('exam_option_opt_a')));
      await tester.pump();
      await tester.tap(find.byKey(const Key('exam_flag_btn')));
      await tester.pump();

      // Open submit dialog and confirm
      await tester.tap(find.byKey(const Key('exam_submit_btn')));
      await tester.pumpAndSettle();
      await tester.tap(find.byKey(const Key('exam_confirm_submit_btn')));
      await tester.pumpAndSettle();

      expect(Get.isRegistered<ExamResultController>(), isTrue);
      expect(find.byKey(const Key('exam_percentile_badge')), findsOneWidget);

      // Pop back to subjects and verify route-scoped controllers disposed (no fenix: true)
      Get.back();
      await tester.pumpAndSettle();
      expect(Get.isRegistered<ExamResultController>(), isFalse);
      expect(Get.isRegistered<ExamRunnerController>(), isFalse);
    });

    testWidgets('ExamSetupView shows resume banner, resumes draft into ExamRunnerView, and renders 320dp without overflow', (tester) async {
      tester.view.physicalSize = const Size(320, 640);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);

      const draft = ExamDraftEntity(
        sessionId: 'offline_exam_resume_1',
        subjectId: 'sub_ssc_physics',
        chapterId: 'chap_ssc_physics_ch2',
        testType: ExamTestType.chapterTest,
        questionIds: <String>['eq_1', 'eq_2'],
        answers: <String, String?>{'eq_1': 'opt_a'},
        flaggedQuestionIds: <String>['eq_2'],
        remainingSeconds: 245,
        totalDurationSeconds: 600,
        currentIndex: 1,
      );

      when(() => examRepo.getLatestExamDraft()).thenAnswer((_) async => draft);
      when(() => examRepo.getResumeSessionData(draft)).thenAnswer(
        (_) async => Right(
          ExamResumeDataEntity(
            session: ExamSessionStartEntity(
              sessionId: 'offline_exam_resume_1',
              testType: ExamTestType.chapterTest,
              subjectId: 'sub_ssc_physics',
              chapterId: 'chap_ssc_physics_ch2',
              totalQuestions: 2,
              durationSeconds: 600,
              negativeRatio: 0.25,
              questions: _sampleQuestions(count: 2),
              isOfflineSession: true,
            ),
            answers: const <String, String?>{'eq_1': 'opt_a'},
            flaggedQuestionIds: const <String>['eq_2'],
            remainingSeconds: 245,
            currentIndex: 1,
          ),
        ),
      );

      registerDependencies();

      await tester.pumpWidget(
        MediaQuery(
          data: const MediaQueryData(
            size: Size(320, 640),
            textScaler: TextScaler.linear(1.25),
          ),
          child: GetMaterialApp(
            theme: PorhiTheme.light,
            initialRoute: AppRoutes.examForChapter('chap_ssc_physics_ch2'),
            getPages: AppPages.routes,
          ),
        ),
      );
      await tester.pumpAndSettle();

      expect(tester.takeException(), isNull);
      expect(find.byKey(const Key('exam_resume_banner')), findsOneWidget);

      // Toggle custom duration input at 320dp -> still zero overflow
      await tester.ensureVisible(find.byKey(const Key('exam_dur_custom')));
      await tester.tap(find.byKey(const Key('exam_dur_custom')));
      await tester.pumpAndSettle();
      expect(find.byKey(const Key('exam_custom_minutes_input')), findsOneWidget);
      expect(tester.takeException(), isNull);

      // Resume draft -> opens ExamRunnerView at index 1 (eq_2) with 245s remaining
      await tester.ensureVisible(find.byKey(const Key('exam_resume_btn')));
      await tester.tap(find.byKey(const Key('exam_resume_btn')));
      await tester.pumpAndSettle();

      expect(tester.takeException(), isNull);
      final runnerCtrl = Get.find<ExamRunnerController>();
      expect(runnerCtrl.safeIndex, 1);
      expect(runnerCtrl.answers['eq_1'], 'opt_a');
      expect(runnerCtrl.flaggedQuestionIds.contains('eq_2'), isTrue);
      expect(runnerCtrl.remainingSeconds.value, inInclusiveRange(240, 245));

      // Open question palette sheet & jump to question 0
      await tester.tap(find.byKey(const Key('exam_palette_btn')));
      await tester.pumpAndSettle();
      await tester.tap(find.byKey(const Key('exam_palette_q_0')));
      await tester.pumpAndSettle();
      expect(runnerCtrl.safeIndex, 0);

      // Clear selection on q0
      await tester.ensureVisible(find.byKey(const Key('exam_clear_selection_btn')));
      await tester.tap(find.byKey(const Key('exam_clear_selection_btn')));
      await tester.pump();
      expect(runnerCtrl.answers.containsKey('eq_1'), isFalse);
      expect(tester.takeException(), isNull);
    });
  });

  group('Task 10 Review Regression Tests', () {
    late AppDatabase db;
    late _MockExamRemoteDataSource remoteDataSource;
    late ExamLocalDataSource localDataSource;
    late OfflineSyncService offlineSyncService;
    late ExamRepositoryImpl repository;

    setUp(() async {
      Get.reset();
      Get.testMode = true;
      await PorhiTheme.initCommon();

      db = AppDatabase(NativeDatabase.memory());
      remoteDataSource = _MockExamRemoteDataSource();
      localDataSource = ExamLocalDataSourceImpl(database: db);
      offlineSyncService = OfflineSyncService(database: db);
      await offlineSyncService.init();
      repository = ExamRepositoryImpl(
        remoteDataSource: remoteDataSource,
        localDataSource: localDataSource,
        offlineSyncService: offlineSyncService,
      );
    });

    tearDown(() async {
      offlineSyncService.onClose();
      await db.close();
      Get.reset();
    });

    test('(a) 4xx/5xx startExam errors surface instead of falling back to CachedQuestions', () async {
      await _seedCachedQuestions(
        db,
        chapterId: 'chap_1',
        subjectId: 'sub_phys',
        questions: <Map<String, dynamic>>[
          _sampleExamQuestionJson(id: 'q_cached_1'),
        ],
      );

      when(
        () => remoteDataSource.startExam(
          testType: any(named: 'testType'),
          subjectId: any(named: 'subjectId'),
          chapterId: any(named: 'chapterId'),
          topicId: any(named: 'topicId'),
          questionLimit: any(named: 'questionLimit'),
          negativeRatio: any(named: 'negativeRatio'),
          durationSeconds: any(named: 'durationSeconds'),
        ),
      ).thenAnswer(
        (_) async => Left(
          ErrorResponse(
            statusCode: 400,
            message: 'Invalid exam parameters',
            data: ApiResponseErrorType.response,
          ),
        ),
      );

      final res = await repository.startExam(
        testType: ExamTestType.chapterTest,
        subjectId: 'sub_phys',
        chapterId: 'chap_1',
        questionLimit: 10,
        negativeRatio: 0.25,
        durationSeconds: 600,
      );

      expect(res.isLeft(), isTrue);
      final err = (res as Left<ErrorResponse, ExamSessionStartEntity>).value;
      expect(err.statusCode, 400);
      expect(err.message, 'Invalid exam parameters');
    });

    test('(b) online startExam (negativeRatio 0.5) -> offline resume preserves 0.5 and enqueues negativeRatio in SyncQueue', () async {
      await _seedCachedQuestions(
        db,
        chapterId: 'chap_1',
        subjectId: 'sub_phys',
        questions: <Map<String, dynamic>>[
          _sampleExamQuestionJson(id: 'q_1', correctOptId: 'opt_a'),
          _sampleExamQuestionJson(id: 'q_2', correctOptId: 'opt_a'),
        ],
      );

      when(
        () => remoteDataSource.startExam(
          testType: any(named: 'testType'),
          subjectId: any(named: 'subjectId'),
          chapterId: any(named: 'chapterId'),
          topicId: any(named: 'topicId'),
          questionLimit: any(named: 'questionLimit'),
          negativeRatio: any(named: 'negativeRatio'),
          durationSeconds: any(named: 'durationSeconds'),
        ),
      ).thenAnswer(
        (_) async => Right(
          ExamSessionStartModel.fromJson(<String, dynamic>{
            'sessionId': 'sess_online_neg_half',
            'totalQuestions': 2,
            'durationSeconds': 600,
            'negativeRatio': 0.5,
            'questions': <Map<String, dynamic>>[
              _sampleExamQuestionJson(
                id: 'q_1',
                includeAnswerKey: false,
                includeExplanation: false,
              ),
              _sampleExamQuestionJson(
                id: 'q_2',
                includeAnswerKey: false,
                includeExplanation: false,
              ),
            ],
          }),
        ),
      );

      final startRes = await repository.startExam(
        testType: ExamTestType.chapterTest,
        subjectId: 'sub_phys',
        chapterId: 'chap_1',
        negativeRatio: 0.5,
        durationSeconds: 600,
      );
      final started =
          (startRes as Right<ErrorResponse, ExamSessionStartEntity>).value;
      // Defense-in-depth: active runner questions do NOT expose answer keys.
      expect(
        started.questions.first.options.every((o) => o.isCorrect == null),
        isTrue,
      );
      expect(started.questions.first.explanation, isNull);

      await repository.saveExamDraft(
        ExamDraftEntity(
          sessionId: 'sess_online_neg_half',
          subjectId: 'sub_phys',
          chapterId: 'chap_1',
          testType: ExamTestType.chapterTest,
          questionIds: const <String>['q_1', 'q_2'],
          answers: const <String, String?>{'q_1': 'opt_a'},
          flaggedQuestionIds: const <String>[],
          remainingSeconds: 500,
          totalDurationSeconds: 600,
          currentIndex: 0,
          updatedAt: DateTime.now().toUtc(),
        ),
      );

      when(() => remoteDataSource.getSession('sess_online_neg_half')).thenAnswer(
        (_) async => Left(
          ErrorResponse(
            message: 'Offline',
            data: ApiResponseErrorType.noInternet,
          ),
        ),
      );

      final draft = await repository.getExamDraft('sess_online_neg_half');
      final resumeRes = await repository.getResumeSessionData(draft!);
      final resumed =
          (resumeRes as Right<ErrorResponse, ExamResumeDataEntity>).value;
      expect(resumed.session?.negativeRatio, 0.5);

      // Submit offline and verify SyncQueue item includes negativeRatio: 0.5
      when(
        () => remoteDataSource.submitExam(
          sessionId: 'sess_online_neg_half',
          answers: any(named: 'answers'),
        ),
      ).thenAnswer(
        (_) async => Left(
          ErrorResponse(
            message: 'Offline',
            data: ApiResponseErrorType.noInternet,
          ),
        ),
      );

      final submitRes = await repository.submitExam(
        sessionId: 'sess_online_neg_half',
        answers: const <ExamAnswerInputEntity>[
          ExamAnswerInputEntity(questionId: 'q_1', selectedOptionId: 'opt_a'),
          ExamAnswerInputEntity(questionId: 'q_2', selectedOptionId: 'opt_b'),
        ],
        subjectId: 'sub_phys',
        chapterId: 'chap_1',
        testType: ExamTestType.chapterTest,
        durationSeconds: 600,
        negativeRatio: resumed.session!.negativeRatio,
        isOfflineSession: false,
        questions: resumed.session!.questions,
      );
      final result = (submitRes as Right<ErrorResponse, ExamResultEntity>).value;
      expect(result.score, 0.5); // 1 - 1*0.5 = 0.5
      expect(result.isPendingServerGrading, isFalse);

      final pending = await db.getPendingSyncItems();
      expect(pending.length, 1);
      final payload =
          jsonDecode(pending.first.payloadJson) as Map<String, dynamic>;
      expect(payload['negativeRatio'], 0.5);
    });

    test('(c) getSession returns cached result when server returns IN_PROGRESS & uncached offline submit sets isPendingServerGrading cleanly', () async {
      // Uncached questions (no isCorrect keys anywhere locally)
      final uncachedModel = ExamQuestionModel.fromJson(
        _sampleExamQuestionJson(
          id: 'q_uncached_1',
          includeAnswerKey: false,
          includeExplanation: false,
        ),
      ).toEntity();

      when(
        () => remoteDataSource.submitExam(
          sessionId: 'sess_uncached_1',
          answers: any(named: 'answers'),
        ),
      ).thenAnswer(
        (_) async => Left(
          ErrorResponse(
            message: 'Offline',
            data: ApiResponseErrorType.noInternet,
          ),
        ),
      );

      final submitRes = await repository.submitExam(
        sessionId: 'sess_uncached_1',
        answers: const <ExamAnswerInputEntity>[
          ExamAnswerInputEntity(
            questionId: 'q_uncached_1',
            selectedOptionId: 'opt_a',
          ),
        ],
        subjectId: 'sub_phys',
        chapterId: 'chap_uncached',
        testType: ExamTestType.chapterTest,
        durationSeconds: 600,
        negativeRatio: 0.25,
        isOfflineSession: false,
        questions: <ExamQuestionEntity>[uncachedModel],
      );

      final offlineResult =
          (submitRes as Right<ErrorResponse, ExamResultEntity>).value;
      expect(offlineResult.isPendingServerGrading, isTrue);
      expect(offlineResult.isQueuedOffline, isTrue);
      expect(offlineResult.wrongCount, 0);
      expect(offlineResult.correctCount, 0);
      expect(offlineResult.score, 0.0);

      // Even if online GET /exam/session/:id still says IN_PROGRESS, getSession returns cached offline result
      when(() => remoteDataSource.getSession('sess_uncached_1')).thenAnswer(
        (_) async => Right(
          ExamSessionDetailModel.fromJson(<String, dynamic>{
            'sessionId': 'sess_uncached_1',
            'status': 'IN_PROGRESS',
            'testType': 'CHAPTER_TEST',
            'subjectId': 'sub_phys',
            'chapterId': 'chap_uncached',
            'totalQuestions': 1,
          }),
        ),
      );

      final fetched = await repository.getSession('sess_uncached_1');
      final fetchedResult =
          (fetched as Right<ErrorResponse, ExamResultEntity>).value;
      expect(fetchedResult.status, 'COMPLETED');
      expect(fetchedResult.isPendingServerGrading, isTrue);
      expect(fetchedResult.isQueuedOffline, isTrue);
    });
  });

  group('Task 10 Review Regression - Controllers & UI', () {
    setUp(() async {
      Get.reset();
      Get.testMode = true;
      await PorhiTheme.initCommon();
    });

    tearDown(() {
      Get.reset();
    });

    testWidgets('(c-ui) ExamResultView renders pending-grading banner instead of 0/N when isPendingServerGrading is true', (tester) async {
      final mockRepo = _MockExamRepository();
      final mockCurriculum = _MockCurriculumRepository();
      final mockStudent = _MockStudentRepository();
      final mockAuth = _MockAuthRepository();
      when(() => mockAuth.getCachedUser()).thenReturn(null);
      when(() => mockAuth.getLanguage()).thenReturn('en');
      when(() => mockStudent.getActiveSubjectId(any())).thenReturn('sub_phys');
      when(() => mockCurriculum.getCachedChapters(any()))
          .thenAnswer((_) async => const <ChapterEntity>[]);

      const pendingResult = ExamResultEntity(
        sessionId: 'sess_uncached_1',
        status: 'COMPLETED',
        testType: ExamTestType.chapterTest,
        subjectId: 'sub_phys',
        chapterId: 'chap_uncached',
        score: 0.0,
        totalQuestions: 1,
        correctCount: 0,
        wrongCount: 0,
        skippedCount: 0,
        durationSeconds: 600,
        negativeRatio: 0.25,
        negativeDeduction: 0.0,
        isQueuedOffline: true,
        isPendingServerGrading: true,
        answersWithExplanation: <ExamReviewedAnswerEntity>[
          ExamReviewedAnswerEntity(
            questionId: 'q_uncached_1',
            stem: 'বেগের মাত্রা কোনটি?',
            options: <ExamOptionEntity>[
              ExamOptionEntity(id: 'opt_a', text: 'A'),
              ExamOptionEntity(id: 'opt_b', text: 'B'),
            ],
            selectedOptionId: 'opt_a',
            isCorrect: false,
          ),
        ],
      );
      when(() => mockRepo.getSession('sess_uncached_1'))
          .thenAnswer((_) async => const Right(pendingResult));

      Get.put<GetExamSessionUseCase>(GetExamSessionUseCase(mockRepo));
      Get.put<GetCachedChaptersUseCase>(
        GetCachedChaptersUseCase(mockCurriculum),
      );
      Get.put<GetCachedUserUseCase>(GetCachedUserUseCase(mockAuth));
      Get.put<GetActiveSubjectIdUseCase>(
        GetActiveSubjectIdUseCase(mockStudent),
      );
      Get.put<GetLanguageUseCase>(GetLanguageUseCase(mockAuth));
      Get.put<EnvConfig>(const EnvConfig());

      await tester.pumpWidget(
        GetMaterialApp(
          theme: PorhiTheme.light,
          initialRoute: AppRoutes.examResultForSession('sess_uncached_1'),
          getPages: AppPages.routes,
        ),
      );
      await tester.pumpAndSettle();

      expect(find.byKey(const Key('exam_pending_grading_badge')), findsOneWidget);
      expect(find.text('Pending Server Grading'), findsOneWidget);
      expect(find.text('0 / 1'), findsNothing);
      expect(tester.takeException(), isNull);
    });

    test('(d) auto-submit failure resets _hasSubmitted so manual retry works', () async {
      final mockRepo = _MockExamRepository();
      final mockAuth = _MockAuthRepository();
      when(() => mockAuth.getLanguage()).thenReturn('en');
      when(() => mockRepo.saveExamDraft(any())).thenAnswer((_) async {});

      var attempt = 0;
      when(
        () => mockRepo.submitExam(
          sessionId: any(named: 'sessionId'),
          answers: any(named: 'answers'),
          subjectId: any(named: 'subjectId'),
          chapterId: any(named: 'chapterId'),
          testType: any(named: 'testType'),
          durationSeconds: any(named: 'durationSeconds'),
          negativeRatio: any(named: 'negativeRatio'),
          isOfflineSession: any(named: 'isOfflineSession'),
          questions: any(named: 'questions'),
        ),
      ).thenAnswer((_) async {
        attempt++;
        if (attempt == 1) {
          return Left(
            ErrorResponse(
              message: 'Server busy',
              data: ApiResponseErrorType.response,
            ),
          );
        }
        return const Right(
          ExamResultEntity(
            sessionId: 'sess_auto_retry',
            testType: ExamTestType.chapterTest,
            subjectId: 'sub_phys',
            chapterId: 'chap_1',
            score: 1.0,
            totalQuestions: 1,
            correctCount: 1,
            wrongCount: 0,
            skippedCount: 0,
            durationSeconds: 1,
            negativeRatio: 0.25,
            negativeDeduction: 0.0,
          ),
        );
      });

      final controller = ExamRunnerController(
        heartbeatExamUseCase: HeartbeatExamUseCase(mockRepo),
        submitExamUseCase: SubmitExamUseCase(mockRepo),
        saveExamDraftUseCase: SaveExamDraftUseCase(mockRepo),
        deleteExamDraftUseCase: DeleteExamDraftUseCase(mockRepo),
        getLanguageUseCase: GetLanguageUseCase(mockAuth),
        initialArgs: ExamRunnerArgs(
          session: ExamSessionStartEntity(
            sessionId: 'sess_auto_retry',
            testType: ExamTestType.chapterTest,
            subjectId: 'sub_phys',
            chapterId: 'chap_1',
            totalQuestions: 1,
            durationSeconds: 1,
            negativeRatio: 0.25,
            questions: _sampleQuestions(count: 1),
          ),
        ),
      );

      controller.onInit();
      await Future<void>.delayed(const Duration(milliseconds: 1200));

      expect(attempt, 1);
      expect(controller.errorMessage.value, 'Server busy');
      expect(controller.isSubmitting.value, isFalse);

      // Manual retry MUST succeed instead of being blocked by _hasSubmitted!
      await controller.submitExam();
      expect(attempt, 2);
      controller.onClose();
    });

    test('(e) autosave vs delete-on-submit race prevention, saveAndExit, and discardAndExit', () async {
      final mockRepo = _MockExamRepository();
      final mockAuth = _MockAuthRepository();
      when(() => mockAuth.getLanguage()).thenReturn('en');

      final events = <String>[];
      final saveCompleter = Completer<void>();
      var saveCount = 0;

      when(() => mockRepo.saveExamDraft(any())).thenAnswer((_) {
        saveCount++;
        events.add('save_start_$saveCount');
        if (saveCount == 2) {
          return saveCompleter.future.then((_) {
            events.add('save_end_2');
          });
        }
        events.add('save_end_$saveCount');
        return Future<void>.value();
      });

      when(() => mockRepo.deleteExamDraft('sess_race')).thenAnswer((_) async {
        events.add('delete_draft');
      });

      when(
        () => mockRepo.submitExam(
          sessionId: any(named: 'sessionId'),
          answers: any(named: 'answers'),
          subjectId: any(named: 'subjectId'),
          chapterId: any(named: 'chapterId'),
          testType: any(named: 'testType'),
          durationSeconds: any(named: 'durationSeconds'),
          negativeRatio: any(named: 'negativeRatio'),
          isOfflineSession: any(named: 'isOfflineSession'),
          questions: any(named: 'questions'),
        ),
      ).thenAnswer((_) async {
        events.add('submit_repo_called');
        await mockRepo.deleteExamDraft('sess_race');
        return const Right(
          ExamResultEntity(
            sessionId: 'sess_race',
            testType: ExamTestType.chapterTest,
            subjectId: 'sub_phys',
            chapterId: 'chap_1',
            score: 1.0,
            totalQuestions: 1,
            correctCount: 1,
            wrongCount: 0,
            skippedCount: 0,
            durationSeconds: 300,
            negativeRatio: 0.25,
            negativeDeduction: 0.0,
          ),
        );
      });

      final controller = ExamRunnerController(
        heartbeatExamUseCase: HeartbeatExamUseCase(mockRepo),
        submitExamUseCase: SubmitExamUseCase(mockRepo),
        saveExamDraftUseCase: SaveExamDraftUseCase(mockRepo),
        deleteExamDraftUseCase: DeleteExamDraftUseCase(mockRepo),
        getLanguageUseCase: GetLanguageUseCase(mockAuth),
        initialArgs: ExamRunnerArgs(
          session: ExamSessionStartEntity(
            sessionId: 'sess_race',
            testType: ExamTestType.chapterTest,
            subjectId: 'sub_phys',
            chapterId: 'chap_1',
            totalQuestions: 1,
            durationSeconds: 300,
            negativeRatio: 0.25,
            questions: _sampleQuestions(count: 1),
          ),
        ),
      );

      controller.onInit();
      await Future<void>.delayed(Duration.zero);
      // Trigger second autosave which stalls on saveCompleter
      controller.selectOption('eq_1', 'opt_a');
      expect(saveCount, 2);

      final submitFuture = controller.submitExam();
      await Future<void>.delayed(const Duration(milliseconds: 20));
      // submitExam must wait for in-flight autosave before deleting draft
      expect(events.contains('submit_repo_called'), isFalse);

      saveCompleter.complete();
      await submitFuture;

      expect(
        events.indexOf('save_end_2'),
        lessThan(events.indexOf('delete_draft')),
      );
      controller.onClose();

      // Verify saveAndExit saves and discardAndExit deletes
      final controller2 = ExamRunnerController(
        heartbeatExamUseCase: HeartbeatExamUseCase(mockRepo),
        submitExamUseCase: SubmitExamUseCase(mockRepo),
        saveExamDraftUseCase: SaveExamDraftUseCase(mockRepo),
        deleteExamDraftUseCase: DeleteExamDraftUseCase(mockRepo),
        getLanguageUseCase: GetLanguageUseCase(mockAuth),
        initialArgs: ExamRunnerArgs(
          session: ExamSessionStartEntity(
            sessionId: 'sess_race',
            testType: ExamTestType.chapterTest,
            subjectId: 'sub_phys',
            chapterId: 'chap_1',
            totalQuestions: 1,
            durationSeconds: 300,
            negativeRatio: 0.25,
            questions: _sampleQuestions(count: 1),
          ),
        ),
      );
      controller2.onInit();
      final countBeforeSaveAndExit = saveCount;
      await controller2.saveAndExit();
      expect(saveCount, greaterThan(countBeforeSaveAndExit));

      await controller2.discardAndExit();
      verify(() => mockRepo.deleteExamDraft('sess_race')).called(2);
      controller2.onClose();
    });

    testWidgets('(f) /exam/setup empty args defaults to SUBJECT_TEST, accepts Bangla custom minutes ১৫, and ChapterIndexView.onExamTap forwards subjectId & chapterTitle', (tester) async {
      final mockExamRepo = _MockExamRepository();
      final mockCurriculumRepo = _MockCurriculumRepository();
      final mockStudentRepo = _MockStudentRepository();
      final mockAuthRepo = _MockAuthRepository();

      when(() => mockAuthRepo.getCachedUser()).thenReturn(
        const AuthUserEntity(
          id: 'u_1',
          email: 't@pori.app',
          selectedClass: StudentTrack.ssc,
        ),
      );
      when(() => mockAuthRepo.getLanguage()).thenReturn('bn');
      when(() => mockStudentRepo.getActiveSubjectId(any()))
          .thenReturn('sub_ssc_physics');
      when(() => mockCurriculumRepo.getActiveSubjectId(any()))
          .thenReturn('sub_hsc_chemistry_1');
      when(
        () => mockCurriculumRepo.getCachedSubjects(
          program: any(named: 'program'),
        ),
      ).thenAnswer(
        (_) async => const <SubjectEntity>[
          SubjectEntity(
            id: 'sub_ssc_physics',
            code: 'PHYS',
            nameBangla: 'পদার্থবিজ্ঞান',
            program: StudentTrack.ssc,
          ),
          SubjectEntity(
            id: 'sub_hsc_chemistry_1',
            code: 'CHEM1',
            nameBangla: 'রসায়ন ১ম পত্র',
            program: StudentTrack.hsc,
          ),
        ],
      );
      when(() => mockCurriculumRepo.getCachedChapters(any())).thenAnswer(
        (_) async => const <ChapterEntity>[
          ChapterEntity(
            id: 'chap_chem_1',
            subjectId: 'sub_hsc_chemistry_1',
            orderIndex: 1,
            titleBangla: 'পরিমাণগত রসায়ন',
          ),
        ],
      );
      when(() => mockCurriculumRepo.getChapters(any())).thenAnswer(
        (_) async => const Right(<ChapterEntity>[
          ChapterEntity(
            id: 'chap_chem_1',
            subjectId: 'sub_hsc_chemistry_1',
            orderIndex: 1,
            titleBangla: 'পরিমাণগত রসায়ন',
          ),
        ]),
      );
      when(
        () => mockCurriculumRepo.getDownloadedChapters(
          subjectId: any(named: 'subjectId'),
        ),
      ).thenAnswer((_) async => const <DownloadedChapterEntity>[]);
      when(() => mockCurriculumRepo.getOfflineChapterPack(any()))
          .thenAnswer((_) async => null);
      when(
        () => mockStudentRepo.getCachedOverview(
          subjectId: any(named: 'subjectId'),
        ),
      ).thenAnswer((_) async => null);
      when(() => mockExamRepo.getLatestExamDraft()).thenAnswer((_) async => null);
      when(() => mockExamRepo.deleteExamDraft(any())).thenAnswer((_) async {});
      when(
        () => mockExamRepo.startExam(
          testType: any(named: 'testType'),
          subjectId: any(named: 'subjectId'),
          chapterId: any(named: 'chapterId'),
          topicId: any(named: 'topicId'),
          questionLimit: any(named: 'questionLimit'),
          negativeRatio: any(named: 'negativeRatio'),
          durationSeconds: any(named: 'durationSeconds'),
        ),
      ).thenAnswer(
        (_) async => Left(
          ErrorResponse(
            message: 'Check duration stop',
            data: ApiResponseErrorType.response,
          ),
        ),
      );

      Get.put<StartExamUseCase>(StartExamUseCase(mockExamRepo));
      Get.put<HeartbeatExamUseCase>(HeartbeatExamUseCase(mockExamRepo));
      Get.put<SubmitExamUseCase>(SubmitExamUseCase(mockExamRepo));
      Get.put<GetExamSessionUseCase>(GetExamSessionUseCase(mockExamRepo));
      Get.put<SaveExamDraftUseCase>(SaveExamDraftUseCase(mockExamRepo));
      Get.put<GetLatestExamDraftUseCase>(GetLatestExamDraftUseCase(mockExamRepo));
      Get.put<DeleteExamDraftUseCase>(DeleteExamDraftUseCase(mockExamRepo));
      Get.put<ResumeExamSessionUseCase>(ResumeExamSessionUseCase(mockExamRepo));
      Get.put<GetChaptersUseCase>(GetChaptersUseCase(mockCurriculumRepo));
      Get.put<GetCachedChaptersUseCase>(GetCachedChaptersUseCase(mockCurriculumRepo));
      Get.put<GetCachedSubjectsUseCase>(GetCachedSubjectsUseCase(mockCurriculumRepo));
      Get.put<FilterChaptersUseCase>(const FilterChaptersUseCase());
      Get.put<DownloadChapterPackUseCase>(DownloadChapterPackUseCase(mockCurriculumRepo));
      Get.put<RemoveChapterPackUseCase>(RemoveChapterPackUseCase(mockCurriculumRepo));
      Get.put<GetDownloadedChaptersUseCase>(GetDownloadedChaptersUseCase(mockCurriculumRepo));
      Get.put<GetOfflineChapterPackUseCase>(GetOfflineChapterPackUseCase(mockCurriculumRepo));
      Get.put<GetActiveCurriculumSubjectUseCase>(GetActiveCurriculumSubjectUseCase(mockCurriculumRepo));
      Get.put<GetCachedOverviewUseCase>(GetCachedOverviewUseCase(mockStudentRepo));
      Get.put<ToggleBookmarkUseCase>(ToggleBookmarkUseCase(mockStudentRepo));
      Get.put<PatchCachedBookmarkUseCase>(PatchCachedBookmarkUseCase(mockStudentRepo));
      Get.put<GetCachedUserUseCase>(GetCachedUserUseCase(mockAuthRepo));
      Get.put<GetLanguageUseCase>(GetLanguageUseCase(mockAuthRepo));
      Get.put<GetActiveSubjectIdUseCase>(GetActiveSubjectIdUseCase(mockStudentRepo));
      Get.put<EnvConfig>(const EnvConfig());

      // 1. Opening /exam/setup with empty args defaults to SUBJECT_TEST (25 Qs, 25m)
      await tester.pumpWidget(
        GetMaterialApp(
          theme: PorhiTheme.light,
          initialRoute: AppRoutes.examSetup,
          getPages: AppPages.routes,
        ),
      );
      await tester.pumpAndSettle();

      final setupCtrl = Get.find<ExamSetupController>();
      expect(setupCtrl.testType.value, ExamTestType.subjectTest);
      expect(setupCtrl.questionLimit.value, 25);
      expect(setupCtrl.durationSeconds.value, 1500);

      // Bangla digits '১৫' custom duration parses to 900 seconds
      setupCtrl.enableCustomDuration();
      setupCtrl.customMinutesController.text = '১৫';
      await setupCtrl.startExam();

      verify(
        () => mockExamRepo.startExam(
          testType: ExamTestType.subjectTest,
          subjectId: 'sub_ssc_physics',
          chapterId: null,
          topicId: null,
          questionLimit: 25,
          negativeRatio: 0.25,
          durationSeconds: 900,
        ),
      ).called(1);

      // 2. ChapterIndexView.onExamTap forwards subjectId & chapterTitle
      await tester.pumpWidget(const SizedBox.shrink());
      await tester.pumpAndSettle();
      Get.delete<ExamSetupController>(force: true);

      await tester.pumpWidget(
        GetMaterialApp(
          key: const Key('chapter_to_exam_app'),
          theme: PorhiTheme.light,
          initialRoute: AppRoutes.chaptersForSubject('sub_hsc_chemistry_1'),
          getPages: <GetPage<dynamic>>[
            GetPage<dynamic>(
              name: AppRoutes.chapters,
              page: () => const ChapterIndexView(),
              binding: CurriculumBinding(),
            ),
            ...AppPages.routes.where((r) => r.name != AppRoutes.chapters),
          ],
        ),
      );
      await tester.pumpAndSettle();

      await tester.ensureVisible(
        find.byKey(const Key('chapter_exam_btn_chap_chem_1')),
      );
      await tester.tap(find.byKey(const Key('chapter_exam_btn_chap_chem_1')));
      await tester.pumpAndSettle();

      final tappedSetupCtrl = Get.find<ExamSetupController>();
      expect(tappedSetupCtrl.subjectId.value, 'sub_hsc_chemistry_1');
      expect(tappedSetupCtrl.chapterId.value, 'chap_chem_1');
      expect(tappedSetupCtrl.chapterTitle.value, 'পরিমাণগত রসায়ন');
    });

    test('(g) ExamResultController falls back when ErrorResponse.message is null or blank', () async {
      final mockRepo = _MockExamRepository();
      final mockCurriculum = _MockCurriculumRepository();
      final mockStudent = _MockStudentRepository();
      final mockAuth = _MockAuthRepository();

      when(() => mockAuth.getLanguage()).thenReturn('en');
      when(() => mockAuth.getCachedUser()).thenReturn(null);
      when(() => mockStudent.getActiveSubjectId(any())).thenReturn('sub_1');
      when(() => mockRepo.getSession('sess_blank_err')).thenAnswer(
        (_) async => Left(
          ErrorResponse(
            message: '   ',
            data: ApiResponseErrorType.response,
          ),
        ),
      );

      final ctrl = ExamResultController(
        getExamSessionUseCase: GetExamSessionUseCase(mockRepo),
        getCachedChaptersUseCase: GetCachedChaptersUseCase(mockCurriculum),
        getCachedUserUseCase: GetCachedUserUseCase(mockAuth),
        getActiveSubjectIdUseCase: GetActiveSubjectIdUseCase(mockStudent),
        getLanguageUseCase: GetLanguageUseCase(mockAuth),
      );
      ctrl.language.value = AppLanguage.en;
      ctrl.sessionId.value = 'sess_blank_err';
      await ctrl.loadSession();

      expect(ctrl.errorMessage.value, 'Could not load exam result.');
      ctrl.onClose();
    });
  });
}
