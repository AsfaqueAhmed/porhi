import 'package:get/get.dart';
import 'package:porhi/features/auth/domain/usecases/auth_usecases.dart';
import 'package:porhi/features/auth/presentation/account/controller/account_controller.dart';

class AccountBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<AccountController>(
      () => AccountController(
        getMeUseCase: Get.find<GetMeUseCase>(),
        updateProfileUseCase: Get.find<UpdateProfileUseCase>(),
        signOutUseCase: Get.find<SignOutUseCase>(),
        getCachedUserUseCase: Get.find<GetCachedUserUseCase>(),
        getLanguageUseCase: Get.find<GetLanguageUseCase>(),
        setLanguageUseCase: Get.find<SetLanguageUseCase>(),
        clearOfflineDataUseCase: Get.find<ClearOfflineDataUseCase>(),
      ),
    );
  }
}
