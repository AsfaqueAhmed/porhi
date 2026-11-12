import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:porhi/app/env.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/core/i18n/bangla_digits.dart';
import 'package:porhi/core/theme/porhi_theme.dart';
import 'package:porhi/core/widgets/rich_content/rich_content_view.dart';
import 'package:porhi/features/curriculum/domain/entities/curriculum_entities.dart';
import 'package:porhi/features/exam/domain/entities/exam_entities.dart';
import 'package:porhi/features/rehearsal/domain/entities/rehearsal_entities.dart';
import 'package:porhi/features/rehearsal/domain/usecases/rehearsal_usecases.dart';
import 'package:porhi/features/rehearsal/presentation/rehearsal/controller/rehearsal_controller.dart';

class RehearsalView extends GetView<RehearsalController> {
  const RehearsalView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Obx(() {
          final lang = controller.language.value;
          return Text(
            AppStrings.tr(
              'বহু-পত্র মডেল রিহার্সাল',
              'Multi-Subject Exam Rehearsal',
              lang,
            ),
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
          );
        }),
        actions: <Widget>[
          Obx(() {
            final current = controller.rehearsal.value;
            final lang = controller.language.value;
            if (current == null) return const SizedBox.shrink();
            return TextButton(
              key: const Key('rehearsal_appbar_reset_btn'),
              onPressed: controller.isBusy ? null : controller.resetToSetup,
              child: Text(
                AppStrings.tr('নতুন', 'New', lang),
                style: const TextStyle(fontWeight: FontWeight.w700),
              ),
            );
          }),
        ],
      ),
      body: Obx(() {
        final lang = controller.language.value;
        final current = controller.rehearsal.value;
        final session = controller.activeSession.value;
        final error = controller.errorMessage.value;
        final loading = controller.isLoading.value;

        if (loading && current == null && controller.subjects.isEmpty) {
          return const Center(child: CircularProgressIndicator());
        }

        return SingleChildScrollView(
          controller: controller.scrollController,
          padding: const EdgeInsets.fromLTRB(16, 14, 16, 28),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: <Widget>[
              if (error != null) ...<Widget>[
                _RehearsalErrorBanner(message: error),
                const SizedBox(height: 12),
              ],
              if (current == null)
                _SetupAndHistoryStage(controller: controller, lang: lang)
              else if (current.status == MultiRehearsalStatus.inProgress &&
                  session != null)
                _ActivePaperRunnerStage(
                  controller: controller,
                  rehearsal: current,
                  session: session,
                  lang: lang,
                )
              else if (current.status == MultiRehearsalStatus.inProgress &&
                  session == null)
                _MissingSessionRecoveryStage(
                  controller: controller,
                  rehearsal: current,
                  lang: lang,
                )
              else if (current.status == MultiRehearsalStatus.intermission)
                _IntermissionStage(
                  controller: controller,
                  rehearsal: current,
                  lang: lang,
                )
              else if (current.status == MultiRehearsalStatus.completed)
                _FinalSummaryStage(
                  controller: controller,
                  rehearsal: current,
                  lang: lang,
                ),
            ],
          ),
        );
      }),
    );
  }
}

class _SetupAndHistoryStage extends StatelessWidget {
  final RehearsalController controller;
  final AppLanguage lang;

  const _SetupAndHistoryStage({
    required this.controller,
    required this.lang,
  });

