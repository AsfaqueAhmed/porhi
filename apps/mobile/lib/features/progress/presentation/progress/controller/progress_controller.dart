import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:get/get.dart';
import 'package:porhi/app/env.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/core/services/share_gateway.dart';
import 'package:porhi/features/auth/domain/usecases/auth_usecases.dart';
import 'package:porhi/features/content_report/domain/entities/content_report_entity.dart';
import 'package:porhi/features/content_report/domain/usecases/content_report_usecases.dart';
import 'package:porhi/features/dashboard/domain/entities/student_overview_entity.dart';
import 'package:porhi/features/dashboard/domain/usecases/student_usecases.dart';
import 'package:porhi/features/exam/domain/entities/exam_entities.dart';
import 'package:porhi/features/exam/domain/usecases/exam_usecases.dart';
import 'package:porhi/features/lesson/domain/entities/lesson_entities.dart';
import 'package:porhi/features/practice/domain/entities/practice_entities.dart';
import 'package:porhi/routes/app_routes.dart';

typedef ClipboardWriter = Future<void> Function(String text);

class ProgressController extends GetxController {
  static const List<String> testTypeFilters = <String>[
    'ALL',
    'CHAPTER_TEST',
    'TOPIC_TEST',
    'WEAK_TOPIC_TEST',
    'SUBJECT_TEST',
  ];

  final GetOverviewUseCase _getOverviewUseCase;
  final GetCachedOverviewUseCase _getCachedOverviewUseCase;
  final GetExamHistoryUseCase _getExamHistoryUseCase;
  final ListShareLinksUseCase _listShareLinksUseCase;
  final CreateShareLinkUseCase _createShareLinkUseCase;
  final RevokeShareLinkUseCase _revokeShareLinkUseCase;
  final ListMyContentReportsUseCase _listMyContentReportsUseCase;
  final GetLanguageUseCase _getLanguageUseCase;
  final GetCachedUserUseCase _getCachedUserUseCase;
  final GetActiveSubjectIdUseCase _getActiveSubjectIdUseCase;
  final EnvConfig _envConfig;
  final ShareGateway _shareGateway;
  final ClipboardWriter _clipboardWriter;

  ProgressController({
    required this._getOverviewUseCase,
    required this._getCachedOverviewUseCase,
    required this._getExamHistoryUseCase,
    required this._listShareLinksUseCase,
    required this._createShareLinkUseCase,
    required this._revokeShareLinkUseCase,
    required this._listMyContentReportsUseCase,
    required this._getLanguageUseCase,
    required this._getCachedUserUseCase,
    required this._getActiveSubjectIdUseCase,
    required this._envConfig,
    required this._shareGateway,
    ClipboardWriter? clipboardWriter,
  }) : _clipboardWriter = clipboardWriter ?? _defaultClipboardWriter;

  static Future<void> _defaultClipboardWriter(String text) {
    return Clipboard.setData(ClipboardData(text: text));
  }

  final TextEditingController recipientLabelController = TextEditingController();

  final Rx<AppLanguage> language = AppLanguage.bn.obs;
  final RxString activeSubjectId = 'sub_ssc_physics'.obs;
  final Rxn<StudentOverviewEntity> overview = Rxn<StudentOverviewEntity>();
  final Rxn<ExamHistoryEntity> examHistory = Rxn<ExamHistoryEntity>();
  final RxString selectedTestTypeFilter = 'ALL'.obs;
  final RxList<GuardianShareLinkEntity> shareLinks =
      <GuardianShareLinkEntity>[].obs;
  final RxList<ContentReportEntity> contentReports =
      <ContentReportEntity>[].obs;
  final RxString selectedAudience = 'PARENT'.obs;

  final RxBool isLoading = false.obs;
  final RxBool isHistoryLoading = false.obs;
  final RxBool isCreatingShareLink = false.obs;
  final RxSet<String> revokingShareIds = <String>{}.obs;
  final RxBool isOfflineCache = false.obs;
  final RxnString errorMessage = RxnString();
  final RxnString statusMessage = RxnString();
  final RxBool isStatusError = false.obs;

  int _loadGeneration = 0;
  int _historyGeneration = 0;
  bool _isNavigating = false;

  @override
  void onInit() {
    super.onInit();
    refreshPreferences();
    loadProgress();
  }

  void refreshPreferences() {
    language.value = AppLanguage.fromCode(_getLanguageUseCase());
    final user = _getCachedUserUseCase();
    final nextSubject = _getActiveSubjectIdUseCase(user?.selectedClass);
    if (activeSubjectId.value != nextSubject) {
      activeSubjectId.value = nextSubject;
      overview.value = null;
    }
  }

  Future<void> refreshFromShell() async {
    refreshPreferences();
    await loadProgress();
  }

