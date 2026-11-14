import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/core/i18n/bangla_digits.dart';
import 'package:porhi/core/theme/porhi_theme.dart';
import 'package:porhi/core/utils/date_time_parser.dart';
import 'package:porhi/core/widgets/feature_intro_card.dart';
import 'package:porhi/features/planner/domain/entities/planner_entities.dart';
import 'package:porhi/features/planner/presentation/planner/controller/planner_controller.dart';

class PlannerView extends GetView<PlannerController> {
  final Future<void> Function()? onAccountTap;

  const PlannerView({super.key, this.onAccountTap});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Obx(() {
          final lang = controller.language.value;
          final isCached = controller.isOfflineCache.value;
          return Row(
            children: <Widget>[
              Flexible(
                child: Text(
                  AppStrings.tr('স্টাডি প্ল্যানার', 'Study Planner', lang),
                  overflow: TextOverflow.ellipsis,
                ),
              ),
              if (isCached) ...<Widget>[
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
        final isLoading = controller.isLoading.value;
        final tasks = controller.tasks;
        final error = controller.errorMessage.value;
        final status = controller.statusMessage.value;
        final isStatusErr = controller.isStatusError.value;

        if (isLoading && tasks.isEmpty) {
          return const Center(child: CircularProgressIndicator());
        }

        if (error != null && tasks.isEmpty) {
          return Center(
            child: Padding(
              padding: const EdgeInsets.all(24),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: <Widget>[
                  const Icon(
                    Icons.event_busy_rounded,
                    size: 48,
                    color: PorhiTheme.slate400,
                  ),
                  const SizedBox(height: 12),
                  Text(
                    error,
                    textAlign: TextAlign.center,
                    style: const TextStyle(
                      fontSize: 14,
                      color: PorhiTheme.slate700,
                    ),
                  ),
                  const SizedBox(height: 16),
                  ElevatedButton.icon(
                    onPressed: controller.loadTasks,
                    icon: const Icon(Icons.refresh_rounded),
                    label: Text(AppStrings.t('action.retry', lang)),
                  ),
                ],
              ),
            ),
          );
        }

        final visibleTasks = controller.filteredTasks;
        return RefreshIndicator(
          onRefresh: controller.loadTasks,
          child: ListView(
            padding: const EdgeInsets.fromLTRB(18, 18, 18, 28),
            children: <Widget>[
              if (error != null) ...<Widget>[
                _StatusBanner(message: error, isError: true),
                const SizedBox(height: 12),
              ],
              if (status != null) ...<Widget>[
                _StatusBanner(message: status, isError: isStatusErr),
                const SizedBox(height: 12),
              ],
              FeatureIntroCard(
                icon: Icons.calendar_month_rounded,
                eyebrow: AppStrings.tr(
                  'ছোট লক্ষ্য, নিয়মিত অগ্রগতি',
                  'YOUR STUDY RHYTHM',
                  lang,
                ),
                title: AppStrings.tr(
                  'আজকের পড়া গুছিয়ে নাও',
                  'Make today feel manageable',
                  lang,
                ),
                description: AppStrings.tr(
                  'একটি কাজ বেছে নাও, শেষ হলে টিক দাও—পরের ধাপটি পরিষ্কার থাকবে।',
                  'Choose one task, check it off, and keep your next step clear.',
                  lang,
                ),
              ),
              const SizedBox(height: 14),
              _PlannerSummaryCard(controller: controller, lang: lang),
              const SizedBox(height: 14),
              _CreateTaskCard(
                controller: controller,
                lang: lang,
                onPickDate: () => _pickDate(context),
                onPickTime: () => _pickTime(context),
              ),
              const SizedBox(height: 14),
              _FilterChipsBar(controller: controller, lang: lang),
              const SizedBox(height: 12),
              if (visibleTasks.isEmpty)
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(20),
                    child: Column(
                      children: <Widget>[
                        const Icon(
                          Icons.event_available_rounded,
                          size: 36,
                          color: PorhiTheme.indigo600,
                        ),
                        const SizedBox(height: 8),
                        Text(
                          AppStrings.tr(
                            'এই ফিল্টারে কোনো টাস্ক নেই। নতুন টাস্ক যোগ করো বা স্মার্ট প্ল্যান তৈরি করো।',
                            'No tasks match this filter. Add a task or auto-generate a 7-day plan.',
                            lang,
                          ),
                          textAlign: TextAlign.center,
                          style: const TextStyle(
                            fontSize: 13,
                            color: PorhiTheme.slate600,
                          ),
                        ),
                      ],
                    ),
                  ),
                )
              else
                ...visibleTasks.map(
                  (task) => Padding(
                    padding: const EdgeInsets.only(bottom: 10),
                    child: _PlannerTaskCard(
                      task: task,
                      lang: lang,
                      isBusy: controller.pendingTaskIds.contains(task.id),
                      canOpenTarget: controller.canOpenTaskTarget(task),
                      onToggle: () => controller.toggleTaskCompletion(task),
                      onDelete: () => controller.deleteTask(task.id),
                      onOpenTarget: () => controller.openTaskTarget(task),
                    ),
                  ),
                ),
              const SizedBox(height: 24),
            ],
          ),
        );
      }),
    );
  }

  Future<void> _pickDate(BuildContext context) async {
    final now = DateTime.now();
    final parsed = DateTimeParser.normalizeYyyyMmDd(
      controller.dateController.text,
    );
    final initial = parsed != null ? DateTime.tryParse(parsed) ?? now : now;
    final picked = await showDatePicker(
      context: context,
      initialDate: initial,
      firstDate: DateTime(now.year - 1),
      lastDate: DateTime(now.year + 2),
    );
    if (picked != null) {
      controller.dateController.text =
          '${picked.year.toString().padLeft(4, '0')}-'
          '${picked.month.toString().padLeft(2, '0')}-'
          '${picked.day.toString().padLeft(2, '0')}';
    }
  }

  Future<void> _pickTime(BuildContext context) async {
    final picked = await showTimePicker(
      context: context,
      initialTime: const TimeOfDay(hour: 18, minute: 0),
    );
    if (picked != null) {
      controller.reminderTimeController.text =
          '${picked.hour.toString().padLeft(2, '0')}:'
          '${picked.minute.toString().padLeft(2, '0')}';
    }
  }
}

