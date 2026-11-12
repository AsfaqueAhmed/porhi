import 'package:equatable/equatable.dart';

enum ReportContentType {
  lesson('LESSON'),
  question('QUESTION');

  final String apiValue;

  const ReportContentType(this.apiValue);

  static ReportContentType fromApiValue(String? raw) {
    final normalized = raw?.trim().toUpperCase();
    return normalized == 'QUESTION'
        ? ReportContentType.question
        : ReportContentType.lesson;
  }
}

enum ReportCategory {
  wrongAnswer(
    'WRONG_ANSWER',
    'ভুল উত্তর বা চিহ্নিতকরণ',
    'Wrong Answer / Key',
  ),
  typoOrLatex(
    'TYPO_OR_LATEX',
    'টাইপো বা LaTeX ফরম্যাটিং সমস্যা',
    'Typo or Formula Issue',
  ),
  unclearExplanation(
    'UNCLEAR_EXPLANATION',
    'অস্পষ্ট বা কঠিন ব্যাখ্যা',
    'Unclear Explanation',
  ),
  curriculumMismatch(
    'CURRICULUM_MISMATCH',
    'পাঠ্যসূচি বা অধ্যায় অসামঞ্জস্য',
    'Curriculum Mismatch',
  ),
  other(
    'OTHER',
    'অন্যান্য সমস্যা',
    'Other Issue',
  );

  final String apiValue;
  final String labelBn;
  final String labelEn;

  const ReportCategory(this.apiValue, this.labelBn, this.labelEn);

  static ReportCategory fromApiValue(String? raw) {
    final normalized = raw?.trim().toUpperCase();
    for (final value in ReportCategory.values) {
      if (value.apiValue == normalized) return value;
    }
    return ReportCategory.other;
  }
}

/// Domain entity representing a submitted content issue report (`POST /content-reports`).
class ContentReportEntity extends Equatable {
  final String id;
  final ReportContentType contentType;
  final String contentId;
  final String? topicId;
  final ReportCategory category;
  final String description;
  final String status;
  final String? resolutionNote;
  final String createdAt;

  const ContentReportEntity({
    required this.id,
    required this.contentType,
    required this.contentId,
    this.topicId,
    required this.category,
    required this.description,
    this.status = 'OPEN',
    this.resolutionNote,
    required this.createdAt,
  });

  @override
  List<Object?> get props => <Object?>[
        id,
        contentType,
        contentId,
        topicId,
        category,
        description,
        status,
        resolutionNote,
        createdAt,
      ];
}
