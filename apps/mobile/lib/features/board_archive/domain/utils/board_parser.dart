import 'package:equatable/equatable.dart';
import 'package:porhi/core/i18n/bangla_digits.dart';

enum BoardKey {
  dhaka('DHAKA'),
  rajshahi('RAJSHAHI'),
  chattogram('CHATTOGRAM'),
  cumilla('CUMILLA'),
  jashore('JASHORE'),
  sylhet('SYLHET'),
  dinajpur('DINAJPUR'),
  barishal('BARISHAL'),
  mymensingh('MYMENSINGH'),
  allBoards('ALL_BOARDS'),
  other('OTHER');

  final String apiValue;

  const BoardKey(this.apiValue);

  static BoardKey fromApiValue(String? raw) {
    final normalized = raw?.trim().toUpperCase();
    for (final key in BoardKey.values) {
      if (key.apiValue == normalized) return key;
    }
    return BoardKey.other;
  }
}

class BoardMetadataItem extends Equatable {
  final BoardKey key;
  final String labelBangla;
  final String labelEnglish;
  final String shortBangla;

  const BoardMetadataItem({
    required this.key,
    required this.labelBangla,
    required this.labelEnglish,
    required this.shortBangla,
  });

  @override
  List<Object?> get props => <Object?>[
        key,
        labelBangla,
        labelEnglish,
        shortBangla,
      ];
}

const List<BoardMetadataItem> boardMetadata = <BoardMetadataItem>[
  BoardMetadataItem(
    key: BoardKey.dhaka,
    labelBangla: 'ঢাকা বোর্ড',
    labelEnglish: 'Dhaka Board',
    shortBangla: 'ঢাকা',
  ),
  BoardMetadataItem(
    key: BoardKey.rajshahi,
    labelBangla: 'রাজশাহী বোর্ড',
    labelEnglish: 'Rajshahi Board',
    shortBangla: 'রাজশাহী',
  ),
  BoardMetadataItem(
    key: BoardKey.chattogram,
    labelBangla: 'চট্টগ্রাম বোর্ড',
    labelEnglish: 'Chattogram Board',
    shortBangla: 'চট্টগ্রাম',
  ),
  BoardMetadataItem(
    key: BoardKey.cumilla,
    labelBangla: 'কুমিল্লা বোর্ড',
    labelEnglish: 'Cumilla Board',
    shortBangla: 'কুমিল্লা',
  ),
  BoardMetadataItem(
    key: BoardKey.jashore,
    labelBangla: 'যশোর বোর্ড',
    labelEnglish: 'Jashore Board',
    shortBangla: 'যশোর',
  ),
  BoardMetadataItem(
    key: BoardKey.sylhet,
    labelBangla: 'সিলেট বোর্ড',
    labelEnglish: 'Sylhet Board',
    shortBangla: 'সিলেট',
  ),
  BoardMetadataItem(
    key: BoardKey.dinajpur,
    labelBangla: 'দিনাজপুর বোর্ড',
    labelEnglish: 'Dinajpur Board',
    shortBangla: 'দিনাজপুর',
  ),
  BoardMetadataItem(
    key: BoardKey.barishal,
    labelBangla: 'বরিশাল বোর্ড',
    labelEnglish: 'Barishal Board',
    shortBangla: 'বরিশাল',
  ),
  BoardMetadataItem(
    key: BoardKey.mymensingh,
    labelBangla: 'ময়মনসিংহ বোর্ড',
    labelEnglish: 'Mymensingh Board',
    shortBangla: 'ময়মনসিংহ',
  ),
  BoardMetadataItem(
    key: BoardKey.allBoards,
    labelBangla: 'সকল বোর্ড',
    labelEnglish: 'All Boards',
    shortBangla: 'সকল বোর্ড',
  ),
];

class ParsedBoardInfo extends Equatable {
  final BoardKey boardKey;
  final List<BoardKey> boardKeys;
  final String boardLabelBangla;
  final String boardLabelEnglish;
  final int? year;
  final bool isVerifiedBoard;
  final String? raw;

  const ParsedBoardInfo({
    required this.boardKey,
    required this.boardKeys,
    required this.boardLabelBangla,
    required this.boardLabelEnglish,
    this.year,
    required this.isVerifiedBoard,
    this.raw,
  });

  @override
  List<Object?> get props => <Object?>[
        boardKey,
        boardKeys,
        boardLabelBangla,
        boardLabelEnglish,
        year,
        isVerifiedBoard,
        raw,
      ];
}

