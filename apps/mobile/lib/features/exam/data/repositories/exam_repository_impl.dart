import 'dart:math';

import 'package:common/common.dart';
import 'package:network/network.dart';
import 'package:porhi/core/sync/offline_sync_service.dart';
import 'package:porhi/features/exam/data/datasources/exam_local_datasource.dart';
import 'package:porhi/features/exam/data/datasources/exam_remote_datasource.dart';
import 'package:porhi/features/exam/domain/entities/exam_entities.dart';
import 'package:porhi/features/exam/domain/repositories/exam_repository.dart';

class ExamRepositoryImpl implements ExamRepository {
  static const String offlineSessionPrefix = 'offline_exam_';

  final ExamRemoteDataSource _remoteDataSource;
  final ExamLocalDataSource _localDataSource;
  final OfflineSyncService _offlineSyncService;

  ExamRepositoryImpl({
    required this._remoteDataSource,
    required this._localDataSource,
    required this._offlineSyncService,
  });

  bool _isOfflineError(ErrorResponse err) {
    return err.data == ApiResponseErrorType.noInternet ||
        err.data == ApiResponseErrorType.slowOrNoInternet;
  }

  bool _isOfflineSessionId(String sessionId) =>
      sessionId.startsWith(offlineSessionPrefix);

  ExamQuestionEntity _mergeLocalDetails({
    required ExamQuestionEntity remote,
    required ExamQuestionEntity local,
  }) {
    final localCorrectByOptionId = <String, bool>{
      for (final opt in local.options)
        if (opt.isCorrect != null) opt.id: opt.isCorrect!,
    };
    final hasRemoteAnswerKey = remote.options.any((o) => o.isCorrect != null);
    final mergedOptions = hasRemoteAnswerKey || localCorrectByOptionId.isEmpty
        ? remote.options
        : remote.options
            .map(
              (o) => o.copyWith(
                isCorrect: o.isCorrect ?? localCorrectByOptionId[o.id],
              ),
            )
            .toList();

    final mergedExplanation =
        (remote.explanation != null && remote.explanation!.hasAnyContent)
            ? remote.explanation
            : local.explanation;

    return remote.copyWith(
      options: mergedOptions,
      explanation: mergedExplanation,
      boardSource: (remote.boardSource != null && remote.boardSource!.isNotEmpty)
          ? remote.boardSource
          : local.boardSource,
    );
  }

  Future<List<ExamQuestionEntity>> _mergeQuestionsWithCache(
    List<ExamQuestionEntity> remoteQuestions,
  ) async {
    if (remoteQuestions.isEmpty) return remoteQuestions;
    final cachedById = await _localDataSource.getCachedQuestionsByIds(
      remoteQuestions.map((q) => q.id).toList(),
    );
    if (cachedById.isEmpty) return remoteQuestions;

    return remoteQuestions.map((remote) {
      final local = cachedById[remote.id];
      return local == null
          ? remote
          : _mergeLocalDetails(remote: remote, local: local);
    }).toList();
  }

  @override
  Future<Either<ErrorResponse, ExamSessionStartEntity>> startExam({
    required ExamTestType testType,
    required String subjectId,
    String? chapterId,
    String? topicId,
    int? questionLimit,
    double negativeRatio = 0.25,
    int? durationSeconds,
  }) async {
    final result = await _remoteDataSource.startExam(
      testType: testType,
      subjectId: subjectId,
      chapterId: chapterId,
      topicId: topicId,
      questionLimit: questionLimit,
      negativeRatio: negativeRatio,
      durationSeconds: durationSeconds,
    );

    return result.fold(
      (err) async {
        if (!_isOfflineError(err)) {
          return Left<ErrorResponse, ExamSessionStartEntity>(err);
        }

        final pool = await _localDataSource.getOfflineQuestionPool(
          testType: testType,
          subjectId: subjectId,
          chapterId: chapterId,
          topicId: topicId,
        );
        if (pool.isEmpty) {
          return Left<ErrorResponse, ExamSessionStartEntity>(
            ErrorResponse(
              data: ApiResponseErrorType.noInternet,
              code: 'OFFLINE_NO_QUESTIONS',
              message:
                  'Connect to internet or download this chapter for offline exam',
            ),
          );
        }

        final shuffled = List<ExamQuestionEntity>.from(pool)..shuffle();
        final effectiveLimit = questionLimit ??
            (testType == ExamTestType.subjectTest ? 25 : shuffled.length);
        final selected = shuffled.take(effectiveLimit).toList();
        final effectiveDuration =
            durationSeconds ?? max(60, selected.length * 60);
        final offlineSessionId =
            '$offlineSessionPrefix${DateTime.now().toUtc().millisecondsSinceEpoch}';

        await _localDataSource.saveOfflineSessionMeta(
          offlineSessionId,
          negativeRatio: negativeRatio,
        );

        return Right<ErrorResponse, ExamSessionStartEntity>(
          ExamSessionStartEntity(
            sessionId: offlineSessionId,
            testType: testType,
            subjectId: subjectId,
            chapterId: testType == ExamTestType.subjectTest ? null : chapterId,
            totalQuestions: selected.length,
            durationSeconds: effectiveDuration,
            negativeRatio: negativeRatio,
            questions: selected,
            isOfflineSession: true,
            startedAt: DateTime.now().toUtc(),
          ),
        );
      },
      (model) async {
        final rawEntity = model.toEntity(
          testType: testType,
          subjectId: subjectId,
          chapterId: testType == ExamTestType.subjectTest ? null : chapterId,
          isOfflineSession: false,
        );
        final mergedQuestions =
            await _mergeQuestionsWithCache(rawEntity.questions);
        return Right<ErrorResponse, ExamSessionStartEntity>(
          ExamSessionStartEntity(
            sessionId: rawEntity.sessionId,
            testType: rawEntity.testType,
            subjectId: rawEntity.subjectId,
            chapterId: rawEntity.chapterId,
            totalQuestions: rawEntity.totalQuestions,
            durationSeconds: rawEntity.durationSeconds,
            negativeRatio: rawEntity.negativeRatio,
            questions: mergedQuestions,
            isOfflineSession: false,
            startedAt: rawEntity.startedAt,
          ),
        );
      },
    );
  }

