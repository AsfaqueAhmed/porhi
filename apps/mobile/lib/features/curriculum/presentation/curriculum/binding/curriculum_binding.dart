import 'package:get/get.dart';
import 'package:porhi/features/auth/domain/usecases/auth_usecases.dart';
import 'package:porhi/features/curriculum/domain/usecases/curriculum_usecases.dart';
import 'package:porhi/features/curriculum/presentation/curriculum/controller/chapter_index_controller.dart';
import 'package:porhi/features/dashboard/domain/usecases/student_usecases.dart';
import 'package:porhi/features/lesson/domain/usecases/lesson_usecases.dart';

/// Registers [ChapterIndexController] without `fenix: true` so popped
/// `/curriculum/:subjectId` routes dispose cleanly.
class CurriculumBinding extends Bindings {
  @override
  void dependencies() {
    if (!Get.isRegistered<ChapterIndexController>()) {
      Get.lazyPut<ChapterIndexController>(
        () => ChapterIndexController(
          getChaptersUseCase: Get.find<GetChaptersUseCase>(),
          getCachedChaptersUseCase: Get.find<GetCachedChaptersUseCase>(),
          filterChaptersUseCase: Get.find<FilterChaptersUseCase>(),
          downloadChapterPackUseCase: Get.find<DownloadChapterPackUseCase>(),
          removeChapterPackUseCase: Get.find<RemoveChapterPackUseCase>(),
          getDownloadedChaptersUseCase:
              Get.find<GetDownloadedChaptersUseCase>(),
          getOfflineChapterPackUseCase:
              Get.find<GetOfflineChapterPackUseCase>(),
          getActiveSubjectUseCase: Get.find<GetActiveCurriculumSubjectUseCase>(),
          getCachedOverviewUseCase: Get.find<GetCachedOverviewUseCase>(),
          getLocalTopicStateOverlayUseCase:
              Get.isRegistered<GetLocalTopicStateOverlayUseCase>()
                  ? Get.find<GetLocalTopicStateOverlayUseCase>()
                  : null,
          toggleBookmarkUseCase: Get.find<ToggleBookmarkUseCase>(),
          patchCachedBookmarkUseCase: Get.find<PatchCachedBookmarkUseCase>(),
          getCachedUserUseCase: Get.find<GetCachedUserUseCase>(),
          getLanguageUseCase: Get.find<GetLanguageUseCase>(),
        ),
      );
    }
  }
}
