import 'package:common/common.dart';
import 'package:network/network.dart';
import 'package:porhi/features/auth/domain/entities/auth_user_entity.dart';
import 'package:porhi/features/curriculum/data/datasources/curriculum_local_datasource.dart';
import 'package:porhi/features/curriculum/data/datasources/curriculum_remote_datasource.dart';
import 'package:porhi/features/curriculum/domain/entities/curriculum_entities.dart';
import 'package:porhi/features/curriculum/domain/repositories/curriculum_repository.dart';
import 'package:porhi/features/dashboard/domain/entities/student_overview_entity.dart';

class CurriculumRepositoryImpl implements CurriculumRepository {
  final CurriculumRemoteDataSource _remoteDataSource;
  final CurriculumLocalDataSource _localDataSource;

  CurriculumRepositoryImpl({
    required this._remoteDataSource,
    required this._localDataSource,
  });

  @override
  Future<Either<ErrorResponse, List<SubjectEntity>>> getSubjects({
    String? program,
  }) async {
    final result = await _remoteDataSource.getSubjects(program: program);
    return result.fold(
      (err) async {
        final cached = await _localDataSource.getCachedSubjects(
          program: program,
        );
        if (cached != null && cached.subjects.isNotEmpty) {
          return Right<ErrorResponse, List<SubjectEntity>>(
            cached.toEntities(isFromCache: true),
          );
        }
        return Left<ErrorResponse, List<SubjectEntity>>(err);
      },
      (model) async {
        await _localDataSource.cacheSubjects(model, program: program);
        return Right<ErrorResponse, List<SubjectEntity>>(
          model.toEntities(isFromCache: false),
        );
      },
    );
  }

  @override
  Future<List<SubjectEntity>> getCachedSubjects({String? program}) async {
    final cached = await _localDataSource.getCachedSubjects(program: program);
    return cached?.toEntities(isFromCache: true) ?? const <SubjectEntity>[];
  }

  @override
  Future<Either<ErrorResponse, List<ChapterEntity>>> getChapters(
    String subjectId,
  ) async {
    final result = await _remoteDataSource.getChaptersBySubject(subjectId);
    return result.fold(
      (err) async {
        final offlineChapters = await getCachedChapters(subjectId);
        if (offlineChapters.isNotEmpty) {
          return Right<ErrorResponse, List<ChapterEntity>>(offlineChapters);
        }
        return Left<ErrorResponse, List<ChapterEntity>>(err);
      },
      (model) async {
        await _localDataSource.cacheChapters(subjectId, model);
        return Right<ErrorResponse, List<ChapterEntity>>(model.toEntities());
      },
    );
  }

  @override
  Future<List<ChapterEntity>> getCachedChapters(String subjectId) async {
    final cached = await _localDataSource.getCachedChapters(subjectId);
    final downloaded = await _localDataSource.getDownloadedChapters(
      subjectId: subjectId,
    );

    final byId = <String, ChapterEntity>{};
    if (cached != null) {
      for (final ch in cached.toEntities()) {
        byId[ch.id] = ch;
      }
    }
    for (final dl in downloaded) {
      byId.putIfAbsent(dl.chapterId, dl.toChapterEntity);
    }

    final merged = byId.values.toList()
      ..sort((a, b) => a.orderIndex.compareTo(b.orderIndex));
    return merged;
  }

  @override
  Future<Either<ErrorResponse, OfflineChapterPackEntity>> downloadChapterPack(
    String chapterId, {
    int? orderIndex,
  }) async {
    final result = await _remoteDataSource.getOfflineChapterPack(chapterId);
    return result.fold(
      Left<ErrorResponse, OfflineChapterPackEntity>.new,
      (model) async {
        final sizeBytes = await _localDataSource.saveOfflineChapterPack(
          model,
          orderIndex: orderIndex,
        );
        return Right<ErrorResponse, OfflineChapterPackEntity>(
          model.toEntity(sizeBytes: sizeBytes),
        );
      },
    );
  }

  @override
  Future<void> removeChapterPack(String chapterId) {
    return _localDataSource.removeChapterPack(chapterId);
  }

  @override
  Future<bool> isChapterDownloaded(String chapterId) {
    return _localDataSource.isChapterDownloaded(chapterId);
  }

  @override
  Future<List<DownloadedChapterEntity>> getDownloadedChapters({
    String? subjectId,
  }) {
    return _localDataSource.getDownloadedChapters(subjectId: subjectId);
  }

  @override
  Future<OfflineChapterPackEntity?> getOfflineChapterPack(String chapterId) {
    return _localDataSource.getOfflineChapterPack(chapterId);
  }

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