  @override
  Future<Either<ErrorResponse, void>> sendHeartbeat({
    required String sessionId,
    required List<ExamAnswerInputEntity> answers,
  }) async {
    if (_isOfflineSessionId(sessionId)) {
      return const Right<ErrorResponse, void>(null);
    }
    final res = await _remoteDataSource.heartbeat(
      sessionId: sessionId,
      answers: answers,
    );
    return res.fold(
      Left<ErrorResponse, void>.new,
      (_) => const Right<ErrorResponse, void>(null),
    );
  }

  @override
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
  }) async {
    if (isOfflineSession || _isOfflineSessionId(sessionId)) {
      final result = await _completeOfflineExam(
        sessionId: sessionId,
        answers: answers,
        subjectId: subjectId,
        chapterId: chapterId,
        testType: testType,
        durationSeconds: durationSeconds,
        negativeRatio: negativeRatio,
        questions: questions,
      );
      return Right<ErrorResponse, ExamResultEntity>(result);
    }

    final remoteResult = await _remoteDataSource.submitExam(
      sessionId: sessionId,
      answers: answers,
    );

    return remoteResult.fold(
      (err) async {
        if (!_isOfflineError(err)) {
          return Left<ErrorResponse, ExamResultEntity>(err);
        }
        final offlineResult = await _completeOfflineExam(
          sessionId: sessionId,
          answers: answers,
          subjectId: subjectId,
          chapterId: chapterId,
          testType: testType,
          durationSeconds: durationSeconds,
          negativeRatio: negativeRatio,
          questions: questions,
        );
        return Right<ErrorResponse, ExamResultEntity>(offlineResult);
      },
      (model) async {
        await _localDataSource.deleteExamDraft(sessionId);
        await _localDataSource.deleteOfflineSessionMeta(sessionId);
        return Right<ErrorResponse, ExamResultEntity>(
          model.toResultEntity(
            sessionId: sessionId,
            testType: testType,
            subjectId: subjectId,
            chapterId: chapterId,
          ),
        );
      },
    );
  }

  Future<ExamResultEntity> _completeOfflineExam({
    required String sessionId,
    required List<ExamAnswerInputEntity> answers,
    required String subjectId,
    String? chapterId,
    required ExamTestType testType,
    required int durationSeconds,
    required double negativeRatio,
    required List<ExamQuestionEntity> questions,
  }) async {
    final answerByQuestionId = <String, ExamAnswerInputEntity>{
      for (final a in answers) a.questionId: a,
    };

    final questionIds = questions.isNotEmpty
        ? questions.map((q) => q.id).toList()
        : answers.map((a) => a.questionId).toList();
    final cachedById =
        await _localDataSource.getCachedQuestionsByIds(questionIds);

    final orderedQuestions = questions.isNotEmpty
        ? questions
            .map((q) => cachedById[q.id] != null
                ? _mergeLocalDetails(remote: q, local: cachedById[q.id]!)
                : q)
            .toList()
        : questionIds
            .map((id) => cachedById[id])
            .whereType<ExamQuestionEntity>()
            .toList();

    var correctCount = 0;
    var wrongCount = 0;
    var skippedCount = 0;
    final reviewedAnswers = <ExamReviewedAnswerEntity>[];

    for (final q in orderedQuestions) {
      final userAns = answerByQuestionId[q.id];
      final selectedOptionId =
          (userAns?.selectedOptionId?.trim().isNotEmpty == true)
              ? userAns!.selectedOptionId!.trim()
              : null;
      final timeSpent = userAns?.timeSpent ?? 0;

      String? correctOptionId;
      for (final opt in q.options) {
        if (opt.isCorrect == true) {
          correctOptionId = opt.id;
          break;
        }
      }

      var isCorrect = false;
      if (selectedOptionId == null) {
        skippedCount++;
      } else if (correctOptionId != null && selectedOptionId == correctOptionId) {
        correctCount++;
        isCorrect = true;
      } else {
        wrongCount++;
      }

      reviewedAnswers.add(
        ExamReviewedAnswerEntity(
          questionId: q.id,
          topicId: q.topicId.isNotEmpty ? q.topicId : null,
          stem: q.stem,
          options: q.options,
          selectedOptionId: selectedOptionId,
          correctOptionId: correctOptionId,
          isCorrect: isCorrect,
          explanation: q.explanation,
          timeSpent: timeSpent,
        ),
      );
    }

    final totalQuestions = orderedQuestions.isNotEmpty
        ? orderedQuestions.length
        : answers.length;
    final negativeDeduction =
        double.parse((wrongCount * negativeRatio).toStringAsFixed(4));
    final rawScore = correctCount - negativeDeduction;
    final score = max(0.0, double.parse(rawScore.toStringAsFixed(4)));
    final now = DateTime.now().toUtc();

    final result = ExamResultEntity(
      sessionId: sessionId,
      status: 'COMPLETED',
      testType: testType,
      subjectId: subjectId,
      chapterId: testType == ExamTestType.subjectTest ? null : chapterId,
      score: score,
      totalQuestions: totalQuestions,
      correctCount: correctCount,
      wrongCount: wrongCount,
      skippedCount: skippedCount,
      durationSeconds: durationSeconds,
      negativeRatio: negativeRatio,
      negativeDeduction: negativeDeduction,
      percentile: null,
      completedAt: now,
      answersWithExplanation: reviewedAnswers,
      isQueuedOffline: true,
    );

    await _localDataSource.saveOfflineResult(result);
    await _localDataSource.deleteExamDraft(sessionId);
    await _localDataSource.deleteOfflineSessionMeta(sessionId);

    await _offlineSyncService.enqueueExamSubmission(
      offlineSessionId: sessionId,
      subjectId: subjectId,
      chapterId: testType == ExamTestType.subjectTest ? null : chapterId,
      testType: testType.apiValue,
      durationSeconds: durationSeconds,
      answers: orderedQuestions
          .map(
            (q) => OfflineExamAnswerItem(
              questionId: q.id,
              selectedOptionId: answerByQuestionId[q.id]?.selectedOptionId,
            ),
          )
          .toList(),
      submittedAt: now,
    );

    return result;
  }

  @override
  Future<Either<ErrorResponse, ExamResultEntity>> getSession(
    String sessionId,
  ) async {
    if (_isOfflineSessionId(sessionId)) {
      final cached = await _localDataSource.getOfflineResult(sessionId);
      if (cached != null) {
        return Right<ErrorResponse, ExamResultEntity>(cached);
      }
      return Left<ErrorResponse, ExamResultEntity>(
        ErrorResponse(
          message: 'Offline exam result not found',
          data: ApiResponseErrorType.response,
        ),
      );
    }

    final remote = await _remoteDataSource.getSession(sessionId);
    return remote.fold(
      (err) async {
        if (_isOfflineError(err)) {
          final cached = await _localDataSource.getOfflineResult(sessionId);
          if (cached != null) {
            return Right<ErrorResponse, ExamResultEntity>(cached);
          }
        }
        return Left<ErrorResponse, ExamResultEntity>(err);
      },
      (model) => Right<ErrorResponse, ExamResultEntity>(model.toResultEntity()),
    );
  }

  @override
  Future<void> saveExamDraft(ExamDraftEntity draft) =>
      _localDataSource.saveExamDraft(draft);

  @override
  Future<ExamDraftEntity?> getExamDraft(String sessionId) =>
      _localDataSource.getExamDraft(sessionId);

  @override
  Future<ExamDraftEntity?> getLatestExamDraft() =>
      _localDataSource.getLatestExamDraft();

  @override
  Future<void> deleteExamDraft(String sessionId) async {
    await _localDataSource.deleteExamDraft(sessionId);
    await _localDataSource.deleteOfflineSessionMeta(sessionId);
  }

  @override
  Future<Either<ErrorResponse, ExamResumeDataEntity>> getResumeSessionData(
    ExamDraftEntity draft,
  ) async {
    if (_isOfflineSessionId(draft.sessionId)) {
      return _resumeFromLocalDraft(draft, isOfflineSession: true);
    }

    final remote = await _remoteDataSource.getSession(draft.sessionId);
    return remote.fold(
      (err) async {
        if (_isOfflineError(err)) {
          return _resumeFromLocalDraft(draft, isOfflineSession: false);
        }
        return Left<ErrorResponse, ExamResumeDataEntity>(err);
      },
      (detail) async {
        if (detail.status == 'COMPLETED') {
          await _localDataSource.deleteExamDraft(draft.sessionId);
          return Right<ErrorResponse, ExamResumeDataEntity>(
            ExamResumeDataEntity(completedResult: detail.toResultEntity()),
          );
        }

        final serverSession = detail.toInProgressStartEntity();
        final mergedQuestions =
            await _mergeQuestionsWithCache(serverSession.questions);
        final orderedQuestions = _orderQuestionsByIds(
          mergedQuestions,
          draft.questionIds,
        );
        final mergedAnswers = <String, String?>{
          ...detail.inProgressAnswers,
          ...draft.answers,
        };
        final safeIndex = orderedQuestions.isEmpty
            ? 0
            : draft.currentIndex.clamp(0, orderedQuestions.length - 1);

        return Right<ErrorResponse, ExamResumeDataEntity>(
          ExamResumeDataEntity(
            session: ExamSessionStartEntity(
              sessionId: serverSession.sessionId,
              testType: serverSession.testType,
              subjectId: serverSession.subjectId,
              chapterId: serverSession.chapterId,
              totalQuestions: serverSession.totalQuestions,
              durationSeconds: serverSession.durationSeconds,
              negativeRatio: serverSession.negativeRatio,
              questions: orderedQuestions,
              isOfflineSession: false,
              startedAt: serverSession.startedAt ?? draft.startedAt,
            ),
            answers: mergedAnswers,
            flaggedQuestionIds: draft.flaggedQuestionIds,
            remainingSeconds: max(0, draft.remainingSeconds),
            currentIndex: safeIndex,
          ),
        );
      },
    );
  }

  Future<Either<ErrorResponse, ExamResumeDataEntity>> _resumeFromLocalDraft(
    ExamDraftEntity draft, {
    required bool isOfflineSession,
  }) async {
    final cachedById =
        await _localDataSource.getCachedQuestionsByIds(draft.questionIds);
    final orderedQuestions = <ExamQuestionEntity>[
      for (final qId in draft.questionIds)
        if (cachedById[qId] != null) cachedById[qId]!,
    ];

    if (orderedQuestions.isEmpty) {
      return Left<ErrorResponse, ExamResumeDataEntity>(
        ErrorResponse(
          message: 'Cached questions unavailable to resume exam offline',
          data: ApiResponseErrorType.noInternet,
        ),
      );
    }

    final savedNegRatio =
        await _localDataSource.getOfflineSessionNegativeRatio(draft.sessionId);
    final safeIndex = draft.currentIndex.clamp(0, orderedQuestions.length - 1);

    return Right<ErrorResponse, ExamResumeDataEntity>(
      ExamResumeDataEntity(
        session: ExamSessionStartEntity(
          sessionId: draft.sessionId,
          testType: draft.testType,
          subjectId: draft.subjectId,
          chapterId: draft.chapterId,
          totalQuestions: orderedQuestions.length,
          durationSeconds: draft.totalDurationSeconds,
          negativeRatio: savedNegRatio ?? 0.25,
          questions: orderedQuestions,
          isOfflineSession: isOfflineSession,
          startedAt: draft.startedAt,
        ),
        answers: draft.answers,
        flaggedQuestionIds: draft.flaggedQuestionIds,
        remainingSeconds: max(0, draft.remainingSeconds),
        currentIndex: safeIndex,
      ),
    );
  }

  List<ExamQuestionEntity> _orderQuestionsByIds(
    List<ExamQuestionEntity> questions,
    List<String> desiredOrder,
  ) {
    if (desiredOrder.isEmpty) return questions;
    final byId = <String, ExamQuestionEntity>{
      for (final q in questions) q.id: q,
    };
    final ordered = <ExamQuestionEntity>[];
    for (final id in desiredOrder) {
      final q = byId.remove(id);
      if (q != null) ordered.add(q);
    }
    ordered.addAll(byId.values);
    return ordered;
  }
}
