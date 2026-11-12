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
import 'package:porhi/core/storage/preferences_storage_service.dart';
import 'package:porhi/core/sync/offline_sync_service.dart';
import 'package:porhi/core/theme/porhi_theme.dart';
import 'package:porhi/core/widgets/lesson_audio_player.dart';
import 'package:porhi/core/widgets/rich_content/audio_player_tile.dart';
import 'package:porhi/core/widgets/rich_content/rich_content_view.dart';
import 'package:porhi/features/auth/domain/entities/auth_user_entity.dart';
import 'package:porhi/features/auth/domain/repositories/auth_repository.dart';
import 'package:porhi/features/auth/domain/usecases/auth_usecases.dart';
import 'package:porhi/features/content_report/data/datasources/content_report_remote_datasource.dart';
import 'package:porhi/features/content_report/data/models/content_report_model.dart';
import 'package:porhi/features/content_report/data/repositories/content_report_repository_impl.dart';
import 'package:porhi/features/content_report/domain/entities/content_report_entity.dart';
import 'package:porhi/features/content_report/domain/repositories/content_report_repository.dart';
import 'package:porhi/features/content_report/domain/usecases/content_report_usecases.dart';
import 'package:porhi/features/content_report/presentation/report_sheet/report_content_sheet.dart';
import 'package:porhi/features/curriculum/domain/entities/curriculum_entities.dart';
import 'package:porhi/features/curriculum/domain/repositories/curriculum_repository.dart';
import 'package:porhi/features/curriculum/domain/usecases/curriculum_usecases.dart';
import 'package:porhi/features/curriculum/presentation/curriculum/binding/curriculum_binding.dart';
import 'package:porhi/features/curriculum/presentation/curriculum/view/chapter_index_view.dart';
import 'package:porhi/features/dashboard/domain/entities/student_overview_entity.dart';
import 'package:porhi/features/dashboard/domain/repositories/student_repository.dart';
import 'package:porhi/features/dashboard/domain/usecases/student_usecases.dart';
import 'package:porhi/features/dashboard/presentation/dashboard/binding/dashboard_binding.dart';
import 'package:porhi/features/dashboard/presentation/dashboard/view/dashboard_view.dart';
import 'package:porhi/features/lesson/data/datasources/lesson_local_datasource.dart';
import 'package:porhi/features/lesson/data/datasources/lesson_remote_datasource.dart';
import 'package:porhi/features/lesson/data/models/lesson_models.dart';
import 'package:porhi/features/lesson/data/repositories/lesson_repository_impl.dart';
import 'package:porhi/features/lesson/domain/entities/lesson_entities.dart';
import 'package:porhi/features/lesson/domain/repositories/lesson_repository.dart';
import 'package:porhi/features/lesson/domain/usecases/lesson_usecases.dart';
import 'package:porhi/features/lesson/presentation/lesson/binding/lesson_binding.dart';
import 'package:porhi/features/lesson/presentation/lesson/controller/lesson_controller.dart';
import 'package:porhi/features/lesson/presentation/lesson/view/lesson_view.dart';
import 'package:porhi/features/lesson/presentation/lesson/widgets/lesson_quick_check_card.dart';
import 'package:porhi/routes/app_routes.dart';
import 'package:shared_preferences/shared_preferences.dart';

class _MockLessonRemoteDataSource extends Mock
    implements LessonRemoteDataSource {}

class _MockContentReportRemoteDataSource extends Mock
    implements ContentReportRemoteDataSource {}

class _MockLessonRepository extends Mock implements LessonRepository {}

class _MockContentReportRepository extends Mock
    implements ContentReportRepository {}

class _MockStudentRepository extends Mock implements StudentRepository {}

class _MockCurriculumRepository extends Mock implements CurriculumRepository {}

class _MockAuthRepository extends Mock implements AuthRepository {}

class _FakeAudioBackend implements LessonAudioBackend {
  final StreamController<Duration> _posController =
      StreamController<Duration>.broadcast();
  final StreamController<Duration?> _durController =
      StreamController<Duration?>.broadcast();
  final StreamController<bool> _playController =
      StreamController<bool>.broadcast();

  String? lastUrl;

  @override
  Stream<Duration?> get durationStream => _durController.stream;

  @override
  Stream<bool> get playingStream => _playController.stream;

  @override
  Stream<Duration> get positionStream => _posController.stream;

  @override
  Future<void> dispose() async {
    await _posController.close();
    await _durController.close();
    await _playController.close();
  }

  @override
  Future<void> pause() async {
    _playController.add(false);
  }

  @override
  Future<void> play() async {
    _playController.add(true);
  }

  @override
  Future<void> seek(Duration position) async {
    _posController.add(position);
  }

  @override
  Future<void> setSpeed(double speed) async {}

  @override
  Future<Duration?> setUrl(String url) async {
    lastUrl = url;
    const dur = Duration(seconds: 90);
    _durController.add(dur);
    return dur;
  }
}

class _FakeTtsBackend implements LessonTtsBackend {
  void Function()? _completionHandler;

  @override
  void setCompletionHandler(void Function() handler) {
    _completionHandler = handler;
  }

  @override
  Future<void> setLanguage(String language) async {}

  @override
  Future<void> setSpeechRate(double rate) async {}

  @override
  Future<void> speak(String text) async {
    _completionHandler?.call();
  }

  @override
  Future<void> stop() async {}
}