  String buildShareUrl(GuardianShareLinkEntity link) {
    return _envConfig.guardianShareUrl(link.sharePath);
  }

  Future<void> loadProgress() async {
    final generation = ++_loadGeneration;
    refreshPreferences();
    isLoading.value = true;
    errorMessage.value = null;

    final subject = activeSubjectId.value;
    try {
      if (overview.value == null) {
        final cached = await _getCachedOverviewUseCase(subjectId: subject);
        if (isClosed || generation != _loadGeneration) return;
        if (cached != null) {
          overview.value = cached;
          isOfflineCache.value = true;
        }
      }

      final results = await Future.wait<dynamic>(<Future<dynamic>>[
        _getOverviewUseCase(subjectId: subject),
        _getExamHistoryUseCase(
          subjectId: subject,
          testType: selectedTestTypeFilter.value,
        ),
        _listShareLinksUseCase(),
        _listMyContentReportsUseCase(),
      ]);

      if (isClosed || generation != _loadGeneration) return;

      final overviewResult = results[0];
      final historyResult = results[1];
      final shareResult = results[2];
      final reportResult = results[3];

      String? firstError;

      overviewResult.fold(
        (err) {
          firstError ??= _resolveError(
            err.message,
            AppStrings.tr(
              'অগ্রগতির তথ্য লোড করা যায়নি।',
              'Could not load progress overview.',
              language.value,
            ),
          );
          if (overview.value != null) {
            isOfflineCache.value = true;
          }
        },
        (data) {
          overview.value = data as StudentOverviewEntity;
          isOfflineCache.value = data.isFromCache;
        },
      );

      historyResult.fold(
        (err) {
          firstError ??= _resolveError(
            err.message,
            AppStrings.tr(
              'পরীক্ষার ইতিহাস লোড করা যায়নি।',
              'Could not load exam history.',
              language.value,
            ),
          );
        },
        (data) {
          examHistory.value = data as ExamHistoryEntity;
        },
      );

      shareResult.fold(
        (err) {
          firstError ??= _resolveError(
            err.message,
            AppStrings.tr(
              'অভিভাবক শেয়ার লিংক লোড করা যায়নি।',
              'Could not load guardian share links.',
              language.value,
            ),
          );
        },
        (data) {
          shareLinks.assignAll(data as List<GuardianShareLinkEntity>);
        },
      );

      reportResult.fold(
        (err) {
          firstError ??= _resolveError(
            err.message,
            AppStrings.tr(
              'রিপোর্টের তালিকা লোড করা যায়নি।',
              'Could not load content reports.',
              language.value,
            ),
          );
        },
        (data) {
          contentReports.assignAll(data as List<ContentReportEntity>);
        },
      );

      if (firstError != null) {
        errorMessage.value = firstError;
      }
    } finally {
      if (!isClosed && generation == _loadGeneration) {
        isLoading.value = false;
      }
    }
  }

  Future<void> selectTestTypeFilter(String testType) async {
    if (selectedTestTypeFilter.value == testType) return;
    selectedTestTypeFilter.value = testType;
    final generation = ++_historyGeneration;
    isHistoryLoading.value = true;

    try {
      final result = await _getExamHistoryUseCase(
        subjectId: activeSubjectId.value,
        testType: testType,
      );
      if (isClosed || generation != _historyGeneration) return;
      result.fold(
        (err) {
          _showStatus(
            _resolveError(
              err.message,
              AppStrings.tr(
                'পরীক্ষার ফলাফল ফিল্টার করা যায়নি।',
                'Could not filter exam history.',
                language.value,
              ),
            ),
            isError: true,
          );
        },
        (data) {
          examHistory.value = data;
        },
      );
    } finally {
      if (!isClosed && generation == _historyGeneration) {
        isHistoryLoading.value = false;
      }
    }
  }

  void setAudience(String audience) {
    selectedAudience.value = audience;
  }

  Future<void> createShareLink() async {
    if (isCreatingShareLink.value) return;
    isCreatingShareLink.value = true;
    statusMessage.value = null;
    isStatusError.value = false;

    try {
      final rawLabel = recipientLabelController.text.trim();
      final result = await _createShareLinkUseCase(
        audience: selectedAudience.value,
        recipientLabel: rawLabel.isEmpty ? null : rawLabel,
      );
      if (isClosed) return;

      result.fold(
        (err) {
          _showStatus(
            _resolveError(
              err.message,
              AppStrings.tr(
                'শেয়ার লিংক তৈরি করা যায়নি।',
                'Could not create share link.',
                language.value,
              ),
            ),
            isError: true,
          );
        },
        (created) {
          shareLinks.insert(0, created);
          recipientLabelController.clear();
          _showStatus(
            AppStrings.tr(
              'অভিভাবক শেয়ার লিংক তৈরি হয়েছে।',
              'Guardian share link created.',
              language.value,
            ),
          );
        },
      );
    } finally {
      if (!isClosed) {
        isCreatingShareLink.value = false;
      }
    }
  }

