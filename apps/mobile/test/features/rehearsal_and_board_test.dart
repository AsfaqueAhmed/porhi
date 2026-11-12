import 'dart:async';

import 'package:common/common.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:get/get.dart';
import 'package:mocktail/mocktail.dart';
import 'package:network/network.dart';
import 'package:porhi/app/env.dart';
import 'package:porhi/core/theme/porhi_theme.dart';
import 'package:porhi/features/auth/domain/entities/auth_user_entity.dart';
import 'package:porhi/features/auth/domain/repositories/auth_repository.dart';
import 'package:porhi/features/auth/domain/usecases/auth_usecases.dart';
import 'package:porhi/features/board_archive/domain/entities/board_archive_entities.dart';
import 'package:porhi/features/board_archive/domain/repositories/board_archive_repository.dart';
import 'package:porhi/features/board_archive/domain/usecases/board_archive_usecases.dart';
import 'package:porhi/features/board_archive/domain/utils/board_parser.dart';
import 'package:porhi/features/board_archive/presentation/board_archive/binding/board_archive_binding.dart';
import 'package:porhi/features/board_archive/presentation/board_archive/controller/board_archive_controller.dart';
import 'package:porhi/features/board_archive/presentation/board_archive/view/board_archive_view.dart';
import 'package:porhi/features/curriculum/domain/entities/curriculum_entities.dart';
import 'package:porhi/features/curriculum/domain/repositories/curriculum_repository.dart';
import 'package:porhi/features/curriculum/domain/usecases/curriculum_usecases.dart';
import 'package:porhi/features/dashboard/domain/repositories/student_repository.dart';
import 'package:porhi/features/dashboard/domain/usecases/student_usecases.dart';
import 'package:porhi/features/exam/domain/entities/exam_entities.dart';
import 'package:porhi/features/practice/domain/entities/practice_entities.dart';
import 'package:porhi/features/practice/domain/repositories/practice_repository.dart';
import 'package:porhi/features/practice/domain/usecases/practice_usecases.dart';
import 'package:porhi/features/practice/presentation/shared/cq_rubric_card.dart';
import 'package:porhi/features/practice/presentation/shared/explanation_layers_card.dart';
import 'package:porhi/features/rehearsal/data/models/rehearsal_models.dart';
import 'package:porhi/features/rehearsal/domain/entities/rehearsal_entities.dart';
import 'package:porhi/features/rehearsal/domain/repositories/rehearsal_repository.dart';
import 'package:porhi/features/rehearsal/domain/usecases/rehearsal_usecases.dart';
import 'package:porhi/features/rehearsal/presentation/rehearsal/binding/rehearsal_binding.dart';
import 'package:porhi/features/rehearsal/presentation/rehearsal/controller/rehearsal_controller.dart';
import 'package:porhi/features/rehearsal/presentation/rehearsal/view/rehearsal_view.dart';
import 'package:porhi/routes/app_pages.dart';
import 'package:porhi/routes/app_routes.dart';

class _MockRehearsalRepository extends Mock implements RehearsalRepository {}

class _MockBoardArchiveRepository extends Mock
    implements BoardArchiveRepository {}

class _MockCurriculumRepository extends Mock implements CurriculumRepository {}

class _MockPracticeRepository extends Mock implements PracticeRepository {}

class _MockStudentRepository extends Mock implements StudentRepository {}

class _MockAuthRepository extends Mock implements AuthRepository {}

List<SubjectEntity> _sampleSubjects() => const <SubjectEntity>[
      SubjectEntity(
        id: 'sub_phy',
        code: 'ssc_physics',
        nameBangla: 'পদার্থবিজ্ঞান',
        program: StudentTrack.ssc,
        isReady: true,
      ),
      SubjectEntity(
        id: 'sub_chem',
        code: 'ssc_chemistry',
        nameBangla: 'রসায়ন',
        program: StudentTrack.ssc,
        isReady: true,
      ),
      SubjectEntity(
        id: 'sub_math',
        code: 'ssc_math',
        nameBangla: 'গণিত',
        program: StudentTrack.ssc,
        isReady: true,
      ),
    ];

ExamSessionStartEntity _samplePaperSession({
  required String sessionId,
  required String subjectId,
  int durationSeconds = 300,
}) {
  return ExamSessionStartEntity(
    sessionId: sessionId,
    testType: ExamTestType.subjectTest,
    subjectId: subjectId,
    totalQuestions: 2,
    durationSeconds: durationSeconds,
    negativeRatio: 0.25,
    questions: <ExamQuestionEntity>[
      ExamQuestionEntity(
        id: '${sessionId}_q1',
        topicId: 'top_1',
        stem: 'প্রশ্ন ১ ($subjectId): বেগের এসআই একক কী?',
        options: const <ExamOptionEntity>[
          ExamOptionEntity(id: 'opt_a', text: 'm/s'),
          ExamOptionEntity(id: 'opt_b', text: 'm/s²'),
          ExamOptionEntity(id: 'opt_c', text: 'N'),
          ExamOptionEntity(id: 'opt_d', text: 'J'),
        ],
      ),
      ExamQuestionEntity(
        id: '${sessionId}_q2',
        topicId: 'top_2',
        stem: 'প্রশ্ন ২ ($subjectId): বলের একক কোনটি?',
        options: const <ExamOptionEntity>[
          ExamOptionEntity(id: 'opt_a', text: 'নিউটন'),
          ExamOptionEntity(id: 'opt_b', text: 'জুল'),
          ExamOptionEntity(id: 'opt_c', text: 'ওয়াট'),
          ExamOptionEntity(id: 'opt_d', text: 'প্যাসকেল'),
        ],
      ),
    ],
  );
}

