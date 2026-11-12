import 'dart:convert';

import 'package:common/common.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:get/get.dart';
import 'package:mocktail/mocktail.dart';
import 'package:network/network.dart';
import 'package:porhi/app/env.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/core/notifications/local_reminder_scheduler.dart';
import 'package:porhi/core/services/share_gateway.dart';
import 'package:porhi/core/storage/preferences_storage_service.dart';
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
import 'package:porhi/features/dashboard/domain/entities/student_overview_entity.dart';
import 'package:porhi/features/dashboard/domain/repositories/student_repository.dart';
import 'package:porhi/features/dashboard/domain/usecases/student_usecases.dart';
import 'package:porhi/features/exam/data/models/exam_models.dart';
import 'package:porhi/features/exam/domain/entities/exam_entities.dart';
import 'package:porhi/features/exam/domain/repositories/exam_repository.dart';
import 'package:porhi/features/exam/domain/usecases/exam_usecases.dart';
import 'package:porhi/features/planner/data/models/planner_models.dart';
import 'package:porhi/features/planner/domain/entities/planner_entities.dart';
import 'package:porhi/features/planner/domain/repositories/planner_repository.dart';
import 'package:porhi/features/planner/domain/usecases/planner_usecases.dart';
import 'package:porhi/features/planner/presentation/planner/controller/planner_controller.dart';
import 'package:porhi/features/planner/presentation/planner/view/planner_view.dart';
import 'package:porhi/features/progress/presentation/progress/controller/progress_controller.dart';
import 'package:porhi/features/progress/presentation/progress/view/progress_view.dart';
import 'package:porhi/features/shell/presentation/main_shell/binding/main_shell_binding.dart';
import 'package:porhi/features/shell/presentation/main_shell/controller/main_shell_controller.dart';
import 'package:porhi/features/shell/presentation/main_shell/view/main_shell_view.dart';
import 'package:porhi/routes/app_routes.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:timezone/timezone.dart' as tz;

class _MockNotificationsGateway extends Mock
    implements LocalNotificationsGateway {}

class _MockPlannerRepository extends Mock implements PlannerRepository {}

class _MockStudentRepository extends Mock implements StudentRepository {}

class _MockExamRepository extends Mock implements ExamRepository {}

class _MockContentReportRepository extends Mock
    implements ContentReportRepository {}

class _MockAuthRepository extends Mock implements AuthRepository {}

class _MockCurriculumRepository extends Mock implements CurriculumRepository {}

class _MockShareGateway extends Mock implements ShareGateway {}