  Future<void> revokeShareLink(String id) async {
    if (revokingShareIds.contains(id)) return;
    revokingShareIds.add(id);
    statusMessage.value = null;
    isStatusError.value = false;

    try {
      final result = await _revokeShareLinkUseCase(id);
      if (isClosed) return;

      result.fold(
        (err) {
          _showStatus(
            _resolveError(
              err.message,
              AppStrings.tr(
                'শেয়ার লিংক বাতিল করা যায়নি।',
                'Could not revoke share link.',
                language.value,
              ),
            ),
            isError: true,
          );
        },
        (updated) {
          final index = shareLinks.indexWhere((l) => l.id == updated.id);
          if (index >= 0) {
            shareLinks[index] = updated;
          }
          _showStatus(
            AppStrings.tr(
              'শেয়ার লিংক বাতিল করা হয়েছে।',
              'Share link revoked.',
              language.value,
            ),
          );
        },
      );
    } finally {
      if (!isClosed) {
        revokingShareIds.remove(id);
      }
    }
  }

  Future<void> copyShareLink(GuardianShareLinkEntity link) async {
    final fullUrl = buildShareUrl(link);
    await _clipboardWriter(fullUrl);
    if (isClosed) return;
    _showStatus(
      AppStrings.tr(
        'লিংক কপি করা হয়েছে: $fullUrl',
        'Copied link: $fullUrl',
        language.value,
      ),
    );
  }

  Future<void> shareGuardianLink(GuardianShareLinkEntity link) async {
    final fullUrl = buildShareUrl(link);
    final label = link.recipientLabel?.trim();
    final subject = AppStrings.tr(
      'পড়ি — শিক্ষার্থীর অগ্রগতি রিপোর্ট',
      'porhi — Student Progress Report',
      language.value,
    );
    final message = AppStrings.tr(
      '${label != null && label.isNotEmpty ? '$label-এর জন্য ' : ''}আমার পড়ি (porhi) পড়াশোনার অগ্রগতি দেখুন: $fullUrl',
      'View ${label != null && label.isNotEmpty ? "$label's " : ''}porhi study progress report: $fullUrl',
      language.value,
    );
    await _shareGateway.shareText(message, subject: subject);
  }

  Future<void> openPracticeForWeakTopic({
    required String chapterId,
    required String topicId,
    bool mistakesOnly = false,
  }) async {
    if (_isNavigating || chapterId.trim().isEmpty) return;
    _isNavigating = true;
    try {
      await Get.toNamed<dynamic>(
        AppRoutes.practiceForChapter(chapterId),
        arguments: PracticeRouteArgs(
          subjectId: activeSubjectId.value,
          topicId: topicId.trim().isEmpty ? null : topicId.trim(),
          mode: mistakesOnly ? 'mistakes' : null,
        ),
      );
    } finally {
      _isNavigating = false;
    }
  }

  Future<void> openBookmark(StudentBookmarkEntity bookmark) async {
    if (_isNavigating) return;
    _isNavigating = true;
    try {
      final href = bookmark.href.trim();
      if (href.startsWith('/lesson/') || bookmark.type == 'topic') {
        final topicId = href.startsWith('/lesson/')
            ? href.substring('/lesson/'.length).split('?').first
            : bookmark.id;
        if (topicId.isNotEmpty) {
          await Get.toNamed<dynamic>(
            AppRoutes.lessonForTopic(topicId),
            arguments: LessonRouteArgs(
              subjectId: activeSubjectId.value,
              topicTitle: bookmark.titleBangla,
            ),
          );
        }
      } else if (href.startsWith('/practice/')) {
        final chapterId =
            href.substring('/practice/'.length).split('?').first;
        if (chapterId.isNotEmpty) {
          await Get.toNamed<dynamic>(
            AppRoutes.practiceForChapter(chapterId),
            arguments: PracticeRouteArgs(subjectId: activeSubjectId.value),
          );
        }
      }
    } finally {
      _isNavigating = false;
    }
  }

  String _resolveError(String? rawMessage, String fallback) {
    final trimmed = rawMessage?.trim();
    if (trimmed != null && trimmed.isNotEmpty) {
      return trimmed;
    }
    return fallback;
  }

  void _showStatus(String message, {bool isError = false}) {
    statusMessage.value = message;
    isStatusError.value = isError;
  }

  @override
  void onClose() {
    recipientLabelController.dispose();
    super.onClose();
  }
}
