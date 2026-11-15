import 'package:common/common.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  test('Common.isInitiated returns false before Common.init is called', () {
    Common.loggerEnabled = false;
    expect(Common.isInitiated(), isFalse);
  });

  testWidgets(
    'CustomToast.success & error render themed card without delete icon and dismiss cleanly',
    (tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Builder(
            builder: (context) => Scaffold(
              body: Column(
                children: <Widget>[
                  ElevatedButton(
                    onPressed: () => CustomToast.success(
                      'Saved successfully',
                      title: 'Done',
                      context: context,
                    ),
                    child: const Text('Show Success'),
                  ),
                  ElevatedButton(
                    onPressed: () => CustomToast.error(
                      'Network error',
                      context: context,
                    ),
                    child: const Text('Show Error'),
                  ),
                ],
              ),
            ),
          ),
        ),
      );

      await tester.tap(find.text('Show Success'));
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 300));

      expect(find.text('Done'), findsOneWidget);
      expect(find.text('Saved successfully'), findsOneWidget);
      expect(find.byIcon(Icons.check_circle_rounded), findsOneWidget);
      expect(find.byIcon(Icons.delete_outline), findsNothing);

      // Tap close button on the toast card.
      await tester.tap(find.byIcon(Icons.close_rounded));
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 300));
      expect(find.text('Saved successfully'), findsNothing);

      await tester.tap(find.text('Show Error'));
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 300));
      expect(find.text('Network error'), findsOneWidget);
      expect(find.byIcon(Icons.error_outline_rounded), findsOneWidget);

      CustomToast.dismissAll();
      await tester.pump();
    },
  );

  testWidgets(
    'ConfirmationDialog.show renders icon, contentWidget, 3-button layout, and returns result',
    (tester) async {
      String? result;

      await tester.pumpWidget(
        MaterialApp(
          home: Builder(
            builder: (context) => Scaffold(
              body: ElevatedButton(
                onPressed: () async {
                  result = await ConfirmationDialog.show<String>(
                    context: context,
                    title: 'Exit Exam',
                    message: 'Pick an option below.',
                    icon: Icons.exit_to_app_rounded,
                    contentWidget: const Text('Answered: 1 / 2'),
                    leftButtonTitle: 'Cancel',
                    leftButtonResult: 'cancel',
                    middleButtonTitle: 'Discard',
                    middleButtonResult: 'discard',
                    rightButtonTitle: 'Save & Exit',
                    rightButtonResult: 'save',
                  );
                },
                child: const Text('Open Dialog'),
              ),
            ),
          ),
        ),
      );

      await tester.tap(find.text('Open Dialog'));
      await tester.pumpAndSettle();

      expect(find.text('Exit Exam'), findsOneWidget);
      expect(find.text('Pick an option below.'), findsOneWidget);
      expect(find.text('Answered: 1 / 2'), findsOneWidget);
      expect(find.byIcon(Icons.exit_to_app_rounded), findsOneWidget);
      expect(find.byType(ConfirmationDialog), findsOneWidget);

      await tester.tap(find.text('Discard'));
      await tester.pumpAndSettle();

      expect(result, 'discard');
      expect(find.byType(ConfirmationDialog), findsNothing);
    },
  );
}
