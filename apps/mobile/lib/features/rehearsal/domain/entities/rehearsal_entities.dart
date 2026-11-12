import 'package:equatable/equatable.dart';
import 'package:porhi/features/exam/domain/entities/exam_entities.dart';

enum RehearsalPaperStatus {
  pending('PENDING'),
  active('ACTIVE'),
  submitted('SUBMITTED');

  final String apiValue;

  const RehearsalPaperStatus(this.apiValue);

  static RehearsalPaperStatus fromApiValue(String? raw) {
    final normalized = raw?.trim().toUpperCase();
    for (final value in RehearsalPaperStatus.values) {
      if (value.apiValue == normalized) return value;
    }
    return RehearsalPaperStatus.pending;
  }
}

enum MultiRehearsalStatus {
  inProgress('IN_PROGRESS'),
  intermission('INTERMISSION'),
  completed('COMPLETED');

  final String apiValue;

  const MultiRehearsalStatus(this.apiValue);

  static MultiRehearsalStatus fromApiValue(String? raw) {
    final normalized = raw?.trim().toUpperCase();
    for (final value in MultiRehearsalStatus.values) {
      if (value.apiValue == normalized) return value;
    }
    return MultiRehearsalStatus.inProgress;
  }
}

class RehearsalPaperInputEntity extends Equatable {
  final String subjectId;
  final String? labelBangla;
  final int questionCount;
  final int durationMinutes;

  const RehearsalPaperInputEntity({
    required this.subjectId,
    this.labelBangla,
    required this.questionCount,
    required this.durationMinutes,
  });

  @override
  List<Object?> get props => <Object?>[
        subjectId,
        labelBangla,
        questionCount,
        durationMinutes,
      ];
}

class RehearsalPaperStateEntity extends Equatable {
  final int paperIndex;
  final String subjectId;
  final String subjectCode;
  final String subjectNameBangla;
  final String labelBangla;
  final int questionCount;
  final int durationMinutes;
  final RehearsalPaperStatus status;
  final String? sessionId;
  final double? score;
  final int? totalMarks;
  final int? correctCount;
  final int? wrongCount;
  final int? unansweredCount;
  final int? timeSpentSeconds;
  final DateTime? startedAt;
  final DateTime? submittedAt;

  const RehearsalPaperStateEntity({
    required this.paperIndex,
    required this.subjectId,
    this.subjectCode = '',
    this.subjectNameBangla = '',
    required this.labelBangla,
    required this.questionCount,
    required this.durationMinutes,
    required this.status,
    this.sessionId,
    this.score,
    this.totalMarks,
    this.correctCount,
    this.wrongCount,
    this.unansweredCount,
    this.timeSpentSeconds,
    this.startedAt,
    this.submittedAt,
  });

  int get effectiveTotalMarks => totalMarks ?? questionCount;

  int get accuracyPercent {
    final total = effectiveTotalMarks;
    if (total <= 0) return 0;
    final correct = correctCount ?? 0;
    return ((correct / total) * 100).round().clamp(0, 100);
  }

  @override
  List<Object?> get props => <Object?>[
        paperIndex,
        subjectId,
        subjectCode,
        subjectNameBangla,
        labelBangla,
        questionCount,
        durationMinutes,
        status,
        sessionId,
        score,
        totalMarks,
        correctCount,
        wrongCount,
        unansweredCount,
        timeSpentSeconds,
        startedAt,
        submittedAt,
      ];
}

class MultiExamRehearsalEntity extends Equatable {
  final String id;
  final String titleBangla;
  final String program;
  final int currentPaperIndex;
  final MultiRehearsalStatus status;
  final double? totalScore;
  final int totalMarks;
  final DateTime? startedAt;
  final DateTime? submittedAt;
  final List<RehearsalPaperStateEntity> papers;

  const MultiExamRehearsalEntity({
    required this.id,
    required this.titleBangla,
    this.program = 'SSC',
    required this.currentPaperIndex,
    required this.status,
    this.totalScore,
    required this.totalMarks,
    this.startedAt,
    this.submittedAt,
    this.papers = const <RehearsalPaperStateEntity>[],
  });

  RehearsalPaperStateEntity? get currentPaper {
    if (currentPaperIndex < 0 || currentPaperIndex >= papers.length) {
      return null;
    }
    return papers[currentPaperIndex];
  }

  RehearsalPaperStateEntity? get lastSubmittedPaper {
    for (var i = papers.length - 1; i >= 0; i--) {
      if (papers[i].status == RehearsalPaperStatus.submitted) {
        return papers[i];
      }
    }
    return null;
  }

  int get totalCorrectCount => papers.fold<int>(
        0,
        (sum, p) => sum + (p.correctCount ?? 0),
      );

  int get accuracyPercent {
    final effectiveMarks = totalMarks > 0
        ? totalMarks
        : papers.fold<int>(0, (sum, p) => sum + p.effectiveTotalMarks);
    if (effectiveMarks <= 0) return 0;
    return ((totalCorrectCount / effectiveMarks) * 100).round().clamp(0, 100);
  }

  @override
  List<Object?> get props => <Object?>[
        id,
        titleBangla,
        program,
        currentPaperIndex,
        status,
        totalScore,
        totalMarks,
        startedAt,
        submittedAt,
        papers,
      ];
}

class RehearsalSessionEnvelopeEntity extends Equatable {
  final MultiExamRehearsalEntity rehearsal;
  final ExamSessionStartEntity? activeSession;

  const RehearsalSessionEnvelopeEntity({
    required this.rehearsal,
    this.activeSession,
  });

  @override
  List<Object?> get props => <Object?>[rehearsal, activeSession];
}

class RehearsalPaperSubmitResultEntity extends Equatable {
  final MultiExamRehearsalEntity rehearsal;
  final ExamResultEntity paperResult;

  const RehearsalPaperSubmitResultEntity({
    required this.rehearsal,
    required this.paperResult,
  });

  @override
  List<Object?> get props => <Object?>[rehearsal, paperResult];
}
