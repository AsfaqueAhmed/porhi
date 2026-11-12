import 'package:common/common.dart';
import 'package:network/network.dart';
import 'package:porhi/features/exam/domain/entities/exam_entities.dart';
import 'package:porhi/features/rehearsal/domain/entities/rehearsal_entities.dart';

abstract class RehearsalRepository {
  Future<Either<ErrorResponse, RehearsalSessionEnvelopeEntity>> startRehearsal({
    required String titleBangla,
    String? program,
    double? negativeRatio,
    required List<RehearsalPaperInputEntity> papers,
  });

  Future<Either<ErrorResponse, List<MultiExamRehearsalEntity>>>
      getRehearsalHistory();

  Future<Either<ErrorResponse, RehearsalSessionEnvelopeEntity>> getRehearsal(
    String rehearsalId,
  );

  Future<Either<ErrorResponse, RehearsalSessionEnvelopeEntity>>
      startRehearsalPaper({
    required String rehearsalId,
    required int paperIndex,
  });

  Future<Either<ErrorResponse, RehearsalPaperSubmitResultEntity>>
      submitRehearsalPaper({
    required String rehearsalId,
    required int paperIndex,
    required List<ExamAnswerInputEntity> answers,
  });
}
