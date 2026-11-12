import 'package:network/network.dart';
import 'package:porhi/features/board_archive/domain/entities/board_archive_entities.dart';
import 'package:porhi/features/board_archive/domain/utils/board_parser.dart';
import 'package:porhi/features/practice/data/models/practice_models.dart';
import 'package:porhi/features/practice/domain/entities/practice_entities.dart';

String _asString(Object? raw, {String fallback = ''}) {
  if (raw == null) return fallback;
  if (raw is String) return raw;
  return raw.toString();
}

String? _asNullableString(Object? raw) {
  if (raw == null) return null;
  final str = raw is String ? raw : raw.toString();
  return str.trim().isEmpty ? null : str;
}

int _asInt(Object? raw, {int fallback = 0}) {
  if (raw is int) return raw;
  if (raw is num) return raw.toInt();
  if (raw is String) return int.tryParse(raw.trim()) ?? fallback;
  return fallback;
}

int? _asNullableInt(Object? raw) {
  if (raw == null) return null;
  if (raw is int) return raw;
  if (raw is num) return raw.toInt();
  if (raw is String) return int.tryParse(raw.trim());
  return null;
}

bool? _asNullableBool(Object? raw) {
  if (raw == null) return null;
  if (raw is bool) return raw;
  if (raw is num) return raw != 0;
  if (raw is String) {
    final normalized = raw.trim().toLowerCase();
    if (normalized == 'true' || normalized == '1') return true;
    if (normalized == 'false' || normalized == '0') return false;
  }
  return null;
}

List<dynamic> _asList(Object? raw) {
  if (raw is List<dynamic>) return raw;
  if (raw is List) return List<dynamic>.from(raw);
  return const <dynamic>[];
}

Map<String, dynamic> _asMap(Object? raw) {
  if (raw is Map<String, dynamic>) return raw;
  if (raw is Map) return Map<String, dynamic>.from(raw);
  return <String, dynamic>{};
}

class BoardArchiveFiltersModel
    extends BaseResponseModel<BoardArchiveFiltersModel> {
  final List<BoardFacetItemEntity> boards;
  final List<YearFacetItemEntity> years;
  final List<BoardSubjectFacetEntity> subjects;
  final int totalVerifiedQuestions;

  BoardArchiveFiltersModel({
    this.boards = const <BoardFacetItemEntity>[],
    this.years = const <YearFacetItemEntity>[],
    this.subjects = const <BoardSubjectFacetEntity>[],
    this.totalVerifiedQuestions = 0,
    super.message,
  }) {
    data = this;
  }

  factory BoardArchiveFiltersModel.fromJson(Map<String, dynamic> json) {
    final source = json['json'] is Map ? _asMap(json['json']) : json;
    final boards = _asList(source['boards']).map((item) {
      final m = _asMap(item);
      return BoardFacetItemEntity(
        key: BoardKey.fromApiValue(_asNullableString(m['key'])),
        labelBangla: _asString(m['labelBangla']),
        labelEnglish: _asString(m['labelEnglish']),
        count: _asInt(m['count']),
      );
    }).toList();

    final years = _asList(source['years'])
        .map((item) {
          final m = _asMap(item);
          return YearFacetItemEntity(
            year: _asInt(m['year']),
            count: _asInt(m['count']),
          );
        })
        .where((y) => y.year > 0)
        .toList();

    final subjects = _asList(source['subjects'])
        .map((item) {
          final m = _asMap(item);
          return BoardSubjectFacetEntity(
            id: _asString(m['id']),
            code: _asString(m['code']),
            nameBangla: _asString(m['nameBangla']),
            program: _asString(m['program'], fallback: 'SSC'),
            count: _asInt(m['count']),
          );
        })
        .where((s) => s.id.isNotEmpty)
        .toList();

    return BoardArchiveFiltersModel(
      boards: boards,
      years: years,
      subjects: subjects,
      totalVerifiedQuestions: _asInt(source['totalVerifiedQuestions']),
      message: _asNullableString(json['message']),
    );
  }

  BoardArchiveFiltersEntity toEntity() {
    return BoardArchiveFiltersEntity(
      boards: boards,
      years: years,
      subjects: subjects,
      totalVerifiedQuestions: totalVerifiedQuestions,
    );
  }

  @override
  Map<String, dynamic> toJson() => <String, dynamic>{
        'totalVerifiedQuestions': totalVerifiedQuestions,
      };
}

