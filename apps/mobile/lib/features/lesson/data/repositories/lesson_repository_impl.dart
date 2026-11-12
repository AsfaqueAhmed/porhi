import 'package:common/common.dart';
import 'package:network/network.dart';
import 'package:porhi/core/sync/offline_sync_service.dart';
import 'package:porhi/features/lesson/data/datasources/lesson_local_datasource.dart';
import 'package:porhi/features/lesson/data/datasources/lesson_remote_datasource.dart';
import 'package:porhi/features/lesson/domain/entities/lesson_entities.dart';
import 'package:porhi/features/lesson/domain/repositories/lesson_repository.dart';

class LessonRepositoryImpl implements LessonRepository {
  final LessonRemoteDataSource _remoteDataSource;
  final LessonLocalDataSource _localDataSource;
  final OfflineSyncService _offlineSyncService;

  LessonRepositoryImpl({
    required this._remoteDataSource,
    required this._localDataSource,
    required this._offlineSyncService,
  });

  bool _isOfflineError(ErrorResponse err) {
    return err.data == ApiResponseErrorType.noInternet ||
        err.data == ApiResponseErrorType.slowOrNoInternet;
  }

  @override
  Future<Either<ErrorResponse, LessonDetailEntity>> getLessonByTopic(
    String topicId,
  ) async {
    final result = await _remoteDataSource.getLessonByTopic(topicId);
    return result.fold(
      (err) async {
        final cached = await _localDataSource.getCachedLessonByTopic(topicId);
        if (cached != null) {
          return Right<ErrorResponse, LessonDetailEntity>(cached);
        }
        return Left<ErrorResponse, LessonDetailEntity>(err);
      },
      (model) async {
        final isCompleted = await _localDataSource.cacheLesson(model);
        return Right<ErrorResponse, LessonDetailEntity>(
          model.toEntity(
            isFromCache: false,
            isCompleted: isCompleted,
          ),
        );
      },
    );
  }

  @override
  Future<LessonDetailEntity?> getCachedLessonByTopic(String topicId) {
    return _localDataSource.getCachedLessonByTopic(topicId);
  }

  @override
  Future<Either<ErrorResponse, List<QuickCheckQuestionEntity>>>
      getTopicQuickQuestions({
    required String chapterId,
    required String topicId,
  }) async {
    final result = await _remoteDataSource.getTopicQuestions(
      chapterId: chapterId,
      topicId: topicId,
    );
    return result.fold(
      (err) async {
        final cached = await _localDataSource.getCachedQuestionsByTopic(
          chapterId: chapterId,
          topicId: topicId,
        );
        if (cached.isNotEmpty) {
          return Right<ErrorResponse, List<QuickCheckQuestionEntity>>(cached);
        }
        return Left<ErrorResponse, List<QuickCheckQuestionEntity>>(err);
      },
      (model) async {
        final entities = model.questions.map((q) => q.toEntity()).toList();
        if (entities.isEmpty) {
          final cached = await _localDataSource.getCachedQuestionsByTopic(
            chapterId: chapterId,
            topicId: topicId,
          );
          if (cached.isNotEmpty) {
            return Right<ErrorResponse, List<QuickCheckQuestionEntity>>(cached);
          }
        }
        return Right<ErrorResponse, List<QuickCheckQuestionEntity>>(entities);
      },
    );
  }

  @override
  Future<List<QuickCheckQuestionEntity>> getCachedTopicQuickQuestions({
    required String chapterId,
    required String topicId,
  }) {
    return _localDataSource.getCachedQuestionsByTopic(
      chapterId: chapterId,
      topicId: topicId,
    );
  }

  @override
  Future<Either<ErrorResponse, QuickCheckSubmitResultEntity>>
      submitQuickCheckAttempt({
    required QuickCheckQuestionEntity question,
    required String selectedOptionId,
  }) async {
    final result = await _remoteDataSource.submitPracticeAttempt(
      questionId: question.id,
      selectedOptionId: selectedOptionId,
    );
    return result.fold(
      (err) async {
        if (!_isOfflineError(err)) {
          return Left<ErrorResponse, QuickCheckSubmitResultEntity>(err);
        }

        QuickCheckOptionEntity? selectedOpt;
        QuickCheckOptionEntity? correctOpt;
        for (final opt in question.options) {
          if (opt.id == selectedOptionId) selectedOpt = opt;
          if (opt.isCorrect == true) correctOpt = opt;
        }
        final isCorrect = selectedOpt?.isCorrect == true;

        await _offlineSyncService.enqueuePracticeAttempt(
          questionId: question.id,
          isCorrect: isCorrect,
          topicId: question.topicId,
          selectedOptionId: selectedOptionId,
        );

        return Right<ErrorResponse, QuickCheckSubmitResultEntity>(
          QuickCheckSubmitResultEntity(
            isCorrect: isCorrect,
            correctOptionId: correctOpt?.id,
            explanation: question.explanation,
            isQueuedOffline: true,
          ),
        );
      },
      (model) {
        return Right<ErrorResponse, QuickCheckSubmitResultEntity>(
          QuickCheckSubmitResultEntity(
            isCorrect: model.isCorrect,
            correctOptionId: model.correctOptionId,
            explanation: model.explanation,
            isQueuedOffline: false,
          ),
        );
      },
    );
  }

  @override
  Future<Either<ErrorResponse, LessonCompleteResultEntity>> completeLesson({
    required String topicId,
    String? lessonId,
    String? chapterId,
    String? subjectId,
    int? timeSpentSeconds,
  }) async {
    final result = await _remoteDataSource.markLessonComplete(
      topicId: topicId,
      lessonId: lessonId,
      timeSpentSeconds: timeSpentSeconds,
    );

    return result.fold(
      (err) async {
        if (!_isOfflineError(err)) {
          return Left<ErrorResponse, LessonCompleteResultEntity>(err);
        }
        await _offlineSyncService.enqueueLessonComplete(
          topicId: topicId,
          chapterId: chapterId,
          subjectId: subjectId,
        );
        await _localDataSource.markCachedLessonCompleted(
          topicId: topicId,
          subjectId: subjectId,
        );
        return Right<ErrorResponse, LessonCompleteResultEntity>(
          LessonCompleteResultEntity(
            topicId: topicId,
            isQueuedOffline: true,
          ),
        );
      },
      (_) async {
        await _localDataSource.markCachedLessonCompleted(
          topicId: topicId,
          subjectId: subjectId,
        );
        return Right<ErrorResponse, LessonCompleteResultEntity>(
          LessonCompleteResultEntity(
            topicId: topicId,
            isQueuedOffline: false,
          ),
        );
      },
    );
  }

  @override
  Future<String?> getLocalLessonNote(String topicId) {
    return _localDataSource.getLocalLessonNote(topicId);
  }

  @override
  Future<void> saveLocalLessonNote({
    required String topicId,
    required String content,
    String? subjectId,
  }) {
    return _localDataSource.saveLocalLessonNote(
      topicId: topicId,
      content: content,
      subjectId: subjectId,
    );
  }
}