class _PlannerSummaryCard extends StatelessWidget {
  final PlannerController controller;
  final AppLanguage lang;

  const _PlannerSummaryCard({required this.controller, required this.lang});

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
      child: Obx(() {
        final due = controller.todayDueCount.value;
        final pending = controller.pendingCount;
        final completed = controller.completedCount;
        final remindersOn = controller.remindersEnabled.value;
        final generating = controller.isAutoGenerating.value;

        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Wrap(
              spacing: 8,
              runSpacing: 8,
              crossAxisAlignment: WrapCrossAlignment.center,
              children: <Widget>[
                _BannerChip(
                  label: AppStrings.tr(
                    'আজ বাকি: ${AppStrings.formatNumber(due, lang)}',
                    'Due today: $due',
                    lang,
                  ),
                ),
                _BannerChip(
                  label: AppStrings.tr(
                    'অপেক্ষমাণ: ${AppStrings.formatNumber(pending, lang)}',
                    'Pending: $pending',
                    lang,
                  ),
                ),
                _BannerChip(
                  label: AppStrings.tr(
                    'সম্পন্ন: ${AppStrings.formatNumber(completed, lang)}',
                    'Done: $completed',
                    lang,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),
            Row(
              children: <Widget>[
                const Icon(
                  Icons.notifications_active_outlined,
                  color: Colors.white,
                  size: 20,
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    AppStrings.tr(
                      'ডিভাইস রিমাইন্ডার',
                      'Device Reminders',
                      lang,
                    ),
                    style: const TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.w600,
                      fontSize: 13,
                    ),
                  ),
                ),
                Switch(
                  key: const Key('planner_reminder_switch'),
                  value: remindersOn,
                  activeThumbColor: Colors.white,
                  activeTrackColor: PorhiTheme.emerald600,
                  onChanged: controller.toggleRemindersEnabled,
                ),
              ],
            ),
            const SizedBox(height: 8),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton.icon(
                key: const Key('planner_auto_generate_btn'),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.white,
                  foregroundColor: PorhiTheme.indigo700,
                  padding: const EdgeInsets.symmetric(
                    horizontal: 14,
                    vertical: 12,
                  ),
                ),
                onPressed: generating ? null : controller.autoGeneratePlan,
                icon: generating
                    ? const SizedBox(
                        width: 16,
                        height: 16,
                        child: CircularProgressIndicator(strokeWidth: 2),
                      )
                    : const Icon(Icons.auto_awesome_rounded, size: 18),
                label: Text(
                  AppStrings.tr(
                    'স্মার্ট ৭ দিনের রুটিন তৈরি করো',
                    'Smart Auto-Generate (7 Days)',
                    lang,
                  ),
                ),
              ),
            ),
          ],
        );
      }),
    );
  }
}

