import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/core/notifications/local_reminder_scheduler.dart';
import 'package:porhi/core/storage/preferences_storage_service.dart';
import 'package:porhi/features/auth/domain/usecases/auth_usecases.dart';
import 'package:porhi/features/dashboard/domain/usecases/student_usecases.dart';
import 'package:porhi/features/exam/domain/entities/exam_entities.dart';
import 'package:porhi/features/lesson/domain/entities/lesson_entities.dart';
import 'package:porhi/features/planner/domain/entities/planner_entities.dart';
import 'package:porhi/features/planner/domain/usecases/planner_usecases.dart';
import 'package:porhi/features/practice/domain/entities/practice_entities.dart';
import 'package:porhi/routes/app_routes.dart';

class PlannerController extends GetxController {
  static const String remindersEnabledStorageKey =
      'porhi_study_reminders_enabled';

  final GetPlannerTasksUseCase _getPlannerTasksUseCase;
  final GetCachedPlannerTasksUseCase _getCachedPlannerTasksUseCase;
  final CreateStudyTaskUseCase _createStudyTaskUseCase;
  final AutoGenerateStudyPlanUseCase _autoGenerateStudyPlanUseCase;
  final ToggleStudyTaskCompletionUseCase _toggleStudyTaskCompletionUseCase;
  final DeleteStudyTaskUseCase _deleteStudyTaskUseCase;
  final GetLanguageUseCase _getLanguageUseCase;
  final GetCachedUserUseCase _getCachedUserUseCase;
  final GetActiveSubjectIdUseCase _getActiveSubjectIdUseCase;
  final LocalReminderScheduler _reminderScheduler;
  final PreferencesStorageService _preferencesStorage;
  final VoidCallback? _onPlannerChanged;

  PlannerController({
    required this._getPlannerTasksUseCase,
    required this._getCachedPlannerTasksUseCase,
    required this._createStudyTaskUseCase,
    required this._autoGenerateStudyPlanUseCase,
    required this._toggleStudyTaskCompletionUseCase,
    required this._deleteStudyTaskUseCase,
    required this._getLanguageUseCase,
    required this._getCachedUserUseCase,
    required this._getActiveSubjectIdUseCase,
    required this._reminderScheduler,
    required this._preferencesStorage,
    this._onPlannerChanged,
  });

  final TextEditingController titleController = TextEditingController();
  final TextEditingController dateController = TextEditingController();
  final TextEditingController reminderTimeController = TextEditingController();

  final Rx<AppLanguage> language = AppLanguage.bn.obs;
  final RxString activeSubjectId = 'sub_ssc_physics'.obs;
  final RxList<PlannerTaskSummaryEntity> tasks =
      <PlannerTaskSummaryEntity>[].obs;
  final RxInt todayDueCount = 0.obs;
  final Rx<PlannerTaskFilter> selectedFilter = PlannerTaskFilter.all.obs;
  final RxString selectedTargetType = 'CUSTOM'.obs;
  final RxBool remindersEnabled = true.obs;

  final RxBool isLoading = false.obs;
  final RxBool isSubmitting = false.obs;
  final RxBool isAutoGenerating = false.obs;
  final RxBool isOfflineCache = false.obs;
  final RxSet<String> pendingTaskIds = <String>{}.obs;
  final RxnString errorMessage = RxnString();
  final RxnString statusMessage = RxnString();
  final RxBool isStatusError = false.obs;

  int _loadGeneration = 0;
  bool _isNavigating = false;

  @override
  void onInit() {
    super.onInit();
    dateController.text = _todayIsoDate();
    refreshPreferences();
    loadTasks();
  }

  static String _todayIsoDate() {
    return DateTime.now().toIso8601String().substring(0, 10);
  }

  void refreshPreferences() {
    language.value = AppLanguage.fromCode(_getLanguageUseCase());
    final user = _getCachedUserUseCase();
    activeSubjectId.value = _getActiveSubjectIdUseCase(user?.selectedClass);
    remindersEnabled.value = _preferencesStorage.getBool(
      remindersEnabledStorageKey,
      defaultValue: true,
    );
  }

