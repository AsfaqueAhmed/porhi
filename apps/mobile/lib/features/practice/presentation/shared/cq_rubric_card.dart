import 'dart:async';

import 'package:flutter/material.dart';
import 'package:porhi/app/env.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/core/theme/porhi_theme.dart';
import 'package:porhi/core/widgets/rich_content/rich_content_view.dart';
import 'package:porhi/features/practice/domain/entities/practice_entities.dart';

/// Reusable Creative Question (CQ) marking rubric & 1-10 self-assessment card.
class CqRubricCard extends StatefulWidget {
  final PracticeQuestionEntity question;
  final CqSelfScoresEntity? initialScores;
  final CqSelfAssessResultEntity? submittedResult;
  final bool isSubmitting;
  final FutureOr<void> Function(CqSelfScoresEntity scores) onSubmit;
  final String languageCode;
  final EnvConfig? envConfig;
  final bool initiallyRevealed;

  const CqRubricCard({
    super.key,
    required this.question,
    this.initialScores,
    this.submittedResult,
    this.isSubmitting = false,
    required this.onSubmit,
    this.languageCode = 'bn',
    this.envConfig,
    this.initiallyRevealed = false,
  });

  @override
  State<CqRubricCard> createState() => _CqRubricCardState();
}

class _CqRubricCardState extends State<CqRubricCard> {
  late bool _isRevealed;
  late CqSelfScoresEntity _scores;

  @override
  void initState() {
    super.initState();
    _isRevealed = widget.initiallyRevealed;
    _scores = widget.initialScores ??
        widget.submittedResult?.selfScores ??
        const CqSelfScoresEntity();
  }

