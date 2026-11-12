import 'package:common/common.dart';
import 'package:network/network.dart';
import 'package:porhi/core/sync/offline_sync_service.dart';
import 'package:porhi/features/auth/domain/entities/auth_user_entity.dart';
import 'package:porhi/features/dashboard/data/datasources/student_local_datasource.dart';
import 'package:porhi/features/dashboard/data/datasources/student_remote_datasource.dart';
import 'package:porhi/features/dashboard/data/models/student_overview_model.dart';
import 'package:porhi/features/dashboard/domain/entities/student_overview_entity.dart';
import 'package:porhi/features/dashboard/domain/repositories/student_repository.dart';

class StudentRepositoryImpl implements StudentRepository {
  final StudentRemoteDataSource _remoteDataSource;
  final StudentLocalDataSource _localDataSource;
  final OfflineSyncService _offlineSyncService;

  StudentRepositoryImpl({
    required this._remoteDataSource,
    required this._localDataSource,
    required this._offlineSyncService,
  });

  @override
  Future<Either<ErrorResponse, StudentOverviewEntity>> getOverview({
    required String subjectId,
  }) async {
    final result = await _remoteDataSource.getOverview(subjectId);
    return result.fold(
      (err) async {
        final cached = await _localDataSource.getCachedOverview(subjectId);
        if (cached != null) {
          return Right<ErrorResponse, StudentOverviewEntity>(
            cached.toEntity(isFromCache: true),
          );
        }
        return Left<ErrorResponse, StudentOverviewEntity>(err);
      },
      (model) async {
        await _localDataSource.cacheOverview(subjectId, model);
        return Right<ErrorResponse, StudentOverviewEntity>(
          model.toEntity(isFromCache: false),
        );
      },
    );
  }

  @override
  Future<StudentOverviewEntity?> getCachedOverview({
    required String subjectId,
  }) async {
    final cached = await _localDataSource.getCachedOverview(subjectId);
    return cached?.toEntity(isFromCache: true);
  }

  @override
  Future<Either<ErrorResponse, PlannerOverviewEntity>>
      getPlannerSummary() async {
    final result = await _remoteDataSource.getPlannerSummary();
    return result.fold(
      (err) async {
        final cached = await _localDataSource.getCachedPlannerSummary();
        if (cached != null) {
          return Right<ErrorResponse, PlannerOverviewEntity>(
            cached.toEntity(isFromCache: true),
          );
        }
        return Left<ErrorResponse, PlannerOverviewEntity>(err);
      },
      (model) async {
        await _localDataSource.cachePlannerSummary(model);
        return Right<ErrorResponse, PlannerOverviewEntity>(
          model.toEntity(isFromCache: false),
        );
      },
    );
  }

  @override
  Future<PlannerOverviewEntity?> getCachedPlannerSummary() async {
    final cached = await _localDataSource.getCachedPlannerSummary();
    return cached?.toEntity(isFromCache: true);
  }

  @override
  Future<Either<ErrorResponse, List<QuickSearchTopicEntity>>>
      getQuickSearchCatalog({required String subjectId}) async {
    final result = await _remoteDataSource.getChaptersForSearch(subjectId);
    return result.fold(
      (err) async {
        final cached =
            await _localDataSource.getCachedQuickSearchCatalog(subjectId);
        if (cached != null) {
          return Right<ErrorResponse, List<QuickSearchTopicEntity>>(
            cached.toEntities(),
          );
        }
        return Left<ErrorResponse, List<QuickSearchTopicEntity>>(err);
      },
      (model) async {
        await _localDataSource.cacheQuickSearchCatalog(subjectId, model);
        return Right<ErrorResponse, List<QuickSearchTopicEntity>>(
          model.toEntities(),
        );
      },
    );
  }

  @override
  Future<List<QuickSearchTopicEntity>> getCachedQuickSearchCatalog({
    required String subjectId,
  }) async {
    final cached =
        await _localDataSource.getCachedQuickSearchCatalog(subjectId);
    return cached?.toEntities() ?? const <QuickSearchTopicEntity>[];
  }

  @override
  Future<Either<ErrorResponse, void>> markLessonComplete({
    required String topicId,
    String? lessonId,
    int? timeSpentSeconds,
  }) async {
    final result = await _remoteDataSource.markLessonComplete(
      topicId: topicId,
      lessonId: lessonId,
      timeSpentSeconds: timeSpentSeconds,
    );
    return result.fold(
      (err) => Left<ErrorResponse, void>(err),
      (_) => const Right<ErrorResponse, void>(null),
    );
  }

  @override
  Future<Either<ErrorResponse, bool>> toggleBookmark({
    required String itemId,
    required String itemType,
    required String titleBangla,
    String? subtitleBangla,
    required String href,
  }) async {
    final result = await _remoteDataSource.toggleBookmark(
      itemId: itemId,
      itemType: itemType,
      titleBangla: titleBangla,
      subtitleBangla: subtitleBangla,
      href: href,
    );
    return result.fold(
      (err) => Left<ErrorResponse, bool>(err),
      (model) => Right<ErrorResponse, bool>(model.bookmarked),
    );
  }

