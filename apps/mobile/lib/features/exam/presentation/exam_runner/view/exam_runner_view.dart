import 'dart:async';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/core/theme/porhi_theme.dart';
import 'package:porhi/core/widgets/rich_content/rich_content_view.dart';
import 'package:porhi/features/exam/domain/entities/exam_entities.dart';
import 'package:porhi/features/exam/presentation/exam_runner/controller/exam_runner_controller.dart';
import 'package:porhi/features/exam/presentation/exam_runner/widgets/question_navigator_sheet.dart';

class ExamRunnerView extends StatefulWidget {
  const ExamRunnerView({super.key});

  @override
  State<ExamRunnerView> createState() => _ExamRunnerViewState();
}

class _ExamRunnerViewState extends State<ExamRunnerView> {
  bool _isExitDialogOpen = false;
  bool _isSubmitDialogOpen = false;

  ExamRunnerController get controller => Get.find<ExamRunnerController>();

  Future<void> _confirmExit(BuildContext context, AppLanguage lang) async {
    if (_isExitDialogOpen || _isSubmitDialogOpen || !mounted) return;
    _isExitDialogOpen = true;
    String? action;
    try {
      action = await showDialog<String>(
        context: context,
        builder: (ctx) => AlertDialog(
          title: Text(
            AppStrings.tr('পরীক্ষা থেকে বের হতে চাও?', 'Leave Active Exam?', lang),
          ),
          content: Text(
            AppStrings.tr(
              'তোমার উত্তর ও সময় সংরক্ষিত আছে। পরে চাইলে আবার শুরু করতে পারবে।',
              'Your answers and remaining time are saved so you can resume later.',
              lang,
            ),
          ),
          actions: <Widget>[
            TextButton(
              onPressed: () => Navigator.of(ctx).pop('stay'),
              child: Text(AppStrings.tr('পরীক্ষায় থাকো', 'Stay', lang)),
            ),
            TextButton(
              onPressed: () => Navigator.of(ctx).pop('discard'),
              style: TextButton.styleFrom(foregroundColor: PorhiTheme.rose600),
              child: Text(
                AppStrings.tr('বাতিল করে বের হও', 'Discard & Exit', lang),
              ),
            ),
            ElevatedButton(
              onPressed: () => Navigator.of(ctx).pop('save'),
              child: Text(
                AppStrings.tr('সংরক্ষণ করে বের হও', 'Save & Exit', lang),
              ),
            ),
          ],
        ),
      );
    } finally {
      _isExitDialogOpen = false;
    }

    if (!mounted) return;
    if (action == 'save') {
      await controller.saveAndExit();
    } else if (action == 'discard') {
      await controller.discardAndExit();
    }
  }

