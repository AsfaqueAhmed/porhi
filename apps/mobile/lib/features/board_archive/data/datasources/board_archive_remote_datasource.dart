import 'package:common/common.dart';
import 'package:network/network.dart';
import 'package:porhi/features/board_archive/data/models/board_archive_models.dart';
import 'package:porhi/features/board_archive/domain/entities/board_archive_entities.dart';

abstract class BoardArchiveRemoteDataSource {
  Future<Either<ErrorResponse, BoardArchiveFiltersModel>> getFilters();

  Future<Either<ErrorResponse, BoardArchiveResponseModel>> getQuestions(
    BoardArchiveQueryParams query,
  );
}

class BoardArchiveRemoteDataSourceImpl extends BaseRepository
    implements BoardArchiveRemoteDataSource {
  @override
  Future<Either<ErrorResponse, BoardArchiveFiltersModel>> getFilters() {
    return get<BoardArchiveFiltersModel>(
      path: '/board-archive/filters',
      responseCompiler: BoardArchiveFiltersModel.fromJson,
    );
  }

  @override
  Future<Either<ErrorResponse, BoardArchiveResponseModel>> getQuestions(
    BoardArchiveQueryParams query,
  ) {
    return get<BoardArchiveResponseModel>(
      path: '/board-archive/questions',
      queryParameters: query.toQueryMap(),
      responseCompiler: BoardArchiveResponseModel.fromJson,
    );
  }
}
