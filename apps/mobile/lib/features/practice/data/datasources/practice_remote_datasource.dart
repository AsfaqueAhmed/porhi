import 'package:common/common.dart';
import 'package:network/network.dart';
import 'package:porhi/features/practice/data/models/practice_models.dart';
import 'package:porhi/features/practice/domain/entities/practice_entities.dart';

abstract class PracticeRemoteDataSource {
  Future<Either<ErrorResponse, PracticeQuestionListModel>> getChapterQuestions({
    required String chapterId,
    String? topicId,
    String? difficulty,
    String? mode,
    String? type,
  });

  Future<Either<ErrorResponse, PracticeSubmitResponseModel>> submitPractice({
    required String questionId,
    required String selectedOptionId,
  });

  Future<Either<ErrorResponse, CqSelfAssessResponseModel>> submitCqSelfAssess({
    required String questionId,
    required CqSelfScoresEntity selfScores,
  });
}

class PracticeRemoteDataSourceImpl extends BaseRepository
    implements PracticeRemoteDataSource {
  @override
  Future<Either<ErrorResponse, PracticeQuestionListModel>> getChapterQuestions({
    required String chapterId,
    String? topicId,
    String? difficulty,
    String? mode,
    String? type,
  }) {
    final queryParameters = <String, String>{};
    if (topicId != null && topicId.trim().isNotEmpty) {
      queryParameters['topicId'] = topicId.trim();
    }
    if (difficulty != null &&
        difficulty.trim().isNotEmpty &&
        difficulty.trim().toUpperCase() != 'ALL') {
      queryParameters['difficulty'] = difficulty.trim().toUpperCase();
    }
    if (mode != null && mode.trim().isNotEmpty) {
      queryParameters['mode'] = mode.trim();
    }
    if (type != null && type.trim().isNotEmpty) {
      queryParameters['type'] = type.trim().toUpperCase();
    }

    return get<PracticeQuestionListModel>(
      path:
          '/practice/chapter/${Uri.encodeComponent(chapterId.trim())}/questions',
      queryParameters: queryParameters.isEmpty ? null : queryParameters,
      responseCompiler: PracticeQuestionListModel.fromJson,
    );
  }

  @override
  Future<Either<ErrorResponse, PracticeSubmitResponseModel>> submitPractice({
    required String questionId,
    required String selectedOptionId,
  }) {
    return post<PracticeSubmitResponseModel>(
      path: '/practice/submit',
      data: <String, dynamic>{
        'questionId': questionId,
        'selectedOptionId': selectedOptionId,
      },
      responseCompiler: PracticeSubmitResponseModel.fromJson,
    );
  }

  @override
  Future<Either<ErrorResponse, CqSelfAssessResponseModel>> submitCqSelfAssess({
    required String questionId,
    required CqSelfScoresEntity selfScores,
  }) {
    return post<CqSelfAssessResponseModel>(
      path: '/practice/cq-self-assess',
      data: <String, dynamic>{
        'questionId': questionId,
        'selfScores': <String, int>{
          'ka': selfScores.ka,
          'kha': selfScores.kha,
          'ga': selfScores.ga,
          'gha': selfScores.gha,
        },
      },
      responseCompiler: CqSelfAssessResponseModel.fromJson,
    );
  }
}
