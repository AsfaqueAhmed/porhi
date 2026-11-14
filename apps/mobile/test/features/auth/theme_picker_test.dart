import 'package:common/common.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:get/get.dart';
import 'package:mocktail/mocktail.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/core/theme/app_theme_controller.dart';
import 'package:porhi/core/theme/porhi_theme.dart';
import 'package:porhi/features/auth/domain/entities/auth_user_entity.dart';
import 'package:porhi/features/auth/domain/repositories/auth_repository.dart';
import 'package:porhi/features/auth/domain/usecases/auth_usecases.dart';
import 'package:porhi/features/auth/presentation/account/controller/account_controller.dart';
import 'package:porhi/features/auth/presentation/account/view/account_view.dart';
import 'package:porhi/routes/app_routes.dart';
import 'package:shared_preferences/shared_preferences.dart';

class MockAuthRepository extends Mock implements AuthRepository {}

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  late MockAuthRepository mockRepository;
  late AppThemeController themeController;

  setUp(() {
    Get.reset();
    SharedPreferences.setMockInitialValues({});
    mockRepository = MockAuthRepository();
    themeController = Get.put<AppThemeController>(
      AppThemeController(),
      permanent: true,
    );

    const user = AuthUserEntity(
      id: 'user-1',
      fullName: 'Student User',
      phoneNumber: '+8801700000000',
      role: 'STUDENT',
      selectedClass: StudentTrack.ssc,
    );

    when(() => mockRepository.getCachedUser()).thenReturn(user);
    when(() => mockRepository.getMe()).thenAnswer((_) async => const Right(user));
  });

  tearDown(() {
    Get.reset();
  });

  AccountController makeController(AppLanguage lang) {
    when(() => mockRepository.getLanguage()).thenReturn(
      lang == AppLanguage.bn ? 'bn' : 'en',
    );
    return AccountController(
      getMeUseCase: GetMeUseCase(mockRepository),
      updateProfileUseCase: UpdateProfileUseCase(mockRepository),
      signOutUseCase: SignOutUseCase(mockRepository),
      getCachedUserUseCase: GetCachedUserUseCase(mockRepository),
      getLanguageUseCase: GetLanguageUseCase(mockRepository),
      setLanguageUseCase: SetLanguageUseCase(mockRepository),
      clearOfflineDataUseCase: ClearOfflineDataUseCase(mockRepository),
    );
  }

  testWidgets(
    'theme picker bottom sheet displays all 8 themes with Bengali labels and selects Blue',
    (tester) async {
      final accountController = makeController(AppLanguage.bn);
      Get.put<AccountController>(accountController);

      await tester.pumpWidget(
        GetMaterialApp(
          theme: PorhiTheme.light,
          initialRoute: AppRoutes.account,
          getPages: <GetPage<dynamic>>[
            GetPage<dynamic>(
              name: AppRoutes.account,
              page: () => const AccountView(),
            ),
          ],
        ),
      );
      await tester.pumpAndSettle();

      // Scroll until theme picker tile is visible
      final themeTile = find.byIcon(Icons.palette_outlined);
      await tester.scrollUntilVisible(
        themeTile,
        100,
        scrollable: find.byType(Scrollable).first,
      );
      await tester.pumpAndSettle();
      expect(themeTile, findsOneWidget);

      await tester.tap(themeTile);
      await tester.pumpAndSettle();

      final sheetFinder = find.byType(BottomSheet);
      expect(sheetFinder, findsOneWidget);

      // Check Bengali labels inside the bottom sheet
      expect(
        find.descendant(of: sheetFinder, matching: find.text('চিরসবুজ')),
        findsOneWidget,
      );
      expect(
        find.descendant(of: sheetFinder, matching: find.text('ইন্ডিগো')),
        findsOneWidget,
      );
      expect(
        find.descendant(of: sheetFinder, matching: find.text('নীল')),
        findsOneWidget,
      );
      expect(
        find.descendant(of: sheetFinder, matching: find.text('টিল')),
        findsOneWidget,
      );
      expect(
        find.descendant(of: sheetFinder, matching: find.text('কমলা')),
        findsOneWidget,
      );
      expect(
        find.descendant(of: sheetFinder, matching: find.text('লাল')),
        findsOneWidget,
      );

      // Scroll sheet to see remaining options
      final sheetScrollable = find.descendant(
        of: sheetFinder,
        matching: find.byType(Scrollable),
      );
      final goldenOption = find.byKey(const Key('color_theme_golden'));
      await tester.scrollUntilVisible(
        goldenOption,
        100,
        scrollable: sheetScrollable,
      );
      await tester.pumpAndSettle();

      expect(
        find.descendant(of: sheetFinder, matching: find.text('সোনালী')),
        findsOneWidget,
      );
      expect(
        find.descendant(of: sheetFinder, matching: find.text('সাদা-কালো')),
        findsOneWidget,
      );

      // Select 'blue'
      final blueOption = find.byKey(const Key('color_theme_blue'));
      await tester.scrollUntilVisible(
        blueOption,
        -100,
        scrollable: sheetScrollable,
      );
      await tester.pumpAndSettle();
      await tester.tap(blueOption);
      await tester.pumpAndSettle();

      // Modal is dismissed, theme updated to blue
      expect(themeController.selected.value, PorhiColorTheme.blue);
      expect(find.text('নীল'), findsOneWidget);
    },
  );

  testWidgets(
    'theme picker displays English labels when app language is EN and selects Golden',
    (tester) async {
      final accountController = makeController(AppLanguage.en);
      accountController.language.value = AppLanguage.en;
      Get.put<AccountController>(accountController);

      await tester.pumpWidget(
        GetMaterialApp(
          theme: PorhiTheme.light,
          initialRoute: AppRoutes.account,
          getPages: <GetPage<dynamic>>[
            GetPage<dynamic>(
              name: AppRoutes.account,
              page: () => const AccountView(),
            ),
          ],
        ),
      );
      await tester.pumpAndSettle();

      final themeTile = find.byIcon(Icons.palette_outlined);
      await tester.scrollUntilVisible(
        themeTile,
        100,
        scrollable: find.byType(Scrollable).first,
      );
      await tester.pumpAndSettle();

      await tester.tap(themeTile);
      await tester.pumpAndSettle();

      final sheetFinder = find.byType(BottomSheet);
      expect(sheetFinder, findsOneWidget);

      // Check English labels
      expect(
        find.descendant(of: sheetFinder, matching: find.text('Evergreen')),
        findsOneWidget,
      );
      expect(
        find.descendant(of: sheetFinder, matching: find.text('Indigo')),
        findsOneWidget,
      );
      expect(
        find.descendant(of: sheetFinder, matching: find.text('Blue')),
        findsOneWidget,
      );
      expect(
        find.descendant(of: sheetFinder, matching: find.text('Teal')),
        findsOneWidget,
      );
      expect(
        find.descendant(of: sheetFinder, matching: find.text('Orange')),
        findsOneWidget,
      );
      expect(
        find.descendant(of: sheetFinder, matching: find.text('Red')),
        findsOneWidget,
      );

      final sheetScrollable = find.descendant(
        of: sheetFinder,
        matching: find.byType(Scrollable),
      );
      final goldenOption = find.byKey(const Key('color_theme_golden'));
      await tester.scrollUntilVisible(
        goldenOption,
        100,
        scrollable: sheetScrollable,
      );
      await tester.pumpAndSettle();

      expect(
        find.descendant(of: sheetFinder, matching: find.text('Golden')),
        findsOneWidget,
      );
      expect(
        find.descendant(of: sheetFinder, matching: find.text('Black & white')),
        findsOneWidget,
      );

      // Select 'golden'
      await tester.tap(goldenOption);
      await tester.pumpAndSettle();

      expect(themeController.selected.value, PorhiColorTheme.golden);
      expect(find.text('Golden'), findsOneWidget);
    },
  );
}