  Future<void> refreshFromShell() async {
    refreshPreferences();
    await loadTasks();
  }

  List<PlannerTaskSummaryEntity> get filteredTasks {
    final today = _todayIsoDate();
    switch (selectedFilter.value) {
      case PlannerTaskFilter.all:
        return tasks.toList();
      case PlannerTaskFilter.dueToday:
        return tasks
            .where((t) => !t.completed && t.scheduledDate.compareTo(today) <= 0)
            .toList();
      case PlannerTaskFilter.completed:
        return tasks.where((t) => t.completed).toList();
    }
  }

  int get completedCount => tasks.where((t) => t.completed).length;

  int get pendingCount => tasks.where((t) => !t.completed).length;

  void setFilter(PlannerTaskFilter filter) {
    selectedFilter.value = filter;
  }

  void setTargetType(String targetType) {
    selectedTargetType.value = targetType;
  }

  Future<void> loadTasks() async {
    final generation = ++_loadGeneration;
    refreshPreferences();
    isLoading.value = true;
    errorMessage.value = null;

    try {
      if (tasks.isEmpty) {
        final cached = await _getCachedPlannerTasksUseCase();
        if (isClosed || generation != _loadGeneration) return;
        if (cached != null) {
          tasks.assignAll(cached.tasks);
          todayDueCount.value = cached.todayDueCount;
          isOfflineCache.value = true;
        }
      }

      final result = await _getPlannerTasksUseCase();
      if (isClosed || generation != _loadGeneration) return;

      await result.fold(
        (err) async {
          errorMessage.value = resolvePlannerErrorMessage(
            err.message,
            AppStrings.tr(
              'স্টাডি প্ল্যানার লোড করা যায়নি।',
              'Could not load study planner.',
              language.value,
            ),
          );
          if (tasks.isNotEmpty) {
            isOfflineCache.value = true;
          }
        },
        (overview) async {
          tasks.assignAll(overview.tasks);
          todayDueCount.value = overview.todayDueCount;
          isOfflineCache.value = overview.isFromCache;
          await _syncRemindersSafely();
        },
      );
    } finally {
      if (!isClosed && generation == _loadGeneration) {
        isLoading.value = false;
      }
    }
  }

  Future<void> createTask() async {
    if (isSubmitting.value) return;
    isSubmitting.value = true;
    statusMessage.value = null;
    isStatusError.value = false;

    try {
      final result = await _createStudyTaskUseCase(
        titleBangla: titleController.text,
        scheduledDate: dateController.text,
        reminderTime: reminderTimeController.text,
        targetType: selectedTargetType.value,
        subjectId: activeSubjectId.value,
      );
      if (isClosed) return;

      await result.fold(
        (err) async {
          _showStatus(
            resolvePlannerErrorMessage(
              err.message,
              AppStrings.tr(
                'নতুন টাস্ক যোগ করা যায়নি।',
                'Could not create study task.',
                language.value,
              ),
            ),
            isError: true,
          );
        },
        (created) async {
          tasks.add(created);
          _recalculateTodayDueCount();
          titleController.clear();
          reminderTimeController.clear();
          dateController.text = _todayIsoDate();
          await _syncRemindersSafely();
          _onPlannerChanged?.call();
          _showStatus(
            AppStrings.tr(
              'পড়ার টাস্ক যোগ করা হয়েছে।',
              'Study task added.',
              language.value,
            ),
          );
        },
      );
    } finally {
      if (!isClosed) {
        isSubmitting.value = false;
      }
    }
  }