Map<String, dynamic> _sampleLessonJson({
  String id = 'lesson_motion_1',
  String topicId = 'top_motion_eq',
  String titleBangla = 'গতির সমীকরণসমূহ',
  String chapterId = 'chap_ssc_phy_2',
  String chapterTitle = 'গতি (Motion)',
  String subjectId = 'sub_ssc_physics',
}) =>
    <String, dynamic>{
      'id': id,
      'topicId': topicId,
      'titleBangla': titleBangla,
      'learningGoal': r'ত্বরণ ও বেগের সম্পর্ক $v = u + at$ প্রতিপাদন করতে পারবে।',
      'explanation': r'সুষম ত্বরণের ক্ষেত্রে $$v = u + at$$ এবং $s = ut + \frac{1}{2}at^2$।',
      'interactiveWidgetUrl': '/labs/motion-simulator.html',
      'audioUrl': '/audio/motion-eq.mp3',
      'audioDurationSeconds': 90,
      'importantTerms': <Map<String, dynamic>>[
        <String, dynamic>{
          'termBangla': 'আদিবেগ',
          'termEnglish': 'Initial Velocity (u)',
          'definition': 'গতি শুরুর মুহূর্তে বস্তুর বেগ।',
        },
      ],
      'workedExample': <String, dynamic>{
        'problem': r'একটি গাড়ি স্থির অবস্থা থেকে $2\text{ m/s}^2$ ত্বরণে $5\text{ s}$ চলল।',
        'stepByStepSolution': r'$$v = 0 + 2 \times 5 = 10\text{ m/s}$$',
      },
      'memoryAid': r'সময় না থাকলে সরাসরি $v^2 = u^2 + 2as$ ব্যবহার করো।',
      'version': 2,
      'topic': <String, dynamic>{
        'id': topicId,
        'titleBangla': titleBangla,
        'chapter': <String, dynamic>{
          'id': chapterId,
          'titleBangla': chapterTitle,
          'subject': <String, dynamic>{
            'id': subjectId,
            'code': 'ssc_physics',
            'nameBangla': 'পদার্থবিজ্ঞান',
          },
        },
      },
    };

