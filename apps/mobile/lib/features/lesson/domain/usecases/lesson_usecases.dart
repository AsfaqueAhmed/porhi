import 'package:common/common.dart';
import 'package:network/network.dart';
import 'package:porhi/features/lesson/domain/entities/lesson_entities.dart';
import 'package:porhi/features/lesson/domain/repositories/lesson_repository.dart';

class GetLessonByTopicUseCase {
  final LessonRepository _repository;

  const GetLessonByTopicUseCase(this._repository);

  Future<Either<ErrorResponse, LessonDetailEntity>> call(String topicId) {
    return _repository.getLessonByTopic(topicId);
  }
}

class GetCachedLessonByTopicUseCase {
  final LessonRepository _repository;

  const GetCachedLessonByTopicUseCase(this._repository);

  Future<LessonDetailEntity?> call(String topicId) {
    return _repository.getCachedLessonByTopic(topicId);
  }
}

class GetTopicQuickQuestionsUseCase {
  final LessonRepository _repository;

  const GetTopicQuickQuestionsUseCase(this._repository);

  Future<Either<ErrorResponse, List<QuickCheckQuestionEntity>>> call({
    required String chapterId,
    required String topicId,
  }) {
    return _repository.getTopicQuickQuestions(
      chapterId: chapterId,
      topicId: topicId,
    );
  }
}

class GetCachedTopicQuickQuestionsUseCase {
  final LessonRepository _repository;

  const GetCachedTopicQuickQuestionsUseCase(this._repository);

  Future<List<QuickCheckQuestionEntity>> call({
    required String chapterId,
    required String topicId,
  }) {
    return _repository.getCachedTopicQuickQuestions(
      chapterId: chapterId,
      topicId: topicId,
    );
  }
}

class SubmitQuickCheckAttemptUseCase {
  final LessonRepository _repository;

  const SubmitQuickCheckAttemptUseCase(this._repository);

  Future<Either<ErrorResponse, QuickCheckSubmitResultEntity>> call({
    required QuickCheckQuestionEntity question,
    required String selectedOptionId,
  }) {
    return _repository.submitQuickCheckAttempt(
      question: question,
      selectedOptionId: selectedOptionId,
    );
  }
}

class CompleteLessonUseCase {
  final LessonRepository _repository;

  const CompleteLessonUseCase(this._repository);

  Future<Either<ErrorResponse, LessonCompleteResultEntity>> call({
    required String topicId,
    String? lessonId,
    String? chapterId,
    String? subjectId,
    int? timeSpentSeconds,
  }) {
    return _repository.completeLesson(
      topicId: topicId,
      lessonId: lessonId,
      chapterId: chapterId,
      subjectId: subjectId,
      timeSpentSeconds: timeSpentSeconds,
    );
  }
}

class GetLocalLessonNoteUseCase {
  final LessonRepository _repository;

  const GetLocalLessonNoteUseCase(this._repository);

  Future<String?> call(String topicId) {
    return _repository.getLocalLessonNote(topicId);
  }
}

class SaveLocalLessonNoteUseCase {
  final LessonRepository _repository;

  const SaveLocalLessonNoteUseCase(this._repository);

  Future<void> call({
    required String topicId,
    required String content,
    String? subjectId,
  }) {
    return _repository.saveLocalLessonNote(
      topicId: topicId,
      content: content,
      subjectId: subjectId,
    );
  }
}
