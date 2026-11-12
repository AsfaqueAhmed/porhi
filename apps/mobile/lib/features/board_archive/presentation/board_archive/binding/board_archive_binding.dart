import 'package:get/get.dart';
import 'package:porhi/app/env.dart';
import 'package:porhi/features/auth/domain/usecases/auth_usecases.dart';
import 'package:porhi/features/board_archive/domain/usecases/board_archive_usecases.dart';
import 'package:porhi/features/board_archive/presentation/board_archive/controller/board_archive_controller.dart';
import 'package:porhi/features/dashboard/domain/usecases/student_usecases.dart';
import 'package:porhi/features/practice/domain/usecases/practice_usecases.dart';

/// Registers [BoardArchiveController] without `fenix: true` so popped
/// `/board-archive` routes dispose cleanly.
class BoardArchiveBinding extends Bindings {
  @override
  void dependencies() {
    if (!Get.isRegistered<BoardArchiveController>()) {
      Get.lazyPut<BoardArchiveController>(
        () => BoardArchiveController(
          getFiltersUseCase: Get.find<GetBoardArchiveFiltersUseCase>(),
          getQuestionsUseCase: Get.find<GetBoardArchiveQuestionsUseCase>(),
          submitCqSelfAssessUseCase: Get.find<SubmitCqSelfAssessUseCase>(),
          toggleBookmarkUseCase: Get.find<ToggleBookmarkUseCase>(),
          getLanguageUseCase: Get.find<GetLanguageUseCase>(),
          envConfig: Get.isRegistered<EnvConfig>() ? Get.find<EnvConfig>() : null,
        ),
      );
    }
  }
}
