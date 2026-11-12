import 'dart:async';

import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/services.dart';
import 'package:google_sign_in/google_sign_in.dart';

class FirebaseAuthGatewayException implements Exception {
  final String message;
  final String? code;

  const FirebaseAuthGatewayException(this.message, {this.code});

  @override
  String toString() => message;
}

sealed class FirebasePhoneOtpResult {
  const FirebasePhoneOtpResult();
}

final class FirebasePhoneOtpCodeSent extends FirebasePhoneOtpResult {
  final String verificationId;
  final int? resendToken;

  const FirebasePhoneOtpCodeSent({
    required this.verificationId,
    this.resendToken,
  });
}

final class FirebasePhoneOtpAutoVerified extends FirebasePhoneOtpResult {
  final String idToken;

  const FirebasePhoneOtpAutoVerified({required this.idToken});
}

/// Injectable wrapper around `firebase_auth` and `google_sign_in` so tests
/// and unconfigured local builds run safely without live Firebase channels.
abstract class FirebaseAuthGateway {
  Future<String> signInWithGoogleAndGetIdToken();

  Future<FirebasePhoneOtpResult> verifyPhoneNumber({
    required String phoneNumber,
    int? forceResendingToken,
  });

  Future<String> confirmPhoneOtpAndGetIdToken({
    required String verificationId,
    required String smsCode,
  });

  Future<String?> getCurrentIdToken({bool forceRefresh = false});

  Future<void> signOut();
}

class FirebaseAuthGatewayImpl implements FirebaseAuthGateway {
  final FirebaseAuth? _firebaseAuthOverride;
  final GoogleSignIn? _googleSignInOverride;

  FirebaseAuthGatewayImpl({
    FirebaseAuth? firebaseAuth,
    GoogleSignIn? googleSignIn,
  })  : _firebaseAuthOverride = firebaseAuth,
        _googleSignInOverride = googleSignIn;

  /// Attempts to initialize Firebase safely; returns `false` when native config
  /// (`google-services.json` / `GoogleService-Info.plist`) is absent.
  static Future<bool> safeInitializeFirebase() async {
    try {
      if (Firebase.apps.isNotEmpty) {
        return true;
      }
      await Firebase.initializeApp();
      return Firebase.apps.isNotEmpty;
    } catch (_) {
      return false;
    }
  }

  FirebaseAuth _requireFirebaseAuth() {
    final override = _firebaseAuthOverride;
    if (override != null) return override;
    if (Firebase.apps.isEmpty) {
      throw const FirebaseAuthGatewayException(
        'Firebase is not configured in this build.',
        code: 'firebase-not-configured',
      );
    }
    return FirebaseAuth.instance;
  }

  GoogleSignIn _resolveGoogleSignIn() {
    return _googleSignInOverride ??
        GoogleSignIn(scopes: const <String>['email', 'profile']);
  }

  @override
  Future<String> signInWithGoogleAndGetIdToken() async {
    try {
      final auth = _requireFirebaseAuth();
      final googleSignIn = _resolveGoogleSignIn();

      final account = await googleSignIn.signIn();
      if (account == null) {
        throw const FirebaseAuthGatewayException(
          'Google sign-in was cancelled.',
          code: 'cancelled',
        );
      }

      final googleAuth = await account.authentication;
      final credential = GoogleAuthProvider.credential(
        accessToken: googleAuth.accessToken,
        idToken: googleAuth.idToken,
      );

      final userCredential = await auth.signInWithCredential(credential);
      final idToken = await userCredential.user?.getIdToken();
      if (idToken == null || idToken.isEmpty) {
        throw const FirebaseAuthGatewayException(
          'Unable to obtain Firebase ID token.',
          code: 'missing-id-token',
        );
      }
      return idToken;
    } on FirebaseAuthGatewayException {
      rethrow;
    } on FirebaseAuthException catch (e) {
      throw _mapFirebaseAuthException(e);
    } on PlatformException catch (e) {
      throw _mapPlatformException(e);
    }
  }

