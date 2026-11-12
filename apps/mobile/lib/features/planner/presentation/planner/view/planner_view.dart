import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/core/i18n/bangla_digits.dart';
import 'package:porhi/core/notifications/local_reminder_scheduler.dart';
import 'package:porhi/core/theme/porhi_theme.dart';
import 'package:porhi/features/planner/domain/entities/planner_entities.dart';
import 'package:porhi/features/planner/presentation/planner/controller/planner_controller.dart';
import 'package:porhi/routes/app_routes.dart';

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
        actions: <Widget>[
          Obx(() {
            final lang = controller.language.value;
            return IconButton(
              key: const Key('planner_account_button'),
              tooltip: AppStrings.t('nav.account', lang),
              icon: const Icon(Icons.person_outline_rounded),
              onPressed: () => _handleAccountTap(context),
            );
          }),
        ],
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
            padding: const EdgeInsets.all(16),
            children: <Widget>[
              if (error != null) ...<Widget>[
                _StatusBanner(message: error, isError: true),
                const SizedBox(height: 12),
              ],
              if (status != null) ...<Widget>[
                _StatusBanner(message: status, isError: isStatusErr),
                const SizedBox(height: 12),
              ],
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

  Future<void> _handleAccountTap(BuildContext context) async {
    final handler = onAccountTap;
    if (handler != null) {
      await handler();
      return;
    }
    await Get.toNamed<dynamic>(AppRoutes.account);
    if (context.mounted) {
      await controller.refreshFromShell();
    }
  }

  Future<void> _pickDate(BuildContext context) async {
    final now = DateTime.now();
    final parsed = LocalReminderScheduler.normalizeYyyyMmDd(
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

  const _PlannerSummaryCard({
    required this.controller,
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
      child: Padding(
        padding: const EdgeInsets.all(14),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Text(
              AppStrings.tr(
                'নতুন স্টাডি টাস্ক যোগ করো',
                'Add New Study Task',
                lang,
              ),
              style: const TextStyle(
                fontSize: 15,
                fontWeight: FontWeight.w700,
                color: PorhiTheme.slate900,
              ),
            ),
            const SizedBox(height: 10),
            TextField(
              key: const Key('planner_title_input'),
              controller: controller.titleController,
              decoration: InputDecoration(
                labelText: AppStrings.tr('কাজের শিরোনাম', 'Task Title', lang),
                hintText: AppStrings.tr(
                  'যেমন: নিউটনের ২য় সূত্র অনুশীলন',
                  'e.g. Newton 2nd law practice',
                  lang,
                ),
              ),
            ),
            const SizedBox(height: 10),
            Row(
              children: <Widget>[
                Expanded(
                  child: TextField(
                    key: const Key('planner_date_input'),
                    controller: controller.dateController,
                    decoration: InputDecoration(
                      labelText: AppStrings.tr(
                        'তারিখ (YYYY-MM-DD)',
                        'Date (YYYY-MM-DD)',
                        lang,
                      ),
                      suffixIcon: IconButton(
                        tooltip: AppStrings.tr('তারিখ বাছাই', 'Pick date', lang),
                        icon: const Icon(Icons.calendar_today_outlined, size: 18),
                        onPressed: onPickDate,
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: TextField(
                    key: const Key('planner_time_input'),
                    controller: controller.reminderTimeController,
                    decoration: InputDecoration(
                      labelText: AppStrings.tr(
                        'সময় (HH:mm)',
                        'Time (HH:mm)',
                        lang,
                      ),
                      hintText: AppStrings.tr('১৮:৩০', '18:30', lang),
                      suffixIcon: IconButton(
                        tooltip: AppStrings.tr('সময় বাছাই', 'Pick time', lang),
                        icon: const Icon(Icons.schedule_rounded, size: 18),
                        onPressed: onPickTime,
                      ),
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 10),
            Obx(() {
              final selected = controller.selectedTargetType.value;
              return Wrap(
                spacing: 6,
                runSpacing: 6,
                children: PlannerTargetType.values.map((type) {
                  final label =
                      lang == AppLanguage.bn ? type.labelBn : type.labelEn;
                  return ChoiceChip(
                    label: Text(label),
                    selected: selected == type.apiValue,
                    onSelected: (_) => controller.setTargetType(type.apiValue),
                  );
                }).toList(),
              );
            }),
            const SizedBox(height: 12),
            Obx(() {
              final submitting = controller.isSubmitting.value;
              return SizedBox(
                width: double.infinity,
                child: ElevatedButton.icon(
                  key: const Key('planner_create_submit_btn'),
                  onPressed: submitting ? null : controller.createTask,
                  icon: submitting
                      ? const SizedBox(
                          width: 16,
                          height: 16,
                          child: CircularProgressIndicator(strokeWidth: 2),
                        )
                      : const Icon(Icons.add_task_rounded, size: 18),
                  label: Text(
                    AppStrings.tr('টাস্ক সংরক্ষণ করো', 'Save Study Task', lang),
                  ),
                ),
              );
            }),
          ],
        ),
      ),
    );
  }
}

class _FilterChipsBar extends StatelessWidget {
  final PlannerController controller;
  final AppLanguage lang;

  const _FilterChipsBar({
    required this.controller,
    required this.lang,
  });

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
            onSelected: (_) => controller.setFilter(PlannerTaskFilter.completed),
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
    final typeLabel =
        lang == AppLanguage.bn ? targetType.labelBn : targetType.labelEn;
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

  const _StatusBanner({
    required this.message,
    required this.isError,
  });

  @override
  Widget build(BuildContext context) {
    final bgColor = isError ? const Color(0xFFFFF1F2) : PorhiTheme.emerald50;
    final borderColor =
        isError ? const Color(0xFFFECDD3) : const Color(0xFFA7F3D0);
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
