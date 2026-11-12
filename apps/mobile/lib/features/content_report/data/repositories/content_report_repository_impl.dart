import 'package:common/common.dart';
import 'package:network/network.dart';
import 'package:porhi/features/content_report/data/datasources/content_report_remote_datasource.dart';
import 'package:porhi/features/content_report/domain/entities/content_report_entity.dart';
import 'package:porhi/features/content_report/domain/repositories/content_report_repository.dart';

class ContentReportRepositoryImpl implements ContentReportRepository {
  final ContentReportRemoteDataSource _remoteDataSource;

  ContentReportRepositoryImpl({required this._remoteDataSource});

  @override
  Future<Either<ErrorResponse, ContentReportEntity>> submitReport({
    required ReportContentType contentType,
    required String contentId,
    String? topicId,
    required ReportCategory category,
    required String description,
  }) async {
    final result = await _remoteDataSource.submitReport(
      contentType: contentType.apiValue,
      contentId: contentId,
      topicId: topicId,
      category: category.apiValue,
      description: description,
    );
    return result.fold(
      Left<ErrorResponse, ContentReportEntity>.new,
      (model) => Right<ErrorResponse, ContentReportEntity>(model.toEntity()),
    );
  }

  @override
  Future<Either<ErrorResponse, List<ContentReportEntity>>> listMyReports() async {
    final result = await _remoteDataSource.listMyReports();
    return result.fold(
      Left<ErrorResponse, List<ContentReportEntity>>.new,
      (model) => Right<ErrorResponse, List<ContentReportEntity>>(
        model.reports.map((r) => r.toEntity()).toList(),
      ),
    );
  }
}
