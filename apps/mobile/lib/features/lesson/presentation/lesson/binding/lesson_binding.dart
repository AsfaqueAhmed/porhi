import 'package:get/get.dart';
import 'package:porhi/features/auth/domain/usecases/auth_usecases.dart';
import 'package:porhi/features/curriculum/domain/usecases/curriculum_usecases.dart';
import 'package:porhi/features/dashboard/domain/usecases/student_usecases.dart';
import 'package:porhi/features/lesson/domain/usecases/lesson_usecases.dart';
import 'package:porhi/features/lesson/presentation/lesson/controller/lesson_controller.dart';

/// Registers [LessonController] without `fenix: true` so popped
/// `/lesson/:topicId` routes dispose cleanly.
class LessonBinding extends Bindings {
  @override
  void dependencies() {
    if (!Get.isRegistered<LessonController>()) {
      Get.lazyPut<LessonController>(
        () => LessonController(
          getLessonByTopicUseCase: Get.find<GetLessonByTopicUseCase>(),
          getCachedLessonByTopicUseCase:
              Get.find<GetCachedLessonByTopicUseCase>(),
          getTopicQuickQuestionsUseCase:
              Get.find<GetTopicQuickQuestionsUseCase>(),
          getCachedTopicQuickQuestionsUseCase:
              Get.find<GetCachedTopicQuickQuestionsUseCase>(),
          submitQuickCheckAttemptUseCase:
              Get.find<SubmitQuickCheckAttemptUseCase>(),
          completeLessonUseCase: Get.find<CompleteLessonUseCase>(),
          getLocalLessonNoteUseCase: Get.find<GetLocalLessonNoteUseCase>(),
          saveLocalLessonNoteUseCase: Get.find<SaveLocalLessonNoteUseCase>(),
          getLocalTopicStateOverlayUseCase:
              Get.isRegistered<GetLocalTopicStateOverlayUseCase>()
                  ? Get.find<GetLocalTopicStateOverlayUseCase>()
                  : null,
          toggleBookmarkUseCase: Get.find<ToggleBookmarkUseCase>(),
          patchCachedBookmarkUseCase: Get.find<PatchCachedBookmarkUseCase>(),
          saveNoteUseCase: Get.find<SaveNoteUseCase>(),
          submitFeedbackUseCase: Get.find<SubmitFeedbackUseCase>(),
          getCachedOverviewUseCase: Get.find<GetCachedOverviewUseCase>(),
          getChaptersUseCase: Get.find<GetChaptersUseCase>(),
          getCachedChaptersUseCase: Get.find<GetCachedChaptersUseCase>(),
          getOfflineChapterPackUseCase: Get.find<GetOfflineChapterPackUseCase>(),
          getCachedUserUseCase: Get.find<GetCachedUserUseCase>(),
          getLanguageUseCase: Get.find<GetLanguageUseCase>(),
          getActiveSubjectIdUseCase: Get.find<GetActiveSubjectIdUseCase>(),
        ),
      );
    }
  }
}
