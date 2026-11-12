import 'dart:async';

typedef RefreshSessionCallback = Future<String?> Function();
typedef RefreshSessionResultCallback =
    Future<({String? token, bool isTerminalFailure})> Function();
typedef SessionExpiredCallback = Future<void> Function();

/// Bridges `packages/network`'s [TokenRefreshInterceptor] callbacks to the app's
/// auth session lifecycle without leaking `firebase_auth` into `packages/network`.
class AuthSessionCoordinator {
  final RefreshSessionCallback? _onRefreshSession;
  final RefreshSessionResultCallback? _onRefreshSessionResult;
  final SessionExpiredCallback _onSessionExpired;
  Future<void>? _pendingExpiration;
  bool _lastFailureWasTerminal = false;

  AuthSessionCoordinator({
    RefreshSessionCallback? onRefreshSession,
    RefreshSessionResultCallback? onRefreshSessionResult,
    required this._onSessionExpired,
  })  : assert(
          onRefreshSession != null || onRefreshSessionResult != null,
          'Provide either onRefreshSession or onRefreshSessionResult',
        ),
        _onRefreshSession = onRefreshSession,
        _onRefreshSessionResult = onRefreshSessionResult;

  /// Requests a refreshed backend JWT access token, returning `null` on failure.
  ///
  /// When the failure is terminal (e.g., invalid/revoked Firebase user or
  /// HTTP 401/403 from `/auth/firebase`), session cleanup is awaited immediately
  /// before returning `null` so no stale JWT remains in storage. Transient
  /// failures (offline / 5xx) leave the local session intact.
  Future<String?> refreshToken() async {
    _lastFailureWasTerminal = false;
    try {
      final onResult = _onRefreshSessionResult;
      if (onResult != null) {
        final outcome = await onResult();
        final token = outcome.token;
        if (token != null && token.trim().isNotEmpty) {
          return token;
        }
        if (outcome.isTerminalFailure) {
          _lastFailureWasTerminal = true;
          await handleRefreshFailure();
        }
        return null;
      }

      final token = await _onRefreshSession!();
      if (token == null || token.trim().isEmpty) {
        _lastFailureWasTerminal = true;
        return null;
      }
      return token;
    } catch (_) {
      return null;
    }
  }

  /// Invoked by [TokenRefreshInterceptor.onRefreshFailed]; awaits session
  /// expiration cleanup only if the preceding refresh failure was terminal.
  Future<void> handleRefreshFailureIfTerminal() {
    if (!_lastFailureWasTerminal) {
      return Future<void>.value();
    }
    return handleRefreshFailure();
  }

  /// Handles terminal refresh failure (signs out locally and redirects to login),
  /// coalescing concurrent expirations into a single invocation.
  Future<void> handleRefreshFailure() {
    final existing = _pendingExpiration;
    if (existing != null) {
      return existing;
    }
    final future = _onSessionExpired().whenComplete(() {
      _pendingExpiration = null;
    });
    _pendingExpiration = future;
    return future;
  }
}
