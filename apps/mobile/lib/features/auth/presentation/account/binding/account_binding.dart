import 'package:get/get.dart';
import 'package:porhi/core/database/app_database.dart';
import 'package:porhi/core/storage/preferences_storage_service.dart';
import 'package:porhi/features/auth/domain/repositories/auth_repository.dart';
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
        authRepository: Get.find<AuthRepository>(),
        preferencesStorage: Get.find<PreferencesStorageService>(),
        database: Get.find<AppDatabase>(),
      ),
    );
  }
}
