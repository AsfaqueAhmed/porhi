import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/core/theme/porhi_theme.dart';
import 'package:porhi/core/widgets/rich_content/rich_content_view.dart';
import 'package:porhi/features/content_report/domain/entities/content_report_entity.dart';
import 'package:porhi/features/content_report/presentation/report_sheet/report_content_sheet.dart';
import 'package:porhi/features/practice/domain/entities/practice_entities.dart';
import 'package:porhi/features/practice/presentation/practice/controller/practice_controller.dart';
import 'package:porhi/features/practice/presentation/shared/cq_rubric_card.dart';
import 'package:porhi/features/practice/presentation/shared/explanation_layers_card.dart';
import 'package:porhi/routes/app_routes.dart';

class PracticeView extends GetView<PracticeController> {
  const PracticeView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Obx(() {
          final lang = controller.language.value;
          final offline = controller.isOfflineMode.value;
          final title = controller.chapterTitle.value.isNotEmpty
              ? controller.chapterTitle.value
              : AppStrings.tr('স্মার্ট অনুশীলন', 'Smart Practice', lang);
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
      ),
      body: Obx(() {
        final lang = controller.language.value;
        final loading = controller.isLoading.value;
        final error = controller.errorMessage.value;
        final questions = controller.questions;
        final currentQ = controller.currentQuestion;
        final statusMsg = controller.statusMessage.value;
        final isStatusErr = controller.isStatusError.value;

        return RefreshIndicator(
          onRefresh: controller.loadQuestions,
          child: SingleChildScrollView(
            controller: controller.scrollController,
            physics: const AlwaysScrollableScrollPhysics(),
            padding: const EdgeInsets.fromLTRB(16, 14, 16, 28),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: <Widget>[
                _PracticeHeaderFilterCard(controller: controller, lang: lang),
                const SizedBox(height: 12),
                if (statusMsg != null) ...<Widget>[
                  _StatusBanner(message: statusMsg, isError: isStatusErr),
                  const SizedBox(height: 12),
                ],
                if (loading && questions.isEmpty)
                  const Padding(
                    padding: EdgeInsets.symmetric(vertical: 48),
                    child: Center(child: CircularProgressIndicator()),
                  )
                else if (error != null && questions.isEmpty)
                  _ErrorStateCard(
                    message: error,
                    lang: lang,
                    onRetry: controller.loadQuestions,
                  )
                else if (currentQ == null)
                  _EmptyQuestionsCard(
                    lang: lang,
                    isMistakesMode:
                        controller.practiceMode.value == 'MISTAKES',
                    hasFilters: controller.difficultyFilter.value != 'ALL' ||
                        controller.practiceMode.value == 'MISTAKES',
                    onShowAll: controller.clearFiltersAndReload,
                  )
                else ...<Widget>[
                  _QuestionCard(
                    controller: controller,
                    question: currentQ,
                    lang: lang,
                  ),
                  if (!currentQ.isCreative &&
                      controller.submitResults.containsKey(currentQ.id)) ...<Widget>[
                    const SizedBox(height: 14),
                    _buildExplanationSection(currentQ, lang),
                  ],
                  if (controller.isSessionCompleted) ...<Widget>[
                    const SizedBox(height: 16),
                    _PracticeSummaryCard(controller: controller, lang: lang),
                  ],
                  const SizedBox(height: 16),
                  _NavigationRow(controller: controller, lang: lang),
                ],
              ],
            ),
          ),
        );
      }),
    );
  }

  Widget _buildExplanationSection(
    PracticeQuestionEntity question,
    AppLanguage lang,
  ) {
    final submitResult = controller.submitResults[question.id];
    final explanation = submitResult?.explanation ?? question.explanation;
    if (explanation == null || !explanation.hasAnyContent) {
      return const SizedBox.shrink();
    }
    return ExplanationLayersCard(
      key: ValueKey<String>('explanation_${question.id}'),
      explanation: explanation,
      envConfig: controller.envConfig,
      languageCode: lang.code,
    );
  }
}

class _PracticeHeaderFilterCard extends StatelessWidget {
  final PracticeController controller;
  final AppLanguage lang;

  const _PracticeHeaderFilterCard({
    required this.controller,
    required this.lang,
  });

