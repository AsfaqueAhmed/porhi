import 'package:get/get.dart';
import 'package:porhi/features/auth/domain/usecases/auth_usecases.dart';
import 'package:porhi/features/curriculum/presentation/subjects/binding/subjects_binding.dart';
import 'package:porhi/features/curriculum/presentation/subjects/controller/subjects_controller.dart';
import 'package:porhi/features/dashboard/domain/usecases/student_usecases.dart';
import 'package:porhi/features/dashboard/presentation/dashboard/binding/dashboard_binding.dart';
import 'package:porhi/features/dashboard/presentation/dashboard/controller/dashboard_controller.dart';
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
          return shell;
        },
      );
    }

    DashboardBinding.registerDependencies();
    SubjectsBinding.registerDependencies(
      onActiveSubjectChanged: () {
        if (Get.isRegistered<MainShellController>()) {
          Get.find<MainShellController>()
              .markTabDirty(0, refreshIfRegistered: true);
        }
      },
    );

    for (final binding in tabBindings) {
      binding.dependencies();
    }
  }
}