  @override
  Future<FirebasePhoneOtpResult> verifyPhoneNumber({
    required String phoneNumber,
    int? forceResendingToken,
  }) async {
    final auth = _requireFirebaseAuth();
    final completer = Completer<FirebasePhoneOtpResult>();

    try {
      await auth.verifyPhoneNumber(
        phoneNumber: phoneNumber,
        forceResendingToken: forceResendingToken,
        timeout: const Duration(seconds: 60),
        verificationCompleted: (PhoneAuthCredential credential) async {
          try {
            final userCredential = await auth.signInWithCredential(credential);
            final idToken = await userCredential.user?.getIdToken();
            if (!completer.isCompleted) {
              if (idToken != null && idToken.isNotEmpty) {
                completer.complete(
                  FirebasePhoneOtpAutoVerified(idToken: idToken),
                );
              } else {
                completer.completeError(
                  const FirebaseAuthGatewayException(
                    'Unable to obtain Firebase ID token.',
                    code: 'missing-id-token',
                  ),
                );
              }
            }
          } on FirebaseAuthException catch (e) {
            if (!completer.isCompleted) {
              completer.completeError(_mapFirebaseAuthException(e));
            }
          } on PlatformException catch (e) {
            if (!completer.isCompleted) {
              completer.completeError(_mapPlatformException(e));
            }
          } catch (error) {
            if (!completer.isCompleted) {
              completer.completeError(
                FirebaseAuthGatewayException(error.toString()),
              );
            }
          }
        },
        verificationFailed: (FirebaseAuthException exception) {
          if (!completer.isCompleted) {
            completer.completeError(_mapFirebaseAuthException(exception));
          }
        },
        codeSent: (String verificationId, int? resendToken) {
          if (!completer.isCompleted) {
            completer.complete(
              FirebasePhoneOtpCodeSent(
                verificationId: verificationId,
                resendToken: resendToken,
              ),
            );
          }
        },
        codeAutoRetrievalTimeout: (String verificationId) {
          if (!completer.isCompleted && verificationId.isNotEmpty) {
            completer.complete(
              FirebasePhoneOtpCodeSent(verificationId: verificationId),
            );
          }
        },
      );
    } on FirebaseAuthException catch (e) {
      if (!completer.isCompleted) {
        completer.completeError(_mapFirebaseAuthException(e));
      }
    } on PlatformException catch (e) {
      if (!completer.isCompleted) {
        completer.completeError(_mapPlatformException(e));
      }
    }

    return completer.future;
  }

  @override
  Future<String> confirmPhoneOtpAndGetIdToken({
    required String verificationId,
    required String smsCode,
  }) async {
    try {
      final auth = _requireFirebaseAuth();
      final credential = PhoneAuthProvider.credential(
        verificationId: verificationId,
        smsCode: smsCode,
      );
      final userCredential = await auth.signInWithCredential(credential);
      final idToken = await userCredential.user?.getIdToken();
      if (idToken == null || idToken.isEmpty) {
        throw const FirebaseAuthGatewayException(
          'Unable to obtain Firebase ID token.',
          code: 'missing-id-token',
        );
      }
      return idToken;
    } on FirebaseAuthGatewayException {
      rethrow;
    } on FirebaseAuthException catch (e) {
      throw _mapFirebaseAuthException(e);
    } on PlatformException catch (e) {
      throw _mapPlatformException(e);
    }
  }

  @override
  Future<String?> getCurrentIdToken({bool forceRefresh = false}) async {
    if (_firebaseAuthOverride == null && Firebase.apps.isEmpty) {
      return null;
    }
    try {
      final user = _requireFirebaseAuth().currentUser;
      if (user == null) return null;
      return await user.getIdToken(forceRefresh);
    } on FirebaseAuthException catch (e) {
      throw _mapFirebaseAuthException(e);
    } on PlatformException catch (e) {
      throw _mapPlatformException(e);
    }
  }

  static FirebaseAuthGatewayException _mapFirebaseAuthException(
    FirebaseAuthException e,
  ) {
    final code = e.code;
    final message = switch (code) {
      'network-request-failed' =>
        'Network error. Please check your internet connection.',
      'invalid-verification-code' =>
        'Invalid OTP code. Please check and try again.',
      'session-expired' || 'code-expired' =>
        'OTP expired. Please request a new code.',
      'invalid-phone-number' => 'Invalid phone number format.',
      'too-many-requests' =>
        'Too many attempts. Please wait a moment and try again.',
      'user-disabled' => 'This account has been disabled.',
      'user-token-expired' || 'invalid-user-token' =>
        'Your session has expired. Please log in again.',
      _ => _sanitizeMessage(
          e.message,
          fallback: 'Authentication failed. Please try again.',
        ),
    };
    return FirebaseAuthGatewayException(message, code: code);
  }

  static FirebaseAuthGatewayException _mapPlatformException(
    PlatformException e,
  ) {
    final code = e.code;
    final normalized = code.toLowerCase();
    if (normalized.contains('cancel')) {
      return const FirebaseAuthGatewayException(
        'Google sign-in was cancelled.',
        code: 'cancelled',
      );
    }
    if (normalized.contains('network')) {
      return const FirebaseAuthGatewayException(
        'Network error. Please check your internet connection.',
        code: 'network-request-failed',
      );
    }
    return FirebaseAuthGatewayException(
      _sanitizeMessage(
        e.message,
        fallback: 'Sign-in could not be completed. Please try again.',
      ),
      code: code,
    );
  }

  static String _sanitizeMessage(String? raw, {required String fallback}) {
    if (raw == null) return fallback;
    final stripped = raw.replaceFirst(RegExp(r'^\[[^\]]+\]\s*'), '').trim();
    return stripped.isEmpty ? fallback : stripped;
  }

  @override
  Future<void> signOut() async {
    if (_firebaseAuthOverride != null || Firebase.apps.isNotEmpty) {
      try {
        await _requireFirebaseAuth().signOut();
      } catch (_) {
        // Ignore sign-out errors if Firebase isn't active.
      }
    }
    try {
      await _resolveGoogleSignIn().signOut();
    } catch (_) {
      // Ignore Google sign-out errors on devices without Play Services.
    }
  }
}
