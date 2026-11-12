import 'package:flutter/material.dart';
import 'package:porhi/app/env.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/core/theme/porhi_theme.dart';
import 'package:porhi/core/widgets/rich_content/rich_content_view.dart';
import 'package:porhi/features/lesson/domain/entities/lesson_entities.dart';

class LessonQuickCheckCard extends StatelessWidget {
  final AppLanguage language;
  final QuickCheckQuestionEntity question;
  final int questionIndex;
  final int totalQuestions;
  final String? selectedOptionId;
  final QuickCheckSubmitResultEntity? submitResult;
  final bool isSubmitting;
  final ValueChanged<String> onSelectOption;
  final VoidCallback onNextQuestion;
  final EnvConfig? envConfig;

  const LessonQuickCheckCard({
    super.key,
    required this.language,
    required this.question,
    required this.questionIndex,
    required this.totalQuestions,
    required this.selectedOptionId,
    required this.submitResult,
    required this.isSubmitting,
    required this.onSelectOption,
    required this.onNextQuestion,
    this.envConfig,
  });

  @override
  Widget build(BuildContext context) {
    final isAnswered = submitResult != null;
    final letters = language == AppLanguage.bn
        ? const <String>['ক', 'খ', 'গ', 'ঘ']
        : const <String>['A', 'B', 'C', 'D'];
    final explanation = submitResult?.explanation;
    final directAnswer = explanation?['directAnswer']?.toString().trim() ?? '';
    final coreConcept = explanation?['coreConcept']?.toString().trim() ?? '';

    return Card(
      key: const Key('lesson_quick_check_card'),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(18),
        side: const BorderSide(color: Color(0xFFC7D2FE)),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: <Widget>[
            Row(
              children: <Widget>[
                Container(
                  width: 34,
                  height: 34,
                  decoration: BoxDecoration(
                    color: PorhiTheme.indigo50,
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: const Icon(
                    Icons.fact_check_outlined,
                    size: 18,
                    color: PorhiTheme.indigo600,
                  ),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      Text(
                        AppStrings.tr(
                          'পাঠের শিখন যাচাই • কুইক প্র্যাকটিস',
                          'Lesson Quick Check • MCQ Practice',
                          language,
                        ),
                        style: const TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w800,
                          color: PorhiTheme.slate900,
                        ),
                      ),
                      Text(
                        AppStrings.tr(
                          'সঠিক উত্তর নির্বাচন করে ধারণা যাচাই করো',
                          'Select the right option to test your understanding',
                          language,
                        ),
                        style: const TextStyle(
                          fontSize: 11.5,
                          color: PorhiTheme.slate600,
                        ),
                      ),
                    ],
                  ),
                ),
                if (totalQuestions > 1) ...<Widget>[
                  const SizedBox(width: 8),
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 8,
                      vertical: 4,
                    ),
                    decoration: BoxDecoration(
                      color: PorhiTheme.indigo50,
                      borderRadius: BorderRadius.circular(999),
                    ),
                    child: Text(
                      '${AppStrings.formatNumber(questionIndex + 1, language)}/${AppStrings.formatNumber(totalQuestions, language)}',
                      style: const TextStyle(
                        fontSize: 11,
                        fontWeight: FontWeight.w700,
                        color: PorhiTheme.indigo700,
                      ),
                    ),
                  ),
                ],
              ],
            ),
            const Divider(height: 22),
            RichContentView(
              content: question.stem,
              envConfig: envConfig,
              baseStyle: const TextStyle(
                fontSize: 14.5,
                fontWeight: FontWeight.w700,
                height: 1.5,
                color: PorhiTheme.slate900,
              ),
            ),
            const SizedBox(height: 12),
            for (var i = 0; i < question.options.length; i++) ...<Widget>[
              _buildOptionTile(
                option: question.options[i],
                letter: i < letters.length ? letters[i] : '${i + 1}',
                isAnswered: isAnswered,
              ),
              if (i < question.options.length - 1) const SizedBox(height: 8),
            ],
            if (isSubmitting) ...<Widget>[
              const SizedBox(height: 10),
              const LinearProgressIndicator(minHeight: 2),
            ],
            if (submitResult != null) ...<Widget>[
              const SizedBox(height: 12),
              Container(
                key: const Key('quick_check_feedback_box'),
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: submitResult!.isCorrect
                      ? PorhiTheme.emerald50
                      : const Color(0xFFFFF1F2),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(
                    color: submitResult!.isCorrect
                        ? const Color(0xFFA7F3D0)
                        : const Color(0xFFFECDD3),
                  ),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Row(
                      children: <Widget>[
                        Icon(
                          submitResult!.isCorrect
                              ? Icons.check_circle_rounded
                              : Icons.cancel_rounded,
                          size: 18,
                          color: submitResult!.isCorrect
                              ? PorhiTheme.emerald600
                              : PorhiTheme.rose600,
                        ),
                        const SizedBox(width: 8),
                        Expanded(
                          child: Text(
                            submitResult!.isCorrect
                                ? AppStrings.tr(
                                    'চমৎকার! তোমার উত্তর সঠিক হয়েছে।',
                                    'Great job! Your answer is correct.',
                                    language,
                                  )
                                : AppStrings.tr(
                                    'উত্তরটি সঠিক হয়নি। নিচের ব্যাখ্যা দেখে নাও।',
                                    'Incorrect. Review the explanation below.',
                                    language,
                                  ),
                            style: TextStyle(
                              fontSize: 13,
                              fontWeight: FontWeight.w700,
                              color: submitResult!.isCorrect
                                  ? PorhiTheme.emerald600
                                  : PorhiTheme.rose600,
                            ),
                          ),
                        ),
                      ],
                    ),
                    if (submitResult!.isQueuedOffline) ...<Widget>[
                      const SizedBox(height: 4),
                      Text(
                        AppStrings.tr(
                          'অফলাইনে সংরক্ষিত — অনলাইনে সিঙ্ক হবে।',
                          'Saved offline — will sync when online.',
                          language,
                        ),
                        style: const TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.w600,
                          color: Color(0xFF92400E),
                        ),
                      ),
                    ],
                    if (directAnswer.isNotEmpty) ...<Widget>[
                      const SizedBox(height: 8),
                      RichContentView(
                        content: directAnswer,
                        envConfig: envConfig,
                        baseStyle: const TextStyle(
                          fontSize: 13,
                          fontWeight: FontWeight.w600,
                          color: PorhiTheme.slate900,
                        ),
                      ),
                    ],
                    if (coreConcept.isNotEmpty) ...<Widget>[
                      const SizedBox(height: 6),
                      RichContentView(
                        content: coreConcept,
                        envConfig: envConfig,
                        baseStyle: const TextStyle(
                          fontSize: 12.5,
                          color: PorhiTheme.slate700,
                        ),
                      ),
                    ],
                  ],
                ),
              ),
              if (totalQuestions > 1) ...<Widget>[
                const SizedBox(height: 10),
                Align(
                  alignment: Alignment.centerRight,
                  child: OutlinedButton.icon(
                    key: const Key('quick_check_next_question_btn'),
                    onPressed: onNextQuestion,
                    icon: const Icon(Icons.refresh_rounded, size: 16),
                    label: Text(
                      AppStrings.tr(
                        'পরবর্তী কুইজ দেখো',
                        'Try Another Question',
                        language,
                      ),
                    ),
                  ),
                ),
              ],
            ],
          ],
        ),
      ),
    );
  }

  Widget _buildOptionTile({
    required QuickCheckOptionEntity option,
    required String letter,
    required bool isAnswered,
  }) {
    final isChosen = selectedOptionId == option.id;
    final correctId = submitResult?.correctOptionId;
    final isOptionCorrect =
        (correctId != null && option.id == correctId) || option.isCorrect == true;

    Color borderColor = PorhiTheme.slate200;
    Color bgColor = Colors.white;
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
      key: Key('quick_check_option_${option.id}'),
      onTap: isAnswered || isSubmitting ? null : () => onSelectOption(option.id),
      borderRadius: BorderRadius.circular(12),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
        decoration: BoxDecoration(
          color: bgColor,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: borderColor),
        ),
        child: Row(
          children: <Widget>[
            Container(
              width: 26,
              height: 26,
              alignment: Alignment.center,
              decoration: BoxDecoration(
                color: PorhiTheme.slate100,
                borderRadius: BorderRadius.circular(8),
              ),
              child: Text(
                letter,
                style: const TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.w700,
                  color: PorhiTheme.slate700,
                ),
              ),
            ),
            const SizedBox(width: 10),
            Expanded(
              child: RichContentView(
                content: option.text,
                envConfig: envConfig,
                baseStyle: const TextStyle(
                  fontSize: 13.5,
                  color: PorhiTheme.slate900,
                ),
              ),
            ),
            if (trailingIcon != null) ...<Widget>[
              const SizedBox(width: 8),
              Icon(trailingIcon, size: 18, color: trailingColor),
            ],
          ],
        ),
      ),
    );
  }
}
