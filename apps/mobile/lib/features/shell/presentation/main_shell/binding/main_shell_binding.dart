import 'package:get/get.dart';
import 'package:porhi/features/auth/domain/usecases/auth_usecases.dart';
import 'package:porhi/features/dashboard/domain/usecases/student_usecases.dart';
import 'package:porhi/features/dashboard/presentation/dashboard/binding/dashboard_binding.dart';
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
        () => MainShellController(
          getLanguageUseCase: Get.find<GetLanguageUseCase>(),
          getCachedUserUseCase: Get.find<GetCachedUserUseCase>(),
          getPendingSyncCountUseCase: Get.find<GetPendingSyncCountUseCase>(),
          watchPendingSyncCountUseCase:
              Get.find<WatchPendingSyncCountUseCase>(),
        ),
      );
    }

    DashboardBinding.registerDependencies();

    for (final binding in tabBindings) {
      binding.dependencies();
    }
  }
}
