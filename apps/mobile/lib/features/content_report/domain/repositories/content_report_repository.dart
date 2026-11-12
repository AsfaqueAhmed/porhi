import 'package:common/common.dart';
import 'package:network/network.dart';
import 'package:porhi/features/content_report/domain/entities/content_report_entity.dart';

/// Domain contract for submitting and listing content issue reports.
abstract class ContentReportRepository {
  Future<Either<ErrorResponse, ContentReportEntity>> submitReport({
    required ReportContentType contentType,
    required String contentId,
    String? topicId,
    required ReportCategory category,
    required String description,
  });

  Future<Either<ErrorResponse, List<ContentReportEntity>>> listMyReports();
}
