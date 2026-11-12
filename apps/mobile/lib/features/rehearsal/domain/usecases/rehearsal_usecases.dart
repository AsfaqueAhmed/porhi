import 'package:common/common.dart';
import 'package:network/network.dart';
import 'package:porhi/features/exam/domain/entities/exam_entities.dart';
import 'package:porhi/features/rehearsal/domain/entities/rehearsal_entities.dart';
import 'package:porhi/features/rehearsal/domain/repositories/rehearsal_repository.dart';

class StartRehearsalUseCase {
  static const int minPapers = 2;
  static const int maxPapers = 5;
  static const int minQuestionCount = 1;
  static const int maxQuestionCount = 50;
  static const int minDurationMinutes = 1;
  static const int maxDurationMinutes = 120;
  static const double minNegativeRatio = 0.0;
  static const double maxNegativeRatio = 1.0;

  final RehearsalRepository _repository;

  const StartRehearsalUseCase(this._repository);

  Future<Either<ErrorResponse, RehearsalSessionEnvelopeEntity>> call({
    required String titleBangla,
    String? program,
    double? negativeRatio,
    required List<RehearsalPaperInputEntity> papers,
  }) async {
    final trimmedTitle = titleBangla.trim();
    if (trimmedTitle.isEmpty) {
      return Left<ErrorResponse, RehearsalSessionEnvelopeEntity>(
        ErrorResponse(
          message: 'রিহার্সালের শিরোনাম লিখুন।',
          data: ApiResponseErrorType.response,
        ),
      );
    }

    if (papers.length < minPapers || papers.length > maxPapers) {
      return Left<ErrorResponse, RehearsalSessionEnvelopeEntity>(
        ErrorResponse(
          message: 'কমপক্ষে ২টি এবং সর্বোচ্চ ৫টি পত্র নির্বাচন করুন।',
          data: ApiResponseErrorType.response,
        ),
      );
    }

    if (negativeRatio != null &&
        (negativeRatio.isNaN ||
            negativeRatio < minNegativeRatio ||
            negativeRatio > maxNegativeRatio)) {
      return Left<ErrorResponse, RehearsalSessionEnvelopeEntity>(
        ErrorResponse(
          message: 'negativeRatio must be between 0 and 1.0',
          data: ApiResponseErrorType.response,
        ),
      );
    }

    for (final paper in papers) {
      if (paper.subjectId.trim().isEmpty) {
        return Left<ErrorResponse, RehearsalSessionEnvelopeEntity>(
          ErrorResponse(
            message: 'প্রতিটি পত্রের জন্য একটি বিষয় নির্বাচন করুন।',
            data: ApiResponseErrorType.response,
          ),
        );
      }
      if (paper.questionCount < minQuestionCount ||
          paper.questionCount > maxQuestionCount) {
        return Left<ErrorResponse, RehearsalSessionEnvelopeEntity>(
          ErrorResponse(
            message: 'প্রতি পত্রে প্রশ্ন সংখ্যা ১ থেকে ৫০-এর মধ্যে হতে হবে।',
            data: ApiResponseErrorType.response,
          ),
        );
      }
      if (paper.durationMinutes < minDurationMinutes ||
          paper.durationMinutes > maxDurationMinutes) {
        return Left<ErrorResponse, RehearsalSessionEnvelopeEntity>(
          ErrorResponse(
            message: 'প্রতি পত্রের সময় ১ থেকে ১২০ মিনিটের মধ্যে হতে হবে।',
            data: ApiResponseErrorType.response,
          ),
        );
      }
    }

    final trimmedProgram = program?.trim();
    return _repository.startRehearsal(
      titleBangla: trimmedTitle,
      program: (trimmedProgram != null && trimmedProgram.isNotEmpty)
          ? trimmedProgram
          : null,
      negativeRatio: negativeRatio,
      papers: papers,
    );
  }
}

class GetRehearsalHistoryUseCase {
  final RehearsalRepository _repository;

  const GetRehearsalHistoryUseCase(this._repository);

  Future<Either<ErrorResponse, List<MultiExamRehearsalEntity>>> call() {
    return _repository.getRehearsalHistory();
  }
}

class GetRehearsalUseCase {
  final RehearsalRepository _repository;

  const GetRehearsalUseCase(this._repository);

  Future<Either<ErrorResponse, RehearsalSessionEnvelopeEntity>> call(
    String rehearsalId,
  ) async {
    final trimmed = rehearsalId.trim();
    if (trimmed.isEmpty) {
      return Left<ErrorResponse, RehearsalSessionEnvelopeEntity>(
        ErrorResponse(
          message: 'rehearsalId is required',
          data: ApiResponseErrorType.response,
        ),
      );
    }
    return _repository.getRehearsal(trimmed);
  }
}

class StartRehearsalPaperUseCase {
  final RehearsalRepository _repository;

  const StartRehearsalPaperUseCase(this._repository);

  Future<Either<ErrorResponse, RehearsalSessionEnvelopeEntity>> call({
    required String rehearsalId,
    required int paperIndex,
  }) async {
    final trimmed = rehearsalId.trim();
    if (trimmed.isEmpty || paperIndex < 0) {
      return Left<ErrorResponse, RehearsalSessionEnvelopeEntity>(
        ErrorResponse(
          message: 'Invalid rehearsal or paper index',
          data: ApiResponseErrorType.response,
        ),
      );
    }
    return _repository.startRehearsalPaper(
      rehearsalId: trimmed,
      paperIndex: paperIndex,
    );
  }
}

class SubmitRehearsalPaperUseCase {
  final RehearsalRepository _repository;

  const SubmitRehearsalPaperUseCase(this._repository);

  Future<Either<ErrorResponse, RehearsalPaperSubmitResultEntity>> call({
    required String rehearsalId,
    required int paperIndex,
    required List<ExamAnswerInputEntity> answers,
  }) async {
    final trimmed = rehearsalId.trim();
    if (trimmed.isEmpty || paperIndex < 0) {
      return Left<ErrorResponse, RehearsalPaperSubmitResultEntity>(
        ErrorResponse(
          message: 'Invalid rehearsal or paper index',
          data: ApiResponseErrorType.response,
        ),
      );
    }
    return _repository.submitRehearsalPaper(
      rehearsalId: trimmed,
      paperIndex: paperIndex,
      answers: answers,
    );
  }
}