  Future<void> autoGeneratePlan() async {
    if (isAutoGenerating.value) return;
    isAutoGenerating.value = true;
    statusMessage.value = null;
    isStatusError.value = false;

    try {
      final result = await _autoGenerateStudyPlanUseCase(
        subjectId: activeSubjectId.value,
        startDate: _todayIsoDate(),
      );
      if (isClosed) return;

      await result.fold(
        (err) async {
          _showStatus(
            resolvePlannerErrorMessage(
              err.message,
              AppStrings.tr(
                'স্মার্ট প্ল্যান তৈরি করা যায়নি।',
                'Could not auto-generate study plan.',
                language.value,
              ),
            ),
            isError: true,
          );
        },
        (generated) async {
          for (final item in generated.tasks) {
            final exists = tasks.any((t) => t.id == item.id);
            if (!exists) {
              tasks.add(item);
            }
          }
          _recalculateTodayDueCount();
          await _syncRemindersSafely();
          _onPlannerChanged?.call();
          _showStatus(
            generated.createdCount > 0
                ? AppStrings.tr(
                    '৭ দিনের স্মার্ট রুটিন তৈরি হয়েছে (${AppStrings.formatNumber(generated.createdCount, language.value)}টি টাস্ক)।',
                    '7-day smart plan generated (${generated.createdCount} tasks).',
                    language.value,
                  )
                : AppStrings.tr(
                    'নতুন কোনো টাস্ক যোগ করার প্রয়োজন নেই — সব বিষয় প্ল্যানে আছে।',
                    'All recommended topics are already scheduled.',
                    language.value,
                  ),
          );
        },
      );
    } finally {
      if (!isClosed) {
        isAutoGenerating.value = false;
      }
    }
  }

  Future<void> toggleTaskCompletion(PlannerTaskSummaryEntity task) async {
    if (pendingTaskIds.contains(task.id)) return;
    pendingTaskIds.add(task.id);
    statusMessage.value = null;
    isStatusError.value = false;

    try {
      final nextCompleted = !task.completed;
      final result = await _toggleStudyTaskCompletionUseCase(
        id: task.id,
        completed: nextCompleted,
      );
      if (isClosed) return;

      await result.fold(
        (err) async {
          _showStatus(
            resolvePlannerErrorMessage(
              err.message,
              AppStrings.tr(
                'টাস্ক আপডেট করা যায়নি।',
                'Could not update task.',
                language.value,
              ),
            ),
            isError: true,
          );
        },
        (updated) async {
          final index = tasks.indexWhere((t) => t.id == updated.id);
          if (index >= 0) {
            tasks[index] = updated;
          }
          _recalculateTodayDueCount();
          if (updated.completed) {
            await _reminderScheduler.cancelTaskReminder(updated.id);
          } else {
            await _syncRemindersSafely();
          }
          _onPlannerChanged?.call();
        },
      );
    } finally {
      if (!isClosed) {
        pendingTaskIds.remove(task.id);
      }
    }
  }

  Future<void> deleteTask(String taskId) async {
    if (pendingTaskIds.contains(taskId)) return;
    pendingTaskIds.add(taskId);
    statusMessage.value = null;
    isStatusError.value = false;

    try {
      final result = await _deleteStudyTaskUseCase(taskId);
      if (isClosed) return;

      await result.fold(
        (err) async {
          _showStatus(
            resolvePlannerErrorMessage(
              err.message,
              AppStrings.tr(
                'টাস্ক মুছে ফেলা যায়নি।',
                'Could not delete task.',
                language.value,
              ),
            ),
            isError: true,
          );
        },
        (deletedId) async {
          tasks.removeWhere((t) => t.id == deletedId || t.id == taskId);
          _recalculateTodayDueCount();
          await _reminderScheduler.cancelTaskReminder(deletedId);
          _onPlannerChanged?.call();
          _showStatus(
            AppStrings.tr(
              'টাস্ক মুছে ফেলা হয়েছে।',
              'Study task deleted.',
              language.value,
            ),
          );
        },
      );
    } finally {
      if (!isClosed) {
        pendingTaskIds.remove(taskId);
      }
    }
  }

