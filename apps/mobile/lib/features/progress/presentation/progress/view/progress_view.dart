import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/core/theme/porhi_theme.dart';
import 'package:porhi/features/content_report/domain/entities/content_report_entity.dart';
import 'package:porhi/features/dashboard/domain/entities/student_overview_entity.dart';
import 'package:porhi/features/exam/domain/entities/exam_entities.dart';
import 'package:porhi/features/progress/presentation/progress/controller/progress_controller.dart';
import 'package:porhi/routes/app_routes.dart';

class ProgressView extends GetView<ProgressController> {
  final Future<void> Function()? onAccountTap;

  const ProgressView({super.key, this.onAccountTap});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Obx(() {
          final lang = controller.language.value;
          final isCached = controller.isOfflineCache.value;
          return Row(
            children: <Widget>[
              Flexible(
                child: Text(
                  AppStrings.tr(
                    'অগ্রগতি ও বিশ্লেষণ',
                    'Progress & Analytics',
                    lang,
                  ),
                  overflow: TextOverflow.ellipsis,
                ),
              ),
              if (isCached) ...<Widget>[
                const SizedBox(width: 8),
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 8,
                    vertical: 3,
                  ),
                  decoration: BoxDecoration(
                    color: const Color(0xFFFEF3C7),
                    borderRadius: BorderRadius.circular(999),
                  ),
                  child: Text(
                    AppStrings.t('common.offline', lang),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                      fontSize: 10,
                      fontWeight: FontWeight.w700,
                      color: Color(0xFF92400E),
                    ),
                  ),
                ),
              ],
            ],
          );
        }),
        actions: <Widget>[
          Obx(() {
            final lang = controller.language.value;
            return IconButton(
              key: const Key('progress_account_button'),
              tooltip: AppStrings.t('nav.account', lang),
              icon: const Icon(Icons.person_outline_rounded),
              onPressed: () => _handleAccountTap(context),
            );
          }),
        ],
      ),
      body: Obx(() {
        final lang = controller.language.value;
        final isLoading = controller.isLoading.value;
        final overview = controller.overview.value;
        final history = controller.examHistory.value;
        final error = controller.errorMessage.value;
        final status = controller.statusMessage.value;
        final isStatusErr = controller.isStatusError.value;

        if (isLoading && overview == null && history == null) {
          return const Center(child: CircularProgressIndicator());
        }

        if (error != null && overview == null && history == null) {
          return Center(
            child: Padding(
              padding: const EdgeInsets.all(24),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: <Widget>[
                  const Icon(
                    Icons.bar_chart_rounded,
                    size: 48,
                    color: PorhiTheme.slate400,
                  ),
                  const SizedBox(height: 12),
                  Text(
                    error,
                    textAlign: TextAlign.center,
                    style: const TextStyle(
                      fontSize: 14,
                      color: PorhiTheme.slate700,
                    ),
                  ),
                  const SizedBox(height: 16),
                  ElevatedButton.icon(
                    onPressed: controller.loadProgress,
                    icon: const Icon(Icons.refresh_rounded),
                    label: Text(AppStrings.t('action.retry', lang)),
                  ),
                ],
              ),
            ),
          );
        }

        final data = overview ??
            StudentOverviewEntity(subjectId: controller.activeSubjectId.value);

        return RefreshIndicator(
          onRefresh: controller.loadProgress,
          child: ListView(
            padding: const EdgeInsets.all(16),
            children: <Widget>[
              if (error != null) ...<Widget>[
                _ProgressBanner(message: error, isError: true),
                const SizedBox(height: 12),
              ],
              if (status != null) ...<Widget>[
                _ProgressBanner(message: status, isError: isStatusErr),
                const SizedBox(height: 12),
              ],
              _KpiSummaryGrid(
                overview: data,
                summary: history?.summary ?? const ExamHistorySummaryEntity(),
                lang: lang,
              ),
              const SizedBox(height: 16),
              _ScoreTrendCard(
                controller: controller,
                history: history,
                lang: lang,
              ),
              const SizedBox(height: 16),
              _WeakTopicsAndMistakesCard(
                overview: data,
                lang: lang,
                onPracticeWeakTopic: (topic) =>
                    controller.openPracticeForWeakTopic(
                  chapterId: topic.chapterId,
                  topicId: topic.topicId,
                ),
                onPracticeMistake: (mistake) =>
                    controller.openPracticeForWeakTopic(
                  chapterId: mistake.chapterId,
                  topicId: mistake.topicId,
                  mistakesOnly: true,
                ),
              ),
              const SizedBox(height: 16),
              _BookmarksAndNotesCard(
                overview: data,
                lang: lang,
                onOpenBookmark: controller.openBookmark,
              ),
              const SizedBox(height: 16),
              _ContentReportsCard(
                reports: controller.contentReports,
                lang: lang,
              ),
              const SizedBox(height: 16),
              _GuardianShareLinksCard(
                controller: controller,
                lang: lang,
              ),
              const SizedBox(height: 24),
            ],
          ),
        );
      }),
    );
  }

  Future<void> _handleAccountTap(BuildContext context) async {
    final handler = onAccountTap;
    if (handler != null) {
      await handler();
      return;
    }
    await Get.toNamed<dynamic>(AppRoutes.account);
    if (context.mounted) {
      await controller.refreshFromShell();
    }
  }
}

