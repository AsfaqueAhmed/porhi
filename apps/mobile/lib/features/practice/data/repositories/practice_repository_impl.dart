import 'package:common/common.dart';
import 'package:network/network.dart';
import 'package:porhi/core/sync/offline_sync_service.dart';
import 'package:porhi/features/practice/data/datasources/practice_local_datasource.dart';
import 'package:porhi/features/practice/data/datasources/practice_remote_datasource.dart';
import 'package:porhi/features/practice/domain/entities/practice_entities.dart';
import 'package:porhi/features/practice/domain/repositories/practice_repository.dart';

class PracticeRepositoryImpl implements PracticeRepository {
  final PracticeRemoteDataSource _remoteDataSource;
  final PracticeLocalDataSource _localDataSource;
  final OfflineSyncService _offlineSyncService;

  PracticeRepositoryImpl({
    required this._remoteDataSource,
    required this._localDataSource,
    required this._offlineSyncService,
  });

  bool _isOfflineError(ErrorResponse err) {
    return err.data == ApiResponseErrorType.noInternet ||
        err.data == ApiResponseErrorType.slowOrNoInternet;
  }

  PracticeQuestionEntity _mergeLocalAnswerKey({
    required PracticeQuestionEntity remote,
    required PracticeQuestionEntity local,
  }) {
    final localCorrectByOptionId = <String, bool>{
      for (final opt in local.options)
        if (opt.isCorrect != null) opt.id: opt.isCorrect!,
    };
    final hasRemoteAnswerKey = remote.options.any((opt) => opt.isCorrect != null);

    final mergedOptions = hasRemoteAnswerKey || localCorrectByOptionId.isEmpty
        ? remote.options
        : remote.options
            .map(
              (opt) => opt.copyWith(
                isCorrect: opt.isCorrect ?? localCorrectByOptionId[opt.id],
              ),
            )
            .toList();

    final mergedExplanation =
        (remote.explanation != null && remote.explanation!.hasAnyContent)
            ? remote.explanation
            : local.explanation;

    final mergedRubric =
        (remote.cqRubric != null && !remote.cqRubric!.isEmpty)
            ? remote.cqRubric
            : local.cqRubric;

    return remote.copyWith(
      options: mergedOptions,
      explanation: mergedExplanation,
      cqRubric: mergedRubric,
      boardSource:
          (remote.boardSource != null && remote.boardSource!.isNotEmpty)
              ? remote.boardSource
              : local.boardSource,
    );
  }

  @override
  Future<Either<ErrorResponse, List<PracticeQuestionEntity>>>
      getChapterQuestions({
    required String chapterId,
    String? topicId,
    String? difficulty,
    String? mode,
    String? type,
  }) async {
    final result = await _remoteDataSource.getChapterQuestions(
      chapterId: chapterId,
      topicId: topicId,
      difficulty: difficulty,
      mode: mode,
      type: type,
    );

    return result.fold(
      (err) async {
        final isMistakesMode = mode?.trim().toLowerCase() == 'mistakes';
        if (_isOfflineError(err) && !isMistakesMode) {
          final cached = await _localDataSource.getCachedChapterQuestions(
            chapterId: chapterId,
            topicId: topicId,
            difficulty: difficulty,
            type: type,
          );
          if (cached.isNotEmpty) {
            return Right<ErrorResponse, List<PracticeQuestionEntity>>(cached);
          }
        }
        return Left<ErrorResponse, List<PracticeQuestionEntity>>(err);
      },
      (model) async {
        final entities = model.questions.map((q) => q.toEntity()).toList();
        if (entities.isEmpty) {
          // Preserve genuine empty online results (e.g., mode=mistakes with 0 mistakes).
          return Right<ErrorResponse, List<PracticeQuestionEntity>>(entities);
        }

        final cached = await _localDataSource.getCachedChapterQuestions(
          chapterId: chapterId,
          topicId: topicId,
          difficulty: difficulty,
          type: type,
        );
        if (cached.isEmpty) {
          return Right<ErrorResponse, List<PracticeQuestionEntity>>(entities);
        }

        final cachedById = <String, PracticeQuestionEntity>{
          for (final c in cached) c.id: c,
        };
        final merged = entities.map((remote) {
          final local = cachedById[remote.id];
          if (local == null) return remote;
          return _mergeLocalAnswerKey(remote: remote, local: local);
        }).toList();

        return Right<ErrorResponse, List<PracticeQuestionEntity>>(merged);
      },
    );
  }

  @override
  Future<List<PracticeQuestionEntity>> getCachedChapterQuestions({
    required String chapterId,
    String? topicId,
    String? difficulty,
    String? type,
  }) {
    return _localDataSource.getCachedChapterQuestions(
      chapterId: chapterId,
      topicId: topicId,
      difficulty: difficulty,
      type: type,
    );
  }

