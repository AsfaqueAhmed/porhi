import 'dart:async';

/// A value that is either a [Left] (conventionally: failure) or a
/// [Right] (conventionally: success).
///
/// Dispatch (`fold`, `isLeft`, `getOrElse`, `swap`) is based on which
/// concrete subclass an instance actually is, never on the runtime type
/// of the wrapped value — checking `data is L`/`data.runtimeType == R`
/// (the previous implementation) breaks silently whenever `L` and `R`
/// overlap, or the wrapped value is `null`.
sealed class Either<L, R> {
  const Either();

  /// The wrapped value. Prefer [fold] where possible — this exists for
  /// callers that were reading `.data` directly before this type was
  /// made sealed.
  dynamic get data => switch (this) {
        Left<L, R>(:final value) => value,
        Right<L, R>(:final value) => value,
      };

  bool isLeft() => this is Left<L, R>;
  bool isRight() => this is Right<L, R>;

  R getOrElse(R Function() callback) => switch (this) {
        Right<L, R>(:final value) => value,
        Left<L, R>() => callback(),
      };

  Either<R, L> swap() => switch (this) {
        Left<L, R>(:final value) => Right<R, L>(value),
        Right<L, R>(:final value) => Left<R, L>(value),
      };

  FutureOr<T> fold<T>(
    FutureOr<T> Function(L) onLeft,
    FutureOr<T> Function(R) onRight,
  ) =>
      switch (this) {
        Left<L, R>(:final value) => onLeft(value),
        Right<L, R>(:final value) => onRight(value),
      };
}

final class Left<L, R> extends Either<L, R> {
  final L value;
  const Left(this.value);
}

final class Right<L, R> extends Either<L, R> {
  final R value;
  const Right(this.value);
}
