import 'dart:async';
import 'dart:convert';

import 'package:common/common.dart';
import 'package:drift/native.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:get/get.dart';
import 'package:mocktail/mocktail.dart';
import 'package:network/network.dart';
import 'package:porhi/app/initial_binding.dart';
import 'package:porhi/core/database/app_database.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/core/storage/preferences_storage_service.dart';
import 'package:porhi/core/storage/secure_storage_service.dart';
import 'package:porhi/core/sync/offline_sync_service.dart';
import 'package:porhi/core/theme/porhi_theme.dart';
import 'package:porhi/features/auth/data/datasources/firebase_auth_gateway.dart';
import 'package:porhi/features/auth/domain/entities/auth_user_entity.dart';
import 'package:porhi/features/auth/domain/repositories/auth_repository.dart';
import 'package:porhi/features/auth/domain/usecases/auth_usecases.dart';
import 'package:porhi/features/curriculum/data/datasources/curriculum_local_datasource.dart';
import 'package:porhi/features/curriculum/data/datasources/curriculum_remote_datasource.dart';
import 'package:porhi/features/curriculum/data/models/curriculum_models.dart';
import 'package:porhi/features/curriculum/data/repositories/curriculum_repository_impl.dart';
import 'package:porhi/features/curriculum/domain/entities/curriculum_entities.dart';
import 'package:porhi/features/curriculum/domain/repositories/curriculum_repository.dart';
import 'package:porhi/features/curriculum/domain/usecases/curriculum_usecases.dart';
import 'package:porhi/features/curriculum/presentation/curriculum/binding/curriculum_binding.dart';
import 'package:porhi/features/curriculum/presentation/curriculum/controller/chapter_index_controller.dart';
import 'package:porhi/features/curriculum/presentation/curriculum/view/chapter_index_view.dart';
import 'package:porhi/features/curriculum/presentation/subjects/binding/subjects_binding.dart';
import 'package:porhi/features/curriculum/presentation/subjects/controller/subjects_controller.dart';
import 'package:porhi/features/curriculum/presentation/subjects/view/subjects_view.dart';
import 'package:porhi/features/dashboard/domain/entities/student_overview_entity.dart';
import 'package:porhi/features/dashboard/domain/repositories/student_repository.dart';
import 'package:porhi/features/dashboard/domain/usecases/student_usecases.dart';
import 'package:porhi/features/dashboard/presentation/dashboard/controller/dashboard_controller.dart';
import 'package:porhi/features/shell/presentation/main_shell/binding/main_shell_binding.dart';
import 'package:porhi/features/shell/presentation/main_shell/controller/main_shell_controller.dart';
import 'package:porhi/features/shell/presentation/main_shell/view/main_shell_view.dart';
import 'package:porhi/routes/app_pages.dart';
import 'package:porhi/routes/app_routes.dart';
import 'package:shared_preferences/shared_preferences.dart';

class _MockCurriculumRemoteDataSource extends Mock
    implements CurriculumRemoteDataSource {}

class _MockCurriculumRepository extends Mock implements CurriculumRepository {}

class _MockStudentRepository extends Mock implements StudentRepository {}

class _MockAuthRepository extends Mock implements AuthRepository {}

class _MockFirebaseAuthGateway extends Mock implements FirebaseAuthGateway {}

List<Map<String, dynamic>> _sampleSubjectsJson() => <Map<String, dynamic>>[
      <String, dynamic>{
        'id': 'sub_class8_science',
        'code': 'class8_science',
        'nameBangla': 'অষ্টম শ্রেণির বিজ্ঞান',
        'classLevel': 'CLASS_6_8',
        'program': 'CLASS_6_8',
        'syllabusYear': 2026,
        'isReady': true,
        'chapterCount': 6,
        'topicCount': 18,
        'publishedLessonCount': 18,
        'publishedQuestionCount': 60,
      },
      <String, dynamic>{
        'id': 'sub_ssc_physics',
        'code': 'ssc_physics',
        'nameBangla': 'পদার্থবিজ্ঞান',
        'classLevel': 'CLASS_9_10',
        'program': 'SSC',
        'syllabusYear': 2026,
        'isReady': true,
        'chapterCount': 14,
        'topicCount': 65,
        'publishedLessonCount': 40,
        'publishedQuestionCount': 220,
      },
      <String, dynamic>{
        'id': 'sub_ssc_math',
        'code': 'ssc_math',
        'nameBangla': 'সাধারণ গণিত',
        'classLevel': 'CLASS_9_10',
        'program': 'SSC',
        'syllabusYear': 2026,
        'isReady': false,
        'chapterCount': 17,
        'topicCount': 95,
      },
      <String, dynamic>{
        'id': 'sub_hsc_physics_1',
        'code': 'hsc_physics_1',
        'nameBangla': 'HSC পদার্থবিজ্ঞান ১ম পত্র',
        'classLevel': 'CLASS_11_12',
        'program': 'HSC',
        'syllabusYear': 2026,
        'isReady': true,
        'chapterCount': 10,
        'topicCount': 52,
      },
      <String, dynamic>{
        'id': 'sub_admission_physics',
        'code': 'admission_ka_physics',
        'nameBangla': 'ভর্তি প্রস্তুতি: ক-ইউনিট পদার্থবিজ্ঞান',
        'classLevel': 'ADMISSION',
        'program': 'ADMISSION',
        'syllabusYear': 2026,
        'isReady': true,
        'chapterCount': 8,
        'topicCount': 32,
      },
      <String, dynamic>{
        'id': 'sub_bcs_preliminary',
        'code': 'bcs_preliminary',
        'nameBangla': 'BCS প্রিলিমিনারি: সাধারণ বিজ্ঞান',
        'classLevel': 'BCS',
        'program': 'BCS',
        'syllabusYear': 2026,
        'isReady': true,
        'chapterCount': 12,
        'topicCount': 48,
      },
    ];

List<Map<String, dynamic>> _sampleChaptersJson({
  String subjectId = 'sub_ssc_physics',
}) =>
    <Map<String, dynamic>>[
      <String, dynamic>{
        'id': 'chap_ssc_phy_2',
        'subjectId': subjectId,
        'orderIndex': 2,
        'titleBangla': 'গতি (Motion)',
        'topics': <Map<String, dynamic>>[
          <String, dynamic>{
            'id': 'top_motion_eq',
            'chapterId': 'chap_ssc_phy_2',
            'orderIndex': 1,
            'titleBangla': 'গতির সমীকরণ ল্যাব',
            'lessonCount': 1,
            'hasInteractiveLab': true,
            'questionCount': 8,
            'cqCount': 2,
          },
          <String, dynamic>{
            'id': 'top_free_fall',
            'chapterId': 'chap_ssc_phy_2',
            'orderIndex': 2,
            'titleBangla': 'পড়ন্ত বস্তুর সূত্র',
            'lessonCount': 1,
            'hasInteractiveLab': false,
            'questionCount': 6,
            'cqCount': 1,
          },
        ],
      },
      <String, dynamic>{
        'id': 'chap_ssc_phy_3',
        'subjectId': subjectId,
        'orderIndex': 3,
        'titleBangla': 'বল (Force)',
        'topics': <Map<String, dynamic>>[
          <String, dynamic>{
            'id': 'top_newton_laws',
            'chapterId': 'chap_ssc_phy_3',
            'orderIndex': 1,
            'titleBangla': 'নিউটনের গতির সূত্র',
            'lessonCount': 1,
            'hasInteractiveLab': false,
            'questionCount': 10,
            'cqCount': 2,
          },
        ],
      },
    ];

