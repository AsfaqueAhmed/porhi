import 'package:common/common.dart';
import 'package:network/network.dart';
import 'package:porhi/features/planner/domain/entities/planner_entities.dart';

abstract class PlannerRepository {
  Future<Either<ErrorResponse, PlannerOverviewEntity>> getTasks();

  Future<PlannerOverviewEntity?> getCachedTasks();

  Future<Either<ErrorResponse, PlannerTaskSummaryEntity>> createTask({
    required String titleBangla,
    required String scheduledDate,
    String? reminderTime,
    String targetType = 'CUSTOM',
    String? subjectId,
    String? chapterId,
    String? topicId,
  });

  Future<Either<ErrorResponse, AutoGeneratePlanResultEntity>> autoGeneratePlan({
    String? subjectId,
    String? startDate,
  });

  Future<Either<ErrorResponse, PlannerTaskSummaryEntity>> updateTask({
    required String id,
    bool? completed,
    String? titleBangla,
    String? scheduledDate,
    String? reminderTime,
  });

  Future<Either<ErrorResponse, String>> deleteTask(String id);
}
