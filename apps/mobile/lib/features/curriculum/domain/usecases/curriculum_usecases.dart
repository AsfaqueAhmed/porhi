import 'package:common/common.dart';
import 'package:network/network.dart';
import 'package:porhi/features/auth/domain/entities/auth_user_entity.dart';
import 'package:porhi/features/curriculum/domain/entities/curriculum_entities.dart';
import 'package:porhi/features/curriculum/domain/repositories/curriculum_repository.dart';

class GetSubjectsUseCase {
  final CurriculumRepository _repository;

  const GetSubjectsUseCase(this._repository);

  Future<Either<ErrorResponse, List<SubjectEntity>>> call({String? program}) {
    return _repository.getSubjects(program: program);
  }
}

class GetCachedSubjectsUseCase {
  final CurriculumRepository _repository;

  const GetCachedSubjectsUseCase(this._repository);

  Future<List<SubjectEntity>> call({String? program}) {
    return _repository.getCachedSubjects(program: program);
  }
}

class FilterSubjectsUseCase {
  const FilterSubjectsUseCase();

  List<SubjectEntity> call({
    required List<SubjectEntity> subjects,
    StudentTrack? trackFilter,
    String query = '',
  }) {
    final normalized = query.trim().toLowerCase();
    return subjects.where((subject) {
      final matchesProgram =
          trackFilter == null || subject.program == trackFilter;
      if (!matchesProgram) return false;
      if (normalized.isEmpty) return true;
      return subject.nameBangla.toLowerCase().contains(normalized) ||
          subject.code.toLowerCase().contains(normalized) ||
          subject.program.apiValue.toLowerCase().contains(normalized) ||
          subject.program.labelBn.toLowerCase().contains(normalized) ||
          subject.program.labelEn.toLowerCase().contains(normalized);
    }).toList();
  }
}

class GetChaptersUseCase {
  final CurriculumRepository _repository;

  const GetChaptersUseCase(this._repository);

  Future<Either<ErrorResponse, List<ChapterEntity>>> call(String subjectId) {
    return _repository.getChapters(subjectId);
  }
}

class GetCachedChaptersUseCase {
  final CurriculumRepository _repository;

  const GetCachedChaptersUseCase(this._repository);

  Future<List<ChapterEntity>> call(String subjectId) {
    return _repository.getCachedChapters(subjectId);
  }
}

class FilterChaptersUseCase {
  const FilterChaptersUseCase();

  List<ChapterEntity> call({
    required List<ChapterEntity> chapters,
    String query = '',
    TopicFilterMode filterMode = TopicFilterMode.all,
    Set<String> completedTopicIds = const <String>{},
    Set<String> bookmarkedTopicIds = const <String>{},
  }) {
    final normalized = query.trim().toLowerCase();
    final filtered = <ChapterEntity>[];

    for (final chapter in chapters) {
      final chapterTitleMatches = normalized.isNotEmpty &&
          chapter.titleBangla.toLowerCase().contains(normalized);

      final matchingTopics = chapter.topics.where((topic) {
        final matchesQuery = normalized.isEmpty ||
            chapterTitleMatches ||
            topic.titleBangla.toLowerCase().contains(normalized);
        if (!matchesQuery) return false;

        switch (filterMode) {
          case TopicFilterMode.all:
            return true;
          case TopicFilterMode.lab:
            return topic.isInteractiveLab;
          case TopicFilterMode.incomplete:
            return !completedTopicIds.contains(topic.id);
          case TopicFilterMode.bookmarked:
            return bookmarkedTopicIds.contains(topic.id);
        }
      }).toList();

      if (matchingTopics.isNotEmpty ||
          (filterMode == TopicFilterMode.all && normalized.isEmpty)) {
        filtered.add(chapter.copyWith(topics: matchingTopics));
      }
    }

    return filtered;
  }
}

class DownloadChapterPackUseCase {
  final CurriculumRepository _repository;

  const DownloadChapterPackUseCase(this._repository);

  Future<Either<ErrorResponse, OfflineChapterPackEntity>> call(
    String chapterId, {
    int? orderIndex,
  }) {
    return _repository.downloadChapterPack(
      chapterId,
      orderIndex: orderIndex,
    );
  }
}

class RemoveChapterPackUseCase {
  final CurriculumRepository _repository;

  const RemoveChapterPackUseCase(this._repository);

  Future<void> call(String chapterId) {
    return _repository.removeChapterPack(chapterId);
  }
}

class IsChapterDownloadedUseCase {
  final CurriculumRepository _repository;

  const IsChapterDownloadedUseCase(this._repository);

  Future<bool> call(String chapterId) {
    return _repository.isChapterDownloaded(chapterId);
  }
}

class GetDownloadedChaptersUseCase {
  final CurriculumRepository _repository;

  const GetDownloadedChaptersUseCase(this._repository);

  Future<List<DownloadedChapterEntity>> call({String? subjectId}) {
    return _repository.getDownloadedChapters(subjectId: subjectId);
  }
}

class GetOfflineChapterPackUseCase {
  final CurriculumRepository _repository;

  const GetOfflineChapterPackUseCase(this._repository);

  Future<OfflineChapterPackEntity?> call(String chapterId) {
    return _repository.getOfflineChapterPack(chapterId);
  }
}

class GetActiveCurriculumSubjectUseCase {
  final CurriculumRepository _repository;

  const GetActiveCurriculumSubjectUseCase(this._repository);

  String call(StudentTrack? fallbackTrack) {
    return _repository.getActiveSubjectId(fallbackTrack);
  }
}

class SetActiveCurriculumSubjectUseCase {
  final CurriculumRepository _repository;

  const SetActiveCurriculumSubjectUseCase(this._repository);

  Future<void> call(String subjectId) {
    return _repository.setActiveSubjectId(subjectId);
  }
}