  @override
  Widget build(BuildContext context) {
    return Obx(() {
      final typeMode = controller.questionTypeMode.value;
      final diff = controller.difficultyFilter.value;
      final isMistakes = controller.practiceMode.value == 'MISTAKES';
      final total = controller.questions.length;
      final index = total == 0 ? 0 : controller.safeIndex + 1;

      return Card(
        child: Padding(
          padding: const EdgeInsets.all(14),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: <Widget>[
              // MCQ vs CQ segmented toggle
              Container(
                padding: const EdgeInsets.all(4),
                decoration: BoxDecoration(
                  color: PorhiTheme.slate100,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Row(
                  children: <Widget>[
                    Expanded(
                      child: _ModeTabButton(
                        key: const Key('practice_tab_mcq'),
                        label: AppStrings.tr(
                          'বহুনির্বাচনি (MCQ)',
                          'Multiple Choice (MCQ)',
                          lang,
                        ),
                        selected: typeMode == 'MCQ',
                        onTap: () => controller.setQuestionTypeMode('MCQ'),
                      ),
                    ),
                    const SizedBox(width: 4),
                    Expanded(
                      child: _ModeTabButton(
                        key: const Key('practice_tab_cq'),
                        label: AppStrings.tr(
                          'সৃজনশীল (CQ)',
                          'Creative (CQ)',
                          lang,
                        ),
                        selected: typeMode == 'CQ_CREATIVE',
                        onTap: () =>
                            controller.setQuestionTypeMode('CQ_CREATIVE'),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 12),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  Text(
                    total == 0
                        ? AppStrings.tr('প্রশ্ন ০ / ০', 'Question 0 / 0', lang)
                        : '${AppStrings.tr('প্রশ্ন ', 'Question ', lang)}${AppStrings.formatNumber(index, lang)} / ${AppStrings.formatNumber(total, lang)}',
                    key: const Key('practice_progress_text'),
                    style: const TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w800,
                      color: PorhiTheme.slate900,
                    ),
                  ),
                  if (typeMode == 'MCQ')
                    Row(
                      mainAxisSize: MainAxisSize.min,
                      children: <Widget>[
                        _StatPill(
                          label:
                              '${AppStrings.tr('সঠিক: ', 'Correct: ', lang)}${AppStrings.formatNumber(controller.correctCount, lang)}',
                          bg: PorhiTheme.emerald50,
                          fg: PorhiTheme.emerald600,
                        ),
                        const SizedBox(width: 6),
                        _StatPill(
                          label:
                              '${AppStrings.formatNumber(controller.answeredCount, lang)}/${AppStrings.formatNumber(total, lang)}',
                          bg: PorhiTheme.slate100,
                          fg: PorhiTheme.slate700,
                        ),
                      ],
                    )
                  else
                    _StatPill(
                      label:
                          '${AppStrings.tr('মূল্যায়িত CQ: ', 'Assessed: ', lang)}${AppStrings.formatNumber(controller.assessedCqCount, lang)}/${AppStrings.formatNumber(total, lang)}',
                      bg: PorhiTheme.indigo50,
                      fg: PorhiTheme.indigo700,
                    ),
                ],
              ),
              const SizedBox(height: 10),
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  children: <Widget>[
                    for (final item in <({
                      String key,
                      String bn,
                      String en,
                    })>[
                      (key: 'ALL', bn: 'সব', en: 'All'),
                      (key: 'EASY', bn: 'সহজ', en: 'Easy'),
                      (key: 'MEDIUM', bn: 'মধ্যম', en: 'Medium'),
                      (key: 'HARD', bn: 'কঠিন', en: 'Hard'),
                    ]) ...<Widget>[
                      _FilterChipButton(
                        key: Key('practice_diff_${item.key}'),
                        label: AppStrings.tr(item.bn, item.en, lang),
                        selected: diff == item.key,
                        onTap: () => controller.setDifficultyFilter(item.key),
                      ),
                      const SizedBox(width: 6),
                    ],
                    if (typeMode == 'MCQ')
                      _FilterChipButton(
                        key: const Key('practice_mistakes_toggle'),
                        label: AppStrings.tr(
                          'ভুল প্রশ্ন রিভিউ',
                          'Mistakes Review',
                          lang,
                        ),
                        selected: isMistakes,
                        isRose: true,
                        onTap: controller.toggleMistakesMode,
                      ),
                  ],
                ),
              ),
            ],
          ),
        ),
      );
    });
  }
}

class _ModeTabButton extends StatelessWidget {
  final String label;
  final bool selected;
  final VoidCallback onTap;

