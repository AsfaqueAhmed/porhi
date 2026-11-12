import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:porhi/app/env.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/core/theme/porhi_theme.dart';
import 'package:porhi/core/widgets/rich_content/rich_content_view.dart';
import 'package:porhi/features/board_archive/domain/entities/board_archive_entities.dart';
import 'package:porhi/features/board_archive/presentation/board_archive/controller/board_archive_controller.dart';
import 'package:porhi/features/content_report/domain/entities/content_report_entity.dart';
import 'package:porhi/features/content_report/presentation/report_sheet/report_content_sheet.dart';
import 'package:porhi/features/practice/domain/entities/practice_entities.dart';
import 'package:porhi/features/practice/presentation/shared/cq_rubric_card.dart';
import 'package:porhi/features/practice/presentation/shared/explanation_layers_card.dart';

class BoardArchiveView extends GetView<BoardArchiveController> {
  const BoardArchiveView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Obx(() {
          final lang = controller.language.value;
          return Text(
            AppStrings.tr(
              'ভেরিফায়েড বোর্ড প্রশ্ন ব্যাংক',
              'Verified Board Archive',
              lang,
            ),
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
          );
        }),
      ),
      body: Obx(() {
        final lang = controller.language.value;
        final isLoading = controller.isLoading.value;
        final error = controller.errorMessage.value;
        final cqError = controller.cqErrorMessage.value;
        final items = controller.questions;

        return RefreshIndicator(
          onRefresh: controller.refreshAll,
          child: ListView(
            controller: controller.scrollController,
            padding: const EdgeInsets.fromLTRB(16, 10, 16, 28),
            children: <Widget>[
              _BoardFilterPanel(controller: controller, lang: lang),
              const SizedBox(height: 10),
              if (cqError != null) ...<Widget>[
                _InlineErrorBanner(
                  key: const Key('board_cq_error_banner'),
                  message: cqError,
                ),
                const SizedBox(height: 10),
              ],
              if (isLoading && items.isEmpty)
                const Padding(
                  padding: EdgeInsets.symmetric(vertical: 40),
                  child: Center(child: CircularProgressIndicator()),
                )
              else if (error != null && items.isEmpty)
                _BoardErrorState(
                  message: error,
                  lang: lang,
                  onRetry: controller.loadQuestions,
                )
              else if (items.isEmpty)
                _BoardEmptyState(lang: lang)
              else ...<Widget>[
                if (error != null) ...<Widget>[
                  _InlineErrorBanner(message: error),
                  const SizedBox(height: 10),
                ],
                if (isLoading)
                  const Padding(
                    padding: EdgeInsets.only(bottom: 10),
                    child: LinearProgressIndicator(minHeight: 2),
                  ),
                for (var i = 0; i < items.length; i++)
                  Padding(
                    padding: const EdgeInsets.only(bottom: 14),
                    child: _BoardQuestionCard(
                      key: ValueKey<String>(items[i].id),
                      controller: controller,
                      question: items[i],
                      indexNumber:
                          (controller.currentPage.value - 1) *
                                  BoardArchiveController.defaultLimit +
                              i +
                              1,
                      lang: lang,
                    ),
                  ),
                if (controller.totalPages.value > 1)
                  _PaginationBar(
                    currentPage: controller.currentPage.value,
                    totalPages: controller.totalPages.value,
                    isLoading: isLoading,
                    lang: lang,
                    onPrevious: controller.previousPage,
                    onNext: controller.nextPage,
                  ),
              ],
            ],
          ),
        );
      }),
    );
  }
}

class _BoardFilterPanel extends StatelessWidget {
  final BoardArchiveController controller;
  final AppLanguage lang;

  const _BoardFilterPanel({
    required this.controller,
    required this.lang,
  });

