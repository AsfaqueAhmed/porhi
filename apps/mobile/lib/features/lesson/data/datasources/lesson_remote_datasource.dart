import 'package:common/common.dart';
import 'package:network/network.dart';
import 'package:porhi/features/lesson/data/models/lesson_models.dart';

abstract class LessonRemoteDataSource {
  Future<Either<ErrorResponse, LessonDetailModel>> getLessonByTopic(
    String topicId,
  );

  Future<Either<ErrorResponse, QuickCheckQuestionListModel>> getTopicQuestions({
    required String chapterId,
    required String topicId,
  });

  Future<Either<ErrorResponse, QuickCheckSubmitResponseModel>>
      submitPracticeAttempt({
    required String questionId,
    required String selectedOptionId,
  });

  Future<Either<ErrorResponse, LessonAckModel>> markLessonComplete({
    required String topicId,
    String? lessonId,
    int? timeSpentSeconds,
  });
}

class LessonRemoteDataSourceImpl extends BaseRepository
    implements LessonRemoteDataSource {
  @override
  Future<Either<ErrorResponse, LessonDetailModel>> getLessonByTopic(
    String topicId,
  ) {
    return get<LessonDetailModel>(
      path: '/lessons/topic/${Uri.encodeComponent(topicId)}',
      responseCompiler: (json) => LessonDetailModel.fromJson(
        json,
        fallbackTopicId: topicId,
      ),
    );
  }

  @override
  Future<Either<ErrorResponse, QuickCheckQuestionListModel>> getTopicQuestions({
    required String chapterId,
    required String topicId,
  }) {
    final resolvedChapter =
        chapterId.trim().isNotEmpty ? chapterId.trim() : topicId.trim();
    return get<QuickCheckQuestionListModel>(
      path:
          '/practice/chapter/${Uri.encodeComponent(resolvedChapter)}/questions',
      queryParameters: <String, String>{
        'topicId': topicId,
        'type': 'MCQ',
      },
      responseCompiler: QuickCheckQuestionListModel.fromJson,
    );
  }

  @override
  Future<Either<ErrorResponse, QuickCheckSubmitResponseModel>>
      submitPracticeAttempt({
    required String questionId,
    required String selectedOptionId,
  }) {
    return post<QuickCheckSubmitResponseModel>(
      path: '/practice/submit',
      data: <String, dynamic>{
        'questionId': questionId,
        'selectedOptionId': selectedOptionId,
      },
      responseCompiler: QuickCheckSubmitResponseModel.fromJson,
    );
  }

  @override
  Future<Either<ErrorResponse, LessonAckModel>> markLessonComplete({
    required String topicId,
    String? lessonId,
    int? timeSpentSeconds,
  }) {
    return post<LessonAckModel>(
      path: '/student/lesson-complete',
      data: <String, dynamic>{
        'topicId': topicId,
        'lessonId': ?lessonId,
        'timeSpentSeconds': ?timeSpentSeconds,
      },
      responseCompiler: LessonAckModel.fromJson,
    );
  }
}
