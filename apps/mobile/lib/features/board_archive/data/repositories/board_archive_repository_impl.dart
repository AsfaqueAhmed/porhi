import 'package:common/common.dart';
import 'package:network/network.dart';
import 'package:porhi/features/board_archive/data/datasources/board_archive_remote_datasource.dart';
import 'package:porhi/features/board_archive/domain/entities/board_archive_entities.dart';
import 'package:porhi/features/board_archive/domain/repositories/board_archive_repository.dart';

class BoardArchiveRepositoryImpl implements BoardArchiveRepository {
  final BoardArchiveRemoteDataSource _remoteDataSource;

  const BoardArchiveRepositoryImpl({
    required this._remoteDataSource,
  });

  @override
  Future<Either<ErrorResponse, BoardArchiveFiltersEntity>> getFilters() async {
    final res = await _remoteDataSource.getFilters();
    return res.fold(
      Left.new,
      (model) => Right(model.toEntity()),
    );
  }

  @override
  Future<Either<ErrorResponse, BoardArchivePageEntity>> getQuestions(
    BoardArchiveQueryParams query,
  ) async {
    final res = await _remoteDataSource.getQuestions(query);
    return res.fold(
      Left.new,
      (model) => Right(model.toEntity()),
    );
  }
}
