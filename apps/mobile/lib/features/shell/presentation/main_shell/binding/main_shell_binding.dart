import 'package:get/get.dart';
import 'package:porhi/features/auth/domain/usecases/auth_usecases.dart';
import 'package:porhi/features/curriculum/presentation/subjects/binding/subjects_binding.dart';
import 'package:porhi/features/curriculum/presentation/subjects/controller/subjects_controller.dart';
import 'package:porhi/features/dashboard/domain/usecases/student_usecases.dart';
import 'package:porhi/features/dashboard/presentation/dashboard/binding/dashboard_binding.dart';
import 'package:porhi/features/dashboard/presentation/dashboard/controller/dashboard_controller.dart';
import 'package:porhi/features/planner/presentation/planner/binding/planner_binding.dart';
import 'package:porhi/features/planner/presentation/planner/controller/planner_controller.dart';
import 'package:porhi/features/progress/presentation/progress/binding/progress_binding.dart';
import 'package:porhi/features/progress/presentation/progress/controller/progress_controller.dart';
import 'package:porhi/features/shell/presentation/main_shell/controller/main_shell_controller.dart';

/// Registers the shell controller and lazily registers all tab controllers
/// without `fenix: true` so logout cleanly disposes `/home` controllers.
class MainShellBinding extends Bindings {
  final List<Bindings> tabBindings;

  MainShellBinding({this.tabBindings = const <Bindings>[]});

  @override
  void dependencies() {
    if (!Get.isRegistered<MainShellController>()) {
      Get.lazyPut<MainShellController>(
        () {
          final shell = MainShellController(
            getLanguageUseCase: Get.find<GetLanguageUseCase>(),
            getCachedUserUseCase: Get.find<GetCachedUserUseCase>(),
            getPendingSyncCountUseCase: Get.find<GetPendingSyncCountUseCase>(),
            watchPendingSyncCountUseCase:
                Get.find<WatchPendingSyncCountUseCase>(),
          );
          bool isInstantiated<T>() =>
              Get.isRegistered<T>() && !Get.isPrepared<T>();

          shell.registerTabHooks(
            index: 0,
            onAccountReturn: () async {
              if (isInstantiated<DashboardController>()) {
                await Get.find<DashboardController>()
                    .refreshLanguageAndUser();
              }
            },
            onTabActivated: () async {
              if (isInstantiated<DashboardController>()) {
                await Get.find<DashboardController>()
                    .refreshLanguageAndUser();
              }
            },
          );
          shell.registerTabHooks(
            index: 1,
            onAccountReturn: () async {
              if (isInstantiated<SubjectsController>()) {
                await Get.find<SubjectsController>().refreshFromAccount();
              }
            },
            onTabActivated: () async {
              if (isInstantiated<SubjectsController>()) {
                await Get.find<SubjectsController>().refreshFromAccount();
              }
            },
          );
          shell.registerTabHooks(
            index: 2,
            onAccountReturn: () async {
              if (isInstantiated<PlannerController>()) {
                await Get.find<PlannerController>().refreshFromShell();
              }
            },
            onTabActivated: () async {
              if (isInstantiated<PlannerController>()) {
                await Get.find<PlannerController>().refreshFromShell();
              }
            },
          );
          shell.registerTabHooks(
            index: 3,
            onAccountReturn: () async {
              if (isInstantiated<ProgressController>()) {
                await Get.find<ProgressController>().refreshFromShell();
              }
            },
            onTabActivated: () async {
              if (isInstantiated<ProgressController>()) {
                await Get.find<ProgressController>().refreshFromShell();
              }
            },
          );
          return shell;
        },
      );
    }

    DashboardBinding.registerDependencies();
    SubjectsBinding.registerDependencies(
      onActiveSubjectChanged: () {
        if (Get.isRegistered<MainShellController>()) {
          final shell = Get.find<MainShellController>();
          shell.markTabDirty(0, refreshIfRegistered: true);
          shell.markTabDirty(2);
          shell.markTabDirty(3);
        }
      },
    );
    PlannerBinding.registerDependencies(
      onPlannerChanged: () {
        if (Get.isRegistered<MainShellController>()) {
          Get.find<MainShellController>().markTabDirty(0);
        }
      },
    );
    ProgressBinding.registerDependencies();

    for (final binding in tabBindings) {
      binding.dependencies();
    }
  }
}