class _BannerChip extends StatelessWidget {
  final String label;

  const _BannerChip({required this.label});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.18),
        borderRadius: BorderRadius.circular(999),
      ),
      child: Text(
        label,
        style: const TextStyle(
          color: Colors.white,
          fontSize: 12,
          fontWeight: FontWeight.w700,
        ),
      ),
    );
  }
}

class _CreateTaskCard extends StatelessWidget {
  final PlannerController controller;
  final AppLanguage lang;
  final VoidCallback onPickDate;
  final VoidCallback onPickTime;

  const _CreateTaskCard({
    required this.controller,
    required this.lang,
    required this.onPickDate,
    required this.onPickTime,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: InkWell(
        key: const Key('planner_open_task_composer_btn'),
        onTap: () => _openComposer(context),
        borderRadius: BorderRadius.circular(24),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Row(
            children: <Widget>[
              Container(
                width: 48,
                height: 48,
                decoration: BoxDecoration(
                  color: PorhiTheme.selectedSurface,
                  borderRadius: BorderRadius.circular(16),
                ),
                child: const Icon(
                  Icons.add_task_rounded,
                  color: PorhiTheme.selectedForeground,
                ),
              ),
              const SizedBox(width: 13),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Text(
                      AppStrings.tr(
                        'নতুন স্টাডি টাস্ক যোগ করো',
                        'Add a study task',
                        lang,
                      ),
                      style: const TextStyle(
                        fontSize: 15,
                        fontWeight: FontWeight.w800,
                        color: PorhiTheme.slate900,
                      ),
                    ),
                    const SizedBox(height: 3),
                    Text(
                      AppStrings.tr(
                        'ছোট একটি লক্ষ্য দিয়ে শুরু করো',
                        'Start with one clear next step',
                        lang,
                      ),
                      style: const TextStyle(
                        fontSize: 12,
                        color: PorhiTheme.slate600,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(width: 8),
              const Icon(
                Icons.arrow_forward_rounded,
                color: PorhiTheme.selectedBorder,
              ),
            ],
          ),
        ),
      ),
    );
  }

  Future<void> _openComposer(BuildContext context) async {
    await showModalBottomSheet<void>(
      context: context,
      isScrollControlled: true,
      useSafeArea: true,
      showDragHandle: true,
      backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
      ),
      builder: (sheetContext) => _TaskComposerSheet(
        controller: controller,
        language: lang,
        onPickDate: onPickDate,
        onPickTime: onPickTime,
        onSubmit: () async {
          await controller.createTask();
          final succeeded =
              controller.statusMessage.value != null &&
              !controller.isStatusError.value;
          if (succeeded && sheetContext.mounted) {
            Navigator.of(sheetContext).pop();
          }
        },
      ),
    );
  }
}

class _TaskComposerSheet extends StatelessWidget {
  final PlannerController controller;
  final AppLanguage language;
  final VoidCallback onPickDate;
  final VoidCallback onPickTime;
  final Future<void> Function() onSubmit;

  const _TaskComposerSheet({
    required this.controller,
    required this.language,
    required this.onPickDate,
    required this.onPickTime,
    required this.onSubmit,
  });

