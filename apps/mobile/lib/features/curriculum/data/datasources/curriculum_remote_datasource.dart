import 'package:common/common.dart';
import 'package:network/network.dart';
import 'package:porhi/features/curriculum/data/models/curriculum_models.dart';

abstract class CurriculumRemoteDataSource {
  Future<Either<ErrorResponse, SubjectListModel>> getSubjects({
    String? classLevel,
    String? program,
  });

  Future<Either<ErrorResponse, ChapterListModel>> getChaptersBySubject(
    String subjectId,
  );

  Future<Either<ErrorResponse, OfflineChapterPackModel>> getOfflineChapterPack(
    String chapterId,
  );
}

class CurriculumRemoteDataSourceImpl extends BaseRepository
    implements CurriculumRemoteDataSource {
  @override
  Future<Either<ErrorResponse, SubjectListModel>> getSubjects({
    String? classLevel,
    String? program,
  }) {
    final query = <String, String>{};
    if (classLevel != null && classLevel.trim().isNotEmpty) {
      query['classLevel'] = classLevel.trim();
    }
    if (program != null && program.trim().isNotEmpty && program != 'ALL') {
      query['program'] = program.trim();
    }
    return get<SubjectListModel>(
      path: '/curriculum/subjects',
      queryParameters: query.isEmpty ? null : query,
      responseCompiler: SubjectListModel.fromJson,
    );
  }

  @override
  Future<Either<ErrorResponse, ChapterListModel>> getChaptersBySubject(
    String subjectId,
  ) {
    return get<ChapterListModel>(
      path: '/curriculum/subjects/${Uri.encodeComponent(subjectId)}/chapters',
      responseCompiler: (json) => ChapterListModel.fromJson(
        json,
        fallbackSubjectId: subjectId,
      ),
    );
  }

  @override
  Future<Either<ErrorResponse, OfflineChapterPackModel>> getOfflineChapterPack(
    String chapterId,
  ) {
    return get<OfflineChapterPackModel>(
      path: '/curriculum/chapter/${Uri.encodeComponent(chapterId)}/offline-pack',
      responseCompiler: OfflineChapterPackModel.fromJson,
    );
  }
}
