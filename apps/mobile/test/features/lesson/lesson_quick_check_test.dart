import 'package:common/common.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:get/get.dart';
import 'package:mocktail/mocktail.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/core/theme/porhi_theme.dart';
import 'package:porhi/features/auth/domain/repositories/auth_repository.dart';
import 'package:porhi/features/auth/domain/usecases/auth_usecases.dart';
import 'package:porhi/features/curriculum/domain/repositories/curriculum_repository.dart';
import 'package:porhi/features/curriculum/domain/usecases/curriculum_usecases.dart';
import 'package:porhi/features/dashboard/domain/repositories/student_repository.dart';
import 'package:porhi/features/dashboard/domain/usecases/student_usecases.dart';
import 'package:porhi/features/lesson/domain/entities/lesson_entities.dart';
import 'package:porhi/features/lesson/domain/repositories/lesson_repository.dart';
import 'package:porhi/features/lesson/domain/usecases/lesson_usecases.dart';
import 'package:porhi/features/lesson/presentation/lesson/controller/lesson_controller.dart';
import 'package:porhi/features/lesson/presentation/lesson/widgets/lesson_quick_check_card.dart';

class _MockLessonRepository extends Mock implements LessonRepository {}

class _MockStudentRepository extends Mock implements StudentRepository {}

class _MockCurriculumRepository extends Mock implements CurriculumRepository {}

class _MockAuthRepository extends Mock implements AuthRepository {}

