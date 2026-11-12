import 'package:common/common.dart';
import 'package:network/network.dart';
import 'package:porhi/core/utils/date_time_parser.dart';
import 'package:porhi/features/planner/domain/entities/planner_entities.dart';
import 'package:porhi/features/planner/domain/repositories/planner_repository.dart';

class GetPlannerTasksUseCase {
  final PlannerRepository _repository;

  const GetPlannerTasksUseCase(this._repository);

  Future<Either<ErrorResponse, PlannerOverviewEntity>> call() {
    return _repository.getTasks();
  }
}

class GetCachedPlannerTasksUseCase {
  final PlannerRepository _repository;

  const GetCachedPlannerTasksUseCase(this._repository);

  Future<PlannerOverviewEntity?> call() {
    return _repository.getCachedTasks();
  }
}

class CreateStudyTaskUseCase {
  static const Set<String> allowedTargetTypes = <String>{
    'LESSON',
    'PRACTICE',
    'MODEL_TEST',
    'REVISION',
    'CUSTOM',
  };

  final PlannerRepository _repository;

  const CreateStudyTaskUseCase(this._repository);

  Future<Either<ErrorResponse, PlannerTaskSummaryEntity>> call({
    required String titleBangla,
    required String scheduledDate,
    String? reminderTime,
    String targetType = 'CUSTOM',
    String? subjectId,
    String? chapterId,
    String? topicId,
  }) async {
    final cleanTitle = titleBangla.trim();
    if (cleanTitle.isEmpty) {
      return Left<ErrorResponse, PlannerTaskSummaryEntity>(
        ErrorResponse(
          message: 'অনুগ্রহ করে পড়ার কাজের নাম লেখো।',
          data: ApiResponseErrorType.response,
        ),
      );
    }

    final normalizedDate =
        DateTimeParser.normalizeYyyyMmDd(scheduledDate);
    if (normalizedDate == null) {
      return Left<ErrorResponse, PlannerTaskSummaryEntity>(
        ErrorResponse(
          message: 'সঠিক তারিখ দাও (YYYY-MM-DD)।',
          data: ApiResponseErrorType.response,
        ),
      );
    }

    String? normalizedTime;
    final rawTime = reminderTime?.trim();
    if (rawTime != null && rawTime.isNotEmpty) {
      normalizedTime = DateTimeParser.normalizeHhMm(rawTime);
      if (normalizedTime == null) {
        return Left<ErrorResponse, PlannerTaskSummaryEntity>(
          ErrorResponse(
            message: 'রিমাইন্ডার সময় HH:mm ফরম্যাটে দাও (যেমন ১৮:৩০)।',
            data: ApiResponseErrorType.response,
          ),
        );
      }
    }

    final normalizedType = targetType.trim().toUpperCase();
    final safeType =
        allowedTargetTypes.contains(normalizedType) ? normalizedType : 'CUSTOM';

    String? cleanOptional(String? value) {
      final trimmed = value?.trim();
      return (trimmed != null && trimmed.isNotEmpty) ? trimmed : null;
    }

    return _repository.createTask(
      titleBangla: cleanTitle,
      scheduledDate: normalizedDate,
      reminderTime: normalizedTime,
      targetType: safeType,
      subjectId: cleanOptional(subjectId),
      chapterId: cleanOptional(chapterId),
      topicId: cleanOptional(topicId),
    );
  }
}

class AutoGenerateStudyPlanUseCase {
  final PlannerRepository _repository;

  const AutoGenerateStudyPlanUseCase(this._repository);

  Future<Either<ErrorResponse, AutoGeneratePlanResultEntity>> call({
    String? subjectId,
    String? startDate,
  }) async {
    String? normalizedStartDate;
    final rawDate = startDate?.trim();
    if (rawDate != null && rawDate.isNotEmpty) {
      normalizedStartDate = DateTimeParser.normalizeYyyyMmDd(rawDate);
      if (normalizedStartDate == null) {
        return Left<ErrorResponse, AutoGeneratePlanResultEntity>(
          ErrorResponse(
            message: 'শুরুর তারিখ YYYY-MM-DD ফরম্যাটে হতে হবে।',
            data: ApiResponseErrorType.response,
          ),
        );
      }
    }

    final cleanSubject = subjectId?.trim();
    return _repository.autoGeneratePlan(
      subjectId: (cleanSubject != null && cleanSubject.isNotEmpty)
          ? cleanSubject
          : null,
      startDate: normalizedStartDate,
    );
  }
}

