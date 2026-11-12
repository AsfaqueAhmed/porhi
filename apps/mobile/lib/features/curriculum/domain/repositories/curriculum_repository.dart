import 'package:common/common.dart';
import 'package:network/network.dart';
import 'package:porhi/features/auth/domain/entities/auth_user_entity.dart';
import 'package:porhi/features/curriculum/domain/entities/curriculum_entities.dart';

/// Repository contract for the 5-track subject catalog, chapter/topic index,
/// and transactional offline chapter pack downloads.
abstract class CurriculumRepository {
  Future<Either<ErrorResponse, List<SubjectEntity>>> getSubjects({
    String? program,
  });

  Future<List<SubjectEntity>> getCachedSubjects({String? program});

  Future<Either<ErrorResponse, List<ChapterEntity>>> getChapters(
    String subjectId,
  );

  Future<List<ChapterEntity>> getCachedChapters(String subjectId);

  Future<Either<ErrorResponse, OfflineChapterPackEntity>> downloadChapterPack(
    String chapterId, {
    int? orderIndex,
  });

  Future<void> removeChapterPack(String chapterId);

  Future<bool> isChapterDownloaded(String chapterId);

  Future<List<DownloadedChapterEntity>> getDownloadedChapters({
    String? subjectId,
  });

  Future<OfflineChapterPackEntity?> getOfflineChapterPack(String chapterId);

  String getActiveSubjectId(StudentTrack? fallbackTrack);

  Future<void> setActiveSubjectId(String subjectId);
}
