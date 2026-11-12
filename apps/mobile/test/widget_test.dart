import 'package:flutter_test/flutter_test.dart';
import 'package:get/get.dart';
import 'package:porhi/main.dart';

void main() {
  tearDown(Get.reset);

  testWidgets('PorhiApp renders initial splash route with porhi branding', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(const PorhiApp());
    await tester.pumpAndSettle();

    expect(find.text('পড়ি'), findsOneWidget);
    expect(find.text('porhi'), findsOneWidget);
  });
}