  Future<void> _confirmSubmit(BuildContext context, AppLanguage lang) async {
    if (_isExitDialogOpen || _isSubmitDialogOpen || !mounted) return;
    _isSubmitDialogOpen = true;
    final unanswered = controller.unansweredCount;
    bool? confirmed;
    try {
      confirmed = await showDialog<bool>(
        context: context,
        builder: (ctx) => AlertDialog(
          title: Text(
            AppStrings.tr('পরীক্ষা জমা দেবে?', 'Submit Exam?', lang),
          ),
          content: Text(
            unanswered > 0
                ? AppStrings.tr(
                    'এখনো ${AppStrings.formatNumber(unanswered, lang)}টি প্রশ্নের উত্তর দেওয়া হয়নি। তবুও জমা দিতে চাও?',
                    'You still have $unanswered unanswered question(s). Submit anyway?',
                    lang,
                  )
                : AppStrings.tr(
                    'সবগুলো প্রশ্নের উত্তর দেওয়া হয়েছে। উত্তরপত্র জমা দিতে নিশ্চিত করো।',
                    'All questions answered. Confirm to submit your exam.',
                    lang,
                  ),
          ),
          actions: <Widget>[
            TextButton(
              onPressed: () => Navigator.of(ctx).pop(false),
              child: Text(AppStrings.t('action.cancel', lang)),
            ),
            ElevatedButton(
              key: const Key('exam_confirm_submit_btn'),
              onPressed: () => Navigator.of(ctx).pop(true),
              style: ElevatedButton.styleFrom(
                backgroundColor: PorhiTheme.indigo600,
                foregroundColor: Colors.white,
              ),
              child: Text(AppStrings.tr('জমা দাও', 'Submit', lang)),
            ),
          ],
        ),
      );
    } finally {
      _isSubmitDialogOpen = false;
    }

    if (!mounted) return;
    if (confirmed == true) {
      await controller.submitExam();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Obx(() {
      final lang = controller.language.value;
      final activeSession = controller.session.value;
      final currentQ = controller.currentQuestion;
      final isUrgent = controller.remainingSeconds.value <= 60;
      final submitting = controller.isSubmitting.value;
      final error = controller.errorMessage.value;

      return PopScope(
        canPop: false,
        onPopInvokedWithResult: (didPop, _) {
          if (didPop) return;
          if (activeSession == null) {
            Get.back<void>();
            return;
          }
          unawaited(_confirmExit(context, lang));
        },
        child: Scaffold(
          appBar: AppBar(
            titleSpacing: 8,
            title: Text(
              controller.examTitle.value.isNotEmpty
                  ? controller.examTitle.value
                  : AppStrings.tr('মডেল টেস্ট', 'Model Test', lang),
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            ),
            actions: <Widget>[
              if (activeSession != null) ...<Widget>[
                Container(
                  key: const Key('exam_timer_badge'),
                  margin: const EdgeInsets.symmetric(vertical: 10),
                  padding: const EdgeInsets.symmetric(
                    horizontal: 10,
                    vertical: 4,
                  ),
                  decoration: BoxDecoration(
                    color: isUrgent
                        ? const Color(0xFFFFF1F2)
                        : PorhiTheme.indigo50,
                    borderRadius: BorderRadius.circular(999),
                    border: Border.all(
                      color: isUrgent
                          ? const Color(0xFFFECDD3)
                          : const Color(0xFFC7D2FE),
                    ),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: <Widget>[
                      Icon(
                        Icons.timer_outlined,
                        size: 15,
                        color: isUrgent
                            ? PorhiTheme.rose600
                            : PorhiTheme.indigo700,
                      ),
                      const SizedBox(width: 4),
                      Text(
                        controller.formattedRemainingTime(lang),
                        style: TextStyle(
                          fontSize: 13,
                          fontWeight: FontWeight.w800,
                          color: isUrgent
                              ? PorhiTheme.rose600
                              : PorhiTheme.indigo700,
                        ),
                      ),
                    ],
                  ),
                ),
                IconButton(
                  key: const Key('exam_palette_btn'),
                  tooltip: AppStrings.tr('প্রশ্ন তালিকা', 'Question Palette', lang),
                  onPressed: () => QuestionNavigatorSheet.show(
                    context,
                    questions: controller.questions.toList(),
                    currentIndex: controller.safeIndex,
                    answers: Map<String, String?>.from(controller.answers),
                    flaggedIds: controller.flaggedQuestionIds.toSet(),
                    language: lang,
                    onSelectIndex: controller.goToQuestion,
                  ),
                  icon: const Icon(Icons.grid_view_rounded),
                ),
              ],
            ],
          ),
          body: activeSession == null || currentQ == null
              ? Center(
                  child: Padding(
                    padding: const EdgeInsets.all(24),
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: <Widget>[
                        Text(
                          error ?? AppStrings.t('common.noData', lang),
                          textAlign: TextAlign.center,
                        ),
                        const SizedBox(height: 12),
                        ElevatedButton(
                          onPressed: () => Get.back<void>(),
                          child: Text(AppStrings.tr('ফিরে যাও', 'Go Back', lang)),
                        ),
                      ],
                    ),
                  ),
                )
              : SingleChildScrollView(
                  controller: controller.scrollController,
                  padding: const EdgeInsets.fromLTRB(16, 12, 16, 28),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: <Widget>[
                      if (controller.isResumedSession.value) ...<Widget>[
                        Container(
                          margin: const EdgeInsets.only(bottom: 10),
                          padding: const EdgeInsets.symmetric(
                            horizontal: 12,
                            vertical: 8,
                          ),
                          decoration: BoxDecoration(
                            color: PorhiTheme.indigo50,
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: Text(
                            AppStrings.tr(
                              'পূর্বের অসমাপ্ত পরীক্ষা থেকে পুনরায় শুরু করা হয়েছে',
                              'Resumed from saved draft',
                              lang,
                            ),
                            style: const TextStyle(
                              fontSize: 12,
                              fontWeight: FontWeight.w700,
                              color: PorhiTheme.indigo700,
                            ),
                          ),
                        ),
                      ],
                      if (error != null) ...<Widget>[
                        Container(
                          margin: const EdgeInsets.only(bottom: 10),
                          padding: const EdgeInsets.all(12),
                          decoration: BoxDecoration(
                            color: const Color(0xFFFFF1F2),
                            borderRadius: BorderRadius.circular(12),
                            border: Border.all(color: const Color(0xFFFECDD3)),
                          ),
                          child: Text(
                            error,
                            style: const TextStyle(
                              fontSize: 12.5,
                              fontWeight: FontWeight.w600,
                              color: PorhiTheme.rose600,
                            ),
                          ),
                        ),
                      ],
                      _RunnerProgressHeader(
                        currentIndex: controller.safeIndex,
                        totalQuestions: controller.questions.length,
                        answeredCount: controller.answeredCount,
                        isOffline: activeSession.isOfflineSession,
                        lang: lang,
                      ),
                      const SizedBox(height: 12),
                      _ExamQuestionCard(
                        controller: controller,
                        question: currentQ,
                        questionNumber: controller.safeIndex + 1,
                        lang: lang,
                      ),
                      const SizedBox(height: 16),
                      Wrap(
                        spacing: 10,
                        runSpacing: 10,
                        alignment: WrapAlignment.spaceBetween,
                        children: <Widget>[
                          OutlinedButton.icon(
                            key: const Key('exam_prev_btn'),
                            onPressed: controller.safeIndex > 0
                                ? controller.previousQuestion
                                : null,
                            icon: const Icon(Icons.arrow_back_rounded, size: 18),
                            label: Text(AppStrings.tr('পূর্ববর্তী', 'Previous', lang)),
                          ),
                          if (controller.safeIndex <
                              controller.questions.length - 1)
                            ElevatedButton.icon(
                              key: const Key('exam_next_btn'),
                              onPressed: controller.nextQuestion,
                              style: ElevatedButton.styleFrom(
                                backgroundColor: PorhiTheme.indigo600,
                                foregroundColor: Colors.white,
                              ),
                              icon: const Icon(Icons.arrow_forward_rounded, size: 18),
                              label: Text(AppStrings.tr('পরবর্তী', 'Next', lang)),
                            ),
                          ElevatedButton.icon(
                            key: const Key('exam_submit_btn'),
                            onPressed: submitting
                                ? null
                                : () => _confirmSubmit(context, lang),
                            style: ElevatedButton.styleFrom(
                              backgroundColor: PorhiTheme.emerald600,
                              foregroundColor: Colors.white,
                            ),
                            icon: submitting
                                ? const SizedBox(
                                    width: 16,
                                    height: 16,
                                    child: CircularProgressIndicator(
                                      strokeWidth: 2,
                                      color: Colors.white,
                                    ),
                                  )
                                : const Icon(Icons.check_circle_outline, size: 18),
                            label: Text(
                              submitting
                                  ? AppStrings.tr('জমা হচ্ছে...', 'Submitting...', lang)
                                  : AppStrings.tr('জমা দিন', 'Submit Exam', lang),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
        ),
      );
    });
  }
}

class _RunnerProgressHeader extends StatelessWidget {
  final int currentIndex;
  final int totalQuestions;
  final int answeredCount;
  final bool isOffline;
  final AppLanguage lang;

  const _RunnerProgressHeader({
    required this.currentIndex,
    required this.totalQuestions,
    required this.answeredCount,
    required this.isOffline,
    required this.lang,
  });

  @override
  Widget build(BuildContext context) {
    final progress =
        totalQuestions > 0 ? (currentIndex + 1) / totalQuestions : 0.0;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: <Widget>[
        Wrap(
          spacing: 8,
          runSpacing: 6,
          alignment: WrapAlignment.spaceBetween,
          crossAxisAlignment: WrapCrossAlignment.center,
          children: <Widget>[
            Text(
              AppStrings.tr(
                'প্রশ্ন ${AppStrings.formatNumber(currentIndex + 1, lang)} / ${AppStrings.formatNumber(totalQuestions, lang)}',
                'Question ${currentIndex + 1} / $totalQuestions',
                lang,
              ),
              style: const TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.w800,
                color: PorhiTheme.slate700,
              ),
            ),
            Wrap(
              spacing: 8,
              runSpacing: 4,
              children: <Widget>[
                Text(
                  AppStrings.tr(
                    'উত্তরিত: ${AppStrings.formatNumber(answeredCount, lang)}',
                    'Answered: $answeredCount',
                    lang,
                  ),
                  style: const TextStyle(
                    fontSize: 12.5,
                    fontWeight: FontWeight.w700,
                    color: PorhiTheme.emerald600,
                  ),
                ),
                if (isOffline)
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 8,
                      vertical: 2,
                    ),
                    decoration: BoxDecoration(
                      color: const Color(0xFFFEF3C7),
                      borderRadius: BorderRadius.circular(999),
                    ),
                    child: Text(
                      AppStrings.t('common.offline', lang),
                      style: const TextStyle(
                        fontSize: 10.5,
                        fontWeight: FontWeight.w700,
                        color: Color(0xFF92400E),
                      ),
                    ),
                  ),
              ],
            ),
          ],
        ),
        const SizedBox(height: 6),
        ClipRRect(
          borderRadius: BorderRadius.circular(999),
          child: LinearProgressIndicator(
            value: progress,
            minHeight: 6,
            backgroundColor: PorhiTheme.slate200,
            valueColor: const AlwaysStoppedAnimation<Color>(PorhiTheme.indigo600),
          ),
        ),
      ],
    );
  }
}

class _ExamQuestionCard extends StatelessWidget {
  final ExamRunnerController controller;
  final ExamQuestionEntity question;
  final int questionNumber;
  final AppLanguage lang;

  const _ExamQuestionCard({
    required this.controller,
    required this.question,
    required this.questionNumber,
    required this.lang,
  });

  @override
  Widget build(BuildContext context) {
    final letters = lang == AppLanguage.bn
        ? const <String>['ক', 'খ', 'গ', 'ঘ']
        : const <String>['A', 'B', 'C', 'D'];

    return Obx(() {
      final selectedOptionId = controller.answers[question.id];
      final isFlagged = controller.flaggedQuestionIds.contains(question.id);

      return Card(
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: <Widget>[
              Wrap(
                spacing: 8,
                runSpacing: 6,
                alignment: WrapAlignment.spaceBetween,
                crossAxisAlignment: WrapCrossAlignment.center,
                children: <Widget>[
                  Text(
                    '${AppStrings.tr('প্রশ্ন', 'Q', lang)} ${AppStrings.formatNumber(questionNumber, lang)}',
                    style: const TextStyle(
                      fontSize: 12.5,
                      fontWeight: FontWeight.w800,
                      color: PorhiTheme.indigo600,
                    ),
                  ),
                  Wrap(
                    spacing: 8,
                    runSpacing: 6,
                    children: <Widget>[
                      if (selectedOptionId != null && selectedOptionId.isNotEmpty)
                        TextButton(
                          key: const Key('exam_clear_selection_btn'),
                          onPressed: () =>
                              controller.clearSelection(question.id),
                          style: TextButton.styleFrom(
                            padding: const EdgeInsets.symmetric(
                              horizontal: 8,
                              vertical: 4,
                            ),
                            minimumSize: Size.zero,
                            tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                          ),
                          child: Text(
                            AppStrings.tr('উত্তর মুছো', 'Clear', lang),
                            style: const TextStyle(fontSize: 12),
                          ),
                        ),
                      InkWell(
                        key: const Key('exam_flag_btn'),
                        onTap: () => controller.toggleFlag(question.id),
                        borderRadius: BorderRadius.circular(8),
                        child: Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 10,
                            vertical: 5,
                          ),
                          decoration: BoxDecoration(
                            color: isFlagged
                                ? const Color(0xFFFEF3C7)
                                : PorhiTheme.slate100,
                            borderRadius: BorderRadius.circular(8),
                            border: Border.all(
                              color: isFlagged
                                  ? const Color(0xFFF59E0B)
                                  : PorhiTheme.slate200,
                            ),
                          ),
                          child: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: <Widget>[
                              Icon(
                                isFlagged
                                    ? Icons.flag_rounded
                                    : Icons.outlined_flag_rounded,
                                size: 15,
                                color: isFlagged
                                    ? const Color(0xFFB45309)
                                    : PorhiTheme.slate600,
                              ),
                              const SizedBox(width: 4),
                              Text(
                                isFlagged
                                    ? AppStrings.tr('ফ্ল্যাগড', 'Flagged', lang)
                                    : AppStrings.tr('রিভিউ ফ্ল্যাগ', 'Flag', lang),
                                style: TextStyle(
                                  fontSize: 11.5,
                                  fontWeight: FontWeight.w700,
                                  color: isFlagged
                                      ? const Color(0xFFB45309)
                                      : PorhiTheme.slate700,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
              const SizedBox(height: 12),
              RichContentView(
                content: question.stem,
                envConfig: controller.envConfig,
                baseStyle: const TextStyle(
                  fontSize: 15,
                  fontWeight: FontWeight.w600,
                  height: 1.5,
                  color: PorhiTheme.slate900,
                ),
              ),
              const SizedBox(height: 14),
              ...List<Widget>.generate(question.options.length, (idx) {
                final opt = question.options[idx];
                final letter = idx < letters.length
                    ? letters[idx]
                    : AppStrings.formatNumber(idx + 1, lang);
                final isSelected = selectedOptionId == opt.id;

                return Padding(
                  padding: const EdgeInsets.only(bottom: 10),
                  child: InkWell(
                    key: Key('exam_option_${opt.id}'),
                    onTap: () => controller.selectOption(question.id, opt.id),
                    borderRadius: BorderRadius.circular(12),
                    child: Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 12,
                        vertical: 12,
                      ),
                      decoration: BoxDecoration(
                        color:
                            isSelected ? PorhiTheme.indigo50 : PorhiTheme.slate50,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(
                          color: isSelected
                              ? PorhiTheme.indigo600
                              : PorhiTheme.slate200,
                          width: isSelected ? 1.6 : 1.0,
                        ),
                      ),
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: <Widget>[
                          Container(
                            width: 26,
                            height: 26,
                            alignment: Alignment.center,
                            decoration: BoxDecoration(
                              color: isSelected
                                  ? PorhiTheme.indigo600
                                  : Colors.white,
                              shape: BoxShape.circle,
                              border: Border.all(
                                color: isSelected
                                    ? PorhiTheme.indigo600
                                    : PorhiTheme.slate400,
                              ),
                            ),
                            child: Text(
                              letter,
                              style: TextStyle(
                                fontSize: 12,
                                fontWeight: FontWeight.w800,
                                color: isSelected
                                    ? Colors.white
                                    : PorhiTheme.slate700,
                              ),
                            ),
                          ),
                          const SizedBox(width: 10),
                          Expanded(
                            child: RichContentView(
                              content: opt.text,
                              envConfig: controller.envConfig,
                              baseStyle: const TextStyle(
                                fontSize: 14,
                                height: 1.4,
                                color: PorhiTheme.slate900,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                );
              }),
            ],
          ),
        ),
      );
    });
  }
}
