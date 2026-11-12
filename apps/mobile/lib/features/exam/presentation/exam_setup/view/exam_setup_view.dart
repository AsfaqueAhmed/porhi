import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/core/theme/porhi_theme.dart';
import 'package:porhi/features/exam/domain/entities/exam_entities.dart';
import 'package:porhi/features/exam/presentation/exam_setup/controller/exam_setup_controller.dart';

class ExamSetupView extends GetView<ExamSetupController> {
  const ExamSetupView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Obx(() {
          final lang = controller.language.value;
          return Text(
            AppStrings.tr('মডেল টেস্ট সেটআপ', 'Model Test Setup', lang),
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
          );
        }),
      ),
      body: Obx(() {
        final lang = controller.language.value;
        final draft = controller.pendingDraft.value;
        final error = controller.errorMessage.value;
        final starting = controller.isStarting.value;
        final isBusy = controller.isBusy;
        final activeType = controller.testType.value;
        final topics = controller.chapterTopics;
        final hasChapterContext = controller.chapterId.value.isNotEmpty;

        return SingleChildScrollView(
          controller: controller.scrollController,
          padding: const EdgeInsets.fromLTRB(16, 14, 16, 28),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: <Widget>[
              _SetupHeaderCard(
                title: controller.displayTitle,
                isSubjectMode: controller.isSubjectMode,
                lang: lang,
              ),
              const SizedBox(height: 12),
              if (draft != null) ...<Widget>[
                _ResumeDraftBanner(
                  draft: draft,
                  lang: lang,
                  isBusy: isBusy,
                  onResume: controller.resumeDraft,
                  onDiscard: controller.discardDraft,
                ),
                const SizedBox(height: 12),
              ],
              if (error != null) ...<Widget>[
                _ErrorBanner(message: error),
                const SizedBox(height: 12),
              ],
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      _SectionLabel(
                        text: AppStrings.tr(
                          'পরীক্ষার ধরন নির্বাচন করো',
                          'Select Test Mode',
                          lang,
                        ),
                      ),
                      const SizedBox(height: 10),
                      Wrap(
                        spacing: 8,
                        runSpacing: 8,
                        children: <Widget>[
                          if (hasChapterContext) ...<Widget>[
                            _ChoicePill(
                              key: const Key('exam_type_CHAPTER_TEST'),
                              label: AppStrings.tr(
                                'অধ্যায়ভিত্তিক',
                                'Chapter Test',
                                lang,
                              ),
                              selected: activeType == ExamTestType.chapterTest,
                              onTap: () => controller
                                  .selectTestType(ExamTestType.chapterTest),
                            ),
                            _ChoicePill(
                              key: const Key('exam_type_TOPIC_TEST'),
                              label: AppStrings.tr(
                                'টপিকভিত্তিক',
                                'Topic Test',
                                lang,
                              ),
                              selected: activeType == ExamTestType.topicTest,
                              onTap: () => controller
                                  .selectTestType(ExamTestType.topicTest),
                            ),
                            _ChoicePill(
                              key: const Key('exam_type_WEAK_AREA'),
                              label: AppStrings.tr(
                                'দুর্বল টপিক',
                                'Weak Areas',
                                lang,
                              ),
                              selected: activeType == ExamTestType.weakArea,
                              onTap: () => controller
                                  .selectTestType(ExamTestType.weakArea),
                            ),
                          ],
                          _ChoicePill(
                            key: const Key('exam_type_SUBJECT_TEST'),
                            label: AppStrings.tr(
                              'পূর্ণ বিষয় টেস্ট',
                              'Subject Test',
                              lang,
                            ),
                            selected: activeType == ExamTestType.subjectTest,
                            onTap: () => controller
                                .selectTestType(ExamTestType.subjectTest),
                          ),
                        ],
                      ),
                      if (activeType == ExamTestType.topicTest) ...<Widget>[
                        const SizedBox(height: 16),
                        _SectionLabel(
                          text: AppStrings.tr(
                            'টপিক নির্বাচন করো',
                            'Select Topic',
                            lang,
                          ),
                        ),
                        const SizedBox(height: 8),
                        if (topics.isNotEmpty)
                          DropdownButtonFormField<String>(
                            key: const Key('exam_topic_dropdown'),
                            initialValue: topics.any((t) =>
                                    t.id == controller.selectedTopicId.value)
                                ? controller.selectedTopicId.value
                                : topics.first.id,
                            isExpanded: true,
                            decoration: const InputDecoration(
                              contentPadding: EdgeInsets.symmetric(
                                horizontal: 12,
                                vertical: 10,
                              ),
                            ),
                            items: topics
                                .map(
                                  (t) => DropdownMenuItem<String>(
                                    value: t.id,
                                    child: Text(
                                      t.titleBangla,
                                      maxLines: 1,
                                      overflow: TextOverflow.ellipsis,
                                    ),
                                  ),
                                )
                                .toList(),
                            onChanged: (val) {
                              if (val != null) controller.selectTopic(val);
                            },
                          )
                        else
                          Container(
                            key: const Key('exam_no_topics_note'),
                            width: double.infinity,
                            padding: const EdgeInsets.all(10),
                            decoration: BoxDecoration(
                              color: PorhiTheme.slate50,
                              borderRadius: BorderRadius.circular(10),
                              border: Border.all(color: PorhiTheme.slate200),
                            ),
                            child: Text(
                              AppStrings.tr(
                                'এই অধ্যায়ের জন্য আলাদা টপিক পাওয়া যায়নি; সম্পূর্ণ অধ্যায় থেকে প্রশ্ন নেওয়া হবে।',
                                'No topics found for this chapter; questions will be drawn from the whole chapter.',
                                lang,
                              ),
                              style: const TextStyle(
                                fontSize: 12,
                                color: PorhiTheme.slate600,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                          ),
                      ],
                      const SizedBox(height: 16),
                      _SectionLabel(
                        text: AppStrings.tr(
                          'প্রশ্নের সংখ্যা',
                          'Question Limit',
                          lang,
                        ),
                      ),
                      const SizedBox(height: 10),
                      Wrap(
                        spacing: 8,
                        runSpacing: 8,
                        children: ExamSetupController.presetQuestionLimits
                            .map(
                              (limit) => _ChoicePill(
                                key: Key('exam_limit_$limit'),
                                label:
                                    '${AppStrings.formatNumber(limit, lang)} ${AppStrings.tr('টি', 'Qs', lang)}',
                                selected: controller.questionLimit.value == limit,
                                onTap: () => controller.selectQuestionLimit(limit),
                              ),
                            )
                            .toList(),
                      ),
                      const SizedBox(height: 16),
                      _SectionLabel(
                        text: AppStrings.tr(
                          'সময়সীমা',
                          'Duration',
                          lang,
                        ),
                      ),
                      const SizedBox(height: 10),
                      Wrap(
                        spacing: 8,
                        runSpacing: 8,
                        children: <Widget>[
                          ...ExamSetupController.presetDurationMinutes.map(
                            (mins) => _ChoicePill(
                              key: Key('exam_dur_${mins}m'),
                              label:
                                  '${AppStrings.formatNumber(mins, lang)} ${AppStrings.tr('মিনিট', 'min', lang)}',
                              selected: !controller.isCustomDuration.value &&
                                  controller.durationSeconds.value == mins * 60,
                              onTap: () =>
                                  controller.selectPresetDurationMinutes(mins),
                            ),
                          ),
                          _ChoicePill(
                            key: const Key('exam_dur_custom'),
                            label: AppStrings.tr('কাস্টম', 'Custom', lang),
                            selected: controller.isCustomDuration.value,
                            onTap: controller.enableCustomDuration,
                          ),
                        ],
                      ),
                      if (controller.isCustomDuration.value) ...<Widget>[
                        const SizedBox(height: 10),
                        TextField(
                          key: const Key('exam_custom_minutes_input'),
                          controller: controller.customMinutesController,
                          keyboardType: TextInputType.number,
                          decoration: InputDecoration(
                            labelText: AppStrings.tr(
                              'মিনিট (১ থেকে ১২০)',
                              'Minutes (1 to 120)',
                              lang,
                            ),
                          ),
                        ),
                      ],
                      const SizedBox(height: 16),
                      _SectionLabel(
                        text: AppStrings.tr(
                          'নেগেটিভ মার্কিং (প্রতি ভুল উত্তরে)',
                          'Negative Marking (per wrong answer)',
                          lang,
                        ),
                      ),
                      const SizedBox(height: 10),
                      Wrap(
                        spacing: 8,
                        runSpacing: 8,
                        children: ExamSetupController.presetNegativeRatios
                            .map(
                              (ratio) => _ChoicePill(
                                key: Key('exam_neg_$ratio'),
                                label: ratio == 0.0
                                    ? AppStrings.tr('০ (নেই)', '0 (None)', lang)
                                    : '-${AppStrings.formatNumber(ratio, lang)}',
                                selected: controller.negativeRatio.value == ratio,
                                onTap: () =>
                                    controller.selectNegativeRatio(ratio),
                              ),
                            )
                            .toList(),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 18),
              SizedBox(
                height: 50,
                child: ElevatedButton.icon(
                  key: const Key('exam_start_btn'),
                  onPressed: isBusy ? null : controller.startExam,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: PorhiTheme.indigo600,
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(14),
                    ),
                  ),
                  icon: starting
                      ? const SizedBox(
                          width: 18,
                          height: 18,
                          child: CircularProgressIndicator(
                            strokeWidth: 2,
                            color: Colors.white,
                          ),
                        )
                      : const Icon(Icons.play_arrow_rounded),
                  label: Text(
                    starting
                        ? AppStrings.tr('শুরু হচ্ছে...', 'Starting...', lang)
                        : AppStrings.tr('পরীক্ষা শুরু করো', 'Start Exam', lang),
                    style: const TextStyle(
                      fontSize: 15,
                      fontWeight: FontWeight.w800,
                    ),
                  ),
                ),
              ),
            ],
          ),
        );
      }),
    );
  }
}

