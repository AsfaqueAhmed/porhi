import 'package:common/common.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  group('Either', () {
    test('fold dispatches on the actual branch, not on the value type', () {
      const Either<String, String> left = Left('failure');
      const Either<String, String> right = Right('failure');

      expect(left.fold((l) => 'left:$l', (r) => 'right:$r'), 'left:failure');
      expect(right.fold((l) => 'left:$l', (r) => 'right:$r'), 'right:failure');
    });

    test('fold handles a null Left value correctly', () {
      const Either<String?, int> either = Left(null);
      expect(either.fold((l) => 'left:$l', (r) => 'right:$r'), 'left:null');
    });

    test(
        'fold dispatches correctly even when L and R overlap '
        '(regression: old impl used `data is L`, not branch identity)', () {
      // L=Object, R=String: every String also satisfies `is Object`, so the
      // old `data is L` check would misclassify this Right as a Left.
      const Either<Object, String> right = Right<Object, String>('hello');
      expect(right.fold((l) => 'left', (r) => 'right:$r'), 'right:hello');
    });

    test('isLeft / isRight reflect the actual branch', () {
      const Either<int, int> left = Left(1);
      const Either<int, int> right = Right(1);

      expect(left.isLeft(), isTrue);
      expect(left.isRight(), isFalse);
      expect(right.isLeft(), isFalse);
      expect(right.isRight(), isTrue);
    });

    test('getOrElse returns the Right value or falls back on Left', () {
      const Either<String, int> right = Right(42);
      const Either<String, int> left = Left('failure');

      expect(right.getOrElse(() => -1), 42);
      expect(left.getOrElse(() => -1), -1);
    });

    test('swap flips Left and Right', () {
      const Either<String, int> left = Left('failure');
      const Either<String, int> right = Right(42);

      final swappedLeft = left.swap();
      final swappedRight = right.swap();

      expect(swappedLeft.isRight(), isTrue);
      expect(swappedLeft.fold((l) => l, (r) => r), 'failure');
      expect(swappedRight.isLeft(), isTrue);
      expect(swappedRight.fold((l) => l, (r) => r), 42);
    });
  });
}
