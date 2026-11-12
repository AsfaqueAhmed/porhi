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
import 'package:porhi/features/dashboard/data/datasources/student_local_datasource.dart';
import 'package:porhi/features/dashboard/data/datasources/student_remote_datasource.dart';
import 'package:porhi/features/dashboard/data/models/student_overview_model.dart';
import 'package:porhi/features/dashboard/data/repositories/student_repository_impl.dart';
import 'package:porhi/features/dashboard/domain/entities/student_overview_entity.dart';
import 'package:porhi/features/dashboard/domain/repositories/student_repository.dart';
import 'package:porhi/features/dashboard/domain/usecases/student_usecases.dart';
import 'package:porhi/features/dashboard/presentation/dashboard/binding/dashboard_binding.dart';
import 'package:porhi/features/dashboard/presentation/dashboard/controller/dashboard_controller.dart';
import 'package:porhi/features/dashboard/presentation/dashboard/view/dashboard_view.dart';
import 'package:porhi/features/dashboard/presentation/shared/quick_search_sheet.dart';
import 'package:porhi/features/shell/presentation/main_shell/binding/main_shell_binding.dart';
import 'package:porhi/features/shell/presentation/main_shell/controller/main_shell_controller.dart';
import 'package:porhi/features/shell/presentation/main_shell/view/main_shell_view.dart';
import 'package:porhi/routes/app_pages.dart';
import 'package:porhi/routes/app_routes.dart';
import 'package:shared_preferences/shared_preferences.dart';

class _MockStudentRemoteDataSource extends Mock
    implements StudentRemoteDataSource {}

class _MockAuthRepository extends Mock implements AuthRepository {}

class _MockStudentRepository extends Mock implements StudentRepository {}

class _MockFirebaseAuthGateway extends Mock implements FirebaseAuthGateway {}

Map<String, dynamic> _sampleOverviewJson({
  int streakDays = 5,
  String topicTitle = 'গতির সমীকরণ',
}) {
  final today = DateTime.now().toUtc();
  final todayIso = today.toIso8601String().slice(0, 10);
  final yesterdayIso =
      today.subtract(const Duration(days: 1)).toIso8601String().slice(0, 10);

  return <String, dynamic>{
    'subjectId': 'sub_ssc_physics',
    'curriculumTotals': <String, dynamic>{
      'totalChapters': 4,
      'totalTopics': 10,
      'totalPublishedLessons': 10,
      'totalPublishedQuestions': 40,
    },
    'completedTopicIds': <String>['top_1', 'top_2'],
    'lastStudiedTopic': <String, dynamic>{
      'topicId': 'top_2',
      'topicTitle': topicTitle,
      'chapterId': 'chap_ssc_physics_ch2',
      'chapterTitle': 'গতি',
      'timestamp': today.toIso8601String(),
    },
    'practiceStats': <String, dynamic>{
      'totalAttempts': 20,
      'correctAttempts': 16,
      'accuracyPercent': 80,
      'topicMastery': <String, dynamic>{
        'top_2': <String, dynamic>{
          'attempts': 10,
          'correct': 8,
          'accuracy': 80,
        },
      },
    },
    'streakDays': streakDays,
    'studyDates': <String>[yesterdayIso, todayIso],
    'dueMistakes': <Map<String, dynamic>>[
      <String, dynamic>{
        'id': 'mis_1',
        'questionId': 'q_101',
        'attemptCount': 2,
        'updatedAt': today.toIso8601String(),
        'topicId': 'top_2',
        'topicTitle': topicTitle,
        'chapterId': 'chap_ssc_physics_ch2',
        'chapterTitle': 'গতি',
        'stem': 'বেগের একক কোনটি?',
        'correctOptionText': 'm/s',
        'conceptNote': 'বেগ = সরণ / সময়',
      },
    ],
    'weakTopics': <Map<String, dynamic>>[],
    'recentExams': <Map<String, dynamic>>[],
    'bookmarks': <Map<String, dynamic>>[
      <String, dynamic>{
        'id': 'top_2',
        'type': 'topic',
        'titleBangla': topicTitle,
        'subtitleBangla': 'গতি',
        'href': '/lesson/top_2',
        'createdAt': today.toIso8601String(),
      },
    ],
    'lessonNotes': <String, dynamic>{'top_2': 'v = u + at'},
  };
}

