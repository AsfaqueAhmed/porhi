import 'package:common/common.dart';
import 'package:network/network.dart';
import 'package:porhi/features/lesson/domain/entities/lesson_entities.dart';

/// Domain contract for connected lesson reading, offline Drift fallback,
/// quick topic checks, completion, and local personal notes cache.
abstract class LessonRepository {
  Future<Either<ErrorResponse, LessonDetailEntity>> getLessonByTopic(
    String topicId,
  );

  Future<LessonDetailEntity?> getCachedLessonByTopic(String topicId);

  Future<Either<ErrorResponse, List<QuickCheckQuestionEntity>>>
      getTopicQuickQuestions({
    required String chapterId,
    required String topicId,
  });

  Future<List<QuickCheckQuestionEntity>> getCachedTopicQuickQuestions({
    required String chapterId,
    required String topicId,
  });

  Future<Either<ErrorResponse, QuickCheckSubmitResultEntity>>
      submitQuickCheckAttempt({
    required QuickCheckQuestionEntity question,
    required String selectedOptionId,
  });

  Future<Either<ErrorResponse, LessonCompleteResultEntity>> completeLesson({
    required String topicId,
    String? lessonId,
    String? chapterId,
    String? subjectId,
    int? timeSpentSeconds,
  });

  Future<String?> getLocalLessonNote(String topicId);

  Future<void> saveLocalLessonNote({
    required String topicId,
    required String content,
    String? subjectId,
  });

  Future<LocalTopicStateOverlayEntity?> getLocalTopicStateOverlay(
    String subjectId,
  );
}
