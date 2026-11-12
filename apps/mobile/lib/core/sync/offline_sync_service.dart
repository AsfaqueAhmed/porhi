import 'dart:async';
import 'dart:convert';
import 'dart:math';

import 'package:common/common.dart';
import 'package:get/get.dart';
import 'package:network/network.dart';
import 'package:porhi/core/database/app_database.dart';

typedef SyncOfflineCallback =
    Future<Either<ErrorResponse, void>> Function(OfflineSyncPayload payload);

class OfflineLessonCompleteItem {
  final String offlineEventId;
  final String topicId;
  final String? chapterId;
  final String? subjectId;
  final String? completedAt;

  const OfflineLessonCompleteItem({
    required this.offlineEventId,
    required this.topicId,
    this.chapterId,
    this.subjectId,
    this.completedAt,
  });

  factory OfflineLessonCompleteItem.fromJson(Map<String, dynamic> json) {
    return OfflineLessonCompleteItem(
      offlineEventId: json['offlineEventId'] as String,
      topicId: json['topicId'] as String,
      chapterId: json['chapterId'] as String?,
      subjectId: json['subjectId'] as String?,
      completedAt: json['completedAt'] as String?,
    );
  }

  Map<String, dynamic> toJson() => <String, dynamic>{
        'offlineEventId': offlineEventId,
        'topicId': topicId,
        if (chapterId != null) 'chapterId': chapterId,
        if (subjectId != null) 'subjectId': subjectId,
        if (completedAt != null) 'completedAt': completedAt,
      };
}

class OfflinePracticeAttemptItem {
  final String offlineEventId;
  final String questionId;
  final String? topicId;
  final bool isCorrect;
  final String? selectedOptionId;
  final String? attemptedAt;

  const OfflinePracticeAttemptItem({
    required this.offlineEventId,
    required this.questionId,
    this.topicId,
    required this.isCorrect,
    this.selectedOptionId,
    this.attemptedAt,
  });

  factory OfflinePracticeAttemptItem.fromJson(Map<String, dynamic> json) {
    return OfflinePracticeAttemptItem(
      offlineEventId: json['offlineEventId'] as String,
      questionId: json['questionId'] as String,
      topicId: json['topicId'] as String?,
      isCorrect: json['isCorrect'] as bool? ?? false,
      selectedOptionId: json['selectedOptionId'] as String?,
      attemptedAt: json['attemptedAt'] as String?,
    );
  }

  Map<String, dynamic> toJson() => <String, dynamic>{
        'offlineEventId': offlineEventId,
        'questionId': questionId,
        if (topicId != null) 'topicId': topicId,
        'isCorrect': isCorrect,
        'selectedOptionId': selectedOptionId,
        if (attemptedAt != null) 'attemptedAt': attemptedAt,
      };
}

class OfflineExamAnswerItem {
  final String questionId;
  final String? selectedOptionId;

  const OfflineExamAnswerItem({
    required this.questionId,
    this.selectedOptionId,
  });

  factory OfflineExamAnswerItem.fromJson(Map<String, dynamic> json) {
    return OfflineExamAnswerItem(
      questionId: json['questionId'] as String,
      selectedOptionId: json['selectedOptionId'] as String?,
    );
  }

  Map<String, dynamic> toJson() => <String, dynamic>{
        'questionId': questionId,
        'selectedOptionId': selectedOptionId,
      };
}

class OfflineExamSubmissionItem {
  final String offlineSessionId;
  final String subjectId;
  final String? chapterId;
  final String? testType;
  final int? durationSeconds;
  final List<OfflineExamAnswerItem> answers;
  final String? submittedAt;

  const OfflineExamSubmissionItem({
    required this.offlineSessionId,
    required this.subjectId,
    this.chapterId,
    this.testType,
    this.durationSeconds,
    required this.answers,
    this.submittedAt,
  });

  factory OfflineExamSubmissionItem.fromJson(Map<String, dynamic> json) {
    final rawAnswers = json['answers'] as List<dynamic>? ?? const [];
    return OfflineExamSubmissionItem(
      offlineSessionId: json['offlineSessionId'] as String,
      subjectId: json['subjectId'] as String,
      chapterId: json['chapterId'] as String?,
      testType: json['testType'] as String?,
      durationSeconds: (json['durationSeconds'] as num?)?.toInt(),
      answers: rawAnswers
          .map(
            (e) => OfflineExamAnswerItem.fromJson(
              Map<String, dynamic>.from(e as Map),
            ),
          )
          .toList(),
      submittedAt: json['submittedAt'] as String?,
    );
  }

