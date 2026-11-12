import 'package:common/common.dart';
import 'package:network/network.dart';
import 'package:porhi/features/exam/domain/entities/exam_entities.dart';
import 'package:porhi/features/rehearsal/data/models/rehearsal_models.dart';
import 'package:porhi/features/rehearsal/domain/entities/rehearsal_entities.dart';

abstract class RehearsalRemoteDataSource {
  Future<Either<ErrorResponse, RehearsalSessionEnvelopeModel>> startRehearsal({
    required String titleBangla,
    String? program,
    double? negativeRatio,
    required List<RehearsalPaperInputEntity> papers,
  });

  Future<Either<ErrorResponse, MultiExamRehearsalListModel>>
      getRehearsalHistory();

  Future<Either<ErrorResponse, RehearsalSessionEnvelopeModel>> getRehearsal(
    String rehearsalId,
  );

  Future<Either<ErrorResponse, RehearsalSessionEnvelopeModel>>
      startRehearsalPaper({
    required String rehearsalId,
    required int paperIndex,
  });

  Future<Either<ErrorResponse, RehearsalPaperSubmitResultModel>>
      submitRehearsalPaper({
    required String rehearsalId,
    required int paperIndex,
    required List<ExamAnswerInputEntity> answers,
  });
}

class RehearsalRemoteDataSourceImpl extends BaseRepository
    implements RehearsalRemoteDataSource {
  @override
  Future<Either<ErrorResponse, RehearsalSessionEnvelopeModel>> startRehearsal({
    required String titleBangla,
    String? program,
    double? negativeRatio,
    required List<RehearsalPaperInputEntity> papers,
  }) {
    final payload = <String, dynamic>{
      'titleBangla': titleBangla,
      if (program != null && program.isNotEmpty) 'program': program,
      'negativeRatio': ?negativeRatio,
      'papers': papers
          .map(
            (p) => <String, dynamic>{
              'subjectId': p.subjectId,
              if (p.labelBangla != null && p.labelBangla!.trim().isNotEmpty)
                'labelBangla': p.labelBangla!.trim(),
              'questionCount': p.questionCount,
              'durationMinutes': p.durationMinutes,
            },
          )
          .toList(),
    };

    return post<RehearsalSessionEnvelopeModel>(
      path: '/exam/rehearsal/start',
      data: payload,
      responseCompiler: RehearsalSessionEnvelopeModel.fromJson,
    );
  }

  @override
  Future<Either<ErrorResponse, MultiExamRehearsalListModel>>
      getRehearsalHistory() {
    return get<MultiExamRehearsalListModel>(
      path: '/exam/rehearsal/history',
      responseCompiler: MultiExamRehearsalListModel.fromJson,
    );
  }

  @override
  Future<Either<ErrorResponse, RehearsalSessionEnvelopeModel>> getRehearsal(
    String rehearsalId,
  ) {
    return get<RehearsalSessionEnvelopeModel>(
      path: '/exam/rehearsal/${Uri.encodeComponent(rehearsalId)}',
      responseCompiler: RehearsalSessionEnvelopeModel.fromJson,
    );
  }

  @override
  Future<Either<ErrorResponse, RehearsalSessionEnvelopeModel>>
      startRehearsalPaper({
    required String rehearsalId,
    required int paperIndex,
  }) {
    return post<RehearsalSessionEnvelopeModel>(
      path:
          '/exam/rehearsal/${Uri.encodeComponent(rehearsalId)}/paper/$paperIndex/start',
      data: const <String, dynamic>{},
      responseCompiler: RehearsalSessionEnvelopeModel.fromJson,
    );
  }

  @override
  Future<Either<ErrorResponse, RehearsalPaperSubmitResultModel>>
      submitRehearsalPaper({
    required String rehearsalId,
    required int paperIndex,
    required List<ExamAnswerInputEntity> answers,
  }) {
    return post<RehearsalPaperSubmitResultModel>(
      path:
          '/exam/rehearsal/${Uri.encodeComponent(rehearsalId)}/paper/$paperIndex/submit',
      data: <String, dynamic>{
        'answers': answers
            .map(
              (a) => <String, dynamic>{
                'questionId': a.questionId,
                'selectedOptionId': a.selectedOptionId,
                'timeSpent': a.timeSpent,
              },
            )
            .toList(),
      },
      responseCompiler: RehearsalPaperSubmitResultModel.fromJson,
    );
  }
}