  const _ModeTabButton({
    super.key,
    required this.label,
    required this.selected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(10),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 9),
        decoration: BoxDecoration(
          color: selected ? Colors.white : Colors.transparent,
          borderRadius: BorderRadius.circular(10),
          boxShadow: selected
              ? const <BoxShadow>[
                  BoxShadow(
                    color: Color(0x140F172A),
                    blurRadius: 4,
                    offset: Offset(0, 1),
                  ),
                ]
              : null,
        ),
        child: Text(
          label,
          textAlign: TextAlign.center,
          maxLines: 1,
          overflow: TextOverflow.ellipsis,
          style: TextStyle(
            fontSize: 12.5,
            fontWeight: FontWeight.w700,
            color: selected ? PorhiTheme.indigo700 : PorhiTheme.slate600,
          ),
        ),
      ),
    );
  }
}

class _FilterChipButton extends StatelessWidget {
  final String label;
  final bool selected;
  final bool isRose;
  final VoidCallback onTap;

  const _FilterChipButton({
    super.key,
    required this.label,
    required this.selected,
    this.isRose = false,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final bg = selected
        ? (isRose ? PorhiTheme.rose600 : PorhiTheme.indigo600)
        : (isRose ? const Color(0xFFFFF1F2) : PorhiTheme.slate100);
    final fg = selected
        ? Colors.white
        : (isRose ? PorhiTheme.rose600 : PorhiTheme.slate700);
    final borderColor = selected
        ? bg
        : (isRose ? const Color(0xFFFECDD3) : PorhiTheme.slate200);

    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(10),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 7),
        decoration: BoxDecoration(
          color: bg,
          borderRadius: BorderRadius.circular(10),
          border: Border.all(color: borderColor),
        ),
        child: Text(
          label,
          style: TextStyle(
            fontSize: 12,
            fontWeight: FontWeight.w700,
            color: fg,
          ),
        ),
      ),
    );
  }
}

class _StatPill extends StatelessWidget {
  final String label;
  final Color bg;
  final Color fg;

  const _StatPill({
    required this.label,
    required this.bg,
    required this.fg,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(999),
      ),
      child: Text(
        label,
        style: TextStyle(
          fontSize: 11.5,
          fontWeight: FontWeight.w700,
          color: fg,
        ),
      ),
    );
  }
}

class _QuestionCard extends StatelessWidget {
  final PracticeController controller;
  final PracticeQuestionEntity question;
  final AppLanguage lang;

  const _QuestionCard({
    required this.controller,
    required this.question,
    required this.lang,
  });