final List<({BoardKey key, List<RegExp> patterns})> _boardMatchers =
    <({BoardKey key, List<RegExp> patterns})>[
  (
    key: BoardKey.allBoards,
    patterns: <RegExp>[
      RegExp(r'all\s*_?\s*boards?', caseSensitive: false),
      RegExp(r'combined\s+boards?', caseSensitive: false),
      RegExp(r'সকল\s*বোর্ড'),
      RegExp(r'সমন্বিত\s*বোর্ড'),
    ],
  ),
  (
    key: BoardKey.dhaka,
    patterns: <RegExp>[
      RegExp(r'\bdhaka\b', caseSensitive: false),
      RegExp(r'ঢাকা'),
    ],
  ),
  (
    key: BoardKey.rajshahi,
    patterns: <RegExp>[
      RegExp(r'\brajshahi\b', caseSensitive: false),
      RegExp(r'রাজশাহী'),
    ],
  ),
  (
    key: BoardKey.chattogram,
    patterns: <RegExp>[
      RegExp(r'\bchattogram\b', caseSensitive: false),
      RegExp(r'\bchittagong\b', caseSensitive: false),
      RegExp(r'চট্টগ্রাম'),
    ],
  ),
  (
    key: BoardKey.cumilla,
    patterns: <RegExp>[
      RegExp(r'\bcumilla\b', caseSensitive: false),
      RegExp(r'\bcomilla\b', caseSensitive: false),
      RegExp(r'কুমিল্লা'),
    ],
  ),
  (
    key: BoardKey.jashore,
    patterns: <RegExp>[
      RegExp(r'\bjashore\b', caseSensitive: false),
      RegExp(r'\bjessore\b', caseSensitive: false),
      RegExp(r'যশোর'),
    ],
  ),
  (
    key: BoardKey.sylhet,
    patterns: <RegExp>[
      RegExp(r'\bsylhet\b', caseSensitive: false),
      RegExp(r'সিলেট'),
    ],
  ),
  (
    key: BoardKey.dinajpur,
    patterns: <RegExp>[
      RegExp(r'\bdinajpur\b', caseSensitive: false),
      RegExp(r'দিনাজপুর'),
    ],
  ),
  (
    key: BoardKey.barishal,
    patterns: <RegExp>[
      RegExp(r'\bbarishal\b', caseSensitive: false),
      RegExp(r'\bbarisal\b', caseSensitive: false),
      RegExp(r'বরিশাল'),
    ],
  ),
  (
    key: BoardKey.mymensingh,
    patterns: <RegExp>[
      RegExp(r'\bmymensingh\b', caseSensitive: false),
      RegExp(r'ময়মনসিংহ'),
      RegExp(r'ময়মনসিংহ'),
    ],
  ),
];

final RegExp _yearPattern = RegExp(r'\b(19\d{2}|20\d{2})\b');
final RegExp _nonBoardPracticePattern = RegExp(
  r'\b(model|practice|sample)\b|মডেল|প্র্যাকটিস',
  caseSensitive: false,
);

String normalizeDigitsToEnglish(String value) {
  return toAsciiDigits(value);
}

({String labelBangla, String labelEnglish}) getBoardMetadata(BoardKey key) {
  for (final item in boardMetadata) {
    if (item.key == key) {
      return (labelBangla: item.labelBangla, labelEnglish: item.labelEnglish);
    }
  }
  return (
    labelBangla: 'অন্যান্য / প্র্যাকটিস',
    labelEnglish: 'Other / Practice',
  );
}

ParsedBoardInfo parseBoardSource(String? raw) {
  final trimmed = raw?.trim();
  if (trimmed == null || trimmed.isEmpty) {
    return const ParsedBoardInfo(
      boardKey: BoardKey.other,
      boardKeys: <BoardKey>[BoardKey.other],
      boardLabelBangla: 'অন্যান্য / প্র্যাকটিস',
      boardLabelEnglish: 'Other / Practice',
      year: null,
      isVerifiedBoard: false,
      raw: null,
    );
  }

  final normalized = normalizeDigitsToEnglish(trimmed);
  final yearMatch = _yearPattern.firstMatch(normalized);
  final year = yearMatch != null ? int.tryParse(yearMatch.group(1)!) : null;

  final matchedKeys = <BoardKey>[];
  for (final matcher in _boardMatchers) {
    if (matcher.patterns.any((pattern) => pattern.hasMatch(normalized))) {
      matchedKeys.add(matcher.key);
    }
  }

  final primaryKey =
      matchedKeys.isNotEmpty ? matchedKeys.first : BoardKey.other;
  final boardKeys =
      matchedKeys.isNotEmpty ? matchedKeys : const <BoardKey>[BoardKey.other];
  final meta = getBoardMetadata(primaryKey);
  final hasExplicitNonBoardPracticeTag =
      _nonBoardPracticePattern.hasMatch(normalized);
  final isVerifiedBoard =
      primaryKey != BoardKey.other && !hasExplicitNonBoardPracticeTag;

  return ParsedBoardInfo(
    boardKey: primaryKey,
    boardKeys: boardKeys,
    boardLabelBangla: meta.labelBangla,
    boardLabelEnglish: meta.labelEnglish,
    year: year,
    isVerifiedBoard: isVerifiedBoard,
    raw: trimmed,
  );
}

bool matchesBoardYearFilter(int? questionYear, String? filterYear) {
  if (filterYear == null || filterYear.trim().isEmpty || filterYear == 'ALL') {
    return true;
  }
  if (questionYear == null) {
    return false;
  }
  final normalized = normalizeDigitsToEnglish(filterYear.trim());
  if (normalized.isEmpty) {
    return true;
  }
  if (normalized == '2024+') {
    return questionYear >= 2024;
  }
  final exactYear = num.tryParse(normalized);
  if (exactYear == null || !exactYear.isFinite) {
    return true;
  }
  return questionYear == exactYear;
}
