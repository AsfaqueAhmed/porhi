import 'package:get/get.dart';
import 'package:porhi/features/auth/domain/usecases/auth_usecases.dart';
import 'package:porhi/features/curriculum/domain/usecases/curriculum_usecases.dart';
import 'package:porhi/features/dashboard/domain/usecases/student_usecases.dart';
import 'package:porhi/features/exam/domain/usecases/exam_usecases.dart';
import 'package:porhi/features/exam/presentation/exam_setup/controller/exam_setup_controller.dart';

/// Registers [ExamSetupController] without `fenix: true` so popped setup routes
/// dispose cleanly.
class ExamSetupBinding extends Bindings {
  @override
  void dependencies() {
    if (!Get.isRegistered<ExamSetupController>()) {
      Get.lazyPut<ExamSetupController>(
        () => ExamSetupController(
          startExamUseCase: Get.find<StartExamUseCase>(),
          getLatestExamDraftUseCase: Get.find<GetLatestExamDraftUseCase>(),
          deleteExamDraftUseCase: Get.find<DeleteExamDraftUseCase>(),
          resumeExamSessionUseCase: Get.find<ResumeExamSessionUseCase>(),
          getCachedChaptersUseCase: Get.find<GetCachedChaptersUseCase>(),
          getCachedSubjectsUseCase: Get.find<GetCachedSubjectsUseCase>(),
          getCachedUserUseCase: Get.find<GetCachedUserUseCase>(),
          getActiveSubjectIdUseCase: Get.find<GetActiveSubjectIdUseCase>(),
          getLanguageUseCase: Get.find<GetLanguageUseCase>(),
        ),
      );
    }
  }
}