  @override
  Future<void> syncCachedBookmark({
    required String subjectId,
    required String itemId,
    required String itemType,
    required String titleBangla,
    String? subtitleBangla,
    required String href,
    required bool bookmarked,
  }) async {
    final cached = await _localDataSource.getCachedOverview(subjectId);
    if (cached == null) {
      await _localDataSource.patchLocalBookmarkDelta(
        subjectId: subjectId,
        itemId: itemId,
        itemType: itemType,
        bookmarked: bookmarked,
      );
      return;
    }
    final updatedBookmarks = cached.bookmarks
        .where(
          (b) => !(b['id']?.toString() == itemId &&
              b['type']?.toString() == itemType),
        )
        .toList();
    if (bookmarked) {
      updatedBookmarks.insert(0, <String, dynamic>{
        'id': itemId,
        'type': itemType,
        'titleBangla': titleBangla,
        'subtitleBangla': subtitleBangla ?? '',
        'href': href,
        'createdAt': DateTime.now().toUtc().toIso8601String(),
      });
    }
    final updatedModel = StudentOverviewModel(
      subjectId: cached.subjectId,
      curriculumTotals: cached.curriculumTotals,
      completedTopicIds: cached.completedTopicIds,
      lastStudiedTopic: cached.lastStudiedTopic,
      practiceStats: cached.practiceStats,
      streakDays: cached.streakDays,
      studyDates: cached.studyDates,
      dueMistakes: cached.dueMistakes,
      weakTopics: cached.weakTopics,
      recentExams: cached.recentExams,
      bookmarks: updatedBookmarks,
      lessonNotes: cached.lessonNotes,
      message: cached.message,
    );
    await _localDataSource.cacheOverview(subjectId, updatedModel);
  }

  @override
  Future<Either<ErrorResponse, String>> saveNote({
    required String topicId,
    required String content,
  }) async {
    final result = await _remoteDataSource.saveNote(
      topicId: topicId,
      content: content,
    );
    return result.fold(
      (err) => Left<ErrorResponse, String>(err),
      (model) => Right<ErrorResponse, String>(model.content),
    );
  }

  @override
  Future<Either<ErrorResponse, void>> submitFeedback({
    required String contentType,
    required String contentId,
    required bool helpful,
    String? comment,
  }) async {
    final result = await _remoteDataSource.submitFeedback(
      contentType: contentType,
      contentId: contentId,
      helpful: helpful,
      comment: comment,
    );
    return result.fold(
      (err) => Left<ErrorResponse, void>(err),
      (_) => const Right<ErrorResponse, void>(null),
    );
  }

  @override
  Future<Either<ErrorResponse, GuardianShareLinkEntity>> createShareLink({
    required String audience,
    String? recipientLabel,
  }) async {
    final result = await _remoteDataSource.createShareLink(
      audience: audience,
      recipientLabel: recipientLabel,
    );
    return result.fold(
      (err) => Left<ErrorResponse, GuardianShareLinkEntity>(err),
      (model) => Right<ErrorResponse, GuardianShareLinkEntity>(model.toEntity()),
    );
  }

  @override
  Future<Either<ErrorResponse, List<GuardianShareLinkEntity>>>
      listShareLinks() async {
    final result = await _remoteDataSource.listShareLinks();
    return result.fold(
      (err) => Left<ErrorResponse, List<GuardianShareLinkEntity>>(err),
      (model) => Right<ErrorResponse, List<GuardianShareLinkEntity>>(
        model.links.map((e) => e.toEntity()).toList(),
      ),
    );
  }

  @override
  Future<Either<ErrorResponse, GuardianShareLinkEntity>> revokeShareLink(
    String id,
  ) async {
    final result = await _remoteDataSource.revokeShareLink(id);
    return result.fold(
      (err) => Left<ErrorResponse, GuardianShareLinkEntity>(err),
      (model) => Right<ErrorResponse, GuardianShareLinkEntity>(model.toEntity()),
    );
  }

  @override
  Future<Either<ErrorResponse, int>> syncOffline() {
    return _offlineSyncService.flushPendingQueue();
  }

  @override
  int get pendingSyncCount => _offlineSyncService.pendingCount.value;

  @override
  Stream<int> watchPendingSyncCount() => _offlineSyncService.pendingCount.stream;

  @override
  String getActiveSubjectId(StudentTrack? fallbackTrack) {
    final saved = _localDataSource.getActiveSubjectId();
    if (saved != null && saved.isNotEmpty) return saved;
    return StudentOverviewEntity.defaultSubjectIdForTrack(fallbackTrack);
  }

  @override
  Future<void> setActiveSubjectId(String subjectId) {
    return _localDataSource.setActiveSubjectId(subjectId);
  }
}