  @override
  Widget build(BuildContext context) {
    final filters = controller.filters.value;
    final boards = filters?.boards ?? const <BoardFacetItemEntity>[];
    final subjects = controller.filteredSubjects;
    final programs = controller.availablePrograms;
    final years = controller.availableYears;
    final selectedBoard = controller.selectedBoard.value;
    final selectedYear = controller.selectedYear.value;
    final selectedProgram = controller.selectedProgram.value;
    final selectedSubject = controller.selectedSubjectId.value;
    final selectedType = controller.selectedType.value;
    final verifiedOnly = controller.verifiedOnly.value;
    final searchQuery = controller.searchQuery.value;
    final totalBadgeCount =
        (controller.hasActiveFilters || controller.hasLoadedQuestions.value)
            ? controller.totalQuestions.value
            : (filters?.totalVerifiedQuestions ??
                controller.totalQuestions.value);

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: LayoutBuilder(
          builder: (context, constraints) {
            return Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: <Widget>[
                Wrap(
                  spacing: 8,
                  runSpacing: 6,
                  alignment: WrapAlignment.spaceBetween,
                  crossAxisAlignment: WrapCrossAlignment.center,
                  children: <Widget>[
                    ConstrainedBox(
                      constraints: BoxConstraints(maxWidth: constraints.maxWidth),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: <Widget>[
                          const Icon(
                            Icons.verified_rounded,
                            size: 18,
                            color: PorhiTheme.emerald600,
                          ),
                          const SizedBox(width: 6),
                          Flexible(
                            child: Text(
                              AppStrings.tr(
                                'বোর্ড ও বছর ফিল্টার',
                                'Board & Year Filters',
                                lang,
                              ),
                              style: const TextStyle(
                                fontSize: 13.5,
                                fontWeight: FontWeight.w800,
                                color: PorhiTheme.slate900,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                    Container(
                      key: const Key('board_total_badge'),
                      padding: const EdgeInsets.symmetric(
                        horizontal: 10,
                        vertical: 4,
                      ),
                      decoration: BoxDecoration(
                        color: PorhiTheme.emerald50,
                        borderRadius: BorderRadius.circular(999),
                        border: Border.all(color: const Color(0xFFA7F3D0)),
                      ),
                      child: Text(
                        AppStrings.tr(
                          'মোট: ${AppStrings.formatNumber(totalBadgeCount, lang)}টি',
                          'Total: $totalBadgeCount',
                          lang,
                        ),
                        style: const TextStyle(
                          fontSize: 11.5,
                          fontWeight: FontWeight.w800,
                          color: PorhiTheme.emerald600,
                        ),
                      ),
                    ),
                  ],
                ),
            const SizedBox(height: 10),
            TextField(
              key: const Key('board_search_input'),
              controller: controller.searchController,
              onChanged: controller.onSearchChanged,
              onSubmitted: (_) => controller.submitSearch(),
              textInputAction: TextInputAction.search,
              decoration: InputDecoration(
                prefixIcon: const Icon(Icons.search_rounded),
                hintText: AppStrings.tr(
                  'প্রশ্ন, বোর্ড বা টপিক খুঁজুন...',
                  'Search questions, boards, or topics...',
                  lang,
                ),
                suffixIcon: searchQuery.isEmpty
                    ? null
                    : IconButton(
                        key: const Key('board_clear_search_btn'),
                        icon: const Icon(Icons.clear_rounded, size: 18),
                        onPressed: controller.clearSearch,
                      ),
              ),
            ),
            const SizedBox(height: 12),
            Text(
              AppStrings.tr('শিক্ষা বোর্ড', 'Education Board', lang),
              style: const TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.w700,
                color: PorhiTheme.slate600,
              ),
            ),
            const SizedBox(height: 6),
            Wrap(
              spacing: 6,
              runSpacing: 6,
              children: <Widget>[
                _FilterPill(
                  key: const Key('board_chip_ALL'),
                  label: AppStrings.tr('সকল বোর্ড', 'All Boards', lang),
                  selected: selectedBoard == 'ALL',
                  activeColor: PorhiTheme.emerald600,
                  onTap: () => controller.selectBoard('ALL'),
                ),
                for (final b in boards)
                  _FilterPill(
                    key: Key('board_chip_${b.key.apiValue}'),
                    label: lang == AppLanguage.en
                        ? '${b.labelEnglish} (${b.count})'
                        : '${b.labelBangla} (${AppStrings.formatNumber(b.count, lang)})',
                    selected: selectedBoard == b.key.apiValue,
                    activeColor: PorhiTheme.emerald600,
                    onTap: () => controller.selectBoard(b.key.apiValue),
                  ),
              ],
            ),
            const SizedBox(height: 12),
            Text(
              AppStrings.tr('পরীক্ষার বছর', 'Exam Year', lang),
              style: const TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.w700,
                color: PorhiTheme.slate600,
              ),
            ),
            const SizedBox(height: 6),
            Wrap(
              spacing: 6,
              runSpacing: 6,
              children: <Widget>[
                _FilterPill(
                  key: const Key('board_year_ALL'),
                  label: AppStrings.tr('সকল বছর', 'All Years', lang),
                  selected: selectedYear == 'ALL',
                  activeColor: PorhiTheme.indigo600,
                  onTap: () => controller.selectYear('ALL'),
                ),
                _FilterPill(
                  key: const Key('board_year_2024+'),
                  label: AppStrings.tr('২০২৪+', '2024+', lang),
                  selected: selectedYear == '2024+',
                  activeColor: PorhiTheme.indigo600,
                  onTap: () => controller.selectYear('2024+'),
                ),
                for (final y in years)
                  _FilterPill(
                    key: Key('board_year_$y'),
                    label: AppStrings.formatNumber(y, lang),
                    selected: selectedYear == '$y',
                    activeColor: PorhiTheme.indigo600,
                    onTap: () => controller.selectYear('$y'),
                  ),
              ],
            ),
            const SizedBox(height: 12),
            Text(
              AppStrings.tr('প্রোগ্রাম / বিভাগ', 'Program', lang),
              style: const TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.w700,
                color: PorhiTheme.slate600,
              ),
            ),
            const SizedBox(height: 6),
            Wrap(
              spacing: 6,
              runSpacing: 6,
              children: <Widget>[
                _FilterPill(
                  key: const Key('board_archive_program_chip_ALL'),
                  label: AppStrings.tr('সব প্রোগ্রাম', 'All Programs', lang),
                  selected: selectedProgram == null,
                  activeColor: PorhiTheme.indigo600,
                  onTap: () => controller.selectProgram(null),
                ),
                for (final prog in programs)
                  _FilterPill(
                    key: Key('board_archive_program_chip_$prog'),
                    label: prog,
                    selected: selectedProgram == prog,
                    activeColor: PorhiTheme.indigo600,
                    onTap: () => controller.selectProgram(prog),
                  ),
              ],
            ),
            if (subjects.isNotEmpty) ...<Widget>[
              const SizedBox(height: 12),
              KeyedSubtree(
                key: ValueKey<String>(
                  'board_subject_wrap_${selectedProgram ?? 'ALL'}_$selectedSubject',
                ),
                child: DropdownButtonFormField<String>(
                  key: const Key('board_subject_dropdown'),
                  initialValue: subjects.any((s) => s.id == selectedSubject)
                      ? selectedSubject
                      : 'ALL',
                isExpanded: true,
                decoration: InputDecoration(
                  labelText: AppStrings.tr('বিষয়', 'Subject', lang),
                  isDense: true,
                ),
                items: <DropdownMenuItem<String>>[
                  DropdownMenuItem<String>(
                    value: 'ALL',
                    child: Text(AppStrings.tr('সকল বিষয়', 'All Subjects', lang)),
                  ),
                  for (final s in subjects)
                    DropdownMenuItem<String>(
                      value: s.id,
                      child: Text(
                        '${s.nameBangla} (${AppStrings.formatNumber(s.count, lang)})',
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                ],
                onChanged: (val) {
                  if (val != null) controller.selectSubject(val);
                },
                ),
              ),
            ],
            const SizedBox(height: 12),
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
                    _FilterPill(
                      key: const Key('board_type_ALL'),
                      label: AppStrings.tr('সব', 'All', lang),
                      selected: selectedType == 'ALL',
                      activeColor: PorhiTheme.slate900,
                      onTap: () => controller.selectType('ALL'),
                    ),
                    _FilterPill(
                      key: const Key('board_type_MCQ'),
                      label: 'MCQ',
                      selected: selectedType == 'MCQ',
                      activeColor: PorhiTheme.slate900,
                      onTap: () => controller.selectType('MCQ'),
                    ),
                    _FilterPill(
                      key: const Key('board_type_CQ_CREATIVE'),
                      label: 'CQ',
                      selected: selectedType == 'CQ_CREATIVE',
                      activeColor: PorhiTheme.slate900,
                      onTap: () => controller.selectType('CQ_CREATIVE'),
                    ),
                  ],
                ),
                FilterChip(
                  key: const Key('board_verified_toggle'),
                  label: Text(
                    AppStrings.tr('শুধু ভেরিফায়েড', 'Verified Only', lang),
                    style: const TextStyle(
                      fontSize: 11.5,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  selected: verifiedOnly,
                  selectedColor: PorhiTheme.emerald50,
                  checkmarkColor: PorhiTheme.emerald600,
                  onSelected: controller.toggleVerifiedOnly,
                ),
              ],
            ),
          ],
        );
          },
        ),
      ),
    );
  }
}