void main() {
  setUpAll(() {
    registerFallbackValue(tz.UTC);
    registerFallbackValue(tz.TZDateTime.utc(2026));
    registerFallbackValue(StudentTrack.ssc);
    registerFallbackValue(ExamTestType.chapterTest);
  });

  tearDown(() async {
    await Get.deleteAll(force: true);
  });

  group('LocalReminderScheduler', () {
    late _MockNotificationsGateway gateway;
    late List<(String, Object?)> navigatedCalls;
    late int focusPlannerCalls;
    late LocalReminderScheduler scheduler;

    setUp(() {
      gateway = _MockNotificationsGateway();
      navigatedCalls = <(String, Object?)>[];
      focusPlannerCalls = 0;

      when(
        () => gateway.initialize(
          onNotificationTap: any(named: 'onNotificationTap'),
          channelId: any(named: 'channelId'),
          channelName: any(named: 'channelName'),
          channelDescription: any(named: 'channelDescription'),
        ),
      ).thenAnswer((_) async {});
      when(() => gateway.requestPermissions()).thenAnswer((_) async => true);
      when(
        () => gateway.zonedSchedule(
          id: any(named: 'id'),
          title: any(named: 'title'),
          body: any(named: 'body'),
          scheduledDate: any(named: 'scheduledDate'),
          payload: any(named: 'payload'),
          channelId: any(named: 'channelId'),
          channelName: any(named: 'channelName'),
          channelDescription: any(named: 'channelDescription'),
        ),
      ).thenAnswer((_) async {});
      when(() => gateway.cancel(any())).thenAnswer((_) async {});
      when(() => gateway.cancelAll()).thenAnswer((_) async {});

      scheduler = LocalReminderScheduler(
        gateway: gateway,
        onNavigate: (route, {arguments}) async {
          navigatedCalls.add((route, arguments));
        },
        onFocusPlanner: () {
          focusPlannerCalls++;
        },
      );
    });

    test('normalizeHhMm normalizes Bangla digits and rejects invalid times', () {
      expect(LocalReminderScheduler.normalizeHhMm('১৮:৩০'), '18:30');
      expect(LocalReminderScheduler.normalizeHhMm(' ০৯:০৫ '), '09:05');
      expect(LocalReminderScheduler.normalizeHhMm('00:00'), '00:00');
      expect(LocalReminderScheduler.normalizeHhMm('23:59'), '23:59');

      expect(LocalReminderScheduler.normalizeHhMm('24:00'), isNull);
      expect(LocalReminderScheduler.normalizeHhMm('18:60'), isNull);
      expect(LocalReminderScheduler.normalizeHhMm('9:30'), isNull);
      expect(LocalReminderScheduler.normalizeHhMm('   '), isNull);
      expect(LocalReminderScheduler.normalizeHhMm('invalid'), isNull);
    });

    test(
      'parseScheduleDateTime handles Bangla digits, malformed inputs, and past check',
      () async {
        await scheduler.initialize();

        final valid = scheduler.parseScheduleDateTime(
          scheduledDate: '২০২৬-১১-১৫',
          reminderTime: '১৮:৩০',
        );
        expect(valid, isNotNull);
        expect(valid!.year, 2026);
        expect(valid.month, 11);
        expect(valid.day, 15);
        expect(valid.hour, 18);
        expect(valid.minute, 30);

        expect(
          scheduler.parseScheduleDateTime(
            scheduledDate: '2026-02-30',
            reminderTime: '18:30',
          ),
          isNull,
        );
        expect(
          scheduler.parseScheduleDateTime(
            scheduledDate: '2026-11-15',
            reminderTime: null,
          ),
          isNull,
        );
        expect(
          scheduler.parseScheduleDateTime(
            scheduledDate: '2026-11-15',
            reminderTime: '99:99',
          ),
          isNull,
        );

        final past = scheduler.parseScheduleDateTime(
          scheduledDate: '2026-11-12',
          reminderTime: '09:00',
          now: DateTime(2026, 11, 12, 10, 0),
        );
        expect(past, isNull);
      },
    );

    test('notificationIdForTask returns deterministic positive 32-bit int', () {
      final a1 = LocalReminderScheduler.notificationIdForTask('task_alpha_1');
      final a2 = LocalReminderScheduler.notificationIdForTask('task_alpha_1');
      final b = LocalReminderScheduler.notificationIdForTask('task_beta_2');

      expect(a1, a2);
      expect(a1, greaterThan(0));
      expect(a1, lessThanOrEqualTo(0x7FFFFFFF));
      expect(a1, isNot(b));
    });

    test(
      'syncTaskReminders cancels when disabled, cancels completed/past/invalid, and schedules future tasks',
      () async {
        final now = DateTime(2026, 11, 12, 12, 0);
        final futureTask = const PlannerTaskSummaryEntity(
          id: 'task_future',
          titleBangla: 'নিউটনের গতিসূত্র',
          scheduledDate: '2026-11-13',
          reminderTime: '১৮:৩০',
          targetType: 'LESSON',
          subjectId: 'sub_ssc_physics',
          chapterId: 'chap_1',
          topicId: 'top_newton',
          completed: false,
        );
        final completedTask = const PlannerTaskSummaryEntity(
          id: 'task_done',
          titleBangla: 'সম্পন্ন টাস্ক',
          scheduledDate: '2026-11-14',
          reminderTime: '18:00',
          completed: true,
        );
        final pastTask = const PlannerTaskSummaryEntity(
          id: 'task_past',
          titleBangla: 'পুরনো টাস্ক',
          scheduledDate: '2026-11-10',
          reminderTime: '18:00',
          completed: false,
        );
        final malformedTask = const PlannerTaskSummaryEntity(
          id: 'task_bad_time',
          titleBangla: 'ভুল সময়',
          scheduledDate: '2026-11-15',
          reminderTime: '25:99',
          completed: false,
        );

        await scheduler.syncTaskReminders(
          <PlannerTaskSummaryEntity>[
            futureTask,
            completedTask,
            pastTask,
            malformedTask,
          ],
          enabled: true,
          now: now,
        );

        verify(
          () => gateway.cancel(
            LocalReminderScheduler.notificationIdForTask('task_done'),
          ),
        ).called(1);
        verify(
          () => gateway.cancel(
            LocalReminderScheduler.notificationIdForTask('task_past'),
          ),
        ).called(1);
        verify(
          () => gateway.cancel(
            LocalReminderScheduler.notificationIdForTask('task_bad_time'),
          ),
        ).called(1);

        final captured = verify(
          () => gateway.zonedSchedule(
            id: LocalReminderScheduler.notificationIdForTask('task_future'),
            title: any(named: 'title'),
            body: 'নিউটনের গতিসূত্র',
            scheduledDate: any(named: 'scheduledDate'),
            payload: captureAny(named: 'payload'),
            channelId: 'porhi_study_reminders',
            channelName: 'Study Reminders',
            channelDescription: any(named: 'channelDescription'),
          ),
        ).captured;

        final payloadMap =
            jsonDecode(captured.single as String) as Map<String, dynamic>;
        expect(payloadMap['taskId'], 'task_future');
        expect(payloadMap['targetType'], 'LESSON');
        expect(payloadMap['subjectId'], 'sub_ssc_physics');
        expect(payloadMap['chapterId'], 'chap_1');
        expect(payloadMap['topicId'], 'top_newton');

        await scheduler.syncTaskReminders(
          <PlannerTaskSummaryEntity>[futureTask],
          enabled: false,
          now: now,
        );
        verify(() => gateway.cancelAll()).called(1);
      },
    );

    test('handleNotificationPayload deep-links by targetType and ignores bad JSON', () async {
      await scheduler.handleNotificationPayload(null);
      await scheduler.handleNotificationPayload('');
      await scheduler.handleNotificationPayload('{bad json');
      expect(navigatedCalls, isEmpty);
      expect(focusPlannerCalls, 0);

      await scheduler.handleNotificationPayload(
        jsonEncode(<String, dynamic>{
          'taskId': 't1',
          'targetType': 'LESSON',
          'topicId': 'top_1',
        }),
      );
      await scheduler.handleNotificationPayload(
        jsonEncode(<String, dynamic>{
          'taskId': 't2',
          'targetType': 'PRACTICE',
          'chapterId': 'chap_1',
        }),
      );
      await scheduler.handleNotificationPayload(
        jsonEncode(<String, dynamic>{
          'taskId': 't3',
          'targetType': 'MODEL_TEST',
          'chapterId': 'chap_2',
        }),
      );
      await scheduler.handleNotificationPayload(
        jsonEncode(<String, dynamic>{
          'taskId': 't4',
          'targetType': 'MODEL_TEST',
          'subjectId': 'sub_ssc_physics',
        }),
      );
      await scheduler.handleNotificationPayload(
        jsonEncode(<String, dynamic>{
          'taskId': 't5',
          'targetType': 'REVISION',
          'chapterId': 'chap_3',
        }),
      );
      await scheduler.handleNotificationPayload(
        jsonEncode(<String, dynamic>{
          'taskId': 't6',
          'targetType': 'CUSTOM',
        }),
      );

      expect(navigatedCalls[0], (AppRoutes.lessonForTopic('top_1'), null));
      expect(navigatedCalls[1], (AppRoutes.practiceForChapter('chap_1'), null));
      expect(navigatedCalls[2], (AppRoutes.examForChapter('chap_2'), null));
      expect(navigatedCalls[3].$1, AppRoutes.examSetup);
      expect(
        navigatedCalls[3].$2,
        <String, dynamic>{
          'subjectId': 'sub_ssc_physics',
          'testType': 'SUBJECT_TEST',
        },
      );
      expect(navigatedCalls[4], (AppRoutes.practiceForChapter('chap_3'), null));
      expect(focusPlannerCalls, 1);
    });
  });

  group('Planner domain, models & PlannerController', () {
    late _MockPlannerRepository mockPlannerRepo;
    late _MockStudentRepository mockStudentRepo;
    late _MockAuthRepository mockAuthRepo;
    late _MockNotificationsGateway mockGateway;
    late LocalReminderScheduler reminderScheduler;
    late PreferencesStorageService prefs;

    setUp(() async {
      SharedPreferences.setMockInitialValues(<String, Object>{});
      prefs = PreferencesStorageService();
      await prefs.init();

      mockPlannerRepo = _MockPlannerRepository();
      mockStudentRepo = _MockStudentRepository();
      mockAuthRepo = _MockAuthRepository();
      mockGateway = _MockNotificationsGateway();

      when(
        () => mockGateway.initialize(
          onNotificationTap: any(named: 'onNotificationTap'),
          channelId: any(named: 'channelId'),
          channelName: any(named: 'channelName'),
          channelDescription: any(named: 'channelDescription'),
        ),
      ).thenAnswer((_) async {});
      when(() => mockGateway.requestPermissions()).thenAnswer((_) async => true);
      when(
        () => mockGateway.zonedSchedule(
          id: any(named: 'id'),
          title: any(named: 'title'),
          body: any(named: 'body'),
          scheduledDate: any(named: 'scheduledDate'),
          payload: any(named: 'payload'),
          channelId: any(named: 'channelId'),
          channelName: any(named: 'channelName'),
          channelDescription: any(named: 'channelDescription'),
        ),
      ).thenAnswer((_) async {});
      when(() => mockGateway.cancel(any())).thenAnswer((_) async {});
      when(() => mockGateway.cancelAll()).thenAnswer((_) async {});

      reminderScheduler = LocalReminderScheduler(gateway: mockGateway);

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
      when(() => mockPlannerRepo.getCachedTasks())
          .thenAnswer((_) async => null);
    });

    PlannerController buildPlannerController({
      VoidCallback? onPlannerChanged,
    }) {
      return PlannerController(
        getPlannerTasksUseCase: GetPlannerTasksUseCase(mockPlannerRepo),
        getCachedPlannerTasksUseCase:
            GetCachedPlannerTasksUseCase(mockPlannerRepo),
        createStudyTaskUseCase: CreateStudyTaskUseCase(mockPlannerRepo),
        autoGenerateStudyPlanUseCase:
            AutoGenerateStudyPlanUseCase(mockPlannerRepo),
        toggleStudyTaskCompletionUseCase:
            ToggleStudyTaskCompletionUseCase(mockPlannerRepo),
        deleteStudyTaskUseCase: DeleteStudyTaskUseCase(mockPlannerRepo),
        getLanguageUseCase: GetLanguageUseCase(mockAuthRepo),
        getCachedUserUseCase: GetCachedUserUseCase(mockAuthRepo),
        getActiveSubjectIdUseCase: GetActiveSubjectIdUseCase(mockStudentRepo),
        reminderScheduler: reminderScheduler,
        preferencesStorage: prefs,
        onPlannerChanged: onPlannerChanged,
      );
    }

    test(
      'CreateStudyTaskUseCase validates title/date/time and normalizes Bangla digits to ASCII',
      () async {
        final useCase = CreateStudyTaskUseCase(mockPlannerRepo);

        final blankTitle = await useCase(
          titleBangla: '   ',
          scheduledDate: '2026-11-15',
        );
        expect(blankTitle.isLeft(), isTrue);

        final badDate = await useCase(
          titleBangla: 'পদার্থবিজ্ঞান',
          scheduledDate: '2026-02-31',
        );
        expect(badDate.isLeft(), isTrue);

        final badTime = await useCase(
          titleBangla: 'পদার্থবিজ্ঞান',
          scheduledDate: '2026-11-15',
          reminderTime: '২৫:১০',
        );
        expect(badTime.isLeft(), isTrue);

        const created = PlannerTaskSummaryEntity(
          id: 'task_new',
          titleBangla: 'পদার্থবিজ্ঞান অধ্যায় ২',
          scheduledDate: '2026-11-20',
          reminderTime: '18:45',
          targetType: 'CUSTOM',
        );
        when(
          () => mockPlannerRepo.createTask(
            titleBangla: 'পদার্থবিজ্ঞান অধ্যায় ২',
            scheduledDate: '2026-11-20',
            reminderTime: '18:45',
            targetType: 'CUSTOM',
            subjectId: 'sub_ssc_physics',
            chapterId: any(named: 'chapterId'),
            topicId: any(named: 'topicId'),
          ),
        ).thenAnswer((_) async => const Right(created));

        final ok = await useCase(
          titleBangla: ' পদার্থবিজ্ঞান অধ্যায় ২ ',
          scheduledDate: '২০২৬-১১-২০',
          reminderTime: '১৮:৪৫',
          targetType: 'CUSTOM',
          subjectId: 'sub_ssc_physics',
        );
        expect(ok.isRight(), isTrue);
        verify(
          () => mockPlannerRepo.createTask(
            titleBangla: 'পদার্থবিজ্ঞান অধ্যায় ২',
            scheduledDate: '2026-11-20',
            reminderTime: '18:45',
            targetType: 'CUSTOM',
            subjectId: 'sub_ssc_physics',
            chapterId: null,
            topicId: null,
          ),
        ).called(1);
      },
    );

    test('PlannerModels parse auto-generate and delete JSON payloads', () {
      final autoModel = AutoGeneratePlanResponseModel.fromJson(<String, dynamic>{
        'createdCount': 2,
        'tasks': <Map<String, dynamic>>[
          <String, dynamic>{
            'id': 't1',
            'titleBangla': 'গতি — ভুল সংশোধন',
            'scheduledDate': '2026-11-12',
            'reminderTime': '18:00',
            'targetType': 'REVISION',
            'subjectId': 'sub_ssc_physics',
            'chapterId': 'chap_2',
            'topicId': 'top_1',
            'completed': false,
          },
        ],
      });
      expect(autoModel.createdCount, 2);
      expect(autoModel.tasks.length, 1);
      expect(autoModel.tasks.first.targetType, 'REVISION');

      final delModel = DeleteStudyTaskResponseModel.fromJson(<String, dynamic>{
        'deleted': true,
        'id': 't1',
      });
      expect(delModel.deleted, isTrue);
      expect(delModel.id, 't1');
    });

    test(
      'PlannerController handles auto-generate, create, toggle cancel/reschedule, delete, reminder switch, and non-blank errors',
      () async {
        final futureDate = DateTime.now()
            .add(const Duration(days: 3))
            .toIso8601String()
            .substring(0, 10);

        final initialTask = PlannerTaskSummaryEntity(
          id: 'task_1',
          titleBangla: 'ভেক্টর রিভিশন',
          scheduledDate: futureDate,
          reminderTime: '20:00',
          targetType: 'LESSON',
          subjectId: 'sub_ssc_physics',
          topicId: 'top_vec',
          completed: false,
        );

        when(() => mockPlannerRepo.getTasks()).thenAnswer(
          (_) async => Right(
            PlannerOverviewEntity(
              tasks: <PlannerTaskSummaryEntity>[initialTask],
              todayDueCount: 1,
            ),
          ),
        );

        var plannerChangedCount = 0;
        final controller = buildPlannerController(
          onPlannerChanged: () => plannerChangedCount++,
        );
        Get.put<PlannerController>(controller);
        await Future<void>.delayed(Duration.zero);

        expect(controller.tasks.length, 1);
        verify(
          () => mockGateway.zonedSchedule(
            id: LocalReminderScheduler.notificationIdForTask('task_1'),
            title: any(named: 'title'),
            body: 'ভেক্টর রিভিশন',
            scheduledDate: any(named: 'scheduledDate'),
            payload: any(named: 'payload'),
            channelId: any(named: 'channelId'),
            channelName: any(named: 'channelName'),
            channelDescription: any(named: 'channelDescription'),
          ),
        ).called(1);

        // Toggle completion -> cancels notification immediately.
        final completedTask = PlannerTaskSummaryEntity(
          id: 'task_1',
          titleBangla: 'ভেক্টর রিভিশন',
          scheduledDate: futureDate,
          reminderTime: '20:00',
          targetType: 'LESSON',
          subjectId: 'sub_ssc_physics',
          topicId: 'top_vec',
          completed: true,
        );
        when(
          () => mockPlannerRepo.updateTask(id: 'task_1', completed: true),
        ).thenAnswer((_) async => Right(completedTask));

        await controller.toggleTaskCompletion(initialTask);
        expect(controller.tasks.first.completed, isTrue);
        expect(plannerChangedCount, 1);
        verify(
          () => mockGateway.cancel(
            LocalReminderScheduler.notificationIdForTask('task_1'),
          ),
        ).called(greaterThanOrEqualTo(1));

        // Auto-generate 7-day plan.
        final generatedTask = PlannerTaskSummaryEntity(
          id: 'task_gen_1',
          titleBangla: 'বল — লেসন ও অনুশীলন',
          scheduledDate: futureDate,
          reminderTime: '18:00',
          targetType: 'LESSON',
          subjectId: 'sub_ssc_physics',
          chapterId: 'chap_3',
          topicId: 'top_force',
          completed: false,
        );
        when(
          () => mockPlannerRepo.autoGeneratePlan(
            subjectId: 'sub_ssc_physics',
            startDate: any(named: 'startDate'),
          ),
        ).thenAnswer(
          (_) async => Right(
            AutoGeneratePlanResultEntity(
              createdCount: 1,
              tasks: <PlannerTaskSummaryEntity>[generatedTask],
            ),
          ),
        );

        await controller.autoGeneratePlan();
        expect(controller.tasks.any((t) => t.id == 'task_gen_1'), isTrue);
        expect(plannerChangedCount, 2);

        // Delete task -> cancels notification.
        when(() => mockPlannerRepo.deleteTask('task_gen_1'))
            .thenAnswer((_) async => const Right('task_gen_1'));
        await controller.deleteTask('task_gen_1');
        expect(controller.tasks.any((t) => t.id == 'task_gen_1'), isFalse);
        verify(
          () => mockGateway.cancel(
            LocalReminderScheduler.notificationIdForTask('task_gen_1'),
          ),
        ).called(greaterThanOrEqualTo(1));

        // Disable device reminders -> persisted + cancelAll.
        await controller.toggleRemindersEnabled(false);
        expect(controller.remindersEnabled.value, isFalse);
        expect(
          prefs.getBool(PlannerController.remindersEnabledStorageKey),
          isFalse,
        );
        verify(() => mockGateway.cancelAll()).called(1);

        // Blank error message fallback.
        when(() => mockPlannerRepo.getTasks()).thenAnswer(
          (_) async => Left(
            ErrorResponse(
              message: '   ',
              data: ApiResponseErrorType.serverError,
            ),
          ),
        );
        await controller.loadTasks();
        expect(controller.errorMessage.value, isNotNull);
        expect(controller.errorMessage.value!.trim(), isNotEmpty);
      },
    );
  });

  group('Progress analytics, EnvConfig share URLs & ProgressController', () {
    late _MockStudentRepository mockStudentRepo;
    late _MockExamRepository mockExamRepo;
    late _MockContentReportRepository mockReportRepo;
    late _MockAuthRepository mockAuthRepo;
    late _MockShareGateway mockShareGateway;

    setUp(() {
      mockStudentRepo = _MockStudentRepository();
      mockExamRepo = _MockExamRepository();
      mockReportRepo = _MockContentReportRepository();
      mockAuthRepo = _MockAuthRepository();
      mockShareGateway = _MockShareGateway();

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
      when(
        () => mockStudentRepo.getCachedOverview(
          subjectId: any(named: 'subjectId'),
        ),
      ).thenAnswer((_) async => null);
      when(
        () => mockShareGateway.shareText(
          any(),
          subject: any(named: 'subject'),
        ),
      ).thenAnswer((_) async {});
    });

    test('ExamHistoryModel parses GET /exam/history JSON cleanly', () {
      final model = ExamHistoryModel.fromJson(<String, dynamic>{
        'items': <Map<String, dynamic>>[
          <String, dynamic>{
            'sessionId': 'sess_1',
            'testType': 'CHAPTER_TEST',
            'subjectId': 'sub_ssc_physics',
            'subjectNameBangla': 'পদার্থবিজ্ঞান',
            'chapterId': 'chap_2',
            'chapterTitleBangla': 'গতি',
            'totalQuestions': 10,
            'correctCount': 8,
            'wrongCount': 2,
            'skippedCount': 0,
            'score': 7.5,
            'accuracyPercent': 80,
            'completedAt': '2026-11-10T10:00:00.000Z',
          },
        ],
        'summary': <String, dynamic>{
          'totalTests': 1,
          'averageAccuracy': 80,
          'bestScorePercent': 80,
          'subjectTestsCount': 0,
        },
        'trend': <Map<String, dynamic>>[
          <String, dynamic>{
            'sessionId': 'sess_1',
            'label': 'গতি',
            'date': '2026-11-10',
            'accuracyPercent': 80,
            'testType': 'CHAPTER_TEST',
          },
        ],
      });

      final entity = model.toEntity();
      expect(entity.items.length, 1);
      expect(entity.summary.totalTests, 1);
      expect(entity.summary.averageAccuracy, 80);
      expect(entity.trend.first.accuracyPercent, 80);
      expect(entity.trend.first.label, 'গতি');
    });

    test(
      'ProgressController loads analytics, builds EnvConfig guardian URLs (stripping /api), shares, copies, and revokes',
      () async {
        const overview = StudentOverviewEntity(
          subjectId: 'sub_ssc_physics',
          curriculumTotals: CurriculumTotalsEntity(
            totalChapters: 4,
            totalTopics: 10,
          ),
          completedTopicIds: <String>['t1', 't2', 't3'],
          practiceStats: PracticeStatsEntity(
            totalAttempts: 30,
            correctAttempts: 24,
            accuracyPercent: 80,
          ),
          streakDays: 6,
          dueMistakes: <DueMistakeEntity>[
            DueMistakeEntity(
              id: 'm1',
              questionId: 'q1',
              updatedAt: '2026-11-12',
              topicId: 't1',
              topicTitle: 'ত্বরণ',
              chapterId: 'chap_2',
              chapterTitle: 'গতি',
              stem: 'ত্বরণের একক কী?',
              correctOptionText: 'm/s²',
            ),
          ],
          weakTopics: <WeakTopicEntity>[
            WeakTopicEntity(
              topicId: 't1',
              topicTitle: 'ত্বরণ',
              chapterId: 'chap_2',
              chapterTitle: 'গতি',
              accuracy: 45,
              mistakeCount: 3,
            ),
          ],
          bookmarks: <StudentBookmarkEntity>[
            StudentBookmarkEntity(
              id: 't1',
              type: 'topic',
              titleBangla: 'ত্বরণ ও মন্দন',
              subtitleBangla: 'গতি',
              href: '/lesson/t1',
              createdAt: '2026-11-11',
            ),
          ],
        );

        const history = ExamHistoryEntity(
          items: <ExamHistoryItemEntity>[
            ExamHistoryItemEntity(
              sessionId: 's1',
              testType: ExamTestType.chapterTest,
              subjectId: 'sub_ssc_physics',
              chapterId: 'chap_2',
              chapterTitleBangla: 'গতি',
              totalQuestions: 10,
              correctCount: 7,
              wrongCount: 3,
              skippedCount: 0,
              score: 6.25,
              accuracyPercent: 70,
              completedAt: '2026-11-10T10:00:00Z',
            ),
            ExamHistoryItemEntity(
              sessionId: 's2',
              testType: ExamTestType.subjectTest,
              subjectId: 'sub_ssc_physics',
              subjectNameBangla: 'পদার্থবিজ্ঞান',
              totalQuestions: 25,
              correctCount: 22,
              wrongCount: 3,
              skippedCount: 0,
              score: 21.25,
              accuracyPercent: 88,
              completedAt: '2026-11-12T10:00:00Z',
            ),
          ],
          summary: ExamHistorySummaryEntity(
            totalTests: 2,
            averageAccuracy: 79,
            bestScorePercent: 88,
            subjectTestsCount: 1,
          ),
          trend: <ExamHistoryTrendPointEntity>[
            ExamHistoryTrendPointEntity(
              sessionId: 's1',
              label: 'গতি',
              date: '2026-11-10',
              accuracyPercent: 70,
              testType: 'CHAPTER_TEST',
            ),
            ExamHistoryTrendPointEntity(
              sessionId: 's2',
              label: 'পদার্থবিজ্ঞান',
              date: '2026-11-12',
              accuracyPercent: 88,
              testType: 'SUBJECT_TEST',
            ),
          ],
        );

        const shareLink = GuardianShareLinkEntity(
          id: 'link_1',
          shareCode: 'GUARD123',
          audience: 'PARENT',
          recipientLabel: 'মা',
          isActive: true,
          sharePath: '/guardian/GUARD123',
          createdAt: '2026-11-12T08:00:00Z',
        );

        const report = ContentReportEntity(
          id: 'rep_1',
          contentType: ReportContentType.question,
          contentId: 'q_99',
          category: ReportCategory.wrongAnswer,
          description: 'উত্তর অপশন খ হবে',
          status: 'RESOLVED',
          resolutionNote: 'সংশোধন করা হয়েছে',
          createdAt: '2026-11-11T08:00:00Z',
        );

        when(
          () => mockStudentRepo.getOverview(subjectId: 'sub_ssc_physics'),
        ).thenAnswer((_) async => const Right(overview));
        when(
          () => mockExamRepo.getHistory(
            subjectId: any(named: 'subjectId'),
            testType: any(named: 'testType'),
          ),
        ).thenAnswer((_) async => const Right(history));
        when(() => mockStudentRepo.listShareLinks()).thenAnswer(
          (_) async => const Right(<GuardianShareLinkEntity>[shareLink]),
        );
        when(() => mockReportRepo.listMyReports()).thenAnswer(
          (_) async => const Right(<ContentReportEntity>[report]),
        );

        final copiedTexts = <String>[];
        const customEnv = EnvConfig(
          apiBaseUrl: 'https://porhi.com/api',
          webBaseUrl: 'https://web.porhi.com/',
        );
        const derivedEnv = EnvConfig(apiBaseUrl: 'https://porhi.com/api');
        expect(
          derivedEnv.guardianShareUrl('/guardian/GUARD123'),
          'https://porhi.com/guardian/GUARD123',
        );

        final controller = ProgressController(
          getOverviewUseCase: GetOverviewUseCase(mockStudentRepo),
          getCachedOverviewUseCase: GetCachedOverviewUseCase(mockStudentRepo),
          getExamHistoryUseCase: GetExamHistoryUseCase(mockExamRepo),
          listShareLinksUseCase: ListShareLinksUseCase(mockStudentRepo),
          createShareLinkUseCase: CreateShareLinkUseCase(mockStudentRepo),
          revokeShareLinkUseCase: RevokeShareLinkUseCase(mockStudentRepo),
          listMyContentReportsUseCase:
              ListMyContentReportsUseCase(mockReportRepo),
          getLanguageUseCase: GetLanguageUseCase(mockAuthRepo),
          getCachedUserUseCase: GetCachedUserUseCase(mockAuthRepo),
          getActiveSubjectIdUseCase: GetActiveSubjectIdUseCase(mockStudentRepo),
          envConfig: customEnv,
          shareGateway: mockShareGateway,
          clipboardWriter: (text) async => copiedTexts.add(text),
        );
        Get.put<ProgressController>(controller);
        await Future<void>.delayed(Duration.zero);

        expect(controller.overview.value?.streakDays, 6);
        expect(controller.examHistory.value?.trend.length, 2);
        expect(controller.shareLinks.length, 1);
        expect(controller.contentReports.length, 1);

        // Full URL built with EnvConfig (no localhost or /api).
        final fullUrl = controller.buildShareUrl(shareLink);
        expect(fullUrl, 'https://web.porhi.com/guardian/GUARD123');

        // Copy & Share verify exact URL.
        await controller.copyShareLink(shareLink);
        expect(copiedTexts, <String>['https://web.porhi.com/guardian/GUARD123']);

        await controller.shareGuardianLink(shareLink);
        verify(
          () => mockShareGateway.shareText(
            any(that: contains('https://web.porhi.com/guardian/GUARD123')),
            subject: any(named: 'subject'),
          ),
        ).called(1);

        // Create new share link.
        const createdLink = GuardianShareLinkEntity(
          id: 'link_2',
          shareCode: 'TEACH999',
          audience: 'TEACHER',
          recipientLabel: 'সায়েন্স স্যার',
          isActive: true,
          sharePath: '/guardian/TEACH999',
          createdAt: '2026-11-12T12:00:00Z',
        );
        when(
          () => mockStudentRepo.createShareLink(
            audience: 'TEACHER',
            recipientLabel: 'সায়েন্স স্যার',
          ),
        ).thenAnswer((_) async => const Right(createdLink));

        controller.selectedAudience.value = 'TEACHER';
        controller.recipientLabelController.text = 'সায়েন্স স্যার';
        await controller.createShareLink();
        expect(controller.shareLinks.first.id, 'link_2');

        // Revoke share link.
        const revokedLink = GuardianShareLinkEntity(
          id: 'link_2',
          shareCode: 'TEACH999',
          audience: 'TEACHER',
          recipientLabel: 'সায়েন্স স্যার',
          isActive: false,
          sharePath: '/guardian/TEACH999',
          createdAt: '2026-11-12T12:00:00Z',
          revokedAt: '2026-11-12T12:05:00Z',
        );
        when(() => mockStudentRepo.revokeShareLink('link_2'))
            .thenAnswer((_) async => const Right(revokedLink));

        await controller.revokeShareLink('link_2');
        expect(
          controller.shareLinks.firstWhere((l) => l.id == 'link_2').isActive,
          isFalse,
        );

        // Filter exam history by SUBJECT_TEST.
        when(
          () => mockExamRepo.getHistory(
            subjectId: 'sub_ssc_physics',
            testType: 'SUBJECT_TEST',
          ),
        ).thenAnswer(
          (_) async => const Right(
            ExamHistoryEntity(
              items: <ExamHistoryItemEntity>[],
              summary: ExamHistorySummaryEntity(
                totalTests: 1,
                averageAccuracy: 88,
                bestScorePercent: 88,
                subjectTestsCount: 1,
              ),
              trend: <ExamHistoryTrendPointEntity>[
                ExamHistoryTrendPointEntity(
                  sessionId: 's2',
                  label: 'পদার্থবিজ্ঞান',
                  date: '2026-11-12',
                  accuracyPercent: 88,
                  testType: 'SUBJECT_TEST',
                ),
              ],
            ),
          ),
        );
        await controller.selectTestTypeFilter('SUBJECT_TEST');
        expect(controller.selectedTestTypeFilter.value, 'SUBJECT_TEST');
        expect(controller.examHistory.value?.trend.length, 1);
      },
    );

    test('ProgressController falls back to cached overview when offline', () async {
      const cached = StudentOverviewEntity(
        subjectId: 'sub_ssc_physics',
        streakDays: 4,
        isFromCache: true,
      );
      when(
        () => mockStudentRepo.getCachedOverview(subjectId: 'sub_ssc_physics'),
      ).thenAnswer((_) async => cached);
      when(
        () => mockStudentRepo.getOverview(subjectId: 'sub_ssc_physics'),
      ).thenAnswer(
        (_) async => Left(
          ErrorResponse(
            message: '  ',
            data: ApiResponseErrorType.noInternet,
          ),
        ),
      );
      when(
        () => mockExamRepo.getHistory(
          subjectId: any(named: 'subjectId'),
          testType: any(named: 'testType'),
        ),
      ).thenAnswer(
        (_) async => Left(
          ErrorResponse(
            message: '',
            data: ApiResponseErrorType.noInternet,
          ),
        ),
      );
      when(() => mockStudentRepo.listShareLinks()).thenAnswer(
        (_) async => Left(
          ErrorResponse(
            message: '',
            data: ApiResponseErrorType.noInternet,
          ),
        ),
      );
      when(() => mockReportRepo.listMyReports()).thenAnswer(
        (_) async => Left(
          ErrorResponse(
            message: '',
            data: ApiResponseErrorType.noInternet,
          ),
        ),
      );

      final controller = ProgressController(
        getOverviewUseCase: GetOverviewUseCase(mockStudentRepo),
        getCachedOverviewUseCase: GetCachedOverviewUseCase(mockStudentRepo),
        getExamHistoryUseCase: GetExamHistoryUseCase(mockExamRepo),
        listShareLinksUseCase: ListShareLinksUseCase(mockStudentRepo),
        createShareLinkUseCase: CreateShareLinkUseCase(mockStudentRepo),
        revokeShareLinkUseCase: RevokeShareLinkUseCase(mockStudentRepo),
        listMyContentReportsUseCase: ListMyContentReportsUseCase(mockReportRepo),
        getLanguageUseCase: GetLanguageUseCase(mockAuthRepo),
        getCachedUserUseCase: GetCachedUserUseCase(mockAuthRepo),
        getActiveSubjectIdUseCase: GetActiveSubjectIdUseCase(mockStudentRepo),
        envConfig: const EnvConfig(apiBaseUrl: 'https://porhi.com/api'),
        shareGateway: mockShareGateway,
      );
      Get.put<ProgressController>(controller);
      await Future<void>.delayed(Duration.zero);

      expect(controller.overview.value?.streakDays, 4);
      expect(controller.isOfflineCache.value, isTrue);
      expect(controller.errorMessage.value, isNotNull);
      expect(controller.errorMessage.value!.trim(), isNotEmpty);
    });
  });

  group('320dp Widget Tests & 4-tab MainShellView integration', () {
    late _MockPlannerRepository mockPlannerRepo;
    late _MockStudentRepository mockStudentRepo;
    late _MockExamRepository mockExamRepo;
    late _MockContentReportRepository mockReportRepo;
    late _MockAuthRepository mockAuthRepo;
    late _MockCurriculumRepository mockCurriculumRepo;
    late _MockNotificationsGateway mockGateway;
    late _MockShareGateway mockShareGateway;
    late PreferencesStorageService prefs;

    setUp(() async {
      SharedPreferences.setMockInitialValues(<String, Object>{});
      prefs = PreferencesStorageService();
      await prefs.init();

      mockPlannerRepo = _MockPlannerRepository();
      mockStudentRepo = _MockStudentRepository();
      mockExamRepo = _MockExamRepository();
      mockReportRepo = _MockContentReportRepository();
      mockAuthRepo = _MockAuthRepository();
      mockCurriculumRepo = _MockCurriculumRepository();
      mockGateway = _MockNotificationsGateway();
      mockShareGateway = _MockShareGateway();

      when(
        () => mockGateway.initialize(
          onNotificationTap: any(named: 'onNotificationTap'),
          channelId: any(named: 'channelId'),
          channelName: any(named: 'channelName'),
          channelDescription: any(named: 'channelDescription'),
        ),
      ).thenAnswer((_) async {});
      when(() => mockGateway.requestPermissions()).thenAnswer((_) async => true);
      when(
        () => mockGateway.zonedSchedule(
          id: any(named: 'id'),
          title: any(named: 'title'),
          body: any(named: 'body'),
          scheduledDate: any(named: 'scheduledDate'),
          payload: any(named: 'payload'),
          channelId: any(named: 'channelId'),
          channelName: any(named: 'channelName'),
          channelDescription: any(named: 'channelDescription'),
        ),
      ).thenAnswer((_) async {});
      when(() => mockGateway.cancel(any())).thenAnswer((_) async {});
      when(() => mockGateway.cancelAll()).thenAnswer((_) async {});
      when(
        () => mockShareGateway.shareText(
          any(),
          subject: any(named: 'subject'),
        ),
      ).thenAnswer((_) async {});

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
      when(
        () => mockStudentRepo.getCachedOverview(
          subjectId: any(named: 'subjectId'),
        ),
      ).thenAnswer((_) async => null);
      when(() => mockStudentRepo.getCachedPlannerSummary())
          .thenAnswer((_) async => null);
      when(
        () => mockStudentRepo.getCachedQuickSearchCatalog(
          subjectId: any(named: 'subjectId'),
        ),
      ).thenAnswer((_) async => const <QuickSearchTopicEntity>[]);
      when(() => mockPlannerRepo.getCachedTasks())
          .thenAnswer((_) async => null);
      when(() => mockCurriculumRepo.getCachedSubjects())
          .thenAnswer((_) async => const <SubjectEntity>[]);
      when(() => mockCurriculumRepo.getDownloadedChapters())
          .thenAnswer((_) async => const <DownloadedChapterEntity>[]);
      when(() => mockCurriculumRepo.getActiveSubjectId(any()))
          .thenReturn('sub_ssc_physics');
    });

    void registerAllShellDeps() {
      Get.put<EnvConfig>(const EnvConfig(apiBaseUrl: 'https://porhi.com/api'));
      Get.put<PreferencesStorageService>(prefs);
      Get.put<LocalReminderScheduler>(
        LocalReminderScheduler(gateway: mockGateway),
      );
      Get.put<ShareGateway>(mockShareGateway);

      Get.put<AuthRepository>(mockAuthRepo);
      Get.put<StudentRepository>(mockStudentRepo);
      Get.put<CurriculumRepository>(mockCurriculumRepo);
      Get.put<PlannerRepository>(mockPlannerRepo);
      Get.put<ExamRepository>(mockExamRepo);
      Get.put<ContentReportRepository>(mockReportRepo);

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
      Get.put<ListShareLinksUseCase>(ListShareLinksUseCase(mockStudentRepo));
      Get.put<CreateShareLinkUseCase>(CreateShareLinkUseCase(mockStudentRepo));
      Get.put<RevokeShareLinkUseCase>(RevokeShareLinkUseCase(mockStudentRepo));
      Get.put<ListMyContentReportsUseCase>(
        ListMyContentReportsUseCase(mockReportRepo),
      );
      Get.put<GetExamHistoryUseCase>(GetExamHistoryUseCase(mockExamRepo));

      Get.put<GetSubjectsUseCase>(GetSubjectsUseCase(mockCurriculumRepo));
      Get.put<GetCachedSubjectsUseCase>(
        GetCachedSubjectsUseCase(mockCurriculumRepo),
      );
      Get.put<FilterSubjectsUseCase>(const FilterSubjectsUseCase());
      Get.put<GetDownloadedChaptersUseCase>(
        GetDownloadedChaptersUseCase(mockCurriculumRepo),
      );
      Get.put<GetActiveCurriculumSubjectUseCase>(
        GetActiveCurriculumSubjectUseCase(mockCurriculumRepo),
      );
      Get.put<SetActiveCurriculumSubjectUseCase>(
        SetActiveCurriculumSubjectUseCase(mockCurriculumRepo),
      );

      Get.put<GetPlannerTasksUseCase>(GetPlannerTasksUseCase(mockPlannerRepo));
      Get.put<GetCachedPlannerTasksUseCase>(
        GetCachedPlannerTasksUseCase(mockPlannerRepo),
      );
      Get.put<CreateStudyTaskUseCase>(CreateStudyTaskUseCase(mockPlannerRepo));
      Get.put<AutoGenerateStudyPlanUseCase>(
        AutoGenerateStudyPlanUseCase(mockPlannerRepo),
      );
      Get.put<ToggleStudyTaskCompletionUseCase>(
        ToggleStudyTaskCompletionUseCase(mockPlannerRepo),
      );
      Get.put<DeleteStudyTaskUseCase>(DeleteStudyTaskUseCase(mockPlannerRepo));
    }

    testWidgets('PlannerView renders at 320dp without overflow and supports task CRUD', (
      tester,
    ) async {
      tester.view.physicalSize = const Size(320, 720);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);

      registerAllShellDeps();

      final futureDate = DateTime.now()
          .add(const Duration(days: 2))
          .toIso8601String()
          .substring(0, 10);

      when(() => mockPlannerRepo.getTasks()).thenAnswer(
        (_) async => Right(
          PlannerOverviewEntity(
            tasks: <PlannerTaskSummaryEntity>[
              PlannerTaskSummaryEntity(
                id: 't_1',
                titleBangla: 'নিউটনের প্রথম সূত্র পড়ো',
                scheduledDate: futureDate,
                reminderTime: '18:30',
                targetType: 'LESSON',
                subjectId: 'sub_ssc_physics',
                topicId: 'top_1',
                completed: false,
              ),
            ],
            todayDueCount: 1,
          ),
        ),
      );
      when(
        () => mockPlannerRepo.createTask(
          titleBangla: 'ভেক্টর অনুশীলন',
          scheduledDate: any(named: 'scheduledDate'),
          reminderTime: '19:00',
          targetType: any(named: 'targetType'),
          subjectId: 'sub_ssc_physics',
          chapterId: any(named: 'chapterId'),
          topicId: any(named: 'topicId'),
        ),
      ).thenAnswer(
        (_) async => Right(
          PlannerTaskSummaryEntity(
            id: 't_2',
            titleBangla: 'ভেক্টর অনুশীলন',
            scheduledDate: futureDate,
            reminderTime: '19:00',
            targetType: 'CUSTOM',
            subjectId: 'sub_ssc_physics',
          ),
        ),
      );

      MainShellBinding().dependencies();

      await tester.pumpWidget(
        GetMaterialApp(
          theme: PorhiTheme.light,
          home: const PlannerView(),
        ),
      );
      await tester.pumpAndSettle();

      expect(find.byKey(const Key('planner_auto_generate_btn')), findsOneWidget);
      expect(find.byKey(const Key('planner_reminder_switch')), findsOneWidget);

      await tester.scrollUntilVisible(
        find.text('নিউটনের প্রথম সূত্র পড়ো'),
        200,
        scrollable: find.byType(Scrollable).first,
      );
      expect(find.text('নিউটনের প্রথম সূত্র পড়ো'), findsOneWidget);

      await tester.scrollUntilVisible(
        find.byKey(const Key('planner_title_input')),
        -200,
        scrollable: find.byType(Scrollable).first,
      );
      await tester.enterText(
        find.byKey(const Key('planner_title_input')),
        'ভেক্টর অনুশীলন',
      );
      await tester.enterText(
        find.byKey(const Key('planner_time_input')),
        '১৯:০০',
      );
      await tester.ensureVisible(
        find.byKey(const Key('planner_create_submit_btn')),
      );
      await tester.tap(find.byKey(const Key('planner_create_submit_btn')));
      await tester.pumpAndSettle();

      await tester.scrollUntilVisible(
        find.text('ভেক্টর অনুশীলন'),
        200,
        scrollable: find.byType(Scrollable).first,
      );
      expect(find.text('ভেক্টর অনুশীলন'), findsOneWidget);
      expect(tester.takeException(), isNull);
    });

    testWidgets(
      'ProgressView renders chart, weak topics, reports, and guardian share links at 320dp',
      (tester) async {
        tester.view.physicalSize = const Size(320, 800);
        tester.view.devicePixelRatio = 1.0;
        addTearDown(tester.view.resetPhysicalSize);
        addTearDown(tester.view.resetDevicePixelRatio);

        registerAllShellDeps();

        when(
          () => mockStudentRepo.getOverview(subjectId: 'sub_ssc_physics'),
        ).thenAnswer(
          (_) async => const Right(
            StudentOverviewEntity(
              subjectId: 'sub_ssc_physics',
              curriculumTotals: CurriculumTotalsEntity(
                totalChapters: 4,
                totalTopics: 10,
              ),
              completedTopicIds: <String>['t1', 't2'],
              practiceStats: PracticeStatsEntity(
                totalAttempts: 25,
                correctAttempts: 20,
                accuracyPercent: 80,
              ),
              streakDays: 5,
              dueMistakes: <DueMistakeEntity>[
                DueMistakeEntity(
                  id: 'm1',
                  questionId: 'q1',
                  updatedAt: '2026-11-12',
                  topicId: 't1',
                  topicTitle: 'ত্বরণ',
                  chapterId: 'chap_2',
                  chapterTitle: 'গতি',
                  stem: 'বেগ বৃদ্ধির হারকে কী বলে?',
                  correctOptionText: 'ত্বরণ',
                ),
              ],
              weakTopics: <WeakTopicEntity>[
                WeakTopicEntity(
                  topicId: 't1',
                  topicTitle: 'ত্বরণ',
                  chapterId: 'chap_2',
                  chapterTitle: 'গতি',
                  accuracy: 40,
                  mistakeCount: 4,
                ),
              ],
              bookmarks: <StudentBookmarkEntity>[
                StudentBookmarkEntity(
                  id: 't1',
                  type: 'topic',
                  titleBangla: 'ত্বরণ ও মন্দন',
                  href: '/lesson/t1',
                  createdAt: '2026-11-12',
                ),
              ],
            ),
          ),
        );
        when(
          () => mockExamRepo.getHistory(
            subjectId: any(named: 'subjectId'),
            testType: any(named: 'testType'),
          ),
        ).thenAnswer(
          (_) async => const Right(
            ExamHistoryEntity(
              items: <ExamHistoryItemEntity>[],
              summary: ExamHistorySummaryEntity(
                totalTests: 2,
                averageAccuracy: 75,
                bestScorePercent: 85,
                subjectTestsCount: 1,
              ),
              trend: <ExamHistoryTrendPointEntity>[
                ExamHistoryTrendPointEntity(
                  sessionId: 's1',
                  label: 'গতি',
                  date: '2026-11-10',
                  accuracyPercent: 65,
                  testType: 'CHAPTER_TEST',
                ),
                ExamHistoryTrendPointEntity(
                  sessionId: 's2',
                  label: 'বল',
                  date: '2026-11-12',
                  accuracyPercent: 85,
                  testType: 'SUBJECT_TEST',
                ),
              ],
            ),
          ),
        );
        when(() => mockStudentRepo.listShareLinks()).thenAnswer(
          (_) async => const Right(<GuardianShareLinkEntity>[
            GuardianShareLinkEntity(
              id: 'share_1',
              shareCode: 'ABC123',
              audience: 'PARENT',
              recipientLabel: 'বাবা',
              isActive: true,
              sharePath: '/guardian/ABC123',
              createdAt: '2026-11-12',
            ),
          ]),
        );
        when(() => mockReportRepo.listMyReports()).thenAnswer(
          (_) async => const Right(<ContentReportEntity>[
            ContentReportEntity(
              id: 'rep_1',
              contentType: ReportContentType.lesson,
              contentId: 'les_1',
              category: ReportCategory.typoOrLatex,
              description: 'সূত্র ভেঙে গেছে',
              status: 'OPEN',
              createdAt: '2026-11-12',
            ),
          ]),
        );

        MainShellBinding().dependencies();

        await tester.pumpWidget(
          GetMaterialApp(
            theme: PorhiTheme.light,
            home: const ProgressView(),
          ),
        );
        await tester.pumpAndSettle();

        expect(find.byKey(const Key('progress_trend_chart')), findsOneWidget);

        await tester.scrollUntilVisible(
          find.text('দুর্বল টপিক ও বাকি ভুলসমূহ'),
          200,
          scrollable: find.byType(Scrollable).first,
        );
        expect(find.text('ত্বরণ'), findsWidgets);

        await tester.scrollUntilVisible(
          find.text('সূত্র ভেঙে গেছে'),
          200,
          scrollable: find.byType(Scrollable).first,
        );
        expect(find.text('সূত্র ভেঙে গেছে'), findsOneWidget);

        await tester.scrollUntilVisible(
          find.text('https://porhi.com/guardian/ABC123'),
          200,
          scrollable: find.byType(Scrollable).first,
        );
        expect(find.text('https://porhi.com/guardian/ABC123'), findsOneWidget);
        expect(tester.takeException(), isNull);
      },
    );

    testWidgets(
      'ProgressView shows empty trend state when fewer than 2 tests exist',
      (tester) async {
        registerAllShellDeps();
        when(
          () => mockStudentRepo.getOverview(subjectId: 'sub_ssc_physics'),
        ).thenAnswer(
          (_) async => const Right(
            StudentOverviewEntity(subjectId: 'sub_ssc_physics'),
          ),
        );
        when(
          () => mockExamRepo.getHistory(
            subjectId: any(named: 'subjectId'),
            testType: any(named: 'testType'),
          ),
        ).thenAnswer(
          (_) async => const Right(
            ExamHistoryEntity(
              trend: <ExamHistoryTrendPointEntity>[
                ExamHistoryTrendPointEntity(
                  sessionId: 's1',
                  label: 'গতি',
                  date: '2026-11-10',
                  accuracyPercent: 75,
                ),
              ],
            ),
          ),
        );
        when(() => mockStudentRepo.listShareLinks())
            .thenAnswer((_) async => const Right(<GuardianShareLinkEntity>[]));
        when(() => mockReportRepo.listMyReports())
            .thenAnswer((_) async => const Right(<ContentReportEntity>[]));

        MainShellBinding().dependencies();

        await tester.pumpWidget(
          GetMaterialApp(
            theme: PorhiTheme.light,
            home: const ProgressView(),
          ),
        );
        await tester.pumpAndSettle();

        expect(find.byKey(const Key('progress_trend_chart')), findsNothing);
        expect(
          find.textContaining('অন্তত ২টি মডেল টেস্ট সম্পন্ন করো'),
          findsOneWidget,
        );
      },
    );

    testWidgets(
      'MainShellView switches across all 4 real tabs without IndexedStack and disposes on logout',
      (tester) async {
        registerAllShellDeps();

        when(
          () => mockStudentRepo.getOverview(subjectId: any(named: 'subjectId')),
        ).thenAnswer(
          (_) async => const Right(
            StudentOverviewEntity(subjectId: 'sub_ssc_physics'),
          ),
        );
        when(() => mockStudentRepo.getPlannerSummary()).thenAnswer(
          (_) async => const Right(PlannerOverviewEntity()),
        );
        when(() => mockCurriculumRepo.getSubjects(program: any(named: 'program')))
            .thenAnswer((_) async => const Right(<SubjectEntity>[]));
        when(() => mockPlannerRepo.getTasks()).thenAnswer(
          (_) async => const Right(PlannerOverviewEntity()),
        );
        when(
          () => mockExamRepo.getHistory(
            subjectId: any(named: 'subjectId'),
            testType: any(named: 'testType'),
          ),
        ).thenAnswer((_) async => const Right(ExamHistoryEntity()));
        when(() => mockStudentRepo.listShareLinks())
            .thenAnswer((_) async => const Right(<GuardianShareLinkEntity>[]));
        when(() => mockReportRepo.listMyReports())
            .thenAnswer((_) async => const Right(<ContentReportEntity>[]));

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
                name: AppRoutes.login,
                page: () => const Scaffold(body: Text('Login')),
              ),
            ],
          ),
        );
        await tester.pumpAndSettle();

        expect(find.byType(IndexedStack), findsNothing);
        expect(find.byType(PlannerView), findsNothing);
        expect(find.byType(ProgressView), findsNothing);

        // Switch to Planner tab (index 2).
        await tester.tap(find.text(AppStrings.t('nav.planner', AppLanguage.bn)));
        await tester.pumpAndSettle();
        expect(find.byType(PlannerView), findsOneWidget);
        expect(find.byType(ProgressView), findsNothing);
        expect(find.byType(IndexedStack), findsNothing);

        // Switch to Progress tab (index 3).
        await tester.tap(find.text(AppStrings.t('nav.progress', AppLanguage.bn)));
        await tester.pumpAndSettle();
        expect(find.byType(ProgressView), findsOneWidget);
        expect(find.byType(PlannerView), findsNothing);
        expect(find.byType(IndexedStack), findsNothing);

        // Logout disposes shell and tab controllers cleanly (no fenix resurrection).
        Get.offAllNamed<void>(AppRoutes.login);
        await tester.pumpAndSettle();
        expect(Get.isRegistered<MainShellController>(), isFalse);
        expect(Get.isRegistered<PlannerController>(), isFalse);
        expect(Get.isRegistered<ProgressController>(), isFalse);
      },
    );
  });
}
