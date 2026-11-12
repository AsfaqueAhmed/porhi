import 'package:common/common.dart';
import 'package:network/network.dart';
import 'package:porhi/features/content_report/domain/entities/content_report_entity.dart';
import 'package:porhi/features/content_report/domain/repositories/content_report_repository.dart';

class SubmitContentReportUseCase {
  static const int maxDescriptionLength = 2000;

  final ContentReportRepository _repository;

  const SubmitContentReportUseCase(this._repository);

  Future<Either<ErrorResponse, ContentReportEntity>> call({
    required ReportContentType contentType,
    required String contentId,
    String? topicId,
    required ReportCategory category,
    required String description,
  }) async {
    final trimmedId = contentId.trim();
    if (trimmedId.isEmpty) {
      return Left<ErrorResponse, ContentReportEntity>(
        ErrorResponse(
          message: 'Content ID is required',
          data: ApiResponseErrorType.response,
        ),
      );
    }

    final trimmedDesc = description.trim();
    if (trimmedDesc.isEmpty) {
      return Left<ErrorResponse, ContentReportEntity>(
        ErrorResponse(
          message: 'অনুগ্রহ করে সমস্যার বিবরণ লেখো।',
          data: ApiResponseErrorType.response,
        ),
      );
    }

    if (trimmedDesc.length > maxDescriptionLength) {
      return Left<ErrorResponse, ContentReportEntity>(
        ErrorResponse(
          message: 'বিবরণ ২০০০ অক্ষরের মধ্যে রাখো।',
          data: ApiResponseErrorType.response,
        ),
      );
    }

    final cleanTopicId = topicId?.trim();
    return _repository.submitReport(
      contentType: contentType,
      contentId: trimmedId,
      topicId: (cleanTopicId != null && cleanTopicId.isNotEmpty)
          ? cleanTopicId
          : null,
      category: category,
      description: trimmedDesc,
    );
  }
}

class ListMyContentReportsUseCase {
  final ContentReportRepository _repository;

  const ListMyContentReportsUseCase(this._repository);

  Future<Either<ErrorResponse, List<ContentReportEntity>>> call() {
    return _repository.listMyReports();
  }
}
