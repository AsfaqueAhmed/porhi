import 'package:common/common.dart';
import 'package:network/network.dart';
import 'package:porhi/features/practice/domain/entities/practice_entities.dart';
import 'package:porhi/features/practice/domain/repositories/practice_repository.dart';

class GetChapterPracticeQuestionsUseCase {
  final PracticeRepository _repository;

  const GetChapterPracticeQuestionsUseCase(this._repository);

  Future<Either<ErrorResponse, List<PracticeQuestionEntity>>> call({
    required String chapterId,
    String? topicId,
    String? difficulty,
    String? mode,
    String? type,
  }) async {
    final trimmedChapterId = chapterId.trim();
    if (trimmedChapterId.isEmpty) {
      return Left<ErrorResponse, List<PracticeQuestionEntity>>(
        ErrorResponse(
          message: 'Chapter ID is required',
          data: ApiResponseErrorType.response,
          code: 'INVALID_CHAPTER_ID',
        ),
      );
    }
    return _repository.getChapterQuestions(
      chapterId: trimmedChapterId,
      topicId: _normalizeOptional(topicId),
      difficulty: _normalizeOptional(difficulty),
      mode: _normalizeOptional(mode),
      type: _normalizeOptional(type),
    );
  }
}

class GetCachedChapterPracticeQuestionsUseCase {
  final PracticeRepository _repository;

  const GetCachedChapterPracticeQuestionsUseCase(this._repository);

  Future<List<PracticeQuestionEntity>> call({
    required String chapterId,
    String? topicId,
    String? difficulty,
    String? type,
  }) {
    final trimmedChapterId = chapterId.trim();
    if (trimmedChapterId.isEmpty) {
      return Future.value(const <PracticeQuestionEntity>[]);
    }
    return _repository.getCachedChapterQuestions(
      chapterId: trimmedChapterId,
      topicId: _normalizeOptional(topicId),
      difficulty: _normalizeOptional(difficulty),
      type: _normalizeOptional(type),
    );
  }
}

class SubmitPracticeAnswerUseCase {
  final PracticeRepository _repository;

  const SubmitPracticeAnswerUseCase(this._repository);

  Future<Either<ErrorResponse, PracticeSubmitResultEntity>> call({
    required String questionId,
    required String selectedOptionId,
    String? chapterId,
    String? topicId,
    PracticeQuestionEntity? question,
  }) async {
    final trimmedQuestionId = questionId.trim();
    final trimmedOptionId = selectedOptionId.trim();
    if (trimmedQuestionId.isEmpty || trimmedOptionId.isEmpty) {
      return Left<ErrorResponse, PracticeSubmitResultEntity>(
        ErrorResponse(
          message: 'questionId and selectedOptionId are required',
          data: ApiResponseErrorType.response,
          code: 'INVALID_PRACTICE_SUBMISSION',
        ),
      );
    }
    return _repository.submitPractice(
      questionId: trimmedQuestionId,
      selectedOptionId: trimmedOptionId,
      chapterId: _normalizeOptional(chapterId),
      topicId: _normalizeOptional(topicId),
      question: question,
    );
  }
}

class SubmitCqSelfAssessUseCase {
  final PracticeRepository _repository;

  const SubmitCqSelfAssessUseCase(this._repository);

  Future<Either<ErrorResponse, CqSelfAssessResultEntity>> call({
    required String questionId,
    required CqSelfScoresEntity selfScores,
    String? topicId,
  }) async {
    final trimmedQuestionId = questionId.trim();
    if (trimmedQuestionId.isEmpty) {
      return Left<ErrorResponse, CqSelfAssessResultEntity>(
        ErrorResponse(
          message: 'questionId is required',
          data: ApiResponseErrorType.response,
          code: 'INVALID_CQ_SUBMISSION',
        ),
      );
    }
    if (!selfScores.isValid) {
      return Left<ErrorResponse, CqSelfAssessResultEntity>(
        ErrorResponse(
          message:
              'Invalid CQ rubric scores: expected ka (0-1), kha (0-2), ga (0-3), gha (0-4)',
          data: ApiResponseErrorType.response,
          code: 'INVALID_CQ_SCORES',
        ),
      );
    }
    return _repository.submitCqSelfAssess(
      questionId: trimmedQuestionId,
      selfScores: selfScores,
      topicId: _normalizeOptional(topicId),
    );
  }
}

String? _normalizeOptional(String? value) {
  final trimmed = value?.trim();
  return (trimmed == null || trimmed.isEmpty) ? null : trimmed;
}
