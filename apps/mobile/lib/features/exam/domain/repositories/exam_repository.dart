import 'package:common/common.dart';
import 'package:network/network.dart';
import 'package:porhi/features/exam/domain/entities/exam_entities.dart';

abstract class ExamRepository {
  Future<Either<ErrorResponse, ExamSessionStartEntity>> startExam({
    required ExamTestType testType,
    required String subjectId,
    String? chapterId,
    String? topicId,
    int? questionLimit,
    double negativeRatio = 0.25,
    int? durationSeconds,
  });

  Future<Either<ErrorResponse, void>> sendHeartbeat({
    required String sessionId,
    required List<ExamAnswerInputEntity> answers,
  });

  Future<Either<ErrorResponse, ExamResultEntity>> submitExam({
    required String sessionId,
    required List<ExamAnswerInputEntity> answers,
    required String subjectId,
    String? chapterId,
    required ExamTestType testType,
    required int durationSeconds,
    required double negativeRatio,
    required bool isOfflineSession,
    List<ExamQuestionEntity> questions = const <ExamQuestionEntity>[],
  });

  Future<Either<ErrorResponse, ExamResultEntity>> getSession(String sessionId);

  Future<void> saveExamDraft(ExamDraftEntity draft);

  Future<ExamDraftEntity?> getExamDraft(String sessionId);

  Future<ExamDraftEntity?> getLatestExamDraft();

  Future<void> deleteExamDraft(String sessionId);

  Future<Either<ErrorResponse, ExamResumeDataEntity>> getResumeSessionData(
    ExamDraftEntity draft,
  );
}
