import 'package:network/network.dart';
import 'package:porhi/features/content_report/domain/entities/content_report_entity.dart';

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

class ContentReportModel extends BaseResponseModel<ContentReportModel> {
  final String id;
  final String contentType;
  final String contentId;
  final String? topicId;
  final String category;
  final String description;
  final String status;
  final String? resolutionNote;
  final String createdAt;

  ContentReportModel({
    required this.id,
    required this.contentType,
    required this.contentId,
    this.topicId,
    required this.category,
    required this.description,
    this.status = 'OPEN',
    this.resolutionNote,
    required this.createdAt,
    super.message,
  }) {
    data = this;
  }

  factory ContentReportModel.fromJson(Map<String, dynamic> json) {
    final source = json['json'] is Map ? _asMap(json['json']) : json;
    return ContentReportModel(
      id: _asString(source['id']),
      contentType: _asString(source['contentType'], fallback: 'LESSON'),
      contentId: _asString(source['contentId']),
      topicId: _asNullableString(source['topicId']),
      category: _asString(source['category'], fallback: 'OTHER'),
      description: _asString(source['description']),
      status: _asString(source['status'], fallback: 'OPEN'),
      resolutionNote: _asNullableString(source['resolutionNote']),
      createdAt: _asString(
        source['createdAt'],
        fallback: DateTime.now().toUtc().toIso8601String(),
      ),
      message: _asNullableString(json['message']),
    );
  }

  @override
  Map<String, dynamic> toJson() => <String, dynamic>{
        'id': id,
        'contentType': contentType,
        'contentId': contentId,
        if (topicId != null) 'topicId': topicId,
        'category': category,
        'description': description,
        'status': status,
        if (resolutionNote != null) 'resolutionNote': resolutionNote,
        'createdAt': createdAt,
      };

  ContentReportEntity toEntity() {
    return ContentReportEntity(
      id: id,
      contentType: ReportContentType.fromApiValue(contentType),
      contentId: contentId,
      topicId: topicId,
      category: ReportCategory.fromApiValue(category),
      description: description,
      status: status,
      resolutionNote: resolutionNote,
      createdAt: createdAt,
    );
  }
}

class ContentReportListModel extends BaseResponseModel<ContentReportListModel> {
  final List<ContentReportModel> reports;

  ContentReportListModel({required this.reports, super.message}) {
    data = this;
  }

  factory ContentReportListModel.fromJson(Map<String, dynamic> json) {
    final rawList = _asList(
      json['json'] ?? json['reports'] ?? json['items'],
    );
    return ContentReportListModel(
      reports: rawList
          .map((e) => ContentReportModel.fromJson(_asMap(e)))
          .where((r) => r.id.isNotEmpty)
          .toList(),
      message: _asNullableString(json['message']),
    );
  }

  @override
  Map<String, dynamic> toJson() => <String, dynamic>{
        'reports': reports.map((r) => r.toJson()).toList(),
      };
}
