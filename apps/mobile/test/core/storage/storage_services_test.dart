import 'package:common/common.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:porhi/core/storage/preferences_storage_service.dart';
import 'package:porhi/core/storage/secure_storage_service.dart';
import 'package:shared_preferences/shared_preferences.dart';

class MockFlutterSecureStorage extends Mock implements FlutterSecureStorage {}

void main() {
  group('SecureStorageService', () {
    late MockFlutterSecureStorage mockSecureStorage;
    late SecureStorageService service;

    setUp(() {
      mockSecureStorage = MockFlutterSecureStorage();
      when(
        () => mockSecureStorage.read(key: any(named: 'key')),
      ).thenAnswer((_) async => null);
      when(
        () => mockSecureStorage.write(
          key: any(named: 'key'),
          value: any(named: 'value'),
        ),
      ).thenAnswer((_) async {});
      when(
        () => mockSecureStorage.delete(key: any(named: 'key')),
      ).thenAnswer((_) async {});

      service = SecureStorageService(secureStorage: mockSecureStorage);
    });

    test('implements BaseStorageService and hydrates cached values on init', () async {
      expect(service, isA<BaseStorageService>());

      when(
        () => mockSecureStorage.read(key: SecureStorageService.accessTokenKey),
      ).thenAnswer((_) async => 'jwt-access-123');
      when(
        () => mockSecureStorage.read(key: SecureStorageService.refreshTokenKey),
      ).thenAnswer((_) async => 'jwt-refresh-456');
      when(
        () => mockSecureStorage.read(key: SecureStorageService.cachedUserKey),
      ).thenAnswer((_) async => '{"id":"u1","selectedClass":"SSC"}');

      await service.init();

      expect(service.read(SecureStorageService.accessTokenKey), 'jwt-access-123');
      expect(service.accessToken, 'jwt-access-123');
      expect(service.refreshToken, 'jwt-refresh-456');
      expect(service.getCachedUserMap(), {'id': 'u1', 'selectedClass': 'SSC'});
    });

    test('write, remove, and clearSession synchronize memory cache and FlutterSecureStorage', () async {
      await service.saveTokens(
        accessToken: 'token-a',
        refreshToken: 'token-r',
      );
      await service.saveUserMap({'id': 'stu-1', 'name': 'Rahim'});

      expect(service.accessToken, 'token-a');
      expect(service.refreshToken, 'token-r');
      expect(service.getCachedUserMap()?['id'], 'stu-1');

      verify(
        () => mockSecureStorage.write(
          key: SecureStorageService.accessTokenKey,
          value: 'token-a',
        ),
      ).called(1);
      verify(
        () => mockSecureStorage.write(
          key: SecureStorageService.refreshTokenKey,
          value: 'token-r',
        ),
      ).called(1);

      await service.clearSession();

      expect(service.accessToken, isNull);
      expect(service.refreshToken, isNull);
      expect(service.getCachedUserMap(), isNull);
      verify(
        () => mockSecureStorage.delete(key: SecureStorageService.accessTokenKey),
      ).called(1);
      verify(
        () => mockSecureStorage.delete(key: SecureStorageService.refreshTokenKey),
      ).called(1);
      verify(
        () => mockSecureStorage.delete(key: SecureStorageService.cachedUserKey),
      ).called(1);
    });

    test('getCachedUserMap returns null on malformed JSON and readSecure caches custom keys', () async {
      await service.saveUserJson('{not-valid-json');
      expect(service.getCachedUserMap(), isNull);

      when(
        () => mockSecureStorage.read(key: 'custom_key'),
      ).thenAnswer((_) async => 'custom_value');

      expect(await service.readSecure('custom_key'), 'custom_value');
      expect(service.read('custom_key'), 'custom_value');
      // Subsequent readSecure uses in-memory cache
      expect(await service.readSecure('custom_key'), 'custom_value');
      verify(() => mockSecureStorage.read(key: 'custom_key')).called(1);
    });
  });

  group('PreferencesStorageService', () {
    test('implements BaseStorageService and persists language and sync metadata', () async {
      SharedPreferences.setMockInitialValues({});
      final service = PreferencesStorageService();
      await service.init();

      expect(service, isA<BaseStorageService>());
      expect(service.getLanguage(), 'bn');

      await service.setLanguage('en');
      expect(service.getLanguage(), 'en');
      expect(service.read(PreferencesStorageService.languageKey), 'en');

      final syncTime = DateTime.utc(2026, 11, 12, 14, 30);
      await service.setLastSyncAt(syncTime);
      expect(service.getLastSyncAt(), syncTime);

      await service.setBool('offline_only', true);
      expect(service.getBool('offline_only'), isTrue);

      await service.setInt('streak_days', 5);
      expect(service.getInt('streak_days'), 5);

      final removed = await service.remove(PreferencesStorageService.languageKey);
      expect(removed, isTrue);
      expect(service.read(PreferencesStorageService.languageKey), isNull);

      expect(await service.clear(), isTrue);
      expect(service.getBool('offline_only'), isFalse);
      expect(service.getInt('streak_days'), isNull);
    });
  });
}
