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
import 'package:porhi/core/sync/offline_sync_service.dart';
import 'package:porhi/core/theme/porhi_theme.dart';
import 'package:porhi/features/auth/domain/entities/auth_user_entity.dart';
import 'package:porhi/features/auth/domain/repositories/auth_repository.dart';
import 'package:porhi/features/auth/domain/usecases/auth_usecases.dart';
import 'package:porhi/features/content_report/domain/entities/content_report_entity.dart';
import 'package:porhi/features/content_report/domain/repositories/content_report_repository.dart';
import 'package:porhi/features/content_report/domain/usecases/content_report_usecases.dart';
import 'package:porhi/features/curriculum/domain/entities/curriculum_entities.dart';
import 'package:porhi/features/curriculum/domain/repositories/curriculum_repository.dart';
import 'package:porhi/features/curriculum/domain/usecases/curriculum_usecases.dart';
import 'package:porhi/features/dashboard/domain/repositories/student_repository.dart';
import 'package:porhi/features/dashboard/domain/usecases/student_usecases.dart';
import 'package:porhi/features/practice/data/datasources/practice_local_datasource.dart';
import 'package:porhi/features/practice/data/datasources/practice_remote_datasource.dart';
import 'package:porhi/features/practice/data/models/practice_models.dart';
import 'package:porhi/features/practice/data/repositories/practice_repository_impl.dart';
import 'package:porhi/features/practice/domain/entities/practice_entities.dart';
import 'package:porhi/features/practice/domain/repositories/practice_repository.dart';
import 'package:porhi/features/practice/domain/usecases/practice_usecases.dart';
import 'package:porhi/features/practice/presentation/practice/binding/practice_binding.dart';
import 'package:porhi/features/practice/presentation/practice/controller/practice_controller.dart';
import 'package:porhi/features/practice/presentation/practice/view/practice_view.dart';
import 'package:porhi/features/practice/presentation/shared/cq_rubric_card.dart';
import 'package:porhi/features/practice/presentation/shared/explanation_layers_card.dart';
import 'package:porhi/routes/app_pages.dart';
import 'package:porhi/routes/app_routes.dart';

class _MockPracticeRemoteDataSource extends Mock
    implements PracticeRemoteDataSource {}

class _MockPracticeRepository extends Mock implements PracticeRepository {}

class _MockStudentRepository extends Mock implements StudentRepository {}

class _MockCurriculumRepository extends Mock implements CurriculumRepository {}

class _MockAuthRepository extends Mock implements AuthRepository {}

class _MockContentReportRepository extends Mock
    implements ContentReportRepository {}

Map<String, dynamic> _sampleMcqJson({
  String id = 'q_mcq_1',
  String topicId = 'top_motion_1',
  String difficulty = 'EASY',
  bool includeAnswerKey = false,
  bool includeExplanation = false,
}) {
  return <String, dynamic>{
    'id': id,
    'topicId': topicId,
    'type': 'MCQ',
    'stem': r'বেগের মাত্রা কোনটি? $v = u + at$',
    'options': <Map<String, dynamic>>[
      <String, dynamic>{
        'id': 'opt_a',
        'text': r'$[LT^{-1}]$',
        if (includeAnswerKey) 'isCorrect': true,
      },
      <String, dynamic>{
        'id': 'opt_b',
        'text': r'$[LT^{-2}]$',
        if (includeAnswerKey) 'isCorrect': false,
      },
      <String, dynamic>{
        'id': 'opt_c',
        'text': r'$[MLT^{-2}]$',
        if (includeAnswerKey) 'isCorrect': false,
      },
      <String, dynamic>{
        'id': 'opt_d',
        'text': r'$[L^2T^{-1}]$',
        if (includeAnswerKey) 'isCorrect': false,
      },
    ],
    if (includeExplanation)
      'explanation': <String, dynamic>{
        'directAnswer': r'সঠিক উত্তর (ক) $[LT^{-1}]$।',
        'coreConcept': r'বেগ = সরণ / সময়।',
        'stepDerivation': r'$$[v] = \frac{[L]}{[T]} = [LT^{-1}]$$',
        'distractorAnalysis': <String, dynamic>{
          'খ': r'$[LT^{-2}]$ হলো ত্বরণের মাত্রা।',
          'গ': r'$[MLT^{-2}]$ হলো বলের মাত্রা।',
        },
        'textbookCitation': <String, dynamic>{
          'bookTitle': 'পদার্থবিজ্ঞান (নবম-দশম শ্রেণি, NCTB)',
          'chapterName': 'দ্বিতীয় অধ্যায়: গতি',
          'pageNumber': 42,
        },
        'proTipShortcut': 'দূরত্বকে সময় দিয়ে ভাগ করলেই বেগের মাত্রা পাওয়া যায়।',
      },
    'difficulty': difficulty,
    'boardSource': 'ঢাকা বোর্ড ২০২৪',
    'isVerified': true,
    'version': 1,
  };
}

Map<String, dynamic> _sampleCqJson({
  String id = 'q_cq_1',
  String topicId = 'top_motion_2',
  String difficulty = 'MEDIUM',
}) {
  return <String, dynamic>{
    'id': id,
    'topicId': topicId,
    'type': 'CQ_CREATIVE',
    'stem': r'স্থির অবস্থান থেকে একটি গাড়ি $4\text{ ms}^{-2}$ ত্বরণে $6\text{ s}$ চলল।',
    'options': const <dynamic>[],
    'cqRubric': <String, dynamic>{
      'ka': <String, dynamic>{
        'mark': 1,
        'criteria': 'সময়ের সাথে বেগের পরিবর্তনের হারকে ত্বরণ বলে।',
      },
      'kha': 'সমবেগে বেগের পরিবর্তন শূন্য হওয়ায় ত্বরণ শূন্য হয়।',
      'ga': <String, dynamic>{
        'mark': 3,
        'criteria': r'$s = ut + \frac{1}{2}at^2 = 72\text{ m}$ নির্ণয়।',
      },
      'gha': <String, dynamic>{
        'mark': 4,
        'criteria': 'সম্পূর্ণ গড় বেগ গাণিতিকভাবে বিশ্লেষণ।',
      },
    },
    'explanation': <String, dynamic>{
      'directAnswer': r'গ. $72\text{ m}$। ঘ. গড় বেগ $12\text{ ms}^{-1}$।',
      'stepDerivation': r'$$s = 0 + 0.5 \times 4 \times 6^2 = 72\text{ m}$$',
    },
    'difficulty': difficulty,
    'boardSource': 'নমুনা সৃজনশীল',
    'isVerified': true,
    'version': 1,
  };
}

