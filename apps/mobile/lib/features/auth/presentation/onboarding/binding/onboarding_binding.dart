import 'package:get/get.dart';
import 'package:porhi/core/storage/preferences_storage_service.dart';
import 'package:porhi/features/auth/domain/repositories/auth_repository.dart';
import 'package:porhi/features/auth/domain/usecases/auth_usecases.dart';
import 'package:porhi/features/auth/presentation/onboarding/controller/onboarding_controller.dart';

class OnboardingBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<OnboardingController>(
      () => OnboardingController(
        updateProfileUseCase: Get.find<UpdateProfileUseCase>(),
        authRepository: Get.find<AuthRepository>(),
        preferencesStorage: Get.find<PreferencesStorageService>(),
      ),
    );
  }
}
