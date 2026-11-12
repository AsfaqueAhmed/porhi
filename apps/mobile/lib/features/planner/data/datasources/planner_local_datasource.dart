import 'dart:convert';

import 'package:porhi/core/database/app_database.dart';
import 'package:porhi/core/storage/preferences_storage_service.dart';
import 'package:porhi/features/dashboard/data/models/student_overview_model.dart';
import 'package:porhi/features/planner/data/models/planner_models.dart';
import 'package:porhi/features/planner/domain/entities/planner_entities.dart';

abstract class PlannerLocalDataSource {
  Future<void> cacheTasks(PlannerOverviewModel model);

  Future<PlannerOverviewModel?> getCachedTasks();

  Future<void> upsertCachedTask(PlannerTaskSummaryEntity task);

  Future<void> removeCachedTask(String taskId);
}

class PlannerLocalDataSourceImpl implements PlannerLocalDataSource {
  static const String _plannerCacheKey = 'planner_summary';
  static const String remindersEnabledKey = 'porhi_study_reminders_enabled';

  final AppDatabase _database;
  final PreferencesStorageService _preferencesStorage;

  PlannerLocalDataSourceImpl({
    required this._database,
    required this._preferencesStorage,
  });

  bool getRemindersEnabled() {
    return _preferencesStorage.getBool(
      remindersEnabledKey,
      defaultValue: true,
    );
  }

  Future<void> setRemindersEnabled(bool enabled) async {
    await _preferencesStorage.setBool(remindersEnabledKey, enabled);
  }

  @override
  Future<void> cacheTasks(PlannerOverviewModel model) async {
    await _database.putStudentCache(
      _plannerCacheKey,
      jsonEncode(model.toJson()),
    );
  }

  @override
  Future<PlannerOverviewModel?> getCachedTasks() async {
    final row = await _database.getStudentCache(_plannerCacheKey);
    if (row == null || row.payloadJson.trim().isEmpty) return null;
    try {
      final decoded = jsonDecode(row.payloadJson);
      if (decoded is Map) {
        return PlannerOverviewModel.fromJson(
          Map<String, dynamic>.from(decoded),
        );
      }
    } catch (_) {
      // Ignore malformed cache JSON.
    }
    return null;
  }

  @override
  Future<void> upsertCachedTask(PlannerTaskSummaryEntity task) async {
    final existing = await getCachedTasks();
    final list = List<Map<String, dynamic>>.from(
      existing?.tasks ?? const <Map<String, dynamic>>[],
    );
    final newJson = PlannerTaskModel.fromEntity(task).toJson();
    final idx = list.indexWhere((e) => e['id']?.toString() == task.id);
    if (idx >= 0) {
      list[idx] = newJson;
    } else {
      list.add(newJson);
    }
    await cacheTasks(
      PlannerOverviewModel(
        tasks: list,
        todayDueCount: _computeTodayDueCount(list),
      ),
    );
  }

  @override
  Future<void> removeCachedTask(String taskId) async {
    final existing = await getCachedTasks();
    if (existing == null) return;
    final list = existing.tasks
        .where((e) => e['id']?.toString() != taskId)
        .toList();
    await cacheTasks(
      PlannerOverviewModel(
        tasks: list,
        todayDueCount: _computeTodayDueCount(list),
      ),
    );
  }

  int _computeTodayDueCount(List<Map<String, dynamic>> rawTasks) {
    final today = DateTime.now().toIso8601String().substring(0, 10);
    var count = 0;
    for (final raw in rawTasks) {
      final completed = raw['completed'] == true;
      final date = raw['scheduledDate']?.toString() ?? '';
      if (!completed && date.isNotEmpty && date.compareTo(today) <= 0) {
        count++;
      }
    }
    return count;
  }
}
