import 'package:common/common.dart';
import 'package:network/network.dart';
import 'package:porhi/features/dashboard/data/models/student_overview_model.dart';

abstract class StudentRemoteDataSource {
  Future<Either<ErrorResponse, StudentOverviewModel>> getOverview(
    String subjectId,
  );

  Future<Either<ErrorResponse, PlannerOverviewModel>> getPlannerSummary();

  Future<Either<ErrorResponse, QuickSearchCatalogModel>> getChaptersForSearch(
    String subjectId,
  );

  Future<Either<ErrorResponse, StudentAckModel>> markLessonComplete({
    required String topicId,
    String? lessonId,
    int? timeSpentSeconds,
  });

  Future<Either<ErrorResponse, ToggleBookmarkResponseModel>> toggleBookmark({
    required String itemId,
    required String itemType,
    required String titleBangla,
    String? subtitleBangla,
    required String href,
  });

  Future<Either<ErrorResponse, SaveNoteResponseModel>> saveNote({
    required String topicId,
    required String content,
  });

  Future<Either<ErrorResponse, StudentAckModel>> submitFeedback({
    required String contentType,
    required String contentId,
    required bool helpful,
    String? comment,
  });

  Future<Either<ErrorResponse, GuardianShareLinkModel>> createShareLink({
    required String audience,
    String? recipientLabel,
  });

  Future<Either<ErrorResponse, GuardianShareLinkListModel>> listShareLinks();

  Future<Either<ErrorResponse, GuardianShareLinkModel>> revokeShareLink(
    String id,
  );
}

class StudentRemoteDataSourceImpl extends BaseRepository
    implements StudentRemoteDataSource {
  @override
  Future<Either<ErrorResponse, StudentOverviewModel>> getOverview(
    String subjectId,
  ) {
    return get<StudentOverviewModel>(
      path: '/student/overview',
      queryParameters: <String, String>{'subjectId': subjectId},
      responseCompiler: StudentOverviewModel.fromJson,
    );
  }

  @override
  Future<Either<ErrorResponse, PlannerOverviewModel>> getPlannerSummary() {
    return get<PlannerOverviewModel>(
      path: '/planner',
      responseCompiler: PlannerOverviewModel.fromJson,
    );
  }

  @override
  Future<Either<ErrorResponse, QuickSearchCatalogModel>> getChaptersForSearch(
    String subjectId,
  ) {
    return get<QuickSearchCatalogModel>(
      path: '/curriculum/subjects/${Uri.encodeComponent(subjectId)}/chapters',
      responseCompiler: (json) => QuickSearchCatalogModel.fromJson(
        json,
        fallbackSubjectId: subjectId,
      ),
    );
  }

  @override
  Future<Either<ErrorResponse, StudentAckModel>> markLessonComplete({
    required String topicId,
    String? lessonId,
    int? timeSpentSeconds,
  }) {
    return post<StudentAckModel>(
      path: '/student/lesson-complete',
      data: <String, dynamic>{
        'topicId': topicId,
        'lessonId': ?lessonId,
        'timeSpentSeconds': ?timeSpentSeconds,
      },
      responseCompiler: StudentAckModel.fromJson,
    );
  }

  @override
  Future<Either<ErrorResponse, ToggleBookmarkResponseModel>> toggleBookmark({
    required String itemId,
    required String itemType,
    required String titleBangla,
    String? subtitleBangla,
    required String href,
  }) {
    return post<ToggleBookmarkResponseModel>(
      path: '/student/bookmarks/toggle',
      data: <String, dynamic>{
        'itemId': itemId,
        'itemType': itemType,
        'titleBangla': titleBangla,
        'subtitleBangla': ?subtitleBangla,
        'href': href,
      },
      responseCompiler: ToggleBookmarkResponseModel.fromJson,
    );
  }

  @override
  Future<Either<ErrorResponse, SaveNoteResponseModel>> saveNote({
    required String topicId,
    required String content,
  }) {
    return post<SaveNoteResponseModel>(
      path: '/student/notes',
      data: <String, dynamic>{
        'topicId': topicId,
        'content': content,
      },
      responseCompiler: SaveNoteResponseModel.fromJson,
    );
  }

  @override
  Future<Either<ErrorResponse, StudentAckModel>> submitFeedback({
    required String contentType,
    required String contentId,
    required bool helpful,
    String? comment,
  }) {
    return post<StudentAckModel>(
      path: '/student/feedback',
      data: <String, dynamic>{
        'contentType': contentType,
        'contentId': contentId,
        'helpful': helpful,
        'comment': ?comment,
      },
      responseCompiler: StudentAckModel.fromJson,
    );
  }

  @override
  Future<Either<ErrorResponse, GuardianShareLinkModel>> createShareLink({
    required String audience,
    String? recipientLabel,
  }) {
    return post<GuardianShareLinkModel>(
      path: '/student/share-links',
      data: <String, dynamic>{
        'audience': audience,
        'recipientLabel': ?recipientLabel,
      },
      responseCompiler: GuardianShareLinkModel.fromJson,
    );
  }

  @override
  Future<Either<ErrorResponse, GuardianShareLinkListModel>> listShareLinks() {
    return get<GuardianShareLinkListModel>(
      path: '/student/share-links',
      responseCompiler: GuardianShareLinkListModel.fromJson,
    );
  }

  @override
  Future<Either<ErrorResponse, GuardianShareLinkModel>> revokeShareLink(
    String id,
  ) {
    return delete<GuardianShareLinkModel>(
      path: '/student/share-links/${Uri.encodeComponent(id)}',
      responseCompiler: GuardianShareLinkModel.fromJson,
    );
  }
}