void main() {
  setUpAll(() {
    registerFallbackValue(
      const QuickCheckQuestionEntity(
        id: 'fallback_q',
        topicId: 'fallback_topic',
        stem: 'fallback',
        options: <QuickCheckOptionEntity>[],
      ),
    );
  });

  tearDown(() {
    Get.reset();
  });

  group('LessonQuickCheckCard widget tests', () {
    const question1 = QuickCheckQuestionEntity(
      id: 'q_1',
      topicId: 'top_1',
      stem: 'গতির সমীকরণ কোনটি?',
      options: <QuickCheckOptionEntity>[
        QuickCheckOptionEntity(id: 'opt_1_a', text: 'v = u + at'),
        QuickCheckOptionEntity(id: 'opt_1_b', text: 's = vt^2'),
      ],
    );

    const question2 = QuickCheckQuestionEntity(
      id: 'q_2',
      topicId: 'top_1',
      stem: 'ত্বরণের একক কী?',
      options: <QuickCheckOptionEntity>[
        QuickCheckOptionEntity(id: 'opt_2_a', text: 'm/s'),
        QuickCheckOptionEntity(id: 'opt_2_b', text: 'm/s^2'),
      ],
    );

    testWidgets('renders active question and options with question counter',
        (tester) async {
      String? selected;

      await tester.pumpWidget(
        MaterialApp(
          theme: PorhiTheme.light,
          home: Scaffold(
            body: LessonQuickCheckCard(
              language: AppLanguage.bn,
              question: question1,
              questionIndex: 0,
              totalQuestions: 2,
              selectedOptionId: null,
              submitResult: null,
              isSubmitting: false,
              onSelectOption: (id) => selected = id,
              onNextQuestion: () {},
            ),
          ),
        ),
      );

      expect(find.text('পাঠের শিখন যাচাই • কুইক প্র্যাকটিস'), findsOneWidget);
      expect(find.text('১/২'), findsOneWidget);
      expect(find.text('গতির সমীকরণ কোনটি?'), findsOneWidget);
      expect(find.text('v = u + at'), findsOneWidget);
      expect(find.text('s = vt^2'), findsOneWidget);

      await tester.tap(find.byKey(const Key('quick_check_option_opt_1_a')));
      expect(selected, 'opt_1_a');
    });

    testWidgets('renders Next Question button on intermediate questions',
        (tester) async {
      var nextPressed = false;

      await tester.pumpWidget(
        MaterialApp(
          theme: PorhiTheme.light,
          home: Scaffold(
            body: LessonQuickCheckCard(
              language: AppLanguage.bn,
              question: question1,
              questionIndex: 0,
              totalQuestions: 2,
              selectedOptionId: 'opt_1_a',
              submitResult: const QuickCheckSubmitResultEntity(
                isCorrect: true,
                correctOptionId: 'opt_1_a',
                explanation: <String, dynamic>{
                  'directAnswer': 'সঠিক উত্তর v = u + at',
                },
                isQueuedOffline: false,
              ),
              isSubmitting: false,
              onSelectOption: (_) {},
              onNextQuestion: () => nextPressed = true,
            ),
          ),
        ),
      );

      expect(find.text('চমৎকার! তোমার উত্তর সঠিক হয়েছে।'), findsOneWidget);
      expect(find.text('পরবর্তী প্রশ্ন'), findsOneWidget);

      await tester.tap(find.byKey(const Key('quick_check_next_question_btn')));
      expect(nextPressed, isTrue);
    });

    testWidgets('renders See Results button on the last question',
        (tester) async {
      var resultsPressed = false;

      await tester.pumpWidget(
        MaterialApp(
          theme: PorhiTheme.light,
          home: Scaffold(
            body: LessonQuickCheckCard(
              language: AppLanguage.bn,
              question: question2,
              questionIndex: 1,
              totalQuestions: 2,
              selectedOptionId: 'opt_2_b',
              submitResult: const QuickCheckSubmitResultEntity(
                isCorrect: true,
                correctOptionId: 'opt_2_b',
                explanation: <String, dynamic>{
                  'directAnswer': 'সঠিক উত্তর m/s^2',
                },
                isQueuedOffline: false,
              ),
              isSubmitting: false,
              onSelectOption: (_) {},
              onNextQuestion: () => resultsPressed = true,
            ),
          ),
        ),
      );

      expect(find.text('ফলাফল দেখো'), findsOneWidget);

      await tester.tap(find.byKey(const Key('quick_check_next_question_btn')));
      expect(resultsPressed, isTrue);
    });

    testWidgets(
        'renders completion summary with correct count and prompt to start over (Bangla)',
        (tester) async {
      var restartPressed = false;

      await tester.pumpWidget(
        MaterialApp(
          theme: PorhiTheme.light,
          home: Scaffold(
            body: LessonQuickCheckCard(
              language: AppLanguage.bn,
              question: question2,
              questionIndex: 1,
              totalQuestions: 2,
              selectedOptionId: 'opt_2_b',
              submitResult: null,
              isSubmitting: false,
              isCompleted: true,
              correctCount: 2,
              onSelectOption: (_) {},
              onNextQuestion: () {},
              onRestart: () => restartPressed = true,
            ),
          ),
        ),
      );

      // Verify completion header
      expect(find.text('পাঠের শিখন যাচাই • ফলাফল'), findsOneWidget);
      expect(
        find.text('সবগুলো বহুনির্বাচনি (MCQ) প্রশ্ন সম্পন্ন হয়েছে'),
        findsOneWidget,
      );

      // Verify score display
      expect(find.text('সঠিক উত্তর: ২ / ২'), findsOneWidget);
      expect(
        find.text('তুমি ২ টির মধ্যে ২ টি প্রশ্নের সঠিক উত্তর দিয়েছো (১০০% নির্ভুলতা)।'),
        findsOneWidget,
      );

      // Verify prompt asking user if they want to start over
      expect(
        find.text('তুমি কি আবার পরীক্ষাটি শুরু করতে চাও?'),
        findsOneWidget,
      );

      // Verify restart button
      expect(find.byKey(const Key('quick_check_restart_btn')), findsOneWidget);
      expect(find.text('আবার শুরু করো'), findsOneWidget);

      await tester.tap(find.byKey(const Key('quick_check_restart_btn')));
      expect(restartPressed, isTrue);
    });

    testWidgets(
        'renders completion summary in English with correct count and start over prompt',
        (tester) async {
      var restartPressed = false;

      await tester.pumpWidget(
        MaterialApp(
          theme: PorhiTheme.light,
          home: Scaffold(
            body: LessonQuickCheckCard(
              language: AppLanguage.en,
              question: question2,
              questionIndex: 1,
              totalQuestions: 4,
              selectedOptionId: null,
              submitResult: null,
              isSubmitting: false,
              isCompleted: true,
              correctCount: 3,
              onSelectOption: (_) {},
              onNextQuestion: () {},
              onRestart: () => restartPressed = true,
            ),
          ),
        ),
      );

      expect(find.text('Lesson Quick Check • Results'), findsOneWidget);
      expect(
        find.text('All multiple-choice (MCQ) questions completed'),
        findsOneWidget,
      );
      expect(find.text('Correct Answers: 3 / 4'), findsOneWidget);
      expect(
        find.text(
          'You answered 3 out of 4 questions correctly (75% accuracy).',
        ),
        findsOneWidget,
      );
      expect(
        find.text('Would you like to start over the test?'),
        findsOneWidget,
      );
      expect(find.text('Start Over'), findsOneWidget);

      await tester.tap(find.byKey(const Key('quick_check_restart_btn')));
      expect(restartPressed, isTrue);
    });
  });

  group('LessonController quick check session flow', () {
    late _MockLessonRepository mockLessonRepo;
    late _MockStudentRepository mockStudentRepo;
    late _MockCurriculumRepository mockCurriculumRepo;
    late _MockAuthRepository mockAuthRepo;
    late LessonController controller;

    setUp(() {
      mockLessonRepo = _MockLessonRepository();
      mockStudentRepo = _MockStudentRepository();
      mockCurriculumRepo = _MockCurriculumRepository();
      mockAuthRepo = _MockAuthRepository();

      when(() => mockAuthRepo.getLanguage()).thenReturn('bn');

      controller = LessonController(
        getLessonByTopicUseCase: GetLessonByTopicUseCase(mockLessonRepo),
        getCachedLessonByTopicUseCase:
            GetCachedLessonByTopicUseCase(mockLessonRepo),
        completeLessonUseCase: CompleteLessonUseCase(mockLessonRepo),
        toggleBookmarkUseCase: ToggleBookmarkUseCase(mockStudentRepo),
        patchCachedBookmarkUseCase: PatchCachedBookmarkUseCase(mockStudentRepo),
        saveNoteUseCase: SaveNoteUseCase(mockStudentRepo),
        getLocalLessonNoteUseCase: GetLocalLessonNoteUseCase(mockLessonRepo),
        saveLocalLessonNoteUseCase: SaveLocalLessonNoteUseCase(mockLessonRepo),
        getTopicQuickQuestionsUseCase:
            GetTopicQuickQuestionsUseCase(mockLessonRepo),
        getCachedTopicQuickQuestionsUseCase:
            GetCachedTopicQuickQuestionsUseCase(mockLessonRepo),
        submitQuickCheckAttemptUseCase:
            SubmitQuickCheckAttemptUseCase(mockLessonRepo),
        submitFeedbackUseCase: SubmitFeedbackUseCase(mockStudentRepo),
        getCachedOverviewUseCase: GetCachedOverviewUseCase(mockStudentRepo),
        getChaptersUseCase: GetChaptersUseCase(mockCurriculumRepo),
        getCachedChaptersUseCase: GetCachedChaptersUseCase(mockCurriculumRepo),
        getOfflineChapterPackUseCase:
            GetOfflineChapterPackUseCase(mockCurriculumRepo),
        getCachedUserUseCase: GetCachedUserUseCase(mockAuthRepo),
        getLanguageUseCase: GetLanguageUseCase(mockAuthRepo),
        getActiveSubjectIdUseCase: GetActiveSubjectIdUseCase(mockStudentRepo),
      );
    });

    test('full multi-question answering, results tracking, completion, and restart flow',
        () async {
      const q1 = QuickCheckQuestionEntity(
        id: 'q_1',
        topicId: 'top_1',
        stem: 'প্রশ্ন ১',
        options: <QuickCheckOptionEntity>[
          QuickCheckOptionEntity(id: 'opt_1_a', text: 'A'),
          QuickCheckOptionEntity(id: 'opt_1_b', text: 'B'),
        ],
      );
      const q2 = QuickCheckQuestionEntity(
        id: 'q_2',
        topicId: 'top_1',
        stem: 'প্রশ্ন ২',
        options: <QuickCheckOptionEntity>[
          QuickCheckOptionEntity(id: 'opt_2_a', text: 'A'),
          QuickCheckOptionEntity(id: 'opt_2_b', text: 'B'),
        ],
      );

      controller.quickQuestions.assignAll(<QuickCheckQuestionEntity>[q1, q2]);
      expect(controller.currentQuestionIndex.value, 0);
      expect(controller.isQuickCheckCompleted.value, isFalse);
      expect(controller.quickCheckCorrectCount, 0);
      expect(controller.quickCheckTotalQuestions, 2);

      // Answer question 1 correctly
      when(
        () => mockLessonRepo.submitQuickCheckAttempt(
          question: q1,
          selectedOptionId: 'opt_1_a',
        ),
      ).thenAnswer(
        (_) async => const Right(
          QuickCheckSubmitResultEntity(
            isCorrect: true,
            correctOptionId: 'opt_1_a',
            explanation: <String, dynamic>{'directAnswer': 'সঠিক'},
            isQueuedOffline: false,
          ),
        ),
      );

      await controller.submitQuickCheckAnswer('opt_1_a');
      expect(controller.selectedOptionId.value, 'opt_1_a');
      expect(controller.quickCheckResult.value?.isCorrect, isTrue);
      expect(controller.quickCheckCorrectCount, 1);
      expect(controller.isQuickCheckCompleted.value, isFalse);

      // Advance to next question
      controller.nextQuickQuestion();
      expect(controller.currentQuestionIndex.value, 1);
      expect(controller.currentQuickQuestion?.id, 'q_2');
      expect(controller.selectedOptionId.value, isNull);
      expect(controller.quickCheckResult.value, isNull);

      // Answer question 2 incorrectly
      when(
        () => mockLessonRepo.submitQuickCheckAttempt(
          question: q2,
          selectedOptionId: 'opt_2_a',
        ),
      ).thenAnswer(
        (_) async => const Right(
          QuickCheckSubmitResultEntity(
            isCorrect: false,
            correctOptionId: 'opt_2_b',
            explanation: <String, dynamic>{'directAnswer': 'ভুল'},
            isQueuedOffline: false,
          ),
        ),
      );

      await controller.submitQuickCheckAnswer('opt_2_a');
      expect(controller.selectedOptionId.value, 'opt_2_a');
      expect(controller.quickCheckResult.value?.isCorrect, isFalse);
      expect(controller.quickCheckCorrectCount, 1); // 1 out of 2 correct
      expect(controller.quickCheckAccuracyPercent, 50);

      // Now on the last question, calling nextQuickQuestion completes the session
      controller.nextQuickQuestion();
      expect(controller.isQuickCheckCompleted.value, isTrue);
      expect(controller.quickCheckCorrectCount, 1);
      expect(controller.quickCheckTotalQuestions, 2);

      // Restart quick check session
      controller.restartQuickCheck();
      expect(controller.currentQuestionIndex.value, 0);
      expect(controller.selectedOptionId.value, isNull);
      expect(controller.quickCheckResult.value, isNull);
      expect(controller.quickCheckAnswers.isEmpty, isTrue);
      expect(controller.quickCheckSelectedOptions.isEmpty, isTrue);
      expect(controller.isQuickCheckCompleted.value, isFalse);
      expect(controller.quickCheckCorrectCount, 0);
    });
  });
}