class _FilterPill extends StatelessWidget {
  final String label;
  final bool selected;
  final Color activeColor;
  final VoidCallback onTap;

  const _FilterPill({
    super.key,
    required this.label,
    required this.selected,
    required this.activeColor,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(999),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
        decoration: BoxDecoration(
          color: selected ? activeColor : PorhiTheme.slate100,
          borderRadius: BorderRadius.circular(999),
          border: Border.all(
            color: selected ? activeColor : PorhiTheme.slate200,
          ),
        ),
        child: Text(
          label,
          style: TextStyle(
            fontSize: 11.5,
            fontWeight: FontWeight.w700,
            color: selected ? Colors.white : PorhiTheme.slate700,
          ),
        ),
      ),
    );
  }
}

class _BoardQuestionCard extends StatefulWidget {
  final BoardArchiveController controller;
  final BoardQuestionItemEntity question;
  final int indexNumber;
  final AppLanguage lang;

  const _BoardQuestionCard({
    super.key,
    required this.controller,
    required this.question,
    required this.indexNumber,
    required this.lang,
  });

  @override
  State<_BoardQuestionCard> createState() => _BoardQuestionCardState();
}

class _BoardQuestionCardState extends State<_BoardQuestionCard> {
  bool _isOpeningReportSheet = false;

