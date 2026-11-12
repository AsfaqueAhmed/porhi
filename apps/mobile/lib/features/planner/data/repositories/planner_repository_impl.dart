import 'package:common/common.dart';
import 'package:network/network.dart';
import 'package:porhi/features/planner/data/datasources/planner_local_datasource.dart';
import 'package:porhi/features/planner/data/datasources/planner_remote_datasource.dart';
import 'package:porhi/features/planner/domain/entities/planner_entities.dart';
import 'package:porhi/features/planner/domain/repositories/planner_repository.dart';

class PlannerRepositoryImpl implements PlannerRepository {
  final PlannerRemoteDataSource _remoteDataSource;
  final PlannerLocalDataSource _localDataSource;

  PlannerRepositoryImpl({
    required this._remoteDataSource,
    required this._localDataSource,
  });

  @override
  Future<Either<ErrorResponse, PlannerOverviewEntity>> getTasks() async {
    final result = await _remoteDataSource.getTasks();
    return result.fold(
      Left<ErrorResponse, PlannerOverviewEntity>.new,
      (model) async {
        await _localDataSource.cacheTasks(model);
        return Right<ErrorResponse, PlannerOverviewEntity>(model.toEntity());
      },
    );
  }

  @override
  Future<PlannerOverviewEntity?> getCachedTasks() async {
    final cached = await _localDataSource.getCachedTasks();
    return cached?.toEntity(isFromCache: true);
  }

  @override
  Future<Either<ErrorResponse, PlannerTaskSummaryEntity>> createTask({
    required String titleBangla,
    required String scheduledDate,
    String? reminderTime,
    String targetType = 'CUSTOM',
    String? subjectId,
    String? chapterId,
    String? topicId,
  }) async {
    final result = await _remoteDataSource.createTask(
      titleBangla: titleBangla,
      scheduledDate: scheduledDate,
      reminderTime: reminderTime,
      targetType: targetType,
      subjectId: subjectId,
      chapterId: chapterId,
      topicId: topicId,
    );
    return result.fold(
      Left<ErrorResponse, PlannerTaskSummaryEntity>.new,
      (model) async {
        final entity = model.toEntity();
        await _localDataSource.upsertCachedTask(entity);
        return Right<ErrorResponse, PlannerTaskSummaryEntity>(entity);
      },
    );
  }

  @override
  Future<Either<ErrorResponse, AutoGeneratePlanResultEntity>> autoGeneratePlan({
    String? subjectId,
    String? startDate,
  }) async {
    final result = await _remoteDataSource.autoGeneratePlan(
      subjectId: subjectId,
      startDate: startDate,
    );
    return result.fold(
      Left<ErrorResponse, AutoGeneratePlanResultEntity>.new,
      (model) async {
        final entity = model.toEntity();
        for (final task in entity.tasks) {
          await _localDataSource.upsertCachedTask(task);
        }
        return Right<ErrorResponse, AutoGeneratePlanResultEntity>(entity);
      },
    );
  }

  @override
  Future<Either<ErrorResponse, PlannerTaskSummaryEntity>> updateTask({
    required String id,
    bool? completed,
    String? titleBangla,
    String? scheduledDate,
    String? reminderTime,
  }) async {
    final result = await _remoteDataSource.updateTask(
      id: id,
      completed: completed,
      titleBangla: titleBangla,
      scheduledDate: scheduledDate,
      reminderTime: reminderTime,
    );
    return result.fold(
      Left<ErrorResponse, PlannerTaskSummaryEntity>.new,
      (model) async {
        final entity = model.toEntity();
        await _localDataSource.upsertCachedTask(entity);
        return Right<ErrorResponse, PlannerTaskSummaryEntity>(entity);
      },
    );
  }

  @override
  Future<Either<ErrorResponse, String>> deleteTask(String id) async {
    final result = await _remoteDataSource.deleteTask(id);
    return result.fold(
      Left<ErrorResponse, String>.new,
      (model) async {
        final deletedId = model.id.isNotEmpty ? model.id : id;
        await _localDataSource.removeCachedTask(deletedId);
        return Right<ErrorResponse, String>(deletedId);
      },
    );
  }
}