MultiExamRehearsalEntity _sampleRehearsal({
  required MultiRehearsalStatus status,
  int currentPaperIndex = 0,
  double? totalScore,
  int totalMarks = 4,
}) {
  return MultiExamRehearsalEntity(
    id: 'reh_1',
    titleBangla: 'SSC বিজ্ঞান ডাবল রিহার্সাল',
    program: 'SSC',
    currentPaperIndex: currentPaperIndex,
    status: status,
    totalScore: totalScore,
    totalMarks: totalMarks,
    startedAt: DateTime.utc(2026, 11, 12),
    submittedAt: status == MultiRehearsalStatus.completed
        ? DateTime.utc(2026, 11, 12, 1)
        : null,
    papers: <RehearsalPaperStateEntity>[
      RehearsalPaperStateEntity(
        paperIndex: 0,
        subjectId: 'sub_phy',
        subjectCode: 'ssc_physics',
        subjectNameBangla: 'পদার্থবিজ্ঞান',
        labelBangla: 'পত্র ১: পদার্থবিজ্ঞান',
        questionCount: 2,
        durationMinutes: 5,
        status: status == MultiRehearsalStatus.inProgress && currentPaperIndex == 0
            ? RehearsalPaperStatus.active
            : RehearsalPaperStatus.submitted,
        sessionId: 'sess_p1',
        score: status == MultiRehearsalStatus.inProgress && currentPaperIndex == 0
            ? null
            : 2.0,
        totalMarks: 2,
        correctCount:
            status == MultiRehearsalStatus.inProgress && currentPaperIndex == 0
                ? null
                : 2,
        wrongCount:
            status == MultiRehearsalStatus.inProgress && currentPaperIndex == 0
                ? null
                : 0,
        unansweredCount:
            status == MultiRehearsalStatus.inProgress && currentPaperIndex == 0
                ? null
                : 0,
        timeSpentSeconds:
            status == MultiRehearsalStatus.inProgress && currentPaperIndex == 0
                ? null
                : 45,
      ),
      RehearsalPaperStateEntity(
        paperIndex: 1,
        subjectId: 'sub_chem',
        subjectCode: 'ssc_chemistry',
        subjectNameBangla: 'রসায়ন',
        labelBangla: 'পত্র ২: রসায়ন',
        questionCount: 2,
        durationMinutes: 5,
        status: status == MultiRehearsalStatus.completed
            ? RehearsalPaperStatus.submitted
            : (status == MultiRehearsalStatus.inProgress &&
                    currentPaperIndex == 1
                ? RehearsalPaperStatus.active
                : RehearsalPaperStatus.pending),
        sessionId: status == MultiRehearsalStatus.intermission ? null : 'sess_p2',
        score: status == MultiRehearsalStatus.completed ? 1.5 : null,
        totalMarks: status == MultiRehearsalStatus.completed ? 2 : null,
        correctCount: status == MultiRehearsalStatus.completed ? 1 : null,
        wrongCount: status == MultiRehearsalStatus.completed ? 0 : null,
        unansweredCount: status == MultiRehearsalStatus.completed ? 1 : null,
        timeSpentSeconds: status == MultiRehearsalStatus.completed ? 30 : null,
      ),
    ],
  );
}

BoardArchiveFiltersEntity _sampleFilters() => const BoardArchiveFiltersEntity(
      boards: <BoardFacetItemEntity>[
        BoardFacetItemEntity(
          key: BoardKey.dhaka,
          labelBangla: 'ঢাকা বোর্ড',
          labelEnglish: 'Dhaka Board',
          count: 12,
        ),
        BoardFacetItemEntity(
          key: BoardKey.rajshahi,
          labelBangla: 'রাজশাহী বোর্ড',
          labelEnglish: 'Rajshahi Board',
          count: 8,
        ),
      ],
      years: <YearFacetItemEntity>[
        YearFacetItemEntity(year: 2025, count: 10),
        YearFacetItemEntity(year: 2024, count: 10),
      ],
      subjects: <BoardSubjectFacetEntity>[
        BoardSubjectFacetEntity(
          id: 'sub_phy',
          code: 'ssc_physics',
          nameBangla: 'পদার্থবিজ্ঞান',
          program: 'SSC',
          count: 15,
        ),
      ],
      totalVerifiedQuestions: 20,
    );

BoardQuestionItemEntity _sampleBoardMcq({String id = 'bq_mcq_1'}) {
  return BoardQuestionItemEntity(
    id: id,
    topicId: 'top_1',
    type: 'MCQ',
    stem: 'নিচের কোনটি স্কেলার রাশি?',
    options: const <PracticeOptionEntity>[
      PracticeOptionEntity(id: 'opt_a', text: 'কাজ', isCorrect: true),
      PracticeOptionEntity(id: 'opt_b', text: 'বল', isCorrect: false),
      PracticeOptionEntity(id: 'opt_c', text: 'বেগ', isCorrect: false),
      PracticeOptionEntity(id: 'opt_d', text: 'ত্বরণ', isCorrect: false),
    ],
    correctOption: 'opt_a',
    explanation: const ExplanationLayersEntity(
      directAnswer: 'সঠিক উত্তর: কাজ।',
      coreConcept: 'যে রাশির কেবল মান আছে দিক নেই তাকে স্কেলার রাশি বলে।',
      stepDerivation: 'কাজ = বল ও সরণের ডট গুণফল, তাই এটি স্কেলার।',
      proTipShortcut: 'কাজ, শক্তি, ক্ষমতা — সব স্কেলার!',
    ),
    difficulty: 'EASY',
    boardSource: 'ঢাকা বোর্ড ২০২৪',
    boardKey: BoardKey.dhaka,
    boardKeys: const <BoardKey>[BoardKey.dhaka],
    boardLabelBangla: 'ঢাকা বোর্ড',
    boardYear: 2024,
    isVerifiedBoard: true,
    subjectId: 'sub_phy',
    subjectCode: 'ssc_physics',
    subjectNameBangla: 'পদার্থবিজ্ঞান',
    program: 'SSC',
    chapterId: 'ch_1',
    chapterTitleBangla: 'বল ও গতি',
    topicTitleBangla: 'স্কেলার ও ভেক্টর',
  );
}