  @override
  Widget build(BuildContext context) {
    final subjects = controller.subjects;
    final papers = controller.papers;
    final history = controller.history;
    final isStarting = controller.isStarting.value;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: <Widget>[
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            gradient: const LinearGradient(
              colors: <Color>[PorhiTheme.indigo600, PorhiTheme.indigo700],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
            borderRadius: BorderRadius.circular(16),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Text(
                AppStrings.tr(
                  'ধারাবাহিক বহু-পত্র পরীক্ষা অনুশীলন',
                  'Sequential Multi-Paper Exam Simulation',
                  lang,
                ),
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w800,
                  color: Colors.white,
                ),
              ),
              const SizedBox(height: 6),
              Text(
                AppStrings.tr(
                  '২ থেকে ৫টি পত্র নির্বাচন করো। প্রতিটি পত্রের জন্য স্বতন্ত্র সময়সীমা ও বিরতি শেষে সম্মিলিত ফলাফল পাবে।',
                  'Pick 2 to 5 papers with separate timers, intermission breaks, and a combined score report.',
                  lang,
                ),
                style: const TextStyle(
                  fontSize: 12.5,
                  color: Colors.white70,
                  height: 1.4,
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 14),
        if (subjects.isNotEmpty) ...<Widget>[
          Text(
            AppStrings.tr('দ্রুত প্রিসেট টেমপ্লেট', 'Quick Presets', lang),
            style: const TextStyle(
              fontSize: 13.5,
              fontWeight: FontWeight.w800,
              color: PorhiTheme.slate900,
            ),
          ),
          const SizedBox(height: 8),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: RehearsalController.presetTemplates.map((preset) {
              return ActionChip(
                key: Key('rehearsal_preset_${preset.id}'),
                avatar: const Icon(
                  Icons.bolt_rounded,
                  size: 16,
                  color: PorhiTheme.indigo600,
                ),
                label: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Text(
                      lang == AppLanguage.en
                          ? preset.titleEnglish
                          : preset.titleBangla,
                      style: const TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w800,
                        color: PorhiTheme.slate900,
                      ),
                    ),
                    Text(
                      lang == AppLanguage.en
                          ? preset.subtitleEnglish
                          : preset.subtitleBangla,
                      style: const TextStyle(
                        fontSize: 10.5,
                        color: PorhiTheme.slate600,
                      ),
                    ),
                  ],
                ),
                backgroundColor: PorhiTheme.indigo50,
                side: const BorderSide(color: Color(0xFFC7D2FE)),
                onPressed: isStarting
                    ? null
                    : () => controller.applyPreset(preset.id),
              );
            }).toList(),
          ),
          const SizedBox(height: 14),
        ],
        Card(
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: <Widget>[
                Text(
                  AppStrings.tr('রিহার্সালের শিরোনাম', 'Rehearsal Title', lang),
                  style: const TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.w800,
                    color: PorhiTheme.slate900,
                  ),
                ),
                const SizedBox(height: 8),
                TextField(
                  key: const Key('rehearsal_title_input'),
                  controller: controller.titleController,
                  decoration: InputDecoration(
                    hintText: AppStrings.tr(
                      'যেমন: SSC বিজ্ঞান ডাবল পেপার',
                      'e.g. SSC Science Double Paper',
                      lang,
                    ),
                  ),
                ),
                const SizedBox(height: 16),
                Text(
                  AppStrings.tr(
                    'নেগেটিভ মার্কিং',
                    'Negative Marking',
                    lang,
                  ),
                  style: const TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.w800,
                    color: PorhiTheme.slate900,
                  ),
                ),
                const SizedBox(height: 8),
                Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: RehearsalController.presetNegativeRatios.map((r) {
                    final selected = controller.negativeRatio.value == r;
                    return ChoiceChip(
                      key: Key('rehearsal_neg_$r'),
                      label: Text(
                        r == 0.0
                            ? AppStrings.tr('০ (নেই)', '0 (None)', lang)
                            : '-${AppStrings.formatNumber(r, lang)}',
                      ),
                      selected: selected,
                      selectedColor: PorhiTheme.indigo600,
                      labelStyle: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w700,
                        color: selected ? Colors.white : PorhiTheme.slate700,
                      ),
                      onSelected: (_) => controller.selectNegativeRatio(r),
                    );
                  }).toList(),
                ),
                const SizedBox(height: 16),
                Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  alignment: WrapAlignment.spaceBetween,
                  crossAxisAlignment: WrapCrossAlignment.center,
                  children: <Widget>[
                    Text(
                      AppStrings.tr(
                        'পত্র তালিকা (${AppStrings.formatNumber(papers.length, lang)}/৫)',
                        'Papers (${papers.length}/5)',
                        lang,
                      ),
                      style: const TextStyle(
                        fontSize: 13,
                        fontWeight: FontWeight.w800,
                        color: PorhiTheme.slate900,
                      ),
                    ),
                    OutlinedButton.icon(
                      key: const Key('rehearsal_add_paper_btn'),
                      onPressed:
                          papers.length >= StartRehearsalUseCase.maxPapers ||
                                  subjects.isEmpty
                              ? null
                              : controller.addPaper,
                      icon: const Icon(Icons.add_rounded, size: 16),
                      label: Text(
                        AppStrings.tr('পত্র যোগ করো', 'Add Paper', lang),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 10),
                if (subjects.isEmpty)
                  Padding(
                    padding: const EdgeInsets.symmetric(vertical: 12),
                    child: Column(
                      children: <Widget>[
                        Text(
                          AppStrings.tr(
                            'বিষয় পাওয়া যায়নি। আবার লোড করো।',
                            'No subjects found. Retry loading.',
                            lang,
                          ),
                          style: const TextStyle(color: PorhiTheme.slate600),
                        ),
                        const SizedBox(height: 8),
                        OutlinedButton(
                          onPressed: controller.loadInitialData,
                          child: Text(AppStrings.t('action.retry', lang)),
                        ),
                      ],
                    ),
                  )
                else
                  for (var i = 0; i < papers.length; i++)
                    Padding(
                      padding: const EdgeInsets.only(bottom: 10),
                      child: _PaperConfigCard(
                        key: ValueKey<int>(papers[i].localId),
                        index: i,
                        paper: papers[i],
                        subjects: subjects,
                        canRemove:
                            papers.length > StartRehearsalUseCase.minPapers,
                        lang: lang,
                        onSubjectChanged: (subId) =>
                            controller.updatePaperSubject(i, subId),
                        onQuestionCountChanged: (val) =>
                            controller.updatePaperQuestionCount(i, val),
                        onDurationChanged: (val) =>
                            controller.updatePaperDurationMinutes(i, val),
                        onRemove: () => controller.removePaper(i),
                      ),
                    ),
                const SizedBox(height: 12),
                SizedBox(
                  height: 48,
                  child: ElevatedButton.icon(
                    key: const Key('rehearsal_start_btn'),
                    onPressed: isStarting || papers.length < 2
                        ? null
                        : controller.startRehearsal,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: PorhiTheme.indigo600,
                      foregroundColor: Colors.white,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(14),
                      ),
                    ),
                    icon: isStarting
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
                      isStarting
                          ? AppStrings.tr('শুরু হচ্ছে...', 'Starting...', lang)
                          : AppStrings.tr(
                              'রিহার্সাল শুরু করো',
                              'Start Rehearsal',
                              lang,
                            ),
                      style: const TextStyle(
                        fontSize: 15,
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
        if (history.isNotEmpty) ...<Widget>[
          const SizedBox(height: 18),
          Text(
            AppStrings.tr('সাম্প্রতিক রিহার্সাল', 'Recent Rehearsals', lang),
            style: const TextStyle(
              fontSize: 15,
              fontWeight: FontWeight.w800,
              color: PorhiTheme.slate900,
            ),
          ),
          const SizedBox(height: 8),
          for (final item in history)
            Card(
              margin: const EdgeInsets.only(bottom: 8),
              child: ListTile(
                key: Key('rehearsal_history_${item.id}'),
                onTap: controller.isBusy
                    ? null
                    : () => controller.resumeOrViewRehearsal(item.id),
                title: Text(
                  item.titleBangla,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                    fontSize: 13.5,
                    fontWeight: FontWeight.w700,
                  ),
                ),
                subtitle: Text(
                  AppStrings.tr(
                    '${AppStrings.formatNumber(item.papers.length, lang)}টি পত্র',
                    '${item.papers.length} papers',
                    lang,
                  ),
                  style: const TextStyle(fontSize: 12),
                ),
                trailing: _StatusBadge(item: item, lang: lang),
              ),
            ),
        ],
      ],
    );
  }
}

