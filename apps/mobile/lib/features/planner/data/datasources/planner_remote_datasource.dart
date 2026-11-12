import 'package:common/common.dart';
import 'package:network/network.dart';
import 'package:porhi/features/dashboard/data/models/student_overview_model.dart';
import 'package:porhi/features/planner/data/models/planner_models.dart';

abstract class PlannerRemoteDataSource {
  Future<Either<ErrorResponse, PlannerOverviewModel>> getTasks();

  Future<Either<ErrorResponse, PlannerTaskModel>> createTask({
    required String titleBangla,
    required String scheduledDate,
    String? reminderTime,
    String targetType = 'CUSTOM',
    String? subjectId,
    String? chapterId,
    String? topicId,
  });

  Future<Either<ErrorResponse, AutoGeneratePlanResponseModel>> autoGeneratePlan({
    String? subjectId,
    String? startDate,
  });

  Future<Either<ErrorResponse, PlannerTaskModel>> updateTask({
    required String id,
    bool? completed,
    String? titleBangla,
    String? scheduledDate,
    String? reminderTime,
  });

  Future<Either<ErrorResponse, DeleteStudyTaskResponseModel>> deleteTask(
    String id,
  );
}

class PlannerRemoteDataSourceImpl extends BaseRepository
    implements PlannerRemoteDataSource {
  @override
  Future<Either<ErrorResponse, PlannerOverviewModel>> getTasks() {
    return get<PlannerOverviewModel>(
      path: '/planner',
      responseCompiler: PlannerOverviewModel.fromJson,
    );
  }

  @override
  Future<Either<ErrorResponse, PlannerTaskModel>> createTask({
    required String titleBangla,
    required String scheduledDate,
    String? reminderTime,
    String targetType = 'CUSTOM',
    String? subjectId,
    String? chapterId,
    String? topicId,
  }) {
    return post<PlannerTaskModel>(
      path: '/planner',
      data: <String, dynamic>{
        'titleBangla': titleBangla,
        'scheduledDate': scheduledDate,
        'reminderTime': ?reminderTime,
        'targetType': targetType,
        'subjectId': ?subjectId,
        'chapterId': ?chapterId,
        'topicId': ?topicId,
      },
      responseCompiler: PlannerTaskModel.fromJson,
    );
  }

  @override
  Future<Either<ErrorResponse, AutoGeneratePlanResponseModel>> autoGeneratePlan({
    String? subjectId,
    String? startDate,
  }) {
    return post<AutoGeneratePlanResponseModel>(
      path: '/planner/auto-generate',
      data: <String, dynamic>{
        'subjectId': ?subjectId,
        'startDate': ?startDate,
      },
      responseCompiler: AutoGeneratePlanResponseModel.fromJson,
    );
  }

  @override
  Future<Either<ErrorResponse, PlannerTaskModel>> updateTask({
    required String id,
    bool? completed,
    String? titleBangla,
    String? scheduledDate,
    String? reminderTime,
  }) {
    return patch<PlannerTaskModel>(
      path: '/planner/${Uri.encodeComponent(id)}',
      data: <String, dynamic>{
        'completed': ?completed,
        'titleBangla': ?titleBangla,
        'scheduledDate': ?scheduledDate,
        'reminderTime': ?reminderTime,
      },
      responseCompiler: PlannerTaskModel.fromJson,
    );
  }

  @override
  Future<Either<ErrorResponse, DeleteStudyTaskResponseModel>> deleteTask(
    String id,
  ) {
    return delete<DeleteStudyTaskResponseModel>(
      path: '/planner/${Uri.encodeComponent(id)}',
      responseCompiler: DeleteStudyTaskResponseModel.fromJson,
    );
  }
}
