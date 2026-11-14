import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/core/theme/porhi_theme.dart';
import 'package:porhi/features/dashboard/domain/entities/student_overview_entity.dart';
import 'package:porhi/features/dashboard/presentation/dashboard/controller/dashboard_controller.dart';
import 'package:porhi/features/dashboard/presentation/dashboard/widgets/dashboard_banner_card.dart';
import 'package:porhi/features/dashboard/presentation/shared/quick_search_sheet.dart';
import 'package:porhi/features/lesson/domain/entities/lesson_entities.dart';
import 'package:porhi/features/shell/presentation/main_shell/controller/main_shell_controller.dart';
import 'package:porhi/routes/app_routes.dart';

class DashboardView extends GetView<DashboardController> {
  const DashboardView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        titleSpacing: 16,
        backgroundColor: Colors.white,
        elevation: 0,
        scrolledUnderElevation: 0.5,
        title: Obx(() {
          final lang = controller.language.value;
          final isCached = controller.isOfflineCache.value;
          return Row(
            children: <Widget>[
              Container(
                width: 36,
                height: 36,
                decoration: BoxDecoration(
                  gradient: PorhiTheme.brandGradient,
                  borderRadius: BorderRadius.circular(11),
                  boxShadow: PorhiTheme.subtleShadow,
                ),
                alignment: Alignment.center,
                child: const Text(
                  'পড়ি',
                  style: TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.w900,
                    fontSize: 16,
                    letterSpacing: -0.5,
                  ),
                ),
              ),
              const SizedBox(width: 10),
              Flexible(
                child: Text(
                  AppStrings.appName(lang),
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.w800,
                    color: PorhiTheme.slate900,
                  ),
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
            final pending = controller.pendingSyncCount.value;
            final syncing = controller.isSyncing.value;
            final lang = controller.language.value;
            return IconButton(
              key: const Key('sync_badge_button'),
              tooltip: AppStrings.tr('অফলাইন সিঙ্ক', 'Sync offline data', lang),
              onPressed: syncing ? null : controller.syncNow,
              icon: Badge(
                isLabelVisible: pending > 0,
                label: Text(AppStrings.formatNumber(pending, lang)),
                child: syncing
                    ? const SizedBox(
                        width: 20,
                        height: 20,
                        child: CircularProgressIndicator(strokeWidth: 2),
                      )
                    : const Icon(Icons.cloud_sync_outlined),
              ),
            );
          }),
          Obx(() {
            final lang = controller.language.value;
            return IconButton(
              key: const Key('quick_search_button'),
              tooltip: AppStrings.tr('দ্রুত অনুসন্ধান', 'Quick Search', lang),
              icon: const Icon(Icons.search_rounded),
              onPressed: () => QuickSearchSheet.show(context),
            );
          }),
          Obx(() {
            final lang = controller.language.value;
            return IconButton(
              key: const Key('dashboard_account_button'),
              tooltip: AppStrings.t('nav.account', lang),
              icon: Container(
                padding: const EdgeInsets.all(4),
                decoration: BoxDecoration(
                  color: PorhiTheme.indigo50,
                  shape: BoxShape.circle,
                ),
                child: const Icon(
                  Icons.person_rounded,
                  color: PorhiTheme.indigo600,
                  size: 20,
                ),
              ),
              onPressed: () async {
                await Get.toNamed(AppRoutes.account);
                if (!context.mounted || Get.currentRoute != AppRoutes.home) {
                  return;
                }
                if (Get.isRegistered<MainShellController>()) {
                  await Get.find<MainShellController>()
                      .refreshAfterAccountReturn();
                } else if (Get.isRegistered<DashboardController>()) {
                  await Get.find<DashboardController>()
                      .refreshLanguageAndUser();
                }
              },
            );
          }),
        ],
      ),
      body: Obx(() {
        final lang = controller.language.value;
        final overview = controller.overview.value;
        final isLoading = controller.isLoading.value;
        final error = controller.errorMessage.value;
        final syncMessage = controller.syncMessage.value;
        final isSyncError = controller.isSyncError.value;

        if (isLoading && overview == null) {
          return const Center(child: CircularProgressIndicator());
        }

        if (error != null && overview == null) {
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
                    onPressed: controller.loadDashboard,
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
        final track = controller.user.value?.selectedClass;
        final trackLabel = track == null
            ? data.subjectId
            : (lang == AppLanguage.bn ? track.labelBn : track.labelEn);
        final last7Days = controller.buildLast7Days();
        final planner = controller.plannerSummary.value;

        return RefreshIndicator(
          onRefresh: controller.refreshAndSync,
          child: ListView(
            padding: const EdgeInsets.fromLTRB(18, 18, 18, 24),
            children: <Widget>[
              if (syncMessage != null) ...<Widget>[
                _SyncStatusBanner(
                  message: syncMessage,
                  isError: isSyncError,
                ),
                const SizedBox(height: 12),
              ],
              DashboardBannerCard(
                lang: lang,
                trackLabel: trackLabel,
                streakDays: data.streakDays,
                completedTopics: data.completedTopicIds.length,
                totalTopics: data.curriculumTotals.totalTopics,
                syllabusPercent: data.syllabusProgressPercent,
                last7Days: last7Days,
              ),
              const SizedBox(height: 16),
              _ContinueLearningCard(
                lang: lang,
                lastStudiedTopic: data.lastStudiedTopic,
                onOpenSubjects: () => _selectShellTab(1),
                onContinueLesson: data.lastStudiedTopic == null
                    ? null
                    : () => _openLesson(
                          topicId: data.lastStudiedTopic!.topicId,
                          subjectId: data.subjectId,
                          chapterId: data.lastStudiedTopic!.chapterId,
                          chapterTitle: data.lastStudiedTopic!.chapterTitle,
                          topicTitle: data.lastStudiedTopic!.topicTitle,
                        ),
              ),
              const SizedBox(height: 16),
              _RevisionDueCard(
                lang: lang,
                dueMistakes: data.dueMistakes,
              ),
              const SizedBox(height: 16),
              _PlannerAndHubCard(
                lang: lang,
                planner: planner,
                bookmarks: data.bookmarks,
                onSelectTab: _selectShellTab,
                onOpenSearch: () => QuickSearchSheet.show(context),
                onOpenBookmark: data.bookmarks.isNotEmpty &&
                        data.bookmarks.first.type == 'topic'
                    ? () => _openLesson(
                          topicId: data.bookmarks.first.id,
                          subjectId: data.subjectId,
                          topicTitle: data.bookmarks.first.titleBangla,
                        )
                    : null,
              ),
              const SizedBox(height: 24),
            ],
          ),
        );
      }),
    );
  }

  Future<void> _openLesson({
    required String topicId,
    required String subjectId,
    String? chapterId,
    String? chapterTitle,
    String? topicTitle,
  }) async {
    final lessonRoute = AppRoutes.lessonForTopic(topicId);
    if (Get.routeTree.matchRoute(lessonRoute).route != null) {
      await controller.runLessonNavigation(() async {
        await Get.toNamed(
          lessonRoute,
          arguments: LessonRouteArgs(
            subjectId: subjectId,
            chapterId: chapterId,
            chapterTitle: chapterTitle,
            topicTitle: topicTitle,
          ),
        );
        await controller.refreshLanguageAndUser();
      });
      return;
    }
    _selectShellTab(1);
  }

  void _selectShellTab(int index) {
    if (Get.isRegistered<MainShellController>()) {
      Get.find<MainShellController>().selectTab(index);
    }
  }
}

