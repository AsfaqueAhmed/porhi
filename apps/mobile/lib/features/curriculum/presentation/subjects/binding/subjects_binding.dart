import 'package:flutter/foundation.dart';
import 'package:get/get.dart';
import 'package:porhi/features/auth/domain/usecases/auth_usecases.dart';
import 'package:porhi/features/curriculum/domain/usecases/curriculum_usecases.dart';
import 'package:porhi/features/curriculum/presentation/subjects/controller/subjects_controller.dart';

/// Registers [SubjectsController] without `fenix: true` so logout cleanly
/// disposes tab and route controllers.
class SubjectsBinding extends Bindings {
  static void registerDependencies({VoidCallback? onActiveSubjectChanged}) {
    if (!Get.isRegistered<SubjectsController>()) {
      Get.lazyPut<SubjectsController>(
        () => SubjectsController(
          getSubjectsUseCase: Get.find<GetSubjectsUseCase>(),
          getCachedSubjectsUseCase: Get.find<GetCachedSubjectsUseCase>(),
          filterSubjectsUseCase: Get.find<FilterSubjectsUseCase>(),
          getDownloadedChaptersUseCase:
              Get.find<GetDownloadedChaptersUseCase>(),
          getActiveSubjectUseCase: Get.find<GetActiveCurriculumSubjectUseCase>(),
          setActiveSubjectUseCase: Get.find<SetActiveCurriculumSubjectUseCase>(),
          getCachedUserUseCase: Get.find<GetCachedUserUseCase>(),
          getLanguageUseCase: Get.find<GetLanguageUseCase>(),
          onActiveSubjectChanged: onActiveSubjectChanged,
        ),
      );
    }
  }

  @override
  void dependencies() {
    registerDependencies();
  }
}