extension on String {
  String slice(int start, int end) => substring(start, end);
}

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

  group('StudentRepository & GetOverviewUseCase offline cache', () {
    test(
      'GetOverviewUseCase returns cached overview when offline and live overview when online',
      () async {
        final remote = _MockStudentRemoteDataSource();
        final local = StudentLocalDataSourceImpl(
          database: database,
          preferencesStorage: prefsStorage,
        );
        final repo = StudentRepositoryImpl(
          remoteDataSource: remote,
          localDataSource: local,
          offlineSyncService: offlineSyncService,
        );
        final getOverviewUseCase = GetOverviewUseCase(repo);

        final liveModel = StudentOverviewModel.fromJson(
          _sampleOverviewJson(streakDays: 7, topicTitle: 'নিউটনের দ্বিতীয় সূত্র'),
        );
        when(() => remote.getOverview('sub_ssc_physics')).thenAnswer(
          (_) async => Right<ErrorResponse, StudentOverviewModel>(liveModel),
        );

        final onlineResult = await getOverviewUseCase(
          subjectId: 'sub_ssc_physics',
        );
        expect(onlineResult.isRight(), isTrue);
        final onlineEntity = onlineResult.getOrElse(
          () => throw StateError('Expected Right'),
        );
        expect(onlineEntity.streakDays, 7);
        expect(onlineEntity.isFromCache, isFalse);
        expect(
          onlineEntity.lastStudiedTopic?.topicTitle,
          'নিউটনের দ্বিতীয় সূত্র',
        );

        // Now simulate offline failure; should fall back to LocalStudentCache.
        when(() => remote.getOverview('sub_ssc_physics')).thenAnswer(
          (_) async => Left<ErrorResponse, StudentOverviewModel>(
            ErrorResponse(
              message: 'No internet',
              data: ApiResponseErrorType.noInternet,
            ),
          ),
        );

        final offlineResult = await getOverviewUseCase(
          subjectId: 'sub_ssc_physics',
        );
        expect(offlineResult.isRight(), isTrue);
        final offlineEntity = offlineResult.getOrElse(
          () => throw StateError('Expected Right'),
        );
        expect(offlineEntity.streakDays, 7);
        expect(offlineEntity.isFromCache, isTrue);
        expect(
          offlineEntity.lastStudiedTopic?.topicTitle,
          'নিউটনের দ্বিতীয় সূত্র',
        );
      },
    );
  });

  group('FilterQuickSearchTopicsUseCase', () {
    test('matches Bangla/English titles and lab/ল্যাব keyword', () {
      const useCase = FilterQuickSearchTopicsUseCase();
      const items = <QuickSearchTopicEntity>[
        QuickSearchTopicEntity(
          topicId: 't1',
          topicTitle: 'গতির সমীকরণ',
          chapterId: 'c1',
          chapterTitle: 'গতি',
          subjectId: 'sub_ssc_physics',
          hasInteractiveLab: true,
          isCompleted: true,
        ),
        QuickSearchTopicEntity(
          topicId: 't2',
          topicTitle: 'কাজ ও ক্ষমতা',
          chapterId: 'c2',
          chapterTitle: 'কাজ, ক্ষমতা ও শক্তি',
          subjectId: 'sub_ssc_physics',
          hasInteractiveLab: false,
          isCompleted: false,
        ),
      ];

      expect(useCase(items: items, query: 'সমীকরণ').length, 1);
      expect(useCase(items: items, query: 'শক্তি').single.topicId, 't2');
      expect(useCase(items: items, query: 'lab').single.topicId, 't1');
      expect(useCase(items: items, query: 'ল্যাব').single.topicId, 't1');
    });
  });

  group('MainShellView, DashboardView & QuickSearchSheet widgets', () {
    late _MockStudentRepository mockStudentRepo;
    late _MockAuthRepository mockAuthRepo;

    setUp(() {
      mockStudentRepo = _MockStudentRepository();
      mockAuthRepo = _MockAuthRepository();

      when(() => mockAuthRepo.getLanguage()).thenReturn('bn');
      when(() => mockAuthRepo.getCachedUser()).thenReturn(
        const AuthUserEntity(
          id: 'stu_1',
          fullName: 'রাফি আহমেদ',
          selectedClass: StudentTrack.ssc,
        ),
      );
      when(() => mockStudentRepo.getActiveSubjectId(any()))
          .thenReturn('sub_ssc_physics');
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
    });

    void registerDashboardDependencies() {
      Get.put<StudentRepository>(mockStudentRepo);
      Get.put<AuthRepository>(mockAuthRepo);
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
    }

    testWidgets(
      'MainShellView switches active tab via Obx without mounting inactive tabs in an IndexedStack',
      (tester) async {
        final overview = StudentOverviewModel.fromJson(
          _sampleOverviewJson(),
        ).toEntity();
        when(() => mockStudentRepo.getOverview(
              subjectId: any(named: 'subjectId'),
            )).thenAnswer((_) async => Right(overview));
        when(() => mockStudentRepo.getPlannerSummary()).thenAnswer(
          (_) async => const Right(
            PlannerOverviewEntity(tasks: [], todayDueCount: 0),
          ),
        );

        registerDashboardDependencies();
        MainShellBinding().dependencies();

        await tester.pumpWidget(
          GetMaterialApp(
            theme: PorhiTheme.light,
            getPages: <GetPage<dynamic>>[
              GetPage<dynamic>(
                name: AppRoutes.account,
                page: () => const Scaffold(body: Text('Account Screen')),
              ),
            ],
            home: MainShellView(
              tabBuilders: MainShellTabBuilders(
                subjectsBuilder: (_) =>
                    const Center(child: Text('Subjects Slot Active')),
                plannerBuilder: (_) =>
                    const Center(child: Text('Planner Slot Active')),
                progressBuilder: (_) =>
                    const Center(child: Text('Progress Slot Active')),
              ),
            ),
          ),
        );
        await tester.pumpAndSettle();

        // Verify zero IndexedStack widgets exist in the tree.
        expect(find.byType(IndexedStack), findsNothing);
        expect(find.byType(DashboardView), findsOneWidget);
        expect(find.text('Subjects Slot Active'), findsNothing);
        expect(find.text('Planner Slot Active'), findsNothing);
        expect(find.text('Progress Slot Active'), findsNothing);

        // Switch to Subjects tab (index 1).
        await tester.tap(find.text(AppStrings.t('nav.subjects', AppLanguage.bn)));
        await tester.pumpAndSettle();
        expect(find.byType(IndexedStack), findsNothing);
        expect(find.byType(DashboardView), findsNothing);
        expect(find.text('Subjects Slot Active'), findsOneWidget);

        // Switch to Planner tab (index 2).
        await tester.tap(find.text(AppStrings.t('nav.planner', AppLanguage.bn)));
        await tester.pumpAndSettle();
        expect(find.text('Subjects Slot Active'), findsNothing);
        expect(find.text('Planner Slot Active'), findsOneWidget);

        // Switch to Progress tab (index 3).
        await tester.tap(find.text(AppStrings.t('nav.progress', AppLanguage.bn)));
        await tester.pumpAndSettle();
        expect(find.text('Planner Slot Active'), findsNothing);
        expect(find.text('Progress Slot Active'), findsOneWidget);
      },
    );

    testWidgets(
      'DashboardView renders streak, 7-day activity strip, continue card, due mistakes, and triggers sync badge',
      (tester) async {
        final overview = StudentOverviewModel.fromJson(
          _sampleOverviewJson(streakDays: 6, topicTitle: 'ভেক্টর বিভাজন'),
        ).toEntity();
        when(() => mockStudentRepo.pendingSyncCount).thenReturn(3);
        when(() => mockStudentRepo.watchPendingSyncCount())
            .thenAnswer((_) => Stream<int>.value(3));
        when(() => mockStudentRepo.getOverview(
              subjectId: any(named: 'subjectId'),
            )).thenAnswer((_) async => Right(overview));
        when(() => mockStudentRepo.getPlannerSummary()).thenAnswer(
          (_) async => const Right(
            PlannerOverviewEntity(
              tasks: <PlannerTaskSummaryEntity>[
                PlannerTaskSummaryEntity(
                  id: 'task_1',
                  titleBangla: 'পদার্থবিজ্ঞান ২য় অধ্যায় রিভিশন',
                  scheduledDate: '2026-11-12',
                  completed: false,
                ),
              ],
              todayDueCount: 1,
            ),
          ),
        );
        when(() => mockStudentRepo.syncOffline())
            .thenAnswer((_) async => const Right<ErrorResponse, int>(3));

        registerDashboardDependencies();
        MainShellBinding().dependencies();

        await tester.pumpWidget(
          GetMaterialApp(
            theme: PorhiTheme.light,
            home: const MainShellView(),
          ),
        );
        await tester.pumpAndSettle();

        expect(find.textContaining('৬'), findsWidgets);
        expect(find.text('ভেক্টর বিভাজন'), findsOneWidget);
        expect(find.byKey(const Key('dashboard_7day_strip')), findsOneWidget);
        expect(find.byKey(const Key('sync_badge_button')), findsOneWidget);

        await tester.scrollUntilVisible(
          find.text('বেগের একক কোনটি?'),
          200,
          scrollable: find.byType(Scrollable).first,
        );
        expect(find.text('বেগের একক কোনটি?'), findsOneWidget);

        await tester.scrollUntilVisible(
          find.text('পদার্থবিজ্ঞান ২য় অধ্যায় রিভিশন'),
          200,
          scrollable: find.byType(Scrollable).first,
        );
        expect(
          find.text('পদার্থবিজ্ঞান ২য় অধ্যায় রিভিশন'),
          findsOneWidget,
        );

        await tester.tap(find.byKey(const Key('sync_badge_button')));
        await tester.pumpAndSettle();
        verify(() => mockStudentRepo.syncOffline()).called(1);
      },
    );

    testWidgets(
      'QuickSearchSheet filters topics from curriculum catalog',
      (tester) async {
        final overview = StudentOverviewModel.fromJson(
          _sampleOverviewJson(),
        ).toEntity();
        when(() => mockStudentRepo.getOverview(
              subjectId: any(named: 'subjectId'),
            )).thenAnswer((_) async => Right(overview));
        when(() => mockStudentRepo.getPlannerSummary()).thenAnswer(
          (_) async => const Right(
            PlannerOverviewEntity(tasks: [], todayDueCount: 0),
          ),
        );
        when(() => mockStudentRepo.getQuickSearchCatalog(
              subjectId: any(named: 'subjectId'),
            )).thenAnswer(
          (_) async => const Right<ErrorResponse, List<QuickSearchTopicEntity>>(
            <QuickSearchTopicEntity>[
              QuickSearchTopicEntity(
                topicId: 'top_motion',
                topicTitle: 'গতির সমীকরণ',
                chapterId: 'ch_2',
                chapterTitle: 'গতি',
                subjectId: 'sub_ssc_physics',
                hasInteractiveLab: true,
                isCompleted: true,
              ),
              QuickSearchTopicEntity(
                topicId: 'top_force',
                topicTitle: 'নিউটনের প্রথম সূত্র',
                chapterId: 'ch_3',
                chapterTitle: 'বল',
                subjectId: 'sub_ssc_physics',
                hasInteractiveLab: false,
                isCompleted: false,
              ),
            ],
          ),
        );

        registerDashboardDependencies();
        MainShellBinding().dependencies();

        await tester.pumpWidget(
          GetMaterialApp(
            theme: PorhiTheme.light,
            home: const MainShellView(),
          ),
        );
        await tester.pumpAndSettle();

        await tester.tap(find.byKey(const Key('quick_search_button')));
        await tester.pumpAndSettle();

        expect(find.byType(QuickSearchSheet), findsOneWidget);
        expect(
          find.descendant(
            of: find.byType(QuickSearchSheet),
            matching: find.text('গতির সমীকরণ'),
          ),
          findsOneWidget,
        );
        expect(
          find.descendant(
            of: find.byType(QuickSearchSheet),
            matching: find.text('নিউটনের প্রথম সূত্র'),
          ),
          findsOneWidget,
        );

        await tester.enterText(
          find.byKey(const Key('quick_search_input')),
          'নিউটন',
        );
        await tester.pumpAndSettle();

        expect(
          find.descendant(
            of: find.byType(QuickSearchSheet),
            matching: find.text('নিউটনের প্রথম সূত্র'),
          ),
          findsOneWidget,
        );
        expect(
          find.descendant(
            of: find.byType(QuickSearchSheet),
            matching: find.text('গতির সমীকরণ'),
          ),
          findsNothing,
        );
      },
    );

    testWidgets(
      'DashboardView navigates to /account and shows offline badge when serving cached data',
      (tester) async {
        final cachedOverview = StudentOverviewModel.fromJson(
          _sampleOverviewJson(streakDays: 3, topicTitle: 'কাজ ও শক্তি'),
        ).toEntity(isFromCache: true);
        when(() => mockStudentRepo.getCachedOverview(
              subjectId: any(named: 'subjectId'),
            )).thenAnswer((_) async => cachedOverview);
        when(() => mockStudentRepo.getOverview(
              subjectId: any(named: 'subjectId'),
            )).thenAnswer((_) async => Right(cachedOverview));
        when(() => mockStudentRepo.getPlannerSummary()).thenAnswer(
          (_) async => const Right(
            PlannerOverviewEntity(tasks: [], todayDueCount: 0),
          ),
        );

        registerDashboardDependencies();
        MainShellBinding().dependencies();

        await tester.pumpWidget(
          GetMaterialApp(
            theme: PorhiTheme.light,
            getPages: <GetPage<dynamic>>[
              GetPage<dynamic>(
                name: AppRoutes.account,
                page: () => const Scaffold(body: Text('Account Route Target')),
              ),
            ],
            home: const MainShellView(),
          ),
        );
        await tester.pumpAndSettle();

        expect(
          find.text(AppStrings.t('common.offline', AppLanguage.bn)),
          findsOneWidget,
        );
        expect(find.text('কাজ ও শক্তি'), findsOneWidget);

        await tester.tap(find.byKey(const Key('dashboard_account_button')));
        await tester.pumpAndSettle();
        expect(find.text('Account Route Target'), findsOneWidget);
      },
    );
  });

  group('Routing & InitialBinding wiring', () {
    test('InitialBinding registers StudentRepository and dashboard use cases and AppPages wires /home & /search', () {
      InitialBinding(
        database: database,
        preferencesStorage: prefsStorage,
        secureStorage: SecureStorageService(),
        firebaseGateway: _MockFirebaseAuthGateway(),
        initNetwork: false,
      ).dependencies();

      expect(Get.isRegistered<StudentRepository>(), isTrue);
      expect(Get.isRegistered<GetOverviewUseCase>(), isTrue);
      expect(Get.isRegistered<GetPlannerSummaryUseCase>(), isTrue);
      expect(Get.isRegistered<GetQuickSearchCatalogUseCase>(), isTrue);
      expect(Get.isRegistered<FlushOfflineSyncUseCase>(), isTrue);

      final homeRoute =
          AppPages.routes.firstWhere((r) => r.name == AppRoutes.home);
      final searchRoute =
          AppPages.routes.firstWhere((r) => r.name == AppRoutes.search);
      expect(homeRoute.binding, isA<MainShellBinding>());
      expect(searchRoute.name, '/search');
    });
  });

  group('Model defensive parsing', () {
    test(
      'QuickSearchCatalogModel.fromJson parses BaseWrapperModel json array and cached items',
      () {
        final wrapped = QuickSearchCatalogModel.fromJson(<String, dynamic>{
          'json': <Map<String, dynamic>>[
            <String, dynamic>{
              'id': 'ch_1',
              'subjectId': 'sub_ssc_physics',
              'titleBangla': 'ভৌত রাশি ও পরিমাপ',
              'topics': <Map<String, dynamic>>[
                <String, dynamic>{
                  'id': 'top_1',
                  'titleBangla': 'পরিমাপের ত্রুটি',
                  'hasInteractiveLab': true,
                  'lessonCount': '2',
                  'questionCount': 5,
                },
              ],
            },
          ],
        });
        final wrappedEntities = wrapped.toEntities();
        expect(wrappedEntities.length, 1);
        expect(wrappedEntities.single.topicId, 'top_1');
        expect(wrappedEntities.single.chapterTitle, 'ভৌত রাশি ও পরিমাপ');
        expect(wrappedEntities.single.hasInteractiveLab, isTrue);
        expect(wrappedEntities.single.lessonCount, 2);
        expect(wrappedEntities.single.questionCount, 5);

        final cached = QuickSearchCatalogModel.fromJson(wrapped.toJson());
        expect(cached.toEntities(), wrappedEntities);
      },
    );

    test('PlannerOverviewModel.fromJson handles nullable/mixed backend fields', () {
      final model = PlannerOverviewModel.fromJson(<String, dynamic>{
        'todayDueCount': '2',
        'tasks': <Map<String, dynamic>>[
          <String, dynamic>{
            'id': 't1',
            'titleBangla': 'তাপগতিবিদ্যা পড়া',
            'scheduledDate': '2026-11-12',
            'completed': 0,
          },
        ],
      });
      final entity = model.toEntity();
      expect(entity.todayDueCount, 2);
      expect(entity.tasks.single.titleBangla, 'তাপগতিবিদ্যা পড়া');
      expect(entity.tasks.single.completed, isFalse);
    });
  });

  group('Review regression fixes', () {
    late _MockStudentRepository mockStudentRepo;
    late _MockAuthRepository mockAuthRepo;

    setUp(() {
      mockStudentRepo = _MockStudentRepository();
      mockAuthRepo = _MockAuthRepository();

      when(() => mockAuthRepo.getLanguage()).thenReturn('bn');
      when(() => mockAuthRepo.getCachedUser()).thenReturn(
        const AuthUserEntity(
          id: 'stu_1',
          fullName: 'রাফি আহমেদ',
          selectedClass: StudentTrack.ssc,
        ),
      );
      when(() => mockStudentRepo.getActiveSubjectId(any()))
          .thenReturn('sub_ssc_physics');
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
    });

    void registerDependencies() {
      Get.put<StudentRepository>(mockStudentRepo);
      Get.put<AuthRepository>(mockAuthRepo);
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
    }

    testWidgets(
      'Logout from /account via offAllNamed(/login) does not resurrect DashboardController or MainShellController',
      (tester) async {
        final overview = StudentOverviewModel.fromJson(
          _sampleOverviewJson(),
        ).toEntity();
        when(() => mockStudentRepo.getOverview(
              subjectId: any(named: 'subjectId'),
            )).thenAnswer((_) async => Right(overview));
        when(() => mockStudentRepo.getPlannerSummary()).thenAnswer(
          (_) async => const Right(
            PlannerOverviewEntity(tasks: [], todayDueCount: 0),
          ),
        );

        registerDependencies();

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
                    key: const Key('mock_logout_btn'),
                    onPressed: () => Get.offAllNamed(AppRoutes.login),
                    child: const Text('Logout'),
                  ),
                ),
              ),
              GetPage<dynamic>(
                name: AppRoutes.login,
                page: () => const Scaffold(body: Text('Login Route')),
              ),
            ],
          ),
        );
        await tester.pumpAndSettle();

        verify(() => mockStudentRepo.getOverview(subjectId: 'sub_ssc_physics'))
            .called(1);

        await tester.tap(find.byKey(const Key('dashboard_account_button')));
        await tester.pumpAndSettle();
        expect(find.byKey(const Key('mock_logout_btn')), findsOneWidget);

        await tester.tap(find.byKey(const Key('mock_logout_btn')));
        await tester.pumpAndSettle();

        expect(find.text('Login Route'), findsOneWidget);
        expect(Get.isRegistered<DashboardController>(), isFalse);
        expect(Get.isRegistered<MainShellController>(), isFalse);
        verifyNever(() => mockStudentRepo.getOverview(
              subjectId: any(named: 'subjectId'),
            ));
      },
    );

    testWidgets(
      'Returning from /account after track and language change updates DashboardController and clears stale subject cache',
      (tester) async {
        final sscOverview = StudentOverviewModel.fromJson(
          _sampleOverviewJson(topicTitle: 'এসএসসি পদার্থ টপিক'),
        ).toEntity();
        final hscOverview = StudentOverviewModel.fromJson(<String, dynamic>{
          ..._sampleOverviewJson(topicTitle: 'এইচএসসি ভেক্টর টপিক'),
          'subjectId': 'sub_hsc_physics_1',
        }).toEntity();

        when(() => mockStudentRepo.getOverview(subjectId: 'sub_ssc_physics'))
            .thenAnswer((_) async => Right(sscOverview));
        when(() => mockStudentRepo.getOverview(subjectId: 'sub_hsc_physics_1'))
            .thenAnswer((_) async => Right(hscOverview));
        when(() => mockStudentRepo.getPlannerSummary()).thenAnswer(
          (_) async => const Right(
            PlannerOverviewEntity(tasks: [], todayDueCount: 0),
          ),
        );

        registerDependencies();

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
                    key: const Key('mock_save_track_btn'),
                    onPressed: () {
                      when(() => mockAuthRepo.getLanguage()).thenReturn('en');
                      when(() => mockAuthRepo.getCachedUser()).thenReturn(
                        const AuthUserEntity(
                          id: 'stu_1',
                          fullName: 'রাফি আহমেদ',
                          selectedClass: StudentTrack.hsc,
                        ),
                      );
                      when(() => mockStudentRepo.getActiveSubjectId(
                            StudentTrack.hsc,
                          )).thenReturn('sub_hsc_physics_1');
                      Get.back<void>();
                    },
                    child: const Text('Save & Back'),
                  ),
                ),
              ),
            ],
          ),
        );
        await tester.pumpAndSettle();

        expect(find.text('এসএসসি পদার্থ টপিক'), findsOneWidget);

        // Switch to Subjects placeholder slot and navigate to /account from there
        // to also verify cross-tab refresh on return.
        await tester.tap(find.text(AppStrings.t('nav.subjects', AppLanguage.bn)));
        await tester.pumpAndSettle();
        await tester.tap(find.byKey(const Key('slot_account_button')));
        await tester.pumpAndSettle();

        await tester.tap(find.byKey(const Key('mock_save_track_btn')));
        await tester.pumpAndSettle();

        // Bottom nav label should now be English ('Home').
        await tester.tap(
          find.descendant(
            of: find.byType(NavigationBar),
            matching: find.text(AppStrings.t('nav.home', AppLanguage.en)),
          ),
        );
        await tester.pumpAndSettle();

        expect(find.text('এইচএসসি ভেক্টর টপিক'), findsOneWidget);
        expect(find.text('এসএসসি পদার্থ টপিক'), findsNothing);
        verify(() => mockStudentRepo.getOverview(subjectId: 'sub_hsc_physics_1'))
            .called(1);
      },
    );

    testWidgets(
      'Null ErrorResponse.message shows Retry UI and failed offline sync renders error banner without redundant reload',
      (tester) async {
        when(() => mockStudentRepo.getOverview(
              subjectId: any(named: 'subjectId'),
            )).thenAnswer(
          (_) async => Left<ErrorResponse, StudentOverviewEntity>(
            ErrorResponse(
              message: null,
              data: ApiResponseErrorType.noInternet,
            ),
          ),
        );
        when(() => mockStudentRepo.getPlannerSummary()).thenAnswer(
          (_) async => const Right(
            PlannerOverviewEntity(tasks: [], todayDueCount: 0),
          ),
        );

        registerDependencies();
        MainShellBinding().dependencies();

        await tester.pumpWidget(
          GetMaterialApp(
            theme: PorhiTheme.light,
            home: const MainShellView(),
          ),
        );
        await tester.pumpAndSettle();

        // Retry button appears even when ErrorResponse.message was null.
        expect(
          find.text(AppStrings.t('action.retry', AppLanguage.bn)),
          findsOneWidget,
        );

        // Now resolve overview and test syncNow() failure banner.
        final overview = StudentOverviewModel.fromJson(
          _sampleOverviewJson(),
        ).toEntity();
        when(() => mockStudentRepo.getOverview(
              subjectId: any(named: 'subjectId'),
            )).thenAnswer((_) async => Right(overview));
        when(() => mockStudentRepo.syncOffline()).thenAnswer(
          (_) async => Left<ErrorResponse, int>(
            ErrorResponse(
              message: null,
              data: ApiResponseErrorType.noInternet,
            ),
          ),
        );

        await tester.tap(find.text(AppStrings.t('action.retry', AppLanguage.bn)));
        await tester.pumpAndSettle();
        clearInteractions(mockStudentRepo);

        await tester.tap(find.byKey(const Key('sync_badge_button')));
        await tester.pumpAndSettle();

        expect(find.byKey(const Key('sync_status_banner')), findsOneWidget);
        expect(find.byIcon(Icons.error_outline_rounded), findsOneWidget);
        expect(
          find.byIcon(Icons.check_circle_outline_rounded),
          findsNothing,
        );
        // Should NOT call getOverview redundantly after noInternet sync error.
        verifyNever(() => mockStudentRepo.getOverview(
              subjectId: any(named: 'subjectId'),
            ));
      },
    );

    testWidgets(
      'QuickSearchPage (/search) returns selected topic result via Get.back',
      (tester) async {
        final overview = StudentOverviewModel.fromJson(
          _sampleOverviewJson(),
        ).toEntity();
        when(() => mockStudentRepo.getOverview(
              subjectId: any(named: 'subjectId'),
            )).thenAnswer((_) async => Right(overview));
        when(() => mockStudentRepo.getPlannerSummary()).thenAnswer(
          (_) async => const Right(
            PlannerOverviewEntity(tasks: [], todayDueCount: 0),
          ),
        );
        when(() => mockStudentRepo.getQuickSearchCatalog(
              subjectId: any(named: 'subjectId'),
            )).thenAnswer(
          (_) async => const Right<ErrorResponse, List<QuickSearchTopicEntity>>(
            <QuickSearchTopicEntity>[
              QuickSearchTopicEntity(
                topicId: 'top_wave',
                topicTitle: 'তরঙ্গ ও শব্দ',
                chapterId: 'ch_7',
                chapterTitle: 'তরঙ্গ',
                subjectId: 'sub_ssc_physics',
                hasInteractiveLab: true,
              ),
            ],
          ),
        );

        registerDependencies();
        QuickSearchTopicEntity? returnedResult;

        await tester.pumpWidget(
          GetMaterialApp(
            theme: PorhiTheme.light,
            getPages: <GetPage<dynamic>>[
              GetPage<QuickSearchTopicEntity?>(
                name: AppRoutes.search,
                page: () => const QuickSearchPage(),
                binding: QuickSearchBinding(),
              ),
            ],
            home: Builder(
              builder: (context) => Scaffold(
                body: ElevatedButton(
                  key: const Key('open_search_route_btn'),
                  onPressed: () async {
                    final result = await Get.toNamed(AppRoutes.search);
                    returnedResult =
                        result is QuickSearchTopicEntity ? result : null;
                  },
                  child: const Text('Open Search'),
                ),
              ),
            ),
          ),
        );
        await tester.pumpAndSettle();

        await tester.tap(find.byKey(const Key('open_search_route_btn')));
        await tester.pumpAndSettle();

        expect(find.text('তরঙ্গ ও শব্দ'), findsOneWidget);
        await tester.tap(find.text('তরঙ্গ ও শব্দ'));
        await tester.pumpAndSettle();

        expect(returnedResult?.topicId, 'top_wave');
      },
    );
  });
}