Map<String, dynamic> _sampleOfflinePackJson({
  String chapterId = 'chap_ssc_phy_2',
  String subjectId = 'sub_ssc_physics',
}) =>
    <String, dynamic>{
      'chapterId': chapterId,
      'subjectId': subjectId,
      'titleBangla': 'গতি (Motion)',
      'versionHash': 'v1-1-2-3',
      'downloadedAt': '2026-11-12T10:00:00.000Z',
      'topics': <Map<String, dynamic>>[
        <String, dynamic>{
          'id': 'top_motion_eq',
          'titleBangla': 'গতির সমীকরণ ল্যাব',
          'orderIndex': 1,
        },
        <String, dynamic>{
          'id': 'top_free_fall',
          'titleBangla': 'পড়ন্ত বস্তুর সূত্র',
          'orderIndex': 2,
        },
      ],
      'lessons': <Map<String, dynamic>>[
        <String, dynamic>{
          'id': 'les_1',
          'topicId': 'top_motion_eq',
          'titleBangla': 'গতির চারটি মৌলিক সমীকরণ',
          'learningGoal': 'সমত্বরণে গতিশীল বস্তুর বেগ ও সরণ নির্ণয় করা',
          'explanation': 'সমীকরণ: \$v = u + at\$ এবং \$s = ut + \\frac{1}{2}at^2\$',
          'importantTerms': <Map<String, dynamic>>[
            <String, dynamic>{
              'termBangla': 'ত্বরণ',
              'termEnglish': 'Acceleration',
              'definition': 'সময়ের সাথে বেগ পরিবর্তনের হার',
            },
          ],
          'workedExample': <String, dynamic>{
            'problem': 'স্থির অবস্থান থেকে \$2\\,m/s^2\$ ত্বরণে চললে ৫ সেকেন্ড পর বেগ কত?',
            'stepByStepSolution': '\$v = 0 + 2 \\times 5 = 10\\,m/s\$',
          },
          'memoryAid': 'SUVAT সূত্র মনে রাখো',
          'interactiveWidgetUrl': '/labs/motion-graph.html',
          'audioUrl': '/audio/lesson-intro.wav',
          'audioDurationSeconds': 95,
          'version': 3,
        },
      ],
      'questions': <Map<String, dynamic>>[
        <String, dynamic>{
          'id': 'q_mcq_1',
          'topicId': 'top_motion_eq',
          'type': 'MCQ',
          'stem': 'সমবেগে চলমান বস্তুর ত্বরণ কত?',
          'options': <Map<String, dynamic>>[
            <String, dynamic>{'id': 'a', 'text': '0 m/s²', 'isCorrect': true},
            <String, dynamic>{'id': 'b', 'text': '9.8 m/s²', 'isCorrect': false},
          ],
          'boardSource': 'Dhaka Board 2024',
          'explanation': <String, dynamic>{
            'coreConcept': 'বেগের পরিবর্তন শূন্য হলে ত্বরণ শূন্য হয়।',
          },
          'difficulty': 'EASY',
          'version': 2,
        },
        <String, dynamic>{
          'id': 'q_cq_1',
          'topicId': 'top_free_fall',
          'type': 'CQ_CREATIVE',
          'stem': 'একটি বস্তু ৪৯ মিটার উঁচু ছাদ থেকে ছেড়ে দেওয়া হলো।',
          'modelAnswer': 'গ) সময় = √(2h/g) = √(98/9.8) = 3.16s',
          'cqRubric': <String, dynamic>{
            'ka': 'অভিকর্ষজ ত্বরণের সংজ্ঞা (১ নম্বর)',
            'kha': 'ভর ও ওজনের পার্থক্য (২ নম্বর)',
            'ga': 'ভূমি স্পর্শের সময় নির্ণয় (৩ নম্বর)',
            'gha': 'শক্তির নিত্যতা যাচাই (৪ নম্বর)',
          },
          'boardSource': 'Rajshahi Board 2023',
          'explanation': <String, dynamic>{
            'coreConcept': 'মুক্তভাবে পড়ন্ত বস্তুর ক্ষেত্রে g = 9.8 m/s²',
          },
          'difficulty': 'HARD',
          'version': 3,
        },
      ],
    };

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  late AppDatabase database;
  late PreferencesStorageService prefsStorage;
  late OfflineSyncService offlineSyncService;

  setUpAll(() async {
    SharedPreferences.setMockInitialValues(<String, Object>{});
    await PorhiTheme.initCommon(enableLogger: false);
  });

  setUp(() async {
    SharedPreferences.setMockInitialValues(<String, Object>{});
    prefsStorage = PreferencesStorageService();
    await prefsStorage.init();
    database = AppDatabase(NativeDatabase.memory());
    offlineSyncService = OfflineSyncService(database: database);
    await offlineSyncService.init();
  });

  tearDown(() async {
    Get.reset();
    offlineSyncService.onClose();
    await database.close();
  });

  group('Curriculum offline pack transactional download & delete', () {
    test(
      'downloadChapterPack persists DownloadedChapters, CachedLessons, and CachedQuestions (including cqRubric & boardSource) transactionally and removeChapterPack cleans all tables',
      () async {
        final remote = _MockCurriculumRemoteDataSource();
        final local = CurriculumLocalDataSourceImpl(
          database: database,
          preferencesStorage: prefsStorage,
        );
        final repo = CurriculumRepositoryImpl(
          remoteDataSource: remote,
          localDataSource: local,
        );

        final packModel = OfflineChapterPackModel.fromJson(
          _sampleOfflinePackJson(),
        );
        when(() => remote.getOfflineChapterPack('chap_ssc_phy_2')).thenAnswer(
          (_) async => Right<ErrorResponse, OfflineChapterPackModel>(packModel),
        );

        final downloadResult = await DownloadChapterPackUseCase(repo)(
          'chap_ssc_phy_2',
          orderIndex: 2,
        );
        expect(downloadResult.isRight(), isTrue);
        expect(await IsChapterDownloadedUseCase(repo)('chap_ssc_phy_2'), isTrue);

        // Verify Drift tables directly.
        final downloadedRows =
            await database.getDownloadedChapters(subjectId: 'sub_ssc_physics');
        expect(downloadedRows, hasLength(1));
        expect(downloadedRows.single.id, 'chap_ssc_phy_2');
        expect(downloadedRows.single.lessonCount, 1);
        expect(downloadedRows.single.questionCount, 2);
        expect(downloadedRows.single.version, 3);
        expect(downloadedRows.single.sizeBytes, greaterThan(0));

        final cachedLessons =
            await database.getCachedLessonsByChapter('chap_ssc_phy_2');
        expect(cachedLessons, hasLength(1));
        final lessonJson =
            jsonDecode(cachedLessons.single.payloadJson) as Map<String, dynamic>;
        expect(lessonJson['interactiveWidgetUrl'], '/labs/motion-graph.html');
        expect(lessonJson['audioUrl'], '/audio/lesson-intro.wav');

        final cachedQuestions =
            await database.getCachedQuestionsByChapter('chap_ssc_phy_2');
        expect(cachedQuestions, hasLength(2));
        final cqRow = cachedQuestions.firstWhere((q) => q.id == 'q_cq_1');
        expect(cqRow.questionType, 'CQ_CREATIVE');
        final cqJson = jsonDecode(cqRow.payloadJson) as Map<String, dynamic>;
        expect(cqJson['boardSource'], 'Rajshahi Board 2023');
        expect(cqJson['cqRubric'], isA<Map<String, dynamic>>());
        expect(
          (cqJson['cqRubric'] as Map<String, dynamic>)['gha'],
          contains('শক্তির নিত্যতা'),
        );

        // Verify domain reconstruction via GetOfflineChapterPackUseCase.
        final offlinePack =
            await GetOfflineChapterPackUseCase(repo)('chap_ssc_phy_2');
        expect(offlinePack, isNotNull);
        expect(offlinePack!.lessons.single.interactiveWidgetUrl,
            '/labs/motion-graph.html');
        expect(offlinePack.lessons.single.audioUrl, '/audio/lesson-intro.wav');
        final reconstructedCq =
            offlinePack.questions.firstWhere((q) => q.id == 'q_cq_1');
        expect(reconstructedCq.boardSource, 'Rajshahi Board 2023');
        expect(reconstructedCq.cqRubric?['ga'], contains('সময় নির্ণয়'));

        // Verify offline chapter listing fallback when network is unavailable.
        when(() => remote.getChaptersBySubject('sub_ssc_physics')).thenAnswer(
          (_) async => Left<ErrorResponse, ChapterListModel>(
            ErrorResponse(
              message: null,
              data: ApiResponseErrorType.noInternet,
            ),
          ),
        );
        final offlineChaptersResult =
            await GetChaptersUseCase(repo)('sub_ssc_physics');
        expect(offlineChaptersResult.isRight(), isTrue);
        final offlineChapters = offlineChaptersResult.getOrElse(
          () => throw StateError('Expected Right'),
        );
        expect(offlineChapters, hasLength(1));
        expect(offlineChapters.single.id, 'chap_ssc_phy_2');
        expect(offlineChapters.single.orderIndex, 2);
        expect(offlineChapters.single.topics, hasLength(2));
        expect(offlineChapters.single.topics.first.hasInteractiveLab, isTrue);

        // Remove offline pack and verify all 3 Drift tables are cleared.
        await RemoveChapterPackUseCase(repo)('chap_ssc_phy_2');
        expect(
            await IsChapterDownloadedUseCase(repo)('chap_ssc_phy_2'), isFalse);
        expect(await database.getDownloadedChapters(), isEmpty);
        expect(
            await database.getCachedLessonsByChapter('chap_ssc_phy_2'), isEmpty);
        expect(
            await database.getCachedQuestionsByChapter('chap_ssc_phy_2'),
            isEmpty);
      },
    );

    test(
      'saveOfflineChapterPack re-download purges stale lessons/questions while preserving prior CachedLessons.isCompleted',
      () async {
        final now = DateTime.utc(2026, 11, 12);
        await database.saveOfflineChapterPack(
          chapterId: 'chap_ssc_phy_2',
          subjectId: 'sub_ssc_physics',
          titleBangla: 'গতি (Motion)',
          version: 1,
          lessonCount: 2,
          questionCount: 1,
          sizeBytes: 1024,
          downloadedAt: now,
          lessons: <CachedLessonInput>[
            CachedLessonInput(
              id: 'les_keep_completed',
              chapterId: 'chap_ssc_phy_2',
              topicId: 'top_motion_eq',
              subjectId: 'sub_ssc_physics',
              titleBangla: 'completed lesson',
              payloadJson: '{}',
              isCompleted: true,
              updatedAt: now,
            ),
            CachedLessonInput(
              id: 'les_stale_removed',
              chapterId: 'chap_ssc_phy_2',
              topicId: 'top_removed',
              subjectId: 'sub_ssc_physics',
              titleBangla: 'stale lesson',
              payloadJson: '{}',
              isCompleted: true,
              updatedAt: now,
            ),
          ],
          questions: <CachedQuestionInput>[
            CachedQuestionInput(
              id: 'q_stale_removed',
              chapterId: 'chap_ssc_phy_2',
              topicId: 'top_removed',
              subjectId: 'sub_ssc_physics',
              questionType: 'MCQ',
              payloadJson: '{}',
              updatedAt: now,
            ),
          ],
        );

        // Re-download chapter v2 with only les_keep_completed (isCompleted: false)
        // and a new question q_v2. Prior isCompleted must survive while stale rows are purged.
        final v2Time = DateTime.utc(2026, 11, 13);
        await database.saveOfflineChapterPack(
          chapterId: 'chap_ssc_phy_2',
          subjectId: 'sub_ssc_physics',
          titleBangla: 'গতি (Motion)',
          version: 2,
          lessonCount: 2,
          questionCount: 1,
          sizeBytes: 2048,
          downloadedAt: v2Time,
          lessons: <CachedLessonInput>[
            CachedLessonInput(
              id: 'les_keep_completed',
              chapterId: 'chap_ssc_phy_2',
              topicId: 'top_motion_eq',
              subjectId: 'sub_ssc_physics',
              titleBangla: 'completed lesson v2',
              payloadJson: '{}',
              isCompleted: false,
              updatedAt: v2Time,
            ),
            CachedLessonInput(
              id: 'les_new_v2',
              chapterId: 'chap_ssc_phy_2',
              topicId: 'top_free_fall',
              subjectId: 'sub_ssc_physics',
              titleBangla: 'new lesson v2',
              payloadJson: '{}',
              isCompleted: false,
              updatedAt: v2Time,
            ),
          ],
          questions: <CachedQuestionInput>[
            CachedQuestionInput(
              id: 'q_v2',
              chapterId: 'chap_ssc_phy_2',
              topicId: 'top_free_fall',
              subjectId: 'sub_ssc_physics',
              questionType: 'MCQ',
              payloadJson: '{}',
              updatedAt: v2Time,
            ),
          ],
        );

        final lessons =
            await database.getCachedLessonsByChapter('chap_ssc_phy_2');
        expect(lessons.map((l) => l.id).toSet(),
            <String>{'les_keep_completed', 'les_new_v2'});
        final preserved =
            lessons.firstWhere((l) => l.id == 'les_keep_completed');
        expect(preserved.isCompleted, isTrue);
        final untouched = lessons.firstWhere((l) => l.id == 'les_new_v2');
        expect(untouched.isCompleted, isFalse);

        final questions =
            await database.getCachedQuestionsByChapter('chap_ssc_phy_2');
        expect(questions.map((q) => q.id).toList(), <String>['q_v2']);
      },
    );
  });

  group('5-track SubjectsView, Tab 1 shell integration & Dashboard sync', () {
    late _MockCurriculumRepository mockCurriculumRepo;
    late _MockStudentRepository mockStudentRepo;
    late _MockAuthRepository mockAuthRepo;

    setUp(() {
      mockCurriculumRepo = _MockCurriculumRepository();
      mockStudentRepo = _MockStudentRepository();
      mockAuthRepo = _MockAuthRepository();

      when(() => mockAuthRepo.getLanguage()).thenReturn('bn');
      when(() => mockAuthRepo.getCachedUser()).thenReturn(
        const AuthUserEntity(
          id: 'stu_1',
          fullName: 'তানজিম',
          selectedClass: StudentTrack.ssc,
        ),
      );

      when(() => mockStudentRepo.getActiveSubjectId(any()))
          .thenReturn('sub_ssc_physics');
      when(() => mockStudentRepo.setActiveSubjectId(any()))
          .thenAnswer((_) async {});
      when(() => mockStudentRepo.pendingSyncCount).thenReturn(0);
      when(() => mockStudentRepo.watchPendingSyncCount())
          .thenAnswer((_) => Stream<int>.value(0));
      when(() => mockStudentRepo.getCachedOverview(
            subjectId: any(named: 'subjectId'),
          )).thenAnswer((_) async => null);
      when(() => mockStudentRepo.getCachedPlannerSummary())
          .thenAnswer((_) async => null);
      when(() => mockStudentRepo.getCachedQuickSearchCatalog(
            subjectId: any(named: 'subjectId'),
          )).thenAnswer((_) async => const <QuickSearchTopicEntity>[]);
      when(() => mockStudentRepo.syncCachedBookmark(
            subjectId: any(named: 'subjectId'),
            itemId: any(named: 'itemId'),
            itemType: any(named: 'itemType'),
            titleBangla: any(named: 'titleBangla'),
            subtitleBangla: any(named: 'subtitleBangla'),
            href: any(named: 'href'),
            bookmarked: any(named: 'bookmarked'),
          )).thenAnswer((_) async {});
      when(() => mockStudentRepo.getOverview(
            subjectId: any(named: 'subjectId'),
          )).thenAnswer(
        (inv) async => Right<ErrorResponse, StudentOverviewEntity>(
          StudentOverviewEntity(
            subjectId: inv.namedArguments[#subjectId] as String,
          ),
        ),
      );
      when(() => mockStudentRepo.getPlannerSummary()).thenAnswer(
        (_) async => const Right<ErrorResponse, PlannerOverviewEntity>(
          PlannerOverviewEntity(tasks: [], todayDueCount: 0),
        ),
      );

      when(() => mockCurriculumRepo.getActiveSubjectId(any()))
          .thenReturn('sub_ssc_physics');
      when(() => mockCurriculumRepo.setActiveSubjectId(any()))
          .thenAnswer((_) async {});
      when(() => mockCurriculumRepo.getCachedSubjects(
            program: any(named: 'program'),
          )).thenAnswer((_) async => const <SubjectEntity>[]);
      when(() => mockCurriculumRepo.getDownloadedChapters(
            subjectId: any(named: 'subjectId'),
          )).thenAnswer((_) async => const <DownloadedChapterEntity>[]);
      when(() => mockCurriculumRepo.getCachedChapters(any()))
          .thenAnswer((_) async => const <ChapterEntity>[]);
    });

    void registerTestDeps() {
      Get.put<AuthRepository>(mockAuthRepo);
      Get.put<StudentRepository>(mockStudentRepo);
      Get.put<CurriculumRepository>(mockCurriculumRepo);

      Get.put<GetLanguageUseCase>(GetLanguageUseCase(mockAuthRepo));
      Get.put<GetCachedUserUseCase>(GetCachedUserUseCase(mockAuthRepo));

      Get.put<GetOverviewUseCase>(GetOverviewUseCase(mockStudentRepo));
      Get.put<GetCachedOverviewUseCase>(
        GetCachedOverviewUseCase(mockStudentRepo),
      );
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
      Get.put<GetActiveSubjectIdUseCase>(
        GetActiveSubjectIdUseCase(mockStudentRepo),
      );
      Get.put<SetActiveSubjectIdUseCase>(
        SetActiveSubjectIdUseCase(mockStudentRepo),
      );

      Get.put<GetSubjectsUseCase>(GetSubjectsUseCase(mockCurriculumRepo));
      Get.put<GetCachedSubjectsUseCase>(
        GetCachedSubjectsUseCase(mockCurriculumRepo),
      );
      Get.put<FilterSubjectsUseCase>(const FilterSubjectsUseCase());
      Get.put<GetChaptersUseCase>(GetChaptersUseCase(mockCurriculumRepo));
      Get.put<GetCachedChaptersUseCase>(
        GetCachedChaptersUseCase(mockCurriculumRepo),
      );
      Get.put<FilterChaptersUseCase>(const FilterChaptersUseCase());
      Get.put<DownloadChapterPackUseCase>(
        DownloadChapterPackUseCase(mockCurriculumRepo),
      );
      Get.put<RemoveChapterPackUseCase>(
        RemoveChapterPackUseCase(mockCurriculumRepo),
      );
      Get.put<GetDownloadedChaptersUseCase>(
        GetDownloadedChaptersUseCase(mockCurriculumRepo),
      );
      Get.put<GetOfflineChapterPackUseCase>(
        GetOfflineChapterPackUseCase(mockCurriculumRepo),
      );
      Get.put<SetActiveCurriculumSubjectUseCase>(
        SetActiveCurriculumSubjectUseCase(mockCurriculumRepo),
      );
      Get.put<GetActiveCurriculumSubjectUseCase>(
        GetActiveCurriculumSubjectUseCase(mockCurriculumRepo),
      );
      Get.put<ToggleBookmarkUseCase>(ToggleBookmarkUseCase(mockStudentRepo));
      Get.put<PatchCachedBookmarkUseCase>(
        PatchCachedBookmarkUseCase(mockStudentRepo),
      );
    }

    testWidgets(
      'MainShellView mounts SubjectsView on Tab 1 without IndexedStack, filters all 5 tracks, syncs activeSubjectId with DashboardController, and navigates to /curriculum/:subjectId',
      (tester) async {
        final subjects = SubjectListModel.fromJson(<String, dynamic>{
          'json': _sampleSubjectsJson(),
        }).toEntities();
        final chapters = ChapterListModel.fromJson(<String, dynamic>{
          'json': _sampleChaptersJson(subjectId: 'sub_hsc_physics_1'),
        }).toEntities();

        when(() => mockCurriculumRepo.getSubjects(program: any(named: 'program')))
            .thenAnswer((_) async => Right(subjects));
        when(() => mockCurriculumRepo.getChapters('sub_hsc_physics_1'))
            .thenAnswer((_) async => Right(chapters));

        registerTestDeps();

        await tester.pumpWidget(
          GetMaterialApp(
            theme: PorhiTheme.light,
            initialRoute: AppRoutes.home,
            getPages: <GetPage<dynamic>>[
              GetPage<dynamic>(
                name: AppRoutes.home,
                page: () => const MainShellView(),
                binding: MainShellBinding(),
              ),
              GetPage<dynamic>(
                name: AppRoutes.chapters,
                page: () => const ChapterIndexView(),
                binding: CurriculumBinding(),
              ),
              GetPage<dynamic>(
                name: AppRoutes.login,
                page: () => const Scaffold(body: Text('Login')),
              ),
            ],
          ),
        );
        await tester.pumpAndSettle();

        expect(find.byType(IndexedStack), findsNothing);
        expect(find.byType(SubjectsView), findsNothing);

        // Tap Tab 1 (Subjects).
        await tester.tap(find.text(AppStrings.t('nav.subjects', AppLanguage.bn)));
        await tester.pumpAndSettle();

        expect(find.byType(SubjectsView), findsOneWidget);
        expect(find.byType(IndexedStack), findsNothing);

        // Verify all 5 track filter chips + ALL are present.
        expect(find.byKey(const Key('subject_track_ALL')), findsOneWidget);
        for (final track in StudentTrack.values) {
          expect(
            find.byKey(Key('subject_track_${track.apiValue}')),
            findsOneWidget,
          );
        }

        // Filter by HSC track.
        await tester.tap(find.byKey(const Key('subject_track_HSC')));
        await tester.pumpAndSettle();
        expect(find.text('HSC পদার্থবিজ্ঞান ১ম পত্র'), findsOneWidget);
        expect(find.text('অষ্টম শ্রেণির বিজ্ঞান'), findsNothing);

        // Filter by BCS track.
        await tester.tap(find.byKey(const Key('subject_track_BCS')));
        await tester.pumpAndSettle();
        expect(find.text('BCS প্রিলিমিনারি: সাধারণ বিজ্ঞান'), findsOneWidget);
        expect(find.text('HSC পদার্থবিজ্ঞান ১ম পত্র'), findsNothing);

        // Switch back to ALL and select HSC subject -> syncs activeSubjectId & navigates.
        await tester.tap(find.byKey(const Key('subject_track_ALL')));
        await tester.pumpAndSettle();

        when(() => mockStudentRepo.getActiveSubjectId(any()))
            .thenReturn('sub_hsc_physics_1');

        final hscCard = find.byKey(const Key('subject_card_sub_hsc_physics_1'));
        await tester.scrollUntilVisible(
          hscCard,
          200,
          scrollable: find.byType(Scrollable).first,
        );
        await tester.pumpAndSettle();
        await tester.tap(hscCard);
        await tester.pumpAndSettle();

        verify(
          () => mockCurriculumRepo.setActiveSubjectId('sub_hsc_physics_1'),
        ).called(1);
        expect(
          Get.find<DashboardController>().activeSubjectId.value,
          'sub_hsc_physics_1',
        );
        expect(find.byType(ChapterIndexView), findsOneWidget);
        expect(find.text('গতি (Motion)'), findsOneWidget);

        // Logout disposes shell, dashboard, and subjects controllers cleanly (no fenix).
        Get.offAllNamed(AppRoutes.login);
        await tester.pumpAndSettle();
        expect(Get.isRegistered<MainShellController>(), isFalse);
        expect(Get.isRegistered<DashboardController>(), isFalse);
        expect(Get.isRegistered<SubjectsController>(), isFalse);
        expect(Get.isRegistered<ChapterIndexController>(), isFalse);
      },
    );

    testWidgets(
      'ChapterIndexView supports topic filter pills, offline pack download/delete, and error retry UI on null message',
      (tester) async {
        final chapters = ChapterListModel.fromJson(<String, dynamic>{
          'json': _sampleChaptersJson(),
        }).toEntities();

        // First return network failure with null message to verify Retry UI.
        when(() => mockCurriculumRepo.getChapters('sub_ssc_physics'))
            .thenAnswer(
          (_) async => Left<ErrorResponse, List<ChapterEntity>>(
            ErrorResponse(
              message: null,
              data: ApiResponseErrorType.noInternet,
            ),
          ),
        );

        registerTestDeps();

        await tester.pumpWidget(
          GetMaterialApp(
            theme: PorhiTheme.light,
            initialRoute: AppRoutes.chaptersForSubject('sub_ssc_physics'),
            getPages: <GetPage<dynamic>>[
              GetPage<dynamic>(
                name: AppRoutes.chapters,
                page: () => const ChapterIndexView(),
                binding: CurriculumBinding(),
              ),
            ],
          ),
        );
        await tester.pumpAndSettle();

        expect(
          find.text(AppStrings.t('action.retry', AppLanguage.bn)),
          findsOneWidget,
        );

        // Now resolve chapters and tap Retry.
        when(() => mockCurriculumRepo.getChapters('sub_ssc_physics'))
            .thenAnswer((_) async => Right(chapters));
        await tester.tap(find.text(AppStrings.t('action.retry', AppLanguage.bn)));
        await tester.pumpAndSettle();

        expect(find.text('গতি (Motion)'), findsOneWidget);
        expect(find.text('গতির সমীকরণ ল্যাব'), findsOneWidget);
        expect(find.text('পড়ন্ত বস্তুর সূত্র'), findsOneWidget);

        // Filter by Interactive Lab pill.
        await tester.tap(find.byKey(const Key('topic_filter_lab')));
        await tester.pumpAndSettle();
        expect(find.text('গতির সমীকরণ ল্যাব'), findsOneWidget);
        expect(find.text('পড়ন্ত বস্তুর সূত্র'), findsNothing);

        await tester.tap(find.byKey(const Key('topic_filter_all')));
        await tester.pumpAndSettle();

        // Download offline pack for chap_ssc_phy_2.
        final pack = OfflineChapterPackModel.fromJson(
          _sampleOfflinePackJson(),
        ).toEntity(sizeBytes: 2048);
        when(
          () => mockCurriculumRepo.downloadChapterPack(
            'chap_ssc_phy_2',
            orderIndex: any(named: 'orderIndex'),
          ),
        ).thenAnswer((_) async => Right(pack));
        when(
          () => mockCurriculumRepo.removeChapterPack('chap_ssc_phy_2'),
        ).thenAnswer((_) async {});

        await tester.tap(
          find.byKey(const Key('offline_pack_btn_chap_ssc_phy_2')),
        );
        await tester.pumpAndSettle();

        verify(
          () => mockCurriculumRepo.downloadChapterPack(
            'chap_ssc_phy_2',
            orderIndex: 2,
          ),
        ).called(1);
        expect(
          find.byKey(const Key('offline_saved_badge_chap_ssc_phy_2')),
          findsOneWidget,
        );

        // Tap again to remove offline pack.
        final offlineBtn =
            find.byKey(const Key('offline_pack_btn_chap_ssc_phy_2'));
        await tester.ensureVisible(offlineBtn);
        await tester.pumpAndSettle();
        await tester.tap(offlineBtn);
        await tester.pumpAndSettle();

        verify(() => mockCurriculumRepo.removeChapterPack('chap_ssc_phy_2'))
            .called(1);
        expect(
          find.byKey(const Key('offline_saved_badge_chap_ssc_phy_2')),
          findsNothing,
        );

        // Expand/Collapse All hides and restores topic rows.
        await tester.tap(find.byKey(const Key('expand_collapse_all_btn')));
        await tester.pumpAndSettle();
        expect(find.text('গতির সমীকরণ ল্যাব'), findsNothing);

        await tester.tap(find.byKey(const Key('expand_collapse_all_btn')));
        await tester.pumpAndSettle();
        expect(find.text('গতির সমীকরণ ল্যাব'), findsOneWidget);
      },
    );

    testWidgets(
      'Offline downloaded chapters can be listed and opened from SubjectsView and ChapterIndexView when network is offline',
      (tester) async {
        final downloaded = <DownloadedChapterEntity>[
          DownloadedChapterEntity(
            chapterId: 'chap_ssc_phy_2',
            subjectId: 'sub_ssc_physics',
            orderIndex: 2,
            titleBangla: 'গতি (Motion)',
            version: 3,
            versionHash: 'v1-1-2-3',
            lessonCount: 1,
            questionCount: 2,
            sizeBytes: 2048,
            downloadedAt: DateTime.utc(2026, 11, 12),
            topics: const <TopicEntity>[
              TopicEntity(
                id: 'top_motion_eq',
                chapterId: 'chap_ssc_phy_2',
                orderIndex: 1,
                titleBangla: 'গতির সমীকরণ ল্যাব',
                lessonCount: 1,
                hasInteractiveLab: true,
              ),
            ],
          ),
        ];
        final offlineChapters = downloaded.map((d) => d.toChapterEntity()).toList();
        final offlinePack = OfflineChapterPackModel.fromJson(
          _sampleOfflinePackJson(),
        ).toEntity(sizeBytes: 2048);

        when(() => mockCurriculumRepo.getSubjects(program: any(named: 'program')))
            .thenAnswer(
          (_) async => Left<ErrorResponse, List<SubjectEntity>>(
            ErrorResponse(
              message: null,
              data: ApiResponseErrorType.noInternet,
            ),
          ),
        );
        when(() => mockCurriculumRepo.getDownloadedChapters(
              subjectId: any(named: 'subjectId'),
            )).thenAnswer((_) async => downloaded);
        when(() => mockCurriculumRepo.getCachedChapters('sub_ssc_physics'))
            .thenAnswer((_) async => offlineChapters);
        when(() => mockCurriculumRepo.getChapters('sub_ssc_physics'))
            .thenAnswer((_) async => Right(offlineChapters));
        when(() => mockCurriculumRepo.getOfflineChapterPack('chap_ssc_phy_2'))
            .thenAnswer((_) async => offlinePack);

        registerTestDeps();

        await tester.pumpWidget(
          GetMaterialApp(
            theme: PorhiTheme.light,
            initialRoute: AppRoutes.subjects,
            getPages: <GetPage<dynamic>>[
              GetPage<dynamic>(
                name: AppRoutes.subjects,
                page: () => const SubjectsView(),
                binding: SubjectsBinding(),
              ),
              GetPage<dynamic>(
                name: AppRoutes.chapters,
                page: () => const ChapterIndexView(),
                binding: CurriculumBinding(),
              ),
            ],
          ),
        );
        await tester.pumpAndSettle();

        // Downloaded chapter shortcut appears even when subjects fetch failed.
        expect(find.byKey(const Key('downloaded_chapters_summary')), findsOneWidget);
        await tester.tap(
          find.byKey(const Key('offline_chapter_shortcut_chap_ssc_phy_2')),
        );
        await tester.pumpAndSettle();

        expect(find.byType(ChapterIndexView), findsOneWidget);
        expect(find.text('গতি (Motion)'), findsOneWidget);
        expect(
          find.byKey(const Key('offline_saved_badge_chap_ssc_phy_2')),
          findsOneWidget,
        );

        // Tap topic row to open offline preview sheet with lesson details.
        final topicRow = find.byKey(const Key('topic_row_top_motion_eq'));
        await tester.scrollUntilVisible(
          topicRow,
          150,
          scrollable: find.byType(Scrollable).first,
        );
        await tester.pumpAndSettle();
        await tester.tap(topicRow);
        await tester.pumpAndSettle();
        expect(find.text('গতির চারটি মৌলিক সমীকরণ'), findsOneWidget);
      },
    );

    testWidgets(
      'Returning from /account on another tab refreshes SubjectsView language & downloadedChapters, offline loadSubjects marks isOfflineCache=true, search filters, and double-tapping SubjectCard navigates once',
      (tester) async {
        final subjects = SubjectListModel.fromJson(<String, dynamic>{
          'json': _sampleSubjectsJson(),
        }).toEntities();
        final downloaded = <DownloadedChapterEntity>[
          DownloadedChapterEntity(
            chapterId: 'chap_ssc_phy_2',
            subjectId: 'sub_ssc_physics',
            orderIndex: 2,
            titleBangla: 'গতি (Motion)',
            version: 1,
            versionHash: 'v1',
            lessonCount: 1,
            questionCount: 1,
            sizeBytes: 1024,
            downloadedAt: DateTime.utc(2026, 11, 12),
          ),
        ];

        var currentLang = 'bn';
        var currentDownloaded = List<DownloadedChapterEntity>.from(downloaded);
        var failSubjectsNetwork = false;
        var curriculumBuildCount = 0;

        when(() => mockAuthRepo.getLanguage()).thenAnswer((_) => currentLang);
        when(() => mockCurriculumRepo.getSubjects(program: any(named: 'program')))
            .thenAnswer((_) async {
          if (failSubjectsNetwork) {
            return Left<ErrorResponse, List<SubjectEntity>>(
              ErrorResponse(
                message: null,
                data: ApiResponseErrorType.noInternet,
              ),
            );
          }
          return Right<ErrorResponse, List<SubjectEntity>>(subjects);
        });
        when(() => mockCurriculumRepo.getDownloadedChapters(
              subjectId: any(named: 'subjectId'),
            )).thenAnswer((_) async => currentDownloaded);
        when(() => mockCurriculumRepo.getChapters(any()))
            .thenAnswer((_) async => const Right(<ChapterEntity>[]));

        registerTestDeps();

        await tester.pumpWidget(
          GetMaterialApp(
            theme: PorhiTheme.light,
            initialRoute: AppRoutes.home,
            getPages: <GetPage<dynamic>>[
              GetPage<dynamic>(
                name: AppRoutes.home,
                page: () => const MainShellView(),
                binding: MainShellBinding(),
              ),
              GetPage<dynamic>(
                name: AppRoutes.account,
                page: () => Scaffold(
                  body: ElevatedButton(
                    key: const Key('mock_account_clear_and_switch_lang'),
                    onPressed: () {
                      currentLang = 'en';
                      currentDownloaded = <DownloadedChapterEntity>[];
                      Get.back<void>();
                    },
                    child: const Text('Update Prefs & Clear Cache'),
                  ),
                ),
              ),
              GetPage<dynamic>(
                name: AppRoutes.chapters,
                page: () {
                  curriculumBuildCount += 1;
                  return const ChapterIndexView();
                },
                binding: CurriculumBinding(),
              ),
            ],
          ),
        );
        await tester.pumpAndSettle();

        // Visit Tab 1 (Subjects) first so SubjectsController is live & shows downloaded summary in bn.
        await tester.tap(find.text(AppStrings.t('nav.subjects', AppLanguage.bn)));
        await tester.pumpAndSettle();
        expect(find.text('বিষয় ক্যাটালগ'), findsOneWidget);
        expect(find.byKey(const Key('downloaded_chapters_summary')), findsOneWidget);

        // Switch to Tab 2 (Planner) and open /account from _ShellPlaceholderSlot.
        await tester.tap(find.text(AppStrings.t('nav.planner', AppLanguage.bn)));
        await tester.pumpAndSettle();
        await tester.tap(find.byKey(const Key('slot_account_button')));
        await tester.pumpAndSettle();

        // Simulate clearing offline cache and switching language to EN in /account, then popping back.
        await tester.tap(
          find.byKey(const Key('mock_account_clear_and_switch_lang')),
        );
        await tester.pumpAndSettle();

        // Switch back to Tab 1 (Subjects): language and downloadedChapters must already reflect changes.
        await tester.tap(find.text(AppStrings.t('nav.subjects', AppLanguage.en)));
        await tester.pumpAndSettle();
        expect(find.text('Subject Catalog'), findsOneWidget);
        expect(find.byKey(const Key('downloaded_chapters_summary')), findsNothing);

        // Verify offline loadSubjects sets isOfflineCache=true when allSubjects is already populated.
        failSubjectsNetwork = true;
        final subjectsCtrl = Get.find<SubjectsController>();
        await subjectsCtrl.loadSubjects();
        await tester.pumpAndSettle();
        expect(subjectsCtrl.isOfflineCache.value, isTrue);

        // Verify search filtering narrows visible subjects cleanly.
        await tester.enterText(
          find.byKey(const Key('subjects_search_input')),
          'BCS',
        );
        await tester.pumpAndSettle();
        expect(find.text('BCS প্রিলিমিনারি: সাধারণ বিজ্ঞান'), findsOneWidget);
        expect(find.text('পদার্থবিজ্ঞান'), findsNothing);
        await tester.tap(find.byKey(const Key('subjects_search_clear_btn')));
        await tester.pumpAndSettle();

        // Verify rapid double-tap on SubjectCard only navigates to /curriculum/:subjectId once.
        final setActiveCompleter = Completer<void>();
        when(() => mockCurriculumRepo.setActiveSubjectId('sub_hsc_physics_1'))
            .thenAnswer((_) => setActiveCompleter.future);

        final hscCard = find.byKey(const Key('subject_card_sub_hsc_physics_1'));
        await tester.scrollUntilVisible(
          hscCard,
          200,
          scrollable: find.byType(Scrollable).first,
        );
        await tester.pumpAndSettle();

        await tester.tap(hscCard);
        await tester.pump();
        await tester.tap(hscCard);
        await tester.pump();

        setActiveCompleter.complete();
        await tester.pumpAndSettle();

        verify(
          () => mockCurriculumRepo.setActiveSubjectId('sub_hsc_physics_1'),
        ).called(1);
        expect(curriculumBuildCount, 1);
      },
    );

    testWidgets(
      'ChapterIndexController guards double-tapped bookmarks, surfaces error banner on failure, and persists cached bookmark across re-open',
      (tester) async {
        final chapters = ChapterListModel.fromJson(<String, dynamic>{
          'json': _sampleChaptersJson(),
        }).toEntities();

        var cachedOverview = const StudentOverviewEntity(
          subjectId: 'sub_ssc_physics',
          bookmarks: <StudentBookmarkEntity>[],
        );

        when(() => mockCurriculumRepo.getChapters('sub_ssc_physics'))
            .thenAnswer((_) async => Right(chapters));
        when(() => mockStudentRepo.getCachedOverview(subjectId: 'sub_ssc_physics'))
            .thenAnswer((_) async => cachedOverview);
        when(() => mockStudentRepo.syncCachedBookmark(
              subjectId: any(named: 'subjectId'),
              itemId: any(named: 'itemId'),
              itemType: any(named: 'itemType'),
              titleBangla: any(named: 'titleBangla'),
              subtitleBangla: any(named: 'subtitleBangla'),
              href: any(named: 'href'),
              bookmarked: any(named: 'bookmarked'),
            )).thenAnswer((inv) async {
          final itemId = inv.namedArguments[#itemId] as String;
          final bookmarked = inv.namedArguments[#bookmarked] as bool;
          final updated = cachedOverview.bookmarks
              .where((b) => b.id != itemId)
              .toList();
          if (bookmarked) {
            updated.add(
              StudentBookmarkEntity(
                id: itemId,
                type: inv.namedArguments[#itemType] as String,
                titleBangla: inv.namedArguments[#titleBangla] as String,
                subtitleBangla: inv.namedArguments[#subtitleBangla] as String?,
                href: inv.namedArguments[#href] as String,
                createdAt: DateTime.utc(2026, 11, 12).toIso8601String(),
              ),
            );
          }
          cachedOverview = StudentOverviewEntity(
            subjectId: cachedOverview.subjectId,
            bookmarks: updated,
          );
        });

        final bookmarkCompleter =
            Completer<Either<ErrorResponse, bool>>();
        var bookmarkCalls = 0;
        when(() => mockStudentRepo.toggleBookmark(
              itemId: 'top_motion_eq',
              itemType: any(named: 'itemType'),
              titleBangla: any(named: 'titleBangla'),
              subtitleBangla: any(named: 'subtitleBangla'),
              href: any(named: 'href'),
            )).thenAnswer((_) {
          bookmarkCalls += 1;
          if (bookmarkCalls == 1) {
            return bookmarkCompleter.future;
          }
          return Future<Either<ErrorResponse, bool>>.value(
            Left<ErrorResponse, bool>(
              ErrorResponse(
                message: 'Bookmark error',
                data: ApiResponseErrorType.serverError,
              ),
            ),
          );
        });

        registerTestDeps();

        await tester.pumpWidget(
          GetMaterialApp(
            theme: PorhiTheme.light,
            initialRoute: AppRoutes.subjects,
            getPages: <GetPage<dynamic>>[
              GetPage<dynamic>(
                name: AppRoutes.subjects,
                page: () => const Scaffold(body: Text('Root')),
              ),
              GetPage<dynamic>(
                name: AppRoutes.chapters,
                page: () => const ChapterIndexView(),
                binding: CurriculumBinding(),
              ),
            ],
          ),
        );
        await tester.pumpAndSettle();

        unawaited(
          Get.toNamed(AppRoutes.chaptersForSubject('sub_ssc_physics')),
        );
        await tester.pumpAndSettle();

        final bookmarkBtn =
            find.byKey(const Key('topic_bookmark_btn_top_motion_eq'));
        await tester.ensureVisible(bookmarkBtn);
        await tester.pumpAndSettle();

        // Rapid double-tap while first bookmark request is in flight: only 1 call runs.
        await tester.tap(bookmarkBtn);
        await tester.pump();
        await tester.tap(bookmarkBtn);
        await tester.pump();
        expect(bookmarkCalls, 1);

        bookmarkCompleter.complete(const Right<ErrorResponse, bool>(true));
        await tester.pumpAndSettle();

        expect(
          Get.find<ChapterIndexController>()
              .bookmarkedTopicIds
              .contains('top_motion_eq'),
          isTrue,
        );
        verify(
          () => mockStudentRepo.syncCachedBookmark(
            subjectId: 'sub_ssc_physics',
            itemId: 'top_motion_eq',
            itemType: 'topic',
            titleBangla: 'গতির সমীকরণ ল্যাব',
            subtitleBangla: 'গতি (Motion)',
            href: '/lesson/top_motion_eq',
            bookmarked: true,
          ),
        ).called(1);

        // Next tap fails -> error banner surfaces and bookmark remains true.
        await tester.tap(bookmarkBtn);
        await tester.pumpAndSettle();
        expect(
          Get.find<ChapterIndexController>().packStatusMessage.value,
          'Bookmark error',
        );
        expect(
          Get.find<ChapterIndexController>().isPackStatusError.value,
          isTrue,
        );
        await tester.scrollUntilVisible(
          find.byKey(const Key('offline_pack_status_banner')),
          -200,
          scrollable: find.byType(Scrollable).first,
        );
        await tester.pumpAndSettle();
        expect(find.byKey(const Key('offline_pack_status_banner')), findsOneWidget);
        expect(find.text('Bookmark error'), findsOneWidget);

        // Leave /curriculum/:subjectId and re-open: cached bookmark persists immediately.
        Get.back<void>();
        await tester.pumpAndSettle();
        unawaited(
          Get.toNamed(AppRoutes.chaptersForSubject('sub_ssc_physics')),
        );
        await tester.pumpAndSettle();
        expect(
          Get.find<ChapterIndexController>()
              .bookmarkedTopicIds
              .contains('top_motion_eq'),
          isTrue,
        );
      },
    );

    testWidgets(
      'ChapterIndexController guards offline pack removal concurrency and surfaces SQLite exceptions in packStatusMessage',
      (tester) async {
        final chapters = ChapterListModel.fromJson(<String, dynamic>{
          'json': _sampleChaptersJson(),
        }).toEntities();
        final downloaded = <DownloadedChapterEntity>[
          DownloadedChapterEntity(
            chapterId: 'chap_ssc_phy_2',
            subjectId: 'sub_ssc_physics',
            orderIndex: 2,
            titleBangla: 'গতি (Motion)',
            version: 1,
            versionHash: 'v1',
            lessonCount: 1,
            questionCount: 2,
            sizeBytes: 1024,
            downloadedAt: DateTime.utc(2026, 11, 12),
          ),
        ];

        when(() => mockCurriculumRepo.getChapters('sub_ssc_physics'))
            .thenAnswer((_) async => Right(chapters));
        when(() => mockCurriculumRepo.getDownloadedChapters(
              subjectId: 'sub_ssc_physics',
            )).thenAnswer((_) async => downloaded);

        final removeCompleter = Completer<void>();
        var removeCalls = 0;
        when(() => mockCurriculumRepo.removeChapterPack('chap_ssc_phy_2'))
            .thenAnswer((_) {
          removeCalls += 1;
          if (removeCalls == 1) {
            return removeCompleter.future;
          }
          return Future<void>.error(Exception('disk I/O error'));
        });

        registerTestDeps();

        await tester.pumpWidget(
          GetMaterialApp(
            theme: PorhiTheme.light,
            initialRoute: AppRoutes.chaptersForSubject('sub_ssc_physics'),
            getPages: <GetPage<dynamic>>[
              GetPage<dynamic>(
                name: AppRoutes.chapters,
                page: () => const ChapterIndexView(),
                binding: CurriculumBinding(),
              ),
            ],
          ),
        );
        await tester.pumpAndSettle();

        final ctrl = Get.find<ChapterIndexController>();
        final chapter = chapters.first;

        // Concurrent double removal only invokes removeChapterPack once.
        final f1 = ctrl.toggleOfflinePack(chapter);
        final f2 = ctrl.toggleOfflinePack(chapter);
        await tester.pump();
        expect(removeCalls, 1);

        removeCompleter.completeError(Exception('disk I/O error'));
        await Future.wait(<Future<void>>[f1, f2]);
        await tester.pumpAndSettle();

        expect(ctrl.isPackStatusError.value, isTrue);
        expect(ctrl.packStatusMessage.value, isNotNull);
        expect(
          ctrl.downloadingChapterIds.contains('chap_ssc_phy_2'),
          isFalse,
        );
        expect(find.byKey(const Key('offline_pack_status_banner')), findsOneWidget);
      },
    );

    testWidgets(
      'Offline chapter preview sheet wraps long learningGoal in SingleChildScrollView without overflow',
      (tester) async {
        final longGoal = List<String>.filled(
          40,
          'দীর্ঘ শিখনফল: গতির চারটি মৌলিক সমীকরণ ও লেখচিত্র বিশ্লেষণ।',
        ).join(' ');
        final downloaded = <DownloadedChapterEntity>[
          DownloadedChapterEntity(
            chapterId: 'chap_ssc_phy_2',
            subjectId: 'sub_ssc_physics',
            orderIndex: 2,
            titleBangla: 'গতি (Motion)',
            version: 1,
            versionHash: 'v1',
            lessonCount: 1,
            questionCount: 0,
            sizeBytes: 2048,
            downloadedAt: DateTime.utc(2026, 11, 12),
            topics: const <TopicEntity>[
              TopicEntity(
                id: 'top_motion_eq',
                chapterId: 'chap_ssc_phy_2',
                orderIndex: 1,
                titleBangla: 'গতির সমীকরণ ল্যাব',
                lessonCount: 1,
              ),
            ],
          ),
        ];
        final chapters = downloaded.map((d) => d.toChapterEntity()).toList();
        final pack = OfflineChapterPackEntity(
          chapterId: 'chap_ssc_phy_2',
          subjectId: 'sub_ssc_physics',
          titleBangla: 'গতি (Motion)',
          versionHash: 'v1',
          sizeBytes: 2048,
          downloadedAt: DateTime.utc(2026, 11, 12),
          topics: downloaded.single.topics,
          lessons: <OfflineLessonEntity>[
            OfflineLessonEntity(
              id: 'les_long',
              topicId: 'top_motion_eq',
              titleBangla: 'দীর্ঘ লেসন',
              learningGoal: longGoal,
            ),
          ],
          questions: const <OfflineQuestionEntity>[],
        );

        when(() => mockCurriculumRepo.getChapters('sub_ssc_physics'))
            .thenAnswer((_) async => Right(chapters));
        when(() => mockCurriculumRepo.getDownloadedChapters(
              subjectId: 'sub_ssc_physics',
            )).thenAnswer((_) async => downloaded);
        when(() => mockCurriculumRepo.getOfflineChapterPack('chap_ssc_phy_2'))
            .thenAnswer((_) async => pack);

        registerTestDeps();

        await tester.binding.setSurfaceSize(const Size(360, 480));
        addTearDown(() => tester.binding.setSurfaceSize(null));

        await tester.pumpWidget(
          GetMaterialApp(
            theme: PorhiTheme.light,
            initialRoute: AppRoutes.chaptersForSubject('sub_ssc_physics'),
            getPages: <GetPage<dynamic>>[
              GetPage<dynamic>(
                name: AppRoutes.chapters,
                page: () => const ChapterIndexView(),
                binding: CurriculumBinding(),
              ),
            ],
          ),
        );
        await tester.pumpAndSettle();

        final topicRow = find.byKey(const Key('topic_row_top_motion_eq'));
        await tester.scrollUntilVisible(
          topicRow,
          150,
          scrollable: find.byType(Scrollable).first,
        );
        await tester.pumpAndSettle();
        await tester.tap(topicRow);
        await tester.pumpAndSettle();

        expect(find.byType(SingleChildScrollView), findsOneWidget);
        expect(find.text('দীর্ঘ লেসন'), findsOneWidget);
        expect(tester.takeException(), isNull);
      },
    );
  });

  group('InitialBinding & AppPages wiring for curriculum', () {
    test(
      'InitialBinding registers CurriculumRepository & use cases and AppPages registers /curriculum/:subjectId',
      () {
        InitialBinding(
          database: database,
          preferencesStorage: prefsStorage,
          secureStorage: SecureStorageService(),
          firebaseGateway: _MockFirebaseAuthGateway(),
          initNetwork: false,
        ).dependencies();

        expect(Get.isRegistered<CurriculumRepository>(), isTrue);
        expect(Get.isRegistered<GetSubjectsUseCase>(), isTrue);
        expect(Get.isRegistered<GetChaptersUseCase>(), isTrue);
        expect(Get.isRegistered<DownloadChapterPackUseCase>(), isTrue);
        expect(Get.isRegistered<RemoveChapterPackUseCase>(), isTrue);

        final curriculumRoute = AppPages.routes.firstWhere(
          (r) => r.name == AppRoutes.chapters,
        );
        expect(curriculumRoute.binding, isA<CurriculumBinding>());
      },
    );
  });
}
