import 'dart:async';

typedef RefreshSessionCallback = Future<String?> Function();
typedef SessionExpiredCallback = Future<void> Function();

/// Bridges `packages/network`'s [TokenRefreshInterceptor] callbacks to the app's
/// auth session lifecycle without leaking `firebase_auth` into `packages/network`.
class AuthSessionCoordinator {
  final RefreshSessionCallback _onRefreshSession;
  final SessionExpiredCallback _onSessionExpired;
  Future<void>? _pendingExpiration;

  AuthSessionCoordinator({
    required this._onRefreshSession,
    required this._onSessionExpired,
  });

  /// Requests a refreshed backend JWT access token, returning `null` on failure.
  Future<String?> refreshToken() async {
    try {
      final token = await _onRefreshSession();
      if (token == null || token.trim().isEmpty) {
        return null;
      }
      return token;
    } catch (_) {
      return null;
    }
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