class ToggleStudyTaskCompletionUseCase {
  final PlannerRepository _repository;

  const ToggleStudyTaskCompletionUseCase(this._repository);

  Future<Either<ErrorResponse, PlannerTaskSummaryEntity>> call({
    required String id,
    required bool completed,
  }) async {
    final cleanId = id.trim();
    if (cleanId.isEmpty) {
      return Left<ErrorResponse, PlannerTaskSummaryEntity>(
        ErrorResponse(
          message: 'Task ID is required',
          data: ApiResponseErrorType.response,
        ),
      );
    }
    return _repository.updateTask(id: cleanId, completed: completed);
  }
}

class UpdateStudyTaskUseCase {
  final PlannerRepository _repository;

  const UpdateStudyTaskUseCase(this._repository);

  Future<Either<ErrorResponse, PlannerTaskSummaryEntity>> call({
    required String id,
    bool? completed,
    String? titleBangla,
    String? scheduledDate,
    String? reminderTime,
  }) async {
    final cleanId = id.trim();
    if (cleanId.isEmpty) {
      return Left<ErrorResponse, PlannerTaskSummaryEntity>(
        ErrorResponse(
          message: 'Task ID is required',
          data: ApiResponseErrorType.response,
        ),
      );
    }

    String? cleanTitle;
    if (titleBangla != null) {
      cleanTitle = titleBangla.trim();
      if (cleanTitle.isEmpty) {
        return Left<ErrorResponse, PlannerTaskSummaryEntity>(
          ErrorResponse(
            message: 'অনুগ্রহ করে পড়ার কাজের নাম লেখো।',
            data: ApiResponseErrorType.response,
          ),
        );
      }
    }

    String? normalizedDate;
    if (scheduledDate != null) {
      normalizedDate = DateTimeParser.normalizeYyyyMmDd(scheduledDate);
      if (normalizedDate == null) {
        return Left<ErrorResponse, PlannerTaskSummaryEntity>(
          ErrorResponse(
            message: 'সঠিক তারিখ দাও (YYYY-MM-DD)।',
            data: ApiResponseErrorType.response,
          ),
        );
      }
    }

    // Pass `reminderTime: ''` to explicitly clear an existing reminder; pass
    // `null` to leave the server value untouched.
    String? normalizedTime;
    if (reminderTime != null) {
      final trimmedTime = reminderTime.trim();
      if (trimmedTime.isEmpty) {
        normalizedTime = '';
      } else {
        normalizedTime = DateTimeParser.normalizeHhMm(trimmedTime);
        if (normalizedTime == null) {
          return Left<ErrorResponse, PlannerTaskSummaryEntity>(
            ErrorResponse(
              message: 'রিমাইন্ডার সময় HH:mm ফরম্যাটে দাও।',
              data: ApiResponseErrorType.response,
            ),
          );
        }
      }
    }

    return _repository.updateTask(
      id: cleanId,
      completed: completed,
      titleBangla: cleanTitle,
      scheduledDate: normalizedDate,
      reminderTime: normalizedTime,
    );
  }
}

class DeleteStudyTaskUseCase {
  final PlannerRepository _repository;

  const DeleteStudyTaskUseCase(this._repository);

  Future<Either<ErrorResponse, String>> call(String id) async {
    final cleanId = id.trim();
    if (cleanId.isEmpty) {
      return Left<ErrorResponse, String>(
        ErrorResponse(
          message: 'Task ID is required',
          data: ApiResponseErrorType.response,
        ),
      );
    }
    return _repository.deleteTask(cleanId);
  }
}

/// Returns a non-empty trimmed error message or [fallback] when [rawMessage]
/// is null or blank.
String resolvePlannerErrorMessage(String? rawMessage, String fallback) {
  final trimmed = rawMessage?.trim();
  if (trimmed != null && trimmed.isNotEmpty) {
    return trimmed;
  }
  return fallback;
}
