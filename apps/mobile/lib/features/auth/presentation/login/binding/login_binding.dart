import 'package:get/get.dart';
import 'package:porhi/core/storage/preferences_storage_service.dart';
import 'package:porhi/features/auth/domain/usecases/auth_usecases.dart';
import 'package:porhi/features/auth/presentation/login/controller/login_controller.dart';

class LoginBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<LoginController>(
      () => LoginController(
        signInWithGoogleUseCase: Get.find<SignInWithGoogleUseCase>(),
        requestPhoneOtpUseCase: Get.find<RequestPhoneOtpUseCase>(),
        verifyPhoneOtpUseCase: Get.find<VerifyPhoneOtpUseCase>(),
        preferencesStorage: Get.find<PreferencesStorageService>(),
      ),
    );
  }
}
