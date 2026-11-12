import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/core/theme/porhi_theme.dart';
import 'package:porhi/features/curriculum/domain/entities/curriculum_entities.dart';
import 'package:porhi/features/curriculum/presentation/curriculum/controller/chapter_index_controller.dart';
import 'package:porhi/features/curriculum/presentation/curriculum/widgets/chapter_accordion_card.dart';
import 'package:porhi/features/lesson/domain/entities/lesson_entities.dart';
import 'package:porhi/features/practice/domain/entities/practice_entities.dart';
import 'package:porhi/routes/app_routes.dart';

class ChapterIndexView extends GetView<ChapterIndexController> {
  const ChapterIndexView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Obx(() {
          final lang = controller.language.value;
          final isOffline = controller.isOfflineMode.value;
          return Row(
            children: <Widget>[
              Flexible(
                child: Text(
                  AppStrings.tr('কারিকুলাম সূচি', 'Curriculum Index', lang),
                  overflow: TextOverflow.ellipsis,
                ),
              ),
              if (isOffline) ...<Widget>[
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
            final collapsed = controller.allCollapsed;
            return IconButton(
              key: const Key('expand_collapse_all_btn'),
              tooltip: collapsed
                  ? AppStrings.tr('সবগুলো খুলুন', 'Expand All', lang)
                  : AppStrings.tr('সবগুলো সঙ্কুচিত করুন', 'Collapse All', lang),
              icon: Icon(
                collapsed
                    ? Icons.unfold_more_rounded
                    : Icons.unfold_less_rounded,
              ),
              onPressed: controller.allChapters.isEmpty
                  ? null
                  : controller.toggleExpandCollapseAll,
            );
          }),
        ],
      ),
      body: Obx(() {
        final lang = controller.language.value;
        final isLoading = controller.isLoading.value;
        final error = controller.errorMessage.value;
        final chapters = controller.filteredChapters;
        final totalCount = controller.allChapters.length;

        if (isLoading && totalCount == 0) {
          return const Center(child: CircularProgressIndicator());
        }

        if (error != null && totalCount == 0) {
          return Center(
            child: Padding(
              padding: const EdgeInsets.all(24),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: <Widget>[
                  const Icon(
                    Icons.cloud_off_rounded,
                    size: 48,
                    color: PorhiTheme.slate400,
                  ),
                  const SizedBox(height: 12),
                  Text(
                    error,
                    textAlign: TextAlign.center,
                    style: const TextStyle(color: PorhiTheme.slate700),
                  ),
                  const SizedBox(height: 16),
                  ElevatedButton.icon(
                    onPressed: controller.loadChapters,
                    icon: const Icon(Icons.refresh_rounded),
                    label: Text(AppStrings.t('action.retry', lang)),
                  ),
                ],
              ),
            ),
          );
        }

        final statusMsg = controller.packStatusMessage.value;
        final isStatusErr = controller.isPackStatusError.value;

        return RefreshIndicator(
          onRefresh: controller.loadChapters,
          child: ListView(
            padding: const EdgeInsets.all(16),
            children: <Widget>[
              if (statusMsg != null) ...<Widget>[
                Container(
                  key: const Key('offline_pack_status_banner'),
                  padding: const EdgeInsets.symmetric(
                    horizontal: 14,
                    vertical: 10,
                  ),
                  decoration: BoxDecoration(
                    color: isStatusErr
                        ? const Color(0xFFFFF1F2)
                        : PorhiTheme.emerald50,
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(
                      color: isStatusErr
                          ? const Color(0xFFFECDD3)
                          : const Color(0xFFA7F3D0),
                    ),
                  ),
                  child: Row(
                    children: <Widget>[
                      Icon(
                        isStatusErr
                            ? Icons.error_outline_rounded
                            : Icons.check_circle_outline_rounded,
                        size: 18,
                        color: isStatusErr
                            ? PorhiTheme.rose600
                            : PorhiTheme.emerald600,
                      ),
                      const SizedBox(width: 8),
                      Expanded(
                        child: Text(
                          statusMsg,
                          style: TextStyle(
                            fontSize: 12.5,
                            fontWeight: FontWeight.w600,
                            color: isStatusErr
                                ? PorhiTheme.rose600
                                : PorhiTheme.slate900,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 12),
              ],
              _CurriculumHeaderCard(
                language: lang,
                subjectId: controller.subjectId.value,
                completedCount: controller.completedTopicsCount,
                totalTopics: controller.totalTopics,
                progressPercent: controller.overallProgressPercent,
                searchController: controller.searchController,
                searchQuery: controller.searchQuery.value,
                filterMode: controller.filterMode.value,
                onSearchChanged: controller.onSearchQueryChanged,
                onClearSearch: controller.clearSearchQuery,
                onSelectFilter: controller.selectFilterMode,
                onOpenSubjectExam: () => _openNamedRouteOrNotice(
                  context,
                  AppRoutes.examForChapter(
                    'subject_${controller.subjectId.value}',
                  ),
                  lang,
                ),
                onOpenBoardArchive: () => _openNamedRouteOrNotice(
                  context,
                  AppRoutes.boardArchive,
                  lang,
                ),
              ),
              const SizedBox(height: 14),
              Row(
                children: <Widget>[
                  const Icon(
                    Icons.layers_outlined,
                    size: 16,
                    color: PorhiTheme.indigo600,
                  ),
                  const SizedBox(width: 6),
                  Expanded(
                    child: Text(
                      lang == AppLanguage.bn
                          ? '${AppStrings.formatNumber(totalCount, lang)}টি অধ্যায় • ${AppStrings.formatNumber(controller.totalTopics, lang)}টি টপিক'
                          : '$totalCount Chapters • ${controller.totalTopics} Topics',
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(
                        fontSize: 13,
                        fontWeight: FontWeight.w700,
                        color: PorhiTheme.slate700,
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 10),
              if (chapters.isEmpty)
                Padding(
                  padding: const EdgeInsets.symmetric(vertical: 32),
                  child: Center(
                    child: Text(
                      AppStrings.t('common.noData', lang),
                      style: const TextStyle(color: PorhiTheme.slate600),
                    ),
                  ),
                )
              else
                ...chapters.map((chapter) {
                  final downloadedInfo =
                      controller.downloadedChaptersMap[chapter.id];
                  return Padding(
                    padding: const EdgeInsets.only(bottom: 12),
                    child: ChapterAccordionCard(
                      chapter: chapter,
                      language: lang,
                      isCollapsed:
                          controller.collapsedChapterIds.contains(chapter.id),
                      isDownloaded: downloadedInfo != null,
                      isDownloading:
                          controller.isChapterDownloading(chapter.id),
                      downloadedSizeBytes: downloadedInfo?.sizeBytes,
                      completedTopicIds: controller.completedTopicIds.toSet(),
                      bookmarkedTopicIds: controller.bookmarkedTopicIds.toSet(),
                      onToggleExpand: () =>
                          controller.toggleChapterExpanded(chapter.id),
                      onToggleOfflinePack: () =>
                          controller.toggleOfflinePack(chapter),
                      onPracticeTap: () => _openNamedRouteOrNotice(
                        context,
                        AppRoutes.practiceForChapter(chapter.id),
                        lang,
                        arguments: PracticeRouteArgs(
                          chapterTitle: chapter.titleBangla,
                          subjectId: controller.subjectId.value,
                        ),
                      ),
                      onExamTap: () => _openNamedRouteOrNotice(
                        context,
                        AppRoutes.examForChapter(chapter.id),
                        lang,
                      ),
                      onTopicTap: (topic) =>
                          _openTopicOrOfflinePreview(context, chapter, topic, lang),
                      onToggleBookmark: (topic) =>
                          controller.toggleTopicBookmark(chapter, topic),
                    ),
                  );
                }),
              const SizedBox(height: 16),
            ],
          ),
        );
      }),
    );
  }

  Future<void> _openTopicOrOfflinePreview(
    BuildContext context,
    ChapterEntity chapter,
    TopicEntity topic,
    AppLanguage lang,
  ) async {
    final lessonRoute = AppRoutes.lessonForTopic(topic.id);
    if (_isRouteRegistered(lessonRoute)) {
      final siblingTopics = chapter.topics
          .map(
            (item) => LessonSiblingTopicEntity(
              id: item.id,
              chapterId: chapter.id,
              orderIndex: item.orderIndex,
              titleBangla: item.titleBangla,
              hasInteractiveLab: item.hasInteractiveLab,
            ),
          )
          .toList();
      await controller.runLessonNavigation(() async {
        await Get.toNamed(
          lessonRoute,
          arguments: LessonRouteArgs(
            subjectId: controller.subjectId.value,
            chapterId: chapter.id,
            chapterTitle: chapter.titleBangla,
            topicTitle: topic.titleBangla,
            siblingTopics: siblingTopics,
          ),
        );
        await controller.refreshOverviewStateFromCache();
      });
      return;
    }

    if (controller.isChapterDownloaded(chapter.id)) {
      final pack = await controller.loadOfflinePack(chapter.id);
      if (!context.mounted) return;
      if (pack != null) {
        await _showOfflineChapterPreviewSheet(context, pack, topic, lang);
        return;
      }
    }

    if (!context.mounted) return;
    _showUpcomingModuleNotice(context, lang);
  }

  void _openNamedRouteOrNotice(
    BuildContext context,
    String route,
    AppLanguage lang, {
    Object? arguments,
  }) {
    if (_isRouteRegistered(route)) {
      Get.toNamed(route, arguments: arguments);
      return;
    }
    _showUpcomingModuleNotice(context, lang);
  }

  bool _isRouteRegistered(String route) {
    return Get.routeTree.matchRoute(route).route != null;
  }

  void _showUpcomingModuleNotice(BuildContext context, AppLanguage lang) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          AppStrings.tr(
            'এই মডিউলটি শীঘ্রই চালু হচ্ছে। অফলাইন প্যাক ডাউনলোড করে প্রস্তুত রাখো।',
            'This module is coming next. Save the offline pack to keep content ready.',
            lang,
          ),
        ),
      ),
    );
  }

  Future<void> _showOfflineChapterPreviewSheet(
    BuildContext context,
    OfflineChapterPackEntity pack,
    TopicEntity topic,
    AppLanguage lang,
  ) {
    final matchingLessons =
        pack.lessons.where((l) => l.topicId == topic.id).toList();
    final matchingQuestions =
        pack.questions.where((q) => q.topicId == topic.id).toList();

    return showModalBottomSheet<void>(
      context: context,
      isScrollControlled: true,
      useSafeArea: true,
      backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (sheetContext) {
        return SingleChildScrollView(
          padding: const EdgeInsets.all(20),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Row(
                children: <Widget>[
                  const Icon(
                    Icons.offline_pin_rounded,
                    color: PorhiTheme.emerald600,
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      topic.titleBangla,
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(
                        fontSize: 17,
                        fontWeight: FontWeight.w800,
                        color: PorhiTheme.slate900,
                      ),
                    ),
                  ),
                  IconButton(
                    icon: const Icon(Icons.close_rounded),
                    onPressed: () => Navigator.of(sheetContext).pop(),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              Text(
                lang == AppLanguage.bn
                    ? 'অফলাইন সংরক্ষিত: ${AppStrings.formatNumber(matchingLessons.length, lang)}টি লেসন • ${AppStrings.formatNumber(matchingQuestions.length, lang)}টি প্রশ্ন'
                    : 'Saved Offline: ${matchingLessons.length} lessons • ${matchingQuestions.length} questions',
                style: const TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.w600,
                  color: PorhiTheme.emerald600,
                ),
              ),
              if (matchingLessons.isNotEmpty) ...<Widget>[
                const SizedBox(height: 12),
                Text(
                  matchingLessons.first.titleBangla,
                  style: const TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.w700,
                    color: PorhiTheme.slate900,
                  ),
                ),
                const SizedBox(height: 6),
                Text(
                  matchingLessons.first.learningGoal,
                  style: const TextStyle(
                    fontSize: 13,
                    color: PorhiTheme.slate600,
                    height: 1.4,
                  ),
                ),
              ],
              const SizedBox(height: 16),
            ],
          ),
        );
      },
    );
  }
}

class _CurriculumHeaderCard extends StatelessWidget {
  final AppLanguage language;
  final String subjectId;
  final int completedCount;
  final int totalTopics;
  final int progressPercent;
  final TextEditingController searchController;
  final String searchQuery;
  final TopicFilterMode filterMode;
  final ValueChanged<String> onSearchChanged;
  final VoidCallback onClearSearch;
  final ValueChanged<TopicFilterMode> onSelectFilter;
  final VoidCallback onOpenSubjectExam;
  final VoidCallback onOpenBoardArchive;

