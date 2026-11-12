import 'package:common/common.dart';
import 'package:network/network.dart';
import 'package:porhi/features/auth/domain/entities/auth_user_entity.dart';
import 'package:porhi/features/dashboard/domain/entities/student_overview_entity.dart';

/// Domain contract for student dashboard, bookmarks, notes, guardian sharing,
/// quick search catalog, and offline activity synchronization.
abstract class StudentRepository {
  Future<Either<ErrorResponse, StudentOverviewEntity>> getOverview({
    required String subjectId,
  });

  Future<StudentOverviewEntity?> getCachedOverview({
    required String subjectId,
  });

  Future<Either<ErrorResponse, PlannerOverviewEntity>> getPlannerSummary();

  Future<PlannerOverviewEntity?> getCachedPlannerSummary();

  Future<Either<ErrorResponse, List<QuickSearchTopicEntity>>>
      getQuickSearchCatalog({required String subjectId});

  Future<List<QuickSearchTopicEntity>> getCachedQuickSearchCatalog({
    required String subjectId,
  });

  Future<Either<ErrorResponse, void>> markLessonComplete({
    required String topicId,
    String? lessonId,
    int? timeSpentSeconds,
  });

  Future<Either<ErrorResponse, bool>> toggleBookmark({
    required String itemId,
    required String itemType,
    required String titleBangla,
    String? subtitleBangla,
    required String href,
  });

  Future<Either<ErrorResponse, String>> saveNote({
    required String topicId,
    required String content,
  });

  Future<Either<ErrorResponse, void>> submitFeedback({
    required String contentType,
    required String contentId,
    required bool helpful,
    String? comment,
  });

  Future<Either<ErrorResponse, GuardianShareLinkEntity>> createShareLink({
    required String audience,
    String? recipientLabel,
  });

  Future<Either<ErrorResponse, List<GuardianShareLinkEntity>>> listShareLinks();

  Future<Either<ErrorResponse, GuardianShareLinkEntity>> revokeShareLink(
    String id,
  );

  Future<Either<ErrorResponse, int>> syncOffline();

  int get pendingSyncCount;

  Stream<int> watchPendingSyncCount();

  String getActiveSubjectId(StudentTrack? fallbackTrack);

  Future<void> setActiveSubjectId(String subjectId);
}
