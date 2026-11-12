import 'package:get/get.dart';
import 'package:porhi/features/auth/domain/usecases/auth_usecases.dart';
import 'package:porhi/features/dashboard/domain/usecases/student_usecases.dart';
import 'package:porhi/features/dashboard/presentation/dashboard/controller/dashboard_controller.dart';
import 'package:porhi/features/shell/presentation/main_shell/controller/main_shell_controller.dart';

/// Registers the shell controller and lazily registers all tab controllers so
/// controller lifetimes remain managed by GetX bindings instead of view switches.
class MainShellBinding extends Bindings {
  final List<Bindings> tabBindings;

  MainShellBinding({this.tabBindings = const <Bindings>[]});

  @override
  void dependencies() {
    if (!Get.isRegistered<MainShellController>()) {
      Get.lazyPut<MainShellController>(
        () => MainShellController(
          getLanguageUseCase: Get.find<GetLanguageUseCase>(),
          getCachedUserUseCase: Get.find<GetCachedUserUseCase>(),
          getPendingSyncCountUseCase: Get.find<GetPendingSyncCountUseCase>(),
          watchPendingSyncCountUseCase:
              Get.find<WatchPendingSyncCountUseCase>(),
        ),
        fenix: true,
      );
    }

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

    for (final binding in tabBindings) {
      binding.dependencies();
    }
  }
}