class _KpiSummaryGrid extends StatelessWidget {
  final StudentOverviewEntity overview;
  final ExamHistorySummaryEntity summary;
  final AppLanguage lang;

  const _KpiSummaryGrid({
    required this.overview,
    required this.summary,
    required this.lang,
  });

  @override
  Widget build(BuildContext context) {
    final items = <({String label, String value, IconData icon, Color color})>[
      (
        label: AppStrings.tr('অনুশীলন নির্ভুলতা', 'Practice Accuracy', lang),
        value:
            '${AppStrings.formatNumber(overview.practiceStats.accuracyPercent, lang)}%',
        icon: Icons.track_changes_rounded,
        color: PorhiTheme.indigo600,
      ),
      (
        label: AppStrings.tr('ধারাবাহিক স্ট্রিক', 'Study Streak', lang),
        value: AppStrings.tr(
          '${AppStrings.formatNumber(overview.streakDays, lang)} দিন',
          '${overview.streakDays}d',
          lang,
        ),
        icon: Icons.local_fire_department_rounded,
        color: const Color(0xFFD97706),
      ),
      (
        label: AppStrings.tr('মোট পরীক্ষা / গড়', 'Tests / Avg', lang),
        value:
            '${AppStrings.formatNumber(summary.totalTests, lang)} (${AppStrings.formatNumber(summary.averageAccuracy, lang)}%)',
        icon: Icons.quiz_outlined,
        color: PorhiTheme.emerald600,
      ),
      (
        label: AppStrings.tr('সর্বোচ্চ স্কোর', 'Best Score', lang),
        value:
            '${AppStrings.formatNumber(summary.bestScorePercent, lang)}%',
        icon: Icons.emoji_events_outlined,
        color: PorhiTheme.indigo700,
      ),
      (
        label: AppStrings.tr('বাকি ভুল', 'Due Mistakes', lang),
        value: AppStrings.formatNumber(overview.dueMistakes.length, lang),
        icon: Icons.refresh_rounded,
        color: PorhiTheme.rose600,
      ),
      (
        label: AppStrings.tr('সিলেবাস অগ্রগতি', 'Active Syllabus', lang),
        value:
            '${AppStrings.formatNumber(overview.syllabusProgressPercent, lang)}%',
        icon: Icons.menu_book_rounded,
        color: PorhiTheme.emerald600,
      ),
    ];

    return LayoutBuilder(
      builder: (context, constraints) {
        final tileWidth = (constraints.maxWidth - 10) / 2;
        return Wrap(
          spacing: 10,
          runSpacing: 10,
          children: items.map((item) {
            return SizedBox(
              width: tileWidth,
              child: Card(
                margin: EdgeInsets.zero,
                child: Padding(
                  padding: const EdgeInsets.all(12),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      Icon(item.icon, size: 18, color: item.color),
                      const SizedBox(height: 6),
                      Text(
                        item.value,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: const TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w800,
                          color: PorhiTheme.slate900,
                        ),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        item.label,
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                        style: const TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.w600,
                          color: PorhiTheme.slate600,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            );
          }).toList(),
        );
      },
    );
  }
}

class _ScoreTrendCard extends StatelessWidget {
  final ProgressController controller;
  final ExamHistoryEntity? history;
  final AppLanguage lang;

  const _ScoreTrendCard({
    required this.controller,
    required this.history,
    required this.lang,
  });

  @override
  Widget build(BuildContext context) {
    final trend = history?.trend ?? const <ExamHistoryTrendPointEntity>[];

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(14),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Text(
              AppStrings.tr(
                'পরীক্ষার স্কোর ট্রেন্ড',
                'Exam Score Trend',
                lang,
              ),
              style: const TextStyle(
                fontSize: 15,
                fontWeight: FontWeight.w700,
                color: PorhiTheme.slate900,
              ),
            ),
            const SizedBox(height: 8),
            Obx(() {
              final active = controller.selectedTestTypeFilter.value;
              return Wrap(
                spacing: 6,
                runSpacing: 6,
                children: ProgressController.testTypeFilters.map((type) {
                  return ChoiceChip(
                    label: Text(_testTypeLabel(type, lang)),
                    selected: active == type,
                    onSelected: (_) => controller.selectTestTypeFilter(type),
                  );
                }).toList(),
              );
            }),
            const SizedBox(height: 12),
            Obx(() {
              if (controller.isHistoryLoading.value) {
                return const SizedBox(
                  height: 160,
                  child: Center(child: CircularProgressIndicator()),
                );
              }
              if (trend.length < 2) {
                return Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(18),
                  decoration: BoxDecoration(
                    color: PorhiTheme.slate50,
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: PorhiTheme.slate200),
                  ),
                  child: Text(
                    AppStrings.tr(
                      'ট্রেন্ড গ্রাফ দেখতে অন্তত ২টি মডেল টেস্ট সম্পন্ন করো।',
                      'Complete at least 2 model tests to view your score trend chart.',
                      lang,
                    ),
                    textAlign: TextAlign.center,
                    style: const TextStyle(
                      fontSize: 13,
                      color: PorhiTheme.slate600,
                    ),
                  ),
                );
              }

              final spots = <FlSpot>[
                for (var i = 0; i < trend.length; i++)
                  FlSpot(
                    i.toDouble(),
                    trend[i].accuracyPercent.toDouble().clamp(0, 100),
                  ),
              ];

              return SizedBox(
                key: const Key('progress_trend_chart'),
                height: 190,
                child: LineChart(
                  LineChartData(
                    minY: 0,
                    maxY: 100,
                    gridData: const FlGridData(
                      show: true,
                      drawVerticalLine: false,
                      horizontalInterval: 25,
                    ),
                    borderData: FlBorderData(
                      show: true,
                      border: const Border(
                        left: BorderSide(color: PorhiTheme.slate200),
                        bottom: BorderSide(color: PorhiTheme.slate200),
                      ),
                    ),
                    titlesData: FlTitlesData(
                      topTitles: const AxisTitles(
                        sideTitles: SideTitles(showTitles: false),
                      ),
                      rightTitles: const AxisTitles(
                        sideTitles: SideTitles(showTitles: false),
                      ),
                      leftTitles: AxisTitles(
                        sideTitles: SideTitles(
                          showTitles: true,
                          reservedSize: 44,
                          interval: 25,
                          getTitlesWidget: (value, meta) {
                            return Text(
                              '${AppStrings.formatNumber(value.toInt(), lang)}%',
                              style: const TextStyle(
                                fontSize: 10,
                                color: PorhiTheme.slate600,
                              ),
                            );
                          },
                        ),
                      ),
                      bottomTitles: AxisTitles(
                        sideTitles: SideTitles(
                          showTitles: true,
                          interval: 1,
                          reservedSize: 24,
                          getTitlesWidget: (value, meta) {
                            final idx = value.toInt();
                            if (idx < 0 || idx >= trend.length) {
                              return const SizedBox.shrink();
                            }
                            return Padding(
                              padding: const EdgeInsets.only(top: 4),
                              child: Text(
                                AppStrings.formatNumber(idx + 1, lang),
                                style: const TextStyle(
                                  fontSize: 10,
                                  color: PorhiTheme.slate600,
                                ),
                              ),
                            );
                          },
                        ),
                      ),
                    ),
                    lineBarsData: <LineChartBarData>[
                      LineChartBarData(
                        spots: spots,
                        isCurved: true,
                        color: PorhiTheme.indigo600,
                        barWidth: 3,
                        dotData: const FlDotData(show: true),
                        belowBarData: BarAreaData(
                          show: true,
                          color: PorhiTheme.indigo600.withValues(alpha: 0.12),
                        ),
                      ),
                    ],
                  ),
                ),
              );
            }),
          ],
        ),
      ),
    );
  }

  String _testTypeLabel(String type, AppLanguage lang) {
    switch (type) {
      case 'CHAPTER_TEST':
        return AppStrings.tr('অধ্যায়', 'Chapter', lang);
      case 'TOPIC_TEST':
        return AppStrings.tr('টপিক', 'Topic', lang);
      case 'WEAK_AREA':
        return AppStrings.tr('দুর্বল', 'Weak', lang);
      case 'SUBJECT_TEST':
        return AppStrings.tr('বিষয়', 'Subject', lang);
      default:
        return AppStrings.tr('সব', 'All', lang);
    }
  }
}