  @override
  Widget build(BuildContext context) {
    return Obx(() {
      final isBookmarked =
          controller.bookmarkedQuestionIds.contains(question.id);
      final isTogglingBookmark =
          controller.togglingBookmarkQuestionId.value == question.id;
      final selectedOptionId = controller.selectedOptions[question.id];
      final submitResult = controller.submitResults[question.id];
      final isSubmittingMcq =
          controller.submittingQuestionId.value == question.id;
      final isSubmittingCq =
          controller.submittingCqQuestionId.value == question.id;
      final cqResult = controller.cqSubmittedResults[question.id];

      final letters = lang == AppLanguage.bn
          ? const <String>['ক', 'খ', 'গ', 'ঘ']
          : const <String>['A', 'B', 'C', 'D'];

      return Card(
        key: ValueKey<String>('question_card_${question.id}'),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: <Widget>[
              Wrap(
                spacing: 8,
                runSpacing: 8,
                alignment: WrapAlignment.spaceBetween,
                crossAxisAlignment: WrapCrossAlignment.center,
                children: <Widget>[
                  Wrap(
                    spacing: 6,
                    runSpacing: 6,
                    children: <Widget>[
                      _DifficultyBadge(
                        difficulty: question.difficulty,
                        lang: lang,
                      ),
                      if (question.boardSource != null &&
                          question.boardSource!.trim().isNotEmpty)
                        Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 10,
                            vertical: 4,
                          ),
                          decoration: BoxDecoration(
                            color: PorhiTheme.slate100,
                            borderRadius: BorderRadius.circular(999),
                            border: Border.all(color: PorhiTheme.slate200),
                          ),
                          child: Text(
                            question.boardSource!,
                            style: const TextStyle(
                              fontSize: 11,
                              fontWeight: FontWeight.w600,
                              color: PorhiTheme.slate700,
                            ),
                          ),
                        ),
                    ],
                  ),
                  Row(
                    mainAxisSize: MainAxisSize.min,
                    children: <Widget>[
                      IconButton(
                        key: const Key('practice_bookmark_btn'),
                        tooltip: AppStrings.tr('বুকমার্ক', 'Bookmark', lang),
                        onPressed: isTogglingBookmark
                            ? null
                            : controller.toggleQuestionBookmark,
                        icon: Icon(
                          isBookmarked
                              ? Icons.bookmark_rounded
                              : Icons.bookmark_border_rounded,
                          color: isBookmarked
                              ? const Color(0xFFD97706)
                              : PorhiTheme.slate600,
                        ),
                      ),
                      IconButton(
                        key: const Key('practice_report_btn'),
                        tooltip:
                            AppStrings.tr('ভুল রিপোর্ট', 'Report Error', lang),
                        onPressed: () => ReportContentSheet.show(
                          context,
                          contentType: ReportContentType.question,
                          contentId: question.id,
                          topicId: question.topicId.isNotEmpty
                              ? question.topicId
                              : controller.topicIdFilter.value,
                          contentLabel: question.stem.length > 80
                              ? question.stem.substring(0, 80)
                              : question.stem,
                          language: lang,
                        ),
                        icon: const Icon(
                          Icons.flag_outlined,
                          color: PorhiTheme.rose600,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
              const SizedBox(height: 10),
              RichContentView(
                content: question.stem,
                envConfig: controller.envConfig,
                baseStyle: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w700,
                  height: 1.55,
                  color: PorhiTheme.slate900,
                ),
              ),
              if (!question.isCreative) ...<Widget>[
                const SizedBox(height: 16),
                for (var i = 0; i < question.options.length; i++) ...<Widget>[
                  _McqOptionTile(
                    option: question.options[i],
                    letter: i < letters.length ? letters[i] : '${i + 1}',
                    isAnswered: submitResult != null,
                    isChosen: selectedOptionId == question.options[i].id,
                    correctOptionId: submitResult?.correctOptionId,
                    isSubmitting: isSubmittingMcq,
                    envConfig: controller.envConfig,
                    onTap: () =>
                        controller.submitMcqOption(question.options[i].id),
                  ),
                  if (i < question.options.length - 1)
                    const SizedBox(height: 10),
                ],
                if (isSubmittingMcq) ...<Widget>[
                  const SizedBox(height: 12),
                  const LinearProgressIndicator(minHeight: 2),
                ],
              ] else ...<Widget>[
                const SizedBox(height: 8),
                CqRubricCard(
                  key: ValueKey<String>('cq_rubric_${question.id}'),
                  question: question,
                  submittedResult: cqResult,
                  isSubmitting: isSubmittingCq,
                  languageCode: lang.code,
                  envConfig: controller.envConfig,
                  onSubmit: controller.submitCqSelfAssess,
                ),
              ],
            ],
          ),
        ),
      );
    });
  }
}

class _DifficultyBadge extends StatelessWidget {
  final String difficulty;
  final AppLanguage lang;

  const _DifficultyBadge({required this.difficulty, required this.lang});

  @override
  Widget build(BuildContext context) {
    final normalized = difficulty.trim().toUpperCase();
    final Color bg;
    final Color fg;
    final Color border;
    final String label;

    if (normalized == 'EASY') {
      bg = PorhiTheme.emerald50;
      fg = PorhiTheme.emerald600;
      border = const Color(0xFFA7F3D0);
      label = AppStrings.tr('সহজ', 'Easy', lang);
    } else if (normalized == 'HARD') {
      bg = const Color(0xFFFFF1F2);
      fg = PorhiTheme.rose600;
      border = const Color(0xFFFECDD3);
      label = AppStrings.tr('কঠিন', 'Hard', lang);
    } else {
      bg = const Color(0xFFFFFBEB);
      fg = const Color(0xFF92400E);
      border = const Color(0xFFFDE68A);
      label = AppStrings.tr('মধ্যম', 'Medium', lang);
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(999),
        border: Border.all(color: border),
      ),
      child: Text(
        label,
        style: TextStyle(
          fontSize: 11,
          fontWeight: FontWeight.w700,
          color: fg,
        ),
      ),
    );
  }
}

class _McqOptionTile extends StatelessWidget {
  final PracticeOptionEntity option;
  final String letter;
  final bool isAnswered;
  final bool isChosen;
  final String? correctOptionId;
  final bool isSubmitting;
  final dynamic envConfig;
  final VoidCallback onTap;

