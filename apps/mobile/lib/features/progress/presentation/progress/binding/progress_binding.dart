import 'package:get/get.dart';
import 'package:porhi/app/env.dart';
import 'package:porhi/core/services/share_gateway.dart';
import 'package:porhi/features/auth/domain/usecases/auth_usecases.dart';
import 'package:porhi/features/content_report/domain/usecases/content_report_usecases.dart';
import 'package:porhi/features/dashboard/domain/usecases/student_usecases.dart';
import 'package:porhi/features/exam/domain/usecases/exam_usecases.dart';
import 'package:porhi/features/progress/presentation/progress/controller/progress_controller.dart';

/// Registers [ProgressController] without `fenix: true` so logout cleanly
/// disposes tab controllers.
class ProgressBinding extends Bindings {
  static void registerDependencies() {
    if (!Get.isRegistered<ProgressController>()) {
      Get.lazyPut<ProgressController>(
        () => ProgressController(
          getOverviewUseCase: Get.find<GetOverviewUseCase>(),
          getCachedOverviewUseCase: Get.find<GetCachedOverviewUseCase>(),
          getExamHistoryUseCase: Get.find<GetExamHistoryUseCase>(),
          listShareLinksUseCase: Get.find<ListShareLinksUseCase>(),
          createShareLinkUseCase: Get.find<CreateShareLinkUseCase>(),
          revokeShareLinkUseCase: Get.find<RevokeShareLinkUseCase>(),
          listMyContentReportsUseCase:
              Get.find<ListMyContentReportsUseCase>(),
          getLanguageUseCase: Get.find<GetLanguageUseCase>(),
          getCachedUserUseCase: Get.find<GetCachedUserUseCase>(),
          getActiveSubjectIdUseCase: Get.find<GetActiveSubjectIdUseCase>(),
          envConfig: Get.isRegistered<EnvConfig>()
              ? Get.find<EnvConfig>()
              : const EnvConfig(),
          shareGateway: Get.isRegistered<ShareGateway>()
              ? Get.find<ShareGateway>()
              : SharePlusGateway(),
        ),
      );
    }
  }

  @override
  void dependencies() {
    registerDependencies();
  }
}