  Map<String, dynamic> toJson() => <String, dynamic>{
        'offlineSessionId': offlineSessionId,
        'subjectId': subjectId,
        if (chapterId != null) 'chapterId': chapterId,
        if (testType != null) 'testType': testType,
        if (durationSeconds != null) 'durationSeconds': durationSeconds,
        'answers': answers.map((a) => a.toJson()).toList(),
        if (submittedAt != null) 'submittedAt': submittedAt,
      };
}

/// Batched payload matching backend `POST /student/sync-offline` DTO contract.
class OfflineSyncPayload {
  final List<OfflineLessonCompleteItem> lessonCompletes;
  final List<OfflinePracticeAttemptItem> practiceAttempts;
  final List<OfflineExamSubmissionItem> examSubmissions;

  const OfflineSyncPayload({
    this.lessonCompletes = const [],
    this.practiceAttempts = const [],
    this.examSubmissions = const [],
  });

  bool get isEmpty =>
      lessonCompletes.isEmpty &&
      practiceAttempts.isEmpty &&
      examSubmissions.isEmpty;

  Map<String, dynamic> toJson() => <String, dynamic>{
        if (lessonCompletes.isNotEmpty)
          'lessonCompletes': lessonCompletes.map((e) => e.toJson()).toList(),
        if (practiceAttempts.isNotEmpty)
          'practiceAttempts': practiceAttempts.map((e) => e.toJson()).toList(),
        if (examSubmissions.isNotEmpty)
          'examSubmissions': examSubmissions.map((e) => e.toJson()).toList(),
      };
}

/// Coordinates durable offline activity queueing and idempotent batch syncing
/// against an injected sync handler (never calling Dio directly).
class OfflineSyncService extends GetxService {
  static const String typeLessonComplete = 'lesson_complete';
  static const String typePracticeAttempt = 'practice_attempt';
  static const String typeExamSubmission = 'exam_submission';

  final AppDatabase _database;
  SyncOfflineCallback? _syncHandler;
  final RxInt pendingCount = 0.obs;

  StreamSubscription<int>? _countSubscription;
  Future<Either<ErrorResponse, int>>? _inFlightFlush;
  final Random _random = Random();

  OfflineSyncService({
    required this._database,
    this._syncHandler,
  });

  void setSyncHandler(SyncOfflineCallback handler) {
    _syncHandler = handler;
  }

  Future<OfflineSyncService> init() async {
    await refreshPendingCount();
    _countSubscription ??= _database.watchPendingSyncCount().listen(
      (count) => pendingCount.value = count,
    );
    return this;
  }

  Future<void> refreshPendingCount() async {
    pendingCount.value = await _database.getPendingSyncCount();
  }

  String _generateEventId(String prefix) {
    final micros = DateTime.now().toUtc().microsecondsSinceEpoch;
    final salt = _random.nextInt(1 << 20);
    return '$prefix-$micros-$salt';
  }

  Future<void> enqueueLessonComplete({
    required String topicId,
    String? chapterId,
    String? subjectId,
    String? offlineEventId,
    DateTime? completedAt,
  }) async {
    final eventId = offlineEventId ?? _generateEventId('lesson');
    final item = OfflineLessonCompleteItem(
      offlineEventId: eventId,
      topicId: topicId,
      chapterId: chapterId,
      subjectId: subjectId,
      completedAt: (completedAt ?? DateTime.now().toUtc())
          .toUtc()
          .toIso8601String(),
    );
    await _database.enqueueSyncItem(
      eventId: eventId,
      eventType: typeLessonComplete,
      payloadJson: jsonEncode(item.toJson()),
    );
    await refreshPendingCount();
  }

