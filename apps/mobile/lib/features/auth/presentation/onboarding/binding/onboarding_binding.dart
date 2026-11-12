import 'package:get/get.dart';
import 'package:porhi/features/auth/domain/usecases/auth_usecases.dart';
import 'package:porhi/features/auth/presentation/onboarding/controller/onboarding_controller.dart';

class OnboardingBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<OnboardingController>(
      () => OnboardingController(
        updateProfileUseCase: Get.find<UpdateProfileUseCase>(),
        getCachedUserUseCase: Get.find<GetCachedUserUseCase>(),
        getLanguageUseCase: Get.find<GetLanguageUseCase>(),
        setLanguageUseCase: Get.find<SetLanguageUseCase>(),
      ),
    );
  }
}