class _PaperConfigCard extends StatefulWidget {
  final int index;
  final RehearsalPaperDraft paper;
  final List<SubjectEntity> subjects;
  final bool canRemove;
  final AppLanguage lang;
  final ValueChanged<String> onSubjectChanged;
  final ValueChanged<String> onQuestionCountChanged;
  final ValueChanged<String> onDurationChanged;
  final VoidCallback onRemove;

  const _PaperConfigCard({
    super.key,
    required this.index,
    required this.paper,
    required this.subjects,
    required this.canRemove,
    required this.lang,
    required this.onSubjectChanged,
    required this.onQuestionCountChanged,
    required this.onDurationChanged,
    required this.onRemove,
  });

  @override
  State<_PaperConfigCard> createState() => _PaperConfigCardState();
}

class _PaperConfigCardState extends State<_PaperConfigCard> {
  late final TextEditingController _questionController;
  late final TextEditingController _durationController;

  @override
  void initState() {
    super.initState();
    _questionController =
        TextEditingController(text: '${widget.paper.questionCount}');
    _durationController =
        TextEditingController(text: '${widget.paper.durationMinutes}');
  }

  int? _parseCurrentInt(String raw) {
    final normalized = toAsciiDigits(raw).trim();
    if (normalized.isEmpty) return null;
    return int.tryParse(normalized);
  }

  @override
  void didUpdateWidget(covariant _PaperConfigCard oldWidget) {
    super.didUpdateWidget(oldWidget);
    final localIdChanged = oldWidget.paper.localId != widget.paper.localId;
    if (localIdChanged ||
        (widget.paper.hasValidQuestionCount &&
            _parseCurrentInt(_questionController.text) !=
                widget.paper.questionCount)) {
      _questionController.text = '${widget.paper.questionCount}';
    }
    if (localIdChanged ||
        (widget.paper.hasValidDuration &&
            _parseCurrentInt(_durationController.text) !=
                widget.paper.durationMinutes)) {
      _durationController.text = '${widget.paper.durationMinutes}';
    }
  }

