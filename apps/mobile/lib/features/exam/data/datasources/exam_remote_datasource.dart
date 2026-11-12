import 'package:common/common.dart';
import 'package:network/network.dart';
import 'package:porhi/features/exam/data/models/exam_models.dart';
import 'package:porhi/features/exam/domain/entities/exam_entities.dart';

abstract class ExamRemoteDataSource {
  Future<Either<ErrorResponse, ExamSessionStartModel>> startExam({
    required ExamTestType testType,
    required String subjectId,
    String? chapterId,
    String? topicId,
    int? questionLimit,
    double negativeRatio = 0.25,
    int? durationSeconds,
  });

  Future<Either<ErrorResponse, ExamHeartbeatResponseModel>> heartbeat({
    required String sessionId,
    required List<ExamAnswerInputEntity> answers,
  });

  Future<Either<ErrorResponse, ExamSubmitResponseModel>> submitExam({
    required String sessionId,
    required List<ExamAnswerInputEntity> answers,
  });

  Future<Either<ErrorResponse, ExamSessionDetailModel>> getSession(
    String sessionId,
  );
}

class ExamRemoteDataSourceImpl extends BaseRepository
    implements ExamRemoteDataSource {
  @override
  Future<Either<ErrorResponse, ExamSessionStartModel>> startExam({
    required ExamTestType testType,
    required String subjectId,
    String? chapterId,
    String? topicId,
    int? questionLimit,
    double negativeRatio = 0.25,
    int? durationSeconds,
  }) {
    final payload = <String, dynamic>{
      'testType': testType.apiValue,
      'subjectId': subjectId,
      'negativeRatio': negativeRatio,
      if (chapterId != null && chapterId.isNotEmpty) 'chapterId': chapterId,
      if (topicId != null && topicId.isNotEmpty) 'topicId': topicId,
      'questionLimit': ?questionLimit,
      'durationSeconds': ?durationSeconds,
    };

    return post<ExamSessionStartModel>(
      path: '/exam/start',
      data: payload,
      responseCompiler: ExamSessionStartModel.fromJson,
    );
  }

  @override
  Future<Either<ErrorResponse, ExamHeartbeatResponseModel>> heartbeat({
    required String sessionId,
    required List<ExamAnswerInputEntity> answers,
  }) {
    return put<ExamHeartbeatResponseModel>(
      path: '/exam/heartbeat/${Uri.encodeComponent(sessionId)}',
      data: <String, dynamic>{
        'answers': answers
            .map(
              (a) => <String, dynamic>{
                'questionId': a.questionId,
                'selectedOptionId': a.selectedOptionId,
                'timeSpent': a.timeSpent,
              },
            )
            .toList(),
      },
      responseCompiler: ExamHeartbeatResponseModel.fromJson,
    );
  }

  @override
  Future<Either<ErrorResponse, ExamSubmitResponseModel>> submitExam({
    required String sessionId,
    required List<ExamAnswerInputEntity> answers,
  }) {
    return post<ExamSubmitResponseModel>(
      path: '/exam/submit/${Uri.encodeComponent(sessionId)}',
      data: <String, dynamic>{
        'answers': answers
            .map(
              (a) => <String, dynamic>{
                'questionId': a.questionId,
                'selectedOptionId': a.selectedOptionId,
                'timeSpent': a.timeSpent,
              },
            )
            .toList(),
      },
      responseCompiler: ExamSubmitResponseModel.fromJson,
    );
  }

  @override
  Future<Either<ErrorResponse, ExamSessionDetailModel>> getSession(
    String sessionId,
  ) {
    return get<ExamSessionDetailModel>(
      path: '/exam/session/${Uri.encodeComponent(sessionId)}',
      responseCompiler: ExamSessionDetailModel.fromJson,
    );
  }
}
