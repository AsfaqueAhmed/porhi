import 'package:network/network.dart';
import 'package:porhi/features/planner/domain/entities/planner_entities.dart';

String _asString(dynamic value, {String fallback = ''}) {
  if (value == null) return fallback;
  final s = value.toString().trim();
  return s.isEmpty ? fallback : s;
}

String? _asNullableString(dynamic value) {
  if (value == null) return null;
  final s = value.toString().trim();
  return s.isEmpty ? null : s;
}

int _asInt(dynamic value, {int fallback = 0}) {
  if (value is int) return value;
  if (value is num) return value.toInt();
  if (value is String) return int.tryParse(value.trim()) ?? fallback;
  return fallback;
}

bool _asBool(dynamic value, {bool fallback = false}) {
  if (value is bool) return value;
  if (value is num) return value != 0;
  if (value is String) {
    final lower = value.trim().toLowerCase();
    if (lower == 'true' || lower == '1') return true;
    if (lower == 'false' || lower == '0') return false;
  }
  return fallback;
}

Map<String, dynamic> _asMap(dynamic value) {
  if (value is Map<String, dynamic>) return value;
  if (value is Map) return Map<String, dynamic>.from(value);
  return <String, dynamic>{};
}

List<dynamic> _asList(dynamic value) {
  if (value is List) return value;
  return const <dynamic>[];
}

class PlannerTaskModel extends BaseResponseModel<PlannerTaskModel> {
  final String id;
  final String titleBangla;
  final String scheduledDate;
  final String? reminderTime;
  final String targetType;
  final String? subjectId;
  final String? chapterId;
  final String? topicId;
  final bool completed;

  PlannerTaskModel({
    required this.id,
    required this.titleBangla,
    required this.scheduledDate,
    this.reminderTime,
    this.targetType = 'CUSTOM',
    this.subjectId,
    this.chapterId,
    this.topicId,
    this.completed = false,
    super.message,
  }) {
    data = this;
  }

  factory PlannerTaskModel.fromJson(Map<String, dynamic> json) {
    final source = json['json'] is Map
        ? Map<String, dynamic>.from(json['json'] as Map)
        : json;
    return PlannerTaskModel(
      id: _asString(source['id']),
      titleBangla: _asString(source['titleBangla']),
      scheduledDate: _asString(source['scheduledDate']),
      reminderTime: _asNullableString(source['reminderTime']),
      targetType: _asString(source['targetType'], fallback: 'CUSTOM'),
      subjectId: _asNullableString(source['subjectId']),
      chapterId: _asNullableString(source['chapterId']),
      topicId: _asNullableString(source['topicId']),
      completed: _asBool(source['completed']),
      message: _asNullableString(json['message']),
    );
  }

  factory PlannerTaskModel.fromEntity(PlannerTaskSummaryEntity entity) {
    return PlannerTaskModel(
      id: entity.id,
      titleBangla: entity.titleBangla,
      scheduledDate: entity.scheduledDate,
      reminderTime: entity.reminderTime,
      targetType: entity.targetType,
      subjectId: entity.subjectId,
      chapterId: entity.chapterId,
      topicId: entity.topicId,
      completed: entity.completed,
    );
  }

  @override
  Map<String, dynamic> toJson() => <String, dynamic>{
        'id': id,
        'titleBangla': titleBangla,
        'scheduledDate': scheduledDate,
        'reminderTime': reminderTime,
        'targetType': targetType,
        'subjectId': subjectId,
        'chapterId': chapterId,
        'topicId': topicId,
        'completed': completed,
      };

  PlannerTaskSummaryEntity toEntity() {
    return PlannerTaskSummaryEntity(
      id: id,
      titleBangla: titleBangla,
      scheduledDate: scheduledDate,
      reminderTime: reminderTime,
      targetType: targetType,
      subjectId: subjectId,
      chapterId: chapterId,
      topicId: topicId,
      completed: completed,
    );
  }
}

class AutoGeneratePlanResponseModel
    extends BaseResponseModel<AutoGeneratePlanResponseModel> {
  final int createdCount;
  final List<PlannerTaskModel> tasks;

  AutoGeneratePlanResponseModel({
    this.createdCount = 0,
    this.tasks = const <PlannerTaskModel>[],
    super.message,
  }) {
    data = this;
  }

  factory AutoGeneratePlanResponseModel.fromJson(Map<String, dynamic> json) {
    final source = json['json'] is Map
        ? Map<String, dynamic>.from(json['json'] as Map)
        : json;
    final parsedTasks = _asList(source['tasks'])
        .map((e) => PlannerTaskModel.fromJson(_asMap(e)))
        .where((t) => t.id.isNotEmpty)
        .toList();
    return AutoGeneratePlanResponseModel(
      createdCount: _asInt(source['createdCount'], fallback: parsedTasks.length),
      tasks: parsedTasks,
      message: _asNullableString(json['message']),
    );
  }

  @override
  Map<String, dynamic> toJson() => <String, dynamic>{
        'createdCount': createdCount,
        'tasks': tasks.map((t) => t.toJson()).toList(),
      };

  AutoGeneratePlanResultEntity toEntity() {
    return AutoGeneratePlanResultEntity(
      createdCount: createdCount,
      tasks: tasks.map((t) => t.toEntity()).toList(),
    );
  }
}

class DeleteStudyTaskResponseModel
    extends BaseResponseModel<DeleteStudyTaskResponseModel> {
  final bool deleted;
  final String id;

  DeleteStudyTaskResponseModel({
    this.deleted = true,
    required this.id,
    super.message,
  }) {
    data = this;
  }

  factory DeleteStudyTaskResponseModel.fromJson(Map<String, dynamic> json) {
    final source = json['json'] is Map
        ? Map<String, dynamic>.from(json['json'] as Map)
        : json;
    return DeleteStudyTaskResponseModel(
      deleted: _asBool(source['deleted'], fallback: true),
      id: _asString(source['id']),
      message: _asNullableString(json['message']),
    );
  }

  @override
  Map<String, dynamic> toJson() => <String, dynamic>{
        'deleted': deleted,
        'id': id,
      };
}
