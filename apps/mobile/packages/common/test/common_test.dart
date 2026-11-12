import 'package:common/common.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  test('Common.isInitiated returns false before Common.init is called', () {
    Common.loggerEnabled = false;
    expect(Common.isInitiated(), isFalse);
  });
}
