import 'package:common/common.dart';
import 'package:network/network.dart';
import 'package:porhi/features/exam/domain/entities/exam_entities.dart';
import 'package:porhi/features/rehearsal/data/datasources/rehearsal_remote_datasource.dart';
import 'package:porhi/features/rehearsal/domain/entities/rehearsal_entities.dart';
import 'package:porhi/features/rehearsal/domain/repositories/rehearsal_repository.dart';

class RehearsalRepositoryImpl implements RehearsalRepository {
  final RehearsalRemoteDataSource _remoteDataSource;

  const RehearsalRepositoryImpl({
    required this._remoteDataSource,
  });

  @override
  Future<Either<ErrorResponse, RehearsalSessionEnvelopeEntity>> startRehearsal({
    required String titleBangla,
    String? program,
    double? negativeRatio,
    required List<RehearsalPaperInputEntity> papers,
  }) async {
    final res = await _remoteDataSource.startRehearsal(
      titleBangla: titleBangla,
      program: program,
      negativeRatio: negativeRatio,
      papers: papers,
    );
    return res.fold(
      Left.new,
      (model) => Right(model.toEntity()),
    );
  }

  @override
  Future<Either<ErrorResponse, List<MultiExamRehearsalEntity>>>
      getRehearsalHistory() async {
    final res = await _remoteDataSource.getRehearsalHistory();
    return res.fold(
      Left.new,
      (model) => Right(model.toEntities()),
    );
  }

  @override
  Future<Either<ErrorResponse, RehearsalSessionEnvelopeEntity>> getRehearsal(
    String rehearsalId,
  ) async {
    final res = await _remoteDataSource.getRehearsal(rehearsalId);
    return res.fold(
      Left.new,
      (model) => Right(model.toEntity()),
    );
  }

  @override
  Future<Either<ErrorResponse, RehearsalSessionEnvelopeEntity>>
      startRehearsalPaper({
    required String rehearsalId,
    required int paperIndex,
  }) async {
    final res = await _remoteDataSource.startRehearsalPaper(
      rehearsalId: rehearsalId,
      paperIndex: paperIndex,
    );
    return res.fold(
      Left.new,
      (model) => Right(model.toEntity()),
    );
  }

  @override
  Future<Either<ErrorResponse, RehearsalPaperSubmitResultEntity>>
      submitRehearsalPaper({
    required String rehearsalId,
    required int paperIndex,
    required List<ExamAnswerInputEntity> answers,
  }) async {
    final res = await _remoteDataSource.submitRehearsalPaper(
      rehearsalId: rehearsalId,
      paperIndex: paperIndex,
      answers: answers,
    );
    return res.fold(
      Left.new,
      (model) => Right(model.toEntity(paperIndex: paperIndex)),
    );
  }
}