  const _McqOptionTile({
    required this.option,
    required this.letter,
    required this.isAnswered,
    required this.isChosen,
    required this.correctOptionId,
    required this.isSubmitting,
    required this.envConfig,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final isOptionCorrect =
        (correctOptionId != null && option.id == correctOptionId) ||
            option.isCorrect == true;

    var borderColor = PorhiTheme.slate200;
    var bgColor = Colors.white;
    IconData? trailingIcon;
    Color? trailingColor;

    if (isAnswered) {
      if (isOptionCorrect) {
        borderColor = PorhiTheme.emerald600;
        bgColor = PorhiTheme.emerald50;
        trailingIcon = Icons.check_circle_rounded;
        trailingColor = PorhiTheme.emerald600;
      } else if (isChosen) {
        borderColor = PorhiTheme.rose600;
        bgColor = const Color(0xFFFFF1F2);
        trailingIcon = Icons.cancel_rounded;
        trailingColor = PorhiTheme.rose600;
      }
    } else if (isChosen) {
      borderColor = PorhiTheme.indigo600;
      bgColor = PorhiTheme.indigo50;
    }

    return InkWell(
      key: Key('practice_option_${option.id}'),
      onTap: isAnswered || isSubmitting ? null : onTap,
      borderRadius: BorderRadius.circular(14),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
        decoration: BoxDecoration(
          color: bgColor,
          borderRadius: BorderRadius.circular(14),
          border: Border.all(
            color: borderColor,
            width: isAnswered && (isOptionCorrect || isChosen) ? 1.5 : 1,
          ),
        ),
        child: Row(
          children: <Widget>[
            Container(
              width: 30,
              height: 30,
              alignment: Alignment.center,
              decoration: BoxDecoration(
                color: PorhiTheme.slate100,
                borderRadius: BorderRadius.circular(8),
              ),
              child: Text(
                letter,
                style: const TextStyle(
                  fontSize: 12.5,
                  fontWeight: FontWeight.w800,
                  color: PorhiTheme.slate700,
                ),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: RichContentView(
                content: option.text,
                envConfig: envConfig,
                baseStyle: const TextStyle(
                  fontSize: 14,
                  color: PorhiTheme.slate900,
                ),
              ),
            ),
            if (trailingIcon != null) ...<Widget>[
              const SizedBox(width: 8),
              Icon(trailingIcon, size: 20, color: trailingColor),
            ],
          ],
        ),
      ),
    );
  }
}

class _PracticeSummaryCard extends StatelessWidget {
  final PracticeController controller;
  final AppLanguage lang;

  const _PracticeSummaryCard({
    required this.controller,
    required this.lang,
  });

