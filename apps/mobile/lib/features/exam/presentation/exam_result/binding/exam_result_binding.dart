import 'package:get/get.dart';
import 'package:porhi/app/env.dart';
import 'package:porhi/features/auth/domain/usecases/auth_usecases.dart';
import 'package:porhi/features/curriculum/domain/usecases/curriculum_usecases.dart';
import 'package:porhi/features/dashboard/domain/usecases/student_usecases.dart';
import 'package:porhi/features/exam/domain/usecases/exam_usecases.dart';
import 'package:porhi/features/exam/presentation/exam_result/controller/exam_result_controller.dart';

/// Registers [ExamResultController] without `fenix: true` so popped result
/// routes dispose cleanly.
class ExamResultBinding extends Bindings {
  @override
  void dependencies() {
    if (!Get.isRegistered<ExamResultController>()) {
      Get.lazyPut<ExamResultController>(
        () => ExamResultController(
          getExamSessionUseCase: Get.find<GetExamSessionUseCase>(),
          getCachedChaptersUseCase: Get.find<GetCachedChaptersUseCase>(),
          getCachedUserUseCase: Get.find<GetCachedUserUseCase>(),
          getActiveSubjectIdUseCase: Get.find<GetActiveSubjectIdUseCase>(),
          getLanguageUseCase: Get.find<GetLanguageUseCase>(),
          envConfig: Get.isRegistered<EnvConfig>() ? Get.find<EnvConfig>() : null,
        ),
      );
    }
  }
}
