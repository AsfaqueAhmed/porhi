import 'dart:convert';

import 'package:porhi/core/database/app_database.dart';
import 'package:porhi/core/storage/preferences_storage_service.dart';
import 'package:porhi/features/dashboard/data/models/student_overview_model.dart';

abstract class StudentLocalDataSource {
  Future<void> cacheOverview(String subjectId, StudentOverviewModel model);

  Future<StudentOverviewModel?> getCachedOverview(String subjectId);

  Future<void> cachePlannerSummary(PlannerOverviewModel model);

  Future<PlannerOverviewModel?> getCachedPlannerSummary();

  Future<void> cacheQuickSearchCatalog(
    String subjectId,
    QuickSearchCatalogModel model,
  );

  Future<QuickSearchCatalogModel?> getCachedQuickSearchCatalog(
    String subjectId,
  );

  String? getActiveSubjectId();

  Future<void> setActiveSubjectId(String subjectId);
}

class StudentLocalDataSourceImpl implements StudentLocalDataSource {
  static const String _overviewPrefix = 'student_overview_';
  static const String _plannerKey = 'planner_summary';
  static const String _searchPrefix = 'quick_search_';

  final AppDatabase _database;
  final PreferencesStorageService _preferencesStorage;

  StudentLocalDataSourceImpl({
    required this._database,
    required this._preferencesStorage,
  });

  @override
  Future<void> cacheOverview(
    String subjectId,
    StudentOverviewModel model,
  ) async {
    await _database.putStudentCache(
      '$_overviewPrefix$subjectId',
      jsonEncode(model.toJson()),
    );
  }

  @override
  Future<StudentOverviewModel?> getCachedOverview(String subjectId) async {
    final row = await _database.getStudentCache('$_overviewPrefix$subjectId');
    if (row == null || row.payloadJson.trim().isEmpty) return null;
    try {
      final decoded = jsonDecode(row.payloadJson);
      if (decoded is Map) {
        return StudentOverviewModel.fromJson(
          Map<String, dynamic>.from(decoded),
        );
      }
    } catch (_) {
      // Ignore corrupted local cache JSON.
    }
    return null;
  }

  @override
  Future<void> cachePlannerSummary(PlannerOverviewModel model) async {
    await _database.putStudentCache(
      _plannerKey,
      jsonEncode(model.toJson()),
    );
  }

  @override
  Future<PlannerOverviewModel?> getCachedPlannerSummary() async {
    final row = await _database.getStudentCache(_plannerKey);
    if (row == null || row.payloadJson.trim().isEmpty) return null;
    try {
      final decoded = jsonDecode(row.payloadJson);
      if (decoded is Map) {
        return PlannerOverviewModel.fromJson(
          Map<String, dynamic>.from(decoded),
        );
      }
    } catch (_) {
      // Ignore corrupted local cache JSON.
    }
    return null;
  }

  @override
  Future<void> cacheQuickSearchCatalog(
    String subjectId,
    QuickSearchCatalogModel model,
  ) async {
    await _database.putStudentCache(
      '$_searchPrefix$subjectId',
      jsonEncode(model.toJson()),
    );
  }

  @override
  Future<QuickSearchCatalogModel?> getCachedQuickSearchCatalog(
    String subjectId,
  ) async {
    final row = await _database.getStudentCache('$_searchPrefix$subjectId');
    if (row == null || row.payloadJson.trim().isEmpty) return null;
    try {
      final decoded = jsonDecode(row.payloadJson);
      if (decoded is Map) {
        return QuickSearchCatalogModel.fromJson(
          Map<String, dynamic>.from(decoded),
          fallbackSubjectId: subjectId,
        );
      }
    } catch (_) {
      // Ignore corrupted local cache JSON.
    }
    return null;
  }

  @override
  String? getActiveSubjectId() {
    final value = _preferencesStorage.read(
      PreferencesStorageService.activeSubjectIdKey,
    );
    if (value == null || value.trim().isEmpty) return null;
    return value.trim();
  }

  @override
  Future<void> setActiveSubjectId(String subjectId) async {
    await _preferencesStorage.write(
      PreferencesStorageService.activeSubjectIdKey,
      subjectId.trim(),
    );
  }
}
