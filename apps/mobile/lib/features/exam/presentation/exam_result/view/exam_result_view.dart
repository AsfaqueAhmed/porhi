import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:porhi/app/env.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/core/theme/porhi_theme.dart';
import 'package:porhi/core/widgets/rich_content/rich_content_view.dart';
import 'package:porhi/features/content_report/domain/entities/content_report_entity.dart';
import 'package:porhi/features/content_report/presentation/report_sheet/report_content_sheet.dart';
import 'package:porhi/features/exam/domain/entities/exam_entities.dart';
import 'package:porhi/features/exam/presentation/exam_result/controller/exam_result_controller.dart';
import 'package:porhi/features/practice/presentation/shared/explanation_layers_card.dart';

class ExamResultView extends GetView<ExamResultController> {
  const ExamResultView({super.key});

  String _formatScoreValue(double value, AppLanguage lang) {
    final rounded = (value * 100).round() / 100;
    final text = rounded == rounded.roundToDouble()
        ? rounded.toInt().toString()
        : rounded.toString();
    return AppStrings.formatNumber(text, lang);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Obx(() {
          final lang = controller.language.value;
          return Text(
            AppStrings.tr('পরীক্ষার ফলাফল', 'Exam Result', lang),
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
          );
        }),
      ),
      body: Obx(() {
        final lang = controller.language.value;
        final loading = controller.isLoading.value;
        final error = controller.errorMessage.value;
        final res = controller.result.value;

        if (loading && res == null) {
          return const Center(child: CircularProgressIndicator());
        }

        if (error != null && res == null) {
          return Center(
            child: Padding(
              padding: const EdgeInsets.all(24),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: <Widget>[
                  const Icon(
                    Icons.error_outline,
                    size: 40,
                    color: PorhiTheme.rose600,
                  ),
                  const SizedBox(height: 10),
                  Text(error, textAlign: TextAlign.center),
                  const SizedBox(height: 14),
                  ElevatedButton(
                    onPressed: controller.loadSession,
                    child: Text(AppStrings.t('action.retry', lang)),
                  ),
                ],
              ),
            ),
          );
        }

        if (res == null) {
          return Center(child: Text(AppStrings.t('common.noData', lang)));
        }

        return RefreshIndicator(
          onRefresh: controller.loadSession,
          child: SingleChildScrollView(
            controller: controller.scrollController,
            physics: const AlwaysScrollableScrollPhysics(),
            padding: const EdgeInsets.fromLTRB(16, 14, 16, 32),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: <Widget>[
                _ScoreSummaryCard(
                  result: res,
                  title: controller.headerTitle.value,
                  formattedScore: _formatScoreValue(res.score, lang),
                  formattedDeduction:
                      _formatScoreValue(res.negativeDeduction, lang),
                  formattedNegRatio: _formatScoreValue(res.negativeRatio, lang),
                  lang: lang,
                  onRetake: controller.retakeExam,
                  onBack: controller.goBackToChapterOrSubjects,
                ),
                const SizedBox(height: 18),
                Text(
                  AppStrings.tr(
                    'প্রশ্নভিত্তিক বিশ্লেষণ ও ব্যাখ্যা',
                    'Question-by-Question Review',
                    lang,
                  ),
                  style: const TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.w800,
                    color: PorhiTheme.slate900,
                  ),
                ),
                const SizedBox(height: 10),
                if (res.answersWithExplanation.isEmpty)
                  Card(
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: Text(
                        AppStrings.tr(
                          'বিস্তারিত উত্তর পাওয়া যায়নি।',
                          'No question breakdown available.',
                          lang,
                        ),
                      ),
                    ),
                  )
                else
                  ...List<Widget>.generate(res.answersWithExplanation.length,
                      (index) {
                    final item = res.answersWithExplanation[index];
                    return Padding(
                      padding: const EdgeInsets.only(bottom: 12),
                      child: _ReviewedQuestionCard(
                        index: index,
                        item: item,
                        lang: lang,
                        envConfig: controller.envConfig,
                        isExpanded: controller.expandedExplanationIds
                            .contains(item.questionId),
                        onToggleExplanation: () =>
                            controller.toggleExplanation(item.questionId),
                      ),
                    );
                  }),
              ],
            ),
          ),
        );
      }),
    );
  }
}

