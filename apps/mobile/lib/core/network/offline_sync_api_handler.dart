import 'package:common/common.dart';
import 'package:network/network.dart';
import 'package:porhi/core/sync/offline_sync_service.dart';

class _OfflineSyncAckModel extends BaseResponseModel<void> {
  _OfflineSyncAckModel();
}

/// Bridges [OfflineSyncService] to `POST /student/sync-offline` via [BaseRepository].
class OfflineSyncApiHandler extends BaseRepository {
  Future<Either<ErrorResponse, void>> syncOffline(
    OfflineSyncPayload payload,
  ) async {
    final result = await post<_OfflineSyncAckModel>(
      path: '/student/sync-offline',
      data: payload.toJson(),
      responseCompiler: (_) => _OfflineSyncAckModel(),
    );

    return result.fold(
      (error) => Left<ErrorResponse, void>(error),
      (_) => const Right<ErrorResponse, void>(null),
    );
  }
}