Map<String, dynamic> _sampleQuickQuestionJson({
  String id = 'q_motion_1',
  String topicId = 'top_motion_eq',
  bool includeIsCorrect = false,
  Map<String, dynamic>? explanation,
}) =>
    <String, dynamic>{
      'id': id,
      'topicId': topicId,
      'type': 'MCQ',
      'stem': r'স্থির অবস্থান থেকে $2\text{ m/s}^2$ ত্বরণে $5\text{ s}$ পর বেগ কত?',
      'options': <Map<String, dynamic>>[
        <String, dynamic>{
          'id': 'opt_a',
          'text': r'$5\text{ m/s}$',
          if (includeIsCorrect) 'isCorrect': false,
        },
        <String, dynamic>{
          'id': 'opt_b',
          'text': r'$10\text{ m/s}$',
          if (includeIsCorrect) 'isCorrect': true,
        },
      ],
      'explanation': ?explanation,
      'difficulty': 'MEDIUM',
    };

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  setUpAll(() {
    registerFallbackValue(
      const QuickCheckQuestionEntity(
        id: 'q_fallback',
        topicId: 't_fallback',
        stem: 'stem',
      ),
    );
    registerFallbackValue(ReportContentType.lesson);
    registerFallbackValue(ReportCategory.wrongAnswer);
  });

  group('LessonModels & ContentReportModel', () {
    test('LessonDetailModel parses GET /lessons/topic/:topicId hierarchy', () {
      final model = LessonDetailModel.fromJson(_sampleLessonJson());
      final entity = model.toEntity();

      expect(entity.id, 'lesson_motion_1');
      expect(entity.topicId, 'top_motion_eq');
      expect(entity.chapterId, 'chap_ssc_phy_2');
      expect(entity.chapterTitle, 'গতি (Motion)');
      expect(entity.subjectId, 'sub_ssc_physics');
      expect(entity.importantTerms.single.termBangla, 'আদিবেগ');
      expect(entity.workedExample?.problem, contains('ত্বরণে'));
      expect(entity.interactiveWidgetUrl, '/labs/motion-simulator.html');
      expect(entity.audioUrl, '/audio/motion-eq.mp3');
      expect(entity.audioDurationSeconds, 90);
    });

    test('QuickCheckQuestionListModel unwraps BaseWrapperModel json array', () {
      final wrapped = QuickCheckQuestionListModel.fromJson(<String, dynamic>{
        'json': <Map<String, dynamic>>[_sampleQuickQuestionJson()],
      });

      expect(wrapped.questions, hasLength(1));
      expect(wrapped.questions.single.id, 'q_motion_1');
      expect(wrapped.questions.single.options, hasLength(2));
    });

    test('ContentReportModel parses POST /content-reports response', () {
      final model = ContentReportModel.fromJson(<String, dynamic>{
        'id': 'rep_1',
        'contentType': 'LESSON',
        'contentId': 'lesson_motion_1',
        'topicId': 'top_motion_eq',
        'category': 'TYPO_OR_LATEX',
        'description': 'LaTeX formula bracket missing',
        'status': 'OPEN',
        'createdAt': '2026-11-12T10:00:00.000Z',
      });
      final entity = model.toEntity();

      expect(entity.id, 'rep_1');
      expect(entity.contentType, ReportContentType.lesson);
      expect(entity.category, ReportCategory.typoOrLatex);
      expect(entity.status, 'OPEN');
    });
  });

  group('LessonRepositoryImpl & Drift offline integration', () {
    late AppDatabase db;
    late OfflineSyncService offlineSync;
    late _MockLessonRemoteDataSource mockRemote;
    late LessonRepositoryImpl repository;

    setUp(() async {
      db = AppDatabase(NativeDatabase.memory());
      offlineSync = OfflineSyncService(database: db);
      await offlineSync.init();
      mockRemote = _MockLessonRemoteDataSource();
      repository = LessonRepositoryImpl(
        remoteDataSource: mockRemote,
        localDataSource: LessonLocalDataSourceImpl(database: db),
        offlineSyncService: offlineSync,
      );
    });

    tearDown(() async {
      offlineSync.onClose();
      await db.close();
    });

    test('falls back to Drift CachedLessons and CachedQuestions when offline',
        () async {
      await db.upsertCachedLessons(<CachedLessonInput>[
        CachedLessonInput(
          id: 'lesson_motion_1',
          topicId: 'top_motion_eq',
          chapterId: 'chap_ssc_phy_2',
          subjectId: 'sub_ssc_physics',
          titleBangla: 'অফলাইন গতির সমীকরণ',
          payloadJson: jsonEncode(<String, dynamic>{
            'id': 'lesson_motion_1',
            'topicId': 'top_motion_eq',
            'titleBangla': 'অফলাইন গতির সমীকরণ',
            'learningGoal': 'অফলাইন শিখনফল',
            'explanation': 'অফলাইন ব্যাখ্যা',
            'importantTerms': const <Map<String, dynamic>>[],
            'version': 1,
          }),
          isCompleted: true,
          updatedAt: DateTime.utc(2026, 11, 12),
        ),
      ]);
      await db.upsertCachedQuestions(<CachedQuestionInput>[
        CachedQuestionInput(
          id: 'q_offline_1',
          topicId: 'top_motion_eq',
          chapterId: 'chap_ssc_phy_2',
          subjectId: 'sub_ssc_physics',
          questionType: 'MCQ',
          difficulty: 'EASY',
          payloadJson: jsonEncode(
            _sampleQuickQuestionJson(
              id: 'q_offline_1',
              includeIsCorrect: true,
              explanation: const <String, dynamic>{
                'directAnswer': r'$10\text{ m/s}$',
                'coreConcept': 'v = u + at',
              },
            ),
          ),
          updatedAt: DateTime.utc(2026, 11, 12),
        ),
      ]);

      when(() => mockRemote.getLessonByTopic('top_motion_eq')).thenAnswer(
        (_) async => Left(
          ErrorResponse.byErrorType(errorType: ApiResponseErrorType.noInternet),
        ),
      );
      when(
        () => mockRemote.getTopicQuestions(
          chapterId: 'chap_ssc_phy_2',
          topicId: 'top_motion_eq',
        ),
      ).thenAnswer(
        (_) async => Left(
          ErrorResponse.byErrorType(errorType: ApiResponseErrorType.noInternet),
        ),
      );

      final lessonRes = await repository.getLessonByTopic('top_motion_eq');
      expect(lessonRes.isRight(), isTrue);
      final lesson = lessonRes.getOrElse(() => throw StateError('expected'));
      expect(lesson.titleBangla, 'অফলাইন গতির সমীকরণ');
      expect(lesson.isFromCache, isTrue);
      expect(lesson.isCompleted, isTrue);
      expect(lesson.chapterId, 'chap_ssc_phy_2');
      expect(lesson.subjectId, 'sub_ssc_physics');

      final questionsRes = await repository.getTopicQuickQuestions(
        chapterId: 'chap_ssc_phy_2',
        topicId: 'top_motion_eq',
      );
      expect(questionsRes.isRight(), isTrue);
      final questions =
          questionsRes.getOrElse(() => throw StateError('expected'));
      expect(questions.single.id, 'q_offline_1');
      expect(
        questions.single.options.firstWhere((o) => o.id == 'opt_b').isCorrect,
        isTrue,
      );
    });

    test(
        'online completion marks CachedLessons completed; noInternet enqueues to OfflineSyncService',
        () async {
      await db.upsertCachedLessons(<CachedLessonInput>[
        CachedLessonInput(
          id: 'lesson_motion_1',
          topicId: 'top_motion_eq',
          chapterId: 'chap_ssc_phy_2',
          subjectId: 'sub_ssc_physics',
          titleBangla: 'গতির সমীকরণসমূহ',
          payloadJson: jsonEncode(_sampleLessonJson()),
          isCompleted: false,
          updatedAt: DateTime.utc(2026, 11, 12),
        ),
      ]);

      when(
        () => mockRemote.markLessonComplete(
          topicId: 'top_motion_eq',
          lessonId: 'lesson_motion_1',
          timeSpentSeconds: 30,
        ),
      ).thenAnswer(
        (_) async => Right(LessonAckModel(success: true, topicId: 'top_motion_eq')),
      );

      final onlineRes = await repository.completeLesson(
        topicId: 'top_motion_eq',
        lessonId: 'lesson_motion_1',
        chapterId: 'chap_ssc_phy_2',
        subjectId: 'sub_ssc_physics',
        timeSpentSeconds: 30,
      );
      expect(onlineRes.isRight(), isTrue);
      expect(
        onlineRes.getOrElse(() => throw StateError('x')).isQueuedOffline,
        isFalse,
      );
      final cachedRow = await db.getCachedLessonByTopic('top_motion_eq');
      expect(cachedRow?.isCompleted, isTrue);
      expect(offlineSync.pendingCount.value, 0);

      // Now offline completion on another topic
      when(
        () => mockRemote.markLessonComplete(
          topicId: 'top_free_fall',
          lessonId: 'lesson_free_fall',
          timeSpentSeconds: 15,
        ),
      ).thenAnswer(
        (_) async => Left(
          ErrorResponse.byErrorType(errorType: ApiResponseErrorType.noInternet),
        ),
      );

      final offlineRes = await repository.completeLesson(
        topicId: 'top_free_fall',
        lessonId: 'lesson_free_fall',
        chapterId: 'chap_ssc_phy_2',
        subjectId: 'sub_ssc_physics',
        timeSpentSeconds: 15,
      );
      expect(offlineRes.isRight(), isTrue);
      expect(
        offlineRes.getOrElse(() => throw StateError('x')).isQueuedOffline,
        isTrue,
      );
      expect(offlineSync.pendingCount.value, 1);
      final queueRows = await db.getPendingSyncItems();
      expect(queueRows.single.eventType, OfflineSyncService.typeLessonComplete);
      expect(queueRows.single.payloadJson, contains('top_free_fall'));
    });

    test('quick check enqueues practice attempt on noInternet using local answer key',
        () async {
      final offlineQuestion = LessonQuestionModel.fromJson(
        _sampleQuickQuestionJson(
          id: 'q_offline_1',
          includeIsCorrect: true,
          explanation: const <String, dynamic>{
            'directAnswer': r'$10\text{ m/s}$',
          },
        ),
      ).toEntity();

      when(
        () => mockRemote.submitPracticeAttempt(
          questionId: 'q_offline_1',
          selectedOptionId: 'opt_b',
        ),
      ).thenAnswer(
        (_) async => Left(
          ErrorResponse.byErrorType(errorType: ApiResponseErrorType.noInternet),
        ),
      );

      final res = await repository.submitQuickCheckAttempt(
        question: offlineQuestion,
        selectedOptionId: 'opt_b',
      );
      expect(res.isRight(), isTrue);
      final outcome = res.getOrElse(() => throw StateError('x'));
      expect(outcome.isQueuedOffline, isTrue);
      expect(outcome.isCorrect, isTrue);
      expect(outcome.correctOptionId, 'opt_b');
      expect(offlineSync.pendingCount.value, 1);
      final queueRows = await db.getPendingSyncItems();
      expect(
        queueRows.single.eventType,
        OfflineSyncService.typePracticeAttempt,
      );
    });

    test(
        'getTopicQuickQuestions merges cached Drift answer keys onto online-fetched questions',
        () async {
      await db.upsertCachedQuestions(<CachedQuestionInput>[
        CachedQuestionInput(
          id: 'q_merged_1',
          chapterId: 'chap_ssc_phy_2',
          topicId: 'top_motion_eq',
          questionType: 'MCQ',
          payloadJson: jsonEncode(
            _sampleQuickQuestionJson(
              id: 'q_merged_1',
              includeIsCorrect: true,
              explanation: const <String, dynamic>{
                'directAnswer': r'সঠিক উত্তর $10\text{ m/s}$',
              },
            ),
          ),
          updatedAt: DateTime.utc(2026, 11, 12),
        ),
      ]);

      when(
        () => mockRemote.getTopicQuestions(
          chapterId: 'chap_ssc_phy_2',
          topicId: 'top_motion_eq',
        ),
      ).thenAnswer(
        (_) async => Right(
          QuickCheckQuestionListModel.fromJson(<String, dynamic>{
            'json': <Map<String, dynamic>>[
              _sampleQuickQuestionJson(
                id: 'q_merged_1',
                includeIsCorrect: false,
                explanation: null,
              ),
            ],
          }),
        ),
      );

      final res = await repository.getTopicQuickQuestions(
        chapterId: 'chap_ssc_phy_2',
        topicId: 'top_motion_eq',
      );

      expect(res.isRight(), isTrue);
      final questions = res.getOrElse(() => const <QuickCheckQuestionEntity>[]);
      expect(questions, hasLength(1));
      final optB = questions.single.options.firstWhere((o) => o.id == 'opt_b');
      expect(optB.isCorrect, isTrue);
      expect(
        questions.single.explanation?['directAnswer'],
        r'সঠিক উত্তর $10\text{ m/s}$',
      );
    });

    test(
        'quick check fails cleanly with noInternet and does not enqueue SyncQueue when no offline answer key exists',
        () async {
      final onlineOnlyQuestion = LessonQuestionModel.fromJson(
        _sampleQuickQuestionJson(
          id: 'q_no_key_1',
          includeIsCorrect: false,
          explanation: null,
        ),
      ).toEntity();

      when(
        () => mockRemote.submitPracticeAttempt(
          questionId: 'q_no_key_1',
          selectedOptionId: 'opt_b',
        ),
      ).thenAnswer(
        (_) async => Left(
          ErrorResponse.byErrorType(errorType: ApiResponseErrorType.noInternet),
        ),
      );

      final res = await repository.submitQuickCheckAttempt(
        question: onlineOnlyQuestion,
        selectedOptionId: 'opt_b',
      );

      expect(res.isLeft(), isTrue);
      res.fold(
        (err) {
          expect(err.data, ApiResponseErrorType.noInternet);
          expect(err.code, 'OFFLINE_NO_ANSWER_KEY');
          expect(err.message, isNotEmpty);
        },
        (_) => fail('Expected Left(noInternet) when no offline answer key'),
      );
      expect(offlineSync.pendingCount.value, 0);
      expect(await db.getPendingSyncItems(), isEmpty);
    });
  });

  group('ContentReportRepositoryImpl & SubmitContentReportUseCase', () {
    test('rejects empty description and submits valid report payload', () async {
      final mockRemote = _MockContentReportRemoteDataSource();
      final repo = ContentReportRepositoryImpl(remoteDataSource: mockRemote);
      final useCase = SubmitContentReportUseCase(repo);

      final invalid = await useCase(
        contentType: ReportContentType.lesson,
        contentId: 'lesson_1',
        category: ReportCategory.typoOrLatex,
        description: '   ',
      );
      expect(invalid.isLeft(), isTrue);
      verifyZeroInteractions(mockRemote);

      when(
        () => mockRemote.submitReport(
          contentType: 'LESSON',
          contentId: 'lesson_1',
          topicId: 'top_1',
          category: 'TYPO_OR_LATEX',
          description: 'Formula typo in v = u + at',
        ),
      ).thenAnswer(
        (_) async => Right(
          ContentReportModel(
            id: 'rep_99',
            contentType: 'LESSON',
            contentId: 'lesson_1',
            topicId: 'top_1',
            category: 'TYPO_OR_LATEX',
            description: 'Formula typo in v = u + at',
            status: 'OPEN',
            createdAt: '2026-11-12T10:00:00.000Z',
          ),
        ),
      );

      final valid = await useCase(
        contentType: ReportContentType.lesson,
        contentId: 'lesson_1',
        topicId: 'top_1',
        category: ReportCategory.typoOrLatex,
        description: '  Formula typo in v = u + at  ',
      );
      expect(valid.isRight(), isTrue);
      expect(valid.getOrElse(() => throw StateError('x')).id, 'rep_99');
    });
  });

  group('LessonView, LessonController, ReportContentSheet & entry points', () {
    late _MockLessonRepository mockLessonRepo;
    late _MockContentReportRepository mockReportRepo;
    late _MockStudentRepository mockStudentRepo;
    late _MockCurriculumRepository mockCurriculumRepo;
    late _MockAuthRepository mockAuthRepo;
    late _FakeAudioBackend fakeAudio;
    late _FakeTtsBackend fakeTts;

    final chapterTopics = <TopicEntity>[
      const TopicEntity(
        id: 'top_motion_eq',
        chapterId: 'chap_ssc_phy_2',
        orderIndex: 1,
        titleBangla: 'গতির সমীকরণসমূহ',
        lessonCount: 1,
        hasInteractiveLab: true,
      ),
      const TopicEntity(
        id: 'top_free_fall',
        chapterId: 'chap_ssc_phy_2',
        orderIndex: 2,
        titleBangla: 'পড়ন্ত বস্তুর সূত্র',
        lessonCount: 1,
      ),
    ];

    setUp(() async {
      Get.testMode = true;
      Get.reset();
      SharedPreferences.setMockInitialValues(<String, Object>{
        PreferencesStorageService.languageKey: 'bn',
      });

      mockLessonRepo = _MockLessonRepository();
      mockReportRepo = _MockContentReportRepository();
      mockStudentRepo = _MockStudentRepository();
      mockCurriculumRepo = _MockCurriculumRepository();
      mockAuthRepo = _MockAuthRepository();
      fakeAudio = _FakeAudioBackend();
      fakeTts = _FakeTtsBackend();

      when(() => mockAuthRepo.getLanguage()).thenReturn('bn');
      when(() => mockAuthRepo.getCachedUser()).thenReturn(
        const AuthUserEntity(
          id: 'stu_1',
          fullName: 'নাফিস',
          selectedClass: StudentTrack.ssc,
        ),
      );
      when(() => mockStudentRepo.getActiveSubjectId(any()))
          .thenReturn('sub_ssc_physics');
      when(() => mockStudentRepo.getCachedOverview(subjectId: any(named: 'subjectId')))
          .thenAnswer(
        (_) async => const StudentOverviewEntity(
          subjectId: 'sub_ssc_physics',
          completedTopicIds: <String>[],
          bookmarks: <StudentBookmarkEntity>[],
          lessonNotes: <String, String>{'top_motion_eq': 'পূর্বের নোট'},
        ),
      );
      when(() => mockLessonRepo.getCachedLessonByTopic(any()))
          .thenAnswer((_) async => null);
      when(
        () => mockLessonRepo.getCachedTopicQuickQuestions(
          chapterId: any(named: 'chapterId'),
          topicId: any(named: 'topicId'),
        ),
      ).thenAnswer((_) async => const <QuickCheckQuestionEntity>[]);
      when(() => mockLessonRepo.getLocalLessonNote(any()))
          .thenAnswer((_) async => null);
      when(
        () => mockLessonRepo.saveLocalLessonNote(
          topicId: any(named: 'topicId'),
          content: any(named: 'content'),
          subjectId: any(named: 'subjectId'),
        ),
      ).thenAnswer((_) async {});
      when(() => mockCurriculumRepo.getCachedChapters(any())).thenAnswer(
        (_) async => <ChapterEntity>[
          ChapterEntity(
            id: 'chap_ssc_phy_2',
            subjectId: 'sub_ssc_physics',
            orderIndex: 2,
            titleBangla: 'গতি (Motion)',
            topics: chapterTopics,
          ),
        ],
      );
      when(() => mockCurriculumRepo.getOfflineChapterPack(any()))
          .thenAnswer((_) async => null);
    });

    tearDown(() {
      Get.reset();
    });

    void registerDeps() {
      Get.put<GetLanguageUseCase>(GetLanguageUseCase(mockAuthRepo));
      Get.put<GetCachedUserUseCase>(GetCachedUserUseCase(mockAuthRepo));
      Get.put<GetActiveSubjectIdUseCase>(
        GetActiveSubjectIdUseCase(mockStudentRepo),
      );
      Get.put<GetCachedOverviewUseCase>(
        GetCachedOverviewUseCase(mockStudentRepo),
      );
      Get.put<ToggleBookmarkUseCase>(ToggleBookmarkUseCase(mockStudentRepo));
      Get.put<PatchCachedBookmarkUseCase>(
        PatchCachedBookmarkUseCase(mockStudentRepo),
      );
      Get.put<SaveNoteUseCase>(SaveNoteUseCase(mockStudentRepo));
      Get.put<SubmitFeedbackUseCase>(SubmitFeedbackUseCase(mockStudentRepo));
      Get.put<GetChaptersUseCase>(GetChaptersUseCase(mockCurriculumRepo));
      Get.put<GetCachedChaptersUseCase>(
        GetCachedChaptersUseCase(mockCurriculumRepo),
      );
      Get.put<GetOfflineChapterPackUseCase>(
        GetOfflineChapterPackUseCase(mockCurriculumRepo),
      );
      Get.put<GetLessonByTopicUseCase>(
        GetLessonByTopicUseCase(mockLessonRepo),
      );
      Get.put<GetCachedLessonByTopicUseCase>(
        GetCachedLessonByTopicUseCase(mockLessonRepo),
      );
      Get.put<GetTopicQuickQuestionsUseCase>(
        GetTopicQuickQuestionsUseCase(mockLessonRepo),
      );
      Get.put<GetCachedTopicQuickQuestionsUseCase>(
        GetCachedTopicQuickQuestionsUseCase(mockLessonRepo),
      );
      Get.put<SubmitQuickCheckAttemptUseCase>(
        SubmitQuickCheckAttemptUseCase(mockLessonRepo),
      );
      Get.put<CompleteLessonUseCase>(CompleteLessonUseCase(mockLessonRepo));
      Get.put<GetLocalLessonNoteUseCase>(
        GetLocalLessonNoteUseCase(mockLessonRepo),
      );
      Get.put<SaveLocalLessonNoteUseCase>(
        SaveLocalLessonNoteUseCase(mockLessonRepo),
      );
      Get.put<SubmitContentReportUseCase>(
        SubmitContentReportUseCase(mockReportRepo),
      );
    }

    testWidgets(
      'LessonView renders RichContent, Audio, WebView lab, quick check, notes, bookmark, completion, feedback, report sheet & prev/next navigation',
      (tester) async {
        final lesson1 = LessonDetailModel.fromJson(_sampleLessonJson()).toEntity();
        final lesson2 = LessonDetailModel.fromJson(
          _sampleLessonJson(
            id: 'lesson_free_fall',
            topicId: 'top_free_fall',
            titleBangla: 'পড়ন্ত বস্তুর সূত্র',
          ),
        ).toEntity();
        final question1 = LessonQuestionModel.fromJson(
          _sampleQuickQuestionJson(),
        ).toEntity();

        when(() => mockLessonRepo.getLessonByTopic('top_motion_eq'))
            .thenAnswer((_) async => Right(lesson1));
        when(() => mockLessonRepo.getLessonByTopic('top_free_fall'))
            .thenAnswer((_) async => Right(lesson2));
        when(
          () => mockLessonRepo.getTopicQuickQuestions(
            chapterId: 'chap_ssc_phy_2',
            topicId: 'top_motion_eq',
          ),
        ).thenAnswer((_) async => Right(<QuickCheckQuestionEntity>[question1]));
        when(
          () => mockLessonRepo.getTopicQuickQuestions(
            chapterId: 'chap_ssc_phy_2',
            topicId: 'top_free_fall',
          ),
        ).thenAnswer((_) async => const Right(<QuickCheckQuestionEntity>[]));

        when(
          () => mockLessonRepo.submitQuickCheckAttempt(
            question: any(named: 'question'),
            selectedOptionId: 'opt_b',
          ),
        ).thenAnswer(
          (_) async => const Right(
            QuickCheckSubmitResultEntity(
              isCorrect: true,
              correctOptionId: 'opt_b',
              explanation: <String, dynamic>{
                'directAnswer': 'সঠিক উত্তর ১০ মি/সে',
                'coreConcept': 'v = u + at সূত্র প্রয়োগ।',
              },
              isQueuedOffline: false,
            ),
          ),
        );

        when(
          () => mockLessonRepo.completeLesson(
            topicId: 'top_motion_eq',
            lessonId: 'lesson_motion_1',
            chapterId: 'chap_ssc_phy_2',
            subjectId: 'sub_ssc_physics',
            timeSpentSeconds: any(named: 'timeSpentSeconds'),
          ),
        ).thenAnswer(
          (_) async => const Right(
            LessonCompleteResultEntity(
              topicId: 'top_motion_eq',
              isQueuedOffline: false,
            ),
          ),
        );

        when(
          () => mockStudentRepo.toggleBookmark(
            itemId: 'top_motion_eq',
            itemType: 'topic',
            titleBangla: 'গতির সমীকরণসমূহ',
            subtitleBangla: 'গতি (Motion)',
            href: '/lesson/top_motion_eq',
          ),
        ).thenAnswer((_) async => const Right(true));
        when(
          () => mockStudentRepo.syncCachedBookmark(
            subjectId: any(named: 'subjectId'),
            itemId: any(named: 'itemId'),
            itemType: any(named: 'itemType'),
            titleBangla: any(named: 'titleBangla'),
            subtitleBangla: any(named: 'subtitleBangla'),
            href: any(named: 'href'),
            bookmarked: any(named: 'bookmarked'),
          ),
        ).thenAnswer((_) async {});

        when(
          () => mockStudentRepo.saveNote(
            topicId: 'top_motion_eq',
            content: 'নতুন সূত্র নোট',
          ),
        ).thenAnswer((_) async => const Right('নতুন সূত্র নোট'));

        when(
          () => mockStudentRepo.submitFeedback(
            contentType: 'LESSON',
            contentId: 'lesson_motion_1',
            helpful: true,
          ),
        ).thenAnswer((_) async => const Right(null));

        when(
          () => mockReportRepo.submitReport(
            contentType: ReportContentType.lesson,
            contentId: 'lesson_motion_1',
            topicId: 'top_motion_eq',
            category: ReportCategory.typoOrLatex,
            description: 'সূত্রে ছোট ভুল আছে',
          ),
        ).thenAnswer(
          (_) async => const Right(
            ContentReportEntity(
              id: 'rep_101',
              contentType: ReportContentType.lesson,
              contentId: 'lesson_motion_1',
              topicId: 'top_motion_eq',
              category: ReportCategory.typoOrLatex,
              description: 'সূত্রে ছোট ভুল আছে',
              status: 'OPEN',
              createdAt: '2026-11-12T10:00:00.000Z',
            ),
          ),
        );

        registerDeps();

        await tester.pumpWidget(
          GetMaterialApp(
            theme: PorhiTheme.light,
            initialRoute: AppRoutes.lessonForTopic('top_motion_eq'),
            getPages: <GetPage<dynamic>>[
              GetPage<dynamic>(
                name: AppRoutes.lesson,
                page: () => LessonView(
                  envConfig: const EnvConfig(apiBaseUrl: 'https://api.porhi.test'),
                  audioBackendFactory: () => fakeAudio,
                  ttsBackendFactory: () => fakeTts,
                  webViewBuilder: (
                    context,
                    source, {
                    required isLocalFile,
                    required isHtml,
                  }) =>
                      Container(
                    key: const Key('injected_webview_lab'),
                    alignment: Alignment.center,
                    child: Text('WebView: $source'),
                  ),
                ),
                binding: LessonBinding(),
              ),
            ],
          ),
        );
        await tester.pumpAndSettle();

        // Lesson title, audio player, injected lab webview, important terms
        expect(find.text('গতির সমীকরণসমূহ'), findsWidgets);
        expect(find.byType(LessonAudioPlayer), findsOneWidget);
        expect(find.byKey(const Key('injected_webview_lab')), findsOneWidget);
        await tester.scrollUntilVisible(
          find.text('আদিবেগ'),
          250,
          scrollable: find.byType(Scrollable).first,
        );
        expect(find.text('আদিবেগ'), findsOneWidget);

        // Scroll to Quick Check and select option B
        await tester.scrollUntilVisible(
          find.byKey(const Key('quick_check_option_opt_b')),
          250,
          scrollable: find.byType(Scrollable).first,
        );
        final quickCheckCard = tester.widget<LessonQuickCheckCard>(
          find.byType(LessonQuickCheckCard),
        );
        expect(quickCheckCard.envConfig?.apiBaseUrl, 'https://api.porhi.test');
        final cardRichViews = tester.widgetList<RichContentView>(
          find.descendant(
            of: find.byType(LessonQuickCheckCard),
            matching: find.byType(RichContentView),
          ),
        );
        expect(
          cardRichViews.every(
            (v) => v.envConfig?.apiBaseUrl == 'https://api.porhi.test',
          ),
          isTrue,
        );
        await tester.tap(find.byKey(const Key('quick_check_option_opt_b')));
        await tester.pumpAndSettle();
        expect(find.textContaining('সঠিক উত্তর ১০ মি/সে'), findsOneWidget);
        final postAnswerRichViews = tester.widgetList<RichContentView>(
          find.descendant(
            of: find.byType(LessonQuickCheckCard),
            matching: find.byType(RichContentView),
          ),
        );
        expect(
          postAnswerRichViews.every(
            (v) => v.envConfig?.apiBaseUrl == 'https://api.porhi.test',
          ),
          isTrue,
        );

        // Tap Helpful explanation feedback
        await tester.scrollUntilVisible(
          find.byKey(const Key('lesson_feedback_helpful_btn')),
          -250,
          scrollable: find.byType(Scrollable).first,
        );
        await tester.tap(find.byKey(const Key('lesson_feedback_helpful_btn')));
        await tester.pumpAndSettle();
        verify(
          () => mockStudentRepo.submitFeedback(
            contentType: 'LESSON',
            contentId: 'lesson_motion_1',
            helpful: true,
          ),
        ).called(1);

        // Sticky bottom footer: Bookmark & Complete
        await tester.tap(find.byKey(const Key('lesson_footer_bookmark_btn')));
        await tester.pumpAndSettle();
        expect(Get.find<LessonController>().isBookmarked.value, isTrue);

        await tester.tap(find.byKey(const Key('lesson_complete_btn')));
        await tester.pumpAndSettle();
        expect(Get.find<LessonController>().isCompleted.value, isTrue);

        // Open Notes bottom sheet & save note
        await tester.tap(find.byKey(const Key('lesson_footer_notes_btn')));
        await tester.pumpAndSettle();
        expect(find.byKey(const Key('lesson_note_input')), findsOneWidget);
        await tester.enterText(
          find.byKey(const Key('lesson_note_input')),
          'নতুন সূত্র নোট',
        );
        await tester.tap(find.byKey(const Key('lesson_note_save_btn')));
        await tester.pumpAndSettle();
        expect(Get.find<LessonController>().savedNote.value, 'নতুন সূত্র নোট');

        // Open ReportContentSheet, check empty validation, then submit valid report
        await tester.tap(find.byKey(const Key('lesson_footer_report_btn')));
        await tester.pumpAndSettle();
        expect(find.byType(ReportContentSheet), findsOneWidget);

        await tester.ensureVisible(find.byKey(const Key('report_submit_btn')));
        await tester.tap(find.byKey(const Key('report_submit_btn')));
        await tester.pumpAndSettle();
        expect(find.byKey(const Key('report_error_text')), findsOneWidget);

        await tester.ensureVisible(
          find.byKey(const Key('report_category_TYPO_OR_LATEX')),
        );
        await tester.tap(
          find.byKey(const Key('report_category_TYPO_OR_LATEX')),
        );
        await tester.enterText(
          find.byKey(const Key('report_description_input')),
          'সূত্রে ছোট ভুল আছে',
        );
        await tester.ensureVisible(find.byKey(const Key('report_submit_btn')));
        await tester.tap(find.byKey(const Key('report_submit_btn')));
        await tester.pumpAndSettle();
        expect(find.byKey(const Key('report_success_view')), findsOneWidget);
        await tester.ensureVisible(find.byKey(const Key('report_done_btn')));
        await tester.tap(find.byKey(const Key('report_done_btn')));
        await tester.pumpAndSettle();

        // Navigate to Next Topic via in-controller switch
        await tester.scrollUntilVisible(
          find.byKey(const Key('lesson_next_topic_btn')),
          300,
          scrollable: find.byType(Scrollable).first,
        );
        await tester.tap(find.byKey(const Key('lesson_next_topic_btn')));
        await tester.pumpAndSettle();
        expect(
          Get.find<LessonController>().topicId.value,
          'top_free_fall',
        );
        expect(find.text('পড়ন্ত বস্তুর সূত্র'), findsWidgets);
      },
    );

    testWidgets(
      'ChapterIndexView and DashboardView Continue Learning navigate to /lesson/:topicId when registered',
      (tester) async {
        final lesson1 = LessonDetailModel.fromJson(_sampleLessonJson()).toEntity();

        when(() => mockLessonRepo.getLessonByTopic('top_motion_eq'))
            .thenAnswer((_) async => Right(lesson1));
        when(
          () => mockLessonRepo.getTopicQuickQuestions(
            chapterId: any(named: 'chapterId'),
            topicId: any(named: 'topicId'),
          ),
        ).thenAnswer((_) async => const Right(<QuickCheckQuestionEntity>[]));
        when(() => mockCurriculumRepo.getDownloadedChapters(
              subjectId: any(named: 'subjectId'),
            )).thenAnswer((_) async => const <DownloadedChapterEntity>[]);
        when(() => mockCurriculumRepo.getActiveSubjectId(any()))
            .thenReturn('sub_ssc_physics');
        when(() => mockCurriculumRepo.getChapters('sub_ssc_physics'))
            .thenAnswer(
          (_) async => Right(<ChapterEntity>[
            ChapterEntity(
              id: 'chap_ssc_phy_2',
              subjectId: 'sub_ssc_physics',
              orderIndex: 2,
              titleBangla: 'গতি (Motion)',
              topics: chapterTopics,
            ),
          ]),
        );

        when(() => mockStudentRepo.getOverview(subjectId: 'sub_ssc_physics'))
            .thenAnswer(
          (_) async => const Right(
            StudentOverviewEntity(
              subjectId: 'sub_ssc_physics',
              lastStudiedTopic: LastStudiedTopicEntity(
                topicId: 'top_motion_eq',
                topicTitle: 'গতির সমীকরণসমূহ',
                chapterId: 'chap_ssc_phy_2',
                chapterTitle: 'গতি (Motion)',
                timestamp: '2026-11-12T10:00:00Z',
              ),
            ),
          ),
        );
        when(() => mockStudentRepo.getCachedPlannerSummary())
            .thenAnswer((_) async => null);
        when(() => mockStudentRepo.getPlannerSummary())
            .thenAnswer((_) async => const Right(PlannerOverviewEntity()));
        when(() => mockStudentRepo.pendingSyncCount).thenReturn(0);
        when(() => mockStudentRepo.watchPendingSyncCount())
            .thenAnswer((_) => const Stream<int>.empty());
        when(
          () => mockStudentRepo.getCachedQuickSearchCatalog(
            subjectId: any(named: 'subjectId'),
          ),
        ).thenAnswer((_) async => const <QuickSearchTopicEntity>[]);
        when(() => mockCurriculumRepo.getSubjects(program: any(named: 'program')))
            .thenAnswer((_) async => const Right(<SubjectEntity>[]));
        when(() => mockCurriculumRepo.getCachedChapters(any()))
            .thenAnswer((_) async => const <ChapterEntity>[]);

        Get.put<GetDownloadedChaptersUseCase>(
          GetDownloadedChaptersUseCase(mockCurriculumRepo),
        );
        Get.put<GetActiveCurriculumSubjectUseCase>(
          GetActiveCurriculumSubjectUseCase(mockCurriculumRepo),
        );
        Get.put<DownloadChapterPackUseCase>(
          DownloadChapterPackUseCase(mockCurriculumRepo),
        );
        Get.put<RemoveChapterPackUseCase>(
          RemoveChapterPackUseCase(mockCurriculumRepo),
        );
        Get.put<FilterChaptersUseCase>(const FilterChaptersUseCase());
        Get.put<GetOverviewUseCase>(GetOverviewUseCase(mockStudentRepo));
        Get.put<GetPlannerSummaryUseCase>(
          GetPlannerSummaryUseCase(mockStudentRepo),
        );
        Get.put<GetCachedPlannerSummaryUseCase>(
          GetCachedPlannerSummaryUseCase(mockStudentRepo),
        );
        Get.put<GetQuickSearchCatalogUseCase>(
          GetQuickSearchCatalogUseCase(mockStudentRepo),
        );
        Get.put<GetCachedQuickSearchCatalogUseCase>(
          GetCachedQuickSearchCatalogUseCase(mockStudentRepo),
        );
        Get.put<FilterQuickSearchTopicsUseCase>(
          const FilterQuickSearchTopicsUseCase(),
        );
        Get.put<FlushOfflineSyncUseCase>(
          FlushOfflineSyncUseCase(mockStudentRepo),
        );
        Get.put<GetPendingSyncCountUseCase>(
          GetPendingSyncCountUseCase(mockStudentRepo),
        );
        Get.put<WatchPendingSyncCountUseCase>(
          WatchPendingSyncCountUseCase(mockStudentRepo),
        );

        registerDeps();

        await tester.pumpWidget(
          GetMaterialApp(
            theme: PorhiTheme.light,
            initialRoute: AppRoutes.home,
            getPages: <GetPage<dynamic>>[
              GetPage<dynamic>(
                name: AppRoutes.home,
                page: () => const DashboardView(),
                binding: DashboardBinding(),
              ),
              GetPage<dynamic>(
                name: AppRoutes.chapters,
                page: () => const ChapterIndexView(),
                binding: CurriculumBinding(),
              ),
              GetPage<dynamic>(
                name: AppRoutes.lesson,
                page: () => LessonView(
                  envConfig: const EnvConfig(apiBaseUrl: 'https://api.porhi.test'),
                  audioBackendFactory: () => fakeAudio,
                  ttsBackendFactory: () => fakeTts,
                  webViewBuilder: (
                    context,
                    source, {
                    required isLocalFile,
                    required isHtml,
                  }) =>
                      Container(
                    key: const Key('injected_webview_lab'),
                    alignment: Alignment.center,
                    child: Text('WebView: $source'),
                  ),
                ),
                binding: LessonBinding(),
              ),
            ],
          ),
        );
        await tester.pumpAndSettle();

        // 1) Continue Learning opens LessonView for lastStudiedTopic
        await tester.tap(find.text('পড়া চালিয়ে যান'));
        await tester.pumpAndSettle();
        expect(find.byType(LessonView), findsOneWidget);
        expect(find.text('গতির সমীকরণসমূহ'), findsWidgets);

        // 2) Navigate back, open ChapterIndexView, tap topic -> opens LessonView
        Get.back<void>();
        await tester.pumpAndSettle();
        Get.toNamed<void>(AppRoutes.chaptersForSubject('sub_ssc_physics'));
        await tester.pumpAndSettle();
        await tester.drag(find.byType(ListView).first, const Offset(0, -250));
        await tester.pumpAndSettle();
        await tester.tap(find.text('গতির সমীকরণসমূহ'));
        await tester.pumpAndSettle();
        expect(find.byType(LessonView), findsOneWidget);
        expect(find.text('গতির সমীকরণসমূহ'), findsWidgets);
      },
    );
  });
}
