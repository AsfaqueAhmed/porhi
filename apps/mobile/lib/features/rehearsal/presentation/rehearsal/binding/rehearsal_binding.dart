import 'package:get/get.dart';
import 'package:porhi/app/env.dart';
import 'package:porhi/features/auth/domain/usecases/auth_usecases.dart';
import 'package:porhi/features/curriculum/domain/usecases/curriculum_usecases.dart';
import 'package:porhi/features/rehearsal/domain/usecases/rehearsal_usecases.dart';
import 'package:porhi/features/rehearsal/presentation/rehearsal/controller/rehearsal_controller.dart';

/// Registers [RehearsalController] without `fenix: true` so popped rehearsal
/// routes dispose cleanly and cancel active timers.
class RehearsalBinding extends Bindings {
  @override
  void dependencies() {
    if (!Get.isRegistered<RehearsalController>()) {
      Get.lazyPut<RehearsalController>(
        () => RehearsalController(
          startRehearsalUseCase: Get.find<StartRehearsalUseCase>(),
          getRehearsalHistoryUseCase: Get.find<GetRehearsalHistoryUseCase>(),
          getRehearsalUseCase: Get.find<GetRehearsalUseCase>(),
          startRehearsalPaperUseCase: Get.find<StartRehearsalPaperUseCase>(),
          submitRehearsalPaperUseCase: Get.find<SubmitRehearsalPaperUseCase>(),
          getSubjectsUseCase: Get.find<GetSubjectsUseCase>(),
          getCachedSubjectsUseCase: Get.find<GetCachedSubjectsUseCase>(),
          getLanguageUseCase: Get.find<GetLanguageUseCase>(),
          envConfig: Get.isRegistered<EnvConfig>() ? Get.find<EnvConfig>() : null,
        ),
      );
    }
  }
}