void main() {
  setUpAll(() {
    registerFallbackValue(
      const CqSelfScoresEntity(ka: 1, kha: 2, ga: 3, gha: 4),
    );
    registerFallbackValue(ReportContentType.question);
    registerFallbackValue(ReportCategory.wrongAnswer);
  });

  tearDown(() {
    Get.reset();
  });

  group('Practice models & JSON parsing', () {
    test('PracticeQuestionListModel unwraps BaseWrapperModel json array and parses MCQ & CQ', () {
      final model = PracticeQuestionListModel.fromJson(<String, dynamic>{
        'json': <dynamic>[
          _sampleMcqJson(includeExplanation: true),
          _sampleCqJson(),
        ],
      });

      expect(model.questions, hasLength(2));

      final mcq = model.questions[0].toEntity();
      expect(mcq.id, 'q_mcq_1');
      expect(mcq.type, 'MCQ');
      expect(mcq.options, hasLength(4));
      expect(mcq.boardSource, 'ঢাকা বোর্ড ২০২৪');
      expect(mcq.explanation, isNotNull);
      expect(mcq.explanation!.directAnswer, contains('সঠিক উত্তর'));
      expect(mcq.explanation!.distractorAnalysis['খ'], contains('ত্বরণের মাত্রা'));
      expect(mcq.explanation!.textbookCitation?.pageNumber, 42);
      expect(mcq.explanation!.proTipShortcut, isNotEmpty);

      final cq = model.questions[1].toEntity();
      expect(cq.id, 'q_cq_1');
      expect(cq.type, 'CQ_CREATIVE');
      expect(cq.cqRubric, isNotNull);
      expect(cq.cqRubric!.ka?.mark, 1);
      expect(cq.cqRubric!.ka?.criteria, contains('ত্বরণ বলে'));
      expect(cq.cqRubric!.kha?.criteria, contains('সমবেগে'));
      expect(cq.cqRubric!.ga?.mark, 3);
      expect(cq.cqRubric!.gha?.mark, 4);
    });

    test('PracticeQuestionModel handles stringified cqRubric and malformed explanation gracefully', () {
      final model = PracticeQuestionModel.fromJson(<String, dynamic>{
        'id': 'q_cq_str',
        'topicId': 'top_1',
        'type': 'CQ_CREATIVE',
        'stem': 'উদ্দীপক',
        'cqRubric': jsonEncode(<String, dynamic>{
          'ka': 'জ্ঞানমূলক উত্তর',
          'kha': <String, dynamic>{'mark': '2', 'criteria': 'অনুধাবন উত্তর'},
        }),
        'explanation': 'সরল ব্যাখ্যা টেক্সট',
      });

      final entity = model.toEntity();
      expect(entity.cqRubric?.ka?.criteria, 'জ্ঞানমূলক উত্তর');
      expect(entity.cqRubric?.kha?.mark, 2);
      expect(entity.cqRubric?.kha?.criteria, 'অনুধাবন উত্তর');
      expect(entity.explanation?.directAnswer, 'সরল ব্যাখ্যা টেক্সট');
    });

    test('PracticeSubmitResponseModel and CqSelfAssessResponseModel parse server responses', () {
      final submit = PracticeSubmitResponseModel.fromJson(<String, dynamic>{
        'isCorrect': true,
        'correctOptionId': 'opt_a',
        'explanation': _sampleMcqJson(includeExplanation: true)['explanation'],
      });
      expect(submit.isCorrect, isTrue);
      expect(submit.correctOptionId, 'opt_a');
      expect(submit.explanation?.toEntity().coreConcept, contains('সরণ'));

      final cqRes = CqSelfAssessResponseModel.fromJson(<String, dynamic>{
        'success': true,
        'questionId': 'q_cq_1',
        'selfScores': <String, dynamic>{'ka': 1, 'kha': 2, 'ga': 2, 'gha': 3},
        'totalScore': 8,
        'maxScore': 10,
      });
      expect(cqRes.success, isTrue);
      expect(cqRes.questionId, 'q_cq_1');
      expect(cqRes.selfScores.totalScore, 8);
      expect(cqRes.totalScore, 8);
      expect(cqRes.maxScore, 10);
    });
  });

  group('Practice use cases validation', () {
    late _MockPracticeRepository repo;

    setUp(() {
      repo = _MockPracticeRepository();
    });

    test('GetChapterPracticeQuestionsUseCase rejects empty chapterId', () async {
      final useCase = GetChapterPracticeQuestionsUseCase(repo);
      final res = await useCase(chapterId: '   ');
      expect(res.isLeft(), isTrue);
      verifyNever(() => repo.getChapterQuestions(
            chapterId: any(named: 'chapterId'),
            topicId: any(named: 'topicId'),
            difficulty: any(named: 'difficulty'),
            mode: any(named: 'mode'),
            type: any(named: 'type'),
          ));
    });

    test('SubmitPracticeAnswerUseCase validates questionId and selectedOptionId', () async {
      final useCase = SubmitPracticeAnswerUseCase(repo);
      final emptyQ = await useCase(questionId: '', selectedOptionId: 'opt_a');
      final emptyOpt = await useCase(questionId: 'q_1', selectedOptionId: '  ');

      expect(emptyQ.isLeft(), isTrue);
      expect(emptyOpt.isLeft(), isTrue);
      verifyNever(() => repo.submitPractice(
            questionId: any(named: 'questionId'),
            selectedOptionId: any(named: 'selectedOptionId'),
            chapterId: any(named: 'chapterId'),
            topicId: any(named: 'topicId'),
            question: any(named: 'question'),
          ));
    });

    test('SubmitCqSelfAssessUseCase validates questionId and rubric bounds 0..1, 0..2, 0..3, 0..4', () async {
      final useCase = SubmitCqSelfAssessUseCase(repo);

      expect(
        (await useCase(
          questionId: '',
          selfScores: const CqSelfScoresEntity(ka: 1, kha: 1, ga: 1, gha: 1),
        ))
            .isLeft(),
        isTrue,
      );
      expect(
        (await useCase(
          questionId: 'q_cq_1',
          selfScores: const CqSelfScoresEntity(ka: 2, kha: 2, ga: 3, gha: 4),
        ))
            .isLeft(),
        isTrue,
      );
      expect(
        (await useCase(
          questionId: 'q_cq_1',
          selfScores: const CqSelfScoresEntity(ka: 1, kha: 3, ga: 3, gha: 4),
        ))
            .isLeft(),
        isTrue,
      );
      expect(
        (await useCase(
          questionId: 'q_cq_1',
          selfScores: const CqSelfScoresEntity(ka: 1, kha: 2, ga: 4, gha: 4),
        ))
            .isLeft(),
        isTrue,
      );
      expect(
        (await useCase(
          questionId: 'q_cq_1',
          selfScores: const CqSelfScoresEntity(ka: 1, kha: 2, ga: 3, gha: 5),
        ))
            .isLeft(),
        isTrue,
      );
      expect(
        (await useCase(
          questionId: 'q_cq_1',
          selfScores: const CqSelfScoresEntity(ka: -1, kha: 0, ga: 0, gha: 0),
        ))
            .isLeft(),
        isTrue,
      );
      verifyNever(() => repo.submitCqSelfAssess(
            questionId: any(named: 'questionId'),
            selfScores: any(named: 'selfScores'),
            topicId: any(named: 'topicId'),
          ));
    });
  });

  group('PracticeRepositoryImpl online, offline fallback & SyncQueue', () {
    late AppDatabase db;
    late OfflineSyncService syncService;
    late _MockPracticeRemoteDataSource remote;
    late PracticeLocalDataSourceImpl local;
    late PracticeRepositoryImpl repository;

    setUp(() async {
      db = AppDatabase(NativeDatabase.memory());
      syncService = OfflineSyncService(database: db);
      await syncService.init();
      remote = _MockPracticeRemoteDataSource();
      local = PracticeLocalDataSourceImpl(database: db);
      repository = PracticeRepositoryImpl(
        remoteDataSource: remote,
        localDataSource: local,
        offlineSyncService: syncService,
      );
    });

    tearDown(() async {
      syncService.onClose();
      await db.close();
    });

    test('merges local answer keys onto online questions and preserves CachedQuestions keys', () async {
      await db.upsertCachedQuestions(<CachedQuestionInput>[
        CachedQuestionInput(
          id: 'q_mcq_1',
          topicId: 'top_motion_1',
          chapterId: 'chap_1',
          questionType: 'MCQ',
          difficulty: 'EASY',
          payloadJson: jsonEncode(
            _sampleMcqJson(includeAnswerKey: true, includeExplanation: true),
          ),
          updatedAt: DateTime.now().toUtc(),
        ),
      ]);

      when(
        () => remote.getChapterQuestions(
          chapterId: 'chap_1',
          topicId: null,
          difficulty: null,
          mode: null,
          type: 'MCQ',
        ),
      ).thenAnswer(
        (_) async => Right(
          PracticeQuestionListModel.fromJson(<String, dynamic>{
            'json': <dynamic>[
              _sampleMcqJson(includeAnswerKey: false, includeExplanation: false),
            ],
          }),
        ),
      );

      final res = await repository.getChapterQuestions(
        chapterId: 'chap_1',
        type: 'MCQ',
      );

      expect(res.isRight(), isTrue);
      final items = res.getOrElse(() => const <PracticeQuestionEntity>[]);
      expect(items, hasLength(1));
      expect(items.first.options.firstWhere((o) => o.id == 'opt_a').isCorrect, isTrue);
      expect(items.first.explanation?.directAnswer, contains('সঠিক উত্তর'));

      // Verify Drift CachedQuestions row still has answer key intact
      final cachedRows = await db.getCachedQuestionsByChapter('chap_1');
      final decoded = jsonDecode(cachedRows.single.payloadJson) as Map<String, dynamic>;
      final opts = decoded['options'] as List<dynamic>;
      expect((opts.first as Map)['isCorrect'], isTrue);
    });

    test('online empty list for mode=mistakes returns empty list without falling back to cache', () async {
      await db.upsertCachedQuestions(<CachedQuestionInput>[
        CachedQuestionInput(
          id: 'q_mcq_1',
          topicId: 'top_motion_1',
          chapterId: 'chap_1',
          questionType: 'MCQ',
          difficulty: 'EASY',
          payloadJson: jsonEncode(_sampleMcqJson(includeAnswerKey: true)),
          updatedAt: DateTime.now().toUtc(),
        ),
      ]);

      when(
        () => remote.getChapterQuestions(
          chapterId: 'chap_1',
          topicId: null,
          difficulty: null,
          mode: 'mistakes',
          type: 'MCQ',
        ),
      ).thenAnswer(
        (_) async => Right(
          PracticeQuestionListModel(questions: const <PracticeQuestionModel>[]),
        ),
      );

      final res = await repository.getChapterQuestions(
        chapterId: 'chap_1',
        mode: 'mistakes',
        type: 'MCQ',
      );

      expect(res.isRight(), isTrue);
      expect(res.getOrElse(() => const <PracticeQuestionEntity>[]), isEmpty);
    });

    test('offline getChapterQuestions falls back to Drift CachedQuestions filtered by topic/difficulty/type', () async {
      await db.upsertCachedQuestions(<CachedQuestionInput>[
        CachedQuestionInput(
          id: 'q_easy',
          topicId: 'top_1',
          chapterId: 'chap_1',
          questionType: 'MCQ',
          difficulty: 'EASY',
          payloadJson: jsonEncode(
            _sampleMcqJson(id: 'q_easy', topicId: 'top_1', difficulty: 'EASY'),
          ),
          updatedAt: DateTime.now().toUtc(),
        ),
        CachedQuestionInput(
          id: 'q_hard',
          topicId: 'top_2',
          chapterId: 'chap_1',
          questionType: 'MCQ',
          difficulty: 'HARD',
          payloadJson: jsonEncode(
            _sampleMcqJson(id: 'q_hard', topicId: 'top_2', difficulty: 'HARD'),
          ),
          updatedAt: DateTime.now().toUtc(),
        ),
        CachedQuestionInput(
          id: 'q_cq_1',
          topicId: 'top_1',
          chapterId: 'chap_1',
          questionType: 'CQ_CREATIVE',
          difficulty: 'MEDIUM',
          payloadJson: jsonEncode(
            _sampleCqJson(id: 'q_cq_1', topicId: 'top_1', difficulty: 'MEDIUM'),
          ),
          updatedAt: DateTime.now().toUtc(),
        ),
      ]);

      when(
        () => remote.getChapterQuestions(
          chapterId: 'chap_1',
          topicId: 'top_1',
          difficulty: 'EASY',
          mode: null,
          type: 'MCQ',
        ),
      ).thenAnswer(
        (_) async => Left(
          ErrorResponse.byErrorType(errorType: ApiResponseErrorType.noInternet),
        ),
      );

      final res = await repository.getChapterQuestions(
        chapterId: 'chap_1',
        topicId: 'top_1',
        difficulty: 'EASY',
        type: 'MCQ',
      );

      expect(res.isRight(), isTrue);
      final items = res.getOrElse(() => const <PracticeQuestionEntity>[]);
      expect(items, hasLength(1));
      expect(items.single.id, 'q_easy');
      expect(items.single.isFromCache, isTrue);
    });

    test('offline submitPractice grades using Drift answer key, enqueues SyncQueue, and returns explanation', () async {
      await db.upsertCachedQuestions(<CachedQuestionInput>[
        CachedQuestionInput(
          id: 'q_mcq_1',
          topicId: 'top_motion_1',
          chapterId: 'chap_1',
          questionType: 'MCQ',
          difficulty: 'EASY',
          payloadJson: jsonEncode(
            _sampleMcqJson(includeAnswerKey: true, includeExplanation: true),
          ),
          updatedAt: DateTime.now().toUtc(),
        ),
      ]);

      when(
        () => remote.submitPractice(
          questionId: 'q_mcq_1',
          selectedOptionId: 'opt_b',
        ),
      ).thenAnswer(
        (_) async => Left(
          ErrorResponse.byErrorType(
            errorType: ApiResponseErrorType.slowOrNoInternet,
          ),
        ),
      );

      final res = await repository.submitPractice(
        questionId: 'q_mcq_1',
        selectedOptionId: 'opt_b',
        chapterId: 'chap_1',
      );

      expect(res.isRight(), isTrue);
      final outcome = res.getOrElse(() => throw StateError('unexpected'));
      expect(outcome.isCorrect, isFalse);
      expect(outcome.correctOptionId, 'opt_a');
      expect(outcome.isQueuedOffline, isTrue);
      expect(outcome.explanation?.directAnswer, contains('সঠিক উত্তর'));
      expect(await db.getPendingSyncCount(), 1);
    });

    test('offline submitPractice without local answer key returns OFFLINE_NO_ANSWER_KEY without queueing', () async {
      when(
        () => remote.submitPractice(
          questionId: 'q_uncached',
          selectedOptionId: 'opt_a',
        ),
      ).thenAnswer(
        (_) async => Left(
          ErrorResponse.byErrorType(errorType: ApiResponseErrorType.noInternet),
        ),
      );

      final res = await repository.submitPractice(
        questionId: 'q_uncached',
        selectedOptionId: 'opt_a',
      );

      expect(res.isLeft(), isTrue);
      ErrorResponse? err;
      res.fold((l) => err = l, (_) {});
      expect(err?.code, 'OFFLINE_NO_ANSWER_KEY');
      expect(await db.getPendingSyncCount(), 0);
    });

    test('offline submitCqSelfAssess enqueues valid PRACTICE_ATTEMPT payload and flushes cleanly', () async {
      when(
        () => remote.submitCqSelfAssess(
          questionId: 'q_cq_1',
          selfScores: const CqSelfScoresEntity(ka: 1, kha: 1, ga: 2, gha: 3),
        ),
      ).thenAnswer(
        (_) async => Left(
          ErrorResponse.byErrorType(errorType: ApiResponseErrorType.noInternet),
        ),
      );

      final res = await repository.submitCqSelfAssess(
        questionId: 'q_cq_1',
        selfScores: const CqSelfScoresEntity(ka: 1, kha: 1, ga: 2, gha: 3),
        topicId: 'top_motion_2',
      );

      expect(res.isRight(), isTrue);
      final outcome = res.getOrElse(() => throw StateError('unexpected'));
      expect(outcome.totalScore, 7);
      expect(outcome.maxScore, 10);
      expect(outcome.isQueuedOffline, isTrue);
      expect(await db.getPendingSyncCount(), 1);

      OfflineSyncPayload? flushedPayload;
      syncService.setSyncHandler((payload) async {
        flushedPayload = payload;
        return const Right<ErrorResponse, void>(null);
      });

      final flushRes = await syncService.flushPendingQueue();
      expect(flushRes.isRight(), isTrue);
      expect(flushedPayload, isNotNull);
      expect(flushedPayload!.practiceAttempts, hasLength(1));
      expect(flushedPayload!.practiceAttempts.single.questionId, 'q_cq_1');
      expect(flushedPayload!.practiceAttempts.single.isCorrect, isTrue);
      expect(await db.getPendingSyncCount(), 0);
    });
  });

  group('Shared Widgets: ExplanationLayersCard & CqRubricCard', () {
    testWidgets('ExplanationLayersCard renders 6 layers, toggles expand/collapse, skips empty & handles bad TeX', (tester) async {
      const explanation = ExplanationLayersEntity(
        directAnswer: r'সঠিক উত্তর (ক) $\invalidlatex{broken',
        coreConcept: 'গতির প্রথম সমীকরণ',
        stepDerivation: r'$$v = u + at$$',
        distractorAnalysis: <String, String>{
          'খ': 'ভুল একক ব্যবহার করা হয়েছে।',
        },
        textbookCitation: TextbookCitationEntity(
          bookTitle: 'পদার্থবিজ্ঞান',
          chapterName: 'গতি',
          pageNumber: 42,
        ),
        proTipShortcut: 'সহজ শর্টকাট টিপস',
      );

      await tester.pumpWidget(
        MaterialApp(
          theme: PorhiTheme.light,
          home: Scaffold(
            body: SingleChildScrollView(
              child: ExplanationLayersCard(
                explanation: explanation,
                languageCode: 'bn',
                envConfig: const EnvConfig(),
              ),
            ),
          ),
        ),
      );
      await tester.pump();

      expect(find.byKey(const Key('explanation_layers_card')), findsOneWidget);
      expect(find.textContaining('সরাসরি উত্তর'), findsOneWidget);
      expect(find.textContaining('গতির প্রথম সমীকরণ'), findsOneWidget);
      expect(find.textContaining('সহজ শর্টকাট টিপস'), findsOneWidget);

      // Layer 4 (Distractor) & Layer 5 (Citation) start collapsed -> tap to expand
      expect(find.textContaining('ভুল একক ব্যবহার করা হয়েছে'), findsNothing);
      await tester.tap(find.byKey(const Key('explanation_layer_header_distractors')));
      await tester.pumpAndSettle();
      expect(find.textContaining('ভুল একক ব্যবহার করা হয়েছে'), findsOneWidget);

      await tester.tap(find.byKey(const Key('explanation_layer_header_citation')));
      await tester.pumpAndSettle();
      expect(find.textContaining('পদার্থবিজ্ঞান'), findsOneWidget);
      expect(find.textContaining('৪২'), findsOneWidget);
    });

    testWidgets('ExplanationLayersCard skips empty optional layers', (tester) async {
      const partial = ExplanationLayersEntity(
        directAnswer: 'শুধুমাত্র সরাসরি উত্তর',
      );

      await tester.pumpWidget(
        MaterialApp(
          theme: PorhiTheme.light,
          home: const Scaffold(
            body: ExplanationLayersCard(
              explanation: partial,
              languageCode: 'en',
            ),
          ),
        ),
      );

      expect(find.byKey(const Key('explanation_layer_header_direct')), findsOneWidget);
      expect(find.byKey(const Key('explanation_layer_header_derivation')), findsNothing);
      expect(find.byKey(const Key('explanation_layer_header_distractors')), findsNothing);
      expect(find.byKey(const Key('explanation_layer_header_citation')), findsNothing);
      expect(find.byKey(const Key('explanation_layer_header_protip')), findsNothing);
    });

    testWidgets('CqRubricCard reveals rubric/solution, enforces bounds 0..1/2/3/4, updates total, and submits', (tester) async {
      CqSelfScoresEntity? submittedScores;
      final cq = PracticeQuestionModel.fromJson(_sampleCqJson()).toEntity();

      await tester.pumpWidget(
        MaterialApp(
          theme: PorhiTheme.light,
          home: Scaffold(
            body: SingleChildScrollView(
              child: CqRubricCard(
                question: cq,
                languageCode: 'bn',
                isSubmitting: false,
                onSubmit: (scores) {
                  submittedScores = scores;
                },
              ),
            ),
          ),
        ),
      );

      // Rubric hidden initially
      expect(find.textContaining('ত্বরণ বলে'), findsNothing);
      await tester.tap(find.byKey(const Key('cq_toggle_rubric_btn')));
      await tester.pumpAndSettle();
      expect(find.textContaining('ত্বরণ বলে'), findsOneWidget);
      expect(find.textContaining('মূল উত্তর'), findsOneWidget);

      // Initial total is 1+2+3+4 = 10 -> decrement ka (1->0), gha (4->3) => total 8
      expect(find.textContaining('১০ / ১০'), findsOneWidget);
      await tester.ensureVisible(find.byKey(const Key('cq_ka_dec')));
      await tester.tap(find.byKey(const Key('cq_ka_dec')));
      await tester.pump();
      await tester.ensureVisible(find.byKey(const Key('cq_gha_dec')));
      await tester.tap(find.byKey(const Key('cq_gha_dec')));
      await tester.pump();
      expect(find.textContaining('৮ / ১০'), findsOneWidget);

      // Trying to increment gha above 4 stays capped at 4
      await tester.ensureVisible(find.byKey(const Key('cq_gha_inc')));
      await tester.tap(find.byKey(const Key('cq_gha_inc')));
      await tester.tap(find.byKey(const Key('cq_gha_inc')));
      await tester.pump();
      expect(find.textContaining('৯ / ১০'), findsOneWidget);

      await tester.ensureVisible(find.byKey(const Key('cq_submit_btn')));
      await tester.tap(find.byKey(const Key('cq_submit_btn')));
      await tester.pump();
      expect(
        submittedScores,
        const CqSelfScoresEntity(ka: 0, kha: 2, ga: 3, gha: 4),
      );
    });
  });

  group('PracticeController, PracticeView, Binding & Routes', () {
    late _MockPracticeRepository practiceRepo;
    late _MockStudentRepository studentRepo;
    late _MockCurriculumRepository curriculumRepo;
    late _MockAuthRepository authRepo;
    late _MockContentReportRepository contentReportRepo;

    void registerDependencies() {
      Get.put<EnvConfig>(const EnvConfig(), permanent: true);
      Get.put<GetChapterPracticeQuestionsUseCase>(
        GetChapterPracticeQuestionsUseCase(practiceRepo),
      );
      Get.put<GetCachedChapterPracticeQuestionsUseCase>(
        GetCachedChapterPracticeQuestionsUseCase(practiceRepo),
      );
      Get.put<SubmitPracticeAnswerUseCase>(
        SubmitPracticeAnswerUseCase(practiceRepo),
      );
      Get.put<SubmitCqSelfAssessUseCase>(
        SubmitCqSelfAssessUseCase(practiceRepo),
      );
      Get.put<ToggleBookmarkUseCase>(ToggleBookmarkUseCase(studentRepo));
      Get.put<PatchCachedBookmarkUseCase>(
        PatchCachedBookmarkUseCase(studentRepo),
      );
      Get.put<GetCachedOverviewUseCase>(GetCachedOverviewUseCase(studentRepo));
      Get.put<GetActiveSubjectIdUseCase>(GetActiveSubjectIdUseCase(studentRepo));
      Get.put<GetChaptersUseCase>(GetChaptersUseCase(curriculumRepo));
      Get.put<GetCachedChaptersUseCase>(
        GetCachedChaptersUseCase(curriculumRepo),
      );
      Get.put<GetCachedUserUseCase>(GetCachedUserUseCase(authRepo));
      Get.put<GetLanguageUseCase>(GetLanguageUseCase(authRepo));
      Get.put<SubmitContentReportUseCase>(
        SubmitContentReportUseCase(contentReportRepo),
      );
    }

    setUp(() {
      practiceRepo = _MockPracticeRepository();
      studentRepo = _MockStudentRepository();
      curriculumRepo = _MockCurriculumRepository();
      authRepo = _MockAuthRepository();
      contentReportRepo = _MockContentReportRepository();

      when(() => authRepo.getLanguage()).thenReturn('bn');
      when(() => authRepo.getCachedUser()).thenReturn(
        const AuthUserEntity(
          id: 'u_1',
          role: 'STUDENT',
          selectedClass: StudentTrack.ssc,
        ),
      );
      when(() => studentRepo.getActiveSubjectId(any()))
          .thenReturn('sub_ssc_physics');
      when(() => studentRepo.getCachedOverview(subjectId: any(named: 'subjectId')))
          .thenAnswer((_) async => null);
      when(() => curriculumRepo.getCachedChapters(any()))
          .thenAnswer((_) async => const <ChapterEntity>[]);
      when(() => curriculumRepo.getChapters(any()))
          .thenAnswer((_) async => const Right(<ChapterEntity>[]));
      when(
        () => practiceRepo.getCachedChapterQuestions(
          chapterId: any(named: 'chapterId'),
          topicId: any(named: 'topicId'),
          difficulty: any(named: 'difficulty'),
          type: any(named: 'type'),
        ),
      ).thenAnswer((_) async => const <PracticeQuestionEntity>[]);
      when(
        () => studentRepo.toggleBookmark(
          itemId: any(named: 'itemId'),
          itemType: any(named: 'itemType'),
          titleBangla: any(named: 'titleBangla'),
          subtitleBangla: any(named: 'subtitleBangla'),
          href: any(named: 'href'),
        ),
      ).thenAnswer((_) async => const Right(true));
      when(
        () => studentRepo.syncCachedBookmark(
          subjectId: any(named: 'subjectId'),
          itemId: any(named: 'itemId'),
          itemType: any(named: 'itemType'),
          titleBangla: any(named: 'titleBangla'),
          subtitleBangla: any(named: 'subtitleBangla'),
          href: any(named: 'href'),
          bookmarked: any(named: 'bookmarked'),
        ),
      ).thenAnswer((_) async {});
    });

    test('AppPages registers AppRoutes.practice with PracticeBinding', () {
      final page = AppPages.routes.firstWhere(
        (r) => r.name == AppRoutes.practice,
      );
      expect(page.binding, isA<PracticeBinding>());
    });

    testWidgets('PracticeView completes MCQ flow, shows 6-layer explanation, session summary & retries wrong questions', (tester) async {
      final q1 = PracticeQuestionModel.fromJson(
        _sampleMcqJson(id: 'q1', difficulty: 'EASY'),
      ).toEntity();
      final q2 = PracticeQuestionModel.fromJson(
        _sampleMcqJson(id: 'q2', difficulty: 'HARD'),
      ).toEntity();

      when(
        () => practiceRepo.getChapterQuestions(
          chapterId: 'chap_1',
          topicId: any(named: 'topicId'),
          difficulty: any(named: 'difficulty'),
          mode: any(named: 'mode'),
          type: 'MCQ',
        ),
      ).thenAnswer((_) async => Right(<PracticeQuestionEntity>[q1, q2]));

      when(
        () => practiceRepo.submitPractice(
          questionId: 'q1',
          selectedOptionId: 'opt_a',
          chapterId: 'chap_1',
          topicId: any(named: 'topicId'),
          question: any(named: 'question'),
        ),
      ).thenAnswer(
        (_) async => Right(
          PracticeSubmitResultEntity(
            isCorrect: true,
            correctOptionId: 'opt_a',
            explanation: PracticeQuestionModel.fromJson(
              _sampleMcqJson(id: 'q1', includeExplanation: true),
            ).toEntity().explanation,
          ),
        ),
      );

      when(
        () => practiceRepo.submitPractice(
          questionId: 'q2',
          selectedOptionId: 'opt_b',
          chapterId: 'chap_1',
          topicId: any(named: 'topicId'),
          question: any(named: 'question'),
        ),
      ).thenAnswer(
        (_) async => Right(
          PracticeSubmitResultEntity(
            isCorrect: false,
            correctOptionId: 'opt_a',
            explanation: PracticeQuestionModel.fromJson(
              _sampleMcqJson(id: 'q2', includeExplanation: true),
            ).toEntity().explanation,
          ),
        ),
      );

      registerDependencies();

      await tester.pumpWidget(
        GetMaterialApp(
          theme: PorhiTheme.light,
          initialRoute: AppRoutes.practiceForChapter('chap_1'),
          getPages: <GetPage<dynamic>>[
            GetPage(
              name: AppRoutes.practice,
              page: () => const PracticeView(),
              binding: PracticeBinding(),
            ),
          ],
        ),
      );
      await tester.pumpAndSettle();

      // Question 1 loaded
      expect(find.textContaining('১ / ২'), findsOneWidget);
      expect(find.text('ঢাকা বোর্ড ২০২৪'), findsOneWidget);

      // Answer Q1 correctly
      await tester.ensureVisible(find.byKey(const Key('practice_option_opt_a')));
      await tester.tap(find.byKey(const Key('practice_option_opt_a')));
      await tester.pumpAndSettle();
      expect(find.byKey(const Key('explanation_layers_card')), findsOneWidget);
      expect(find.textContaining('সঠিক উত্তর'), findsOneWidget);

      // Bookmark Q1
      await tester.ensureVisible(find.byKey(const Key('practice_bookmark_btn')));
      await tester.tap(find.byKey(const Key('practice_bookmark_btn')));
      await tester.pumpAndSettle();
      verify(
        () => studentRepo.toggleBookmark(
          itemId: 'q1',
          itemType: 'question',
          titleBangla: any(named: 'titleBangla'),
          subtitleBangla: any(named: 'subtitleBangla'),
          href: any(named: 'href'),
        ),
      ).called(1);

      // Move to Q2
      await tester.ensureVisible(find.byKey(const Key('practice_next_btn')));
      await tester.tap(find.byKey(const Key('practice_next_btn')));
      await tester.pumpAndSettle();
      expect(find.textContaining('২ / ২'), findsOneWidget);

      // Answer Q2 wrongly
      await tester.ensureVisible(find.byKey(const Key('practice_option_opt_b')));
      await tester.tap(find.byKey(const Key('practice_option_opt_b')));
      await tester.pumpAndSettle();

      // Summary card appears with 1 correct, 1 wrong, 50%
      expect(find.byKey(const Key('practice_summary_card')), findsOneWidget);
      expect(find.textContaining('৫০%'), findsOneWidget);

      // Retry incorrect questions resets to only Q2 unanswered
      await tester.ensureVisible(find.byKey(const Key('practice_retry_mistakes_btn')));
      await tester.tap(find.byKey(const Key('practice_retry_mistakes_btn')));
      await tester.pumpAndSettle();
      expect(find.textContaining('১ / ১'), findsOneWidget);
      expect(find.byKey(const Key('explanation_layers_card')), findsNothing);
    });

    testWidgets('PracticeController guards stale async loads on rapid filter/mode switches', (tester) async {
      final slowEasyCompleter =
          Completer<Either<ErrorResponse, List<PracticeQuestionEntity>>>();
      final fastCqCompleter =
          Completer<Either<ErrorResponse, List<PracticeQuestionEntity>>>();

      final easyMcq = PracticeQuestionModel.fromJson(
        _sampleMcqJson(id: 'q_slow_easy', difficulty: 'EASY'),
      ).toEntity();
      final cq = PracticeQuestionModel.fromJson(
        _sampleCqJson(id: 'q_fast_cq'),
      ).toEntity();

      when(
        () => practiceRepo.getChapterQuestions(
          chapterId: 'chap_1',
          topicId: any(named: 'topicId'),
          difficulty: null,
          mode: null,
          type: 'MCQ',
        ),
      ).thenAnswer((_) => slowEasyCompleter.future);

      when(
        () => practiceRepo.getChapterQuestions(
          chapterId: 'chap_1',
          topicId: any(named: 'topicId'),
          difficulty: null,
          mode: null,
          type: 'CQ_CREATIVE',
        ),
      ).thenAnswer((_) => fastCqCompleter.future);

      registerDependencies();

      await tester.pumpWidget(
        GetMaterialApp(
          theme: PorhiTheme.light,
          initialRoute: AppRoutes.practiceForChapter('chap_1'),
          getPages: <GetPage<dynamic>>[
            GetPage(
              name: AppRoutes.practice,
              page: () => const PracticeView(),
              binding: PracticeBinding(),
            ),
          ],
        ),
      );
      await tester.pump();

      final controller = Get.find<PracticeController>();
      // Switch to CQ before initial MCQ completes
      unawaited(controller.setQuestionTypeMode('CQ_CREATIVE'));
      await tester.pump();

      fastCqCompleter.complete(Right(<PracticeQuestionEntity>[cq]));
      await tester.pumpAndSettle();

      // Now complete stale MCQ load — must NOT overwrite CQ questions
      slowEasyCompleter.complete(Right(<PracticeQuestionEntity>[easyMcq]));
      await tester.pumpAndSettle();

      expect(controller.questionTypeMode.value, 'CQ_CREATIVE');
      expect(controller.questions, hasLength(1));
      expect(controller.questions.single.id, 'q_fast_cq');
      expect(find.byKey(const Key('cq_rubric_card')), findsOneWidget);
    });

    testWidgets('Report Error button opens ReportContentSheet for question', (tester) async {
      final q1 = PracticeQuestionModel.fromJson(_sampleMcqJson(id: 'q_rep_1')).toEntity();
      when(
        () => practiceRepo.getChapterQuestions(
          chapterId: 'chap_1',
          topicId: any(named: 'topicId'),
          difficulty: any(named: 'difficulty'),
          mode: any(named: 'mode'),
          type: 'MCQ',
        ),
      ).thenAnswer((_) async => Right(<PracticeQuestionEntity>[q1]));

      registerDependencies();

      await tester.pumpWidget(
        GetMaterialApp(
          theme: PorhiTheme.light,
          initialRoute: AppRoutes.practiceForChapter('chap_1'),
          getPages: <GetPage<dynamic>>[
            GetPage(
              name: AppRoutes.practice,
              page: () => const PracticeView(),
              binding: PracticeBinding(),
            ),
          ],
        ),
      );
      await tester.pumpAndSettle();

      await tester.tap(find.byKey(const Key('practice_report_btn')));
      await tester.pumpAndSettle();

      expect(find.byKey(const Key('report_content_sheet')), findsOneWidget);
    });

    testWidgets('PracticeView handles CQ self-assessment flow, difficulty filter chips, and in-flight duplicate tap guard', (tester) async {
      final slowSubmitCompleter =
          Completer<Either<ErrorResponse, PracticeSubmitResultEntity>>();
      final mcqEasy = PracticeQuestionModel.fromJson(
        _sampleMcqJson(id: 'q_easy_1', difficulty: 'EASY'),
      ).toEntity();
      final mcqHard = PracticeQuestionModel.fromJson(
        _sampleMcqJson(id: 'q_hard_1', difficulty: 'HARD'),
      ).toEntity();
      final cq = PracticeQuestionModel.fromJson(
        _sampleCqJson(id: 'q_cq_flow'),
      ).toEntity();

      when(
        () => practiceRepo.getChapterQuestions(
          chapterId: 'chap_1',
          topicId: any(named: 'topicId'),
          difficulty: null,
          mode: null,
          type: 'MCQ',
        ),
      ).thenAnswer((_) async => Right(<PracticeQuestionEntity>[mcqEasy]));

      when(
        () => practiceRepo.getChapterQuestions(
          chapterId: 'chap_1',
          topicId: any(named: 'topicId'),
          difficulty: 'HARD',
          mode: null,
          type: 'MCQ',
        ),
      ).thenAnswer((_) async => Right(<PracticeQuestionEntity>[mcqHard]));

      when(
        () => practiceRepo.getChapterQuestions(
          chapterId: 'chap_1',
          topicId: any(named: 'topicId'),
          difficulty: 'HARD',
          mode: null,
          type: 'CQ_CREATIVE',
        ),
      ).thenAnswer((_) async => Right(<PracticeQuestionEntity>[cq]));

      when(
        () => practiceRepo.submitPractice(
          questionId: 'q_easy_1',
          selectedOptionId: 'opt_a',
          chapterId: 'chap_1',
          topicId: any(named: 'topicId'),
          question: any(named: 'question'),
        ),
      ).thenAnswer((_) => slowSubmitCompleter.future);

      when(
        () => practiceRepo.submitCqSelfAssess(
          questionId: 'q_cq_flow',
          selfScores: any(named: 'selfScores'),
          topicId: any(named: 'topicId'),
        ),
      ).thenAnswer(
        (_) async => const Right(
          CqSelfAssessResultEntity(
            questionId: 'q_cq_flow',
            selfScores: CqSelfScoresEntity(ka: 1, kha: 2, ga: 3, gha: 4),
            totalScore: 10,
            maxScore: 10,
          ),
        ),
      );

      registerDependencies();

      await tester.pumpWidget(
        GetMaterialApp(
          theme: PorhiTheme.light,
          initialRoute: AppRoutes.practiceForChapter('chap_1'),
          getPages: <GetPage<dynamic>>[
            GetPage(
              name: AppRoutes.practice,
              page: () => const PracticeView(),
              binding: PracticeBinding(),
            ),
          ],
        ),
      );
      await tester.pumpAndSettle();

      // Double-tap option while in-flight -> only one submitPractice call
      await tester.ensureVisible(find.byKey(const Key('practice_option_opt_a')));
      await tester.tap(find.byKey(const Key('practice_option_opt_a')));
      await tester.pump();
      await tester.tap(find.byKey(const Key('practice_option_opt_b')));
      await tester.pump();

      slowSubmitCompleter.complete(
        const Right(
          PracticeSubmitResultEntity(
            isCorrect: true,
            correctOptionId: 'opt_a',
          ),
        ),
      );
      await tester.pumpAndSettle();
      verify(
        () => practiceRepo.submitPractice(
          questionId: 'q_easy_1',
          selectedOptionId: 'opt_a',
          chapterId: 'chap_1',
          topicId: any(named: 'topicId'),
          question: any(named: 'question'),
        ),
      ).called(1);

      // Tap HARD difficulty chip
      await tester.ensureVisible(find.byKey(const Key('practice_diff_HARD')));
      await tester.tap(find.byKey(const Key('practice_diff_HARD')));
      await tester.pumpAndSettle();
      expect(find.byKey(const ValueKey<String>('question_card_q_hard_1')), findsOneWidget);

      // Switch to CQ tab & submit self-assessment
      await tester.ensureVisible(find.byKey(const Key('practice_tab_cq')));
      await tester.tap(find.byKey(const Key('practice_tab_cq')));
      await tester.pumpAndSettle();
      expect(find.byKey(const Key('cq_rubric_card')), findsOneWidget);

      await tester.ensureVisible(find.byKey(const Key('cq_submit_btn')));
      await tester.tap(find.byKey(const Key('cq_submit_btn')));
      await tester.pumpAndSettle();
      expect(find.byKey(const Key('cq_submitted_badge')), findsOneWidget);
      expect(find.textContaining('১০ / ১০'), findsWidgets);
    });

    testWidgets('PracticeBinding disposes PracticeController cleanly when popped (no fenix: true)', (tester) async {
      when(
        () => practiceRepo.getChapterQuestions(
          chapterId: 'chap_pop',
          topicId: any(named: 'topicId'),
          difficulty: any(named: 'difficulty'),
          mode: any(named: 'mode'),
          type: 'MCQ',
        ),
      ).thenAnswer((_) async => const Right(<PracticeQuestionEntity>[]));

      registerDependencies();

      await tester.pumpWidget(
        GetMaterialApp(
          theme: PorhiTheme.light,
          initialRoute: '/root',
          getPages: <GetPage<dynamic>>[
            GetPage(
              name: '/root',
              page: () => const Scaffold(body: Text('Root')),
            ),
            GetPage(
              name: AppRoutes.practice,
              page: () => const PracticeView(),
              binding: PracticeBinding(),
            ),
          ],
        ),
      );
      await tester.pumpAndSettle();

      unawaited(Get.toNamed(AppRoutes.practiceForChapter('chap_pop')));
      await tester.pumpAndSettle();
      expect(Get.isRegistered<PracticeController>(), isTrue);

      Get.back();
      await tester.pumpAndSettle();
      expect(Get.isRegistered<PracticeController>(), isFalse);
    });
  });
}
