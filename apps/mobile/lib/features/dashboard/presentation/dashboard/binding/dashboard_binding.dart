import 'package:get/get.dart';
import 'package:porhi/features/auth/domain/usecases/auth_usecases.dart';
import 'package:porhi/features/dashboard/domain/usecases/student_usecases.dart';
import 'package:porhi/features/dashboard/presentation/dashboard/controller/dashboard_controller.dart';

/// Standalone binding for `/search` route when opened outside [MainShellBinding].
class QuickSearchBinding extends Bindings {
  @override
  void dependencies() {
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
        ),
        fenix: true,
      );
    }
  }
}
