import 'package:equatable/equatable.dart';
import 'package:porhi/features/board_archive/domain/utils/board_parser.dart';
import 'package:porhi/features/practice/domain/entities/practice_entities.dart';

class BoardFacetItemEntity extends Equatable {
  final BoardKey key;
  final String labelBangla;
  final String labelEnglish;
  final int count;

  const BoardFacetItemEntity({
    required this.key,
    required this.labelBangla,
    required this.labelEnglish,
    required this.count,
  });

  @override
  List<Object?> get props => <Object?>[key, labelBangla, labelEnglish, count];
}

class YearFacetItemEntity extends Equatable {
  final int year;
  final int count;

  const YearFacetItemEntity({
    required this.year,
    required this.count,
  });

  @override
  List<Object?> get props => <Object?>[year, count];
}

class BoardSubjectFacetEntity extends Equatable {
  final String id;
  final String code;
  final String nameBangla;
  final String program;
  final int count;

  const BoardSubjectFacetEntity({
    required this.id,
    this.code = '',
    required this.nameBangla,
    this.program = 'SSC',
    required this.count,
  });

  @override
  List<Object?> get props => <Object?>[id, code, nameBangla, program, count];
}

class BoardArchiveFiltersEntity extends Equatable {
  final List<BoardFacetItemEntity> boards;
  final List<YearFacetItemEntity> years;
  final List<BoardSubjectFacetEntity> subjects;
  final int totalVerifiedQuestions;

  const BoardArchiveFiltersEntity({
    this.boards = const <BoardFacetItemEntity>[],
    this.years = const <YearFacetItemEntity>[],
    this.subjects = const <BoardSubjectFacetEntity>[],
    this.totalVerifiedQuestions = 0,
  });

  @override
  List<Object?> get props => <Object?>[
        boards,
        years,
        subjects,
        totalVerifiedQuestions,
      ];
}

class BoardQuestionItemEntity extends Equatable {
  final String id;
  final String topicId;
  final String type;
  final String stem;
  final List<PracticeOptionEntity> options;
  final String? correctOption;
  final ExplanationLayersEntity? explanation;
  final CqRubricEntity? cqRubric;
  final String difficulty;
  final String? boardSource;
  final BoardKey boardKey;
  final List<BoardKey> boardKeys;
  final String boardLabelBangla;
  final int? boardYear;
  final bool isVerifiedBoard;
  final String subjectId;
  final String subjectCode;
  final String subjectNameBangla;
  final String program;
  final String chapterId;
  final String chapterTitleBangla;
  final String topicTitleBangla;

  const BoardQuestionItemEntity({
    required this.id,
    this.topicId = '',
    this.type = 'MCQ',
    required this.stem,
    this.options = const <PracticeOptionEntity>[],
    this.correctOption,
    this.explanation,
    this.cqRubric,
    this.difficulty = 'MEDIUM',
    this.boardSource,
    this.boardKey = BoardKey.other,
    this.boardKeys = const <BoardKey>[],
    this.boardLabelBangla = '',
    this.boardYear,
    this.isVerifiedBoard = false,
    this.subjectId = '',
    this.subjectCode = '',
    this.subjectNameBangla = '',
    this.program = 'SSC',
    this.chapterId = '',
    this.chapterTitleBangla = '',
    this.topicTitleBangla = '',
  });

  bool get isMcq => type.trim().toUpperCase() == 'MCQ';

  bool get isCq => type.trim().toUpperCase().startsWith('CQ');

  PracticeQuestionEntity toPracticeQuestionEntity() {
    return PracticeQuestionEntity(
      id: id,
      topicId: topicId,
      type: type,
      stem: stem,
      options: options,
      explanation: explanation,
      cqRubric: cqRubric,
      difficulty: difficulty,
      boardSource: boardSource,
      isVerified: isVerifiedBoard,
    );
  }

  @override
  List<Object?> get props => <Object?>[
        id,
        topicId,
        type,
        stem,
        options,
        correctOption,
        explanation,
        cqRubric,
        difficulty,
        boardSource,
        boardKey,
        boardKeys,
        boardLabelBangla,
        boardYear,
        isVerifiedBoard,
        subjectId,
        subjectCode,
        subjectNameBangla,
        program,
        chapterId,
        chapterTitleBangla,
        topicTitleBangla,
      ];
}

class BoardArchivePageEntity extends Equatable {
  final List<BoardQuestionItemEntity> items;
  final int total;
  final int page;
  final int limit;
  final int totalPages;

  const BoardArchivePageEntity({
    required this.items,
    required this.total,
    required this.page,
    required this.limit,
    required this.totalPages,
  });

  @override
  List<Object?> get props => <Object?>[items, total, page, limit, totalPages];
}

class BoardArchiveQueryParams extends Equatable {
  final String? board;
  final String? year;
  final String? program;
  final String? subjectId;
  final String? chapterId;
  final String? type;
  final bool verifiedOnly;
  final String? search;
  final int page;
  final int limit;

  const BoardArchiveQueryParams({
    this.board,
    this.year,
    this.program,
    this.subjectId,
    this.chapterId,
    this.type,
    this.verifiedOnly = true,
    this.search,
    this.page = 1,
    this.limit = 15,
  });

  Map<String, String> toQueryMap() {
    final map = <String, String>{
      'verifiedOnly': verifiedOnly ? 'true' : 'false',
      'page': '$page',
      'limit': '$limit',
    };
    if (board != null && board!.trim().isNotEmpty && board != 'ALL') {
      map['board'] = board!.trim();
    }
    if (year != null && year!.trim().isNotEmpty && year != 'ALL') {
      map['year'] = year!.trim();
    }
    if (program != null && program!.trim().isNotEmpty && program != 'ALL') {
      map['program'] = program!.trim();
    }
    if (subjectId != null &&
        subjectId!.trim().isNotEmpty &&
        subjectId != 'ALL') {
      map['subjectId'] = subjectId!.trim();
    }
    if (chapterId != null &&
        chapterId!.trim().isNotEmpty &&
        chapterId != 'ALL') {
      map['chapterId'] = chapterId!.trim();
    }
    if (type != null && type!.trim().isNotEmpty && type != 'ALL') {
      map['type'] = type!.trim();
    }
    if (search != null && search!.trim().isNotEmpty) {
      map['search'] = search!.trim();
    }
    return map;
  }

  @override
  List<Object?> get props => <Object?>[
        board,
        year,
        program,
        subjectId,
        chapterId,
        type,
        verifiedOnly,
        search,
        page,
        limit,
      ];
}