  @override
  void dispose() {
    _questionController.dispose();
    _durationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final lang = widget.lang;
    final hasSubject =
        widget.subjects.any((s) => s.id == widget.paper.subjectId);
    final selectedId =
        hasSubject ? widget.paper.subjectId : widget.subjects.first.id;

    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: PorhiTheme.slate50,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: PorhiTheme.slate200),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: <Widget>[
          Row(
            children: <Widget>[
              Expanded(
                child: Text(
                  AppStrings.tr(
                    'পত্র ${AppStrings.formatNumber(widget.index + 1, lang)}',
                    'Paper ${widget.index + 1}',
                    lang,
                  ),
                  style: const TextStyle(
                    fontSize: 12.5,
                    fontWeight: FontWeight.w800,
                    color: PorhiTheme.indigo700,
                  ),
                ),
              ),
              if (widget.canRemove)
                IconButton(
                  key: Key('rehearsal_remove_paper_${widget.index}'),
                  visualDensity: VisualDensity.compact,
                  tooltip: AppStrings.tr('সরান', 'Remove', lang),
                  icon: const Icon(
                    Icons.delete_outline_rounded,
                    color: PorhiTheme.rose600,
                    size: 18,
                  ),
                  onPressed: widget.onRemove,
                ),
            ],
          ),
          const SizedBox(height: 6),
          DropdownButtonFormField<String>(
            key: Key('rehearsal_paper_subject_${widget.index}'),
            initialValue: selectedId,
            isExpanded: true,
            items: widget.subjects
                .map(
                  (s) => DropdownMenuItem<String>(
                    value: s.id,
                    child: Text(
                      s.nameBangla,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                )
                .toList(),
            onChanged: (val) {
              if (val != null) widget.onSubjectChanged(val);
            },
          ),
          const SizedBox(height: 8),
          Row(
            children: <Widget>[
              Expanded(
                child: TextField(
                  key: Key('rehearsal_paper_qcount_${widget.index}'),
                  controller: _questionController,
                  keyboardType: TextInputType.number,
                  onChanged: widget.onQuestionCountChanged,
                  decoration: InputDecoration(
                    labelText: AppStrings.tr('প্রশ্ন (১-৫০)', 'Qs (1-50)', lang),
                    errorText: widget.paper.hasValidQuestionCount
                        ? null
                        : AppStrings.tr('১-৫০ দিন', '1-50', lang),
                    isDense: true,
                  ),
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: TextField(
                  key: Key('rehearsal_paper_dur_${widget.index}'),
                  controller: _durationController,
                  keyboardType: TextInputType.number,
                  onChanged: widget.onDurationChanged,
                  decoration: InputDecoration(
                    labelText:
                        AppStrings.tr('মিনিট (১-১২০)', 'Min (1-120)', lang),
                    errorText: widget.paper.hasValidDuration
                        ? null
                        : AppStrings.tr('১-১২০ দিন', '1-120', lang),
                    isDense: true,
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

class _StatusBadge extends StatelessWidget {
  final MultiExamRehearsalEntity item;
  final AppLanguage lang;

  const _StatusBadge({required this.item, required this.lang});

  @override
  Widget build(BuildContext context) {
    final isDone = item.status == MultiRehearsalStatus.completed;
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
      decoration: BoxDecoration(
        color: isDone ? PorhiTheme.emerald50 : PorhiTheme.indigo50,
        borderRadius: BorderRadius.circular(999),
      ),
      child: Text(
        isDone
            ? '${AppStrings.formatNumber(item.totalScore ?? 0, lang)}/${AppStrings.formatNumber(item.totalMarks, lang)}'
            : AppStrings.tr('চলমান', 'Resume', lang),
        style: TextStyle(
          fontSize: 11.5,
          fontWeight: FontWeight.w800,
          color: isDone ? PorhiTheme.emerald600 : PorhiTheme.indigo700,
        ),
      ),
    );
  }
}

class _ActivePaperRunnerStage extends StatelessWidget {
  final RehearsalController controller;
  final MultiExamRehearsalEntity rehearsal;
  final ExamSessionStartEntity session;
  final AppLanguage lang;

  const _ActivePaperRunnerStage({
    required this.controller,
    required this.rehearsal,
    required this.session,
    required this.lang,
  });

  @override
  Widget build(BuildContext context) {
    final activePaper = rehearsal.currentPaper;
    final questions = session.questions;
    final qIdx = controller.safeQuestionIndex;
    final currentQ = controller.currentQuestion;
    final selectedOpt = currentQ != null ? controller.answers[currentQ.id] : null;
    final isSubmitting = controller.isSubmitting.value;

    const labels = <String>['ক', 'খ', 'গ', 'ঘ'];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: <Widget>[
        _ActivePaperStepper(rehearsal: rehearsal, lang: lang),
        const SizedBox(height: 10),
        Container(
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: PorhiTheme.indigo50,
            borderRadius: BorderRadius.circular(14),
            border: Border.all(color: const Color(0xFFC7D2FE)),
          ),
          child: Wrap(
            spacing: 10,
            runSpacing: 8,
            alignment: WrapAlignment.spaceBetween,
            crossAxisAlignment: WrapCrossAlignment.center,
            children: <Widget>[
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Text(
                    activePaper?.labelBangla ??
                        AppStrings.tr(
                          'পত্র ${AppStrings.formatNumber(rehearsal.currentPaperIndex + 1, lang)} / ${AppStrings.formatNumber(rehearsal.papers.length, lang)}',
                          'Paper ${rehearsal.currentPaperIndex + 1} / ${rehearsal.papers.length}',
                          lang,
                        ),
                    style: const TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w800,
                      color: PorhiTheme.indigo700,
                    ),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    AppStrings.tr(
                      'প্রশ্ন ${AppStrings.formatNumber(qIdx + 1, lang)}/${AppStrings.formatNumber(questions.length, lang)} • উত্তর: ${AppStrings.formatNumber(controller.answeredCount, lang)}',
                      'Question ${qIdx + 1}/${questions.length} • Answered: ${controller.answeredCount}',
                      lang,
                    ),
                    style: const TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w600,
                      color: PorhiTheme.slate700,
                    ),
                  ),
                ],
              ),
              Container(
                key: const Key('rehearsal_timer_badge'),
                padding:
                    const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                decoration: BoxDecoration(
                  color: controller.remainingSeconds.value <= 30
                      ? const Color(0xFFFFF1F2)
                      : Colors.white,
                  borderRadius: BorderRadius.circular(999),
                  border: Border.all(
                    color: controller.remainingSeconds.value <= 30
                        ? PorhiTheme.rose600
                        : PorhiTheme.slate200,
                  ),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: <Widget>[
                    Icon(
                      Icons.timer_outlined,
                      size: 16,
                      color: controller.remainingSeconds.value <= 30
                          ? PorhiTheme.rose600
                          : PorhiTheme.indigo600,
                    ),
                    const SizedBox(width: 6),
                    Text(
                      controller.formattedRemainingTime(lang),
                      style: TextStyle(
                        fontSize: 13,
                        fontWeight: FontWeight.w800,
                        color: controller.remainingSeconds.value <= 30
                            ? PorhiTheme.rose600
                            : PorhiTheme.slate900,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 12),
        if (currentQ != null)
          Card(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: <Widget>[
                  RichContentView(
                    content: currentQ.stem,
                    envConfig: controller.envConfig,
                    baseStyle: const TextStyle(
                      fontSize: 15,
                      fontWeight: FontWeight.w700,
                      height: 1.5,
                      color: PorhiTheme.slate900,
                    ),
                  ),
                  const SizedBox(height: 14),
                  for (var optIdx = 0;
                      optIdx < currentQ.options.length;
                      optIdx++) ...<Widget>[
                    _OptionTile(
                      key: Key('rehearsal_option_${currentQ.options[optIdx].id}'),
                      label: optIdx < labels.length
                          ? labels[optIdx]
                          : '${optIdx + 1}',
                      option: currentQ.options[optIdx],
                      selected: selectedOpt == currentQ.options[optIdx].id,
                      envConfig: controller.envConfig,
                      onTap: isSubmitting
                          ? null
                          : () => controller.selectOption(
                                currentQ.id,
                                currentQ.options[optIdx].id,
                              ),
                    ),
                    const SizedBox(height: 8),
                  ],
                  if (selectedOpt != null)
                    Align(
                      alignment: Alignment.centerRight,
                      child: TextButton(
                        key: const Key('rehearsal_clear_opt_btn'),
                        onPressed: isSubmitting
                            ? null
                            : () => controller.clearSelection(currentQ.id),
                        child: Text(
                          AppStrings.tr('উত্তর মুছো', 'Clear Selection', lang),
                        ),
                      ),
                    ),
                ],
              ),
            ),
          ),
        const SizedBox(height: 12),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          alignment: WrapAlignment.spaceBetween,
          children: <Widget>[
            OutlinedButton.icon(
              key: const Key('rehearsal_prev_q_btn'),
              onPressed: qIdx > 0 && !isSubmitting
                  ? controller.previousQuestion
                  : null,
              icon: const Icon(Icons.chevron_left_rounded),
              label: Text(AppStrings.tr('পূর্ববর্তী', 'Previous', lang)),
            ),
            OutlinedButton.icon(
              key: const Key('rehearsal_next_q_btn'),
              onPressed: qIdx < questions.length - 1 && !isSubmitting
                  ? controller.nextQuestion
                  : null,
              icon: const Icon(Icons.chevron_right_rounded),
              label: Text(AppStrings.tr('পরবর্তী', 'Next', lang)),
            ),
          ],
        ),
        const SizedBox(height: 14),
        SizedBox(
          height: 48,
          child: ElevatedButton.icon(
            key: const Key('rehearsal_submit_paper_btn'),
            onPressed: isSubmitting
                ? null
                : () => controller.submitActivePaper(),
            style: ElevatedButton.styleFrom(
              backgroundColor: PorhiTheme.emerald600,
              foregroundColor: Colors.white,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(14),
              ),
            ),
            icon: isSubmitting
                ? const SizedBox(
                    width: 18,
                    height: 18,
                    child: CircularProgressIndicator(
                      strokeWidth: 2,
                      color: Colors.white,
                    ),
                  )
                : const Icon(Icons.check_circle_outline_rounded),
            label: Text(
              isSubmitting
                  ? AppStrings.tr('জমা হচ্ছে...', 'Submitting...', lang)
                  : AppStrings.tr('এই পত্র জমা দাও', 'Submit Paper', lang),
              style: const TextStyle(
                fontSize: 15,
                fontWeight: FontWeight.w800,
              ),
            ),
          ),
        ),
      ],
    );
  }
}

class _ActivePaperStepper extends StatelessWidget {
  final MultiExamRehearsalEntity rehearsal;
  final AppLanguage lang;

  const _ActivePaperStepper({
    required this.rehearsal,
    required this.lang,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      key: const Key('rehearsal_active_stepper'),
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: PorhiTheme.slate200),
      ),
      child: Wrap(
        spacing: 6,
        runSpacing: 6,
        children: <Widget>[
          for (var i = 0; i < rehearsal.papers.length; i++)
            Builder(
              builder: (context) {
                final paper = rehearsal.papers[i];
                final isCompleted =
                    paper.status == RehearsalPaperStatus.submitted;
                final isCurrent = i == rehearsal.currentPaperIndex;
                final bg = isCompleted
                    ? PorhiTheme.emerald50
                    : isCurrent
                        ? PorhiTheme.indigo600
                        : PorhiTheme.slate100;
                final fg = isCompleted
                    ? PorhiTheme.emerald600
                    : isCurrent
                        ? Colors.white
                        : PorhiTheme.slate600;
                final borderColor = isCompleted
                    ? PorhiTheme.emerald600
                    : isCurrent
                        ? PorhiTheme.indigo600
                        : PorhiTheme.slate200;

                return Container(
                  key: Key('rehearsal_step_chip_$i'),
                  padding:
                      const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                  decoration: BoxDecoration(
                    color: bg,
                    borderRadius: BorderRadius.circular(999),
                    border: Border.all(color: borderColor),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: <Widget>[
                      if (isCompleted) ...<Widget>[
                        Icon(Icons.check_circle_rounded, size: 13, color: fg),
                        const SizedBox(width: 4),
                      ],
                      Text(
                        AppStrings.tr(
                          'পত্র ${AppStrings.formatNumber(i + 1, lang)}',
                          'Paper ${i + 1}',
                          lang,
                        ),
                        style: TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.w800,
                          color: fg,
                        ),
                      ),
                    ],
                  ),
                );
              },
            ),
        ],
      ),
    );
  }
}

class _MissingSessionRecoveryStage extends StatelessWidget {
  final RehearsalController controller;
  final MultiExamRehearsalEntity rehearsal;
  final AppLanguage lang;

  const _MissingSessionRecoveryStage({
    required this.controller,
    required this.rehearsal,
    required this.lang,
  });

  @override
  Widget build(BuildContext context) {
    final isBusy = controller.isStarting.value;
    final currentPaper = rehearsal.currentPaper;
    return Card(
      key: const Key('rehearsal_recovery_view'),
      child: Padding(
        padding: const EdgeInsets.all(18),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: <Widget>[
            const Icon(
              Icons.sync_problem_rounded,
              size: 40,
              color: Color(0xFFD97706),
            ),
            const SizedBox(height: 10),
            Text(
              AppStrings.tr(
                'সক্রিয় পত্রের সেশন পাওয়া যায়নি',
                'Active Paper Session Unavailable',
                lang,
              ),
              textAlign: TextAlign.center,
              style: const TextStyle(
                fontSize: 17,
                fontWeight: FontWeight.w800,
                color: PorhiTheme.slate900,
              ),
            ),
            const SizedBox(height: 6),
            Text(
              currentPaper != null
                  ? AppStrings.tr(
                      '${currentPaper.labelBangla} এখনো সম্পন্ন হয়নি। সেশনটি পুনরায় চালু বা রিলোড করো।',
                      '${currentPaper.labelBangla} is still in progress. Reload or start the paper session.',
                      lang,
                    )
                  : AppStrings.tr(
                      'চলমান রিহার্সালের সেশন রিলোড করো।',
                      'Reload or resume this in-progress rehearsal.',
                      lang,
                    ),
              textAlign: TextAlign.center,
              style: const TextStyle(
                fontSize: 13,
                color: PorhiTheme.slate600,
                height: 1.4,
              ),
            ),
            const SizedBox(height: 16),
            ElevatedButton.icon(
              key: const Key('rehearsal_recover_reload_btn'),
              onPressed: isBusy
                  ? null
                  : () => controller.resumeOrViewRehearsal(rehearsal.id),
              style: ElevatedButton.styleFrom(
                backgroundColor: PorhiTheme.indigo600,
                foregroundColor: Colors.white,
              ),
              icon: const Icon(Icons.refresh_rounded),
              label: Text(
                AppStrings.tr('সেশন রিলোড করো', 'Reload Rehearsal', lang),
              ),
            ),
            const SizedBox(height: 8),
            OutlinedButton.icon(
              key: const Key('rehearsal_recover_start_btn'),
              onPressed: isBusy ? null : controller.startNextPaper,
              icon: const Icon(Icons.play_arrow_rounded),
              label: Text(
                AppStrings.tr('পত্র শুরু করো', 'Start Current Paper', lang),
              ),
            ),
            const SizedBox(height: 8),
            TextButton(
              onPressed: controller.resetToSetup,
              child: Text(
                AppStrings.tr('নতুন রিহার্সালে ফিরে যাও', 'Back to Setup', lang),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _OptionTile extends StatelessWidget {
  final String label;
  final ExamOptionEntity option;
  final bool selected;
  final EnvConfig? envConfig;
  final VoidCallback? onTap;

  const _OptionTile({
    super.key,
    required this.label,
    required this.option,
    required this.selected,
    required this.envConfig,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(12),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
        decoration: BoxDecoration(
          color: selected ? PorhiTheme.indigo50 : PorhiTheme.slate50,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: selected ? PorhiTheme.indigo600 : PorhiTheme.slate200,
            width: selected ? 1.5 : 1,
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
                color: selected ? PorhiTheme.indigo600 : Colors.white,
                shape: BoxShape.circle,
                border: Border.all(
                  color: selected ? PorhiTheme.indigo600 : PorhiTheme.slate200,
                ),
              ),
              child: Text(
                label,
                style: TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.w800,
                  color: selected ? Colors.white : PorhiTheme.slate700,
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
                  height: 1.45,
                  color: PorhiTheme.slate900,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _IntermissionStage extends StatelessWidget {
  final RehearsalController controller;
  final MultiExamRehearsalEntity rehearsal;
  final AppLanguage lang;

  const _IntermissionStage({
    required this.controller,
    required this.rehearsal,
    required this.lang,
  });

  @override
  Widget build(BuildContext context) {
    final completedPaper = rehearsal.lastSubmittedPaper;
    final nextPaper = rehearsal.currentPaper;
    final isStarting = controller.isStarting.value;

    return Card(
      key: const Key('rehearsal_intermission_view'),
      child: Padding(
        padding: const EdgeInsets.all(18),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: <Widget>[
            const Icon(
              Icons.coffee_rounded,
              size: 40,
              color: Color(0xFFD97706),
            ),
            const SizedBox(height: 10),
            Text(
              AppStrings.tr(
                'বিরতি ও পরবর্তী পত্রের প্রস্তুতি',
                'Intermission & Next Paper Ready',
                lang,
              ),
              textAlign: TextAlign.center,
              style: const TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.w800,
                color: PorhiTheme.slate900,
              ),
            ),
            if (completedPaper != null) ...<Widget>[
              const SizedBox(height: 12),
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
                      completedPaper.labelBangla,
                      style: const TextStyle(
                        fontSize: 13.5,
                        fontWeight: FontWeight.w800,
                        color: PorhiTheme.slate900,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      AppStrings.tr(
                        'স্কোর: ${AppStrings.formatNumber(completedPaper.score ?? 0, lang)} / ${AppStrings.formatNumber(completedPaper.effectiveTotalMarks, lang)} • সঠিক: ${AppStrings.formatNumber(completedPaper.correctCount ?? 0, lang)} • ভুল: ${AppStrings.formatNumber(completedPaper.wrongCount ?? 0, lang)}',
                        'Score: ${completedPaper.score ?? 0} / ${completedPaper.effectiveTotalMarks} • Correct: ${completedPaper.correctCount ?? 0} • Wrong: ${completedPaper.wrongCount ?? 0}',
                        lang,
                      ),
                      style: const TextStyle(
                        fontSize: 12.5,
                        fontWeight: FontWeight.w600,
                        color: PorhiTheme.emerald600,
                      ),
                    ),
                  ],
                ),
              ),
            ],
            const SizedBox(height: 14),
            for (final p in rehearsal.papers)
              Container(
                margin: const EdgeInsets.only(bottom: 8),
                padding:
                    const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                decoration: BoxDecoration(
                  color: PorhiTheme.slate50,
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(color: PorhiTheme.slate200),
                ),
                child: Wrap(
                  spacing: 8,
                  runSpacing: 4,
                  alignment: WrapAlignment.spaceBetween,
                  children: <Widget>[
                    Text(
                      p.labelBangla,
                      style: const TextStyle(
                        fontSize: 12.5,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    Text(
                      p.status == RehearsalPaperStatus.submitted
                          ? '${AppStrings.formatNumber(p.score ?? 0, lang)}/${AppStrings.formatNumber(p.effectiveTotalMarks, lang)}'
                          : AppStrings.tr(
                              'অপেক্ষমাণ (${AppStrings.formatNumber(p.durationMinutes, lang)} মি.)',
                              'Pending (${p.durationMinutes}m)',
                              lang,
                            ),
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w800,
                        color: p.status == RehearsalPaperStatus.submitted
                            ? PorhiTheme.emerald600
                            : PorhiTheme.indigo700,
                      ),
                    ),
                  ],
                ),
              ),
            const SizedBox(height: 12),
            SizedBox(
              height: 48,
              child: ElevatedButton.icon(
                key: const Key('rehearsal_start_next_paper_btn'),
                onPressed: isStarting ? null : controller.startNextPaper,
                style: ElevatedButton.styleFrom(
                  backgroundColor: PorhiTheme.indigo600,
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(14),
                  ),
                ),
                icon: isStarting
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
                  nextPaper != null
                      ? AppStrings.tr(
                          'পরবর্তী পত্র শুরু করো (${nextPaper.labelBangla})',
                          'Start Next Paper (${nextPaper.labelBangla})',
                          lang,
                        )
                      : AppStrings.tr(
                          'পরবর্তী পত্র শুরু করো',
                          'Start Next Paper',
                          lang,
                        ),
                  overflow: TextOverflow.ellipsis,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _FinalSummaryStage extends StatelessWidget {
  final RehearsalController controller;
  final MultiExamRehearsalEntity rehearsal;
  final AppLanguage lang;

  const _FinalSummaryStage({
    required this.controller,
    required this.rehearsal,
    required this.lang,
  });

  @override
  Widget build(BuildContext context) {
    final totalScore = rehearsal.totalScore ?? 0;
    final accuracy = rehearsal.accuracyPercent;

    return Column(
      key: const Key('rehearsal_summary_view'),
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: <Widget>[
        Container(
          padding: const EdgeInsets.all(18),
          decoration: BoxDecoration(
            color: PorhiTheme.emerald50,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: const Color(0xFFA7F3D0)),
          ),
          child: Column(
            children: <Widget>[
              const Icon(
                Icons.emoji_events_rounded,
                size: 40,
                color: PorhiTheme.emerald600,
              ),
              const SizedBox(height: 8),
              Text(
                AppStrings.tr(
                  'সম্মিলিত রিহার্সাল ফলাফল',
                  'Combined Rehearsal Result',
                  lang,
                ),
                textAlign: TextAlign.center,
                style: const TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w800,
                  color: PorhiTheme.slate900,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                rehearsal.titleBangla,
                textAlign: TextAlign.center,
                style: const TextStyle(
                  fontSize: 13,
                  color: PorhiTheme.slate700,
                ),
              ),
              const SizedBox(height: 12),
              Wrap(
                spacing: 12,
                runSpacing: 8,
                alignment: WrapAlignment.center,
                children: <Widget>[
                  _MetricChip(
                    label: AppStrings.tr('মোট স্কোর', 'Total Score', lang),
                    value:
                        '${AppStrings.formatNumber(totalScore, lang)} / ${AppStrings.formatNumber(rehearsal.totalMarks, lang)}',
                  ),
                  _MetricChip(
                    label: AppStrings.tr('নির্ভুলতা', 'Accuracy', lang),
                    value: '${AppStrings.formatNumber(accuracy, lang)}%',
                  ),
                ],
              ),
            ],
          ),
        ),
        const SizedBox(height: 14),
        for (final paper in rehearsal.papers)
          Card(
            margin: const EdgeInsets.only(bottom: 10),
            child: Padding(
              padding: const EdgeInsets.all(14),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Wrap(
                    spacing: 8,
                    runSpacing: 4,
                    alignment: WrapAlignment.spaceBetween,
                    children: <Widget>[
                      Text(
                        paper.labelBangla,
                        style: const TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w800,
                          color: PorhiTheme.slate900,
                        ),
                      ),
                      Text(
                        '${AppStrings.formatNumber(paper.score ?? 0, lang)} / ${AppStrings.formatNumber(paper.effectiveTotalMarks, lang)}',
                        style: const TextStyle(
                          fontSize: 13.5,
                          fontWeight: FontWeight.w800,
                          color: PorhiTheme.emerald600,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  Wrap(
                    spacing: 10,
                    runSpacing: 6,
                    children: <Widget>[
                      Text(
                        AppStrings.tr(
                          'সঠিক: ${AppStrings.formatNumber(paper.correctCount ?? 0, lang)}',
                          'Correct: ${paper.correctCount ?? 0}',
                          lang,
                        ),
                        style: const TextStyle(
                          fontSize: 12,
                          color: PorhiTheme.emerald600,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      Text(
                        AppStrings.tr(
                          'ভুল: ${AppStrings.formatNumber(paper.wrongCount ?? 0, lang)}',
                          'Wrong: ${paper.wrongCount ?? 0}',
                          lang,
                        ),
                        style: const TextStyle(
                          fontSize: 12,
                          color: PorhiTheme.rose600,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      Text(
                        AppStrings.tr(
                          'অনুত্তরিত: ${AppStrings.formatNumber(paper.unansweredCount ?? 0, lang)}',
                          'Skipped: ${paper.unansweredCount ?? 0}',
                          lang,
                        ),
                        style: const TextStyle(
                          fontSize: 12,
                          color: PorhiTheme.slate600,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      Text(
                        AppStrings.tr(
                          'সময়: ${AppStrings.formatNumber(paper.timeSpentSeconds ?? 0, lang)}সে.',
                          'Time: ${paper.timeSpentSeconds ?? 0}s',
                          lang,
                        ),
                        style: const TextStyle(
                          fontSize: 12,
                          color: PorhiTheme.slate600,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        const SizedBox(height: 8),
        SizedBox(
          height: 48,
          child: ElevatedButton.icon(
            key: const Key('rehearsal_new_btn'),
            onPressed: controller.resetToSetup,
            style: ElevatedButton.styleFrom(
              backgroundColor: PorhiTheme.indigo600,
              foregroundColor: Colors.white,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(14),
              ),
            ),
            icon: const Icon(Icons.replay_rounded),
            label: Text(
              AppStrings.tr(
                'নতুন রিহার্সাল শুরু করো',
                'Start New Rehearsal',
                lang,
              ),
              style: const TextStyle(fontWeight: FontWeight.w800),
            ),
          ),
        ),
      ],
    );
  }
}

class _MetricChip extends StatelessWidget {
  final String label;
  final String value;

  const _MetricChip({required this.label, required this.value});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: const Color(0xFFA7F3D0)),
      ),
      child: Column(
        children: <Widget>[
          Text(
            label,
            style: const TextStyle(
              fontSize: 11,
              fontWeight: FontWeight.w600,
              color: PorhiTheme.slate600,
            ),
          ),
          const SizedBox(height: 2),
          Text(
            value,
            style: const TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w800,
              color: PorhiTheme.slate900,
            ),
          ),
        ],
      ),
    );
  }
}

class _RehearsalErrorBanner extends StatelessWidget {
  final String message;

  const _RehearsalErrorBanner({required this.message});

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