BoardQuestionItemEntity _sampleBoardCq({String id = 'bq_cq_1'}) {
  return BoardQuestionItemEntity(
    id: id,
    topicId: 'top_2',
    type: 'CQ_CREATIVE',
    stem: r'একটি গাড়ি স্থিরাবস্থা থেকে $2\text{ m/s}^2$ ত্বরণে ১০ সেকেন্ড চলল।',
    cqRubric: const CqRubricEntity(
      ka: CqRubricPartEntity(mark: 1, criteria: 'ত্বরণের সংজ্ঞা লিখতে হবে।'),
      kha: CqRubricPartEntity(mark: 2, criteria: 'বেগ-সময় লেখচিত্রের ঢাল ব্যাখ্যা।'),
      ga: CqRubricPartEntity(mark: 3, criteria: 'সঠিক সূত্রে অতিক্রান্ত দূরত্ব 100m নির্ণয়।'),
      gha: CqRubricPartEntity(mark: 4, criteria: 'গাণিতিক বিশ্লেষণসহ তুলনামূলক সিদ্ধান্ত।'),
    ),
    explanation: const ExplanationLayersEntity(
      directAnswer: 'গ-এর উত্তর: 100 মিটার।',
      stepDerivation: 's = ut + 0.5 a t^2 = 0 + 0.5 * 2 * 100 = 100 m',
    ),
    difficulty: 'MEDIUM',
    boardSource: 'রাজশাহী বোর্ড ২০২৫',
    boardKey: BoardKey.rajshahi,
    boardKeys: const <BoardKey>[BoardKey.rajshahi],
    boardLabelBangla: 'রাজশাহী বোর্ড',
    boardYear: 2025,
    isVerifiedBoard: true,
    subjectId: 'sub_phy',
    subjectCode: 'ssc_physics',
    subjectNameBangla: 'পদার্থবিজ্ঞান',
    program: 'SSC',
    chapterId: 'ch_1',
    chapterTitleBangla: 'বল ও গতি',
    topicTitleBangla: 'গতির সমীকরণ',
  );
}

