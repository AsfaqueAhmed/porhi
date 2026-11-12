import 'package:get/get.dart';
import 'package:porhi/features/auth/domain/usecases/auth_usecases.dart';
import 'package:porhi/features/dashboard/domain/usecases/student_usecases.dart';
import 'package:porhi/features/dashboard/presentation/dashboard/controller/dashboard_controller.dart';
import 'package:porhi/features/lesson/domain/usecases/lesson_usecases.dart';

/// Registers [DashboardController] without `fenix: true` so popped `/home`
/// and `/search` controllers are disposed cleanly on logout.
class DashboardBinding extends Bindings {
  static void registerDependencies() {
    if (!Get.isRegistered<DashboardController>()) {
      Get.lazyPut<DashboardController>(
        () => DashboardController(
          getOverviewUseCase: Get.find<GetOverviewUseCase>(),
          getCachedOverviewUseCase: Get.find<GetCachedOverviewUseCase>(),
          getPlannerSummaryUseCase: Get.find<GetPlannerSummaryUseCase>(),
          getCachedPlannerSummaryUseCase:
              Get.find<GetCachedPlannerSummaryUseCase>(),
          getQuickSearchCatalogUseCase:
              Get.find<GetQuickSearchCatalogUseCase>(),
          getCachedQuickSearchCatalogUseCase:
              Get.find<GetCachedQuickSearchCatalogUseCase>(),
          filterQuickSearchTopicsUseCase:
              Get.find<FilterQuickSearchTopicsUseCase>(),
          flushOfflineSyncUseCase: Get.find<FlushOfflineSyncUseCase>(),
          getPendingSyncCountUseCase: Get.find<GetPendingSyncCountUseCase>(),
          watchPendingSyncCountUseCase:
              Get.find<WatchPendingSyncCountUseCase>(),
          getCachedUserUseCase: Get.find<GetCachedUserUseCase>(),
          getLanguageUseCase: Get.find<GetLanguageUseCase>(),
          getActiveSubjectIdUseCase: Get.find<GetActiveSubjectIdUseCase>(),
          getLocalTopicStateOverlayUseCase:
              Get.isRegistered<GetLocalTopicStateOverlayUseCase>()
                  ? Get.find<GetLocalTopicStateOverlayUseCase>()
                  : null,
        ),
      );
    }
  }

  @override
  void dependencies() {
    registerDependencies();
  }
}

/// Standalone binding for `/search` route when opened outside [MainShellBinding].
class QuickSearchBinding extends Bindings {
  @override
  void dependencies() {
    DashboardBinding.registerDependencies();
  }
}