class _SyncStatusBanner extends StatelessWidget {
  final String message;
  final bool isError;

  const _SyncStatusBanner({
    required this.message,
    required this.isError,
  });

  @override
  Widget build(BuildContext context) {
    final bgColor = isError ? const Color(0xFFFFF1F2) : PorhiTheme.emerald50;
    final borderColor =
        isError ? const Color(0xFFFECDD3) : const Color(0xFFA7F3D0);
    final iconColor = isError ? PorhiTheme.rose600 : PorhiTheme.emerald600;
    final textColor = isError ? PorhiTheme.rose600 : PorhiTheme.slate900;
    final icon = isError
        ? Icons.error_outline_rounded
        : Icons.check_circle_outline_rounded;

    return Container(
      key: const Key('sync_status_banner'),
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
      decoration: BoxDecoration(
        color: bgColor,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: borderColor),
      ),
      child: Row(
        children: <Widget>[
          Icon(icon, size: 18, color: iconColor),
          const SizedBox(width: 8),
          Expanded(
            child: Text(
              message,
              style: TextStyle(
                fontSize: 12.5,
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

class _ContinueLearningCard extends StatelessWidget {
  final AppLanguage lang;
  final LastStudiedTopicEntity? lastStudiedTopic;
  final VoidCallback onOpenSubjects;
  final VoidCallback? onContinueLesson;

  const _ContinueLearningCard({
    required this.lang,
    required this.lastStudiedTopic,
    required this.onOpenSubjects,
    this.onContinueLesson,
  });

  @override
  Widget build(BuildContext context) {
    final topic = lastStudiedTopic;
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: const Color(0xFFE8ECF4)),
        boxShadow: PorhiTheme.cardShadow,
      ),
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: <Widget>[
              Expanded(
                child: Row(
                  children: <Widget>[
                    Container(
                      padding: const EdgeInsets.all(8),
                      decoration: BoxDecoration(
                        color: PorhiTheme.indigo50,
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: const Icon(
                        Icons.play_arrow_rounded,
                        size: 19,
                        color: PorhiTheme.indigo600,
                      ),
                    ),
                    const SizedBox(width: 8),
                    Flexible(
                      child: Text(
                        topic != null
                            ? AppStrings.tr(
                                'সর্বশেষ পঠিত টপিক থেকে শুরু করো',
                                'Resume Where You Left Off',
                                lang,
                              )
                            : AppStrings.tr(
                                'পরবর্তী প্রস্তাবিত পাঠ',
                                'Recommended Next Lesson',
                                lang,
                              ),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: const TextStyle(
                          fontSize: 13,
                          fontWeight: FontWeight.w700,
                          color: PorhiTheme.indigo600,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              if (topic != null) ...<Widget>[
                const SizedBox(width: 8),
                Flexible(
                  child: Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 10,
                      vertical: 5,
                    ),
                    decoration: BoxDecoration(
                      color: PorhiTheme.emerald50,
                      borderRadius: BorderRadius.circular(999),
                      border: Border.all(
                        color: PorhiTheme.emerald600.withValues(alpha: 0.2),
                      ),
                    ),
                    child: Text(
                      topic.chapterTitle,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(
                        fontSize: 11,
                        fontWeight: FontWeight.w700,
                        color: PorhiTheme.emerald600,
                      ),
                    ),
                  ),
                ),
              ],
            ],
          ),
          const SizedBox(height: 12),
          Text(
            topic?.topicTitle ??
                AppStrings.tr(
                  'তোমার কারিকুলাম থেকে একটি অধ্যায় বেছে নাও',
                  'Pick a chapter from your curriculum',
                  lang,
                ),
            style: const TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.w900,
              letterSpacing: -0.45,
              height: 1.2,
              color: PorhiTheme.slate900,
            ),
          ),
          const SizedBox(height: 6),
          Text(
            AppStrings.tr(
              'ইন্টারেক্টিভ পাঠ, বাস্তব উদাহরণ ও ৬-স্তরের ব্যাখ্যার সাথে টপিকটি আয়ত্ত করো।',
              'Master this topic with interactive lessons, examples, and 6-layer breakdowns.',
              lang,
            ),
            style: const TextStyle(
              fontSize: 13,
              color: PorhiTheme.slate600,
              height: 1.4,
            ),
          ),
          const SizedBox(height: 16),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton.icon(
              style: ElevatedButton.styleFrom(
                minimumSize: const Size.fromHeight(50),
                padding: const EdgeInsets.symmetric(horizontal: 18),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(15),
                ),
                elevation: 0,
              ),
              onPressed: onContinueLesson ?? onOpenSubjects,
              icon: const Icon(Icons.arrow_forward_rounded, size: 18),
              label: Text(
                AppStrings.tr('পড়া চালিয়ে যান', 'Continue Learning', lang),
                style: const TextStyle(
                  fontSize: 14.5,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ),
          ),
          const SizedBox(height: 4),
          Align(
            alignment: Alignment.center,
            child: TextButton.icon(
              onPressed: onOpenSubjects,
              icon: const Icon(Icons.edit_note_rounded, size: 19),
              label: Text(
                AppStrings.tr(
                  'সরাসরি MCQ প্র্যাকটিস',
                  'Jump into MCQ practice',
                  lang,
                ),
              ),
              style: TextButton.styleFrom(
                foregroundColor: PorhiTheme.slate600,
                textStyle: const TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.w600,
                ),
                minimumSize: const Size(44, 44),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _RevisionDueCard extends StatelessWidget {
  final AppLanguage lang;
  final List<DueMistakeEntity> dueMistakes;

  const _RevisionDueCard({
    required this.lang,
    required this.dueMistakes,
  });

  @override
  Widget build(BuildContext context) {
    final countText = AppStrings.formatNumber(dueMistakes.length, lang);
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFFFFFBEB),
        borderRadius: BorderRadius.circular(22),
        border: Border.all(color: const Color(0xFFFDE68A), width: 1.2),
        boxShadow: PorhiTheme.subtleShadow,
      ),
      padding: const EdgeInsets.all(18),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: <Widget>[
              Expanded(
                child: Row(
                  children: <Widget>[
                    Container(
                      padding: const EdgeInsets.all(6),
                      decoration: BoxDecoration(
                        color: const Color(0xFFFDE68A),
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: const Icon(
                        Icons.schedule_rounded,
                        size: 20,
                        color: Color(0xFFD97706),
                      ),
                    ),
                    const SizedBox(width: 10),
                    Flexible(
                      child: Text(
                        AppStrings.tr(
                          'রিভিশন প্রয়োজন (স্পেসড রিপিটেশন)',
                          'Revision Due (Spaced Repetition)',
                          lang,
                        ),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: const TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w800,
                          color: Color(0xFF78350F),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(width: 8),
              Container(
                padding: const EdgeInsets.symmetric(
                  horizontal: 10,
                  vertical: 4,
                ),
                decoration: BoxDecoration(
                  color: const Color(0xFFFDE68A),
                  borderRadius: BorderRadius.circular(999),
                ),
                child: Text(
                  lang == AppLanguage.bn ? '$countTextটি প্রশ্ন' : '$countText due',
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w800,
                    color: Color(0xFF92400E),
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 14),
          if (dueMistakes.isEmpty)
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: const Color(0xFFFDE68A)),
              ),
              child: Row(
                children: <Widget>[
                  const Icon(
                    Icons.check_circle_rounded,
                    color: PorhiTheme.emerald600,
                    size: 20,
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: Text(
                      AppStrings.tr(
                        'সকল ভুল সংশোধিত! কোনো বকেয়া রিভিশন নেই।',
                        'All caught up! No pending mistakes.',
                        lang,
                      ),
                      style: const TextStyle(
                        fontSize: 13,
                        fontWeight: FontWeight.w600,
                        color: PorhiTheme.emerald600,
                      ),
                    ),
                  ),
                ],
              ),
            )
          else
            ...dueMistakes.take(3).map(
                  (mistake) => Container(
                    margin: const EdgeInsets.only(bottom: 8),
                    padding: const EdgeInsets.all(14),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(14),
                      border: Border.all(color: const Color(0xFFFDE68A)),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: <Widget>[
                        Text(
                          mistake.stem.isNotEmpty
                              ? mistake.stem
                              : mistake.topicTitle,
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(
                            fontSize: 13.5,
                            fontWeight: FontWeight.w700,
                            color: PorhiTheme.slate900,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          '${mistake.topicTitle} • ${mistake.chapterTitle}',
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(
                            fontSize: 11.5,
                            fontWeight: FontWeight.w600,
                            color: Color(0xFFB45309),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
        ],
      ),
    );
  }
}

class _PlannerAndHubCard extends StatelessWidget {
  final AppLanguage lang;
  final PlannerOverviewEntity? planner;
  final List<StudentBookmarkEntity> bookmarks;
  final ValueChanged<int> onSelectTab;
  final VoidCallback onOpenSearch;
  final VoidCallback? onOpenBookmark;

  const _PlannerAndHubCard({
    required this.lang,
    required this.planner,
    required this.bookmarks,
    required this.onSelectTab,
    required this.onOpenSearch,
    this.onOpenBookmark,
  });

  @override
  Widget build(BuildContext context) {
    final dueCount = planner?.todayDueCount ?? 0;
    final nextTask = planner?.nextPendingTask;

    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(22),
        border: Border.all(color: PorhiTheme.slate200),
        boxShadow: PorhiTheme.cardShadow,
      ),
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Row(
            children: <Widget>[
              Container(
                padding: const EdgeInsets.all(6),
                decoration: BoxDecoration(
                  color: PorhiTheme.indigo50,
                  borderRadius: BorderRadius.circular(10),
                ),
                child: const Icon(
                  Icons.menu_book_rounded,
                  size: 20,
                  color: PorhiTheme.indigo600,
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: Text(
                  AppStrings.tr('কুইক স্টাডি হাব', 'Quick Study Hub', lang),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w800,
                    color: PorhiTheme.slate900,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 14),
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: const Color(0xFFFFFBEB),
              borderRadius: BorderRadius.circular(14),
              border: Border.all(color: const Color(0xFFFDE68A)),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: <Widget>[
                    Expanded(
                      child: Text(
                        '${AppStrings.tr('আজকের স্টাডি রুটিন', "Today's Study Plan", lang)} (${AppStrings.formatNumber(dueCount, lang)})',
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: const TextStyle(
                          fontSize: 12.5,
                          fontWeight: FontWeight.w800,
                          color: Color(0xFF78350F),
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    InkWell(
                      onTap: () => onSelectTab(2),
                      child: Text(
                        AppStrings.tr('প্ল্যানার দেখো', 'Open Planner', lang),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: const TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w700,
                          color: PorhiTheme.indigo600,
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 6),
                Text(
                  nextTask?.titleBangla ??
                      AppStrings.tr(
                        '৭ দিনের স্মার্ট স্টাডি রুটিন সাজাতে প্ল্যানারে যাও।',
                        'Set daily goals & reminders inside the planner.',
                        lang,
                      ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.w600,
                    color: PorhiTheme.slate900,
                  ),
                ),
              ],
            ),
          ),
          if (bookmarks.isNotEmpty) ...<Widget>[
            const SizedBox(height: 10),
            InkWell(
              borderRadius: BorderRadius.circular(14),
              onTap: onOpenBookmark,
              child: Container(
                width: double.infinity,
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: PorhiTheme.slate50,
                  borderRadius: BorderRadius.circular(14),
                  border: Border.all(color: PorhiTheme.slate200),
                ),
                child: Row(
                  children: <Widget>[
                    const Icon(
                      Icons.bookmark_rounded,
                      size: 18,
                      color: PorhiTheme.indigo600,
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        bookmarks.first.titleBangla,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: const TextStyle(
                          fontSize: 13,
                          fontWeight: FontWeight.w700,
                          color: PorhiTheme.indigo700,
                        ),
                      ),
                    ),
                    if (onOpenBookmark != null)
                      const Icon(
                        Icons.chevron_right_rounded,
                        size: 18,
                        color: PorhiTheme.slate400,
                      ),
                  ],
                ),
              ),
            ),
          ],
          const SizedBox(height: 14),
          Row(
            children: <Widget>[
              Expanded(
                child: _HubActionTile(
                  icon: Icons.menu_book_rounded,
                  iconColor: PorhiTheme.indigo600,
                  label: AppStrings.tr(
                    'অধ্যায় ও টপিক সূচি',
                    'Curriculum Index',
                    lang,
                  ),
                  onTap: () => onSelectTab(1),
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: _HubActionTile(
                  icon: Icons.search_rounded,
                  iconColor: PorhiTheme.emerald600,
                  label: AppStrings.tr(
                    'দ্রুত অনুসন্ধান',
                    'Quick Search',
                    lang,
                  ),
                  onTap: onOpenSearch,
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),
          Row(
            children: <Widget>[
              Expanded(
                child: _HubActionTile(
                  icon: Icons.bar_chart_rounded,
                  iconColor: PorhiTheme.emerald600,
                  label: AppStrings.tr(
                    'দুর্বলতা ও প্রগ্রেস',
                    'Progress & Weaknesses',
                    lang,
                  ),
                  onTap: () => onSelectTab(3),
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: _HubActionTile(
                  icon: Icons.calendar_today_rounded,
                  iconColor: const Color(0xFFD97706),
                  label: AppStrings.tr(
                    'স্টাডি প্ল্যানার',
                    'Study Planner',
                    lang,
                  ),
                  onTap: () => onSelectTab(2),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _HubActionTile extends StatelessWidget {
  final IconData icon;
  final Color iconColor;
  final String label;
  final VoidCallback onTap;

  const _HubActionTile({
    required this.icon,
    required this.iconColor,
    required this.label,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(16),
      child: Container(
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          color: PorhiTheme.slate50,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: PorhiTheme.slate200),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Container(
              padding: const EdgeInsets.all(6),
              decoration: BoxDecoration(
                color: iconColor.withValues(alpha: 0.12),
                borderRadius: BorderRadius.circular(10),
              ),
              child: Icon(icon, size: 20, color: iconColor),
            ),
            const SizedBox(height: 10),
            Text(
              label,
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
              style: const TextStyle(
                fontSize: 12.5,
                fontWeight: FontWeight.w700,
                color: PorhiTheme.slate900,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