class _WeakTopicsAndMistakesCard extends StatelessWidget {
  final StudentOverviewEntity overview;
  final AppLanguage lang;
  final ValueChanged<WeakTopicEntity> onPracticeWeakTopic;
  final ValueChanged<DueMistakeEntity> onPracticeMistake;

  const _WeakTopicsAndMistakesCard({
    required this.overview,
    required this.lang,
    required this.onPracticeWeakTopic,
    required this.onPracticeMistake,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(14),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Text(
              AppStrings.tr(
                'দুর্বল টপিক ও বাকি ভুলসমূহ',
                'Weak Topics & Due Mistakes',
                lang,
              ),
              style: const TextStyle(
                fontSize: 15,
                fontWeight: FontWeight.w700,
                color: PorhiTheme.slate900,
              ),
            ),
            const SizedBox(height: 10),
            if (overview.weakTopics.isEmpty && overview.dueMistakes.isEmpty)
              Text(
                AppStrings.tr(
                  'কোনো দুর্বল টপিক বা বাকি ভুল নেই — দারুণ অগ্রগতি!',
                  'No weak topics or due mistakes — great progress!',
                  lang,
                ),
                style: const TextStyle(
                  fontSize: 13,
                  color: PorhiTheme.slate600,
                ),
              )
            else ...<Widget>[
              ...overview.weakTopics.map(
                (topic) => Padding(
                  padding: const EdgeInsets.only(bottom: 8),
                  child: Container(
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(
                      color: PorhiTheme.slate50,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: PorhiTheme.slate200),
                    ),
                    child: Row(
                      children: <Widget>[
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: <Widget>[
                              Text(
                                topic.topicTitle,
                                style: const TextStyle(
                                  fontWeight: FontWeight.w700,
                                  fontSize: 13,
                                  color: PorhiTheme.slate900,
                                ),
                              ),
                              const SizedBox(height: 2),
                              Text(
                                AppStrings.tr(
                                  'নির্ভুলতা: ${AppStrings.formatNumber(topic.accuracy, lang)}% • ভুল: ${AppStrings.formatNumber(topic.mistakeCount, lang)}',
                                  'Accuracy: ${topic.accuracy}% • Mistakes: ${topic.mistakeCount}',
                                  lang,
                                ),
                                style: const TextStyle(
                                  fontSize: 12,
                                  color: PorhiTheme.slate600,
                                ),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(width: 8),
                        OutlinedButton(
                          onPressed: () => onPracticeWeakTopic(topic),
                          child: Text(
                            AppStrings.tr('অনুশীলন', 'Practice', lang),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
              ...overview.dueMistakes.take(5).map(
                (mistake) => Padding(
                  padding: const EdgeInsets.only(bottom: 8),
                  child: Container(
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(
                      color: const Color(0xFFFFF1F2),
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: const Color(0xFFFECDD3)),
                    ),
                    child: Row(
                      children: <Widget>[
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: <Widget>[
                              Text(
                                mistake.stem,
                                maxLines: 2,
                                overflow: TextOverflow.ellipsis,
                                style: const TextStyle(
                                  fontWeight: FontWeight.w600,
                                  fontSize: 13,
                                  color: PorhiTheme.slate900,
                                ),
                              ),
                              const SizedBox(height: 2),
                              Text(
                                mistake.topicTitle,
                                style: const TextStyle(
                                  fontSize: 11,
                                  color: PorhiTheme.slate600,
                                ),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(width: 8),
                        TextButton(
                          onPressed: () => onPracticeMistake(mistake),
                          child: Text(
                            AppStrings.tr('রিভিশন', 'Review', lang),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}

class _BookmarksAndNotesCard extends StatelessWidget {
  final StudentOverviewEntity overview;
  final AppLanguage lang;
  final ValueChanged<StudentBookmarkEntity> onOpenBookmark;

  const _BookmarksAndNotesCard({
    required this.overview,
    required this.lang,
    required this.onOpenBookmark,
  });

  @override
  Widget build(BuildContext context) {
    final bookmarks = overview.bookmarks;
    final notesCount = overview.lessonNotes.length;

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(14),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Row(
              children: <Widget>[
                Expanded(
                  child: Text(
                    AppStrings.tr(
                      'বুকমার্ক ও নোটস',
                      'Bookmarks & Notes',
                      lang,
                    ),
                    style: const TextStyle(
                      fontSize: 15,
                      fontWeight: FontWeight.w700,
                      color: PorhiTheme.slate900,
                    ),
                  ),
                ),
                Text(
                  AppStrings.tr(
                    'নোট: ${AppStrings.formatNumber(notesCount, lang)}',
                    'Notes: $notesCount',
                    lang,
                  ),
                  style: const TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w600,
                    color: PorhiTheme.indigo700,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 10),
            if (bookmarks.isEmpty)
              Text(
                AppStrings.tr(
                  'এখনো কোনো টপিক বা প্রশ্ন বুকমার্ক করা হয়নি।',
                  'No bookmarks saved yet.',
                  lang,
                ),
                style: const TextStyle(
                  fontSize: 13,
                  color: PorhiTheme.slate600,
                ),
              )
            else
              ...bookmarks.take(5).map(
                (bookmark) => ListTile(
                  contentPadding: EdgeInsets.zero,
                  dense: true,
                  leading: const Icon(
                    Icons.bookmark_rounded,
                    color: PorhiTheme.indigo600,
                    size: 20,
                  ),
                  title: Text(
                    bookmark.titleBangla,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                      fontSize: 13,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  subtitle: bookmark.subtitleBangla != null
                      ? Text(
                          bookmark.subtitleBangla!,
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(fontSize: 11),
                        )
                      : null,
                  trailing: const Icon(Icons.chevron_right_rounded, size: 18),
                  onTap: () => onOpenBookmark(bookmark),
                ),
              ),
          ],
        ),
      ),
    );
  }
}

class _ContentReportsCard extends StatelessWidget {
  final List<ContentReportEntity> reports;
  final AppLanguage lang;

  const _ContentReportsCard({
    required this.reports,
    required this.lang,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(14),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Text(
              AppStrings.tr(
                'আমার কন্টেন্ট রিপোর্টসমূহ',
                'My Content Reports',
                lang,
              ),
              style: const TextStyle(
                fontSize: 15,
                fontWeight: FontWeight.w700,
                color: PorhiTheme.slate900,
              ),
            ),
            const SizedBox(height: 10),
            if (reports.isEmpty)
              Text(
                AppStrings.tr(
                  'তুমি এখনো কোনো প্রশ্ন বা লেসনের ভুল রিপোর্ট করোনি।',
                  'You have not submitted any content reports yet.',
                  lang,
                ),
                style: const TextStyle(
                  fontSize: 13,
                  color: PorhiTheme.slate600,
                ),
              )
            else
              ...reports.map(
                (report) => Padding(
                  padding: const EdgeInsets.only(bottom: 8),
                  child: Container(
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(
                      color: PorhiTheme.slate50,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: PorhiTheme.slate200),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: <Widget>[
                        Row(
                          children: <Widget>[
                            Expanded(
                              child: Text(
                                lang == AppLanguage.bn
                                    ? report.category.labelBn
                                    : report.category.labelEn,
                                style: const TextStyle(
                                  fontSize: 12,
                                  fontWeight: FontWeight.w700,
                                  color: PorhiTheme.slate900,
                                ),
                              ),
                            ),
                            _ReportStatusBadge(status: report.status),
                          ],
                        ),
                        const SizedBox(height: 4),
                        Text(
                          report.description,
                          style: const TextStyle(
                            fontSize: 13,
                            color: PorhiTheme.slate700,
                          ),
                        ),
                        if (report.resolutionNote != null &&
                            report.resolutionNote!.trim().isNotEmpty) ...<Widget>[
                          const SizedBox(height: 4),
                          Text(
                            AppStrings.tr(
                              'সমাধান নোট: ${report.resolutionNote}',
                              'Resolution: ${report.resolutionNote}',
                              lang,
                            ),
                            style: const TextStyle(
                              fontSize: 12,
                              fontWeight: FontWeight.w600,
                              color: PorhiTheme.emerald600,
                            ),
                          ),
                        ],
                      ],
                    ),
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}

class _ReportStatusBadge extends StatelessWidget {
  final String status;

  const _ReportStatusBadge({required this.status});

  @override
  Widget build(BuildContext context) {
    final normalized = status.trim().toUpperCase();
    final (Color bg, Color fg) = switch (normalized) {
      'RESOLVED' => (PorhiTheme.emerald50, PorhiTheme.emerald600),
      'IN_REVIEW' => (PorhiTheme.indigo50, PorhiTheme.indigo700),
      'DISMISSED' => (PorhiTheme.slate100, PorhiTheme.slate600),
      _ => (const Color(0xFFFEF3C7), const Color(0xFF92400E)),
    };

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(999),
      ),
      child: Text(
        normalized,
        style: TextStyle(
          fontSize: 10,
          fontWeight: FontWeight.w700,
          color: fg,
        ),
      ),
    );
  }
}

class _GuardianShareLinksCard extends StatelessWidget {
  final ProgressController controller;
  final AppLanguage lang;

  const _GuardianShareLinksCard({
    required this.controller,
    required this.lang,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(14),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Text(
              AppStrings.tr(
                'অভিভাবক ও শিক্ষক শেয়ার লিংক',
                'Guardian & Teacher Share Links',
                lang,
              ),
              style: const TextStyle(
                fontSize: 15,
                fontWeight: FontWeight.w700,
                color: PorhiTheme.slate900,
              ),
            ),
            const SizedBox(height: 8),
            Obx(() {
              final audience = controller.selectedAudience.value;
              return Wrap(
                spacing: 8,
                runSpacing: 6,
                children: <Widget>[
                  ChoiceChip(
                    label: Text(AppStrings.tr('অভিভাবক', 'Parent', lang)),
                    selected: audience == 'PARENT',
                    onSelected: (_) => controller.setAudience('PARENT'),
                  ),
                  ChoiceChip(
                    label: Text(AppStrings.tr('শিক্ষক', 'Teacher', lang)),
                    selected: audience == 'TEACHER',
                    onSelected: (_) => controller.setAudience('TEACHER'),
                  ),
                ],
              );
            }),
            const SizedBox(height: 10),
            TextField(
              key: const Key('guardian_recipient_input'),
              controller: controller.recipientLabelController,
              decoration: InputDecoration(
                labelText: AppStrings.tr(
                  'প্রাপকের নাম (ঐচ্ছিক)',
                  'Recipient Label (optional)',
                  lang,
                ),
                hintText: AppStrings.tr(
                  'যেমন: মা / পদার্থবিজ্ঞান স্যার',
                  'e.g. Mom / Physics Teacher',
                  lang,
                ),
              ),
            ),
            const SizedBox(height: 10),
            Obx(() {
              final creating = controller.isCreatingShareLink.value;
              return SizedBox(
                width: double.infinity,
                child: ElevatedButton.icon(
                  key: const Key('guardian_create_link_btn'),
                  onPressed: creating ? null : controller.createShareLink,
                  icon: creating
                      ? const SizedBox(
                          width: 16,
                          height: 16,
                          child: CircularProgressIndicator(strokeWidth: 2),
                        )
                      : const Icon(Icons.add_link_rounded, size: 18),
                  label: Text(
                    AppStrings.tr(
                      'শেয়ার লিংক তৈরি করো',
                      'Create Share Link',
                      lang,
                    ),
                  ),
                ),
              );
            }),
            const SizedBox(height: 12),
            Obx(() {
              final links = controller.shareLinks;
              if (links.isEmpty) {
                return Text(
                  AppStrings.tr(
                    'কোনো শেয়ার লিংক তৈরি করা হয়নি।',
                    'No guardian share links created yet.',
                    lang,
                  ),
                  style: const TextStyle(
                    fontSize: 13,
                    color: PorhiTheme.slate600,
                  ),
                );
              }
              return Column(
                children: links.map((link) {
                  final fullUrl = controller.buildShareUrl(link);
                  final isRevoking =
                      controller.revokingShareIds.contains(link.id);
                  return Padding(
                    padding: const EdgeInsets.only(bottom: 8),
                    child: Container(
                      padding: const EdgeInsets.all(10),
                      decoration: BoxDecoration(
                        color: PorhiTheme.slate50,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(color: PorhiTheme.slate200),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: <Widget>[
                          Wrap(
                            spacing: 6,
                            runSpacing: 4,
                            crossAxisAlignment: WrapCrossAlignment.center,
                            children: <Widget>[
                              Text(
                                link.recipientLabel?.isNotEmpty == true
                                    ? '${link.audience} • ${link.recipientLabel}'
                                    : link.audience,
                                style: const TextStyle(
                                  fontSize: 12,
                                  fontWeight: FontWeight.w700,
                                  color: PorhiTheme.slate900,
                                ),
                              ),
                              _ReportStatusBadge(
                                status: link.isActive ? 'ACTIVE' : 'REVOKED',
                              ),
                            ],
                          ),
                          const SizedBox(height: 4),
                          SelectableText(
                            fullUrl,
                            style: const TextStyle(
                              fontSize: 12,
                              color: PorhiTheme.indigo700,
                            ),
                          ),
                          const SizedBox(height: 8),
                          Wrap(
                            spacing: 8,
                            runSpacing: 6,
                            children: <Widget>[
                              OutlinedButton.icon(
                                key: Key('share_copy_${link.id}'),
                                onPressed: () => controller.copyShareLink(link),
                                icon: const Icon(Icons.copy_rounded, size: 15),
                                label: Text(
                                  AppStrings.tr('কপি', 'Copy', lang),
                                ),
                              ),
                              OutlinedButton.icon(
                                key: Key('share_send_${link.id}'),
                                onPressed: () =>
                                    controller.shareGuardianLink(link),
                                icon: const Icon(Icons.share_rounded, size: 15),
                                label: Text(
                                  AppStrings.tr('শেয়ার', 'Share', lang),
                                ),
                              ),
                              if (link.isActive)
                                TextButton.icon(
                                  key: Key('share_revoke_${link.id}'),
                                  onPressed: isRevoking
                                      ? null
                                      : () =>
                                          controller.revokeShareLink(link.id),
                                  icon: const Icon(
                                    Icons.link_off_rounded,
                                    size: 15,
                                    color: PorhiTheme.rose600,
                                  ),
                                  label: Text(
                                    AppStrings.tr('বাতিল', 'Revoke', lang),
                                    style: const TextStyle(
                                      color: PorhiTheme.rose600,
                                    ),
                                  ),
                                ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  );
                }).toList(),
              );
            }),
          ],
        ),
      ),
    );
  }
}

class _ProgressBanner extends StatelessWidget {
  final String message;
  final bool isError;

  const _ProgressBanner({
    required this.message,
    required this.isError,
  });

  @override
  Widget build(BuildContext context) {
    final bgColor = isError ? const Color(0xFFFFF1F2) : PorhiTheme.emerald50;
    final borderColor =
        isError ? const Color(0xFFFECDD3) : const Color(0xFFA7F3D0);
    final textColor = isError ? PorhiTheme.rose600 : PorhiTheme.slate900;
    final iconColor = isError ? PorhiTheme.rose600 : PorhiTheme.emerald600;

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      decoration: BoxDecoration(
        color: bgColor,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: borderColor),
      ),
      child: Row(
        children: <Widget>[
          Icon(
            isError ? Icons.error_outline_rounded : Icons.check_circle_outline,
            size: 18,
            color: iconColor,
          ),
          const SizedBox(width: 8),
          Expanded(
            child: Text(
              message,
              style: TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.w600,
                color: textColor,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
