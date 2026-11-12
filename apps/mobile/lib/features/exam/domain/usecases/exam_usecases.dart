import 'package:common/common.dart';
import 'package:network/network.dart';
import 'package:porhi/features/exam/domain/entities/exam_entities.dart';
import 'package:porhi/features/exam/domain/repositories/exam_repository.dart';

class StartExamUseCase {
  static const double minNegativeRatio = 0.0;
  static const double maxNegativeRatio = 1.0;
  static const int minDurationSeconds = 60;
  static const int maxDurationSeconds = 7200;
  static const int minQuestionLimit = 1;
  static const int maxQuestionLimit = 100;

  final ExamRepository _repository;

  const StartExamUseCase(this._repository);

  Future<Either<ErrorResponse, ExamSessionStartEntity>> call({
    required ExamTestType testType,
    required String subjectId,
    String? chapterId,
    String? topicId,
    int? questionLimit,
    double negativeRatio = 0.25,
    int? durationSeconds,
  }) async {
    final trimmedSubjectId = subjectId.trim();
    if (trimmedSubjectId.isEmpty) {
      return Left<ErrorResponse, ExamSessionStartEntity>(
        ErrorResponse(
          message: 'subjectId is required',
          data: ApiResponseErrorType.response,
        ),
      );
    }

    final trimmedChapterId = chapterId?.trim();
    if (testType != ExamTestType.subjectTest &&
        (trimmedChapterId == null || trimmedChapterId.isEmpty)) {
      return Left<ErrorResponse, ExamSessionStartEntity>(
        ErrorResponse(
          message: 'chapterId is required',
          data: ApiResponseErrorType.response,
        ),
      );
    }

    if (negativeRatio.isNaN ||
        negativeRatio < minNegativeRatio ||
        negativeRatio > maxNegativeRatio) {
      return Left<ErrorResponse, ExamSessionStartEntity>(
        ErrorResponse(
          message: 'negativeRatio must be between 0 and 1.0',
          data: ApiResponseErrorType.response,
        ),
      );
    }

    if (durationSeconds != null &&
        (durationSeconds < minDurationSeconds ||
            durationSeconds > maxDurationSeconds)) {
      return Left<ErrorResponse, ExamSessionStartEntity>(
        ErrorResponse(
          message: 'durationSeconds must be between 60 and 7200',
          data: ApiResponseErrorType.response,
        ),
      );
    }

    if (questionLimit != null &&
        (questionLimit < minQuestionLimit ||
            questionLimit > maxQuestionLimit)) {
      return Left<ErrorResponse, ExamSessionStartEntity>(
        ErrorResponse(
          message: 'questionLimit must be between 1 and 100',
          data: ApiResponseErrorType.response,
        ),
      );
    }

    final trimmedTopicId = topicId?.trim();
    return _repository.startExam(
      testType: testType,
      subjectId: trimmedSubjectId,
      chapterId: testType == ExamTestType.subjectTest ? null : trimmedChapterId,
      topicId: (trimmedTopicId != null && trimmedTopicId.isNotEmpty)
          ? trimmedTopicId
          : null,
      questionLimit: questionLimit,
      negativeRatio: negativeRatio,
      durationSeconds: durationSeconds,
    );
  }
}

class HeartbeatExamUseCase {
  final ExamRepository _repository;

  const HeartbeatExamUseCase(this._repository);

  Future<Either<ErrorResponse, void>> call({
    required String sessionId,
    required List<ExamAnswerInputEntity> answers,
  }) async {
    final trimmed = sessionId.trim();
    if (trimmed.isEmpty) {
      return Left<ErrorResponse, void>(
        ErrorResponse(
          message: 'sessionId is required',
          data: ApiResponseErrorType.response,
        ),
      );
    }
    return _repository.sendHeartbeat(sessionId: trimmed, answers: answers);
  }
}

class SubmitExamUseCase {
  final ExamRepository _repository;

  const SubmitExamUseCase(this._repository);

  Future<Either<ErrorResponse, ExamResultEntity>> call({
    required String sessionId,
    required List<ExamAnswerInputEntity> answers,
    required String subjectId,
    String? chapterId,
    required ExamTestType testType,
    required int durationSeconds,
    required double negativeRatio,
    required bool isOfflineSession,
    List<ExamQuestionEntity> questions = const <ExamQuestionEntity>[],
  }) async {
    final trimmed = sessionId.trim();
    if (trimmed.isEmpty) {
      return Left<ErrorResponse, ExamResultEntity>(
        ErrorResponse(
          message: 'sessionId is required',
          data: ApiResponseErrorType.response,
        ),
      );
    }
    return _repository.submitExam(
      sessionId: trimmed,
      answers: answers,
      subjectId: subjectId.trim(),
      chapterId: chapterId?.trim(),
      testType: testType,
      durationSeconds: durationSeconds,
      negativeRatio: negativeRatio,
      isOfflineSession: isOfflineSession,
      questions: questions,
    );
  }
}

class GetExamSessionUseCase {
  final ExamRepository _repository;

  const GetExamSessionUseCase(this._repository);

  Future<Either<ErrorResponse, ExamResultEntity>> call(String sessionId) async {
    final trimmed = sessionId.trim();
    if (trimmed.isEmpty) {
      return Left<ErrorResponse, ExamResultEntity>(
        ErrorResponse(
          message: 'sessionId is required',
          data: ApiResponseErrorType.response,
        ),
      );
    }
    return _repository.getSession(trimmed);
  }
}

class SaveExamDraftUseCase {
  final ExamRepository _repository;

  const SaveExamDraftUseCase(this._repository);

  Future<void> call(ExamDraftEntity draft) => _repository.saveExamDraft(draft);
}

class GetLatestExamDraftUseCase {
  final ExamRepository _repository;

  const GetLatestExamDraftUseCase(this._repository);

  Future<ExamDraftEntity?> call() => _repository.getLatestExamDraft();
}

class DeleteExamDraftUseCase {
  final ExamRepository _repository;

  const DeleteExamDraftUseCase(this._repository);

  Future<void> call(String sessionId) =>
      _repository.deleteExamDraft(sessionId);
}

class ResumeExamSessionUseCase {
  final ExamRepository _repository;

  const ResumeExamSessionUseCase(this._repository);

  Future<Either<ErrorResponse, ExamResumeDataEntity>> call(
    ExamDraftEntity draft,
  ) =>
      _repository.getResumeSessionData(draft);
}
