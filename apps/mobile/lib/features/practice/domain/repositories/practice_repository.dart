import 'package:common/common.dart';
import 'package:network/network.dart';
import 'package:porhi/features/practice/domain/entities/practice_entities.dart';

abstract class PracticeRepository {
  Future<Either<ErrorResponse, List<PracticeQuestionEntity>>>
      getChapterQuestions({
    required String chapterId,
    String? topicId,
    String? difficulty,
    String? mode,
    String? type,
  });

  Future<List<PracticeQuestionEntity>> getCachedChapterQuestions({
    required String chapterId,
    String? topicId,
    String? difficulty,
    String? type,
  });

  Future<Either<ErrorResponse, PracticeSubmitResultEntity>> submitPractice({
    required String questionId,
    required String selectedOptionId,
    String? chapterId,
    String? topicId,
    PracticeQuestionEntity? question,
  });

  Future<Either<ErrorResponse, CqSelfAssessResultEntity>> submitCqSelfAssess({
    required String questionId,
    required CqSelfScoresEntity selfScores,
    String? topicId,
  });
}