class _ScoreSummaryCard extends StatelessWidget {
  final ExamResultEntity result;
  final String title;
  final String formattedScore;
  final String formattedDeduction;
  final String formattedNegRatio;
  final AppLanguage lang;
  final VoidCallback onRetake;
  final VoidCallback onBack;

  const _ScoreSummaryCard({
    required this.result,
    required this.title,
    required this.formattedScore,
    required this.formattedDeduction,
    required this.formattedNegRatio,
    required this.lang,
    required this.onRetake,
    required this.onBack,
  });

  @override
  Widget build(BuildContext context) {
    final totalStr = AppStrings.formatNumber(result.totalQuestions, lang);
    final accuracyStr = AppStrings.formatNumber(result.accuracyPercent, lang);

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: <Widget>[
            Container(
              width: 56,
              height: 56,
              decoration: BoxDecoration(
                color: const Color(0xFFFEF3C7),
                borderRadius: BorderRadius.circular(16),
              ),
              child: const Icon(
                Icons.emoji_events_rounded,
                size: 30,
                color: Color(0xFFD97706),
              ),
            ),
            const SizedBox(height: 10),
            if (title.isNotEmpty) ...<Widget>[
              Text(
                title,
                textAlign: TextAlign.center,
                style: const TextStyle(
                  fontSize: 12.5,
                  fontWeight: FontWeight.w700,
                  color: PorhiTheme.slate600,
                ),
              ),
              const SizedBox(height: 4),
            ],
            Text(
              '$formattedScore / $totalStr',
              key: const Key('exam_score_headline'),
              style: const TextStyle(
                fontSize: 26,
                fontWeight: FontWeight.w900,
                color: PorhiTheme.slate900,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              AppStrings.tr(
                'সঠিকতার হার: $accuracyStr%',
                'Accuracy: $accuracyStr%',
                lang,
              ),
              style: const TextStyle(
                fontSize: 13.5,
                fontWeight: FontWeight.w700,
                color: PorhiTheme.indigo600,
              ),
            ),
            const SizedBox(height: 10),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              alignment: WrapAlignment.center,
              children: <Widget>[
                if (result.percentile != null)
                  Container(
                    key: const Key('exam_percentile_badge'),
                    padding: const EdgeInsets.symmetric(
                      horizontal: 12,
                      vertical: 5,
                    ),
                    decoration: BoxDecoration(
                      color: PorhiTheme.indigo50,
                      borderRadius: BorderRadius.circular(999),
                      border: Border.all(color: const Color(0xFFC7D2FE)),
                    ),
                    child: Text(
                      AppStrings.tr(
                        'পারসেন্টাইল: ${AppStrings.formatNumber(result.percentile!, lang)}%',
                        'Percentile: ${result.percentile}%',
                        lang,
                      ),
                      style: const TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w800,
                        color: PorhiTheme.indigo700,
                      ),
                    ),
                  ),
                if (result.isQueuedOffline)
                  Container(
                    key: const Key('exam_offline_queued_badge'),
                    padding: const EdgeInsets.symmetric(
                      horizontal: 12,
                      vertical: 5,
                    ),
                    decoration: BoxDecoration(
                      color: const Color(0xFFFEF3C7),
                      borderRadius: BorderRadius.circular(999),
                      border: Border.all(color: const Color(0xFFFDE68A)),
                    ),
                    child: Text(
                      AppStrings.tr(
                        'অফলাইন সিঙ্ক কিউতে সংরক্ষিত',
                        'Queued for Offline Sync',
                        lang,
                      ),
                      style: const TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w700,
                        color: Color(0xFF92400E),
                      ),
                    ),
                  ),
              ],
            ),
            const SizedBox(height: 14),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              alignment: WrapAlignment.center,
              children: <Widget>[
                _BreakdownPill(
                  label: AppStrings.tr(
                    'সঠিক: ${AppStrings.formatNumber(result.correctCount, lang)}',
                    'Correct: ${result.correctCount}',
                    lang,
                  ),
                  bg: PorhiTheme.emerald50,
                  fg: PorhiTheme.emerald600,
                ),
                _BreakdownPill(
                  label: AppStrings.tr(
                    'ভুল: ${AppStrings.formatNumber(result.wrongCount, lang)}',
                    'Wrong: ${result.wrongCount}',
                    lang,
                  ),
                  bg: const Color(0xFFFFF1F2),
                  fg: PorhiTheme.rose600,
                ),
                _BreakdownPill(
                  label: AppStrings.tr(
                    'বাদ দেওয়া: ${AppStrings.formatNumber(result.skippedCount, lang)}',
                    'Skipped: ${result.skippedCount}',
                    lang,
                  ),
                  bg: PorhiTheme.slate100,
                  fg: PorhiTheme.slate700,
                ),
                _BreakdownPill(
                  label: result.negativeRatio > 0
                      ? AppStrings.tr(
                          'নেগেটিভ কাটা: -$formattedDeduction (-$formattedNegRatio/ভুল)',
                          'Negative: -$formattedDeduction (-$formattedNegRatio/wrong)',
                          lang,
                        )
                      : AppStrings.tr('নেগেটিভ কাটা: ০', 'Negative: 0', lang),
                  bg: const Color(0xFFFFFBEB),
                  fg: const Color(0xFF92400E),
                ),
              ],
            ),
            const SizedBox(height: 16),
            Wrap(
              spacing: 10,
              runSpacing: 10,
              alignment: WrapAlignment.center,
              children: <Widget>[
                ElevatedButton.icon(
                  key: const Key('exam_retake_btn'),
                  onPressed: onRetake,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: PorhiTheme.indigo600,
                    foregroundColor: Colors.white,
                  ),
                  icon: const Icon(Icons.replay_rounded, size: 18),
                  label: Text(
                    AppStrings.tr('পুনরায় পরীক্ষা দাও', 'Retake Exam', lang),
                  ),
                ),
                OutlinedButton.icon(
                  key: const Key('exam_back_btn'),
                  onPressed: onBack,
                  icon: const Icon(Icons.arrow_back_rounded, size: 18),
                  label: Text(
                    AppStrings.tr('অধ্যায়ে ফিরে যাও', 'Back to Chapter', lang),
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

class _BreakdownPill extends StatelessWidget {
  final String label;
  final Color bg;
  final Color fg;

  const _BreakdownPill({
    required this.label,
    required this.bg,
    required this.fg,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(10),
      ),
      child: Text(
        label,
        style: TextStyle(
          fontSize: 12,
          fontWeight: FontWeight.w700,
          color: fg,
        ),
      ),
    );
  }
}

class _ReviewedQuestionCard extends StatelessWidget {
  final int index;
  final ExamReviewedAnswerEntity item;
  final AppLanguage lang;
  final EnvConfig? envConfig;
  final bool isExpanded;
  final VoidCallback onToggleExplanation;

  const _ReviewedQuestionCard({
    required this.index,
    required this.item,
    required this.lang,
    required this.envConfig,
    required this.isExpanded,
    required this.onToggleExplanation,
  });

  @override
  Widget build(BuildContext context) {
    final isSkipped =
        item.selectedOptionId == null || item.selectedOptionId!.isEmpty;
    final statusColor = isSkipped
        ? PorhiTheme.slate600
        : (item.isCorrect ? PorhiTheme.emerald600 : PorhiTheme.rose600);
    final statusBg = isSkipped
        ? PorhiTheme.slate100
        : (item.isCorrect ? PorhiTheme.emerald50 : const Color(0xFFFFF1F2));
    final statusLabel = isSkipped
        ? AppStrings.tr('বাদ দেওয়া হয়েছে', 'Skipped', lang)
        : (item.isCorrect
            ? AppStrings.tr('সঠিক', 'Correct', lang)
            : AppStrings.tr('ভুল', 'Wrong', lang));

    final hasExplanation =
        item.explanation != null && item.explanation!.hasAnyContent;

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(14),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: <Widget>[
            Wrap(
              spacing: 8,
              runSpacing: 6,
              alignment: WrapAlignment.spaceBetween,
              crossAxisAlignment: WrapCrossAlignment.center,
              children: <Widget>[
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 10,
                    vertical: 4,
                  ),
                  decoration: BoxDecoration(
                    color: statusBg,
                    borderRadius: BorderRadius.circular(999),
                  ),
                  child: Text(
                    '${AppStrings.tr('প্রশ্ন', 'Q', lang)} ${AppStrings.formatNumber(index + 1, lang)} • $statusLabel',
                    style: TextStyle(
                      fontSize: 11.5,
                      fontWeight: FontWeight.w800,
                      color: statusColor,
                    ),
                  ),
                ),
                IconButton(
                  key: Key('exam_report_q_${item.questionId}'),
                  tooltip: AppStrings.tr('রিপোর্ট করুন', 'Report Issue', lang),
                  onPressed: () => ReportContentSheet.show(
                    context,
                    contentType: ReportContentType.question,
                    contentId: item.questionId,
                    topicId: item.topicId,
                    contentLabel: item.stem.length > 80
                        ? item.stem.substring(0, 80)
                        : item.stem,
                    language: lang,
                  ),
                  icon: const Icon(
                    Icons.flag_outlined,
                    size: 18,
                    color: PorhiTheme.slate600,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            RichContentView(
              content: item.stem,
              envConfig: envConfig,
              baseStyle: const TextStyle(
                fontSize: 14.5,
                fontWeight: FontWeight.w700,
                height: 1.45,
                color: PorhiTheme.slate900,
              ),
            ),
            const SizedBox(height: 10),
            ...item.options.map((opt) {
              final isSelected = opt.id == item.selectedOptionId;
              final isCorrect =
                  opt.id == item.correctOptionId || opt.isCorrect == true;

              Color bg = PorhiTheme.slate50;
              Color border = PorhiTheme.slate200;
              IconData? icon;
              Color? iconColor;

              if (isCorrect) {
                bg = PorhiTheme.emerald50;
                border = PorhiTheme.emerald600;
                icon = Icons.check_circle_rounded;
                iconColor = PorhiTheme.emerald600;
              } else if (isSelected && !item.isCorrect) {
                bg = const Color(0xFFFFF1F2);
                border = PorhiTheme.rose600;
                icon = Icons.cancel_rounded;
                iconColor = PorhiTheme.rose600;
              }

              return Container(
                margin: const EdgeInsets.only(bottom: 8),
                padding: const EdgeInsets.symmetric(
                  horizontal: 10,
                  vertical: 9,
                ),
                decoration: BoxDecoration(
                  color: bg,
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(color: border),
                ),
                child: Row(
                  children: <Widget>[
                    Expanded(
                      child: RichContentView(
                        content: opt.text,
                        envConfig: envConfig,
                        baseStyle: const TextStyle(
                          fontSize: 13.5,
                          color: PorhiTheme.slate900,
                        ),
                      ),
                    ),
                    if (icon != null) ...<Widget>[
                      const SizedBox(width: 8),
                      Icon(icon, size: 18, color: iconColor),
                    ],
                  ],
                ),
              );
            }),
            if (hasExplanation) ...<Widget>[
              const SizedBox(height: 4),
              Align(
                alignment: Alignment.centerLeft,
                child: TextButton.icon(
                  key: Key('exam_toggle_exp_${item.questionId}'),
                  onPressed: onToggleExplanation,
                  icon: Icon(
                    isExpanded
                        ? Icons.keyboard_arrow_up_rounded
                        : Icons.lightbulb_outline_rounded,
                    size: 18,
                  ),
                  label: Text(
                    isExpanded
                        ? AppStrings.tr('ব্যাখ্যা লুকাও', 'Hide Explanation', lang)
                        : AppStrings.tr('৬-স্তরের ব্যাখ্যা দেখো', 'Show 6-Layer Explanation', lang),
                  ),
                ),
              ),
              if (isExpanded)
                ExplanationLayersCard(
                  key: ValueKey<String>('exam_exp_card_${item.questionId}'),
                  explanation: item.explanation!,
                  envConfig: envConfig,
                  languageCode: lang.code,
                ),
            ],
          ],
        ),
      ),
    );
  }
}
