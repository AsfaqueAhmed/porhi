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

  Future<void> patchLocalBookmarkDelta({
    required String subjectId,
    required String itemId,
    required String itemType,
    required bool bookmarked,
  });
}

class StudentLocalDataSourceImpl implements StudentLocalDataSource {
  static const String _overviewPrefix = 'student_overview_';
  static const String _localDeltaPrefix = 'local_lesson_state_';
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
    final trimmedSubject = subjectId.trim();
    var finalJson = model.toJson();
    final deltaKey = '$_localDeltaPrefix$trimmedSubject';
    final deltaRow = await _database.getStudentCache(deltaKey);
    if (deltaRow != null && deltaRow.payloadJson.trim().isNotEmpty) {
      try {
        final decoded = jsonDecode(deltaRow.payloadJson);
        if (decoded is Map) {
          final delta = Map<String, dynamic>.from(decoded);
          final completed = (finalJson['completedTopicIds'] as List?)
                  ?.map((e) => e.toString())
                  .toList() ??
              <String>[];
          final deltaCompleted = delta['completedTopicIds'];
          if (deltaCompleted is List) {
            for (final id in deltaCompleted.map((e) => e.toString())) {
              if (id.isNotEmpty && !completed.contains(id)) {
                completed.add(id);
              }
            }
          }
          finalJson['completedTopicIds'] = completed;

          final notes = (finalJson['lessonNotes'] is Map)
              ? Map<String, dynamic>.from(finalJson['lessonNotes'] as Map)
              : <String, dynamic>{};
          final deltaNotes = delta['lessonNotes'];
          if (deltaNotes is Map) {
            for (final entry in deltaNotes.entries) {
              notes.putIfAbsent(entry.key.toString(), () => entry.value);
            }
          }
          finalJson['lessonNotes'] = notes;
        }
      } catch (_) {
        // Ignore malformed delta JSON.
      }
      await _database.deleteStudentCache(deltaKey);
    }

    await _database.putStudentCache(
      '$_overviewPrefix$trimmedSubject',
      jsonEncode(finalJson),
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

  @override
  Future<void> patchLocalBookmarkDelta({
    required String subjectId,
    required String itemId,
    required String itemType,
    required bool bookmarked,
  }) async {
    if (itemType != 'topic') return;
    final trimmedSubject = subjectId.trim();
    if (trimmedSubject.isEmpty || itemId.trim().isEmpty) return;

    final key = '$_localDeltaPrefix$trimmedSubject';
    final row = await _database.getStudentCache(key);
    var map = <String, dynamic>{};
    if (row != null && row.payloadJson.trim().isNotEmpty) {
      try {
        final decoded = jsonDecode(row.payloadJson);
        if (decoded is Map) {
          map = Map<String, dynamic>.from(decoded);
        }
      } catch (_) {
        map = <String, dynamic>{};
      }
    }
    final raw = map['bookmarkedTopicIds'];
    final list = raw is List
        ? raw.map((e) => e.toString()).where((s) => s.isNotEmpty).toList()
        : <String>[];
    if (bookmarked) {
      if (!list.contains(itemId)) {
        list.add(itemId);
      }
    } else {
      list.remove(itemId);
    }
    map['bookmarkedTopicIds'] = list;
    await _database.putStudentCache(key, jsonEncode(map));
  }
}
