import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:porhi/app/env.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/core/theme/porhi_theme.dart';
import 'package:porhi/core/widgets/interactive_lab/interactive_lab_card.dart';
import 'package:porhi/core/widgets/lesson_audio_player.dart';
import 'package:porhi/core/widgets/rich_content/audio_player_tile.dart';
import 'package:porhi/core/widgets/rich_content/rich_content_view.dart';
import 'package:porhi/features/content_report/domain/entities/content_report_entity.dart';
import 'package:porhi/features/content_report/presentation/report_sheet/report_content_sheet.dart';
import 'package:porhi/features/lesson/domain/entities/lesson_entities.dart';
import 'package:porhi/features/lesson/presentation/lesson/controller/lesson_controller.dart';
import 'package:porhi/features/lesson/presentation/lesson/widgets/lesson_notes_sheet.dart';
import 'package:porhi/features/lesson/presentation/lesson/widgets/lesson_quick_check_card.dart';

class LessonView extends GetView<LessonController> {
  final EnvConfig? envConfig;
  final LessonAudioBackend Function()? audioBackendFactory;
  final LessonTtsBackend Function()? ttsBackendFactory;
  final InteractiveWebViewBuilder? webViewBuilder;

  const LessonView({
    super.key,
    this.envConfig,
    this.audioBackendFactory,
    this.ttsBackendFactory,
    this.webViewBuilder,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Obx(() {
          final lang = controller.language.value;
          final offline = controller.isOfflineMode.value;
          final title = controller.chapterTitle.value.isNotEmpty
              ? controller.chapterTitle.value
              : (controller.lesson.value?.titleBangla ??
                  AppStrings.tr('পাঠ', 'Lesson', lang));
          return Row(
            children: <Widget>[
              Flexible(
                child: Text(
                  title,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
              if (offline) ...<Widget>[
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
            final bookmarked = controller.isBookmarked.value;
            final busy = controller.isTogglingBookmark.value;
            final lang = controller.language.value;
            return IconButton(
              key: const Key('lesson_appbar_bookmark_btn'),
              tooltip: AppStrings.tr('বুকমার্ক', 'Bookmark', lang),
              onPressed: busy || controller.lesson.value == null
                  ? null
                  : controller.toggleBookmark,
              icon: Icon(
                bookmarked
                    ? Icons.bookmark_rounded
                    : Icons.bookmark_border_rounded,
                color: bookmarked ? const Color(0xFFD97706) : null,
              ),
            );
          }),
          Obx(() {
            final hasNote = controller.savedNote.value.trim().isNotEmpty;
            final lang = controller.language.value;
            return IconButton(
              key: const Key('lesson_appbar_notes_btn'),
              tooltip: AppStrings.tr('আমার নোট', 'My Note', lang),
              onPressed: controller.lesson.value == null
                  ? null
                  : () => LessonNotesSheet.show(context, controller: controller),
              icon: Badge(
                isLabelVisible: hasNote,
                smallSize: 8,
                child: const Icon(Icons.sticky_note_2_outlined),
              ),
            );
          }),
          Obx(() {
            final lang = controller.language.value;
            final currentLesson = controller.lesson.value;
            return IconButton(
              key: const Key('lesson_appbar_report_btn'),
              tooltip: AppStrings.tr('ভুল রিপোর্ট', 'Report Error', lang),
              onPressed: currentLesson == null
                  ? null
                  : () => _openReportSheet(context, currentLesson, lang),
              icon: const Icon(Icons.flag_outlined),
            );
          }),
        ],
      ),
      body: Obx(() {
        final lang = controller.language.value;
        final currentLesson = controller.lesson.value;
        final loading = controller.isLoading.value;
        final error = controller.errorMessage.value;

        if (loading && currentLesson == null) {
          return const Center(child: CircularProgressIndicator());
        }

        if (error != null && currentLesson == null) {
          return Center(
            child: Padding(
              padding: const EdgeInsets.all(24),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: <Widget>[
                  const Icon(
                    Icons.menu_book_outlined,
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
                    onPressed: () => controller.loadTopic(),
                    icon: const Icon(Icons.refresh_rounded),
                    label: Text(AppStrings.t('action.retry', lang)),
                  ),
                ],
              ),
            ),
          );
        }

        if (currentLesson == null) {
          return Center(
            child: Text(
              AppStrings.t('common.noData', lang),
              style: const TextStyle(color: PorhiTheme.slate600),
            ),
          );
        }

        final statusMsg = controller.statusMessage.value;
        final isStatusErr = controller.isStatusError.value;
        final quickQuestion = controller.currentQuickQuestion;
        final prev = controller.prevTopic.value;
        final next = controller.nextTopic.value;

        return RefreshIndicator(
          onRefresh: () => controller.loadTopic(),
          child: ListView(
            controller: controller.scrollController,
            padding: const EdgeInsets.fromLTRB(18, 16, 18, 28),
            children: <Widget>[
              if (statusMsg != null) ...<Widget>[
                _StatusBanner(message: statusMsg, isError: isStatusErr),
                const SizedBox(height: 12),
              ],
              _LessonHeaderCard(
                lesson: currentLesson,
                chapterTitle: controller.chapterTitle.value.isNotEmpty
                    ? controller.chapterTitle.value
                    : currentLesson.chapterTitle,
                topicPosition: controller.topicPosition.value,
                totalTopics: controller.totalTopicsInChapter.value,
                language: lang,
              ),
              const SizedBox(height: 14),
              if (currentLesson.learningGoal.trim().isNotEmpty) ...<Widget>[
                _LearningGoalCard(
                  learningGoal: currentLesson.learningGoal,
                  language: lang,
                  envConfig: envConfig,
                ),
                const SizedBox(height: 12),
              ],
              LessonAudioPlayer(
                key: ValueKey<String>('lesson_audio_${currentLesson.id}'),
                audioUrl: currentLesson.audioUrl,
                audioDurationSeconds: currentLesson.audioDurationSeconds,
                title: currentLesson.titleBangla,
                narrationText:
                    '${currentLesson.learningGoal}\n\n${currentLesson.explanation}',
                languageCode: lang.code,
                envConfig: envConfig,
                audioBackendFactory: audioBackendFactory,
                ttsBackendFactory: ttsBackendFactory,
              ),
              if (currentLesson.interactiveWidgetUrl != null &&
                  currentLesson.interactiveWidgetUrl!.trim().isNotEmpty)
                InteractiveLabCard(
                  key: ValueKey<String>('lesson_lab_${currentLesson.id}'),
                  widgetUrl: currentLesson.interactiveWidgetUrl,
                  title: currentLesson.titleBangla,
                  envConfig: envConfig,
                  webViewBuilder: webViewBuilder,
                ),
              const SizedBox(height: 8),
              _ExplanationCard(
                lesson: currentLesson,
                language: lang,
                envConfig: envConfig,
                feedbackChoice: controller.feedbackChoice.value,
                isSubmittingFeedback: controller.isSubmittingFeedback.value,
                onSubmitFeedback: controller.submitExplanationFeedback,
                interactiveBuilder: webViewBuilder == null
                    ? null
                    : (context, resolvedUrl, htmlContent, title) {
                        return InteractiveLabCard(
                          widgetUrl: resolvedUrl,
                          htmlContent: htmlContent,
                          title: title,
                          envConfig: envConfig,
                          webViewBuilder: webViewBuilder,
                        );
                      },
              ),
              if (currentLesson.importantTerms.isNotEmpty) ...<Widget>[
                const SizedBox(height: 14),
                _ImportantTermsCard(
                  terms: currentLesson.importantTerms,
                  language: lang,
                  envConfig: envConfig,
                ),
              ],
              if (currentLesson.workedExample != null) ...<Widget>[
                const SizedBox(height: 14),
                _WorkedExampleCard(
                  example: currentLesson.workedExample!,
                  language: lang,
                  envConfig: envConfig,
                ),
              ],
              if (currentLesson.memoryAid != null &&
                  currentLesson.memoryAid!.trim().isNotEmpty) ...<Widget>[
                const SizedBox(height: 14),
                _MemoryAidCard(
                  memoryAid: currentLesson.memoryAid!,
                  language: lang,
                  envConfig: envConfig,
                ),
              ],
              if (quickQuestion != null) ...<Widget>[
                const SizedBox(height: 16),
                LessonQuickCheckCard(
                  language: lang,
                  question: quickQuestion,
                  questionIndex: controller.currentQuestionIndex.value,
                  totalQuestions: controller.quickQuestions.length,
                  selectedOptionId: controller.selectedOptionId.value,
                  submitResult: controller.quickCheckResult.value,
                  isSubmitting: controller.isSubmittingQuickCheck.value,
                  onSelectOption: controller.submitQuickCheckAnswer,
                  onNextQuestion: controller.nextQuickQuestion,
                  envConfig: envConfig,
                ),
              ],
              if (prev != null || next != null) ...<Widget>[
                const SizedBox(height: 16),
                _PrevNextTopicRow(
                  language: lang,
                  prevTopic: prev,
                  nextTopic: next,
                  onSelectTopic: controller.switchToTopic,
                ),
              ],
            ],
          ),
        );
      }),
      bottomNavigationBar: Obx(() {
        final currentLesson = controller.lesson.value;
        if (currentLesson == null) return const SizedBox.shrink();
        final lang = controller.language.value;
        final completed = controller.isCompleted.value;
        final completing = controller.isCompleting.value;
        final bookmarked = controller.isBookmarked.value;
        final togglingBookmark = controller.isTogglingBookmark.value;
        final hasNote = controller.savedNote.value.trim().isNotEmpty;

        return SafeArea(
          top: false,
          child: Container(
            key: const Key('lesson_sticky_footer'),
            padding: const EdgeInsets.fromLTRB(12, 10, 12, 10),
            decoration: const BoxDecoration(
              color: Colors.white,
              border: Border(top: BorderSide(color: PorhiTheme.slate200)),
            ),
            child: Row(
              children: <Widget>[
                Expanded(
                  child: FilledButton.icon(
                    key: const Key('lesson_complete_btn'),
                    onPressed: (completing || completed)
                        ? null
                        : controller.completeLesson,
                    style: FilledButton.styleFrom(
                      backgroundColor: completed
                          ? PorhiTheme.emerald600
                          : PorhiTheme.indigo600,
                      foregroundColor: Colors.white,
                      disabledBackgroundColor: completed
                          ? PorhiTheme.emerald600
                          : null,
                      disabledForegroundColor:
                          completed ? Colors.white : null,
                      padding: const EdgeInsets.symmetric(
                        horizontal: 12,
                        vertical: 12,
                      ),
                    ),
                    icon: completing
                        ? const SizedBox(
                            width: 16,
                            height: 16,
                            child: CircularProgressIndicator(
                              strokeWidth: 2,
                              color: Colors.white,
                            ),
                          )
                        : Icon(
                            completed
                                ? Icons.check_circle_rounded
                                : Icons.task_alt_rounded,
                            size: 18,
                          ),
                    label: Text(
                      completed
                          ? AppStrings.tr('✓ পাঠ সম্পন্ন', '✓ Completed', lang)
                          : AppStrings.tr(
                              'পাঠ সম্পন্ন করুন',
                              'Complete Lesson',
                              lang,
                            ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                IconButton.outlined(
                  key: const Key('lesson_footer_bookmark_btn'),
                  tooltip: AppStrings.tr('বুকমার্ক', 'Bookmark', lang),
                  onPressed:
                      togglingBookmark ? null : controller.toggleBookmark,
                  icon: Icon(
                    bookmarked
                        ? Icons.bookmark_rounded
                        : Icons.bookmark_border_rounded,
                    color: bookmarked
                        ? const Color(0xFFD97706)
                        : PorhiTheme.slate700,
                  ),
                ),
                const SizedBox(width: 4),
                IconButton.outlined(
                  key: const Key('lesson_footer_notes_btn'),
                  tooltip: AppStrings.tr('আমার নোট', 'Notes', lang),
                  onPressed: () =>
                      LessonNotesSheet.show(context, controller: controller),
                  icon: Badge(
                    isLabelVisible: hasNote,
                    smallSize: 8,
                    child: const Icon(
                      Icons.sticky_note_2_outlined,
                      color: PorhiTheme.slate700,
                    ),
                  ),
                ),
                const SizedBox(width: 4),
                IconButton.outlined(
                  key: const Key('lesson_footer_report_btn'),
                  tooltip: AppStrings.tr('ভুল রিপোর্ট', 'Report', lang),
                  onPressed: () =>
                      _openReportSheet(context, currentLesson, lang),
                  icon: const Icon(
                    Icons.flag_outlined,
                    color: PorhiTheme.rose600,
                  ),
                ),
              ],
            ),
          ),
        );
      }),
    );
  }

  Future<void> _openReportSheet(
    BuildContext context,
    LessonDetailEntity currentLesson,
    AppLanguage lang,
  ) {
    return ReportContentSheet.show(
      context,
      contentType: ReportContentType.lesson,
      contentId: currentLesson.id,
      topicId: currentLesson.topicId,
      contentLabel: currentLesson.titleBangla,
      language: lang,
    );
  }
}

class _StatusBanner extends StatelessWidget {
  final String message;
  final bool isError;

  const _StatusBanner({required this.message, required this.isError});

  @override
  Widget build(BuildContext context) {
    return Container(
      key: const Key('lesson_status_banner'),
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
      decoration: BoxDecoration(
        color: isError ? const Color(0xFFFFF1F2) : PorhiTheme.emerald50,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: isError ? const Color(0xFFFECDD3) : const Color(0xFFA7F3D0),
        ),
      ),
      child: Row(
        children: <Widget>[
          Icon(
            isError
                ? Icons.error_outline_rounded
                : Icons.check_circle_outline_rounded,
            size: 18,
            color: isError ? PorhiTheme.rose600 : PorhiTheme.emerald600,
          ),
          const SizedBox(width: 8),
          Expanded(
            child: Text(
              message,
              style: TextStyle(
                fontSize: 12.5,
                fontWeight: FontWeight.w600,
                color: isError ? PorhiTheme.rose600 : PorhiTheme.slate900,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _LessonHeaderCard extends StatelessWidget {
  final LessonDetailEntity lesson;
  final String chapterTitle;
  final int topicPosition;
  final int totalTopics;
  final AppLanguage language;

  const _LessonHeaderCard({
    required this.lesson,
    required this.chapterTitle,
    required this.topicPosition,
    required this.totalTopics,
    required this.language,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Row(
              children: <Widget>[
                Expanded(
                  child: Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 10,
                      vertical: 4,
                    ),
                    decoration: BoxDecoration(
                      color: PorhiTheme.indigo50,
                      borderRadius: BorderRadius.circular(999),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: <Widget>[
                        const Icon(
                          Icons.menu_book_rounded,
                          size: 14,
                          color: PorhiTheme.indigo600,
                        ),
                        const SizedBox(width: 6),
                        Flexible(
                          child: Text(
                            chapterTitle.isNotEmpty
                                ? chapterTitle
                                : AppStrings.tr(
                                    'অধ্যায়ভিত্তিক পাঠ',
                                    'Chapter Lesson',
                                    language,
                                  ),
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                            style: const TextStyle(
                              fontSize: 11.5,
                              fontWeight: FontWeight.w700,
                              color: PorhiTheme.indigo700,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                if (topicPosition > 0 && totalTopics > 0) ...<Widget>[
                  const SizedBox(width: 8),
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 10,
                      vertical: 4,
                    ),
                    decoration: BoxDecoration(
                      color: PorhiTheme.slate100,
                      borderRadius: BorderRadius.circular(999),
                    ),
                    child: Text(
                      language == AppLanguage.bn
                          ? 'টপিক ${AppStrings.formatNumber(topicPosition, language)}/${AppStrings.formatNumber(totalTopics, language)}'
                          : 'Topic $topicPosition/$totalTopics',
                      style: const TextStyle(
                        fontSize: 11,
                        fontWeight: FontWeight.w700,
                        color: PorhiTheme.slate700,
                      ),
                    ),
                  ),
                ],
              ],
            ),
            const SizedBox(height: 10),
            Text(
              lesson.titleBangla,
              style: const TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.w800,
                height: 1.3,
                color: PorhiTheme.slate900,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _LearningGoalCard extends StatelessWidget {
  final String learningGoal;
  final AppLanguage language;
  final EnvConfig? envConfig;

  const _LearningGoalCard({
    required this.learningGoal,
    required this.language,
    this.envConfig,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: PorhiTheme.emerald50,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFFA7F3D0)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Row(
            children: <Widget>[
              const Icon(
                Icons.track_changes_rounded,
                size: 18,
                color: PorhiTheme.emerald600,
              ),
              const SizedBox(width: 8),
              Flexible(
                child: Text(
                  AppStrings.tr('পাঠের শিখনফল', 'Learning Goals', language),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                    fontSize: 13.5,
                    fontWeight: FontWeight.w800,
                    color: PorhiTheme.emerald600,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          RichContentView(
            content: learningGoal,
            envConfig: envConfig,
            baseStyle: const TextStyle(
              fontSize: 13.5,
              height: 1.55,
              color: PorhiTheme.slate900,
            ),
          ),
        ],
      ),
    );
  }
}

class _ExplanationCard extends StatelessWidget {
  final LessonDetailEntity lesson;
  final AppLanguage language;
  final EnvConfig? envConfig;
  final bool? feedbackChoice;
  final bool isSubmittingFeedback;
  final ValueChanged<bool> onSubmitFeedback;
  final RichContentInteractiveBuilder? interactiveBuilder;

  const _ExplanationCard({
    required this.lesson,
    required this.language,
    this.envConfig,
    required this.feedbackChoice,
    required this.isSubmittingFeedback,
    required this.onSubmitFeedback,
    this.interactiveBuilder,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: <Widget>[
            Row(
              children: <Widget>[
                const Icon(
                  Icons.auto_stories_outlined,
                  size: 18,
                  color: PorhiTheme.indigo600,
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    AppStrings.tr(
                      'মূল বিষয়বস্তু ও গাণিতিক প্রতিপাদন',
                      'Core Concept & Mathematical Derivation',
                      language,
                    ),
                    style: const TextStyle(
                      fontSize: 15,
                      fontWeight: FontWeight.w800,
                      color: PorhiTheme.slate900,
                    ),
                  ),
                ),
              ],
            ),
            const Divider(height: 22),
            RichContentView(
              content: lesson.explanation,
              envConfig: envConfig,
              interactiveBuilder: interactiveBuilder,
            ),
            const Divider(height: 24),
            Text(
              AppStrings.tr(
                'এই বাংলা ব্যাখ্যাটি কি পরিষ্কার ও সহজবোধ্য?',
                'Was this Bengali explanation clear and helpful?',
                language,
              ),
              style: const TextStyle(
                fontSize: 12.5,
                fontWeight: FontWeight.w700,
                color: PorhiTheme.slate700,
              ),
            ),
            const SizedBox(height: 10),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: <Widget>[
                OutlinedButton.icon(
                  key: const Key('lesson_feedback_helpful_btn'),
                  onPressed: isSubmittingFeedback
                      ? null
                      : () => onSubmitFeedback(true),
                  style: OutlinedButton.styleFrom(
                    backgroundColor: feedbackChoice == true
                        ? PorhiTheme.emerald50
                        : Colors.white,
                    foregroundColor: feedbackChoice == true
                        ? PorhiTheme.emerald600
                        : PorhiTheme.slate700,
                    side: BorderSide(
                      color: feedbackChoice == true
                          ? PorhiTheme.emerald600
                          : PorhiTheme.slate200,
                    ),
                  ),
                  icon: const Icon(Icons.thumb_up_outlined, size: 15),
                  label: Text(
                    AppStrings.tr('হ্যাঁ, পরিষ্কার', 'Yes, Clear', language),
                    style: const TextStyle(fontSize: 12),
                  ),
                ),
                OutlinedButton.icon(
                  key: const Key('lesson_feedback_unclear_btn'),
                  onPressed: isSubmittingFeedback
                      ? null
                      : () => onSubmitFeedback(false),
                  style: OutlinedButton.styleFrom(
                    backgroundColor: feedbackChoice == false
                        ? const Color(0xFFFFFBEB)
                        : Colors.white,
                    foregroundColor: feedbackChoice == false
                        ? const Color(0xFF92400E)
                        : PorhiTheme.slate700,
                    side: BorderSide(
                      color: feedbackChoice == false
                          ? const Color(0xFFF59E0B)
                          : PorhiTheme.slate200,
                    ),
                  ),
                  icon: const Icon(Icons.thumb_down_outlined, size: 15),
                  label: Text(
                    AppStrings.tr(
                      'আরো সহজ দরকার',
                      'Needs Simplifying',
                      language,
                    ),
                    style: const TextStyle(fontSize: 12),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class _ImportantTermsCard extends StatelessWidget {
  final List<ImportantTermEntity> terms;
  final AppLanguage language;
  final EnvConfig? envConfig;

  const _ImportantTermsCard({
    required this.terms,
    required this.language,
    this.envConfig,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: <Widget>[
            Row(
              children: <Widget>[
                const Icon(
                  Icons.bookmark_added_outlined,
                  size: 18,
                  color: PorhiTheme.indigo600,
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    AppStrings.tr(
                      'জরুরি পারিভাষিক শব্দ ও সংজ্ঞাসমূহ',
                      'Essential Terminology & Definitions',
                      language,
                    ),
                    style: const TextStyle(
                      fontSize: 15,
                      fontWeight: FontWeight.w800,
                      color: PorhiTheme.slate900,
                    ),
                  ),
                ),
              ],
            ),
            const Divider(height: 20),
            for (var i = 0; i < terms.length; i++) ...<Widget>[
              Container(
                padding: const EdgeInsets.all(12),
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
                            terms[i].termBangla,
                            style: const TextStyle(
                              fontSize: 13.5,
                              fontWeight: FontWeight.w800,
                              color: PorhiTheme.slate900,
                            ),
                          ),
                        ),
                        if (terms[i].termEnglish.trim().isNotEmpty) ...<Widget>[
                          const SizedBox(width: 8),
                          Flexible(
                            child: Text(
                              terms[i].termEnglish,
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                              style: const TextStyle(
                                fontSize: 11.5,
                                fontWeight: FontWeight.w600,
                                color: PorhiTheme.slate600,
                              ),
                            ),
                          ),
                        ],
                      ],
                    ),
                    if (terms[i].definition.trim().isNotEmpty) ...<Widget>[
                      const SizedBox(height: 6),
                      RichContentView(
                        content: terms[i].definition,
                        envConfig: envConfig,
                        baseStyle: const TextStyle(
                          fontSize: 13,
                          height: 1.5,
                          color: PorhiTheme.slate700,
                        ),
                      ),
                    ],
                  ],
                ),
              ),
              if (i < terms.length - 1) const SizedBox(height: 10),
            ],
          ],
        ),
      ),
    );
  }
}

class _WorkedExampleCard extends StatelessWidget {
  final WorkedExampleEntity example;
  final AppLanguage language;
  final EnvConfig? envConfig;

  const _WorkedExampleCard({
    required this.example,
    required this.language,
    this.envConfig,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: <Widget>[
            Row(
              children: <Widget>[
                const Icon(
                  Icons.calculate_outlined,
                  size: 18,
                  color: Color(0xFF7E22CE),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    AppStrings.tr(
                      'বাস্তব উদাহরণ ও ধাপে ধাপে সমাধান',
                      'Worked Example & Step-by-Step Solution',
                      language,
                    ),
                    style: const TextStyle(
                      fontSize: 15,
                      fontWeight: FontWeight.w800,
                      color: PorhiTheme.slate900,
                    ),
                  ),
                ),
              ],
            ),
            const Divider(height: 20),
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: const Color(0xFFFAF5FF),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: const Color(0xFFE9D5FF)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Text(
                    AppStrings.tr('সমস্যা:', 'Problem:', language),
                    style: const TextStyle(
                      fontSize: 11.5,
                      fontWeight: FontWeight.w800,
                      color: Color(0xFF6B21A8),
                    ),
                  ),
                  const SizedBox(height: 6),
                  RichContentView(
                    content: example.problem,
                    envConfig: envConfig,
                    baseStyle: const TextStyle(
                      fontSize: 13.5,
                      fontWeight: FontWeight.w600,
                      height: 1.55,
                      color: PorhiTheme.slate900,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 10),
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: PorhiTheme.emerald50,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: const Color(0xFFA7F3D0)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Text(
                    AppStrings.tr(
                      'ধাপে ধাপে সমাধান:',
                      'Step-by-Step Solution:',
                      language,
                    ),
                    style: const TextStyle(
                      fontSize: 11.5,
                      fontWeight: FontWeight.w800,
                      color: PorhiTheme.emerald600,
                    ),
                  ),
                  const SizedBox(height: 6),
                  RichContentView(
                    content: example.stepByStepSolution,
                    envConfig: envConfig,
                    baseStyle: const TextStyle(
                      fontSize: 13.5,
                      height: 1.55,
                      color: PorhiTheme.slate900,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _MemoryAidCard extends StatelessWidget {
  final String memoryAid;
  final AppLanguage language;
  final EnvConfig? envConfig;

  const _MemoryAidCard({
    required this.memoryAid,
    required this.language,
    this.envConfig,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: const Color(0xFFFFFBEB),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFFFDE68A)),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          const Icon(
            Icons.lightbulb_rounded,
            size: 20,
            color: Color(0xFFD97706),
          ),
          const SizedBox(width: 10),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Text(
                  AppStrings.tr(
                    'মনে রাখার টিপস ও ট্রিকস',
                    'Memory Aids & Shortcuts',
                    language,
                  ),
                  style: const TextStyle(
                    fontSize: 13.5,
                    fontWeight: FontWeight.w800,
                    color: Color(0xFF78350F),
                  ),
                ),
                const SizedBox(height: 6),
                RichContentView(
                  content: memoryAid,
                  envConfig: envConfig,
                  baseStyle: const TextStyle(
                    fontSize: 13,
                    height: 1.5,
                    color: Color(0xFF78350F),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _PrevNextTopicRow extends StatelessWidget {
  final AppLanguage language;
  final LessonSiblingTopicEntity? prevTopic;
  final LessonSiblingTopicEntity? nextTopic;
  final ValueChanged<String> onSelectTopic;

  const _PrevNextTopicRow({
    required this.language,
    required this.prevTopic,
    required this.nextTopic,
    required this.onSelectTopic,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: <Widget>[
        if (prevTopic != null)
          Expanded(
            child: OutlinedButton(
              key: const Key('lesson_prev_topic_btn'),
              onPressed: () => onSelectTopic(prevTopic!.id),
              style: OutlinedButton.styleFrom(
                padding: const EdgeInsets.all(12),
                alignment: Alignment.centerLeft,
                backgroundColor: Colors.white,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(14),
                ),
              ),
              child: Row(
                children: <Widget>[
                  const Icon(Icons.arrow_back_rounded, size: 16),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: <Widget>[
                        Text(
                          AppStrings.tr(
                            'পূর্ববর্তী টপিক',
                            'Previous Topic',
                            language,
                          ),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(
                            fontSize: 10.5,
                            fontWeight: FontWeight.w700,
                            color: PorhiTheme.slate600,
                          ),
                        ),
                        Text(
                          prevTopic!.titleBangla,
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(
                            fontSize: 12.5,
                            fontWeight: FontWeight.w800,
                            color: PorhiTheme.slate900,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          )
        else
          const Spacer(),
        if (prevTopic != null && nextTopic != null) const SizedBox(width: 10),
        if (nextTopic != null)
          Expanded(
            child: OutlinedButton(
              key: const Key('lesson_next_topic_btn'),
              onPressed: () => onSelectTopic(nextTopic!.id),
              style: OutlinedButton.styleFrom(
                padding: const EdgeInsets.all(12),
                alignment: Alignment.centerRight,
                backgroundColor: Colors.white,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(14),
                ),
              ),
              child: Row(
                children: <Widget>[
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: <Widget>[
                        Text(
                          AppStrings.tr(
                            'পরবর্তী টপিক',
                            'Next Topic',
                            language,
                          ),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(
                            fontSize: 10.5,
                            fontWeight: FontWeight.w700,
                            color: PorhiTheme.indigo600,
                          ),
                        ),
                        Text(
                          nextTopic!.titleBangla,
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          textAlign: TextAlign.end,
                          style: const TextStyle(
                            fontSize: 12.5,
                            fontWeight: FontWeight.w800,
                            color: PorhiTheme.slate900,
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(width: 8),
                  const Icon(
                    Icons.arrow_forward_rounded,
                    size: 16,
                    color: PorhiTheme.indigo600,
                  ),
                ],
              ),
            ),
          )
        else
          const Spacer(),
      ],
    );
  }
}