  @override
  Widget build(BuildContext context) {
    final correct = controller.correctCount;
    final wrong = controller.wrongCount;
    final accuracy = controller.accuracyPercent;

    return Container(
      key: const Key('practice_summary_card'),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: PorhiTheme.indigo50,
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: const Color(0xFFC7D2FE)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: <Widget>[
          Row(
            children: <Widget>[
              Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(
                  color: PorhiTheme.indigo600,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: const Icon(
                  Icons.emoji_events_outlined,
                  color: Colors.white,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Text(
                      AppStrings.tr(
                        'অনুশীলন সারসংক্ষেপ',
                        'Practice Session Summary',
                        lang,
                      ),
                      style: const TextStyle(
                        fontSize: 15,
                        fontWeight: FontWeight.w800,
                        color: PorhiTheme.slate900,
                      ),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      lang == AppLanguage.bn
                          ? 'সঠিক: ${AppStrings.formatNumber(correct, lang)}টি • ভুল: ${AppStrings.formatNumber(wrong, lang)}টি • নির্ভুলতা: ${AppStrings.formatNumber(accuracy, lang)}%'
                          : 'Correct: $correct • Wrong: $wrong • Accuracy: $accuracy%',
                      style: const TextStyle(
                        fontSize: 12.5,
                        fontWeight: FontWeight.w600,
                        color: PorhiTheme.slate700,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 14),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: <Widget>[
              if (wrong > 0)
                FilledButton.icon(
                  key: const Key('practice_retry_mistakes_btn'),
                  onPressed: controller.retrySessionMistakes,
                  style: FilledButton.styleFrom(
                    backgroundColor: PorhiTheme.rose600,
                    foregroundColor: Colors.white,
                  ),
                  icon: const Icon(Icons.refresh_rounded, size: 16),
                  label: Text(
                    AppStrings.tr(
                      'ভুল প্রশ্নগুলো আবার অনুশীলন করো',
                      'Retry Incorrect Questions',
                      lang,
                    ),
                  ),
                ),
              OutlinedButton.icon(
                key: const Key('practice_restart_btn'),
                onPressed: controller.restartSession,
                icon: const Icon(Icons.replay_rounded, size: 16),
                label: Text(
                  AppStrings.tr('নতুন করে শুরু করো', 'Restart Session', lang),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _NavigationRow extends StatelessWidget {
  final PracticeController controller;
  final AppLanguage lang;

  const _NavigationRow({required this.controller, required this.lang});

  @override
  Widget build(BuildContext context) {
    final idx = controller.safeIndex;
    final hasPrev = idx > 0;
    final hasNext = idx < controller.questions.length - 1;

    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: <Widget>[
        OutlinedButton.icon(
          key: const Key('practice_prev_btn'),
          onPressed: hasPrev ? controller.previousQuestion : null,
          icon: const Icon(Icons.arrow_back_rounded, size: 18),
          label: Text(
            AppStrings.tr('পূর্ববর্তী প্রশ্ন', 'Previous', lang),
          ),
        ),
        if (hasNext)
          FilledButton.icon(
            key: const Key('practice_next_btn'),
            onPressed: controller.nextQuestion,
            style: FilledButton.styleFrom(
              backgroundColor: PorhiTheme.indigo600,
              foregroundColor: Colors.white,
            ),
            icon: const Icon(Icons.arrow_forward_rounded, size: 18),
            label: Text(
              AppStrings.tr('পরবর্তী প্রশ্ন', 'Next', lang),
            ),
          )
        else
          FilledButton.icon(
            key: const Key('practice_finish_btn'),
            onPressed: () {
              final subjectId = controller.subjectId.value.trim();
              if (Get.key.currentState?.canPop() == true) {
                Get.back();
              } else if (subjectId.isNotEmpty) {
                Get.offNamed(AppRoutes.chaptersForSubject(subjectId));
              }
            },
            style: FilledButton.styleFrom(
              backgroundColor: PorhiTheme.emerald600,
              foregroundColor: Colors.white,
            ),
            icon: const Icon(Icons.check_circle_outline_rounded, size: 18),
            label: Text(
              AppStrings.tr('অনুশীলন সম্পন্ন', 'Finish Practice', lang),
            ),
          ),
      ],
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
      key: const Key('practice_status_banner'),
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

class _ErrorStateCard extends StatelessWidget {
  final String message;
  final AppLanguage lang;
  final VoidCallback onRetry;

  const _ErrorStateCard({
    required this.message,
    required this.lang,
    required this.onRetry,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            const Icon(
              Icons.quiz_outlined,
              size: 44,
              color: PorhiTheme.slate400,
            ),
            const SizedBox(height: 12),
            Text(
              message,
              textAlign: TextAlign.center,
              style: const TextStyle(color: PorhiTheme.slate700),
            ),
            const SizedBox(height: 14),
            ElevatedButton.icon(
              onPressed: onRetry,
              icon: const Icon(Icons.refresh_rounded),
              label: Text(AppStrings.t('action.retry', lang)),
            ),
          ],
        ),
      ),
    );
  }
}

class _EmptyQuestionsCard extends StatelessWidget {
  final AppLanguage lang;
  final bool isMistakesMode;
  final bool hasFilters;
  final VoidCallback onShowAll;

  const _EmptyQuestionsCard({
    required this.lang,
    required this.isMistakesMode,
    required this.hasFilters,
    required this.onShowAll,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            const Icon(
              Icons.menu_book_outlined,
              size: 44,
              color: PorhiTheme.slate400,
            ),
            const SizedBox(height: 12),
            Text(
              isMistakesMode
                  ? AppStrings.tr(
                      'এই অধ্যায়ে কোনো অমীমাংসিত ভুল প্রশ্ন পাওয়া যায়নি।',
                      'No unresolved mistakes found in this chapter.',
                      lang,
                    )
                  : AppStrings.tr(
                      'এই ফিল্টারে কোনো প্রশ্ন পাওয়া যায়নি।',
                      'No questions match the selected filter.',
                      lang,
                    ),
              textAlign: TextAlign.center,
              style: const TextStyle(
                fontSize: 14.5,
                fontWeight: FontWeight.w700,
                color: PorhiTheme.slate700,
              ),
            ),
            if (hasFilters) ...<Widget>[
              const SizedBox(height: 14),
              FilledButton(
                onPressed: onShowAll,
                child: Text(
                  AppStrings.tr('সকল প্রশ্ন দেখাও', 'Show All Questions', lang),
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
