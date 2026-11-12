import 'package:common/common.dart';
import 'package:network/network.dart';
import 'package:porhi/features/auth/domain/entities/auth_user_entity.dart';
import 'package:porhi/features/dashboard/domain/entities/student_overview_entity.dart';
import 'package:porhi/features/dashboard/domain/repositories/student_repository.dart';

class GetOverviewUseCase {
  final StudentRepository _repository;

  const GetOverviewUseCase(this._repository);

  Future<Either<ErrorResponse, StudentOverviewEntity>> call({
    required String subjectId,
  }) {
    return _repository.getOverview(subjectId: subjectId);
  }
}

class GetCachedOverviewUseCase {
  final StudentRepository _repository;

  const GetCachedOverviewUseCase(this._repository);

  Future<StudentOverviewEntity?> call({required String subjectId}) {
    return _repository.getCachedOverview(subjectId: subjectId);
  }
}

class GetPlannerSummaryUseCase {
  final StudentRepository _repository;

  const GetPlannerSummaryUseCase(this._repository);

  Future<Either<ErrorResponse, PlannerOverviewEntity>> call() {
    return _repository.getPlannerSummary();
  }
}

class GetCachedPlannerSummaryUseCase {
  final StudentRepository _repository;

  const GetCachedPlannerSummaryUseCase(this._repository);

  Future<PlannerOverviewEntity?> call() {
    return _repository.getCachedPlannerSummary();
  }
}

class GetQuickSearchCatalogUseCase {
  final StudentRepository _repository;

  const GetQuickSearchCatalogUseCase(this._repository);

  Future<Either<ErrorResponse, List<QuickSearchTopicEntity>>> call({
    required String subjectId,
  }) {
    return _repository.getQuickSearchCatalog(subjectId: subjectId);
  }
}

class GetCachedQuickSearchCatalogUseCase {
  final StudentRepository _repository;

  const GetCachedQuickSearchCatalogUseCase(this._repository);

  Future<List<QuickSearchTopicEntity>> call({required String subjectId}) {
    return _repository.getCachedQuickSearchCatalog(subjectId: subjectId);
  }
}

class FilterQuickSearchTopicsUseCase {
  const FilterQuickSearchTopicsUseCase();

  List<QuickSearchTopicEntity> call({
    required List<QuickSearchTopicEntity> items,
    required String query,
    Set<String> completedTopicIds = const <String>{},
    int limit = 25,
  }) {
    final normalized = query.trim().toLowerCase();
    final results = <QuickSearchTopicEntity>[];

    for (final item in items) {
      final matchesQuery = normalized.isEmpty ||
          item.topicTitle.toLowerCase().contains(normalized) ||
          item.chapterTitle.toLowerCase().contains(normalized) ||
          ((normalized.contains('lab') || normalized.contains('ল্যাব')) &&
              item.hasInteractiveLab);
      if (matchesQuery) {
        final completed =
            item.isCompleted || completedTopicIds.contains(item.topicId);
        results.add(
          completed == item.isCompleted
              ? item
              : item.copyWith(isCompleted: completed),
        );
        if (results.length >= limit) {
          break;
        }
      }
    }

    return results;
  }
}

class MarkLessonCompleteUseCase {
  final StudentRepository _repository;

  const MarkLessonCompleteUseCase(this._repository);

  Future<Either<ErrorResponse, void>> call({
    required String topicId,
    String? lessonId,
    int? timeSpentSeconds,
  }) {
    return _repository.markLessonComplete(
      topicId: topicId,
      lessonId: lessonId,
      timeSpentSeconds: timeSpentSeconds,
    );
  }
}

class ToggleBookmarkUseCase {
  final StudentRepository _repository;

  const ToggleBookmarkUseCase(this._repository);

  Future<Either<ErrorResponse, bool>> call({
    required String itemId,
    required String itemType,
    required String titleBangla,
    String? subtitleBangla,
    required String href,
  }) {
    return _repository.toggleBookmark(
      itemId: itemId,
      itemType: itemType,
      titleBangla: titleBangla,
      subtitleBangla: subtitleBangla,
      href: href,
    );
  }
}

class PatchCachedBookmarkUseCase {
  final StudentRepository _repository;

  const PatchCachedBookmarkUseCase(this._repository);

  Future<void> call({
    required String subjectId,
    required String itemId,
    required String itemType,
    required String titleBangla,
    String? subtitleBangla,
    required String href,
    required bool bookmarked,
  }) {
    return _repository.syncCachedBookmark(
      subjectId: subjectId,
      itemId: itemId,
      itemType: itemType,
      titleBangla: titleBangla,
      subtitleBangla: subtitleBangla,
      href: href,
      bookmarked: bookmarked,
    );
  }
}

class SaveNoteUseCase {
  final StudentRepository _repository;

  const SaveNoteUseCase(this._repository);

  Future<Either<ErrorResponse, String>> call({
    required String topicId,
    required String content,
  }) {
    return _repository.saveNote(topicId: topicId, content: content);
  }
}

class SubmitFeedbackUseCase {
  final StudentRepository _repository;

  const SubmitFeedbackUseCase(this._repository);

  Future<Either<ErrorResponse, void>> call({
    required String contentType,
    required String contentId,
    required bool helpful,
    String? comment,
  }) {
    return _repository.submitFeedback(
      contentType: contentType,
      contentId: contentId,
      helpful: helpful,
      comment: comment,
    );
  }
}

class CreateShareLinkUseCase {
  final StudentRepository _repository;

  const CreateShareLinkUseCase(this._repository);

  Future<Either<ErrorResponse, GuardianShareLinkEntity>> call({
    required String audience,
    String? recipientLabel,
  }) {
    return _repository.createShareLink(
      audience: audience,
      recipientLabel: recipientLabel,
    );
  }
}

class ListShareLinksUseCase {
  final StudentRepository _repository;

  const ListShareLinksUseCase(this._repository);

  Future<Either<ErrorResponse, List<GuardianShareLinkEntity>>> call() {
    return _repository.listShareLinks();
  }
}

class RevokeShareLinkUseCase {
  final StudentRepository _repository;

  const RevokeShareLinkUseCase(this._repository);

  Future<Either<ErrorResponse, GuardianShareLinkEntity>> call(String id) {
    return _repository.revokeShareLink(id);
  }
}

class FlushOfflineSyncUseCase {
  final StudentRepository _repository;

  const FlushOfflineSyncUseCase(this._repository);

  Future<Either<ErrorResponse, int>> call() {
    return _repository.syncOffline();
  }
}

class GetPendingSyncCountUseCase {
  final StudentRepository _repository;

  const GetPendingSyncCountUseCase(this._repository);

  int call() => _repository.pendingSyncCount;
}

class WatchPendingSyncCountUseCase {
  final StudentRepository _repository;

  const WatchPendingSyncCountUseCase(this._repository);

  Stream<int> call() => _repository.watchPendingSyncCount();
}

class GetActiveSubjectIdUseCase {
  final StudentRepository _repository;

  const GetActiveSubjectIdUseCase(this._repository);

  String call(StudentTrack? fallbackTrack) {
    return _repository.getActiveSubjectId(fallbackTrack);
  }
}

class SetActiveSubjectIdUseCase {
  final StudentRepository _repository;

  const SetActiveSubjectIdUseCase(this._repository);

  Future<void> call(String subjectId) {
    return _repository.setActiveSubjectId(subjectId);
  }
}
