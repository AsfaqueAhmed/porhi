import 'package:common/common.dart';
import 'package:network/network.dart';
import 'package:porhi/features/board_archive/domain/entities/board_archive_entities.dart';

abstract class BoardArchiveRepository {
  Future<Either<ErrorResponse, BoardArchiveFiltersEntity>> getFilters();

  Future<Either<ErrorResponse, BoardArchivePageEntity>> getQuestions(
    BoardArchiveQueryParams query,
  );
}
