import 'package:get/get.dart';
import 'package:porhi/app/env.dart';
import 'package:porhi/features/auth/domain/usecases/auth_usecases.dart';
import 'package:porhi/features/exam/domain/usecases/exam_usecases.dart';
import 'package:porhi/features/exam/presentation/exam_runner/controller/exam_runner_controller.dart';

/// Registers [ExamRunnerController] without `fenix: true` so popped runner
/// routes dispose cleanly and cancel active timers.
class ExamRunnerBinding extends Bindings {
  @override
  void dependencies() {
    if (!Get.isRegistered<ExamRunnerController>()) {
      Get.lazyPut<ExamRunnerController>(
        () => ExamRunnerController(
          heartbeatExamUseCase: Get.find<HeartbeatExamUseCase>(),
          submitExamUseCase: Get.find<SubmitExamUseCase>(),
          saveExamDraftUseCase: Get.find<SaveExamDraftUseCase>(),
          deleteExamDraftUseCase: Get.find<DeleteExamDraftUseCase>(),
          getLanguageUseCase: Get.find<GetLanguageUseCase>(),
          envConfig: Get.isRegistered<EnvConfig>() ? Get.find<EnvConfig>() : null,
        ),
      );
    }
  }
}