class _SetupHeaderCard extends StatelessWidget {
  final String title;
  final bool isSubjectMode;
  final AppLanguage lang;

  const _SetupHeaderCard({
    required this.title,
    required this.isSubjectMode,
    required this.lang,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: <Color>[PorhiTheme.indigo600, PorhiTheme.indigo700],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Row(
        children: <Widget>[
          Container(
            width: 44,
            height: 44,
            decoration: BoxDecoration(
              color: Colors.white.withAlpha(35),
              borderRadius: BorderRadius.circular(12),
            ),
            child: const Icon(
              Icons.timer_outlined,
              color: Colors.white,
              size: 24,
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Text(
                  isSubjectMode
                      ? AppStrings.tr('বিষয় মডেল টেস্ট', 'Subject Model Test', lang)
                      : AppStrings.tr('সময়বদ্ধ মডেল টেস্ট', 'Timed Model Test', lang),
                  style: const TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w600,
                    color: Colors.white70,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  title,
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w800,
                    color: Colors.white,
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

class _ResumeDraftBanner extends StatelessWidget {
  final ExamDraftEntity draft;
  final AppLanguage lang;
  final bool isBusy;
  final VoidCallback onResume;
  final VoidCallback onDiscard;

  const _ResumeDraftBanner({
    required this.draft,
    required this.lang,
    required this.isBusy,
    required this.onResume,
    required this.onDiscard,
  });

  @override
  Widget build(BuildContext context) {
    final mins = (draft.remainingSeconds / 60).ceil();
    return Container(
      key: const Key('exam_resume_banner'),
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
            children: <Widget>[
              const Icon(
                Icons.history_rounded,
                size: 18,
                color: Color(0xFFB45309),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: Text(
                  AppStrings.tr(
                    'একটি অসমাপ্ত পরীক্ষা পাওয়া গেছে',
                    'Unfinished Exam Found',
                    lang,
                  ),
                  style: const TextStyle(
                    fontSize: 13.5,
                    fontWeight: FontWeight.w800,
                    color: Color(0xFF92400E),
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 6),
          Text(
            AppStrings.tr(
              'উত্তর দেওয়া হয়েছে: ${AppStrings.formatNumber(draft.answers.values.where((v) => v != null && v.isNotEmpty).length, lang)}/${AppStrings.formatNumber(draft.questionIds.length, lang)} • বাকি সময় ~${AppStrings.formatNumber(mins, lang)} মি.',
              'Answered: ${draft.answers.values.where((v) => v != null && v.isNotEmpty).length}/${draft.questionIds.length} • Remaining ~${mins}m',
              lang,
            ),
            style: const TextStyle(
              fontSize: 12.5,
              fontWeight: FontWeight.w600,
              color: Color(0xFF78350F),
            ),
          ),
          const SizedBox(height: 10),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: <Widget>[
              ElevatedButton(
                key: const Key('exam_resume_btn'),
                onPressed: isBusy ? null : onResume,
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFFD97706),
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10),
                  ),
                ),
                child: Text(
                  AppStrings.tr(
                    'অসমাপ্ত পরীক্ষা পুনরায় শুরু করো',
                    'Resume Unfinished Exam',
                    lang,
                  ),
                ),
              ),
              OutlinedButton(
                key: const Key('exam_discard_draft_btn'),
                onPressed: isBusy ? null : onDiscard,
                style: OutlinedButton.styleFrom(
                  foregroundColor: const Color(0xFF92400E),
                  side: const BorderSide(color: Color(0xFFF59E0B)),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10),
                  ),
                ),
                child: Text(
                  AppStrings.tr(
                    'বাতিল করে নতুন শুরু করো',
                    'Discard & Start New',
                    lang,
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _ErrorBanner extends StatelessWidget {
  final String message;

  const _ErrorBanner({required this.message});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: const Color(0xFFFFF1F2),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: const Color(0xFFFECDD3)),
      ),
      child: Row(
        children: <Widget>[
          const Icon(Icons.error_outline, size: 18, color: PorhiTheme.rose600),
          const SizedBox(width: 8),
          Expanded(
            child: Text(
              message,
              style: const TextStyle(
                fontSize: 12.5,
                fontWeight: FontWeight.w600,
                color: PorhiTheme.rose600,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _SectionLabel extends StatelessWidget {
  final String text;

  const _SectionLabel({required this.text});

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      style: const TextStyle(
        fontSize: 13.5,
        fontWeight: FontWeight.w800,
        color: PorhiTheme.slate900,
      ),
    );
  }
}

class _ChoicePill extends StatelessWidget {
  final String label;
  final bool selected;
  final VoidCallback onTap;

  const _ChoicePill({
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
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        decoration: BoxDecoration(
          color: selected ? PorhiTheme.indigo600 : PorhiTheme.slate100,
          borderRadius: BorderRadius.circular(10),
          border: Border.all(
            color: selected ? PorhiTheme.indigo600 : PorhiTheme.slate200,
          ),
        ),
        child: Text(
          label,
          style: TextStyle(
            fontSize: 12.5,
            fontWeight: FontWeight.w700,
            color: selected ? Colors.white : PorhiTheme.slate700,
          ),
        ),
      ),
    );
  }
}