void main() {
  setUpAll(() {
    registerFallbackValue(const BoardArchiveQueryParams());
    registerFallbackValue(const CqSelfScoresEntity());
    registerFallbackValue(<RehearsalPaperInputEntity>[]);
    registerFallbackValue(<ExamAnswerInputEntity>[]);
  });

  setUp(() {
    Get.testMode = true;
    Get.reset();
  });

  tearDown(() {
    Get.reset();
  });

  group('Dart parseBoardSource & matchesBoardYearFilter parity', () {
    test('parses Bangla board name & Bangla digits', () {
      final parsed = parseBoardSource('ঢাকা বোর্ড ২০২৪');
      expect(parsed.boardKey, BoardKey.dhaka);
      expect(parsed.boardKeys, <BoardKey>[BoardKey.dhaka]);
      expect(parsed.boardLabelBangla, 'ঢাকা বোর্ড');
      expect(parsed.year, 2024);
      expect(parsed.isVerifiedBoard, isTrue);
    });

    test('supports Mymensingh spellings and legacy English board spellings', () {
      final mym1 = parseBoardSource('ময়মনসিংহ বোর্ড ২০২৩');
      final mym2 = parseBoardSource('ময়মনসিংহ বোর্ড ২০২৩');
      expect(mym1.boardKey, BoardKey.mymensingh);
      expect(mym2.boardKey, BoardKey.mymensingh);
      expect(mym1.year, 2023);

      expect(parseBoardSource('Chittagong Board 2022').boardKey,
          BoardKey.chattogram);
      expect(parseBoardSource('Chattogram Board 2024').boardKey,
          BoardKey.chattogram);
      expect(parseBoardSource('Comilla Board 2021').boardKey, BoardKey.cumilla);
      expect(parseBoardSource('Cumilla Board 2024').boardKey, BoardKey.cumilla);
      expect(parseBoardSource('Jessore Board 2020').boardKey, BoardKey.jashore);
      expect(parseBoardSource('Jashore Board 2024').boardKey, BoardKey.jashore);
      expect(parseBoardSource('Barisal Board 2021').boardKey, BoardKey.barishal);
      expect(parseBoardSource('Barishal Board 2024').boardKey, BoardKey.barishal);
    });

    test('parses multi-board strings and rejects explicit practice/model tags', () {
      final multi = parseBoardSource('ঢাকা ও সিলেট বোর্ড ২০২৪');
      expect(multi.boardKey, BoardKey.dhaka);
      expect(multi.boardKeys, <BoardKey>[BoardKey.dhaka, BoardKey.sylhet]);
      expect(multi.isVerifiedBoard, isTrue);

      final banglaModel = parseBoardSource('ঢাকা বোর্ড মডেল ২০২৪');
      expect(banglaModel.boardKey, BoardKey.dhaka);
      expect(banglaModel.isVerifiedBoard, isFalse);

      final englishPractice = parseBoardSource('Rajshahi Practice 2023');
      expect(englishPractice.boardKey, BoardKey.rajshahi);
      expect(englishPractice.isVerifiedBoard, isFalse);

      final empty = parseBoardSource('   ');
      expect(empty.boardKey, BoardKey.other);
      expect(empty.isVerifiedBoard, isFalse);
      expect(empty.year, isNull);
    });

    test('matchesBoardYearFilter handles ALL, 2024+, exact year, and Bangla digits', () {
      expect(matchesBoardYearFilter(null, 'ALL'), isTrue);
      expect(matchesBoardYearFilter(null, '2024+'), isFalse);
      expect(matchesBoardYearFilter(2024, '2024+'), isTrue);
      expect(matchesBoardYearFilter(2025, '2024+'), isTrue);
      expect(matchesBoardYearFilter(2023, '2024+'), isFalse);
      expect(matchesBoardYearFilter(2024, '২০২৪'), isTrue);
      expect(matchesBoardYearFilter(2023, '২০২৪'), isFalse);
    });
  });

  group('MultiExamRehearsalListModel BaseWrapperModel unwrapping', () {
    test('unwraps BaseWrapperModel json array cleanly', () {
      final model = MultiExamRehearsalListModel.fromJson(<String, dynamic>{
        'json': <Map<String, dynamic>>[
          <String, dynamic>{
            'id': 'reh_hist_1',
            'titleBangla': 'মডেল রিহার্সাল ১',
            'program': 'SSC',
            'currentPaperIndex': 1,
            'status': 'COMPLETED',
            'totalScore': 18.5,
            'totalMarks': 20,
            'startedAt': '2026-11-12T10:00:00.000Z',
            'submittedAt': '2026-11-12T10:30:00.000Z',
            'papers': const <Map<String, dynamic>>[],
          },
        ],
      });

      final items = model.toEntities();
      expect(items, hasLength(1));
      expect(items.first.id, 'reh_hist_1');
      expect(items.first.status, MultiRehearsalStatus.completed);
      expect(items.first.totalScore, 18.5);
    });
  });

  group('RehearsalController & RehearsalView', () {
    late _MockRehearsalRepository rehearsalRepo;
    late _MockCurriculumRepository curriculumRepo;
    late _MockAuthRepository authRepo;

    setUp(() {
      rehearsalRepo = _MockRehearsalRepository();
      curriculumRepo = _MockCurriculumRepository();
      authRepo = _MockAuthRepository();

      when(() => authRepo.getLanguage()).thenReturn('bn');
      when(() => curriculumRepo.getSubjects())
          .thenAnswer((_) async => Right(_sampleSubjects()));
      when(() => curriculumRepo.getCachedSubjects())
          .thenAnswer((_) async => _sampleSubjects());
      when(() => rehearsalRepo.getRehearsalHistory())
          .thenAnswer((_) async => const Right(<MultiExamRehearsalEntity>[]));
    });

    RehearsalController buildController() {
      return RehearsalController(
        startRehearsalUseCase: StartRehearsalUseCase(rehearsalRepo),
        getRehearsalHistoryUseCase: GetRehearsalHistoryUseCase(rehearsalRepo),
        getRehearsalUseCase: GetRehearsalUseCase(rehearsalRepo),
        startRehearsalPaperUseCase: StartRehearsalPaperUseCase(rehearsalRepo),
        submitRehearsalPaperUseCase: SubmitRehearsalPaperUseCase(rehearsalRepo),
        getSubjectsUseCase: GetSubjectsUseCase(curriculumRepo),
        getCachedSubjectsUseCase: GetCachedSubjectsUseCase(curriculumRepo),
        getLanguageUseCase: GetLanguageUseCase(authRepo),
        envConfig: const EnvConfig(apiBaseUrl: 'http://localhost:3001'),
      );
    }

    test('validates paper count <2 and >5 and normalizes Bangla numerals', () async {
      final useCase = StartRehearsalUseCase(rehearsalRepo);
      final tooFew = await useCase(
        titleBangla: 'টেস্ট',
        papers: const <RehearsalPaperInputEntity>[
          RehearsalPaperInputEntity(
            subjectId: 'sub_phy',
            questionCount: 5,
            durationMinutes: 5,
          ),
        ],
      );
      expect(tooFew.isLeft(), isTrue);

      final tooMany = await useCase(
        titleBangla: 'টেস্ট',
        papers: List<RehearsalPaperInputEntity>.generate(
          6,
          (i) => RehearsalPaperInputEntity(
            subjectId: 'sub_$i',
            questionCount: 5,
            durationMinutes: 5,
          ),
        ),
      );
      expect(tooMany.isLeft(), isTrue);

      final controller = Get.put(buildController());
      await Future<void>.delayed(Duration.zero);

      expect(controller.papers.length, 2);
      // Cannot remove below 2
      controller.removePaper(0);
      expect(controller.papers.length, 2);

      // Can add up to 5 and not beyond 5
      controller.addPaper();
      controller.addPaper();
      controller.addPaper();
      expect(controller.papers.length, 5);
      controller.addPaper();
      expect(controller.papers.length, 5);

      // Bangla numeral normalization
      controller.updatePaperQuestionCount(0, '১৫');
      controller.updatePaperDurationMinutes(0, '২০');
      expect(controller.papers[0].questionCount, 15);
      expect(controller.papers[0].durationMinutes, 20);
    });

    testWidgets(
      'full multi-paper flow: start -> Paper 1 solve -> submit -> INTERMISSION -> start Paper 2 -> COMPLETED summary',
      (tester) async {
        final p1Rehearsal = _sampleRehearsal(
          status: MultiRehearsalStatus.inProgress,
          currentPaperIndex: 0,
        );
        final p1Session = _samplePaperSession(
          sessionId: 'sess_p1',
          subjectId: 'sub_phy',
          durationSeconds: 120,
        );
        final intermissionRehearsal = _sampleRehearsal(
          status: MultiRehearsalStatus.intermission,
          currentPaperIndex: 1,
        );
        final p2Rehearsal = _sampleRehearsal(
          status: MultiRehearsalStatus.inProgress,
          currentPaperIndex: 1,
        );
        final p2Session = _samplePaperSession(
          sessionId: 'sess_p2',
          subjectId: 'sub_chem',
          durationSeconds: 120,
        );
        final completedRehearsal = _sampleRehearsal(
          status: MultiRehearsalStatus.completed,
          currentPaperIndex: 1,
          totalScore: 3.5,
          totalMarks: 4,
        );

        const paper1Result = ExamResultEntity(
          sessionId: 'sess_p1',
          testType: ExamTestType.subjectTest,
          subjectId: 'sub_phy',
          score: 2.0,
          totalQuestions: 2,
          correctCount: 2,
          wrongCount: 0,
          skippedCount: 0,
          durationSeconds: 120,
          negativeRatio: 0.25,
          negativeDeduction: 0,
        );
        const paper2Result = ExamResultEntity(
          sessionId: 'sess_p2',
          testType: ExamTestType.subjectTest,
          subjectId: 'sub_chem',
          score: 1.5,
          totalQuestions: 2,
          correctCount: 1,
          wrongCount: 0,
          skippedCount: 1,
          durationSeconds: 120,
          negativeRatio: 0.25,
          negativeDeduction: 0,
        );

        when(
          () => rehearsalRepo.startRehearsal(
            titleBangla: any(named: 'titleBangla'),
            program: any(named: 'program'),
            negativeRatio: any(named: 'negativeRatio'),
            papers: any(named: 'papers'),
          ),
        ).thenAnswer(
          (_) async => Right(
            RehearsalSessionEnvelopeEntity(
              rehearsal: p1Rehearsal,
              activeSession: p1Session,
            ),
          ),
        );

        when(
          () => rehearsalRepo.submitRehearsalPaper(
            rehearsalId: 'reh_1',
            paperIndex: 0,
            answers: any(named: 'answers'),
          ),
        ).thenAnswer(
          (_) async => Right(
            RehearsalPaperSubmitResultEntity(
              rehearsal: intermissionRehearsal,
              paperResult: paper1Result,
            ),
          ),
        );

        when(
          () => rehearsalRepo.startRehearsalPaper(
            rehearsalId: 'reh_1',
            paperIndex: 1,
          ),
        ).thenAnswer(
          (_) async => Right(
            RehearsalSessionEnvelopeEntity(
              rehearsal: p2Rehearsal,
              activeSession: p2Session,
            ),
          ),
        );

        when(
          () => rehearsalRepo.submitRehearsalPaper(
            rehearsalId: 'reh_1',
            paperIndex: 1,
            answers: any(named: 'answers'),
          ),
        ).thenAnswer(
          (_) async => Right(
            RehearsalPaperSubmitResultEntity(
              rehearsal: completedRehearsal,
              paperResult: paper2Result,
            ),
          ),
        );

        final controller = Get.put(buildController());

        await tester.pumpWidget(
          GetMaterialApp(
            theme: PorhiTheme.light,
            home: const RehearsalView(),
          ),
        );
        await tester.pumpAndSettle();

        // Stage 1: Setup view
        expect(find.byKey(const Key('rehearsal_start_btn')), findsOneWidget);
        await tester.ensureVisible(find.byKey(const Key('rehearsal_start_btn')));
        await tester.tap(find.byKey(const Key('rehearsal_start_btn')));
        await tester.pumpAndSettle();

        // Stage 2: Paper 1 active runner
        expect(controller.hasActiveTimer, isTrue);
        expect(find.textContaining('পত্র ১: পদার্থবিজ্ঞান'), findsWidgets);
        await tester.tap(find.byKey(const Key('rehearsal_option_opt_a')));
        await tester.pump();
        await tester.ensureVisible(
          find.byKey(const Key('rehearsal_submit_paper_btn')),
        );
        await tester.tap(find.byKey(const Key('rehearsal_submit_paper_btn')));
        await tester.pumpAndSettle();

        // Stage 3: Intermission
        expect(controller.hasActiveTimer, isFalse);
        expect(
          find.byKey(const Key('rehearsal_start_next_paper_btn')),
          findsOneWidget,
        );
        await tester.ensureVisible(
          find.byKey(const Key('rehearsal_start_next_paper_btn')),
        );
        await tester.tap(find.byKey(const Key('rehearsal_start_next_paper_btn')));
        await tester.pumpAndSettle();

        // Stage 2: Paper 2 active runner
        expect(controller.hasActiveTimer, isTrue);
        expect(find.textContaining('পত্র ২: রসায়ন'), findsWidgets);
        await tester.ensureVisible(
          find.byKey(const Key('rehearsal_submit_paper_btn')),
        );
        await tester.tap(find.byKey(const Key('rehearsal_submit_paper_btn')));
        await tester.pumpAndSettle();

        // Stage 4: Final COMPLETED summary
        expect(controller.hasActiveTimer, isFalse);
        expect(find.byKey(const Key('rehearsal_summary_view')), findsOneWidget);
        expect(find.byKey(const Key('rehearsal_new_btn')), findsOneWidget);
      },
    );

    testWidgets(
      'countdown auto-submits at 0, recovers on submit error, and disposes timer onClose',
      (tester) async {
        final p1Rehearsal = _sampleRehearsal(
          status: MultiRehearsalStatus.inProgress,
          currentPaperIndex: 0,
        );
        final shortSession = _samplePaperSession(
          sessionId: 'sess_short',
          subjectId: 'sub_phy',
          durationSeconds: 2,
        );
        final intermissionRehearsal = _sampleRehearsal(
          status: MultiRehearsalStatus.intermission,
          currentPaperIndex: 1,
        );
        const paper1Result = ExamResultEntity(
          sessionId: 'sess_short',
          testType: ExamTestType.subjectTest,
          subjectId: 'sub_phy',
          score: 0,
          totalQuestions: 2,
          correctCount: 0,
          wrongCount: 0,
          skippedCount: 2,
          durationSeconds: 2,
          negativeRatio: 0.25,
          negativeDeduction: 0,
        );

        var submitAttempts = 0;
        when(
          () => rehearsalRepo.startRehearsal(
            titleBangla: any(named: 'titleBangla'),
            program: any(named: 'program'),
            negativeRatio: any(named: 'negativeRatio'),
            papers: any(named: 'papers'),
          ),
        ).thenAnswer(
          (_) async => Right(
            RehearsalSessionEnvelopeEntity(
              rehearsal: p1Rehearsal,
              activeSession: shortSession,
            ),
          ),
        );
        when(
          () => rehearsalRepo.submitRehearsalPaper(
            rehearsalId: 'reh_1',
            paperIndex: 0,
            answers: any(named: 'answers'),
          ),
        ).thenAnswer((_) async {
          submitAttempts++;
          if (submitAttempts == 1) {
            return Left(
              ErrorResponse(
                message: 'Temporary network error',
                data: ApiResponseErrorType.noInternet,
              ),
            );
          }
          return Right(
            RehearsalPaperSubmitResultEntity(
              rehearsal: intermissionRehearsal,
              paperResult: paper1Result,
            ),
          );
        });

        final controller = Get.put(buildController());
        await tester.pumpWidget(
          GetMaterialApp(
            theme: PorhiTheme.light,
            home: const RehearsalView(),
          ),
        );
        await tester.pumpAndSettle();

        await controller.startRehearsal();
        await tester.pump();
        expect(controller.hasActiveTimer, isTrue);

        // Advance 2 seconds to hit 0 and trigger autosubmit (fails first time)
        await tester.pump(const Duration(seconds: 2));
        await tester.pump();
        expect(submitAttempts, 1);
        expect(controller.errorMessage.value, isNotNull);
        expect(controller.isSubmitting.value, isFalse);

        // Retry manually after error recovery
        await controller.submitActivePaper();
        await tester.pump();
        expect(submitAttempts, 2);
        expect(
          controller.rehearsal.value?.status,
          MultiRehearsalStatus.intermission,
        );

        // Dispose via Get.delete verifies timer & controllers dispose cleanly
        await Get.delete<RehearsalController>(force: true);
        expect(controller.hasActiveTimer, isFalse);
      },
    );

    testWidgets('RehearsalView renders cleanly at 320dp without overflow', (
      tester,
    ) async {
      tester.view.physicalSize = const Size(320, 760);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);

      Get.put(buildController());
      await tester.pumpWidget(
        GetMaterialApp(
          theme: PorhiTheme.light,
          home: const RehearsalView(),
        ),
      );
      await tester.pumpAndSettle();
      expect(tester.takeException(), isNull);
    });
  });

  group('BoardArchiveController & BoardArchiveView', () {
    late _MockBoardArchiveRepository boardRepo;
    late _MockPracticeRepository practiceRepo;
    late _MockStudentRepository studentRepo;
    late _MockAuthRepository authRepo;

    setUp(() {
      boardRepo = _MockBoardArchiveRepository();
      practiceRepo = _MockPracticeRepository();
      studentRepo = _MockStudentRepository();
      authRepo = _MockAuthRepository();

      when(() => authRepo.getLanguage()).thenReturn('bn');
      when(() => boardRepo.getFilters())
          .thenAnswer((_) async => Right(_sampleFilters()));
    });

    BoardArchiveController buildController() {
      return BoardArchiveController(
        getFiltersUseCase: GetBoardArchiveFiltersUseCase(boardRepo),
        getQuestionsUseCase: GetBoardArchiveQuestionsUseCase(boardRepo),
        submitCqSelfAssessUseCase: SubmitCqSelfAssessUseCase(practiceRepo),
        toggleBookmarkUseCase: ToggleBookmarkUseCase(studentRepo),
        getLanguageUseCase: GetLanguageUseCase(authRepo),
        envConfig: const EnvConfig(apiBaseUrl: 'http://localhost:3001'),
      );
    }

    test('loadQuestions guards stale responses with generation counter', () async {
      final firstCompleter =
          Completer<Either<ErrorResponse, BoardArchivePageEntity>>();
      final secondCompleter =
          Completer<Either<ErrorResponse, BoardArchivePageEntity>>();

      var callCount = 0;
      when(() => boardRepo.getQuestions(any())).thenAnswer((_) {
        callCount++;
        if (callCount == 1) return firstCompleter.future;
        return secondCompleter.future;
      });

      final controller = Get.put(buildController());
      // Let onInit fire call 1, then immediately trigger a new filter load (call 2)
      await Future<void>.delayed(Duration.zero);
      controller.selectBoard('DHAKA');

      // Resolve newer call 2 first
      secondCompleter.complete(
        Right(
          BoardArchivePageEntity(
            items: <BoardQuestionItemEntity>[_sampleBoardMcq(id: 'bq_new')],
            total: 1,
            page: 1,
            limit: 15,
            totalPages: 1,
          ),
        ),
      );
      await Future<void>.delayed(Duration.zero);

      expect(controller.questions.map((e) => e.id).toList(), <String>['bq_new']);
      expect(controller.isLoading.value, isFalse);

      // Now resolve stale call 1 with different item — must be ignored!
      firstCompleter.complete(
        Right(
          BoardArchivePageEntity(
            items: <BoardQuestionItemEntity>[_sampleBoardMcq(id: 'bq_stale')],
            total: 1,
            page: 1,
            limit: 15,
            totalPages: 1,
          ),
        ),
      );
      await Future<void>.delayed(Duration.zero);

      expect(controller.questions.map((e) => e.id).toList(), <String>['bq_new']);
    });

    testWidgets(
      'MCQ interactive solve hides answer before selection then reveals ExplanationLayersCard, CQ reveals CqRubricCard, and pagination works',
      (tester) async {
        final page1 = BoardArchivePageEntity(
          items: <BoardQuestionItemEntity>[
            _sampleBoardMcq(id: 'bq_mcq_1'),
            _sampleBoardCq(id: 'bq_cq_1'),
          ],
          total: 3,
          page: 1,
          limit: 2,
          totalPages: 2,
        );
        final page2 = BoardArchivePageEntity(
          items: <BoardQuestionItemEntity>[
            _sampleBoardMcq(id: 'bq_mcq_2'),
          ],
          total: 3,
          page: 2,
          limit: 2,
          totalPages: 2,
        );

        when(() => boardRepo.getQuestions(any())).thenAnswer((inv) async {
          final q = inv.positionalArguments.first as BoardArchiveQueryParams;
          if (q.page == 2) return Right(page2);
          return Right(page1);
        });

        when(
          () => practiceRepo.submitCqSelfAssess(
            questionId: any(named: 'questionId'),
            selfScores: any(named: 'selfScores'),
            topicId: any(named: 'topicId'),
          ),
        ).thenAnswer(
          (_) async => const Right(
            CqSelfAssessResultEntity(
              questionId: 'bq_cq_1',
              selfScores: CqSelfScoresEntity(ka: 1, kha: 1),
              totalScore: 2,
            ),
          ),
        );

        Get.put(buildController());
        await tester.pumpWidget(
          GetMaterialApp(
            theme: PorhiTheme.light,
            home: const BoardArchiveView(),
          ),
        );
        await tester.pumpAndSettle();

        // Answer & ExplanationLayersCard must NOT be visible before MCQ option selection
        expect(find.byType(ExplanationLayersCard), findsNothing);
        expect(find.textContaining('সঠিক উত্তর: কাজ'), findsNothing);

        // Tap MCQ option
        final mcqOptFinder =
            find.byKey(const Key('board_mcq_opt_bq_mcq_1_opt_a'));
        await tester.scrollUntilVisible(
          mcqOptFinder,
          200,
          scrollable: find.byType(Scrollable).first,
        );
        await tester.pumpAndSettle();
        await tester.tap(mcqOptFinder);
        await tester.pumpAndSettle();

        // Now ExplanationLayersCard is revealed
        expect(find.byType(ExplanationLayersCard), findsOneWidget);
        expect(find.textContaining('সঠিক উত্তর: কাজ'), findsOneWidget);

        // CQ item renders shared CqRubricCard and expands rubric on tap
        final cqToggleFinder = find.byKey(const Key('cq_toggle_rubric_btn'));
        await tester.scrollUntilVisible(
          cqToggleFinder,
          200,
          scrollable: find.byType(Scrollable).first,
        );
        await tester.pumpAndSettle();
        expect(find.byType(CqRubricCard), findsOneWidget);
        await tester.tap(cqToggleFinder);
        await tester.pumpAndSettle();
        expect(find.byKey(const Key('cq_rubric_revealed_box')), findsOneWidget);

        // Pagination to page 2
        final nextPageFinder = find.byKey(const Key('board_next_page_btn'));
        await tester.scrollUntilVisible(
          nextPageFinder,
          200,
          scrollable: find.byType(Scrollable).first,
        );
        await tester.pumpAndSettle();
        await tester.tap(nextPageFinder);
        await tester.pumpAndSettle();

        verify(
          () => boardRepo.getQuestions(
            any(that: isA<BoardArchiveQueryParams>().having((p) => p.page, 'page', 2)),
          ),
        ).called(1);
      },
    );

    testWidgets('shows error+retry state and empty state cleanly', (tester) async {
      var attempt = 0;
      when(() => boardRepo.getQuestions(any())).thenAnswer((_) async {
        attempt++;
        if (attempt == 1) {
          return Left(
            ErrorResponse(
              message: 'Server unreachable',
              data: ApiResponseErrorType.noInternet,
            ),
          );
        }
        return const Right(
          BoardArchivePageEntity(
            items: <BoardQuestionItemEntity>[],
            total: 0,
            page: 1,
            limit: 15,
            totalPages: 1,
          ),
        );
      });

      Get.put(buildController());
      await tester.pumpWidget(
        GetMaterialApp(
          theme: PorhiTheme.light,
          home: const BoardArchiveView(),
        ),
      );
      await tester.pumpAndSettle();

      expect(find.byKey(const Key('board_retry_btn')), findsOneWidget);
      await tester.tap(find.byKey(const Key('board_retry_btn')));
      await tester.pumpAndSettle();

      expect(find.byKey(const Key('board_empty_state')), findsOneWidget);
    });

    testWidgets('BoardArchiveView renders cleanly at 320dp without overflow', (
      tester,
    ) async {
      tester.view.physicalSize = const Size(320, 760);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);

      when(() => boardRepo.getQuestions(any())).thenAnswer(
        (_) async => Right(
          BoardArchivePageEntity(
            items: <BoardQuestionItemEntity>[
              _sampleBoardMcq(),
              _sampleBoardCq(),
            ],
            total: 2,
            page: 1,
            limit: 15,
            totalPages: 1,
          ),
        ),
      );

      Get.put(buildController());
      await tester.pumpWidget(
        GetMaterialApp(
          theme: PorhiTheme.light,
          home: const BoardArchiveView(),
        ),
      );
      await tester.pumpAndSettle();
      expect(tester.takeException(), isNull);
    });
  });

  group('Route registration, ordering, and clean disposal', () {
    testWidgets(
      'AppRoutes.examRehearsal resolves to RehearsalView before /exam/:chapterId and AppRoutes.boardArchive resolves to BoardArchiveView, disposing controllers on pop',
      (tester) async {
        final rehearsalRepo = _MockRehearsalRepository();
        final boardRepo = _MockBoardArchiveRepository();
        final curriculumRepo = _MockCurriculumRepository();
        final practiceRepo = _MockPracticeRepository();
        final studentRepo = _MockStudentRepository();
        final authRepo = _MockAuthRepository();

        when(() => authRepo.getLanguage()).thenReturn('bn');
        when(() => curriculumRepo.getSubjects())
            .thenAnswer((_) async => Right(_sampleSubjects()));
        when(() => curriculumRepo.getCachedSubjects())
            .thenAnswer((_) async => _sampleSubjects());
        when(() => rehearsalRepo.getRehearsalHistory())
            .thenAnswer((_) async => const Right(<MultiExamRehearsalEntity>[]));
        when(() => boardRepo.getFilters())
            .thenAnswer((_) async => Right(_sampleFilters()));
        when(() => boardRepo.getQuestions(any())).thenAnswer(
          (_) async => const Right(
            BoardArchivePageEntity(
              items: <BoardQuestionItemEntity>[],
              total: 0,
              page: 1,
              limit: 15,
              totalPages: 1,
            ),
          ),
        );

        Get.put(StartRehearsalUseCase(rehearsalRepo));
        Get.put(GetRehearsalHistoryUseCase(rehearsalRepo));
        Get.put(GetRehearsalUseCase(rehearsalRepo));
        Get.put(StartRehearsalPaperUseCase(rehearsalRepo));
        Get.put(SubmitRehearsalPaperUseCase(rehearsalRepo));
        Get.put(GetSubjectsUseCase(curriculumRepo));
        Get.put(GetCachedSubjectsUseCase(curriculumRepo));
        Get.put(GetBoardArchiveFiltersUseCase(boardRepo));
        Get.put(GetBoardArchiveQuestionsUseCase(boardRepo));
        Get.put(SubmitCqSelfAssessUseCase(practiceRepo));
        Get.put(ToggleBookmarkUseCase(studentRepo));
        Get.put(GetLanguageUseCase(authRepo));

        await tester.pumpWidget(
          GetMaterialApp(
            theme: PorhiTheme.light,
            initialRoute: '/root',
            getPages: <GetPage<dynamic>>[
              GetPage(
                name: '/root',
                page: () => const Scaffold(body: Center(child: Text('Root'))),
              ),
              ...AppPages.routes,
            ],
          ),
        );
        await tester.pumpAndSettle();

        // 1. Navigate to /exam/rehearsal -> must open RehearsalView (NOT ExamSetupView!)
        unawaited(Get.toNamed(AppRoutes.examRehearsal));
        await tester.pumpAndSettle();
        expect(find.byType(RehearsalView), findsOneWidget);
        expect(Get.isRegistered<RehearsalController>(), isTrue);

        // Pop -> RehearsalController must be disposed (no fenix: true)
        Get.back<void>();
        await tester.pumpAndSettle();
        expect(Get.isRegistered<RehearsalController>(), isFalse);

        // 2. Navigate to /board-archive -> must open BoardArchiveView
        unawaited(Get.toNamed(AppRoutes.boardArchive));
        await tester.pumpAndSettle();
        expect(find.byType(BoardArchiveView), findsOneWidget);
        expect(Get.isRegistered<BoardArchiveController>(), isTrue);

        // Pop -> BoardArchiveController must be disposed (no fenix: true)
        Get.back<void>();
        await tester.pumpAndSettle();
        expect(Get.isRegistered<BoardArchiveController>(), isFalse);

        // Verify binding types exist cleanly
        expect(RehearsalBinding(), isA<Bindings>());
        expect(BoardArchiveBinding(), isA<Bindings>());
      },
    );
  });
}