  Future<void> toggleRemindersEnabled(bool enabled) async {
    remindersEnabled.value = enabled;
    await _preferencesStorage.setBool(remindersEnabledStorageKey, enabled);
    if (isClosed) return;
    if (enabled) {
      await _reminderScheduler.initialize(requestPermissions: true);
      await _syncRemindersSafely();
      _showStatus(
        AppStrings.tr(
          'ডিভাইস রিমাইন্ডার চালু করা হয়েছে।',
          'Device reminders enabled.',
          language.value,
        ),
      );
    } else {
      await _reminderScheduler.syncTaskReminders(
        tasks.toList(),
        enabled: false,
      );
      _showStatus(
        AppStrings.tr(
          'ডিভাইস রিমাইন্ডার বন্ধ করা হয়েছে।',
          'Device reminders disabled.',
          language.value,
        ),
      );
    }
  }

  bool canOpenTaskTarget(PlannerTaskSummaryEntity task) {
    final type = task.targetType.trim().toUpperCase();
    switch (type) {
      case 'LESSON':
        return (task.topicId?.trim().isNotEmpty ?? false);
      case 'PRACTICE':
      case 'REVISION':
        return (task.chapterId?.trim().isNotEmpty ?? false);
      case 'MODEL_TEST':
        return (task.chapterId?.trim().isNotEmpty ?? false) ||
            (task.subjectId?.trim().isNotEmpty ?? false);
      default:
        return false;
    }
  }

  Future<void> openTaskTarget(PlannerTaskSummaryEntity task) async {
    if (_isNavigating || !canOpenTaskTarget(task)) return;
    _isNavigating = true;
    try {
      final type = task.targetType.trim().toUpperCase();
      final topicId = task.topicId?.trim() ?? '';
      final chapterId = task.chapterId?.trim() ?? '';
      final subjectId = task.subjectId?.trim() ?? activeSubjectId.value;

      switch (type) {
        case 'LESSON':
          if (topicId.isNotEmpty) {
            await Get.toNamed<dynamic>(
              AppRoutes.lessonForTopic(topicId),
              arguments: LessonRouteArgs(
                subjectId: subjectId,
                chapterId: chapterId.isNotEmpty ? chapterId : null,
                topicTitle: task.titleBangla,
              ),
            );
          }
          break;
        case 'PRACTICE':
        case 'REVISION':
          if (chapterId.isNotEmpty) {
            await Get.toNamed<dynamic>(
              AppRoutes.practiceForChapter(chapterId),
              arguments: PracticeRouteArgs(
                subjectId: subjectId,
                topicId: topicId.isNotEmpty ? topicId : null,
                mode: type == 'REVISION' ? 'mistakes' : null,
              ),
            );
          }
          break;
        case 'MODEL_TEST':
          if (chapterId.isNotEmpty) {
            await Get.toNamed<dynamic>(
              AppRoutes.examForChapter(chapterId),
              arguments: ExamSetupRouteArgs(
                subjectId: subjectId,
                chapterId: chapterId,
                topicId: topicId.isNotEmpty ? topicId : null,
                testType: ExamTestType.chapterTest,
              ),
            );
          } else if (subjectId.isNotEmpty) {
            await Get.toNamed<dynamic>(
              AppRoutes.examSetup,
              arguments: <String, dynamic>{
                'subjectId': subjectId,
                'testType': 'SUBJECT_TEST',
              },
            );
          }
          break;
      }
    } finally {
      _isNavigating = false;
    }
  }

  void _recalculateTodayDueCount() {
    final today = _todayIsoDate();
    todayDueCount.value = tasks
        .where((t) => !t.completed && t.scheduledDate.compareTo(today) <= 0)
        .length;
  }

  Future<void> _syncRemindersSafely() async {
    await _reminderScheduler.syncTaskReminders(
      tasks.toList(),
      enabled: remindersEnabled.value,
    );
  }

  void _showStatus(String message, {bool isError = false}) {
    statusMessage.value = message;
    isStatusError.value = isError;
  }

  @override
  void onClose() {
    titleController.dispose();
    dateController.dispose();
    reminderTimeController.dispose();
    super.onClose();
  }
}
