import 'package:flutter/material.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/core/theme/porhi_theme.dart';
import 'package:porhi/features/exam/domain/entities/exam_entities.dart';

class QuestionNavigatorSheet extends StatelessWidget {
  final List<ExamQuestionEntity> questions;
  final int currentIndex;
  final Map<String, String?> answers;
  final Set<String> flaggedIds;
  final AppLanguage language;
  final ValueChanged<int> onSelectIndex;

  const QuestionNavigatorSheet({
    super.key,
    required this.questions,
    required this.currentIndex,
    required this.answers,
    required this.flaggedIds,
    required this.language,
    required this.onSelectIndex,
  });

  static Future<void> show(
    BuildContext context, {
    required List<ExamQuestionEntity> questions,
    required int currentIndex,
    required Map<String, String?> answers,
    required Set<String> flaggedIds,
    required AppLanguage language,
    required ValueChanged<int> onSelectIndex,
  }) {
    return showModalBottomSheet<void>(
      context: context,
      useSafeArea: true,
      isScrollControlled: true,
      backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (_) => QuestionNavigatorSheet(
        questions: questions,
        currentIndex: currentIndex,
        answers: answers,
        flaggedIds: flaggedIds,
        language: language,
        onSelectIndex: onSelectIndex,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final answeredCount = questions
        .where((q) => answers[q.id] != null && answers[q.id]!.isNotEmpty)
        .length;

    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 14, 16, 20),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: <Widget>[
          Row(
            children: <Widget>[
              Expanded(
                child: Text(
                  AppStrings.tr(
                    'প্রশ্ন নেভিগেটর (${AppStrings.formatNumber(answeredCount, language)}/${AppStrings.formatNumber(questions.length, language)})',
                    'Question Navigator ($answeredCount/${questions.length})',
                    language,
                  ),
                  style: const TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.w800,
                    color: PorhiTheme.slate900,
                  ),
                ),
              ),
              IconButton(
                onPressed: () => Navigator.of(context).pop(),
                icon: const Icon(Icons.close),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Wrap(
            spacing: 12,
            runSpacing: 6,
            children: <Widget>[
              _LegendDot(
                color: PorhiTheme.emerald600,
                label: AppStrings.tr('উত্তরিত', 'Answered', language),
              ),
              _LegendDot(
                color: const Color(0xFFD97706),
                label: AppStrings.tr('ফ্ল্যাগড', 'Flagged', language),
              ),
              _LegendDot(
                color: PorhiTheme.slate400,
                label: AppStrings.tr('বাকি', 'Unanswered', language),
              ),
            ],
          ),
          const SizedBox(height: 14),
          ConstrainedBox(
            constraints: const BoxConstraints(maxHeight: 320),
            child: SingleChildScrollView(
              child: Wrap(
                spacing: 8,
                runSpacing: 8,
                children: List<Widget>.generate(questions.length, (idx) {
                  final q = questions[idx];
                  final isCurrent = idx == currentIndex;
                  final isAnswered =
                      answers[q.id] != null && answers[q.id]!.isNotEmpty;
                  final isFlagged = flaggedIds.contains(q.id);

                  final bg = isAnswered
                      ? PorhiTheme.emerald50
                      : PorhiTheme.slate100;
                  final fg = isAnswered
                      ? PorhiTheme.emerald600
                      : PorhiTheme.slate700;
                  final border = isCurrent
                      ? PorhiTheme.indigo600
                      : (isFlagged
                          ? const Color(0xFFF59E0B)
                          : (isAnswered
                              ? PorhiTheme.emerald600
                              : PorhiTheme.slate200));

                  return InkWell(
                    key: Key('exam_palette_q_$idx'),
                    onTap: () {
                      onSelectIndex(idx);
                      Navigator.of(context).pop();
                    },
                    borderRadius: BorderRadius.circular(10),
                    child: Container(
                      width: 46,
                      height: 44,
                      decoration: BoxDecoration(
                        color: bg,
                        borderRadius: BorderRadius.circular(10),
                        border: Border.all(
                          color: border,
                          width: isCurrent ? 2 : 1.2,
                        ),
                      ),
                      child: Stack(
                        alignment: Alignment.center,
                        children: <Widget>[
                          Text(
                            AppStrings.formatNumber(idx + 1, language),
                            style: TextStyle(
                              fontSize: 13.5,
                              fontWeight: FontWeight.w800,
                              color: fg,
                            ),
                          ),
                          if (isFlagged)
                            const Positioned(
                              top: 3,
                              right: 3,
                              child: Icon(
                                Icons.flag_rounded,
                                size: 11,
                                color: Color(0xFFD97706),
                              ),
                            ),
                        ],
                      ),
                    ),
                  );
                }),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _LegendDot extends StatelessWidget {
  final Color color;
  final String label;

  const _LegendDot({required this.color, required this.label});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: <Widget>[
        Container(
          width: 10,
          height: 10,
          decoration: BoxDecoration(color: color, shape: BoxShape.circle),
        ),
        const SizedBox(width: 5),
        Text(
          label,
          style: const TextStyle(
            fontSize: 11.5,
            fontWeight: FontWeight.w600,
            color: PorhiTheme.slate600,
          ),
        ),
      ],
    );
  }
}
