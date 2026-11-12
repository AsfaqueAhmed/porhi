import 'package:common/common.dart';
import 'package:network/network.dart';
import 'package:porhi/features/content_report/data/models/content_report_model.dart';

abstract class ContentReportRemoteDataSource {
  Future<Either<ErrorResponse, ContentReportModel>> submitReport({
    required String contentType,
    required String contentId,
    String? topicId,
    required String category,
    required String description,
  });

  Future<Either<ErrorResponse, ContentReportListModel>> listMyReports();
}

class ContentReportRemoteDataSourceImpl extends BaseRepository
    implements ContentReportRemoteDataSource {
  @override
  Future<Either<ErrorResponse, ContentReportModel>> submitReport({
    required String contentType,
    required String contentId,
    String? topicId,
    required String category,
    required String description,
  }) {
    return post<ContentReportModel>(
      path: '/content-reports',
      data: <String, dynamic>{
        'contentType': contentType,
        'contentId': contentId,
        'topicId': ?topicId,
        'category': category,
        'description': description,
      },
      responseCompiler: ContentReportModel.fromJson,
    );
  }

  @override
  Future<Either<ErrorResponse, ContentReportListModel>> listMyReports() {
    return get<ContentReportListModel>(
      path: '/content-reports/mine',
      responseCompiler: ContentReportListModel.fromJson,
    );
  }
}