  const _CurriculumHeaderCard({
    required this.language,
    required this.subjectId,
    required this.completedCount,
    required this.totalTopics,
    required this.progressPercent,
    required this.searchController,
    required this.searchQuery,
    required this.filterMode,
    required this.onSearchChanged,
    required this.onClearSearch,
    required this.onSelectFilter,
    required this.onOpenSubjectExam,
    required this.onOpenBoardArchive,
  });

  @override
  Widget build(BuildContext context) {
    final completedStr = AppStrings.formatNumber(completedCount, language);
    final totalStr = AppStrings.formatNumber(totalTopics, language);
    final pctStr = AppStrings.formatNumber(progressPercent, language);

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Text(
              AppStrings.tr(
                'অধ্যায় ও টপিক সিলেবাস',
                'Chapter & Topic Syllabus',
                language,
              ),
              style: const TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.w800,
                color: PorhiTheme.slate900,
              ),
            ),
            const SizedBox(height: 10),
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: PorhiTheme.indigo50,
                borderRadius: BorderRadius.circular(12),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: <Widget>[
                      Flexible(
                        child: Text(
                          AppStrings.tr(
                            'সামগ্রিক অগ্রগতি',
                            'Overall Progress',
                            language,
                          ),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.w700,
                            color: PorhiTheme.indigo700,
                          ),
                        ),
                      ),
                      const SizedBox(width: 8),
                      Text(
                        '$completedStr/$totalStr ($pctStr%)',
                        style: const TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w800,
                          color: PorhiTheme.indigo700,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  ClipRRect(
                    borderRadius: BorderRadius.circular(999),
                    child: LinearProgressIndicator(
                      value: (progressPercent / 100).clamp(0.0, 1.0),
                      minHeight: 6,
                      backgroundColor: Colors.white,
                      valueColor: const AlwaysStoppedAnimation<Color>(
                        PorhiTheme.indigo600,
                      ),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 12),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: <Widget>[
                FilledButton.icon(
                  key: const Key('full_subject_exam_btn'),
                  onPressed: onOpenSubjectExam,
                  style: FilledButton.styleFrom(
                    backgroundColor: PorhiTheme.slate900,
                    foregroundColor: Colors.white,
                  ),
                  icon: const Icon(
                    Icons.emoji_events_rounded,
                    size: 16,
                    color: Color(0xFFFBBF24),
                  ),
                  label: Text(
                    AppStrings.tr(
                      'পূর্ণ বিষয় মডেল টেস্ট',
                      'Full Subject Model Test',
                      language,
                    ),
                    style: const TextStyle(fontSize: 12),
                  ),
                ),
                OutlinedButton.icon(
                  key: const Key('board_archive_btn'),
                  onPressed: onOpenBoardArchive,
                  style: OutlinedButton.styleFrom(
                    backgroundColor: PorhiTheme.emerald50,
                    foregroundColor: PorhiTheme.emerald600,
                    side: const BorderSide(color: Color(0xFFA7F3D0)),
                  ),
                  icon: const Icon(Icons.account_balance_outlined, size: 16),
                  label: Text(
                    AppStrings.tr(
                      'বোর্ড প্রশ্ন ব্যাংক',
                      'Board Archive',
                      language,
                    ),
                    style: const TextStyle(fontSize: 12),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),
            TextField(
              key: const Key('chapter_search_input'),
              controller: searchController,
              onChanged: onSearchChanged,
              decoration: InputDecoration(
                prefixIcon: const Icon(Icons.search_rounded),
                hintText: AppStrings.tr(
                  'অধ্যায় বা টপিক খুঁজুন...',
                  'Search chapters or topics...',
                  language,
                ),
                suffixIcon: searchQuery.isEmpty
                    ? null
                    : IconButton(
                        icon: const Icon(Icons.clear_rounded, size: 18),
                        onPressed: onClearSearch,
                      ),
              ),
            ),
            const SizedBox(height: 10),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: <Widget>[
                _TopicFilterChip(
                  chipKey: const Key('topic_filter_all'),
                  label: AppStrings.tr('সব টপিক', 'All Topics', language),
                  selected: filterMode == TopicFilterMode.all,
                  onTap: () => onSelectFilter(TopicFilterMode.all),
                ),
                _TopicFilterChip(
                  chipKey: const Key('topic_filter_lab'),
                  label: AppStrings.tr(
                    '⚡ ইন্টারেক্টিভ ল্যাব',
                    '⚡ Interactive Lab',
                    language,
                  ),
                  selected: filterMode == TopicFilterMode.lab,
                  onTap: () => onSelectFilter(TopicFilterMode.lab),
                ),
                _TopicFilterChip(
                  chipKey: const Key('topic_filter_incomplete'),
                  label: AppStrings.tr('অসম্পন্ন', 'Incomplete', language),
                  selected: filterMode == TopicFilterMode.incomplete,
                  onTap: () => onSelectFilter(TopicFilterMode.incomplete),
                ),
                _TopicFilterChip(
                  chipKey: const Key('topic_filter_bookmarked'),
                  label: AppStrings.tr('বুকমার্ক করা', 'Bookmarked', language),
                  selected: filterMode == TopicFilterMode.bookmarked,
                  onTap: () => onSelectFilter(TopicFilterMode.bookmarked),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class _TopicFilterChip extends StatelessWidget {
  final Key chipKey;
  final String label;
  final bool selected;
  final VoidCallback onTap;

  const _TopicFilterChip({
    required this.chipKey,
    required this.label,
    required this.selected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return ChoiceChip(
      key: chipKey,
      label: Text(label),
      selected: selected,
      selectedColor: PorhiTheme.indigo600,
      backgroundColor: Colors.white,
      labelStyle: TextStyle(
        fontSize: 12,
        fontWeight: FontWeight.w700,
        color: selected ? Colors.white : PorhiTheme.slate700,
      ),
      onSelected: (_) => onTap(),
    );
  }
}
