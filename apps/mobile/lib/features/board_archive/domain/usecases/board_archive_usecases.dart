import 'package:common/common.dart';
import 'package:network/network.dart';
import 'package:porhi/features/board_archive/domain/entities/board_archive_entities.dart';
import 'package:porhi/features/board_archive/domain/repositories/board_archive_repository.dart';

class GetBoardArchiveFiltersUseCase {
  final BoardArchiveRepository _repository;

  const GetBoardArchiveFiltersUseCase(this._repository);

  Future<Either<ErrorResponse, BoardArchiveFiltersEntity>> call() {
    return _repository.getFilters();
  }
}

class GetBoardArchiveQuestionsUseCase {
  final BoardArchiveRepository _repository;

  const GetBoardArchiveQuestionsUseCase(this._repository);

  Future<Either<ErrorResponse, BoardArchivePageEntity>> call(
    BoardArchiveQueryParams query,
  ) {
    return _repository.getQuestions(query);
  }
}