  @override
  Future<Either<ErrorResponse, PracticeSubmitResultEntity>> submitPractice({
    required String questionId,
    required String selectedOptionId,
    String? chapterId,
    String? topicId,
    PracticeQuestionEntity? question,
  }) async {
    final result = await _remoteDataSource.submitPractice(
      questionId: questionId,
      selectedOptionId: selectedOptionId,
    );

    return result.fold(
      (err) async {
        if (!_isOfflineError(err)) {
          return Left<ErrorResponse, PracticeSubmitResultEntity>(err);
        }

        var resolvedQuestion = question;
        var hasAnswerKey = resolvedQuestion != null &&
            resolvedQuestion.options.any((opt) => opt.isCorrect == true);

        if (!hasAnswerKey) {
          final cachedById =
              await _localDataSource.getCachedQuestionById(questionId);
          if (cachedById != null &&
              cachedById.options.any((opt) => opt.isCorrect == true)) {
            resolvedQuestion = resolvedQuestion != null
                ? _mergeLocalAnswerKey(
                    remote: resolvedQuestion,
                    local: cachedById,
                  )
                : cachedById;
            hasAnswerKey = resolvedQuestion.options
                .any((opt) => opt.isCorrect == true);
          }
        }

        if (!hasAnswerKey &&
            ((chapterId != null && chapterId.isNotEmpty) ||
                (topicId != null && topicId.isNotEmpty))) {
          final cachedList = await _localDataSource.getCachedChapterQuestions(
            chapterId: chapterId ?? '',
            topicId: topicId,
            type: 'MCQ',
          );
          for (final item in cachedList) {
            if (item.id == questionId &&
                item.options.any((opt) => opt.isCorrect == true)) {
              resolvedQuestion = resolvedQuestion != null
                  ? _mergeLocalAnswerKey(
                      remote: resolvedQuestion,
                      local: item,
                    )
                  : item;
              hasAnswerKey = resolvedQuestion.options
                  .any((opt) => opt.isCorrect == true);
              break;
            }
          }
        }

        if (!hasAnswerKey || resolvedQuestion == null) {
          return Left<ErrorResponse, PracticeSubmitResultEntity>(
            ErrorResponse(
              data: ApiResponseErrorType.noInternet,
              code: 'OFFLINE_NO_ANSWER_KEY',
              message:
                  'Connect to internet or download this chapter for offline practice checking',
            ),
          );
        }

        PracticeOptionEntity? selectedOpt;
        PracticeOptionEntity? correctOpt;
        for (final opt in resolvedQuestion.options) {
          if (opt.id == selectedOptionId) selectedOpt = opt;
          if (opt.isCorrect == true) correctOpt = opt;
        }
        final isCorrect = selectedOpt?.isCorrect == true;
        final resolvedTopicId = resolvedQuestion.topicId.isNotEmpty
            ? resolvedQuestion.topicId
            : topicId;

        await _offlineSyncService.enqueuePracticeAttempt(
          questionId: questionId,
          isCorrect: isCorrect,
          topicId: resolvedTopicId,
          selectedOptionId: selectedOptionId,
        );

        return Right<ErrorResponse, PracticeSubmitResultEntity>(
          PracticeSubmitResultEntity(
            isCorrect: isCorrect,
            correctOptionId: correctOpt?.id,
            explanation: resolvedQuestion.explanation,
            isQueuedOffline: true,
          ),
        );
      },
      (model) {
        return Right<ErrorResponse, PracticeSubmitResultEntity>(
          PracticeSubmitResultEntity(
            isCorrect: model.isCorrect,
            correctOptionId: model.correctOptionId,
            explanation: model.explanation?.toEntity(),
            isQueuedOffline: false,
          ),
        );
      },
    );
  }

  @override
  Future<Either<ErrorResponse, CqSelfAssessResultEntity>> submitCqSelfAssess({
    required String questionId,
    required CqSelfScoresEntity selfScores,
    String? topicId,
  }) async {
    final result = await _remoteDataSource.submitCqSelfAssess(
      questionId: questionId,
      selfScores: selfScores,
    );

    return result.fold(
      (err) async {
        if (!_isOfflineError(err)) {
          return Left<ErrorResponse, CqSelfAssessResultEntity>(err);
        }

        var resolvedTopicId = topicId;
        if (resolvedTopicId == null || resolvedTopicId.isEmpty) {
          final cached =
              await _localDataSource.getCachedQuestionById(questionId);
          if (cached != null && cached.topicId.isNotEmpty) {
            resolvedTopicId = cached.topicId;
          }
        }

        final totalScore = selfScores.totalScore;
        // Enqueue using the backend OfflinePracticeAttemptDto-compatible schema
        // (`questionId`, `topicId`, `isCorrect`, `selectedOptionId`).
        await _offlineSyncService.enqueuePracticeAttempt(
          questionId: questionId,
          isCorrect: totalScore >= 6,
          topicId: resolvedTopicId,
          selectedOptionId:
              'cq:${selfScores.ka},${selfScores.kha},${selfScores.ga},${selfScores.gha}',
        );

        return Right<ErrorResponse, CqSelfAssessResultEntity>(
          CqSelfAssessResultEntity(
            success: true,
            questionId: questionId,
            selfScores: selfScores,
            totalScore: totalScore,
            maxScore: CqSelfScoresEntity.maxTotalScore,
            isQueuedOffline: true,
          ),
        );
      },
      (model) {
        return Right<ErrorResponse, CqSelfAssessResultEntity>(
          CqSelfAssessResultEntity(
            success: model.success,
            questionId:
                model.questionId.isNotEmpty ? model.questionId : questionId,
            selfScores: model.selfScores,
            totalScore: model.totalScore,
            maxScore: model.maxScore,
            isQueuedOffline: false,
          ),
        );
      },
    );
  }
}
