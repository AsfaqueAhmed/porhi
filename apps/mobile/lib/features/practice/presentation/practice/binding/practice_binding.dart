import 'package:get/get.dart';
import 'package:porhi/app/env.dart';
import 'package:porhi/features/auth/domain/usecases/auth_usecases.dart';
import 'package:porhi/features/curriculum/domain/usecases/curriculum_usecases.dart';
import 'package:porhi/features/dashboard/domain/usecases/student_usecases.dart';
import 'package:porhi/features/practice/domain/usecases/practice_usecases.dart';
import 'package:porhi/features/practice/presentation/practice/controller/practice_controller.dart';

/// Registers [PracticeController] without `fenix: true` so popped
/// `/practice/:chapterId` routes dispose cleanly.
class PracticeBinding extends Bindings {
  @override
  void dependencies() {
    if (!Get.isRegistered<PracticeController>()) {
      Get.lazyPut<PracticeController>(
        () => PracticeController(
          getChapterPracticeQuestionsUseCase:
              Get.find<GetChapterPracticeQuestionsUseCase>(),
          getCachedChapterPracticeQuestionsUseCase:
              Get.find<GetCachedChapterPracticeQuestionsUseCase>(),
          submitPracticeAnswerUseCase: Get.find<SubmitPracticeAnswerUseCase>(),
          submitCqSelfAssessUseCase: Get.find<SubmitCqSelfAssessUseCase>(),
          toggleBookmarkUseCase: Get.find<ToggleBookmarkUseCase>(),
          patchCachedBookmarkUseCase: Get.find<PatchCachedBookmarkUseCase>(),
          getCachedOverviewUseCase: Get.find<GetCachedOverviewUseCase>(),
          getCachedChaptersUseCase: Get.find<GetCachedChaptersUseCase>(),
          getCachedUserUseCase: Get.find<GetCachedUserUseCase>(),
          getLanguageUseCase: Get.find<GetLanguageUseCase>(),
          getActiveSubjectIdUseCase: Get.find<GetActiveSubjectIdUseCase>(),
          envConfig: Get.isRegistered<EnvConfig>() ? Get.find<EnvConfig>() : null,
        ),
      );
    }
  }
}