  @override
  Widget build(BuildContext context) {
    final bottomInset = MediaQuery.viewInsetsOf(context).bottom;
    return Padding(
      padding: EdgeInsets.only(bottom: bottomInset),
      child: SafeArea(
        top: false,
        child: ConstrainedBox(
          constraints: BoxConstraints(
            maxHeight: MediaQuery.sizeOf(context).height * 0.84,
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: <Widget>[
              Padding(
                padding: const EdgeInsets.fromLTRB(20, 2, 12, 14),
                child: Row(
                  children: <Widget>[
                    Container(
                      width: 46,
                      height: 46,
                      decoration: BoxDecoration(
                        color: PorhiTheme.selectedSurface,
                        borderRadius: BorderRadius.circular(15),
                      ),
                      child: const Icon(
                        Icons.add_task_rounded,
                        color: PorhiTheme.selectedForeground,
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: <Widget>[
                          Text(
                            AppStrings.tr(
                              'নতুন পড়ার লক্ষ্য',
                              'Plan a study task',
                              language,
                            ),
                            style: Theme.of(context).textTheme.titleLarge,
                          ),
                          Text(
                            AppStrings.tr(
                              'কী পড়বে এবং কখন—দুটিই ঠিক করো',
                              'Choose what to study and when',
                              language,
                            ),
                            style: Theme.of(context).textTheme.bodyMedium,
                          ),
                        ],
                      ),
                    ),
                    IconButton(
                      tooltip: AppStrings.tr('বন্ধ করুন', 'Close', language),
                      onPressed: () => Navigator.of(context).pop(),
                      icon: const Icon(Icons.close_rounded),
                    ),
                  ],
                ),
              ),
              const Divider(height: 1),
              Flexible(
                fit: FlexFit.loose,
                child: SingleChildScrollView(
                  keyboardDismissBehavior:
                      ScrollViewKeyboardDismissBehavior.onDrag,
                  padding: const EdgeInsets.fromLTRB(20, 18, 20, 18),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: <Widget>[
                      TextField(
                        key: const Key('planner_title_input'),
                        controller: controller.titleController,
                        textCapitalization: TextCapitalization.sentences,
                        decoration: InputDecoration(
                          labelText: AppStrings.tr(
                            'কাজের শিরোনাম',
                            'What will you study?',
                            language,
                          ),
                          hintText: AppStrings.tr(
                            'যেমন: নিউটনের ২য় সূত্র অনুশীলন',
                            'e.g. Practice Newton’s second law',
                            language,
                          ),
                          prefixIcon: const Icon(Icons.edit_note_rounded),
                        ),
                      ),
                      const SizedBox(height: 18),
                      _ComposerSectionLabel(
                        icon: Icons.event_available_rounded,
                        label: AppStrings.tr(
                          'কখন পড়বে?',
                          'WHEN WILL YOU STUDY?',
                          language,
                        ),
                      ),
                      const SizedBox(height: 9),
                      LayoutBuilder(
                        builder: (context, constraints) {
                          final stackVertically =
                              constraints.maxWidth < 340 ||
                              MediaQuery.textScalerOf(context).scale(1) > 1.15;
                          final dateField = _SchedulePickTile(
                            key: const Key('planner_date_input'),
                            controller: controller.dateController,
                            icon: Icons.calendar_today_rounded,
                            label: AppStrings.tr('তারিখ', 'DATE', language),
                            emptyLabel: AppStrings.tr(
                              'তারিখ বেছে নাও',
                              'Choose a date',
                              language,
                            ),
                            onTap: onPickDate,
                          );
                          final timeField = _SchedulePickTile(
                            key: const Key('planner_time_input'),
                            controller: controller.reminderTimeController,
                            icon: Icons.schedule_rounded,
                            label: AppStrings.tr(
                              'রিমাইন্ডার',
                              'REMINDER',
                              language,
                            ),
                            emptyLabel: AppStrings.tr(
                              'সময় যোগ করো',
                              'Add a time',
                              language,
                            ),
                            onTap: onPickTime,
                          );
                          if (stackVertically) {
                            return Column(
                              crossAxisAlignment: CrossAxisAlignment.stretch,
                              children: <Widget>[
                                dateField,
                                const SizedBox(height: 10),
                                timeField,
                              ],
                            );
                          }
                          return Row(
                            children: <Widget>[
                              Expanded(child: dateField),
                              const SizedBox(width: 10),
                              Expanded(child: timeField),
                            ],
                          );
                        },
                      ),
                      const SizedBox(height: 20),
                      _ComposerSectionLabel(
                        icon: Icons.category_outlined,
                        label: AppStrings.tr(
                          'কাজের ধরন',
                          'TASK TYPE',
                          language,
                        ),
                      ),
                      const SizedBox(height: 8),
                      LayoutBuilder(
                        builder: (context, constraints) {
                          final tileWidth = (constraints.maxWidth - 10) / 2;
                          return Obx(() {
                            final selected =
                                controller.selectedTargetType.value;
                            return Wrap(
                              spacing: 10,
                              runSpacing: 8,
                              children: PlannerTargetType.values.map((type) {
                                final label = language == AppLanguage.bn
                                    ? type.labelBn
                                    : type.labelEn;
                                return SizedBox(
                                  width: type == PlannerTargetType.custom
                                      ? constraints.maxWidth
                                      : tileWidth,
                                  child: _TaskTypeTile(
                                    type: type,
                                    label: label,
                                    selected: selected == type.apiValue,
                                    onTap: () =>
                                        controller.setTargetType(type.apiValue),
                                  ),
                                );
                              }).toList(),
                            );
                          });
                        },
                      ),
                      Obx(() {
                        final error = controller.isStatusError.value
                            ? controller.statusMessage.value
                            : null;
                        if (error == null) return const SizedBox.shrink();
                        return Padding(
                          padding: const EdgeInsets.only(top: 14),
                          child: _StatusBanner(message: error, isError: true),
                        );
                      }),
                    ],
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.fromLTRB(20, 10, 20, 14),
                child: Obx(() {
                  final submitting = controller.isSubmitting.value;
                  return SizedBox(
                    width: double.infinity,
                    child: FilledButton.icon(
                      key: const Key('planner_create_submit_btn'),
                      onPressed: submitting ? null : onSubmit,
                      icon: submitting
                          ? const SizedBox(
                              width: 18,
                              height: 18,
                              child: CircularProgressIndicator(strokeWidth: 2),
                            )
                          : const Icon(Icons.check_rounded),
                      label: Text(
                        AppStrings.tr(
                          'টাস্ক যোগ করো',
                          'Add to planner',
                          language,
                        ),
                      ),
                    ),
                  );
                }),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _SchedulePickTile extends StatelessWidget {
  final TextEditingController controller;
  final IconData icon;
  final String label;
  final String emptyLabel;
  final VoidCallback onTap;

  const _SchedulePickTile({
    super.key,
    required this.controller,
    required this.icon,
    required this.label,
    required this.emptyLabel,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Material(
      color: PorhiTheme.slate50,
      borderRadius: BorderRadius.circular(16),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(16),
        child: Container(
          constraints: const BoxConstraints(minHeight: 66),
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 9),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: PorhiTheme.slate200),
          ),
          child: Row(
            children: <Widget>[
              Icon(icon, size: 19, color: PorhiTheme.selectedBorder),
              const SizedBox(width: 9),
              Expanded(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Text(
                      label,
                      style: const TextStyle(
                        color: PorhiTheme.slate600,
                        fontSize: 9,
                        fontWeight: FontWeight.w800,
                        letterSpacing: 0.55,
                      ),
                    ),
                    const SizedBox(height: 3),
                    ValueListenableBuilder<TextEditingValue>(
                      valueListenable: controller,
                      builder: (context, value, _) {
                        final text = value.text.trim();
                        return Text(
                          text.isEmpty ? emptyLabel : text,
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: TextStyle(
                            color: text.isEmpty
                                ? PorhiTheme.slate500
                                : PorhiTheme.slate900,
                            fontSize: 13,
                            fontWeight: FontWeight.w700,
                          ),
                        );
                      },
                    ),
                  ],
                ),
              ),
              const SizedBox(width: 4),
              const Icon(
                Icons.expand_more_rounded,
                size: 19,
                color: PorhiTheme.slate500,
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _TaskTypeTile extends StatelessWidget {
  final PlannerTargetType type;
  final String label;
  final bool selected;
  final VoidCallback onTap;

  const _TaskTypeTile({
    required this.type,
    required this.label,
    required this.selected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Material(
      color: selected ? PorhiTheme.selectedSurface : PorhiTheme.slate50,
      borderRadius: BorderRadius.circular(15),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(15),
        child: Container(
          height: 50,
          padding: const EdgeInsets.symmetric(horizontal: 10),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(15),
            border: Border.all(
              color: selected ? PorhiTheme.selectedBorder : PorhiTheme.slate200,
              width: selected ? 1.5 : 1,
            ),
          ),
          child: Row(
            children: <Widget>[
              Icon(
                _icon,
                size: 17,
                color: selected
                    ? PorhiTheme.selectedBorder
                    : PorhiTheme.slate500,
              ),
              const SizedBox(width: 7),
              Expanded(
                child: Text(
                  label,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(
                    color: selected
                        ? PorhiTheme.selectedForeground
                        : PorhiTheme.slate700,
                    fontSize: 12,
                    fontWeight: selected ? FontWeight.w800 : FontWeight.w600,
                  ),
                ),
              ),
              if (selected) ...<Widget>[
                const SizedBox(width: 5),
                const Icon(
                  Icons.check_circle_rounded,
                  size: 17,
                  color: PorhiTheme.selectedBorder,
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }

  IconData get _icon => switch (type) {
    PlannerTargetType.lesson => Icons.menu_book_rounded,
    PlannerTargetType.practice => Icons.edit_note_rounded,
    PlannerTargetType.modelTest => Icons.quiz_outlined,
    PlannerTargetType.revision => Icons.replay_rounded,
    PlannerTargetType.custom => Icons.tune_rounded,
  };
}

class _ComposerSectionLabel extends StatelessWidget {
  final IconData icon;
  final String label;

  const _ComposerSectionLabel({required this.icon, required this.label});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: <Widget>[
        Icon(icon, size: 17, color: PorhiTheme.selectedBorder),
        const SizedBox(width: 7),
        Text(
          label,
          style: const TextStyle(
            color: PorhiTheme.slate700,
            fontSize: 11,
            fontWeight: FontWeight.w800,
            letterSpacing: 0.4,
          ),
        ),
      ],
    );
  }
}

class _FilterChipsBar extends StatelessWidget {
  final PlannerController controller;
  final AppLanguage lang;

  const _FilterChipsBar({required this.controller, required this.lang});

  @override
  Widget build(BuildContext context) {
    return Obx(() {
      final active = controller.selectedFilter.value;
      return Wrap(
        spacing: 8,
        runSpacing: 8,
        children: <Widget>[
          ChoiceChip(
            label: Text(AppStrings.tr('সবগুলো', 'All', lang)),
            selected: active == PlannerTaskFilter.all,
            onSelected: (_) => controller.setFilter(PlannerTaskFilter.all),
          ),
          ChoiceChip(
            label: Text(AppStrings.tr('আজ / বাকি', 'Due / Today', lang)),
            selected: active == PlannerTaskFilter.dueToday,
            onSelected: (_) => controller.setFilter(PlannerTaskFilter.dueToday),
          ),
          ChoiceChip(
            label: Text(AppStrings.tr('সম্পন্ন', 'Completed', lang)),
            selected: active == PlannerTaskFilter.completed,
            onSelected: (_) =>
                controller.setFilter(PlannerTaskFilter.completed),
          ),
        ],
      );
    });
  }
}

class _PlannerTaskCard extends StatelessWidget {
  final PlannerTaskSummaryEntity task;
  final AppLanguage lang;
  final bool isBusy;
  final bool canOpenTarget;
  final VoidCallback onToggle;
  final VoidCallback onDelete;
  final VoidCallback onOpenTarget;

  const _PlannerTaskCard({
    required this.task,
    required this.lang,
    required this.isBusy,
    required this.canOpenTarget,
    required this.onToggle,
    required this.onDelete,
    required this.onOpenTarget,
  });

  @override
  Widget build(BuildContext context) {
    final targetType = PlannerTargetType.fromApiValue(task.targetType);
    final typeLabel = lang == AppLanguage.bn
        ? targetType.labelBn
        : targetType.labelEn;
    final dateText = lang == AppLanguage.bn
        ? toBanglaDigits(task.scheduledDate)
        : task.scheduledDate;
    final timeText = task.reminderTime != null && task.reminderTime!.isNotEmpty
        ? (lang == AppLanguage.bn
              ? toBanglaDigits(task.reminderTime!)
              : task.reminderTime!)
        : null;

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Checkbox(
                  key: Key('planner_task_checkbox_${task.id}'),
                  value: task.completed,
                  onChanged: isBusy ? null : (_) => onToggle(),
                ),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      Text(
                        task.titleBangla,
                        style: TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w700,
                          color: task.completed
                              ? PorhiTheme.slate400
                              : PorhiTheme.slate900,
                          decoration: task.completed
                              ? TextDecoration.lineThrough
                              : null,
                        ),
                      ),
                      const SizedBox(height: 6),
                      Wrap(
                        spacing: 6,
                        runSpacing: 4,
                        children: <Widget>[
                          _MetaPill(
                            icon: Icons.calendar_today_outlined,
                            text: dateText,
                          ),
                          if (timeText != null)
                            _MetaPill(
                              icon: Icons.alarm_rounded,
                              text: timeText,
                            ),
                          _MetaPill(
                            icon: Icons.bookmark_outline_rounded,
                            text: typeLabel,
                            bgColor: PorhiTheme.indigo50,
                            textColor: PorhiTheme.indigo700,
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
                IconButton(
                  key: Key('planner_task_delete_${task.id}'),
                  tooltip: AppStrings.tr('মুছে ফেলুন', 'Delete', lang),
                  icon: const Icon(
                    Icons.delete_outline_rounded,
                    color: PorhiTheme.rose600,
                    size: 20,
                  ),
                  onPressed: isBusy ? null : onDelete,
                ),
              ],
            ),
            if (canOpenTarget) ...<Widget>[
              const SizedBox(height: 8),
              Align(
                alignment: Alignment.centerRight,
                child: OutlinedButton.icon(
                  onPressed: onOpenTarget,
                  icon: const Icon(Icons.arrow_forward_rounded, size: 16),
                  label: Text(_ctaLabel(targetType, lang)),
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }

  String _ctaLabel(PlannerTargetType type, AppLanguage lang) {
    switch (type) {
      case PlannerTargetType.lesson:
        return AppStrings.tr('লেসন খোলো', 'Open Lesson', lang);
      case PlannerTargetType.practice:
      case PlannerTargetType.revision:
        return AppStrings.tr('অনুশীলন শুরু করো', 'Practice', lang);
      case PlannerTargetType.modelTest:
        return AppStrings.tr('পরীক্ষা দাও', 'Take Exam', lang);
      case PlannerTargetType.custom:
        return AppStrings.t('action.continue', lang);
    }
  }
}

class _MetaPill extends StatelessWidget {
  final IconData icon;
  final String text;
  final Color bgColor;
  final Color textColor;

  const _MetaPill({
    required this.icon,
    required this.text,
    this.bgColor = PorhiTheme.slate100,
    this.textColor = PorhiTheme.slate700,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
      decoration: BoxDecoration(
        color: bgColor,
        borderRadius: BorderRadius.circular(999),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: <Widget>[
          Icon(icon, size: 12, color: textColor),
          const SizedBox(width: 4),
          Text(
            text,
            style: TextStyle(
              fontSize: 11,
              fontWeight: FontWeight.w600,
              color: textColor,
            ),
          ),
        ],
      ),
    );
  }
}

class _StatusBanner extends StatelessWidget {
  final String message;
  final bool isError;

  const _StatusBanner({required this.message, required this.isError});

  @override
  Widget build(BuildContext context) {
    final bgColor = isError ? const Color(0xFFFFF1F2) : PorhiTheme.emerald50;
    final borderColor = isError
        ? const Color(0xFFFECDD3)
        : const Color(0xFFA7F3D0);
    final textColor = isError ? PorhiTheme.rose600 : PorhiTheme.slate900;
    final iconColor = isError ? PorhiTheme.rose600 : PorhiTheme.emerald600;

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      decoration: BoxDecoration(
        color: bgColor,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: borderColor),
      ),
      child: Row(
        children: <Widget>[
          Icon(
            isError ? Icons.error_outline_rounded : Icons.check_circle_outline,
            size: 18,
            color: iconColor,
          ),
          const SizedBox(width: 8),
          Expanded(
            child: Text(
              message,
              style: TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.w600,
                color: textColor,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