  Future<void> _openReportSheet() async {
    if (_isOpeningReportSheet) return;
    _isOpeningReportSheet = true;
    try {
      final q = widget.question;
      await ReportContentSheet.show(
        context,
        contentType: ReportContentType.question,
        contentId: q.id,
        topicId: q.topicId.isNotEmpty ? q.topicId : null,
        contentLabel: q.stem.length > 80 ? q.stem.substring(0, 80) : q.stem,
        language: widget.lang,
      );
    } finally {
      if (mounted) {
        _isOpeningReportSheet = false;
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final q = widget.question;
    final lang = widget.lang;
    final controller = widget.controller;
    const labels = <String>['ক', 'খ', 'গ', 'ঘ'];

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(14),
        child: Obx(() {
          final chosenOptionId = controller.selectedMcqOptions[q.id];
          final hasAnsweredMcq =
              chosenOptionId != null && chosenOptionId.isNotEmpty;
          final isExplanationExpanded =
              controller.expandedExplanations.contains(q.id);
          final isBookmarked = controller.bookmarkedIds.contains(q.id);
          final isTogglingBookmark =
              controller.togglingBookmarkIds.contains(q.id);
          final cqResult = controller.cqResults[q.id];
          final isSubmittingCq = controller.submittingCqIds.contains(q.id);

          final boardText = q.boardYear != null
              ? '${q.boardLabelBangla} ${AppStrings.formatNumber(q.boardYear!, lang)}'
              : q.boardLabelBangla;

          return LayoutBuilder(
            builder: (context, cardConstraints) {
              return Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: <Widget>[
                  Wrap(
                    spacing: 6,
                    runSpacing: 6,
                    alignment: WrapAlignment.spaceBetween,
                    crossAxisAlignment: WrapCrossAlignment.center,
                    children: <Widget>[
                      Wrap(
                        spacing: 6,
                        runSpacing: 6,
                        children: <Widget>[
                          ConstrainedBox(
                            constraints: BoxConstraints(
                              maxWidth: cardConstraints.maxWidth,
                            ),
                            child: Container(
                              padding: const EdgeInsets.symmetric(
                                horizontal: 9,
                                vertical: 4,
                              ),
                              decoration: BoxDecoration(
                                color: q.isVerifiedBoard
                                    ? PorhiTheme.emerald50
                                    : PorhiTheme.slate100,
                                borderRadius: BorderRadius.circular(999),
                              ),
                              child: Row(
                                mainAxisSize: MainAxisSize.min,
                                children: <Widget>[
                                  if (q.isVerifiedBoard) ...<Widget>[
                                    const Icon(
                                      Icons.verified_rounded,
                                      size: 13,
                                      color: PorhiTheme.emerald600,
                                    ),
                                    const SizedBox(width: 4),
                                  ],
                                  Flexible(
                                    child: Text(
                                      boardText,
                                      style: TextStyle(
                                        fontSize: 11,
                                        fontWeight: FontWeight.w800,
                                        color: q.isVerifiedBoard
                                            ? PorhiTheme.emerald600
                                            : PorhiTheme.slate700,
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                          _SmallBadge(
                            text: q.isCq
                                ? AppStrings.tr('সৃজনশীল (CQ)', 'CQ', lang)
                                : 'MCQ',
                            bg: PorhiTheme.indigo50,
                            fg: PorhiTheme.indigo700,
                          ),
                          _SmallBadge(
                            text: q.difficulty,
                            bg: PorhiTheme.slate100,
                            fg: PorhiTheme.slate700,
                          ),
                        ],
                      ),
                      Row(
                        mainAxisSize: MainAxisSize.min,
                        children: <Widget>[
                          IconButton(
                            key: Key('board_bookmark_btn_${q.id}'),
                            visualDensity: VisualDensity.compact,
                            tooltip:
                                AppStrings.tr('বুকমার্ক', 'Bookmark', lang),
                            onPressed: isTogglingBookmark
                                ? null
                                : () => controller.toggleBookmark(q),
                            icon: Icon(
                              isBookmarked
                                  ? Icons.bookmark_rounded
                                  : Icons.bookmark_border_rounded,
                              size: 20,
                              color: isBookmarked
                                  ? PorhiTheme.indigo600
                                  : PorhiTheme.slate600,
                            ),
                          ),
                          IconButton(
                            key: Key('board_report_btn_${q.id}'),
                            visualDensity: VisualDensity.compact,
                            tooltip: AppStrings.tr('ভুল রিপোর্ট', 'Report', lang),
                            onPressed: _openReportSheet,
                            icon: const Icon(
                              Icons.flag_outlined,
                              size: 19,
                              color: PorhiTheme.slate600,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
              const SizedBox(height: 4),
              Text(
                '#${AppStrings.formatNumber(widget.indexNumber, lang)} • ${<String>[
                  if (q.subjectNameBangla.isNotEmpty) q.subjectNameBangla,
                  if (q.chapterTitleBangla.isNotEmpty) q.chapterTitleBangla,
                  if (q.topicTitleBangla.isNotEmpty) q.topicTitleBangla,
                ].join(' › ')}',
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
                style: const TextStyle(
                  fontSize: 11.5,
                  fontWeight: FontWeight.w600,
                  color: PorhiTheme.slate600,
                ),
              ),
              const SizedBox(height: 10),
              RichContentView(
                content: q.stem,
                envConfig: controller.envConfig,
                baseStyle: const TextStyle(
                  fontSize: 14.5,
                  fontWeight: FontWeight.w600,
                  height: 1.5,
                  color: PorhiTheme.slate900,
                ),
              ),
              if (q.isMcq && q.options.isNotEmpty) ...<Widget>[
                const SizedBox(height: 12),
                for (var optIdx = 0; optIdx < q.options.length; optIdx++) ...<Widget>[
                  _BoardMcqOptionTile(
                    key: Key('board_mcq_opt_${q.id}_${q.options[optIdx].id}'),
                    label: optIdx < labels.length
                        ? labels[optIdx]
                        : '${optIdx + 1}',
                    option: q.options[optIdx],
                    hasAnswered: hasAnsweredMcq,
                    isChosen: chosenOptionId == q.options[optIdx].id,
                    isCorrect:
                        controller.isOptionCorrect(q, q.options[optIdx]),
                    envConfig: controller.envConfig,
                    onTap: () =>
                        controller.selectMcqOption(q, q.options[optIdx].id),
                  ),
                  const SizedBox(height: 8),
                ],
                if (hasAnsweredMcq &&
                    q.explanation != null &&
                    q.explanation!.hasAnyContent) ...<Widget>[
                  Align(
                    alignment: Alignment.centerLeft,
                    child: TextButton.icon(
                      key: Key('board_explanation_toggle_${q.id}'),
                      onPressed: () => controller.toggleExplanation(q.id),
                      icon: Icon(
                        isExplanationExpanded
                            ? Icons.keyboard_arrow_up_rounded
                            : Icons.keyboard_arrow_down_rounded,
                        size: 18,
                      ),
                      label: Text(
                        isExplanationExpanded
                            ? AppStrings.tr('ব্যাখ্যা লুকাও', 'Hide Explanation', lang)
                            : AppStrings.tr('ব্যাখ্যা দেখো', 'Show Explanation', lang),
                      ),
                    ),
                  ),
                  if (isExplanationExpanded)
                    ExplanationLayersCard(
                      explanation: q.explanation!,
                      envConfig: controller.envConfig,
                      languageCode: lang.code,
                    ),
                ],
              ],
              if (q.isCq) ...<Widget>[
                CqRubricCard(
                  question: q.toPracticeQuestionEntity(),
                  submittedResult: cqResult,
                  isSubmitting: isSubmittingCq,
                  languageCode: lang.code,
                  envConfig: controller.envConfig,
                  onSubmit: (scores) =>
                      controller.submitCqSelfAssess(q, scores),
                ),
                if (q.explanation != null &&
                    q.explanation!.hasAnyContent) ...<Widget>[
                  const SizedBox(height: 6),
                  Align(
                    alignment: Alignment.centerLeft,
                    child: TextButton.icon(
                      key: Key('board_cq_explanation_toggle_${q.id}'),
                      onPressed: () => controller.toggleExplanation(q.id),
                      icon: Icon(
                        isExplanationExpanded
                            ? Icons.keyboard_arrow_up_rounded
                            : Icons.keyboard_arrow_down_rounded,
                        size: 18,
                      ),
                      label: Text(
                        isExplanationExpanded
                            ? AppStrings.tr(
                                '৬-স্তরের ব্যাখ্যা লুকাও',
                                'Hide 6-Layer Explanation',
                                lang,
                              )
                            : AppStrings.tr(
                                '৬-স্তরের ব্যাখ্যা দেখো',
                                'Show 6-Layer Explanation',
                                lang,
                              ),
                      ),
                    ),
                  ),
                  if (isExplanationExpanded)
                    ExplanationLayersCard(
                      explanation: q.explanation!,
                      envConfig: controller.envConfig,
                      languageCode: lang.code,
                    ),
                ],
              ],
            ],
          );
            },
          );
        }),
      ),
    );
  }
}

class _BoardMcqOptionTile extends StatelessWidget {
  final String label;
  final PracticeOptionEntity option;
  final bool hasAnswered;
  final bool isChosen;
  final bool isCorrect;
  final EnvConfig? envConfig;
  final VoidCallback onTap;

  const _BoardMcqOptionTile({
    super.key,
    required this.label,
    required this.option,
    required this.hasAnswered,
    required this.isChosen,
    required this.isCorrect,
    required this.envConfig,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    var bg = PorhiTheme.slate50;
    var border = PorhiTheme.slate200;
    Widget? trailing;

    if (hasAnswered) {
      if (isCorrect) {
        bg = PorhiTheme.emerald50;
        border = PorhiTheme.emerald600;
        trailing = const Icon(
          Icons.check_circle_rounded,
          size: 18,
          color: PorhiTheme.emerald600,
        );
      } else if (isChosen) {
        bg = const Color(0xFFFFF1F2);
        border = PorhiTheme.rose600;
        trailing = const Icon(
          Icons.cancel_rounded,
          size: 18,
          color: PorhiTheme.rose600,
        );
      }
    }

    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(12),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
        decoration: BoxDecoration(
          color: bg,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: border,
            width: hasAnswered && (isCorrect || isChosen) ? 1.5 : 1,
          ),
        ),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Text(
              '$label.',
              style: const TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.w800,
                color: PorhiTheme.slate600,
              ),
            ),
            const SizedBox(width: 8),
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
            if (trailing != null) ...<Widget>[
              const SizedBox(width: 8),
              trailing,
            ],
          ],
        ),
      ),
    );
  }
}

class _SmallBadge extends StatelessWidget {
  final String text;
  final Color bg;
  final Color fg;

  const _SmallBadge({
    required this.text,
    required this.bg,
    required this.fg,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(999),
      ),
      child: Text(
        text,
        style: TextStyle(
          fontSize: 10.5,
          fontWeight: FontWeight.w800,
          color: fg,
        ),
      ),
    );
  }
}

class _PaginationBar extends StatelessWidget {
  final int currentPage;
  final int totalPages;
  final bool isLoading;
  final AppLanguage lang;
  final VoidCallback onPrevious;
  final VoidCallback onNext;

  const _PaginationBar({
    required this.currentPage,
    required this.totalPages,
    required this.isLoading,
    required this.lang,
    required this.onPrevious,
    required this.onNext,
  });

  @override
  Widget build(BuildContext context) {
    return Wrap(
      spacing: 10,
      runSpacing: 8,
      alignment: WrapAlignment.center,
      crossAxisAlignment: WrapCrossAlignment.center,
      children: <Widget>[
        OutlinedButton.icon(
          key: const Key('board_prev_page_btn'),
          onPressed: currentPage > 1 && !isLoading ? onPrevious : null,
          icon: const Icon(Icons.chevron_left_rounded, size: 18),
          label: Text(AppStrings.tr('পূর্ববর্তী', 'Previous', lang)),
        ),
        Text(
          AppStrings.tr(
            'পৃষ্ঠা ${AppStrings.formatNumber(currentPage, lang)} / ${AppStrings.formatNumber(totalPages, lang)}',
            'Page $currentPage / $totalPages',
            lang,
          ),
          style: const TextStyle(
            fontSize: 12.5,
            fontWeight: FontWeight.w700,
            color: PorhiTheme.slate700,
          ),
        ),
        OutlinedButton.icon(
          key: const Key('board_next_page_btn'),
          onPressed: currentPage < totalPages && !isLoading ? onNext : null,
          icon: const Icon(Icons.chevron_right_rounded, size: 18),
          label: Text(AppStrings.tr('পরবর্তী', 'Next', lang)),
        ),
      ],
    );
  }
}

class _BoardEmptyState extends StatelessWidget {
  final AppLanguage lang;

  const _BoardEmptyState({required this.lang});

  @override
  Widget build(BuildContext context) {
    return Card(
      key: const Key('board_empty_state'),
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          children: <Widget>[
            const Icon(
              Icons.search_off_rounded,
              size: 40,
              color: PorhiTheme.slate400,
            ),
            const SizedBox(height: 10),
            Text(
              AppStrings.tr(
                'এই ফিল্টারে কোনো বোর্ড প্রশ্ন পাওয়া যায়নি',
                'No board questions found for these filters',
                lang,
              ),
              textAlign: TextAlign.center,
              style: const TextStyle(
                fontSize: 14,
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

class _BoardErrorState extends StatelessWidget {
  final String message;
  final AppLanguage lang;
  final VoidCallback onRetry;

  const _BoardErrorState({
    required this.message,
    required this.lang,
    required this.onRetry,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(18),
        child: Column(
          children: <Widget>[
            const Icon(
              Icons.cloud_off_rounded,
              size: 40,
              color: PorhiTheme.slate400,
            ),
            const SizedBox(height: 10),
            Text(
              message,
              textAlign: TextAlign.center,
              style: const TextStyle(color: PorhiTheme.slate700),
            ),
            const SizedBox(height: 12),
            ElevatedButton.icon(
              key: const Key('board_retry_btn'),
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

class _InlineErrorBanner extends StatelessWidget {
  final String message;

  const _InlineErrorBanner({super.key, required this.message});

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