  @override
  void didUpdateWidget(covariant CqRubricCard oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.question.id != widget.question.id) {
      _isRevealed = widget.initiallyRevealed;
      _scores = widget.initialScores ??
          widget.submittedResult?.selfScores ??
          const CqSelfScoresEntity();
    }
  }

  void _updatePart(String part, int delta, int max) {
    setState(() {
      switch (part) {
        case 'ka':
          _scores = _scores.copyWith(ka: (_scores.ka + delta).clamp(0, max));
        case 'kha':
          _scores = _scores.copyWith(kha: (_scores.kha + delta).clamp(0, max));
        case 'ga':
          _scores = _scores.copyWith(ga: (_scores.ga + delta).clamp(0, max));
        case 'gha':
          _scores = _scores.copyWith(gha: (_scores.gha + delta).clamp(0, max));
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final lang = AppLanguage.fromCode(widget.languageCode);
    final rubric = widget.question.cqRubric;
    final exp = widget.question.explanation;
    final submitted = widget.submittedResult;
    final total = _scores.totalScore;

    return Column(
      key: const Key('cq_rubric_card'),
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: <Widget>[
        const Divider(height: 24),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          crossAxisAlignment: WrapCrossAlignment.center,
          alignment: WrapAlignment.spaceBetween,
          children: <Widget>[
            OutlinedButton.icon(
              key: const Key('cq_toggle_rubric_btn'),
              onPressed: () {
                setState(() {
                  _isRevealed = !_isRevealed;
                });
              },
              style: OutlinedButton.styleFrom(
                backgroundColor: PorhiTheme.indigo50,
                foregroundColor: PorhiTheme.indigo700,
                side: const BorderSide(color: Color(0xFFC7D2FE)),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
              icon: Icon(
                _isRevealed
                    ? Icons.keyboard_arrow_up_rounded
                    : Icons.keyboard_arrow_down_rounded,
                size: 18,
              ),
              label: Text(
                _isRevealed
                    ? AppStrings.tr(
                        'উত্তর ও মার্কিং রুব্রিক লুকাও',
                        'Hide Answer & Rubric',
                        lang,
                      )
                    : AppStrings.tr(
                        'উত্তর ও মার্কিং রুব্রিক দেখো',
                        'Show Answer & Rubric',
                        lang,
                      ),
                style: const TextStyle(
                  fontSize: 12.5,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ),
            if (submitted != null)
              Container(
                key: const Key('cq_submitted_badge'),
                padding:
                    const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                decoration: BoxDecoration(
                  color: PorhiTheme.emerald50,
                  borderRadius: BorderRadius.circular(999),
                  border: Border.all(color: const Color(0xFFA7F3D0)),
                ),
                child: Text(
                  lang == AppLanguage.bn
                      ? 'স্ব-মূল্যায়ন: ${AppStrings.formatNumber(submitted.totalScore, lang)} / ${AppStrings.formatNumber(submitted.maxScore, lang)}'
                      : 'Self Score: ${submitted.totalScore} / ${submitted.maxScore}',
                  style: const TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w700,
                    color: PorhiTheme.emerald600,
                  ),
                ),
              ),
          ],
        ),
        if (_isRevealed) ...<Widget>[
          const SizedBox(height: 12),
          Container(
            key: const Key('cq_rubric_revealed_box'),
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: PorhiTheme.slate50,
              borderRadius: BorderRadius.circular(14),
              border: Border.all(color: PorhiTheme.slate200),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: <Widget>[
                if (rubric != null && !rubric.isEmpty) ...<Widget>[
                  Text(
                    AppStrings.tr(
                      'মার্কিং রুব্রিক (ক, খ, গ, ঘ)',
                      'Marking Rubric (a, b, c, d)',
                      lang,
                    ),
                    style: const TextStyle(
                      fontSize: 13,
                      fontWeight: FontWeight.w800,
                      color: PorhiTheme.slate900,
                    ),
                  ),
                  const SizedBox(height: 8),
                  ..._buildRubricParts(rubric, lang),
                ],
                if (exp != null &&
                    (exp.directAnswer.trim().isNotEmpty ||
                        exp.stepDerivation.trim().isNotEmpty)) ...<Widget>[
                  if (rubric != null && !rubric.isEmpty)
                    const SizedBox(height: 6),
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: PorhiTheme.indigo50.withAlpha(180),
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: const Color(0xFFC7D2FE)),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: <Widget>[
                        if (exp.directAnswer.trim().isNotEmpty) ...<Widget>[
                          Text(
                            AppStrings.tr('মূল উত্তর:', 'Key Answer:', lang),
                            style: const TextStyle(
                              fontSize: 12,
                              fontWeight: FontWeight.w800,
                              color: PorhiTheme.indigo700,
                            ),
                          ),
                          const SizedBox(height: 4),
                          RichContentView(
                            content: exp.directAnswer,
                            envConfig: widget.envConfig,
                            baseStyle: const TextStyle(
                              fontSize: 13,
                              height: 1.45,
                              color: PorhiTheme.slate900,
                            ),
                          ),
                        ],
                        if (exp.stepDerivation.trim().isNotEmpty) ...<Widget>[
                          if (exp.directAnswer.trim().isNotEmpty)
                            const SizedBox(height: 10),
                          Text(
                            AppStrings.tr(
                              'বিস্তারিত সমাধান:',
                              'Step-by-step Solution:',
                              lang,
                            ),
                            style: const TextStyle(
                              fontSize: 12,
                              fontWeight: FontWeight.w800,
                              color: PorhiTheme.indigo700,
                            ),
                          ),
                          const SizedBox(height: 4),
                          RichContentView(
                            content: exp.stepDerivation,
                            envConfig: widget.envConfig,
                            baseStyle: const TextStyle(
                              fontSize: 13,
                              height: 1.5,
                              color: PorhiTheme.slate900,
                            ),
                          ),
                        ],
                      ],
                    ),
                  ),
                ],
                if ((rubric == null || rubric.isEmpty) &&
                    (exp == null ||
                        (exp.directAnswer.trim().isEmpty &&
                            exp.stepDerivation.trim().isEmpty)))
                  Text(
                    AppStrings.tr(
                      'এই প্রশ্নের জন্য অতিরিক্ত রুব্রিক তথ্য নেই। নিচে নিজে ১–১০ নম্বরের মধ্যে মূল্যায়ন করো।',
                      'No extra rubric details available. Score yourself out of 10 below.',
                      lang,
                    ),
                    style: const TextStyle(
                      fontSize: 12.5,
                      color: PorhiTheme.slate600,
                    ),
                  ),
              ],
            ),
          ),
        ],
        const SizedBox(height: 14),
        Container(
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: PorhiTheme.emerald50,
            borderRadius: BorderRadius.circular(14),
            border: Border.all(color: const Color(0xFFA7F3D0)),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: <Widget>[
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  Expanded(
                    child: Text(
                      AppStrings.tr(
                        'নিজের উত্তর যাচাই ও নম্বর দাও (১–১০)',
                        'Self-Assessment Score (1–10)',
                        lang,
                      ),
                      style: const TextStyle(
                        fontSize: 13,
                        fontWeight: FontWeight.w800,
                        color: Color(0xFF064E3B),
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  Text(
                    lang == AppLanguage.bn
                        ? 'মোট: ${AppStrings.formatNumber(total, lang)} / ১০'
                        : 'Total: $total / 10',
                    key: const Key('cq_total_score_text'),
                    style: const TextStyle(
                      fontSize: 13,
                      fontWeight: FontWeight.w800,
                      color: PorhiTheme.emerald600,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 10),
              Row(
                children: <Widget>[
                  Expanded(
                    child: _buildScoreStepper(
                      partKey: 'ka',
                      label: AppStrings.tr('ক (জ্ঞানমূলক)', 'a (Knowledge)', lang),
                      value: _scores.ka,
                      max: CqSelfScoresEntity.maxKa,
                      lang: lang,
                    ),
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: _buildScoreStepper(
                      partKey: 'kha',
                      label: AppStrings.tr(
                        'খ (অনুধাবন)',
                        'b (Comprehension)',
                        lang,
                      ),
                      value: _scores.kha,
                      max: CqSelfScoresEntity.maxKha,
                      lang: lang,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              Row(
                children: <Widget>[
                  Expanded(
                    child: _buildScoreStepper(
                      partKey: 'ga',
                      label: AppStrings.tr('গ (প্রয়োগ)', 'c (Application)', lang),
                      value: _scores.ga,
                      max: CqSelfScoresEntity.maxGa,
                      lang: lang,
                    ),
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: _buildScoreStepper(
                      partKey: 'gha',
                      label: AppStrings.tr(
                        'ঘ (উচ্চতর দক্ষতা)',
                        'd (Higher Order)',
                        lang,
                      ),
                      value: _scores.gha,
                      max: CqSelfScoresEntity.maxGha,
                      lang: lang,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              FilledButton.icon(
                key: const Key('cq_submit_btn'),
                onPressed: widget.isSubmitting
                    ? null
                    : () => widget.onSubmit(_scores),
                style: FilledButton.styleFrom(
                  backgroundColor: PorhiTheme.emerald600,
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
                icon: widget.isSubmitting
                    ? const SizedBox(
                        width: 16,
                        height: 16,
                        child: CircularProgressIndicator(
                          strokeWidth: 2,
                          color: Colors.white,
                        ),
                      )
                    : const Icon(Icons.check_circle_outline_rounded, size: 18),
                label: Text(
                  widget.isSubmitting
                      ? AppStrings.tr('সংরক্ষণ হচ্ছে...', 'Saving...', lang)
                      : AppStrings.tr(
                          'স্ব-মূল্যায়ন জমা দাও',
                          'Submit Self-Assessment',
                          lang,
                        ),
                ),
              ),
              if (submitted != null && submitted.isQueuedOffline) ...<Widget>[
                const SizedBox(height: 6),
                Text(
                  AppStrings.tr(
                    'অফলাইনে সংরক্ষিত — অনলাইনে সিঙ্ক হবে।',
                    'Saved offline — will sync when online.',
                    lang,
                  ),
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    fontSize: 11.5,
                    fontWeight: FontWeight.w600,
                    color: Color(0xFF92400E),
                  ),
                ),
              ],
            ],
          ),
        ),
      ],
    );
  }

  List<Widget> _buildRubricParts(CqRubricEntity rubric, AppLanguage lang) {
    final entries = <({String label, CqRubricPartEntity? part})>[
      (label: AppStrings.tr('ক (১)', 'a (1)', lang), part: rubric.ka),
      (label: AppStrings.tr('খ (২)', 'b (2)', lang), part: rubric.kha),
      (label: AppStrings.tr('গ (৩)', 'c (3)', lang), part: rubric.ga),
      (label: AppStrings.tr('ঘ (৪)', 'd (4)', lang), part: rubric.gha),
    ];

    final widgets = <Widget>[];
    for (final entry in entries) {
      final part = entry.part;
      if (part == null || part.isEmpty) continue;
      widgets.add(
        Container(
          margin: const EdgeInsets.only(bottom: 8),
          padding: const EdgeInsets.all(10),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(10),
            border: Border.all(color: PorhiTheme.slate200),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Text(
                '${entry.label}:',
                style: const TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.w800,
                  color: PorhiTheme.indigo700,
                ),
              ),
              const SizedBox(height: 4),
              RichContentView(
                content: part.criteria,
                envConfig: widget.envConfig,
                baseStyle: const TextStyle(
                  fontSize: 12.5,
                  height: 1.45,
                  color: PorhiTheme.slate900,
                ),
              ),
            ],
          ),
        ),
      );
    }
    return widgets;
  }

  Widget _buildScoreStepper({
    required String partKey,
    required String label,
    required int value,
    required int max,
    required AppLanguage lang,
  }) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: const Color(0xFFA7F3D0)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: <Widget>[
          Text(
            label,
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
            style: const TextStyle(
              fontSize: 11,
              fontWeight: FontWeight.w700,
              color: PorhiTheme.slate700,
            ),
          ),
          const SizedBox(height: 8),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: <Widget>[
              _StepperIconButton(
                key: Key('cq_${partKey}_dec'),
                icon: Icons.remove_rounded,
                enabled: !widget.isSubmitting && value > 0,
                onTap: () => _updatePart(partKey, -1, max),
              ),
              Text(
                '${AppStrings.formatNumber(value, lang)}/${AppStrings.formatNumber(max, lang)}',
                key: Key('cq_${partKey}_val'),
                style: const TextStyle(
                  fontSize: 13.5,
                  fontWeight: FontWeight.w800,
                  color: PorhiTheme.slate900,
                ),
              ),
              _StepperIconButton(
                key: Key('cq_${partKey}_inc'),
                icon: Icons.add_rounded,
                enabled: !widget.isSubmitting && value < max,
                onTap: () => _updatePart(partKey, 1, max),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _StepperIconButton extends StatelessWidget {
  final IconData icon;
  final bool enabled;
  final VoidCallback onTap;

  const _StepperIconButton({
    super.key,
    required this.icon,
    required this.enabled,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: enabled ? onTap : null,
      borderRadius: BorderRadius.circular(8),
      child: Container(
        width: 28,
        height: 28,
        decoration: BoxDecoration(
          color: enabled ? PorhiTheme.emerald50 : PorhiTheme.slate100,
          borderRadius: BorderRadius.circular(8),
          border: Border.all(
            color: enabled ? const Color(0xFFA7F3D0) : PorhiTheme.slate200,
          ),
        ),
        child: Icon(
          icon,
          size: 16,
          color: enabled ? PorhiTheme.emerald600 : PorhiTheme.slate400,
        ),
      ),
    );
  }
}