  Future<void> enqueuePracticeAttempt({
    required String questionId,
    required bool isCorrect,
    String? topicId,
    String? selectedOptionId,
    String? offlineEventId,
    DateTime? attemptedAt,
  }) async {
    final eventId = offlineEventId ?? _generateEventId('practice');
    final item = OfflinePracticeAttemptItem(
      offlineEventId: eventId,
      questionId: questionId,
      topicId: topicId,
      isCorrect: isCorrect,
      selectedOptionId: selectedOptionId,
      attemptedAt: (attemptedAt ?? DateTime.now().toUtc())
          .toUtc()
          .toIso8601String(),
    );
    await _database.enqueueSyncItem(
      eventId: eventId,
      eventType: typePracticeAttempt,
      payloadJson: jsonEncode(item.toJson()),
    );
    await refreshPendingCount();
  }

  Future<void> enqueueExamSubmission({
    required String offlineSessionId,
    required String subjectId,
    String? chapterId,
    String? testType,
    int? durationSeconds,
    required List<OfflineExamAnswerItem> answers,
    DateTime? submittedAt,
  }) async {
    final item = OfflineExamSubmissionItem(
      offlineSessionId: offlineSessionId,
      subjectId: subjectId,
      chapterId: chapterId,
      testType: testType,
      durationSeconds: durationSeconds,
      answers: answers,
      submittedAt: (submittedAt ?? DateTime.now().toUtc())
          .toUtc()
          .toIso8601String(),
    );
    await _database.enqueueSyncItem(
      eventId: offlineSessionId,
      eventType: typeExamSubmission,
      payloadJson: jsonEncode(item.toJson()),
    );
    await refreshPendingCount();
  }

  /// Flushes all currently queued items via [_syncHandler].
  ///
  /// Only the snapshot of rows sent in this batch is deleted on `Right`;
  /// items enqueued while the request is in flight remain untouched. On `Left`,
  /// all queued rows are preserved and their retry metadata is incremented.
  Future<Either<ErrorResponse, int>> flushPendingQueue() {
    final active = _inFlightFlush;
    if (active != null) {
      return active;
    }
    final future = _performFlush();
    _inFlightFlush = future;
    future.whenComplete(() {
      if (identical(_inFlightFlush, future)) {
        _inFlightFlush = null;
      }
    });
    return future;
  }

  Future<Either<ErrorResponse, int>> _performFlush() async {
    final pendingRows = await _database.getPendingSyncItems();
    if (pendingRows.isEmpty) {
      await refreshPendingCount();
      return const Right(0);
    }

    final handler = _syncHandler;
    if (handler == null) {
      return Left(
        ErrorResponse(
          message: 'Offline sync handler is not configured',
          data: ApiResponseErrorType.serverError,
        ),
      );
    }

    final payload = _buildPayload(pendingRows);
    final rowIds = pendingRows.map((row) => row.id).toList();

    Either<ErrorResponse, void> response;
    try {
      response = await handler(payload);
    } catch (error) {
      response = Left(
        ErrorResponse(
          message: error.toString(),
          data: ApiResponseErrorType.serverError,
        ),
      );
    }

    switch (response) {
      case Left<ErrorResponse, void>(value: final error):
        await _database.markSyncRetryFailed(
          rowIds,
          errorMessage: error.message,
        );
        await refreshPendingCount();
        return Left(error);
      case Right<ErrorResponse, void>():
        await _database.deleteSyncItemsByIds(rowIds);
        await refreshPendingCount();
        return Right(rowIds.length);
    }
  }

  OfflineSyncPayload _buildPayload(List<SyncQueueData> rows) {
    final lessons = <OfflineLessonCompleteItem>[];
    final attempts = <OfflinePracticeAttemptItem>[];
    final exams = <OfflineExamSubmissionItem>[];

    for (final row in rows) {
      final decoded = Map<String, dynamic>.from(
        jsonDecode(row.payloadJson) as Map,
      );
      switch (row.eventType) {
        case typeLessonComplete:
          lessons.add(OfflineLessonCompleteItem.fromJson(decoded));
          break;
        case typePracticeAttempt:
          attempts.add(OfflinePracticeAttemptItem.fromJson(decoded));
          break;
        case typeExamSubmission:
          exams.add(OfflineExamSubmissionItem.fromJson(decoded));
          break;
      }
    }

    return OfflineSyncPayload(
      lessonCompletes: lessons,
      practiceAttempts: attempts,
      examSubmissions: exams,
    );
  }

  @override
  void onClose() {
    _countSubscription?.cancel();
    _countSubscription = null;
    super.onClose();
  }
}