CqRubricEntity? _parseBoardCqRubric(Object? raw) {
  if (raw == null) return null;
  final parsed = CqRubricModel.fromDynamic(raw)?.toEntity();
  if (parsed != null && !parsed.isEmpty) {
    return parsed;
  }
  if (raw is! Map) return null;
  final map = _asMap(raw);

  CqRubricPartEntity? buildRichPart(Object? item, int defaultMark) {
    if (item == null) return null;
    if (item is String) {
      final t = item.trim();
      return t.isEmpty ? null : CqRubricPartEntity(mark: defaultMark, criteria: t);
    }
    if (item is! Map) return null;
    final m = _asMap(item);
    final parts = <String>[
      if (_asString(m['questionText']).trim().isNotEmpty)
        _asString(m['questionText']).trim(),
      if (_asString(m['modelAnswer']).trim().isNotEmpty)
        _asString(m['modelAnswer']).trim(),
      if (_asString(m['markingCriteria']).trim().isNotEmpty)
        _asString(m['markingCriteria']).trim(),
      if (_asString(m['criteria']).trim().isNotEmpty)
        _asString(m['criteria']).trim(),
    ];
    final combined = parts.join('\n');
    if (combined.trim().isEmpty) return null;
    return CqRubricPartEntity(
      mark: _asNullableInt(m['mark'] ?? m['marks']) ?? defaultMark,
      criteria: combined,
    );
  }

  if (map['subQuestions'] is List) {
    final subs = _asList(map['subQuestions']);
    final rubric = CqRubricEntity(
      ka: subs.isNotEmpty ? buildRichPart(subs[0], 1) : null,
      kha: subs.length > 1 ? buildRichPart(subs[1], 2) : null,
      ga: subs.length > 2 ? buildRichPart(subs[2], 3) : null,
      gha: subs.length > 3 ? buildRichPart(subs[3], 4) : null,
    );
    return rubric.isEmpty ? null : rubric;
  }

  final rubric = CqRubricEntity(
    ka: buildRichPart(map['ka'], 1),
    kha: buildRichPart(map['kha'], 2),
    ga: buildRichPart(map['ga'], 3),
    gha: buildRichPart(map['gha'], 4),
  );
  return rubric.isEmpty ? null : rubric;
}

class BoardQuestionItemModel {
  final String id;
  final String topicId;
  final String type;
  final String stem;
  final List<Map<String, dynamic>> options;
  final String? correctOption;
  final ExplanationLayersModel? explanation;
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

