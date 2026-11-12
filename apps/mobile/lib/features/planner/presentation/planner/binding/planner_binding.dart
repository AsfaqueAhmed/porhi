import 'package:flutter/foundation.dart';
import 'package:get/get.dart';
import 'package:porhi/core/notifications/local_reminder_scheduler.dart';
import 'package:porhi/core/storage/preferences_storage_service.dart';
import 'package:porhi/features/auth/domain/usecases/auth_usecases.dart';
import 'package:porhi/features/dashboard/domain/usecases/student_usecases.dart';
import 'package:porhi/features/planner/domain/usecases/planner_usecases.dart';
import 'package:porhi/features/planner/presentation/planner/controller/planner_controller.dart';

/// Registers [PlannerController] without `fenix: true` so logout cleanly
/// disposes tab controllers.
class PlannerBinding extends Bindings {
  static void registerDependencies({VoidCallback? onPlannerChanged}) {
    if (!Get.isRegistered<PlannerController>()) {
      Get.lazyPut<PlannerController>(
        () => PlannerController(
          getPlannerTasksUseCase: Get.find<GetPlannerTasksUseCase>(),
          getCachedPlannerTasksUseCase:
              Get.find<GetCachedPlannerTasksUseCase>(),
          createStudyTaskUseCase: Get.find<CreateStudyTaskUseCase>(),
          autoGenerateStudyPlanUseCase:
              Get.find<AutoGenerateStudyPlanUseCase>(),
          toggleStudyTaskCompletionUseCase:
              Get.find<ToggleStudyTaskCompletionUseCase>(),
          deleteStudyTaskUseCase: Get.find<DeleteStudyTaskUseCase>(),
          getLanguageUseCase: Get.find<GetLanguageUseCase>(),
          getCachedUserUseCase: Get.find<GetCachedUserUseCase>(),
          getActiveSubjectIdUseCase: Get.find<GetActiveSubjectIdUseCase>(),
          reminderScheduler: Get.find<LocalReminderScheduler>(),
          preferencesStorage: Get.find<PreferencesStorageService>(),
          onPlannerChanged: onPlannerChanged,
        ),
      );
    }
  }

  @override
  void dependencies() {
    registerDependencies();
  }
}