  const BoardQuestionItemModel({
    required this.id,
    this.topicId = '',
    this.type = 'MCQ',
    required this.stem,
    this.options = const <Map<String, dynamic>>[],
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

  factory BoardQuestionItemModel.fromJson(Map<String, dynamic> json) {
    final boardSource = _asNullableString(json['boardSource']);
    final parsedBoard = parseBoardSource(boardSource);
    final apiBoardKey = _asNullableString(json['boardKey']);
    final apiBoardKeys = _asList(json['boardKeys'])
        .map((e) => BoardKey.fromApiValue(_asNullableString(e)))
        .toList();

    return BoardQuestionItemModel(
      id: _asString(json['id']),
      topicId: _asString(json['topicId']),
      type: _asString(json['type'], fallback: 'MCQ'),
      stem: _asString(json['stem']),
      options: _asList(json['options']).map(_asMap).toList(),
      correctOption: _asNullableString(json['correctOption']),
      explanation: ExplanationLayersModel.fromDynamic(json['explanation']),
      cqRubric: _parseBoardCqRubric(json['cqRubric']),
      difficulty: _asString(json['difficulty'], fallback: 'MEDIUM'),
      boardSource: boardSource,
      boardKey: apiBoardKey != null
          ? BoardKey.fromApiValue(apiBoardKey)
          : parsedBoard.boardKey,
      boardKeys:
          apiBoardKeys.isNotEmpty ? apiBoardKeys : parsedBoard.boardKeys,
      boardLabelBangla: _asNullableString(json['boardLabelBangla']) ??
          parsedBoard.boardLabelBangla,
      boardYear: _asNullableInt(json['boardYear']) ?? parsedBoard.year,
      isVerifiedBoard: _asNullableBool(json['isVerifiedBoard']) ??
          parsedBoard.isVerifiedBoard,
      subjectId: _asString(json['subjectId']),
      subjectCode: _asString(json['subjectCode']),
      subjectNameBangla: _asString(json['subjectNameBangla']),
      program: _asString(json['program'], fallback: 'SSC'),
      chapterId: _asString(json['chapterId']),
      chapterTitleBangla: _asString(json['chapterTitleBangla']),
      topicTitleBangla: _asString(json['topicTitleBangla']),
    );
  }

  BoardQuestionItemEntity toEntity() {
    return BoardQuestionItemEntity(
      id: id,
      topicId: topicId,
      type: type,
      stem: stem,
      options: options
          .map(
            (opt) => PracticeOptionEntity(
              id: _asString(opt['id']),
              text: _asString(opt['text']),
              isCorrect: _asNullableBool(opt['isCorrect']),
            ),
          )
          .where((o) => o.id.isNotEmpty)
          .toList(),
      correctOption: correctOption,
      explanation: explanation?.toEntity(),
      cqRubric: cqRubric,
      difficulty: difficulty,
      boardSource: boardSource,
      boardKey: boardKey,
      boardKeys: boardKeys,
      boardLabelBangla: boardLabelBangla,
      boardYear: boardYear,
      isVerifiedBoard: isVerifiedBoard,
      subjectId: subjectId,
      subjectCode: subjectCode,
      subjectNameBangla: subjectNameBangla,
      program: program,
      chapterId: chapterId,
      chapterTitleBangla: chapterTitleBangla,
      topicTitleBangla: topicTitleBangla,
    );
  }
}

class BoardArchiveResponseModel
    extends BaseResponseModel<BoardArchiveResponseModel> {
  final List<BoardQuestionItemModel> items;
  final int total;
  final int page;
  final int limit;
  final int totalPages;

  BoardArchiveResponseModel({
    required this.items,
    required this.total,
    required this.page,
    required this.limit,
    required this.totalPages,
    super.message,
  }) {
    data = this;
  }

  factory BoardArchiveResponseModel.fromJson(Map<String, dynamic> json) {
    final source = json['json'] is Map ? _asMap(json['json']) : json;
    final items = _asList(source['items'])
        .map((e) => BoardQuestionItemModel.fromJson(_asMap(e)))
        .where((q) => q.id.isNotEmpty)
        .toList();
    return BoardArchiveResponseModel(
      items: items,
      total: _asInt(source['total'], fallback: items.length),
      page: _asInt(source['page'], fallback: 1),
      limit: _asInt(source['limit'], fallback: 15),
      totalPages: _asInt(source['totalPages'], fallback: 1),
      message: _asNullableString(json['message']),
    );
  }

  BoardArchivePageEntity toEntity() {
    return BoardArchivePageEntity(
      items: items.map((e) => e.toEntity()).toList(),
      total: total,
      page: page,
      limit: limit,
      totalPages: totalPages,
    );
  }

  @override
  Map<String, dynamic> toJson() => <String, dynamic>{
        'total': total,
        'page': page,
        'limit': limit,
        'totalPages': totalPages,
      };
}
